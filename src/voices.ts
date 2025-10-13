
import { novelty, quality, recommended, veryLowQuality, TGender, TQuality, IRecommended, defaultRegion } from "./data.gen.js";

// export type TOS = 'Android' | 'ChromeOS' | 'iOS' | 'iPadOS' | 'macOS' | 'Windows';
// export type TBrowser = 'ChromeDesktop' | 'Edge' | 'Firefox' | 'Safari';

const navigatorLanguages = () => window?.navigator?.languages || [];
const navigatorLang = () => (navigator?.language || "").split("-")[0].toLowerCase();

export interface ReadiumSpeechVoice {
    label: string;
    voiceURI: string;
    name: string;
    __lang?: string | undefined;
    language: string;
    gender?: TGender | undefined;
    age?: string | undefined;
    offlineAvailability: boolean;
    quality?: TQuality | undefined;
    pitchControl: boolean;
    recommendedPitch?: number | undefined;
    recommendedRate?: number | undefined;
}

const normalQuality = Object.values(quality).map(({ normal }) => normal);
const highQuality = Object.values(quality).map(({ high }) => high);

function compareQuality(a?: TQuality, b?: TQuality): number {
    const qualityToNumber = (quality: TQuality) => {
        switch (quality) {
            case "veryLow": {return 0;}
            case "low": {return 1;}
            case "normal": {return 2;}
            case "high": {return 3;}
            case "veryHigh": {return 4;}
            default: {return -1};
        }
    }

    return qualityToNumber(b || "low") - qualityToNumber(a || "low");
};

export async function getSpeechSynthesisVoices(maxTimeout = 10000, interval = 10): Promise<SpeechSynthesisVoice[]> {
    const a = () => speechSynthesis.getVoices();

    // Step 1: Try to load voices directly (best case scenario)
    const voices = a();
    if (Array.isArray(voices) && voices.length) return voices;

    return new Promise((resolve, reject) => {
        // Calculate iterations from total timeout
        let counter = Math.floor(maxTimeout / interval);
        // Flag to ensure polling only starts once
        let pollingStarted = false;

        // Polling function: Checks for voices periodically until counter expires
        const startPolling = () => {
            // Prevent multiple starts
            if (pollingStarted) return;
            pollingStarted = true;

            const tick = () => {
                // Resolve with empty array if no voices found
                if (counter < 1) return resolve([]);
                --counter;
                const voices = a();
                // Resolve if voices loaded
                if (Array.isArray(voices) && voices.length) return resolve(voices);
                // Continue polling 
                setTimeout(tick, interval); 
            };
            // Initial start
            setTimeout(tick, interval);
        };

        // Step 2: Use onvoiceschanged if available (prioritizes event over polling)
        if (speechSynthesis.onvoiceschanged) {
            speechSynthesis.onvoiceschanged = () => {
                const voices = a();
                if (Array.isArray(voices) && voices.length) {
                    // Resolve immediately if voices are available
                    resolve(voices);
                } else {
                    // Fallback to polling if event fires but no voices
                    startPolling();
                }
            };
        } else {
            // Step 3: No onvoiceschanged support, start polling directly
            startPolling();
        }

        // Step 4: Overall safety timeout - fail if nothing happens after maxTimeout
        setTimeout(() => reject(new Error("No voices available after timeout")), maxTimeout);
    });
}

const _strHash = ({voiceURI, name, language, offlineAvailability}: ReadiumSpeechVoice) => `${voiceURI}_${name}_${language}_${offlineAvailability}`;

function removeDuplicate(voices: ReadiumSpeechVoice[]): ReadiumSpeechVoice[] {

    const voicesStrMap = [...new Set(voices.map((v) => _strHash(v)))];

    const voicesFiltered = voicesStrMap
        .map((s) => voices.find((v) => _strHash(v) === s))
        .filter((v) => !!v);

    return voicesFiltered;
}

export function parseSpeechSynthesisVoices(speechSynthesisVoices: SpeechSynthesisVoice[]): ReadiumSpeechVoice[] {

    const parseAndFormatBCP47 = (lang: string) => {
        const speechVoiceLang = lang.replace("_", "-");
        if (/\w{2,3}-\w{2,3}/.test(speechVoiceLang)) {
            return `${speechVoiceLang.split("-")[0].toLowerCase()}-${speechVoiceLang.split("-")[1].toUpperCase()}`;
        }

        // bad formated !?
        return lang;
    };
    return speechSynthesisVoices.map<ReadiumSpeechVoice>((speechVoice) => ({
        label: speechVoice.name,
        voiceURI: speechVoice.voiceURI      ,
        name: speechVoice.name,
        __lang: speechVoice.lang,
        language: parseAndFormatBCP47(speechVoice.lang) ,
        gender: undefined,
        age: undefined,
        offlineAvailability: speechVoice.localService,
        quality: undefined,
        pitchControl: true,
        recommendedPitch: undefined,
        recomendedRate: undefined,
    }));
} 

