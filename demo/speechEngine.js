import { RoutingEngineProvider, SpeechServerEngineProvider, WebSpeechEngineProvider } from "../src/index.ts";

// The deployed server only accepts the deployed demos' origin, so development uses a local one.
const SPEECH_SERVER = import.meta.env.DEV ? "http://localhost:8000" : "https://speech-server.readium.org";

export const serverProvider = new SpeechServerEngineProvider({
  endpoints: {
    voices: `${SPEECH_SERVER}/voices`,
    synthesize: `${SPEECH_SERVER}/synthesize`,
    service: `${SPEECH_SERVER}/service`
  }
});

// Web Speech first, so content without a voice of its own is read with a browser voice.
export const engineProvider = new RoutingEngineProvider({
  providers: [new WebSpeechEngineProvider(), serverProvider]
});

// The server's voices speaking `language`, none when it can't be reached.
export async function serverVoices(language) {
  const voices = await serverProvider.getVoices().catch(() => []);
  return voices.filter((voice) => [voice.language, ...(voice.otherLanguages ?? [])].some((tag) => tag.split("-")[0] === language));
}
