import { SpeechServerAudioFormat } from './types';
export type CanPlayTypeResult = "probably" | "maybe" | "";
export type CanPlayType = (mime: string) => CanPlayTypeResult;
export declare function mimeTypeForFormat(format: string): string;
export interface SpeechServerFormatOptions {
    preferredFormat?: SpeechServerAudioFormat | (string & {});
    strategy?: "quality" | "bandwidth";
    adaptBitrateToNetwork?: boolean;
}
export declare function selectFormat(output: {
    formats: string[];
    default: string;
}, options: Pick<SpeechServerFormatOptions, "preferredFormat" | "strategy">, canPlay: CanPlayType): string;
export interface NetworkInfo {
    saveData?: boolean;
    effectiveType?: string;
}
export declare function selectBitrate(format: string, adaptBitrateToNetwork: boolean, network: NetworkInfo | undefined): number | undefined;
