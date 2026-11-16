import type { GuidedNavigationObject } from "@readium/shared";
import { isAriaSubstituted } from "@readium/guided-navigation";
import type { LocatorOptions } from "../decorator/createLocator.js";
import type { ReadiumSpeechUtterance, UtteranceOffset } from "../utterance.js";
import { resolveNodeLocate, subLocateFor } from "./locate.js";
import { pieceText, substitutedBareLocate } from "./mergeUtterances.js";
import { recordAliasOffset } from "./boundaryLocate.js";
import { plainTextOf } from "./tableStructure.js";
import type { WalkContext } from "./walkContext.js";

// In a span's `map`: a spoken space, and a spoken character its node's own text dropped (e.g. a bracket).
const SPACE = -1;
const DROPPED = -2;

// Where a stretch of an utterance's plain text, from `at`, comes from in `node`'s own text.
export type SourceSpan = TextSpan | AliasSpan;

interface TextSpan {
  node: GuidedNavigationObject;
  ownText: string;
  at: number;
  // The own-text position of each character spoken from `at`, or SPACE/DROPPED.
  map: number[];
  // Taken from text other than the node's own (a caption's description), so never located bare.
  quotedOnly?: boolean;
}

// Spoken text that isn't on the page, located on `[start, end)` of the own text, and never cut.
interface AliasSpan {
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
export function spansOf(utterance: ReadiumSpeechUtterance, ctx: WalkContext): SourceSpan[] {
  const spans = ctx.spans.get(utterance) ?? [];
  return spans.map((span) => (isText(span) || span.length !== undefined ? span : { ...span, length: pieceText(utterance, ctx).length }));
}

export function setSpans(utterance: ReadiumSpeechUtterance, spans: SourceSpan[], ctx: WalkContext): void {
  if (spans.length > 0) ctx.spans.set(utterance, spans);
}

export function setAliasSpan(piece: ReadiumSpeechUtterance, node: GuidedNavigationObject, range: { start: number; end: number }, alias: LocatorOptions, ctx: WalkContext): void {
  setSpans(piece, [{ node, at: 0, alias, ...range }], ctx);
}

// `ownText` spoken whole from `at` in the utterance: e.g. a cell's value in its header's announcement.
export function setQuotedSpan(utterance: ReadiumSpeechUtterance, node: GuidedNavigationObject, ownText: string, at: number, ctx: WalkContext): void {
  const span: TextSpan = { node, ownText, at, map: Array.from({ length: ownText.length }, (_, k) => k) };
  if (ownText !== plainTextOf(node)) span.quotedOnly = true;
  setSpans(utterance, [span], ctx);
}

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
export function joinedSpans(pieces: ReadiumSpeechUtterance[], ranges: { start: number; end: number }[], ctx: WalkContext): SourceSpan[] {
  return pieces.flatMap((piece, k) =>
    sliceSpans(spansOf(piece, ctx), 0, ranges[k].end - ranges[k].start).map((span) => ({ ...span, at: span.at + ranges[k].start })),
  );
}

const isSpace = (char: string) => /\s/.test(char);
const isDroppable = (char: string) => /[\p{Ps}\p{Pe}\p{Pi}\p{Pf}"']/u.test(char);

// Places, in order, the texts read out of `node`'s own text, skipping whitespace and the brackets it drops.
// Between them, only an embedded child's own text may be skipped, where the node's text holds it (e.g. a link's words).
export interface OwnTextAligner {
  place(text: string): TextSpan | undefined;
  embed(childText: string): void;
}

export function ownTextAligner(node: GuidedNavigationObject): OwnTextAligner {
  const ownText = plainTextOf(node);
  let cursor = 0;
  let embedded: string[] = [];
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
  return {
    embed(childText) {
      embedded.push(childText);
    },
    place(text) {
      // Right after the children's text the node holds, else before it, in case a child's text isn't there but reads the same.
      const starts = [cursor];
      for (const childText of embedded) {
        const skipped = matchFrom(childText, starts[starts.length - 1]);
        if (skipped) starts.push(skipped.end);
      }
      embedded = [];
      for (let k = starts.length - 1; k >= 0; k--) {
        const match = matchFrom(text, starts[k]);
        if (!match) continue;
        cursor = match.end;
        return { node, ownText, at: 0, map: match.map };
      }
      return undefined;
    },
  };
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
export function placeInOwnText(pieces: ReadiumSpeechUtterance[], node: GuidedNavigationObject, ctx: WalkContext): void {
  const aligner = ownTextAligner(node);
  for (const piece of pieces) {
    const span = aligner.place(pieceText(piece, ctx));
    if (span) setSpans(piece, [span], ctx);
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

// Bare only when the run is all the utterance speaks: next to other text, its quote is what places it in the spoken text.
function runLocate(span: TextSpan, start: number, end: number, nodeRef: NonNullable<ReturnType<typeof resolveNodeLocate>>, speaksAll: boolean): LocatorOptions {
  if (speaksAll && start === 0 && end === span.ownText.length && nodeRef.own && !span.quotedOnly) return nodeRef.ref;
  const locate = subLocateFor(nodeRef.ref, span.ownText.slice(start, end));
  if (start > 0) locate.text = { ...locate.text, before: span.ownText.slice(0, start) };
  if (end < span.ownText.length) locate.text = { ...locate.text, after: span.ownText.slice(end) };
  return locate;
}

// An utterance's `offsets`: one per stretch of a node's own text it speaks.
export function buildOffsets(utterance: ReadiumSpeechUtterance, ctx: WalkContext): UtteranceOffset[] {
  type Located = { span: SourceSpan; nodeRef: NonNullable<ReturnType<typeof resolveNodeLocate>>; start: number; end: number };
  const located = spansOf(utterance, ctx).flatMap((span): Located[] => {
    const nodeRef = resolveNodeLocate(span.node, ctx.ancestorChains);
    if (!nodeRef) return [];
    return isText(span) ? ownRuns(span).map((run) => ({ span, nodeRef, ...run })) : [{ span, nodeRef, start: span.start, end: span.end }];
  });
  const only = located.length === 1 ? located[0].span : undefined;
  const speaksAll = !!only && isText(only) && only.at === 0 && only.map.length === pieceText(utterance, ctx).length && !only.map.includes(DROPPED);
  return located.map(({ span, nodeRef, start, end }) => {
    if (!isText(span)) {
      const offset = { start, end, locate: span.alias };
      recordAliasOffset(offset, span.length!);
      return offset;
    }
    const substituted = isAriaSubstituted(span.node) ? substitutedBareLocate(span.node, ctx) : undefined;
    return { start, end, locate: substituted ?? runLocate(span, start, end, nodeRef, speaksAll) };
  });
}
