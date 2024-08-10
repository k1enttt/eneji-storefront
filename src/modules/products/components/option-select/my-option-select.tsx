import { ProductOption } from "@medusajs/medusa"
import React, { useEffect } from "react"

import { onlyUnique } from "@lib/util/only-unique"
import CheckboxRound from "../check-box/check-box-round"

export type OptionSelectProps = {
  option: ProductOption
  current: string
  updateOption: (option: Record<string, string>) => void
  title: string
  disabled: boolean
  "data-testid"?: string
}

const MyOptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
  "data-testid": dataTestId,
  disabled,
}) => {
  // a list of specific options
  const filteredOptions = option.values.map((v) => v.value).filter(onlyUnique)

  return (
    <div className="space-y-3">
      <div className="flex gap-x-2 items-end justify-start">
        <div className="font-semibold text-lg text-black">Chọn {title}</div>
        <div className="bullet leading-6"></div>
        {/* TODO: Thêm description cho option */}
        <div className="text-sm leading-6">Chọn 1</div>
      </div>
      <div className="flex flex-col gap-y-2" data-testid={dataTestId}>
        {filteredOptions.reduce((acc, v, index) => {
          if (index !== 0) {
            acc.push(
              <hr key={`separator-${index}`} className="text-[#F2F4F7]" />
            )
          }
          acc.push(
            <button
              key={v}
              onClick={() => updateOption({ [option.id]: v })}
              disabled={disabled}
              className="flex items-center gap-x-3"
              data-testid="option-button"
            >
              <div className="flex-initial">
                <CheckboxRound checked={v === current} onChange={() => {}} />
              </div>
              <div className="flex-1 text-left">{v}</div>
            </button>
          )
          return acc
        }, [] as JSX.Element[])}
      </div>
      <div className="my-4 w-full h-2 bg-[#F2F4F7]"></div>
    </div>
  )
}

export default MyOptionSelect
