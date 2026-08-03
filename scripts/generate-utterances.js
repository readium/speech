import { readFileSync, writeFileSync, readdirSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FIXTURES_DIR = path.join(__dirname, "../fixtures");

// Regenerates every fixture's utterances.json from its gnd.json, using the
// real @readium/speech build. `npm run build` first.
//
// A case is only stored when it diverges from that fixture's default —
// unlisted in-scope combinations are implicitly the default (fixtures/README.md).
let mod;
try {
  mod = await import("../build/index.js");
} catch (err) {
  console.error("Run `npm run build` first — could not import build/index.js.");
  throw err;
}
const { extractUtterances, skippableRoles, defaultAnnouncements } = mod;

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

function sameUtterances(a, b) {
  return JSON.stringify(sortKeysDeep(a)) === JSON.stringify(sortKeysDeep(b));
}

const languageValues = [undefined, "always", "block-level", "none"];
const inlineContextualizationValues = [false, true];

const ids = readdirSync(FIXTURES_DIR, { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => e.name)
  .filter((id) => {
    try {
      readFileSync(path.join(FIXTURES_DIR, id, "meta.json"), "utf-8");
      return true;
    } catch {
      return false;
    }
  })
  .sort();

for (const id of ids) {
  const dir = path.join(FIXTURES_DIR, id);
  const gnd = JSON.parse(readFileSync(path.join(dir, "gnd.json"), "utf-8"));
  const nodes = expectedTopLevel(gnd);
  const rolesInTree = collectRoles(nodes);

  const skipSubsets = subsets(skippableRoles.filter((role) => rolesInTree.has(role)));
  const contextualizeSubsets = subsets(
    [...rolesInTree].filter((role) => defaultAnnouncements?.[role] !== undefined),
  );

  const cases = [];
  for (const format of ["plain", "ssml"]) {
    const defaultUtterances = extractUtterances(nodes, { format });
    cases.push({ options: { format }, utterances: defaultUtterances });

    for (const skip of skipSubsets) {
      for (const contextualize of contextualizeSubsets) {
        for (const language of languageValues) {
          for (const inlineContextualization of inlineContextualizationValues) {
            if (skip.length === 0 && contextualize.length === 0 && language === undefined && !inlineContextualization) {
              continue; // the default case itself, already pushed above
            }
            const options = { format };
            if (skip.length > 0) options.skip = skip;
            if (contextualize.length > 0) options.contextualize = contextualize;
            if (language !== undefined) options.language = language;
            if (inlineContextualization) options.inlineContextualization = true;

            const utterances = extractUtterances(nodes, options);
            if (!sameUtterances(utterances, defaultUtterances)) {
              cases.push({ options, utterances });
            }
          }
        }
      }
    }
  }

  writeFileSync(path.join(dir, "utterances.json"), JSON.stringify({ cases }, null, 2) + "\n");
}

console.log(`Regenerated utterances.json for ${ids.length} fixtures.`);
