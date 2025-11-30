import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: {
        inStock: true, // Only show in-stock products publicly
      },
      orderBy: [
        { featured: 'desc' },
        { createdAt: 'desc' },
      ],
    })

    return NextResponse.json(products)
  } catch (error: unknown) {
    console.error('Failed to fetch products:', error)

    // Return empty array instead of error to gracefully handle missing database
    return NextResponse.json([])
  }
}
