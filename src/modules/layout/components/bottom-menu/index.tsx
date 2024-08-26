"use client"
import { clx } from "@medusajs/ui"
import Link from "next/link"
import { useParams, usePathname, useSearchParams } from "next/navigation"

const menuOptions = [
  { name: "Home", icon: "home", path: "/" },
  { name: "Khuyến mãi", icon: "tag", path: "#" },
  { name: "Menu", icon: "list", path: "/view-more?type=weekly-menu" },
  { name: "Đơn hàng", icon: "clipboard-list", path: "/my-order" },
  { name: "Tài khoản", icon: "user", path: "#" },
]

const BottomMenu = () => {
  const pathname = usePathname()
  const queryParams = useSearchParams()
  const { countryCode } = useParams()
  const isCurrentPage = (path: string) => {
    if (path === "/") {
      return pathname === `/${countryCode}` || pathname === `/${countryCode}/`
    }
    const currentPath =
      pathname + (queryParams.toString() != "" ? "?" + queryParams : "")
    return currentPath == `/${countryCode}${path}`
  }

  return (
    <div className="md:hidden block sticky bottom-0 left-0 h-20 w-full bg-white">
      <div className="w-full h-full flex">
        {menuOptions.map((option, index) => {
          const isOpened = isCurrentPage(option.path)
          return (
            <Link
              href={option.path}
              className={clx(
                "flex-1 h-full flex items-center justify-center text-grey-50",
                isOpened && "text-[#20419A]"
              )}
            >
              <div className="flex flex-col items-center justify-center gap-1">
                <div className="h-6 w-6 flex items-center justify-center">
                  <i className={`fa-solid fa-${option.icon} text-xl`}></i>
                </div>
                <div className={clx("text-xs", isOpened && "font-medium")}>{option.name}</div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default BottomMenu
