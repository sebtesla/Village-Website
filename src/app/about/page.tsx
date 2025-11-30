import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Users, Sparkles, Shield } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[400px] md:h-[500px] bg-gradient-to-r from-[#0d4a4a] to-[#0a3d3d]">
          <div className="absolute inset-0 opacity-20">
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&h=900&fit=crop"
              alt="The Village Community"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-white text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">ABOUT THE VILLAGE</h1>
            <p className="text-lg md:text-xl max-w-2xl">
              More than just merch. We're a community built on quality, creativity, and connection.
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Our Story</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                The Village started with a simple idea: create a space where people can come together,
                express themselves, and feel like they belong. What began as a small group of friends
                sharing a passion for quality merchandise has grown into a thriving community of
                thousands of members worldwide.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                We believe that what you wear should represent who you are. That's why every piece
                in our collection is thoughtfully designed, carefully crafted, and built to last.
                From our signature hats to our premium hoodies, each item tells a story and connects
                you to something bigger than yourself.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Today, The Village is more than a brand—it's a movement. A community of like-minded
                individuals who value authenticity, quality, and meaningful connections. Whether you're
                here for the merch, the community, or both, welcome home.
              </p>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center border-2 hover:border-[#d4a055] transition-colors">
                <CardContent className="pt-8 pb-6">
                  <div className="w-16 h-16 bg-[#0d4a4a] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="h-8 w-8 text-[#d4a055]" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Quality Over Quantity</h3>
                  <p className="text-gray-600">
                    Every piece is crafted with care and built to last. We never compromise on quality.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-2 hover:border-[#d4a055] transition-colors">
                <CardContent className="pt-8 pb-6">
                  <div className="w-16 h-16 bg-[#0d4a4a] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-[#d4a055]" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Community First</h3>
                  <p className="text-gray-600">
                    You're not just a customer—you're part of the family. We prioritize our community always.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-2 hover:border-[#d4a055] transition-colors">
                <CardContent className="pt-8 pb-6">
                  <div className="w-16 h-16 bg-[#0d4a4a] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8 text-[#d4a055]" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Authentic Expression</h3>
                  <p className="text-gray-600">
                    Be yourself, unapologetically. Our designs celebrate individuality and self-expression.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-2 hover:border-[#d4a055] transition-colors">
                <CardContent className="pt-8 pb-6">
                  <div className="w-16 h-16 bg-[#0d4a4a] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-[#d4a055]" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Positive Impact</h3>
                  <p className="text-gray-600">
                    We support causes that matter to our community and strive to make a difference.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Our Promise */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Our Promise</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#d4a055] mb-3">100%</div>
                <h3 className="text-lg font-semibold mb-2">Premium Quality</h3>
                <p className="text-gray-600">
                  Every product meets our strict quality standards
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#d4a055] mb-3">24/7</div>
                <h3 className="text-lg font-semibold mb-2">Community Support</h3>
                <p className="text-gray-600">
                  Our Discord community is always here to help
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#d4a055] mb-3">FREE</div>
                <h3 className="text-lg font-semibold mb-2">Shipping Over $75</h3>
                <p className="text-gray-600">
                  Fast, reliable shipping on qualifying orders
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Manufacturing */}
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">How We Make Our Merch</h2>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
                    <Image
                      src="https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=800&h=800&fit=crop"
                      alt="Manufacturing Process"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Ethical Manufacturing</h3>
                    <p className="text-gray-700">
                      We partner with certified manufacturers who share our values. Every worker is treated
                      fairly, and we maintain the highest quality standards throughout production.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Premium Materials</h3>
                    <p className="text-gray-700">
                      From heavyweight cotton blends to premium mesh fabrics, we source only the best
                      materials. Everything is rigorously tested for durability and comfort.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Sustainable Practices</h3>
                    <p className="text-gray-700">
                      We're committed to reducing our environmental impact through eco-friendly packaging,
                      carbon-neutral shipping options, and minimal waste production methods.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-[#0d4a4a] to-[#0a3d3d] text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Join The Village</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Become part of our growing community. Get exclusive drops, early access, and connect
              with thousands of members worldwide.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/shop">
                <Button size="lg" className="w-full sm:w-auto">
                  SHOP MERCH
                </Button>
              </Link>
              <Link href="/blog">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto bg-transparent text-white border-white hover:bg-white hover:text-[#0d4a4a]"
                >
                  READ OUR BLOG
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
