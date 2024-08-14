import { clx } from "@medusajs/ui"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useFormStatus } from "react-dom"

const SubmitButton = ({
  className,
  message,
  isSubmitting,
}: {
  className?: string
  message?: string
  isSubmitting?: boolean
}) => {
  const { pending } = useFormStatus();
  const router = useRouter();

  useEffect(() => {
    console.log("Pending is: ", pending)
    if (!pending && isSubmitting) {
      console.log("Pending is false and isSubmitting is true")
      if (!message) {
        router.push("/account")
        console.log("Chuyển trang đến cart")
      }
    }
  }, [pending]);

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
