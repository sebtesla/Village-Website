import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - List all products
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(products)
  } catch (error: any) {
    console.error('Failed to fetch products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

// POST - Create new product
export async function POST(req: NextRequest) {
  try {
    const {
      name,
      slug,
      description,
      price,
      category,
      images,
      sizes,
      colors,
      badge,
      inStock,
      featured,
      features,
    } = await req.json()

    // Validation
    if (!name || !slug || !description || price === undefined) {
      return NextResponse.json(
        { error: 'Name, slug, description, and price are required' },
        { status: 400 }
      )
    }

    // Create product
    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        price: parseFloat(price),
        category: category || 'apparel',
        images: images || [],
        sizes: sizes || [],
        colors: colors || [],
        badge: badge || null,
        inStock: inStock !== false,
        featured: featured || false,
        features: features || [],
      },
    })

    return NextResponse.json(product)
  } catch (error: any) {
    console.error('Failed to create product:', error)

    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A product with this slug already exists' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}
