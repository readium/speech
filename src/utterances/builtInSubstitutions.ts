import type { SubstitutionRule, SubstitutionTable } from "./types.js";

// A digit run directly followed by "u<unit>" is unambiguous enough to convert
// to the micro-prefixed SI symbol, same reasoning as `deg`/`x` below.
function microUnit(unit: string): SubstitutionRule {
  return { pattern: new RegExp(`(\\d+)\\s?u${unit}\\b`, "g"), replace: (_m: string, digits: string) => `${digits}µ${unit}` };
}

// The complete closed set of precomposed Unicode vulgar fractions (legacy
// Latin-1 + Number Forms block) — nothing further to add here, ever.
const vulgarFractions: SubstitutionTable = {
  "1/4": "¼", "1/2": "½", "3/4": "¾",
  "1/7": "⅐", "1/9": "⅑", "1/10": "⅒", "1/3": "⅓", "2/3": "⅔",
  "1/5": "⅕", "2/5": "⅖", "3/5": "⅗", "4/5": "⅘",
  "1/6": "⅙", "5/6": "⅚", "1/8": "⅛", "3/8": "⅜", "5/8": "⅝", "7/8": "⅞",
  "0/3": "↉",
};

// Unlike the fraction set above, these are ASCII conventions, not a
// Unicode-defined dataset — a curated starting set, not a claim of completeness.
export const builtInSubstitutions: SubstitutionTable = {
  ...vulgarFractions,
  // Rejects "(c)" directly preceded by "(a)"/"(b)" (a lettered list, not a copyright notice).
  "(c)": { pattern: /(?<!\([ab]\)\s{0,3})\(c\)/g, replace: "©" },
  "(C)": { pattern: /(?<!\([AB]\)\s{0,3})\(C\)/g, replace: "©" },
  "(r)": "®",
  "(R)": "®",
  "(tm)": "™",
  "(TM)": "™",
  deg: { pattern: /(\d+)\s?deg\b/g, replace: (_m: string, digits: string) => `${digits}°` },
  x: { pattern: /(\d+)\s?[xX]\s?(?=\d)/g, replace: (_m: string, digits: string) => `${digits}×` },
  ug: microUnit("g"),
  um: microUnit("m"),
  us: microUnit("s"),
  uL: microUnit("L"),
  uF: microUnit("F"),
  uA: microUnit("A"),
  uV: microUnit("V"),
  uW: microUnit("W"),
  uN: microUnit("N"),
  umol: microUnit("mol"),
  "->": "→",
  "<-": "←",
  // Reversed from every other entry: engines pattern-match the ASCII foot/inch
  // convention for pronunciation, but drop the real prime marks silently.
  "′": "'",
  "″": '"',
};
