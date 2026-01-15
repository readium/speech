export interface LanguageMetadata {
    defaultRegion: string;
    availableRegions: string[];
    testUtterance: string;
}
export declare const LANGUAGE_METADATA: Record<string, LanguageMetadata>;
export type LanguageCode = keyof typeof LANGUAGE_METADATA;
