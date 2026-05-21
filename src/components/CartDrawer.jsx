import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, Trash2, ShoppingBag, Truck } from 'lucide-react'

const FREE_SHIPPING_THRESHOLD = 100

function ShippingBar({ subtotal }) {
  const pct = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)
  const unlocked = subtotal >= FREE_SHIPPING_THRESHOLD

  return (
    <div style={{ padding: '14px 24px', borderBottom: '1px solid #f0f0f0' }}>
      <p style={{
        textAlign: 'center',
        fontSize: 12,
        fontWeight: 800,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        marginBottom: 10,
        color: unlocked ? '#16a34a' : 'var(--black)',
      }}>
        {unlocked ? '¡Envío gratuito desbloqueado!' : `Te faltan €${(FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2)} para envío gratis`}
      </p>
      <div style={{ position: 'relative', height: 6, background: '#e5e7eb', borderRadius: 99, overflow: 'visible' }}>
        <div style={{
          height: '100%',
          width: `${pct}%`,
          background: 'var(--black)',
          borderRadius: 99,
          transition: 'width 0.4s ease',
        }} />
        <div style={{
          position: 'absolute',
          right: unlocked ? -2 : `${100 - pct}%`,
          top: '50%',
          transform: 'translate(50%, -50%)',
          width: 28,
          height: 28,
          background: 'var(--black)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'right 0.4s ease',
          boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
        }}>
          <Truck size={13} color="white" />
        </div>
      </div>
      {unlocked && (
        <p style={{ textAlign: 'right', fontSize: 11, color: '#16a34a', marginTop: 8, fontWeight: 600 }}>
          Envío gratuito
        </p>
      )}
    </div>
  )
}

function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  const originalPrice = item.price * 1.45
  const saving = originalPrice - item.price

  return (
    <div style={{ display: 'flex', gap: 14, padding: '18px 0', borderBottom: '1px solid #f0f0f0' }}>
      <div style={{
        width: 72,
        height: 80,
        borderRadius: 8,
        flexShrink: 0,
        overflow: 'hidden',
        background: '#f5f5f5',
      }}>
        {item.imgDefault ? (
          <img src={item.imgDefault} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShoppingBag size={20} color="#ccc" />
          </div>
        )}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
          <div>
            <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--black)', marginBottom: 2 }}>{item.name}</p>
            {item.color && (
              <p style={{ fontSize: 12, color: '#9ca3af' }}>Color: {item.color}</p>
            )}
          </div>
          <button
            onClick={() => onRemove(item.cartItemKey || item.id)}
            style={{ color: '#9ca3af', padding: 2, flexShrink: 0, transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#ef4444'}
            onMouseLeave={e => e.currentTarget.style.color = '#9ca3af'}
          >
            <Trash2 size={15} />
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, margin: '6px 0 10px' }}>
          <span style={{ fontSize: 13, color: '#9ca3af', textDecoration: 'line-through' }}>
            €{originalPrice.toFixed(2)}
          </span>
          <span style={{ fontSize: 15, fontWeight: 800, color: 'var(--black)' }}>
            €{item.price.toFixed(2)}
          </span>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#ef4444' }}>
            (Ahorras €{saving.toFixed(2)})
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          <button
            onClick={() => onDecrease(item.cartItemKey || item.id)}
            style={{
              width: 28, height: 28,
              border: '1.5px solid #e5e7eb',
              borderRadius: '4px 0 0 4px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'white', transition: 'background 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#f3f4f6'}
            onMouseLeave={e => e.currentTarget.style.background = 'white'}
          >
            <Minus size={11} />
          </button>
          <span style={{
            width: 36, height: 28,
            border: '1.5px solid #e5e7eb',
            borderLeft: 'none', borderRight: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, fontWeight: 700,
          }}>
            {item.qty}
          </span>
          <button
            onClick={() => onIncrease(item.cartItemKey || item.id)}
            style={{
              width: 28, height: 28,
              border: '1.5px solid #e5e7eb',
              borderRadius: '0 4px 4px 0',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'white', transition: 'background 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#f3f4f6'}
            onMouseLeave={e => e.currentTarget.style.background = 'white'}
          >
            <Plus size={11} />
          </button>
        </div>
      </div>
    </div>
  )
}

function ShippingProtection({ enabled, onToggle }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '14px 16px',
      background: '#f9fafb',
      borderRadius: 10,
      margin: '12px 0',
    }}>
      <div style={{
        width: 44, height: 44, flexShrink: 0,
        background: '#dbeafe', borderRadius: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 22,
      }}>
        🛡️
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--black)' }}>Protección de envío</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--black)' }}>€2,95</span>
        </div>
        <p style={{ fontSize: 11, color: '#9ca3af', marginTop: 2, lineHeight: 1.4 }}>
          Protege tu pedido contra daños, pérdida o robo durante el envío.
        </p>
      </div>
      <button
        onClick={onToggle}
        style={{
          width: 44, height: 24,
          borderRadius: 99,
          background: enabled ? 'var(--blue)' : '#d1d5db',
          position: 'relative',
          flexShrink: 0,
          transition: 'background 0.2s',
        }}
      >
        <span style={{
          position: 'absolute',
          top: 2, left: enabled ? 22 : 2,
          width: 20, height: 20,
          background: 'white',
          borderRadius: '50%',
          transition: 'left 0.2s',
          boxShadow: '0 1px 4px rgba(0,0,0,0.18)',
        }} />
      </button>
    </div>
  )
}

