import type { GuidedNavigationObject } from "@readium/shared";
import { isAriaSubstituted } from "@readium/guided-navigation";
import type { LocatorOptions } from "../decorator/createLocator.js";
import type { UtteranceOffset } from "../utterance.js";
import type { Piece } from "./piece.js";
import { quoteLocate, resolveNodeLocate, type QuotePlace } from "./locate.js";
import { pieceText, substitutedBareLocate } from "./mergeUtterances.js";
import { recordPage, type PageChar, type PageRun } from "./pageRecord.js";
import { collapseSpaces, stripSsmlTags } from "./plainText.js";
import { plainTextOf } from "./tableStructure.js";
import { splitOnPlaceholders } from "./text.js";
import { embeddedTargetRoleSet, interruptionRoleSet, textReferenceRoleSet, type WalkContext } from "./walkContext.js";
import { nodeRoles, nodeText } from "./nodeFields.js";

// In a span's `map`: a spoken space, and a spoken character its node's own text dropped (e.g. a bracket).
const SPACE = -1;
const DROPPED = -2;

// Where a stretch of an utterance's plain text, from `at`, comes from in `node`'s own text.
export type SourceSpan = TextSpan | AliasSpan;

// `block`: the outermost element whose own text holds `node`'s, where `node`'s starts in it, and where that text isn't the page's.
// `offPage`: where the node's own text isn't the page's: a label read in place of its element's text, or the point a marker's text is left out at.
type InBlock = { block?: { node: GuidedNavigationObject; at: number; offPage: Range[] }; offPage?: Range[] };

interface TextSpan extends InBlock {
  node: GuidedNavigationObject;
  ownText: string;
  at: number;
  // The own-text position of each character spoken from `at`, or SPACE/DROPPED.
  map: number[];
  // Taken from text other than the node's own (a figure's or table's description), so never located bare.
  quotedOnly?: boolean;
}

// Spoken text that isn't on the page, located on `[start, end)` of the own text, and never cut.
interface AliasSpan extends InBlock {
  node: GuidedNavigationObject;
  at: number;
  start: number;
  end: number;
  alias: LocatorOptions;
  // Unset on the piece reading it: the piece's whole text, whatever gets appended to it.
  length?: number;
}

const isText = (span: SourceSpan): span is TextSpan => "map" in span;

// An utterance's spans, an alias's sized to the text it's on.
export function spansOf(utterance: Piece, ctx: WalkContext): SourceSpan[] {
  const spans = utterance.spans ?? [];
  return spans.map((span) => (isText(span) || span.length !== undefined ? span : { ...span, length: pieceText(utterance, ctx).length }));
}

export function setSpans(utterance: Piece, spans: SourceSpan[]): void {
  if (spans.length > 0) utterance.spans = spans;
}

export function setAliasSpan(piece: Piece, node: GuidedNavigationObject, range: { start: number; end: number }, alias: LocatorOptions): void {
  setSpans(piece, [{ node, at: 0, alias, ...range }]);
}

const positions = (from: number, to: number) => Array.from({ length: to - from }, (_, k) => from + k);

// `ownText` spoken whole from `at` in the utterance: e.g. a cell's value in its header's announcement.
// In the node's own text, an aria-labelled child's label is that child's, as when read in running text.
export function setQuotedSpan(utterance: Piece, node: GuidedNavigationObject, ownText: string, at: number): void {
  if (ownText !== plainTextOf(node)) {
    setSpans(utterance, [{ node, ownText, at, map: positions(0, ownText.length), quotedOnly: true }]);
    return;
  }
  const embedded = embeddedRanges(node);
  const offPage = ownOffPage(embedded);
  const labelled = embedded.filter(({ child }) => isAriaSubstituted(child));
  if (labelled.length === 0) {
    setSpans(utterance, [{ node, ownText, at, map: positions(0, ownText.length), offPage }]);
    return;
  }
  // Spaces around a label are spoken, not its element's text, as the aligner places running text.
  const ownMap = (from: number, to: number) => positions(from, to).map((p) => (isSpace(ownText[p]) ? SPACE : p));
  const spans: TextSpan[] = [];
  let from = 0;
  for (const { child, start, end } of labelled) {
    if (start > from) spans.push({ node, ownText, at: at + from, map: ownMap(from, start), offPage });
    spans.push({ node: child, ownText: ownText.slice(start, end), at: at + start, map: positions(0, end - start), block: { node, at: start, offPage } });
    from = end;
  }
  if (from < ownText.length) spans.push({ node, ownText, at: at + from, map: ownMap(from, ownText.length), offPage });
  setSpans(utterance, spans);
}

