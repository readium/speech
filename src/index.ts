// Core exports
export * from "./WebSpeech";
export * from "./SpeechServer";

// Decorator re-exports
export * from "@readium/decorator";
export * from "./decorator";
export { Locator, LocatorLocations, LocatorText } from "@readium/shared";

// Data exports
export { chineseVariantMap } from "./voices/languages";

// Other exports
export * from "./voices/types";
export * from "./engine";
export * from "./navigator";
export * from "./provider";
export * from "./providerRegistry";
export * from "./speechNavigator";
export * from "./utterance";
export * from "./gnd";
export * from "./utterances";
export * from "./preferences";