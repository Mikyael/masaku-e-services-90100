import { ServiceTemplate } from "@/components/service-template"

export default function MatatuPermitPage() {
  return (
    <ServiceTemplate
      title="Matatu Permit Application"
      description="Apply for matatu operating permit in Machakos County"
      iconName="Car"
      iconColor="bg-blue-100 text-blue-600"
      requirements={[
        "Valid driving license",
        "Vehicle registration certificate",
        "Insurance certificate",
        "Valid National ID or Passport",
        "Medical certificate",
        "Certificate of good conduct",
      ]}
      processingTime="10-15 working days"
      fee="KES 5,000"
      validity="1 year"
      serviceCode="MP"
      formFields={[
        {
          name: "applicantName",
          label: "Applicant Name",
          type: "text",
          required: true,
          placeholder: "Enter full name",
        },
        { name: "idNumber", label: "ID/Passport Number", type: "text", required: true, placeholder: "Enter ID number" },
        {
          name: "drivingLicense",
          label: "Driving License Number",
          type: "text",
          required: true,
          placeholder: "Enter license number",
        },
        { name: "phoneNumber", label: "Phone Number", type: "tel", required: true, placeholder: "+254 7XX XXX XXX" },
        { name: "email", label: "Email Address", type: "email", placeholder: "Enter email" },
        {
          name: "vehicleReg",
          label: "Vehicle Registration",
          type: "text",
          required: true,
          placeholder: "Enter registration number",
        },
        {
          name: "route",
          label: "Proposed Route",
          type: "text",
          required: true,
          placeholder: "e.g., Machakos - Nairobi",
        },
        {
          name: "saccoName",
          label: "SACCO Name",
          type: "text",
          required: true,
          placeholder: "Enter SACCO name",
        },
      ]}
    />
  )
}
