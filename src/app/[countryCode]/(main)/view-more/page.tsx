import ViewMoreTemplate from "@modules/view-more/templates"
import { Metadata } from "next"
import {
  ViewMoreProps,
} from "types/global"

export const metadata: Metadata = {
  title: "View more",
  description: "Explore all of our products.",
}

type Params = {
  searchParams: {
    type?: ViewMoreProps
  }
  params: {
    countryCode: string
  }
}

export default async function ViewMore({ searchParams, params }: Params) {
  const { type } = searchParams

  return <ViewMoreTemplate type={type} countryCode={params.countryCode} />
}
