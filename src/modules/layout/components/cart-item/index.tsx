import { useState } from "react"
import CartCounter from "../cart-counter"
import { formatedCommaPrice } from "@lib/util/format-price"

const CartItem = ({
  item,
}: {
  item: {
    id: number
    title: string
    price: number
    quantity: number
    inventory_quantity: number
    metadata: {
      multi_select_option: string[]
      order_note: string
    }
  }
}) => {
  const [quantity, setQuantity] = useState(item.quantity || 0)

  return (
    <div className="cart-item">
      <div className="w-1/3">
        <div className="cart-item-title">{item.title}</div>
        <div className="cart-item-price">{formatedCommaPrice(item.price)}đ</div>
      </div>
      <div className="flex-1">
        <div className="cart-item-extra-infomation">
          {
            item.metadata.multi_select_option &&
            item.metadata.multi_select_option.map(
              (option: string, index: number) => {
                const divider = index < item.metadata.multi_select_option.length - 1 ? ', ' : '' 
                return <span key={index}>{option + divider}</span>
              }
            )}
        </div>
        <div className="cart-item-extra-infomation">
          Ghi chú: {item.metadata.order_note}
        </div>
      </div>
      <div className="flex-none">
        <div className="mb-2">
          <CartCounter
            count={quantity}
            setCount={setQuantity}
            inventory_quantity={item.inventory_quantity}
          />
        </div>
        <div className="text-sm leading-6 font-normal text-[#20419A] text-center">Xóa</div>
      </div>
    </div>
  )
}

export default CartItem
