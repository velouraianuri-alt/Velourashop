import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Copy, Check } from 'lucide-react'

const GlassesIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6.5" cy="13.5" r="3.5"/>
    <circle cx="17.5" cy="13.5" r="3.5"/>
    <path d="M3 13.5C3 11 4 9 6.5 9"/>
    <path d="M21 13.5C21 11 20 9 17.5 9"/>
    <path d="M10 13.5h4"/>
    <path d="M6.5 9h11"/>
  </svg>
)

export default function FloatingOffer() {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText('VELOURA10')
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  return (
    <div className="floating-offer" style={{ position: 'fixed', bottom: 32, left: 32, zIndex: 450 }}>
      <AnimatePresence mode="wait">
        {!open ? (
          <motion.button
            key="pill"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="floating-offer-pill"
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '13px 20px',
              background: 'var(--navy)',
              color: '#fff',
              borderRadius: 100,
              fontSize: 12, fontWeight: 700, letterSpacing: '0.04em',
              boxShadow: '0 8px 32px rgba(6,13,26,0.35)',
              cursor: 'pointer',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <span style={{ color: '#93c5fd', display: 'flex' }}><GlassesIcon /></span>
            <span>−10% en tu primera compra</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
              style={{ fontSize: 14 }}
            >
              →
            </motion.span>
          </motion.button>
        ) : (
          <motion.div
            key="card"
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="floating-offer-card"
            style={{
              width: 300,
              maxWidth: '92vw',
              background: '#fff',
              borderRadius: 20,
              overflow: 'hidden',
              boxShadow: '0 24px 64px rgba(6,13,26,0.22)',
              border: '1px solid rgba(0,0,0,0.06)',
            }}
          >
            {/* Header */}
            <div style={{ background: 'var(--navy)', padding: '22px 22px 18px', position: 'relative' }}>
              <button
                onClick={() => setOpen(false)}
                style={{ position: 'absolute', top: 12, right: 12, color: 'rgba(255,255,255,0.4)', padding: 4, transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
              >
                <X size={15} />
              </button>
              <div style={{ color: '#93c5fd', marginBottom: 10, display: 'flex' }}><GlassesIcon /></div>
              <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: 4 }}>Oferta exclusiva</p>
              <h3 style={{ fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}>
                10% de descuento
              </h3>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>En tu primera compra en VELOURA</p>
            </div>

            {/* Body */}
            <div style={{ padding: '20px 22px 22px' }}>
              <p style={{ fontSize: 12, color: '#6b7280', marginBottom: 16, lineHeight: 1.6 }}>
                Usa este código al finalizar tu compra y disfruta de un <strong style={{ color: 'var(--navy)' }}>10% de descuento</strong> en todos nuestros modelos.
              </p>

              {/* Código */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <div style={{
                  flex: 1, padding: '12px 16px',
                  background: '#f8fafc', border: '1.5px dashed #cbd5e1',
                  borderRadius: 10, fontFamily: 'monospace', fontSize: 16,
                  fontWeight: 800, letterSpacing: '0.18em', color: 'var(--navy)',
                  textAlign: 'center',
                }}>
                  VELOURA10
                </div>
                <motion.button
                  whileTap={{ scale: 0.93 }}
                  onClick={handleCopy}
                  style={{
                    padding: '12px 14px', borderRadius: 10,
                    background: copied ? '#dcfce7' : 'var(--navy)',
                    color: copied ? '#16a34a' : '#fff',
                    fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6,
                    transition: 'background 0.3s, color 0.3s', cursor: 'pointer', whiteSpace: 'nowrap',
                  }}
                >
                  {copied ? <><Check size={13} /> Copiado</> : <><Copy size={13} /> Copiar</>}
                </motion.button>
              </div>

              <p style={{ fontSize: 10, color: '#9ca3af', textAlign: 'center', letterSpacing: '0.04em' }}>
                Válido durante 48h · No acumulable con otras ofertas
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
