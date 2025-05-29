import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Clock, Shield, ArrowRight, Bell } from "lucide-react"

export default function HomePage() {
  const quickServices = [
    { name: "Business Permits", href: "/services/business", icon: "/icons/business.png" },
    { name: "Land Services", href: "/services/land", icon: "/icons/lands-icon.png" },
    { name: "Health Certificates", href: "/services/health", icon: "/icons/healthcare.png" },
    { name: "Revenue Services", href: "/services/revenue", icon: "/icons/revenue-service.png" },
  ]

  const announcements = [
    {
      title: "New Online Tax Payment System",
      date: "Dec 15, 2024",
      type: "System Update",
      description: "We've launched a new secure payment system for property taxes.",
    },
    {
      title: "Holiday Service Hours",
      date: "Dec 20, 2024",
      type: "Notice",
      description: "Modified service hours during the holiday season.",
    },
    {
      title: "Digital ID Integration",
      date: "Jan 5, 2025",
      type: "New Feature",
      description: "Now accepting digital IDs for identity verification.",
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section
        className="relative text-white py-16 md:py-20 bg-cover bg-center bg-no-repeat min-h-[60vh] flex items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/images/landing-banner.jpg')`,
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl text-center mx-auto">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 leading-tight">
              Welcome to Masaku e-Services
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 text-blue-100 leading-relaxed">
              Access Machakos County services online - convenient, secure, and available 24/7. From business permits to
              land services, everything you need is just a click away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/services">
                <span className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white font-medium text-lg px-6 py-3 rounded-lg transition-colors shadow-lg">
                  Browse Services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </Link>
              <Link href="/register">
                <span className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white font-medium text-lg px-6 py-3 rounded-lg transition-colors shadow-lg">
                  Create Account
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Services */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">County Services</h2>
            <p className="text-base md:text-lg text-gray-600">Quick access to essential Machakos County services</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {quickServices.map((service) => (
              <Card key={service.name} className="hover:shadow-lg transition-shadow cursor-pointer">
                <Link href={service.href}>
                  <CardHeader className="text-center p-4 md:p-6">
                    <img
                      src={service.icon || "/placeholder.svg"}
                      alt={`${service.name} icon`}
                      className="h-10 w-10 md:h-12 md:w-12 mx-auto mb-3 md:mb-4"
                    />
                    <CardTitle className="text-base md:text-lg">{service.name}</CardTitle>
                  </CardHeader>
                </Link>
              </Card>
            ))}
          </div>
          <div className="text-center mt-6 md:mt-8">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              <Link href="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Why Choose Our Portal?</h2>
            <p className="text-base md:text-lg text-gray-600">Built with citizens in mind</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center">
              <Clock className="h-12 w-12 md:h-16 md:w-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg md:text-xl font-semibold mb-2">24/7 Availability</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Access services anytime, anywhere. No more waiting in lines or office hours.
              </p>
            </div>
            <div className="text-center">
              <Shield className="h-12 w-12 md:h-16 md:w-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg md:text-xl font-semibold mb-2">Secure & Private</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Your data is protected with enterprise-grade security and encryption.
              </p>
            </div>
            <div className="text-center">
              <Users className="h-12 w-12 md:h-16 md:w-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg md:text-xl font-semibold mb-2">User-Friendly</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Intuitive design that works on all devices. Easy for everyone to use.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Announcements */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Latest Announcements</h2>
              <p className="text-gray-600 text-sm md:text-base">Stay updated with the latest news and updates</p>
            </div>
            <Bell className="h-6 w-6 md:h-8 md:w-8 text-blue-600" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {announcements.map((announcement, index) => (
              <Card key={index}>
                <CardHeader className="p-4 md:p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {announcement.type}
                    </Badge>
                    <span className="text-xs md:text-sm text-gray-500">{announcement.date}</span>
                  </div>
                  <CardTitle className="text-base md:text-lg">{announcement.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-0">
                  <CardDescription className="text-sm">{announcement.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
