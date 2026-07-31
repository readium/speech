import { readFileSync, writeFileSync, readdirSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FIXTURES_DIR = path.join(__dirname, "../fixtures");

// Regenerates every fixture's utterances.json — a flat `cases` array, each
// a full ExtractUtterancesOptions object paired with its expected
// utterances — from its gnd.json, using the actual @readium/speech build —
// the exact same extractUtterances() a consumer would call. Run this after
// any change to extractUtterances.ts, announcements.ts, or roles.ts's
// skippableRoles that should propagate to the fixture suite (e.g. rewording
// an announcement, adding a role's contextualization). `npm run build` first.
//
// This is *not* a substitute for reviewing what changed: utterances.json is
// still the ground truth other (non-TypeScript) implementations are meant
// to match, so a diff this script produces should be read over — did the
// change do what was intended, everywhere it applies — not blindly
// committed.
let mod;
try {
  mod = await import("../build/index.js");
} catch (err) {
  console.error("Run `npm run build` first — could not import build/index.js.");
  throw err;
}
const { extractUtterances, skippableRoles } = mod;

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

function containsPlaceholder(gnd) {
  return JSON.stringify(gnd).includes("<readium:");
}

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

  const variantSpecs = [];

  for (const role of skippableRoles) {
    if (rolesInTree.has(role)) variantSpecs.push({ skip: [role] });
  }

  // Nothing announces by default (symmetric with skip); the meaningful
  // variant is opting every role in the tree with a catalog entry *in*.
  const announcableRoles = [...rolesInTree].filter((role) => mod.defaultAnnouncements?.[role] !== undefined);
  if (announcableRoles.length > 0) variantSpecs.push({ contextualize: announcableRoles });

  if (containsPlaceholder(gnd)) variantSpecs.push({ interruptSentence: true });

  // Every `language` state gets its own case for every fixture, per format,
  // regardless of whether it matches the base case.
  const languageSpecs = ["always", "block-level", "none"];

  const cases = [];
  for (const format of ["plain", "ssml"]) {
    const base = extractUtterances(nodes, { format });
    cases.push({ options: { format }, utterances: base });

    // Ships every applicable variant's case, even when identical to base.
    for (const options of variantSpecs) {
      const utterances = extractUtterances(nodes, { format, ...options });
      cases.push({ options: { format, ...options }, utterances });
    }

    for (const language of languageSpecs) {
      const utterances = extractUtterances(nodes, { format, language });
      cases.push({ options: { format, language }, utterances });
    }
  }

  writeFileSync(path.join(dir, "utterances.json"), JSON.stringify({ cases }, null, 2) + "\n");
}

console.log(`Regenerated utterances.json for ${ids.length} fixtures.`);
