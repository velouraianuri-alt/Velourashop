import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { ShoppingBag } from 'lucide-react'

const HQ = '/imagenes/high-quality-sunglasses-manufacturer'
const TRANSPARENT = '/imagenes/transparent-new-cat3-luxury-street-wear-glasses'
const RETRO = '/imagenes/custom-retro-shades-biodegradable-acetate-sunglasses-for-men-high-quality'
const VINTAGE_LADY = '/imagenes/custom-high-quality-uv400-ladys-shades-wholesale-vintage'
const ITALIAN = '/imagenes/italian-luxury-eyewear-new-model'
const VINTAGE_SQ = '/imagenes/lma-1025-vintage-oversize-square-classic'
const UNISEX = '/imagenes/manufacture-custom-high-quality-unisex-luxury'

// Datos locales como fallback si Shopify no carga
const DEFAULT_PRODUCTS = [
  { id: 1, name: 'Crystal Street', price: 35, originalPrice: 49.99, tag: 'Exclusive', stock: 5, stars: 4.8, reviews: 196, watching: 12,
    imgDefault: `${TRANSPARENT}/frontal.png`, imgHover: `${TRANSPARENT}/semilateral.png`,
    images: [`${TRANSPARENT}/frontal.png`, `${TRANSPARENT}/semilateral.png`, `${TRANSPARENT}/lateral.png`, `${TRANSPARENT}/traseras.png`] },
  { id: 2, name: 'Retro Ace', price: 35, originalPrice: 49.99, tag: 'Best Seller', stock: 4, stars: 4.9, reviews: 312, watching: 18,
    imgDefault: `${RETRO}/frontal.png`, imgHover: `${RETRO}/semilateral.png`,
    images: [`${RETRO}/frontal.png`, `${RETRO}/semilateral.png`, `${RETRO}/lateral.png`, `${RETRO}/traseras.png`] },
  { id: 3, name: 'Vintage Lady', price: 35, originalPrice: 49.99, tag: 'New Drop', stock: 6, stars: 4.8, reviews: 87, watching: 11,
    imgDefault: `${VINTAGE_LADY}/forntal.png`, imgHover: `${VINTAGE_LADY}/semilateral.png`,
    images: [`${VINTAGE_LADY}/forntal.png`, `${VINTAGE_LADY}/semilateral.png`, `${VINTAGE_LADY}/lateral.png`, `${VINTAGE_LADY}/traseras.png`] },
  { id: 4, name: 'Italian Glam', price: 35, originalPrice: 49.99, tag: 'Limited', stock: 2, stars: 5.0, reviews: 143, watching: 24,
    imgDefault: `${ITALIAN}/frontal.png`, imgHover: `${ITALIAN}/semilateral.png`,
    images: [`${ITALIAN}/frontal.png`, `${ITALIAN}/semilateral.png`, `${ITALIAN}/lateral.png`, `${ITALIAN}/traseras.png`] },
  { id: 5, name: 'Vintage Square', price: 35, originalPrice: 49.99, tag: null, stock: 3, stars: 4.7, reviews: 201, watching: 9,
    imgDefault: `${VINTAGE_SQ}/frontal.png`, imgHover: `${VINTAGE_SQ}/semilateral.png`,
    images: [`${VINTAGE_SQ}/frontal.png`, `${VINTAGE_SQ}/semilateral.png`, `${VINTAGE_SQ}/lateral.png`, `${VINTAGE_SQ}/traseras.png`] },
  { id: 7, name: 'Unisex Pro', price: 35, originalPrice: 49.99, tag: 'Exclusive', stock: 7, stars: 4.9, reviews: 176, watching: 15,
    imgDefault: `${UNISEX}/frontal.png`, imgHover: `${UNISEX}/semilateral.png`,
    images: [`${UNISEX}/frontal.png`, `${UNISEX}/semilateral.png`, `${UNISEX}/lateral.png`, `${UNISEX}/traseras.png`] },
  { id: 6, name: 'Eclipse', price: 35, originalPrice: 49.99, tag: 'New Drop', stock: 8, stars: 4.8, reviews: 127, watching: 14,
    imgDefault: `${HQ}/negras_naranja/frontal.png`,
    imgHover:   `${HQ}/negras_naranja/semilateral.png`,
    images: [
      `${HQ}/negras_naranja/frontal.png`,
      `${HQ}/negras_naranja/semilateral.png`,
      `${HQ}/negras_naranja/lateral.png`,
      `${HQ}/negras_naranja/traseras.png`,
    ],
    colors: [
      {
        name: 'Black Orange',
        swatch: 'linear-gradient(135deg, #1a1a1a 50%, #ff8c00 50%)',
        images: [
          `${HQ}/negras_naranja/frontal.png`,
          `${HQ}/negras_naranja/semilateral.png`,
          `${HQ}/negras_naranja/lateral.png`,
          `${HQ}/negras_naranja/traseras.png`,
        ],
      },
      {
        name: 'Black',
        swatch: '#1a1a1a',
        images: [
          `${HQ}/color_negro/frontal.png`,
          `${HQ}/color_negro/semilateral.png`,
          `${HQ}/color_negro/lateral.png`,
          `${HQ}/color_negro/traseras.png`,
        ],
      },
      {
        name: 'Black Green',
        swatch: '#2d5a3d',
        images: [
          `${HQ}/color_verde/frontal.png`,
          `${HQ}/color_verde/semilateral.png`,
          `${HQ}/color_verde/lateral.png`,
          `${HQ}/color_verde/traseras.png`,
        ],
      },
    ],
  },
]

