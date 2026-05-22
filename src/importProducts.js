// Script para importar productos a Shopify via Admin API
// SOLO EJECUTAR UNA VEZ para migrar los productos

const SHOPIFY_STORE = import.meta.env.VITE_SHOPIFY_STORE || 'velhoura.myshopify.com'
const ADMIN_API_TOKEN = import.meta.env.VITE_SHOPIFY_ADMIN_TOKEN || 'YOUR_ADMIN_TOKEN_HERE'
const GRAPHQL_ENDPOINT = `https://${SHOPIFY_STORE}/admin/api/2024-01/graphql.json`

const HQ = '/imagenes/high-quality-sunglasses-manufacturer'
const TRANSPARENT = '/imagenes/transparent-new-cat3-luxury-street-wear-glasses'
const RETRO = '/imagenes/custom-retro-shades-biodegradable-acetate-sunglasses-for-men-high-quality'
const VINTAGE_LADY = '/imagenes/custom-high-quality-uv400-ladys-shades-wholesale-vintage'
const ITALIAN = '/imagenes/italian-luxury-eyewear-new-model'
const VINTAGE_SQ = '/imagenes/lma-1025-vintage-oversize-square-classic'
const UNISEX = '/imagenes/manufacture-custom-high-quality-unisex-luxury'

const productsToImport = [
  {
    title: 'Crystal Street',
    handle: 'crystal-street',
    bodyHtml: 'Premium transparent sunglasses with exclusive design',
    vendor: 'VELOURA',
    productType: 'Sunglasses',
    images: [
      `${TRANSPARENT}/frontal.png`,
      `${TRANSPARENT}/semilateral.png`,
      `${TRANSPARENT}/lateral.png`,
      `${TRANSPARENT}/traseras.png`,
    ],
    variants: [
      {
        title: 'Default',
        price: '35.00',
        sku: 'CRYSTAL-STREET-001',
      },
    ],
  },
  {
    title: 'Retro Ace',
    handle: 'retro-ace',
    bodyHtml: 'Classic retro-style sunglasses with timeless appeal',
    vendor: 'VELOURA',
    productType: 'Sunglasses',
    images: [
      `${RETRO}/frontal.png`,
      `${RETRO}/semilateral.png`,
      `${RETRO}/lateral.png`,
      `${RETRO}/traseras.png`,
    ],
    variants: [
      {
        title: 'Default',
        price: '35.00',
        sku: 'RETRO-ACE-001',
      },
    ],
  },
  {
    title: 'Vintage Lady',
    handle: 'vintage-lady',
    bodyHtml: 'Elegant vintage-inspired sunglasses for women',
    vendor: 'VELOURA',
    productType: 'Sunglasses',
    images: [
      `${VINTAGE_LADY}/forntal.png`,
      `${VINTAGE_LADY}/semilateral.png`,
      `${VINTAGE_LADY}/lateral.png`,
      `${VINTAGE_LADY}/traseras.png`,
    ],
    variants: [
      {
        title: 'Default',
        price: '35.00',
        sku: 'VINTAGE-LADY-001',
      },
    ],
  },
  {
    title: 'Italian Glam',
    handle: 'italian-glam',
    bodyHtml: 'Luxurious Italian-inspired glamorous eyewear',
    vendor: 'VELOURA',
    productType: 'Sunglasses',
    images: [
      `${ITALIAN}/frontal.png`,
      `${ITALIAN}/semilateral.png`,
      `${ITALIAN}/lateral.png`,
      `${ITALIAN}/traseras.png`,
    ],
    variants: [
      {
        title: 'Default',
        price: '35.00',
        sku: 'ITALIAN-GLAM-001',
      },
    ],
  },
  {
    title: 'Vintage Square',
    handle: 'vintage-square',
    bodyHtml: 'Sophisticated square-framed vintage sunglasses',
    vendor: 'VELOURA',
    productType: 'Sunglasses',
    images: [
      `${VINTAGE_SQ}/frontal.png`,
      `${VINTAGE_SQ}/semilateral.png`,
      `${VINTAGE_SQ}/lateral.png`,
      `${VINTAGE_SQ}/traseras.png`,
    ],
    variants: [
      {
        title: 'Default',
        price: '35.00',
        sku: 'VINTAGE-SQ-001',
      },
    ],
  },
  {
    title: 'Unisex Pro',
    handle: 'unisex-pro',
    bodyHtml: 'Versatile unisex professional sunglasses',
    vendor: 'VELOURA',
    productType: 'Sunglasses',
    images: [
      `${UNISEX}/frontal.png`,
      `${UNISEX}/semilateral.png`,
      `${UNISEX}/lateral.png`,
      `${UNISEX}/traseras.png`,
    ],
    variants: [
      {
        title: 'Default',
        price: '35.00',
        sku: 'UNISEX-PRO-001',
      },
    ],
  },
  {
    title: 'Eclipse',
    handle: 'eclipse',
    bodyHtml: 'Premium multi-color sunglasses with exclusive designs',
    vendor: 'VELOURA',
    productType: 'Sunglasses',
    images: [
      `${HQ}/negras_naranja/frontal.png`,
      `${HQ}/color_negro/frontal.png`,
      `${HQ}/color_verde/frontal.png`,
    ],
    options: [
      {
        name: 'Color',
        values: ['Black Orange', 'Black', 'Black Green'],
      },
    ],
    variants: [
      {
        title: 'Black Orange',
        price: '35.00',
        sku: 'ECLIPSE-BO-001',
        optionValues: {
          Color: 'Black Orange',
        },
      },
      {
        title: 'Black',
        price: '35.00',
        sku: 'ECLIPSE-BK-001',
        optionValues: {
          Color: 'Black',
        },
      },
      {
        title: 'Black Green',
        price: '35.00',
        sku: 'ECLIPSE-BG-001',
        optionValues: {
          Color: 'Black Green',
        },
      },
    ],
  },
]

