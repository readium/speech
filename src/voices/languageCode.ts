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
  
  // First normalize to lowercase and replace underscores with hyphens
  // A script doesn't tell voice languages apart, e.g. "zh-Hant-HK" is "zh-HK"
  let normalized = lang.toLowerCase().replace(/_/g, "-").split("-").filter((subtag, index) => index === 0 || !/^[a-z]{4}$/.test(subtag)).join("-");
  
  // Handle BCP47 formatting (e.g., "en-US" -> "en-US", "en-us" -> "en-US")
  if (/\w{2,3}-\w{2,3}/.test(normalized)) {
    const [language, region] = normalized.split("-");
    normalized = `${language.toLowerCase()}-${region.toUpperCase()}`;
  }
  
  // Then check for Chinese variants
  return chineseVariantMap[normalized] || normalized;
};
