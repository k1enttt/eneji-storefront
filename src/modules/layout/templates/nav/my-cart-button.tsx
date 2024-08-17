import "@fortawesome/fontawesome-free/css/all.min.css"
import { clx } from "@medusajs/ui"

const MyCartButton = ({
  cartNumber,
  onClick,
  className,
}: {
  cartNumber: number
  onClick?: () => void
  className?: string
}) => {
  return (
    <div
      className={clx(
        "flex items-center justify-center gap-2 p-1 bg-white rounded-md",
        className
      )}
      onClick={onClick}
    >
      <i className="fa-solid fa-cart-shopping text-xl p-1"></i>
      <span className="text-base p-1">{cartNumber}</span>
    </div>
  )
}
export default MyCartButton
