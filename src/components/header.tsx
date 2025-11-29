"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, Search, ShoppingCart, X, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useSession, signIn, signOut } from "next-auth/react"
import { useCartStore } from "@/store/cart-store"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { data: session, status } = useSession()
  const isLoading = status === "loading"
  const { getTotalItems } = useCartStore()
  const cartItemCount = getTotalItems()

  return (
    <header className="bg-[#0d4a4a] text-white sticky top-0 z-50">
      {/* Promo Banner */}
      <div className="bg-gradient-to-r from-[#d4a055] to-[#c99445] text-[#0d4a4a] text-center py-2 px-4 text-sm font-bold">
        FREE SHIPPING ON ORDERS OVER $75
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-[#0d4a4a] text-white border-[#d4a055]">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/shop" className="text-lg hover:text-[#d4a055] transition-colors">
                  SHOP
                </Link>
                <Link href="/map" className="text-lg hover:text-[#d4a055] transition-colors">
                  MAP
                </Link>
                <Link href="/blog" className="text-lg hover:text-[#d4a055] transition-colors">
                  BLOG
                </Link>
                <Link href="/about" className="text-lg hover:text-[#d4a055] transition-colors">
                  ABOUT
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#d4a055] rounded-lg flex items-center justify-center">
              <span className="text-[#0d4a4a] font-bold text-xl">TV</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-bold tracking-wider">THE VILLAGE</span>
              <span className="text-xs tracking-widest text-[#d4a055]">MERCH</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/shop" className="text-sm font-medium hover:text-[#d4a055] transition-colors tracking-wide">
              SHOP
            </Link>
            <Link href="/map" className="text-sm font-medium hover:text-[#d4a055] transition-colors tracking-wide">
              MAP
            </Link>
            <Link href="/blog" className="text-sm font-medium hover:text-[#d4a055] transition-colors tracking-wide">
              BLOG
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-[#d4a055] transition-colors tracking-wide">
              ABOUT
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Search className="h-5 w-5" />
            </Button>

            {/* Login/User Menu */}
            {session ? (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 relative">
                    {session.user?.image ? (
                      <div className="relative w-8 h-8 rounded-full overflow-hidden">
                        <Image
                          src={session.user.image}
                          alt={session.user.name || "User"}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <User className="h-5 w-5" />
                    )}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center">Account</DialogTitle>
                    <DialogDescription className="text-center pt-2">
                      Welcome back, {session.user?.name || "Member"}!
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-col gap-4 py-4">
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      {session.user?.image && (
                        <div className="relative w-16 h-16 rounded-full overflow-hidden">
                          <Image
                            src={session.user.image}
                            alt={session.user.name || "User"}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <p className="font-semibold">{session.user?.name}</p>
                        <p className="text-sm text-gray-600">{session.user?.email}</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full h-12 gap-2"
                      onClick={() => signOut()}
                    >
                      <LogOut className="h-5 w-5" />
                      Sign Out
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            ) : (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" disabled={isLoading}>
                    <User className="h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center">Welcome to The Village</DialogTitle>
                    <DialogDescription className="text-center pt-2">
                      Sign in to access exclusive merch and member benefits
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
                    <div className="text-center text-sm text-gray-500">
                      By signing in, you agree to our Terms of Service and Privacy Policy
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}

            <Link href="/cart">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#d4a055] text-[#0d4a4a] text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
