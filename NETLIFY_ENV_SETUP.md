# Netlify Environment Variables Setup

## 🚀 Quick Setup

You need to add these environment variables to your Netlify deployment:

### How to Add Environment Variables

1. Go to [Netlify Dashboard](https://app.netlify.com/)
2. Select your project: **therustvillage**
3. Go to **Site configuration** → **Environment variables**
4. Click **Add a variable** for each one below

---

## Required Environment Variables

### Discord OAuth (REQUIRED - Already have these!)

```
NEXT_PUBLIC_DISCORD_CLIENT_ID
1334996493198692454

DISCORD_CLIENT_SECRET
DzuOKEqqIfGdQQoJlXlbn2Ve5Vz6IPdO

NEXTAUTH_SECRET
8f9e7d6c5b4a3210fedcba9876543210abcdef1234567890fedcba9876543210

NEXTAUTH_URL
https://therustvillage.netlify.app
```

### Database (Already configured!)

```
DATABASE_URL
postgresql://postgres:kzsQgYFhLosLuB3456@db.htqsirayzdfvltzfvwov.supabase.co:5432/postgres
```

### Optional (Can add later)

**Stripe** (for payments)
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
your_stripe_publishable_key_here

STRIPE_SECRET_KEY
your_stripe_secret_key_here

STRIPE_WEBHOOK_SECRET
your_stripe_webhook_secret_here
```

**Resend** (for emails)
```
RESEND_API_KEY
your_resend_api_key_here

EMAIL_FROM
noreply@therustvillage.com
```

**Admin Password**
```
NEXT_PUBLIC_ADMIN_PASSWORD
admin123
```

---

## Discord Developer Portal Setup

Make sure your Discord app is configured correctly:

1. Go to [Discord Developer Portal](https://discord.com/developers/applications/1334996493198692454)
2. Navigate to **OAuth2** → **General**
3. Under **Redirects**, add:
   ```
   https://therustvillage.netlify.app/api/auth/callback/discord
   ```
4. Click **Save Changes**

---

## Testing Discord Login

After adding the environment variables and updating Discord:

1. Deploy your site (Netlify will redeploy automatically)
2. Go to https://therustvillage.netlify.app
3. Click the user icon
4. Click "Sign in with Discord"
5. You should be redirected to Discord for authorization
6. After authorizing, you'll be redirected back and logged in!

---

## Troubleshooting

### "Invalid Redirect URI" Error
- Make sure the redirect URI in Discord matches exactly:
  `https://therustvillage.netlify.app/api/auth/callback/discord`
- No trailing slash
- Use https, not http

### "Client Authentication Failed"
- Double-check the Client ID and Client Secret in Netlify
- Make sure there are no extra spaces

### Session Not Persisting
- Verify NEXTAUTH_SECRET is set in Netlify
- Clear browser cookies and try again

---

## Current Status

✅ Local development configured
⏳ Need to add environment variables to Netlify
⏳ Need to update Discord redirect URI

Once you complete these steps, Discord OAuth will work perfectly!
