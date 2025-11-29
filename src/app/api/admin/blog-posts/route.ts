import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - List all blog posts
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
  } catch (error: any) {
    console.error('Failed to fetch blog posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
}

// POST - Create new blog post
export async function POST(req: NextRequest) {
  try {
    const {
      title,
      slug,
      excerpt,
      content,
      author,
      category,
      image,
      featured,
      tags,
    } = await req.json()

    // Validation
    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: 'Title, slug, and content are required' },
        { status: 400 }
      )
    }

    // Create blog post
    const blogPost = await prisma.blogPost.create({
      data: {
        title,
        slug,
        excerpt: excerpt || '',
        content,
        author: author || 'The Village Team',
        category: category || 'updates',
        image: image || '',
        featured: featured || false,
        tags: tags || [],
        publishedAt: new Date(),
      },
    })

    return NextResponse.json(blogPost)
  } catch (error: any) {
    console.error('Failed to create blog post:', error)

    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A blog post with this slug already exists' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    )
  }
}
