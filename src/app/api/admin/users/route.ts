import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Fetch all users with their order count
    const users = await prisma.user.findMany({
      include: {
        _count: {
          select: {
            orders: true,
            blogComments: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    // Calculate total spent per user
    const usersWithStats = await Promise.all(
      users.map(async (user) => {
        const orderStats = await prisma.order.aggregate({
          where: {
            userId: user.id,
            status: {
              in: ['PAID', 'PROCESSING', 'SHIPPED', 'DELIVERED'],
            },
          },
          _sum: {
            total: true,
          },
        })

        return {
          id: user.id,
          discordId: user.discordId,
          name: user.name,
          email: user.email,
          image: user.image,
          createdAt: user.createdAt.toISOString(),
          updatedAt: user.updatedAt.toISOString(),
          orderCount: user._count.orders,
          commentCount: user._count.blogComments,
          totalSpent: orderStats._sum.total || 0,
        }
      })
    )

    return NextResponse.json({
      users: usersWithStats,
      totalUsers: users.length,
    })
  } catch (error: unknown) {
    console.error('Failed to fetch users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}
