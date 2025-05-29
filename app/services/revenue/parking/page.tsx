import { ServiceTemplate } from "@/components/service-template"

export default function ParkingFeePaymentPage() {
  return (
    <ServiceTemplate
      title="Parking Fee Payment"
      description="Pay parking fees for designated parking areas in Machakos County"
      iconName="Car"
      iconColor="bg-blue-100 text-blue-600"
      requirements={[
        "Valid National ID or Passport",
        "Vehicle registration certificate",
        "Previous parking receipts (if available)",
      ]}
      processingTime="Instant"
      fee="As per parking zone"
      serviceCode="PFP"
      formFields={[
        { name: "driverName", label: "Driver Name", type: "text", required: true, placeholder: "Enter driver name" },
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
            { value: "car", label: "Car" },
            { value: "motorcycle", label: "Motorcycle" },
            { value: "truck", label: "Truck" },
            { value: "bus", label: "Bus" },
          ],
        },
        {
          name: "parkingZone",
          label: "Parking Zone",
          type: "select",
          required: true,
          placeholder: "Select parking zone",
          options: [
            { value: "cbd-zone-a", label: "CBD Zone A" },
            { value: "cbd-zone-b", label: "CBD Zone B" },
            { value: "market-area", label: "Market Area" },
            { value: "hospital-area", label: "Hospital Area" },
          ],
        },
        {
          name: "duration",
          label: "Parking Duration",
          type: "select",
          required: true,
          placeholder: "Select duration",
          options: [
            { value: "hourly", label: "Hourly" },
            { value: "daily", label: "Daily" },
            { value: "weekly", label: "Weekly" },
            { value: "monthly", label: "Monthly" },
          ],
        },
      ]}
    />
  )
}
