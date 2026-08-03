import type { GndObject } from "../gnd/types.js";
import {
  BINDING_PUNCT_CLASS,
  OPENING_PUNCT_CLASS,
  startsWithBindingPunct,
  startsWithOpeningPunct,
} from "../utils/text.js";

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
 * `../utils/text.ts`): no space is inserted before punctuation that binds to
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
 * Resolves a `GndObject.text` value (a plain string, or a `GndText`
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
export function resolveNodeText(text: GndObject["text"]): ResolvedNodeText | undefined {
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

export interface LangSegment {
  plain: string;
  language?: string;
}

// Matches a raw (pre-`stripLangTags`) `<lang xml:lang="...">...</lang>` span
// — the same wrapping `stripLangTags` unwraps, but captured here (with its
// `xml:lang`) for splitting the surrounding text apart instead of merging it.
const RAW_LANG_TAG_RE = /<lang xml:lang="([^"]*)">([\s\S]*?)<\/lang>/g;

export function hasLangTag(ssml: string): boolean {
  return new RegExp(RAW_LANG_TAG_RE).test(ssml);
}

// Same as `stripSsmlTags`, minus the final trim.
function stripSsmlTagsKeepEdges(ssml: string): string {
  return ssml
    .replace(/<[^>]+>/g, "")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/ {2,}/g, " ");
}

// An atom of a run's text: a word, a punctuation run (open/close), or whitespace.
// `space` tokens carry no text — only a signal that `renderTokens` should put a
// space there — since whitespace type never matters, only its presence.
type Token =
  | { kind: "word" | "open" | "close"; text: string }
  | { kind: "space" };

const TOKEN_RE = new RegExp(
  `\\s+|[${OPENING_PUNCT_CLASS}]+|[${BINDING_PUNCT_CLASS}]+|[^\\s${OPENING_PUNCT_CLASS}${BINDING_PUNCT_CLASS}]+`,
  "gu",
);

function tokenize(text: string): Token[] {
  const tokens: Token[] = [];
  for (const [chunk] of text.matchAll(TOKEN_RE)) {
    if (/^\s/.test(chunk)) tokens.push({ kind: "space" });
    else if (startsWithOpeningPunct(chunk)) tokens.push({ kind: "open", text: chunk });
    else if (startsWithBindingPunct(chunk)) tokens.push({ kind: "close", text: chunk });
    else tokens.push({ kind: "word", text: chunk });
  }
  return tokens;
}

// Joins tokens with a single space wherever a `space` token sat between two
// atoms; leading/trailing `space` tokens are dropped.
function renderTokens(tokens: Token[]): string {
  let out = "";
  let pendingSpace = false;
  for (const token of tokens) {
    if (token.kind === "space") {
      if (out) pendingSpace = true;
      continue;
    }
    if (pendingSpace) out += " ";
    out += token.text;
    pendingSpace = false;
  }
  return out;
}

// Removes a trailing (whitespace | open-punct) run, only if it contains
// punctuation, for the caller to prepend onto the next segment.
function peelTrailingOpen(tokens: Token[]): Token[] {
  let i = tokens.length;
  while (i > 0 && (tokens[i - 1].kind === "space" || tokens[i - 1].kind === "open")) i--;
  if (!tokens.slice(i).some((t) => t.kind === "open")) return [];
  return tokens.splice(i);
}

// Mirror of `peelTrailingOpen` for a leading (whitespace | close-punct) run.
function peelLeadingClose(tokens: Token[]): Token[] {
  let i = 0;
  while (i < tokens.length && (tokens[i].kind === "space" || tokens[i].kind === "close")) i++;
  if (!tokens.slice(0, i).some((t) => t.kind === "close")) return [];
  return tokens.splice(0, i);
}

/**
 * Splits an SSML string into per-language runs of plain text (`format:
 * "plain"` has no `<lang>` markup, so a language shift mid-string becomes
 * separate segments instead). Punctuation touching a `<lang>` boundary —
 * separated by nothing or only whitespace — joins the tagged run rather
 * than staying with its lexical run: close-punct after `</lang>` joins the
 * run that just closed, open-punct before `<lang>` joins the run about to
 * start.
 */
export function splitOnLangTags(ssml: string, baseLanguage: string | undefined): LangSegment[] {
  interface Run {
    tokens: Token[];
    language: string | undefined;
    tagged: boolean;
  }
  const runs: Run[] = [];

  let lastIndex = 0;
  for (const match of ssml.matchAll(RAW_LANG_TAG_RE)) {
    runs.push({
      tokens: tokenize(stripSsmlTagsKeepEdges(ssml.slice(lastIndex, match.index))),
      language: baseLanguage,
      tagged: false,
    });
    runs.push({ tokens: tokenize(stripSsmlTags(match[2])), language: match[1], tagged: true });
    lastIndex = match.index! + match[0].length;
  }
  runs.push({
    tokens: tokenize(stripSsmlTagsKeepEdges(ssml.slice(lastIndex))),
    language: baseLanguage,
    tagged: false,
  });

  for (let i = 0; i < runs.length - 1; i++) {
    if (!runs[i].tagged && runs[i + 1].tagged) {
      runs[i + 1].tokens.unshift(...peelTrailingOpen(runs[i].tokens));
    } else if (runs[i].tagged && !runs[i + 1].tagged) {
      runs[i].tokens.push(...peelLeadingClose(runs[i + 1].tokens));
    }
  }

  const segments: LangSegment[] = [];
  for (const run of runs) {
    const plain = renderTokens(run.tokens);
    if (plain) segments.push({ plain, language: run.language });
  }
  return segments;
}

export interface SsmlSegment {
  // A run of ssml (may itself carry further tags, e.g. `<lang>`) between
  // placeholders. Mutually exclusive with `placeholderId`.
  ssml?: string;
  // The `id` of a `<readium:TAG id="...">` placeholder at this position,
  // linking to the sibling/child `GndObject` carrying that `id`.
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
 * `<readium:TAG id="...">` placeholders, for `inlineContextualization`: each
 * placeholder becomes its own segment (resolved via the `GndObject` sharing
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
