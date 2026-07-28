import { TGender, TQuality, TServerVoiceControls } from "../voices/types";

export interface SpeechServerVoice {
  name: string;
  originalName: string;
  provider: string;
  identifier: string;
  language: string;
  otherLanguages?: string[];
  gender?: TGender | null;
  quality?: TQuality;
  controls?: TServerVoiceControls;
}

export interface SpeechServerTimingMark {
  name: "word" | "sentence";
  charIndex: number;
  charLength: number;
  elapsedTime: number;
}

export type SpeechServerAudioFormat = "wav" | "mp3" | "opus";

export interface SpeechServerSynthesizeRequest {
  id?: string;
  text: string;
  ssml?: boolean;
  language?: string;
  voice?: string;
  prev_utterance?: string;
  next_utterance?: string;
  publication_id?: string;
  boundary?: boolean;
  output?: {
    format?: SpeechServerAudioFormat;
    bitrate?: number | null;
    sample_rate?: number | null;
    speed?: number;
    pitch?: number | null;
  };
}

export interface SpeechServerSynthesizeBoundaryResponse {
  audio: string;
  format: SpeechServerAudioFormat;
  boundaries: SpeechServerTimingMark[] | null;
}

export interface SpeechServerServiceInfo {
  output: { formats: SpeechServerAudioFormat[]; default: SpeechServerAudioFormat };
  limits: { maxTextLength: number; maxConcurrentSyntheses: number };
  providers: { id: string; installedLanguages: string[] }[];
}
