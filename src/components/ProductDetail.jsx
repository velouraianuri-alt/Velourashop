import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag, ChevronDown, Sun, Shield, Layers, Heart, Star, ArrowLeft } from 'lucide-react'

const featureBadges = [
  { icon: Sun, title: 'Protección UV400', desc: 'Bloquea el 100% de los rayos UVA y UVB' },
  { icon: Shield, title: 'Garantía de por vida', desc: 'Satisfecho o te devolvemos el dinero en 30 días' },
  { icon: Layers, title: 'Policarbonato de alta resistencia', desc: 'Resistente, ligero y diseñado para durar' },
  { icon: Heart, title: 'Montura ultraligera', desc: 'Comodidad durante todo el día, sin marcas' },
]

const accordionData = [
  {
    title: 'Características',
    content: 'Montura de acetato premium de alta resistencia. Cristales polarizados con protección UV400 que bloquean el 100% de los rayos UVA y UVB. Bisagras de barril de acero inoxidable con ajuste de precisión. Disponible en múltiples colores de cristal.',
  },
  {
    title: 'Información sobre el Envío',
    content: 'Envío gratuito en pedidos superiores a 50€. Entrega en 24-48h en península, 3-5 días en islas. Seguimiento en tiempo real incluido. Embalaje premium reciclable.',
  },
  {
    title: 'Devoluciones Fáciles en 30 Días',
    content: 'Si no estás 100% satisfecho, devuelves sin coste y sin preguntas en 30 días. Solo necesitas el embalaje original. Te reembolsamos en menos de 5 días hábiles.',
  },
]

function AccordionItem({ item }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid var(--gray-200)' }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '18px 0',
          fontFamily: 'var(--font-body)',
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--black)',
        }}
      >
        {item.title}
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown size={16} />
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
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              color: 'var(--gray-600)',
              lineHeight: 1.75,
              paddingBottom: 18,
            }}>
              {item.content}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ProductDetail({ product, onClose, onAdd }) {
  const [mainImg, setMainImg] = useState(0)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const [selectedColor, setSelectedColor] = useState(0)

  const hasColors = product.colors && product.colors.length > 0
  const currentColor = hasColors ? product.colors[selectedColor] : null
  const images = hasColors ? currentColor.images : [product.imgDefault, product.imgHover]

  useEffect(() => {
    setMainImg(0)
    setQty(1)
    setAdded(false)
    setSelectedColor(0)
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [product.id])

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const handleAdd = () => {
    onAdd(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(6,13,26,0.55)',
          zIndex: 300,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          backdropFilter: 'blur(4px)',
        }}
        onClick={e => { if (e.target === e.currentTarget) onClose() }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: 'var(--white)',
            borderRadius: 12,
            width: '100%',
            maxWidth: 1100,
            maxHeight: '92vh',
            overflowY: 'auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            position: 'relative',
          }}
        >
          {/* Close */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: 'rgba(10,11,14,0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(10,11,14,0.14)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(10,11,14,0.06)'}
          >
            <X size={18} />
          </button>

          {/* LEFT — Gallery */}
          <div style={{ padding: '32px 24px 32px 32px' }}>
            {/* Main image */}
            <div style={{
              width: '100%',
              aspectRatio: '1/1',
              borderRadius: 8,
              overflow: 'hidden',
              background: 'var(--gray-100)',
              marginBottom: 14,
            }}>
              <motion.img
                key={mainImg}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
                src={images[mainImg]}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Thumbnails */}
            <div style={{ display: 'flex', gap: 10 }}>
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setMainImg(i)}
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: 6,
                    overflow: 'hidden',
                    border: `2px solid ${i === mainImg ? 'var(--blue)' : 'var(--gray-200)'}`,
                    transition: 'border-color 0.2s',
                    flexShrink: 0,
                  }}
                >
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT — Info */}
          <div style={{ padding: '48px 32px 32px 24px', display: 'flex', flexDirection: 'column' }}>
            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
              <div style={{ display: 'flex', gap: 2 }}>
                {[1,2,3,4,5].map(s => <Star key={s} size={13} fill="var(--blue)" color="var(--blue)" />)}
              </div>
              <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>4.9 (127 reseñas)</span>
            </div>

            {/* Name */}
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 3vw, 40px)',
              fontWeight: 700,
              lineHeight: 1.1,
              color: 'var(--black)',
              marginBottom: 14,
            }}>
              {product.name}
            </h1>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid var(--gray-200)' }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: 36,
                fontWeight: 700,
                color: 'var(--blue)',
              }}>
                35,00€
              </span>
              <span style={{
                fontSize: 20,
                color: 'var(--gray-400)',
                textDecoration: 'line-through',
              }}>
                49,99€
              </span>
              <span style={{
                background: 'var(--blue)',
                color: 'var(--white)',
                fontSize: 11,
                fontWeight: 700,
                padding: '3px 8px',
                borderRadius: 3,
                letterSpacing: '0.1em',
              }}>
                −30%
              </span>
            </div>

            {/* Color / Variant selector */}
            {hasColors && (
              <div style={{ marginBottom: 24 }}>
                <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gray-600)', marginBottom: 12 }}>
                  Color: <span style={{ color: 'var(--black)', fontWeight: 700 }}>
                    {currentColor.name}
                  </span>
                </p>
                <div style={{ display: 'flex', gap: 10 }}>
                  {product.colors.map((color, i) => (
                    <button
                      key={i}
                      onClick={() => { setSelectedColor(i); setMainImg(0) }}
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: 6,
                        border: `2px solid ${i === selectedColor ? 'var(--blue)' : 'var(--gray-200)'}`,
                        transition: 'border-color 0.2s, transform 0.15s',
                        transform: i === selectedColor ? 'scale(1.06)' : 'scale(1)',
                        background: color.swatch,
                        cursor: 'pointer',
                        padding: 0,
                      }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Add to cart */}
            <motion.button
              onClick={handleAdd}
              whileTap={{ scale: 0.97 }}
              style={{
                width: '100%',
                padding: '18px',
                background: added ? '#16a34a' : 'var(--navy)',
                color: 'var(--white)',
                fontFamily: 'var(--font-body)',
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                borderRadius: 6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                transition: 'background 0.3s',
                marginBottom: 12,
              }}
              onMouseEnter={e => { if (!added) e.currentTarget.style.background = 'var(--blue)' }}
              onMouseLeave={e => { if (!added) e.currentTarget.style.background = 'var(--navy)' }}
            >
              <ShoppingBag size={16} />
              {added ? '¡Añadido a la bolsa! ✓' : 'Añadir a la cesta'}
            </motion.button>

            <p style={{ fontSize: 11, color: 'var(--gray-400)', textAlign: 'center', marginBottom: 24, letterSpacing: '0.04em' }}>
              Envío gratuito · Devolución gratuita en 30 días
            </p>

            {/* Feature badges */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 12,
              marginBottom: 24,
            }}>
              {featureBadges.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  style={{
                    display: 'flex',
                    gap: 10,
                    padding: '12px',
                    background: 'var(--gray-100)',
                    borderRadius: 8,
                    alignItems: 'flex-start',
                  }}
                >
                  <Icon size={16} color="var(--blue)" style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--black)', marginBottom: 2 }}>{title}</p>
                    <p style={{ fontSize: 11, color: 'var(--gray-600)', lineHeight: 1.45 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Accordion */}
            <div>
              {accordionData.map(item => (
                <AccordionItem key={item.title} item={item} />
              ))}
            </div>
          </div>

          {/* Mobile */}
          <style>{`
            @media (max-width: 768px) {
              .product-detail-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
