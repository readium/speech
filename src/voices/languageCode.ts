// Chinese variant mapping for special handling
export const chineseVariantMap: {[key: string]: string} = {
  "cmn": "cmn", 
  "cmn-CN": "cmn-CN", 
  "cmn-TW": "cmn-TW", 
  "zh": "cmn", 
  "zh-CN": "cmn-CN", 
  "zh-TW": "cmn-TW",
  "yue": "yue", 
  "yue-HK": "yue-HK", 
  "zh-HK": "yue-HK",
  "wuu": "wuu", 
  "wuu-CN": "wuu-CN"
};

/**
 * Normalizes language code with special handling for Chinese variants
 * @param lang - Input language code
 * @returns Normalized language code
 */
export const normalizeLanguageCode = (lang: string): string => {
  if (!lang) return "";
  
  // Handle BCP47 formatting (e.g., "en-US" -> "en-US", "en-us" -> "en-US")
  const formatted = (tag: string): string => {
    if (!/\w{2,3}-\w{2,3}/.test(tag)) return tag;
    const [language, region] = tag.split("-");
    return `${language}-${region.toUpperCase()}`;
  };

  // First normalize to lowercase and replace underscores with hyphens
  const lowercased = lang.toLowerCase().replace(/_/g, "-");
  const normalized = formatted(lowercased);

  // Then check for Chinese variants, whose script doesn't tell them apart, e.g. "zh-Hant-HK" is "zh-HK"
  const withoutScript = formatted(lowercased.split("-").filter((subtag, index) => index === 0 || !/^[a-z]{4}$/.test(subtag)).join("-"));
  return chineseVariantMap[normalized] || chineseVariantMap[withoutScript] || normalized;
};
