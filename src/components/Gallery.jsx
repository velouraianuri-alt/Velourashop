import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView, useMotionValue, animate as motionAnimate } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const BASE_ITEMS = [
  { id: 1, label: 'Urban Soul',    sub: 'Primavera 2025',   img: '/imagenes/imagenchico.png' },
  { id: 2, label: 'En Movimiento', sub: 'Verano 2025',      img: '/imagenes/imagencaminando.png' },
  { id: 3, label: 'Golden Hour',   sub: 'Edición Especial', img: '/imagenes/chicorolex.jpg' },
  { id: 4, label: 'Coastal Light', sub: 'Colección Mar',    img: '/imagenes/rubia.png' },
  { id: 5, label: 'The Bold Look', sub: 'Drop Exclusivo',   img: '/imagenes/Imagenchica.png' },
  { id: 6, label: 'Wave Rider',    sub: 'Summer Drop',      img: '/imagenes/surfero.png' },
  { id: 7, label: 'Gafitas',       sub: 'Colección Premium', img: '/imagenes/gafitas.png' },
]

const N     = BASE_ITEMS.length
const CARD_W = 480
const GAP    = 28
const STEP   = CARD_W + GAP

// Triple-clone for seamless infinite loop
const ITEMS = [
  ...BASE_ITEMS.map((it, i) => ({ ...it, uid: `a${i}`, realIdx: i })),
  ...BASE_ITEMS.map((it, i) => ({ ...it, uid: `b${i}`, realIdx: i })),
  ...BASE_ITEMS.map((it, i) => ({ ...it, uid: `c${i}`, realIdx: i })),
]

/* ─── Single card with scroll-driven y parallax ─────────────── */
function GalleryCard({ item }) {
  const ref  = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y    = useTransform(
    scrollYProgress, [0, 1],
    [item.realIdx % 2 === 0 ? 55 : -55, item.realIdx % 2 === 0 ? -55 : 55]
  )
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      style={{ flexShrink: 0, width: CARD_W, y }}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    >
      <div
        style={{ width: '100%', height: 520, borderRadius: 6, marginBottom: 20, position: 'relative', overflow: 'hidden' }}
        className="gallery-img-wrap"
      >
        <img
          src={item.img}
          alt={item.label}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', transition: 'transform 0.7s ease' }}
          className="gallery-img"
        />
        <div
          className="gallery-overlay"
          style={{ position: 'absolute', inset: 0, background: 'rgba(6,13,26,0)', transition: 'background 0.4s', display: 'flex', alignItems: 'flex-end', padding: 24 }}
        >
          <div className="gallery-label" style={{ opacity: 0, transform: 'translateY(12px)', transition: 'opacity 0.3s, transform 0.35s' }}>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--blue-bright)', marginBottom: 6 }}>{item.sub}</p>
            <p style={{ fontSize: 28, fontWeight: 700, color: 'var(--white)', lineHeight: 1 }}>{item.label}</p>
          </div>
        </div>
      </div>

      <div style={{ paddingLeft: 4 }}>
        <p style={{ fontSize: 20, fontWeight: 700, marginBottom: 4, color: 'var(--black)' }}>{item.label}</p>
        <p style={{ fontSize: 12, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gray-400)' }}>{item.sub}</p>
      </div>

      <style>{`
        .gallery-img-wrap:hover .gallery-img { transform: scale(1.06); }
        .gallery-img-wrap:hover .gallery-overlay { background: rgba(6,13,26,0.55) !important; }
        .gallery-img-wrap:hover .gallery-label { opacity: 1 !important; transform: translateY(0) !important; }
      `}</style>
    </motion.div>
  )
}

