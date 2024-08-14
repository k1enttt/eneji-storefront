import enejiWhiteLogo from "../../../public/images/enejistation-white-logo.png"
import Image from "next/image"
import RequiredMark from "./components/required-mark"
import { useState } from "react"
import { useFormState, useFormStatus } from "react-dom"
import { signUp } from "@modules/account/actions"
import ErrorMessage from "@modules/checkout/components/error-message"
import { useRouter } from "next/navigation"

const RegisterComponent = ({
  closeRegister,
}: {
  closeRegister: () => void
}) => {
  const [isTermsChecked, setIsTermsChecked] = useState(false)
  const [message, formAction] = useFormState(signUp, null)
  const { pending } = useFormStatus()
  const [error, setError] = useState("")
  const router = useRouter()

  let registerInfo: {
    name: string
    email: string
    password: string
    employeeCode?: string
    phoneNumber?: string
    branch?: string
  } = {
    name: "",
    email: "",
    password: "",
    employeeCode: "",
    phoneNumber: "",
    branch: "",
  }

  const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTermsChecked(e.target.checked)
  }

  const handleSubmit = (payload: FormData) => {
    setError("")
    if (!isTermsChecked) {
      setError("Vui lòng đồng ý với điều khoản và điều kiện")
      return
    }

    registerInfo = {
      name: `${payload.get("first_name")} ${payload.get("last_name")}`,
      email: payload.get("email") as string,
      password: payload.get("password") as string,
      employeeCode: payload.get("employeeCode") as string,
      phoneNumber: payload.get("phoneNumber") as string,
      branch: payload.get("branch") as string,
    }
    console.log(registerInfo)

    formAction(payload)


    router.push("/cart")
    closeRegister()
  }

  return (
    <div className="fixed inset-x-0 bg-black/50 px-auto py-10 h-full w-screen top-0 z-50 pointer-events-none">
      <div className="h-full w-[375px] bg-white rounded-xl mx-auto text-start pb-4 overflow-hidden pointer-events-auto">
        <div className="relative w-full h-full overflow-y-auto no-scrollbar">
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
          <form className="login-padding text-body" action={handleSubmit}>
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
                id="employeeCode"
                type="text"
                placeholder="Nhập mã nhân viên"
                className="w-full h-10 rounded-md p-2 bg-[#F2F4F7] border-none shadow-md"
              />
            </div>
            <div className="space-y-1 mb-5">
              <div>Số điện thoại</div>
              <input
                id="phoneNumber"
                type="email"
                placeholder="Số điện thoại"
                className="w-full h-10 rounded-md p-2 bg-[#F2F4F7] border-none shadow-md"
              />
            </div>
            <div className="space-y-1 mb-5">
              <div>Chi nhánh làm việc</div>
              <input
                id="branch"
                type="dropdown"
                placeholder="Chọn chi nhánh làm việc"
                className="w-full h-10 rounded-md p-2 bg-[#F2F4F7] border-none shadow-md"
              />
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
            <ErrorMessage error={message || error} data-testid="register-error" />
            <button
              type="submit"
              disabled={pending}
              className="font-semibold w-full h-10 rounded-md bg-[#20419A] flex items-center justify-center text-white mb-2"
            >
              {
                pending ? "Đang đăng ký..." : "Tiếp tục"
              }
            </button>
            <div className="w-full text-center p-2">
              Bạn có tài khoản?{" "}
              <a href="" className="text-[#20419A]">
                Đăng nhập
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterComponent
