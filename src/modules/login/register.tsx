import enejiWhiteLogo from "../../../public/images/enejistation-white-logo.png"
import Image from "next/image"
import RequiredMark from "./components/required-mark"
import { useState } from "react"
import { useFormState } from "react-dom"
import { signUp, updateCustomerMetadata } from "@modules/account/actions"
import ErrorMessage from "@modules/checkout/components/error-message"
import SubmitButton from "./components/submit-button"
import "@fortawesome/fontawesome-free/css/all.min.css"

const RegisterComponent = ({
  closeRegister,
  openLogin,
}: {
  closeRegister: () => void
  openLogin: () => void
}) => {
  const [isTermsChecked, setIsTermsChecked] = useState(false)
  const [message, formAction] = useFormState(signUp, null)
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [metadataUpdateMessage, setMetadataUpdateMessage] = useState("")

  const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTermsChecked(e.target.checked)
  }

  const handleSubmit = (payload: FormData) => {
    setIsSubmitting(true)
    setError("")
    setMetadataUpdateMessage("")

    if (!isTermsChecked) {
      setError("Vui lòng đồng ý với điều khoản và điều kiện")
      return
    }

    // Register customer
    formAction(payload)

    // Update customer metadata with additional information
    updateCustomerMetadata({}, payload).then((res) => {
      if (res.error) {
        setMetadataUpdateMessage(res.error)
      }
    })

    // Close register dialog
    closeRegister()
  }

  return (
    <div className="fixed inset-x-0 bg-black/50 px-auto py-0 md:py-10 h-full w-screen top-0 z-50 pointer-events-none">
      <div className="h-full w-screen md:w-[375px] bg-white rounded-none md:rounded-xl mx-auto text-start pb-4 pointer-events-auto overflow-y-auto no-scrollbar">
        <div className="relative w-full">
          <div className="bg-[#1875F0] h-[108px] w-full flex items-center mb-5 login-padding">
            <div className="bg-white w-[6px] h-[68px] rounded-r-3xl"></div>
            <Image src={enejiWhiteLogo} width={200} height={200} alt="logo" />
          </div>
          <button className="absolute top-3 right-3">
            <i
              className="fa-solid fa-times text-xl text-white p-1"
              onClick={closeRegister}
            ></i>
          </button>
          <form className="login-padding login-text" action={handleSubmit}>
            <div className="text-2xl font-[500] mb-4">Đăng ký</div>
            <div className="space-y-1 mb-5">
              <div>
                Tên <RequiredMark />
              </div>
              <input
                id="first_name"
                name="first_name"
                type="text"
                placeholder="Nhập tên của bạn"
                className="w-full h-10 rounded-md p-2 bg-[#F2F4F7] border-none shadow-md"
                required
              />
            </div>

            <div className="space-y-1 mb-5">
              <div>
                Họ <RequiredMark />
              </div>
              <input
                id="last_name"
                name="last_name"
                type="text"
                placeholder="Nhập họ của bạn"
                className="w-full h-10 rounded-md p-2 bg-[#F2F4F7] border-none shadow-md"
                required
              />
            </div>

            <div className="space-y-1 mb-5">
              <div>
                Email (ACB) <RequiredMark />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Nhập email ACB của bạn"
                className="w-full h-10 rounded-md p-2 bg-[#F2F4F7] border-none shadow-md"
                required
              />
            </div>
            <div className="space-y-1 mb-5">
              <div>
                Mật khẩu <RequiredMark />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="******"
                className="w-full h-10 rounded-md p-2 bg-[#F2F4F7] border-none shadow-md"
                required
              />
            </div>
            <div className="space-y-1 mb-5">
              <div>Mã nhân viên</div>
              <input
                id="employee_code"
                name="employee_code"
                type="text"
                placeholder="Nhập mã nhân viên"
                className="w-full h-10 rounded-md p-2 bg-[#F2F4F7] border-none shadow-md"
              />
            </div>
            <div className="space-y-1 mb-5">
              <div>Số điện thoại</div>
              <div className="flex space-x-2">
                <span className="flex items-center px-3 bg-[#F2F4F7] rounded-md shadow-md">
                  +84
                </span>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Số điện thoại"
                  className="w-full h-10 rounded-md p-2 bg-[#F2F4F7] border-none shadow-md"
                />
              </div>
            </div>
            <div className="space-y-1 mb-5">
              <div>Chi nhánh làm việc</div>
              <select
                id="branch"
                name="branch"
                className="w-full h-10 rounded-md p-2 bg-[#F2F4F7] border-none shadow-md"
              >
                <option value="" disabled selected>
                  Chọn chi nhánh làm việc
                </option>
                <option value="thu-duc">Thủ Đức</option>
                <option value="q1">Quận 1</option>
                <option value="q10">Quận 10</option>
                <option value="q7">Quận 7</option>
              </select>
            </div>
            <div className="mb-7 space-x-1">
              <input
                type="checkbox"
                checked={isTermsChecked}
                onChange={handleTermsChange}
                className="rounded-md"
              />
              <span>
                Tôi đã đọc và đồng ý?{" "}
                <a href="" className="text-[#20419A]">
                  Điều khoản và điều kiện
                </a>
              </span>
            </div>
            <ErrorMessage
              error={message || error || metadataUpdateMessage}
              data-testid="register-error"
            />
            <SubmitButton
              message={message}
              metadataUpdateMessage={metadataUpdateMessage}
              isSubmitting={isSubmitting}
              setIsSubmitting={setIsSubmitting}
              className="font-semibold w-full h-10 rounded-md bg-[#20419A] flex items-center justify-center text-white mb-2"
            />
            <div className="w-full text-center p-2 ">
              Bạn có tài khoản?{" "}
                <button type="button" onClick={openLogin} className="text-[#20419A]">Đăng nhập</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterComponent
