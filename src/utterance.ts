export interface ReadiumSpeechUtterance {
  id?: string;       // Unique identifier for this content
  plain?: string;    // Plain-text rendering, when available
  ssml?: string;     // SSML rendering, when available
  language?: string; // Language of this content (BCP 47)
}