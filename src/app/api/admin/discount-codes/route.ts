import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const discountCodes = await prisma.discountCode.findMany({
      orderBy: [
        { active: 'desc' },
        { createdAt: 'desc' },
      ],
      include: {
        _count: {
          select: { orders: true }
        }
      }
    })

    return NextResponse.json(discountCodes)
  } catch (error: unknown) {
    console.error('Failed to fetch discount codes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch discount codes' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { code, description, type, value, maxUses, validFrom, validUntil, minPurchase, active } = body

    // Validate required fields
    if (!code || !type || value === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: code, type, value' },
        { status: 400 }
      )
    }

    // Validate type
    if (type !== 'PERCENTAGE' && type !== 'FIXED_AMOUNT') {
      return NextResponse.json(
        { error: 'Invalid discount type. Must be PERCENTAGE or FIXED_AMOUNT' },
        { status: 400 }
      )
    }

    // Validate percentage range
    if (type === 'PERCENTAGE' && (value < 0 || value > 100)) {
      return NextResponse.json(
        { error: 'Percentage value must be between 0 and 100' },
        { status: 400 }
      )
    }

    // Check if code already exists
    const existingCode = await prisma.discountCode.findUnique({
      where: { code: code.toUpperCase() },
    })

    if (existingCode) {
      return NextResponse.json(
        { error: 'A discount code with this code already exists' },
        { status: 400 }
      )
    }

    const discountCode = await prisma.discountCode.create({
      data: {
        code: code.toUpperCase(),
        description: description || null,
        type,
        value: parseFloat(value),
        maxUses: maxUses ? parseInt(maxUses) : null,
        validFrom: validFrom ? new Date(validFrom) : new Date(),
        validUntil: validUntil ? new Date(validUntil) : null,
        minPurchase: minPurchase ? parseFloat(minPurchase) : null,
        active: active !== undefined ? active : true,
      },
      include: {
        _count: {
          select: { orders: true }
        }
      }
    })

    return NextResponse.json(discountCode, { status: 201 })
  } catch (error: unknown) {
    console.error('Failed to create discount code:', error)
    return NextResponse.json(
      { error: 'Failed to create discount code' },
      { status: 500 }
    )
  }
}
