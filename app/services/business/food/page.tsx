import { ServiceTemplate } from "@/components/service-template"

export default function FoodHandlerPage() {
  return (
    <ServiceTemplate
      title="Food Handler's Permit"
      description="Apply for a food handler's permit to work in food service establishments"
      iconName="Utensils"
      iconColor="bg-green-100 text-green-600"
      requirements={[
        "Valid National ID or Passport",
        "Medical certificate",
        "Passport-size photographs (2)",
        "Previous food handler's certificate (if renewal)",
      ]}
      processingTime="2-3 working days"
      fee="KES 300"
      validity="1 year"
      serviceCode="FH"
      formFields={[
        { name: "fullName", label: "Full Name", type: "text", required: true, placeholder: "Enter full name" },
        { name: "idNumber", label: "ID/Passport Number", type: "text", required: true, placeholder: "Enter ID number" },
        { name: "dateOfBirth", label: "Date of Birth", type: "date", required: true },
        { name: "phoneNumber", label: "Phone Number", type: "tel", required: true, placeholder: "+254 7XX XXX XXX" },
        { name: "email", label: "Email Address", type: "email", placeholder: "Enter email" },
        { name: "address", label: "Residential Address", type: "text", required: true, placeholder: "Enter address" },
        {
          name: "employer",
          label: "Employer/Business",
          type: "text",
          required: true,
          placeholder: "Enter employer name",
        },
        {
          name: "workType",
          label: "Type of Work",
          type: "select",
          required: true,
          placeholder: "Select work type",
          options: [
            { value: "food-preparation", label: "Food Preparation" },
            { value: "food-service", label: "Food Service" },
            { value: "food-handling", label: "Food Handling" },
            { value: "kitchen-staff", label: "Kitchen Staff" },
          ],
        },
      ]}
    />
  )
}
