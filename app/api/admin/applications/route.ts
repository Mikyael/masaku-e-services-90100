import { createServerComponentClient } from "@/lib/supabase"
import { NextResponse } from "next/server"

// Get all applications (admin only)
export async function GET(request: Request) {
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

  // Get all applications with user details
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
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}
