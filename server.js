import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

// Test key - reemplaza con tu clave secreta real de Stripe
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || 'sk_test_51QdB3sKHMjH7gxqf1234567890abcdef'

// Endpoint para procesar checkout
app.post('/api/checkout', async (req, res) => {
  try {
    const { paymentMethodId, amount, items } = req.body

    if (!paymentMethodId || !amount) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // En producción, aquí irías a hacer la solicitud a Stripe
    // Para demostración, simulamos un pago exitoso
    console.log('Payment intent:', {
      amount,
      paymentMethodId,
      items
    })

    // Simular confirmación de pago
    const paymentConfirmed = {
      id: `pi_${Date.now()}`,
      amount: amount,
      status: 'succeeded',
      payment_method: paymentMethodId,
      created: new Date().toISOString()
    }

    res.json({
      success: true,
      paymentIntentId: paymentConfirmed.id,
      status: paymentConfirmed.status
    })
  } catch (error) {
    console.error('Payment error:', error)
    res.status(500).json({ error: error.message || 'Payment processing failed' })
  }
})

// Serve static files
app.use(express.static('dist'))

// Fallback para SPA
app.get('*', (req, res) => {
  res.sendFile(new URL('./dist/index.html', import.meta.url).pathname)
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
