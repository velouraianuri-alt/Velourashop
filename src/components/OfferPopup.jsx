import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, Tag } from 'lucide-react'

const SHOW_DELAY = 10000
const AUTO_CLOSE_SECONDS = 30

export default function OfferPopup() {
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [countdown, setCountdown] = useState(AUTO_CLOSE_SECONDS)

  useEffect(() => {
    const alreadySeen = sessionStorage.getItem('VELHOURA_offer_seen')
    if (alreadySeen) return
    const showTimer = setTimeout(() => {
      setVisible(true)
      sessionStorage.setItem('VELHOURA_offer_seen', '1')
    }, SHOW_DELAY)
    return () => clearTimeout(showTimer)
  }, [])

  useEffect(() => {
    if (!visible || submitted) return
    const interval = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) { clearInterval(interval); setVisible(false); return 0 }
        return c - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [visible, submitted])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  const close = () => setVisible(false)

  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            style={{ position: 'fixed', inset: 0, background: 'rgba(6,13,26,0.65)', zIndex: 9998, backdropFilter: 'blur(6px)' }}
          />

          <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', pointerEvents: 'none' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="offer-popup-inner"
              style={{ background: 'var(--white)', borderRadius: 16, width: '100%', maxWidth: 820, overflow: 'hidden', display: 'grid', gridTemplateColumns: '1fr 1fr', boxShadow: '0 40px 120px rgba(0,0,0,0.5)', pointerEvents: 'all', maxHeight: '90vh', overflowY: 'auto' }}
            >
              {/* Izquierda — imagen (oculta en móvil) */}
              <div className="offer-popup-image" style={{ position: 'relative', minHeight: 480, overflow: 'hidden' }}>
                <img
                  src="/imagenes/imagenchico.png"
                  alt="VELHOURA Eyewear Oferta"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(6,13,26,0.1) 0%, rgba(6,13,26,0.7) 100%)' }} />
                <div style={{ position: 'absolute', top: 24, left: 24, background: 'var(--blue)', color: 'var(--white)', padding: '8px 16px', borderRadius: 6, display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 700, letterSpacing: '0.08em' }}>
                  <Tag size={14} /> OFERTA EXCLUSIVA
                </div>
                <div style={{ position: 'absolute', bottom: 28, left: 24, right: 24 }}>
                  <div style={{ fontSize: 52, fontWeight: 800, color: 'var(--white)', lineHeight: 1, marginBottom: 8 }}>
                    -10%
                  </div>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>
                    En tu primera compra.<br />Solo por tiempo limitado.
                  </p>
                </div>
              </div>

              {/* Derecha — formulario */}
              <div className="offer-popup-form" style={{ background: 'var(--white)', padding: '48px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
                <button
                  onClick={close}
                  style={{ position: 'absolute', top: 16, right: 16, width: 36, height: 36, borderRadius: '50%', background: 'var(--gray-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s', zIndex: 10 }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--gray-200)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'var(--gray-100)'}
                >
                  <X size={16} />
                </button>

                {!submitted && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 28 }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', border: '3px solid var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: 'var(--blue)', flexShrink: 0 }}>
                      {countdown}
                    </div>
                    <span style={{ fontSize: 12, color: 'var(--gray-400)', lineHeight: 1.4 }}>
                      Esta oferta expira en <strong>{countdown}</strong> segundos
                    </span>
                  </div>
                )}

                {submitted ? (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center' }}>
                    <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 28, color: 'white' }}>✓</div>
                    <h3 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12, color: 'var(--black)' }}>¡Ya eres parte de VELHOURA!</h3>
                    <p style={{ fontSize: 15, color: 'var(--gray-600)', marginBottom: 20, lineHeight: 1.6 }}>
                      Tu código del 10% ha sido enviado a <strong>{email}</strong>.
                    </p>
                    <div style={{ background: 'var(--gray-100)', padding: '14px 20px', borderRadius: 8, fontSize: 24, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--blue)', border: '2px dashed var(--blue)' }}>
                      VELHOURA10
                    </div>
                    <p style={{ fontSize: 12, color: 'var(--gray-400)', marginTop: 10 }}>Úsalo en el carrito al finalizar la compra</p>
                  </motion.div>
                ) : (
                  <>
                    <span style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: 14 }}>
                      Solo para nuevos clientes
                    </span>
                    <h2 style={{ fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 700, lineHeight: 1.05, color: 'var(--black)', marginBottom: 16 }}>
                      Únete a VELHOURA.<br />
                      <em style={{ fontStyle: 'italic', color: 'var(--blue)' }}>Ve diferente.</em>
                    </h2>
                    <p style={{ fontSize: 14, color: 'var(--gray-600)', lineHeight: 1.7, marginBottom: 28 }}>
                      Suscríbete y obtén un <strong>10% de descuento</strong> en tu primera compra, acceso anticipado a nuevas colecciones y ofertas exclusivas.
                    </p>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      <input
                        type="email"
                        placeholder="tu@email.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        style={{ width: '100%', padding: '15px 18px', border: '1.5px solid var(--gray-200)', borderRadius: 8, fontFamily: 'var(--font-body)', fontSize: 14, outline: 'none', transition: 'border-color 0.2s' }}
                        onFocus={e => e.target.style.borderColor = 'var(--blue)'}
                        onBlur={e => e.target.style.borderColor = 'var(--gray-200)'}
                      />
                      <button
                        type="submit"
                        style={{ width: '100%', padding: '16px', background: 'var(--blue)', color: 'var(--white)', fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'background 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'var(--blue-mid)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'var(--blue)'}
                      >
                        Obtener mi -10% <ArrowRight size={15} />
                      </button>
                    </form>
                    <button
                      onClick={close}
                      style={{ marginTop: 16, fontSize: 12, color: 'var(--gray-400)', textDecoration: 'underline', background: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--black)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--gray-400)'}
                    >
                      No, gracias — prefiero pagar el precio completo
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
      <style>{`
        @media (max-width: 600px) {
          .offer-popup-inner {
            grid-template-columns: 1fr !important;
            max-height: 88vh !important;
            border-radius: 12px !important;
          }
          .offer-popup-image { display: none !important; }
          .offer-popup-form { padding: 48px 24px 32px !important; }
        }
      `}</style>
    </AnimatePresence>
  )
}
