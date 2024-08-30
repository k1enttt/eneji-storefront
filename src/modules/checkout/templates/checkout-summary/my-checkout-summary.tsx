import { formatVietnamPrice } from "@lib/util/format-price"
import { Cart, Order } from "@medusajs/medusa"
import { clx } from "@medusajs/ui"
import {
  createVnPaymentUrl,
  placeOrder,
  setMyAddresses,
  setPackingMethodAndNote,
} from "@modules/checkout/actions"
import ErrorMessage from "@modules/checkout/components/error-message"
import LoadingPage from "@modules/common/components/loading"
import { set } from "lodash"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { CheckoutFormData } from "types/global"

const MyCheckoutSummary = ({
  formData,
  data: cart,
}: {
  formData: CheckoutFormData
  data: Omit<Cart, "refundable_amount" | "refunded_total"> | Order
}) => {
  const searchParams = useSearchParams()
  const { subtotal, discount_total, tax_total, shipping_total, total } = cart
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const notReady =
    !cart ||
    !cart.shipping_address ||
    !formData["shipping_address.address_1"] ||
    !formData["shipping_address.first_name"] ||
    !formData["shipping_address.phone"] ||
    !formData.email ||
    cart.shipping_methods.length < 1
      ? true
      : false

  const onPaymentCompleted = async () => {
    if (notReady) {
      if (!cart) {
        setErrorMessage("Giỏ hàng trống")
      } else if (!cart.shipping_address) {
        setErrorMessage("Vui lòng nhập đầy đủ thông tin giao hàng")
      } else if (!formData["shipping_address.address_1"]) {
        setErrorMessage("Vui lòng nhập đầy đủ địa chỉ giao hàng")
      } else if (!formData["shipping_address.first_name"]) {
        setErrorMessage("Vui lòng nhập tên")
      } else if (!formData["shipping_address.phone"]) {
        setErrorMessage("Vui lòng nhập số điện thoại")
      } else if (!formData.email) {
        setErrorMessage("Vui lòng nhập email")
      } else if (cart.shipping_methods.length < 1) {
        setErrorMessage("Vui lòng chọn phương thức vận chuyển")
      }
      setSubmitting(false)
      return
    }

    await setMyAddresses(formData).then(async (response) => {
      setErrorMessage(response || null)
      if (errorMessage) {
        setSubmitting(false)
        return
      } else
        await setPackingMethodAndNote(formData).then(async (response) => {
          setErrorMessage(response || null)
          if (errorMessage) {
            setSubmitting(false)
            return
          } else
            await placeOrder().catch((err) => {
              setErrorMessage(err.toString())
              setSubmitting(false)
            })
        })
    })
  }

  const handleSubmit = () => {
    setSubmitting(true)
    setErrorMessage(null)

    // handle payment
    onPaymentCompleted()
  }

  const onVnPaymentCompleted = async () => {
    if (notReady) {
      if (!cart) {
        setErrorMessage("Giỏ hàng trống")
      } else if (!cart.shipping_address) {
        setErrorMessage("Vui lòng nhập đầy đủ thông tin giao hàng")
      } else if (!formData["shipping_address.address_1"]) {
        setErrorMessage("Vui lòng nhập đầy đủ địa chỉ giao hàng")
      } else if (!formData["shipping_address.first_name"]) {
        setErrorMessage("Vui lòng nhập tên")
      } else if (!formData["shipping_address.phone"]) {
        setErrorMessage("Vui lòng nhập số điện thoại")
      } else if (!formData.email) {
        setErrorMessage("Vui lòng nhập email")
      } else if (cart.shipping_methods.length < 1) {
        setErrorMessage("Vui lòng chọn phương thức vận chuyển")
      }
      setSubmitting(false)
      return
    }

    const vnPaymentData = {
      orderId: cart.id,
      total: cart.total || 0,
      returnUrl: "http://localhost:8000/vn/fallback",
    }

    console.log("Đang cập nhật thông tin giao hàng")
    await setMyAddresses(formData).then(async (response) => {
      setErrorMessage(response || null)
      if (errorMessage) {
        setSubmitting(false)
        return
      } else console.log("Đang thiết lập thanh toán vnpay")
      await createVnPaymentUrl(vnPaymentData).then(async (response) => {
        setErrorMessage(response ? response.error || null : null)
        if (errorMessage) {
          setSubmitting(false)
          return
        } else {
          if (response && response.data) {
            window.location.href = response.data
          }
          setSubmitting(false)
          // await placeOrder().catch((err) => {
          //   setErrorMessage(err.toString())
          //   setSubmitting(false)
          // })
        }
      })
    })
  }

  const onPlacedOrder = async () => {
    await placeOrder().catch((err) => {
      setErrorMessage(err.toString())
      setSubmitting(false)
    })
  }

  const handleVnPaySubmit = () => {
    setSubmitting(true)
    setErrorMessage(null)

    // handle payment
    onVnPaymentCompleted()
  }

  useEffect(() => {
    const isPaid = searchParams.get("isPaid")
    if (!isPaid) return
    setSubmitting(true)
    setErrorMessage(null)
    onPlacedOrder();
  }, [])

  return (
    <div className="checkout-total">
      {submitting && <LoadingPage />}
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
      <div className="checkout-total-submit">
        <button
          onClick={handleVnPaySubmit}
          disabled={submitting}
          className={clx(
            "bg-[#20419A] w-full text-white py-2 px-3 rounded-md font-[500] flex items-center justify-center",
            submitting && "opacity-50"
          )}
        >
          Đặt đơn với vnpay
        </button>
      </div>
      <div className="checkout-mobile-container">
        <ErrorMessage
          error={errorMessage}
          data-testid="manual-payment-error-message"
        />
      </div>
    </div>
  )
}

export default MyCheckoutSummary
