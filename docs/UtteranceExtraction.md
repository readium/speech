# Utterance Extraction

{% raw %}

`extractUtterances` walks a [Guided Navigation](GuidedNavigation.md) tree into a flat, ordered list of `ReadiumSpeechUtterance`s ready for playback.

```typescript
import { makeGnd, extractUtterances } from "@readium/speech";

const gnd = makeGnd(`<p lang="en">It was a dark and stormy night.</p>`);

await extractUtterances(gnd.guided, { format: "plain" });
// [{ language: "en", plain: "It was a dark and stormy night." }]
```

Takes `GndObject[]` (`parseMarkup()`'s return / `GndDocument.guided`), not a wrapped `GndDocument`.

```typescript
interface ReadiumSpeechUtterance {
  id?: string;
  plain?: string;
  ssml?: string;
  language?: string; // BCP 47
  locate?: LocatorOptions; // Decoded from the source node's textref — spread into createLocator()/decorate(), see GuidedNavigation.md
  offsets?: UtteranceOffset[]; // Ranges of plain/ssml backed by real source text, each with its own locate
}

interface UtteranceOffset {
  start: number;
  end: number;
  locate: LocatorOptions;
}
```

Some roles get a synthesized navigational contextualization spoken around their content (entering/leaving a table, a pagebreak label...) — see [`defaultContextualizations`](../src/utterances/contextualizations.ts), sourced from [`locales/en.json`](../locales/en.json). A synthesized label/announcement carries no `offsets` at all — `locate` is still safe for element-scoped highlighting, but there's no real source text to search for.

## Options

```typescript
interface ExtractUtterancesOptions {
  format: "plain" | "ssml";
  skip?: GndRole[];
  contextualize?: GndRole[];
  contextualizationLocale?: string;
  contextualization?: ContextualizationOptions;
  language?: "none" | "block-level" | "always";
  inlineContextualization?: boolean;
  segmentation?: SegmentationOptions;
  substitutions?: SubstitutionTable;
}

interface ContextualizationOptions {
  contextualizations?: Contextualizations;
  shapes?: Partial<Record<GndRole, "inline" | "block">>;
  params?: (role: GndRole, node: GndObject) => Record<string, string> | undefined;
}

interface SegmentationOptions {
  mode?: "structure" | "sentence"; // default "structure"
  suppressions?: Record<string, string[]>; // per-language sentence-ending exceptions, keyed like `language`
}

type SubstitutionRule = string | { pattern: RegExp; replace: string | ((...match: string[]) => string) };
type SubstitutionTable = Record<string, SubstitutionRule>;
```

Quick reference:

| Option | Default | Purpose |
| --- | --- | --- |
| `format` | `"plain"` | which field (`plain`/`ssml`) every utterance carries |
| `skip` | none skipped | drop a role and its subtree entirely |
| `contextualize` | none contextualized | which roles get a spoken announcement |
| `contextualizationLocale` | `"en"` | which shipped wording/plural-rules catalog to start from |
| `contextualization.contextualizations` | shipped catalog | reword or add announcement text, per role, on top of that catalog |
| `contextualization.shapes` | per the catalog | which of a role's shapes (single line vs. bounded pair) is spoken — the piece [verbosity levels](Preferences.md#verbosity) drive to make a role's announcement vary by level |
| `contextualization.params` | none | supply a placeholder value the extractor has no built-in source for |
| `language` | `"block-level"` | how a node's own inline-language spans render |
| `inlineContextualization` | `false` | split a sentence at a mid-sentence pagebreak/footnote, instead of after it |
| `segmentation.mode` | `"structure"` | one utterance per structural unit, or split/reconstruct at real sentence boundaries |
| `segmentation.suppressions` | none | per-language abbreviations (e.g. `"d."`) that sentence mode won't treat as endings |
| `substitutions` | `builtInSubstitutions` | ASCII imitations of Unicode symbols (`"1/2"`, `"(c)"`, `"100deg"`) to rewrite before speaking |

### `format`

Picks the one field every utterance in the result carries, so a consumer never has to check per-utterance which of `plain`/`ssml` is populated. Whichever a `GndObject` doesn't natively have is synthesized (`plain` → escaped `ssml`; `ssml` → tags stripped to `plain`).

### `skip`

Drops a role and its whole subtree — content and announcement both — from the output. `skippableRoles` export is the [roles.md skippable set](https://github.com/readium/guided-navigation/blob/main/roles.md#list-of-skippable-roles).

### `contextualize`

Which roles get an announcement. The wording comes from the shipped catalog by default — no need to supply your own `contextualizations` entry unless you want to change it (see below); a role with no entry at all, shipped or custom, just stays silent. Unlike `skip`, the underlying content still plays either way — only the extra announcement is gated by this.

```typescript
// <p>...in the middle <span epub:type="pagebreak" title="5"/> of a sentence.</p>
await extractUtterances(gnd, { format: "plain" });
// [{ plain: "4" }, { language: "en", plain: "...in the middle of a sentence." }, { plain: "5" }]

await extractUtterances(gnd, { format: "plain", contextualize: ["pagebreak"] });
// [{ plain: "Pagebreak. 4." }, { language: "en", plain: "...in the middle of a sentence." }, { plain: "Pagebreak. 5." }]

await extractUtterances(gnd, { format: "plain", skip: ["pagebreak"] });
// [{ language: "en", plain: "...in the middle of a sentence." }]
```

### Contextualization

`contextualizationLocale` and `contextualization` are unrelated to each other:

- **`contextualizationLocale`** just retrieves a default shipped JSON catalog — it's a data-source switch, nothing more. Most consumers only need this one.
- **`contextualization`** (`contextualizations`/`shapes`/`params`) *overrides* whatever catalog ends up loaded — these three depend on each other, not on which locale you picked, which is why they're grouped into one object instead of three flat top-level options:
  - **`contextualizations`** rewords or extends the loaded catalog, for any subset of roles.
  - **`shapes`** picks, for a role whose entry (after that reword) has both forms, which one actually gets spoken.
  - **`params`** supplies data for a placeholder that wording references but the extractor has no built-in source for.

#### `contextualizationLocale`

Which shipped catalog to use (wording + plural rules). Falls back to `"en"` if the given locale isn't shipped. Distinct from `language` further below, which governs the content's own inline spans, not the catalog's.

#### `contextualization.contextualizations`

Override or extend the shipped wording catalog for any subset of roles, at any depth (e.g. just `table.block.start`) — merged over the locale's default. See [Contextualization catalog](#contextualization-catalog) below for its shape.

```typescript
// Reword one existing role...
await extractUtterances(gnd, {
  format: "plain",
  contextualize: ["figure"],
  contextualization: { contextualizations: { figure: { inline: "Illustration: {{ description }}" } } },
});

// ...or add wording for a role the shipped catalog has no entry for at all,
// e.g. a custom GND extension role not in the spec.
await extractUtterances(gnd, {
  format: "plain",
  contextualize: ["sidebar"],
  contextualization: { contextualizations: { sidebar: { block: { start: "Sidebar.", end: "End of sidebar." } } } },
});
```

#### `contextualization.shapes`

Exists so a role's announcement can be a single upfront line (`"inline"`) or a bounded pair (`"block"`, start before the content/end after) — for a role whose catalog entry defines *both* forms. A role with just one form always uses that one; this field has nothing to switch for it.

At the raw `extractUtterances` level this is just the resolved choice for *one call* — a flat `{ role: "inline" | "block" }` map, not something that varies on its own. A caller that wants a role's shape to vary by context (e.g. by [verbosity level](Preferences.md#verbosity)) re-resolves this map and re-calls `extractUtterances` each time that context changes — which is exactly what `ReadiumSpeechNavigator` does internally, see [Playback](Playback.md#contextualizationoverrides).

Define both forms for a role of your own via `contextualization.contextualizations`, then pick which one speaks:

```typescript
// Give a custom "sidebar" role both an inline and a block form:
const options = {
  format: "plain",
  contextualize: ["sidebar"],
  contextualization: {
    contextualizations: {
      sidebar: { inline: "Sidebar.", block: { start: "Start of the sidebar.", end: "End of the sidebar." } },
    },
  },
};

await extractUtterances(gnd, options);
// "Start of the sidebar." ... content ... "End of the sidebar." (block is the default when both forms exist)

// No verbosity level here — this is a single call, forced to "inline" outright.
// A shape that varies by verbosity level is a navigator concept, not this
// function's: see contextualizationOverrides.shapes in Playback.md.
await extractUtterances(gnd, { ...options, contextualization: { ...options.contextualization, shapes: { sidebar: "inline" } } });
// "Sidebar." ... content.
```

#### `contextualization.params`

Extra `{{ placeholder }}` values for a role, computed from its `GndObject` fields — for a placeholder the extractor has no built-in source for at all.

`table`/`row`/`cell`/`rowheader`'s own `lines`/`columns`/`count`/`header`/`value` don't need this: reference them directly in your `contextualizations` wording and they resolve on their own, since the extractor always computes table structure regardless of whether this field is set.

```typescript
// No params at all — {{ lines }}/{{ columns }} just work.
await extractUtterances(gnd, {
  format: "plain",
  contextualize: ["table"],
  contextualization: {
    shapes: { table: "inline" },
    contextualizations: { table: { inline: "Custom table, {{ lines }} by {{ columns }}." } },
  },
});
// → "Custom table, 3 lines by 2 columns."
```

`params` is for a role/placeholder the extractor has no built-in source for — e.g. `list` has no built-in item count the way `table` has `lines`/`columns`:

```typescript
await extractUtterances(gnd, {
  format: "plain",
  contextualize: ["list"],
  contextualization: {
    contextualizations: { list: { block: { start: "List, {{ count }} items." } } },
    params: (role, node) => (role === "list" ? { count: node.children?.length ?? 0 } : undefined),
  },
});
```

### `language`

How a node's own inline spans (`<em lang="fr">`) render. Never merges across sibling utterances — each already has its own utterance and keeps it regardless.

- `"block-level"` (default) — inline spans merge untagged into the surrounding text; block-level `language` kept.
- `"always"` — `ssml` keeps spans tagged; `plain` splits into one utterance per language run.
- `"none"` — same merge as `"block-level"`, plus `language` dropped everywhere.

### `inlineContextualization`

A mid-sentence pagebreak/footnote splits the sentence at that exact point instead of after it finishes. Default `false`.

### `segmentation`

- `"structure"` (default) — one utterance per structural/block-level unit, whatever its sentence count.
- `"sentence"` — split at real sentence boundaries instead: a multi-sentence node becomes several utterances, and a sentence genuinely split across sibling GND nodes (e.g. a fixed-layout document with no enclosing paragraph, just positioned text fragments) is reconstructed into one utterance covering both.

```typescript
// <p>Hello there. This has two sentences.</p>
await extractUtterances(gnd, { format: "plain", segmentation: { mode: "sentence" } });
// [{ plain: "Hello there. " }, { plain: "This has two sentences." }]
```

Each utterance's `offsets` (see above) says which source element(s) it was built from — up to one entry per contributing node, so a sentence reconstructed across two elements gets two entries, each with its own `locate`.

`suppressions` lists, per language, abbreviations (with trailing period, e.g. `"d."`) that shouldn't be mistaken for sentence endings:

```typescript
await extractUtterances(gnd, {
  format: "plain",
  segmentation: { mode: "sentence", suppressions: { en: ["approx."] } },
});
```

#### Reconstruction heuristics

Input: the flat, ordered utterance list the walk (above) produced. Reconstruction never goes back to the GND tree — it operates on this list only.

**Step 1 — eligibility.** For each pair of adjacent utterances A, B, A may extend a run into B only if all of the following hold:

- Both A and B have real source text (not missing/empty).
- Neither A nor B was authored by extraction itself rather than lifted from the source — e.g. an image's `description` (its alt text) is extraction-authored, since it stands in for text the document doesn't have.
- A and B have the same `language`, treating a missing `language` on either one as `"en"`.
- Neither A's nor B's source node carries a role where missing punctuation is not meaningful: `cell`, `rowheader`, `row`, `table`, `list`, `listItem`, `heading1`–`heading6`.

A maximal run of pairwise-eligible utterances is built by scanning forward while eligibility holds.

**Step 2 — confirmation.** Take the whole run's text, joined into one string, and run the real sentence segmenter on it once — segmentation is never decided any other way. For each gap between two pieces in the run:

- The gap is a genuine join only if some detected sentence boundary extends past the gap into the next piece's own text. A boundary that lands exactly at the gap, consuming none of the next piece's text, does not count.
- Consecutive genuine-join gaps chain into one merge group. That group is then resegmented on its own, self-contained text — a confirmed group is not guaranteed to collapse into exactly one utterance; it can still yield more than one.

Anything left outside a merge group is split on its own sentence boundaries independently.

### `substitutions`

Rewrites ASCII-typed imitations of Unicode symbols in `plain`/`ssml` before an utterance is returned, so the imitation is spoken as the symbol it stands in for rather than read literally. Merged by key on top of [`builtInSubstitutions`](../src/utterances/builtInSubstitutions.ts) — a caller-supplied key replaces the built-in rule of the same name rather than adding to it.

```typescript
// <p>See page 5, fig. 2.</p>
await extractUtterances(gnd, { format: "plain", substitutions: { "fig.": "figure" } });
// plain: "See page 5, figure 2."
```

A rule value is either a plain string, matched as a whole token (like `"fig."` above), or `{ pattern, replace }` for a match that needs its own regex:

```typescript
// <p>See p.5 for details.</p>
await extractUtterances(gnd, {
  format: "plain",
  substitutions: { "p.": { pattern: /p\.(?=\d)/g, replace: "page " } },
});
// plain: "See page 5 for details."
```

Unlike `segmentation.suppressions`, this table is flat, not per-language — the voice speaks the resulting symbol correctly regardless of the utterance's own language.

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

### `inline` vs `block`

- `inline` — spoken once, before the node's content.
- `block: { start, end }` — `start` spoken before the content, `end` spoken after.

A role can have either one or both. `table` has both — see [`contextualization.shapes`](#contextualizationshapes) above for how that choice is made.

### Variants

A catalog value can be a plain string, or a small object of named variants — `labelled`/`unlabelled`, `withHeader`/`withoutHeader` — that the extractor picks between based on the node:

- `audio`/`video`/`image`/`math`/`table` (and any other role with a `description`) pick `labelled` when the node has one, `unlabelled` otherwise.
- `cell`/`rowheader` pick `withHeader` when a column header was found for that cell, `withoutHeader` otherwise.

### `parts`

Pluralizable fragments a role's own wording references as tokens (`{{ lines }}`), using i18next's plural-category key suffixes (`lines_one`, `lines_other`, ...) so each locale supplies its own plural forms.

### Built-in placeholders

Each placeholder below is filled in automatically — no `contextualization.params` needed:

- `{{ description }}` — for any node with a `description`, whatever its role.
- `{{ lines }}` / `{{ columns }}` — `table`'s own row/column counts.
- `{{ count }}` — a `row`'s 1-based position.
- `{{ header }}` / `{{ value }}` — a `cell`/`rowheader`'s column-header text and content. GND carries no colspan/rowspan, so a cell's header is matched by position, not by explicit association.

Any other placeholder — one not in this list, or on a role of your own — needs a [`contextualization.params`](#contextualizationparams) entry.

### Implicit accessible names

A `<table>`/`<figure>` with no explicit ARIA name (`aria-label`/`aria-labelledby`) but a `<caption>`/`<figcaption>`/`role="caption"` child folds that child's text into its own `description`, instead of speaking it as a separate node — matching HTML-AAM's implicit accessible name computation.

## Fixtures

Each fixture's `utterances.json` is the hand-reviewed expected output for one option combo — see [fixtures/README.md](../fixtures/README.md#utterance-extraction-options) and [Testing](../README.md#testing).

{% endraw %}
