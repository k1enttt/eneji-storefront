import { formatVietnamPrice } from "@lib/util/format-price"
import { LineItem } from "@medusajs/medusa"
import { MultiSelectOption } from "types/global"
import ItemPreview from "../components/item-preview"
import { redirect } from "next/navigation"
import Link from "next/link"

const MyItemsPreviewTemplate = ({ items }: { items: LineItem[] }) => {
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
          <ItemPreview
            key={item.id}
            index={index}
            item={item}
          />
        ))}
      </div>
      <div>
        <Link href="/" className="text-sm text-[#20419A] font-[500]">
          Thêm món
        </Link>
      </div>
    </div>
  )
}

export default MyItemsPreviewTemplate
