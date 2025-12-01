# Quick Setup - Discord OAuth

## ⚡ 2-Minute Setup

### 1. Discord Developer Portal
**URL:** https://discord.com/developers/applications

**Add Redirect:**
```
https://therustvillage.netlify.app/api/auth/callback/discord
```

### 2. Netlify Environment Variables
**URL:** https://app.netlify.com/ → therustvillage → Site configuration → Environment variables

**Add these 4 variables:**

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

### 3. Test
1. Wait for Netlify to redeploy (2-3 min)
2. Go to https://therustvillage.netlify.app
3. Click user icon → Sign in with Discord
4. Done! ✅

---

**Full guide:** See `DISCORD_FIX_GUIDE.md` for detailed instructions and troubleshooting.
