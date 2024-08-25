import { convertISOToLocalDateString } from "@lib/util/convert-date-format"
import { formatVietnamPrice } from "@lib/util/format-price"
import { Order } from "@medusajs/medusa"
import { clx } from "@medusajs/ui"
import { mapPaymentName } from "@modules/order/templates/my-order-completed-template"

const statusString: { [key: string]: {title: string, colorStyle: string} } = {
  not_paid: {
    title: "Đang xử lý",
    colorStyle: "text-[#20419A]",
  },
  not_fulfilled: {
    title: "Đang chuẩn bị",
    colorStyle: "text-[#20419A]",
  },
  fulfilled: {
    title: "Đang giao hàng",
    colorStyle: "text-yellow-500",
  },
  shipped: {
    title: "Đã giao",
    colorStyle: "text-green-500",
  },
  canceled: {
    title: "Đã hủy",
    colorStyle: "text-red-500",
  }
}

const mapStatusString = (
  fulfillment_status: string,
  payment_status: string
) => {
  if (payment_status === "canceled" || fulfillment_status === "canceled") {
    return statusString.canceled
  }
  if (payment_status === "awaiting") {
    return statusString.not_paid
  } else {
    switch (fulfillment_status) {
      case "not_fulfilled":
        return statusString.not_fulfilled
      case "fulfilled":
        return statusString.fulfilled
      case "shipped":
        return statusString.shipped
      default:
        return statusString.not_fulfilled
    }
  }
}

const MyOrderOverview = ({ orders }: { orders: Order[] }) => {

  return (
    <div className="content-container py-8">
      {orders &&
        orders.map((order, index) => {
          const orderStatus = mapStatusString(order.fulfillment_status, order.payment_status)
          const color = orderStatus.colorStyle || ""
          const itemsQuantity = order.items.reduce((acc, item) => acc + item.quantity, 0)
          
          return (
            <div key={index} className={index > 0 ? "pt-5" : ""}>
              <div className="bg-white border border-gray-400 rounded-md w-full px-3 py-4">
                <div className="flex items-center gap-1">
                  <div className={clx("my-orders-h1", color)}>
                    {orderStatus.title}
                  </div>
                  <div className="bullet"></div>
                  <div className="my-orders-subtitle">{convertISOToLocalDateString(order.created_at)}</div>
                </div>
                <div className="my-orders-subtitle">Giao đến</div>
                <div className="my-orders-normal-text">{order.shipping_address.address_1}</div>
                <div className="flex items-center gap-1">
                  <div className="my-orders-normal-text text-[#475467]">
                    {formatVietnamPrice(order.total)}{" "}
                    <span>({mapPaymentName(order.payments[0].provider_id)})</span>
                  </div>
                  <div className="bullet"></div>
                  <div className="my-orders-subtitle">{itemsQuantity} món</div>
                </div>
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default MyOrderOverview
