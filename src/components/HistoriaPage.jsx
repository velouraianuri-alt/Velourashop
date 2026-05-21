import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowLeft, ShoppingBag, MapPin, Calendar, Zap, Heart } from 'lucide-react'
import Footer from './Footer'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
}
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
}

function AnimBlock({ children, delay = 0, style }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 44 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay }}
      style={style}
    >
      {children}
    </motion.div>
  )
}

const milestones = [
  { year: '2023', icon: Zap,      title: 'La chispa',        desc: 'Todo empezó en una tarde de lluvia en Barcelona. Dos amigos, un portátil y una idea que no nos dejaba dormir.' },
  { year: '2024', icon: Heart,    title: 'El proyecto nace', desc: 'Diseñamos los primeros modelos a mano. Cientos de bocetos, noches largas y mucho café con leche del bar de abajo.' },
  { year: '2025', icon: MapPin,   title: 'VELOURA al mundo', desc: 'Lanzamos la marca desde Barcelona con un objetivo claro: gafas de calidad premium al alcance de nuestra generación.' },
]

export default function HistoriaPage({ onClose, onOpenCart, cartItems = [] }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0)

  return (
    <motion.div
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '100%' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{ position: 'fixed', top: 116, left: 0, right: 0, bottom: 0, background: 'var(--white)', zIndex: 200, overflowY: 'auto' }}
    >
      {/* Hero */}
      <div style={{ position: 'relative', height: '92vh', overflow: 'hidden', background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src="/imagenes/gafitas.png" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%', opacity: 0.35 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(6,13,26,0.3) 0%, rgba(6,13,26,0.7) 100%)' }} />
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          style={{ position: 'relative', textAlign: 'center', padding: '0 32px', maxWidth: 800 }}
        >
          <motion.span
            variants={fadeUp}
            style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--blue-bright)', marginBottom: 24 }}
          >
            Fundada en Barcelona · 2024
          </motion.span>
          <motion.h1
            variants={fadeUp}
            style={{ fontSize: 'clamp(52px, 8vw, 110px)', fontWeight: 800, color: '#fff', lineHeight: 0.92, letterSpacing: '-0.03em', marginBottom: 32 }}
          >
            Dos chicos.<br /><em style={{ fontStyle: 'italic', color: 'var(--blue-bright)' }}>Una visión.</em>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            style={{ fontSize: 18, fontWeight: 300, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, maxWidth: 520, margin: '0 auto' }}
          >
            Nacimos en Barcelona con 20 años, una pasión por el diseño y las ganas de demostrar que la edad no pone límites a los sueños grandes.
          </motion.p>
        </motion.div>

        {/* Scroll line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)' }}
        >
          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            style={{ width: 1, height: 52, background: 'linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)', margin: '0 auto' }}
          />
        </motion.div>
      </div>

      {/* Intro */}
      <div style={{ background: 'var(--white)', padding: '120px 72px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px 80px', alignItems: 'center' }}>
          <AnimBlock>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--blue)', display: 'block', marginBottom: 20 }}>Nuestra historia</span>
            <h2 style={{ fontSize: 'clamp(36px, 4vw, 58px)', fontWeight: 800, color: 'var(--black)', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 28 }}>
              No éramos expertos.<br /><em style={{ fontStyle: 'italic' }}>Éramos atrevidos.</em>
            </h2>
            <p style={{ fontSize: 16, color: 'var(--gray-600)', lineHeight: 1.85, marginBottom: 20 }}>
              Somos Oriol y un compañero, dos chicos de Barcelona con 20 años que un día decidimos que queríamos crear algo propio. Algo que fuera nuestro de verdad.
            </p>
            <p style={{ fontSize: 16, color: 'var(--gray-600)', lineHeight: 1.85 }}>
              VELOURA nació de nuestra obsesión por el diseño, la moda y el detalle. Nos dimos cuenta de que las marcas premium estaban fuera del alcance de nuestra generación, y quisimos cambiar eso.
            </p>
          </AnimBlock>

          <AnimBlock delay={0.15}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              {[
                { num: '20', label: 'Años que tenemos' },
                { num: 'BCN', label: 'Ciudad de origen' },
                { num: '2024', label: 'Año de fundación' },
                { num: '∞', label: 'Ganas de crecer' },
              ].map(({ num, label }) => (
                <div key={label} style={{ background: 'var(--gray-100)', borderRadius: 16, padding: '32px 24px', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 44, fontWeight: 800, color: 'var(--navy)', lineHeight: 1, marginBottom: 8 }}>{num}</div>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gray-400)' }}>{label}</div>
                </div>
              ))}
            </div>
          </AnimBlock>
        </div>
      </div>

      {/* Dark section — manifesto */}
      <div style={{ background: 'var(--navy)', padding: '120px 72px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -120, right: -120, width: 500, height: 500, borderRadius: '50%', background: 'rgba(59,130,246,0.06)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -80, left: -80, width: 340, height: 340, borderRadius: '50%', background: 'rgba(59,130,246,0.05)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <AnimBlock>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--blue-bright)', display: 'block', marginBottom: 24 }}>Nuestro manifiesto</span>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 72px)', fontWeight: 800, color: '#fff', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 36 }}>
              "Las mejores marcas<br />no se heredan.<br /><em style={{ fontStyle: 'italic', color: 'var(--blue-bright)' }}>Se construyen."</em>
            </h2>
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, maxWidth: 580, margin: '0 auto' }}>
              Empezamos sin inversores, sin oficina y sin manual de instrucciones. Solo con una laptop, mucho diseño y la certeza de que podíamos hacerlo bien.
            </p>
          </AnimBlock>
        </div>
      </div>

      {/* Timeline */}
      <div style={{ background: 'var(--white)', padding: '120px 72px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <AnimBlock style={{ textAlign: 'center', marginBottom: 80 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--blue)', display: 'block', marginBottom: 16 }}>El camino</span>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, color: 'var(--black)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
              Cómo llegamos hasta aquí
            </h2>
          </AnimBlock>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {milestones.map(({ year, icon: Icon, title, desc }, i) => (
              <AnimBlock key={year} delay={i * 0.1}>
                <div style={{ display: 'grid', gridTemplateColumns: '120px 1px 1fr', gap: '0 40px', alignItems: 'start', paddingBottom: i < milestones.length - 1 ? 64 : 0 }}>
                  {/* Year */}
                  <div style={{ textAlign: 'right', paddingTop: 4 }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800, color: 'var(--blue)', letterSpacing: '-0.02em' }}>{year}</span>
                  </div>
                  {/* Line + dot */}
                  <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--blue)', flexShrink: 0, marginTop: 8, zIndex: 1 }} />
                    {i < milestones.length - 1 && (
                      <div style={{ width: 1, flex: 1, background: 'var(--gray-200)', marginTop: 8 }} />
                    )}
                  </div>
                  {/* Content */}
                  <div style={{ paddingBottom: i < milestones.length - 1 ? 0 : 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--gray-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon size={16} color="var(--blue)" />
                      </div>
                      <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--black)' }}>{title}</h3>
                    </div>
                    <p style={{ fontSize: 15, color: 'var(--gray-600)', lineHeight: 1.8 }}>{desc}</p>
                  </div>
                </div>
              </AnimBlock>
            ))}
          </div>
        </div>
      </div>

      {/* Values */}
      <div style={{ background: 'var(--gray-100)', padding: '120px 72px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <AnimBlock style={{ marginBottom: 72 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--blue)', display: 'block', marginBottom: 16 }}>Lo que nos mueve</span>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, color: 'var(--black)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
              Nuestros valores
            </h2>
          </AnimBlock>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { title: 'Diseño ante todo', desc: 'Cada modelo pasa por cientos de iteraciones antes de llegar a tus manos. No lanzamos nada que no nos enamore primero a nosotros.' },
              { title: 'Accesibilidad real', desc: 'Premium no tiene que significar inalcanzable. Queremos que nuestra generación pueda vestir bien sin arruinarse.' },
              { title: 'Autenticidad total', desc: 'Somos dos tíos jóvenes haciendo lo que nos apasiona. Sin grandes corporaciones detrás. Solo trabajo, diseño y honestidad.' },
            ].map(({ title, desc }, i) => (
              <AnimBlock key={title} delay={i * 0.1}>
                <div style={{ background: 'var(--white)', borderRadius: 20, padding: '40px 32px', height: '100%' }}>
                  <div style={{ width: 44, height: 4, background: 'var(--blue)', borderRadius: 2, marginBottom: 24 }} />
                  <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--black)', marginBottom: 14, lineHeight: 1.2 }}>{title}</h3>
                  <p style={{ fontSize: 14, color: 'var(--gray-600)', lineHeight: 1.8 }}>{desc}</p>
                </div>
              </AnimBlock>
            ))}
          </div>
        </div>
      </div>

      {/* Closing CTA */}
      <div style={{ background: 'var(--navy)', padding: '100px 72px', textAlign: 'center' }}>
        <AnimBlock>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--blue-bright)', marginBottom: 20 }}>Únete a VELOURA</p>
          <h2 style={{ fontSize: 'clamp(36px, 5vw, 68px)', fontWeight: 800, color: '#fff', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 20 }}>
            Esta historia<br /><em style={{ fontStyle: 'italic', color: 'var(--blue-bright)' }}>la escribimos juntos.</em>
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', maxWidth: 480, margin: '0 auto 44px', lineHeight: 1.7 }}>
            Cuando llevas VELOURA, formas parte de algo más que una marca. Formas parte de la historia de dos jóvenes que se atrevieron.
          </p>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={onClose}
            style={{ padding: '18px 52px', background: 'var(--white)', color: 'var(--navy)', fontSize: 12, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', borderRadius: 100, cursor: 'pointer', boxShadow: '0 8px 32px rgba(0,0,0,0.25)' }}
          >
            Ver la colección
          </motion.button>
        </AnimBlock>
      </div>

      <Footer />

      <style>{`
        @media (max-width: 900px) {
          .historia-intro-grid { grid-template-columns: 1fr !important; }
          .historia-values-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .historia-padding { padding: 72px 24px !important; }
        }
      `}</style>
    </motion.div>
  )
}
