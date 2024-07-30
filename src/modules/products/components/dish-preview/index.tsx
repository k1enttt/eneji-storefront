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
  category?:
    | "breakfastAndLunch"
    | "dessertsAndDrinks"
    | "weeklyMenu"
}) {
  if (!pricedProduct) {
    return null
  }

  const { cheapestPrice } = getProductPrice({
    product: pricedProduct,
    region,
  })

  const leftDishes = 10
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]
  const today = new Date()
  const dayOfWeek = daysOfWeek[today.getDay()]

  if (category === "breakfastAndLunch") {
    return (
      <LocalizedClientLink
        href={`/products/${dishPreview.handle}`}
        className="group"
      >
        <div data-testid="product-wrapper" className="">
          <div className="relative">
            <Thumbnail
              thumbnail={dishPreview.thumbnail}
              size={thumbnailSize}
              isFeatured={isFeatured}
            />
            <div className="h-8 w-8 bg-[#20419A] rounded-circle flex items-center justify-center absolute right-2 bottom-2">
              <i className="fas fa-plus text-white text-lg"></i>
            </div>
          </div>

          <div className="flex flex-col txt-compact-medium mt-4 justify-between">
            <Text
              className="text-ui-fg-subtle font-semibold"
              data-testid="product-title"
            >
              {dishPreview.title}
            </Text>
            <div className="flex items-center gap-x-2 font-bold">
              {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
            </div>
            {leftDishes > 0 && (
              <Text className="text-ui-fg-muted">{leftDishes} left</Text>
            )}
          </div>
        </div>
      </LocalizedClientLink>
    )
  }
  if (category === "dessertsAndDrinks") {
    return (
      <LocalizedClientLink
        href={`/products/${dishPreview.handle}`}
        className="group"
      >
        <div
          data-testid="product-wrapper"
          className="flex gap-4 bg-white rounded-md relative min-w-[22rem]"
        >
          <Thumbnail
            thumbnail={dishPreview.thumbnail}
            size={thumbnailSize}
            isFeatured={isFeatured}
          />
          <div className="h-8 w-8 bg-[#20419A] rounded-circle flex items-center justify-center absolute right-2 bottom-2">
            <i className="fas fa-plus text-white text-lg"></i>
          </div>

          <div className="flex flex-col gap-2 justify-start txt-compact-medium mt-4">
            <Text
              className="text-ui-fg-subtle font-semibold"
              data-testid="product-title"
            >
              {dishPreview.title}
            </Text>
            <div className="items-center gap-x-2">
              {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
            </div>
            {leftDishes > 0 && (
              <Text className="text-ui-fg-muted">{leftDishes} left</Text>
            )}
          </div>
        </div>
      </LocalizedClientLink>
    )
  }
  if (category === "weeklyMenu") {
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
          <div className="flex items-center gap-x-1 text-gray bullet gap-1 mt-2">
            <Text className="text-ui-fg-muted">{dayOfWeek}</Text>
          </div>
          <div className="txt-compact-medium mt-1">
            <Text className="text-ui-fg-subtle font-semibold" data-testid="product-title">
              {dishPreview.title}
            </Text>
          </div>
        </div>
      </LocalizedClientLink>
    )
  }
  return null
}
