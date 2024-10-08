import { ProductPreviewType, TimelineProps } from "types/global"
import DishPreview from "@modules/products/components/dish-preview"
import { Region } from "@medusajs/medusa"
import { Text } from "@medusajs/ui"
import TimeBlock from "@modules/products/components/dish-preview/time-block"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"

const BreakfastDishes = ({
  products,
  pricedProducts,
  region,
  timeline,
}: {
  products: ProductPreviewType[]
  pricedProducts: (PricedProduct | null)[]
  region: Region
  timeline: TimelineProps
}) => {
  if (!products || products.length === 0) return null

  // Get today's products
  const today = getCurrentDate()
  const todayProducts = products.filter(
    (product) => product.metadata?.start_date === today
  )
  const todayPricedProducts = pricedProducts.filter(
    (pricedProduct) => pricedProduct?.metadata?.start_date === today
  )

  // Get time Date.now()
  const currentTime = getCurrentTime()

  // The remaining time until the end of the breakfast period
  const remainingTime = getTimeDifference(
    currentTime,
    timeline.breakfastEndTime
  )

  // If time is between 'startTime' and 'endTime', show breakfast dishes
  if (
    currentTime < timeline.breakfastStartTime ||
    currentTime >= timeline.breakfastEndTime
  ) {
    // If time is not between 'startTime' and 'endTime', and still in lunch time, show the "Tạm ngưng phục vụ" message
    if (
      currentTime >= timeline.lunchStartTime &&
      currentTime < timeline.lunchEndTime
    ) {
      return (
        <div className="content-container pb-4 lg:pb-6">
          <Text className="txt-xlarge font-[500]">Món ăn bữa sáng 🌤️</Text>
          <Text className="warning-text">Tạm ngưng phục vụ</Text>
        </div>
      )
    }

    // Otherwise, if it's also not in lunch time, show the tomorrows breakfast dishes
    const tomorrow = getNextDate()
    const tomorrowProducts = products.filter(
      (product) => product.metadata?.start_date === tomorrow
    )
    const tomorrowPricedProducts = pricedProducts.filter(
      (pricedProduct) => pricedProduct?.metadata?.start_date === tomorrow
    )
    return (
      <TomorrowBreakfast
        products={tomorrowProducts}
        pricedProducts={tomorrowPricedProducts}
        region={region}
        timeline={timeline}
      />
    )
  }

  return (
    <div className="content-container pb-4 lg:pb-6">
      <Text className="txt-xlarge font-[500]">Món ăn bữa sáng 🌤️</Text>
      <div className="flex justify-start">
        <div className="txt-medium mr-1">Kết thúc trong </div>
        <TimeBlock time={remainingTime} />
      </div>
      {todayProducts.length > 0 && (
        <ul className="grid grid-cols-2 w-full small:grid-cols-3 medium:grid-cols-4 gap-4 md:gap-5 mt-4 lg:mt-6">
          {todayProducts.map((product, index) => (
            <li key={product.id}>
              <DishPreview
                dishPreview={product}
                pricedProduct={todayPricedProducts[index]}
                region={region}
                thumbnailSize="square"
              />
            </li>
          ))}
        </ul>
      )}
      {todayProducts.length == 0 && (
        <Text className="warning-text">Không có món ăn nào cho hôm nay</Text>
      )}
    </div>
  )
}

export default BreakfastDishes

/**
 * Get the current time in HH:mm:ss format
 * @returns the current time in HH:mm:ss format
 */
function getCurrentTime(): string {
  // Get the current date and time
  const now = new Date()

  // Extract hours and minutes
  let hours = now.getHours()
  let minutes = now.getMinutes()
  let seconds = now.getSeconds()

  // Format hours and minutes to be two digits
  const formattedHours = hours < 10 ? `0${hours}` : hours.toString()
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString()
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds.toString()

  // Return the formatted time string
  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
}

/**
 * Get the current date in dd/MM/yyyy format
 * @returns the current date in dd/MM/yyyy format
 */
