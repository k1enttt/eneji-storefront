"use client"
import CheckboxRound from "@modules/products/components/check-box/check-box-round"
import { useState } from "react"

const MyPacking = ({ className }: { className?: string }) => {
  const [packing, setPacking] = useState<"hop-giay" | "khong-hop-giay">(
    "hop-giay"
  )

  return (
    <div className={className || ""}>
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
  )
}

export default MyPacking
