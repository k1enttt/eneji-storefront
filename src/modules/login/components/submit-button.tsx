import { clx } from "@medusajs/ui"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useFormStatus } from "react-dom"

const SubmitButton = ({
  className,
  login,
  message,
  metadataUpdateMessage,
  isSubmitting,
  setIsSubmitting,
  close,
}: {
  className?: string
  login?: boolean
  message: string
  metadataUpdateMessage?: string
  isSubmitting: boolean
  setIsSubmitting: (isSubmitting: boolean) => void
  close: () => void
}) => {
  const { pending } = useFormStatus()
  const router = useRouter()
  let previousState = pending

  // useEffect(() => {
  //   // Nút submit cho form đăng nhập
  //   if (login) {
  //     // Nếu form action đã hoàn thành và đang submit
  //     if (!pending && isSubmitting) {
  //       // Nếu không có lỗi
  //       if (!message) {
  //         // Làm gì đó
  //       }
  //       // setIsSubmitting(false)
  //     }
  //   }
  //   // Nút submit cho form đăng ký
  //   if (!login) {
  //     // Nếu form action đã hoàn thành và đang submit
  //     if (!pending && isSubmitting) {
  //       // Nếu không có lỗi của form action (message) và lỗi cập nhật metadata (metadataUpdateMessage)
  //       if (!message && !metadataUpdateMessage) {
  //         // Làm gì đó
  //       }
  //       // setIsSubmitting(false)
  //     }
  //   }
  // }, [pending])

  // useEffect(() => {
  //   console.log("pending", pending)
  //   console.log("previousState", previousState)
  //   if (previousState && !pending) {
  //     close()
  //   }
  //   previousState = pending
  // }, [pending])

  return (
    <button
      type="submit"
      disabled={pending}
      className={clx(className, `${pending ? "bg-opacity-40" : ""}`)}
    >
      {!login ? (pending ? "Đang đăng ký..." : "Tiếp tục") : "Đăng nhập"}
    </button>
  )
}

export default SubmitButton
