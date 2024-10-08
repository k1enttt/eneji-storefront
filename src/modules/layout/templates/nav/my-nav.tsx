import { Suspense } from "react"

import { getCustomer, listRegions } from "@lib/data"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import MyCartButton from "./my-cart-button"
import MySideMenu from "@modules/layout/components/side-menu/my-side-menu"

export default async function MyNav() {
  const regions = await listRegions().then((regions) => regions)
  const customer = await getCustomer().catch(() => null)
  const username = customer ? `${customer.last_name} ${customer.first_name}` : randomUsername()

  function randomUsername() {
    const randomInt = Math.floor(Math.random() * 1000)
    return `User${randomInt}`
  }

  return (
    <div className="sticky top-0 inset-x-0 z-30 group">
      <header className="relative h-16 mx-auto duration-200 bg-[#1875F0]">
        <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between gap-4 w-full h-full text-small-regular">
          <MySideMenu customer={customer} regions={regions} />

          <div className="flex flex-col justify-start w-full text-white">
            <div className="text-sm">Xin chào</div>
            <div className="text-xl">{username}</div>
          </div>

          <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:text-ui-fg-base flex gap-2"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  <MyCartButton cartNumber={0}/>
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
            
          
        </nav>
      </header>
    </div>
  )
}
