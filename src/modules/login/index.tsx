"use client"
import { use, useEffect, useState } from "react"
import LoginComponent from "./login"
import RegisterComponent from "./register"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

const LoginWrapper = ({ isLogin }: { isLogin?: "1" | "0" }) => {
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(isLogin == "1")
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(isLogin == "0")
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const openLogin = () => {
    setIsLoginPopupOpen(true)
  }

  const closeLogin = () => {
    setIsLoginPopupOpen(false)
    clearIsLoginParam()
  }

  const openRegister = () => {
    setIsRegisterPopupOpen(true)
  }

  const closeRegister = () => {
    setIsRegisterPopupOpen(false)
    clearIsLoginParam()
  }

  // Remove isLogin param from URL
  // Remove param after closing popup makes the Login and Register redirect buttons work properly.
  const clearIsLoginParam = () => {
    const nextSearchParams = new URLSearchParams(searchParams.toString())
    nextSearchParams.delete("isLogin")

    router.replace(`${pathname}?${nextSearchParams}`)
  }

  useEffect(() => {
    if (isLogin == "1") {
      closeRegister()
      openLogin()
    } else if (isLogin == "0") {
      closeLogin()
      openRegister()
    }
  }, [isLogin])

  return (
    <div className="w-full text-center">
      <div className="content-container w-full h-[300px] flex items-center justify-center">
        <button
          className="bg-black rounded-md shadow-md text-white p-2 m-4"
          onClick={openLogin}
        >
          Login
        </button>
        <button
          className="bg-black rounded-md shadow-md text-white p-2 m-4"
          onClick={openRegister}
        >
          Register
        </button>
      </div>
      {isLoginPopupOpen && <LoginComponent closeLogin={closeLogin} />}
      {isRegisterPopupOpen && (
        <RegisterComponent closeRegister={closeRegister} />
      )}
    </div>
  )
}

export default LoginWrapper
