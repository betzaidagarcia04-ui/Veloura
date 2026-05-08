import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/cart/CartDrawer'

export const metadata: Metadata = {
  title: {
    default: 'Veloura — Precision Meets Design',
    template: '%s | Veloura',
  },
  description:
    'Veloura curates cutting-edge tech gadgets and beauty essentials engineered for the modern lifestyle. Shop precision tools designed for those who demand more.',
  keywords: ['electronic measuring ruler', 'digital tape measure', 'precision tools', 'tech gadgets', 'beauty tools'],
  openGraph: {
    title: 'Veloura — Precision Meets Design',
    description: 'Tech gadgets and beauty essentials for the modern lifestyle.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Veloura — Precision Meets Design',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-cream text-text-primary font-sans antialiased">
        <CartProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  )
}
