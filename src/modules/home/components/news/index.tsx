import DishPreview from "@modules/products/components/dish-preview";
import { Text } from "@medusajs/ui";
import { ProductPreviewType } from "types/global";
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
import { Region } from "@medusajs/medusa";
import Link from "next/link";
import PostPreview from "@modules/products/components/post-review";

const News = ({
  products,
  region,
}: {
  products: ProductPreviewType[]
  region: Region
}) => {
  return ( <div className="content-container py-6">
    <div className="flex justify-between">
      <Text className="txt-xlarge mb-6 font-[500]">Tin tức</Text>
      <Link href="/products/weekly-menu" className="text-[#20419A] font-[500]">Xem thêm</Link>
    </div>

    <ul className="grid grid-cols-2 w-full gap-x-6 gap-y-8">
        {products.map((product, index) => (
          <li key={product.id}>
            <PostPreview
              postPreview={product}
              category="news"
            />
          </li>
        ))}
      </ul>
  </div> );
}
 
export default News;