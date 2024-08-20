import { clx } from "@medusajs/ui"
import React from "react"

interface CheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  className?: string
}

const CheckboxRound: React.FC<CheckboxProps> = ({ checked, onChange, className }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked)
  }

  return (
    <label className={clx("flex items-center justify-center", className)}>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        className="form-checkbox rounded-full"
      />
    </label>
  )
}

export default CheckboxRound
