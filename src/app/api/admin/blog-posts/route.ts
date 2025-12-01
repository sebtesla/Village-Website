import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const blogPosts = await prisma.blogPost.findMany({
      include: {
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: [
        { featured: 'desc' },
        { publishedAt: 'desc' },
      ],
    })

    return NextResponse.json(blogPosts)
  } catch (error: unknown) {
    console.error('Failed to fetch blog posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { title, slug, excerpt, content, author, category, image, featured, tags } = body

    // Validate required fields
    if (!title || !slug || !excerpt || !content || !author || !category) {
      return NextResponse.json(
        { error: 'Missing required fields: title, slug, excerpt, content, author, category' },
        { status: 400 }
      )
    }

    // Check if slug already exists
    const existingPost = await prisma.blogPost.findUnique({
      where: { slug },
    })

    if (existingPost) {
      return NextResponse.json(
        { error: 'A blog post with this slug already exists' },
        { status: 400 }
      )
    }

    const blogPost = await prisma.blogPost.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        author,
        category,
        image: image || '',
        featured: featured || false,
        tags: tags || [],
      },
      include: {
        _count: {
          select: {
            comments: true,
          },
        },
      },
    })

    return NextResponse.json(blogPost, { status: 201 })
  } catch (error: unknown) {
    console.error('Failed to create blog post:', error)
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    )
  }
}
