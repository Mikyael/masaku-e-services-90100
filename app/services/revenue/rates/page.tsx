import { ServiceTemplate } from "@/components/service-template"

export default function PropertyRatesPage() {
  return (
    <ServiceTemplate
      title="Property Rates Payment"
      description="Pay your property rates online"
      iconName="CreditCard"
      iconColor="bg-yellow-100 text-yellow-600"
      requirements={["Property rates number", "Valid National ID or Passport", "Previous rates receipt (if available)"]}
      processingTime="Instant"
      fee="As per assessment"
      serviceCode="PR"
      formFields={[
        { name: "ownerName", label: "Property Owner", type: "text", required: true, placeholder: "Enter owner name" },
        { name: "idNumber", label: "ID/Passport Number", type: "text", required: true, placeholder: "Enter ID number" },
        { name: "phoneNumber", label: "Phone Number", type: "tel", required: true, placeholder: "+254 7XX XXX XXX" },
        { name: "email", label: "Email Address", type: "email", required: true, placeholder: "Enter email" },
        { name: "ratesNumber", label: "Rates Number", type: "text", required: true, placeholder: "Enter rates number" },
        { name: "plotNumber", label: "Plot Number", type: "text", required: true, placeholder: "Enter plot number" },
        {
          name: "propertyLocation",
          label: "Property Location",
          type: "text",
          required: true,
          placeholder: "Enter location",
        },
        {
          name: "paymentPeriod",
          label: "Payment Period",
          type: "select",
          required: true,
          placeholder: "Select period",
          options: [
            { value: "current-year", label: "Current Year" },
            { value: "arrears", label: "Arrears" },
            { value: "advance", label: "Advance Payment" },
          ],
        },
      ]}
    />
  )
}
