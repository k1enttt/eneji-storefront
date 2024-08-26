import { retrieveOrder } from "@lib/data"
import MyOrderDetailsTemplate from "@modules/order/templates/my-order-details-template"
import { Metadata } from "next"
import { notFound } from "next/navigation"

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const order = await retrieveOrder(params.id).catch(() => null)

  if (!order) {
    notFound()
  }

  return {
    title: `Order #${order.display_id}`,
    description: `Chi tiết đơn hàng`,
  }
}

export default async function MyOrderDetailPage({ params }: Props) {
  const order = await retrieveOrder(params.id).catch(() => null)

  if (!order) {
    notFound()
  }

  return <MyOrderDetailsTemplate order={order} />
}
