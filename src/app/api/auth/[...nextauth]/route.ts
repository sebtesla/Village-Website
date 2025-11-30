import { AuthOptions } from "next-auth"
import { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth/next"
import DiscordProvider from "next-auth/providers/discord"
import { prisma } from "@/lib/prisma"

interface DiscordProfile {
  id: string
  username: string
  email?: string | null
  image?: string | null
}

interface ExtendedUser {
  discordId?: string
  discordTag?: string
  email?: string | null
  name?: string | null
  image?: string | null
}

export const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        const discordProfile = profile as DiscordProfile
        
        // Check if user exists
        const existingUser = await prisma.user.findUnique({
          where: { discordId: profile.id as string },
        })

        if (!existingUser) {
          // Create new user
          await prisma.user.create({
            data: {
              discordId: profile.id as string,
              email: user.email || null,
              name: user.name || discordProfile.username || null,
              image: user.image || null,
            },
          })
          console.log(`New user created: ${discordProfile.username}`)
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
          console.log(`User updated: ${discordProfile.username}`)
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
        const discordProfile = profile as DiscordProfile
        token.accessToken = account.access_token
        token.discordId = profile.id
        token.discordTag = discordProfile.username
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        const extendedUser = session.user as ExtendedUser
        extendedUser.discordId = token.discordId as string
        extendedUser.discordTag = token.discordTag as string
      }
      return session
    },
  },
  pages: {
    signIn: "/",
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
