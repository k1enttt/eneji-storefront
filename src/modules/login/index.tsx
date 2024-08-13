import Image from "next/image"
import enejiWhiteLogo from "../../../public/images/enejistation-white-logo.png"
import RequiredMark from "./components/required-mark"

const LoginComponent = ({ closeLogin }: { closeLogin: () => void }) => {
  return (
    <div className="fixed inset-x-0 bg-black/50 h-full w-screen top-0 z-50 pointer-events-none">
      <div className="h-full w-full flex items-center justify-center mx-auto text-start pointer-events-auto">
        <div className="relative w-[375px] bg-white h-fit rounded-xl overflow-hidden pb-4">
          <div className="bg-[#1875F0] h-[108px] w-full flex items-center mb-5 login-padding">
            <div className="bg-white w-[6px] h-[68px] rounded-r-3xl"></div>
            <Image src={enejiWhiteLogo} width={200} height={200} alt="logo" />
          </div>
          <button className="absolute top-3 right-3">
            <i
              className="fa-solid fa-times text-xl text-white p-1"
              onClick={closeLogin}
            ></i>
          </button>
          <div className="login-padding text-body">
            <div className="text-2xl font-[500] mb-4">Đăng nhập</div>
            <div className="space-y-1 mb-5">
              <div>
                Email (ACB) <RequiredMark />
              </div>
              <input
                type="email"
                placeholder="Nhập email ACB của bạn"
                className="w-full h-10 rounded-md p-2 bg-[#F2F4F7] border-none shadow-md"
              />
            </div>
            <div className="space-y-1 mb-5">
              <div>
                Mật khẩu <RequiredMark />
              </div>
              <input
                id="password"
                type="password"
                placeholder="******"
                className="w-full h-10 rounded-md p-2 bg-[#F2F4F7] border-none shadow-md"
              />
            </div>

            <button className="font-semibold w-full h-10 rounded-md bg-[#20419A] flex items-center justify-center text-white mb-2">
              Đăng nhập
            </button>
            <button className="font-semibold w-full text-center p-2 text-[#20419A]">
              Đăng ký
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginComponent
