'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const reviews = [
  { name: 'Sofia M.',  role: 'Interior Designer', rating: 5, text: "I've tried every measuring tool on the market. This tiny disc outperforms all of them. The accuracy is incredible and it fits in my jacket pocket.", verified: true },
  { name: 'James R.',  role: 'DIY Enthusiast',    rating: 5, text: 'Completely replaced my old tape measure. The memory feature is a game changer — I measure multiple rooms and never have to write anything down.', verified: true },
  { name: 'Aria T.',   role: 'Fashion Designer',  rating: 5, text: "Works perfectly on fabric and flexible materials. I was skeptical at first but now I use it for every measurement. The 200-day battery is not a joke.", verified: true },
  { name: 'Marcus L.', role: 'Contractor',        rating: 5, text: 'The metal shell feels premium. Dropped it on concrete twice — not a scratch. Accurate to within 0.5% which is all I need for rough framing.', verified: true },
  { name: 'Elena K.',  role: 'Architect',         rating: 5, text: 'Elegant design, precise readings. I showed this to three colleagues at a job site and all three ordered one on the spot. Says everything.', verified: true },
  { name: 'David P.',  role: 'Home Renovator',    rating: 5, text: "Couldn't believe how easy it is. My 65-year-old father figured it out in 2 minutes. The LCD is super clear even in bright sunlight.", verified: true },
]

const stats = [
  { value: '4.9',   label: 'Average Rating',    suffix: '/5' },
  { value: '2,400', label: 'Happy Customers',   suffix: '+' },
  { value: '98',    label: 'Would Recommend',   suffix: '%' },
  { value: '200',   label: 'Days Battery Life', suffix: '+' },
]

export default function SocialProof() {
  return (
    <section id="reviews" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="card-surface p-6 text-center"
            >
              <div className="text-4xl font-bold text-gradient-accent">
                {s.value}<span className="text-2xl">{s.suffix}</span>
              </div>
              <p className="text-text-muted text-sm mt-2">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-forest">
            What customers{' '}
            <span className="text-gradient-accent">are saying</span>
          </h2>
          <div className="flex items-center justify-center gap-1 mt-4">
            {Array(5).fill(0).map((_, i) => <Star key={i} className="w-5 h-5 fill-gold text-gold" />)}
            <span className="ml-2 text-text-secondary">4.9 out of 5</span>
          </div>
        </motion.div>

        {/* Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="card-surface p-6 flex flex-col gap-4"
            >
              <Quote className="w-6 h-6 text-gold/50" />
              <p className="text-text-secondary text-sm leading-relaxed flex-1">"{r.text}"</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-forest flex items-center justify-center text-cream font-semibold text-sm">
                    {r.name[0]}
                  </div>
                  <div>
                    <p className="text-text-primary text-sm font-medium">{r.name}</p>
                    <p className="text-text-muted text-xs">{r.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-0.5">
                  {Array(r.rating).fill(0).map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-gold text-gold" />)}
                </div>
              </div>
              {r.verified && (
                <div className="flex items-center gap-1.5 text-success text-xs font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-success" />
                  Verified Purchase
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
