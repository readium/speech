
import { spawn } from 'node:child_process';
import { rm } from 'node:fs/promises';
import { join } from 'node:path';
import { writeFileSync } from 'node:fs';

const repoUrl = 'https://github.com/HadrienGardeur/web-speech-recommended-voices.git';
const repoBranch = 'locales-for-voice-names';
const repoPath = 'script/web-speech-recommended-voices';
const jsonFilePath = join(repoPath, 'path/to/your/json/file.json');

// Clone the repository
await new Promise((resolve, reject) => {
  const cloneProcess = spawn('git', ['clone', '--branch', repoBranch, repoUrl, repoPath]);
  cloneProcess.on('close', (code) => {
    if (code === 0) {
      resolve();
    } else {
      reject(new Error(`Git clone failed with code ${code}`));
    }
  });
});


const jsonFiles = [
  'ca.json',
  'da.json',
  'de.json',
  'en.json',
  'es.json',
  'eu.json',
  'fi.json',
  'fr.json',
  'gl.json',
  'it.json',
  'nb.json',
  'nl.json',
  'pt.json',
  'sv.json',
];

const filters = [
  'novelty.json',
  'veryLowQuality.json',
];

const localizedNames = [
  'ca.json',
  'da.json',
  'de.json',
  'en.json',
  'es.json',
  'fi.json',
  'fr.json',
  'it.json',
  'nb.json',
  'nl.json',
  'pt.json',
  'sv.json',
];

let novelty = [];
let veryLowQuality = [];

let localization = {};

let recommendedveryHigh = [];
let recommendedHigh = [];
let recommendedNormal = [];
let recommendedLow = [];

function generateLanguageRegionStrings(languages, regions) {

  const result = {};
  for (const languageCode in languages) {
    for (const regionCode in regions) {
      const bcp47Code = `${languageCode.toLowerCase()}-${regionCode.toLowerCase()}`;
      const translation = `(${languages[languageCode]} (${regions[regionCode]}))`;
      result[bcp47Code] = translation;
    }
  }

  return result;
}

function getAltName(languages) {

  if (!languages.length) {
    return [];
  }

  const result = [];
  for (const language of languages) {
    for (const langLocalization in localization) {
      
      const v = localization[langLocalization][language.toLowerCase()];
      if (v) {
        result.push(v);
      }
    }
  }

  return result;
}

function filterBCP47(data) {
  return data.filter((v) => /\w{2,3}-\w{2,3}/.test(v));
}

for (const file of localizedNames) {
  const filePath = join(process.cwd(), repoPath, 'json', 'localizedNames', file);
  try {
    const { default: jsonData } = await import(filePath, { with: { type: 'json' } });
    console.log(`Imported localizedNames/${file}:` /*, jsonData*/);

    const lang = file.split(".")[0];
    localization[lang] = generateLanguageRegionStrings(jsonData.languages, jsonData.regions);
  } catch (error) {
    console.error(`Failed to import localizedNames/${file}: ${error.message}`);
  }
}
// console.log(localization);


for (const file of jsonFiles) {
  const filePath = join(process.cwd(), repoPath, 'json', file);
  try {
    const { default: jsonData } = await import(filePath, { with: { type: 'json' } });
    console.log(`Imported ${file}:` /*, jsonData*/);

    recommendedveryHigh.push(...(
      jsonData.voices
        .filter(({ quality }) => Array.isArray(quality) && quality.includes("veryHigh"))
        .map(({ name, altNames }) => [name, altNames].flat()).flat()));

    recommendedHigh.push(...(
      jsonData.voices
        .filter(({ quality }) => Array.isArray(quality) && quality.includes("high"))
        .map(({ name, altNames }) => [name, altNames].flat()).flat()));

    recommendedNormal.push(...(
      jsonData.voices
        .filter(({ quality }) => Array.isArray(quality) && quality.includes("normal"))
        .map(({ name, altNames }) => [name, altNames].flat()).flat()));

    recommendedLow.push(...(
      jsonData.voices
        .filter(({ quality }) => Array.isArray(quality) && quality.includes("low"))
        .map(({ name, altNames }) => [name, altNames].flat()).flat()));

  } catch (error) {
    console.error(`Failed to import ${file}: ${error.message}`);
  }
}

for (const file of filters) {
  const filePath = join(process.cwd(), repoPath, 'json', 'filters', file);
  try {
    const { default: jsonData } = await import(filePath, { with: { type: 'json' } });
    console.log(`Imported filters/${file}:` /*, jsonData*/);

    if (file.startsWith("novelty")) {
      novelty = jsonData.voices.map(({ name, altNames }) => [name, ...(Array.isArray(altNames) ? altNames : [])]).flat();
    }

    if (file.startsWith("veryLow")) {
      veryLowQuality = jsonData.voices.map(({ name, language, otherLanguages }) => {
        const languages = filterBCP47([language, otherLanguages].flat());
        const altNamesGenerated = getAltName(languages);
        const altNames = altNamesGenerated.map((v) => name + " " + v);
        
        return [name, altNames].flat();
      }).flat();
    }
  } catch (error) {
    console.error(`Failed to import filters/${file}: ${error.message}`);
  }
}



const content = `

export const novelty = ${JSON.stringify(novelty)};


export const veryLowQuality = ${JSON.stringify(veryLowQuality)};


export const recommendedVeryHigh = ${JSON.stringify(recommendedveryHigh.filter((v) => v))};

export const recommendedHigh = ${JSON.stringify(recommendedHigh.filter((v) => v))};

export const recommendedNormal = ${JSON.stringify(recommendedNormal.filter((v) => v))};

export const recommendedLow = ${JSON.stringify(recommendedLow.filter((v) => v))};

`;

const filePath = './src/data.mts';

try {
    writeFileSync(filePath, content);
    console.log('File has been written successfully');
} catch (err) {
    console.error(err);
}

// Delete the cloned repository
try {
  await rm(repoPath, { recursive: true, force: true });
  console.log(`Deleted repository at ${repoPath}`);
} catch (error) {
  console.error(`Failed to delete repository: ${error.message}`);
}
