import { createServerComponentClient } from "@/lib/supabase"
import { NextResponse } from "next/server"

// Get a specific application
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const supabase = createServerComponentClient()

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Get application
  const { data, error } = await supabase.from("applications").select("*").eq("id", params.id).single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Check if the application belongs to the current user
  if (data.user_id !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  return NextResponse.json(data)
}

// Update an application
export async function PUT(request: Request, { params }: { params: { id: string } }) {
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

  // Check if the application belongs to the current user
  const { data: application, error: fetchError } = await supabase
    .from("applications")
    .select("user_id")
    .eq("id", params.id)
    .single()

  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 500 })
  }

  if (application.user_id !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  // Update application
  const { data, error } = await supabase
    .from("applications")
    .update({
      ...body,
      last_updated: new Date().toISOString(),
    })
    .eq("id", params.id)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}
