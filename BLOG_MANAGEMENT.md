# Blog Management System

## 🎯 Overview

The Village now has a full database-powered blog system! You can create, edit, and delete blog posts from the admin dashboard.

## 📝 How to Create a Blog Post

### Method 1: Admin Dashboard (Recommended)

1. **Go to Admin Dashboard:**
   - Visit: `https://therustvillage.netlify.app/admin`
   - Enter your admin password

2. **Navigate to Blog Posts:**
   - Click on the **"Blog Posts"** card
   - Or go directly to: `/admin/blog-posts`

3. **Click "Create Post"**

4. **Fill in the form:**
   - **Title** * (required) - Your blog post title
   - **Slug** - URL-friendly version (auto-generated from title)
   - **Excerpt** * (required) - Short summary for blog list
   - **Content** * (required) - Full post content (supports Markdown!)
   - **Author** - Who wrote it (default: "The Village Team")
   - **Category** - community, merchandise, events, or updates
   - **Featured Image URL** - Main image (use imgur links)
   - **Tags** - Comma-separated tags (e.g., "sale, winter, merch")
   - **Featured** - Check to feature on homepage

5. **Click "Publish Post"**

Your post is now live! 🎉

---

## 📊 Database Structure

Blog posts are stored in the `BlogPost` table with these fields:

```prisma
model BlogPost {
  id            String    @id @default(cuid())
  slug          String    @unique
  title         String
  excerpt       String    @db.Text
  content       String    @db.Text
  author        String
  category      String
  image         String
  featured      Boolean   @default(false)
  tags          String[]
  publishedAt   DateTime  @default(now())
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  comments      BlogComment[]
}
```

---

## ✍️ Writing Content

### Markdown Support

Your content supports full Markdown formatting:

```markdown
# Main Heading

## Section Heading

### Subsection

**Bold text**
*Italic text*

- Bullet point 1
- Bullet point 2

1. Numbered item 1
2. Numbered item 2

[Link text](https://example.com)

![Image](https://i.imgur.com/yourimage.jpg)

> Blockquote

`inline code`
```

### Example Blog Post

**Title:** Winter Sale 2024

**Slug:** winter-sale-2024

**Excerpt:**
Get ready for our biggest winter sale! All items 30% off for a limited time.

**Content:**
```markdown
# Winter Sale 2024 🎉

We're excited to announce our **biggest winter sale** of the year!

## What's On Sale?

- All hats: 30% off
- All apparel: 30% off
- All accessories: 30% off

## Sale Details

**When:** January 15-31, 2024
**Discount:** 30% off sitewide
**Code:** Use code `WINTER30` at checkout

Don't miss out on this amazing opportunity to grab your favorite Village merch!

[Shop Now](/shop)
```

---

## 🎨 Categories

Choose the right category for your post:

- **community** - Community updates, member spotlights, announcements
- **merchandise** - New product releases, restocks, collections
- **events** - Event announcements, recaps, schedules
- **updates** - General updates, company news, behind-the-scenes

---

## 🖼️ Adding Images

### Featured Image
- Use direct image URLs (imgur, unsplash, etc.)
- Recommended size: 800x600 or larger
- Example: `https://i.imgur.com/ABC123.jpg`

### Images in Content
```markdown
![Alt text](https://i.imgur.com/yourimage.jpg)
```

---

## 🔧 Managing Posts

### Edit a Post
- Currently not available in UI
- Use API endpoint: `PATCH /api/admin/blog-posts/[id]`

### Delete a Post
- Click the trash icon on any post in the admin list
- Confirms before deleting

### Feature/Unfeature
- Click "Feature" or "Unfeature" button
- Featured posts appear on homepage and top of blog list

---

## 🌐 Where Posts Appear

### Blog List Page
- URL: `/blog`
- Shows all posts
- Filter by category
- Featured posts shown first

### Individual Post Page
- URL: `/blog/[slug]`
- Full content with formatting
- Related posts
- Comment section (future feature)

### Homepage
- Featured posts only
- Shows in blog section

---

## 🚀 API Endpoints

### Public (No Auth Required)
- `GET /api/blog-posts` - List all posts
- `GET /api/blog-posts/[slug]` - Get single post

### Admin (Auth Required)
- `GET /api/admin/blog-posts` - List all posts with admin data
- `POST /api/admin/blog-posts` - Create new post
- `PATCH /api/admin/blog-posts/[id]` - Update post
- `DELETE /api/admin/blog-posts/[id]` - Delete post

---

## 💡 Tips

1. **Write catchy titles** - They appear in search results and social shares
2. **Keep excerpts short** - 1-2 sentences max
3. **Use images** - Posts with images get more engagement
4. **Tag properly** - Helps users find related content
5. **Preview before publishing** - Check how it looks on the live site
6. **Feature sparingly** - Only 2-3 featured posts at a time

---

## 📋 Quick Checklist

Before publishing:
- [ ] Title is clear and engaging
- [ ] Excerpt summarizes the post
- [ ] Content is formatted nicely
- [ ] Featured image is added
- [ ] Category is correct
- [ ] Tags are relevant
- [ ] Spell-checked
- [ ] Preview on live site

---

## 🆘 Troubleshooting

**Post not appearing?**
- Check if database is connected
- Verify post was created (check admin list)
- Clear browser cache

**Formatting looks wrong?**
- Check Markdown syntax
- Preview the post
- Look for unclosed tags

**Can't access admin?**
- Make sure you're logged in
- Check admin password is correct
- Clear cookies and try again

---

## 🎉 You're Ready!

Start creating amazing content for The Village community!

Need help? Check the other guides or contact support.
