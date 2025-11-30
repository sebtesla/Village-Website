import Link from "next/link"
import { Instagram, Twitter, Youtube } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Logo and Description */}
        <div className="text-center mb-8">
          <div className="flex flex-col items-center mb-4">
            <span className="text-2xl font-bold tracking-wider text-[#0d4a4a]">THE VILLAGE</span>
            <span className="text-xs tracking-widest text-[#d4a055]">MERCH</span>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Premium quality merchandise for those who appreciate style and comfort.
            All products are made with care and designed to last.
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-4 mb-8">
          <Link
            href="#"
            className="bg-white p-3 rounded-full hover:bg-[#0d4a4a] hover:text-white transition-colors border border-gray-200"
          >
            <Instagram className="h-5 w-5" />
          </Link>
          <Link
            href="#"
            className="bg-white p-3 rounded-full hover:bg-[#0d4a4a] hover:text-white transition-colors border border-gray-200"
          >
            <Twitter className="h-5 w-5" />
          </Link>
          <Link
            href="#"
            className="bg-white p-3 rounded-full hover:bg-[#0d4a4a] hover:text-white transition-colors border border-gray-200"
          >
            <Youtube className="h-5 w-5" />
          </Link>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-bold mb-4 uppercase tracking-wide text-[#0d4a4a]">Customers</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/track-order" className="text-gray-600 hover:text-[#d4a055] transition-colors">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#d4a055] transition-colors">
                  Order History
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#d4a055] transition-colors">
                  Support
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#d4a055] transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#d4a055] transition-colors">
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 uppercase tracking-wide text-[#0d4a4a]">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#d4a055] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#d4a055] transition-colors">
                  News
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#d4a055] transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#d4a055] transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 uppercase tracking-wide text-[#0d4a4a]">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#d4a055] transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#d4a055] transition-colors">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#d4a055] transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#d4a055] transition-colors">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 uppercase tracking-wide text-[#0d4a4a]">Map</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#d4a055] transition-colors">
                  Store Locator
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#d4a055] transition-colors">
                  Directions
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#d4a055] transition-colors">
                  Visit Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#d4a055] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} The Village, LLC. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
