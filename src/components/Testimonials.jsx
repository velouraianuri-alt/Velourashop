import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const testimonials = [
  {
    name: 'María G.',
    handle: '@mariag_style',
    text: 'Las gafas más elegantes que he llevado nunca. El packaging solo ya me hizo sentir que estaba abriendo arte.',
    rating: 5,
    tag: 'VELHOURA Classic',
  },
  {
    name: 'Carlos V.',
    handle: '@carlosv',
    text: 'VELHOURA es donde el streetwear se encuentra con la precisión. He pedido tres veces y cada experiencia ha sido impecable.',
    rating: 5,
    tag: 'Midnight Slim',
  },
  {
    name: 'Sofía R.',
    handle: '@sofiar_looks',
    text: 'El envío más rápido que he experimentado. Llegó en 36 horas, perfectamente empaquetado. Volveré.',
    rating: 5,
    tag: 'Urban Shield',
  },
  {
    name: 'Alejandro M.',
    handle: '@alejandrom',
    text: 'La calidad habla por sí sola. Cada detalle, desde las bisagras hasta los cristales, es perfecto.',
    rating: 5,
    tag: 'Coastal Drift',
  },
]

const Stars = ({ count }) => (
  <div style={{ display: 'flex', gap: 3, marginBottom: 20 }}>
    {Array.from({ length: count }).map((_, i) => (
      <span key={i} style={{ color: 'var(--blue-mid)', fontSize: 15 }}>★</span>
    ))}
  </div>
)

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="testimonials-section" style={{ padding: '130px 72px', background: 'var(--gray-100)' }}>
      <div ref={ref}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
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
            Confianza de Miles
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
            Lo que <em style={{ fontStyle: 'italic' }}>Dicen</em>
          </motion.h2>
        </div>

        {/* Cards */}
        <div className="testimonials-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 + i * 0.1 }}
              style={{
                background: 'var(--white)',
                border: '1px solid var(--gray-200)',
                padding: '36px 28px',
                borderRadius: 6,
              }}
            >
              <Stars count={t.rating} />
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 15,
                lineHeight: 1.75,
                color: 'var(--black)',
                marginBottom: 28,
                fontStyle: 'italic',
              }}>
                "{t.text}"
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--black)' }}>{t.name}</p>
                  <p style={{ fontSize: 11, color: 'var(--gray-400)', letterSpacing: '0.04em' }}>{t.handle}</p>
                </div>
                <span style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  background: 'var(--blue)',
                  color: 'var(--white)',
                  padding: '5px 10px',
                  borderRadius: 3,
                }}>
                  {t.tag}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="testimonials-trust"
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 64,
            marginTop: 72,
            paddingTop: 48,
            borderTop: '1px solid var(--gray-200)',
            flexWrap: 'wrap',
          }}
        >
          {['8.000+ Pedidos Enviados', '4.9 / 5 Valoración Media', 'Devoluciones 30 Días', 'Garantía Autenticidad'].map(badge => (
            <div key={badge} style={{ textAlign: 'center' }}>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--gray-600)',
              }}>
                {badge}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  )
}

