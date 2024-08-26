import { convertISOToLocalDateString } from "@lib/util/convert-date-format"
import { formatVietnamPrice } from "@lib/util/format-price"
import { Order } from "@medusajs/medusa"
import { clx } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CircleXMark from "@modules/common/icons/circle-xmark"
import FastDelivery from "@modules/common/icons/fast-delivery"
import FileLine from "@modules/common/icons/file-line"
import FireBurner from "@modules/common/icons/fire-burner"
import HouseCircleCheck from "@modules/common/icons/house-circle-check"
import { mapPaymentName } from "@modules/order/templates/my-order-completed-template"

const statusString: {
  [key: string]: {
    title: string
    textColor: string
    bgColor?: string
    icon?: JSX.Element
  }
} = {
  not_paid: {
    title: "Đang xử lý",
    textColor: "text-[#20419A]",
    icon: <FileLine size={32} color="#fff" />,
  },
  not_fulfilled: {
    title: "Đang chuẩn bị",
    textColor: "text-[#20419A]",
    icon: <FireBurner size={32} color="#fff" />,
  },
  fulfilled: {
    title: "Đang giao hàng",
    textColor: "text-yellow-500",
    bgColor: "bg-yellow-100",
    icon: <FastDelivery size={32} color="#ffeb3b" />,
  },
  shipped: {
    title: "Đã giao",
    textColor: "text-green-500",
    bgColor: "bg-green-100",
    icon: <HouseCircleCheck size={32} color="#4caf50" />,
  },
  canceled: {
    title: "Đã hủy",
    textColor: "text-red-500",
    bgColor: "bg-red-100",
    icon: <CircleXMark size={32} color="#F04438" />,
  },
}

export const mapOrdersStatusString = (
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
    <div className="content-container py-6 md:py-8">
      {orders &&
        orders.map((order, index) => {
          const orderStatus = mapOrdersStatusString(
            order.fulfillment_status,
            order.payment_status
          )
          const color = orderStatus.textColor || ""
          const itemsQuantity = order.items.reduce(
            (acc, item) => acc + item.quantity,
            0
          )

          return (
            <div key={index} className={index > 0 ? "pt-5" : ""}>
              <LocalizedClientLink
                href={`/my-order/details/${order.id}`}
                className="bg-white border border-gray-400 rounded-md w-full px-5 py-4 flex items-center text-start"
              >
                <div className="flex-1 basis-0">
                  <div className="flex items-center gap-1">
                    <div className={clx("my-orders-h1", color)}>
                      {orderStatus.title}
                    </div>
                    <div className="bullet"></div>
                    <div className="my-orders-subtitle">
                      {convertISOToLocalDateString(order.created_at)}
                    </div>
                  </div>
                  <div className="my-orders-subtitle">Giao đến</div>
                  <div className="my-orders-normal-text">
                    {order.shipping_address.address_1}
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="my-orders-normal-text text-[#475467]">
                      {formatVietnamPrice(order.total)}{" "}
                      <span>
                        ({mapPaymentName(order.payments[0].provider_id)})
                      </span>
                    </div>
                    <div className="bullet"></div>
                    <div className="my-orders-subtitle">
                      {itemsQuantity} món
                    </div>
                  </div>
                </div>
                <div className="h-6 w-6">
                  <i className="fas fa-chevron-right"></i>
                </div>
              </LocalizedClientLink>
            </div>
          )
        })}
    </div>
  )
}

export default MyOrderOverview
