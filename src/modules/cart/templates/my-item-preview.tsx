import { formatVietnamPrice } from "@lib/util/format-price"
import { LineItem } from "@medusajs/medusa"
import { MultiSelectOption } from "types/global"

const MyItemsPreviewTemplate = ({ items }: { items: LineItem[] }) => {
  /*
  title
  description
  metadata.order_note
  metadata.multi_select_option
  quantity
  subtotal
  */

  const mapOptionValue = (options: MultiSelectOption[]) => {
    return options
      .filter((option) => option.selected)
      .map((option) => option.label)
      .join(", ")
  }

  return (
    <div className="checkout-dishes">
      <div className="checkout-heading">Món ăn</div>
      <div className="checkout-dishes-list">
        {items.map((item, index) => (
          <div key={index} className="checkout-dishes-line">
            <div>{item.quantity}x</div>
            <div className="flex-1 base-0">
              <div>
                {item.title} - {item.description}
              </div>
              {(item.metadata.multi_select_option as MultiSelectOption[])
                .length > 0 && (
                <div className="text-sm text-[#475467]">
                  Topping:{" "}
                  {mapOptionValue(
                    item.metadata.multi_select_option as MultiSelectOption[]
                  )}
                </div>
              )}
              {(item.metadata.order_note as string) && (
                <div className="text-sm text-[#475467]">
                  Ghi chú: {item.metadata.order_note as string}
                </div>
              )}
            </div>
            <div>{formatVietnamPrice(item.subtotal || 0)}</div>
          </div>
        ))}
        {/* <div className="checkout-dishes-line">
        <div>1x</div>
        <div className="flex-1 base-0">
          <div>Gà quay sốt nấm - Su xào - Canh</div>
          <div className="text-sm text-[#475467]">Topping: bánh mì</div>
          <div className="text-sm text-[#475467]">Ghi chú: không hành</div>
        </div>
        <div>40.000đ</div>
      </div>
      <div className="checkout-divider-normal"></div>
      <div className="checkout-dishes-line">
        <div>1x</div>
        <div className="flex-1 base-0">
          <div>Bánh mì kẹp</div>
        </div>
        <div>40.000đ</div>
      </div> */}
      </div>
      <div className="text-sm text-[#20419A] font-[500]">Thêm món</div>
    </div>
  )
}

export default MyItemsPreviewTemplate
