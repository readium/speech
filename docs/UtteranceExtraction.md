# Utterance Extraction

`extractUtterances` walks a [Guided Navigation](GuidedNavigation.md) tree into a flat, ordered list of `ReadiumSpeechUtterance`s ready for playback.

```typescript
import { makeGnd, extractUtterances } from "@readium/speech";

const gnd = makeGnd(`<p lang="en">It was a dark and stormy night.</p>`);

extractUtterances(gnd.guided, { format: "plain" });
// [{ language: "en", plain: "It was a dark and stormy night." }]
```

Takes `GndObject[]` (`parseMarkup()`'s return / `GndDocument.guided`), not a wrapped `GndDocument`.

```typescript
interface ReadiumSpeechUtterance {
  id?: string;
  plain?: string;
  ssml?: string;
  language?: string;      // BCP 47
  startsNewBlock?: true;  // present (and true) only when this utterance begins a new block-level element
}
```

`startsNewBlock` marks the first utterance of a node whose role is in `blockLevelRoles` (a paragraph, heading, list item, table cell, ...) whenever it isn't a continuation of the block already in progress — e.g. a `<p>` split into several utterances by inline `<lang>` spans only gets the marker on its first piece. `ReadiumSpeechNavigator` uses it to scope `pauseDuration` under `pauseScope: "block"` (see [Preferences](Preferences.md#prosody)).

Some roles get a synthesized navigational announcement spoken around their content (entering/leaving a chapter, a pagebreak label...); see [`ExtractUtterancesOptions.announcements`](../src/utterances/types.ts) and [`defaultAnnouncements`](../src/utterances/announcements.ts) in source — the catalog is still English-only and expected to move to a localized (Weblate-sourced) format, so it isn't documented here yet.

## Options

```typescript
interface ExtractUtterancesOptions {
  format: "plain" | "ssml";
  skip?: GndRole[];
  contextualize?: GndRole[];
  language?: "none" | "block-level" | "always";
  interruptSentence?: boolean;
}
```

- **`format`** — default `"plain"`. Picks the one field every utterance in the result carries, so a consumer never has to check per-utterance which of `plain`/`ssml` is populated. Whichever a `GndObject` doesn't natively have is synthesized (`plain` → escaped `ssml`; `ssml` → tags stripped to `plain`).
- **`skip`** — drop a role and its subtree entirely (content + announcement). `skippableRoles` export is the [roles.md skippable set](https://github.com/readium/guided-navigation/blob/main/roles.md#list-of-skippable-roles): `aside`, `bibliography`, `details`, `endnotes`, `footnote`, `noteref`, `pullquote`, `landmarks`, `loa`, `loi`, `lot`, `lov`, `pagebreak`, `toc`. Default: nothing skipped.
- **`contextualize`** — which roles' announcements are spoken (a role still needs a `defaultAnnouncements`/`announcements` entry to say anything). Default: nothing announced, same polarity as `skip` — unlike `skip`, the underlying content still plays either way.
- **`language`** — how a node's own inline spans (`<em lang="fr">`) render. Never merges across sibling utterances.
  - `"always"` (default) — `ssml` keeps spans tagged; `plain` splits into one utterance per language run.
  - `"block-level"` — inline spans merge untagged into the surrounding text; block-level `language` kept.
  - `"none"` — same merge as `"block-level"`, plus `language` dropped everywhere.
- **`interruptSentence`** — a mid-sentence pagebreak/footnote splits the sentence at that point instead of after it finishes. Default `false`.

```typescript
// <p>...in the middle <span epub:type="pagebreak" title="5"/> of a sentence.</p>
extractUtterances(gnd, { format: "plain" });
// [{ plain: "4" }, { language: "en", plain: "...in the middle of a sentence." }, { plain: "5" }]

extractUtterances(gnd, { format: "plain", contextualize: ["pagebreak"] });
// [{ plain: "Pagebreak. 4." }, { language: "en", plain: "...in the middle of a sentence." }, { plain: "Pagebreak. 5." }]

extractUtterances(gnd, { format: "plain", skip: ["pagebreak"] });
// [{ language: "en", plain: "...in the middle of a sentence." }]
```

## Fixtures

Each fixture's `utterances.json` is the hand-reviewed expected output for one option combo — see [fixtures/README.md](../fixtures/README.md#utterance-extraction-options) and [Testing](../README.md#testing).
