import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const JSON_DIR = path.join(__dirname, "../json");
const OUTPUT_DIR = path.join(__dirname, "../src/generated");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "language-metadata.ts");

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Read all JSON files and extract metadata
const metadata = {};
const jsonFiles = fs.readdirSync(JSON_DIR).filter(file => file.endsWith(".json"));

for (const file of jsonFiles) {
  const filePath = path.join(JSON_DIR, file);
  const langCode = path.basename(file, ".json");
  
  try {
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    
    // Extract default region
    let defaultRegion = "";
    if (data.defaultRegion) {
      const [, region] = data.defaultRegion.split("-");
      defaultRegion = region || data.defaultRegion;
    }
    
    // Extract all unique regions from voices
    const regions = new Set();
    if (data.voices && Array.isArray(data.voices)) {
      for (const voice of data.voices) {
        if (voice.language) {
          const [, region] = voice.language.split("-");
          if (region) {
            regions.add(region);
          }
        }
      }
    }
    
    metadata[langCode] = {
      defaultRegion,
      availableRegions: Array.from(regions).sort(),
      testUtterance: data.testUtterance || ""
    };
  } catch (error) {
    console.warn(`Failed to process ${file}:`, error.message);
  }
}

// Generate TypeScript file
const content = `// Auto-generated language metadata
// Generated on: ${new Date().toISOString()}
// DO NOT EDIT MANUALLY - Run scripts/generate-metadata.js to regenerate

export interface LanguageMetadata {
  defaultRegion: string;
  availableRegions: string[];
  testUtterance: string;
}

export const LANGUAGE_METADATA: Record<string, LanguageMetadata> = ${JSON.stringify(metadata, null, 2)} as const;

export type LanguageCode = keyof typeof LANGUAGE_METADATA;
`;

fs.writeFileSync(OUTPUT_FILE, content);
console.log(`Generated language metadata: ${OUTPUT_FILE}`);
console.log(`Processed ${Object.keys(metadata).length} languages`);
