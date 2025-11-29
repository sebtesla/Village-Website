import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - List all discount codes
export async function GET() {
  try {
    const discountCodes = await prisma.discountCode.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        _count: {
          select: { orders: true },
        },
      },
    })

    return NextResponse.json(discountCodes)
  } catch (error: any) {
    console.error('Failed to fetch discount codes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch discount codes' },
      { status: 500 }
    )
  }
}

// POST - Create new discount code
export async function POST(req: NextRequest) {
  try {
    const {
      code,
      description,
      type,
      value,
      maxUses,
      validFrom,
      validUntil,
      minPurchase,
      active = true,
    } = await req.json()

    // Validation
    if (!code || !type || value === undefined) {
      return NextResponse.json(
        { error: 'Code, type, and value are required' },
        { status: 400 }
      )
    }

    if (type === 'PERCENTAGE' && (value < 0 || value > 100)) {
      return NextResponse.json(
        { error: 'Percentage must be between 0 and 100' },
        { status: 400 }
      )
    }

    if (type === 'FIXED_AMOUNT' && value < 0) {
      return NextResponse.json(
        { error: 'Fixed amount must be positive' },
        { status: 400 }
      )
    }

    // Create discount code
    const discountCode = await prisma.discountCode.create({
      data: {
        code: code.toUpperCase(),
        description,
        type,
        value,
        maxUses,
        validFrom: validFrom ? new Date(validFrom) : new Date(),
        validUntil: validUntil ? new Date(validUntil) : null,
        minPurchase,
        active,
      },
    })

    return NextResponse.json(discountCode)
  } catch (error: any) {
    console.error('Failed to create discount code:', error)

    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A discount code with this code already exists' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create discount code' },
      { status: 500 }
    )
  }
}
