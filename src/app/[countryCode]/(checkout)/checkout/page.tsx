import { Metadata } from "next"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import { Cart, LineItem } from "@medusajs/medusa"

import { enrichLineItems } from "@modules/cart/actions"
import Wrapper from "@modules/checkout/components/payment-wrapper"
import CheckoutForm from "@modules/checkout/templates/checkout-form"
import CheckoutSummary from "@modules/checkout/templates/checkout-summary"
import {
  getCart,
  getCustomer,
  listCartShippingMethods,
} from "@lib/data"
import { CartWithCheckoutStep } from "types/global"
import MyCheckout from "@modules/checkout/components/my-checkout"

export const metadata: Metadata = {
  title: "Checkout",
}

const fetchCart = async () => {
  const cartId = cookies().get("_medusa_cart_id")?.value

  if (!cartId) {
    return notFound()
  }

  const cart = await getCart(cartId).then((cart) => cart)

  if (cart?.items.length) {
    const enrichedItems = await enrichLineItems(cart?.items, cart?.region_id)
    cart.items = enrichedItems as LineItem[]
  }

  return cart
}

export default async function Checkout() {
  const cart = await fetchCart()

  if (!cart) {
    return notFound()
  }

  // get available shipping methods
  const availableShippingMethods = await listCartShippingMethods(cart.id).then(
    (methods) => methods?.filter((m) => !m.is_return)
  )

  // get customer if logged in
  const customer = await getCustomer()

  return (
    <div className="checkout-background">
      <MyCheckout
        cart={cart as CartWithCheckoutStep}
        customer={customer}
        availableShippingMethods={availableShippingMethods} />
    </div>
  )
}

const MedusaCheckout = ({
  cart,
}: {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">
}) => (
  <div className="grid grid-cols-1 small:grid-cols-[1fr_416px] content-container gap-x-40 py-12">
    <Wrapper cart={cart}>
      <CheckoutForm />
    </Wrapper>
    <CheckoutSummary />
  </div>
)
