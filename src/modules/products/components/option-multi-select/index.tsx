import CheckboxSquare from "../check-box"

const MyOptionMultiSelect = ({
  multiSelectOptions,
  disabled,
  handleMultiSelectOption
}: {
  multiSelectOptions: string[]
  disabled?: boolean
  handleMultiSelectOption: (index: number) => void
}) => {
  return (
    <div className="space-y-3">
      <div className="flex gap-x-2 items-end justify-start">
        <div className="font-semibold text-lg text-black">Chọn thêm</div>
        <div className="bullet leading-6"></div>
        <div className="text-sm leading-6">Chọn nhiều</div>
      </div>
      <div className="flex flex-col gap-y-2" data-testid={"product-options"}>
        {multiSelectOptions.reduce((acc, v, index) => {
          if (index !== 0) {
            acc.push(
              <hr key={`separator-${index}`} className="text-[#F2F4F7]" />
            )
          }
          acc.push(
            <button
              key={v}
              onClick={() => {handleMultiSelectOption(index)}}
              disabled={disabled}
              className="flex items-center gap-x-3"
              data-testid="option-button"
            >
              <div className="flex-initial">
                <CheckboxSquare checked={false} onChange={() => {}} />
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

export default MyOptionMultiSelect
