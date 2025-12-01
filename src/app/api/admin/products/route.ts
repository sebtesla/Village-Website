import { NextResponse } from 'next/server'
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
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { name, slug, description, price, category, images, sizes, colors, badge, inStock, featured, features } = body

    // Validate required fields
    if (!name || !slug || !description || price === undefined || !category) {
      return NextResponse.json(
        { error: 'Missing required fields: name, slug, description, price, category' },
        { status: 400 }
      )
    }

    // Check if slug already exists
    const existingProduct = await prisma.product.findUnique({
      where: { slug },
    })

    if (existingProduct) {
      return NextResponse.json(
        { error: 'A product with this slug already exists' },
        { status: 400 }
      )
    }

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        price: parseFloat(price),
        category,
        images: images || [],
        sizes: sizes || [],
        colors: colors || [],
        badge: badge || null,
        inStock: inStock !== undefined ? inStock : true,
        featured: featured || false,
        features: features || [],
      },
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error: unknown) {
    console.error('Failed to create product:', error)
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}
