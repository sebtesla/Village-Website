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

    // Map database products to include 'image' field for ProductCard compatibility
    // The database stores 'images' as an array, but ProductCard expects 'image' as a string
    const mappedProducts = products.map(product => ({
      ...product,
      image: product.images[0] || '',
    }))

    return NextResponse.json(mappedProducts)
  } catch (error: any) {
    console.error('Failed to fetch products:', error)

    // Return empty array instead of error to gracefully handle missing database
    return NextResponse.json([])
  }
}
