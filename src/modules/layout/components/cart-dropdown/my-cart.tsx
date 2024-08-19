"use client"

import { Popover, Transition } from "@headlessui/react"
import { useParams, usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import "./my-cart.css"

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
        className="h-full"
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
              className="hover:text-ui-fg-base z-40"
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
