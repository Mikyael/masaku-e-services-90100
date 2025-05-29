import { ServiceTemplate } from "@/components/service-template"

export default function BoreholePermitPage() {
  return (
    <ServiceTemplate
      title="Borehole Permit Application"
      description="Apply for a permit to drill a borehole in Machakos County"
      iconName="Droplets"
      iconColor="bg-cyan-100 text-cyan-600"
      requirements={[
        "Valid National ID or Passport",
        "Title deed or lease agreement",
        "Site plan and location map",
        "Hydrogeological survey report",
        "Environmental impact assessment",
      ]}
      processingTime="10-15 working days"
      fee="KES 5,000"
      validity="5 years"
      serviceCode="BHP"
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
          name: "propertyLocation",
          label: "Property Location",
          type: "textarea",
          required: true,
          placeholder: "Enter complete address and GPS coordinates",
        },
        { name: "plotNumber", label: "Plot Number", type: "text", required: true, placeholder: "Enter plot number" },
        {
          name: "boreholeDepth",
          label: "Proposed Borehole Depth (meters)",
          type: "number",
          required: true,
          placeholder: "Enter depth in meters",
        },
        {
          name: "waterUse",
          label: "Intended Water Use",
          type: "select",
          required: true,
          placeholder: "Select water use",
          options: [
            { value: "domestic", label: "Domestic Use" },
            { value: "irrigation", label: "Irrigation" },
            { value: "commercial", label: "Commercial" },
            { value: "industrial", label: "Industrial" },
          ],
        },
      ]}
    />
  )
}
