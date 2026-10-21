// Fixture scope and comparison rules (fixtures/README.md), shared by the generator, test/ and the playground.
// No fs or library import: it runs in Node, ava and the browser alike.

// Expected output depends on aria substitution, which gnd.json can't carry: parsed from input markup instead.
export const parsedInputFixtures = new Set([
  "accessible-name-labelledby-aria-hidden",
  "accessible-name-labelledby-hidden-attribute",
]);

// Role pools from a @readium/speech module (`build/` or `src/`).
export function roleListsFrom(mod) {
  return {
    // skippedAtVerbosity.none reaches beyond roles.md's skippable-roles list (e.g. `audio`, `table`).
    skippableRoles: [...new Set([...mod.skippableRoles, ...(mod.skippedAtVerbosity?.none ?? [])])],
    contextualizableRoles: Object.keys(mod.defaultContextualizations ?? {}),
    shapeableRoles: [...(mod.shapeableRoles ?? [])],
    interruptionRoles: [...(mod.interruptionRoles ?? [])],
  };
}

// gnd.json holds one object, or `{ children: [...] }` for several top-level siblings.
export function fixtureTopLevel(gnd) {
  if (gnd && typeof gnd === "object" && !Array.isArray(gnd)) {
    const keys = Object.keys(gnd);
    if (keys.length === 1 && keys[0] === "children") return gnd.children;
  }
  return [gnd];
}

// Fixture JSON is cross-platform, so it never carries implementation-specific selector output.
export function stripLocatorDetails(value) {
  if (Array.isArray(value)) return value.map(stripLocatorDetails);
  if (value && typeof value === "object") {
    const out = {};
    for (const [key, val] of Object.entries(value)) {
      if (key === "textref" || key === "locate" || key === "offsets") continue;
      out[key] = stripLocatorDetails(val);
    }
    return out;
  }
  return value;
}

export function sortKeysDeep(value) {
  if (Array.isArray(value)) return value.map(sortKeysDeep);
  if (value && typeof value === "object") {
    return Object.keys(value)
      .sort()
      .reduce((acc, key) => {
        acc[key] = sortKeysDeep(value[key]);
        return acc;
      }, {});
  }
  return value;
}

export function sameJson(a, b) {
  return JSON.stringify(sortKeysDeep(a)) === JSON.stringify(sortKeysDeep(b));
}

// An abbreviation is a `<sub alias>` in its node's text, not a node of its own.
export function collectRoles(nodes, acc = new Set()) {
  for (const node of nodes) {
    for (const role of node.role ?? []) acc.add(role);
    if (/<sub\s+alias=/.test(node.text?.ssml ?? "")) acc.add("abbreviation");
    if (node.children) collectRoles(node.children, acc);
  }
  return acc;
}

// The full powerset of `items` — typically 0-3 entries, so naive is fine.
export function subsets(items) {
  return items.reduce((acc, item) => acc.concat(acc.map((set) => [...set, item])), [[]]);
}

// Every `interruptions` map over `roles`, "after" (the default) left unset.
function interruptionSettings(roles) {
  return roles.reduce(
    (acc, role) => acc.flatMap((settings) => [settings, { ...settings, [role]: "never" }, { ...settings, [role]: "inline" }]),
    [{}],
  );
}

// Pool order is the order stored option sets list their roles in.
function fixtureScope(rolesInTree, lists) {
  return {
    skip: lists.skippableRoles.filter((role) => rolesInTree.has(role)),
    contextualize: [...rolesInTree].filter((role) => lists.contextualizableRoles.includes(role)),
    interruptions: lists.interruptionRoles.filter((role) => rolesInTree.has(role)),
  };
}

// Shape only matters for a role that's contextualized and not skipped.
function shapeableIn(contextualize, skip, lists) {
  return contextualize.filter((role) => lists.shapeableRoles.includes(role) && !skip.includes(role));
}

const languageValues = [undefined, "always", "block-level", "none"];
const segmentationModeValues = [undefined, "sentence"];

function buildOptions(format, { skip, contextualize, inlineRoles, language, interruptions, segmentationMode }) {
  const options = { format };
  if (skip.length > 0) options.skip = skip;
  if (contextualize.length > 0) options.contextualize = contextualize;
  if (inlineRoles.length > 0) {
    options.contextualization = { shapes: Object.fromEntries(inlineRoles.map((role) => [role, "inline"])) };
  }
  if (language !== undefined) options.language = language;
  if (Object.keys(interruptions).length > 0) options.interruptions = interruptions;
  if (segmentationMode !== undefined) options.segmentation = { mode: segmentationMode };
  return options;
}

// Every in-scope option set for `format` except the bare `{ format }` default.
export function* optionSpace(format, rolesInTree, lists) {
  const scope = fixtureScope(rolesInTree, lists);
  for (const skip of subsets(scope.skip)) {
    for (const contextualize of subsets(scope.contextualize)) {
      for (const inlineRoles of subsets(shapeableIn(contextualize, skip, lists))) {
        for (const language of languageValues) {
          for (const interruptions of interruptionSettings(scope.interruptions)) {
            for (const segmentationMode of segmentationModeValues) {
              const isDefault =
                skip.length === 0 &&
                contextualize.length === 0 &&
                inlineRoles.length === 0 &&
                language === undefined &&
                Object.keys(interruptions).length === 0 &&
                segmentationMode === undefined;
              if (isDefault) continue;
              yield buildOptions(format, { skip, contextualize, inlineRoles, language, interruptions, segmentationMode });
            }
          }
        }
      }
    }
  }
}

// Reduces any ExtractUtterancesOptions to the in-scope form optionSpace() yields.
export function canonicalOptions(options, rolesInTree, lists) {
  const scope = fixtureScope(rolesInTree, lists);
  const pick = (pool, roles) => pool.filter((role) => (roles ?? []).includes(role));
  const skip = pick(scope.skip, options.skip);
  const contextualize = pick(scope.contextualize, options.contextualize);
  const shapes = options.contextualization?.shapes ?? {};
  const inlineRoles = shapeableIn(contextualize, skip, lists).filter((role) => shapes[role] === "inline");
  const segmentationMode = options.segmentation?.mode === "sentence" ? "sentence" : undefined;
  const interruptions = {};
  for (const role of scope.interruptions) {
    const value = options.interruptions?.[role];
    if (value && value !== "after") interruptions[role] = value;
  }
  return buildOptions(options.format ?? "plain", {
    skip,
    contextualize,
    inlineRoles,
    language: options.language,
    interruptions,
    segmentationMode,
  });
}

// Role arrays are sets: compared regardless of order.
function sortedRoleArrays(options) {
  const out = { ...options };
  for (const key of ["skip", "contextualize"]) {
    if (out[key]) out[key] = [...out[key]].sort();
  }
  return out;
}

// An in-scope option set listed in no case equals the default (fixtures/README.md).
export function expectedCase(utterancesFile, options) {
  const target = sortedRoleArrays(options);
  const cases = utterancesFile.cases ?? [];
  const exact = cases.find((c) => c.options.some((o) => sameJson(sortedRoleArrays(o), target)));
  if (exact) return exact.utterances;
  return cases.find((c) => c.options.some((o) => sameJson(o, { format: options.format })))?.utterances;
}
