import { TQuality, TLocalizedName } from './types';
export declare const getInferredQualityFromPlatform: (voiceURI: string, language: string, platform?: TLocalizedName | TLocalizedName[]) => TQuality | undefined;