// Note: This does not work as browsers expect an actual SpeechSynthesisVoice
// Here it is just an object with the same-ish properties
export function convertToSpeechSynthesisVoices(voices: ReadiumSpeechVoice[]): SpeechSynthesisVoice[] {
    return voices.map<SpeechSynthesisVoice>((voice) => ({
        default: false,
        lang: voice.__lang || voice.language,
        localService: voice.offlineAvailability,
        name: voice.name,
        voiceURI: voice.voiceURI,
    }));
}

export function filterOnOfflineAvailability(voices: ReadiumSpeechVoice[], offline = true): ReadiumSpeechVoice[] {
    return voices.filter(({offlineAvailability}) => {
        return offlineAvailability === offline;
    });
}

export function filterOnGender(voices: ReadiumSpeechVoice[], gender: TGender): ReadiumSpeechVoice[] {
    return voices.filter(({gender: voiceGender}) => {
        return voiceGender === gender;
    })
}

export function filterOnLanguage(voices: ReadiumSpeechVoice[], language: string | string[] = navigatorLang()): ReadiumSpeechVoice[] {
    language = Array.isArray(language) ? language : [language];
    language = language.map((l) => extractLangRegionFromBCP47(l)[0]);
    return voices.filter(({language: voiceLanguage}) => {
        const [lang] = extractLangRegionFromBCP47(voiceLanguage);
        return language.includes(lang);
    })
}

export function filterOnQuality(voices: ReadiumSpeechVoice[], quality: TQuality | TQuality[]): ReadiumSpeechVoice[] {
    quality = Array.isArray(quality) ? quality : [quality];
    return voices.filter(({quality: voiceQuality}) => {
        return quality.some((qual) => qual === voiceQuality);
    });
}

export function filterOnNovelty(voices: ReadiumSpeechVoice[]): ReadiumSpeechVoice[] {
    return voices.filter(({ name }) => {
        return !novelty.includes(name); 
    });
}

export function filterOnVeryLowQuality(voices: ReadiumSpeechVoice[]): ReadiumSpeechVoice[] {
    return voices.filter(({ name }) => {
        return !veryLowQuality.find((v) => name.startsWith(v));
    });
}

