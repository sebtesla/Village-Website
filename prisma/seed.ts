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
    // HATS (4 products)
    prisma.product.create({
      data: {
        name: 'The Village Hat (Green)',
        slug: 'village-hat-green',
        description: 'Our signature snapback in forest green. Features embroidered Village logo on the front and adjustable strap for the perfect fit. Made with premium cotton twill for comfort and durability.',
        price: 35,
        category: 'hats',
        images: [
          'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&h=800&fit=crop&q=80',
          'https://images.unsplash.com/photo-1589487391730-58f20eb2c308?w=800&h=800&fit=crop&q=80',
        ],
        sizes: [],
        colors: ['Green', 'Black', 'Navy'],
        badge: 'BUY 1 GET 1 FREE',
        inStock: true,
        features: ['Embroidered Village logo', 'Adjustable snapback closure', 'Premium cotton twill', 'One size fits most', 'Structured 6-panel design'],
      },
    }),
    prisma.product.create({
      data: {
        name: 'The Village Beanie',
        slug: 'village-beanie',
        description: 'Classic cuffed beanie to keep you warm in style. Features woven Village patch and stretchy knit construction. Perfect for cold weather adventures.',
        price: 28,
        category: 'hats',
        images: [
          'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&h=800&fit=crop&q=80',
          'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&h=800&fit=crop&q=80',
        ],
        sizes: [],
        colors: ['Black', 'Green', 'Grey'],
        inStock: true,
        features: ['Woven logo patch', 'Stretchy knit fabric', 'Cuffed design', 'One size fits most', 'Machine washable'],
      },
    }),
    prisma.product.create({
      data: {
        name: 'The Village Dad Hat',
        slug: 'village-dad-hat',
        description: 'Relaxed fit dad hat with embroidered Village logo. Unstructured crown and curved brim for a casual, comfortable look. Your new favorite everyday hat.',
        price: 32,
        category: 'hats',
        images: [
          'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&h=800&fit=crop&q=80',
          'https://images.unsplash.com/photo-1589487391730-58f20eb2c308?w=800&h=800&fit=crop&q=80',
        ],
        sizes: [],
        colors: ['Khaki', 'Black', 'Navy'],
        inStock: true,
        features: ['Unstructured crown', 'Embroidered logo', 'Adjustable strap', 'Curved brim', '100% cotton'],
      },
    }),
    prisma.product.create({
      data: {
        name: 'The Village Snapback',
        slug: 'village-snapback',
        description: 'Premium snapback with flat brim and 3D embroidered logo. Structured crown maintains shape wear after wear. Bold style for the confident.',
        price: 38,
        category: 'hats',
        images: [
          'https://images.unsplash.com/photo-1589487391730-58f20eb2c308?w=800&h=800&fit=crop&q=80',
          'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&h=800&fit=crop&q=80',
        ],
        sizes: [],
        colors: ['Black/Gold', 'Green/White', 'Navy/White'],
        inStock: true,
        features: ['3D embroidered logo', 'Structured 6-panel', 'Flat brim', 'Snapback closure', 'Premium wool blend'],
      },
    }),

    // APPAREL (7 products)
    prisma.product.create({
      data: {
        name: 'The Village Members Only Jersey',
        slug: 'village-members-jersey',
        description: 'Exclusive members-only jersey featuring premium mesh fabric and bold Village branding. This limited edition piece is a must-have for true Village supporters.',
        price: 65,
        category: 'apparel',
        images: [
          'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop&q=80',
          'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=800&fit=crop&q=80',
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['White/Green', 'Black/Gold'],
        inStock: true,
        featured: true,
        features: ['Premium mesh fabric', 'Screen-printed graphics', 'Athletic fit', 'Limited edition design', 'Officially licensed'],
      },
    }),
    prisma.product.create({
      data: {
        name: 'Soapy Graphic Tee (Black)',
        slug: 'soapy-tee-black',
        description: 'Bold graphic tee featuring original Soapy artwork. Made from ultra-soft cotton blend for all-day comfort. A conversation starter wherever you go.',
        price: 32,
        category: 'apparel',
        images: [
          'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop&q=80',
          'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&h=800&fit=crop&q=80',
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Black', 'White'],
        inStock: true,
        features: ['100% premium cotton', 'Original artwork', 'Pre-shrunk fabric', 'Ribbed crew neck', 'Regular fit'],
      },
    }),
    prisma.product.create({
      data: {
        name: 'The Village Logo Hoodie (Black)',
        slug: 'village-hoodie-black',
        description: 'Ultra-comfortable heavyweight hoodie with embroidered Village logo. Features a spacious kangaroo pocket and drawstring hood. Built to last through countless wears.',
        price: 60,
        category: 'apparel',
        images: [
          'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop&q=80',
          'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=800&fit=crop&q=80',
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Black', 'Green', 'Grey'],
        inStock: true,
        featured: true,
        features: ['Heavyweight 80/20 cotton/poly blend', 'Embroidered logo', 'Kangaroo pocket', 'Drawstring hood', 'Ribbed cuffs and waistband'],
      },
    }),
    prisma.product.create({
      data: {
        name: 'The Village Classic Tee (White)',
        slug: 'village-tee-white',
        description: 'Essential white tee with subtle Village branding. Made from soft, breathable cotton. A wardrobe staple that pairs with everything.',
        price: 30,
        category: 'apparel',
        images: [
          'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop&q=80',
          'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&h=800&fit=crop&q=80',
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['White', 'Black', 'Grey'],
        inStock: true,
        features: ['100% ring-spun cotton', 'Screen-printed logo', 'Classic fit', 'Pre-shrunk', 'Tear-away label'],
      },
    }),
    prisma.product.create({
      data: {
        name: 'The Village Crewneck Sweatshirt',
        slug: 'village-crewneck',
        description: 'Classic crewneck sweatshirt with vintage-inspired Village graphics. Soft fleece interior keeps you cozy. Perfect for layering or wearing solo.',
        price: 55,
        category: 'apparel',
        images: [
          'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=800&fit=crop&q=80',
          'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop&q=80',
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Grey', 'Black', 'Green'],
        inStock: true,
        features: ['Fleece-lined interior', 'Screen-printed graphics', 'Ribbed collar and cuffs', 'Regular fit', '50/50 cotton/poly blend'],
      },
    }),
    prisma.product.create({
      data: {
        name: 'The Village Long Sleeve Tee',
        slug: 'village-long-sleeve',
        description: 'Long sleeve tee with sleeve and back prints. Heavyweight cotton construction for durability. Great for cooler weather or layering.',
        price: 40,
        category: 'apparel',
        images: [
          'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&h=800&fit=crop&q=80',
          'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop&q=80',
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Black', 'White', 'Olive'],
        inStock: true,
        features: ['Heavyweight cotton', 'Sleeve and back prints', 'Ribbed cuffs', 'Crew neck', 'Regular fit'],
      },
    }),
    prisma.product.create({
      data: {
        name: 'The Village Zip-Up Hoodie',
        slug: 'village-zip-hoodie',
        description: 'Premium zip-up hoodie with full front zipper and dual pockets. Ultra-soft fleece interior for maximum comfort. New arrival, limited quantities available.',
        price: 70,
        category: 'apparel',
        images: [
          'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=800&fit=crop&q=80',
          'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop&q=80',
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Black', 'Green', 'Navy'],
        badge: 'NEW ARRIVAL',
        inStock: true,
        features: ['Full-length YKK zipper', 'Dual side pockets', 'Fleece-lined hood', 'Ribbed cuffs and hem', 'Premium cotton/poly blend'],
      },
    }),

    // ACCESSORIES (1 product)
    prisma.product.create({
      data: {
        name: 'The Village Tote Bag',
        slug: 'village-tote-bag',
        description: 'Spacious canvas tote bag with Village branding. Perfect for groceries, gym gear, or everyday carry. Durable construction that gets better with age.',
        price: 25,
        category: 'accessories',
        images: [
          'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=800&fit=crop&q=80',
          'https://images.unsplash.com/photo-1553830591-d8632a99e6ff?w=800&h=800&fit=crop&q=80',
        ],
        sizes: [],
        colors: ['Natural/Black', 'Black/Gold'],
        inStock: true,
        features: ['Heavy-duty canvas', 'Screen-printed logo', 'Reinforced handles', 'Interior pocket', '15L capacity'],
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
    prisma.blogPost.create({
      data: {
        slug: 'community-spotlight-march',
        title: 'Community Spotlight: Member of the Month',
        excerpt: 'Meet this month\'s featured community member and learn about their Village journey.',
        content: `# Community Spotlight\n\nEvery month, we highlight an amazing member of The Village community.\n\n## This Month's Feature\n\nWe're proud to feature Alex, a long-time supporter who has been with us since day one. Alex has helped organize local meetups and has been instrumental in growing our community.\n\n## Get Involved\n\nWant to be featured? Join our Discord and get active in the community!`,
        author: 'The Village Team',
        category: 'community',
        image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop',
        featured: false,
        tags: ['community', 'spotlight', 'members'],
      },
    }),
    prisma.blogPost.create({
      data: {
        slug: 'spring-meetup-2025',
        title: 'Spring Meetup 2025: Save the Date',
        excerpt: 'Join us for our biggest community event of the year! Food, games, and exclusive merch drops.',
        content: `# Spring Meetup 2025\n\nMark your calendars! Our annual Spring Meetup is happening April 15-16, 2025.\n\n## What to Expect\n\n- Live music and entertainment\n- Exclusive merch drops\n- Meet and greets with the team\n- Community games and activities\n- Food trucks and refreshments\n\n## Register Now\n\nSpaces are limited! Head to our Discord for registration details.\n\n**See you there!**`,
        author: 'Events Team',
        category: 'events',
        image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop',
        featured: false,
        tags: ['events', 'meetup', '2025'],
      },
    }),
    prisma.blogPost.create({
      data: {
        slug: 'behind-the-designs',
        title: 'Behind the Designs: How We Create Your Favorite Merch',
        excerpt: 'Get an inside look at our design process and meet the artists behind your favorite pieces.',
        content: `# Behind the Designs\n\nEver wondered how your favorite merch comes to life? Let's take you behind the scenes.\n\n## The Design Process\n\n1. **Concept**: We start with community feedback and trends\n2. **Sketching**: Our artists create initial designs\n3. **Review**: Community input helps refine the designs\n4. **Production**: We work with premium manufacturers\n5. **Quality Check**: Every piece is inspected\n\n## Meet the Artists\n\nOur design team consists of talented artists from around the world, each bringing their unique style to The Village.\n\n**Stay tuned for more exclusive content!**`,
        author: 'Design Team',
        category: 'merchandise',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
        featured: false,
        tags: ['design', 'behind-the-scenes', 'merch'],
      },
    }),
    prisma.blogPost.create({
      data: {
        slug: 'year-in-review-2024',
        title: '2024 Year in Review: Thank You Village!',
        excerpt: 'Looking back at an incredible year with our amazing community. Thank you for everything!',
        content: `# 2024: A Year to Remember\n\nWhat an incredible year it's been! Let's look back at some highlights.\n\n## By the Numbers\n\n- 10,000+ new community members\n- 15 product launches\n- 8 community events\n- 50,000+ orders shipped\n\n## Biggest Moments\n\n### Summer Festival\nOur first major festival was a massive success with over 1,000 attendees!\n\n### Limited Edition Drops\nMultiple sold-out releases proved you all have amazing taste.\n\n### Community Growth\nWatching our Discord grow to over 25,000 members has been incredible.\n\n## Looking Ahead to 2025\n\nWe have so much planned for next year. Stay tuned!\n\n**Thank you for being part of The Village!**`,
        author: 'The Village Team',
        category: 'updates',
        image: 'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=800&h=600&fit=crop',
        featured: false,
        tags: ['year-review', '2024', 'community'],
      },
    }),
    prisma.blogPost.create({
      data: {
        slug: 'sustainability-initiative',
        title: 'Our Commitment to Sustainability',
        excerpt: 'Learn about our new sustainability initiatives and how we\'re reducing our environmental impact.',
        content: `# Sustainability at The Village\n\nWe're committed to reducing our environmental footprint.\n\n## New Initiatives\n\n### Eco-Friendly Packaging\nAll our packaging is now 100% recyclable or compostable.\n\n### Sustainable Materials\nWe're partnering with suppliers who use organic and recycled materials.\n\n### Carbon Neutral Shipping\nWe're offsetting all shipping emissions.\n\n### Local Production\nReducing transportation by manufacturing closer to our communities.\n\n## Your Impact\n\nEvery purchase supports these initiatives. Together, we're making a difference.\n\n**Thank you for caring about our planet!**`,
        author: 'The Village Team',
        category: 'updates',
        image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop',
        featured: false,
        tags: ['sustainability', 'environment', 'impact'],
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
