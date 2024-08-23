import { formatVietnamPrice } from "@lib/util/format-price"
import { Cart, Order } from "@medusajs/medusa"
import { clx } from "@medusajs/ui"
import {
  placeOrder,
  setMyAddresses,
  setPackingMethodAndNote,
} from "@modules/checkout/actions"
import ErrorMessage from "@modules/checkout/components/error-message"
import { useState } from "react"

const MyCheckoutSummary = ({
  formData,
  data: cart,
}: {
  formData: any
  data: Omit<Cart, "refundable_amount" | "refunded_total"> | Order
}) => {
  const { subtotal, discount_total, tax_total, shipping_total, total } = cart
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const notReady =
    !cart ||
    !cart.shipping_address ||
    !cart.shipping_address.address_1 ||
    !cart.shipping_address.first_name ||
    !cart.shipping_address.phone ||
    !cart.email ||
    cart.shipping_methods.length < 1
      ? true
      : false

  const onPaymentCompleted = async () => {
    if (notReady) {
      setErrorMessage("Vui lòng điền đầy đủ thông tin")
      setSubmitting(false)
      return
    }

    await placeOrder().catch((err) => {
      setErrorMessage(err.toString())
      setSubmitting(false)
    })
  }

  const onAddressesSet = async () => {
    await setMyAddresses(formData).then((response) => {
      setErrorMessage(response || null)
      errorMessage && setSubmitting(false)
    })
  }

  const onPackingMethodAndNoteSet = async () => {
    await setPackingMethodAndNote(formData).then((response) => {
      setErrorMessage(response || null)
      errorMessage && setSubmitting(false)
    })
  }

  const handleSubmit = () => {
    setSubmitting(true)
    setErrorMessage(null)

    // set addresses
    onAddressesSet()

    // set packing method and order note
    // Medusa does not support update metadata of cart, so we update it in context of cart instead.
    // Github issue: https://github.com/medusajs/medusa/issues/5764
    // update() of Medusa Client: https://docs.medusajs.com/references/js-client/CartsResource#update
    if (!errorMessage) onPackingMethodAndNoteSet()
    else return

    // handle payment
    onPaymentCompleted()
  }

  return (
    <div className="checkout-total">
      <div className="checkout-total-subtotal">
        <div className="checkout-total-line">
          <div>Tiền hàng (Tạm tính)</div>
          <div>{formatVietnamPrice(subtotal)}</div>
        </div>
        <div className="checkout-total-line">
          <div>Phí vận chuyển</div>
          <div>{formatVietnamPrice(shipping_total)}</div>
        </div>
        <div className="checkout-total-line">
          <div>VAT</div>
          <div>{formatVietnamPrice(tax_total || 0)}</div>
        </div>
        {!!discount_total && (
          <div className="checkout-total-sale">
            <div>Giảm giá</div>
            <div>-{formatVietnamPrice(discount_total)}</div>
          </div>
        )}
        <div className="divider-normal"></div>
      </div>
      <div className="checkout-total-final">
        <div className="font-[500]">Tổng cộng</div>
        <div className="font-bold text-[#20419A]">
          {formatVietnamPrice(total)}
        </div>
      </div>
      <div className="checkout-total-submit">
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className={clx(
            "bg-[#20419A] w-full text-white py-2 px-3 rounded-md font-[500] flex items-center justify-center",
            submitting && "opacity-50"
          )}
        >
          Đặt đơn
        </button>
      </div>
      <ErrorMessage
        error={errorMessage}
        data-testid="manual-payment-error-message"
      />
    </div>
  )
}

export default MyCheckoutSummary
