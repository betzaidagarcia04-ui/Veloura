'use client'

import { createContext, useContext, useEffect, useReducer, useCallback } from 'react'
import type { ShopifyCart } from '@/lib/shopify/types'
import { createCart, addToCart, removeFromCart, updateCartLine, getCart } from '@/lib/shopify'

type CartState = {
  cart: ShopifyCart | null
  isOpen: boolean
  isLoading: boolean
}

type CartAction =
  | { type: 'SET_CART'; payload: ShopifyCart | null }
  | { type: 'TOGGLE_CART'; payload?: boolean }
  | { type: 'SET_LOADING'; payload: boolean }

type CartContextType = CartState & {
  addItem: (variantId: string, quantity?: number) => Promise<void>
  removeItem: (lineId: string) => Promise<void>
  updateItem: (lineId: string, quantity: number) => Promise<void>
  openCart: () => void
  closeCart: () => void
  itemCount: number
}

const CartContext = createContext<CartContextType | null>(null)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'SET_CART':
      return { ...state, cart: action.payload }
    case 'TOGGLE_CART':
      return { ...state, isOpen: action.payload ?? !state.isOpen }
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    default:
      return state
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    cart: null,
    isOpen: false,
    isLoading: false,
  })

  useEffect(() => {
    const cartId = localStorage.getItem('veloura_cart_id')
    if (cartId) {
      getCart(cartId).then((cart) => {
        if (cart) dispatch({ type: 'SET_CART', payload: cart })
        else localStorage.removeItem('veloura_cart_id')
      })
    }
  }, [])

  const addItem = useCallback(async (variantId: string, quantity = 1) => {
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      const cartId = localStorage.getItem('veloura_cart_id')
      let cart: ShopifyCart
      if (cartId) {
        cart = await addToCart(cartId, variantId, quantity)
      } else {
        cart = await createCart(variantId, quantity)
        localStorage.setItem('veloura_cart_id', cart.id)
      }
      dispatch({ type: 'SET_CART', payload: cart })
      dispatch({ type: 'TOGGLE_CART', payload: true })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }, [])

  const removeItem = useCallback(async (lineId: string) => {
    const cartId = localStorage.getItem('veloura_cart_id')
    if (!cartId) return
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      const cart = await removeFromCart(cartId, [lineId])
      dispatch({ type: 'SET_CART', payload: cart })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }, [])

  const updateItem = useCallback(async (lineId: string, quantity: number) => {
    const cartId = localStorage.getItem('veloura_cart_id')
    if (!cartId) return
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      const cart = await updateCartLine(cartId, lineId, quantity)
      dispatch({ type: 'SET_CART', payload: cart })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }, [])

  const openCart = useCallback(() => dispatch({ type: 'TOGGLE_CART', payload: true }), [])
  const closeCart = useCallback(() => dispatch({ type: 'TOGGLE_CART', payload: false }), [])

  const itemCount = state.cart?.totalQuantity ?? 0

  return (
    <CartContext.Provider value={{ ...state, addItem, removeItem, updateItem, openCart, closeCart, itemCount }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
