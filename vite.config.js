import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
   preview: {
    host: true,
    allowedHosts: ['bookstore-owzt.onrender.com']
   },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
