import type { ReadiumSpeechPlaybackEvent } from "./navigator.js";

type PlaybackEventType = ReadiumSpeechPlaybackEvent["type"];

// A Record, so a new event type can't be left out.
const eventTypes: Record<PlaybackEventType, true> = {
  start: true, pause: true, resume: true, end: true, stop: true, skip: true, error: true,
  boundary: true, mark: true, idle: true, loading: true, ready: true, voiceschanged: true,
  languagefallback: true, enginefallback: true, enginerecovered: true
};

// Every playback event type except `excluded`.
export const playbackEventTypes = (...excluded: PlaybackEventType[]): PlaybackEventType[] =>
  (Object.keys(eventTypes) as PlaybackEventType[]).filter(type => !excluded.includes(type));
