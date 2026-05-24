import { useRef, useState } from 'react'

const items = [
  { name: 'Aura Classic',   tag: 'Best Seller', img: '/imagenes/numero1.png' },
  { name: 'Midnight Slim',  tag: 'New Drop',    img: '/imagenes/numero2.png' },
  { name: 'Urban Shield',   tag: 'Limited',     img: '/imagenes/numero3.png' },
  { name: 'Coastal Drift',  tag: 'Exclusive',   img: '/imagenes/numero4.png' },
  { name: 'Shadow Round',   tag: null,           img: '/imagenes/numero5.png' },
  { name: 'Vintage Lady',   tag: 'Best Seller', img: '/imagenes/custom-high-quality-uv400-ladys-shades-wholesale-vintage/7b887131-faff-4250-9c34-c73fb218090b.png' },
  { name: 'Italian Glam',   tag: 'New Drop',    img: '/imagenes/italian-luxury-eyewear-new-model/8d4e7346-7fe2-4ba7-ac44-7c961cc0e088.png' },
  { name: 'Crystal Street', tag: 'Exclusive',   img: '/imagenes/transparent-new-cat3-luxury-street-wear-glasses/2de9dc94-71de-4b7e-871b-c9ac35a71117.png' },
  { name: 'Retro Ace',      tag: 'Limited',     img: '/imagenes/custom-retro-shades-biodegradable-acetate-sunglasses-for-men-high-quality/61d8f823-be25-494d-b7c0-109f776fd4c0.png' },
  { name: 'Classic Pro',    tag: null,           img: '/imagenes/high-quality-sunglasses-manufacturer/0ce621d9-03c3-4483-b19a-69b687439400.png' },
  { name: 'Vintage Square', tag: 'Exclusive',   img: '/imagenes/lma-1025-vintage-oversize-square-classic/cecab9c2-15ff-4a2e-aa41-3bb5b33fe309.png' },
]

// Triple the items so the loop is seamless
const track = [...items, ...items, ...items]

function MarqueeCard({ item, reversed }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flexShrink: 0,
        width: 180,
        margin: '0 14px',
        cursor: 'pointer',
        transition: 'transform 0.35s ease',
        transform: hovered ? 'scale(1.06) translateY(-4px)' : 'scale(1) translateY(0)',
      }}
    >
      <div style={{
        width: 180,
        height: 180,
        borderRadius: 16,
        overflow: 'hidden',
        background: '#fafafa',
        border: '1px solid #efefef',
        position: 'relative',
        marginBottom: 14,
        transition: 'box-shadow 0.35s ease',
        boxShadow: hovered ? '0 20px 48px rgba(0,0,0,0.18)' : '0 2px 12px rgba(0,0,0,0.06)',
      }}>
        <img
          src={item.img}
          alt={item.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            padding: '14%',
            transition: 'transform 0.5s ease',
            transform: hovered ? 'scale(1.08)' : 'scale(1)',
          }}
        />
        {item.tag && (
          <div style={{
            position: 'absolute', top: 10, left: 10,
            background: 'var(--blue)', color: '#fff',
            padding: '3px 8px', fontSize: 8, fontWeight: 800,
            letterSpacing: '0.14em', textTransform: 'uppercase', borderRadius: 4,
          }}>
            {item.tag}
          </div>
        )}
      </div>
      <p style={{
        fontSize: 12, fontWeight: 700, letterSpacing: '0.06em',
        color: 'var(--black)',
        marginBottom: 2, textAlign: 'center',
      }}>
        {item.name}
      </p>
      <p style={{
        fontSize: 11, fontWeight: 600, color: 'var(--blue)',
        textAlign: 'center', letterSpacing: '0.04em',
      }}>
        35,00 €
      </p>
    </div>
  )
}

function MarqueeRow({ reversed }) {
  const rowRef = useRef(null)

  const handleMouseEnter = () => {
    if (rowRef.current) rowRef.current.style.animationPlayState = 'paused'
  }
  const handleMouseLeave = () => {
    if (rowRef.current) rowRef.current.style.animationPlayState = 'running'
  }

  const animName = reversed ? 'marquee-right' : 'marquee-left'

  return (
    <div
      style={{ overflow: 'hidden', width: '100%', padding: '12px 0' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={rowRef}
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          animation: `${animName} ${reversed ? 55 : 45}s linear infinite`,
          width: 'max-content',
        }}
      >
        {track.map((item, i) => (
          <MarqueeCard key={i} item={item} reversed={reversed} />
        ))}
      </div>
    </div>
  )
}

export default function ProductMarquee() {
  return (
    <section className="product-marquee-section" style={{ background: '#fff', padding: '72px 0', overflow: 'hidden', position: 'relative', borderTop: '1px solid #f0f0f0', borderBottom: '1px solid #f0f0f0' }}>
      {/* Fade edges */}
      <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 120, background: 'linear-gradient(to right, #fff 40%, transparent)', zIndex: 2, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: 120, background: 'linear-gradient(to left, #fff 40%, transparent)', zIndex: 2, pointerEvents: 'none' }} />

      {/* Header */}
      <div className="product-marquee-header" style={{ textAlign: 'center', marginBottom: 48, position: 'relative', zIndex: 3, padding: '0 20px' }}>
        <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: 10 }}>
          The full collection
        </p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 800, color: 'var(--black)', letterSpacing: '-0.02em', lineHeight: 1 }}>
          VELHOURA <em style={{ fontStyle: 'italic', color: 'var(--blue)' }}>Models</em>
        </h2>
      </div>

      {/* Single row */}
      <MarqueeRow reversed={false} />

      <style>{`
        @keyframes marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
      `}</style>
    </section>
  )
}
