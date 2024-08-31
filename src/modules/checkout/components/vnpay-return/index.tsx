"use client"
import { placeOrder, setPaymentCaptured } from "@modules/checkout/actions"
import LoadingPage from "@modules/common/components/loading"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const VnPayReturnComponent = ({
  responseMessage: error,
}: {
  responseMessage: string | undefined
}) => {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const onPaymentCompleted = async () => {
    await placeOrder()
      .catch((err) => {
        setErrorMessage(err.toString())
        setSubmitting(false)
      })
      .then(() => {
        if (errorMessage) return

        // Get the order with expanded field "payments"

        // Update the order status to paid with the paymentId
        // await setPaymentCaptured(paymentId);
      })
  }

  const handleComplete = () => {
    setSubmitting(true)

    onPaymentCompleted()
  }

  useEffect(() => {
    if (!error) {
      handleComplete()
    }
  }, [])

  return (
    <div className="content-container text-center">
      <h1>VnPayFallback</h1>
      <p>{!!error ? "Giao dịch thất bại" : "Giao dịch thành công"}</p>
      {!!error ? (
        <button onClick={() => router.push("/vn/checkout")}>
          {"Quay lại đơn hàng"}
        </button>
      ) : (
        <div>Đang xử lý đơn hàng...</div>
      )}
      {error && <p>{error}</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  )
}

export default VnPayReturnComponent
