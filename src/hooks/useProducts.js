import { useState, useEffect } from 'react'
import { getProducts } from '../shopify'

/**
 * Agrupa productos cuyo nombre sigue el patrón "Modelo - Color".
 * Todos los productos del mismo modelo se fusionan en uno solo con un
 * array `colors`, cada entrada con su propio array de imágenes.
 * Los productos sin ese patrón se dejan tal cual.
 */
function groupByModel(products) {
  const groups = new Map() // modelName → { baseProduct, colors[] }
  const insertOrder = []   // mantiene el orden de aparición

  products.forEach(product => {
    // Acepta guión normal (-), en-dash (–) y em-dash (—), con o sin espacios
    const match = product.name.match(/^(.+?)\s*[-–—]\s*(.+)$/)
    if (match) {
      const modelName = match[1].trim()
      const colorName = match[2].trim()

      if (!groups.has(modelName)) {
        groups.set(modelName, { baseProduct: product, colors: [] })
        insertOrder.push({ type: 'group', key: modelName })
      }

      groups.get(modelName).colors.push({
        name: colorName,
        images: product.images,
        shopifyId: product.id,
        variantId: product.variants?.[0]?.id,
      })
    } else {
      insertOrder.push({ type: 'single', product })
    }
  })

  return insertOrder.map(entry => {
    if (entry.type === 'single') return entry.product

    const { baseProduct, colors } = groups.get(entry.key)
    return {
      ...baseProduct,
      name: entry.key,
      imgDefault: colors[0]?.images[0] || baseProduct.imgDefault,
      imgHover:   colors[0]?.images[1] || colors[0]?.images[0] || baseProduct.imgHover,
      images:     colors[0]?.images    || baseProduct.images,
      colors,
    }
  })
}

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
        const mappedProducts = data.map(product => ({
          id: product.id,
          name: product.title,
          price: product.price,
          originalPrice: parseFloat((product.price * 1.43).toFixed(2)),
          tag: 'Exclusivo',
          stock: 5,
          stars: 4.8,
          reviews: 150,
          watching: 12,
          imgDefault: product.images[0],
          imgHover: product.images[1] || product.images[0],
          images: product.images,
          description: product.description,
          handle: product.handle,
          variants: product.variants,
        }))

        // Fusionar variantes de color en un único producto por modelo
        const grouped = groupByModel(mappedProducts)

        setProducts(grouped)
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
