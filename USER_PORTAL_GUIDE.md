# 👤 User Portal Guide

## ✅ What Happens After Discord Login

When a user logs in with Discord, they now have access to a **complete user portal** at `/account`!

### Immediate Access
After logging in, users can:
1. **Click their profile picture** in the header
2. **See their Discord profile** (name, email, avatar)
3. **Click "My Account"** to access their portal
4. **Sign out** when done

## 🎯 User Portal Features

### 📦 Order History Tab
**Complete order management:**
- ✅ View all previous orders
- ✅ See order details (items, quantities, sizes, colors)
- ✅ Check order status (Pending, Paid, Processing, Shipped, Delivered)
- ✅ Track orders with tracking numbers
- ✅ See order timeline (placed, paid, shipped, delivered dates)
- ✅ View shipping address for each order
- ✅ Reorder items from past orders (one-click)
- ✅ Beautiful status badges with icons

**Order Statuses:**
- 🕐 **Pending** - Order placed but not yet paid
- 💳 **Paid** - Payment received
- 📦 **Processing** - Being prepared for shipping
- 🚚 **Shipped** - On the way with tracking number
- ✅ **Delivered** - Successfully delivered
- ❌ **Cancelled** - Order cancelled

### 👤 Profile Tab
**User information:**
- ✅ Discord profile picture
- ✅ Name from Discord
- ✅ Email address
- ✅ Account settings summary
- ✅ Connected via Discord OAuth

### 📍 Addresses Tab
**Saved addresses:**
- ✅ Shipping addresses saved during checkout
- ✅ Easy address management
- ✅ Default address selection (coming soon)

## 🔗 How Users Access the Portal

### Option 1: Header Menu
1. User logs in with Discord
2. Click their **profile picture** in the header
3. Click **"My Account"** button
4. Portal opens at `/account`

### Option 2: Direct Link
Users can bookmark: `https://therustvillage.netlify.app/account`

### Option 3: Footer Link
"Order History" link in the footer → redirects to account portal

## 📊 What Data Is Shown

### User Identification
Orders are linked to users via **email address** from Discord:
- When user logs in with Discord, we get their email
- Orders created during checkout are linked to that email
- Portal fetches all orders for that user's email

### Order Information Displayed
For each order:
```
Order #12345678
├── Status: Shipped 🚚
├── Total: $95.50
├── Placed: November 29, 2025
├── Tracking: 1Z999AA10123456784
├── Items:
│   ├── The Village Hat (Green) - Size: One Size - Qty: 1 - $35.00
│   ├── Soapy Graphic Tee - Size: L - Color: Black - Qty: 2 - $64.00
└── Shipping Address:
    123 Main St, City, State 12345
```

## 🎨 Portal Design

### Beautiful UI
- **Tabbed interface** for easy navigation
- **Color-coded status badges** for quick recognition
- **Product thumbnails** in order history
- **Responsive design** for mobile and desktop
- **Professional cards** with clean layout

### User Experience
- **Loading states** while fetching data
- **Empty states** with call-to-actions
- **"No orders yet"** message with shop link
- **Easy navigation** between tabs
- **Quick actions** (Track Order, Reorder)

## 🔐 Security & Privacy

### Protected Routes
- Only logged-in users can access `/account`
- Unauthenticated users are redirected to homepage
- Login required before viewing any orders

### Data Privacy
- Users only see their own orders
- Orders filtered by user ID/email
- No access to other users' data
- Secure session management via NextAuth

## 📝 Implementation Details

### Database Schema
```prisma
model User {
  id            String    @id @default(cuid())
  discordId     String    @unique
  email         String?   @unique
  name          String?
  image         String?
  orders        Order[]   // ← Linked to orders
}

model Order {
  id                String      @id
  userId            String      // ← Links to user
  user              User        @relation(...)
  orderNumber       String      @unique
  total             Float
  status            OrderStatus
  items             OrderItem[]
  // ... more fields
}
```

### API Endpoints

#### `GET /api/my-orders`
- **Auth Required:** Yes (NextAuth session)
- **Returns:** Array of user's orders with items
- **Filter:** By user's email from session
- **Sort:** Most recent first

**Response:**
```json
[
  {
    "id": "...",
    "orderNumber": "12345678",
    "total": 95.50,
    "status": "SHIPPED",
    "createdAt": "2025-11-29T...",
    "trackingNumber": "1Z999...",
    "items": [
      {
        "id": "...",
        "name": "The Village Hat (Green)",
        "price": 35.00,
        "quantity": 1,
        "image": "https://..."
      }
    ]
  }
]
```

### Pages

#### `/account` - Main Portal
- **Layout:** Tabs (Orders, Profile, Addresses)
- **Auth:** Required (redirects if not logged in)
- **State:** Client-side with React hooks
- **Data:** Fetches from `/api/my-orders`

## 🚀 Future Enhancements

### Planned Features
- ✨ **Wishlist** - Save favorite items
- ✨ **Saved payment methods** - Store cards securely
- ✨ **Order notifications** - Email/push for status updates
- ✨ **Review orders** - Leave product reviews
- ✨ **Loyalty points** - Earn rewards on purchases
- ✨ **Referral program** - Share with friends
- ✨ **Download invoices** - PDF receipts
- ✨ **Cancel/modify orders** - Within time limits

### Coming Soon
- **Address management** - Add/edit/delete addresses
- **Default address** - Set primary shipping address
- **Order filters** - Filter by status, date, price
- **Search orders** - Search by product name, order #

## 📱 Mobile Experience

### Fully Responsive
- ✅ Mobile-first design
- ✅ Touch-friendly buttons
- ✅ Readable on small screens
- ✅ Collapsible sections
- ✅ Easy scrolling

### PWA Support
Users can add the site to their home screen and access their account like a native app!

## 🎯 User Journey

### First-Time User
1. **Browse** products on homepage
2. **Add to cart** items they like
3. **Checkout** - prompted to login
4. **Login with Discord** - quick OAuth
5. **Complete purchase** - order created
6. **Access portal** - click profile → My Account
7. **See order** - immediately visible in portal!

### Returning User
1. **Login** - click user icon → Sign in with Discord
2. **Click profile picture** → My Account
3. **See all orders** - complete history
4. **Track shipments** - click Track Order
5. **Reorder favorites** - one-click reorder

## ✅ Summary

**What's Set Up:**
- ✅ Complete user portal at `/account`
- ✅ Order history with full details
- ✅ Profile information from Discord
- ✅ Addresses tab (ready for future)
- ✅ "My Account" button in header
- ✅ API endpoint to fetch user orders
- ✅ Protected routes (auth required)
- ✅ Beautiful, responsive UI
- ✅ Status tracking with badges
- ✅ Mobile-friendly design

**Pushed to GitHub:**
- ✅ Branch: `favicon-and-github-setup`
- ✅ Repository: https://github.com/sebtesla/Village-Website
- ✅ Ready to merge to main

---

## 🎉 Everything Works Automatically!

After a user logs in with Discord:
1. Their email is saved to the database
2. Orders are linked to their user account
3. They can access their portal anytime
4. All orders are automatically displayed
5. Real-time order status updates

**No additional setup needed!** 🚀
