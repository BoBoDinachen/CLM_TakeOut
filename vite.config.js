import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: "0.0.0.0"
  },
  resolve: {
    alias: {
      "@":path.resolve(__dirname,"src"),
      "layout": path.resolve(__dirname, "src/layout"),
      "components":path.resolve(__dirname,"src/components")
    }
  }
})
