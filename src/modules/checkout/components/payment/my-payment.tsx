"use client"
import { paymentInfoMap } from "@lib/constants"
import { Cart } from "@medusajs/medusa"
import { clx } from "@medusajs/ui"
import { setPaymentMethod } from "@modules/checkout/actions"
import CheckboxRound from "@modules/products/components/check-box/check-box-round"
import { useEffect, useState } from "react"

type PaymentMethod = "manual"

const MyPayment = ({
  className,
  cart,
}: {
  className?: string
  cart: Omit<Cart, "refundable_amount" | "refunded_total"> | null
}) => {
  const [paymentMethodState, setPaymentMethodState] =
    useState<PaymentMethod>("manual")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const set = async (providerId: string) => {
    setIsLoading(true)
    await setPaymentMethod(providerId)
      .catch((err) => setError(err.toString()))
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handleChange = (providerId: PaymentMethod) => {
    setPaymentMethodState(providerId)
    setError(null)
    set(providerId)
  }

  useEffect(() => {
    if (cart?.payment_sessions?.length) {
      setPaymentMethodState(
        cart.payment_sessions[0].provider_id as PaymentMethod
      )
    }
  }, [])

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className={className || ""}>
      <div className="checkout-heading">Phương thức thanh toán</div>
      {cart?.payment_sessions?.length && (
        <div
        className={clx("checkout-options", isLoading ? "opacity-50 pointer-events-none" : "")}>
          {cart.payment_sessions
            .sort((a, b) => {
              return a.provider_id > b.provider_id ? 1 : -1
            })
            .map((payment_session, index) => {
              const dividerComponent = index > 0 && (
                <div className="checkout-divider-normal"></div>
              )
              return (
                <>
                  {dividerComponent}
                  <div className="checkout-option">
                    <CheckboxRound
                      checked={
                        paymentMethodState == payment_session.provider_id
                      }
                      onChange={() =>
                        paymentMethodState != payment_session.provider_id &&
                        handleChange(
                          payment_session.provider_id as PaymentMethod
                        )
                      }
                    />
                    <div className="checkout-option-label">
                      {paymentInfoMap[payment_session.provider_id].title}
                    </div>
                    <div>
                      {paymentInfoMap[payment_session.provider_id].icon}
                    </div>
                  </div>
                </>
              )
            })}
        </div>
      )}
    </div>
  )
}

export default MyPayment

const MedusaPayment = ({}: {}) => {
  return
}
