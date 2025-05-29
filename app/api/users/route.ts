import { createServerComponentClient } from "@/lib/supabase"
import { NextResponse } from "next/server"

// Get current user profile
export async function GET(request: Request) {
  const supabase = createServerComponentClient()

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Get user profile
  const { data, error } = await supabase.from("users").select("*").eq("id", session.user.id).single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

// Create a new user profile (for admin use or when a user is created via OAuth)
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

  // Check if user already exists
  const { data: existingUser } = await supabase
    .from("users")
    .select("id")
    .eq("id", body.id || session.user.id)
    .single()

  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 })
  }

  // Create user profile
  const { data, error } = await supabase
    .from("users")
    .insert({
      id: body.id || session.user.id,
      email: body.email || session.user.email,
      full_name: body.full_name,
      phone_number: body.phone_number,
      id_number: body.id_number,
      google_id: body.google_id,
      profile_image_url: body.profile_image_url,
      created_at: new Date().toISOString(),
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data, { status: 201 })
}

// Update user profile
export async function PUT(request: Request) {
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

  // Update user profile
  const { data, error } = await supabase
    .from("users")
    .update({
      ...body,
      updated_at: new Date().toISOString(),
    })
    .eq("id", session.user.id)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

// Delete user profile
export async function DELETE(request: Request) {
  const supabase = createServerComponentClient()

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Delete user profile
  const { error } = await supabase.from("users").delete().eq("id", session.user.id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Also delete the user from auth
  const { error: authError } = await supabase.auth.admin.deleteUser(session.user.id)

  if (authError) {
    return NextResponse.json({ error: authError.message }, { status: 500 })
  }

  return NextResponse.json({ message: "User deleted successfully" })
}
