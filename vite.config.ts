import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: "./client",
  publicDir: "./client/public",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      }
    },
    sourcemap: false
  },
  server: {
    port: 5173,
    host: true
  }
});