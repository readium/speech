# Provider Registry

`@readium/speech` now ships two `ReadiumSpeechEngineProvider` implementations — [`WebSpeechEngineProvider`](WebSpeechEngine.md) (the browser's built-in TTS) and [`SpeechServerEngineProvider`](SpeechServerEngine.md) (a remote TTS HTTP service). An app that only ever uses one of them doesn't need anything beyond that provider directly — see each engine's doc for its full options reference:

```ts
const provider = new WebSpeechEngineProvider();
const engine = await provider.createEngine();
```

`ReadiumSpeechProviderRegistry` ([src/providerRegistry.ts](../src/providerRegistry.ts)) is for the case where an app wants **more than one provider available at once** — e.g. offering the user a choice between the device's own voices and a set of higher-quality server-hosted ones, or falling back to WebSpeech when no speech-server is configured. It's a small lookup table from provider id to provider instance, plus a couple of conveniences for working across all of them at once. Skip it entirely if your app only ever uses one provider.

## Why voices aren't merged into one list

It's tempting to want `registry.getAllVoices()` to return one flat `ReadiumSpeechVoice[]` so it can be dropped straight into a `<select>`. It deliberately doesn't, because there's no way to route a voice back to the provider that produced it once it's out of context: `ReadiumSpeechVoice.provider` already means something else per source (unset for WebSpeech, the *backend inside* speech-server — e.g. `"pocket"` — for server voices), not the registry id you'd need to call `createEngine()` again.

So the registry keeps voices grouped by provider id, and leaves flattening (if a single UI list is wanted) to the caller, who is then also responsible for remembering which provider a picked voice came from.

## API

```ts
class ReadiumSpeechProviderRegistry {
  register(provider: ReadiumSpeechEngineProvider): void;   // throws if the id is already registered
  unregister(providerId: string): void;
  get(providerId: string): ReadiumSpeechEngineProvider | undefined;
  list(): ReadiumSpeechEngineProvider[];

  getVoices(providerId: string): Promise<ReadiumSpeechVoice[]>;
  getAllVoices(): Promise<{ providerId: string; voices: ReadiumSpeechVoice[] }[]>;

  createEngine(providerId: string, voice?: ReadiumSpeechVoice | string): Promise<ReadiumSpeechPlaybackEngine>;
  destroy(): Promise<void>; // destroys every registered provider, then clears the registry
}
```

## Example: a voice picker across both providers

```ts
import {
  ReadiumSpeechProviderRegistry,
  WebSpeechEngineProvider,
  SpeechServerEngineProvider,
  ReadiumSpeechNavigator
} from "@readium/speech";

const registry = new ReadiumSpeechProviderRegistry();
registry.register(new WebSpeechEngineProvider());
registry.register(new SpeechServerEngineProvider({
  endpoints: {
    voices: "http://localhost:8000/voices",
    synthesize: "http://localhost:8000/synthesize",
    service: "http://localhost:8000/service"
  }
}));

// [{ providerId: "webspeech", voices }, { providerId: "speech-server", voices }]
const grouped = await registry.getAllVoices();

// Render as two labeled groups (e.g. <optgroup>), tracking providerId alongside each choice.
for (const { providerId, voices } of grouped) {
  renderVoiceGroup(providerId, voices);
}

// Once the user picks a (providerId, voice) pair:
async function onVoicePicked(providerId: string, voice: ReadiumSpeechVoice) {
  const engine = await registry.createEngine(providerId, voice);
  const navigator = new ReadiumSpeechNavigator(engine);
  navigator.loadContent([{ plain: "Hello world" }]);
  navigator.play();
}
```

## Falling back when a provider isn't available

`register()` doesn't validate that a provider actually works (e.g. that a speech-server is reachable) — that only surfaces the first time `getVoices()`/`createEngine()` is called and the request fails.

For an automated fallback — including mid-playback, if the primary starts failing after already working — see [`FallbackEngineProvider`](FallbackEngine.md); it wraps two providers as one and swaps between them on failure, with no registry involved.

The registry itself just holds whichever providers you choose to register. A minimal manual check before registering looks like:

```ts
const registry = new ReadiumSpeechProviderRegistry();
registry.register(new WebSpeechEngineProvider());

try {
  await fetch("http://localhost:8000/readyz");
  registry.register(new SpeechServerEngineProvider({
    endpoints: {
      voices: "http://localhost:8000/voices",
      synthesize: "http://localhost:8000/synthesize",
      service: "http://localhost:8000/service"
    }
  }));
} catch {
  // No speech-server reachable — registry.list() only has "webspeech".
}
```
