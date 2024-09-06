"use client"
import { setPaymentCaptured } from "@modules/checkout/actions"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import "@fortawesome/fontawesome-free/css/all.css"
import Spinner from "@modules/common/icons/spinner"

const VnPayReturnComponent = ({
  orderId,
  responseMessage: errorCapturePayment,
}: {
  orderId: string
  responseMessage: string | undefined
}) => {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const onPaymentCompleted = async () => {
    console.log("Cập nhật đơn hàng đã thanh toán")
    await setPaymentCaptured(orderId).catch((error) => {
      setErrorMessage(error.toString())
      return;
    })
    router.push(`/vn/order-confirmed/${orderId}`)
  }

  const handleComplete = () => {
    onPaymentCompleted()
  }

  useEffect(() => {
    if (!!errorCapturePayment == false) {
      handleComplete()
    }
  }, [])

  return (
    <div className="fixed top-0 bottom-0 w-full h-full flex items-center justify-center">
      <div className="shadow-lg gap-2 min-w-[300px] p-4 border rounded-lg flex flex-col items-center justify-center space-y-2">
        <div
          className={`text-xl font-semibold ${
            !!errorCapturePayment ? "text-red-500" : "text-green-500"
          }`}
        >
          {!!errorCapturePayment
            ? "Giao dịch thất bại"
            : "Giao dịch thành công"}
        </div>
        {errorCapturePayment && (
          <p className="font-medium">{errorCapturePayment}</p>
        )}
        {errorMessage && <p className="font-medium">{errorMessage}</p>}
        {!!errorCapturePayment ? (
          <button
            onClick={() => router.push("/vn/checkout")}
            className="hover:text-blue-500"
          >
            {"Quay lại đơn hàng"}
            <span className="pl-2">
              <i className="fas fa-arrow-right"></i>
            </span>
          </button>
        ) : (
          <div className="flex items-center gap-1">
            <span>
              <Spinner />
            </span>
            Đang xử lý đơn hàng...
          </div>
        )}
      </div>
    </div>
  )
}

export default VnPayReturnComponent
