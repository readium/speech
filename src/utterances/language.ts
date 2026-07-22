// Removes `<lang xml:lang="...">...</lang>` wrapping from an SSML string,
// keeping the inner text merged into the surrounding flow — for the
// `language: "block-level"`/`"none"` extraction options, which ignore a
// node's own inline language spans (only `"always"`, or the default, honors them).
const LANG_TAG_RE = /<lang xml:lang="[^"]*">([\s\S]*?)<\/lang>/g;

export function stripLangTags(ssml: string): string {
  return ssml.replace(LANG_TAG_RE, "$1");
}
