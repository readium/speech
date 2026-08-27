export interface SpeechServerProblemDetails {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance?: string;
}

export class SpeechServerError extends Error {
  readonly status: number;
  readonly type?: string;
  readonly title?: string;
  readonly instance?: string;

  constructor(message: string, options: { status: number; type?: string; title?: string; instance?: string }) {
    super(message);
    this.name = "SpeechServerError";
    this.status = options.status;
    this.type = options.type;
    this.title = options.title;
    this.instance = options.instance;
  }
}

// Thrown when the buffer is projected to run dry and the pending chunk still hasn't resolved
// after the grace period (see SpeechServerEngineOptions.timeoutMs) — not a per-request timeout.
export class SpeechServerStallError extends SpeechServerError {
  constructor(message: string) {
    super(message, { status: 408, type: "https://readium.org/speech-server/error#stall", title: "Synthesis Stalled" });
    this.name = "SpeechServerStallError";
  }
}

// Thrown when a response arrived and parsed fine, but its audio payload couldn't be decoded —
// unlike SpeechServerError, no HTTP status applies here.
export class SpeechServerAudioDecodeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SpeechServerAudioDecodeError";
  }
}

// Thrown when fetch() itself rejects with a TypeError (request never reached the network) —
// tagged at the call site so it can't be confused with a TypeError from reading a response.
export class SpeechServerNetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SpeechServerNetworkError";
  }
}

// Server errors are RFC 9457 Problem Details, but nginx (production rate/connection
// limits) and network failures return plain text or nothing, so parsing is best-effort.
export async function toSpeechServerError(response: Response): Promise<SpeechServerError> {
  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("application/problem+json")) {
    try {
      const problem: SpeechServerProblemDetails = await response.json();
      return new SpeechServerError(problem.detail || problem.title || `Request failed with status ${response.status}`, {
        status: problem.status ?? response.status,
        type: problem.type,
        title: problem.title,
        instance: problem.instance
      });
    } catch {
      // Fall through to the generic error below.
    }
  }
  return new SpeechServerError(`Request failed with status ${response.status}`, { status: response.status });
}
