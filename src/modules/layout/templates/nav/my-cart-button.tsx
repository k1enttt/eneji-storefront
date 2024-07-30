import "@fortawesome/fontawesome-free/css/all.min.css"

const MyCartButton = () => {
  return ( <div className="flex items-center justify-center gap-2 p-1 bg-white rounded-md">
    <i className="fa-solid fa-cart-shopping text-xl p-1"></i>
    <span className="text-base">0</span>
  </div> );
}
export default MyCartButton;