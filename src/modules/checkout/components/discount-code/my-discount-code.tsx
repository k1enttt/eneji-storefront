import { formatAmount } from "@lib/util/prices"
import { Cart } from "@medusajs/medusa"
import { removeDiscount, submitDiscountForm } from "@modules/checkout/actions"
import React, { useEffect } from "react"
import { useMemo } from "react"
import { useFormState, useFormStatus } from "react-dom"
import ErrorMessage from "../error-message"
import { formatVietnamPrice } from "@lib/util/format-price"
import { clx } from "@medusajs/ui"

const MyDiscountCode = ({
  className,
  cart,
}: {
  className?: string
  cart: Omit<Cart, "refundable_amount" | "refunded_total">
}) => {
  const { discounts, region } = cart
  const [isLoading, setIsLoading] = React.useState(false)

  const appliedDiscount = useMemo(() => {
    if (!discounts || !discounts.length) {
      return undefined
    }

    switch (discounts[0].rule.type) {
      case "percentage":
        return `${discounts[0].rule.value}%`
      case "fixed":
        return `- ${formatVietnamPrice(discounts[0].rule.value)}`

      default:
        return "Free shipping"
    }
  }, [discounts, region])

  const removeDiscountCode = async () => {
    setIsLoading(true)
    await removeDiscount(discounts[0].code)
      .then(() => setIsLoading(false))
      .catch((e) => {
        console.error(e)
        setIsLoading(false)
      })
  }

  const [message, formAction] = useFormState(submitDiscountForm, null)

  useEffect(() => {
    console.log("Discounts changed", appliedDiscount)
  }, [appliedDiscount])

  return (
    <>
      <div className={className || ""}>
        <div className="checkout-heading">Nhập mã khuyến mãi</div>
        <form action={formAction} className="checkout-discount-code">
          <input
            type="text"
            placeholder="Hãy nhập mã"
            className="checkout-discount-input"
            name="code"
            autoFocus={false}
          />
          <SubmitButton>Áp dụng</SubmitButton>
        </form>
        {appliedDiscount && (
          <div className="flex items-center justify-between border border-green-500 bg-green-200 py-2 px-3 rounded-md">
            <div className="">
              <div
                className="checkout-discount-text"
                data-testid="discount-code"
              >
                Code: {discounts[0].code}
              </div>
              <div
                className="checkout-discount-text"
                data-value={discounts[0].rule.value}
              >
                {appliedDiscount}
              </div>
            </div>
            <button
              disabled={isLoading}
              onClick={removeDiscountCode}
              className={clx(
                "bg-red-500 text-white py-1 px-2 rounded-md",
                isLoading && "opacity-50"
              )}
            >
              Xóa
            </button>
          </div>
        )}
        <ErrorMessage error={message} data-testid="discount-error-message" />
      </div>
    </>
  )
}

export default MyDiscountCode

const SubmitButton = ({ children }: { children: React.ReactNode }) => {
  const pending = useFormStatus().pending
  return (
    <button
      disabled={pending}
      type="submit"
      className={clx("checkout-discount-button", pending && "opacity-50")}
    >
      {children}
    </button>
  )
}
