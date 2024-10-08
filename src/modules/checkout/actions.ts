"use server"

import { cookies } from "next/headers"

import {
  addShippingMethod,
  completeCart,
  deleteDiscount,
  setPaymentSession,
  updateCart,
} from "@lib/data"
import { GiftCard, StorePostCartsCartReq } from "@medusajs/medusa"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import { ReturnQueryFromVNPay, VerifyReturnUrl } from "vnpay"
import { vnpay } from "@lib/services/payment/vnpay"

export async function cartUpdate(data: StorePostCartsCartReq) {
  const cartId = cookies().get("_medusa_cart_id")?.value

  if (!cartId) return "No cartId cookie found"

  try {
    await updateCart(cartId, data)
    revalidateTag("cart")
  } catch (error: any) {
    return error.toString()
  }
}

export async function applyDiscount(code: string) {
  const cartId = cookies().get("_medusa_cart_id")?.value

  if (!cartId) return "No cartId cookie found"

  try {
    await updateCart(cartId, { discounts: [{ code }] }).then(() => {
      revalidateTag("cart")
    })
  } catch (error: any) {
    throw error
  }
}

export async function applyGiftCard(code: string) {
  const cartId = cookies().get("_medusa_cart_id")?.value

  if (!cartId) return "No cartId cookie found"

  try {
    await updateCart(cartId, { gift_cards: [{ code }] }).then(() => {
      revalidateTag("cart")
    })
  } catch (error: any) {
    throw error
  }
}

export async function removeDiscount(code: string) {
  const cartId = cookies().get("_medusa_cart_id")?.value

  if (!cartId) return "No cartId cookie found"

  try {
    await deleteDiscount(cartId, code)
    revalidateTag("cart")
  } catch (error: any) {
    throw error
  }
}

export async function removeGiftCard(
  codeToRemove: string,
  giftCards: GiftCard[]
) {
  const cartId = cookies().get("_medusa_cart_id")?.value

  if (!cartId) return "No cartId cookie found"

  try {
    await updateCart(cartId, {
      gift_cards: [...giftCards]
        .filter((gc) => gc.code !== codeToRemove)
        .map((gc) => ({ code: gc.code })),
    }).then(() => {
      revalidateTag("cart")
    })
  } catch (error: any) {
    throw error
  }
}

export async function submitDiscountForm(
  currentState: unknown,
  formData: FormData
) {
  const code = formData.get("code") as string

  try {
    await applyDiscount(code).catch(async (err) => {
      await applyGiftCard(code)
    })
    return null
  } catch (error: any) {
    return error.toString()
  }
}

export async function setAddresses(currentState: unknown, formData: FormData) {
  if (!formData) return "No form data received"

  const cartId = cookies().get("_medusa_cart_id")?.value

  if (!cartId) return { message: "No cartId cookie found" }

  const data = {
    shipping_address: {
      first_name: formData.get("shipping_address.first_name"),
      last_name: formData.get("shipping_address.last_name"),
      address_1: formData.get("shipping_address.address_1"),
      address_2: "",
      company: formData.get("shipping_address.company"),
      postal_code: formData.get("shipping_address.postal_code"),
      city: formData.get("shipping_address.city"),
      country_code: formData.get("shipping_address.country_code"),
      province: formData.get("shipping_address.province"),
      phone: formData.get("shipping_address.phone"),
    },
    email: formData.get("email"),
  } as StorePostCartsCartReq

  const sameAsBilling = formData.get("same_as_billing")

  if (sameAsBilling === "on") data.billing_address = data.shipping_address

  if (sameAsBilling !== "on")
    data.billing_address = {
      first_name: formData.get("billing_address.first_name"),
      last_name: formData.get("billing_address.last_name"),
      address_1: formData.get("billing_address.address_1"),
      address_2: "",
      company: formData.get("billing_address.company"),
      postal_code: formData.get("billing_address.postal_code"),
      city: formData.get("billing_address.city"),
      country_code: formData.get("billing_address.country_code"),
      province: formData.get("billing_address.province"),
      phone: formData.get("billing_address.phone"),
    } as StorePostCartsCartReq

  try {
    await updateCart(cartId, data)
    revalidateTag("cart")
  } catch (error: any) {
    return error.toString()
  }

  redirect(
    `/${formData.get("shipping_address.country_code")}/checkout?step=delivery`
  )
}

