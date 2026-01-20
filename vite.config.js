import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { resolve } from "path";

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
        exports: "named"
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
  resolve: {
    alias: {
      "@json": resolve(__dirname, "./json")
    }
  },
  plugins: [
    dts({
      outDir: "build",
      insertTypesEntry: true,
      include: ["src/**/*"]
    })
  ]
})