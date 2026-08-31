// textref fragments: a "#css()" fragment carrying a CSS selector, and (for
// callers converting a live, already-rendered DOM) a "#domrange()" fragment
// carrying a serialized Locator DomRange — see the Locator HTML extension
// spec: https://readium.org/architecture/models/locators/extensions/html.html#the-domrange-object.
// Neither is a Locator itself — textref is a plain URI reference, per the
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

// Decodes a node's own generated textref, distinguishing it from an
// unrelated navigational textref (link href, pagebreak/noteref reference)
// that happens to also start with "#" — those are never wrapped in
// "#css(...)"/"#domrange(...)", and a bare "#id" is only trusted as a
// self-reference when it matches this same node's own id (the shape
// Converter.applyTextref produces), not an id belonging elsewhere.
export function decodeTextref(
  node: { id?: string; textref?: string } | undefined,
): { selector: string; domRange?: DomRangeJSON } | undefined {
  const textref = node?.textref;
  if (!textref) return undefined;
  const domRange = decodeDomRangeFragment(textref);
  if (domRange) return { selector: domRange.start.cssSelector, domRange };
  const cssSelector = decodeCssSelectorFragment(textref);
  if (cssSelector !== undefined) return { selector: cssSelector };
  if (node?.id && textref === `#${node.id}`) return { selector: textref };
  return undefined;
}