type Range = { start: number; end: number };

// Where each inline child's text sits in `node`'s own text, placed as the walk places running text; none if any can't be.
function embeddedRanges(node: GuidedNavigationObject): { child: GuidedNavigationObject; start: number; end: number }[] {
  const ssml = nodeText(node.text)?.ssml;
  if (!ssml) return [];
  const children = new Map((node.children ?? []).map((child) => [child.id, child] as const));
  const aligner = ownTextAligner(node);
  const embedded: Embedding[] = [];
  for (const segment of splitOnPlaceholders(ssml)) {
    if (segment.abbreviation === "alias") continue;
    const child = segment.placeholderId === undefined ? undefined : children.get(segment.placeholderId);
    if (child) {
      embedded.push(aligner.embed(child));
      continue;
    }
    const text = stripSsmlTags(segment.ssml ?? "");
    if (text && !aligner.place(text)) return [];
  }
  aligner.finish();
  return embedded.flatMap(({ child, range }) => (range ? [{ child, ...range }] : []));
}

// A noteref's or page break's own text is a marker, not prose in the node's text, unlike a link's or text reference's words.
export function holdsMarker(child: GuidedNavigationObject): boolean {
  return nodeRoles(child).some((role) => interruptionRoleSet.has(role) && !textReferenceRoleSet.has(role));
}

// A label is read in place of its element's text; a marker's is left out of the node's.
const readsOffPage = (child: GuidedNavigationObject) => isAriaSubstituted(child) || holdsMarker(child);

const ownOffPage = (embedded: ReturnType<typeof embeddedRanges>): Range[] =>
  embedded.filter(({ child }) => readsOffPage(child)).map(({ start, end }) => ({ start, end }));

const lengthOf = (span: SourceSpan) => (isText(span) ? span.map.length : span.length!);

// `spans` cut to `[from, to)` of the text they're in, positioned in that slice; an alias is kept whole if it's in it.
export function sliceSpans(spans: SourceSpan[], from: number, to: number): SourceSpan[] {
  const sliced: SourceSpan[] = [];
  for (const span of spans) {
    const spanEnd = span.at + lengthOf(span);
    if (spanEnd <= from || span.at >= to) continue;
    if (!isText(span)) {
      sliced.push({ ...span, at: span.at - from });
      continue;
    }
    const start = Math.max(span.at, from);
    const map = span.map.slice(start - span.at, Math.min(spanEnd, to) - span.at);
    if (map.some((position) => position >= 0)) sliced.push({ ...span, at: start - from, map });
  }
  return sliced;
}

// The spans of `pieces` joined into one text, each piece at `ranges[k]` of it.
export function joinedSpans(pieces: Piece[], ranges: { start: number; end: number }[], ctx: WalkContext): SourceSpan[] {
  return pieces.flatMap((piece, k) =>
    sliceSpans(spansOf(piece, ctx), 0, ranges[k].end - ranges[k].start).map((span) => ({ ...span, at: span.at + ranges[k].start })),
  );
}

