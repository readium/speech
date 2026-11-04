export declare const voiceBaseLanguage: (language: string) => string;
/**
 * Looks up the voice of a language-keyed voice record for content in `language`: the exact tag's,
 * else its base language's, tags matched as voice languages are, e.g. a `zh-HK` key for `yue-HK` content.
 */
export declare const voiceForLanguage: (voices: Record<string, string>, language: string) => string | undefined;
