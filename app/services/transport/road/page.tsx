import { ServiceTemplate } from "@/components/service-template"

export default function RoadMaintenancePage() {
  return (
    <ServiceTemplate
      title="Road Maintenance Request"
      description="Request road maintenance services in Machakos County"
      iconName="Car"
      iconColor="bg-gray-100 text-gray-600"
      requirements={[
        "Valid National ID or Passport",
        "Location details and photos",
        "Description of road condition",
        "Contact information",
      ]}
      processingTime="7-14 working days"
      fee="Free"
      serviceCode="RMR"
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
        { name: "email", label: "Email Address", type: "email", placeholder: "Enter email" },
        {
          name: "roadLocation",
          label: "Road Location",
          type: "textarea",
          required: true,
          placeholder: "Provide detailed location of the road",
        },
        {
          name: "roadName",
          label: "Road Name (if known)",
          type: "text",
          placeholder: "Enter road name",
        },
        {
          name: "issueType",
          label: "Type of Issue",
          type: "select",
          required: true,
          placeholder: "Select issue type",
          options: [
            { value: "potholes", label: "Potholes" },
            { value: "drainage", label: "Drainage Issues" },
            { value: "surface-damage", label: "Surface Damage" },
            { value: "signage", label: "Missing/Damaged Signage" },
          ],
        },
        {
          name: "issueDescription",
          label: "Issue Description",
          type: "textarea",
          required: true,
          placeholder: "Describe the road maintenance issue in detail",
        },
      ]}
    />
  )
}
