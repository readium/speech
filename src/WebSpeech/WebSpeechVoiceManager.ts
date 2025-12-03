import { ReadiumSpeechVoice, TGender, TQuality } from "../voices/types";
import { getTestUtterance, getVoices } from "../voices/languages";
import { 
  isNoveltyVoice, 
  isVeryLowQualityVoice, 
  filterOutNoveltyVoices, 
  filterOutVeryLowQualityVoices 
} from "../voices/filters";

import { extractLangRegionFromBCP47 } from "../utils/language";

/**
 * Options for filtering voices
 */
interface VoiceFilterOptions {
  language?: string | string[];
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
  private voices: ReadiumSpeechVoice[] = [];
  private browserVoices: SpeechSynthesisVoice[] = [];
  private isInitialized = false;

  private constructor() {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      throw new Error("Web Speech API is not available in this environment");
    }
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
   * Remove duplicate voices, keeping the highest quality version of each voice
   * @param voices Array of voices to remove duplicates from
   * @returns Filtered array with duplicates removed, keeping only the highest quality versions
   */
  private removeDuplicate(voices: ReadiumSpeechVoice[]): ReadiumSpeechVoice[] {
    const voiceMap = new Map<string, ReadiumSpeechVoice>();
    
    for (const voice of voices) {
      // Create a unique key based on voice identity (excluding quality)
      const key = `${voice.voiceURI}_${voice.name}_${voice.language}`;
      const existingVoice = voiceMap.get(key);
      
      // If we don't have this voice yet, or if the current voice is of higher quality
      if (!existingVoice || this.getQualityValue(voice.quality) > this.getQualityValue(existingVoice.quality)) {
        voiceMap.set(key, voice);
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
    const filteredVoices = voices || this.getVoices({ language });
    if (!filteredVoices.length) return null;
    
    // Try to find a default voice with high quality
    const defaultVoice = filteredVoices.find(v => v.isDefault && this.getQualityValue(v.quality) >= 2);
    if (defaultVoice) return defaultVoice;
    
    // Try to find any high quality voice
    const highQualityVoice = filteredVoices.find(v => this.getQualityValue(v.quality) >= 2);
    if (highQualityVoice) return highQualityVoice;
    
    // Fall back to the first available voice
    return filteredVoices[0];
  }

  getBrowserVoices(maxTimeout = 10000, interval = 10): Promise<SpeechSynthesisVoice[]> {
    const getVoices = () => window.speechSynthesis?.getVoices() || [];

    // Check if speechSynthesis is available
    if (!window.speechSynthesis) {
      return Promise.resolve([]);
    }

    // Step 1: Try to load voices directly (best case scenario)
    const voices = getVoices();
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
          const voices = getVoices();
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
          const voices = getVoices();
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
   * Find a browser voice in the voice data
   * @private
   */
  private async findVoiceInData(browserVoice: SpeechSynthesisVoice): Promise<ReadiumSpeechVoice | undefined> {
    if (!browserVoice?.lang) return undefined;
    
    try {
      const browserLang = browserVoice.lang.toLowerCase();
      const [baseLang] = browserLang.split("-");
      
      // Get voices for the base language
      const voices = await getVoices(baseLang);
      if (!voices || voices.length === 0) return undefined;
      
      // Try exact match first
      const exactMatch = voices.find(voice => {
        const voiceLang = voice.language?.toLowerCase();
        const voiceAltLang = voice.altLanguage?.toLowerCase();
        return voiceLang === browserLang || voiceAltLang === browserLang;
      });
      
      if (exactMatch) return exactMatch;
      
      // Then try base language match
      return voices.find(voice => {
        const voiceLang = voice.language?.toLowerCase();
        const voiceAltLang = voice.altLanguage?.toLowerCase();
        return (voiceLang?.startsWith(baseLang)) || 
               (voiceAltLang?.startsWith(baseLang));
      });
    } catch (error) {
      console.error(`Error finding voice data for ${browserVoice.lang}:`, error);
      return undefined;
    }
  }

  /**
   * Convert SpeechSynthesisVoice array to ReadiumSpeechVoice array
   * @private
   */
  private parseToReadiumSpeechVoices(speechVoices: SpeechSynthesisVoice[]): ReadiumSpeechVoice[] {
    const parseAndFormatBCP47 = (lang: string) => {
      const speechVoiceLang = lang.replace("_", "-");
      if (/\w{2,3}-\w{2,3}/.test(speechVoiceLang)) {
        return `${speechVoiceLang.split("-")[0].toLowerCase()}-${speechVoiceLang.split("-")[1].toUpperCase()}`;
      }
      return lang;
    };

    return speechVoices
      .filter(voice => voice && voice.name && voice.lang)
      .map(voice => {
        const formattedLang = parseAndFormatBCP47(voice.lang);
        const [baseLang] = formattedLang.split("-");
        
        // Get voices for the specific language
        const langVoices = getVoices(baseLang);
        
        // Try to find a matching voice by name
        const jsonVoice = langVoices.find(v => 
          v.name === voice.name || 
          (v.altNames && v.altNames.some((name: string) => name === voice.name))
        );

        if (jsonVoice) {
          // Found a match in JSON data, merge with browser voice
          return {
            ...jsonVoice,
            // Preserve browser-specific properties
            voiceURI: voice.voiceURI,
            isDefault: voice.default || false,
            offlineAvailability: voice.localService || false,
            // Use utility functions from filters.ts
            isNovelty: isNoveltyVoice(voice.name, voice.voiceURI),
            isLowQuality: isVeryLowQualityVoice(voice.name, jsonVoice.quality)
          };
        }

        // No match found in JSON, create basic voice object
        return {
          label: voice.name,
          name: voice.name,
          voiceURI: voice.voiceURI,
          language: formattedLang,
          isDefault: voice.default || false,
          offlineAvailability: voice.localService || false,
          isNovelty: isNoveltyVoice(voice.name, voice.voiceURI),
          isLowQuality: isVeryLowQualityVoice(voice.name)
        };
      });
  }

  /**
   * Convert an ReadiumSpeechVoice to a native SpeechSynthesisVoice
   */
  convertToSpeechSynthesisVoice(voice: ReadiumSpeechVoice): SpeechSynthesisVoice | undefined {
    if (!voice) return undefined;
    
    return this.browserVoices.find(v => 
      v.voiceURI === voice.voiceURI || 
      v.name === voice.name
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

    if (options.gender) {
      result = result.filter(v => v.gender === options.gender);
    }

    if (options.quality) {
      const qualities = Array.isArray(options.quality) ? options.quality : [options.quality];
      result = result.filter(v => 
        v.quality && v.quality.some(q => qualities.includes(q as any))
      );
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
  private getQualityValue(quality: TQuality | TQuality[] | undefined): number {
    const qualityOrder: Record<string, number> = {
      "veryLow": 0,
      "low": 1,
      "normal": 2,
      "high": 3,
      "veryHigh": 4
    };
    
    if (!quality) return 1; // "low" as fallback
    
    // Handle both single quality values and arrays
    if (Array.isArray(quality)) {
      return Math.max(...quality.map(q => qualityOrder[q] ?? 1));
    }
    
    // Fallback for single quality values
    return qualityOrder[quality] ?? 1;
  }

  /**
   * Sort voices by the specified criteria
   */
  sortVoices(voices: ReadiumSpeechVoice[], options: SortOptions): ReadiumSpeechVoice[] {
    if (!voices?.length) return [];
    
    const result = [...voices];
    
    switch (options.by) {
      case "name":
        result.sort((a, b) => 
          options.order === "desc" 
            ? b.name.localeCompare(a.name) 
            : a.name.localeCompare(b.name)
        );
        break;
        
      case "language":
        result.sort((a, b) => {
          const [aLang, aRegion] = WebSpeechVoiceManager.extractLangRegionFromBCP47(a.language);
          const [bLang, bRegion] = WebSpeechVoiceManager.extractLangRegionFromBCP47(b.language);
          
          // Get display names for both languages for comparison
          const aDisplayName = WebSpeechVoiceManager.getLanguageDisplayName(aLang).toLowerCase();
          const bDisplayName = WebSpeechVoiceManager.getLanguageDisplayName(bLang).toLowerCase();
          
          // If preferredLanguages is provided, prioritize them
          if (options.preferredLanguages?.length) {
            const aIndex = options.preferredLanguages.findIndex(prefLang => {
              const [prefLangBase, prefRegion] = WebSpeechVoiceManager.extractLangRegionFromBCP47(prefLang);
              // Match both language and region if specified in preferred language
              return aLang === prefLangBase.toLowerCase() && 
                     (!prefRegion || !aRegion || prefRegion === aRegion);
            });
            
            const bIndex = options.preferredLanguages.findIndex(prefLang => {
              const [prefLangBase, prefRegion] = WebSpeechVoiceManager.extractLangRegionFromBCP47(prefLang);
              return bLang === prefLangBase.toLowerCase() && 
                     (!prefRegion || !bRegion || prefRegion === bRegion);
            });
            
            // If both languages are in preferred list, sort by their position
            if (aIndex !== -1 && bIndex !== -1) {
              // If same preferred language but different regions, sort by region if specified
              if (aIndex === bIndex && aRegion && bRegion) {
                return options.order === "desc" 
                  ? bRegion.localeCompare(aRegion)
                  : aRegion.localeCompare(bRegion);
              }
              return options.order === "desc" ? bIndex - aIndex : aIndex - bIndex;
            }
            // If only one language is in preferred list, it comes first
            if (aIndex !== -1) return -1;
            if (bIndex !== -1) return 1;
          }
          
          // Sort by display name for all languages
          const compare = aDisplayName.localeCompare(bDisplayName);
          
          // If same display name, sort by region if available
          if (compare === 0 && aRegion && bRegion) {
            return options.order === "desc"
              ? bRegion.localeCompare(aRegion)
              : aRegion.localeCompare(bRegion);
          }
          
          return options.order === "desc" ? -compare : compare;
        });
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
        result.sort((a, b) => {
          const [aLang, aRegion = ""] = WebSpeechVoiceManager.extractLangRegionFromBCP47(a.language);
          const [bLang, bRegion = ""] = WebSpeechVoiceManager.extractLangRegionFromBCP47(b.language);
          
          // If preferredLanguages is provided, prioritize exact matches first
          if (options.preferredLanguages?.length) {
            // Check for exact language-region matches first (e.g., "en-US" matches "en-US")
            const aExactMatchIndex = options.preferredLanguages.findIndex(prefLang => {
              const [prefLangBase, prefRegion] = WebSpeechVoiceManager.extractLangRegionFromBCP47(prefLang);
              return aLang === prefLangBase.toLowerCase() && 
                     aRegion === prefRegion?.toUpperCase();
            });
            
            const bExactMatchIndex = options.preferredLanguages.findIndex(prefLang => {
              const [prefLangBase, prefRegion] = WebSpeechVoiceManager.extractLangRegionFromBCP47(prefLang);
              return bLang === prefLangBase.toLowerCase() && 
                     bRegion === prefRegion?.toUpperCase();
            });
            
            // If one has an exact match and the other doesn't, the exact match comes first
            if (aExactMatchIndex !== -1 && bExactMatchIndex === -1) return -1;
            if (aExactMatchIndex === -1 && bExactMatchIndex !== -1) return 1;
            
            // If both have exact matches, sort by their position in preferredLanguages
            if (aExactMatchIndex !== -1 && bExactMatchIndex !== -1 && aExactMatchIndex !== bExactMatchIndex) {
              return aExactMatchIndex - bExactMatchIndex;
            }
            
            // Then check for language-only matches (e.g., "en" matches "en-US")
            const aLangMatchIndex = options.preferredLanguages.findIndex(prefLang => {
              const [prefLangBase] = WebSpeechVoiceManager.extractLangRegionFromBCP47(prefLang);
              return aLang === prefLangBase.toLowerCase();
            });
            
            const bLangMatchIndex = options.preferredLanguages.findIndex(prefLang => {
              const [prefLangBase] = WebSpeechVoiceManager.extractLangRegionFromBCP47(prefLang);
              return bLang === prefLangBase.toLowerCase();
            });
            
            // If one has a language match and the other doesn't, the language match comes first
            if (aLangMatchIndex !== -1 && bLangMatchIndex === -1) return -1;
            if (aLangMatchIndex === -1 && bLangMatchIndex !== -1) return 1;
            
            // If both have language matches, sort by their position in preferredLanguages
            if (aLangMatchIndex !== -1 && bLangMatchIndex !== -1 && aLangMatchIndex !== bLangMatchIndex) {
              return aLangMatchIndex - bLangMatchIndex;
            }
          }
          
          // If no preferred language matches, sort alphabetically by region
          const regionCompare = options.order === "desc"
            ? bRegion.localeCompare(aRegion)
            : aRegion.localeCompare(bRegion);
            
          // If regions are the same, sort by language
          return regionCompare === 0 
            ? aLang.localeCompare(bLang)
            : regionCompare;
        });
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
          key = voice.quality?.[0] || "unknown";
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