const PARTICLES = [
  { dx: -52, dy: -48, color: '#4ade80', size: 7 },
  { dx:  52, dy: -48, color: '#60a5fa', size: 5 },
  { dx: -68, dy:  -8, color: '#f59e0b', size: 8 },
  { dx:  68, dy:  -8, color: '#f472b6', size: 5 },
  { dx: -38, dy:  34, color: '#a78bfa', size: 6 },
  { dx:  38, dy:  34, color: '#34d399', size: 6 },
  { dx:   0, dy: -64, color: '#fb923c', size: 7 },
  { dx: -18, dy:  44, color: '#38bdf8', size: 5 },
  { dx:  18, dy:  44, color: '#e879f9', size: 6 },
  { dx:  58, dy:  20, color: '#facc15', size: 5 },
  { dx: -58, dy:  20, color: '#f87171', size: 5 },
]

function ProductCard({ product, index, onAdd, onProductClick }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [hovered, setHovered] = useState(false)
  const [activeImg, setActiveImg] = useState(0)
  const [addState, setAddState] = useState('idle')
  const [burst, setBurst] = useState(false)
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 768)
  const images = product.images || [product.imgDefault, product.imgHover]

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // En móvil el botón siempre visible (no hay hover)
  const showButton = isMobile || hovered
  const showThumbnails = isMobile || hovered

  const handleAdd = (e) => {
    e.stopPropagation()
    if (addState !== 'idle') return
    const sourceRect = e.currentTarget.getBoundingClientRect()
    onAdd(product, 0, sourceRect)
    setAddState('added')
    setBurst(true)
    setTimeout(() => setBurst(false), 700)
    setTimeout(() => setAddState('idle'), 1900)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: (index % 4) * 0.08 }}
      style={{ cursor: 'pointer' }}
      onClick={() => onProductClick(product)}
      onMouseEnter={() => { setHovered(true); setActiveImg(1) }}
      onMouseLeave={() => { setHovered(false); setActiveImg(0) }}
    >
      {/* Image box — outer has no overflow:hidden so particles escape */}
      <div style={{ width: '100%', aspectRatio: '1/1', borderRadius: 4, position: 'relative', marginBottom: 10, background: '#FFFFFF' }}>

        {/* Promo Badge */}
        <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 5, background: '#1a1a1a', padding: '6px 9px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 12, fontWeight: 800, color: '#fff', letterSpacing: '0.06em', lineHeight: 1 }}>2ND −50%</span>
        </div>

        {/* Inner clip layer — clips images only */}
        <div style={{ position: 'absolute', inset: 0, borderRadius: 4, overflow: 'hidden' }}>
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={product.name}
              style={{
                position: 'absolute', inset: 0, width: '100%', height: '100%',
                objectFit: 'contain', padding: '12%',
                transition: 'opacity 0.35s ease',
                opacity: activeImg === i ? 1 : 0,
              }}
            />
          ))}

        </div>

        {/* Add button — outside overflow:hidden so particles are not clipped */}
        <motion.button
          onClick={handleAdd}
          animate={{
            opacity: showButton ? 1 : 0,
            y: showButton ? 0 : 8,
          }}
          whileTap={{ scale: 0.93 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'absolute', bottom: 8, left: 8, right: 8, zIndex: 3,
            padding: isMobile ? '9px 0' : '11px 0',
            fontSize: isMobile ? 10 : 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
            borderRadius: 3, border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            overflow: 'hidden',
            cursor: addState !== 'idle' ? 'default' : 'pointer',
          }}
        >
          {/* Background fill that animates */}
          <motion.div
            animate={{ backgroundColor: addState === 'added' ? '#16a34a' : '#060D1A' }}
            transition={{ duration: 0.25 }}
            style={{ position: 'absolute', inset: 0 }}
          />

          {/* Ripple on click */}
          <AnimatePresence>
            {addState === 'added' && (
              <motion.div
                key="ripple"
                initial={{ scale: 0, opacity: 0.35 }}
                animate={{ scale: 4, opacity: 0 }}
                exit={{}}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                style={{
                  position: 'absolute', width: 60, height: 60,
                  borderRadius: '50%', background: 'white',
                  pointerEvents: 'none',
                }}
              />
            )}
          </AnimatePresence>

          {/* Label */}
          <AnimatePresence mode="wait">
            {addState === 'idle' ? (
              <motion.span
                key="idle"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
                style={{ display: 'flex', alignItems: 'center', gap: 6, position: 'relative', color: 'white' }}
              >
                <ShoppingBag size={11} /> Add
              </motion.span>
            ) : (
              <motion.span
                key="added"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
                style={{ display: 'flex', alignItems: 'center', gap: 6, position: 'relative', color: 'white' }}
              >
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <motion.path
                    d="M1.5 6.5L5 10L11.5 3"
                    stroke="white"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                  />
                </svg>
                Added!
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Particle burst */}
        <AnimatePresence>
          {burst && PARTICLES.map((p, i) => (
            <motion.div
              key={i}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{ x: p.dx, y: p.dy, opacity: 0, scale: 0.2 }}
              exit={{}}
              transition={{ duration: 0.65, ease: [0.2, 0.8, 0.3, 1], delay: i * 0.018 }}
              style={{
                position: 'absolute',
                bottom: 30, left: '50%',
                width: p.size, height: p.size,
                marginLeft: -p.size / 2,
                borderRadius: '50%',
                background: p.color,
                pointerEvents: 'none',
                zIndex: 20,
              }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Thumbnails */}
      <motion.div
        animate={{ opacity: showThumbnails ? 1 : 0, y: showThumbnails ? 0 : 4 }}
        transition={{ duration: 0.2 }}
        style={{ display: 'flex', gap: 5, marginBottom: 8, flexWrap: 'wrap' }}
        onClick={e => e.stopPropagation()}
      >
        {images.map((src, i) => (
          <button
            key={i}
            onClick={e => { e.stopPropagation(); setActiveImg(i) }}
            style={{ width: isMobile ? 24 : 28, height: isMobile ? 24 : 28, borderRadius: 4, overflow: 'hidden', border: `2px solid ${activeImg === i ? 'var(--blue)' : 'var(--gray-200)'}`, padding: 0, background: '#fff', flexShrink: 0, transition: 'border-color 0.2s', cursor: 'pointer' }}
          >
            <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 2 }} />
          </button>
        ))}
      </motion.div>

      <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--black)', marginBottom: 3 }}>{product.name}</p>

      {product.colors && (
        <p style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 6, fontWeight: 500 }}>
          {product.colors.length} colors available
        </p>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 5 }}>
        <div style={{ display: 'flex' }}>
          {[1,2,3,4,5].map(s => (
            <span key={s} style={{ color: s <= Math.round(product.stars) ? '#f59e0b' : '#e5e7eb', fontSize: 11 }}>★</span>
          ))}
        </div>
        <span style={{ fontSize: 10, color: '#9ca3af', fontWeight: 500 }}>{product.stars} ({product.reviews})</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 4, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: isMobile ? 5 : 8 }}>
          <span style={{ fontSize: isMobile ? 13 : 14, fontWeight: 700, color: 'var(--blue)' }}>{product.price},00 €</span>
          <span style={{ fontSize: isMobile ? 11 : 12, color: 'var(--gray-400)', textDecoration: 'line-through' }}>{product.originalPrice} €</span>
        </div>
        {product.stock <= 4 && (
          <span style={{ fontSize: isMobile ? 9 : 10, fontWeight: 700, color: '#dc2626', letterSpacing: '0.04em' }}>
            Only {product.stock} left!
          </span>
        )}
      </div>
    </motion.div>
  )
}

