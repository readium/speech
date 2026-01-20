import { ReadiumSpeechVoice } from "./types";

/**
 * Selects the preferred voice between two voices that represent the same voice
 * but have different names, based on name and altNames preference order.
 * 
 * @param voice1 - First voice
 * @param voice2 - Second voice  
 * @returns The preferred voice based on name/altNames order
 */
export function selectPreferredVoiceByName(voice1: ReadiumSpeechVoice, voice2: ReadiumSpeechVoice): ReadiumSpeechVoice {
  // If voice1 has name === originalName, it's preferred
  if (voice1.name === voice1.originalName) return voice1;
  // If voice2 has name === originalName, it's preferred
  if (voice2.name === voice2.originalName) return voice2;
  
  // Otherwise, use altNames priority order
  const voice1Names = [voice1.originalName, ...(voice1.altNames || [])];
  const voice2Names = [voice2.originalName, ...(voice2.altNames || [])];
  
  // Find the best matching priority for each voice
  const voice1Priority = voice1Names.findIndex(name => voice2Names.includes(name));
  const voice2Priority = voice2Names.findIndex(name => voice1Names.includes(name));
  
  // No matches found, default to voice1
  if (voice1Priority === -1 && voice2Priority === -1) return voice1;
  
  // Return the voice with the better (lower) priority, or voice1 if equal
  return voice1Priority !== -1 && (voice2Priority === -1 || voice1Priority <= voice2Priority) 
    ? voice1 
    : voice2;
}

/**
 * Determines if two voices should be considered the same voice with different names
 * based on altNames matching.
 * 
 * @param voice1 - First voice
 * @param voice2 - Second voice
 * @returns True if voices should be merged based on name/altNames
 */
export function shouldMergeVoicesByName(voice1: ReadiumSpeechVoice, voice2: ReadiumSpeechVoice): boolean {
  // If neither has altNames, they're different voices
  if (!voice1.altNames && !voice2.altNames) {
    return false;
  }

  // Check if voice1 name matches voice2's altNames or vice versa
  const voice1Name = voice1.originalName;
  const voice2Name = voice2.originalName;

  const voice1AltNames = voice1.altNames || [];
  const voice2AltNames = voice2.altNames || [];

  // Check if voice1 name is in voice2's altNames
  if (voice2AltNames.includes(voice1Name)) {
    return true;
  }

  // Check if voice2 name is in voice1's altNames
  if (voice1AltNames.includes(voice2Name)) {
    return true;
  }

  // Check if they share any altNames
  const sharedAltNames = voice1AltNames.filter(name => voice2AltNames.includes(name));
  return sharedAltNames.length > 0;
}
