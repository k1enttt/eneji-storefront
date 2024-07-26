"use client"
import { Region } from "@medusajs/medusa"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import { Suspense, useState } from "react"
import { ProductPreviewType } from "types/global"
import DishesList from "./dishes-list"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"

type DessertsAndDrinksProps = "desserts" | "drinks"

const DessertsAndDrinks = ({
  products,
  pricedProducts,
  region,
}: {
  products: ProductPreviewType[]
  pricedProducts: (PricedProduct | null)[]
  region: Region
}) => {
  const [dessertsOrDrinks, setDessertsOrDrinks] =
    useState<DessertsAndDrinksProps>("desserts")
  const desserts = products.slice(0, products.length / 2)
  const pricedDesserts = pricedProducts.slice(0, pricedProducts.length / 2)
  const drinks = products.slice(products.length / 2)
  const pricedDrinks = pricedProducts.slice(pricedProducts.length / 2)
  return (
    <div className="w-full bg-[#F2F4F7] py-6">
      <div className="content-container">
        {/* Two button side by side: a "Tráng miệng" button and a "Đồ uống" button */}
        <div className="flex items-center justify-around gap-2">
          <button
            onClick={() => setDessertsOrDrinks("desserts")}
            className={`flex-1 rounded-circle py-4 text-center ${
              dessertsOrDrinks == "desserts"
                ? "bg-[#20419A] text-white font-bold"
                : "bg-white text-black font-medium"
            }`}
          >
            Tráng miệng
          </button>
          <button
            onClick={() => setDessertsOrDrinks("drinks")}
            className={`flex-1 rounded-circle py-4 text-center ${
              dessertsOrDrinks !== "desserts"
                ? "bg-[#20419A] text-white font-bold"
                : "bg-white text-black font-medium"
            }`}
          >
            Đồ uống
          </button>
        </div>

        <div className="py-6">
          {/* A list of "Tráng miệng" */}
          {dessertsOrDrinks === "desserts" && (
            <Suspense fallback={<SkeletonProductGrid />}>
              <DishesList
                products={desserts}
                pricedProducts={pricedDesserts}
                region={region}
              />
            </Suspense>
          )}

          {/* A list of "Đồ uống" */}
          {dessertsOrDrinks !== "desserts" && (
            <Suspense fallback={<SkeletonProductGrid />}>
              <DishesList
                products={drinks}
                pricedProducts={pricedDrinks}
                region={region}
              />
            </Suspense>
          )}
        </div>
      </div>
    </div>
  )
}

export default DessertsAndDrinks
