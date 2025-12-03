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
