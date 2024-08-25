"use client"

import { Popover, Transition } from "@headlessui/react"
import { Customer, Region } from "@medusajs/medusa"
import { Fragment, useEffect, useState } from "react"

import BurgerButton from "./burger-button"
import LoginDialog from "@modules/login/templates/login-dialog"
import "./my-side-menu.css"
import { useParams } from "next/navigation"
import { mySignOut } from "@modules/account/actions"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SideMenuItems = {
  payment_manage: { src: "/", icon: "fa-wallet", text: "Quản lý thanh toán" },
  support_center: {
    src: "/",
    icon: "fa-phone-volume",
    text: "Trung tâm hỗ trợ",
  },
  orders: { src: "/account/orders", icon: "fa-clipboard", text: "Đơn hàng" },
  promotions: { src: "/", icon: "fa-percent", text: "Khuyến mãi" },
  terms: { src: "/", icon: "fa-list-check", text: "Điều khoản và chính sách" },
}

const MySideMenu = ({
  customer,
}: {
  regions: Region[] | null
  customer: Omit<Customer, "password_hash"> | null
}) => {
  const [isLogin, setIsLogin] = useState(!!customer)
  const { countryCode } = useParams() as { countryCode: string }

  const handleLogout = async () => {
    await mySignOut(countryCode)
  }

  useEffect(() => {
    setIsLogin(!!customer)
  }, [customer])

  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => {
            return (
              <>
                <div className="relative flex h-full">
                  <Popover.Button
                    data-testid="nav-menu-button"
                    className="relative h-full flex items-center transition-all ease-out duration-200 focus:outline-none hover:text-ui-fg-base"
                  >
                    <BurgerButton />
                  </Popover.Button>
                </div>

                <Transition
                  show={open && isLogin}
                  as={Fragment}
                  enter="transition ease-out duration-150"
                  enterFrom="opacity-0"
                  enterTo="opacity-100 backdrop-blur-lg"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 backdrop-blur-lg"
                  leaveTo="opacity-0"
                >
                  <Popover.Panel className="menu-blur-background">
                    <div className="menu-white-container">
                      <div className="menu-header">
                        <button onClick={close} className="menu-header-close">
                          <i className="fa-solid fa-arrow-left"></i>
                        </button>
                        <div className="menu-header-title">
                          Thông tin tài khoản
                        </div>
                      </div>
                      <div className="menu-account">
                        <div className="menu-account-avatar"></div>
                        <div className="menu-account-text">
                          <div className="menu-account-text-name">
                            Họ và tên
                          </div>
                          <div className="menu-account-text-email">
                            hovaten@gmail.com
                          </div>
                        </div>
                        <div className="menu-account-chevron">
                          <i className="fa-solid fa-chevron-right"></i>
                        </div>
                      </div>
                      <div className="menu-card">
                        <div className="menu-card-label">Thẻ Eneji</div>
                        <div className="menu-card-value">40.000 đ</div>
                      </div>
                      <ul className="menu-features">
                        {Object.entries(SideMenuItems).map(
                          ([key, value], index) => {
                            const divider =
                              index > 0 ? (
                                <li className="menu-divider-normal"></li>
                              ) : null
                            return (
                              <>
                                {divider}
                                <li key={key}>
                                  <LocalizedClientLink
                                    href={value.src}
                                    className="menu-feature"
                                    onClick={close}
                                    data-testid={`${key.toLowerCase()}-link`}
                                  >
                                    <div className="menu-feature-icon">
                                      <i
                                        className={`fa-solid ${value.icon}`}
                                      ></i>
                                    </div>
                                    <div className="menu-feature-text">
                                      {value.text}
                                    </div>
                                  </LocalizedClientLink>
                                </li>
                              </>
                            )
                          }
                        )}
                        <div className="menu-divider-big"></div>
                        <div className="menu-feature">
                          <div className="menu-feature-icon">
                            <i className="fa-solid fa-lock"></i>
                          </div>
                          <div className="menu-feature-text">Đổi mật khẩu</div>
                        </div>
                        <div className="menu-divider-normal"></div>
                      </ul>
                      <div className="menu-footer">
                        <div className="menu-footer-version">
                          App Version - V1.00
                        </div>
                        <button
                          onClick={handleLogout}
                          className="menu-footer-logout"
                        >
                          Đăng xuất
                        </button>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>

                {open && !isLogin && (
                  <Popover.Panel>
                    <LoginDialog closeDialog={close} />
                  </Popover.Panel>
                )}
              </>
            )
          }}
        </Popover>
      </div>
    </div>
  )
}

export default MySideMenu
