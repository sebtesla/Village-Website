"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Package, Truck, CheckCircle2, Clock, MapPin, Mail, Calendar } from "lucide-react"
import { format } from "date-fns"

interface OrderData {
  id: string
  orderNumber: string
  customerEmail: string
  customerName: string | null
  status: string
  total: number
  subtotal: number
  shipping: number
  createdAt: string
  paidAt: string | null
  shippedAt: string | null
  deliveredAt: string | null
  trackingNumber: string | null
  items: Array<{
    name: string
    quantity: number
    price: number
    size: string | null
    color: string | null
    image: string
  }>
}

const statusConfig = {
  PENDING: {
    label: 'Pending Payment',
    color: 'bg-yellow-100 text-yellow-800',
    icon: Clock,
    description: 'Waiting for payment confirmation',
  },
  PAID: {
    label: 'Payment Confirmed',
    color: 'bg-green-100 text-green-800',
    icon: CheckCircle2,
    description: 'Payment received, preparing your order',
  },
  PROCESSING: {
    label: 'Processing',
    color: 'bg-blue-100 text-blue-800',
    icon: Package,
    description: 'Your order is being prepared',
  },
  SHIPPED: {
    label: 'Shipped',
    color: 'bg-purple-100 text-purple-800',
    icon: Truck,
    description: 'Your order is on the way',
  },
  DELIVERED: {
    label: 'Delivered',
    color: 'bg-green-200 text-green-900',
    icon: CheckCircle2,
    description: 'Your order has been delivered',
  },
  CANCELLED: {
    label: 'Cancelled',
    color: 'bg-red-100 text-red-800',
    icon: Clock,
    description: 'This order has been cancelled',
  },
}

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [order, setOrder] = useState<OrderData | null>(null)

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setOrder(null)
    setLoading(true)

    try {
      const response = await fetch(`/api/track-order?orderNumber=${encodeURIComponent(orderNumber)}&email=${encodeURIComponent(email)}`)

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Order not found')
      }

      const orderData = await response.json()
      setOrder(orderData)
    } catch (err: unknown) {
      setError(err.message || 'Failed to find order. Please check your order number and email.')
    } finally {
      setLoading(false)
    }
  }

  const getStatusProgress = (status: string) => {
    const statuses = ['PAID', 'PROCESSING', 'SHIPPED', 'DELIVERED']
    const currentIndex = statuses.indexOf(status)
    return currentIndex === -1 ? 0 : ((currentIndex + 1) / statuses.length) * 100
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Track Your Order</h1>
            <p className="text-gray-600">
              Enter your order number and email to track your package
            </p>
          </div>

          {/* Track Order Form */}
          {!order && (
            <Card>
              <CardHeader>
                <CardTitle>Enter Order Details</CardTitle>
                <CardDescription>
                  You can find your order number in the confirmation email
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleTrackOrder} className="space-y-4">
                  <div>
                    <Label htmlFor="orderNumber">Order Number</Label>
                    <Input
                      id="orderNumber"
                      placeholder="VLG-ABC123-XYZ"
                      value={orderNumber}
                      onChange={(e) => setOrderNumber(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-800">{error}</p>
                    </div>
                  )}
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Tracking...' : 'Track Order'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Order Details */}
          {order && (
            <div className="space-y-6">
              {/* Status Card */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-1">Order #{order.orderNumber}</h2>
                      <p className="text-gray-600 flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        {order.customerEmail}
                      </p>
                    </div>
                    <Badge className={statusConfig[order.status as keyof typeof statusConfig].color}>
                      {statusConfig[order.status as keyof typeof statusConfig].label}
                    </Badge>
                  </div>

                  {/* Progress Bar */}
                  {order.status !== 'CANCELLED' && order.status !== 'PENDING' && (
                    <div className="mb-6">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-[#d4a055] h-2 rounded-full transition-all duration-500"
                          style={{ width: `${getStatusProgress(order.status)}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Status Timeline */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {['PAID', 'PROCESSING', 'SHIPPED', 'DELIVERED'].map((status, index) => {
                      const config = statusConfig[status as keyof typeof statusConfig]
                      const Icon = config.icon
                      const isActive = order.status === status
                      const isPast = ['PAID', 'PROCESSING', 'SHIPPED', 'DELIVERED'].indexOf(order.status) >= index

                      return (
                        <div key={status} className={`text-center ${isPast ? 'opacity-100' : 'opacity-40'}`}>
                          <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2 ${
                            isActive ? 'bg-[#d4a055] text-white' : isPast ? 'bg-green-100 text-green-800' : 'bg-gray-100'
                          }`}>
                            <Icon className="h-6 w-6" />
                          </div>
                          <p className="text-xs font-medium">{config.label}</p>
                        </div>
                      )
                    })}
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-900">
                      <strong>Status: </strong>
                      {statusConfig[order.status as keyof typeof statusConfig].description}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Tracking Information */}
              {order.trackingNumber && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Truck className="h-5 w-5" />
                      Tracking Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label>Tracking Number</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <code className="flex-1 bg-gray-100 px-4 py-2 rounded-lg font-mono text-sm">
                            {order.trackingNumber}
                          </code>
                          <Button
                            variant="outline"
                            onClick={() => window.open(`https://www.google.com/search?q=${order.trackingNumber}`, '_blank')}
                          >
                            Track Package
                          </Button>
                        </div>
                      </div>
                      {order.shippedAt && (
                        <div>
                          <Label>Shipped On</Label>
                          <p className="text-gray-900 flex items-center gap-2 mt-1">
                            <Calendar className="h-4 w-4" />
                            {format(new Date(order.shippedAt), 'PPP')}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Order Items */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex gap-4 pb-4 border-b last:border-0">
                        <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{item.name}</h4>
                          {item.size && (
                            <p className="text-sm text-gray-600">Size: {item.size}</p>
                          )}
                          {item.color && (
                            <p className="text-sm text-gray-600">Color: {item.color}</p>
                          )}
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-[#d4a055]">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span>${order.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping</span>
                      <span>{order.shipping === 0 ? 'FREE' : `$${order.shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t">
                      <span>Total</span>
                      <span className="text-[#d4a055]">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Order Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {order.deliveredAt && (
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                          <p className="font-semibold">Delivered</p>
                          <p className="text-sm text-gray-600">
                            {format(new Date(order.deliveredAt), 'PPP p')}
                          </p>
                        </div>
                      </div>
                    )}
                    {order.shippedAt && (
                      <div className="flex items-start gap-3">
                        <Truck className="h-5 w-5 text-purple-600 mt-0.5" />
                        <div>
                          <p className="font-semibold">Shipped</p>
                          <p className="text-sm text-gray-600">
                            {format(new Date(order.shippedAt), 'PPP p')}
                          </p>
                        </div>
                      </div>
                    )}
                    {order.paidAt && (
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                          <p className="font-semibold">Payment Confirmed</p>
                          <p className="text-sm text-gray-600">
                            {format(new Date(order.paidAt), 'PPP p')}
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="flex items-start gap-3">
                      <Package className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="font-semibold">Order Placed</p>
                        <p className="text-sm text-gray-600">
                          {format(new Date(order.createdAt), 'PPP p')}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setOrder(null)
                    setOrderNumber("")
                    setEmail("")
                  }}
                  className="flex-1"
                >
                  Track Another Order
                </Button>
                <Button
                  onClick={() => window.location.href = '/'}
                  className="flex-1"
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
