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
import { CartWithCheckoutStep } from "types/global"
import { Dispatch } from "react"
import MyDiscountCode from "@modules/checkout/components/discount-code/my-discount-code"

const MyCheckoutForm = ({
  setFormData,
  formData,
  cart,
  customer,
  availableShippingMethods,
}: {
  formData: any
  setFormData: Dispatch<any>
  cart: CartWithCheckoutStep | undefined
  customer: Omit<Customer, "password_hash"> | null
  availableShippingMethods: PricedShippingOption[] | undefined
}) => {
  if (!cart) {
    return null
  }

  if (!availableShippingMethods) {
    return null
  }

  console.log("Cart at Checkout form", cart)

  return (
    <>
      <MyShipping availableShippingMethods={availableShippingMethods} />
      <MyShippingAddresses
        customer={customer}
        formData={formData}
        setFormData={setFormData}
      />

      <div className="checkout-divider-big"></div>
      <MyPacking formData={formData} setFormData={setFormData} />

      <div className="checkout-divider-big"></div>
      <MyItemsPreviewTemplate items={cart.items} />

      <div className="checkout-divider-big"></div>
      <div className="checkout-additional-dishes">
        <div className="checkout-heading">Chọn thêm món</div>
        <div className="checkout-additional-dishes-list">
          <div className="checkout-additional-dishes-line">
            <div className="checkout-additional-dishes-image">
              <div className="checkout-dish-image"></div>
            </div>
            <div className="space-y-1">
              <div className="pt-1 text-sm">Combo trưa 2: Bún thịt nướng</div>
              <div className="font-bold leading-6 text-[#20419A]">40.000đ</div>
              <AddButton
                disabled
                product={{} as PricedProduct}
                region={{} as Region}
              />
            </div>
          </div>
          <div className="checkout-additional-dishes-line">
            <div className="checkout-additional-dishes-image">
              <div className="checkout-dish-image"></div>
            </div>
            <div className="space-y-1">
              <div className="pt-1 text-sm">Combo trưa 2: Bún thịt nướng</div>
              <div className="font-bold leading-6 text-[#20419A]">40.000đ</div>
              <AddButton
                disabled
                product={{} as PricedProduct}
                region={{} as Region}
              />
            </div>
          </div>
          <div className="checkout-additional-dishes-line">
            <div className="checkout-additional-dishes-image">
              <div className="checkout-dish-image"></div>
            </div>
            <div className="space-y-1">
              <div className="pt-1 text-sm">Combo trưa 2: Bún thịt nướng</div>
              <div className="font-bold leading-6 text-[#20419A]">40.000đ</div>
              <AddButton
                disabled
                product={{} as PricedProduct}
                region={{} as Region}
              />
            </div>
          </div>
          <div className="checkout-additional-dishes-line">
            <div className="checkout-additional-dishes-image">
              <div className="checkout-dish-image"></div>
            </div>
            <div className="space-y-1">
              <div className="pt-1 text-sm">Combo trưa 2: Bún thịt nướng</div>
              <div className="font-bold leading-6 text-[#20419A]">40.000đ</div>
              <AddButton
                disabled
                product={{} as PricedProduct}
                region={{} as Region}
              />
            </div>
          </div>
          <div className="checkout-additional-dishes-line">
            <div className="checkout-additional-dishes-image">
              <div className="checkout-dish-image"></div>
            </div>
            <div className="space-y-1">
              <div className="pt-1 text-sm">Combo trưa 2: Bún thịt nướng</div>
              <div className="font-bold leading-6 text-[#20419A]">40.000đ</div>
              <AddButton
                disabled
                product={{} as PricedProduct}
                region={{} as Region}
              />
            </div>
          </div>
          <div className="checkout-additional-dishes-line">
            <div className="checkout-additional-dishes-image">
              <div className="checkout-dish-image"></div>
            </div>
            <div className="space-y-1">
              <div className="pt-1 text-sm">Combo trưa 2: Bún thịt nướng</div>
              <div className="font-bold leading-6 text-[#20419A]">40.000đ</div>
              <AddButton
                disabled
                product={{} as PricedProduct}
                region={{} as Region}
              />
            </div>
          </div>
        </div>
        <div className="text-sm text-[#20419A] font-[500]">Thêm món</div>
      </div>
      <div className="checkout-divider-big"></div>
      <MyPayment cart={cart} />

      <div className="checkout-divider-big"></div>
      <MyDiscountCode cart={cart} />

      <div className="checkout-divider-normal"></div>
      <MyNote
        formDataState={{ formData, setFormData }}
      />

      <div className="checkout-divider-normal"></div>
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
      <div className="checkout-divider-normal md:hidden block"></div>
    </>
  )
}

export default MyCheckoutForm
