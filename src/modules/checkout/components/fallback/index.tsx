'use client'
import { useRouter, useSearchParams } from "next/navigation";

const FallbackComponent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const responseStatus = searchParams.get("vnp_ResponseCode");
  const transactionStatus = searchParams.get("vnp_TransactionStatus");

  const handleSubmit = () => {
    const isPaid = responseStatus === "00" && transactionStatus === "00";
    router.push(`/checkout?isPaid=${isPaid}`);
  }
  
  return (  <div className="content-container text-center">
    <h1>VnPayFallback</h1>
    <p>Giao dịch thành công</p>
    <button onClick={handleSubmit}>Tiếp tục đến trang Xác nhận đơn hàng</button>
  </div> );
}
 
export default FallbackComponent;