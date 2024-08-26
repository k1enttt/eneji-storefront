import { Order } from "@medusajs/medusa"
import ItemPreview from "@modules/cart/components/item-preview"
import { mapPaymentName } from "./my-order-completed-template"
import { formatVietnamPrice } from "@lib/util/format-price"
import { CheckoutPackingMethod } from "types/global"
import { mapOrdersStatusString } from "@modules/account/components/order-overview/my-order-overview"
import { Fragment } from "react"
import { clx } from "@medusajs/ui"

type OrderDetailsTemplateProps = {
  order: Order
}

const MyOrderDetailsTemplate: React.FC<OrderDetailsTemplateProps> = ({
  order,
}) => {
  let packing: CheckoutPackingMethod | null = null
  let orderNote = ""
  if (order.shipping_address.metadata) {
    packing =
      (order.shipping_address.metadata.packing as CheckoutPackingMethod) || null
    orderNote = (order.shipping_address.metadata.order_note as string) || ""
  }

  const orderStatus = mapOrdersStatusString(
    order.fulfillment_status,
    order.payment_status
  )

  return (
    <div className="content-container py-6 md:py-8 flex flex-col md:flex-row gap-5">
      <div className="flex-1 basis-2/3 space-y-4">
        <div
          className={clx(
            `px-4 h-16 flex items-center justify-between rounded-lg text-white`,
            orderStatus.bgColor
              ? `${orderStatus.textColor} ${orderStatus.bgColor}`
              : `text-white bg-[#20419A]`
          )}
        >
          <div>{orderStatus.title}</div>
          <div>{orderStatus.icon}</div>
        </div>
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
            {mapPaymentName(order.payments[0].provider_id)}
          </div>
        </div>
        <div className="divider-big"></div>
        <div className="checkout-mobile-container space-y-1">
          <div className="confirm-h3">Ghi chú</div>
          <div className="confirm-subtitle">{orderNote}</div>
        </div>
      </div>
      <div className="flex-1 basis-1/3 bg-white sticky bottom-0">
        <div className="divider-normal md:hidden block md:mb-0 mb-4"></div>
        <div className="space-y-4">
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
    </div>
  )
}
export default MyOrderDetailsTemplate
