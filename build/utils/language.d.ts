/**
 * Extracts language and region from a BCP 47 language tag.
 * @param lang - The BCP 47 language tag (e.g., "en-US", "fr-CA")
 * @returns A tuple containing [language, region] where region is optional
 */
export declare const extractLangRegionFromBCP47: (lang: string) => [string, string | undefined];
