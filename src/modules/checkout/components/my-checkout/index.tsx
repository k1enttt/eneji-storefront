"use client"
import { Cart, Customer } from "@medusajs/medusa"
import { PricedShippingOption } from "@medusajs/medusa/dist/types/pricing"
import MyCheckoutForm from "@modules/checkout/templates/checkout-form/my-checkout-form"
import MyCheckoutSummary from "@modules/checkout/templates/checkout-summary/my-checkout-summary"
import { useState } from "react"
import { CartWithCheckoutStep } from "types/global"
import Wrapper from "../payment-wrapper"

type MyCheckoutProps = {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">
  cartWithPaymentSessions: CartWithCheckoutStep
  customer: Omit<Customer, "password_hash"> | null
  availableShippingMethods: PricedShippingOption[] | undefined
}

const MyCheckout: React.FC<MyCheckoutProps> = ({
  cart,
  cartWithPaymentSessions,
  customer,
  availableShippingMethods,
}) => {
  const [formData, setFormData] = useState({
    "shipping_address.first_name": cart?.shipping_address?.first_name || "",
    "shipping_address.address_1": cart?.shipping_address?.address_1 || "",
    "shipping_address.phone": cart?.shipping_address?.phone || "",
    email: cart?.email || "",
    "metadata.packing": "",
    "metadata.order_note": "",
    // Other fields are not used in the form
    "shipping_address.last_name": "",
    "shipping_address.company": "",
    "shipping_address.postal_code": "",
    "shipping_address.city": "",
    "shipping_address.country_code": "vn",
    "shipping_address.province": "",
  })

  return (
    <>
      <Wrapper cart={cart}>
        <MyCheckoutForm
          cart={cartWithPaymentSessions}
          customer={customer}
          availableShippingMethods={availableShippingMethods}
          formData={formData}
          setFormData={setFormData}
        />
      </Wrapper>
      <MyCheckoutSummary data={cart} formData={formData} />
    </>
  )
}

export default MyCheckout
