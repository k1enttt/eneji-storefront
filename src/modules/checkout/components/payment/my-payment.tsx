'use client'
import CheckboxRound from "@modules/products/components/check-box/check-box-round";
import { useState } from "react";

const MyPayment = ({className}:{className?:string}) => {
    const [paymentMethod, setPaymentMethod] = useState<"cod" | "momo" | "eneji">(
    "cod"
  )

  return ( <div className={className || ""}>
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
  </div> );
}
 
export default MyPayment;