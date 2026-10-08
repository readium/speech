/**
 * Extracts language and region from a BCP 47 language tag.
 * @param lang - The BCP 47 language tag (e.g., "en-US", "fr-CA")
 * @returns A tuple containing [language, region] where region is optional
 */
export const extractLangRegionFromBCP47 = (lang: string): [string, string | undefined] => {
  if (!lang) return ["", undefined];

  // Normalize language code by replacing underscores with dashes
  const normalizedLang = lang.replace(/_/g, "-");
  
  try {
    const locale = new Intl.Locale(normalizedLang);
    return [
      locale.language.toLowerCase(),
      locale.region?.toUpperCase()
    ];
  } catch {
    // Fallback to simple parsing if Intl.Locale fails
    const parts = normalizedLang.split("-");
    return [
      parts[0].toLowerCase(),
      parts[1]?.toUpperCase()
    ];
  }
}

/**
 * Collects the entries of a language-keyed map that apply to a BCP 47 tag:
 * the primary language subtag's entries plus the exact tag's, matched case-insensitively.
 * @param entriesByLanguage - Map keyed by language tag (e.g., { en: [...], "en-US": [...] })
 * @param lang - The BCP 47 language tag (e.g., "en-US")
 * @returns The combined entries, without duplicates, or undefined if no key matches
 */
export const entriesForLanguage = <T>(entriesByLanguage: Record<string, T[]>, lang: string): T[] | undefined => {
  const tag = lang.toLowerCase().replace(/_/g, "-");
  const [primary] = extractLangRegionFromBCP47(lang);
  let entries: Set<T> | undefined;
  for (const key of [primary, tag]) {
    for (const [candidate, values] of Object.entries(entriesByLanguage)) {
      if (candidate.toLowerCase().replace(/_/g, "-") !== key) continue;
      entries ??= new Set<T>();
      values.forEach((value) => entries!.add(value));
    }
  }
  return entries && [...entries];
}
