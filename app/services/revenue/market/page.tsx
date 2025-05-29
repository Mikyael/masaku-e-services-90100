import { ServiceTemplate } from "@/components/service-template"

export default function MarketFeePaymentPage() {
  return (
    <ServiceTemplate
      title="Market Fee Payment"
      description="Pay market fees for your stall or space in Machakos County markets"
      iconName="Store"
      iconColor="bg-green-100 text-green-600"
      requirements={[
        "Valid National ID or Passport",
        "Market stall allocation letter",
        "Previous payment receipts (if available)",
      ]}
      processingTime="Instant"
      fee="As per market rates"
      serviceCode="MFP"
      formFields={[
        {
          name: "stallOwner",
          label: "Stall Owner Name",
          type: "text",
          required: true,
          placeholder: "Enter owner name",
        },
        { name: "idNumber", label: "ID/Passport Number", type: "text", required: true, placeholder: "Enter ID number" },
        { name: "phoneNumber", label: "Phone Number", type: "tel", required: true, placeholder: "+254 7XX XXX XXX" },
        { name: "email", label: "Email Address", type: "email", placeholder: "Enter email" },
        {
          name: "marketName",
          label: "Market Name",
          type: "select",
          required: true,
          placeholder: "Select market",
          options: [
            { value: "machakos-main", label: "Machakos Main Market" },
            { value: "kangundo-market", label: "Kangundo Market" },
            { value: "matungulu-market", label: "Matungulu Market" },
            { value: "kathiani-market", label: "Kathiani Market" },
          ],
        },
        { name: "stallNumber", label: "Stall Number", type: "text", required: true, placeholder: "Enter stall number" },
        {
          name: "paymentPeriod",
          label: "Payment Period",
          type: "select",
          required: true,
          placeholder: "Select period",
          options: [
            { value: "daily", label: "Daily" },
            { value: "weekly", label: "Weekly" },
            { value: "monthly", label: "Monthly" },
            { value: "quarterly", label: "Quarterly" },
          ],
        },
        {
          name: "businessType",
          label: "Type of Business",
          type: "text",
          required: true,
          placeholder: "e.g., Vegetables, Clothes, Electronics",
        },
      ]}
    />
  )
}
