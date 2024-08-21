"use client"
import { Cart, Customer } from "@medusajs/medusa"
import { PricedShippingOption } from "@medusajs/medusa/dist/types/pricing"
import { Button, clx, RadioGroup } from "@medusajs/ui"
import { useParams } from "next/navigation"
import { useState } from "react"

type ShippingProps = {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">
  availableShippingMethods: PricedShippingOption[] | null
  className?: string
}

const MyShipping: React.FC<ShippingProps> = ({
  className,
  cart,
  availableShippingMethods,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const params = useParams()

  const countryCode = params.countryCode as string

  const availableShippingMethodNames =
    availableShippingMethods?.map((method) => method.name) || []

  const [shippingMethod, setShippingMethod] = useState<string | undefined>(
    availableShippingMethodNames[0]
  )

  return (
    <div className={className || ""}>
      {availableShippingMethodNames.map((method) => (
        <button
          onClick={() => setShippingMethod(method)}
          className={clx(
            "checkout-shipping-method",
            shippingMethod == method
              ? "bg-[#20419A] text-white font-bold"
              : "font-[500]"
          )}
        >
          <div className="checkout-shipping-text">{method}</div>
        </button>
      ))}
    </div>
  )
}

export default MyShipping
