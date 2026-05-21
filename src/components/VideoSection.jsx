import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'

export default function VideoSection() {
  const ref = useRef(null)
  const videoRef = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [muted, setMuted] = useState(true)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1])
  const textY = useTransform(scrollYProgress, [0, 0.5], [40, 0])

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted
      setMuted(v => !v)
    }
  }

  return (
    <section
      ref={ref}
      style={{ padding: '130px 72px', background: 'var(--navy)', overflow: 'hidden' }}
    >
      {/* Header */}
      <motion.div
        style={{ textAlign: 'center', marginBottom: 60, y: textY }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <span style={{
          display: 'block',
          fontFamily: 'var(--font-body)',
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: 'var(--blue-bright)',
          marginBottom: 16,
        }}>
          Detrás del Diseño
        </span>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(40px, 5vw, 72px)',
          fontWeight: 700,
          lineHeight: 0.93,
          letterSpacing: '-0.025em',
          color: 'var(--white)',
        }}>
          Creado para los que{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--blue-bright)' }}>ven diferente</em>
        </h2>
      </motion.div>

      {/* Video */}
      <motion.div style={{ scale, transformOrigin: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.9 }}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: 1040,
            margin: '0 auto',
            aspectRatio: '16/9',
            borderRadius: 8,
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          >
            <source src="/imagenes/videogafas.mp4" type="video/mp4" />
          </video>

          {/* Mute/unmute button */}
          <button
            onClick={toggleMute}
            style={{
              position: 'absolute',
              bottom: 20,
              right: 20,
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: 'rgba(6,13,26,0.7)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--white)',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--blue)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(6,13,26,0.7)'}
          >
            {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>

        </motion.div>
      </motion.div>

      {/* CTA below video */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.55, duration: 0.8 }}
        style={{ textAlign: 'center', marginTop: 52 }}
      >
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 15,
          color: 'rgba(255,255,255,0.5)',
          marginBottom: 28,
          maxWidth: 520,
          margin: '0 auto 28px',
          lineHeight: 1.7,
        }}>
          Cada diseño empieza con una historia. Descubre cómo llevamos cada modelo del concepto a la realidad.
        </p>
        <button
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            padding: '14px 38px',
            border: '1.5px solid rgba(255,255,255,0.25)',
            color: 'var(--white)',
            borderRadius: 4,
            transition: 'border-color 0.2s, background 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--blue)'; e.currentTarget.style.background = 'var(--blue)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.background = 'transparent' }}
        >
          Explorar el Proceso
        </button>
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          section { padding: 80px 24px !important; }
        }
      `}</style>
    </section>
  )
}
