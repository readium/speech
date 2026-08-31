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
// gnd.guided: GndObject[]
```

```typescript
function makeGnd(input: string | Element, mediaType?: GndMediaType, options?: GndGenerationOptions): GndDocument;

interface GndDocument {
  links?: unknown[];
  guided: GndObject[];
}
```

`input` is either raw markup, or a live, already-rendered element to convert in place — see `domRange` below for why that distinction matters. `mediaType` is `"text/html" | "application/xhtml+xml"`. Omit it to sniff from `input` (a string: XML declaration, `xmlns:epub`, XHTML doctype → XHTML, else HTML; an element: its own document's content type).

Skip the `GndDocument` wrapper by calling `parseMarkup(input, mediaType?, options?): GndObject[]` directly.

Parsing uses the native `DOMParser` — no HTML/XML library bundled or loaded at runtime.

## Text references (`textrefs`)

Off by default — generating a reference has a real compute cost. When enabled, every node with a role gets a `textref` a DOM-highlighting consumer can resolve back to its source element: the element's own `#id` when it has one, `#css(<selector>)` otherwise. This is a plain `textref` URI reference, per the guided-navigation spec — not a Readium [`Locator`](https://readium.org/architecture/models/locators/) object; see [Highlighting](Highlighting.md) for how a `Locator` actually gets built for DOM highlighting.

```typescript
interface GndGenerationOptions {
  textrefs?: boolean | GndRole[] | TextrefOptions;
}

interface TextrefOptions {
  roles?: boolean | GndRole[]; // which roles get a reference; true = every role
  domRange?: boolean;          // also compute exact textNodeIndex/charOffset
}
```

```typescript
makeGnd(html, undefined, { textrefs: true });                       // every role
makeGnd(html, undefined, { textrefs: ["heading1", "paragraph"] });  // just these roles
```

`domRange` upgrades the reference to `#domrange(...)` — a serialized [Locator `DomRange`](https://readium.org/architecture/models/locators/extensions/html.html#the-domrange-object) pinpointing the exact start/end text node and character offset, not just the containing element. It's only safe against a **live, already-rendered** element, passed as `input` directly rather than as a markup string — passing a string always parses a detached copy that's never resolved again, so `domRange` is silently ignored there:

```typescript
makeGnd(document.querySelector("article")!, undefined, {
  textrefs: { roles: true, domRange: true },
});
```

Decode either shape with `decodeTextref({ id, textref })` (from `@readium/speech`), which returns `{ selector, domRange? }` or `undefined` for a `textref` that isn't a generated reference (e.g. a link's own `href`, or a noteref/pagebreak reference).

## `GndObject`

```typescript
type GndRole = string; // open-ended, see roles.ts

interface GndText {
  language: string;
  plain?: string;
  ssml?: string;
}

interface GndObject {
  role?: GndRole[];
  text?: string | GndText;
  description?: string;
  imgref?: string;
  audioref?: string;
  videoref?: string;
  textref?: string;
  id?: string;
  children?: GndObject[];
}
```

- **`role`** can have multiple entries: tag name, ARIA `role`, `epub:type` all contribute, in that order (e.g. `<section epub:type="chapter">` → `["section", "chapter"]`). `role="presentation"`/`"none"` overrides everything to `["presentation"]`.
- **`text`** is a plain string when unformatted, a `GndText` when it needs SSML (inline formatting, a language shift, or an embedded footnote/pagebreak/image mid-sentence). `ssml` marks embedded objects with a `<readium:noteref id="..." />`-style placeholder whose `id` matches a sibling in `children`.
- **`imgref`/`audioref`/`videoref`** are a media element's `src`. **`textref`** is an `href` — reused for navigational-list items (`toc`, `index`...), `noteref`/`backlink`/`biblioref`/`glossref`, and plain links.
- **`description`** is a node's accessible name (`aria-label`, `alt`, `<figcaption>`...) when it differs from its visible text.
- Empty/presentational/`aria-hidden`/`hidden` content and role-less wrapper `<div>`s are dropped from the tree, not kept as empty nodes.
- A block whose only child has no role/id/ref of its own gets that child's text hoisted into it: `<p><em>Cover</em></p>` → `{ role: ["paragraph"], text: "Cover" }`, not a nested anonymous child. A child carrying its own ref (`textref`/`imgref`/`audioref`/`videoref`) is never hoisted, since merging it would either discard that ref or silently overwrite the parent's own: `<p><a href="...">Cover</a></p>` → `{ role: ["paragraph"], children: [{ text: "Cover", textref: "..." }] }`.

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
