"use client"

import type React from "react"

import { useState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Store, Upload, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function BusinessPermitPage() {
  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "",
    ownerName: "",
    idNumber: "",
    phoneNumber: "",
    email: "",
    businessAddress: "",
    ward: "",
    businessDescription: "",
    employeeCount: "",
    startDate: "",
    agreeToTerms: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      alert(
        "Business permit application submitted successfully! Reference: BP-2024-" +
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
            <div className="p-3 bg-blue-100 rounded-lg mr-4">
              <Store className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Business Permit Application</h1>
              <p className="text-gray-600">Apply for a business operating permit in Machakos County</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Information Panel */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-blue-600">Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <span>Valid National ID or Passport</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <span>Business registration certificate</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <span>Tax compliance certificate</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <span>Lease agreement or ownership documents</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Processing Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p>
                  <strong>Processing Time:</strong> 5-7 working days
                </p>
                <p>
                  <strong>Fee:</strong> KES 2,500
                </p>
                <p>
                  <strong>Validity:</strong> 1 year
                </p>
                <p>
                  <strong>Payment Methods:</strong> M-Pesa, Bank Transfer
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Application Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Application Form</CardTitle>
                <CardDescription>Please fill in all required fields accurately</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Business Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Business Information</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="businessName">Business Name *</Label>
                        <Input
                          id="businessName"
                          required
                          value={formData.businessName}
                          onChange={(e) => handleInputChange("businessName", e.target.value)}
                          placeholder="Enter business name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="businessType">Business Type *</Label>
                        <Select
                          value={formData.businessType}
                          onValueChange={(value) => handleInputChange("businessType", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select business type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="retail">Retail Shop</SelectItem>
                            <SelectItem value="restaurant">Restaurant/Hotel</SelectItem>
                            <SelectItem value="services">Service Provider</SelectItem>
                            <SelectItem value="manufacturing">Manufacturing</SelectItem>
                            <SelectItem value="wholesale">Wholesale</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="businessDescription">Business Description *</Label>
                      <Textarea
                        id="businessDescription"
                        required
                        rows={3}
                        value={formData.businessDescription}
                        onChange={(e) => handleInputChange("businessDescription", e.target.value)}
                        placeholder="Describe your business activities..."
                      />
                    </div>
                  </div>

                  {/* Owner Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Owner Information</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="ownerName">Full Name *</Label>
                        <Input
                          id="ownerName"
                          required
                          value={formData.ownerName}
                          onChange={(e) => handleInputChange("ownerName", e.target.value)}
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
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          required
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="Enter email address"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Business Location */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Business Location</h3>

                    <div>
                      <Label htmlFor="businessAddress">Business Address *</Label>
                      <Textarea
                        id="businessAddress"
                        required
                        rows={2}
                        value={formData.businessAddress}
                        onChange={(e) => handleInputChange("businessAddress", e.target.value)}
                        placeholder="Enter complete business address"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="ward">Ward *</Label>
                        <Select value={formData.ward} onValueChange={(value) => handleInputChange("ward", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select ward" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="machakos-central">Machakos Central</SelectItem>
                            <SelectItem value="mumbuni-north">Mumbuni North</SelectItem>
                            <SelectItem value="mumbuni-south">Mumbuni South</SelectItem>
                            <SelectItem value="mutituni">Mutituni</SelectItem>
                            <SelectItem value="kola">Kola</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="employeeCount">Number of Employees</Label>
                        <Input
                          id="employeeCount"
                          type="number"
                          value={formData.employeeCount}
                          onChange={(e) => handleInputChange("employeeCount", e.target.value)}
                          placeholder="Enter number of employees"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Document Upload */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Required Documents</h3>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-2">Upload required documents</p>
                      <Button type="button" variant="outline">
                        Choose Files
                      </Button>
                      <p className="text-xs text-gray-500 mt-2">Supported: PDF, JPG, PNG (Max 5MB each)</p>
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
                    {isSubmitting ? "Submitting Application..." : "Submit Application"}
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
