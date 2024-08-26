import { useState } from "react"
import CartCounter from "../cart-counter"
import { LineItem, Region } from "@medusajs/medusa"
import { formatAmount } from "@lib/util/prices"
import MyDeleteButton from "@modules/common/components/delete-button/my-delete-button"
import { formatVietnamPrice } from "@lib/util/format-price"
import { updateLineItem } from "@modules/cart/actions"
import ErrorMessage from "@modules/checkout/components/error-message"
import { MultiSelectOption } from "types/global"

const CartItem = ({ item }: { item: LineItem }) => {
  const [quantity, setQuantity] = useState(item.quantity || 0)
  const [error, setError] = useState<string | null>(null)

  const { order_note, multi_select_option } = item.metadata as {
    order_note: string
    multi_select_option: MultiSelectOption[]
  }

  const options = multi_select_option
    .filter((option) => {
      return option.selected
    })
    .map((option) => option.label)

  return (
    <>
      <div className="cart-item">
        <div className="w-1/3">
          <div className="cart-item-title">{item.title}</div>
          <div className="cart-item-price">
            {formatVietnamPrice(item.subtotal || 0)}
          </div>
        </div>
        <div className="flex-1">
          <div className="cart-item-extra-infomation">{item.variant.title}</div>
          {options.length > 0 && (
            <div className="cart-item-extra-infomation">
              <span>Tùy chọn: </span>
              {options.map((option: string, index: number) => {
                const divider = index > 0 ? ", " : ""
                return <span key={index}>{divider + option}</span>
              })}
            </div>
          )}
          {order_note && (
            <div className="cart-item-extra-infomation">
              Ghi chú: {order_note}
            </div>
          )}
        </div>
        <div className="flex-none ml-2">
          <div className="mb-2">
            <CartCounter
              count={quantity}
              setCount={setQuantity}
              inventory_quantity={item.variant.inventory_quantity}
              item={item}
              setError={setError}
            />
          </div>
          <MyDeleteButton
            id={item.id}
            className="text-sm leading-6 font-normal"
            data-testid="cart-item-remove-button"
          >
            Xóa
          </MyDeleteButton>
        </div>
      </div>
      <ErrorMessage error={error} data-testid="product-error-message" />
    </>
  )
}

export default CartItem
