import { GuidedNavigationObject } from '@readium/shared';
import { LocatorOptions } from '../decorator/createLocator.js';
import { ReadiumSpeechUtterance } from '../utterance.js';
import { SsmlElement } from './ssml.js';
import { SourceSpan } from './sourceSpans.js';
import { SourceTrace } from './walkContext.js';
export type PieceSpacing = "touching" | "spaced" | undefined;
export interface Placement {
    node: GuidedNavigationObject;
    kind?: "inline" | "after" | "alias";
    abbreviation?: string;
}
export interface PieceTags {
    open: SsmlElement[];
    close: SsmlElement[];
    around: SsmlElement[];
}
export interface Piece {
    plain?: string;
    ssml?: string;
    language?: string;
    locate?: LocatorOptions;
    source?: SourceTrace[number];
    spans?: SourceSpan[];
    synthetic?: boolean;
    blockStart?: boolean;
    placement?: Placement;
    spacing?: PieceSpacing;
    tags?: PieceTags;
    enclosingLanguage?: string;
    edgeLocates?: {
        leading?: LocatorOptions;
        trailing?: LocatorOptions;
    };
}
export declare function toUtterance(piece: Piece): ReadiumSpeechUtterance;
export declare function nestTags(pieces: Piece[], around: SsmlElement[]): void;
export declare function balancedSsml(piece: Piece): string;
export declare function encloseOwnTags(piece: Piece): void;
export declare function joinPieceTexts(parts: string[], spacing?: PieceSpacing[]): {
    joined: string;
    ranges: {
        start: number;
        end: number;
    }[];
};
export declare function joinPieceSsml(pieces: Piece[], texts: string[], plainParts: string[], ranges: {
    start: number;
    end: number;
}[]): string;
