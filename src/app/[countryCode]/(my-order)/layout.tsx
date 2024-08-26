import "@fortawesome/fontawesome-free/css/all.css"
import MyOrdersNav from "@modules/order/components/nav"

export default function MyOrderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="checkout">
      <div className="checkout-nav">
        <MyOrdersNav />
      </div>
      <div className="checkout-body">{children}</div>
    </div>
  )
}
