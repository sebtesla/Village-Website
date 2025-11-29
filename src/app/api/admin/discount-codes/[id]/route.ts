import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// PATCH - Update discount code
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await req.json()

    // Validate percentage if type is PERCENTAGE
    if (data.type === 'PERCENTAGE' && data.value !== undefined) {
      if (data.value < 0 || data.value > 100) {
        return NextResponse.json(
          { error: 'Percentage must be between 0 and 100' },
          { status: 400 }
        )
      }
    }

    // Validate fixed amount if type is FIXED_AMOUNT
    if (data.type === 'FIXED_AMOUNT' && data.value !== undefined) {
      if (data.value < 0) {
        return NextResponse.json(
          { error: 'Fixed amount must be positive' },
          { status: 400 }
        )
      }
    }

    const discountCode = await prisma.discountCode.update({
      where: { id: params.id },
      data: {
        ...data,
        code: data.code ? data.code.toUpperCase() : undefined,
        validFrom: data.validFrom ? new Date(data.validFrom) : undefined,
        validUntil: data.validUntil ? new Date(data.validUntil) : undefined,
      },
    })

    return NextResponse.json(discountCode)
  } catch (error: any) {
    console.error('Failed to update discount code:', error)

    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A discount code with this code already exists' },
        { status: 409 }
      )
    }

    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Discount code not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to update discount code' },
      { status: 500 }
    )
  }
}

// DELETE - Delete discount code
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.discountCode.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Failed to delete discount code:', error)

    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Discount code not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to delete discount code' },
      { status: 500 }
    )
  }
}
