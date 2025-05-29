import { ServiceTemplate } from "@/components/service-template"

export default function TransportLicensePage() {
  return (
    <ServiceTemplate
      title="Transport License Application"
      description="Apply for transport license in Machakos County"
      iconName="Car"
      iconColor="bg-orange-100 text-orange-600"
      requirements={[
        "Valid driving license",
        "Vehicle registration certificate",
        "Insurance certificate",
        "Valid National ID or Passport",
        "Medical certificate",
      ]}
      processingTime="5-7 working days"
      fee="KES 2,000"
      validity="1 year"
      serviceCode="TL"
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
        { name: "route", label: "Proposed Route", type: "text", required: true, placeholder: "Enter route details" },
        {
          name: "licenseType",
          label: "License Type",
          type: "select",
          required: true,
          placeholder: "Select license type",
          options: [
            { value: "psvl", label: "Public Service Vehicle License" },
            { value: "goods", label: "Goods Vehicle License" },
            { value: "taxi", label: "Taxi License" },
            { value: "boda-boda", label: "Boda Boda License" },
          ],
        },
      ]}
    />
  )
}
