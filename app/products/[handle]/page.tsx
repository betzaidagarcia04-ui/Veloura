import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getProduct } from '@/lib/shopify'
import ProductGallery from '@/components/product/ProductGallery'
import ProductInfo from '@/components/product/ProductInfo'
import SocialProof from '@/components/home/SocialProof'

export const revalidate = 3600

type Props = { params: { handle: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const product = await getProduct(params.handle)
    if (!product) return { title: 'Product Not Found' }
    return {
      title: product.seo.title || product.title,
      description: product.seo.description || product.description.slice(0, 160),
      openGraph: {
        title: product.title,
        description: product.description.slice(0, 160),
        images: product.featuredImage ? [{ url: product.featuredImage.url }] : [],
        type: 'website',
      },
    }
  } catch {
    return { title: 'Product' }
  }
}

export default async function ProductPage({ params }: Props) {
  let product = null

  try {
    product = await getProduct(params.handle)
  } catch {
    // Shopify not configured — render fallback below
  }

  if (product === null && process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN !== 'your-store.myshopify.com') {
    notFound()
  }

  const images = product?.images.edges.map((e) => e.node) ?? []

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {product ? (
        <>
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-text-muted text-sm mb-8">
            <a href="/" className="hover:text-text-secondary transition-colors">Home</a>
            <span>/</span>
            <a href="/collections/all" className="hover:text-text-secondary transition-colors">Shop</a>
            <span>/</span>
            <span className="text-text-secondary">{product.title}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 xl:gap-20">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <ProductGallery images={images} title={product.title} />
            </div>
            <ProductInfo product={product} />
          </div>
        </>
      ) : (
        /* Demo/preview mode when Shopify not configured */
        <div className="text-center py-20">
          <div className="card-surface max-w-lg mx-auto p-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-accent mx-auto flex items-center justify-center mb-6 shadow-accent">
              <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
                <circle cx="20" cy="20" r="15" fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="1.5"/>
                <circle cx="20" cy="20" r="2" fill="white"/>
                <line x1="6" y1="20" x2="34" y2="20" stroke="white" strokeWidth="1.5" strokeDasharray="3 2"/>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-text-primary mb-3">Veloura Measure Pro</h1>
            <p className="text-text-secondary text-sm mb-6">
              Connect your Shopify store in <code className="text-accent bg-cream-dark px-1.5 py-0.5 rounded">.env.local</code> to display live product data.
            </p>
            <div className="text-left bg-cream rounded-xl p-4 font-mono text-xs text-text-muted border border-border">
              <p className="text-forest">NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=<span className="text-gold-dark">your-store.myshopify.com</span></p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-24">
        <SocialProof />
      </div>
    </div>
  )
}
