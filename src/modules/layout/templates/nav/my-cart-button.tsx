import "@fortawesome/fontawesome-free/css/all.min.css"

const MyCartButton = ({ cartNumber }: { cartNumber: number }) => {
  return (
    <div className="flex items-center justify-center gap-2 p-1 bg-white rounded-md">
      <i className="fa-solid fa-cart-shopping text-xl p-1"></i>
      <span className="text-base p-1">{cartNumber}</span>
    </div>
  )
}
export default MyCartButton
