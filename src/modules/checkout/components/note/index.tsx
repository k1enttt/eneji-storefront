'use client'
import { useState } from "react"

const MyNote = ({ className }: { className?: string }) => {
  const [textareaContent, setTextareaContent] = useState("")

  return (
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
  )
}

export default MyNote
