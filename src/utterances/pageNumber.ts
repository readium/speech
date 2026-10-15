const GREEK_LETTER = "[\\u0391-\\u03A9\\u03B1-\\u03C9\\u03D8-\\u03E1]";
const GREEK_KERAIA = "[\\u0374\\u02B9\\u0384']";
const HEBREW_LETTER = "[\\u05D0-\\u05EA]";
const CYRILLIC_LETTER = "[\\u0400-\\u0481\\u048A-\\u04FF]";

// Letter-based systems (Hebrew, Greek, Armenian, Cyrillic) only count with
// their numeral mark: unmarked, they can't be told apart from words.
const pageNumberPatterns: RegExp[] = [
  /^\p{Nd}+$/u,
  /^\p{Nl}+$/u,
  /^(?=[MDCLXVI])M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i,
  /^[〇零一二三四五六七八九十百千万]+$/u,
  /^[፩-፼]+$/u,
  new RegExp(`^${HEBREW_LETTER}[\\u05F3']$`, "u"),
  new RegExp(`^${HEBREW_LETTER}+[\\u05F4"]${HEBREW_LETTER}$`, "u"),
  new RegExp(`^(?:\\u0375${GREEK_LETTER})*${GREEK_LETTER}+${GREEK_KERAIA}$`, "u"),
  /^(?:[Ա-Ֆա-և]̅)+$/u,
  new RegExp(`^\\u0482?${CYRILLIC_LETTER}+\\u0483${CYRILLIC_LETTER}*$`, "u"),
];

export function isPageNumber(label: string): boolean {
  const trimmed = label.trim();
  return trimmed.length > 0 && pageNumberPatterns.some((pattern) => pattern.test(trimmed));
}
