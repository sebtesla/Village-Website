# Discord OAuth Setup Guide

This guide will help you set up Discord OAuth authentication for The Village Merch Store.

## Prerequisites

- A Discord account
- Access to Discord Developer Portal

## Step 1: Create a Discord Application

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application" button
3. Enter "The Village Merch Store" as the application name
4. Click "Create"

## Step 2: Configure OAuth2 Settings

1. In your application, navigate to the "OAuth2" section in the left sidebar
2. Click on "OAuth2" → "General"
3. Under "Redirects", add your callback URLs:
   - For local development: `http://localhost:3000/api/auth/callback/discord`
   - For production: `https://your-domain.com/api/auth/callback/discord`
4. Click "Save Changes"

## Step 3: Get Your Credentials

1. In the "OAuth2" → "General" section, you'll find:
   - **Client ID**: Copy this value
   - **Client Secret**: Click "Reset Secret" if needed, then copy the value

## Step 4: Update Environment Variables

1. Open the `.env.local` file in your project root
2. Replace the placeholder values:

```env
NEXT_PUBLIC_DISCORD_CLIENT_ID=your_actual_client_id_here
DISCORD_CLIENT_SECRET=your_actual_client_secret_here
NEXTAUTH_SECRET=your_random_secret_key_here
NEXTAUTH_URL=http://localhost:3000
```

### Generating NEXTAUTH_SECRET

Run this command to generate a secure random secret:

```bash
openssl rand -base64 32
```

Or use an online generator like: https://generate-secret.vercel.app/32

## Step 5: Production Deployment

When deploying to production:

1. Update `NEXTAUTH_URL` to your production domain:
   ```env
   NEXTAUTH_URL=https://your-domain.com
   ```

2. Add the production callback URL in Discord Developer Portal:
   ```
   https://your-domain.com/api/auth/callback/discord
   ```

3. Set all environment variables in your hosting platform (Netlify, Vercel, etc.)

## Step 6: Test the Integration

1. Start your development server:
   ```bash
   bun run dev
   ```

2. Click the user icon in the header
3. Click "Sign in with Discord"
4. You should be redirected to Discord for authorization
5. After authorizing, you'll be redirected back to the site and logged in

## Troubleshooting

### "Invalid Redirect URI" Error
- Make sure the redirect URI in Discord matches exactly (including http vs https)
- Check that there are no trailing slashes

### "Client Authentication Failed"
- Verify your Client ID and Client Secret are correct
- Make sure there are no extra spaces in your .env.local file

### Session Not Persisting
- Clear your browser cookies and try again
- Verify NEXTAUTH_SECRET is set and is a long random string

## Security Notes

- **Never commit `.env.local` to version control**
- The `.env.local` file is already in `.gitignore`
- Keep your Client Secret secure and never share it publicly
- Rotate your secrets regularly in production

## Additional Resources

- [Discord OAuth2 Documentation](https://discord.com/developers/docs/topics/oauth2)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Discord Developer Portal](https://discord.com/developers/applications)
