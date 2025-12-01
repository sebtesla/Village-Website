"use client"

import { useState } from "react"
import { Header } from "@/components/header"

export default function MapPage() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-[#0d4a4a] to-[#0a3d3d]">
      <Header />

      <div className="flex-1 relative">
        {/* Loading indicator - shown while iframe loads */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="text-center text-white">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
              <p className="text-xl">Loading map...</p>
            </div>
          </div>
        )}

        {/* Embedded map iframe */}
        <iframe
          src="https://rustcult-com.onrender.com/"
          title="The Village Map"
          className="w-full h-full border-0 absolute inset-0"
          onLoad={() => setIsLoading(false)}
          allow="geolocation; fullscreen"
        />
      </div>
    </div>
  )
}
