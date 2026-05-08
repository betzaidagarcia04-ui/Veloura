'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/collections/all', label: 'Shop' },
  { href: '#features', label: 'Features' },
  { href: '#reviews', label: 'Reviews' },
]

export default function Navbar() {
  const { itemCount, openCart } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      {/* Announcement bar — Forest Deep bg, cream text */}
      <div className="text-cream text-center text-xs py-2 px-4 font-medium tracking-wide bg-forest">
        ✦ Free shipping on orders over $25 · 30-day returns ✦
      </div>

      <header
        className={cn(
          'sticky top-0 z-50 transition-all duration-300',
          scrolled ? 'glass border-b border-border shadow-card' : 'bg-cream',
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

          {/* Logo — shown in native color (#1E3A2A ≈ forest) on cream bg */}
          <Link href="/" className="flex items-center group" aria-label="Veloura Home">
            <Image
              src="/veloura_logo.svg"
              alt="Veloura"
              width={130}
              height={46}
              className="h-9 w-auto opacity-90 group-hover:opacity-100 transition-opacity duration-200"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-text-secondary hover:text-text-primary text-sm font-medium transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-200 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={openCart}
              aria-label="Open cart"
              className="relative p-2 rounded-xl hover:bg-cream-dark transition-colors group"
            >
              <ShoppingBag className="w-5 h-5 text-text-secondary group-hover:text-text-primary transition-colors" />
              {itemCount > 0 && (
                <motion.span
                  key={itemCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-gold text-forest-dark text-xs font-bold flex items-center justify-center shadow-gold-sm"
                >
                  {itemCount}
                </motion.span>
              )}
            </button>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden p-2 rounded-xl hover:bg-cream-dark transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen
                ? <X className="w-5 h-5 text-text-primary" />
                : <Menu className="w-5 h-5 text-text-primary" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden bg-cream border-t border-border"
            >
              <ul className="px-4 py-4 space-y-1">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-3 px-4 rounded-xl text-text-secondary hover:text-text-primary hover:bg-cream-dark transition-all text-sm font-medium"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
