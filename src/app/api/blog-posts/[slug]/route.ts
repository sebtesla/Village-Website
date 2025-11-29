import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const blogPost = await prisma.blogPost.findUnique({
      where: { slug: params.slug },
      include: {
        comments: {
          orderBy: { createdAt: 'desc' },
          include: {
            user: true,
          },
        },
        _count: {
          select: { comments: true },
        },
      },
    })

    if (!blogPost) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(blogPost)
  } catch (error: any) {
    console.error('Failed to fetch blog post:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    )
  }
}
