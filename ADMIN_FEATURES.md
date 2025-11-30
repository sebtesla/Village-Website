# Admin Features Guide

Complete guide to managing your Village Merch Store through the admin dashboard.

## 📋 Table of Contents

1. [Access Admin Dashboard](#access-admin-dashboard)
2. [Order Management](#order-management)
3. [Analytics Dashboard](#analytics-dashboard)
4. [Product Management](#product-management)
5. [Blog Management](#blog-management)
6. [Common Tasks](#common-tasks)

## 🔐 Access Admin Dashboard

### Login

1. Navigate to `/admin`
2. Enter admin password (default: `admin123`)
3. Access granted to all admin features

**⚠️ Security**: Change default password in `.env.local`:
```env
ADMIN_PASSWORD=your_secure_password_here
```

### Admin Pages

- **Main Dashboard**: `/admin` - Overview and quick actions
- **Order Management**: `/admin/orders` - Manage all orders
- **Analytics**: `/admin/analytics` - Revenue and performance tracking
- **Product Management**: `/admin` → Products tab
- **Blog Management**: `/admin` → Blog tab

## 📦 Order Management

Access: `/admin/orders`

### Features

**View All Orders**
- Complete order list with details
- Order number, customer info, total
- Order status with color coding
- Creation date and time
- Item count per order

**Search & Filter**
- Search by order number, email, or customer name
- Filter by status: All, Pending, Paid, Processing, Shipped, Delivered, Cancelled
- Real-time search results

**Order Details**
- Click "Manage" on any order to view:
  - Complete item list with quantities and prices
  - Customer information
  - Order total breakdown
  - Current status
  - Tracking number (if added)

### Order Status Workflow

```
PENDING → PAID → PROCESSING → SHIPPED → DELIVERED
           ↓
      CANCELLED
```

**Status Meanings:**
- **PENDING**: Order created, waiting for payment
- **PAID**: Payment successful (automatically set by Stripe)
- **PROCESSING**: Order being prepared
- **SHIPPED**: Package sent to customer
- **DELIVERED**: Package received by customer
- **CANCELLED**: Order cancelled

### Update Order Status

1. Click "Manage" on an order
2. Select new status from dropdown
3. (Optional) Add tracking number
4. Click "Update Order"

**Automatic Actions:**
- Status → SHIPPED: Sends shipping confirmation email to customer
- Status → SHIPPED: Records shipment date
- Status → DELIVERED: Records delivery date

### Add Tracking Number

1. Open order details
2. Enter tracking number in "Tracking Number" field
3. Set status to "SHIPPED"
4. Click "Update Order"

**Result**: Customer receives email with:
- Order number
- Tracking number
- Tracking link (Google search)
- Estimated delivery date

### Order Information

Each order displays:
- **Order Number**: Unique ID (e.g., VLG-ABC123-XYZ)
- **Customer**: Name and email
- **Date**: When order was placed
- **Items**: List of products ordered
- **Total**: Final amount charged
- **Status**: Current order state
- **Tracking**: Shipping tracking number

## 📊 Analytics Dashboard

Access: `/admin/analytics`

### Key Metrics

**Total Revenue**
- Sum of all paid orders
- Excludes pending and cancelled orders
- Displayed in gold for emphasis

**Total Orders**
- All orders in system
- Breakdown by paid vs total

**Average Order Value (AOV)**
- Revenue ÷ Number of paid orders
- Helps track customer spending patterns

**Conversion Rate**
- Paid orders ÷ Total orders × 100
- Measures payment success rate

### Revenue Over Time Chart

**Line Chart** showing last 30 days:
- **Gold Line**: Daily revenue
- **Green Line**: Daily order count
- Hover for exact values
- Helps identify trends and patterns

### Order Status Distribution

**Pie Chart** showing:
- Visual breakdown of orders by status
- Color-coded by status type
- Exact counts for each status
- Helps identify bottlenecks

### Top Selling Products

**Bar Chart** showing top 5 products by:
- **Gold Bars**: Revenue generated
- **Green Bars**: Quantity sold
- Sorted by highest revenue
- Helps identify best performers

### Using Analytics Data

**Identify Trends**
- Peak sales days/periods
- Product performance
- Conversion issues

**Make Decisions**
- Stock popular products
- Discontinue poor performers
- Plan marketing campaigns

**Track Growth**
- Revenue increases
- Order volume changes
- AOV improvements

## 🛍️ Product Management

Access: `/admin` → Products tab

### View Products

- Complete product catalog
- Name, price, category
- Stock status
- Badges (if any)

### Add New Product

1. Go to "Add Product" tab
2. Fill in form:
   - Product name
   - Price
   - Description
   - Category (hats, apparel, accessories)
   - Image URL
   - Sizes (comma-separated)
   - Colors (comma-separated)
3. Click "Add Product"

**Note**: Currently demo form. In production, this would save to database.

### Product Information

- **Name**: Product title
- **Price**: In USD
- **Description**: Full product details
- **Category**: Product type for filtering
- **Images**: URLs to product photos
- **Sizes**: Available sizes (if applicable)
- **Colors**: Color variants
- **Badge**: Special labels (NEW, SALE, etc.)
- **Stock Status**: In stock or out of stock

## ✍️ Blog Management

Access: `/admin` → Blog tab

### View Blog Posts

- All published posts
- Title, excerpt, author
- Category and publication date
- Featured post indicator

### Add New Blog Post

1. Go to "Add Post" tab
2. Fill in form:
   - Post title
   - Excerpt (summary)
   - Content (markdown supported)
   - Author name
   - Category
   - Featured image URL
   - Tags (comma-separated)
3. Click "Publish Post"

**Note**: Currently demo form. In production, this would save to database.

### Blog Post Information

- **Title**: Post headline
- **Excerpt**: Short summary
- **Content**: Full article (markdown)
- **Author**: Writer name
- **Category**: Topic (community, events, merchandise, lifestyle)
- **Image**: Featured image URL
- **Tags**: Searchable keywords
- **Featured**: Show in featured section

## 🔧 Common Tasks

### Process a New Order

1. Order automatically created when customer checks out
2. Payment succeeds → Status changes to PAID
3. Customer receives order confirmation email
4. You see order in Order Management
5. Update status to PROCESSING when preparing
6. Add tracking number and set to SHIPPED
7. Customer receives shipping email
8. Update to DELIVERED when confirmed

### Handle Customer Inquiry

Customer emails about order:

1. Go to `/admin/orders`
2. Search for order number or email
3. Click "Manage" to view details
4. Check status and tracking
5. Update if needed
6. Provide customer with information

### Check Today's Sales

1. Go to `/admin/analytics`
2. View "Total Revenue" card
3. Check today's data point on revenue chart
4. See recent orders in Order Management

### Find Best Selling Product

1. Go to `/admin/analytics`
2. Scroll to "Top Selling Products" chart
3. See products ranked by revenue
4. Note quantities sold

### Cancel an Order

1. Go to `/admin/orders`
2. Find the order
3. Click "Manage"
4. Set status to "CANCELLED"
5. Click "Update Order"

**Note**: No refund is processed. Handle refund separately in Stripe.

### Add Product to Database

**Current**: Products are in code (`src/lib/product-data.ts`)

**To Add Product**:
1. Edit `src/lib/product-data.ts`
2. Add new product object
3. Or use database directly:
   ```bash
   bun run db:studio
   ```
4. Add product in Prisma Studio

**Future**: Use admin form with database integration

## 📈 Best Practices

### Order Management

1. **Update Regularly**: Check orders daily
2. **Quick Processing**: Move to PROCESSING status promptly
3. **Add Tracking**: Always provide tracking numbers
4. **Clear Communication**: Update status accurately
5. **Monitor Pending**: Follow up on pending orders

### Analytics Review

1. **Daily Check**: Review key metrics each day
2. **Weekly Analysis**: Study trends weekly
3. **Monthly Reports**: Analyze monthly performance
4. **Compare Periods**: Track month-over-month growth
5. **Act on Data**: Use insights for decisions

### Customer Service

1. **Respond Quickly**: Check orders when customers inquire
2. **Be Transparent**: Provide accurate status updates
3. **Proactive Updates**: Update orders before customers ask
4. **Track Everything**: Use tracking numbers consistently
5. **Follow Up**: Confirm delivery

## 🔒 Security Tips

1. **Change Default Password**: Use strong admin password
2. **Don't Share**: Keep admin credentials private
3. **Secure Environment**: Protect `.env.local` file
4. **Log Out**: Use logout button when done
5. **Monitor Access**: Check for suspicious activity

## 📱 Mobile Access

Admin dashboard is responsive:
- Works on tablets and phones
- Tables scroll horizontally
- Charts are mobile-optimized
- Touch-friendly buttons

## 🆘 Troubleshooting

### Can't Login

- Verify password in `.env.local`
- Clear browser cache
- Try `admin123` (default)
- Check `sessionStorage` is enabled

### Orders Not Showing

- Verify database is connected
- Check DATABASE_URL in `.env.local`
- Run: `bun run db:studio` to verify data
- Refresh the page

### Analytics Not Loading

- Check database connection
- Verify orders exist in database
- Check browser console for errors
- Ensure API routes are working

### Email Not Sending

- Verify RESEND_API_KEY is set
- Check EMAIL_FROM is configured
- View Resend dashboard for errors
- Check Stripe webhook is configured

## 📚 Related Documentation

- [Database Setup](./DATABASE_SETUP.md)
- [Email Setup](./EMAIL_SETUP.md)
- [Stripe Setup](./STRIPE_SETUP.md)
- [Main Setup Guide](./SETUP_GUIDE.md)

## 🎯 Next Steps

1. ✅ Set up database connection
2. ✅ Configure email service
3. ✅ Test order creation
4. ✅ Practice updating orders
5. ✅ Review analytics
6. ✅ Add tracking to test order
7. ✅ Verify emails are sent

---

**Ready to manage your store?** Access `/admin` and start processing orders!
