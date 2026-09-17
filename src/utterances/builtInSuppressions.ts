// Fills gaps in @echogarden/text-segmentation's own per-language suppression
// lists (see its Suppressions.ts) — encyclopedic/biographical abbreviations
// outside CLDR's scope, so consumers don't each have to rediscover them.
export const builtInSuppressions: Record<string, string[]> = {
  en: ["St.", "d."],
};
