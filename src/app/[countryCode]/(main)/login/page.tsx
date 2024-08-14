"use client"
import { useState } from "react"
import "./login.css"
import LoginComponent from "@modules/login"
import RegisterComponent from "@modules/login/register"
import SubmitButton from "@modules/login/components/submit-button"

const LoginPage = () => {
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false)
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false)

  const openLogin = () => {
    setIsLoginPopupOpen(true)
  }

  const closeLogin = () => {
    setIsLoginPopupOpen(false)
  }

  const openRegister = () => {
    setIsRegisterPopupOpen(true)
  }

  const closeRegister = () => {
    setIsRegisterPopupOpen(false)
  }

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
        <LoginComponent closeLogin={closeLogin} />
      )}
      {
        isRegisterPopupOpen && (
          <RegisterComponent closeRegister={closeRegister} />
        )
      }
    </div>
  )
}

export default LoginPage
