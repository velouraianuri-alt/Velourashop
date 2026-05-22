import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, ShoppingBag, ChevronDown, Sun, Shield,
  Layers, Heart, Star, Truck, RefreshCw, Package,
  Minus, Plus, X, RotateCcw,
} from 'lucide-react'
import Footer from './Footer'

/* ─── Feature data ────────────────────────────────────────── */
const featureBadges = [
  { icon: Sun,    title: 'Protección UV400',       desc: 'Bloquea el 100% de los rayos UVA y UVB' },
  { icon: Shield, title: 'Garantía de por vida',   desc: 'Satisfecho o te devolvemos el dinero en 30 días' },
  { icon: Layers, title: 'Policarbonato premium',  desc: 'Resistente, ligero y diseñado para durar' },
  { icon: Heart,  title: 'Montura ultraligera',    desc: 'Comodidad durante todo el día, sin marcas' },
]

const shippingBadges = [
  { icon: Truck,     label: 'Envío gratis' },
  { icon: RefreshCw, label: 'Devolución 30 días' },
  { icon: Package,   label: 'Embalaje premium' },
]

const accordionData = [
  { title: 'Características', content: 'Montura de acetato premium de alta resistencia. Cristales polarizados con protección UV400 que bloquean el 100% de los rayos UVA y UVB. Bisagras de barril de acero inoxidable con ajuste de precisión. Ancho de montura: 148mm · Puente: 18mm · Largo de patilla: 145mm.' },
  { title: 'Información sobre el Envío', content: 'Envío gratuito en todos los pedidos. Entrega en 24-48h en península, 3-5 días en islas. Seguimiento en tiempo real incluido. Embalaje premium reciclable con estuche rígido incluido.' },
  { title: 'Devoluciones Fáciles en 30 Días', content: 'Si no estás 100% satisfecho, devuelves sin coste y sin preguntas en 30 días desde la recepción. Solo necesitas el embalaje original. Reembolso en menos de 5 días hábiles.' },
]

/* ─── Accordion ───────────────────────────────────────────── */
function AccordionItem({ item }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid var(--gray-200)' }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '17px 0', fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--black)' }}
      >
        {item.title}
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.28 }}>
          <ChevronDown size={15} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--gray-600)', lineHeight: 1.8, paddingBottom: 18 }}>
              {item.content}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── 3D Tilt hook ────────────────────────────────────────── */
