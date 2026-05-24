import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, Loader } from 'lucide-react'

export default function StripeCheckout({ open, onClose, total, items }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [stripe, setStripe] = useState(null)
  const [elements, setElements] = useState(null)
  const [cardElement, setCardElement] = useState(null)

  useEffect(() => {
    if (!open) return

    // Load Stripe.js
    const script = document.createElement('script')
    script.src = 'https://js.stripe.com/v3/'
    script.async = true
    script.onload = () => {
      const stripeInstance = window.Stripe('pk_test_51QdB3sKHMjH7gxqfKD7vOkB7JqJxNWZKvH7xY0wZ0wZ0wZ0wZ0wZ0wZ0wZ')
      setStripe(stripeInstance)

      const elementsInstance = stripeInstance.elements()
      setElements(elementsInstance)

      const card = elementsInstance.create('card', {
        style: {
          base: {
            fontSize: '16px',
            color: '#424770',
            '::placeholder': { color: '#aab7c4' }
          },
          invalid: { color: '#fa755a' }
        }
      })

      card.mount('#card-element')
      setCardElement(card)
    }
    document.head.appendChild(script)

    return () => {
      if (cardElement) cardElement.unmount()
    }
  }, [open])

  const handlePayment = async (e) => {
    e.preventDefault()
    if (!stripe || !cardElement) return

    setLoading(true)
    setError(null)

    try {
      // Create payment method
      const { paymentMethod, error: methodError } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: document.getElementById('cardholder-name')?.value || 'Customer'
        }
      })

      if (methodError) {
        setError(methodError.message)
        setLoading(false)
        return
      }

      // Simulate successful payment (en demostración)
      // En producción, harías una solicitud a tu servidor backend
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Success
      const successMessage = `¡Pago de €${total.toFixed(2)} realizado exitosamente!

Número de transacción: ${paymentMethod.id.slice(0, 12).toUpperCase()}

Gracias por tu compra en VELHOURA.`

      alert(successMessage)
      onClose()
      setLoading(false)

      // Clear cart (en una app real, el servidor haría esto)
      window.location.reload()
    } catch (err) {
      setError(err.message || 'Error al procesar el pago')
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.5)',
        zIndex: 50000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(4px)'
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onClick={e => e.stopPropagation()}
        className="stripe-checkout-modal"
        style={{
          background: 'white',
          borderRadius: 16,
          width: '90%',
          maxWidth: 500,
          padding: 40,
          maxHeight: '92vh',
          overflowY: 'auto',
          boxShadow: '0 20px 80px rgba(0,0,0,0.3)',
          position: 'relative'
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            background: '#e5e7eb',
            border: 'none',
            borderRadius: 6,
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#d1d5db'}
          onMouseLeave={e => e.currentTarget.style.background = '#e5e7eb'}
        >
          <X size={18} />
        </button>

        <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 10, color: 'var(--black)' }}>
          Checkout
        </h2>
        <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 28 }}>
          Total: <span style={{ fontWeight: 700, color: 'var(--black)' }}>€{total.toFixed(2)}</span>
        </p>

        <form onSubmit={handlePayment} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Cardholder name */}
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: 'var(--black)' }}>
              Nombre del titular
            </label>
            <input
              id="cardholder-name"
              type="text"
              placeholder="John Doe"
              required
              style={{
                width: '100%',
                padding: '12px 14px',
                border: '1.5px solid #e5e7eb',
                borderRadius: 6,
                fontSize: 14,
                fontFamily: 'inherit',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={e => e.target.style.borderColor = 'var(--blue)'}
              onBlur={e => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>

          {/* Card element */}
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: 'var(--black)' }}>
              Datos de la tarjeta
            </label>
            <div
              id="card-element"
              style={{
                padding: '12px 14px',
                border: '1.5px solid #e5e7eb',
                borderRadius: 6,
                background: 'white'
              }}
            />
          </div>

          {/* Error message */}
          {error && (
            <div style={{
              padding: 12,
              background: '#fee2e2',
              border: '1px solid #fecaca',
              borderRadius: 6,
              fontSize: 13,
              color: '#dc2626'
            }}>
              {error}
            </div>
          )}

          {/* Submit button */}
          <motion.button
            type="submit"
            disabled={loading || !stripe || !cardElement}
            whileTap={{ scale: 0.97 }}
            style={{
              width: '100%',
              padding: 16,
              background: loading || !stripe || !cardElement ? '#d1d5db' : 'var(--black)',
              color: 'white',
              fontSize: 15,
              fontWeight: 700,
              borderRadius: 8,
              border: 'none',
              cursor: loading || !stripe || !cardElement ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              transition: 'background 0.2s',
              letterSpacing: '0.02em'
            }}
          >
            {loading ? (
              <>
                <Loader size={16} style={{ animation: 'spin 1s linear infinite' }} />
                Procesando...
              </>
            ) : (
              `Pagar €${total.toFixed(2)}`
            )}
          </motion.button>

          <p style={{
            fontSize: 11,
            color: '#9ca3af',
            textAlign: 'center',
            marginTop: 8
          }}>
            Esta es una transacción de prueba. Usa tarjeta de prueba: 4242 4242 4242 4242
          </p>
        </form>
      </motion.div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </motion.div>
  )
}
