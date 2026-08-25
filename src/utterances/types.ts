import type { GndRole } from "../gnd/types.js";

// Synthesized navigational text the extractor adds around a node (e.g.
// entering/leaving a footnote), as opposed to content utterances that
// speak the document's own text. Keyed by `GndRole`, a plain string since
// new roles gain entries over time.
//
// Each entry tags its shape via an `inline`/`block` key rather than
// inferring it from the value's type, so a role's shape stays predictable
// for Weblate/JSON tooling even if it changes later:
//  - absent: nothing to speak.
//  - `{ inline }`: one self-contained announcement, spoken once.
//  - `{ block: { start, end } }`: spoken before and after the node's content.
export type ContextualizationKey = string;

// A plain string speaks as-is (after `{{ token }}` substitution). A
// named-variants object (e.g. `{ labelled, unlabelled }`) picks one key's
// template based on context the caller supplies — the catalog can't know,
// e.g., whether a node has a description.
export type Contextualization = string | Record<string, string>;

export interface ContextualizationPair {
  start: Contextualization;
  end: Contextualization;
}

export type RoleContextualization = { inline: Contextualization } | { block: ContextualizationPair };

export function isBlockContextualization(a: RoleContextualization): a is { block: ContextualizationPair } {
  return "block" in a;
}

export type Contextualizations = Record<ContextualizationKey, RoleContextualization>;

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
