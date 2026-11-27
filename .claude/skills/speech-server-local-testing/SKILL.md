---
name: speech-server-local-testing
description: Use before checking SpeechServerEngine, a provider or engine wrapping it (Fallback, Routing), or the demos against a real speech-server. Covers running a local server, matching the engine's requests, probing timing from Node, and the demos.
---

# Testing against a local speech-server

Read `AGENTS.md` first. The deployed server (`https://speech-server.readium.org`) only accepts the deployed demos' origin (`https://readium.org`), so anything run locally talks to a local server. Ask where the speech-server checkout is if you don't know.

## Running the server

- Config lives in two gitignored files at the checkout's root. Check `.gitignore` before writing them, and never commit them.
  - `.env`: `APP_ENV=development`, `PORT=8000`, `ENABLED_PROVIDERS=pocket`, `DEFAULT_PROVIDER=pocket`, and `CORS_ORIGINS=http://localhost:8080`, the Vite origin. `scripts/configure.sh` holds the full key list.
  - `pocket-tts.env`: `LANGUAGES=en,fr` (each extra language is a ~220 MB model, English ~110 MB) and `VOICE_LANGUAGES=` (native voices only).
- Docker Desktop must be running. Run `make build` once, then `make dev-docker` in the background, logging to the scratchpad.
- Ready means `GET /readyz` is 200. It's 503 while models load, and `/healthz` is 200 as soon as the process is up. The first start downloads the models into the `weights_cache` volume. Later starts reuse them.
- `Error response from daemon: No such container` at `make dev-docker`:
  1. Run `docker compose -f docker-compose.yml -f docker-compose.dev.yml down --remove-orphans`.
  2. If `docker ps` hangs or returns 500, Docker Desktop's own state is broken. Ask the user to restart or update Docker Desktop; don't purge its data, which deletes the models.
- Check CORS before blaming the engine: `curl -H "Origin: http://localhost:8080" -D - localhost:8000/voices` must return `access-control-allow-origin: http://localhost:8080`.
- When done, or when the user asks:
  - run `docker compose … down` in the checkout;
  - quit Docker Desktop (`osascript -e 'quit app "Docker"'`);
  - stop Vite and any probe.

## Matching what the engine sends

- `POST /synthesize` returns JSON `{ audio: <base64>, boundaries }` only with `"boundary": true`, which is what `SpeechServerEngine.synthesizeChunk` sends. Without it, the response is raw WAV. Replay the engine's exact body (`text`, `voice` identifier, `language`, `boundary`, `output`) when checking a response by hand.
- PocketTTS voices:
  - Their `controls` are all `false`. With no boundaries, word highlighting is off, and `needsBoundary()` makes the other languages' picks match.
  - Some are tagged with a bare language (`en`), with no region.
  - `otherLanguages` is empty unless `VOICE_LANGUAGES` installs cross-language pairs.
  - Synthesis runs on the CPU and takes about as long as the speech. That slowness is what exposes timing bugs: pausing while `"loading"`, a prefetch finishing during a pause, stall deadlines.

## Probing timing from Node

Use this to find a cause before fixing. Unit tests then pin it with mocks (`createMockFetch` in `test/SpeechServer/testUtils.ts`, and the Web Audio mocks at the top of `test/SpeechServer/speechServerEngine.test.ts`).

- `npm run build`, then a script in the scratchpad that imports `build/index.js` and drives a `ReadiumSpeechNavigator` over the engine under test against `http://localhost:8000`.
- Stub the browser globals with a timed `AudioContext`:
  - `currentTime` follows `performance.now()` and freezes while suspended;
  - `createBufferSource().start(t)` calls `onended` after the buffer's duration, re-armed on resume;
  - `decodeAudioData` returns a duration of `(bytes - 44) / (24000 * 2)` seconds (PocketTTS is 24 kHz 16-bit mono).

  Also stub `Audio` (with `canPlayType`) and `requestAnimationFrame`.
- Log every navigator event with `navigator.getState()` and the engine's `getState()`, plus `[audio] suspended/resumed` from the fake context.
- Vary when the action happens: right after `"start"`, between utterances, and while a prefetch is still in flight. Getting a prefetch in flight needs a queue longer than `readyBufferChars` and `prefetchWindow` cover, or `loadUtterances()` will already have buffered everything.
- Confirm a result in the browser too. The fake context only models what you wrote into it.

## Demos

- `demo/speechEngine.js` is the one place the demos get their engine and server voices. It uses `http://localhost:8000` when `import.meta.env.DEV`, and the deployed server otherwise.
- Serve with `npx vite --port 8080 --strictPort --open false` in the background. The port has to match `CORS_ORIGINS`.
- With the server stopped, the demos must still load and play browser voices only. The routing engine leaves out a provider whose voices fail to list.
