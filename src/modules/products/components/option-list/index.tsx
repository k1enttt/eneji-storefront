import { Option } from "types/global"
import SimpleSelectOption from "../option-select/simple-select-option"

const OptionsList = ({
  options,
  handleMultiSelect,
}: {
  options: Option[]
  handleMultiSelect: (option: Option) => void
}) => {
  return (
    <div className="space-y-3">
      {/* LABEL */}
      <div className="flex gap-x-2 items-end justify-start">
        <div className="font-semibold text-lg text-black">Chọn thêm</div>
        <div className="bullet leading-6"></div>
        <div className="text-sm leading-6">Chọn nhiều</div>
      </div>
      {/* OPTIONS LIST */}
      <div className="flex flex-col gap-y-2">
        {options.reduce((acc, o, index) => {
          if (index !== 0) {
            acc.push(
              <hr key={`separator-${index}`} className="text-[#F2F4F7]" />
            )
          }
          acc.push(
            <button
              key={o.label}
              className="flex items-center gap-x-3"
              data-testid="option-button"
            >
              <SimpleSelectOption
                multiple
                option={o}
                handler={handleMultiSelect}
              />
            </button>
          )
          return acc
        }, [] as JSX.Element[])}
      </div>
      <div className="my-4 w-full h-2 bg-[#F2F4F7]"></div>
    </div>
  )
}

export default OptionsList