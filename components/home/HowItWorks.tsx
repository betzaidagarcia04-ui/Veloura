'use client'

import { motion } from 'framer-motion'

const steps = [
  { step: '01', title: 'Unbox & Charge',   desc: 'Fully charges in under 45 minutes via USB-C. The 200mAh battery provides up to 200 days of standby.' },
  { step: '02', title: 'Place & Measure',  desc: 'Roll the disc along any surface. Works on flexible, curved, or irregular shapes — even clothing.' },
  { step: '03', title: 'Read & Save',      desc: 'HD LCD displays your measurement instantly. Store up to 10 results in memory for later reference.' },
  { step: '04', title: 'Repeat Anywhere',  desc: 'From your desk drawer to a construction site. Pocket-sized and always ready when you need it.' },
]

export default function HowItWorks() {
  return (
    <section className="py-24 bg-forest">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="text-center max-w-xl mx-auto mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-cream">
            Ready in{' '}
            <span className="text-gradient-gold">60 seconds</span>
          </h2>
          <p className="mt-4 text-cream/60">No learning curve. No manual needed. Just precision.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-gold flex items-center justify-center mb-6 shadow-gold group-hover:scale-105 transform-gpu transition-transform duration-300">
                <span className="font-mono font-bold text-forest-dark text-lg">{s.step}</span>
              </div>
              <h3 className="font-semibold text-cream mb-2">{s.title}</h3>
              <p className="text-cream/55 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
