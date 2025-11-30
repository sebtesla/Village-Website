import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const blogPosts = await prisma.blogPost.findMany({
      orderBy: {
        publishedAt: 'desc',
      },
      include: {
        _count: {
          select: { comments: true },
        },
      },
    })

    return NextResponse.json(blogPosts)
  } catch (error: unknown) {
    console.error('Failed to fetch blog posts:', error)
    return NextResponse.json([])
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const blogPost = await prisma.blogPost.create({
      data: {
        title: body.title,
        slug: body.slug,
        excerpt: body.excerpt,
        content: body.content,
        author: body.author,
        category: body.category,
        image: body.image || '',
        featured: body.featured ?? false,
        tags: body.tags || [],
      },
    })

    return NextResponse.json(blogPost)
  } catch (error: unknown) {
    console.error('Failed to create blog post:', error)
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    )
  }
}
