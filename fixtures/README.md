# Guided Navigation / Read-Aloud Test Fixtures

This directory is a language-agnostic conformance test suite for three pipeline
stages used to implement read-aloud/TTS on top of HTML content:

1. **HTML parsing** — reading a document or fragment of HTML/XHTML.
2. **Guided Navigation (GND) document generation** — mapping the parsed HTML
   onto the [Guided Navigation](https://github.com/readium/guided-navigation)
   role vocabulary defined in
   [`roles.md`](https://github.com/readium/guided-navigation/blob/main/roles.md).
3. **Utterance extraction** — turning a GND document into an ordered list of
   read-aloud utterances, following the patterns documented in the
   [read-aloud examples](https://github.com/readium/guided-navigation/tree/main/examples/read-aloud).

Fixtures here are **plain files on disk** (HTML + JSON) — not code. Any
platform (TypeScript, Kotlin, Swift, ...) can consume them with nothing more
than a JSON parser and a file reader. There is no query language, template
system, or fixture-specific code to learn.

## Directory layout

```
fixtures/
  README.md              this file
  manifest.json          flat index of every fixture, for discovery without a filesystem walk (generated — do not hand-edit)
  ROLES_COVERAGE.md       flat list of every role covered and its fixtures (generated — do not hand-edit)
  <fixture-id>/
    meta.json             fixture metadata
    input.html             the input markup as HTML (a fragment or a full document, see meta.json.inputKind);
                            or input.xhtml when the fixture's content is XHTML (all *-epub-type fixtures)
    gnd.json               the expected Guided Navigation document produced from the input file
    utterances.json        the expected utterance lists produced from gnd.json, forked by
                            extraction format (plain/ssml), each with a baseline plus any
                            option variants this fixture illustrates — see "Utterance
                            extraction options" below
```

`manifest.json` and `ROLES_COVERAGE.md` are both generated from the
`meta.json` files on disk by `scripts/build-fixtures-manifest.js`
(`npm run generate-fixtures-manifest`) — the filesystem is the source of
truth, not either of these files. Never hand-edit them; run the script
instead.

[roles.md](https://github.com/readium/guided-navigation/blob/main/roles.md)
was the seed used to originally populate this suite — it is not something
this suite continues to track itself against. Its tier/table categorization
does not appear anywhere in `meta.json`, `manifest.json`, or
`ROLES_COVERAGE.md` — only `role` does, since that's the actual content type
being tested (a "footnote", a "list", ...), not a classification scheme.

Each fixture directory is fully self-contained and independently loadable.

## Fixture granularity

**One fixture = one distinct, scoped behavior.** Concretely:

- **One fixture per role, per distinct HTML encoding.** roles.md documents
  up to three ways of expressing a role: a native HTML element, an explicit
  ARIA role (`role="doc-..."` or a plain ARIA role), and an EPUB `epub:type`
  attribute. Every one of these is a separate code path through stage 1
  (HTML parsing), even when two encodings produce an identical GND result —
  so each gets its own fixture, distinguished by its id/description and
  visible directly in its `input.html` (e.g. `list-html-native` vs.
  `list-role-aria` vs. `list-epub-type`). This isn't tracked as a field in
  `meta.json` — it's not information a consumer needs to look up, just a
  reason more than one fixture exists for the same role.
- **Trivial repetition is bundled into one fixture.** `heading1`...`heading6`
  are the same pathway repeated at six depths, not six distinct behaviors —
  they live together in one `heading-*` fixture. Multiple `<li>` inside one
  `<ul>` is one `list-*` fixture, not one per item.

## `meta.json` schema

```jsonc
{
  "id": "footnote-epub-type",             // must match the directory name
  "description": "Footnote encoded via epub:type, referenced by a noteref",
  "role": "footnote",                     // the roles.md role name this fixture targets
  "rolesCovered": ["footnote", "noteref"],// every role name this fixture's markup exercises
  "sourceRef": "https://github.com/readium/guided-navigation/blob/main/roles.md",
  "inputKind": "document"                 // "fragment" | "document"
}
```

`role` is a roles.md role name for the vast majority of fixtures — one
covering a stage-2/3 (extraction-option) concern that cuts across roles
rather than targeting one, such as language resolution, instead uses a
short pseudo-role naming that concern (e.g. `"language"`) not found in
roles.md. `rolesCovered` still lists the real roles.md role(s) the
fixture's markup exercises, so that coverage tracking in
`ROLES_COVERAGE.md` stays accurate either way.

## Utterance extraction options

Stage 2 (GND → utterances) takes options controlling *how* a fixed GND tree
is turned into utterances — the tree itself never changes shape based on
these; only the resulting utterance list does. `utterances.json` is a flat
list of cases, each a full `ExtractUtterancesOptions` object (`format`
included, same as every other option) paired with the utterance list that
combination produces:

```jsonc
{
  "cases": [
    {
      "options": { "format": "plain" },
      "utterances": [ /* the plain extraction with no other options set */ ]
    },
    {
      "options": { "format": "plain", "skip": ["footnote"] },
      "utterances": [ /* plain extraction with skip set */ ]
    },
    {
      "options": { "format": "ssml" },
      "utterances": [ /* the ssml extraction with no other options set */ ]
    },
    {
      "options": { "format": "ssml", "skip": ["footnote"] },
      "utterances": [ /* ssml extraction with skip set */ ]
    }
  ]
}
```

`format: "plain" | "ssml"` is required on every case, since `extractUtterances`
itself requires it — there's no such thing as calling it without picking one,
so neither format is treated as more "default" than the other. The other
options are:

- `skip: GndRole[]` — omit a role (and its whole subtree) from the output,
  e.g. so a reader can skip past footnotes or pagebreaks during playback.
  See [roles.md#list-of-skippable-roles](https://github.com/readium/guided-navigation/blob/main/roles.md#list-of-skippable-roles)
  for the roles.md-documented set a reader may choose to skip.
- `contextualize: boolean` — whether synthesized announcements (pagebreak,
  footnote start/end, and any role that gains one later) are spoken at all,
  independent of the underlying content (which `skip` would instead omit
  entirely). Default `true`.
- `interruptSentence: boolean` — whether a pagebreak/footnote reference
  that falls mid-sentence splits the sentence at that exact point, instead
  of being spoken after the whole sentence finishes (the default).
- `language: "never" | "block" | "inline"` — how a language shift between
  adjacent text is rendered: dropped entirely; kept as separate
  single-language utterances for `plain` (default `"inline"` has no other
  way to represent the shift) or merged into one utterance with embedded
  `<lang>` tags for `ssml`.

A case for `skip`/`contextualize`/`interruptSentence` ships only when that
option actually changes the output for that fixture, the same "not every
fixture needs this" principle as fixture granularity in general (a
footnote reached via noteref, a whole aside, a pagebreak announcement,
...). Every fixture that ships an announcement-bearing base case should
also illustrate `contextualize: false` — this isn't limited to today's
`pagebreak`/`footnote`, since the announcement catalog is expected to grow
to cover much of roles.md's structural vocabulary (chapters, headings,
parts, credits, navigational lists...) over time.

`language-*` fixtures are the one exception to "only ship a case when it
changes the output": every `language` state gets its own case per format,
even when it produces output identical to the base case (e.g. `"inline"` is
the default, so it *should* match) — the option's full state space is the
thing under test there, not just its distinct outputs.

## `epub:type` fixtures are full XHTML documents

`epub:type` is only meaningful in XHTML with the `epub` namespace declared on
the document root — it is **not** a plain-HTML attribute, and there is no
"parse it as a literal attribute name in an HTML5 document" fallback: real
EPUB reading systems parse content documents as namespace-aware XHTML. Every
`*-epub-type` fixture therefore has `inputKind: "document"` and its
`input.xhtml` is a complete document:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">
<head><meta charset="utf-8"/><title>Fixture</title></head>
<body>
  <div epub:type="chapter">...</div>
</body>
</html>
```

By contrast, `role-aria` and `html-native` fixtures stay as bare fragments
(`inputKind: "fragment"`) since ARIA roles and native HTML elements don't
require any namespace declaration.

## Navigational-list roles

Roles whose roles.md definition is "a list of links to X" or "a collection
of X" (`landmarks`, `loa`, `loi`, `lot`, `lov`, `pagelist`, `toc`, `index`,
`bibliography`, `glossary`, `endnotes`, `credits`) are modeled as an actual
`list`/`listItem` structure, not a flat text blob — because that's what they
are. A `listItem` that links to a target elsewhere in the work carries a
`textref` alongside its visible `text`, reusing the same field the
footnote/endnote fixtures already use for cross-references:

```jsonc
{ "role": ["listItem"], "text": "Cover", "textref": "cover.xhtml" }
```

## `manifest.json`

A flat JSON array, one entry per fixture:

```jsonc
[
  {
    "id": "footnote-epub-type",
    "dir": "footnote-epub-type",
    "role": "footnote",
    "description": "Footnote encoded via epub:type, referenced by a noteref",
    "files": {
      "input": "input.xhtml",
      "gnd": "gnd.json",
      "utterances": "utterances.json"
    }
  }
]
```

Any test runner, in any language, reads this one file to discover every
fixture and resolve its file paths — no directory listing required.

## Consuming a fixture (any platform)

1. Read `manifest.json`, iterate its entries.
2. For each entry, read `files.input` (`input.html` or `input.xhtml`) and run
   it through your implementation of stage 1 (HTML → GND) — compare the
   result to `gnd.json`.
3. Run the resulting GND document through your implementation of stage 2
   (GND → utterances) twice, once with `{ format: "plain" }` and once with
   `{ format: "ssml" }` — compare each to `utterances.json`'s corresponding
   `plain.base`/`ssml.base`.
4. For each entry in a branch's `variants` (if any), run stage 2 again with
   that branch's format plus the variant's `options` — compare the result
   to that variant's `utterances`.
5. A fixture "passes" when every comparison it has files for matches exactly.

## Adding a new fixture

1. `mkdir fixtures/<id>` and hand-write `input.html` (or `input.xhtml` for an
   `epub:type` fixture, since `epub:type` requires XHTML — see above) for the
   specific markup being tested.
2. Hand-author `gnd.json` — there is no generator for it; it is the ground
   truth implementations must match. This step still requires the same
   scrutiny it always has: nothing here derives `gnd.json` from the input
   file for you.
3. Run `npm run generate-utterances` to derive `utterances.json` (both
   format branches' `base`, plus whichever `variants` apply — see
   "Utterance extraction options" above) from the `gnd.json` you just wrote,
   using this package's own `extractUtterances()`. **Review the diff before
   committing it** — `utterances.json` is still the ground truth other,
   non-TypeScript implementations are meant to match, so generating it from
   this repo's own implementation doesn't replace checking that what it
   produced is actually correct for every option combination shown. This
   also means: whenever `extractUtterances.ts`, `announcements.ts`, or
   `skippableRoles` changes (a reworded announcement, a newly
   contextualized role, a new skippable role), rerun this for every
   affected fixture — hand-editing `utterances.json` to patch around a
   wording change invites exactly the drift this script exists to prevent.
4. Write `meta.json`.
5. Run `npm run generate-fixtures-manifest` to regenerate `manifest.json`
   and `ROLES_COVERAGE.md` from what's now on disk.

## This suite is not finished

New roles, new encodings, and new real-world edge cases get added to
`fixtures/` as they're encountered — this is a living suite, not a fixed
checklist against any external document.
