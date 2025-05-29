"use client"
import { useState, useEffect } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Clock, CheckCircle, XCircle, Download, Eye, Bell, Settings, LogOut } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/context/auth-context"
import { useSupabase } from "@/hooks/use-supabase"

interface Application {
  id: string
  reference_number: string
  service_name: string
  status: "pending" | "processing" | "approved" | "rejected"
  submitted_date: string
  last_updated: string
  fee_amount: number | null
  admin_notes: string | null
}

export default function DashboardPage() {
  const { user, profile, signOut } = useAuth()
  const { supabase } = useSupabase()
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch user's applications
  const fetchApplications = async () => {
    if (!user) return

    setLoading(true)
    try {
      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .eq("user_id", user.id)
        .order("submitted_date", { ascending: false })

      if (error) {
        console.error("Error fetching applications:", error)
      } else {
        setApplications(data || [])
      }
    } catch (err) {
      console.error("Error:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      fetchApplications()
    }
  }, [user])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      case "pending":
        return "bg-blue-100 text-blue-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "processing":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const handleLogout = () => {
    signOut()
  }

  // Get user's display name
  const getUserDisplayName = () => {
    if (profile?.full_name) {
      return profile.full_name
    }
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name
    }
    if (user?.email) {
      return user.email.split("@")[0]
    }
    return "User"
  }

  // Calculate stats from real applications
  const stats = {
    total: applications.length,
    approved: applications.filter((app) => app.status === "approved").length,
    processing: applications.filter((app) => app.status === "processing").length,
    pending: applications.filter((app) => app.status === "pending").length,
    rejected: applications.filter((app) => app.status === "rejected").length,
  }

  return (
    <AuthGuard>
      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">Welcome back, {getUserDisplayName()}</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Processing</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.processing}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.pending}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList>
            <TabsTrigger value="applications">My Applications</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="services">Quick Services</TabsTrigger>
          </TabsList>

          <TabsContent value="applications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Applications</CardTitle>
                <CardDescription>Track the status of your service applications</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-2 text-gray-600">Loading your applications...</p>
                  </div>
                ) : applications.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Applications Yet</h3>
                    <p className="text-gray-600 mb-4">You haven't submitted any applications yet.</p>
                    <Button asChild>
                      <Link href="/services">Browse Services</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {applications.map((application) => (
                      <div key={application.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          {getStatusIcon(application.status)}
                          <div>
                            <h3 className="font-medium">{application.service_name}</h3>
                            <p className="text-sm text-gray-500">Reference: {application.reference_number}</p>
                            <p className="text-sm text-gray-500">
                              Submitted: {new Date(application.submitted_date).toLocaleDateString()}
                            </p>
                            {application.admin_notes && (
                              <p className="text-sm text-gray-600 mt-1">
                                <strong>Note:</strong> {application.admin_notes}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Badge className={getStatusColor(application.status)}>
                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                          </Badge>
                          <div className="text-right">
                            <p className="text-sm font-medium">
                              {application.fee_amount ? `KES ${application.fee_amount}` : "Free"}
                            </p>
                            <p className="text-xs text-gray-500">
                              Updated: {new Date(application.last_updated).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            {application.status === "approved" && (
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Manage your account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Full Name</label>
                    <p className="text-gray-900">
                      {profile?.full_name || user?.user_metadata?.full_name || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email Address</label>
                    <p className="text-gray-900">{user?.email || "Not provided"}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Phone Number</label>
                    <p className="text-gray-900">{profile?.phone_number || "Not provided"}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">ID Number</label>
                    <p className="text-gray-900">{profile?.id_number || "Not provided"}</p>
                  </div>
                </div>
                <Button className="mt-4">
                  <Settings className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <Link href="/services/business/permit">
                  <CardHeader>
                    <CardTitle className="text-lg">Business Permit</CardTitle>
                    <CardDescription>Apply for a new business permit</CardDescription>
                  </CardHeader>
                </Link>
              </Card>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <Link href="/services/health/certificate">
                  <CardHeader>
                    <CardTitle className="text-lg">Health Certificate</CardTitle>
                    <CardDescription>Get your health certificate</CardDescription>
                  </CardHeader>
                </Link>
              </Card>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <Link href="/services/land/search">
                  <CardHeader>
                    <CardTitle className="text-lg">Land Search</CardTitle>
                    <CardDescription>Search land records</CardDescription>
                  </CardHeader>
                </Link>
              </Card>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <Link href="/services">
                  <CardHeader>
                    <CardTitle className="text-lg">View All Services</CardTitle>
                    <CardDescription>Browse all available services</CardDescription>
                  </CardHeader>
                </Link>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AuthGuard>
  )
}
