export type ShopifyImage = {
  url: string
  altText: string | null
  width: number
  height: number
}

export type ShopifyPrice = {
  amount: string
  currencyCode: string
}

export type ShopifyProductVariant = {
  id: string
  title: string
  availableForSale: boolean
  selectedOptions: { name: string; value: string }[]
  price: ShopifyPrice
  compareAtPrice: ShopifyPrice | null
  image: ShopifyImage | null
}

export type ShopifyProduct = {
  id: string
  handle: string
  title: string
  description: string
  descriptionHtml: string
  availableForSale: boolean
  featuredImage: ShopifyImage | null
  images: { edges: { node: ShopifyImage }[] }
  priceRange: {
    minVariantPrice: ShopifyPrice
    maxVariantPrice: ShopifyPrice
  }
  compareAtPriceRange: {
    minVariantPrice: ShopifyPrice
  }
  variants: { edges: { node: ShopifyProductVariant }[] }
  tags: string[]
  options: { id: string; name: string; values: string[] }[]
  seo: { title: string; description: string }
}

export type ShopifyCollection = {
  handle: string
  title: string
  description: string
  image: ShopifyImage | null
  products: { edges: { node: ShopifyProduct }[] }
}

export type ShopifyCartLine = {
  id: string
  quantity: number
  merchandise: {
    id: string
    title: string
    selectedOptions: { name: string; value: string }[]
    product: Pick<ShopifyProduct, 'handle' | 'title' | 'featuredImage'>
    price: ShopifyPrice
  }
  cost: {
    totalAmount: ShopifyPrice
  }
}

export type ShopifyCart = {
  id: string
  checkoutUrl: string
  totalQuantity: number
  lines: { edges: { node: ShopifyCartLine }[] }
  cost: {
    subtotalAmount: ShopifyPrice
    totalAmount: ShopifyPrice
    totalTaxAmount: ShopifyPrice | null
  }
}
