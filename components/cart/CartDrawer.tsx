'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag, Minus, Plus, Trash2, ArrowRight, Lock } from 'lucide-react'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/shopify'
import { cn } from '@/lib/utils'

export default function CartDrawer() {
  const { cart, isOpen, isLoading, closeCart, removeItem, updateItem } = useCart()
  const lines = cart?.lines.edges.map((e) => e.node) ?? []
  const subtotal = cart?.cost.subtotalAmount
  const total = cart?.cost.totalAmount

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-forest/40 backdrop-blur-sm z-50"
          />

          <motion.aside
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md z-50 flex flex-col bg-cream border-l border-border shadow-forest"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-forest" />
                <h2 className="font-semibold text-lg text-text-primary">Your Cart</h2>
                {lines.length > 0 && (
                  <span className="ml-1 px-2 py-0.5 rounded-full bg-gold/15 text-gold-dark text-xs font-semibold">
                    {cart?.totalQuantity}
                  </span>
                )}
              </div>
              <button onClick={closeCart} className="p-2 rounded-xl hover:bg-cream-dark transition-colors text-text-muted hover:text-text-primary">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {lines.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center gap-4 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-cream-dark flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8 text-text-muted" />
                  </div>
                  <div>
                    <p className="text-text-primary font-medium">Your cart is empty</p>
                    <p className="text-text-muted text-sm mt-1">Add something to get started</p>
                  </div>
                  <button onClick={closeCart} className="btn-outline text-sm mt-2">Continue Shopping</button>
                </div>
              ) : (
                <ul className="space-y-4">
                  {lines.map((line) => (
                    <motion.li
                      key={line.id} layout
                      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                      className="flex gap-4 p-4 rounded-2xl bg-white border border-border"
                    >
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-cream-dark">
                        {line.merchandise.product.featuredImage ? (
                          <Image
                            src={line.merchandise.product.featuredImage.url}
                            alt={line.merchandise.product.featuredImage.altText ?? line.merchandise.product.title}
                            fill className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ShoppingBag className="w-6 h-6 text-text-muted" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-text-primary text-sm font-medium truncate">{line.merchandise.product.title}</p>
                        <p className="text-text-muted text-xs mt-0.5">{line.merchandise.title}</p>
                        <p className="text-gold-dark font-semibold text-sm mt-1">
                          {formatPrice(line.cost.totalAmount.amount, line.cost.totalAmount.currencyCode)}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center gap-1 rounded-lg border border-border overflow-hidden">
                            <button onClick={() => line.quantity > 1 ? updateItem(line.id, line.quantity - 1) : removeItem(line.id)} disabled={isLoading} className="p-1.5 hover:bg-cream-dark transition-colors text-text-muted disabled:opacity-50"><Minus className="w-3 h-3" /></button>
                            <span className="px-2 text-sm font-medium text-text-primary min-w-6 text-center">{line.quantity}</span>
                            <button onClick={() => updateItem(line.id, line.quantity + 1)} disabled={isLoading} className="p-1.5 hover:bg-cream-dark transition-colors text-text-muted disabled:opacity-50"><Plus className="w-3 h-3" /></button>
                          </div>
                          <button onClick={() => removeItem(line.id)} disabled={isLoading} className="p-1.5 rounded-lg hover:bg-red-50 text-text-muted hover:text-red-500 transition-colors disabled:opacity-50">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {lines.length > 0 && (
              <div className="p-6 border-t border-border space-y-4 bg-white">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-text-secondary">
                    <span>Subtotal</span>
                    <span>{subtotal ? formatPrice(subtotal.amount, subtotal.currencyCode) : '—'}</span>
                  </div>
                  <div className="flex justify-between text-sm text-text-secondary">
                    <span>Shipping</span>
                    <span className="text-success font-medium">Free</span>
                  </div>
                  <div className="flex justify-between font-semibold text-text-primary pt-2 border-t border-border">
                    <span>Total</span>
                    <span>{total ? formatPrice(total.amount, total.currencyCode) : '—'}</span>
                  </div>
                </div>

                <a href={cart?.checkoutUrl} className={cn('btn-primary w-full text-base', isLoading && 'opacity-70 pointer-events-none')}>
                  <Lock className="w-4 h-4" />
                  Secure Checkout
                  <ArrowRight className="w-4 h-4 ml-auto" />
                </a>

                <div className="flex items-center justify-center gap-4 text-text-muted text-xs">
                  <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> SSL Encrypted</span>
                  <span>·</span><span>30-Day Returns</span>
                  <span>·</span><span>Free Shipping</span>
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
