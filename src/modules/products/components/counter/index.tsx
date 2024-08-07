import { Dispatch, SetStateAction } from "react"
import { FaPlus, FaMinus } from "react-icons/fa"

const Counter = (params: {
  count: number
  setCount: Dispatch<SetStateAction<number>>
  inventory_quantity: number | undefined
}) => {
  let { count, setCount, inventory_quantity } = params

  if (!inventory_quantity) {
    inventory_quantity = 0
  }

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
        disabled={count <= 1}
        className="w-6 h-6 m-1 flex justify-center items-center"
      >
        <FaMinus
          className={`text-base ${
            count > 1 ? "text-[#20419A]" : "text-[#20419A]/[0.5]"
          }`}
        />
      </button>
      <span className="text-lg font-semibold w-8 h-8 flex items-center justify-center">
        {count}
      </span>
      <button
        onClick={handleIncrement}
        disabled={count >= inventory_quantity}
        className="w-6 h-6 m-1  flex justify-center items-center"
      >
        <FaPlus
          className={`text-base ${
            count < inventory_quantity
              ? "text-[#20419A]"
              : "text-[#20419A]/[0.5]"
          }`}
        />
      </button>
    </div>
  )
}

export default Counter