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

`languages` are also the content's languages, in order, that the default voice is picked for when no voice is set: the best voice of the first one with voices, preferring one with boundary events. Without `languages`, it uses the user's preferred languages (`navigator.languages`) instead. `getCurrentVoice()` returns that default until a voice is set with `setVoice()`, given a voice or its id, matched by `voiceURI`, then `name`.

Each utterance is spoken with its own [`voice`](Playback.md#speaking-an-utterance-with-its-own-voice) when the browser has it, else with the current voice, whatever the utterance's `language`. `ReadiumSpeechNavigator` gives each utterance a voice for its language (see [Playback.md](Playback.md#speaking-in-an-utterances-own-content-language)).

`maxLengthExceeded` (default `"warn"`) controls what happens when an utterance's text exceeds the Web Speech API's practical length limit, 4096 UTF-8 bytes: `"warn"` logs a console warning and speaks anyway, `"error"` throws, `"none"` does nothing and speaks anyway. Unlike `SpeechServerEngine`'s `overLengthText: "split"` (see [SpeechServerEngine.md](SpeechServerEngine.md)), there is no splitting behavior here — the Web Speech API has no equivalent server-side request-size constraint to work around, just an engine-dependent practical ceiling.

Calling `initialize()` again on an already-initialized engine is a no-op (`false`). A call made while another is still running shares it, and its options are ignored.

## Text

The Web Speech API has no SSML support: an utterance is spoken from its `plain` text, else from its `ssml` with tags stripped and entities decoded. `<` and `>` are replaced with zero-width spaces, since some engines take them for markup; boundary `charIndex`es don't shift.

## Browser workarounds

For platform quirks, see [WebSpeech.md](WebSpeech.md). The engine works around these:

- **Google and Chrome OS voices** cut off long text: outside Android, Firefox and Safari, the engine pauses and resumes them every 5 seconds while they speak. They also fire no native pause/resume events, so the engine emits `"pause"` and `"resume"` itself.
- **Android**: `pause()` cancels speech, and `resume()` speaks the current utterance again from its start. The `"interrupted"` error from that cancel isn't reported.
- **Firefox** fires `end` for a cancelled utterance: an `end` within 100 ms of a cancel is ignored.
- **Safari** ends the current utterance when a cancelled one's late "finished" arrives, about 100 ms after the cancel: an utterance spoken within 250 ms of a cancel waits for that, and is spoken once more if Safari still ends it without starting it.