function getCurrentDate(): string {
  // Get the current date and time
  const now = new Date()

  // Extract day, month, and year
  let day = now.getDate()
  let month = now.getMonth() + 1 // Months are 0-indexed
  const year = now.getFullYear()

  // Format day and month to be two digits
  const formattedDay = day < 10 ? `0${day}` : day.toString()
  const formattedMonth = month < 10 ? `0${month}` : month.toString()

  // Return the formatted date string
  return `${formattedDay}/${formattedMonth}/${year}`
}

/**
 * Get the next date in dd/MM/yyyy format
 * @returns the next date in dd/MM/yyyy format
 */
function getNextDate(): string {
  // Create a new Date object (Note: month is 0-indexed in JavaScript Date)
  const date = new Date()

  // Increment the date by one day
  date.setDate(date.getDate() + 1)

  // Extract the new day, month, and year
  const nextDay = date.getDate()
  const nextMonth = date.getMonth() + 1 // Months are 0-indexed
  const nextYear = date.getFullYear()

  // Format day and month to be two digits
  const formattedDay = nextDay < 10 ? `0${nextDay}` : nextDay.toString()
  const formattedMonth = nextMonth < 10 ? `0${nextMonth}` : nextMonth.toString()

  // Return the formatted next date string
  return `${formattedDay}/${formattedMonth}/${nextYear}`
}

/**
 * The TomorrowBreakfast component displays the breakfast dishes for the next day
 * @param param0 the props for the TomorrowBreakfast component
 * @returns the TomorrowBreakfast component
 */
const TomorrowBreakfast = ({
  products,
  pricedProducts,
  region,
  timeline,
}: {
  products: ProductPreviewType[]
  pricedProducts: (PricedProduct | null)[]
  region: Region
  timeline: TimelineProps
}) => {
  const remainingTime = getTimeDifference(
    getCurrentTime(),
    timeline.lunchStartTime
  )
  return (
    <div className="content-container pb-4 lg:pb-6">
      <Text className="txt-xlarge font-[500]">
        Món ăn bữa sáng tiếp theo 🌤️
      </Text>
      <div className="flex justify-start">
        <div className="txt-medium mr-1">Bắt đầu trong </div>
        <TimeBlock time={remainingTime} />
      </div>
      {products.length > 0 && (
        <ul className="grid grid-cols-2 w-full small:grid-cols-3 medium:grid-cols-4 gap-4 md:gap-5 mt-4 lg:mt-6">
          {products.map((product, index) => (
            <li key={product.id}>
              <DishPreview
                dishPreview={product}
                pricedProduct={pricedProducts[index]}
                region={region}
                thumbnailSize="square"
              />
            </li>
          ))}
        </ul>
      )}
      {products.length == 0 && (
        <Text className="warning-text">Không có món ăn nào cho ngày mai!</Text>
      )}
    </div>
  )
}

/**
 * Get the duration between two times in HH:MM:SS format
 * @param startTime the start time in HH:MM:SS format
 * @param endTime the end time in HH:MM:SS format
 * @returns the duration between the start and end times in HH:MM:SS format
 */
function getTimeDifference(startTime: string, endTime: string): string {
  // Parse the input time strings
  const [startHours, startMinutes, startSeconds] = startTime
    .split(":")
    .map(Number)
  const [endHours, endMinutes, endSeconds] = endTime.split(":").map(Number)

  // Convert times to total seconds since midnight
  const startTotalSeconds =
    startHours * 60 * 60 + startMinutes * 60 + startSeconds
  const endTotalSeconds = endHours * 60 * 60 + endMinutes * 60 + endSeconds

  // Calculate the difference in seconds
  let differenceInSeconds = endTotalSeconds - startTotalSeconds

  // If the difference is negative, add 24 hours (86400 seconds) to it
  if (differenceInSeconds < 0) {
    differenceInSeconds += 86400
  }

  // Convert the difference back to hours, minutes, and seconds
  const hours = Math.floor(differenceInSeconds / 3600)
  const minutes = Math.floor((differenceInSeconds % 3600) / 60)
  const seconds = differenceInSeconds % 60

  // Format hours, minutes, and seconds to be two digits
  const formattedHours = hours < 10 ? `0${hours}` : hours.toString()
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString()
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds.toString()

  // Return the formatted duration string
  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
}
