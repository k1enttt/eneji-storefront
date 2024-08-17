'use client'
import { LineItem } from "@medusajs/medusa"
import { updateLineItem } from "@modules/cart/actions"
import Spinner from "@modules/common/icons/spinner"
import { Dispatch, SetStateAction, useState } from "react"
import { FaPlus, FaMinus } from "react-icons/fa"

const CartCounter = (params: {
  count: number
  setCount: Dispatch<SetStateAction<number>>
  inventory_quantity: number | undefined
  item: LineItem
  setError: (error: string | null) => void
}) => {
  let { count, setCount, inventory_quantity, item, setError } = params
  const [updating, setUpdating] = useState(false)

  if (!inventory_quantity) {
    inventory_quantity = 0
  }

  const handleIncrement = () => {
    const newCount = count + 1
    setCount(newCount)
    changeQuantity(newCount)
  }

  const handleDecrement = () => {
    const newCount = count - 1
    setCount(newCount)
    changeQuantity(newCount)
  }

  const changeQuantity = async (quantity: number) => {
    setError(null)
    setUpdating(true)

    const message = await updateLineItem({
      lineId: item.id,
      quantity,
    })
      .catch((err) => {
        return err.message
      })
      .finally(() => {
        setUpdating(false)
      })

    message && setError(message)
  }

  return (
    <div className="flex items-center border rounded-full border-[#20419A]">
      <button
        onClick={handleDecrement}
        disabled={count <= 1 || updating}
        className="w-6 h-6 m-1 flex justify-center items-center"
      >
        <FaMinus
          className={`text-base ${
            count <= 1 || updating ? "text-[#20419A]/[0.5]" : "text-[#20419A]"
          }`}
        />
      </button>
      {updating ? (
        <div className="p-2"><Spinner /></div>
      ) : (
        <span className="text-lg font-semibold w-8 h-8 flex items-center justify-center">
          {count}
        </span>
      )}
      <button
        onClick={handleIncrement}
        disabled={count >= inventory_quantity || updating}
        className="w-6 h-6 m-1 flex justify-center items-center"
      >
        <FaPlus
          className={`text-base ${
            count >= inventory_quantity || updating
              ? "text-[#20419A]/[0.5]"
              : "text-[#20419A]"
          }`}
        />
      </button>
    </div>
  )
}

export default CartCounter
