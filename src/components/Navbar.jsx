import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Menu, X, User } from 'lucide-react'

function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const calc = () => {
      const diff = Math.max(0, targetDate - Date.now())
      const totalSecs = Math.floor(diff / 1000)
      setTimeLeft({
        hours: Math.floor(totalSecs / 3600),
        minutes: Math.floor((totalSecs % 3600) / 60),
        seconds: totalSecs % 60,
      })
    }
    calc()
    const id = setInterval(calc, 1000)
    return () => clearInterval(id)
  }, [targetDate])

  return timeLeft
}

export default function Navbar({ cartCount = 0, onCartOpen, onSectionOpen, onAuthOpen, onProductClose, cartRef, cartBounce = false }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const saleEnd = useState(() => Date.now() + 12 * 60 * 60 * 1000)[0]
  const { hours, minutes, seconds } = useCountdown(saleEnd)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = ['Colecciones', 'Ibiza Collection', 'Historia', 'Contacto']

  const handleLinkClick = (e, link) => {
    e.preventDefault()
    onProductClose?.()
    if (link === 'Colecciones') {
      onSectionOpen?.(null)
      setMenuOpen(false)
    } else if (link === 'Historia' || link === 'Ibiza Collection') {
      onSectionOpen?.(link.toLowerCase().replace(' ', ''))
      setMenuOpen(false)
    }
  }

  const textColor = scrolled ? 'var(--black)' : 'var(--white)'
  const navBg = scrolled
    ? 'rgba(255,255,255,0.96)'
    : 'rgba(6,13,26,0.28)'
  const borderColor = scrolled ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.06)'

  return (
    <>
      {/* Sale countdown bar */}
      <div className="sale-bar" style={{
        background: 'var(--blue)',
        color: '#fff',
        height: 44,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 32,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10000,
      }}>
        <div className="sale-bar-label" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', lineHeight: 1.15 }}>
          <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase' }}>Spring Sale</span>
          <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.9 }}>Buy 1 Get 1 Free</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {[
            { val: hours, label: 'HRS' },
            { val: minutes, label: 'MIN' },
            { val: seconds, label: 'SECS' },
          ].map(({ val, label }, i) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {i > 0 && <span style={{ fontSize: 20, fontWeight: 700, opacity: 0.7, marginBottom: 10 }}>:</span>}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontSize: 20, fontWeight: 800, lineHeight: 1, fontVariantNumeric: 'tabular-nums', minWidth: 28, textAlign: 'center' }}>
                  {String(val).padStart(2, '0')}
                </span>
                <span style={{ fontSize: 8, fontWeight: 600, letterSpacing: '0.1em', opacity: 0.8 }}>{label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <motion.nav
        className="veloura-nav"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        style={{
          position: 'fixed',
          top: 44,
          left: 0,
          right: 0,
          zIndex: 9999,
          padding: '0 48px',
          height: 72,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: navBg,
          backdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${borderColor}`,
          transition: 'background 0.45s ease, border-color 0.45s ease, backdrop-filter 0.45s ease',
        }}
      >
        {/* Logo */}
        <a
          href="#"
          style={{
            fontFamily: 'var(--font-logo)',
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: textColor,
            transition: 'color 0.4s',
          }}
        >
          VELOURA
        </a>

        {/* Desktop links */}
        <ul style={{
          display: 'flex',
          gap: 40,
          listStyle: 'none',
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
        }}>
          {links.map(link => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                onClick={e => handleLinkClick(e, link)}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 13,
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: textColor,
                  transition: 'color 0.4s, opacity 0.2s',
                  paddingBottom: 3,
                  position: 'relative',
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.6' }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* Right icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <button
            onClick={onAuthOpen}
            style={{ color: textColor, display: 'flex', transition: 'color 0.4s, opacity 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.6'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            <User size={18} />
          </button>

          <motion.button
            ref={cartRef}
            onClick={onCartOpen}
            animate={cartBounce ? { scale: [1, 1.28, 0.88, 1.1, 1] } : { scale: 1 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 16px 8px 12px',
              border: `1.5px solid ${scrolled ? 'var(--black)' : 'rgba(255,255,255,0.7)'}`,
              background: 'transparent',
              borderRadius: 4,
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: '0.06em',
              color: textColor,
              transition: 'background 0.2s, color 0.2s, border-color 0.4s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = scrolled ? 'var(--black)' : 'rgba(255,255,255,0.15)'
              e.currentTarget.style.color = scrolled ? 'var(--white)' : 'var(--white)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = textColor
            }}
          >
            <ShoppingBag size={15} />
            <span className="nav-bolsa-text">Bolsa</span>
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: -7,
                right: -7,
                background: 'var(--blue)',
                color: 'var(--white)',
                borderRadius: '50%',
                width: 18,
                height: 18,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 10,
                fontWeight: 700,
              }}>
                {cartCount}
              </span>
            )}
          </motion.button>

          <button
            onClick={() => setMenuOpen(v => !v)}
            style={{ display: 'none', padding: 6, color: textColor, transition: 'color 0.4s' }}
            className="hamburger"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 116,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'var(--navy)',
              zIndex: 9998,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 32,
              padding: 24,
            }}
          >
            {links.map((link, i) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={e => handleLinkClick(e, link)}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(28px, 7vw, 44px)',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  color: 'var(--white)',
                  textAlign: 'center',
                }}
              >
                {link}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          nav ul { display: none !important; }
          .hamburger { display: flex !important; }
        }
        @media (max-width: 480px) {
          .veloura-nav { padding: 0 14px !important; }
        }
      `}</style>
    </>
  )
}

