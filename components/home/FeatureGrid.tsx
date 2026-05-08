'use client'

import { motion } from 'framer-motion'
import { Battery, Ruler, Layers, Cpu, Shield, Zap, Timer, BookOpen } from 'lucide-react'

const features = [
  { icon: Ruler,    title: '9.99m Range',         desc: 'Single measurement up to 9.99m. Cumulative up to 99.99m for complex projects.',                    accent: 'forest' },
  { icon: Battery,  title: '200-Day Standby',      desc: 'Ultra-low power design. One USB-C charge keeps you going for months, not days.',                   accent: 'gold'   },
  { icon: Cpu,      title: 'STM32 Processor',      desc: 'Military-grade microprocessor delivers 0.5% precision on every single measurement.',                accent: 'forest' },
  { icon: Layers,   title: '8 Measurement Modes',  desc: 'Flexible, irregular, straight — 8 modes handle everything from tailoring to construction.',        accent: 'gold'   },
  { icon: BookOpen, title: '10 Memory Slots',       desc: 'Store and recall your last 10 measurements. Never lose a critical dimension again.',               accent: 'forest' },
  { icon: Shield,   title: 'CNC Metal Shell',       desc: 'Precision-machined aluminum alloy with 4H super-hard screen. Built to withstand daily use.',      accent: 'gold'   },
  { icon: Timer,    title: '3-Button Control',      desc: 'Designed for one-handed operation. Intuitive enough to master in 60 seconds.',                    accent: 'forest' },
  { icon: Zap,      title: '53mm Compact Disc',     desc: 'Pocket-sized puck — 1/3 the size and 1/4 the weight of a traditional tape measure.',              accent: 'gold'   },
]

const accentMap = {
  forest: { border: 'border-forest/10', iconBg: 'bg-forest/8',  icon: 'text-forest' },
  gold:   { border: 'border-gold/20',   iconBg: 'bg-gold/10',   icon: 'text-gold-dark' },
}

export default function FeatureGrid() {
  return (
    <section id="features" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/35 bg-gold/8 text-gold-dark text-xs font-semibold mb-6">
            <Zap className="w-3 h-3" />
            Engineering Excellence
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-forest">
            Every detail{' '}
            <span className="text-gradient-accent">obsessively</span>{' '}
            refined.
          </h2>
          <p className="mt-4 text-text-secondary text-lg">
            Eight precision features packed into a device smaller than your palm.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => {
            const c = accentMap[f.accent as keyof typeof accentMap]
            const Icon = f.icon
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.5 }}
                className={`card-surface p-6 group hover:shadow-card-hover transition-all duration-300 ${c.border}`}
              >
                <div className={`w-10 h-10 rounded-xl ${c.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-5 h-5 ${c.icon}`} />
                </div>
                <h3 className="font-semibold text-text-primary text-sm mb-2">{f.title}</h3>
                <p className="text-text-muted text-xs leading-relaxed">{f.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
