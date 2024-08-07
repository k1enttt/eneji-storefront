import { getProductPrice } from "@lib/util/get-product-price"
import {
  PricedProduct,
  PricedVariant,
} from "@medusajs/medusa/dist/types/pricing"
import { RegionInfo } from "types/global"

const AddToCartButton = ({
  product,
  variant,
  inStock,
  disabled,
  isAdding,
  region,
  handleAddToCart,
  itemQuantity = 1,
}: {
  product: PricedProduct
  variant?: PricedVariant
  region: RegionInfo
  handleAddToCart?: () => void
  itemQuantity?: number
  inStock?: boolean
  disabled?: boolean
  isAdding: boolean
}) => {
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: variant?.id,
    region,
  })

  const selectedPrice = variant ? variantPrice : cheapestPrice

  if (!selectedPrice) {
    return <div className="block w-32 h-9 bg-gray-100 animate-pulse" />
  }
  // Calculate total price of the product with item quantity
  const priceValue = parseFloat(
    selectedPrice.calculated_price
      .toString()
      .substring(1, selectedPrice.calculated_price.toString().length)
  )
  const totalPrice = Math.round(priceValue * itemQuantity * 100) / 100
  return (
    <button
      className={`w-full h-12 bg-[#20419A] text-white rounded-md ${
        (isAdding || !inStock || !!disabled) ? "opacity-50" : ""
      }`}
      onClick={handleAddToCart}
      disabled={!inStock || !variant || !!disabled || isAdding}
      data-testid="add-product-button"
    >
      {!inStock ? (
        <div className="font-medium text-base">Hết hàng</div>
      ) : (
        <div className=" flex items-center justify-center gap-x-2">
          <div className="font-medium text-base">Thêm món</div>
          <div
            data-testid="product-price"
            data-value={selectedPrice.calculated_price_number}
            className="font-bold text-sm"
          >
            ${totalPrice}
          </div>
        </div>
      )}
    </button>
  )
}

export default AddToCartButton
