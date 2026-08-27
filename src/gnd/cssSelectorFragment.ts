// WICG scroll-to-text-fragment's CSS Selector Directive proposal —
// https://github.com/WICG/scroll-to-text-fragment/blob/main/EXTENSIONS.md
// No browser resolves this natively; we decode it ourselves, so this is
// used purely as a stable, citable encoding, not a runtime dependency on
// browser support.
const PREFIX = "#:~:selector(type=CssSelector,value=";
const SUFFIX = ")";

export function encodeCssSelectorFragment(selector: string): string {
  return `${PREFIX}${encodeURIComponent(selector)}${SUFFIX}`;
}

export function decodeCssSelectorFragment(textref: string | undefined): string | undefined {
  if (!textref || !textref.startsWith(PREFIX) || !textref.endsWith(SUFFIX)) return undefined;
  return decodeURIComponent(textref.slice(PREFIX.length, -SUFFIX.length));
}
