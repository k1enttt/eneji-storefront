import { ProductPreviewType } from "types/global";
import { Region } from "@medusajs/medusa"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import DishPreview from "@modules/products/components/dish-preview"
import NavBar from "../components/nav-bar";

const ViewMoreWeeklyMenu = (
  { 
    products,
    pricedProducts,
    region,
   }: { products: ProductPreviewType[]
    pricedProducts: (PricedProduct | null)[]
    region: Region }
) => {
  return ( 
  <div>
    <NavBar title="Thực đơn hàng tuần" />
    <div className="py-6">
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
  </div> );
}
 
export default ViewMoreWeeklyMenu;