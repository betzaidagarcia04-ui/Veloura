import Hero from '@/components/home/Hero'
import FeatureGrid from '@/components/home/FeatureGrid'
import HowItWorks from '@/components/home/HowItWorks'
import ProductShowcase from '@/components/home/ProductShowcase'
import SocialProof from '@/components/home/SocialProof'
import Urgency from '@/components/home/Urgency'
import { getAllProducts } from '@/lib/shopify'

export const revalidate = 3600

export default async function HomePage() {
  let products = []

  try {
    products = await getAllProducts(8)
  } catch {
    // Render with static fallbacks if Shopify domain isn't configured yet
  }

  return (
    <>
      <Hero />
      <Urgency />
      <FeatureGrid />
      <HowItWorks />
      <ProductShowcase products={products} />
      <SocialProof />
    </>
  )
}
