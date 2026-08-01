"use client"

import { useEffect, Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Package, Mail } from "lucide-react"
import { useCartStore } from "@/store/cart-store"

function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const { clearCart } = useCartStore()

  useEffect(() => {
    // Clear the cart after successful checkout
    clearCart()
  }, [clearCart])

  return (
    <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <CheckCircle2 className="h-20 w-20 text-green-600 mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Order Confirmed!</h1>
            <p className="text-lg text-[color:var(--rc-mist)]">
              Thank you for your purchase. Your order has been received and is being processed.
            </p>
          </div>

          {sessionId && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-mono text-sm">{sessionId.slice(0, 20)}...</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    A confirmation email has been sent to your email address with your order details.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <Package className="h-10 w-10 text-[#0d4a4a] mb-3" />
                <h3 className="font-semibold mb-2">What's Next?</h3>
                <p className="text-sm text-gray-600">
                  Your order will be processed and shipped within 1-2 business days. You'll receive a tracking number via email.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <Mail className="h-10 w-10 text-[#0d4a4a] mb-3" />
                <h3 className="font-semibold mb-2">Questions?</h3>
                <p className="text-sm text-gray-600">
                  If you have any questions about your order, please contact our support team or check your Discord for updates.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/track-order">
              <Button size="lg" variant="default">
                Track Your Order
              </Button>
            </Link>
            <Link href="/shop">
              <Button size="lg" variant="outline">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </main>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col dark-page-bg">
      <Header />
      <Suspense fallback={
        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="text-center">
            <p>Loading...</p>
          </div>
        </main>
      }>
        <SuccessContent />
      </Suspense>
      <Footer />
    </div>
  )
}
