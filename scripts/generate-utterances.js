import { mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { JSDOM } from "jsdom";
import { GuidedNavigationObject } from "@readium/shared";
import { parseMarkup } from "@readium/guided-navigation";
import {
  collectRoles,
  fixtureTopLevel,
  optionSpace,
  parsedInputFixtures,
  roleListsFrom,
  sameJson,
  sortKeysDeep,
  stripLocatorDetails,
} from "./fixtureCases.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FIXTURES_DIR = path.join(__dirname, "../fixtures");
const GND_FIXTURES_DIR = path.join(__dirname, "../node_modules/@readium/guided-navigation/fixtures");

// Plain Node has no native DOM: these are the globals @readium/guided-navigation needs.
const { window } = new JSDOM("", { url: "http://localhost/" });
for (const name of ["DOMParser", "Node", "NodeFilter", "Range", "HTMLElement", "NodeList", "HTMLCollection", "XMLSerializer", "CSS"]) {
  if (typeof globalThis[name] === "undefined") globalThis[name] = window[name];
}

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
const { extractUtterances } = mod;
const roleLists = roleListsFrom(mod);

const entries = JSON.parse(readFileSync(path.join(GND_FIXTURES_DIR, "manifest.json"), "utf-8"))
  .sort((a, b) => a.id.localeCompare(b.id));

function loadNodes(entry) {
  if (parsedInputFixtures.has(entry.id)) {
    return parseMarkup(readFileSync(path.join(GND_FIXTURES_DIR, entry.dir, entry.files.input), "utf-8"));
  }
  const gnd = JSON.parse(readFileSync(path.join(GND_FIXTURES_DIR, entry.id, "gnd.json"), "utf-8"));
  return GuidedNavigationObject.deserializeArray(fixtureTopLevel(gnd));
}

for (const entry of entries) {
  const dir = path.join(FIXTURES_DIR, entry.id);
  const nodes = loadNodes(entry);
  const rolesInTree = collectRoles(nodes);

  const cases = [];
  for (const format of ["plain", "ssml"]) {
    const defaultUtterances = stripLocatorDetails(await extractUtterances(nodes, { format }));
    cases.push({ options: [{ format }], utterances: defaultUtterances });

    // Groups diverging combinations by their resulting utterances, so option-sets that
    // produce byte-identical output share one entry instead of repeating the payload.
    const groups = new Map();
    for (const options of optionSpace(format, rolesInTree, roleLists)) {
      const utterances = stripLocatorDetails(await extractUtterances(nodes, options));
      if (sameJson(utterances, defaultUtterances)) continue;
      const key = JSON.stringify(sortKeysDeep(utterances));
      const group = groups.get(key);
      if (group) {
        group.options.push(options);
      } else {
        groups.set(key, { options: [options], utterances });
      }
    }

    cases.push(...groups.values());
  }

  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, "utterances.json"), JSON.stringify({ cases }, null, 2) + "\n");
}

console.log(`Regenerated utterances.json for ${entries.length} fixtures.`);
