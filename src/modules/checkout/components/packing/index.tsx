"use client"
import CheckboxRound from "@modules/products/components/check-box/check-box-round"
import { Dispatch, useEffect, useState } from "react"

const MyPacking = ({
  className,
  formData,
  setFormData,
}: {
  className?: string
  formData: any
  setFormData: Dispatch<any>
}) => {
  const [packing, setPacking] = useState<"hop-giay" | "khay-an">(
    "hop-giay"
  )

  const handleChange = (value: string) => {
    setPacking(value as "hop-giay" | "khay-an")
    setFormData({
      ...formData,
      "metadata.packing": value,
    })
  }

  useEffect(() => {
    setFormData({
      ...formData,
      "metadata.packing": packing,
    })
  }, [])

  return (
    <div className={className || ""}>
      <div className="checkout-heading">Chọn cách đóng gói</div>
      <div className="checkout-options">
        <div className="checkout-option">
          <CheckboxRound
            checked={packing == "hop-giay"}
            onChange={() =>
              packing == "khay-an" && handleChange("hop-giay")
            }
          />
          <div className="checkout-option-label">Hộp giấy</div>
          <div>+10.000đ</div>
        </div>
        <div className="checkout-divider-normal"></div>
        <div className="checkout-option">
          <CheckboxRound
            checked={packing == "khay-an"}
            onChange={() =>
              packing == "hop-giay" && handleChange("khay-an")
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
