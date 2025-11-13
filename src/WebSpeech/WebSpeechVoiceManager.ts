import { IVoice, TGender, TQuality } from "../voices/data/types";
import { getTestUtterance } from "../voices/data/testUtterances";

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
  [key: string]: IVoice[];
}

/**
 * Sort order for voices
 */
type SortOrder = "asc" | "desc";

/**
 * Sort options for voices
 */
interface SortOptions {
  by: "name" | "language" | "gender" | "quality" | "region";
  order?: SortOrder;
  preferredLanguage?: string | string[];
  localization?: string;
}

/**
 * Manages Web Speech API voices with enhanced functionality
 */
export class WebSpeechVoiceManager {
  private static instance: WebSpeechVoiceManager;
  private voices: IVoice[] = [];
  private browserVoices: SpeechSynthesisVoice[] = [];
  private initialized = false;

  /**
   * Get the singleton instance
   */
  public static getInstance(): WebSpeechVoiceManager {
    if (!WebSpeechVoiceManager.instance) {
      WebSpeechVoiceManager.instance = new WebSpeechVoiceManager();
    }
    return WebSpeechVoiceManager.instance;
  }

  private constructor() {
    // Private constructor to enforce singleton
  }

  /**
   * Initialize the voice manager
   * @returns Promise that resolves when initialization is complete
   */
  async initialize(): Promise<boolean> {
    if (this.initialized) return true;
    
    // Check if speechSynthesis is available
    if (!window.speechSynthesis) {
      return false;
    }
    
    try {
      this.browserVoices = await this.getBrowserVoices();
      this.voices = await this.loadVoices();
      this.initialized = true;
      return true;
    } catch (error) {
      console.error("Failed to initialize WebSpeechVoiceManager:", error);
      return false;
    }
  }

  private ensureInitialized(): void {
    if (!this.initialized) {
      throw new Error("WebSpeechVoiceManager must be initialized first. Call initialize() before using other methods.");
    }
  }

  /**
   * Extract language and region from BCP47 language tag
   * @private
   */
  private extractLangRegionFromBCP47(lang: string): [string, string | undefined] {
    if (!lang) return ["", undefined];
    
    return [lang.split("-")[0].toLowerCase(), lang.split("-")[1]?.toUpperCase()];
  }

