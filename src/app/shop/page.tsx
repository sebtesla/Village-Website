"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { products as staticProducts } from "@/lib/product-data"

const categories = [
  { id: "all", name: "All Products" },
  { id: "hats", name: "Hats & Caps" },
  { id: "apparel", name: "Apparel" },
  { id: "accessories", name: "Accessories" },
]


export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [products, setProducts] = useState(staticProducts)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products')
        if (response.ok) {
          const data = await response.json()
          // Use database products if available, otherwise keep static products
          if (data && data.length > 0) {
            setProducts(data)
          }
        }
      } catch (error) {
        console.error('Failed to fetch products:', error)
        // Keep static products as fallback
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const filteredProducts = selectedCategory === "all"
    ? products
    : products.filter(product => product.category === selectedCategory)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Banner */}
        <section className="relative h-[300px] md:h-[400px] bg-gradient-to-r from-[#0d4a4a] to-[#0a3d3d]">
          <div className="absolute inset-0">
            <Image
              src="https://i.imgur.com/P6ErDOf.jpg"
              alt="Shop Banner"
              fill
              className="object-cover opacity-30"
            />
          </div>
          <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-white text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">SHOP ALL MERCH</h1>
            <p className="text-lg md:text-xl max-w-2xl">
              Premium quality merchandise designed for The Village community
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="border-b bg-white sticky top-[136px] md:top-[80px] z-40">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className="min-w-[120px]"
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="container mx-auto px-4 py-12">
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
              {selectedCategory !== "all" && ` in ${categories.find(c => c.id === selectedCategory)?.name}`}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600">No products found in this category</p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}
