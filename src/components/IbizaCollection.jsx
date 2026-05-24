import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ShoppingBag, MapPin, Wind } from 'lucide-react'
import Footer from './Footer'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
}

export default function IbizaCollection({ onClose, onOpenCart, cartItems = [] }) {
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
      {/* Hero / Portada */}
      <div className="ibiza-hero" style={{ position: 'relative', height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img
          src="/imagenes/camisa.png"
          alt="Ibiza Collection - Limited Summer Collection"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(62,82,74,0.15) 0%, rgba(6,13,26,0.3) 100%)' }} />

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          style={{ position: 'relative', textAlign: 'center', padding: '0 32px', maxWidth: 900 }}
        >

          <motion.h1
            variants={fadeUp}
            style={{ fontSize: 'clamp(54px, 13vw, 140px)', fontWeight: 900, color: '#fff', lineHeight: 0.9, letterSpacing: '-0.04em', marginBottom: 24 }}
          >
            Ibiza<br /><span style={{ fontStyle: 'normal', fontWeight: 900, color: '#fff' }}>Collection.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            style={{ fontSize: 16, fontWeight: 300, color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, maxWidth: 620, margin: '0 auto 40px' }}
          >
            Diseñada para capturar la esencia del Mediterráneo. Cada gafa, una historia de lujo, libertad y ese sentimiento indescriptible de verano eterno.
          </motion.p>

          <motion.div variants={fadeUp} className="ibiza-hero-info" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 40, fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <MapPin size={16} /> Ibiza, Balearic Islands
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Wind size={16} /> Próximamente
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Coming Soon Section */}
      <div className="ibiza-content" style={{ padding: '100px 48px', background: 'var(--white)', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ maxWidth: 700 }}
        >
          <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: 24 }}>
            Exclusiva VELHOURA
          </span>
          <h2 style={{ fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: 800, color: 'var(--black)', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 28 }}>
            Los mejores<br />diseños del verano
          </h2>
          <p style={{ fontSize: 16, fontWeight: 400, color: 'var(--gray-600)', lineHeight: 1.8, marginBottom: 48 }}>
            Estamos creando algo especial. Una colección que captura la esencia del Mediterráneo con cada detalle cuidado al máximo. Las mejores gafas para los mejores momentos.
          </p>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={onClose}
              style={{
                padding: '16px 48px',
                background: 'var(--blue)',
                color: '#fff',
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                borderRadius: 4,
                cursor: 'pointer',
                transition: 'all 0.3s',
                border: 'none',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#4a6058'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'var(--blue)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              Volver a Tienda
            </button>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="ibiza-features"
          style={{ marginTop: 120, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 48, width: '100%', maxWidth: 900 }}
        >
          {[
            { label: 'Premium Design', desc: 'Cada detalle cuenta' },
            { label: 'Limited Edition', desc: 'Solo disponible este verano' },
            { label: 'Craftsmanship', desc: 'Hecho con precisión' },
          ].map((item, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: 8 }}>
                {item.label}
              </div>
              <p style={{ fontSize: 14, color: 'var(--gray-600)' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      <Footer />
    </motion.div>
  )
}
