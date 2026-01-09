import { ReadiumSpeechVoice } from './types';
export interface LanguageWithRegions {
    baseLang: string;
    regions: string[];
}
export declare const chineseVariantMap: {
    [key: string]: string;
};
/**
 * Get all voices for a specific language
 * @param {string} lang - Language code (e.g., "en", "fr", "zh-CN")
 * @returns {ReadiumSpeechVoice[]} Array of voices for the specified language
 */
export declare const getVoices: (lang: string) => ReadiumSpeechVoice[];
/**
 * Get all available language codes
 * @returns {string[]} Array of available language codes
 */
export declare const getAvailableLanguages: () => string[];
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
