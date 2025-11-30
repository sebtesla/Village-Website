import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const updateData: Record<string, unknown> = {}

    if (body.title !== undefined) updateData.title = body.title
    if (body.slug !== undefined) updateData.slug = body.slug
    if (body.excerpt !== undefined) updateData.excerpt = body.excerpt
    if (body.content !== undefined) updateData.content = body.content
    if (body.author !== undefined) updateData.author = body.author
    if (body.category !== undefined) updateData.category = body.category
    if (body.image !== undefined) updateData.image = body.image
    if (body.featured !== undefined) updateData.featured = body.featured
    if (body.tags !== undefined) updateData.tags = body.tags

    const blogPost = await prisma.blogPost.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json(blogPost)
  } catch (error: unknown) {
    console.error('Failed to update blog post:', error)
    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    await prisma.blogPost.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    console.error('Failed to delete blog post:', error)
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    )
  }
}
