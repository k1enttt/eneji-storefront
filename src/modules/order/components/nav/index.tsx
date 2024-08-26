'use client'
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { usePathname, useRouter } from "next/navigation";

const MyOrdersNav = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isOrderDetails = pathname.includes("my-order/details");

  return ( <nav className="checkout-nav-background">
    <div className="flex-1 basis-1/4">
      <LocalizedClientLink
        onClick={() => router.back()}
        href="#"
        className="checkout-nav-back"
        data-testid="back-to-cart-link"
      >
        <i className="fa-solid fa-arrow-left"></i>
      </LocalizedClientLink>
    </div>
    <div className="flex-1 basis-1/2 text-center text-lg font-medium">
      {!isOrderDetails ? "Đơn hàng của tôi" : "Chi tiết đơn hàng"}
    </div>
    <div className="flex-1 basis-1/4"></div>
  </nav> );
}
 
export default MyOrdersNav;