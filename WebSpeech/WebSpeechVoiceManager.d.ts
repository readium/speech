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
    removeDuplicates?: boolean;
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
    private scopedLanguages;
    private broadenPromises;
    private constructor();
    /**
     * Initialize voice manager, or broaden an already-initialized singleton to
     * also cover new languages. `languages` scope voice parsing to reduce
     * per-language JSON loading; omitting it on the first call loads everything,
     * but omitting it on a later call to an already-scoped instance is a no-op,
     * not a retroactive broaden-to-everything.
     * @param options Configuration options for voice loading
     * @param options.languages Optional array of preferred language codes to filter (or broaden to) voices
     * @param options.maxTimeout Maximum time in milliseconds to wait for voices to load (passed to getBrowserVoices, first call only)
     * @param options.interval Interval in milliseconds between voice loading checks (passed to getBrowserVoices, first call only)
     * @returns Promise that resolves with the WebSpeechVoiceManager instance
     */
    static initialize(options?: {
        languages?: string[];
        maxTimeout?: number;
        interval?: number;
    }): Promise<WebSpeechVoiceManager>;
    /**
     * Filter browser voices based on preferred languages
     * @private
     */
    private filterBrowserVoicesByLanguages;
    /**
     * Extract base language codes (e.g. "en", "fr") from a list of BCP47 tags
     * @private
     */
    private static toBaseLangSet;
    /**
     * Broaden an already-initialized instance to also cover the given languages,
     * reusing the already-fetched `browserVoices` (no new speechSynthesis fetch).
     * No-op if the instance is already unscoped or already covers these languages.
     * @private
     */
    private broadenLanguages;
    /**
     * Extract language and region from BCP47 language tag
     * @param lang - The BCP47 language tag (e.g., "en-US", "zh-CN")
     * @returns A tuple of [language, region] where language is lowercase and region is UPPERCASE
     */
    static extractLangRegionFromBCP47(lang: string): [string, string | undefined];
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
    private removeDuplicates;
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
     * @param voices Optional array of voices to count (defaults to this.voices)
     */
    getLanguages(localization?: string, filterOptions?: VoiceFilterOptions, voices?: ReadiumSpeechVoice[]): LanguageInfo[];
    /**
     * Get available regions with voice counts
     * @param localization Optional BCP 47 language tag to use for region names
     * @param filterOptions Optional filters to apply to voices before counting regions
     * @param voices Optional array of voices to count (defaults to this.voices)
     */
    getRegions(localization?: string, filterOptions?: VoiceFilterOptions, voices?: ReadiumSpeechVoice[]): LanguageInfo[];
    /**
     * Get the default voice for language preferences
     * @param languages Array of preferred languages in order of preference, or a single language string
     * @param voices Optional pre-filtered voices array to use instead of fetching voices
     * @returns The default voice for the language, or null if no voices are available
     */
    getDefaultVoice(languages: string | string[], voices?: ReadiumSpeechVoice[]): Promise<ReadiumSpeechVoice | null>;
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
    filterVoices(options: VoiceFilterOptions, voices?: ReadiumSpeechVoice[]): ReadiumSpeechVoice[];
    /**
     * Filter out novelty voices
     * @param voices Array of voices to filter
     * @returns Filtered array with novelty voices removed
     */
    filterOutNoveltyVoices(voices?: ReadiumSpeechVoice[]): ReadiumSpeechVoice[];
    /**
     * Filter out very low quality voices
     * @param voices Array of voices to filter
     * @returns Filtered array with very low quality voices removed
     */
    filterOutVeryLowQualityVoices(voices?: ReadiumSpeechVoice[]): ReadiumSpeechVoice[];
    /**
     * Sort voices by quality, respecting JSON name order, then alphabetically for undefined/null quality
     * @param voices Array of voices to sort
     * @returns Sorted array of voices
     */
    sortVoicesByQuality(voices?: ReadiumSpeechVoice[]): Promise<ReadiumSpeechVoice[]>;
    /**
     * Sort regions by default then alphabetically, sort voices by quality
     */
    private static sortByDefaultRegion;
    /**
     * Sort voices by language preference, then alphabetically
     * @param voices Array of voices to sort
     * @param preferredLanguages Array of preferred language codes in order of preference
     * @returns Sorted array of voices
     */
    sortVoicesByLanguages(preferredLanguages?: string[], voices?: ReadiumSpeechVoice[]): Promise<ReadiumSpeechVoice[]>;
    /**
     * Sort voices by region preference, then alphabetically
     * @param voices Array of voices to sort
     * @param preferredLanguages Array of preferred language codes in order of preference
     * @returns Sorted array of voices
     */
    sortVoicesByRegions(preferredLanguages: string[], voices?: ReadiumSpeechVoice[]): Promise<ReadiumSpeechVoice[]>;
    /**
     * Group voices by the specified criteria
     * @param voices Array of voices to group
     * @param options Grouping options
     * @returns Object with voice groups keyed by the grouping criteria
     */
    groupVoices(by: GroupBy, voices?: ReadiumSpeechVoice[]): VoiceGroup;
}
export {};
