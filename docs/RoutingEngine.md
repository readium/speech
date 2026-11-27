# RoutingEngine

`RoutingEngineProvider` combines several [providers](ProviderRegistry.md) into one. Its engine speaks each utterance with the provider whose voice it is, so one navigator can read a multilingual publication with Web Speech voices for some languages and speech-server voices for others, without restarting at a language switch.

```ts
import {
  RoutingEngineProvider,
  SpeechServerEngineProvider,
  WebSpeechEngineProvider,
  ReadiumSpeechNavigator
} from "@readium/speech";

const provider = new RoutingEngineProvider({
  providers: [
    new SpeechServerEngineProvider({ endpoints: { voices: "...", synthesize: "...", service: "..." } }),
    new WebSpeechEngineProvider()
  ]
});

const engine = await provider.createEngine();
const navigator = new ReadiumSpeechNavigator(engine, { languages: ["en", "fr"] });
```

## Voices

- `getVoices()` on the provider and `getAvailableVoices()` on the engine list the voices of every provider. The navigator picks a voice for each language from this combined list, the same way it picks from a single engine's list.
- To use a given provider for a language, set the `voice` preference for that language to one of that provider's voices:

  ```ts
  preferences: { voice: { en: "urn:…", fr: "com.apple.voice.compact.fr-FR.Thomas" } }
  ```
- Voice ids stay as [`getVoiceId()`](VoiceManagement.md) returns them. They don't name the provider.
- When several providers list a voice with the same id, or with the same name when no id matches, the first of `providers` speaks it and it is listed once.
- If a provider fails to list its voices, it is left out of the list. The call fails only when every provider fails.
- `engine.setVoice(id)` sets the voice on the provider that lists it, even if its voices haven't been listed yet. In that case it asks every provider for that voice first:
  - `getCurrentVoice()` returns the previous voice until they answer.
  - A queue loaded before they answer waits for them (`getState()` is `"loading"`), then goes to that provider.
  - The last `setVoice()` wins, even over one still waiting.
  - A voice no provider lists is set on the provider of the current voice.

  ```ts
  engine.setVoice("urn:voice:lea");               // a speech-server voice, not listed yet
  engine.loadUtterances([{ plain: "Bonjour." }]); // spoken by the speech-server
  ```

## Playback

- Each provider's engine is loaded with the whole queue, and speaks only the utterances of its voices.
  - The other utterances are only their neighbours' text, e.g. the `prev_utterance`/`next_utterance` a speech-server is sent.
  - A speech-server engine keeps fetching audio for its own upcoming utterances while Web Speech reads the ones in between. A move to another engine's utterance in the middle of one of its own stops it, which drops that audio, as a far seek does.
  - It starts buffering from its first utterance at or after the start index.
- Content goes to the engine of the current voice if it has no voice of its own, or if its voice isn't listed by any provider. That is the voice passed to `createEngine()` or the last `setVoice()`, else the first provider's. A change to it applies from the next `loadUtterances()`.
- `"ready"` is sent when the engine of the start utterance is ready.
- Playback events (`start`, `end`, `boundary`, `pause`, …) come only from the engine reading the current utterance. `voiceschanged`, `enginefallback` and `enginerecovered` come from any engine.
- An engine is stopped when playback moves to another engine's utterance in the middle of its own, when `loadUtterances()` is called in the middle of its utterance, and by `stop()` or the end of the queue. Only the `"stop"` of the engine reading the current utterance on `stop()` is forwarded. A move by `setCurrentUtteranceIndex()` while playing sends one `"stop"`, as a single engine does; a move by `speak()` sends none.
- `rate`, `pitch` and `volume` are set on every engine.
- If a provider's `createEngine()` fails, it is left out. `createEngine()` fails only when every provider fails.
- `isAvailable()` on the provider is `true` when at least one provider's `isAvailable()` is, e.g. Web Speech's while the speech-server is down: the engine can still speak with its voices. A provider without `isAvailable()`, or whose `isAvailable()` fails, doesn't count.

## With FallbackEngine

A provider in `providers` can be a [`FallbackEngineProvider`](FallbackEngine.md), for example a speech-server that falls back to Web Speech when it is offline:

```ts
new RoutingEngineProvider({
  providers: [
    new FallbackEngineProvider({ primary: new SpeechServerEngineProvider({ /* ... */ }), fallback: new WebSpeechEngineProvider() }),
    new WebSpeechEngineProvider()
  ]
});
```

When it falls back or recovers, its event is forwarded, and the navigator picks its voices again from the combined list. Don't wrap a `RoutingEngineProvider` itself in a `FallbackEngineProvider`: that would pick one fallback voice for the whole queue.

## Options

```ts
interface RoutingEngineProviderOptions {
  providers: ReadiumSpeechEngineProvider[]; // in priority order, at least one
}
```
