import { clx } from "@medusajs/ui"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useFormStatus } from "react-dom"

const SubmitButton = ({
  className,
  message,
  metadataUpdateMessage,
  isSubmitting,
  setIsSubmitting,
}: {
  className?: string
  message: string
  metadataUpdateMessage: string
  isSubmitting: boolean
  setIsSubmitting: (isSubmitting: boolean) => void
}) => {
  const { pending } = useFormStatus()
  const router = useRouter()

  useEffect(() => {
    if (!pending && isSubmitting) {
      if (!message && !metadataUpdateMessage) {
        router.push("/account")
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
      {pending ? "Đang đăng ký..." : "Tiếp tục"}
    </button>
  )
}

export default SubmitButton
