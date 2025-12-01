import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Default settings ID - we use a singleton pattern for site settings
const DEFAULT_SETTINGS_ID = 'default'

export async function GET() {
  try {
    // Try to get existing settings
    let settings = await prisma.siteSettings.findUnique({
      where: { id: DEFAULT_SETTINGS_ID },
    })

    // If no settings exist, create default settings
    if (!settings) {
      settings = await prisma.siteSettings.create({
        data: {
          id: DEFAULT_SETTINGS_ID,
          introVideoEnabled: true,
          introVideoUrl: '/intro-video.mp4',
          introVideoSkipSeconds: 5,
          siteName: 'The Village',
          siteDescription: 'Premium quality merchandise for those who appreciate style and comfort.',
          maintenanceMode: false,
          maintenanceMessage: null,
          contactEmail: null,
          socialDiscord: null,
          socialTwitter: null,
          socialInstagram: null,
        },
      })
    }

    return NextResponse.json(settings)
  } catch (error: unknown) {
    console.error('Failed to fetch site settings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch site settings' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()

    const {
      introVideoEnabled,
      introVideoUrl,
      introVideoSkipSeconds,
      siteName,
      siteDescription,
      maintenanceMode,
      maintenanceMessage,
      contactEmail,
      socialDiscord,
      socialTwitter,
      socialInstagram,
    } = body

    // Validate skip seconds if provided
    if (introVideoSkipSeconds !== undefined && (introVideoSkipSeconds < 0 || introVideoSkipSeconds > 30)) {
      return NextResponse.json(
        { error: 'Skip seconds must be between 0 and 30' },
        { status: 400 }
      )
    }

    // Upsert settings (create if not exists, update if exists)
    const settings = await prisma.siteSettings.upsert({
      where: { id: DEFAULT_SETTINGS_ID },
      update: {
        introVideoEnabled: introVideoEnabled ?? undefined,
        introVideoUrl: introVideoUrl !== undefined ? introVideoUrl : undefined,
        introVideoSkipSeconds: introVideoSkipSeconds ?? undefined,
        siteName: siteName ?? undefined,
        siteDescription: siteDescription !== undefined ? siteDescription : undefined,
        maintenanceMode: maintenanceMode ?? undefined,
        maintenanceMessage: maintenanceMessage !== undefined ? maintenanceMessage : undefined,
        contactEmail: contactEmail !== undefined ? contactEmail : undefined,
        socialDiscord: socialDiscord !== undefined ? socialDiscord : undefined,
        socialTwitter: socialTwitter !== undefined ? socialTwitter : undefined,
        socialInstagram: socialInstagram !== undefined ? socialInstagram : undefined,
      },
      create: {
        id: DEFAULT_SETTINGS_ID,
        introVideoEnabled: introVideoEnabled ?? true,
        introVideoUrl: introVideoUrl ?? '/intro-video.mp4',
        introVideoSkipSeconds: introVideoSkipSeconds ?? 5,
        siteName: siteName ?? 'The Village',
        siteDescription: siteDescription ?? null,
        maintenanceMode: maintenanceMode ?? false,
        maintenanceMessage: maintenanceMessage ?? null,
        contactEmail: contactEmail ?? null,
        socialDiscord: socialDiscord ?? null,
        socialTwitter: socialTwitter ?? null,
        socialInstagram: socialInstagram ?? null,
      },
    })

    return NextResponse.json(settings)
  } catch (error: unknown) {
    console.error('Failed to update site settings:', error)
    return NextResponse.json(
      { error: 'Failed to update site settings' },
      { status: 500 }
    )
  }
}
