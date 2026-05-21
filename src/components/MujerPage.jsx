import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowLeft, ShoppingBag } from 'lucide-react'
import Footer from './Footer'

const VINTAGE_LADY = '/imagenes/custom-high-quality-uv400-ladys-shades-wholesale-vintage'
const ITALIAN = '/imagenes/italian-luxury-eyewear-new-model'
const TRANSPARENT = '/imagenes/transparent-new-cat3-luxury-street-wear-glasses'
const HQ = '/imagenes/high-quality-sunglasses-manufacturer'

const mujerProducts = [
  {
    id: 101,
    name: 'Vintage Lady',
    subtitle: 'UV400 · Mujer',
    price: 35,
    originalPrice: 49.99,
    tag: 'Más Vendido',
    imgDefault: `${VINTAGE_LADY}/forntal.png`,
    imgHover:   `${VINTAGE_LADY}/semilateral.png`,
    images: [`${VINTAGE_LADY}/forntal.png`, `${VINTAGE_LADY}/semilateral.png`, `${VINTAGE_LADY}/lateral.png`, `${VINTAGE_LADY}/traseras.png`],
  },
  {
    id: 102,
    name: 'Italian Glam',
    subtitle: 'Lujo italiano · Premium',
    price: 35,
    originalPrice: 49.99,
    tag: 'New Drop',
    imgDefault: `${ITALIAN}/frontal.png`,
    imgHover:   `${ITALIAN}/semilateral.png`,
    images: [`${ITALIAN}/frontal.png`, `${ITALIAN}/semilateral.png`, `${ITALIAN}/lateral.png`, `${ITALIAN}/traseras.png`],
  },
  {
    id: 103,
    name: 'Crystal Street',
    subtitle: 'Transparente · Cat.3',
    price: 35,
    originalPrice: 49.99,
    tag: 'Exclusivo',
    imgDefault: `${TRANSPARENT}/frontal.png`,
    imgHover:   `${TRANSPARENT}/semilateral.png`,
    images: [`${TRANSPARENT}/frontal.png`, `${TRANSPARENT}/semilateral.png`, `${TRANSPARENT}/lateral.png`, `${TRANSPARENT}/traseras.png`],
  },
  {
    id: 104,
    name: 'Eclipse',
    subtitle: 'Alta calidad · Unisex',
    price: 35,
    originalPrice: 49.99,
    tag: 'New Drop',
    imgDefault: `${HQ}/negras_naranja/frontal.png`,
    imgHover:   `${HQ}/negras_naranja/semilateral.png`,
    images: [`${HQ}/negras_naranja/frontal.png`, `${HQ}/negras_naranja/semilateral.png`, `${HQ}/negras_naranja/lateral.png`, `${HQ}/negras_naranja/traseras.png`],
    colors: [
      { name: 'Black Orange', swatch: 'linear-gradient(135deg, #1a1a1a 50%, #ff8c00 50%)', images: [`${HQ}/negras_naranja/frontal.png`, `${HQ}/negras_naranja/semilateral.png`, `${HQ}/negras_naranja/lateral.png`, `${HQ}/negras_naranja/traseras.png`] },
      { name: 'Black', swatch: '#1a1a1a', images: [`${HQ}/color_negro/frontal.png`, `${HQ}/color_negro/semilateral.png`, `${HQ}/color_negro/lateral.png`, `${HQ}/color_negro/traseras.png`] },
      { name: 'Black Green', swatch: '#2d5a3d', images: [`${HQ}/color_verde/frontal.png`, `${HQ}/color_verde/semilateral.png`, `${HQ}/color_verde/lateral.png`, `${HQ}/color_verde/traseras.png`] },
    ],
  },
]

