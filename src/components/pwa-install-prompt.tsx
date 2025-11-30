"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Download, X } from "lucide-react"

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

// Extend Window interface for MSStream
interface WindowWithMSStream extends Window {
  MSStream?: unknown
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isIOS, setIsIOS] = useState(false)

  useEffect(() => {
    // Check if running in standalone mode
    const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as WindowWithMSStream).MSStream
    setIsIOS(isIOSDevice)

    // Check if user has previously dismissed the prompt
    const dismissed = localStorage.getItem('pwa-install-dismissed')
    if (dismissed) {
      const dismissedTime = parseInt(dismissed)
      const daysSinceDismissed = (Date.now() - dismissedTime) / (1000 * 60 * 60 * 24)
      if (daysSinceDismissed < 7) {
        // Don't show again for 7 days
        return
      }
    }

    // Listen for beforeinstallprompt event
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)

      // Show prompt after a delay (5 seconds)
      setTimeout(() => {
        setShowPrompt(true)
      }, 5000)
    }

    window.addEventListener('beforeinstallprompt', handler)

    // For iOS, show prompt if not in standalone mode
    if (isIOSDevice && !isInStandaloneMode) {
      setTimeout(() => {
        setShowPrompt(true)
      }, 5000)
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === 'accepted') {
      setDeferredPrompt(null)
      setShowPrompt(false)
    }
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    localStorage.setItem('pwa-install-dismissed', Date.now().toString())
  }

  if (!showPrompt) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm">
      <Card className="bg-white shadow-lg border-2 border-[#d4a055]">
        <div className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#0d4a4a] rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xl">TV</span>
              </div>
              <div>
                <h3 className="font-bold text-sm">Install The Village App</h3>
                <p className="text-xs text-gray-600">Get easy access on your device</p>
              </div>
            </div>
            <button
              onClick={handleDismiss}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {isIOS ? (
            <div className="space-y-3">
              <p className="text-xs text-gray-600">
                To install this app on your iPhone/iPad:
              </p>
              <ol className="text-xs text-gray-600 space-y-2 list-decimal list-inside">
                <li>Tap the Share button <span className="inline-block">📤</span></li>
                <li>Scroll down and tap "Add to Home Screen"</li>
                <li>Tap "Add" in the top right corner</li>
              </ol>
              <Button
                onClick={handleDismiss}
                variant="outline"
                className="w-full"
                size="sm"
              >
                Got it!
              </Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button
                onClick={handleInstall}
                className="flex-1 gap-2"
                size="sm"
              >
                <Download className="h-4 w-4" />
                Install App
              </Button>
              <Button
                onClick={handleDismiss}
                variant="outline"
                size="sm"
              >
                Not Now
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
