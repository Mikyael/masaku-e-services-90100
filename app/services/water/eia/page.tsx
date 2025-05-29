import { ServiceTemplate } from "@/components/service-template"

export default function EnvironmentalImpactPage() {
  return (
    <ServiceTemplate
      title="Environmental Impact Assessment"
      description="Apply for Environmental Impact Assessment in Machakos County"
      iconName="Droplets"
      iconColor="bg-green-100 text-green-600"
      requirements={[
        "Valid National ID or Passport",
        "Project proposal document",
        "Site location map",
        "Technical drawings/plans",
        "Land ownership documents",
      ]}
      processingTime="30-45 working days"
      fee="KES 25,000"
      validity="3 years"
      serviceCode="EIA"
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
          name: "projectName",
          label: "Project Name",
          type: "text",
          required: true,
          placeholder: "Enter project name",
        },
        {
          name: "projectLocation",
          label: "Project Location",
          type: "textarea",
          required: true,
          placeholder: "Enter complete project location",
        },
        {
          name: "projectType",
          label: "Project Type",
          type: "select",
          required: true,
          placeholder: "Select project type",
          options: [
            { value: "construction", label: "Construction Project" },
            { value: "mining", label: "Mining Project" },
            { value: "industrial", label: "Industrial Development" },
            { value: "infrastructure", label: "Infrastructure Project" },
          ],
        },
        {
          name: "projectDescription",
          label: "Project Description",
          type: "textarea",
          required: true,
          placeholder: "Describe the project in detail",
        },
      ]}
    />
  )
}
