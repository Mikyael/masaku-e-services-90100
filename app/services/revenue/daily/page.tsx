import { ServiceTemplate } from "@/components/service-template"

export default function BusinessDailyLicensePage() {
  return (
    <ServiceTemplate
      title="Business Daily License"
      description="Apply for daily business license in Machakos County"
      iconName="CreditCard"
      iconColor="bg-yellow-100 text-yellow-600"
      requirements={[
        "Valid National ID or Passport",
        "Business permit (if applicable)",
        "Previous daily license receipt (if renewal)",
      ]}
      processingTime="Same day"
      fee="KES 100"
      serviceCode="BDL"
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
        { name: "email", label: "Email Address", type: "email", placeholder: "Enter email" },
        {
          name: "businessLocation",
          label: "Business Location",
          type: "text",
          required: true,
          placeholder: "Enter business location",
        },
        {
          name: "businessType",
          label: "Type of Business",
          type: "select",
          required: true,
          placeholder: "Select business type",
          options: [
            { value: "hawking", label: "Hawking" },
            { value: "market-stall", label: "Market Stall" },
            { value: "temporary-shop", label: "Temporary Shop" },
            { value: "mobile-vendor", label: "Mobile Vendor" },
          ],
        },
        {
          name: "licenseDate",
          label: "License Date",
          type: "date",
          required: true,
        },
      ]}
    />
  )
}
