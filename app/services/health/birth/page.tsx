import { ServiceTemplate } from "@/components/service-template"

export default function BirthCertificatePage() {
  return (
    <ServiceTemplate
      title="Birth Certificate Application"
      description="Apply for a birth certificate from Machakos County"
      iconName="Baby"
      iconColor="bg-pink-100 text-pink-600"
      requirements={[
        "Birth notification from hospital",
        "Parents' National IDs or Passports",
        "Marriage certificate (if applicable)",
        "Passport-size photographs of child (2)",
        "Clinic card or immunization record",
      ]}
      processingTime="3-5 working days"
      fee="KES 50"
      serviceCode="BC"
      formFields={[
        {
          name: "childName",
          label: "Child's Full Name",
          type: "text",
          required: true,
          placeholder: "Enter child's name",
        },
        { name: "dateOfBirth", label: "Date of Birth", type: "date", required: true },
        {
          name: "placeOfBirth",
          label: "Place of Birth",
          type: "text",
          required: true,
          placeholder: "Hospital/Location",
        },
        {
          name: "fatherName",
          label: "Father's Name",
          type: "text",
          required: true,
          placeholder: "Enter father's name",
        },
        {
          name: "motherName",
          label: "Mother's Name",
          type: "text",
          required: true,
          placeholder: "Enter mother's name",
        },
        {
          name: "fatherID",
          label: "Father's ID Number",
          type: "text",
          required: true,
          placeholder: "Enter father's ID",
        },
        {
          name: "motherID",
          label: "Mother's ID Number",
          type: "text",
          required: true,
          placeholder: "Enter mother's ID",
        },
        { name: "phoneNumber", label: "Contact Phone", type: "tel", required: true, placeholder: "+254 7XX XXX XXX" },
        {
          name: "gender",
          label: "Child's Gender",
          type: "select",
          required: true,
          placeholder: "Select gender",
          options: [
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
          ],
        },
      ]}
    />
  )
}
