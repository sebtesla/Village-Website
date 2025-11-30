import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { code, subtotal } = await req.json()

    if (!code) {
      return NextResponse.json(
        { error: 'Discount code is required' },
        { status: 400 }
      )
    }

    // Find the discount code
    const discountCode = await prisma.discountCode.findUnique({
      where: { code: code.toUpperCase() },
    })

    if (!discountCode) {
      return NextResponse.json(
        { error: 'Invalid discount code' },
        { status: 404 }
      )
    }

    // Check if active
    if (!discountCode.active) {
      return NextResponse.json(
        { error: 'This discount code is no longer active' },
        { status: 400 }
      )
    }

    // Check if expired
    const now = new Date()
    if (discountCode.validUntil && discountCode.validUntil < now) {
      return NextResponse.json(
        { error: 'This discount code has expired' },
        { status: 400 }
      )
    }

    // Check if not yet valid
    if (discountCode.validFrom > now) {
      return NextResponse.json(
        { error: 'This discount code is not yet valid' },
        { status: 400 }
      )
    }

    // Check usage limit
    if (discountCode.maxUses && discountCode.usedCount >= discountCode.maxUses) {
      return NextResponse.json(
        { error: 'This discount code has reached its usage limit' },
        { status: 400 }
      )
    }

    // Check minimum purchase
    if (discountCode.minPurchase && subtotal < discountCode.minPurchase) {
      return NextResponse.json(
        {
          error: `Minimum purchase of $${discountCode.minPurchase} required for this code`,
          minPurchase: discountCode.minPurchase
        },
        { status: 400 }
      )
    }

    // Calculate discount amount
    let discountAmount = 0
    if (discountCode.type === 'PERCENTAGE') {
      discountAmount = (subtotal * discountCode.value) / 100
    } else {
      discountAmount = discountCode.value
    }

    // Ensure discount doesn't exceed subtotal
    discountAmount = Math.min(discountAmount, subtotal)

    return NextResponse.json({
      valid: true,
      code: discountCode.code,
      type: discountCode.type,
      value: discountCode.value,
      discountAmount,
      description: discountCode.description,
    })
  } catch (error: unknown) {
    console.error('Failed to validate discount code:', error)
    return NextResponse.json(
      { error: 'Failed to validate discount code' },
      { status: 500 }
    )
  }
}
