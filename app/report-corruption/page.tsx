"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, AlertTriangle, Lock, FileText, Upload } from "lucide-react"

export default function ReportCorruptionPage() {
  const [formData, setFormData] = useState({
    reportType: "",
    department: "",
    incidentDate: "",
    location: "",
    description: "",
    evidence: "",
    anonymous: true,
    contactName: "",
    contactEmail: "",
    contactPhone: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [files, setFiles] = useState<FileList | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate secure submission
    setTimeout(() => {
      setIsSubmitting(false)
      alert(
        "Your report has been submitted securely. Reference ID: CR-2024-" +
          Math.random().toString(36).substr(2, 9).toUpperCase(),
      )
    }, 3000)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="mx-auto h-16 w-16 bg-red-600 rounded-lg flex items-center justify-center mb-4">
          <Shield className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Report Corruption</h1>
        <p className="text-lg text-gray-600">
          Help us maintain integrity in government services. Your report will be handled confidentially.
        </p>
      </div>

      {/* Security Notice */}
      <Alert className="mb-8 border-green-200 bg-green-50">
        <Lock className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          <strong>Secure & Confidential:</strong> This form uses end-to-end encryption. Your identity is protected and
          reports can be submitted anonymously.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Information Panel */}
        <div className="lg:col-span-1">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-red-600">What to Report</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="h-4 w-4 text-red-500 mt-1" />
                <span className="text-sm">Bribery or kickbacks</span>
              </div>
              <div className="flex items-start space-x-2">
                <AlertTriangle className="h-4 w-4 text-red-500 mt-1" />
                <span className="text-sm">Misuse of public funds</span>
              </div>
              <div className="flex items-start space-x-2">
                <AlertTriangle className="h-4 w-4 text-red-500 mt-1" />
                <span className="text-sm">Abuse of authority</span>
              </div>
              <div className="flex items-start space-x-2">
                <AlertTriangle className="h-4 w-4 text-red-500 mt-1" />
                <span className="text-sm">Conflict of interest</span>
              </div>
              <div className="flex items-start space-x-2">
                <AlertTriangle className="h-4 w-4 text-red-500 mt-1" />
                <span className="text-sm">Fraudulent activities</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Protection Guaranteed</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>• Anonymous reporting available</p>
              <p>• Whistleblower protection laws apply</p>
              <p>• No retaliation policy enforced</p>
              <p>• Secure evidence handling</p>
              <p>• Regular status updates provided</p>
            </CardContent>
          </Card>
        </div>

        {/* Report Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Submit Your Report</CardTitle>
              <CardDescription>
                Please provide as much detail as possible to help us investigate effectively.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Report Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="reportType">Type of Corruption *</Label>
                    <Select
                      value={formData.reportType}
                      onValueChange={(value) => handleInputChange("reportType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bribery">Bribery/Kickbacks</SelectItem>
                        <SelectItem value="misuse">Misuse of Funds</SelectItem>
                        <SelectItem value="abuse">Abuse of Authority</SelectItem>
                        <SelectItem value="conflict">Conflict of Interest</SelectItem>
                        <SelectItem value="fraud">Fraud</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="department">Department/Agency *</Label>
                    <Select
                      value={formData.department}
                      onValueChange={(value) => handleInputChange("department", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="planning">Planning & Development</SelectItem>
                        <SelectItem value="health">Health Services</SelectItem>
                        <SelectItem value="finance">Finance & Revenue</SelectItem>
                        <SelectItem value="public-works">Public Works</SelectItem>
                        <SelectItem value="licensing">Licensing & Permits</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Incident Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="incidentDate">Incident Date</Label>
                    <Input
                      id="incidentDate"
                      type="date"
                      value={formData.incidentDate}
                      onChange={(e) => handleInputChange("incidentDate", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      placeholder="Where did this occur?"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <Label htmlFor="description">Detailed Description *</Label>
                  <Textarea
                    id="description"
                    required
                    rows={6}
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Please provide a detailed account of what happened, including names, dates, amounts, and any other relevant information..."
                  />
                </div>

                {/* Evidence Upload */}
                <div>
                  <Label htmlFor="evidence">Supporting Evidence</Label>
                  <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Upload documents, photos, or other evidence (Optional)</p>
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                      onChange={(e) => setFiles(e.target.files)}
                      className="hidden"
                      id="file-upload"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("file-upload")?.click()}
                    >
                      Choose Files
                    </Button>
                    <p className="text-xs text-gray-500 mt-2">Supported: PDF, DOC, JPG, PNG (Max 10MB each)</p>
                  </div>
                </div>

                {/* Anonymous Reporting */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="anonymous"
                      checked={formData.anonymous}
                      onCheckedChange={(checked) => handleInputChange("anonymous", checked as boolean)}
                    />
                    <Label htmlFor="anonymous" className="text-sm font-medium">
                      Submit this report anonymously
                    </Label>
                  </div>

                  {!formData.anonymous && (
                    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium">Contact Information (Optional)</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="contactName">Your Name</Label>
                          <Input
                            id="contactName"
                            value={formData.contactName}
                            onChange={(e) => handleInputChange("contactName", e.target.value)}
                            placeholder="Full name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="contactEmail">Email</Label>
                          <Input
                            id="contactEmail"
                            type="email"
                            value={formData.contactEmail}
                            onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                            placeholder="Email address"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="contactPhone">Phone Number</Label>
                        <Input
                          id="contactPhone"
                          type="tel"
                          value={formData.contactPhone}
                          onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                          placeholder="Phone number"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting Securely..." : "Submit Report"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Legal Notice */}
          <Alert className="mt-6">
            <FileText className="h-4 w-4" />
            <AlertDescription>
              <strong>Legal Notice:</strong> Filing a false report is a criminal offense. All reports are investigated
              thoroughly and appropriate action will be taken based on findings.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  )
}
