export declare const novelty: string[];
export declare const veryLowQuality: string[];
export type TGender = "female" | "male" | "nonbinary";
export type TQuality = "veryLow" | "low" | "normal" | "high" | "veryHigh";
export interface IRecommended {
    label: string;
    name: string;
    altNames?: string[];
    language: string;
    gender?: TGender | undefined;
    age?: string | undefined;
    quality: TQuality[];
    recommendedPitch?: number | undefined;
    recommendedRate?: number | undefined;
    localizedName: string;
}
export declare const recommended: Array<IRecommended>;
export declare const quality: {
    ar: {
        normal: string;
        high: string;
    };
    ca: {
        normal: string;
        high: string;
    };
    "cmn-CN": {
        normal: string;
        high: string;
    };
    "cmn-TW": {
        normal: string;
        high: string;
    };
    cs: {
        normal: string;
        high: string;
    };
    da: {
        normal: string;
        high: string;
    };
    de: {
        normal: string;
        high: string;
    };
    el: {
        normal: string;
        high: string;
    };
    en: {
        normal: string;
        high: string;
    };
    es: {
        normal: string;
        high: string;
    };
    fi: {
        normal: string;
        high: string;
    };
    fr: {
        normal: string;
        high: string;
    };
    he: {
        normal: string;
        high: string;
    };
    hi: {
        normal: string;
        high: string;
    };
    hr: {
        normal: string;
        high: string;
    };
    hu: {
        normal: string;
        high: string;
    };
    id: {
        normal: string;
        high: string;
    };
    it: {
        normal: string;
        high: string;
    };
    ja: {
        normal: string;
        high: string;
    };
    ko: {
        normal: string;
        high: string;
    };
    ms: {
        normal: string;
        high: string;
    };
    nb: {
        normal: string;
        high: string;
    };
    nl: {
        normal: string;
        high: string;
    };
    pl: {
        normal: string;
        high: string;
    };
    pt: {
        normal: string;
        high: string;
    };
    ro: {
        normal: string;
        high: string;
    };
    ru: {
        normal: string;
        high: string;
    };
    sk: {
        normal: string;
        high: string;
    };
    sl: {
        normal: string;
        high: string;
    };
    sv: {
        normal: string;
        high: string;
    };
    th: {
        normal: string;
        high: string;
    };
    tr: {
        normal: string;
        high: string;
    };
    uk: {
        normal: string;
        high: string;
    };
    vi: {
        normal: string;
        high: string;
    };
};
export declare const defaultRegion: {
    ar: string;
    bg: string;
    bho: string;
    bn: string;
    ca: string;
    cmn: string;
    cs: string;
    da: string;
    de: string;
    el: string;
    en: string;
    es: string;
    eu: string;
    fa: string;
    fi: string;
    fr: string;
    gl: string;
    he: string;
    hi: string;
    hr: string;
    hu: string;
    id: string;
    it: string;
    ja: string;
    kn: string;
    ko: string;
    mr: string;
    ms: string;
    nb: string;
    nl: string;
    pl: string;
    pt: string;
    ro: string;
    ru: string;
    sk: string;
    sl: string;
    sv: string;
    ta: string;
    te: string;
    th: string;
    tr: string;
    uk: string;
    vi: string;
    wuu: string;
    yue: string;
};
