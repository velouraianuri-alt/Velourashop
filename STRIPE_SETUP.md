# Configuración de Stripe

## ¿Cómo funciona?

El sistema de pagos está completamente integrado con Stripe. Cuando el usuario hace clic en "Checkout", se abre un modal con un formulario de pago que utiliza Stripe Elements.

## Pasos para configurar:

### 1. Crear cuenta en Stripe
- Ir a [stripe.com](https://stripe.com)
- Crear una cuenta de prueba
- Ir a Dashboard > Developers > API Keys

### 2. Obtener las claves
- **Publishable Key** (pública): Comienza con `pk_test_` o `pk_live_`
- **Secret Key** (privada): Comienza con `sk_test_` o `sk_live_`

### 3. Configurar variables de entorno
Crear un archivo `.env` en la raíz del proyecto (copiar de `.env.example`):

```
VITE_STRIPE_PUBLIC_KEY=tu_publishable_key_aqui
STRIPE_SECRET_KEY=tu_secret_key_aqui
```

### 4. Actualizar StripeCheckout.jsx
En `src/components/StripeCheckout.jsx`, línea ~33, reemplazar:

```javascript
const stripeInstance = window.Stripe('pk_test_51QdB3sKHMjH7gxqfKD7vOkB7JqJxNWZKvH7xY0wZ0wZ0wZ0wZ0wZ0wZ0wZ')
```

Con tu propia clave pública:

```javascript
const stripeInstance = window.Stripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
```

## Tarjetas de prueba

Para probar el sistema en modo TEST:

| Tarjeta | CVC | Fecha |
|---------|-----|-------|
| 4242 4242 4242 4242 | Cualquier | Futura |
| 4000 0000 0000 0002 | Cualquier | Futura |
| 5555 5555 5555 4444 | Cualquier | Futura |

## Flujo actual (Demostración)

Actualmente el sistema:
1. ✅ Carga Stripe.js desde CDN
2. ✅ Renderiza Stripe Elements (card field)
3. ✅ Crea un Payment Method con Stripe
4. ✅ Simula el pago exitoso (demostración)
5. ✅ Muestra confirmación con ID de transacción

## Para producción

Para llevar esto a producción:

1. **Backend**: Crear un servidor Node.js/Express que:
   - Reciba el Payment Method ID
   - Cree un Payment Intent en Stripe
   - Confirme el pago
   - Guarde la transacción en BD

2. **Actualizar StripeCheckout.jsx** para llamar a tu servidor en lugar de simular

3. **Usar claves LIVE** de Stripe (pk_live_ y sk_live_)

4. **Implementar webhooks** de Stripe para:
   - Confirmar pagos
   - Manejar reembolsos
   - Actualizar estado de órdenes

## Ejemplo de servidor (Node.js + Express)

```javascript
import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

app.post('/api/payment', async (req, res) => {
  const { paymentMethodId, amount } = req.body
  
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'eur',
      payment_method: paymentMethodId,
      confirm: true,
    })
    
    res.json({ success: true, paymentIntentId: paymentIntent.id })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})
```

## Documentación

- [Stripe React Docs](https://stripe.com/docs/stripe-js/react)
- [Stripe Elements](https://stripe.com/docs/stripe-js/elements)
- [Payment Methods API](https://stripe.com/docs/payments/payment-methods)
