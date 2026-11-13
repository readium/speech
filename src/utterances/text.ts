import { BINDING_PUNCT_CLASS, ssmlTextEscape, startsWithBindingPunct } from "@readium/helpers";
import type { GuidedNavigationObject } from "@readium/shared";
import { DROPPED, removeDropped } from "@readium/guided-navigation";
import {
  closeTag,
  commonAncestors,
  decodeSsmlEntities,
  isStructureElement,
  langElementLanguage,
  parseSsml,
  serializeSsml,
  SsmlWriter,
  ssmlElements,
  ssmlEntityAt,
  ssmlLeaves,
  type SsmlElement,
  type SsmlLeaf,
  type SsmlNode,
  type SsmlText,
} from "./ssml.js";
import type { SubstitutionRule, SubstitutionTable } from "./types.js";
import { joinsWithoutSpace, meetsUnspaced, OPENING_PUNCT_CLASS, startsWithOpeningPunct } from "../utils/text.js";

export interface ResolvedNodeText {
  plain?: string;
  ssml?: string;
  language?: string;
}

// The `id` of a `<readium:TAG id="...">` placeholder, `undefined` for any other element.
function placeholderIdOf(element: SsmlElement): string | undefined {
  return element.name.startsWith("readium:") ? element.attrs.get("id") : undefined;
}

function aliasOf(element: SsmlElement): string | undefined {
  return element.name === "sub" ? element.attrs.get("alias") : undefined;
}

const isAbbreviation = (element: SsmlElement) => aliasOf(element) !== undefined;

const leafText = ({ node }: SsmlLeaf) => (node.kind === "text" ? node.text : "");

/**
 * Removes `<readium:TAG id="...">` placeholders from an SSML string. These
 * mark where an embedded reference (a noteref, pagebreak, image...) sits in
 * the text flow, linking to a sibling/child GND object by id — real GND
 * consumers resolve them from there. This extractor instead speaks that
 * referenced object as its own separate utterance (via the normal children
 * walk), so the placeholder itself is just removed, using the same
 * binding-punctuation rule the GND converter itself uses when omitting a
 * placeholder from its plain-text variant (see `startsWithBindingPunct` in
 * `@readium/helpers`): no space is inserted before punctuation that binds to
 * the preceding word (e.g. ".", ","), but a single space is inserted
 * between two words that would otherwise run together.
 */
function stripPlaceholders(ssml: string): string {
  const nodes = parseSsml(ssml);
  const leaves = ssmlLeaves(nodes);
  const replacements = new Map<SsmlElement, string>();
  leaves.forEach(({ node }, k) => {
    if (node.kind !== "element" || placeholderIdOf(node) === undefined) return;
    const after = leaves.slice(k + 1).map(leafText).join("").trimStart();
    replacements.set(node, after.length === 0 || startsWithBindingPunct(after) ? "" : " ");
  });
  if (replacements.size === 0) return ssml.replace(/ {2,}/g, " ").trim();

  // The whitespace right around a placeholder goes with it.
  const strip = (siblings: SsmlNode[]): SsmlNode[] => {
    const out: SsmlNode[] = [];
    let afterPlaceholder = false;
    for (const node of siblings) {
      const replacement = node.kind === "element" ? replacements.get(node) : undefined;
      if (replacement !== undefined) {
        const previous = out[out.length - 1];
        if (previous?.kind === "text") previous.text = previous.text.replace(/\s+$/, "");
        out.push({ kind: "text", text: replacement });
        afterPlaceholder = true;
      } else if (node.kind === "text") {
        out.push({ kind: "text", text: afterPlaceholder ? node.text.replace(/^\s+/, "") : node.text });
        afterPlaceholder = false;
      } else {
        out.push(node.children.length > 0 ? { ...node, children: strip(node.children) } : node);
        afterPlaceholder = false;
      }
    }
    return out;
  };
  return serializeSsml(strip(nodes)).replace(/ {2,}/g, " ").trim();
}

