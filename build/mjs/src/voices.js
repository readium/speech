import { novelty, quality, recommended, veryLowQuality, defaultRegion } from "./data.js";
// export type TOS = 'Android' | 'ChromeOS' | 'iOS' | 'iPadOS' | 'macOS' | 'Windows';
// export type TBrowser = 'ChromeDesktop' | 'Edge' | 'Firefox' | 'Safari';
const navigatorLanguages = () => window.navigator.languages;
const navigatorLang = () => navigator.language.split("-")[0].toLowerCase();
const normalQuality = Object.values(quality).map(({ normal }) => normal);
const highQuality = Object.values(quality).map(({ high }) => high);
function compareQuality(a, b) {
    const qualityToNumber = (quality) => {
        switch (quality) {
            case "veryLow": {
                return 0;
            }
            case "low": {
                return 1;
            }
            case "normal": {
                return 2;
            }
            case "high": {
                return 3;
            }
            case "veryHigh": {
                return 4;
            }
            default:
                {
                    return -1;
                }
                ;
        }
    };
    return qualityToNumber(b || "low") - qualityToNumber(a || "low");
}
;
export async function getSpeechSynthesisVoices() {
    const a = () => speechSynthesis.getVoices();
    const voices = a();
    if (Array.isArray(voices) && voices.length)
        return voices;
    return new Promise((resolve, _reject) => {
        let counter = 1000;
        const tick = () => {
            if (counter < 1)
                return resolve([]);
            // console.log(counter);
            --counter;
            const voices = a();
            if (Array.isArray(voices) && voices.length)
                return resolve(voices);
            setTimeout(tick, 10);
        };
        setTimeout(tick, 10);
    });
}
export function parseSpeechSynthesisVoices(speechSynthesisVoices) {
    const parseAndFormatBCP47 = (lang) => {
        const speechVoiceLang = lang.replace("_", "-");
        if (/\w{2,3}-\w{2,3}/.test(speechVoiceLang)) {
            return `${speechVoiceLang.split("-")[0].toLowerCase()}-${speechVoiceLang.split("-")[1].toUpperCase()}`;
        }
        // bad formated !?
        return lang;
    };
    return speechSynthesisVoices.map((speechVoice) => ({
        label: speechVoice.name,
        voiceURI: speechVoice.voiceURI,
        name: speechVoice.name,
        language: parseAndFormatBCP47(speechVoice.lang),
        gender: undefined,
        age: undefined,
        offlineAvailability: speechVoice.localService,
        quality: undefined,
        pitchControl: true,
        recommendedPitch: undefined,
        recomendedRate: undefined,
    }));
}
export function filterOnOfflineAvailability(voices, offline = true) {
    return voices.filter(({ offlineAvailability }) => {
        return offlineAvailability === offline;
    });
}
export function filterOnGender(voices, gender) {
    return voices.filter(({ gender: voiceGender }) => {
        return voiceGender === gender;
    });
}
export function filterOnLanguage(voices, language) {
    language = Array.isArray(language) ? language : [language];
    language = language.map((l) => extractLangRegionFromBCP47(l)[0]);
    return voices.filter(({ language: voiceLanguage }) => {
        const [lang] = extractLangRegionFromBCP47(voiceLanguage);
        return language.includes(lang);
    });
}
export function filterOnQuality(voices, quality) {
    quality = Array.isArray(quality) ? quality : [quality];
    return voices.filter(({ quality: voiceQuality }) => {
        return quality.some((qual) => qual === voiceQuality);
    });
}
export function filterOnNovelty(voices) {
    return voices.filter(({ name }) => {
        return !novelty.includes(name);
    });
}
export function filterOnVeryLowQuality(voices) {
    return voices.filter(({ name }) => {
        return !veryLowQuality.find((v) => name.startsWith(v));
    });
}
function updateVoiceInfo(recommendedVoice, voice) {
    voice.label = recommendedVoice.label;
    voice.gender = recommendedVoice.gender;
    voice.recommendedPitch = recommendedVoice.recommendedPitch;
    voice.recommendedRate = recommendedVoice.recommendedRate;
    return voice;
}
export function filterOnRecommended(voices, _recommended = recommended) {
    const voicesRecommended = [];
    const voicesLowerQuality = [];
    recommendedVoiceLoop: for (const recommendedVoice of _recommended) {
        if (Array.isArray(recommendedVoice.quality) && recommendedVoice.quality.length > 1) {
            const voicesFound = voices.filter(({ name }) => name.startsWith(recommendedVoice.name));
            if (voicesFound.length) {
                for (const qualityTested of ["high", "normal"]) {
                    for (let i = 0; i < voicesFound.length; i++) {
                        const voice = voicesFound[i];
                        const rxp = /^.*\((.*)\)$/;
                        if (rxp.test(voice.name)) {
                            const res = rxp.exec(voice.name);
                            const maybeQualityString = res ? res[1] || "" : "";
                            const qualityDataArray = qualityTested === "high" ? highQuality : normalQuality;
                            if (recommendedVoice.quality.includes(qualityTested) && qualityDataArray.includes(maybeQualityString)) {
                                voice.quality = qualityTested;
                                voicesRecommended.push(updateVoiceInfo(recommendedVoice, voice));
                                voicesFound.splice(i, 1);
                                voicesLowerQuality.push(...(voicesFound.map((v) => {
                                    v.quality = "low"; // Todo need to be more precise for 'normal' quality voices
                                    return updateVoiceInfo(recommendedVoice, v);
                                })));
                                continue recommendedVoiceLoop;
                            }
                        }
                    }
                }
                const voice = voicesFound[0];
                for (let i = 1; i < voicesFound.length; i++) {
                    voicesLowerQuality.push(voicesFound[i]);
                }
                voice.quality = voicesFound.length > 3 ? "veryHigh" : voicesFound.length > 2 ? "high" : "normal";
                voicesRecommended.push(updateVoiceInfo(recommendedVoice, voice));
            }
        }
        else if (Array.isArray(recommendedVoice.altNames) && recommendedVoice.altNames.length) {
            const voiceFound = voices.find(({ name }) => name === recommendedVoice.name);
            if (voiceFound) {
                const voice = voiceFound;
                voice.quality = Array.isArray(recommendedVoice.quality) ? recommendedVoice.quality[0] : undefined;
                voicesRecommended.push(updateVoiceInfo(recommendedVoice, voice));
                // voice Name found so altNames array must be filter and push to voicesLowerQuality
                const altNamesVoicesFound = voices.filter(({ name }) => recommendedVoice.altNames.includes(name));
                // TODO: Typescript bug type assertion doesn't work, need to force the compiler with the Non-null Assertion Operator
                voicesLowerQuality.push(...(altNamesVoicesFound.map((v) => {
                    v.quality = recommendedVoice.quality[0];
                    return updateVoiceInfo(recommendedVoice, v);
                })));
            }
            else {
                // filter voices on altNames, keep the first and push the remaining to voicesLowerQuality
                const altNamesVoicesFound = voices.filter(({ name }) => recommendedVoice.altNames.includes(name));
                if (altNamesVoicesFound.length) {
                    const voice = altNamesVoicesFound.shift();
                    voice.quality = Array.isArray(recommendedVoice.quality) ? recommendedVoice.quality[0] : undefined;
                    voicesRecommended.push(updateVoiceInfo(recommendedVoice, voice));
                    voicesLowerQuality.push(...(altNamesVoicesFound.map((v) => {
                        v.quality = recommendedVoice.quality[0];
                        return updateVoiceInfo(recommendedVoice, v);
                    })));
                }
            }
        }
        else {
            const voiceFound = voices.find(({ name }) => name === recommendedVoice.name);
            if (voiceFound) {
                const voice = voiceFound;
                voice.quality = Array.isArray(recommendedVoice.quality) ? recommendedVoice.quality[0] : undefined;
                voicesRecommended.push(updateVoiceInfo(recommendedVoice, voice));
            }
        }
    }
    return [voicesRecommended, voicesLowerQuality];
}
const extractLangRegionFromBCP47 = (l) => [l.split("-")[0].toLowerCase(), l.split("-")[1]?.toUpperCase()];
export function sortByQuality(voices) {
    return voices.sort(({ quality: qa }, { quality: qb }) => {
        return compareQuality(qa, qb);
    });
}
export function sortByName(voices) {
    return voices.sort(({ name: na }, { name: nb }) => {
        return na.localeCompare(nb);
    });
}
export function sortByGender(voices, genderFirst) {
    return voices.sort(({ gender: ga }, { gender: gb }) => {
        return ga === gb ? 0 : ga === genderFirst ? -1 : gb === genderFirst ? -1 : 1;
    });
}
function orderPrefferedLanguages(preferredLanguage) {
    preferredLanguage = Array.isArray(preferredLanguage) ? preferredLanguage :
        preferredLanguage ? [preferredLanguage] : [];
    const defaultRegionList = Object.values(defaultRegion).sort();
    const languages = [...(new Set([...preferredLanguage, ...navigatorLanguages(), ...defaultRegionList]))];
    return languages;
}
// const isAKeyFromDefaultRegion = (a: any): a is keyof typeof defaultRegion => {
//     return Object.keys(defaultRegion).includes(a);
// }
// function languageSortFunction(a: IVoices, b: IVoices) {
//     const {language: la} = a;
//     const {language: lb} = a;
//     const [lal, lar] = extractLangRegionFromBCP47(la);
//     const [lbl, lbr] = extractLangRegionFromBCP47(lb);
//     if (lal === lbl) {
//         if (isAKeyFromDefaultRegion(lal)) {
//             const [,defaultRegionValue] = extractLangRegionFromBCP47(defaultRegion[lal]);
//             return lar === defaultRegionValue ? -1 : lbr === defaultRegionValue ? 1 : lar.localeCompare(lbr);
//         }
//         return lar.localeCompare(lbr);
//     }
//     return la.localeCompare(lb);
// }
export function sortByLanguage(voices, preferredLanguage) {
    const languages = orderPrefferedLanguages(preferredLanguage);
    const voicesSorted = [];
    const voicesIndex = [];
    for (const lang of languages) {
        const voicesFiltered = voices.filter(({ language: langFromVoice }, i) => {
            if (voicesIndex.includes(i))
                return false;
            const [l, r] = extractLangRegionFromBCP47(lang);
            let ret = false;
            if (!r && l) {
                ret = langFromVoice.startsWith(l);
            }
            else if (r) {
                ret = langFromVoice === lang;
            }
            if (ret)
                voicesIndex.push(i);
            return ret;
        });
        voicesSorted.push(...voicesFiltered);
    }
    voicesIndex.sort();
    const voiceMissing = [];
    for (let i = 0; i < voices.length; i++) {
        if (voicesIndex.includes(i))
            continue;
        voiceMissing.push(voices[i]);
    }
    return [voicesSorted, voiceMissing].flat();
}
function extractLanguagesFromVoices(voices, localization) {
    let langueName = undefined;
    if (localization) {
        langueName = new Intl.DisplayNames([localization], { type: 'language' });
    }
    return voices.reduce((acc, cv) => {
        const [cvLanguage] = extractLangRegionFromBCP47(cv.language);
        const name = langueName ? langueName.of(cvLanguage) || cvLanguage : cvLanguage;
        const found = acc.find(({ language }) => language === cvLanguage);
        if (found) {
            found.count++;
        }
        else {
            acc.push({ language: cvLanguage, count: 1, label: name });
        }
        return acc;
    }, []);
}
export function extractRegionsFromVoices(voices, localization) {
    let regionName = undefined;
    if (localization) {
        regionName = new Intl.DisplayNames([localization], { type: 'region' });
    }
    return voices.reduce((acc, cv) => {
        const [, region] = extractLangRegionFromBCP47(cv.language);
        const name = regionName ? regionName.of(region) || cv.language : cv.language;
        const found = acc.find(({ language }) => language.endsWith(region));
        if (found) {
            found.count++;
        }
        else {
            acc.push({ language: cv.language, count: 1, label: name });
        }
        return acc;
    }, []);
}
export function groupByLanguage(voices, preferredLanguage, localization) {
    const languages = orderPrefferedLanguages(preferredLanguage);
    const voicesSorted = sortByLanguage(voices, languages);
    const languagesStructure = extractLanguagesFromVoices(voicesSorted, localization);
    const res = new Map();
    for (const { language, label } of languagesStructure) {
        res.set(label, voicesSorted
            .filter(({ language: voiceLang }) => {
            const [l] = extractLangRegionFromBCP47(voiceLang);
            return l === language;
        }));
    }
    return res;
}
export function groupByRegions(voices, language, preferredRegions, localization) {
    const languages = orderPrefferedLanguages(preferredRegions);
    const languagesFilteredOnlyRegionsRemain = languages.filter((l) => {
        const [lang] = extractLangRegionFromBCP47(l);
        return language === lang;
    });
    // en-US , en-CA , en-GB sorted by preferredRegions in BCP47
    const voicesFiltered = voices.filter(({ language: voiceLang }) => {
        const [lang] = extractLangRegionFromBCP47(voiceLang);
        return lang === language;
    });
    const voicesSorted = sortByLanguage(voicesFiltered, languagesFilteredOnlyRegionsRemain);
    const languagesStructure = extractRegionsFromVoices(voicesSorted, localization);
    const res = new Map();
    for (const { language, label } of languagesStructure) {
        res.set(label, voicesSorted.filter(({ language: voiceLang }) => {
            return voiceLang === language;
        }));
    }
    return res;
}
export function groupByKindOfVoices(allVoices) {
    const [recommendedVoices, lowQualityVoices] = filterOnRecommended(allVoices);
    const remainingVoice = allVoices.filter((v) => !recommendedVoices.includes(v) && !lowQualityVoices.includes(v));
    const noveltyFiltered = filterOnNovelty(remainingVoice);
    const noveltyVoices = remainingVoice.filter((v) => !noveltyFiltered.includes(v));
    const veryLowQualityFiltered = filterOnVeryLowQuality(remainingVoice);
    const veryLowQualityVoices = remainingVoice.filter((v) => !veryLowQualityFiltered.includes(v));
    const remainingVoiceFiltered = filterOnNovelty(filterOnVeryLowQuality(remainingVoice));
    const res = new Map();
    res.set("recommendedVoices", recommendedVoices);
    res.set("lowerQuality", lowQualityVoices);
    res.set("novelty", noveltyVoices);
    res.set("veryLowQuality", veryLowQualityVoices);
    res.set("remaining", remainingVoiceFiltered);
    return res;
}
export async function getLanguages(allVoices, localization) {
    allVoices = allVoices ? allVoices : await getVoices();
    return extractLanguagesFromVoices(allVoices, localization || navigatorLang());
}
export function listLanguages(voices, localization) {
    return extractLanguagesFromVoices(voices, localization || navigatorLang());
}
export async function getVoices() {
    const allVoices = parseSpeechSynthesisVoices(await getSpeechSynthesisVoices());
    const [recommendedVoices, lowQualityVoices] = filterOnRecommended(allVoices);
    const remainingVoice = allVoices.filter((v) => !recommendedVoices.includes(v) && !lowQualityVoices.includes(v));
    const remainingVoiceFiltered = filterOnNovelty(filterOnVeryLowQuality(remainingVoice));
    const voices = [recommendedVoices, remainingVoiceFiltered].flat();
    const voicesSorted = sortByLanguage(sortByQuality(voices));
    return voicesSorted;
}
