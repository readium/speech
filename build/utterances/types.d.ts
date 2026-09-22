import { GndObject, GndRole } from '../gnd/types.js';
import { SentenceSegmenter } from './sentenceSegmenter.js';
export type ExtractionFormat = "plain" | "ssml";
export type LanguageMode = "none" | "block-level" | "always";
export type Segmentation = "structure" | "sentence";
export type ContextualizationEntry = string | {
    [key: string]: ContextualizationEntry;
};
export type Contextualizations = Record<GndRole, ContextualizationEntry>;
export interface ContextualizationOptions {
    contextualizations?: Contextualizations;
    shapes?: Partial<Record<GndRole, "inline" | "block">>;
    params?: (role: GndRole, node: GndObject) => Record<string, string> | undefined;
}
export type SubstitutionRule = string | {
    pattern: RegExp;
    replace: string | ((...match: string[]) => string);
};
export type SubstitutionTable = Record<string, SubstitutionRule>;
export interface SegmentationOptions {
    mode?: Segmentation;
    suppressions?: Record<string, string[]>;
    segmenter?: SentenceSegmenter;
}
export interface ExtractUtterancesOptions {
    format?: ExtractionFormat;
    contextualization?: ContextualizationOptions;
    contextualizationLocale?: string;
    skip?: GndRole[];
    contextualize?: GndRole[];
    language?: LanguageMode;
    inlineContextualization?: boolean;
    segmentation?: SegmentationOptions;
    substitutions?: SubstitutionTable;
}
