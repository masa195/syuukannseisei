import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/syuukannseisei/',
  plugins: [
    react(),
    ...(process.env.ENABLE_PWA === 'true'
      ? [
          VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
            manifest: {
              name: '習慣トラッカー',
              short_name: '習慣トラッカー',
              description: '習慣を管理し、目標達成をサポートするアプリ',
              theme_color: '#3b82f6',
              background_color: '#ffffff',
              display: 'standalone',
              icons: [
                { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
                { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' }
              ]
            }
          })
        ]
      : [])
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})

