"use client"
import { clx } from "@medusajs/ui"
import Image from "next/image"
import { useEffect, useMemo, useRef, useState } from "react"
import { isEqual } from "lodash"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import MyOptionSelect from "../components/option-select/my-option-select"
import { Region } from "@medusajs/medusa"
import { getProductPrice } from "@lib/util/get-product-price"
import { addToCart } from "@modules/cart/actions"
import { useParams } from "next/navigation"
import AddToCartButton from "../components/add-to-cart-button"
import PreviewPrice from "../components/product-preview/price"
import Counter from "../components/counter"
import CloseButton from "../components/close-button"
import { Option } from "types/global"
import OptionsList from "../components/option-multiple"

const ViewProduct = ({
  className,
  product,
  handleClose,
  disabled,
  region,
}: {
  className?: string
  product: PricedProduct
  handleClose?: () => void
  disabled?: boolean
  region: Region
}) => {
  const countryCode = useParams().countryCode as string

  const [quantity, setQuantity] = useState(1)
  const [textareaContent, setTextareaContent] = useState("")

  const { cheapestPrice } = getProductPrice({
    product: product,
    region,
  })

  const metadata: { order_note?: string; multi_select_option?: Option[] } = {
    order_note: "",
    multi_select_option: [],
  }
  const { address, origin, other_notes, extra_options } = product.metadata as {
    address: string
    origin: string
    other_notes: string
    extra_options?: string
  }

  // Parse extra options from JSON string
  const parseData = JSON.parse(extra_options || "{}")
  const multiSelectOptionsList = (parseData["multi-select-options"] ||
    []) as Option[]

  // A list of selected options
  const [selectedMultiOptions, setSelectedMultiOptions] = useState<Option[]>([])

  // Handle event of selecting multi options
  const handleMultiSelect = (option: Option) => {
    // If the option is already selected, remove it
    if (selectedMultiOptions.find((o) => o.label === option.label)) {
      setSelectedMultiOptions(
        selectedMultiOptions.filter((o) => o.label !== option.label)
      )
    } else {
      setSelectedMultiOptions([...selectedMultiOptions, option])
    }
  }

  // add the selected variant to the cart
  const handleAddToCart = async () => {
    /** Handle event of saving textarea content */
    const handleSaveContent = () => {
      metadata["order_note"] = textareaContent
    }
    /** Update selected options to metadata */
    const handleOptionSelect = () => {
      multiSelectOptionsList.forEach((option) => {
        if (
          !!selectedMultiOptions.find(
            (selectedOption) => selectedOption.label === option.label
          )
        ) {
          option.selected = true
        } else {
          option.selected = false
        }
      })
      metadata["multi_select_option"] = multiSelectOptionsList
    }

    if (!variant?.id) return null

    setIsAdding(true)

    handleSaveContent()
    handleOptionSelect()

    await addToCart({
      variantId: variant.id,
      quantity: quantity,
      metadata: metadata,
      countryCode,
    })

    setIsAdding(false)
  }

  const [options, setOptions] = useState<Record<string, string>>({})
  const [isAdding, setIsAdding] = useState(false)
  const variants = product.variants

  // initialize the option state
  useEffect(() => {
    const optionObj: Record<string, string> = {}

    for (const option of product.options || []) {
      const firstValue = option.values[0].value
      Object.assign(optionObj, { [option.id]: firstValue })
    }

    setOptions(optionObj)
  }, [product])

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

  // if product only has one variant, then select it
  useEffect(() => {
    if (variants.length === 1 && variants[0].id) {
      setOptions(variantRecord[variants[0].id])
    }
  }, [variants, variantRecord])

  // update the options when a variant is selected
  const updateOptions = (update: Record<string, string>) => {
    setOptions({ ...options, ...update })
  }

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

  const actionsRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className={clx(
        "relative bg-white text-[#475467] flex flex-col",
        className
      )}
      ref={actionsRef}
    >
      {/* DISH IMAGE */}
      <div className="flex-none w-full h-24 md:h-32 lg:h-[12rem] flex items-center justify-center overflow-hidden">
        {product.thumbnail && (
          <Image
            src={product.thumbnail}
            layout="responsive"
            objectFit="cover"
            width={200} // TODO: Chỉnh responsive
            height={200}
            alt="Thumbnail"
          />
        )}
      </div>
      {/* DISH INFO AND OPTIONS */}
      <div className="flex-none px-4 md:px-12 lg:px-40 space-y-4 mb-5 py-2">
        <div className="space-y-2">
          <div className="font-semibold text-2xl text-black">
            {product.title}
          </div>
          {product.description && (
            <div className="text-base">{product.description}</div>
          )}
          {cheapestPrice && <PreviewPrice size="big" price={cheapestPrice} />}
          <div>
            {(address || origin || other_notes) && (
              <hr className="text-[#F2F4F7]" />
            )}
            {address && <div>Địa chỉ: {address}</div>}
            {origin && <div>Xuất xứ: {origin}</div>}
            {other_notes && <div>{other_notes}</div>}
          </div>
          <hr className="text-[#F2F4F7]" />
          <div>
            <div className="text-lg">Dịch vụ bởi</div>
            <div className="font-bold text-[#20419A]">Eneji Station</div>
          </div>
        </div>
        <div className="my-4 w-full h-2 bg-[#F2F4F7]"></div>

        {/* SINGLE-SELECT OPTION */}
        {(product.options || []).map((option) => {
          return (
            <div key={option.id}>
              <MyOptionSelect
                option={option}
                current={options[option.id]}
                updateOption={updateOptions}
                title={option.title}
                data-testid="product-options"
                disabled={!!disabled || isAdding}
              />
            </div>
          )
        })}

        {/* MULTI-SELECT OPTIONS */}
        {multiSelectOptionsList.length > 0 && (
          <OptionsList
            options={multiSelectOptionsList}
            handleMultiSelect={handleMultiSelect}
          />
        )}

        <div className="space-y-1">
          <div className="flex gap-x-2 items-end justify-start">
            <div className="font-semibold text-lg text-black">Ghi chú</div>
            <div className="bullet leading-6"></div>
            <div className="text-sm leading-6">
              Không bắt buộc (tối đa 200 ký tự)
            </div>
          </div>
          <textarea
            value={textareaContent}
            onChange={(e) => setTextareaContent(e.target.value)}
            placeholder="Gửi lời nhắn đến nhà hàng!"
            className="w-full h-20 p-2 border border-[#F2F4F7] rounded-md"
          ></textarea>
        </div>
      </div>
      {/* QUANTITY AND CONFIRM BUTTON */}
      <div className="flex-1 flex items-end">
        <div className="px-4 md:px-4 lg:px-40 w-full h-36 border border-t-2 space-y-2 py-2">
          <div className="flex items-center justify-between">
            <div className="font-semibold text-base">Số lượng</div>
            <Counter
              count={quantity}
              setCount={setQuantity}
              inventory_quantity={variant?.inventory_quantity}
            />
          </div>
          <AddToCartButton
            product={product}
            variant={variant}
            inStock={inStock}
            disabled={disabled}
            isAdding={isAdding}
            region={region}
            handleAddToCart={handleAddToCart}
            itemQuantity={quantity}
          />
        </div>
      </div>
      <CloseButton onClick={handleClose} />
    </div>
  )
}

export default ViewProduct
