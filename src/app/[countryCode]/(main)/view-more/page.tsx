import { Region } from "@medusajs/medusa"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import DishesList from "@modules/home/components/desserts-and-drinks/dishes-list"
import ToggleButton from "@modules/home/components/desserts-and-drinks/toggle-button"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import ViewMoreTemplate from "@modules/view-more/templates"
import { Metadata } from "next"
import { Suspense, useState } from "react"
import {
  DessertsAndDrinksProps,
  ProductPreviewType,
  ViewMoreProps,
} from "types/global"

export const metadata: Metadata = {
  title: "View more",
  description: "Explore all of our products.",
}

type Params = {
  searchParams: {
    type?: ViewMoreProps
  }
  params: {
    countryCode: string
  }
}

const ViewMore = ({ searchParams, params }: Params) => {
  const { type } = searchParams

  return <ViewMoreTemplate type={type} countryCode={params.countryCode} />
}

export default ViewMore
