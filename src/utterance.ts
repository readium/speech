export interface ReadiumSpeechUtterance {
  id?: string;          // Unique identifier for this content
  text: string;         // Text or SSML content
  ssml?: boolean;       // If true, text contains SSML
  language?: string;    // Language of this content (BCP 47)
}