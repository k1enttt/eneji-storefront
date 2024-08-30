
import {
  HashAlgorithm,
  VNPay,
  ignoreLogger,
} from "vnpay";

export const vnpay = new VNPay({
  tmnCode: "OYQ32ETJ",
  secureSecret: "AVFCJCXB0SZQM13BI1O2BWJHCGU4NXCZ",
  vnpayHost: "https://sandbox.vnpayment.vn",
  testMode: true, // tùy chọn, ghi đè vnpayHost thành sandbox nếu là true
  hashAlgorithm: "SHA512" as HashAlgorithm, // tùy chọn
  /**
   * Sử dụng enableLog để bật/tắt logger
   * Nếu enableLog là false, loggerFn sẽ không được sử dụng trong bất kỳ phương thức nào
   */
  enableLog: true, // optional

  /**
   * Hàm `loggerFn` sẽ được gọi để ghi log
   * Mặc định, loggerFn sẽ ghi log ra console
   * Bạn có thể ghi đè loggerFn để ghi log ra nơi khác
   *
   * `ignoreLogger` là một hàm không làm gì cả
   */
  loggerFn: ignoreLogger, // optional
});
