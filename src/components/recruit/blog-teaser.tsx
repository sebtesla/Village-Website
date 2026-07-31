"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { SectionHeading } from "./section-heading"

type BlogPost = {
  id: string
  slug: string
  title: string
  excerpt: string
  image: string
  category: string
  publishedAt: string
}

const PLACEHOLDER_POSTS = [
  {
    id: "placeholder-1",
    category: "Wipe recap",
    title: "How last wipe's base actually held",
    excerpt: "A walkthrough of what worked, what almost got us raided, and what we're changing for next wipe.",
  },
  {
    id: "placeholder-2",
    category: "Community",
    title: "Meet this month's Colonel",
    excerpt: "A short interview with one of the members who's been putting in the voice hours.",
  },
  {
    id: "placeholder-3",
    category: "Guide",
    title: "New member checklist",
    excerpt: "Everything to do in your first 48 hours after joining, from rules to base access.",
  },
]

export function BlogTeaser() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const res = await fetch("/api/blog-posts")
        if (res.ok) {
          const data = await res.json()
          if (!cancelled && Array.isArray(data)) {
            setPosts(data.slice(0, 3))
          }
        }
      } catch (error) {
        console.error("Failed to fetch blog posts:", error)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  const showPlaceholders = !loading && posts.length === 0

  return (
    <section className="border-b border-[color:var(--rc-teal-line)] py-16 sm:py-24 px-4">
      <div className="container mx-auto">
        <SectionHeading
          eyebrow="From the village"
          title="Latest from the blog"
          description="Wipe recaps, base tours, and the odd rant about ceiling turrets."
        />

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[0, 1, 2].map((i) => (
              <div key={i} className="aspect-[4/3] bg-[color:var(--rc-panel)] border border-[color:var(--rc-teal-line)] animate-pulse" />
            ))}
          </div>
        ) : showPlaceholders ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PLACEHOLDER_POSTS.map((post) => (
              <div
                key={post.id}
                className="border border-dashed border-[color:var(--rc-teal-line)] bg-[color:var(--rc-panel)] flex flex-col overflow-hidden opacity-80"
              >
                <div className="relative aspect-[16/10] flex items-center justify-center scan-bg">
                  <span className="font-tactical text-[10px] tracking-[0.25em] text-[color:var(--rc-mist)] uppercase">
                    Placeholder image
                  </span>
                </div>
                <div className="p-5 flex flex-col gap-2">
                  <span className="font-tactical text-[10px] tracking-[0.2em] text-[color:var(--rc-gold)] uppercase">
                    {post.category}
                  </span>
                  <h3 className="font-display text-lg font-bold text-[color:var(--rc-bone)] leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[color:var(--rc-mist)] line-clamp-2">{post.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group border border-[color:var(--rc-teal-line)] bg-[color:var(--rc-panel)] flex flex-col overflow-hidden"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 flex flex-col gap-2">
                  <span className="font-tactical text-[10px] tracking-[0.2em] text-[color:var(--rc-gold)] uppercase">
                    {post.category}
                  </span>
                  <h3 className="font-display text-lg font-bold text-[color:var(--rc-bone)] leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[color:var(--rc-mist)] line-clamp-2">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {showPlaceholders && (
          <p className="text-center font-tactical text-xs text-[color:var(--rc-mist)] uppercase tracking-wide mt-6">
            Sample layout — publish real posts to replace these
          </p>
        )}

        <div className="flex justify-center mt-10">
          <Link
            href="/blog"
            className="font-tactical text-xs tracking-[0.2em] text-[color:var(--rc-mist)] hover:text-[color:var(--rc-gold)] uppercase transition-colors"
          >
            Read the blog →
          </Link>
        </div>
      </div>
    </section>
  )
}
