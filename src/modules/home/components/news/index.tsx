import { clx, Text } from "@medusajs/ui"
import Link from "next/link"
import PostPreview from "@modules/products/components/post-review"
import { Blog } from "@lib/data/data"

const News = ({ products }: { products: Blog[] }) => {
  const previewNews = products.slice(0, 4)
  return (
    <div className="content-container pb-5 lg:pb-6">
      <div className="flex justify-start md:justify-between">
        <Text className="txt-xlarge mb-4 lg:mb-6 font-[500]">Tin tức</Text>
        <div className="block md:hidden">
          <Link
            href="/view-more?type=news"
            className="font-[500]"
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

      <ul className="grid grid-cols-1 md:grid-cols-2 w-full gap-4 lg:gap-5">
        {previewNews.map((product, index) => (
          <li
            key={product.id}
            className={clx("w-full h-full", index > 1 && "hidden md:block")}
          >
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
