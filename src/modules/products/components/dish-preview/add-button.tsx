"use client"
import { Region } from "@medusajs/medusa"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import ViewProduct from "@modules/products/templates/view-product"
import { useState } from "react"

type ProductActionsProps = {
  product: PricedProduct
  region: Region
  disabled?: boolean

}

const AddButton = ({ product, region, disabled }: ProductActionsProps) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false)

  // Open the popup 
  const openPopup = () => {
    setIsPopupVisible(true)
  }

  const closePopup = () => {
    setIsPopupVisible(false)
  }

  return (
    <div className="">
      <div
        onClick={openPopup}
        className="h-8 w-8 bg-[#20419A] rounded-circle flex items-center justify-center absolute right-2 bottom-2 cursor-pointer"
      >
        <i className="fas fa-plus text-white text-lg"></i>
      </div>
      {isPopupVisible && (
        <div className="fixed inset-0 w-full h-full bg-black bg-opacity-50 flex z-40 pointer-events-none">
          <ViewProduct
            product={product}
            handleClose={closePopup}
            region={region}
            className="rounded-t-2xl shadow-lg pointer-events-auto mt-24 md:mt-16 mx-auto w-full md:w-[40em] lg:w-[54rem] overflow-y-auto z-50"
          />
          
        </div>
      )}
    </div>
  )
}

export default AddButton
