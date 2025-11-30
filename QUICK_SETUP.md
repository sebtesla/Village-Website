# Quick Setup - Discord OAuth

## ⚡ 2-Minute Setup

### 1. Discord Developer Portal
**URL:** https://discord.com/developers/applications/1334996493198692454

**Add Redirect:**
```
https://therustvillage.netlify.app/api/auth/callback/discord
```

### 2. Netlify Environment Variables
**URL:** https://app.netlify.com/ → therustvillage → Site configuration → Environment variables

**Add these 4 variables:**

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

### 3. Test
1. Wait for Netlify to redeploy (2-3 min)
2. Go to https://therustvillage.netlify.app
3. Click user icon → Sign in with Discord
4. Done! ✅

---

**Full guide:** See `DISCORD_FIX_GUIDE.md` for detailed instructions and troubleshooting.
