import {
  Cart,
  ProductCategory,
  ProductTag,
  ProductType,
  ProductVariant,
  Region,
} from "@medusajs/medusa"
import {
  PricedProduct,
  PricedVariant,
} from "@medusajs/medusa/dist/types/pricing"
import { ProductCollection } from "@medusajs/product"

export type FeaturedProduct = {
  id: string
  title: string
  handle: string
  thumbnail?: string
}

export type ProductPreviewType = {
  id: string
  title: string
  handle: string | null
  thumbnail: string | null
  created_at?: Date
  type?: ProductType
  variants?: PricedVariant[]
  metadata?: Record<string, any> | null
  tags?: ProductTag[]
  price?: {
    calculated_price: string
    original_price: string
    difference: string
    price_type: "default" | "sale"
  }
  isFeatured?: boolean
}

export type ProductCollectionWithPreviews = Omit<
  ProductCollection,
  "products"
> & {
  products: ProductPreviewType[]
}

export type InfiniteProductPage = {
  response: {
    products: PricedProduct[]
    count: number
  }
}

export type ProductVariantInfo = Pick<ProductVariant, "prices">

export type RegionInfo = Pick<Region, "currency_code" | "tax_code" | "tax_rate">

export type CartWithCheckoutStep = Omit<
  Cart,
  "beforeInsert" | "beforeUpdate" | "afterUpdateOrLoad"
> & {
  checkout_step: "address" | "delivery" | "payment"
}

export type ProductCategoryWithChildren = Omit<
  ProductCategory,
  "category_children"
> & {
  category_children: ProductCategory[]
  category_parent?: ProductCategory
}

export type TimelineProps = {
  breakfastStartTime: string
  breakfastEndTime: string
  lunchStartTime: string
  lunchEndTime: string
}

export type DessertsAndDrinksProps = "desserts" | "drinks"

export type ViewMoreProps =
  | "desserts-and-drinks"
  | "promotions"
  | "news"
  | "weekly-menu"

export type Option = {
  label: string
  price: number
  selected: boolean
}

export type MultiSelectOption = { label: string; selected: boolean }

export type CheckoutFormData = {
  "shipping_address.first_name": string
  "shipping_address.address_1": string
  "shipping_address.phone": string
  email: string
  "shipping_address.metadata.packing": CheckoutPackingMethod
  "shipping_address.metadata.order_note": string
  /*
  Other fields are not used in the form
    "shipping_address.last_name": "",
    "shipping_address.company": "",
    "shipping_address.postal_code": "",
    "shipping_address.city": "",
    "shipping_address.country_code": "vn",
    "shipping_address.province": "",
   */
}

export type CheckoutPackingMethod = {
  id: string
  title: string
  price: number
}