// A `<` can only appear in an SSML string as the start of a real SSML tag —
// any literal `<` in the source text itself is entity-escaped by the GND
// converter. So once placeholders are stripped, this is a reliable check for
// whether any actual SSML markup (`<lang>`, `<emphasis>`, `<break/>`...)
// remains, as opposed to a placeholder-only string that's now redundant with
// the `plain` variant (which the GND converter guarantees is present
// whenever the only reason `ssml` existed was an embedded placeholder — see
// `@readium/guided-navigation`'s `converter.ts` `hasPlaceholder` handling).
function hasSsmlMarkup(s: string): boolean {
  return s.includes("<");
}

/**
 * Resolves a `GuidedNavigationObject.text` value (a `GuidedNavigationText`
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
 * is dropped rather than reported as a duplicate of `plain`, standing in for
 * `plain` when the source provides none.
 *
 * `language` is carried alongside either variant: the GND converter attaches
 * the nearest ancestor's declared language (e.g. `<html lang="fr">`) to every
 * text node under it, so this is the only place that document-declared
 * language would otherwise be lost.
 */
export function resolveNodeText(text: GuidedNavigationObject["text"]): ResolvedNodeText | undefined {
  if (text === undefined) return undefined;
  const result: ResolvedNodeText = {};
  if (text.language !== undefined) result.language = text.language;
  const stripped = text.ssml ? stripPlaceholders(removeEmptiedPairs(text.ssml, () => true, text.language).ssml) : "";
  if (hasSsmlMarkup(stripped)) result.ssml = stripped;
  if (text.plain) result.plain = text.plain;
  else if (stripped && !result.ssml) result.plain = stripSsmlTags(stripped);

  return result.plain || result.ssml ? result : undefined;
}

// Strips every SSML tag (not just `<readium:...>` placeholders — `<lang>`,
// `<emphasis>`, `<break/>`...) and unescapes the entities `ssmlTextEscape`
// applies, for synthesizing a `plain` variant from a node that only
// naturally has `ssml` (e.g. an inline language shift with no embedded
// placeholder, so the GND converter never generated a `plain` variant for
// it — see `@readium/guided-navigation`'s `converter.ts` `flushText()`).
export function stripSsmlTags(ssml: string): string {
  return stripSsmlTagsWithMap(ssml).plain;
}

// Whether a removed `<break/>` between `before` and `after` reads as a space: not before binding punctuation, at either end, or within unspaced text.
export function breakSpaced(before: string, after: string): boolean {
  return before.length > 0 && after.length > 0 && !/\s$/.test(before) && !/^\s/.test(after) && !startsWithBindingPunct(after) && !joinsWithoutSpace(before, after);
}

// SSML elements that delimit a sentence, paragraph, token, speaker or sound; other paired elements can fall within a word.
const WORD_SEPARATING_ELEMENTS = new Set(["speak", "p", "s", "voice", "audio", "desc", "token", "w"]);

// Whether `markup`, starting with a tag, leaves a word boundary where it's removed: a self-closing tag like `<break/>`, or a structural element.
export function separatesWords(markup: string): boolean {
  return /^<[^>]*\/>/.test(markup) || WORD_SEPARATING_ELEMENTS.has(/^<\/?([^\s/>]+)/.exec(markup)?.[1] ?? "");
}

const NEXT_TEXT_RE = /(?:<[^>]*>)*([^<]*)/y;

// The text right after `pos` in `ssml`, past any tags there.
function textAfter(ssml: string, pos: number): string {
  NEXT_TEXT_RE.lastIndex = pos;
  return decodeSsmlEntities(NEXT_TEXT_RE.exec(ssml)![1]);
}

// Strips tags and unescapes entities, a word-separating tag read as a space, without collapsing or trimming other whitespace.
export function stripSsmlTagsKeepSpacing(ssml: string): string {
  let plain = "";
  let last = 0;
  for (const tag of ssml.matchAll(/<[^>]+>/g)) {
    plain += decodeSsmlEntities(ssml.slice(last, tag.index));
    last = tag.index + tag[0].length;
    if (separatesWords(tag[0]) && breakSpaced(plain, textAfter(ssml, last))) plain += " ";
  }
  return plain + decodeSsmlEntities(ssml.slice(last));
}

