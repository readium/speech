/**
 * Extracts language and region from a BCP 47 language tag.
 * @param lang - The BCP 47 language tag (e.g., "en-US", "fr-CA")
 * @returns A tuple containing [language, region] where region is optional
 */
export declare const extractLangRegionFromBCP47: (lang: string) => [string, string | undefined];
/**
 * Looks up the value of a language-keyed map that applies to a BCP 47 tag:
 * the exact tag's, else the primary language subtag's, matched case-insensitively.
 * @param valuesByLanguage - Map keyed by language tag (e.g., { en: "fr", "en-GB": "de" })
 * @param lang - The BCP 47 language tag (e.g., "en-US")
 * @returns The value, or undefined if no key matches
 */
export declare const valueForLanguage: <T>(valuesByLanguage: Record<string, T>, lang: string) => T | undefined;
/**
 * Collects the entries of a language-keyed map that apply to a BCP 47 tag:
 * the primary language subtag's entries plus the exact tag's, matched case-insensitively.
 * @param entriesByLanguage - Map keyed by language tag (e.g., { en: [...], "en-US": [...] })
 * @param lang - The BCP 47 language tag (e.g., "en-US")
 * @returns The combined entries, without duplicates, or undefined if no key matches
 */
export declare const entriesForLanguage: <T>(entriesByLanguage: Record<string, T[]>, lang: string) => T[] | undefined;
