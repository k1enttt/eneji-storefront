import { clx } from "@medusajs/ui"
import Image from "next/image"
import newsImage4 from "../../../../public/images/news-4.png"
import CheckboxSquare from "../components/check-box"
import CheckboxRound from "../components/check-box/check-box-round"
import { useState } from "react"
import { FaPlus, FaMinus } from "react-icons/fa"

const ViewProduct = ({
  className,
  onClick,
}: {
  className?: string
  onClick?: (e: any) => any
}) => {
  return (
    <div className={clx("bg-white text-[#475467] relative", className)}>
      <div className="w-full h-[470px] flex items-center justify-center overflow-hidden">
        <Image
          src={newsImage4}
          layout="responsive"
          objectFit="cover"
          alt="Thumbnail"
        />
      </div>
      <div className="py-2 px-[12.5rem] space-y-4 mb-5">
        <div className="space-y-2">
          <div className="font-semibold text-2xl text-black">Tên món ăn</div>
          <div className="text-base">Mô tả món ăn</div>
          <div className="flex gap-x-1">
            <div className="text-sm line-through">Giá gốc</div>
            <div className="font-bold text-[#20419A]">Giá khuyến mãi</div>
          </div>
          <hr className="text-[#F2F4F7]" />
          <div>
            <div>Địa chỉ</div>
            <div>Xuất xứ</div>
            <div>Thời gian sử dụng món</div>
          </div>
          <hr className="text-[#F2F4F7]" />
          <div>
            <div className="text-lg">Dịch vụ bởi</div>
            <div className="font-bold text-[#20419A]">Eneji Station</div>
          </div>
          <div className="my-4 w-full h-2 bg-[#F2F4F7]"></div>
        </div>
        <div className="space-y-3">
          <div className="flex gap-x-2 items-end justify-start">
            <div className="font-semibold text-lg text-black">
              Title của options
            </div>
            <div className="bullet leading-6"></div>
            <div className="text-sm leading-6">
              Subtitle, vd: 'Không bắt buộc - Chọn nhiều'
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-x-3">
              <div className="flex-initial">
                <CheckboxSquare checked={false} onChange={() => {}} />
              </div>
              <div className="flex-1">Giá trị 1</div>
              <div className="flex-initial">+10.000$</div>
            </div>
            <hr className="text-[#F2F4F7]" />
            <div className="flex items-center gap-x-3">
              <div className="flex-initial">
                <CheckboxSquare checked={false} onChange={() => {}} />
              </div>
              <div className="flex-1">Giá trị 2</div>
              <div className="flex-initial">+10.000$</div>
            </div>
            <hr className="text-[#F2F4F7]" />
            <div className="flex items-center gap-x-3">
              <div className="flex-initial">
                <CheckboxSquare checked={false} onChange={() => {}} />
              </div>
              <div className="flex-1">Giá trị 3</div>
              <div className="flex-initial">+10.000$</div>
            </div>
          </div>
        </div>
        <div className="my-4 w-full h-2 bg-[#F2F4F7]"></div>
        <div className="space-y-3">
          <div className="flex gap-x-2 items-end justify-start">
            <div className="font-semibold text-lg text-black">
              Title của options
            </div>
            <div className="bullet leading-6"></div>
            <div className="text-sm leading-6">
              Subtitle, vd: 'Không bắt buộc - Chọn 1'
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-x-3">
              <div className="flex-initial">
                <CheckboxRound checked={false} onChange={() => {}} />
              </div>
              <div className="flex-1">Giá trị 1</div>
              <div className="flex-initial">+10.000$</div>
            </div>
            <hr className="text-[#F2F4F7]" />
            <div className="flex items-center gap-x-3">
              <div className="flex-initial">
                <CheckboxRound checked={false} onChange={() => {}} />
              </div>
              <div className="flex-1">Giá trị 2</div>
              <div className="flex-initial">+10.000$</div>
            </div>
            <hr className="text-[#F2F4F7]" />
            <div className="flex items-center gap-x-3">
              <div className="flex-initial">
                <CheckboxRound checked={false} onChange={() => {}} />
              </div>
              <div className="flex-1">Giá trị 3</div>
              <div className="flex-initial">+10.000$</div>
            </div>
          </div>
        </div>
        <div className="my-4 w-full h-2 bg-[#F2F4F7]"></div>

        <div className="space-y-1">
          <div className="flex gap-x-2 items-end justify-start">
            <div className="font-semibold text-lg text-black">Ghi chú</div>
            <div className="bullet leading-6"></div>
            <div className="text-sm leading-6">
              Subtitle, vd: Không bắt buộc
            </div>
          </div>
          <textarea
            placeholder="Gửi lời nhắn đến nhà hàng!"
            className="w-full h-20 p-2 border border-[#F2F4F7] rounded-md"
          ></textarea>
        </div>
      </div>
      <div className="w-full h-36 border border-t-2 px-[12.5rem] py-2 space-y-2">
        <div className="flex items-center justify-between">
          <div className="font-semibold text-base">Số lượng</div>
          <Counter />
        </div>
        <div className="w-full h-12 bg-[#20419A] text-white flex items-center justify-center gap-x-2 rounded-md">
          <div className="font-medium text-base">Thêm món</div>
          <div className="font-bold text-sm">40.000đ</div>
        </div>
      </div>
      <CloseComponent onClick={() => {}} />
    </div>
  )
}

export default ViewProduct

const Counter: React.FC = () => {
  const [count, setCount] = useState(0)

  const handleIncrement = () => {
    setCount(count + 1)
  }

  const handleDecrement = () => {
    setCount(count - 1)
  }

  return (
    <div className="flex items-center border rounded-full border-[#20419A]">
      <button
        onClick={handleDecrement}
        className="w-6 h-6 m-1 flex justify-center items-center"
      >
        <FaMinus className="text-base text-[#20419A]/[0.5]" />
      </button>
      <span className="text-lg font-semibold w-8 h-8 flex items-center justify-center">
        {count}
      </span>
      <button
        onClick={handleIncrement}
        className="w-6 h-6 m-1  flex justify-center items-center"
      >
        <FaPlus className="text-base text-[#20419A]" />
      </button>
    </div>
  )
}

const CloseComponent = ({
  className,
  onClick,
}: {
  className?: string
  onClick?: (e: any) => any
}) => {
  return (
    <div
      className={`absolute top-5 left-5 w-9 h-9 p-2 rounded-circle bg-black bg-opacity-50 flex items-center justify-center cursor-pointer ${className}`}
      onClick={onClick}
    >
        <i className="fas fa-times text-xl text-white"></i>
    </div>
  )
}
