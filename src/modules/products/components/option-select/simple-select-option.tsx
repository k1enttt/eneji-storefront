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
          className="form-checkbox rounded-md"
        />
        <span>{option.label}</span>
      </>
    )
  }
  return <div>This is single select options</div>
}

export default SimpleSelectOption
