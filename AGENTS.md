# Working in this repo

Readium Speech is a standalone library for any webpage. It covers utterance extraction from Guided Navigation Documents, playback engines, voices, preferences and highlighting. A bug here is never one case: the same code runs across many inputs, options, browsers and consumers. A fix checked only against the reported case breaks other cases or misses them.

## Before changing anything

- List every combination the change touches. For each one, say what happens today, what the consumer does with it, and whether that is wrong. Fix only the confirmed wrong cases, at their source, with one rule in one place rather than one patch per case.
- Check what already exists before adding code. Don't add a side channel, cache or second mechanism next to an existing one.
- Treat existing comments, commit messages, changelog entries and PR descriptions as unverified claims. Verify them in code.
- For utterance extraction, locates and boundaries, use the `utterance-bugfix` skill (`.claude/skills/utterance-bugfix/SKILL.md`).
- For a new or changed engine or provider, use the `playback-engine` skill (`.claude/skills/playback-engine/SKILL.md`).
- To check an engine or the demos against a real speech-server, use the `speech-server-local-testing` skill (`.claude/skills/speech-server-local-testing/SKILL.md`).

## What every change has to hold for

- **Any input.** GNDs come from any producer or publication. Voices come from whatever the browser and OS report. Preferences come from what apps store and pass back.
- **Every option.** Read the options type of the API you touch and take every value of each option.
- **Every engine and platform.**
  - Engines: `WebSpeech/`, `SpeechServer/`, `Fallback/`, and providers through `providerRegistry.ts`.
  - Web Speech behaves differently per browser and OS (`docs/WebSpeech.md`, `src/utils/patches.ts`).
  - Engine-agnostic code must not assume one engine's events or timing.
- **Every consumer.**
  - ts-toolkit's navigator and Thorium Web are consumers, but the measure is the documented contract (`docs/`, `CHANGELOG.md`), not one consumer's code.
  - When a change affects a consumer, say so. Don't edit the consumer's repo.
- **`postMessage()`.**
  - Outputs cross into iframes. ts-toolkit sends locators to the content frame through `comms` (navigator-html-injectables, `src/comms/comms.ts`).
  - Outputs must be plain structured-cloneable data, and must work after `structuredClone()`. Anything that depends on object identity is lost in the copy, like the `WeakMap` page records behind `resolveBoundaryLocate()` and `resolveUtteranceSourceText()`. Those return `undefined` for a deep copy, as `docs/Highlighting.md` documents.
  - Check changes against both a spread copy and a deep copy.

## Generated and data files

- `json/`: voice data. Don't edit it unless asked; fix behaviour in code.
- `src/generated/language-metadata.ts`: `npm run generate-metadata`, from `json/`.
- `fixtures/*/utterances.json`: `npm run generate-utterances`.
- The role sets in `docs/UtteranceExtraction.md` and the tables in `docs/Verbosity.md`: `npm run generate-role-sets` and `npm run generate-verbosity-tables`.

## Verifying

- Passing tests and fixtures prove nothing about cases they don't hold. Build adversarial cases from realistic inputs.
- Compare against the commit before the task, not HEAD, and report what broke as well as what was fixed.
- Check every documented contract the change touches.

## Docs and changelog

- `docs/*.md` documents consumer-facing API only. Trace the code before writing any behaviour claim.
- `CHANGELOG.md` follows Keep a Changelog. Don't list "Fixed" bullets for symbols new in that version, and don't state option-gated behaviour as unconditional.

## Tooling

- Node `>=24` (`engines`), npm (`package-lock.json`): `npm test`, `npm run test:utterances`, `npm run typecheck`.
- Never temp-edit tracked files to experiment. Use a scratch `git worktree`.
