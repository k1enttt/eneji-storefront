import { vnpay } from "@lib/services/payment/vnpay";
import { NextRequest, NextResponse } from "next/server";
import { ReturnQueryFromVNPay, VerifyReturnUrl } from "vnpay";

export async function GET(req: NextRequest) {
  let verify: VerifyReturnUrl;
  const payload = await req.json();
    try {
        // Sử dụng try-catch để bắt lỗi nếu query không hợp lệ, không đủ dữ liệu
        verify = vnpay.verifyReturnUrl(payload.body as ReturnQueryFromVNPay);
        if (!verify.isVerified) {
            return NextResponse.json('Xác thực tính toàn vẹn dữ liệu không thành công');
        }
        if (!verify.isSuccess) {
            return NextResponse.json('Đơn hàng thanh toán không thành công');
        }
    } catch (error) {
        return NextResponse.json('Dữ liệu không hợp lệ');
    }

    // Kiểm tra thông tin đơn hàng và xử lý

    return NextResponse.json('Xác thực URL trả về thành công');
}