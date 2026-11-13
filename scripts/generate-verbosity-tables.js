import path from "path";
import { fileURLToPath } from "url";
import {
  contextualizationShapesAtVerbosity,
  contextualizedAtVerbosity,
  defaultContextualizations,
  skippedAtVerbosity,
} from "../build/index.js";
import { replaceGenerated } from "./docMarkers.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOC = path.join(__dirname, "../docs/Verbosity.md");

// Regenerates the per-role tables in docs/Verbosity.md from the real @readium/speech build. `npm run build` first.
const levels = ["none", "few", "some", "most"];
const rolesOf = (table, levels) => [...new Set(levels.flatMap((level) => [...table[level]]))].sort();
const row = (cells) => `| ${cells.join(" | ")} |`;

const skipped = [
  row(["Role", ...levels.map((level) => `\`${level}\``)]),
  row(Array(levels.length + 1).fill("---")),
  ...rolesOf(skippedAtVerbosity, levels).map((role) =>
    row([`\`${role}\``, ...levels.map((level) => (skippedAtVerbosity[level].has(role) ? "✓" : ""))]),
  ),
];

const contextualizedLevels = levels.filter((level) => contextualizedAtVerbosity[level].size > 0);
const catalogShape = (role) => {
  const entry = defaultContextualizations[role];
  return entry ? ["inline", "block"].filter((shape) => shape in entry).join("/") : "—";
};
const contextualized = [
  row(["Role", "Shape", ...contextualizedLevels.map((level) => `\`${level}\``)]),
  row(Array(contextualizedLevels.length + 2).fill("---")),
  ...rolesOf(contextualizedAtVerbosity, contextualizedLevels).map((role) =>
    row([
      `\`${role}\``,
      catalogShape(role),
      ...contextualizedLevels.map((level) =>
        contextualizedAtVerbosity[level].has(role) ? (contextualizationShapesAtVerbosity[level][role] ?? "✓") : "",
      ),
    ]),
  ),
];

replaceGenerated(DOC, "skipped", skipped.join("\n"));
replaceGenerated(DOC, "contextualized", contextualized.join("\n"));
