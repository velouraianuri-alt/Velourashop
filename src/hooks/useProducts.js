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

        // Metadatos realistas por producto
        const META = {
          'Crystal Street':  { stars: 4.7, reviews:  6, watching:  8, stock: 5, tag: 'Exclusive' },
          'Retro Ace':       { stars: 4.9, reviews: 19, watching: 23, stock: 4, tag: 'Best Seller' },
          'Vintage Lady':    { stars: 4.8, reviews: 11, watching: 15, stock: 6, tag: 'New Drop' },
          'Italian Glam':    { stars: 5.0, reviews: 27, watching: 34, stock: 2, tag: 'Limited' },
          'Vintage Square':  { stars: 4.6, reviews:  4, watching:  6, stock: 3, tag: null },
          'Unisex Pro':      { stars: 4.8, reviews:  8, watching: 11, stock: 7, tag: 'Exclusive' },
          'Eclipse':         { stars: 4.9, reviews: 14, watching: 19, stock: 8, tag: 'New Drop' },
        }

        // Mapear productos de Shopify al formato de la app
        const mappedProducts = data.map(product => {
          // Busca metadatos por nombre base (antes de posible " - Color")
          const baseName = product.title.replace(/\s*[-–—]\s*.+$/, '').trim()
          const meta = META[baseName] || { stars: 4.8, reviews: 120, watching: 10, stock: 5, tag: null }
          return {
          id: product.id,
          name: product.title,
          price: product.price,
          originalPrice: parseFloat((product.price * 1.43).toFixed(2)),
          tag: meta.tag,
          stock: meta.stock,
          stars: meta.stars,
          reviews: meta.reviews,
          watching: meta.watching,
          imgDefault: product.images[0],
          imgHover: product.images[1] || product.images[0],
          images: product.images,
          description: product.description,
          handle: product.handle,
          variants: product.variants,
        }
        })

        // Excluir productos de servicios/add-ons (ej. Shipping Protection)
        const sunglassesOnly = mappedProducts.filter(p =>
          !/(protecci[oó]n|shipping.?protection|envio|envío)/i.test(p.name)
        )

        // Fusionar variantes de color en un único producto por modelo
        const grouped = groupByModel(sunglassesOnly)

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
