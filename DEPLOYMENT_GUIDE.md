# 🚀 Deployment Guide - The Village Merch Store

## Quick Deploy to Vercel (Recommended)

### Prerequisites
- ✅ Supabase database (you have this!)
- ✅ GitHub account
- ✅ Vercel account (free - sign up at vercel.com)

---

## 📦 **Step 1: Push Code to GitHub**

### Option A: Using Same Export

1. **Download your project from Same**
   - Click the "Project" button (top left)
   - Select "Download Project"
   - Extract the ZIP file

2. **Create GitHub Repository**
   - Go to [github.com](https://github.com)
   - Click "New repository"
   - Name: `village-merch-store`
   - Make it Public or Private
   - Don't initialize with README
   - Click "Create repository"

3. **Push code to GitHub**
   ```bash
   # In your project folder (after extracting)
   cd village-merch-store

   # Initialize git (if not already done)
   git init

   # Add all files
   git add .

   # Commit
   git commit -m "Initial commit - Village Merch Store"

   # Add remote (replace YOUR_USERNAME)
   git remote add origin https://github.com/YOUR_USERNAME/village-merch-store.git

   # Push to GitHub
   git push -u origin main
   ```

### Option B: Direct Upload to GitHub

1. Go to [github.com/new](https://github.com/new)
2. Create repository: `village-merch-store`
3. Click "uploading an existing file"
4. Drag and drop all project files (except `node_modules`)
5. Commit changes

---

## 🌐 **Step 2: Deploy to Vercel**

### A. Sign Up for Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up"
3. Choose "Continue with GitHub"
4. Authorize Vercel

### B. Import Your Project

1. Click "Add New..." → "Project"
2. Find your `village-merch-store` repository
3. Click "Import"

### C. Configure Build Settings

Vercel should auto-detect Next.js. Verify these settings:

- **Framework Preset:** Next.js
- **Build Command:** `bun run build` (or leave default)
- **Output Directory:** `.next`
- **Install Command:** `bun install` (or leave default)

### D. Add Environment Variables

**IMPORTANT:** Add these environment variables in Vercel:

Click "Environment Variables" and add each of these:

```env
# Your Database
DATABASE_URL=postgresql://postgres:kzsQgYFhLosLuB3456@db.htqsirayzdfvltzfvwov.supabase.co:5432/postgres

# Discord OAuth (set these up - see DISCORD_OAUTH_SETUP.md)
NEXT_PUBLIC_DISCORD_CLIENT_ID=your_discord_client_id
DISCORD_CLIENT_SECRET=your_discord_client_secret
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=https://your-project.vercel.app

# Stripe (optional for now - can add later)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# Email (optional for now - can add later)
RESEND_API_KEY=re_xxx
EMAIL_FROM=orders@yourdomain.com

# Admin
ADMIN_PASSWORD=your_secure_password
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```
Or use: [generate-secret.vercel.app/32](https://generate-secret.vercel.app/32)

### E. Deploy!

1. Click "Deploy"
2. Wait 2-3 minutes
3. Your site will be live! 🎉

---

## 🗄️ **Step 3: Set Up Database**

### A. Run Migrations from Your Local Computer

Since the database is already created, we need to set up the tables:

```bash
# On your local machine
cd village-merch-store

# Install dependencies
bun install

# Create .env file
echo 'DATABASE_URL="postgresql://postgres:kzsQgYFhLosLuB3456@db.htqsirayzdfvltzfvwov.supabase.co:5432/postgres"' > .env

# Run migrations
bunx prisma migrate deploy

# Seed database with products
bun run db:seed
```

### B. Or Use Vercel's Terminal

After deployment:

1. Go to your project in Vercel dashboard
2. Click on the latest deployment
3. Click "..." menu → "Redeploy"
4. Enable "Use existing Build Cache"
5. After deployment, run migrations via Vercel CLI:

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link project
vercel link

# Run migration
vercel env pull .env.local
bunx prisma migrate deploy
bun run db:seed
```

---

## ⚙️ **Step 4: Configure Services**

### Discord OAuth (Required for Login)

1. **Go to [Discord Developer Portal](https://discord.com/developers/applications)**
2. Create new application: "The Village Merch Store"
3. Go to OAuth2 → General
4. Add redirect URL: `https://your-project.vercel.app/api/auth/callback/discord`
5. Copy Client ID and Client Secret
6. Add to Vercel environment variables
7. Redeploy

### Stripe (For Payments)

1. **Go to [Stripe Dashboard](https://dashboard.stripe.com)**
2. Get API keys (test mode for now)
3. Add to Vercel environment variables
4. Set up webhook endpoint: `https://your-project.vercel.app/api/webhooks/stripe`
5. Redeploy

### Resend (For Emails)

1. **Go to [Resend](https://resend.com)**
2. Sign up (free)
3. Create API key
4. Add to Vercel environment variables
5. Redeploy

---

## 🎯 **Your Deployment Checklist**

- [ ] Code pushed to GitHub
- [ ] Project imported to Vercel
- [ ] Environment variables added
- [ ] First deployment successful
- [ ] Database migrations run
- [ ] Database seeded with products
- [ ] Discord OAuth configured
- [ ] Test login works
- [ ] Test product browsing
- [ ] (Optional) Stripe configured
- [ ] (Optional) Email service configured

---

## 🌍 **Your Live URLs**

After deployment, you'll get:

**Main Site:**
- `https://village-merch-store.vercel.app` (or custom domain)

**Admin Dashboard:**
- `https://village-merch-store.vercel.app/admin`

**Shop:**
- `https://village-merch-store.vercel.app/shop`

**Blog:**
- `https://village-merch-store.vercel.app/blog`

**About:**
- `https://village-merch-store.vercel.app/about`

---

## 🔧 **Post-Deployment Tasks**

### 1. Update Discord Redirect URLs
- Add your Vercel URL to Discord OAuth settings
- Update `NEXTAUTH_URL` in Vercel env vars

### 2. Update Stripe Webhooks
- Add webhook endpoint in Stripe dashboard
- Point to: `https://your-domain.vercel.app/api/webhooks/stripe`

### 3. Custom Domain (Optional)
- In Vercel dashboard → Settings → Domains
- Add your custom domain
- Update DNS records
- Update `NEXTAUTH_URL`

### 4. Test Everything
- [ ] Home page loads
- [ ] Products display correctly
- [ ] Can add to cart
- [ ] Discord login works
- [ ] Admin dashboard accessible
- [ ] About page shows correctly

---

## 🆘 **Troubleshooting**

### Build Fails

**Check:**
- All environment variables are set
- No syntax errors in code
- Dependencies are installed

**Fix:**
- Check build logs in Vercel
- Ensure `DATABASE_URL` is set
- Try redeploying

### Database Connection Errors

**Check:**
- `DATABASE_URL` is correct
- Supabase project is active
- Migrations have been run

**Fix:**
```bash
# Run migrations locally
bunx prisma migrate deploy
bun run db:seed
```

### Discord Login Not Working

**Check:**
- Discord redirect URL includes your Vercel domain
- `NEXTAUTH_URL` matches your deployment URL
- `NEXTAUTH_SECRET` is set

**Fix:**
- Update Discord app settings
- Redeploy after updating env vars

### Images Not Loading

**Check:**
- Image domains in `next.config.js`
- Images are accessible

**Fix:**
- Already configured for Imgur and Unsplash
- Should work out of the box

---

## 🚀 **Quick Deploy Commands**

```bash
# Local setup
git clone https://github.com/YOUR_USERNAME/village-merch-store.git
cd village-merch-store
bun install

# Set up environment
cp .env.example .env
# Edit .env with your values

# Run database migrations
bunx prisma migrate deploy
bun run db:seed

# Test locally
bun run dev

# Deploy to Vercel
vercel
```

---

## 📚 **Additional Resources**

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Supabase Docs](https://supabase.com/docs)
- [Discord OAuth Setup](./DISCORD_OAUTH_SETUP.md)
- [Stripe Setup](./STRIPE_SETUP.md)
- [Email Setup](./EMAIL_SETUP.md)

---

## ✨ **You're Live!**

Congratulations! Your Village Merch Store is now deployed and accessible to the world! 🎉

**Next Steps:**
1. Share your site with friends
2. Set up Discord OAuth for real logins
3. Configure Stripe for real payments
4. Add more products
5. Customize branding
6. Market your store!

---

**Need help?** Check the troubleshooting section or the individual setup guides in the project.
