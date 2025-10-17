import { defineConfig } from "vite"
import dts from "vite-plugin-dts"

export default defineConfig({
  build: {
    outDir: "build",
    lib: {
      entry: "src/index.ts",
      name: "ReadiumSpeech",
      fileName: "index",
      formats: ["es"]
    },
    rollupOptions: {
      external: [],
      output: {
        format: "es"
      }
    }
  },
  define: {
    global: 'globalThis',
    'process.env': {},
    'process.version': '""',
    'process.platform': '"browser"',
    'process.browser': true,
  },
  plugins: [
    dts({
      outDir: "build",
      insertTypesEntry: true,
      include: ["src/**/*"]
    })
  ]
})
