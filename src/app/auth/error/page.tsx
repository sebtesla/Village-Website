"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertCircle, ArrowLeft, RefreshCw } from "lucide-react"
import { signIn } from "next-auth/react"
import { Suspense } from "react"

const errorMessages: Record<string, string> = {
  Configuration: "There is a problem with the server configuration. Please contact support.",
  AccessDenied: "You do not have permission to sign in. Access was denied.",
  Verification: "The verification link has expired or has already been used.",
  OAuthSignin: "Could not start the Discord sign in process. Please try again.",
  OAuthCallback: "Could not complete the Discord sign in. Please try again.",
  OAuthCreateAccount: "Could not create your account. Please try again.",
  EmailCreateAccount: "Could not create your account with that email.",
  Callback: "There was an error during the authentication callback.",
  OAuthAccountNotLinked: "This email is already associated with another account.",
  SessionRequired: "Please sign in to access this page.",
  Default: "An unexpected error occurred during sign in. Please try again.",
}

function AuthErrorContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  const errorMessage = error
    ? (errorMessages[error] || errorMessages.Default)
    : errorMessages.Default

  const handleRetry = () => {
    signIn("discord", { callbackUrl: "/" })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Authentication Error
          </h1>

          <p className="text-gray-600 mb-6">
            {errorMessage}
          </p>

          {error && (
            <p className="text-sm text-gray-400 mb-6">
              Error code: {error}
            </p>
          )}

          <div className="space-y-3">
            <Button
              onClick={handleRetry}
              className="w-full h-12 bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              Try Again with Discord
            </Button>

            <Link href="/" className="block">
              <Button variant="outline" className="w-full h-12 gap-2">
                <ArrowLeft className="w-5 h-5" />
                Back to Home
              </Button>
            </Link>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              If this problem persists, please make sure:
            </p>
            <ul className="text-sm text-gray-500 mt-2 text-left list-disc list-inside space-y-1">
              <li>You have a Discord account</li>
              <li>Pop-ups are not blocked</li>
              <li>You authorized the app on Discord</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500">Loading...</div>
      </div>
    }>
      <AuthErrorContent />
    </Suspense>
  )
}
