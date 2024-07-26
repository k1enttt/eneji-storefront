import { Text } from "@medusajs/ui"

import { ProductPreviewType } from "types/global"

import { getProductPrice } from "@lib/util/get-product-price"
import { Region } from "@medusajs/medusa"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "../product-preview/price"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"

export default function DishPreview({
  dishPreview,
  pricedProduct,
  isFeatured,
  region,
}: {
  dishPreview: ProductPreviewType
  pricedProduct: PricedProduct | null
  isFeatured?: boolean
  region: Region
}) {
  if (!pricedProduct) {
    return null
  }

  const { cheapestPrice } = getProductPrice({
    product: pricedProduct,
    region,
  })

  const leftDishes = 10

  return (
    <LocalizedClientLink
      href={`/products/${dishPreview.handle}`}
      className="group"
    >
      <div data-testid="product-wrapper">
        <Thumbnail
          thumbnail={dishPreview.thumbnail}
          size="full"
          isFeatured={isFeatured}
        />
        <div className="flex txt-compact-medium mt-4 justify-between">
          <Text className="text-ui-fg-subtle" data-testid="product-title">
            {dishPreview.title}
          </Text>
          <div className="flex items-center gap-x-2">
            {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
          </div>
        </div>
        {leftDishes > 0 && (
          <Text className="text-ui-fg-muted">{leftDishes} left</Text>
        )}
      </div>
    </LocalizedClientLink>
  )
}
