import { shopifyFetch } from './client'
import {
  GET_PRODUCT_BY_HANDLE,
  GET_ALL_PRODUCTS,
  GET_COLLECTION_PRODUCTS,
  CREATE_CART,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_LINE,
  GET_CART,
} from './queries'
import type { ShopifyProduct, ShopifyCollection, ShopifyCart } from './types'

export async function getProduct(handle: string): Promise<ShopifyProduct | null> {
  const { data } = await shopifyFetch<{ product: ShopifyProduct | null }>({
    query: GET_PRODUCT_BY_HANDLE,
    variables: { handle },
    tags: [`product-${handle}`],
  })
  return data.product
}

export async function getAllProducts(first = 20): Promise<ShopifyProduct[]> {
  const { data } = await shopifyFetch<{ products: { edges: { node: ShopifyProduct }[] } }>({
    query: GET_ALL_PRODUCTS,
    variables: { first },
    tags: ['products'],
  })
  return data.products.edges.map((e) => e.node)
}

export async function getCollectionProducts(handle: string, first = 20): Promise<ShopifyCollection | null> {
  const { data } = await shopifyFetch<{ collection: ShopifyCollection | null }>({
    query: GET_COLLECTION_PRODUCTS,
    variables: { handle, first },
    tags: [`collection-${handle}`],
  })
  return data.collection
}

export async function createCart(variantId: string, quantity = 1): Promise<ShopifyCart> {
  const { data } = await shopifyFetch<{ cartCreate: { cart: ShopifyCart } }>({
    query: CREATE_CART,
    variables: { lines: [{ merchandiseId: variantId, quantity }] },
    cache: 'no-store',
  })
  return data.cartCreate.cart
}

export async function addToCart(cartId: string, variantId: string, quantity = 1): Promise<ShopifyCart> {
  const { data } = await shopifyFetch<{ cartLinesAdd: { cart: ShopifyCart } }>({
    query: ADD_TO_CART,
    variables: { cartId, lines: [{ merchandiseId: variantId, quantity }] },
    cache: 'no-store',
  })
  return data.cartLinesAdd.cart
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<ShopifyCart> {
  const { data } = await shopifyFetch<{ cartLinesRemove: { cart: ShopifyCart } }>({
    query: REMOVE_FROM_CART,
    variables: { cartId, lineIds },
    cache: 'no-store',
  })
  return data.cartLinesRemove.cart
}

export async function updateCartLine(cartId: string, lineId: string, quantity: number): Promise<ShopifyCart> {
  const { data } = await shopifyFetch<{ cartLinesUpdate: { cart: ShopifyCart } }>({
    query: UPDATE_CART_LINE,
    variables: { cartId, lines: [{ id: lineId, quantity }] },
    cache: 'no-store',
  })
  return data.cartLinesUpdate.cart
}

export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  const { data } = await shopifyFetch<{ cart: ShopifyCart | null }>({
    query: GET_CART,
    variables: { cartId },
    cache: 'no-store',
  })
  return data.cart
}

export function formatPrice(amount: string, currencyCode = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
  }).format(parseFloat(amount))
}

export function getDiscount(price: string, compareAt: string | undefined): number | null {
  if (!compareAt) return null
  const p = parseFloat(price)
  const c = parseFloat(compareAt)
  if (c <= p) return null
  return Math.round(((c - p) / c) * 100)
}
