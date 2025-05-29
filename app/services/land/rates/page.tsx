import { ServiceTemplate } from "@/components/service-template"

export default function LandRatesPage() {
  return (
    <ServiceTemplate
      title="Land Rates Clearance"
      description="Apply for land rates clearance certificate"
      iconName="Calculator"
      iconColor="bg-green-100 text-green-600"
      requirements={[
        "Title deed or allotment letter",
        "Previous rates receipts",
        "Valid National ID or Passport",
        "Survey plan (if available)",
      ]}
      processingTime="Same day"
      fee="KES 200"
      serviceCode="LR"
      formFields={[
        { name: "ownerName", label: "Property Owner", type: "text", required: true, placeholder: "Enter owner name" },
        { name: "idNumber", label: "ID/Passport Number", type: "text", required: true, placeholder: "Enter ID number" },
        { name: "phoneNumber", label: "Phone Number", type: "tel", required: true, placeholder: "+254 7XX XXX XXX" },
        { name: "email", label: "Email Address", type: "email", placeholder: "Enter email" },
        { name: "plotNumber", label: "Plot Number", type: "text", required: true, placeholder: "Enter plot number" },
        {
          name: "propertyLocation",
          label: "Property Location",
          type: "text",
          required: true,
          placeholder: "Enter location",
        },
        { name: "ratesNumber", label: "Rates Number", type: "text", placeholder: "Enter rates number if known" },
        {
          name: "purpose",
          label: "Purpose of Clearance",
          type: "select",
          required: true,
          placeholder: "Select purpose",
          options: [
            { value: "sale", label: "Property Sale" },
            { value: "transfer", label: "Property Transfer" },
            { value: "loan", label: "Bank Loan" },
            { value: "legal", label: "Legal Proceedings" },
          ],
        },
      ]}
    />
  )
}
