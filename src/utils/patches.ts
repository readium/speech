// This is heavily inspired by Easy Speech

export interface WebSpeechPlatformPatches {
  isAndroid: boolean;
  isFirefox: boolean;
  isSafari: boolean;
  isKaiOS: boolean;
}

/**
 * Detects platform features
 * @returns {WebSpeechPlatformPatches} Object containing platform features
 */
export const detectPlatformFeatures = (): WebSpeechPlatformPatches => {
  const getUA = () => (typeof window !== "undefined" && (window.navigator || {}).userAgent) || "";
  const userAgent = getUA();

  const isAndroid = () => /android/i.test(userAgent);
  const isKaiOS = () => /kaios/i.test(userAgent);
  const isFirefox = () => {
    // InstallTrigger will soon be deprecated but still works
    if (typeof (window as any).InstallTrigger !== "undefined") {
      return true;
    }
    return /firefox/i.test(userAgent);
  };
  const isSafari = () => {
    // Check for Safari-specific features
    return typeof (window as any).GestureEvent !== "undefined" ||
           /safari/i.test(userAgent);
  };

  return {
    isAndroid: isAndroid(),
    isFirefox: isFirefox() || isKaiOS(),
    isSafari: isSafari(),
    isKaiOS: isKaiOS()
  };
};