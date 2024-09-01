import { vnpay } from "@lib/services/payment/vnpay";
import { NextRequest, NextResponse } from "next/server";
import { ProductCode, VnpLocale, dateFormat } from "vnpay";

export async function POST(req: NextRequest) {
  const payload = await req.json();
  const { orderId, total, returnUrl } = payload as {
    orderId: string;
    total: number;
    returnUrl: string;
  };

  // Expire time is 1 day
  const expireTime = new Date();
  expireTime.setDate(expireTime.getDate() + 1);

  const ipAddr =
    req.headers.get("X-Forwarded-For")?.split(",")[0] ||
    req.headers.get("x-real-ip") ||
    req.ip ||
    "";

  try {
    const paymentUrl = vnpay.buildPaymentUrl({
      vnp_Amount: total,
      vnp_IpAddr: ipAddr,
      vnp_TxnRef: orderId,
      vnp_OrderInfo: "Thanh toan don hang #" + orderId,
      vnp_OrderType: ProductCode.Food_Consumption,
      vnp_ReturnUrl: returnUrl || "http://localhost:8000/fallback",
      vnp_Locale: VnpLocale.VN, // 'vn' hoặc 'en'
      vnp_CreateDate: dateFormat(new Date()), // tùy chọn, mặc định là hiện tại
      vnp_ExpireDate: dateFormat(expireTime), // tùy chọn
    });
    return NextResponse.json({
      status: 200,
      body: { paymentUrl },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      body: { error: error },
    });
  }
}
