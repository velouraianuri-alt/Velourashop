import { useState } from 'react'
import { importAllProducts } from '../importProducts'

export default function ImportButton() {
  const [importing, setImporting] = useState(false)
  const [status, setStatus] = useState(null)

  const handleImport = async () => {
    if (importing) return

    setImporting(true)
    setStatus('Importando productos...')

    try {
      await importAllProducts()
      setStatus('✅ Productos importados exitosamente!')
      setTimeout(() => setStatus(null), 3000)
    } catch (error) {
      setStatus(`❌ Error: ${error.message}`)
    } finally {
      setImporting(false)
    }
  }

  return (
    <div style={{ padding: 20, position: 'fixed', bottom: 20, right: 20, zIndex: 1000 }}>
      <button
        onClick={handleImport}
        disabled={importing}
        style={{
          padding: '12px 24px',
          background: importing ? '#ccc' : '#1f2937',
          color: 'white',
          border: 'none',
          borderRadius: 8,
          cursor: importing ? 'not-allowed' : 'pointer',
          fontWeight: 600,
          fontSize: 12,
        }}
      >
        {importing ? 'Importando...' : 'Importar Productos a Shopify'}
      </button>
      {status && (
        <div style={{
          marginTop: 10,
          padding: 10,
          background: '#f3f4f6',
          borderRadius: 6,
          fontSize: 12,
          maxWidth: 300,
        }}>
          {status}
        </div>
      )}
    </div>
  )
}
