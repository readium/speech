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
