import { Product, Region } from "@medusajs/medusa"
import { Metadata } from "next"

import {
  getCollectionsList,
  getProductsList,
  getRegion,
  retrievePricedProductById,
} from "@lib/data"
import { ProductCollectionWithPreviews, ProductPreviewType, TimelineProps } from "types/global"
import { cache } from "react"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import MyHero from "../../../modules/home/components/hero/my-hero"
import BreakfastDishes from "@modules/home/components/breakfast-dishes"
import LunchDishes from "@modules/home/components/lunch-dishes"
import DessertsAndDrinks from "@modules/home/components/desserts-and-drinks"
import WeeklyMenu from "@modules/home/components/weekly-menu"
import News from "@modules/home/components/news"
import Promotions from "@modules/home/components/promotions"
import { promotions, news } from "@lib/data/data"

export const metadata: Metadata = {
  title: "Medusa Next.js Starter Template",
  description:
    "A performant frontend ecommerce starter template with Next.js 14 and Medusa.",
}

const getCollectionsWithProducts = cache(
  async (
    countryCode: string
  ): Promise<ProductCollectionWithPreviews[] | null> => {
    const { collections } = await getCollectionsList(0, 3)

    if (!collections) {
      return null
    }

    const collectionIds = collections.map((collection) => collection.id)

    await Promise.all(
      collectionIds.map((id) =>
        getProductsList({
          queryParams: { collection_id: [id] },
          countryCode,
        })
      )
    ).then((responses) =>
      responses.forEach(({ response, queryParams }) => {
        let collection

        if (collections) {
          collection = collections.find(
            (collection) => collection.id === queryParams?.collection_id?.[0]
          )
        }

        if (!collection) {
          return
        }

        collection.products = response.products as unknown as Product[]
      })
    )

    return collections as unknown as ProductCollectionWithPreviews[]
  }
)

const getWeeklyMenu = cache(async (countryCode: string) => {
  const queryParams = { limit: 5 }
  const products = await getProductsList({ queryParams, countryCode })
  return products.response.products
})

const getPricedProducts = cache(
  async (products: ProductPreviewType[], region: Region) => {
    const pricedProducts = await Promise.all(
      products.map((product) =>
        retrievePricedProductById({
          id: product.id,
          regionId: region.id,
        }).then((product) => product)
      )
    )

    return pricedProducts
  }
)

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const collections = await getCollectionsWithProducts(countryCode)
  if (!collections) {
    return null
  }

  const breakfastCollection = collections.find(
    (collection) => collection.title === "Breakfast"
  )
  let breakfastList: ProductPreviewType[] = []
  let breakfastStartTime = "00:00" // The show time of breakfast is 00:00 by default
  let breakfastEndTime = "08:00" // The end time of breakfast is 08:00 by default
  if (breakfastCollection) {
    if (breakfastCollection.metadata) {
      breakfastStartTime = breakfastCollection.metadata?.start_time as string
      breakfastEndTime = breakfastCollection.metadata?.end_time as string
    }
    breakfastList = breakfastCollection.products
  }

  const lunchCollection = collections.find(
    (collection) => collection.title === "Lunch"
  )
  let lunchList: ProductPreviewType[] = []
  let lunchStartTime = "00:00" // The show time of lunch is 00:00 by default
  let lunchEndTime = "13:30" // The end time of lunch is 13:30 by default
  if (lunchCollection) {
    if (lunchCollection.metadata) {
      lunchStartTime = lunchCollection.metadata?.start_time as string
      lunchEndTime = lunchCollection.metadata?.end_time as string
    }
    lunchList = lunchCollection.products
  }

  const timeline: TimelineProps = {
    breakfastStartTime: breakfastStartTime,
    breakfastEndTime: breakfastEndTime,
    lunchStartTime: lunchStartTime,
    lunchEndTime: lunchEndTime,
  }

  const dessertsAndDrinksCollection = collections.find(
    (collection) => collection.title === "Desserts and Drinks"
  )
  let dessertsAndDrinks: ProductPreviewType[] = []
  if (dessertsAndDrinksCollection) {
    dessertsAndDrinks = dessertsAndDrinksCollection.products
  }

  const region = await getRegion(countryCode)
  const weeklyMenu = await getWeeklyMenu(countryCode)
  const promotionsList = promotions
  const newsList = news

  if (!collections || !region) {
    return null
  }

  const pricedBreakfastList = await getPricedProducts(breakfastList, region)
  const pricedLunchList = await getPricedProducts(lunchList, region)
  const pricedDesertsAndDrinks = await getPricedProducts(
    dessertsAndDrinks,
    region
  )
  const pricedWeeklyMenu = await getPricedProducts(weeklyMenu, region)

  return (
    <>
      {/* <Hero /> */}
      <MyHero />
      <div className="pt-4 pb-12">
        <ul className="flex flex-col">
          <BreakfastDishes
            products={breakfastList}
            pricedProducts={pricedBreakfastList}
            region={region}
            timeline={timeline}
          />
          <LunchDishes
            products={lunchList}
            pricedProducts={pricedLunchList}
            region={region}
            timeline={timeline}
          />
          <DessertsAndDrinks
            products={dessertsAndDrinks}
            pricedProducts={pricedDesertsAndDrinks}
            region={region}
          />
          {/* Lỗi responsive, width của thẻ không giảm khi width cửa sổ nhỏ lại */}
          <WeeklyMenu
            products={weeklyMenu}
            pricedProducts={pricedWeeklyMenu}
            region={region}
          />
          {/* Cài thêm extension Blog, sử dụng cho cả Promotions và News */}
          {/* Dùng plugin Strapi */}
          <Promotions products={promotionsList} />
          <News products={newsList} />
        </ul>
      </div>
    </>
  )
}
