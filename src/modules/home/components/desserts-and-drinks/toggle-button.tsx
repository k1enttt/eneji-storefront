import { useState } from "react"
import { DessertsAndDrinksProps } from "types/global"

const ToggleButton = (
  {
    dessertsOrDrinks,
    setDessertsOrDrinks,
  } : {
    dessertsOrDrinks: DessertsAndDrinksProps
    setDessertsOrDrinks: React.Dispatch<React.SetStateAction<DessertsAndDrinksProps>>
  }
) => {

  return (
    <div className="flex items-center justify-around gap-2">
      <button
        onClick={() => setDessertsOrDrinks("desserts")}
        className={`flex-1 rounded-circle py-4 text-center ${
          dessertsOrDrinks == "desserts"
            ? "bg-[#20419A] text-white font-bold"
            : "bg-white text-black font-medium"
        }`}
      >
        Tráng miệng
      </button>
      <button
        onClick={() => setDessertsOrDrinks("drinks")}
        className={`flex-1 rounded-circle py-4 text-center ${
          dessertsOrDrinks !== "desserts"
            ? "bg-[#20419A] text-white font-bold"
            : "bg-white text-black font-medium"
        }`}
      >
        Đồ uống
      </button>
    </div>
  )
}

export default ToggleButton
