import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Get all orders
    const orders = await prisma.order.findMany({
      include: {
        items: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    // Calculate total revenue
    const totalRevenue = orders
      .filter(order => order.status !== 'CANCELLED')
      .reduce((sum, order) => sum + order.total, 0)

    // Calculate revenue by status
    const paidRevenue = orders
      .filter(order => ['PAID', 'PROCESSING', 'SHIPPED', 'DELIVERED'].includes(order.status))
      .reduce((sum, order) => sum + order.total, 0)

    // Count orders by status
    const ordersByStatus = orders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // Calculate average order value
    const paidOrders = orders.filter(order =>
      ['PAID', 'PROCESSING', 'SHIPPED', 'DELIVERED'].includes(order.status)
    )
    const averageOrderValue = paidOrders.length > 0
      ? paidRevenue / paidOrders.length
      : 0

    // Get revenue by day (last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const recentOrders = orders.filter(order =>
      order.createdAt >= thirtyDaysAgo &&
      ['PAID', 'PROCESSING', 'SHIPPED', 'DELIVERED'].includes(order.status)
    )

    // Group by date
    const revenueByDate = recentOrders.reduce((acc, order) => {
      const date = order.createdAt.toISOString().split('T')[0]
      if (!acc[date]) {
        acc[date] = { date, revenue: 0, orders: 0 }
      }
      acc[date].revenue += order.total
      acc[date].orders += 1
      return acc
    }, {} as Record<string, { date: string; revenue: number; orders: number }>)

    const dailyRevenue = Object.values(revenueByDate).sort((a, b) =>
      a.date.localeCompare(b.date)
    )

    // Get top products
    const productSales = recentOrders.flatMap(order => order.items).reduce((acc, item) => {
      if (!acc[item.productId]) {
        acc[item.productId] = {
          name: item.name,
          quantity: 0,
          revenue: 0,
        }
      }
      acc[item.productId].quantity += item.quantity
      acc[item.productId].revenue += item.price * item.quantity
      return acc
    }, {} as Record<string, { name: string; quantity: number; revenue: number }>)

    const topProducts = Object.values(productSales)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5)

    return NextResponse.json({
      overview: {
        totalRevenue,
        paidRevenue,
        totalOrders: orders.length,
        paidOrders: paidOrders.length,
        averageOrderValue,
        ordersByStatus,
      },
      dailyRevenue,
      topProducts,
    })
  } catch (error: any) {
    console.error('Failed to fetch analytics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}
