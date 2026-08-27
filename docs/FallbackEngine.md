# FallbackEngine

`FallbackEngineProvider` pairs a primary [`ReadiumSpeechEngineProvider`](ProviderRegistry.md) (typically [`SpeechServerEngineProvider`](SpeechServerEngine.md)) with a fallback one (typically [`WebSpeechEngineProvider`](WebSpeechEngine.md)), and transparently swaps to the fallback when the primary is unreachable or stalls — no navigator or app-level retry logic needed.

```ts
import {
  FallbackEngineProvider,
  SpeechServerEngineProvider,
  WebSpeechEngineProvider,
  ReadiumSpeechNavigator
} from "@readium/speech";

const provider = new FallbackEngineProvider({
  primary: new SpeechServerEngineProvider({
    endpoints: { voices: "...", synthesize: "...", service: "..." },
    timeoutMs: 10000 // grace period after the audio buffer would run dry, see SpeechServerEngine.md
  }),
  fallback: new WebSpeechEngineProvider()
});

const engine = await provider.createEngine();
const navigator = new ReadiumSpeechNavigator(engine);

navigator.on("enginefallback", (event) => {
  showToast("Switched to your device's built-in voice");
  console.log(event.detail.voice, event.detail.reason);
});

navigator.on("enginerecovered", (event) => {
  showToast("Reconnected — switched back to the server voice");
  console.log(event.detail.voice);
});
```

## When it falls back

- `getVoices()`/`createEngine()`: the primary is unreachable before anything even starts (e.g. no speech-server configured, DNS failure). The fallback provider's voices/engine are used instead, immediately.
- Mid-playback: the primary engine reports a **recoverable** failure — the server never answered at all (network failure) or a `SpeechServerStallError` (see [SpeechServerEngine.md](SpeechServerEngine.md#stall-detection)). A structured error the server actually returned (bad request, unsupported voice, unsupported format, etc.) is **not** recoverable — that's surfaced as a normal `"error"` event instead, since a different engine can't fix a request the server rejected.

On a mid-playback swap, the new engine resumes at the same utterance — immediately, or only once `resume()` is called if the caller paused before the swap finished — with the best matching Web Speech voice for the failed voice's language *and* gender (falling back to language-only if no matching-gender voice exists), and `rate`/`pitch`/`volume`/`setSpeakInContentLanguage` carried over. A `"enginefallback"` event always fires before any playback from the new engine, with `detail: { reason, voice }`.

With `onFailure: "fallback"` (the default), it only ever falls back once per session — a further failure on the fallback engine itself surfaces as a plain `"error"` event, since there's nothing left to fall back to.

## Recovering back to the primary

Set `onFailure: "fallbackAndRecover"` to also poll the primary while on the fallback, and swap back once it's reachable again:

```ts
const provider = new FallbackEngineProvider({
  primary: new SpeechServerEngineProvider({ /* ... */ }),
  fallback: new WebSpeechEngineProvider(),
  onFailure: "fallbackAndRecover",
  healthCheckIntervalMs: 30000 // default
});
```

Every `healthCheckIntervalMs`, the primary provider's `getVoices()` is called as a reachability probe (it naturally re-hits the network on every failed call, since nothing gets cached until it succeeds). Once it succeeds, the swap back only happens once the fallback engine is genuinely not playing — an explicit `pause()` (the swap happens silently; the recovered primary only actually starts once `resume()` is called), or the whole queue finishing. It deliberately does **not** swap between utterances mid-queue: that would mean synthesizing the primary's first chunk fast enough to beat the fallback engine's own (much shorter) time-to-next-utterance, a race that can't be won reliably regardless of `timeoutMs` tuning — so recovery waits for a genuinely safe gap instead. It resumes with `rate`/`pitch`/`volume`/`setSpeakInContentLanguage` carried over and the originally requested voice restored. An `"enginerecovered"` event always fires before any playback from the recovered engine, with `detail: { voice }`.

Recovering resets fallback state, so the pair can bounce back and forth any number of times across a session (fallback → recover → fallback → recover...) as connectivity comes and goes.

## Options

```ts
interface FallbackEngineProviderOptions {
  primary: ReadiumSpeechEngineProvider;
  fallback: ReadiumSpeechEngineProvider;
  onFailure?: "fallback" | "error" | "fallbackAndRecover"; // default "fallback"
  healthCheckIntervalMs?: number; // only used with "fallbackAndRecover", default 30000
}
```

Set `onFailure: "error"` to disable swapping entirely and have every primary failure surface as a normal `"error"` event — useful for apps that want to handle recovery themselves, or just want visibility into failures without silently changing voices.
