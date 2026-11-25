---
name: utterance-bugfix
description: Use before fixing or changing anything in utterance extraction, locates, offsets or word/sentence boundaries (src/utterances/, resolveBoundaryLocate, resolveUtteranceLocate). Covers the input forms, options, output paths and consumers a fix must be checked against.
---

# Fixing utterance extraction

Read `AGENTS.md` first. Before editing, write down the matrix below for the change. For each case, give what `main` emits, what the consumer does with it, and whether that is wrong. Fix only the confirmed wrong cases, at their source, with one rule in one place.

## Inputs: any Guided Navigation Document

What `@readium/guided-navigation`'s `parseMarkup` writes is one producer's output, not the limit of what Speech receives.

- `textref` is any URI reference ([spec](https://github.com/readium/guided-navigation)). Each of these forms is a real input, alone or combined:
  - `#id`
  - `#css(…)`
  - `#domrange(…)`
  - `:~:text=` with an exact quote, a prefix or suffix, or a `start,end` range, with or without a selector. The spec's own example has no selector.
  - no textref at all, in which case the nearest ancestor's is used.
- `decodeTextref` (@readium/guided-navigation, `textrefFragment`) turns:
  - a directive with an end into `fragment`;
  - one without an end into `text` (with `before`/`after`);
  - a selector into `cssSelector` (and `domRange`).
- `text.plain` and `text.ssml` can hold any SSML, any whitespace and any language. A node can carry any combination of roles.

## Options

Take every value of every option the change can reach in `ExtractUtterancesOptions` (`src/utterances/types.ts`):
- `format`, `segmentation` (`mode`, `reconstruct`, `suppressions`)
- `skip`, `contextualize`, `contextualization`, `interruptions`
- `language`, `contentLanguage`, `languageOverrides`
- `substitutions`

## Outputs and where they're built

- Outputs:
  - utterance `plain` / `ssml`
  - `locate`
  - `offsets`
  - `resolveBoundaryLocate()` (words)
  - `resolveUtteranceLocate()` (sentence and structure boundaries)
  - `resolveUtteranceSourceText()`
- Locates are built in:
  - `subLocateFor`, `resolveNodeLocate`, `preciseLocateFor` and `attachLocate` (`locate.ts`)
  - `runLocate` (`sourceSpans.ts`)
  - contextualization (`scopeToQuote`)
  - aliases (`walk.ts`)
  - merges (`mergeUtterances.ts`)
  - sentence reconstruction
  - `resolveBoundaryLocate` (`boundaryLocate.ts`)

  Find every one the change reaches.

## Consumers

- `rangeFromLocator` (navigator-html-injectables, `src/helpers/locator.ts`):
  - It tries `domRange`, then a text fragment from `locations.fragments` (where `createLocator` puts `fragment`), then `text`, then the element.
  - The `text` search is approximate (prefix/suffix only score candidates). It runs inside the `cssSelector` element, or the whole body when there is none.
- ts-toolkit's `ReadAloudNavigator.wordPoint` relies on a word's `before + highlight + after` equalling its offset's, which the CHANGELOG documents (0.23.0).

## Verifying

- Build adversarial cases from realistic markup or GNDs:
  - neighbouring and repeated text
  - punctuation
  - adjacent elements of the same kind
  - every option value
  - every textref form above
- In a scratch worktree, run each case against the commit before the task and against the change. Anchor every locate the way `rangeFromLocator` does, not by eyeballing JSON. Report what broke as well as what was fixed.
- Fixtures passing proves nothing about cases they don't hold. Unit tests go only where fixtures can't cover the behaviour.
