import DishPreview from "@modules/products/components/dish-preview"
import { Text } from "@medusajs/ui"
import { ProductPreviewType } from "types/global"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import { Region } from "@medusajs/medusa"
import Link from "next/link"
import PostPreview from "@modules/products/components/post-review"
import { Blog } from "@lib/data/data"

const News = ({ products }: { products: Blog[] }) => {
  return (
    <div className="content-container py-6">
      <div className="flex justify-start md:justify-between">
        <Text className="txt-xlarge mb-6 font-[500]">Tin tức</Text>
        <div className="block md:hidden">
          <Link
            href="/view-more?type=news"
            className="text-[#20419A] font-[500]"
          >
            <i className="fa-solid fa-arrow-right text-lg py-2 px-3"></i>
          </Link>
        </div>
        <div className="hidden md:block">
          <Link
            href="/view-more?type=news"
            className="text-[#20419A] font-[500]"
          >
            Xem thêm
          </Link>
        </div>
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
