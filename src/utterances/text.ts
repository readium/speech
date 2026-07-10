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
