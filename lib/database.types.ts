export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          phone_number: string | null
          id_number: string | null
          google_id: string | null
          profile_image_url: string | null
          role: "user" | "admin" | "super_admin"
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          email: string
          full_name?: string | null
          phone_number?: string | null
          id_number?: string | null
          google_id?: string | null
          profile_image_url?: string | null
          role?: "user" | "admin" | "super_admin"
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          phone_number?: string | null
          id_number?: string | null
          google_id?: string | null
          profile_image_url?: string | null
          role?: "user" | "admin" | "super_admin"
          created_at?: string
          updated_at?: string | null
        }
      }
      applications: {
        Row: {
          id: string
          user_id: string
          reference_number: string
          service_type: string
          service_name: string
          status: "pending" | "processing" | "approved" | "rejected"
          form_data: Json
          fee_amount: number | null
          fee_status: "unpaid" | "paid" | null
          submitted_date: string
          last_updated: string
          notes: string | null
          admin_notes: string | null
          processed_by: string | null
        }
        Insert: {
          id?: string
          user_id: string
          reference_number: string
          service_type: string
          service_name: string
          status?: "pending" | "processing" | "approved" | "rejected"
          form_data: Json
          fee_amount?: number | null
          fee_status?: "unpaid" | "paid" | null
          submitted_date?: string
          last_updated?: string
          notes?: string | null
          admin_notes?: string | null
          processed_by?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          reference_number?: string
          service_type?: string
          service_name?: string
          status?: "pending" | "processing" | "approved" | "rejected"
          form_data?: Json
          fee_amount?: number | null
          fee_status?: "unpaid" | "paid" | null
          submitted_date?: string
          last_updated?: string
          notes?: string | null
          admin_notes?: string | null
          processed_by?: string | null
        }
      }
      chat_history: {
        Row: {
          id: string
          user_id: string
          session_id: string
          message_content: string
          message_type: "user" | "assistant"
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          session_id: string
          message_content: string
          message_type: "user" | "assistant"
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          session_id?: string
          message_content?: string
          message_type?: "user" | "assistant"
          created_at?: string
        }
      }
    }
  }
}
