import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { resolve } from "path";
import pkg from "./package.json" with { type: "json" };

const dependencies = Object.keys(pkg.dependencies ?? {});

const shared = {
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
  server: {
    port: 8080,
    open: "/demo/"
  }
};

const demoBuild = {
  base: "./",
  build: {
    outDir: "build-demo",
    rollupOptions: {
      input: {
        demo: resolve(__dirname, "demo/index.html"),
        playground: resolve(__dirname, "demo/playground/index.html"),
        voiceSelection: resolve(__dirname, "demo/voice-selection/index.html")
      }
    }
  }
};

const libraryBuild = {
  build: {
    outDir: "build",
    lib: {
      entry: "src/index.ts",
      fileName: "index",
      formats: ["es"]
    },
    rollupOptions: {
      external: (id) => dependencies.some((dep) => id === dep || id.startsWith(`${dep}/`))
    }
  },
  plugins: [
    dts({
      outDir: "build",
      insertTypesEntry: true,
      include: ["src/**/*"]
    })
  ]
};

export default defineConfig(({ mode }) => ({
  ...shared,
  ...(mode === "demo" ? demoBuild : libraryBuild)
}));
