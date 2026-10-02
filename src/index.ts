// Core exports
export * from "./WebSpeech/index.js";
export * from "./SpeechServer/index.js";
export * from "./Fallback/index.js";

// Decorator re-exports
export * from "@readium/decorator";
export * from "./decorator/index.js";
export { Locator, LocatorLocations, LocatorText } from "@readium/shared";

// Data exports
export { chineseVariantMap } from "./voices/languages.js";

// Other exports
export * from "./voices/types.js";
export * from "./engine.js";
export * from "./navigator.js";
export * from "./provider.js";
export * from "./providerRegistry.js";
export * from "./speechNavigator.js";
export * from "./utterance.js";
export * from "./utterances/index.js";
export * from "./preferences/index.js";