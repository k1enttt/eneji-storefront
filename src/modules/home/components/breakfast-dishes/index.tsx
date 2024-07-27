import { ProductPreviewType } from "types/global"
import DishPreview from "@modules/products/components/dish-preview"
import { Region } from "@medusajs/medusa"
import { Text } from "@medusajs/ui"
import TimeBlock from "@modules/products/components/dish-preview/time-block"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"

const BreakfastDishes = ({
  products,
  pricedProducts,
  region,
}: {
  products: ProductPreviewType[]
  pricedProducts: (PricedProduct | null)[]
  region: Region
}) => {
  return (
    <div className="content-container py-6">
      <div className="mb-6">
        <Text className="txt-xlarge font-[500]">Món ăn bữa sáng 🌤️</Text>
        <div className="flex justify-start">
          <div className="txt-medium mr-1">Kết thúc trong </div>
          <TimeBlock time="10:00:00" />
        </div>
      </div>
      <ul className="grid grid-cols-2 w-full small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8">
        {products.map((product, index) => (
          <li key={product.id}>
            <DishPreview
              dishPreview={product}
              pricedProduct={pricedProducts[index]}
              region={region}
              thumbnailSize="square"
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BreakfastDishes
