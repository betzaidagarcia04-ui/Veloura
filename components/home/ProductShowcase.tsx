'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Star } from 'lucide-react'
import type { ShopifyProduct } from '@/lib/shopify/types'
import { formatPrice, getDiscount } from '@/lib/shopify'

function ProductCard({ product }: { product: ShopifyProduct }) {
  const price = product.priceRange.minVariantPrice
  const compareAt = product.compareAtPriceRange?.minVariantPrice
  const discount = compareAt ? getDiscount(price.amount, compareAt.amount) : null
  const image = product.featuredImage

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="card-surface overflow-hidden group"
    >
      <Link href={`/products/${product.handle}`}>
        <div className="relative aspect-square overflow-hidden bg-cream-dark">
          {image ? (
            <Image
              src={image.url}
              alt={image.altText ?? product.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-accent opacity-40 animate-pulse" />
            </div>
          )}

          {discount && (
            <div className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-gradient-accent text-white text-xs font-bold">
              -{discount}%
            </div>
          )}

          {!product.availableForSale && (
            <div className="absolute inset-0 bg-cream/70 flex items-center justify-center">
              <span className="text-text-muted font-medium">Sold Out</span>
            </div>
          )}
        </div>

        <div className="p-5">
          <h3 className="font-semibold text-text-primary text-sm mb-1 line-clamp-2">{product.title}</h3>
          <div className="flex items-center gap-1 mb-3">
            {Array(5).fill(0).map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-gold text-gold" />
            ))}
            <span className="text-text-muted text-xs ml-1">(124)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gradient-accent">
              {formatPrice(price.amount, price.currencyCode)}
            </span>
            {compareAt && parseFloat(compareAt.amount) > parseFloat(price.amount) && (
              <span className="text-text-muted text-sm line-through">
                {formatPrice(compareAt.amount, compareAt.currencyCode)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

// Fallback static card when no Shopify data
function StaticProductCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="card-surface overflow-hidden group"
    >
      <Link href="/products/smart-lcd-digital-measuring-tape">
        <div className="relative aspect-square overflow-hidden bg-cream-dark">
          <Image
            src="https://cdn.shopify.com/s/files/1/0990/7997/9293/files/1_74e7659c-c381-4668-919a-348c64114d35.jpg?v=1778207252"
            alt="Smart LCD Digital Measuring Tape"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-gradient-accent text-white text-xs font-bold">
            -45%
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-semibold text-text-primary text-sm mb-1">Smart LCD Digital Measuring Tape</h3>
          <div className="flex items-center gap-1 mb-3">
            {Array(5).fill(0).map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-gold text-gold" />
            ))}
            <span className="text-text-muted text-xs ml-1">(2,412)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gradient-accent">$22.00</span>
            <span className="text-text-muted text-sm line-through">$39.99</span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

type Props = { products?: ShopifyProduct[] }

export default function ProductShowcase({ products }: Props) {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-light border border-gold/30 text-gold-dark text-xs font-medium mb-4">
              Featured Collection
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Shop <span className="text-gradient-accent">Veloura</span>
            </h2>
          </div>
          <Link
            href="/collections/all"
            className="btn-outline text-sm flex items-center gap-2 flex-shrink-0"
          >
            View All Products
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products && products.length > 0
            ? products.slice(0, 8).map((p) => <ProductCard key={p.id} product={p} />)
            : Array(4).fill(0).map((_, i) => <StaticProductCard key={i} />)}
        </div>
      </div>
    </section>
  )
}
