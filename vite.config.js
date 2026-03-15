import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// SPA: mọi route không phải file tĩnh → serve index.html
function shouldFallback(url) {
  if (!url || url === '/' || url.startsWith('/?')) return false
  if (url.startsWith('/@') || url.startsWith('/node_modules')) return false
  const hasExtension = url.includes('.') && !url.endsWith('.html')
  if (hasExtension) return false
  return true
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // SPA fallback: khi reload trên route bất kỳ (vd: /ten-phim), serve index.html thay vì 404
    {
      name: 'spa-fallback',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = req.url || ''
          if (shouldFallback(url)) req.url = '/'
          next()
        })
      },
      configurePreviewServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = req.url || ''
          if (shouldFallback(url)) req.url = '/'
          next()
        })
      },
    },
  ],
})
