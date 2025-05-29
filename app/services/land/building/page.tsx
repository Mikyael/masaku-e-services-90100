import { ServiceTemplate } from "@/components/service-template"

export default function BuildingPlanPage() {
  return (
    <ServiceTemplate
      title="Building Plan Approval"
      description="Apply for building plan approval in Machakos County"
      iconName="Home"
      iconColor="bg-orange-100 text-orange-600"
      requirements={[
        "Architectural drawings",
        "Structural drawings",
        "Title deed or lease agreement",
        "Site plan",
        "Environmental impact assessment",
      ]}
      processingTime="15-20 working days"
      fee="KES 10,000"
      validity="2 years"
      serviceCode="BP"
      formFields={[
        { name: "ownerName", label: "Property Owner", type: "text", required: true, placeholder: "Enter owner name" },
        {
          name: "architectName",
          label: "Architect Name",
          type: "text",
          required: true,
          placeholder: "Enter architect name",
        },
        { name: "idNumber", label: "ID/Passport Number", type: "text", required: true, placeholder: "Enter ID number" },
        { name: "phoneNumber", label: "Phone Number", type: "tel", required: true, placeholder: "+254 7XX XXX XXX" },
        { name: "email", label: "Email Address", type: "email", required: true, placeholder: "Enter email" },
        { name: "plotNumber", label: "Plot Number", type: "text", required: true, placeholder: "Enter plot number" },
        {
          name: "buildingLocation",
          label: "Building Location",
          type: "textarea",
          required: true,
          placeholder: "Enter complete address",
        },
        {
          name: "buildingType",
          label: "Type of Building",
          type: "select",
          required: true,
          placeholder: "Select building type",
          options: [
            { value: "residential", label: "Residential" },
            { value: "commercial", label: "Commercial" },
            { value: "industrial", label: "Industrial" },
            { value: "institutional", label: "Institutional" },
          ],
        },
      ]}
    />
  )
}
