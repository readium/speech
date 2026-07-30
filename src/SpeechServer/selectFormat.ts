import { SpeechServerAudioFormat } from "./types";

// Mirrors HTMLAudioElement.canPlayType's return type exactly, so this module stays decoupled
// from lib.dom and is callable with a fake predicate in non-browser test environments.
export type CanPlayTypeResult = "probably" | "maybe" | "";
export type CanPlayType = (mime: string) => CanPlayTypeResult;

// Operates on plain `string`, not the narrower SpeechServerAudioFormat union, so an
// unrecognized format is still handled rather than mislabeled or dropped.
const MIME_TYPES: Record<string, string> = {
  wav: "audio/wav",
  mp3: "audio/mpeg",
  opus: "audio/ogg",
  ogg: "audio/ogg",
  aac: "audio/aac",
  flac: "audio/flac",
  webm: "audio/webm",
  m4a: "audio/mp4"
};

export function mimeTypeForFormat(format: string): string {
  return MIME_TYPES[format] ?? `audio/${format}`;
}

export interface SpeechServerFormatOptions {
  // Used only if the server advertises it and canPlay() reports it playable; else falls back
  // to automatic selection below.
  preferredFormat?: SpeechServerAudioFormat | (string & {});
  // Ranks the playable intersection when no preferredFormat wins: "quality" (default) prefers
  // lossless/higher-fidelity first; "bandwidth" prefers smaller-transfer first.
  strategy?: "quality" | "bandwidth";
  // Opt-in (default false, Network Information API is Chromium-only): reduces requested
  // bitrate for compressed formats on a Save-Data/2G-class connection.
  adaptBitrateToNetwork?: boolean;
}

// Least-lossy first. Judgment calls, not measured against real encoder quality-per-byte curves.
const QUALITY_RANK = ["flac", "wav", "opus", "aac", "ogg", "webm", "mp3"];
// Smallest-transfer first.
const BANDWIDTH_RANK = ["opus", "aac", "webm", "ogg", "mp3", "wav", "flac"];

export function selectFormat(
  output: { formats: string[]; default: string },
  options: Pick<SpeechServerFormatOptions, "preferredFormat" | "strategy">,
  canPlay: CanPlayType
): string {
  const isPlayable = (format: string): boolean => canPlay(mimeTypeForFormat(format)) !== "";
  const playable = output.formats.filter(isPlayable);

  if (options.preferredFormat && playable.includes(options.preferredFormat)) {
    return options.preferredFormat;
  }

  const knownRank = options.strategy === "bandwidth" ? BANDWIDTH_RANK : QUALITY_RANK;
  // Playable formats outside the known rank tables are still eligible, just ordered last.
  const rank = [...knownRank, ...playable.filter(format => !knownRank.includes(format))];
  for (const format of rank) {
    if (playable.includes(format)) {
      return format;
    }
  }

  // Nothing playable — fall back to the server's default and let onerror surface the failure.
  return output.default;
}

export interface NetworkInfo {
  saveData?: boolean;
  effectiveType?: string;
}

const LOSSLESS_FORMATS = new Set(["wav", "flac"]);

// Unmeasured, conservative defaults; a format with no entry here just gets no adaptation.
const REDUCED_BITRATE: Record<string, number> = {
  mp3: 48000,
  opus: 24000,
  aac: 48000,
  ogg: 48000,
  webm: 32000
};

export function selectBitrate(
  format: string,
  adaptBitrateToNetwork: boolean,
  network: NetworkInfo | undefined
): number | undefined {
  if (LOSSLESS_FORMATS.has(format) || !adaptBitrateToNetwork || !network) {
    return undefined;
  }
  const isConstrained = network.saveData === true || /2g/.test(network.effectiveType ?? "");
  return isConstrained ? REDUCED_BITRATE[format] : undefined;
}
