'use client'
import { Customer } from "@medusajs/medusa"
import { PricedShippingOption } from "@medusajs/medusa/dist/types/pricing"
import MyCheckoutForm from "@modules/checkout/templates/checkout-form/my-checkout-form"
import MyCheckoutSummary from "@modules/checkout/templates/checkout-summary/my-checkout-summary"
import { useState } from "react"
import { CartWithCheckoutStep } from "types/global"

type MyCheckoutProps = {
  cart: CartWithCheckoutStep | undefined
  customer: Omit<Customer, "password_hash"> | null
  availableShippingMethods: PricedShippingOption[] | undefined
}

const MyCheckout: React.FC<MyCheckoutProps> = ({
  cart,
  customer,
  availableShippingMethods,
}) => {
  const [formData, setFormData] = useState({
    "shipping_address.first_name": cart?.shipping_address?.first_name || "",
    "shipping_address.last_name": "",
    "shipping_address.address_1": cart?.shipping_address?.address_1 || "",
    "shipping_address.country_code": "vn",
    "shipping_address.phone": cart?.shipping_address?.phone || "",
  })

  return (
    <div>
      <MyCheckoutForm
        cart={cart as CartWithCheckoutStep}
        customer={customer}
        availableShippingMethods={availableShippingMethods}
        formData={formData}
        setFormData={setFormData}
      />
      <MyCheckoutSummary formData={formData} />
    </div>
  )
}

export default MyCheckout
