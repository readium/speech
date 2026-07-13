import { startsWithBindingPunct } from "../gnd/text.js";
import type { GndNode } from "../gnd/types.js";

export interface ResolvedNodeText {
  plain?: string;
  ssml?: string;
  language?: string;
}

// Matches a `<readium:TAG id="...">` self-closing placeholder (see
// `flushText()` in `../gnd/converter.ts`), along with any surrounding
// whitespace so it can be removed as a whole unit.
const PLACEHOLDER_RE = /\s*<readium:[a-zA-Z][\w-]*\s+id="[^"]*"\s*\/>\s*/g;

/**
 * Removes `<readium:TAG id="...">` placeholders from an SSML string. These
 * mark where an embedded reference (a noteref, pagebreak, image...) sits in
 * the text flow, linking to a sibling/child GND object by id — real GND
 * consumers resolve them from there. This extractor instead speaks that
 * referenced object as its own separate utterance (via the normal children
 * walk), so the placeholder itself is just removed, using the same
 * binding-punctuation rule the GND converter itself uses when omitting a
 * placeholder from its plain-text variant (see `startsWithBindingPunct` in
 * `../gnd/text.ts`): no space is inserted before punctuation that binds to
 * the preceding word (e.g. ".", ","), but a single space is inserted
 * between two words that would otherwise run together.
 */
function stripPlaceholders(ssml: string): string {
  const stripped = ssml.replace(PLACEHOLDER_RE, (match, offset: number, str: string) => {
    const after = str.slice(offset + match.length);
    return after.length === 0 || startsWithBindingPunct(after) ? "" : " ";
  });
  return stripped.replace(/ {2,}/g, " ").trim();
}

// A `<` can only appear in an SSML string as the start of a real SSML tag —
// any literal `<` in the source text itself is entity-escaped by the GND
// converter. So once placeholders are stripped, this is a reliable check for
// whether any actual SSML markup (`<lang>`, `<emphasis>`, `<break/>`...)
// remains, as opposed to a placeholder-only string that's now redundant with
// the `plain` variant (which the GND converter guarantees is present
// whenever the only reason `ssml` existed was an embedded placeholder — see
// `converter.ts`'s `hasPlaceholder` handling).
function hasSsmlMarkup(s: string): boolean {
  return s.includes("<");
}

/**
 * Resolves a `GndNode.text` value (a plain string, or a `GndTextAlternative`
 * carrying separate plain/SSML variants) into the shape an utterance needs.
 *
 * Mirrors the Readium text object as-is: `plain` and `ssml` are independent
 * alternatives, not one derived from the other, so both are passed through
 * whenever the source provides both (e.g. a footnote reference, where the
 * SSML carries an embedded `<readium:noteref>` placeholder and the plain
 * variant already omits it). The SSML variant gets `stripPlaceholders`
 * applied first, since this extractor speaks referenced objects (noterefs,
 * pagebreaks) separately via the normal children walk rather than inline —
 * and if stripping a placeholder leaves no actual SSML markup behind, `ssml`
 * is dropped entirely rather than reported as a duplicate of `plain`.
 *
 * `language` is carried alongside either variant: the GND converter attaches
 * the nearest ancestor's declared language (e.g. `<html lang="fr">`) to every
 * text node under it, so this is the only place that document-declared
 * language would otherwise be lost.
 */
export function resolveNodeText(text: GndNode["text"]): ResolvedNodeText | undefined {
  if (text === undefined) return undefined;
  if (typeof text === "string") return { plain: text };

  const result: ResolvedNodeText = { language: text.language };
  if (text.ssml) {
    const stripped = stripPlaceholders(text.ssml);
    if (hasSsmlMarkup(stripped)) result.ssml = stripped;
  }
  if (text.plain) result.plain = text.plain;

  return result.plain || result.ssml ? result : undefined;
}

// Strips every SSML tag (not just `<readium:...>` placeholders — `<lang>`,
// `<emphasis>`, `<break/>`...) and unescapes the entities `ssmlTextEscape`
// applies, for synthesizing a `plain` variant from a node that only
// naturally has `ssml` (e.g. an inline language shift with no embedded
// placeholder, so the GND converter never generated a `plain` variant for
// it — see `converter.ts`'s `flushText()`).
export function stripSsmlTags(ssml: string): string {
  return ssml
    .replace(/<[^>]+>/g, "")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/ {2,}/g, " ")
    .trim();
}

export interface SsmlSegment {
  // A run of ssml (may itself carry further tags, e.g. `<lang>`) between
  // placeholders. Mutually exclusive with `placeholderId`.
  ssml?: string;
  // The `id` of a `<readium:TAG id="...">` placeholder at this position,
  // linking to the sibling/child `GndNode` carrying that `id`.
  placeholderId?: string;
}

// Matches a raw, unstripped `<readium:TAG id="...">` placeholder — the same
// marker `stripPlaceholders` removes, but captured here (with its `id`) for
// splitting the surrounding text apart instead of discarding it.
const RAW_PLACEHOLDER_RE = /<readium:[a-zA-Z][\w-]*\s+id="([^"]*)"\s*\/>/g;

export function hasPlaceholder(ssml: string): boolean {
  return new RegExp(RAW_PLACEHOLDER_RE).test(ssml);
}

/**
 * Splits a raw (pre-`stripPlaceholders`) SSML string on its embedded
 * `<readium:TAG id="...">` placeholders, for `interruptSentence`: each
 * placeholder becomes its own segment (resolved via the `GndNode` sharing
 * its `id`) instead of being spoken after the whole enclosing text.
 */
export function splitOnPlaceholders(ssml: string): SsmlSegment[] {
  const segments: SsmlSegment[] = [];
  let lastIndex = 0;
  for (const match of ssml.matchAll(RAW_PLACEHOLDER_RE)) {
    const before = ssml.slice(lastIndex, match.index).trim();
    if (before) segments.push({ ssml: before });
    segments.push({ placeholderId: match[1] });
    lastIndex = match.index! + match[0].length;
  }
  const after = ssml.slice(lastIndex).trim();
  if (after) segments.push({ ssml: after });
  return segments;
}
