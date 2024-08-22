import { Customer } from "@medusajs/medusa"
import { clx } from "@medusajs/ui"
import { Dispatch, SetStateAction, useState } from "react"

type MyShippingAddressesProps = {
  className?: string
  customer: Omit<Customer, "password_hash"> | null
  formData: any
  setFormData: Dispatch<SetStateAction<any>>
}

const MyShippingAddresses: React.FC<MyShippingAddressesProps> = ({
  className,
  formData,
  setFormData,
}) => {
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  //TODO: Dùng 'customer' để lấy sổ địa chỉ đã lưu của khách hàng

  return (
    <div className={clx("flex-1", className || "")}>
      <div className="text-sm text-[#475467]">Địa chỉ</div>
      <input
        type="text"
        name="shipping_address.address_1"
        placeholder="Số nhà, tên đường, phường, quận, thành phố"
        className="w-full border border-[#F2F4F7] px-3 rounded-md"
        value={formData["shipping_address.address_1"]}
        onChange={handleChange}
      />
      <div className="text-sm text-[#475467]">Số điện thoại</div>
      <input
        type="tel"
        name="shipping_address.phone"
        placeholder="0123456789"
        className="w-full border border-[#F2F4F7] px-3 py-2 rounded-md"
        value={formData["shipping_address.phone"]}
        onChange={handleChange}
      />
      <div className="text-sm text-[#475467]">Tên người nhận</div>
      <input
        type="text"
        name="shipping_address.first_name"
        placeholder="Nguyễn Văn A"
        className="w-full border border-[#F2F4F7] px-3 py-2 rounded-md"
        value={formData["shipping_address.first_name"]}
        onChange={handleChange}
      />
    </div>
  )
}

export default MyShippingAddresses
