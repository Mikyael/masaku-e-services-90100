import { ServiceTemplate } from "@/components/service-template"

export default function WasteManagementPermitPage() {
  return (
    <ServiceTemplate
      title="Waste Management Permit"
      description="Apply for waste management permit in Machakos County"
      iconName="Droplets"
      iconColor="bg-orange-100 text-orange-600"
      requirements={[
        "Valid National ID or Passport",
        "Business registration certificate",
        "Waste management plan",
        "Site location map",
        "Environmental compliance certificate",
      ]}
      processingTime="7-10 working days"
      fee="KES 3,000"
      validity="1 year"
      serviceCode="WMP"
      formFields={[
        {
          name: "applicantName",
          label: "Applicant Name",
          type: "text",
          required: true,
          placeholder: "Enter full name",
        },
        { name: "idNumber", label: "ID/Passport Number", type: "text", required: true, placeholder: "Enter ID number" },
        { name: "phoneNumber", label: "Phone Number", type: "tel", required: true, placeholder: "+254 7XX XXX XXX" },
        { name: "email", label: "Email Address", type: "email", required: true, placeholder: "Enter email" },
        {
          name: "businessName",
          label: "Business/Organization Name",
          type: "text",
          required: true,
          placeholder: "Enter business name",
        },
        {
          name: "facilityLocation",
          label: "Facility Location",
          type: "textarea",
          required: true,
          placeholder: "Enter complete facility address",
        },
        {
          name: "wasteType",
          label: "Type of Waste",
          type: "select",
          required: true,
          placeholder: "Select waste type",
          options: [
            { value: "solid-waste", label: "Solid Waste" },
            { value: "liquid-waste", label: "Liquid Waste" },
            { value: "hazardous-waste", label: "Hazardous Waste" },
            { value: "medical-waste", label: "Medical Waste" },
          ],
        },
        {
          name: "wasteVolume",
          label: "Daily Waste Volume (tons)",
          type: "number",
          required: true,
          placeholder: "Enter daily volume in tons",
        },
      ]}
    />
  )
}
