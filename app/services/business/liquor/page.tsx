import { ServiceTemplate } from "@/components/service-template"

export default function LiquorLicensePage() {
  return (
    <ServiceTemplate
      title="Liquor License Application"
      description="Apply for a liquor license to sell alcoholic beverages in Machakos County"
      iconName="Wine"
      iconColor="bg-red-100 text-red-600"
      requirements={[
        "Valid National ID or Passport",
        "Business permit",
        "Certificate of good conduct",
        "Medical certificate",
        "Lease agreement or ownership documents",
        "Fire safety certificate",
      ]}
      processingTime="7-10 working days"
      fee="KES 15,000"
      validity="1 year"
      serviceCode="LL"
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
          name: "licenseType",
          label: "License Type",
          type: "select",
          required: true,
          placeholder: "Select license type",
          options: [
            { value: "on-license", label: "On-License (Bar/Restaurant)" },
            { value: "off-license", label: "Off-License (Shop/Store)" },
            { value: "wine-license", label: "Wine License" },
            { value: "beer-license", label: "Beer License" },
          ],
        },
      ]}
    />
  )
}