/* ─── Gallery section ────────────────────────────────────────── */
export default function Gallery() {
  const sectionRef = useRef(null)
  const titleRef   = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' })
  const animRef    = useRef(null)
  const rawIdxRef  = useRef(N) // start in middle set

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  // Scroll-driven horizontal parallax (the "giraban" effect)
  const scrollOffset = useTransform(scrollYProgress, [0, 1], [80, -(STEP * N * 0.38)])

  const arrowOffset  = useMotionValue(-N * STEP)   // starts at middle set
  const combinedX    = useTransform([scrollOffset, arrowOffset], ([s, a]) => s + a)

  const [displayIdx, setDisplayIdx] = useState(0)  // 0..N-1 for dots

  const goTo = (next) => {
    if (animRef.current) animRef.current.stop()
    rawIdxRef.current = next
    setDisplayIdx(((next - N) % N + N) % N)

    animRef.current = motionAnimate(arrowOffset, -next * STEP, {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
    })

    // After animation completes, silently snap to middle set if out of bounds
    setTimeout(() => {
      const cur = rawIdxRef.current
      if (cur >= N * 2) {
        rawIdxRef.current = N
        arrowOffset.set(-N * STEP)
      } else if (cur < N) {
        rawIdxRef.current = N * 2 - 1
        arrowOffset.set(-(N * 2 - 1) * STEP)
      }
    }, 600)
  }

  const goNext = () => goTo(rawIdxRef.current + 1)
  const goPrev = () => goTo(rawIdxRef.current - 1)

  const ArrowBtn = ({ onClick, children }) => (
    <button
      onClick={onClick}
      style={{
        width: 48, height: 48, borderRadius: '50%',
        border: '1.5px solid var(--black)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'transparent', color: 'var(--black)',
        cursor: 'pointer', transition: 'background 0.2s, color 0.2s',
        flexShrink: 0,
      }}
      onMouseEnter={e => { e.currentTarget.style.background = 'var(--black)'; e.currentTarget.style.color = 'white' }}
      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--black)' }}
    >
      {children}
    </button>
  )

  return (
    <section ref={sectionRef} style={{ padding: '130px 0', background: 'var(--gray-100)', overflow: 'hidden' }}>

      {/* Title row */}
      <div className="gallery-title-row" ref={titleRef} style={{ padding: '0 72px', marginBottom: 72 }}>
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={titleInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ display: 'block', fontSize: 11, fontWeight: 600, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: 14 }}
        >
          Campaña Editorial
        </motion.span>

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
          <motion.h2
            initial={{ opacity: 0, y: 35 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 4vw, 68px)', fontWeight: 700, lineHeight: 0.93, letterSpacing: '-0.02em', color: 'var(--black)' }}
          >
            La <em style={{ fontStyle: 'italic' }}>Galería</em>
          </motion.h2>

          {/* Arrows + counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            style={{ display: 'flex', alignItems: 'center', gap: 14 }}
          >
            <span style={{ fontSize: 13, color: 'var(--gray-400)', minWidth: 40 }}>
              {displayIdx + 1} / {N}
            </span>
            <ArrowBtn onClick={goPrev}><ChevronLeft size={20} /></ArrowBtn>
            <ArrowBtn onClick={goNext}><ChevronRight size={20} /></ArrowBtn>
          </motion.div>
        </div>
      </div>

      {/* Horizontal strip — scroll + arrow combined */}
      <div className="gallery-strip" style={{ paddingLeft: 72, overflow: 'visible' }}>
        <motion.div style={{ display: 'flex', gap: GAP, x: combinedX, willChange: 'transform' }}>
          {ITEMS.map(item => (
            <GalleryCard key={item.uid} item={item} />
          ))}
        </motion.div>
      </div>

      {/* Progress dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 56 }}>
        {BASE_ITEMS.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(N + i)}
            style={{
              width: i === displayIdx ? 28 : 8, height: 8, borderRadius: 4,
              background: i === displayIdx ? 'var(--blue)' : 'var(--gray-200)',
              border: 'none', padding: 0, cursor: 'pointer',
              transition: 'width 0.3s ease, background 0.3s ease',
            }}
          />
        ))}
      </div>

      {/* Accent line */}
      <div className="gallery-accent" style={{ margin: '56px 72px 0', height: 2, background: 'linear-gradient(to right, var(--blue) 30%, transparent)' }} />
    </section>
  )
}
