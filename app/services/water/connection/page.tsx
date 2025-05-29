import { ServiceTemplate } from "@/components/service-template"

export default function WaterConnectionPage() {
  return (
    <ServiceTemplate
      title="Water Connection Application"
      description="Apply for new water connection in Machakos County"
      iconName="Droplets"
      iconColor="bg-cyan-100 text-cyan-600"
      requirements={[
        "Valid National ID or Passport",
        "Title deed or lease agreement",
        "Site plan",
        "Passport-size photographs (2)",
        "Application fee payment",
      ]}
      processingTime="5-7 working days"
      fee="KES 3,500"
      serviceCode="WC"
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
          name: "propertyLocation",
          label: "Property Location",
          type: "textarea",
          required: true,
          placeholder: "Enter complete address",
        },
        { name: "plotNumber", label: "Plot Number", type: "text", required: true, placeholder: "Enter plot number" },
        {
          name: "connectionType",
          label: "Connection Type",
          type: "select",
          required: true,
          placeholder: "Select connection type",
          options: [
            { value: "domestic", label: "Domestic" },
            { value: "commercial", label: "Commercial" },
            { value: "industrial", label: "Industrial" },
            { value: "institutional", label: "Institutional" },
          ],
        },
        {
          name: "meterSize",
          label: "Meter Size",
          type: "select",
          required: true,
          placeholder: "Select meter size",
          options: [
            { value: "15mm", label: "15mm" },
            { value: "20mm", label: "20mm" },
            { value: "25mm", label: "25mm" },
            { value: "32mm", label: "32mm" },
          ],
        },
      ]}
    />
  )
}
