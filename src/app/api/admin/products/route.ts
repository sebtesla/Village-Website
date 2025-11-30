import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: [
        { featured: 'desc' },
        { createdAt: 'desc' },
      ],
    })

    return NextResponse.json(products)
  } catch (error: unknown) {
    console.error('Failed to fetch products:', error)
    return NextResponse.json([])
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const product = await prisma.product.create({
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description,
        price: parseFloat(body.price),
        category: body.category,
        images: body.images || [],
        sizes: body.sizes || [],
        colors: body.colors || [],
        badge: body.badge || null,
        inStock: body.inStock ?? true,
        featured: body.featured ?? false,
        features: body.features || [],
      },
    })

    return NextResponse.json(product)
  } catch (error: unknown) {
    console.error('Failed to create product:', error)
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}
