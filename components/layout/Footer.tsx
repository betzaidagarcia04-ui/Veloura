import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Twitter, Youtube } from 'lucide-react'

const footerLinks = {
  Shop: [
    { href: '/collections/all', label: 'All Products' },
    { href: '/collections/gadgets', label: 'Tech Gadgets' },
    { href: '/collections/beauty', label: 'Beauty Tools' },
    { href: '/collections/new', label: "What's New" },
  ],
  Support: [
    { href: '/pages/faq', label: 'FAQ' },
    { href: '/pages/shipping', label: 'Shipping Info' },
    { href: '/pages/returns', label: 'Returns & Refunds' },
    { href: '/pages/contact', label: 'Contact Us' },
  ],
  Legal: [
    { href: '/policies/privacy-policy', label: 'Privacy Policy' },
    { href: '/policies/terms-of-service', label: 'Terms of Service' },
    { href: '/policies/refund-policy', label: 'Refund Policy' },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t border-border mt-24 bg-forest">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-5">
              {/* Logo inverted (white) on forest bg */}
              <Image
                src="/veloura_logo.svg"
                alt="Veloura"
                width={130}
                height={46}
                className="h-9 w-auto brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="text-cream/60 text-sm leading-relaxed max-w-xs">
              Precision-engineered tools that bridge technology and everyday elegance. Built for those who demand more.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[
                { Icon: Instagram, href: '#', label: 'Instagram' },
                { Icon: Twitter,   href: '#', label: 'Twitter' },
                { Icon: Youtube,   href: '#', label: 'YouTube' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl border border-cream/15 flex items-center justify-center text-cream/50 hover:text-gold hover:border-gold/40 transition-colors duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-cream font-semibold text-sm mb-4 tracking-wide">{section}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-cream/50 text-sm hover:text-cream transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-cream/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-cream/40 text-xs">
            © {new Date().getFullYear()} Veloura. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-cream/40 text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              All systems operational
            </div>
            <p className="text-cream/40 text-xs">Powered by Shopify</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
