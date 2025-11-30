# 🎨 Favicon Setup Guide for The Village

## ✅ What's Already Done

I've created SVG icon files for your website with a custom design featuring:
- **Brand colors**: Teal (#0d4a4a) and Gold (#d4a055)
- **Design**: Three village houses with a "V" letter overlay
- **Files created**:
  - `/public/icons/icon.svg` (main icon)
  - `/public/icons/icon-192x192.svg`
  - `/public/icons/icon-512x512.svg`
  - `/public/icons/icon-96x96.svg`
  - `/public/screenshots/home.svg`
  - `/public/screenshots/shop.svg`

## 📋 What You Need to Do

### Step 1: Generate PNG Files from SVG

You need to convert the SVG icons to PNG format. Here are your options:

#### **Option A: Online Converter (Easiest)**

1. Go to [SVG to PNG Converter](https://www.aconvert.com/image/svg-to-png/)
2. Upload `/public/icons/icon.svg`
3. Convert to these sizes and save to `/public/`:
   - `icon.png` - 512x512px
   - `apple-icon.png` - 180x180px
   - `favicon-16x16.png` - 16x16px
   - `favicon-32x32.png` - 32x32px

#### **Option B: Using Figma/Design Tool**

1. Open `/public/icons/icon.svg` in Figma, Illustrator, or Inkscape
2. Export as PNG at the sizes listed above
3. Save to `/public/`

#### **Option C: Using Sharp (Developer)**

```bash
bun add sharp
```

Then create a script to convert SVG to PNG programmatically.

### Step 2: Generate favicon.ico

1. Go to [Favicon Generator](https://favicon.io/favicon-converter/)
2. Upload your `icon.png` (512x512)
3. Download the generated `favicon.ico`
4. Save it to `/public/favicon.ico`

### Step 3: Verify Files

Make sure these files exist in `/public/`:
- ✅ `favicon.ico`
- ✅ `icon.png`
- ✅ `apple-icon.png`
- ✅ `icons/icon-192x192.svg`
- ✅ `icons/icon-512x512.svg`
- ✅ `icons/icon-96x96.svg`

## 🎯 Current Configuration

Your `layout.tsx` and `manifest.json` are already configured to use these icons!

### In layout.tsx:
```tsx
icons: {
  icon: [
    { url: '/favicon.ico' },
    { url: '/icon.png', sizes: '512x512', type: 'image/png' },
  ],
  apple: [
    { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
  ],
  shortcut: ['/favicon.ico'],
}
```

### In manifest.json:
All icon references are set up for PWA installation.

## 🚀 After Adding Icons

1. Clear your browser cache
2. Reload the website
3. Check the browser tab - you should see your new favicon!
4. On mobile, add to home screen to see the app icon

## 🎨 Customizing the Icon

If you want to change the design, edit `/public/icons/icon.svg`:
- The background circle is your brand teal: `#0d4a4a`
- The houses are your brand gold: `#d4a055`
- The "V" letter is also gold

## 💡 Tips

- Icons look best when simple and bold
- Test on both light and dark browser themes
- The current design works well at small sizes (16x16) and large (512x512)

---

**Need help?** The SVG files are ready - you just need to generate the PNG versions!