const isSpace = (char: string) => /\s/.test(char);
const isDroppable = (char: string) => /[\p{Ps}\p{Pe}\p{Pi}\p{Pf}"']/u.test(char);

// Places, in order, the texts read out of `node`'s own text, skipping whitespace and the brackets it drops.
// Between two texts, only an embedded child's text can be skipped (e.g. a link's words): that places the child.
// `finish()` places the children left at the end.
export interface OwnTextAligner {
  place(text: string): TextSpan | undefined;
  embed(child: GuidedNavigationObject): Embedding;
  finish(): void;
}

// One occurrence of a child in the node's text. `range`, once placed: where the child's own text sits in the node's,
// from its first character matched, its whitespace included; for a marker, the empty point its text is left out at.
export interface Embedding {
  child: GuidedNavigationObject;
  range?: Range;
}

export function ownTextAligner(node: GuidedNavigationObject): OwnTextAligner {
  const ownText = plainTextOf(node);
  let cursor = 0;
  let embedded: Embedding[] = [];
  const matchFrom = (text: string, from: number): { map: number[]; end: number } | undefined => {
    const map = new Array<number>(text.length);
    let j = from;
    let end = -1;
    for (let i = 0; i < text.length; i++) {
      if (isSpace(text[i])) {
        map[i] = SPACE;
        continue;
      }
      while (j < ownText.length && isSpace(ownText[j])) j++;
      if (ownText[j] === text[i]) {
        map[i] = j;
        end = ++j;
      } else if (isDroppable(text[i])) map[i] = DROPPED;
      else return undefined;
    }
    return end === -1 ? undefined : { map, end };
  };
  // The embedded children's text the node holds, each from where the previous one found ends.
  const skipEmbedded = () => {
    const skipped: { embedding: Embedding; range?: Range; end: number }[] = [];
    for (const embedding of embedded) {
      const from = skipped.length ? skipped[skipped.length - 1].end : cursor;
      if (holdsMarker(embedding.child)) {
        skipped.push({ embedding, range: { start: from, end: from }, end: from });
        continue;
      }
      const text = plainTextOf(embedding.child);
      const match = matchFrom(text, from);
      if (!match) continue;
      const first = match.map.findIndex((position) => position >= 0);
      const start = match.map[first] - first;
      // Placed only where the node holds its text as is: skipped over, but not placed, where it differs.
      const verbatim = ownText.slice(start, start + text.length) === text;
      skipped.push({ embedding, range: verbatim ? { start, end: start + text.length } : undefined, end: match.end });
    }
    embedded = [];
    return skipped;
  };
  return {
    embed(child) {
      const embedding: Embedding = { child };
      embedded.push(embedding);
      return embedding;
    },
    place(text) {
      // Right after the children's text the node holds, else before it, in case a child's text isn't there but reads the same.
      const skipped = skipEmbedded();
      const starts = [cursor, ...skipped.map(({ end }) => end)];
      for (let k = starts.length - 1; k >= 0; k--) {
        const match = matchFrom(text, starts[k]);
        if (!match) continue;
        skipped.slice(0, k).forEach(({ embedding, range }) => (embedding.range = range));
        cursor = match.end;
        return { node, ownText, at: 0, map: match.map };
      }
      return undefined;
    },
    finish() {
      for (const { embedding, range, end } of skipEmbedded()) {
        embedding.range = range;
        cursor = end;
      }
    },
  };
}

// `piece`'s spans read from `child`'s own text, placed in `block`'s, where `child`'s starts at `at`.
export function placeInBlock(piece: Piece, child: GuidedNavigationObject, block: GuidedNavigationObject, at: number, offPage: Range[]): void {
  piece.spans = piece.spans?.map((span) => {
    const inner = span.block ?? { node: span.node, at: 0 };
    return inner.node === child ? { ...span, block: { node: block, at: at + inner.at, offPage } } : span;
  });
}

// Where a node's own text isn't the page's, from its `embedded` children: a label or marker, or such a stretch in the text of one placed in it.
export function offPageOf(embedded: { embedding: Embedding; pieces: Piece[] }[]): Range[] {
  return embedded.flatMap(({ embedding: { child, range }, pieces }) => {
    if (!range) return [];
    if (readsOffPage(child)) return [range];
    return ownOffPageIn(pieces, child).map((stop) => ({ start: range.start + stop.start, end: range.start + stop.end }));
  });
}

// `node`'s stretches that aren't the page's, as the spans of its pieces carry them.
function ownOffPageIn(pieces: Piece[], node: GuidedNavigationObject): Range[] {
  for (const span of pieces.flatMap((piece) => piece.spans ?? [])) {
    if (span.node === node && !span.block) return span.offPage ?? [];
    if (span.block?.node === node) return span.block.offPage;
  }
  return [];
}

// Gives the spans read from `node`'s own text where it isn't the page's.
export function markOffPage(pieces: Piece[], node: GuidedNavigationObject, offPage: Range[]): void {
  if (offPage.length === 0) return;
  for (const piece of pieces) piece.spans = piece.spans?.map((span) => (span.node === node ? { ...span, offPage } : span));
}

// The stretch of own text that `spans` were placed on, if any.
export function ownRange(spans: (SourceSpan | undefined)[]): { start: number; end: number } | undefined {
  let start = Infinity;
  let end = -1;
  for (const span of spans) {
    if (!span || !isText(span)) continue;
    for (const position of span.map) {
      if (position < 0) continue;
      if (position < start) start = position;
      if (position + 1 > end) end = position + 1;
    }
  }
  return end === -1 ? undefined : { start, end };
}

// Places each of `pieces`, read in order out of `node`'s own text.
export function placeInOwnText(pieces: Piece[], node: GuidedNavigationObject, ctx: WalkContext): void {
  const aligner = ownTextAligner(node);
  for (const piece of pieces) {
    const span = aligner.place(pieceText(piece, ctx));
    if (span) setSpans(piece, [span]);
  }
}

// A span's stretches of its own text, split where a dropped character or unspoken own text lies between.
function ownRuns(span: TextSpan): { start: number; end: number }[] {
  // Empty own text (e.g. an empty cell read with its header) still marks real content, unlike an announcement.
  if (span.ownText === "") return [{ start: 0, end: 0 }];
  const runs: { start: number; end: number }[] = [];
  let previous = -1;
  span.map.forEach((position, i) => {
    if (position < 0) return;
    const run = runs[runs.length - 1];
    const joins = run && span.ownText.slice(run.end, position).trim() === "" && span.map.slice(previous + 1, i).every((between) => between === SPACE);
    if (joins) run.end = position + 1;
    else runs.push({ start: position, end: position + 1 });
    previous = i;
  });
  return runs;
}

// Where a span's own text is quoted: in its block's text when the block takes the same textref, else in its own.
function quotePlace(span: SourceSpan, nodeRef: ResolvedRef, ctx: WalkContext): QuotePlace {
  const { block } = span;
  const quoted = isText(span) && span.quotedOnly;
  if (block && !nodeRef.own && !quoted && resolveNodeLocate(block.node, ctx.ancestorChains)?.owner === nodeRef.owner) {
    return { node: block.node, text: plainTextOf(block.node), at: block.at, offPage: block.offPage };
  }
  return { node: span.node, text: isText(span) ? span.ownText : plainTextOf(span.node), at: 0, offPage: span.offPage ?? [] };
}

type ResolvedRef = NonNullable<ReturnType<typeof resolveNodeLocate>>;

// The page's text from the first run to the last, when all are in one place: bare when that's all of the textref's
// element's text, else quoted, unless a label or marker within makes it differ from the page.
function spannedLocate(located: { span: SourceSpan; place: QuotePlace; nodeRef: ResolvedRef; start: number; end: number }[]): LocatorOptions | undefined {
  const [{ place, nodeRef }] = located;
  if (located.some((run) => run.place.node !== place.node || isAriaSubstituted(run.span.node))) return undefined;
  const start = Math.min(...located.map((run) => run.place.at + run.start));
  const end = Math.max(...located.map((run) => run.place.at + run.end));
  const ownText = located.every((run) => !isText(run.span) || !run.span.quotedOnly);
  if (ownText && place.node === nodeRef.owner && start === 0 && end === place.text.length) return nodeRef.ref;
  if (place.offPage.some((stop) => stop.start < end && stop.end > start)) return undefined;
  return quoteLocate(nodeRef.ref, place, start, end);
}

export interface Offsets {
  offsets: UtteranceOffset[];
  // The locate of all the text the offsets read, when it's one stretch on the page.
  spanned?: LocatorOptions;
}

// An utterance's `offsets`: one per stretch of a node's own text it speaks.
export function buildOffsets(utterance: Piece, ctx: WalkContext): Offsets {
  type Run = { span: SourceSpan; nodeRef?: ResolvedRef; place?: QuotePlace; start: number; end: number };
  type Located = Run & { nodeRef: ResolvedRef; place: QuotePlace };
  const spans = spansOf(utterance, ctx);
  const runsBySpan = spans.map((span): Run[] => {
    const nodeRef = resolveNodeLocate(span.node, ctx.ancestorChains);
    const place = nodeRef && quotePlace(span, nodeRef, ctx);
    return isText(span) ? ownRuns(span).map((run) => ({ span, nodeRef, place, ...run })) : [{ span, nodeRef, place, start: span.start, end: span.end }];
  });
  const located = runsBySpan.flat().filter((run): run is Located => !!run.nodeRef);
  const text = pieceText(utterance, ctx);
  const only = located.length === 1 ? located[0].span : undefined;
  const speaksAll = !!only && isText(only) && only.at === 0 && only.map.length === text.length && !only.map.includes(DROPPED);
  const chars: PageChar[] = Array.from({ length: text.length }, () => ({ offset: -1, at: -1 }));
  const quotes = located.map(({ place, nodeRef, start, end }) => quoteLocate(nodeRef.ref, place, place.at + start, place.at + end));
  const offsets: UtteranceOffset[] = located.map(({ span, nodeRef, start, end }, k) => {
    const quote = quotes[k];
    if (!isText(span)) {
      for (let i = span.at; i < Math.min(span.at + span.length!, text.length); i++) chars[i] = { offset: k, at: -1 };
      return { start, end, locate: quote };
    }
    const substituted = isAriaSubstituted(span.node) ? substitutedBareLocate(span.node, ctx) : undefined;
    span.map.forEach((position, i) => {
      if (position >= start && position < end && span.at + i < text.length) chars[span.at + i] = { offset: k, at: substituted ? -1 : position - start };
    });
    // Bare only when the run is all the utterance speaks: next to other text, its quote is what places it in the spoken text.
    const bare = speaksAll && start === 0 && end === span.ownText.length && nodeRef.own && !span.quotedOnly;
    return { start, end, locate: substituted ?? (bare ? nodeRef.ref : quote) };
  });
  if (offsets.length > 0) {
    // SSML is measured with its spacing kept; engines report positions in `stripSsmlTags()` text.
    const collapsed = ctx.format === "ssml" ? collapseSpaces(text) : undefined;
    const spoken = collapsed ? collapsed.text : text;
    const runs = pageRuns(spans, runsBySpan, ctx);
    recordPage(offsets, { spoken, measured: text, runs, quotes, chars: collapsed ? collapsed.kept.map((i) => chars[i]) : chars });
  }
  return { offsets, spanned: located.length > 0 ? spannedLocate(located) : undefined };
}

// A reference's children are its targets, printed elsewhere: they're on this page text only if all of it is under the reference.
function printedWith(node: GuidedNavigationObject, spans: SourceSpan[], ctx: WalkContext): boolean {
  const refs = (ctx.ancestorChains.get(node) ?? []).filter((n) => nodeRoles(n).some((role) => embeddedTargetRoleSet.has(role)));
  return refs.every((ref) => spans.every((span) => span.node === ref || ctx.ancestorChains.get(span.node)?.includes(ref)));
}

// Each span's runs as read from the page, in spoken order, placed in their block's text. An alias's abbreviation is on the
// page; a label's or description's words aren't, nor a target read in place of its reference.
function pageRuns(spans: SourceSpan[], runsBySpan: Range[][], ctx: WalkContext): PageRun[] {
  const order = spans.map((_, s) => s).sort((a, b) => spans[a].at - spans[b].at);
  return order.flatMap((s): PageRun[] => {
    const span = spans[s];
    const { node } = span;
    const spokenEnd = span.at + lengthOf(span);
    if (!printedWith(node, spans, ctx) || (isText(span) && span.quotedOnly)) return [{ offPage: true, spokenEnd }];
    const { node: block, at } = span.block ?? { node, at: 0 };
    const blockText = block === node && isText(span) ? span.ownText : plainTextOf(block);
    // A label is read in place of its element's text, which is cut out of its block's.
    if (isAriaSubstituted(node)) return [{ offPage: true, spokenEnd, ...(span.block && { block, start: at, end: at + plainTextOf(node).length }) }];
    if (!isText(span)) return [{ block, blockText, start: at + span.start, end: at + span.end, spokenStart: span.at, spokenEnd }];
    return runsBySpan[s].flatMap(({ start, end }): PageRun[] => {
      const spoken = span.map.flatMap((position, i) => (position >= start && position < end ? [span.at + i] : []));
      if (spoken.length === 0) return [];
      return [{ block, blockText, start: at + start, end: at + end, spokenStart: spoken[0], spokenEnd: spoken[spoken.length - 1] + 1 }];
    });
  });
}
