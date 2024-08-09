
import { novelty, quality, recommended, veryLowQuality, TGender, TQuality, IRecommended } from "./data.js";

// export type TOS = 'Android' | 'ChromeOS' | 'iOS' | 'iPadOS' | 'macOS' | 'Windows';
// export type TBrowser = 'ChromeDesktop' | 'Edge' | 'Firefox' | 'Safari';


export interface IVoices {
    label: string;
    voiceURI: string;
    name: string;
    language: string;
    gender?: TGender | undefined;
    age?: string | undefined;
    offlineAvailability: boolean;
    quality?: TQuality | undefined;
    pitchControl: boolean;
    recommendedPitch?: number | undefined;
    recomendedRate?: number | undefined;
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

export async function getSpeechSynthesisVoices(): Promise<SpeechSynthesisVoice[]> {
    const a = () => speechSynthesis.getVoices();
    
    const voices = a();
    if (Array.isArray(voices) && voices.length) return voices;

    return new Promise((resolve, _reject) => {

        let counter = 1000;
        const tick = () => {
            if (counter < 1) return resolve([]);
            // console.log(counter);
            
            --counter;
            const voices = a();
            if (Array.isArray(voices) && voices.length) return resolve(voices);
            setTimeout(tick, 10);
        }
        setTimeout(tick, 10);
    });
}

export function parseSpeechSynthesisVoices(speechSynthesisVoices: SpeechSynthesisVoice[]): IVoices[] {

    const parseAndFormatBCP47 = (lang: string) => {
        const speechVoiceLang = lang.replace("_", "-");
        if (/\w{2,3}-\w{2,3}/.test(speechVoiceLang)) {
            return `${speechVoiceLang.split("-")[0].toLowerCase()}-${speechVoiceLang.split("-")[1].toUpperCase()}`;
        }

        // bad formated !?
        return lang;
    };
    return speechSynthesisVoices.map<IVoices>((speechVoice) => ({
        label: speechVoice.name,
        voiceURI: speechVoice.voiceURI      ,
        name: speechVoice.name,
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

export function filterOnOfflineActivity(voices: IVoices[], offline = true): IVoices[] {
    return voices.filter(({offlineAvailability}) => {
        return offlineAvailability === offline;
    });
}

export function filterOnGender(voices: IVoices[], gender: TGender): IVoices[] {
    return voices.filter(({gender: voiceGender}) => {
        return voiceGender === gender;
    })
}

export function filterOnLanguage(voices: IVoices[], language: string | string[]): IVoices[] {
    language = Array.isArray(language) ? language : [language];
    return voices.filter(({language: voiceLanguage}) => {
        return language.some((lang) => voiceLanguage.startsWith(lang));
    })
}

export function filterOnQuality(voices: IVoices[], quality: TQuality | TQuality[]): IVoices[] {
    quality = Array.isArray(quality) ? quality : [quality];
    return voices.filter(({quality: voiceQuality}) => {
        return quality.some((qual) => qual === voiceQuality);
    });
}

export function filterOnNovelty(voices: IVoices[]): IVoices[] {
    return voices.filter(({ name }) => {
        return !novelty.includes(name); 
    });
}

export function filterOnVeryLowQuality(voices: IVoices[]): IVoices[] {
    return voices.filter(({ name }) => {
        return !veryLowQuality.find((v) => name.startsWith(v));
    });
}

function updateVoiceInfo(recommendedVoice: IRecommended, voice: IVoices) {
    voice.label = recommendedVoice.label;
    voice.gender = recommendedVoice.gender;
    voice.recommendedPitch = recommendedVoice.recommendedPitch;
    voice.recomendedRate = recommendedVoice.recommendedRate;

    return voice;
}
export type TReturnFilterOnRecommended = [voicesRecommended: IVoices[], voicesLowerQuality: IVoices[]];
export function filterOnRecommended(voices: IVoices[]): TReturnFilterOnRecommended {

    const voicesRecommended = [];
    const voicesLowerQuality = [];

    recommendedVoiceLoop:
    for (const recommendedVoice of recommended) {
        if (Array.isArray(recommendedVoice.quality) && recommendedVoice.quality.length > 1) {

            const voicesFound = voices.filter(({ name }) => name.startsWith(recommendedVoice.name));
            if (voicesFound.length) {

                for (let i = 0; i < voicesFound.length; i++) {
                    const voice = voicesFound[0];

                    const rxp = /^.*\((.*)\)$/;
                    if (rxp.test(voice.name)) {
                        const res = rxp.exec(voice.name);
                        const maybeQualityString = res ? res[1] || "" : "";

                        let matched = false;
                        if (recommendedVoice.quality.includes("high")) {

                            if (highQuality.includes(maybeQualityString)) {
                                voice.quality = "high";
                                matched = true;
                            }
                        }
                        if (recommendedVoice.quality.includes("normal")) {

                            if (normalQuality.includes(maybeQualityString)) {
                                voice.quality = "normal";
                                matched = true;
                            }
                        }

                        if (matched) {
                            voicesRecommended.push(updateVoiceInfo(recommendedVoice, voice));

                            voicesFound.splice(i, 1);
                            voicesLowerQuality.push(...voicesFound);

                            continue recommendedVoiceLoop;
                        }
                    }
                }
                const voice = voicesFound[0];
                for (let i = 1; i < voicesFound.length; i++) {
                    voicesLowerQuality.push(voicesFound[i]);
                }

                voice.quality = voicesFound.length > 3 ? "veryHigh" : voicesFound.length === 2 ? "high" : "normal";
                voicesRecommended.push(updateVoiceInfo(recommendedVoice, voice));

            }
        } else {

            const voiceFound = voices.find(({ name }) => name.startsWith(recommendedVoice.name));
            if (voiceFound) {

                const voice = voiceFound;

                voice.quality = Array.isArray(recommendedVoice.quality) ? recommendedVoice.quality[0] : undefined;
                voicesRecommended.push(updateVoiceInfo(recommendedVoice, voice));

            }
        }
    }

    return [voicesRecommended, voicesLowerQuality];
}

const extractLangRegionFromBCP47 = (l: string) => [l.split("-")[0].toLowerCase(), l.split("-")[1]?.toUpperCase()];

export function sortByQuality(voices: IVoices[]) {
    return voices.sort(({quality: qa}, {quality: qb}) => {
        return compareQuality(qa, qb);
    });
}

export function sortByName(voices: IVoices[]) {
    return voices.sort(({name: na}, {name: nb}) => {
        return na.localeCompare(nb);
    })
}

export function sortByGender(voices: IVoices[], genderFirst: TGender) {
    return voices.sort(({gender: ga}, {gender: gb}) => {
        return ga === gb ? 0 : ga === genderFirst ? -1 : gb === genderFirst ? -1 : 1;
    })
}

export function sortByLanguage(voices: IVoices[], preferredLanguage?: string[]): IVoices[] {

    if (!Array.isArray(preferredLanguage)) {
        preferredLanguage = [];
    }

    const languages = [...(new Set([...preferredLanguage, ...window.navigator.languages]))];

    const voicesSorted = [];
    const voicesIndex: number[] = [];
    for (const lang of languages) {
        const voicesFiltered = voices.filter(({language: langFromVoice}, i) => {
            if (voicesIndex.includes(i)) return false;
            const [l,r] = extractLangRegionFromBCP47(lang);
            let ret = false; 
            if (!r && l) {
                ret = langFromVoice.startsWith(l);
            } else if (r) {
                ret = langFromVoice === lang;
            }
            if (ret) voicesIndex.push(i);
            return ret;
        })
        voicesSorted.push(...voicesFiltered);
    }

    voicesIndex.sort();
    const voiceMissing = [];
    for (let i = 0; i < voices.length; i++) {
        if (voicesIndex.includes(i)) continue
        voiceMissing.push(voices[i]);
    }

    return [voicesSorted, voiceMissing].flat();
}

export async function getVoices() {

    let allVoices = parseSpeechSynthesisVoices(await getSpeechSynthesisVoices());
    const [recommendedVoices, lowQualityVoices] = filterOnRecommended(allVoices);
    const remainingVoice = allVoices.filter((v) => !recommendedVoices.includes(v) && !lowQualityVoices.includes(v));
    const remainingVoiceFiltered = filterOnNovelty(filterOnVeryLowQuality(remainingVoice));

    const voices = [recommendedVoices, remainingVoiceFiltered].flat();

    const voicesSorted = sortByLanguage(sortByQuality(voices));
    
    return voicesSorted;
}