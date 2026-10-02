import { existsSync, readdirSync, readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Test-only helper to get default region from JSON
 * This file is only used in tests and never exposed in the main codebase
 */
export function getDefaultRegion(language: string): string {
  const jsonPath = join(__dirname, `../json/${language}.json`);
  const langData = JSON.parse(readFileSync(jsonPath, "utf-8"));
  return langData.defaultRegion;
}

export interface FixtureManifestEntry {
  id: string;
  dir: string;
  role: string;
  description: string;
  files: {
    input: string;
    gnd: string;
  };
}

// Every ExtractUtterancesOptions combination that produces this exact output.
export interface UtterancesCase {
  options: (Record<string, unknown> & { format: "plain" | "ssml" })[];
  utterances: unknown[];
}

// `utterances.json`'s shape: a flat list of cases (see fixtures/README.md).
export interface UtterancesFile {
  cases: UtterancesCase[];
}

export interface LoadedFixture {
  inputHtml: string;
  utterances: UtterancesFile;
}

const gndFixturesDir = join(__dirname, "../node_modules/@readium/guided-navigation/fixtures");
const fixturesDir = join(__dirname, "../fixtures");

/**
 * Test-only helper to read @readium/guided-navigation's fixtures/manifest.json
 */
export function loadManifest(): FixtureManifestEntry[] {
  return JSON.parse(readFileSync(join(gndFixturesDir, "manifest.json"), "utf-8"));
}

/**
 * Test-only helper to read a fixture's input from @readium/guided-navigation, and its local utterances.json
 */
export function loadFixture(entry: FixtureManifestEntry): LoadedFixture {
  const inputHtml = readFileSync(join(gndFixturesDir, entry.dir, entry.files.input), "utf-8");
  const utterances: UtterancesFile = JSON.parse(readFileSync(join(fixturesDir, entry.id, "utterances.json"), "utf-8"));
  return { inputHtml, utterances };
}

/**
 * Test-only helper listing the fixture ids that have a local utterances.json
 */
export function localFixtureIds(): string[] {
  return readdirSync(fixturesDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && existsSync(join(fixturesDir, entry.name, "utterances.json")))
    .map((entry) => entry.name);
}

// Strips implementation-specific selector output before comparing against
// cross-platform fixture JSON, which never carries it.
export function stripLocatorDetails(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(stripLocatorDetails);
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(value)) {
      if (key === "textref" || key === "locate" || key === "offsets") continue;
      out[key] = stripLocatorDetails(val);
    }
    return out;
  }
  return value;
}
