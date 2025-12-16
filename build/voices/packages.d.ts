import { TQuality } from './types';
export declare enum PackageQuality {
    VeryLow = "super-compact",
    Low = "compact",
    Normal = "enhanced",
    High = "premium"
}
export declare const getInferredQualityFromPackageName: (voiceName: string) => TQuality | undefined;
