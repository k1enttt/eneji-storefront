import "@fortawesome/fontawesome-free/css/all.min.css"

const BurgerButton = () => {
  return (
    <div className="w-8 h-8 rounded-circle bg-[#060D1F80]/[0.5] flex items-center justify-center ">
      <div className="bg-white w-5 h-5 rounded-md flex items-center justify-center">
        <i className="fa-solid fa-bars text-[#060D1F80]/[0.5]"></i>
      </div>
    </div>
  )
}

export default BurgerButton
