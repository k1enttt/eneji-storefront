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
    <div>
      <div
        onClick={openPopup}
        className="h-8 w-8 bg-[#20419A] rounded-circle flex items-center justify-center absolute right-2 bottom-2 cursor-pointer"
      >
        <i className="fas fa-plus text-white text-lg"></i>
      </div>
      {isPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 pointer-events-none">
          <ViewProduct
            product={product}
            handleClose={closePopup}
            region={region}
            className="rounded shadow-lg pointer-events-auto max-h-[80vh] w-[54rem] overflow-y-auto"
          />
        </div>
      )}
    </div>
  )
}

export default AddButton
