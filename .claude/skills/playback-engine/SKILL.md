---
name: playback-engine
description: Use before writing a new ReadiumSpeechPlaybackEngine or ReadiumSpeechEngineProvider, including one wrapping other engines (like FallbackSpeechEngine or RoutingSpeechEngine), or before changing how an engine emits events, handles its queue or matches voices.
---

# Writing a playback engine

Read `AGENTS.md` first. Check whether an existing engine or wrapper already covers the need: `WebSpeech/`, `SpeechServer/`, `Fallback/` (swap on failure), `Routing/` (per-utterance provider). A new engine mirrors the shape of its closest equivalent.

## The contract engines are held to

`ReadiumSpeechPlaybackEngine` (`src/engine.ts`) as `ReadiumSpeechNavigator` (`src/speechNavigator.ts`) uses it. It holds whatever produces the audio: a browser API, a server, a model running in the page. Verify each point against the navigator, not this list.

- **Queue and index**
  - `loadUtterances(contents, startIndex)` replaces the queue and emits `"ready"` once playback can start at `startIndex`. That can be synchronous, or after audio is prepared ahead; use `startIndex` to prepare the right utterances.
  - The engine never advances on its own: it emits `"end"` when an utterance finishes, and the navigator calls `speak(i + 1)`, after a pause it chooses.
  - `speak(index)` plays that utterance from its start. `speak()` without an index keeps the current one.
  - `stop()` silences, resets the index to 0 and emits `"stop"`.
  - `setCurrentUtteranceIndex()` moves without playing, and calls `onComplete(false)` when out of range. If it interrupts an utterance being spoken (not paused), it moves first, then emits `"idle"` and `"stop"`, then calls `onComplete`, all synchronously, so a `"stop"` listener can `speak()`.
- **State and events**
  - `getState()` stays `"playing"` between utterances, after `"end"`. Code needing "mid-utterance" tracks it from `start`/`end`/`stop`/`error`.
  - While an utterance asked to play has no audio yet (fetching, generating, decoding), the state is `"loading"` and `"loading"` is emitted: the navigator turns it into `"waiting"`. `"start"` comes when the audio does.
  - `pause()` works at every point: before the audio arrives, while playing, between utterances. It emits `"pause"`, and nothing plays until `resume()`, including audio that arrives meanwhile.
  - Work done ahead for later utterances (prefetching, decoding) must not change playback: no sound, no state change, no events.
  - A setting that changes the audio (voice, rate, pitch) applies from the current utterance: restart it, or on `resume()` when paused. Ignore a value that hasn't changed.
- **Text and boundaries**
  - Speak `utterance.plain` when it has one. Only an utterance with `ssml` alone is spoken from SSML, rendered by an engine that can, its tags stripped by one that can't.
  - `"boundary"` events give `charIndex`/`charLength` in the plain text: `plain`, or the SSML without its tags, however it was spoken. A voice that can't time words reports `controls.boundary: false`.
- **Errors**: the `"error"` detail is an `ErrorEventDetail` (`src/Fallback/recoverableFailure.ts`). Set `recoverable: true` only when the backend was never reached (no network, no answer, a stall), so another engine could succeed.
- **Voices**
  - `getAvailableVoices(languages, voiceIds)` lists the voices of `languages` and of `voiceIds`, whatever their language.
  - Voice ids are `getVoiceId()`, matched by id, else by name: `findVoice()` in `src/voices/voiceLookup.ts`.
  - An `utterance.voice` the engine doesn't have falls back to its current voice.
  - `controls` says what a voice honours (`boundary`, `speed`, `pitch`, `ssml`). `offlineAvailability` says whether it works without a network.
- **Events cross `postMessage()`**: event details must be plain, structured-cloneable data.

`src/WebSpeech/` (a synchronous browser API) and `src/SpeechServer/` (fetched audio, buffered ahead) are the two references for how one engine meets this.

## Wrapping other engines

Follow `src/Fallback/` and `src/Routing/`:

- **Files:**
  - an options interface;
  - `<name>SpeechEngine.ts` and `<name>EngineProvider.ts`;
  - an `index.ts`;
  - an export from `src/index.ts`.
- **Forwarding events:** use `playbackEventTypes(...excluded)` (`src/playbackEvents.ts`), never a hand-copied list.
- **Shared helpers:**
  - `settleAll()` (`src/utils/settleAll.ts`) runs a call on every child and throws only when all fail;
  - `uniqueVoices()` merges voice listings;
  - `EventEmitter` for the wrapper's own events.
- **Only the active child's playback events reach listeners.** Unbind or filter a child before stopping it, so its `"stop"` isn't forwarded. Children can share one output (two Web Speech engines share `speechSynthesis`), so never `stop()` or `pause()` an idle child.
- **Swaps and reloads that await:** guard them with tokens (`loadToken`, `teardownEpoch`) and keep the desired index and playing state live, not snapshotted.
- **What to forward from any child:**
  - `voiceschanged`;
  - `enginefallback` / `enginerecovered`, after which the navigator re-picks voices via `refreshVoicesForEngine()`.
- **No `WeakMap`s, caches or side channels next to existing data.** A per-child `Map` of listed voices is the engine's own voice list.
- **`destroy()`** unsubscribes, clears listeners and destroys every child.

## Providers

`ReadiumSpeechEngineProvider` (`src/provider.ts`):
- `id` and `name`;
- `getVoices(forceRefresh)`;
- `isAvailable()`, needed for Fallback recovery;
- `createEngine(voice?)`, which shouldn't fetch when it can avoid it;
- `destroy()`.

Voices are never flattened across providers by `ReadiumSpeechProviderRegistry`. A voice's `provider` field means something different per source.

## Tests

- **Mocks:**
  - `FakeEngine` (`test/Fallback/testUtils.ts`), with `synchronous: true` to match Web Speech;
  - `MockEngine` (`test/navigator/mockEngine.ts`) for navigator-level behaviour;
  - `createMockFetch` and the Web Audio mocks for `SpeechServerEngine`.
- **Imports:** tests import `../../build/index.js`. `npm test` builds and typechecks first.
- **Cover:**
  - alternating owners or engines;
  - a start index mid-queue;
  - a seek while paused (no `"stop"`), and while playing (one `"stop"`, in the order above);
  - pause/resume at each point (before the audio arrives, while playing, between utterances);
  - a reload during an async step;
  - a child failing to list voices or create an engine;
  - rate/pitch/volume;
  - one test through a real `ReadiumSpeechNavigator`.
- **Timing against a real server:** use the `speech-server-local-testing` skill.

## Docs, demos, consumers

- `docs/<Name>.md` documents consumer-facing behaviour only. Link it from `docs/ProviderRegistry.md`.
- `CHANGELOG.md`: "Added" for new symbols. No "Fixed" bullets for symbols new in that version.
- Demos get engines from `demo/speechEngine.js` only.
- If ts-toolkit's `ReadAloudNavigator` or Thorium Web is affected, don't edit them: end with a ready-to-paste prompt for those sessions.
