import { Metadata } from "next"
import LoginWrapper from "@modules/login"

export const metadata: Metadata = {
  title: "View more",
  description: "Explore all of our products.",
}

type Params = {
  searchParams: {
    isLogin?: "1" | "0"
    callbackUrl?: string
  }
}

export default function LoginPage({ searchParams }: Params) {
  const { isLogin, callbackUrl } = searchParams
  
  return (
    <LoginWrapper callbackUrl={callbackUrl} isLogin={isLogin} />
  )
}
