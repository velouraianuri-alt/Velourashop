import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Zap, Shield, Truck, RefreshCw } from 'lucide-react'

const benefits = [
  {
    icon: Zap,
    title: 'Materiales Premium',
    desc: 'Cada modelo está fabricado con materiales seleccionados a mano de todo el mundo. Sin atajos, sin concesiones.',
    offset: 0,
  },
  {
    icon: Shield,
    title: 'Garantía de Autenticidad',
    desc: 'Cada gafa viene con certificado de autenticidad. Lleva tu VELOURA con total confianza.',
    offset: 60,
  },
  {
    icon: Truck,
    title: 'Envío Express Mundial',
    desc: 'Enviado en 48 horas. Completamente rastreado, asegurado y entregado con nuestro packaging exclusivo.',
    offset: 0,
  },
  {
    icon: RefreshCw,
    title: 'Devoluciones 30 Días',
    desc: '¿No estás completamente enamorado? Devuélvelo sin preguntas. Tu satisfacción es innegociable.',
    offset: 60,
  },
]

export default function Benefits() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section style={{ padding: '130px 72px', background: 'var(--white)' }}>
      <div ref={ref}>
        {/* Header */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 88, alignItems: 'end' }}>
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
              Por qué VELOURA
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
              Diferente<br />
              <em style={{ fontStyle: 'italic' }}>Por Diseño</em>
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
            Nos obsesionamos con cada detalle para que tú no tengas que hacerlo. Desde el origen de los materiales hasta el momento en que tu pedido llega a tu puerta, el estándar es absoluto.
          </motion.p>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 28, alignItems: 'start' }}>
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

      <style>{`
        @media (max-width: 900px) {
          section { padding: 80px 32px !important; }
          section > div > div:first-child { grid-template-columns: 1fr !important; }
          section > div > div:last-child { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          section > div > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

