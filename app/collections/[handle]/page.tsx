import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Star, SlidersHorizontal } from 'lucide-react'
import { getAllProducts, getCollectionProducts, formatPrice, getDiscount } from '@/lib/shopify'
import type { ShopifyProduct } from '@/lib/shopify/types'

export const revalidate = 3600

type Props = { params: { handle: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const title = params.handle === 'all' ? 'All Products' : params.handle.replace(/-/g, ' ')
  return {
    title: `${title} | Veloura`,
    description: `Shop ${title} at Veloura — precision tech gadgets and beauty essentials.`,
  }
}

function ProductCard({ product }: { product: ShopifyProduct }) {
  const price = product.priceRange.minVariantPrice
  const compareAt = product.compareAtPriceRange?.minVariantPrice
  const discount = compareAt ? getDiscount(price.amount, compareAt.amount) : null
  const image = product.featuredImage

  return (
    <Link href={`/products/${product.handle}`} className="card-surface overflow-hidden group block">
      <div className="relative aspect-square overflow-hidden bg-cream-dark">
        {image ? (
          <Image
            src={image.url}
            alt={image.altText ?? product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-gradient-accent opacity-40 animate-pulse" />
          </div>
        )}
        {discount && (
          <div className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-gradient-accent text-white text-xs font-bold">
            -{discount}%
          </div>
        )}
        {!product.availableForSale && (
          <div className="absolute inset-0 bg-cream/80 flex items-center justify-center">
            <span className="text-text-muted font-medium text-sm">Sold Out</span>
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-text-primary text-sm mb-1.5 line-clamp-2 group-hover:text-accent transition-colors">
          {product.title}
        </h3>
        <div className="flex items-center gap-1 mb-3">
          {Array(5).fill(0).map((_, i) => <Star key={i} className="w-3 h-3 fill-gold text-gold" />)}
          <span className="text-text-muted text-xs ml-1">(124)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gradient-accent">
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
  )
}

export default async function CollectionPage({ params }: Props) {
  let products: ShopifyProduct[] = []
  let collectionTitle = params.handle === 'all' ? 'All Products' : params.handle.replace(/-/g, ' ')

  try {
    if (params.handle === 'all') {
      products = await getAllProducts(24)
    } else {
      const collection = await getCollectionProducts(params.handle, 24)
      if (collection) {
        products = collection.products.edges.map((e) => e.node)
        collectionTitle = collection.title
      }
    }
  } catch {
    // Shopify not configured
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <nav className="flex items-center gap-2 text-text-muted text-sm mb-3">
            <Link href="/" className="hover:text-text-secondary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-text-secondary capitalize">{collectionTitle}</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary capitalize">{collectionTitle}</h1>
          {products.length > 0 && (
            <p className="text-text-muted text-sm mt-1">{products.length} products</p>
          )}
        </div>
        <button className="btn-outline text-sm flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4" />
          Filter
        </button>
      </div>

      {/* Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      ) : (
        <div className="text-center py-24">
          <div className="card-surface max-w-md mx-auto p-10">
            <div className="w-12 h-12 rounded-xl bg-gradient-accent mx-auto mb-4 flex items-center justify-center">
              <SlidersHorizontal className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-text-primary mb-2">No products yet</h2>
            <p className="text-text-muted text-sm">
              Connect your Shopify store to display products here.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
