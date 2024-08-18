import { LineItem } from "@medusajs/medusa"
import CartItem from "../cart-item"
import { formatVietnamPrice } from "@lib/util/format-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useState } from "react"
import { deleteLineItem } from "@modules/cart/actions"
import Spinner from "@modules/common/icons/spinner"

const CartDialog = ({
  setIsPopoverOpen,
  items,
  subtotal,
  totalItems,
}: {
  setIsPopoverOpen: (value: boolean) => void
  items: LineItem[] | undefined
  subtotal: number | undefined
  totalItems: number
}) => {
  const [isDeletingAll, setIsDeletingAll] = useState(false)

  const handleDeleteAll = async () => {
    if (items) {
      setIsDeletingAll(true)
      Promise.all(
        items.map(async (item) => {
          await deleteLineItem(item.id).then(() =>
            console.log("Deleted", item.title)
          )
        })
      ).finally(() => {
        setIsDeletingAll(false)
        setIsPopoverOpen(false)
      })
    }
  }

  return (
    <div className="overlay">
      <div className="cart-container">
        <div className="cart-nav">
          <button onClick={() => setIsPopoverOpen(false)}>
            <i className="fa-solid fa-times text-xl p-1"></i>
          </button>
          <div className="text-lg font-[500]">Giỏ hàng</div>
          <div className="w-7">
            {isDeletingAll ? (
              <div>
                <Spinner />
              </div>
            ) : (
              <button
                onClick={handleDeleteAll}
                className="text-base font-normal text-red-600"
              >
                Xóa
              </button>
            )}
          </div>
        </div>
        <div className="cart-body">
          <div className="cart-items">
            {items &&
              items
                .sort((a, b) => {
                  return a.created_at > b.created_at ? -1 : 1
                })
                .map((item: any) => <CartItem key={item.id} item={item} />)}
            {(!items || items.length == 0) && <div className="text-sm font-[500] text-center py-4">Không có sản phẩm nào trong giỏ hàng</div>}
          </div>
          <div className="cart-order">
            <div className="flex justify-between cart-order-total">
              <div className="cart-item-title">Thành tiền</div>
              <div className="cart-item-price">
                {formatVietnamPrice(subtotal || 0)}
              </div>
            </div>

            <LocalizedClientLink
              href={"/checkout"}
              data-testid="checkout-button"
            >
              <button
                type="button"
                onClick={() => {}}
                className="flex cart-order-button"
              >
                <div className="flex-none font-normal text-sm leading-6">
                  {totalItems} món
                </div>
                <div className="flex-1 font-[500] text-sm">Đặt đơn</div>
              </button>
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartDialog
