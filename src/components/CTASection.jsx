import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Check, X } from 'lucide-react'

export default function CTASection({ onShopClick }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section
      ref={ref}
      className="cta-section"
      style={{
        padding: '150px 72px',
        background: 'var(--navy)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated blue gradient background */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          y: bgY,
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(27,79,204,0.25) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Decorative large text */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        pointerEvents: 'none',
        userSelect: 'none',
      }}>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(120px, 22vw, 300px)',
          fontWeight: 700,
          color: 'rgba(255,255,255,0.025)',
          letterSpacing: '-0.04em',
          lineHeight: 1,
          whiteSpace: 'nowrap',
        }}>
          VELOURA
        </span>
      </div>

      <div style={{ position: 'relative', maxWidth: 1000, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          style={{ marginBottom: 64, textAlign: 'center' }}
        >
          <span style={{
            display: 'inline-block',
            fontFamily: 'var(--font-body)',
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'var(--blue-bright)',
            marginBottom: 20,
          }}>
            Comparativa Premium
          </span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(48px, 6.5vw, 92px)',
            fontWeight: 800,
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            color: 'var(--white)',
          }}>
            ¿Por qué elegir<br /><em style={{ fontStyle: 'italic', color: 'var(--blue)' }}>VELOURA?</em>
          </h2>
        </motion.div>

        {/* Tabla Comparativa */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15 }}
          style={{
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(62,82,74,0.4)',
            borderRadius: 12,
            overflow: 'hidden',
            marginBottom: 52,
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15, tableLayout: 'auto' }}>
            <thead>
              <tr>
                <th style={{ padding: '28px 32px', textAlign: 'left', fontWeight: 600, color: 'rgba(255,255,255,0.5)', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>Feature</th>
                <th style={{ padding: '28px 32px', textAlign: 'center', fontWeight: 700, color: 'var(--blue)', fontSize: 14, letterSpacing: '0.06em', textTransform: 'uppercase', borderBottom: '1px solid rgba(62,82,74,0.6)', background: 'rgba(62,82,74,0.2)' }}>VELOURA</th>
                <th style={{ padding: '28px 32px', textAlign: 'center', fontWeight: 600, color: 'rgba(255,255,255,0.5)', fontSize: 13, letterSpacing: '0.06em', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>Standard Brand</th>
              </tr>
            </thead>
            <tbody>
              {[
                'Diseño Premium',
                'Calidad UV400',
                'Materiales Sostenibles',
                'Garantía de por vida',
                'Servicio al Cliente Premium',
                'Envío Express Gratis',
                'Devoluciones 30 días',
                'Colecciones Limitadas',
              ].map((feature, i) => (
                <motion.tr
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.25 + i * 0.05 }}
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                >
                  <td style={{ padding: '22px 32px', color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>{feature}</td>
                  <td style={{ padding: '22px 32px', textAlign: 'center', background: 'rgba(62,82,74,0.15)' }}>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : {}}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
                      style={{ display: 'inline-flex' }}
                    >
                      <Check size={20} color="#4ade80" strokeWidth={3} />
                    </motion.div>
                  </td>
                  <td style={{ padding: '22px 32px', textAlign: 'center', color: 'rgba(255,255,255,0.3)' }}>
                    {i % 3 !== 0 && (
                      <motion.div
                        initial={{ scale: 0, rotate: 45 }}
                        animate={inView ? { scale: 1, rotate: 0 } : {}}
                        transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
                        style={{ display: 'inline-flex' }}
                      >
                        <X size={20} color="#ef4444" strokeWidth={3} />
                      </motion.div>
                    )}
                    {i % 3 === 0 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={inView ? { scale: 1 } : {}}
                        transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
                        style={{ display: 'inline-flex', opacity: 0.4 }}
                      >
                        <Check size={20} color="#888888" strokeWidth={3} />
                      </motion.div>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          style={{ textAlign: 'center' }}
        >
          <button
            onClick={onShopClick}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              padding: '18px 48px',
              background: 'var(--blue)',
              color: 'var(--white)',
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              borderRadius: 4,
              cursor: 'pointer',
              border: 'none',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(62,82,74,0.4)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
          >
            Descubre VELOURA <ArrowRight size={16} />
          </button>
        </motion.div>
      </div>
    </section>
  )
}

