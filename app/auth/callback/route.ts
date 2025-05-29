import { createServerComponentClient } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")

  if (code) {
    const supabase = createServerComponentClient()

    // Exchange the code for a session
    await supabase.auth.exchangeCodeForSession(code)
  }

  // Always redirect to the production URL after email confirmation
  return NextResponse.redirect(`https://masaku-e-services.vercel.app/dashboard`)
}
