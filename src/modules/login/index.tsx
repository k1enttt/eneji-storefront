"use client"
import { useEffect, useState } from "react"
import LoginComponent from "./login"
import RegisterComponent from "./register"
import { useRouter } from "next/navigation"

const LoginWrapper = ({
  isLogin,
  callbackUrl,
}: {
  isLogin?: "1" | "0"
  callbackUrl?: string
}) => {
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(isLogin == "1")
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(isLogin == "0")
  const router = useRouter()

  const openLogin = () => {
    setIsLoginPopupOpen(true)
    if (isRegisterPopupOpen) {
      setIsRegisterPopupOpen(false)
    }
  }

  const closeLogin = () => {
    if (callbackUrl) router.push(callbackUrl)
    else router.push("/")
  }

  const openRegister = () => {
    setIsRegisterPopupOpen(true)
    if (isLoginPopupOpen) {
      setIsLoginPopupOpen(false)
    }
  }

  const closeRegister = () => {
    if (callbackUrl) router.push(callbackUrl)
    else router.push("/")
  }

  useEffect(() => {
    if (isLogin == "1") {
      openLogin()
    } else if (isLogin == "0") {
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
      {isLoginPopupOpen && (
        <LoginComponent openRegister={openRegister} closeLogin={closeLogin} />
      )}
      {isRegisterPopupOpen && (
        <RegisterComponent
          openLogin={openLogin}
          closeRegister={closeRegister}
        />
      )}
    </div>
  )
}

export default LoginWrapper