async function adminFetch(query, variables = {}) {
  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': ADMIN_API_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    })

    const data = await response.json()

    if (data.errors) {
      console.error('Shopify GraphQL Error:', data.errors)
      throw new Error(data.errors[0]?.message)
    }

    return data.data
  } catch (error) {
    console.error('Admin Fetch Error:', error)
    throw error
  }
}

export async function importAllProducts() {
  console.log(`Importando ${productsToImport.length} productos a Shopify...`)

  for (const product of productsToImport) {
    try {
      await importProduct(product)
      console.log(`✅ ${product.title} importado exitosamente`)
    } catch (error) {
      console.error(`❌ Error importando ${product.title}:`, error)
    }
  }

  console.log('✨ Importación completada!')
}

async function importProduct(productData) {
  const query = `
    mutation($input: ProductInput!) {
      productCreate(input: $input) {
        product {
          id
          title
          handle
        }
        userErrors {
          field
          message
        }
      }
    }
  `

  const input = {
    title: productData.title,
    handle: productData.handle,
    bodyHtml: productData.bodyHtml,
    vendor: productData.vendor,
    productType: productData.productType,
    published: true,
  }

  const variables = { input }

  const result = await adminFetch(query, variables)

  if (result.productCreate.userErrors.length > 0) {
    throw new Error(result.productCreate.userErrors[0].message)
  }

  const productId = result.productCreate.product.id

  // Crear variantes
  for (const variant of productData.variants) {
    await createVariant(productId, variant, productData.options)
  }

  // NOTA: Las imágenes se agregarán manualmente en Shopify o después
  // ya que las URLs locales no son accesibles públicamente

  return result.productCreate.product
}

async function createVariant(productId, variantData, options) {
  const query = `
    mutation($input: ProductVariantInput!) {
      productVariantCreate(input: $input) {
        productVariant {
          id
          title
        }
        userErrors {
          field
          message
        }
      }
    }
  `

  const input = {
    productId,
    title: variantData.title,
    price: variantData.price,
    sku: variantData.sku,
  }

  if (variantData.optionValues && options) {
    input.optionValues = Object.entries(variantData.optionValues).map(([name, value]) => ({
      optionName: name,
      value,
    }))
  }

  const variables = { input }
  const result = await adminFetch(query, variables)

  if (result.productVariantCreate.userErrors.length > 0) {
    throw new Error(result.productVariantCreate.userErrors[0].message)
  }

  return result.productVariantCreate.productVariant
}

async function addImage(productId, imageUrl) {
  const query = `
    mutation($input: CreateMediaInput!, $productId: ID!) {
      productCreateMedia(input: $input, productId: $productId) {
        media {
          id
        }
        userErrors {
          field
          message
        }
      }
    }
  `

  const input = {
    media: {
      originalSource: imageUrl,
    },
  }

  const variables = { input, productId }
  const result = await adminFetch(query, variables)

  if (result.productCreateMedia.userErrors.length > 0) {
    console.warn(`Warning adding image: ${result.productCreateMedia.userErrors[0].message}`)
  }

  return result.productCreateMedia.media
}
