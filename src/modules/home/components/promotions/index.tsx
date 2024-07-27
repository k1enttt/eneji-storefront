import { Region } from "@medusajs/medusa"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import { Text } from "@medusajs/ui"
import DishPreview from "@modules/products/components/dish-preview"
import Link from "next/link"
import { ProductPreviewType } from "types/global"

const Promotions = ({
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
      <Text className="txt-xlarge mb-6 font-[500]">Khuyến mãi 🎁</Text>

      <ul className="flex flex-nowrap gap-x-6 gap-y-8 overflow-x-auto pb-4">
        {products.map((product, index) => (
          <li key={product.id} className="flex-none w-1/5">
            <DishPreview
              dishPreview={product}
              pricedProduct={pricedProducts[index]}
              region={region}
              thumbnailSize="square"
              category="weeklyMenu"
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Promotions
