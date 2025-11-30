# 📸 How to Add Custom Product Images

## 🎯 Overview

There are 3 ways to add your actual product photos to The Village store:

1. **Use Imgur (Easiest)** - Free image hosting
2. **Use the Admin Panel** - Add products with images via the database
3. **Replace Static Images** - Update the code directly

---

## Method 1: Upload to Imgur (Recommended) ⭐

### Step 1: Upload Your Images

1. Go to [imgur.com/upload](https://imgur.com/upload)
2. Click **"New post"** or drag and drop your images
3. Upload all your product photos
4. **Important:** Don't create an album, upload them individually

### Step 2: Get Direct Image Links

For each uploaded image:
1. Right-click on the image
2. Select **"Copy image address"** or **"Copy image location"**
3. You'll get a URL like: `https://i.imgur.com/ABC123.jpg`

### Step 3: Add Products via Admin Panel

1. Go to your admin panel: `https://therustvillage.netlify.app/admin/products`
2. Click **"Add Product"**
3. Fill in the details:
   - Name: "The Village Hat (Green)"
   - Price: 35
   - Description: "Our signature snapback..."
   - **Images:** Paste your imgur URLs (one per line)
   ```
   https://i.imgur.com/ABC123.jpg
   https://i.imgur.com/DEF456.jpg
   https://i.imgur.com/GHI789.jpg
   ```
4. Click **"Create Product"**

---

## Method 2: Use Other Image Hosts

### Recommended Free Image Hosts

**Imgur** (Recommended)
- Free, fast, reliable
- Direct image URLs work perfectly
- No account required
- Link format: `https://i.imgur.com/XXX.jpg`

**Cloudinary** (Professional)
- Free tier available
- Image optimization
- Transformations
- Sign up: [cloudinary.com](https://cloudinary.com)

**ImageKit** (Professional)
- Free tier: 20GB bandwidth/month
- Image optimization
- Sign up: [imagekit.io](https://imagekit.io)

### Important: Get Direct Image URLs

Make sure you get the **direct image URL**, not a page URL:

✅ **Correct:** `https://i.imgur.com/ABC123.jpg`
❌ **Wrong:** `https://imgur.com/ABC123`

The URL should end in `.jpg`, `.png`, or `.webp`

---

## Method 3: Update Static Products (Advanced)

If you want to replace the static product images in the code:

1. Upload all your images to imgur
2. Open: `my-merch-store/src/app/page.tsx`
3. Find the `staticProducts` array (around line 12)
4. Update each product's image URL:

```typescript
{
  id: "village-hat-green",
  name: "The Village Hat (Green)",
  price: 35,
  image: "https://i.imgur.com/YOUR-IMAGE-ID.jpg", // ← Update this
  badge: "BUY 1 GET 1 FREE",
}
```

---

## 📋 Product Image Best Practices

### Image Requirements

**Dimensions:**
- Recommended: 800x800px or larger
- Minimum: 600x600px
- Square format works best (1:1 aspect ratio)

**File Format:**
- ✅ JPG/JPEG - Best for photos
- ✅ PNG - Good for logos/graphics
- ✅ WebP - Modern format, smaller files

**File Size:**
- Keep under 500KB per image
- Compress images before uploading
- Use tools like [TinyPNG](https://tinypng.com) or [Squoosh](https://squoosh.app)

### Photography Tips

**Lighting:**
- Use natural light when possible
- Avoid harsh shadows
- Consistent lighting across all products

**Background:**
- White or light gray background is best
- Keep it clean and simple
- Remove clutter

**Angles:**
- Front view (main image)
- Back view
- Detail shots (logo, texture)
- Worn/modeled shots

**Multiple Images per Product:**
Upload 3-5 images per product:
1. Main product shot (front)
2. Back view
3. Detail shot (logo/embroidery)
4. Lifestyle shot (being worn)
5. Size/fit reference

---

## 🎨 Example: Complete Product Setup

### 1. Take Your Photos

```
Product: The Village Hat (Green)
Photos needed:
- Front view (main)
- Side view
- Back view
- Close-up of logo
- Someone wearing it
```

### 2. Upload to Imgur

Upload all 5 photos to imgur.com

### 3. Get URLs

```
https://i.imgur.com/HAT001.jpg  (front)
https://i.imgur.com/HAT002.jpg  (side)
https://i.imgur.com/HAT003.jpg  (back)
https://i.imgur.com/HAT004.jpg  (logo detail)
https://i.imgur.com/HAT005.jpg  (worn)
```

### 4. Add to Admin Panel

Go to `/admin/products` and add:

**Name:** The Village Hat (Green)
**Price:** 35
**Description:** Our signature snapback in forest green...
**Images:**
```
https://i.imgur.com/HAT001.jpg
https://i.imgur.com/HAT002.jpg
https://i.imgur.com/HAT003.jpg
https://i.imgur.com/HAT004.jpg
https://i.imgur.com/HAT005.jpg
```
**Category:** hats
**Colors:** Green, Black, Navy
**Features:**
```
Embroidered Village logo
Adjustable snapback
Premium cotton twill
One size fits most
```

---

## 🔄 Replacing Existing Products

### Option A: Edit in Admin Panel

1. Go to `/admin/products`
2. Find the product
3. Click **"Edit"**
4. Update the images
5. Click **"Update Product"**

### Option B: Update Database Directly

1. Go to your Supabase dashboard
2. Navigate to Table Editor → `Product`
3. Find your product
4. Edit the `images` field (JSON array)
5. Save

---

## 🚀 Quick Start Checklist

- [ ] Take photos of all products
- [ ] Upload photos to imgur.com
- [ ] Get direct image URLs
- [ ] Go to `/admin/products`
- [ ] Add or edit products with your images
- [ ] Test on the live site
- [ ] Verify images load correctly

---

## 💡 Pro Tips

### Batch Upload

If you have many products:
1. Upload all images to imgur at once
2. Create a spreadsheet with product info and image URLs
3. Add products one by one via admin panel

### Image Naming

Keep track of your images:
```
village-hat-green-front.jpg
village-hat-green-back.jpg
village-hat-green-detail.jpg
village-hoodie-black-front.jpg
village-hoodie-black-back.jpg
```

### Testing

After adding images:
1. Check the homepage - images should show
2. Check the shop page - all products visible
3. Check individual product pages - gallery works
4. Test on mobile - images responsive

---

## 🆘 Troubleshooting

### Images Not Showing?

**Check 1: Is the URL correct?**
- URL should start with `https://`
- URL should end with `.jpg`, `.png`, or `.webp`
- Try opening the URL in a browser

**Check 2: Is it a direct image link?**
- ✅ `https://i.imgur.com/ABC123.jpg`
- ❌ `https://imgur.com/ABC123`

**Check 3: Is the image publicly accessible?**
- Open the URL in an incognito/private window
- If you can see it, it works!

**Check 4: Clear cache**
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Or wait a few minutes for cache to clear

### Imgur Upload Failed?

- File too large? Compress it first
- Try uploading one at a time
- Use a different browser
- Clear cookies and try again

---

## 📱 Example Product Gallery

Here's how your product will look with multiple images:

**Product Page:**
- Main image: Large display
- Thumbnail gallery: All 5 images
- Click thumbnail: Shows that image
- Zoom on hover: Detail view

**Homepage/Shop:**
- Shows first image only
- Hover: Slight zoom effect

---

## ✨ You're Ready!

Start uploading your product photos and creating an amazing store! 🎉

**Need help?** Check the admin panel guides:
- `PRODUCT_MANAGEMENT.md` - Managing products
- `START_HERE.md` - Getting started
- `README_DISCORD_SETUP.md` - Discord setup

---

## 🎯 Next Steps

1. **Upload 1 product as a test**
   - Take photos
   - Upload to imgur
   - Add via admin panel
   - Test on live site

2. **If it works, upload all products**
   - Follow the same process
   - Be consistent with photo style
   - Use same lighting/background

3. **Optimize and refine**
   - Get feedback on photos
   - Adjust as needed
   - Keep adding new products!

Good luck! 📸🚀
