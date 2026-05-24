import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const smoothScrollTo = (targetY, duration = 1100) => {
  const startY = window.scrollY
  const distance = targetY - startY
  const start = performance.now()
  const ease = t => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3) / 2
  const step = (now) => {
    const p = Math.min((now - start) / duration, 1)
    window.scrollTo(0, startY + distance * ease(p))
    if (p < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } },
}
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.5 } },
}

export default function Hero() {
  const ref = useRef(null)
  const [ripple, setRipple] = useState(false)

  const handleShopClick = () => {
    setRipple(true)
    setTimeout(() => {
      setRipple(false)
      const el = document.getElementById('shop')
      if (el) smoothScrollTo(el.getBoundingClientRect().top + window.scrollY - 40)
    }, 420)
  }

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const imageY     = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const textY      = useTransform(scrollYProgress, [0, 1], ['0%', '28%'])
  const opacity    = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section ref={ref} className="hero-section" style={{ position: 'relative', height: '100vh', minHeight: 520, overflow: 'hidden' }}>

      {/* Imagen con parallax */}
      <motion.div
        style={{ position: 'absolute', inset: 0, scale: imageScale, y: imageY, transformOrigin: 'center center' }}
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src="/imagenes/chicoenbarca.png"
          alt="VELHOURA Eyewear"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
        />
      </motion.div>

      {/* Overlay principal */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(160deg, rgba(6,13,26,0.55) 0%, rgba(6,13,26,0.25) 45%, rgba(6,13,26,0.7) 100%)',
      }} />

      {/* Contenido */}
      <motion.div
        style={{
          position: 'relative', height: '100%',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          textAlign: 'center',
          padding: '116px 24px 24px',
          y: textY, opacity,
        }}
      >
        <motion.div variants={stagger} initial="hidden" animate="show">

          {/* Etiqueta */}
          <motion.span
            variants={fadeUp}
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-body)', fontSize: 11,
              fontWeight: 600, letterSpacing: '0.28em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.55)', marginBottom: 24,
            }}
          >
            New Collection · Spring / Summer 2025
          </motion.span>

          {/* Titular */}
          <motion.h1
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(42px, 7.5vw, 110px)',
              fontWeight: 700,
              lineHeight: 0.9,
              letterSpacing: '-0.03em',
              color: '#fff',
              marginBottom: 36,
            }}
          >
            VELHOURA<br />
            <em style={{ fontStyle: 'italic' }}>sunglasses</em>
          </motion.h1>

          {/* Prueba social */}
          <motion.div
            variants={fadeUp}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 36 }}
          >
            <div style={{ display: 'flex' }}>
              {['#f4c430','#f4c430','#f4c430','#f4c430','#f4c430'].map((c, i) => (
                <span key={i} style={{ color: c, fontSize: 14, marginRight: 1 }}>★</span>
              ))}
            </div>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.04em' }}>
              4.9 · <strong style={{ color: 'rgba(255,255,255,0.9)' }}>+8,400 happy</strong> customers
            </span>
          </motion.div>

          {/* CTA */}
          <motion.div variants={fadeUp}>
            <motion.button
              onClick={handleShopClick}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 340, damping: 22 }}
              style={{
                position: 'relative', overflow: 'hidden',
                display: 'inline-flex', alignItems: 'center', gap: 12,
                padding: '17px 40px',
                background: '#fff', color: 'var(--navy)',
                fontSize: 11, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase',
                borderRadius: 100, cursor: 'pointer',
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
              }}
            >
              <AnimatePresence>
                {ripple && (
                  <motion.span
                    key="ripple"
                    initial={{ scale: 0, opacity: 0.5 }}
                    animate={{ scale: 12, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.65, ease: 'easeOut' }}
                    style={{ position: 'absolute', width: 36, height: 36, borderRadius: '50%', background: 'var(--blue)', pointerEvents: 'none' }}
                  />
                )}
              </AnimatePresence>
              Shop Now
              <motion.span animate={{ x: ripple ? 6 : 0 }} transition={{ duration: 0.3 }} style={{ display: 'flex', alignItems: 'center' }}>
                <ArrowRight size={14} />
              </motion.span>
            </motion.button>
          </motion.div>

        </motion.div>
      </motion.div>


    </section>
  )
}
