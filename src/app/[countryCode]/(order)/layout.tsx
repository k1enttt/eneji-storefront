import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"
import MedusaCTA from "@modules/layout/components/medusa-cta"
import "@fortawesome/fontawesome-free/css/all.css"

export default function OrderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="checkout">
      <div className="checkout-nav">
        <nav className="checkout-nav-background">
          <div className="flex-1 basis-0">
            <LocalizedClientLink
              href="/"
              className="checkout-nav-back"
              data-testid="back-to-cart-link"
            >
              <i className="fa-solid fa-arrow-left"></i>
            </LocalizedClientLink>
          </div>
        </nav>
      </div>
      <div className="checkout-body">{children}</div>
    </div>
  )
}
