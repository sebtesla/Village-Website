# Discord OAuth Fix - Complete Guide

## ✅ What I've Done

I've updated your local `.env.local` file with your Discord credentials:

```env
NEXT_PUBLIC_DISCORD_CLIENT_ID=1334996493198692454
DISCORD_CLIENT_SECRET=DzuOKEqqIfGdQQoJlXlbn2Ve5Vz6IPdO
NEXTAUTH_SECRET=8f9e7d6c5b4a3210fedcba9876543210abcdef1234567890fedcba9876543210
NEXTAUTH_URL=https://therustvillage.netlify.app
```

---

## 🎯 What You Need to Do

### Step 1: Update Discord Developer Portal

1. Go to [Discord Developer Portal](https://discord.com/developers/applications/1334996493198692454)
2. Click on your application "The Village Merch Store"
3. Navigate to **OAuth2** → **General** in the left sidebar
4. Scroll down to **Redirects**
5. Add this exact URL (if not already there):
   ```
   https://therustvillage.netlify.app/api/auth/callback/discord
   ```
6. Click **Save Changes**

**Important:** The redirect URI must match EXACTLY - no trailing slash, must use https.

---

### Step 2: Add Environment Variables to Netlify

1. Go to [Netlify Dashboard](https://app.netlify.com/)
2. Select your project: **therustvillage**
3. Go to **Site configuration** → **Environment variables**
4. Click **Add a variable** and add each of these:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_DISCORD_CLIENT_ID` | `1334996493198692454` |
| `DISCORD_CLIENT_SECRET` | `DzuOKEqqIfGdQQoJlXlbn2Ve5Vz6IPdO` |
| `NEXTAUTH_SECRET` | `8f9e7d6c5b4a3210fedcba9876543210abcdef1234567890fedcba9876543210` |
| `NEXTAUTH_URL` | `https://therustvillage.netlify.app` |

5. After adding all variables, Netlify will automatically redeploy your site

---

### Step 3: Wait for Deployment

After adding the environment variables:
- Netlify will automatically redeploy (takes 2-3 minutes)
- You can watch the deployment in the Netlify dashboard under "Deploys"

---

### Step 4: Test Discord Login

Once deployment is complete:

1. Go to https://therustvillage.netlify.app
2. Click the **user icon** in the top right
3. Click **"Sign in with Discord"**
4. You should be redirected to Discord
5. Click **"Authorize"** to allow access
6. You'll be redirected back to the site and logged in!

---

## 🔍 Verification Checklist

Before testing, verify:

- [ ] Discord redirect URI added: `https://therustvillage.netlify.app/api/auth/callback/discord`
- [ ] All 4 environment variables added to Netlify
- [ ] Netlify deployment completed successfully
- [ ] You're testing on `https://therustvillage.netlify.app` (not localhost)

---

## 🐛 Troubleshooting

### Error: "Invalid Redirect URI"

**Problem:** The redirect URI in Discord doesn't match

**Solution:**
1. Check Discord redirect URI is exactly: `https://therustvillage.netlify.app/api/auth/callback/discord`
2. No trailing slash
3. Must be https, not http
4. No extra characters or spaces

### Error: "Client Authentication Failed"

**Problem:** Client ID or Secret is incorrect

**Solution:**
1. Double-check the Client ID in Netlify: `1334996493198692454`
2. Double-check the Client Secret in Netlify: `DzuOKEqqIfGdQQoJlXlbn2Ve5Vz6IPdO`
3. Make sure there are no extra spaces when pasting

### Error: "Session not persisting" or "Keeps logging out"

**Problem:** NEXTAUTH_SECRET or NEXTAUTH_URL not set correctly

**Solution:**
1. Verify NEXTAUTH_SECRET is set in Netlify
2. Verify NEXTAUTH_URL is exactly: `https://therustvillage.netlify.app`
3. Clear browser cookies and try again

### Still not working?

1. Check Netlify deployment logs for errors
2. Open browser console (F12) and check for error messages
3. Make sure you're testing on the live site, not localhost
4. Try in an incognito/private window

---

## 📝 Notes

- Local development (localhost:3000) won't work for Discord OAuth because Discord expects the production URL
- After users log in with Discord, they're automatically saved to your PostgreSQL database
- The user's Discord info (username, avatar, email) is stored in the database

---

## ✨ What Happens After Login

When a user logs in with Discord:

1. **User is redirected to Discord** for authorization
2. **Discord returns user info** (username, email, avatar, Discord ID)
3. **NextAuth creates/updates user** in your database
4. **User is logged in** and can:
   - Make purchases
   - Track orders
   - Leave comments on blog posts
   - Access member-only content

---

## 🎉 You're All Set!

Once you complete Steps 1 and 2 above, Discord OAuth will work perfectly!

If you have any issues, check the troubleshooting section above.
