import type { LocatorOptions } from "../decorator/createLocator.js";
import type { ReadiumSpeechUtterance, UtteranceOffset } from "../utterance.js";
import { stripSsmlTags, substitutedIndexToSourceIndex } from "./text.js";

// Boundary events for one utterance arrive in increasing charIndex order
// (word by word) — remembering the last matched piece lets a call resume
// the scan instead of rescanning every earlier piece each time.
const lastMatch = new WeakMap<ReadiumSpeechUtterance, { pieceIndex: number; cursor: number }>();

// Set by applySubstitutions() for a substituted utterance; not a public
// field, since only this module needs it.
const substitutionSources = new WeakMap<ReadiumSpeechUtterance, { plain: string; map: number[] }>();

export function recordSubstitutionSource(utterance: ReadiumSpeechUtterance, source: { plain: string; map: number[] }): void {
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
    const start = substitutedIndexToSourceIndex(sub.map, charIndex);
    const end = substitutedIndexToSourceIndex(sub.map, charIndex + charLength);
    charIndex = start;
    charLength = Math.max(0, end - start);
  }

  const offsets = utterance.offsets;
  const isSsml = !utterance.plain && !!utterance.ssml;
  const outputText = sub?.plain ?? utterance.plain ?? (utterance.ssml ? stripSsmlTags(utterance.ssml) : "");
  if (!offsets?.length || !outputText) return undefined;

  // Only resumable when charIndex hasn't moved backward past the cached
  // piece's start — otherwise fall back to a full scan from the top.
  const cached = lastMatch.get(utterance);
  const resumable = cached !== undefined && charIndex >= cached.cursor;
  let cursor = resumable ? cached.cursor : 0;

  const quoteOf = (offset: UtteranceOffset): string | undefined => {
    const raw = offset.locate.text?.highlight;
    return raw && (isSsml ? stripSsmlTags(raw) : raw);
  };

  for (let i = resumable ? cached.pieceIndex : 0; i < offsets.length; i++) {
    const offset = offsets[i];
    // Its spoken text isn't its quote, so it runs up to wherever the next quoted piece is found past its own length.
    if (nonQuotableLocates.has(offset.locate)) {
      const nextQuote = offsets.slice(i + 1).find((next) => !nonQuotableLocates.has(next.locate) && quoteOf(next));
      const quote = nextQuote && quoteOf(nextQuote)!;
      const pastOwnLength = quote ? outputText.indexOf(quote, cursor + offset.end - offset.start) : -1;
      const nextStart = quote && pastOwnLength === -1 ? outputText.indexOf(quote, cursor) : pastOwnLength;
      const end = nextStart === -1 ? outputText.length : nextStart;
      if (charIndex >= cursor && charIndex < end) return undefined;
      cursor = end;
      continue;
    }
    // No quote means this piece owns its whole node — its text is whatever remains unconsumed.
    const pieceText = quoteOf(offset) ?? outputText.slice(cursor);
    if (!pieceText) continue;
    const start = outputText.indexOf(pieceText, cursor);
    if (start === -1) continue;
    const end = start + pieceText.length;
    if (charIndex >= start && charIndex < end) {
      lastMatch.set(utterance, { pieceIndex: i, cursor });
      const localIndex = charIndex - start;
      const word = pieceText.substring(localIndex, Math.min(localIndex + charLength, pieceText.length));
      // domRange (when the piece has one) anchors the piece's whole extent, not
      // just this word — a consumer trying it before text.highlight would
      // highlight the entire piece instead of the word.
      const locate: LocatorOptions = {
        ...offset.locate,
        domRange: undefined,
        text: {
          highlight: word,
          before: pieceText.substring(0, localIndex),
          after: pieceText.substring(localIndex + word.length),
        },
      };
      return { locate, word };
    }
    cursor = end;
  }
  return undefined;
}
