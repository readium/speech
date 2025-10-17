export interface WebSpeechPlatformPatches {
    isAndroid: boolean;
    isFirefox: boolean;
    isSafari: boolean;
    isKaiOS: boolean;
}
/**
 * Detects platform features
 * @returns {WebSpeechPlatformPatches} Object containing platform features
 */
export declare const detectPlatformFeatures: () => WebSpeechPlatformPatches;
