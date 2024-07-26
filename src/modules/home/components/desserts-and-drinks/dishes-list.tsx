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
    <ul className="grid grid-cols-2 w-full small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8">
      {products.map((product, index) => (
        <li key={product.id}>
          <DishPreview
            dishPreview={product}
            pricedProduct={pricedProducts[index]}
            region={region}
          />
        </li>
      ))}
    </ul>
  )
}

export default DishesList
