import {
  ProductCollectionWithPreviews,
  ProductPreviewType,
  ViewMoreProps,
} from "types/global"
import ViewMoreDessertsAndDrinks from "./view-more-dessert-and-drink"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import { Product, Region } from "@medusajs/medusa"
import { cache } from "react"
import {
  getCollectionsList,
  getProductsList,
  getRegion,
  retrievePricedProductById,
} from "@lib/data"
import ViewMoreWeeklyMenu from "./view-more-weekly-menu"
import NavBar from "../components/nav-bar"

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

const getWeeklyMenu = cache(async (countryCode: string) => {
  const queryParams = {
    limit: 100,
  }
  const products = await getProductsList({ queryParams, countryCode })
  return products.response.products
})

const ViewMoreTemplate = async ({
  type,
  countryCode,
}: {
  type?: ViewMoreProps | undefined
  countryCode: string
}) => {
  // Get collections with products
  const collections = await getCollectionsWithProducts(countryCode)
  const region = await getRegion(countryCode)
  if (!collections || !region) {
    return null
  }

  // Get desserts and drinks collection
  const dessertsAndDrinksCollection = collections.find(
    (collection) => collection.title === "Desserts and Drinks"
  )
  let dessertsAndDrinks: ProductPreviewType[] = []
  if (dessertsAndDrinksCollection) {
    dessertsAndDrinks = dessertsAndDrinksCollection.products
  }
  const pricedDesertsAndDrinks = await getPricedProducts(
    dessertsAndDrinks,
    region
  )

  // Get weekly menu
  const weeklyMenu = await getWeeklyMenu(countryCode)
  const pricedWeeklyMenu = await getPricedProducts(weeklyMenu, region)
  return (
    <div className="content-container">
      {type === "desserts-and-drinks" && (
        <>
          <NavBar />
          <ViewMoreDessertsAndDrinks
            products={dessertsAndDrinks}
            pricedProducts={pricedDesertsAndDrinks}
            region={region}
          />
        </>
      )}
      {type === "promotions" && (
        <>
          <NavBar title="Chương trình khuyến mãi" />
        </>
      )}
      {type === "news" && (
        <>
          <NavBar title="Tin tức" />
        </>
      )}
      {type === "weekly-menu" && (
        <>
          <NavBar title="Thực đơn trong tuần" />
          <ViewMoreWeeklyMenu
            products={weeklyMenu}
            pricedProducts={pricedWeeklyMenu}
            region={region}
          />
        </>
      )}
      {!type && <div>View more</div>}
    </div>
  )
}

export default ViewMoreTemplate
