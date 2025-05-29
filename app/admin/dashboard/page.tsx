"use client"

import { useState, useEffect } from "react"
import { AdminGuard } from "@/components/admin-guard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FileText, Clock, CheckCircle, XCircle, Edit, Search, Shield, LogOut } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { useSupabase } from "@/hooks/use-supabase"

interface Application {
  id: string
  user_id: string
  reference_number: string
  service_type: string
  service_name: string
  status: "pending" | "processing" | "approved" | "rejected"
  form_data: any
  fee_amount: number | null
  fee_status: "unpaid" | "paid" | null
  submitted_date: string
  last_updated: string
  notes: string | null
  admin_notes: string | null
  processed_by: string | null
  user?: {
    full_name: string
    email: string
    phone_number: string
  }
}

export default function AdminDashboardPage() {
  const { profile, signOut } = useAuth()
  const { supabase } = useSupabase()
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [adminNotes, setAdminNotes] = useState("")
  const [newStatus, setNewStatus] = useState("")

  // Fetch all applications
  const fetchApplications = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from("applications")
        .select(
          `
          *,
          users!applications_user_id_fkey (
            full_name,
            email,
            phone_number
          )
        `,
        )
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
    fetchApplications()
  }, [])

  // Filter applications
  const filteredApplications = applications.filter((app) => {
    const matchesStatus = statusFilter === "all" || app.status === statusFilter
    const matchesSearch =
      app.reference_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.service_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.user?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.user?.email?.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesStatus && matchesSearch
  })

  // Update application status
  const updateApplicationStatus = async (applicationId: string, status: string, notes: string) => {
    try {
      const { error } = await supabase
        .from("applications")
        .update({
          status,
          admin_notes: notes,
          processed_by: profile?.id,
          last_updated: new Date().toISOString(),
        })
        .eq("id", applicationId)

      if (error) {
        console.error("Error updating application:", error)
        alert("Error updating application status")
        return
      }

      // Send email notification to user
      if (selectedApplication?.user?.email) {
        try {
          await fetch("/api/send-notification", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              applicationId,
              status,
              userEmail: selectedApplication.user.email,
              userName: selectedApplication.user.full_name,
              serviceName: selectedApplication.service_name,
              referenceNumber: selectedApplication.reference_number,
              adminNotes: notes,
            }),
          })
        } catch (emailError) {
          console.error("Error sending email notification:", emailError)
          // Don't fail the update if email fails
        }
      }

      alert("Application status updated successfully and notification sent")
      fetchApplications()
      setSelectedApplication(null)
      setAdminNotes("")
      setNewStatus("")
    } catch (err) {
      console.error("Error:", err)
      alert("An error occurred while updating the application")
    }
  }

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

  const stats = {
    total: applications.length,
    pending: applications.filter((app) => app.status === "pending").length,
    processing: applications.filter((app) => app.status === "processing").length,
    approved: applications.filter((app) => app.status === "approved").length,
    rejected: applications.filter((app) => app.status === "rejected").length,
  }

  return (
    <AdminGuard>
      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
              <Shield className="h-8 w-8 mr-3 text-red-600" />
              Admin Dashboard
            </h1>
            <p className="text-gray-600">Welcome back, {profile?.full_name}</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Button variant="outline" size="sm" onClick={() => fetchApplications()}>
              Refresh Data
            </Button>
            <Button variant="outline" size="sm" onClick={signOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
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
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.pending}</div>
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
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rejected</CardTitle>
              <XCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filter Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="search">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="search"
                    placeholder="Search by reference, service, name, or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="status-filter">Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Applications List */}
        <Card>
          <CardHeader>
            <CardTitle>Applications ({filteredApplications.length})</CardTitle>
            <CardDescription>Manage and review citizen service applications</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading applications...</p>
              </div>
            ) : filteredApplications.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No applications found matching your criteria.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredApplications.map((application) => (
                  <div key={application.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(application.status)}
                      <div>
                        <h3 className="font-medium">{application.service_name}</h3>
                        <p className="text-sm text-gray-500">Ref: {application.reference_number}</p>
                        <p className="text-sm text-gray-500">
                          Applicant: {application.user?.full_name} ({application.user?.email})
                        </p>
                        <p className="text-sm text-gray-500">Submitted: {application.submitted_date}</p>
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
                        <p className="text-xs text-gray-500">Updated: {application.last_updated}</p>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedApplication(application)
                              setAdminNotes(application.admin_notes || "")
                              setNewStatus(application.status)
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Review Application</DialogTitle>
                            <DialogDescription>Review and update the status of this application</DialogDescription>
                          </DialogHeader>
                          {selectedApplication && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>Reference Number</Label>
                                  <p className="text-sm font-mono">{selectedApplication.reference_number}</p>
                                </div>
                                <div>
                                  <Label>Service</Label>
                                  <p className="text-sm">{selectedApplication.service_name}</p>
                                </div>
                                <div>
                                  <Label>Applicant</Label>
                                  <p className="text-sm">{selectedApplication.user?.full_name}</p>
                                </div>
                                <div>
                                  <Label>Email</Label>
                                  <p className="text-sm">{selectedApplication.user?.email}</p>
                                </div>
                                <div>
                                  <Label>Phone</Label>
                                  <p className="text-sm">{selectedApplication.user?.phone_number}</p>
                                </div>
                                <div>
                                  <Label>Fee Amount</Label>
                                  <p className="text-sm">
                                    {selectedApplication.fee_amount ? `KES ${selectedApplication.fee_amount}` : "Free"}
                                  </p>
                                </div>
                              </div>

                              <div>
                                <Label>Application Data</Label>
                                <div className="bg-gray-50 p-3 rounded text-sm max-h-40 overflow-y-auto">
                                  <pre>{JSON.stringify(selectedApplication.form_data, null, 2)}</pre>
                                </div>
                              </div>

                              <div>
                                <Label htmlFor="new-status">Update Status</Label>
                                <Select value={newStatus} onValueChange={setNewStatus}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select new status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="processing">Processing</SelectItem>
                                    <SelectItem value="approved">Approved</SelectItem>
                                    <SelectItem value="rejected">Rejected</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <div>
                                <Label htmlFor="admin-notes">Admin Notes</Label>
                                <Textarea
                                  id="admin-notes"
                                  value={adminNotes}
                                  onChange={(e) => setAdminNotes(e.target.value)}
                                  placeholder="Add notes about this application..."
                                  rows={3}
                                />
                              </div>

                              <div className="flex justify-end space-x-2">
                                <Button
                                  variant="outline"
                                  onClick={() => {
                                    setSelectedApplication(null)
                                    setAdminNotes("")
                                    setNewStatus("")
                                  }}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  onClick={() => updateApplicationStatus(selectedApplication.id, newStatus, adminNotes)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Update Application
                                </Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminGuard>
  )
}
