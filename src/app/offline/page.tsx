"use client"

import { WifiOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
          <WifiOff className="h-12 w-12 text-gray-400" />
        </div>

        <h1 className="text-3xl font-bold mb-4 text-gray-900">You're Offline</h1>

        <p className="text-gray-600 mb-8">
          It looks like you're not connected to the internet. Some features may not be available right now.
        </p>

        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Previously visited pages are available offline.
          </p>

          <Button
            onClick={() => window.location.reload()}
            className="w-full"
          >
            Try Again
          </Button>

          <Link href="/">
            <Button variant="outline" className="w-full">
              Go to Home
            </Button>
          </Link>
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-900">
            <strong>Tip:</strong> Make sure you're connected to Wi-Fi or mobile data, then tap "Try Again"
          </p>
        </div>
      </div>
    </div>
  )
}
