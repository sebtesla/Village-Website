export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  category: string
  image: string
  featured?: boolean
  tags?: string[]
}

export const blogPosts: BlogPost[] = [
  {
    id: "welcome-to-village",
    title: "Welcome to The Village: Building Our Community",
    excerpt: "Discover the story behind The Village and what makes our community special. Learn about our mission, values, and the journey ahead.",
    content: `
# Welcome to The Village

We're thrilled to have you here! The Village isn't just a brand—it's a community of like-minded individuals who share a passion for quality, creativity, and connection.

## Our Story

The Village was born from a simple idea: create a space where people can come together, express themselves, and feel like they belong. What started as a small group of friends has grown into a thriving community of thousands.

## Our Mission

We believe in:
- **Quality Over Quantity**: Every piece of merch is crafted with care and built to last
- **Community First**: You're not just a customer, you're part of the family
- **Authentic Expression**: Be yourself, unapologetically
- **Positive Impact**: Supporting causes that matter to our community

## What's Next?

We have exciting plans for the future, including exclusive drops, community events, and ways for members to connect both online and in-person. Stay tuned for announcements on Discord and follow us on social media to never miss an update.

Thank you for being part of The Village. Together, we're building something special.

**Welcome home.**
    `,
    author: "The Village Team",
    date: "November 25, 2025",
    category: "community",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
    featured: true,
    tags: ["community", "mission", "welcome"],
  },
  {
    id: "new-merch-drop",
    title: "New Merchandise Drop: Winter Collection 2025",
    excerpt: "Check out our latest winter collection featuring exclusive designs, premium materials, and limited edition pieces you won't want to miss.",
    content: `
# Winter Collection 2025 Now Available

We're excited to announce our Winter 2025 collection is now live! This drop features some of our most requested items, reimagined with premium materials and exclusive designs.

## What's New

### Premium Hoodies & Crewnecks
Our new heavyweight hoodies are perfect for the colder months. Made with a premium cotton blend, they're soft, warm, and built to last. Available in multiple colorways.

### Limited Edition Beanies
Keep warm in style with our new beanie collection. Each one features embroidered Village branding and comes in both classic and bold color options.

### Exclusive Jersey Drop
The Members Only Jersey is finally here! This limited edition piece features unique detailing and will only be available for a short time. Once they're gone, they're gone.

## Quality You Can Feel

Every piece in this collection has been carefully designed and tested to ensure it meets our high standards. We use premium materials and partner with ethical manufacturers.

## How to Get Yours

Head over to our shop and grab your favorites before they sell out. Discord members get early access to future drops, so make sure you're signed in!

**Shop the collection now!**
    `,
    author: "Sarah Johnson",
    date: "November 20, 2025",
    category: "merchandise",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=600&fit=crop",
    featured: true,
    tags: ["merch", "winter", "collection", "new-release"],
  },
  {
    id: "community-meetup",
    title: "Community Meetup: Join Us This Weekend",
    excerpt: "We're hosting our monthly community meetup! Connect with fellow members, enjoy exclusive perks, and be part of something bigger.",
    content: `
# Monthly Community Meetup This Weekend!

Mark your calendars! This Saturday, we're hosting our monthly Village meetup and you're all invited.

## Event Details

**When:** Saturday, November 23rd, 2-6 PM
**Where:** The Village HQ (Address on Discord)
**Who:** All Village members welcome!

## What to Expect

- Meet fellow community members
- Exclusive merch previews
- Free food and drinks
- Games and activities
- Special guest appearances
- Giveaways throughout the day

## How to RSVP

RSVP on our Discord server in the #events channel. Space is limited, so don't wait!

## First Timer?

No worries! Everyone is welcome, whether you've been with us from day one or just joined yesterday. Come as you are and prepare to make some new friends.

See you there!
    `,
    author: "Mike Chen",
    date: "November 18, 2025",
    category: "events",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop",
    tags: ["event", "meetup", "community"],
  },
  {
    id: "styling-guide",
    title: "Style Guide: How to Rock Your Village Merch",
    excerpt: "Get inspired with our styling tips and tricks. Learn how to incorporate Village merch into your everyday wardrobe with confidence.",
    content: `
# Style Guide: Rock Your Village Merch

Looking for inspiration on how to style your Village pieces? We've got you covered with our ultimate styling guide.

## The Basics

### Casual Cool
Pair our classic tee with your favorite jeans and sneakers for an effortless everyday look. Add a Village hat to complete the outfit.

### Layered Looks
Our hoodies are perfect for layering. Throw one over a collared shirt for a smart-casual vibe, or layer under a jacket for extra warmth.

### Street Style
Go bold with our graphic tees. Pair with cargo pants or joggers and chunky sneakers for that streetwear aesthetic.

## Seasonal Styling

### Winter Ready
Layer our crewneck under a denim or bomber jacket. Add our beanie and you're set for any cold weather adventure.

### Summer Vibes
Keep it light with our classic tees and dad hats. Perfect for beach days or casual hangouts.

## Mix and Match

Don't be afraid to mix Village pieces with your existing wardrobe. Our versatile designs complement any style.

**Pro Tip:** Sign up for our Discord to share your Village fits and get featured on our social media!
    `,
    author: "Jessica Smith",
    date: "November 15, 2025",
    category: "lifestyle",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=600&fit=crop",
    tags: ["fashion", "styling", "tips"],
  },
  {
    id: "member-spotlight",
    title: "Member Spotlight: Stories from The Village",
    excerpt: "Meet some of our incredible community members and hear their stories about what The Village means to them.",
    content: `
# Member Spotlight: Your Stories

The Village is nothing without its members. This month, we're highlighting some of the amazing people who make this community special.

## Alex's Story

"I found The Village during a tough time in my life. The community welcomed me with open arms and now I've made friends I'll have for life. It's more than merch—it's family."

## Jordan's Journey

"As a content creator, finding authentic brands to support is rare. The Village gets it. They care about quality and their community, not just making a quick buck."

## Sam's Experience

"I've been collecting Village merch since day one. Each piece has a story, and wearing them makes me feel connected to something bigger than myself."

## Your Story Matters

Want to be featured in our next spotlight? Share your Village story on Discord with the hashtag #MyVillageStory for a chance to be featured!

**Thank you for being part of this journey.**
    `,
    author: "The Village Team",
    date: "November 12, 2025",
    category: "community",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop",
    tags: ["community", "stories", "spotlight"],
  },
  {
    id: "holiday-giveaway",
    title: "Holiday Giveaway: Win Exclusive Village Gear",
    excerpt: "Enter our holiday giveaway for a chance to win exclusive Village merchandise and special edition items. Limited time only!",
    content: `
# Holiday Giveaway is LIVE!

The holiday season is here and we're giving back to our amazing community with our biggest giveaway yet!

## Prize Package

One lucky winner will receive:
- Complete Winter Collection set
- Exclusive limited edition items not available in store
- $500 Village store credit
- VIP access to all 2026 events
- Custom personalized merch

## How to Enter

1. Join our Discord server
2. Follow us on all social platforms
3. Tag 3 friends in the giveaway post
4. Share your favorite Village moment with #VillageGiveaway

## Contest Rules

- Must be 18+ to enter
- Open to US residents only
- Winner announced December 15th
- Multiple entries allowed

## Bonus Entries

Get extra entries by:
- Sharing our posts
- Creating Village content
- Referring friends to join

**Good luck everyone!**
    `,
    author: "Marketing Team",
    date: "November 10, 2025",
    category: "events",
    image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800&h=600&fit=crop",
    tags: ["giveaway", "contest", "holiday"],
  },
  {
    id: "quality-matters",
    title: "Quality Matters: Behind Our Manufacturing Process",
    excerpt: "Take a look behind the scenes at how we create our premium merchandise, from design to production to your doorstep.",
    content: `
# Behind the Scenes: Our Manufacturing Process

Ever wondered how Village merch goes from concept to your closet? Let's take you behind the scenes.

## Design Phase

Every piece starts with our design team. We sketch, iterate, and refine until we have something we're proud of. Community feedback plays a huge role in this process.

## Material Selection

We partner with suppliers who share our values. All materials are:
- Ethically sourced
- Premium quality
- Sustainable when possible
- Rigorously tested

## Production

We work with certified manufacturers who treat workers fairly and maintain high quality standards. Every piece is inspected before shipping.

## Quality Control

Before any product reaches you, it goes through multiple quality checks:
- Print quality inspection
- Fit and sizing verification
- Durability testing
- Final packaging review

## Sustainable Practices

We're committed to reducing our environmental impact through:
- Eco-friendly packaging
- Carbon-neutral shipping options
- Minimal waste production methods

**Quality isn't just a promise—it's our standard.**
    `,
    author: "Production Team",
    date: "November 5, 2025",
    category: "merchandise",
    image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=800&h=600&fit=crop",
    tags: ["quality", "manufacturing", "behind-the-scenes"],
  },
  {
    id: "discord-community",
    title: "Join Our Discord: Connect with The Village Online",
    excerpt: "Our Discord community is growing! Join thousands of members for exclusive drops, giveaways, and daily conversations.",
    content: `
# Join The Village Discord

Our Discord server is the heart of The Village community. With over 10,000 members and growing, it's where all the magic happens.

## What You'll Find

### Exclusive Channels
- Early access to new drops
- Members-only sales
- Behind-the-scenes content
- Direct communication with the team

### Community Features
- General chat and hangouts
- Gaming sessions
- Content creator showcases
- Event coordination

### Perks & Benefits
- Discord-exclusive giveaways
- Special roles and recognition
- Vote on future designs
- Priority customer support

## How to Join

Click the Discord icon in our header or visit our social links. Verify your account and you're in!

## Community Guidelines

We're building a positive, inclusive space. Be respectful, supportive, and authentic. Full guidelines are in the server.

## Active & Growing

New channels and features are added regularly based on member feedback. Have an idea? Let us know in #suggestions!

**See you on Discord!**
    `,
    author: "Community Manager",
    date: "November 1, 2025",
    category: "community",
    image: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800&h=600&fit=crop",
    tags: ["discord", "community", "online"],
  },
]

export function getBlogPost(id: string): BlogPost | undefined {
  return blogPosts.find(post => post.id === id)
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  if (category === "all") return blogPosts
  return blogPosts.filter(post => post.category === category)
}
