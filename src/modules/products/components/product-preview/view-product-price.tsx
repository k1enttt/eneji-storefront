import { Text, clx } from "@medusajs/ui"

import { PriceType } from "../product-actions"

export default function BigPreviewPrice({ price }: { price: PriceType }) {
  return (
    <>
      {price.price_type === "sale" && (
        <Text
          className="line-through text-ui-fg-muted"
          data-testid="original-price"
        >
          {price.original_price}
        </Text>
      )}
      <Text
        className={clx("text-[#20419A] font-semibold", {
          "text-[#20419A] font-semibold": price.price_type === "sale",
        })}
        data-testid="price"
      >
        {price.calculated_price}
      </Text>
    </>
  )
}

