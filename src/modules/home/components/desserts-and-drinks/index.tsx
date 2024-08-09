"use client"
import { Region } from "@medusajs/medusa"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import { Suspense, useState } from "react"
import { DessertsAndDrinksProps, ProductPreviewType } from "types/global"
import DishesList from "./dishes-list"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import Link from "next/link"
import ToggleButton from "./toggle-button"

const DessertsAndDrinks = ({
  products,
  pricedProducts,
  region,
}: {
  products: ProductPreviewType[]
  pricedProducts: (PricedProduct | null)[]
  region: Region
}) => {
  const limit = 6;
  const [dessertsOrDrinks, setDessertsOrDrinks] =
    useState<DessertsAndDrinksProps>("desserts")
  const dessertsList = products.filter(
    (product) => product.tags != null && (product.tags.find((tag) => tag.value === "Dessert"))
  ).slice(0, limit)
  const drinksList = products.filter(
    (product) => product.tags != null && (product.tags.find((tag) => tag.value === "Drink"))
  ).slice(0, limit)

  /** The priced products is for showing the CHEAPEST price of it.
   * If you need, you can review the "product-preview" component to see how it works.
   */
  const pricedDesserts = pricedProducts.filter(
    (product) => (product != null && (product.tags?.find((tag) => tag.value === "Dessert")))
  ).slice(0, limit)
  const pricedDrinks = pricedProducts.filter(
    (product) => (product != null && (product.tags?.find((tag) => tag.value === "Drink")))
  ).slice(0, limit)

  return (
    <div className="w-full bg-[#F2F4F7] py-6">
      <div className="content-container">
        {/* Two button side by side: a "Tráng miệng" button and a "Đồ uống" button */}
        <ToggleButton
          dessertsOrDrinks={dessertsOrDrinks}
          setDessertsOrDrinks={setDessertsOrDrinks}
        />

        <div className="pt-6">
          {/* A list of "Tráng miệng" */}
          {dessertsOrDrinks === "desserts" && (
            <Suspense fallback={<SkeletonProductGrid />}>
              <DishesList
                products={dessertsList}
                pricedProducts={pricedDesserts}
                region={region}
              />
            </Suspense>
          )}

          {/* A list of "Đồ uống" */}
          {dessertsOrDrinks !== "desserts" && (
            <Suspense fallback={<SkeletonProductGrid />}>
              <DishesList
                products={drinksList}
                pricedProducts={pricedDrinks}
                region={region}
              />
            </Suspense>
          )}
        </div>

        <div className="flex justify-center pt-6">
          <Link
            href="/view-more?type=desserts-and-drinks"
            className="text-[#20419A] font-[500] text-center"
          >
            Xem thêm
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DessertsAndDrinks
