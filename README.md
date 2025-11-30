# 🏪 The Village Merch Store

A full-featured e-commerce Progressive Web App built with Next.js, featuring Discord authentication, Stripe payments, and a complete admin dashboard.

![Next.js](https://img.shields.io/badge/Next.js-15.3-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-5.22-2D3748?logo=prisma)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)

## ✨ Features

### 🛒 E-Commerce
- Product catalog with categories and filtering
- Product detail pages with image galleries
- Shopping cart with persistent state (Zustand + localStorage)
- Size and color variant selection
- Free shipping on orders over $75

### 🔐 Authentication
- Discord OAuth integration with NextAuth.js
- Protected checkout (no guest checkout)
- User session management
- Profile display in header

### 💳 Payment Processing
- Stripe Checkout integration
- Secure payment processing
- Order confirmation emails
- Stripe webhook handling

### 📊 Admin Dashboard
- **Order Management**: View, search, and update all orders
- **Analytics Dashboard**: Revenue tracking, charts, and metrics
- **Product Management**: View and manage product catalog
- **Blog Management**: Create and edit blog posts
- **Real-time Notifications**: New order alerts with sound and browser notifications

### 📧 Email Notifications
- Order confirmation emails (React Email + Resend)
- Shipping confirmation with tracking numbers
- Beautiful branded email templates
- Automated email sending via webhooks

### 💾 Database
- PostgreSQL with Prisma ORM
- Complete data models for products, orders, users, blog posts
- Database migrations and seeding
- Prisma Studio for database management

### 📱 Progressive Web App (PWA)
- Installable on mobile and desktop
- Offline support with service workers
- Custom install prompts for all platforms
- App shortcuts (Shop, Track Order, Cart)
- Standalone app mode

### 📝 Blog & Community
- Full-featured blog with categories
- Individual blog post pages with comments
- Featured posts section
- Category filtering

### 📦 Order Tracking
- Customer order tracking page
- Track by order number and email
- Visual order status timeline
- Complete order history

### 📄 Content Pages
- **About Page**: Company story, values, and promises
- **Shop Page**: Product catalog with category filters
- **Blog Page**: Articles and community content
- **Map Page**: External link integration

## 🚀 Tech Stack

- **Framework**: Next.js 15.3 with App Router
- **Language**: TypeScript 5.8
- **Styling**: Tailwind CSS 3.4 + shadcn/ui
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with Discord
- **Payments**: Stripe Checkout + Webhooks
- **Email**: Resend + React Email
- **State Management**: Zustand
- **PWA**: next-pwa
- **Charts**: Recharts
- **Package Manager**: Bun

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/village-merch-store.git
cd village-merch-store

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Set up database
bunx prisma migrate dev
bun run db:seed

# Start development server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Environment Variables

Create a `.env.local` file with these variables:

```env
# Database
DATABASE_URL="postgresql://..."

# Discord OAuth
NEXT_PUBLIC_DISCORD_CLIENT_ID=your_client_id
DISCORD_CLIENT_SECRET=your_client_secret
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# Email (Resend)
RESEND_API_KEY=re_xxx
EMAIL_FROM=orders@yourdomain.com

# Admin
ADMIN_PASSWORD=your_secure_password
```

See `.env.example` for the complete template.

## 📚 Documentation

- [Setup Guide](./SETUP_GUIDE.md) - Complete setup instructions
- [Database Setup](./DATABASE_SETUP.md) - PostgreSQL & Prisma setup
- [Discord OAuth Setup](./DISCORD_OAUTH_SETUP.md) - Authentication setup
- [Stripe Setup](./STRIPE_SETUP.md) - Payment processing setup
- [Email Setup](./EMAIL_SETUP.md) - Email notifications setup
- [Admin Features](./ADMIN_FEATURES.md) - Admin dashboard guide
- [Customer Features](./CUSTOMER_FEATURES.md) - User experience guide
- [PWA Guide](./PWA_GUIDE.md) - Progressive Web App features
- [Deployment Guide](./DEPLOYMENT_GUIDE.md) - Deploy to production

## 🚀 Deployment

### Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/village-merch-store)

1. Click the button above
2. Add environment variables
3. Deploy!

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions.

## 🗄️ Database Schema

The application uses the following main models:

- **User**: Discord authenticated users
- **Product**: Merchandise catalog
- **Order**: Customer orders with items
- **BlogPost**: Blog articles and content
- **BlogComment**: User comments on posts

Run `bunx prisma studio` to explore the database visually.

## 📱 Progressive Web App

The store can be installed as an app on:
- ✅ iOS (Safari)
- ✅ Android (Chrome)
- ✅ Desktop (Chrome/Edge)

Features include:
- Offline support
- Install prompts
- App shortcuts
- Standalone mode

## 🛠️ Development

```bash
# Run development server
bun run dev

# Build for production
bun run build

# Start production server
bun run start

# Run linter
bun run lint

# Database commands
bun run db:migrate   # Run migrations
bun run db:studio    # Open Prisma Studio
bun run db:seed      # Seed database
```

## 🎨 Features Highlights

### Admin Dashboard
- Password-protected access
- Real-time order notifications
- Revenue analytics with charts
- Order status management
- Tracking number updates
- Automated shipping emails

### Customer Experience
- Discord login required for checkout
- Persistent shopping cart
- Order tracking by email and order number
- Email notifications for orders and shipping
- PWA install prompts
- Responsive design

### Payment Flow
1. Add items to cart
2. Sign in with Discord
3. Checkout via Stripe
4. Receive confirmation email
5. Track order status
6. Receive shipping notification

## 📊 Admin Access

Default admin credentials:
- URL: `/admin`
- Password: `admin123` (change in production!)

Admin features:
- Order management with search and filters
- Analytics dashboard with revenue charts
- Product and blog post management
- Real-time new order notifications

## 🔒 Security

- Environment variables for secrets
- Discord OAuth for authentication
- Stripe for secure payments
- NextAuth.js session management
- SQL injection protection (Prisma)
- XSS protection (React)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Images from [Unsplash](https://unsplash.com/)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For support, email support@thevillagemerch.com or join our Discord community.

---

**Built with ❤️ for The Village Community**