function updateVoiceInfo(recommendedVoice: IRecommended, voice: ReadiumSpeechVoice) {
    voice.label = recommendedVoice.label;
    voice.gender = recommendedVoice.gender;
    voice.recommendedPitch = recommendedVoice.recommendedPitch;
    voice.recommendedRate = recommendedVoice.recommendedRate;

    return voice;
}
export type TReturnFilterOnRecommended = [voicesRecommended: ReadiumSpeechVoice[], voicesLowerQuality: ReadiumSpeechVoice[]];
export function filterOnRecommended(voices: ReadiumSpeechVoice[], _recommended: IRecommended[] = recommended): TReturnFilterOnRecommended {

    const voicesRecommended: ReadiumSpeechVoice[] = [];
    const voicesLowerQuality: ReadiumSpeechVoice[] = [];

    recommendedVoiceLoop:
    for (const recommendedVoice of _recommended) {
        if (Array.isArray(recommendedVoice.quality) && recommendedVoice.quality.length > 1) {

            const voicesFound = voices.filter(({ name }) => name.startsWith(recommendedVoice.name));
            if (voicesFound.length) {

                for (const qualityTested of ["high", "normal"] as TQuality[]) {
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
        } else if (Array.isArray(recommendedVoice.altNames) && recommendedVoice.altNames.length) {
            
            const voiceFound = voices.find(({ name }) => name === recommendedVoice.name);
            if (voiceFound) {
                const voice = voiceFound;

                voice.quality = Array.isArray(recommendedVoice.quality) ? recommendedVoice.quality[0] : undefined;
                voicesRecommended.push(updateVoiceInfo(recommendedVoice, voice));

                // voice Name found so altNames array must be filter and push to voicesLowerQuality
                const altNamesVoicesFound = voices.filter(({name}) => recommendedVoice.altNames!.includes(name));
                // TODO: Typescript bug type assertion doesn't work, need to force the compiler with the Non-null Assertion Operator

                voicesLowerQuality.push(...(altNamesVoicesFound.map((v) => {
                    v.quality = recommendedVoice.quality[0];
                    return updateVoiceInfo(recommendedVoice, v);
                })));
            } else {

                // filter voices on altNames, keep the first and push the remaining to voicesLowerQuality
                const altNamesVoicesFound = voices.filter(({name}) => recommendedVoice.altNames!.includes(name));
                if (altNamesVoicesFound.length) {

                    const voice = altNamesVoicesFound.shift() as ReadiumSpeechVoice;

                    voice.quality = Array.isArray(recommendedVoice.quality) ? recommendedVoice.quality[0] : undefined;
                    voicesRecommended.push(updateVoiceInfo(recommendedVoice, voice));

                    
                    voicesLowerQuality.push(...(altNamesVoicesFound.map((v) => {
                        v.quality = recommendedVoice.quality[0];
                        return updateVoiceInfo(recommendedVoice, v);
                    })));
                }
            }
        } else {

            const voiceFound = voices.find(({ name }) => name === recommendedVoice.name);
            if (voiceFound) {

                const voice = voiceFound;

                voice.quality = Array.isArray(recommendedVoice.quality) ? recommendedVoice.quality[0] : undefined;
                voicesRecommended.push(updateVoiceInfo(recommendedVoice, voice));

            }
        }
    }

    return [removeDuplicate(voicesRecommended), removeDuplicate(voicesLowerQuality)];
}

const extractLangRegionFromBCP47 = (l: string) => [l.split("-")[0].toLowerCase(), l.split("-")[1]?.toUpperCase()];

export function sortByQuality(voices: ReadiumSpeechVoice[]) {
    return voices.sort(({quality: qa}, {quality: qb}) => {
        return compareQuality(qa, qb);
    });
}

export function sortByName(voices: ReadiumSpeechVoice[]) {
    return voices.sort(({name: na}, {name: nb}) => {
        return na.localeCompare(nb);
    })
}

export function sortByGender(voices: ReadiumSpeechVoice[], genderFirst: TGender) {
    return voices.sort(({gender: ga}, {gender: gb}) => {
        return ga === gb ? 0 : ga === genderFirst ? -1 : gb === genderFirst ? -1 : 1;
    })
}

function orderByPreferredLanguage(preferredLanguage?: string[] | string): string[] {
    preferredLanguage = Array.isArray(preferredLanguage) ? preferredLanguage :
        preferredLanguage ? [preferredLanguage] : [];

    return  [...(new Set([...preferredLanguage, ...navigatorLanguages()]))];
}
function orderByPreferredRegion(preferredLanguage?: string[] | string): string[] {
    preferredLanguage = Array.isArray(preferredLanguage) ? preferredLanguage :
        preferredLanguage ? [preferredLanguage] : [];

    const regionByDefaultArray = Object.values(defaultRegion);

    return [...(new Set([...preferredLanguage, ...navigatorLanguages(), ...regionByDefaultArray]))];
}

const getLangFromBCP47Array = (a: string[]) => {
    return [...(new Set(a.map((v) => extractLangRegionFromBCP47(v)[0]).filter((v) => !!v)))];
}
const getRegionFromBCP47Array = (a: string[]) => {
    return [...(new Set(a.map((v) => (extractLangRegionFromBCP47(v)[1] || "").toUpperCase()).filter((v) => !!v)))];
}

export function sortByLanguage(voices: ReadiumSpeechVoice[], preferredLanguage: string[] | string = [], localization: string | undefined = navigatorLang()): ReadiumSpeechVoice[] {

    const languages = getLangFromBCP47Array(orderByPreferredLanguage(preferredLanguage));

    const voicesSorted: ReadiumSpeechVoice[] = [];
    for (const lang of languages) {
        voicesSorted.push(...voices.filter(({language: voiceLanguage}) => lang === extractLangRegionFromBCP47(voiceLanguage)[0]));
    }

    let langueName: Intl.DisplayNames | undefined = undefined;
    if (localization) {
        try {
            langueName = new Intl.DisplayNames([localization], { type: "language" });
        } catch (e) {
            console.error("Intl.DisplayNames throw an exception with ", localization, e);
        }
    }

    const remainingVoices = voices.filter((v) => !voicesSorted.includes(v));
    remainingVoices.sort(({ language: a }, { language: b }) => {

        let nameA = a, nameB = b;
        try {
            if (langueName) {
                nameA = langueName.of(extractLangRegionFromBCP47(a)[0]) || a;
                nameB = langueName.of(extractLangRegionFromBCP47(b)[0]) || b;
            }
        } catch (e) {
            // ignore
        }
        return nameA.localeCompare(nameB);
    });

    return [...voicesSorted, ...remainingVoices];
}

export function sortByRegion(voices: ReadiumSpeechVoice[], preferredRegions: string[] | string = [], localization: string | undefined = navigatorLang()): ReadiumSpeechVoice[] {

    const regions = getRegionFromBCP47Array(orderByPreferredRegion(preferredRegions));

    const voicesSorted: ReadiumSpeechVoice[] = [];
    for (const reg of regions) {
        voicesSorted.push(...voices.filter(({language: voiceLanguage}) => reg === extractLangRegionFromBCP47(voiceLanguage)[1]));
    }

    let regionName: Intl.DisplayNames | undefined = undefined;
    if (localization) {
        try {
            regionName = new Intl.DisplayNames([localization], { type: "region" });
        } catch (e) {
            console.error("Intl.DisplayNames throw an exception with ", localization, e);
        }
    }

    const remainingVoices = voices.filter((v) => !voicesSorted.includes(v));
    remainingVoices.sort(({ language: a }, { language: b }) => {

        let nameA = a, nameB = b;
        try {
            if (regionName) {
                nameA = regionName.of(extractLangRegionFromBCP47(a)[1]) || a;
                nameB = regionName.of(extractLangRegionFromBCP47(b)[1]) || b;
            }
        } catch (e) {
            // ignore
        }
        return nameA.localeCompare(nameB);
    });

    return [...voicesSorted, ...remainingVoices];
}

export interface ILanguages {
    label: string;
    code: string;
    count: number;
}
export function listLanguages(voices: ReadiumSpeechVoice[], localization: string | undefined = navigatorLang()): ILanguages[] {
    let langueName: Intl.DisplayNames | undefined = undefined;
    if (localization) {
        try {
            langueName = new Intl.DisplayNames([localization], { type: "language" });
        } catch (e) {
            console.error("Intl.DisplayNames throw an exception with ", localization, e);
        }
    }
    return voices.reduce<ILanguages[]>((acc, cv) => {
        const [lang] = extractLangRegionFromBCP47(cv.language);
        let name = lang;
        try {
            if (langueName) {
                name = langueName.of(lang) || lang;
            }
        } catch (e) {
            console.error("langueName.of throw an error with ", lang, e);
        }
        const found = acc.find(({code}) => code === lang)
        if (found) {
            found.count++;
        } else {
            acc.push({code: lang, count: 1, label: name});
        }
        return acc;
    }, []);
}
export function listRegions(voices: ReadiumSpeechVoice[], localization: string | undefined = navigatorLang()): ILanguages[] {
    let regionName: Intl.DisplayNames | undefined = undefined;
    if (localization) {
        try {
            regionName = new Intl.DisplayNames([localization], { type: "region" });
        } catch (e) {
            console.error("Intl.DisplayNames throw an exception with ", localization, e);
        }
    }
    return voices.reduce<ILanguages[]>((acc, cv) => {
        const [,region] = extractLangRegionFromBCP47(cv.language);
        let name = region;
        try {
            if (regionName) {
                name = regionName.of(region) || region;
            }
        } catch (e) {
            console.error("regionName.of throw an error with ", region, e);
        }
        const found = acc.find(({code}) => code === region);
        if (found) {
            found.count++;
        } else {
            acc.push({code: region, count: 1, label: name});
        }
        return acc;
    }, []);
}

export type TGroupVoices = Map<string, ReadiumSpeechVoice[]>;
export function groupByLanguages(voices: ReadiumSpeechVoice[], preferredLanguage: string[] | string = [], localization: string | undefined = navigatorLang()): TGroupVoices {

    const voicesSorted = sortByLanguage(voices, preferredLanguage, localization);
    
    const languagesStructure = listLanguages(voicesSorted, localization);
    const res: TGroupVoices = new Map();
    for (const { code, label } of languagesStructure) {
        res.set(label, voicesSorted
            .filter(({ language: voiceLang }) => {
            const [l] = extractLangRegionFromBCP47(voiceLang);
            return l === code;
        }));
    }
    return res;
}

export function groupByRegions(voices: ReadiumSpeechVoice[], preferredRegions: string[] | string = [], localization: string | undefined = navigatorLang()): TGroupVoices {

    const voicesSorted = sortByRegion(voices, preferredRegions, localization);
    
    const languagesStructure = listRegions(voicesSorted, localization);
    const res: TGroupVoices = new Map();
    for (const { code, label } of languagesStructure) {
        res.set(label, voicesSorted
            .filter(({ language: voiceLang }) => {
            const [, r] = extractLangRegionFromBCP47(voiceLang);
            return r === code;
        }));
    }
    return res;
}

export function groupByKindOfVoices(allVoices: ReadiumSpeechVoice[]): TGroupVoices {

    const [recommendedVoices, lowQualityVoices] = filterOnRecommended(allVoices);
    const remainingVoice = allVoices.filter((v) => !recommendedVoices.includes(v) && !lowQualityVoices.includes(v));
    const noveltyFiltered = filterOnNovelty(remainingVoice);
    const noveltyVoices = remainingVoice.filter((v) => !noveltyFiltered.includes(v));
    const veryLowQualityFiltered = filterOnVeryLowQuality(remainingVoice);
    const veryLowQualityVoices = remainingVoice.filter((v) => !veryLowQualityFiltered.includes(v));
    const remainingVoiceFiltered = filterOnNovelty(filterOnVeryLowQuality(remainingVoice));

    const res: TGroupVoices = new Map();
    res.set("recommendedVoices", recommendedVoices);
    res.set("lowerQuality", lowQualityVoices);
    res.set("novelty", noveltyVoices);
    res.set("veryLowQuality", veryLowQualityVoices);
    res.set("remaining", remainingVoiceFiltered);

    return res;
}

export function getLanguages(voices: ReadiumSpeechVoice[], preferredLanguage: string[] | string = [], localization: string | undefined = navigatorLang()): ILanguages[] {

    const group = groupByLanguages(voices, preferredLanguage, localization);

    return Array.from(group.entries()).map(([label, _voices]) => {
        return {label, count: _voices.length, code: extractLangRegionFromBCP47(_voices[0]?.language || "")[0]}
    });
}

/**
 * Parse and extract SpeechSynthesisVoices,
 * @returns ReadiumSpeechVoice[]
 */
export async function getVoices(preferredLanguage?: string[] | string, localization?: string) {

    const speechVoices = await getSpeechSynthesisVoices();
    const allVoices = removeDuplicate(parseSpeechSynthesisVoices(speechVoices));
    const recommendedTuple = filterOnRecommended(allVoices);
    const [recommendedVoices, lowQualityVoices] = recommendedTuple;
    const recommendedTupleFlatten = recommendedTuple.flat();
    const remainingVoices = allVoices
        .map((allVoicesItem) => _strHash(allVoicesItem))
        .filter((str) => !recommendedTupleFlatten.find((recommendedVoicesPtr) => _strHash(recommendedVoicesPtr) === str))
        .map((str) => allVoices.find((allVoicesPtr) => _strHash(allVoicesPtr) === str))
        .filter((v) => !!v);
    const remainingVoiceFiltered = filterOnNovelty(filterOnVeryLowQuality(remainingVoices));


    // console.log("PRE_recommendedVoices_GET_VOICES", recommendedVoices.filter(({label}) => label === "Paulina"), recommendedVoices.length);

    // console.log("PRE_lowQualityVoices_GET_VOICES", lowQualityVoices.filter(({label}) => label === "Paulina"), lowQualityVoices.length);

    // console.log("PRE_remainingVoiceFiltered_GET_VOICES", remainingVoiceFiltered.filter(({label}) => label === "Paulina"), remainingVoiceFiltered.length);

    // console.log("PRE_allVoices_GET_VOICES", allVoices.filter(({label}) => label === "Paulina"), allVoices.length);

    const voices = [recommendedVoices, lowQualityVoices, remainingVoiceFiltered].flat();

    // console.log("MID_GET_VOICES", voices.filter(({label}) => label === "Paulina"), voices.length);

    const voicesSorted = sortByLanguage(sortByQuality(voices), preferredLanguage, localization || navigatorLang());

    // console.log("POST_GET_VOICES", voicesSorted.filter(({ label }) => label === "Paulina"), voicesSorted.length);

    return voicesSorted;
}