function use3DTilt() {
  const containerRef = useRef(null)
  const [tiltStyle, setTiltStyle] = useState({ transform: 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)' })
  const [glare, setGlare] = useState({ opacity: 0, x: 50, y: 50 })
  const animRef = useRef(null)
  const currentTilt = useRef({ x: 0, y: 0 })

  const animate = useCallback((targetX, targetY) => {
    const lerp = (a, b, t) => a + (b - a) * t
    const step = () => {
      currentTilt.current.x = lerp(currentTilt.current.x, targetX, 0.12)
      currentTilt.current.y = lerp(currentTilt.current.y, targetY, 0.12)
      const { x, y } = currentTilt.current
      setTiltStyle({
        transform: `perspective(900px) rotateX(${x}deg) rotateY(${y}deg) scale3d(1.04,1.04,1.04)`,
        transition: 'none',
        willChange: 'transform',
      })
      const dist = Math.abs(x - targetX) + Math.abs(y - targetY)
      if (dist > 0.02) animRef.current = requestAnimationFrame(step)
    }
    cancelAnimationFrame(animRef.current)
    animRef.current = requestAnimationFrame(step)
  }, [])

  const resetTilt = useCallback(() => {
    cancelAnimationFrame(animRef.current)
    const step = () => {
      currentTilt.current.x = currentTilt.current.x * 0.85
      currentTilt.current.y = currentTilt.current.y * 0.85
      setTiltStyle({
        transform: `perspective(900px) rotateX(${currentTilt.current.x}deg) rotateY(${currentTilt.current.y}deg) scale3d(1,1,1)`,
        transition: 'none',
      })
      if (Math.abs(currentTilt.current.x) + Math.abs(currentTilt.current.y) > 0.05) {
        animRef.current = requestAnimationFrame(step)
      } else {
        setTiltStyle({ transform: 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)', transition: 'transform 0.4s ease' })
      }
    }
    animRef.current = requestAnimationFrame(step)
    setGlare({ opacity: 0, x: 50, y: 50 })
  }, [])

  const onMouseMove = useCallback((e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width   // 0..1
    const py = (e.clientY - rect.top)  / rect.height  // 0..1
    const rotY =  (px - 0.5) * 28
    const rotX = -(py - 0.5) * 18
    animate(rotX, rotY)
    setGlare({ opacity: 0.18, x: px * 100, y: py * 100 })
  }, [animate])

  /* Touch drag support */
  const touch = useRef(null)
  const onTouchStart = (e) => { touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY } }
  const onTouchMove = useCallback((e) => {
    if (!touch.current) return
    const dx = e.touches[0].clientX - touch.current.x
    const dy = e.touches[0].clientY - touch.current.y
    const rotY =  (dx / 8)
    const rotX = -(dy / 8)
    animate(Math.max(-14, Math.min(14, rotX)), Math.max(-22, Math.min(22, rotY)))
  }, [animate])
  const onTouchEnd = useCallback(() => { touch.current = null; resetTilt() }, [resetTilt])

  useEffect(() => () => cancelAnimationFrame(animRef.current), [])

  return { containerRef, tiltStyle, glare, onMouseMove, onMouseLeave: resetTilt, onTouchStart, onTouchMove, onTouchEnd }
}

/* ─── Mini cart item ──────────────────────────────────────── */
function MiniCartItem({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <div style={{ display: 'flex', gap: 16, padding: '20px 0', borderBottom: '1px solid var(--gray-100)' }}>
      <div style={{ width: 80, height: 96, borderRadius: 6, flexShrink: 0, overflow: 'hidden', background: 'var(--gray-100)' }}>
        {item.imgDefault
          ? <img src={item.imgDefault} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ShoppingBag size={20} color="var(--gray-400)" /></div>
        }
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--black)' }}>{item.name}</p>
          <button onClick={() => onRemove(item.id)} style={{ color: 'var(--gray-400)', transition: 'color 0.2s', padding: 2 }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--black)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--gray-400)'}
          ><X size={14} /></button>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 14 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--black)' }}>{item.price}€</span>
          <span style={{ fontSize: 13, color: 'var(--gray-400)', textDecoration: 'line-through' }}>49,99€</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => onDecrease(item.id)}
            style={{ width: 30, height: 30, border: '1.5px solid var(--gray-200)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'border-color 0.2s, background 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--black)'; e.currentTarget.style.background = 'var(--black)'; e.currentTarget.querySelector('svg').style.stroke = 'white' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--gray-200)'; e.currentTarget.style.background = 'transparent'; e.currentTarget.querySelector('svg').style.stroke = 'currentColor' }}
          ><Minus size={12} /></button>
          <span style={{ fontSize: 14, fontWeight: 700, minWidth: 20, textAlign: 'center' }}>{item.qty}</span>
          <button onClick={() => onIncrease(item.id)}
            style={{ width: 30, height: 30, border: '1.5px solid var(--gray-200)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'border-color 0.2s, background 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--black)'; e.currentTarget.style.background = 'var(--black)'; e.currentTarget.querySelector('svg').style.stroke = 'white' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--gray-200)'; e.currentTarget.style.background = 'transparent'; e.currentTarget.querySelector('svg').style.stroke = 'currentColor' }}
          ><Plus size={12} /></button>
        </div>
      </div>
    </div>
  )
}

