import { Text } from "@medusajs/ui"

import { ProductPreviewType } from "types/global"

import { retrievePricedProductById } from "@lib/data"
import { getProductPrice } from "@lib/util/get-product-price"
import { Region } from "@medusajs/medusa"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "../product-preview/price"

export default async function DishPreview({
  dishPreview,
  isFeatured,
  region,
}: {
  dishPreview: ProductPreviewType
  isFeatured?: boolean
  region: Region
}) {
  const pricedProduct = await retrievePricedProductById({
    id: dishPreview.id,
    regionId: region.id,
  }).then((product) => product)

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
