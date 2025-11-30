# 🏘️ The Village Merch Store

> Premium e-commerce platform for The Village community

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://therustvillage.netlify.app)
[![Built with Same](https://img.shields.io/badge/built%20with-Same-blue)](https://same.new)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## ✨ Features

### 🛍️ E-Commerce
- **12+ Premium Products** - Hats, apparel, and accessories
- **Shopping Cart** - Persistent cart with Zustand state management
- **Stripe Checkout** - Secure payment processing
- **Order Tracking** - Track orders with email notifications
- **Discount Codes** - Promotional code system

### 📝 Content Management
- **Blog System** - 7+ blog posts with categories and tags
- **Admin Panel** - Manage products, blog posts, and orders
- **Database Seeding** - Quick setup with sample data
- **Image Management** - Easy product image uploads

### 🔐 Authentication & Security
- **NextAuth** - OAuth with Discord integration
- **Role-based Access** - Admin and customer roles
- **Secure Checkout** - PCI-compliant Stripe integration

### 🎨 Design & UX
- **Responsive Design** - Mobile-first approach
- **Tailwind CSS** - Modern, customizable styling
- **shadcn/ui Components** - Accessible, beautiful UI
- **PWA Support** - Install as mobile app
- **Custom Favicon** - Brand identity

## 🚀 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL (Supabase)
- **ORM:** Prisma
- **Authentication:** NextAuth.js
- **Payments:** Stripe
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **State Management:** Zustand
- **Deployment:** Netlify
- **Runtime:** Bun

## 📦 Installation

### Prerequisites
- Node.js 18+ or Bun
- PostgreSQL database (or Supabase account)
- Stripe account
- Discord OAuth app (optional)

### Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/sebtesla/the-village-merch-store.git
cd the-village-merch-store
```

2. **Install dependencies**
```bash
bun install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:
```env
# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here"

# Discord OAuth (optional)
DISCORD_CLIENT_ID="your-discord-client-id"
DISCORD_CLIENT_SECRET="your-discord-client-secret"

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

4. **Set up the database**
```bash
# Generate Prisma client
bun run prisma generate

# Run migrations
bun run db:migrate

# Seed with sample data
bun run db:seed
```

5. **Start the development server**
```bash
bun run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
the-village-merch-store/
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Sample data
├── public/
│   ├── icons/             # PWA icons
│   └── screenshots/       # PWA screenshots
├── src/
│   ├── app/
│   │   ├── admin/         # Admin panel
│   │   ├── api/           # API routes
│   │   ├── blog/          # Blog pages
│   │   ├── cart/          # Shopping cart
│   │   ├── products/      # Product pages
│   │   └── shop/          # Shop page
│   ├── components/
│   │   ├── ui/            # shadcn/ui components
│   │   ├── header.tsx
│   │   └── footer.tsx
│   ├── lib/
│   │   ├── prisma.ts      # Database client
│   │   └── utils.ts
│   └── store/
│       └── cart-store.ts  # Zustand store
├── next.config.js
├── tailwind.config.ts
└── package.json
```

## 🎯 Key Features Guide

### Admin Panel
Access at `/admin` with admin credentials:
- Product Management
- Blog Post Management
- Order Analytics
- Database Seeding
- Discount Code Management

### Product Management
1. Navigate to Admin → Products
2. View all products with images and stock status
3. Upload product images (URLs or file uploads)
4. See the [Product Management Guide](PRODUCT_MANAGEMENT.md)

### Blog System
- Create and manage blog posts
- Categories: community, events, merchandise, updates
- Featured posts support
- Markdown content support

### Payment Processing
- Integrated with Stripe Checkout
- Automatic order creation on successful payment
- Email notifications via Resend
- Order tracking system

## 🗄️ Database Schema

```prisma
model Product {
  id          String   @id @default(uuid())
  name        String
  slug        String   @unique
  description String
  price       Decimal
  category    String
  images      String[]
  sizes       String[]
  colors      String[]
  badge       String?
  inStock     Boolean  @default(true)
  featured    Boolean  @default(false)
  features    String[]
}

model BlogPost {
  id       String   @id @default(uuid())
  slug     String   @unique
  title    String
  excerpt  String
  content  String
  author   String
  category String
  image    String
  featured Boolean  @default(false)
  tags     String[]
}

// ... and more (Order, User, etc.)
```

## 🔧 Configuration

### Database Setup
See [DATABASE_SETUP.md](DATABASE_SETUP.md) for detailed instructions.

### Discord OAuth
See [DISCORD_OAUTH_SETUP.md](DISCORD_OAUTH_SETUP.md) for Discord app setup.

### Stripe Integration
See [STRIPE_SETUP.md](STRIPE_SETUP.md) for payment configuration.

### Email Notifications
See [EMAIL_SETUP.md](EMAIL_SETUP.md) for Resend configuration.

## 🚀 Deployment

### Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/sebtesla/the-village-merch-store)

1. Connect your GitHub repository
2. Add environment variables
3. Deploy!

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed instructions.

### Environment Variables for Production
Make sure to set all required environment variables in your Netlify dashboard.

## 📸 Screenshots

### Homepage
![Homepage](https://via.placeholder.com/800x400?text=Homepage+Screenshot)

### Shop Page
![Shop](https://via.placeholder.com/800x400?text=Shop+Page+Screenshot)

### Admin Panel
![Admin](https://via.placeholder.com/800x400?text=Admin+Panel+Screenshot)

## 🤝 Contributing

This is a personal project, but suggestions and feedback are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Documentation

- [Quick Setup Guide](QUICK_SETUP.md)
- [Product Management](PRODUCT_MANAGEMENT.md)
- [Blog Management](BLOG_MANAGEMENT.md)
- [Database Setup](DATABASE_SETUP.md)
- [Discord OAuth Setup](DISCORD_OAUTH_SETUP.md)
- [Stripe Setup](STRIPE_SETUP.md)
- [Email Setup](EMAIL_SETUP.md)
- [PWA Guide](PWA_GUIDE.md)
- [Deployment Guide](DEPLOYMENT_GUIDE.md)

## 🐛 Known Issues

- TypeScript `minimatch` error in linter (non-blocking)
- Some hydration warnings in development mode

## 📄 License

MIT License - feel free to use this project as a template for your own store!

## 🙏 Acknowledgments

- Built with [Same](https://same.new) - AI-powered development platform
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Icons from [Lucide](https://lucide.dev)

## 🔗 Links

- **Live Demo:** https://therustvillage.netlify.app
- **GitHub:** https://github.com/sebtesla/the-village-merch-store
- **Built with:** [Same.new](https://same.new)

---

**Made with ❤️ for The Village community**
