import { Metadata } from "next"
import { cookies } from "next/headers"
import { notFound, useParams } from "next/navigation"
import { Cart, LineItem } from "@medusajs/medusa"

import { enrichLineItems } from "@modules/cart/actions"
import Wrapper from "@modules/checkout/components/payment-wrapper"
import CheckoutForm from "@modules/checkout/templates/checkout-form"
import CheckoutSummary from "@modules/checkout/templates/checkout-summary"
import {
  createPaymentSessions,
  getCart,
  getCustomer,
  getRegion,
  listCartShippingMethods,
} from "@lib/data"
import { CartWithCheckoutStep } from "types/global"
import MyCheckout from "@modules/checkout/components/my-checkout"
import { getPricedProducts, getWeeklyMenu } from "app/[countryCode]/(main)/page"

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

export default async function Checkout({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
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

  // create payment sessions and get cart
  const cartWithPaymentSessions = (await createPaymentSessions(cart.id).then(
    (cart) => cart
  )) as CartWithCheckoutStep

  // get weekly menu
  const weeklyMenu = await getWeeklyMenu(countryCode)

  const region = await getRegion(countryCode)
  if (!region) throw new Error("Region not found")

  const pricedWeeklyMenu = await getPricedProducts(weeklyMenu, region)

  return (
    <div className="checkout-background">
      <MyCheckout
        cart={cart}
        cartWithPaymentSessions={cartWithPaymentSessions}
        customer={customer}
        availableShippingMethods={availableShippingMethods}
        weeklyMenu={{ products: weeklyMenu, pricedProducts: pricedWeeklyMenu, region }}
      />
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
