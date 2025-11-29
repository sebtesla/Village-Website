# The Village Merch Store - Complete Setup Guide

Welcome to The Village Merch Store! This guide will help you set up all features including Discord authentication, Stripe payments, shopping cart, and admin dashboard.

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Database Setup (PostgreSQL)](#database-setup)
3. [Email Service Setup (Resend)](#email-service-setup)
4. [Discord OAuth Setup](#discord-oauth-setup)
5. [Stripe Payment Setup](#stripe-payment-setup)
6. [Admin Dashboard Access](#admin-dashboard-access)
7. [Features Overview](#features-overview)
8. [Environment Variables](#environment-variables)
9. [Deployment](#deployment)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ or Bun installed
- A Discord account
- A Stripe account (for payments)

### Installation

```bash
# Install dependencies
bun install

# Start development server
bun run dev
```

The site will be available at `http://localhost:3000`

## 💾 Database Setup

The store uses PostgreSQL with Prisma ORM for data persistence.

### Quick Setup (Supabase - Recommended)

1. **Create Free Supabase Account**
   - Go to [Supabase.com](https://supabase.com)
   - Sign up and create new project
   - Save your database password

2. **Get Connection String**
   - Project Settings → Database
   - Copy "Connection string" (URI format)
   - Should look like: `postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres`

3. **Update `.env.local`**
   ```env
   DATABASE_URL="postgresql://postgres:your-password@host:5432/postgres"
   ```

4. **Run Migrations**
   ```bash
   bunx prisma migrate dev --name init
   ```

5. **Seed Database**
   ```bash
   bun run db:seed
   ```

📖 **Detailed Guide**: See `DATABASE_SETUP.md`

### Alternative Options
- **Railway**: One-click PostgreSQL
- **Neon**: Serverless PostgreSQL
- **Local**: Install PostgreSQL on your machine

## 📧 Email Service Setup

Automated emails for order confirmations and shipping updates.

### Quick Setup (Resend)

1. **Create Free Resend Account**
   - Go to [Resend.com](https://resend.com)
   - Sign up (no credit card required)

2. **Get API Key**
   - Dashboard → API Keys
   - Create API Key
   - Copy the key

3. **Update `.env.local`**
   ```env
   RESEND_API_KEY=re_your_api_key_here
   EMAIL_FROM=onboarding@resend.dev
   ```

4. **Test Emails**
   - Place a test order
   - Check your email inbox!

📖 **Detailed Guide**: See `EMAIL_SETUP.md`

### Email Features
- ✉️ Order confirmation after payment
- 📦 Shipping notification with tracking
- 🎨 Beautiful branded templates
- 📊 Delivery analytics

## 🔐 Discord OAuth Setup

Users must sign in with Discord to make purchases. Follow these steps:

1. **Create Discord Application**
   - Go to https://discord.com/developers/applications
   - Click "New Application"
   - Name it "The Village Merch Store"

2. **Configure OAuth2**
   - In your application, go to OAuth2 → General
   - Add redirect URL: `http://localhost:3000/api/auth/callback/discord`
   - For production: `https://your-domain.com/api/auth/callback/discord`

3. **Get Credentials**
   - Copy your Client ID
   - Copy your Client Secret

4. **Update `.env.local`**
   ```env
   NEXT_PUBLIC_DISCORD_CLIENT_ID=your_client_id_here
   DISCORD_CLIENT_SECRET=your_client_secret_here
   NEXTAUTH_SECRET=your_random_secret_here
   NEXTAUTH_URL=http://localhost:3000
   ```

5. **Generate NEXTAUTH_SECRET**
   ```bash
   openssl rand -base64 32
   ```

📖 **Detailed Guide**: See `DISCORD_OAUTH_SETUP.md`

## 💳 Stripe Payment Setup

Enable secure payment processing with Stripe:

1. **Create Stripe Account**
   - Sign up at https://stripe.com

2. **Get Test API Keys**
   - Go to Dashboard → Developers → API keys
   - Make sure you're in **Test mode**
   - Copy Publishable key (`pk_test_...`)
   - Copy Secret key (`sk_test_...`)

3. **Update `.env.local`**
   ```env
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
   STRIPE_SECRET_KEY=sk_test_your_key_here
   ```

4. **Test Payment Flow**
   - Add items to cart
   - Click "Proceed to Checkout"
   - Use test card: `4242 4242 4242 4242`
   - Any future expiry date, any CVC

📖 **Detailed Guide**: See `STRIPE_SETUP.md`

## 👑 Admin Dashboard Access

Comprehensive admin panel for managing your entire store:

1. **Navigate to Admin**
   - Go to `http://localhost:3000/admin`

2. **Login**
   - Default password: `admin123`
   - Change this in `.env.local`:
     ```env
     ADMIN_PASSWORD=your_secure_password_here
     ```

3. **Admin Features**
   - **Main Dashboard**: Quick stats and access to all features
   - **Order Management** (`/admin/orders`):
     - View all orders with search and filters
     - Update order status
     - Add tracking numbers
     - Automated shipping emails
   - **Analytics** (`/admin/analytics`):
     - Revenue tracking and charts
     - Daily sales trends (30 days)
     - Order status distribution
     - Top selling products
     - Key metrics: Revenue, AOV, conversion rate
   - **Product Management**:
     - View all products
     - Add new products (demo form)
   - **Blog Management**:
     - View all blog posts
     - Create new posts (demo form)

📖 **Detailed Guide**: See `ADMIN_FEATURES.md`

### Admin Workflow

**Daily Tasks**:
1. Check `/admin/orders` for new orders
2. Update orders to PROCESSING
3. Add tracking numbers when shipped
4. Review `/admin/analytics` for sales data

**When Order Ships**:
1. Add tracking number
2. Update status to SHIPPED
3. Customer automatically receives email

## ✨ Features Overview

### Database & Data Persistence

- **PostgreSQL Database**: Production-ready data storage
- **Prisma ORM**: Type-safe database access
- **Order Management**: Complete order history and tracking
- **Product Catalog**: Database-driven products
- **Blog Posts**: CMS-like blog management
- **User Accounts**: Discord user profiles stored

### Email Notifications

- **Order Confirmations**: Automated after purchase
- **Shipping Updates**: Track your package
- **Beautiful Templates**: Branded email design
- **React Email**: Component-based emails
- **Resend Integration**: Reliable delivery

### Shopping Experience

- **Product Catalog**: 12 products across 3 categories
- **Product Details**: Image galleries, size/color selection
- **Shopping Cart**: Powered by Zustand state management
- **Persistent Cart**: Cart saves to localStorage
- **Free Shipping**: On orders over $75
- **Secure Checkout**: Stripe payment processing
- **Order Tracking**: Full order history in database

### Blog & Community

- **Blog Posts**: 8 articles across 4 categories
- **Full Content Pages**: Detailed articles with comments
- **Category Filtering**: Easy navigation
- **Featured Posts**: Highlight important content
- **Comments**: Engage with the community

### Authentication

- **Discord Login**: OAuth 2.0 integration
- **Protected Checkout**: Must be logged in to purchase
- **Session Management**: Secure JWT-based sessions
- **User Profile**: Display Discord avatar and name

### Admin Dashboard

- **Order Management**: View, search, and update all orders
- **Order Status Tracking**: PENDING → PAID → SHIPPED → DELIVERED
- **Tracking Numbers**: Add tracking and send shipping emails
- **Analytics Dashboard**: Revenue tracking and performance metrics
- **Revenue Charts**: Daily revenue for last 30 days
- **Top Products**: Best sellers by revenue and quantity
- **Product Management**: View and add products
- **Blog Management**: Create and manage posts
- **Statistics**: Product, blog, and order analytics
- **Password Protection**: Secure admin access

### External Integration

- **Map Link**: Redirects to https://rustcult-com.onrender.com/
- **Social Links**: Instagram, Twitter, YouTube

## 🔧 Environment Variables

Complete `.env.local` file structure:

```env
# Database (PostgreSQL)
DATABASE_URL="postgresql://user:password@host:5432/database"

# Email Service (Resend)
RESEND_API_KEY=re_your_api_key_here
EMAIL_FROM=onboarding@resend.dev

# Discord OAuth
NEXT_PUBLIC_DISCORD_CLIENT_ID=your_discord_client_id
DISCORD_CLIENT_SECRET=your_discord_client_secret
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Stripe Payments
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
STRIPE_SECRET_KEY=sk_test_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Admin Access
ADMIN_PASSWORD=admin123
```

### For Production

Update these values when deploying:

```env
DATABASE_URL="postgresql://production-url"
RESEND_API_KEY=re_live_key_here
EMAIL_FROM=orders@yourdomain.com
NEXTAUTH_URL=https://your-domain.com
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_key
STRIPE_SECRET_KEY=sk_live_your_key
```

## 🚀 Deployment

### Pre-Deployment Checklist

- [ ] Database set up and migrated (Supabase/Railway/Neon)
- [ ] Email service configured with verified domain
- [ ] Discord OAuth configured with production URL
- [ ] Stripe activated and live keys configured
- [ ] Admin password changed from default
- [ ] Environment variables set in hosting platform
- [ ] Test complete order flow (cart → checkout → email)
- [ ] Verify all features in staging environment
- [ ] Run: `bunx prisma migrate deploy`

### Recommended Platforms

1. **Vercel** (Recommended for Next.js)
   - Connect your GitHub repo
   - Add environment variables in Settings
   - Deploy automatically on push

2. **Netlify**
   - Use the `deploy` command in the repo
   - Configure as dynamic site (has API routes)
   - Set environment variables

3. **Railway/Render**
   - Good for full-stack apps
   - Easy database integration if needed

### Environment Variables Setup

In your hosting platform:

1. Add all variables from `.env.local`
2. Update `NEXTAUTH_URL` to your domain
3. Update Discord redirect URLs
4. Use Stripe live keys
5. Set secure admin password

## 📁 Project Structure

```
my-merch-store/
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Database seed script
├── src/
│   ├── app/
│   │   ├── admin/          # Admin dashboard
│   │   ├── blog/           # Blog pages
│   │   ├── cart/           # Shopping cart
│   │   ├── checkout/       # Checkout success
│   │   ├── products/       # Product details
│   │   ├── shop/           # Shop page
│   │   └── api/
│   │       ├── auth/       # NextAuth routes
│   │       ├── create-checkout-session/ # Stripe checkout
│   │       └── webhooks/   # Stripe webhooks
│   ├── components/
│   │   ├── header.tsx      # Main header
│   │   ├── footer.tsx      # Footer
│   │   ├── product-card.tsx
│   │   └── ui/             # shadcn components
│   ├── emails/
│   │   ├── order-confirmation.tsx
│   │   └── shipping-confirmation.tsx
│   ├── lib/
│   │   ├── prisma.ts       # Prisma client
│   │   ├── email.ts        # Email utility
│   │   ├── blog-data.ts    # Blog post data
│   │   └── product-data.ts # Product catalog
│   └── store/
│       └── cart-store.ts   # Zustand cart state
├── .env.local              # Environment variables
├── DATABASE_SETUP.md       # Database guide
├── EMAIL_SETUP.md          # Email guide
├── DISCORD_OAUTH_SETUP.md  # Discord guide
├── STRIPE_SETUP.md         # Stripe guide
└── SETUP_GUIDE.md          # This file
```

## 🛠 Development

### Available Scripts

```bash
# Development
bun run dev          # Start dev server
bun run build        # Build for production
bun run start        # Start production server
bun run lint         # Run linter

# Database
bun run db:migrate   # Run database migrations
bun run db:studio    # Open Prisma Studio
bun run db:seed      # Seed database with initial data
bun run db:reset     # Reset database (WARNING: deletes data)

# Package Management
bun install          # Install dependencies
bun add [package]    # Add new package
```

### Adding Features

**Add a Product**:
- Edit `src/lib/product-data.ts`
- Add product object with images, pricing, etc.
- Categories: `hats`, `apparel`, `accessories`

**Add a Blog Post**:
- Edit `src/lib/blog-data.ts`
- Include full content (markdown supported)
- Categories: `community`, `events`, `merchandise`, `lifestyle`

## 🆘 Troubleshooting

### Cart Not Persisting
- Check browser localStorage
- Clear cache and try again
- Verify Zustand persist middleware

### Discord Login Not Working
- Verify redirect URLs match exactly
- Check Client ID and Secret are correct
- Ensure NEXTAUTH_SECRET is set

### Stripe Checkout Fails
- Verify API keys match the mode (test/live)
- Check user is logged in with Discord
- Use correct test card numbers

### Admin Can't Login
- Check ADMIN_PASSWORD in `.env.local`
- Clear sessionStorage: `sessionStorage.clear()`
- Default password is `admin123`

## 📚 Additional Documentation

### Setup Guides
- [Database Setup Guide](./DATABASE_SETUP.md) - PostgreSQL & Prisma
- [Email Setup Guide](./EMAIL_SETUP.md) - Resend & React Email
- [Discord OAuth Setup](./DISCORD_OAUTH_SETUP.md) - Authentication
- [Stripe Payment Setup](./STRIPE_SETUP.md) - Payments
- [Admin Features Guide](./ADMIN_FEATURES.md) - Order & analytics management

### External Documentation
- [Prisma Docs](https://www.prisma.io/docs)
- [Resend Docs](https://resend.com/docs)
- [NextAuth.js Docs](https://next-auth.js.org/)
- [Zustand Docs](https://github.com/pmndrs/zustand)
- [Recharts Docs](https://recharts.org/)
- [shadcn/ui Docs](https://ui.shadcn.com/)

## 🎯 Next Steps

1. **Set up Database** - Create PostgreSQL on Supabase/Railway
2. **Configure Email** - Get Resend API key
3. **Set up Discord OAuth** - Enable user authentication
4. **Configure Stripe** - Enable payments
5. **Run migrations** - Set up database tables
6. **Seed data** - Add initial products and posts
7. **Test complete flow** - Cart → Checkout → Email
8. **Customize branding** - Add your logo and colors
9. **Deploy to production** - Launch your store!

## 📞 Support

- Discord OAuth issues: Check `DISCORD_OAUTH_SETUP.md`
- Stripe payment issues: Check `STRIPE_SETUP.md`
- General questions: Review this guide

---

**Ready to launch?** Follow the setup guides for Discord and Stripe, then deploy to your favorite hosting platform!
