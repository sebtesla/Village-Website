import NextAuth, { NextAuthOptions } from "next-auth"
import DiscordProvider from "next-auth/providers/discord"
import { prisma } from "@/lib/prisma"

// Normalize NEXTAUTH_URL by removing trailing slash if present
const nextAuthUrl = process.env.NEXTAUTH_URL?.replace(/\/$/, "") || ""

export const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID || "",
      clientSecret: process.env.DISCORD_CLIENT_SECRET || "",
      authorization: {
        params: {
          scope: "identify email guilds",
        },
      },
    }),
  ],
  // Enable debug mode in development to help diagnose OAuth issues
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!account || !profile) return true

      try {
        // Check if user exists
        const existingUser = await prisma.user.findUnique({
          where: { discordId: profile.id as string },
        })

        if (!existingUser) {
          // Create new user in database
          await prisma.user.create({
            data: {
              discordId: profile.id as string,
              email: user.email || null,
              name: user.name || (profile as any).username || null,
              image: user.image || null,
            },
          })
          console.log(`New user created: ${(profile as any).username}`)
        } else {
          // Update existing user
          await prisma.user.update({
            where: { discordId: profile.id as string },
            data: {
              email: user.email || existingUser.email,
              name: user.name || existingUser.name,
              image: user.image || existingUser.image,
            },
          })
          console.log(`User updated: ${(profile as any).username}`)
        }

        return true
      } catch (error) {
        console.error('Error saving user to database:', error)
        // Allow login even if database save fails
        return true
      }
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.accessToken = account.access_token
        token.discordId = profile.id
        token.discordTag = (profile as any).username
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).discordId = token.discordId
        (session.user as any).discordTag = token.discordTag
      }
      return session
    },
  },
  pages: {
    signIn: "/",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
