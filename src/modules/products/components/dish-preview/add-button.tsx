"use client"
import { Region } from "@medusajs/medusa"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import { Button } from "@medusajs/ui"
import ViewProduct from "@modules/products/templates/view-product"
import { isEqual } from "lodash"
import { useMemo, useState } from "react"

type ProductActionsProps = {
  product: PricedProduct
  region: Region
  disabled?: boolean
}

const AddButton = ({ product, region, disabled }: ProductActionsProps) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false)

  // toggle the popup visibility
  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible)
  }

  const closePopup = () => {
    setIsPopupVisible(false)
  }

  // handle adding the product to the cart
  const handleAddToCart = () => {
    console.log("Add to cart")
  }

  const [options, setOptions] = useState<Record<string, string>>({})
  const [isAdding, setIsAdding] = useState(false)
  const variants = product.variants

  // memoized record of the product's variants
  const variantRecord = useMemo(() => {
    const map: Record<string, Record<string, string>> = {}

    for (const variant of variants) {
      if (!variant.options || !variant.id) continue

      const temp: Record<string, string> = {}

      for (const option of variant.options) {
        temp[option.option_id] = option.value
      }

      map[variant.id] = temp
    }

    return map
  }, [variants])

  // memoized function to check if the current options are a valid variant
  const variant = useMemo(() => {
    let variantId: string | undefined = undefined

    for (const key of Object.keys(variantRecord)) {
      if (isEqual(variantRecord[key], options)) {
        variantId = key
      }
    }

    return variants.find((v) => v.id === variantId)
  }, [options, variantRecord, variants])

  // check if the selected variant is in stock
  const inStock = useMemo(() => {
    // If we don't manage inventory, we can always add to cart
    if (variant && !variant.manage_inventory) {
      return true
    }

    // If we allow back orders on the variant, we can add to cart
    if (variant && variant.allow_backorder) {
      return true
    }

    // If there is inventory available, we can add to cart
    if (variant?.inventory_quantity && variant.inventory_quantity > 0) {
      return true
    }

    // Otherwise, we can't add to cart
    return false
  }, [variant])

  return (
    <div>
      <div
        onClick={togglePopup}
        className="h-8 w-8 bg-[#20419A] rounded-circle flex items-center justify-center absolute right-2 bottom-2 cursor-pointer"
      >
        <i className="fas fa-plus text-white text-lg"></i>
      </div>
      {isPopupVisible && (
        // <div
        //   className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        //   onClick={closePopup}
        // >
        //   <div
        //     className="bg-white p-4 rounded shadow-lg"
        //     onClick={(e) => e.stopPropagation()}
        //   >
        //     <ViewProduct />

        //     <Button
        //       onClick={handleAddToCart}
        //       disabled={!inStock || !variant || !!disabled || isAdding}
        //       variant="primary"
        //       className="w-full h-10"
        //       isLoading={isAdding}
        //       data-testid="add-product-button"
        //     >
        //       {!variant
        //         ? "Select variant"
        //         : !inStock
        //         ? "Out of stock"
        //         : "Add to cart"}
        //     </Button>
        //     {/* <button
        //       onClick={handleAddToCart}
        //       className="mt-2 p-2 bg-blue-500 text-white rounded"
        //     >
        //       Add to cart
        //     </button> */}
        //   </div>
        // </div>
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 pointer-events-none"
          onClick={closePopup}
        >
          <ViewProduct
            className="rounded shadow-lg pointer-events-auto max-h-[80vh] w-[77.5rem] overflow-y-auto"
          />
        </div>
      )}
    </div>
  )
}

export default AddButton
