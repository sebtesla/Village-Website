import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ProductCardProps {
  id: string
  name: string
  price: number
  image: string
  badge?: string
  sizes?: string[]
}

export function ProductCard({ id, name, price, image, badge, sizes }: ProductCardProps) {
  return (
    <Card className="group relative overflow-hidden border-0 shadow-none bg-transparent">
      <Link href={`/products/${id}`} className="block">
        {/* Badge */}
        {badge && (
          <Badge className="absolute top-3 left-3 z-10 bg-[#d4a055] hover:bg-[#c99445] text-[#0d4a4a] border-0 font-bold">
            {badge}
          </Badge>
        )}

        {/* Image Container */}
        <div className="relative aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={image || "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop&q=80"}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            unoptimized
          />
        </div>

        {/* Product Info */}
        <div className="text-center space-y-2">
          <h3 className="font-semibold text-sm uppercase tracking-wide text-gray-900 group-hover:text-[#0d4a4a] transition-colors">
            {name}
          </h3>
          <p className="text-lg font-bold text-[#d4a055]">
            ${price}
          </p>
        </div>
      </Link>

      {/* Quick Add Sizes */}
      {sizes && sizes.length > 0 && (
        <div className="mt-3 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-xs text-gray-500">Quick Add</span>
          {sizes.map((size) => (
            <Button
              key={size}
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 text-xs hover:bg-[#0d4a4a] hover:text-white hover:border-[#0d4a4a]"
            >
              {size}
            </Button>
          ))}
        </div>
      )}
    </Card>
  )
}
