# Product Management System

## 🛍️ Overview

You now have a full database-powered product management system! Edit all your products from the admin dashboard.

## 📦 Managing Products

### Access Product Management

1. **Go to Admin Dashboard:**
   - Visit: `https://therustvillage.netlify.app/admin`
   - Enter your admin password

2. **Click "Products" Card**
   - Or go directly to: `/admin/products`

---

## ➕ Adding a New Product

1. **Click "Add Product"** button

2. **Fill in Product Details:**

**Required Fields:**
- **Product Name** - e.g., "The Village Hat (Green)"
- **Price** - e.g., 35.00
- **Description** - Detailed product description

**Optional Fields:**
- **Slug** - Auto-generated from name, customize if needed
- **Category** - hats, apparel, or accessories
- **Badge** - e.g., "NEW ARRIVAL", "BUY 1 GET 1 FREE"
- **Images** - One URL per line (first image is main)
- **Sizes** - Comma separated: S, M, L, XL, XXL
- **Colors** - Comma separated: Black, Green, Navy
- **Features** - One per line
- **In Stock** - Check if available
- **Featured** - Check to feature on homepage

3. **Click "Create Product"**

Your product is now live! 🎉

---

## ✏️ Editing a Product

1. Find the product in the list
2. Click **"Edit"** button
3. Update any fields
4. Click **"Update Product"**

---

## 🎨 Product Images

### Adding Images

Images are added as URLs, one per line:

```
https://i.imgur.com/ABC123.jpg
https://i.imgur.com/DEF456.jpg
https://i.imgur.com/GHI789.jpg
```

**Tips:**
- First image is the main product image
- Use direct image URLs (imgur, unsplash, etc.)
- Recommended size: 800x800 or larger
- Use high-quality images for best results

### Where to Get Images

1. **Upload to Imgur:**
   - Go to [imgur.com/upload](https://imgur.com/upload)
   - Upload your image
   - Right-click image → Copy image address
   - Use format: `https://i.imgur.com/XXX.jpg`

2. **Use Unsplash:**
   - [unsplash.com](https://unsplash.com)
   - Find image → Copy image URL
   - Add size parameter: `?w=800&h=800`

3. **Your own hosting:**
   - Any publicly accessible URL works

---

## 🏷️ Product Categories

Choose the right category:

- **hats** - Hats, caps, beanies, snapbacks
- **apparel** - T-shirts, hoodies, jerseys, sweaters
- **accessories** - Bags, accessories, misc items

---

## ⚡ Quick Actions

### Feature/Unfeature
- Click "Feature" or "Unfeature"
- Featured products show on homepage
- Appear first in shop listing

### In Stock/Out of Stock
- Click "Mark Out of Stock" or "Mark In Stock"
- Out of stock products don't show publicly
- Still visible in admin

### Delete Product
- Click trash icon
- Confirms before deleting
- **Cannot be undone!**

---

## 📋 Product Fields Explained

### Name
- Clear, descriptive product name
- Include color/variant in parentheses
- Example: "The Village Hat (Green)"

### Slug
- URL-friendly version of name
- Auto-generated, but customizable
- Used in product URL: `/products/slug`
- Use lowercase, hyphens only

### Description
- Detailed product information
- Highlight key features
- Mention materials, fit, care instructions
- 2-3 paragraphs ideal

### Price
- In USD ($)
- Use decimal format: 35.00
- Displayed as: $35.00

### Badge
- Short promotional text
- Examples:
  - "NEW ARRIVAL"
  - "BUY 1 GET 1 FREE"
  - "LIMITED EDITION"
  - "BESTSELLER"
- Leave empty for no badge

### Sizes
- Comma-separated list
- Standard formats: XS, S, M, L, XL, XXL, 3XL
- Leave empty for one-size items

### Colors
- Available color variants
- Comma-separated: "Black, Green, Navy"
- Or descriptive: "Black/Gold, Green/White"

### Features
- Bullet points about the product
- One feature per line
- Examples:
  - "Premium cotton twill"
  - "Embroidered logo"
  - "Adjustable snapback"
  - "One size fits most"

---

## 🎯 Example Product

Here's a complete example:

**Name:** The Village Hat (Green)

**Slug:** village-hat-green

**Price:** 35.00

**Description:**
Our signature snapback in forest green. Features embroidered Village logo on the front and adjustable strap for the perfect fit. Made with premium cotton twill for comfort and durability. Perfect for everyday wear.

**Category:** hats

**Badge:** BUY 1 GET 1 FREE

**Images:**
```
https://i.imgur.com/vubIpVS.jpg
https://i.imgur.com/ABC123.jpg
https://i.imgur.com/DEF456.jpg
```

**Sizes:** _(leave empty for hats)_

**Colors:** Green, Black, Navy

**Features:**
```
Embroidered Village logo
Adjustable snapback closure
Premium cotton twill
One size fits most
Structured 6-panel design
```

**In Stock:** ✅ Checked

**Featured:** ✅ Checked

---

## 🌐 Where Products Appear

### Shop Page
- URL: `/shop`
- All in-stock products
- Filter by category
- Featured products shown first

### Homepage
- Featured products section
- First 8 products displayed
- Link to full shop

### Individual Product Page
- URL: `/products/[slug]`
- Full details, images, description
- Add to cart functionality
- Related products

---

## 🔧 API Endpoints

### Public
- `GET /api/products` - List in-stock products

### Admin
- `GET /api/admin/products` - List all products
- `POST /api/admin/products` - Create product
- `PATCH /api/admin/products/[id]` - Update product
- `DELETE /api/admin/products/[id]` - Delete product

---

## 💡 Best Practices

### Product Names
- ✅ "The Village Hat (Green)"
- ❌ "hat green"

### Descriptions
- Include material details
- Mention fit/sizing
- Highlight unique features
- Keep it engaging!

### Images
- Use high-quality photos
- Show multiple angles
- First image should be the best
- 3-5 images per product ideal

### Pricing
- Be consistent with formatting
- Round to .00 or .99
- Consider free shipping threshold

### Categories
- Be consistent
- Don't create new categories
- Use existing: hats, apparel, accessories

---

## 🆘 Troubleshooting

**Product not showing in shop?**
- Check "In Stock" is enabled
- Verify product was saved
- Clear browser cache

**Images not loading?**
- Check URLs are publicly accessible
- Use direct image links (i.imgur.com/XXX.jpg)
- Avoid URLs that require login

**Can't edit product?**
- Make sure you're logged in
- Check admin password is correct
- Try refreshing the page

---

## 🎉 You're Ready!

Start adding your amazing products to The Village store!

**Next Steps:**
1. Add your first product
2. Upload product images to imgur
3. Fill in all details
4. Set as featured
5. Check it on the live shop!

Need help? Check the other guides or contact support.
