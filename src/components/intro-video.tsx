"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { X, Volume2, VolumeX, Play } from "lucide-react"

interface SiteSettings {
  introVideoEnabled: boolean
  introVideoUrl: string | null
  introVideoSkipSeconds: number
}

interface IntroVideoProps {
  onComplete?: () => void
}

export function IntroVideo({
  onComplete,
}: IntroVideoProps) {
  const [showVideo, setShowVideo] = useState(false)
  const [canSkip, setCanSkip] = useState(false)
  const [secondsRemaining, setSecondsRemaining] = useState(5)
  const [isMuted, setIsMuted] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleClose = useCallback(() => {
    setShowVideo(false)
    sessionStorage.setItem('intro-video-watched', 'true')
    if (onComplete) {
      onComplete()
    }
  }, [onComplete])

  // Fetch site settings
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/site-settings')
        if (response.ok) {
          const data = await response.json()
          setSettings(data)
          setSecondsRemaining(data.introVideoSkipSeconds || 5)
        }
      } catch (error) {
        console.error('Failed to fetch site settings:', error)
        // Use defaults on error
        setSettings({
          introVideoEnabled: true,
          introVideoUrl: '/intro-video.mp4',
          introVideoSkipSeconds: 5,
        })
      }
    }
    fetchSettings()
  }, [])

  useEffect(() => {
    // Wait for settings to load
    if (!settings) return

    // Check if intro video is enabled
    if (!settings.introVideoEnabled) {
      return
    }

    // Check if user has already watched the intro video this session
    const alreadyWatched = sessionStorage.getItem('intro-video-watched')
    if (alreadyWatched === 'true') {
      return
    }

    // Show the video after a brief delay
    const showTimeout = setTimeout(() => {
      setShowVideo(true)
    }, 500)

    return () => clearTimeout(showTimeout)
  }, [settings])

  useEffect(() => {
    if (!showVideo) return

    // Countdown timer for skip button
    const countdownInterval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          setCanSkip(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(countdownInterval)
  }, [showVideo])

  const handleVideoEnd = () => {
    handleClose()
  }

  const handleVideoError = () => {
    setHasError(true)
    // Auto-close on error after a short delay
    setTimeout(() => {
      handleClose()
    }, 1000)
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  if (!showVideo) return null

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
      {/* Video Container */}
      <div className="relative w-full h-full flex items-center justify-center">
        {hasError ? (
          <div className="text-white text-center p-8">
            <p className="text-lg mb-4">Unable to load video</p>
            <Button onClick={handleClose} variant="outline" className="text-white border-white hover:bg-white/20">
              Continue to Site
            </Button>
          </div>
        ) : (
          <>
            {/* Video Element */}
            <video
              ref={videoRef}
              autoPlay
              muted={isMuted}
              playsInline
              onEnded={handleVideoEnd}
              onError={handleVideoError}
              className="max-w-full max-h-full w-auto h-auto object-contain"
            >
              <source src={settings?.introVideoUrl || '/intro-video.mp4'} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Controls Overlay */}
            <div className="absolute top-4 right-4 flex items-center gap-3">
              {/* Mute/Unmute Button */}
              <Button
                onClick={toggleMute}
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 rounded-full"
              >
                {isMuted ? (
                  <VolumeX className="h-6 w-6" />
                ) : (
                  <Volume2 className="h-6 w-6" />
                )}
              </Button>

              {/* Skip Button */}
              {canSkip ? (
                <Button
                  onClick={handleClose}
                  variant="outline"
                  className="text-white border-white hover:bg-white/20 gap-2"
                >
                  <X className="h-4 w-4" />
                  Skip
                </Button>
              ) : (
                <div className="text-white text-sm bg-black/50 px-4 py-2 rounded-md">
                  Skip in {secondsRemaining}s
                </div>
              )}
            </div>

            {/* Play Indicator (appears on pause) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="opacity-0 hover:opacity-100 transition-opacity">
                <Play className="h-16 w-16 text-white/80" />
              </div>
            </div>

            {/* Brand Watermark */}
            <div className="absolute bottom-4 left-4 text-white/60 text-sm">
              The Village
            </div>
          </>
        )}
      </div>
    </div>
  )
}
