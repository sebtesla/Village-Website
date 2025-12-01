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

    // If no settings exist, return defaults
    if (!settings) {
      return NextResponse.json({
        introVideoEnabled: true,
        introVideoUrl: '/intro-video.mp4',
        introVideoSkipSeconds: 5,
        siteName: 'The Village',
        maintenanceMode: false,
      })
    }

    // Return only public-safe fields
    return NextResponse.json({
      introVideoEnabled: settings.introVideoEnabled,
      introVideoUrl: settings.introVideoUrl,
      introVideoSkipSeconds: settings.introVideoSkipSeconds,
      siteName: settings.siteName,
      maintenanceMode: settings.maintenanceMode,
      maintenanceMessage: settings.maintenanceMessage,
    })
  } catch (error: unknown) {
    console.error('Failed to fetch site settings:', error)
    // Return defaults on error
    return NextResponse.json({
      introVideoEnabled: true,
      introVideoUrl: '/intro-video.mp4',
      introVideoSkipSeconds: 5,
      siteName: 'The Village',
      maintenanceMode: false,
    })
  }
}
