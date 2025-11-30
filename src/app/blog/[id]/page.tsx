"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { getBlogPost, blogPosts } from "@/lib/blog-data"
import { Calendar, User, ArrowLeft, Heart, MessageCircle, Share2 } from "lucide-react"

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.id as string
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(Math.floor(Math.random() * 100) + 20)
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Alex Johnson",
      date: "2 days ago",
      content: "Great post! Really resonates with what The Village is all about.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    },
    {
      id: 2,
      author: "Sam Martinez",
      date: "3 days ago",
      content: "Love this community! Can't wait for the next meetup.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sam",
    },
  ])
  const [newComment, setNewComment] = useState("")

  useEffect(() => {
    fetchPost()
  }, [slug])

  const fetchPost = async () => {
    try {
      // Try fetching from database first
      const response = await fetch(`/api/blog-posts/${slug}`)
      if (response.ok) {
        const data = await response.json()
        setPost(data)
      } else {
        // Fallback to static data
        const staticPost = getBlogPost(slug)
        setPost(staticPost)
      }
    } catch (error) {
      console.error('Failed to fetch blog post:', error)
      // Fallback to static data
      const staticPost = getBlogPost(slug)
      setPost(staticPost)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-12 text-center">
          <p className="text-gray-600">Loading...</p>
        </main>
        <Footer />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist.</p>
          <Link href="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.id !== post.id && p.slug !== post.slug)
    .slice(0, 3)

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1)
    } else {
      setLikes(likes + 1)
    }
    setLiked(!liked)
  }

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    const comment = {
      id: comments.length + 1,
      author: "You",
      date: "Just now",
      content: newComment,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=User",
    }
    setComments([comment, ...comments])
    setNewComment("")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Back Button */}
        <div className="container mx-auto px-4 py-6">
          <Link href="/blog">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>

        {/* Hero Image */}
        <div className="relative h-[400px] md:h-[500px]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Article Content */}
        <article className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="py-8 md:py-12">
            <Badge className="mb-4 capitalize">
              {post.category}
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-6">{post.title}</h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
              <span className="flex items-center gap-2">
                <User className="h-5 w-5" />
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                {post.date}
              </span>
            </div>

            {/* Engagement Bar */}
            <div className="flex items-center gap-4 py-4">
              <Button
                variant={liked ? "default" : "outline"}
                size="sm"
                onClick={handleLike}
                className="gap-2"
              >
                <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
                {likes}
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <MessageCircle className="h-4 w-4" />
                {comments.length}
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
          </div>

          <Separator className="mb-8" />

          {/* Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <div className="whitespace-pre-line text-gray-700 leading-relaxed">
              {post.content}
            </div>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mb-12">
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <Badge key={tag} variant="outline">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <Separator className="mb-12" />

          {/* Comments Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Comments ({comments.length})</h2>

            {/* Comment Form */}
            <Card className="mb-8">
              <CardContent className="pt-6">
                <form onSubmit={handleCommentSubmit}>
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Join the conversation..."
                    className="w-full min-h-[100px] p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#0d4a4a]"
                  />
                  <div className="flex justify-end mt-4">
                    <Button type="submit" disabled={!newComment.trim()}>
                      Post Comment
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Comments List */}
            <div className="space-y-6">
              {comments.map(comment => (
                <Card key={comment.id}>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                        <Image
                          src={comment.avatar}
                          alt={comment.author}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{comment.author}</h4>
                          <span className="text-sm text-gray-500">{comment.date}</span>
                        </div>
                        <p className="text-gray-700">{comment.content}</p>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </section>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <>
              <Separator className="mb-12" />
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedPosts.map(related => (
                    <Link key={related.id} href={`/blog/${related.slug}`}>
                      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
                        <div className="relative h-[150px]">
                          <Image
                            src={related.image}
                            alt={related.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <CardHeader>
                          <h3 className="font-semibold line-clamp-2 hover:text-[#0d4a4a] transition-colors">
                            {related.title}
                          </h3>
                          <p className="text-sm text-gray-600">{related.date}</p>
                        </CardHeader>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            </>
          )}
        </article>
      </main>

      <Footer />
    </div>
  )
}
