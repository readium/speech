import { i18n } from 'i18next';
import { GuidedNavigationObject } from '@readium/shared';
import { GndRole } from '@readium/guided-navigation';
import { LocatorOptions } from '../decorator/createLocator.js';
import { ReadiumSpeechUtterance } from '../utterance.js';
import { SentenceSegmenter } from './sentenceSegmenter.js';
import { ExtractionFormat, ExtractUtterancesOptions, LanguageMode, Segmentation, SubstitutionTable } from './types.js';
export interface WalkContext {
    i18n: i18n;
    skip: ReadonlySet<GndRole>;
    contextualize: ReadonlySet<GndRole>;
    contextualizationShapes: Partial<Record<GndRole, "inline" | "block">>;
    contextualizationParams?: (role: GndRole, node: GuidedNavigationObject) => Record<string, string> | undefined;
    format: ExtractionFormat;
    inlineContextualization: boolean;
    language?: LanguageMode;
    segmentation: Segmentation;
    segmentationSuppressions: Record<string, string[]>;
    segmenter: SentenceSegmenter;
    substitutions: SubstitutionTable;
    blockStarts: Set<ReadiumSpeechUtterance>;
    tableRowNumbers: Map<GuidedNavigationObject, number>;
    tableCellHeaders: Map<GuidedNavigationObject, string>;
    synthetic: Set<ReadiumSpeechUtterance>;
    ancestorChains: Map<GuidedNavigationObject, GuidedNavigationObject[]>;
    pendingRange: Map<ReadiumSpeechUtterance, {
        start: number;
        end: number;
    }>;
    edgeSubstitutedLocate: WeakMap<ReadiumSpeechUtterance, {
        leading?: LocatorOptions;
        trailing?: LocatorOptions;
    }>;
}
export type SourceTrace = (GuidedNavigationObject | [GuidedNavigationObject, GuidedNavigationObject] | undefined)[];
export declare const blockLevelRoleSet: ReadonlySet<GndRole>;
export declare const deferrablePlaceholderRoleSet: ReadonlySet<GndRole>;
export declare const descriptionFoldingRoleSet: ReadonlySet<GndRole>;
export declare const valueFoldingRoleSet: ReadonlySet<GndRole>;
export declare const contentlessRoleSet: ReadonlySet<GndRole>;
export declare function makeWalkContext(nodes: GuidedNavigationObject[], options: ExtractUtterancesOptions): Promise<WalkContext>;
