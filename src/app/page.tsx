"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"

// Sample products data - expanded catalog
const staticProducts = [
  {
    id: "village-hat-green",
    name: "The Village Hat (Green)",
    price: 35,
    image: "https://i.imgur.com/vubIpVS.jpg",
    badge: "BUY 1 GET 1 FREE",
  },
  {
    id: "village-members-jersey",
    name: "The Village Members Only Jersey",
    price: 65,
    image: "https://i.imgur.com/unWG7QQ.jpg",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "soapy-tee-black",
    name: "Soapy Graphic Tee (Black)",
    price: 32,
    image: "https://i.imgur.com/TzJUEME.jpg",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "village-beanie",
    name: "The Village Beanie",
    price: 28,
    image: "https://i.imgur.com/3fK9YTP.jpg",
  },
  {
    id: "village-hoodie-black",
    name: "The Village Logo Hoodie (Black)",
    price: 60,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "village-tee-white",
    name: "The Village Classic Tee (White)",
    price: 30,
    image: "https://i.imgur.com/8PrPeCZ.jpg",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "village-dad-hat",
    name: "The Village Dad Hat",
    price: 32,
    image: "https://i.imgur.com/aPWkJrz.jpg",
  },
  {
    id: "village-crewneck",
    name: "The Village Crewneck Sweatshirt",
    price: 55,
    image: "https://i.imgur.com/SXRo3X0.jpg",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "village-snapback",
    name: "The Village Snapback",
    price: 38,
    image: "https://images.unsplash.com/photo-1589487391730-58f20eb2c308?w=800&h=800&fit=crop",
  },
  {
    id: "village-long-sleeve",
    name: "The Village Long Sleeve Tee",
    price: 40,
    image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&h=800&fit=crop",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "village-tote-bag",
    name: "The Village Tote Bag",
    price: 25,
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=800&fit=crop",
  },
  {
    id: "village-zip-hoodie",
    name: "The Village Zip-Up Hoodie",
    price: 70,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop",
    sizes: ["S", "M", "L", "XL", "XXL"],
    badge: "NEW ARRIVAL",
  },
]

export default function Home() {
  const [products, setProducts] = useState(staticProducts)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      if (response.ok) {
        const data = await response.json()
        if (data && data.length > 0) {
          setProducts(data)
        }
      }
    } catch (error) {
      console.error('Failed to fetch products:', error)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Banners */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 md:p-6 bg-gray-50">
          <Link
            href="/shop"
            className="relative aspect-[3/4] overflow-hidden rounded-lg group"
          >
            <Image
              src="https://i.imgur.com/P6ErDOf.jpg"
              alt="Shop"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
              <div className="text-white">
                <h2 className="text-2xl font-bold mb-2">SHOP</h2>
                <Button variant="secondary" size="sm">SHOP NOW</Button>
              </div>
            </div>
          </Link>

          <Link
            href="/map"
            className="relative aspect-[3/4] overflow-hidden rounded-lg group"
          >
            <Image
              src="https://i.imgur.com/WRsKeQH.jpg"
              alt="Map"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105 scale-150"
              style={{ objectPosition: 'center' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
              <div className="text-white">
                <h2 className="text-2xl font-bold mb-2">MAP</h2>
                <Button variant="secondary" size="sm">FIND US</Button>
              </div>
            </div>
          </Link>

          <Link
            href="/blog"
            className="relative aspect-[3/4] overflow-hidden rounded-lg group"
          >
            <Image
              src="https://i.imgur.com/hFE0VVt.jpg"
              alt="Blog"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
              <div className="text-white">
                <h2 className="text-2xl font-bold mb-2">BLOG</h2>
                <Button variant="secondary" size="sm">READ NOW</Button>
              </div>
            </div>
          </Link>
        </section>

        {/* Featured Products */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">FEATURED PRODUCTS</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Check out our latest and most popular merch. High quality, comfortable, and stylish.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/shop">
              <Button size="lg" className="gap-2">
                VIEW ALL PRODUCTS
              </Button>
            </Link>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-[#0d4a4a] to-[#0a3d3d] text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">JOIN THE COMMUNITY</h2>
            <p className="text-xl mb-8 opacity-90">
              Follow us on social media for exclusive drops and giveaways
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" variant="default">
                FOLLOW US
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-[#0d4a4a]">
                SHOP ALL
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
