"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import LoginComponent from "../login"
import RegisterComponent from "../register"

const LoginDialog = ({closeDialog}:{closeDialog: () => void}) => {
  // Get search params 'isLogin' and 'callbackUrl' from the URL
  const searchParams = useSearchParams()
  const isLogin = searchParams.get("isLogin") || "1"
  const callbackUrl = searchParams.get("callbackUrl") || "/"
  const router = useRouter()
  const pathname = usePathname()

  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(isLogin == "1")
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(isLogin == "0")

  // Write functions to open and close the login and register dialogs
  const openLogin = () => {
    setIsLoginPopupOpen(true)
    if (isRegisterPopupOpen) {
      setIsRegisterPopupOpen(false)
    }
  }

  const openRegister = () => {
    setIsRegisterPopupOpen(true)
    if (isLoginPopupOpen) {
      setIsLoginPopupOpen(false)
    }
  }

  // Close the login dialog and remove the 'isLogin' search param from the URL
  const closeDialogAndRemoveParam = () => {
    closeDialog()
    removeSearchParam("isLogin")
  }

  // Function to remove a search param from the URL
  const removeSearchParam = (key: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete(key)
    router.push(`${pathname}?${params.toString()}`)
  }

  // Check if the URL has 'isLogin' set to '1' and open the login dialog, or if 'isLogin' is set to '0' and open the register dialog
  useEffect(() => {
    if (isLogin == "1") {
      openLogin()
    } else if (isLogin == "0") {
      openRegister()
    }
  }, [isLogin])

  return (
    <div className="absolute top-0 left-0 w-full">
      {isLoginPopupOpen && (
        <LoginComponent
          openRegister={openRegister}
          closeLogin={closeDialogAndRemoveParam}
        />
      )}
      {isRegisterPopupOpen && (
        <RegisterComponent
          openLogin={openLogin}
          closeRegister={closeDialogAndRemoveParam}
        />
      )}
    </div>
  )
}

export default LoginDialog
