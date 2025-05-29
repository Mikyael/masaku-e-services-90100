import { createServerComponentClient } from "@/lib/supabase"
import { NextResponse } from "next/server"

// Get all applications for the current user
export async function GET(request: Request) {
  const supabase = createServerComponentClient()

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Get applications
  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .eq("user_id", session.user.id)
    .order("submitted_date", { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

// Create a new application
export async function POST(request: Request) {
  const supabase = createServerComponentClient()

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Get request body
  const body = await request.json()

  // Generate reference number
  const serviceCode = body.serviceCode || "APP"
  const randomString = Math.random().toString(36).substring(2, 8).toUpperCase()
  const referenceNumber = `${serviceCode}-${new Date().getFullYear()}-${randomString}`

  // Create application
  const { data, error } = await supabase
    .from("applications")
    .insert({
      user_id: session.user.id,
      reference_number: referenceNumber,
      service_type: body.serviceType,
      service_name: body.serviceName,
      status: "pending",
      form_data: body.formData,
      fee_amount: body.feeAmount,
      fee_status: "unpaid",
      submitted_date: new Date().toISOString(),
      last_updated: new Date().toISOString(),
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}
