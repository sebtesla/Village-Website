import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'
import { sendOrderConfirmation } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    // Initialize Stripe inside the handler to avoid build-time errors
    const stripeKey = process.env.STRIPE_SECRET_KEY
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

    if (!stripeKey || !webhookSecret) {
      console.error('Stripe not configured')
      return NextResponse.json(
        { error: 'Stripe is not configured' },
        { status: 500 }
      )
    }

    const stripe = new Stripe(stripeKey, {
      apiVersion: '2024-11-20.acacia',
    })

    const body = await req.text()
    const signature = req.headers.get('stripe-signature')

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      )
    }

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err: unknown) {
      console.error('Webhook signature verification failed:', err.message)
      return NextResponse.json(
        { error: `Webhook Error: ${err.message}` },
        { status: 400 }
      )
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session)
        break

      case 'payment_intent.succeeded':
        console.log('PaymentIntent succeeded:', event.data.object.id)
        break

      case 'payment_intent.payment_failed':
        console.log('PaymentIntent failed:', event.data.object.id)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error: unknown) {
    console.error('Webhook handler error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  try {
    const { orderId, orderNumber } = session.metadata || {}

    if (!orderId) {
      console.error('No orderId in session metadata')
      return
    }

    // Update order status and payment info
    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: 'PAID',
        stripePaymentId: session.payment_intent as string,
        paidAt: new Date(),
      },
      include: {
        items: true,
        user: true,
        discountCode: true,
      },
    })

    console.log(`Order ${orderNumber} marked as PAID`)

    // Increment discount code usage if used
    if (order.discountCodeId) {
      await prisma.discountCode.update({
        where: { id: order.discountCodeId },
        data: {
          usedCount: {
            increment: 1,
          },
        },
      })
      console.log(`Incremented usage count for discount code: ${order.discountCodeUsed}`)
    }

    // Send order confirmation email
    try {
      await sendOrderConfirmation({
        orderNumber: order.orderNumber,
        customerName: order.customerName || order.user.name || 'Customer',
        customerEmail: order.customerEmail,
        items: order.items.map(item => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          size: item.size || undefined,
          color: item.color || undefined,
          image: item.image,
        })),
        subtotal: order.subtotal,
        shipping: order.shipping,
        total: order.total,
      })

      console.log(`Order confirmation email sent for ${orderNumber}`)
    } catch (emailError) {
      console.error('Failed to send order confirmation email:', emailError)
      // Don't fail the webhook if email fails
    }
  } catch (error) {
    console.error('Failed to handle checkout session completed:', error)
    throw error
  }
}
