const MyCheckoutSummary = () => {
  return (
    <div className="checkout-total">
      <div className="checkout-total-subtotal">
        <div className="checkout-total-line">
          <div>Tiền hàng (Tạm tính)</div>
          <div>80.000đ</div>
        </div>
        <div className="checkout-total-line">
          <div>Phí vận chuyển</div>
          <div>Theo giá đơn vị vận chuyển</div>
        </div>
        <div className="checkout-total-sale">
          <div>Giảm giá</div>
          <div>-10.000đ</div>
        </div>
        <div className="checkout-divider-normal"></div>
      </div>
      <div className="checkout-total-final">
        <div className="font-[500]">Tổng cộng</div>
        <div className="font-bold text-[#20419A]">40.000đ</div>
      </div>
      <div className="checkout-total-submit">
        <button className="bg-[#20419A] w-full text-white py-2 px-3 rounded-md font-[500] flex items-center justify-center">Đặt đơn</button>
      </div>
    </div>
  )
}

export default MyCheckoutSummary
