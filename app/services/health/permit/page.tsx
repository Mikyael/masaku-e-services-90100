import { ServiceTemplate } from "@/components/service-template"

export default function MedicalPermitPage() {
  return (
    <ServiceTemplate
      title="Medical Permit Application"
      description="Apply for a medical permit to operate healthcare services"
      iconName="UserCheck"
      iconColor="bg-blue-100 text-blue-600"
      requirements={[
        "Valid medical license",
        "Professional qualification certificates",
        "Valid National ID or Passport",
        "Medical indemnity insurance",
        "Facility inspection report",
      ]}
      processingTime="5-7 working days"
      fee="KES 5,000"
      validity="1 year"
      serviceCode="MP"
      formFields={[
        {
          name: "facilityName",
          label: "Medical Facility Name",
          type: "text",
          required: true,
          placeholder: "Enter facility name",
        },
        {
          name: "ownerName",
          label: "Owner/Director Name",
          type: "text",
          required: true,
          placeholder: "Enter owner name",
        },
        {
          name: "licenseNumber",
          label: "Medical License Number",
          type: "text",
          required: true,
          placeholder: "Enter license number",
        },
        { name: "idNumber", label: "ID/Passport Number", type: "text", required: true, placeholder: "Enter ID number" },
        { name: "phoneNumber", label: "Phone Number", type: "tel", required: true, placeholder: "+254 7XX XXX XXX" },
        { name: "email", label: "Email Address", type: "email", required: true, placeholder: "Enter email" },
        {
          name: "facilityAddress",
          label: "Facility Address",
          type: "textarea",
          required: true,
          placeholder: "Enter complete address",
        },
        {
          name: "facilityType",
          label: "Type of Medical Facility",
          type: "select",
          required: true,
          placeholder: "Select facility type",
          options: [
            { value: "clinic", label: "Clinic" },
            { value: "hospital", label: "Hospital" },
            { value: "pharmacy", label: "Pharmacy" },
            { value: "laboratory", label: "Laboratory" },
            { value: "dental", label: "Dental Practice" },
          ],
        },
      ]}
    />
  )
}
