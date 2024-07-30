import { Region } from "@medusajs/medusa"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import DishPreview from "@modules/products/components/dish-preview"
import { ProductPreviewType } from "types/global"

const DishesList = ({
  products,
  pricedProducts,
  region,
}: {
  products: ProductPreviewType[]
  pricedProducts: (PricedProduct | null)[]
  region: Region
}) => {
  if (!products) {
    return null
  }
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full gap-x-6 gap-y-8">
      {products.map((product, index) => (
        <li key={product.id}>
          <DishPreview
            dishPreview={product}
            pricedProduct={pricedProducts[index]}
            region={region}
            thumbnailSize="square-small"
            category="dessertsAndDrinks"
          />
        </li>
      ))}
    </ul>
  )
}

export default DishesList
