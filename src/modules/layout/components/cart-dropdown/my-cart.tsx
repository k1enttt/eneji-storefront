"use client"

import { Popover, Transition } from "@headlessui/react"
import { Cart } from "@medusajs/medusa"
import { Button } from "@medusajs/ui"
import { useParams, usePathname } from "next/navigation"
import { Fragment, useEffect, useRef, useState } from "react"
import "./my-cart.css"

import { formatAmount } from "@lib/util/prices"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import MyCartButton from "@modules/layout/templates/nav/my-cart-button"
import CartDialog from "./cart-dialog"
import { CartWithCheckoutStep } from "types/global"

const MyCartDropdown = ({
  cart: cartState,
}: {
  cart?: CartWithCheckoutStep | null
}) => {
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timer | undefined>(
    undefined
  )
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false)
  const [cartDialogOpen, setCartDialogOpen] = useState(false)

  const { countryCode } = useParams()

  const open = () => setCartDropdownOpen(true)
  const close = () => setCartDropdownOpen(false)

  const totalItems =
    cartState?.items?.reduce((acc, item) => {
      return acc + item.quantity
    }, 0) || 0

  const itemRef = useRef<number>(totalItems || 0)

  const timedOpen = () => {
    open()

    const timer = setTimeout(close, 5000)

    setActiveTimer(timer)
  }

  const openAndCancel = () => {
    if (activeTimer) {
      clearTimeout(activeTimer)
    }

    open()
  }

  // Clean up the timer when the component unmounts
  useEffect(() => {
    return () => {
      if (activeTimer) {
        clearTimeout(activeTimer)
      }
    }
  }, [activeTimer])

  const pathname = usePathname()

  // open cart dropdown when modifying the cart items, but only if we're not on the cart page
  useEffect(() => {
    if (itemRef.current !== totalItems && !pathname.includes("/cart")) {
      timedOpen()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalItems, itemRef.current])

  return (
    <>
      <div
        className="h-full z-50"
        onMouseEnter={openAndCancel}
        onMouseLeave={close}
      >
        <Popover className="relative h-full">
          <Popover.Button className="h-full">
            <MyCartButton
              cartNumber={totalItems}
              onClick={() => {
                setCartDialogOpen(true)
              }}
              className="hover:text-ui-fg-base"
            />
          </Popover.Button>
        </Popover>
      </div>
      {cartDialogOpen && (
        <CartDialog
          setIsPopoverOpen={setCartDialogOpen}
          items={cartState?.items}
          subtotal={cartState?.subtotal}
          totalItems={totalItems}
        />
      )}
    </>
  )
}

export default MyCartDropdown
