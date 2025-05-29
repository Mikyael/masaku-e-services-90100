import { ServiceTemplate } from "@/components/service-template"

export default function DeathCertificatePage() {
  return (
    <ServiceTemplate
      title="Death Certificate Application"
      description="Apply for a death certificate from Machakos County"
      iconName="Cross"
      iconColor="bg-gray-100 text-gray-600"
      requirements={[
        "Death notification from hospital/doctor",
        "Deceased's National ID or Passport",
        "Next of kin's National ID",
        "Burial permit (if applicable)",
        "Medical report (cause of death)",
      ]}
      processingTime="2-3 working days"
      fee="KES 50"
      serviceCode="DC"
      formFields={[
        {
          name: "deceasedName",
          label: "Deceased's Full Name",
          type: "text",
          required: true,
          placeholder: "Enter deceased's name",
        },
        { name: "dateOfDeath", label: "Date of Death", type: "date", required: true },
        {
          name: "placeOfDeath",
          label: "Place of Death",
          type: "text",
          required: true,
          placeholder: "Hospital/Location",
        },
        {
          name: "causeOfDeath",
          label: "Cause of Death",
          type: "text",
          required: true,
          placeholder: "Enter cause of death",
        },
        {
          name: "deceasedID",
          label: "Deceased's ID Number",
          type: "text",
          required: true,
          placeholder: "Enter ID number",
        },
        {
          name: "applicantName",
          label: "Applicant's Name",
          type: "text",
          required: true,
          placeholder: "Enter your name",
        },
        {
          name: "applicantID",
          label: "Applicant's ID Number",
          type: "text",
          required: true,
          placeholder: "Enter your ID",
        },
        {
          name: "relationship",
          label: "Relationship to Deceased",
          type: "text",
          required: true,
          placeholder: "e.g., Spouse, Child",
        },
        { name: "phoneNumber", label: "Contact Phone", type: "tel", required: true, placeholder: "+254 7XX XXX XXX" },
      ]}
    />
  )
}
