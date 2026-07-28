import test from "ava";
import { SpeechServerEngineProvider } from "../../build/index.js";
import { createMockFetch, makeServerVoice, problemDetails } from "./testUtils.js";

test("getVoices maps server voices into ReadiumSpeechVoice shape and caches", async (t) => {
  const { fetchImpl, calls } = createMockFetch({
    voices: () => [
      makeServerVoice(),
      makeServerVoice({
        name: "Estelle",
        originalName: "estelle",
        identifier: "urn:readium:tts:pocket:estelle",
        controls: { speed: true }
      })
    ]
  });
  const provider = new SpeechServerEngineProvider({ baseUrl: "http://localhost:8000", fetch: fetchImpl });

  const voices = await provider.getVoices();
  t.is(voices.length, 2);
  t.is(voices[0].source, "server");
  t.is(voices[0].identifier, "urn:readium:tts:pocket:alba");
  t.is(voices[0].provider, "pocket");
  t.deepEqual(voices[1].controls, { speed: true });

  await provider.getVoices();
  t.is(calls.filter(c => c.url.endsWith("/voices")).length, 1, "second call is served from cache, not refetched");
});

test("getVoices throws a SpeechServerError carrying the server's problem details on a non-ok response", async (t) => {
  const { fetchImpl } = createMockFetch({
    voices: () => ({
      status: 404,
      ok: false,
      json: problemDetails({ detail: "No voices installed." }),
      contentType: "application/problem+json"
    })
  });
  const provider = new SpeechServerEngineProvider({ baseUrl: "http://localhost:8000", fetch: fetchImpl });

  const error = await t.throwsAsync(() => provider.getVoices());
  t.is((error as any).status, 404);
  t.is((error as any).message, "No voices installed.");
});

test("createEngine seeds the engine's voice cache from an already-fetched voice list, without refetching", async (t) => {
  const { fetchImpl, calls } = createMockFetch({
    voices: () => [makeServerVoice()]
  });
  const provider = new SpeechServerEngineProvider({ baseUrl: "http://localhost:8000", fetch: fetchImpl });
  await provider.getVoices();

  const engine = await provider.createEngine("urn:readium:tts:pocket:alba");
  const voices = await engine.getAvailableVoices();

  t.is(voices.length, 1);
  t.is(calls.filter(c => c.url.endsWith("/voices")).length, 1, "engine reused the provider's cached voices");
  t.is(engine.getCurrentVoice()?.identifier, "urn:readium:tts:pocket:alba");
});

test("createEngine without a prior getVoices call still lets the engine fetch its own voices lazily", async (t) => {
  const { fetchImpl } = createMockFetch({ voices: () => [makeServerVoice()] });
  const provider = new SpeechServerEngineProvider({ baseUrl: "http://localhost:8000", fetch: fetchImpl });

  const engine = await provider.createEngine();
  const voices = await engine.getAvailableVoices();
  t.is(voices.length, 1);
});
