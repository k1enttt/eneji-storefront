"use client"
import Phone from "@modules/common/icons/phone"
import { useState } from "react"

export default function Cancel() {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <button onClick={handleOpen} className="confirm-button-text p-2">
        Cancel
      </button>
      {open && (
        <div className="bg-black/50 fixed top-0 left-0 w-full h-full z-40 flex items-center justify-center">
          <div className="bg-white p-4 rounded-xl flex flex-col text-center gap-6 w-80">
            <div className="space-y-2">
              <div className="flex flex-col gap-1 items-center">
                <div className="h-20 w-20 bg-[#20419A]/[0.2] rounded-full flex items-center justify-center">
                  <Phone size={24} color="#20419A" />
                </div>
                <div className="font-bold text-base">Liên hệ chủ quán</div>
              </div>
              <div>
                <div className="text-sm font-normal leading-6 text-[#334155]">Mọi thắc mắc xin liên hệ hotline:</div>
                <div className="text-sm font-bold leading-6 text-[#334155]">028.3535.2563</div>
              </div>
            </div>
            <button onClick={handleClose} className="mx-4 py-2 flex-1 basis-0 bg-[#20419A] text-white font-semibold rounded-lg">Gọi hỗ trợ</button>
          </div>
        </div>
      )}
    </>
  )
}
