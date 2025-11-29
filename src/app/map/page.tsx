"use client"

import { useEffect } from "react"

export default function MapPage() {
  useEffect(() => {
    // Redirect to the external map URL
    window.location.href = "https://rustcult-com.onrender.com/"
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#0d4a4a] to-[#0a3d3d]">
      <div className="text-center text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-xl">Redirecting to map...</p>
      </div>
    </div>
  )
}
