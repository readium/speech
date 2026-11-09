import path from "path";
import { fileURLToPath } from "url";
import { blockLevelRoles, interruptionRoles, skippableRoles } from "../build/index.js";
import { replaceGenerated } from "./docMarkers.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOC = path.join(__dirname, "../docs/UtteranceExtraction.md");

// Regenerates the role set lists in docs/UtteranceExtraction.md from the real @readium/speech build. `npm run build` first.
const list = (roles) => [...roles].sort().map((role) => `\`${role}\``).join(", ");

replaceGenerated(DOC, "skippableRoles", list(skippableRoles));
replaceGenerated(DOC, "interruptionRoles", list(interruptionRoles));
replaceGenerated(DOC, "blockLevelRoles", list(blockLevelRoles));
