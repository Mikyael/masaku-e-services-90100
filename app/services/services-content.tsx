import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, ArrowRight } from "lucide-react"
import {
  Droplets,
  Store,
  FileText,
  BadgeIcon as Certificate,
  Utensils,
  Baby,
  Cross,
  Heart,
  UserCheck,
  MapPin,
  Home,
  Building,
  Calculator,
  Banknote,
  Receipt,
  Car,
  Leaf,
  TreePine,
  Wrench,
  Route,
  Bus,
  ParkingCircle,
} from "lucide-react"

export default function ServicesContent() {
  const serviceCategories = [
    {
      title: "Business & Trade",
      icon: "/icons/business.png",
      color: "bg-blue-100 text-blue-600",
      services: [
        {
          name: "Business Permit Application",
          href: "/services/business/permit",
          time: "5-7 days",
          online: true,
          icon: Store,
        },
        { name: "Trade License", href: "/services/business/trade", time: "3-5 days", online: true, icon: FileText },
        {
          name: "Liquor License",
          href: "/services/business/liquor",
          time: "7-10 days",
          online: true,
          icon: Certificate,
        },
        {
          name: "Food Handler's Permit",
          href: "/services/business/food",
          time: "2-3 days",
          online: true,
          icon: Utensils,
        },
      ],
    },
    {
      title: "Health Services",
      icon: "/icons/healthcare.png",
      color: "bg-green-100 text-green-600",
      services: [
        { name: "Birth Certificate", href: "/services/health/birth", time: "3-5 days", online: true, icon: Baby },
        { name: "Death Certificate", href: "/services/health/death", time: "2-3 days", online: true, icon: Cross },
        {
          name: "Health Certificate",
          href: "/services/health/certificate",
          time: "1-2 days",
          online: true,
          icon: Heart,
        },
        { name: "Medical Permit", href: "/services/health/permit", time: "5-7 days", online: true, icon: UserCheck },
      ],
    },
    {
      title: "Land & Planning",
      icon: "/icons/lands-icon.png",
      color: "bg-purple-100 text-purple-600",
      services: [
        { name: "Land Search", href: "/services/land/search", time: "1-2 days", online: true, icon: MapPin },
        { name: "Title Deed Services", href: "/services/land/title", time: "10-15 days", online: true, icon: FileText },
        {
          name: "Building Plan Approval",
          href: "/services/land/building",
          time: "15-20 days",
          online: true,
          icon: Home,
        },
        { name: "Land Rates Clearance", href: "/services/land/rates", time: "Same day", online: true, icon: Building },
      ],
    },
    {
      title: "Revenue Services",
      icon: "/icons/revenue-service.png",
      color: "bg-yellow-100 text-yellow-600",
      services: [
        {
          name: "Property Rates Payment",
          href: "/services/revenue/rates",
          time: "Instant",
          online: true,
          icon: Calculator,
        },
        {
          name: "Business Daily License",
          href: "/services/revenue/daily",
          time: "Same day",
          online: true,
          icon: Banknote,
        },
        { name: "Market Fee Payment", href: "/services/revenue/market", time: "Instant", online: true, icon: Store },
        {
          name: "Parking Fee Payment",
          href: "/services/revenue/parking",
          time: "Instant",
          online: true,
          icon: Receipt,
        },
      ],
    },
    {
      title: "Water & Environment",
      icon: "/icons/water-environment.png",
      color: "bg-cyan-100 text-cyan-600",
      services: [
        {
          name: "Water Connection",
          href: "/services/water/connection",
          time: "5-7 days",
          online: true,
          icon: Droplets,
        },
        { name: "Borehole Permit", href: "/services/water/borehole", time: "10-15 days", online: true, icon: Wrench },
        {
          name: "Environmental Impact Assessment",
          href: "/services/water/eia",
          time: "30-45 days",
          online: true,
          icon: Leaf,
        },
        {
          name: "Waste Management Permit",
          href: "/services/water/waste",
          time: "7-10 days",
          online: true,
          icon: TreePine,
        },
      ],
    },
    {
      title: "Transport & Infrastructure",
      icon: "/icons/transport.png",
      color: "bg-orange-100 text-orange-600",
      services: [
        {
          name: "Road Maintenance Request",
          href: "/services/transport/road",
          time: "7-14 days",
          online: true,
          icon: Route,
        },
        { name: "Transport License", href: "/services/transport/license", time: "5-7 days", online: true, icon: Car },
        { name: "Matatu Permit", href: "/services/transport/matatu", time: "10-15 days", online: true, icon: Bus },
        {
          name: "Parking Permit",
          href: "/services/transport/parking",
          time: "1-2 days",
          online: true,
          icon: ParkingCircle,
        },
      ],
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Machakos County Services</h1>
        <p className="text-lg text-gray-600 mb-8">Browse our comprehensive catalog of online county services</p>

        {/* Search */}
        <div className="max-w-md mx-auto relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input placeholder="Search services..." className="pl-10" />
        </div>
      </div>

      {/* Service Categories */}
      <div className="space-y-12">
        {serviceCategories.map((category, categoryIndex) => (
          <div key={categoryIndex}>
            <div className="flex items-center mb-6">
              <div className={`p-3 rounded-lg ${category.color} mr-4`}>
                <img src={category.icon || "/placeholder.svg"} alt={`${category.title} icon`} className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {category.services.map((service, serviceIndex) => (
                <Card key={serviceIndex} className="hover:shadow-lg transition-shadow group">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant={service.online ? "default" : "secondary"}>
                        {service.online ? "Online" : "In-Person"}
                      </Badge>
                      <span className="text-sm text-gray-500">{service.time}</span>
                    </div>
                    <div className="flex items-center space-x-3 mb-2">
                      <service.icon className="h-5 w-5 text-blue-600" />
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Link
                      href={service.href}
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium group-hover:underline"
                    >
                      {service.online ? "Apply Online" : "Learn More"}
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Help Section */}
      <div className="mt-16 bg-blue-50 rounded-lg p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Need Help?</h3>
        <p className="text-gray-600 mb-6">Can't find what you're looking for? Our support team is here to help.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Contact Support
          </Link>
          <Link
            href="/faq"
            className="inline-flex items-center justify-center px-6 py-3 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
          >
            View FAQ
          </Link>
        </div>
      </div>
    </div>
  )
}
