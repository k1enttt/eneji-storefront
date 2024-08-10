export function getDayOfWeek(dateString: string | undefined): string {
  if (!dateString) {
    return ""
  }
  // Split the input date string into day, month, and year
  const [day, month, year] = dateString.split("/").map(Number)

  // Create a new Date object (Note: month is 0-indexed in JavaScript Date)
  const date = new Date(year, month - 1, day)

  // Array of day names
  const daysOfWeek = [
    "Chủ Nhật",
    "Thứ 2",
    "Thứ 3",
    "Thứ 4",
    "Thứ 5",
    "Thứ 6",
    "Thứ 7",
  ]

  // Get the day of the week (0-6) and return the corresponding day name
  return daysOfWeek[date.getDay()]
}
