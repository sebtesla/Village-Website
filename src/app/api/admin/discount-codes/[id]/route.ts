import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params

    const discountCode = await prisma.discountCode.findUnique({
      where: { id },
      include: {
        _count: {
          select: { orders: true }
        }
      }
    })

    if (!discountCode) {
      return NextResponse.json(
        { error: 'Discount code not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(discountCode)
  } catch (error: unknown) {
    console.error('Failed to fetch discount code:', error)
    return NextResponse.json(
      { error: 'Failed to fetch discount code' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params
    const body = await request.json()

    // Check if discount code exists
    const existingCode = await prisma.discountCode.findUnique({
      where: { id },
    })

    if (!existingCode) {
      return NextResponse.json(
        { error: 'Discount code not found' },
        { status: 404 }
      )
    }

    // If code is being changed, check for uniqueness
    if (body.code && body.code.toUpperCase() !== existingCode.code) {
      const codeExists = await prisma.discountCode.findUnique({
        where: { code: body.code.toUpperCase() },
      })

      if (codeExists) {
        return NextResponse.json(
          { error: 'A discount code with this code already exists' },
          { status: 400 }
        )
      }
    }

    // Validate percentage range if updating
    if (body.type === 'PERCENTAGE' && body.value !== undefined && (body.value < 0 || body.value > 100)) {
      return NextResponse.json(
        { error: 'Percentage value must be between 0 and 100' },
        { status: 400 }
      )
    }

    // Build update data
    const updateData: Record<string, unknown> = {}

    if (body.code !== undefined) updateData.code = body.code.toUpperCase()
    if (body.description !== undefined) updateData.description = body.description
    if (body.type !== undefined) updateData.type = body.type
    if (body.value !== undefined) updateData.value = parseFloat(body.value)
    if (body.maxUses !== undefined) updateData.maxUses = body.maxUses ? parseInt(body.maxUses) : null
    if (body.validFrom !== undefined) updateData.validFrom = body.validFrom ? new Date(body.validFrom) : new Date()
    if (body.validUntil !== undefined) updateData.validUntil = body.validUntil ? new Date(body.validUntil) : null
    if (body.minPurchase !== undefined) updateData.minPurchase = body.minPurchase ? parseFloat(body.minPurchase) : null
    if (body.active !== undefined) updateData.active = body.active

    const discountCode = await prisma.discountCode.update({
      where: { id },
      data: updateData,
      include: {
        _count: {
          select: { orders: true }
        }
      }
    })

    return NextResponse.json(discountCode)
  } catch (error: unknown) {
    console.error('Failed to update discount code:', error)
    return NextResponse.json(
      { error: 'Failed to update discount code' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params

    // Check if discount code exists
    const existingCode = await prisma.discountCode.findUnique({
      where: { id },
      include: {
        _count: {
          select: { orders: true }
        }
      }
    })

    if (!existingCode) {
      return NextResponse.json(
        { error: 'Discount code not found' },
        { status: 404 }
      )
    }

    // Prevent deletion if the code has been used in orders
    if (existingCode._count.orders > 0) {
      return NextResponse.json(
        { error: 'Cannot delete a discount code that has been used in orders. Consider deactivating it instead.' },
        { status: 400 }
      )
    }

    await prisma.discountCode.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    console.error('Failed to delete discount code:', error)
    return NextResponse.json(
      { error: 'Failed to delete discount code' },
      { status: 500 }
    )
  }
}
