"use client"

import { useState } from "react"
import { useSupabase } from "./use-supabase"
import { useAuth } from "@/context/auth-context"

export function useApplication() {
  const { supabase } = useSupabase()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submitApplication = async (applicationData: {
    serviceType: string
    serviceName: string
    serviceCode: string
    formData: any
    feeAmount?: number
  }) => {
    if (!user) {
      setError("You must be logged in to submit an application")
      return { error: "Not authenticated", data: null }
    }

    setLoading(true)
    setError(null)

    try {
      // Generate reference number
      const serviceCode = applicationData.serviceCode || "APP"
      const randomString = Math.random().toString(36).substring(2, 8).toUpperCase()
      const referenceNumber = `${serviceCode}-${new Date().getFullYear()}-${randomString}`

      // Create application
      const { data, error } = await supabase
        .from("applications")
        .insert({
          user_id: user.id,
          reference_number: referenceNumber,
          service_type: applicationData.serviceType,
          service_name: applicationData.serviceName,
          status: "pending",
          form_data: applicationData.formData,
          fee_amount: applicationData.feeAmount || 0,
          fee_status: "unpaid",
          submitted_date: new Date().toISOString(),
          last_updated: new Date().toISOString(),
        })
        .select()
        .single()

      if (error) {
        setError(error.message)
        return { error: error.message, data: null }
      }

      return { error: null, data }
    } catch (err: any) {
      const errorMessage = err.message || "An unexpected error occurred"
      setError(errorMessage)
      return { error: errorMessage, data: null }
    } finally {
      setLoading(false)
    }
  }

  const getUserApplications = async () => {
    if (!user) {
      setError("You must be logged in to view applications")
      return { error: "Not authenticated", data: null }
    }

    setLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .eq("user_id", user.id)
        .order("submitted_date", { ascending: false })

      if (error) {
        setError(error.message)
        return { error: error.message, data: null }
      }

      return { error: null, data }
    } catch (err: any) {
      const errorMessage = err.message || "An unexpected error occurred"
      setError(errorMessage)
      return { error: errorMessage, data: null }
    } finally {
      setLoading(false)
    }
  }

  return {
    submitApplication,
    getUserApplications,
    loading,
    error,
  }
}
