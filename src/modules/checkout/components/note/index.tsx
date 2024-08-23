'use client'
import { Dispatch, useState } from "react"

const MyNote = ({ formDataState }: { formDataState: {formData: any, setFormData: Dispatch<any>} }) => {
  const { formData, setFormData } = formDataState

  const handleChange = (value: string) => {
    setFormData({
      ...formData,
      "metadata.order_note": value,
    })
  }

  return (
    <div className="checkout-note">
      <div className="flex gap-x-2 items-end justify-start">
        <div className="checkout-heading">Ghi chú</div>
        <div className="bullet leading-6"></div>
        <div className="text-sm leading-6">Không bắt buộc</div>
      </div>
      <textarea
        value={formData["metadata.order_note"]}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Gửi lời nhắn đến nhà hàng!"
        className="w-full h-20 p-2 border border-[#F2F4F7] rounded-md"
      ></textarea>
    </div>
  )
}

export default MyNote
