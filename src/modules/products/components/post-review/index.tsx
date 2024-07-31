import { Text } from "@medusajs/ui"

import { ProductPreviewType } from "types/global"

import { getProductPrice } from "@lib/util/get-product-price"
import { Region } from "@medusajs/medusa"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "../product-preview/price"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import { Blog } from "@lib/data/data"

export default function PostPreview({
  postPreview,
  isFeatured,
  thumbnailSize = "full",
  category = "promotions",
}: {
  postPreview: Blog
  isFeatured?: boolean
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
    | "rectangle-medium"
    | undefined
  category?:
    | "promotions"
    | "news"
}) {

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

  if (category === "promotions") {
    return (
      <LocalizedClientLink
        // href={`/products/${postPreview.handle}`}
        href={`/products/#`}
        className="group"
      >
        <div data-testid="product-wrapper">
          <Thumbnail
            thumbnail={postPreview.image}
            size={thumbnailSize}
            isFeatured={isFeatured}
          />
        </div>
      </LocalizedClientLink>
    )
  }
  if (category === "news") {
    return (
      <LocalizedClientLink
        // href={`/products/${postPreview.handle}`}
        href={`/products/#`}
        className="group relative"
      >
        <div data-testid="product-wrapper">
          <Thumbnail
            thumbnail={postPreview.image}
            size={thumbnailSize}
            isFeatured={isFeatured}
          />
          <div className="flex justify-between absolute bottom-0 w-full gradient-div">
            <Text className="text-white font-semibold px-2 py-1 lg:px-4 lg:py-2 flex items-end" data-testid="product-title">
              {postPreview.title}
            </Text>
          </div>
        </div>
      </LocalizedClientLink>
    )
  }
  return null
}
