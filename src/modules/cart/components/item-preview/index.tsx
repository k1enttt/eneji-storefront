import { formatVietnamPrice } from "@lib/util/format-price";
import { LineItem } from "@medusajs/medusa";
import { MultiSelectOption } from "types/global";

const ItemPreview = ({index, item, mapOptionValue} : {
  index: number;
  item: LineItem;
  mapOptionValue: (options: MultiSelectOption[]) => string;
}) => {
  
  return ( 
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
   );
}
 
export default ItemPreview;