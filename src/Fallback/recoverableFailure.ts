import { ReadiumSpeechPlaybackEvent } from "../navigator";

// Convention for an "error" event's detail: an engine must set `recoverable: true` only when
// it never actually reached the server/API (network failure, timeout) — false otherwise,
// including when nothing sets it at all. See isRecoverableFailure(). status/type/title/instance
// are SpeechServer-specific (RFC 9457 Problem Details), present only for a structured server
// response — other engines aren't expected to set them.
export interface ErrorEventDetail {
  message: string;
  recoverable: boolean;
  status?: number;
  type?: string;
  title?: string;
  instance?: string;
}

// `recoverable` is set on the event's detail by the engine that emitted it (e.g. SpeechServer's
// toErrorDetail). Engines that don't set it are treated as non-recoverable.
export function isRecoverableFailure(event: ReadiumSpeechPlaybackEvent): boolean {
  return event.detail?.recoverable === true;
}
