"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, Trash2, Package, Eye, Edit2 } from "lucide-react"

interface Product {
  id: string
  slug: string
  name: string
  description: string
  price: number
  category: string
  images: string[]
  sizes: string[]
  colors: string[]
  badge: string | null
  inStock: boolean
  featured: boolean
  features: string[]
  createdAt: string
}

export default function ProductsPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [creating, setCreating] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    price: '',
    category: 'apparel',
    images: '',
    sizes: '',
    colors: '',
    badge: '',
    inStock: true,
    featured: false,
    features: '',
  })

  useEffect(() => {
    const auth = sessionStorage.getItem('admin-authenticated')
    if (auth === 'true') {
      setIsAuthenticated(true)
      fetchProducts()
    } else {
      setLoading(false)
    }
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/products')
      if (!response.ok) throw new Error('Failed to fetch products')
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD || password === 'admin123') {
      sessionStorage.setItem('admin-authenticated', 'true')
      setIsAuthenticated(true)
      setError("")
      fetchProducts()
    } else {
      setError("Invalid password")
    }
  }

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      description: '',
      price: '',
      category: 'apparel',
      images: '',
      sizes: '',
      colors: '',
      badge: '',
      inStock: true,
      featured: false,
      features: '',
    })
    setEditingProduct(null)
  }

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    setCreating(true)

    try {
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          slug: formData.slug || generateSlug(formData.name),
          description: formData.description,
          price: formData.price,
          category: formData.category,
          images: formData.images.split('\n').map(img => img.trim()).filter(Boolean),
          sizes: formData.sizes.split(',').map(s => s.trim()).filter(Boolean),
          colors: formData.colors.split(',').map(c => c.trim()).filter(Boolean),
          badge: formData.badge || null,
          inStock: formData.inStock,
          featured: formData.featured,
          features: formData.features.split('\n').map(f => f.trim()).filter(Boolean),
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to create product')
      }

      await fetchProducts()
      setShowCreateDialog(false)
      resetForm()
    } catch (error: any) {
      alert(error.message)
    } finally {
      setCreating(false)
    }
  }

  const handleEditClick = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      slug: product.slug,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      images: product.images.join('\n'),
      sizes: product.sizes.join(', '),
      colors: product.colors.join(', '),
      badge: product.badge || '',
      inStock: product.inStock,
      featured: product.featured,
      features: product.features.join('\n'),
    })
    setShowEditDialog(true)
  }

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingProduct) return

    setCreating(true)

    try {
      const response = await fetch(`/api/admin/products/${editingProduct.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          slug: formData.slug,
          description: formData.description,
          price: formData.price,
          category: formData.category,
          images: formData.images.split('\n').map(img => img.trim()).filter(Boolean),
          sizes: formData.sizes.split(',').map(s => s.trim()).filter(Boolean),
          colors: formData.colors.split(',').map(c => c.trim()).filter(Boolean),
          badge: formData.badge || null,
          inStock: formData.inStock,
          featured: formData.featured,
          features: formData.features.split('\n').map(f => f.trim()).filter(Boolean),
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to update product')
      }

      await fetchProducts()
      setShowEditDialog(false)
      resetForm()
    } catch (error: any) {
      alert(error.message)
    } finally {
      setCreating(false)
    }
  }

  const handleToggleFeatured = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !currentStatus }),
      })

      if (!response.ok) throw new Error('Failed to update product')

      await fetchProducts()
    } catch (error: any) {
      alert(error.message)
    }
  }

  const handleToggleStock = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inStock: !currentStatus }),
      })

      if (!response.ok) throw new Error('Failed to update product')

      await fetchProducts()
    } catch (error: any) {
      alert(error.message)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product? This action cannot be undone.')) return

    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete product')

      await fetchProducts()
    } catch (error: any) {
      alert(error.message)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Admin Access Required</CardTitle>
            <CardDescription>
              Enter admin password to manage products
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
              {error && <p className="text-sm text-red-600">{error}</p>}
              <Button type="submit" className="w-full">Login</Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => router.push('/admin')}
              >
                Back to Dashboard
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  const ProductForm = ({ onSubmit, isEdit }: { onSubmit: (e: React.FormEvent) => void, isEdit: boolean }) => (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <Label htmlFor="name">Product Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value })
              if (!formData.slug || !isEdit) {
                setFormData({ ...formData, name: e.target.value, slug: generateSlug(e.target.value) })
              }
            }}
            placeholder="The Village Hat (Green)"
            required
          />
        </div>

        <div>
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            placeholder="village-hat-green"
          />
          <p className="text-xs text-gray-500 mt-1">URL: /products/{formData.slug || 'slug'}</p>
        </div>

        <div>
          <Label htmlFor="price">Price ($) *</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            placeholder="35.00"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Detailed product description..."
          rows={3}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="category">Category</Label>
          <Select
            value={formData.category}
            onValueChange={(value) => setFormData({ ...formData, category: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hats">Hats & Caps</SelectItem>
              <SelectItem value="apparel">Apparel</SelectItem>
              <SelectItem value="accessories">Accessories</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="badge">Badge (Optional)</Label>
          <Input
            id="badge"
            value={formData.badge}
            onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
            placeholder="NEW ARRIVAL, BUY 1 GET 1 FREE"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="images">Images (one URL per line)</Label>
        <Textarea
          id="images"
          value={formData.images}
          onChange={(e) => setFormData({ ...formData, images: e.target.value })}
          placeholder="https://i.imgur.com/image1.jpg&#10;https://i.imgur.com/image2.jpg&#10;https://i.imgur.com/image3.jpg"
          rows={3}
        />
        <p className="text-xs text-gray-500 mt-1">First image will be the main product image</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="sizes">Sizes (comma separated)</Label>
          <Input
            id="sizes"
            value={formData.sizes}
            onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
            placeholder="S, M, L, XL, XXL"
          />
        </div>

        <div>
          <Label htmlFor="colors">Colors (comma separated)</Label>
          <Input
            id="colors"
            value={formData.colors}
            onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
            placeholder="Black, Green, Navy"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="features">Features (one per line)</Label>
        <Textarea
          id="features"
          value={formData.features}
          onChange={(e) => setFormData({ ...formData, features: e.target.value })}
          placeholder="Premium cotton&#10;Embroidered logo&#10;Adjustable strap"
          rows={3}
        />
      </div>

      <div className="flex gap-4">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="inStock"
            checked={formData.inStock}
            onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
            className="w-4 h-4"
          />
          <Label htmlFor="inStock" className="cursor-pointer">In Stock</Label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="featured"
            checked={formData.featured}
            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
            className="w-4 h-4"
          />
          <Label htmlFor="featured" className="cursor-pointer">Featured Product</Label>
        </div>
      </div>

      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            if (isEdit) {
              setShowEditDialog(false)
            } else {
              setShowCreateDialog(false)
            }
            resetForm()
          }}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={creating}>
          {creating ? (isEdit ? 'Updating...' : 'Creating...') : (isEdit ? 'Update Product' : 'Create Product')}
        </Button>
      </DialogFooter>
    </form>
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Link href="/admin">
                <Button variant="outline" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold">Products</h1>
                <p className="text-gray-600">Manage your product inventory</p>
              </div>
            </div>
            <Button onClick={() => setShowCreateDialog(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
          </div>

          {/* Products List */}
          {loading ? (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-gray-600">Loading products...</p>
              </CardContent>
            </Card>
          ) : products.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Package className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 mb-4">No products yet</p>
                <Button onClick={() => setShowCreateDialog(true)}>
                  Add Your First Product
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {products.map((product) => (
                <Card key={product.id}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden relative">
                        {product.images.length > 0 ? (
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="h-8 w-8 text-gray-400" />
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-bold">{product.name}</h3>
                            <p className="text-2xl font-bold text-[#d4a055]">${product.price}</p>
                          </div>
                          <div className="flex gap-2">
                            {product.featured && (
                              <Badge className="bg-[#d4a055]">Featured</Badge>
                            )}
                            {product.badge && (
                              <Badge variant="secondary">{product.badge}</Badge>
                            )}
                            <Badge variant={product.inStock ? "default" : "secondary"}>
                              {product.inStock ? 'In Stock' : 'Out of Stock'}
                            </Badge>
                            <Badge variant="outline" className="capitalize">
                              {product.category}
                            </Badge>
                          </div>
                        </div>

                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>

                        <div className="flex gap-4 text-sm text-gray-600 mb-3">
                          {product.sizes.length > 0 && (
                            <span>Sizes: {product.sizes.join(', ')}</span>
                          )}
                          {product.colors.length > 0 && (
                            <span>Colors: {product.colors.length}</span>
                          )}
                          <span>Images: {product.images.length}</span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditClick(product)}
                          >
                            <Edit2 className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleToggleFeatured(product.id, product.featured)}
                          >
                            {product.featured ? 'Unfeature' : 'Feature'}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleToggleStock(product.id, product.inStock)}
                          >
                            {product.inStock ? 'Mark Out of Stock' : 'Mark In Stock'}
                          </Button>
                          <Link href={`/products/${product.slug}`} target="_blank">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(product.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Create Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>
              Create a new product in your store inventory
            </DialogDescription>
          </DialogHeader>
          <ProductForm onSubmit={handleCreateProduct} isEdit={false} />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Update product information
            </DialogDescription>
          </DialogHeader>
          <ProductForm onSubmit={handleUpdateProduct} isEdit={true} />
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}
