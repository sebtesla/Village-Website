"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getProduct as getStaticProduct, getRelatedProducts as getStaticRelatedProducts, Product } from "@/lib/product-data"
import { ArrowLeft, ShoppingCart, Heart, Truck, Shield, RefreshCw, Loader2 } from "lucide-react"
import { ProductCard } from "@/components/product-card"
import { useCartStore } from "@/store/cart-store"

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { addItem } = useCartStore()
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      const productId = params.id as string
      setLoading(true)

      try {
        // Try to fetch from the database API first
        const response = await fetch(`/api/products/${productId}`)
        if (response.ok) {
          const data = await response.json()
          if (data && !data.error) {
            setProduct(data)
            // Fetch related products from the API
            try {
              const relatedResponse = await fetch('/api/products')
              if (relatedResponse.ok) {
                const allProducts = await relatedResponse.json()
                const related = allProducts
                  .filter((p: Product) => p.category === data.category && p.id !== data.id)
                  .slice(0, 4)
                setRelatedProducts(related)
              }
            } catch {
              // Use static related products as fallback
              setRelatedProducts(getStaticRelatedProducts(productId))
            }
            setLoading(false)
            return
          }
        }
      } catch (error) {
        console.error('Failed to fetch product from API:', error)
      }

      // Fall back to static product data
      const staticProduct = getStaticProduct(productId)
      if (staticProduct) {
        setProduct(staticProduct)
        setRelatedProducts(getStaticRelatedProducts(productId))
      }
      setLoading(false)
    }

    fetchProduct()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-12 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#0d4a4a]" />
        </main>
        <Footer />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <Link href="/shop">
            <Button>Back to Shop</Button>
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  const handleAddToCart = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      alert("Please select a size")
      return
    }
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      alert("Please select a color")
      return
    }

    // Add to cart using Zustand store
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        size: selectedSize || undefined,
        color: selectedColor || undefined,
      })
    }

    setAddedToCart(true)
    setTimeout(() => {
      setAddedToCart(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Back Button */}
        <div className="container mx-auto px-4 py-6">
          <Link href="/shop">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Shop
            </Button>
          </Link>
        </div>

        {/* Product Details */}
        <div className="container mx-auto px-4 pb-12">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                {product.badge && (
                  <Badge className="absolute top-4 left-4 bg-[#d4a055] hover:bg-[#c99445] text-[#0d4a4a]">
                    {product.badge}
                  </Badge>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index
                          ? "border-[#0d4a4a] ring-2 ring-[#d4a055]"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <Badge variant="outline" className="mb-3 capitalize">
                  {product.category}
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
                <p className="text-3xl font-bold text-[#d4a055] mb-4">${product.price}</p>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              <Separator />

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3">Color: {selectedColor || "Select"}</h3>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-6 py-3 border-2 rounded-lg font-medium transition-all ${
                          selectedColor === color
                            ? "border-[#0d4a4a] bg-[#0d4a4a] text-white"
                            : "border-gray-300 hover:border-[#0d4a4a]"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3">Size: {selectedSize || "Select"}</h3>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-6 py-3 border-2 rounded-lg font-medium transition-all ${
                          selectedSize === size
                            ? "border-[#0d4a4a] bg-[#0d4a4a] text-white"
                            : "border-gray-300 hover:border-[#0d4a4a]"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <h3 className="font-semibold mb-3">Quantity</h3>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border-2 border-gray-300 rounded-lg hover:border-[#0d4a4a] transition-colors"
                  >
                    -
                  </button>
                  <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 border-2 border-gray-300 rounded-lg hover:border-[#0d4a4a] transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <Separator />

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={handleAddToCart}
                  className="w-full h-14 text-lg gap-3"
                  disabled={addedToCart}
                >
                  {addedToCart ? (
                    <>✓ Added to Cart</>
                  ) : (
                    <>
                      <ShoppingCart className="h-5 w-5" />
                      Add to Cart
                    </>
                  )}
                </Button>
                <Button variant="outline" className="w-full h-14 text-lg gap-3">
                  <Heart className="h-5 w-5" />
                  Add to Wishlist
                </Button>
              </div>

              {/* Features */}
              {product.features && product.features.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <h3 className="font-semibold mb-4">Product Features</h3>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-600">
                          <span className="text-[#d4a055] mt-1">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}

              {/* Shipping Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                <div className="flex items-start gap-3">
                  <Truck className="h-5 w-5 text-[#0d4a4a] mt-1" />
                  <div>
                    <p className="font-semibold text-sm">Free Shipping</p>
                    <p className="text-xs text-gray-600">On orders over $75</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <RefreshCw className="h-5 w-5 text-[#0d4a4a] mt-1" />
                  <div>
                    <p className="font-semibold text-sm">Easy Returns</p>
                    <p className="text-xs text-gray-600">30-day return policy</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-[#0d4a4a] mt-1" />
                  <div>
                    <p className="font-semibold text-sm">Secure Checkout</p>
                    <p className="text-xs text-gray-600">SSL encrypted</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-20">
              <h2 className="text-2xl md:text-3xl font-bold mb-8">You Might Also Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map(product => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
