import { Resend } from 'resend'
import { render } from '@react-email/components'
import OrderConfirmationEmail from '@/emails/order-confirmation'
import ShippingConfirmationEmail from '@/emails/shipping-confirmation'

// Helper function to get Resend client
function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn('RESEND_API_KEY is not set. Email sending will be skipped.')
    return null
  }
  return new Resend(apiKey)
}

export interface OrderEmailData {
  orderNumber: string
  customerName: string
  customerEmail: string
  items: Array<{
    name: string
    price: number
    quantity: number
    size?: string
    color?: string
    image: string
  }>
  subtotal: number
  shipping: number
  total: number
}

export interface ShippingEmailData {
  orderNumber: string
  customerName: string
  customerEmail: string
  trackingNumber: string
  trackingUrl?: string
  estimatedDelivery?: string
}

export async function sendOrderConfirmation(data: OrderEmailData) {
  try {
    const resend = getResendClient()
    if (!resend) {
      console.warn('Skipping order confirmation email - Resend not configured')
      return null
    }

    const emailHtml = await render(
      OrderConfirmationEmail({
        orderNumber: data.orderNumber,
        customerName: data.customerName,
        items: data.items,
        subtotal: data.subtotal,
        shipping: data.shipping,
        total: data.total,
      })
    )

    const result = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'The Village <noreply@yourdomain.com>',
      to: data.customerEmail,
      subject: `Order Confirmation - The Village #${data.orderNumber}`,
      html: emailHtml,
    })

    console.log('Order confirmation email sent:', result.id)
    return result
  } catch (error) {
    console.error('Failed to send order confirmation email:', error)
    throw error
  }
}

export async function sendShippingConfirmation(data: ShippingEmailData) {
  try {
    const resend = getResendClient()
    if (!resend) {
      console.warn('Skipping shipping confirmation email - Resend not configured')
      return null
    }

    const emailHtml = await render(
      ShippingConfirmationEmail({
        orderNumber: data.orderNumber,
        customerName: data.customerName,
        trackingNumber: data.trackingNumber,
        trackingUrl: data.trackingUrl,
        estimatedDelivery: data.estimatedDelivery,
      })
    )

    const result = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'The Village <noreply@yourdomain.com>',
      to: data.customerEmail,
      subject: `Your Order Has Shipped - The Village #${data.orderNumber}`,
      html: emailHtml,
    })

    console.log('Shipping confirmation email sent:', result.id)
    return result
  } catch (error) {
    console.error('Failed to send shipping confirmation email:', error)
    throw error
  }
}
