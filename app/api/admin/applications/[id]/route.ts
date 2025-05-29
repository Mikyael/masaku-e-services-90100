import { createServerComponentClient } from "@/lib/supabase"
import { NextResponse } from "next/server"

// Update application status (admin only)
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const supabase = createServerComponentClient()

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Check if user is admin
  const { data: userProfile } = await supabase.from("users").select("role").eq("id", session.user.id).single()

  if (!userProfile || (userProfile.role !== "admin" && userProfile.role !== "super_admin")) {
    return NextResponse.json({ error: "Forbidden - Admin access required" }, { status: 403 })
  }

  // Get request body
  const body = await request.json()

  // Update application
  const { data, error } = await supabase
    .from("applications")
    .update({
      status: body.status,
      admin_notes: body.admin_notes,
      processed_by: session.user.id,
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
