import { ServiceTemplate } from "@/components/service-template"

export default function TradeLicensePage() {
  return (
    <ServiceTemplate
      title="Trade License Application"
      description="Apply for a trade license to operate your business in Machakos County"
      iconName="Store"
      iconColor="bg-blue-100 text-blue-600"
      requirements={[
        "Valid National ID or Passport",
        "Business registration certificate",
        "Tax compliance certificate",
        "Lease agreement or ownership documents",
        "Passport-size photographs (2)",
      ]}
      processingTime="3-5 working days"
      fee="KES 1,500"
      validity="1 year"
      serviceCode="TL"
      formFields={[
        {
          name: "businessName",
          label: "Business Name",
          type: "text",
          required: true,
          placeholder: "Enter business name",
        },
        { name: "ownerName", label: "Owner Name", type: "text", required: true, placeholder: "Enter owner name" },
        { name: "idNumber", label: "ID/Passport Number", type: "text", required: true, placeholder: "Enter ID number" },
        { name: "phoneNumber", label: "Phone Number", type: "tel", required: true, placeholder: "+254 7XX XXX XXX" },
        { name: "email", label: "Email Address", type: "email", required: true, placeholder: "Enter email" },
        {
          name: "businessAddress",
          label: "Business Address",
          type: "textarea",
          required: true,
          placeholder: "Enter complete address",
        },
        {
          name: "tradeType",
          label: "Type of Trade",
          type: "select",
          required: true,
          placeholder: "Select trade type",
          options: [
            { value: "retail", label: "Retail Trade" },
            { value: "wholesale", label: "Wholesale Trade" },
            { value: "import-export", label: "Import/Export" },
            { value: "services", label: "Service Trade" },
          ],
        },
      ]}
    />
  )
}
