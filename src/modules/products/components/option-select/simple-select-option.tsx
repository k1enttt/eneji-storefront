import { formatedCommaPrice } from "@lib/util/format-price"
import { useState } from "react"
import { Option } from "types/global"

const SimpleSelectOption = ({
  multiple,
  option,
  handler,
}: {
  multiple?: boolean
  option: Option
  handler: (option: Option) => void
}) => {
  if (multiple) {
    const [checked, setChecked] = useState<boolean>(option.selected || false)

    const onChange = () => {
      handler(option)
      setChecked(!checked)
    }
    return (
      <>
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="form-checkbox rounded-md flex-none"
        />
        <span className="flex-1 text-start">{option.label}</span>
        {option.price && <span className="flex-none">+{formatedCommaPrice(option.price)}</span>}
      </>
    )
  }
  return null
}

export default SimpleSelectOption
