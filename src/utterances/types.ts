import type { GndRole } from "../gnd/types.js";

// Synthesized navigational text the extractor adds around a node, keyed by
// `GndRole` and resolved via i18next (`<role>.inline`, `<role>.block.start`/
// `.end`, nested variants, `<role>.parts.*_one`/`*_other` plurals).
export type ContextualizationEntry = string | { [key: string]: ContextualizationEntry };

export type Contextualizations = Record<GndRole, ContextualizationEntry>;

export interface ExtractUtterancesOptions {
  // Every extraction is fully plain or fully SSML, never a per-node
  // passthrough of "whatever the node happens to have". Forces exactly
  // one field on every utterance, synthesizing it when a node only
  // naturally has the other (escape plain into ssml with no markup;
  // strip tags/placeholders from ssml into plain). Default "plain".
  format?: "plain" | "ssml";

  // A plain string index signature (not `Partial<Contextualizations>`):
  // callers can supply any subset of keys, known or new, without needing
  // an `| undefined` on every value.
  contextualizations?: Contextualizations;

  // Locale of the contextualization catalog (wording + plural rules).
  // Falls back to "en". Distinct from `language` below, which governs the
  // content's own inline spans, not the catalog's.
  contextualizationLocale?: string;

  // Roles to omit entirely (the node and its whole subtree) from the
  // output, e.g. so a reader can skip past footnotes or navigational aids
  // during playback. See `skippableRoles` for the roles.md-documented set.
  // Nothing is skipped by default (`[]`).
  skip?: GndRole[];

  // Which roles get contextualized (still needs a `contextualizations`
  // catalog entry to say anything). Nothing is contextualized by default,
  // same as `skip` defaulting to nothing skipped — unlike `skip`, the
  // underlying content still plays.
  contextualize?: GndRole[];

  // Per-role contextualization shape overrides; a role absent here defaults
  // to "block". No effect outside `contextualize` or on inline-only roles.
  contextualizationShapes?: Partial<Record<GndRole, "inline" | "block">>;

  // Which language declarations in the *input* the extraction respects.
  // This never merges separate sibling nodes into one utterance — each
  // already has its own utterance and keeps it regardless — it only
  // changes how *a single node's own* inline language spans (e.g.
  // `<em lang="fr">`, embedded as SSML `<lang>` tags by the GND converter)
  // are treated:
  //  - "always" or omitted: honor them as declared — `ssml` keeps spans
  //    tagged in one string; `plain` splits into one utterance per
  //    language run instead.
  //  - "block-level": ignore a node's own inline spans — merge their text
  //    into the surrounding utterance untagged, keeping only that node's
  //    own (block-level) `language`.
  //  - "none": same merging as "block-level", and every utterance's
  //    `language` is dropped entirely — the whole document is being
  //    treated as one language, so nothing gets tagged at all.
  language?: "none" | "block-level" | "always";

  // Whether a pagebreak/footnote placeholder that falls mid-sentence
  // splits the enclosing utterance at that exact point (contextualization/
  // content spoken *during* the sentence) instead of after the whole
  // sentence finishes (default, `false` — today's only behavior, for
  // either `format`).
  inlineContextualization?: boolean;
}
