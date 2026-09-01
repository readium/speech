// textref fragments: a "#css()" fragment carrying a CSS selector, a
// "#domrange()" fragment (for callers converting a live, already-rendered
// DOM) carrying a serialized Locator DomRange — see the Locator HTML
// extension spec: https://readium.org/architecture/models/locators/extensions/html.html#the-domrange-object
// — and a ":~:text=..." suffix per the WICG Text Fragments spec
// (https://wicg.github.io/scroll-to-text-fragment/), which appends onto
// whatever fragment already precedes it rather than replacing it. None of
// these is a Locator itself — textref is a plain URI reference, per the
// guided-navigation spec.

const CSS_PREFIX = "#css(";
const CSS_SUFFIX = ")";

export function encodeCssSelectorFragment(selector: string): string {
  return `${CSS_PREFIX}${encodeURIComponent(selector)}${CSS_SUFFIX}`;
}

export function decodeCssSelectorFragment(textref: string | undefined): string | undefined {
  if (!textref || !textref.startsWith(CSS_PREFIX) || !textref.endsWith(CSS_SUFFIX)) return undefined;
  return decodeURIComponent(textref.slice(CSS_PREFIX.length, -CSS_SUFFIX.length));
}

const DOMRANGE_PREFIX = "#domrange(";
const DOMRANGE_SUFFIX = ")";

// The RWPM JSON shape produced/consumed by @readium/shared's DomRange —
// {start: {cssSelector, textNodeIndex, charOffset?}, end?: {...}}.
export interface DomRangeJSON {
  start: { cssSelector: string; textNodeIndex: number; charOffset?: number };
  end?: { cssSelector: string; textNodeIndex: number; charOffset?: number };
}

export function encodeDomRangeFragment(domRange: DomRangeJSON): string {
  return `${DOMRANGE_PREFIX}${encodeURIComponent(JSON.stringify(domRange))}${DOMRANGE_SUFFIX}`;
}

export function decodeDomRangeFragment(textref: string | undefined): DomRangeJSON | undefined {
  if (!textref || !textref.startsWith(DOMRANGE_PREFIX) || !textref.endsWith(DOMRANGE_SUFFIX)) return undefined;
  try {
    const json = JSON.parse(decodeURIComponent(textref.slice(DOMRANGE_PREFIX.length, -DOMRANGE_SUFFIX.length)));
    if (!json?.start?.cssSelector || typeof json.start.textNodeIndex !== "number") return undefined;
    return json as DomRangeJSON;
  } catch {
    return undefined;
  }
}

const TEXT_DIRECTIVE_MARK = ":~:text=";

// WICG Text Fragments directive grammar: text=[prefix-,]textStart[,textEnd][,-suffix].
export interface TextFragmentDirective {
  textStart: string;
  textEnd?: string;
  prefix?: string;
  suffix?: string;
}

// A literal "-" isn't touched by encodeURIComponent, but the grammar uses
// "-," and ",-" as prefix/suffix markers, so it must always be escaped in
// content to stay unambiguous.
function encodeFragmentPart(s: string): string {
  return encodeURIComponent(s).replace(/-/g, "%2D");
}

export function encodeTextFragmentDirective(fragment: TextFragmentDirective): string {
  let s = "";
  if (fragment.prefix) s += `${encodeFragmentPart(fragment.prefix)}-,`;
  s += encodeFragmentPart(fragment.textStart);
  if (fragment.textEnd) s += `,${encodeFragmentPart(fragment.textEnd)}`;
  if (fragment.suffix) s += `,-${encodeFragmentPart(fragment.suffix)}`;
  return `${TEXT_DIRECTIVE_MARK}${s}`;
}

// Locates ":~:text=" anywhere in textref — it's a suffix appended onto
// whatever fragment (bare id / #css(...) / #domrange(...)) already precedes
// it, never the whole string.
export function decodeTextFragmentDirective(textref: string | undefined): TextFragmentDirective | undefined {
  if (!textref) return undefined;
  const markIndex = textref.indexOf(TEXT_DIRECTIVE_MARK);
  if (markIndex === -1) return undefined;
  const raw = textref.slice(markIndex + TEXT_DIRECTIVE_MARK.length).split("&")[0];
  if (!raw) return undefined;

  try {
    let parts = raw.split(",");
    const result: TextFragmentDirective = { textStart: "" };

    if (parts[0].endsWith("-")) {
      result.prefix = decodeURIComponent(parts[0].slice(0, -1));
      parts = parts.slice(1);
    }
    if (parts.length > 0 && parts[parts.length - 1].startsWith("-")) {
      result.suffix = decodeURIComponent(parts[parts.length - 1].slice(1));
      parts = parts.slice(0, -1);
    }
    if (parts.length === 0 || parts[0] === "") return undefined;

    result.textStart = decodeURIComponent(parts[0]);
    if (parts.length > 1) result.textEnd = decodeURIComponent(parts[1]);
    return result;
  } catch {
    return undefined;
  }
}

export interface DecodedTextref {
  cssSelector?: string;
  domRange?: DomRangeJSON;
  text?: { highlight?: string; before?: string; after?: string };
}

// Decodes a node's own generated textref, distinguishing it from an
// unrelated navigational textref (link href, pagebreak/noteref reference)
// that happens to also start with "#" — those are never wrapped in
// "#css(...)"/"#domrange(...)", and a bare "#id" is only trusted as a
// self-reference when it matches this same node's own id (the shape
// Converter.applyTextref produces), not an id belonging elsewhere. A
// ":~:text=..." suffix is independent of all that — it can accompany any of
// the above, or stand alone — so it's decoded separately from the rest of
// the string and merged into the result.
export function decodeTextref(node: { id?: string; textref?: string } | undefined): DecodedTextref | undefined {
  const textref = node?.textref;
  if (!textref) return undefined;

  const markIndex = textref.indexOf(":~:");
  const base = markIndex === -1 ? textref : textref.slice(0, markIndex);

  let cssSelector: string | undefined;
  let domRange: DomRangeJSON | undefined;
  const baseDomRange = decodeDomRangeFragment(base);
  if (baseDomRange) {
    domRange = baseDomRange;
    cssSelector = baseDomRange.start.cssSelector;
  } else {
    const decoded = decodeCssSelectorFragment(base);
    if (decoded !== undefined) {
      cssSelector = decoded;
    } else if (node?.id && base === `#${node.id}`) {
      cssSelector = base;
    }
  }

  // A textStart/textEnd range can't be collapsed back into one exact
  // "highlight" string without the full text in between — only the
  // exact-match case (no textEnd) round-trips as a highlight; before/after
  // (WICG prefix/suffix) round-trip either way.
  const directive = decodeTextFragmentDirective(textref);
  const highlight = directive && directive.textEnd === undefined ? directive.textStart : undefined;

  if (cssSelector === undefined && domRange === undefined && highlight === undefined && directive === undefined) {
    return undefined;
  }

  const result: DecodedTextref = {};
  if (cssSelector !== undefined) result.cssSelector = cssSelector;
  if (domRange !== undefined) result.domRange = domRange;
  const before = directive?.prefix;
  const after = directive?.suffix;
  if (highlight !== undefined || before !== undefined || after !== undefined) {
    result.text = {};
    if (highlight !== undefined) result.text.highlight = highlight;
    if (before !== undefined) result.text.before = before;
    if (after !== undefined) result.text.after = after;
  }
  return result;
}
