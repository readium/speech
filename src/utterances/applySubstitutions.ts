import type { ReadiumSpeechUtterance } from "../utterance.js";
import { recordSubstitutionSource } from "./boundaryLocate.js";
import { substitutePlainText, substituteSsmlText } from "./text.js";
import type { WalkContext } from "./walkContext.js";

// Final pass, run once offsets/locate are already finalized: rewrites each
// utterance's plain/ssml per `ctx.substitutions`.
export function applySubstitutions(utterances: ReadiumSpeechUtterance[], ctx: WalkContext): ReadiumSpeechUtterance[] {
  if (Object.keys(ctx.substitutions).length === 0) return utterances;
  return utterances.map((utterance) => {
    if (utterance.ssml) {
      const { ssml, plain, replacements } = substituteSsmlText(utterance.ssml, ctx.substitutions);
      if (ssml === utterance.ssml) return utterance;
      const next = { ...utterance, ssml };
      recordSubstitutionSource(next, { plain, replacements });
      return next;
    }

    const originalPlain = utterance.plain;
    if (!originalPlain) return utterance;
    const { text: substitutedPlain, replacements } = substitutePlainText(originalPlain, ctx.substitutions);
    if (substitutedPlain === originalPlain) return utterance;
    const next = { ...utterance, plain: substitutedPlain };
    recordSubstitutionSource(next, { plain: originalPlain, replacements });
    return next;
  });
}
