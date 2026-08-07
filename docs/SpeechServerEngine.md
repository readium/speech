# SpeechServerEngine

`SpeechServerEngine` implements `ReadiumSpeechPlaybackEngine` (see [Playback.md](Playback.md)) against a remote TTS HTTP service — a [Readium Speech Server](https://github.com/readium/speech-server) instance. `SpeechServerEngineProvider` wraps it for use with a single provider or [`ReadiumSpeechProviderRegistry`](ProviderRegistry.md).

## Construction

Via the provider (recommended — handles voice caching for you):

```ts
import { SpeechServerEngineProvider } from "@readium/speech";

const provider = new SpeechServerEngineProvider({
  endpoints: {
    voices: "http://localhost:8000/voices",
    synthesize: "http://localhost:8000/synthesize",
    service: "http://localhost:8000/service"
  }
});
const engine = await provider.createEngine();
```

Directly, if you don't need the registry or provider-level voice caching:

```ts
import { SpeechServerEngine } from "@readium/speech";

const engine = new SpeechServerEngine({
  endpoints: { voices: "...", synthesize: "...", service: "..." }
});
```

`SpeechServerEngineProviderOptions` is the same shape as `SpeechServerEngineOptions` below — every option documented here works identically through either constructor.

## Options

```ts
interface SpeechServerEngineOptions {
  endpoints: {
    voices: string;      // GET  — list available voices
    synthesize: string;  // POST — synthesize one utterance/chunk
    service: string;     // GET  — server capabilities (formats, maxTextLength, ...)
  };
  fetch?: typeof fetch;         // default: fetch bound to globalThis
  prefetchWindow?: number;      // utterances to keep pre-fetched ahead of playback, default 3
  readyBufferChars?: number;    // combined chars to buffer before "ready", default 400
  overLengthText?: "split" | "error"; // default "split"
  format?: SpeechServerFormatOptions;
  timeoutMs?: number; // default: undefined (never declares a stall)
}
```

- `prefetchWindow`: buffer depth, not concurrency — requests are chained one at a time, never more than one `/synthesize` in flight.
- `readyBufferChars`: bounded by `prefetchWindow` too — the initial buffer is just the front of that same lookahead.
- `overLengthText`: an utterance longer than the server's advertised `maxTextLength` (from `/service`) is split into multiple `/synthesize` requests and played back-to-back as one logical utterance by default (`"split"`). Set `"error"` to instead fail fast with a `SpeechServerError` (413, `payload_too_large`) — e.g. if you'd rather pre-chunk text yourself upstream. Splitting is sentence/word-boundary-aware for plain text, and tag-atomic for SSML (never cuts inside a `<tag>...</tag>` span).
- `format`: see below.
- `timeoutMs`: see [Stall detection](#stall-detection).

## Format selection

```ts
interface SpeechServerFormatOptions {
  preferredFormat?: string;         // e.g. "opus" — used only if advertised + browser-playable
  strategy?: "quality" | "bandwidth"; // default "quality"
  adaptBitrateToNetwork?: boolean;  // default false
}
```

By default the engine picks a format from the intersection of what the server advertises (`/service`'s `output.formats`) and what the browser can actually decode (`HTMLAudioElement.canPlayType`), ranked `"quality"` (lossless/higher-fidelity first) or `"bandwidth"` (smallest-transfer first). `preferredFormat` overrides that ranking outright, as long as it's both advertised and playable — an unsupported preference is silently ignored rather than erroring.

`adaptBitrateToNetwork` reduces the requested bitrate for compressed formats when the browser's Network Information API (`navigator.connection`, Chromium-only) reports Save-Data or a 2G-class connection. It's opt-in and off by default, since that API doesn't exist in every browser and this must never silently change behavior for callers who didn't ask for it.

## Errors

Failures surface as `"error"` events (see [Playback.md](Playback.md#readiumspeechplaybackevent)), with `detail` shaped like a `SpeechServerError`: `{ message, status, type, title, instance, recoverable }`, following [RFC 9457 Problem Details](https://www.rfc-editor.org/rfc/rfc9457) when the server returns one. `recoverable` is `true` when the server never responded at all (network failure, or a stall — see below), and `false` when it responded but rejected the request, or the audio payload couldn't be decoded — see [FallbackEngine.md](FallbackEngine.md), which uses this to decide whether swapping to another engine could help.

## Stall detection

`timeoutMs` is a **grace period**, not a per-request cap: `/synthesize` requests aren't given a flat timeout, because prefetching and gapless scheduling mean a single slow chunk is harmless as long as there's still enough already-buffered audio ahead of the playhead to cover it. Instead, the engine only starts a clock once the buffer is projected to run dry with the next chunk still not ready, and only declares a stall — throwing a `SpeechServerStallError` (408, `.../error#stall`) and aborting that specific request — if `timeoutMs` elapses past that point. Every chunk that does resolve pushes the projected buffer-empty point further out, so the deadline effectively rolls forward with playback rather than being fixed at request start.

Left `undefined` (the default), a stalled `/synthesize` request waits forever, same as before this option existed.

## Minimizing gaps between utterances

- **Gapless scheduling**: chunks/utterances are decoded into `AudioBuffer`s and scheduled back-to-back on one continuous `AudioContext` timeline (`node.start(t)`, with `t` advanced by each buffer's own duration) rather than played one at a time via sequential `<audio>` elements — there's no stop/start gap between them.
- **Prefetching ahead**: while an utterance plays, the engine fetches up to `prefetchWindow` upcoming utterances so they're already decoded by the time playback reaches them. Requests are chained one at a time (never more than one `/synthesize` in flight), so this doesn't compete with `maxConcurrentSyntheses` on the server.
- **Buffering before "ready"**: `readyBufferChars` holds off the `"ready"` event until enough of the front of the queue is prefetched, so playback doesn't immediately outrun an empty buffer right after the first utterance starts.
- **Chunk-level streaming for long utterances**: when `overLengthText: "split"` breaks an utterance into multiple requests, playback starts on the first chunk as soon as it's ready — it doesn't wait for the rest — while later chunks keep fetching and get scheduled onto the same gapless timeline as they resolve. Callers still only see a single `"start"`/`"end"` pair for the whole utterance, not one per chunk.

## Known limitations

`/synthesize` returns a complete base64-encoded audio payload per request, not a stream — the engine waits for the full response, then decodes it whole via `AudioContext.decodeAudioData`. There's no Media Source Extensions (MSE) usage and no incremental playback within a single chunk. `prefetchWindow`/`readyBufferChars`/`overLengthText: "split"` reduce the perceived gap between utterances by overlapping requests and keeping individual requests small, but a single long chunk still has to finish downloading before any of it can play.
