import type { LocatorOptions } from "../decorator/createLocator.js";
import type { ReadiumSpeechUtterance, UtteranceOffset } from "../utterance.js";
import { toSourcePosition, type Replacement } from "./text.js";
import { stripSsmlTags } from "./plainText.js";

// TODO: consolidate this module's lookups and utteranceLocate.ts's `pageTexts` into one per-utterance record of
// where each spoken character sits on the page, read directly instead of quote-searching the spoken text.

// Boundary events for one utterance arrive in increasing charIndex order
// (word by word) — remembering the last matched piece lets a call resume
// the scan instead of rescanning every earlier piece each time.
const lastMatch = new WeakMap<ReadiumSpeechUtterance, { pieceIndex: number; cursor: number }>();

// Set by applySubstitutions() for a substituted utterance; not a public
// field, since only this module needs it.
type SubstitutionSource = { plain: string; replacements: Replacement[] };

const substitutionSources = new WeakMap<ReadiumSpeechUtterance, SubstitutionSource>();

export function recordSubstitutionSource(utterance: ReadiumSpeechUtterance, source: SubstitutionSource): void {
  substitutionSources.set(utterance, source);
}

// A locate built for aria-substituted text (see @readium/guided-navigation's
// object.ts) has nothing real in the DOM to slice per-word quotes from —
// resolveBoundaryLocate() skips word matching for it entirely rather than
// quote-searching garbage.
const nonQuotableLocates = new WeakSet<LocatorOptions>();

export function markNonQuotable<T extends LocatorOptions>(locate: T): T {
  nonQuotableLocates.add(locate);
  return locate;
}

// An alias offset spans its abbreviation in the node's own text, so its spoken length is kept here.
const aliasSpokenLengths = new WeakMap<UtteranceOffset, number>();

export function recordAliasOffset(offset: UtteranceOffset, spokenLength: number): void {
  aliasSpokenLengths.set(offset, spokenLength);
}

// Quotes are page text, which may space words otherwise than speech (e.g. a no-break space); one for one, so positions hold.
const spaced = (text: string) => text.replace(/\s/g, " ");

// charIndex is the engine's own runtime position, unknowable when `offsets`
// was built — resolved by scanning pieces in order from where the last ended.
// charIndex is always plain-text space (see ssmlIndexToPlainIndex), so SSML
// utterances are matched against their tag-stripped text, not the raw markup.
export function resolveBoundaryLocate(
  utterance: ReadiumSpeechUtterance,
  charIndex: number,
  charLength: number,
): { locate: LocatorOptions; word: string } | undefined {
  // A substituted utterance's charIndex arrives in substituted-text space; translate back before matching.
  const sub = substitutionSources.get(utterance);
  if (sub) {
    const start = toSourcePosition(sub.replacements, charIndex, "start");
    const end = charLength > 0 ? toSourcePosition(sub.replacements, charIndex + charLength, "end") : start;
    charIndex = start;
    charLength = Math.max(0, end - start);
  }

  const offsets = utterance.offsets;
  const isSsml = !utterance.plain && !!utterance.ssml;
  const rawOutputText = sub?.plain ?? utterance.plain ?? (utterance.ssml ? stripSsmlTags(utterance.ssml) : "");
  const outputText = spaced(rawOutputText);
  if (!offsets?.length || !outputText) return undefined;

  // Only resumable when charIndex hasn't moved backward past the cached
  // piece's start — otherwise fall back to a full scan from the top.
  const cached = lastMatch.get(utterance);
  const resumable = cached !== undefined && charIndex >= cached.cursor;
  let cursor = resumable ? cached.cursor : 0;

  const rawQuoteOf = (offset: UtteranceOffset): string | undefined => {
    const raw = offset.locate.text?.highlight;
    return raw && (isSsml ? stripSsmlTags(raw) : raw);
  };
  const quoteOf = (offset: UtteranceOffset): string | undefined => {
    const raw = rawQuoteOf(offset);
    return raw && spaced(raw);
  };

  for (let i = resumable ? cached.pieceIndex : 0; i < offsets.length; i++) {
    const offset = offsets[i];
    // Its spoken text isn't its quote, so it runs up to wherever the next quoted piece is found past its own length.
    if (nonQuotableLocates.has(offset.locate)) {
      const spokenLength = aliasSpokenLengths.get(offset);
      const nextQuote = offsets.slice(i + 1).find((next) => !nonQuotableLocates.has(next.locate) && quoteOf(next));
      const quote = nextQuote && quoteOf(nextQuote)!;
      const pastOwnLength = quote ? outputText.indexOf(quote, cursor + (spokenLength ?? offset.end - offset.start)) : -1;
      const nextStart = quote && pastOwnLength === -1 ? outputText.indexOf(quote, cursor) : pastOwnLength;
      // An alias right before another non-quotable piece ends at its own length, as no quote separates them.
      const next = offsets[i + 1];
      const ownStart = cursor + /^\s*/.exec(outputText.slice(cursor))![0].length;
      const end = spokenLength !== undefined && next && nonQuotableLocates.has(next.locate)
        ? ownStart + spokenLength
        : nextStart === -1 ? outputText.length : nextStart;
      if (charIndex >= cursor && charIndex < end) {
        // An alias's words aren't on the page, so they highlight its whole abbreviation.
        if (spokenLength === undefined) return undefined;
        lastMatch.set(utterance, { pieceIndex: i, cursor });
        return { locate: offset.locate, word: rawOutputText.substring(charIndex, Math.min(charIndex + charLength, end)) };
      }
      cursor = end;
      continue;
    }
    // No quote means this piece owns its whole node — its text is whatever remains unconsumed.
    const pieceText = quoteOf(offset) ?? outputText.slice(cursor);
    const rawPieceText = rawQuoteOf(offset) ?? rawOutputText.slice(cursor);
    if (!pieceText) continue;
    const start = outputText.indexOf(pieceText, cursor);
    if (start === -1) continue;
    const end = start + pieceText.length;
    if (charIndex >= start && charIndex < end) {
      lastMatch.set(utterance, { pieceIndex: i, cursor });
      const localIndex = charIndex - start;
      // Matched spaced, but sliced from the raw text so the strings equal the page's.
      const word = rawPieceText.substring(localIndex, Math.min(localIndex + charLength, rawPieceText.length));
      // domRange (when the piece has one) anchors the piece's whole extent, not
      // just this word — a consumer trying it before text.highlight would
      // highlight the entire piece instead of the word.
      const locate: LocatorOptions = {
        ...offset.locate,
        domRange: undefined,
        text: {
          highlight: word,
          before: rawPieceText.substring(0, localIndex),
          after: rawPieceText.substring(localIndex + word.length),
        },
      };
      return { locate, word };
    }
    cursor = end;
  }
  return undefined;
}
