"use client"
import { Cart, Customer, Region } from "@medusajs/medusa"
import {
  PricedProduct,
  PricedShippingOption,
} from "@medusajs/medusa/dist/types/pricing"
import MyCheckoutForm from "@modules/checkout/templates/checkout-form/my-checkout-form"
import MyCheckoutSummary from "@modules/checkout/templates/checkout-summary/my-checkout-summary"
import { useState } from "react"
import {
  CartWithCheckoutStep,
  CheckoutFormData,
  CheckoutPackingMethod,
  ProductPreviewType,
} from "types/global"
import Wrapper from "../payment-wrapper"

type MyCheckoutProps = {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">
  cartWithPaymentSessions: CartWithCheckoutStep
  customer: Omit<Customer, "password_hash"> | null
  availableShippingMethods: PricedShippingOption[] | undefined
  weeklyMenu: {
    products: ProductPreviewType[]
    pricedProducts: (PricedProduct | null)[]
    region: Region
  }
}

const MyCheckout: React.FC<MyCheckoutProps> = ({
  cart,
  cartWithPaymentSessions,
  customer,
  availableShippingMethods,
  weeklyMenu,
}) => {
  const [formData, setFormData] = useState<CheckoutFormData>({
    "shipping_address.first_name": cart?.shipping_address?.first_name || "",
    "shipping_address.address_1": cart?.shipping_address?.address_1 || "",
    "shipping_address.phone": cart?.shipping_address?.phone || "",
    email: cart?.email || "",
    "shipping_address.metadata.packing":
    (cart?.shipping_address?.metadata?.packing as CheckoutPackingMethod) ||
    ({} as CheckoutPackingMethod),
    "shipping_address.metadata.order_note":
    (cart?.shipping_address?.metadata?.order_note as string) || "",
    "shipping_address.metadata.is_vnpayment": false,
    // Below fields are not used in the current implementation
    "shipping_address.last_name": "",
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
          weeklyMenu={weeklyMenu}
        />
      </Wrapper>
      <MyCheckoutSummary customer={customer} data={cart} formData={formData} />
    </>
  )
}

export default MyCheckout
