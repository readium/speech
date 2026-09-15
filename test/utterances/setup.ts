import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

// Node's native fetch can't resolve local `file:` URLs, which is how
// sentencex-wasm's init() loads its binary when unbundled — shim it for tests.
const originalFetch = globalThis.fetch;

globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
  const url = input instanceof Request ? input.url : input.toString();
  if (url.startsWith("file:")) {
    const bytes = await readFile(fileURLToPath(url));
    return new Response(bytes, { headers: { "content-type": "application/wasm" } });
  }
  return originalFetch(input, init);
}) as typeof fetch;
