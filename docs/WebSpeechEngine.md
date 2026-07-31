# WebSpeechEngine

`WebSpeechEngine` implements `ReadiumSpeechPlaybackEngine` (see [Playback.md](Playback.md)) against the browser's built-in [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API). `WebSpeechEngineProvider` wraps it for use with a single provider or [`ReadiumSpeechProviderRegistry`](ProviderRegistry.md).

For platform-specific quirks and voice behavior across browsers/OSes, see [WebSpeech.md](WebSpeech.md).

## Construction

Via the provider — always calls `initialize()` with no options, so use this only when you're fine with the defaults below:

```ts
import { WebSpeechEngineProvider } from "@readium/speech";

const provider = new WebSpeechEngineProvider();
const engine = await provider.createEngine();
```

Directly, when you need to pass options:

```ts
import { WebSpeechEngine } from "@readium/speech";

const engine = new WebSpeechEngine();
await engine.initialize({
  languages: ["en", "fr"],
  maxLengthExceeded: "error" // default is "warn" — override to fail fast instead
});
```

## `initialize()` options

```ts
async initialize(options?: {
  languages?: string[];
  maxTimeout?: number;
  interval?: number;
  maxLengthExceeded?: "error" | "none" | "warn";
}): Promise<boolean>
```

`languages`, `maxTimeout`, and `interval` are forwarded as-is to `WebSpeechVoiceManager.initialize()` — see [VoiceManagement.md](VoiceManagement.md#initialize-the-voice-manager) for what each does.

`maxLengthExceeded` (default `"warn"`) controls what happens when an utterance's text exceeds the Web Speech API's practical length limit: `"warn"` logs a console warning and speaks anyway, `"error"` throws, `"none"` does nothing and speaks anyway. Unlike `SpeechServerEngine`'s `overLengthText: "split"` (see [SpeechServerEngine.md](SpeechServerEngine.md)), there is no splitting behavior here — the Web Speech API has no equivalent server-side request-size constraint to work around, just an engine-dependent practical ceiling.

Calling `initialize()` again on an already-initialized engine is a no-op (`false`).
