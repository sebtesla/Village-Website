# 🚀 START HERE - Discord OAuth Setup

## ✅ What I've Done

I've configured your Discord OAuth locally with these credentials:
- **Discord Client ID:** Set in environment variables
- **Discord Secret:** Set in environment variables
- **Generated NextAuth Secret:** Ready
- **Updated .env.local:** ✅ Complete

---

## 🎯 What YOU Need to Do (5 minutes)

### 1️⃣ Add Discord Redirect URL (1 minute)

Go to: https://discord.com/developers/applications

1. Click **OAuth2** → **General**
2. Scroll to **Redirects**
3. Add: `https://therustvillage.netlify.app/api/auth/callback/discord`
4. Click **Save Changes**

### 2️⃣ Add Environment Variables to Netlify (2 minutes)

Go to: https://app.netlify.com/

1. Click **therustvillage** project
2. Go to **Site configuration** → **Environment variables**
3. Add these 4 variables (click "Add a variable" for each):

```
NEXT_PUBLIC_DISCORD_CLIENT_ID = <your-discord-client-id>
DISCORD_CLIENT_SECRET = <your-discord-client-secret>
NEXTAUTH_SECRET = <your-nextauth-secret>
NEXTAUTH_URL = https://therustvillage.netlify.app
```

### 3️⃣ Test It (2 minutes)

1. Wait for Netlify to redeploy (check "Deploys" tab)
2. Go to https://therustvillage.netlify.app
3. Click user icon → "Sign in with Discord"
4. Authorize → You're logged in! 🎉

---

## 📚 More Help

- **DISCORD_CHECKLIST.txt** - Visual checklist
- **README_DISCORD_SETUP.md** - Complete guide
- **DISCORD_FIX_GUIDE.md** - Troubleshooting
- **QUICK_SETUP.md** - Quick reference

---

## ⚡ Quick Copy-Paste

**Discord Redirect:**
```
https://therustvillage.netlify.app/api/auth/callback/discord
```

**Netlify Variables:**
```
NEXT_PUBLIC_DISCORD_CLIENT_ID
<your-discord-client-id>

DISCORD_CLIENT_SECRET
<your-discord-client-secret>

NEXTAUTH_SECRET
<your-nextauth-secret>

NEXTAUTH_URL
https://therustvillage.netlify.app
```

---

## 🎊 You're Ready!

Follow steps 1-3 above and Discord OAuth will work perfectly!

**Need help?** Check the guides in this folder.
