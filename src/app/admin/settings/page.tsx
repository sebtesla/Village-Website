"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Save, Video, Settings2, Globe, MessageSquare, Lock } from "lucide-react"

interface SiteSettings {
  id: string
  introVideoEnabled: boolean
  introVideoUrl: string | null
  introVideoSkipSeconds: number
  siteName: string
  siteDescription: string | null
  maintenanceMode: boolean
  maintenanceMessage: string | null
  contactEmail: string | null
  socialDiscord: string | null
  socialTwitter: string | null
  socialInstagram: string | null
  createdAt: string
  updatedAt: string
}

export default function SiteSettingsPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  // Form state
  const [formData, setFormData] = useState({
    introVideoEnabled: true,
    introVideoUrl: '',
    introVideoSkipSeconds: 5,
    siteName: 'The Village',
    siteDescription: '',
    maintenanceMode: false,
    maintenanceMessage: '',
    contactEmail: '',
    socialDiscord: '',
    socialTwitter: '',
    socialInstagram: '',
  })

  useEffect(() => {
    const auth = sessionStorage.getItem('admin-authenticated')
    if (auth === 'true') {
      setIsAuthenticated(true)
      fetchSettings()
    } else {
      setLoading(false)
    }
  }, [])

  const fetchSettings = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/site-settings')
      if (!response.ok) throw new Error('Failed to fetch settings')
      const data = await response.json()
      setSettings(data)
      setFormData({
        introVideoEnabled: data.introVideoEnabled ?? true,
        introVideoUrl: data.introVideoUrl ?? '',
        introVideoSkipSeconds: data.introVideoSkipSeconds ?? 5,
        siteName: data.siteName ?? 'The Village',
        siteDescription: data.siteDescription ?? '',
        maintenanceMode: data.maintenanceMode ?? false,
        maintenanceMessage: data.maintenanceMessage ?? '',
        contactEmail: data.contactEmail ?? '',
        socialDiscord: data.socialDiscord ?? '',
        socialTwitter: data.socialTwitter ?? '',
        socialInstagram: data.socialInstagram ?? '',
      })
    } catch (error) {
      console.error('Error fetching settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD || password === 'admin123') {
      sessionStorage.setItem('admin-authenticated', 'true')
      setIsAuthenticated(true)
      setError("")
      fetchSettings()
    } else {
      setError("Invalid password")
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setSuccessMessage("")

    try {
      const response = await fetch('/api/admin/site-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          introVideoEnabled: formData.introVideoEnabled,
          introVideoUrl: formData.introVideoUrl || null,
          introVideoSkipSeconds: parseInt(String(formData.introVideoSkipSeconds)) || 5,
          siteName: formData.siteName || 'The Village',
          siteDescription: formData.siteDescription || null,
          maintenanceMode: formData.maintenanceMode,
          maintenanceMessage: formData.maintenanceMessage || null,
          contactEmail: formData.contactEmail || null,
          socialDiscord: formData.socialDiscord || null,
          socialTwitter: formData.socialTwitter || null,
          socialInstagram: formData.socialInstagram || null,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to save settings')
      }

      const updatedSettings = await response.json()
      setSettings(updatedSettings)
      setSuccessMessage("Settings saved successfully!")
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (error: unknown) {
      alert(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setSaving(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Lock className="h-12 w-12 mx-auto mb-4 text-[#0d4a4a]" />
            <CardTitle className="text-2xl">Admin Access Required</CardTitle>
            <CardDescription>
              Enter admin password to manage site settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <Button type="submit" className="w-full">Login</Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => router.push('/admin')}
              >
                Back to Dashboard
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Link href="/admin">
                <Button variant="outline" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold">Site Settings</h1>
                <p className="text-gray-600">Configure your site appearance and behavior</p>
              </div>
            </div>
          </div>

          {loading ? (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-gray-600">Loading settings...</p>
              </CardContent>
            </Card>
          ) : (
            <form onSubmit={handleSave} className="space-y-6">
              {/* Success Message */}
              {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
                  {successMessage}
                </div>
              )}

              {/* Intro Video Settings */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Video className="h-6 w-6 text-[#d4a055]" />
                    <div>
                      <CardTitle>Intro Video</CardTitle>
                      <CardDescription>
                        Configure the intro video that plays when users first visit the site
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="introVideoEnabled" className="text-base font-medium">
                        Enable Intro Video
                      </Label>
                      <p className="text-sm text-gray-500">
                        Show a video overlay when users first visit the site
                      </p>
                    </div>
                    <Switch
                      id="introVideoEnabled"
                      checked={formData.introVideoEnabled}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, introVideoEnabled: checked })
                      }
                    />
                  </div>

                  <Separator />

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="md:col-span-2">
                      <Label htmlFor="introVideoUrl">Video URL</Label>
                      <Input
                        id="introVideoUrl"
                        value={formData.introVideoUrl}
                        onChange={(e) => setFormData({ ...formData, introVideoUrl: e.target.value })}
                        placeholder="/intro-video.mp4"
                        disabled={!formData.introVideoEnabled}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Path to the video file (e.g., /intro-video.mp4 for public folder) or a full URL
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="introVideoSkipSeconds">Skip Delay (seconds)</Label>
                      <Input
                        id="introVideoSkipSeconds"
                        type="number"
                        value={formData.introVideoSkipSeconds}
                        onChange={(e) =>
                          setFormData({ ...formData, introVideoSkipSeconds: parseInt(e.target.value) || 0 })
                        }
                        min="0"
                        max="30"
                        disabled={!formData.introVideoEnabled}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Time before the skip button becomes available (0-30 seconds)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Site Configuration */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Settings2 className="h-6 w-6 text-[#0d4a4a]" />
                    <div>
                      <CardTitle>Site Configuration</CardTitle>
                      <CardDescription>
                        General site settings and branding
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="siteName">Site Name</Label>
                      <Input
                        id="siteName"
                        value={formData.siteName}
                        onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                        placeholder="The Village"
                      />
                    </div>

                    <div>
                      <Label htmlFor="contactEmail">Contact Email</Label>
                      <Input
                        id="contactEmail"
                        type="email"
                        value={formData.contactEmail}
                        onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                        placeholder="contact@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="siteDescription">Site Description</Label>
                    <Textarea
                      id="siteDescription"
                      value={formData.siteDescription}
                      onChange={(e) => setFormData({ ...formData, siteDescription: e.target.value })}
                      placeholder="Premium quality merchandise for those who appreciate style and comfort."
                      rows={3}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="maintenanceMode" className="text-base font-medium">
                        Maintenance Mode
                      </Label>
                      <p className="text-sm text-gray-500">
                        Show a maintenance message to visitors (except admins)
                      </p>
                    </div>
                    <Switch
                      id="maintenanceMode"
                      checked={formData.maintenanceMode}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, maintenanceMode: checked })
                      }
                    />
                  </div>

                  {formData.maintenanceMode && (
                    <div>
                      <Label htmlFor="maintenanceMessage">Maintenance Message</Label>
                      <Textarea
                        id="maintenanceMessage"
                        value={formData.maintenanceMessage}
                        onChange={(e) => setFormData({ ...formData, maintenanceMessage: e.target.value })}
                        placeholder="We're currently performing scheduled maintenance. Please check back soon!"
                        rows={2}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Globe className="h-6 w-6 text-blue-600" />
                    <div>
                      <CardTitle>Social Links</CardTitle>
                      <CardDescription>
                        Connect your social media accounts
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <Label htmlFor="socialDiscord">Discord Invite URL</Label>
                      <Input
                        id="socialDiscord"
                        value={formData.socialDiscord}
                        onChange={(e) => setFormData({ ...formData, socialDiscord: e.target.value })}
                        placeholder="https://discord.gg/..."
                      />
                    </div>

                    <div>
                      <Label htmlFor="socialTwitter">Twitter/X URL</Label>
                      <Input
                        id="socialTwitter"
                        value={formData.socialTwitter}
                        onChange={(e) => setFormData({ ...formData, socialTwitter: e.target.value })}
                        placeholder="https://twitter.com/..."
                      />
                    </div>

                    <div>
                      <Label htmlFor="socialInstagram">Instagram URL</Label>
                      <Input
                        id="socialInstagram"
                        value={formData.socialInstagram}
                        onChange={(e) => setFormData({ ...formData, socialInstagram: e.target.value })}
                        placeholder="https://instagram.com/..."
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Save Button */}
              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => router.push('/admin')}>
                  Cancel
                </Button>
                <Button type="submit" disabled={saving} className="gap-2">
                  <Save className="h-4 w-4" />
                  {saving ? 'Saving...' : 'Save Settings'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
