"use client"
import { Region } from "@medusajs/medusa"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import { clx } from "@medusajs/ui"
import CheckboxRound from "@modules/products/components/check-box/check-box-round"
import AddButton from "@modules/products/components/dish-preview/add-button"
import { useState } from "react"

const MyCheckoutForm = () => {
  const [shippingMethod, setShippingMethod] = useState<
    "giao-tan-noi" | "den-nha-hang"
  >("giao-tan-noi")
  const [packing, setPacking] = useState<"hop-giay" | "khong-hop-giay">(
    "hop-giay"
  )
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "momo" | "eneji">(
    "cod"
  )
  const [textareaContent, setTextareaContent] = useState("")

  return (
    <div className="checkout-details">
      <div className="checkout-shipping-methods">
        <button
          onClick={() => setShippingMethod("giao-tan-noi")}
          className={clx(
            "checkout-shipping-method",
            shippingMethod == "giao-tan-noi"
              ? "bg-[#20419A] text-white font-bold"
              : "font-[500]"
          )}
        >
          <div className="checkout-shipping-text">Giao tận nơi</div>
        </button>
        <button
          onClick={() => setShippingMethod("den-nha-hang")}
          className={clx(
            "checkout-shipping-method",
            shippingMethod == "den-nha-hang"
              ? "bg-[#20419A] text-white font-bold"
              : "font-[500]"
          )}
        >
          <div className="checkout-shipping-text">Đến nhà hàng</div>
        </button>
      </div>
      <div className="checkout-shipping-address">
        <div className="flex-1">
          <div className="text-sm text-[#475467]">Địa chỉ</div>
          <div>2/29 Cao Thắng, Phường 05, Quận 3, TP.HCM</div>
        </div>
        <div className="flex-none text-base h-6 w-6 flex items-center justify-center">
          <i className="fa-solid fa-chevron-right"></i>
        </div>
      </div>
      <div className="checkout-divider-big"></div>
      <div className="checkout-packing">
        <div className="checkout-heading">Chọn cách đóng gói</div>
        <div className="checkout-options">
          <div className="checkout-option">
            <CheckboxRound
              checked={packing == "hop-giay"}
              onChange={() =>
                packing == "khong-hop-giay" && setPacking("hop-giay")
              }
            />
            <div className="checkout-option-label">Hộp giấy</div>
            <div>+10.000đ</div>
          </div>
          <div className="checkout-divider-normal"></div>
          <div className="checkout-option">
            <CheckboxRound
              checked={packing == "khong-hop-giay"}
              onChange={() =>
                packing == "hop-giay" && setPacking("khong-hop-giay")
              }
            />
            <div className="checkout-option-label">Khay ăn</div>
            <div>0đ</div>
          </div>
        </div>
      </div>
      <div className="checkout-divider-big"></div>
      <div className="checkout-dishes">
        <div className="checkout-heading">Món ăn</div>
        <div className="checkout-dishes-list">
          <div className="checkout-dishes-line">
            <div>1x</div>
            <div className="flex-1 base-0">
              <div>Gà quay sốt nấm - Su xào - Canh</div>
              <div className="text-sm text-[#475467]">Topping: bánh mì</div>
              <div className="text-sm text-[#475467]">Ghi chú: không hành</div>
            </div>
            <div>40.000đ</div>
          </div>
          <div className="checkout-divider-normal"></div>
          <div className="checkout-dishes-line">
            <div>1x</div>
            <div className="flex-1 base-0">
              <div>Bánh mì kẹp</div>
            </div>
            <div>40.000đ</div>
          </div>
        </div>
        <div className="text-sm text-[#20419A] font-[500]">Thêm món</div>
      </div>
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
      <div className="checkout-payment-method">
        <div className="checkout-heading">Phương thức thanh toán</div>
        <div className="checkout-options">
          <div className="checkout-option">
            <CheckboxRound
              checked={paymentMethod == "cod"}
              onChange={() => paymentMethod != "cod" && setPaymentMethod("cod")}
            />
            <div className="checkout-option-label">Tiền mặt (COD)</div>
            <div>
              <i className="fa-solid fa-money-bill"></i>
            </div>
          </div>
          <div className="checkout-divider-normal"></div>
          <div className="checkout-option">
            <CheckboxRound
              checked={paymentMethod == "momo"}
              onChange={() =>
                paymentMethod != "momo" && setPaymentMethod("momo")
              }
            />
            <div className="checkout-option-label">Momo</div>
            <div>
              <i className="fa-solid fa-wallet text-[#A50064]"></i>
            </div>
          </div>
          <div className="checkout-divider-normal"></div>
          <div className="checkout-option">
            <CheckboxRound
              checked={paymentMethod == "eneji"}
              onChange={() =>
                paymentMethod != "eneji" && setPaymentMethod("eneji")
              }
            />
            <div className="checkout-option-label">Thẻ Eneji</div>
            <div>
              <i className="fa-solid fa-coins text-[#F79009]"></i>
            </div>
          </div>
        </div>
      </div>
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
      <div className="checkout-note">
        <div className="flex gap-x-2 items-end justify-start">
          <div className="checkout-heading">Ghi chú</div>
          <div className="bullet leading-6"></div>
          <div className="text-sm leading-6">Không bắt buộc</div>
        </div>
        <textarea
          value={textareaContent}
          onChange={(e) => setTextareaContent(e.target.value)}
          placeholder="Gửi lời nhắn đến nhà hàng!"
          className="w-full h-20 p-2 border border-[#F2F4F7] rounded-md"
        ></textarea>
      </div>
      <div className="checkout-divider-normal"></div>
      <div className="checkout-trading-condition">
        <div>
          <i className="fa-solid fa-book text-[#20419A]"></i>
        </div>
        <div>Bằng việc nhấn "Đặt đơn", bạn đồng ý tuân thủ theo <a className="text-[#20419A]">Điều kiện giao dịch</a> chung của Eneji Station</div>
      </div>
    </div>
  )
}

export default MyCheckoutForm
