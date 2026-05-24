import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Zap, Shield, Truck, RefreshCw } from 'lucide-react'

const benefits = [
  {
    icon: Zap,
    title: 'Premium Materials',
    desc: 'Each model is crafted with hand-picked materials from around the world. No shortcuts, no compromises.',
    offset: 0,
  },
  {
    icon: Shield,
    title: 'Authenticity Guarantee',
    desc: 'Every pair comes with an authenticity certificate. Wear your VELHOURA with complete confidence.',
    offset: 60,
  },
  {
    icon: Truck,
    title: 'Worldwide Express Shipping',
    desc: 'Shipped within 48 hours. Fully tracked, insured and delivered with our exclusive packaging.',
    offset: 0,
  },
  {
    icon: RefreshCw,
    title: '30-Day Returns',
    desc: 'Not completely in love? Send it back, no questions asked. Your satisfaction is non-negotiable.',
    offset: 60,
  },
]

export default function Benefits() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="benefits-section" style={{ padding: '130px 72px', background: 'var(--white)' }}>
      <div ref={ref}>
        {/* Header */}
        <div className="benefits-header" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 88, alignItems: 'end' }}>
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              style={{
                display: 'block',
                fontFamily: 'var(--font-body)',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'var(--blue)',
                marginBottom: 14,
              }}
            >
              Why VELHOURA
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 35 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(40px, 4vw, 68px)',
                fontWeight: 700,
                lineHeight: 0.93,
                letterSpacing: '-0.02em',
                color: 'var(--black)',
              }}
            >
              Different<br />
              <em style={{ fontStyle: 'italic' }}>By Design</em>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25 }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 15,
              color: 'var(--gray-600)',
              lineHeight: 1.85,
              alignSelf: 'flex-end',
            }}
          >
            We obsess over every detail so you don't have to. From sourcing materials to the moment your order arrives at your door, the standard is absolute.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="benefits-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 28, alignItems: 'start' }}>
          {benefits.map((b, i) => {
            const Icon = b.icon
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 60 }}
                animate={inView ? { opacity: 1, y: b.offset } : {}}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 + i * 0.13 }}
                style={{
                  background: 'var(--gray-100)',
                  padding: '36px 28px',
                  borderRadius: 6,
                  marginTop: b.offset,
                  transition: 'box-shadow 0.3s',
                }}
                whileHover={{ y: b.offset - 6, boxShadow: '0 20px 60px rgba(27,79,204,0.1)' }}
              >
                <div style={{
                  width: 46,
                  height: 46,
                  borderRadius: 6,
                  background: 'var(--blue)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 26,
                }}>
                  <Icon size={20} color="white" />
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 26,
                  fontWeight: 700,
                  marginBottom: 14,
                  lineHeight: 1.1,
                  color: 'var(--black)',
                }}>
                  {b.title}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 14,
                  color: 'var(--gray-600)',
                  lineHeight: 1.75,
                }}>
                  {b.desc}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>

    </section>
  )
}

