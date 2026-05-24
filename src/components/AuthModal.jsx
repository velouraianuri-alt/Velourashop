import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react'

const GoogleLogo = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
)

const AppleLogo = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.15-2.19 1.28-2.17 3.81.03 3.02 2.65 4.03 2.68 4.04l-.06.17zM13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
)

function InputField({ icon: Icon, type, placeholder, value, onChange, showToggle, onToggle, showPassword }) {
  return (
    <div style={{ position: 'relative', marginBottom: 14 }}>
      <div style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', pointerEvents: 'none' }}>
        <Icon size={16} />
      </div>
      <input
        type={showToggle ? (showPassword ? 'text' : 'password') : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{ width: '100%', padding: '15px 44px', border: '1.5px solid #e5e7eb', borderRadius: 12, fontSize: 14, fontFamily: 'var(--font-body)', color: 'var(--black)', background: '#fafafa', outline: 'none', transition: 'border-color 0.2s, background 0.2s', boxSizing: 'border-box' }}
        onFocus={e => { e.target.style.borderColor = 'var(--blue)'; e.target.style.background = '#fff' }}
        onBlur={e => { e.target.style.borderColor = '#e5e7eb'; e.target.style.background = '#fafafa' }}
      />
      {showToggle && (
        <button type="button" onClick={onToggle} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', transition: 'color 0.2s', padding: 6 }} onMouseEnter={e => e.currentTarget.style.color = 'var(--black)'} onMouseLeave={e => e.currentTarget.style.color = '#9ca3af'}>
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      )}
    </div>
  )
}

function SocialButton({ onClick, children }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
      onClick={onClick}
      style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '13px 0', border: '1.5px solid #e5e7eb', borderRadius: 12, fontSize: 13, fontWeight: 600, color: 'var(--black)', background: '#fff', transition: 'border-color 0.2s, box-shadow 0.2s', cursor: 'pointer' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = '#d1d5db'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.boxShadow = 'none' }}
    >
      {children}
    </motion.button>
  )
}

export default function AuthModal({ onClose }) {
  const [mode, setMode] = useState('login')
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const isRegister = mode === 'register'

  const handleSubmit = (e) => {
    e.preventDefault()
    onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, background: 'rgba(6,13,26,0.6)', backdropFilter: 'blur(10px)', zIndex: 10002, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onClick={e => e.stopPropagation()}
        style={{ background: '#fff', borderRadius: 24, width: '100%', maxWidth: 420, overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.25)' }}
      >
        {/* Brand strip */}
        <div style={{ background: 'var(--navy)', padding: '28px 32px 24px', position: 'relative' }}>
          <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, color: 'rgba(255,255,255,0.45)', transition: 'color 0.2s', padding: 6 }} onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}>
            <X size={18} />
          </button>
          <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--blue-bright)', marginBottom: 6 }}>VELHOURA</p>
          <AnimatePresence mode="wait">
            <motion.h2
              key={mode}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22 }}
              style={{ fontSize: 26, fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}
            >
              {isRegister ? 'Crear cuenta' : 'Bienvenido de nuevo'}
            </motion.h2>
          </AnimatePresence>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 4 }}>
            {isRegister ? 'Únete a la familia VELHOURA' : 'Accede a tu cuenta'}
          </p>
        </div>

        {/* Body */}
        <div style={{ padding: '28px 32px 32px' }}>
          {/* Social */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 22 }}>
            <SocialButton onClick={onClose}><GoogleLogo /> Google</SocialButton>
            <SocialButton onClick={onClose}><AppleLogo /> Apple</SocialButton>
          </div>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
            <div style={{ flex: 1, height: 1, background: '#e5e7eb' }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', letterSpacing: '0.08em', textTransform: 'uppercase' }}>o continúa con email</span>
            <div style={{ flex: 1, height: 1, background: '#e5e7eb' }} />
          </div>

          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, x: isRegister ? 16 : -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRegister ? -16 : 16 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                {isRegister && <InputField icon={User} type="text" placeholder="Nombre completo" value={name} onChange={e => setName(e.target.value)} />}
                <InputField icon={Mail} type="email" placeholder="Correo electrónico" value={email} onChange={e => setEmail(e.target.value)} />
                <InputField icon={Lock} type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} showToggle onToggle={() => setShowPassword(v => !v)} showPassword={showPassword} />
                {!isRegister && (
                  <div style={{ textAlign: 'right', marginTop: -8, marginBottom: 18 }}>
                    <button type="button" style={{ fontSize: 12, color: 'var(--blue)', fontWeight: 600 }}>¿Olvidaste tu contraseña?</button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              type="submit"
              style={{ width: '100%', padding: '16px', background: 'var(--navy)', color: '#fff', borderRadius: 12, fontSize: 13, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, cursor: 'pointer', transition: 'background 0.2s', marginTop: 4 }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--blue)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--navy)'}
            >
              {isRegister ? 'Crear mi cuenta' : 'Iniciar sesión'}
              <ArrowRight size={15} />
            </motion.button>
          </form>

          <p style={{ textAlign: 'center', fontSize: 13, color: '#6b7280', marginTop: 20 }}>
            {isRegister ? '¿Ya tienes cuenta? ' : '¿Nuevo en VELHOURA? '}
            <button onClick={() => setMode(isRegister ? 'login' : 'register')} style={{ color: 'var(--blue)', fontWeight: 700 }}>
              {isRegister ? 'Inicia sesión' : 'Regístrate'}
            </button>
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}
