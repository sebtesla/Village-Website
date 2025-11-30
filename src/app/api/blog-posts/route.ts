import { NextResponse } from 'next/server'
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

    // Return empty array instead of error to gracefully handle missing database
    return NextResponse.json([])
  }
}
