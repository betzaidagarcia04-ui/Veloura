'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Timer, ArrowRight, Flame } from 'lucide-react'
import Link from 'next/link'

function useCountdown(targetHours = 11) {
  const [timeLeft, setTimeLeft] = useState({ h: targetHours, m: 0, s: 0 })
  useEffect(() => {
    const end = Date.now() + targetHours * 3600000
    const tick = () => {
      const d = Math.max(0, end - Date.now())
      setTimeLeft({ h: Math.floor(d / 3600000), m: Math.floor((d % 3600000) / 60000), s: Math.floor((d % 60000) / 1000) })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [targetHours])
  return timeLeft
}

function Digit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-14 h-14 rounded-xl bg-cream border border-border flex items-center justify-center shadow-inner">
        <span className="text-2xl font-bold font-mono text-forest tabular-nums">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="text-text-muted text-xs mt-1">{label}</span>
    </div>
  )
}

export default function Urgency() {
  const { h, m, s } = useCountdown(11)

  return (
    <section className="py-16 relative overflow-hidden bg-gold-pale border-y border-gold/20">
      <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-transparent to-gold/5 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div>
            <div className="flex items-center gap-2 text-gold-dark font-semibold mb-2">
              <Flame className="w-4 h-4" />
              Limited Time Offer
            </div>
            <h3 className="text-3xl font-bold text-forest">
              Flash Sale: <span className="text-gradient-accent">45% OFF</span>
            </h3>
            <p className="text-text-secondary mt-2">
              Only <strong className="text-gold-dark">12 units</strong> left at this price. Offer expires in:
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Timer className="w-5 h-5 text-forest hidden sm:block" />
            <div className="flex items-center gap-2">
              <Digit value={h} label="HRS" />
              <span className="text-text-muted text-xl font-mono mb-5">:</span>
              <Digit value={m} label="MIN" />
              <span className="text-text-muted text-xl font-mono mb-5">:</span>
              <Digit value={s} label="SEC" />
            </div>
          </div>

          <Link href="/products/smart-lcd-digital-measuring-tape" className="btn-gold flex-shrink-0">
            Claim Discount
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
