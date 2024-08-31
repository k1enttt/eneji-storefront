import { checkVnPayReturn } from "@modules/checkout/actions"
import VnPayReturnComponent from "@modules/checkout/components/vnpay-return"
import { Metadata } from "next"
import { ReturnQueryFromVNPay } from "vnpay"

export const metadata: Metadata = {
  title: "VnPayReturn",
  description: "Check checksum and update order status to admin",
}
type Params = {
  searchParams: ReturnQueryFromVNPay
}
export default async function VnPayReturn(params: Params) {
  const { searchParams } = params
  const message = await checkVnPayReturn(searchParams)
  return (
    <div className="">
      <VnPayReturnComponent responseMessage={message?.error} />
    </div>
  )
}
