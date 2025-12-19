import { TQuality, TLocalizedName } from './types';
interface LocalizedQuality {
    normal: string;
    high: string;
}
interface PlatformQualities {
    [platform: string]: {
        [lang: string]: LocalizedQuality;
    };
}
declare const platformQualities: PlatformQualities;
export declare const getInferredQualityFromPlatform: (voiceURI: string, language: string, platform?: TLocalizedName | TLocalizedName[]) => TQuality | undefined;
/**
 * Finds a locale where both high and normal quality indicators are present in the voice names
 * @param voiceNames Array of voice names to check against quality indicators
 * @param platform The platform to check quality indicators for (e.g., "apple")
 * @returns The first matching locale code or undefined if none found or platform not found
 */
export declare const findLocaleWithQualityIndicators: (voiceNames: string[], platform: keyof typeof platformQualities) => string | undefined;
export {};
