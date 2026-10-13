import { existsSync, readdirSync, readFileSync } from "fs";
import { GuidedNavigationObject } from "@readium/shared";
import { parseMarkup } from "@readium/guided-navigation";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { fixtureTopLevel, parsedInputFixtures } from "../scripts/fixtureCases.js";

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
  gnd: GuidedNavigationObject[];
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
 * Test-only helper to read a fixture's gnd.json from @readium/guided-navigation, and its local utterances.json
 */
export function loadFixture(entry: FixtureManifestEntry): LoadedFixture {
  const utterances: UtterancesFile = JSON.parse(readFileSync(join(fixturesDir, entry.id, "utterances.json"), "utf-8"));
  if (parsedInputFixtures.has(entry.id)) {
    return { gnd: parseMarkup(readFileSync(join(gndFixturesDir, entry.dir, entry.files.input), "utf-8")), utterances };
  }
  const gndJson = JSON.parse(readFileSync(join(gndFixturesDir, entry.id, "gnd.json"), "utf-8"));
  return { gnd: GuidedNavigationObject.deserializeArray(fixtureTopLevel(gndJson))!, utterances };
}

/**
 * Test-only helper listing the fixture ids that have a local utterances.json
 */
export function localFixtureIds(): string[] {
  return readdirSync(fixturesDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && existsSync(join(fixturesDir, entry.name, "utterances.json")))
    .map((entry) => entry.name);
}

