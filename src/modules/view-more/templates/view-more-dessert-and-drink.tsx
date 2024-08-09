"use client"
import { Region } from "@medusajs/medusa"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import DishesList from "@modules/home/components/desserts-and-drinks/dishes-list"
import ToggleButton from "@modules/home/components/desserts-and-drinks/toggle-button"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import { Suspense, useState } from "react"
import { DessertsAndDrinksProps, ProductPreviewType } from "types/global"
import "@fortawesome/fontawesome-free/css/all.css"
import NavBar from "../components/nav-bar"

const ViewMoreDessertsAndDrinks = ({
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

  const dessertsList = products.filter(
    (product) => product.tags != null && product.tags.find((tag) => tag.value === "Dessert")
  )
  const drinksList = products.filter(
    (product) => product.tags != null && product.tags.find((tag) => tag.value === "Drink")
  )

  const pricedDesserts = pricedProducts.filter(
    (product) => product && product.tags?.find((tag) => tag.value === "Dessert")
  )
  const pricedDrinks = pricedProducts.filter(
    (product) => product && product.tags?.find((tag) => tag.value === "Drink")
  )
  return (
    <div className="py-6">
      <NavBar />
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
    </div>
  )
}

export default ViewMoreDessertsAndDrinks
