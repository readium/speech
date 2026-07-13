import { existsSync, readFileSync } from "fs";
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
    utterances: string;
  };
}

export interface FixtureMeta {
  id: string;
  description: string;
  role: string;
  rolesCovered: string[];
  sourceRef: string;
  inputKind: "fragment" | "document";
}

// One extraction-options combination and its expected output, beyond the
// format branch's own `base` (no extra options).
export interface UtterancesVariant {
  options: Record<string, unknown>;
  utterances: unknown[];
}

export interface UtterancesBranch {
  base: unknown[];
  variants?: UtterancesVariant[];
}

// `utterances.json`'s shape: format is the fork (see fixtures/README.md),
// each branch holding its own `base` plus whichever option variants that
// fixture illustrates.
export interface UtterancesFile {
  plain: UtterancesBranch;
  ssml: UtterancesBranch;
}

export interface LoadedFixture {
  meta: FixtureMeta;
  inputHtml: string;
  gnd: unknown;
  utterances: UtterancesFile;
}

const fixturesDir = join(__dirname, "../fixtures");

/**
 * Test-only helper to read fixtures/manifest.json
 */
export function loadManifest(): FixtureManifestEntry[] {
  return JSON.parse(readFileSync(join(fixturesDir, "manifest.json"), "utf-8"));
}

/**
 * Test-only helper to read every file of a fixture directory by id
 */
export function loadFixture(id: string): LoadedFixture {
  const dir = join(fixturesDir, id);
  const meta: FixtureMeta = JSON.parse(readFileSync(join(dir, "meta.json"), "utf-8"));
  const inputFile = existsSync(join(dir, "input.xhtml")) ? "input.xhtml" : "input.html";
  const inputHtml = readFileSync(join(dir, inputFile), "utf-8");
  const gnd = JSON.parse(readFileSync(join(dir, "gnd.json"), "utf-8"));
  const utterances: UtterancesFile = JSON.parse(readFileSync(join(dir, "utterances.json"), "utf-8"));
  return { meta, inputHtml, gnd, utterances };
}
