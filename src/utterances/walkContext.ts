import i18next, { type i18n } from "i18next";
import type { GndObject, GndRole } from "../gnd/types.js";
import type { ReadiumSpeechUtterance } from "../utterance.js";
import { builtInSubstitutions } from "./builtInSubstitutions.js";
import { contextualizationsForLocale } from "./contextualizations.js";
import type {
  ContextualizationEntry,
  Contextualizations,
  ExtractionFormat,
  ExtractUtterancesOptions,
  LanguageMode,
  Segmentation,
  SubstitutionTable,
} from "./types.js";
import {
  blockLevelRoles,
  deferrablePlaceholderRoles,
  descriptionFoldingRoles,
  valueFoldingRoles,
  contentlessRoles,
} from "./roles.js";

export interface WalkContext {
  // Backs only `resolvePluralPart()`'s `<role>.parts.<name>` lookups.
  i18n: i18n;
  skip: ReadonlySet<GndRole>;
  contextualize: ReadonlySet<GndRole>;
  // Per-role contextualization shape overrides for this call — see
  // `ExtractUtterancesOptions.contextualization.shapes`.
  contextualizationShapes: Partial<Record<GndRole, "inline" | "block">>;
  // See `ExtractUtterancesOptions.contextualization.params`.
  contextualizationParams?: (role: GndRole, node: GndObject) => Record<string, string> | undefined;
  format: ExtractionFormat;
  inlineContextualization: boolean;
  language?: LanguageMode;
  segmentation: Segmentation;
  segmentationSuppressions: Record<string, string[]>;
  // See `ExtractUtterancesOptions.substitutions`.
  substitutions: SubstitutionTable;
  // Tracked by object identity rather than threaded as a parallel array,
  // since utterances get merged/reordered across several local `out` arrays
  // (pieces, inner, ...) before reaching the caller's own `out`.
  blockStarts: Set<ReadiumSpeechUtterance>;
  // Populated from a table node the moment it's reached, then read back as
  // its rows/cells are walked — same identity-keyed, single-call-scoped
  // pattern as `blockStarts`.
  tableRowNumbers: Map<GndObject, number>;
  tableCellHeaders: Map<GndObject, string>;
  // Identity-keyed synthesized-label tracking, same reason as `blockStarts`.
  synthetic: Set<ReadiumSpeechUtterance>;
  // Every node's own ancestors (nearest first) — see `resolveNodeLocate()`.
  ancestorChains: Map<GndObject, GndObject[]>;
  // A language-split utterance's position in its source node's own text
  // (see `applyFormat`) — read back by `attachLocate()`, same identity-keyed pattern.
  pendingRange: Map<ReadiumSpeechUtterance, { start: number; end: number }>;
}

// Parallel to `out`: which node produced each utterance. A sentence
// reconstructed across sibling nodes carries a `[first, last]` tuple instead.
export type SourceTrace = (GndObject | [GndObject, GndObject] | undefined)[];

export const blockLevelRoleSet: ReadonlySet<GndRole> = new Set(blockLevelRoles);
export const deferrablePlaceholderRoleSet: ReadonlySet<GndRole> = new Set(deferrablePlaceholderRoles);
export const descriptionFoldingRoleSet: ReadonlySet<GndRole> = new Set(descriptionFoldingRoles);
export const valueFoldingRoleSet: ReadonlySet<GndRole> = new Set(valueFoldingRoles);
export const contentlessRoleSet: ReadonlySet<GndRole> = new Set(contentlessRoles);

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
// when the utterance's own source has none of its own (e.g. its text lives
// on an unroled child wrapping a link, whose own textref is that link's
// href, not a DOM locator — see textrefFragment.ts's decodeTextref()).
function buildAncestorChains(nodes: GndObject[], chain: GndObject[] = [], out = new Map<GndObject, GndObject[]>()): Map<GndObject, GndObject[]> {
  for (const node of nodes) {
    out.set(node, chain);
    if (node.children) buildAncestorChains(node.children, [node, ...chain], out);
  }
  return out;
}

export async function makeWalkContext(nodes: GndObject[], options: ExtractUtterancesOptions): Promise<WalkContext> {
  const locale = options.contextualizationLocale ?? "en";
  const contextualizations = mergeContextualizations(
    await contextualizationsForLocale(locale),
    options.contextualization?.contextualizations,
  );
  return {
    i18n: makeContextualizer(locale, contextualizations),
    skip: new Set(options.skip ?? []),
    contextualize: new Set(options.contextualize ?? []),
    contextualizationShapes: options.contextualization?.shapes ?? {},
    contextualizationParams: options.contextualization?.params,
    format: options.format ?? "plain",
    inlineContextualization: options.inlineContextualization ?? false,
    language: options.language ?? "block-level",
    segmentation: options.segmentation?.mode ?? "structure",
    // segmentSentences() already applies builtInSuppressions internally
    // (Intl.Segmenter has no built-in equivalent of its own) — this is only
    // the caller's own additive extras, per `SegmentationOptions.suppressions`.
    segmentationSuppressions: options.segmentation?.suppressions ?? {},
    // Per-key override, not an additive union — each key holds one whole rule.
    substitutions: { ...builtInSubstitutions, ...options.substitutions },
    blockStarts: new Set(),
    tableRowNumbers: new Map(),
    tableCellHeaders: new Map(),
    synthetic: new Set(),
    ancestorChains: buildAncestorChains(nodes),
    pendingRange: new Map(),
  };
}
