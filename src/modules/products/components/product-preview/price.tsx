import { Text, clx } from "@medusajs/ui"

import { PriceType } from "../product-actions"

export default function PreviewPrice({
  price,
  size = "normal",
}: {
  price: PriceType
  size?: "normal" | "big"
}) {
  if (size === "big") {
    return (
      <div className="flex gap-x-1">
        {price.price_type === "sale" && (
          <Text
            className="text-sm line-through"
            data-testid="original-price"
          >
            {price.original_price}
          </Text>
        )}
        <Text
          className={"font-bold text-[#20419A]"}
          data-testid="price"
        >
          {price.calculated_price}
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
