import FallbackComponent from "@modules/checkout/components/fallback"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "VnPayFallback",
  description: "Show VnPayment status and redirect to checkout page",
}

export default function VnPayFallback() {
  return <FallbackComponent />
}