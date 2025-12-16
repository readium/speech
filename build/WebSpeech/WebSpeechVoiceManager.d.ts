import { ReadiumSpeechVoice, TGender, TQuality, TSource } from '../voices/types';
/**
 * Options for filtering voices
 */
interface VoiceFilterOptions {
    language?: string | string[];
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
 * Sort order for voices
 */
type SortOrder = "asc" | "desc";
/**
 * Grouping criteria for voices
 */
type GroupBy = "language" | "gender" | "quality" | "region";
/**
 * Sort options for voices
 */
interface SortOptions {
    by: GroupBy | "name";
    order?: SortOrder;
    preferredLanguages?: string[];
}
/**
 * Manages Web Speech API voices with enhanced functionality
 */
export declare class WebSpeechVoiceManager {
    private static instance;
    private static initializationPromise;
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
     * Get the default voice for a language
     * @param language The language code to get the default voice for (e.g., "en-US")
     * @param voices Optional pre-filtered voices array to use instead of fetching voices
     * @returns The default voice for the language, or null if no voices are available
     */
    getDefaultVoice(language: string, voices?: ReadiumSpeechVoice[]): ReadiumSpeechVoice | null;
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
     * @private
     */
    private getQualityValue;
    /**
     * Sort voices by the specified criteria
     */
    sortVoices(voices: ReadiumSpeechVoice[], options: SortOptions): ReadiumSpeechVoice[];
    /**
     * Group voices by the specified criteria
     * @param voices Array of voices to group
     * @param options Grouping options
     * @returns Object with voice groups keyed by the grouping criteria
     */
    groupVoices(voices: ReadiumSpeechVoice[], by: GroupBy): VoiceGroup;
}
export {};
