'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Star, ShieldCheck, Zap } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-cream">
      {/* Subtle gold glow top-right */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gold/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-forest/5 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — Copy */}
          <div>
            <motion.div
              custom={0} initial="hidden" animate="show" variants={fadeUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/40 bg-gold/10 text-gold-dark text-xs font-semibold mb-8"
            >
              <Zap className="w-3 h-3" />
              New Arrival · Precision Tech
            </motion.div>

            <motion.h1
              custom={1} initial="hidden" animate="show" variants={fadeUp}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-forest"
            >
              Measure{' '}
              <span className="text-gradient-accent">everything</span>
              <br />
              with precision.
            </motion.h1>

            <motion.p
              custom={2} initial="hidden" animate="show" variants={fadeUp}
              className="mt-6 text-lg text-text-secondary leading-relaxed max-w-lg"
            >
              The <strong className="text-text-primary font-semibold">Smart LCD Digital Measuring Tape</strong> fits
              in your palm yet replaces an entire toolkit. Ultra-precise, USB-C rechargeable, engineered to last 200 days on a single charge.
            </motion.p>

            {/* Social proof */}
            <motion.div
              custom={3} initial="hidden" animate="show" variants={fadeUp}
              className="flex items-center gap-3 mt-6"
            >
              <div className="flex -space-x-2">
                {['#2D3E2A','#3D5538','#5A7055','#8A9E85','#C9A87C'].map((c, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-cream" style={{ backgroundColor: c }} />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-0.5">
                  {Array(5).fill(0).map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />)}
                </div>
                <p className="text-text-muted text-xs mt-0.5">
                  <strong className="text-text-secondary">4.9/5</strong> · 2,400+ happy customers
                </p>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              custom={4} initial="hidden" animate="show" variants={fadeUp}
              className="flex flex-wrap gap-3 mt-8"
            >
              <Link href="/products/smart-lcd-digital-measuring-tape" className="btn-gold text-base px-8 py-4">
                Shop Now
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="#features" className="btn-outline text-base px-8 py-4">
                See Features
              </Link>
            </motion.div>

            {/* Trust row */}
            <motion.div
              custom={5} initial="hidden" animate="show" variants={fadeUp}
              className="flex flex-wrap items-center gap-6 mt-8 pt-8 border-t border-border"
            >
              {[
                { icon: ShieldCheck, text: '30-Day Returns' },
                { icon: Zap,         text: 'Fast Delivery' },
                { icon: Star,        text: 'Premium Quality' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-text-muted text-sm">
                  <Icon className="w-4 h-4 text-gold" />
                  {text}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Product card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="relative flex items-center justify-center"
          >
            <div className="absolute inset-0 rounded-full bg-gold/8 blur-3xl scale-75" />

            <div className="relative card-surface p-8 w-full max-w-sm mx-auto shadow-gold">
              {/* Badge */}
              <div className="absolute -top-3 -right-3 px-3 py-1 rounded-full bg-gradient-gold text-forest-dark text-xs font-bold shadow-gold-sm">
                SAVE 45%
              </div>

              {/* Product image placeholder */}
              <div className="w-full aspect-square rounded-xl bg-cream flex items-center justify-center relative overflow-hidden mb-6 border border-border">
                {[1,2,3].map((i) => (
                  <div
                    key={i}
                    className="absolute rounded-full border border-gold/20 animate-pulse-slow"
                    style={{ width: `${i*33}%`, height: `${i*33}%`, animationDelay: `${i*0.5}s` }}
                  />
                ))}
                <div className="relative z-10 text-center animate-float">
                  <div className="w-24 h-24 rounded-full bg-forest flex items-center justify-center mx-auto shadow-forest">
                    <svg viewBox="0 0 80 80" className="w-14 h-14" fill="none">
                      <circle cx="40" cy="40" r="32" fill="rgba(247,245,238,0.08)" stroke="rgba(201,168,124,0.5)" strokeWidth="1.5"/>
                      <circle cx="40" cy="40" r="22" fill="rgba(247,245,238,0.05)" stroke="rgba(201,168,124,0.3)" strokeWidth="1"/>
                      <circle cx="40" cy="40" r="3.5" fill="#C9A87C"/>
                      <line x1="14" y1="40" x2="66" y2="40" stroke="rgba(247,245,238,0.35)" strokeWidth="1.5" strokeDasharray="3 2"/>
                      <rect x="29" y="33" width="22" height="14" rx="2" fill="rgba(201,168,124,0.15)" stroke="rgba(201,168,124,0.4)" strokeWidth="1"/>
                      <text x="40" y="43" textAnchor="middle" fontSize="6" fill="#C9A87C" fontFamily="monospace">9.99m</text>
                    </svg>
                  </div>
                  <p className="text-text-muted text-xs mt-3">Product image loads</p>
                  <p className="text-text-muted text-xs">after npm install</p>
                </div>
              </div>

              <h3 className="text-text-primary font-semibold text-lg">Smart LCD Digital Measuring Tape</h3>
              <p className="text-text-muted text-sm mt-1">Electronic Ruler · USB-C Rechargeable</p>

              <div className="flex items-center gap-3 mt-4">
                <span className="text-3xl font-bold text-gradient-accent">$22.00</span>
                <span className="text-text-muted text-lg line-through">$39.99</span>
                <span className="px-2 py-0.5 rounded-full bg-gold/15 text-gold-dark text-xs font-semibold">-45%</span>
              </div>

              {/* Stock bar */}
              <div className="mt-4 p-3 rounded-xl bg-cream border border-border">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-text-muted">Stock availability</span>
                  <span className="text-gold-dark font-semibold">Only 12 left</span>
                </div>
                <div className="h-1.5 rounded-full bg-cream-darker overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-gold" style={{ width: '20%' }} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <p className="text-text-muted text-xs tracking-widest uppercase">Scroll</p>
        <div className="w-px h-12 bg-gradient-to-b from-gold/50 to-transparent" />
      </motion.div>
    </section>
  )
}
