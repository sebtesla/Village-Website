"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Minus, Plus, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useSession, signIn } from "next-auth/react"
import { useCartStore } from "@/store/cart-store"
import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '')

export default function CartPage() {
  const { data: session } = useSession()
  const { items, updateQuantity, removeItem, getTotalPrice, discount, applyDiscount, removeDiscount } = useCartStore()
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [discountCode, setDiscountCode] = useState('')
  const [discountError, setDiscountError] = useState('')
  const [applyingDiscount, setApplyingDiscount] = useState(false)

  const handleUpdateQuantity = (id: string, currentQuantity: number, change: number, size?: string, color?: string) => {
    const newQuantity = Math.max(1, currentQuantity + change)
    updateQuantity(id, newQuantity, size, color)
  }

  const handleRemoveItem = (id: string, size?: string, color?: string) => {
    removeItem(id, size, color)
  }

  const handleApplyDiscount = async () => {
    if (!discountCode.trim()) {
      setDiscountError('Please enter a discount code')
      return
    }

    setApplyingDiscount(true)
    setDiscountError('')

    try {
      const response = await fetch('/api/discount-codes/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: discountCode,
          subtotal: getTotalPrice(),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setDiscountError(data.error || 'Invalid discount code')
        return
      }

      applyDiscount(data)
      setDiscountCode('')
      setDiscountError('')
    } catch (error) {
      setDiscountError('Failed to apply discount code')
    } finally {
      setApplyingDiscount(false)
    }
  }

  const handleRemoveDiscount = () => {
    removeDiscount()
    setDiscountCode('')
    setDiscountError('')
  }

  const subtotal = getTotalPrice()
  const discountAmount = discount?.discountAmount || 0
  const subtotalAfterDiscount = subtotal - discountAmount
  const shipping = subtotalAfterDiscount >= 75 ? 0 : 10
  const total = subtotalAfterDiscount + shipping

  const handleCheckout = async () => {
    if (!session) {
      setShowLoginDialog(true)
      return
    }

    if (items.length === 0) {
      alert("Your cart is empty")
      return
    }

    setIsProcessing(true)

    try {
      // Create Stripe checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
          discountCode: discount?.code
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session')
      }

      // Redirect to Stripe Checkout
      const stripe = await stripePromise
      if (!stripe) {
        throw new Error('Stripe failed to load')
      }

      const { error } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      })

      if (error) {
        throw error
      }
    } catch (error: unknown) {
      console.error('Checkout error:', error)
      alert((error instanceof Error ? (error instanceof Error ? error.message : "An error occurred") : "An error occurred") || 'Failed to proceed to checkout. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col dark-page-bg">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-[color:var(--rc-mist)] mb-6">Your cart is empty</p>
            <Link href="/">
              <Button size="lg">Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.size || ''}-${item.color || ''}`}
                  className="flex gap-4 p-4 border rounded-lg bg-white text-gray-900"
                >
                  <div className="relative w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        {item.size && (
                          <p className="text-sm text-gray-600">Size: {item.size}</p>
                        )}
                        {item.color && (
                          <p className="text-sm text-gray-600">Color: {item.color}</p>
                        )}
                        <p className="text-[#d4a055] font-bold mt-1">
                          ${item.price}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.id, item.size, item.color)}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-3 mt-4">
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity, -1, item.size, item.color)}
                        className="p-1 rounded hover:bg-gray-100"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-12 text-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity, 1, item.size, item.color)}
                        className="p-1 rounded hover:bg-gray-100"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="border rounded-lg p-6 bg-white sticky top-24 text-gray-900">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                {/* Discount Code Input */}
                {!discount && (
                  <div className="mb-4">
                    <label className="text-sm font-medium mb-2 block">Discount Code</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                        placeholder="Enter code"
                        className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d4a4a]"
                        disabled={applyingDiscount}
                      />
                      <Button
                        onClick={handleApplyDiscount}
                        disabled={applyingDiscount || !discountCode.trim()}
                        size="sm"
                      >
                        {applyingDiscount ? 'Applying...' : 'Apply'}
                      </Button>
                    </div>
                    {discountError && (
                      <p className="text-sm text-red-600 mt-2">{discountError}</p>
                    )}
                  </div>
                )}

                {/* Applied Discount */}
                {discount && (
                  <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-green-800">
                          Code: {discount.code}
                        </p>
                        {discount.description && (
                          <p className="text-xs text-green-600">{discount.description}</p>
                        )}
                      </div>
                      <button
                        onClick={handleRemoveDiscount}
                        className="text-green-600 hover:text-green-800 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}

                <Separator className="my-4" />

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>

                  {discount && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({discount.code})</span>
                      <span className="font-medium">-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? "FREE" : `${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  {subtotalAfterDiscount < 75 && subtotalAfterDiscount > 0 && (
                    <p className="text-sm text-[#d4a055]">
                      Add ${(75 - subtotalAfterDiscount).toFixed(2)} more for free shipping!
                    </p>
                  )}
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between text-lg font-bold mb-6">
                  <span>Total</span>
                  <span className="text-[#d4a055]">${total.toFixed(2)}</span>
                </div>

                <Button
                  className="w-full h-12 text-base font-semibold mb-4"
                  onClick={handleCheckout}
                  disabled={isProcessing || items.length === 0}
                >
                  {isProcessing ? "Processing..." : "Proceed to Checkout"}
                </Button>

                <Link href="/">
                  <Button variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>

                {!session && (
                  <p className="text-sm text-gray-600 mt-4 text-center">
                    Sign in with Discord required for checkout
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Discord Login Required Dialog */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              Sign In Required
            </DialogTitle>
            <DialogDescription className="text-center pt-2">
              You must sign in with Discord to complete your purchase. No guest checkout available.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <Button
              className="w-full h-12 bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold flex items-center justify-center gap-3"
              onClick={() => signIn("discord")}
            >
              <svg className="w-6 h-6" viewBox="0 0 71 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0)">
                  <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z" fill="currentColor"/>
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect width="71" height="55" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
              Sign in with Discord
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowLoginDialog(false)}
            >
              Continue Shopping
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}
