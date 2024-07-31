import { Region } from "@medusajs/medusa"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import { Text } from "@medusajs/ui"
import DishPreview from "@modules/products/components/dish-preview"
import Link from "next/link"
import { ProductPreviewType } from "types/global"

const WeeklyMenu = ({
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
      <div className="flex justify-start md:justify-between">
        <Text className="txt-xlarge mb-6 font-[500]">Thực đơn tuần này 🍴</Text>
        <div className="block md:hidden">
          <i className="fa-solid fa-arrow-right text-lg py-2 px-3"></i>
        </div>
        <div className=" hidden md:block">
          <Link href="/view-more" className="text-[#20419A] font-[500]">
            Xem thêm
          </Link>
        </div>
      </div>

      <ul className="flex flex-nowrap gap-x-4 lg:gap-x-5 gap-y-8 overflow-x-auto pb-4 no-scrollbar">
        {products.map((product, index) => (
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

export default WeeklyMenu
