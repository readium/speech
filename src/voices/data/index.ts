// Auto-generated file - DO NOT EDIT
// Last updated: 2025-11-28T12:15:59.656Z
import type { ReadiumSpeechVoice } from "./types";

import ar from "./languages/ar";
import bg from "./languages/bg";
import bho from "./languages/bho";
import bn from "./languages/bn";
import ca from "./languages/ca";
import cmn from "./languages/cmn";
import cs from "./languages/cs";
import da from "./languages/da";
import de from "./languages/de";
import el from "./languages/el";
import en from "./languages/en";
import es from "./languages/es";
import eu from "./languages/eu";
import fa from "./languages/fa";
import fi from "./languages/fi";
import fr from "./languages/fr";
import gl from "./languages/gl";
import he from "./languages/he";
import hi from "./languages/hi";
import hr from "./languages/hr";
import hu from "./languages/hu";
import id from "./languages/id";
import it from "./languages/it";
import ja from "./languages/ja";
import kn from "./languages/kn";
import ko from "./languages/ko";
import mr from "./languages/mr";
import ms from "./languages/ms";
import nb from "./languages/nb";
import nl from "./languages/nl";
import pl from "./languages/pl";
import pt from "./languages/pt";
import ro from "./languages/ro";
import ru from "./languages/ru";
import sk from "./languages/sk";
import sl from "./languages/sl";
import sv from "./languages/sv";
import ta from "./languages/ta";
import te from "./languages/te";
import th from "./languages/th";
import tr from "./languages/tr";
import uk from "./languages/uk";
import vi from "./languages/vi";
import wuu from "./languages/wuu";
import yue from "./languages/yue";

/**
 * Get all voices for a specific language
 * @param {string} lang - Language code (e.g., "en", "fr")
 * @returns {ReadiumSpeechVoice[]} Array of voices for the specified language
 */
export function getVoices(lang: string): ReadiumSpeechVoice[] {
  switch (lang) {
    case "ar": return ar;
    case "bg": return bg;
    case "bho": return bho;
    case "bn": return bn;
    case "ca": return ca;
    case "cmn": return cmn;
    case "cs": return cs;
    case "da": return da;
    case "de": return de;
    case "el": return el;
    case "en": return en;
    case "es": return es;
    case "eu": return eu;
    case "fa": return fa;
    case "fi": return fi;
    case "fr": return fr;
    case "gl": return gl;
    case "he": return he;
    case "hi": return hi;
    case "hr": return hr;
    case "hu": return hu;
    case "id": return id;
    case "it": return it;
    case "ja": return ja;
    case "kn": return kn;
    case "ko": return ko;
    case "mr": return mr;
    case "ms": return ms;
    case "nb": return nb;
    case "nl": return nl;
    case "pl": return pl;
    case "pt": return pt;
    case "ro": return ro;
    case "ru": return ru;
    case "sk": return sk;
    case "sl": return sl;
    case "sv": return sv;
    case "ta": return ta;
    case "te": return te;
    case "th": return th;
    case "tr": return tr;
    case "uk": return uk;
    case "vi": return vi;
    case "wuu": return wuu;
    case "yue": return yue;
    default: return [];
  }
}

/**
 * Get all available language codes
 * @returns {string[]} Array of available language codes
 */
export function getAvailableLanguages() {
  return ["ar", "bg", "bho", "bn", "ca", "cmn", "cs", "da", "de", "el", "en", "es", "eu", "fa", "fi", "fr", "gl", "he", "hi", "hr", "hu", "id", "it", "ja", "kn", "ko", "mr", "ms", "nb", "nl", "pl", "pt", "ro", "ru", "sk", "sl", "sv", "ta", "te", "th", "tr", "uk", "vi", "wuu", "yue"];
}

export * from "./types";
export * from "./testUtterances";

export * from "./filters/novelty";
export * from "./filters/veryLowQuality";