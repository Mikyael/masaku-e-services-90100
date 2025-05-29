import { ServiceTemplate } from "@/components/service-template"

export default function ParkingPermitPage() {
  return (
    <ServiceTemplate
      title="Parking Permit Application"
      description="Apply for parking permit in designated areas of Machakos County"
      iconName="Car"
      iconColor="bg-purple-100 text-purple-600"
      requirements={[
        "Valid National ID or Passport",
        "Vehicle registration certificate",
        "Insurance certificate",
        "Business permit (for commercial vehicles)",
      ]}
      processingTime="1-2 working days"
      fee="KES 500"
      validity="1 year"
      serviceCode="PP"
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
          name: "vehicleReg",
          label: "Vehicle Registration",
          type: "text",
          required: true,
          placeholder: "Enter registration number",
        },
        {
          name: "vehicleType",
          label: "Vehicle Type",
          type: "select",
          required: true,
          placeholder: "Select vehicle type",
          options: [
            { value: "private-car", label: "Private Car" },
            { value: "commercial-vehicle", label: "Commercial Vehicle" },
            { value: "motorcycle", label: "Motorcycle" },
            { value: "truck", label: "Truck" },
          ],
        },
        {
          name: "parkingArea",
          label: "Preferred Parking Area",
          type: "select",
          required: true,
          placeholder: "Select parking area",
          options: [
            { value: "cbd-main", label: "CBD Main Area" },
            { value: "market-area", label: "Market Area" },
            { value: "hospital-area", label: "Hospital Area" },
            { value: "bus-station", label: "Bus Station Area" },
          ],
        },
        {
          name: "permitType",
          label: "Permit Type",
          type: "select",
          required: true,
          placeholder: "Select permit type",
          options: [
            { value: "monthly", label: "Monthly Permit" },
            { value: "quarterly", label: "Quarterly Permit" },
            { value: "annual", label: "Annual Permit" },
          ],
        },
      ]}
    />
  )
}
