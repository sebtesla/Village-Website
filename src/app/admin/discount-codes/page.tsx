"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
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
import { ArrowLeft, Plus, Trash2, Edit2, Percent, DollarSign } from "lucide-react"
import { format } from "date-fns"

interface DiscountCode {
  id: string
  code: string
  description: string | null
  type: 'PERCENTAGE' | 'FIXED_AMOUNT'
  value: number
  maxUses: number | null
  usedCount: number
  validFrom: string
  validUntil: string | null
  minPurchase: number | null
  active: boolean
  createdAt: string
  _count: {
    orders: number
  }
}

export default function DiscountCodesPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [discountCodes, setDiscountCodes] = useState<DiscountCode[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [creating, setCreating] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    code: '',
    description: '',
    type: 'PERCENTAGE' as 'PERCENTAGE' | 'FIXED_AMOUNT',
    value: '',
    maxUses: '',
    validFrom: '',
    validUntil: '',
    minPurchase: '',
    active: true,
  })

  useEffect(() => {
    const auth = sessionStorage.getItem('admin-authenticated')
    if (auth === 'true') {
      setIsAuthenticated(true)
      fetchDiscountCodes()
    } else {
      setLoading(false)
    }
  }, [])

  const fetchDiscountCodes = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/discount-codes')
      if (!response.ok) throw new Error('Failed to fetch discount codes')
      const data = await response.json()
      setDiscountCodes(data)
    } catch (error) {
      console.error('Error fetching discount codes:', error)
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
      fetchDiscountCodes()
    } else {
      setError("Invalid password")
    }
  }

  const handleCreateDiscount = async (e: React.FormEvent) => {
    e.preventDefault()
    setCreating(true)

    try {
      const response = await fetch('/api/admin/discount-codes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: formData.code.toUpperCase(),
          description: formData.description || null,
          type: formData.type,
          value: parseFloat(formData.value),
          maxUses: formData.maxUses ? parseInt(formData.maxUses) : null,
          validFrom: formData.validFrom || new Date().toISOString(),
          validUntil: formData.validUntil || null,
          minPurchase: formData.minPurchase ? parseFloat(formData.minPurchase) : null,
          active: formData.active,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to create discount code')
      }

      await fetchDiscountCodes()
      setShowCreateDialog(false)
      setFormData({
        code: '',
        description: '',
        type: 'PERCENTAGE',
        value: '',
        maxUses: '',
        validFrom: '',
        validUntil: '',
        minPurchase: '',
        active: true,
      })
    } catch (error: any) {
      alert(error.message)
    } finally {
      setCreating(false)
    }
  }

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/discount-codes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !currentStatus }),
      })

      if (!response.ok) throw new Error('Failed to update discount code')

      await fetchDiscountCodes()
    } catch (error: any) {
      alert(error.message)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this discount code?')) return

    try {
      const response = await fetch(`/api/admin/discount-codes/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete discount code')

      await fetchDiscountCodes()
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
              Enter admin password to manage discount codes
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
                <h1 className="text-3xl font-bold">Discount Codes</h1>
                <p className="text-gray-600">Create and manage discount codes</p>
              </div>
            </div>
            <Button onClick={() => setShowCreateDialog(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Create Code
            </Button>
          </div>

          {/* Discount Codes List */}
          {loading ? (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-gray-600">Loading discount codes...</p>
              </CardContent>
            </Card>
          ) : discountCodes.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-gray-600 mb-4">No discount codes yet</p>
                <Button onClick={() => setShowCreateDialog(true)}>
                  Create Your First Code
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {discountCodes.map((code) => (
                <Card key={code.id} className={!code.active ? 'opacity-60' : ''}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold font-mono">{code.code}</h3>
                          <Badge className={code.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                            {code.active ? 'Active' : 'Inactive'}
                          </Badge>
                          {code.type === 'PERCENTAGE' ? (
                            <Badge variant="outline" className="gap-1">
                              <Percent className="h-3 w-3" />
                              {code.value}% OFF
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="gap-1">
                              <DollarSign className="h-3 w-3" />
                              ${code.value} OFF
                            </Badge>
                          )}
                        </div>

                        {code.description && (
                          <p className="text-gray-600 mb-3">{code.description}</p>
                        )}

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Used</p>
                            <p className="font-semibold">
                              {code._count.orders} / {code.maxUses || '∞'}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">Min Purchase</p>
                            <p className="font-semibold">
                              {code.minPurchase ? `$${code.minPurchase}` : 'None'}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">Valid From</p>
                            <p className="font-semibold">
                              {format(new Date(code.validFrom), 'MMM d, yyyy')}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">Expires</p>
                            <p className="font-semibold">
                              {code.validUntil ? format(new Date(code.validUntil), 'MMM d, yyyy') : 'Never'}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleActive(code.id, code.active)}
                        >
                          {code.active ? 'Deactivate' : 'Activate'}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(code.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
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
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Discount Code</DialogTitle>
            <DialogDescription>
              Set up a new discount code for your customers
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateDiscount} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="code">Code *</Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  placeholder="SUMMER2025"
                  required
                  maxLength={20}
                />
                <p className="text-xs text-gray-500 mt-1">Will be converted to uppercase</p>
              </div>

              <div className="col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Summer sale - 20% off all items"
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="type">Type *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: 'PERCENTAGE' | 'FIXED_AMOUNT') =>
                    setFormData({ ...formData, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PERCENTAGE">Percentage</SelectItem>
                    <SelectItem value="FIXED_AMOUNT">Fixed Amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="value">
                  {formData.type === 'PERCENTAGE' ? 'Percentage (%)' : 'Amount ($)'} *
                </Label>
                <Input
                  id="value"
                  type="number"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  placeholder={formData.type === 'PERCENTAGE' ? '20' : '10.00'}
                  step={formData.type === 'PERCENTAGE' ? '1' : '0.01'}
                  min="0"
                  max={formData.type === 'PERCENTAGE' ? '100' : undefined}
                  required
                />
              </div>

              <div>
                <Label htmlFor="maxUses">Max Uses</Label>
                <Input
                  id="maxUses"
                  type="number"
                  value={formData.maxUses}
                  onChange={(e) => setFormData({ ...formData, maxUses: e.target.value })}
                  placeholder="Leave empty for unlimited"
                  min="1"
                />
              </div>

              <div>
                <Label htmlFor="minPurchase">Min Purchase ($)</Label>
                <Input
                  id="minPurchase"
                  type="number"
                  value={formData.minPurchase}
                  onChange={(e) => setFormData({ ...formData, minPurchase: e.target.value })}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <Label htmlFor="validFrom">Valid From</Label>
                <Input
                  id="validFrom"
                  type="datetime-local"
                  value={formData.validFrom}
                  onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })}
                />
                <p className="text-xs text-gray-500 mt-1">Leave empty for immediate</p>
              </div>

              <div>
                <Label htmlFor="validUntil">Valid Until</Label>
                <Input
                  id="validUntil"
                  type="datetime-local"
                  value={formData.validUntil}
                  onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                />
                <p className="text-xs text-gray-500 mt-1">Leave empty for no expiry</p>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowCreateDialog(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={creating}>
                {creating ? 'Creating...' : 'Create Code'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}
