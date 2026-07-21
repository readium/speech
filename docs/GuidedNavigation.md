# Guided Navigation

[Guided Navigation](https://github.com/readium/guided-navigation) (GND) is the JSON tree this library extracts from HTML/XHTML, before turning it into utterances (see [Utterance Extraction](UtteranceExtraction.md)).

## Building a GND document

```typescript
import { makeGnd } from "@readium/speech";

const gnd = makeGnd(`
  <section epub:type="chapter">
    <h1>Chapter One</h1>
    <p>It was a dark and stormy night.</p>
  </section>
`);
// gnd.guided: GndNode[]
```

```typescript
function makeGnd(input: string, mediaType?: GndMediaType): GndDocument;

interface GndDocument {
  links?: unknown[];
  guided: GndNode[];
}
```

`mediaType` is `"text/html" | "application/xhtml+xml"`. Omit it to sniff from `input` (XML declaration, `xmlns:epub`, XHTML doctype → XHTML; else HTML).

Skip the `GndDocument` wrapper by calling `parseMarkup(html): GndNode[]` directly.

Parsing uses the native `DOMParser` — no HTML/XML library bundled or loaded at runtime.

## `GndNode`

```typescript
type GndRole = string; // open-ended, see roles.ts

interface GndTextAlternative {
  language: string;
  plain?: string;
  ssml?: string;
}

interface GndNode {
  role?: GndRole[];
  text?: string | GndTextAlternative;
  description?: string;
  imgref?: string;
  audioref?: string;
  videoref?: string;
  textref?: string;
  id?: string;
  children?: GndNode[];
}
```

- **`role`** can have multiple entries: tag name, ARIA `role`, `epub:type` all contribute, in that order (e.g. `<section epub:type="chapter">` → `["section", "chapter"]`). `role="presentation"`/`"none"` overrides everything to `["presentation"]`.
- **`text`** is a plain string when unformatted, a `GndTextAlternative` when it needs SSML (inline formatting, a language shift, or an embedded footnote/pagebreak/image mid-sentence). `ssml` marks embedded objects with a `<readium:noteref id="..." />`-style placeholder whose `id` matches a sibling in `children`.
- **`imgref`/`audioref`/`videoref`** are a media element's `src`. **`textref`** is an `href` — reused for navigational-list items (`toc`, `index`...), `noteref`/`backlink`/`biblioref`/`glossref`, and plain links.
- **`description`** is a node's accessible name (`aria-label`, `alt`, `<figcaption>`...) when it differs from its visible text.
- Empty/presentational/`aria-hidden`/`hidden` content and role-less wrapper `<div>`s are dropped from the tree, not kept as empty nodes.
- A block whose only child has no role/id of its own gets that child's text/refs hoisted into it: `<p><a href="...">Cover</a></p>` → `{ role: ["paragraph"], text: "Cover", textref: "..." }`, not a nested anonymous child.

## Footnotes and pagebreaks

Both are read out of narrative order, so the converter handles them specially:

- **`noteref`** (`<a role="doc-noteref" href="#note1">`) resolves its `href` and embeds the target's whole subtree as `children` — no second lookup needed. Unresolvable hrefs get a plain `textref` child instead. The footnote is suppressed from also appearing at its original location.
- **`pagebreak`** (`<span epub:type="pagebreak" title="42">`) carries its label as `text`. Mid-sentence, it's a `<readium:pagebreak id="..." />` placeholder in that sentence's `ssml`, with the pagebreak node as a sibling `children` entry.

## Roles

Three independent sources, mapped in [`src/gnd/roles.ts`](../src/gnd/roles.ts):

1. **Element type** — `<h1>` → `heading1`, `<nav>` → `navigation`, `<blockquote>` → `blockquote`, etc.
2. **ARIA role** — `role="doc-chapter"` → `chapter`, `role="figure"` → `figure`, etc. `role="heading"` reads its level from `aria-level` (default `2`).
3. **`epub:type`** — `epub:type="chapter"` → `chapter`, `epub:type="pagebreak"` → `pagebreak`, etc. (XHTML only, see below).

## `epub:type` requires XHTML

`epub:type` only means anything in namespace-aware XHTML. Pass a complete XHTML document (`xmlns:epub` on the root):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">
<head><meta charset="utf-8"/><title>...</title></head>
<body>
  <section epub:type="chapter">...</section>
</body>
</html>
```

ARIA roles and native elements work as plain HTML fragments.

## Fixtures

`fixtures/` is a language-agnostic conformance suite for this stage plus utterance extraction — see [fixtures/README.md](../fixtures/README.md) and [Testing](../README.md#testing).
