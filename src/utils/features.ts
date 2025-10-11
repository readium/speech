// This is heavily inspired by Easy Speech

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
  [key: string]: any; // Allow dynamic property assignment
}

/**
 * Common prefixes for browsers that tend to implement their custom names for
 * certain parts of their API.
 */
const prefixes = ["webKit", "moz", "ms", "o"];

/**
 * Events that should be available on utterances
 */
const utteranceEvents = [
  "boundary",
  "end",
  "error",
  "mark",
  "pause",
  "resume",
  "start"
];

/**
 * Make the first character of a String uppercase
 */
const capital = (s: string) => `${s.charAt(0).toUpperCase()}${s.slice(1)}`;

/**
 * Check if an object has a property
 */
const hasProperty = (target: any = {}, prop: string): boolean => {
  return Object.hasOwnProperty.call(target, prop) || prop in target || !!target[prop];
};

/**
 * Returns, if a given name exists in global scope
 * @private
 * @param name
 * @return {boolean}
 */
const inGlobalScope = (name: string) => typeof window !== "undefined" && name in window;

/**
 * Find a feature in global scope by checking for various combinations and
 * variations of the base-name
 * @param {String} baseName name of the component to look for, must begin with
 *   lowercase char
 * @return {Object|undefined} The component from global scope, if found
 */
const detect = (baseName: string): object | undefined => {
  const capitalBaseName = capital(baseName);
  const baseNameWithPrefixes = prefixes.map(p => `${p}${capitalBaseName}`);
  const found = [baseName, capitalBaseName]
    .concat(baseNameWithPrefixes)
    .find(inGlobalScope);

  return found && typeof window !== "undefined" ? (window as any)[found] : undefined;
};

/**
 * Detects all possible occurrences of the main Web Speech API components
 * in the global scope using prefix detection.
 */
export const detectFeatures = (): WebSpeechFeatures => {
  const features: WebSpeechFeatures = {} as WebSpeechFeatures;

  // Use prefix detection to find all speech synthesis features
  ;[
    "speechSynthesis",
    "speechSynthesisUtterance",
    "speechSynthesisVoice",
    "speechSynthesisEvent",
    "speechSynthesisErrorEvent"
  ].forEach(feature => {
    features[feature] = detect(feature);
  });

  // Check for event support
  features.onvoiceschanged = hasProperty(features.speechSynthesis, "onvoiceschanged");
  features.speechSynthesisSpeaking = hasProperty(features.speechSynthesis, "speaking");
  features.speechSynthesisPaused = hasProperty(features.speechSynthesis, "paused");

  const hasUtterance = features.speechSynthesisUtterance ? hasProperty(features.speechSynthesisUtterance, "prototype") : false;

  utteranceEvents.forEach(event => {
    const name = `on${event}`;
    features[name] = hasUtterance && features.speechSynthesisUtterance ? hasProperty(features.speechSynthesisUtterance.prototype, name) : false;
  });

  return features;
};