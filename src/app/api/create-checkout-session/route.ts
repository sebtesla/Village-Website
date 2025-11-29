import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `VLG-${timestamp}-${random}`
}

export async function POST(req: NextRequest) {
  try {
    // Initialize Stripe inside the handler to avoid build-time errors
    const stripeKey = process.env.STRIPE_SECRET_KEY
    if (!stripeKey) {
      return NextResponse.json(
        { error: 'Stripe is not configured. Please contact support.' },
        { status: 500 }
      )
    }

    const stripe = new Stripe(stripeKey, {
      apiVersion: '2024-11-20.acacia',
    })

    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'You must be logged in to checkout' },
        { status: 401 }
      )
    }

    const { items, discountCode } = await req.json()

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      )
    }

    // Find or create user in database
    let user = await prisma.user.findUnique({
      where: { discordId: (session.user as any).discordId },
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          discordId: (session.user as any).discordId,
          email: session.user.email,
          name: session.user.name,
          image: session.user.image,
        },
      })
    }

    // Calculate subtotal
    const subtotal = items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)

    // Handle discount code
    let discount = 0
    let discountCodeRecord = null

    if (discountCode) {
      discountCodeRecord = await prisma.discountCode.findUnique({
        where: { code: discountCode.toUpperCase() },
      })

      if (discountCodeRecord && discountCodeRecord.active) {
        // Validate discount code
        const now = new Date()
        const isValid = (!discountCodeRecord.validUntil || discountCodeRecord.validUntil > now) &&
                       discountCodeRecord.validFrom <= now &&
                       (!discountCodeRecord.maxUses || discountCodeRecord.usedCount < discountCodeRecord.maxUses) &&
                       (!discountCodeRecord.minPurchase || subtotal >= discountCodeRecord.minPurchase)

        if (isValid) {
          if (discountCodeRecord.type === 'PERCENTAGE') {
            discount = (subtotal * discountCodeRecord.value) / 100
          } else {
            discount = discountCodeRecord.value
          }
          discount = Math.min(discount, subtotal)
        }
      }
    }

    const subtotalAfterDiscount = subtotal - discount
    const shipping = subtotalAfterDiscount >= 75 ? 0 : 10
    const total = subtotalAfterDiscount + shipping

    // Generate order number
    const orderNumber = generateOrderNumber()

    // Create order in database
    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId: user.id,
        customerEmail: session.user.email || '',
        customerName: session.user.name,
        subtotal,
        discount,
        shipping,
        total,
        status: 'PENDING',
        discountCodeId: discountCodeRecord?.id,
        discountCodeUsed: discountCodeRecord?.code,
        items: {
          create: items.map((item: any) => ({
            productId: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            size: item.size,
            color: item.color,
            image: item.image,
          })),
        },
      },
      include: {
        items: true,
      },
    })

    // Create line items for Stripe
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          description: item.size ? `Size: ${item.size}` : undefined,
          images: [item.image],
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }))

    // Add shipping as a line item if applicable
    if (shipping > 0) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Shipping',
          },
          unit_amount: shipping * 100,
        },
        quantity: 1,
      })
    }

    // Create Stripe checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXTAUTH_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/cart`,
      customer_email: session.user.email || undefined,
      metadata: {
        userId: user.id,
        orderId: order.id,
        orderNumber: order.orderNumber,
      },
    })

    // Update order with Stripe session ID
    await prisma.order.update({
      where: { id: order.id },
      data: { stripeSessionId: checkoutSession.id },
    })

    return NextResponse.json({ sessionId: checkoutSession.id, orderNumber })
  } catch (error: any) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
