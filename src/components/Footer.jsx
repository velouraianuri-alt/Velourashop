import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'

const IconInstagram = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)
const IconTikTok = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.93a8.26 8.26 0 0 0 4.83 1.54V7a4.85 4.85 0 0 1-1.06-.31z"/>
  </svg>
)

export default function Footer() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) { setSubscribed(true); setEmail('') }
  }

  return (
    <footer ref={ref} style={{ background: 'var(--navy)', color: 'var(--white)', padding: '96px 72px 48px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 80 }}>
        {/* Brand col */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 44,
            fontWeight: 700,
            marginBottom: 16,
            letterSpacing: '-0.02em',
            color: 'var(--white)',
          }}>
            VELOURA
          </h2>
          <p style={{
            fontSize: 14,
            color: 'rgba(255,255,255,0.4)',
            lineHeight: 1.75,
            maxWidth: 280,
            marginBottom: 36,
          }}>
            Eyewear de alto diseño en la intersección del arte, la cultura y la calle. Cada gafa cuenta una historia.
          </p>

          {/* Newsletter */}
          <p style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.45)',
            marginBottom: 14,
          }}>
            Únete a la Lista Exclusiva
          </p>
          {subscribed ? (
            <p style={{ color: 'var(--blue-bright)', fontSize: 14, fontWeight: 600 }}>¡Perfecto! Estate atento a tu correo.</p>
          ) : (
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: 0 }}>
              <input
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRight: 'none',
                  borderRadius: '4px 0 0 4px',
                  color: 'var(--white)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 13,
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '12px 16px',
                  background: 'var(--blue)',
                  color: 'var(--white)',
                  borderRadius: '0 4px 4px 0',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--blue-mid)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--blue)'}
              >
                <ArrowRight size={16} />
              </button>
            </form>
          )}
        </motion.div>

        {/* Links cols */}
        {[
          { title: 'Tienda', links: ['Novedades', 'Más Vendidos', 'Colecciones', 'Ediciones Limitadas', 'Outlet'] },
          { title: 'Ayuda', links: ['Guía de Tallas', 'Información de Envío', 'Devoluciones', 'Seguir Pedido', 'FAQ'] },
          { title: 'Empresa', links: ['Sobre Nosotros', 'Sostenibilidad', 'Trabaja con Nosotros', 'Prensa', 'Contacto'] },
        ].map((col, i) => (
          <motion.div
            key={col.title}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 + i * 0.08 }}
          >
            <p style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.35)',
              marginBottom: 20,
            }}>
              {col.title}
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {col.links.map(link => (
                <li key={link}>
                  <a
                    href="#"
                    style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--white)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Bottom bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 32,
        borderTop: '1px solid rgba(255,255,255,0.07)',
        flexWrap: 'wrap',
        gap: 16,
      }}>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.28)' }}>
          © 2025 VELOURA Eyewear. Todos los derechos reservados.
        </p>
        <div style={{ display: 'flex', gap: 18 }}>
          {[IconInstagram, IconTikTok].map((Icon, i) => (
            <a
              key={i}
              href="#"
              style={{ color: 'rgba(255,255,255,0.35)', transition: 'color 0.2s', display: 'flex' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--blue-bright)'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
            >
              <Icon />
            </a>
          ))}
        </div>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.28)' }}>
          Pagos seguros · Privacidad · Términos
        </p>
      </div>

      <style>{`
        @media (max-width: 900px) {
          footer > div:first-child { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          footer { padding: 64px 24px 40px !important; }
          footer > div:first-child { grid-template-columns: 1fr !important; }
          footer > div:last-child { flex-direction: column !important; gap: 16px !important; text-align: center !important; }
        }
      `}</style>
    </footer>
  )
}

