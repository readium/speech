import { ReadiumSpeechVoice } from './types';
/**
 * Create a map of language codes to their respective voice order maps
 * @param voices Array of voices to analyze
 * @returns Map where key is language code and value is a map of voice names to their original JSON indices
 */
export declare function createJsonOrderMap(voices: ReadiumSpeechVoice[]): Map<string, Map<string, number>>;
