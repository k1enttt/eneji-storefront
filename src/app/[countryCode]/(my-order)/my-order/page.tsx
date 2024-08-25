import { listCustomerOrders } from "@lib/data"
import MyOrderOverview from "@modules/account/components/order-overview/my-order-overview"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Orders",
  description: "Danh sách các đơn hàng đã đặt.",
}

export default async function MyOrder() {
  const orders = await listCustomerOrders()

  if (!orders) {
    notFound()
  }

  return (
    <div>
      <MyOrderOverview orders={orders} />
    </div>
  )
}
