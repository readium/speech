import { ReadiumSpeechVoice, TGender, TQuality, TSource } from '../voices/types';
/**
 * Options for filtering voices
 */
interface VoiceFilterOptions {
    languages?: string | string[];
    source?: TSource;
    gender?: TGender;
    quality?: TQuality | TQuality[];
    offlineOnly?: boolean;
    provider?: string;
    excludeNovelty?: boolean;
    excludeVeryLowQuality?: boolean;
}
/**
 * Language/Region information with voice count
 */
interface LanguageInfo {
    code: string;
    label: string;
    count: number;
}
/**
 * Grouped voices
 */
interface VoiceGroup {
    [key: string]: ReadiumSpeechVoice[];
}
/**
 * Grouping criteria for voices
 */
type GroupBy = "languages" | "gender" | "quality" | "region";
/**
 * Manages Web Speech API voices with enhanced functionality
 */
export declare class WebSpeechVoiceManager {
    private static instance;
    private static initializationPromise;
    private systemLocale;
    private voices;
    private browserVoices;
    private isInitialized;
    private constructor();
    /**
     * Initialize the voice manager
     * @param options Configuration options for voice loading
     * @param options.maxTime Maximum time in milliseconds to wait for voices to load (passed to getBrowserVoices)
     * @param options.interval Interval in milliseconds between voice loading checks (passed to getBrowserVoices)
     * @returns Promise that resolves with the WebSpeechVoiceManager instance
     */
    static initialize(maxTimeout?: number, interval?: number): Promise<WebSpeechVoiceManager>;
    /**
     * Extract language and region from BCP47 language tag
     * @param lang - The BCP47 language tag (e.g., "en-US", "zh-CN")
     * @returns A tuple of [language, region] where language is lowercase and region is UPPERCASE
     */
    static extractLangRegionFromBCP47(lang: string): [string, string | undefined];
    /**
     * Get display name for a language code
     * @private
     */
    private static getLanguageDisplayName;
    /**
     * Clean voice name by removing specific formatting
     * @private
     */
    private cleanVoiceName;
    /**
     * Normalize voice name for comparison by removing common variations
     * @private
     */
    private normalizeVoiceName;
    /**
     * Count occurrences of each voice based on language and normalized name
     * @private
     */
    private countVoiceDuplicates;
    /**
     * Updates the system locale based on available voices by detecting quality indicators.
     * The method extracts voice names and attempts to find a matching locale with both
     * high and normal quality indicators. If found, updates the systemLocale property.
     *
     * @param voices - Array of SpeechSynthesisVoice objects to analyze for locale detection
     * @returns void - Updates the systemLocale property if a matching locale is found
     */
    private updateSystemLocale;
    /**
     * Infer voice quality based on package, platform, JSON, or duplicate count
     * Returns null if quality cannot be determined
     * @private
     */
    private inferVoiceQuality;
    /**
     * Find matching JSON voice by name or alternative names
     * @private
     */
    private findMatchingJsonVoice;
    /**
     * Remove duplicate voices, keeping the highest quality version of each voice
     * @param voices Array of voices to remove duplicates from
     * @returns Filtered array with duplicates removed, keeping only the highest quality versions
     */
    private removeDuplicate;
    /**
     * Get test utterance for a given language
     * @param language - Language code (e.g., "en", "fr", "es")
     * @returns Promise that resolves to the test utterance text
     */
    getTestUtterance(language: string): string;
    /**
     * Get all voices matching the filter criteria
     * @returns Promise that resolves to an array of filtered voices
     */
    getVoices(options?: VoiceFilterOptions): ReadiumSpeechVoice[];
    /**
     * Get available languages with voice counts
     * @param localization Optional BCP 47 language tag to use for language names
     * @param filterOptions Optional filters to apply to voices before counting languages
     */
    getLanguages(localization?: string, filterOptions?: VoiceFilterOptions): LanguageInfo[];
    /**
     * Get available regions with voice counts
     */
    getRegions(localization?: string): LanguageInfo[];
    /**
     * Get the default voice for language preferences
     * @param languages Array of preferred languages in order of preference, or a single language string
     * @param voices Optional pre-filtered voices array to use instead of fetching voices
     * @returns The default voice for the language, or null if no voices are available
     */
    getDefaultVoice(languages: string | string[], voices?: ReadiumSpeechVoice[]): ReadiumSpeechVoice | null;
    getBrowserVoices(maxTimeout?: number, interval?: number): Promise<SpeechSynthesisVoice[]>;
    /**
     * Convert SpeechSynthesisVoice array to ReadiumSpeechVoice array
     * @private
     */
    private parseToReadiumSpeechVoices;
    /**
     * Convert an ReadiumSpeechVoice to a native SpeechSynthesisVoice
     */
    convertToSpeechSynthesisVoice(voice: ReadiumSpeechVoice): SpeechSynthesisVoice | undefined;
    /**
     * Filter voices based on the provided options
     */
    filterVoices(voices: ReadiumSpeechVoice[], options: VoiceFilterOptions): ReadiumSpeechVoice[];
    /**
     * Filter out novelty voices
     * @param voices Array of voices to filter
     * @returns Filtered array with novelty voices removed
     */
    filterOutNoveltyVoices(voices: ReadiumSpeechVoice[]): ReadiumSpeechVoice[];
    /**
     * Filter out very low quality voices
     * @param voices Array of voices to filter
     * @returns Filtered array with very low quality voices removed
     */
    filterOutVeryLowQualityVoices(voices: ReadiumSpeechVoice[]): ReadiumSpeechVoice[];
    /**
   * Get the numeric value for a quality level
   * @param quality Quality level
   * @returns Numeric value (higher = better quality, 0 for undefined/null)
   */
    private static getQualityValue;
    /**
     * Sort two voices by quality, using JSON order as fallback for undefined/null quality
     * @param a First voice
     * @param b Second voice
     * @param jsonOrderMaps Optional map of language codes to voice order maps
     * @param baseLang Base language code to use for looking up the order map
     * @returns Comparison result (-1, 0, or 1)
     */
    private static sortByQuality;
    /**
     * Sort voices by quality, respecting JSON name order, then alphabetically for undefined/null quality
     * @param voices Array of voices to sort
     * @returns Sorted array of voices
     */
    sortVoicesByQuality(voices: ReadiumSpeechVoice[]): ReadiumSpeechVoice[];
    /**
    * Group voices by language based on processed preferred languages
    */
    private static groupVoicesByLanguage;
    /**
     * Sort regions by default then alphabetically, sort voices by quality
     */
    private static sortByDefaultRegion;
    /**
     * Sort voices alphabetically by language, then region, then quality
     */
    private static sortAlphabetically;
    /**
     * Sort voices by language preference, then alphabetically
     * @param voices Array of voices to sort
     * @param preferredLanguages Array of preferred language codes in order of preference
     * @returns Sorted array of voices
     */
    sortVoicesByLanguages(voices: ReadiumSpeechVoice[], preferredLanguages?: string[]): ReadiumSpeechVoice[];
    /**
     * Sort languages by region preference, then voices by quality
     */
    private static sortByPreferredRegion;
    /**
     * Sort voices by region preference, then alphabetically
     * @param voices Array of voices to sort
     * @param preferredLanguages Array of preferred language codes in order of preference
     * @returns Sorted array of voices
     */
    sortVoicesByRegions(voices: ReadiumSpeechVoice[], preferredLanguages: string[]): ReadiumSpeechVoice[];
    /**
     * Group voices by the specified criteria
     * @param voices Array of voices to group
     * @param options Grouping options
     * @returns Object with voice groups keyed by the grouping criteria
     */
    groupVoices(voices: ReadiumSpeechVoice[], by: GroupBy): VoiceGroup;
}
export {};
