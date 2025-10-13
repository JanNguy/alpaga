import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        proxy: {
            '/ext/ollama': {
                target: 'https://ollama.com',
                changeOrigin: true,
                rewrite: p => p.replace(/^\/ext\/ollama/, ''),
            },
        },
    },
})