// Same as `stripSsmlTags`, but `map[i]` also gives the `ssml` position that produced `plain[i]`.
export function stripSsmlTagsWithMap(ssml: string): { plain: string; map: number[] } {
  let plain = "";
  const map: number[] = [];
  let lastWasSpace = false;
  let i = 0;
  while (i < ssml.length) {
    const ch = ssml[i];
    if (ch === "<") {
      const close = ssml.indexOf(">", i);
      const tag = ssml.slice(i, close + 1);
      i = close === -1 ? ssml.length : close + 1;
      // A removed `<break/>` or `<s>` must not glue two words together, unlike inline formatting within a word (e.g. "<emphasis>two</emphasis>fold").
      if (close !== -1 && separatesWords(tag) && !lastWasSpace && breakSpaced(plain, textAfter(ssml, i))) {
        plain += " ";
        map.push(i);
        lastWasSpace = true;
      }
      continue;
    }
    const entity = ch === "&" ? ssmlEntityAt(ssml, i) : undefined;
    if (entity) {
      plain += entity.decoded;
      for (let k = 0; k < entity.decoded.length; k++) map.push(i);
      i += entity.length;
      lastWasSpace = false;
      continue;
    }
    if (ch === " ") {
      if (!lastWasSpace) {
        plain += ch;
        map.push(i);
        lastWasSpace = true;
      }
      i++;
      continue;
    }
    plain += ch;
    map.push(i);
    lastWasSpace = false;
    i++;
  }
  let start = 0;
  while (start < plain.length && /\s/.test(plain[start])) start++;
  let end = plain.length;
  while (end > start && /\s/.test(plain[end - 1])) end--;
  return { plain: plain.slice(start, end), map: map.slice(start, end) };
}

