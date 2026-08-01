import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function MapPage() {
  return (
    <div className="min-h-screen flex flex-col dark-page-bg">
      <Header />

      <main className="flex-1 bg-gradient-to-r from-[#0d4a4a] to-[#0a3d3d]">
        {/* Map Header */}
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-white mb-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">FIND US ON THE MAP</h1>
            <p className="text-lg opacity-90">Explore The Rust Village locations and community</p>
          </div>
        </div>

        {/* Embedded Map */}
        <div className="w-full flex-1" style={{ minHeight: 'calc(100vh - 300px)' }}>
          <iframe
            src="https://rustcult-com.onrender.com/"
            title="The Rust Village Map"
            className="w-full h-full border-0"
            style={{ minHeight: 'calc(100vh - 300px)' }}
            allow="geolocation"
          />
        </div>
      </main>

      <Footer />
    </div>
  )
}
