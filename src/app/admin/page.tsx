"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { products } from "@/lib/product-data"
import { blogPosts } from "@/lib/blog-data"
import { Package, FileText, Users, DollarSign, LogOut, Lock } from "lucide-react"
import { AdminNotifications } from "@/components/admin-notifications"

export default function AdminDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    // Check if already authenticated in session storage
    const auth = sessionStorage.getItem('admin-authenticated')
    if (auth === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple password check (in production, use proper authentication)
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD || password === 'admin123') {
      sessionStorage.setItem('admin-authenticated', 'true')
      setIsAuthenticated(true)
      setError("")
    } else {
      setError("Invalid password")
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('admin-authenticated')
    setIsAuthenticated(false)
    setPassword("")
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Lock className="h-12 w-12 mx-auto mb-4 text-[#0d4a4a]" />
            <CardTitle className="text-2xl">Admin Access</CardTitle>
            <CardDescription>
              Enter the admin password to continue
            </CardDescription>
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
                />
              </div>
              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}
              <Button type="submit" className="w-full">
                Login
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => router.push('/')}
              >
                Back to Home
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

      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Manage your products, blog posts, and more</p>
            </div>
            <div className="flex items-center gap-2">
              <AdminNotifications />
              <Button variant="outline" onClick={handleLogout} className="gap-2">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Link href="/admin/orders">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-[#d4a055]">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">Order Management</CardTitle>
                      <CardDescription className="mt-2">
                        View and manage all customer orders
                      </CardDescription>
                    </div>
                    <Package className="h-8 w-8 text-[#0d4a4a]" />
                  </div>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">View Orders →</Button>
                </CardContent>
              </Card>
            </Link>

            <Link href="/admin/analytics">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-[#d4a055]">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">Analytics Dashboard</CardTitle>
                      <CardDescription className="mt-2">
                        Track revenue and performance
                      </CardDescription>
                    </div>
                    <DollarSign className="h-8 w-8 text-[#d4a055]" />
                  </div>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">View Analytics →</Button>
                </CardContent>
              </Card>
            </Link>

            <Link href="/admin/discount-codes">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-[#d4a055]">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">Discount Codes</CardTitle>
                      <CardDescription className="mt-2">
                        Create and manage discount codes
                      </CardDescription>
                    </div>
                    <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Manage Codes →</Button>
                </CardContent>
              </Card>
            </Link>

            <Link href="/admin/blog-posts">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-[#d4a055]">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">Blog Posts</CardTitle>
                      <CardDescription className="mt-2">
                        Create and manage blog content
                      </CardDescription>
                    </div>
                    <FileText className="h-8 w-8 text-blue-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Manage Posts →</Button>
                </CardContent>
              </Card>
            </Link>

            <Link href="/admin/products">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-[#d4a055]">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">Products</CardTitle>
                      <CardDescription className="mt-2">
                        Manage product inventory
                      </CardDescription>
                    </div>
                    <Package className="h-8 w-8 text-purple-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Manage Products →</Button>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{products.length}</div>
                <p className="text-xs text-muted-foreground">Across all categories</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{blogPosts.length}</div>
                <p className="text-xs text-muted-foreground">Published articles</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Categories</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7</div>
                <p className="text-xs text-muted-foreground">Product & blog categories</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Product Price</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${Math.round(products.reduce((sum, p) => sum + p.price, 0) / products.length)}
                </div>
                <p className="text-xs text-muted-foreground">Across inventory</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="products" className="space-y-4">
            <TabsList>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="blog">Blog Posts</TabsTrigger>
              <TabsTrigger value="add-product">Add Product</TabsTrigger>
              <TabsTrigger value="add-post">Add Post</TabsTrigger>
            </TabsList>

            {/* Products List */}
            <TabsContent value="products" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>All Products</CardTitle>
                  <CardDescription>
                    Manage your product inventory and pricing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {products.map((product) => (
                      <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gray-100 rounded-lg"></div>
                          <div>
                            <h4 className="font-semibold">{product.name}</h4>
                            <div className="flex gap-2 mt-1">
                              <Badge variant="outline" className="capitalize">{product.category}</Badge>
                              {product.badge && (
                                <Badge className="bg-[#d4a055]">{product.badge}</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">${product.price}</p>
                          <p className="text-sm text-gray-600">{product.inStock ? 'In Stock' : 'Out of Stock'}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Blog Posts List */}
            <TabsContent value="blog" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>All Blog Posts</CardTitle>
                  <CardDescription>
                    Manage your blog content and articles
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {blogPosts.map((post) => (
                      <div key={post.id} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold">{post.title}</h4>
                          {post.featured && (
                            <Badge className="bg-[#d4a055]">Featured</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{post.excerpt}</p>
                        <div className="flex gap-2 text-xs text-gray-500">
                          <Badge variant="outline" className="capitalize">{post.category}</Badge>
                          <span>{post.author}</span>
                          <span>•</span>
                          <span>{post.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Add Product Form */}
            <TabsContent value="add-product">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Product</CardTitle>
                  <CardDescription>
                    Add a new product to your store inventory
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="product-name">Product Name</Label>
                        <Input id="product-name" placeholder="The Village Hat" />
                      </div>
                      <div>
                        <Label htmlFor="product-price">Price ($)</Label>
                        <Input id="product-price" type="number" placeholder="35" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="product-description">Description</Label>
                      <Textarea
                        id="product-description"
                        placeholder="Enter product description..."
                        rows={4}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="product-category">Category</Label>
                        <Input id="product-category" placeholder="hats" />
                      </div>
                      <div>
                        <Label htmlFor="product-image">Image URL</Label>
                        <Input id="product-image" placeholder="https://..." />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="product-sizes">Sizes (comma separated)</Label>
                        <Input id="product-sizes" placeholder="S, M, L, XL" />
                      </div>
                      <div>
                        <Label htmlFor="product-colors">Colors (comma separated)</Label>
                        <Input id="product-colors" placeholder="Black, Green, Navy" />
                      </div>
                    </div>

                    <Separator />

                    <div className="flex gap-2">
                      <Button type="submit">Add Product</Button>
                      <Button type="button" variant="outline">Cancel</Button>
                    </div>

                    <p className="text-sm text-yellow-600 bg-yellow-50 p-3 rounded-lg">
                      <strong>Note:</strong> This is a demo admin panel. In production, this would save to a database. Currently, changes are not persisted.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Add Blog Post Form */}
            <TabsContent value="add-post">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Blog Post</CardTitle>
                  <CardDescription>
                    Create a new blog post for your community
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div>
                      <Label htmlFor="post-title">Post Title</Label>
                      <Input id="post-title" placeholder="Welcome to The Village" />
                    </div>

                    <div>
                      <Label htmlFor="post-excerpt">Excerpt</Label>
                      <Textarea
                        id="post-excerpt"
                        placeholder="A short summary of your post..."
                        rows={2}
                      />
                    </div>

                    <div>
                      <Label htmlFor="post-content">Content (Markdown supported)</Label>
                      <Textarea
                        id="post-content"
                        placeholder="# Your Post Title\n\nWrite your content here..."
                        rows={10}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="post-author">Author</Label>
                        <Input id="post-author" placeholder="The Village Team" />
                      </div>
                      <div>
                        <Label htmlFor="post-category">Category</Label>
                        <Input id="post-category" placeholder="community" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="post-image">Featured Image URL</Label>
                      <Input id="post-image" placeholder="https://..." />
                    </div>

                    <div>
                      <Label htmlFor="post-tags">Tags (comma separated)</Label>
                      <Input id="post-tags" placeholder="community, welcome, announcement" />
                    </div>

                    <Separator />

                    <div className="flex gap-2">
                      <Button type="submit">Publish Post</Button>
                      <Button type="button" variant="outline">Save Draft</Button>
                    </div>

                    <p className="text-sm text-yellow-600 bg-yellow-50 p-3 rounded-lg">
                      <strong>Note:</strong> This is a demo admin panel. In production, this would save to a database. Currently, changes are not persisted.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
