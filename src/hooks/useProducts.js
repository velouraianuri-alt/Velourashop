import { useState, useEffect } from 'react'
import { getProducts } from '../shopify'

export function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const data = await getProducts()

        // Mapear productos de Shopify al formato de la app
        const mappedProducts = data.map(product => {
          // Obtener variantes y colores
          let colors = []
          let variants = product.variants || []

          // Si el producto tiene opciones de color (como Eclipse)
          const colorOption = product.options?.find(opt => opt.name === 'Color')
          if (colorOption && variants.length > 1) {
            colors = colorOption.values.map((colorName, idx) => ({
              name: colorName,
              swatch: '#' + Math.floor(Math.random() * 16777215).toString(16), // Color aleatorio por ahora
              images: variants[idx]?.images || [product.images[idx] || product.images[0]]
            }))
          }

          return {
            id: product.id,
            name: product.title,
            price: product.price,
            originalPrice: product.price * 1.43, // Aproximado
            tag: 'Exclusivo',
            stock: 5,
            stars: 4.8,
            reviews: 150,
            watching: 12,
            imgDefault: product.images[0],
            imgHover: product.images[1] || product.images[0],
            images: product.images,
            colors: colors.length > 0 ? colors : undefined,
            description: product.description,
            handle: product.handle,
          }
        })

        setProducts(mappedProducts)
        setError(null)
      } catch (err) {
        console.error('Error fetching products:', err)
        setError(err.message)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return { products, loading, error }
}
