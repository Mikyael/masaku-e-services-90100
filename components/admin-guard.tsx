"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/context/auth-context"

interface AdminGuardProps {
  children: React.ReactNode
}

export function AdminGuard({ children }: AdminGuardProps) {
  const { user, profile, loading } = useAuth()
  const router = useRouter()

  const isAdmin = profile?.role === "admin" || profile?.role === "super_admin"

  useEffect(() => {
    if (!loading && !user) {
      // User is not authenticated, redirect to admin login
      router.push("/admin/login")
    } else if (!loading && user && !isAdmin) {
      // User is authenticated but not an admin, redirect to main dashboard
      router.push("/dashboard")
    }
  }, [user, profile, loading, router, isAdmin])

  if (loading) {
    // Loading state
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Verifying admin access...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    // Not authenticated - show admin login prompt
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <Card className="max-w-md w-full border-red-200">
          <CardHeader className="text-center">
            <div className="mx-auto h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-red-600" />
            </div>
            <CardTitle className="text-2xl text-red-600">Admin Access Required</CardTitle>
            <CardDescription>You need to be logged in as an administrator to access this area</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-4">
              <p className="text-gray-600">Please log in with your administrator credentials to continue.</p>
              <div className="flex flex-col space-y-3">
                <Button asChild className="w-full bg-red-600 hover:bg-red-700">
                  <Link href="/admin/login">Admin Login</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/">Return to Home</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!isAdmin) {
    // User is authenticated but not an admin
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <Card className="max-w-md w-full border-red-200">
          <CardHeader className="text-center">
            <div className="mx-auto h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <CardTitle className="text-2xl text-red-600">Access Denied</CardTitle>
            <CardDescription>You do not have administrator privileges to access this area</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-4">
              <p className="text-gray-600">
                This area is restricted to administrators only. If you believe you should have access, please contact
                your system administrator.
              </p>
              <div className="flex flex-col space-y-3">
                <Button asChild className="w-full">
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/">Return to Home</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // User is authenticated and is an admin - show the protected content
  return <>{children}</>
}
