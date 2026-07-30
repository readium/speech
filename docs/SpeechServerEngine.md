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
}
```

- `prefetchWindow`: buffer depth, not concurrency — requests are chained one at a time, never more than one `/synthesize` in flight.
- `readyBufferChars`: bounded by `prefetchWindow` too — the initial buffer is just the front of that same lookahead.
- `overLengthText`: an utterance longer than the server's advertised `maxTextLength` (from `/service`) is split into multiple `/synthesize` requests and played back-to-back as one logical utterance by default (`"split"`). Set `"error"` to instead fail fast with a `SpeechServerError` (413, `payload_too_large`) — e.g. if you'd rather pre-chunk text yourself upstream. Splitting is sentence/word-boundary-aware for plain text, and tag-atomic for SSML (never cuts inside a `<tag>...</tag>` span).
- `format`: see below.

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

Failures surface as `"error"` events (see [Playback.md](Playback.md#readiumspeechplaybackevent)), with `detail` shaped like a `SpeechServerError`: `{ message, status, type, title, instance }`, following [RFC 9457 Problem Details](https://www.rfc-editor.org/rfc/rfc9457) when the server returns one.
