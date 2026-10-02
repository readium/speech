import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { createReadStream, existsSync, statSync } from "fs";
import { join, resolve } from "path";
import pkg from "./package.json" with { type: "json" };

const dependencies = Object.keys(pkg.dependencies ?? {});

const localFixturesDir = resolve(__dirname, "fixtures");
const gndFixturesDir = resolve(__dirname, "node_modules/@readium/guided-navigation/fixtures");

// Serves /fixtures/ as gh-pages lays it out: local utterances.json merged with @readium/guided-navigation's fixtures.
const gndFixtures = {
  name: "gnd-fixtures",
  configureServer(server) {
    server.middlewares.use("/fixtures", (req, res, next) => {
      const path = decodeURIComponent((req.url ?? "").split("?")[0]);
      const file = join(gndFixturesDir, path);
      if (existsSync(join(localFixturesDir, path)) || !file.startsWith(gndFixturesDir) || !existsSync(file) || !statSync(file).isFile()) {
        return next();
      }
      createReadStream(file).pipe(res);
    });
  },
};

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

export default defineConfig(({ mode }) => {
  const config = mode === "demo" ? demoBuild : libraryBuild;
  return {
    ...shared,
    ...config,
    plugins: [gndFixtures, ...(config.plugins ?? [])]
  };
});
