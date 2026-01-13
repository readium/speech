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
  // If one voice's name is the other's originalName, prefer the one with the originalName
  if (voice1.name === voice2.originalName) return voice2;
  if (voice2.name === voice1.originalName) return voice1;
  
  // If one voice's name is in the other's altNames, prefer the one with the name
  if (voice1.altNames?.includes(voice2.name)) return voice2;
  if (voice2.altNames?.includes(voice1.name)) return voice1;

  // Fall back to comparing all names in order
  const voice1Names = [voice1.originalName, voice1.name, ...(voice1.altNames || [])];
  const voice2Names = [voice2.originalName, voice2.name, ...(voice2.altNames || [])];

  // Find the first match in order of preference
  for (let i = 0; i < voice1Names.length; i++) {
    const v1Name = voice1Names[i];
    const v2Index = voice2Names.findIndex(name => name === v1Name);
    
    if (v2Index !== -1) {
      // Found a match, prefer the one with the lower index (higher preference)
      return i <= v2Index ? voice1 : voice2;
    }
  }

  // If no match found, return voice1 (fallback)
  return voice1;
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
