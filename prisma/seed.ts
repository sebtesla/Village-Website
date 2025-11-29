import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seed...')

  // Clear existing data (optional)
  console.log('Clearing existing data...')
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.blogComment.deleteMany()
  await prisma.blogPost.deleteMany()
  await prisma.product.deleteMany()

  // Seed Products
  console.log('Seeding products...')

  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'The Village Hat (Green)',
        slug: 'village-hat-green',
        description: 'Our signature snapback in forest green. Features embroidered Village logo on the front and adjustable strap for the perfect fit.',
        price: 35,
        category: 'hats',
        images: [
          'https://i.imgur.com/vubIpVS.jpg',
          'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&h=800&fit=crop',
        ],
        sizes: [],
        colors: ['Green', 'Black', 'Navy'],
        badge: 'BUY 1 GET 1 FREE',
        inStock: true,
        features: ['Embroidered logo', 'Adjustable snapback', 'Premium cotton', 'One size fits most'],
      },
    }),
    prisma.product.create({
      data: {
        name: 'The Village Members Only Jersey',
        slug: 'village-members-jersey',
        description: 'Exclusive members-only jersey featuring premium mesh fabric and bold Village branding.',
        price: 65,
        category: 'apparel',
        images: [
          'https://i.imgur.com/unWG7QQ.jpg',
          'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop',
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['White/Green', 'Black/Gold'],
        inStock: true,
        featured: true,
        features: ['Premium mesh', 'Screen-printed graphics', 'Athletic fit', 'Limited edition'],
      },
    }),
    prisma.product.create({
      data: {
        name: 'Soapy Graphic Tee (Black)',
        slug: 'soapy-tee-black',
        description: 'Bold graphic tee featuring original Soapy artwork. Made from ultra-soft cotton blend.',
        price: 32,
        category: 'apparel',
        images: [
          'https://i.imgur.com/TzJUEME.jpg',
          'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop',
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Black', 'White'],
        inStock: true,
        features: ['100% cotton', 'Original artwork', 'Pre-shrunk', 'Regular fit'],
      },
    }),
    prisma.product.create({
      data: {
        name: 'The Village Beanie',
        slug: 'village-beanie',
        description: 'Classic cuffed beanie to keep you warm in style.',
        price: 28,
        category: 'hats',
        images: ['https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&h=800&fit=crop'],
        sizes: [],
        colors: ['Black', 'Green', 'Grey'],
        inStock: true,
        features: ['Woven logo patch', 'Stretchy knit', 'One size', 'Machine washable'],
      },
    }),
    prisma.product.create({
      data: {
        name: 'The Village Logo Hoodie (Black)',
        slug: 'village-hoodie-black',
        description: 'Ultra-comfortable heavyweight hoodie with embroidered Village logo.',
        price: 60,
        category: 'apparel',
        images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Black', 'Green', 'Grey'],
        inStock: true,
        featured: true,
        features: ['80/20 cotton/poly', 'Embroidered logo', 'Kangaroo pocket', 'Drawstring hood'],
      },
    }),
  ])

  console.log(`Created ${products.length} products`)

  // Seed Blog Posts
  console.log('Seeding blog posts...')

  const blogPosts = await Promise.all([
    prisma.blogPost.create({
      data: {
        slug: 'welcome-to-village',
        title: 'Welcome to The Village: Building Our Community',
        excerpt: 'Discover the story behind The Village and what makes our community special.',
        content: `# Welcome to The Village\n\nWe're thrilled to have you here! The Village isn't just a brand—it's a community of like-minded individuals who share a passion for quality, creativity, and connection.\n\n## Our Story\n\nThe Village was born from a simple idea: create a space where people can come together, express themselves, and feel like they belong. What started as a small group of friends has grown into a thriving community of thousands.\n\n## Our Mission\n\nWe believe in:\n- **Quality Over Quantity**: Every piece of merch is crafted with care and built to last\n- **Community First**: You're not just a customer, you're part of the family\n- **Authentic Expression**: Be yourself, unapologetically\n- **Positive Impact**: Supporting causes that matter to our community\n\nWelcome home.`,
        author: 'The Village Team',
        category: 'community',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop',
        featured: true,
        tags: ['community', 'mission', 'welcome'],
      },
    }),
    prisma.blogPost.create({
      data: {
        slug: 'new-merch-drop',
        title: 'New Merchandise Drop: Winter Collection 2025',
        excerpt: 'Check out our latest winter collection featuring exclusive designs and premium materials.',
        content: `# Winter Collection 2025 Now Available\n\nWe're excited to announce our Winter 2025 collection is now live!\n\n## What's New\n\n### Premium Hoodies & Crewnecks\nOur new heavyweight hoodies are perfect for the colder months.\n\n### Limited Edition Beanies\nKeep warm in style with our new beanie collection.\n\n**Shop the collection now!**`,
        author: 'Sarah Johnson',
        category: 'merchandise',
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=600&fit=crop',
        featured: true,
        tags: ['merch', 'winter', 'new-release'],
      },
    }),
  ])

  console.log(`Created ${blogPosts.length} blog posts`)

  console.log('Database seed completed!')
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
