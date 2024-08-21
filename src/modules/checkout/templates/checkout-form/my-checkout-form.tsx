import {
  createPaymentSessions,
  getCustomer,
  listCartShippingMethods,
} from "@lib/data"
import { getCheckoutStep } from "@lib/util/get-checkout-step"
import { Region } from "@medusajs/medusa"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import MyItemsPreviewTemplate from "@modules/cart/templates/my-item-preview"
import MyAddresses from "@modules/checkout/components/addresses/my-addresses"
import MyNote from "@modules/checkout/components/note"
import MyPacking from "@modules/checkout/components/packing"
import MyPayment from "@modules/checkout/components/payment/my-payment"
import MyShipping from "@modules/checkout/components/shipping/my-shipping"
import AddButton from "@modules/products/components/dish-preview/add-button"
import { cookies } from "next/headers"
import { CartWithCheckoutStep } from "types/global"

const MyCheckoutForm = async () => {
  const cartId = cookies().get("_medusa_cart_id")?.value

  if (!cartId) {
    return null
  }

  // create payment sessions and get cart
  const cart = (await createPaymentSessions(cartId).then(
    (cart) => cart
  )) as CartWithCheckoutStep

  if (!cart) {
    return null
  }

  cart.checkout_step = cart && getCheckoutStep(cart)

  // get available shipping methods
  const availableShippingMethods = await listCartShippingMethods(cart.id).then(
    (methods) => methods?.filter((m) => !m.is_return)
  )

  if (!availableShippingMethods) {
    return null
  }

  // get customer if logged in
  const customer = await getCustomer()

  return (
    <div className="checkout-details">
      <MyShipping
        cart={cart}
        availableShippingMethods={availableShippingMethods}
        className="checkout-shipping-methods"
      />
      <MyAddresses className="checkout-shipping-address" />

      <div className="checkout-divider-big"></div>
      <MyPacking className="checkout-packing" />

      <div className="checkout-divider-big"></div>
      <MyItemsPreviewTemplate items={cart.items} className="checkout-dishes" />
      
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
      <MyPayment className="checkout-payment-method" />

      <div className="checkout-divider-big"></div>
      <div className="checkout-discount">
        <div className="checkout-heading">Nhập mã khuyến mãi</div>
        <div className="checkout-discount-code">
          <input
            type="text"
            placeholder="Hãy nhập mã"
            className="checkout-discount-input"
          />
          <button className="checkout-discount-button">Áp dụng</button>
        </div>
      </div>
      <div className="checkout-divider-normal"></div>
      <MyNote className="checkout-note" />

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
    </div>
  )
}

export default MyCheckoutForm
