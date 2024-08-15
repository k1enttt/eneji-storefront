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
}: {
  className?: string
  login?: boolean
  message: string
  metadataUpdateMessage?: string
  isSubmitting: boolean
  setIsSubmitting: (isSubmitting: boolean) => void
}) => {
  const { pending } = useFormStatus()
  const router = useRouter()

  useEffect(() => {
    if (login) {
      if (!pending && isSubmitting) {
        if (!message) {
          router.push("/cart")
        }
        setIsSubmitting(false)
      }
    } else if (!pending && isSubmitting) {
      if (!message && !metadataUpdateMessage) {
        router.push("/cart")
      }
      setIsSubmitting(false)
    }
  }, [pending])

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
