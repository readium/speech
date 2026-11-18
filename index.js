import { DecorationController as Ki, DirectCommsChannel as Wi, Decorator as Qi } from "@readium/decorator";
export * from "@readium/decorator";
import { LocatorText as Ji, LocatorLocations as Zi, Locator as Xi, GuidedNavigationText as Yi } from "@readium/shared";
import { Locator as $l, LocatorLocations as Gl, LocatorText as ql } from "@readium/shared";
import { ssmlTextEscape as le, ssmlAttrEscape as Me, startsWithBindingPunct as ut, BINDING_PUNCT_CLASS as Ae } from "@readium/helpers";
import { DROPPED as Xt, removeDropped as ea, droppedMask as ta, isAriaSubstituted as ue, substitutedOwnSelector as na, decodeTextref as An, combineDomRangeTextrefs as sa } from "@readium/guided-navigation";
import ia from "i18next";
import { DomRange as aa, DomRangePoint as xn } from "@readium/shared/html";
const O = (n) => {
  if (!n) return ["", void 0];
  const e = n.replace(/_/g, "-");
  try {
    const t = new Intl.Locale(e);
    return [
      t.language.toLowerCase(),
      t.region?.toUpperCase()
    ];
  } catch {
    const t = e.split("-");
    return [
      t[0].toLowerCase(),
      t[1]?.toUpperCase()
    ];
  }
}, ra = (n, e) => {
  const t = e.toLowerCase().replace(/_/g, "-"), [s] = O(e), i = Object.entries(n);
  for (const a of [t, s]) {
    const r = i.find(([o]) => o.toLowerCase().replace(/_/g, "-") === a);
    if (r) return r[1];
  }
}, fs = (n, e) => {
  const t = e.toLowerCase().replace(/_/g, "-"), [s] = O(e);
  let i;
  for (const a of [s, t])
    for (const [r, o] of Object.entries(n))
      r.toLowerCase().replace(/_/g, "-") === a && (i ??= /* @__PURE__ */ new Set(), o.forEach((l) => i.add(l)));
  return i && [...i];
}, me = {
  cmn: "cmn",
  "cmn-CN": "cmn-CN",
  "cmn-TW": "cmn-TW",
  zh: "cmn",
  "zh-CN": "cmn-CN",
  "zh-TW": "cmn-TW",
  yue: "yue",
  "yue-HK": "yue-HK",
  "zh-HK": "yue-HK",
  wuu: "wuu",
  "wuu-CN": "wuu-CN"
}, V = (n) => {
  if (!n) return "";
  const e = (a) => {
    if (!/\w{2,3}-\w{2,3}/.test(a)) return a;
    const [r, o] = a.split("-");
    return `${r}-${o.toUpperCase()}`;
  }, t = n.toLowerCase().replace(/_/g, "-"), s = e(t), i = e(t.split("-").filter((a, r) => r === 0 || !/^[a-z]{4}$/.test(a)).join("-"));
  return me[s] || me[i] || s;
}, se = (n) => V(n).split("-")[0], W = {
  ar: {
    defaultRegion: "SA",
    availableRegions: [
      "001",
      "AE",
      "AS",
      "BH",
      "DZ",
      "EG",
      "IQ",
      "JO",
      "KW",
      "LB",
      "LY",
      "MA",
      "OM",
      "QA",
      "SA",
      "SY",
      "TN",
      "YE"
    ],
    testUtterance: "مرحبًا، اسمي {name} وأنا صوت عربي."
  },
  bg: {
    defaultRegion: "BG",
    availableRegions: [
      "BG"
    ],
    testUtterance: "Здравейте, казвам се {name} и съм български глас."
  },
  bho: {
    defaultRegion: "IN",
    availableRegions: [
      "IN"
    ],
    testUtterance: "नमस्कार, हमार नाम {name} ह आ हम भोजपुरी आवाज हईं"
  },
  bn: {
    defaultRegion: "IN",
    availableRegions: [
      "BD",
      "IN"
    ],
    testUtterance: "হ্যালো, আমার নাম {name} এবং আমি একজন বাংলা ভয়েস।"
  },
  ca: {
    defaultRegion: "ES",
    availableRegions: [
      "ES"
    ],
    testUtterance: "Hola, em dic {name} i sóc una veu catalana"
  },
  cmn: {
    defaultRegion: "CN",
    availableRegions: [
      "CN",
      "CTW",
      "TW"
    ],
    testUtterance: "你好，我的名字是 {name}，我是普通话配音。"
  },
  cs: {
    defaultRegion: "CZ",
    availableRegions: [
      "CZ"
    ],
    testUtterance: "Dobrý den, jmenuji se {name} a jsem český hlas."
  },
  da: {
    defaultRegion: "DK",
    availableRegions: [
      "DK"
    ],
    testUtterance: "Hej, mit navn er {name} og jeg er en dansk stemme."
  },
  de: {
    defaultRegion: "DE",
    availableRegions: [
      "AT",
      "CH",
      "DE"
    ],
    testUtterance: "Hallo, mein Name ist {name} und ich bin eine deutsche Stimme."
  },
  el: {
    defaultRegion: "GR",
    availableRegions: [
      "GR"
    ],
    testUtterance: "Γεια σας, με λένε {name} και είμαι ελληνική φωνή."
  },
  en: {
    defaultRegion: "US",
    availableRegions: [
      "AU",
      "CA",
      "GB",
      "HK",
      "IE",
      "IN",
      "KE",
      "NG",
      "NZ",
      "PH",
      "SG",
      "TZ",
      "US",
      "ZA"
    ],
    testUtterance: "Hello, my name is {name} and I am an English voice."
  },
  es: {
    defaultRegion: "ES",
    availableRegions: [
      "AR",
      "BO",
      "CL",
      "CO",
      "CR",
      "CU",
      "DO",
      "EC",
      "ES",
      "GQ",
      "GT",
      "HN",
      "MX",
      "NI",
      "PA",
      "PE",
      "PR",
      "PY",
      "SV",
      "US",
      "UY",
      "VE"
    ],
    testUtterance: "Hola, mi nombre es {name} y soy una voz española."
  },
  eu: {
    defaultRegion: "ES",
    availableRegions: [
      "ES"
    ],
    testUtterance: "Kaixo, nire izena {name} da eta euskal ahotsa naiz."
  },
  fa: {
    defaultRegion: "IR",
    availableRegions: [
      "IR"
    ],
    testUtterance: "سلام اسم من {name} و صدای فارسی هستم"
  },
  fi: {
    defaultRegion: "FI",
    availableRegions: [
      "FI"
    ],
    testUtterance: "Hei, nimeni on {name} ja olen suomalainen ääni."
  },
  fr: {
    defaultRegion: "FR",
    availableRegions: [
      "BE",
      "CA",
      "CH",
      "FR"
    ],
    testUtterance: "Bonjour, mon nom est {name} et je suis une voix française."
  },
  gl: {
    defaultRegion: "ES",
    availableRegions: [
      "ES"
    ],
    testUtterance: "Ola, chámome {name} e son unha voz galega."
  },
  he: {
    defaultRegion: "IL",
    availableRegions: [
      "IL"
    ],
    testUtterance: "שלום, שמי {name} ואני קול עברי."
  },
  hi: {
    defaultRegion: "IN",
    availableRegions: [
      "IN"
    ],
    testUtterance: "नमस्कार, मेरा नाम {name} है और मैं एक हिंदी आवाज़ हूँ।"
  },
  hr: {
    defaultRegion: "HR",
    availableRegions: [
      "HR"
    ],
    testUtterance: "Pozdrav, ja sam {name} i hrvatski sam glas."
  },
  hu: {
    defaultRegion: "HU",
    availableRegions: [
      "HU"
    ],
    testUtterance: "Helló, a nevem {name} és magyar hangú vagyok."
  },
  id: {
    defaultRegion: "ID",
    availableRegions: [
      "ID"
    ],
    testUtterance: "Halo, nama saya {name} dan saya suara Indonesia."
  },
  it: {
    defaultRegion: "IT",
    availableRegions: [
      "IT"
    ],
    testUtterance: "Ciao, mi chiamo {name} e sono una voce italiana."
  },
  ja: {
    defaultRegion: "JP",
    availableRegions: [
      "JP"
    ],
    testUtterance: "こんにちは。私の名前は{name}で、日本語の声を担当しています。"
  },
  kk: {
    defaultRegion: "KZ",
    availableRegions: [
      "KZ"
    ],
    testUtterance: "Sälemetsiz be, meniñ atım {name} jäne men qazaq dawısımın."
  },
  kn: {
    defaultRegion: "IN",
    availableRegions: [
      "IN"
    ],
    testUtterance: "ಹಲೋ, ನನ್ನ ಹೆಸರು {name} ಮತ್ತು ನಾನು ಕನ್ನಡ ಧ್ವನಿ."
  },
  ko: {
    defaultRegion: "KR",
    availableRegions: [
      "KR"
    ],
    testUtterance: "안녕하세요, 저는 {name}이고 한국어 음성입니다."
  },
  mr: {
    defaultRegion: "IN",
    availableRegions: [
      "IN"
    ],
    testUtterance: "नमस्कार, माझे नाव {name} आहे आणि मी एक मराठी आवाज आहे."
  },
  ms: {
    defaultRegion: "MY",
    availableRegions: [
      "MY"
    ],
    testUtterance: "Hello, nama saya {name} dan saya suara Melayu."
  },
  nb: {
    defaultRegion: "NO",
    availableRegions: [
      "NO"
    ],
    testUtterance: "Hei, jeg heter {name} og er en norsk stemme."
  },
  nl: {
    defaultRegion: "NL",
    availableRegions: [
      "BE",
      "NL"
    ],
    testUtterance: "Hallo, mijn naam is {name} en ik ben een Nederlandse stem."
  },
  pl: {
    defaultRegion: "PL",
    availableRegions: [
      "PL"
    ],
    testUtterance: "Cześć, nazywam się {name} i mam polski głos."
  },
  pt: {
    defaultRegion: "BR",
    availableRegions: [
      "BR",
      "PT"
    ],
    testUtterance: "Olá, o meu nome é {name} e sou uma voz portuguesa."
  },
  ro: {
    defaultRegion: "RO",
    availableRegions: [
      "RO"
    ],
    testUtterance: "Buna ziua, ma numesc {name} si sunt o voce romaneasca."
  },
  ru: {
    defaultRegion: "RU",
    availableRegions: [
      "RU"
    ],
    testUtterance: "Здравствуйте, меня зовут {name} и я русский голос."
  },
  sk: {
    defaultRegion: "SK",
    availableRegions: [
      "SK"
    ],
    testUtterance: "Dobrý deň, volám sa {name} a som slovenský hlas."
  },
  sl: {
    defaultRegion: "SI",
    availableRegions: [
      "SI"
    ],
    testUtterance: "Pozdravljeni, moje ime je {name} in sem slovenski glas."
  },
  sv: {
    defaultRegion: "SE",
    availableRegions: [
      "SE"
    ],
    testUtterance: "Hej, jag heter {name} och jag är en svensk röst."
  },
  ta: {
    defaultRegion: "IN",
    availableRegions: [
      "IN",
      "LK",
      "MY",
      "SG"
    ],
    testUtterance: "வணக்கம், என் பெயர் {name} மற்றும் நான் ஒரு தமிழ் குரல்"
  },
  te: {
    defaultRegion: "IN",
    availableRegions: [
      "IN"
    ],
    testUtterance: "హలో, నా పేరు {name} మరియు నేను తెలుగు వాణిని."
  },
  th: {
    defaultRegion: "TH",
    availableRegions: [
      "TH"
    ],
    testUtterance: "สวัสดีค่ะ ฉันชื่อ {name} และฉันเป็นคนมีเสียงภาษาไทย"
  },
  tr: {
    defaultRegion: "TR",
    availableRegions: [
      "TR"
    ],
    testUtterance: "Merhaba, adım {name} ve Türk sesiyim."
  },
  uk: {
    defaultRegion: "UA",
    availableRegions: [
      "UA"
    ],
    testUtterance: "Здравствуйте, меня зовут {name} и я украинский голос."
  },
  vi: {
    defaultRegion: "VN",
    availableRegions: [
      "VN"
    ],
    testUtterance: "Xin chào, tôi tên là {name} và tôi là giọng nói tiếng Việt."
  },
  wuu: {
    defaultRegion: "CN",
    availableRegions: [
      "CN"
    ],
    testUtterance: "你好，我的名字是 {name}，我是吴语配音。"
  },
  yue: {
    defaultRegion: "HK",
    availableRegions: [
      "HK"
    ],
    testUtterance: "你好，我叫 {name}，係越中文聲。"
  }
}, Et = /* @__PURE__ */ new Map(), oa = /* @__PURE__ */ Object.assign({ "../../json/ar.json": () => import("./ar-BGKtJRyt.js"), "../../json/bg.json": () => import("./bg-D9Q1JriY.js"), "../../json/bho.json": () => import("./bho-CpuLBMN3.js"), "../../json/bn.json": () => import("./bn-Bpn_lzoe.js"), "../../json/ca.json": () => import("./ca-5hzouNcE.js"), "../../json/cmn.json": () => import("./cmn-DlnYMCd8.js"), "../../json/cs.json": () => import("./cs-CDpMkMNO.js"), "../../json/da.json": () => import("./da-XWCfWAwB.js"), "../../json/de.json": () => import("./de-DU0USiOh.js"), "../../json/el.json": () => import("./el-ClBwbIAW.js"), "../../json/en.json": () => import("./en-l3wcpTw3.js"), "../../json/es.json": () => import("./es-DwOFJY07.js"), "../../json/eu.json": () => import("./eu-DxWirHU-.js"), "../../json/fa.json": () => import("./fa-Ml9KtIw1.js"), "../../json/fi.json": () => import("./fi-Dk-5Fhhl.js"), "../../json/fr.json": () => import("./fr-MfhjukJ4.js"), "../../json/gl.json": () => import("./gl-DwtzWds9.js"), "../../json/he.json": () => import("./he-CfajFNE_.js"), "../../json/hi.json": () => import("./hi-pv2ttBoh.js"), "../../json/hr.json": () => import("./hr-MRApcEKR.js"), "../../json/hu.json": () => import("./hu-DGRDZdHH.js"), "../../json/id.json": () => import("./id-DZUuUiTG.js"), "../../json/it.json": () => import("./it-DJUYnjyj.js"), "../../json/ja.json": () => import("./ja-BpFcZRMu.js"), "../../json/kk.json": () => import("./kk-C480t1iH.js"), "../../json/kn.json": () => import("./kn-BVqs26qv.js"), "../../json/ko.json": () => import("./ko-TNoPZd6N.js"), "../../json/mr.json": () => import("./mr-DstAHTvT.js"), "../../json/ms.json": () => import("./ms-BceBSD-j.js"), "../../json/nb.json": () => import("./nb-CwPbwG-i.js"), "../../json/nl.json": () => import("./nl-BmW-Dmw5.js"), "../../json/pl.json": () => import("./pl-CH8qoDu8.js"), "../../json/pt.json": () => import("./pt-CjCENn24.js"), "../../json/ro.json": () => import("./ro-BlJN7qkA.js"), "../../json/ru.json": () => import("./ru-udzq1D5e.js"), "../../json/sk.json": () => import("./sk-VAEHsTWJ.js"), "../../json/sl.json": () => import("./sl-DaZQ1gp0.js"), "../../json/sv.json": () => import("./sv-CicHwXe4.js"), "../../json/ta.json": () => import("./ta-CvpRY89g.js"), "../../json/te.json": () => import("./te-D5TcdW9V.js"), "../../json/th.json": () => import("./th-CYakoFVa.js"), "../../json/tr.json": () => import("./tr-BfYrcAz7.js"), "../../json/uk.json": () => import("./uk-BVs6lQbX.js"), "../../json/vi.json": () => import("./vi-DP1xN9KL.js"), "../../json/wuu.json": () => import("./wuu-C6uQvT6g.js"), "../../json/yue.json": () => import("./yue-C8kEWdfv.js") });
async function la(n) {
  try {
    const e = n.split("-")[0], t = oa[`../../json/${e}.json`];
    if (!t)
      throw new Error(`No voice data found for language: ${n}`);
    const i = (await t()).default;
    return {
      ...i,
      voices: i.voices.map(ha)
    };
  } catch (e) {
    return console.warn(`Failed to load voice data for ${n}:`, e), {
      language: n,
      defaultRegion: "",
      testUtterance: "",
      voices: []
    };
  }
}
function On(n) {
  return Et.has(n) || Et.set(n, la(n)), Et.get(n);
}
const ca = ["veryLow", "low", "normal", "high", "veryHigh"], ua = ["android", "apple"], ha = (n) => ({
  ...n,
  quality: n.quality?.filter((e) => ca.includes(e)),
  localizedName: n.localizedName && ua.includes(n.localizedName) ? n.localizedName : void 0
}), Ot = async (n) => {
  if (!n) return [];
  try {
    const e = V(n);
    try {
      const s = await On(e);
      if (s?.voices?.length)
        return s.voices;
    } catch (s) {
      console.warn(`Failed to load voices for ${e}:`, s);
    }
    const [t] = O(e);
    if (t !== e)
      try {
        const s = await On(t);
        if (s?.voices?.length)
          return s.voices;
      } catch (s) {
        console.warn(`Failed to load voices for base language ${t}:`, s);
      }
    return [];
  } catch (e) {
    return console.error(`Error in getVoices for ${n}:`, e), [];
  }
}, Lt = (n, e) => {
  try {
    return new Intl.DisplayNames(
      e ? [e] : [],
      { type: "language", languageDisplay: "standard" }
    ).of(n) || n.toUpperCase();
  } catch {
    return n.toUpperCase();
  }
}, Ln = (n) => {
  if (!n) return "";
  try {
    const e = V(n), t = W[e];
    if (t?.testUtterance)
      return t.testUtterance;
    if (e in me) {
      const i = me[e];
      if (i && W[i]?.testUtterance)
        return W[i].testUtterance;
    }
    const [s] = O(e);
    return s !== e && W[s]?.testUtterance ? W[s].testUtterance : "";
  } catch (e) {
    return console.error(`Error in getTestUtterance for ${n}:`, e), "";
  }
}, ht = (n) => {
  if (!n) return "";
  try {
    const e = V(n), t = W[e];
    if (t?.defaultRegion)
      return `${e}-${t.defaultRegion}`;
    if (e in me) {
      const i = me[e];
      if (i) {
        const a = W[i];
        if (a?.defaultRegion)
          return `${i}-${a.defaultRegion}`;
      }
    }
    const [s] = O(e);
    if (s !== e) {
      const i = W[s];
      if (i?.defaultRegion)
        return `${s}-${i.defaultRegion}`;
    }
    return "";
  } catch (e) {
    return console.error(`Failed to get default region for ${n}:`, e), "";
  }
}, dt = (n) => {
  if (!n?.length) return [];
  const e = /* @__PURE__ */ new Set(), t = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map();
  for (const [i, a] of n.entries()) {
    if (!a) continue;
    const r = V(a), [o, l] = O(r);
    l && (e.add(l), s.has(l) || s.set(l, i)), t.has(o) || t.set(o, /* @__PURE__ */ new Set()), l && t.get(o).add(l);
  }
  return Array.from(t.entries()).map(([i, a]) => {
    const r = new Set(
      W[i]?.availableRegions || []
    ), o = Array.from(a), l = Array.from(e).filter(
      (u) => r.has(u) && !o.includes(u)
    ), c = Array.from(/* @__PURE__ */ new Set([...o, ...l])).sort((u, h) => {
      const d = s.get(u) ?? Number.MAX_SAFE_INTEGER, g = s.get(h) ?? Number.MAX_SAFE_INTEGER;
      return d - g;
    });
    if (c.length === 0) {
      const u = ht(i), [, h] = O(u);
      h && c.push(h);
    }
    return {
      baseLang: i,
      regions: c
    };
  });
}, ve = async (n) => {
  const e = /* @__PURE__ */ new Map();
  for (const s of n) {
    if (s.source !== "json") continue;
    const [i] = O(s.language);
    e.has(i) || e.set(i, []), e.get(i).push(s);
  }
  const t = /* @__PURE__ */ new Map();
  for (const [s, i] of e.entries()) {
    const a = /* @__PURE__ */ new Map(), r = await Ot(s), o = /* @__PURE__ */ new Map();
    r.forEach((l, c) => {
      o.set(l.name.toLowerCase(), c), l.altNames?.forEach((u) => {
        o.set(u.toLowerCase(), c);
      });
    });
    for (const l of i) {
      const c = l.name.toLowerCase(), u = o.get(c);
      u !== void 0 && a.set(l.name, u);
    }
    a.size > 0 && t.set(s, a);
  }
  return t;
}, da = {
  veryLow: 1,
  low: 2,
  normal: 3,
  high: 4,
  veryHigh: 5
}, Je = (n) => n ? da[n] ?? 0 : 0, ie = (n, e, t, s) => {
  const i = Je(n.quality), a = Je(e.quality);
  if (t && s && n.source === "json" && e.source === "json") {
    const r = t.get(s);
    if (r) {
      const o = r.get(n.name), l = r.get(e.name);
      if (o !== void 0 && l !== void 0)
        return o - l;
    }
  }
  return a !== i ? a - i : n.name.localeCompare(e.name);
}, gt = (n, e) => {
  const t = new Map(e.map((a) => [a.baseLang, a])), s = /* @__PURE__ */ new Map(), i = [];
  for (const a of n) {
    const [r] = O(a.language);
    t.get(r) ? (s.has(r) || s.set(r, []), s.get(r).push(a)) : i.push(a);
  }
  return { voicesByLang: s, otherLangVoices: i };
}, ps = (n, e, t, s) => {
  const [, i] = O(n.language), [, a] = O(e.language), r = i && t.regions.includes(i), o = a && t.regions.includes(a);
  if (r && o) {
    const d = t.regions.indexOf(i), g = t.regions.indexOf(a);
    return d === g ? ie(n, e, s, t.baseLang) : d - g;
  }
  if (r) return -1;
  if (o) return 1;
  const l = ht(t.baseLang), [, c] = O(l), u = !!c && i === c, h = !!c && a === c;
  if (u && !h) return -1;
  if (!u && h) return 1;
  if (i && a) {
    const d = i.localeCompare(a);
    return d !== 0 ? d : ie(n, e, s, t.baseLang);
  }
  return i ? -1 : a ? 1 : ie(n, e, s, t.baseLang);
}, ga = async (n, e, t) => {
  const s = t ?? await ve(n);
  n.sort((i, a) => ps(i, a, e, s));
}, ms = (n, e, t) => {
  const [s] = O(n.language), [i] = O(e.language), a = Lt(s).toLowerCase(), r = Lt(i).toLowerCase(), o = a.localeCompare(r);
  if (o !== 0)
    return o;
  if (s === i) {
    const l = ht(s), [, c] = O(n.language), [, u] = O(e.language), h = l && c === l.split("-")[1], d = l && u === l.split("-")[1];
    if (h && !d) return -1;
    if (!h && d) return 1;
    if (c && u) {
      const g = c.localeCompare(u);
      if (g !== 0)
        return g;
    }
    return c && !u ? -1 : !c && u ? 1 : ie(n, e, t, s);
  }
  return ie(n, e, t, s);
}, Vt = async (n, e) => {
  const t = e ?? await ve(n);
  n.sort((s, i) => ms(s, i, t));
}, vs = async (n, e) => {
  if (!e?.length) return [];
  const t = dt(n || []), { voicesByLang: s, otherLangVoices: i } = gt(e, t), a = await ve(e), r = [];
  for (const o of t) {
    const l = s.get(o.baseLang);
    l && (await ga(l, o, a), r.push(...l));
  }
  return await Vt(i, a), r.push(...i), r;
}, ys = async (n, e) => {
  if (!e.length) return null;
  const [t] = dt([n]), { voicesByLang: s, otherLangVoices: i } = gt(e, [t]), a = s.get(t.baseLang), r = a?.length ? a : i, o = await ve(e), l = a?.length ? (c, u) => ps(c, u, t, o) : (c, u) => ms(c, u, o);
  return r.reduce((c, u) => l(u, c) < 0 ? u : c);
}, Ss = (n, e) => {
  const t = n.filter((s) => s.controls?.boundary !== !1 === e);
  return t.length > 0 ? t : n;
}, fa = [{ name: "Albert", nativeID: ["com.apple.speech.synthesis.voice.Albert"], note: "This novelty voice is part of a pack preloaded by Apple.", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Bad News", nativeID: ["com.apple.speech.synthesis.voice.BadNews"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Mauvaises nouvelles", "Malas noticias", "Brutte notizie"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Bahh", nativeID: ["com.apple.speech.synthesis.voice.Bahh"], note: "This novelty voice is part of a pack preloaded by Apple.", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Bells", nativeID: ["com.apple.speech.synthesis.voice.Bells"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Cloches", "Campanas", "Campane"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Boing", nativeID: ["com.apple.speech.synthesis.voice.Boing"], note: "This novelty voice is part of a pack preloaded by Apple.", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Bubbles", nativeID: ["com.apple.speech.synthesis.voice.Bubbles"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Bulles", "Burbujas", "Bollicine"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Cellos", nativeID: ["com.apple.speech.synthesis.voice.Cellos"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Violoncelles", "Violonchelos", "Violoncelli"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Good News", nativeID: ["com.apple.speech.synthesis.voice.GoodNews"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Bonnes nouvelles", "Buenas noticias", "Buone notizie"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Jester", nativeID: ["com.apple.speech.synthesis.voice.Hysterical"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Bouffon", "Bufón", "Giullare"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Organ", nativeID: ["com.apple.speech.synthesis.voice.Organ"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Orgue", "Órgano", "Organo"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Superstar", nativeID: ["com.apple.speech.synthesis.voice.Princess"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Superestrella"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Trinoids", nativeID: ["com.apple.speech.synthesis.voice.Trinoids"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Trinoïdes"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Whisper", nativeID: ["com.apple.speech.synthesis.voice.Whisper"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Murmure", "Susurro", "Sussurro"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Wobble", nativeID: ["com.apple.speech.synthesis.voice.Deranged"], note: "This novelty voice is part of a pack preloaded by Apple.", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Zarvox", nativeID: ["com.apple.speech.synthesis.voice.Zarvox"], note: "This novelty voice is part of a pack preloaded by Apple.", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }], pa = {
  voices: fa
}, ma = [{ name: "Eddy", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Flo", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Grandma", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Grandpa", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Jacques", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Reed", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Rocko", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Sandy", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Shelley", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Fred", language: "en-US", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Junior", language: "en-US", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Kathy", language: "en-US", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Ralph", language: "en-US", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "eSpeak Arabic", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ar", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Bulgarian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "bg", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Bengali", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "bn", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Catalan", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ca", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Chinese (Mandarin, latin as English)", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "cmn", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Czech", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "cs", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Danish", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "da", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak German", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "de", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Greek", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "el", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Spanish (Spain)", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "es", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Estonian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "et", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Finnish", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "fi", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Gujarati", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "gu", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Croatian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "hr", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Hungarian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "hu", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Indonesian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "id", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Italian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "it", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Kannada", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "kn", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Korean", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ko", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Lithuanian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "lt", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Latvian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "lv", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Malayalm", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ml", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Marathi", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "mr", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Malay", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ms", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Norwegian Bokmål", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "nb", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Polish", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "pl", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Portuguese (Brazil)", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "pt-br", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Romanian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ro", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Russian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ru", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Slovak", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "sk", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Slovenian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "sl", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Serbian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "sv", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Swedish", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "sv", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Swahili", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "sw", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Tamil", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ta", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Telugu", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "te", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Turkish", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "tr", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Vietnamese (Northern)", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "vi", os: ["ChromeOS"], preloaded: !0 }], va = {
  voices: ma
}, ya = pa, Sa = va, Tt = (n, e) => ya.voices.some(
  (t) => n.includes(t.name) || e && t.nativeID?.some((s) => e.includes(s)) || t.altNames?.some((s) => n.includes(s))
), Ut = (n, e) => Sa.voices.some(
  (t) => n.includes(t.name)
) || e === "veryLow", Nt = (n) => n?.length ? n.filter((e) => !(e.isNovelty || Tt(e.name, e.voiceURI))) : [], zt = (n) => n?.length ? n.filter((e) => !Ut(e.name, e.quality)) : [], ba = (n, e) => {
  const t = (Array.isArray(e) ? e : [e]).map(se);
  return n.filter((s) => [s.language, s.altLanguage].some((i) => !!i && t.includes(se(i))));
}, wa = { ar: { normal: "محسن", high: "استثنائي" }, ca: { normal: "millorada", high: "prèmium" }, "cmn-CN": { normal: "优化音质", high: "高音质" }, "cmn-TW": { normal: "增強音質", high: "高音質" }, cs: { normal: "vylepšená verze", high: "prémiový" }, da: { normal: "forbedret", high: "høj kvalitet" }, de: { normal: "erweitert", high: "premium" }, el: { normal: "βελτιωμένη", high: "υψηλής ποιότητας" }, en: { normal: "Enhanced", high: "Premium" }, es: { normal: "mejorada", high: "premium" }, fi: { normal: "parannettu", high: "korkealaatuinen" }, fr: { normal: "premium", high: "de qualité" }, he: { normal: "משופר", high: "פרימיום" }, hi: { normal: "बेहतर", high: "प्रीमियम" }, hr: { normal: "poboljšani", high: "vrhunski" }, hu: { normal: "továbbfejlesztett", high: "prémium" }, id: { normal: "Ditingkatkan", high: "Premium" }, it: { normal: "ottimizzata", high: "premium" }, ja: { normal: "拡張", high: "プレミアム" }, ko: { normal: "고품질", high: "프리미엄" }, ms: { normal: "Dipertingkat", high: "Premium" }, nb: { normal: "forbedret", high: "premium" }, nl: { normal: "verbeterd", high: "premium" }, pl: { normal: "rozszerzony", high: "premium" }, pt: { normal: "melhorada", high: "premium" }, ro: { normal: "îmbunătățită", high: "premium" }, ru: { normal: "улучшенный", high: "высшее качество" }, sk: { normal: "vylepšený", high: "prémiový" }, sl: { normal: "izboljšano", high: "prvovrsten" }, sv: { normal: "förbättrad", high: "premium" }, th: { normal: "คุณภาพสูง", high: "คุณภาพสูง" }, tr: { normal: "Geliştirilmiş", high: "Yüksek Kaliteli" }, uk: { normal: "вдосконалений", high: "високої якості" }, vi: { normal: "Nâng cao", high: "Cao cấp" } }, ka = {
  quality: wa
}, Mt = {
  apple: ka.quality
  // android: androidQualities.quality
}, Ea = (n, e, t) => {
  if (!n) return;
  const s = Array.isArray(t) ? t : t ? [t] : [];
  for (const i of s)
    if (i && Mt[i]) {
      const a = Mt[i], r = O(e)[0], o = a[e] || a[r];
      if (o) {
        const l = n.toLowerCase(), { normal: c, high: u } = o;
        if (u && l.includes(u.toLowerCase()))
          return "high";
        if (c && l.includes(c.toLowerCase()))
          return "normal";
      }
    }
}, Ca = (n, e) => {
  const t = Mt[e];
  if (t)
    for (const [s, { high: i, normal: a }] of Object.entries(t)) {
      const r = i && n.some((l) => l.includes(i)), o = a && n.some((l) => l.includes(a));
      if (r && o)
        return s;
    }
}, Ra = {
  low: {
    values: ["super-compact", "compact"],
    quality: "low"
  },
  normal: {
    values: ["enhanced"],
    quality: "normal"
  },
  high: {
    values: ["premium"],
    quality: "high"
  }
}, Vn = (n) => {
  if (!n) return;
  const t = n.toLowerCase().split(/[._-]/);
  for (const s of Object.values(Ra))
    if (s.values.some((i) => t.includes(i)))
      return s.quality;
};
function Ia(n, e) {
  if (n.name === n.originalName) return n;
  if (e.name === e.originalName) return e;
  const t = [n.originalName, ...n.altNames || []], s = [e.originalName, ...e.altNames || []], i = t.findIndex((r) => s.includes(r)), a = s.findIndex((r) => t.includes(r));
  return i === -1 && a === -1 || i !== -1 && (a === -1 || i <= a) ? n : e;
}
function Pa(n, e) {
  if (!n.altNames && !e.altNames)
    return !1;
  const t = n.originalName, s = e.originalName, i = n.altNames || [], a = e.altNames || [];
  return a.includes(t) || i.includes(s) ? !0 : i.filter((o) => a.includes(o)).length > 0;
}
const bs = () => {
  const e = typeof window < "u" && (window.navigator || {}).userAgent || "", t = () => /android/i.test(e), s = () => /kaios/i.test(e), i = () => /linux/i.test(e) && !t(), a = () => typeof window.InstallTrigger < "u" ? !0 : /firefox/i.test(e), r = () => /AppleWebKit/i.test(e) && !/Chrome|Chromium|Edg\/|OPR|Android/i.test(e);
  return {
    isAndroid: t(),
    isFirefox: a() || s(),
    isSafari: r(),
    isKaiOS: s(),
    isLinux: i()
  };
};
class P {
  static instance;
  static initializationPromise = null;
  systemLocale;
  isAndroid;
  voices = [];
  browserVoices = [];
  isInitialized = !1;
  // Base language codes already parsed into `voices`; null means unscoped (everything loaded)
  scopedLanguages = null;
  broadenPromises = /* @__PURE__ */ new Map();
  constructor() {
    if (typeof window > "u" || !window.speechSynthesis)
      throw new Error("Web Speech API is not available in this environment");
    this.systemLocale = navigator.languages?.[0]?.split("-")[0] || "en", this.isAndroid = bs().isAndroid;
  }
  /**
   * Initialize voice manager, or broaden an already-initialized singleton to
   * also cover new languages. `languages` scope voice parsing to reduce
   * per-language JSON loading; omitting it on the first call loads everything,
   * but omitting it on a later call to an already-scoped instance is a no-op,
   * not a retroactive broaden-to-everything.
   * @param options Configuration options for voice loading
   * @param options.languages Optional array of preferred language codes to filter (or broaden to) voices
   * @param options.maxTimeout Maximum time in milliseconds to wait for voices to load (passed to getBrowserVoices, first call only)
   * @param options.interval Interval in milliseconds between voice loading checks (passed to getBrowserVoices, first call only)
   * @returns Promise that resolves with the WebSpeechVoiceManager instance
   */
  static async initialize(e) {
    if (P.instance?.isInitialized) {
      const t = P.instance;
      return e?.languages && e.languages.length > 0 && await t.broadenLanguages(e.languages), t;
    }
    return P.initializationPromise || (P.initializationPromise = (async () => {
      try {
        const t = new P();
        P.instance = t, t.browserVoices = await t.getBrowserVoices(e?.maxTimeout, e?.interval), t.updateSystemLocale(t.browserVoices);
        let s = t.browserVoices;
        return e?.languages && e.languages.length > 0 ? (s = t.filterBrowserVoicesByLanguages(t.browserVoices, e.languages), t.scopedLanguages = P.toBaseLangSet(e.languages)) : t.scopedLanguages = null, t.voices = await t.parseToReadiumSpeechVoices(s), t.isInitialized = !0, t;
      } catch (t) {
        throw P.initializationPromise = null, console.error("Failed to initialize WebSpeechVoiceManager:", t), t;
      }
    })()), P.initializationPromise;
  }
  /**
   * Filter browser voices based on preferred languages
   * @private
   */
  filterBrowserVoicesByLanguages(e, t) {
    if (!t?.length) return e;
    const s = P.toBaseLangSet(t);
    return e.filter((i) => {
      if (!i?.lang) return !1;
      const a = V(i.lang), [r] = P.extractLangRegionFromBCP47(a);
      return s.has(r);
    });
  }
  /**
   * Extract base language codes (e.g. "en", "fr") from a list of BCP47 tags
   * @private
   */
  static toBaseLangSet(e) {
    return new Set(
      e.map((t) => {
        const s = V(t), [i] = P.extractLangRegionFromBCP47(s);
        return i;
      })
    );
  }
  /**
   * Broaden an already-initialized instance to also cover the given languages,
   * reusing the already-fetched `browserVoices` (no new speechSynthesis fetch).
   * No-op if the instance is already unscoped or already covers these languages.
   * @private
   */
  async broadenLanguages(e) {
    if (this.scopedLanguages === null) return;
    const s = [...P.toBaseLangSet(e)].filter((o) => !this.scopedLanguages.has(o));
    if (s.length === 0) return;
    const i = s.filter((o) => this.broadenPromises.has(o)), a = s.filter((o) => !this.broadenPromises.has(o));
    let r;
    a.length > 0 && (r = (async () => {
      const o = this.filterBrowserVoicesByLanguages(this.browserVoices, a), l = await this.parseToReadiumSpeechVoices(o);
      this.voices = [...this.voices, ...l], a.forEach((c) => this.scopedLanguages.add(c)), a.forEach((c) => this.broadenPromises.delete(c));
    })(), a.forEach((o) => this.broadenPromises.set(o, r))), await Promise.all([
      ...r ? [r] : [],
      ...i.map((o) => this.broadenPromises.get(o))
    ]);
  }
  /**
   * Extract language and region from BCP47 language tag
   * @param lang - The BCP47 language tag (e.g., "en-US", "zh-CN")
   * @returns A tuple of [language, region] where language is lowercase and region is UPPERCASE
   */
  static extractLangRegionFromBCP47(e) {
    return O(e);
  }
  /**
   * Clean voice name by removing specific formatting
   * @private
   */
  cleanVoiceName(e) {
    return e ? e.replace(/\s*\([^)]*\)/g, "").replace(/[^\p{L}\p{N}\s-]/gu, "").replace(/\s+/g, " ").trim() : "";
  }
  /**
   * Normalize voice name for comparison by removing common variations
   * @private
   */
  normalizeVoiceName(e) {
    return this.cleanVoiceName(e.toLowerCase());
  }
  /**
   * Count occurrences of each voice based on language and normalized name
   * @private
   */
  countVoiceDuplicates(e) {
    const t = /* @__PURE__ */ new Map();
    for (const s of e) {
      if (!s?.name || !s?.lang) continue;
      const i = `${s.lang.toLowerCase()}_${this.normalizeVoiceName(s.name)}`;
      t.set(i, (t.get(i) || 0) + 1);
    }
    return t;
  }
  /**
   * Updates the system locale based on available voices by detecting quality indicators.
   * The method extracts voice names and attempts to find a matching locale with both
   * high and normal quality indicators. If found, updates the systemLocale property.
   * 
   * @param voices - Array of SpeechSynthesisVoice objects to analyze for locale detection
   * @returns void - Updates the systemLocale property if a matching locale is found
   */
  updateSystemLocale(e) {
    if (!e?.length) return;
    const t = e.map((i) => i.name), s = Ca(t, "apple");
    s && (this.systemLocale = s);
  }
  /**
   * Infer voice quality based on package, platform, JSON, or duplicate count
   * Returns null if quality cannot be determined
   * @private
   */
  inferVoiceQuality(e, t, s) {
    const i = e.voiceURI ? Vn(e.voiceURI) : void 0;
    if (i) return i;
    if (t?.nativeID && Array.isArray(t.nativeID))
      for (const a of t.nativeID) {
        const r = Vn(a);
        if (r) return r;
      }
    if (t?.localizedName && e.voiceURI && e.lang) {
      const a = Ea(
        e.voiceURI,
        this.systemLocale,
        t.localizedName
      );
      if (a) return a;
    }
    if (t?.quality && t.quality.length > 0) {
      const a = Math.min(s - 1, t.quality.length - 1), r = t.quality[a];
      if (r)
        return r;
    }
    return null;
  }
  /**
   * Find matching JSON voice by name or alternative names
   * @private
   */
  findMatchingJsonVoice(e, t) {
    return e.find(
      (s) => this.normalizeVoiceName(s.name) === t || s.altNames?.some((i) => this.normalizeVoiceName(i) === t)
    );
  }
  /**
   * Remove duplicate voices, keeping the highest quality version of each voice
   * @param voices Array of voices to remove duplicates from
   * @returns Filtered array with duplicates removed, keeping only the highest quality versions
   */
  removeDuplicates(e) {
    const t = /* @__PURE__ */ new Map();
    for (const s of e) {
      const i = `${s.language.toLowerCase()}_${this.normalizeVoiceName(s.name)}`, a = t.get(i);
      if (!a)
        t.set(i, s);
      else {
        const r = Je(a.quality), o = Je(s.quality);
        if (o === r && Pa(s, a)) {
          const l = Ia(s, a);
          t.set(i, l);
        } else
          o >= r && t.set(i, s);
      }
    }
    return Array.from(t.values());
  }
  /**
   * Get test utterance for a given language
   * @param language - Language code (e.g., "en", "fr", "es")
   * @returns Promise that resolves to the test utterance text
   */
  getTestUtterance(e) {
    if (!e) return "";
    const t = Ln(e);
    if (t) return t;
    const [s] = P.extractLangRegionFromBCP47(e);
    if (s && s !== e) {
      const i = Ln(s);
      if (i) return i;
    }
    return "";
  }
  /**
   * Get all voices matching the filter criteria
   * @returns Promise that resolves to an array of filtered voices
   */
  getVoices(e = {}) {
    if (!this.isInitialized)
      throw new Error("WebSpeechVoiceManager not initialized. Call initialize() first.");
    return this.filterVoices(e, [...this.voices]);
  }
  /**
   * Get available languages with voice counts
   * @param localization Optional BCP 47 language tag to use for language names
   * @param filterOptions Optional filters to apply to voices before counting languages
   * @param voices Optional array of voices to count (defaults to this.voices)
   */
  getLanguages(e, t, s) {
    if (!s && !this.isInitialized)
      throw new Error("WebSpeechVoiceManager not initialized. Call initialize() first.");
    const i = s ?? this.voices, a = t ? this.filterVoices(t, i) : i, r = this.countLanguages(a.map((o) => o.language), e);
    return s ? r : r.sort((o, l) => o.label.localeCompare(l.label));
  }
  /**
   * Get the languages of every voice the browser has, with voice counts, sorted by name
   * Unlike getLanguages(), it covers languages initialize() wasn't called with, without loading their voice data
   * @param localization Optional BCP 47 language tag to use for language names
   */
  getBrowserLanguages(e) {
    if (!this.isInitialized)
      throw new Error("WebSpeechVoiceManager not initialized. Call initialize() first.");
    const t = this.browserVoices.filter((s) => s?.lang).map((s) => s.lang);
    return this.countLanguages(t, e).sort((s, i) => s.label.localeCompare(i.label));
  }
  // By base language, in order of first occurrence
  countLanguages(e, t) {
    const s = /* @__PURE__ */ new Map();
    for (const i of e) {
      const a = V(i).split("-")[0];
      s.set(a, (s.get(a) ?? 0) + 1);
    }
    return [...s].map(([i, a]) => ({ code: i, label: Lt(i, t), count: a }));
  }
  /**
   * Get available regions with voice counts
   * @param localization Optional BCP 47 language tag to use for region names
   * @param filterOptions Optional filters to apply to voices before counting regions
   * @param voices Optional array of voices to count (defaults to this.voices)
   */
  getRegions(e, t, s) {
    if (!s && !this.isInitialized)
      throw new Error("WebSpeechVoiceManager not initialized. Call initialize() first.");
    const i = s ?? this.voices, a = t ? this.filterVoices(t, i) : i, r = [], o = /* @__PURE__ */ new Set(), l = /* @__PURE__ */ new Map();
    for (const c of a) {
      const [, u] = P.extractLangRegionFromBCP47(c.language);
      u && l.set(u, (l.get(u) || 0) + 1);
    }
    for (const c of a) {
      const [, u] = P.extractLangRegionFromBCP47(c.language);
      if (u && !o.has(u)) {
        let h = c.language;
        try {
          const d = e || navigator.language;
          h = new Intl.DisplayNames([d], { type: "region" }).of(u) || c.language;
        } catch (d) {
          console.warn(`Failed to get display name for region ${u}`, d);
        }
        r.push({
          code: u,
          label: h,
          count: l.get(u) || 0
        }), o.add(u);
      }
    }
    return s ? r : r.sort((c, u) => c.label.localeCompare(u.label));
  }
  /**
   * Get the default voice for language preferences
   * @param languages Array of preferred languages in order of preference, or a single language string
   * @param voices Optional pre-filtered voices array to use instead of fetching voices
   * @returns The default voice for the language, or null if no voices are available
   */
  async getDefaultVoice(e, t) {
    if (!e) return null;
    const s = Array.isArray(e) ? e : [e];
    let i = t || this.getVoices({ languages: s });
    return i.length ? (i = await this.sortVoicesByRegions(s, i), i[0]) : null;
  }
  getBrowserVoices(e = 1e4, t = 10) {
    const s = () => window.speechSynthesis?.getVoices() || [];
    if (!window.speechSynthesis)
      return Promise.resolve([]);
    const i = s();
    return Array.isArray(i) && i.length ? Promise.resolve(i) : new Promise((a, r) => {
      let o = Math.floor(e / t), l = !1;
      const c = () => {
        if (l) return;
        l = !0;
        const u = () => {
          if (o < 1) return a([]);
          --o;
          const h = s();
          if (Array.isArray(h) && h.length) return a(h);
          setTimeout(u, t);
        };
        setTimeout(u, t);
      };
      window.speechSynthesis.onvoiceschanged !== void 0 ? window.speechSynthesis.onvoiceschanged = () => {
        const u = s();
        Array.isArray(u) && u.length ? a(u) : c();
      } : c(), setTimeout(() => a([]), e);
    });
  }
  /**
   * Convert SpeechSynthesisVoice array to ReadiumSpeechVoice array
   * @private
   */
  async parseToReadiumSpeechVoices(e) {
    const t = this.countVoiceDuplicates(e);
    return await Promise.all(
      e.filter((i) => i?.name && i?.lang).map(async (i) => {
        const a = V(i.lang), [r] = P.extractLangRegionFromBCP47(a), o = this.normalizeVoiceName(i.name), l = `${i.lang.toLowerCase()}_${o}`, c = t.get(l) || 1;
        let u = await Ot(a);
        (!u || u.length === 0) && (u = await Ot(r));
        const h = this.findMatchingJsonVoice(u, o), d = this.inferVoiceQuality(i, h, c), g = this.isAndroid || !h ? { ...h?.controls, boundary: !1 } : h?.controls;
        return h ? {
          ...h,
          label: h.label ?? this.cleanVoiceName(i.name),
          source: "json",
          originalName: i.name,
          ...g && { controls: g },
          language: h.language ?? a,
          voiceURI: i.voiceURI,
          quality: d,
          isDefault: i.default || !1,
          offlineAvailability: i.localService || !1,
          isNovelty: Tt(i.name, i.voiceURI),
          isLowQuality: Ut(i.name, d)
        } : {
          source: "browser",
          label: this.cleanVoiceName(i.name),
          name: i.name,
          originalName: i.name,
          ...g && { controls: g },
          language: a,
          voiceURI: i.voiceURI,
          quality: d,
          isDefault: i.default || !1,
          offlineAvailability: i.localService || !1,
          isNovelty: Tt(i.name, i.voiceURI),
          isLowQuality: Ut(i.name, d)
        };
      })
    );
  }
  /**
   * Convert an ReadiumSpeechVoice to a native SpeechSynthesisVoice
   */
  convertToSpeechSynthesisVoice(e) {
    if (e)
      return this.browserVoices.find((t) => e.voiceURI !== void 0 && t.voiceURI === e.voiceURI) ?? this.browserVoices.find((t) => t.name === e.originalName) ?? this.browserVoices.find((t) => this.normalizeVoiceName(t.name) === this.normalizeVoiceName(e.name));
  }
  /**
   * Filter voices based on the provided options
   */
  filterVoices(e, t) {
    let s = t ? [...t] : [...this.voices];
    const i = {
      excludeNovelty: !0,
      // Default to true to filter out novelty voices
      excludeVeryLowQuality: !0,
      // Default to true to filter out very low quality voices
      removeDuplicates: !0,
      // Default to true - remove duplicates by default
      ...e
      // Let explicit options override the defaults
    };
    if (i.languages && (s = ba(s, i.languages)), i.source && (s = s.filter((a) => a.source === i.source)), i.gender && (s = s.filter((a) => a.gender === i.gender)), i.quality) {
      const a = Array.isArray(i.quality) ? i.quality : [i.quality];
      s = s.filter((r) => r.quality && a.includes(r.quality));
    }
    return i.offlineOnly && (s = s.filter((a) => a.offlineAvailability === !0)), i.provider && (s = s.filter(
      (a) => a.provider?.toLowerCase() === i.provider?.toLowerCase()
    )), i.excludeNovelty && (s = Nt(s)), i.excludeVeryLowQuality && (s = zt(s)), i.removeDuplicates && (s = this.removeDuplicates(s)), s;
  }
  /**
   * Filter out novelty voices
   * @param voices Array of voices to filter
   * @returns Filtered array with novelty voices removed
   */
  filterOutNoveltyVoices(e) {
    const t = e ?? this.voices;
    return Nt(t);
  }
  /**
   * Filter out very low quality voices
   * @param voices Array of voices to filter
   * @returns Filtered array with very low quality voices removed
   */
  filterOutVeryLowQualityVoices(e) {
    const t = e ?? this.voices;
    return zt(t);
  }
  /**
   * Sort voices by quality, respecting JSON name order, then alphabetically for undefined/null quality
   * @param voices Array of voices to sort
   * @returns Sorted array of voices
   */
  async sortVoicesByQuality(e) {
    const t = e || this.voices;
    if (!t?.length) return [];
    const s = await ve(t);
    return [...t].sort((i, a) => ie(i, a, s));
  }
  /**
   * Sort regions by default then alphabetically, sort voices by quality
   */
  static async sortByDefaultRegion(e, t) {
    const s = await ve(e), i = ht(t);
    e.sort((a, r) => {
      const [, o] = P.extractLangRegionFromBCP47(a.language), [, l] = P.extractLangRegionFromBCP47(r.language), c = i && o === i.split("-")[1], u = i && l === i.split("-")[1];
      return c && !u ? -1 : !c && u ? 1 : ie(a, r, s, t);
    });
  }
  /**
   * Sort voices by language preference, then alphabetically
   * @param voices Array of voices to sort
   * @param preferredLanguages Array of preferred language codes in order of preference
   * @returns Sorted array of voices
   */
  async sortVoicesByLanguages(e, t) {
    const s = t || this.voices;
    if (!s?.length) return [];
    if (!e?.length) {
      const l = [...s];
      return await Vt(l), l;
    }
    const i = dt(e), { voicesByLang: a, otherLangVoices: r } = gt(s, i), o = [];
    for (const l of i) {
      const c = a.get(l.baseLang);
      c && (await P.sortByDefaultRegion(c, l.baseLang), o.push(...c));
    }
    return await Vt(r), o.push(...r), o;
  }
  /**
   * Sort voices by region preference, then alphabetically
   * @param voices Array of voices to sort
   * @param preferredLanguages Array of preferred language codes in order of preference
   * @returns Sorted array of voices
   */
  async sortVoicesByRegions(e, t) {
    return vs(e, t || this.voices);
  }
  /**
   * Group voices by the specified criteria
   * @param voices Array of voices to group
   * @param options Grouping options
   * @returns Object with voice groups keyed by the grouping criteria
   */
  groupVoices(e, t) {
    const s = {}, i = t || this.voices;
    for (const a of i) {
      let r = "Unknown";
      switch (e) {
        case "languages":
          r = P.extractLangRegionFromBCP47(a.language)[0];
          break;
        case "gender":
          r = a.gender || "unknown";
          break;
        case "quality":
          r = a.quality || "unknown";
          break;
        case "region":
          const [, o] = P.extractLangRegionFromBCP47(a.language);
          r = o || "unknown";
          break;
      }
      s[r] || (s[r] = []), s[r].push(a);
    }
    return s;
  }
}
const ws = async (n, e, t = !0) => {
  const s = (r) => O(V(r))[0], i = s(n), a = zt(Nt(e)).filter((r) => s(r.language) === i);
  return a.length === 0 ? null : ys(n, Ss(a, t));
}, ks = async (n, e) => {
  n?.length || (n = typeof navigator < "u" && navigator.languages?.length ? [...navigator.languages] : ["en"]);
  for (const t of n) {
    const s = await ws(t, e);
    if (s) return s;
  }
  return (await vs(n, e))[0] ?? null;
}, F = (n) => n.voiceURI ?? n.identifier ?? n.name, Aa = ["webKit", "moz", "ms", "o"], xa = [
  "boundary",
  "end",
  "error",
  "mark",
  "pause",
  "resume",
  "start"
], Oa = (n) => `${n.charAt(0).toUpperCase()}${n.slice(1)}`, Re = (n = {}, e) => Object.hasOwnProperty.call(n, e) || e in n || !!n[e], La = (n) => typeof window < "u" && n in window, Va = (n) => {
  const e = Oa(n), t = Aa.map((i) => `${i}${e}`), s = [n, e].concat(t).find(La);
  return s && typeof window < "u" ? window[s] : void 0;
}, Ta = () => {
  const n = {};
  [
    "speechSynthesis",
    "speechSynthesisUtterance",
    "speechSynthesisVoice",
    "speechSynthesisEvent",
    "speechSynthesisErrorEvent"
  ].forEach((t) => {
    n[t] = Va(t);
  }), n.onvoiceschanged = Re(n.speechSynthesis, "onvoiceschanged"), n.speechSynthesisSpeaking = Re(n.speechSynthesis, "speaking"), n.speechSynthesisPaused = Re(n.speechSynthesis, "paused");
  const e = n.speechSynthesisUtterance ? Re(n.speechSynthesisUtterance, "prototype") : !1;
  return xa.forEach((t) => {
    const s = `on${t}`;
    n[s] = e && n.speechSynthesisUtterance ? Re(n.speechSynthesisUtterance.prototype, s) : !1;
  }), n;
};
class ft {
  listeners = /* @__PURE__ */ new Map();
  on(e, t) {
    return this.listeners.has(e) || this.listeners.set(e, []), this.listeners.get(e).push(t), () => {
      const s = this.listeners.get(e);
      if (s) {
        const i = s.indexOf(t);
        i > -1 && s.splice(i, 1);
      }
    };
  }
  emit(e, t) {
    const s = this.listeners.get(e);
    s && [...s].forEach((i) => {
      try {
        i(t);
      } catch (a) {
        console.error(`Error in "${String(e)}" listener:`, a);
      }
    });
  }
  clear() {
    this.listeners.clear();
  }
}
const Ke = (n, e) => Math.min(Math.max(n, 0), Math.max(e - 1, 0));
function ae(n, e, t, s) {
  return Number.isFinite(n) ? Math.max(e, Math.min(t, n)) : s;
}
const Ze = "\\p{Ps}\\p{Pi}¿¡", Ua = new RegExp(`^[${Ze}]`, "u"), Na = new RegExp(`[${Ze}]$`, "u"), za = new RegExp("^\\p{P}$", "u");
function Ma(n) {
  return Ua.test(n);
}
function ja(n) {
  return Na.test(n);
}
const Es = "\\p{scx=Han}\\p{scx=Hiragana}\\p{scx=Katakana}\\p{scx=Thai}\\p{scx=Lao}\\p{scx=Khmer}\\p{scx=Myanmar}\\u3000-\\u303F\\uFF00-\\uFFEF", Cs = new RegExp(`[${Es}]$`, "u"), Rs = new RegExp(`^[${Es}]`, "u");
function Is(n, e) {
  return Cs.test(n) && Rs.test(e);
}
function Ps(n, e) {
  return Cs.test(n) || Rs.test(e);
}
function Ba(n) {
  return za.test(n);
}
function As(n) {
  return n.replace(/[<>]/g, "​");
}
const Xe = "[A-Za-z_][\\w.:-]*", Da = new RegExp(`(${Xe})\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, "g"), Fa = new RegExp(`^<(${Xe})((?:\\s+${Xe}\\s*=\\s*(?:"[^"]*"|'[^']*'))*)\\s*(/?)>`), _a = new RegExp(`^</(${Xe})\\s*>`), $a = { lt: "<", gt: ">", amp: "&", quot: '"', apos: "'", nbsp: " " }, xs = /&(?:#x([0-9a-fA-F]+)|#([0-9]+)|(lt|gt|amp|quot|apos|nbsp));/g;
function Os(n, e, t, s) {
  if (s) return $a[s];
  const i = e ? parseInt(e, 16) : parseInt(t, 10);
  return i <= 1114111 ? String.fromCodePoint(i) : n;
}
function Yt(n) {
  return n.replace(xs, Os);
}
function Ga(n, e) {
  const t = new RegExp(xs.source, "y");
  t.lastIndex = e;
  const s = t.exec(n);
  return s ? { length: s[0].length, decoded: Os(s[0], s[1], s[2], s[3]) } : void 0;
}
function qa(n) {
  const e = /* @__PURE__ */ new Map();
  for (const t of n.matchAll(Da)) e.set(t[1], Yt(t[2] ?? t[3]));
  return e;
}
function* Ls(n) {
  let e = 0;
  for (; e < n.length; ) {
    const t = n.indexOf("<", e), s = t === -1 ? n.length : t;
    if (s > e && (yield { kind: "text", text: Yt(n.slice(e, s)), start: e, end: s }), t === -1) return;
    const i = n.slice(t);
    if (i.startsWith("<!--")) {
      const a = n.indexOf("-->", t + 4);
      if (a === -1) throw new Error("unclosed comment");
      e = a + 3;
    } else if (i.startsWith("<![CDATA[")) {
      const a = n.indexOf("]]>", t + 9);
      if (a === -1) throw new Error("unclosed CDATA");
      a > t + 9 && (yield { kind: "text", text: n.slice(t + 9, a), start: t + 9, end: a, cdata: !0 }), e = a + 3;
    } else if (i.startsWith("<?")) {
      const a = n.indexOf("?>", t + 2);
      if (a === -1) throw new Error("unclosed processing instruction");
      e = a + 2;
    } else if (i.startsWith("<!")) {
      const a = n.indexOf(">", t);
      if (a === -1) throw new Error("unclosed declaration");
      e = a + 1;
    } else if (i.startsWith("</")) {
      const a = _a.exec(i);
      if (!a) throw new Error("malformed closing tag");
      e = t + a[0].length, yield { kind: "close", name: a[1], markup: a[0], start: t, end: e };
    } else {
      const a = Fa.exec(i);
      if (!a) throw new Error("malformed tag");
      e = t + a[0].length, yield { kind: "open", name: a[1], attrs: a[2], selfClosing: a[3] === "/", markup: a[0], start: t, end: e };
    }
  }
}
function Ha(n, e) {
  const t = [];
  for (let s = e.start; s < e.end; ) {
    const i = !e.cdata && n[s] === "&" ? Ga(n, s) : void 0;
    for (let a = 0; a < (i?.decoded.length ?? 1); a++) t.push(s);
    s += i?.length ?? 1;
  }
  return t;
}
function Ka(n) {
  const e = [], t = [], s = () => t.length ? t[t.length - 1].children : e, i = (a, r) => {
    const o = s(), l = o[o.length - 1];
    l?.kind === "text" ? (l.text += a, l.positions.push(...r)) : o.push({ kind: "text", text: a, positions: r });
  };
  for (const a of Ls(n))
    if (a.kind === "text")
      i(a.text, Ha(n, a));
    else if (a.kind === "close") {
      const r = t.pop();
      if (r?.name !== a.name) throw new Error("mismatched closing tag");
      r.closeStart = a.start, r.end = a.end;
    } else {
      const r = {
        kind: "element",
        name: a.name,
        attrs: qa(a.attrs),
        children: [],
        selfClosing: a.selfClosing,
        openTag: a.markup,
        start: a.start,
        closeStart: a.end,
        end: a.end
      };
      s().push(r), r.selfClosing || t.push(r);
    }
  if (t.length) throw new Error("unclosed element");
  return e;
}
function Wa(n) {
  try {
    let e = "";
    for (const t of Ls(n)) t.kind !== "text" && (e += t.markup);
    return e;
  } catch {
    return;
  }
}
function B(n) {
  try {
    return Ka(n);
  } catch {
    return n ? [{ kind: "text", text: n, positions: Array.from({ length: n.length }, (e, t) => t) }] : [];
  }
}
function pt(n) {
  return n.selfClosing ? "" : `</${n.name}>`;
}
function en(n) {
  return n.map((e) => e.openTag).join("");
}
function Ye(n) {
  return n.map(pt).reverse().join("");
}
function Se(n) {
  let e = "";
  for (const t of n)
    t.kind === "text" ? e += le(t.text) : e += t.openTag + (t.selfClosing ? "" : Se(t.children) + pt(t));
  return e;
}
function mt(n, e) {
  let t = 0;
  for (; t < n.length && t < e.length && n[t] === e[t]; ) t++;
  return n.slice(0, t);
}
class tn {
  out = "";
  open = [];
  moveTo(e) {
    const t = mt(this.open, e).length;
    for (; this.open.length > t; ) this.out += pt(this.open.pop());
    for (const s of e.slice(t))
      this.out += s.openTag, this.open.push(s);
  }
  text(e, t) {
    t && (this.moveTo(e), this.out += le(t));
  }
  node(e, t) {
    this.moveTo(e), this.out += Se([t]);
  }
  // The SSML written so far, with every open element closed; the writer starts over empty.
  flush() {
    this.moveTo([]);
    const e = this.out;
    return this.out = "", e;
  }
}
const Qa = /* @__PURE__ */ new Set(["speak", "audio"]);
function Vs(n) {
  return Qa.has(n.name);
}
const Ja = /* @__PURE__ */ new Set(["lang", "p", "s", "voice", "token", "w"]);
function te(n) {
  return Ja.has(n.name) ? n.attrs.get("xml:lang") : void 0;
}
function* he(n) {
  for (const e of n)
    e.kind === "element" && (yield e, yield* he(e.children));
}
function Ts(n, e, t) {
  t === void 0 ? n.attrs.delete(e) : n.attrs.set(e, t);
  const s = [...n.attrs].map(([i, a]) => ` ${i}="${Me(a)}"`).join("");
  n.openTag = `<${n.name}${s}${n.selfClosing ? "/" : ""}>`;
}
function nn(n, e) {
  const t = [], s = (r, o) => {
    for (const l of r) {
      if (l.kind !== "element") continue;
      if (e(l)) {
        const u = [...l.attrs].filter(([h]) => h.startsWith("xmlns:") || h === "xml:base");
        s(l.children, new Map([...o, ...u]));
        continue;
      }
      const c = [...o].filter(([u]) => !l.attrs.has(u));
      if (c.length) {
        const u = l.start + l.openTag.search(/\s*\/?>$/);
        t.push({ at: u, text: c.map(([h, d]) => ` ${h}="${Me(d)}"`).join("") });
      }
      s(l.children, /* @__PURE__ */ new Map());
    }
  };
  s(B(n), /* @__PURE__ */ new Map());
  let i = "", a = 0;
  for (const r of t)
    i += n.slice(a, r.at) + r.text, a = r.at;
  return i + n.slice(a);
}
function Us(n, e) {
  return n.flatMap((t) => {
    if (t.kind === "text") return [t];
    const s = Us(t.children, e);
    return e(t) ? s : [{ ...t, children: s }];
  });
}
function be(n, e, t = []) {
  const s = [];
  for (const i of n)
    i.kind === "element" && i.children.length > 0 && !e?.(i) ? s.push(...be(i.children, e, [...t, i])) : s.push({ node: i, ancestors: t });
  return s;
}
function Ns(n, e) {
  return n.length > 0 && e.length > 0 && !/\s$/.test(n) && !/^\s/.test(e) && !ut(e) && !Is(n, e);
}
const Za = /* @__PURE__ */ new Set(["speak", "p", "s", "voice", "audio", "desc", "token", "w"]);
function Tn(n) {
  return /^<[^>]*\/>/.test(n) || Za.has(/^<\/?([^\s/>]+)/.exec(n)?.[1] ?? "");
}
function de(n) {
  let e = "", t = !1, s = [];
  const i = [];
  for (const { node: a, ancestors: r } of be(B(n))) {
    const o = mt(s, r).length;
    if ([...s.slice(o), ...r.slice(o)].some((l) => Tn(l.openTag)) && (t = !0), s = r, a.kind === "element") {
      i.push({ kind: "element", node: a, chain: r }), Tn(a.openTag) && (t = !0);
      continue;
    }
    t && Ns(e, a.text) && (i.push({ kind: "separator", start: e.length, position: a.positions[0], chain: r.slice(0, o) }), e += " "), i.push({ kind: "text", text: a.text, start: e.length, positions: a.positions, chain: r }), e += a.text, t = !1;
  }
  return { plain: e, pieces: i };
}
function zs(n) {
  let e = "";
  const t = [];
  for (const s of n)
    if (s.kind === "text") {
      e += s.text;
      for (const i of s.positions) t.push(i);
    }
  return (s, i) => e.slice(et(t, s), et(t, i));
}
function Ms(n) {
  return de(n).plain;
}
function js(n) {
  let e = "";
  const t = [], s = (r, o) => {
    r === " " && e.endsWith(" ") || (e += r, t.push(o));
  };
  for (const r of de(n).pieces)
    if (r.kind === "separator") s(" ", r.position);
    else if (r.kind === "text") for (let o = 0; o < r.text.length; o++) s(r.text[o], r.positions[o]);
  let i = 0;
  for (; i < e.length && /\s/.test(e[i]); ) i++;
  let a = e.length;
  for (; a > i && /\s/.test(e[a - 1]); ) a--;
  return { plain: e.slice(i, a), map: t.slice(i, a) };
}
function $(n) {
  return js(n).plain;
}
function et(n, e) {
  let t = 0, s = n.length;
  for (; t < s; ) {
    const i = t + s >> 1;
    n[i] < e ? t = i + 1 : s = i;
  }
  return t;
}
const Xa = 250;
class Un {
  speechSynthesis;
  speechSynthesisUtterance;
  currentVoice = null;
  // The voice of the utterance being spoken, reported in its "start" event.
  speakingVoice = null;
  currentUtterances = [];
  currentUtteranceIndex = 0;
  playbackState = "idle";
  events = new ft();
  voiceManager = null;
  defaultVoice = null;
  // Shared by concurrent initialize() calls, e.g. an app's with languages and its navigator's without
  initializing = null;
  // Languages of utterances' own voices loaded into the manager, even if it still lacks the voice
  loadedOwnVoiceLanguages = /* @__PURE__ */ new Set();
  speakGeneration = 0;
  // Enhanced properties for cross-browser compatibility
  resumeInfinityTimer;
  isSpeakingInternal = !1;
  restartPending = !1;
  isPausedInternal = !1;
  lacksNativePause;
  // Android and Firefox on Linux (speech-dispatcher) ignore pause()
  restartOnResume = !1;
  pausedAtUtteranceIndex = null;
  // Tracks which utterance was playing when paused
  initialized = !1;
  maxLengthExceeded = "warn";
  utterancesBeingCancelled = !1;
  // Flag to track if utterances are being cancelled
  lastCancelAt = -1 / 0;
  // Safari: when cancel() last stopped speech
  lacksNativePauseEvents = !1;
  // Google and Chrome OS voices never fire onpause/onresume
  // Playback parameters
  rate = 1;
  pitch = 1;
  volume = 1;
  features;
  patches;
  constructor() {
    if (this.features = Ta(), this.patches = bs(), this.lacksNativePause = this.patches.isAndroid || this.patches.isFirefox && this.patches.isLinux, !this.features.speechSynthesis || !this.features.speechSynthesisUtterance)
      throw new Error("Web Speech API is not available in this environment");
    this.speechSynthesis = this.features.speechSynthesis, this.speechSynthesisUtterance = this.features.speechSynthesisUtterance;
  }
  // From Easy Speech,
  // Check infinity pattern for long texts (except on problematic platforms)
  // Skip resume infinity for Microsoft Natural voices as they have different behavior 
  // Only for voices without pause events (Chrome's Google voices, which cut off long texts): others would report each pause/resume
  shouldUseResumeInfinity() {
    const e = this.speakingVoice ?? this.currentVoice, t = !!(e?.name && typeof e.name == "string" && e.name.toLocaleLowerCase().includes("(natural)"));
    return this.patches.isAndroid !== !0 && !this.patches.isFirefox && !this.patches.isSafari && !t && this.lacksNativePauseEvents;
  }
  // Creates a new SpeechSynthesisUtterance using detected constructor
  createUtterance(e) {
    return new this.speechSynthesisUtterance(e);
  }
  async initialize(e = {}) {
    return this.initialized ? !1 : (this.initializing ??= this.load(e).finally(() => {
      this.initializing = null;
    }), this.initializing);
  }
  async load(e) {
    const { languages: t, maxTimeout: s, interval: i, maxLengthExceeded: a = "warn" } = e;
    this.maxLengthExceeded = a;
    try {
      return this.voiceManager = await P.initialize({
        languages: t,
        maxTimeout: s,
        interval: i
      }), this.defaultVoice = await ks(t, this.voices), this.initialized = !0, !0;
    } catch (r) {
      return console.error("Failed to initialize WebSpeechEngine:", r), this.initialized = !1, !1;
    }
  }
  // Text length validation matching EasySpeech
  validateText(e) {
    if (new TextEncoder().encode(e).length > 4096) {
      const s = "Text exceeds max length of 4096 bytes, which may not work with some voices.";
      switch (this.maxLengthExceeded) {
        case "none":
          break;
        case "error":
          throw new Error(`WebSpeechEngine: ${s}`);
        default:
          console.warn(`WebSpeechEngine: ${s}`);
      }
    }
  }
  // By `voiceURI`, as voices of one `name` can differ in quality or language.
  findVoice(e) {
    const t = this.voices;
    return t.find((s) => s.voiceURI === e) ?? t.find((s) => s.name === e);
  }
  ownVoice(e) {
    return e.voice ? this.findVoice(e.voice) : void 0;
  }
  // The language of a voice the browser has, whether or not the manager has loaded it.
  browserVoiceLanguage(e) {
    const t = this.speechSynthesis.getVoices();
    return (t.find((s) => s.voiceURI === e) ?? t.find((s) => s.name === e))?.lang;
  }
  // The language of the utterance's voice when the browser has it but the manager hasn't loaded that language.
  unloadedOwnVoiceLanguage(e) {
    if (!e.voice || this.ownVoice(e)) return;
    const t = this.browserVoiceLanguage(e.voice);
    return t && !this.loadedOwnVoiceLanguages.has(t) ? t : void 0;
  }
  // The utterance's own voice, loading its language first when needed, else the current voice.
  async voiceForUtterance(e) {
    const t = this.unloadedOwnVoiceLanguage(e);
    return t && (await P.initialize({ languages: [t] }), this.loadedOwnVoiceLanguages.add(t)), this.ownVoice(e) ?? this.getCurrentVoice();
  }
  // The default voice until one is set
  getCurrentVoice() {
    return this.currentVoice ?? this.defaultVoice;
  }
  // Web Speech API has no SSML support: use the authored plain text, falling
  // back to a tag-stripped rendering of the SSML only when no plain
  // alternative was provided by the source.
  toPlainText(e) {
    return e.map((t) => ({
      ...t,
      plain: t.plain ?? (t.ssml ? $(t.ssml) : "")
    }));
  }
  // Queue Management
  loadUtterances(e, t) {
    this.currentUtterances = this.toPlainText(e), this.currentUtteranceIndex = Ke(t ?? 0, e.length), this.playbackState = "ready", this.emitEvent({ type: "ready" });
  }
  // Voice Configuration
  async setVoice(e) {
    const t = this.currentVoice;
    if (typeof e == "string") {
      const s = this.findVoice(e);
      s ? this.currentVoice = s : console.warn(`Voice "${e}" not found`);
    } else
      this.currentVoice = e;
    (this.currentVoice && F(this.currentVoice)) !== (t && F(t)) && this.scheduleRestartIfSpeaking();
  }
  // Read from the manager each time, as initializing it with other languages adds theirs
  get voices() {
    return this.voiceManager?.getVoices() ?? [];
  }
  async getAvailableVoices(e, t) {
    try {
      this.voiceManager || await this.initialize();
      const s = [...e ?? [], ...(t ?? []).flatMap((i) => this.browserVoiceLanguage(i) ?? [])];
      return s.length && await P.initialize({ languages: s }), this.voices;
    } catch {
      return [];
    }
  }
  // Playback Control
  speak(e) {
    if (e !== void 0) {
      if (e < 0 || e >= this.currentUtterances.length)
        throw new Error("Invalid utterance index");
      this.currentUtteranceIndex = e;
    }
    if (this.restartPending = !1, this.currentUtterances.length === 0) {
      console.warn("No utterances loaded");
      return;
    }
    this.patches.isSafari && this.speakGeneration++, this.cancelCurrentSpeech();
    const t = ++this.speakGeneration;
    this.isSpeakingInternal = !0, this.isPausedInternal = !1, this.setState("playing"), this.stopResumeInfinity(), this.currentUtteranceIndex >= this.currentUtterances.length && (this.currentUtteranceIndex = 0);
    const s = this.lastCancelAt + Xa - Date.now();
    if (this.patches.isSafari && s > 0) {
      this.speakNextTask(t, 1, s);
      return;
    }
    this.speakCurrentUtterance(t);
  }
  cancelCurrentSpeech() {
    this.patches.isFirefox && this.speechSynthesis.speaking && (this.utterancesBeingCancelled = !0, setTimeout(() => {
      this.utterancesBeingCancelled = !1;
    }, 100)), this.patches.isSafari && this.speechSynthesis.speaking && (this.lastCancelAt = Date.now()), this.speechSynthesis.cancel();
  }
  // Safari: `unstartedRetries` is how many more times to speak it if Safari ends it without starting it, as it can right after cancel()
  speakNextTask(e, t, s = 0) {
    setTimeout(() => {
      if (e === this.speakGeneration) {
        if (this.playbackState === "paused") {
          this.pausedAtUtteranceIndex = null;
          return;
        }
        this.playbackState === "playing" && this.speakCurrentUtterance(e, t);
      }
    }, s);
  }
  async speakCurrentUtterance(e, t) {
    if (this.currentUtteranceIndex >= this.currentUtterances.length) {
      this.setState("idle"), this.emitEvent({ type: "end" });
      return;
    }
    const s = this.currentUtterances[this.currentUtteranceIndex], i = s.plain ?? "";
    this.validateText(i);
    const a = this.createUtterance(As(i)), r = await this.voiceForUtterance(s);
    if (e !== this.speakGeneration)
      return;
    if (this.lacksNativePauseEvents = !1, this.speakingVoice = r, r && this.voiceManager) {
      const l = this.voiceManager.convertToSpeechSynthesisVoice(r);
      l && (a.voice = l, a.lang = l.lang, this.lacksNativePauseEvents = l.name.startsWith("Google") || l.name.startsWith("Chrome OS"));
    }
    s.language && (a.lang = s.language), a.rate = this.rate, a.pitch = this.pitch, a.volume = this.volume;
    let o = !1;
    a.onstart = () => {
      if (o = !0, e !== this.speakGeneration) return;
      this.restartOnResume = !1, this.isSpeakingInternal = !0, this.isPausedInternal = !1, this.setState("playing"), this.emitEvent({ type: "start", detail: { voice: r } }), this.shouldUseResumeInfinity() && this.startResumeInfinity(a);
    }, a.onend = () => {
      if (this.utterancesBeingCancelled) {
        this.utterancesBeingCancelled = !1;
        return;
      }
      if (e === this.speakGeneration && this.playbackState !== "idle") {
        if (t !== void 0 && !o) {
          if (this.playbackState === "paused") {
            this.pausedAtUtteranceIndex = null;
            return;
          }
          if (this.playbackState === "playing" && t > 0) {
            this.speakNextTask(e, t - 1);
            return;
          }
        }
        this.isSpeakingInternal = !1, this.isPausedInternal = !1, this.stopResumeInfinity(), this.currentUtteranceIndex >= this.currentUtterances.length - 1 && this.setState("idle"), this.emitEvent({ type: "end" });
      }
    }, a.onerror = (l) => {
      if (e !== this.speakGeneration) return;
      this.isSpeakingInternal = !1, this.isPausedInternal = !1, this.stopResumeInfinity(), this.setState("idle"), ["synthesis-unavailable", "audio-hardware", "voice-unavailable"].includes(l.error) && (console.log("[ENGINE] fatal error detected, resetting index to 0"), this.currentUtteranceIndex = 0), l.error === "interrupted" || l.error === "canceled" ? this.emitEvent({ type: "stop" }) : this.emitEvent({
        type: "error",
        detail: {
          error: l.error,
          // Preserve original error type
          message: `Speech synthesis error: ${l.error}`,
          recoverable: l.error === "network"
        }
      });
    }, a.onpause = () => {
      e === this.speakGeneration && (this.isPausedInternal = !0, this.isSpeakingInternal = !1, this.emitEvent({ type: "pause" }));
    }, a.onresume = () => {
      e === this.speakGeneration && (this.isPausedInternal = !1, this.isSpeakingInternal = !0, this.emitEvent({ type: "resume" }));
    }, a.onboundary = (l) => {
      e === this.speakGeneration && this.emitEvent({
        type: "boundary",
        detail: {
          charIndex: l.charIndex,
          charLength: l.charLength,
          elapsedTime: l.elapsedTime,
          name: l.name
        }
      });
    }, a.onmark = (l) => {
      e === this.speakGeneration && this.emitEvent({
        type: "mark",
        detail: {
          name: l.name
        }
      });
    }, this.speechSynthesis.speak(a);
  }
  startResumeInfinity(e) {
    this.shouldUseResumeInfinity() && (this.resumeInfinityTimer = window.setTimeout(() => {
      if (e) {
        const { paused: s, speaking: i } = this.speechSynthesis, a = i || this.isSpeakingInternal, r = s || this.isPausedInternal;
        a && !r && (this.speechSynthesis.pause(), this.speechSynthesis.resume());
      }
      this.startResumeInfinity(e);
    }, 5e3));
  }
  stopResumeInfinity() {
    this.resumeInfinityTimer && (clearTimeout(this.resumeInfinityTimer), this.resumeInfinityTimer = void 0);
  }
  pause() {
    this.playbackState === "playing" && (this.pausedAtUtteranceIndex = this.currentUtteranceIndex, this.isPausedInternal = !0, this.isSpeakingInternal = !1, this.setState("paused"), this.lacksNativePause ? (this.restartOnResume = !0, this.speakGeneration++, this.speechSynthesis.cancel(), this.emitEvent({ type: "pause" })) : (this.speechSynthesis.pause(), this.lacksNativePauseEvents && this.emitEvent({ type: "pause" })));
  }
  resume() {
    this.playbackState === "paused" && this.currentUtteranceIndex < this.currentUtterances.length && (this.isPausedInternal = !1, this.isSpeakingInternal = !0, this.setState("playing"), this.restartOnResume || this.pausedAtUtteranceIndex !== this.currentUtteranceIndex ? (this.emitEvent({ type: "resume" }), this.speak(this.currentUtteranceIndex)) : (this.speechSynthesis.resume(), this.lacksNativePauseEvents && this.emitEvent({ type: "resume" })), this.pausedAtUtteranceIndex = null);
  }
  stop() {
    this.cancelCurrentSpeech(), this.speakGeneration++, this.currentUtteranceIndex = 0, this.restartOnResume && (this.restartOnResume = !1), this.setState("idle"), this.emitEvent({ type: "stop" });
  }
  // Playback Parameters
  setRate(e) {
    const t = ae(e, 0.1, 10, this.rate);
    t !== this.rate && (this.rate = t, this.scheduleRestartIfSpeaking());
  }
  getRate() {
    return this.rate;
  }
  setPitch(e) {
    const t = ae(e, 0, 2, this.pitch);
    t !== this.pitch && (this.pitch = t, this.scheduleRestartIfSpeaking());
  }
  getPitch() {
    return this.pitch;
  }
  setVolume(e) {
    const t = ae(e, 0, 1, this.volume);
    t !== this.volume && (this.volume = t, this.scheduleRestartIfSpeaking());
  }
  getVolume() {
    return this.volume;
  }
  // Voice, language, rate, pitch and volume are baked into the SpeechSynthesisUtterance at speak()-time:
  // restart it so a change applies now (or on resume when paused). Same-tick changes coalesce.
  scheduleRestartIfSpeaking() {
    if (this.playbackState === "paused") {
      this.pausedAtUtteranceIndex = null;
      return;
    }
    !this.isSpeakingInternal || this.restartPending || (this.restartPending = !0, queueMicrotask(() => {
      this.restartPending && (this.restartPending = !1, this.playbackState === "paused" ? this.pausedAtUtteranceIndex = null : this.isSpeakingInternal && this.speak(this.currentUtteranceIndex));
    }));
  }
  // State
  getState() {
    return this.playbackState;
  }
  getCurrentUtteranceIndex() {
    return this.currentUtteranceIndex;
  }
  setCurrentUtteranceIndex(e, t) {
    if (e < 0 || e >= this.currentUtterances.length) {
      t?.(!1);
      return;
    }
    if (e === this.currentUtteranceIndex) {
      t?.(!0);
      return;
    }
    !this.isPausedInternal && this.isSpeakingInternal && this.cancelCurrentSpeech(), this.currentUtteranceIndex = e, t?.(!0);
  }
  getUtteranceCount() {
    return this.currentUtterances.length;
  }
  // Events
  on(e, t) {
    return this.events.on(e, t);
  }
  emitEvent(e) {
    this.events.emit(e.type, e);
  }
  setState(e) {
    const t = this.playbackState;
    if (this.playbackState = e, t !== e)
      switch (e) {
        case "idle":
          this.emitEvent({ type: "idle" });
          break;
        case "loading":
          this.emitEvent({ type: "loading" });
          break;
        case "ready":
          this.emitEvent({ type: "ready" });
          break;
      }
  }
  // Cleanup with comprehensive error handling
  async destroy() {
    this.stop(), this.stopResumeInfinity(), this.events.clear(), this.currentUtterances = [], this.currentVoice = null, this.speakingVoice = null, this.voiceManager = null, this.defaultVoice = null, this.initialized = !1;
  }
}
function jt(n) {
  return n.offlineAvailability === !0 || typeof navigator < "u" && navigator.onLine === !0;
}
class Ll {
  id = "webspeech";
  name = "Web Speech API";
  voiceEngine = null;
  // No cache to bypass here — local API, no network cost to re-checking.
  async getVoices() {
    return this.voiceEngine || (this.voiceEngine = new Un(), await this.voiceEngine.initialize()), this.voiceEngine.getAvailableVoices();
  }
  // Offline voices keep it available without a connection.
  async isAvailable() {
    return (await this.getVoices()).some(jt);
  }
  async createEngine(e) {
    const t = new Un();
    return await t.initialize(), e && await t.setVoice(e), t;
  }
  async destroy() {
    this.voiceEngine && (await this.voiceEngine.destroy(), this.voiceEngine = null);
  }
}
function Bs(n, e) {
  return {
    source: "server",
    label: n.name,
    name: n.name,
    originalName: n.originalName,
    language: n.language,
    otherLanguages: n.otherLanguages,
    gender: n.gender ?? void 0,
    quality: n.quality,
    provider: n.provider,
    identifier: n.identifier,
    controls: e
  };
}
class Le extends Error {
  status;
  type;
  title;
  instance;
  constructor(e, t) {
    super(e), this.name = "SpeechServerError", this.status = t.status, this.type = t.type, this.title = t.title, this.instance = t.instance;
  }
}
class Ds extends Le {
  constructor(e) {
    super(e, { status: 408, type: "https://readium.org/speech-server/error#stall", title: "Synthesis Stalled" }), this.name = "SpeechServerStallError";
  }
}
class Fs extends Error {
  constructor(e) {
    super(e), this.name = "SpeechServerAudioDecodeError";
  }
}
class _s extends Error {
  constructor(e) {
    super(e), this.name = "SpeechServerNetworkError";
  }
}
async function xe(n) {
  if ((n.headers.get("content-type") ?? "").includes("application/problem+json"))
    try {
      const t = await n.json();
      return new Le(t.detail || t.title || `Request failed with status ${n.status}`, {
        status: t.status ?? n.status,
        type: t.type,
        title: t.title,
        instance: t.instance
      });
    } catch {
    }
  return new Le(`Request failed with status ${n.status}`, { status: n.status });
}
function $s(n, e) {
  const t = [];
  let s = -1, i = -1;
  const a = () => {
    s !== -1 && (t.push({ text: Ya(n, s, i), offset: n[s].offset }), s = -1, i = -1);
  };
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    if (o.text.length > e) {
      a(), t.push({ text: o.text, offset: o.offset });
      continue;
    }
    const l = o.offset + o.text.length, c = s === -1 ? o.text.length : l - n[s].offset;
    s !== -1 && c > e && a(), s === -1 && (s = r), i = r;
  }
  return a(), t;
}
function Ya(n, e, t) {
  const s = n[e], i = n[t];
  return s === i ? s.text : n.slice(e, t + 1).map((a) => a.text).join("");
}
const Bt = new RegExp(
  `[^${Ae}]*[${Ae}]+\\s*|[^${Ae}]+$`,
  "gu"
), er = /\S+\s*|\s+/g;
function tt(n, e, t) {
  const s = [];
  for (const i of n.matchAll(t))
    i[0].length !== 0 && s.push({ text: i[0], offset: e + i.index, atomic: !1 });
  return s;
}
function sn(n, e) {
  if (n.text.length <= e || n.atomic)
    return [n];
  const t = tt(n.text, n.offset, er);
  if (t.length > 1)
    return t.flatMap((r) => sn(r, e));
  const s = [];
  let i = n.offset, a = "";
  for (const r of n.text)
    a.length > 0 && a.length + r.length > e && (s.push({ text: a, offset: i, atomic: !1 }), i += a.length, a = ""), a += r;
  return a.length > 0 && s.push({ text: a, offset: i, atomic: !1 }), s;
}
function tr(n, e) {
  if (n.length <= e)
    return [{ text: n, offset: 0 }];
  const s = tt(n, 0, Bt).flatMap((i) => sn(i, e));
  return $s(s, e);
}
function nr(n, e) {
  if (n.length <= e)
    return [{ text: n, offset: 0 }];
  const t = [];
  let s = 0;
  for (const a of B(n))
    a.kind === "element" && (t.push(...tt(n.slice(s, a.start), s, Bt)), t.push({ text: n.slice(a.start, a.end), offset: a.start, atomic: !0 }), s = a.end);
  t.push(...tt(n.slice(s), s, Bt));
  const i = t.flatMap((a) => sn(a, e));
  return $s(i, e);
}
const sr = {
  wav: "audio/wav",
  mp3: "audio/mpeg",
  opus: "audio/ogg",
  ogg: "audio/ogg",
  aac: "audio/aac",
  flac: "audio/flac",
  webm: "audio/webm",
  m4a: "audio/mp4"
};
function ir(n) {
  return sr[n] ?? `audio/${n}`;
}
const ar = ["flac", "wav", "opus", "aac", "ogg", "webm", "mp3"], rr = ["opus", "aac", "webm", "ogg", "mp3", "wav", "flac"];
function or(n, e, t) {
  const s = (o) => t(ir(o)) !== "", i = n.formats.filter(s);
  if (e.preferredFormat && i.includes(e.preferredFormat))
    return e.preferredFormat;
  const a = e.strategy === "bandwidth" ? rr : ar, r = [...a, ...i.filter((o) => !a.includes(o))];
  for (const o of r)
    if (i.includes(o))
      return o;
  return n.default;
}
const lr = /* @__PURE__ */ new Set(["wav", "flac"]), cr = {
  mp3: 48e3,
  opus: 24e3,
  aac: 48e3,
  ogg: 48e3,
  webm: 32e3
};
function ur(n, e, t) {
  return lr.has(n) || !e || !t ? void 0 : t.saveData === !0 || /2g/.test(t.effectiveType ?? "") ? cr[n] : void 0;
}
const hr = 3, dr = 400;
function gr(n) {
  const e = atob(n), t = new Uint8Array(e.length);
  for (let s = 0; s < e.length; s++)
    t[s] = e.charCodeAt(s);
  return t.buffer;
}
function fr(n) {
  return ae(n, 0.25, 4, 1);
}
function $e(n) {
  return n?.plain ?? n?.ssml ?? void 0;
}
function Nn(n) {
  return n instanceof Ds ? { message: n.message, status: n.status, type: n.type, title: n.title, instance: n.instance, recoverable: !0 } : n instanceof Le ? { message: n.message, status: n.status, type: n.type, title: n.title, instance: n.instance, recoverable: !1 } : n instanceof Fs ? { message: n.message, recoverable: !1 } : n instanceof _s ? { message: n.message, recoverable: !0 } : n instanceof Error ? { message: n.message, recoverable: !1 } : { message: String(n), recoverable: !1 };
}
class pr {
  endpoints;
  fetchImpl;
  currentVoice = null;
  defaultVoice = null;
  voices = [];
  voicesRequest = null;
  initializing = null;
  serviceInfo = null;
  serviceInfoPromise = null;
  currentUtterances = [];
  currentUtteranceIndex = 0;
  playbackState = "idle";
  events = new ft();
  speakGeneration = 0;
  loadGeneration = 0;
  // Rolling buffer of upcoming utterances' audio, fetched one at a time via prefetchChainTail.
  prefetchWindow;
  readyBufferChars;
  overLengthText;
  timeoutMs;
  formatOptions;
  canPlayType;
  prefetchCache = /* @__PURE__ */ new Map();
  prefetchChainTail = Promise.resolve();
  // Every AbortController for a *prefetch* chunk request still in flight, so clearPrefetchCache
  // can abort them immediately instead of waiting on their wrapping promises to settle first.
  activeControllers = /* @__PURE__ */ new Set();
  // Every AbortController for the current *live* utterance's own chunk request(s) — kept separate
  // from activeControllers so invalidating stale prefetches never cancels live playback in flight.
  liveControllers = /* @__PURE__ */ new Set();
  isSpeakingInternal = !1;
  restartPending = !1;
  restartOnResume = !1;
  audioContext = null;
  masterGain = null;
  scheduledChunks = [];
  boundaryRafHandle = null;
  rate = 1;
  pitch = 1;
  volume = 1;
  constructor(e) {
    this.endpoints = e.endpoints, this.fetchImpl = e.fetch ?? fetch.bind(globalThis), this.prefetchWindow = e.prefetchWindow ?? hr, this.readyBufferChars = e.readyBufferChars ?? dr, this.overLengthText = e.overLengthText ?? "split", this.timeoutMs = e.timeoutMs, this.formatOptions = e.format ?? {}, this.canPlayType = typeof Audio < "u" ? (t) => new Audio().canPlayType(t) : () => "";
  }
  // Lets a provider that already fetched /voices seed this engine without a second request.
  setAvailableVoices(e) {
    this.voices = e, this.voicesRequest = null;
  }
  // Fetches the voices, and picks the default one by navigator.languages, as WebSpeechEngine does without languages
  async initialize() {
    this.initializing = (async () => {
      const e = await this.getAvailableVoices();
      return this.defaultVoice = await ks(void 0, e), !0;
    })();
    try {
      return await this.initializing;
    } finally {
      this.initializing = null;
    }
  }
  // Tags a fetch() TypeError (request never reached the network) as SpeechServerNetworkError,
  // so it can't be confused with a TypeError thrown later while reading the response.
  async fetchNetwork(e, t) {
    try {
      return await this.fetchImpl(e, t);
    } catch (s) {
      throw s instanceof TypeError ? new _s(s.message) : s;
    }
  }
  loadUtterances(e, t) {
    this.abortLiveControllers(), this.clearPrefetchCache(), this.currentUtterances = e, this.currentUtteranceIndex = Ke(t ?? 0, e.length), this.setState("loading"), this.bufferUntilReady(++this.loadGeneration);
  }
  // Buffers enough utterances ahead of currentUtteranceIndex to cover readyBufferChars before
  // declaring "ready", so playback doesn't catch up to an empty prefetch cache right away —
  // starting from wherever playback will actually resume, not always utterance 0.
  async bufferUntilReady(e) {
    const t = Ke(this.currentUtteranceIndex, this.currentUtterances.length), s = Math.min(this.indexCoveringChars(this.readyBufferChars, t), t + this.prefetchWindow), i = [];
    for (let a = t; a <= s; a++) {
      this.queuePrefetch(a);
      const r = this.prefetchCache.get(a);
      r && i.push(r.then((o) => o[0].promise));
    }
    try {
      await Promise.all(i);
    } catch {
    }
    e !== this.loadGeneration || this.playbackState !== "loading" || this.setState("ready");
  }
  indexCoveringChars(e, t) {
    if (this.currentUtterances.length === 0)
      return -1;
    const s = Ke(t, this.currentUtterances.length);
    let i = 0;
    for (let a = s; a < this.currentUtterances.length; a++)
      if (i += ($e(this.currentUtterances[a]) ?? "").length, i >= e)
        return a;
    return this.currentUtterances.length - 1;
  }
  // The utterance's own voice when this server has it, else the current voice.
  async voiceFor(e) {
    return this.voices.length === 0 && await (this.initializing ?? this.getAvailableVoices()).catch(() => {
    }), (e?.voice ? this.voices.find((s) => s.identifier === e.voice || s.name === e.voice) : void 0) ?? this.currentVoice ?? this.defaultVoice;
  }
  setVoice(e) {
    const t = this.currentVoice?.identifier ?? this.currentVoice?.name;
    if (typeof e == "string") {
      const s = this.voices.find((i) => i.identifier === e || i.name === e);
      s ? this.currentVoice = s : (this.currentVoice = {
        source: "server",
        label: e,
        name: e,
        originalName: e,
        language: "",
        identifier: e
      }, this.getAvailableVoices().then((i) => {
        if (this.currentVoice?.identifier !== e)
          return;
        const a = i.find((r) => r.identifier === e || r.name === e);
        a && (this.currentVoice = a, (a.identifier !== e || a.controls?.speed === !0) && (this.clearPrefetchCache(), this.scheduleRestartIfSpeaking()));
      }).catch(() => {
      }));
    } else
      this.currentVoice = e;
    (this.currentVoice?.identifier ?? this.currentVoice?.name) !== t && (this.clearPrefetchCache(), this.scheduleRestartIfSpeaking());
  }
  // The default voice until one is set
  getCurrentVoice() {
    return this.currentVoice ?? this.defaultVoice;
  }
  async getAvailableVoices() {
    return this.voices.length > 0 ? this.voices : (this.voicesRequest ??= this.fetchVoices().catch((e) => {
      throw this.voicesRequest = null, e;
    }), this.voicesRequest);
  }
  async fetchVoices() {
    const [e, t] = await Promise.all([this.fetchNetwork(this.endpoints.voices), this.getServiceInfo()]);
    if (!e.ok)
      throw await xe(e);
    const s = await e.json(), i = new Map(t.providers.map((a) => [a.id, a.controls]));
    return this.voices = s.map((a) => Bs(a, i.get(a.provider))), this.voices;
  }
  // Cached after the first successful fetch; a failed fetch isn't cached, so the next
  // synthesize() call retries rather than being stuck on a transient network error.
  async getServiceInfo() {
    return this.serviceInfo ? this.serviceInfo : (this.serviceInfoPromise || (this.serviceInfoPromise = this.fetchServiceInfo().catch((e) => {
      throw this.serviceInfoPromise = null, e;
    })), this.serviceInfo = await this.serviceInfoPromise, this.serviceInfo);
  }
  async fetchServiceInfo() {
    const e = await this.fetchNetwork(this.endpoints.service);
    if (!e.ok)
      throw await xe(e);
    return e.json();
  }
  speak(e) {
    if (e !== void 0) {
      if (e < 0 || e >= this.currentUtterances.length)
        throw new Error("Invalid utterance index");
      this.currentUtteranceIndex = e;
    }
    if (this.restartPending = !1, this.restartOnResume = !1, this.currentUtterances.length === 0) {
      console.warn("No utterances loaded");
      return;
    }
    this.stopAudio(), this.abortLiveControllers();
    const t = ++this.speakGeneration;
    this.isSpeakingInternal = !0, this.setState("loading"), this.synthesizeAndPlay(t);
  }
  async synthesizeAndPlay(e) {
    const t = this.currentUtteranceIndex;
    try {
      const s = await this.resolveSynthesisStream(t);
      if (e !== this.speakGeneration)
        return;
      const i = await this.voiceFor(this.currentUtterances[t]);
      if (e !== this.speakGeneration)
        return;
      await this.scheduleChunksStreaming(s, e, i), this.fillPrefetchWindow(t);
    } catch (s) {
      if (e !== this.speakGeneration)
        return;
      this.isSpeakingInternal = !1, this.setState("idle"), this.emitEvent({
        type: "error",
        detail: Nn(s)
      });
    }
  }
  // Reuses a cached prefetch if one exists; a fresh fetch bypasses the prefetch chain
  // (shouldn't wait behind buffered-ahead requests), and a failed prefetch retries fresh.
  async resolveSynthesisStream(e) {
    const t = this.prefetchCache.get(e);
    if (t) {
      this.prefetchCache.delete(e);
      try {
        const s = await t;
        for (const { controller: i } of s)
          this.activeControllers.delete(i), this.liveControllers.add(i);
        return s;
      } catch {
      }
    }
    return this.synthesizeStream(e, !1);
  }
  // Chains up to `prefetchWindow` upcoming indices onto prefetchChainTail, one at a time.
  fillPrefetchWindow(e) {
    const t = Math.min(e + this.prefetchWindow, this.currentUtterances.length - 1);
    for (let s = e + 1; s <= t; s++)
      this.queuePrefetch(s);
  }
  queuePrefetch(e) {
    if (this.prefetchCache.has(e))
      return;
    const t = this.prefetchChainTail.then(() => this.synthesizeStream(e, !0));
    this.prefetchCache.set(e, t), this.prefetchChainTail = t.then((s) => Promise.all(s.map((i) => i.promise))).then(
      () => {
      },
      () => {
      }
    ), t.catch(() => {
    }), t.then((s) => s.forEach((i) => i.promise.catch(() => {
    }))).catch(() => {
    });
  }
  clearPrefetchCache() {
    this.prefetchCache.clear(), this.activeControllers.forEach((e) => e.abort()), this.activeControllers.clear();
  }
  abortLiveControllers() {
    this.liveControllers.forEach((e) => e.abort()), this.liveControllers.clear();
  }
  async synthesizeStream(e, t) {
    const s = this.currentUtterances[e], i = !s.plain && !!s.ssml, a = s.language, r = $e(s) ?? "", o = i ? js(r).map : void 0, l = $e(this.currentUtterances[e - 1]), c = $e(this.currentUtterances[e + 1]), u = await this.getServiceInfo(), h = or(u.output, this.formatOptions, this.canPlayType), d = navigator.connection, g = ur(h, this.formatOptions.adaptBitrateToNetwork ?? !1, d);
    if (r.length <= u.limits.maxTextLength) {
      const b = new AbortController();
      return (t ? this.activeControllers : this.liveControllers).add(b), [{
        promise: this.synthesizeChunk({ content: s, text: r, textOffset: 0, useSSML: i, ssmlMap: o, language: a, prevText: l, nextText: c, format: h, bitrate: g, controller: b }),
        controller: b
      }];
    }
    if (this.overLengthText === "error")
      throw new Le(
        `Text exceeds this server's maximum length of ${u.limits.maxTextLength} characters`,
        {
          status: 413,
          type: "https://readium.org/speech-server/error#payload_too_large",
          title: "Payload Too Large"
        }
      );
    const m = Math.min(u.limits.maxTextLength, this.readyBufferChars), S = i ? nr(r, m) : tr(r, m), f = [];
    let k = Promise.resolve();
    for (let b = 0; b < S.length; b++) {
      const A = b === 0 ? l : S[b - 1].text, y = b === S.length - 1 ? c : S[b + 1].text, v = S[b], E = new AbortController();
      (t ? this.activeControllers : this.liveControllers).add(E);
      const w = k.then(
        () => this.synthesizeChunk({ content: s, text: v.text, textOffset: v.offset, useSSML: i, ssmlMap: o, language: a, prevText: A, nextText: y, format: h, bitrate: g, controller: E })
      );
      f.push({ promise: w, controller: E }), k = w;
    }
    return f;
  }
  async synthesizeChunk(e) {
    const { content: t, text: s, textOffset: i, useSSML: a, ssmlMap: r, language: o, prevText: l, nextText: c, format: u, bitrate: h, controller: d } = e;
    try {
      const g = await this.voiceFor(t), m = await this.fetchNetwork(this.endpoints.synthesize, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: t.id,
          text: a ? s : As(s),
          ssml: a,
          language: o,
          voice: g?.identifier ?? g?.name,
          prev_utterance: l,
          next_utterance: c,
          boundary: !0,
          output: { format: u, bitrate: h, speed: this.rate, pitch: this.pitch }
        }),
        signal: d.signal
      });
      if (!m.ok)
        throw await xe(m);
      const S = await m.json(), f = gr(S.audio);
      let k;
      try {
        k = await this.ensureAudioContext().decodeAudioData(f);
      } catch {
        throw new Fs("Audio playback failed");
      }
      return { audioBuffer: k, format: S.format, boundaries: S.boundaries, textOffset: i, ssmlMap: r };
    } finally {
      this.activeControllers.delete(d), this.liveControllers.delete(d);
    }
  }
  // May run ahead of a user gesture (called from synthesizeChunk during prefetch), but only
  // constructs the context here — actual playback still only ever starts from speak().
  ensureAudioContext() {
    return this.audioContext || (this.audioContext = new AudioContext(), this.masterGain = this.audioContext.createGain(), this.masterGain.gain.value = this.volume, this.masterGain.connect(this.audioContext.destination)), this.audioContext.state === "suspended" && this.audioContext.resume().catch(() => {
    }), this.audioContext;
  }
  // Races a chunk against bufferedAheadMs + timeoutMs rather than a flat per-request timeout,
  // since a slow chunk is harmless as long as buffered audio still covers it.
  awaitWithStallDeadline(e, t, s) {
    if (this.timeoutMs === void 0)
      return e;
    const i = s + this.timeoutMs;
    return new Promise((a, r) => {
      const o = setTimeout(() => {
        t.abort(), r(new Ds(`No audio chunk arrived within ${i.toFixed(0)}ms of the playback buffer running dry`));
      }, i);
      e.then(
        (l) => {
          clearTimeout(o), a(l);
        },
        (l) => {
          clearTimeout(o), r(l);
        }
      );
    });
  }
  // Schedules chunks onto one continuous AudioContext timeline as they resolve.
  async scheduleChunksStreaming(e, t, s) {
    const i = await this.awaitWithStallDeadline(e[0].promise, e[0].controller, 0);
    if (t !== this.speakGeneration)
      return;
    const a = this.ensureAudioContext(), r = this.masterGain, l = s?.controls?.speed === !0 ? 1 : fr(this.rate);
    this.scheduledChunks = [], this.setState("playing"), this.emitEvent({ type: "start", detail: { voice: s } });
    let c = a.currentTime, u = null;
    const h = (d) => {
      const g = a.createBufferSource();
      g.buffer = d.audioBuffer, g.playbackRate.value = l, g.connect(r), g.start(c), u && (u.onended = null), g.onended = () => this.handleUtteranceEnded(t), u = g, this.scheduledChunks.push({ chunk: d, startTime: c, node: g, nextBoundaryIndex: 0, rate: l }), c += d.audioBuffer.duration / l;
    };
    h(i), this.startBoundaryPolling(t);
    for (let d = 1; d < e.length; d++) {
      let g;
      try {
        const m = Math.max(0, (c - a.currentTime) * 1e3);
        g = await this.awaitWithStallDeadline(e[d].promise, e[d].controller, m);
      } catch (m) {
        t === this.speakGeneration && this.emitEvent({ type: "error", detail: Nn(m) });
        return;
      }
      if (t !== this.speakGeneration)
        return;
      h(g);
    }
  }
  handleUtteranceEnded(e) {
    e === this.speakGeneration && (this.checkBoundaries(), this.stopBoundaryPolling(), this.isSpeakingInternal = !1, this.currentUtteranceIndex >= this.currentUtterances.length - 1 && this.setState("idle"), this.emitEvent({ type: "end" }));
  }
  startBoundaryPolling(e) {
    const t = () => {
      e === this.speakGeneration && (this.checkBoundaries(), this.boundaryRafHandle = requestAnimationFrame(t));
    };
    this.boundaryRafHandle = requestAnimationFrame(t);
  }
  stopBoundaryPolling() {
    this.boundaryRafHandle !== null && (cancelAnimationFrame(this.boundaryRafHandle), this.boundaryRafHandle = null);
  }
  checkBoundaries() {
    if (!this.audioContext)
      return;
    const e = this.audioContext.currentTime;
    for (const t of this.scheduledChunks) {
      const s = t.chunk.boundaries ?? [];
      for (; t.nextBoundaryIndex < s.length && e >= t.startTime + s[t.nextBoundaryIndex].elapsedTime / t.rate; ) {
        const i = s[t.nextBoundaryIndex], a = i.charIndex + t.chunk.textOffset;
        let r = a, o = i.charLength;
        if (t.chunk.ssmlMap) {
          const l = t.chunk.ssmlMap;
          r = et(l, a), o = Math.max(0, et(l, a + i.charLength) - r);
        }
        this.emitEvent({
          type: "boundary",
          detail: {
            name: i.name,
            charIndex: r,
            charLength: o,
            elapsedTime: i.elapsedTime
          }
        }), t.nextBoundaryIndex++;
      }
    }
  }
  stopAudio() {
    this.stopBoundaryPolling();
    for (const e of this.scheduledChunks) {
      e.node.onended = null;
      try {
        e.node.stop();
      } catch {
      }
      e.node.disconnect();
    }
    this.scheduledChunks = [];
  }
  pause() {
    this.playbackState === "playing" && this.audioContext && (this.audioContext.suspend().catch(() => {
    }), this.stopBoundaryPolling(), this.isSpeakingInternal = !1, this.setState("paused"), this.emitEvent({ type: "pause" }));
  }
  resume() {
    if (this.playbackState === "paused" && this.audioContext) {
      if (this.restartOnResume) {
        this.emitEvent({ type: "resume" }), this.speak(this.currentUtteranceIndex);
        return;
      }
      this.audioContext.resume().catch(() => {
      }), this.startBoundaryPolling(this.speakGeneration), this.isSpeakingInternal = !0, this.setState("playing"), this.emitEvent({ type: "resume" });
    }
  }
  stop() {
    this.speakGeneration++, this.loadGeneration++, this.stopAudio(), this.abortLiveControllers(), this.clearPrefetchCache(), this.isSpeakingInternal = !1, this.restartOnResume = !1, this.currentUtteranceIndex = 0, this.setState("idle"), this.emitEvent({ type: "stop" });
  }
  setRate(e) {
    const t = ae(e, 0.1, 10, this.rate);
    t !== this.rate && (this.rate = t, this.clearPrefetchCache(), this.scheduleRestartIfSpeaking());
  }
  getRate() {
    return this.rate;
  }
  setPitch(e) {
    const t = ae(e, 0, 2, this.pitch);
    t !== this.pitch && (this.pitch = t, this.clearPrefetchCache(), this.scheduleRestartIfSpeaking());
  }
  getPitch() {
    return this.pitch;
  }
  setVolume(e) {
    const t = ae(e, 0, 1, this.volume);
    t !== this.volume && (this.volume = t, this.masterGain && (this.masterGain.gain.value = this.volume));
  }
  getVolume() {
    return this.volume;
  }
  // Voice, language, rate and pitch are baked into each chunk's synthesis request at fetch-time:
  // restart the utterance so a change applies now (or on resume when paused). Same-tick changes coalesce.
  scheduleRestartIfSpeaking() {
    if (this.playbackState === "paused") {
      this.restartOnResume = !0;
      return;
    }
    !this.isSpeakingInternal || this.restartPending || (this.restartPending = !0, queueMicrotask(() => {
      this.restartPending && (this.restartPending = !1, this.playbackState === "paused" ? this.restartOnResume = !0 : this.isSpeakingInternal && this.speak(this.currentUtteranceIndex));
    }));
  }
  getState() {
    return this.playbackState;
  }
  getCurrentUtteranceIndex() {
    return this.currentUtteranceIndex;
  }
  setCurrentUtteranceIndex(e, t) {
    if (e < 0 || e >= this.currentUtterances.length) {
      t?.(!1);
      return;
    }
    if (e === this.currentUtteranceIndex) {
      t?.(!0);
      return;
    }
    this.stopAudio(), this.currentUtteranceIndex = e, t?.(!0);
  }
  getUtteranceCount() {
    return this.currentUtterances.length;
  }
  on(e, t) {
    return this.events.on(e, t);
  }
  emitEvent(e) {
    this.events.emit(e.type, e);
  }
  setState(e) {
    const t = this.playbackState;
    if (this.playbackState = e, t !== e)
      switch (e) {
        case "idle":
          this.emitEvent({ type: "idle" });
          break;
        case "loading":
          this.emitEvent({ type: "loading" });
          break;
        case "ready":
          this.emitEvent({ type: "ready" });
          break;
      }
  }
  async destroy() {
    this.stop(), await this.audioContext?.close(), this.audioContext = null, this.masterGain = null, this.events.clear(), this.currentUtterances = [], this.currentVoice = null, this.defaultVoice = null, this.voices = [], this.voicesRequest = null;
  }
}
class Vl {
  id = "speech-server";
  name = "Readium Speech Server";
  options;
  fetchImpl;
  voices = [];
  constructor(e) {
    this.options = e, this.fetchImpl = e.fetch ?? fetch.bind(globalThis);
  }
  async getVoices(e) {
    if (this.voices.length > 0 && !e)
      return this.voices;
    const [t, s] = await Promise.all([
      this.fetchImpl(this.options.endpoints.voices),
      this.fetchImpl(this.options.endpoints.service)
    ]);
    if (!t.ok)
      throw await xe(t);
    if (!s.ok)
      throw await xe(s);
    const i = await t.json(), a = await s.json(), r = new Map(a.providers.map((o) => [o.id, o.controls]));
    return this.voices = i.map((o) => Bs(o, r.get(o.provider))), this.voices;
  }
  async isAvailable() {
    try {
      return await this.getVoices(!0), !0;
    } catch {
      return !1;
    }
  }
  async createEngine(e) {
    const t = new pr(this.options);
    return this.voices.length > 0 && t.setAvailableVoices(this.voices), e && t.setVoice(e), t;
  }
  async destroy() {
    this.voices = [];
  }
}
function mr(n) {
  return n.detail?.recoverable === !0;
}
const vr = 3e4, yr = [
  "start",
  "pause",
  "resume",
  "end",
  "stop",
  "skip",
  "boundary",
  "mark",
  "idle",
  "loading",
  "ready",
  "voiceschanged"
];
class Sr {
  activeEngine;
  primaryProvider;
  fallbackProvider;
  onFailure;
  healthCheckIntervalMs;
  // Once true, "error" events are always forwarded as-is — either because we already swapped
  // (nothing left to fall back to), or because falling back itself failed once already.
  // Reset to false after recovering to the primary, so a later failure can fall back again.
  hasFallenBack = !1;
  healthCheckTimer = null;
  // Set once a health-check probe confirms the primary is reachable again; the actual swap still
  // waits for the active engine to stop playing, see maybeRecoverNow().
  primaryReachable = !1;
  // State the ReadiumSpeechPlaybackEngine interface doesn't expose getters for, kept here so it
  // can be replayed into a freshly created fallback (or recovered primary) engine.
  currentUtterances = [];
  lastVoiceRequest;
  // Live, not a snapshot — a swap in progress reads these at "ready" time, not when it started.
  desiredIndex = 0;
  desiredPlaying = !1;
  // False the instant a new engine becomes active, true once it's actually been told to speak().
  // While false, playback state/index live here instead of on the (unspoken) active engine.
  engineStarted = !0;
  // True during swapToFallback()/recoverToPrimary(), until activeEngine is reassigned — while
  // true, activeEngine is untrustworthy and control methods must only update desired state.
  swapInFlight = !1;
  // Bumped only by destroy(), to abort an in-flight swap and destroy the arriving engine instead
  // of adopting it. stop()/loadUtterances()/speak() let an in-flight swap land instead.
  teardownEpoch = 0;
  // Bumped by every loadUtterances() call, so startEngineWhenReady() can tell its queue is stale.
  loadToken = 0;
  // Every voice each engine has listed, by id, kept across listings as each lists only what it was asked for.
  listedVoices = /* @__PURE__ */ new WeakMap();
  events = new ft();
  unbindActiveEngine = null;
  constructor(e) {
    this.activeEngine = e.primaryEngine, this.primaryProvider = e.primaryProvider, this.fallbackProvider = e.fallbackProvider, this.onFailure = e.onFailure ?? "fallback", this.healthCheckIntervalMs = e.healthCheckIntervalMs ?? vr, this.lastVoiceRequest = e.primaryEngine.getCurrentVoice() ?? void 0, this.bindActiveEngine();
  }
  async initialize() {
    return this.activeEngine.initialize?.();
  }
  // Mid-swap, only records the new queue live — activeEngine is dying/about to be replaced.
  loadUtterances(e, t) {
    this.loadToken++, this.currentUtterances = e, this.desiredIndex = t ?? 0, this.desiredPlaying = !1, !this.swapInFlight && (this.engineStarted = !0, this.activeEngine.loadUtterances(this.withReachableVoices(e, this.activeEngine), t));
  }
  setVoice(e) {
    this.lastVoiceRequest = e, this.activeEngine.setVoice(e);
  }
  getCurrentVoice() {
    return this.activeEngine.getCurrentVoice();
  }
  // Reachable voices only, on either engine, so content isn't given a voice that fails for lack of network.
  async getAvailableVoices(e, t) {
    const s = this.activeEngine, i = await s.getAvailableVoices(e, t);
    return this.recordListedVoices(s, i), this.reachableVoices(i);
  }
  // The navigator advances to the next utterance via speak(nextIndex) — the one gap where we can
  // recover without an audible glitch, so intercept it if the primary is already reachable.
  speak(e) {
    if (this.desiredIndex = e ?? this.desiredIndex, this.desiredPlaying = !0, !this.swapInFlight) {
      if (this.hasFallenBack && this.primaryReachable && this.activeEngine.getState() !== "playing") {
        this.recoverToPrimary();
        return;
      }
      this.engineStarted = !0, this.activeEngine.speak(this.desiredIndex);
    }
  }
  pause() {
    this.desiredPlaying = !1, this.isEngineTrusted() && this.activeEngine.pause();
  }
  resume() {
    if (this.desiredPlaying = !0, !this.swapInFlight) {
      if (!this.engineStarted) {
        this.engineStarted = !0, this.activeEngine.speak(this.desiredIndex);
        return;
      }
      this.activeEngine.resume();
    }
  }
  // Lets an in-flight swap land rather than aborting it — aborting would strand the wrapper on
  // the already-failed primary in the swapToFallback direction.
  stop() {
    this.desiredPlaying = !1, this.desiredIndex = 0, !this.swapInFlight && (this.engineStarted = !0, this.activeEngine.stop());
  }
  setRate(e) {
    this.activeEngine.setRate(e);
  }
  getRate() {
    return this.activeEngine.getRate();
  }
  setPitch(e) {
    this.activeEngine.setPitch(e);
  }
  getPitch() {
    return this.activeEngine.getPitch();
  }
  setVolume(e) {
    this.activeEngine.setVolume(e);
  }
  getVolume() {
    return this.activeEngine.getVolume();
  }
  // True only when this.activeEngine is safe to read from directly: no swap in flight, and it's
  // actually been told to speak() (otherwise its own state/index don't reflect desired* yet).
  isEngineTrusted() {
    return !this.swapInFlight && this.engineStarted;
  }
  getState() {
    return this.isEngineTrusted() ? this.activeEngine.getState() : this.desiredPlaying ? "loading" : "paused";
  }
  getCurrentUtteranceIndex() {
    return this.isEngineTrusted() ? this.activeEngine.getCurrentUtteranceIndex() : this.desiredIndex;
  }
  // Keeps desiredIndex authoritative even while trusted, like speak() does — otherwise a seek
  // followed by a failure with no intervening speak() would resume at the stale pre-seek index.
  setCurrentUtteranceIndex(e, t) {
    if (this.desiredIndex = e, !this.isEngineTrusted()) {
      t?.(!0);
      return;
    }
    this.activeEngine.setCurrentUtteranceIndex(e, t);
  }
  getUtteranceCount() {
    return this.activeEngine.getUtteranceCount();
  }
  on(e, t) {
    return this.events.on(e, t);
  }
  emitEvent(e) {
    this.events.emit(e.type, e);
  }
  bindActiveEngine() {
    const e = this.activeEngine, t = yr.map((s) => e.on(s, (i) => {
      this.emitEvent(i), this.maybeRecoverNow();
    }));
    t.push(e.on("error", (s) => this.handleError(s))), this.unbindActiveEngine = () => t.forEach((s) => s());
  }
  handleError(e) {
    if (this.hasFallenBack || this.swapInFlight || this.onFailure === "error" || !mr(e)) {
      this.emitEvent(e);
      return;
    }
    this.swapToFallback(e);
  }
  // Copies playback parameters onto a freshly created engine — shared by both swap directions so
  // this can't drift between them the way two separately maintained copies did.
  copyPlaybackParameters(e, t) {
    t.setRate(e.getRate()), t.setPitch(e.getPitch()), t.setVolume(e.getVolume());
  }
  // Starts or defers a freshly loaded engine based on live intent, not a snapshot from before the
  // swap — shared by both swap directions so a racing pause()/speak() is respected either way.
  startEngineWhenReady(e) {
    const t = this.loadToken, s = e.on("ready", () => {
      s(), t === this.loadToken && (this.desiredPlaying ? (this.engineStarted = !0, e.speak(this.desiredIndex)) : this.engineStarted = !1);
    });
  }
  // Polls the primary provider until it's available again, then hands off to maybeRecoverNow()
  // to swap back at the next safe moment. Chained setTimeout rather than setInterval so a slow
  // probe can't overlap with the next one. A provider without isAvailable() is never recovered.
  startHealthCheck() {
    const e = this.primaryProvider.isAvailable?.bind(this.primaryProvider);
    this.healthCheckTimer !== null || !e || (this.healthCheckTimer = setTimeout(async () => {
      this.healthCheckTimer = null, await e().catch(() => !1) ? (this.primaryReachable = !0, this.maybeRecoverNow()) : this.startHealthCheck();
    }, this.healthCheckIntervalMs));
  }
  // Swaps back to the primary the moment nothing is audibly playing, so a caller never hears a
  // voice change mid-utterance.
  maybeRecoverNow() {
    !this.hasFallenBack || !this.primaryReachable || this.swapInFlight || this.activeEngine.getState() !== "playing" && this.recoverToPrimary();
  }
  async swapToFallback(e) {
    let t = null;
    await this.performSwap(
      async () => {
        const s = this.activeEngine, i = await this.utteranceVoice(s, this.currentUtterances[this.desiredIndex]) ?? s.getCurrentVoice() ?? (typeof this.lastVoiceRequest == "object" ? this.lastVoiceRequest : null), a = i?.language || this.currentUtterances[this.desiredIndex]?.language || (typeof navigator < "u" ? navigator.language : "en");
        if (t = await this.pickBestFallbackVoice(a, i?.gender, i?.controls?.boundary !== !1), !t) throw new Error("no offline-available fallback voice found");
        return this.fallbackProvider.createEngine(t);
      },
      () => (this.hasFallenBack = !0, this.onFailure === "fallbackAndRecover" && this.startHealthCheck(), { type: "enginefallback", detail: { reason: e.detail, voice: t } }),
      () => {
        this.hasFallenBack = !0, this.emitEvent(e);
      }
    );
  }
  // The utterance's own voice, when the engine has it.
  async utteranceVoice(e, t) {
    if (t?.voice)
      return await this.listUtteranceVoices(e, [t]), this.listedVoice(e, t.voice);
  }
  async recoverToPrimary() {
    await this.performSwap(
      () => this.primaryProvider.createEngine(this.lastVoiceRequest),
      (e) => (this.hasFallenBack = !1, this.primaryReachable = !1, { type: "enginerecovered", detail: { voice: e.getCurrentVoice() } }),
      () => {
        this.primaryReachable = !1, this.startHealthCheck();
      }
    );
  }
  // Shared by both swap directions so the epoch/teardown races and event-forwarding rebind
  // can't drift between them. createEngine builds the replacement (and may fail, invoking
  // onCreateFailed instead of swapping); onSwapped runs once the new engine is live and
  // returns the event to emit for that direction.
  async performSwap(e, t, s) {
    this.swapInFlight = !0;
    const i = this.teardownEpoch, a = this.activeEngine;
    let r;
    try {
      r = await e();
    } catch {
      this.swapInFlight = !1, s();
      return;
    }
    if (await this.listUtteranceVoices(r, this.currentUtterances), i !== this.teardownEpoch) {
      this.swapInFlight = !1, await r.destroy();
      return;
    }
    this.copyPlaybackParameters(a, r), this.unbindActiveEngine?.(), this.activeEngine = r, this.engineStarted = !1, this.swapInFlight = !1, this.bindActiveEngine(), this.emitEvent(t(r)), this.startEngineWhenReady(r), r.loadUtterances(this.withReachableVoices(this.currentUtterances, r), this.desiredIndex), await a.destroy();
  }
  reachableVoices(e) {
    return e.filter(jt);
  }
  recordListedVoices(e, t) {
    const s = this.listedVoices.get(e) ?? /* @__PURE__ */ new Map();
    t.forEach((i) => s.set(F(i), i)), this.listedVoices.set(e, s);
  }
  // Matched by id, else by name, as engines match an utterance's voice.
  listedVoice(e, t) {
    const s = this.listedVoices.get(e);
    return s?.get(t) ?? [...s?.values() ?? []].find((i) => i.name === t);
  }
  // Lists the utterances' own voices on the engine, so withReachableVoices() can tell which it can't reach.
  async listUtteranceVoices(e, t) {
    const s = [...new Set(t.flatMap((i) => i.voice ?? []))];
    s.length !== 0 && this.recordListedVoices(e, await e.getAvailableVoices(void 0, s).catch(() => []));
  }
  // Drops an utterance's own voice the engine lists as unreachable, so the engine speaks it with its own instead.
  withReachableVoices(e, t) {
    return e.map((s) => {
      const i = s.voice ? this.listedVoice(t, s.voice) : void 0;
      if (!i || jt(i)) return s;
      const { voice: a, ...r } = s;
      return r;
    });
  }
  // Language narrows first, gender second, boundary-support third: a same-language wrong-gender
  // voice beats a different-language right-gender one, and a same-gender voice that drops
  // boundary events beats one that also mismatches on boundary support. Falls back to any
  // language if none matches, then to any gender within that if none matches, then to any
  // boundary support within that if none matches. Region/quality ranking within the final
  // candidate set is delegated to pickBestVoiceByRegion, the same ranking logic
  // sortVoicesByRegions uses.
  async pickBestFallbackVoice(e, t, s) {
    const i = this.reachableVoices(await this.fallbackProvider.getVoices());
    if (i.length === 0) return null;
    const [a] = dt([e]), { voicesByLang: r } = gt(i, [a]), o = r.get(a.baseLang) ?? [], l = o.length > 0 ? o : i, c = t ? l.filter((d) => d.gender === t) : [], u = c.length > 0 ? c : l, h = Ss(u, s);
    return ys(e, h);
  }
  async destroy() {
    this.teardownEpoch++, this.healthCheckTimer !== null && (clearTimeout(this.healthCheckTimer), this.healthCheckTimer = null), this.unbindActiveEngine?.(), this.events.clear(), await this.activeEngine.destroy();
  }
}
class Tl {
  id = "fallback";
  name = "Fallback";
  primary;
  fallback;
  onFailure;
  healthCheckIntervalMs;
  constructor(e) {
    this.primary = e.primary, this.fallback = e.fallback, this.onFailure = e.onFailure ?? "fallback", this.healthCheckIntervalMs = e.healthCheckIntervalMs;
  }
  async getVoices(e) {
    try {
      return await this.primary.getVoices(e);
    } catch (t) {
      if (this.onFailure === "error")
        throw t;
      return this.fallback.getVoices(e);
    }
  }
  // Available when the provider createEngine() would end up using is.
  async isAvailable() {
    return await this.primary.isAvailable?.().catch(() => !1) ? !0 : this.onFailure !== "error" && await this.fallback.isAvailable?.() === !0;
  }
  async createEngine(e) {
    let t;
    try {
      t = await this.primary.createEngine(e);
    } catch (s) {
      if (this.onFailure === "error")
        throw s;
      return this.fallback.createEngine(e);
    }
    return new Sr({
      primaryEngine: t,
      primaryProvider: this.primary,
      fallbackProvider: this.fallback,
      onFailure: this.onFailure,
      healthCheckIntervalMs: this.healthCheckIntervalMs
    });
  }
  async destroy() {
    await Promise.all([this.primary.destroy(), this.fallback.destroy()]);
  }
}
function br(n) {
  return new aa({
    start: new xn(n.start),
    end: n.end ? new xn(n.end) : void 0
  });
}
function wr(n, e = window) {
  const { href: t, text: s, cssSelector: i, domRange: a, fragment: r } = n, o = s ? new Ji(s) : void 0, l = i || a ? /* @__PURE__ */ new Map() : void 0;
  l && (i && l.set("cssSelector", i), a && l.set("domRange", br(a).serialize()));
  const u = l !== void 0 || r !== void 0 ? new Zi({
    fragments: r ? [r] : void 0,
    otherLocations: l
  }) : void 0;
  return new Xi({
    href: t ?? e.location.href,
    type: "text/html",
    text: o,
    locations: u
  });
}
class kr extends Ki {
  constructor(e, t, s, i = {}) {
    super(e.host, i), this.channel = e, this.wnd = t, this.decorator = s;
  }
  channel;
  wnd;
  decorator;
  // Convenience wrapper: builds Locators from shorthand text/cssSelector options
  // and delegates to applyDecorations, which replaces the entire decoration
  // set for a group on every call — batch everything for a group into one
  // call rather than clobbering the previous one.
  decorate(e, t) {
    this.applyDecorations(
      e.map(({ id: s, style: i, ...a }) => ({
        id: s,
        style: i,
        locator: wr(a, this.wnd)
      })),
      t
    );
  }
  destroy() {
    super.destroy(), this.decorator.unmount(this.wnd, this.channel.frame), this.channel.frame.destroy();
  }
}
function Ul(n = window, e = {}) {
  const t = new Wi(), s = new Qi();
  return s.mount(n, t.frame), new kr(t, n, s, e);
}
class Nl {
  providers = /* @__PURE__ */ new Map();
  register(e) {
    if (this.providers.has(e.id))
      throw new Error(`A provider is already registered under id "${e.id}"`);
    this.providers.set(e.id, e);
  }
  unregister(e) {
    this.providers.delete(e);
  }
  get(e) {
    return this.providers.get(e);
  }
  list() {
    return [...this.providers.values()];
  }
  async getVoices(e) {
    return this.require(e).getVoices();
  }
  async getAllVoices() {
    return Promise.all(
      this.list().map(async (e) => ({
        providerId: e.id,
        voices: await e.getVoices()
      }))
    );
  }
  async createEngine(e, t) {
    return this.require(e).createEngine(t);
  }
  async destroy() {
    await Promise.all(this.list().map((e) => e.destroy())), this.providers.clear();
  }
  require(e) {
    const t = this.providers.get(e);
    if (!t)
      throw new Error(`No provider registered under id "${e}"`);
    return t;
  }
}
const vt = (n, e, t) => Object.freeze({ range: Object.freeze([n, e]), step: t }), nt = vt(0, 5e3, 100), st = vt(0.1, 10, 0.1), it = vt(0, 2, 0.1), at = vt(0, 1, 0.05), an = Object.freeze(["none", "few", "some", "most", "custom"]), rn = Object.freeze(["none", "block-level", "always"]), on = Object.freeze(["plain", "ssml"]), ln = Object.freeze(["none", "utterance", "block"]), cn = Object.freeze(["structure", "sentence"]), Gs = Object.freeze(["never", "inline", "after"]), zn = Object.freeze([
  "format",
  "interruptions",
  "verbosity",
  "skip",
  "contextualize",
  "language",
  "languageOverrides",
  "segmentation",
  "reconstruct"
]);
function un(n) {
  return n == null || typeof n == "boolean" ? n : void 0;
}
function _(n, e) {
  return n == null || e.includes(n) ? n : void 0;
}
function Q(n, e) {
  if (n == null) return n;
  if (typeof n != "number" || Number.isNaN(n)) return;
  const t = Math.min(...e), s = Math.max(...e);
  return n >= t && n <= s ? n : void 0;
}
function hn(n) {
  if (n == null) return n;
  if (!(typeof n != "object" || Array.isArray(n)))
    return Object.values(n).every((e) => typeof e == "string") ? { ...n } : void 0;
}
function qs(n, e) {
  if (n == null) return n;
  if (!(typeof n != "object" || Array.isArray(n)))
    return Object.values(n).every((t) => t !== void 0 && e.includes(t)) ? { ...n } : void 0;
}
function Hs(n) {
  return typeof n == "string" ? n : hn(n);
}
function Ve(n) {
  return n == null ? n : Array.isArray(n) && n.every((e) => typeof e == "string") ? [...n] : void 0;
}
class Mn {
  format;
  interruptions;
  verbosity;
  skip;
  contextualize;
  language;
  languageOverrides;
  segmentation;
  reconstruct;
  voice;
  pauseDuration;
  autoPause;
  rate;
  pitch;
  volume;
  constructor(e = {}) {
    this.format = _(e.format, on) ?? "plain", this.interruptions = qs(e.interruptions, Gs) ?? {}, this.verbosity = _(e.verbosity, an) ?? "few", this.skip = Ve(e.skip) ?? [], this.contextualize = Ve(e.contextualize) ?? [], this.language = _(e.language, rn) ?? "block-level", this.languageOverrides = hn(e.languageOverrides) ?? {}, this.segmentation = _(e.segmentation, cn) ?? "structure", this.reconstruct = un(e.reconstruct) ?? !1, this.voice = Hs(e.voice) ?? null, this.pauseDuration = Q(e.pauseDuration, nt.range) ?? 300, this.autoPause = _(e.autoPause, ln) ?? "none", this.rate = Q(e.rate, st.range) ?? 1, this.pitch = Q(e.pitch, it.range) ?? 1, this.volume = Q(e.volume, at.range) ?? 1;
  }
}
class ye {
  format;
  interruptions;
  verbosity;
  skip;
  contextualize;
  language;
  languageOverrides;
  segmentation;
  reconstruct;
  voice;
  pauseDuration;
  autoPause;
  rate;
  pitch;
  volume;
  constructor(e = {}) {
    this.format = _(e.format, on), this.interruptions = qs(e.interruptions, Gs), this.verbosity = _(e.verbosity, an), this.skip = Ve(e.skip), this.contextualize = Ve(e.contextualize), this.language = _(e.language, rn), this.languageOverrides = hn(e.languageOverrides), this.segmentation = _(e.segmentation, cn), this.reconstruct = un(e.reconstruct), this.voice = Hs(e.voice), this.pauseDuration = Q(e.pauseDuration, nt.range), this.autoPause = _(e.autoPause, ln), this.rate = Q(e.rate, st.range), this.pitch = Q(e.pitch, it.range), this.volume = Q(e.volume, at.range);
  }
  merging(e) {
    const t = { ...this };
    for (const s of Object.keys(e))
      e[s] !== void 0 && (t[s] = e[s]);
    return new ye(t);
  }
}
class re {
  _value;
  _effectiveValue;
  _isEffective;
  _onChange;
  constructor({
    initialValue: e = null,
    effectiveValue: t,
    isEffective: s,
    onChange: i
  }) {
    this._value = e, this._effectiveValue = t, this._isEffective = s, this._onChange = i;
  }
  set value(e) {
    this._value = e, this._onChange(this._value);
  }
  get value() {
    return this._value;
  }
  get effectiveValue() {
    return this._effectiveValue;
  }
  get isEffective() {
    return this._isEffective;
  }
  clear() {
    this._value = null, this._onChange(this._value);
  }
}
class Ie extends re {
  _supportedValues;
  constructor({
    initialValue: e = null,
    effectiveValue: t,
    isEffective: s,
    onChange: i,
    supportedValues: a
  }) {
    super({ initialValue: e, effectiveValue: t, isEffective: s, onChange: i }), this._supportedValues = a;
  }
  set value(e) {
    if (e != null && _(e, this._supportedValues) === void 0)
      throw new Error(`Value '${String(e)}' is not in the supported values for this preference.`);
    this._value = e, this._onChange(this._value);
  }
  get value() {
    return this._value;
  }
  get supportedValues() {
    return this._supportedValues;
  }
}
class Er extends re {
  set value(e) {
    if (e != null && un(e) === void 0)
      throw new Error(`Value '${String(e)}' is not a boolean.`);
    this._value = e, this._onChange(this._value);
  }
  get value() {
    return this._value;
  }
}
class jn extends re {
  set value(e) {
    if (e != null && Ve(e) === void 0)
      throw new Error(`Value '${String(e)}' is not an array of strings.`);
    this._value = e, this._onChange(this._value);
  }
  get value() {
    return this._value;
  }
}
class Ge extends re {
  _supportedRange;
  _step;
  _decimals;
  constructor({
    initialValue: e = null,
    effectiveValue: t,
    isEffective: s,
    onChange: i,
    supportedRange: a,
    step: r
  }) {
    super({ initialValue: e, effectiveValue: t, isEffective: s, onChange: i }), this._supportedRange = a, this._step = r, this._decimals = this._step.toString().includes(".") ? this._step.toString().split(".")[1].length : 0;
  }
  set value(e) {
    if (e != null && Q(e, this._supportedRange) === void 0)
      throw new Error(`Value '${String(e)}' is out of the supported range for this preference.`);
    this._value = e, this._onChange(this._value);
  }
  get value() {
    return this._value;
  }
  get supportedRange() {
    return this._supportedRange;
  }
  get step() {
    return this._step;
  }
  increment() {
    this._value != null && this._value < this._supportedRange[1] && (this._value = Math.min(
      Math.round((this._value + this._step) * 10 ** this._decimals) / 10 ** this._decimals,
      this._supportedRange[1]
    ), this._onChange(this._value));
  }
  decrement() {
    this._value != null && this._value > this._supportedRange[0] && (this._value = Math.max(
      Math.round((this._value - this._step) * 10 ** this._decimals) / 10 ** this._decimals,
      this._supportedRange[0]
    ), this._onChange(this._value));
  }
  format(e) {
    return e.toString();
  }
}
class Bn {
  preferences;
  settings;
  // Cloned rather than aliased: edits made through this editor's setters
  // are staged on this copy and only reach the navigator's own preferences
  // once explicitly passed to submitPreferences() — discarding the editor
  // without submitting must leave the navigator untouched.
  constructor(e, t) {
    this.preferences = new ye({ ...e }), this.settings = t;
  }
  // Explicit `null`s, not `undefined` — merging() skips `undefined` fields,
  // so only `null` actually clears them once submitted.
  clear() {
    this.preferences = new ye({
      format: null,
      interruptions: null,
      verbosity: null,
      skip: null,
      contextualize: null,
      language: null,
      languageOverrides: null,
      segmentation: null,
      reconstruct: null,
      voice: null,
      pauseDuration: null,
      autoPause: null,
      rate: null,
      pitch: null,
      volume: null
    });
  }
  updatePreference(e, t) {
    this.preferences[e] = t;
  }
  get format() {
    return new Ie({
      initialValue: this.preferences.format,
      effectiveValue: this.settings.format,
      isEffective: this.preferences.format != null,
      onChange: (e) => this.updatePreference("format", e ?? null),
      supportedValues: on
    });
  }
  get interruptions() {
    return new re({
      initialValue: this.preferences.interruptions,
      effectiveValue: this.settings.interruptions,
      isEffective: this.preferences.interruptions != null,
      onChange: (e) => this.updatePreference("interruptions", e ?? null)
    });
  }
  get verbosity() {
    return new Ie({
      initialValue: this.preferences.verbosity,
      effectiveValue: this.settings.verbosity,
      isEffective: this.preferences.verbosity != null,
      onChange: (e) => this.updatePreference("verbosity", e ?? null),
      supportedValues: an
    });
  }
  get skip() {
    return new jn({
      initialValue: this.preferences.skip,
      effectiveValue: this.settings.skip,
      isEffective: this.settings.verbosity === "custom" && this.preferences.skip != null,
      onChange: (e) => this.updatePreference("skip", e ?? null)
    });
  }
  get contextualize() {
    return new jn({
      initialValue: this.preferences.contextualize,
      effectiveValue: this.settings.contextualize,
      isEffective: this.settings.verbosity === "custom" && this.preferences.contextualize != null,
      onChange: (e) => this.updatePreference("contextualize", e ?? null)
    });
  }
  get language() {
    return new Ie({
      initialValue: this.preferences.language,
      effectiveValue: this.settings.language,
      isEffective: this.preferences.language != null,
      onChange: (e) => this.updatePreference("language", e ?? null),
      supportedValues: rn
    });
  }
  get languageOverrides() {
    return new re({
      initialValue: this.preferences.languageOverrides,
      effectiveValue: this.settings.languageOverrides,
      isEffective: this.preferences.languageOverrides != null,
      onChange: (e) => this.updatePreference("languageOverrides", e ?? null)
    });
  }
  get segmentation() {
    return new Ie({
      initialValue: this.preferences.segmentation,
      effectiveValue: this.settings.segmentation,
      isEffective: this.preferences.segmentation != null,
      onChange: (e) => this.updatePreference("segmentation", e ?? null),
      supportedValues: cn
    });
  }
  get reconstruct() {
    return new Er({
      initialValue: this.preferences.reconstruct,
      effectiveValue: this.settings.reconstruct,
      isEffective: this.settings.segmentation === "sentence" && this.preferences.reconstruct != null,
      onChange: (e) => this.updatePreference("reconstruct", e ?? null)
    });
  }
  get voice() {
    return new re({
      initialValue: this.preferences.voice,
      effectiveValue: this.settings.voice,
      isEffective: this.preferences.voice != null,
      onChange: (e) => this.updatePreference("voice", e ?? null)
    });
  }
  get pauseDuration() {
    return new Ge({
      initialValue: this.preferences.pauseDuration,
      effectiveValue: this.settings.pauseDuration,
      isEffective: this.preferences.pauseDuration != null,
      onChange: (e) => this.updatePreference("pauseDuration", e ?? null),
      supportedRange: nt.range,
      step: nt.step
    });
  }
  get autoPause() {
    return new Ie({
      initialValue: this.preferences.autoPause,
      effectiveValue: this.settings.autoPause,
      isEffective: this.preferences.autoPause != null,
      onChange: (e) => this.updatePreference("autoPause", e ?? null),
      supportedValues: ln
    });
  }
  get rate() {
    return new Ge({
      initialValue: this.preferences.rate,
      effectiveValue: this.settings.rate,
      isEffective: this.preferences.rate != null,
      onChange: (e) => this.updatePreference("rate", e ?? null),
      supportedRange: st.range,
      step: st.step
    });
  }
  get pitch() {
    return new Ge({
      initialValue: this.preferences.pitch,
      effectiveValue: this.settings.pitch,
      isEffective: this.preferences.pitch != null,
      onChange: (e) => this.updatePreference("pitch", e ?? null),
      supportedRange: it.range,
      step: it.step
    });
  }
  get volume() {
    return new Ge({
      initialValue: this.preferences.volume,
      effectiveValue: this.settings.volume,
      isEffective: this.preferences.volume != null,
      onChange: (e) => this.updatePreference("volume", e ?? null),
      supportedRange: at.range,
      step: at.step
    });
  }
}
const Ks = ["audio", "caption", "figure", "image", "math", "table", "video"], Ws = [
  ...Ks,
  "blockquote",
  "chapter",
  "cover",
  "details",
  "notice",
  "part",
  "preformatted",
  "qna",
  "row",
  "rowheader",
  "subtitle",
  "tip"
], Cr = [
  ...Ws,
  "abstract",
  "acknowledgments",
  "afterword",
  "appendix",
  "aside",
  "backlink",
  "bibliography",
  "biblioref",
  "colophon",
  "complementary",
  "conclusion",
  "credit",
  "credits",
  "dedication",
  "definition",
  "endnotes",
  "epigraph",
  "epilogue",
  "errata",
  "example",
  "footnote",
  "foreword",
  "glossary",
  "glossref",
  "heading1",
  "heading2",
  "heading3",
  "heading4",
  "heading5",
  "heading6",
  "index",
  "introduction",
  "list",
  "listItem",
  "noteref",
  "pagebreak",
  "pagelist",
  "preface",
  "prologue",
  "pullquote",
  "separator",
  "summary",
  "term"
], Rr = {
  none: /* @__PURE__ */ new Set([
    "aside",
    "audio",
    "bibliography",
    "cell",
    "columnheader",
    "details",
    "endnotes",
    "figure",
    "glossary",
    "image",
    "landmarks",
    "loa",
    "loi",
    "lot",
    "lov",
    "pullquote",
    "row",
    "rowheader",
    "table",
    "toc",
    "video"
  ]),
  few: /* @__PURE__ */ new Set([
    "aside",
    "bibliography",
    "cell",
    "columnheader",
    "details",
    "endnotes",
    "glossary",
    "landmarks",
    "loa",
    "loi",
    "lot",
    "lov",
    "pullquote",
    "row",
    "rowheader",
    "toc"
  ]),
  some: /* @__PURE__ */ new Set([
    "aside",
    "bibliography",
    "endnotes",
    "glossary",
    "landmarks",
    "loa",
    "loi",
    "lot",
    "lov",
    "pullquote",
    "toc"
  ]),
  most: /* @__PURE__ */ new Set(["landmarks", "loa", "loi", "lot", "lov", "toc"])
}, Ir = {
  none: /* @__PURE__ */ new Set(),
  few: new Set(Ks),
  some: new Set(Ws),
  most: new Set(Cr)
}, Dt = {
  table: { few: "inline", some: "block", most: "block" }
};
function qe(n) {
  const e = {};
  for (const t of Object.keys(Dt))
    e[t] = Dt[t]?.[n] ?? "inline";
  return e;
}
const Pr = {
  none: qe("none"),
  few: qe("few"),
  some: qe("some"),
  most: qe("most")
}, zl = Object.keys(Dt);
function Ar(n, e) {
  const t = n === "custom" ? {} : Pr[n];
  if (!e) return t;
  const s = { ...t };
  for (const i of Object.keys(e)) {
    const a = e[i]?.[n];
    a && (s[i] = a);
  }
  return s;
}
const xr = (n, e) => {
  if (!n || typeof n == "object" && Object.keys(n).length === 0) return e;
  if (typeof n == "string" || !e || typeof e == "string") return n;
  const t = new Set(Object.keys(n).map(V)), s = { ...n };
  for (const [i, a] of Object.entries(e))
    t.has(V(i)) || (s[i] = a);
  return s;
};
class Ct {
  format;
  interruptions;
  verbosity;
  skip;
  contextualize;
  language;
  languageOverrides;
  segmentation;
  reconstruct;
  voice;
  pauseDuration;
  autoPause;
  rate;
  pitch;
  volume;
  constructor(e, t) {
    this.format = e.format ?? t.format, this.interruptions = e.interruptions ?? t.interruptions, this.verbosity = e.verbosity ?? t.verbosity, this.verbosity === "custom" ? (this.skip = e.skip ?? t.skip, this.contextualize = e.contextualize ?? t.contextualize) : (this.skip = [...Rr[this.verbosity]], this.contextualize = [...Ir[this.verbosity]]), this.language = e.language ?? t.language, this.languageOverrides = e.languageOverrides ?? t.languageOverrides, this.segmentation = e.segmentation ?? t.segmentation, this.reconstruct = e.reconstruct ?? t.reconstruct, this.voice = xr(e.voice, t.voice), this.pauseDuration = e.pauseDuration ?? t.pauseDuration, this.autoPause = e.autoPause ?? t.autoPause, this.rate = e.rate ?? t.rate, this.pitch = e.pitch ?? t.pitch, this.volume = e.volume ?? t.volume;
  }
}
function yt(n) {
  return n.name.startsWith("readium:") ? n.attrs.get("id") : void 0;
}
function Qs(n) {
  return n.name === "sub" ? n.attrs.get("alias") : void 0;
}
const Te = (n) => Qs(n) !== void 0, Or = ({ node: n }) => n.kind === "text" ? n.text : "";
function Lr(n) {
  const e = B(n), t = be(e), s = /* @__PURE__ */ new Map();
  if (t.forEach(({ node: a }, r) => {
    if (a.kind !== "element" || yt(a) === void 0) return;
    const o = t.slice(r + 1).map(Or).join("").trimStart();
    s.set(a, o.length === 0 || ut(o) ? "" : " ");
  }), s.size === 0) return n.replace(/ {2,}/g, " ").trim();
  const i = (a) => {
    const r = [];
    let o = !1;
    for (const l of a) {
      const c = l.kind === "element" ? s.get(l) : void 0;
      if (c !== void 0) {
        const u = r[r.length - 1];
        u?.kind === "text" && (u.text = u.text.replace(/\s+$/, "")), r.push({ kind: "text", text: c }), o = !0;
      } else l.kind === "text" ? (r.push({ kind: "text", text: o ? l.text.replace(/^\s+/, "") : l.text }), o = !1) : (r.push(l.children.length > 0 ? { ...l, children: i(l.children) } : l), o = !1);
    }
    return r;
  };
  return Se(i(e)).replace(/ {2,}/g, " ").trim();
}
function Vr(n) {
  return n.includes("<");
}
function St(n) {
  if (n === void 0) return;
  const e = {};
  n.language !== void 0 && (e.language = n.language);
  const t = n.ssml ? Lr(Ys(n.ssml, () => !0, n.language).ssml) : "";
  return Vr(t) && (e.ssml = t), n.plain ? e.plain = n.plain : t && !e.ssml && (e.plain = $(t)), e.plain || e.ssml ? e : void 0;
}
const Dn = /* @__PURE__ */ new WeakMap();
function Tr(n) {
  return n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function Ur(n) {
  const e = Tr(n), t = /\w/.test(n[0]) ? "(?<!\\w)" : "", s = /\w/.test(n[n.length - 1]) ? "(?!\\w)" : "";
  return `${t}${e}${s}`;
}
function Nr(n, e) {
  if (typeof e == "string")
    return { regex: new RegExp(Ur(n), "g"), replace: e };
  const t = e.pattern.flags.includes("g") ? e.pattern.flags : `${e.pattern.flags}g`;
  return { regex: new RegExp(e.pattern.source, t), replace: e.replace };
}
function zr(n) {
  let e = Dn.get(n);
  return e || (e = Object.entries(n).map(([t, s]) => Nr(t, s)), Dn.set(n, e)), e;
}
function Js(n, e) {
  const t = [];
  for (const a of zr(e))
    for (const r of n.matchAll(a.regex)) {
      const o = r.index, l = typeof a.replace == "string" ? a.replace : a.replace(...r);
      t.push({ start: o, end: o + r[0].length, replacement: l });
    }
  t.sort((a, r) => a.start - r.start);
  const s = [];
  let i = 0;
  for (const a of t)
    a.start < i || (s.push(a), i = a.end);
  return s;
}
function Mr(n, e) {
  let t = "";
  const s = [];
  let i = 0;
  for (const a of Js(n, e)) {
    for (; i < a.start; )
      t += n[i], s.push(i), i++;
    for (let r = 0; r < a.replacement.length; r++)
      t += a.replacement[r], s.push(a.start);
    i = a.end;
  }
  for (; i < n.length; )
    t += n[i], s.push(i), i++;
  return { text: t, map: s };
}
function Fn(n, e) {
  return n.length ? e <= 0 ? n[0] : e >= n.length ? n[n.length - 1] + 1 : n[e] : e;
}
function jr(n, e) {
  const t = de(n), s = t.plain, i = t.pieces.map(
    (y) => y.kind === "element" ? y : { start: y.start, end: y.start + (y.kind === "text" ? y.text.length : 1), chain: y.chain }
  ), a = Js(s, e), r = i.filter((y) => "start" in y), o = (y) => r.find((v) => v.start <= y && y < v.end), l = new tn();
  let c = "";
  const u = [];
  let h = 0;
  const d = (y, v) => {
    c += y.replacement;
    for (let E = 0; E < y.replacement.length; E++) u.push(y.start);
    l.text(v, y.replacement);
  };
  for (const y of i) {
    if ("node" in y) {
      l.node(y.chain, y.node);
      continue;
    }
    let v = y.start;
    for (; v < y.end; ) {
      const E = a[h];
      if (E && E.start <= v) {
        E.start === v && d(E, E.end > E.start ? mt(y.chain, o(E.end - 1).chain) : y.chain), v = Math.min(E.end, y.end), E.end <= y.end && h++;
        continue;
      }
      const w = E ? Math.min(E.start, y.end) : y.end, I = s.slice(v, w);
      c += I;
      for (let z = 0; z < I.length; z++) u.push(v + z);
      l.text(y.chain, I), v = w;
    }
  }
  for (const y of a.slice(h)) d(y, r[r.length - 1]?.chain ?? []);
  const g = l.flush();
  let m = 0;
  for (; m < s.length && /\s/.test(s[m]); ) m++;
  let S = s.length;
  for (; S > m && /\s/.test(s[S - 1]); ) S--;
  let f = 0;
  for (; f < c.length && /\s/.test(c[f]); ) f++;
  let k = c.length;
  for (; k > f && /\s/.test(c[k - 1]); ) k--;
  const b = s.slice(m, S), A = u.slice(f, k).map((y) => Math.min(Math.max(y - m, 0), Math.max(b.length - 1, 0)));
  return { ssml: g, plain: b, map: A };
}
function Zs(n) {
  return [...he(B(n))].some((e) => te(e) !== void 0);
}
const Br = new RegExp(
  `\\s+|[${Ze}]+|[${Ae}]+|[^\\s${Ze}${Ae}]+`,
  "gu"
);
function Dr(n) {
  const e = [];
  for (const [t] of n.matchAll(Br))
    /^\s/.test(t) ? e.push({ kind: "space" }) : Ma(t) ? e.push({ kind: "open", text: t }) : ut(t) ? e.push({ kind: "close", text: t }) : e.push({ kind: "word", text: t });
  return e;
}
function Fr(n) {
  let e = "", t = !1;
  for (const s of n) {
    if (s.kind === "space") {
      e && (t = !0);
      continue;
    }
    t && (e += " "), e += s.text, t = !1;
  }
  return e;
}
function _r(n) {
  let e = n.length;
  for (; e > 0 && (n[e - 1].kind === "space" || n[e - 1].kind === "open"); ) e--;
  return n.slice(e).some((t) => t.kind === "open") ? n.splice(e) : [];
}
function $r(n) {
  let e = 0;
  for (; e < n.length && (n[e].kind === "space" || n[e].kind === "close"); ) e++;
  return n.slice(0, e).some((t) => t.kind === "close") ? n.splice(0, e) : [];
}
function dn(n, e) {
  const t = [];
  for (const { node: r, ancestors: o } of be(B(n))) {
    let l = o.length - 1;
    for (; l >= 0 && te(o[l]) === void 0; ) l--;
    const c = l === -1 ? void 0 : o[l];
    if (t.length === 0 || t[t.length - 1].lang !== c) {
      const d = o.filter((g) => te(g) !== void 0);
      t.push({ lang: c, langs: d, writer: new tn() });
    }
    const { writer: u } = t[t.length - 1], h = o.slice(l + 1);
    r.kind === "text" ? u.text(h, r.text) : u.node(h, r);
  }
  const s = t.map(({ lang: r, langs: o, writer: l }) => ({
    tokens: Dr(Ms(l.flush())),
    language: r ? te(r) : e,
    langs: o
  })), i = (r, o) => r.langs.length > o.langs.length && o.langs.every((l, c) => r.langs[c] === l);
  for (let r = 0; r < s.length - 1; r++)
    i(s[r + 1], s[r]) ? s[r + 1].tokens.unshift(..._r(s[r].tokens)) : i(s[r], s[r + 1]) && s[r].tokens.push(...$r(s[r + 1].tokens));
  const a = [];
  for (const r of s) {
    const o = Fr(r.tokens);
    o && a.push({ plain: o, language: r.language });
  }
  return a;
}
const Gr = /[\p{L}\p{M}\p{N}\p{Pd}]+$/u, qr = /^[\p{L}\p{M}\p{N}\p{Pd}]+/u;
let Hr;
const Xs = (n) => (Hr ??= new Intl.Segmenter("und", { granularity: "word" })).segment(n);
function Kr(n, e) {
  if (!n || !e || new RegExp("^\\p{Pd}", "u").test(e)) return e;
  if (Ps(n, e)) return "";
  if (typeof Intl.Segmenter != "function") return e;
  const { index: t, segment: s } = Xs(n + e).containing(n.length - 1);
  return e.slice(0, Math.max(0, t + s.length - n.length));
}
function Wr(n, e) {
  if (!e || !n || new RegExp("\\p{Pd}$", "u").test(n)) return n;
  if (Ps(n, e)) return "";
  if (typeof Intl.Segmenter != "function") return n;
  const { index: t } = Xs(n + e).containing(n.length);
  return n.slice(Math.min(n.length, t));
}
function _n(n) {
  return [...he(B(n))].some((e) => yt(e) !== void 0 || Te(e));
}
function Ys(n, e, t) {
  const s = B(n), { chars: i, removed: a } = ti(s, e, t), r = /* @__PURE__ */ new Set();
  i.forEach(({ char: l, id: c }, u) => {
    if (l === Xt)
      for (const h of [-1, 1])
        for (let d = u + h; i[d] && (a[d] || /\s/.test(i[d].char)); d += h)
          a[d] || r.add(c);
  });
  const o = /* @__PURE__ */ new Map();
  if (i.forEach(({ char: l, node: c, index: u }, h) => {
    !a[h] || !c || /\s/.test(l) || (o.has(c) || o.set(c, /* @__PURE__ */ new Set()), o.get(c).add(u));
  }), o.size === 0) return { ssml: n, spaced: r };
  for (const [l, c] of o) l.text = l.text.split("").filter((u, h) => !c.has(h)).join("");
  return { ssml: Se(ei(s)), spaced: r };
}
function ei(n) {
  return n.flatMap((e) => {
    if (e.kind === "text") return e.text ? [e] : [];
    if (e.children.length === 0) return [e];
    const t = ei(e.children);
    return t.length > 0 ? [{ ...e, children: t }] : [];
  });
}
function Qr(n, e) {
  const { chars: t, removed: s } = ti(B(n), () => !0, e), i = (r, o) => {
    for (let l = r + o; l >= 0 && l < t.length; l += o) if (t[l].id === void 0 && !/\s/.test(t[l].char)) return l;
    return -1;
  }, a = /* @__PURE__ */ new Set();
  return t.forEach(({ id: r }, o) => {
    const [l, c] = [i(o, -1), i(o, 1)];
    r !== void 0 && l !== -1 && c !== -1 && s[l] && s[c] && a.add(r);
  }), a;
}
function ti(n, e, t) {
  const s = [];
  for (const { node: a } of be(n, Te)) {
    if (a.kind === "text") {
      for (let o = 0; o < a.text.length; o++) s.push({ char: a.text[o], node: a, index: o });
      continue;
    }
    const r = yt(a);
    (r !== void 0 || Te(a)) && s.push({ char: r !== void 0 && e(r) ? Xt : "￼", id: r });
  }
  const i = ta(s.map(({ char: a }) => a).join(""), t);
  return { chars: s, removed: i };
}
function Jr(n, e) {
  return ea(`x ${Xt}${n}`, e).startsWith("x ");
}
function Zr(n, e) {
  const t = [];
  for (const { node: s, ancestors: i } of be(e, Te)) {
    if (s.kind !== "element") continue;
    const a = yt(s);
    if (a !== void 0 && t.push({ start: s.start, end: s.end, placeholderId: a }), !Te(s)) continue;
    let r = i.length;
    for (; r > 0 && i[r - 1].children.length === 1 && !Vs(i[r - 1]); ) r--;
    const o = i.slice(r);
    t.push({
      start: o[0]?.start ?? s.start,
      end: o[0]?.end ?? s.end,
      alias: Qs(s),
      inner: n.slice(s.start + s.openTag.length, s.closeStart),
      wrapOpen: o.map((l) => l.openTag).join(""),
      wrapClose: o.map(pt).reverse().join("")
    });
  }
  return t;
}
function Ft(n) {
  const e = B(n), t = zs(de(n).pieces), s = [...he(e)].filter((h) => !h.selfClosing), i = (h) => s.filter((d) => d.start < h && h <= d.closeStart), a = (h, d) => ({ open: i(h), close: i(d) }), r = [];
  let o = 0, l = !1;
  const c = (h, d) => {
    const g = n.slice(h, d), m = g.trim();
    if (!m) return;
    const S = h + g.length - g.trimStart().length, f = { ssml: m, ...a(S, S + m.length) };
    r.push(l && !/^\s/.test(t(h, d)) ? { ...f, touchesPrevious: !0 } : f);
  }, u = Zr(n, e);
  return u.forEach((h, d) => {
    const g = n.slice(h.end, u[d + 1]?.start ?? n.length);
    if (h.placeholderId !== void 0) {
      c(o, h.start);
      const w = i(h.start), I = w.map(te).filter((z) => z !== void 0).pop();
      r.push({
        placeholderId: h.placeholderId,
        open: w,
        textBefore: t(o, h.start),
        textAfter: t(h.end, u[d + 1]?.start ?? n.length),
        ...I && { language: I }
      }), l = !1, o = h.end;
      return;
    }
    const m = $(h.inner), S = Wr(n.slice(o, h.start).match(Gr)?.[0] ?? "", m), f = Kr(m, g.match(qr)?.[0] ?? ""), k = t(o, h.start - S.length);
    c(o, h.start - S.length);
    const b = k.trim() !== "" && !/\s$/.test(k), A = (w) => `${h.wrapOpen}${w}${h.wrapClose}`, y = (w) => A(`${S}${w}${f}`), v = a(h.start, h.end), E = le(h.alias);
    r.push({ ssml: y(h.inner), ...v, abbreviation: "text", ...b && { touchesPrevious: b } }), r.push({
      ssml: y(E),
      ...v,
      abbreviation: "alias",
      abbreviationText: y(h.inner),
      parenthesizedSsml: A(`(${E})`),
      ...b && { touchesPrevious: b }
    }), l = !0, o = h.end + f.length;
  }), c(o, n.length), r;
}
const Rt = /* @__PURE__ */ new WeakMap(), ni = /* @__PURE__ */ new WeakMap();
function $n(n, e) {
  ni.set(n, e);
}
const We = /* @__PURE__ */ new WeakSet();
function _t(n) {
  return We.add(n), n;
}
const si = /* @__PURE__ */ new WeakMap();
function Xr(n, e) {
  si.set(n, e);
}
const Gn = (n) => n.replace(/\s/g, " ");
function Yr(n, e, t) {
  const s = ni.get(n);
  if (s) {
    const h = Fn(s.map, e), d = Fn(s.map, e + t);
    e = h, t = Math.max(0, d - h);
  }
  const i = n.offsets, a = !n.plain && !!n.ssml, r = Gn(s?.plain ?? n.plain ?? (n.ssml ? $(n.ssml) : ""));
  if (!i?.length || !r) return;
  const o = Rt.get(n), l = o !== void 0 && e >= o.cursor;
  let c = l ? o.cursor : 0;
  const u = (h) => {
    const d = h.locate.text?.highlight;
    return d && Gn(a ? $(d) : d);
  };
  for (let h = l ? o.pieceIndex : 0; h < i.length; h++) {
    const d = i[h];
    if (We.has(d.locate)) {
      const f = si.get(d), k = i.slice(h + 1).find((I) => !We.has(I.locate) && u(I)), b = k && u(k), A = b ? r.indexOf(b, c + (f ?? d.end - d.start)) : -1, y = b && A === -1 ? r.indexOf(b, c) : A, v = i[h + 1], E = c + /^\s*/.exec(r.slice(c))[0].length, w = f !== void 0 && v && We.has(v.locate) ? E + f : y === -1 ? r.length : y;
      if (e >= c && e < w)
        return f === void 0 ? void 0 : (Rt.set(n, { pieceIndex: h, cursor: c }), { locate: d.locate, word: r.substring(e, Math.min(e + t, w)) });
      c = w;
      continue;
    }
    const g = u(d) ?? r.slice(c);
    if (!g) continue;
    const m = r.indexOf(g, c);
    if (m === -1) continue;
    const S = m + g.length;
    if (e >= m && e < S) {
      Rt.set(n, { pieceIndex: h, cursor: c });
      const f = e - m, k = g.substring(f, Math.min(f + t, g.length));
      return { locate: {
        ...d.locate,
        domRange: void 0,
        text: {
          highlight: k,
          before: g.substring(0, f),
          after: g.substring(f + k.length)
        }
      }, word: k };
    }
    c = S;
  }
}
function eo(n, e) {
  return e === "sentence" && n.offsets?.length ? n.offsets.map((t) => t.locate) : n.locate ? [n.locate] : [];
}
function G(n) {
  return { pattern: new RegExp(`(\\d+)\\s?u${n}\\b`, "g"), replace: (e, t) => `${t}µ${n}` };
}
const to = {
  "1/4": "¼",
  "1/2": "½",
  "3/4": "¾",
  "1/7": "⅐",
  "1/9": "⅑",
  "1/10": "⅒",
  "1/3": "⅓",
  "2/3": "⅔",
  "1/5": "⅕",
  "2/5": "⅖",
  "3/5": "⅗",
  "4/5": "⅘",
  "1/6": "⅙",
  "5/6": "⅚",
  "1/8": "⅛",
  "3/8": "⅜",
  "5/8": "⅝",
  "7/8": "⅞",
  "0/3": "↉"
}, no = {
  ...to,
  // Rejects "(c)" directly preceded by "(a)"/"(b)" (a lettered list, not a copyright notice).
  "(c)": { pattern: new RegExp("(?<!\\([ab]\\)\\s{0,3})\\(c\\)", "g"), replace: "©" },
  "(C)": { pattern: new RegExp("(?<!\\([AB]\\)\\s{0,3})\\(C\\)", "g"), replace: "©" },
  "(r)": "®",
  "(R)": "®",
  "(tm)": "™",
  "(TM)": "™",
  deg: { pattern: /(\d+)\s?deg\b/g, replace: (n, e) => `${e}°` },
  x: { pattern: /(\d+)\s?[xX]\s?(?=\d)/g, replace: (n, e) => `${e}×` },
  ug: G("g"),
  um: G("m"),
  us: G("s"),
  uL: G("L"),
  uF: G("F"),
  uA: G("A"),
  uV: G("V"),
  uW: G("W"),
  uN: G("N"),
  umol: G("mol"),
  "->": "→",
  "<-": "←",
  // Reversed from every other entry: engines pattern-match the ASCII foot/inch
  // convention for pronunciation, but drop the real prime marks silently.
  "′": "'",
  "″": '"'
};
function U(n) {
  return n.role ? [...n.role] : [];
}
const qn = /* @__PURE__ */ new WeakMap();
function so(n, e) {
  if (e.selfClosing) return "";
  const t = nn(n, (s) => s.start === e.start);
  return t.slice(e.start + e.openTag.length, e.closeStart + t.length - n.length);
}
function io(n) {
  const e = nn(n, (r) => r.name === "p" || r.name === "s"), t = [];
  for (const r of he(B(e))) {
    if (r.name !== "p" && r.name !== "s") continue;
    const o = r.attrs.get("xml:lang"), l = o === void 0 ? void 0 : `<lang xml:lang="${Me(o)}">`;
    if (r.selfClosing) {
      t.push({ start: r.start, end: r.end, text: "", opens: !1 });
      continue;
    }
    t.push({ start: r.start, end: r.start + r.openTag.length, text: l ?? "", opens: !0 }), t.push({ start: r.closeStart, end: r.end, text: l ? "</lang>" : "", opens: !1 });
  }
  if (!t.length) return e;
  t.sort((r, o) => r.start - o.start);
  const s = zs(de(e).pieces);
  let i = "", a = 0;
  for (let r = 0; r < t.length; ) {
    let o = r + 1;
    for (; o < t.length && t[o].start === t[o - 1].end; ) o++;
    const l = t.slice(r, o);
    i += e.slice(a, l[0].start);
    const c = l.findIndex((d) => d.opens), [u, h] = c === -1 ? [l, []] : [l.slice(0, c), l.slice(c)];
    a = l[l.length - 1].end, i += u.map((d) => d.text).join(""), Ns(s(0, l[0].start), s(a, e.length)) && (i += " "), i += h.map((d) => d.text).join(""), r = o;
  }
  return i + e.slice(a);
}
function we(n) {
  if (!n?.ssml) return n;
  let e = qn.get(n);
  if (!e) {
    const t = io(n.ssml), s = B(t).filter((r) => r.kind === "element" || r.text.trim() !== ""), i = s.length === 1 && s[0].kind === "element" && s[0].name === "speak" ? s[0] : void 0, a = i ? so(t, i) : t;
    e = a !== n.ssml ? new Yi({ plain: n.plain, ssml: a, language: n.language ?? i?.attrs.get("xml:lang") }) : n, qn.set(n, e);
  }
  return e;
}
function Ue(n) {
  return n.role?.has("math") ? void 0 : we(n.text);
}
function bt(n) {
  const e = we(n.description?.text);
  if (e)
    return e.plain ?? (e.ssml !== void 0 ? $(e.ssml) : void 0);
}
function ii(n) {
  return we(n.description?.text)?.language;
}
const ao = { contextualizations: { abstract: { block: { start: "Start of the abstract.", end: "End of the abstract." } }, acknowledgments: { block: { start: "Start of the acknowledgments.", end: "End of the acknowledgments." } }, afterword: { block: { start: "Start of the afterword.", end: "End of the afterword." } }, appendix: { block: { start: "Start of the appendix.", end: "End of the appendix." } }, aside: { block: { start: "Start of the aside.", end: "End of the aside." } }, audio: { inline: { labelled: "Audio with a label: {{ description }}", unlabelled: "Audio with no label." } }, bibliography: { block: { start: "Start of the bibliography.", end: "End of the bibliography." } }, biblioref: { inline: "Bibliographic reference." }, blockquote: { inline: "Blockquote." }, caption: { inline: "Caption." }, cell: { inline: { withHeader: "{{ header }}: {{ value }}", withoutHeader: "{{ value }}" } }, chapter: { block: { start: "Start of the chapter.", end: "End of the chapter." } }, colophon: { inline: "Colophon." }, complementary: { block: { start: "Start of the complementary content.", end: "End of the complementary content." } }, conclusion: { block: { start: "Start of the conclusion.", end: "End of the conclusion." } }, cover: { inline: { labelled: "Cover with a label: {{ description }}", unlabelled: "Cover with no label." } }, credit: { inline: "Credit." }, credits: { block: { start: "Start of the credits.", end: "End of the credits." } }, dedication: { inline: "Dedication." }, definition: { inline: "Definition." }, details: { block: { start: "Start of the disclosure.", end: "End of the disclosure." } }, endnotes: { block: { start: "Start of the endnotes.", end: "End of the endnotes." } }, epigraph: { inline: "Epigraph." }, epilogue: { block: { start: "Start of the epilogue.", end: "End of the epilogue." } }, errata: { block: { start: "Start of the errata.", end: "End of the errata." } }, example: { block: { start: "Start of the example.", end: "End of the example." } }, figure: { inline: { labelled: "Figure: {{ description }}", unlabelled: "Figure." } }, footnote: { block: { start: "Start of the footnote.", end: "End of the footnote." } }, foreword: { block: { start: "Start of the foreword.", end: "End of the foreword." } }, glossary: { block: { start: "Start of the glossary.", end: "End of the glossary." } }, glossref: { inline: "Glossary definition.", term: "{{ term }}: {{ value }}" }, heading1: { inline: "Heading level 1." }, heading2: { inline: "Heading level 2." }, heading3: { inline: "Heading level 3." }, heading4: { inline: "Heading level 4." }, heading5: { inline: "Heading level 5." }, heading6: { inline: "Heading level 6." }, image: { inline: { labelled: "Image with a label: {{ description }}", unlabelled: "Image with no label." } }, index: { block: { start: "Start of the index.", end: "End of the index." } }, introduction: { block: { start: "Start of the introduction.", end: "End of the introduction." } }, list: { block: { start: "Start of the list.", end: "End of the list." } }, listItem: { inline: "List item." }, math: { inline: { labelled: "{{ description }}", unlabelled: "Math formula with no label." } }, notice: { inline: "Notice." }, pagebreak: { inline: "Pagebreak.", number: "Page {{ number }}" }, pagelist: { block: { start: "Start of the page list.", end: "End of the page list." } }, part: { inline: "Part." }, preface: { block: { start: "Start of the preface.", end: "End of the preface." } }, prologue: { block: { start: "Start of the prologue.", end: "End of the prologue." } }, pullquote: { inline: "Pullquote." }, qna: { block: { start: "Start of the questions and answers.", end: "End of the questions and answers." } }, row: { inline: "Row: {{ count }}" }, rowheader: { inline: { withHeader: "{{ header }}: {{ value }}", withoutHeader: "{{ value }}" } }, separator: { inline: "Separator." }, subtitle: { inline: "Subtitle." }, summary: { inline: "Summary." }, table: { block: { end: "End of the table.", start: { labelled: "Table: {{ description }}. {{ lines }}. {{ columns }}.", unlabelled: "Table. {{ lines }}. {{ columns }}." } }, inline: { labelled: "Table: {{ description }}. {{ lines }}. {{ columns }}.", unlabelled: "Table. {{ lines }}. {{ columns }}." }, parts: { columns_one: "1 column", columns_other: "{{ count }} columns", lines_one: "1 line", lines_other: "{{ count }} lines" } }, term: { inline: "Term." }, tip: { inline: "Tip." }, video: { inline: { labelled: "Video with a label: {{ description }}", unlabelled: "Video with no label." } } } }, ro = {
  speech: ao
}, ai = ro.speech.contextualizations, $t = { en: ai }, ri = {};
function oo(n) {
  return $t[n] || ri[n] ? n : "en";
}
async function lo(n) {
  const e = $t[n];
  if (e) return e;
  const t = ri[n];
  if (!t) return ai;
  const s = (await t()).speech.contextualizations;
  return $t[n] = s, s;
}
const co = {
  de: ["A.", "A.M.", "Abs.", "Abt.", "Abw.", "Adj.", "Adr.", "Akt.", "Allg.", "Alt.", "App.", "Apr.", "Art.", "Aug.", "Ausg.", "Ausschl.", "B.", "Bed.", "Ben.", "Ber.", "Best.", "Bibl.", "C.", "Ca.", "Chin.", "Chr.", "Co.", "D.", "D. h.", "Dat.", "Dez.", "Di.", "Dim.", "Dipl.-Ing.", "Dipl.-Kfm.", "Dir.", "Do.", "Dr.", "Dtzd.", "Einh.", "Erf.", "Evtl.", "F.", "F.f.", "Fa.", "Fam.", "Feb.", "Fn.", "Folg.", "Forts. f.", "Fr.", "Frl.", "G.", "Gebr.", "Gem.", "Geograph.", "Ges.", "Gesch.", "Ggf.", "Hbf.", "Hptst.", "Hr.", "Hrn.", "Hrsg.", "I.", "Inc.", "Ing.", "Inh.", "Int.", "J.", "J.D.", "Jahrh.", "Jan.", "Jr.", "Kap.", "Kfm.", "Kl.", "Konv.", "Kop.", "L.", "Ltd.", "M.", "Max.", "Mi.", "Min.", "Mind.", "Mio.", "Mo.", "Mod.", "Mrd.", "Msp.", "N.", "Nov.", "Nr.", "O.", "Obj.", "Okt.", "Op.", "P.", "P.M.", "PIN.", "Pfd.", "Phys.", "Port.", "Prot.", "Proz.", "Qu.", "R.", "Rd.", "Reg.", "Reg.-Bez.", "Rel.", "Rep.", "S.A.", "Sa.", "Schr.", "Sek.", "Sep.", "Sept.", "So.", "Spezif.", "St.", "StR.", "Std.", "Str.", "T.", "Tel.", "Temp.", "Test.", "Trans.", "Tägl.", "U.", "U. U.", "U.S.", "U.S.A.", "U.U.", "Urspr.", "Ursprüngl.", "Verf.", "Vgl.", "W.", "Wg.", "Y.", "Z.", "Z. B.", "Z. Zt.", "Ztr.", "a.D.", "a.M.", "a.Rh.", "a.a.O.", "a.a.S.", "am.", "amtl.", "b.", "beil.", "d.J.", "d.Ä.", "e.V.", "e.Wz.", "e.h.", "ehem.", "eigtl.", "einschl.", "entspr.", "erw.", "ev.", "evtl.", "exkl.", "frz.", "geb.", "gedr.", "gek.", "gesch.", "gest.", "ggf.", "ggfs.", "hpts.", "i.A.", "i.B.", "i.H.", "i.J.", "i.R.", "i.V.", "inkl.", "jew.", "jhrl.", "k. u. k.", "k.u.k.", "kath.", "kfm.", "kgl.", "led.", "m.E.", "m.W.", "mtl.", "möbl.", "n. Chr.", "n.u.Z.", "näml.", "o.A.", "o.B.", "o.g.", "od.", "p.Adr.", "r.", "röm.", "röm.-kath.", "s.", "s.a.", "schles.", "schweiz.", "schwäb.", "sog.", "südd.", "tägl.", "u.", "u. Z.", "u.A.w.g.", "u.U.", "u.a.", "u.v.a.", "u.Ä.", "u.ä.", "v. Chr.", "v. H.", "v. u. Z.", "v.Chr.", "v.H.", "v.R.w.", "v.T.", "v.u.Z.", "verh.", "verw.", "vgl.", "z.", "z.B.", "z.Hd.", "z.Z.", "zzgl.", "österr."],
  en: ["A.D.", "A.I.", "A.M.", "A.S.", "AA.", "AB.", "Abs.", "Adj.", "Adv.", "Alt.", "Approx.", "Aug.", "B.V.", "C.F.", "C.O.D.", "Capt.", "Col.", "Comm.", "Conn.", "Cont.", "D.A.", "D.C.", "DC.", "DR.", "Dec.", "Def.", "Dept.", "Diff.", "Dr.", "E.G.", "E.g.", "Ed.", "Est.", "Etc.", "Ex.", "Exec.", "Feb.", "Fn.", "Fri.", "Hon.B.A.", "I.", "I.D.", "I.T.", "I.e.", "J.B.", "J.D.", "J.K.", "Jan.", "Jun.", "K.R.", "L.A.", "L.P.", "Lev.", "Lib.", "Lt.", "Lt.Cdr.", "M.", "M.I.T.", "M.R.", "M.T.", "MR.", "Maj.", "Mar.", "Mart.", "Mb.", "Md.", "Mgr.", "Min.", "Misc.", "Mr.", "Mrs.", "Ms.", "Mt.", "N.V.", "N.Y.", "Nov.", "Nr.", "Num.", "Op.", "Org.", "P.M.", "P.O.", "P.V.", "PP.", "Ph.D.", "Phys.", "Prof.", "Pvt.", "R.L.", "R.T.", "Rep.", "Rev.", "S.A.", "S.A.R.", "S.E.", "S.p.A.", "Sep.", "Sept.", "Sgt.", "Sq.", "St.", "U.S.", "U.S.A.", "U.S.C.", "VS.", "Yr.", "a.m.", "d.", "dr.", "exec.", "pp.", "vs."],
  es: ["A.C.", "AA.", "All.", "Ant.", "Av.", "Avda.", "Bien.", "C.", "C.P.", "C.S.", "C.V.", "CA.", "Col.", "Comm.", "Corp.", "Cía.", "D.", "DC.", "Da.", "Desc.", "Desv.", "Dr.", "Dra.", "Drs.", "Dto.", "Dª.", "Dña.", "Em.", "Emm.", "Exc.", "Excma.", "Excmas.", "Excmo.", "Excmos.", "Exma.", "Exmas.", "Exmo.", "Exmos.", "FF.CC.", "Fabric.", "Fr.", "H.P.", "Id.", "Ilma.", "Ilmas.", "Ilmo.", "Ilmos.", "Inc.", "JJ.OO.", "K.", "Kit.", "Korn.", "L.", "Lcda.", "Lcdo.", "Lda.", "Ldo.", "Lic.", "Ltd.", "Ltda.", "Ltdo.", "M.", "MM.", "Mons.", "Mr.", "Mrs.", "O.M.", "PP.", "R.D.", "R.U.", "RAM.", "RR.HH.", "Rdo.", "Rdos.", "Reg.", "Rev.", "Rol.", "Rvdmo.", "Rvdmos.", "Rvdo.", "Rvdos.", "SA.", "SS.AA.", "SS.MM.", "Sdad.", "Seg.", "Sol.", "Sr.", "Sra.", "Sras.", "Sres.", "Srta.", "Srtas.", "Sta.", "Sto.", "Trab.", "U.S.", "U.S.A.", "Var.", "Vda.", "a. C.", "a. e. c.", "abr.", "afma.", "afmas.", "afmo.", "afmos.", "ago.", "bco.", "bol.", "c/c.", "cap.", "cf.", "cfr.", "col.", "d. C.", "depto.", "deptos.", "dic.", "doc.", "dom.", "dpto.", "dptos.", "dtor.", "e. c.", "e.g.", "ed.", "ej.", "ene.", "feb.", "fig.", "figs.", "fund.", "hnos.", "jue.", "jul.", "jun.", "licda.", "licdo.", "lun.", "mar.", "may.", "mié.", "ms.", "mss.", "mtro.", "nov.", "ntra.", "ntro.", "oct.", "p.ej.", "prof.", "prov.", "sept.", "sras.", "sres.", "srs.", "ss.", "sáb.", "trad.", "v.gr.", "vid.", "vie.", "vs."],
  fr: ["All.", "C.", "Comm.", "D.", "DC.", "Desc.", "Inc.", "Jr.", "L.", "M.", "MM.", "Mart.", "Op.", "P.", "P.-D. G.", "P.O.", "Prof.", "S.A.", "S.M.A.R.T.", "U.", "U.S.", "U.S.A.", "Var.", "W.", "acoust.", "adr.", "anc.", "ann.", "anon.", "ap. J.-C.", "append.", "aux.", "av. J.-C.", "avr.", "broch.", "bull.", "cam.", "categ.", "coll.", "collab.", "config.", "dest.", "dict.", "dim.", "dir.", "doc.", "déc.", "encycl.", "exempl.", "fig.", "févr.", "gouv.", "graph.", "hôp.", "ill.", "illustr.", "imm.", "imprim.", "indus.", "janv.", "jeu.", "juil.", "lun.", "mar.", "mer.", "niv.", "nov.", "oct.", "quart.", "réf.", "sam.", "sept.", "symb.", "synth.", "syst.", "trav. publ.", "ven.", "voit.", "éd.", "édit.", "équiv.", "éval."],
  it: ["C.P.", "Cfr.", "D.", "DC.", "Geom.", "Ing.", "L.", "Liv.", "Ltd.", "Mod.", "N.B.", "N.d.A.", "N.d.E.", "N.d.T.", "O.d.G.", "S.A.R.", "S.M.A.R.T.", "S.p.A.", "Sig.", "U.S.", "U.S.A.", "a.C.", "ag.", "all.", "arch.", "avv.", "c.c.p.", "d.C.", "d.p.R.", "div.", "dott.", "dr.", "fig.", "int.", "mitt.", "on.", "p.", "p.i.", "pag.", "rag.", "sez.", "tab.", "tav.", "ver.", "vol."],
  pt: ["A.C.", "Alm.", "Av.", "Dir.", "Dr.", "Dra.", "Dras.", "Drs.", "E.", "Est.", "Exma.", "Exmo.", "Fr.", "Ilma.", "Ilmo.", "Jr.", "Ltd.", "Ltda.", "Mar.", "N.Sra.", "N.T.", "P.M.", "Pe.", "Ph.D.", "R.", "S.", "S.A.", "Sta.", "Sto.", "V.T.", "W.C.", "a.C.", "a.m.", "abr.", "abrev.", "adm.", "aer.", "ago.", "agric.", "anat.", "ap.", "apart.", "apt.", "arit.", "arqueol.", "arquit.", "astron.", "autom.", "aux.", "biogr.", "bras.", "cap.", "caps.", "cat.", "cel.", "cf.", "col.", "com.", "comp.", "compl.", "cont.", "contab.", "créd.", "cx.", "círc.", "cód.", "d.C.", "des.", "desc.", "dez.", "dipl.", "dir.", "div.", "doc.", "déb.", "ed.", "educ.", "elem.", "eletr.", "eletrôn.", "end.", "eng.", "esp.", "ex.", "f.", "fac.", "fasc.", "fem.", "fev.", "ff.", "fig.", "fil.", "filos.", "fisiol.", "fl.", "fot.", "fr.", "fís.", "geom.", "gram.", "gên.", "hist.", "ind.", "ingl.", "jan.", "jul.", "jun.", "jur.", "l.", "lat.", "lin.", "lit.", "liter.", "long.", "mai.", "mar.", "mat.", "matem.", "mov.", "máq.", "méd.", "mús.", "neol.", "nov.", "náut.", "obs.", "odont.", "odontol.", "org.", "organiz.", "out.", "p.", "p. ex.", "p.m.", "pal.", "pol.", "port.", "pp.", "pq.", "prod.", "prof.", "profa.", "pron.", "próx.", "psicol.", "pág.", "quím.", "r.s.v.p.", "ref.", "rel.", "relat.", "rep.", "res.", "rod.", "set.", "sociol.", "sup.", "séc.", "símb.", "tec.", "tecnol.", "tel.", "trad.", "transp.", "univ.", "vol.", "vs.", "álg.", "índ."],
  ru: ["авг.", "апр.", "дек.", "до н. э.", "кв.", "н. э.", "н.э.", "нояб.", "окт.", "отд.", "проф.", "руб.", "сент.", "тел.", "тыс.", "ул.", "февр.", "янв."],
  th: ["ค.ศ."]
};
function It(n, e, t) {
  let s = t;
  for (; s > e && /\s/.test(n[s - 1]); ) s--;
  return s;
}
const uo = /[\s([{"'“‘]/;
function ho(n, e) {
  for (const t of e) {
    if (n.length < t.length || !n.endsWith(t)) continue;
    const s = n.length - t.length - 1;
    if (s < 0 || uo.test(n[s])) return !0;
  }
  return !1;
}
function go(n) {
  let e = 0;
  for (const t of n)
    if (new RegExp("\\p{L}", "u").test(t) && e++, e >= 2) return !0;
  return !1;
}
function fo(n) {
  return /\.{3,}$/.test(n);
}
function po(n, e, t, s) {
  if (s === "“") return !0;
  if (s !== '"') return !1;
  let i = 0;
  for (let a = e; a < t; a++) n[a] === '"' && i++;
  return i % 2 === 1;
}
const mo = new RegExp(`[.!?][”"'’)\\]]*\\s+—\\s+(?=\\p{Lu})`, "gu");
function vo(n, e) {
  const t = [...n.matchAll(mo)].map((i) => i.index + i[0].length);
  if (t.length === 0) return e;
  const s = [];
  for (const i of e) {
    let a = i.start;
    for (const r of t)
      r > a && r < i.end && (s.push({ start: a, end: r }), a = r);
    s.push({ start: a, end: i.end });
  }
  return s;
}
const yo = { "»": "«", "«": "»", "›": "‹", "‹": "›" };
function So(n, e) {
  const t = [], s = /* @__PURE__ */ new Map();
  let i = 0;
  const a = (r, o) => {
    for (; i < r; i++) s.set(n[i], (s.get(n[i]) ?? 0) + 1);
    return s.get(o) ?? 0;
  };
  for (const r of e) {
    const o = { ...r }, l = t[t.length - 1];
    let c = o.start;
    for (; l && c < o.end; ) {
      for (; c < o.end && /\s/.test(n[c]); ) c++;
      const u = yo[n[c]];
      if (u === void 0 || a(l.end, u) <= a(l.end, n[c])) break;
      for (c++; c < o.end && /\s/.test(n[c]); ) c++;
      l.end = o.start = c;
    }
    o.start < o.end ? t.push(o) : l && (l.end = o.end);
  }
  return t;
}
function bo(n, e, t) {
  const s = So(n, vo(n, e));
  for (let a = 0; a < s.length - 1; a++) {
    const r = It(n, s[a].start, s[a].end);
    if (r !== s[a].end || r <= s[a].start) continue;
    const o = n[r - 1];
    po(n, s[a].start, r, o) && (s[a].end -= 1, s[a + 1].start -= 1);
  }
  const i = [];
  for (const a of s) {
    let r = a;
    for (; i.length > 0; ) {
      const o = i[i.length - 1], l = It(n, o.start, o.end), c = n.slice(o.start, l);
      if (!ho(c, t) && go(c) && !fo(c)) break;
      i.pop(), r = { start: o.start, end: r.end };
    }
    i.push(r);
  }
  return i.map((a) => {
    const r = It(n, a.start, a.end);
    return { text: n.slice(a.start, r), start: a.start, end: a.end, contentEnd: r };
  });
}
function oi(n, e, t) {
  const s = [];
  let i;
  return e.forEach((a, r) => {
    i ??= a;
    const o = e[r + 1];
    o && t(a, o) || (s.push({ text: n.slice(i.start, a.contentEnd), start: i.start, end: a.end, contentEnd: a.contentEnd }), i = void 0);
  }), s;
}
const Hn = /* @__PURE__ */ new Map();
function li(n) {
  let e = Hn.get(n);
  if (!e) {
    try {
      const [t, s] = O(n), i = s ? `${t}-${s}` : t;
      e = { segmenter: new Intl.Segmenter(i, { granularity: "sentence" }), language: n };
    } catch {
      e = { segmenter: new Intl.Segmenter("en", { granularity: "sentence" }), language: "en" };
    }
    Hn.set(n, e);
  }
  return e;
}
function wo(n) {
  return li(n).language;
}
function wt(n, e) {
  const t = e.segmenter === ci ? wo(n) : n;
  return fs(e.segmentationSuppressions, t);
}
async function ci(n, e, t) {
  if (e === "") return [];
  const { segmenter: s, language: i } = li(n), r = [...s.segment(e)].map((c) => ({ start: c.index, end: c.index + c.segment.length })), o = fs(co, i) ?? [], l = t ? [...o, ...t] : o;
  return bo(e, r, l);
}
const Ml = [
  "aside",
  "audio",
  "bibliography",
  "cell",
  "columnheader",
  "details",
  "endnotes",
  "figure",
  "footnote",
  "glossary",
  "image",
  "landmarks",
  "loa",
  "loi",
  "lot",
  "lov",
  "pullquote",
  "row",
  "rowheader",
  "table",
  "toc",
  "video"
], ko = [
  // Headings
  "heading1",
  "heading2",
  "heading3",
  "heading4",
  "heading5",
  "heading6",
  // Text blocks
  "paragraph",
  "blockquote",
  "preformatted",
  "pullquote",
  // Lists
  "list",
  "listItem",
  // Tables
  "table",
  "row",
  "cell",
  "columnheader",
  "rowheader",
  // Media
  "audio",
  "video",
  "figure",
  "image",
  "math",
  // Sectioning / landmark containers
  "abstract",
  "acknowledgments",
  "afterword",
  "appendix",
  "article",
  "aside",
  "bibliography",
  "chapter",
  "colophon",
  "conclusion",
  "dedication",
  "endnotes",
  "epigraph",
  "epilogue",
  "errata",
  "example",
  "footnote",
  "foreword",
  "glossary",
  "index",
  "introduction",
  "notice",
  "part",
  "preface",
  "prologue",
  "qna",
  "section",
  "summary",
  "tip"
], Eo = {
  footnote: { drops: ["aside"], unconditional: !0 },
  cover: { drops: ["image"] },
  pullquote: { drops: ["blockquote", "aside"] },
  epigraph: { drops: ["blockquote"] }
}, Co = ["abbreviation", "biblioref", "glossref", "noteref", "pagebreak"], Ro = ["biblioref", "glossref"], Io = ["audio", "video", "image", "figure", "math", "table", "cover"], Po = ["cell", "rowheader"], Ao = ["separator"], Oe = new Set(Co), xo = new Set(Io), ui = new Set(Po), Oo = new Set(Ao), Y = new Set(Ro);
function Lo(n, e) {
  const t = ia.createInstance();
  return t.init({
    lng: n,
    resources: { [n]: { translation: e } },
    interpolation: { escapeValue: !1 }
  }), t;
}
function Vo(n, e, t) {
  if (!e) return n;
  const s = { ...n };
  for (const i of Object.keys(e))
    s[i] = t(n[i], e[i]);
  return s;
}
function hi(n, e) {
  if (typeof e == "string" || typeof n != "object") return e;
  const t = { ...n };
  for (const s of Object.keys(e))
    t[s] = hi(n[s], e[s]);
  return t;
}
function To(n, e) {
  return Vo(n, e, hi);
}
function di(n, e = [], t = /* @__PURE__ */ new Map()) {
  for (const s of n)
    t.set(s, e), s.children && di(s.children, [s, ...e], t);
  return t;
}
function gi(n, e = /* @__PURE__ */ new WeakSet()) {
  let t;
  for (let s = n.length - 1; s >= 0; s--) {
    const i = n[s];
    U(i).includes("term") ? t && U(t).includes("definition") && e.add(i) : t = i, i.children && gi(i.children, e);
  }
  return e;
}
async function Uo(n, e) {
  const t = e.contextualizationLocale ?? "en", s = To(
    await lo(t),
    e.contextualization?.contextualizations
  );
  return {
    i18n: Lo(t, s),
    contextualizationLanguage: oo(t),
    skip: new Set(e.skip ?? []),
    contextualize: new Set(e.contextualize ?? []),
    contextualizationShapes: e.contextualization?.shapes ?? {},
    contextualizationParams: e.contextualization?.params,
    format: e.format ?? "plain",
    interruptions: e.interruptions ?? {},
    language: e.language ?? "block-level",
    languageOverrides: e.languageOverrides ?? {},
    contentLanguage: e.contentLanguage,
    segmentation: e.segmentation?.mode ?? "structure",
    segmentationReconstruct: e.segmentation?.reconstruct ?? !1,
    // segmentSentences() already applies builtInSuppressions internally
    // (Intl.Segmenter has no built-in equivalent of its own) — this is only
    // the caller's own additive extras, per `SegmentationOptions.suppressions`.
    segmentationSuppressions: e.segmentation?.suppressions ?? {},
    segmenter: e.segmentation?.segmenter ?? ci,
    // Per-key override, not an additive union — each key holds one whole rule.
    substitutions: { ...no, ...e.substitutions },
    tableRowNumbers: /* @__PURE__ */ new Map(),
    tableCellHeaders: /* @__PURE__ */ new Map(),
    ancestorChains: di(n),
    aliasLocates: /* @__PURE__ */ new WeakSet(),
    blockTerms: gi(n)
  };
}
function fi(n) {
  const e = B(nn(n, (i) => i.name === "lang" && te(i) !== void 0)), t = [...he(e)].filter((i) => te(i) !== void 0);
  if (t.length === 0) return n;
  const s = (i) => t.includes(i) && i.name === "lang";
  for (const i of t) s(i) || Ts(i, "xml:lang", void 0);
  return Se(Us(e, s));
}
function gn(n, e) {
  return n === void 0 ? void 0 : ra(e, n) ?? n;
}
function J(n, e) {
  return gn(e.language === "none" ? e.contentLanguage : n ?? e.contentLanguage, e.languageOverrides);
}
function fn(n, e) {
  return n === e || n !== void 0 && e !== void 0 && n.toLowerCase() === e.toLowerCase();
}
function Gt(n, e) {
  return O(n)[0] === O(e)[0];
}
function qt(n, e, t, s) {
  const { language: i } = e;
  return i === void 0 ? !0 : vi(e, t) ? yi(e) ? (n.wordless = i, !0) : !s && n.content !== void 0 && !Gt(n.content, i) ? !1 : (n.entry = i, !0) : n.content !== void 0 && !fn(n.content, i) || !s && n.entry !== void 0 && !Gt(i, n.entry) ? !1 : (n.content = i, !0);
}
function pi(n, e, t) {
  const s = {};
  for (const i of n)
    if (!qt(s, i, e, t)) return null;
  return s.content ?? s.entry ?? s.wordless;
}
function mi(n, e) {
  return pi(n, e, !1);
}
function vi(n, e) {
  return !!n.synthetic && fn(n.language, e.contextualizationLanguage);
}
function yi(n) {
  return !/[\p{L}\p{N}]/u.test(n.plain ?? Yt(n.ssml ?? ""));
}
function Si(n, e) {
  return pi(n, e, e.format === "ssml");
}
function bi(n, e, t) {
  const s = n.ssml ?? "", i = n.enclosingLanguage ?? e;
  return !i || !n.language || !vi(n, t) || yi(n) || Gt(n.language, i) ? s : `<lang xml:lang="${Me(n.language)}">${s}</lang>`;
}
function wi(n, e) {
  const t = e.format === "ssml", s = [];
  let i = 0, a = {};
  return n.forEach((r, o) => {
    qt(a, r, e, t) || (s.push([i, o]), i = o, a = {}, qt(a, r, e, t));
  }), n.length > 0 && s.push([i, n.length]), s;
}
function ki(n, e) {
  const t = B(n);
  let s = !1;
  for (const i of he(t)) {
    const a = te(i), r = gn(a, e);
    r === void 0 || r === a || (Ts(i, "xml:lang", r), s = !0);
  }
  return s ? Se(t) : n;
}
function No(n) {
  const e = {};
  return n.plain !== void 0 && (e.plain = n.plain), n.ssml !== void 0 && (e.ssml = n.ssml), n.language !== void 0 && (e.language = n.language), n.locate !== void 0 && (e.locate = n.locate), e;
}
function Kn(n, e) {
  for (const t of n) t.tags && (t.tags.around = [...e, ...t.tags.around]);
}
function Ei(n) {
  const { tags: e } = n;
  return (e ? en(e.open) : "") + (n.ssml ?? "") + (e ? Ye(e.close) : "");
}
function pn(n) {
  !n.tags || n.ssml === void 0 || (n.ssml = Ei(n), delete n.tags);
}
function zo(n, e) {
  return e.length === 1 && Ba(e) && n.endsWith(e);
}
function Mo(n, e, t) {
  const s = t === "spaced" || t === void 0 && !ut(e) && !ja(n) && !Is(n, e);
  return !!n && s && !/\s$/.test(n) && !/^\s/.test(e);
}
function je(n, e = []) {
  let t = "";
  const s = [];
  return n.forEach((i, a) => {
    if (zo(t, i)) {
      s.push({ start: t.length, end: t.length });
      return;
    }
    Mo(t, i, e[a]) && (t += " ");
    const r = t.length;
    t += i, s.push({ start: r, end: t.length });
  }), { joined: t, ranges: s };
}
function jo(n, e, t) {
  const s = n.length ? e.around.indexOf(n[0]) : -1;
  let i = 0;
  if (s !== -1) for (; i < n.length && s + i < e.around.length && n[i] === e.around[s + i]; ) i++;
  return [...n.slice(0, i), ...t];
}
function Ht(n, e, t, s) {
  let i = "", a = "", r = [];
  return n.forEach((o, l) => {
    const c = s[l];
    c.start > (s[l - 1]?.end ?? 0) && (a += " ");
    const u = (t[l] && c.start === c.end ? Wa(e[l]) : void 0) ?? e[l], { tags: h } = o;
    if (!h) {
      a += u;
      return;
    }
    const d = jo(r, h, h.open), g = mt(r, d).length;
    i += Ye(r.slice(g)) + a + en(d.slice(g)) + u, a = "", r = [...d.slice(0, d.length - h.open.length), ...h.close];
  }), i + Ye(r) + a;
}
function ge(n) {
  const e = St(Ue(n));
  return e ? e.plain ?? (e.ssml ? $(e.ssml) : "") : "";
}
const Wn = (n) => n.replace(/\s+/g, " ").trim();
function Ci(n) {
  const e = bt(n);
  if (!(e === void 0 || !U(n).includes("table")))
    return n.children?.find((t) => U(t).includes("caption") && Wn(ge(t)) === Wn(e));
}
function Ri(n) {
  return !!n.children?.length || Ue(n)?.ssml !== void 0;
}
function Bo(n) {
  const e = Ci(n);
  return e && !Ri(e) ? e : void 0;
}
function Ii(n) {
  const e = Ci(n);
  return e && Ri(e) ? void 0 : bt(n);
}
function Do(n) {
  const e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map();
  let s = 0, i;
  return n.forEach((a, r) => {
    e.set(a, r + 1);
    const o = a.children ?? [];
    if (s = Math.max(s, o.length), o.some((l) => l.role?.has("columnheader"))) {
      i = o.map(ge);
      return;
    }
    i && o.forEach((l, c) => {
      if (!l.role?.has("cell") && !l.role?.has("rowheader")) return;
      const u = i[c];
      u && t.set(l, u);
    });
  }), { lines: n.length, columns: s, rowNumbers: e, cellHeaders: t };
}
const Pi = -1, Ai = -2, oe = (n) => "map" in n;
function mn(n, e) {
  return (n.spans ?? []).map((s) => oe(s) || s.length !== void 0 ? s : { ...s, length: H(n, e).length });
}
function fe(n, e) {
  e.length > 0 && (n.spans = e);
}
function Fo(n, e, t, s) {
  fe(n, [{ node: e, at: 0, alias: s, ...t }]);
}
function _o(n, e, t, s) {
  const i = { node: e, ownText: t, at: s, map: Array.from({ length: t.length }, (a, r) => r) };
  t !== ge(e) && (i.quotedOnly = !0), fe(n, [i]);
}
const $o = (n) => oe(n) ? n.map.length : n.length;
function vn(n, e, t) {
  const s = [];
  for (const i of n) {
    const a = i.at + $o(i);
    if (a <= e || i.at >= t) continue;
    if (!oe(i)) {
      s.push({ ...i, at: i.at - e });
      continue;
    }
    const r = Math.max(i.at, e), o = i.map.slice(r - i.at, Math.min(a, t) - i.at);
    o.some((l) => l >= 0) && s.push({ ...i, at: r - e, map: o });
  }
  return s;
}
function xi(n, e, t) {
  return n.flatMap(
    (s, i) => vn(mn(s, t), 0, e[i].end - e[i].start).map((a) => ({ ...a, at: a.at + e[i].start }))
  );
}
const Qn = (n) => /\s/.test(n), Go = (n) => /[\p{Ps}\p{Pe}\p{Pi}\p{Pf}"']/u.test(n);
function Oi(n) {
  const e = ge(n);
  let t = 0, s = [];
  const i = (a, r) => {
    const o = new Array(a.length);
    let l = r, c = -1;
    for (let u = 0; u < a.length; u++) {
      if (Qn(a[u])) {
        o[u] = Pi;
        continue;
      }
      for (; l < e.length && Qn(e[l]); ) l++;
      if (e[l] === a[u])
        o[u] = l, c = ++l;
      else if (Go(a[u])) o[u] = Ai;
      else return;
    }
    return c === -1 ? void 0 : { map: o, end: c };
  };
  return {
    embed(a) {
      s.push(a);
    },
    place(a) {
      const r = [t];
      for (const o of s) {
        const l = i(o, r[r.length - 1]);
        l && r.push(l.end);
      }
      s = [];
      for (let o = r.length - 1; o >= 0; o--) {
        const l = i(a, r[o]);
        if (l)
          return t = l.end, { node: n, ownText: e, at: 0, map: l.map };
      }
    }
  };
}
function Jn(n) {
  let e = 1 / 0, t = -1;
  for (const s of n)
    if (!(!s || !oe(s)))
      for (const i of s.map)
        i < 0 || (i < e && (e = i), i + 1 > t && (t = i + 1));
  return t === -1 ? void 0 : { start: e, end: t };
}
function Zn(n, e, t) {
  const s = Oi(e);
  for (const i of n) {
    const a = s.place(H(i, t));
    a && fe(i, [a]);
  }
}
function qo(n) {
  if (n.ownText === "") return [{ start: 0, end: 0 }];
  const e = [];
  let t = -1;
  return n.map.forEach((s, i) => {
    if (s < 0) return;
    const a = e[e.length - 1];
    a && n.ownText.slice(a.end, s).trim() === "" && n.map.slice(t + 1, i).every((o) => o === Pi) ? a.end = s + 1 : e.push({ start: s, end: s + 1 }), t = i;
  }), e;
}
function Ho(n, e, t, s, i) {
  if (i && e === 0 && t === n.ownText.length && s.own && !n.quotedOnly) return s.ref;
  const a = Be(s.ref, n.ownText.slice(e, t));
  return e > 0 && (a.text = { ...a.text, before: n.ownText.slice(0, e) }), t < n.ownText.length && (a.text = { ...a.text, after: n.ownText.slice(t) }), a;
}
function Ko(n, e) {
  const t = mn(n, e).flatMap((a) => {
    const r = j(a.node, e.ancestorChains);
    return r ? oe(a) ? qo(a).map((o) => ({ span: a, nodeRef: r, ...o })) : [{ span: a, nodeRef: r, start: a.start, end: a.end }] : [];
  }), s = t.length === 1 ? t[0].span : void 0, i = !!s && oe(s) && s.at === 0 && s.map.length === H(n, e).length && !s.map.includes(Ai);
  return t.map(({ span: a, nodeRef: r, start: o, end: l }) => {
    if (!oe(a)) {
      const u = { start: o, end: l, locate: a.alias };
      return Xr(u, a.length), u;
    }
    const c = ue(a.node) ? ke(a.node, e) : void 0;
    return { start: o, end: l, locate: c ?? Ho(a, o, l, r, i) };
  });
}
function ce(n, e) {
  let t = 0;
  for (; t < n.length - 1 && n[t + 1].start <= e; ) t++;
  return t;
}
function ke(n, e) {
  const t = na(n), s = j(n, e.ancestorChains)?.ref;
  if (t) {
    const i = { cssSelector: t };
    return s?.href !== void 0 && (i.href = s.href), _t(i);
  }
  return s && _t(s);
}
function Xn(n, e, t) {
  if (n.edgeLocates) return n.edgeLocates[e];
  const { source: s } = n;
  if (!(!s || Array.isArray(s) || !ue(s)))
    return ke(s, t);
}
function Wo(n, e) {
  const t = n.map((o) => {
    if (o.locate) return o.locate;
    if (o.synthetic) return;
    const { source: l } = o;
    if (!l || Array.isArray(l)) return;
    const c = H(o, e);
    if (c)
      return ue(l) ? j(l, e.ancestorChains) && ke(l, e) : rt(j(l, e.ancestorChains), c);
  }), s = t.findIndex((o) => o !== void 0);
  if (s === -1) return;
  let i = t.length - 1;
  for (; t[i] === void 0; ) i--;
  if (s === i) return t[s];
  const a = n[s].source, r = n[i].source;
  if (a && r && !Array.isArray(a) && !Array.isArray(r)) {
    const o = j(a, e.ancestorChains), l = j(r, e.ancestorChains);
    return bn(o, l, t[s]);
  }
  return t[s];
}
function yn(n, e) {
  const t = n.filter((d) => e.format === "ssml" ? d.ssml : d.plain);
  if (t.length === 0) return;
  const s = Si(t, e);
  if (s === null) return;
  const i = t.map((d) => H(d, e)), { joined: a, ranges: r } = je(i, t.map((d) => d.spacing)), o = e.format === "ssml" ? Ht(t, t.map((d) => bi(d, s, e)), i, r) : a, l = e.format === "ssml" ? { ssml: o } : { plain: o };
  s && (l.language = s), n.some((d) => d.synthetic) && (l.synthetic = !0), fe(l, xi(t, r, e));
  const c = Wo(t, e);
  c && (l.locate = c);
  const u = Xn(t[0], "leading", e), h = Xn(t[t.length - 1], "trailing", e);
  return (u || h) && (l.edgeLocates = { leading: u, trailing: h }), l;
}
function Sn(n, e, t, s, i) {
  if (t === "plain" && s !== "block-level" && s !== "none" && e.ssml && Zs(e.ssml)) {
    const o = dn(e.ssml, e.language).map((l) => {
      const c = { plain: l.plain }, u = J(l.language, i);
      return u && (c.language = u), c;
    });
    return Zn(o, n, i), o;
  }
  const a = {}, r = J(e.language, i);
  return r && (a.language = r), t === "ssml" ? a.ssml = e.ssml ? ki(e.ssml, i.languageOverrides) : le(e.plain ?? "") : a.plain = e.plain ?? $(e.ssml ?? ""), (s === "block-level" || s === "none") && a.ssml && (a.ssml = fi(a.ssml)), Zn([a], n, i), [a];
}
function kt(n, e) {
  return e === "ssml" ? Ms(n) : n;
}
function H(n, e) {
  return kt(e.format === "ssml" ? Ei(n) : n.plain ?? "", e.format);
}
function Be(n, e) {
  const t = n.cssSelector ?? n.domRange?.start.cssSelector;
  if (!t) return { ...n, text: { highlight: e } };
  const s = { cssSelector: t, text: { highlight: e } };
  return n.href !== void 0 && (s.href = n.href), s;
}
function j(n, e) {
  const t = An(n);
  if (t) return { own: !0, ref: t };
  for (const s of e.get(n) ?? []) {
    const i = An(s);
    if (i) return { own: !1, ref: i };
  }
}
function rt(n, e) {
  if (n)
    return n.own ? n.ref : Be(n.ref, e);
}
function bn(n, e, t) {
  return (n && e ? sa(n.ref, e.ref) : void 0) ?? t;
}
function Qo(n, e) {
  const { ancestorChains: t } = e;
  return n.map((s) => {
    const i = Ko(s, e), a = No(s);
    if (i.length > 0 && (a.offsets = i), s.locate) return a;
    const { source: r } = s, o = s.plain ?? kt(s.ssml ?? "", "ssml");
    if (Array.isArray(r)) {
      const [h, d] = r, g = j(h, t), m = j(d, t), S = bn(g, m, rt(g, o));
      return S ? { ...a, locate: S } : a;
    }
    const l = r ? j(r, t) : void 0;
    if (!l) return a;
    if (s.synthetic) return { ...a, locate: l.ref };
    if (i.length === 1) return { ...a, locate: i[0].locate };
    const c = r && ue(r) ? ke(r, e) : void 0, u = i.length > 0 ? Be(l.ref, o) : rt(l, o);
    return { ...a, locate: c ?? u };
  });
}
function Li(n, e) {
  const t = e.format === "ssml" ? { ssml: le(n) } : { plain: n };
  return t.synthetic = !0, t;
}
function q(n, e) {
  const t = Li(n, e), s = e.language === "none" ? J(void 0, e) : e.contextualizationLanguage;
  return s && (t.language = s), t;
}
function Kt(n, e, t) {
  const s = Li(n, t), i = J(ii(e), t);
  return i && (s.language = i), s;
}
function M(n, e, t) {
  for (const s of t) s.source = e;
  n.push(...t);
}
function wn(n, e, t, s) {
  s ? (t.some((i) => i.blockStart) && (s.blockStart = !0), M(n, t[0]?.source ?? e, [s])) : n.push(...t);
}
function kn(n, e, t, s) {
  for (const [i, a] of wi(s, e)) {
    const r = s.slice(i, a), o = r.length > 1 ? yn(r, e) : void 0;
    o || r.forEach(pn), wn(n, t, r, o);
  }
}
function Z(n, e, t, s) {
  const i = t ? `${e}.${t}` : void 0;
  if (i && n.i18n.exists(i)) return n.i18n.t(i, s);
  if (n.i18n.exists(e)) return n.i18n.t(e, s);
}
function En(n, e) {
  return ui.has(n) ? !0 : e.contextualize.has(n);
}
function Vi(n, e, t) {
  return e.some((s) => {
    const i = Eo[s];
    return i?.drops.includes(n) ? i.unconditional || En(s, t) : !1;
  });
}
function Ne(n, e, t, s, i) {
  if (e === void 0 || e < 0) return;
  const a = j(s, i.ancestorChains);
  a && (_o(n, s, t, e), n.locate = a.own ? a.ref : Be(a.ref, t));
}
function Pt(n, e, t, s, i, a) {
  const r = a?.value;
  if (r !== void 0 && r === ge(t)) {
    const l = J(we(t.text)?.language, s);
    l && (n.language = l), delete n.synthetic, Ne(n, es(s, e, a, "value"), r, t, s);
    return;
  }
  const o = a?.description;
  o !== void 0 && o === bt(t) && (i === "figure" || i === "table") && Ne(n, es(s, e, a, "description"), o, t, s);
}
function Yn(n, e, t, s, i, a, r) {
  if (!En(s, t)) return;
  if ((t.i18n.exists(`${s}.block.start`) || t.i18n.exists(`${s}.block.end`)) && t.contextualizationShapes[s] !== "inline") {
    const l = i === "before" ? `${s}.block.start` : `${s}.block.end`;
    M(n, e, ts(l, a, r, e, s, t));
    return;
  }
  i === "before" && M(n, e, ts(`${s}.inline`, a, r, e, s, t));
}
const ot = "\0";
function es(n, e, t, s) {
  const i = Z(n, e.base, e.variantKey, { ...t, [s]: ot })?.indexOf(ot);
  return i === void 0 || i === -1 ? void 0 : i;
}
function ts(n, e, t, s, i, a) {
  const r = Z(a, n, e, t);
  if (!r) return [];
  const o = t?.description, l = a.language !== "none" && o !== void 0 && o === bt(s) ? J(ii(s), a) : void 0, c = l ? Z(a, n, e, { ...t, description: ot })?.split(ot) : void 0;
  if (!l || !c || c.length < 2) {
    const d = q(r, a);
    return Pt(d, { base: n, variantKey: e }, s, a, i, t), [d];
  }
  if (O(l)[0] === O(a.contextualizationLanguage)[0]) {
    const d = q(r, a);
    return d.language = l, Pt(d, { base: n, variantKey: e }, s, a, i, t), [d];
  }
  const u = `<lang xml:lang="${Me(l)}">${le(o)}</lang>`, h = c.map((d) => le(d)).join(u);
  if (a.format === "ssml") {
    const d = q(r, a);
    return d.ssml = h, Pt(d, { base: n, variantKey: e }, s, a, i, t), [d];
  }
  return dn(h, a.contextualizationLanguage).map((d) => {
    if (d.language !== l) return q(d.plain, a);
    const g = Kt(d.plain, s, a);
    return (i === "figure" || i === "table") && Ne(g, d.plain.indexOf(o), o, s, a), g;
  });
}
function ns(n, e, t, s) {
  const i = `${e}.parts.${t}`;
  return n.i18n.exists(i, { count: s }) ? n.i18n.t(i, { count: s }) : String(s);
}
function Jo(n) {
  const e = Ii(n);
  return e === void 0 ? { variantKey: "unlabelled" } : { variantKey: "labelled", params: { description: e } };
}
function ss(n, e) {
  const t = e.tableCellHeaders.get(n);
  return {
    variantKey: t !== void 0 ? "withHeader" : "withoutHeader",
    params: { header: t ?? "", value: ge(n) }
  };
}
const Zo = {
  table: (n, e) => {
    const t = (n.children ?? []).filter((i) => i.role?.has("row")), s = Do(t);
    for (const [i, a] of s.rowNumbers) e.tableRowNumbers.set(i, a);
    for (const [i, a] of s.cellHeaders) e.tableCellHeaders.set(i, a);
    return {
      params: {
        lines: ns(e, "table", "lines", s.lines),
        columns: ns(e, "table", "columns", s.columns)
      }
    };
  },
  row: (n, e) => ({ params: { count: String(e.tableRowNumbers.get(n) ?? "") } }),
  cell: ss,
  rowheader: ss
};
function is(n, e, t) {
  const s = Jo(e);
  let i = s.variantKey, a = s.params;
  const r = Zo[n]?.(e, t);
  r && (r.variantKey && (i = r.variantKey), a = { ...a, ...r.params });
  const o = t.contextualizationParams?.(n, e);
  return o && (a = { ...a, ...o }), { variantKey: i, params: a };
}
const as = "[\\u0391-\\u03A9\\u03B1-\\u03C9\\u03D8-\\u03E1]", Xo = "[\\u0374\\u02B9\\u0384']", At = "[\\u05D0-\\u05EA]", rs = "[\\u0400-\\u0481\\u048A-\\u04FF]", Yo = [
  new RegExp("^\\p{Nd}+$", "u"),
  new RegExp("^\\p{Nl}+$", "u"),
  /^(?=[MDCLXVI])M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i,
  /^[〇零一二三四五六七八九十百千万]+$/u,
  /^[፩-፼]+$/u,
  new RegExp(`^${At}[\\u05F3']$`, "u"),
  new RegExp(`^${At}+[\\u05F4"]${At}$`, "u"),
  new RegExp(`^(?:\\u0375${as})*${as}+${Xo}$`, "u"),
  /^(?:[Ա-Ֆա-և]̅)+$/u,
  new RegExp(`^\\u0482?${rs}+\\u0483${rs}*$`, "u")
];
function el(n) {
  const e = n.trim();
  return e.length > 0 && Yo.some((t) => t.test(e));
}
const tl = new Set(ko);
function lt(n, e) {
  return e.blockTerms.has(n) || U(n).some((t) => tl.has(t));
}
function Ti(n, e) {
  return Array.isArray(n) ? n[e === "leading" ? 0 : 1] : n;
}
function ct(n, e, t) {
  if (!n) return;
  const s = Ti(n, e);
  return [s, ...t.ancestorChains.get(s) ?? []].find((i) => lt(i, t));
}
function ne(n) {
  return n.placement?.kind === "alias";
}
async function Ui(n, e, t, s, i, a, r) {
  return Wt(await Ni(n, e, i, a, r), n, t, s);
}
async function Ni(n, e, t, s, i) {
  const a = [], r = [];
  e.forEach((c, u) => {
    const h = ne(n[u]) ? n[u].placement.abbreviation : c;
    h && (a.push(u), r.push(h));
  });
  const { joined: o, ranges: l } = je(r, a.map((c) => n[c].spacing));
  return { boundaries: await i.segmenter(t, o, s), textRanges: l, included: a };
}
function Wt({ boundaries: n, textRanges: e, included: t }, s, i, a, r) {
  const o = (u, h) => {
    let d = ce(e, u);
    h && d > 0 && u === e[d].start && d--;
    const g = t[d], m = u - e[d].start, S = e[d].end - e[d].start;
    if (m === 0 || m < S && !ne(s[g])) return a[g].start + m;
    if (m > S && !h) return d + 1 < t.length ? a[t[d + 1]].start : i.length;
    let f = g;
    for (; f + 1 < s.length && !t.includes(f + 1); ) f++;
    return a[f].end;
  }, l = (u) => {
    const h = ce(e, u), d = u - e[h].start;
    return ne(s[t[h]]) && d > 0 && d < e[h].end - e[h].start;
  }, c = [];
  for (const u of n) {
    const h = o(u.start, !1), d = Math.max(h, o(u.contentEnd, !0)), g = Math.max(d, o(u.end, !1)), m = c[c.length - 1];
    m && l(u.start) ? (m.contentEnd = Math.max(m.contentEnd, d), m.end = Math.max(m.end, g), m.text = i.slice(m.start, m.contentEnd)) : c.push({ text: i.slice(h, d), start: h, end: g, contentEnd: d });
  }
  return c;
}
const Qt = new RegExp("\\p{Sentence_Terminal}$", "u"), nl = /^[\s\p{Pe}\p{Pf}\p{Pi}"']*$/u;
function sl(n) {
  return Qt.test(n);
}
function Cn(n, e, t, s, i) {
  let a = !1;
  return n.forEach((r, o) => {
    if (!ne(r)) return;
    const l = r.placement.abbreviation?.match(Qt)?.[0];
    if (!l) return;
    const { start: c, end: u } = t[o];
    s.some((h) => h.start < u && h.contentEnd >= u && nl.test(e.slice(u, h.contentEnd))) && (Qt.test(e.slice(c, u)) || (r.plain !== void 0 && (r.plain += l), r.ssml !== void 0 && (r.ssml += l), a = !0));
  }), a;
}
function il(n, e) {
  const t = H(n, e), s = { start: 0, end: t.length };
  Cn([n], t, [s], [{ text: t, ...s, contentEnd: t.length }]);
}
async function al(n, e) {
  const t = [];
  let s = 0;
  for (; s < n.length; ) {
    const i = n[s].placement?.node;
    if (!i) {
      t.push(n[s]), s++;
      continue;
    }
    let a = s;
    for (; a + 1 < n.length && n[a + 1].placement?.node === i; ) a++;
    const r = n.slice(s, a + 1), o = mi(r, e), l = (o === null ? r[0].language : o) ?? "en", c = ct(i, "trailing", e), u = a + 1 < n.length && c && ct(n[a + 1].source, "leading", e) === c ? [...r, n[a + 1]] : r, h = u.map((S) => H(S, e)), { joined: d, ranges: g } = je(h, u.map((S) => S.spacing)), m = await Ui(u, h, d, g, l, wt(l, e), e);
    Cn(r, d, g, m), kn(t, e, i, r), s = a + 1;
  }
  return t;
}
function os(n, e) {
  return e.skip.size > 0 && n.some((t) => e.skip.has(t) && !Oe.has(t) && !Vi(t, n, e));
}
function Rn(n, e) {
  const t = n.find((s) => Oe.has(s));
  return t === void 0 ? void 0 : e.interruptions[t] ?? "after";
}
function rl(n, e) {
  const t = St(we(n.text));
  if (!t) return [];
  const s = t.plain ?? $(t.ssml ?? "");
  if (el(s)) {
    const i = Z(e, "pagebreak.number", void 0, { number: s.trim() });
    if (i !== void 0) return [q(i, e)];
  }
  return Sn(n, t, e.format, e.language, e);
}
function ls(n) {
  n.plain !== void 0 && (n.plain += "."), n.ssml !== void 0 && (n.ssml += ".");
}
function ol(n, e) {
  const t = rl(n, e);
  if (!e.contextualize.has("pagebreak")) return t;
  const s = e.i18n.exists("pagebreak.block.start") ? "pagebreak.block.start" : "pagebreak.inline", i = Z(e, s);
  if (i === void 0) return t;
  const a = q(i, e);
  if (t.length === 0) return [a];
  for (const o of t) o.source = n;
  const r = yn([a, ...t], e);
  return r ? (ls(r), [r]) : (ls(t[t.length - 1]), [a, ...t]);
}
function ll(n, e) {
  const t = St(Ue(n));
  return t ? Sn(n, t, e.format, e.language, e) : [];
}
const xt = "", He = "";
function In(n) {
  return U(n).includes("term") || (n.children ?? []).some(In);
}
const Jt = /* @__PURE__ */ new Set();
function zi(n) {
  return In(n) ? [n, ...(n.children ?? []).flatMap(zi)] : [];
}
function Mi(n, e, t, s, i, a) {
  if (e.length === 0) return;
  const r = U(n).find((f) => Y.has(f)), o = e.length > 1 ? e.find(In) : void 0, l = e.filter((f) => f !== o), c = r && s.contextualize.has(r) ? Z(s, `${r}.inline`) : void 0, u = r && a && o ? Z(s, `${r}.term`, void 0, { term: xt, value: He }) : void 0, h = a ? e : l;
  if (c === void 0 && !u) {
    ee(h, t, s, i);
    return;
  }
  const d = lt(h[0], s) && !i, g = [];
  c !== void 0 && M(g, n, [q(c, s)]);
  const m = i || d, S = [...h, ...o ? zi(o) : []];
  S.forEach((f) => Jt.add(f));
  for (const f of (u ?? He).split(new RegExp(`(${xt}|${He})`)))
    f === xt ? ee([o], g, s, m) : f === He ? ee(l, g, s, m) : f && M(g, n, [q(f, s)]);
  S.forEach((f) => Jt.delete(f)), d && g.length > 0 && (g[0].blockStart = !0), kn(t, s, n, g);
}
function ji(n, e, t, s) {
  n.forEach((i, a) => {
    const r = a === 0 ? s : !1;
    "ref" in i ? Mi(i.ref, i.targets, e, t, r, !0) : ze(i.node, e, t, r);
  });
}
function Qe(n, e) {
  const t = Rn(U(n), e);
  return t !== void 0 && t !== "inline";
}
function cl(n, e, t, s, i) {
  const a = j(s, i.ancestorChains);
  if (!a) return;
  const r = _t(Be(a.ref, e));
  i.aliasLocates.add(r);
  for (const o of n)
    o.locate = r, Fo(o, s, t, r), o.edgeLocates = { leading: r, trailing: r };
}
function ul(n, e, t, s, i, a) {
  const r = we(n.text)?.language, o = J(r, s), l = new Map((n.children ?? []).map((p) => [p.id, p])), c = [], u = [], h = /* @__PURE__ */ new Set(), d = /* @__PURE__ */ new Set(), g = /* @__PURE__ */ new Map(), m = /* @__PURE__ */ new Set(), S = s.segmentation === "sentence", f = s.interruptions.abbreviation === "never", k = s.interruptions.abbreviation === "inline", b = Oi(n);
  let A;
  const y = (p, C) => {
    if (p.abbreviation === "alias") return;
    const T = c.slice(C).map((N) => {
      const x = b.place(H(N, s));
      return x && fe(N, [x]), x;
    });
    p.abbreviation === "text" && (A = Jn(T));
  }, v = (p, C) => {
    if (p.abbreviation !== "alias") return;
    const T = c.slice(C), N = $(p.abbreviationText), x = k ? Jn([b.place(N)]) : A;
    x && cl(T, N, x, n, s);
    const L = k ? N : void 0;
    T.forEach((R, Fe) => g.set(R, Fe === 0 ? L : void 0));
  }, E = (p, C) => {
    const T = !k && g.has(c[C - 1]);
    p.touchesPrevious && C > 0 && c.length > C && !T && (c[C].spacing = "touching");
  }, w = (p) => {
    p.spacing !== "touching" && (p.spacing = "spaced");
  }, I = /* @__PURE__ */ new Map();
  for (const { placeholderId: p } of Ft(e)) {
    const C = p === void 0 ? void 0 : l.get(p);
    if (!C || Qe(C, s) || !U(C).some((N) => Oe.has(N))) continue;
    const T = [];
    ze(C, T, s, i), I.set(p, T);
  }
  const z = (p) => {
    const C = l.get(p);
    return I.get(p)?.length === 0 ? !0 : C !== void 0 && Qe(C, s) && !U(C).some((T) => Y.has(T));
  };
  let D;
  const pe = (p) => {
    const C = c[p];
    !D || !C || (D.spaceAcross ? w(C) : D.touching && (C.spacing = "touching"), D = void 0);
  }, Ee = Ys(e, z, r), { spaced: X } = Ee;
  let K = Ee.ssml;
  s.format === "ssml" && (K = ki(K, s.languageOverrides), (s.language === "block-level" || s.language === "none") && (K = fi(K)));
  const Pn = Qr(K, r);
  for (let p of Ft(K)) {
    if (p.abbreviation && (p.abbreviation === "text" ? k : f)) continue;
    if (p.abbreviation === "alias" && !k && (p = { ...p, ssml: p.parenthesizedSsml, touchesPrevious: !1 }), p.placeholderId !== void 0) {
      const x = l.get(p.placeholderId);
      if (!x) continue;
      if (U(x).some((L) => Oe.has(L) && !Y.has(L)) || b.embed(ge(x)), z(p.placeholderId) ? D = { spaceAcross: X.has(p.placeholderId) } : D = void 0, Qe(x, s)) {
        const L = U(x), R = L.some((_e) => Y.has(_e));
        R && M(c, x, ll(x, s));
        const Fe = R ? Rn(L, s) === "never" || !x.children?.length ? [] : [{ ref: x, targets: x.children }] : [{ node: x }];
        for (const _e of Fe)
          if (u.push(_e), S) {
            const qi = c.length;
            ji([_e], c, s, u.length === 1 && (i || a)), c.slice(qi).forEach((Hi) => d.add(Hi));
          }
      } else {
        const L = c.length;
        if (U(x).some((R) => Oe.has(R))) {
          if (c.push(...I.get(p.placeholderId).map((R) => ({ ...R, tags: R.tags && { ...R.tags } }))), c.slice(L).forEach((R) => h.add(R)), p.language && c.slice(L).forEach((R) => R.enclosingLanguage = p.language), Kn(c.slice(L), p.open), c.length > L) {
            const R = Pn.has(p.placeholderId);
            /\s$/.test(p.textBefore) || !R && new RegExp("\\S\\p{Pi}$", "u").test(p.textBefore) ? w(c[L]) : R && (c[L].spacing = "touching"), D = { spaceAcross: /^\s/.test(p.textAfter) && Jr(p.textAfter.trimStart(), r), touching: R };
          }
        } else
          ze(x, c, s, i, u), Kn(c.slice(L), p.open), c.slice(L).forEach((R) => R.placement && m.add(R)), c.length > L && (/\s$/.test(p.textBefore) && w(c[L]), D = { spaceAcross: /^\s/.test(p.textAfter) });
      }
      continue;
    }
    if (!p.ssml) continue;
    const C = c.length, T = en(p.open ?? []) + p.ssml + Ye(p.close ?? []);
    if (s.format === "plain" && s.language !== "block-level" && s.language !== "none" && Zs(T)) {
      for (const x of dn(T, r)) {
        const L = { plain: x.plain }, R = J(x.language, s);
        R && (L.language = R), M(c, n, [L]);
      }
      y(p, C), pe(C), v(p, C), E(p, C);
      continue;
    }
    const N = {};
    o && (N.language = o), s.format === "ssml" ? (N.ssml = p.ssml, (p.open?.length || p.close?.length) && (N.tags = { open: p.open, close: p.close, around: [] })) : N.plain = $(T), M(c, n, [N]), y(p, C), pe(C), v(p, C), E(p, C);
  }
  const Ce = !S && (m.size > 0 || c.some((p) => sl(g.get(p) ?? "")));
  return S && u.length + h.size + g.size + m.size > 0 || Ce ? (c.forEach((p) => {
    const C = h.has(p) ? { kind: "inline" } : d.has(p) ? { kind: "after" } : g.has(p) ? { kind: "alias", abbreviation: g.get(p) } : m.has(p) ? p.placement : void 0;
    p.placement = { ...C, node: n };
  }), wn(t, n, c, void 0), S ? [] : u) : (kn(t, s, n, c), u);
}
function ze(n, e, t, s, i, a = !1) {
  const r = U(n), o = Ii(n), l = Rn(r, t) === "never", c = l && r.some((f) => Y.has(f));
  if (os(r, t) || l && !c) return;
  const u = lt(n, t), h = u && !s, d = e.length, g = Jt.has(n) ? [] : r.filter(
    (f) => f !== "footnote" && f !== "pagebreak" && !Y.has(f) && !Vi(f, r, t)
  ), m = r.some((f) => xo.has(f) && t.contextualize.has(f)), S = r.includes("table") && o !== void 0 && !m;
  if (S) {
    const f = Kt(o, n, t);
    Ne(f, 0, o, n, t), M(e, n, [f]);
  }
  for (const f of g) {
    const { variantKey: k, params: b } = is(f, n, t);
    Yn(e, n, t, f, "before", k, b);
  }
  if (r.includes("noteref"))
    for (const f of n.children ?? []) {
      const k = U(f);
      if (!os(k, t))
        if (k.includes("footnote")) {
          const b = t.contextualize.has("footnote"), A = t.i18n.exists("footnote.block.start") || t.i18n.exists("footnote.block.end"), y = lt(f, t) && !s && t.interruptions.noteref !== "inline", v = b ? Z(t, A ? "footnote.block.start" : "footnote.inline") : void 0, E = b && (v !== void 0 || A), w = [];
          v !== void 0 && M(w, f, [q(v, t)]);
          const I = [];
          if (ee([f], I, t, s || y), y && I.length > 0 && (I[0].blockStart = !0), w.push(...I), E && A) {
            const D = Z(t, "footnote.block.end");
            D !== void 0 && M(w, f, [q(D, t)]);
          }
          const z = E && w.length > 1 ? yn(w, t) : void 0;
          wn(e, f, w, z);
        } else
          ee([f], e, t, s);
    }
  else if (!r.some((f) => Oo.has(f))) {
    const f = Ue(n)?.ssml, k = a || r.some((b) => ui.has(b) && En(b, t));
    if (f && _n(f) && !k) {
      const b = ul(n, f, e, t, s, u);
      if (i)
        i.push(...b);
      else if (b.length > 0) {
        const A = s || u && e.length > d;
        ji(b, e, t, A);
      }
    } else if (r.includes("pagebreak")) {
      if (M(e, n, ol(n, t)), n.children) {
        const b = s || u && e.length > d;
        ee(n.children, e, t, b);
      }
    } else {
      const b = k ? void 0 : St(Ue(n));
      if (b && M(e, n, Sn(n, b, t.format, t.language, t)), n.children && !c) {
        const A = s || u && e.length > d;
        if (r.some((y) => Y.has(y)))
          Mi(n, n.children, e, t, A, Qe(n, t));
        else if (k && f && _n(f)) {
          const y = new Set(Ft(f).flatMap((v) => v.placeholderId ?? []));
          n.children.forEach((v, E) => {
            const w = U(v), I = v.id !== void 0 && y.has(v.id) && (w.length === 0 || w.some((z) => Y.has(z)));
            ze(v, e, t, E === 0 ? A : !1, void 0, I);
          });
        } else {
          const y = Bo(n);
          ee(y ? n.children.filter((v) => v !== y) : n.children, e, t, A);
        }
      }
    }
  }
  if (h && e.length > d && (e[d].blockStart = !0), o !== void 0 && !m && !S) {
    const f = Kt(o, n, t);
    r.includes("figure") && Ne(f, 0, o, n, t), M(e, n, [f]);
  }
  for (const f of g) {
    const { variantKey: k, params: b } = is(f, n, t);
    Yn(e, n, t, f, "after", k, b);
  }
}
function ee(n, e, t, s) {
  n.forEach((i, a) => ze(i, e, t, a === 0 ? s : !1));
}
async function Bi(n, e, t, s) {
  const { plain: i, pieces: a } = de(n);
  if (!i) return;
  const r = Di(i, a, await t(e, i, s));
  if (r.length <= 1) return;
  const o = [], l = new tn();
  let c = 0;
  for (const h of a) {
    if (h.kind === "separator") continue;
    if (h.kind === "element") {
      l.node(h.chain, h.node);
      continue;
    }
    let d = h.start;
    const g = h.start + h.text.length;
    for (; d < g; ) {
      const m = r[c], S = Math.min(g, m.end), f = S >= m.end && c < r.length - 1;
      let k = h.text.slice(d - h.start, S - h.start);
      f && (k = k.replace(/[ \t\r\n]+$/, "")), l.text(h.chain, k), d = S, f && (o.push(l.flush()), c++);
    }
  }
  const u = l.flush().replace(/[ \t\r\n]+$/, "");
  return u && o.push(u), o;
}
function Di(n, e, t) {
  const s = /* @__PURE__ */ new Map();
  for (const i of e) {
    if (i.kind !== "text") continue;
    const a = i.chain.find(Vs);
    if (!a) continue;
    const r = i.start + i.text.length, o = s.get(a);
    o ? o.end = r : s.set(a, { start: i.start, end: r });
  }
  return s.size ? oi(n, t, (i, a) => [...s.values()].some((r) => r.start < i.contentEnd && r.end > a.start)) : t;
}
function Fi(n, e) {
  const { plain: t, pieces: s } = de(n);
  return Di(t, s, e);
}
async function hl(n, e) {
  const t = n.language ?? "en", s = wt(t, e), i = e.format === "ssml" ? n.ssml : n.plain;
  if (!i) return;
  const a = await e.segmenter(t, kt(i, e.format), s);
  if (a.length <= 1) return;
  if (e.format !== "ssml") return a.map((l) => ({ text: l.text, start: l.start, end: l.contentEnd }));
  const r = Fi(i, a), o = r.length > 1 ? await Bi(i, t, async () => r) : void 0;
  if (o)
    return r.map((l, c) => ({ text: o[c], start: l.start, end: l.contentEnd }));
}
const cs = /* @__PURE__ */ new Set([
  "cell",
  "rowheader",
  "columnheader",
  "row",
  "table",
  "list",
  "listItem",
  "heading1",
  "heading2",
  "heading3",
  "heading4",
  "heading5",
  "heading6"
]);
function us(n) {
  return n ? U(Array.isArray(n) ? n[1] : n) : [];
}
function hs(n, e, t) {
  const s = Ti(n, e);
  return (t.ancestorChains.get(s) ?? []).filter((i) => U(i).some((a) => a !== "presentation"));
}
function dl(n, e) {
  return n.length === e.length && n.every((t, s) => t === e[s]);
}
function ds(n, e, t) {
  const s = n.edgeLocates?.[e];
  if (s && !t.aliasLocates.has(s)) return !0;
  const { source: i } = n;
  return !!i && !Array.isArray(i) && ue(i);
}
function De(n) {
  return n.placement?.kind === "inline";
}
function gl(n) {
  return n.placement?.kind === "after";
}
function _i(n, e, t) {
  t.push(...n.get(e) ?? []), n.delete(e);
}
function Zt(n, e) {
  const t = n.placement?.node;
  return t !== void 0 && t === e.placement?.node;
}
function fl(n, e, t) {
  const s = t.format === "ssml" ? n.ssml : n.plain, i = t.format === "ssml" ? e.ssml : e.plain;
  if (!s || !i) return !1;
  if (Zt(n, e)) return !0;
  if (!fn(n.language ?? "en", e.language ?? "en") || n.synthetic || e.synthetic) return !1;
  const a = n.source, r = e.source;
  return !(!a || !r || !t.segmentationReconstruct && ct(a, "trailing", t) !== ct(r, "leading", t) || us(a).some((o) => cs.has(o)) || us(r).some((o) => cs.has(o)) || !dl(hs(a, "trailing", t), hs(r, "leading", t)) || ds(n, "trailing", t) || ds(e, "leading", t));
}
async function gs(n, e, t) {
  pn(n);
  const s = n.synthetic || ne(n) ? void 0 : await hl(n, e);
  if (!s) {
    ne(n) && il(n, e), t.push(n);
    return;
  }
  const { source: i } = n, a = Array.isArray(i) ? void 0 : i, r = a ? j(a, e.ancestorChains) : void 0, o = a && ue(a) ? ke(a, e) : void 0, l = n.edgeLocates, c = mn(n, e);
  s.forEach(({ text: u, start: h, end: d }, g) => {
    const m = { [e.format]: u, source: i };
    n.language !== void 0 && (m.language = n.language), n.locate && !r && (m.locate = n.locate), fe(m, vn(c, h, d));
    const S = (g === 0 ? l?.leading : void 0) ?? (g === s.length - 1 ? l?.trailing : void 0) ?? o;
    S && r && (m.locate = S), n.blockStart && g === 0 && (m.blockStart = !0), t.push(m);
  });
}
async function pl(n, e, t, s, i, a, r) {
  return n.some(ne) ? Ui(n, e, t, s, i, a, r) : r.segmenter(i, t, a);
}
async function ml(n, e, t, s) {
  const i = n.map((c) => H(c, e)), { joined: a, ranges: r } = je(i, n.map((c) => c.spacing)), o = await pl(n, i, a, r, t, s, e), l = new Array(n.length - 1).fill(!1);
  for (const c of o) {
    const u = ce(r, c.start), h = c.end > c.start ? ce(r, c.end - 1) : u;
    for (let d = u; d < h; d++) l[d] = !0;
  }
  return l;
}
function vl(n, e) {
  const t = [...e];
  return n.forEach((s, i) => {
    if (!De(s)) return;
    const a = i > 0 && Zt(n[i - 1], s), r = i < n.length - 1 && Zt(s, n[i + 1]);
    a && !t[i - 1] ? t[i - 1] = !0 : r && (t[i] = !0);
  }), t;
}
function yl(n, e, t, s) {
  const i = (a) => De(t[ce(s, a)]);
  return oi(n, e, (a, r) => i(a.contentEnd - 1) || i(r.start));
}
function Sl(n, e, t, s, i, a) {
  const r = xi(n.slice(s, i + 1), e.slice(s, i + 1), a);
  return vn(r, t.start, t.contentEnd);
}
function $i(n, e) {
  const t = mi(n, e);
  return t !== null ? t ?? "en" : n.find((s) => !De(s))?.language ?? n[0].language ?? "en";
}
function bl(n, e, t, s, i) {
  const a = ce(t, n.start), r = n.end > n.start ? ce(t, n.end - 1) : a, o = wi(e.slice(a, r + 1), i);
  return o.map(([l, c], u) => {
    const h = a + l, d = a + c - 1, g = u === o.length - 1, m = u === 0 ? n.start : t[h].start, S = g ? n.contentEnd : t[d].end, f = g ? n.end : t[d + 1].start, k = Si(e.slice(h, d + 1), i) ?? void 0, b = { text: s.slice(m, S), start: m, end: f, contentEnd: S }, A = o.length > 1 && h === d && De(e[h]);
    return { boundary: b, startIdx: h, endIdx: d, language: k, sentenceEnd: g ? n.end : void 0, isolated: A };
  });
}
async function wl(n, e, t, s) {
  const i = n.map((v) => v.source), a = n.map((v) => v.spacing), r = $i(n, e), o = wt(r, e), l = () => {
    const v = n.map((E) => H(E, e));
    return { plainParts: v, ...je(v, a) };
  };
  let { plainParts: c, joined: u, ranges: h } = l(), d;
  if (!n.some(ne)) d = await e.segmenter(r, u, o);
  else {
    const v = await Ni(n, c, r, o, e);
    d = Wt(v, n, u, h), Cn(n, u, h, d) && ({ plainParts: c, joined: u, ranges: h } = l(), d = Wt(v, n, u, h));
  }
  const g = yl(u, d, n, h), m = e.format === "ssml" ? Fi(Ht(n, n.map((v) => v.ssml ?? ""), c, h), g) : g, f = (m.length > 0 ? m : [{ text: u, start: 0, end: u.length, contentEnd: u.length }]).flatMap((v) => bl(v, n, h, u, e));
  let k, b;
  if (e.format === "ssml") {
    const v = /* @__PURE__ */ new Map();
    for (const w of f) for (let I = w.startIdx; I <= w.endIdx; I++) v.set(I, w.language);
    b = Ht(n, n.map((w, I) => bi(w, v.get(I), e)), c, h);
    const E = f.map((w) => w.boundary);
    k = f.length > 1 ? await Bi(b, r, async () => E, o) : void 0;
  }
  const A = new Set(n.filter((v) => v.blockStart)), y = (v, E) => {
    if (v !== void 0)
      for (let w = 0; w < n.length; w++)
        (h[w].end <= v || E === f.length - 1) && _i(s, w, t);
  };
  f.forEach(({ boundary: v, startIdx: E, endIdx: w, language: I, sentenceEnd: z, isolated: D }, pe) => {
    if (D) {
      pn(n[E]), t.push(n[E]), y(z, pe);
      return;
    }
    const Ee = e.format === "ssml" ? k ? k[pe] : b : v.text, X = { [e.format]: Ee }, K = e.language === "none" ? J(void 0, e) : I ?? "en";
    K && (X.language = K), n.slice(E, w + 1).filter((R) => A.delete(R)).length > 0 && (X.blockStart = !0), fe(X, Sl(n, h, v, E, w, e));
    const Ce = [...Array(w - E + 1).keys()].map((R) => E + R).filter((R) => !De(n[R])), p = Ce[0] ?? E, C = Ce[Ce.length - 1] ?? w, T = j(i[p], e.ancestorChains), N = i[p], x = (ue(N) ? ke(N, e) : void 0) ?? rt(T, kt(Ee, e.format)), L = p !== C ? bn(T, j(i[C], e.ancestorChains), x) : x;
    L && (X.locate = L), X.source = p === C ? i[p] : [i[p], i[C]], t.push(X), y(z, pe);
  });
}
async function kl(n, e) {
  if (e.segmentation !== "sentence") return n;
  const t = [];
  let s = 0;
  for (; s < n.length; ) {
    let i = s;
    for (; i + 1 < n.length && fl(n[i], n[i + 1], e); ) i++;
    if (i === s) {
      await gs(n[s], e, t), s = i + 1;
      continue;
    }
    const a = [], r = /* @__PURE__ */ new Map();
    for (let h = s; h <= i; h++)
      if (!gl(n[h]))
        a.push(n[h]);
      else if (a.length === 0)
        t.push(n[h]);
      else {
        const d = a.length - 1;
        r.set(d, [...r.get(d) ?? [], n[h]]);
      }
    if (a.length === 0) {
      s = i + 1;
      continue;
    }
    const o = $i(a, e), l = await ml(a, e, o, wt(o, e)), c = vl(a, l);
    let u = 0;
    for (let h = 0; h < a.length; h++)
      if (!(h < a.length - 1 && c[h])) {
        if (u === h)
          await gs(a[u], e, t), _i(r, u, t);
        else {
          const d = /* @__PURE__ */ new Map();
          for (let g = u; g <= h; g++) r.has(g) && d.set(g - u, r.get(g));
          await wl(a.slice(u, h + 1), e, t, d);
        }
        u = h + 1;
      }
    s = i + 1;
  }
  return t;
}
function El(n, e) {
  return Object.keys(e.substitutions).length === 0 ? n : n.map((t) => {
    if (t.ssml) {
      const { ssml: o, plain: l, map: c } = jr(t.ssml, e.substitutions);
      if (o === t.ssml) return t;
      const u = { ...t, ssml: o };
      return $n(u, { plain: l, map: c }), u;
    }
    const s = t.plain;
    if (!s) return t;
    const { text: i, map: a } = Mr(s, e.substitutions);
    if (i === s) return t;
    const r = { ...t, plain: i };
    return $n(r, { plain: s, map: a }), r;
  });
}
async function jl(n, e = {}) {
  return (await Gi(n, e)).utterances;
}
async function Gi(n, e = {}) {
  const t = [], s = await Uo(n, e);
  ee(n, t, s, !1);
  const i = s.segmentation === "sentence" ? t : await al(t, s), a = await kl(i, s);
  return {
    utterances: El(Qo(a, s), s),
    sources: a.map((r) => r.source),
    blockStarts: a.map((r) => !!r.blockStart)
  };
}
const Pe = (n, e) => Object.entries(n).find(([t]) => V(t) === e)?.[1];
class Cl {
  constructor(e, t, s) {
    this.engine = e, this.preference = t, this.mainLanguages = s;
  }
  engine;
  preference;
  mainLanguages;
  // The engine's voices, as last listed.
  voices = [];
  // The loaded content's languages, in reading order.
  contentLanguages = [];
  voiceIds = /* @__PURE__ */ new Set();
  // Keyed by `${language}:${needsBoundary}`: the voice picked for content in a language, null when it has none.
  picked = /* @__PURE__ */ new Map();
  picking = /* @__PURE__ */ new Map();
  // The engine's latest voice listing: one resolving after a newer one started gives way to it.
  listing = null;
  /**
   * The voice content in `language` is read with: the preferred one for its tag; for `en-US`, the one preferred for
   * `en` if it's an `en-US` voice; for `en` that isn't a main language, that of the content's first `en-*`;
   * else the picked one for its tag, then the preferred and picked ones for its base language.
   */
  voiceFor(e, t = this.picks()) {
    const s = this.availablePreference();
    if (typeof s == "string") return s;
    if (!e) return;
    const i = s ?? {}, a = V(e), r = se(e), o = Pe(i, a);
    if (o) return o;
    const l = this.regionalOf(e);
    if (l) return this.voiceFor(l, t);
    if (a !== r) {
      const c = Pe(i, r), u = c && this.voices.find((h) => F(h) === c);
      if (u && V(u.language) === a) return c;
    }
    return Pe(t, a) ?? Pe(i, r) ?? Pe(t, r);
  }
  // The picks content in their tag is read with, e.g. not an en-US pick when an en-US voice is preferred for en.
  pickedRecord() {
    const e = this.picks(), t = Object.fromEntries(Object.entries(e).filter(([s, i]) => this.voiceFor(s, e) === i));
    return Object.keys(t).length > 0 ? t : null;
  }
  // The voice picked for each main and content language.
  picks() {
    const e = {};
    for (const t of /* @__PURE__ */ new Set([...this.mainLanguages(), ...this.contentLanguages])) {
      const s = this.pickedVoice(t);
      s && (e[this.pickedVoiceKey(t, s)] ??= F(s));
    }
    return e;
  }
  // The preference's voices the engine has, by their ids; an engine listing no voice can't tell, so it's trusted with them.
  availablePreference() {
    const e = this.preference();
    if (typeof e == "string") return this.listedVoiceId(e) ?? null;
    if (!e) return null;
    const t = Object.fromEntries(Object.entries(e).flatMap(([s, i]) => {
      const a = this.listedVoiceId(i);
      return a ? [[s, a]] : [];
    }));
    return Object.keys(t).length > 0 ? t : null;
  }
  setContentLanguages(e) {
    this.contentLanguages = e;
  }
  // The content's languages whose voice is still waiting to be picked.
  unpicked() {
    return this.contentLanguages.filter((e) => this.pickedVoice(this.regionalOf(e) ?? e) === void 0);
  }
  // Lists the engine's voices for the main and content languages, and picks one for each, the main language first.
  async pick() {
    const e = this.mainLanguages(), t = [...new Set([...e, ...this.contentLanguages].map((a) => V(a)).filter(Boolean))];
    let s = this.engine.getAvailableVoices(t, this.preferredVoiceIds());
    this.listing = s;
    let i = await s;
    for (; s !== this.listing; )
      s = this.listing, i = await s;
    (i.length !== this.voices.length || i.some((a) => !this.voiceIds.has(F(a)))) && (this.voices = i, this.voiceIds = new Set(i.map((a) => F(a))), this.picked.clear(), this.picking.clear()), e[0] && await this.pickVoice(e[0]), await Promise.all(t.filter((a) => !this.regionalOf(a)).map((a) => this.pickVoice(a)));
  }
  // The content's region a bare language that isn't a main one is read as, e.g. `en-GB` for `en`; it gets no pick of its own.
  regionalOf(e) {
    const t = V(e), s = se(e), i = this.mainLanguages();
    if (!(t !== s || i.some((a) => V(a) === t)))
      return [...i, ...this.contentLanguages].find((a) => se(a) === s && V(a) !== s);
  }
  // The main language's voice prefers boundary events; the others match its boundary support.
  needsBoundary(e) {
    const [t] = this.mainLanguages();
    if (!t || V(e) === V(t)) return !0;
    const s = this.picked.get(this.pickKey(t, !0)), i = this.voiceFor(t, s ? { [this.pickedVoiceKey(t, s)]: F(s) } : {});
    return this.voices.find((r) => F(r) === i)?.controls?.boundary !== !1;
  }
  pickKey(e, t) {
    return `${V(e)}:${t}`;
  }
  // `undefined` until picked
  pickedVoice(e) {
    return this.picked.get(this.pickKey(e, this.needsBoundary(e)));
  }
  async pickVoice(e) {
    const t = this.needsBoundary(e), s = this.pickKey(e, t);
    if (this.picked.has(s)) return;
    let i = this.picking.get(s);
    if (!i) {
      const a = this.voices;
      i = ws(e, a, t).then((r) => {
        this.voices === a && this.picked.set(s, r);
      }).finally(() => this.picking.delete(s)), this.picking.set(s, i);
    }
    await i;
  }
  // Listed whatever their language, so they're kept rather than taken for another browser's.
  preferredVoiceIds() {
    const e = this.preference();
    return typeof e == "string" ? [e] : e ? Object.values(e) : [];
  }
  // Matched by id, else by name, as engines match a voice.
  listedVoiceId(e) {
    if (this.voices.length === 0) return e;
    const t = this.voices.find((s) => F(s) === e) ?? this.voices.find((s) => s.name === e);
    return t && F(t);
  }
  // A pick is for the language's region only when the voice is of it, else for its base language.
  pickedVoiceKey(e, t) {
    const [s, i] = O(e);
    return i && O(t.language)[1] === i ? e : se(s) === se(e) ? s : e;
  }
}
class Bl {
  engine;
  languages;
  contentQueue = [];
  // `contentQueue` as loaded, before `voice` stamped it — re-stamped when that changes.
  loadedQueue = [];
  events = new ft();
  // Navigator owns the state, not the engine
  navigatorState = "idle";
  // Scheduled by the "end" handler's pauseDuration delay — cleared on
  // stop()/pause()/destroy() so a stale delayed speak() can't fire after
  // playback was told to stop or pause.
  pendingAdvanceTimeout = null;
  // Preferences API (Configurable<SpeechSettings, SpeechPreferences>)
  _defaults;
  _preferences;
  _settings;
  _preferencesEditor = null;
  preferencesEditorVoice = null;
  contextualizationOverrides;
  segmentationOverrides;
  // The raw GND source, retained only when content was loaded via
  // `loadGndContent()`. Its absence is what makes submitPreferences()'s
  // extraction-affecting fields (format, verbosity, skip, contextualize,
  // language, segmentation) a no-op on content loaded via loadContent() — prosody
  // fields (rate/pitch/volume/pauseDuration/autoPause) still apply.
  source;
  // The language of the loaded content as a whole, given with it.
  contentLanguage;
  // Parallel to `contentQueue`, from the extraction that produced it — lets
  // reextract() find where to resume after a reload (see resolveResumeIndex).
  contentSources = [];
  // Parallel to `contentQueue`: whether each utterance begins a new
  // block-level element. loadContent() content has no boundaries of its own.
  contentBlockStarts = [];
  // Set by setContentQueue() when a reload should resume mid-queue rather
  // than at the start; consumed once by the engine's "ready" handler.
  pendingResumeIndex = null;
  pendingResumeState = null;
  // Index to speak() on the next play() when autoPause has stopped playback between utterances.
  pendingAutoPauseIndex = null;
  voiceSelection;
  reportedLanguageFallbacks = /* @__PURE__ */ new Set();
  // `settings.voice` as "voiceschanged" last told it, so loads and refreshes racing each other tell a change once.
  notifiedVoice = null;
  // Bumped by every setContentQueue(), so a load still waiting for its voices knows it was superseded.
  loadGeneration = 0;
  constructor(e, t = {}) {
    this.engine = e, this._defaults = new Mn(t.defaults), this._preferences = new ye(t.preferences), this._settings = new Ct(this._preferences, this._defaults), this.contextualizationOverrides = t.contextualizationOverrides, this.segmentationOverrides = t.segmentationOverrides, this.languages = t.languages ?? [], this.voiceSelection = new Cl(e, () => this._settings.voice, () => this.spokenLanguages()), this.setupEngineListeners(), this.applyEngineParameters(), this.notifiedVoice = this.spokenVoice(), this.initializeEngine();
  }
  // Unlike pauseDuration/autoPause (read live off settings), the engine owns rate/pitch/volume and must be pushed.
  applyEngineParameters() {
    this.engine.setRate(this._settings.rate), this.engine.setPitch(this._settings.pitch), this.engine.setVolume(this._settings.volume);
  }
  async initializeEngine() {
    try {
      await this.engine.initialize?.(), await this.refreshVoices();
    } catch (e) {
      console.warn("Failed to initialize speech engine:", e);
    }
  }
  // The languages voices are picked for ahead: the configured ones, as `languageOverrides` speaks them, else the content's.
  spokenLanguages() {
    return (this.languages.length > 0 ? this.languages : this.contentLanguage ? [this.contentLanguage] : []).map((t) => gn(t, this._settings.languageOverrides) ?? t);
  }
  // Picks again, re-stamping loaded content whose voice that changes, and tells when the spoken voices change.
  async refreshVoices() {
    if (await this.voiceSelection.pick(), this.loadedQueue.length > 0 && this.stamped().some((e, t) => e.voice !== this.contentQueue[t]?.voice)) {
      const { index: e, state: t } = this.resumeTarget();
      await this.setContentQueue(this.loadedQueue, e, t);
    }
    this.notifyVoicesChanged();
  }
  // A swapped-in engine starts the queue stamped with the previous one's voices: held, then reloaded with its own.
  async refreshVoicesForEngine() {
    const e = this.pendingAdvanceTimeout !== null ? this.getCurrentUtteranceIndex() + 1 : null;
    if (this.clearPendingAdvance(), this.engine.pause(), await this.voiceSelection.pick(), this.loadedQueue.length > 0) {
      const { index: t, state: s } = this.resumeTarget(), i = s && e !== null && this.getCurrentUtteranceIndex() === e - 1 ? e : t;
      await this.setContentQueue(this.loadedQueue, i, s);
    }
    this.notifyVoicesChanged();
  }
  notifyVoicesChanged() {
    const e = this.spokenVoice();
    this.sameSettingValue(this.notifiedVoice, e) || (this.notifiedVoice = e, this.emitEvent({ type: "voiceschanged" }));
  }
  spokenVoice() {
    return this.settings.voice;
  }
  setupEngineListeners() {
    this.engine.on("start", (e) => {
      this.setNavigatorState("playing");
      const t = this.getCurrentContent();
      t && this.emitUtteranceBoundary(t), this.emitEvent({ type: "start", detail: e.detail });
    }), this.engine.on("end", () => {
      const e = this.engine.getCurrentUtteranceIndex(), t = this.engine.getUtteranceCount();
      if (e < t - 1) {
        const s = this._settings.autoPause === "utterance" || this.contentBlockStarts[e + 1] === !0;
        this._settings.autoPause !== "none" && s ? (this.pendingAutoPauseIndex = e + 1, this.setNavigatorState("paused"), this.emitEvent({ type: "pause" })) : this.pendingAdvanceTimeout = setTimeout(() => {
          this.pendingAdvanceTimeout = null, this.engine.speak(e + 1);
        }, this._settings.pauseDuration);
      } else
        this.engine.setCurrentUtteranceIndex(0), this.setNavigatorState("idle");
      this.emitEvent({ type: "end" });
    }), this.engine.on("pause", () => {
      this.setNavigatorState("paused"), this.emitEvent({ type: "pause" });
    }), this.engine.on("resume", () => {
      this.setNavigatorState("playing"), this.emitEvent({ type: "resume" });
    }), this.engine.on("stop", () => {
      this.setNavigatorState("idle"), this.emitEvent({ type: "stop" });
    }), this.engine.on("error", (e) => {
      this.setNavigatorState("idle"), this.emitEvent(e);
    }), this.engine.on("ready", () => {
      if (this.contentQueue.length === 0) return;
      const e = this.pendingResumeIndex, t = this.pendingResumeState;
      if (this.pendingResumeIndex = null, this.pendingResumeState = null, this.navigatorState === "loading") {
        if (t === "playing") {
          this.setNavigatorState("playing"), this.engine.speak(e ?? 0);
          return;
        }
        if (t === "paused") {
          const s = e ?? 0;
          this.pendingAutoPauseIndex = s, s > 0 ? this.engine.setCurrentUtteranceIndex(s, () => this.setNavigatorState("paused")) : this.setNavigatorState("paused");
          return;
        }
        this.setNavigatorState("ready"), this.emitEvent({ type: "ready" });
      }
    }), this.engine.on("boundary", (e) => {
      const { charIndex: t, charLength: s } = e.detail ?? {}, i = this.loadedQueue[this.getCurrentUtteranceIndex()], a = i && typeof t == "number" && typeof s == "number" ? Yr(i, t, s) : void 0;
      this.emitEvent(a ? { ...e, detail: { ...e.detail, ...a } } : e);
    }), this.engine.on("mark", (e) => {
      this.emitEvent(e);
    }), this.engine.on("voiceschanged", () => {
      this.refreshVoices();
    }), this.engine.on("enginefallback", (e) => {
      this.emitEvent(e), this.refreshVoicesForEngine();
    }), this.engine.on("enginerecovered", (e) => {
      this.emitEvent(e), this.refreshVoicesForEngine();
    });
  }
  setNavigatorState(e) {
    this.navigatorState = e;
  }
  // Voice Management
  async getVoices() {
    return this.engine.getAvailableVoices();
  }
  // Content Management
  loadContent(e, t = {}) {
    if (this.source)
      throw new Error("loadContent() cannot be used after loadGndContent() — the two are exclusive. Create a new navigator instance to switch content sources.");
    this.contentLanguage = t.language, this.setContentQueue(e);
  }
  async loadGndContent(e, t = {}) {
    this.source = e, this.contentLanguage = t.language, await this.reextract();
  }
  async setContentQueue(e, t = null, s = null) {
    this.clearPendingAdvance(), this.pendingAutoPauseIndex = null, (this.navigatorState === "playing" || this.navigatorState === "paused") && this.engine.stop(), this.loadedQueue = Array.isArray(e) ? [...e] : [e], this.contentQueue = [], this.pendingResumeIndex = t, this.pendingResumeState = s, this.setNavigatorState("loading"), this.emitEvent({ type: "loading" });
    const i = ++this.loadGeneration, a = this.loadedQueue.map((o) => this.withLanguage(o)).filter((o) => !o.voice && o.language);
    if (this.voiceSelection.setContentLanguages([...new Set(a.map((o) => o.language))]), this.voiceSelection.unpicked().length > 0 && (await this.voiceSelection.pick().catch(() => {
    }), i !== this.loadGeneration))
      return;
    const r = this.stamped();
    this.contentQueue = r, this.reportLanguageFallbacks(r), this.engine.loadUtterances(r, t ?? void 0), this.emitContentChangeEvent({ content: r }), this.notifyVoicesChanged();
  }
  stamped() {
    const e = /* @__PURE__ */ new Map();
    return this.loadedQueue.map((t) => this.withVoice(this.withLanguage(t), e));
  }
  // Once per language, for content in a language the engine has no voice for, spoken with the engine's own.
  reportLanguageFallbacks(e) {
    if (!(this.voiceSelection.voices.length === 0 || this.voiceSelection.unpicked().length > 0))
      for (const t of e) {
        if (t.voice || !t.language) continue;
        const s = V(t.language);
        this.reportedLanguageFallbacks.has(s) || (this.reportedLanguageFallbacks.add(s), this.emitEvent({ type: "languagefallback", detail: { language: t.language, reason: "no-matching-voice" } }));
      }
  }
  // The content's language when a loadContent() utterance has none; extraction applies it to loadGndContent()'s.
  withLanguage(e) {
    return this.source !== void 0 || this.contentLanguage === void 0 || e.language ? e : { ...e, language: this.contentLanguage };
  }
  // The utterance's own voice, else the one for its language, looked up once per language into `voices`.
  withVoice(e, t) {
    if (e.voice) return e;
    t.has(e.language) || t.set(e.language, this.voiceSelection.voiceFor(e.language));
    const s = t.get(e.language);
    return s ? { ...e, voice: s } : e;
  }
  // Re-runs extraction from `this.source`, resuming near the old position if playback was underway.
  async reextract() {
    if (!this.source) return;
    const { index: e, state: t } = this.resumeTarget(), s = this.contentSources, { utterances: i, sources: a, blockStarts: r } = await Gi(this.source, {
      format: this._settings.format,
      interruptions: this._settings.interruptions,
      skip: this._settings.skip,
      contextualize: this._settings.contextualize,
      contextualization: {
        contextualizations: this.contextualizationOverrides?.contextualizations,
        shapes: Ar(this._settings.verbosity, this.contextualizationOverrides?.shapes),
        params: this.contextualizationOverrides?.params
      },
      language: this._settings.language,
      contentLanguage: this.contentLanguage,
      languageOverrides: this._settings.languageOverrides,
      segmentation: {
        mode: this._settings.segmentation,
        reconstruct: this._settings.reconstruct,
        suppressions: this.segmentationOverrides?.suppressions,
        segmenter: this.segmentationOverrides?.segmenter
      }
    });
    this.contentSources = a, this.contentBlockStarts = r;
    const o = t && e !== null ? this.resolveResumeIndex(s, e, a) : null;
    await this.setContentQueue(i, o, t);
  }
  // Nearest node at or before oldIndex that's still present in newSources.
  // A reconstructed-sentence span (a `[first, last]` tuple) is a fresh array
  // each extraction, so it never matches by identity — skipped in favor of
  // the next plain single-node entry further back.
  resolveResumeIndex(e, t, s) {
    for (let i = Math.min(t, e.length - 1); i >= 0; i--) {
      const a = e[i];
      if (a === void 0 || Array.isArray(a)) continue;
      const r = s.indexOf(a);
      if (r !== -1) return r;
    }
    return null;
  }
  getCurrentContent() {
    const e = this.getCurrentUtteranceIndex();
    return e < this.contentQueue.length ? this.contentQueue[e] : null;
  }
  getContentQueue() {
    return [...this.contentQueue];
  }
  getCurrentUtteranceIndex() {
    return this.engine.getCurrentUtteranceIndex();
  }
  // Where play() continues: the utterance autoPause or a pause between utterances withheld, else the current one.
  resumePosition() {
    return this.pendingAutoPauseIndex ?? this.getCurrentUtteranceIndex();
  }
  // The playback a reload restores: the current one, or the one a reload still loading was to restore.
  resumeTarget() {
    if (this.navigatorState === "loading") return { index: this.pendingResumeIndex, state: this.pendingResumeState };
    const e = this.navigatorState === "playing" || this.navigatorState === "paused" ? this.navigatorState : null;
    return { index: e ? this.resumePosition() : null, state: e };
  }
  // Playback Control - Navigator coordinates engine operations
  play() {
    if (this.navigatorState === "paused")
      if (this.setNavigatorState("playing"), this.pendingAutoPauseIndex !== null) {
        const e = this.pendingAutoPauseIndex;
        this.pendingAutoPauseIndex = null, this.engine.speak(e);
      } else
        this.engine.resume();
    else if (this.navigatorState === "ready" || this.navigatorState === "idle")
      this.setNavigatorState("playing"), this.engine.speak();
    else {
      if (this.navigatorState === "playing")
        return;
      this.navigatorState === "loading" && (this.pendingResumeState = "playing");
    }
  }
  pause() {
    if (this.navigatorState === "playing") {
      if (this.pendingAdvanceTimeout !== null) {
        this.clearPendingAdvance(), this.pendingAutoPauseIndex = this.getCurrentUtteranceIndex() + 1, this.setNavigatorState("paused"), this.emitEvent({ type: "pause" });
        return;
      }
      this.pendingAutoPauseIndex = null, this.setNavigatorState("paused"), this.engine.pause();
    } else this.navigatorState === "loading" && this.pendingResumeState === "playing" && (this.pendingResumeState = "paused");
  }
  stop() {
    this.clearPendingAdvance(), this.pendingAutoPauseIndex = null, this.setNavigatorState("idle"), this.engine.stop(), this.emitEvent({ type: "stop" });
  }
  clearPendingAdvance() {
    this.pendingAdvanceTimeout !== null && (clearTimeout(this.pendingAdvanceTimeout), this.pendingAdvanceTimeout = null);
  }
  skipToPosition(e, t = !1) {
    const s = this.getCurrentUtteranceIndex();
    return e < 0 || e >= this.contentQueue.length ? !1 : (e === s || (this.clearPendingAdvance(), this.navigatorState === "paused" && !t ? (this.pendingAutoPauseIndex !== null && (this.pendingAutoPauseIndex = e), this.engine.setCurrentUtteranceIndex(e, (i) => {
      if (i) {
        const a = this.getCurrentContent();
        a && this.emitUtteranceBoundary(a), this.emitEvent({
          type: "skip",
          detail: { position: e }
        });
      }
    })) : (this.pendingAutoPauseIndex = null, this.setNavigatorState("playing"), this.engine.speak(e))), !0);
  }
  // Navigation - Navigator coordinates with proper state management
  next(e = !1) {
    const t = this.getCurrentUtteranceIndex();
    return this.skipToPosition(t + 1, e);
  }
  previous(e = !1) {
    const t = this.getCurrentUtteranceIndex();
    return this.skipToPosition(t - 1, e);
  }
  jumpTo(e, t = !1) {
    return this.skipToPosition(e, t);
  }
  // State - Navigator is the single source of truth
  getState() {
    return this.navigatorState;
  }
  // Events
  on(e, t) {
    return this.events.on(e, t);
  }
  emitEvent(e) {
    this.events.emit(e.type, e);
  }
  // Real engines rarely emit a native "sentence" boundary mark (the Web Speech
  // API allows it but implementations don't), so the navigator synthesizes the
  // whole-utterance boundary itself whenever the current utterance changes.
  // Same `detail.locate` key as a "word" boundary uses (see engine.on("boundary")
  // above) — only its type differs, a LocatorOptions[] here vs a single
  // LocatorOptions there — and the same "resolve, then skip if there's nothing
  // to show" shape, since there's no raw engine event to fall back to unenriched.
  emitUtteranceBoundary(e) {
    const t = this._settings.segmentation, s = eo(e, t);
    if (!s.length) return;
    const i = t === "sentence" ? "sentence" : "structure";
    this.emitEvent({
      type: "boundary",
      detail: { name: i, charIndex: 0, charLength: (e.plain ?? "").length, locate: s }
    });
  }
  emitContentChangeEvent(e) {
    this.emitEvent({ type: "contentchange", detail: e });
  }
  // Preferences API (Configurable<SpeechSettings, SpeechPreferences>)
  get settings() {
    return this.settingsWith(this.voiceSelection.pickedRecord());
  }
  // `picks` are the voice defaults; the preference's voices the engine doesn't have give way to them.
  settingsWith(e) {
    return new Ct(
      this._preferences.merging(new ye({ voice: this.voiceSelection.availablePreference() })),
      new Mn({ ...this._defaults, voice: e })
    );
  }
  // Rebuilt, staged edits kept, once the spoken voices change, e.g. when they're picked after being read.
  get preferencesEditor() {
    const e = this.spokenVoice();
    return (this._preferencesEditor === null || !this.sameSettingValue(e, this.preferencesEditorVoice)) && (this._preferencesEditor = new Bn(this._preferencesEditor?.preferences ?? this._preferences, this.settings), this.preferencesEditorVoice = e), this._preferencesEditor;
  }
  async submitPreferences(e) {
    !this.source && this.contentQueue.length > 0 && zn.some((t) => e[t] !== void 0) && console.warn(
      "submitPreferences(): extraction-affecting preferences (format, interruptions, verbosity, skip, contextualize, language, languageOverrides, segmentation, reconstruct) have no effect on content loaded via loadContent() — use loadGndContent() to re-extract on submission."
    ), this._preferences = this._preferences.merging(e), await this.applyPreferences();
  }
  async applyPreferences() {
    const e = this._settings;
    if (this._settings = new Ct(this._preferences, this._defaults), this.applyEngineParameters(), (!this.sameSettingValue(e.voice, this._settings.voice) || !this.sameSettingValue(e.languageOverrides, this._settings.languageOverrides)) && await this.voiceSelection.pick().catch(() => {
    }), this._preferencesEditor !== null && (this._preferencesEditor = new Bn(this._preferences, this.settings)), zn.some((t) => !this.sameSettingValue(this.extractionValue(e, t), this.extractionValue(this._settings, t))))
      await this.reextract();
    else if (this.loadedQueue.length > 0 && !this.sameSettingValue(e.voice, this._settings.voice)) {
      const { index: t, state: s } = this.resumeTarget();
      await this.setContentQueue(this.loadedQueue, t, s);
    }
    this.notifyVoicesChanged();
  }
  // `reconstruct` only shapes extraction in sentence segmentation.
  extractionValue(e, t) {
    return t === "reconstruct" ? e.segmentation === "sentence" && e.reconstruct : e[t];
  }
  // Arrays (skip/contextualize) compare as sets and records (languageOverrides) by entries, not by reference.
  sameSettingValue(e, t) {
    if (Array.isArray(e) && Array.isArray(t))
      return e.length === t.length && e.every((s) => t.includes(s));
    if (e && t && typeof e == "object" && typeof t == "object") {
      const s = Object.entries(e);
      return s.length === Object.keys(t).length && s.every(([i, a]) => t[i] === a);
    }
    return e === t;
  }
  async destroy() {
    this.loadGeneration++, this.loadedQueue = [], this.clearPendingAdvance(), this.events.clear(), await this.engine.destroy();
  }
}
export {
  Er as BooleanPreference,
  Ie as EnumPreference,
  Tl as FallbackEngineProvider,
  Sr as FallbackSpeechEngine,
  $l as Locator,
  Gl as LocatorLocations,
  ql as LocatorText,
  re as Preference,
  Ge as RangePreference,
  kr as ReadiumSpeechDecorationController,
  Bl as ReadiumSpeechNavigator,
  Nl as ReadiumSpeechProviderRegistry,
  Mn as SpeechDefaults,
  ye as SpeechPreferences,
  Bn as SpeechPreferencesEditor,
  Fs as SpeechServerAudioDecodeError,
  pr as SpeechServerEngine,
  Vl as SpeechServerEngineProvider,
  Le as SpeechServerError,
  _s as SpeechServerNetworkError,
  Ds as SpeechServerStallError,
  Ct as SpeechSettings,
  jn as StringArrayPreference,
  Un as WebSpeechEngine,
  Ll as WebSpeechEngineProvider,
  P as WebSpeechVoiceManager,
  ln as autoPauseScopes,
  ko as blockLevelRoles,
  no as builtInSubstitutions,
  co as builtInSuppressions,
  me as chineseVariantMap,
  ms as compareAlphabetically,
  ps as compareByPreferredRegion,
  Pr as contextualizationShapesAtVerbosity,
  Ir as contextualizedAtVerbosity,
  ve as createJsonOrderMap,
  wr as createLocator,
  ai as defaultContextualizations,
  O as extractLangRegionFromBCP47,
  jl as extractUtterances,
  on as extractionFormats,
  zn as extractionPreferenceKeys,
  Ss as filterByBoundarySupport,
  ba as filterByLanguages,
  Nt as filterOutNoveltyVoices,
  zt as filterOutVeryLowQualityVoices,
  Lt as getLanguageDisplayName,
  Je as getQualityValue,
  F as getVoiceId,
  gt as groupVoicesByLanguage,
  Co as interruptionRoles,
  Gs as interruptionValues,
  Tt as isNoveltyVoice,
  mr as isRecoverableFailure,
  Ut as isVeryLowQualityVoice,
  rn as languageModes,
  nt as pauseDurationRangeConfig,
  ys as pickBestVoiceByRegion,
  ks as pickDefaultVoice,
  ws as pickLanguageVoice,
  it as pitchRangeConfig,
  st as rateRangeConfig,
  Yr as resolveBoundaryLocate,
  eo as resolveUtteranceLocate,
  cn as segmentationModes,
  Ul as setupDecorations,
  zl as shapeableRoles,
  Ml as skippableRoles,
  Rr as skippedAtVerbosity,
  Vt as sortAlphabetically,
  ga as sortByPreferredRegion,
  ie as sortByQuality,
  vs as sortVoicesByRegions,
  ra as valueForLanguage,
  an as verbosityPresets,
  at as volumeRangeConfig
};
