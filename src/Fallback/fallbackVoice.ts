import { ReadiumSpeechEngineProvider } from "../provider.js";
import { ReadiumSpeechVoice } from "../voices/types.js";
import { processLanguages } from "../voices/languages.js";
import { groupVoicesByLanguage, pickBestVoiceByRegion, filterByBoundarySupport } from "../voices/sorting.js";
import { isVoiceReachable } from "../voices/reachability.js";
import { preferMatching } from "../voices/voiceMatching.js";

// The fallback provider's reachable voice closest to a failed one, in `language` or else the browser's.
// Language narrows first, gender second, boundary-support third: a same-language wrong-gender
// voice beats a different-language right-gender one, and a same-gender voice that drops
// boundary events beats one that also mismatches on boundary support. Falls back to any
// language if none matches, then to any gender within that if none matches, then to any
// boundary support within that if none matches. Region/quality ranking within the final
// candidate set is delegated to pickBestVoiceByRegion, the same ranking logic
// sortVoicesByRegions uses.
export async function pickFallbackVoice(
  fallbackProvider: ReadiumSpeechEngineProvider,
  language: string | undefined,
  gender: ReadiumSpeechVoice["gender"],
  needsBoundary: boolean
): Promise<ReadiumSpeechVoice | null> {
  const voices = (await fallbackProvider.getVoices()).filter(isVoiceReachable);
  if (voices.length === 0) return null;

  const wanted = language || (typeof navigator !== "undefined" ? navigator.language : "en");
  const [processedLang] = processLanguages([wanted]);
  const { voicesByLang } = groupVoicesByLanguage(voices, [processedLang]);
  const byLanguage = voicesByLang.get(processedLang.baseLang) ?? [];
  const languageMatches = byLanguage.length > 0 ? byLanguage : voices;

  const genderMatches = gender ? preferMatching(languageMatches, voice => voice.gender === gender) : languageMatches;

  const candidates = filterByBoundarySupport(genderMatches, needsBoundary);

  return pickBestVoiceByRegion(wanted, candidates);
}