  /**
   * Remove duplicate voices
   * @param voices Array of voices to remove duplicates from
   * @returns Filtered array with duplicates removed
   */
  private removeDuplicate(voices: IVoice[]): IVoice[] {
    const strHash = (voice: IVoice) => `${voice.voiceURI}_${voice.name}_${voice.language}_${voice.offlineAvailability}`;
    
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
  public getTestUtterance(language: string): string {
    return getTestUtterance(language);
  }

  /**
   * Get all voices matching the filter criteria
   */
  getVoices(options: VoiceFilterOptions = {}): IVoice[] {
    this.ensureInitialized();
    return this.filterVoices(this.voices, options);
  }

  /**
   * Get available languages with voice counts
   */
  getLanguages(localization?: string): LanguageInfo[] {
    this.ensureInitialized();
    
    const languages = new Map<string, { count: number; label: string }>();
    
    this.voices.forEach(voice => {
      const [lang] = this.extractLangRegionFromBCP47(voice.language);
      const entry = languages.get(lang) || { count: 0, label: voice.language };
      languages.set(lang, { ...entry, count: entry.count + 1 });
    });

    return Array.from(languages.entries()).map(([code, { count, label }]) => {
      let displayName = label;
      try {
        const locale = localization || navigator.language;
        displayName = new Intl.DisplayNames([locale], { type: "language" }).of(code) || label;
      } catch (e) {
        console.warn(`Failed to get display name for language ${code}`, e);
      }
      return {
        code,
        label: displayName,
        count
      };
    });
  }

  /**
   * Get available regions with voice counts
   */
  getRegions(localization?: string): LanguageInfo[] {
    this.ensureInitialized();
    
    const regions = new Map<string, { count: number; label: string }>();
    
    this.voices.forEach(voice => {
      const [, region] = this.extractLangRegionFromBCP47(voice.language);
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
      const [, region] = this.extractLangRegionFromBCP47(langCode);
      return region || "";
    }
  }

  /**
   * Get the default voice for a language
   */
  getDefaultVoice(language: string): IVoice | undefined {
    if (!language) return undefined;
    
    const langVoices = this.filterVoices(this.voices, { language });
    if (!langVoices.length) return undefined;
    
    // Try to find a default voice with high quality
    const defaultVoice = langVoices.find(v => v.isDefault && this.getQualityValue(v.quality) >= 2);
    if (defaultVoice) return defaultVoice;
    
    // Try to find any high quality voice
    const highQualityVoice = langVoices.find(v => this.getQualityValue(v.quality) >= 2);
    if (highQualityVoice) return highQualityVoice;
    
    // Fall back to the first available voice
    return langVoices[0];
  }

  private getBrowserVoices(maxTimeout = 10000, interval = 10): Promise<SpeechSynthesisVoice[]> {
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
   * Load and convert browser voices to IVoice array
   */
  private async loadVoices(): Promise<IVoice[]> {
    try {
      const speechVoices = await this.getBrowserVoices();
      return this.parseToIVoices(speechVoices);
    } catch (error) {
      console.error("Error loading voices:", error);
      return [];
    }
  }

  /**
   * Find a browser voice in the voice data
   * @private
   */
  private findVoiceInData(browserVoice: SpeechSynthesisVoice): IVoice | undefined {
    // Search through all loaded voices to find a match
    for (const voice of this.voices) {
      // Match by voiceURI first (most specific)
      if (voice.voiceURI && voice.voiceURI === browserVoice.voiceURI) {
        return voice;
      }
      
      // Match by name and language
      if (voice.name === browserVoice.name && voice.language === browserVoice.lang) {
        return voice;
      }
      
      // Match by name only (less specific)
      if (voice.name === browserVoice.name) {
        return voice;
      }
    }
    
    return undefined;
  }

  /**
   * Convert SpeechSynthesisVoice array to IVoice array
   * @private
   */
  private parseToIVoices(speechVoices: SpeechSynthesisVoice[]): IVoice[] {
    const parseAndFormatBCP47 = (lang: string) => {
      const speechVoiceLang = lang.replace("_", "-");
      if (/\w{2,3}-\w{2,3}/.test(speechVoiceLang)) {
        return `${speechVoiceLang.split("-")[0].toLowerCase()}-${speechVoiceLang.split("-")[1].toUpperCase()}`;
      }
      return lang;
    };

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
          };
        }
        
        // If not found in data, create minimal voice from browser info
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
          offlineAvailability: voice.localService || false
        };
      });
    
    return this.removeDuplicate(parsedVoices);
  }

  /**
   * Convert an IVoice to a native SpeechSynthesisVoice
   */
  convertToSpeechSynthesisVoice(voice: IVoice): SpeechSynthesisVoice | undefined {
    if (!voice) return undefined;
    
    return this.browserVoices.find(v => 
      v.voiceURI === voice.voiceURI || 
      v.name === voice.name
    );
  }

  /**
   * Filter voices based on the provided options
   */
  filterVoices(voices: IVoice[], options: VoiceFilterOptions): IVoice[] {
    let result = [...voices];

    if (options.language) {
      const langs = Array.isArray(options.language) ? options.language : [options.language];
      result = result.filter(v => {
        const [voiceLang] = this.extractLangRegionFromBCP47(v.language);
        return langs.some(lang => {
          const [filterLang] = this.extractLangRegionFromBCP47(lang);
          return voiceLang === filterLang;
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
  filterOutNoveltyVoices(voices: IVoice[]): IVoice[] {
    return voices.filter(voice => !voice.isNovelty);
  }

  /**
   * Filter out very low quality voices
   * @param voices Array of voices to filter
   * @returns Filtered array with very low quality voices removed
   */
  filterOutVeryLowQualityVoices(voices: IVoice[]): IVoice[] {
    if (!voices?.length) return [];
    return voices.filter(voice => !voice.quality?.includes("veryLow"));
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
  sortVoices(voices: IVoice[], options: SortOptions): IVoice[] {
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
   * Group voices by the specified key
   */
  groupVoices(voices: IVoice[], by: "language" | "gender" | "quality" | "region"): VoiceGroup {
    const groups: VoiceGroup = {};
    
    for (const voice of voices) {
      let key = "Unknown";
      
      switch (by) {
        case "language":
          key = this.extractLangRegionFromBCP47(voice.language)[0];
          break;
          
        case "gender":
          key = voice.gender || "unknown";
          break;
          
        case "quality":
          key = voice.quality?.[0] || "unknown";
          break;
          
        case "region":
          const [, region] = this.extractLangRegionFromBCP47(voice.language);
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
