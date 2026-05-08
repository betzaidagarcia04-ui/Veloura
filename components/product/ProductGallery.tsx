'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import type { ShopifyImage } from '@/lib/shopify/types'
import { cn } from '@/lib/utils'

type Props = { images: ShopifyImage[]; title: string }

export default function ProductGallery({ images, title }: Props) {
  const [active, setActive] = useState(0)
  const [zoomed, setZoomed] = useState(false)

  const prev = () => setActive((i) => (i - 1 + images.length) % images.length)
  const next = () => setActive((i) => (i + 1) % images.length)

  if (!images.length) {
    return (
      <div className="aspect-square rounded-2xl bg-cream-dark flex items-center justify-center">
        <div className="w-32 h-32 rounded-full bg-gradient-accent opacity-30 animate-pulse" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-cream-dark group">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src={images[active].url}
              alt={images[active].altText ?? title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={cn('object-cover transition-transform duration-300', zoomed && 'scale-150 cursor-zoom-out')}
              priority={active === 0}
              onClick={() => setZoomed((v) => !v)}
            />
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full glass opacity-0 group-hover:opacity-100 transition-opacity hover:border-gold/50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full glass opacity-0 group-hover:opacity-100 transition-opacity hover:border-gold/50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        <button
          onClick={() => setZoomed((v) => !v)}
          className="absolute top-3 right-3 p-2 rounded-full glass opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Zoom image"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        {/* Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={cn(
                  'rounded-full transition-all duration-200',
                  i === active ? 'w-4 h-1.5 bg-gold' : 'w-1.5 h-1.5 bg-white/30',
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={cn(
                'relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 transition-all duration-200',
                i === active
                  ? 'ring-2 ring-gold shadow-gold-sm'
                  : 'opacity-50 hover:opacity-75 ring-1 ring-border',
              )}
            >
              <Image
                src={img.url}
                alt={img.altText ?? `Image ${i + 1}`}
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
