import { AuthGuard } from "@/components/auth-guard"
import ServicesContent from "./services-content"

export default function ServicesPage() {
  return (
    <AuthGuard>
      <ServicesContent />
    </AuthGuard>
  )
}
