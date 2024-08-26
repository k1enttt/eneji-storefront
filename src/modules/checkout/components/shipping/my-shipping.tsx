"use client"
import { PricedShippingOption } from "@medusajs/medusa/dist/types/pricing"
import { clx } from "@medusajs/ui"
import { useEffect, useState } from "react"
import { setShippingMethod } from "@modules/checkout/actions"

type ShippingProps = {
  availableShippingMethods: PricedShippingOption[] | null
}

const MyShipping: React.FC<ShippingProps> = ({ availableShippingMethods }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [shippingMethodState, setShippingMethodState] = useState<
    string | undefined
  >(availableShippingMethods ? availableShippingMethods[0].id : undefined)

  const set = async (id: string) => {
    setIsLoading(true)
    await setShippingMethod(id)
      .then(() => {
        setIsLoading(false)
        setShippingMethodState(id)
      })
      .catch((err) => {
        setError(err.toString())
        setIsLoading(false)
      })
  }

  const handleChange = (value: string) => {
    set(value)
  }

  useEffect(() => {
    if (error) console.error(error)
  }, [error])

  useEffect(() => {
    if (availableShippingMethods && availableShippingMethods[0].id)
      set(availableShippingMethods[0].id)
  }, [])

  return (
    <div
      className={clx("checkout-shipping-methods", isLoading && "opacity-50")}
    >
      {availableShippingMethods &&
        availableShippingMethods.map((method) => (
          <button
            disabled={isLoading}
            onClick={() => method.id && handleChange(method.id)}
            className={clx(
              "checkout-shipping-method",
              shippingMethodState == method.id
                ? "bg-[#20419A] text-white font-bold"
                : "font-[500]"
            )}
          >
            <div className="checkout-shipping-text">{method.name}</div>
          </button>
        ))}
    </div>
  )
}

export default MyShipping
