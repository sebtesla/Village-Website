# 🌱 How to Seed Your Database

## 🎯 The Problem

Your published website (Netlify) only shows **5 products and 2 blog posts** because the database hasn't been fully seeded yet.

The seed script now has **all 12 products and 7 blog posts** ready to go!

---

## 🚀 Option 1: Seed via GitHub Actions (Recommended)

### Step 1: Push the Updated Seed Script

The seed script has been updated. Just push to GitHub:

```bash
git add prisma/seed.ts
git commit -m "Update seed script with all 12 products and 7 blog posts"
git push origin main
```

### Step 2: Run Seed Script on Netlify

After Netlify rebuilds your site, you need to run the seed script:

**Using Netlify CLI:**

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Login:
   ```bash
   netlify login
   ```

3. Link to your site:
   ```bash
   cd my-merch-store
   netlify link
   ```

4. Run the seed command:
   ```bash
   netlify dev:exec 'npm run db:seed'
   ```

---

## 🚀 Option 2: Seed Directly from Supabase

### Step 1: Connect to Supabase

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project: `htqsirayzdfvltzfvwov`
3. Go to **SQL Editor** in the left sidebar

### Step 2: Clear Existing Data

Run this SQL to clear old data:

```sql
DELETE FROM "OrderItem";
DELETE FROM "Order";
DELETE FROM "BlogComment";
DELETE FROM "BlogPost";
DELETE FROM "Product";
```

### Step 3: Run the Seed Script Locally with Connection String

From your project folder:

```bash
DATABASE_URL="postgresql://postgres:kzsQgYFhLosLuB3456@db.htqsirayzdfvltzfvwov.supabase.co:5432/postgres" bun run db:seed
```

---

## 🚀 Option 3: Use Admin Panel (Easiest!)

Instead of seeding, you can manually add products via the admin panel:

1. Go to: `https://therustvillage.netlify.app/admin/products`
2. Password: `admin123`
3. Click "Add Product"
4. Add each product with images

This gives you full control over your products!

---

## ✅ Verify the Seed Worked

After seeding, check:

1. **Products page:** Should show 12 products
2. **Blog page:** Should show 7 blog posts
3. **Admin panel:** `/admin/products` should show all 12
4. **Categories work:** Filter by Hats (4), Apparel (7), Accessories (1)

---

## 📊 What's in the Seed Script

### Products (12 total):

**Hats (4):**
- The Village Hat (Green) - $35
- The Village Beanie - $28
- The Village Dad Hat - $32
- The Village Snapback - $38

**Apparel (7):**
- The Village Members Only Jersey - $65
- Soapy Graphic Tee (Black) - $32
- The Village Logo Hoodie (Black) - $60
- The Village Classic Tee (White) - $30
- The Village Crewneck Sweatshirt - $55
- The Village Long Sleeve Tee - $40
- The Village Zip-Up Hoodie - $70

**Accessories (1):**
- The Village Tote Bag - $25

### Blog Posts (7 total):

1. Welcome to The Village (Featured)
2. New Merchandise Drop: Winter Collection 2025 (Featured)
3. Community Spotlight: Member of the Month
4. Spring Meetup 2025: Save the Date
5. Behind the Designs: How We Create Your Favorite Merch
6. 2024 Year in Review: Thank You Village!
7. Our Commitment to Sustainability

---

## 🐛 Troubleshooting

**"Can't reach database server"**
- Make sure you're using the correct DATABASE_URL
- Check that Supabase project is active
- Verify the database password is correct

**"Already exists" errors**
- Run the clear SQL commands first
- Or change the slugs in the seed script

**Products still not showing**
- Clear browser cache
- Wait a minute for Netlify to redeploy
- Check the database in Supabase SQL Editor:
  ```sql
  SELECT COUNT(*) FROM "Product";
  SELECT COUNT(*) FROM "BlogPost";
  ```

---

## 💡 Recommended Approach

**Quickest:** Use the admin panel to add products manually with your actual photos

**Most Complete:** Run Option 3 (seed locally with connection string) to populate everything at once

---

## 🎉 After Seeding

Once your database is seeded:
- All 12 products will show on the shop page
- All 7 blog posts will show on the blog page
- Category filtering will work properly
- Admin panel will show all products
- Blog post pages will work (no more "undefined" pages)

Good luck! 🚀
