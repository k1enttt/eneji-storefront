import DishPreview from "@modules/products/components/dish-preview"
import { Text } from "@medusajs/ui"
import { ProductPreviewType } from "types/global"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import { Region } from "@medusajs/medusa"
import Link from "next/link"
import PostPreview from "@modules/products/components/post-review"

const News = ({
  products,
  region,
}: {
  products: ProductPreviewType[]
  region: Region
}) => {
  return (
    <div className="content-container py-6">
      <div className="flex justify-start md:justify-between">
        <Text className="txt-xlarge mb-6 font-[500]">Tin tức</Text>
        <div className="block md:hidden">
          <i className="fa-solid fa-arrow-right text-lg py-2 px-3"></i>
        </div>
        <Link
          href="/view-more"
          className="text-[#20419A] font-[500] hidden md:block"
        >
          Xem thêm
        </Link>
      </div>

      <ul className="grid grid-cols-2 w-full gap-4 lg:gap-5">
        {products.map((product) => (
          <li key={product.id} className="w-full h-full">
            <PostPreview
              postPreview={product}
              category="news"
              thumbnailSize="rectangle"
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default News
