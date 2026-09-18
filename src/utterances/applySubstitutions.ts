import type { ReadiumSpeechUtterance } from "../utterance.js";
import { recordSubstitutionSource } from "./boundaryLocate.js";
import { stripSsmlTags, substituteSsmlText, substituteWithMap } from "./text.js";
import type { WalkContext } from "./walkContext.js";

// Final pass, run once offsets/locate are already finalized: rewrites each
// utterance's plain/ssml per `ctx.substitutions`.
export function applySubstitutions(utterances: ReadiumSpeechUtterance[], ctx: WalkContext): ReadiumSpeechUtterance[] {
  if (Object.keys(ctx.substitutions).length === 0) return utterances;
  return utterances.map((utterance) => {
    // Must match resolveBoundaryLocate()'s own outputText fallback (stripSsmlTags, not plainOf).
    const originalPlain = utterance.plain ?? (utterance.ssml ? stripSsmlTags(utterance.ssml) : undefined);
    if (!originalPlain) return utterance;

    const { text: substitutedPlain, map } = substituteWithMap(originalPlain, ctx.substitutions);
    if (substitutedPlain === originalPlain) return utterance;

    const next = utterance.ssml
      ? { ...utterance, ssml: substituteSsmlText(utterance.ssml, ctx.substitutions) }
      : { ...utterance, plain: substitutedPlain };
    recordSubstitutionSource(next, { plain: originalPlain, map });
    return next;
  });
}
