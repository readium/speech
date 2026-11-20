import type { ReadiumSpeechUtterance } from "../utterance.js";
import { pageRecordOf } from "./pageRecord.js";
import { substitutePlainText, substituteSsmlText } from "./text.js";
import type { WalkContext } from "./walkContext.js";

// Final pass, run once offsets/locate are already finalized: rewrites each
// utterance's plain/ssml per `ctx.substitutions`.
export function applySubstitutions(utterances: ReadiumSpeechUtterance[], ctx: WalkContext): ReadiumSpeechUtterance[] {
  if (Object.keys(ctx.substitutions).length === 0) return utterances;
  return utterances.map((utterance) => {
    if (utterance.ssml) {
      const { ssml, replacements } = substituteSsmlText(utterance.ssml, ctx.substitutions);
      if (ssml === utterance.ssml) return utterance;
      const record = pageRecordOf(utterance);
      if (record) record.replacements = replacements;
      return { ...utterance, ssml };
    }

    const originalPlain = utterance.plain;
    if (!originalPlain) return utterance;
    const { text: substitutedPlain, replacements } = substitutePlainText(originalPlain, ctx.substitutions);
    if (substitutedPlain === originalPlain) return utterance;
    const record = pageRecordOf(utterance);
    if (record) record.replacements = replacements;
    return { ...utterance, plain: substitutedPlain };
  });
}
