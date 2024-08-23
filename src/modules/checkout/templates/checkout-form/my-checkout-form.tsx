import { Customer, Region } from "@medusajs/medusa"
import {
  PricedProduct,
  PricedShippingOption,
} from "@medusajs/medusa/dist/types/pricing"
import MyItemsPreviewTemplate from "@modules/cart/templates/my-item-preview"
import MyShippingAddresses from "@modules/checkout/components/shipping-address/my-shipping-addresses"
import MyNote from "@modules/checkout/components/note"
import MyPacking from "@modules/checkout/components/packing"
import MyPayment from "@modules/checkout/components/payment/my-payment"
import MyShipping from "@modules/checkout/components/shipping/my-shipping"
import AddButton from "@modules/products/components/dish-preview/add-button"
import { CartWithCheckoutStep, ProductPreviewType } from "types/global"
import { Dispatch } from "react"
import MyDiscountCode from "@modules/checkout/components/discount-code/my-discount-code"
import Link from "next/link"
import { formatVietnamPrice } from "@lib/util/format-price"
import { getProductPrice } from "@lib/util/get-product-price"

const MyCheckoutForm = ({
  setFormData,
  formData,
  cart,
  customer,
  availableShippingMethods,
  weeklyMenu,
}: {
  formData: any
  setFormData: Dispatch<any>
  cart: CartWithCheckoutStep | undefined
  customer: Omit<Customer, "password_hash"> | null
  availableShippingMethods: PricedShippingOption[] | undefined
  weeklyMenu: {
    products: ProductPreviewType[]
    pricedProducts: (PricedProduct | null)[]
    region: Region
  }
}) => {
  if (!cart) {
    return null
  }

  if (!availableShippingMethods) {
    return null
  }

  console.log("Cart at Checkout form", cart)

  console.log(weeklyMenu.products)

  return (
    <>
      <MyShipping availableShippingMethods={availableShippingMethods} />
      <MyShippingAddresses
        customer={customer}
        formData={formData}
        setFormData={setFormData}
      />

      <div className="divider-big"></div>
      <MyPacking formData={formData} setFormData={setFormData} />

      <div className="divider-big"></div>
      <MyItemsPreviewTemplate items={cart.items} />

      <div className="divider-big"></div>
      <div className="checkout-additional-dishes">
        <div className="checkout-heading">Chọn thêm món</div>
        <div className="checkout-additional-dishes-list">
          {weeklyMenu.products.map((product, index) => {
            if (!weeklyMenu.pricedProducts[index]) {
              return null
            }
            const { cheapestPrice } = getProductPrice({
              product: weeklyMenu.pricedProducts[index],
              region: weeklyMenu.region,
            })
            return (
              <div key={index} className="checkout-additional-dishes-line">
                <div className="checkout-additional-dishes-image">
                  {product.thumbnail ? (
                    <img
                      width={100}
                      height={100}
                      src={product.thumbnail}
                      alt={product.title}
                      className="rounded-lg"
                    />
                  ) : (
                    <div className="checkout-dish-image"></div>
                  )}
                </div>
                <div className="space-y-1">
                  <div className="pt-1 text-sm">{product.title}</div>
                  <div className="font-bold leading-6 text-[#20419A]">
                    {formatVietnamPrice(cheapestPrice?.original_price_number)}
                  </div>
                  <AddButton
                    disabled
                    product={weeklyMenu.pricedProducts[index]}
                    region={weeklyMenu.region}
                  />
                </div>
              </div>
            )
          })}
        </div>
        <div className="text-sm text-[#20419A] font-[500]">
          <Link href="/">Thêm món</Link>
        </div>
      </div>
      <div className="divider-big"></div>
      <MyPayment cart={cart} />

      <div className="divider-big"></div>
      <MyDiscountCode cart={cart} />

      <div className="divider-normal"></div>
      <MyNote formDataState={{ formData, setFormData }} />

      <div className="divider-normal"></div>
      <div className="checkout-trading-condition">
        <div>
          <i className="fa-solid fa-book text-[#20419A]"></i>
        </div>
        <div>
          Bằng việc nhấn "Đặt đơn", bạn đồng ý tuân thủ theo{" "}
          <a className="text-[#20419A]">Điều kiện giao dịch</a> chung của Eneji
          Station
        </div>
      </div>
      <div className="divider-normal md:hidden block"></div>
    </>
  )
}

export default MyCheckoutForm
