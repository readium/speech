import { ReadiumSpeechVoice, TGender, TQuality } from "../voices/data/types";
import { getTestUtterance } from "../voices/data/testUtterances";
import * as voiceData from "../voices/data";
import noveltyFilter from "../voices/data/filters/novelty";
import veryLowQualityFilter from "../voices/data/filters/veryLowQuality";

// Mapping of language codes to their variants
const LANGUAGE_CODE_MAPPING: Record<string, string[]> = {
  "zh": ["cmn", "wuu", "yue"],  // Map "zh" to all Chinese variants
  "zh-CN": ["cmn"],             // Map "zh-CN" to Mandarin
  "zh-TW": ["cmn"],             // Map "zh-TW" to Mandarin
  "zh-HK": ["yue", "cmn"],      // Map "zh-HK" to Cantonese and Mandarin
  "zh-SG": ["cmn"],             // Map "zh-SG" to Mandarin
  "cmn": ["cmn"],               // Direct mapping for ISO 639-3 codes
  "wuu": ["wuu"],
  "yue": ["yue"]
};

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
        instance.voices = instance.parseToReadiumSpeechVoices(instance.browserVoices);
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
   */
  static extractLangRegionFromBCP47(lang: string): [string, string | undefined] {
    if (!lang) return ["", undefined];
    
    return [lang.split("-")[0].toLowerCase(), lang.split("-")[1]?.toUpperCase()];
  }

  /**
   * Get language variants for a given language code
   * @private
   */
  private static getLanguageVariants(lang: string): string[] {
    const [baseLang] = this.extractLangRegionFromBCP47(lang);
    return LANGUAGE_CODE_MAPPING[baseLang] || [baseLang];
  }

  /**
   * Get display name for a language code
   * @private
   */
  private static getLanguageDisplayName(code: string, localization?: string): string {
    const displayNames: Record<string, string> = {
      "cmn": "Mandarin Chinese",
      "wuu": "Wu Chinese",
      "yue": "Cantonese (Yue)"
    };
    try {
      return displayNames[code] || new Intl.DisplayNames(localization ? [localization] : [], { type: "language" }).of(code) || code.toUpperCase();
    } catch (e) {
      return code.toUpperCase();
    }
  }

  /**
   * Remove duplicate voices
   * @param voices Array of voices to remove duplicates from
   * @returns Filtered array with duplicates removed
   */
  private removeDuplicate(voices: ReadiumSpeechVoice[]): ReadiumSpeechVoice[] {
    const strHash = (voice: ReadiumSpeechVoice) => `${voice.voiceURI}_${voice.name}_${voice.language}_${voice.offlineAvailability}`;
    
    const voicesStrMap = [...new Set(voices.map((v) => strHash(v)))];
    
    const voicesFiltered = voicesStrMap
        .map((s) => voices.find((v) => strHash(v) === s))
        .filter((v) => !!v);
    
    return voicesFiltered;
  }

  /**
   * Get test utterance for a given language
   * @param language - Language code (e.g., "en", "fr", "es")
   * @returns Test utterance text
   */
  getTestUtterance(language: string): string {
    // Try direct match first
    let utterance = getTestUtterance(language);
    if (utterance) {
      return utterance;
    }

    // Try with language variants
    const variants = WebSpeechVoiceManager.getLanguageVariants(language);
    for (const variant of variants) {
      utterance = getTestUtterance(variant);
      if (utterance) {
        return utterance;
      }
    }

    // Return empty string if no matching utterance is found
    return "";
  }

  /**
   * Get all voices matching the filter criteria
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
    
    const languages = new Map<string, { count: number; label: string }>();
    
    // Apply filters if provided
    const voicesToCount = filterOptions ? this.filterVoices([...this.voices], filterOptions) : this.voices;
    
    voicesToCount.forEach(voice => {
      const langCode = voice.language; // Use the full language code
      const [baseLang] = WebSpeechVoiceManager.extractLangRegionFromBCP47(langCode);
      
      // For Chinese variants, use the full language code as the key
      const key = baseLang === "zh" ? langCode : baseLang;
      const displayName = WebSpeechVoiceManager.getLanguageDisplayName(key, localization);
      
      const entry = languages.get(key) || { count: 0, label: displayName };
      languages.set(key, { ...entry, count: entry.count + 1 });
    });

    // Convert to array and sort
    return Array.from(languages.entries())
      .map(([code, { count, label }]) => ({
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
   * Extract region from a language code
   * @private
   */
  private getRegionFromLanguage(langCode: string): string {
    try {
      // Try using Intl.Locale for proper BCP 47 parsing
      const locale = new Intl.Locale(langCode);
      return locale.region?.toLowerCase() || "";
    } catch {
      // Fallback to BCP47 parsing if Intl.Locale fails
      const [, region] = WebSpeechVoiceManager.extractLangRegionFromBCP47(langCode);
      return region || "";
    }
  }

  /**
   * Get the default voice for a language
   */
  getDefaultVoice(language: string): ReadiumSpeechVoice | undefined {
    if (!language) return undefined;
    
    const voices = this.getVoices({ language });
    if (!voices.length) return undefined;
    
    // Try to find a default voice with high quality
    const defaultVoice = voices.find(v => v.isDefault && this.getQualityValue(v.quality) >= 2);
    if (defaultVoice) return defaultVoice;
    
    // Try to find any high quality voice
    const highQualityVoice = voices.find(v => this.getQualityValue(v.quality) >= 2);
    if (highQualityVoice) return highQualityVoice;
    
    // Fall back to the first available voice
    return voices[0];
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
  private findVoiceInData(browserVoice: SpeechSynthesisVoice): ReadiumSpeechVoice | undefined {
    // Use existing method to extract language
    const [baseLang] = WebSpeechVoiceManager.extractLangRegionFromBCP47(browserVoice.lang);
    
    // Get all voices for this language from the data
    const dataVoices = voiceData.getVoices(baseLang);
    
    // Search through data voices to find a match
    for (const voice of dataVoices) {
      // Match by name first
      if (voice.name === browserVoice.name) {
        return voice;
      }
      
      // Match by voiceURI if available
      if (voice.voiceURI && voice.voiceURI === browserVoice.voiceURI) {
        return voice;
      }
    }
    
    return undefined;
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

    const isNoveltyVoice = (voiceName: string) => 
      noveltyFilter.voices.some((v: any) => voiceName.includes(v.name));
    
    const isVeryLowQualityVoice = (voiceName: string, quality?: TQuality[]) => 
      veryLowQualityFilter.voices.some((v: any) => voiceName.includes(v.name)) || 
      (Array.isArray(quality) && quality.includes("veryLow" as TQuality));

    const parsedVoices = speechVoices
      .filter(voice => voice && voice.name && voice.lang)
      .map(voice => {
        // Try to find this voice in the voice data
        const dataVoice = this.findVoiceInData(voice);
        
        if (dataVoice) {
          // Return the data voice with browser-specific properties
          return {
            ...dataVoice,
            // Override with actual browser data
            isDefault: voice.default || false,
            offlineAvailability: voice.localService || false,
            // Add isNovelty and isLowQuality based on filter modules
            isNovelty: isNoveltyVoice(voice.name),
            isLowQuality: isVeryLowQualityVoice(voice.name, dataVoice.quality)
          };
        }
        
        return {
          // Core identification - use actual browser data
          label: voice.name,
          name: voice.name,
          voiceURI: voice.voiceURI,
          
          // Localization - use BCP47 formatted language
          language: parseAndFormatBCP47(voice.lang),
          localizedName: voice.name,
          altNames: undefined,
          otherLanguages: undefined,
          multiLingual: undefined,
          
          // Voice characteristics - browser doesn't provide this info
          gender: undefined,
          children: undefined,
          
          // Quality and capabilities - browser doesn't provide this info
          quality: undefined,
          pitchControl: undefined,
          
          // Performance settings - browser doesn't provide this
          pitch: undefined,
          recommendedPitch: undefined,
          recommendedRate: undefined,
          
          // Additional properties - use actual browser data
          isDefault: voice.default || false,
          offlineAvailability: voice.localService || false,
          isNovelty: isNoveltyVoice(voice.name),
          isLowQuality: isVeryLowQualityVoice(voice.name)
        };
      });
    
    return this.removeDuplicate(parsedVoices);
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
      result = result.filter(v => {
        const [voiceLang] = WebSpeechVoiceManager.extractLangRegionFromBCP47(v.language);
        
        // Check if any of the requested languages match this voice's language or its variants
        return langs.some(requestedLang => {
          // First try direct match (e.g., zh-CN matches zh-CN)
          if (v.language.toLowerCase() === requestedLang.toLowerCase()) {
            return true;
          }
          
          // Then check language variants (e.g., zh-CN matches cmn)
          const variants = WebSpeechVoiceManager.getLanguageVariants(requestedLang);
          return variants.some(variant => {
            // Check if the variant matches the voice's language code
            return voiceLang.toLowerCase() === variant.toLowerCase();
          });
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
      result = this.filterOutNoveltyVoices(result);
    }

    if (options.excludeVeryLowQuality) {
      result = this.filterOutVeryLowQualityVoices(result);
    }

    return result;
  }

  /**
   * Filter out novelty voices
   * @param voices Array of voices to filter
   * @returns Filtered array with novelty voices removed
   */
  filterOutNoveltyVoices(voices: ReadiumSpeechVoice[]): ReadiumSpeechVoice[] {
    return voices.filter(voice => !voice.isNovelty);
  }

  /**
   * Filter out very low quality voices
   * @param voices Array of voices to filter
   * @returns Filtered array with very low quality voices removed
   */
  filterOutVeryLowQualityVoices(voices: ReadiumSpeechVoice[]): ReadiumSpeechVoice[] {
    if (!voices?.length) return [];
    return voices.filter(voice => {
      // Check both isLowQuality flag and quality array
      const isVeryLow = voice.quality?.includes("veryLow") || voice.isLowQuality;
      return !isVeryLow;
    });
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
    
    if (!quality) return 1; // "low" as fallback like voices.ts
    
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
          const aLang = a.language.toLowerCase();
          const bLang = b.language.toLowerCase();
          return options.order === "desc" 
            ? bLang.localeCompare(aLang)
            : aLang.localeCompare(bLang);
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
          const aRegion = this.getRegionFromLanguage(a.language);
          const bRegion = this.getRegionFromLanguage(b.language);
          
          return options.order === "desc"
            ? bRegion.localeCompare(aRegion)
            : aRegion.localeCompare(bRegion);
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
