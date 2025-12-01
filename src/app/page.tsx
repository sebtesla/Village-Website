import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { prisma } from "@/lib/prisma"

export default async function Home() {
  // Fetch products directly from database (server-side)
  let products: Array<{
    id: string;
    name: string;
    price: number;
    image: string;
    badge?: string | null;
    sizes?: string[];
  }> = []

  try {
    const dbProducts = await prisma.product.findMany({
      where: {
        inStock: true,
      },
      orderBy: [
        { featured: 'desc' },
        { createdAt: 'desc' },
      ],
      take: 8, // Only fetch 8 for featured products
    })

    if (dbProducts && dbProducts.length > 0) {
      // Transform database products to match ProductCard format
      products = dbProducts.map((p) => ({
        id: p.slug, // Use slug as ID for product page links
        name: p.name,
        price: p.price,
        image: Array.isArray(p.images) ? p.images[0] : (p.images as string),
        badge: p.badge,
        sizes: p.sizes,
      }))
    }
  } catch (error) {
    console.error('Failed to fetch products from database:', error)
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
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              priority
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
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105 scale-150"
              style={{ objectPosition: 'center' }}
              priority
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
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              priority
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

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products available at the moment. Check back soon!</p>
            </div>
          )}

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
