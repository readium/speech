# Utterance Extraction Test Fixtures

Expected utterances for each fixture of [`@readium/guided-navigation`'s conformance suite](https://github.com/readium/ts-toolkit/tree/develop/guided-navigation/fixtures), which holds the inputs, `gnd.json` and `manifest.json`. Like that suite, these are plain JSON files any platform can consume.

```
fixtures/
  README.md              this file
  <fixture-id>/
    utterances.json       the expected utterances from that fixture's gnd.json — a default case per
                          format, plus any option combination that diverges from it
```

Every fixture in `@readium/guided-navigation`'s `manifest.json` has a `utterances.json` here, and nothing else does.

## Utterance extraction options

Utterance extraction takes options controlling *how* a fixed GND tree
is turned into utterances — the tree itself never changes shape based on
these; only the resulting utterance list does. `utterances.json` is a flat
list of cases, each pairing an utterance list with every full
`ExtractUtterancesOptions` object (`format` included) that produces it —
option-sets that produce identical output share one case instead of
repeating the payload:

```jsonc
{
  "cases": [
    {
      "options": [{ "format": "plain" }],
      "utterances": [ /* the default: no skip/contextualize/language/inlineContextualization */ ]
    },
    {
      "options": [
        { "format": "plain", "skip": ["footnote"] },
        { "format": "plain", "skip": ["footnote"], "language": "none" }
      ],
      "utterances": [ /* shared result for both option-sets above, differs from the default */ ]
    }
  ]
}
```

**A case is only present when its options produce output different from
that fixture's default** — the bare `{ format }` call, always the first
case for each format (as a single-element `options` array). An option
combination *within scope* (below) that appears in no case's `options` is
understood to equal the default: absence is a positive claim, not a gap.
Outside that scope, a fixture makes no claim either way.

Scope, per format: `language` × `inlineContextualization` × `segmentation.mode`
× every subset of (this fixture's roles ∩ [roles.md's skippable-roles list])
× every subset of (this fixture's roles ∩ roles with a
contextualization-catalog entry) × every subset of (this fixture's roles ∩
roles that switch between inline and block contextualization by verbosity).
Every point in that space is either an explicit case or implicitly the
default — nothing in between. `segmentation.suppressions` is out of scope,
same as `contextualization.contextualizations`/`params` below — it needs a
fixture-specific abbreviation list to matter, not a fixed combination that
generalizes across fixtures.

The options:

- `format: "plain" | "ssml"` (default `"plain"`) — stated explicitly on
  every case, since a fixture needs both variants covered and omitting it
  on the `"ssml"` case would leave it indistinguishable from `"plain"`.
- `skip: GndRole[]` — omit roles (and their whole subtree) from the output.
  See [roles.md#list-of-skippable-roles](https://github.com/readium/guided-navigation/blob/main/roles.md#list-of-skippable-roles).
- `contextualize: GndRole[]` — which roles' synthesized contextualizations
  (pagebreak, footnote start/end, ...) are spoken, independent of the
  underlying content (which `skip` would instead omit entirely). Nothing
  contextualizes by default.
- `contextualization: { shapes: Partial<Record<GndRole, "inline" | "block">> }` —
  `shapes` is a per-role override of contextualization shape: `"inline"`
  reads the catalog's `inline` entry; `"block"` (default when a role is
  absent here) reads its `start`/`end` pair. Only has an effect on roles
  whose contextualization varies by verbosity (`table`), and only within
  `contextualize`. Grouped under `contextualization` alongside
  `contextualizations`/`params` (unused by these fixtures) — see
  [Utterance Extraction](../docs/UtteranceExtraction.md#contextualization).
- `inlineContextualization: boolean` — whether a pagebreak/footnote
  reference that falls mid-sentence splits the sentence at that exact
  point, instead of after the whole sentence finishes (the default).
- `language: "none" | "block-level" | "always"` — how a language shift
  between adjacent text is rendered: dropped entirely; kept as separate
  single-language utterances for `plain`, or merged into one utterance
  with embedded `<lang>` tags for `ssml`. Omitted means unset.
- `segmentation: { mode: "structure" | "sentence" }` — `"structure"`
  (default, omitted) is one utterance per structural unit; `"sentence"`
  splits/reconstructs at real sentence boundaries instead, including across
  sibling nodes when a sentence genuinely spans them. `suppressions` is out
  of scope — see above.

## Consuming a fixture (any platform)

1. Read `@readium/guided-navigation`'s `manifest.json`, iterate its entries.
2. Run each fixture's `gnd.json` through your implementation of GND → utterances
   with `{ format: "plain" }`, then `{ format: "ssml" }` — each must match
   `utterances.json`'s first case for that format (the default; see
   "Utterance extraction options" above).
3. For any other option combination you want to test: look for a case in
   `utterances.json` whose `options` matches it exactly. If found, compare
   your result to it. If not found, and the combination is within the
   documented scope, your result must match the default case instead —
   there's no separate case for it precisely because it produces the same
   output.
4. A fixture "passes" when every comparison it has data for (explicit or
   default-inferred) matches exactly.

## Adding a fixture

1. Add the fixture to `@readium/guided-navigation` (see its fixtures README).
2. Run `npm run generate-utterances` to write its `utterances.json` here, then
   review the result — it's the ground truth implementations must match.