/* ─── Main component ──────────────────────────────────────── */
export default function ProductPage({ product, onClose, onAdd, cartItems = [], onIncrease, onDecrease, onRemove, onOpenCart }) {
  const hasColors = product.colors?.length > 0
  const [colorIdx, setColorIdx]   = useState(0)
  const [mainImg, setMainImg]     = useState(0)
  const [added, setAdded]         = useState(false)
  const tilt = use3DTilt()
  const scrollContainerRef = useRef(null)
  const featuresRef = useRef(null)

  const images = hasColors
    ? product.colors[colorIdx].images
    : (product.images?.length ? product.images : [product.imgDefault, product.imgHover])

  const selectedColorName = hasColors ? product.colors[colorIdx].name : null

  const handleColorChange = (i) => {
    setColorIdx(i)
    setMainImg(0)
  }

  // Display the selected thumbnail image (no hover effect for Eclipse)
  const displayImageIdx = mainImg


  useEffect(() => {
    setMainImg(0); setAdded(false)
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [product.id])

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const handleAdd = () => {
    onAdd(product, colorIdx)
    onOpenCart()
    setAdded(true)
    setTimeout(() => setAdded(false), 2200)
  }

  const scrollToFeatures = () => {
    if (featuresRef.current) {
      const scrollContainer = scrollContainerRef.current
      const targetElement = featuresRef.current
      const targetPosition = targetElement.offsetTop - 100

      scrollContainer?.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '100%' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{ position: 'fixed', top: 116, left: 0, right: 0, bottom: 0, background: 'var(--white)', zIndex: 300, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
    >
      {/* ── Top bar ── */}
      <div className="product-top-bar" style={{ position: 'sticky', top: 0, zIndex: 10, background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(14px)', borderBottom: '1px solid var(--gray-200)', padding: '0 40px', height: 62, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          onClick={onClose}
          style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--black)', transition: 'opacity 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.45'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          <ArrowLeft size={17} /> Volver
        </button>

        <span style={{ fontFamily: 'var(--font-logo)', fontSize: 20, fontWeight: 600, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'var(--black)' }}>
          VELOURA
        </span>

        <div style={{ width: 40 }} />
      </div>

      {/* ── Body: scrollable content ── */}
      <div className="product-page-body" style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 450px', gap: 0, overflow: 'hidden' }}>

        {/* LEFT: Gallery - Scrollable */}
        <div className="product-gallery" ref={scrollContainerRef} style={{ display: 'flex', flexDirection: 'column', gap: 40, padding: '40px 30px 80px', overflowY: 'auto' }}>
          {/* Group images in pairs */}
          {Array.from({ length: Math.ceil(images.length / 2) }).map((_, pairIdx) => {
            const img1Idx = pairIdx * 2
            const img2Idx = pairIdx * 2 + 1
            const img1 = images[img1Idx]
            const img2 = images[img2Idx]

            return (
              <div key={`pair-${colorIdx}-${pairIdx}`} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* 2 images side by side */}
                <div className="product-image-pair-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  {/* Image 1 */}
                  <div
                    ref={img1Idx === 0 && !hasColors ? tilt.containerRef : null}
                    onMouseMove={img1Idx === 0 && !hasColors ? tilt.onMouseMove : undefined}
                    onMouseLeave={img1Idx === 0 && !hasColors ? tilt.onMouseLeave : undefined}
                    onTouchStart={img1Idx === 0 && !hasColors ? tilt.onTouchStart : undefined}
                    onTouchMove={img1Idx === 0 && !hasColors ? tilt.onTouchMove : undefined}
                    onTouchEnd={img1Idx === 0 && !hasColors ? tilt.onTouchEnd : undefined}
                    style={{ width: '100%', aspectRatio: '1/1', borderRadius: 10, overflow: 'hidden', background: '#fff', border: '1px solid var(--gray-100)', cursor: 'grab', userSelect: 'none', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <motion.img
                      key={`${colorIdx}-${img1Idx}`}
                      src={img1}
                      alt={product.name}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.35 }}
                      style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '8%', display: 'block', pointerEvents: 'none', ...(img1Idx === 0 && !hasColors ? tilt.tiltStyle : {}) }}
                    />
                    {img1Idx === 0 && (
                      <div style={{ position: 'absolute', inset: 0, borderRadius: 10, pointerEvents: 'none', background: `radial-gradient(circle at ${tilt.glare.x}% ${tilt.glare.y}%, rgba(255,255,255,${tilt.glare.opacity}) 0%, transparent 65%)`, transition: 'opacity 0.2s' }} />
                    )}
                  </div>

                  {/* Image 2 */}
                  {img2 && (
                    <div
                      style={{ width: '100%', aspectRatio: '1/1', borderRadius: 10, overflow: 'hidden', background: '#fff', border: '1px solid var(--gray-100)', cursor: 'grab', userSelect: 'none', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <motion.img
                        key={`${colorIdx}-${img2Idx}`}
                        src={img2}
                        alt={product.name}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.35 }}
                        style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '8%', display: 'block', pointerEvents: 'none' }}
                      />
                    </div>
                  )}
                </div>

              </div>
            )
          })}

          <Footer />
        </div>

        {/* RIGHT: Product info - Scrollable panel */}
        <div className="product-info-panel" style={{ overflowY: 'auto', paddingLeft: 32, paddingRight: 32, paddingTop: 40, paddingBottom: 40, background: 'var(--white)', borderLeft: '1px solid var(--gray-200)', zIndex: 100 }}>
          {/* Stars */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <div style={{ display: 'flex', gap: 2 }}>
              {[1,2,3,4,5].map(s => <Star key={s} size={13} fill="var(--blue)" color="var(--blue)" />)}
            </div>
            <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>4.9 · 127 reseñas</span>
          </div>

          {/* Name + tag */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px, 3vw, 44px)', fontWeight: 700, lineHeight: 1.05, color: 'var(--black)' }}>
              {product.name}
            </h1>
            {product.tag && (
              <span style={{ background: 'var(--blue)', color: 'var(--white)', fontSize: 10, fontWeight: 700, padding: '5px 10px', borderRadius: 4, letterSpacing: '0.1em', textTransform: 'uppercase', alignSelf: 'flex-start', marginTop: 8 }}>
                {product.tag}
              </span>
            )}
          </div>

          {/* Price */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 22, paddingBottom: 22, borderBottom: '1px solid var(--gray-200)' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 700, color: 'var(--blue)' }}>35,00€</span>
            <span style={{ fontSize: 20, color: 'var(--gray-400)', textDecoration: 'line-through' }}>49,99€</span>
            <span style={{ background: 'var(--blue)', color: 'var(--white)', fontSize: 10, fontWeight: 700, padding: '4px 8px', borderRadius: 4, letterSpacing: '0.08em' }}>−30%</span>
          </div>

          {/* Add to cart - Big button */}
          <motion.button
            onClick={handleAdd}
            whileTap={{ scale: 0.97 }}
            style={{ width: '100%', padding: '19px', background: added ? '#16a34a' : 'var(--navy)', color: 'var(--white)', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, transition: 'background 0.3s', marginBottom: 22, cursor: 'pointer' }}
            onMouseEnter={e => { if (!added) e.currentTarget.style.background = 'var(--blue)' }}
            onMouseLeave={e => { if (!added) e.currentTarget.style.background = 'var(--navy)' }}
          >
            <ShoppingBag size={17} />
            {added ? '¡Añadido a la bolsa! ✓' : 'Añadir a la cesta — 35,00€'}
          </motion.button>

          {/* Color selector */}
          {hasColors && (
            <div style={{ marginBottom: 22 }}>
              <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--gray-600)', marginBottom: 12 }}>
                Color:{' '}
                <span style={{
                  color: 'var(--black)',
                  fontWeight: 600,
                  borderBottom: '1.5px solid var(--black)',
                  paddingBottom: 1,
                }}>
                  {selectedColorName}
                </span>
              </p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {product.colors.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => handleColorChange(i)}
                    title={color.name}
                    style={{
                      width: 64, height: 64,
                      borderRadius: 8,
                      overflow: 'hidden',
                      background: '#fff',
                      border: `2.5px solid ${i === colorIdx ? 'var(--black)' : 'var(--gray-200)'}`,
                      transition: 'border-color 0.2s, transform 0.15s',
                      transform: i === colorIdx ? 'scale(1.06)' : 'scale(1)',
                      padding: 3,
                    }}
                  >
                    <img
                      src={color.images[0]}
                      alt={color.name}
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Promo banner */}
          <div style={{ padding: '18px 20px', background: '#1a1a1a', marginBottom: 22 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 3, letterSpacing: '0.05em' }}>COMPRA UNA, LLÉVATE 2ª GRATIS</p>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>Válido en Spring Sale</p>
          </div>

          {/* Shipping */}
          <div style={{ display: 'flex', gap: 18, marginBottom: 22, flexWrap: 'wrap' }}>
            {shippingBadges.map(({ icon: Icon, label }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--gray-600)', fontWeight: 500 }}>
                <Icon size={13} color="var(--blue)" /> {label}
              </div>
            ))}
          </div>

          <p style={{ fontSize: 11, color: 'var(--gray-400)', textAlign: 'center', marginBottom: 28, letterSpacing: '0.04em' }}>
            Envío gratuito · Devolución gratuita en 30 días
          </p>

          {/* Feature grid */}
          <div ref={featuresRef} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 28 }}>
            {featureBadges.map(({ icon: Icon, title, desc }) => (
              <div key={title} style={{ display: 'flex', gap: 10, padding: '13px', background: 'var(--gray-100)', borderRadius: 10, alignItems: 'flex-start' }}>
                <Icon size={15} color="var(--blue)" style={{ flexShrink: 0, marginTop: 2 }} />
                <div>
                  <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--black)', marginBottom: 2 }}>{title}</p>
                  <p style={{ fontSize: 10, color: 'var(--gray-600)', lineHeight: 1.5 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Accordion */}
          {accordionData.map(item => <AccordionItem key={item.title} item={item} />)}
        </div>
      </div>
    </motion.div>
  )
}