/** Update cart with shipping address */
export async function setMyAddresses(formData: any) {
  if (!formData) return "No form data received"

  const cartId = cookies().get("_medusa_cart_id")?.value

  if (!cartId) throw new Error("No cartId cookie found")

  const data = {
    shipping_address: {
      first_name: formData["shipping_address.first_name"],
      last_name: formData["shipping_address.last_name"],
      address_1: formData["shipping_address.address_1"],
      address_2: "",
      company: formData["shipping_address.company"],
      postal_code: formData["shipping_address.postal_code"],
      city: formData["shipping_address.city"],
      country_code: formData["shipping_address.country_code"],
      province: formData["shipping_address.province"],
      phone: formData["shipping_address.phone"],
      metadata: {
        packing: formData["shipping_address.metadata.packing"],
        order_note: formData["shipping_address.metadata.order_note"],
      },
    },
    email: formData["email"],
  } as StorePostCartsCartReq

  data.billing_address = data.shipping_address

  try {
    await updateCart(cartId, data)
    revalidateTag("cart")
  } catch (error: any) {
    throw error
  }
}
/**
 * set packing method and order note.
 * Medusa does not support update metadata of cart, so we update it in context of cart instead.
 * Github issue: https://github.com/medusajs/medusa/issues/5764
 * update() of Medusa Client: https://docs.medusajs.com/references/js-client/CartsResource#update
 * @param formData any
 * @returns
 */
let MEDUSA_BACKEND_URL = "http://localhost:9000"
export async function setPaymentCaptured(orderId: string) {
  try {
    await fetch(
      `${MEDUSA_BACKEND_URL}/store/custom/orders/capture/${orderId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  } catch (error: any) {
    throw new Error(error)
  }
}

export async function setShippingMethod(shippingMethodId: string) {
  const cartId = cookies().get("_medusa_cart_id")?.value

  if (!cartId) throw new Error("No cartId cookie found")

  try {
    await addShippingMethod({ cartId, shippingMethodId })
    revalidateTag("cart")
  } catch (error: any) {
    throw error
  }
}

export async function setPaymentMethod(providerId: string) {
  const cartId = cookies().get("_medusa_cart_id")?.value

  if (!cartId) throw new Error("No cartId cookie found")

  try {
    const cart = await setPaymentSession({ cartId, providerId })
    revalidateTag("cart")
    return cart
  } catch (error: any) {
    throw error
  }
}

export async function placeOrder(isVnPay?: boolean) {
  const cartId = cookies().get("_medusa_cart_id")?.value

  if (!cartId) throw new Error("No cartId cookie found")

  let cart

  try {
    cart = await completeCart(cartId)
    revalidateTag("cart")
  } catch (error: any) {
    throw error
  }

  if (cart?.type === "order") {
    const countryCode = cart.data.shipping_address?.country_code?.toLowerCase()
    cookies().set("_medusa_cart_id", "", { maxAge: -1 })
    if (isVnPay) {
      const vnPaymentData = {
        orderId: cart.data.id,
        total: cart.data.total || 0,
        returnUrl: "http://localhost:8000/vn/vnpay-return",
        // use enejistorefront.kienttt.site when in production
        // use localhost:8000 when in development
      }
      console.log("Tạo url thanh toán")
      await createVnPaymentUrl(vnPaymentData).then((response)=> {
        console.log("Tạo url thanh toán thành công:", response)
        redirect(response.data)
      }).catch((error) => {
        throw error
      })
  
    } else {
      redirect(`/${countryCode}/order-confirmed/${cart?.data.id}`)
    }
  }

  return cart
}

export async function createVnPaymentUrl(params: {
  orderId: string
  total: number
  returnUrl: string
}) {
  try {
    const response = await fetch("http://localhost:8000/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId: params.orderId,
        total: params.total,
        returnUrl: params.returnUrl,
      }),
    }).then((res) => res.json())
    return { data: response.body.paymentUrl }
  } catch (error: any) {
    throw error
  }
}

export async function checkVnPayReturn(vnp_Params: ReturnQueryFromVNPay) {
  let verify: VerifyReturnUrl
  try {
    // Sử dụng try-catch để bắt lỗi nếu query không hợp lệ, không đủ dữ liệu
    verify = vnpay.verifyReturnUrl(vnp_Params as ReturnQueryFromVNPay)
    if (!verify.isVerified) {
      return {
        error: "Xác thực tính toàn vẹn dữ liệu không thành công",
      }
    }
    if (!verify.isSuccess) {
      return {
        error: "Đơn hàng thanh toán không thành công",
      }
    }
  } catch (error) {
    return {
      error: "Dữ liệu không hợp lệ",
    }
  }

  // Kiểm tra thông tin đơn hàng và xử lý
  return
}
