import CartItem from "../cart-item";

const CartDialog = ({setIsPopoverOpen, itemsList} : {
  setIsPopoverOpen: (value: boolean) => void,
  itemsList: any[]
}) => {
  return (     
    <div className="overlay">
      <div className="cart-container">
        <div className="cart-nav">
          <button onClick={() => setIsPopoverOpen(false)}>
            <i className="fa-solid fa-times text-xl p-1"></i>
          </button>
          <div className="text-lg font-[500]">Giỏ hàng</div>
          <div className="text-base font-normal text-red-600">Xóa</div>
        </div>
        <div className="cart-body">
          <div className="cart-items">
            {
              itemsList.length > 0 && itemsList.map((item) =>                     
                <CartItem key={item.id} item={item} />
              )
            }
          </div>
          <div className="cart-order w-2/5">
            <div className="flex justify-between cart-order-total">
              <div className="cart-item-title">Tổng cộng</div>
              <div className="cart-item-price">40.000đ</div>
            </div>
            <div className="flex cart-order-button">
              <div className="flex-none font-normal text-sm leading-6">2 món</div>
              <div className="flex-1 font-[500] text-sm">Đặt đơn</div>
            </div>
          </div>
        </div>
      </div>
    </div>
 );
}
 
export default CartDialog;