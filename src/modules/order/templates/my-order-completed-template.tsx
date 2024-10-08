import { paymentInfoMap } from "@lib/constants"
import { formatVietnamPrice } from "@lib/util/format-price"
import { LineItem, Order } from "@medusajs/medusa"
import ItemPreview from "@modules/cart/components/item-preview"
import FastDelivery from "@modules/common/icons/fast-delivery"
import FireBurner from "@modules/common/icons/fire-burner"
import HouseCircleCheck from "@modules/common/icons/house-circle-check"
import { CheckoutPackingMethod, MultiSelectOption } from "types/global"
import Cancel from "../components/cancel"
import { Fragment } from "react"

type MyOrderCompletedTemplateProps = {
  order: Order
}

type StatusStringProps = {
  title: "Đang xử lý" | "Đang chuẩn bị" | "Đang giao hàng" | "Đã đến điểm giao"
  subtitle: string
  bar_level: number
  icon?: JSX.Element
}

const statusString: { [key: string]: StatusStringProps } = {
  not_paid: {
    title: "Đang xử lý",
    subtitle: "Đơn hàng của bạn đang được xử lý",
    bar_level: 1,
  },
  not_fulfilled: {
    title: "Đang chuẩn bị",
    subtitle: "Nhà hàng đang chuẩn bị món ăn",
    bar_level: 2,
    icon: <FireBurner size={56} color="#20419A" />,
  },
  fulfilled: {
    title: "Đang giao hàng",
    subtitle: "Tài xế đang giao món ăn cho bạn",
    bar_level: 3,
    icon: <FastDelivery size={56} color="#20419A" />,
  },
  shipped: {
    title: "Đã đến điểm giao",
    subtitle: "Đơn hàng đã giao đến bạn",
    bar_level: 4,
    icon: <HouseCircleCheck size={56} color="#20419A" />,
  },
}

export const mapStatusString = (
  fulfillment_status: string,
  payment_status: string
) => {
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

export const mapPaymentName = (providerId: string) => {
  return paymentInfoMap[providerId]?.title
}

const MyOrderCompletedTemplate = ({ order }: MyOrderCompletedTemplateProps) => {
  const payment = order.payments[0]
  let packing: CheckoutPackingMethod | null = null
  let orderNote = ""
  if (order.shipping_address.metadata) {
    packing =
      (order.shipping_address.metadata.packing as CheckoutPackingMethod) || null
    orderNote = (order.shipping_address.metadata.order_note as string) || ""
  }

  const orderStatus = mapStatusString(
    order.fulfillment_status,
    order.payment_status
  )

  return (
    <div className="checkout-container flex flex-col md:flex-row gap-5 py-4">
      <div className="flex-1 basis-2/3 space-y-4">
        <div className="checkout-mobile-container flex items-center justify-between">
          <div>
            <div className="confirm-h1">{orderStatus.title}</div>
            <div className="confirm-normal-text text-[#475467]">
              {orderStatus.subtitle}
            </div>
          </div>
          {orderStatus.icon ? orderStatus.icon : <Cancel />}
        </div>
        <div className="checkout-mobile-container flex items-center">
          <div className="confirm-bar-dot-active"></div>
          <div className="confirm-bar-line-active"></div>
          <div
            className={
              orderStatus.bar_level >= 2
                ? "confirm-bar-dot-active"
                : "confirm-bar-dot"
            }
          ></div>
          <div
            className={
              orderStatus.bar_level >= 2
                ? "confirm-bar-line-active"
                : "confirm-bar-line"
            }
          ></div>
          <div
            className={
              orderStatus.bar_level >= 3
                ? "confirm-bar-dot-active"
                : "confirm-bar-dot"
            }
          ></div>
          <div
            className={
              orderStatus.bar_level >= 3
                ? "confirm-bar-line-active"
                : "confirm-bar-line"
            }
          ></div>
          <div
            className={
              orderStatus.bar_level >= 4
                ? "confirm-bar-dot-active"
                : "confirm-bar-dot"
            }
          ></div>
        </div>
        <div className="checkout-mobile-container">
          <div className="flex items-center gap-2 confirm-normal-text p-2 rounded-md border border-yellow-400">
            <i className="fa-solid fa-truck-fast text-[#20419A]"></i>
            <div>
              Dự kiến giao đơn <span className="font-bold">10:40</span>
            </div>
          </div>
        </div>
        <div className="divider-big"></div>
        <div className="checkout-mobile-container space-y-1">
          <div className="confirm-subtitle">Giao đến</div>
          <div className="confirm-normal-text">
            {order.shipping_address?.address_1}
          </div>
        </div>
        <div className="divider-big"></div>
        <div className="checkout-mobile-container space-y-2">
          <div className="confirm-h2">Món ăn</div>
          {order.items.map((item, index) => {
            const divider = index == 0 ? "" : "divider-normal"
            return (
              <Fragment key={index}>
                <div className={divider}></div>
                <ItemPreview index={index} item={item} />
              </Fragment>
            )
          })}
        </div>
        <div className="divider-big"></div>
        <div className="checkout-mobile-container space-y-2">
          <div className="confirm-h2">Cách đóng gói</div>
          {packing && (
            <div className="confirm-subtitle flex items-center justify-between">
              <div>{packing.title}</div>
              <div>{formatVietnamPrice(packing.price)}</div>
            </div>
          )}
        </div>
        <div className="divider-big"></div>
        <div className="checkout-mobile-container flex items-center justify-between">
          <div className="confirm-h2">Hình thức thanh toán</div>
          <div className="confirm-subtitle">
            {mapPaymentName(payment.provider_id)}
          </div>
        </div>
        <div className="divider-big"></div>
        <div className="checkout-mobile-container space-y-1">
          <div className="confirm-h3">Ghi chú</div>
          <div className="confirm-subtitle">{orderNote}</div>
        </div>
      </div>
      <div className="flex-1 basis-1/3 space-y-4 bg-white sticky bottom-0">
        <div className="divider-normal md:hidden block"></div>
        <div className="checkout-total-subtotal">
          <div className="checkout-total-line">
            <div>Tiền hàng (Tạm tính)</div>
            <div>{formatVietnamPrice(order.subtotal)}</div>
          </div>
          <div className="checkout-total-line">
            <div>Phí vận chuyển</div>
            <div>{formatVietnamPrice(order.shipping_total)}</div>
          </div>
          <div className="checkout-total-line">
            <div>VAT</div>
            <div>{formatVietnamPrice(order.tax_total || 0)}</div>
          </div>

          {order.discount_total > 0 && (
            <div className="checkout-total-sale">
              <div>Giảm giá</div>
              <div>-{formatVietnamPrice(order.discount_total)}</div>
            </div>
          )}

          <div className="divider-normal"></div>
        </div>
        <div className="checkout-total-final">
          <div className="font-[500]">Tổng cộng</div>
          <div className="font-bold text-[#20419A]">
            {formatVietnamPrice(order.total)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyOrderCompletedTemplate
