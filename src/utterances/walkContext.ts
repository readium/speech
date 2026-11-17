import i18next, { type i18n } from "i18next";
import type { GuidedNavigationObject } from "@readium/shared";
import type { GndRole } from "@readium/guided-navigation";
import type { LocatorOptions } from "../decorator/createLocator.js";
import { builtInSubstitutions } from "./builtInSubstitutions.js";
import { nodeRoles } from "./nodeFields.js";
import { catalogLocale, contextualizationsForLocale } from "./contextualizations.js";
import { segmentSentences, type SentenceSegmenter } from "./sentenceSegmenter.js";
import type {
  ContextualizationEntry,
  Contextualizations,
  ExtractionFormat,
  ExtractUtterancesOptions,
  Interruption,
  LanguageMode,
  Segmentation,
  SubstitutionTable,
} from "./types.js";
import {
  interruptionRoles,
  descriptionFoldingRoles,
  valueFoldingRoles,
  contentlessRoles,
  textReferenceRoles,
} from "./roles.js";

export interface WalkContext {
  // Backs only `resolvePluralPart()`'s `<role>.parts.<name>` lookups.
  i18n: i18n;
  // The language of `i18n`'s catalog, which every contextualization is spoken in.
  contextualizationLanguage: string;
  skip: ReadonlySet<GndRole>;
  contextualize: ReadonlySet<GndRole>;
  // Per-role contextualization shape overrides for this call — see
  // `ExtractUtterancesOptions.contextualization.shapes`.
  contextualizationShapes: Partial<Record<GndRole, "inline" | "block">>;
  // See `ExtractUtterancesOptions.contextualization.params`.
  contextualizationParams?: (role: GndRole, node: GuidedNavigationObject) => Record<string, string> | undefined;
  format: ExtractionFormat;
  interruptions: Partial<Record<GndRole, Interruption>>;
  language?: LanguageMode;
  languageOverrides: Record<string, string>;
  contentLanguage?: string;
  segmentation: Segmentation;
  segmentationReconstruct: boolean;
  segmentationSuppressions: Record<string, string[]>;
  segmenter: SentenceSegmenter;
  // See `ExtractUtterancesOptions.substitutions`.
  substitutions: SubstitutionTable;
  // Populated from a table node the moment it's reached, then read back as
  // its rows/cells are walked.
  tableRowNumbers: Map<GuidedNavigationObject, number>;
  tableCellHeaders: Map<GuidedNavigationObject, string>;
  // Every node's own ancestors (nearest first) — see `resolveNodeLocate()`.
  ancestorChains: Map<GuidedNavigationObject, GuidedNavigationObject[]>;
  // An abbreviation's alias locates: substituted like an aria label's, but prose that joins its sentence.
  aliasLocates: WeakSet<LocatorOptions>;
  // `term`s that start a block, like `<dt>`: a `definition` follows them among their siblings, unlike an inline `<dfn>`.
  blockTerms: WeakSet<GuidedNavigationObject>;
}

// Which node produced each utterance. A sentence
// reconstructed across sibling nodes carries a `[first, last]` tuple instead.
export type SourceTrace = (GuidedNavigationObject | [GuidedNavigationObject, GuidedNavigationObject] | undefined)[];

export const interruptionRoleSet: ReadonlySet<GndRole> = new Set(interruptionRoles);
export const descriptionFoldingRoleSet: ReadonlySet<GndRole> = new Set(descriptionFoldingRoles);
export const valueFoldingRoleSet: ReadonlySet<GndRole> = new Set(valueFoldingRoles);
export const contentlessRoleSet: ReadonlySet<GndRole> = new Set(contentlessRoles);
export const textReferenceRoleSet: ReadonlySet<GndRole> = new Set(textReferenceRoles);

// Synchronous: resources are supplied inline, no backend plugin involved.
function makeContextualizer(locale: string, contextualizations: Contextualizations): i18n {
  const instance = i18next.createInstance();
  instance.init({
    lng: locale,
    resources: { [locale]: { translation: contextualizations } },
    interpolation: { escapeValue: false },
  });
  return instance;
}

// A caller's override layers onto a built-in record key-by-key (rather than
// replacing it wholesale), with `mergeValue` deciding how each key's own
// base/override pair combines.
function mergeByKey<T>(base: Record<string, T>, override: Record<string, T> | undefined, mergeValue: (base: T | undefined, override: T) => T): Record<string, T> {
  if (!override) return base;
  const merged = { ...base };
  for (const key of Object.keys(override)) {
    merged[key] = mergeValue(base[key], override[key]);
  }
  return merged;
}

// A caller's override can target any depth (e.g. just `table.block.start`),
// so entries merge key-by-key rather than replacing a role's whole catalog
// entry wholesale.
function mergeContextualizationEntry(base: ContextualizationEntry | undefined, override: ContextualizationEntry): ContextualizationEntry {
  if (typeof override === "string" || typeof base !== "object") return override;
  const merged: { [key: string]: ContextualizationEntry } = { ...base };
  for (const key of Object.keys(override)) {
    merged[key] = mergeContextualizationEntry(base[key], override[key]);
  }
  return merged;
}

function mergeContextualizations(base: Contextualizations, override: Contextualizations | undefined): Contextualizations {
  return mergeByKey(base, override, mergeContextualizationEntry) as Contextualizations;
}

// Every node's own ancestors (nearest first), keyed by object identity —
// used by attachLocate() to fall back to an enclosing node's textref
// when the utterance's own source has none of its own (e.g. a link
// without a role, which gets no textref).
function buildAncestorChains(nodes: GuidedNavigationObject[], chain: GuidedNavigationObject[] = [], out = new Map<GuidedNavigationObject, GuidedNavigationObject[]>()): Map<GuidedNavigationObject, GuidedNavigationObject[]> {
  for (const node of nodes) {
    out.set(node, chain);
    if (node.children) buildAncestorChains(node.children, [node, ...chain], out);
  }
  return out;
}

function findBlockTerms(nodes: GuidedNavigationObject[], out = new WeakSet<GuidedNavigationObject>()): WeakSet<GuidedNavigationObject> {
  let next: GuidedNavigationObject | undefined;
  for (let i = nodes.length - 1; i >= 0; i--) {
    const node = nodes[i];
    if (!nodeRoles(node).includes("term")) next = node;
    else if (next && nodeRoles(next).includes("definition")) out.add(node);
    if (node.children) findBlockTerms(node.children, out);
  }
  return out;
}

export async function makeWalkContext(nodes: GuidedNavigationObject[], options: ExtractUtterancesOptions): Promise<WalkContext> {
  const locale = options.contextualizationLocale ?? "en";
  const contextualizations = mergeContextualizations(
    await contextualizationsForLocale(locale),
    options.contextualization?.contextualizations,
  );
  return {
    i18n: makeContextualizer(locale, contextualizations),
    contextualizationLanguage: catalogLocale(locale),
    skip: new Set(options.skip ?? []),
    contextualize: new Set(options.contextualize ?? []),
    contextualizationShapes: options.contextualization?.shapes ?? {},
    contextualizationParams: options.contextualization?.params,
    format: options.format ?? "plain",
    interruptions: options.interruptions ?? {},
    language: options.language ?? "block-level",
    languageOverrides: options.languageOverrides ?? {},
    contentLanguage: options.contentLanguage,
    segmentation: options.segmentation?.mode ?? "structure",
    segmentationReconstruct: options.segmentation?.reconstruct ?? false,
    // segmentSentences() already applies builtInSuppressions internally
    // (Intl.Segmenter has no built-in equivalent of its own) — this is only
    // the caller's own additive extras, per `SegmentationOptions.suppressions`.
    segmentationSuppressions: options.segmentation?.suppressions ?? {},
    segmenter: options.segmentation?.segmenter ?? segmentSentences,
    // Per-key override, not an additive union — each key holds one whole rule.
    substitutions: { ...builtInSubstitutions, ...options.substitutions },
    tableRowNumbers: new Map(),
    tableCellHeaders: new Map(),
    ancestorChains: buildAncestorChains(nodes),
    aliasLocates: new WeakSet(),
    blockTerms: findBlockTerms(nodes),
  };
}
