import LocalizedClientLink from "@modules/common/components/localized-client-link"
import "@fortawesome/fontawesome-free/css/all.css"

export default function MyOrderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="checkout">
      <div className="checkout-nav">
        <nav className="checkout-nav-background">
          <div className="flex-1 basis-1/4">
            <LocalizedClientLink
              href="/"
              className="checkout-nav-back"
              data-testid="back-to-cart-link"
            >
              <i className="fa-solid fa-arrow-left"></i>
            </LocalizedClientLink>
          </div>
          <div className="flex-1 basis-1/2 text-center text-lg font-medium">Đơn hàng của tôi</div>
          <div className="flex-1 basis-1/4"></div>
        </nav>
      </div>
      <div className="checkout-body">{children}</div>
    </div>
  )
}
