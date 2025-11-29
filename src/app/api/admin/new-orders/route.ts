import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const sinceParam = searchParams.get('since')

    if (!sinceParam) {
      return NextResponse.json(
        { error: 'Missing since parameter' },
        { status: 400 }
      )
    }

    const since = new Date(sinceParam)

    // Fetch orders created after the given timestamp
    const newOrders = await prisma.order.findMany({
      where: {
        createdAt: {
          gt: since,
        },
      },
      select: {
        id: true,
        orderNumber: true,
        customerEmail: true,
        total: true,
        status: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(newOrders)
  } catch (error: any) {
    console.error('Failed to fetch new orders:', error)
    return NextResponse.json(
      { error: 'Failed to fetch new orders' },
      { status: 500 }
    )
  }
}