export default function FeaturedProducts({ products = DEFAULT_PRODUCTS, loading, error, onAdd, onProductClick }) {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' })
  const [viewportCols, setViewportCols] = useState(() => {
    if (typeof window === 'undefined') return 4
    const w = window.innerWidth
    if (w <= 900) return 2
    if (w <= 1100) return 3
    return 4
  })

  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth
      setViewportCols(w <= 900 ? 2 : w <= 1100 ? 3 : 4)
    }
    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Usar productos locales si Shopify falla
  const displayProducts = products && products.length > 0 ? products : DEFAULT_PRODUCTS

  return (
    <section id="shop" style={{ padding: '130px 72px', background: 'var(--white)' }}>
      <div ref={titleRef} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 72, gap: 16, flexWrap: 'wrap' }}>
        <div>
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={titleInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 600, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: 14 }}
          >
            Curated Selection
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 35 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 4vw, 68px)', fontWeight: 700, lineHeight: 0.93, letterSpacing: '-0.02em', color: 'var(--black)' }}
          >
            Featured<br /><em style={{ fontStyle: 'italic' }}>Models</em>
          </motion.h2>
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={titleInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.35 }}
          style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '12px 28px', border: '1.5px solid var(--black)', borderRadius: 4, color: 'var(--black)', transition: 'background 0.2s, color 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--blue)'; e.currentTarget.style.color = 'var(--white)'; e.currentTarget.style.borderColor = 'var(--blue)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--black)'; e.currentTarget.style.borderColor = 'var(--black)' }}
        >
          View All
        </motion.button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${viewportCols}, 1fr)`, gap: viewportCols === 2 ? '22px 12px' : '40px 24px' }}>
        {displayProducts.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} onAdd={onAdd} onProductClick={onProductClick} />
        ))}
      </div>

      <style>{`
        @media (max-width: 1100px) {
          #shop > div:last-child { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 900px) {
          #shop { padding: 60px 16px !important; }
          #shop > div:last-child { grid-template-columns: repeat(2, 1fr) !important; gap: 22px 12px !important; }
          #shop > div:first-child { margin-bottom: 36px !important; }
          #shop > div:first-child button { font-size: 11px !important; padding: 10px 18px !important; }
          #shop h2 { font-size: clamp(32px, 7vw, 48px) !important; }
        }
        @media (max-width: 480px) {
          #shop { padding: 48px 12px !important; }
          #shop > div:last-child { gap: 18px 10px !important; }
        }
      `}</style>
    </section>
  )
}
