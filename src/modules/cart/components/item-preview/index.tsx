import { formatVietnamPrice } from "@lib/util/format-price"
import { LineItem } from "@medusajs/medusa"
import { map } from "lodash"
import { MultiSelectOption } from "types/global"

const mapOptionValue = (options: MultiSelectOption[]) => {
  return options
    .filter((option) => option.selected)
    .map((option) => option.label)
    .join(", ")
}

const ItemPreview = ({
  index,
  item,
}: {
  index: number
  item: LineItem
}) => {
  const options = mapOptionValue(
    item.metadata.multi_select_option as MultiSelectOption[]
  )
  return (
    <div key={index} className="checkout-dishes-line">
      <div>{item.quantity}x</div>
      <div className="flex-1 base-0">
        <div>
          {item.title} - {item.description}
        </div>
        {options.length > 0 && (
          <div className="text-sm text-[#475467]">Topping: {options}</div>
        )}
        {(item.metadata.order_note as string) && (
          <div className="text-sm text-[#475467]">
            Ghi chú: {item.metadata.order_note as string}
          </div>
        )}
      </div>
      <div>{formatVietnamPrice(item.subtotal || 0)}</div>
    </div>
  )
}

export default ItemPreview
