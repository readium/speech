import { defineConfig } from "vite"
import dts from "vite-plugin-dts"

export default defineConfig({
  build: {
    outDir: "build",
    lib: {
      entry: "src/index.ts",
      name: "ReadiumSpeech",
      fileName: (format) => format === "es" ? "index.js" : "index.cjs",
      formats: ["es", "cjs"]
    },
    rollupOptions: {
      external: [],
      output: {
        inlineDynamicImports: true,
        exports: "named",
        preserveModules: false
      }
    }
  },
  define: {
    global: "globalThis",
    "process.env": {},
    "process.version": '""',
    "process.platform": '"browser"',
    "process.browser": true,
  },
  plugins: [
    dts({
      outDir: "build",
      insertTypesEntry: true,
      include: ["src/**/*"]
    })
  ]
})
