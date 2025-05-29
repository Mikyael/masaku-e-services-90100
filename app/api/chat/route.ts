import { createServerComponentClient } from "@/lib/supabase"
import { NextResponse } from "next/server"

// Get chat history for the current user
export async function GET(request: Request) {
  const supabase = createServerComponentClient()

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const url = new URL(request.url)
  const sessionId = url.searchParams.get("sessionId")

  let query = supabase
    .from("chat_history")
    .select("*")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: true })

  if (sessionId) {
    query = query.eq("session_id", sessionId)
  }

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

// Save a chat message
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

  // Create chat message
  const { data, error } = await supabase
    .from("chat_history")
    .insert({
      user_id: session.user.id,
      session_id: body.sessionId,
      message_content: body.content,
      message_type: body.type,
      created_at: new Date().toISOString(),
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}
