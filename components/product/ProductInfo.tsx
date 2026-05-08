'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, ShieldCheck, Truck, RotateCcw, Zap, ChevronDown, ChevronUp } from 'lucide-react'
import type { ShopifyProduct, ShopifyProductVariant } from '@/lib/shopify/types'
import { formatPrice, getDiscount } from '@/lib/shopify'
import { useCart } from '@/context/CartContext'
import { cn } from '@/lib/utils'

type Props = { product: ShopifyProduct }

export default function ProductInfo({ product }: Props) {
  const { addItem, isLoading } = useCart()
  const variants = product.variants.edges.map((e) => e.node)
  const [selectedVariant, setSelectedVariant] = useState<ShopifyProductVariant>(variants[0])
  const [qty, setQty] = useState(1)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const price = selectedVariant?.price ?? product.priceRange.minVariantPrice
  const compareAt = selectedVariant?.compareAtPrice
  const discount = compareAt ? getDiscount(price.amount, compareAt.amount) : null

  const handleAddToCart = async () => {
    if (!selectedVariant?.availableForSale) return
    for (let i = 0; i < qty; i++) await addItem(selectedVariant.id)
  }

  const faqs = [
    { q: 'Does it use laser or infrared?',              a: "No — it uses a precision wheel/roller mechanism with an STM32 microprocessor. Ideal for flexible surfaces like fabric and curved objects that lasers can't measure." },
    { q: 'How long does the battery last?',              a: 'Up to 200 days on standby. The 200mAh lithium battery charges fully in under 45 minutes via USB-C.' },
    { q: 'Can it measure curved or flexible surfaces?',  a: 'Yes — roll it along any surface including clothing, pipes, and irregular shapes. A key advantage over laser measures.' },
    { q: 'What is the measurement range?',               a: 'Single measurement: up to 9.99m. Cumulative mode: up to 99.99m. Accuracy: 0.5% with stepless adjustment.' },
  ]

  return (
    <div className="space-y-8">
      {/* Title & Rating */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <div className="flex items-center gap-0.5">
            {Array(5).fill(0).map((_, i) => <Star key={i} className="w-4 h-4 fill-gold text-gold" />)}
          </div>
          <span className="text-text-secondary text-sm">4.9 · 2,412 reviews</span>
          <span className="px-2 py-0.5 rounded-full bg-success/10 text-success text-xs font-semibold">In Stock</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-text-primary leading-tight">{product.title}</h1>
        <p className="mt-3 text-text-secondary leading-relaxed">{product.description.slice(0, 200)}</p>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="text-4xl font-bold text-gradient-accent">
          {formatPrice(price.amount, price.currencyCode)}
        </span>
        {compareAt && parseFloat(compareAt.amount) > parseFloat(price.amount) && (
          <>
            <span className="text-text-muted text-xl line-through">
              {formatPrice(compareAt.amount, compareAt.currencyCode)}
            </span>
            {discount && (
              <span className="px-3 py-1 rounded-full bg-gradient-gold text-forest-dark text-sm font-bold">
                Save {discount}%
              </span>
            )}
          </>
        )}
      </div>

      {/* Options */}
      {product.options.filter((o) => o.values.length > 1).map((option) => (
        <div key={option.id}>
          <p className="text-text-secondary text-sm font-medium mb-3">
            {option.name}: <span className="text-text-primary">{selectedVariant?.selectedOptions.find((o2) => o2.name === option.name)?.value}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {option.values.map((val) => {
              const variant = variants.find((v) => v.selectedOptions.some((o2) => o2.name === option.name && o2.value === val))
              const isSelected = selectedVariant?.selectedOptions.some((o2) => o2.name === option.name && o2.value === val)
              return (
                <button
                  key={val}
                  onClick={() => variant && setSelectedVariant(variant)}
                  disabled={!variant?.availableForSale}
                  className={cn(
                    'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border',
                    isSelected
                      ? 'bg-forest text-cream border-forest shadow-forest'
                      : 'border-border text-text-secondary hover:border-forest hover:text-text-primary',
                    !variant?.availableForSale && 'opacity-40 cursor-not-allowed line-through',
                  )}
                >
                  {val}
                </button>
              )
            })}
          </div>
        </div>
      ))}

      {/* Quantity + Add to Cart */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <p className="text-text-secondary text-sm font-medium">Quantity:</p>
          <div className="flex items-center rounded-xl border border-border overflow-hidden">
            <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-3 hover:bg-cream-dark transition-colors text-text-secondary text-lg">−</button>
            <span className="px-5 py-3 text-text-primary font-semibold min-w-12 text-center">{qty}</span>
            <button onClick={() => setQty(Math.min(10, qty + 1))} className="px-4 py-3 hover:bg-cream-dark transition-colors text-text-secondary text-lg">+</button>
          </div>
        </div>

        {/* Stock bar */}
        <div className="p-4 rounded-xl bg-gold-pale border border-gold/20">
          <div className="flex justify-between text-xs mb-2">
            <span className="text-text-muted">Stock level</span>
            <span className="text-gold-dark font-semibold">🔥 Only 12 left — selling fast</span>
          </div>
          <div className="h-1.5 rounded-full bg-gold/20 overflow-hidden">
            <motion.div
              initial={{ width: 0 }} animate={{ width: '18%' }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full rounded-full bg-gradient-gold"
            />
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={isLoading || !selectedVariant?.availableForSale}
          className={cn('btn-primary w-full py-4 text-base', (isLoading || !selectedVariant?.availableForSale) && 'opacity-60 cursor-not-allowed')}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" className="opacity-75" />
              </svg>Adding…
            </span>
          ) : selectedVariant?.availableForSale ? (
            <><Zap className="w-4 h-4" />Add to Cart — {formatPrice(price.amount, price.currencyCode)}</>
          ) : 'Sold Out'}
        </button>
      </div>

      {/* Trust badges */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: ShieldCheck, label: 'Secure Checkout' },
          { icon: Truck,       label: 'Free Shipping' },
          { icon: RotateCcw,   label: '30-Day Returns' },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="card-surface p-3 text-center">
            <Icon className="w-5 h-5 text-gold mx-auto mb-1.5" />
            <p className="text-text-muted text-xs">{label}</p>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div className="space-y-2">
        <h3 className="font-semibold text-text-primary text-sm mb-3">Frequently Asked</h3>
        {faqs.map((faq, i) => (
          <div key={i} className="card-surface overflow-hidden">
            <button
              onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-cream-dark transition-colors"
            >
              <span className="text-text-primary text-sm font-medium">{faq.q}</span>
              {expandedFaq === i ? <ChevronUp className="w-4 h-4 text-text-muted flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-text-muted flex-shrink-0" />}
            </button>
            {expandedFaq === i && (
              <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} className="overflow-hidden">
                <p className="px-4 pb-4 text-text-muted text-sm leading-relaxed">{faq.a}</p>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
