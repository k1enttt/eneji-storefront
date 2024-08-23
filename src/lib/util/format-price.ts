import { Region } from "@medusajs/medusa"
import { computeAmount } from "./prices"

export function formatVietnamPrice(price: number | undefined): string | undefined {
  if (price === undefined) {
    return undefined
  }

  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + "đ"
}

