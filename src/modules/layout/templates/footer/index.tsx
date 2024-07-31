import { Text, clx } from "@medusajs/ui"

import { getCategoriesList, getCollectionsList } from "@lib/data"

import Link from "next/link"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import MedusaCTA from "@modules/layout/components/medusa-cta"
import Image from "next/image"
import enejiLogo from "../../../../../public/images/enejistation-logo.png"
import cashIcon from "../../../../../public/images/tien-mat.png"
import enejiCardIcon from "../../../../../public/images/the-eneji.png"
import acbIcon from "../../../../../public/images/acb.png"
import momoIcon from "../../../../../public/images/momo.png"
import facebookIcon from "../../../../../public/images/facebook.png"
import instagramIcon from "../../../../../public/images/instagram.png"
import zaloIcon from "../../../../../public/images/zalo.png"
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

          <div className="w-full flex flex-wrap gap-x-5 gap-y-10 mt-4">
            <div className="md:min-w-[400px] lg:min-w-[400px] flex-1 flex justify-around gap-x-5 gap-y-10 flex-wrap md:flex-nowrap">
              <div className="min-w-[300px] flex-1 space-y-3 md:space-y-7">
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
                    <b>Mã số doanh nghiệp:</b> 0317034495 do Sở Kế hoạch & Đầu
                    tư TP Hồ Chí Minh cấp ngày 17/11/2021
                  </div>
                </div>
              </div>
              <div className="min-w-[300px] lg:max-w-[250px] lg:min-w-[200px] max-w-none flex-1 space-y-3 md:space-y-7">
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
            </div>
            <div className="md:min-w-[400px] lg:min-w-[440px] lg:max-w-lg max-w-full flex-1 flex justify-around gap-x-5 gap-y-10 flex-wrap md:flex-nowrap">
              <div className="min-w-[300px] flex-1 space-y-3 md:space-y-7">
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
              <div className="min-w-[300px] lg:min-w-min lg:max-w-[140px] max-w-none flex-1 space-y-3 md:space-y-7">
                <div className="font-bold">Mạng xã hội</div>
                <div className="flex flex-row gap-3">
                  <Link
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    <Image
                      src={facebookIcon}
                      alt="Facebook"
                      width={33}
                      height={33}
                      className="rounded-lg"
                    ></Image>
                  </Link>
                  <Link
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    <Image
                      src={instagramIcon}
                      alt="Instagram"
                      width={33}
                      height={33}
                      className="rounded-lg"
                    ></Image>
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
                      className="rounded-lg"
                    ></Image>
                  </Link>
                </div>
              </div>
            </div>
          </div>

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
