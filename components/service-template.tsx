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
import {
  Upload,
  ArrowLeft,
  Store,
  Wine,
  Utensils,
  Baby,
  Cross,
  UserCheck,
  FileText,
  Home,
  Calculator,
  CreditCard,
  Droplets,
  Car,
} from "lucide-react"
import Link from "next/link"

const iconMap = {
  Store,
  Wine,
  Utensils,
  Baby,
  Cross,
  UserCheck,
  FileText,
  Home,
  Calculator,
  CreditCard,
  Droplets,
  Car,
}

interface ServiceTemplateProps {
  title: string
  description: string
  iconName: keyof typeof iconMap
  iconColor: string
  requirements: string[]
  processingTime: string
  fee: string
  validity?: string
  formFields: Array<{
    name: string
    label: string
    type: "text" | "email" | "tel" | "date" | "number" | "textarea" | "select"
    required?: boolean
    placeholder?: string
    options?: Array<{ value: string; label: string }>
  }>
  serviceCode: string
}

export function ServiceTemplate({
  title,
  description,
  iconName,
  iconColor,
  requirements,
  processingTime,
  fee,
  validity,
  formFields,
  serviceCode,
}: ServiceTemplateProps) {
  const [formData, setFormData] = useState<Record<string, string | boolean>>({
    agreeToTerms: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const Icon = iconMap[iconName]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      alert(
        `${title} application submitted successfully! Reference: ${serviceCode}-2024-${Math.random()
          .toString(36)
          .substr(2, 6)
          .toUpperCase()}`,
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
            <div className={`p-3 ${iconColor} rounded-lg mr-4`}>
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h1>
              <p className="text-gray-600">{description}</p>
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
                {requirements.map((requirement, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <span>{requirement}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Processing Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p>
                  <strong>Processing Time:</strong> {processingTime}
                </p>
                <p>
                  <strong>Fee:</strong> {fee}
                </p>
                {validity && (
                  <p>
                    <strong>Validity:</strong> {validity}
                  </p>
                )}
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {formFields.map((field) => (
                      <div key={field.name} className={field.type === "textarea" ? "md:col-span-2" : ""}>
                        <Label htmlFor={field.name}>
                          {field.label} {field.required && "*"}
                        </Label>
                        {field.type === "select" ? (
                          <Select
                            value={formData[field.name] as string}
                            onValueChange={(value) => handleInputChange(field.name, value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder={field.placeholder} />
                            </SelectTrigger>
                            <SelectContent>
                              {field.options?.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : field.type === "textarea" ? (
                          <Textarea
                            id={field.name}
                            required={field.required}
                            rows={3}
                            value={formData[field.name] as string}
                            onChange={(e) => handleInputChange(field.name, e.target.value)}
                            placeholder={field.placeholder}
                          />
                        ) : (
                          <Input
                            id={field.name}
                            type={field.type}
                            required={field.required}
                            value={formData[field.name] as string}
                            onChange={(e) => handleInputChange(field.name, e.target.value)}
                            placeholder={field.placeholder}
                          />
                        )}
                      </div>
                    ))}
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
                      checked={formData.agreeToTerms as boolean}
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
