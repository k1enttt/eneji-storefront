import { ProductPreviewType } from "types/global"
import DishPreview from "@modules/products/components/dish-preview"
import { Region } from "@medusajs/medusa"
import { Text } from "@medusajs/ui"
import TimeBlock from "@modules/products/components/dish-preview/time-block"

const BreakfastDishes = ({
  products,
  region,
}: {
  products: ProductPreviewType[]
  region: Region
}) => {
  console.log(products)
  return (
    <div className="content-container py-6">
      <div className="mb-6">
        <Text className="txt-xlarge">Món ăn bữa sáng</Text>
        <div className="flex justify-start">
          <div className="txt-medium mr-1">Kết thúc trong </div>
          <TimeBlock time="10:00:00"/>
        </div>
      </div>
      <div>
        <ul className="grid grid-cols-2 w-full small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8">
          {products.map((product) => (
            <li key={product.id}>
              <DishPreview dishPreview={product} region={region} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default BreakfastDishes
