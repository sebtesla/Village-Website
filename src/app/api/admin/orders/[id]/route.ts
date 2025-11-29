import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendShippingConfirmation } from '@/lib/email'

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { status, trackingNumber } = await req.json()

    const order = await prisma.order.findUnique({
      where: { id: params.id },
      include: { user: true },
    })

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    // Update order
    const updatedOrder = await prisma.order.update({
      where: { id: params.id },
      data: {
        status,
        trackingNumber,
        shippedAt: status === 'SHIPPED' && !order.shippedAt ? new Date() : order.shippedAt,
        deliveredAt: status === 'DELIVERED' && !order.deliveredAt ? new Date() : order.deliveredAt,
      },
    })

    // Send shipping email if status changed to SHIPPED and tracking number provided
    if (status === 'SHIPPED' && trackingNumber && order.status !== 'SHIPPED') {
      try {
        await sendShippingConfirmation({
          orderNumber: order.orderNumber,
          customerName: order.customerName || order.user.name || 'Customer',
          customerEmail: order.customerEmail,
          trackingNumber,
          trackingUrl: `https://www.google.com/search?q=${trackingNumber}`,
          estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
          }),
        })
      } catch (emailError) {
        console.error('Failed to send shipping email:', emailError)
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json(updatedOrder)
  } catch (error: any) {
    console.error('Failed to update order:', error)
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    )
  }
}
