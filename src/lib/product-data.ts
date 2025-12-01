export interface Product {
  id: string
  name: string
  price: number
  description: string
  images: string[]
  image?: string
  badge?: string
  category: string
  sizes?: string[]
  colors?: string[]
  inStock: boolean
  features?: string[]
}

export const products: Product[] = [
  {
    id: "village-hat-green",
    name: "The Village Hat (Green)",
    price: 35,
    description: "Our signature snapback in forest green. Features embroidered Village logo on the front and adjustable strap for the perfect fit. Made with premium cotton twill for comfort and durability.",
    images: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1589487391730-58f20eb2c308?w=800&h=800&fit=crop&q=80",
    ],
    badge: "BUY 1 GET 1 FREE",
    category: "hats",
    colors: ["Green", "Black", "Navy"],
    inStock: true,
    features: [
      "Embroidered Village logo",
      "Adjustable snapback closure",
      "Premium cotton twill",
      "One size fits most",
      "Structured 6-panel design",
    ],
  },
  {
    id: "village-members-jersey",
    name: "The Village Members Only Jersey",
    price: 65,
    description: "Exclusive members-only jersey featuring premium mesh fabric and bold Village branding. This limited edition piece is a must-have for true Village supporters.",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=800&fit=crop&q=80",
    ],
    category: "apparel",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White/Green", "Black/Gold"],
    inStock: true,
    features: [
      "Premium mesh fabric",
      "Screen-printed graphics",
      "Athletic fit",
      "Limited edition design",
      "Officially licensed",
    ],
  },
  {
    id: "soapy-tee-black",
    name: "Soapy Graphic Tee (Black)",
    price: 32,
    description: "Bold graphic tee featuring original Soapy artwork. Made from ultra-soft cotton blend for all-day comfort. A conversation starter wherever you go.",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&h=800&fit=crop&q=80",
    ],
    category: "apparel",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "White"],
    inStock: true,
    features: [
      "100% premium cotton",
      "Original artwork",
      "Pre-shrunk fabric",
      "Ribbed crew neck",
      "Regular fit",
    ],
  },
  {
    id: "village-beanie",
    name: "The Village Beanie",
    price: 28,
    description: "Classic cuffed beanie to keep you warm in style. Features woven Village patch and stretchy knit construction. Perfect for cold weather adventures.",
    images: [
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&h=800&fit=crop",
    ],
    category: "hats",
    colors: ["Black", "Green", "Grey"],
    inStock: true,
    features: [
      "Woven logo patch",
      "Stretchy knit fabric",
      "Cuffed design",
      "One size fits most",
      "Machine washable",
    ],
  },
  {
    id: "village-hoodie-black",
    name: "The Village Logo Hoodie (Black)",
    price: 60,
    description: "Ultra-comfortable heavyweight hoodie with embroidered Village logo. Features a spacious kangaroo pocket and drawstring hood. Built to last through countless wears.",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=800&fit=crop",
    ],
    category: "apparel",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Green", "Grey"],
    inStock: true,
    features: [
      "Heavyweight 80/20 cotton/poly blend",
      "Embroidered logo",
      "Kangaroo pocket",
      "Drawstring hood",
      "Ribbed cuffs and waistband",
    ],
  },
  {
    id: "village-tee-white",
    name: "The Village Classic Tee (White)",
    price: 30,
    description: "Essential white tee with subtle Village branding. Made from soft, breathable cotton. A wardrobe staple that pairs with everything.",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&h=800&fit=crop",
    ],
    category: "apparel",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black", "Grey"],
    inStock: true,
    features: [
      "100% ring-spun cotton",
      "Screen-printed logo",
      "Classic fit",
      "Pre-shrunk",
      "Tear-away label",
    ],
  },
  {
    id: "village-dad-hat",
    name: "The Village Dad Hat",
    price: 32,
    description: "Relaxed fit dad hat with embroidered Village logo. Unstructured crown and curved brim for a casual, comfortable look. Your new favorite everyday hat.",
    images: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1589487391730-58f20eb2c308?w=800&h=800&fit=crop",
    ],
    category: "hats",
    colors: ["Khaki", "Black", "Navy"],
    inStock: true,
    features: [
      "Unstructured crown",
      "Embroidered logo",
      "Adjustable strap",
      "Curved brim",
      "100% cotton",
    ],
  },
  {
    id: "village-crewneck",
    name: "The Village Crewneck Sweatshirt",
    price: 55,
    description: "Classic crewneck sweatshirt with vintage-inspired Village graphics. Soft fleece interior keeps you cozy. Perfect for layering or wearing solo.",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop",
    ],
    category: "apparel",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Grey", "Black", "Green"],
    inStock: true,
    features: [
      "Fleece-lined interior",
      "Screen-printed graphics",
      "Ribbed collar and cuffs",
      "Regular fit",
      "50/50 cotton/poly blend",
    ],
  },
  {
    id: "village-snapback",
    name: "The Village Snapback",
    price: 38,
    description: "Premium snapback with flat brim and 3D embroidered logo. Structured crown maintains shape wear after wear. Bold style for the confident.",
    images: [
      "https://images.unsplash.com/photo-1589487391730-58f20eb2c308?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&h=800&fit=crop",
    ],
    category: "hats",
    colors: ["Black/Gold", "Green/White", "Navy/White"],
    inStock: true,
    features: [
      "3D embroidered logo",
      "Structured 6-panel",
      "Flat brim",
      "Snapback closure",
      "Premium wool blend",
    ],
  },
  {
    id: "village-long-sleeve",
    name: "The Village Long Sleeve Tee",
    price: 40,
    description: "Long sleeve tee with sleeve and back prints. Heavyweight cotton construction for durability. Great for cooler weather or layering.",
    images: [
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop",
    ],
    category: "apparel",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "White", "Olive"],
    inStock: true,
    features: [
      "Heavyweight cotton",
      "Sleeve and back prints",
      "Ribbed cuffs",
      "Crew neck",
      "Regular fit",
    ],
  },
  {
    id: "village-tote-bag",
    name: "The Village Tote Bag",
    price: 25,
    description: "Spacious canvas tote bag with Village branding. Perfect for groceries, gym gear, or everyday carry. Durable construction that gets better with age.",
    images: [
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1553830591-d8632a99e6ff?w=800&h=800&fit=crop",
    ],
    category: "accessories",
    colors: ["Natural/Black", "Black/Gold"],
    inStock: true,
    features: [
      "Heavy-duty canvas",
      "Screen-printed logo",
      "Reinforced handles",
      "Interior pocket",
      "15L capacity",
    ],
  },
  {
    id: "village-zip-hoodie",
    name: "The Village Zip-Up Hoodie",
    price: 70,
    description: "Premium zip-up hoodie with full front zipper and dual pockets. Ultra-soft fleece interior for maximum comfort. New arrival, limited quantities available.",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=800&fit=crop",
    ],
    badge: "NEW ARRIVAL",
    category: "apparel",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Green", "Navy"],
    inStock: true,
    features: [
      "Full-length YKK zipper",
      "Dual side pockets",
      "Fleece-lined hood",
      "Ribbed cuffs and hem",
      "Premium cotton/poly blend",
    ],
  },
]

export function getProduct(id: string): Product | undefined {
  return products.find(product => product.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "all") return products
  return products.filter(product => product.category === category)
}

export function getRelatedProducts(productId: string, limit: number = 4): Product[] {
  const product = getProduct(productId)
  if (!product) return []

  return products
    .filter(p => p.category === product.category && p.id !== productId)
    .slice(0, limit)
}
