import { Text } from "@medusajs/ui"

import { ProductPreviewType } from "types/global"

import { getProductPrice } from "@lib/util/get-product-price"
import { Region } from "@medusajs/medusa"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "../product-preview/price"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import { Product } from "@medusajs/product"
import AddButton from "./add-button"
import { getDayOfWeek } from "@lib/util/get-date-of-week"

export default function DishPreview({
  dishPreview,
  pricedProduct,
  isFeatured,
  region,
  thumbnailSize = "full",
  category = "breakfastAndLunch",
}: {
  dishPreview: ProductPreviewType
  pricedProduct: PricedProduct | null
  isFeatured?: boolean
  region: Region
  thumbnailSize?:
    | "small"
    | "square"
    | "medium"
    | "large"
    | "full"
    | "square-small"
    | "square-medium"
    | "rectangle"
    | "rectangle-small"
    | undefined
  category?: "breakfastAndLunch" | "dessertsAndDrinks" | "weeklyMenu"
}) {
  if (!pricedProduct) {
    return null
  }

  /** The price */
  const { cheapestPrice } = getProductPrice({
    product: pricedProduct,
    region,
  })

  /** The inventory quantity */
  let leftDishes = 0
  if (dishPreview.variants) {
    leftDishes =
      dishPreview.variants
        ?.map((value) => value.inventory_quantity)
        .reduce((acc, curr) => (acc! + curr!) as number, 0) || 0
  }

  if (category === "breakfastAndLunch") {
    return (
      <div data-testid="product-wrapper" className="">
        <div className="relative">
          <Thumbnail
            thumbnail={dishPreview.thumbnail}
            size={thumbnailSize}
            isFeatured={isFeatured}
          />
          <AddButton product={pricedProduct} region={region} />
        </div>

        <div className="flex flex-col txt-compact-medium mt-2 justify-between">
          <Text className="font-semibold" data-testid="product-title">
            {dishPreview.title}
          </Text>
          <div className="flex items-center gap-x-2 font-bold">
            {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
          </div>
          <Text className="text-ui-fg-muted">
            {leftDishes > 0 ? `Còn ${leftDishes}` : "Hết hàng"}
          </Text>
        </div>
      </div>
    )
  }
  if (category === "dessertsAndDrinks") {
    return (
      <div
        data-testid="product-wrapper"
        className="flex gap-4 bg-white rounded-md relative min-w-[22rem]"
      >
        <div className="">
          <Thumbnail
            thumbnail={dishPreview.thumbnail}
            size={thumbnailSize}
            isFeatured={isFeatured}
          />
          <AddButton product={pricedProduct} region={region} />
        </div>

        <div className="flex flex-col justify-start txt-compact-medium mt-4">
          <Text className="font-semibold" data-testid="product-title">
            {dishPreview.title}
          </Text>
          <div className="items-center gap-x-2">
            {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
          </div>
          <Text className="text-ui-fg-muted">
            {leftDishes > 0 ? `Còn ${leftDishes}` : "Hết hàng"}
          </Text>
        </div>
      </div>
    )
  }
  if (category === "weeklyMenu") {
    let startDate: string = ""
    if (dishPreview.metadata) {
      startDate = dishPreview.metadata.start_date
    }

    let dayOfWeek = ""
    if (startDate) {
      dayOfWeek = getDayOfWeek(startDate)
    }

    return (
      <LocalizedClientLink
        href={`/products/${dishPreview.handle}`}
        className="group"
      >
        <div data-testid="product-wrapper">
          <Thumbnail
            thumbnail={dishPreview.thumbnail}
            size={thumbnailSize}
            isFeatured={isFeatured}
          />
          {dayOfWeek != "" && (
            <div className="flex items-center gap-x-1 text-gray bullet gap-1 mt-1 lg:mt-2">
              <Text className="text-ui-fg-muted">{dayOfWeek}</Text>
            </div>
          )}
          <Text
            className="font-semibold mt-0 lg:mt-1 text-sm"
            data-testid="product-title"
          >
            {dishPreview.title}
          </Text>
        </div>
      </LocalizedClientLink>
    )
  }
  return null
}
