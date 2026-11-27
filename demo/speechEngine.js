import { FallbackEngineProvider, RoutingEngineProvider, SpeechServerEngineProvider, WebSpeechEngineProvider } from "../src/index.ts";

// The deployed server only accepts the deployed demos' origin, so development uses a local one.
const SPEECH_SERVER = import.meta.env.DEV ? "http://localhost:8000" : "https://speech-server.readium.org";

export const serverProvider = new SpeechServerEngineProvider({
  endpoints: {
    voices: `${SPEECH_SERVER}/voices`,
    synthesize: `${SPEECH_SERVER}/synthesize`,
    service: `${SPEECH_SERVER}/service`
  },
  voiceProviders: ["pocket"],
  format: { strategy: "bandwidth", adaptBitrateToNetwork: true }
});

export const webSpeechProvider = new WebSpeechEngineProvider();

// Web Speech first, so content without a voice of its own is read with a browser voice.
export const engineProvider = new RoutingEngineProvider({
  providers: [webSpeechProvider, new FallbackEngineProvider({ primary: serverProvider, fallback: webSpeechProvider, onFailure: "fallbackAndRecover" })]
});

// Server voices fail with an error instead of switching to a browser voice.
export const serverEngineProvider = new RoutingEngineProvider({
  providers: [webSpeechProvider, serverProvider]
});

// The server's voices speaking `language`; rejects when the server can't be reached.
export async function serverVoices(language) {
  const voices = await serverProvider.getVoices();
  return voices.filter((voice) => [voice.language, ...(voice.otherLanguages ?? [])].some((tag) => tag.split("-")[0] === language));
}
