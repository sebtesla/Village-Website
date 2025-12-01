"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, Loader2 } from "lucide-react"

const categories = [
  { id: "all", name: "All Posts" },
  { id: "community", name: "Community" },
  { id: "events", name: "Events" },
  { id: "merchandise", name: "Merchandise" },
  { id: "updates", name: "Updates" },
]

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [blogPosts, setBlogPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        const response = await fetch('/api/blog-posts')
        if (response.ok) {
          const data = await response.json()
          setBlogPosts(data || [])
        }
      } catch (error) {
        console.error('Failed to fetch blog posts:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchBlogPosts()
  }, [])

  const filteredPosts = selectedCategory === "all"
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory)

  const featuredPosts = blogPosts.filter(post => post.featured)
  const regularPosts = filteredPosts.filter(post => !post.featured)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Banner */}
        <section className="relative h-[300px] md:h-[400px] bg-gradient-to-r from-[#0d4a4a] to-[#0a3d3d]">
          <div className="absolute inset-0">
            <Image
              src="https://i.imgur.com/hFE0VVt.jpg"
              alt="Blog Banner"
              fill
              className="object-cover opacity-30"
            />
          </div>
          <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-white text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">THE VILLAGE BLOG</h1>
            <p className="text-lg md:text-xl max-w-2xl">
              Stay updated with the latest news, events, and stories from our community
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="border-b bg-white sticky top-[136px] md:top-[80px] z-40">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className="min-w-[120px]"
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-[#0d4a4a] mb-4" />
              <p className="text-gray-600">Loading blog posts...</p>
            </div>
          ) : blogPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600 mb-4">No blog posts found</p>
              <p className="text-gray-500">Check back soon for new content!</p>
            </div>
          ) : (
            <>
              {/* Featured Posts */}
              {selectedCategory === "all" && featuredPosts.length > 0 && (
                <section className="mb-16">
                  <h2 className="text-2xl md:text-3xl font-bold mb-6">Featured Posts</h2>
                  <div className="grid md:grid-cols-2 gap-8">
                    {featuredPosts.map((post) => (
                      <Link key={post.id} href={`/blog/${post.slug}`}>
                        <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
                          <div className="relative h-[250px]">
                            <Image
                              src={post.image}
                              alt={post.title}
                              fill
                              className="object-cover"
                            />
                            <Badge className="absolute top-4 left-4 bg-[#d4a055] hover:bg-[#c99445] text-[#0d4a4a]">
                              Featured
                            </Badge>
                          </div>
                          <CardHeader>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {post.date}
                              </span>
                              <span className="flex items-center gap-1">
                                <User className="h-4 w-4" />
                                {post.author}
                              </span>
                            </div>
                            <CardTitle className="text-xl hover:text-[#0d4a4a] transition-colors">
                              {post.title}
                            </CardTitle>
                            <CardDescription className="text-base">
                              {post.excerpt}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <Badge variant="outline" className="capitalize">
                              {post.category}
                            </Badge>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* Regular Posts */}
              <section>
                {selectedCategory === "all" && regularPosts.length > 0 && (
                  <h2 className="text-2xl md:text-3xl font-bold mb-6">Latest Posts</h2>
                )}
                {selectedCategory !== "all" && (
                  <div className="mb-6">
                    <p className="text-gray-600">
                      Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
                      {selectedCategory !== "all" && ` in ${categories.find(c => c.id === selectedCategory)?.name}`}
                    </p>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {(selectedCategory === "all" ? regularPosts : filteredPosts).map((post) => (
                    <Link key={post.id} href={`/blog/${post.slug}`}>
                      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
                        <div className="relative h-[200px]">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <CardHeader>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {post.date}
                            </span>
                          </div>
                          <CardTitle className="text-lg hover:text-[#0d4a4a] transition-colors line-clamp-2">
                            {post.title}
                          </CardTitle>
                          <CardDescription className="line-clamp-3">
                            {post.excerpt}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="capitalize">
                              {post.category}
                            </Badge>
                            <span className="text-sm text-gray-600">{post.author}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>

                {filteredPosts.length === 0 && (
                  <div className="text-center py-16">
                    <p className="text-xl text-gray-600">No posts found in this category</p>
                  </div>
                )}
              </section>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
