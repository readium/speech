/**
 * Extracts language and region from a BCP 47 language tag.
 * @param lang - The BCP 47 language tag (e.g., "en-US", "fr-CA")
 * @returns A tuple containing [language, region] where region is optional
 */
export declare const extractLangRegionFromBCP47: (lang: string) => [string, string | undefined];
/**
 * Collects the entries of a language-keyed map that apply to a BCP 47 tag:
 * the primary language subtag's entries plus the exact tag's, matched case-insensitively.
 * @param entriesByLanguage - Map keyed by language tag (e.g., { en: [...], "en-US": [...] })
 * @param lang - The BCP 47 language tag (e.g., "en-US")
 * @returns The combined entries, without duplicates, or undefined if no key matches
 */
export declare const entriesForLanguage: <T>(entriesByLanguage: Record<string, T[]>, lang: string) => T[] | undefined;
