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
  language?: string; // BCP 47
}
```

Some roles get a synthesized navigational contextualization spoken around their content (entering/leaving a table, a pagebreak label...) — see [`defaultContextualizations`](../src/utterances/contextualizations.ts), sourced from [`locales/en.json`](../locales/en.json).

## Options

```typescript
interface ExtractUtterancesOptions {
  format: "plain" | "ssml";
  skip?: GndRole[];
  contextualize?: GndRole[];
  contextualizationShapes?: Partial<Record<GndRole, "inline" | "block">>;
  contextualizations?: Contextualizations;
  contextualizationLocale?: string;
  language?: "none" | "block-level" | "always";
  inlineContextualization?: boolean;
}
```

- **`format`** — default `"plain"`. Picks the one field every utterance in the result carries, so a consumer never has to check per-utterance which of `plain`/`ssml` is populated. Whichever a `GndObject` doesn't natively have is synthesized (`plain` → escaped `ssml`; `ssml` → tags stripped to `plain`).
- **`skip`** — drop a role and its subtree entirely (content + contextualization). `skippableRoles` export is the [roles.md skippable set](https://github.com/readium/guided-navigation/blob/main/roles.md#list-of-skippable-roles): `aside`, `bibliography`, `details`, `endnotes`, `footnote`, `noteref`, `pullquote`, `landmarks`, `loa`, `loi`, `lot`, `lov`, `pagebreak`, `toc`. Default: nothing skipped.
- **`contextualize`** — which roles get contextualized (a role still needs a catalog entry to say anything). Default: nothing contextualized, same polarity as `skip` — unlike `skip`, the underlying content still plays either way.
- **`contextualizationShapes`** — per-role override of contextualization shape: `"inline"` reads the role's `inline` catalog entry, once, before its content; `"block"` (default when a role is absent here) reads its `block.start`/`block.end` entries, around the content. Only affects roles with both a `block` and an `inline` catalog entry, and an entry in `contextualize`.
- **`contextualizations`** — override or extend the catalog for any subset of roles; merged shallowly over the locale's default. See "Contextualization catalog" below for its shape.
- **`contextualizationLocale`** — which shipped catalog to use (wording + plural rules). Default `"en"`; falls back to `"en"` if the locale isn't shipped.
- **`language`** — how a node's own inline spans (`<em lang="fr">`) render. Never merges across sibling utterances.
  - `"always"` (default) — `ssml` keeps spans tagged; `plain` splits into one utterance per language run.
  - `"block-level"` — inline spans merge untagged into the surrounding text; block-level `language` kept.
  - `"none"` — same merge as `"block-level"`, plus `language` dropped everywhere.
- **`inlineContextualization`** — a mid-sentence pagebreak/footnote splits the sentence at that point instead of after it finishes. Default `false`.

```typescript
// <p>...in the middle <span epub:type="pagebreak" title="5"/> of a sentence.</p>
extractUtterances(gnd, { format: "plain" });
// [{ plain: "4" }, { language: "en", plain: "...in the middle of a sentence." }, { plain: "5" }]

extractUtterances(gnd, { format: "plain", contextualize: ["pagebreak"] });
// [{ plain: "Pagebreak. 4." }, { language: "en", plain: "...in the middle of a sentence." }, { plain: "Pagebreak. 5." }]

extractUtterances(gnd, { format: "plain", skip: ["pagebreak"] });
// [{ language: "en", plain: "...in the middle of a sentence." }]
```

## Contextualization catalog

Each entry is keyed by `GndRole` and resolved through [i18next](https://www.i18next.com/), so wording is a translatable JSON resource, not code:

```jsonc
{
  "figure": { "inline": "Figure: {{ description }}" },
  "table": {
    "block": {
      "start": {
        "labelled": "Table: {{ description }}. {{ lines }}. {{ columns }}.",
        "unlabelled": "Table. {{ lines }}. {{ columns }}."
      },
      "end": "End of the table."
    },
    "inline": {
      "labelled": "Table: {{ description }}. {{ lines }}. {{ columns }}.",
      "unlabelled": "Table. {{ lines }}. {{ columns }}."
    },
    "parts": { "lines_one": "1 line", "lines_other": "{{ count }} lines", ... }
  }
}
```

- **`inline`** — spoken once, before the node's content. A role with both `inline` and `block` entries (e.g. `table`) speaks `inline` instead of `block` when `contextualizationShapes` overrides it — see [Options](#options) above.
- **`block: { start, end }`** — spoken before and after the node's content.
- A value can be a plain string, or an object of named variants (`labelled`/`unlabelled`, `withHeader`/`withoutHeader`) the extractor picks between based on the node — e.g. `audio`/`video`/`image`/`math` pick `labelled` when the node has a `description`, `cell`/`rowheader` pick `withHeader` when a column header was found for that cell.
- **`parts`** — pluralizable fragments a role's own wording references as tokens (`{{ lines }}`), using i18next's plural-category key suffixes (`lines_one`, `lines_other`, ...) so each locale supplies its own plural forms.
- `{{ token }}` placeholders are substituted per role: `description` (audio/video/image/math/figure/table), `count` (row's position, table's `parts` counts), `header`/`value` (cell/rowheader), `lines`/`columns` (table).

`table`/`row`/`cell`/`rowheader` also get real structural data: a cell's `header` is its table's column-header text at the same position (GND doesn't carry colspan/rowspan, so association is positional); `row`'s `count` is its 1-based position in the table.

A `<table>`/`<figure>` with no explicit ARIA name (`aria-label`/`aria-labelledby`) but a `<caption>`/`<figcaption>`/`role="caption"` child folds that child's text into its own `description` instead of speaking it as a separate node (implicit accessible name, matching HTML-AAM).

## Fixtures

Each fixture's `utterances.json` is the hand-reviewed expected output for one option combo — see [fixtures/README.md](../fixtures/README.md#utterance-extraction-options) and [Testing](../README.md#testing).
