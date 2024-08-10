import { ProductPreviewType } from "types/global"
import { Region } from "@medusajs/medusa"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import DishPreview from "@modules/products/components/dish-preview"
import NavBar from "../components/nav-bar"
import { getDayOfWeek } from "@lib/util/get-date-of-week"

const ViewMoreWeeklyMenu = ({
  products,
  pricedProducts,
  region,
}: {
  products: ProductPreviewType[]
  pricedProducts: (PricedProduct | null)[]
  region: Region
}) => {
  return (
    <div className="">
      <DayMenu
        label="Thứ 2"
        products={products}
        pricedProducts={pricedProducts}
        region={region}
      />
      <DayMenu
        label="Thứ 3"
        products={products}
        pricedProducts={pricedProducts}
        region={region}
      />
      <DayMenu
        label="Thứ 4"
        products={products}
        pricedProducts={pricedProducts}
        region={region}
      />
      <DayMenu
        label="Thứ 5"
        products={products}
        pricedProducts={pricedProducts}
        region={region}
      />
      <DayMenu
        label="Thứ 6"
        products={products}
        pricedProducts={pricedProducts}
        region={region}
      />
    </div>
  )
}

export default ViewMoreWeeklyMenu

const DayMenu = ({
  label,
  products,
  pricedProducts,
  region,
}: {
  label: "Thứ 2" | "Thứ 3" | "Thứ 4" | "Thứ 5" | "Thứ 6"
  products: ProductPreviewType[]
  pricedProducts: (PricedProduct | null)[]
  region: Region
}) => {
  const filteredProducts = products.filter(
    (product) => (product.metadata) && (getDayOfWeek(product.metadata.start_date) == label)
  )
  return (
    <div className="py-4">
      <div className="font-semibold text-lg pt-4">{label}</div>
      <ul className="flex flex-nowrap gap-x-4 lg:gap-x-5 gap-y-8 overflow-x-auto pt-4 no-scrollbar">
        {filteredProducts.map((product, index) => (
          <li key={product.id}>
            <DishPreview
              dishPreview={product}
              pricedProduct={pricedProducts[index]}
              region={region}
              thumbnailSize="square-medium"
              category="weeklyMenu"
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
