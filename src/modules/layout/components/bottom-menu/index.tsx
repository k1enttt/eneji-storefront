"use client"
import { Customer } from "@medusajs/medusa"
import { clx } from "@medusajs/ui"
import LoginDialog from "@modules/login/templates/login-dialog"
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation"
import { useState } from "react"

type MenuOption = {
  name: string
  icon: string
  path: string
}

const menuOptions: MenuOption[] = [
  { name: "Home", icon: "home", path: "/" },
  { name: "Khuyến mãi", icon: "tag", path: "#" },
  { name: "Menu", icon: "list", path: "/view-more?type=weekly-menu" },
  { name: "Đơn hàng", icon: "clipboard-list", path: "/my-order" },
  { name: "Tài khoản", icon: "user", path: "#" },
]

const BottomMenu = ({
  customer,
}: {
  customer: Omit<Customer, "password_hash"> | null
}) => {
  const router = useRouter()
  const pathname = usePathname()
  const queryParams = useSearchParams()
  const { countryCode } = useParams()
  const [isOpenLoginDialog, setIsOpenLoginDialog] = useState(!!customer)

  const isCurrentPage = (path: string) => {
    if (path === "/") {
      return pathname === `/${countryCode}` || pathname === `/${countryCode}/`
    }
    const currentPath =
      pathname + (queryParams.toString() != "" ? "?" + queryParams : "")
    return currentPath == `/${countryCode}${path}`
  }

  const handleClick = (option: MenuOption) => {
    if (option.name === "Tài khoản" || option.name === "Đơn hàng") {
      if (!customer) {
        setIsOpenLoginDialog(true)
        return;
      }
    }
    router.push(option.path)
  }

  return (
    <div className="md:hidden block sticky bottom-0 left-0 h-20 w-full bg-white z-40">
      <div className="w-full h-full flex">
        {menuOptions.map((option, index) => {
          const isOpened = isCurrentPage(option.path)
          return (
            <button
              key={index}
              // href={option.path}
              onClick={() => handleClick(option)}
              className={clx(
                "flex-1 h-full flex items-center justify-center text-grey-50",
                isOpened && "text-[#20419A]"
              )}
            >
              <div className="flex flex-col items-center justify-center gap-1">
                <div className="h-6 w-6 flex items-center justify-center">
                  <i className={`fa-solid fa-${option.icon} text-xl`}></i>
                </div>
                <div className={clx("text-xs", isOpened && "font-medium")}>
                  {option.name}
                </div>
              </div>
            </button>
          )
        })}
      </div>
      {
        isOpenLoginDialog && (
          <LoginDialog closeDialog={() => setIsOpenLoginDialog(false)} />
        )
      }
    </div>
  )
}

export default BottomMenu
