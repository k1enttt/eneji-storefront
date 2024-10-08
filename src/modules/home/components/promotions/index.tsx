import { Blog } from "@lib/data/data"
import { Region } from "@medusajs/medusa"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import { Text } from "@medusajs/ui"
import DishPreview from "@modules/products/components/dish-preview"
import PostPreview from "@modules/products/components/post-review"
import Link from "next/link"
import { ProductPreviewType } from "types/global"

const Promotions = ({
  products,
}: {
  products: Blog[]
}) => {
  return (
    <div className="content-container pb-4 lg:pb-6">
      <div className="flex justify-start md:justify-between">
        <Text className="txt-xlarge mb-2 lg:mb-4 font-[500]">Kho khuyến mãi 🎁</Text>
        <div className="block md:hidden">
        <Link
          href="/view-more?type=promotions"
        >
          <i className="fa-solid fa-arrow-right text-lg py-2 px-3"></i>
          </Link>
        </div>
        <Link
          href="/view-more?type=promotions"
          className="text-[#20419A] font-[500] hidden md:block"
        >
          Xem thêm
        </Link>
      </div>

      <ul className="flex flex-nowrap gap-x-2 md:gap-x-4 lg:gap-x-5 overflow-x-auto pb-4 no-scrollbar">
        {products.map((product, index) => (
          <li key={product.id} className="">
            <PostPreview
              postPreview={product}
              category="promotions"
              thumbnailSize="rectangle-small"
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Promotions
