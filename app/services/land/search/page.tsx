"use client"

import type React from "react"

import { useState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { MapPin, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function LandSearchPage() {
  const [formData, setFormData] = useState({
    searchType: "",
    titleNumber: "",
    plotNumber: "",
    registrationSection: "",
    ownerName: "",
    applicantName: "",
    idNumber: "",
    phoneNumber: "",
    email: "",
    purpose: "",
    agreeToTerms: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      alert(
        "Land search request submitted successfully! Reference: LS-2024-" +
          Math.random().toString(36).substr(2, 6).toUpperCase(),
      )
    }, 2000)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <AuthGuard>
      <div className="container mx-auto px-4 py-6 md:py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <Link href="/services" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Services
          </Link>
          <div className="flex items-center mb-4">
            <div className="p-3 bg-purple-100 rounded-lg mr-4">
              <MapPin className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Land Search Service</h1>
              <p className="text-gray-600">Search for land records and ownership information</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Information Panel */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-purple-600">Search Types</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                  <span>Official Search (Title Number)</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                  <span>Plot Number Search</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                  <span>Owner Name Search</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                  <span>Registry Index Map Search</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Service Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p>
                  <strong>Processing Time:</strong> 1-2 working days
                </p>
                <p>
                  <strong>Fee:</strong> KES 1,000
                </p>
                <p>
                  <strong>Valid ID Required:</strong> Yes
                </p>
                <p>
                  <strong>Collection:</strong> County Lands Office
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Search Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Land Search Request</CardTitle>
                <CardDescription>Please provide accurate information for your land search</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Search Criteria */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Search Criteria</h3>

                    <div>
                      <Label htmlFor="searchType">Search Type *</Label>
                      <Select
                        value={formData.searchType}
                        onValueChange={(value) => handleInputChange("searchType", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select search type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="title-number">Title Number Search</SelectItem>
                          <SelectItem value="plot-number">Plot Number Search</SelectItem>
                          <SelectItem value="owner-name">Owner Name Search</SelectItem>
                          <SelectItem value="registry-map">Registry Index Map</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="titleNumber">Title Number</Label>
                        <Input
                          id="titleNumber"
                          value={formData.titleNumber}
                          onChange={(e) => handleInputChange("titleNumber", e.target.value)}
                          placeholder="e.g., MACHAKOS/MACHAKOS/1234"
                        />
                      </div>
                      <div>
                        <Label htmlFor="plotNumber">Plot Number</Label>
                        <Input
                          id="plotNumber"
                          value={formData.plotNumber}
                          onChange={(e) => handleInputChange("plotNumber", e.target.value)}
                          placeholder="e.g., Plot 1234"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="registrationSection">Registration Section</Label>
                        <Select
                          value={formData.registrationSection}
                          onValueChange={(value) => handleInputChange("registrationSection", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select section" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="machakos">Machakos</SelectItem>
                            <SelectItem value="kangundo">Kangundo</SelectItem>
                            <SelectItem value="matungulu">Matungulu</SelectItem>
                            <SelectItem value="kathiani">Kathiani</SelectItem>
                            <SelectItem value="mavoko">Mavoko</SelectItem>
                            <SelectItem value="masinga">Masinga</SelectItem>
                            <SelectItem value="yatta">Yatta</SelectItem>
                            <SelectItem value="mwala">Mwala</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="ownerName">Owner Name (if known)</Label>
                        <Input
                          id="ownerName"
                          value={formData.ownerName}
                          onChange={(e) => handleInputChange("ownerName", e.target.value)}
                          placeholder="Enter owner's name"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="purpose">Purpose of Search *</Label>
                      <Input
                        id="purpose"
                        required
                        value={formData.purpose}
                        onChange={(e) => handleInputChange("purpose", e.target.value)}
                        placeholder="e.g., Purchase verification, Legal proceedings"
                      />
                    </div>
                  </div>

                  {/* Applicant Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Applicant Information</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="applicantName">Full Name *</Label>
                        <Input
                          id="applicantName"
                          required
                          value={formData.applicantName}
                          onChange={(e) => handleInputChange("applicantName", e.target.value)}
                          placeholder="Enter full name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="idNumber">ID/Passport Number *</Label>
                        <Input
                          id="idNumber"
                          required
                          value={formData.idNumber}
                          onChange={(e) => handleInputChange("idNumber", e.target.value)}
                          placeholder="Enter ID or passport number"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phoneNumber">Phone Number *</Label>
                        <Input
                          id="phoneNumber"
                          required
                          type="tel"
                          value={formData.phoneNumber}
                          onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                          placeholder="+254 7XX XXX XXX"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="Enter email address"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                    />
                    <Label htmlFor="agreeToTerms" className="text-sm">
                      I agree to the terms and conditions and certify that the information provided is accurate
                    </Label>
                  </div>

                  {/* Submit Button */}
                  <Button type="submit" className="w-full" disabled={isSubmitting || !formData.agreeToTerms}>
                    {isSubmitting ? "Submitting Request..." : "Submit Search Request"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
