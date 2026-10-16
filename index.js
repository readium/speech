import { DecorationController as ci, DirectCommsChannel as ui, Decorator as hi } from "@readium/decorator";
export * from "@readium/decorator";
import { LocatorText as di, LocatorLocations as gi, Locator as fi } from "@readium/shared";
import { Locator as gr, LocatorLocations as fr, LocatorText as pr } from "@readium/shared";
import { startsWithBindingPunct as he, ssmlTextEscape as T, BINDING_PUNCT_CLASS as se, ssmlAttrEscape as ln } from "@readium/helpers";
import pi from "i18next";
import { decodeTextref as Et, combineDomRangeTextrefs as mi, substitutedOwnSelector as vi, isAriaSubstituted as de } from "@readium/guided-navigation";
import { DomRange as yi, DomRangePoint as Rt } from "@readium/shared/html";
const k = (n) => {
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
}, nt = (n, e) => {
  const t = e.toLowerCase().replace(/_/g, "-"), [i] = k(e), s = Object.entries(n);
  for (const a of [t, i]) {
    const r = s.find(([o]) => o.toLowerCase().replace(/_/g, "-") === a);
    if (r) return r[1];
  }
}, cn = (n, e) => {
  const t = e.toLowerCase().replace(/_/g, "-"), [i] = k(e);
  let s;
  for (const a of [i, t])
    for (const [r, o] of Object.entries(n))
      r.toLowerCase().replace(/_/g, "-") === a && (s ??= /* @__PURE__ */ new Set(), o.forEach((l) => s.add(l)));
  return s && [...s];
}, U = {
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
}, xe = /* @__PURE__ */ new Map(), Si = /* @__PURE__ */ Object.assign({ "../../json/ar.json": () => import("./ar-BGKtJRyt.js"), "../../json/bg.json": () => import("./bg-D9Q1JriY.js"), "../../json/bho.json": () => import("./bho-CpuLBMN3.js"), "../../json/bn.json": () => import("./bn-Bpn_lzoe.js"), "../../json/ca.json": () => import("./ca-5hzouNcE.js"), "../../json/cmn.json": () => import("./cmn-DlnYMCd8.js"), "../../json/cs.json": () => import("./cs-CDpMkMNO.js"), "../../json/da.json": () => import("./da-XWCfWAwB.js"), "../../json/de.json": () => import("./de-DU0USiOh.js"), "../../json/el.json": () => import("./el-ClBwbIAW.js"), "../../json/en.json": () => import("./en-l3wcpTw3.js"), "../../json/es.json": () => import("./es-DwOFJY07.js"), "../../json/eu.json": () => import("./eu-DxWirHU-.js"), "../../json/fa.json": () => import("./fa-Ml9KtIw1.js"), "../../json/fi.json": () => import("./fi-Dk-5Fhhl.js"), "../../json/fr.json": () => import("./fr-MfhjukJ4.js"), "../../json/gl.json": () => import("./gl-DwtzWds9.js"), "../../json/he.json": () => import("./he-CfajFNE_.js"), "../../json/hi.json": () => import("./hi-pv2ttBoh.js"), "../../json/hr.json": () => import("./hr-MRApcEKR.js"), "../../json/hu.json": () => import("./hu-DGRDZdHH.js"), "../../json/id.json": () => import("./id-DZUuUiTG.js"), "../../json/it.json": () => import("./it-DJUYnjyj.js"), "../../json/ja.json": () => import("./ja-BpFcZRMu.js"), "../../json/kk.json": () => import("./kk-C480t1iH.js"), "../../json/kn.json": () => import("./kn-BVqs26qv.js"), "../../json/ko.json": () => import("./ko-TNoPZd6N.js"), "../../json/mr.json": () => import("./mr-DstAHTvT.js"), "../../json/ms.json": () => import("./ms-BceBSD-j.js"), "../../json/nb.json": () => import("./nb-CwPbwG-i.js"), "../../json/nl.json": () => import("./nl-BmW-Dmw5.js"), "../../json/pl.json": () => import("./pl-CH8qoDu8.js"), "../../json/pt.json": () => import("./pt-CjCENn24.js"), "../../json/ro.json": () => import("./ro-BlJN7qkA.js"), "../../json/ru.json": () => import("./ru-udzq1D5e.js"), "../../json/sk.json": () => import("./sk-VAEHsTWJ.js"), "../../json/sl.json": () => import("./sl-DaZQ1gp0.js"), "../../json/sv.json": () => import("./sv-CicHwXe4.js"), "../../json/ta.json": () => import("./ta-CvpRY89g.js"), "../../json/te.json": () => import("./te-D5TcdW9V.js"), "../../json/th.json": () => import("./th-CYakoFVa.js"), "../../json/tr.json": () => import("./tr-BfYrcAz7.js"), "../../json/uk.json": () => import("./uk-BVs6lQbX.js"), "../../json/vi.json": () => import("./vi-DP1xN9KL.js"), "../../json/wuu.json": () => import("./wuu-C6uQvT6g.js"), "../../json/yue.json": () => import("./yue-C8kEWdfv.js") });
async function bi(n) {
  try {
    const e = n.split("-")[0], t = Si[`../../json/${e}.json`];
    if (!t)
      throw new Error(`No voice data found for language: ${n}`);
    const s = (await t()).default;
    return {
      ...s,
      voices: s.voices.map(Ci)
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
function It(n) {
  return xe.has(n) || xe.set(n, bi(n)), xe.get(n);
}
const wi = ["veryLow", "low", "normal", "high", "veryHigh"], ki = ["android", "apple"], Ci = (n) => ({
  ...n,
  quality: n.quality?.filter((e) => wi.includes(e)),
  localizedName: n.localizedName && ki.includes(n.localizedName) ? n.localizedName : void 0
}), re = {
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
  let e = n.toLowerCase().replace(/_/g, "-");
  if (/\w{2,3}-\w{2,3}/.test(e)) {
    const [t, i] = e.split("-");
    e = `${t.toLowerCase()}-${i.toUpperCase()}`;
  }
  return re[e] || e;
}, je = async (n) => {
  if (!n) return [];
  try {
    const e = V(n);
    try {
      const i = await It(e);
      if (i?.voices?.length)
        return i.voices;
    } catch (i) {
      console.warn(`Failed to load voices for ${e}:`, i);
    }
    const [t] = k(e);
    if (t !== e)
      try {
        const i = await It(t);
        if (i?.voices?.length)
          return i.voices;
      } catch (i) {
        console.warn(`Failed to load voices for base language ${t}:`, i);
      }
    return [];
  } catch (e) {
    return console.error(`Error in getVoices for ${n}:`, e), [];
  }
}, De = (n, e) => {
  try {
    return new Intl.DisplayNames(
      e ? [e] : [],
      { type: "language", languageDisplay: "standard" }
    ).of(n) || n.toUpperCase();
  } catch {
    return n.toUpperCase();
  }
}, Pt = (n) => {
  if (!n) return "";
  try {
    const e = V(n), t = U[e];
    if (t?.testUtterance)
      return t.testUtterance;
    if (e in re) {
      const s = re[e];
      if (s && U[s]?.testUtterance)
        return U[s].testUtterance;
    }
    const [i] = k(e);
    return i !== e && U[i]?.testUtterance ? U[i].testUtterance : "";
  } catch (e) {
    return console.error(`Error in getTestUtterance for ${n}:`, e), "";
  }
}, Re = (n) => {
  if (!n) return "";
  try {
    const e = V(n), t = U[e];
    if (t?.defaultRegion)
      return `${e}-${t.defaultRegion}`;
    if (e in re) {
      const s = re[e];
      if (s) {
        const a = U[s];
        if (a?.defaultRegion)
          return `${s}-${a.defaultRegion}`;
      }
    }
    const [i] = k(e);
    if (i !== e) {
      const s = U[i];
      if (s?.defaultRegion)
        return `${i}-${s.defaultRegion}`;
    }
    return "";
  } catch (e) {
    return console.error(`Failed to get default region for ${n}:`, e), "";
  }
}, Ie = (n) => {
  if (!n?.length) return [];
  const e = /* @__PURE__ */ new Set(), t = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  for (const [s, a] of n.entries()) {
    if (!a) continue;
    const r = V(a), [o, l] = k(r);
    l && (e.add(l), i.has(l) || i.set(l, s)), t.has(o) || t.set(o, /* @__PURE__ */ new Set()), l && t.get(o).add(l);
  }
  return Array.from(t.entries()).map(([s, a]) => {
    const r = new Set(
      U[s]?.availableRegions || []
    ), o = Array.from(a), l = Array.from(e).filter(
      (u) => r.has(u) && !o.includes(u)
    ), c = Array.from(/* @__PURE__ */ new Set([...o, ...l])).sort((u, g) => {
      const d = i.get(u) ?? Number.MAX_SAFE_INTEGER, h = i.get(g) ?? Number.MAX_SAFE_INTEGER;
      return d - h;
    });
    if (c.length === 0) {
      const u = Re(s), [, g] = k(u);
      g && c.push(g);
    }
    return {
      baseLang: s,
      regions: c
    };
  });
}, H = async (n) => {
  const e = /* @__PURE__ */ new Map();
  for (const i of n) {
    if (i.source !== "json") continue;
    const [s] = k(i.language);
    e.has(s) || e.set(s, []), e.get(s).push(i);
  }
  const t = /* @__PURE__ */ new Map();
  for (const [i, s] of e.entries()) {
    const a = /* @__PURE__ */ new Map(), r = await je(i), o = /* @__PURE__ */ new Map();
    r.forEach((l, c) => {
      o.set(l.name.toLowerCase(), c), l.altNames?.forEach((u) => {
        o.set(u.toLowerCase(), c);
      });
    });
    for (const l of s) {
      const c = l.name.toLowerCase(), u = o.get(c);
      u !== void 0 && a.set(l.name, u);
    }
    a.size > 0 && t.set(i, a);
  }
  return t;
}, Ei = {
  veryLow: 1,
  low: 2,
  normal: 3,
  high: 4,
  veryHigh: 5
}, Se = (n) => n ? Ei[n] ?? 0 : 0, $ = (n, e, t, i) => {
  const s = Se(n.quality), a = Se(e.quality);
  if (t && i && n.source === "json" && e.source === "json") {
    const r = t.get(i);
    if (r) {
      const o = r.get(n.name), l = r.get(e.name);
      if (o !== void 0 && l !== void 0)
        return o - l;
    }
  }
  return a !== s ? a - s : n.name.localeCompare(e.name);
}, Pe = (n, e) => {
  const t = new Map(e.map((a) => [a.baseLang, a])), i = /* @__PURE__ */ new Map(), s = [];
  for (const a of n) {
    const [r] = k(a.language);
    t.get(r) ? (i.has(r) || i.set(r, []), i.get(r).push(a)) : s.push(a);
  }
  return { voicesByLang: i, otherLangVoices: s };
}, un = (n, e, t, i) => {
  const [, s] = k(n.language), [, a] = k(e.language), r = s && t.regions.includes(s), o = a && t.regions.includes(a);
  if (r && o) {
    const d = t.regions.indexOf(s), h = t.regions.indexOf(a);
    return d === h ? $(n, e, i, t.baseLang) : d - h;
  }
  if (r) return -1;
  if (o) return 1;
  const l = Re(t.baseLang), [, c] = k(l), u = !!c && s === c, g = !!c && a === c;
  if (u && !g) return -1;
  if (!u && g) return 1;
  if (s && a) {
    const d = s.localeCompare(a);
    return d !== 0 ? d : $(n, e, i, t.baseLang);
  }
  return s ? -1 : a ? 1 : $(n, e, i, t.baseLang);
}, Ri = async (n, e, t) => {
  const i = t ?? await H(n);
  n.sort((s, a) => un(s, a, e, i));
}, hn = (n, e, t) => {
  const [i] = k(n.language), [s] = k(e.language), a = De(i).toLowerCase(), r = De(s).toLowerCase(), o = a.localeCompare(r);
  if (o !== 0)
    return o;
  if (i === s) {
    const l = Re(i), [, c] = k(n.language), [, u] = k(e.language), g = l && c === l.split("-")[1], d = l && u === l.split("-")[1];
    if (g && !d) return -1;
    if (!g && d) return 1;
    if (c && u) {
      const h = c.localeCompare(u);
      if (h !== 0)
        return h;
    }
    return c && !u ? -1 : !c && u ? 1 : $(n, e, t, i);
  }
  return $(n, e, t, i);
}, Fe = async (n, e) => {
  const t = e ?? await H(n);
  n.sort((i, s) => hn(i, s, t));
}, dn = async (n, e) => {
  if (!e?.length) return [];
  const t = Ie(n || []), { voicesByLang: i, otherLangVoices: s } = Pe(e, t), a = await H(e), r = [];
  for (const o of t) {
    const l = i.get(o.baseLang);
    l && (await Ri(l, o, a), r.push(...l));
  }
  return await Fe(s, a), r.push(...s), r;
}, gn = async (n, e) => {
  if (!e.length) return null;
  const [t] = Ie([n]), { voicesByLang: i, otherLangVoices: s } = Pe(e, [t]), a = i.get(t.baseLang), r = a?.length ? a : s, o = await H(e), l = a?.length ? (c, u) => un(c, u, t, o) : (c, u) => hn(c, u, o);
  return r.reduce((c, u) => l(u, c) < 0 ? u : c);
}, it = (n, e) => {
  const t = n.filter((i) => i.controls?.boundary !== !1 === e);
  return t.length > 0 ? t : n;
}, Ii = [{ name: "Albert", nativeID: ["com.apple.speech.synthesis.voice.Albert"], note: "This novelty voice is part of a pack preloaded by Apple.", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Bad News", nativeID: ["com.apple.speech.synthesis.voice.BadNews"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Mauvaises nouvelles", "Malas noticias", "Brutte notizie"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Bahh", nativeID: ["com.apple.speech.synthesis.voice.Bahh"], note: "This novelty voice is part of a pack preloaded by Apple.", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Bells", nativeID: ["com.apple.speech.synthesis.voice.Bells"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Cloches", "Campanas", "Campane"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Boing", nativeID: ["com.apple.speech.synthesis.voice.Boing"], note: "This novelty voice is part of a pack preloaded by Apple.", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Bubbles", nativeID: ["com.apple.speech.synthesis.voice.Bubbles"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Bulles", "Burbujas", "Bollicine"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Cellos", nativeID: ["com.apple.speech.synthesis.voice.Cellos"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Violoncelles", "Violonchelos", "Violoncelli"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Good News", nativeID: ["com.apple.speech.synthesis.voice.GoodNews"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Bonnes nouvelles", "Buenas noticias", "Buone notizie"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Jester", nativeID: ["com.apple.speech.synthesis.voice.Hysterical"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Bouffon", "Bufón", "Giullare"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Organ", nativeID: ["com.apple.speech.synthesis.voice.Organ"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Orgue", "Órgano", "Organo"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Superstar", nativeID: ["com.apple.speech.synthesis.voice.Princess"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Superestrella"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Trinoids", nativeID: ["com.apple.speech.synthesis.voice.Trinoids"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Trinoïdes"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Whisper", nativeID: ["com.apple.speech.synthesis.voice.Whisper"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Murmure", "Susurro", "Sussurro"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Wobble", nativeID: ["com.apple.speech.synthesis.voice.Deranged"], note: "This novelty voice is part of a pack preloaded by Apple.", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Zarvox", nativeID: ["com.apple.speech.synthesis.voice.Zarvox"], note: "This novelty voice is part of a pack preloaded by Apple.", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }], Pi = {
  voices: Ii
}, Ai = [{ name: "Eddy", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Flo", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Grandma", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Grandpa", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Jacques", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Reed", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Rocko", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Sandy", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Shelley", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Fred", language: "en-US", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Junior", language: "en-US", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Kathy", language: "en-US", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Ralph", language: "en-US", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "eSpeak Arabic", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ar", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Bulgarian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "bg", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Bengali", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "bn", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Catalan", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ca", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Chinese (Mandarin, latin as English)", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "cmn", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Czech", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "cs", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Danish", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "da", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak German", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "de", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Greek", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "el", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Spanish (Spain)", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "es", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Estonian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "et", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Finnish", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "fi", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Gujarati", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "gu", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Croatian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "hr", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Hungarian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "hu", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Indonesian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "id", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Italian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "it", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Kannada", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "kn", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Korean", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ko", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Lithuanian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "lt", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Latvian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "lv", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Malayalm", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ml", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Marathi", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "mr", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Malay", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ms", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Norwegian Bokmål", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "nb", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Polish", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "pl", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Portuguese (Brazil)", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "pt-br", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Romanian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ro", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Russian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ru", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Slovak", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "sk", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Slovenian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "sl", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Serbian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "sv", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Swedish", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "sv", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Swahili", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "sw", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Tamil", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ta", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Telugu", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "te", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Turkish", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "tr", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Vietnamese (Northern)", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "vi", os: ["ChromeOS"], preloaded: !0 }], Li = {
  voices: Ai
}, Oi = Pi, Vi = Li, _e = (n, e) => Oi.voices.some(
  (t) => n.includes(t.name) || e && t.nativeID?.some((i) => e.includes(i)) || t.altNames?.some((i) => n.includes(i))
), $e = (n, e) => Vi.voices.some(
  (t) => n.includes(t.name)
) || e === "veryLow", At = (n) => n?.length ? n.filter((e) => !(e.isNovelty || _e(e.name, e.voiceURI))) : [], Lt = (n) => n?.length ? n.filter((e) => !$e(e.name, e.quality)) : [], xi = (n, e) => {
  const t = Array.isArray(e) ? e : [e];
  return n.filter((i) => t.some((s) => {
    const a = s.toLowerCase(), r = i.language?.toLowerCase(), o = i.altLanguage?.toLowerCase();
    if (r === a || o === a)
      return !0;
    const [l] = a.split("-");
    return r && r.startsWith(l) || o && o.startsWith(l);
  }));
}, Ui = { ar: { normal: "محسن", high: "استثنائي" }, ca: { normal: "millorada", high: "prèmium" }, "cmn-CN": { normal: "优化音质", high: "高音质" }, "cmn-TW": { normal: "增強音質", high: "高音質" }, cs: { normal: "vylepšená verze", high: "prémiový" }, da: { normal: "forbedret", high: "høj kvalitet" }, de: { normal: "erweitert", high: "premium" }, el: { normal: "βελτιωμένη", high: "υψηλής ποιότητας" }, en: { normal: "Enhanced", high: "Premium" }, es: { normal: "mejorada", high: "premium" }, fi: { normal: "parannettu", high: "korkealaatuinen" }, fr: { normal: "premium", high: "de qualité" }, he: { normal: "משופר", high: "פרימיום" }, hi: { normal: "बेहतर", high: "प्रीमियम" }, hr: { normal: "poboljšani", high: "vrhunski" }, hu: { normal: "továbbfejlesztett", high: "prémium" }, id: { normal: "Ditingkatkan", high: "Premium" }, it: { normal: "ottimizzata", high: "premium" }, ja: { normal: "拡張", high: "プレミアム" }, ko: { normal: "고품질", high: "프리미엄" }, ms: { normal: "Dipertingkat", high: "Premium" }, nb: { normal: "forbedret", high: "premium" }, nl: { normal: "verbeterd", high: "premium" }, pl: { normal: "rozszerzony", high: "premium" }, pt: { normal: "melhorada", high: "premium" }, ro: { normal: "îmbunătățită", high: "premium" }, ru: { normal: "улучшенный", high: "высшее качество" }, sk: { normal: "vylepšený", high: "prémiový" }, sl: { normal: "izboljšano", high: "prvovrsten" }, sv: { normal: "förbättrad", high: "premium" }, th: { normal: "คุณภาพสูง", high: "คุณภาพสูง" }, tr: { normal: "Geliştirilmiş", high: "Yüksek Kaliteli" }, uk: { normal: "вдосконалений", high: "високої якості" }, vi: { normal: "Nâng cao", high: "Cao cấp" } }, Ti = {
  quality: Ui
}, qe = {
  apple: Ti.quality
  // android: androidQualities.quality
}, zi = (n, e, t) => {
  if (!n) return;
  const i = Array.isArray(t) ? t : t ? [t] : [];
  for (const s of i)
    if (s && qe[s]) {
      const a = qe[s], r = k(e)[0], o = a[e] || a[r];
      if (o) {
        const l = n.toLowerCase(), { normal: c, high: u } = o;
        if (u && l.includes(u.toLowerCase()))
          return "high";
        if (c && l.includes(c.toLowerCase()))
          return "normal";
      }
    }
}, Ni = (n, e) => {
  const t = qe[e];
  if (t)
    for (const [i, { high: s, normal: a }] of Object.entries(t)) {
      const r = s && n.some((l) => l.includes(s)), o = a && n.some((l) => l.includes(a));
      if (r && o)
        return i;
    }
}, Mi = {
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
}, Ot = (n) => {
  if (!n) return;
  const t = n.toLowerCase().split(/[._-]/);
  for (const i of Object.values(Mi))
    if (i.values.some((s) => t.includes(s)))
      return i.quality;
};
function Bi(n, e) {
  if (n.name === n.originalName) return n;
  if (e.name === e.originalName) return e;
  const t = [n.originalName, ...n.altNames || []], i = [e.originalName, ...e.altNames || []], s = t.findIndex((r) => i.includes(r)), a = i.findIndex((r) => t.includes(r));
  return s === -1 && a === -1 || s !== -1 && (a === -1 || s <= a) ? n : e;
}
function ji(n, e) {
  if (!n.altNames && !e.altNames)
    return !1;
  const t = n.originalName, i = e.originalName, s = n.altNames || [], a = e.altNames || [];
  return a.includes(t) || s.includes(i) ? !0 : s.filter((o) => a.includes(o)).length > 0;
}
const fn = () => {
  const e = typeof window < "u" && (window.navigator || {}).userAgent || "", t = () => /android/i.test(e), i = () => /kaios/i.test(e), s = () => typeof window.InstallTrigger < "u" ? !0 : /firefox/i.test(e), a = () => /AppleWebKit/i.test(e) && !/Chrome|Chromium|Edg\/|OPR|Android/i.test(e);
  return {
    isAndroid: t(),
    isFirefox: s() || i(),
    isSafari: a(),
    isKaiOS: i()
  };
};
class C {
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
    this.systemLocale = navigator.languages?.[0]?.split("-")[0] || "en", this.isAndroid = fn().isAndroid;
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
    if (C.instance?.isInitialized) {
      const t = C.instance;
      return e?.languages && e.languages.length > 0 && await t.broadenLanguages(e.languages), t;
    }
    return C.initializationPromise || (C.initializationPromise = (async () => {
      try {
        const t = new C();
        C.instance = t, t.browserVoices = await t.getBrowserVoices(e?.maxTimeout, e?.interval), t.updateSystemLocale(t.browserVoices);
        let i = t.browserVoices;
        return e?.languages && e.languages.length > 0 ? (i = t.filterBrowserVoicesByLanguages(t.browserVoices, e.languages), t.scopedLanguages = C.toBaseLangSet(e.languages)) : t.scopedLanguages = null, t.voices = await t.parseToReadiumSpeechVoices(i), t.isInitialized = !0, t;
      } catch (t) {
        throw C.initializationPromise = null, console.error("Failed to initialize WebSpeechVoiceManager:", t), t;
      }
    })()), C.initializationPromise;
  }
  /**
   * Filter browser voices based on preferred languages
   * @private
   */
  filterBrowserVoicesByLanguages(e, t) {
    if (!t?.length) return e;
    const i = C.toBaseLangSet(t);
    return e.filter((s) => {
      if (!s?.lang) return !1;
      const a = V(s.lang), [r] = C.extractLangRegionFromBCP47(a);
      return i.has(r);
    });
  }
  /**
   * Extract base language codes (e.g. "en", "fr") from a list of BCP47 tags
   * @private
   */
  static toBaseLangSet(e) {
    return new Set(
      e.map((t) => {
        const i = V(t), [s] = C.extractLangRegionFromBCP47(i);
        return s;
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
    const i = [...C.toBaseLangSet(e)].filter((o) => !this.scopedLanguages.has(o));
    if (i.length === 0) return;
    const s = i.filter((o) => this.broadenPromises.has(o)), a = i.filter((o) => !this.broadenPromises.has(o));
    let r;
    a.length > 0 && (r = (async () => {
      const o = this.filterBrowserVoicesByLanguages(this.browserVoices, a), l = await this.parseToReadiumSpeechVoices(o);
      this.voices = [...this.voices, ...l], a.forEach((c) => this.scopedLanguages.add(c)), a.forEach((c) => this.broadenPromises.delete(c));
    })(), a.forEach((o) => this.broadenPromises.set(o, r))), await Promise.all([
      ...r ? [r] : [],
      ...s.map((o) => this.broadenPromises.get(o))
    ]);
  }
  /**
   * Extract language and region from BCP47 language tag
   * @param lang - The BCP47 language tag (e.g., "en-US", "zh-CN")
   * @returns A tuple of [language, region] where language is lowercase and region is UPPERCASE
   */
  static extractLangRegionFromBCP47(e) {
    return k(e);
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
    for (const i of e) {
      if (!i?.name || !i?.lang) continue;
      const s = `${i.lang.toLowerCase()}_${this.normalizeVoiceName(i.name)}`;
      t.set(s, (t.get(s) || 0) + 1);
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
    const t = e.map((s) => s.name), i = Ni(t, "apple");
    i && (this.systemLocale = i);
  }
  /**
   * Infer voice quality based on package, platform, JSON, or duplicate count
   * Returns null if quality cannot be determined
   * @private
   */
  inferVoiceQuality(e, t, i) {
    const s = e.voiceURI ? Ot(e.voiceURI) : void 0;
    if (s) return s;
    if (t?.nativeID && Array.isArray(t.nativeID))
      for (const a of t.nativeID) {
        const r = Ot(a);
        if (r) return r;
      }
    if (t?.localizedName && e.voiceURI && e.lang) {
      const a = zi(
        e.voiceURI,
        this.systemLocale,
        t.localizedName
      );
      if (a) return a;
    }
    if (t?.quality && t.quality.length > 0) {
      const a = Math.min(i - 1, t.quality.length - 1), r = t.quality[a];
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
      (i) => this.normalizeVoiceName(i.name) === t || i.altNames?.some((s) => this.normalizeVoiceName(s) === t)
    );
  }
  /**
   * Remove duplicate voices, keeping the highest quality version of each voice
   * @param voices Array of voices to remove duplicates from
   * @returns Filtered array with duplicates removed, keeping only the highest quality versions
   */
  removeDuplicates(e) {
    const t = /* @__PURE__ */ new Map();
    for (const i of e) {
      const s = `${i.language.toLowerCase()}_${this.normalizeVoiceName(i.name)}`, a = t.get(s);
      if (!a)
        t.set(s, i);
      else if (ji(i, a)) {
        const r = Bi(i, a);
        t.set(s, r);
      } else {
        const r = Se(a.quality);
        Se(i.quality) >= r && t.set(s, i);
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
    const t = Pt(e);
    if (t) return t;
    const [i] = C.extractLangRegionFromBCP47(e);
    if (i && i !== e) {
      const s = Pt(i);
      if (s) return s;
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
  getLanguages(e, t, i) {
    if (!i && !this.isInitialized)
      throw new Error("WebSpeechVoiceManager not initialized. Call initialize() first.");
    const s = i ?? this.voices, a = t ? this.filterVoices(t, s) : s, r = this.countLanguages(a.map((o) => o.language), e);
    return i ? r : r.sort((o, l) => o.label.localeCompare(l.label));
  }
  /**
   * Get the languages of every voice the browser has, with voice counts, sorted by name
   * Unlike getLanguages(), it covers languages initialize() wasn't called with, without loading their voice data
   * @param localization Optional BCP 47 language tag to use for language names
   */
  getBrowserLanguages(e) {
    if (!this.isInitialized)
      throw new Error("WebSpeechVoiceManager not initialized. Call initialize() first.");
    const t = this.browserVoices.filter((i) => i?.lang).map((i) => i.lang);
    return this.countLanguages(t, e).sort((i, s) => i.label.localeCompare(s.label));
  }
  // By base language, in order of first occurrence
  countLanguages(e, t) {
    const i = /* @__PURE__ */ new Map();
    for (const s of e) {
      const a = V(s).split("-")[0];
      i.set(a, (i.get(a) ?? 0) + 1);
    }
    return [...i].map(([s, a]) => ({ code: s, label: De(s, t), count: a }));
  }
  /**
   * Get available regions with voice counts
   * @param localization Optional BCP 47 language tag to use for region names
   * @param filterOptions Optional filters to apply to voices before counting regions
   * @param voices Optional array of voices to count (defaults to this.voices)
   */
  getRegions(e, t, i) {
    if (!i && !this.isInitialized)
      throw new Error("WebSpeechVoiceManager not initialized. Call initialize() first.");
    const s = i ?? this.voices, a = t ? this.filterVoices(t, s) : s, r = [], o = /* @__PURE__ */ new Set(), l = /* @__PURE__ */ new Map();
    for (const c of a) {
      const [, u] = C.extractLangRegionFromBCP47(c.language);
      u && l.set(u, (l.get(u) || 0) + 1);
    }
    for (const c of a) {
      const [, u] = C.extractLangRegionFromBCP47(c.language);
      if (u && !o.has(u)) {
        let g = c.language;
        try {
          const d = e || navigator.language;
          g = new Intl.DisplayNames([d], { type: "region" }).of(u) || c.language;
        } catch (d) {
          console.warn(`Failed to get display name for region ${u}`, d);
        }
        r.push({
          code: u,
          label: g,
          count: l.get(u) || 0
        }), o.add(u);
      }
    }
    return i ? r : r.sort((c, u) => c.label.localeCompare(u.label));
  }
  /**
   * Get the default voice for language preferences
   * @param languages Array of preferred languages in order of preference, or a single language string
   * @param voices Optional pre-filtered voices array to use instead of fetching voices
   * @returns The default voice for the language, or null if no voices are available
   */
  async getDefaultVoice(e, t) {
    if (!e) return null;
    const i = Array.isArray(e) ? e : [e];
    let s = t || this.getVoices({ languages: i });
    return s.length ? (s = await this.sortVoicesByRegions(i, s), s[0]) : null;
  }
  getBrowserVoices(e = 1e4, t = 10) {
    const i = () => window.speechSynthesis?.getVoices() || [];
    if (!window.speechSynthesis)
      return Promise.resolve([]);
    const s = i();
    return Array.isArray(s) && s.length ? Promise.resolve(s) : new Promise((a, r) => {
      let o = Math.floor(e / t), l = !1;
      const c = () => {
        if (l) return;
        l = !0;
        const u = () => {
          if (o < 1) return a([]);
          --o;
          const g = i();
          if (Array.isArray(g) && g.length) return a(g);
          setTimeout(u, t);
        };
        setTimeout(u, t);
      };
      window.speechSynthesis.onvoiceschanged !== void 0 ? window.speechSynthesis.onvoiceschanged = () => {
        const u = i();
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
      e.filter((s) => s?.name && s?.lang).map(async (s) => {
        const a = V(s.lang), [r] = C.extractLangRegionFromBCP47(a), o = this.normalizeVoiceName(s.name), l = `${s.lang.toLowerCase()}_${o}`, c = t.get(l) || 1;
        let u = await je(a);
        (!u || u.length === 0) && (u = await je(r));
        const g = this.findMatchingJsonVoice(u, o), d = this.inferVoiceQuality(s, g, c), h = this.isAndroid ? { ...g?.controls, boundary: !1 } : g?.controls;
        return g ? {
          ...g,
          label: g.label ?? this.cleanVoiceName(s.name),
          source: "json",
          originalName: s.name,
          ...h && { controls: h },
          language: g.language ?? a,
          voiceURI: s.voiceURI,
          quality: d,
          isDefault: s.default || !1,
          offlineAvailability: s.localService || !1,
          isNovelty: _e(s.name, s.voiceURI),
          isLowQuality: $e(s.name, d)
        } : {
          source: "browser",
          label: this.cleanVoiceName(s.name),
          name: s.name,
          originalName: s.name,
          ...h && { controls: h },
          language: a,
          voiceURI: s.voiceURI,
          quality: d,
          isDefault: s.default || !1,
          offlineAvailability: s.localService || !1,
          isNovelty: _e(s.name, s.voiceURI),
          isLowQuality: $e(s.name, d)
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
    let i = t ? [...t] : [...this.voices];
    const s = {
      excludeNovelty: !0,
      // Default to true to filter out novelty voices
      excludeVeryLowQuality: !0,
      // Default to true to filter out very low quality voices
      removeDuplicates: !0,
      // Default to true - remove duplicates by default
      ...e
      // Let explicit options override the defaults
    };
    if (s.languages && (i = xi(i, s.languages)), s.source && (i = i.filter((a) => a.source === s.source)), s.gender && (i = i.filter((a) => a.gender === s.gender)), s.quality) {
      const a = Array.isArray(s.quality) ? s.quality : [s.quality];
      i = i.filter((r) => r.quality && a.includes(r.quality));
    }
    return s.offlineOnly && (i = i.filter((a) => a.offlineAvailability === !0)), s.provider && (i = i.filter(
      (a) => a.provider?.toLowerCase() === s.provider?.toLowerCase()
    )), s.excludeNovelty && (i = At(i)), s.excludeVeryLowQuality && (i = Lt(i)), s.removeDuplicates && (i = this.removeDuplicates(i)), i;
  }
  /**
   * Filter out novelty voices
   * @param voices Array of voices to filter
   * @returns Filtered array with novelty voices removed
   */
  filterOutNoveltyVoices(e) {
    const t = e ?? this.voices;
    return At(t);
  }
  /**
   * Filter out very low quality voices
   * @param voices Array of voices to filter
   * @returns Filtered array with very low quality voices removed
   */
  filterOutVeryLowQualityVoices(e) {
    const t = e ?? this.voices;
    return Lt(t);
  }
  /**
   * Sort voices by quality, respecting JSON name order, then alphabetically for undefined/null quality
   * @param voices Array of voices to sort
   * @returns Sorted array of voices
   */
  async sortVoicesByQuality(e) {
    const t = e || this.voices;
    if (!t?.length) return [];
    const i = await H(t);
    return [...t].sort((s, a) => $(s, a, i));
  }
  /**
   * Sort regions by default then alphabetically, sort voices by quality
   */
  static async sortByDefaultRegion(e, t) {
    const i = await H(e), s = Re(t);
    e.sort((a, r) => {
      const [, o] = C.extractLangRegionFromBCP47(a.language), [, l] = C.extractLangRegionFromBCP47(r.language), c = s && o === s.split("-")[1], u = s && l === s.split("-")[1];
      return c && !u ? -1 : !c && u ? 1 : $(a, r, i, t);
    });
  }
  /**
   * Sort voices by language preference, then alphabetically
   * @param voices Array of voices to sort
   * @param preferredLanguages Array of preferred language codes in order of preference
   * @returns Sorted array of voices
   */
  async sortVoicesByLanguages(e, t) {
    const i = t || this.voices;
    if (!i?.length) return [];
    if (!e?.length) {
      const l = [...i];
      return await Fe(l), l;
    }
    const s = Ie(e), { voicesByLang: a, otherLangVoices: r } = Pe(i, s), o = [];
    for (const l of s) {
      const c = a.get(l.baseLang);
      c && (await C.sortByDefaultRegion(c, l.baseLang), o.push(...c));
    }
    return await Fe(r), o.push(...r), o;
  }
  /**
   * Sort voices by region preference, then alphabetically
   * @param voices Array of voices to sort
   * @param preferredLanguages Array of preferred language codes in order of preference
   * @returns Sorted array of voices
   */
  async sortVoicesByRegions(e, t) {
    return dn(e, t || this.voices);
  }
  /**
   * Group voices by the specified criteria
   * @param voices Array of voices to group
   * @param options Grouping options
   * @returns Object with voice groups keyed by the grouping criteria
   */
  groupVoices(e, t) {
    const i = {}, s = t || this.voices;
    for (const a of s) {
      let r = "Unknown";
      switch (e) {
        case "languages":
          r = C.extractLangRegionFromBCP47(a.language)[0];
          break;
        case "gender":
          r = a.gender || "unknown";
          break;
        case "quality":
          r = a.quality || "unknown";
          break;
        case "region":
          const [, o] = C.extractLangRegionFromBCP47(a.language);
          r = o || "unknown";
          break;
      }
      i[r] || (i[r] = []), i[r].push(a);
    }
    return i;
  }
}
const pn = (n, e) => {
  const [t, i] = k(e), [s, a] = k(n.language);
  return s === t && (!i || a === i);
}, Ge = (n, e) => !!n && k(n.language)[0] === k(e)[0], Di = ["webKit", "moz", "ms", "o"], Fi = [
  "boundary",
  "end",
  "error",
  "mark",
  "pause",
  "resume",
  "start"
], _i = (n) => `${n.charAt(0).toUpperCase()}${n.slice(1)}`, ne = (n = {}, e) => Object.hasOwnProperty.call(n, e) || e in n || !!n[e], $i = (n) => typeof window < "u" && n in window, qi = (n) => {
  const e = _i(n), t = Di.map((s) => `${s}${e}`), i = [n, e].concat(t).find($i);
  return i && typeof window < "u" ? window[i] : void 0;
}, Gi = () => {
  const n = {};
  [
    "speechSynthesis",
    "speechSynthesisUtterance",
    "speechSynthesisVoice",
    "speechSynthesisEvent",
    "speechSynthesisErrorEvent"
  ].forEach((t) => {
    n[t] = qi(t);
  }), n.onvoiceschanged = ne(n.speechSynthesis, "onvoiceschanged"), n.speechSynthesisSpeaking = ne(n.speechSynthesis, "speaking"), n.speechSynthesisPaused = ne(n.speechSynthesis, "paused");
  const e = n.speechSynthesisUtterance ? ne(n.speechSynthesisUtterance, "prototype") : !1;
  return Fi.forEach((t) => {
    const i = `on${t}`;
    n[i] = e && n.speechSynthesisUtterance ? ne(n.speechSynthesisUtterance.prototype, i) : !1;
  }), n;
};
class Ae {
  listeners = /* @__PURE__ */ new Map();
  on(e, t) {
    return this.listeners.has(e) || this.listeners.set(e, []), this.listeners.get(e).push(t), () => {
      const i = this.listeners.get(e);
      if (i) {
        const s = i.indexOf(t);
        s > -1 && i.splice(s, 1);
      }
    };
  }
  emit(e, t) {
    const i = this.listeners.get(e);
    i && [...i].forEach((s) => {
      try {
        s(t);
      } catch (a) {
        console.error(`Error in "${String(e)}" listener:`, a);
      }
    });
  }
  clear() {
    this.listeners.clear();
  }
}
const ye = (n, e) => Math.min(Math.max(n, 0), Math.max(e - 1, 0));
function q(n, e, t, i) {
  return Number.isFinite(n) ? Math.max(e, Math.min(t, n)) : i;
}
const He = "\\p{Ps}\\p{Pi}¿¡", Hi = new RegExp(`^[${He}]`, "u"), Ki = new RegExp("^\\p{P}$", "u");
function Wi(n) {
  return Hi.test(n);
}
function Qi(n) {
  return Ki.test(n);
}
function mn(n) {
  return n.replace(/[<>]/g, "​");
}
function Ji(n) {
  return n.replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&nbsp;/g, " ").replace(/&#(\d+);/g, (e, t) => String.fromCodePoint(Number(t))).replace(/&#x([0-9a-fA-F]+);/g, (e, t) => String.fromCodePoint(parseInt(t, 16)));
}
const Zi = /\s*<readium:[a-zA-Z][\w-]*\s+id="[^"]*"\s*\/>\s*/g;
function Xi(n) {
  return n.replace(Zi, (t, i, s) => {
    const a = s.slice(i + t.length);
    return a.length === 0 || he(a) ? "" : " ";
  }).replace(/ {2,}/g, " ").trim();
}
function Yi(n) {
  return n.includes("<");
}
function st(n) {
  if (n === void 0) return;
  const e = {};
  if (n.language !== void 0 && (e.language = n.language), n.ssml) {
    const t = Xi(n.ssml);
    Yi(t) && (e.ssml = t);
  }
  return n.plain && (e.plain = n.plain), e.plain || e.ssml ? e : void 0;
}
function N(n) {
  return vn(n).plain;
}
function vn(n) {
  let e = "";
  const t = [];
  let i = !1, s = 0;
  for (; s < n.length; ) {
    const o = n[s];
    if (o === "<") {
      const c = n.indexOf(">", s), u = c === -1 ? "" : n.slice(c + 1);
      s = c === -1 ? n.length : c + 1, !i && e.length > 0 && u.length > 0 && !he(u) && (e += " ", t.push(s), i = !0);
      continue;
    }
    const l = n.startsWith("&lt;", s) ? "<" : n.startsWith("&gt;", s) ? ">" : n.startsWith("&amp;", s) ? "&" : void 0;
    if (l) {
      e += l, t.push(s), s += l === "&" ? 5 : 4, i = !1;
      continue;
    }
    if (o === " ") {
      i || (e += o, t.push(s), i = !0), s++;
      continue;
    }
    e += o, t.push(s), i = !1, s++;
  }
  let a = 0;
  for (; a < e.length && /\s/.test(e[a]); ) a++;
  let r = e.length;
  for (; r > a && /\s/.test(e[r - 1]); ) r--;
  return { plain: e.slice(a, r), map: t.slice(a, r) };
}
function Vt(n, e) {
  let t = 0, i = n.length;
  for (; t < i; ) {
    const s = t + i >> 1;
    n[s] < e ? t = s + 1 : i = s;
  }
  return t;
}
const xt = /* @__PURE__ */ new WeakMap();
function es(n) {
  return n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function ts(n) {
  const e = es(n), t = /\w/.test(n[0]) ? "(?<!\\w)" : "", i = /\w/.test(n[n.length - 1]) ? "(?!\\w)" : "";
  return `${t}${e}${i}`;
}
function ns(n, e) {
  if (typeof e == "string")
    return { regex: new RegExp(ts(n), "g"), replace: e };
  const t = e.pattern.flags.includes("g") ? e.pattern.flags : `${e.pattern.flags}g`;
  return { regex: new RegExp(e.pattern.source, t), replace: e.replace };
}
function is(n) {
  let e = xt.get(n);
  return e || (e = Object.entries(n).map(([t, i]) => ns(t, i)), xt.set(n, e)), e;
}
function yn(n, e) {
  const t = [];
  for (const a of is(e))
    for (const r of n.matchAll(a.regex)) {
      const o = r.index, l = typeof a.replace == "string" ? a.replace : a.replace(...r);
      t.push({ start: o, end: o + r[0].length, replacement: l });
    }
  t.sort((a, r) => a.start - r.start);
  const i = [];
  let s = 0;
  for (const a of t)
    a.start < s || (i.push(a), s = a.end);
  return i;
}
function ss(n, e) {
  let t = "";
  const i = [];
  let s = 0;
  for (const a of yn(n, e)) {
    for (; s < a.start; )
      t += n[s], i.push(s), s++;
    for (let r = 0; r < a.replacement.length; r++)
      t += a.replacement[r], i.push(a.start);
    s = a.end;
  }
  for (; s < n.length; )
    t += n[s], i.push(s), s++;
  return { text: t, map: i };
}
function Ut(n, e) {
  return n.length ? e <= 0 ? n[0] : e >= n.length ? n[n.length - 1] + 1 : n[e] : e;
}
const as = /<([a-zA-Z][\w-]*)([^>]*)>([\s\S]*?)<\/\1>|<[a-zA-Z][\w-]*\b[^>]*\/>|[^<]+/g;
function Tt(n) {
  return n.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
}
function Sn(n) {
  const e = [];
  for (const t of n.matchAll(as))
    t[1] !== void 0 ? e.push({ kind: "paired", raw: t[0], tag: t[1], attrs: t[2], innerText: Tt(t[3]) }) : t[0][0] === "<" ? e.push({ kind: "selfClosing", raw: t[0] }) : e.push({ kind: "text", raw: t[0], text: Tt(t[0]) });
  return e;
}
function rs(n, e) {
  const t = Sn(n);
  let i = "", s = !1;
  const a = [], r = t.map(() => []);
  t.forEach((b, P) => {
    if (b.kind === "selfClosing") return;
    const A = b.kind === "paired" ? b.innerText : b.text;
    if (!s && i.length > 0 && A.length > 0 && !he(A) && !/^\s/.test(A)) {
      const I = i.length;
      i += " ", r[P].push(a.length), a.push({ start: I, end: I + 1, atomIndex: -1 }), s = !0;
    }
    const E = i.length;
    i += A, r[P].push(a.length), a.push({ start: E, end: i.length, atomIndex: P }), A.length > 0 && (s = /\s$/.test(A));
  });
  const o = yn(i, e);
  let l = "", c = "";
  const u = [];
  let g = -2, d = "", h = 0;
  const f = () => {
    if (g >= 0) {
      const b = t[g];
      l += b.kind === "paired" ? `<${b.tag}${b.attrs}>${d}</${b.tag}>` : d;
    }
    d = "", g = -2;
  };
  for (let b = 0; b < t.length; b++) {
    const P = t[b];
    if (P.kind === "selfClosing") {
      f(), l += P.raw;
      continue;
    }
    for (const A of r[b]) {
      const E = a[A];
      let I = E.start;
      for (; I < E.end; ) {
        const R = h < o.length ? o[h] : void 0;
        if (R && R.start <= I && R.end > I) {
          const B = R.start === I, ee = R.end > E.end;
          if (B) {
            c += R.replacement;
            for (let j = 0; j < R.replacement.length; j++) u.push(R.start);
            E.atomIndex === -1 || ee ? (f(), l += T(R.replacement)) : (g !== E.atomIndex && (f(), g = E.atomIndex), d += T(R.replacement));
          }
          I = Math.min(R.end, E.end), R.end <= E.end && h++;
          continue;
        }
        const X = R ? Math.min(R.start, E.end) : E.end, Y = i.slice(I, X);
        c += Y;
        for (let B = 0; B < Y.length; B++) u.push(I + B);
        E.atomIndex === -1 ? (f(), l += T(Y)) : (g !== E.atomIndex && (f(), g = E.atomIndex), d += T(Y)), I = X;
      }
    }
  }
  f();
  let p = 0;
  for (; p < i.length && /\s/.test(i[p]); ) p++;
  let m = i.length;
  for (; m > p && /\s/.test(i[m - 1]); ) m--;
  let S = 0;
  for (; S < c.length && /\s/.test(c[S]); ) S++;
  let v = c.length;
  for (; v > S && /\s/.test(c[v - 1]); ) v--;
  const w = i.slice(p, m), y = u.slice(S, v).map((b) => Math.min(Math.max(b - p, 0), Math.max(w.length - 1, 0)));
  return { ssml: l, plain: w, map: y };
}
const bn = /<lang xml:lang="([^"]*)">([\s\S]*?)<\/lang>/g;
function wn(n) {
  return new RegExp(bn).test(n);
}
function zt(n) {
  return n.replace(/<[^>]+>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/ {2,}/g, " ");
}
const os = new RegExp(
  `\\s+|[${He}]+|[${se}]+|[^\\s${He}${se}]+`,
  "gu"
);
function Ue(n) {
  const e = [];
  for (const [t] of n.matchAll(os))
    /^\s/.test(t) ? e.push({ kind: "space" }) : Wi(t) ? e.push({ kind: "open", text: t }) : he(t) ? e.push({ kind: "close", text: t }) : e.push({ kind: "word", text: t });
  return e;
}
function ls(n) {
  let e = "", t = !1;
  for (const i of n) {
    if (i.kind === "space") {
      e && (t = !0);
      continue;
    }
    t && (e += " "), e += i.text, t = !1;
  }
  return e;
}
function cs(n) {
  let e = n.length;
  for (; e > 0 && (n[e - 1].kind === "space" || n[e - 1].kind === "open"); ) e--;
  return n.slice(e).some((t) => t.kind === "open") ? n.splice(e) : [];
}
function us(n) {
  let e = 0;
  for (; e < n.length && (n[e].kind === "space" || n[e].kind === "close"); ) e++;
  return n.slice(0, e).some((t) => t.kind === "close") ? n.splice(0, e) : [];
}
function at(n, e) {
  const t = [];
  let i = 0;
  for (const r of n.matchAll(bn))
    t.push({
      tokens: Ue(zt(n.slice(i, r.index))),
      language: e,
      tagged: !1
    }), t.push({ tokens: Ue(N(r[2])), language: r[1], tagged: !0 }), i = r.index + r[0].length;
  t.push({
    tokens: Ue(zt(n.slice(i))),
    language: e,
    tagged: !1
  });
  for (let r = 0; r < t.length - 1; r++)
    !t[r].tagged && t[r + 1].tagged ? t[r + 1].tokens.unshift(...cs(t[r].tokens)) : t[r].tagged && !t[r + 1].tagged && t[r].tokens.push(...us(t[r + 1].tokens));
  const s = [];
  let a = 0;
  for (const r of t) {
    const o = ls(r.tokens);
    o && (s.push({ plain: o, language: r.language, start: a, end: a + o.length }), a += o.length);
  }
  return s;
}
const kn = /<readium:[a-zA-Z][\w-]*\s+id="([^"]*)"\s*\/>/g;
function hs(n) {
  return new RegExp(kn).test(n);
}
function ds(n) {
  const e = [];
  let t = 0;
  for (const s of n.matchAll(kn)) {
    const a = n.slice(t, s.index).trim();
    a && e.push({ ssml: a }), e.push({ placeholderId: s[1] }), t = s.index + s[0].length;
  }
  const i = n.slice(t).trim();
  return i && e.push({ ssml: i }), e;
}
class Nt {
  speechSynthesis;
  speechSynthesisUtterance;
  currentVoice = null;
  // The voice of the utterance being spoken, reported in its "start" event.
  speakingVoice = null;
  currentUtterances = [];
  currentUtteranceIndex = 0;
  playbackState = "idle";
  events = new Ae();
  voiceManager = null;
  defaultVoice = null;
  // Keyed by `${language}:${needsBoundary}` — the boundary requirement rides in the key
  // so a voice switch that flips it warms/reads a distinct slot instead of a stale one.
  languageVoiceCache = /* @__PURE__ */ new Map();
  // Languages of utterances' own voices loaded into the manager, even if it still lacks the voice
  loadedOwnVoiceLanguages = /* @__PURE__ */ new Set();
  warmingLanguages = /* @__PURE__ */ new Map();
  speakGeneration = 0;
  // Enhanced properties for cross-browser compatibility
  resumeInfinityTimer;
  isSpeakingInternal = !1;
  restartPending = !1;
  isPausedInternal = !1;
  isAndroidPaused = !1;
  // Explicitly tracks Android's paused state
  pausedAtUtteranceIndex = null;
  // Tracks which utterance was playing when paused
  initialized = !1;
  maxLengthExceeded = "warn";
  utterancesBeingCancelled = !1;
  // Flag to track if utterances are being cancelled
  hasCancelledInTask = !1;
  // Safari: cancel() stopped speech in the current task
  lacksNativePauseEvents = !1;
  // Google and Chrome OS voices never fire onpause/onresume
  // Playback parameters
  rate = 1;
  pitch = 1;
  volume = 1;
  features;
  patches;
  constructor() {
    if (this.features = Gi(), this.patches = fn(), !this.features.speechSynthesis || !this.features.speechSynthesisUtterance)
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
    const { languages: t, maxTimeout: i, interval: s, maxLengthExceeded: a = "warn" } = e;
    if (this.initialized)
      return !1;
    this.maxLengthExceeded = a;
    try {
      this.voiceManager = await C.initialize({
        languages: t,
        maxTimeout: i,
        interval: s
      });
      const r = t || [...navigator.languages || ["en"]];
      return this.defaultVoice = await this.voiceManager.getDefaultVoice(r, this.voices), this.initialized = !0, !0;
    } catch (r) {
      return console.error("Failed to initialize WebSpeechEngine:", r), this.initialized = !1, !1;
    }
  }
  // Text length validation matching EasySpeech
  validateText(e) {
    if (new TextEncoder().encode(e).length > 4096) {
      const i = "Text exceeds max length of 4096 bytes, which may not work with some voices.";
      switch (this.maxLengthExceeded) {
        case "none":
          break;
        case "error":
          throw new Error(`WebSpeechEngine: ${i}`);
        default:
          console.warn(`WebSpeechEngine: ${i}`);
      }
    }
  }
  getCurrentVoiceForUtterance(e) {
    return e && typeof e == "object" ? e : typeof e == "string" ? this.voices.find((t) => t.name === e || t.language === e) || null : this.currentVoice || this.defaultVoice;
  }
  languageCacheKey(e, t) {
    return `${e}:${t}`;
  }
  // By `voiceURI`, as voices of one `name` can differ in quality or language.
  ownVoice(e) {
    if (!e.voice) return;
    const t = this.voices;
    return t.find((i) => i.voiceURI === e.voice) ?? t.find((i) => i.name === e.voice);
  }
  // The language of the utterance's voice when the browser has it but the manager hasn't loaded that language.
  unloadedOwnVoiceLanguage(e) {
    if (!e.voice || this.ownVoice(e)) return;
    const t = this.speechSynthesis.getVoices(), i = (t.find((s) => s.voiceURI === e.voice) ?? t.find((s) => s.name === e.voice))?.lang;
    return i && !this.loadedOwnVoiceLanguages.has(i) ? i : void 0;
  }
  // Returns `undefined` (not a fallback voice) when content.language hasn't
  // been warmed into languageVoiceCache yet, or its own voice's language loaded — callers must await for it.
  voiceForUtteranceSync(e) {
    const t = this.ownVoice(e);
    if (t)
      return t;
    if (this.unloadedOwnVoiceLanguage(e))
      return;
    const i = this.getCurrentVoiceForUtterance(this.currentVoice);
    if (!e.language)
      return i;
    const s = V(e.language);
    if (Ge(i, s))
      return i;
    const a = i?.controls?.boundary !== !1, r = this.languageCacheKey(s, a);
    if (this.languageVoiceCache.has(r))
      return this.languageVoiceCache.get(r) ?? i;
  }
  // Awaits warming for a not-yet-seen content language rather than falling back
  // to the wrong-language voice.
  async voiceForUtterance(e) {
    const t = this.voiceForUtteranceSync(e);
    if (t !== void 0)
      return t;
    const i = this.unloadedOwnVoiceLanguage(e);
    if (i) {
      await C.initialize({ languages: [i] }), this.loadedOwnVoiceLanguages.add(i);
      const s = this.voiceForUtteranceSync(e);
      if (s !== void 0) return s;
    }
    return await this.warmLanguageVoiceCache([e]), this.voiceForUtteranceSync(e) ?? this.getCurrentVoiceForUtterance(this.currentVoice);
  }
  // Dedupes in-flight warms per (language, boundary requirement) so an awaited call and a
  // fire-and-forget one for the same slot don't redo the work.
  async warmLanguageVoiceCache(e) {
    if (!this.voiceManager)
      return;
    const t = this.getCurrentVoiceForUtterance(this.currentVoice), i = t?.controls?.boundary !== !1, s = new Set(
      e.filter((l) => !this.ownVoice(l)).map((l) => l.language).filter((l) => !!l).map((l) => V(l)).filter((l) => !Ge(t, l)).filter((l) => !this.languageVoiceCache.has(this.languageCacheKey(l, i)))
    ), a = [...s].filter((l) => this.warmingLanguages.has(this.languageCacheKey(l, i))), o = [...s].filter((l) => !this.warmingLanguages.has(this.languageCacheKey(l, i))).map((l) => {
      const c = this.languageCacheKey(l, i), u = (async () => {
        await C.initialize({ languages: [l] });
        const g = this.voices.filter((p) => pn(p, l)), d = it(g, i), f = (await this.voiceManager.sortVoicesByQuality(d))[0] ?? null;
        this.languageVoiceCache.set(c, f), f || this.emitEvent({ type: "languagefallback", detail: { language: l, reason: "no-matching-voice" } });
      })();
      return this.warmingLanguages.set(c, u.finally(() => this.warmingLanguages.delete(c))), this.warmingLanguages.get(c);
    });
    await Promise.all([
      ...o,
      ...a.map((l) => this.warmingLanguages.get(this.languageCacheKey(l, i)))
    ]);
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
      plain: t.plain ?? (t.ssml ? N(Ji(t.ssml)) : "")
    }));
  }
  // Queue Management
  loadUtterances(e, t) {
    this.currentUtterances = this.toPlainText(e), this.currentUtteranceIndex = ye(t ?? 0, e.length), this.warmLanguageVoiceCache(this.currentUtterances), this.playbackState = "ready", this.emitEvent({ type: "ready" });
  }
  // Voice Configuration
  async setVoice(e) {
    const t = this.currentVoice;
    if (typeof e == "string") {
      const i = this.voices.find((s) => s.name === e || s.language === e);
      i ? this.currentVoice = i : console.warn(`Voice "${e}" not found`);
    } else
      this.currentVoice = e;
    this.currentVoice?.name !== t?.name && this.scheduleRestartIfSpeaking(), this.voiceManager && this.defaultVoice && this.currentVoice && this.currentVoice.language !== this.defaultVoice.language && (this.defaultVoice = await this.voiceManager.getDefaultVoice([this.currentVoice.language], this.voices));
  }
  // Read from the manager each time, as initializing it with other languages adds theirs
  get voices() {
    return this.voiceManager?.getVoices() ?? [];
  }
  async getAvailableVoices() {
    if (this.voiceManager)
      return this.voices;
    try {
      return await this.initialize(), this.voices;
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
    if (this.isSpeakingInternal = !0, this.isPausedInternal = !1, this.setState("playing"), this.stopResumeInfinity(), this.currentUtteranceIndex >= this.currentUtterances.length && (this.currentUtteranceIndex = 0), this.patches.isSafari && this.hasCancelledInTask) {
      this.speakNextTask(t, 1);
      return;
    }
    this.speakCurrentUtterance(t);
  }
  cancelCurrentSpeech() {
    this.patches.isFirefox && this.speechSynthesis.speaking && (this.utterancesBeingCancelled = !0, setTimeout(() => {
      this.utterancesBeingCancelled = !1;
    }, 100)), this.patches.isSafari && this.speechSynthesis.speaking && (this.hasCancelledInTask = !0, setTimeout(() => {
      this.hasCancelledInTask = !1;
    }, 0)), this.speechSynthesis.cancel();
  }
  // Safari: `unstartedRetries` is how many more times to speak it if Safari ends it without starting it, as it can right after cancel()
  speakNextTask(e, t) {
    setTimeout(() => {
      e === this.speakGeneration && this.speakCurrentUtterance(e, t);
    }, 0);
  }
  async speakCurrentUtterance(e, t) {
    if (this.currentUtteranceIndex >= this.currentUtterances.length) {
      this.setState("idle"), this.emitEvent({ type: "end" });
      return;
    }
    const i = this.currentUtterances[this.currentUtteranceIndex], s = i.plain ?? "";
    this.validateText(s);
    const a = this.createUtterance(mn(s)), r = await this.voiceForUtterance(i);
    if (e !== this.speakGeneration)
      return;
    if (this.lacksNativePauseEvents = !1, this.speakingVoice = r, r && this.voiceManager) {
      const l = this.voiceManager.convertToSpeechSynthesisVoice(r);
      l && (a.voice = l, a.lang = l.lang, this.lacksNativePauseEvents = l.name.startsWith("Google") || l.name.startsWith("Chrome OS"));
    }
    i.language && (a.lang = i.language), a.rate = this.rate, a.pitch = this.pitch, a.volume = this.volume;
    let o = !1;
    a.onstart = () => {
      if (o = !0, e !== this.speakGeneration) return;
      this.isSpeakingInternal = !0, this.isPausedInternal = !1, this.setState("playing"), this.emitEvent({ type: "start", detail: { voice: r } }), this.patches.isAndroid && this.isAndroidPaused && (this.isAndroidPaused = !1), this.shouldUseResumeInfinity() && this.startResumeInfinity(a);
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
      if (e !== this.speakGeneration || l.error === "interrupted" && this.patches.isAndroid && this.isAndroidPaused)
        return;
      this.isSpeakingInternal = !1, this.isPausedInternal = !1, this.stopResumeInfinity(), this.setState("idle"), ["synthesis-unavailable", "audio-hardware", "voice-unavailable"].includes(l.error) && (console.log("[ENGINE] fatal error detected, resetting index to 0"), this.currentUtteranceIndex = 0), l.error === "interrupted" || l.error === "canceled" ? this.emitEvent({ type: "stop" }) : this.emitEvent({
        type: "error",
        detail: {
          error: l.error,
          // Preserve original error type
          message: `Speech synthesis error: ${l.error}`
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
        const { paused: i, speaking: s } = this.speechSynthesis, a = s || this.isSpeakingInternal, r = i || this.isPausedInternal;
        a && !r && (this.speechSynthesis.pause(), this.speechSynthesis.resume());
      }
      this.startResumeInfinity(e);
    }, 5e3));
  }
  stopResumeInfinity() {
    this.resumeInfinityTimer && (clearTimeout(this.resumeInfinityTimer), this.resumeInfinityTimer = void 0);
  }
  pause() {
    this.playbackState === "playing" && (this.pausedAtUtteranceIndex = this.currentUtteranceIndex, this.isPausedInternal = !0, this.isSpeakingInternal = !1, this.setState("paused"), this.patches.isAndroid ? (this.isAndroidPaused = !0, this.speechSynthesis.cancel(), this.emitEvent({ type: "pause" })) : (this.speechSynthesis.pause(), this.lacksNativePauseEvents && this.emitEvent({ type: "pause" })));
  }
  resume() {
    this.playbackState === "paused" && this.currentUtteranceIndex < this.currentUtterances.length && (this.isPausedInternal = !1, this.isSpeakingInternal = !0, this.setState("playing"), this.patches.isAndroid || this.pausedAtUtteranceIndex !== this.currentUtteranceIndex ? (this.emitEvent({ type: "resume" }), this.speak(this.currentUtteranceIndex)) : (this.speechSynthesis.resume(), this.lacksNativePauseEvents && this.emitEvent({ type: "resume" })), this.pausedAtUtteranceIndex = null);
  }
  stop() {
    this.cancelCurrentSpeech(), this.speakGeneration++, this.currentUtteranceIndex = 0, this.patches.isAndroid && (this.isAndroidPaused = !1), this.setState("idle"), this.emitEvent({ type: "stop" });
  }
  // Playback Parameters
  setRate(e) {
    const t = q(e, 0.1, 10, this.rate);
    t !== this.rate && (this.rate = t, this.scheduleRestartIfSpeaking());
  }
  getRate() {
    return this.rate;
  }
  setPitch(e) {
    const t = q(e, 0, 2, this.pitch);
    t !== this.pitch && (this.pitch = t, this.scheduleRestartIfSpeaking());
  }
  getPitch() {
    return this.pitch;
  }
  setVolume(e) {
    const t = q(e, 0, 1, this.volume);
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
    this.stop(), this.stopResumeInfinity(), this.events.clear(), this.currentUtterances = [], this.currentVoice = null, this.speakingVoice = null, this.voiceManager = null, this.defaultVoice = null, this.languageVoiceCache.clear(), this.warmingLanguages.clear(), this.initialized = !1;
  }
}
class er {
  id = "webspeech";
  name = "Web Speech API";
  voiceEngine = null;
  // No cache to bypass here — local API, no network cost to re-checking.
  async getVoices() {
    return this.voiceEngine || (this.voiceEngine = new Nt(), await this.voiceEngine.initialize()), this.voiceEngine.getAvailableVoices();
  }
  async createEngine(e) {
    const t = new Nt();
    return await t.initialize(), e && await t.setVoice(e), t;
  }
  async destroy() {
    this.voiceEngine && (await this.voiceEngine.destroy(), this.voiceEngine = null);
  }
}
function Cn(n, e) {
  const t = [];
  let i = -1, s = -1;
  const a = () => {
    i !== -1 && (t.push({ text: gs(n, i, s), offset: n[i].offset }), i = -1, s = -1);
  };
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    if (o.text.length > e) {
      a(), t.push({ text: o.text, offset: o.offset });
      continue;
    }
    const l = o.offset + o.text.length, c = i === -1 ? o.text.length : l - n[i].offset;
    i !== -1 && c > e && a(), i === -1 && (i = r), s = r;
  }
  return a(), t;
}
function gs(n, e, t) {
  const i = n[e], s = n[t];
  return i === s ? i.text : n.slice(e, t + 1).map((a) => a.text).join("");
}
const En = new RegExp(
  `[^${se}]*[${se}]+\\s*|[^${se}]+$`,
  "gu"
), fs = /\S+\s*|\s+/g;
function rt(n, e, t) {
  const i = [];
  for (const s of n.matchAll(t))
    s[0].length !== 0 && i.push({ text: s[0], offset: e + s.index, atomic: !1 });
  return i;
}
function ot(n, e) {
  if (n.text.length <= e || n.atomic)
    return [n];
  const t = rt(n.text, n.offset, fs);
  if (t.length > 1)
    return t.flatMap((r) => ot(r, e));
  const i = [];
  let s = n.offset, a = "";
  for (const r of n.text)
    a.length > 0 && a.length + r.length > e && (i.push({ text: a, offset: s, atomic: !1 }), s += a.length, a = ""), a += r;
  return a.length > 0 && i.push({ text: a, offset: s, atomic: !1 }), i;
}
function ps(n, e) {
  if (n.length <= e)
    return [{ text: n, offset: 0 }];
  const i = rt(n, 0, En).flatMap((s) => ot(s, e));
  return Cn(i, e);
}
const ms = /<([a-zA-Z][\w-]*)\b[^>]*>[\s\S]*?<\/\1>|<[a-zA-Z][\w-]*\b[^>]*\/>|[^<]+/g;
function vs(n, e) {
  if (n.length <= e)
    return [{ text: n, offset: 0 }];
  const t = [];
  for (const s of n.matchAll(ms))
    s[0][0] === "<" ? t.push({ text: s[0], offset: s.index, atomic: !0 }) : t.push(...rt(s[0], s.index, En));
  const i = t.flatMap((s) => ot(s, e));
  return Cn(i, e);
}
const ys = {
  wav: "audio/wav",
  mp3: "audio/mpeg",
  opus: "audio/ogg",
  ogg: "audio/ogg",
  aac: "audio/aac",
  flac: "audio/flac",
  webm: "audio/webm",
  m4a: "audio/mp4"
};
function Ss(n) {
  return ys[n] ?? `audio/${n}`;
}
const bs = ["flac", "wav", "opus", "aac", "ogg", "webm", "mp3"], ws = ["opus", "aac", "webm", "ogg", "mp3", "wav", "flac"];
function ks(n, e, t) {
  const i = (o) => t(Ss(o)) !== "", s = n.formats.filter(i);
  if (e.preferredFormat && s.includes(e.preferredFormat))
    return e.preferredFormat;
  const a = e.strategy === "bandwidth" ? ws : bs, r = [...a, ...s.filter((o) => !a.includes(o))];
  for (const o of r)
    if (s.includes(o))
      return o;
  return n.default;
}
const Cs = /* @__PURE__ */ new Set(["wav", "flac"]), Es = {
  mp3: 48e3,
  opus: 24e3,
  aac: 48e3,
  ogg: 48e3,
  webm: 32e3
};
function Rs(n, e, t) {
  return Cs.has(n) || !e || !t ? void 0 : t.saveData === !0 || /2g/.test(t.effectiveType ?? "") ? Es[n] : void 0;
}
function Rn(n, e) {
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
class oe extends Error {
  status;
  type;
  title;
  instance;
  constructor(e, t) {
    super(e), this.name = "SpeechServerError", this.status = t.status, this.type = t.type, this.title = t.title, this.instance = t.instance;
  }
}
class In extends oe {
  constructor(e) {
    super(e, { status: 408, type: "https://readium.org/speech-server/error#stall", title: "Synthesis Stalled" }), this.name = "SpeechServerStallError";
  }
}
class Pn extends Error {
  constructor(e) {
    super(e), this.name = "SpeechServerAudioDecodeError";
  }
}
class An extends Error {
  constructor(e) {
    super(e), this.name = "SpeechServerNetworkError";
  }
}
async function ae(n) {
  if ((n.headers.get("content-type") ?? "").includes("application/problem+json"))
    try {
      const t = await n.json();
      return new oe(t.detail || t.title || `Request failed with status ${n.status}`, {
        status: t.status ?? n.status,
        type: t.type,
        title: t.title,
        instance: t.instance
      });
    } catch {
    }
  return new oe(`Request failed with status ${n.status}`, { status: n.status });
}
const Is = 3, Ps = 400;
function As(n) {
  const e = atob(n), t = new Uint8Array(e.length);
  for (let i = 0; i < e.length; i++)
    t[i] = e.charCodeAt(i);
  return t.buffer;
}
function Ls(n) {
  return q(n, 0.25, 4, 1);
}
function pe(n) {
  return n?.plain ?? n?.ssml ?? void 0;
}
function Mt(n) {
  return n instanceof In ? { message: n.message, status: n.status, type: n.type, title: n.title, instance: n.instance, recoverable: !0 } : n instanceof oe ? { message: n.message, status: n.status, type: n.type, title: n.title, instance: n.instance, recoverable: !1 } : n instanceof Pn ? { message: n.message, recoverable: !1 } : n instanceof An ? { message: n.message, recoverable: !0 } : n instanceof Error ? { message: n.message, recoverable: !1 } : { message: String(n), recoverable: !1 };
}
class Os {
  endpoints;
  fetchImpl;
  currentVoice = null;
  defaultVoice = null;
  voices = [];
  voicesRequest = null;
  initializing = null;
  // Keyed by `${language}:${needsBoundary}`, like WebSpeechEngine's, and holding the pick so concurrent prefetches share it
  languageVoiceCache = /* @__PURE__ */ new Map();
  serviceInfo = null;
  serviceInfoPromise = null;
  currentUtterances = [];
  currentUtteranceIndex = 0;
  playbackState = "idle";
  events = new Ae();
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
    this.endpoints = e.endpoints, this.fetchImpl = e.fetch ?? fetch.bind(globalThis), this.prefetchWindow = e.prefetchWindow ?? Is, this.readyBufferChars = e.readyBufferChars ?? Ps, this.overLengthText = e.overLengthText ?? "split", this.timeoutMs = e.timeoutMs, this.formatOptions = e.format ?? {}, this.canPlayType = typeof Audio < "u" ? (t) => new Audio().canPlayType(t) : () => "";
  }
  // Lets a provider that already fetched /voices seed this engine without a second request.
  setAvailableVoices(e) {
    this.voices = e, this.voicesRequest = null, this.languageVoiceCache.clear();
  }
  // Fetches the voices, and picks the default one by the browser's languages, as WebSpeechEngine does
  async initialize() {
    this.initializing = (async () => {
      const e = await this.getAvailableVoices(), t = typeof navigator < "u" && navigator.languages?.length ? [...navigator.languages] : ["en"];
      return this.defaultVoice = (await dn(t, e))[0] ?? null, !0;
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
    } catch (i) {
      throw i instanceof TypeError ? new An(i.message) : i;
    }
  }
  loadUtterances(e, t) {
    this.abortLiveControllers(), this.clearPrefetchCache(), this.currentUtterances = e, this.currentUtteranceIndex = ye(t ?? 0, e.length), this.setState("loading"), this.bufferUntilReady(++this.loadGeneration);
  }
  // Buffers enough utterances ahead of currentUtteranceIndex to cover readyBufferChars before
  // declaring "ready", so playback doesn't catch up to an empty prefetch cache right away —
  // starting from wherever playback will actually resume, not always utterance 0.
  async bufferUntilReady(e) {
    const t = ye(this.currentUtteranceIndex, this.currentUtterances.length), i = Math.min(this.indexCoveringChars(this.readyBufferChars, t), t + this.prefetchWindow), s = [];
    for (let a = t; a <= i; a++) {
      this.queuePrefetch(a);
      const r = this.prefetchCache.get(a);
      r && s.push(r.then((o) => o[0].promise));
    }
    try {
      await Promise.all(s);
    } catch {
    }
    e !== this.loadGeneration || this.playbackState !== "loading" || this.setState("ready");
  }
  indexCoveringChars(e, t) {
    if (this.currentUtterances.length === 0)
      return -1;
    const i = ye(t, this.currentUtterances.length);
    let s = 0;
    for (let a = i; a < this.currentUtterances.length; a++)
      if (s += (pe(this.currentUtterances[a]) ?? "").length, s >= e)
        return a;
    return this.currentUtterances.length - 1;
  }
  // The utterance's own voice when this server has it, else one speaking its language, as on WebSpeechEngine.
  async voiceFor(e) {
    this.voices.length === 0 && await (this.initializing ?? this.getAvailableVoices()).catch(() => {
    });
    const t = e?.voice ? this.voices.find((l) => l.identifier === e.voice || l.name === e.voice) : void 0;
    if (t)
      return t;
    const i = this.currentVoice ?? this.defaultVoice;
    if (!e?.language || this.voices.length === 0 || Ge(i, e.language))
      return i;
    const s = V(e.language), a = i?.controls?.boundary !== !1, r = `${s}:${a}`;
    let o = this.languageVoiceCache.get(r);
    return o || (o = this.pickLanguageVoice(s, a), this.languageVoiceCache.set(r, o)), await o ?? i;
  }
  async pickLanguageVoice(e, t) {
    const i = this.voices.filter((a) => pn(a, e)), s = i.length > 0 ? await gn(e, it(i, t)) : null;
    return s || this.emitEvent({ type: "languagefallback", detail: { language: e, reason: "no-matching-voice" } }), s;
  }
  setVoice(e) {
    const t = this.currentVoice?.identifier ?? this.currentVoice?.name;
    if (typeof e == "string") {
      const i = this.voices.find((s) => s.identifier === e || s.name === e);
      i ? this.currentVoice = i : (this.currentVoice = {
        source: "server",
        label: e,
        name: e,
        originalName: e,
        language: "",
        identifier: e
      }, this.getAvailableVoices().then((s) => {
        if (this.currentVoice?.identifier !== e)
          return;
        const a = s.find((r) => r.identifier === e || r.name === e);
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
      throw await ae(e);
    const i = await e.json(), s = new Map(t.providers.map((a) => [a.id, a.controls]));
    return this.voices = i.map((a) => Rn(a, s.get(a.provider))), this.voices;
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
      throw await ae(e);
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
      const i = await this.resolveSynthesisStream(t);
      if (e !== this.speakGeneration)
        return;
      const s = await this.voiceFor(this.currentUtterances[t]);
      if (e !== this.speakGeneration)
        return;
      await this.scheduleChunksStreaming(i, e, s), this.fillPrefetchWindow(t);
    } catch (i) {
      if (e !== this.speakGeneration)
        return;
      this.isSpeakingInternal = !1, this.setState("idle"), this.emitEvent({
        type: "error",
        detail: Mt(i)
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
        const i = await t;
        for (const { controller: s } of i)
          this.activeControllers.delete(s), this.liveControllers.add(s);
        return i;
      } catch {
      }
    }
    return this.synthesizeStream(e, !1);
  }
  // Chains up to `prefetchWindow` upcoming indices onto prefetchChainTail, one at a time.
  fillPrefetchWindow(e) {
    const t = Math.min(e + this.prefetchWindow, this.currentUtterances.length - 1);
    for (let i = e + 1; i <= t; i++)
      this.queuePrefetch(i);
  }
  queuePrefetch(e) {
    if (this.prefetchCache.has(e))
      return;
    const t = this.prefetchChainTail.then(() => this.synthesizeStream(e, !0));
    this.prefetchCache.set(e, t), this.prefetchChainTail = t.then((i) => Promise.all(i.map((s) => s.promise))).then(
      () => {
      },
      () => {
      }
    ), t.catch(() => {
    }), t.then((i) => i.forEach((s) => s.promise.catch(() => {
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
    const i = this.currentUtterances[e], s = !i.plain && !!i.ssml, a = i.language, r = pe(i) ?? "", o = s ? vn(r).map : void 0, l = pe(this.currentUtterances[e - 1]), c = pe(this.currentUtterances[e + 1]), u = await this.getServiceInfo(), g = ks(u.output, this.formatOptions, this.canPlayType), d = navigator.connection, h = Rs(g, this.formatOptions.adaptBitrateToNetwork ?? !1, d);
    if (r.length <= u.limits.maxTextLength) {
      const v = new AbortController();
      return (t ? this.activeControllers : this.liveControllers).add(v), [{
        promise: this.synthesizeChunk({ content: i, text: r, textOffset: 0, useSSML: s, ssmlMap: o, language: a, prevText: l, nextText: c, format: g, bitrate: h, controller: v }),
        controller: v
      }];
    }
    if (this.overLengthText === "error")
      throw new oe(
        `Text exceeds this server's maximum length of ${u.limits.maxTextLength} characters`,
        {
          status: 413,
          type: "https://readium.org/speech-server/error#payload_too_large",
          title: "Payload Too Large"
        }
      );
    const f = Math.min(u.limits.maxTextLength, this.readyBufferChars), p = s ? vs(r, f) : ps(r, f), m = [];
    let S = Promise.resolve();
    for (let v = 0; v < p.length; v++) {
      const w = v === 0 ? l : p[v - 1].text, y = v === p.length - 1 ? c : p[v + 1].text, b = p[v], P = new AbortController();
      (t ? this.activeControllers : this.liveControllers).add(P);
      const A = S.then(
        () => this.synthesizeChunk({ content: i, text: b.text, textOffset: b.offset, useSSML: s, ssmlMap: o, language: a, prevText: w, nextText: y, format: g, bitrate: h, controller: P })
      );
      m.push({ promise: A, controller: P }), S = A;
    }
    return m;
  }
  async synthesizeChunk(e) {
    const { content: t, text: i, textOffset: s, useSSML: a, ssmlMap: r, language: o, prevText: l, nextText: c, format: u, bitrate: g, controller: d } = e;
    try {
      const h = await this.voiceFor(t), f = await this.fetchNetwork(this.endpoints.synthesize, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: t.id,
          text: a ? i : mn(i),
          ssml: a,
          language: o,
          voice: h?.identifier ?? h?.name,
          prev_utterance: l,
          next_utterance: c,
          boundary: !0,
          output: { format: u, bitrate: g, speed: this.rate, pitch: this.pitch }
        }),
        signal: d.signal
      });
      if (!f.ok)
        throw await ae(f);
      const p = await f.json(), m = As(p.audio);
      let S;
      try {
        S = await this.ensureAudioContext().decodeAudioData(m);
      } catch {
        throw new Pn("Audio playback failed");
      }
      return { audioBuffer: S, format: p.format, boundaries: p.boundaries, textOffset: s, ssmlMap: r };
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
  awaitWithStallDeadline(e, t, i) {
    if (this.timeoutMs === void 0)
      return e;
    const s = i + this.timeoutMs;
    return new Promise((a, r) => {
      const o = setTimeout(() => {
        t.abort(), r(new In(`No audio chunk arrived within ${s.toFixed(0)}ms of the playback buffer running dry`));
      }, s);
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
  async scheduleChunksStreaming(e, t, i) {
    const s = await this.awaitWithStallDeadline(e[0].promise, e[0].controller, 0);
    if (t !== this.speakGeneration)
      return;
    const a = this.ensureAudioContext(), r = this.masterGain, l = i?.controls?.speed === !0 ? 1 : Ls(this.rate);
    this.scheduledChunks = [], this.setState("playing"), this.emitEvent({ type: "start", detail: { voice: i } });
    let c = a.currentTime, u = null;
    const g = (d) => {
      const h = a.createBufferSource();
      h.buffer = d.audioBuffer, h.playbackRate.value = l, h.connect(r), h.start(c), u && (u.onended = null), h.onended = () => this.handleUtteranceEnded(t), u = h, this.scheduledChunks.push({ chunk: d, startTime: c, node: h, nextBoundaryIndex: 0, rate: l }), c += d.audioBuffer.duration / l;
    };
    g(s), this.startBoundaryPolling(t);
    for (let d = 1; d < e.length; d++) {
      let h;
      try {
        const f = Math.max(0, (c - a.currentTime) * 1e3);
        h = await this.awaitWithStallDeadline(e[d].promise, e[d].controller, f);
      } catch (f) {
        t === this.speakGeneration && this.emitEvent({ type: "error", detail: Mt(f) });
        return;
      }
      if (t !== this.speakGeneration)
        return;
      g(h);
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
      const i = t.chunk.boundaries ?? [];
      for (; t.nextBoundaryIndex < i.length && e >= t.startTime + i[t.nextBoundaryIndex].elapsedTime / t.rate; ) {
        const s = i[t.nextBoundaryIndex], a = s.charIndex + t.chunk.textOffset;
        let r = a, o = s.charLength;
        if (t.chunk.ssmlMap) {
          const l = t.chunk.ssmlMap;
          r = Vt(l, a), o = Math.max(0, Vt(l, a + s.charLength) - r);
        }
        this.emitEvent({
          type: "boundary",
          detail: {
            name: s.name,
            charIndex: r,
            charLength: o,
            elapsedTime: s.elapsedTime
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
    const t = q(e, 0.1, 10, this.rate);
    t !== this.rate && (this.rate = t, this.clearPrefetchCache(), this.scheduleRestartIfSpeaking());
  }
  getRate() {
    return this.rate;
  }
  setPitch(e) {
    const t = q(e, 0, 2, this.pitch);
    t !== this.pitch && (this.pitch = t, this.clearPrefetchCache(), this.scheduleRestartIfSpeaking());
  }
  getPitch() {
    return this.pitch;
  }
  setVolume(e) {
    const t = q(e, 0, 1, this.volume);
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
    this.stop(), await this.audioContext?.close(), this.audioContext = null, this.masterGain = null, this.events.clear(), this.currentUtterances = [], this.currentVoice = null, this.defaultVoice = null, this.voices = [], this.voicesRequest = null, this.languageVoiceCache.clear();
  }
}
class tr {
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
    const [t, i] = await Promise.all([
      this.fetchImpl(this.options.endpoints.voices),
      this.fetchImpl(this.options.endpoints.service)
    ]);
    if (!t.ok)
      throw await ae(t);
    if (!i.ok)
      throw await ae(i);
    const s = await t.json(), a = await i.json(), r = new Map(a.providers.map((o) => [o.id, o.controls]));
    return this.voices = s.map((o) => Rn(o, r.get(o.provider))), this.voices;
  }
  async createEngine(e) {
    const t = new Os(this.options);
    return this.voices.length > 0 && t.setAvailableVoices(this.voices), e && t.setVoice(e), t;
  }
  async destroy() {
    this.voices = [];
  }
}
function Vs(n) {
  return n.detail?.recoverable === !0;
}
const xs = 3e4, Us = [
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
  "voiceschanged",
  "languagefallback"
];
class Ts {
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
  events = new Ae();
  unbindActiveEngine = null;
  constructor(e) {
    this.activeEngine = e.primaryEngine, this.primaryProvider = e.primaryProvider, this.fallbackProvider = e.fallbackProvider, this.onFailure = e.onFailure ?? "fallback", this.healthCheckIntervalMs = e.healthCheckIntervalMs ?? xs, this.lastVoiceRequest = e.primaryEngine.getCurrentVoice() ?? void 0, this.bindActiveEngine();
  }
  async initialize() {
    return this.activeEngine.initialize?.();
  }
  // Mid-swap, only records the new queue live — activeEngine is dying/about to be replaced.
  loadUtterances(e, t) {
    this.loadToken++, this.currentUtterances = e, this.desiredIndex = t ?? 0, this.desiredPlaying = !1, !this.swapInFlight && (this.engineStarted = !0, this.activeEngine.loadUtterances(e, t));
  }
  setVoice(e) {
    this.lastVoiceRequest = e, this.activeEngine.setVoice(e);
  }
  getCurrentVoice() {
    return this.activeEngine.getCurrentVoice();
  }
  getAvailableVoices() {
    return this.activeEngine.getAvailableVoices();
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
    const e = this.activeEngine, t = Us.map((i) => e.on(i, (s) => {
      this.emitEvent(s), this.maybeRecoverNow();
    }));
    t.push(e.on("error", (i) => this.handleError(i))), this.unbindActiveEngine = () => t.forEach((i) => i());
  }
  handleError(e) {
    if (this.hasFallenBack || this.swapInFlight || this.onFailure === "error" || !Vs(e)) {
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
    const t = this.loadToken, i = e.on("ready", () => {
      i(), t === this.loadToken && (this.desiredPlaying ? (this.engineStarted = !0, e.speak(this.desiredIndex)) : this.engineStarted = !1);
    });
  }
  // Polls the primary provider until it's reachable again, then hands off to maybeRecoverNow()
  // to swap back at the next safe moment. Chained setTimeout rather than setInterval so a slow
  // probe can't overlap with the next one.
  startHealthCheck() {
    this.healthCheckTimer === null && (this.healthCheckTimer = setTimeout(async () => {
      this.healthCheckTimer = null;
      try {
        await this.primaryProvider.getVoices(!0), this.primaryReachable = !0, this.maybeRecoverNow();
      } catch {
        this.startHealthCheck();
      }
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
        const s = this.activeEngine.getCurrentVoice() ?? (typeof this.lastVoiceRequest == "object" ? this.lastVoiceRequest : null), a = s?.language || this.currentUtterances[this.desiredIndex]?.language || (typeof navigator < "u" ? navigator.language : "en");
        if (t = await this.pickBestFallbackVoice(a, s?.gender, s?.controls?.boundary !== !1), !t) throw new Error("no offline-available fallback voice found");
        return this.fallbackProvider.createEngine(t);
      },
      () => (this.hasFallenBack = !0, this.onFailure === "fallbackAndRecover" && this.startHealthCheck(), { type: "enginefallback", detail: { reason: e.detail, voice: t } }),
      () => {
        this.hasFallenBack = !0, this.emitEvent(e);
      }
    );
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
  async performSwap(e, t, i) {
    this.swapInFlight = !0;
    const s = this.teardownEpoch, a = this.activeEngine;
    let r;
    try {
      r = await e();
    } catch {
      this.swapInFlight = !1, i();
      return;
    }
    if (s !== this.teardownEpoch) {
      this.swapInFlight = !1, await r.destroy();
      return;
    }
    this.copyPlaybackParameters(a, r), this.unbindActiveEngine?.(), this.activeEngine = r, this.engineStarted = !1, this.swapInFlight = !1, this.bindActiveEngine(), this.emitEvent(t(r)), this.startEngineWhenReady(r), r.loadUtterances(this.currentUtterances, this.desiredIndex), await a.destroy();
  }
  // Only skip the offlineAvailability filter when navigator.onLine is confirmed true — unknown
  // (unimplemented navigator.onLine) defaults to restricting, not to allowing online voices.
  //
  // Language narrows first, gender second, boundary-support third: a same-language wrong-gender
  // voice beats a different-language right-gender one, and a same-gender voice that drops
  // boundary events beats one that also mismatches on boundary support. Falls back to any
  // language if none matches, then to any gender within that if none matches, then to any
  // boundary support within that if none matches. Region/quality ranking within the final
  // candidate set is delegated to pickBestVoiceByRegion, the same ranking logic
  // sortVoicesByRegions uses.
  async pickBestFallbackVoice(e, t, i) {
    const s = await this.fallbackProvider.getVoices(), r = typeof navigator < "u" && navigator.onLine === !0 ? s : s.filter((f) => f.offlineAvailability === !0);
    if (r.length === 0) return null;
    const [o] = Ie([e]), { voicesByLang: l } = Pe(r, [o]), c = l.get(o.baseLang) ?? [], u = c.length > 0 ? c : r, g = t ? u.filter((f) => f.gender === t) : [], d = g.length > 0 ? g : u, h = it(d, i);
    return gn(e, h);
  }
  async destroy() {
    this.teardownEpoch++, this.healthCheckTimer !== null && (clearTimeout(this.healthCheckTimer), this.healthCheckTimer = null), this.unbindActiveEngine?.(), this.events.clear(), await this.activeEngine.destroy();
  }
}
class nr {
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
  async createEngine(e) {
    let t;
    try {
      t = await this.primary.createEngine(e);
    } catch (i) {
      if (this.onFailure === "error")
        throw i;
      return this.fallback.createEngine(e);
    }
    return new Ts({
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
function zs(n) {
  return new yi({
    start: new Rt(n.start),
    end: n.end ? new Rt(n.end) : void 0
  });
}
function Ns(n, e = window) {
  const { href: t, text: i, cssSelector: s, domRange: a, fragment: r } = n, o = i ? new di(i) : void 0, l = s || a ? /* @__PURE__ */ new Map() : void 0;
  l && (s && l.set("cssSelector", s), a && l.set("domRange", zs(a).serialize()));
  const u = l !== void 0 || r !== void 0 ? new gi({
    fragments: r ? [r] : void 0,
    otherLocations: l
  }) : void 0;
  return new fi({
    href: t ?? e.location.href,
    type: "text/html",
    text: o,
    locations: u
  });
}
class Ms extends ci {
  constructor(e, t, i, s = {}) {
    super(e.host, s), this.channel = e, this.wnd = t, this.decorator = i;
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
      e.map(({ id: i, style: s, ...a }) => ({
        id: i,
        style: s,
        locator: Ns(a, this.wnd)
      })),
      t
    );
  }
  destroy() {
    super.destroy(), this.decorator.unmount(this.wnd, this.channel.frame), this.channel.frame.destroy();
  }
}
function ir(n = window, e = {}) {
  const t = new ui(), i = new hi();
  return i.mount(n, t.frame), new Ms(t, n, i, e);
}
const Ln = (n) => n.voiceURI ?? n.identifier ?? n.name;
class sr {
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
const Le = (n, e, t) => Object.freeze({ range: Object.freeze([n, e]), step: t }), be = Le(0, 5e3, 100), we = Le(0.1, 10, 0.1), ke = Le(0, 2, 0.1), Ce = Le(0, 1, 0.05), lt = Object.freeze(["none", "few", "some", "most", "custom"]), ct = Object.freeze(["none", "block-level", "always"]), ut = Object.freeze(["plain", "ssml"]), ht = Object.freeze(["none", "utterance", "block"]), dt = Object.freeze(["structure", "sentence"]), Bt = Object.freeze([
  "format",
  "inlineContextualization",
  "verbosity",
  "skip",
  "contextualize",
  "language",
  "languageOverrides",
  "segmentation"
]);
function Bs(n) {
  return n == null || typeof n == "boolean" ? n : void 0;
}
function O(n, e) {
  return n == null || e.includes(n) ? n : void 0;
}
function z(n, e) {
  if (n == null) return n;
  if (typeof n != "number" || Number.isNaN(n)) return;
  const t = Math.min(...e), i = Math.max(...e);
  return n >= t && n <= i ? n : void 0;
}
function gt(n) {
  if (n == null) return n;
  if (!(typeof n != "object" || Array.isArray(n)))
    return Object.values(n).every((e) => typeof e == "string") ? { ...n } : void 0;
}
function On(n) {
  return typeof n == "string" ? n : gt(n);
}
function G(n) {
  return n == null ? n : Array.isArray(n) && n.every((e) => typeof e == "string") ? [...n] : void 0;
}
class js {
  format;
  inlineContextualization;
  verbosity;
  skip;
  contextualize;
  language;
  languageOverrides;
  segmentation;
  voice;
  pauseDuration;
  autoPause;
  rate;
  pitch;
  volume;
  constructor(e = {}) {
    this.format = O(e.format, ut) ?? "plain", this.inlineContextualization = G(e.inlineContextualization) ?? [], this.verbosity = O(e.verbosity, lt) ?? "few", this.skip = G(e.skip) ?? [], this.contextualize = G(e.contextualize) ?? [], this.language = O(e.language, ct) ?? "block-level", this.languageOverrides = gt(e.languageOverrides) ?? {}, this.segmentation = O(e.segmentation, dt) ?? "structure", this.voice = On(e.voice) ?? null, this.pauseDuration = z(e.pauseDuration, be.range) ?? 300, this.autoPause = O(e.autoPause, ht) ?? "none", this.rate = z(e.rate, we.range) ?? 1, this.pitch = z(e.pitch, ke.range) ?? 1, this.volume = z(e.volume, Ce.range) ?? 1;
  }
}
class le {
  format;
  inlineContextualization;
  verbosity;
  skip;
  contextualize;
  language;
  languageOverrides;
  segmentation;
  voice;
  pauseDuration;
  autoPause;
  rate;
  pitch;
  volume;
  constructor(e = {}) {
    this.format = O(e.format, ut), this.inlineContextualization = G(e.inlineContextualization), this.verbosity = O(e.verbosity, lt), this.skip = G(e.skip), this.contextualize = G(e.contextualize), this.language = O(e.language, ct), this.languageOverrides = gt(e.languageOverrides), this.segmentation = O(e.segmentation, dt), this.voice = On(e.voice), this.pauseDuration = z(e.pauseDuration, be.range), this.autoPause = O(e.autoPause, ht), this.rate = z(e.rate, we.range), this.pitch = z(e.pitch, ke.range), this.volume = z(e.volume, Ce.range);
  }
  merging(e) {
    const t = { ...this };
    for (const i of Object.keys(e))
      e[i] !== void 0 && (t[i] = e[i]);
    return new le(t);
  }
}
class K {
  _value;
  _effectiveValue;
  _isEffective;
  _onChange;
  constructor({
    initialValue: e = null,
    effectiveValue: t,
    isEffective: i,
    onChange: s
  }) {
    this._value = e, this._effectiveValue = t, this._isEffective = i, this._onChange = s;
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
class ie extends K {
  _supportedValues;
  constructor({
    initialValue: e = null,
    effectiveValue: t,
    isEffective: i,
    onChange: s,
    supportedValues: a
  }) {
    super({ initialValue: e, effectiveValue: t, isEffective: i, onChange: s }), this._supportedValues = a;
  }
  set value(e) {
    if (e != null && O(e, this._supportedValues) === void 0)
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
class ar extends K {
  set value(e) {
    if (e != null && Bs(e) === void 0)
      throw new Error(`Value '${String(e)}' is not a boolean.`);
    this._value = e, this._onChange(this._value);
  }
  get value() {
    return this._value;
  }
}
class Te extends K {
  set value(e) {
    if (e != null && G(e) === void 0)
      throw new Error(`Value '${String(e)}' is not an array of strings.`);
    this._value = e, this._onChange(this._value);
  }
  get value() {
    return this._value;
  }
}
class me extends K {
  _supportedRange;
  _step;
  _decimals;
  constructor({
    initialValue: e = null,
    effectiveValue: t,
    isEffective: i,
    onChange: s,
    supportedRange: a,
    step: r
  }) {
    super({ initialValue: e, effectiveValue: t, isEffective: i, onChange: s }), this._supportedRange = a, this._step = r, this._decimals = this._step.toString().includes(".") ? this._step.toString().split(".")[1].length : 0;
  }
  set value(e) {
    if (e != null && z(e, this._supportedRange) === void 0)
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
class jt {
  preferences;
  settings;
  // Cloned rather than aliased: edits made through this editor's setters
  // are staged on this copy and only reach the navigator's own preferences
  // once explicitly passed to submitPreferences() — discarding the editor
  // without submitting must leave the navigator untouched.
  constructor(e, t) {
    this.preferences = new le({ ...e }), this.settings = t;
  }
  // Explicit `null`s, not `undefined` — merging() skips `undefined` fields,
  // so only `null` actually clears them once submitted.
  clear() {
    this.preferences = new le({
      format: null,
      inlineContextualization: null,
      verbosity: null,
      skip: null,
      contextualize: null,
      language: null,
      languageOverrides: null,
      segmentation: null,
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
    return new ie({
      initialValue: this.preferences.format,
      effectiveValue: this.settings.format,
      isEffective: this.preferences.format != null,
      onChange: (e) => this.updatePreference("format", e ?? null),
      supportedValues: ut
    });
  }
  get inlineContextualization() {
    return new Te({
      initialValue: this.preferences.inlineContextualization,
      effectiveValue: this.settings.inlineContextualization,
      isEffective: this.preferences.inlineContextualization != null,
      onChange: (e) => this.updatePreference("inlineContextualization", e ?? null)
    });
  }
  get verbosity() {
    return new ie({
      initialValue: this.preferences.verbosity,
      effectiveValue: this.settings.verbosity,
      isEffective: this.preferences.verbosity != null,
      onChange: (e) => this.updatePreference("verbosity", e ?? null),
      supportedValues: lt
    });
  }
  get skip() {
    return new Te({
      initialValue: this.preferences.skip,
      effectiveValue: this.settings.skip,
      isEffective: this.preferences.skip != null,
      onChange: (e) => this.updatePreference("skip", e ?? null)
    });
  }
  get contextualize() {
    return new Te({
      initialValue: this.preferences.contextualize,
      effectiveValue: this.settings.contextualize,
      isEffective: this.preferences.contextualize != null,
      onChange: (e) => this.updatePreference("contextualize", e ?? null)
    });
  }
  get language() {
    return new ie({
      initialValue: this.preferences.language,
      effectiveValue: this.settings.language,
      isEffective: this.preferences.language != null,
      onChange: (e) => this.updatePreference("language", e ?? null),
      supportedValues: ct
    });
  }
  get languageOverrides() {
    return new K({
      initialValue: this.preferences.languageOverrides,
      effectiveValue: this.settings.languageOverrides,
      isEffective: this.preferences.languageOverrides != null,
      onChange: (e) => this.updatePreference("languageOverrides", e ?? null)
    });
  }
  get segmentation() {
    return new ie({
      initialValue: this.preferences.segmentation,
      effectiveValue: this.settings.segmentation,
      isEffective: this.preferences.segmentation != null,
      onChange: (e) => this.updatePreference("segmentation", e ?? null),
      supportedValues: dt
    });
  }
  get voice() {
    return new K({
      initialValue: this.preferences.voice,
      effectiveValue: this.settings.voice,
      isEffective: this.preferences.voice != null,
      onChange: (e) => this.updatePreference("voice", e ?? null)
    });
  }
  get pauseDuration() {
    return new me({
      initialValue: this.preferences.pauseDuration,
      effectiveValue: this.settings.pauseDuration,
      isEffective: this.preferences.pauseDuration != null,
      onChange: (e) => this.updatePreference("pauseDuration", e ?? null),
      supportedRange: be.range,
      step: be.step
    });
  }
  get autoPause() {
    return new ie({
      initialValue: this.preferences.autoPause,
      effectiveValue: this.settings.autoPause,
      isEffective: this.preferences.autoPause != null,
      onChange: (e) => this.updatePreference("autoPause", e ?? null),
      supportedValues: ht
    });
  }
  get rate() {
    return new me({
      initialValue: this.preferences.rate,
      effectiveValue: this.settings.rate,
      isEffective: this.preferences.rate != null,
      onChange: (e) => this.updatePreference("rate", e ?? null),
      supportedRange: we.range,
      step: we.step
    });
  }
  get pitch() {
    return new me({
      initialValue: this.preferences.pitch,
      effectiveValue: this.settings.pitch,
      isEffective: this.preferences.pitch != null,
      onChange: (e) => this.updatePreference("pitch", e ?? null),
      supportedRange: ke.range,
      step: ke.step
    });
  }
  get volume() {
    return new me({
      initialValue: this.preferences.volume,
      effectiveValue: this.settings.volume,
      isEffective: this.preferences.volume != null,
      onChange: (e) => this.updatePreference("volume", e ?? null),
      supportedRange: Ce.range,
      step: Ce.step
    });
  }
}
const Vn = ["audio", "figure", "image", "math", "table", "video"], xn = [
  ...Vn,
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
], Ds = [
  ...xn,
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
], Fs = {
  none: /* @__PURE__ */ new Set([
    "aside",
    "audio",
    "bibliography",
    "biblioref",
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
    "noteref",
    "pagebreak",
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
    "biblioref",
    "cell",
    "columnheader",
    "details",
    "endnotes",
    "footnote",
    "glossary",
    "landmarks",
    "loa",
    "loi",
    "lot",
    "lov",
    "noteref",
    "pagebreak",
    "pullquote",
    "row",
    "rowheader",
    "toc"
  ]),
  some: /* @__PURE__ */ new Set([
    "aside",
    "bibliography",
    "biblioref",
    "endnotes",
    "footnote",
    "glossary",
    "landmarks",
    "loa",
    "loi",
    "lot",
    "lov",
    "noteref",
    "pagebreak",
    "pullquote",
    "toc"
  ]),
  most: /* @__PURE__ */ new Set(["landmarks", "loa", "loi", "lot", "lov", "toc"])
}, _s = {
  none: /* @__PURE__ */ new Set(),
  few: new Set(Vn),
  some: new Set(xn),
  most: new Set(Ds)
}, Ke = {
  table: { few: "inline", some: "block", most: "block" }
};
function ve(n) {
  const e = {};
  for (const t of Object.keys(Ke))
    e[t] = Ke[t]?.[n] ?? "inline";
  return e;
}
const $s = {
  none: ve("none"),
  few: ve("few"),
  some: ve("some"),
  most: ve("most")
}, rr = Object.keys(Ke);
function qs(n, e) {
  const t = n === "custom" ? {} : $s[n];
  if (!e) return t;
  const i = { ...t };
  for (const s of Object.keys(e)) {
    const a = e[s]?.[n];
    a && (i[s] = a);
  }
  return i;
}
const Gs = (n, e) => {
  if (!e || typeof n == "string") return n;
  const [t] = k(e.language);
  return !t || n && nt(n, t) !== void 0 ? n : { ...n, [t]: Ln(e) };
};
class ze {
  format;
  inlineContextualization;
  verbosity;
  skip;
  contextualize;
  language;
  languageOverrides;
  segmentation;
  voice;
  pauseDuration;
  autoPause;
  rate;
  pitch;
  volume;
  /**
   * @param engineVoice The engine's voice, which `voice` falls back to: when unset, or for its language in a record without it.
   */
  constructor(e, t, i) {
    this.format = e.format ?? t.format, this.inlineContextualization = e.inlineContextualization ?? t.inlineContextualization, this.verbosity = e.verbosity ?? t.verbosity, this.verbosity === "custom" ? (this.skip = e.skip ?? t.skip, this.contextualize = e.contextualize ?? t.contextualize) : (this.skip = [...Fs[this.verbosity]], this.contextualize = [..._s[this.verbosity]]), this.language = e.language ?? t.language, this.languageOverrides = e.languageOverrides ?? t.languageOverrides, this.segmentation = e.segmentation ?? t.segmentation, this.voice = Gs(e.voice ?? t.voice, i), this.pauseDuration = e.pauseDuration ?? t.pauseDuration, this.autoPause = e.autoPause ?? t.autoPause, this.rate = e.rate ?? t.rate, this.pitch = e.pitch ?? t.pitch, this.volume = e.volume ?? t.volume;
  }
}
const Dt = /* @__PURE__ */ new WeakMap(), Un = /* @__PURE__ */ new WeakMap();
function Ft(n, e) {
  Un.set(n, e);
}
const Tn = /* @__PURE__ */ new WeakSet();
function _t(n) {
  return Tn.add(n), n;
}
function Hs(n, e, t) {
  const i = Un.get(n);
  if (i) {
    const u = Ut(i.map, e), g = Ut(i.map, e + t);
    e = u, t = Math.max(0, g - u);
  }
  const s = n.offsets, a = !n.plain && !!n.ssml, r = i?.plain ?? n.plain ?? (n.ssml ? N(n.ssml) : "");
  if (!s?.length || !r) return;
  const o = Dt.get(n), l = o !== void 0 && e >= o.cursor;
  let c = l ? o.cursor : 0;
  for (let u = l ? o.pieceIndex : 0; u < s.length; u++) {
    const g = s[u], d = g.locate.text?.highlight, h = d ? a ? N(d) : d : r.slice(c);
    if (!h) continue;
    const f = r.indexOf(h, c);
    if (f === -1) continue;
    const p = f + h.length;
    if (e >= f && e < p) {
      if (Tn.has(g.locate)) return;
      Dt.set(n, { pieceIndex: u, cursor: c });
      const m = e - f, S = h.substring(m, Math.min(m + t, h.length));
      return { locate: {
        ...g.locate,
        domRange: void 0,
        text: {
          highlight: S,
          before: h.substring(0, m),
          after: h.substring(m + S.length)
        }
      }, word: S };
    }
    c = p;
  }
}
function Ks(n, e) {
  return e === "sentence" && n.offsets?.length ? n.offsets.map((t) => t.locate) : n.locate ? [n.locate] : [];
}
function x(n) {
  return { pattern: new RegExp(`(\\d+)\\s?u${n}\\b`, "g"), replace: (e, t) => `${t}µ${n}` };
}
const Ws = {
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
}, Qs = {
  ...Ws,
  // Rejects "(c)" directly preceded by "(a)"/"(b)" (a lettered list, not a copyright notice).
  "(c)": { pattern: new RegExp("(?<!\\([ab]\\)\\s{0,3})\\(c\\)", "g"), replace: "©" },
  "(C)": { pattern: new RegExp("(?<!\\([AB]\\)\\s{0,3})\\(C\\)", "g"), replace: "©" },
  "(r)": "®",
  "(R)": "®",
  "(tm)": "™",
  "(TM)": "™",
  deg: { pattern: /(\d+)\s?deg\b/g, replace: (n, e) => `${e}°` },
  x: { pattern: /(\d+)\s?[xX]\s?(?=\d)/g, replace: (n, e) => `${e}×` },
  ug: x("g"),
  um: x("m"),
  us: x("s"),
  uL: x("L"),
  uF: x("F"),
  uA: x("A"),
  uV: x("V"),
  uW: x("W"),
  uN: x("N"),
  umol: x("mol"),
  "->": "→",
  "<-": "←",
  // Reversed from every other entry: engines pattern-match the ASCII foot/inch
  // convention for pronunciation, but drop the real prime marks silently.
  "′": "'",
  "″": '"'
}, Js = { contextualizations: { abstract: { block: { start: "Start of the abstract.", end: "End of the abstract." } }, acknowledgments: { block: { start: "Start of the acknowledgments.", end: "End of the acknowledgments." } }, afterword: { block: { start: "Start of the afterword.", end: "End of the afterword." } }, appendix: { block: { start: "Start of the appendix.", end: "End of the appendix." } }, aside: { block: { start: "Start of the aside.", end: "End of the aside." } }, audio: { inline: { labelled: "Audio with a label: {{ description }}", unlabelled: "Audio with no label." } }, bibliography: { block: { start: "Start of the bibliography.", end: "End of the bibliography." } }, blockquote: { inline: "Blockquote." }, cell: { inline: { withHeader: "{{ header }}: {{ value }}", withoutHeader: "{{ value }}" } }, chapter: { block: { start: "Start of the chapter.", end: "End of the chapter." } }, colophon: { inline: "Colophon." }, complementary: { block: { start: "Start of the complementary content.", end: "End of the complementary content." } }, conclusion: { block: { start: "Start of the conclusion.", end: "End of the conclusion." } }, cover: { inline: { labelled: "Cover with a label: {{ description }}", unlabelled: "Cover with no label." } }, credit: { inline: "Credit." }, credits: { block: { start: "Start of the credits.", end: "End of the credits." } }, dedication: { inline: "Dedication." }, definition: { inline: "Definition." }, details: { block: { start: "Start of the disclosure.", end: "End of the disclosure." } }, endnotes: { block: { start: "Start of the endnotes.", end: "End of the endnotes." } }, epigraph: { inline: "Epigraph." }, epilogue: { block: { start: "Start of the epilogue.", end: "End of the epilogue." } }, errata: { block: { start: "Start of the errata.", end: "End of the errata." } }, example: { block: { start: "Start of the example.", end: "End of the example." } }, figure: { inline: "Figure: {{ description }}" }, footnote: { block: { start: "Start of the footnote.", end: "End of the footnote." } }, foreword: { block: { start: "Start of the foreword.", end: "End of the foreword." } }, glossary: { block: { start: "Start of the glossary.", end: "End of the glossary." } }, heading1: { inline: "Heading level 1." }, heading2: { inline: "Heading level 2." }, heading3: { inline: "Heading level 3." }, heading4: { inline: "Heading level 4." }, heading5: { inline: "Heading level 5." }, heading6: { inline: "Heading level 6." }, image: { inline: { labelled: "Image with a label: {{ description }}", unlabelled: "Image with no label." } }, index: { block: { start: "Start of the index.", end: "End of the index." } }, introduction: { block: { start: "Start of the introduction.", end: "End of the introduction." } }, list: { block: { start: "Start of the list.", end: "End of the list." } }, listItem: { inline: "List item." }, math: { inline: { labelled: "{{ description }}", unlabelled: "Math formula with no label." } }, notice: { inline: "Notice." }, pagebreak: { inline: "Pagebreak.", number: "Page {{ number }}" }, pagelist: { block: { start: "Start of the page list.", end: "End of the page list." } }, part: { inline: "Part." }, preface: { block: { start: "Start of the preface.", end: "End of the preface." } }, prologue: { block: { start: "Start of the prologue.", end: "End of the prologue." } }, pullquote: { inline: "Pullquote." }, qna: { block: { start: "Start of the questions and answers.", end: "End of the questions and answers." } }, row: { inline: "Row: {{ count }}" }, rowheader: { inline: { withHeader: "{{ header }}: {{ value }}", withoutHeader: "{{ value }}" } }, separator: { inline: "Separator." }, subtitle: { inline: "Subtitle." }, summary: { inline: "Summary." }, table: { block: { end: "End of the table.", start: { labelled: "Table: {{ description }}. {{ lines }}. {{ columns }}.", unlabelled: "Table. {{ lines }}. {{ columns }}." } }, inline: { labelled: "Table: {{ description }}. {{ lines }}. {{ columns }}.", unlabelled: "Table. {{ lines }}. {{ columns }}." }, parts: { columns_one: "1 column", columns_other: "{{ count }} columns", lines_one: "1 line", lines_other: "{{ count }} lines" } }, term: { inline: "Term." }, tip: { inline: "Tip." }, video: { inline: { labelled: "Video with a label: {{ description }}", unlabelled: "Video with no label." } } } }, Zs = {
  speech: Js
}, zn = Zs.speech.contextualizations, We = { en: zn }, Nn = {};
function Xs(n) {
  return We[n] || Nn[n] ? n : "en";
}
async function Ys(n) {
  const e = We[n];
  if (e) return e;
  const t = Nn[n];
  if (!t) return zn;
  const i = (await t()).speech.contextualizations;
  return We[n] = i, i;
}
const ea = {
  de: ["A.", "A.M.", "Abs.", "Abt.", "Abw.", "Adj.", "Adr.", "Akt.", "Allg.", "Alt.", "App.", "Apr.", "Art.", "Aug.", "Ausg.", "Ausschl.", "B.", "Bed.", "Ben.", "Ber.", "Best.", "Bibl.", "C.", "Ca.", "Chin.", "Chr.", "Co.", "D.", "D. h.", "Dat.", "Dez.", "Di.", "Dim.", "Dipl.-Ing.", "Dipl.-Kfm.", "Dir.", "Do.", "Dr.", "Dtzd.", "Einh.", "Erf.", "Evtl.", "F.", "F.f.", "Fa.", "Fam.", "Feb.", "Fn.", "Folg.", "Forts. f.", "Fr.", "Frl.", "G.", "Gebr.", "Gem.", "Geograph.", "Ges.", "Gesch.", "Ggf.", "Hbf.", "Hptst.", "Hr.", "Hrn.", "Hrsg.", "I.", "Inc.", "Ing.", "Inh.", "Int.", "J.", "J.D.", "Jahrh.", "Jan.", "Jr.", "Kap.", "Kfm.", "Kl.", "Konv.", "Kop.", "L.", "Ltd.", "M.", "Max.", "Mi.", "Min.", "Mind.", "Mio.", "Mo.", "Mod.", "Mrd.", "Msp.", "N.", "Nov.", "Nr.", "O.", "Obj.", "Okt.", "Op.", "P.", "P.M.", "PIN.", "Pfd.", "Phys.", "Port.", "Prot.", "Proz.", "Qu.", "R.", "Rd.", "Reg.", "Reg.-Bez.", "Rel.", "Rep.", "S.A.", "Sa.", "Schr.", "Sek.", "Sep.", "Sept.", "So.", "Spezif.", "St.", "StR.", "Std.", "Str.", "T.", "Tel.", "Temp.", "Test.", "Trans.", "Tägl.", "U.", "U. U.", "U.S.", "U.S.A.", "U.U.", "Urspr.", "Ursprüngl.", "Verf.", "Vgl.", "W.", "Wg.", "Y.", "Z.", "Z. B.", "Z. Zt.", "Ztr.", "a.D.", "a.M.", "a.Rh.", "a.a.O.", "a.a.S.", "am.", "amtl.", "b.", "beil.", "d.J.", "d.Ä.", "e.V.", "e.Wz.", "e.h.", "ehem.", "eigtl.", "einschl.", "entspr.", "erw.", "ev.", "evtl.", "exkl.", "frz.", "geb.", "gedr.", "gek.", "gesch.", "gest.", "ggf.", "ggfs.", "hpts.", "i.A.", "i.B.", "i.H.", "i.J.", "i.R.", "i.V.", "inkl.", "jew.", "jhrl.", "k. u. k.", "k.u.k.", "kath.", "kfm.", "kgl.", "led.", "m.E.", "m.W.", "mtl.", "möbl.", "n. Chr.", "n.u.Z.", "näml.", "o.A.", "o.B.", "o.g.", "od.", "p.Adr.", "r.", "röm.", "röm.-kath.", "s.", "s.a.", "schles.", "schweiz.", "schwäb.", "sog.", "südd.", "tägl.", "u.", "u. Z.", "u.A.w.g.", "u.U.", "u.a.", "u.v.a.", "u.Ä.", "u.ä.", "v. Chr.", "v. H.", "v. u. Z.", "v.Chr.", "v.H.", "v.R.w.", "v.T.", "v.u.Z.", "verh.", "verw.", "vgl.", "z.", "z.B.", "z.Hd.", "z.Z.", "zzgl.", "österr."],
  en: ["A.D.", "A.I.", "A.M.", "A.S.", "AA.", "AB.", "Abs.", "Adj.", "Adv.", "Alt.", "Approx.", "Aug.", "B.V.", "C.F.", "C.O.D.", "Capt.", "Col.", "Comm.", "Conn.", "Cont.", "D.A.", "D.C.", "DC.", "DR.", "Dec.", "Def.", "Dept.", "Diff.", "Dr.", "E.G.", "E.g.", "Ed.", "Est.", "Etc.", "Ex.", "Exec.", "Feb.", "Fn.", "Fri.", "Hon.B.A.", "I.", "I.D.", "I.T.", "I.e.", "J.B.", "J.D.", "J.K.", "Jan.", "Jun.", "K.R.", "L.A.", "L.P.", "Lev.", "Lib.", "Lt.", "Lt.Cdr.", "M.", "M.I.T.", "M.R.", "M.T.", "MR.", "Maj.", "Mar.", "Mart.", "Mb.", "Md.", "Mgr.", "Min.", "Misc.", "Mr.", "Mrs.", "Ms.", "Mt.", "N.V.", "N.Y.", "Nov.", "Nr.", "Num.", "Op.", "Org.", "P.M.", "P.O.", "P.V.", "PP.", "Ph.D.", "Phys.", "Prof.", "Pvt.", "R.L.", "R.T.", "Rep.", "Rev.", "S.A.", "S.A.R.", "S.E.", "S.p.A.", "Sep.", "Sept.", "Sgt.", "Sq.", "St.", "U.S.", "U.S.A.", "U.S.C.", "VS.", "Yr.", "a.m.", "d.", "dr.", "exec.", "pp.", "vs."],
  es: ["A.C.", "AA.", "All.", "Ant.", "Av.", "Avda.", "Bien.", "C.", "C.P.", "C.S.", "C.V.", "CA.", "Col.", "Comm.", "Corp.", "Cía.", "D.", "DC.", "Da.", "Desc.", "Desv.", "Dr.", "Dra.", "Drs.", "Dto.", "Dª.", "Dña.", "Em.", "Emm.", "Exc.", "Excma.", "Excmas.", "Excmo.", "Excmos.", "Exma.", "Exmas.", "Exmo.", "Exmos.", "FF.CC.", "Fabric.", "Fr.", "H.P.", "Id.", "Ilma.", "Ilmas.", "Ilmo.", "Ilmos.", "Inc.", "JJ.OO.", "K.", "Kit.", "Korn.", "L.", "Lcda.", "Lcdo.", "Lda.", "Ldo.", "Lic.", "Ltd.", "Ltda.", "Ltdo.", "M.", "MM.", "Mons.", "Mr.", "Mrs.", "O.M.", "PP.", "R.D.", "R.U.", "RAM.", "RR.HH.", "Rdo.", "Rdos.", "Reg.", "Rev.", "Rol.", "Rvdmo.", "Rvdmos.", "Rvdo.", "Rvdos.", "SA.", "SS.AA.", "SS.MM.", "Sdad.", "Seg.", "Sol.", "Sr.", "Sra.", "Sras.", "Sres.", "Srta.", "Srtas.", "Sta.", "Sto.", "Trab.", "U.S.", "U.S.A.", "Var.", "Vda.", "a. C.", "a. e. c.", "abr.", "afma.", "afmas.", "afmo.", "afmos.", "ago.", "bco.", "bol.", "c/c.", "cap.", "cf.", "cfr.", "col.", "d. C.", "depto.", "deptos.", "dic.", "doc.", "dom.", "dpto.", "dptos.", "dtor.", "e. c.", "e.g.", "ed.", "ej.", "ene.", "feb.", "fig.", "figs.", "fund.", "hnos.", "jue.", "jul.", "jun.", "licda.", "licdo.", "lun.", "mar.", "may.", "mié.", "ms.", "mss.", "mtro.", "nov.", "ntra.", "ntro.", "oct.", "p.ej.", "prof.", "prov.", "sept.", "sras.", "sres.", "srs.", "ss.", "sáb.", "trad.", "v.gr.", "vid.", "vie.", "vs."],
  fr: ["All.", "C.", "Comm.", "D.", "DC.", "Desc.", "Inc.", "Jr.", "L.", "M.", "MM.", "Mart.", "Op.", "P.", "P.-D. G.", "P.O.", "Prof.", "S.A.", "S.M.A.R.T.", "U.", "U.S.", "U.S.A.", "Var.", "W.", "acoust.", "adr.", "anc.", "ann.", "anon.", "ap. J.-C.", "append.", "aux.", "av. J.-C.", "avr.", "broch.", "bull.", "cam.", "categ.", "coll.", "collab.", "config.", "dest.", "dict.", "dim.", "dir.", "doc.", "déc.", "encycl.", "exempl.", "fig.", "févr.", "gouv.", "graph.", "hôp.", "ill.", "illustr.", "imm.", "imprim.", "indus.", "janv.", "jeu.", "juil.", "lun.", "mar.", "mer.", "niv.", "nov.", "oct.", "quart.", "réf.", "sam.", "sept.", "symb.", "synth.", "syst.", "trav. publ.", "ven.", "voit.", "éd.", "édit.", "équiv.", "éval."],
  it: ["C.P.", "Cfr.", "D.", "DC.", "Geom.", "Ing.", "L.", "Liv.", "Ltd.", "Mod.", "N.B.", "N.d.A.", "N.d.E.", "N.d.T.", "O.d.G.", "S.A.R.", "S.M.A.R.T.", "S.p.A.", "Sig.", "U.S.", "U.S.A.", "a.C.", "ag.", "all.", "arch.", "avv.", "c.c.p.", "d.C.", "d.p.R.", "div.", "dott.", "dr.", "fig.", "int.", "mitt.", "on.", "p.", "p.i.", "pag.", "rag.", "sez.", "tab.", "tav.", "ver.", "vol."],
  pt: ["A.C.", "Alm.", "Av.", "Dir.", "Dr.", "Dra.", "Dras.", "Drs.", "E.", "Est.", "Exma.", "Exmo.", "Fr.", "Ilma.", "Ilmo.", "Jr.", "Ltd.", "Ltda.", "Mar.", "N.Sra.", "N.T.", "P.M.", "Pe.", "Ph.D.", "R.", "S.", "S.A.", "Sta.", "Sto.", "V.T.", "W.C.", "a.C.", "a.m.", "abr.", "abrev.", "adm.", "aer.", "ago.", "agric.", "anat.", "ap.", "apart.", "apt.", "arit.", "arqueol.", "arquit.", "astron.", "autom.", "aux.", "biogr.", "bras.", "cap.", "caps.", "cat.", "cel.", "cf.", "col.", "com.", "comp.", "compl.", "cont.", "contab.", "créd.", "cx.", "círc.", "cód.", "d.C.", "des.", "desc.", "dez.", "dipl.", "dir.", "div.", "doc.", "déb.", "ed.", "educ.", "elem.", "eletr.", "eletrôn.", "end.", "eng.", "esp.", "ex.", "f.", "fac.", "fasc.", "fem.", "fev.", "ff.", "fig.", "fil.", "filos.", "fisiol.", "fl.", "fot.", "fr.", "fís.", "geom.", "gram.", "gên.", "hist.", "ind.", "ingl.", "jan.", "jul.", "jun.", "jur.", "l.", "lat.", "lin.", "lit.", "liter.", "long.", "mai.", "mar.", "mat.", "matem.", "mov.", "máq.", "méd.", "mús.", "neol.", "nov.", "náut.", "obs.", "odont.", "odontol.", "org.", "organiz.", "out.", "p.", "p. ex.", "p.m.", "pal.", "pol.", "port.", "pp.", "pq.", "prod.", "prof.", "profa.", "pron.", "próx.", "psicol.", "pág.", "quím.", "r.s.v.p.", "ref.", "rel.", "relat.", "rep.", "res.", "rod.", "set.", "sociol.", "sup.", "séc.", "símb.", "tec.", "tecnol.", "tel.", "trad.", "transp.", "univ.", "vol.", "vs.", "álg.", "índ."],
  ru: ["авг.", "апр.", "дек.", "до н. э.", "кв.", "н. э.", "н.э.", "нояб.", "окт.", "отд.", "проф.", "руб.", "сент.", "тел.", "тыс.", "ул.", "февр.", "янв."],
  th: ["ค.ศ."]
};
function Ne(n, e, t) {
  let i = t;
  for (; i > e && /\s/.test(n[i - 1]); ) i--;
  return i;
}
const ta = /[\s([{"'“‘]/;
function na(n, e) {
  for (const t of e) {
    if (n.length < t.length || !n.endsWith(t)) continue;
    const i = n.length - t.length - 1;
    if (i < 0 || ta.test(n[i])) return !0;
  }
  return !1;
}
function ia(n) {
  let e = 0;
  for (const t of n)
    if (new RegExp("\\p{L}", "u").test(t) && e++, e >= 2) return !0;
  return !1;
}
function sa(n) {
  return /\.{3,}$/.test(n);
}
function aa(n, e, t, i) {
  if (i === "“") return !0;
  if (i !== '"') return !1;
  let s = 0;
  for (let a = e; a < t; a++) n[a] === '"' && s++;
  return s % 2 === 1;
}
const ra = new RegExp(`[.!?][”"'’)\\]]*\\s+—\\s+(?=\\p{Lu})`, "gu");
function oa(n, e) {
  const t = [...n.matchAll(ra)].map((s) => s.index + s[0].length);
  if (t.length === 0) return e;
  const i = [];
  for (const s of e) {
    let a = s.start;
    for (const r of t)
      r > a && r < s.end && (i.push({ start: a, end: r }), a = r);
    i.push({ start: a, end: s.end });
  }
  return i;
}
const la = { "»": "«", "«": "»", "›": "‹", "‹": "›" };
function ca(n, e) {
  const t = [], i = /* @__PURE__ */ new Map();
  let s = 0;
  const a = (r, o) => {
    for (; s < r; s++) i.set(n[s], (i.get(n[s]) ?? 0) + 1);
    return i.get(o) ?? 0;
  };
  for (const r of e) {
    const o = { ...r }, l = t[t.length - 1];
    let c = o.start;
    for (; l && c < o.end; ) {
      for (; c < o.end && /\s/.test(n[c]); ) c++;
      const u = la[n[c]];
      if (u === void 0 || a(l.end, u) <= a(l.end, n[c])) break;
      for (c++; c < o.end && /\s/.test(n[c]); ) c++;
      l.end = o.start = c;
    }
    o.start < o.end ? t.push(o) : l && (l.end = o.end);
  }
  return t;
}
function ua(n, e, t) {
  const i = ca(n, oa(n, e));
  for (let a = 0; a < i.length - 1; a++) {
    const r = Ne(n, i[a].start, i[a].end);
    if (r !== i[a].end || r <= i[a].start) continue;
    const o = n[r - 1];
    aa(n, i[a].start, r, o) && (i[a].end -= 1, i[a + 1].start -= 1);
  }
  const s = [];
  for (const a of i) {
    let r = a;
    for (; s.length > 0; ) {
      const o = s[s.length - 1], l = Ne(n, o.start, o.end), c = n.slice(o.start, l);
      if (!na(c, t) && ia(c) && !sa(c)) break;
      s.pop(), r = { start: o.start, end: r.end };
    }
    s.push(r);
  }
  return s.map((a) => {
    const r = Ne(n, a.start, a.end);
    return { text: n.slice(a.start, r), start: a.start, end: a.end, contentEnd: r };
  });
}
const $t = /* @__PURE__ */ new Map();
function Mn(n) {
  let e = $t.get(n);
  if (!e) {
    try {
      const [t, i] = k(n), s = i ? `${t}-${i}` : t;
      e = { segmenter: new Intl.Segmenter(s, { granularity: "sentence" }), language: n };
    } catch {
      e = { segmenter: new Intl.Segmenter("en", { granularity: "sentence" }), language: "en" };
    }
    $t.set(n, e);
  }
  return e;
}
function ha(n) {
  return Mn(n).language;
}
async function Bn(n, e, t) {
  if (e === "") return [];
  const { segmenter: i, language: s } = Mn(n), r = [...i.segment(e)].map((c) => ({ start: c.index, end: c.index + c.segment.length })), o = cn(ea, s) ?? [], l = t ? [...o, ...t] : o;
  return ua(e, r, l);
}
const or = [
  "aside",
  "audio",
  "bibliography",
  "biblioref",
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
  "noteref",
  "pagebreak",
  "pullquote",
  "row",
  "rowheader",
  "table",
  "toc",
  "video"
], da = [
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
], ga = {
  footnote: { drops: ["aside"], unconditional: !0 },
  cover: { drops: ["image"] },
  pullquote: { drops: ["blockquote", "aside"] },
  epigraph: { drops: ["blockquote"] }
}, fa = ["noteref", "pagebreak"], pa = ["audio", "video", "image", "figure", "math", "table", "cover"], ma = ["cell", "rowheader"], va = ["separator"], qt = new Set(da), jn = new Set(fa), ya = new Set(pa), Dn = new Set(ma), Sa = new Set(va);
function ba(n, e) {
  const t = pi.createInstance();
  return t.init({
    lng: n,
    resources: { [n]: { translation: e } },
    interpolation: { escapeValue: !1 }
  }), t;
}
function wa(n, e, t) {
  if (!e) return n;
  const i = { ...n };
  for (const s of Object.keys(e))
    i[s] = t(n[s], e[s]);
  return i;
}
function Fn(n, e) {
  if (typeof e == "string" || typeof n != "object") return e;
  const t = { ...n };
  for (const i of Object.keys(e))
    t[i] = Fn(n[i], e[i]);
  return t;
}
function ka(n, e) {
  return wa(n, e, Fn);
}
function _n(n, e = [], t = /* @__PURE__ */ new Map()) {
  for (const i of n)
    t.set(i, e), i.children && _n(i.children, [i, ...e], t);
  return t;
}
async function $n(n, e) {
  const t = e.contextualizationLocale ?? "en", i = ka(
    await Ys(t),
    e.contextualization?.contextualizations
  );
  return {
    i18n: ba(t, i),
    contextualizationLanguage: Xs(t),
    skip: new Set(e.skip ?? []),
    contextualize: new Set(e.contextualize ?? []),
    contextualizationShapes: e.contextualization?.shapes ?? {},
    contextualizationParams: e.contextualization?.params,
    format: e.format ?? "plain",
    inlineContextualization: new Set(e.inlineContextualization ?? []),
    language: e.language ?? "block-level",
    languageOverrides: e.languageOverrides ?? {},
    contentLanguage: e.contentLanguage,
    segmentation: e.segmentation?.mode ?? "structure",
    // segmentSentences() already applies builtInSuppressions internally
    // (Intl.Segmenter has no built-in equivalent of its own) — this is only
    // the caller's own additive extras, per `SegmentationOptions.suppressions`.
    segmentationSuppressions: e.segmentation?.suppressions ?? {},
    segmenter: e.segmentation?.segmenter ?? Bn,
    // Per-key override, not an additive union — each key holds one whole rule.
    substitutions: { ...Qs, ...e.substitutions },
    blockStarts: /* @__PURE__ */ new Set(),
    tableRowNumbers: /* @__PURE__ */ new Map(),
    tableCellHeaders: /* @__PURE__ */ new Map(),
    synthetic: /* @__PURE__ */ new Set(),
    ancestorChains: _n(n),
    pendingRange: /* @__PURE__ */ new Map(),
    edgeSubstitutedLocate: /* @__PURE__ */ new WeakMap(),
    placeholderPieces: /* @__PURE__ */ new Map()
  };
}
const Ca = /<lang xml:lang="[^"]*">([\s\S]*?)<\/lang>/g;
function qn(n) {
  return n.replace(Ca, "$1");
}
function Gn(n, e) {
  return n === void 0 ? void 0 : nt(e, n) ?? n;
}
function M(n, e) {
  return Gn(e.language === "none" ? e.contentLanguage : n ?? e.contentLanguage, e.languageOverrides);
}
function ft(n, e) {
  return n === e || n !== void 0 && e !== void 0 && n.toLowerCase() === e.toLowerCase();
}
function Qe(n, e) {
  return k(n)[0] === k(e)[0];
}
function Je(n, e, t, i) {
  const { language: s } = e;
  return s === void 0 ? !0 : Kn(e, t) ? !i && n.content !== void 0 && !Qe(n.content, s) ? !1 : (n.entry = s, !0) : n.content !== void 0 && !ft(n.content, s) || !i && n.entry !== void 0 && !Qe(s, n.entry) ? !1 : (n.content = s, !0);
}
function Hn(n, e, t) {
  const i = {};
  for (const s of n)
    if (!Je(i, s, e, t)) return null;
  return i.content ?? i.entry;
}
function Ea(n, e) {
  return Hn(n, e, !1);
}
function Kn(n, e) {
  return e.synthetic.has(n) && ft(n.language, e.contextualizationLanguage);
}
function Wn(n, e) {
  return Hn(n, e, e.format === "ssml");
}
function Qn(n, e, t) {
  const i = n.ssml ?? "";
  return !e || !n.language || !Kn(n, t) || Qe(n.language, e) ? i : `<lang xml:lang="${ln(n.language)}">${i}</lang>`;
}
function Jn(n, e) {
  const t = e.format === "ssml", i = [];
  let s = 0, a = {};
  return n.forEach((r, o) => {
    Je(a, r, e, t) || (i.push([s, o]), s = o, a = {}, Je(a, r, e, t));
  }), n.length > 0 && i.push([s, n.length]), i;
}
function Zn(n, e) {
  return n.replace(/<lang xml:lang="([^"]*)">/g, (t, i) => {
    const s = Gn(i, e);
    return s === i ? t : `<lang xml:lang="${s}">`;
  });
}
function W(n) {
  return n.role ? [...n.role] : [];
}
function Ze(n) {
  return n.role?.has("math") ? void 0 : n.text;
}
function Oe(n) {
  const e = n.description?.text;
  if (e)
    return e.plain ?? (e.ssml !== void 0 ? N(e.ssml) : void 0);
}
function Xn(n) {
  return n.description?.text?.language;
}
function J(n, e) {
  const t = n.cssSelector ?? n.domRange?.start.cssSelector;
  if (!t) return { ...n, text: { highlight: e } };
  const i = { cssSelector: t, text: { highlight: e } };
  return n.href !== void 0 && (i.href = n.href), i;
}
function L(n, e) {
  const t = Et(n);
  if (t) return { own: !0, ref: t };
  for (const i of e.get(n) ?? []) {
    const s = Et(i);
    if (s) return { own: !1, ref: s };
  }
}
function pt(n, e) {
  if (n)
    return n.own ? n.ref : J(n.ref, e);
}
function mt(n, e, t) {
  return (n && e ? mi(n.ref, e.ref) : void 0) ?? t;
}
function Yn(n, e, t) {
  const { ancestorChains: i } = t, s = /* @__PURE__ */ new Map();
  for (const a of e)
    a && !Array.isArray(a) && s.set(a, (s.get(a) ?? 0) + 1);
  return n.map((a, r) => {
    if (a.offsets) return a;
    const o = e[r], l = a.plain ?? a.ssml ?? "";
    if (Array.isArray(o)) {
      const [d, h] = o, f = L(d, i), p = L(h, i), m = mt(f, p, pt(f, l));
      return m ? { ...a, locate: m } : a;
    }
    const c = o, u = c ? L(c, i) : void 0;
    if (!u) return a;
    const g = { ...a, locate: u.ref };
    if (!t.synthetic.has(a)) {
      const d = t.pendingRange.get(a), h = d !== void 0 || c && (s.get(c) ?? 0) > 1;
      g.locate = u.own && !h ? u.ref : J(u.ref, l), g.offsets = [{ start: d?.start ?? 0, end: d?.end ?? l.length, locate: g.locate }];
    }
    return g;
  });
}
function vt(n) {
  const e = st(Ze(n));
  return e ? e.plain ?? (e.ssml ? N(e.ssml) : "") : "";
}
function Ra(n) {
  const e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map();
  let i = 0, s;
  return n.forEach((a, r) => {
    e.set(a, r + 1);
    const o = a.children ?? [];
    if (i = Math.max(i, o.length), o.some((l) => l.role?.has("columnheader"))) {
      s = o.map(vt);
      return;
    }
    s && o.forEach((l, c) => {
      if (!l.role?.has("cell") && !l.role?.has("rowheader")) return;
      const u = s[c];
      u && t.set(l, u);
    });
  }), { lines: n.length, columns: i, rowNumbers: e, cellHeaders: t };
}
function ei(n, e) {
  const t = e.format === "ssml" ? { ssml: T(n) } : { plain: n };
  return e.synthetic.add(t), t;
}
function D(n, e) {
  const t = ei(n, e), i = e.language === "none" ? M(void 0, e) : e.contextualizationLanguage;
  return i && (t.language = i), t;
}
function Xe(n, e, t) {
  const i = ei(n, t), s = M(Xn(e), t);
  return s && (i.language = s), i;
}
function _(n, e, t, i) {
  n.push(...i);
  for (let s = 0; s < i.length; s++) e.push(t);
}
function Ye(n, e, t, i, s, a, r) {
  r ? (s.some((o) => t.blockStarts.has(o)) && t.blockStarts.add(r), _(n, e, a[0] ?? i, [r])) : (n.push(...s), e.push(...a));
}
function Q(n, e, t, i) {
  const s = t ? `${e}.${t}` : void 0;
  if (s && n.i18n.exists(s)) return n.i18n.t(s, i);
  if (n.i18n.exists(e)) return n.i18n.t(e, i);
}
function yt(n, e) {
  return Dn.has(n) ? !0 : e.contextualize.has(n);
}
function ti(n, e, t) {
  return e.some((i) => {
    const s = ga[i];
    return s?.drops.includes(n) ? s.unconditional || yt(i, t) : !1;
  });
}
function ce(n, e, t, i, s) {
  const a = e.lastIndexOf(t);
  if (a === -1) return;
  const r = L(i, s.ancestorChains);
  if (!r) return;
  const o = J(r.ref, t);
  n.offsets = [{ start: a, end: a + t.length, locate: o }], n.locate = r.own ? r.ref : o;
}
function Me(n, e, t, i, s, a) {
  const r = a?.value;
  if (r !== void 0 && r === vt(t)) {
    const l = M(t.text?.language, i);
    l && (n.language = l), i.synthetic.delete(n), ce(n, e, r, t, i);
    return;
  }
  const o = a?.description;
  o !== void 0 && o === Oe(t) && (s === "figure" || s === "table") && ce(n, e, o, t, i);
}
function Gt(n, e, t, i, s, a, r, o) {
  if (!yt(s, i)) return;
  if ((i.i18n.exists(`${s}.block.start`) || i.i18n.exists(`${s}.block.end`)) && i.contextualizationShapes[s] !== "inline") {
    const c = a === "before" ? `${s}.block.start` : `${s}.block.end`;
    _(n, e, t, Kt(c, r, o, t, s, i));
    return;
  }
  a === "before" && _(n, e, t, Kt(`${s}.inline`, r, o, t, s, i));
}
const Ht = "\0";
function Kt(n, e, t, i, s, a) {
  const r = Q(a, n, e, t);
  if (!r) return [];
  const o = t?.description, l = a.language !== "none" && o !== void 0 && o === Oe(i) ? M(Xn(i), a) : void 0, c = l ? Q(a, n, e, { ...t, description: Ht })?.split(Ht) : void 0;
  if (!l || !c || c.length < 2) {
    const d = D(r, a);
    return Me(d, r, i, a, s, t), [d];
  }
  if (k(l)[0] === k(a.contextualizationLanguage)[0]) {
    const d = D(r, a);
    return d.language = l, Me(d, r, i, a, s, t), [d];
  }
  const u = `<lang xml:lang="${ln(l)}">${T(o)}</lang>`, g = c.map((d) => T(d)).join(u);
  if (a.format === "ssml") {
    const d = D(r, a);
    return d.ssml = g, Me(d, r, i, a, s, t), [d];
  }
  return at(g, a.contextualizationLanguage).map((d) => {
    if (d.language !== l) return D(d.plain, a);
    const h = Xe(d.plain, i, a);
    return (s === "figure" || s === "table") && ce(h, d.plain, o, i, a), h;
  });
}
function Wt(n, e, t, i) {
  const s = `${e}.parts.${t}`;
  return n.i18n.exists(s, { count: i }) ? n.i18n.t(s, { count: i }) : String(i);
}
function Ia(n) {
  const e = Oe(n);
  return e === void 0 ? { variantKey: "unlabelled" } : { variantKey: "labelled", params: { description: e } };
}
function Qt(n, e) {
  const t = e.tableCellHeaders.get(n);
  return {
    variantKey: t !== void 0 ? "withHeader" : "withoutHeader",
    params: { header: t ?? "", value: vt(n) }
  };
}
const Pa = {
  table: (n, e) => {
    const t = (n.children ?? []).filter((s) => s.role?.has("row")), i = Ra(t);
    for (const [s, a] of i.rowNumbers) e.tableRowNumbers.set(s, a);
    for (const [s, a] of i.cellHeaders) e.tableCellHeaders.set(s, a);
    return {
      params: {
        lines: Wt(e, "table", "lines", i.lines),
        columns: Wt(e, "table", "columns", i.columns)
      }
    };
  },
  row: (n, e) => ({ params: { count: String(e.tableRowNumbers.get(n) ?? "") } }),
  cell: Qt,
  rowheader: Qt
};
function Jt(n, e, t) {
  const i = Ia(e);
  let s = i.variantKey, a = i.params;
  const r = Pa[n]?.(e, t);
  r && (r.variantKey && (s = r.variantKey), a = { ...a, ...r.params });
  const o = t.contextualizationParams?.(n, e);
  return o && (a = { ...a, ...o }), { variantKey: s, params: a };
}
function Ee(n, e = n) {
  let t = "", i = "";
  const s = [];
  return n.forEach((a, r) => {
    const o = e[r];
    if (o.length === 1 && Qi(o) && i.endsWith(o)) {
      s.push({ start: t.length, end: t.length });
      return;
    }
    i && !he(o) && !/\s$/.test(i) && !/^\s/.test(o) && (t += " ", i += " ");
    const l = t.length;
    t += a, i += o, s.push({ start: l, end: t.length });
  }), { joined: t, ranges: s };
}
function Ve(n, e) {
  const t = vi(n), i = L(n, e.ancestorChains)?.ref;
  if (t) {
    const s = { cssSelector: t };
    return i?.href !== void 0 && (s.href = i.href), _t(s);
  }
  return i && _t(i);
}
function ni(n, e, t) {
  const i = [];
  return n.forEach((s, a) => {
    if (s.offsets) {
      i.push(...s.offsets);
      return;
    }
    if (t.synthetic.has(s)) return;
    const r = e[a];
    if (!r || Array.isArray(r)) return;
    const o = L(r, t.ancestorChains);
    if (!o) return;
    const l = t.format === "ssml" ? s.ssml : s.plain;
    if (!l) return;
    const c = t.pendingRange.get(s), u = de(r) ? Ve(r, t) ?? o.ref : J(o.ref, l);
    i.push({ start: c?.start ?? 0, end: c?.end ?? l.length, locate: u });
  }), i;
}
function Zt(n, e, t, i) {
  const s = i.edgeSubstitutedLocate.get(n);
  if (s) return s[t];
  if (!(!e || Array.isArray(e) || !de(e)))
    return Ve(e, i);
}
function Aa(n, e, t) {
  const i = n.map((l, c) => {
    if (l.locate) return l.locate;
    if (t.synthetic.has(l)) return;
    const u = e[c];
    if (!u || Array.isArray(u)) return;
    const g = t.format === "ssml" ? l.ssml : l.plain;
    if (g)
      return de(u) ? L(u, t.ancestorChains) && Ve(u, t) : pt(L(u, t.ancestorChains), g);
  }), s = i.findIndex((l) => l !== void 0);
  if (s === -1) return;
  let a = i.length - 1;
  for (; i[a] === void 0; ) a--;
  if (s === a) return i[s];
  const r = e[s], o = e[a];
  if (r && o && !Array.isArray(r) && !Array.isArray(o)) {
    const l = L(r, t.ancestorChains), c = L(o, t.ancestorChains);
    return mt(l, c, i[s]);
  }
  return i[s];
}
function St(n, e, t) {
  const i = [], s = [], a = [];
  for (let h = 0; h < n.length; h++) {
    const f = n[h], p = t.format === "ssml" ? f.ssml : f.plain;
    p && (i.push(p), s.push(f), a.push(e[h]));
  }
  if (i.length === 0) return;
  const r = Wn(s, t);
  if (r === null) return;
  const { joined: o } = Ee(t.format === "ssml" ? s.map((h) => Qn(h, r, t)) : i), l = t.format === "ssml" ? { ssml: o } : { plain: o };
  r && (l.language = r), n.some((h) => t.synthetic.has(h)) && t.synthetic.add(l);
  const c = ni(s, a, t);
  c.length > 0 && (l.offsets = c);
  const u = Aa(s, a, t);
  u && (l.locate = u);
  const g = Zt(s[0], a[0], "leading", t), d = Zt(s[s.length - 1], a[s.length - 1], "trailing", t);
  return (g || d) && t.edgeSubstitutedLocate.set(l, { leading: g, trailing: d }), l;
}
function ii(n, e, t, i) {
  if (e === "plain" && t !== "block-level" && t !== "none" && n.ssml && wn(n.ssml))
    return at(n.ssml, n.language).map((r) => {
      const o = { plain: r.plain }, l = M(r.language, i);
      return l && (o.language = l), i.pendingRange.set(o, { start: r.start, end: r.end }), o;
    });
  const s = {}, a = M(n.language, i);
  return a && (s.language = a), e === "ssml" ? s.ssml = n.ssml ? Zn(n.ssml, i.languageOverrides) : T(n.plain ?? "") : s.plain = n.plain ?? N(n.ssml ?? ""), (t === "block-level" || t === "none") && s.ssml && (s.ssml = qn(s.ssml)), [s];
}
function ge(n, e) {
  return e !== "ssml" ? n : n.replace(/<[^>]+>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
}
const Xt = "[\\u0391-\\u03A9\\u03B1-\\u03C9\\u03D8-\\u03E1]", La = "[\\u0374\\u02B9\\u0384']", Be = "[\\u05D0-\\u05EA]", Yt = "[\\u0400-\\u0481\\u048A-\\u04FF]", Oa = [
  new RegExp("^\\p{Nd}+$", "u"),
  new RegExp("^\\p{Nl}+$", "u"),
  /^(?=[MDCLXVI])M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i,
  /^[〇零一二三四五六七八九十百千万]+$/u,
  /^[፩-፼]+$/u,
  new RegExp(`^${Be}[\\u05F3']$`, "u"),
  new RegExp(`^${Be}+[\\u05F4"]${Be}$`, "u"),
  new RegExp(`^(?:\\u0375${Xt})*${Xt}+${La}$`, "u"),
  /^(?:[Ա-Ֆա-և]̅)+$/u,
  new RegExp(`^\\u0482?${Yt}+\\u0483${Yt}*$`, "u")
];
function Va(n) {
  const e = n.trim();
  return e.length > 0 && Oa.some((t) => t.test(e));
}
function en(n, e) {
  return e.skip.size > 0 && n.some((t) => e.skip.has(t) && !ti(t, n, e));
}
function xa(n, e) {
  const t = st(n.text);
  if (!t) return [];
  const i = t.plain ?? N(t.ssml ?? "");
  if (Va(i)) {
    const s = Q(e, "pagebreak.number", void 0, { number: i.trim() });
    if (s !== void 0) return [D(s, e)];
  }
  return ii(t, e.format, e.language, e);
}
function tn(n) {
  n.plain !== void 0 && (n.plain += "."), n.ssml !== void 0 && (n.ssml += ".");
}
function Ua(n, e) {
  const t = xa(n, e);
  if (!e.contextualize.has("pagebreak")) return t;
  const i = e.i18n.exists("pagebreak.block.start") ? "pagebreak.block.start" : "pagebreak.inline", s = Q(e, i);
  if (s === void 0) return t;
  const a = D(s, e);
  if (t.length === 0) return [a];
  const r = St([a, ...t], [void 0, ...t.map(() => n)], e);
  return r ? (tn(r), [r]) : (tn(t[t.length - 1]), [a, ...t]);
}
function Ta(n, e) {
  return W(n).some((t) => jn.has(t) && !e.inlineContextualization.has(t));
}
function za(n, e, t, i, s, a, r) {
  const o = n.text?.language, l = M(o, s), c = new Map((n.children ?? []).map((m) => [m.id, m])), u = [], g = [], d = [], h = /* @__PURE__ */ new Set(), f = /* @__PURE__ */ new Set(), p = s.segmentation === "sentence";
  for (const m of ds(e)) {
    if (m.placeholderId !== void 0) {
      const v = c.get(m.placeholderId);
      if (!v) continue;
      if (Ta(v, s)) {
        if (d.push(v), p) {
          const w = u.length;
          et(v, u, g, s, d.length === 1 && (a || r)), u.slice(w).forEach((y) => f.add(y));
        }
      } else {
        const w = u.length;
        et(v, u, g, s, a), W(v).some((y) => jn.has(y)) && u.slice(w).forEach((y) => h.add(y));
      }
      continue;
    }
    if (!m.ssml) continue;
    if (s.format === "plain" && s.language !== "block-level" && s.language !== "none" && wn(m.ssml)) {
      for (const v of at(m.ssml, o)) {
        const w = { plain: v.plain }, y = M(v.language, s);
        y && (w.language = y), u.push(w), g.push(n);
      }
      continue;
    }
    const S = {};
    l && (S.language = l), s.format === "ssml" ? S.ssml = Zn(m.ssml, s.languageOverrides) : S.plain = N(m.ssml), (s.language === "block-level" || s.language === "none") && S.ssml && (S.ssml = qn(S.ssml)), u.push(S), g.push(n);
  }
  if (p && d.length + h.size > 0)
    return u.forEach((m) => {
      const S = h.has(m) ? "inline" : f.has(m) ? "after" : void 0;
      s.placeholderPieces.set(m, { node: n, placement: S });
    }), Ye(t, i, s, n, u, g, void 0), [];
  for (const [m, S] of Jn(u, s)) {
    const v = u.slice(m, S), w = g.slice(m, S), y = v.length > 1 ? St(v, w, s) : void 0;
    Ye(t, i, s, n, v, w, y);
  }
  return d;
}
function et(n, e, t, i, s) {
  const a = W(n), r = Oe(n);
  if (en(a, i)) return;
  const o = a.some((h) => qt.has(h)), l = o && !s, c = e.length, u = a.filter(
    (h) => h !== "footnote" && h !== "pagebreak" && !ti(h, a, i)
  ), g = a.some((h) => ya.has(h) && i.contextualize.has(h)), d = a.includes("table") && r !== void 0 && !g;
  if (d) {
    const h = Xe(r, n, i);
    ce(h, r, r, n, i), _(e, t, n, [h]);
  }
  for (const h of u) {
    if (h === "figure" && r === void 0) continue;
    const { variantKey: f, params: p } = Jt(h, n, i);
    Gt(e, t, n, i, h, "before", f, p);
  }
  if (a.includes("noteref"))
    for (const h of n.children ?? []) {
      const f = W(h);
      if (!en(f, i))
        if (f.includes("footnote")) {
          const p = i.contextualize.has("footnote"), m = i.i18n.exists("footnote.block.start") || i.i18n.exists("footnote.block.end"), S = f.some((I) => qt.has(I)) && !s && !i.inlineContextualization.has("noteref"), v = p ? Q(i, m ? "footnote.block.start" : "footnote.inline") : void 0, w = p && (v !== void 0 || m), y = [], b = [];
          v !== void 0 && (y.push(D(v, i)), b.push(h));
          const P = [], A = [];
          if (F([h], P, A, i, s || S), S && P.length > 0 && i.blockStarts.add(P[0]), y.push(...P), b.push(...A), w && m) {
            const I = Q(i, "footnote.block.end");
            I !== void 0 && (y.push(D(I, i)), b.push(h));
          }
          const E = w && y.length > 1 ? St(y, b, i) : void 0;
          Ye(e, t, i, h, y, b, E);
        } else
          F([h], e, t, i, s);
    }
  else if (!a.some((h) => Sa.has(h))) {
    const h = Ze(n)?.ssml;
    if (h && hs(h)) {
      const f = za(n, h, e, t, i, s, o);
      if (f.length > 0) {
        const p = s || o && e.length > c;
        F(f, e, t, i, p);
      }
    } else if (a.includes("pagebreak")) {
      if (_(e, t, n, Ua(n, i)), n.children) {
        const f = s || o && e.length > c;
        F(n.children, e, t, i, f);
      }
    } else {
      const p = a.some((m) => Dn.has(m) && yt(m, i)) ? void 0 : st(Ze(n));
      if (p && _(e, t, n, ii(p, i.format, i.language, i)), n.children) {
        const m = s || o && e.length > c;
        F(n.children, e, t, i, m);
      }
    }
  }
  if (l && e.length > c && i.blockStarts.add(e[c]), r !== void 0 && !g && !d) {
    const h = Xe(r, n, i);
    a.includes("figure") && ce(h, r, r, n, i), _(e, t, n, [h]);
  }
  for (const h of u) {
    if (h === "figure" && r === void 0) continue;
    const { variantKey: f, params: p } = Jt(h, n, i);
    Gt(e, t, n, i, h, "after", f, p);
  }
}
function F(n, e, t, i, s) {
  n.forEach((a, r) => et(a, e, t, i, r === 0 ? s : !1));
}
const Na = Sn;
async function si(n, e, t, i) {
  const s = Na(n);
  let a = "";
  const r = [];
  for (const d of s)
    r.push(a.length), d.kind === "text" ? a += d.text : d.kind === "paired" && (a += d.innerText);
  if (!a) return;
  const o = await t(e, a, i);
  if (o.length <= 1) return;
  const l = [];
  let c = "", u = 0;
  function g(d, h, f) {
    let p = h;
    const m = h + d.length;
    for (; p < m; ) {
      const S = o[u], v = Math.min(m, S.end), w = v >= S.end && u < o.length - 1;
      let y = d.slice(p - h, v - h);
      w && (y = y.replace(/[ \t\r\n]+$/, ""));
      const b = T(y);
      c += f ? f(b) : b, p = v, w && (l.push(c), c = "", u++);
    }
  }
  return s.forEach((d, h) => {
    if (d.kind === "selfClosing")
      c += d.raw;
    else if (d.kind === "text")
      g(d.text, r[h]);
    else {
      const f = `<${d.tag}${d.attrs}>`, p = `</${d.tag}>`;
      d.innerText ? g(d.innerText, r[h], (m) => `${f}${m}${p}`) : c += f + p;
    }
  }), c && l.push(c.replace(/[ \t\r\n]+$/, "")), l;
}
function bt(n, e) {
  const t = e.segmenter === Bn ? ha(n) : n;
  return cn(e.segmentationSuppressions, t);
}
async function Ma(n, e) {
  const t = n.language ?? "en", i = bt(t, e), s = e.format === "ssml" ? n.ssml : n.plain;
  if (!s) return;
  const a = await e.segmenter(t, ge(s, e.format), i);
  if (a.length <= 1) return;
  if (e.format !== "ssml") return a.map((o) => ({ text: o.text, start: o.start, end: o.contentEnd }));
  const r = await si(s, t, e.segmenter, i);
  if (r)
    return a.map((o, l) => ({ text: r[l], start: o.start, end: o.contentEnd }));
}
const nn = /* @__PURE__ */ new Set([
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
function sn(n) {
  return n ? W(Array.isArray(n) ? n[1] : n) : [];
}
function an(n, e, t) {
  const i = Array.isArray(n) ? n[e === "leading" ? 0 : 1] : n;
  return (t.ancestorChains.get(i) ?? []).filter((s) => W(s).some((a) => a !== "presentation"));
}
function Ba(n, e) {
  return n.length === e.length && n.every((t, i) => t === e[i]);
}
function rn(n, e, t, i) {
  return i.edgeSubstitutedLocate.get(e)?.[t] ? !0 : !!n && !Array.isArray(n) && de(n);
}
function Z(n, e) {
  return e.placeholderPieces.get(n)?.placement === "inline";
}
function ja(n, e) {
  return e.placeholderPieces.get(n)?.placement === "after";
}
function ai(n, e, t, i) {
  for (const { piece: s, source: a } of n.get(e) ?? [])
    t.push(s), i.push(a);
  n.delete(e);
}
function tt(n, e, t) {
  const i = t.placeholderPieces.get(n)?.node;
  return i !== void 0 && i === t.placeholderPieces.get(e)?.node;
}
function Da(n, e, t, i, s) {
  const a = s.format === "ssml" ? n.ssml : n.plain, r = s.format === "ssml" ? t.ssml : t.plain;
  return !a || !r ? !1 : tt(n, t, s) ? !0 : !(!ft(n.language ?? "en", t.language ?? "en") || s.synthetic.has(n) || s.synthetic.has(t) || !e || !i || sn(e).some((o) => nn.has(o)) || sn(i).some((o) => nn.has(o)) || !Ba(an(e, "trailing", s), an(i, "leading", s)) || rn(e, n, "trailing", s) || rn(i, t, "leading", s));
}
async function on(n, e, t, i, s) {
  const a = t.synthetic.has(n) ? void 0 : await Ma(n, t);
  if (!a) {
    i.push(n), s.push(e);
    return;
  }
  const r = t.blockStarts.has(n);
  r && t.blockStarts.delete(n);
  const o = Array.isArray(e) ? void 0 : e, l = o ? L(o, t.ancestorChains) : void 0, c = o && de(o) ? Ve(o, t) : void 0, u = t.edgeSubstitutedLocate.get(n);
  a.forEach(({ text: g, start: d, end: h }, f) => {
    const p = { ...n, [t.format]: g }, m = (f === 0 ? u?.leading : void 0) ?? (f === a.length - 1 ? u?.trailing : void 0) ?? c;
    if (m && l)
      p.locate = m, p.offsets = [{ start: d, end: h, locate: m }];
    else if (l) {
      const S = t.format === "ssml" ? ge(g, t.format) : g, v = J(l.ref, S);
      p.locate = v, p.offsets = [{ start: d, end: h, locate: v }];
    }
    r && f === 0 && t.blockStarts.add(p), i.push(p), s.push(e);
  });
}
function ue(n, e) {
  let t = 0;
  for (; t < n.length - 1 && n[t + 1].start <= e; ) t++;
  return t;
}
async function Fa(n, e, t, i) {
  const s = n.map((c) => ge(e.format === "ssml" ? c.ssml : c.plain, e.format)), { joined: a, ranges: r } = Ee(s), o = await e.segmenter(t, a, i), l = new Array(n.length - 1).fill(!1);
  for (const c of o) {
    const u = ue(r, c.start), g = c.end > c.start ? ue(r, c.end - 1) : u;
    for (let d = u; d < g; d++) l[d] = !0;
  }
  return l;
}
function _a(n, e, t) {
  const i = [...e];
  return n.forEach((s, a) => {
    if (!Z(s, t)) return;
    const r = a > 0 && tt(n[a - 1], s, t), o = a < n.length - 1 && tt(s, n[a + 1], t);
    r && !i[a - 1] ? i[a - 1] = !0 : o && (i[a] = !0);
  }), i;
}
function $a(n, e, t, i, s) {
  const a = (l) => Z(t[ue(i, l)], s), r = [];
  let o;
  return e.forEach((l, c) => {
    o ??= l;
    const u = e[c + 1];
    u && (a(l.contentEnd - 1) || a(u.start)) || (r.push({ text: n.slice(o.start, l.contentEnd), start: o.start, end: l.end, contentEnd: l.contentEnd }), o = void 0);
  }), r;
}
function qa(n, e, t, i, s, a, r) {
  const o = [];
  for (let l = s; l <= a; l++) {
    if (Z(n[l], r)) {
      o.push(...ni([n[l]], [e[l]], r));
      continue;
    }
    const c = L(e[l], r.ancestorChains);
    if (!c) continue;
    const u = t[l], g = Math.max(u.start, i.start), d = Math.min(u.end, l === a ? i.contentEnd : i.end);
    if (d <= g) continue;
    const h = g - u.start, f = d - u.start, p = ge(r.format === "ssml" ? n[l].ssml : n[l].plain, r.format), m = J(c.ref, p.slice(h, f));
    o.push({ start: h, end: f, locate: m });
  }
  return o;
}
function ri(n, e) {
  const t = Ea(n, e);
  return t !== null ? t ?? "en" : n.find((i) => !Z(i, e))?.language ?? n[0].language ?? "en";
}
function Ga(n, e, t, i, s) {
  const a = ue(t, n.start), r = n.end > n.start ? ue(t, n.end - 1) : a, o = Jn(e.slice(a, r + 1), s);
  return o.map(([l, c], u) => {
    const g = a + l, d = a + c - 1, h = u === o.length - 1, f = u === 0 ? n.start : t[g].start, p = h ? n.contentEnd : t[d].end, m = h ? n.end : t[d + 1].start, S = Wn(e.slice(g, d + 1), s) ?? void 0, v = { text: i.slice(f, p), start: f, end: m, contentEnd: p }, w = o.length > 1 && g === d && Z(e[g], s);
    return { boundary: v, startIdx: g, endIdx: d, language: S, sentenceEnd: h ? n.end : void 0, isolated: w };
  });
}
async function Ha(n, e, t, i, s, a) {
  const r = ri(n, t), o = bt(r, t), l = n.map((v) => ge(t.format === "ssml" ? v.ssml : v.plain, t.format)), { joined: c, ranges: u } = Ee(l), g = $a(c, await t.segmenter(r, c, o), n, u, t), h = (g.length > 0 ? g : [{ text: c, start: 0, end: c.length, contentEnd: c.length }]).flatMap((v) => Ga(v, n, u, c, t));
  let f, p;
  if (t.format === "ssml") {
    const v = /* @__PURE__ */ new Map();
    for (const y of h) for (let b = y.startIdx; b <= y.endIdx; b++) v.set(b, y.language);
    p = Ee(n.map((y, b) => Qn(y, v.get(b), t)), l).joined;
    const w = h.map((y) => y.boundary);
    f = h.length > 1 ? await si(p, r, async () => w, o) : void 0;
  }
  const m = new Set(n.filter((v) => t.blockStarts.has(v))), S = (v, w) => {
    if (v !== void 0)
      for (let y = 0; y < n.length; y++)
        (u[y].end <= v || w === h.length - 1) && ai(a, y, i, s);
  };
  h.forEach(({ boundary: v, startIdx: w, endIdx: y, language: b, sentenceEnd: P, isolated: A }, E) => {
    if (A) {
      i.push(n[w]), s.push(e[w]), S(P, E);
      return;
    }
    const I = t.format === "ssml" ? f ? f[E] : p : v.text, R = { [t.format]: I }, X = t.language === "none" ? M(void 0, t) : b ?? "en";
    X && (R.language = X), n.slice(w, y + 1).filter((te) => m.delete(te)).length > 0 && t.blockStarts.add(R);
    const B = qa(n, e, u, v, w, y, t);
    B.length > 0 && (R.offsets = B);
    const ee = [...Array(y - w + 1).keys()].map((te) => w + te).filter((te) => !Z(n[te], t)), j = ee[0] ?? w, fe = ee[ee.length - 1] ?? y, wt = L(e[j], t.ancestorChains), kt = pt(wt, I), Ct = j !== fe ? mt(wt, L(e[fe], t.ancestorChains), kt) : kt;
    Ct && (R.locate = Ct), i.push(R), s.push(j === fe ? e[j] : [e[j], e[fe]]), S(P, E);
  });
}
async function oi(n, e, t) {
  if (t.segmentation !== "sentence") return { out: n, sources: e };
  const i = [], s = [];
  let a = 0;
  for (; a < n.length; ) {
    let r = a;
    for (; r + 1 < n.length && Da(n[r], e[r], n[r + 1], e[r + 1], t); ) r++;
    if (r === a) {
      await on(n[a], e[a], t, i, s), a = r + 1;
      continue;
    }
    const o = [], l = [], c = /* @__PURE__ */ new Map();
    for (let f = a; f <= r; f++)
      if (!ja(n[f], t))
        o.push(n[f]), l.push(e[f]);
      else if (o.length === 0)
        i.push(n[f]), s.push(e[f]);
      else {
        const p = o.length - 1;
        c.set(p, [...c.get(p) ?? [], { piece: n[f], source: e[f] }]);
      }
    if (o.length === 0) {
      a = r + 1;
      continue;
    }
    const u = ri(o, t), g = await Fa(o, t, u, bt(u, t)), d = _a(o, g, t);
    let h = 0;
    for (let f = 0; f < o.length; f++)
      if (!(f < o.length - 1 && d[f])) {
        if (h === f)
          await on(o[h], l[h], t, i, s), ai(c, h, i, s);
        else {
          const p = /* @__PURE__ */ new Map();
          for (let m = h; m <= f; m++) c.has(m) && p.set(m - h, c.get(m));
          await Ha(o.slice(h, f + 1), l.slice(h, f + 1), t, i, s, p);
        }
        h = f + 1;
      }
    a = r + 1;
  }
  return { out: i, sources: s };
}
function li(n, e) {
  return Object.keys(e.substitutions).length === 0 ? n : n.map((t) => {
    if (t.ssml) {
      const { ssml: o, plain: l, map: c } = rs(t.ssml, e.substitutions);
      if (o === t.ssml) return t;
      const u = { ...t, ssml: o };
      return Ft(u, { plain: l, map: c }), u;
    }
    const i = t.plain;
    if (!i) return t;
    const { text: s, map: a } = ss(i, e.substitutions);
    if (s === i) return t;
    const r = { ...t, plain: s };
    return Ft(r, { plain: i, map: a }), r;
  });
}
async function lr(n, e = {}) {
  const t = [], i = [], s = await $n(n, e);
  F(n, t, i, s, !1);
  const a = await oi(t, i, s);
  return li(Yn(a.out, a.sources, s), s);
}
async function Ka(n, e = {}) {
  const t = [], i = [], s = await $n(n, e);
  F(n, t, i, s, !1);
  const a = await oi(t, i, s), r = a.out.map((l) => s.blockStarts.has(l)), o = Yn(a.out, a.sources, s);
  return { utterances: li(o, s), sources: a.sources, blockStarts: r };
}
class cr {
  engine;
  contentQueue = [];
  // `contentQueue` as loaded, before `voice` stamped it — re-stamped when that changes.
  loadedQueue = [];
  events = new Ae();
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
  preferencesEditorEngineVoice = null;
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
  constructor(e, t = {}) {
    this.engine = e, this._defaults = new js(t.defaults), this._preferences = new le(t.preferences), this._settings = new ze(this._preferences, this._defaults), this.contextualizationOverrides = t.contextualizationOverrides, this.segmentationOverrides = t.segmentationOverrides, this.setupEngineListeners(), this.applyEngineParameters(), this.initializeEngine();
  }
  // Unlike pauseDuration/autoPause (read live off settings), the engine owns rate/pitch/volume and must be pushed.
  applyEngineParameters() {
    this.engine.setRate(this._settings.rate), this.engine.setPitch(this._settings.pitch), this.engine.setVolume(this._settings.volume);
  }
  async initializeEngine() {
    try {
      await this.engine.initialize?.();
    } catch (e) {
      console.warn("Failed to initialize speech engine:", e);
    }
  }
  setupEngineListeners() {
    this.engine.on("start", (e) => {
      this.setNavigatorState("playing");
      const t = this.getCurrentContent();
      t && this.emitUtteranceBoundary(t), this.emitEvent({ type: "start", detail: e.detail });
    }), this.engine.on("end", () => {
      const e = this.engine.getCurrentUtteranceIndex(), t = this.engine.getUtteranceCount();
      if (e < t - 1) {
        const i = this._settings.autoPause === "utterance" || this.contentBlockStarts[e + 1] === !0;
        this._settings.autoPause !== "none" && i ? (this.pendingAutoPauseIndex = e + 1, this.setNavigatorState("paused"), this.emitEvent({ type: "pause" })) : this.pendingAdvanceTimeout = setTimeout(() => {
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
          const i = e ?? 0;
          this.pendingAutoPauseIndex = i, i > 0 ? this.engine.setCurrentUtteranceIndex(i, () => this.setNavigatorState("paused")) : this.setNavigatorState("paused");
          return;
        }
        this.setNavigatorState("ready"), this.emitEvent({ type: "ready" });
      }
    }), this.engine.on("boundary", (e) => {
      const { charIndex: t, charLength: i } = e.detail ?? {}, s = this.loadedQueue[this.getCurrentUtteranceIndex()], a = s && typeof t == "number" && typeof i == "number" ? Hs(s, t, i) : void 0;
      this.emitEvent(a ? { ...e, detail: { ...e.detail, ...a } } : e);
    }), this.engine.on("mark", (e) => {
      this.emitEvent(e);
    }), this.engine.on("voiceschanged", () => {
      this.emitEvent({ type: "voiceschanged" });
    }), this.engine.on("languagefallback", (e) => {
      this.emitEvent(e);
    }), this.engine.on("enginefallback", (e) => {
      this.emitEvent(e);
    }), this.engine.on("enginerecovered", (e) => {
      this.emitEvent(e);
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
  setContentQueue(e, t = null, i = null) {
    this.clearPendingAdvance(), this.pendingAutoPauseIndex = null, (this.navigatorState === "playing" || this.navigatorState === "paused") && this.engine.stop(), this.loadedQueue = Array.isArray(e) ? [...e] : [e];
    const s = this.loadedQueue.map((a) => this.withVoice(this.withLanguage(a)));
    this.contentQueue = s, this.pendingResumeIndex = t, this.pendingResumeState = i, this.setNavigatorState("loading"), this.emitEvent({ type: "loading" }), this.engine.loadUtterances(s, t ?? void 0), this.emitContentChangeEvent({ content: s });
  }
  // The content's language when a loadContent() utterance has none; extraction applies it to loadGndContent()'s.
  withLanguage(e) {
    return this.source !== void 0 || this.contentLanguage === void 0 || e.language ? e : { ...e, language: this.contentLanguage };
  }
  // The utterance's own voice, else `voice`'s for its language.
  withVoice(e) {
    const t = this._settings.voice;
    if (e.voice || !t) return e;
    const i = typeof t == "string" ? t : e.language && nt(t, e.language);
    return i ? { ...e, voice: i } : e;
  }
  // Re-runs extraction from `this.source`, resuming near the old position if playback was underway.
  async reextract() {
    if (!this.source) return;
    const { index: e, state: t } = this.resumeTarget(), i = this.contentSources, { utterances: s, sources: a, blockStarts: r } = await Ka(this.source, {
      format: this._settings.format,
      inlineContextualization: this._settings.inlineContextualization,
      skip: this._settings.skip,
      contextualize: this._settings.contextualize,
      contextualization: {
        contextualizations: this.contextualizationOverrides?.contextualizations,
        shapes: qs(this._settings.verbosity, this.contextualizationOverrides?.shapes),
        params: this.contextualizationOverrides?.params
      },
      language: this._settings.language,
      contentLanguage: this.contentLanguage,
      languageOverrides: this._settings.languageOverrides,
      segmentation: {
        mode: this._settings.segmentation,
        suppressions: this.segmentationOverrides?.suppressions,
        segmenter: this.segmentationOverrides?.segmenter
      }
    });
    this.contentSources = a, this.contentBlockStarts = r;
    const o = t && e !== null ? this.resolveResumeIndex(i, e, a) : null;
    this.setContentQueue(s, o, t);
  }
  // Nearest node at or before oldIndex that's still present in newSources.
  // A reconstructed-sentence span (a `[first, last]` tuple) is a fresh array
  // each extraction, so it never matches by identity — skipped in favor of
  // the next plain single-node entry further back.
  resolveResumeIndex(e, t, i) {
    for (let s = Math.min(t, e.length - 1); s >= 0; s--) {
      const a = e[s];
      if (a === void 0 || Array.isArray(a)) continue;
      const r = i.indexOf(a);
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
    else if (this.navigatorState === "playing")
      return;
  }
  pause() {
    if (this.navigatorState === "playing") {
      if (this.pendingAdvanceTimeout !== null) {
        this.clearPendingAdvance(), this.pendingAutoPauseIndex = this.getCurrentUtteranceIndex() + 1, this.setNavigatorState("paused"), this.emitEvent({ type: "pause" });
        return;
      }
      this.pendingAutoPauseIndex = null, this.setNavigatorState("paused"), this.engine.pause();
    }
  }
  stop() {
    this.clearPendingAdvance(), this.pendingAutoPauseIndex = null, this.setNavigatorState("idle"), this.engine.stop(), this.emitEvent({ type: "stop" });
  }
  clearPendingAdvance() {
    this.pendingAdvanceTimeout !== null && (clearTimeout(this.pendingAdvanceTimeout), this.pendingAdvanceTimeout = null);
  }
  skipToPosition(e, t = !1) {
    const i = this.getCurrentUtteranceIndex();
    return e < 0 || e >= this.contentQueue.length ? !1 : (e === i || (this.clearPendingAdvance(), this.navigatorState === "paused" && !t ? (this.pendingAutoPauseIndex !== null && (this.pendingAutoPauseIndex = e), this.engine.setCurrentUtteranceIndex(e, (s) => {
      if (s) {
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
    const t = this._settings.segmentation, i = Ks(e, t);
    if (!i.length) return;
    const s = t === "sentence" ? "sentence" : "structure";
    this.emitEvent({
      type: "boundary",
      detail: { name: s, charIndex: 0, charLength: (e.plain ?? "").length, locate: i }
    });
  }
  emitContentChangeEvent(e) {
    this.events.emit("contentchange", { type: "contentchange", detail: e });
  }
  // Preferences API (Configurable<SpeechSettings, SpeechPreferences>)
  // With the engine's voice, which content without its own is spoken with; utterances are stamped from the preference alone.
  get settings() {
    return new ze(this._preferences, this._defaults, this.engine.getCurrentVoice());
  }
  // Rebuilt, staged edits kept, once the engine's voice changes, e.g. when it picks its default after being read.
  get preferencesEditor() {
    const e = this.engine.getCurrentVoice(), t = e ? Ln(e) : null;
    return (this._preferencesEditor === null || t !== this.preferencesEditorEngineVoice) && (this._preferencesEditor = new jt(this._preferencesEditor?.preferences ?? this._preferences, this.settings), this.preferencesEditorEngineVoice = t), this._preferencesEditor;
  }
  async submitPreferences(e) {
    !this.source && this.contentQueue.length > 0 && Bt.some((t) => e[t] !== void 0) && console.warn(
      "submitPreferences(): extraction-affecting preferences (format, inlineContextualization, verbosity, skip, contextualize, language, languageOverrides, segmentation) have no effect on content loaded via loadContent() — use loadGndContent() to re-extract on submission."
    ), this._preferences = this._preferences.merging(e), await this.applyPreferences();
  }
  async applyPreferences() {
    const e = this._settings;
    if (this._settings = new ze(this._preferences, this._defaults), this.applyEngineParameters(), this._preferencesEditor !== null && (this._preferencesEditor = new jt(this._preferences, this.settings)), Bt.some((t) => !this.sameSettingValue(e[t], this._settings[t])))
      await this.reextract();
    else if (this.loadedQueue.length > 0 && !this.sameSettingValue(e.voice, this._settings.voice)) {
      const { index: t, state: i } = this.resumeTarget();
      this.setContentQueue(this.loadedQueue, t, i);
    }
  }
  // Arrays (skip/contextualize) compare as sets and records (languageOverrides) by entries, not by reference.
  sameSettingValue(e, t) {
    if (Array.isArray(e) && Array.isArray(t))
      return e.length === t.length && e.every((i) => t.includes(i));
    if (e && t && typeof e == "object" && typeof t == "object") {
      const i = Object.entries(e);
      return i.length === Object.keys(t).length && i.every(([s, a]) => t[s] === a);
    }
    return e === t;
  }
  async destroy() {
    this.clearPendingAdvance(), this.events.clear(), await this.engine.destroy();
  }
}
export {
  ar as BooleanPreference,
  ie as EnumPreference,
  nr as FallbackEngineProvider,
  Ts as FallbackSpeechEngine,
  gr as Locator,
  fr as LocatorLocations,
  pr as LocatorText,
  K as Preference,
  me as RangePreference,
  Ms as ReadiumSpeechDecorationController,
  cr as ReadiumSpeechNavigator,
  sr as ReadiumSpeechProviderRegistry,
  js as SpeechDefaults,
  le as SpeechPreferences,
  jt as SpeechPreferencesEditor,
  Pn as SpeechServerAudioDecodeError,
  Os as SpeechServerEngine,
  tr as SpeechServerEngineProvider,
  oe as SpeechServerError,
  An as SpeechServerNetworkError,
  In as SpeechServerStallError,
  ze as SpeechSettings,
  Te as StringArrayPreference,
  Nt as WebSpeechEngine,
  er as WebSpeechEngineProvider,
  C as WebSpeechVoiceManager,
  ht as autoPauseScopes,
  da as blockLevelRoles,
  re as chineseVariantMap,
  ps as chunkPlainText,
  vs as chunkSsmlText,
  hn as compareAlphabetically,
  un as compareByPreferredRegion,
  $s as contextualizationShapesAtVerbosity,
  _s as contextualizedAtVerbosity,
  H as createJsonOrderMap,
  Ns as createLocator,
  zn as defaultContextualizations,
  k as extractLangRegionFromBCP47,
  lr as extractUtterances,
  ut as extractionFormats,
  Bt as extractionPreferenceKeys,
  it as filterByBoundarySupport,
  xi as filterByLanguages,
  At as filterOutNoveltyVoices,
  Lt as filterOutVeryLowQualityVoices,
  De as getLanguageDisplayName,
  Se as getQualityValue,
  Ln as getVoiceId,
  Pe as groupVoicesByLanguage,
  fa as inlineContextualizationRoles,
  _e as isNoveltyVoice,
  Vs as isRecoverableFailure,
  $e as isVeryLowQualityVoice,
  ct as languageModes,
  Rn as mapServerVoice,
  Ss as mimeTypeForFormat,
  be as pauseDurationRangeConfig,
  gn as pickBestVoiceByRegion,
  ke as pitchRangeConfig,
  we as rateRangeConfig,
  Hs as resolveBoundaryLocate,
  Ks as resolveUtteranceLocate,
  dt as segmentationModes,
  Rs as selectBitrate,
  ks as selectFormat,
  ir as setupDecorations,
  rr as shapeableRoles,
  or as skippableRoles,
  Fs as skippedAtVerbosity,
  Fe as sortAlphabetically,
  Ri as sortByPreferredRegion,
  $ as sortByQuality,
  dn as sortVoicesByRegions,
  ae as toSpeechServerError,
  nt as valueForLanguage,
  lt as verbosityPresets,
  Ce as volumeRangeConfig
};
