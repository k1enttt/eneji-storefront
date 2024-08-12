export function formatedCommaPrice(price: number | undefined): string | undefined {
  if (price === undefined) {
    return undefined
  }
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
