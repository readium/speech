import { DecorationController as $i, DirectCommsChannel as Gi, Decorator as qi } from "@readium/decorator";
export * from "@readium/decorator";
import { LocatorText as Hi, LocatorLocations as Ki, Locator as Wi, GuidedNavigationText as Qi } from "@readium/shared";
import { Locator as zl, LocatorLocations as Ml, LocatorText as jl } from "@readium/shared";
import { ssmlTextEscape as oe, ssmlAttrEscape as Ne, startsWithBindingPunct as ct, BINDING_PUNCT_CLASS as Ie } from "@readium/helpers";
import { DROPPED as Zt, removeDropped as ds, isAriaSubstituted as ce, substitutedOwnSelector as Ji, decodeTextref as An, combineDomRangeTextrefs as Zi } from "@readium/guided-navigation";
import Xi from "i18next";
import { DomRange as Yi, DomRangePoint as Pn } from "@readium/shared/html";
const L = (n) => {
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
}, ea = (n, e) => {
  const t = e.toLowerCase().replace(/_/g, "-"), [s] = L(e), i = Object.entries(n);
  for (const a of [t, s]) {
    const r = i.find(([o]) => o.toLowerCase().replace(/_/g, "-") === a);
    if (r) return r[1];
  }
}, gs = (n, e) => {
  const t = e.toLowerCase().replace(/_/g, "-"), [s] = L(e);
  let i;
  for (const a of [s, t])
    for (const [r, o] of Object.entries(n))
      r.toLowerCase().replace(/_/g, "-") === a && (i ??= /* @__PURE__ */ new Set(), o.forEach((l) => i.add(l)));
  return i && [...i];
}, fe = {
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
}, O = (n) => {
  if (!n) return "";
  const e = (a) => {
    if (!/\w{2,3}-\w{2,3}/.test(a)) return a;
    const [r, o] = a.split("-");
    return `${r}-${o.toUpperCase()}`;
  }, t = n.toLowerCase().replace(/_/g, "-"), s = e(t), i = e(t.split("-").filter((a, r) => r === 0 || !/^[a-z]{4}$/.test(a)).join("-"));
  return fe[s] || fe[i] || s;
}, W = {
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
}, kt = /* @__PURE__ */ new Map(), ta = /* @__PURE__ */ Object.assign({ "../../json/ar.json": () => import("./ar-BGKtJRyt.js"), "../../json/bg.json": () => import("./bg-D9Q1JriY.js"), "../../json/bho.json": () => import("./bho-CpuLBMN3.js"), "../../json/bn.json": () => import("./bn-Bpn_lzoe.js"), "../../json/ca.json": () => import("./ca-5hzouNcE.js"), "../../json/cmn.json": () => import("./cmn-DlnYMCd8.js"), "../../json/cs.json": () => import("./cs-CDpMkMNO.js"), "../../json/da.json": () => import("./da-XWCfWAwB.js"), "../../json/de.json": () => import("./de-DU0USiOh.js"), "../../json/el.json": () => import("./el-ClBwbIAW.js"), "../../json/en.json": () => import("./en-l3wcpTw3.js"), "../../json/es.json": () => import("./es-DwOFJY07.js"), "../../json/eu.json": () => import("./eu-DxWirHU-.js"), "../../json/fa.json": () => import("./fa-Ml9KtIw1.js"), "../../json/fi.json": () => import("./fi-Dk-5Fhhl.js"), "../../json/fr.json": () => import("./fr-MfhjukJ4.js"), "../../json/gl.json": () => import("./gl-DwtzWds9.js"), "../../json/he.json": () => import("./he-CfajFNE_.js"), "../../json/hi.json": () => import("./hi-pv2ttBoh.js"), "../../json/hr.json": () => import("./hr-MRApcEKR.js"), "../../json/hu.json": () => import("./hu-DGRDZdHH.js"), "../../json/id.json": () => import("./id-DZUuUiTG.js"), "../../json/it.json": () => import("./it-DJUYnjyj.js"), "../../json/ja.json": () => import("./ja-BpFcZRMu.js"), "../../json/kk.json": () => import("./kk-C480t1iH.js"), "../../json/kn.json": () => import("./kn-BVqs26qv.js"), "../../json/ko.json": () => import("./ko-TNoPZd6N.js"), "../../json/mr.json": () => import("./mr-DstAHTvT.js"), "../../json/ms.json": () => import("./ms-BceBSD-j.js"), "../../json/nb.json": () => import("./nb-CwPbwG-i.js"), "../../json/nl.json": () => import("./nl-BmW-Dmw5.js"), "../../json/pl.json": () => import("./pl-CH8qoDu8.js"), "../../json/pt.json": () => import("./pt-CjCENn24.js"), "../../json/ro.json": () => import("./ro-BlJN7qkA.js"), "../../json/ru.json": () => import("./ru-udzq1D5e.js"), "../../json/sk.json": () => import("./sk-VAEHsTWJ.js"), "../../json/sl.json": () => import("./sl-DaZQ1gp0.js"), "../../json/sv.json": () => import("./sv-CicHwXe4.js"), "../../json/ta.json": () => import("./ta-CvpRY89g.js"), "../../json/te.json": () => import("./te-D5TcdW9V.js"), "../../json/th.json": () => import("./th-CYakoFVa.js"), "../../json/tr.json": () => import("./tr-BfYrcAz7.js"), "../../json/uk.json": () => import("./uk-BVs6lQbX.js"), "../../json/vi.json": () => import("./vi-DP1xN9KL.js"), "../../json/wuu.json": () => import("./wuu-C6uQvT6g.js"), "../../json/yue.json": () => import("./yue-C8kEWdfv.js") });
async function na(n) {
  try {
    const e = n.split("-")[0], t = ta[`../../json/${e}.json`];
    if (!t)
      throw new Error(`No voice data found for language: ${n}`);
    const i = (await t()).default;
    return {
      ...i,
      voices: i.voices.map(aa)
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
function xn(n) {
  return kt.has(n) || kt.set(n, na(n)), kt.get(n);
}
const sa = ["veryLow", "low", "normal", "high", "veryHigh"], ia = ["android", "apple"], aa = (n) => ({
  ...n,
  quality: n.quality?.filter((e) => sa.includes(e)),
  localizedName: n.localizedName && ia.includes(n.localizedName) ? n.localizedName : void 0
}), xt = async (n) => {
  if (!n) return [];
  try {
    const e = O(n);
    try {
      const s = await xn(e);
      if (s?.voices?.length)
        return s.voices;
    } catch (s) {
      console.warn(`Failed to load voices for ${e}:`, s);
    }
    const [t] = L(e);
    if (t !== e)
      try {
        const s = await xn(t);
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
    const e = O(n), t = W[e];
    if (t?.testUtterance)
      return t.testUtterance;
    if (e in fe) {
      const i = fe[e];
      if (i && W[i]?.testUtterance)
        return W[i].testUtterance;
    }
    const [s] = L(e);
    return s !== e && W[s]?.testUtterance ? W[s].testUtterance : "";
  } catch (e) {
    return console.error(`Error in getTestUtterance for ${n}:`, e), "";
  }
}, ut = (n) => {
  if (!n) return "";
  try {
    const e = O(n), t = W[e];
    if (t?.defaultRegion)
      return `${e}-${t.defaultRegion}`;
    if (e in fe) {
      const i = fe[e];
      if (i) {
        const a = W[i];
        if (a?.defaultRegion)
          return `${i}-${a.defaultRegion}`;
      }
    }
    const [s] = L(e);
    if (s !== e) {
      const i = W[s];
      if (i?.defaultRegion)
        return `${s}-${i.defaultRegion}`;
    }
    return "";
  } catch (e) {
    return console.error(`Failed to get default region for ${n}:`, e), "";
  }
}, ht = (n) => {
  if (!n?.length) return [];
  const e = /* @__PURE__ */ new Set(), t = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map();
  for (const [i, a] of n.entries()) {
    if (!a) continue;
    const r = O(a), [o, l] = L(r);
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
      const u = ut(i), [, h] = L(u);
      h && c.push(h);
    }
    return {
      baseLang: i,
      regions: c
    };
  });
}, pe = async (n) => {
  const e = /* @__PURE__ */ new Map();
  for (const s of n) {
    if (s.source !== "json") continue;
    const [i] = L(s.language);
    e.has(i) || e.set(i, []), e.get(i).push(s);
  }
  const t = /* @__PURE__ */ new Map();
  for (const [s, i] of e.entries()) {
    const a = /* @__PURE__ */ new Map(), r = await xt(s), o = /* @__PURE__ */ new Map();
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
}, ra = {
  veryLow: 1,
  low: 2,
  normal: 3,
  high: 4,
  veryHigh: 5
}, We = (n) => n ? ra[n] ?? 0 : 0, se = (n, e, t, s) => {
  const i = We(n.quality), a = We(e.quality);
  if (t && s && n.source === "json" && e.source === "json") {
    const r = t.get(s);
    if (r) {
      const o = r.get(n.name), l = r.get(e.name);
      if (o !== void 0 && l !== void 0)
        return o - l;
    }
  }
  return a !== i ? a - i : n.name.localeCompare(e.name);
}, dt = (n, e) => {
  const t = new Map(e.map((a) => [a.baseLang, a])), s = /* @__PURE__ */ new Map(), i = [];
  for (const a of n) {
    const [r] = L(a.language);
    t.get(r) ? (s.has(r) || s.set(r, []), s.get(r).push(a)) : i.push(a);
  }
  return { voicesByLang: s, otherLangVoices: i };
}, fs = (n, e, t, s) => {
  const [, i] = L(n.language), [, a] = L(e.language), r = i && t.regions.includes(i), o = a && t.regions.includes(a);
  if (r && o) {
    const d = t.regions.indexOf(i), g = t.regions.indexOf(a);
    return d === g ? se(n, e, s, t.baseLang) : d - g;
  }
  if (r) return -1;
  if (o) return 1;
  const l = ut(t.baseLang), [, c] = L(l), u = !!c && i === c, h = !!c && a === c;
  if (u && !h) return -1;
  if (!u && h) return 1;
  if (i && a) {
    const d = i.localeCompare(a);
    return d !== 0 ? d : se(n, e, s, t.baseLang);
  }
  return i ? -1 : a ? 1 : se(n, e, s, t.baseLang);
}, oa = async (n, e, t) => {
  const s = t ?? await pe(n);
  n.sort((i, a) => fs(i, a, e, s));
}, ps = (n, e, t) => {
  const [s] = L(n.language), [i] = L(e.language), a = Lt(s).toLowerCase(), r = Lt(i).toLowerCase(), o = a.localeCompare(r);
  if (o !== 0)
    return o;
  if (s === i) {
    const l = ut(s), [, c] = L(n.language), [, u] = L(e.language), h = l && c === l.split("-")[1], d = l && u === l.split("-")[1];
    if (h && !d) return -1;
    if (!h && d) return 1;
    if (c && u) {
      const g = c.localeCompare(u);
      if (g !== 0)
        return g;
    }
    return c && !u ? -1 : !c && u ? 1 : se(n, e, t, s);
  }
  return se(n, e, t, s);
}, Vt = async (n, e) => {
  const t = e ?? await pe(n);
  n.sort((s, i) => ps(s, i, t));
}, ms = async (n, e) => {
  if (!e?.length) return [];
  const t = ht(n || []), { voicesByLang: s, otherLangVoices: i } = dt(e, t), a = await pe(e), r = [];
  for (const o of t) {
    const l = s.get(o.baseLang);
    l && (await oa(l, o, a), r.push(...l));
  }
  return await Vt(i, a), r.push(...i), r;
}, vs = async (n, e) => {
  if (!e.length) return null;
  const [t] = ht([n]), { voicesByLang: s, otherLangVoices: i } = dt(e, [t]), a = s.get(t.baseLang), r = a?.length ? a : i, o = await pe(e), l = a?.length ? (c, u) => fs(c, u, t, o) : (c, u) => ps(c, u, o);
  return r.reduce((c, u) => l(u, c) < 0 ? u : c);
}, ys = (n, e) => {
  const t = n.filter((s) => s.controls?.boundary !== !1 === e);
  return t.length > 0 ? t : n;
}, xe = (n) => O(n).split("-")[0], la = (n, e) => {
  const t = Object.entries(n).map(([s, i]) => [O(s), i]);
  for (const s of [O(e), xe(e)]) {
    const i = t.find(([a]) => a === s);
    if (i) return i[1];
  }
}, ca = [{ name: "Albert", nativeID: ["com.apple.speech.synthesis.voice.Albert"], note: "This novelty voice is part of a pack preloaded by Apple.", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Bad News", nativeID: ["com.apple.speech.synthesis.voice.BadNews"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Mauvaises nouvelles", "Malas noticias", "Brutte notizie"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Bahh", nativeID: ["com.apple.speech.synthesis.voice.Bahh"], note: "This novelty voice is part of a pack preloaded by Apple.", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Bells", nativeID: ["com.apple.speech.synthesis.voice.Bells"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Cloches", "Campanas", "Campane"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Boing", nativeID: ["com.apple.speech.synthesis.voice.Boing"], note: "This novelty voice is part of a pack preloaded by Apple.", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Bubbles", nativeID: ["com.apple.speech.synthesis.voice.Bubbles"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Bulles", "Burbujas", "Bollicine"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Cellos", nativeID: ["com.apple.speech.synthesis.voice.Cellos"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Violoncelles", "Violonchelos", "Violoncelli"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Good News", nativeID: ["com.apple.speech.synthesis.voice.GoodNews"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Bonnes nouvelles", "Buenas noticias", "Buone notizie"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Jester", nativeID: ["com.apple.speech.synthesis.voice.Hysterical"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Bouffon", "Bufón", "Giullare"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Organ", nativeID: ["com.apple.speech.synthesis.voice.Organ"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Orgue", "Órgano", "Organo"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Superstar", nativeID: ["com.apple.speech.synthesis.voice.Princess"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Superestrella"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Trinoids", nativeID: ["com.apple.speech.synthesis.voice.Trinoids"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Trinoïdes"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Whisper", nativeID: ["com.apple.speech.synthesis.voice.Whisper"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Murmure", "Susurro", "Sussurro"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Wobble", nativeID: ["com.apple.speech.synthesis.voice.Deranged"], note: "This novelty voice is part of a pack preloaded by Apple.", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Zarvox", nativeID: ["com.apple.speech.synthesis.voice.Zarvox"], note: "This novelty voice is part of a pack preloaded by Apple.", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }], ua = {
  voices: ca
}, ha = [{ name: "Eddy", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Flo", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Grandma", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Grandpa", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Jacques", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Reed", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Rocko", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Sandy", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Shelley", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Fred", language: "en-US", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Junior", language: "en-US", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Kathy", language: "en-US", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Ralph", language: "en-US", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "eSpeak Arabic", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ar", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Bulgarian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "bg", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Bengali", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "bn", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Catalan", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ca", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Chinese (Mandarin, latin as English)", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "cmn", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Czech", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "cs", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Danish", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "da", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak German", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "de", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Greek", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "el", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Spanish (Spain)", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "es", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Estonian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "et", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Finnish", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "fi", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Gujarati", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "gu", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Croatian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "hr", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Hungarian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "hu", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Indonesian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "id", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Italian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "it", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Kannada", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "kn", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Korean", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ko", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Lithuanian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "lt", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Latvian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "lv", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Malayalm", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ml", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Marathi", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "mr", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Malay", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ms", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Norwegian Bokmål", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "nb", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Polish", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "pl", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Portuguese (Brazil)", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "pt-br", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Romanian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ro", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Russian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ru", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Slovak", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "sk", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Slovenian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "sl", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Serbian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "sv", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Swedish", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "sv", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Swahili", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "sw", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Tamil", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ta", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Telugu", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "te", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Turkish", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "tr", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Vietnamese (Northern)", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "vi", os: ["ChromeOS"], preloaded: !0 }], da = {
  voices: ha
}, ga = ua, fa = da, Ot = (n, e) => ga.voices.some(
  (t) => n.includes(t.name) || e && t.nativeID?.some((s) => e.includes(s)) || t.altNames?.some((s) => n.includes(s))
), Tt = (n, e) => fa.voices.some(
  (t) => n.includes(t.name)
) || e === "veryLow", Ut = (n) => n?.length ? n.filter((e) => !(e.isNovelty || Ot(e.name, e.voiceURI))) : [], Nt = (n) => n?.length ? n.filter((e) => !Tt(e.name, e.quality)) : [], pa = (n, e) => {
  const t = (Array.isArray(e) ? e : [e]).map(xe);
  return n.filter((s) => [s.language, s.altLanguage].some((i) => !!i && t.includes(xe(i))));
}, ma = { ar: { normal: "محسن", high: "استثنائي" }, ca: { normal: "millorada", high: "prèmium" }, "cmn-CN": { normal: "优化音质", high: "高音质" }, "cmn-TW": { normal: "增強音質", high: "高音質" }, cs: { normal: "vylepšená verze", high: "prémiový" }, da: { normal: "forbedret", high: "høj kvalitet" }, de: { normal: "erweitert", high: "premium" }, el: { normal: "βελτιωμένη", high: "υψηλής ποιότητας" }, en: { normal: "Enhanced", high: "Premium" }, es: { normal: "mejorada", high: "premium" }, fi: { normal: "parannettu", high: "korkealaatuinen" }, fr: { normal: "premium", high: "de qualité" }, he: { normal: "משופר", high: "פרימיום" }, hi: { normal: "बेहतर", high: "प्रीमियम" }, hr: { normal: "poboljšani", high: "vrhunski" }, hu: { normal: "továbbfejlesztett", high: "prémium" }, id: { normal: "Ditingkatkan", high: "Premium" }, it: { normal: "ottimizzata", high: "premium" }, ja: { normal: "拡張", high: "プレミアム" }, ko: { normal: "고품질", high: "프리미엄" }, ms: { normal: "Dipertingkat", high: "Premium" }, nb: { normal: "forbedret", high: "premium" }, nl: { normal: "verbeterd", high: "premium" }, pl: { normal: "rozszerzony", high: "premium" }, pt: { normal: "melhorada", high: "premium" }, ro: { normal: "îmbunătățită", high: "premium" }, ru: { normal: "улучшенный", high: "высшее качество" }, sk: { normal: "vylepšený", high: "prémiový" }, sl: { normal: "izboljšano", high: "prvovrsten" }, sv: { normal: "förbättrad", high: "premium" }, th: { normal: "คุณภาพสูง", high: "คุณภาพสูง" }, tr: { normal: "Geliştirilmiş", high: "Yüksek Kaliteli" }, uk: { normal: "вдосконалений", high: "високої якості" }, vi: { normal: "Nâng cao", high: "Cao cấp" } }, va = {
  quality: ma
}, zt = {
  apple: va.quality
  // android: androidQualities.quality
}, ya = (n, e, t) => {
  if (!n) return;
  const s = Array.isArray(t) ? t : t ? [t] : [];
  for (const i of s)
    if (i && zt[i]) {
      const a = zt[i], r = L(e)[0], o = a[e] || a[r];
      if (o) {
        const l = n.toLowerCase(), { normal: c, high: u } = o;
        if (u && l.includes(u.toLowerCase()))
          return "high";
        if (c && l.includes(c.toLowerCase()))
          return "normal";
      }
    }
}, Sa = (n, e) => {
  const t = zt[e];
  if (t)
    for (const [s, { high: i, normal: a }] of Object.entries(t)) {
      const r = i && n.some((l) => l.includes(i)), o = a && n.some((l) => l.includes(a));
      if (r && o)
        return s;
    }
}, ba = {
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
  for (const s of Object.values(ba))
    if (s.values.some((i) => t.includes(i)))
      return s.quality;
};
function wa(n, e) {
  if (n.name === n.originalName) return n;
  if (e.name === e.originalName) return e;
  const t = [n.originalName, ...n.altNames || []], s = [e.originalName, ...e.altNames || []], i = t.findIndex((r) => s.includes(r)), a = s.findIndex((r) => t.includes(r));
  return i === -1 && a === -1 || i !== -1 && (a === -1 || i <= a) ? n : e;
}
function ka(n, e) {
  if (!n.altNames && !e.altNames)
    return !1;
  const t = n.originalName, s = e.originalName, i = n.altNames || [], a = e.altNames || [];
  return a.includes(t) || i.includes(s) ? !0 : i.filter((o) => a.includes(o)).length > 0;
}
const Ss = () => {
  const e = typeof window < "u" && (window.navigator || {}).userAgent || "", t = () => /android/i.test(e), s = () => /kaios/i.test(e), i = () => /linux/i.test(e) && !t(), a = () => typeof window.InstallTrigger < "u" ? !0 : /firefox/i.test(e), r = () => /AppleWebKit/i.test(e) && !/Chrome|Chromium|Edg\/|OPR|Android/i.test(e);
  return {
    isAndroid: t(),
    isFirefox: a() || s(),
    isSafari: r(),
    isKaiOS: s(),
    isLinux: i()
  };
};
class A {
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
    this.systemLocale = navigator.languages?.[0]?.split("-")[0] || "en", this.isAndroid = Ss().isAndroid;
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
    if (A.instance?.isInitialized) {
      const t = A.instance;
      return e?.languages && e.languages.length > 0 && await t.broadenLanguages(e.languages), t;
    }
    return A.initializationPromise || (A.initializationPromise = (async () => {
      try {
        const t = new A();
        A.instance = t, t.browserVoices = await t.getBrowserVoices(e?.maxTimeout, e?.interval), t.updateSystemLocale(t.browserVoices);
        let s = t.browserVoices;
        return e?.languages && e.languages.length > 0 ? (s = t.filterBrowserVoicesByLanguages(t.browserVoices, e.languages), t.scopedLanguages = A.toBaseLangSet(e.languages)) : t.scopedLanguages = null, t.voices = await t.parseToReadiumSpeechVoices(s), t.isInitialized = !0, t;
      } catch (t) {
        throw A.initializationPromise = null, console.error("Failed to initialize WebSpeechVoiceManager:", t), t;
      }
    })()), A.initializationPromise;
  }
  /**
   * Filter browser voices based on preferred languages
   * @private
   */
  filterBrowserVoicesByLanguages(e, t) {
    if (!t?.length) return e;
    const s = A.toBaseLangSet(t);
    return e.filter((i) => {
      if (!i?.lang) return !1;
      const a = O(i.lang), [r] = A.extractLangRegionFromBCP47(a);
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
        const s = O(t), [i] = A.extractLangRegionFromBCP47(s);
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
    const s = [...A.toBaseLangSet(e)].filter((o) => !this.scopedLanguages.has(o));
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
    return L(e);
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
    const t = e.map((i) => i.name), s = Sa(t, "apple");
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
      const a = ya(
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
        const r = We(a.quality), o = We(s.quality);
        if (o === r && ka(s, a)) {
          const l = wa(s, a);
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
    const [s] = A.extractLangRegionFromBCP47(e);
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
      const a = O(i).split("-")[0];
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
      const [, u] = A.extractLangRegionFromBCP47(c.language);
      u && l.set(u, (l.get(u) || 0) + 1);
    }
    for (const c of a) {
      const [, u] = A.extractLangRegionFromBCP47(c.language);
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
        const a = O(i.lang), [r] = A.extractLangRegionFromBCP47(a), o = this.normalizeVoiceName(i.name), l = `${i.lang.toLowerCase()}_${o}`, c = t.get(l) || 1;
        let u = await xt(a);
        (!u || u.length === 0) && (u = await xt(r));
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
          isNovelty: Ot(i.name, i.voiceURI),
          isLowQuality: Tt(i.name, d)
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
          isNovelty: Ot(i.name, i.voiceURI),
          isLowQuality: Tt(i.name, d)
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
    if (i.languages && (s = pa(s, i.languages)), i.source && (s = s.filter((a) => a.source === i.source)), i.gender && (s = s.filter((a) => a.gender === i.gender)), i.quality) {
      const a = Array.isArray(i.quality) ? i.quality : [i.quality];
      s = s.filter((r) => r.quality && a.includes(r.quality));
    }
    return i.offlineOnly && (s = s.filter((a) => a.offlineAvailability === !0)), i.provider && (s = s.filter(
      (a) => a.provider?.toLowerCase() === i.provider?.toLowerCase()
    )), i.excludeNovelty && (s = Ut(s)), i.excludeVeryLowQuality && (s = Nt(s)), i.removeDuplicates && (s = this.removeDuplicates(s)), s;
  }
  /**
   * Filter out novelty voices
   * @param voices Array of voices to filter
   * @returns Filtered array with novelty voices removed
   */
  filterOutNoveltyVoices(e) {
    const t = e ?? this.voices;
    return Ut(t);
  }
  /**
   * Filter out very low quality voices
   * @param voices Array of voices to filter
   * @returns Filtered array with very low quality voices removed
   */
  filterOutVeryLowQualityVoices(e) {
    const t = e ?? this.voices;
    return Nt(t);
  }
  /**
   * Sort voices by quality, respecting JSON name order, then alphabetically for undefined/null quality
   * @param voices Array of voices to sort
   * @returns Sorted array of voices
   */
  async sortVoicesByQuality(e) {
    const t = e || this.voices;
    if (!t?.length) return [];
    const s = await pe(t);
    return [...t].sort((i, a) => se(i, a, s));
  }
  /**
   * Sort regions by default then alphabetically, sort voices by quality
   */
  static async sortByDefaultRegion(e, t) {
    const s = await pe(e), i = ut(t);
    e.sort((a, r) => {
      const [, o] = A.extractLangRegionFromBCP47(a.language), [, l] = A.extractLangRegionFromBCP47(r.language), c = i && o === i.split("-")[1], u = i && l === i.split("-")[1];
      return c && !u ? -1 : !c && u ? 1 : se(a, r, s, t);
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
    const i = ht(e), { voicesByLang: a, otherLangVoices: r } = dt(s, i), o = [];
    for (const l of i) {
      const c = a.get(l.baseLang);
      c && (await A.sortByDefaultRegion(c, l.baseLang), o.push(...c));
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
    return ms(e, t || this.voices);
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
          r = A.extractLangRegionFromBCP47(a.language)[0];
          break;
        case "gender":
          r = a.gender || "unknown";
          break;
        case "quality":
          r = a.quality || "unknown";
          break;
        case "region":
          const [, o] = A.extractLangRegionFromBCP47(a.language);
          r = o || "unknown";
          break;
      }
      s[r] || (s[r] = []), s[r].push(a);
    }
    return s;
  }
}
const bs = async (n, e, t = !0) => {
  const s = (r) => L(O(r))[0], i = s(n), a = Nt(Ut(e)).filter((r) => s(r.language) === i);
  return a.length === 0 ? null : vs(n, ys(a, t));
}, ws = async (n, e) => {
  n?.length || (n = typeof navigator < "u" && navigator.languages?.length ? [...navigator.languages] : ["en"]);
  for (const t of n) {
    const s = await bs(t, e);
    if (s) return s;
  }
  return (await ms(n, e))[0] ?? null;
}, G = (n) => n.voiceURI ?? n.identifier ?? n.name, Ea = ["webKit", "moz", "ms", "o"], Ca = [
  "boundary",
  "end",
  "error",
  "mark",
  "pause",
  "resume",
  "start"
], Ra = (n) => `${n.charAt(0).toUpperCase()}${n.slice(1)}`, Ce = (n = {}, e) => Object.hasOwnProperty.call(n, e) || e in n || !!n[e], Ia = (n) => typeof window < "u" && n in window, Aa = (n) => {
  const e = Ra(n), t = Ea.map((i) => `${i}${e}`), s = [n, e].concat(t).find(Ia);
  return s && typeof window < "u" ? window[s] : void 0;
}, Pa = () => {
  const n = {};
  [
    "speechSynthesis",
    "speechSynthesisUtterance",
    "speechSynthesisVoice",
    "speechSynthesisEvent",
    "speechSynthesisErrorEvent"
  ].forEach((t) => {
    n[t] = Aa(t);
  }), n.onvoiceschanged = Ce(n.speechSynthesis, "onvoiceschanged"), n.speechSynthesisSpeaking = Ce(n.speechSynthesis, "speaking"), n.speechSynthesisPaused = Ce(n.speechSynthesis, "paused");
  const e = n.speechSynthesisUtterance ? Ce(n.speechSynthesisUtterance, "prototype") : !1;
  return Ca.forEach((t) => {
    const s = `on${t}`;
    n[s] = e && n.speechSynthesisUtterance ? Ce(n.speechSynthesisUtterance.prototype, s) : !1;
  }), n;
};
class gt {
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
const qe = (n, e) => Math.min(Math.max(n, 0), Math.max(e - 1, 0));
function ie(n, e, t, s) {
  return Number.isFinite(n) ? Math.max(e, Math.min(t, n)) : s;
}
const Qe = "\\p{Ps}\\p{Pi}¿¡", xa = new RegExp(`^[${Qe}]`, "u"), La = new RegExp(`[${Qe}]$`, "u"), Va = new RegExp("^\\p{P}$", "u");
function Oa(n) {
  return xa.test(n);
}
function Ta(n) {
  return La.test(n);
}
const ks = "\\p{scx=Han}\\p{scx=Hiragana}\\p{scx=Katakana}\\p{scx=Thai}\\p{scx=Lao}\\p{scx=Khmer}\\p{scx=Myanmar}\\u3000-\\u303F\\uFF00-\\uFFEF", Es = new RegExp(`[${ks}]$`, "u"), Cs = new RegExp(`^[${ks}]`, "u");
function Rs(n, e) {
  return Es.test(n) && Cs.test(e);
}
function Is(n, e) {
  return Es.test(n) || Cs.test(e);
}
function Ua(n) {
  return Va.test(n);
}
function As(n) {
  return n.replace(/[<>]/g, "​");
}
const Je = "[A-Za-z_][\\w.:-]*", Na = new RegExp(`(${Je})\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, "g"), za = new RegExp(`^<(${Je})((?:\\s+${Je}\\s*=\\s*(?:"[^"]*"|'[^']*'))*)\\s*(/?)>`), Ma = new RegExp(`^</(${Je})\\s*>`), ja = { lt: "<", gt: ">", amp: "&", quot: '"', apos: "'", nbsp: " " }, Ps = /&(?:#x([0-9a-fA-F]+)|#([0-9]+)|(lt|gt|amp|quot|apos|nbsp));/g;
function xs(n, e, t, s) {
  if (s) return ja[s];
  const i = e ? parseInt(e, 16) : parseInt(t, 10);
  return i <= 1114111 ? String.fromCodePoint(i) : n;
}
function Xt(n) {
  return n.replace(Ps, xs);
}
function Ba(n, e) {
  const t = new RegExp(Ps.source, "y");
  t.lastIndex = e;
  const s = t.exec(n);
  return s ? { length: s[0].length, decoded: xs(s[0], s[1], s[2], s[3]) } : void 0;
}
function Da(n) {
  const e = /* @__PURE__ */ new Map();
  for (const t of n.matchAll(Na)) e.set(t[1], Xt(t[2] ?? t[3]));
  return e;
}
function* Ls(n) {
  let e = 0;
  for (; e < n.length; ) {
    const t = n.indexOf("<", e), s = t === -1 ? n.length : t;
    if (s > e && (yield { kind: "text", text: Xt(n.slice(e, s)), start: e, end: s }), t === -1) return;
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
      const a = Ma.exec(i);
      if (!a) throw new Error("malformed closing tag");
      e = t + a[0].length, yield { kind: "close", name: a[1], markup: a[0], start: t, end: e };
    } else {
      const a = za.exec(i);
      if (!a) throw new Error("malformed tag");
      e = t + a[0].length, yield { kind: "open", name: a[1], attrs: a[2], selfClosing: a[3] === "/", markup: a[0], start: t, end: e };
    }
  }
}
function Fa(n, e) {
  const t = [];
  for (let s = e.start; s < e.end; ) {
    const i = !e.cdata && n[s] === "&" ? Ba(n, s) : void 0;
    for (let a = 0; a < (i?.decoded.length ?? 1); a++) t.push(s);
    s += i?.length ?? 1;
  }
  return t;
}
function _a(n) {
  const e = [], t = [], s = () => t.length ? t[t.length - 1].children : e, i = (a, r) => {
    const o = s(), l = o[o.length - 1];
    l?.kind === "text" ? (l.text += a, l.positions.push(...r)) : o.push({ kind: "text", text: a, positions: r });
  };
  for (const a of Ls(n))
    if (a.kind === "text")
      i(a.text, Fa(n, a));
    else if (a.kind === "close") {
      const r = t.pop();
      if (r?.name !== a.name) throw new Error("mismatched closing tag");
      r.closeStart = a.start, r.end = a.end;
    } else {
      const r = {
        kind: "element",
        name: a.name,
        attrs: Da(a.attrs),
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
function $a(n) {
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
    return _a(n);
  } catch {
    return n ? [{ kind: "text", text: n, positions: Array.from({ length: n.length }, (e, t) => t) }] : [];
  }
}
function ft(n) {
  return n.selfClosing ? "" : `</${n.name}>`;
}
function Yt(n) {
  return n.map((e) => e.openTag).join("");
}
function Ze(n) {
  return n.map(ft).reverse().join("");
}
function ve(n) {
  let e = "";
  for (const t of n)
    t.kind === "text" ? e += oe(t.text) : e += t.openTag + (t.selfClosing ? "" : ve(t.children) + ft(t));
  return e;
}
function pt(n, e) {
  let t = 0;
  for (; t < n.length && t < e.length && n[t] === e[t]; ) t++;
  return n.slice(0, t);
}
class en {
  out = "";
  open = [];
  moveTo(e) {
    const t = pt(this.open, e).length;
    for (; this.open.length > t; ) this.out += ft(this.open.pop());
    for (const s of e.slice(t))
      this.out += s.openTag, this.open.push(s);
  }
  text(e, t) {
    t && (this.moveTo(e), this.out += oe(t));
  }
  node(e, t) {
    this.moveTo(e), this.out += ve([t]);
  }
  // The SSML written so far, with every open element closed; the writer starts over empty.
  flush() {
    this.moveTo([]);
    const e = this.out;
    return this.out = "", e;
  }
}
const Ga = /* @__PURE__ */ new Set(["speak", "audio"]);
function Vs(n) {
  return Ga.has(n.name);
}
const qa = /* @__PURE__ */ new Set(["lang", "p", "s", "voice", "token", "w"]);
function te(n) {
  return qa.has(n.name) ? n.attrs.get("xml:lang") : void 0;
}
function* ue(n) {
  for (const e of n)
    e.kind === "element" && (yield e, yield* ue(e.children));
}
function Os(n, e, t) {
  t === void 0 ? n.attrs.delete(e) : n.attrs.set(e, t);
  const s = [...n.attrs].map(([i, a]) => ` ${i}="${Ne(a)}"`).join("");
  n.openTag = `<${n.name}${s}${n.selfClosing ? "/" : ""}>`;
}
function tn(n, e) {
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
        t.push({ at: u, text: c.map(([h, d]) => ` ${h}="${Ne(d)}"`).join("") });
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
function Ts(n, e) {
  return n.flatMap((t) => {
    if (t.kind === "text") return [t];
    const s = Ts(t.children, e);
    return e(t) ? s : [{ ...t, children: s }];
  });
}
function ye(n, e, t = []) {
  const s = [];
  for (const i of n)
    i.kind === "element" && i.children.length > 0 && !e?.(i) ? s.push(...ye(i.children, e, [...t, i])) : s.push({ node: i, ancestors: t });
  return s;
}
function Us(n, e) {
  return n.length > 0 && e.length > 0 && !/\s$/.test(n) && !/^\s/.test(e) && !ct(e) && !Rs(n, e);
}
const Ha = /* @__PURE__ */ new Set(["speak", "p", "s", "voice", "audio", "desc", "token", "w"]);
function On(n) {
  return /^<[^>]*\/>/.test(n) || Ha.has(/^<\/?([^\s/>]+)/.exec(n)?.[1] ?? "");
}
function he(n) {
  let e = "", t = !1, s = [];
  const i = [];
  for (const { node: a, ancestors: r } of ye(B(n))) {
    const o = pt(s, r).length;
    if ([...s.slice(o), ...r.slice(o)].some((l) => On(l.openTag)) && (t = !0), s = r, a.kind === "element") {
      i.push({ kind: "element", node: a, chain: r }), On(a.openTag) && (t = !0);
      continue;
    }
    t && Us(e, a.text) && (i.push({ kind: "separator", start: e.length, position: a.positions[0], chain: r.slice(0, o) }), e += " "), i.push({ kind: "text", text: a.text, start: e.length, positions: a.positions, chain: r }), e += a.text, t = !1;
  }
  return { plain: e, pieces: i };
}
function Ns(n) {
  let e = "";
  const t = [];
  for (const s of n)
    if (s.kind === "text") {
      e += s.text;
      for (const i of s.positions) t.push(i);
    }
  return (s, i) => e.slice(Xe(t, s), Xe(t, i));
}
function zs(n) {
  return he(n).plain;
}
function Ms(n) {
  let e = "";
  const t = [], s = (r, o) => {
    r === " " && e.endsWith(" ") || (e += r, t.push(o));
  };
  for (const r of he(n).pieces)
    if (r.kind === "separator") s(" ", r.position);
    else if (r.kind === "text") for (let o = 0; o < r.text.length; o++) s(r.text[o], r.positions[o]);
  let i = 0;
  for (; i < e.length && /\s/.test(e[i]); ) i++;
  let a = e.length;
  for (; a > i && /\s/.test(e[a - 1]); ) a--;
  return { plain: e.slice(i, a), map: t.slice(i, a) };
}
function _(n) {
  return Ms(n).plain;
}
function Xe(n, e) {
  let t = 0, s = n.length;
  for (; t < s; ) {
    const i = t + s >> 1;
    n[i] < e ? t = i + 1 : s = i;
  }
  return t;
}
const Ka = 250;
class Tn {
  speechSynthesis;
  speechSynthesisUtterance;
  currentVoice = null;
  // The voice of the utterance being spoken, reported in its "start" event.
  speakingVoice = null;
  currentUtterances = [];
  currentUtteranceIndex = 0;
  playbackState = "idle";
  events = new gt();
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
    if (this.features = Pa(), this.patches = Ss(), this.lacksNativePause = this.patches.isAndroid || this.patches.isFirefox && this.patches.isLinux, !this.features.speechSynthesis || !this.features.speechSynthesisUtterance)
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
      return this.voiceManager = await A.initialize({
        languages: t,
        maxTimeout: s,
        interval: i
      }), this.defaultVoice = await ws(t, this.voices), this.initialized = !0, !0;
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
    return t && (await A.initialize({ languages: [t] }), this.loadedOwnVoiceLanguages.add(t)), this.ownVoice(e) ?? this.getCurrentVoice();
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
      plain: t.plain ?? (t.ssml ? _(t.ssml) : "")
    }));
  }
  // Queue Management
  loadUtterances(e, t) {
    this.currentUtterances = this.toPlainText(e), this.currentUtteranceIndex = qe(t ?? 0, e.length), this.playbackState = "ready", this.emitEvent({ type: "ready" });
  }
  // Voice Configuration
  async setVoice(e) {
    const t = this.currentVoice;
    if (typeof e == "string") {
      const s = this.findVoice(e);
      s ? this.currentVoice = s : console.warn(`Voice "${e}" not found`);
    } else
      this.currentVoice = e;
    (this.currentVoice && G(this.currentVoice)) !== (t && G(t)) && this.scheduleRestartIfSpeaking();
  }
  // Read from the manager each time, as initializing it with other languages adds theirs
  get voices() {
    return this.voiceManager?.getVoices() ?? [];
  }
  async getAvailableVoices(e, t) {
    try {
      this.voiceManager || await this.initialize();
      const s = [...e ?? [], ...(t ?? []).flatMap((i) => this.browserVoiceLanguage(i) ?? [])];
      return s.length && await A.initialize({ languages: s }), this.voices;
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
    const s = this.lastCancelAt + Ka - Date.now();
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
    const t = ie(e, 0.1, 10, this.rate);
    t !== this.rate && (this.rate = t, this.scheduleRestartIfSpeaking());
  }
  getRate() {
    return this.rate;
  }
  setPitch(e) {
    const t = ie(e, 0, 2, this.pitch);
    t !== this.pitch && (this.pitch = t, this.scheduleRestartIfSpeaking());
  }
  getPitch() {
    return this.pitch;
  }
  setVolume(e) {
    const t = ie(e, 0, 1, this.volume);
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
function Mt(n) {
  return n.offlineAvailability === !0 || typeof navigator < "u" && navigator.onLine === !0;
}
class Cl {
  id = "webspeech";
  name = "Web Speech API";
  voiceEngine = null;
  // No cache to bypass here — local API, no network cost to re-checking.
  async getVoices() {
    return this.voiceEngine || (this.voiceEngine = new Tn(), await this.voiceEngine.initialize()), this.voiceEngine.getAvailableVoices();
  }
  // Offline voices keep it available without a connection.
  async isAvailable() {
    return (await this.getVoices()).some(Mt);
  }
  async createEngine(e) {
    const t = new Tn();
    return await t.initialize(), e && await t.setVoice(e), t;
  }
  async destroy() {
    this.voiceEngine && (await this.voiceEngine.destroy(), this.voiceEngine = null);
  }
}
function js(n, e) {
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
class Bs extends Le {
  constructor(e) {
    super(e, { status: 408, type: "https://readium.org/speech-server/error#stall", title: "Synthesis Stalled" }), this.name = "SpeechServerStallError";
  }
}
class Ds extends Error {
  constructor(e) {
    super(e), this.name = "SpeechServerAudioDecodeError";
  }
}
class Fs extends Error {
  constructor(e) {
    super(e), this.name = "SpeechServerNetworkError";
  }
}
async function Ae(n) {
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
function _s(n, e) {
  const t = [];
  let s = -1, i = -1;
  const a = () => {
    s !== -1 && (t.push({ text: Wa(n, s, i), offset: n[s].offset }), s = -1, i = -1);
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
function Wa(n, e, t) {
  const s = n[e], i = n[t];
  return s === i ? s.text : n.slice(e, t + 1).map((a) => a.text).join("");
}
const jt = new RegExp(
  `[^${Ie}]*[${Ie}]+\\s*|[^${Ie}]+$`,
  "gu"
), Qa = /\S+\s*|\s+/g;
function Ye(n, e, t) {
  const s = [];
  for (const i of n.matchAll(t))
    i[0].length !== 0 && s.push({ text: i[0], offset: e + i.index, atomic: !1 });
  return s;
}
function nn(n, e) {
  if (n.text.length <= e || n.atomic)
    return [n];
  const t = Ye(n.text, n.offset, Qa);
  if (t.length > 1)
    return t.flatMap((r) => nn(r, e));
  const s = [];
  let i = n.offset, a = "";
  for (const r of n.text)
    a.length > 0 && a.length + r.length > e && (s.push({ text: a, offset: i, atomic: !1 }), i += a.length, a = ""), a += r;
  return a.length > 0 && s.push({ text: a, offset: i, atomic: !1 }), s;
}
function Ja(n, e) {
  if (n.length <= e)
    return [{ text: n, offset: 0 }];
  const s = Ye(n, 0, jt).flatMap((i) => nn(i, e));
  return _s(s, e);
}
function Za(n, e) {
  if (n.length <= e)
    return [{ text: n, offset: 0 }];
  const t = [];
  let s = 0;
  for (const a of B(n))
    a.kind === "element" && (t.push(...Ye(n.slice(s, a.start), s, jt)), t.push({ text: n.slice(a.start, a.end), offset: a.start, atomic: !0 }), s = a.end);
  t.push(...Ye(n.slice(s), s, jt));
  const i = t.flatMap((a) => nn(a, e));
  return _s(i, e);
}
const Xa = {
  wav: "audio/wav",
  mp3: "audio/mpeg",
  opus: "audio/ogg",
  ogg: "audio/ogg",
  aac: "audio/aac",
  flac: "audio/flac",
  webm: "audio/webm",
  m4a: "audio/mp4"
};
function Ya(n) {
  return Xa[n] ?? `audio/${n}`;
}
const er = ["flac", "wav", "opus", "aac", "ogg", "webm", "mp3"], tr = ["opus", "aac", "webm", "ogg", "mp3", "wav", "flac"];
function nr(n, e, t) {
  const s = (o) => t(Ya(o)) !== "", i = n.formats.filter(s);
  if (e.preferredFormat && i.includes(e.preferredFormat))
    return e.preferredFormat;
  const a = e.strategy === "bandwidth" ? tr : er, r = [...a, ...i.filter((o) => !a.includes(o))];
  for (const o of r)
    if (i.includes(o))
      return o;
  return n.default;
}
const sr = /* @__PURE__ */ new Set(["wav", "flac"]), ir = {
  mp3: 48e3,
  opus: 24e3,
  aac: 48e3,
  ogg: 48e3,
  webm: 32e3
};
function ar(n, e, t) {
  return sr.has(n) || !e || !t ? void 0 : t.saveData === !0 || /2g/.test(t.effectiveType ?? "") ? ir[n] : void 0;
}
const rr = 3, or = 400;
function lr(n) {
  const e = atob(n), t = new Uint8Array(e.length);
  for (let s = 0; s < e.length; s++)
    t[s] = e.charCodeAt(s);
  return t.buffer;
}
function cr(n) {
  return ie(n, 0.25, 4, 1);
}
function Fe(n) {
  return n?.plain ?? n?.ssml ?? void 0;
}
function Un(n) {
  return n instanceof Bs ? { message: n.message, status: n.status, type: n.type, title: n.title, instance: n.instance, recoverable: !0 } : n instanceof Le ? { message: n.message, status: n.status, type: n.type, title: n.title, instance: n.instance, recoverable: !1 } : n instanceof Ds ? { message: n.message, recoverable: !1 } : n instanceof Fs ? { message: n.message, recoverable: !0 } : n instanceof Error ? { message: n.message, recoverable: !1 } : { message: String(n), recoverable: !1 };
}
class ur {
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
  events = new gt();
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
    this.endpoints = e.endpoints, this.fetchImpl = e.fetch ?? fetch.bind(globalThis), this.prefetchWindow = e.prefetchWindow ?? rr, this.readyBufferChars = e.readyBufferChars ?? or, this.overLengthText = e.overLengthText ?? "split", this.timeoutMs = e.timeoutMs, this.formatOptions = e.format ?? {}, this.canPlayType = typeof Audio < "u" ? (t) => new Audio().canPlayType(t) : () => "";
  }
  // Lets a provider that already fetched /voices seed this engine without a second request.
  setAvailableVoices(e) {
    this.voices = e, this.voicesRequest = null;
  }
  // Fetches the voices, and picks the default one by navigator.languages, as WebSpeechEngine does without languages
  async initialize() {
    this.initializing = (async () => {
      const e = await this.getAvailableVoices();
      return this.defaultVoice = await ws(void 0, e), !0;
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
      throw s instanceof TypeError ? new Fs(s.message) : s;
    }
  }
  loadUtterances(e, t) {
    this.abortLiveControllers(), this.clearPrefetchCache(), this.currentUtterances = e, this.currentUtteranceIndex = qe(t ?? 0, e.length), this.setState("loading"), this.bufferUntilReady(++this.loadGeneration);
  }
  // Buffers enough utterances ahead of currentUtteranceIndex to cover readyBufferChars before
  // declaring "ready", so playback doesn't catch up to an empty prefetch cache right away —
  // starting from wherever playback will actually resume, not always utterance 0.
  async bufferUntilReady(e) {
    const t = qe(this.currentUtteranceIndex, this.currentUtterances.length), s = Math.min(this.indexCoveringChars(this.readyBufferChars, t), t + this.prefetchWindow), i = [];
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
    const s = qe(t, this.currentUtterances.length);
    let i = 0;
    for (let a = s; a < this.currentUtterances.length; a++)
      if (i += (Fe(this.currentUtterances[a]) ?? "").length, i >= e)
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
      throw await Ae(e);
    const s = await e.json(), i = new Map(t.providers.map((a) => [a.id, a.controls]));
    return this.voices = s.map((a) => js(a, i.get(a.provider))), this.voices;
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
      throw await Ae(e);
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
        detail: Un(s)
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
    const s = this.currentUtterances[e], i = !s.plain && !!s.ssml, a = s.language, r = Fe(s) ?? "", o = i ? Ms(r).map : void 0, l = Fe(this.currentUtterances[e - 1]), c = Fe(this.currentUtterances[e + 1]), u = await this.getServiceInfo(), h = nr(u.output, this.formatOptions, this.canPlayType), d = navigator.connection, g = ar(h, this.formatOptions.adaptBitrateToNetwork ?? !1, d);
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
    const m = Math.min(u.limits.maxTextLength, this.readyBufferChars), y = i ? Za(r, m) : Ja(r, m), f = [];
    let k = Promise.resolve();
    for (let b = 0; b < y.length; b++) {
      const P = b === 0 ? l : y[b - 1].text, S = b === y.length - 1 ? c : y[b + 1].text, v = y[b], E = new AbortController();
      (t ? this.activeControllers : this.liveControllers).add(E);
      const w = k.then(
        () => this.synthesizeChunk({ content: s, text: v.text, textOffset: v.offset, useSSML: i, ssmlMap: o, language: a, prevText: P, nextText: S, format: h, bitrate: g, controller: E })
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
        throw await Ae(m);
      const y = await m.json(), f = lr(y.audio);
      let k;
      try {
        k = await this.ensureAudioContext().decodeAudioData(f);
      } catch {
        throw new Ds("Audio playback failed");
      }
      return { audioBuffer: k, format: y.format, boundaries: y.boundaries, textOffset: i, ssmlMap: r };
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
        t.abort(), r(new Bs(`No audio chunk arrived within ${i.toFixed(0)}ms of the playback buffer running dry`));
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
    const a = this.ensureAudioContext(), r = this.masterGain, l = s?.controls?.speed === !0 ? 1 : cr(this.rate);
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
        t === this.speakGeneration && this.emitEvent({ type: "error", detail: Un(m) });
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
          r = Xe(l, a), o = Math.max(0, Xe(l, a + i.charLength) - r);
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
    const t = ie(e, 0.1, 10, this.rate);
    t !== this.rate && (this.rate = t, this.clearPrefetchCache(), this.scheduleRestartIfSpeaking());
  }
  getRate() {
    return this.rate;
  }
  setPitch(e) {
    const t = ie(e, 0, 2, this.pitch);
    t !== this.pitch && (this.pitch = t, this.clearPrefetchCache(), this.scheduleRestartIfSpeaking());
  }
  getPitch() {
    return this.pitch;
  }
  setVolume(e) {
    const t = ie(e, 0, 1, this.volume);
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
class Rl {
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
      throw await Ae(t);
    if (!s.ok)
      throw await Ae(s);
    const i = await t.json(), a = await s.json(), r = new Map(a.providers.map((o) => [o.id, o.controls]));
    return this.voices = i.map((o) => js(o, r.get(o.provider))), this.voices;
  }
  async isAvailable() {
    try {
      return await this.getVoices(!0), !0;
    } catch {
      return !1;
    }
  }
  async createEngine(e) {
    const t = new ur(this.options);
    return this.voices.length > 0 && t.setAvailableVoices(this.voices), e && t.setVoice(e), t;
  }
  async destroy() {
    this.voices = [];
  }
}
function hr(n) {
  return n.detail?.recoverable === !0;
}
const dr = 3e4, gr = [
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
class fr {
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
  events = new gt();
  unbindActiveEngine = null;
  constructor(e) {
    this.activeEngine = e.primaryEngine, this.primaryProvider = e.primaryProvider, this.fallbackProvider = e.fallbackProvider, this.onFailure = e.onFailure ?? "fallback", this.healthCheckIntervalMs = e.healthCheckIntervalMs ?? dr, this.lastVoiceRequest = e.primaryEngine.getCurrentVoice() ?? void 0, this.bindActiveEngine();
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
    const e = this.activeEngine, t = gr.map((s) => e.on(s, (i) => {
      this.emitEvent(i), this.maybeRecoverNow();
    }));
    t.push(e.on("error", (s) => this.handleError(s))), this.unbindActiveEngine = () => t.forEach((s) => s());
  }
  handleError(e) {
    if (this.hasFallenBack || this.swapInFlight || this.onFailure === "error" || !hr(e)) {
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
    return e.filter(Mt);
  }
  recordListedVoices(e, t) {
    const s = this.listedVoices.get(e) ?? /* @__PURE__ */ new Map();
    t.forEach((i) => s.set(G(i), i)), this.listedVoices.set(e, s);
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
      if (!i || Mt(i)) return s;
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
    const [a] = ht([e]), { voicesByLang: r } = dt(i, [a]), o = r.get(a.baseLang) ?? [], l = o.length > 0 ? o : i, c = t ? l.filter((d) => d.gender === t) : [], u = c.length > 0 ? c : l, h = ys(u, s);
    return vs(e, h);
  }
  async destroy() {
    this.teardownEpoch++, this.healthCheckTimer !== null && (clearTimeout(this.healthCheckTimer), this.healthCheckTimer = null), this.unbindActiveEngine?.(), this.events.clear(), await this.activeEngine.destroy();
  }
}
class Il {
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
    return new fr({
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
function pr(n) {
  return new Yi({
    start: new Pn(n.start),
    end: n.end ? new Pn(n.end) : void 0
  });
}
function mr(n, e = window) {
  const { href: t, text: s, cssSelector: i, domRange: a, fragment: r } = n, o = s ? new Hi(s) : void 0, l = i || a ? /* @__PURE__ */ new Map() : void 0;
  l && (i && l.set("cssSelector", i), a && l.set("domRange", pr(a).serialize()));
  const u = l !== void 0 || r !== void 0 ? new Ki({
    fragments: r ? [r] : void 0,
    otherLocations: l
  }) : void 0;
  return new Wi({
    href: t ?? e.location.href,
    type: "text/html",
    text: o,
    locations: u
  });
}
class vr extends $i {
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
        locator: mr(a, this.wnd)
      })),
      t
    );
  }
  destroy() {
    super.destroy(), this.decorator.unmount(this.wnd, this.channel.frame), this.channel.frame.destroy();
  }
}
function Al(n = window, e = {}) {
  const t = new Gi(), s = new qi();
  return s.mount(n, t.frame), new vr(t, n, s, e);
}
class Pl {
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
const mt = (n, e, t) => Object.freeze({ range: Object.freeze([n, e]), step: t }), et = mt(0, 5e3, 100), tt = mt(0.1, 10, 0.1), nt = mt(0, 2, 0.1), st = mt(0, 1, 0.05), sn = Object.freeze(["none", "few", "some", "most", "custom"]), an = Object.freeze(["none", "block-level", "always"]), rn = Object.freeze(["plain", "ssml"]), on = Object.freeze(["none", "utterance", "block"]), ln = Object.freeze(["structure", "sentence"]), $s = Object.freeze(["never", "inline", "after"]), Nn = Object.freeze([
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
function cn(n) {
  return n == null || typeof n == "boolean" ? n : void 0;
}
function F(n, e) {
  return n == null || e.includes(n) ? n : void 0;
}
function Q(n, e) {
  if (n == null) return n;
  if (typeof n != "number" || Number.isNaN(n)) return;
  const t = Math.min(...e), s = Math.max(...e);
  return n >= t && n <= s ? n : void 0;
}
function un(n) {
  if (n == null) return n;
  if (!(typeof n != "object" || Array.isArray(n)))
    return Object.values(n).every((e) => typeof e == "string") ? { ...n } : void 0;
}
function Gs(n, e) {
  if (n == null) return n;
  if (!(typeof n != "object" || Array.isArray(n)))
    return Object.values(n).every((t) => t !== void 0 && e.includes(t)) ? { ...n } : void 0;
}
function qs(n) {
  return typeof n == "string" ? n : un(n);
}
function Ve(n) {
  return n == null ? n : Array.isArray(n) && n.every((e) => typeof e == "string") ? [...n] : void 0;
}
class zn {
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
    this.format = F(e.format, rn) ?? "plain", this.interruptions = Gs(e.interruptions, $s) ?? {}, this.verbosity = F(e.verbosity, sn) ?? "few", this.skip = Ve(e.skip) ?? [], this.contextualize = Ve(e.contextualize) ?? [], this.language = F(e.language, an) ?? "block-level", this.languageOverrides = un(e.languageOverrides) ?? {}, this.segmentation = F(e.segmentation, ln) ?? "structure", this.reconstruct = cn(e.reconstruct) ?? !1, this.voice = qs(e.voice) ?? null, this.pauseDuration = Q(e.pauseDuration, et.range) ?? 300, this.autoPause = F(e.autoPause, on) ?? "none", this.rate = Q(e.rate, tt.range) ?? 1, this.pitch = Q(e.pitch, nt.range) ?? 1, this.volume = Q(e.volume, st.range) ?? 1;
  }
}
class me {
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
    this.format = F(e.format, rn), this.interruptions = Gs(e.interruptions, $s), this.verbosity = F(e.verbosity, sn), this.skip = Ve(e.skip), this.contextualize = Ve(e.contextualize), this.language = F(e.language, an), this.languageOverrides = un(e.languageOverrides), this.segmentation = F(e.segmentation, ln), this.reconstruct = cn(e.reconstruct), this.voice = qs(e.voice), this.pauseDuration = Q(e.pauseDuration, et.range), this.autoPause = F(e.autoPause, on), this.rate = Q(e.rate, tt.range), this.pitch = Q(e.pitch, nt.range), this.volume = Q(e.volume, st.range);
  }
  merging(e) {
    const t = { ...this };
    for (const s of Object.keys(e))
      e[s] !== void 0 && (t[s] = e[s]);
    return new me(t);
  }
}
class ae {
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
class Re extends ae {
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
    if (e != null && F(e, this._supportedValues) === void 0)
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
class yr extends ae {
  set value(e) {
    if (e != null && cn(e) === void 0)
      throw new Error(`Value '${String(e)}' is not a boolean.`);
    this._value = e, this._onChange(this._value);
  }
  get value() {
    return this._value;
  }
}
class Mn extends ae {
  set value(e) {
    if (e != null && Ve(e) === void 0)
      throw new Error(`Value '${String(e)}' is not an array of strings.`);
    this._value = e, this._onChange(this._value);
  }
  get value() {
    return this._value;
  }
}
class _e extends ae {
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
class jn {
  preferences;
  settings;
  // Cloned rather than aliased: edits made through this editor's setters
  // are staged on this copy and only reach the navigator's own preferences
  // once explicitly passed to submitPreferences() — discarding the editor
  // without submitting must leave the navigator untouched.
  constructor(e, t) {
    this.preferences = new me({ ...e }), this.settings = t;
  }
  // Explicit `null`s, not `undefined` — merging() skips `undefined` fields,
  // so only `null` actually clears them once submitted.
  clear() {
    this.preferences = new me({
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
    return new Re({
      initialValue: this.preferences.format,
      effectiveValue: this.settings.format,
      isEffective: this.preferences.format != null,
      onChange: (e) => this.updatePreference("format", e ?? null),
      supportedValues: rn
    });
  }
  get interruptions() {
    return new ae({
      initialValue: this.preferences.interruptions,
      effectiveValue: this.settings.interruptions,
      isEffective: this.preferences.interruptions != null,
      onChange: (e) => this.updatePreference("interruptions", e ?? null)
    });
  }
  get verbosity() {
    return new Re({
      initialValue: this.preferences.verbosity,
      effectiveValue: this.settings.verbosity,
      isEffective: this.preferences.verbosity != null,
      onChange: (e) => this.updatePreference("verbosity", e ?? null),
      supportedValues: sn
    });
  }
  get skip() {
    return new Mn({
      initialValue: this.preferences.skip,
      effectiveValue: this.settings.skip,
      isEffective: this.settings.verbosity === "custom" && this.preferences.skip != null,
      onChange: (e) => this.updatePreference("skip", e ?? null)
    });
  }
  get contextualize() {
    return new Mn({
      initialValue: this.preferences.contextualize,
      effectiveValue: this.settings.contextualize,
      isEffective: this.settings.verbosity === "custom" && this.preferences.contextualize != null,
      onChange: (e) => this.updatePreference("contextualize", e ?? null)
    });
  }
  get language() {
    return new Re({
      initialValue: this.preferences.language,
      effectiveValue: this.settings.language,
      isEffective: this.preferences.language != null,
      onChange: (e) => this.updatePreference("language", e ?? null),
      supportedValues: an
    });
  }
  get languageOverrides() {
    return new ae({
      initialValue: this.preferences.languageOverrides,
      effectiveValue: this.settings.languageOverrides,
      isEffective: this.preferences.languageOverrides != null,
      onChange: (e) => this.updatePreference("languageOverrides", e ?? null)
    });
  }
  get segmentation() {
    return new Re({
      initialValue: this.preferences.segmentation,
      effectiveValue: this.settings.segmentation,
      isEffective: this.preferences.segmentation != null,
      onChange: (e) => this.updatePreference("segmentation", e ?? null),
      supportedValues: ln
    });
  }
  get reconstruct() {
    return new yr({
      initialValue: this.preferences.reconstruct,
      effectiveValue: this.settings.reconstruct,
      isEffective: this.settings.segmentation === "sentence" && this.preferences.reconstruct != null,
      onChange: (e) => this.updatePreference("reconstruct", e ?? null)
    });
  }
  get voice() {
    return new ae({
      initialValue: this.preferences.voice,
      effectiveValue: this.settings.voice,
      isEffective: this.preferences.voice != null,
      onChange: (e) => this.updatePreference("voice", e ?? null)
    });
  }
  get pauseDuration() {
    return new _e({
      initialValue: this.preferences.pauseDuration,
      effectiveValue: this.settings.pauseDuration,
      isEffective: this.preferences.pauseDuration != null,
      onChange: (e) => this.updatePreference("pauseDuration", e ?? null),
      supportedRange: et.range,
      step: et.step
    });
  }
  get autoPause() {
    return new Re({
      initialValue: this.preferences.autoPause,
      effectiveValue: this.settings.autoPause,
      isEffective: this.preferences.autoPause != null,
      onChange: (e) => this.updatePreference("autoPause", e ?? null),
      supportedValues: on
    });
  }
  get rate() {
    return new _e({
      initialValue: this.preferences.rate,
      effectiveValue: this.settings.rate,
      isEffective: this.preferences.rate != null,
      onChange: (e) => this.updatePreference("rate", e ?? null),
      supportedRange: tt.range,
      step: tt.step
    });
  }
  get pitch() {
    return new _e({
      initialValue: this.preferences.pitch,
      effectiveValue: this.settings.pitch,
      isEffective: this.preferences.pitch != null,
      onChange: (e) => this.updatePreference("pitch", e ?? null),
      supportedRange: nt.range,
      step: nt.step
    });
  }
  get volume() {
    return new _e({
      initialValue: this.preferences.volume,
      effectiveValue: this.settings.volume,
      isEffective: this.preferences.volume != null,
      onChange: (e) => this.updatePreference("volume", e ?? null),
      supportedRange: st.range,
      step: st.step
    });
  }
}
const Hs = ["audio", "figure", "image", "math", "table", "video"], Ks = [
  ...Hs,
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
], Sr = [
  ...Ks,
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
], br = {
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
}, wr = {
  none: /* @__PURE__ */ new Set(),
  few: new Set(Hs),
  some: new Set(Ks),
  most: new Set(Sr)
}, Bt = {
  table: { few: "inline", some: "block", most: "block" }
};
function $e(n) {
  const e = {};
  for (const t of Object.keys(Bt))
    e[t] = Bt[t]?.[n] ?? "inline";
  return e;
}
const kr = {
  none: $e("none"),
  few: $e("few"),
  some: $e("some"),
  most: $e("most")
}, xl = Object.keys(Bt);
function Er(n, e) {
  const t = n === "custom" ? {} : kr[n];
  if (!e) return t;
  const s = { ...t };
  for (const i of Object.keys(e)) {
    const a = e[i]?.[n];
    a && (s[i] = a);
  }
  return s;
}
const Cr = (n, e) => {
  if (!n || typeof n == "object" && Object.keys(n).length === 0) return e;
  if (typeof n == "string" || !e || typeof e == "string") return n;
  const t = new Set(Object.keys(n).map(O)), s = { ...n };
  for (const [i, a] of Object.entries(e))
    t.has(O(i)) || (s[i] = a);
  return s;
};
class Et {
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
    this.format = e.format ?? t.format, this.interruptions = e.interruptions ?? t.interruptions, this.verbosity = e.verbosity ?? t.verbosity, this.verbosity === "custom" ? (this.skip = e.skip ?? t.skip, this.contextualize = e.contextualize ?? t.contextualize) : (this.skip = [...br[this.verbosity]], this.contextualize = [...wr[this.verbosity]]), this.language = e.language ?? t.language, this.languageOverrides = e.languageOverrides ?? t.languageOverrides, this.segmentation = e.segmentation ?? t.segmentation, this.reconstruct = e.reconstruct ?? t.reconstruct, this.voice = Cr(e.voice, t.voice), this.pauseDuration = e.pauseDuration ?? t.pauseDuration, this.autoPause = e.autoPause ?? t.autoPause, this.rate = e.rate ?? t.rate, this.pitch = e.pitch ?? t.pitch, this.volume = e.volume ?? t.volume;
  }
}
function vt(n) {
  return n.name.startsWith("readium:") ? n.attrs.get("id") : void 0;
}
function Ws(n) {
  return n.name === "sub" ? n.attrs.get("alias") : void 0;
}
const Oe = (n) => Ws(n) !== void 0, Rr = ({ node: n }) => n.kind === "text" ? n.text : "";
function Ir(n) {
  const e = B(n), t = ye(e), s = /* @__PURE__ */ new Map();
  if (t.forEach(({ node: a }, r) => {
    if (a.kind !== "element" || vt(a) === void 0) return;
    const o = t.slice(r + 1).map(Rr).join("").trimStart();
    s.set(a, o.length === 0 || ct(o) ? "" : " ");
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
  return ve(i(e)).replace(/ {2,}/g, " ").trim();
}
function Ar(n) {
  return n.includes("<");
}
function yt(n) {
  if (n === void 0) return;
  const e = {};
  n.language !== void 0 && (e.language = n.language);
  const t = n.ssml ? Ir(Xs(n.ssml, () => !0, n.language).ssml) : "";
  return Ar(t) && (e.ssml = t), n.plain ? e.plain = n.plain : t && !e.ssml && (e.plain = _(t)), e.plain || e.ssml ? e : void 0;
}
const Bn = /* @__PURE__ */ new WeakMap();
function Pr(n) {
  return n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function xr(n) {
  const e = Pr(n), t = /\w/.test(n[0]) ? "(?<!\\w)" : "", s = /\w/.test(n[n.length - 1]) ? "(?!\\w)" : "";
  return `${t}${e}${s}`;
}
function Lr(n, e) {
  if (typeof e == "string")
    return { regex: new RegExp(xr(n), "g"), replace: e };
  const t = e.pattern.flags.includes("g") ? e.pattern.flags : `${e.pattern.flags}g`;
  return { regex: new RegExp(e.pattern.source, t), replace: e.replace };
}
function Vr(n) {
  let e = Bn.get(n);
  return e || (e = Object.entries(n).map(([t, s]) => Lr(t, s)), Bn.set(n, e)), e;
}
function Qs(n, e) {
  const t = [];
  for (const a of Vr(e))
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
function Or(n, e) {
  let t = "";
  const s = [];
  let i = 0;
  for (const a of Qs(n, e)) {
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
function Dn(n, e) {
  return n.length ? e <= 0 ? n[0] : e >= n.length ? n[n.length - 1] + 1 : n[e] : e;
}
function Tr(n, e) {
  const t = he(n), s = t.plain, i = t.pieces.map(
    (S) => S.kind === "element" ? S : { start: S.start, end: S.start + (S.kind === "text" ? S.text.length : 1), chain: S.chain }
  ), a = Qs(s, e), r = i.filter((S) => "start" in S), o = (S) => r.find((v) => v.start <= S && S < v.end), l = new en();
  let c = "";
  const u = [];
  let h = 0;
  const d = (S, v) => {
    c += S.replacement;
    for (let E = 0; E < S.replacement.length; E++) u.push(S.start);
    l.text(v, S.replacement);
  };
  for (const S of i) {
    if ("node" in S) {
      l.node(S.chain, S.node);
      continue;
    }
    let v = S.start;
    for (; v < S.end; ) {
      const E = a[h];
      if (E && E.start <= v) {
        E.start === v && d(E, E.end > E.start ? pt(S.chain, o(E.end - 1).chain) : S.chain), v = Math.min(E.end, S.end), E.end <= S.end && h++;
        continue;
      }
      const w = E ? Math.min(E.start, S.end) : S.end, I = s.slice(v, w);
      c += I;
      for (let z = 0; z < I.length; z++) u.push(v + z);
      l.text(S.chain, I), v = w;
    }
  }
  for (const S of a.slice(h)) d(S, r[r.length - 1]?.chain ?? []);
  const g = l.flush();
  let m = 0;
  for (; m < s.length && /\s/.test(s[m]); ) m++;
  let y = s.length;
  for (; y > m && /\s/.test(s[y - 1]); ) y--;
  let f = 0;
  for (; f < c.length && /\s/.test(c[f]); ) f++;
  let k = c.length;
  for (; k > f && /\s/.test(c[k - 1]); ) k--;
  const b = s.slice(m, y), P = u.slice(f, k).map((S) => Math.min(Math.max(S - m, 0), Math.max(b.length - 1, 0)));
  return { ssml: g, plain: b, map: P };
}
function Js(n) {
  return [...ue(B(n))].some((e) => te(e) !== void 0);
}
const Ur = new RegExp(
  `\\s+|[${Qe}]+|[${Ie}]+|[^\\s${Qe}${Ie}]+`,
  "gu"
);
function Nr(n) {
  const e = [];
  for (const [t] of n.matchAll(Ur))
    /^\s/.test(t) ? e.push({ kind: "space" }) : Oa(t) ? e.push({ kind: "open", text: t }) : ct(t) ? e.push({ kind: "close", text: t }) : e.push({ kind: "word", text: t });
  return e;
}
function zr(n) {
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
function Mr(n) {
  let e = n.length;
  for (; e > 0 && (n[e - 1].kind === "space" || n[e - 1].kind === "open"); ) e--;
  return n.slice(e).some((t) => t.kind === "open") ? n.splice(e) : [];
}
function jr(n) {
  let e = 0;
  for (; e < n.length && (n[e].kind === "space" || n[e].kind === "close"); ) e++;
  return n.slice(0, e).some((t) => t.kind === "close") ? n.splice(0, e) : [];
}
function hn(n, e) {
  const t = [];
  for (const { node: r, ancestors: o } of ye(B(n))) {
    let l = o.length - 1;
    for (; l >= 0 && te(o[l]) === void 0; ) l--;
    const c = l === -1 ? void 0 : o[l];
    if (t.length === 0 || t[t.length - 1].lang !== c) {
      const d = o.filter((g) => te(g) !== void 0);
      t.push({ lang: c, langs: d, writer: new en() });
    }
    const { writer: u } = t[t.length - 1], h = o.slice(l + 1);
    r.kind === "text" ? u.text(h, r.text) : u.node(h, r);
  }
  const s = t.map(({ lang: r, langs: o, writer: l }) => ({
    tokens: Nr(zs(l.flush())),
    language: r ? te(r) : e,
    langs: o
  })), i = (r, o) => r.langs.length > o.langs.length && o.langs.every((l, c) => r.langs[c] === l);
  for (let r = 0; r < s.length - 1; r++)
    i(s[r + 1], s[r]) ? s[r + 1].tokens.unshift(...Mr(s[r].tokens)) : i(s[r], s[r + 1]) && s[r].tokens.push(...jr(s[r + 1].tokens));
  const a = [];
  for (const r of s) {
    const o = zr(r.tokens);
    o && a.push({ plain: o, language: r.language });
  }
  return a;
}
const Br = /[\p{L}\p{M}\p{N}\p{Pd}]+$/u, Dr = /^[\p{L}\p{M}\p{N}\p{Pd}]+/u;
let Fr;
const Zs = (n) => (Fr ??= new Intl.Segmenter("und", { granularity: "word" })).segment(n);
function _r(n, e) {
  if (!n || !e || new RegExp("^\\p{Pd}", "u").test(e)) return e;
  if (Is(n, e)) return "";
  if (typeof Intl.Segmenter != "function") return e;
  const { index: t, segment: s } = Zs(n + e).containing(n.length - 1);
  return e.slice(0, Math.max(0, t + s.length - n.length));
}
function $r(n, e) {
  if (!e || !n || new RegExp("\\p{Pd}$", "u").test(n)) return n;
  if (Is(n, e)) return "";
  if (typeof Intl.Segmenter != "function") return n;
  const { index: t } = Zs(n + e).containing(n.length);
  return n.slice(Math.min(n.length, t));
}
function Fn(n) {
  return [...ue(B(n))].some((e) => vt(e) !== void 0 || Oe(e));
}
function Xs(n, e, t) {
  const s = B(n), { chars: i, removed: a } = ei(s, e, t), r = /* @__PURE__ */ new Set();
  i.forEach(({ char: l, id: c }, u) => {
    if (l === Zt)
      for (const h of [-1, 1])
        for (let d = u + h; i[d] && (a[d] || /\s/.test(i[d].char)); d += h)
          a[d] || r.add(c);
  });
  const o = /* @__PURE__ */ new Map();
  if (i.forEach(({ char: l, node: c, index: u }, h) => {
    !a[h] || !c || /\s/.test(l) || (o.has(c) || o.set(c, /* @__PURE__ */ new Set()), o.get(c).add(u));
  }), o.size === 0) return { ssml: n, spaced: r };
  for (const [l, c] of o) l.text = l.text.split("").filter((u, h) => !c.has(h)).join("");
  return { ssml: ve(Ys(s)), spaced: r };
}
function Ys(n) {
  return n.flatMap((e) => {
    if (e.kind === "text") return e.text ? [e] : [];
    if (e.children.length === 0) return [e];
    const t = Ys(e.children);
    return t.length > 0 ? [{ ...e, children: t }] : [];
  });
}
function Gr(n, e) {
  const { chars: t, removed: s } = ei(B(n), () => !0, e), i = (r, o) => {
    for (let l = r + o; l >= 0 && l < t.length; l += o) if (t[l].id === void 0 && !/\s/.test(t[l].char)) return l;
    return -1;
  }, a = /* @__PURE__ */ new Set();
  return t.forEach(({ id: r }, o) => {
    const [l, c] = [i(o, -1), i(o, 1)];
    r !== void 0 && l !== -1 && c !== -1 && s[l] && s[c] && a.add(r);
  }), a;
}
function ei(n, e, t) {
  const s = [];
  for (const { node: o } of ye(n, Oe)) {
    if (o.kind === "text") {
      for (let c = 0; c < o.text.length; c++) s.push({ char: o.text[c], node: o, index: c });
      continue;
    }
    const l = vt(o);
    (l !== void 0 || Oe(o)) && s.push({ char: l !== void 0 && e(l) ? Zt : "￼", id: l });
  }
  const i = ds(s.map(({ char: o }) => o).join(""), t);
  let a = 0;
  const r = s.map(({ char: o }) => a < i.length && o === i[a] ? (a++, !1) : !0);
  return { chars: s, removed: r };
}
function qr(n, e) {
  return ds(`x ${Zt}${n}`, e).startsWith("x ");
}
function Hr(n, e) {
  const t = [];
  for (const { node: s, ancestors: i } of ye(e, Oe)) {
    if (s.kind !== "element") continue;
    const a = vt(s);
    if (a !== void 0 && t.push({ start: s.start, end: s.end, placeholderId: a }), !Oe(s)) continue;
    let r = i.length;
    for (; r > 0 && i[r - 1].children.length === 1 && !Vs(i[r - 1]); ) r--;
    const o = i.slice(r);
    t.push({
      start: o[0]?.start ?? s.start,
      end: o[0]?.end ?? s.end,
      alias: Ws(s),
      inner: n.slice(s.start + s.openTag.length, s.closeStart),
      wrapOpen: o.map((l) => l.openTag).join(""),
      wrapClose: o.map(ft).reverse().join("")
    });
  }
  return t;
}
function Dt(n) {
  const e = B(n), t = Ns(he(n).pieces), s = [...ue(e)].filter((h) => !h.selfClosing), i = (h) => s.filter((d) => d.start < h && h <= d.closeStart), a = (h, d) => ({ open: i(h), close: i(d) }), r = [];
  let o = 0, l = !1;
  const c = (h, d) => {
    const g = n.slice(h, d), m = g.trim();
    if (!m) return;
    const y = h + g.length - g.trimStart().length, f = { ssml: m, ...a(y, y + m.length) };
    r.push(l && !/^\s/.test(t(h, d)) ? { ...f, touchesPrevious: !0 } : f);
  }, u = Hr(n, e);
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
    const m = _(h.inner), y = $r(n.slice(o, h.start).match(Br)?.[0] ?? "", m), f = _r(m, g.match(Dr)?.[0] ?? ""), k = t(o, h.start - y.length);
    c(o, h.start - y.length);
    const b = k.trim() !== "" && !/\s$/.test(k), P = (w) => `${h.wrapOpen}${w}${h.wrapClose}`, S = (w) => P(`${y}${w}${f}`), v = a(h.start, h.end), E = oe(h.alias);
    r.push({ ssml: S(h.inner), ...v, abbreviation: "text", ...b && { touchesPrevious: b } }), r.push({
      ssml: S(E),
      ...v,
      abbreviation: "alias",
      abbreviationText: S(h.inner),
      parenthesizedSsml: P(`(${E})`),
      ...b && { touchesPrevious: b }
    }), l = !0, o = h.end + f.length;
  }), c(o, n.length), r;
}
const Ct = /* @__PURE__ */ new WeakMap(), ti = /* @__PURE__ */ new WeakMap();
function _n(n, e) {
  ti.set(n, e);
}
const He = /* @__PURE__ */ new WeakSet();
function Ft(n) {
  return He.add(n), n;
}
const ni = /* @__PURE__ */ new WeakMap();
function Kr(n, e) {
  ni.set(n, e);
}
const $n = (n) => n.replace(/\s/g, " ");
function Wr(n, e, t) {
  const s = ti.get(n);
  if (s) {
    const h = Dn(s.map, e), d = Dn(s.map, e + t);
    e = h, t = Math.max(0, d - h);
  }
  const i = n.offsets, a = !n.plain && !!n.ssml, r = $n(s?.plain ?? n.plain ?? (n.ssml ? _(n.ssml) : ""));
  if (!i?.length || !r) return;
  const o = Ct.get(n), l = o !== void 0 && e >= o.cursor;
  let c = l ? o.cursor : 0;
  const u = (h) => {
    const d = h.locate.text?.highlight;
    return d && $n(a ? _(d) : d);
  };
  for (let h = l ? o.pieceIndex : 0; h < i.length; h++) {
    const d = i[h];
    if (He.has(d.locate)) {
      const f = ni.get(d), k = i.slice(h + 1).find((I) => !He.has(I.locate) && u(I)), b = k && u(k), P = b ? r.indexOf(b, c + (f ?? d.end - d.start)) : -1, S = b && P === -1 ? r.indexOf(b, c) : P, v = i[h + 1], E = c + /^\s*/.exec(r.slice(c))[0].length, w = f !== void 0 && v && He.has(v.locate) ? E + f : S === -1 ? r.length : S;
      if (e >= c && e < w)
        return f === void 0 ? void 0 : (Ct.set(n, { pieceIndex: h, cursor: c }), { locate: d.locate, word: r.substring(e, Math.min(e + t, w)) });
      c = w;
      continue;
    }
    const g = u(d) ?? r.slice(c);
    if (!g) continue;
    const m = r.indexOf(g, c);
    if (m === -1) continue;
    const y = m + g.length;
    if (e >= m && e < y) {
      Ct.set(n, { pieceIndex: h, cursor: c });
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
    c = y;
  }
}
function Qr(n, e) {
  return e === "sentence" && n.offsets?.length ? n.offsets.map((t) => t.locate) : n.locate ? [n.locate] : [];
}
function $(n) {
  return { pattern: new RegExp(`(\\d+)\\s?u${n}\\b`, "g"), replace: (e, t) => `${t}µ${n}` };
}
const Jr = {
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
}, Zr = {
  ...Jr,
  // Rejects "(c)" directly preceded by "(a)"/"(b)" (a lettered list, not a copyright notice).
  "(c)": { pattern: new RegExp("(?<!\\([ab]\\)\\s{0,3})\\(c\\)", "g"), replace: "©" },
  "(C)": { pattern: new RegExp("(?<!\\([AB]\\)\\s{0,3})\\(C\\)", "g"), replace: "©" },
  "(r)": "®",
  "(R)": "®",
  "(tm)": "™",
  "(TM)": "™",
  deg: { pattern: /(\d+)\s?deg\b/g, replace: (n, e) => `${e}°` },
  x: { pattern: /(\d+)\s?[xX]\s?(?=\d)/g, replace: (n, e) => `${e}×` },
  ug: $("g"),
  um: $("m"),
  us: $("s"),
  uL: $("L"),
  uF: $("F"),
  uA: $("A"),
  uV: $("V"),
  uW: $("W"),
  uN: $("N"),
  umol: $("mol"),
  "->": "→",
  "<-": "←",
  // Reversed from every other entry: engines pattern-match the ASCII foot/inch
  // convention for pronunciation, but drop the real prime marks silently.
  "′": "'",
  "″": '"'
};
function N(n) {
  return n.role ? [...n.role] : [];
}
const Gn = /* @__PURE__ */ new WeakMap();
function Xr(n, e) {
  if (e.selfClosing) return "";
  const t = tn(n, (s) => s.start === e.start);
  return t.slice(e.start + e.openTag.length, e.closeStart + t.length - n.length);
}
function Yr(n) {
  const e = tn(n, (r) => r.name === "p" || r.name === "s"), t = [];
  for (const r of ue(B(e))) {
    if (r.name !== "p" && r.name !== "s") continue;
    const o = r.attrs.get("xml:lang"), l = o === void 0 ? void 0 : `<lang xml:lang="${Ne(o)}">`;
    if (r.selfClosing) {
      t.push({ start: r.start, end: r.end, text: "", opens: !1 });
      continue;
    }
    t.push({ start: r.start, end: r.start + r.openTag.length, text: l ?? "", opens: !0 }), t.push({ start: r.closeStart, end: r.end, text: l ? "</lang>" : "", opens: !1 });
  }
  if (!t.length) return e;
  t.sort((r, o) => r.start - o.start);
  const s = Ns(he(e).pieces);
  let i = "", a = 0;
  for (let r = 0; r < t.length; ) {
    let o = r + 1;
    for (; o < t.length && t[o].start === t[o - 1].end; ) o++;
    const l = t.slice(r, o);
    i += e.slice(a, l[0].start);
    const c = l.findIndex((d) => d.opens), [u, h] = c === -1 ? [l, []] : [l.slice(0, c), l.slice(c)];
    a = l[l.length - 1].end, i += u.map((d) => d.text).join(""), Us(s(0, l[0].start), s(a, e.length)) && (i += " "), i += h.map((d) => d.text).join(""), r = o;
  }
  return i + e.slice(a);
}
function Se(n) {
  if (!n?.ssml) return n;
  let e = Gn.get(n);
  if (!e) {
    const t = Yr(n.ssml), s = B(t).filter((r) => r.kind === "element" || r.text.trim() !== ""), i = s.length === 1 && s[0].kind === "element" && s[0].name === "speak" ? s[0] : void 0, a = i ? Xr(t, i) : t;
    e = a !== n.ssml ? new Qi({ plain: n.plain, ssml: a, language: n.language ?? i?.attrs.get("xml:lang") }) : n, Gn.set(n, e);
  }
  return e;
}
function it(n) {
  return n.role?.has("math") ? void 0 : Se(n.text);
}
function St(n) {
  const e = Se(n.description?.text);
  if (e)
    return e.plain ?? (e.ssml !== void 0 ? _(e.ssml) : void 0);
}
function si(n) {
  return Se(n.description?.text)?.language;
}
const eo = { contextualizations: { abstract: { block: { start: "Start of the abstract.", end: "End of the abstract." } }, acknowledgments: { block: { start: "Start of the acknowledgments.", end: "End of the acknowledgments." } }, afterword: { block: { start: "Start of the afterword.", end: "End of the afterword." } }, appendix: { block: { start: "Start of the appendix.", end: "End of the appendix." } }, aside: { block: { start: "Start of the aside.", end: "End of the aside." } }, audio: { inline: { labelled: "Audio with a label: {{ description }}", unlabelled: "Audio with no label." } }, bibliography: { block: { start: "Start of the bibliography.", end: "End of the bibliography." } }, biblioref: { inline: "Bibliographic reference." }, blockquote: { inline: "Blockquote." }, cell: { inline: { withHeader: "{{ header }}: {{ value }}", withoutHeader: "{{ value }}" } }, chapter: { block: { start: "Start of the chapter.", end: "End of the chapter." } }, colophon: { inline: "Colophon." }, complementary: { block: { start: "Start of the complementary content.", end: "End of the complementary content." } }, conclusion: { block: { start: "Start of the conclusion.", end: "End of the conclusion." } }, cover: { inline: { labelled: "Cover with a label: {{ description }}", unlabelled: "Cover with no label." } }, credit: { inline: "Credit." }, credits: { block: { start: "Start of the credits.", end: "End of the credits." } }, dedication: { inline: "Dedication." }, definition: { inline: "Definition." }, details: { block: { start: "Start of the disclosure.", end: "End of the disclosure." } }, endnotes: { block: { start: "Start of the endnotes.", end: "End of the endnotes." } }, epigraph: { inline: "Epigraph." }, epilogue: { block: { start: "Start of the epilogue.", end: "End of the epilogue." } }, errata: { block: { start: "Start of the errata.", end: "End of the errata." } }, example: { block: { start: "Start of the example.", end: "End of the example." } }, figure: { inline: "Figure: {{ description }}" }, footnote: { block: { start: "Start of the footnote.", end: "End of the footnote." } }, foreword: { block: { start: "Start of the foreword.", end: "End of the foreword." } }, glossary: { block: { start: "Start of the glossary.", end: "End of the glossary." } }, glossref: { inline: "Glossary definition.", term: "{{ term }}: {{ value }}" }, heading1: { inline: "Heading level 1." }, heading2: { inline: "Heading level 2." }, heading3: { inline: "Heading level 3." }, heading4: { inline: "Heading level 4." }, heading5: { inline: "Heading level 5." }, heading6: { inline: "Heading level 6." }, image: { inline: { labelled: "Image with a label: {{ description }}", unlabelled: "Image with no label." } }, index: { block: { start: "Start of the index.", end: "End of the index." } }, introduction: { block: { start: "Start of the introduction.", end: "End of the introduction." } }, list: { block: { start: "Start of the list.", end: "End of the list." } }, listItem: { inline: "List item." }, math: { inline: { labelled: "{{ description }}", unlabelled: "Math formula with no label." } }, notice: { inline: "Notice." }, pagebreak: { inline: "Pagebreak.", number: "Page {{ number }}" }, pagelist: { block: { start: "Start of the page list.", end: "End of the page list." } }, part: { inline: "Part." }, preface: { block: { start: "Start of the preface.", end: "End of the preface." } }, prologue: { block: { start: "Start of the prologue.", end: "End of the prologue." } }, pullquote: { inline: "Pullquote." }, qna: { block: { start: "Start of the questions and answers.", end: "End of the questions and answers." } }, row: { inline: "Row: {{ count }}" }, rowheader: { inline: { withHeader: "{{ header }}: {{ value }}", withoutHeader: "{{ value }}" } }, separator: { inline: "Separator." }, subtitle: { inline: "Subtitle." }, summary: { inline: "Summary." }, table: { block: { end: "End of the table.", start: { labelled: "Table: {{ description }}. {{ lines }}. {{ columns }}.", unlabelled: "Table. {{ lines }}. {{ columns }}." } }, inline: { labelled: "Table: {{ description }}. {{ lines }}. {{ columns }}.", unlabelled: "Table. {{ lines }}. {{ columns }}." }, parts: { columns_one: "1 column", columns_other: "{{ count }} columns", lines_one: "1 line", lines_other: "{{ count }} lines" } }, term: { inline: "Term." }, tip: { inline: "Tip." }, video: { inline: { labelled: "Video with a label: {{ description }}", unlabelled: "Video with no label." } } } }, to = {
  speech: eo
}, ii = to.speech.contextualizations, _t = { en: ii }, ai = {};
function no(n) {
  return _t[n] || ai[n] ? n : "en";
}
async function so(n) {
  const e = _t[n];
  if (e) return e;
  const t = ai[n];
  if (!t) return ii;
  const s = (await t()).speech.contextualizations;
  return _t[n] = s, s;
}
const io = {
  de: ["A.", "A.M.", "Abs.", "Abt.", "Abw.", "Adj.", "Adr.", "Akt.", "Allg.", "Alt.", "App.", "Apr.", "Art.", "Aug.", "Ausg.", "Ausschl.", "B.", "Bed.", "Ben.", "Ber.", "Best.", "Bibl.", "C.", "Ca.", "Chin.", "Chr.", "Co.", "D.", "D. h.", "Dat.", "Dez.", "Di.", "Dim.", "Dipl.-Ing.", "Dipl.-Kfm.", "Dir.", "Do.", "Dr.", "Dtzd.", "Einh.", "Erf.", "Evtl.", "F.", "F.f.", "Fa.", "Fam.", "Feb.", "Fn.", "Folg.", "Forts. f.", "Fr.", "Frl.", "G.", "Gebr.", "Gem.", "Geograph.", "Ges.", "Gesch.", "Ggf.", "Hbf.", "Hptst.", "Hr.", "Hrn.", "Hrsg.", "I.", "Inc.", "Ing.", "Inh.", "Int.", "J.", "J.D.", "Jahrh.", "Jan.", "Jr.", "Kap.", "Kfm.", "Kl.", "Konv.", "Kop.", "L.", "Ltd.", "M.", "Max.", "Mi.", "Min.", "Mind.", "Mio.", "Mo.", "Mod.", "Mrd.", "Msp.", "N.", "Nov.", "Nr.", "O.", "Obj.", "Okt.", "Op.", "P.", "P.M.", "PIN.", "Pfd.", "Phys.", "Port.", "Prot.", "Proz.", "Qu.", "R.", "Rd.", "Reg.", "Reg.-Bez.", "Rel.", "Rep.", "S.A.", "Sa.", "Schr.", "Sek.", "Sep.", "Sept.", "So.", "Spezif.", "St.", "StR.", "Std.", "Str.", "T.", "Tel.", "Temp.", "Test.", "Trans.", "Tägl.", "U.", "U. U.", "U.S.", "U.S.A.", "U.U.", "Urspr.", "Ursprüngl.", "Verf.", "Vgl.", "W.", "Wg.", "Y.", "Z.", "Z. B.", "Z. Zt.", "Ztr.", "a.D.", "a.M.", "a.Rh.", "a.a.O.", "a.a.S.", "am.", "amtl.", "b.", "beil.", "d.J.", "d.Ä.", "e.V.", "e.Wz.", "e.h.", "ehem.", "eigtl.", "einschl.", "entspr.", "erw.", "ev.", "evtl.", "exkl.", "frz.", "geb.", "gedr.", "gek.", "gesch.", "gest.", "ggf.", "ggfs.", "hpts.", "i.A.", "i.B.", "i.H.", "i.J.", "i.R.", "i.V.", "inkl.", "jew.", "jhrl.", "k. u. k.", "k.u.k.", "kath.", "kfm.", "kgl.", "led.", "m.E.", "m.W.", "mtl.", "möbl.", "n. Chr.", "n.u.Z.", "näml.", "o.A.", "o.B.", "o.g.", "od.", "p.Adr.", "r.", "röm.", "röm.-kath.", "s.", "s.a.", "schles.", "schweiz.", "schwäb.", "sog.", "südd.", "tägl.", "u.", "u. Z.", "u.A.w.g.", "u.U.", "u.a.", "u.v.a.", "u.Ä.", "u.ä.", "v. Chr.", "v. H.", "v. u. Z.", "v.Chr.", "v.H.", "v.R.w.", "v.T.", "v.u.Z.", "verh.", "verw.", "vgl.", "z.", "z.B.", "z.Hd.", "z.Z.", "zzgl.", "österr."],
  en: ["A.D.", "A.I.", "A.M.", "A.S.", "AA.", "AB.", "Abs.", "Adj.", "Adv.", "Alt.", "Approx.", "Aug.", "B.V.", "C.F.", "C.O.D.", "Capt.", "Col.", "Comm.", "Conn.", "Cont.", "D.A.", "D.C.", "DC.", "DR.", "Dec.", "Def.", "Dept.", "Diff.", "Dr.", "E.G.", "E.g.", "Ed.", "Est.", "Etc.", "Ex.", "Exec.", "Feb.", "Fn.", "Fri.", "Hon.B.A.", "I.", "I.D.", "I.T.", "I.e.", "J.B.", "J.D.", "J.K.", "Jan.", "Jun.", "K.R.", "L.A.", "L.P.", "Lev.", "Lib.", "Lt.", "Lt.Cdr.", "M.", "M.I.T.", "M.R.", "M.T.", "MR.", "Maj.", "Mar.", "Mart.", "Mb.", "Md.", "Mgr.", "Min.", "Misc.", "Mr.", "Mrs.", "Ms.", "Mt.", "N.V.", "N.Y.", "Nov.", "Nr.", "Num.", "Op.", "Org.", "P.M.", "P.O.", "P.V.", "PP.", "Ph.D.", "Phys.", "Prof.", "Pvt.", "R.L.", "R.T.", "Rep.", "Rev.", "S.A.", "S.A.R.", "S.E.", "S.p.A.", "Sep.", "Sept.", "Sgt.", "Sq.", "St.", "U.S.", "U.S.A.", "U.S.C.", "VS.", "Yr.", "a.m.", "d.", "dr.", "exec.", "pp.", "vs."],
  es: ["A.C.", "AA.", "All.", "Ant.", "Av.", "Avda.", "Bien.", "C.", "C.P.", "C.S.", "C.V.", "CA.", "Col.", "Comm.", "Corp.", "Cía.", "D.", "DC.", "Da.", "Desc.", "Desv.", "Dr.", "Dra.", "Drs.", "Dto.", "Dª.", "Dña.", "Em.", "Emm.", "Exc.", "Excma.", "Excmas.", "Excmo.", "Excmos.", "Exma.", "Exmas.", "Exmo.", "Exmos.", "FF.CC.", "Fabric.", "Fr.", "H.P.", "Id.", "Ilma.", "Ilmas.", "Ilmo.", "Ilmos.", "Inc.", "JJ.OO.", "K.", "Kit.", "Korn.", "L.", "Lcda.", "Lcdo.", "Lda.", "Ldo.", "Lic.", "Ltd.", "Ltda.", "Ltdo.", "M.", "MM.", "Mons.", "Mr.", "Mrs.", "O.M.", "PP.", "R.D.", "R.U.", "RAM.", "RR.HH.", "Rdo.", "Rdos.", "Reg.", "Rev.", "Rol.", "Rvdmo.", "Rvdmos.", "Rvdo.", "Rvdos.", "SA.", "SS.AA.", "SS.MM.", "Sdad.", "Seg.", "Sol.", "Sr.", "Sra.", "Sras.", "Sres.", "Srta.", "Srtas.", "Sta.", "Sto.", "Trab.", "U.S.", "U.S.A.", "Var.", "Vda.", "a. C.", "a. e. c.", "abr.", "afma.", "afmas.", "afmo.", "afmos.", "ago.", "bco.", "bol.", "c/c.", "cap.", "cf.", "cfr.", "col.", "d. C.", "depto.", "deptos.", "dic.", "doc.", "dom.", "dpto.", "dptos.", "dtor.", "e. c.", "e.g.", "ed.", "ej.", "ene.", "feb.", "fig.", "figs.", "fund.", "hnos.", "jue.", "jul.", "jun.", "licda.", "licdo.", "lun.", "mar.", "may.", "mié.", "ms.", "mss.", "mtro.", "nov.", "ntra.", "ntro.", "oct.", "p.ej.", "prof.", "prov.", "sept.", "sras.", "sres.", "srs.", "ss.", "sáb.", "trad.", "v.gr.", "vid.", "vie.", "vs."],
  fr: ["All.", "C.", "Comm.", "D.", "DC.", "Desc.", "Inc.", "Jr.", "L.", "M.", "MM.", "Mart.", "Op.", "P.", "P.-D. G.", "P.O.", "Prof.", "S.A.", "S.M.A.R.T.", "U.", "U.S.", "U.S.A.", "Var.", "W.", "acoust.", "adr.", "anc.", "ann.", "anon.", "ap. J.-C.", "append.", "aux.", "av. J.-C.", "avr.", "broch.", "bull.", "cam.", "categ.", "coll.", "collab.", "config.", "dest.", "dict.", "dim.", "dir.", "doc.", "déc.", "encycl.", "exempl.", "fig.", "févr.", "gouv.", "graph.", "hôp.", "ill.", "illustr.", "imm.", "imprim.", "indus.", "janv.", "jeu.", "juil.", "lun.", "mar.", "mer.", "niv.", "nov.", "oct.", "quart.", "réf.", "sam.", "sept.", "symb.", "synth.", "syst.", "trav. publ.", "ven.", "voit.", "éd.", "édit.", "équiv.", "éval."],
  it: ["C.P.", "Cfr.", "D.", "DC.", "Geom.", "Ing.", "L.", "Liv.", "Ltd.", "Mod.", "N.B.", "N.d.A.", "N.d.E.", "N.d.T.", "O.d.G.", "S.A.R.", "S.M.A.R.T.", "S.p.A.", "Sig.", "U.S.", "U.S.A.", "a.C.", "ag.", "all.", "arch.", "avv.", "c.c.p.", "d.C.", "d.p.R.", "div.", "dott.", "dr.", "fig.", "int.", "mitt.", "on.", "p.", "p.i.", "pag.", "rag.", "sez.", "tab.", "tav.", "ver.", "vol."],
  pt: ["A.C.", "Alm.", "Av.", "Dir.", "Dr.", "Dra.", "Dras.", "Drs.", "E.", "Est.", "Exma.", "Exmo.", "Fr.", "Ilma.", "Ilmo.", "Jr.", "Ltd.", "Ltda.", "Mar.", "N.Sra.", "N.T.", "P.M.", "Pe.", "Ph.D.", "R.", "S.", "S.A.", "Sta.", "Sto.", "V.T.", "W.C.", "a.C.", "a.m.", "abr.", "abrev.", "adm.", "aer.", "ago.", "agric.", "anat.", "ap.", "apart.", "apt.", "arit.", "arqueol.", "arquit.", "astron.", "autom.", "aux.", "biogr.", "bras.", "cap.", "caps.", "cat.", "cel.", "cf.", "col.", "com.", "comp.", "compl.", "cont.", "contab.", "créd.", "cx.", "círc.", "cód.", "d.C.", "des.", "desc.", "dez.", "dipl.", "dir.", "div.", "doc.", "déb.", "ed.", "educ.", "elem.", "eletr.", "eletrôn.", "end.", "eng.", "esp.", "ex.", "f.", "fac.", "fasc.", "fem.", "fev.", "ff.", "fig.", "fil.", "filos.", "fisiol.", "fl.", "fot.", "fr.", "fís.", "geom.", "gram.", "gên.", "hist.", "ind.", "ingl.", "jan.", "jul.", "jun.", "jur.", "l.", "lat.", "lin.", "lit.", "liter.", "long.", "mai.", "mar.", "mat.", "matem.", "mov.", "máq.", "méd.", "mús.", "neol.", "nov.", "náut.", "obs.", "odont.", "odontol.", "org.", "organiz.", "out.", "p.", "p. ex.", "p.m.", "pal.", "pol.", "port.", "pp.", "pq.", "prod.", "prof.", "profa.", "pron.", "próx.", "psicol.", "pág.", "quím.", "r.s.v.p.", "ref.", "rel.", "relat.", "rep.", "res.", "rod.", "set.", "sociol.", "sup.", "séc.", "símb.", "tec.", "tecnol.", "tel.", "trad.", "transp.", "univ.", "vol.", "vs.", "álg.", "índ."],
  ru: ["авг.", "апр.", "дек.", "до н. э.", "кв.", "н. э.", "н.э.", "нояб.", "окт.", "отд.", "проф.", "руб.", "сент.", "тел.", "тыс.", "ул.", "февр.", "янв."],
  th: ["ค.ศ."]
};
function Rt(n, e, t) {
  let s = t;
  for (; s > e && /\s/.test(n[s - 1]); ) s--;
  return s;
}
const ao = /[\s([{"'“‘]/;
function ro(n, e) {
  for (const t of e) {
    if (n.length < t.length || !n.endsWith(t)) continue;
    const s = n.length - t.length - 1;
    if (s < 0 || ao.test(n[s])) return !0;
  }
  return !1;
}
function oo(n) {
  let e = 0;
  for (const t of n)
    if (new RegExp("\\p{L}", "u").test(t) && e++, e >= 2) return !0;
  return !1;
}
function lo(n) {
  return /\.{3,}$/.test(n);
}
function co(n, e, t, s) {
  if (s === "“") return !0;
  if (s !== '"') return !1;
  let i = 0;
  for (let a = e; a < t; a++) n[a] === '"' && i++;
  return i % 2 === 1;
}
const uo = new RegExp(`[.!?][”"'’)\\]]*\\s+—\\s+(?=\\p{Lu})`, "gu");
function ho(n, e) {
  const t = [...n.matchAll(uo)].map((i) => i.index + i[0].length);
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
const go = { "»": "«", "«": "»", "›": "‹", "‹": "›" };
function fo(n, e) {
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
      const u = go[n[c]];
      if (u === void 0 || a(l.end, u) <= a(l.end, n[c])) break;
      for (c++; c < o.end && /\s/.test(n[c]); ) c++;
      l.end = o.start = c;
    }
    o.start < o.end ? t.push(o) : l && (l.end = o.end);
  }
  return t;
}
function po(n, e, t) {
  const s = fo(n, ho(n, e));
  for (let a = 0; a < s.length - 1; a++) {
    const r = Rt(n, s[a].start, s[a].end);
    if (r !== s[a].end || r <= s[a].start) continue;
    const o = n[r - 1];
    co(n, s[a].start, r, o) && (s[a].end -= 1, s[a + 1].start -= 1);
  }
  const i = [];
  for (const a of s) {
    let r = a;
    for (; i.length > 0; ) {
      const o = i[i.length - 1], l = Rt(n, o.start, o.end), c = n.slice(o.start, l);
      if (!ro(c, t) && oo(c) && !lo(c)) break;
      i.pop(), r = { start: o.start, end: r.end };
    }
    i.push(r);
  }
  return i.map((a) => {
    const r = Rt(n, a.start, a.end);
    return { text: n.slice(a.start, r), start: a.start, end: a.end, contentEnd: r };
  });
}
function ri(n, e, t) {
  const s = [];
  let i;
  return e.forEach((a, r) => {
    i ??= a;
    const o = e[r + 1];
    o && t(a, o) || (s.push({ text: n.slice(i.start, a.contentEnd), start: i.start, end: a.end, contentEnd: a.contentEnd }), i = void 0);
  }), s;
}
const qn = /* @__PURE__ */ new Map();
function oi(n) {
  let e = qn.get(n);
  if (!e) {
    try {
      const [t, s] = L(n), i = s ? `${t}-${s}` : t;
      e = { segmenter: new Intl.Segmenter(i, { granularity: "sentence" }), language: n };
    } catch {
      e = { segmenter: new Intl.Segmenter("en", { granularity: "sentence" }), language: "en" };
    }
    qn.set(n, e);
  }
  return e;
}
function mo(n) {
  return oi(n).language;
}
function bt(n, e) {
  const t = e.segmenter === li ? mo(n) : n;
  return gs(e.segmentationSuppressions, t);
}
async function li(n, e, t) {
  if (e === "") return [];
  const { segmenter: s, language: i } = oi(n), r = [...s.segment(e)].map((c) => ({ start: c.index, end: c.index + c.segment.length })), o = gs(io, i) ?? [], l = t ? [...o, ...t] : o;
  return po(e, r, l);
}
const Ll = [
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
], vo = [
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
], yo = {
  footnote: { drops: ["aside"], unconditional: !0 },
  cover: { drops: ["image"] },
  pullquote: { drops: ["blockquote", "aside"] },
  epigraph: { drops: ["blockquote"] }
}, So = ["abbreviation", "biblioref", "glossref", "noteref", "pagebreak"], bo = ["biblioref", "glossref"], wo = ["audio", "video", "image", "figure", "math", "table", "cover"], ko = ["cell", "rowheader"], Eo = ["separator"], Pe = new Set(So), Co = new Set(wo), ci = new Set(ko), Ro = new Set(Eo), Y = new Set(bo);
function Io(n, e) {
  const t = Xi.createInstance();
  return t.init({
    lng: n,
    resources: { [n]: { translation: e } },
    interpolation: { escapeValue: !1 }
  }), t;
}
function Ao(n, e, t) {
  if (!e) return n;
  const s = { ...n };
  for (const i of Object.keys(e))
    s[i] = t(n[i], e[i]);
  return s;
}
function ui(n, e) {
  if (typeof e == "string" || typeof n != "object") return e;
  const t = { ...n };
  for (const s of Object.keys(e))
    t[s] = ui(n[s], e[s]);
  return t;
}
function Po(n, e) {
  return Ao(n, e, ui);
}
function hi(n, e = [], t = /* @__PURE__ */ new Map()) {
  for (const s of n)
    t.set(s, e), s.children && hi(s.children, [s, ...e], t);
  return t;
}
function di(n, e = /* @__PURE__ */ new WeakSet()) {
  let t;
  for (let s = n.length - 1; s >= 0; s--) {
    const i = n[s];
    N(i).includes("term") ? t && N(t).includes("definition") && e.add(i) : t = i, i.children && di(i.children, e);
  }
  return e;
}
async function xo(n, e) {
  const t = e.contextualizationLocale ?? "en", s = Po(
    await so(t),
    e.contextualization?.contextualizations
  );
  return {
    i18n: Io(t, s),
    contextualizationLanguage: no(t),
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
    segmenter: e.segmentation?.segmenter ?? li,
    // Per-key override, not an additive union — each key holds one whole rule.
    substitutions: { ...Zr, ...e.substitutions },
    tableRowNumbers: /* @__PURE__ */ new Map(),
    tableCellHeaders: /* @__PURE__ */ new Map(),
    ancestorChains: hi(n),
    aliasLocates: /* @__PURE__ */ new WeakSet(),
    blockTerms: di(n)
  };
}
function gi(n) {
  const e = B(tn(n, (i) => i.name === "lang" && te(i) !== void 0)), t = [...ue(e)].filter((i) => te(i) !== void 0);
  if (t.length === 0) return n;
  const s = (i) => t.includes(i) && i.name === "lang";
  for (const i of t) s(i) || Os(i, "xml:lang", void 0);
  return ve(Ts(e, s));
}
function dn(n, e) {
  return n === void 0 ? void 0 : ea(e, n) ?? n;
}
function J(n, e) {
  return dn(e.language === "none" ? e.contentLanguage : n ?? e.contentLanguage, e.languageOverrides);
}
function gn(n, e) {
  return n === e || n !== void 0 && e !== void 0 && n.toLowerCase() === e.toLowerCase();
}
function $t(n, e) {
  return L(n)[0] === L(e)[0];
}
function Gt(n, e, t, s) {
  const { language: i } = e;
  return i === void 0 ? !0 : mi(e, t) ? vi(e) ? (n.wordless = i, !0) : !s && n.content !== void 0 && !$t(n.content, i) ? !1 : (n.entry = i, !0) : n.content !== void 0 && !gn(n.content, i) || !s && n.entry !== void 0 && !$t(i, n.entry) ? !1 : (n.content = i, !0);
}
function fi(n, e, t) {
  const s = {};
  for (const i of n)
    if (!Gt(s, i, e, t)) return null;
  return s.content ?? s.entry ?? s.wordless;
}
function pi(n, e) {
  return fi(n, e, !1);
}
function mi(n, e) {
  return !!n.synthetic && gn(n.language, e.contextualizationLanguage);
}
function vi(n) {
  return !/[\p{L}\p{N}]/u.test(n.plain ?? Xt(n.ssml ?? ""));
}
function yi(n, e) {
  return fi(n, e, e.format === "ssml");
}
function Si(n, e, t) {
  const s = n.ssml ?? "", i = n.enclosingLanguage ?? e;
  return !i || !n.language || !mi(n, t) || vi(n) || $t(n.language, i) ? s : `<lang xml:lang="${Ne(n.language)}">${s}</lang>`;
}
function bi(n, e) {
  const t = e.format === "ssml", s = [];
  let i = 0, a = {};
  return n.forEach((r, o) => {
    Gt(a, r, e, t) || (s.push([i, o]), i = o, a = {}, Gt(a, r, e, t));
  }), n.length > 0 && s.push([i, n.length]), s;
}
function wi(n, e) {
  const t = B(n);
  let s = !1;
  for (const i of ue(t)) {
    const a = te(i), r = dn(a, e);
    r === void 0 || r === a || (Os(i, "xml:lang", r), s = !0);
  }
  return s ? ve(t) : n;
}
function Lo(n) {
  const e = {};
  return n.plain !== void 0 && (e.plain = n.plain), n.ssml !== void 0 && (e.ssml = n.ssml), n.language !== void 0 && (e.language = n.language), n.locate !== void 0 && (e.locate = n.locate), e;
}
function Hn(n, e) {
  for (const t of n) t.tags && (t.tags.around = [...e, ...t.tags.around]);
}
function ki(n) {
  const { tags: e } = n;
  return (e ? Yt(e.open) : "") + (n.ssml ?? "") + (e ? Ze(e.close) : "");
}
function fn(n) {
  !n.tags || n.ssml === void 0 || (n.ssml = ki(n), delete n.tags);
}
function Vo(n, e) {
  return e.length === 1 && Ua(e) && n.endsWith(e);
}
function Oo(n, e, t) {
  const s = t === "spaced" || t === void 0 && !ct(e) && !Ta(n) && !Rs(n, e);
  return !!n && s && !/\s$/.test(n) && !/^\s/.test(e);
}
function ze(n, e = []) {
  let t = "";
  const s = [];
  return n.forEach((i, a) => {
    if (Vo(t, i)) {
      s.push({ start: t.length, end: t.length });
      return;
    }
    Oo(t, i, e[a]) && (t += " ");
    const r = t.length;
    t += i, s.push({ start: r, end: t.length });
  }), { joined: t, ranges: s };
}
function To(n, e, t) {
  const s = n.length ? e.around.indexOf(n[0]) : -1;
  let i = 0;
  if (s !== -1) for (; i < n.length && s + i < e.around.length && n[i] === e.around[s + i]; ) i++;
  return [...n.slice(0, i), ...t];
}
function qt(n, e, t, s) {
  let i = "", a = "", r = [];
  return n.forEach((o, l) => {
    const c = s[l];
    c.start > (s[l - 1]?.end ?? 0) && (a += " ");
    const u = (t[l] && c.start === c.end ? $a(e[l]) : void 0) ?? e[l], { tags: h } = o;
    if (!h) {
      a += u;
      return;
    }
    const d = To(r, h, h.open), g = pt(r, d).length;
    i += Ze(r.slice(g)) + a + Yt(d.slice(g)) + u, a = "", r = [...d.slice(0, d.length - h.open.length), ...h.close];
  }), i + Ze(r) + a;
}
function be(n) {
  const e = yt(it(n));
  return e ? e.plain ?? (e.ssml ? _(e.ssml) : "") : "";
}
function Uo(n) {
  const e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map();
  let s = 0, i;
  return n.forEach((a, r) => {
    e.set(a, r + 1);
    const o = a.children ?? [];
    if (s = Math.max(s, o.length), o.some((l) => l.role?.has("columnheader"))) {
      i = o.map(be);
      return;
    }
    i && o.forEach((l, c) => {
      if (!l.role?.has("cell") && !l.role?.has("rowheader")) return;
      const u = i[c];
      u && t.set(l, u);
    });
  }), { lines: n.length, columns: s, rowNumbers: e, cellHeaders: t };
}
const Ei = -1, Ci = -2, re = (n) => "map" in n;
function pn(n, e) {
  return (n.spans ?? []).map((s) => re(s) || s.length !== void 0 ? s : { ...s, length: H(n, e).length });
}
function de(n, e) {
  e.length > 0 && (n.spans = e);
}
function No(n, e, t, s) {
  de(n, [{ node: e, at: 0, alias: s, ...t }]);
}
function zo(n, e, t, s) {
  const i = { node: e, ownText: t, at: s, map: Array.from({ length: t.length }, (a, r) => r) };
  t !== be(e) && (i.quotedOnly = !0), de(n, [i]);
}
const Mo = (n) => re(n) ? n.map.length : n.length;
function mn(n, e, t) {
  const s = [];
  for (const i of n) {
    const a = i.at + Mo(i);
    if (a <= e || i.at >= t) continue;
    if (!re(i)) {
      s.push({ ...i, at: i.at - e });
      continue;
    }
    const r = Math.max(i.at, e), o = i.map.slice(r - i.at, Math.min(a, t) - i.at);
    o.some((l) => l >= 0) && s.push({ ...i, at: r - e, map: o });
  }
  return s;
}
function Ri(n, e, t) {
  return n.flatMap(
    (s, i) => mn(pn(s, t), 0, e[i].end - e[i].start).map((a) => ({ ...a, at: a.at + e[i].start }))
  );
}
const Kn = (n) => /\s/.test(n), jo = (n) => /[\p{Ps}\p{Pe}\p{Pi}\p{Pf}"']/u.test(n);
function Ii(n) {
  const e = be(n);
  let t = 0, s = [];
  const i = (a, r) => {
    const o = new Array(a.length);
    let l = r, c = -1;
    for (let u = 0; u < a.length; u++) {
      if (Kn(a[u])) {
        o[u] = Ei;
        continue;
      }
      for (; l < e.length && Kn(e[l]); ) l++;
      if (e[l] === a[u])
        o[u] = l, c = ++l;
      else if (jo(a[u])) o[u] = Ci;
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
function Wn(n) {
  let e = 1 / 0, t = -1;
  for (const s of n)
    if (!(!s || !re(s)))
      for (const i of s.map)
        i < 0 || (i < e && (e = i), i + 1 > t && (t = i + 1));
  return t === -1 ? void 0 : { start: e, end: t };
}
function Qn(n, e, t) {
  const s = Ii(e);
  for (const i of n) {
    const a = s.place(H(i, t));
    a && de(i, [a]);
  }
}
function Bo(n) {
  if (n.ownText === "") return [{ start: 0, end: 0 }];
  const e = [];
  let t = -1;
  return n.map.forEach((s, i) => {
    if (s < 0) return;
    const a = e[e.length - 1];
    a && n.ownText.slice(a.end, s).trim() === "" && n.map.slice(t + 1, i).every((o) => o === Ei) ? a.end = s + 1 : e.push({ start: s, end: s + 1 }), t = i;
  }), e;
}
function Do(n, e, t, s, i) {
  if (i && e === 0 && t === n.ownText.length && s.own && !n.quotedOnly) return s.ref;
  const a = Me(s.ref, n.ownText.slice(e, t));
  return e > 0 && (a.text = { ...a.text, before: n.ownText.slice(0, e) }), t < n.ownText.length && (a.text = { ...a.text, after: n.ownText.slice(t) }), a;
}
function Fo(n, e) {
  const t = pn(n, e).flatMap((a) => {
    const r = j(a.node, e.ancestorChains);
    return r ? re(a) ? Bo(a).map((o) => ({ span: a, nodeRef: r, ...o })) : [{ span: a, nodeRef: r, start: a.start, end: a.end }] : [];
  }), s = t.length === 1 ? t[0].span : void 0, i = !!s && re(s) && s.at === 0 && s.map.length === H(n, e).length && !s.map.includes(Ci);
  return t.map(({ span: a, nodeRef: r, start: o, end: l }) => {
    if (!re(a)) {
      const u = { start: o, end: l, locate: a.alias };
      return Kr(u, a.length), u;
    }
    const c = ce(a.node) ? we(a.node, e) : void 0;
    return { start: o, end: l, locate: c ?? Do(a, o, l, r, i) };
  });
}
function le(n, e) {
  let t = 0;
  for (; t < n.length - 1 && n[t + 1].start <= e; ) t++;
  return t;
}
function we(n, e) {
  const t = Ji(n), s = j(n, e.ancestorChains)?.ref;
  if (t) {
    const i = { cssSelector: t };
    return s?.href !== void 0 && (i.href = s.href), Ft(i);
  }
  return s && Ft(s);
}
function Jn(n, e, t) {
  if (n.edgeLocates) return n.edgeLocates[e];
  const { source: s } = n;
  if (!(!s || Array.isArray(s) || !ce(s)))
    return we(s, t);
}
function _o(n, e) {
  const t = n.map((o) => {
    if (o.locate) return o.locate;
    if (o.synthetic) return;
    const { source: l } = o;
    if (!l || Array.isArray(l)) return;
    const c = H(o, e);
    if (c)
      return ce(l) ? j(l, e.ancestorChains) && we(l, e) : at(j(l, e.ancestorChains), c);
  }), s = t.findIndex((o) => o !== void 0);
  if (s === -1) return;
  let i = t.length - 1;
  for (; t[i] === void 0; ) i--;
  if (s === i) return t[s];
  const a = n[s].source, r = n[i].source;
  if (a && r && !Array.isArray(a) && !Array.isArray(r)) {
    const o = j(a, e.ancestorChains), l = j(r, e.ancestorChains);
    return Sn(o, l, t[s]);
  }
  return t[s];
}
function vn(n, e) {
  const t = n.filter((d) => e.format === "ssml" ? d.ssml : d.plain);
  if (t.length === 0) return;
  const s = yi(t, e);
  if (s === null) return;
  const i = t.map((d) => H(d, e)), { joined: a, ranges: r } = ze(i, t.map((d) => d.spacing)), o = e.format === "ssml" ? qt(t, t.map((d) => Si(d, s, e)), i, r) : a, l = e.format === "ssml" ? { ssml: o } : { plain: o };
  s && (l.language = s), n.some((d) => d.synthetic) && (l.synthetic = !0), de(l, Ri(t, r, e));
  const c = _o(t, e);
  c && (l.locate = c);
  const u = Jn(t[0], "leading", e), h = Jn(t[t.length - 1], "trailing", e);
  return (u || h) && (l.edgeLocates = { leading: u, trailing: h }), l;
}
function yn(n, e, t, s, i) {
  if (t === "plain" && s !== "block-level" && s !== "none" && e.ssml && Js(e.ssml)) {
    const o = hn(e.ssml, e.language).map((l) => {
      const c = { plain: l.plain }, u = J(l.language, i);
      return u && (c.language = u), c;
    });
    return Qn(o, n, i), o;
  }
  const a = {}, r = J(e.language, i);
  return r && (a.language = r), t === "ssml" ? a.ssml = e.ssml ? wi(e.ssml, i.languageOverrides) : oe(e.plain ?? "") : a.plain = e.plain ?? _(e.ssml ?? ""), (s === "block-level" || s === "none") && a.ssml && (a.ssml = gi(a.ssml)), Qn([a], n, i), [a];
}
function wt(n, e) {
  return e === "ssml" ? zs(n) : n;
}
function H(n, e) {
  return wt(e.format === "ssml" ? ki(n) : n.plain ?? "", e.format);
}
function Me(n, e) {
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
function at(n, e) {
  if (n)
    return n.own ? n.ref : Me(n.ref, e);
}
function Sn(n, e, t) {
  return (n && e ? Zi(n.ref, e.ref) : void 0) ?? t;
}
function $o(n, e) {
  const { ancestorChains: t } = e;
  return n.map((s) => {
    const i = Fo(s, e), a = Lo(s);
    if (i.length > 0 && (a.offsets = i), s.locate) return a;
    const { source: r } = s, o = s.plain ?? wt(s.ssml ?? "", "ssml");
    if (Array.isArray(r)) {
      const [h, d] = r, g = j(h, t), m = j(d, t), y = Sn(g, m, at(g, o));
      return y ? { ...a, locate: y } : a;
    }
    const l = r ? j(r, t) : void 0;
    if (!l) return a;
    if (s.synthetic) return { ...a, locate: l.ref };
    if (i.length === 1) return { ...a, locate: i[0].locate };
    const c = r && ce(r) ? we(r, e) : void 0, u = i.length > 0 ? Me(l.ref, o) : at(l, o);
    return { ...a, locate: c ?? u };
  });
}
function Ai(n, e) {
  const t = e.format === "ssml" ? { ssml: oe(n) } : { plain: n };
  return t.synthetic = !0, t;
}
function q(n, e) {
  const t = Ai(n, e), s = e.language === "none" ? J(void 0, e) : e.contextualizationLanguage;
  return s && (t.language = s), t;
}
function Ht(n, e, t) {
  const s = Ai(n, t), i = J(si(e), t);
  return i && (s.language = i), s;
}
function M(n, e, t) {
  for (const s of t) s.source = e;
  n.push(...t);
}
function bn(n, e, t, s) {
  s ? (t.some((i) => i.blockStart) && (s.blockStart = !0), M(n, t[0]?.source ?? e, [s])) : n.push(...t);
}
function wn(n, e, t, s) {
  for (const [i, a] of bi(s, e)) {
    const r = s.slice(i, a), o = r.length > 1 ? vn(r, e) : void 0;
    o || r.forEach(fn), bn(n, t, r, o);
  }
}
function Z(n, e, t, s) {
  const i = t ? `${e}.${t}` : void 0;
  if (i && n.i18n.exists(i)) return n.i18n.t(i, s);
  if (n.i18n.exists(e)) return n.i18n.t(e, s);
}
function kn(n, e) {
  return ci.has(n) ? !0 : e.contextualize.has(n);
}
function Pi(n, e, t) {
  return e.some((s) => {
    const i = yo[s];
    return i?.drops.includes(n) ? i.unconditional || kn(s, t) : !1;
  });
}
function Te(n, e, t, s, i) {
  if (e === void 0 || e < 0) return;
  const a = j(s, i.ancestorChains);
  a && (zo(n, s, t, e), n.locate = a.own ? a.ref : Me(a.ref, t));
}
function It(n, e, t, s, i, a) {
  const r = a?.value;
  if (r !== void 0 && r === be(t)) {
    const l = J(Se(t.text)?.language, s);
    l && (n.language = l), delete n.synthetic, Te(n, Xn(s, e, a, "value"), r, t, s);
    return;
  }
  const o = a?.description;
  o !== void 0 && o === St(t) && (i === "figure" || i === "table") && Te(n, Xn(s, e, a, "description"), o, t, s);
}
function Zn(n, e, t, s, i, a, r) {
  if (!kn(s, t)) return;
  if ((t.i18n.exists(`${s}.block.start`) || t.i18n.exists(`${s}.block.end`)) && t.contextualizationShapes[s] !== "inline") {
    const l = i === "before" ? `${s}.block.start` : `${s}.block.end`;
    M(n, e, Yn(l, a, r, e, s, t));
    return;
  }
  i === "before" && M(n, e, Yn(`${s}.inline`, a, r, e, s, t));
}
const rt = "\0";
function Xn(n, e, t, s) {
  const i = Z(n, e.base, e.variantKey, { ...t, [s]: rt })?.indexOf(rt);
  return i === void 0 || i === -1 ? void 0 : i;
}
function Yn(n, e, t, s, i, a) {
  const r = Z(a, n, e, t);
  if (!r) return [];
  const o = t?.description, l = a.language !== "none" && o !== void 0 && o === St(s) ? J(si(s), a) : void 0, c = l ? Z(a, n, e, { ...t, description: rt })?.split(rt) : void 0;
  if (!l || !c || c.length < 2) {
    const d = q(r, a);
    return It(d, { base: n, variantKey: e }, s, a, i, t), [d];
  }
  if (L(l)[0] === L(a.contextualizationLanguage)[0]) {
    const d = q(r, a);
    return d.language = l, It(d, { base: n, variantKey: e }, s, a, i, t), [d];
  }
  const u = `<lang xml:lang="${Ne(l)}">${oe(o)}</lang>`, h = c.map((d) => oe(d)).join(u);
  if (a.format === "ssml") {
    const d = q(r, a);
    return d.ssml = h, It(d, { base: n, variantKey: e }, s, a, i, t), [d];
  }
  return hn(h, a.contextualizationLanguage).map((d) => {
    if (d.language !== l) return q(d.plain, a);
    const g = Ht(d.plain, s, a);
    return (i === "figure" || i === "table") && Te(g, d.plain.indexOf(o), o, s, a), g;
  });
}
function es(n, e, t, s) {
  const i = `${e}.parts.${t}`;
  return n.i18n.exists(i, { count: s }) ? n.i18n.t(i, { count: s }) : String(s);
}
function Go(n) {
  const e = St(n);
  return e === void 0 ? { variantKey: "unlabelled" } : { variantKey: "labelled", params: { description: e } };
}
function ts(n, e) {
  const t = e.tableCellHeaders.get(n);
  return {
    variantKey: t !== void 0 ? "withHeader" : "withoutHeader",
    params: { header: t ?? "", value: be(n) }
  };
}
const qo = {
  table: (n, e) => {
    const t = (n.children ?? []).filter((i) => i.role?.has("row")), s = Uo(t);
    for (const [i, a] of s.rowNumbers) e.tableRowNumbers.set(i, a);
    for (const [i, a] of s.cellHeaders) e.tableCellHeaders.set(i, a);
    return {
      params: {
        lines: es(e, "table", "lines", s.lines),
        columns: es(e, "table", "columns", s.columns)
      }
    };
  },
  row: (n, e) => ({ params: { count: String(e.tableRowNumbers.get(n) ?? "") } }),
  cell: ts,
  rowheader: ts
};
function ns(n, e, t) {
  const s = Go(e);
  let i = s.variantKey, a = s.params;
  const r = qo[n]?.(e, t);
  r && (r.variantKey && (i = r.variantKey), a = { ...a, ...r.params });
  const o = t.contextualizationParams?.(n, e);
  return o && (a = { ...a, ...o }), { variantKey: i, params: a };
}
const ss = "[\\u0391-\\u03A9\\u03B1-\\u03C9\\u03D8-\\u03E1]", Ho = "[\\u0374\\u02B9\\u0384']", At = "[\\u05D0-\\u05EA]", is = "[\\u0400-\\u0481\\u048A-\\u04FF]", Ko = [
  new RegExp("^\\p{Nd}+$", "u"),
  new RegExp("^\\p{Nl}+$", "u"),
  /^(?=[MDCLXVI])M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i,
  /^[〇零一二三四五六七八九十百千万]+$/u,
  /^[፩-፼]+$/u,
  new RegExp(`^${At}[\\u05F3']$`, "u"),
  new RegExp(`^${At}+[\\u05F4"]${At}$`, "u"),
  new RegExp(`^(?:\\u0375${ss})*${ss}+${Ho}$`, "u"),
  /^(?:[Ա-Ֆա-և]̅)+$/u,
  new RegExp(`^\\u0482?${is}+\\u0483${is}*$`, "u")
];
function Wo(n) {
  const e = n.trim();
  return e.length > 0 && Ko.some((t) => t.test(e));
}
const Qo = new Set(vo);
function ot(n, e) {
  return e.blockTerms.has(n) || N(n).some((t) => Qo.has(t));
}
function xi(n, e) {
  return Array.isArray(n) ? n[e === "leading" ? 0 : 1] : n;
}
function lt(n, e, t) {
  if (!n) return;
  const s = xi(n, e);
  return [s, ...t.ancestorChains.get(s) ?? []].find((i) => ot(i, t));
}
function ne(n) {
  return n.placement?.kind === "alias";
}
async function Li(n, e, t, s, i, a, r) {
  return Kt(await Vi(n, e, i, a, r), n, t, s);
}
async function Vi(n, e, t, s, i) {
  const a = [], r = [];
  e.forEach((c, u) => {
    const h = ne(n[u]) ? n[u].placement.abbreviation : c;
    h && (a.push(u), r.push(h));
  });
  const { joined: o, ranges: l } = ze(r, a.map((c) => n[c].spacing));
  return { boundaries: await i.segmenter(t, o, s), textRanges: l, included: a };
}
function Kt({ boundaries: n, textRanges: e, included: t }, s, i, a, r) {
  const o = (u, h) => {
    let d = le(e, u);
    h && d > 0 && u === e[d].start && d--;
    const g = t[d], m = u - e[d].start, y = e[d].end - e[d].start;
    if (m === 0 || m < y && !ne(s[g])) return a[g].start + m;
    if (m > y && !h) return d + 1 < t.length ? a[t[d + 1]].start : i.length;
    let f = g;
    for (; f + 1 < s.length && !t.includes(f + 1); ) f++;
    return a[f].end;
  }, l = (u) => {
    const h = le(e, u), d = u - e[h].start;
    return ne(s[t[h]]) && d > 0 && d < e[h].end - e[h].start;
  }, c = [];
  for (const u of n) {
    const h = o(u.start, !1), d = Math.max(h, o(u.contentEnd, !0)), g = Math.max(d, o(u.end, !1)), m = c[c.length - 1];
    m && l(u.start) ? (m.contentEnd = Math.max(m.contentEnd, d), m.end = Math.max(m.end, g), m.text = i.slice(m.start, m.contentEnd)) : c.push({ text: i.slice(h, d), start: h, end: g, contentEnd: d });
  }
  return c;
}
const Wt = new RegExp("\\p{Sentence_Terminal}$", "u"), Jo = /^[\s\p{Pe}\p{Pf}\p{Pi}"']*$/u;
function Zo(n) {
  return Wt.test(n);
}
function En(n, e, t, s, i) {
  let a = !1;
  return n.forEach((r, o) => {
    if (!ne(r)) return;
    const l = r.placement.abbreviation?.match(Wt)?.[0];
    if (!l) return;
    const { start: c, end: u } = t[o];
    s.some((h) => h.start < u && h.contentEnd >= u && Jo.test(e.slice(u, h.contentEnd))) && (Wt.test(e.slice(c, u)) || (r.plain !== void 0 && (r.plain += l), r.ssml !== void 0 && (r.ssml += l), a = !0));
  }), a;
}
function Xo(n, e) {
  const t = H(n, e), s = { start: 0, end: t.length };
  En([n], t, [s], [{ text: t, ...s, contentEnd: t.length }]);
}
async function Yo(n, e) {
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
    const r = n.slice(s, a + 1), o = pi(r, e), l = (o === null ? r[0].language : o) ?? "en", c = lt(i, "trailing", e), u = a + 1 < n.length && c && lt(n[a + 1].source, "leading", e) === c ? [...r, n[a + 1]] : r, h = u.map((y) => H(y, e)), { joined: d, ranges: g } = ze(h, u.map((y) => y.spacing)), m = await Li(u, h, d, g, l, bt(l, e), e);
    En(r, d, g, m), wn(t, e, i, r), s = a + 1;
  }
  return t;
}
function as(n, e) {
  return e.skip.size > 0 && n.some((t) => e.skip.has(t) && !Pe.has(t) && !Pi(t, n, e));
}
function Cn(n, e) {
  const t = n.find((s) => Pe.has(s));
  return t === void 0 ? void 0 : e.interruptions[t] ?? "after";
}
function el(n, e) {
  const t = yt(Se(n.text));
  if (!t) return [];
  const s = t.plain ?? _(t.ssml ?? "");
  if (Wo(s)) {
    const i = Z(e, "pagebreak.number", void 0, { number: s.trim() });
    if (i !== void 0) return [q(i, e)];
  }
  return yn(n, t, e.format, e.language, e);
}
function rs(n) {
  n.plain !== void 0 && (n.plain += "."), n.ssml !== void 0 && (n.ssml += ".");
}
function tl(n, e) {
  const t = el(n, e);
  if (!e.contextualize.has("pagebreak")) return t;
  const s = e.i18n.exists("pagebreak.block.start") ? "pagebreak.block.start" : "pagebreak.inline", i = Z(e, s);
  if (i === void 0) return t;
  const a = q(i, e);
  if (t.length === 0) return [a];
  for (const o of t) o.source = n;
  const r = vn([a, ...t], e);
  return r ? (rs(r), [r]) : (rs(t[t.length - 1]), [a, ...t]);
}
function nl(n, e) {
  const t = yt(it(n));
  return t ? yn(n, t, e.format, e.language, e) : [];
}
const Pt = "", Ge = "";
function Rn(n) {
  return N(n).includes("term") || (n.children ?? []).some(Rn);
}
const Qt = /* @__PURE__ */ new Set();
function Oi(n) {
  return Rn(n) ? [n, ...(n.children ?? []).flatMap(Oi)] : [];
}
function Ti(n, e, t, s, i, a) {
  if (e.length === 0) return;
  const r = N(n).find((f) => Y.has(f)), o = e.length > 1 ? e.find(Rn) : void 0, l = e.filter((f) => f !== o), c = r && s.contextualize.has(r) ? Z(s, `${r}.inline`) : void 0, u = r && a && o ? Z(s, `${r}.term`, void 0, { term: Pt, value: Ge }) : void 0, h = a ? e : l;
  if (c === void 0 && !u) {
    ee(h, t, s, i);
    return;
  }
  const d = ot(h[0], s) && !i, g = [];
  c !== void 0 && M(g, n, [q(c, s)]);
  const m = i || d, y = [...h, ...o ? Oi(o) : []];
  y.forEach((f) => Qt.add(f));
  for (const f of (u ?? Ge).split(new RegExp(`(${Pt}|${Ge})`)))
    f === Pt ? ee([o], g, s, m) : f === Ge ? ee(l, g, s, m) : f && M(g, n, [q(f, s)]);
  y.forEach((f) => Qt.delete(f)), d && g.length > 0 && (g[0].blockStart = !0), wn(t, s, n, g);
}
function Ui(n, e, t, s) {
  n.forEach((i, a) => {
    const r = a === 0 ? s : !1;
    "ref" in i ? Ti(i.ref, i.targets, e, t, r, !0) : Ue(i.node, e, t, r);
  });
}
function Ke(n, e) {
  const t = Cn(N(n), e);
  return t !== void 0 && t !== "inline";
}
function sl(n, e, t, s, i) {
  const a = j(s, i.ancestorChains);
  if (!a) return;
  const r = Ft(Me(a.ref, e));
  i.aliasLocates.add(r);
  for (const o of n)
    o.locate = r, No(o, s, t, r), o.edgeLocates = { leading: r, trailing: r };
}
function il(n, e, t, s, i, a) {
  const r = Se(n.text)?.language, o = J(r, s), l = new Map((n.children ?? []).map((p) => [p.id, p])), c = [], u = [], h = /* @__PURE__ */ new Set(), d = /* @__PURE__ */ new Set(), g = /* @__PURE__ */ new Map(), m = /* @__PURE__ */ new Set(), y = s.segmentation === "sentence", f = s.interruptions.abbreviation === "never", k = s.interruptions.abbreviation === "inline", b = Ii(n);
  let P;
  const S = (p, C) => {
    if (p.abbreviation === "alias") return;
    const T = c.slice(C).map((U) => {
      const x = b.place(H(U, s));
      return x && de(U, [x]), x;
    });
    p.abbreviation === "text" && (P = Wn(T));
  }, v = (p, C) => {
    if (p.abbreviation !== "alias") return;
    const T = c.slice(C), U = _(p.abbreviationText), x = k ? Wn([b.place(U)]) : P;
    x && sl(T, U, x, n, s);
    const V = k ? U : void 0;
    T.forEach((R, Be) => g.set(R, Be === 0 ? V : void 0));
  }, E = (p, C) => {
    const T = !k && g.has(c[C - 1]);
    p.touchesPrevious && C > 0 && c.length > C && !T && (c[C].spacing = "touching");
  }, w = (p) => {
    p.spacing !== "touching" && (p.spacing = "spaced");
  }, I = /* @__PURE__ */ new Map();
  for (const { placeholderId: p } of Dt(e)) {
    const C = p === void 0 ? void 0 : l.get(p);
    if (!C || Ke(C, s) || !N(C).some((U) => Pe.has(U))) continue;
    const T = [];
    Ue(C, T, s, i), I.set(p, T);
  }
  const z = (p) => {
    const C = l.get(p);
    return I.get(p)?.length === 0 ? !0 : C !== void 0 && Ke(C, s) && !N(C).some((T) => Y.has(T));
  };
  let D;
  const ge = (p) => {
    const C = c[p];
    !D || !C || (D.spaceAcross ? w(C) : D.touching && (C.spacing = "touching"), D = void 0);
  }, ke = Xs(e, z, r), { spaced: X } = ke;
  let K = ke.ssml;
  s.format === "ssml" && (K = wi(K, s.languageOverrides), (s.language === "block-level" || s.language === "none") && (K = gi(K)));
  const In = Gr(K, r);
  for (let p of Dt(K)) {
    if (p.abbreviation && (p.abbreviation === "text" ? k : f)) continue;
    if (p.abbreviation === "alias" && !k && (p = { ...p, ssml: p.parenthesizedSsml, touchesPrevious: !1 }), p.placeholderId !== void 0) {
      const x = l.get(p.placeholderId);
      if (!x) continue;
      if (N(x).some((V) => Pe.has(V) && !Y.has(V)) || b.embed(be(x)), z(p.placeholderId) ? D = { spaceAcross: X.has(p.placeholderId) } : D = void 0, Ke(x, s)) {
        const V = N(x), R = V.some((De) => Y.has(De));
        R && M(c, x, nl(x, s));
        const Be = R ? Cn(V, s) === "never" || !x.children?.length ? [] : [{ ref: x, targets: x.children }] : [{ node: x }];
        for (const De of Be)
          if (u.push(De), y) {
            const Fi = c.length;
            Ui([De], c, s, u.length === 1 && (i || a)), c.slice(Fi).forEach((_i) => d.add(_i));
          }
      } else {
        const V = c.length;
        if (N(x).some((R) => Pe.has(R))) {
          if (c.push(...I.get(p.placeholderId).map((R) => ({ ...R, tags: R.tags && { ...R.tags } }))), c.slice(V).forEach((R) => h.add(R)), p.language && c.slice(V).forEach((R) => R.enclosingLanguage = p.language), Hn(c.slice(V), p.open), c.length > V) {
            const R = In.has(p.placeholderId);
            /\s$/.test(p.textBefore) || !R && new RegExp("\\S\\p{Pi}$", "u").test(p.textBefore) ? w(c[V]) : R && (c[V].spacing = "touching"), D = { spaceAcross: /^\s/.test(p.textAfter) && qr(p.textAfter.trimStart(), r), touching: R };
          }
        } else
          Ue(x, c, s, i, u), Hn(c.slice(V), p.open), c.slice(V).forEach((R) => R.placement && m.add(R)), c.length > V && (/\s$/.test(p.textBefore) && w(c[V]), D = { spaceAcross: /^\s/.test(p.textAfter) });
      }
      continue;
    }
    if (!p.ssml) continue;
    const C = c.length, T = Yt(p.open ?? []) + p.ssml + Ze(p.close ?? []);
    if (s.format === "plain" && s.language !== "block-level" && s.language !== "none" && Js(T)) {
      for (const x of hn(T, r)) {
        const V = { plain: x.plain }, R = J(x.language, s);
        R && (V.language = R), M(c, n, [V]);
      }
      S(p, C), ge(C), v(p, C), E(p, C);
      continue;
    }
    const U = {};
    o && (U.language = o), s.format === "ssml" ? (U.ssml = p.ssml, (p.open?.length || p.close?.length) && (U.tags = { open: p.open, close: p.close, around: [] })) : U.plain = _(T), M(c, n, [U]), S(p, C), ge(C), v(p, C), E(p, C);
  }
  const Ee = !y && (m.size > 0 || c.some((p) => Zo(g.get(p) ?? "")));
  return y && u.length + h.size + g.size + m.size > 0 || Ee ? (c.forEach((p) => {
    const C = h.has(p) ? { kind: "inline" } : d.has(p) ? { kind: "after" } : g.has(p) ? { kind: "alias", abbreviation: g.get(p) } : m.has(p) ? p.placement : void 0;
    p.placement = { ...C, node: n };
  }), bn(t, n, c, void 0), y ? [] : u) : (wn(t, s, n, c), u);
}
function Ue(n, e, t, s, i, a = !1) {
  const r = N(n), o = St(n), l = Cn(r, t) === "never", c = l && r.some((f) => Y.has(f));
  if (as(r, t) || l && !c) return;
  const u = ot(n, t), h = u && !s, d = e.length, g = Qt.has(n) ? [] : r.filter(
    (f) => f !== "footnote" && f !== "pagebreak" && !Y.has(f) && !Pi(f, r, t)
  ), m = r.some((f) => Co.has(f) && t.contextualize.has(f)), y = r.includes("table") && o !== void 0 && !m;
  if (y) {
    const f = Ht(o, n, t);
    Te(f, 0, o, n, t), M(e, n, [f]);
  }
  for (const f of g) {
    if (f === "figure" && o === void 0) continue;
    const { variantKey: k, params: b } = ns(f, n, t);
    Zn(e, n, t, f, "before", k, b);
  }
  if (r.includes("noteref"))
    for (const f of n.children ?? []) {
      const k = N(f);
      if (!as(k, t))
        if (k.includes("footnote")) {
          const b = t.contextualize.has("footnote"), P = t.i18n.exists("footnote.block.start") || t.i18n.exists("footnote.block.end"), S = ot(f, t) && !s && t.interruptions.noteref !== "inline", v = b ? Z(t, P ? "footnote.block.start" : "footnote.inline") : void 0, E = b && (v !== void 0 || P), w = [];
          v !== void 0 && M(w, f, [q(v, t)]);
          const I = [];
          if (ee([f], I, t, s || S), S && I.length > 0 && (I[0].blockStart = !0), w.push(...I), E && P) {
            const D = Z(t, "footnote.block.end");
            D !== void 0 && M(w, f, [q(D, t)]);
          }
          const z = E && w.length > 1 ? vn(w, t) : void 0;
          bn(e, f, w, z);
        } else
          ee([f], e, t, s);
    }
  else if (!r.some((f) => Ro.has(f))) {
    const f = it(n)?.ssml, k = a || r.some((b) => ci.has(b) && kn(b, t));
    if (f && Fn(f) && !k) {
      const b = il(n, f, e, t, s, u);
      if (i)
        i.push(...b);
      else if (b.length > 0) {
        const P = s || u && e.length > d;
        Ui(b, e, t, P);
      }
    } else if (r.includes("pagebreak")) {
      if (M(e, n, tl(n, t)), n.children) {
        const b = s || u && e.length > d;
        ee(n.children, e, t, b);
      }
    } else {
      const b = k ? void 0 : yt(it(n));
      if (b && M(e, n, yn(n, b, t.format, t.language, t)), n.children && !c) {
        const P = s || u && e.length > d;
        if (r.some((S) => Y.has(S)))
          Ti(n, n.children, e, t, P, Ke(n, t));
        else if (k && f && Fn(f)) {
          const S = new Set(Dt(f).flatMap((v) => v.placeholderId ?? []));
          n.children.forEach((v, E) => {
            const w = N(v), I = v.id !== void 0 && S.has(v.id) && (w.length === 0 || w.some((z) => Y.has(z)));
            Ue(v, e, t, E === 0 ? P : !1, void 0, I);
          });
        } else
          ee(n.children, e, t, P);
      }
    }
  }
  if (h && e.length > d && (e[d].blockStart = !0), o !== void 0 && !m && !y) {
    const f = Ht(o, n, t);
    r.includes("figure") && Te(f, 0, o, n, t), M(e, n, [f]);
  }
  for (const f of g) {
    if (f === "figure" && o === void 0) continue;
    const { variantKey: k, params: b } = ns(f, n, t);
    Zn(e, n, t, f, "after", k, b);
  }
}
function ee(n, e, t, s) {
  n.forEach((i, a) => Ue(i, e, t, a === 0 ? s : !1));
}
async function Ni(n, e, t, s) {
  const { plain: i, pieces: a } = he(n);
  if (!i) return;
  const r = zi(i, a, await t(e, i, s));
  if (r.length <= 1) return;
  const o = [], l = new en();
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
      const m = r[c], y = Math.min(g, m.end), f = y >= m.end && c < r.length - 1;
      let k = h.text.slice(d - h.start, y - h.start);
      f && (k = k.replace(/[ \t\r\n]+$/, "")), l.text(h.chain, k), d = y, f && (o.push(l.flush()), c++);
    }
  }
  const u = l.flush().replace(/[ \t\r\n]+$/, "");
  return u && o.push(u), o;
}
function zi(n, e, t) {
  const s = /* @__PURE__ */ new Map();
  for (const i of e) {
    if (i.kind !== "text") continue;
    const a = i.chain.find(Vs);
    if (!a) continue;
    const r = i.start + i.text.length, o = s.get(a);
    o ? o.end = r : s.set(a, { start: i.start, end: r });
  }
  return s.size ? ri(n, t, (i, a) => [...s.values()].some((r) => r.start < i.contentEnd && r.end > a.start)) : t;
}
function Mi(n, e) {
  const { plain: t, pieces: s } = he(n);
  return zi(t, s, e);
}
async function al(n, e) {
  const t = n.language ?? "en", s = bt(t, e), i = e.format === "ssml" ? n.ssml : n.plain;
  if (!i) return;
  const a = await e.segmenter(t, wt(i, e.format), s);
  if (a.length <= 1) return;
  if (e.format !== "ssml") return a.map((l) => ({ text: l.text, start: l.start, end: l.contentEnd }));
  const r = Mi(i, a), o = r.length > 1 ? await Ni(i, t, async () => r) : void 0;
  if (o)
    return r.map((l, c) => ({ text: o[c], start: l.start, end: l.contentEnd }));
}
const os = /* @__PURE__ */ new Set([
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
function ls(n) {
  return n ? N(Array.isArray(n) ? n[1] : n) : [];
}
function cs(n, e, t) {
  const s = xi(n, e);
  return (t.ancestorChains.get(s) ?? []).filter((i) => N(i).some((a) => a !== "presentation"));
}
function rl(n, e) {
  return n.length === e.length && n.every((t, s) => t === e[s]);
}
function us(n, e, t) {
  const s = n.edgeLocates?.[e];
  if (s && !t.aliasLocates.has(s)) return !0;
  const { source: i } = n;
  return !!i && !Array.isArray(i) && ce(i);
}
function je(n) {
  return n.placement?.kind === "inline";
}
function ol(n) {
  return n.placement?.kind === "after";
}
function ji(n, e, t) {
  t.push(...n.get(e) ?? []), n.delete(e);
}
function Jt(n, e) {
  const t = n.placement?.node;
  return t !== void 0 && t === e.placement?.node;
}
function ll(n, e, t) {
  const s = t.format === "ssml" ? n.ssml : n.plain, i = t.format === "ssml" ? e.ssml : e.plain;
  if (!s || !i) return !1;
  if (Jt(n, e)) return !0;
  if (!gn(n.language ?? "en", e.language ?? "en") || n.synthetic || e.synthetic) return !1;
  const a = n.source, r = e.source;
  return !(!a || !r || !t.segmentationReconstruct && lt(a, "trailing", t) !== lt(r, "leading", t) || ls(a).some((o) => os.has(o)) || ls(r).some((o) => os.has(o)) || !rl(cs(a, "trailing", t), cs(r, "leading", t)) || us(n, "trailing", t) || us(e, "leading", t));
}
async function hs(n, e, t) {
  fn(n);
  const s = n.synthetic || ne(n) ? void 0 : await al(n, e);
  if (!s) {
    ne(n) && Xo(n, e), t.push(n);
    return;
  }
  const { source: i } = n, a = Array.isArray(i) ? void 0 : i, r = a ? j(a, e.ancestorChains) : void 0, o = a && ce(a) ? we(a, e) : void 0, l = n.edgeLocates, c = pn(n, e);
  s.forEach(({ text: u, start: h, end: d }, g) => {
    const m = { [e.format]: u, source: i };
    n.language !== void 0 && (m.language = n.language), n.locate && !r && (m.locate = n.locate), de(m, mn(c, h, d));
    const y = (g === 0 ? l?.leading : void 0) ?? (g === s.length - 1 ? l?.trailing : void 0) ?? o;
    y && r && (m.locate = y), n.blockStart && g === 0 && (m.blockStart = !0), t.push(m);
  });
}
async function cl(n, e, t, s, i, a, r) {
  return n.some(ne) ? Li(n, e, t, s, i, a, r) : r.segmenter(i, t, a);
}
async function ul(n, e, t, s) {
  const i = n.map((c) => H(c, e)), { joined: a, ranges: r } = ze(i, n.map((c) => c.spacing)), o = await cl(n, i, a, r, t, s, e), l = new Array(n.length - 1).fill(!1);
  for (const c of o) {
    const u = le(r, c.start), h = c.end > c.start ? le(r, c.end - 1) : u;
    for (let d = u; d < h; d++) l[d] = !0;
  }
  return l;
}
function hl(n, e) {
  const t = [...e];
  return n.forEach((s, i) => {
    if (!je(s)) return;
    const a = i > 0 && Jt(n[i - 1], s), r = i < n.length - 1 && Jt(s, n[i + 1]);
    a && !t[i - 1] ? t[i - 1] = !0 : r && (t[i] = !0);
  }), t;
}
function dl(n, e, t, s) {
  const i = (a) => je(t[le(s, a)]);
  return ri(n, e, (a, r) => i(a.contentEnd - 1) || i(r.start));
}
function gl(n, e, t, s, i, a) {
  const r = Ri(n.slice(s, i + 1), e.slice(s, i + 1), a);
  return mn(r, t.start, t.contentEnd);
}
function Bi(n, e) {
  const t = pi(n, e);
  return t !== null ? t ?? "en" : n.find((s) => !je(s))?.language ?? n[0].language ?? "en";
}
function fl(n, e, t, s, i) {
  const a = le(t, n.start), r = n.end > n.start ? le(t, n.end - 1) : a, o = bi(e.slice(a, r + 1), i);
  return o.map(([l, c], u) => {
    const h = a + l, d = a + c - 1, g = u === o.length - 1, m = u === 0 ? n.start : t[h].start, y = g ? n.contentEnd : t[d].end, f = g ? n.end : t[d + 1].start, k = yi(e.slice(h, d + 1), i) ?? void 0, b = { text: s.slice(m, y), start: m, end: f, contentEnd: y }, P = o.length > 1 && h === d && je(e[h]);
    return { boundary: b, startIdx: h, endIdx: d, language: k, sentenceEnd: g ? n.end : void 0, isolated: P };
  });
}
async function pl(n, e, t, s) {
  const i = n.map((v) => v.source), a = n.map((v) => v.spacing), r = Bi(n, e), o = bt(r, e), l = () => {
    const v = n.map((E) => H(E, e));
    return { plainParts: v, ...ze(v, a) };
  };
  let { plainParts: c, joined: u, ranges: h } = l(), d;
  if (!n.some(ne)) d = await e.segmenter(r, u, o);
  else {
    const v = await Vi(n, c, r, o, e);
    d = Kt(v, n, u, h), En(n, u, h, d) && ({ plainParts: c, joined: u, ranges: h } = l(), d = Kt(v, n, u, h));
  }
  const g = dl(u, d, n, h), m = e.format === "ssml" ? Mi(qt(n, n.map((v) => v.ssml ?? ""), c, h), g) : g, f = (m.length > 0 ? m : [{ text: u, start: 0, end: u.length, contentEnd: u.length }]).flatMap((v) => fl(v, n, h, u, e));
  let k, b;
  if (e.format === "ssml") {
    const v = /* @__PURE__ */ new Map();
    for (const w of f) for (let I = w.startIdx; I <= w.endIdx; I++) v.set(I, w.language);
    b = qt(n, n.map((w, I) => Si(w, v.get(I), e)), c, h);
    const E = f.map((w) => w.boundary);
    k = f.length > 1 ? await Ni(b, r, async () => E, o) : void 0;
  }
  const P = new Set(n.filter((v) => v.blockStart)), S = (v, E) => {
    if (v !== void 0)
      for (let w = 0; w < n.length; w++)
        (h[w].end <= v || E === f.length - 1) && ji(s, w, t);
  };
  f.forEach(({ boundary: v, startIdx: E, endIdx: w, language: I, sentenceEnd: z, isolated: D }, ge) => {
    if (D) {
      fn(n[E]), t.push(n[E]), S(z, ge);
      return;
    }
    const ke = e.format === "ssml" ? k ? k[ge] : b : v.text, X = { [e.format]: ke }, K = e.language === "none" ? J(void 0, e) : I ?? "en";
    K && (X.language = K), n.slice(E, w + 1).filter((R) => P.delete(R)).length > 0 && (X.blockStart = !0), de(X, gl(n, h, v, E, w, e));
    const Ee = [...Array(w - E + 1).keys()].map((R) => E + R).filter((R) => !je(n[R])), p = Ee[0] ?? E, C = Ee[Ee.length - 1] ?? w, T = j(i[p], e.ancestorChains), U = i[p], x = (ce(U) ? we(U, e) : void 0) ?? at(T, wt(ke, e.format)), V = p !== C ? Sn(T, j(i[C], e.ancestorChains), x) : x;
    V && (X.locate = V), X.source = p === C ? i[p] : [i[p], i[C]], t.push(X), S(z, ge);
  });
}
async function ml(n, e) {
  if (e.segmentation !== "sentence") return n;
  const t = [];
  let s = 0;
  for (; s < n.length; ) {
    let i = s;
    for (; i + 1 < n.length && ll(n[i], n[i + 1], e); ) i++;
    if (i === s) {
      await hs(n[s], e, t), s = i + 1;
      continue;
    }
    const a = [], r = /* @__PURE__ */ new Map();
    for (let h = s; h <= i; h++)
      if (!ol(n[h]))
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
    const o = Bi(a, e), l = await ul(a, e, o, bt(o, e)), c = hl(a, l);
    let u = 0;
    for (let h = 0; h < a.length; h++)
      if (!(h < a.length - 1 && c[h])) {
        if (u === h)
          await hs(a[u], e, t), ji(r, u, t);
        else {
          const d = /* @__PURE__ */ new Map();
          for (let g = u; g <= h; g++) r.has(g) && d.set(g - u, r.get(g));
          await pl(a.slice(u, h + 1), e, t, d);
        }
        u = h + 1;
      }
    s = i + 1;
  }
  return t;
}
function vl(n, e) {
  return Object.keys(e.substitutions).length === 0 ? n : n.map((t) => {
    if (t.ssml) {
      const { ssml: o, plain: l, map: c } = Tr(t.ssml, e.substitutions);
      if (o === t.ssml) return t;
      const u = { ...t, ssml: o };
      return _n(u, { plain: l, map: c }), u;
    }
    const s = t.plain;
    if (!s) return t;
    const { text: i, map: a } = Or(s, e.substitutions);
    if (i === s) return t;
    const r = { ...t, plain: i };
    return _n(r, { plain: s, map: a }), r;
  });
}
async function Vl(n, e = {}) {
  return (await Di(n, e)).utterances;
}
async function Di(n, e = {}) {
  const t = [], s = await xo(n, e);
  ee(n, t, s, !1);
  const i = s.segmentation === "sentence" ? t : await Yo(t, s), a = await ml(i, s);
  return {
    utterances: vl($o(a, s), s),
    sources: a.map((r) => r.source),
    blockStarts: a.map((r) => !!r.blockStart)
  };
}
class Ol {
  engine;
  languages;
  contentQueue = [];
  // `contentQueue` as loaded, before `voice` stamped it — re-stamped when that changes.
  loadedQueue = [];
  loadedLanguages = [];
  events = new gt();
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
  // The engine's voices, as last listed, which content without a voice of its own gets one of.
  voices = [];
  voiceIds = /* @__PURE__ */ new Set();
  // Keyed by `${language}:${needsBoundary}`: the voice picked for content in a language, null when it has none.
  pickedVoices = /* @__PURE__ */ new Map();
  pickingVoices = /* @__PURE__ */ new Map();
  // The engine's latest voice listing: one resolving after a newer one started gives way to it.
  voiceListing = null;
  reportedLanguageFallbacks = /* @__PURE__ */ new Set();
  // `settings.voice` as "voiceschanged" last told it, so loads and refreshes racing each other tell a change once.
  notifiedVoice = null;
  // Bumped by every setContentQueue(), so a load still waiting for its voices knows it was superseded.
  loadGeneration = 0;
  constructor(e, t = {}) {
    this.engine = e, this._defaults = new zn(t.defaults), this._preferences = new me(t.preferences), this._settings = new Et(this._preferences, this._defaults), this.contextualizationOverrides = t.contextualizationOverrides, this.segmentationOverrides = t.segmentationOverrides, this.languages = t.languages ?? [], this.setupEngineListeners(), this.applyEngineParameters(), this.notifiedVoice = this.spokenVoice(), this.initializeEngine();
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
    return (this.languages.length > 0 ? this.languages : this.contentLanguage ? [this.contentLanguage] : []).map((t) => dn(t, this._settings.languageOverrides) ?? t);
  }
  // The voice for content in `language`: a single voice for all, else the record's exact tag, then its base language.
  voiceIdFor(e, t) {
    return typeof e == "string" ? e : e && t ? la(e, t) : void 0;
  }
  // The main language's voice prefers boundary events; the others match its boundary support.
  needsBoundary(e) {
    const [t] = this.spokenLanguages();
    if (!t || O(e) === O(t)) return !0;
    const s = this.pickedVoices.get(this.pickKey(t, !0)), i = this.voiceIdFor(this.settingsWith(s ? { [this.pickedVoiceKey(t, s)]: G(s) } : null).voice, t);
    return this.voices.find((r) => G(r) === i)?.controls?.boundary !== !1;
  }
  pickKey(e, t) {
    return `${O(e)}:${t}`;
  }
  // `undefined` until picked
  pickedVoice(e) {
    return this.pickedVoices.get(this.pickKey(e, this.needsBoundary(e)));
  }
  async pickVoice(e) {
    const t = this.needsBoundary(e), s = this.pickKey(e, t);
    if (this.pickedVoices.has(s)) return;
    let i = this.pickingVoices.get(s);
    if (!i) {
      const a = this.voices;
      i = bs(e, a, t).then((r) => {
        this.voices === a && this.pickedVoices.set(s, r);
      }).finally(() => this.pickingVoices.delete(s)), this.pickingVoices.set(s, i);
    }
    await i;
  }
  // Lists the engine's voices for the spoken languages and `languages`, and picks one for each, the main language first.
  async pickVoices(e = []) {
    const t = this.spokenLanguages(), s = [...new Set([...t, ...e].map((r) => O(r)).filter(Boolean))];
    let i = this.engine.getAvailableVoices(s, this.preferredVoiceIds());
    this.voiceListing = i;
    let a = await i;
    for (; i !== this.voiceListing; )
      i = this.voiceListing, a = await i;
    (a.length !== this.voices.length || a.some((r) => !this.voiceIds.has(G(r)))) && (this.voices = a, this.voiceIds = new Set(a.map((r) => G(r))), this.pickedVoices.clear(), this.pickingVoices.clear()), t[0] && await this.pickVoice(t[0]), await Promise.all(s.map((r) => this.pickVoice(r)));
  }
  // Picks again, re-stamping loaded content whose voice that changes, and tells when the spoken voices change.
  async refreshVoices() {
    if (await this.pickVoices(this.loadedLanguages), this.loadedQueue.length > 0 && this.stamped().some((e, t) => e.voice !== this.contentQueue[t]?.voice)) {
      const { index: e, state: t } = this.resumeTarget();
      await this.setContentQueue(this.loadedQueue, e, t);
    }
    this.notifyVoicesChanged();
  }
  // A swapped-in engine starts the queue stamped with the previous one's voices: held, then reloaded with its own.
  async refreshVoicesForEngine() {
    const e = this.pendingAdvanceTimeout !== null ? this.getCurrentUtteranceIndex() + 1 : null;
    if (this.clearPendingAdvance(), this.engine.pause(), await this.pickVoices(this.loadedLanguages), this.loadedQueue.length > 0) {
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
  // The preference's voices the engine has, by their ids; an engine listing no voice can't tell, so it's trusted with them.
  availableVoice(e) {
    if (typeof e == "string") return this.listedVoiceId(e) ?? null;
    if (!e) return null;
    const t = Object.fromEntries(Object.entries(e).flatMap(([s, i]) => {
      const a = this.listedVoiceId(i);
      return a ? [[s, a]] : [];
    }));
    return Object.keys(t).length > 0 ? t : null;
  }
  // Listed whatever their language, so they're kept rather than taken for another browser's.
  preferredVoiceIds() {
    const e = this._settings.voice;
    return typeof e == "string" ? [e] : e ? Object.values(e) : [];
  }
  // Matched by id, else by name, as engines match a voice.
  listedVoiceId(e) {
    if (this.voices.length === 0) return e;
    const t = this.voices.find((s) => G(s) === e) ?? this.voices.find((s) => s.name === e);
    return t && G(t);
  }
  // The voice picked for each spoken and loaded language.
  pickedVoiceRecord() {
    const e = {};
    for (const t of /* @__PURE__ */ new Set([...this.spokenLanguages(), ...this.loadedLanguages])) {
      const s = this.pickedVoice(t);
      s && (e[this.pickedVoiceKey(t, s)] ??= G(s));
    }
    return Object.keys(e).length > 0 ? e : null;
  }
  // A pick is for the language's region only when the voice is of it, else for its base language.
  pickedVoiceKey(e, t) {
    const [s, i] = L(e);
    return i && L(t.language)[1] === i ? e : xe(s) === xe(e) ? s : e;
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
      const { charIndex: t, charLength: s } = e.detail ?? {}, i = this.loadedQueue[this.getCurrentUtteranceIndex()], a = i && typeof t == "number" && typeof s == "number" ? Wr(i, t, s) : void 0;
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
    const i = ++this.loadGeneration, a = this.loadedQueue.map((l) => this.withLanguage(l)).filter((l) => !l.voice && l.language);
    this.loadedLanguages = [...new Set(a.map((l) => l.language))];
    const r = this.loadedLanguages.filter((l) => this.pickedVoice(l) === void 0);
    if (r.length > 0 && (await this.pickVoices(r).catch(() => {
    }), i !== this.loadGeneration))
      return;
    const o = this.stamped();
    this.contentQueue = o, this.reportLanguageFallbacks(o), this.engine.loadUtterances(o, t ?? void 0), this.emitContentChangeEvent({ content: o }), this.notifyVoicesChanged();
  }
  stamped() {
    const e = this.settings.voice;
    return this.loadedQueue.map((t) => this.withVoice(this.withLanguage(t), e));
  }
  // Once per language, for content in a language the engine has no voice for, spoken with the engine's own.
  reportLanguageFallbacks(e) {
    if (this.voices.length !== 0)
      for (const t of e) {
        if (t.voice || !t.language || this.pickedVoice(t.language) !== null) continue;
        const s = O(t.language);
        this.reportedLanguageFallbacks.has(s) || (this.reportedLanguageFallbacks.add(s), this.emitEvent({ type: "languagefallback", detail: { language: t.language, reason: "no-matching-voice" } }));
      }
  }
  // The content's language when a loadContent() utterance has none; extraction applies it to loadGndContent()'s.
  withLanguage(e) {
    return this.source !== void 0 || this.contentLanguage === void 0 || e.language ? e : { ...e, language: this.contentLanguage };
  }
  // The utterance's own voice, else the spoken voice for its language.
  withVoice(e, t) {
    if (e.voice) return e;
    const s = this.voiceIdFor(t, e.language);
    return s ? { ...e, voice: s } : e;
  }
  // Re-runs extraction from `this.source`, resuming near the old position if playback was underway.
  async reextract() {
    if (!this.source) return;
    const { index: e, state: t } = this.resumeTarget(), s = this.contentSources, { utterances: i, sources: a, blockStarts: r } = await Di(this.source, {
      format: this._settings.format,
      interruptions: this._settings.interruptions,
      skip: this._settings.skip,
      contextualize: this._settings.contextualize,
      contextualization: {
        contextualizations: this.contextualizationOverrides?.contextualizations,
        shapes: Er(this._settings.verbosity, this.contextualizationOverrides?.shapes),
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
    const t = this._settings.segmentation, s = Qr(e, t);
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
    return this.settingsWith(this.pickedVoiceRecord());
  }
  // `picks` are the voice defaults; the preference's voices the engine doesn't have give way to them.
  settingsWith(e) {
    return new Et(
      this._preferences.merging(new me({ voice: this.availableVoice(this._settings.voice) })),
      new zn({ ...this._defaults, voice: e })
    );
  }
  // Rebuilt, staged edits kept, once the spoken voices change, e.g. when they're picked after being read.
  get preferencesEditor() {
    const e = this.spokenVoice();
    return (this._preferencesEditor === null || !this.sameSettingValue(e, this.preferencesEditorVoice)) && (this._preferencesEditor = new jn(this._preferencesEditor?.preferences ?? this._preferences, this.settings), this.preferencesEditorVoice = e), this._preferencesEditor;
  }
  async submitPreferences(e) {
    !this.source && this.contentQueue.length > 0 && Nn.some((t) => e[t] !== void 0) && console.warn(
      "submitPreferences(): extraction-affecting preferences (format, interruptions, verbosity, skip, contextualize, language, languageOverrides, segmentation, reconstruct) have no effect on content loaded via loadContent() — use loadGndContent() to re-extract on submission."
    ), this._preferences = this._preferences.merging(e), await this.applyPreferences();
  }
  async applyPreferences() {
    const e = this._settings;
    if (this._settings = new Et(this._preferences, this._defaults), this.applyEngineParameters(), (!this.sameSettingValue(e.voice, this._settings.voice) || !this.sameSettingValue(e.languageOverrides, this._settings.languageOverrides)) && await this.pickVoices().catch(() => {
    }), this._preferencesEditor !== null && (this._preferencesEditor = new jn(this._preferences, this.settings)), Nn.some((t) => !this.sameSettingValue(this.extractionValue(e, t), this.extractionValue(this._settings, t))))
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
  yr as BooleanPreference,
  Re as EnumPreference,
  Il as FallbackEngineProvider,
  fr as FallbackSpeechEngine,
  zl as Locator,
  Ml as LocatorLocations,
  jl as LocatorText,
  ae as Preference,
  _e as RangePreference,
  vr as ReadiumSpeechDecorationController,
  Ol as ReadiumSpeechNavigator,
  Pl as ReadiumSpeechProviderRegistry,
  zn as SpeechDefaults,
  me as SpeechPreferences,
  jn as SpeechPreferencesEditor,
  Ds as SpeechServerAudioDecodeError,
  ur as SpeechServerEngine,
  Rl as SpeechServerEngineProvider,
  Le as SpeechServerError,
  Fs as SpeechServerNetworkError,
  Bs as SpeechServerStallError,
  Et as SpeechSettings,
  Mn as StringArrayPreference,
  Tn as WebSpeechEngine,
  Cl as WebSpeechEngineProvider,
  A as WebSpeechVoiceManager,
  on as autoPauseScopes,
  vo as blockLevelRoles,
  Zr as builtInSubstitutions,
  io as builtInSuppressions,
  fe as chineseVariantMap,
  ps as compareAlphabetically,
  fs as compareByPreferredRegion,
  kr as contextualizationShapesAtVerbosity,
  wr as contextualizedAtVerbosity,
  pe as createJsonOrderMap,
  mr as createLocator,
  ii as defaultContextualizations,
  L as extractLangRegionFromBCP47,
  Vl as extractUtterances,
  rn as extractionFormats,
  Nn as extractionPreferenceKeys,
  ys as filterByBoundarySupport,
  pa as filterByLanguages,
  Ut as filterOutNoveltyVoices,
  Nt as filterOutVeryLowQualityVoices,
  Lt as getLanguageDisplayName,
  We as getQualityValue,
  G as getVoiceId,
  dt as groupVoicesByLanguage,
  So as interruptionRoles,
  $s as interruptionValues,
  Ot as isNoveltyVoice,
  hr as isRecoverableFailure,
  Tt as isVeryLowQualityVoice,
  an as languageModes,
  et as pauseDurationRangeConfig,
  vs as pickBestVoiceByRegion,
  ws as pickDefaultVoice,
  bs as pickLanguageVoice,
  nt as pitchRangeConfig,
  tt as rateRangeConfig,
  Wr as resolveBoundaryLocate,
  Qr as resolveUtteranceLocate,
  ln as segmentationModes,
  Al as setupDecorations,
  xl as shapeableRoles,
  Ll as skippableRoles,
  br as skippedAtVerbosity,
  Vt as sortAlphabetically,
  oa as sortByPreferredRegion,
  se as sortByQuality,
  ms as sortVoicesByRegions,
  ea as valueForLanguage,
  sn as verbosityPresets,
  st as volumeRangeConfig
};
