// Shared mock-fetch helper for SpeechServer tests. Mimics only what
// SpeechServerEngine/SpeechServerEngineProvider actually call on a Response:
// `.ok`, `.status`, `.headers.get(...)`, `.json()`.

export interface MockFetchCall {
  url: string;
  init?: any;
}

export interface MockFetchResult {
  status?: number;
  ok?: boolean;
  json: any;
  contentType?: string;
}

// Handlers may return a Promise — e.g. one that resolves after a delay, or never resolves at
// all — to simulate a slow or hung request for stall-detection tests.
export interface MockFetchHandlers {
  voices?: () => any[] | MockFetchResult | Promise<any[] | MockFetchResult>;
  synthesize?: (body: any) => MockFetchResult | Promise<MockFetchResult>;
  service?: () => MockFetchResult | Promise<MockFetchResult>;
}

export function defaultServiceInfo() {
  return {
    output: { formats: ["wav", "mp3", "opus"], default: "wav" },
    limits: { maxTextLength: 2000, maxConcurrentSyntheses: 2 },
    providers: [{ id: "pocket", installedLanguages: ["en"] }]
  };
}

function mockResponse(status: number, ok: boolean, data: any, contentType: string) {
  return {
    ok,
    status,
    headers: { get: (name: string) => (name.toLowerCase() === "content-type" ? contentType : null) },
    json: async () => data
  };
}

export function createMockFetch(handlers: MockFetchHandlers) {
  const calls: MockFetchCall[] = [];

  const fetchImpl = (async (url: string, init?: any) => {
    calls.push({ url, init });

    if (url.endsWith("/voices")) {
      const result = handlers.voices ? await handlers.voices() : [];
      if (Array.isArray(result)) {
        return mockResponse(200, true, result, "application/json");
      }
      return mockResponse(result.status ?? 200, result.ok ?? true, result.json, result.contentType ?? "application/json");
    }

    if (url.endsWith("/synthesize")) {
      const body = init?.body ? JSON.parse(init.body) : {};
      const result: MockFetchResult = handlers.synthesize
        ? await handlers.synthesize(body)
        : { json: { audio: "", format: "wav", boundaries: null } };
      return mockResponse(result.status ?? 200, result.ok ?? true, result.json, result.contentType ?? "application/json");
    }

    if (url.endsWith("/service")) {
      const result: MockFetchResult = handlers.service ? await handlers.service() : { json: defaultServiceInfo() };
      return mockResponse(result.status ?? 200, result.ok ?? true, result.json, result.contentType ?? "application/json");
    }

    throw new Error(`Unhandled mock fetch URL: ${url}`);
  }) as unknown as typeof fetch;

  return { fetchImpl, calls };
}

export function makeServerVoice(overrides: Record<string, any> = {}) {
  return {
    name: "Alba",
    originalName: "alba",
    provider: "pocket",
    identifier: "urn:readium:tts:pocket:alba",
    language: "en-US",
    otherLanguages: [],
    gender: "female",
    quality: "veryHigh",
    controls: {},
    ...overrides
  };
}

export function problemDetails(overrides: Record<string, any> = {}) {
  return {
    type: "urn:example:voice-not-found",
    title: "Voice Not Found",
    status: 404,
    detail: "Voice not found.",
    instance: "urn:uuid:test",
    ...overrides
  };
}

export function wavBase64(): string {
  return Buffer.from("RIFF-fake-wav-bytes").toString("base64");
}

export async function flush(): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 0));
  await new Promise(resolve => setTimeout(resolve, 0));
}
