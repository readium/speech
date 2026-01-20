import { readFileSync } from "fs";
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
