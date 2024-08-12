import { Text, clx } from "@medusajs/ui"

import { PriceType } from "../product-actions"
import { formatedCommaPrice } from "@lib/util/format-price"

export default function PreviewPrice({
  price,
  size = "normal",
}: {
  price: PriceType
  size?: "normal" | "big"
}) {
  // Show gray color text if price is not available
  if (!price.price_type)
    return <Text className="font-semibold text-ui-fg-muted">Chưa có giá</Text>
  if (size === "big") {
    return (
      <div className="flex gap-x-1">
        {price.price_type === "sale" && (
          <Text className="text-sm line-through" data-testid="original-price">
            {formatedCommaPrice(price.original_price_number)}đ
          </Text>
        )}
        <Text className={"font-bold text-[#20419A]"} data-testid="price">
          {formatedCommaPrice(price.calculated_price_number)}đ
        </Text>
      </div>
    )
  }

  return (
    <>
      {price.price_type === "sale" && (
        <Text
          className="line-through text-ui-fg-muted"
          data-testid="original-price"
        >
          {formatedCommaPrice(price.original_price_number)}đ
        </Text>
      )}
      <Text
        className={clx("text-[#20419A] font-semibold", {
          "text-[#20419A] font-semibold": price.price_type === "sale",
        })}
        data-testid="price"
      >
        {formatedCommaPrice(price.calculated_price_number)}đ
      </Text>
    </>
  )
}

const MedusaPriceComponent = ({ price }: { price: PriceType }) => {
  return (
    <Text
      className={clx("text-ui-fg-muted", {
        "text-ui-fg-interactive": price.price_type === "sale",
      })}
      data-testid="price"
    >
      {price.calculated_price}
    </Text>
  )
}