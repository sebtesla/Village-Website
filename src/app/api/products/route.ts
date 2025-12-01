import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')
    const exclude = searchParams.get('exclude')
    const limitParam = searchParams.get('limit')
    const limit = limitParam ? parseInt(limitParam, 10) : undefined

    // Build where clause
    const where: Record<string, unknown> = {
      inStock: true, // Only show in-stock products publicly
    }

    if (category && category !== 'all') {
      where.category = category
    }

    if (exclude) {
      where.slug = { not: exclude }
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: [
        { featured: 'desc' },
        { createdAt: 'desc' },
      ],
      take: limit,
    })

    return NextResponse.json(products)
  } catch (error: unknown) {
    console.error('Failed to fetch products:', error)

    // Return empty array instead of error to gracefully handle missing database
    return NextResponse.json([])
  }
}