// Smallest plain index whose SSML source position is >= `ssmlIndex` — lands
// on the next real character when `ssmlIndex` fell inside a stripped tag.
export function ssmlIndexToPlainIndex(map: number[], ssmlIndex: number): number {
  let lo = 0;
  let hi = map.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (map[mid] < ssmlIndex) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

interface CompiledSubstitutionRule {
  regex: RegExp;
  replace: string | ((...match: string[]) => string);
}

// Cached per table object, since builtInSubstitutions is reused across calls.
const compiledSubstitutionTables = new WeakMap<SubstitutionTable, CompiledSubstitutionRule[]>();

function escapeRegExpLiteral(literal: string): string {
  return literal.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// `\b` never fires between two non-word chars, so a blanket `\b` on both
// ends would silently never match "(c)" — apply it only where the edge char is a word char.
function tokenBoundaryPattern(literal: string): string {
  const escaped = escapeRegExpLiteral(literal);
  const lead = /\w/.test(literal[0]) ? "(?<!\\w)" : "";
  const trail = /\w/.test(literal[literal.length - 1]) ? "(?!\\w)" : "";
  return `${lead}${escaped}${trail}`;
}

function compileSubstitutionRule(key: string, rule: SubstitutionRule): CompiledSubstitutionRule {
  if (typeof rule === "string") {
    return { regex: new RegExp(tokenBoundaryPattern(key), "g"), replace: rule };
  }
  const flags = rule.pattern.flags.includes("g") ? rule.pattern.flags : `${rule.pattern.flags}g`;
  return { regex: new RegExp(rule.pattern.source, flags), replace: rule.replace };
}

function compileSubstitutionTable(table: SubstitutionTable): CompiledSubstitutionRule[] {
  let compiled = compiledSubstitutionTables.get(table);
  if (!compiled) {
    compiled = Object.entries(table).map(([key, rule]) => compileSubstitutionRule(key, rule));
    compiledSubstitutionTables.set(table, compiled);
  }
  return compiled;
}

interface SubstitutionSpan {
  start: number;
  end: number;
  replacement: string;
}

// Every rule's matches over `text`, resolved to a sorted, non-overlapping
// set (leftmost match wins on overlap).
function resolveSubstitutionSpans(text: string, table: SubstitutionTable): SubstitutionSpan[] {
  const candidates: SubstitutionSpan[] = [];
  for (const rule of compileSubstitutionTable(table)) {
    for (const match of text.matchAll(rule.regex)) {
      const start = match.index!;
      const replacement = typeof rule.replace === "string" ? rule.replace : rule.replace(...(match as unknown as string[]));
      candidates.push({ start, end: start + match[0].length, replacement });
    }
  }
  candidates.sort((a, b) => a.start - b.start);

  const spans: SubstitutionSpan[] = [];
  let cursor = 0;
  for (const span of candidates) {
    if (span.start < cursor) continue; // overlaps a previously accepted span — leftmost wins
    spans.push(span);
    cursor = span.end;
  }
  return spans;
}

// Runs every rule over `text` (leftmost-match wins on overlap), returning
// the rewritten text plus `map[i]` = the source index for output char i.
export function substituteWithMap(text: string, table: SubstitutionTable): { text: string; map: number[] } {
  let out = "";
  const map: number[] = [];
  let cursor = 0;
  for (const span of resolveSubstitutionSpans(text, table)) {
    while (cursor < span.start) {
      out += text[cursor];
      map.push(cursor);
      cursor++;
    }
    // By UTF-16 code unit, not code point (no `for...of`) — a surrogate-pair
    // replacement char must still add one map entry per code unit.
    for (let i = 0; i < span.replacement.length; i++) {
      out += span.replacement[i];
      map.push(span.start);
    }
    cursor = span.end;
  }
  while (cursor < text.length) {
    out += text[cursor];
    map.push(cursor);
    cursor++;
  }
  return { text: out, map };
}

// A direct lookup, not a search, since `map` is already indexed by
// substituted position. `substitutedIndex === map.length` lands one past the last mapped char.
export function substitutedIndexToSourceIndex(map: number[], substitutedIndex: number): number {
  if (!map.length) return substitutedIndex;
  if (substitutedIndex <= 0) return map[0];
  if (substitutedIndex >= map.length) return map[map.length - 1] + 1;
  return map[substitutedIndex];
}

export interface SsmlSubstitutionResult {
  ssml: string;
  plain: string; // the pre-substitution text `map` resolves into, same shape as stripSsmlTags(ssml)
  map: number[]; // map[i] = position in `plain` for substituted-plain char i
}

// A run of `plain` under its enclosing elements, or a childless element (e.g. `<break/>`) at that point.
type PlainPiece = { start: number; end: number; chain: SsmlElement[] } | { node: SsmlElement; chain: SsmlElement[] };

// Rewrites SSML text content only (tags/attributes untouched), re-escaping
// each replacement so a caller-supplied `replace` can't corrupt the markup.
// A match within one text node stays in that node's elements; a match crossing
// elements goes into the innermost element enclosing all of it.
// `plain`/`map` describe the same rewrite over tag-stripped text.
export function substituteSsmlText(ssml: string, table: SubstitutionTable): SsmlSubstitutionResult {
  // Lays out `plain` with the same word-separating space as stripSsmlTagsWithMap.
  let plain = "";
  let lastWasSpace = false;
  let separated = false;
  let previousChain: SsmlElement[] = [];
  const pieces: PlainPiece[] = [];

  for (const { node, ancestors } of ssmlLeaves(parseSsml(ssml))) {
    const common = commonAncestors(previousChain, ancestors).length;
    if ([...previousChain.slice(common), ...ancestors.slice(common)].some((element) => separatesWords(element.openTag))) separated = true;
    previousChain = ancestors;
    if (node.kind === "element") {
      pieces.push({ node, chain: ancestors });
      if (separatesWords(node.openTag)) separated = true;
      continue;
    }
    if (separated && !lastWasSpace && breakSpaced(plain, node.text)) {
      pieces.push({ start: plain.length, end: plain.length + 1, chain: ancestors.slice(0, common) });
      plain += " ";
    }
    pieces.push({ start: plain.length, end: plain.length + node.text.length, chain: ancestors });
    plain += node.text;
    lastWasSpace = /\s$/.test(node.text);
    separated = false;
  }

  const spans = resolveSubstitutionSpans(plain, table);
  const textPieces = pieces.filter((piece) => "start" in piece);
  const pieceAt = (position: number) => textPieces.find((piece) => piece.start <= position && position < piece.end)!;

  const writer = new SsmlWriter();
  let substitutedPlain = "";
  const map: number[] = [];
  let spanIndex = 0;

  for (const piece of pieces) {
    if ("node" in piece) {
      writer.node(piece.chain, piece.node);
      continue;
    }
    let cursor = piece.start;
    while (cursor < piece.end) {
      const span = spans[spanIndex];
      if (span && span.start <= cursor) {
        if (span.start === cursor) {
          substitutedPlain += span.replacement;
          for (let i = 0; i < span.replacement.length; i++) map.push(span.start);
          writer.text(commonAncestors(piece.chain, pieceAt(span.end - 1).chain), span.replacement);
        }
        cursor = Math.min(span.end, piece.end);
        if (span.end <= piece.end) spanIndex++;
        continue;
      }
      const next = span ? Math.min(span.start, piece.end) : piece.end;
      const text = plain.slice(cursor, next);
      substitutedPlain += text;
      for (let i = 0; i < text.length; i++) map.push(cursor + i);
      writer.text(piece.chain, text);
      cursor = next;
    }
  }
  const outSsml = writer.flush();

  let plainStart = 0;
  while (plainStart < plain.length && /\s/.test(plain[plainStart])) plainStart++;
  let plainEnd = plain.length;
  while (plainEnd > plainStart && /\s/.test(plain[plainEnd - 1])) plainEnd--;
  let subStart = 0;
  while (subStart < substitutedPlain.length && /\s/.test(substitutedPlain[subStart])) subStart++;
  let subEnd = substitutedPlain.length;
  while (subEnd > subStart && /\s/.test(substitutedPlain[subEnd - 1])) subEnd--;

  const trimmedPlain = plain.slice(plainStart, plainEnd);
  const trimmedMap = map
    .slice(subStart, subEnd)
    .map((v) => Math.min(Math.max(v - plainStart, 0), Math.max(trimmedPlain.length - 1, 0)));

  return { ssml: outSsml, plain: trimmedPlain, map: trimmedMap };
}

export interface LangSegment {
  plain: string;
  language?: string;
}

export function hasLangTag(ssml: string): boolean {
  return [...ssmlElements(parseSsml(ssml))].some((element) => langElementLanguage(element) !== undefined);
}

// Same as `stripSsmlTags`, minus the final trim.
function stripSsmlTagsKeepEdges(ssml: string): string {
  return stripSsmlTagsKeepSpacing(ssml).replace(/ {2,}/g, " ");
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
 * start. Text in nested `<lang>` elements takes the innermost one's language.
 */
export function splitOnLangTags(ssml: string, baseLanguage: string | undefined): LangSegment[] {
  interface Run {
    tokens: Token[];
    language: string | undefined;
    tagged: boolean;
  }
  // Consecutive leaves under the same innermost `<lang>` (or none), written without that `<lang>` and its ancestors.
  const groups: { lang?: SsmlElement; writer: SsmlWriter }[] = [];
  for (const { node, ancestors } of ssmlLeaves(parseSsml(ssml))) {
    let langDepth = ancestors.length - 1;
    while (langDepth >= 0 && langElementLanguage(ancestors[langDepth]) === undefined) langDepth--;
    const lang = langDepth === -1 ? undefined : ancestors[langDepth];
    if (groups.length === 0 || groups[groups.length - 1].lang !== lang) groups.push({ lang, writer: new SsmlWriter() });
    const { writer } = groups[groups.length - 1];
    const chain = ancestors.slice(langDepth + 1);
    if (node.kind === "text") writer.text(chain, node.text);
    else writer.node(chain, node);
  }
  const runs: Run[] = groups.map(({ lang, writer }) =>
    lang
      ? { tokens: tokenize(stripSsmlTags(writer.flush())), language: langElementLanguage(lang), tagged: true }
      : { tokens: tokenize(stripSsmlTagsKeepEdges(writer.flush())), language: baseLanguage, tagged: false },
  );

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
  // placeholders. Mutually exclusive with `placeholderId`. A text run is a slice of
  // the source, so its tags may open or close in another segment: the segments joined give back the source.
  ssml?: string;
  // The tags of the elements open around `ssml` in the source, to read it on its own; never output.
  openTags?: string;
  closeTags?: string;
  // The `id` of a `<readium:TAG id="...">` placeholder at this position,
  // linking to the sibling/child `GuidedNavigationObject` carrying that `id`.
  placeholderId?: string;
  // On a placeholder: the text between it and the marks before and after it, without tags.
  textBefore?: string;
  textAfter?: string;
  // Whether `ssml` is a `<sub alias>`'s abbreviation or its alias, each keeping the formatting wrapping just the `<sub>`.
  abbreviation?: "text" | "alias";
  // On an alias segment: the abbreviation's ssml, and the alias in parentheses, to follow it.
  abbreviationText?: string;
  parenthesizedSsml?: string;
  // Whether this text touches the text segment before it with no whitespace between, at an abbreviation's edge.
  touchesPrevious?: boolean;
}

const ATTACHED_END_RE = /[\p{L}\p{M}\p{N}\p{Pd}]+$/u;
const ATTACHED_START_RE = /^[\p{L}\p{M}\p{N}\p{Pd}]+/u;

// Word boundaries at an abbreviation's edge come from the scripts meeting there, not the locale.
let wordSegmenter: Intl.Segmenter | undefined;
const wordsOf = (text: string) => (wordSegmenter ??= new Intl.Segmenter("und", { granularity: "word" })).segment(text);

// How much of `candidate`, the text right after `word`, is in the same word: all of it past a hyphen.
function attachedAfter(word: string, candidate: string): string {
  if (!word || !candidate || /^\p{Pd}/u.test(candidate)) return candidate;
  if (meetsUnspaced(word, candidate)) return "";
  if (typeof Intl.Segmenter !== "function") return candidate;
  const { index, segment } = wordsOf(word + candidate).containing(word.length - 1)!;
  return candidate.slice(0, Math.max(0, index + segment.length - word.length));
}

// How much of `candidate`, the text right before `word`, is in the same word: all of it before a hyphen.
function attachedBefore(candidate: string, word: string): string {
  if (!word || !candidate || /\p{Pd}$/u.test(candidate)) return candidate;
  if (meetsUnspaced(candidate, word)) return "";
  if (typeof Intl.Segmenter !== "function") return candidate;
  const { index } = wordsOf(candidate + word).containing(candidate.length)!;
  return candidate.slice(Math.min(candidate.length, index));
}

export function hasPlaceholder(ssml: string): boolean {
  return [...ssmlElements(parseSsml(ssml))].some((element) => placeholderIdOf(element) !== undefined || isAbbreviation(element));
}

// Removes the brackets and quotes each dropped placeholder leaves around nothing, as `removeDropped()` does in plain text,
// and tells which dropped placeholders it keeps a space at.
export function removeEmptiedPairs(
  ssml: string,
  isDropped: (id: string) => boolean,
  language: string | undefined,
): { ssml: string; spaced: Set<string> } {
  const nodes = parseSsml(ssml);
  const { chars, removed } = dropInText(nodes, isDropped, language);
  const spaced = new Set<string>();
  chars.forEach(({ char, id }, k) => {
    if (char !== DROPPED) return;
    for (const step of [-1, 1]) {
      for (let i = k + step; chars[i] && (removed[i] || /\s/.test(chars[i].char)); i += step) {
        if (!removed[i]) spaced.add(id!);
      }
    }
  });
  // Spaces stay: the text around a placeholder is joined by `spaced`, not by them.
  const removedAt = new Map<SsmlText, Set<number>>();
  chars.forEach(({ char, node, index }, k) => {
    if (!removed[k] || !node || /\s/.test(char)) return;
    if (!removedAt.has(node)) removedAt.set(node, new Set());
    removedAt.get(node)!.add(index!);
  });
  if (removedAt.size === 0) return { ssml, spaced };
  for (const [node, indices] of removedAt) node.text = node.text.split("").filter((_, i) => !indices.has(i)).join("");
  return { ssml: serializeSsml(withoutEmptied(nodes)), spaced };
}

// `nodes` without empty text, nor elements that held only text now gone; elements written empty stay.
function withoutEmptied(nodes: SsmlNode[]): SsmlNode[] {
  return nodes.flatMap((node): SsmlNode[] => {
    if (node.kind === "text") return node.text ? [node] : [];
    if (node.children.length === 0) return [node];
    const children = withoutEmptied(node.children);
    return children.length > 0 ? [{ ...node, children }] : [];
  });
}

// The placeholders that a bracket or quote pair encloses alone, as `removeDropped()` finds it.
export function enclosedPlaceholders(ssml: string, language: string | undefined): Set<string> {
  const { chars, removed } = dropInText(parseSsml(ssml), () => true, language);
  const nearest = (k: number, step: number) => {
    for (let i = k + step; i >= 0 && i < chars.length; i += step) if (chars[i].id === undefined && !/\s/.test(chars[i].char)) return i;
    return -1;
  };
  const enclosed = new Set<string>();
  chars.forEach(({ id }, k) => {
    const [before, after] = [nearest(k, -1), nearest(k, 1)];
    if (id !== undefined && before !== -1 && after !== -1 && removed[before] && removed[after]) enclosed.add(id);
  });
  return enclosed;
}

// The text of `nodes`, each placeholder or abbreviation as one character, and which characters `removeDropped()` takes out.
function dropInText(nodes: SsmlNode[], isDropped: (id: string) => boolean, language: string | undefined) {
  const chars: { char: string; node?: SsmlText; index?: number; id?: string }[] = [];
  for (const { node } of ssmlLeaves(nodes, isAbbreviation)) {
    if (node.kind === "text") {
      for (let index = 0; index < node.text.length; index++) chars.push({ char: node.text[index], node, index });
      continue;
    }
    const id = placeholderIdOf(node);
    if (id !== undefined || isAbbreviation(node)) chars.push({ char: id !== undefined && isDropped(id) ? DROPPED : "\uFFFC", id });
  }
  const kept = removeDropped(chars.map(({ char }) => char).join(""), language);
  // removeDropped() only takes characters out, so the ones it keeps are found in order.
  let j = 0;
  const removed = chars.map(({ char }) => (j < kept.length && char === kept[j] ? (j++, false) : true));
  return { chars, removed };
}

// Whether `text`, after a space and a dropped object, keeps that space as `removeDropped()` joins them.
export function keepsSpaceBefore(text: string, language: string | undefined): boolean {
  return removeDropped(`x ${DROPPED}${text}`, language).startsWith("x ");
}

// A placeholder, or a `<sub alias>` with the formatting elements wrapping just it, at `[start, end)` in the source.
interface Mark {
  start: number;
  end: number;
  placeholderId?: string;
  alias?: string;
  inner?: string; // the `<sub>`'s source content
  wrapOpen?: string;
  wrapClose?: string;
}

function marksOf(ssml: string, nodes: SsmlNode[]): Mark[] {
  const marks: Mark[] = [];
  for (const { node, ancestors } of ssmlLeaves(nodes, isAbbreviation)) {
    if (node.kind !== "element") continue;
    const placeholderId = placeholderIdOf(node);
    if (placeholderId !== undefined) marks.push({ start: node.start, end: node.end, placeholderId });
    if (!isAbbreviation(node)) continue;
    let wrapStart = ancestors.length;
    while (wrapStart > 0 && ancestors[wrapStart - 1].children.length === 1 && !isStructureElement(ancestors[wrapStart - 1])) wrapStart--;
    const wrappers = ancestors.slice(wrapStart);
    marks.push({
      start: wrappers[0]?.start ?? node.start,
      end: wrappers[0]?.end ?? node.end,
      alias: aliasOf(node),
      inner: ssml.slice(node.start + node.openTag.length, node.closeStart),
      wrapOpen: wrappers.map((element) => element.openTag).join(""),
      wrapClose: wrappers.map(closeTag).reverse().join(""),
    });
  }
  return marks;
}

const untagged = (ssml: string) => ssml.replace(/<[^>]*>/g, "");

/**
 * Splits a raw (pre-`stripPlaceholders`) SSML string on its embedded
 * `<readium:TAG id="...">` placeholders and `<sub alias>` abbreviations, for `interruptions`: each
 * placeholder becomes its own segment (resolved via the `GuidedNavigationObject` sharing
 * its `id`) instead of being spoken after the whole enclosing text.
 */
export function splitOnPlaceholders(ssml: string): SsmlSegment[] {
  const nodes = parseSsml(ssml);
  const elements = [...ssmlElements(nodes)].filter((element) => !element.selfClosing);
  // The elements open at `offset` in the source, outermost first.
  const openAt = (offset: number) => elements.filter((element) => element.start < offset && offset <= element.closeStart);
  const context = (from: number, to: number) => ({
    openTags: openAt(from).map((element) => element.openTag).join(""),
    closeTags: openAt(to).map(closeTag).reverse().join(""),
  });

  const segments: SsmlSegment[] = [];
  let lastIndex = 0;
  let afterAbbreviation = false;
  const pushText = (from: number, to: number) => {
    const raw = ssml.slice(from, to);
    const text = raw.trim();
    if (!text) return;
    const start = from + raw.length - raw.trimStart().length;
    const segment: SsmlSegment = { ssml: text, ...context(start, start + text.length) };
    segments.push(afterAbbreviation && !/^\s/.test(raw) ? { ...segment, touchesPrevious: true } : segment);
  };
  const marks = marksOf(ssml, nodes);
  marks.forEach((mark, k) => {
    const following = ssml.slice(mark.end, marks[k + 1]?.start ?? ssml.length);
    if (mark.placeholderId !== undefined) {
      pushText(lastIndex, mark.start);
      segments.push({ placeholderId: mark.placeholderId, textBefore: untagged(ssml.slice(lastIndex, mark.start)), textAfter: untagged(following) });
      afterAbbreviation = false;
      lastIndex = mark.end;
      return;
    }
    // Text attached to an abbreviation (e.g. a plural "s") stays attached to it and to its alias, as SSML's <sub> reads.
    const word = stripSsmlTags(mark.inner!);
    const prefix = attachedBefore(ssml.slice(lastIndex, mark.start).match(ATTACHED_END_RE)?.[0] ?? "", word);
    const suffix = attachedAfter(word, following.match(ATTACHED_START_RE)?.[0] ?? "");
    const rawBefore = ssml.slice(lastIndex, mark.start - prefix.length);
    pushText(lastIndex, mark.start - prefix.length);
    const touchesPrevious = rawBefore.trim() !== "" && !/\s$/.test(rawBefore);
    const wrap = (inner: string) => `${mark.wrapOpen}${inner}${mark.wrapClose}`;
    const attach = (inner: string) => wrap(`${prefix}${inner}${suffix}`);
    const around = context(mark.start, mark.end);
    const aliasSsml = ssmlTextEscape(mark.alias!);
    segments.push({ ssml: attach(mark.inner!), ...around, abbreviation: "text", ...(touchesPrevious && { touchesPrevious }) });
    segments.push({
      ssml: attach(aliasSsml),
      ...around,
      abbreviation: "alias",
      abbreviationText: attach(mark.inner!),
      parenthesizedSsml: wrap(`(${aliasSsml})`),
      ...(touchesPrevious && { touchesPrevious }),
    });
    afterAbbreviation = true;
    lastIndex = mark.end + suffix.length;
  });
  pushText(lastIndex, ssml.length);
  return segments;
}
