import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  size?: string
  color?: string
  image: string
}

interface UserWithDiscord {
  discordId: string
  email: string | null | undefined
  name: string | null | undefined
  image: string | null | undefined
}

function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `VLG-${timestamp}-${random}`
}

export async function POST(req: NextRequest) {
  try {
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

    const { items, discountCode }: { items: CartItem[], discountCode?: string } = await req.json()

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      )
    }

    const userWithDiscord = session.user as UserWithDiscord
    let user = await prisma.user.findUnique({
      where: { discordId: userWithDiscord.discordId },
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          discordId: userWithDiscord.discordId,
          email: session.user.email,
          name: session.user.name,
          image: session.user.image,
        },
      })
    }

    const subtotal = items.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0)

    let discount = 0
    let discountCodeRecord = null

    if (discountCode) {
      discountCodeRecord = await prisma.discountCode.findUnique({
        where: { code: discountCode.toUpperCase() },
      })

      if (discountCodeRecord && discountCodeRecord.active) {
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
        }
      }
    }

    const total = subtotal - discount
    const orderNumber = generateOrderNumber()

    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId: user.id,
        customerEmail: user.email || '',
        customerName: user.name,
        subtotal,
        discount,
        total,
        status: 'PENDING',
        discountCodeId: discountCodeRecord?.id,
        items: {
          create: items.map((item: CartItem) => ({
            productId: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            size: item.size,
            color: item.color,
          })),
        },
      },
    })

    const lineItems = items.map((item: CartItem) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }))

    if (discount > 0) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Discount: ${discountCode}`,
          },
          unit_amount: -Math.round(discount * 100),
        },
        quantity: 1,
      })
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
      client_reference_id: order.id,
      customer_email: user.email || undefined,
      metadata: {
        orderId: order.id,
        orderNumber: orderNumber,
      },
    })

    return NextResponse.json({ sessionId: checkoutSession.id, orderNumber })
  } catch (error: unknown) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
