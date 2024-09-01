import { getCustomer } from "@lib/data"
import BottomMenu from "@modules/layout/components/bottom-menu"
import { Metadata } from "next"
import "styles/globals.css"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:8000"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
}

export default async function RootLayout(
  props: { children: React.ReactNode },
) {
    const customer = await getCustomer().catch(() => null)
  return (
    <html lang="en" data-mode="light">
      <body>
        <main className="relative">{props.children}</main>
        <BottomMenu customer={customer} />
      </body>
    </html>
  )
}
