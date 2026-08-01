"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Package, User, MapPin, CreditCard, Clock, Truck, CheckCircle, AlertCircle, ArrowRight } from "lucide-react"

interface Order {
  id: string
  orderNumber: string
  total: number
  status: string
  createdAt: string
  paidAt?: string
  shippedAt?: string
  deliveredAt?: string
  trackingNumber?: string
  items: Array<{
    id: string
    name: string
    price: number
    quantity: number
    size?: string
    color?: string
    image: string
  }>
  shippingAddress?: {
    street: string
    city: string
    state: string
    zip: string
    country: string
  }
}

export default function AccountPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/")
    }
  }, [status, router])

  useEffect(() => {
    if (session?.user) {
      fetchOrders()
    }
  }, [session])

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/my-orders")
      if (response.ok) {
        const data = await response.json()
        setOrders(data)
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      PENDING: { label: "Pending", variant: "secondary" as const, icon: Clock },
      PAID: { label: "Paid", variant: "default" as const, icon: CreditCard },
      PROCESSING: { label: "Processing", variant: "default" as const, icon: Package },
      SHIPPED: { label: "Shipped", variant: "default" as const, icon: Truck },
      DELIVERED: { label: "Delivered", variant: "default" as const, icon: CheckCircle },
      CANCELLED: { label: "Cancelled", variant: "destructive" as const, icon: AlertCircle },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.PENDING
    const Icon = config.icon

    return (
      <Badge variant={config.variant} className="gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    )
  }

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex flex-col dark-page-bg">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0d4a4a] mx-auto mb-4"></div>
            <p className="text-[color:var(--rc-mist)]">Loading your account...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col dark-page-bg">
      <Header />

      <main className="flex-1 dark-page-bg">
        <div className="container mx-auto px-4 py-8">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-[#0d4a4a] to-[#0a3d3d] text-white rounded-lg p-8 mb-8">
            <div className="flex items-center gap-6">
              {session.user?.image && (
                <div className="relative w-24 h-24 rounded-full overflow-hidden ring-4 ring-white/20">
                  <Image
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <h1 className="text-3xl font-bold mb-2">Welcome back, {session.user?.name}!</h1>
                <p className="text-white/80">{session.user?.email}</p>
              </div>
            </div>
          </div>

          <Tabs defaultValue="orders" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-auto">
              <TabsTrigger value="orders" className="gap-2">
                <Package className="h-4 w-4" />
                Orders
              </TabsTrigger>
              <TabsTrigger value="profile" className="gap-2">
                <User className="h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="addresses" className="gap-2">
                <MapPin className="h-4 w-4" />
                Addresses
              </TabsTrigger>
            </TabsList>

            {/* Orders Tab */}
            <TabsContent value="orders" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                  <CardDescription>
                    View and track all your orders
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {orders.length === 0 ? (
                    <div className="text-center py-12">
                      <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No orders yet</h3>
                      <p className="text-gray-600 mb-6">Start shopping to see your orders here!</p>
                      <Link href="/shop">
                        <Button className="gap-2">
                          Browse Products
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <Card key={order.id} className="overflow-hidden">
                          <div className="p-6">
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                              <div>
                                <div className="flex items-center gap-3 mb-2">
                                  <h3 className="font-semibold text-lg">Order #{order.orderNumber}</h3>
                                  {getStatusBadge(order.status)}
                                </div>
                                <p className="text-sm text-gray-600">
                                  Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                  })}
                                </p>
                              </div>
                              <div className="flex flex-col items-end gap-2">
                                <p className="text-2xl font-bold text-[#0d4a4a]">${order.total.toFixed(2)}</p>
                                {order.trackingNumber && (
                                  <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Truck className="h-4 w-4" />
                                    Tracking: {order.trackingNumber}
                                  </div>
                                )}
                              </div>
                            </div>

                            <Separator className="my-4" />

                            {/* Order Items */}
                            <div className="space-y-3">
                              {order.items.map((item) => (
                                <div key={item.id} className="flex gap-4">
                                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                    <Image
                                      src={item.image}
                                      alt={item.name}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="font-medium truncate">{item.name}</p>
                                    <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                                      <span>Qty: {item.quantity}</span>
                                      {item.size && <span>Size: {item.size}</span>}
                                      {item.color && <span>Color: {item.color}</span>}
                                    </div>
                                  </div>
                                  <div className="text-right flex-shrink-0">
                                    <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                                  </div>
                                </div>
                              ))}
                            </div>

                            <Separator className="my-4" />

                            {/* Order Actions */}
                            <div className="flex gap-3">
                              <Link href={`/track-order?order=${order.orderNumber}`} className="flex-1">
                                <Button variant="outline" className="w-full gap-2">
                                  <Truck className="h-4 w-4" />
                                  Track Order
                                </Button>
                              </Link>
                              {order.status === 'DELIVERED' && (
                                <Button variant="default" className="flex-1 gap-2">
                                  <Package className="h-4 w-4" />
                                  Reorder
                                </Button>
                              )}
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Your account details from Discord</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-6">
                    {session.user?.image && (
                      <div className="relative w-24 h-24 rounded-full overflow-hidden">
                        <Image
                          src={session.user.image}
                          alt={session.user.name || "User"}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm text-gray-600">Name</p>
                        <p className="font-semibold text-lg">{session.user?.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-semibold">{session.user?.email}</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-semibold mb-4">Account Settings</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>• Connected via Discord OAuth</p>
                      <p>• Email notifications enabled</p>
                      <p>• Order updates via email</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Addresses Tab */}
            <TabsContent value="addresses">
              <Card>
                <CardHeader>
                  <CardTitle>Saved Addresses</CardTitle>
                  <CardDescription>Manage your shipping addresses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No saved addresses</h3>
                    <p className="text-gray-600 mb-6">
                      Your shipping address will be saved during checkout
                    </p>
                  </div>
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
