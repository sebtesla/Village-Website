# Email Setup Guide - Resend

This guide will help you set up email notifications for The Village Merch Store using Resend.

## 📋 What You'll Get

- Order confirmation emails after successful purchase
- Shipping confirmation emails with tracking
- Beautiful, branded email templates
- Reliable email delivery
- Easy setup (10 minutes)

## Why Resend?

- **Modern API**: Simple and developer-friendly
- **Free Tier**: 100 emails/day, 3,000/month
- **React Email**: Build emails with React components
- **Great Deliverability**: High inbox placement
- **No Credit Card**: Free plan doesn't require payment info

## Quick Start (5 minutes)

### Step 1: Create Resend Account

1. Go to [Resend.com](https://resend.com)
2. Click "Start Building"
3. Sign up with email or GitHub
4. Verify your email address

### Step 2: Get API Key

1. Log in to Resend Dashboard
2. Go to "API Keys" in sidebar
3. Click "Create API Key"
4. Name it "Village Merch Development"
5. Permission: "Sending access"
6. Click "Create"
7. **Copy the API key** (you won't see it again!)

### Step 3: Update Environment Variables

1. Open `.env.local` in your project
2. Add your Resend API key:

```env
RESEND_API_KEY=re_your_api_key_here
```

### Step 4: Configure Sender Email

For development/testing, use:

```env
EMAIL_FROM=onboarding@resend.dev
```

For production, use your verified domain (see below).

### Step 5: Test It!

Your emails are ready! When a customer:
1. Completes checkout → Gets order confirmation
2. Order ships → Gets shipping notification

## Domain Verification (Production)

To send emails from your own domain (e.g., `orders@yourdomain.com`):

### Step 1: Add Domain to Resend

1. Go to Resend Dashboard → Domains
2. Click "Add Domain"
3. Enter your domain (e.g., `yourdomain.com`)
4. Click "Add"

### Step 2: Configure DNS Records

Resend will show you DNS records to add. You need to add these to your domain DNS:

**Example DNS Records:**

| Type | Name | Value |
|------|------|-------|
| TXT | @ | v=spf1 include:resend.com ~all |
| CNAME | resend._domainkey | resend._domainkey.resend.com |
| CNAME | resend2._domainkey | resend2._domainkey.resend.com |

#### Where to Add DNS Records

**Namecheap:**
1. Domain List → Manage
2. Advanced DNS
3. Add New Record

**GoDaddy:**
1. My Products → DNS
2. Add → Choose record type

**Cloudflare:**
1. Select domain → DNS
2. Add record

**Vercel:**
1. Domain settings → DNS
2. Add records

### Step 3: Verify Domain

1. After adding DNS records, click "Verify" in Resend
2. Verification usually takes 5-15 minutes
3. Once verified, you'll see a green checkmark

### Step 4: Update Environment Variable

```env
EMAIL_FROM=noreply@yourdomain.com
# or
EMAIL_FROM=The Village <orders@yourdomain.com>
```

## Email Templates

Your store includes two email templates:

### 1. Order Confirmation Email

**Sent when:** Payment succeeds
**Includes:**
- Order number
- Itemized list with images
- Prices and totals
- Shipping info
- What's next information

**File:** `src/emails/order-confirmation.tsx`

### 2. Shipping Confirmation Email

**Sent when:** Order ships
**Includes:**
- Order number
- Tracking number
- Tracking link
- Estimated delivery
- Support information

**File:** `src/emails/shipping-confirmation.tsx`

## Testing Emails

### Development Testing

```bash
# Start dev server
bun run dev

# Place a test order
1. Add items to cart
2. Click checkout
3. Use test card: 4242 4242 4242 4242
4. Check your email!
```

### Preview Emails Locally

```bash
# Run email dev server
cd src/emails
bunx email dev
```

Opens at `http://localhost:3000`
- Preview all email templates
- Test with different data
- See responsive design

### Test Without Checkout

Create test file `test-email.ts`:

```typescript
import { sendOrderConfirmation } from './src/lib/email'

sendOrderConfirmation({
  orderNumber: 'VLG-TEST-123',
  customerName: 'John Doe',
  customerEmail: 'your@email.com',
  items: [{
    name: 'Test Product',
    price: 35,
    quantity: 1,
    image: 'https://example.com/image.jpg'
  }],
  subtotal: 35,
  shipping: 0,
  total: 35
})
```

Run: `bunx tsx test-email.ts`

## Email Limits

### Free Plan
- **100 emails/day**
- **3,000 emails/month**
- Perfect for testing and small stores

### Paid Plans (if needed)
- **$20/month**: 50,000 emails
- **$80/month**: 250,000 emails
- **$200/month**: 1,000,000 emails

## Customizing Email Templates

### Change Colors

Edit template files in `src/emails/`:

```typescript
const header = {
  backgroundColor: '#0d4a4a', // Your color
}

const accent = {
  color: '#d4a055', // Your accent color
}
```

### Add Your Logo

```typescript
<Img
  src="https://yourdomain.com/logo.png"
  alt="The Village"
  width="200"
/>
```

### Modify Content

Email templates use React components. Edit like regular React:

```typescript
<Text style={text}>
  Your custom message here
</Text>
```

## Webhook Configuration

Emails are sent automatically via Stripe webhooks:

1. **Payment Succeeds** → Order confirmation sent
2. **Order Ships** → Shipping confirmation sent (when you add tracking)

See `src/app/api/webhooks/stripe/route.ts`

## Sending Shipping Emails

When order ships, call the shipping email API:

```typescript
import { sendShippingConfirmation } from '@/lib/email'

await sendShippingConfirmation({
  orderNumber: 'VLG-123',
  customerName: 'John Doe',
  customerEmail: 'customer@example.com',
  trackingNumber: '1Z999AA10123456784',
  trackingUrl: 'https://track.usps.com/...',
  estimatedDelivery: 'Friday, December 15'
})
```

## Monitoring Emails

### View Sent Emails

1. Go to Resend Dashboard
2. Click "Emails" in sidebar
3. See all sent emails with:
   - Status (sent, delivered, bounced)
   - Open rates
   - Click rates
   - Error messages

### Email Analytics

- **Delivered**: Email reached inbox
- **Opened**: Recipient opened email
- **Clicked**: Recipient clicked link
- **Bounced**: Email failed to deliver
- **Complained**: Marked as spam

## Troubleshooting

### "API key is invalid"
- Check you copied the full key
- Verify no extra spaces in `.env.local`
- Make sure you're using the right key (dev vs prod)

### Emails Not Sending
- Check Resend API key is set
- Verify `EMAIL_FROM` is configured
- Check logs for error messages
- Test with `onboarding@resend.dev` first

### Emails Going to Spam
- Verify your domain (SPF, DKIM)
- Use authenticated domain
- Avoid spam trigger words
- Test email content score

### Domain Verification Failed
- Wait 15-30 minutes after adding DNS
- Verify DNS records are correct
- Check no typos in DNS values
- Try "Verify" button again

### Wrong Sender Email
- Update `EMAIL_FROM` in `.env.local`
- Restart development server
- Check email template isn't hardcoded

## Production Checklist

Before launching:

- [ ] Verify custom domain in Resend
- [ ] Update `EMAIL_FROM` to your domain
- [ ] Test order confirmation email
- [ ] Test shipping confirmation email
- [ ] Set up Resend API key in hosting platform
- [ ] Monitor first few orders for deliverability
- [ ] Set up email forwarding for support emails

## Advanced Features

### Attachments

```typescript
await resend.emails.send({
  // ... other options
  attachments: [{
    filename: 'invoice.pdf',
    content: pdfBuffer,
  }]
})
```

### CC/BCC

```typescript
await resend.emails.send({
  // ... other options
  cc: ['support@yourdomain.com'],
  bcc: ['archive@yourdomain.com'],
})
```

### Scheduled Emails

```typescript
await resend.emails.send({
  // ... other options
  scheduledAt: '2024-12-01T12:00:00Z',
})
```

## Best Practices

1. **Use Real From Address**
   - Not `noreply@` - use `orders@` or `support@`
   - Makes emails feel personal

2. **Test Templates**
   - Send to yourself first
   - Check on mobile and desktop
   - Test in different email clients

3. **Monitor Deliverability**
   - Check bounce rates weekly
   - Remove invalid emails
   - Maintain good sender reputation

4. **Provide Unsubscribe**
   - Required by law for marketing
   - Not needed for transactional (orders)

5. **Keep Templates Simple**
   - Avoid complex layouts
   - Use web-safe fonts
   - Optimize images

## Resources

- [Resend Documentation](https://resend.com/docs)
- [React Email Documentation](https://react.email)
- [Email Testing Tools](https://www.mail-tester.com)
- [Resend Status Page](https://resend.com/status)

## Support

- **Resend Support**: support@resend.com
- **Documentation**: resend.com/docs
- **Discord**: join Resend community

---

**Ready to send beautiful emails?** Follow the quick start guide above and you'll be sending order confirmations in minutes!
