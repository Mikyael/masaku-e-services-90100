"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSupabase } from "@/hooks/use-supabase"
import type { User } from "@supabase/supabase-js"
import type { Database } from "@/lib/database.types"

type UserProfile = Database["public"]["Tables"]["users"]["Row"]

type AuthContextType = {
  user: User | null
  profile: UserProfile | null
  signIn: (email: string, password: string) => Promise<{ error: any | null }>
  signUp: (email: string, password: string, userData: Partial<UserProfile>) => Promise<{ error: any | null }>
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
  loading: boolean
  updateProfile: (data: Partial<UserProfile>) => Promise<{ error: any | null }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { supabase, session, loading: authLoading } = useSupabase()
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Set user and fetch profile when session changes
  useEffect(() => {
    const getProfile = async () => {
      if (!session?.user) {
        setLoading(false)
        return
      }

      setUser(session.user)

      // Fetch user profile
      const { data, error } = await supabase.from("users").select("*").eq("id", session.user.id).single()

      if (error) {
        console.error("Error fetching user profile:", error)
      } else if (data) {
        setProfile(data)
      }

      setLoading(false)
    }

    if (!authLoading) {
      getProfile()
    }
  }, [session, authLoading, supabase])

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (!error) {
      router.push("/dashboard")
    }
    return { error }
  }

  // Sign up with email and password
  const signUp = async (email: string, password: string, userData: Partial<UserProfile>) => {
    // Create auth user
    const { error: signUpError, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: "https://masaku-e-services.vercel.app/auth/callback",
        data: {
          full_name: userData.full_name,
        },
      },
    })

    if (signUpError || !data.user) {
      return { error: signUpError }
    }

    // Create profile in users table
    const { error: profileError } = await supabase.from("users").insert({
      id: data.user.id,
      email,
      full_name: userData.full_name,
      phone_number: userData.phone_number,
      id_number: userData.id_number,
    })

    if (!profileError) {
      router.push("/login")
    }

    return { error: profileError }
  }

  // Sign in with Google
  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `https://masaku-e-services.vercel.app/auth/callback`,
      },
    })
  }

  // Sign out
  const signOut = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  // Update user profile
  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user) return { error: new Error("User not authenticated") }

    const { error } = await supabase.from("users").update(data).eq("id", user.id)

    if (!error) {
      setProfile((prev) => (prev ? { ...prev, ...data } : null))
    }

    return { error }
  }

  const value = {
    user,
    profile,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    loading: loading || authLoading,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
