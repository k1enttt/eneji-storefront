"use client"
import { Button, Heading, Text } from "@medusajs/ui"
import LoginDialog from "@modules/login/templates/login-dialog"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useState } from "react"

const MySignInPrompt = () => {
  const [openLogin, setOpenLogin] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const appendSearchParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(key, value)
    router.push(`${pathname}?${params.toString()}`)
  }

  const handleOpenLogin = () => {
    setOpenLogin(true)
    appendSearchParam("isLogin", "1")
  }

  return (
    <div className="bg-white flex items-center justify-between">
      <div>
        <Heading level="h2" className="txt-xlarge">
          Already have an account?
        </Heading>
        <Text className="txt-medium text-ui-fg-subtle mt-2">
          Sign in for a better experience.
        </Text>
      </div>
      <div>
        <MedusaSignInButton setOpenLogin={handleOpenLogin} />
      </div>
      {openLogin && <LoginDialog closeDialog={() => setOpenLogin(false)}/>}
    </div>
  )
}

export default MySignInPrompt

const MedusaSignInButton = ({ setOpenLogin }: { setOpenLogin: () => void }) => {
  return (
    <Button
      variant="secondary"
      className="h-10"
      data-testid="sign-in-button"
      onClick={setOpenLogin}
    >
      Sign in
    </Button>
  )
}
