import { ReadiumSpeechJSONVoice } from './types';
export interface LanguageWithRegions {
    baseLang: string;
    regions: string[];
}
export declare const chineseVariantMap: {
    [key: string]: string;
};
/**
 * Normalizes language code with special handling for Chinese variants
 * @param lang - Input language code
 * @returns Normalized language code
 */
export declare const normalizeLanguageCode: (lang: string) => string;
/**
 * Get all voices for a specific language
 * @param {string} lang - Language code (e.g., "en", "fr", "zh-CN")
 * @returns {Promise<ReadiumSpeechJSONVoice[]>} Promise resolving to array of voices for the specified language
 */
export declare const getVoices: (lang: string) => Promise<ReadiumSpeechJSONVoice[]>;
/**
 * Get all available language codes
 * @returns {string[]} Array of available language codes
 */
export declare const getAvailableLanguages: () => string[];
/**
 * Get a display name for a language code (e.g. "fr" -> "French")
 * @param code - Language code
 * @param localization - Optional BCP 47 locale to display the name in
 */
export declare const getLanguageDisplayName: (code: string, localization?: string) => string;
/**
 * Get the test utterance for a language
 * @param {string} lang - Language code (e.g., "en", "fr", "zh-CN")
 * @returns {string} The test utterance or empty string if not found
 */
export declare const getTestUtterance: (lang: string) => string;
/**
 * Get the default region for a language
 * @param {string} lang - Language code (e.g., "en", "fr", "zh-CN")
 * @returns {string} The default region code or empty string if not found
 */
export declare const getDefaultRegion: (lang: string) => string;
/**
 * Process languages with region inference
 * @param languages - Array of language codes (e.g., ["fr", "en-CA"])
 * @returns Array of LanguageWithRegions objects with language and region information
 */
export declare const processLanguages: (languages: string[]) => LanguageWithRegions[];
export * from './types';
