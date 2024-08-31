"use client"
import { paymentInfoMap } from "@lib/constants"
import { Cart } from "@medusajs/medusa"
import { clx } from "@medusajs/ui"
import { setPaymentMethod } from "@modules/checkout/actions"
import LoadingPage from "@modules/common/components/loading"
import CheckboxRound from "@modules/products/components/check-box/check-box-round"
import { Dispatch, Fragment, useEffect, useState } from "react"
import { CheckoutFormData } from "types/global"

type PaymentMethod = "manual" | "vnpay"

const MyPayment = ({
  cart,
  formDataState
}: {
  cart: Omit<Cart, "refundable_amount" | "refunded_total"> | null
  formDataState: {formData: CheckoutFormData, setFormData: Dispatch<any>}
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

  const updateVNPay = (value: boolean) => {
    const vnpayData = {
      ...formDataState.formData,
      "shipping_address.metadata.is_vnpayment": value
    }
    formDataState.setFormData(vnpayData)
  }

  const handleChange = (providerId: PaymentMethod) => {
    setPaymentMethodState(providerId)
    updateVNPay(providerId == "vnpay") // Ghi chú rằng phương thức VNPay có được chọn hay không
    setError(null)
    if (providerId != "vnpay") set(providerId) 
  }

  useEffect(() => {
    if (cart?.payment_sessions?.length) {
      handleChange(cart.payment_sessions[0].provider_id as PaymentMethod)
    }
  }, [])

  useEffect(() => {
    if (error) console.error(error)
  }, [error])

  return (
    <>
      {isLoading && <LoadingPage />}
      <div className="checkout-payment-method">
        <div className="checkout-heading">Phương thức thanh toán</div>
        {cart?.payment_sessions?.length && (
          <div
            className={clx(
              "checkout-options",
              isLoading ? "opacity-50 pointer-events-none" : ""
            )}
          >
            {cart.payment_sessions
              .sort((a, b) => {
                return a.provider_id > b.provider_id ? 1 : -1
              })
              .map((payment_session, index) => {
                const dividerComponent = index > 0 && (
                  <div className="divider-normal"></div>
                )
                return (
                  <Fragment key={index}>
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
                  </Fragment>
                )
              })}
            {cart.payment_sessions.length > 0 && (
              <div className="divider-normal"></div>
            )}
            <div className="checkout-option">
              <CheckboxRound
                checked={paymentMethodState == "vnpay"}
                onChange={() =>
                  paymentMethodState != "vnpay" &&
                  handleChange("vnpay" as PaymentMethod)
                }
              />
              <div className="checkout-option-label">
                {paymentInfoMap["vnpay"].title}
              </div>
              <div>{paymentInfoMap["vnpay"].icon}</div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default MyPayment

const MedusaPayment = ({}: {}) => {
  return
}
