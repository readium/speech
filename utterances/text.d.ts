import { GuidedNavigationObject } from '@readium/shared';
import { SsmlElement } from './ssml.js';
import { SubstitutionTable } from './types.js';
export interface ResolvedNodeText {
    plain?: string;
    ssml?: string;
    language?: string;
}
/**
 * Resolves a `GuidedNavigationObject.text` value (a `GuidedNavigationText`
 * carrying separate plain/SSML variants) into the shape an utterance needs.
 *
 * Mirrors the Readium text object as-is: `plain` and `ssml` are independent
 * alternatives, not one derived from the other, so both are passed through
 * whenever the source provides both (e.g. a footnote reference, where the
 * SSML carries an embedded `<readium:noteref>` placeholder and the plain
 * variant already omits it). The SSML variant gets `stripPlaceholders`
 * applied first, since this extractor speaks referenced objects (noterefs,
 * pagebreaks) separately via the normal children walk rather than inline —
 * and if stripping a placeholder leaves no actual SSML markup behind, `ssml`
 * is dropped rather than reported as a duplicate of `plain`, standing in for
 * `plain` when the source provides none.
 *
 * `language` is carried alongside either variant: the GND converter attaches
 * the nearest ancestor's declared language (e.g. `<html lang="fr">`) to every
 * text node under it, so this is the only place that document-declared
 * language would otherwise be lost.
 */
export declare function resolveNodeText(text: GuidedNavigationObject["text"]): ResolvedNodeText | undefined;
export declare function substituteWithMap(text: string, table: SubstitutionTable): {
    text: string;
    map: number[];
};
export declare function substitutedIndexToSourceIndex(map: number[], substitutedIndex: number): number;
export interface SsmlSubstitutionResult {
    ssml: string;
    plain: string;
    map: number[];
}
export declare function substituteSsmlText(ssml: string, table: SubstitutionTable): SsmlSubstitutionResult;
export interface LangSegment {
    plain: string;
    language?: string;
}
export declare function hasLangTag(ssml: string): boolean;
/**
 * Splits an SSML string into per-language runs of plain text (`format:
 * "plain"` has no `<lang>` markup, so a language shift mid-string becomes
 * separate segments instead). Punctuation touching a `<lang>` boundary —
 * separated by nothing or only whitespace — joins the nested run rather
 * than staying with its lexical run: close-punct after `</lang>` joins the
 * run that just closed, open-punct before `<lang>` joins the run about to
 * start. Text in nested elements declaring a language (`<lang>`, or `xml:lang` on `<p>`, `<s>`...) takes the innermost one's.
 */
export declare function splitOnLangTags(ssml: string, baseLanguage: string | undefined): LangSegment[];
export interface SsmlSegment {
    ssml?: string;
    open?: SsmlElement[];
    close?: SsmlElement[];
    placeholderId?: string;
    textBefore?: string;
    textAfter?: string;
    language?: string;
    abbreviation?: "text" | "alias";
    abbreviationText?: string;
    parenthesizedSsml?: string;
    touchesPrevious?: boolean;
}
export declare function hasPlaceholder(ssml: string): boolean;
export declare function removeEmptiedPairs(ssml: string, isDropped: (id: string) => boolean, language: string | undefined): {
    ssml: string;
    spaced: Set<string>;
};
export declare function enclosedPlaceholders(ssml: string, language: string | undefined): Set<string>;
export declare function keepsSpaceBefore(text: string, language: string | undefined): boolean;
/**
 * Splits a raw (pre-`stripPlaceholders`) SSML string on its embedded
 * `<readium:TAG id="...">` placeholders and `<sub alias>` abbreviations, for `interruptions`: each
 * placeholder becomes its own segment (resolved via the `GuidedNavigationObject` sharing
 * its `id`) instead of being spoken after the whole enclosing text.
 */
export declare function splitOnPlaceholders(ssml: string): SsmlSegment[];
