import { Text, clx } from "@medusajs/ui"

import { getCategoriesList, getCollectionsList } from "@lib/data"

import Link from "next/link"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import MedusaCTA from "@modules/layout/components/medusa-cta"
import Image from "next/image"
import enejiLogo from "./images/enejistation-logo.png"
import zaloIcon from "./images/zalo.svg"
import cashIcon from "./images/tien-mat.png"
import enejiCardIcon from "./images/the-eneji.png"
import acbIcon from "./images/acb.png"
import momoIcon from "./images/momo.png"
import "@fortawesome/fontawesome-free/css/all.min.css"

export default async function Footer() {
  const { collections } = await getCollectionsList(0, 6)
  const { product_categories } = await getCategoriesList(0, 6)

  return (
    <footer className="border-t border-ui-border-base w-full bg-[#101828] text-white">
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col gap-y-6 items-start justify-between pt-10 pb-20">
          <div className="flex gap-x-6">
            <Image
              src={enejiLogo}
              alt="Eneji Station logo"
              width={247}
              height={86}
              className=""
            ></Image>
          </div>

          <div className="w-full flex flex-wrap gap-x-6 gap-y-10 mt-4">
            <div className="flex flex-col gap-6 flex-1 min-w-[300px] md:min-w-[calc(50%-12px)] lg:min-w-[calc(25%-18px)]">
              <div className="font-bold">Công ty Cổ phần TMDV Quả Táo</div>
              <div className="space-y-4">
                <div className="">
                  <b>Địa chỉ:</b> Số 2/29 Cao Thắng, Phường 05, Quận 3, Thành
                  phố Hồ Chí Minh, Việt Nam.
                </div>
                <div className="">
                  <b>Hotline:</b> (028) 3535 2563
                </div>
                <div className="">
                  <b>Mã số doanh nghiệp:</b> 0317034495 do Sở Kế hoạch & Đầu tư
                  TP Hồ Chí Minh cấp ngày 17/11/2021
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-6 flex-1 min-w-[300px] md:min-w-[calc(50%-12px)] lg:min-w-[calc(25%-18px)]">
              <div className="font-bold">Về Eneji Station</div>
              <div className="flex flex-col">
                <Link className="" href={""}>
                  Giới thiệu về Eneji Station
                </Link>
                <Link className="" href={""}>
                  Chính sách bảo mật
                </Link>
                <Link className="" href={""}>
                  Chính sách trả hàng và hoàn tiền
                </Link>
                <Link className="" href={""}>
                  Chính sách vận chuyển
                </Link>
                <Link className="" href={""}>
                  Giải quyết khiếu nại
                </Link>
                <Link className="" href={""}>
                  Hướng dẫn mua hàng
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-6 flex-1 min-w-[300px] md:min-w-[calc(50%-12px)] lg:min-w-[calc(25%-18px)]">
              <div className="font-bold">Phương thức thanh toán</div>
              <div className="flex flex-row gap-2">
                  <Image
                    src={cashIcon}
                    alt="Tiền mặt"
                    width={70}
                    height={46}
                    className="rounded-md"
                  />
                  <Image
                    src={enejiCardIcon}
                    alt="Thẻ Eneji"
                    width={83}
                    height={46}
                    className="rounded-md"
                  />
                  <Image
                    src={acbIcon}
                    alt="ACB"
                    width={92}
                    height={46}
                    className="rounded-md"
                  />
                  <Image
                    src={momoIcon}
                    alt="Momo"
                    width={46}
                    height={46}
                    className="rounded-md"
                  />
              </div>
            </div>
            <div className="flex flex-col gap-6 flex-1 min-w-[300px] md:min-w-[calc(50%-12px)] lg:min-w-[calc(25%-18px)]">
              <div className="font-bold">Mạng xã hội</div>
              <div className="flex flex-row gap-3">
                <Link
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <i className="fab fa-facebook-square text-blue-600 text-4xl"></i>
                </Link>
                <Link
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <i className="fab fa-instagram-square text-pink-500 text-4xl"></i>
                </Link>
                <Link
                  href="https://zalo.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <Image
                    src={zaloIcon}
                    alt="Zalo"
                    width={33}
                    height={33}
                    className="w-[2.063rem] h-[2.063rem] p-0 m-0"
                  ></Image>
                </Link>
              </div>
            </div>
          </div>

          {/* <div>
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus text-ui-fg-subtle hover:text-ui-fg-base uppercase"
            >
              Medusa Store
            </LocalizedClientLink>
          </div>

          <div className="text-small-regular gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-3">
            {product_categories && product_categories?.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="txt-small-plus txt-ui-fg-base">
                  Categories
                </span>
                <ul
                  className="grid grid-cols-1 gap-2"
                  data-testid="footer-categories"
                >
                  {product_categories?.slice(0, 6).map((c) => {
                    if (c.parent_category) {
                      return
                    }

                    const children =
                      c.category_children?.map((child) => ({
                        name: child.name,
                        handle: child.handle,
                        id: child.id,
                      })) || null

                    return (
                      <li
                        className="flex flex-col gap-2 text-ui-fg-subtle txt-small"
                        key={c.id}
                      >
                        <LocalizedClientLink
                          className={clx(
                            "hover:text-ui-fg-base",
                            children && "txt-small-plus"
                          )}
                          href={`/categories/${c.handle}`}
                          data-testid="category-link"
                        >
                          {c.name}
                        </LocalizedClientLink>
                        {children && (
                          <ul className="grid grid-cols-1 ml-3 gap-2">
                            {children &&
                              children.map((child) => (
                                <li key={child.id}>
                                  <LocalizedClientLink
                                    className="hover:text-ui-fg-base"
                                    href={`/categories/${child.handle}`}
                                    data-testid="category-link"
                                  >
                                    {child.name}
                                  </LocalizedClientLink>
                                </li>
                              ))}
                          </ul>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
            {collections && collections.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="txt-small-plus txt-ui-fg-base">
                  Collections
                </span>
                <ul
                  className={clx(
                    "grid grid-cols-1 gap-2 text-ui-fg-subtle txt-small",
                    {
                      "grid-cols-2": (collections?.length || 0) > 3,
                    }
                  )}
                >
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="hover:text-ui-fg-base"
                        href={`/collections/${c.handle}`}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex flex-col gap-y-2">
              <span className="txt-small-plus txt-ui-fg-base">Medusa</span>
              <ul className="grid grid-cols-1 gap-y-2 text-ui-fg-subtle txt-small">
                <li>
                  <a
                    href="https://github.com/medusajs"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-ui-fg-base"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://docs.medusajs.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-ui-fg-base"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/medusajs/nextjs-starter-medusa"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-ui-fg-base"
                  >
                    Source code
                  </a>
                </li>
              </ul>
            </div>
          </div> */}
        </div>
        <div className="flex w-full mb-16 justify-start text-ui-fg-muted">
          <Text className="txt-compact-small">
            © {new Date().getFullYear()} - Bản quyền thuộc về Công ty Cổ phần
            TMDV Quả Táo
          </Text>
          {/* <MedusaCTA /> */}
        </div>
      </div>
    </footer>
  )
}
