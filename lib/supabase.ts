import { createClient } from "@supabase/supabase-js"
import type { Database } from "./database.types"

// Create a single supabase client for interacting with your database
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// For client-side usage
export const createClientComponentClient = () => {
  return createClient<Database>(supabaseUrl, supabaseAnonKey)
}

// For server-side usage (with service role key for admin operations)
export const createServerComponentClient = () => {
  return createClient<Database>(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey, {
    auth: {
      persistSession: false,
    },
  })
}