const PAYMENT_ICONS = [
  { type: 'img',  src: '/payment/visa.svg',        label: 'Visa' },
  { type: 'img',  src: '/payment/mastercard.svg',  label: 'Mastercard' },
  { type: 'img',  src: '/payment/amex.svg',        label: 'Amex' },
  { type: 'img',  src: '/payment/paypal.svg',      label: 'PayPal' },
  { type: 'img',  src: '/payment/maestro.svg',     label: 'Maestro' },
  {
    type: 'custom', label: 'Apple Pay',
    render: () => (
      <svg viewBox="0 0 70 26" width="70" height="26" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.2 7.8c.8-1 .7-2.2.7-2.2s-1 .1-1.8.7c-.8.5-1.3 1.5-1.2 2.5 1 0 1.6-.4 2.3-1z" fill="#111"/>
        <path d="M12.1 9.4c-1.4-.1-2.5.8-3.1.8-.7 0-1.7-.7-2.8-.7-1.5.1-2.8.9-3.5 2.2-1.5 2.6-.4 6.5 1.1 8.6.7 1 1.6 2.2 2.8 2.2 1.1-.1 1.5-.7 2.8-.7 1.2 0 1.6.7 2.8.7 1.2-.1 1.9-1 2.6-2 .5-.7.9-1.4 1.1-2.2-2.9-1-3-5 0-6.3-.9-1.3-1.2-3-.5-4-.7.2-1.4.2-3.3 1.4z" fill="#111"/>
        <text x="21" y="18" fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif" fontWeight="500" fontSize="13" fill="#111">Pay</text>
      </svg>
    ),
  },
  {
    type: 'custom', label: 'Google Pay',
    render: () => (
      <svg viewBox="0 0 72 26" width="72" height="26" xmlns="http://www.w3.org/2000/svg">
        <text x="4" y="18" fontFamily="'Google Sans', Roboto, system-ui, sans-serif" fontSize="14" fontWeight="500">
          <tspan fill="#4285F4">G</tspan><tspan fill="#EA4335">o</tspan><tspan fill="#FBBC05">o</tspan><tspan fill="#4285F4">g</tspan><tspan fill="#34A853">l</tspan><tspan fill="#EA4335">e</tspan>
          <tspan fill="#5F6368" fontSize="12" dx="2">Pay</tspan>
        </text>
      </svg>
    ),
  },
]

