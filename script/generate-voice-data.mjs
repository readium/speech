import { mkdir, writeFile, rm, readdir, readFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");

// Configuration
const CONFIG = {
  repoUrl: "https://github.com/HadrienGardeur/web-speech-recommended-voices.git",
  repoBranch: "main",
  repoPath: join(__dirname, "web-speech-recommended-voices"),
  outputDir: join(rootDir, "src/voices/data"),
  jsonDir: join(__dirname, "web-speech-recommended-voices", "json")
};

// JSDoc type definitions for better code intelligence

/**
 * @typedef {"female"|"male"|"neutral"} TGender
 * @typedef {"veryLow"|"low"|"normal"|"high"|"veryHigh"} TQuality
 * @typedef {"macOS"|"iOS"|"iPadOS"|"Windows"|"Android"|"ChromeOS"} TOS
 */

/**
 * @typedef {Object} ReadiumSpeechVoice
 * @property {string} label - User-friendly display name
 * @property {string} name - System/technical name
 * @property {string} [voiceURI] - Web Speech API voiceURI
 * @property {string} language - BCP 47 language tag
 * @property {string} localizedName - Name in the voice's language
 * @property {string[]} altNames - Alternative names or aliases
 * @property {TGender} [gender] - Voice gender
 * @property {string} [age] - Voice age group
 * @property {TQuality[]} quality - Quality ratings
 * @property {boolean} pitchControl - Whether pitch can be controlled
 * @property {number} [recommendedPitch] - Suggested pitch value
 * @property {number} [recommendedRate] - Suggested speech rate
 * @property {boolean} offlineAvailability - If voice works offline
 * @property {string} provider - Voice provider (e.g., "Microsoft", "Google")
 * @property {boolean} isDefault - If default voice for language
 * @property {boolean} isDeprecated - If voice is deprecated
 * @property {boolean} isNovelty - If voice is a novelty voice
 * @property {boolean} isLowQuality - If voice is low quality
 * @property {string[]} [nativeID] - Platform-specific voice IDs
 * @property {TOS[]} [os] - Supported operating systems
 * @property {boolean} [preloaded] - If voice is preloaded on the system
 * @property {string} [note] - Additional notes about the voice
 */

/**
 * Ensure a directory exists
 * @param {string} path - Directory path to create
 * @returns {Promise<void>}
 */
async function ensureDir(path) {
  try {
    await mkdir(path, { recursive: true });
  } catch (error) {
    if (error.code !== "EEXIST") throw error;
  }
}

/**
 * Clone the repository
 * @returns {Promise<void>}
 */
async function cloneRepository() {
  console.log("Cloning voice data repository...");
  await execAsync(
    `git clone --depth 1 --branch ${CONFIG.repoBranch} ${CONFIG.repoUrl} ${CONFIG.repoPath}`
  );
  console.log("Repository cloned successfully");
}

/**
 * Clean up temporary files
 * @returns {Promise<void>}
 */
async function cleanup() {
  try {
    await rm(CONFIG.repoPath, { recursive: true, force: true });
  } catch (error) {
    if (error.code !== "ENOENT") {
      console.warn("Failed to clean up temporary files:", error.message);
    }
  }
}

/**
 * Load JSON data from file
 * @param {string} path - Path to JSON file
 * @returns {Promise<object|null>} Parsed JSON data or null on error
 */
async function loadJsonFile(path) {
  try {
    const content = await readFile(path, "utf-8");
    return JSON.parse(content);
  } catch (error) {
    console.error(`Failed to load ${path}:`, error.message);
    return null;
  }
}

/**
 * Detect provider from voice name
 * @param {string} name - Voice name
 * @returns {string} Detected provider name
 */
function detectProvider(name) {
  const lowerName = name.toLowerCase();
  if (lowerName.includes("microsoft")) return "Microsoft";
  if (lowerName.includes("google")) return "Google";
  if (lowerName.includes("apple")) return "Apple";
  if (lowerName.includes("android")) return "Android";
  if (lowerName.startsWith("espeak")) return "eSpeak";
  if (lowerName.includes("amazon") || lowerName.includes("polly")) return "Amazon";
  if (lowerName.includes("ibm") || lowerName.includes("watson")) return "IBM";
  return "Other";
}

/**
 * Process and enhance voice data
 * @returns {Promise<{languages: Map<string, ReadiumSpeechVoice[]>, allVoices: ReadiumSpeechVoice[]}>}
 */
async function processVoices() {
  console.log("Processing voice data...");
  
  // Load localized names
  const localizedNames = await loadJsonFile(join(CONFIG.jsonDir, "localizedNames/apple.json")) || {};
  
  // Process all language files
  const files = await readdir(CONFIG.jsonDir);
  const languageFiles = files.filter(f => f.endsWith(".json") && !f.startsWith("."));
  
  /** @type {ReadiumSpeechVoice[]} */
  const allVoices = [];
  /** @type {Map<string, ReadiumSpeechVoice[]>} */
  const languages = new Map();
  /** @type {Map<string, string>} */
  const testUtterances = new Map();
  
  for (const file of languageFiles) {
    if (file === "filters" || file === "localizedNames") continue;
    
    const filePath = join(CONFIG.jsonDir, file);
    const data = await loadJsonFile(filePath);
    if (!data?.voices) continue;
    
    const langCode = file.replace(/\.json$/, "");
    const langVoices = [];
    
    // Extract test utterance if available
    if (data.testUtterance) {
      testUtterances.set(langCode, data.testUtterance);
    }
    
    for (const voice of data.voices) {
      // Get localized name if available
      let localizedName = voice.label;
      if (voice.language in localizedNames) {
        const langData = localizedNames[voice.language];
        if (voice.quality?.includes("high") && langData.high) {
          localizedName = `${voice.label} (${langData.high})`;
        } else if (langData.normal) {
          localizedName = `${voice.label} (${langData.normal})`;
        }
      }
      
      /** @type {ReadiumSpeechVoice} */
      const enhancedVoice = {
        ...voice,
        voiceURI: voice.voiceURI || voice.name,
        localizedName: voice.localizedName || localizedName,
        altNames: voice.altNames || [],
        quality: voice.quality || ["normal"],
        rate: voice.rate,
        pitchControl: voice.pitchControl !== false, // Default to true
        offlineAvailability: voice.offlineAvailability !== false, // Default to true
        provider: voice.provider || detectProvider(voice.name),
        isDefault: voice.isDefault || false,
        isDeprecated: voice.isDeprecated || false
      };
      
      langVoices.push(enhancedVoice);
      allVoices.push(enhancedVoice);
    }
    
    if (langVoices.length > 0) {
      languages.set(langCode, langVoices);
    }
  }
  
  return { languages, allVoices, testUtterances };
}

/**
 * Generate TypeScript files for the processed voice data
 * @param {Map<string, ReadiumSpeechVoice[]>} languages - Map of language codes to voices
 * @param {ReadiumSpeechVoice[]} allVoices - All voices
 * @param {Map<string, string>} testUtterances - Map of language codes to test utterances
 * @returns {Promise<void>}
 */
async function generateOutputFiles(languages, allVoices, testUtterances) {
  // Create output directories
  await ensureDir(join(CONFIG.outputDir, "languages"));
  
  // Generate types
  const typesContent = `// Auto-generated file - DO NOT EDIT
export type TGender = "female" | "male" | "neutral";
export type TQuality = "veryLow" | "low" | "normal" | "high" | "veryHigh";

export interface ReadiumSpeechVoice {
  // Core identification
  label: string;          // User-friendly display name
  name: string;           // System/technical name (matches Web Speech API voiceURI)
  voiceURI?: string;      // For Web Speech API compatibility
  
  // Localization
  language: string;       // BCP 47 language tag (e.g., "en-US")
  localizedName?: string;  // Name in the voice's language (optional in some cases)
  altNames?: string[];     // Alternative names or aliases
  otherLanguages?: string[]; // Other language codes this voice can speak (e.g., ["es", "fr"])
  altLanguage?: string;      // Alternative language code this voice can speak
  multiLingual?: boolean;    // Whether the voice is multilingual
  
  // Voice characteristics
  gender?: TGender;       // Voice gender
  age?: string;           // Voice age group (e.g., "child", "adult", "senior")
  children?: boolean;     // Whether the voice is designed for children
  
  // Quality and capabilities
  quality?: TQuality[];    // Quality ratings across different systems (optional in some cases)
  pitchControl?: boolean;  // Whether pitch can be controlled (optional in some cases)
  
  // Performance settings
  pitch?: number;             // Current pitch (0-2, where 1 is normal)
  recommendedPitch?: number;  // Default pitch (0-2, where 1 is normal)
  rate?: number;              // Speech rate (0.1-10, where 1 is normal)
  recommendedRate?: number;   // Default rate (0.1-10, where 1 is normal)
  
  // Platform and compatibility
  browser?: string[];      // Browsers that support this voice (e.g., ["Chrome", "Edge"])
  offlineAvailability?: boolean; // If the voice works offline (optional in some cases)
  provider?: string;       // Voice provider (e.g., "Microsoft", "Google", "Amazon")
  isDefault?: boolean;     // If this is a default voice for its language
  isDeprecated?: boolean;  // If this voice is deprecated
  isNovelty?: boolean;     // If this is a novelty voice
  isLowQuality?: boolean;  // If this is a low-quality voice
  nativeID?: string | string[];    // Platform-specific voice ID(s)
  os?: string[];          // Supported operating systems
  preloaded?: boolean;    // If the voice is preloaded on the system
  note?: string;          // Additional notes about the voice
  
  // Additional fields from the data
  [key: string]: any;     // Allow for additional properties that might be present in the data
}`;

  // Ensure output directories exist
  await ensureDir(join(CONFIG.outputDir, "languages"));
  await ensureDir(join(CONFIG.outputDir, "filters"));
  
  // Write types file
  await writeFile(join(CONFIG.outputDir, "types.ts"), typesContent);
  
  // Process filter files and convert to TypeScript modules
  const filterFiles = ["novelty", "veryLowQuality"];
  for (const filterName of filterFiles) {
    const sourcePath = join(CONFIG.jsonDir, "filters", `${filterName}.json`);
    const targetPath = join(CONFIG.outputDir, "filters", `${filterName}.ts`);
    
    try {
      const content = await readFile(sourcePath, "utf8");
      const tsContent = `// Auto-generated file - DO NOT EDIT
// Last updated: ${new Date().toISOString()}

const ${filterName} = ${content} as const;

export default ${filterName};
`;
      await writeFile(targetPath, tsContent);
    } catch (error) {
      console.error(`Error processing filter file ${filterName}:`, error);
      // Create a default empty array if the source file doesn't exist
      const defaultContent = `// Auto-generated file - DO NOT EDIT
// Last updated: ${new Date().toISOString()}

const ${filterName} = [] as const;

export default ${filterName};
`;
      await writeFile(targetPath, defaultContent);
    }
  }

  // Write language files
  for (const [lang, langVoices] of languages.entries()) {
    const content = `// Auto-generated file - DO NOT EDIT
// Last updated: ${new Date().toISOString()}
import type { ReadiumSpeechVoice } from "../types";

/**
 * List of available voices for ${lang}
 * Sorted by quality (highest first) and then by name
 */
const voices: ReadiumSpeechVoice[] = ${JSON.stringify(langVoices, null, 2)};

export default voices;`;

    await writeFile(
      join(CONFIG.outputDir, "languages", `${lang}.ts`),
      content
    );
  }

  // Generate test utterances file
  const testUtterancesContent = `// Auto-generated file - DO NOT EDIT
// Last updated: ${new Date().toISOString()}

/**
 * Test utterances for different languages
 * Used for voice preview and testing
 */
export const testUtterances: { [lang: string]: string } = ${JSON.stringify(Object.fromEntries(testUtterances), null, 2)};

/**
 * Get test utterance for a specific language
 * @param lang - Language code (e.g., "en", "fr", "es")
 * @returns Test utterance string or empty string if not found
 */
export function getTestUtterance(lang: string): string {
  // Direct match first
  if (testUtterances[lang]) {
    return testUtterances[lang];
  }
  
  // Try to extract base language from locale (e.g., "en-US" -> "en")
  const baseLang = lang.split('-')[0];
  return testUtterances[baseLang] || "";
}

/**
 * Get all available language codes that have test utterances
 * @returns Array of language codes
 */
export function getTestUtteranceLanguages(): string[] {
  return Object.keys(testUtterances);
}

export default testUtterances;`;

  await writeFile(
    join(CONFIG.outputDir, "testUtterances.ts"),
    testUtterancesContent
  );

  // Generate index file
  const indexContent = `// Auto-generated file - DO NOT EDIT
// Last updated: ${new Date().toISOString()}
import type { ReadiumSpeechVoice } from "./types";

${Array.from(languages.keys())
  .map(lang => `import ${lang.replace("-", "_")} from "./languages/${lang}";`)
  .join("\n")}

/**
 * Get all voices for a specific language
 * @param {string} lang - Language code (e.g., "en", "fr")
 * @returns {ReadiumSpeechVoice[]} Array of voices for the specified language
 */
export function getVoices(lang: string): ReadiumSpeechVoice[] {
  switch (lang) {
    ${Array.from(languages.keys())
      .map(lang => `case "${lang}": return ${lang.replace("-", "_")};`)
      .join("\n    ")}
    default: return [];
  }
}

/**
 * Get all available language codes
 * @returns {string[]} Array of available language codes
 */
export function getAvailableLanguages() {
  return [${Array.from(languages.keys())
    .map(lang => `"${lang}"`)
    .join(", ")}];
}

export * from "./types";
export * from "./testUtterances";

export * from "./filters/novelty";
export * from "./filters/veryLowQuality";`;

  await writeFile(join(CONFIG.outputDir, "index.ts"), indexContent);
  console.log("Generated index.ts with type-safe exports");
}

// Main function
async function main() {
  try {
    // Ensure output directory exists
    await ensureDir(CONFIG.outputDir);
    
    // Clean up any previous runs
    await cleanup();
    
    // Clone the repository
    await cloneRepository();
    
    // Process the voice data
    const { languages, allVoices, testUtterances } = await processVoices();
    
    // Generate output files
    await generateOutputFiles(languages, allVoices, testUtterances);
    
    console.log("\n✅ Voice data processing complete!");
    console.log(`Output directory: ${CONFIG.outputDir}`);
    
    // Verify files were created
    const files = await readdir(CONFIG.outputDir);
    console.log("\nGenerated files:", files);
    
  } catch (error) {
    console.error("❌ Error processing voice data:", error);
    process.exit(1);
  } finally {
    // Clean up
    await cleanup();
  }
}

// Run the script
main();
