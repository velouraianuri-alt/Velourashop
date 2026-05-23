const SHOPIFY_STORE = import.meta.env.VITE_SHOPIFY_STORE || 'velhoura.myshopify.com'
const STOREFRONT_API_TOKEN = import.meta.env.VITE_STOREFRONT_API_TOKEN || 'cbf31338e9aba747dfd7a67135d41e6b'
const GRAPHQL_ENDPOINT = `https://${SHOPIFY_STORE}/api/2024-01/graphql.json`

// Función para hacer queries a Shopify GraphQL
export async function shopifyFetch(query, variables = {}) {
  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_API_TOKEN,
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
    console.error('Shopify Fetch Error:', error)
    throw error
  }
}

// Obtener todos los productos
export async function getProducts() {
  const query = `
    query {
      products(first: 250) {
        edges {
          node {
            id
            title
            handle
            description
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 10) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 250) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  sku
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
            options {
              id
              name
              values
            }
          }
        }
      }
    }
  `

  try {
    const data = await shopifyFetch(query)
    return data.products.edges.map(edge => {
      const product = edge.node
      return {
        id: product.id,
        handle: product.handle,
        title: product.title,
        description: product.description,
        price: parseFloat(product.priceRange.minVariantPrice.amount),
        images: product.images.edges.map(img => img.node.url),
        variants: product.variants.edges.map(v => v.node),
        options: product.options,
      }
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

// Obtener un producto por handle
export async function getProductByHandle(handle) {
  const query = `
    query($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        handle
        description
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 10) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 250) {
          edges {
            node {
              id
              title
              price {
                amount
                currencyCode
              }
              sku
              selectedOptions {
                name
                value
              }
            }
          }
        }
        options {
          id
          name
          values
        }
      }
    }
  `

  try {
    const data = await shopifyFetch(query, { handle })
    const product = data.productByHandle
    return {
      id: product.id,
      handle: product.handle,
      title: product.title,
      description: product.description,
      price: parseFloat(product.priceRange.minVariantPrice.amount),
      images: product.images.edges.map(img => img.node.url),
      variants: product.variants.edges.map(v => v.node),
      options: product.options,
    }
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

// Crear un checkout via Cart API (reemplaza la deprecada checkoutCreate)
export async function createCheckout(lineItems) {
  const query = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `

  const variables = {
    input: {
      lines: lineItems.map(item => ({
        merchandiseId: item.variantId,
        quantity: item.quantity,
      })),
    },
  }

  try {
    const data = await shopifyFetch(query, variables)
    const cart = data.cartCreate.cart
    return { webUrl: cart.checkoutUrl }
  } catch (error) {
    console.error('Error creating checkout:', error)
    return null
  }
}
