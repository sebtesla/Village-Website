# Stripe Payment Setup Guide

This guide will help you set up Stripe payment processing for The Village Merch Store.

## Prerequisites

- A Stripe account (sign up at https://stripe.com)
- Completed Discord OAuth setup (users must be logged in to checkout)

## Step 1: Create a Stripe Account

1. Go to [Stripe.com](https://stripe.com) and click "Start now"
2. Complete the signup process
3. Verify your email address
4. Complete your business profile (this can be done later for testing)

## Step 2: Get Your API Keys

### For Development (Test Mode)

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Make sure you're in **Test mode** (toggle in the top right)
3. Navigate to **Developers** → **API keys**
4. You'll see two keys:
   - **Publishable key**: Starts with `pk_test_`
   - **Secret key**: Click "Reveal test key" to see it, starts with `sk_test_`

### For Production (Live Mode)

1. Switch to **Live mode** using the toggle
2. Complete your business activation (Stripe will guide you through this)
3. Navigate to **Developers** → **API keys**
4. Get your live keys:
   - **Publishable key**: Starts with `pk_live_`
   - **Secret key**: Starts with `sk_live_`

## Step 3: Update Environment Variables

1. Open `.env.local` in your project root
2. Replace the Stripe placeholder values:

```env
# For Development/Testing
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_key_here

# For Production (when deploying)
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_key_here
# STRIPE_SECRET_KEY=sk_live_your_key_here
```

## Step 4: Test the Payment Flow

1. Restart your development server:
   ```bash
   bun run dev
   ```

2. Add items to cart and proceed to checkout
3. You'll be redirected to Stripe Checkout
4. Use Stripe test card numbers:
   - **Success**: `4242 4242 4242 4242`
   - **Decline**: `4000 0000 0000 0002`
   - **Requires authentication**: `4000 0025 0000 3155`
   - Use any future expiry date (e.g., 12/34)
   - Use any 3-digit CVC (e.g., 123)
   - Use any billing ZIP code

5. After successful payment, you'll be redirected to the success page

## Step 5: View Test Payments

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to **Payments** in the left sidebar
3. You'll see all test payments listed
4. Click on any payment to see details

## Step 6: Configure Webhooks (Optional but Recommended)

Webhooks allow Stripe to notify your app about payment events.

1. Go to **Developers** → **Webhooks** in Stripe Dashboard
2. Click **Add endpoint**
3. Enter your endpoint URL:
   - For local testing: Use a service like [Stripe CLI](https://stripe.com/docs/stripe-cli) or [ngrok](https://ngrok.com)
   - For production: `https://your-domain.com/api/webhooks/stripe`
4. Select events to listen for:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copy the **Signing secret** (starts with `whsec_`)
6. Add to `.env.local`:
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_your_secret_here
   ```

## Step 7: Production Deployment

Before going live:

### Complete Stripe Activation
1. Complete your business profile in Stripe
2. Add bank account for payouts
3. Verify your identity (required by Stripe)
4. Review and accept Stripe's terms

### Update Environment Variables
1. Switch to Live mode API keys
2. Update your hosting platform's environment variables:
   ```env
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
   STRIPE_SECRET_KEY=sk_live_xxxxx
   STRIPE_WEBHOOK_SECRET=whsec_xxxxx
   ```

### Important Production Settings
- Set up proper error handling
- Configure email notifications for orders
- Set up inventory management
- Configure tax settings in Stripe Dashboard
- Set up subscription billing if needed

## Security Best Practices

1. **Never commit API keys to version control**
   - `.env.local` is already in `.gitignore`
   - Use environment variables in production

2. **Use test keys during development**
   - Always use `pk_test_` and `sk_test_` keys for testing
   - Switch to live keys only in production

3. **Protect your Secret Key**
   - Never expose `STRIPE_SECRET_KEY` to the client
   - Only use it in API routes (server-side)

4. **Verify webhook signatures**
   - Always validate webhook events using the signing secret
   - This prevents unauthorized requests

## Common Issues & Solutions

### "Invalid API Key" Error
- Make sure you copied the complete key
- Verify you're using the correct mode (test vs live)
- Check for extra spaces in your `.env.local` file

### "Authentication Required" Error
- Users must be logged in with Discord to checkout
- Make sure Discord OAuth is properly configured

### Payments Not Appearing
- Verify you're in the correct mode (test/live)
- Check that the API keys match the mode

### Webhook Not Working
- Verify the endpoint URL is correct
- Make sure the webhook secret matches
- Use Stripe CLI for local testing

## Testing Checklist

- [ ] Test successful payment
- [ ] Test declined payment
- [ ] Test with different product combinations
- [ ] Verify order confirmation page
- [ ] Check cart clears after successful checkout
- [ ] Test free shipping threshold ($75+)
- [ ] Verify Discord login requirement

## Additional Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Testing Guide](https://stripe.com/docs/testing)
- [Stripe Checkout](https://stripe.com/docs/payments/checkout)
- [Stripe Dashboard](https://dashboard.stripe.com)
- [Stripe Support](https://support.stripe.com)

## Next Steps

1. Set up proper order management system
2. Add order confirmation emails
3. Implement order tracking
4. Set up inventory management
5. Configure automated receipts
6. Add analytics and reporting

---

**Need Help?** Contact Stripe Support or check out their comprehensive documentation at stripe.com/docs
