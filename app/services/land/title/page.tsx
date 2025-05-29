import { ServiceTemplate } from "@/components/service-template"

export default function TitleDeedPage() {
  return (
    <ServiceTemplate
      title="Title Deed Services"
      description="Apply for title deed processing and related land services"
      iconName="FileText"
      iconColor="bg-purple-100 text-purple-600"
      requirements={[
        "Original sale agreement",
        "Survey plan",
        "Land control board consent",
        "Valid National ID or Passport",
        "Land rates clearance certificate",
      ]}
      processingTime="10-15 working days"
      fee="KES 3,000"
      serviceCode="TD"
      formFields={[
        {
          name: "applicantName",
          label: "Applicant's Name",
          type: "text",
          required: true,
          placeholder: "Enter full name",
        },
        { name: "idNumber", label: "ID/Passport Number", type: "text", required: true, placeholder: "Enter ID number" },
        { name: "phoneNumber", label: "Phone Number", type: "tel", required: true, placeholder: "+254 7XX XXX XXX" },
        { name: "email", label: "Email Address", type: "email", placeholder: "Enter email" },
        { name: "plotNumber", label: "Plot Number", type: "text", required: true, placeholder: "Enter plot number" },
        { name: "landLocation", label: "Land Location", type: "text", required: true, placeholder: "Enter location" },
        { name: "landSize", label: "Land Size (Acres)", type: "number", required: true, placeholder: "Enter size" },
        {
          name: "serviceType",
          label: "Service Required",
          type: "select",
          required: true,
          placeholder: "Select service",
          options: [
            { value: "first-registration", label: "First Registration" },
            { value: "transfer", label: "Transfer of Title" },
            { value: "subdivision", label: "Subdivision" },
            { value: "mutation", label: "Mutation" },
          ],
        },
      ]}
    />
  )
}