export default function CartDrawer({ open, onClose, items, onIncrease, onDecrease, onRemove, onCheckout }) {
  const [shippingProtection, setShippingProtection] = useState(false)
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)

  const count = items.reduce((sum, i) => sum + i.qty, 0)

  // Buy 2 Get 1 Free: only if qty is exactly 2, otherwise pay full price
  const subtotalWithPromo = items.reduce((sum, i) => {
    const payQty = i.qty === 2 ? 1 : i.qty
    return sum + i.price * payQty
  }, 0)

  const subtotal = subtotalWithPromo
  const protectionFee = shippingProtection ? 2.95 : 0
  const discount = promoApplied ? Math.round(subtotal * 0.1 * 100) / 100 : 0
  const total = subtotal - discount + protectionFee
  const hasItems = items.length > 0

  const applyPromo = () => {
    if (promoCode.toUpperCase() === 'VELOURA10') {
      setPromoApplied(true)
    }
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', zIndex: 9999, backdropFilter: 'blur(3px)' }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: 0, right: 0, bottom: 0,
              width: 420,
              maxWidth: '95vw',
              background: 'white',
              zIndex: 10001,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '-20px 0 60px rgba(0,0,0,0.12)',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '20px 24px 16px',
              borderBottom: '1px solid #f0f0f0',
              textAlign: 'center',
              position: 'relative',
            }}>
              <h2 style={{ fontSize: 22, fontWeight: 900, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--black)' }}>
                VELOURA
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, marginTop: 3 }}>
                <span style={{ fontSize: 10, color: '#6b7280' }}>Excellent</span>
                <span style={{ fontSize: 11, color: '#00b67a', fontWeight: 700 }}>4.7</span>
                <span style={{ fontSize: 10, color: '#6b7280' }}>out of 5</span>
                <span style={{ fontSize: 12, color: '#00b67a' }}>★</span>
                <span style={{ fontSize: 10, color: '#6b7280', fontWeight: 600 }}>Trustpilot</span>
              </div>
              <button
                onClick={onClose}
                style={{
                  position: 'absolute', top: 16, right: 20,
                  width: 32, height: 32,
                  background: '#e5e7eb',
                  borderRadius: 6,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#374151',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#d1d5db'}
                onMouseLeave={e => e.currentTarget.style.background = '#e5e7eb'}
              >
                <X size={15} />
              </button>
            </div>

            {/* Shipping bar */}
            {hasItems && <ShippingBar subtotal={subtotal} />}

            {/* Body */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '0 24px' }}>
              {!hasItems ? (
                <div style={{ textAlign: 'center', paddingTop: 80 }}>
                  <ShoppingBag size={48} color="#e5e7eb" style={{ margin: '0 auto 20px' }} />
                  <p style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: 'var(--black)' }}>Tu bolsa está vacía</p>
                  <p style={{ color: '#9ca3af', fontSize: 13 }}>Añade un modelo para empezar.</p>
                  <button
                    onClick={onClose}
                    style={{
                      marginTop: 24,
                      padding: '13px 32px',
                      background: 'var(--black)',
                      color: 'white',
                      borderRadius: 6,
                      fontSize: 13,
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Ver Colección
                  </button>
                </div>
              ) : (
                <>
                  {items.map(item => (
                    <CartItem key={item.id} item={item} onIncrease={onIncrease} onDecrease={onDecrease} onRemove={onRemove} />
                  ))}

                  {/* Buy 1 Get 1 Free upsell */}
                  {count === 1 && (
                    <div style={{
                      margin: '8px 0 4px',
                      padding: '16px',
                      background: '#fffbeb',
                      border: '1.5px dashed #fbbf24',
                      borderRadius: 10,
                      textAlign: 'center',
                    }}>
                      <p style={{ fontSize: 14, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--black)', marginBottom: 4 }}>
                        🎁 Llévate el 2.º gratis:
                      </p>
                      <p style={{ fontSize: 12, color: '#92400e' }}>
                        Añade otro artículo y te lo regalamos con la Spring Sale.
                      </p>
                    </div>
                  )}

                  <ShippingProtection enabled={shippingProtection} onToggle={() => setShippingProtection(v => !v)} />
                </>
              )}
            </div>

            {/* Footer */}
            {hasItems && (
              <div style={{ padding: '16px 24px', borderTop: '1px solid #f0f0f0' }}>
                {/* Promo code input */}
                <div style={{ display: 'flex', gap: 0, marginBottom: 14 }}>
                  <input
                    type="text"
                    placeholder="Código promocional"
                    value={promoCode}
                    onChange={e => setPromoCode(e.target.value)}
                    disabled={promoApplied}
                    style={{
                      flex: 1,
                      padding: '11px 14px',
                      border: '1.5px solid #e5e7eb',
                      borderRight: 'none',
                      borderRadius: '4px 0 0 4px',
                      fontFamily: 'var(--font-body)',
                      fontSize: 13,
                      outline: 'none',
                      backgroundColor: promoApplied ? '#f3f4f6' : 'white',
                      cursor: promoApplied ? 'not-allowed' : 'text'
                    }}
                  />
                  <button
                    onClick={applyPromo}
                    disabled={promoApplied}
                    style={{
                      padding: '11px 14px',
                      background: promoApplied ? 'var(--blue)' : 'var(--black)',
                      color: 'var(--white)',
                      borderRadius: '0 4px 4px 0',
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      cursor: promoApplied ? 'default' : 'pointer',
                      transition: 'background 0.2s',
                      border: 'none'
                    }}
                  >
                    {promoApplied ? '✓ Aplicado' : 'Aplicar'}
                  </button>
                </div>

                {/* Subtotal and discount */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, fontSize: 13, color: '#6b7280' }}>
                  <span>Subtotal</span>
                  <span>€{subtotal.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, fontSize: 13, color: '#16a34a' }}>
                    <span>Descuento (10%)</span>
                    <span>−€{discount.toFixed(2)}</span>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, paddingTop: 8, borderTop: '1px solid #f0f0f0' }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--black)' }}>Total</span>
                  <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--black)' }}>€{total.toFixed(2)}</span>
                </div>

                <button
                  onClick={onCheckout}
                  style={{
                    width: '100%',
                    padding: '17px',
                    background: 'var(--black)',
                    color: 'white',
                    fontSize: 15,
                    fontWeight: 800,
                    borderRadius: 8,
                    letterSpacing: '0.02em',
                    transition: 'opacity 0.2s',
                    cursor: 'pointer',
                    border: 'none'
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  Checkout · €{total.toFixed(2)}
                </button>

                {/* Payment methods */}
                <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 6, marginTop: 14 }}>
                  {PAYMENT_ICONS.map(({ type, src, label, render }) => (
                    <div key={label} style={{
                      padding: '4px 8px',
                      border: '1.5px solid #e5e7eb',
                      borderRadius: 6,
                      background: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: 34,
                    }}>
                      {type === 'img'
                        ? <img src={src} alt={label} style={{ width: 52, height: 26, objectFit: 'contain' }} />
                        : render()
                      }
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
