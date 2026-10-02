import { mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { JSDOM } from "jsdom";
import { GuidedNavigationObject } from "@readium/shared";
import { parseMarkup } from "@readium/guided-navigation";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FIXTURES_DIR = path.join(__dirname, "../fixtures");
const GND_FIXTURES_DIR = path.join(__dirname, "../node_modules/@readium/guided-navigation/fixtures");

// Plain Node has no native DOM: these are the globals @readium/guided-navigation needs.
const { window } = new JSDOM("", { url: "http://localhost/" });
for (const name of ["DOMParser", "Node", "NodeFilter", "Range", "HTMLElement", "NodeList", "HTMLCollection", "XMLSerializer", "CSS"]) {
  if (typeof globalThis[name] === "undefined") globalThis[name] = window[name];
}

// Expected output depends on aria substitution, which gnd.json can't carry: parsed from input markup instead.
const PARSED_INPUT_FIXTURES = new Set(
  JSON.parse(readFileSync(path.join(__dirname, "fixture-exceptions.json"), "utf-8")).parsedInput,
);

// Regenerates every fixture's utterances.json from @readium/guided-navigation's gnd.json, using the
// real @readium/speech build. `npm run build` first.
//
// A case is only stored when it diverges from that fixture's default, and option-sets
// producing identical output share one case — unlisted in-scope combinations are
// implicitly the default (fixtures/README.md).
let mod;
try {
  mod = await import("../build/index.js");
} catch (err) {
  console.error("Run `npm run build` first — could not import build/index.js.");
  throw err;
}
const { extractUtterances, skippableRoles, skippedAtVerbosity, defaultContextualizations, shapeableRoles } = mod;

// skippedAtVerbosity.none reaches beyond roles.md's skippable-roles list (e.g. `audio`, `table`).
const allSkippableRoles = new Set([...skippableRoles, ...(skippedAtVerbosity?.none ?? [])]);

function expectedTopLevel(gnd) {
  if (gnd && typeof gnd === "object" && !Array.isArray(gnd)) {
    const keys = Object.keys(gnd);
    if (keys.length === 1 && keys[0] === "children") return gnd.children;
  }
  return [gnd];
}

function collectRoles(nodes, acc = new Set()) {
  for (const node of nodes) {
    for (const role of node.role ?? []) acc.add(role);
    if (node.children) collectRoles(node.children, acc);
  }
  return acc;
}

// The full powerset of `items` — typically 0-3 entries, so naive is fine.
function subsets(items) {
  return items.reduce((acc, item) => acc.concat(acc.map((set) => [...set, item])), [[]]);
}

function sortKeysDeep(value) {
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

// Fixture JSON is cross-platform, so it never carries implementation-specific selector output.
function stripLocatorDetails(value) {
  if (Array.isArray(value)) return value.map(stripLocatorDetails);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([key]) => key !== "textref" && key !== "locate" && key !== "offsets")
        .map(([key, val]) => [key, stripLocatorDetails(val)]),
    );
  }
  return value;
}

function sameUtterances(a, b) {
  return JSON.stringify(sortKeysDeep(a)) === JSON.stringify(sortKeysDeep(b));
}

const languageValues = [undefined, "always", "block-level", "none"];
const inlineContextualizationValues = [false, true];
const segmentationModeValues = [undefined, "sentence"];

const entries = JSON.parse(readFileSync(path.join(GND_FIXTURES_DIR, "manifest.json"), "utf-8"))
  .sort((a, b) => a.id.localeCompare(b.id));

function loadNodes(entry) {
  if (PARSED_INPUT_FIXTURES.has(entry.id)) {
    return parseMarkup(readFileSync(path.join(GND_FIXTURES_DIR, entry.dir, entry.files.input), "utf-8"));
  }
  const gnd = JSON.parse(readFileSync(path.join(GND_FIXTURES_DIR, entry.id, "gnd.json"), "utf-8"));
  return GuidedNavigationObject.deserializeArray(expectedTopLevel(gnd));
}

for (const entry of entries) {
  const dir = path.join(FIXTURES_DIR, entry.id);
  const nodes = loadNodes(entry);
  const rolesInTree = collectRoles(nodes);

  const skipSubsets = subsets([...allSkippableRoles].filter((role) => rolesInTree.has(role)));
  const contextualizeSubsets = subsets(
    [...rolesInTree].filter((role) => defaultContextualizations?.[role] !== undefined),
  );
  const cases = [];
  for (const format of ["plain", "ssml"]) {
    const defaultUtterances = stripLocatorDetails(await extractUtterances(nodes, { format }));
    cases.push({ options: [{ format }], utterances: defaultUtterances });

    // Groups diverging combinations by their resulting utterances, so option-sets that
    // produce byte-identical output share one entry instead of repeating the payload.
    const groups = new Map();

    for (const skip of skipSubsets) {
      for (const contextualize of contextualizeSubsets) {
        // Shape only matters for a role that's contextualized and not skipped here.
        const shapeableInCombo = contextualize.filter(
          (role) => (shapeableRoles ?? []).includes(role) && !skip.includes(role),
        );
        for (const inlineRoles of subsets(shapeableInCombo)) {
          for (const language of languageValues) {
            for (const inlineContextualization of inlineContextualizationValues) {
              for (const segmentationMode of segmentationModeValues) {
                if (
                  skip.length === 0 &&
                  contextualize.length === 0 &&
                  inlineRoles.length === 0 &&
                  language === undefined &&
                  !inlineContextualization &&
                  segmentationMode === undefined
                ) {
                  continue; // the default case itself, already pushed above
                }
                const options = { format };
                if (skip.length > 0) options.skip = skip;
                if (contextualize.length > 0) options.contextualize = contextualize;
                if (inlineRoles.length > 0) {
                  options.contextualization = {
                    shapes: Object.fromEntries(inlineRoles.map((role) => [role, "inline"])),
                  };
                }
                if (language !== undefined) options.language = language;
                if (inlineContextualization) options.inlineContextualization = true;
                if (segmentationMode !== undefined) options.segmentation = { mode: segmentationMode };

                const utterances = stripLocatorDetails(await extractUtterances(nodes, options));
                if (!sameUtterances(utterances, defaultUtterances)) {
                  const key = JSON.stringify(sortKeysDeep(utterances));
                  const group = groups.get(key);
                  if (group) {
                    group.options.push(options);
                  } else {
                    groups.set(key, { options: [options], utterances });
                  }
                }
              }
            }
          }
        }
      }
    }

    cases.push(...groups.values());
  }

  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, "utterances.json"), JSON.stringify({ cases }, null, 2) + "\n");
}

console.log(`Regenerated utterances.json for ${entries.length} fixtures.`);
