import { Cart } from "@medusajs/medusa"

type WrapperProps = {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">
  children: React.ReactNode
}

const MyWrapper: React.FC<WrapperProps> = ({ cart, children }) => {
  return <>{children}</>
}

export default MyWrapper
