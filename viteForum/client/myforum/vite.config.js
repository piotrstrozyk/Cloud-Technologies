import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Port musi odpowiadać temu z pliku docker-compose
    host: '0.0.0.0', // Nasłuchiwanie na wszystkich interfejsach
  },
})
