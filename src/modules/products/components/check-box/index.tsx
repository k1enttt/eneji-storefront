import React from "react"

interface CheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
}

const CheckboxSquare: React.FC<CheckboxProps> = ({ checked, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // onChange(event.target.checked)
    console.log("CheckboxSquare checked")
  }

  return (
    <label className="flex items-center justify-center">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        className="form-checkbox rounded-md"
      />
    </label>
  )
}

export default CheckboxSquare
