"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X, LogOut } from "lucide-react"
import { useAuth } from "@/context/auth-context"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, profile, signOut } = useAuth()

  const handleLogout = () => {
    signOut()
    setIsOpen(false)
  }

  const navigationItems = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
    { name: "Report Corruption", href: "/report-corruption" },
  ]

  return (
    <nav className="bg-blue-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/images/machakos-logo.png"
              alt="Machakos County Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="hidden md:block">
              <h1 className="text-xl font-bold">MASAKU E-SERVICES</h1>
              <p className="text-xs text-blue-100">Machakos County Government</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                {item.name}
              </Link>
            ))}

            {/* Auth Links */}
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Dashboard
                </Link>
                {profile?.role === "admin" || profile?.role === "super_admin" ? (
                  <Link
                    href="/admin/dashboard"
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors bg-red-600 hover:bg-red-700"
                  >
                    Admin Dashboard
                  </Link>
                ) : null}
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-blue-700 hover:text-white"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-3 py-2 rounded-md text-sm font-medium bg-blue-700 hover:bg-blue-800 transition-colors"
                >
                  Register
                </Link>
                <Link
                  href="/admin/login"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors bg-red-600 hover:bg-red-700"
                >
                  Admin Login
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden text-white hover:bg-blue-700">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-blue-600 text-white border-blue-500">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Menu</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-blue-700"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-4">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}

                {/* Mobile Auth Links */}
                {user ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Dashboard
                    </Link>
                    {profile?.role === "admin" || profile?.role === "super_admin" ? (
                      <Link
                        href="/admin/dashboard"
                        className="block px-3 py-2 rounded-md text-base font-medium hover:bg-red-700 transition-colors bg-red-600"
                        onClick={() => setIsOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                    ) : null}
                    <Button
                      onClick={handleLogout}
                      variant="ghost"
                      className="w-full justify-start text-white hover:bg-blue-700 hover:text-white"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="block px-3 py-2 rounded-md text-base font-medium bg-blue-700 hover:bg-blue-800 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Register
                    </Link>
                    <Link
                      href="/admin/login"
                      className="block px-3 py-2 rounded-md text-base font-medium hover:bg-red-700 transition-colors bg-red-600"
                      onClick={() => setIsOpen(false)}
                    >
                      Admin Login
                    </Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
