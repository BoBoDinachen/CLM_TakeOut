import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: "0.0.0.0",
    https: false
  },
  resolve: {
    alias: {
      "@":path.resolve(__dirname,"src"),
      "@layout": path.resolve(__dirname, "src/layout"),
      "@comps": path.resolve(__dirname, "src/components"),
      "@image": path.resolve(__dirname, "src/assets/image"),
      "@svg": path.resolve(__dirname, "src/assets/svg"),
      "@icons":path.resolve(__dirname,"src/assets/icon"),
    }
  }
})
