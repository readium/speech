import { ReadiumSpeechPlaybackEvent } from "../navigator";

// `recoverable` is set on the event's detail by the engine that emitted it (e.g. SpeechServer's
// toErrorDetail). Engines that don't set it are treated as non-recoverable.
export function isRecoverableFailure(event: ReadiumSpeechPlaybackEvent): boolean {
  return event.detail?.recoverable === true;
}
