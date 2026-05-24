import { useState, useCallback, useRef, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import { useProducts } from './hooks/useProducts'
import { createCheckout, PROTECTION_VARIANT_ID } from './shopify'

function FlyingBag({ from, to, onDone }) {
  const SIZE = 38
  const sx = from.left + from.width / 2 - SIZE / 2
  const sy = from.top + from.height / 2 - SIZE / 2
  const ex = to.left + to.width / 2 - SIZE / 2
  const ey = to.top + to.height / 2 - SIZE / 2
  const mx = sx + (ex - sx) * 0.35
  const my = Math.min(sy, ey) - 140

  return (
    <motion.div
      initial={{ x: sx, y: sy, scale: 1, opacity: 1 }}
      animate={{ x: [sx, mx, ex], y: [sy, my, ey], scale: [1, 1.2, 0.18], opacity: [1, 1, 0] }}
      transition={{ duration: 0.68, ease: [0.25, 0.46, 0.45, 0.94], times: [0, 0.48, 1] }}
      onAnimationComplete={onDone}
      style={{
        position: 'fixed', top: 0, left: 0, width: SIZE, height: SIZE,
        borderRadius: '50%', background: 'var(--blue)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none', zIndex: 9999,
        boxShadow: '0 6px 20px rgba(27,79,204,0.45)',
      }}
    >
      <ShoppingBag size={17} color="white" />
    </motion.div>
  )
}
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FeaturedProducts from './components/FeaturedProducts'
import Gallery from './components/Gallery'
import VideoSection from './components/VideoSection'
import Benefits from './components/Benefits'
import Testimonials from './components/Testimonials'
import CTASection from './components/CTASection'
import ProductMarquee from './components/ProductMarquee'
import CartDrawer from './components/CartDrawer'
import Toast from './components/Toast'
import Footer from './components/Footer'
import ProductPage from './components/ProductPage'
import MujerPage from './components/MujerPage'
import HombrePage from './components/HombrePage'
import HistoriaPage from './components/HistoriaPage'
import IbizaCollection from './components/IbizaCollection'
import OfferPopup from './components/OfferPopup'
import FloatingOffer from './components/FloatingOffer'
import AuthModal from './components/AuthModal'

let toastId = 0

export default function App() {
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [toasts, setToasts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [currentSection, setCurrentSection] = useState(null)
  const [authOpen, setAuthOpen] = useState(false)
  const [flyItems, setFlyItems] = useState([])
  const [cartBounce, setCartBounce] = useState(false)
  const cartRef = useRef(null)

  // Cargar productos de Shopify
  const { products, loading, error } = useProducts()

  // Deep link: si la URL tiene #shop al cargar, scroll directo a productos
  useEffect(() => {
    if (window.location.hash === '#shop') {
      const el = document.getElementById('shop')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      } else {
        // Espera a que el componente se monte
        const t = setTimeout(() => {
          document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })
        }, 600)
        return () => clearTimeout(t)
      }
    }
  }, [])

  const addToast = useCallback((message) => {
    const id = ++toastId
    setToasts(prev => [...prev, { id, message }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 2800)
  }, [])

  const handleAddToCart = useCallback((product, colorIdx = 0, sourceRect) => {
    setCartItems(prev => {
      const cartItemKey = `${product.id}-color-${colorIdx}`
      const existing = prev.find(i => i.cartItemKey === cartItemKey)

      if (existing) {
        return prev.map(i => i.cartItemKey === cartItemKey ? { ...i, qty: i.qty + 1 } : i)
      }

      const variantId = product.colors
        ? product.colors[colorIdx]?.variantId
        : product.variants?.[0]?.id

      const newItem = {
        ...product,
        qty: 1,
        cartItemKey,
        colorIdx,
        color: product.colors ? product.colors[colorIdx]?.name : undefined,
        imgDefault: product.colors ? product.colors[colorIdx]?.images[0] : product.imgDefault,
        variantId,
      }
      return [...prev, newItem]
    })
    addToast(`${product.name} añadido a la bolsa`)

    if (sourceRect && cartRef.current) {
      const targetRect = cartRef.current.getBoundingClientRect()
      const id = Date.now()
      setFlyItems(prev => [...prev, { id, sourceRect, targetRect }])
    }
  }, [addToast])

  const handleIncrease = useCallback((id) => {
    setCartItems(prev => prev.map(i => (i.cartItemKey === id || i.id === id) ? { ...i, qty: i.qty + 1 } : i))
  }, [])

  const handleDecrease = useCallback((id) => {
    setCartItems(prev => {
      const item = prev.find(i => i.cartItemKey === id || i.id === id)
      if (item?.qty <= 1) return prev.filter(i => i.cartItemKey !== id && i.id !== id)
      return prev.map(i => (i.cartItemKey === id || i.id === id) ? { ...i, qty: i.qty - 1 } : i)
    })
  }, [])

  const handleRemove = useCallback((id) => {
    setCartItems(prev => prev.filter(i => i.cartItemKey !== id && i.id !== id))
  }, [])

  const handleCheckout = useCallback(async (withProtection = false) => {
    const lineItems = cartItems
      .filter(i => i.variantId)
      .map(i => ({ variantId: i.variantId, quantity: i.qty }))

    if (lineItems.length === 0) return

    if (withProtection && PROTECTION_VARIANT_ID) {
      lineItems.push({ variantId: PROTECTION_VARIANT_ID, quantity: 1 })
    }

    setCheckoutLoading(true)
    try {
      const checkout = await createCheckout(lineItems)
      if (checkout?.webUrl) {
        window.location.href = checkout.webUrl
      }
    } finally {
      setCheckoutLoading(false)
    }
  }, [cartItems])

  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0)

  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-40px' })

  return (
    <>
      <Navbar cartCount={cartCount} onCartOpen={() => setCartOpen(true)} onSectionOpen={setCurrentSection} onAuthOpen={() => setAuthOpen(true)} onProductClose={() => setSelectedProduct(null)} cartRef={cartRef} cartBounce={cartBounce} />

      <AnimatePresence>
        {flyItems.map(({ id, sourceRect, targetRect }) => (
          <FlyingBag
            key={id}
            from={sourceRect}
            to={targetRect}
            onDone={() => {
              setFlyItems(prev => prev.filter(f => f.id !== id))
              setCartBounce(true)
              setTimeout(() => setCartBounce(false), 500)
            }}
          />
        ))}
      </AnimatePresence>

      <main>
        <Hero onShopClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })} />

        {/* Stats bar */}
        <div
          ref={statsRef}
          className="velhoura-stats"
          style={{
            background: 'var(--navy)',
            padding: '40px 72px',
            display: 'flex',
            justifyContent: 'center',
            gap: 60,
            flexWrap: 'wrap',
          }}
        >
          {[['8K+', 'Clientes Satisfechos'], ['50+', 'Modelos Exclusivos'], ['48h', 'Envío Express'], ['30 días', 'Devoluciones Gratis']].map(([num, label], i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ textAlign: 'center' }}
            >
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 38,
                fontWeight: 700,
                lineHeight: 1,
                color: 'var(--white)',
                marginBottom: 8,
              }}>
                {num}
              </div>
              <div style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--blue-bright)',
              }}>
                {label}
              </div>
            </motion.div>
          ))}
        </div>

        <FeaturedProducts
          products={products}
          loading={loading}
          error={error}
          onAdd={handleAddToCart}
          onProductClick={setSelectedProduct}
        />
        <ProductMarquee />
        <Gallery />
        <VideoSection />
        <Benefits />
        <Testimonials />
        <CTASection onShopClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })} />
      </main>

      <Footer />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
        onRemove={handleRemove}
        onCheckout={handleCheckout}
        checkoutLoading={checkoutLoading}
      />

      <AnimatePresence>
        {currentSection === 'mujer' && (
          <MujerPage
            key="mujer"
            onClose={() => setCurrentSection(null)}
            onAdd={handleAddToCart}
            onProductClick={setSelectedProduct}
            cartItems={cartItems}
            onOpenCart={() => { setCurrentSection(null); setCartOpen(true) }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {currentSection === 'hombre' && (
          <HombrePage
            key="hombre"
            onClose={() => setCurrentSection(null)}
            onAdd={handleAddToCart}
            onProductClick={setSelectedProduct}
            cartItems={cartItems}
            onOpenCart={() => { setCurrentSection(null); setCartOpen(true) }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {currentSection === 'historia' && (
          <HistoriaPage
            key="historia"
            onClose={() => setCurrentSection(null)}
            cartItems={cartItems}
            onOpenCart={() => { setCurrentSection(null); setCartOpen(true) }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {currentSection === 'ibizacollection' && (
          <IbizaCollection
            key="ibizacollection"
            onClose={() => setCurrentSection(null)}
            cartItems={cartItems}
            onOpenCart={() => { setCurrentSection(null); setCartOpen(true) }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedProduct && (
          <ProductPage
            key={selectedProduct.id}
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAdd={handleAddToCart}
            cartItems={cartItems}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            onRemove={handleRemove}
            onOpenCart={() => setCartOpen(true)}
          />
        )}
      </AnimatePresence>

      <OfferPopup />
      <FloatingOffer />

      <AnimatePresence>
        {authOpen && <AuthModal key="auth" onClose={() => setAuthOpen(false)} />}
      </AnimatePresence>

      <Toast toasts={toasts} />
    </>
  )
}
