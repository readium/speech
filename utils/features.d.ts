export interface WebSpeechFeatures {
    speechSynthesis: SpeechSynthesis | undefined;
    speechSynthesisUtterance: typeof SpeechSynthesisUtterance | undefined;
    speechSynthesisVoice: typeof SpeechSynthesisVoice | undefined;
    speechSynthesisEvent: typeof SpeechSynthesisEvent | undefined;
    speechSynthesisErrorEvent: typeof SpeechSynthesisErrorEvent | undefined;
    onvoiceschanged: boolean;
    speechSynthesisSpeaking: boolean;
    speechSynthesisPaused: boolean;
    onboundary: boolean;
    onend: boolean;
    onerror: boolean;
    onmark: boolean;
    onpause: boolean;
    onresume: boolean;
    onstart: boolean;
    [key: string]: any;
}
/**
 * Detects all possible occurrences of the main Web Speech API components
 * in the global scope using prefix detection.
 */
export declare const detectFeatures: () => WebSpeechFeatures;
