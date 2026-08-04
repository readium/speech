import { GndObject } from '../gnd/types.js';
export interface ResolvedNodeText {
    plain?: string;
    ssml?: string;
    language?: string;
}
/**
 * Resolves a `GndObject.text` value (a plain string, or a `GndText`
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
 * is dropped entirely rather than reported as a duplicate of `plain`.
 *
 * `language` is carried alongside either variant: the GND converter attaches
 * the nearest ancestor's declared language (e.g. `<html lang="fr">`) to every
 * text node under it, so this is the only place that document-declared
 * language would otherwise be lost.
 */
export declare function resolveNodeText(text: GndObject["text"]): ResolvedNodeText | undefined;
export declare function stripSsmlTags(ssml: string): string;
export interface LangSegment {
    plain: string;
    language?: string;
}
export declare function hasLangTag(ssml: string): boolean;
/**
 * Splits an SSML string into per-language runs of plain text (`format:
 * "plain"` has no `<lang>` markup, so a language shift mid-string becomes
 * separate segments instead). Punctuation touching a `<lang>` boundary —
 * separated by nothing or only whitespace — joins the tagged run rather
 * than staying with its lexical run: close-punct after `</lang>` joins the
 * run that just closed, open-punct before `<lang>` joins the run about to
 * start.
 */
export declare function splitOnLangTags(ssml: string, baseLanguage: string | undefined): LangSegment[];
export interface SsmlSegment {
    ssml?: string;
    placeholderId?: string;
}
export declare function hasPlaceholder(ssml: string): boolean;
/**
 * Splits a raw (pre-`stripPlaceholders`) SSML string on its embedded
 * `<readium:TAG id="...">` placeholders, for `inlineContextualization`: each
 * placeholder becomes its own segment (resolved via the `GndObject` sharing
 * its `id`) instead of being spoken after the whole enclosing text.
 */
export declare function splitOnPlaceholders(ssml: string): SsmlSegment[];
