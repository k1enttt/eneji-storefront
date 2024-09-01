import Image from "next/image"
import enejiWhiteLogo from "../../../public/images/enejistation-white-logo.png"
import RequiredMark from "./components/required-mark"
import { useFormState } from "react-dom"
import { logCustomerIn } from "@modules/account/actions"
import ErrorMessage from "@modules/checkout/components/error-message"
import SubmitButton from "./components/submit-button"
import { useState } from "react"
import "@fortawesome/fontawesome-free/css/all.min.css"

const LoginComponent = ({
  closeLogin,
  openRegister,
}: {
  closeLogin: () => void
  openRegister: () => void
}) => {
  const [message, formAction] = useFormState(logCustomerIn, null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (payload: FormData) => {
    setIsSubmitting(true)

    formAction(payload)
    
    if (!message) return
    closeLogin()
  }

  return (
    <div className="fixed top-0 z-50 bg-black/50 h-full w-full flex items-center justify-center pointer-events-none">
      <div className="w-full md:w-[375px] bg-white h-full md:h-fit pb-4 rounded-none md:rounded-xl overflow-hidden pointer-events-auto">
        <div className="relative text-start h-full overflow-y-auto flex flex-col">
          <ClosePopupButton
            closeLogin={closeLogin}
            className="absolute top-3 right-3"
          />
          <div className="bg-[#1875F0] h-[108px] w-full mb-5 login-padding flex items-center flex-none">
            <div className="bg-white w-[6px] h-[68px] rounded-r-3xl"></div>
            <Image src={enejiWhiteLogo} width={200} height={200} alt="logo" />
          </div>
          <form
            action={handleSubmit}
            className="login-padding login-text p-0 flex-1 flex flex-col"
          >
            <div className="text-2xl font-[500] mb-4 flex-none">Đăng nhập</div>
            <div className="space-y-1 mb-5 flex-none">
              <div>
                Email (ACB) <RequiredMark />
              </div>
              <input
                required
                name="email"
                type="email"
                placeholder="Nhập email ACB của bạn"
                className="w-full h-10 rounded-md p-2 bg-[#F2F4F7] border-none shadow-md"
              />
            </div>
            <div className="space-y-1 mb-5 flex-none">
              <div>
                Mật khẩu <RequiredMark />
              </div>
              <input
                required
                id="password"
                name="password"
                type="password"
                placeholder="******"
                className="w-full h-10 rounded-md p-2 bg-[#F2F4F7] border-none shadow-md"
              />
            </div>
            {message && (
              <div className="pb-2 px-2 rounded-md bg-red-100">
                <ErrorMessage error={message} data-testid="register-error" />
              </div>
            )}
            <div className="pt-2 h-fit flex-1 flex flex-col justify-end">
              <SubmitButton
                login
                message={message}
                isSubmitting={isSubmitting}
                setIsSubmitting={setIsSubmitting}
                className="font-semibold w-full h-10 rounded-md bg-[#20419A] flex items-center justify-center text-white mb-2"
              ></SubmitButton>
              <button
                type="button"
                onClick={openRegister}
                className="font-semibold w-full h-10 text-center p-2 text-[#20419A]"
              >
                Đăng ký
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginComponent

const ClosePopupButton = ({
  className,
  closeLogin,
}: {
  className?: string
  closeLogin: () => void
}) => {
  return (
    <button className={className}>
      <i
        className="fa-solid fa-times text-xl text-white p-1"
        onClick={closeLogin}
      ></i>
    </button>
  )
}