function ProductCard({ product, index, onAdd, onProductClick }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [hovered, setHovered] = useState(false)
  const [activeImg, setActiveImg] = useState(0)
  const images = product.images || [product.imgDefault, product.imgHover]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      style={{ cursor: 'pointer' }}
      onClick={() => onProductClick(product)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ width: '100%', aspectRatio: '1/1', borderRadius: 8, position: 'relative', overflow: 'hidden', marginBottom: 10, background: '#fff', border: '1px solid var(--gray-100)' }}>
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={product.name}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', padding: '10%', transition: 'opacity 0.35s ease', opacity: activeImg === i ? 1 : 0 }}
          />
        ))}
        {product.tag && (
          <div style={{ position: 'absolute', top: 12, left: 12, background: 'var(--navy)', color: '#fff', padding: '4px 10px', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: 4, zIndex: 2 }}>
            {product.tag}
          </div>
        )}
        <motion.button
          onClick={e => { e.stopPropagation(); onAdd(product) }}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
          transition={{ duration: 0.2 }}
          style={{ position: 'absolute', bottom: 12, left: 12, right: 12, background: 'var(--navy)', color: '#fff', padding: '11px 0', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, border: 'none', cursor: 'pointer', zIndex: 2 }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--blue)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--navy)'}
        >
          <ShoppingBag size={11} /> Añadir
        </motion.button>
      </div>

      <motion.div
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 4 }}
        transition={{ duration: 0.2 }}
        style={{ display: 'flex', gap: 6, marginBottom: 8 }}
        onClick={e => e.stopPropagation()}
      >
        {images.map((src, i) => (
          <button
            key={i}
            onClick={e => { e.stopPropagation(); setActiveImg(i) }}
            style={{ width: 28, height: 28, borderRadius: 4, overflow: 'hidden', border: `2px solid ${activeImg === i ? 'var(--blue)' : 'var(--gray-200)'}`, padding: 0, background: '#fff', flexShrink: 0, transition: 'border-color 0.2s', cursor: 'pointer' }}
          >
            <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 2 }} />
          </button>
        ))}
      </motion.div>

      <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--black)', marginBottom: 2 }}>{product.name}</p>
      <p style={{ fontSize: 11, color: 'var(--gray-400)', marginBottom: 6 }}>{product.subtitle}</p>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--blue)' }}>{product.price},00 €</span>
        <span style={{ fontSize: 12, color: 'var(--gray-400)', textDecoration: 'line-through' }}>{product.originalPrice} €</span>
      </div>
    </motion.div>
  )
}

export default function MujerPage({ onClose, onAdd, onProductClick, cartItems = [], onOpenCart }) {
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
      style={{ position: 'fixed', inset: 0, background: 'var(--white)', zIndex: 300, overflowY: 'auto' }}
    >
      <div style={{ position: 'sticky', top: 0, zIndex: 10, background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(14px)', borderBottom: '1px solid var(--gray-100)', padding: '0 48px', height: 62, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={onClose} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--black)', transition: 'opacity 0.2s' }} onMouseEnter={e => e.currentTarget.style.opacity = '0.4'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
          <ArrowLeft size={17} /> Volver
        </button>
        <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase' }}>VELOURA</span>
        <button onClick={onOpenCart} style={{ position: 'relative', display: 'flex', alignItems: 'center', transition: 'opacity 0.2s' }} onMouseEnter={e => e.currentTarget.style.opacity = '0.5'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
          <ShoppingBag size={18} />
          {cartCount > 0 && <span style={{ position: 'absolute', top: -7, right: -7, background: 'var(--blue)', color: '#fff', borderRadius: '50%', width: 17, height: 17, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700 }}>{cartCount}</span>}
        </button>
      </div>

      <div style={{ position: 'relative', height: 420, overflow: 'hidden' }}>
        <img src="/imagenes/Imagenchica.png" alt="Colección Mujer" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(6,13,26,0.82) 40%, rgba(6,13,26,0.2) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--blue-bright)', marginBottom: 14 }}>
            Colección Exclusiva
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }} style={{ fontSize: 'clamp(48px, 6vw, 88px)', fontWeight: 800, color: '#fff', lineHeight: 0.92, letterSpacing: '-0.02em' }}>
            Mujer
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', marginTop: 18, maxWidth: 380 }}>
            Elegancia sin límites. Actitud sin filtros.
          </motion.p>
        </div>
      </div>

      <div style={{ padding: '72px 72px 100px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 52 }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: 8 }}>Selección Curada</p>
            <h2 style={{ fontSize: 'clamp(28px, 3vw, 48px)', fontWeight: 800, color: 'var(--black)', lineHeight: 1 }}>Modelos Mujer</h2>
          </div>
          <p style={{ fontSize: 13, color: 'var(--gray-400)' }}>{mujerProducts.length} modelos disponibles</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '48px 28px' }}>
          {mujerProducts.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} onAdd={onAdd} onProductClick={onProductClick} />
          ))}
        </div>
      </div>

      <Footer />
    </motion.div>
  )
}
