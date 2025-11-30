"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ArrowLeft, Database, CheckCircle, AlertCircle } from "lucide-react"

interface SeedResult {
  message: string
  data: {
    products: number
    blogPosts: number
  }
}

export default function SeedDBPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [seeding, setSeeding] = useState(false)
  const [result, setResult] = useState<SeedResult | null>(null)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD || password === 'admin123') {
      sessionStorage.setItem('admin-authenticated', 'true')
      setIsAuthenticated(true)
      setError("")
    } else {
      setError("Incorrect password")
    }
  }

  const handleSeed = async () => {
    if (!confirm('This will delete all existing data and seed the database with sample data. Continue?')) {
      return
    }

    setSeeding(true)
    setError("")
    setResult(null)

    try {
      const response = await fetch('/api/admin/seed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (!response.ok) {
        throw new Error('Failed to seed database')
      }

      const data = await response.json()
      setResult(data)
    } catch (error: unknown) {
      setError((error instanceof Error ? error.message : "An error occurred"))
    } finally {
      setSeeding(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Admin Access Required</CardTitle>
            <CardDescription>Enter admin password to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                />
              </div>
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/admin">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Admin
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Database className="h-6 w-6 text-blue-600" />
              <CardTitle>Seed Database</CardTitle>
            </div>
            <CardDescription>
              Populate the database with sample products and blog posts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && !result && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {result && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-900">Success!</AlertTitle>
                <AlertDescription className="text-green-800">
                  Database seeded successfully!
                  <div className="mt-2 space-y-1">
                    <p>• Created {result.data.products} products</p>
                    <p>• Created {result.data.blogPosts} blog posts</p>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Link href="/shop">
                      <Button variant="outline" size="sm">View Shop</Button>
                    </Link>
                    <Link href="/blog">
                      <Button variant="outline" size="sm">View Blog</Button>
                    </Link>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-900 mb-2">⚠️ Warning</h3>
              <p className="text-sm text-yellow-800">
                This action will delete ALL existing data in your database including:
              </p>
              <ul className="list-disc list-inside text-sm text-yellow-800 mt-2 space-y-1">
                <li>All products</li>
                <li>All blog posts</li>
                <li>All orders</li>
                <li>All comments</li>
              </ul>
              <p className="text-sm text-yellow-800 mt-2">
                This action cannot be undone!
              </p>
            </div>

            <Button
              onClick={handleSeed}
              disabled={seeding}
              className="w-full"
            >
              {seeding ? (
                <>
                  <Database className="mr-2 h-4 w-4 animate-spin" />
                  Seeding Database...
                </>
              ) : (
                <>
                  <Database className="mr-2 h-4 w-4" />
                  Seed Database
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
