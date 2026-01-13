import { ReadiumSpeechVoice } from './types';
/**
 * Selects the preferred voice between two voices that represent the same voice
 * but have different names, based on name and altNames preference order.
 *
 * @param voice1 - First voice
 * @param voice2 - Second voice
 * @returns The preferred voice based on name/altNames order
 */
export declare function selectPreferredVoiceByName(voice1: ReadiumSpeechVoice, voice2: ReadiumSpeechVoice): ReadiumSpeechVoice;
/**
 * Determines if two voices should be considered the same voice with different names
 * based on altNames matching.
 *
 * @param voice1 - First voice
 * @param voice2 - Second voice
 * @returns True if voices should be merged based on name/altNames
 */
export declare function shouldMergeVoicesByName(voice1: ReadiumSpeechVoice, voice2: ReadiumSpeechVoice): boolean;
