import { ReadiumSpeechJSONVoice, ReadiumSpeechVoice, TGender, TQuality, TSource } from "../voices/types";
import { getTestUtterance, getVoices, processLanguages } from "../voices/languages";
import { 
  isNoveltyVoice, 
  isVeryLowQualityVoice, 
  filterOutNoveltyVoices, 
  filterOutVeryLowQualityVoices 
} from "../voices/filters";
import { findLocaleWithQualityIndicators, getInferredQualityFromPlatform } from "../voices/localized";
import { getInferredQualityFromPackageName } from "../voices/packages";
import { extractLangRegionFromBCP47 } from "../utils/language";

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
export class WebSpeechVoiceManager {
  private static instance: WebSpeechVoiceManager;
  private static initializationPromise: Promise<WebSpeechVoiceManager> | null = null;
  private systemLocale: string;
  private voices: ReadiumSpeechVoice[] = [];
  private browserVoices: SpeechSynthesisVoice[] = [];
  private isInitialized = false;

  private constructor() {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      throw new Error("Web Speech API is not available in this environment");
    }
    this.systemLocale = navigator.languages?.[0]?.split("-")[0] || "en";
  }

  /**
   * Initialize the voice manager
   * @param options Configuration options for voice loading
   * @param options.maxTime Maximum time in milliseconds to wait for voices to load (passed to getBrowserVoices)
   * @param options.interval Interval in milliseconds between voice loading checks (passed to getBrowserVoices)
   * @returns Promise that resolves with the WebSpeechVoiceManager instance
   */
  static async initialize(
    maxTimeout?: number,
    interval?: number
  ): Promise<WebSpeechVoiceManager> {
    // If we already have an initialized instance, return it
    if (WebSpeechVoiceManager.instance?.isInitialized) {
      return WebSpeechVoiceManager.instance;
    }

    // If initialization is in progress, return the existing promise
    if (WebSpeechVoiceManager.initializationPromise) {
      return WebSpeechVoiceManager.initializationPromise;
    }

    // Create a new instance and store the initialization promise
    WebSpeechVoiceManager.initializationPromise = (async () => {
      try {
        const instance = new WebSpeechVoiceManager();
        WebSpeechVoiceManager.instance = instance;
        
        instance.browserVoices = await instance.getBrowserVoices(maxTimeout, interval);
        instance.updateSystemLocale(instance.browserVoices);
        instance.voices = await instance.parseToReadiumSpeechVoices(instance.browserVoices);
        instance.isInitialized = true;
        
        return instance;
      } catch (error) {
        // On error, clear the promise so initialization can be retried
        WebSpeechVoiceManager.initializationPromise = null;
        console.error("Failed to initialize WebSpeechVoiceManager:", error);
        throw error;
      }
    })();

    return WebSpeechVoiceManager.initializationPromise;
  }

  /**
   * Extract language and region from BCP47 language tag
   * @param lang - The BCP47 language tag (e.g., "en-US", "zh-CN")
   * @returns A tuple of [language, region] where language is lowercase and region is UPPERCASE
   */
  static extractLangRegionFromBCP47(lang: string): [string, string | undefined] {
    return extractLangRegionFromBCP47(lang);
  }

  /**
   * Get display name for a language code
   * @private
   */
  private static getLanguageDisplayName(code: string, localization?: string): string {
    try {
      // Use the code as-is, let Intl handle the display name
      const displayName = new Intl.DisplayNames(
        localization ? [localization] : [],
        { type: "language", languageDisplay: "standard" }
      ).of(code);

      return displayName || code.toUpperCase();
    } catch (e) {
      return code.toUpperCase();
    }
  }

  /**
   * Normalize voice name for comparison by removing common variations
   * @private
   */

  private normalizeVoiceName(name: string): string {
    if (!name) return "";
    
    // Convert to lowercase and remove only the specific formatting we don't want
    return name
      .toLowerCase()
      .replace(/\s*\([^)]*\)/g, "")  // Remove anything in parentheses
      .replace(/[^\p{L}\p{N}\s-]/gu, "") // Keep letters, numbers, spaces, and hyphens
      .replace(/\s+/g, " ")  // Normalize spaces
      .trim();
  }

  /**
   * Count occurrences of each voice based on language and normalized name
   * @private
   */
  private countVoiceDuplicates(voices: SpeechSynthesisVoice[]): Map<string, number> {
    const counts = new Map<string, number>();
    for (const voice of voices) {
      if (!voice?.name || !voice?.lang) continue;
      const key = `${voice.lang.toLowerCase()}_${this.normalizeVoiceName(voice.name)}`;
      counts.set(key, (counts.get(key) || 0) + 1);
    }
    return counts;
  }

  /**
   * Updates the system locale based on available voices by detecting quality indicators.
   * The method extracts voice names and attempts to find a matching locale with both
   * high and normal quality indicators. If found, updates the systemLocale property.
   * 
   * @param voices - Array of SpeechSynthesisVoice objects to analyze for locale detection
   * @returns void - Updates the systemLocale property if a matching locale is found
   */
  private updateSystemLocale(voices: SpeechSynthesisVoice[]): void {
    if (!voices?.length) return;
    
    // Get voice names for locale detection
    const voiceNames = voices.map(v => v.name);
    
    // Try to find a locale with quality indicators
    const detectedLocale = findLocaleWithQualityIndicators(voiceNames, "apple");
    if (detectedLocale) {
      this.systemLocale = detectedLocale;
    }
  }

  /**
   * Infer voice quality based on package, platform, JSON, or duplicate count
   * Returns null if quality cannot be determined
   * @private
   */
  private inferVoiceQuality(
    voice: SpeechSynthesisVoice,
    jsonVoice: ReadiumSpeechJSONVoice | undefined,
    duplicatesCount: number
  ): TQuality {
    // 1. Try package name
    const packageQuality = voice.voiceURI ? getInferredQualityFromPackageName(voice.voiceURI) : undefined;
    if (packageQuality) return packageQuality;

    // 2. Try jsonVoice nativeID against package names
    if (jsonVoice?.nativeID && Array.isArray(jsonVoice.nativeID)) {
      for (const nativeId of jsonVoice.nativeID) {
        const nativeIdQuality = getInferredQualityFromPackageName(nativeId);
        if (nativeIdQuality) return nativeIdQuality;
      }
    }

    // 3. Try platform (localized names) - only if jsonVoice is defined
    if (jsonVoice?.localizedName && voice.voiceURI && voice.lang) {
      const platformQuality = getInferredQualityFromPlatform(
        voice.voiceURI, 
        this.systemLocale,
        jsonVoice.localizedName
      );
      if (platformQuality) return platformQuality;
    }

    // 4. Use the jsonVoice.quality array if available
    if (jsonVoice?.quality && jsonVoice.quality.length > 0) {
      const qualityIndex = Math.min(duplicatesCount - 1, jsonVoice.quality.length - 1);
      const quality = jsonVoice.quality[qualityIndex];
      if (quality) {
        return quality;
      }
    }

    // 5. If we can't determine the quality, return null
    return null;
  }

  /**
   * Find matching JSON voice by name or alternative names
   * @private
   */
  private findMatchingJsonVoice(langVoices: any[], normalizedName: string): ReadiumSpeechJSONVoice | undefined {
    return langVoices.find(v => 
      this.normalizeVoiceName(v.name) === normalizedName || 
      v.altNames?.some((alt: string) => this.normalizeVoiceName(alt) === normalizedName)
    );
  }

  /**
   * Remove duplicate voices, keeping the highest quality version of each voice
   * @param voices Array of voices to remove duplicates from
   * @returns Filtered array with duplicates removed, keeping only the highest quality versions
   */
  private removeDuplicate(voices: ReadiumSpeechVoice[]): ReadiumSpeechVoice[] {
    const voiceMap = new Map<string, ReadiumSpeechVoice>();

    for (const voice of voices) {
      const key = `${voice.language.toLowerCase()}_${this.normalizeVoiceName(voice.name)}`;
      const existing = voiceMap.get(key);
      
      if (!existing) {
        voiceMap.set(key, voice);
      } else {
        const existingQuality = this.getQualityValue(existing.quality);
        const newQuality = this.getQualityValue(voice.quality);
        
        // If new voice has higher or equal quality, use it (preferring the newer one)
        if (newQuality >= existingQuality) {
          voiceMap.set(key, voice);
        }
      }
    }

    return Array.from(voiceMap.values());
  }

  /**
   * Get test utterance for a given language
   * @param language - Language code (e.g., "en", "fr", "es")
   * @returns Promise that resolves to the test utterance text
   */
  getTestUtterance(language: string): string {
    if (!language) return "";
    
    // Try direct match
    const utterance = getTestUtterance(language);
    if (utterance) return utterance;

    // Try with base language as fallback
    const [baseLang] = WebSpeechVoiceManager.extractLangRegionFromBCP47(language);
    if (baseLang && baseLang !== language) {
      const baseUtterance = getTestUtterance(baseLang);
      if (baseUtterance) return baseUtterance;
    }

    return "";
  }

  /**
   * Get all voices matching the filter criteria
   * @returns Promise that resolves to an array of filtered voices
   */
  getVoices(options: VoiceFilterOptions = {}): ReadiumSpeechVoice[] {
    if (!this.isInitialized) {
      throw new Error("WebSpeechVoiceManager not initialized. Call initialize() first.");
    }
    
    // Set default values for filter options
    const filterOptions: VoiceFilterOptions = {
      excludeNovelty: true,  // Default to true to filter out novelty voices
      excludeVeryLowQuality: true,  // Default to true to filter out very low quality voices
      ...options  // Let explicit options override the defaults
    };
    
    return this.filterVoices([...this.voices], filterOptions);
  }

  /**
   * Get available languages with voice counts
   * @param localization Optional BCP 47 language tag to use for language names
   * @param filterOptions Optional filters to apply to voices before counting languages
   */
  getLanguages(localization?: string, filterOptions?: VoiceFilterOptions): LanguageInfo[] {
    if (!this.isInitialized) {
      throw new Error("WebSpeechVoiceManager not initialized. Call initialize() first.");
    }
    
    const languages = new Map<string, { count: number; label: string; code: string }>();
    
    // Apply filters if provided
    const voicesToCount = filterOptions ? this.filterVoices([...this.voices], filterOptions) : this.voices;
    
    voicesToCount.forEach(voice => {
      const langCode = voice.language;
      const [baseLang] = WebSpeechVoiceManager.extractLangRegionFromBCP47(langCode);
      
      // Use the base language code for grouping (e.g., "en" for both "en-US" and "en-GB")
      const key = baseLang;
      const displayName = WebSpeechVoiceManager.getLanguageDisplayName(baseLang, localization);
      
      const entry = languages.get(key) || { count: 0, label: displayName, code: baseLang };
      languages.set(key, { ...entry, count: entry.count + 1 });
    });

    // Convert to array and sort
    return Array.from(languages.entries())
      .map(([_, { code, label, count }]) => ({
        code,
        label,
        count
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }

  /**
   * Get available regions with voice counts
   */
  getRegions(localization?: string): LanguageInfo[] {
    if (!this.isInitialized) {
      throw new Error("WebSpeechVoiceManager not initialized. Call initialize() first.");
    }
    
    const regions = new Map<string, { count: number; label: string }>();
    
    this.voices.forEach(voice => {
      const [, region] = WebSpeechVoiceManager.extractLangRegionFromBCP47(voice.language);
      if (region) {
        const entry = regions.get(region) || { count: 0, label: voice.language };
        regions.set(region, { ...entry, count: entry.count + 1 });
      }
    });

    return Array.from(regions.entries()).map(([code, { count, label }]) => {
      let displayName = label;
      try {
        const locale = localization || navigator.language;
        displayName = new Intl.DisplayNames([locale], { type: "region" }).of(code) || label;
      } catch (e) {
        console.warn(`Failed to get display name for region ${code}`, e);
      }
      return {
        code,
        label: displayName,
        count
      };
    });
  }


  /**
   * Get the default voice for a language
   * @param language The language code to get the default voice for (e.g., "en-US")
   * @param voices Optional pre-filtered voices array to use instead of fetching voices
   * @returns The default voice for the language, or null if no voices are available
   */
  getDefaultVoice(language: string, voices?: ReadiumSpeechVoice[]): ReadiumSpeechVoice | null {
    if (!language) return null;
    
    // Use provided voices or get filtered voices if not provided
    let filteredVoices = voices || this.getVoices({ language });
    if (!filteredVoices.length) return null;
    
    // First sort by quality (highest first)
    filteredVoices = this.sortVoices(filteredVoices, {
      by: "quality",
      order: "desc"
    });
  
    // Then sort by language to ensure we get the best match for the requested language
    filteredVoices = this.sortVoices(filteredVoices, {
      by: "language",
      order: "asc",
      preferredLanguages: [language]
    });
  
    // Return the best available voice (already sorted by quality and language)
    return filteredVoices[0];
  }

  getBrowserVoices(maxTimeout = 10000, interval = 10): Promise<SpeechSynthesisVoice[]> {
    const getAvailableVoices = () => window.speechSynthesis?.getVoices() || [];

    // Check if speechSynthesis is available
    if (!window.speechSynthesis) {
      return Promise.resolve([]);
    }

    // Step 1: Try to load voices directly (best case scenario)
    const voices = getAvailableVoices();
    if (Array.isArray(voices) && voices.length) return Promise.resolve(voices);

    return new Promise((resolve, reject) => {
      // Calculate iterations from total timeout
      let counter = Math.floor(maxTimeout / interval);
      // Flag to ensure polling only starts once
      let pollingStarted = false;

      // Polling function: Checks for voices periodically until counter expires
      const startPolling = () => {
        // Prevent multiple starts
        if (pollingStarted) return;
        pollingStarted = true;

        const tick = () => {
          // Resolve with empty array if no voices found
          if (counter < 1) return resolve([]);
          --counter;
          const voices = getAvailableVoices();
          // Resolve if voices loaded
          if (Array.isArray(voices) && voices.length) return resolve(voices);
          // Continue polling 
          setTimeout(tick, interval); 
        };
        // Initial start
        setTimeout(tick, interval);
      };

      // Step 2: Use onvoiceschanged if available (prioritizes event over polling)
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => {
          const voices = getAvailableVoices();
          if (Array.isArray(voices) && voices.length) {
            // Resolve immediately if voices are available
            resolve(voices);
          } else {
            // Fallback to polling if event fires but no voices
            startPolling();
          }
        };
      } else {
        // Step 3: No onvoiceschanged support, start polling directly
        startPolling();
      }

      // Step 4: Overall safety timeout - resolve with empty array if nothing happens
      setTimeout(() => resolve([]), maxTimeout);
    });
  }

  /**
   * Convert SpeechSynthesisVoice array to ReadiumSpeechVoice array
   * @private
   */
  private parseToReadiumSpeechVoices(speechVoices: SpeechSynthesisVoice[]): ReadiumSpeechVoice[] {
    const parseAndFormatBCP47 = (lang: string) => {
      const speechVoiceLang = lang.replace(/_/g, "-");
      if (/\w{2,3}-\w{2,3}/.test(speechVoiceLang)) {
        return `${speechVoiceLang.split("-")[0].toLowerCase()}-${speechVoiceLang.split("-")[1].toUpperCase()}`;
      }
      return lang;
    };

    // Count duplicates first
    const duplicateCounts = this.countVoiceDuplicates(speechVoices);

    // Map all browser voices to ReadiumSpeechVoice format
    const mappedVoices = speechVoices
      .filter(voice => voice?.name && voice?.lang)
      .map(voice => {
        const formattedLang = parseAndFormatBCP47(voice.lang);
        const [baseLang] = WebSpeechVoiceManager.extractLangRegionFromBCP47(formattedLang);
        const normalizedName = this.normalizeVoiceName(voice.name);
        const voiceKey = `${voice.lang.toLowerCase()}_${normalizedName}`;
        const duplicatesCount = duplicateCounts.get(voiceKey) || 1;
        
        // First try with the full language code to handle variants like zh-HK
        let langVoices = getVoices(formattedLang);
        
        // If no voices found, try with the base language code
        if (!langVoices || langVoices.length === 0) {
          langVoices = getVoices(baseLang);
        }
        
        // Find matching JSON voice
        const jsonVoice = this.findMatchingJsonVoice(langVoices, normalizedName);
        
        // Infer quality using the helper method
        const quality = this.inferVoiceQuality(voice, jsonVoice, duplicatesCount);
        
        if (jsonVoice) {
          // Create the voice object with the determined quality
          return {
            ...jsonVoice,
            source: "json",
            originalName: voice.name,
            language: voice.lang,
            voiceURI: voice.voiceURI,
            quality,
            isDefault: voice.default || false,
            offlineAvailability: voice.localService || false,
            isNovelty: isNoveltyVoice(voice.name, voice.voiceURI),
            isLowQuality: isVeryLowQualityVoice(voice.name, quality)
          } as ReadiumSpeechVoice;
        }

        // No match found in JSON, create basic voice object
        return {
          source: "browser",
          label: this.normalizeVoiceName(voice.name),
          name: voice.name,
          originalName: voice.name,
          language: formattedLang,
          voiceURI: voice.voiceURI,
          quality,
          isDefault: voice.default || false,
          offlineAvailability: voice.localService || false,
          isNovelty: isNoveltyVoice(voice.name, voice.voiceURI),
          isLowQuality: isVeryLowQualityVoice(voice.name, quality)
        } as ReadiumSpeechVoice;
      });

    // Remove duplicates before returning
    return this.removeDuplicate(mappedVoices);
  }

  /**
   * Convert an ReadiumSpeechVoice to a native SpeechSynthesisVoice
   */
  convertToSpeechSynthesisVoice(voice: ReadiumSpeechVoice): SpeechSynthesisVoice | undefined {
    if (!voice) return undefined;
    
    return this.browserVoices.find(v => 
      v.voiceURI === voice.voiceURI || 
      v.name === voice.originalName ||
      this.normalizeVoiceName(v.name) === this.normalizeVoiceName(voice.name)
    );
  }

  /**
   * Filter voices based on the provided options
   */
  filterVoices(voices: ReadiumSpeechVoice[], options: VoiceFilterOptions): ReadiumSpeechVoice[] {
    let result = [...voices];

    if (options.language) {
      const langs = Array.isArray(options.language) ? options.language : [options.language];
      
      result = result.filter(voice => {
        return langs.some(requestedLang => {
          const reqLang = requestedLang.toLowerCase();
          const voiceLang = voice.language?.toLowerCase();
          const voiceAltLang = voice.altLanguage?.toLowerCase();
          
          // Check direct matches first
          if (voiceLang === reqLang || voiceAltLang === reqLang) {
            return true;
          }
          
          // Then check base language matches
          const [reqBase] = reqLang.split("-");
          return (voiceLang && voiceLang.startsWith(reqBase)) || 
                 (voiceAltLang && voiceAltLang.startsWith(reqBase));
        });
      });
    }
    
    if (options.source) {
      result = result.filter(v => v.source === options.source);
    }

    if (options.gender) {
      result = result.filter(v => v.gender === options.gender);
    }

    if (options.quality) {
      const qualities = Array.isArray(options.quality) ? options.quality : [options.quality];
      result = result.filter(v => v.quality && qualities.includes(v.quality));
    }

    if (options.offlineOnly) {
      result = result.filter(v => v.offlineAvailability === true);
    }

    if (options.provider) {
      result = result.filter(v => 
        v.provider?.toLowerCase() === options.provider?.toLowerCase()
      );
    }

    if (options.excludeNovelty) {
      result = filterOutNoveltyVoices(result);
    }

    if (options.excludeVeryLowQuality) {
      result = filterOutVeryLowQualityVoices(result);
    }

    return result;
  }

  /**
   * Filter out novelty voices
   * @param voices Array of voices to filter
   * @returns Filtered array with novelty voices removed
   */
  filterOutNoveltyVoices(voices: ReadiumSpeechVoice[]): ReadiumSpeechVoice[] {
    return filterOutNoveltyVoices(voices);
  }

  /**
   * Filter out very low quality voices
   * @param voices Array of voices to filter
   * @returns Filtered array with very low quality voices removed
   */
  filterOutVeryLowQualityVoices(voices: ReadiumSpeechVoice[]): ReadiumSpeechVoice[] {
    return filterOutVeryLowQualityVoices(voices);
  }

  /**
   * Get the numeric value for a quality level
   * @private
   */
  private getQualityValue(quality: TQuality | undefined): number {
    const qualityOrder: Record<string, number> = {
      "veryLow": 1,
      "low": 2,
      "normal": 3,
      "high": 4,
      "veryHigh": 5
    };
    
    // Return 0 for null/undefined, otherwise the quality value or 0 if not found
    return quality ? (qualityOrder[quality] ?? 0) : 0;
  }

  /**
   * Sort voices by the specified criteria
   */
  sortVoices(voices: ReadiumSpeechVoice[], options: SortOptions): ReadiumSpeechVoice[] {
    if (!voices?.length) return [];
    
    let result = [...voices];
    
    switch (options.by) {
      case "name":
        result.sort((a, b) => 
          options.order === "desc" 
            ? b.name.localeCompare(a.name) 
            : a.name.localeCompare(b.name)
        );
        break;
        
      case "language":
        if (options.preferredLanguages?.length) {
          // Use processLanguages to get language and region information
          const processedLanguages = processLanguages(options.preferredLanguages);
          const langInfo = new Map(processedLanguages.map(info => [info.baseLang, info]));
          
          // Group voices by language
          const voicesByLang = new Map<string, ReadiumSpeechVoice[]>();
          const otherVoices: ReadiumSpeechVoice[] = [];
          
          for (const voice of result) {
            const [lang] = WebSpeechVoiceManager.extractLangRegionFromBCP47(voice.language);
            const langInfoForVoice = langInfo.get(lang.toLowerCase());
            
            if (langInfoForVoice) {
              if (!voicesByLang.has(lang)) {
                voicesByLang.set(lang, []);
              }
              voicesByLang.get(lang)!.push(voice);
            } else {
              otherVoices.push(voice);
            }
          }
          
          // Sort each language group separately
          const sortedResult: ReadiumSpeechVoice[] = [];
          
          for (const processedLang of processedLanguages) {
            const langVoices = voicesByLang.get(processedLang.baseLang);
            if (langVoices) {
              // Sort this language's voices by region
              langVoices.sort((a, b) => {
                const [, aRegion] = WebSpeechVoiceManager.extractLangRegionFromBCP47(a.language);
                const [, bRegion] = WebSpeechVoiceManager.extractLangRegionFromBCP47(b.language);
                
                // Check if regions are in the processed languages for this base language
                const aHasMatch = aRegion && processedLang.regions.includes(aRegion);
                const bHasMatch = bRegion && processedLang.regions.includes(bRegion);
                
                if (aHasMatch && bHasMatch) {
                  // Both have matches - sort by their order in this language's regions
                  const aIndex = processedLang.regions.indexOf(aRegion!);
                  const bIndex = processedLang.regions.indexOf(bRegion!);
                  return aIndex - bIndex;
                }
                
                // Only one has match - it comes first
                if (aHasMatch) return -1;
                if (bHasMatch) return 1;
                
                // Neither has match - sort alphabetically by region
                return (aRegion || "").localeCompare(bRegion || "");
              });
              
              sortedResult.push(...langVoices);
            }
          }
          
          // Add other voices sorted by display name
          otherVoices.sort((a, b) => {
            const [aLang] = WebSpeechVoiceManager.extractLangRegionFromBCP47(a.language);
            const [bLang] = WebSpeechVoiceManager.extractLangRegionFromBCP47(b.language);
            const aDisplayName = WebSpeechVoiceManager.getLanguageDisplayName(aLang).toLowerCase();
            const bDisplayName = WebSpeechVoiceManager.getLanguageDisplayName(bLang).toLowerCase();
            return aDisplayName.localeCompare(bDisplayName);
          });
          
          sortedResult.push(...otherVoices);
          result = sortedResult;
        } else {
          // No preferredLanguages, sort by display name
          result.sort((a, b) => {
            const [aLang] = WebSpeechVoiceManager.extractLangRegionFromBCP47(a.language);
            const [bLang] = WebSpeechVoiceManager.extractLangRegionFromBCP47(b.language);
            const aDisplayName = WebSpeechVoiceManager.getLanguageDisplayName(aLang).toLowerCase();
            const bDisplayName = WebSpeechVoiceManager.getLanguageDisplayName(bLang).toLowerCase();
            
            const compare = aDisplayName.localeCompare(bDisplayName);
            if (compare !== 0) {
              return options.order === "desc" ? -compare : compare;
            }
            
            // If same display name, sort by region if available
            const [, aRegion] = WebSpeechVoiceManager.extractLangRegionFromBCP47(a.language);
            const [, bRegion] = WebSpeechVoiceManager.extractLangRegionFromBCP47(b.language);
            if (aRegion && bRegion) {
              return options.order === "desc" 
                ? bRegion.localeCompare(aRegion)
                : aRegion.localeCompare(bRegion);
            }
            
            // If one has a region and the other doesn't, the one with region comes first
            if (aRegion) return -1;
            if (bRegion) return 1;
            
            return 0;
          });
        }
        break;
        
      case "gender":
        result.sort((a, b) => {
          const aGender = a.gender || "";
          const bGender = b.gender || "";
          return options.order === "desc"
            ? bGender.localeCompare(aGender)
            : aGender.localeCompare(bGender);
        });
        break;
        
      case "quality":
        result.sort((a, b) => {
          const aQuality = this.getQualityValue(a.quality);
          const bQuality = this.getQualityValue(b.quality);
          
          return options.order === "desc" 
            ? bQuality - aQuality  // desc: high quality first
            : aQuality - bQuality; // asc: low quality first
        });
        break;
        
      case "region":
        if (options.preferredLanguages?.length) {
          // Use processLanguages to get language and region information
          const processedLanguages = processLanguages(options.preferredLanguages);
          
          // Create region preference order from processedLanguages
          const regionOrder: string[] = [];
          const regionToLangs = new Map<string, string[]>();
          
          for (const processedLang of processedLanguages) {
            for (const region of processedLang.regions) {
              if (!regionOrder.includes(region)) {
                regionOrder.push(region);
              }
              if (!regionToLangs.has(region)) {
                regionToLangs.set(region, []);
              }
              regionToLangs.get(region)!.push(processedLang.baseLang);
            }
          }
          
          // Group voices by region
          const voicesByRegion = new Map<string, ReadiumSpeechVoice[]>();
          const otherVoices: ReadiumSpeechVoice[] = [];
          
          for (const voice of result) {
            const [, region] = WebSpeechVoiceManager.extractLangRegionFromBCP47(voice.language);
            
            if (region && regionToLangs.has(region)) {
              if (!voicesByRegion.has(region)) {
                voicesByRegion.set(region, []);
              }
              voicesByRegion.get(region)!.push(voice);
            } else {
              otherVoices.push(voice);
            }
          }
          
          // Sort each region group separately
          const sortedResult: ReadiumSpeechVoice[] = [];
          
          for (const region of regionOrder) {
            const regionVoices = voicesByRegion.get(region);
            if (regionVoices) {
              // Sort this region's voices by language preference
              regionVoices.sort((a, b) => {
                const [aLang] = WebSpeechVoiceManager.extractLangRegionFromBCP47(a.language);
                const [bLang] = WebSpeechVoiceManager.extractLangRegionFromBCP47(b.language);
                
                // Check if languages are in the preferred languages for this region
                const preferredLangsForRegion = regionToLangs.get(region) || [];
                const aIndex = preferredLangsForRegion.indexOf(aLang);
                const bIndex = preferredLangsForRegion.indexOf(bLang);
                
                if (aIndex !== -1 && bIndex !== -1) {
                  // Both have matches - sort by their order in this region's languages
                  return aIndex - bIndex;
                }
                
                if (aIndex !== -1 && bIndex === -1) {
                  // A has match, B doesn't - A comes first
                  return -1;
                }
                
                if (aIndex === -1 && bIndex !== -1) {
                  // B has match, A doesn't - B comes first
                  return 1;
                }
                
                // Neither has match - sort alphabetically by language
                return aLang.localeCompare(bLang);
              });
              
              sortedResult.push(...regionVoices);
            }
          }
          
          // Add other voices sorted by region then language
          otherVoices.sort((a, b) => {
            const [, aRegion] = WebSpeechVoiceManager.extractLangRegionFromBCP47(a.language);
            const [, bRegion] = WebSpeechVoiceManager.extractLangRegionFromBCP47(b.language);
            const [aLang] = WebSpeechVoiceManager.extractLangRegionFromBCP47(a.language);
            const [bLang] = WebSpeechVoiceManager.extractLangRegionFromBCP47(b.language);
            
            const regionCompare = options.order === "desc"
              ? (bRegion || "").localeCompare(aRegion || "")
              : (aRegion || "").localeCompare(bRegion || "");
              
            return regionCompare === 0 
              ? aLang.localeCompare(bLang)
              : regionCompare;
          });
          
          sortedResult.push(...otherVoices);
          result = sortedResult;
        } else {
          result.sort((a, b) => {
            const [aLang, aRegion = ""] = WebSpeechVoiceManager.extractLangRegionFromBCP47(a.language);
            const [bLang, bRegion = ""] = WebSpeechVoiceManager.extractLangRegionFromBCP47(b.language);
            
            // Sort alphabetically by region
            const regionCompare = options.order === "desc"
              ? bRegion.localeCompare(aRegion)
              : aRegion.localeCompare(bRegion);
              
            // If regions are the same, sort by language
            return regionCompare === 0 
              ? aLang.localeCompare(bLang)
              : regionCompare;
          });
        }
        break;
    }
    
    return result;
  }
  
  /**
   * Group voices by the specified criteria
   * @param voices Array of voices to group
   * @param options Grouping options
   * @returns Object with voice groups keyed by the grouping criteria
   */
  groupVoices(voices: ReadiumSpeechVoice[], by: GroupBy): VoiceGroup {
    const groups: VoiceGroup = {};
    
    for (const voice of voices) {
      let key = "Unknown";
      
      switch (by) {
        case "language":
          key = WebSpeechVoiceManager.extractLangRegionFromBCP47(voice.language)[0];
          break;
          
        case "gender":
          key = voice.gender || "unknown";
          break;
          
        case "quality":
          key = voice.quality || "unknown";
          break;
          
        case "region":
          const [, region] = WebSpeechVoiceManager.extractLangRegionFromBCP47(voice.language);
          key = region || "unknown";
          break;
      }
      
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(voice);
    }
    
    return groups;
  }
}
