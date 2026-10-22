import { DecorationController as Es, DirectCommsChannel as Rs, Decorator as Is } from "@readium/decorator";
export * from "@readium/decorator";
import { LocatorText as Ps, LocatorLocations as As, Locator as Ls } from "@readium/shared";
import { Locator as Br, LocatorLocations as Dr, LocatorText as jr } from "@readium/shared";
import { startsWithBindingPunct as fe, ssmlTextEscape as z, BINDING_PUNCT_CLASS as re, ssmlAttrEscape as Sn } from "@readium/helpers";
import Os from "i18next";
import { substitutedOwnSelector as Vs, isAriaSubstituted as H, decodeTextref as Mt, combineDomRangeTextrefs as Ts } from "@readium/guided-navigation";
import { DomRange as Us, DomRangePoint as Bt } from "@readium/shared/html";
const R = (n) => {
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
}, ut = (n, e) => {
  const t = e.toLowerCase().replace(/_/g, "-"), [s] = R(e), i = Object.entries(n);
  for (const a of [t, s]) {
    const r = i.find(([o]) => o.toLowerCase().replace(/_/g, "-") === a);
    if (r) return r[1];
  }
}, bn = (n, e) => {
  const t = e.toLowerCase().replace(/_/g, "-"), [s] = R(e);
  let i;
  for (const a of [s, t])
    for (const [r, o] of Object.entries(n))
      r.toLowerCase().replace(/_/g, "-") === a && (i ??= /* @__PURE__ */ new Set(), o.forEach((l) => i.add(l)));
  return i && [...i];
}, j = {
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
}, je = /* @__PURE__ */ new Map(), xs = /* @__PURE__ */ Object.assign({ "../../json/ar.json": () => import("./ar-BGKtJRyt.js"), "../../json/bg.json": () => import("./bg-D9Q1JriY.js"), "../../json/bho.json": () => import("./bho-CpuLBMN3.js"), "../../json/bn.json": () => import("./bn-Bpn_lzoe.js"), "../../json/ca.json": () => import("./ca-5hzouNcE.js"), "../../json/cmn.json": () => import("./cmn-DlnYMCd8.js"), "../../json/cs.json": () => import("./cs-CDpMkMNO.js"), "../../json/da.json": () => import("./da-XWCfWAwB.js"), "../../json/de.json": () => import("./de-DU0USiOh.js"), "../../json/el.json": () => import("./el-ClBwbIAW.js"), "../../json/en.json": () => import("./en-l3wcpTw3.js"), "../../json/es.json": () => import("./es-DwOFJY07.js"), "../../json/eu.json": () => import("./eu-DxWirHU-.js"), "../../json/fa.json": () => import("./fa-Ml9KtIw1.js"), "../../json/fi.json": () => import("./fi-Dk-5Fhhl.js"), "../../json/fr.json": () => import("./fr-MfhjukJ4.js"), "../../json/gl.json": () => import("./gl-DwtzWds9.js"), "../../json/he.json": () => import("./he-CfajFNE_.js"), "../../json/hi.json": () => import("./hi-pv2ttBoh.js"), "../../json/hr.json": () => import("./hr-MRApcEKR.js"), "../../json/hu.json": () => import("./hu-DGRDZdHH.js"), "../../json/id.json": () => import("./id-DZUuUiTG.js"), "../../json/it.json": () => import("./it-DJUYnjyj.js"), "../../json/ja.json": () => import("./ja-BpFcZRMu.js"), "../../json/kk.json": () => import("./kk-C480t1iH.js"), "../../json/kn.json": () => import("./kn-BVqs26qv.js"), "../../json/ko.json": () => import("./ko-TNoPZd6N.js"), "../../json/mr.json": () => import("./mr-DstAHTvT.js"), "../../json/ms.json": () => import("./ms-BceBSD-j.js"), "../../json/nb.json": () => import("./nb-CwPbwG-i.js"), "../../json/nl.json": () => import("./nl-BmW-Dmw5.js"), "../../json/pl.json": () => import("./pl-CH8qoDu8.js"), "../../json/pt.json": () => import("./pt-CjCENn24.js"), "../../json/ro.json": () => import("./ro-BlJN7qkA.js"), "../../json/ru.json": () => import("./ru-udzq1D5e.js"), "../../json/sk.json": () => import("./sk-VAEHsTWJ.js"), "../../json/sl.json": () => import("./sl-DaZQ1gp0.js"), "../../json/sv.json": () => import("./sv-CicHwXe4.js"), "../../json/ta.json": () => import("./ta-CvpRY89g.js"), "../../json/te.json": () => import("./te-D5TcdW9V.js"), "../../json/th.json": () => import("./th-CYakoFVa.js"), "../../json/tr.json": () => import("./tr-BfYrcAz7.js"), "../../json/uk.json": () => import("./uk-BVs6lQbX.js"), "../../json/vi.json": () => import("./vi-DP1xN9KL.js"), "../../json/wuu.json": () => import("./wuu-C6uQvT6g.js"), "../../json/yue.json": () => import("./yue-C8kEWdfv.js") });
async function Ns(n) {
  try {
    const e = n.split("-")[0], t = xs[`../../json/${e}.json`];
    if (!t)
      throw new Error(`No voice data found for language: ${n}`);
    const i = (await t()).default;
    return {
      ...i,
      voices: i.voices.map(Bs)
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
function Dt(n) {
  return je.has(n) || je.set(n, Ns(n)), je.get(n);
}
const zs = ["veryLow", "low", "normal", "high", "veryHigh"], Ms = ["android", "apple"], Bs = (n) => ({
  ...n,
  quality: n.quality?.filter((e) => zs.includes(e)),
  localizedName: n.localizedName && Ms.includes(n.localizedName) ? n.localizedName : void 0
}), ce = {
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
}, T = (n) => {
  if (!n) return "";
  let e = n.toLowerCase().replace(/_/g, "-");
  if (/\w{2,3}-\w{2,3}/.test(e)) {
    const [t, s] = e.split("-");
    e = `${t.toLowerCase()}-${s.toUpperCase()}`;
  }
  return ce[e] || e;
}, Ke = async (n) => {
  if (!n) return [];
  try {
    const e = T(n);
    try {
      const s = await Dt(e);
      if (s?.voices?.length)
        return s.voices;
    } catch (s) {
      console.warn(`Failed to load voices for ${e}:`, s);
    }
    const [t] = R(e);
    if (t !== e)
      try {
        const s = await Dt(t);
        if (s?.voices?.length)
          return s.voices;
      } catch (s) {
        console.warn(`Failed to load voices for base language ${t}:`, s);
      }
    return [];
  } catch (e) {
    return console.error(`Error in getVoices for ${n}:`, e), [];
  }
}, We = (n, e) => {
  try {
    return new Intl.DisplayNames(
      e ? [e] : [],
      { type: "language", languageDisplay: "standard" }
    ).of(n) || n.toUpperCase();
  } catch {
    return n.toUpperCase();
  }
}, jt = (n) => {
  if (!n) return "";
  try {
    const e = T(n), t = j[e];
    if (t?.testUtterance)
      return t.testUtterance;
    if (e in ce) {
      const i = ce[e];
      if (i && j[i]?.testUtterance)
        return j[i].testUtterance;
    }
    const [s] = R(e);
    return s !== e && j[s]?.testUtterance ? j[s].testUtterance : "";
  } catch (e) {
    return console.error(`Error in getTestUtterance for ${n}:`, e), "";
  }
}, Te = (n) => {
  if (!n) return "";
  try {
    const e = T(n), t = j[e];
    if (t?.defaultRegion)
      return `${e}-${t.defaultRegion}`;
    if (e in ce) {
      const i = ce[e];
      if (i) {
        const a = j[i];
        if (a?.defaultRegion)
          return `${i}-${a.defaultRegion}`;
      }
    }
    const [s] = R(e);
    if (s !== e) {
      const i = j[s];
      if (i?.defaultRegion)
        return `${s}-${i.defaultRegion}`;
    }
    return "";
  } catch (e) {
    return console.error(`Failed to get default region for ${n}:`, e), "";
  }
}, Ue = (n) => {
  if (!n?.length) return [];
  const e = /* @__PURE__ */ new Set(), t = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map();
  for (const [i, a] of n.entries()) {
    if (!a) continue;
    const r = T(a), [o, l] = R(r);
    l && (e.add(l), s.has(l) || s.set(l, i)), t.has(o) || t.set(o, /* @__PURE__ */ new Set()), l && t.get(o).add(l);
  }
  return Array.from(t.entries()).map(([i, a]) => {
    const r = new Set(
      j[i]?.availableRegions || []
    ), o = Array.from(a), l = Array.from(e).filter(
      (u) => r.has(u) && !o.includes(u)
    ), c = Array.from(/* @__PURE__ */ new Set([...o, ...l])).sort((u, d) => {
      const h = s.get(u) ?? Number.MAX_SAFE_INTEGER, f = s.get(d) ?? Number.MAX_SAFE_INTEGER;
      return h - f;
    });
    if (c.length === 0) {
      const u = Te(i), [, d] = R(u);
      d && c.push(d);
    }
    return {
      baseLang: i,
      regions: c
    };
  });
}, ee = async (n) => {
  const e = /* @__PURE__ */ new Map();
  for (const s of n) {
    if (s.source !== "json") continue;
    const [i] = R(s.language);
    e.has(i) || e.set(i, []), e.get(i).push(s);
  }
  const t = /* @__PURE__ */ new Map();
  for (const [s, i] of e.entries()) {
    const a = /* @__PURE__ */ new Map(), r = await Ke(s), o = /* @__PURE__ */ new Map();
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
}, Ds = {
  veryLow: 1,
  low: 2,
  normal: 3,
  high: 4,
  veryHigh: 5
}, ke = (n) => n ? Ds[n] ?? 0 : 0, Q = (n, e, t, s) => {
  const i = ke(n.quality), a = ke(e.quality);
  if (t && s && n.source === "json" && e.source === "json") {
    const r = t.get(s);
    if (r) {
      const o = r.get(n.name), l = r.get(e.name);
      if (o !== void 0 && l !== void 0)
        return o - l;
    }
  }
  return a !== i ? a - i : n.name.localeCompare(e.name);
}, xe = (n, e) => {
  const t = new Map(e.map((a) => [a.baseLang, a])), s = /* @__PURE__ */ new Map(), i = [];
  for (const a of n) {
    const [r] = R(a.language);
    t.get(r) ? (s.has(r) || s.set(r, []), s.get(r).push(a)) : i.push(a);
  }
  return { voicesByLang: s, otherLangVoices: i };
}, wn = (n, e, t, s) => {
  const [, i] = R(n.language), [, a] = R(e.language), r = i && t.regions.includes(i), o = a && t.regions.includes(a);
  if (r && o) {
    const h = t.regions.indexOf(i), f = t.regions.indexOf(a);
    return h === f ? Q(n, e, s, t.baseLang) : h - f;
  }
  if (r) return -1;
  if (o) return 1;
  const l = Te(t.baseLang), [, c] = R(l), u = !!c && i === c, d = !!c && a === c;
  if (u && !d) return -1;
  if (!u && d) return 1;
  if (i && a) {
    const h = i.localeCompare(a);
    return h !== 0 ? h : Q(n, e, s, t.baseLang);
  }
  return i ? -1 : a ? 1 : Q(n, e, s, t.baseLang);
}, js = async (n, e, t) => {
  const s = t ?? await ee(n);
  n.sort((i, a) => wn(i, a, e, s));
}, kn = (n, e, t) => {
  const [s] = R(n.language), [i] = R(e.language), a = We(s).toLowerCase(), r = We(i).toLowerCase(), o = a.localeCompare(r);
  if (o !== 0)
    return o;
  if (s === i) {
    const l = Te(s), [, c] = R(n.language), [, u] = R(e.language), d = l && c === l.split("-")[1], h = l && u === l.split("-")[1];
    if (d && !h) return -1;
    if (!d && h) return 1;
    if (c && u) {
      const f = c.localeCompare(u);
      if (f !== 0)
        return f;
    }
    return c && !u ? -1 : !c && u ? 1 : Q(n, e, t, s);
  }
  return Q(n, e, t, s);
}, Qe = async (n, e) => {
  const t = e ?? await ee(n);
  n.sort((s, i) => kn(s, i, t));
}, Cn = async (n, e) => {
  if (!e?.length) return [];
  const t = Ue(n || []), { voicesByLang: s, otherLangVoices: i } = xe(e, t), a = await ee(e), r = [];
  for (const o of t) {
    const l = s.get(o.baseLang);
    l && (await js(l, o, a), r.push(...l));
  }
  return await Qe(i, a), r.push(...i), r;
}, En = async (n, e) => {
  if (!e.length) return null;
  const [t] = Ue([n]), { voicesByLang: s, otherLangVoices: i } = xe(e, [t]), a = s.get(t.baseLang), r = a?.length ? a : i, o = await ee(e), l = a?.length ? (c, u) => wn(c, u, t, o) : (c, u) => kn(c, u, o);
  return r.reduce((c, u) => l(u, c) < 0 ? u : c);
}, ht = (n, e) => {
  const t = n.filter((s) => s.controls?.boundary !== !1 === e);
  return t.length > 0 ? t : n;
}, Fs = [{ name: "Albert", nativeID: ["com.apple.speech.synthesis.voice.Albert"], note: "This novelty voice is part of a pack preloaded by Apple.", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Bad News", nativeID: ["com.apple.speech.synthesis.voice.BadNews"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Mauvaises nouvelles", "Malas noticias", "Brutte notizie"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Bahh", nativeID: ["com.apple.speech.synthesis.voice.Bahh"], note: "This novelty voice is part of a pack preloaded by Apple.", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Bells", nativeID: ["com.apple.speech.synthesis.voice.Bells"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Cloches", "Campanas", "Campane"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Boing", nativeID: ["com.apple.speech.synthesis.voice.Boing"], note: "This novelty voice is part of a pack preloaded by Apple.", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Bubbles", nativeID: ["com.apple.speech.synthesis.voice.Bubbles"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Bulles", "Burbujas", "Bollicine"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Cellos", nativeID: ["com.apple.speech.synthesis.voice.Cellos"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Violoncelles", "Violonchelos", "Violoncelli"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Good News", nativeID: ["com.apple.speech.synthesis.voice.GoodNews"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Bonnes nouvelles", "Buenas noticias", "Buone notizie"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Jester", nativeID: ["com.apple.speech.synthesis.voice.Hysterical"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Bouffon", "Bufón", "Giullare"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Organ", nativeID: ["com.apple.speech.synthesis.voice.Organ"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Orgue", "Órgano", "Organo"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Superstar", nativeID: ["com.apple.speech.synthesis.voice.Princess"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Superestrella"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Trinoids", nativeID: ["com.apple.speech.synthesis.voice.Trinoids"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Trinoïdes"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Whisper", nativeID: ["com.apple.speech.synthesis.voice.Whisper"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Murmure", "Susurro", "Sussurro"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Wobble", nativeID: ["com.apple.speech.synthesis.voice.Deranged"], note: "This novelty voice is part of a pack preloaded by Apple.", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Zarvox", nativeID: ["com.apple.speech.synthesis.voice.Zarvox"], note: "This novelty voice is part of a pack preloaded by Apple.", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }], _s = {
  voices: Fs
}, $s = [{ name: "Eddy", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Flo", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Grandma", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Grandpa", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Jacques", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Reed", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Rocko", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Sandy", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Shelley", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Fred", language: "en-US", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Junior", language: "en-US", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Kathy", language: "en-US", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Ralph", language: "en-US", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "eSpeak Arabic", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ar", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Bulgarian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "bg", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Bengali", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "bn", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Catalan", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ca", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Chinese (Mandarin, latin as English)", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "cmn", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Czech", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "cs", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Danish", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "da", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak German", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "de", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Greek", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "el", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Spanish (Spain)", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "es", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Estonian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "et", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Finnish", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "fi", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Gujarati", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "gu", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Croatian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "hr", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Hungarian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "hu", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Indonesian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "id", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Italian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "it", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Kannada", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "kn", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Korean", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ko", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Lithuanian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "lt", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Latvian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "lv", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Malayalm", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ml", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Marathi", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "mr", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Malay", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ms", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Norwegian Bokmål", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "nb", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Polish", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "pl", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Portuguese (Brazil)", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "pt-br", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Romanian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ro", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Russian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ru", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Slovak", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "sk", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Slovenian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "sl", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Serbian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "sv", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Swedish", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "sv", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Swahili", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "sw", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Tamil", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ta", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Telugu", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "te", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Turkish", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "tr", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Vietnamese (Northern)", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "vi", os: ["ChromeOS"], preloaded: !0 }], qs = {
  voices: $s
}, Gs = _s, Hs = qs, Je = (n, e) => Gs.voices.some(
  (t) => n.includes(t.name) || e && t.nativeID?.some((s) => e.includes(s)) || t.altNames?.some((s) => n.includes(s))
), Ze = (n, e) => Hs.voices.some(
  (t) => n.includes(t.name)
) || e === "veryLow", Ft = (n) => n?.length ? n.filter((e) => !(e.isNovelty || Je(e.name, e.voiceURI))) : [], _t = (n) => n?.length ? n.filter((e) => !Ze(e.name, e.quality)) : [], Ks = (n, e) => {
  const t = Array.isArray(e) ? e : [e];
  return n.filter((s) => t.some((i) => {
    const a = i.toLowerCase(), r = s.language?.toLowerCase(), o = s.altLanguage?.toLowerCase();
    if (r === a || o === a)
      return !0;
    const [l] = a.split("-");
    return r && r.startsWith(l) || o && o.startsWith(l);
  }));
}, Ws = { ar: { normal: "محسن", high: "استثنائي" }, ca: { normal: "millorada", high: "prèmium" }, "cmn-CN": { normal: "优化音质", high: "高音质" }, "cmn-TW": { normal: "增強音質", high: "高音質" }, cs: { normal: "vylepšená verze", high: "prémiový" }, da: { normal: "forbedret", high: "høj kvalitet" }, de: { normal: "erweitert", high: "premium" }, el: { normal: "βελτιωμένη", high: "υψηλής ποιότητας" }, en: { normal: "Enhanced", high: "Premium" }, es: { normal: "mejorada", high: "premium" }, fi: { normal: "parannettu", high: "korkealaatuinen" }, fr: { normal: "premium", high: "de qualité" }, he: { normal: "משופר", high: "פרימיום" }, hi: { normal: "बेहतर", high: "प्रीमियम" }, hr: { normal: "poboljšani", high: "vrhunski" }, hu: { normal: "továbbfejlesztett", high: "prémium" }, id: { normal: "Ditingkatkan", high: "Premium" }, it: { normal: "ottimizzata", high: "premium" }, ja: { normal: "拡張", high: "プレミアム" }, ko: { normal: "고품질", high: "프리미엄" }, ms: { normal: "Dipertingkat", high: "Premium" }, nb: { normal: "forbedret", high: "premium" }, nl: { normal: "verbeterd", high: "premium" }, pl: { normal: "rozszerzony", high: "premium" }, pt: { normal: "melhorada", high: "premium" }, ro: { normal: "îmbunătățită", high: "premium" }, ru: { normal: "улучшенный", high: "высшее качество" }, sk: { normal: "vylepšený", high: "prémiový" }, sl: { normal: "izboljšano", high: "prvovrsten" }, sv: { normal: "förbättrad", high: "premium" }, th: { normal: "คุณภาพสูง", high: "คุณภาพสูง" }, tr: { normal: "Geliştirilmiş", high: "Yüksek Kaliteli" }, uk: { normal: "вдосконалений", high: "високої якості" }, vi: { normal: "Nâng cao", high: "Cao cấp" } }, Qs = {
  quality: Ws
}, Xe = {
  apple: Qs.quality
  // android: androidQualities.quality
}, Js = (n, e, t) => {
  if (!n) return;
  const s = Array.isArray(t) ? t : t ? [t] : [];
  for (const i of s)
    if (i && Xe[i]) {
      const a = Xe[i], r = R(e)[0], o = a[e] || a[r];
      if (o) {
        const l = n.toLowerCase(), { normal: c, high: u } = o;
        if (u && l.includes(u.toLowerCase()))
          return "high";
        if (c && l.includes(c.toLowerCase()))
          return "normal";
      }
    }
}, Zs = (n, e) => {
  const t = Xe[e];
  if (t)
    for (const [s, { high: i, normal: a }] of Object.entries(t)) {
      const r = i && n.some((l) => l.includes(i)), o = a && n.some((l) => l.includes(a));
      if (r && o)
        return s;
    }
}, Xs = {
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
}, $t = (n) => {
  if (!n) return;
  const t = n.toLowerCase().split(/[._-]/);
  for (const s of Object.values(Xs))
    if (s.values.some((i) => t.includes(i)))
      return s.quality;
};
function Ys(n, e) {
  if (n.name === n.originalName) return n;
  if (e.name === e.originalName) return e;
  const t = [n.originalName, ...n.altNames || []], s = [e.originalName, ...e.altNames || []], i = t.findIndex((r) => s.includes(r)), a = s.findIndex((r) => t.includes(r));
  return i === -1 && a === -1 || i !== -1 && (a === -1 || i <= a) ? n : e;
}
function ei(n, e) {
  if (!n.altNames && !e.altNames)
    return !1;
  const t = n.originalName, s = e.originalName, i = n.altNames || [], a = e.altNames || [];
  return a.includes(t) || i.includes(s) ? !0 : i.filter((o) => a.includes(o)).length > 0;
}
const Rn = () => {
  const e = typeof window < "u" && (window.navigator || {}).userAgent || "", t = () => /android/i.test(e), s = () => /kaios/i.test(e), i = () => typeof window.InstallTrigger < "u" ? !0 : /firefox/i.test(e), a = () => /AppleWebKit/i.test(e) && !/Chrome|Chromium|Edg\/|OPR|Android/i.test(e);
  return {
    isAndroid: t(),
    isFirefox: i() || s(),
    isSafari: a(),
    isKaiOS: s()
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
    this.systemLocale = navigator.languages?.[0]?.split("-")[0] || "en", this.isAndroid = Rn().isAndroid;
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
      const a = T(i.lang), [r] = P.extractLangRegionFromBCP47(a);
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
        const s = T(t), [i] = P.extractLangRegionFromBCP47(s);
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
    return R(e);
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
    const t = e.map((i) => i.name), s = Zs(t, "apple");
    s && (this.systemLocale = s);
  }
  /**
   * Infer voice quality based on package, platform, JSON, or duplicate count
   * Returns null if quality cannot be determined
   * @private
   */
  inferVoiceQuality(e, t, s) {
    const i = e.voiceURI ? $t(e.voiceURI) : void 0;
    if (i) return i;
    if (t?.nativeID && Array.isArray(t.nativeID))
      for (const a of t.nativeID) {
        const r = $t(a);
        if (r) return r;
      }
    if (t?.localizedName && e.voiceURI && e.lang) {
      const a = Js(
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
      else if (ei(s, a)) {
        const r = Ys(s, a);
        t.set(i, r);
      } else {
        const r = ke(a.quality);
        ke(s.quality) >= r && t.set(i, s);
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
    const t = jt(e);
    if (t) return t;
    const [s] = P.extractLangRegionFromBCP47(e);
    if (s && s !== e) {
      const i = jt(s);
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
      const a = T(i).split("-")[0];
      s.set(a, (s.get(a) ?? 0) + 1);
    }
    return [...s].map(([i, a]) => ({ code: i, label: We(i, t), count: a }));
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
        let d = c.language;
        try {
          const h = e || navigator.language;
          d = new Intl.DisplayNames([h], { type: "region" }).of(u) || c.language;
        } catch (h) {
          console.warn(`Failed to get display name for region ${u}`, h);
        }
        r.push({
          code: u,
          label: d,
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
          const d = s();
          if (Array.isArray(d) && d.length) return a(d);
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
        const a = T(i.lang), [r] = P.extractLangRegionFromBCP47(a), o = this.normalizeVoiceName(i.name), l = `${i.lang.toLowerCase()}_${o}`, c = t.get(l) || 1;
        let u = await Ke(a);
        (!u || u.length === 0) && (u = await Ke(r));
        const d = this.findMatchingJsonVoice(u, o), h = this.inferVoiceQuality(i, d, c), f = this.isAndroid ? { ...d?.controls, boundary: !1 } : d?.controls;
        return d ? {
          ...d,
          label: d.label ?? this.cleanVoiceName(i.name),
          source: "json",
          originalName: i.name,
          ...f && { controls: f },
          language: d.language ?? a,
          voiceURI: i.voiceURI,
          quality: h,
          isDefault: i.default || !1,
          offlineAvailability: i.localService || !1,
          isNovelty: Je(i.name, i.voiceURI),
          isLowQuality: Ze(i.name, h)
        } : {
          source: "browser",
          label: this.cleanVoiceName(i.name),
          name: i.name,
          originalName: i.name,
          ...f && { controls: f },
          language: a,
          voiceURI: i.voiceURI,
          quality: h,
          isDefault: i.default || !1,
          offlineAvailability: i.localService || !1,
          isNovelty: Je(i.name, i.voiceURI),
          isLowQuality: Ze(i.name, h)
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
    if (i.languages && (s = Ks(s, i.languages)), i.source && (s = s.filter((a) => a.source === i.source)), i.gender && (s = s.filter((a) => a.gender === i.gender)), i.quality) {
      const a = Array.isArray(i.quality) ? i.quality : [i.quality];
      s = s.filter((r) => r.quality && a.includes(r.quality));
    }
    return i.offlineOnly && (s = s.filter((a) => a.offlineAvailability === !0)), i.provider && (s = s.filter(
      (a) => a.provider?.toLowerCase() === i.provider?.toLowerCase()
    )), i.excludeNovelty && (s = Ft(s)), i.excludeVeryLowQuality && (s = _t(s)), i.removeDuplicates && (s = this.removeDuplicates(s)), s;
  }
  /**
   * Filter out novelty voices
   * @param voices Array of voices to filter
   * @returns Filtered array with novelty voices removed
   */
  filterOutNoveltyVoices(e) {
    const t = e ?? this.voices;
    return Ft(t);
  }
  /**
   * Filter out very low quality voices
   * @param voices Array of voices to filter
   * @returns Filtered array with very low quality voices removed
   */
  filterOutVeryLowQualityVoices(e) {
    const t = e ?? this.voices;
    return _t(t);
  }
  /**
   * Sort voices by quality, respecting JSON name order, then alphabetically for undefined/null quality
   * @param voices Array of voices to sort
   * @returns Sorted array of voices
   */
  async sortVoicesByQuality(e) {
    const t = e || this.voices;
    if (!t?.length) return [];
    const s = await ee(t);
    return [...t].sort((i, a) => Q(i, a, s));
  }
  /**
   * Sort regions by default then alphabetically, sort voices by quality
   */
  static async sortByDefaultRegion(e, t) {
    const s = await ee(e), i = Te(t);
    e.sort((a, r) => {
      const [, o] = P.extractLangRegionFromBCP47(a.language), [, l] = P.extractLangRegionFromBCP47(r.language), c = i && o === i.split("-")[1], u = i && l === i.split("-")[1];
      return c && !u ? -1 : !c && u ? 1 : Q(a, r, s, t);
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
      return await Qe(l), l;
    }
    const i = Ue(e), { voicesByLang: a, otherLangVoices: r } = xe(s, i), o = [];
    for (const l of i) {
      const c = a.get(l.baseLang);
      c && (await P.sortByDefaultRegion(c, l.baseLang), o.push(...c));
    }
    return await Qe(r), o.push(...r), o;
  }
  /**
   * Sort voices by region preference, then alphabetically
   * @param voices Array of voices to sort
   * @param preferredLanguages Array of preferred language codes in order of preference
   * @returns Sorted array of voices
   */
  async sortVoicesByRegions(e, t) {
    return Cn(e, t || this.voices);
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
const In = (n, e) => {
  const [t, s] = R(e), [i, a] = R(n.language);
  return i === t && (!s || a === s);
}, Ye = (n, e) => !!n && R(n.language)[0] === R(e)[0], ti = ["webKit", "moz", "ms", "o"], ni = [
  "boundary",
  "end",
  "error",
  "mark",
  "pause",
  "resume",
  "start"
], si = (n) => `${n.charAt(0).toUpperCase()}${n.slice(1)}`, ie = (n = {}, e) => Object.hasOwnProperty.call(n, e) || e in n || !!n[e], ii = (n) => typeof window < "u" && n in window, ai = (n) => {
  const e = si(n), t = ti.map((i) => `${i}${e}`), s = [n, e].concat(t).find(ii);
  return s && typeof window < "u" ? window[s] : void 0;
}, ri = () => {
  const n = {};
  [
    "speechSynthesis",
    "speechSynthesisUtterance",
    "speechSynthesisVoice",
    "speechSynthesisEvent",
    "speechSynthesisErrorEvent"
  ].forEach((t) => {
    n[t] = ai(t);
  }), n.onvoiceschanged = ie(n.speechSynthesis, "onvoiceschanged"), n.speechSynthesisSpeaking = ie(n.speechSynthesis, "speaking"), n.speechSynthesisPaused = ie(n.speechSynthesis, "paused");
  const e = n.speechSynthesisUtterance ? ie(n.speechSynthesisUtterance, "prototype") : !1;
  return ni.forEach((t) => {
    const s = `on${t}`;
    n[s] = e && n.speechSynthesisUtterance ? ie(n.speechSynthesisUtterance.prototype, s) : !1;
  }), n;
};
class Ne {
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
const we = (n, e) => Math.min(Math.max(n, 0), Math.max(e - 1, 0));
function J(n, e, t, s) {
  return Number.isFinite(n) ? Math.max(e, Math.min(t, n)) : s;
}
const Ce = "\\p{Ps}\\p{Pi}¿¡", oi = new RegExp(`^[${Ce}]`, "u"), li = new RegExp(`[${Ce}]$`, "u"), ci = new RegExp("^\\p{P}$", "u");
function ui(n) {
  return oi.test(n);
}
function hi(n) {
  return li.test(n);
}
function di(n) {
  return ci.test(n);
}
function Pn(n) {
  return n.replace(/[<>]/g, "​");
}
function gi(n) {
  return n.replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&nbsp;/g, " ").replace(/&#(\d+);/g, (e, t) => String.fromCodePoint(Number(t))).replace(/&#x([0-9a-fA-F]+);/g, (e, t) => String.fromCodePoint(parseInt(t, 16)));
}
const fi = /\s*<readium:[a-zA-Z][\w-]*\s+id="[^"]*"\s*\/>\s*/g;
function pi(n) {
  return n.replace(fi, (t, s, i) => {
    const a = i.slice(s + t.length);
    return a.length === 0 || fe(a) ? "" : " ";
  }).replace(/ {2,}/g, " ").trim();
}
function mi(n) {
  return n.includes("<");
}
function ze(n) {
  if (n === void 0) return;
  const e = {};
  if (n.language !== void 0 && (e.language = n.language), n.ssml) {
    const t = pi(n.ssml);
    mi(t) && (e.ssml = t);
  }
  return n.plain && (e.plain = n.plain), e.plain || e.ssml ? e : void 0;
}
function U(n) {
  return An(n).plain;
}
function An(n) {
  let e = "";
  const t = [];
  let s = !1, i = 0;
  for (; i < n.length; ) {
    const o = n[i];
    if (o === "<") {
      const c = n.indexOf(">", i), u = c === -1 ? "" : n.slice(c + 1);
      i = c === -1 ? n.length : c + 1, !s && e.length > 0 && u.length > 0 && !fe(u) && (e += " ", t.push(i), s = !0);
      continue;
    }
    const l = n.startsWith("&lt;", i) ? "<" : n.startsWith("&gt;", i) ? ">" : n.startsWith("&amp;", i) ? "&" : void 0;
    if (l) {
      e += l, t.push(i), i += l === "&" ? 5 : 4, s = !1;
      continue;
    }
    if (o === " ") {
      s || (e += o, t.push(i), s = !0), i++;
      continue;
    }
    e += o, t.push(i), s = !1, i++;
  }
  let a = 0;
  for (; a < e.length && /\s/.test(e[a]); ) a++;
  let r = e.length;
  for (; r > a && /\s/.test(e[r - 1]); ) r--;
  return { plain: e.slice(a, r), map: t.slice(a, r) };
}
function qt(n, e) {
  let t = 0, s = n.length;
  for (; t < s; ) {
    const i = t + s >> 1;
    n[i] < e ? t = i + 1 : s = i;
  }
  return t;
}
const Gt = /* @__PURE__ */ new WeakMap();
function vi(n) {
  return n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function yi(n) {
  const e = vi(n), t = /\w/.test(n[0]) ? "(?<!\\w)" : "", s = /\w/.test(n[n.length - 1]) ? "(?!\\w)" : "";
  return `${t}${e}${s}`;
}
function Si(n, e) {
  if (typeof e == "string")
    return { regex: new RegExp(yi(n), "g"), replace: e };
  const t = e.pattern.flags.includes("g") ? e.pattern.flags : `${e.pattern.flags}g`;
  return { regex: new RegExp(e.pattern.source, t), replace: e.replace };
}
function bi(n) {
  let e = Gt.get(n);
  return e || (e = Object.entries(n).map(([t, s]) => Si(t, s)), Gt.set(n, e)), e;
}
function Ln(n, e) {
  const t = [];
  for (const a of bi(e))
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
function wi(n, e) {
  let t = "";
  const s = [];
  let i = 0;
  for (const a of Ln(n, e)) {
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
function Ht(n, e) {
  return n.length ? e <= 0 ? n[0] : e >= n.length ? n[n.length - 1] + 1 : n[e] : e;
}
const ki = /<([a-zA-Z][\w-]*)([^>]*)>([\s\S]*?)<\/\1>|<[a-zA-Z][\w-]*\b[^>]*\/>|[^<]+/g;
function Ee(n) {
  return n.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
}
function On(n) {
  const e = [];
  for (const t of n.matchAll(ki))
    t[1] !== void 0 ? e.push({ kind: "paired", raw: t[0], tag: t[1], attrs: t[2], innerText: Ee(t[3]) }) : t[0][0] === "<" ? e.push({ kind: "selfClosing", raw: t[0] }) : e.push({ kind: "text", raw: t[0], text: Ee(t[0]) });
  return e;
}
function Ci(n, e) {
  const t = On(n);
  let s = "", i = !1;
  const a = [], r = t.map(() => []);
  t.forEach((b, k) => {
    if (b.kind === "selfClosing") return;
    const w = b.kind === "paired" ? b.innerText : b.text;
    if (!i && s.length > 0 && w.length > 0 && !fe(w) && !/^\s/.test(w)) {
      const I = s.length;
      s += " ", r[k].push(a.length), a.push({ start: I, end: I + 1, atomIndex: -1 }), i = !0;
    }
    const E = s.length;
    s += w, r[k].push(a.length), a.push({ start: E, end: s.length, atomIndex: k }), w.length > 0 && (i = /\s$/.test(w));
  });
  const o = Ln(s, e);
  let l = "", c = "";
  const u = [];
  let d = -2, h = "", f = 0;
  const p = () => {
    if (d >= 0) {
      const b = t[d];
      l += b.kind === "paired" ? `<${b.tag}${b.attrs}>${h}</${b.tag}>` : h;
    }
    h = "", d = -2;
  };
  for (let b = 0; b < t.length; b++) {
    const k = t[b];
    if (k.kind === "selfClosing") {
      p(), l += k.raw;
      continue;
    }
    for (const w of r[b]) {
      const E = a[w];
      let I = E.start;
      for (; I < E.end; ) {
        const A = f < o.length ? o[f] : void 0;
        if (A && A.start <= I && A.end > I) {
          const x = A.start === I, ne = A.end > E.end;
          if (x) {
            c += A.replacement;
            for (let D = 0; D < A.replacement.length; D++) u.push(A.start);
            E.atomIndex === -1 || ne ? (p(), l += z(A.replacement)) : (d !== E.atomIndex && (p(), d = E.atomIndex), h += z(A.replacement));
          }
          I = Math.min(A.end, E.end), A.end <= E.end && f++;
          continue;
        }
        const L = A ? Math.min(A.start, E.end) : E.end, K = s.slice(I, L);
        c += K;
        for (let x = 0; x < K.length; x++) u.push(I + x);
        E.atomIndex === -1 ? (p(), l += z(K)) : (d !== E.atomIndex && (p(), d = E.atomIndex), h += z(K)), I = L;
      }
    }
  }
  p();
  let g = 0;
  for (; g < s.length && /\s/.test(s[g]); ) g++;
  let v = s.length;
  for (; v > g && /\s/.test(s[v - 1]); ) v--;
  let S = 0;
  for (; S < c.length && /\s/.test(c[S]); ) S++;
  let m = c.length;
  for (; m > S && /\s/.test(c[m - 1]); ) m--;
  const C = s.slice(g, v), y = u.slice(S, m).map((b) => Math.min(Math.max(b - g, 0), Math.max(C.length - 1, 0)));
  return { ssml: l, plain: C, map: y };
}
const Vn = /<lang xml:lang="([^"]*)">([\s\S]*?)<\/lang>/g;
function Tn(n) {
  return new RegExp(Vn).test(n);
}
function Kt(n) {
  return n.replace(/<[^>]+>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/ {2,}/g, " ");
}
const Ei = new RegExp(
  `\\s+|[${Ce}]+|[${re}]+|[^\\s${Ce}${re}]+`,
  "gu"
);
function Fe(n) {
  const e = [];
  for (const [t] of n.matchAll(Ei))
    /^\s/.test(t) ? e.push({ kind: "space" }) : ui(t) ? e.push({ kind: "open", text: t }) : fe(t) ? e.push({ kind: "close", text: t }) : e.push({ kind: "word", text: t });
  return e;
}
function Ri(n) {
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
function Ii(n) {
  let e = n.length;
  for (; e > 0 && (n[e - 1].kind === "space" || n[e - 1].kind === "open"); ) e--;
  return n.slice(e).some((t) => t.kind === "open") ? n.splice(e) : [];
}
function Pi(n) {
  let e = 0;
  for (; e < n.length && (n[e].kind === "space" || n[e].kind === "close"); ) e++;
  return n.slice(0, e).some((t) => t.kind === "close") ? n.splice(0, e) : [];
}
function dt(n, e) {
  const t = [];
  let s = 0;
  for (const r of n.matchAll(Vn))
    t.push({
      tokens: Fe(Kt(n.slice(s, r.index))),
      language: e,
      tagged: !1
    }), t.push({ tokens: Fe(U(r[2])), language: r[1], tagged: !0 }), s = r.index + r[0].length;
  t.push({
    tokens: Fe(Kt(n.slice(s))),
    language: e,
    tagged: !1
  });
  for (let r = 0; r < t.length - 1; r++)
    !t[r].tagged && t[r + 1].tagged ? t[r + 1].tokens.unshift(...Ii(t[r].tokens)) : t[r].tagged && !t[r + 1].tagged && t[r].tokens.push(...Pi(t[r + 1].tokens));
  const i = [];
  let a = 0;
  for (const r of t) {
    const o = Ri(r.tokens);
    o && (i.push({ plain: o, language: r.language, start: a, end: a + o.length }), a += o.length);
  }
  return i;
}
const Ai = /<readium:[a-zA-Z][\w-]*\s+id="([^"]*)"\s*\/>/g, Li = /(<lang\b[^>]*>)<sub\s+alias="([^"]*)"\s*>([\s\S]*?)<\/sub><\/lang>|<sub\s+alias="([^"]*)"\s*>([\s\S]*?)<\/sub>/, Un = new RegExp(`${Ai.source}|${Li.source}`, "g"), Oi = /[\p{L}\p{N}\p{Pd}]+$/u, Vi = /^[\p{L}\p{N}\p{Pd}]+/u;
function Ti(n) {
  return Ee(n.replace(/&quot;/g, '"').replace(/&apos;/g, "'"));
}
function Ui(n) {
  return new RegExp(Un).test(n);
}
function xi(n) {
  const e = [];
  let t = 0;
  for (const i of n.matchAll(Un)) {
    const a = i[1] === void 0, r = i.index + i[0].length, o = a ? n.slice(t, i.index).match(Oi)?.[0] ?? "" : "", l = a ? n.slice(r).match(Vi)?.[0] ?? "" : "", c = n.slice(t, i.index - o.length).trim();
    if (c && e.push({ ssml: c }), !a)
      e.push({ placeholderId: i[1] });
    else {
      const u = i[2], d = i[3] ?? i[5], h = i[4] ?? i[6], f = (v) => u ? `${u}${v}</lang>` : v, p = (v) => f(`${o}${v}${l}`);
      e.push({ ssml: p(h), abbreviation: "text" });
      const g = z(Ti(d));
      e.push({
        ssml: p(g),
        abbreviation: "alias",
        abbreviationText: p(h),
        parenthesizedSsml: f(`(${g})`)
      });
    }
    t = r + l.length;
  }
  const s = n.slice(t).trim();
  return s && e.push({ ssml: s }), e;
}
const Ni = 250;
class Wt {
  speechSynthesis;
  speechSynthesisUtterance;
  currentVoice = null;
  // The voice of the utterance being spoken, reported in its "start" event.
  speakingVoice = null;
  currentUtterances = [];
  currentUtteranceIndex = 0;
  playbackState = "idle";
  events = new Ne();
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
    if (this.features = ri(), this.patches = Rn(), !this.features.speechSynthesis || !this.features.speechSynthesisUtterance)
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
    const { languages: t, maxTimeout: s, interval: i, maxLengthExceeded: a = "warn" } = e;
    if (this.initialized)
      return !1;
    this.maxLengthExceeded = a;
    try {
      this.voiceManager = await P.initialize({
        languages: t,
        maxTimeout: s,
        interval: i
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
    return t.find((s) => s.voiceURI === e.voice) ?? t.find((s) => s.name === e.voice);
  }
  // The language of the utterance's voice when the browser has it but the manager hasn't loaded that language.
  unloadedOwnVoiceLanguage(e) {
    if (!e.voice || this.ownVoice(e)) return;
    const t = this.speechSynthesis.getVoices(), s = (t.find((i) => i.voiceURI === e.voice) ?? t.find((i) => i.name === e.voice))?.lang;
    return s && !this.loadedOwnVoiceLanguages.has(s) ? s : void 0;
  }
  // Returns `undefined` (not a fallback voice) when content.language hasn't
  // been warmed into languageVoiceCache yet, or its own voice's language loaded — callers must await for it.
  voiceForUtteranceSync(e) {
    const t = this.ownVoice(e);
    if (t)
      return t;
    if (this.unloadedOwnVoiceLanguage(e))
      return;
    const s = this.getCurrentVoiceForUtterance(this.currentVoice);
    if (!e.language)
      return s;
    const i = T(e.language);
    if (Ye(s, i))
      return s;
    const a = s?.controls?.boundary !== !1, r = this.languageCacheKey(i, a);
    if (this.languageVoiceCache.has(r))
      return this.languageVoiceCache.get(r) ?? s;
  }
  // Awaits warming for a not-yet-seen content language rather than falling back
  // to the wrong-language voice.
  async voiceForUtterance(e) {
    const t = this.voiceForUtteranceSync(e);
    if (t !== void 0)
      return t;
    const s = this.unloadedOwnVoiceLanguage(e);
    if (s) {
      await P.initialize({ languages: [s] }), this.loadedOwnVoiceLanguages.add(s);
      const i = this.voiceForUtteranceSync(e);
      if (i !== void 0) return i;
    }
    return await this.warmLanguageVoiceCache([e]), this.voiceForUtteranceSync(e) ?? this.getCurrentVoiceForUtterance(this.currentVoice);
  }
  // Dedupes in-flight warms per (language, boundary requirement) so an awaited call and a
  // fire-and-forget one for the same slot don't redo the work.
  async warmLanguageVoiceCache(e) {
    if (!this.voiceManager)
      return;
    const t = this.getCurrentVoiceForUtterance(this.currentVoice), s = t?.controls?.boundary !== !1, i = new Set(
      e.filter((l) => !this.ownVoice(l)).map((l) => l.language).filter((l) => !!l).map((l) => T(l)).filter((l) => !Ye(t, l)).filter((l) => !this.languageVoiceCache.has(this.languageCacheKey(l, s)))
    ), a = [...i].filter((l) => this.warmingLanguages.has(this.languageCacheKey(l, s))), o = [...i].filter((l) => !this.warmingLanguages.has(this.languageCacheKey(l, s))).map((l) => {
      const c = this.languageCacheKey(l, s), u = (async () => {
        await P.initialize({ languages: [l] });
        const d = this.voices.filter((g) => In(g, l)), h = ht(d, s), p = (await this.voiceManager.sortVoicesByQuality(h))[0] ?? null;
        this.languageVoiceCache.set(c, p), p || this.emitEvent({ type: "languagefallback", detail: { language: l, reason: "no-matching-voice" } });
      })();
      return this.warmingLanguages.set(c, u.finally(() => this.warmingLanguages.delete(c))), this.warmingLanguages.get(c);
    });
    await Promise.all([
      ...o,
      ...a.map((l) => this.warmingLanguages.get(this.languageCacheKey(l, s)))
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
      plain: t.plain ?? (t.ssml ? U(gi(t.ssml)) : "")
    }));
  }
  // Queue Management
  loadUtterances(e, t) {
    this.currentUtterances = this.toPlainText(e), this.currentUtteranceIndex = we(t ?? 0, e.length), this.warmLanguageVoiceCache(this.currentUtterances), this.playbackState = "ready", this.emitEvent({ type: "ready" });
  }
  // Voice Configuration
  async setVoice(e) {
    const t = this.currentVoice;
    if (typeof e == "string") {
      const s = this.voices.find((i) => i.name === e || i.language === e);
      s ? this.currentVoice = s : console.warn(`Voice "${e}" not found`);
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
    this.isSpeakingInternal = !0, this.isPausedInternal = !1, this.setState("playing"), this.stopResumeInfinity(), this.currentUtteranceIndex >= this.currentUtterances.length && (this.currentUtteranceIndex = 0);
    const s = this.lastCancelAt + Ni - Date.now();
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
    const a = this.createUtterance(Pn(i)), r = await this.voiceForUtterance(s);
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
    const t = J(e, 0.1, 10, this.rate);
    t !== this.rate && (this.rate = t, this.scheduleRestartIfSpeaking());
  }
  getRate() {
    return this.rate;
  }
  setPitch(e) {
    const t = J(e, 0, 2, this.pitch);
    t !== this.pitch && (this.pitch = t, this.scheduleRestartIfSpeaking());
  }
  getPitch() {
    return this.pitch;
  }
  setVolume(e) {
    const t = J(e, 0, 1, this.volume);
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
class Rr {
  id = "webspeech";
  name = "Web Speech API";
  voiceEngine = null;
  // No cache to bypass here — local API, no network cost to re-checking.
  async getVoices() {
    return this.voiceEngine || (this.voiceEngine = new Wt(), await this.voiceEngine.initialize()), this.voiceEngine.getAvailableVoices();
  }
  async createEngine(e) {
    const t = new Wt();
    return await t.initialize(), e && await t.setVoice(e), t;
  }
  async destroy() {
    this.voiceEngine && (await this.voiceEngine.destroy(), this.voiceEngine = null);
  }
}
function xn(n, e) {
  const t = [];
  let s = -1, i = -1;
  const a = () => {
    s !== -1 && (t.push({ text: zi(n, s, i), offset: n[s].offset }), s = -1, i = -1);
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
function zi(n, e, t) {
  const s = n[e], i = n[t];
  return s === i ? s.text : n.slice(e, t + 1).map((a) => a.text).join("");
}
const Nn = new RegExp(
  `[^${re}]*[${re}]+\\s*|[^${re}]+$`,
  "gu"
), Mi = /\S+\s*|\s+/g;
function gt(n, e, t) {
  const s = [];
  for (const i of n.matchAll(t))
    i[0].length !== 0 && s.push({ text: i[0], offset: e + i.index, atomic: !1 });
  return s;
}
function ft(n, e) {
  if (n.text.length <= e || n.atomic)
    return [n];
  const t = gt(n.text, n.offset, Mi);
  if (t.length > 1)
    return t.flatMap((r) => ft(r, e));
  const s = [];
  let i = n.offset, a = "";
  for (const r of n.text)
    a.length > 0 && a.length + r.length > e && (s.push({ text: a, offset: i, atomic: !1 }), i += a.length, a = ""), a += r;
  return a.length > 0 && s.push({ text: a, offset: i, atomic: !1 }), s;
}
function Bi(n, e) {
  if (n.length <= e)
    return [{ text: n, offset: 0 }];
  const s = gt(n, 0, Nn).flatMap((i) => ft(i, e));
  return xn(s, e);
}
const Di = /<([a-zA-Z][\w-]*)\b[^>]*>[\s\S]*?<\/\1>|<[a-zA-Z][\w-]*\b[^>]*\/>|[^<]+/g;
function ji(n, e) {
  if (n.length <= e)
    return [{ text: n, offset: 0 }];
  const t = [];
  for (const i of n.matchAll(Di))
    i[0][0] === "<" ? t.push({ text: i[0], offset: i.index, atomic: !0 }) : t.push(...gt(i[0], i.index, Nn));
  const s = t.flatMap((i) => ft(i, e));
  return xn(s, e);
}
const Fi = {
  wav: "audio/wav",
  mp3: "audio/mpeg",
  opus: "audio/ogg",
  ogg: "audio/ogg",
  aac: "audio/aac",
  flac: "audio/flac",
  webm: "audio/webm",
  m4a: "audio/mp4"
};
function _i(n) {
  return Fi[n] ?? `audio/${n}`;
}
const $i = ["flac", "wav", "opus", "aac", "ogg", "webm", "mp3"], qi = ["opus", "aac", "webm", "ogg", "mp3", "wav", "flac"];
function Gi(n, e, t) {
  const s = (o) => t(_i(o)) !== "", i = n.formats.filter(s);
  if (e.preferredFormat && i.includes(e.preferredFormat))
    return e.preferredFormat;
  const a = e.strategy === "bandwidth" ? qi : $i, r = [...a, ...i.filter((o) => !a.includes(o))];
  for (const o of r)
    if (i.includes(o))
      return o;
  return n.default;
}
const Hi = /* @__PURE__ */ new Set(["wav", "flac"]), Ki = {
  mp3: 48e3,
  opus: 24e3,
  aac: 48e3,
  ogg: 48e3,
  webm: 32e3
};
function Wi(n, e, t) {
  return Hi.has(n) || !e || !t ? void 0 : t.saveData === !0 || /2g/.test(t.effectiveType ?? "") ? Ki[n] : void 0;
}
function zn(n, e) {
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
class ue extends Error {
  status;
  type;
  title;
  instance;
  constructor(e, t) {
    super(e), this.name = "SpeechServerError", this.status = t.status, this.type = t.type, this.title = t.title, this.instance = t.instance;
  }
}
class Mn extends ue {
  constructor(e) {
    super(e, { status: 408, type: "https://readium.org/speech-server/error#stall", title: "Synthesis Stalled" }), this.name = "SpeechServerStallError";
  }
}
class Bn extends Error {
  constructor(e) {
    super(e), this.name = "SpeechServerAudioDecodeError";
  }
}
class Dn extends Error {
  constructor(e) {
    super(e), this.name = "SpeechServerNetworkError";
  }
}
async function oe(n) {
  if ((n.headers.get("content-type") ?? "").includes("application/problem+json"))
    try {
      const t = await n.json();
      return new ue(t.detail || t.title || `Request failed with status ${n.status}`, {
        status: t.status ?? n.status,
        type: t.type,
        title: t.title,
        instance: t.instance
      });
    } catch {
    }
  return new ue(`Request failed with status ${n.status}`, { status: n.status });
}
const Qi = 3, Ji = 400;
function Zi(n) {
  const e = atob(n), t = new Uint8Array(e.length);
  for (let s = 0; s < e.length; s++)
    t[s] = e.charCodeAt(s);
  return t.buffer;
}
function Xi(n) {
  return J(n, 0.25, 4, 1);
}
function ve(n) {
  return n?.plain ?? n?.ssml ?? void 0;
}
function Qt(n) {
  return n instanceof Mn ? { message: n.message, status: n.status, type: n.type, title: n.title, instance: n.instance, recoverable: !0 } : n instanceof ue ? { message: n.message, status: n.status, type: n.type, title: n.title, instance: n.instance, recoverable: !1 } : n instanceof Bn ? { message: n.message, recoverable: !1 } : n instanceof Dn ? { message: n.message, recoverable: !0 } : n instanceof Error ? { message: n.message, recoverable: !1 } : { message: String(n), recoverable: !1 };
}
class Yi {
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
  events = new Ne();
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
    this.endpoints = e.endpoints, this.fetchImpl = e.fetch ?? fetch.bind(globalThis), this.prefetchWindow = e.prefetchWindow ?? Qi, this.readyBufferChars = e.readyBufferChars ?? Ji, this.overLengthText = e.overLengthText ?? "split", this.timeoutMs = e.timeoutMs, this.formatOptions = e.format ?? {}, this.canPlayType = typeof Audio < "u" ? (t) => new Audio().canPlayType(t) : () => "";
  }
  // Lets a provider that already fetched /voices seed this engine without a second request.
  setAvailableVoices(e) {
    this.voices = e, this.voicesRequest = null, this.languageVoiceCache.clear();
  }
  // Fetches the voices, and picks the default one by the browser's languages, as WebSpeechEngine does
  async initialize() {
    this.initializing = (async () => {
      const e = await this.getAvailableVoices(), t = typeof navigator < "u" && navigator.languages?.length ? [...navigator.languages] : ["en"];
      return this.defaultVoice = (await Cn(t, e))[0] ?? null, !0;
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
      throw s instanceof TypeError ? new Dn(s.message) : s;
    }
  }
  loadUtterances(e, t) {
    this.abortLiveControllers(), this.clearPrefetchCache(), this.currentUtterances = e, this.currentUtteranceIndex = we(t ?? 0, e.length), this.setState("loading"), this.bufferUntilReady(++this.loadGeneration);
  }
  // Buffers enough utterances ahead of currentUtteranceIndex to cover readyBufferChars before
  // declaring "ready", so playback doesn't catch up to an empty prefetch cache right away —
  // starting from wherever playback will actually resume, not always utterance 0.
  async bufferUntilReady(e) {
    const t = we(this.currentUtteranceIndex, this.currentUtterances.length), s = Math.min(this.indexCoveringChars(this.readyBufferChars, t), t + this.prefetchWindow), i = [];
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
    const s = we(t, this.currentUtterances.length);
    let i = 0;
    for (let a = s; a < this.currentUtterances.length; a++)
      if (i += (ve(this.currentUtterances[a]) ?? "").length, i >= e)
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
    const s = this.currentVoice ?? this.defaultVoice;
    if (!e?.language || this.voices.length === 0 || Ye(s, e.language))
      return s;
    const i = T(e.language), a = s?.controls?.boundary !== !1, r = `${i}:${a}`;
    let o = this.languageVoiceCache.get(r);
    return o || (o = this.pickLanguageVoice(i, a), this.languageVoiceCache.set(r, o)), await o ?? s;
  }
  async pickLanguageVoice(e, t) {
    const s = this.voices.filter((a) => In(a, e)), i = s.length > 0 ? await En(e, ht(s, t)) : null;
    return i || this.emitEvent({ type: "languagefallback", detail: { language: e, reason: "no-matching-voice" } }), i;
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
      throw await oe(e);
    const s = await e.json(), i = new Map(t.providers.map((a) => [a.id, a.controls]));
    return this.voices = s.map((a) => zn(a, i.get(a.provider))), this.voices;
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
      throw await oe(e);
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
        detail: Qt(s)
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
    const s = this.currentUtterances[e], i = !s.plain && !!s.ssml, a = s.language, r = ve(s) ?? "", o = i ? An(r).map : void 0, l = ve(this.currentUtterances[e - 1]), c = ve(this.currentUtterances[e + 1]), u = await this.getServiceInfo(), d = Gi(u.output, this.formatOptions, this.canPlayType), h = navigator.connection, f = Wi(d, this.formatOptions.adaptBitrateToNetwork ?? !1, h);
    if (r.length <= u.limits.maxTextLength) {
      const m = new AbortController();
      return (t ? this.activeControllers : this.liveControllers).add(m), [{
        promise: this.synthesizeChunk({ content: s, text: r, textOffset: 0, useSSML: i, ssmlMap: o, language: a, prevText: l, nextText: c, format: d, bitrate: f, controller: m }),
        controller: m
      }];
    }
    if (this.overLengthText === "error")
      throw new ue(
        `Text exceeds this server's maximum length of ${u.limits.maxTextLength} characters`,
        {
          status: 413,
          type: "https://readium.org/speech-server/error#payload_too_large",
          title: "Payload Too Large"
        }
      );
    const p = Math.min(u.limits.maxTextLength, this.readyBufferChars), g = i ? ji(r, p) : Bi(r, p), v = [];
    let S = Promise.resolve();
    for (let m = 0; m < g.length; m++) {
      const C = m === 0 ? l : g[m - 1].text, y = m === g.length - 1 ? c : g[m + 1].text, b = g[m], k = new AbortController();
      (t ? this.activeControllers : this.liveControllers).add(k);
      const w = S.then(
        () => this.synthesizeChunk({ content: s, text: b.text, textOffset: b.offset, useSSML: i, ssmlMap: o, language: a, prevText: C, nextText: y, format: d, bitrate: f, controller: k })
      );
      v.push({ promise: w, controller: k }), S = w;
    }
    return v;
  }
  async synthesizeChunk(e) {
    const { content: t, text: s, textOffset: i, useSSML: a, ssmlMap: r, language: o, prevText: l, nextText: c, format: u, bitrate: d, controller: h } = e;
    try {
      const f = await this.voiceFor(t), p = await this.fetchNetwork(this.endpoints.synthesize, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: t.id,
          text: a ? s : Pn(s),
          ssml: a,
          language: o,
          voice: f?.identifier ?? f?.name,
          prev_utterance: l,
          next_utterance: c,
          boundary: !0,
          output: { format: u, bitrate: d, speed: this.rate, pitch: this.pitch }
        }),
        signal: h.signal
      });
      if (!p.ok)
        throw await oe(p);
      const g = await p.json(), v = Zi(g.audio);
      let S;
      try {
        S = await this.ensureAudioContext().decodeAudioData(v);
      } catch {
        throw new Bn("Audio playback failed");
      }
      return { audioBuffer: S, format: g.format, boundaries: g.boundaries, textOffset: i, ssmlMap: r };
    } finally {
      this.activeControllers.delete(h), this.liveControllers.delete(h);
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
        t.abort(), r(new Mn(`No audio chunk arrived within ${i.toFixed(0)}ms of the playback buffer running dry`));
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
    const a = this.ensureAudioContext(), r = this.masterGain, l = s?.controls?.speed === !0 ? 1 : Xi(this.rate);
    this.scheduledChunks = [], this.setState("playing"), this.emitEvent({ type: "start", detail: { voice: s } });
    let c = a.currentTime, u = null;
    const d = (h) => {
      const f = a.createBufferSource();
      f.buffer = h.audioBuffer, f.playbackRate.value = l, f.connect(r), f.start(c), u && (u.onended = null), f.onended = () => this.handleUtteranceEnded(t), u = f, this.scheduledChunks.push({ chunk: h, startTime: c, node: f, nextBoundaryIndex: 0, rate: l }), c += h.audioBuffer.duration / l;
    };
    d(i), this.startBoundaryPolling(t);
    for (let h = 1; h < e.length; h++) {
      let f;
      try {
        const p = Math.max(0, (c - a.currentTime) * 1e3);
        f = await this.awaitWithStallDeadline(e[h].promise, e[h].controller, p);
      } catch (p) {
        t === this.speakGeneration && this.emitEvent({ type: "error", detail: Qt(p) });
        return;
      }
      if (t !== this.speakGeneration)
        return;
      d(f);
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
          r = qt(l, a), o = Math.max(0, qt(l, a + i.charLength) - r);
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
    const t = J(e, 0.1, 10, this.rate);
    t !== this.rate && (this.rate = t, this.clearPrefetchCache(), this.scheduleRestartIfSpeaking());
  }
  getRate() {
    return this.rate;
  }
  setPitch(e) {
    const t = J(e, 0, 2, this.pitch);
    t !== this.pitch && (this.pitch = t, this.clearPrefetchCache(), this.scheduleRestartIfSpeaking());
  }
  getPitch() {
    return this.pitch;
  }
  setVolume(e) {
    const t = J(e, 0, 1, this.volume);
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
class Ir {
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
      throw await oe(t);
    if (!s.ok)
      throw await oe(s);
    const i = await t.json(), a = await s.json(), r = new Map(a.providers.map((o) => [o.id, o.controls]));
    return this.voices = i.map((o) => zn(o, r.get(o.provider))), this.voices;
  }
  async createEngine(e) {
    const t = new Yi(this.options);
    return this.voices.length > 0 && t.setAvailableVoices(this.voices), e && t.setVoice(e), t;
  }
  async destroy() {
    this.voices = [];
  }
}
function ea(n) {
  return n.detail?.recoverable === !0;
}
const ta = 3e4, na = [
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
class sa {
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
  events = new Ne();
  unbindActiveEngine = null;
  constructor(e) {
    this.activeEngine = e.primaryEngine, this.primaryProvider = e.primaryProvider, this.fallbackProvider = e.fallbackProvider, this.onFailure = e.onFailure ?? "fallback", this.healthCheckIntervalMs = e.healthCheckIntervalMs ?? ta, this.lastVoiceRequest = e.primaryEngine.getCurrentVoice() ?? void 0, this.bindActiveEngine();
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
    const e = this.activeEngine, t = na.map((s) => e.on(s, (i) => {
      this.emitEvent(i), this.maybeRecoverNow();
    }));
    t.push(e.on("error", (s) => this.handleError(s))), this.unbindActiveEngine = () => t.forEach((s) => s());
  }
  handleError(e) {
    if (this.hasFallenBack || this.swapInFlight || this.onFailure === "error" || !ea(e)) {
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
        const i = this.activeEngine.getCurrentVoice() ?? (typeof this.lastVoiceRequest == "object" ? this.lastVoiceRequest : null), a = i?.language || this.currentUtterances[this.desiredIndex]?.language || (typeof navigator < "u" ? navigator.language : "en");
        if (t = await this.pickBestFallbackVoice(a, i?.gender, i?.controls?.boundary !== !1), !t) throw new Error("no offline-available fallback voice found");
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
    if (i !== this.teardownEpoch) {
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
  async pickBestFallbackVoice(e, t, s) {
    const i = await this.fallbackProvider.getVoices(), r = typeof navigator < "u" && navigator.onLine === !0 ? i : i.filter((p) => p.offlineAvailability === !0);
    if (r.length === 0) return null;
    const [o] = Ue([e]), { voicesByLang: l } = xe(r, [o]), c = l.get(o.baseLang) ?? [], u = c.length > 0 ? c : r, d = t ? u.filter((p) => p.gender === t) : [], h = d.length > 0 ? d : u, f = ht(h, s);
    return En(e, f);
  }
  async destroy() {
    this.teardownEpoch++, this.healthCheckTimer !== null && (clearTimeout(this.healthCheckTimer), this.healthCheckTimer = null), this.unbindActiveEngine?.(), this.events.clear(), await this.activeEngine.destroy();
  }
}
class Pr {
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
    } catch (s) {
      if (this.onFailure === "error")
        throw s;
      return this.fallback.createEngine(e);
    }
    return new sa({
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
function ia(n) {
  return new Us({
    start: new Bt(n.start),
    end: n.end ? new Bt(n.end) : void 0
  });
}
function aa(n, e = window) {
  const { href: t, text: s, cssSelector: i, domRange: a, fragment: r } = n, o = s ? new Ps(s) : void 0, l = i || a ? /* @__PURE__ */ new Map() : void 0;
  l && (i && l.set("cssSelector", i), a && l.set("domRange", ia(a).serialize()));
  const u = l !== void 0 || r !== void 0 ? new As({
    fragments: r ? [r] : void 0,
    otherLocations: l
  }) : void 0;
  return new Ls({
    href: t ?? e.location.href,
    type: "text/html",
    text: o,
    locations: u
  });
}
class ra extends Es {
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
        locator: aa(a, this.wnd)
      })),
      t
    );
  }
  destroy() {
    super.destroy(), this.decorator.unmount(this.wnd, this.channel.frame), this.channel.frame.destroy();
  }
}
function Ar(n = window, e = {}) {
  const t = new Rs(), s = new Is();
  return s.mount(n, t.frame), new ra(t, n, s, e);
}
const jn = (n) => n.voiceURI ?? n.identifier ?? n.name;
class Lr {
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
const Me = (n, e, t) => Object.freeze({ range: Object.freeze([n, e]), step: t }), Re = Me(0, 5e3, 100), Ie = Me(0.1, 10, 0.1), Pe = Me(0, 2, 0.1), Ae = Me(0, 1, 0.05), pt = Object.freeze(["none", "few", "some", "most", "custom"]), mt = Object.freeze(["none", "block-level", "always"]), vt = Object.freeze(["plain", "ssml"]), yt = Object.freeze(["none", "utterance", "block"]), St = Object.freeze(["structure", "sentence"]), Fn = Object.freeze(["never", "inline", "after"]), Jt = Object.freeze([
  "format",
  "interruptions",
  "verbosity",
  "skip",
  "contextualize",
  "language",
  "languageOverrides",
  "segmentation"
]);
function oa(n) {
  return n == null || typeof n == "boolean" ? n : void 0;
}
function V(n, e) {
  return n == null || e.includes(n) ? n : void 0;
}
function F(n, e) {
  if (n == null) return n;
  if (typeof n != "number" || Number.isNaN(n)) return;
  const t = Math.min(...e), s = Math.max(...e);
  return n >= t && n <= s ? n : void 0;
}
function bt(n) {
  if (n == null) return n;
  if (!(typeof n != "object" || Array.isArray(n)))
    return Object.values(n).every((e) => typeof e == "string") ? { ...n } : void 0;
}
function _n(n, e) {
  if (n == null) return n;
  if (!(typeof n != "object" || Array.isArray(n)))
    return Object.values(n).every((t) => t !== void 0 && e.includes(t)) ? { ...n } : void 0;
}
function $n(n) {
  return typeof n == "string" ? n : bt(n);
}
function he(n) {
  return n == null ? n : Array.isArray(n) && n.every((e) => typeof e == "string") ? [...n] : void 0;
}
class la {
  format;
  interruptions;
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
    this.format = V(e.format, vt) ?? "plain", this.interruptions = _n(e.interruptions, Fn) ?? {}, this.verbosity = V(e.verbosity, pt) ?? "few", this.skip = he(e.skip) ?? [], this.contextualize = he(e.contextualize) ?? [], this.language = V(e.language, mt) ?? "block-level", this.languageOverrides = bt(e.languageOverrides) ?? {}, this.segmentation = V(e.segmentation, St) ?? "structure", this.voice = $n(e.voice) ?? null, this.pauseDuration = F(e.pauseDuration, Re.range) ?? 300, this.autoPause = V(e.autoPause, yt) ?? "none", this.rate = F(e.rate, Ie.range) ?? 1, this.pitch = F(e.pitch, Pe.range) ?? 1, this.volume = F(e.volume, Ae.range) ?? 1;
  }
}
class de {
  format;
  interruptions;
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
    this.format = V(e.format, vt), this.interruptions = _n(e.interruptions, Fn), this.verbosity = V(e.verbosity, pt), this.skip = he(e.skip), this.contextualize = he(e.contextualize), this.language = V(e.language, mt), this.languageOverrides = bt(e.languageOverrides), this.segmentation = V(e.segmentation, St), this.voice = $n(e.voice), this.pauseDuration = F(e.pauseDuration, Re.range), this.autoPause = V(e.autoPause, yt), this.rate = F(e.rate, Ie.range), this.pitch = F(e.pitch, Pe.range), this.volume = F(e.volume, Ae.range);
  }
  merging(e) {
    const t = { ...this };
    for (const s of Object.keys(e))
      e[s] !== void 0 && (t[s] = e[s]);
    return new de(t);
  }
}
class Z {
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
class ae extends Z {
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
    if (e != null && V(e, this._supportedValues) === void 0)
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
class Or extends Z {
  set value(e) {
    if (e != null && oa(e) === void 0)
      throw new Error(`Value '${String(e)}' is not a boolean.`);
    this._value = e, this._onChange(this._value);
  }
  get value() {
    return this._value;
  }
}
class Zt extends Z {
  set value(e) {
    if (e != null && he(e) === void 0)
      throw new Error(`Value '${String(e)}' is not an array of strings.`);
    this._value = e, this._onChange(this._value);
  }
  get value() {
    return this._value;
  }
}
class ye extends Z {
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
    if (e != null && F(e, this._supportedRange) === void 0)
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
class Xt {
  preferences;
  settings;
  // Cloned rather than aliased: edits made through this editor's setters
  // are staged on this copy and only reach the navigator's own preferences
  // once explicitly passed to submitPreferences() — discarding the editor
  // without submitting must leave the navigator untouched.
  constructor(e, t) {
    this.preferences = new de({ ...e }), this.settings = t;
  }
  // Explicit `null`s, not `undefined` — merging() skips `undefined` fields,
  // so only `null` actually clears them once submitted.
  clear() {
    this.preferences = new de({
      format: null,
      interruptions: null,
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
    return new ae({
      initialValue: this.preferences.format,
      effectiveValue: this.settings.format,
      isEffective: this.preferences.format != null,
      onChange: (e) => this.updatePreference("format", e ?? null),
      supportedValues: vt
    });
  }
  get interruptions() {
    return new Z({
      initialValue: this.preferences.interruptions,
      effectiveValue: this.settings.interruptions,
      isEffective: this.preferences.interruptions != null,
      onChange: (e) => this.updatePreference("interruptions", e ?? null)
    });
  }
  get verbosity() {
    return new ae({
      initialValue: this.preferences.verbosity,
      effectiveValue: this.settings.verbosity,
      isEffective: this.preferences.verbosity != null,
      onChange: (e) => this.updatePreference("verbosity", e ?? null),
      supportedValues: pt
    });
  }
  get skip() {
    return new Zt({
      initialValue: this.preferences.skip,
      effectiveValue: this.settings.skip,
      isEffective: this.preferences.skip != null,
      onChange: (e) => this.updatePreference("skip", e ?? null)
    });
  }
  get contextualize() {
    return new Zt({
      initialValue: this.preferences.contextualize,
      effectiveValue: this.settings.contextualize,
      isEffective: this.preferences.contextualize != null,
      onChange: (e) => this.updatePreference("contextualize", e ?? null)
    });
  }
  get language() {
    return new ae({
      initialValue: this.preferences.language,
      effectiveValue: this.settings.language,
      isEffective: this.preferences.language != null,
      onChange: (e) => this.updatePreference("language", e ?? null),
      supportedValues: mt
    });
  }
  get languageOverrides() {
    return new Z({
      initialValue: this.preferences.languageOverrides,
      effectiveValue: this.settings.languageOverrides,
      isEffective: this.preferences.languageOverrides != null,
      onChange: (e) => this.updatePreference("languageOverrides", e ?? null)
    });
  }
  get segmentation() {
    return new ae({
      initialValue: this.preferences.segmentation,
      effectiveValue: this.settings.segmentation,
      isEffective: this.preferences.segmentation != null,
      onChange: (e) => this.updatePreference("segmentation", e ?? null),
      supportedValues: St
    });
  }
  get voice() {
    return new Z({
      initialValue: this.preferences.voice,
      effectiveValue: this.settings.voice,
      isEffective: this.preferences.voice != null,
      onChange: (e) => this.updatePreference("voice", e ?? null)
    });
  }
  get pauseDuration() {
    return new ye({
      initialValue: this.preferences.pauseDuration,
      effectiveValue: this.settings.pauseDuration,
      isEffective: this.preferences.pauseDuration != null,
      onChange: (e) => this.updatePreference("pauseDuration", e ?? null),
      supportedRange: Re.range,
      step: Re.step
    });
  }
  get autoPause() {
    return new ae({
      initialValue: this.preferences.autoPause,
      effectiveValue: this.settings.autoPause,
      isEffective: this.preferences.autoPause != null,
      onChange: (e) => this.updatePreference("autoPause", e ?? null),
      supportedValues: yt
    });
  }
  get rate() {
    return new ye({
      initialValue: this.preferences.rate,
      effectiveValue: this.settings.rate,
      isEffective: this.preferences.rate != null,
      onChange: (e) => this.updatePreference("rate", e ?? null),
      supportedRange: Ie.range,
      step: Ie.step
    });
  }
  get pitch() {
    return new ye({
      initialValue: this.preferences.pitch,
      effectiveValue: this.settings.pitch,
      isEffective: this.preferences.pitch != null,
      onChange: (e) => this.updatePreference("pitch", e ?? null),
      supportedRange: Pe.range,
      step: Pe.step
    });
  }
  get volume() {
    return new ye({
      initialValue: this.preferences.volume,
      effectiveValue: this.settings.volume,
      isEffective: this.preferences.volume != null,
      onChange: (e) => this.updatePreference("volume", e ?? null),
      supportedRange: Ae.range,
      step: Ae.step
    });
  }
}
const qn = ["audio", "figure", "image", "math", "table", "video"], Gn = [
  ...qn,
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
], ca = [
  ...Gn,
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
], ua = {
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
}, ha = {
  none: /* @__PURE__ */ new Set(),
  few: new Set(qn),
  some: new Set(Gn),
  most: new Set(ca)
}, et = {
  table: { few: "inline", some: "block", most: "block" }
};
function Se(n) {
  const e = {};
  for (const t of Object.keys(et))
    e[t] = et[t]?.[n] ?? "inline";
  return e;
}
const da = {
  none: Se("none"),
  few: Se("few"),
  some: Se("some"),
  most: Se("most")
}, Vr = Object.keys(et);
function ga(n, e) {
  const t = n === "custom" ? {} : da[n];
  if (!e) return t;
  const s = { ...t };
  for (const i of Object.keys(e)) {
    const a = e[i]?.[n];
    a && (s[i] = a);
  }
  return s;
}
const fa = (n, e) => {
  if (!e || typeof n == "string") return n;
  const [t] = R(e.language);
  return !t || n && ut(n, t) !== void 0 ? n : { ...n, [t]: jn(e) };
};
class _e {
  format;
  interruptions;
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
  constructor(e, t, s) {
    this.format = e.format ?? t.format, this.interruptions = e.interruptions ?? t.interruptions, this.verbosity = e.verbosity ?? t.verbosity, this.verbosity === "custom" ? (this.skip = e.skip ?? t.skip, this.contextualize = e.contextualize ?? t.contextualize) : (this.skip = [...ua[this.verbosity]], this.contextualize = [...ha[this.verbosity]]), this.language = e.language ?? t.language, this.languageOverrides = e.languageOverrides ?? t.languageOverrides, this.segmentation = e.segmentation ?? t.segmentation, this.voice = fa(e.voice ?? t.voice, s), this.pauseDuration = e.pauseDuration ?? t.pauseDuration, this.autoPause = e.autoPause ?? t.autoPause, this.rate = e.rate ?? t.rate, this.pitch = e.pitch ?? t.pitch, this.volume = e.volume ?? t.volume;
  }
}
const Yt = /* @__PURE__ */ new WeakMap(), Hn = /* @__PURE__ */ new WeakMap();
function en(n, e) {
  Hn.set(n, e);
}
const tt = /* @__PURE__ */ new WeakSet();
function nt(n) {
  return tt.add(n), n;
}
function pa(n, e, t) {
  const s = Hn.get(n);
  if (s) {
    const d = Ht(s.map, e), h = Ht(s.map, e + t);
    e = d, t = Math.max(0, h - d);
  }
  const i = n.offsets, a = !n.plain && !!n.ssml, r = s?.plain ?? n.plain ?? (n.ssml ? U(n.ssml) : "");
  if (!i?.length || !r) return;
  const o = Yt.get(n), l = o !== void 0 && e >= o.cursor;
  let c = l ? o.cursor : 0;
  const u = (d) => {
    const h = d.locate.text?.highlight;
    return h && (a ? U(h) : h);
  };
  for (let d = l ? o.pieceIndex : 0; d < i.length; d++) {
    const h = i[d];
    if (tt.has(h.locate)) {
      const v = i.slice(d + 1).find((b) => !tt.has(b.locate) && u(b)), S = v && u(v), m = S ? r.indexOf(S, c + h.end - h.start) : -1, C = S && m === -1 ? r.indexOf(S, c) : m, y = C === -1 ? r.length : C;
      if (e >= c && e < y) return;
      c = y;
      continue;
    }
    const f = u(h) ?? r.slice(c);
    if (!f) continue;
    const p = r.indexOf(f, c);
    if (p === -1) continue;
    const g = p + f.length;
    if (e >= p && e < g) {
      Yt.set(n, { pieceIndex: d, cursor: c });
      const v = e - p, S = f.substring(v, Math.min(v + t, f.length));
      return { locate: {
        ...h.locate,
        domRange: void 0,
        text: {
          highlight: S,
          before: f.substring(0, v),
          after: f.substring(v + S.length)
        }
      }, word: S };
    }
    c = g;
  }
}
function ma(n, e) {
  return e === "sentence" && n.offsets?.length ? n.offsets.map((t) => t.locate) : n.locate ? [n.locate] : [];
}
function N(n) {
  return { pattern: new RegExp(`(\\d+)\\s?u${n}\\b`, "g"), replace: (e, t) => `${t}µ${n}` };
}
const va = {
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
}, ya = {
  ...va,
  // Rejects "(c)" directly preceded by "(a)"/"(b)" (a lettered list, not a copyright notice).
  "(c)": { pattern: new RegExp("(?<!\\([ab]\\)\\s{0,3})\\(c\\)", "g"), replace: "©" },
  "(C)": { pattern: new RegExp("(?<!\\([AB]\\)\\s{0,3})\\(C\\)", "g"), replace: "©" },
  "(r)": "®",
  "(R)": "®",
  "(tm)": "™",
  "(TM)": "™",
  deg: { pattern: /(\d+)\s?deg\b/g, replace: (n, e) => `${e}°` },
  x: { pattern: /(\d+)\s?[xX]\s?(?=\d)/g, replace: (n, e) => `${e}×` },
  ug: N("g"),
  um: N("m"),
  us: N("s"),
  uL: N("L"),
  uF: N("F"),
  uA: N("A"),
  uV: N("V"),
  uW: N("W"),
  uN: N("N"),
  umol: N("mol"),
  "->": "→",
  "<-": "←",
  // Reversed from every other entry: engines pattern-match the ASCII foot/inch
  // convention for pronunciation, but drop the real prime marks silently.
  "′": "'",
  "″": '"'
}, Sa = { contextualizations: { abstract: { block: { start: "Start of the abstract.", end: "End of the abstract." } }, acknowledgments: { block: { start: "Start of the acknowledgments.", end: "End of the acknowledgments." } }, afterword: { block: { start: "Start of the afterword.", end: "End of the afterword." } }, appendix: { block: { start: "Start of the appendix.", end: "End of the appendix." } }, aside: { block: { start: "Start of the aside.", end: "End of the aside." } }, audio: { inline: { labelled: "Audio with a label: {{ description }}", unlabelled: "Audio with no label." } }, bibliography: { block: { start: "Start of the bibliography.", end: "End of the bibliography." } }, biblioref: { inline: "Bibliographic reference." }, blockquote: { inline: "Blockquote." }, cell: { inline: { withHeader: "{{ header }}: {{ value }}", withoutHeader: "{{ value }}" } }, chapter: { block: { start: "Start of the chapter.", end: "End of the chapter." } }, colophon: { inline: "Colophon." }, complementary: { block: { start: "Start of the complementary content.", end: "End of the complementary content." } }, conclusion: { block: { start: "Start of the conclusion.", end: "End of the conclusion." } }, cover: { inline: { labelled: "Cover with a label: {{ description }}", unlabelled: "Cover with no label." } }, credit: { inline: "Credit." }, credits: { block: { start: "Start of the credits.", end: "End of the credits." } }, dedication: { inline: "Dedication." }, definition: { inline: "Definition." }, details: { block: { start: "Start of the disclosure.", end: "End of the disclosure." } }, endnotes: { block: { start: "Start of the endnotes.", end: "End of the endnotes." } }, epigraph: { inline: "Epigraph." }, epilogue: { block: { start: "Start of the epilogue.", end: "End of the epilogue." } }, errata: { block: { start: "Start of the errata.", end: "End of the errata." } }, example: { block: { start: "Start of the example.", end: "End of the example." } }, figure: { inline: "Figure: {{ description }}" }, footnote: { block: { start: "Start of the footnote.", end: "End of the footnote." } }, foreword: { block: { start: "Start of the foreword.", end: "End of the foreword." } }, glossary: { block: { start: "Start of the glossary.", end: "End of the glossary." } }, glossref: { inline: "Glossary definition.", term: "{{ term }}: {{ value }}" }, heading1: { inline: "Heading level 1." }, heading2: { inline: "Heading level 2." }, heading3: { inline: "Heading level 3." }, heading4: { inline: "Heading level 4." }, heading5: { inline: "Heading level 5." }, heading6: { inline: "Heading level 6." }, image: { inline: { labelled: "Image with a label: {{ description }}", unlabelled: "Image with no label." } }, index: { block: { start: "Start of the index.", end: "End of the index." } }, introduction: { block: { start: "Start of the introduction.", end: "End of the introduction." } }, list: { block: { start: "Start of the list.", end: "End of the list." } }, listItem: { inline: "List item." }, math: { inline: { labelled: "{{ description }}", unlabelled: "Math formula with no label." } }, notice: { inline: "Notice." }, pagebreak: { inline: "Pagebreak.", number: "Page {{ number }}" }, pagelist: { block: { start: "Start of the page list.", end: "End of the page list." } }, part: { inline: "Part." }, preface: { block: { start: "Start of the preface.", end: "End of the preface." } }, prologue: { block: { start: "Start of the prologue.", end: "End of the prologue." } }, pullquote: { inline: "Pullquote." }, qna: { block: { start: "Start of the questions and answers.", end: "End of the questions and answers." } }, row: { inline: "Row: {{ count }}" }, rowheader: { inline: { withHeader: "{{ header }}: {{ value }}", withoutHeader: "{{ value }}" } }, separator: { inline: "Separator." }, subtitle: { inline: "Subtitle." }, summary: { inline: "Summary." }, table: { block: { end: "End of the table.", start: { labelled: "Table: {{ description }}. {{ lines }}. {{ columns }}.", unlabelled: "Table. {{ lines }}. {{ columns }}." } }, inline: { labelled: "Table: {{ description }}. {{ lines }}. {{ columns }}.", unlabelled: "Table. {{ lines }}. {{ columns }}." }, parts: { columns_one: "1 column", columns_other: "{{ count }} columns", lines_one: "1 line", lines_other: "{{ count }} lines" } }, term: { inline: "Term." }, tip: { inline: "Tip." }, video: { inline: { labelled: "Video with a label: {{ description }}", unlabelled: "Video with no label." } } } }, ba = {
  speech: Sa
}, Kn = ba.speech.contextualizations, st = { en: Kn }, Wn = {};
function wa(n) {
  return st[n] || Wn[n] ? n : "en";
}
async function ka(n) {
  const e = st[n];
  if (e) return e;
  const t = Wn[n];
  if (!t) return Kn;
  const s = (await t()).speech.contextualizations;
  return st[n] = s, s;
}
const Ca = {
  de: ["A.", "A.M.", "Abs.", "Abt.", "Abw.", "Adj.", "Adr.", "Akt.", "Allg.", "Alt.", "App.", "Apr.", "Art.", "Aug.", "Ausg.", "Ausschl.", "B.", "Bed.", "Ben.", "Ber.", "Best.", "Bibl.", "C.", "Ca.", "Chin.", "Chr.", "Co.", "D.", "D. h.", "Dat.", "Dez.", "Di.", "Dim.", "Dipl.-Ing.", "Dipl.-Kfm.", "Dir.", "Do.", "Dr.", "Dtzd.", "Einh.", "Erf.", "Evtl.", "F.", "F.f.", "Fa.", "Fam.", "Feb.", "Fn.", "Folg.", "Forts. f.", "Fr.", "Frl.", "G.", "Gebr.", "Gem.", "Geograph.", "Ges.", "Gesch.", "Ggf.", "Hbf.", "Hptst.", "Hr.", "Hrn.", "Hrsg.", "I.", "Inc.", "Ing.", "Inh.", "Int.", "J.", "J.D.", "Jahrh.", "Jan.", "Jr.", "Kap.", "Kfm.", "Kl.", "Konv.", "Kop.", "L.", "Ltd.", "M.", "Max.", "Mi.", "Min.", "Mind.", "Mio.", "Mo.", "Mod.", "Mrd.", "Msp.", "N.", "Nov.", "Nr.", "O.", "Obj.", "Okt.", "Op.", "P.", "P.M.", "PIN.", "Pfd.", "Phys.", "Port.", "Prot.", "Proz.", "Qu.", "R.", "Rd.", "Reg.", "Reg.-Bez.", "Rel.", "Rep.", "S.A.", "Sa.", "Schr.", "Sek.", "Sep.", "Sept.", "So.", "Spezif.", "St.", "StR.", "Std.", "Str.", "T.", "Tel.", "Temp.", "Test.", "Trans.", "Tägl.", "U.", "U. U.", "U.S.", "U.S.A.", "U.U.", "Urspr.", "Ursprüngl.", "Verf.", "Vgl.", "W.", "Wg.", "Y.", "Z.", "Z. B.", "Z. Zt.", "Ztr.", "a.D.", "a.M.", "a.Rh.", "a.a.O.", "a.a.S.", "am.", "amtl.", "b.", "beil.", "d.J.", "d.Ä.", "e.V.", "e.Wz.", "e.h.", "ehem.", "eigtl.", "einschl.", "entspr.", "erw.", "ev.", "evtl.", "exkl.", "frz.", "geb.", "gedr.", "gek.", "gesch.", "gest.", "ggf.", "ggfs.", "hpts.", "i.A.", "i.B.", "i.H.", "i.J.", "i.R.", "i.V.", "inkl.", "jew.", "jhrl.", "k. u. k.", "k.u.k.", "kath.", "kfm.", "kgl.", "led.", "m.E.", "m.W.", "mtl.", "möbl.", "n. Chr.", "n.u.Z.", "näml.", "o.A.", "o.B.", "o.g.", "od.", "p.Adr.", "r.", "röm.", "röm.-kath.", "s.", "s.a.", "schles.", "schweiz.", "schwäb.", "sog.", "südd.", "tägl.", "u.", "u. Z.", "u.A.w.g.", "u.U.", "u.a.", "u.v.a.", "u.Ä.", "u.ä.", "v. Chr.", "v. H.", "v. u. Z.", "v.Chr.", "v.H.", "v.R.w.", "v.T.", "v.u.Z.", "verh.", "verw.", "vgl.", "z.", "z.B.", "z.Hd.", "z.Z.", "zzgl.", "österr."],
  en: ["A.D.", "A.I.", "A.M.", "A.S.", "AA.", "AB.", "Abs.", "Adj.", "Adv.", "Alt.", "Approx.", "Aug.", "B.V.", "C.F.", "C.O.D.", "Capt.", "Col.", "Comm.", "Conn.", "Cont.", "D.A.", "D.C.", "DC.", "DR.", "Dec.", "Def.", "Dept.", "Diff.", "Dr.", "E.G.", "E.g.", "Ed.", "Est.", "Etc.", "Ex.", "Exec.", "Feb.", "Fn.", "Fri.", "Hon.B.A.", "I.", "I.D.", "I.T.", "I.e.", "J.B.", "J.D.", "J.K.", "Jan.", "Jun.", "K.R.", "L.A.", "L.P.", "Lev.", "Lib.", "Lt.", "Lt.Cdr.", "M.", "M.I.T.", "M.R.", "M.T.", "MR.", "Maj.", "Mar.", "Mart.", "Mb.", "Md.", "Mgr.", "Min.", "Misc.", "Mr.", "Mrs.", "Ms.", "Mt.", "N.V.", "N.Y.", "Nov.", "Nr.", "Num.", "Op.", "Org.", "P.M.", "P.O.", "P.V.", "PP.", "Ph.D.", "Phys.", "Prof.", "Pvt.", "R.L.", "R.T.", "Rep.", "Rev.", "S.A.", "S.A.R.", "S.E.", "S.p.A.", "Sep.", "Sept.", "Sgt.", "Sq.", "St.", "U.S.", "U.S.A.", "U.S.C.", "VS.", "Yr.", "a.m.", "d.", "dr.", "exec.", "pp.", "vs."],
  es: ["A.C.", "AA.", "All.", "Ant.", "Av.", "Avda.", "Bien.", "C.", "C.P.", "C.S.", "C.V.", "CA.", "Col.", "Comm.", "Corp.", "Cía.", "D.", "DC.", "Da.", "Desc.", "Desv.", "Dr.", "Dra.", "Drs.", "Dto.", "Dª.", "Dña.", "Em.", "Emm.", "Exc.", "Excma.", "Excmas.", "Excmo.", "Excmos.", "Exma.", "Exmas.", "Exmo.", "Exmos.", "FF.CC.", "Fabric.", "Fr.", "H.P.", "Id.", "Ilma.", "Ilmas.", "Ilmo.", "Ilmos.", "Inc.", "JJ.OO.", "K.", "Kit.", "Korn.", "L.", "Lcda.", "Lcdo.", "Lda.", "Ldo.", "Lic.", "Ltd.", "Ltda.", "Ltdo.", "M.", "MM.", "Mons.", "Mr.", "Mrs.", "O.M.", "PP.", "R.D.", "R.U.", "RAM.", "RR.HH.", "Rdo.", "Rdos.", "Reg.", "Rev.", "Rol.", "Rvdmo.", "Rvdmos.", "Rvdo.", "Rvdos.", "SA.", "SS.AA.", "SS.MM.", "Sdad.", "Seg.", "Sol.", "Sr.", "Sra.", "Sras.", "Sres.", "Srta.", "Srtas.", "Sta.", "Sto.", "Trab.", "U.S.", "U.S.A.", "Var.", "Vda.", "a. C.", "a. e. c.", "abr.", "afma.", "afmas.", "afmo.", "afmos.", "ago.", "bco.", "bol.", "c/c.", "cap.", "cf.", "cfr.", "col.", "d. C.", "depto.", "deptos.", "dic.", "doc.", "dom.", "dpto.", "dptos.", "dtor.", "e. c.", "e.g.", "ed.", "ej.", "ene.", "feb.", "fig.", "figs.", "fund.", "hnos.", "jue.", "jul.", "jun.", "licda.", "licdo.", "lun.", "mar.", "may.", "mié.", "ms.", "mss.", "mtro.", "nov.", "ntra.", "ntro.", "oct.", "p.ej.", "prof.", "prov.", "sept.", "sras.", "sres.", "srs.", "ss.", "sáb.", "trad.", "v.gr.", "vid.", "vie.", "vs."],
  fr: ["All.", "C.", "Comm.", "D.", "DC.", "Desc.", "Inc.", "Jr.", "L.", "M.", "MM.", "Mart.", "Op.", "P.", "P.-D. G.", "P.O.", "Prof.", "S.A.", "S.M.A.R.T.", "U.", "U.S.", "U.S.A.", "Var.", "W.", "acoust.", "adr.", "anc.", "ann.", "anon.", "ap. J.-C.", "append.", "aux.", "av. J.-C.", "avr.", "broch.", "bull.", "cam.", "categ.", "coll.", "collab.", "config.", "dest.", "dict.", "dim.", "dir.", "doc.", "déc.", "encycl.", "exempl.", "fig.", "févr.", "gouv.", "graph.", "hôp.", "ill.", "illustr.", "imm.", "imprim.", "indus.", "janv.", "jeu.", "juil.", "lun.", "mar.", "mer.", "niv.", "nov.", "oct.", "quart.", "réf.", "sam.", "sept.", "symb.", "synth.", "syst.", "trav. publ.", "ven.", "voit.", "éd.", "édit.", "équiv.", "éval."],
  it: ["C.P.", "Cfr.", "D.", "DC.", "Geom.", "Ing.", "L.", "Liv.", "Ltd.", "Mod.", "N.B.", "N.d.A.", "N.d.E.", "N.d.T.", "O.d.G.", "S.A.R.", "S.M.A.R.T.", "S.p.A.", "Sig.", "U.S.", "U.S.A.", "a.C.", "ag.", "all.", "arch.", "avv.", "c.c.p.", "d.C.", "d.p.R.", "div.", "dott.", "dr.", "fig.", "int.", "mitt.", "on.", "p.", "p.i.", "pag.", "rag.", "sez.", "tab.", "tav.", "ver.", "vol."],
  pt: ["A.C.", "Alm.", "Av.", "Dir.", "Dr.", "Dra.", "Dras.", "Drs.", "E.", "Est.", "Exma.", "Exmo.", "Fr.", "Ilma.", "Ilmo.", "Jr.", "Ltd.", "Ltda.", "Mar.", "N.Sra.", "N.T.", "P.M.", "Pe.", "Ph.D.", "R.", "S.", "S.A.", "Sta.", "Sto.", "V.T.", "W.C.", "a.C.", "a.m.", "abr.", "abrev.", "adm.", "aer.", "ago.", "agric.", "anat.", "ap.", "apart.", "apt.", "arit.", "arqueol.", "arquit.", "astron.", "autom.", "aux.", "biogr.", "bras.", "cap.", "caps.", "cat.", "cel.", "cf.", "col.", "com.", "comp.", "compl.", "cont.", "contab.", "créd.", "cx.", "círc.", "cód.", "d.C.", "des.", "desc.", "dez.", "dipl.", "dir.", "div.", "doc.", "déb.", "ed.", "educ.", "elem.", "eletr.", "eletrôn.", "end.", "eng.", "esp.", "ex.", "f.", "fac.", "fasc.", "fem.", "fev.", "ff.", "fig.", "fil.", "filos.", "fisiol.", "fl.", "fot.", "fr.", "fís.", "geom.", "gram.", "gên.", "hist.", "ind.", "ingl.", "jan.", "jul.", "jun.", "jur.", "l.", "lat.", "lin.", "lit.", "liter.", "long.", "mai.", "mar.", "mat.", "matem.", "mov.", "máq.", "méd.", "mús.", "neol.", "nov.", "náut.", "obs.", "odont.", "odontol.", "org.", "organiz.", "out.", "p.", "p. ex.", "p.m.", "pal.", "pol.", "port.", "pp.", "pq.", "prod.", "prof.", "profa.", "pron.", "próx.", "psicol.", "pág.", "quím.", "r.s.v.p.", "ref.", "rel.", "relat.", "rep.", "res.", "rod.", "set.", "sociol.", "sup.", "séc.", "símb.", "tec.", "tecnol.", "tel.", "trad.", "transp.", "univ.", "vol.", "vs.", "álg.", "índ."],
  ru: ["авг.", "апр.", "дек.", "до н. э.", "кв.", "н. э.", "н.э.", "нояб.", "окт.", "отд.", "проф.", "руб.", "сент.", "тел.", "тыс.", "ул.", "февр.", "янв."],
  th: ["ค.ศ."]
};
function $e(n, e, t) {
  let s = t;
  for (; s > e && /\s/.test(n[s - 1]); ) s--;
  return s;
}
const Ea = /[\s([{"'“‘]/;
function Ra(n, e) {
  for (const t of e) {
    if (n.length < t.length || !n.endsWith(t)) continue;
    const s = n.length - t.length - 1;
    if (s < 0 || Ea.test(n[s])) return !0;
  }
  return !1;
}
function Ia(n) {
  let e = 0;
  for (const t of n)
    if (new RegExp("\\p{L}", "u").test(t) && e++, e >= 2) return !0;
  return !1;
}
function Pa(n) {
  return /\.{3,}$/.test(n);
}
function Aa(n, e, t, s) {
  if (s === "“") return !0;
  if (s !== '"') return !1;
  let i = 0;
  for (let a = e; a < t; a++) n[a] === '"' && i++;
  return i % 2 === 1;
}
const La = new RegExp(`[.!?][”"'’)\\]]*\\s+—\\s+(?=\\p{Lu})`, "gu");
function Oa(n, e) {
  const t = [...n.matchAll(La)].map((i) => i.index + i[0].length);
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
const Va = { "»": "«", "«": "»", "›": "‹", "‹": "›" };
function Ta(n, e) {
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
      const u = Va[n[c]];
      if (u === void 0 || a(l.end, u) <= a(l.end, n[c])) break;
      for (c++; c < o.end && /\s/.test(n[c]); ) c++;
      l.end = o.start = c;
    }
    o.start < o.end ? t.push(o) : l && (l.end = o.end);
  }
  return t;
}
function Ua(n, e, t) {
  const s = Ta(n, Oa(n, e));
  for (let a = 0; a < s.length - 1; a++) {
    const r = $e(n, s[a].start, s[a].end);
    if (r !== s[a].end || r <= s[a].start) continue;
    const o = n[r - 1];
    Aa(n, s[a].start, r, o) && (s[a].end -= 1, s[a + 1].start -= 1);
  }
  const i = [];
  for (const a of s) {
    let r = a;
    for (; i.length > 0; ) {
      const o = i[i.length - 1], l = $e(n, o.start, o.end), c = n.slice(o.start, l);
      if (!Ra(c, t) && Ia(c) && !Pa(c)) break;
      i.pop(), r = { start: o.start, end: r.end };
    }
    i.push(r);
  }
  return i.map((a) => {
    const r = $e(n, a.start, a.end);
    return { text: n.slice(a.start, r), start: a.start, end: a.end, contentEnd: r };
  });
}
const tn = /* @__PURE__ */ new Map();
function Qn(n) {
  let e = tn.get(n);
  if (!e) {
    try {
      const [t, s] = R(n), i = s ? `${t}-${s}` : t;
      e = { segmenter: new Intl.Segmenter(i, { granularity: "sentence" }), language: n };
    } catch {
      e = { segmenter: new Intl.Segmenter("en", { granularity: "sentence" }), language: "en" };
    }
    tn.set(n, e);
  }
  return e;
}
function xa(n) {
  return Qn(n).language;
}
async function Jn(n, e, t) {
  if (e === "") return [];
  const { segmenter: s, language: i } = Qn(n), r = [...s.segment(e)].map((c) => ({ start: c.index, end: c.index + c.segment.length })), o = bn(Ca, i) ?? [], l = t ? [...o, ...t] : o;
  return Ua(e, r, l);
}
const Tr = [
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
], Na = [
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
], za = {
  footnote: { drops: ["aside"], unconditional: !0 },
  cover: { drops: ["image"] },
  pullquote: { drops: ["blockquote", "aside"] },
  epigraph: { drops: ["blockquote"] }
}, Ma = ["abbreviation", "biblioref", "glossref", "noteref", "pagebreak"], Ba = ["biblioref", "glossref"], Da = ["audio", "video", "image", "figure", "math", "table", "cover"], ja = ["cell", "rowheader"], Fa = ["separator"], it = new Set(Na), wt = new Set(Ma), _a = new Set(Da), Zn = new Set(ja), $a = new Set(Fa), le = new Set(Ba);
function qa(n, e) {
  const t = Os.createInstance();
  return t.init({
    lng: n,
    resources: { [n]: { translation: e } },
    interpolation: { escapeValue: !1 }
  }), t;
}
function Ga(n, e, t) {
  if (!e) return n;
  const s = { ...n };
  for (const i of Object.keys(e))
    s[i] = t(n[i], e[i]);
  return s;
}
function Xn(n, e) {
  if (typeof e == "string" || typeof n != "object") return e;
  const t = { ...n };
  for (const s of Object.keys(e))
    t[s] = Xn(n[s], e[s]);
  return t;
}
function Ha(n, e) {
  return Ga(n, e, Xn);
}
function Yn(n, e = [], t = /* @__PURE__ */ new Map()) {
  for (const s of n)
    t.set(s, e), s.children && Yn(s.children, [s, ...e], t);
  return t;
}
async function es(n, e) {
  const t = e.contextualizationLocale ?? "en", s = Ha(
    await ka(t),
    e.contextualization?.contextualizations
  );
  return {
    i18n: qa(t, s),
    contextualizationLanguage: wa(t),
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
    // segmentSentences() already applies builtInSuppressions internally
    // (Intl.Segmenter has no built-in equivalent of its own) — this is only
    // the caller's own additive extras, per `SegmentationOptions.suppressions`.
    segmentationSuppressions: e.segmentation?.suppressions ?? {},
    segmenter: e.segmentation?.segmenter ?? Jn,
    // Per-key override, not an additive union — each key holds one whole rule.
    substitutions: { ...ya, ...e.substitutions },
    blockStarts: /* @__PURE__ */ new Set(),
    tableRowNumbers: /* @__PURE__ */ new Map(),
    tableCellHeaders: /* @__PURE__ */ new Map(),
    synthetic: /* @__PURE__ */ new Set(),
    ancestorChains: Yn(n),
    pendingRange: /* @__PURE__ */ new Map(),
    edgeSubstitutedLocate: /* @__PURE__ */ new WeakMap(),
    aliasLocates: /* @__PURE__ */ new WeakSet(),
    placeholderPieces: /* @__PURE__ */ new Map()
  };
}
const Ka = /<lang xml:lang="[^"]*">([\s\S]*?)<\/lang>/g;
function ts(n) {
  return n.replace(Ka, "$1");
}
function ns(n, e) {
  return n === void 0 ? void 0 : ut(e, n) ?? n;
}
function $(n, e) {
  return ns(e.language === "none" ? e.contentLanguage : n ?? e.contentLanguage, e.languageOverrides);
}
function kt(n, e) {
  return n === e || n !== void 0 && e !== void 0 && n.toLowerCase() === e.toLowerCase();
}
function at(n, e) {
  return R(n)[0] === R(e)[0];
}
function rt(n, e, t, s) {
  const { language: i } = e;
  return i === void 0 ? !0 : is(e, t) ? as(e) ? (n.wordless = i, !0) : !s && n.content !== void 0 && !at(n.content, i) ? !1 : (n.entry = i, !0) : n.content !== void 0 && !kt(n.content, i) || !s && n.entry !== void 0 && !at(i, n.entry) ? !1 : (n.content = i, !0);
}
function ss(n, e, t) {
  const s = {};
  for (const i of n)
    if (!rt(s, i, e, t)) return null;
  return s.content ?? s.entry ?? s.wordless;
}
function Wa(n, e) {
  return ss(n, e, !1);
}
function is(n, e) {
  return e.synthetic.has(n) && kt(n.language, e.contextualizationLanguage);
}
function as(n) {
  return !/[\p{L}\p{N}]/u.test(n.plain ?? Ee(n.ssml ?? ""));
}
function rs(n, e) {
  return ss(n, e, e.format === "ssml");
}
function os(n, e, t) {
  const s = n.ssml ?? "";
  return !e || !n.language || !is(n, t) || as(n) || at(n.language, e) ? s : `<lang xml:lang="${Sn(n.language)}">${s}</lang>`;
}
function Ct(n, e) {
  const t = e.format === "ssml", s = [];
  let i = 0, a = {};
  return n.forEach((r, o) => {
    rt(a, r, e, t) || (s.push([i, o]), i = o, a = {}, rt(a, r, e, t));
  }), n.length > 0 && s.push([i, n.length]), s;
}
function ls(n, e) {
  return n.replace(/<lang xml:lang="([^"]*)">/g, (t, s) => {
    const i = ns(s, e);
    return i === s ? t : `<lang xml:lang="${i}">`;
  });
}
function B(n) {
  return n.role ? [...n.role] : [];
}
function Le(n) {
  return n.role?.has("math") ? void 0 : n.text;
}
function Be(n) {
  const e = n.description?.text;
  if (e)
    return e.plain ?? (e.ssml !== void 0 ? U(e.ssml) : void 0);
}
function cs(n) {
  return n.description?.text?.language;
}
function Oe(n, e = n) {
  let t = "", s = "";
  const i = [];
  return n.forEach((a, r) => {
    const o = e[r];
    if (o.length === 1 && di(o) && s.endsWith(o)) {
      i.push({ start: t.length, end: t.length });
      return;
    }
    s && !fe(o) && !hi(s) && !/\s$/.test(s) && !/^\s/.test(o) && (t += " ", s += " ");
    const l = t.length;
    t += a, s += o, i.push({ start: l, end: t.length });
  }), { joined: t, ranges: i };
}
function X(n, e) {
  const t = Vs(n), s = O(n, e.ancestorChains)?.ref;
  if (t) {
    const i = { cssSelector: t };
    return s?.href !== void 0 && (i.href = s.href), nt(i);
  }
  return s && nt(s);
}
function us(n, e, t) {
  const s = [];
  return n.forEach((i, a) => {
    if (i.offsets) {
      s.push(...i.offsets);
      return;
    }
    if (t.synthetic.has(i)) return;
    const r = e[a];
    if (!r || Array.isArray(r)) return;
    const o = O(r, t.ancestorChains);
    if (!o) return;
    const l = t.format === "ssml" ? i.ssml : i.plain;
    if (!l) return;
    const c = t.pendingRange.get(i), u = H(r) ? X(r, t) ?? o.ref : Y(o.ref, l);
    s.push({ start: c?.start ?? 0, end: c?.end ?? l.length, locate: u });
  }), s;
}
function nn(n, e, t, s) {
  const i = s.edgeSubstitutedLocate.get(n);
  if (i) return i[t];
  if (!(!e || Array.isArray(e) || !H(e)))
    return X(e, s);
}
function Qa(n, e, t) {
  const s = n.map((l, c) => {
    if (l.locate) return l.locate;
    if (t.synthetic.has(l)) return;
    const u = e[c];
    if (!u || Array.isArray(u)) return;
    const d = t.format === "ssml" ? l.ssml : l.plain;
    if (d)
      return H(u) ? O(u, t.ancestorChains) && X(u, t) : Rt(O(u, t.ancestorChains), d);
  }), i = s.findIndex((l) => l !== void 0);
  if (i === -1) return;
  let a = s.length - 1;
  for (; s[a] === void 0; ) a--;
  if (i === a) return s[i];
  const r = e[i], o = e[a];
  if (r && o && !Array.isArray(r) && !Array.isArray(o)) {
    const l = O(r, t.ancestorChains), c = O(o, t.ancestorChains);
    return It(l, c, s[i]);
  }
  return s[i];
}
function De(n, e, t) {
  const s = [], i = [], a = [];
  for (let f = 0; f < n.length; f++) {
    const p = n[f], g = t.format === "ssml" ? p.ssml : p.plain;
    g && (s.push(g), i.push(p), a.push(e[f]));
  }
  if (s.length === 0) return;
  const r = rs(i, t);
  if (r === null) return;
  const { joined: o } = Oe(t.format === "ssml" ? i.map((f) => os(f, r, t)) : s), l = t.format === "ssml" ? { ssml: o } : { plain: o };
  r && (l.language = r), n.some((f) => t.synthetic.has(f)) && t.synthetic.add(l);
  const c = us(i, a, t);
  c.length > 0 && (l.offsets = c);
  const u = Qa(i, a, t);
  u && (l.locate = u);
  const d = nn(i[0], a[0], "leading", t), h = nn(i[i.length - 1], a[i.length - 1], "trailing", t);
  return (d || h) && t.edgeSubstitutedLocate.set(l, { leading: d, trailing: h }), l;
}
function Et(n, e, t, s) {
  if (e === "plain" && t !== "block-level" && t !== "none" && n.ssml && Tn(n.ssml))
    return dt(n.ssml, n.language).map((r) => {
      const o = { plain: r.plain }, l = $(r.language, s);
      return l && (o.language = l), s.pendingRange.set(o, { start: r.start, end: r.end }), o;
    });
  const i = {}, a = $(n.language, s);
  return a && (i.language = a), e === "ssml" ? i.ssml = n.ssml ? ls(n.ssml, s.languageOverrides) : z(n.plain ?? "") : i.plain = n.plain ?? U(n.ssml ?? ""), (t === "block-level" || t === "none") && i.ssml && (i.ssml = ts(i.ssml)), [i];
}
function pe(n, e) {
  return e !== "ssml" ? n : n.replace(/<[^>]+>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
}
function Y(n, e) {
  const t = n.cssSelector ?? n.domRange?.start.cssSelector;
  if (!t) return { ...n, text: { highlight: e } };
  const s = { cssSelector: t, text: { highlight: e } };
  return n.href !== void 0 && (s.href = n.href), s;
}
function O(n, e) {
  const t = Mt(n);
  if (t) return { own: !0, ref: t };
  for (const s of e.get(n) ?? []) {
    const i = Mt(s);
    if (i) return { own: !1, ref: i };
  }
}
function Rt(n, e) {
  if (n)
    return n.own ? n.ref : Y(n.ref, e);
}
function It(n, e, t) {
  return (n && e ? Ts(n.ref, e.ref) : void 0) ?? t;
}
function hs(n, e, t) {
  const { ancestorChains: s } = t, i = /* @__PURE__ */ new Map();
  for (const a of e)
    a && !Array.isArray(a) && i.set(a, (i.get(a) ?? 0) + 1);
  return n.map((a, r) => {
    if (a.offsets) return a;
    const o = e[r], l = a.plain ?? a.ssml ?? "";
    if (Array.isArray(o)) {
      const [h, f] = o, p = O(h, s), g = O(f, s), v = It(p, g, Rt(p, l));
      return v ? { ...a, locate: v } : a;
    }
    const c = o, u = c ? O(c, s) : void 0;
    if (!u) return a;
    const d = { ...a, locate: u.ref };
    if (!t.synthetic.has(a)) {
      const h = t.pendingRange.get(a), f = h !== void 0 || c && (i.get(c) ?? 0) > 1, p = c && H(c) ? X(c, t) : void 0;
      d.locate = p ?? (u.own && !f ? u.ref : Y(u.ref, l)), d.offsets = [{ start: h?.start ?? 0, end: h?.end ?? l.length, locate: d.locate }];
    }
    return d;
  });
}
function Pt(n) {
  const e = ze(Le(n));
  return e ? e.plain ?? (e.ssml ? U(e.ssml) : "") : "";
}
function Ja(n) {
  const e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map();
  let s = 0, i;
  return n.forEach((a, r) => {
    e.set(a, r + 1);
    const o = a.children ?? [];
    if (s = Math.max(s, o.length), o.some((l) => l.role?.has("columnheader"))) {
      i = o.map(Pt);
      return;
    }
    i && o.forEach((l, c) => {
      if (!l.role?.has("cell") && !l.role?.has("rowheader")) return;
      const u = i[c];
      u && t.set(l, u);
    });
  }), { lines: n.length, columns: s, rowNumbers: e, cellHeaders: t };
}
function ds(n, e) {
  const t = e.format === "ssml" ? { ssml: z(n) } : { plain: n };
  return e.synthetic.add(t), t;
}
function M(n, e) {
  const t = ds(n, e), s = e.language === "none" ? $(void 0, e) : e.contextualizationLanguage;
  return s && (t.language = s), t;
}
function ot(n, e, t) {
  const s = ds(n, t), i = $(cs(e), t);
  return i && (s.language = i), s;
}
function W(n, e, t, s) {
  n.push(...s);
  for (let i = 0; i < s.length; i++) e.push(t);
}
function Ve(n, e, t, s, i, a, r) {
  r ? (i.some((o) => t.blockStarts.has(o)) && t.blockStarts.add(r), W(n, e, a[0] ?? s, [r])) : (n.push(...i), e.push(...a));
}
function G(n, e, t, s) {
  const i = t ? `${e}.${t}` : void 0;
  if (i && n.i18n.exists(i)) return n.i18n.t(i, s);
  if (n.i18n.exists(e)) return n.i18n.t(e, s);
}
function At(n, e) {
  return Zn.has(n) ? !0 : e.contextualize.has(n);
}
function gs(n, e, t) {
  return e.some((s) => {
    const i = za[s];
    return i?.drops.includes(n) ? i.unconditional || At(s, t) : !1;
  });
}
function ge(n, e, t, s, i) {
  const a = e.lastIndexOf(t);
  if (a === -1) return;
  const r = O(s, i.ancestorChains);
  if (!r) return;
  const o = Y(r.ref, t);
  n.offsets = [{ start: a, end: a + t.length, locate: o }], n.locate = r.own ? r.ref : o;
}
function qe(n, e, t, s, i, a) {
  const r = a?.value;
  if (r !== void 0 && r === Pt(t)) {
    const l = $(t.text?.language, s);
    l && (n.language = l), s.synthetic.delete(n), ge(n, e, r, t, s);
    return;
  }
  const o = a?.description;
  o !== void 0 && o === Be(t) && (i === "figure" || i === "table") && ge(n, e, o, t, s);
}
function sn(n, e, t, s, i, a, r, o) {
  if (!At(i, s)) return;
  if ((s.i18n.exists(`${i}.block.start`) || s.i18n.exists(`${i}.block.end`)) && s.contextualizationShapes[i] !== "inline") {
    const c = a === "before" ? `${i}.block.start` : `${i}.block.end`;
    W(n, e, t, rn(c, r, o, t, i, s));
    return;
  }
  a === "before" && W(n, e, t, rn(`${i}.inline`, r, o, t, i, s));
}
const an = "\0";
function rn(n, e, t, s, i, a) {
  const r = G(a, n, e, t);
  if (!r) return [];
  const o = t?.description, l = a.language !== "none" && o !== void 0 && o === Be(s) ? $(cs(s), a) : void 0, c = l ? G(a, n, e, { ...t, description: an })?.split(an) : void 0;
  if (!l || !c || c.length < 2) {
    const h = M(r, a);
    return qe(h, r, s, a, i, t), [h];
  }
  if (R(l)[0] === R(a.contextualizationLanguage)[0]) {
    const h = M(r, a);
    return h.language = l, qe(h, r, s, a, i, t), [h];
  }
  const u = `<lang xml:lang="${Sn(l)}">${z(o)}</lang>`, d = c.map((h) => z(h)).join(u);
  if (a.format === "ssml") {
    const h = M(r, a);
    return h.ssml = d, qe(h, r, s, a, i, t), [h];
  }
  return dt(d, a.contextualizationLanguage).map((h) => {
    if (h.language !== l) return M(h.plain, a);
    const f = ot(h.plain, s, a);
    return (i === "figure" || i === "table") && ge(f, h.plain, o, s, a), f;
  });
}
function on(n, e, t, s) {
  const i = `${e}.parts.${t}`;
  return n.i18n.exists(i, { count: s }) ? n.i18n.t(i, { count: s }) : String(s);
}
function Za(n) {
  const e = Be(n);
  return e === void 0 ? { variantKey: "unlabelled" } : { variantKey: "labelled", params: { description: e } };
}
function ln(n, e) {
  const t = e.tableCellHeaders.get(n);
  return {
    variantKey: t !== void 0 ? "withHeader" : "withoutHeader",
    params: { header: t ?? "", value: Pt(n) }
  };
}
const Xa = {
  table: (n, e) => {
    const t = (n.children ?? []).filter((i) => i.role?.has("row")), s = Ja(t);
    for (const [i, a] of s.rowNumbers) e.tableRowNumbers.set(i, a);
    for (const [i, a] of s.cellHeaders) e.tableCellHeaders.set(i, a);
    return {
      params: {
        lines: on(e, "table", "lines", s.lines),
        columns: on(e, "table", "columns", s.columns)
      }
    };
  },
  row: (n, e) => ({ params: { count: String(e.tableRowNumbers.get(n) ?? "") } }),
  cell: ln,
  rowheader: ln
};
function cn(n, e, t) {
  const s = Za(e);
  let i = s.variantKey, a = s.params;
  const r = Xa[n]?.(e, t);
  r && (r.variantKey && (i = r.variantKey), a = { ...a, ...r.params });
  const o = t.contextualizationParams?.(n, e);
  return o && (a = { ...a, ...o }), { variantKey: i, params: a };
}
const un = "[\\u0391-\\u03A9\\u03B1-\\u03C9\\u03D8-\\u03E1]", Ya = "[\\u0374\\u02B9\\u0384']", Ge = "[\\u05D0-\\u05EA]", hn = "[\\u0400-\\u0481\\u048A-\\u04FF]", er = [
  new RegExp("^\\p{Nd}+$", "u"),
  new RegExp("^\\p{Nl}+$", "u"),
  /^(?=[MDCLXVI])M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i,
  /^[〇零一二三四五六七八九十百千万]+$/u,
  /^[፩-፼]+$/u,
  new RegExp(`^${Ge}[\\u05F3']$`, "u"),
  new RegExp(`^${Ge}+[\\u05F4"]${Ge}$`, "u"),
  new RegExp(`^(?:\\u0375${un})*${un}+${Ya}$`, "u"),
  /^(?:[Ա-Ֆա-և]̅)+$/u,
  new RegExp(`^\\u0482?${hn}+\\u0483${hn}*$`, "u")
];
function tr(n) {
  const e = n.trim();
  return e.length > 0 && er.some((t) => t.test(e));
}
function dn(n, e) {
  return e.skip.size > 0 && n.some((t) => e.skip.has(t) && !wt.has(t) && !gs(t, n, e));
}
function Lt(n, e) {
  const t = n.find((s) => wt.has(s));
  return t === void 0 ? void 0 : e.interruptions[t] ?? "after";
}
function nr(n, e) {
  const t = ze(n.text);
  if (!t) return [];
  const s = t.plain ?? U(t.ssml ?? "");
  if (tr(s)) {
    const i = G(e, "pagebreak.number", void 0, { number: s.trim() });
    if (i !== void 0) return [M(i, e)];
  }
  return Et(t, e.format, e.language, e);
}
function gn(n) {
  n.plain !== void 0 && (n.plain += "."), n.ssml !== void 0 && (n.ssml += ".");
}
function sr(n, e) {
  const t = nr(n, e);
  if (!e.contextualize.has("pagebreak")) return t;
  const s = e.i18n.exists("pagebreak.block.start") ? "pagebreak.block.start" : "pagebreak.inline", i = G(e, s);
  if (i === void 0) return t;
  const a = M(i, e);
  if (t.length === 0) return [a];
  const r = De([a, ...t], [void 0, ...t.map(() => n)], e);
  return r ? (gn(r), [r]) : (gn(t[t.length - 1]), [a, ...t]);
}
function ir(n, e) {
  const t = ze(Le(n));
  return t ? Et(t, e.format, e.language, e) : [];
}
const He = "", be = "";
function Ot(n) {
  return B(n).includes("term") || (n.children ?? []).some(Ot);
}
const lt = /* @__PURE__ */ new Set();
function fs(n) {
  return Ot(n) ? [n, ...(n.children ?? []).flatMap(fs)] : [];
}
function ps(n, e, t, s, i, a, r) {
  if (e.length === 0) return;
  const o = B(n).find((m) => le.has(m)), l = e.length > 1 ? e.find(Ot) : void 0, c = e.filter((m) => m !== l), u = o && i.contextualize.has(o) ? G(i, `${o}.inline`) : void 0, d = o && r && l ? G(i, `${o}.term`, void 0, { term: He, value: be }) : void 0, h = r ? e : c;
  if (u === void 0 && !d) {
    _(h, t, s, i, a);
    return;
  }
  const f = B(h[0]).some((m) => it.has(m)) && !a, p = [], g = [];
  u !== void 0 && (p.push(M(u, i)), g.push(n));
  const v = a || f, S = [...h, ...l ? fs(l) : []];
  S.forEach((m) => lt.add(m));
  for (const m of (d ?? be).split(new RegExp(`(${He}|${be})`)))
    m === He ? _([l], p, g, i, v) : m === be ? _(c, p, g, i, v) : m && (p.push(M(m, i)), g.push(n));
  S.forEach((m) => lt.delete(m)), f && p.length > 0 && i.blockStarts.add(p[0]);
  for (const [m, C] of Ct(p, i)) {
    const y = p.slice(m, C), b = g.slice(m, C), k = y.length > 1 ? De(y, b, i) : void 0;
    Ve(t, s, i, n, y, b, k);
  }
}
function ms(n, e, t, s, i) {
  n.forEach((a, r) => {
    const o = r === 0 ? i : !1;
    "ref" in a ? ps(a.ref, a.targets, e, t, s, o, !0) : Vt(a.node, e, t, s, o);
  });
}
function vs(n, e) {
  const t = Lt(B(n), e);
  return t !== void 0 && t !== "inline";
}
function ar(n, e, t, s) {
  const i = O(t, s.ancestorChains);
  if (!i) return;
  const a = nt(Y(i.ref, U(e)));
  s.aliasLocates.add(a);
  for (const r of n) {
    const o = s.format === "ssml" ? U(r.ssml ?? "") : r.plain;
    r.locate = a, r.offsets = [{ start: 0, end: o?.length ?? 0, locate: a }], s.edgeSubstitutedLocate.set(r, { leading: a, trailing: a });
  }
}
function rr(n, e, t, s, i, a, r) {
  const o = n.text?.language, l = $(o, i), c = new Map((n.children ?? []).map((y) => [y.id, y])), u = [], d = [], h = [], f = /* @__PURE__ */ new Set(), p = /* @__PURE__ */ new Set(), g = /* @__PURE__ */ new Set(), v = i.segmentation === "sentence", S = i.interruptions.abbreviation === "never", m = i.interruptions.abbreviation === "inline", C = (y, b) => {
    if (y.abbreviation !== "alias") return;
    const k = u.slice(b);
    ar(k, y.abbreviationText, n, i), k.forEach((w) => g.add(w));
  };
  for (let y of xi(e)) {
    if (y.abbreviation && (y.abbreviation === "text" ? m : S)) continue;
    if (y.abbreviation === "alias" && !m && (y = { ...y, ssml: y.parenthesizedSsml }), y.placeholderId !== void 0) {
      const w = c.get(y.placeholderId);
      if (!w) continue;
      if (vs(w, i)) {
        const E = B(w), I = E.some((L) => le.has(L));
        if (I)
          for (const L of ir(w, i))
            u.push(L), d.push(w);
        const A = I ? Lt(E, i) === "never" || !w.children?.length ? [] : [{ ref: w, targets: w.children }] : [{ node: w }];
        for (const L of A)
          if (h.push(L), v) {
            const K = u.length;
            ms([L], u, d, i, h.length === 1 && (a || r)), u.slice(K).forEach((x) => p.add(x));
          }
      } else {
        const E = u.length;
        Vt(w, u, d, i, a), B(w).some((I) => wt.has(I)) && u.slice(E).forEach((I) => f.add(I));
      }
      continue;
    }
    if (!y.ssml) continue;
    const b = u.length;
    if (i.format === "plain" && i.language !== "block-level" && i.language !== "none" && Tn(y.ssml)) {
      for (const w of dt(y.ssml, o)) {
        const E = { plain: w.plain }, I = $(w.language, i);
        I && (E.language = I), u.push(E), d.push(n);
      }
      C(y, b);
      continue;
    }
    const k = {};
    l && (k.language = l), i.format === "ssml" ? k.ssml = ls(y.ssml, i.languageOverrides) : k.plain = U(y.ssml), (i.language === "block-level" || i.language === "none") && k.ssml && (k.ssml = ts(k.ssml)), u.push(k), d.push(n), C(y, b);
  }
  if (v && h.length + f.size + g.size > 0)
    return u.forEach((y) => {
      const b = f.has(y) ? "inline" : p.has(y) ? "after" : g.has(y) ? "alias" : void 0;
      i.placeholderPieces.set(y, { node: n, placement: b });
    }), Ve(t, s, i, n, u, d, void 0), [];
  for (const [y, b] of Ct(u, i)) {
    const k = u.slice(y, b), w = d.slice(y, b), E = k.length > 1 ? De(k, w, i) : void 0;
    Ve(t, s, i, n, k, w, E);
  }
  return h;
}
function Vt(n, e, t, s, i) {
  const a = B(n), r = Be(n), o = Lt(a, s) === "never", l = o && a.some((g) => le.has(g));
  if (dn(a, s) || o && !l) return;
  const c = a.some((g) => it.has(g)), u = c && !i, d = e.length, h = lt.has(n) ? [] : a.filter(
    (g) => g !== "footnote" && g !== "pagebreak" && !le.has(g) && !gs(g, a, s)
  ), f = a.some((g) => _a.has(g) && s.contextualize.has(g)), p = a.includes("table") && r !== void 0 && !f;
  if (p) {
    const g = ot(r, n, s);
    ge(g, r, r, n, s), W(e, t, n, [g]);
  }
  for (const g of h) {
    if (g === "figure" && r === void 0) continue;
    const { variantKey: v, params: S } = cn(g, n, s);
    sn(e, t, n, s, g, "before", v, S);
  }
  if (a.includes("noteref"))
    for (const g of n.children ?? []) {
      const v = B(g);
      if (!dn(v, s))
        if (v.includes("footnote")) {
          const S = s.contextualize.has("footnote"), m = s.i18n.exists("footnote.block.start") || s.i18n.exists("footnote.block.end"), C = v.some((L) => it.has(L)) && !i && s.interruptions.noteref !== "inline", y = S ? G(s, m ? "footnote.block.start" : "footnote.inline") : void 0, b = S && (y !== void 0 || m), k = [], w = [];
          y !== void 0 && (k.push(M(y, s)), w.push(g));
          const E = [], I = [];
          if (_([g], E, I, s, i || C), C && E.length > 0 && s.blockStarts.add(E[0]), k.push(...E), w.push(...I), b && m) {
            const L = G(s, "footnote.block.end");
            L !== void 0 && (k.push(M(L, s)), w.push(g));
          }
          const A = b && k.length > 1 ? De(k, w, s) : void 0;
          Ve(e, t, s, g, k, w, A);
        } else
          _([g], e, t, s, i);
    }
  else if (!a.some((g) => $a.has(g))) {
    const g = Le(n)?.ssml, v = a.some((S) => Zn.has(S) && At(S, s));
    if (g && Ui(g) && !v) {
      const S = rr(n, g, e, t, s, i, c);
      if (S.length > 0) {
        const m = i || c && e.length > d;
        ms(S, e, t, s, m);
      }
    } else if (a.includes("pagebreak")) {
      if (W(e, t, n, sr(n, s)), n.children) {
        const S = i || c && e.length > d;
        _(n.children, e, t, s, S);
      }
    } else {
      const S = v ? void 0 : ze(Le(n));
      if (S && W(e, t, n, Et(S, s.format, s.language, s)), n.children && !l) {
        const m = i || c && e.length > d;
        a.some((C) => le.has(C)) ? ps(n, n.children, e, t, s, m, vs(n, s)) : _(n.children, e, t, s, m);
      }
    }
  }
  if (u && e.length > d && s.blockStarts.add(e[d]), r !== void 0 && !f && !p) {
    const g = ot(r, n, s);
    a.includes("figure") && ge(g, r, r, n, s), W(e, t, n, [g]);
  }
  for (const g of h) {
    if (g === "figure" && r === void 0) continue;
    const { variantKey: v, params: S } = cn(g, n, s);
    sn(e, t, n, s, g, "after", v, S);
  }
}
function _(n, e, t, s, i) {
  n.forEach((a, r) => Vt(a, e, t, s, r === 0 ? i : !1));
}
const or = On;
async function ys(n, e, t, s) {
  const i = or(n);
  let a = "";
  const r = [];
  for (const h of i)
    r.push(a.length), h.kind === "text" ? a += h.text : h.kind === "paired" && (a += h.innerText);
  if (!a) return;
  const o = await t(e, a, s);
  if (o.length <= 1) return;
  const l = [];
  let c = "", u = 0;
  function d(h, f, p) {
    let g = f;
    const v = f + h.length;
    for (; g < v; ) {
      const S = o[u], m = Math.min(v, S.end), C = m >= S.end && u < o.length - 1;
      let y = h.slice(g - f, m - f);
      C && (y = y.replace(/[ \t\r\n]+$/, ""));
      const b = z(y);
      c += p ? p(b) : b, g = m, C && (l.push(c), c = "", u++);
    }
  }
  return i.forEach((h, f) => {
    if (h.kind === "selfClosing")
      c += h.raw;
    else if (h.kind === "text")
      d(h.text, r[f]);
    else {
      const p = `<${h.tag}${h.attrs}>`, g = `</${h.tag}>`;
      h.innerText ? d(h.innerText, r[f], (v) => `${p}${v}${g}`) : c += p + g;
    }
  }), c && l.push(c.replace(/[ \t\r\n]+$/, "")), l;
}
function Tt(n, e) {
  const t = e.segmenter === Jn ? xa(n) : n;
  return bn(e.segmentationSuppressions, t);
}
async function lr(n, e) {
  const t = n.language ?? "en", s = Tt(t, e), i = e.format === "ssml" ? n.ssml : n.plain;
  if (!i) return;
  const a = await e.segmenter(t, pe(i, e.format), s);
  if (a.length <= 1) return;
  if (e.format !== "ssml") return a.map((o) => ({ text: o.text, start: o.start, end: o.contentEnd }));
  const r = await ys(i, t, e.segmenter, s);
  if (r)
    return a.map((o, l) => ({ text: r[l], start: o.start, end: o.contentEnd }));
}
const fn = /* @__PURE__ */ new Set([
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
function pn(n) {
  return n ? B(Array.isArray(n) ? n[1] : n) : [];
}
function mn(n, e, t) {
  const s = Array.isArray(n) ? n[e === "leading" ? 0 : 1] : n;
  return (t.ancestorChains.get(s) ?? []).filter((i) => B(i).some((a) => a !== "presentation"));
}
function cr(n, e) {
  return n.length === e.length && n.every((t, s) => t === e[s]);
}
function vn(n, e, t, s) {
  const i = s.edgeSubstitutedLocate.get(e)?.[t];
  return i && !s.aliasLocates.has(i) ? !0 : !!n && !Array.isArray(n) && H(n);
}
function te(n, e) {
  return e.placeholderPieces.get(n)?.placement === "inline";
}
function Ss(n, e) {
  return e.placeholderPieces.get(n)?.placement === "alias";
}
function ur(n, e) {
  return e.placeholderPieces.get(n)?.placement === "after";
}
function bs(n, e, t, s) {
  for (const { piece: i, source: a } of n.get(e) ?? [])
    t.push(i), s.push(a);
  n.delete(e);
}
function ct(n, e, t) {
  const s = t.placeholderPieces.get(n)?.node;
  return s !== void 0 && s === t.placeholderPieces.get(e)?.node;
}
function hr(n, e, t, s, i) {
  const a = i.format === "ssml" ? n.ssml : n.plain, r = i.format === "ssml" ? t.ssml : t.plain;
  return !a || !r ? !1 : ct(n, t, i) ? !0 : !(!kt(n.language ?? "en", t.language ?? "en") || i.synthetic.has(n) || i.synthetic.has(t) || !e || !s || pn(e).some((o) => fn.has(o)) || pn(s).some((o) => fn.has(o)) || !cr(mn(e, "trailing", i), mn(s, "leading", i)) || vn(e, n, "trailing", i) || vn(s, t, "leading", i));
}
async function yn(n, e, t, s, i) {
  const a = t.synthetic.has(n) ? void 0 : await lr(n, t);
  if (!a) {
    s.push(n), i.push(e);
    return;
  }
  const r = t.blockStarts.has(n);
  r && t.blockStarts.delete(n);
  const o = Array.isArray(e) ? void 0 : e, l = o ? O(o, t.ancestorChains) : void 0, c = o && H(o) ? X(o, t) : void 0, u = t.edgeSubstitutedLocate.get(n);
  a.forEach(({ text: d, start: h, end: f }, p) => {
    const g = { ...n, [t.format]: d }, v = (p === 0 ? u?.leading : void 0) ?? (p === a.length - 1 ? u?.trailing : void 0) ?? c;
    if (v && l)
      g.locate = v, g.offsets = [{ start: h, end: f, locate: v }];
    else if (l) {
      const S = t.format === "ssml" ? pe(d, t.format) : d, m = Y(l.ref, S);
      g.locate = m, g.offsets = [{ start: h, end: f, locate: m }];
    }
    r && p === 0 && t.blockStarts.add(g), s.push(g), i.push(e);
  });
}
function q(n, e) {
  let t = 0;
  for (; t < n.length - 1 && n[t + 1].start <= e; ) t++;
  return t;
}
async function dr(n, e, t, s) {
  const i = n.map((c) => pe(e.format === "ssml" ? c.ssml : c.plain, e.format)), { joined: a, ranges: r } = Oe(i), o = await e.segmenter(t, a, s), l = new Array(n.length - 1).fill(!1);
  for (const c of o) {
    const u = q(r, c.start), d = c.end > c.start ? q(r, c.end - 1) : u;
    for (let h = u; h < d; h++) l[h] = !0;
  }
  return l;
}
function gr(n, e, t) {
  const s = [...e];
  return n.forEach((i, a) => {
    if (!te(i, t)) return;
    const r = a > 0 && ct(n[a - 1], i, t), o = a < n.length - 1 && ct(i, n[a + 1], t);
    r && !s[a - 1] ? s[a - 1] = !0 : o && (s[a] = !0);
  }), s;
}
function fr(n, e, t, s, i) {
  const a = (c) => te(t[q(s, c)], i), r = (c, u) => q(s, c) === q(s, u) && Ss(t[q(s, c)], i), o = [];
  let l;
  return e.forEach((c, u) => {
    l ??= c;
    const d = e[u + 1];
    d && (a(c.contentEnd - 1) || a(d.start) || r(c.contentEnd - 1, d.start)) || (o.push({ text: n.slice(l.start, c.contentEnd), start: l.start, end: c.end, contentEnd: c.contentEnd }), l = void 0);
  }), o;
}
function pr(n, e, t, s, i, a, r) {
  const o = [];
  for (let l = i; l <= a; l++) {
    if (te(n[l], r) || Ss(n[l], r)) {
      o.push(...us([n[l]], [e[l]], r));
      continue;
    }
    const c = O(e[l], r.ancestorChains);
    if (!c) continue;
    const u = t[l], d = H(e[l]) ? X(e[l], r) : void 0, h = Math.max(u.start, s.start), f = Math.min(u.end, l === a ? s.contentEnd : s.end);
    if (f <= h) continue;
    const p = h - u.start, g = f - u.start, v = pe(r.format === "ssml" ? n[l].ssml : n[l].plain, r.format), S = d ?? Y(c.ref, v.slice(p, g));
    !d && p > 0 && (S.text = { ...S.text, before: v.slice(0, p) }), !d && g < v.length && (S.text = { ...S.text, after: v.slice(g) }), o.push({ start: p, end: g, locate: S });
  }
  return o;
}
function ws(n, e) {
  const t = Wa(n, e);
  return t !== null ? t ?? "en" : n.find((s) => !te(s, e))?.language ?? n[0].language ?? "en";
}
function mr(n, e, t, s, i) {
  const a = q(t, n.start), r = n.end > n.start ? q(t, n.end - 1) : a, o = Ct(e.slice(a, r + 1), i);
  return o.map(([l, c], u) => {
    const d = a + l, h = a + c - 1, f = u === o.length - 1, p = u === 0 ? n.start : t[d].start, g = f ? n.contentEnd : t[h].end, v = f ? n.end : t[h + 1].start, S = rs(e.slice(d, h + 1), i) ?? void 0, m = { text: s.slice(p, g), start: p, end: v, contentEnd: g }, C = o.length > 1 && d === h && te(e[d], i);
    return { boundary: m, startIdx: d, endIdx: h, language: S, sentenceEnd: f ? n.end : void 0, isolated: C };
  });
}
async function vr(n, e, t, s, i, a) {
  const r = ws(n, t), o = Tt(r, t), l = n.map((m) => pe(t.format === "ssml" ? m.ssml : m.plain, t.format)), { joined: c, ranges: u } = Oe(l), d = fr(c, await t.segmenter(r, c, o), n, u, t), f = (d.length > 0 ? d : [{ text: c, start: 0, end: c.length, contentEnd: c.length }]).flatMap((m) => mr(m, n, u, c, t));
  let p, g;
  if (t.format === "ssml") {
    const m = /* @__PURE__ */ new Map();
    for (const y of f) for (let b = y.startIdx; b <= y.endIdx; b++) m.set(b, y.language);
    g = Oe(n.map((y, b) => os(y, m.get(b), t)), l).joined;
    const C = f.map((y) => y.boundary);
    p = f.length > 1 ? await ys(g, r, async () => C, o) : void 0;
  }
  const v = new Set(n.filter((m) => t.blockStarts.has(m))), S = (m, C) => {
    if (m !== void 0)
      for (let y = 0; y < n.length; y++)
        (u[y].end <= m || C === f.length - 1) && bs(a, y, s, i);
  };
  f.forEach(({ boundary: m, startIdx: C, endIdx: y, language: b, sentenceEnd: k, isolated: w }, E) => {
    if (w) {
      s.push(n[C]), i.push(e[C]), S(k, E);
      return;
    }
    const I = t.format === "ssml" ? p ? p[E] : g : m.text, A = { [t.format]: I }, L = t.language === "none" ? $(void 0, t) : b ?? "en";
    L && (A.language = L), n.slice(C, y + 1).filter((se) => v.delete(se)).length > 0 && t.blockStarts.add(A);
    const x = pr(n, e, u, m, C, y, t);
    x.length > 0 && (A.offsets = x);
    const ne = [...Array(y - C + 1).keys()].map((se) => C + se).filter((se) => !te(n[se], t)), D = ne[0] ?? C, me = ne[ne.length - 1] ?? y, Ut = O(e[D], t.ancestorChains), xt = e[D], Nt = (H(xt) ? X(xt, t) : void 0) ?? Rt(Ut, I), zt = D !== me ? It(Ut, O(e[me], t.ancestorChains), Nt) : Nt;
    zt && (A.locate = zt), s.push(A), i.push(D === me ? e[D] : [e[D], e[me]]), S(k, E);
  });
}
async function ks(n, e, t) {
  if (t.segmentation !== "sentence") return { out: n, sources: e };
  const s = [], i = [];
  let a = 0;
  for (; a < n.length; ) {
    let r = a;
    for (; r + 1 < n.length && hr(n[r], e[r], n[r + 1], e[r + 1], t); ) r++;
    if (r === a) {
      await yn(n[a], e[a], t, s, i), a = r + 1;
      continue;
    }
    const o = [], l = [], c = /* @__PURE__ */ new Map();
    for (let p = a; p <= r; p++)
      if (!ur(n[p], t))
        o.push(n[p]), l.push(e[p]);
      else if (o.length === 0)
        s.push(n[p]), i.push(e[p]);
      else {
        const g = o.length - 1;
        c.set(g, [...c.get(g) ?? [], { piece: n[p], source: e[p] }]);
      }
    if (o.length === 0) {
      a = r + 1;
      continue;
    }
    const u = ws(o, t), d = await dr(o, t, u, Tt(u, t)), h = gr(o, d, t);
    let f = 0;
    for (let p = 0; p < o.length; p++)
      if (!(p < o.length - 1 && h[p])) {
        if (f === p)
          await yn(o[f], l[f], t, s, i), bs(c, f, s, i);
        else {
          const g = /* @__PURE__ */ new Map();
          for (let v = f; v <= p; v++) c.has(v) && g.set(v - f, c.get(v));
          await vr(o.slice(f, p + 1), l.slice(f, p + 1), t, s, i, g);
        }
        f = p + 1;
      }
    a = r + 1;
  }
  return { out: s, sources: i };
}
function Cs(n, e) {
  return Object.keys(e.substitutions).length === 0 ? n : n.map((t) => {
    if (t.ssml) {
      const { ssml: o, plain: l, map: c } = Ci(t.ssml, e.substitutions);
      if (o === t.ssml) return t;
      const u = { ...t, ssml: o };
      return en(u, { plain: l, map: c }), u;
    }
    const s = t.plain;
    if (!s) return t;
    const { text: i, map: a } = wi(s, e.substitutions);
    if (i === s) return t;
    const r = { ...t, plain: i };
    return en(r, { plain: s, map: a }), r;
  });
}
async function Ur(n, e = {}) {
  const t = [], s = [], i = await es(n, e);
  _(n, t, s, i, !1);
  const a = await ks(t, s, i);
  return Cs(hs(a.out, a.sources, i), i);
}
async function yr(n, e = {}) {
  const t = [], s = [], i = await es(n, e);
  _(n, t, s, i, !1);
  const a = await ks(t, s, i), r = a.out.map((l) => i.blockStarts.has(l)), o = hs(a.out, a.sources, i);
  return { utterances: Cs(o, i), sources: a.sources, blockStarts: r };
}
class xr {
  engine;
  contentQueue = [];
  // `contentQueue` as loaded, before `voice` stamped it — re-stamped when that changes.
  loadedQueue = [];
  events = new Ne();
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
    this.engine = e, this._defaults = new la(t.defaults), this._preferences = new de(t.preferences), this._settings = new _e(this._preferences, this._defaults), this.contextualizationOverrides = t.contextualizationOverrides, this.segmentationOverrides = t.segmentationOverrides, this.setupEngineListeners(), this.applyEngineParameters(), this.initializeEngine();
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
      const { charIndex: t, charLength: s } = e.detail ?? {}, i = this.loadedQueue[this.getCurrentUtteranceIndex()], a = i && typeof t == "number" && typeof s == "number" ? pa(i, t, s) : void 0;
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
  setContentQueue(e, t = null, s = null) {
    this.clearPendingAdvance(), this.pendingAutoPauseIndex = null, (this.navigatorState === "playing" || this.navigatorState === "paused") && this.engine.stop(), this.loadedQueue = Array.isArray(e) ? [...e] : [e];
    const i = this.loadedQueue.map((a) => this.withVoice(this.withLanguage(a)));
    this.contentQueue = i, this.pendingResumeIndex = t, this.pendingResumeState = s, this.setNavigatorState("loading"), this.emitEvent({ type: "loading" }), this.engine.loadUtterances(i, t ?? void 0), this.emitContentChangeEvent({ content: i });
  }
  // The content's language when a loadContent() utterance has none; extraction applies it to loadGndContent()'s.
  withLanguage(e) {
    return this.source !== void 0 || this.contentLanguage === void 0 || e.language ? e : { ...e, language: this.contentLanguage };
  }
  // The utterance's own voice, else `voice`'s for its language.
  withVoice(e) {
    const t = this._settings.voice;
    if (e.voice || !t) return e;
    const s = typeof t == "string" ? t : e.language && ut(t, e.language);
    return s ? { ...e, voice: s } : e;
  }
  // Re-runs extraction from `this.source`, resuming near the old position if playback was underway.
  async reextract() {
    if (!this.source) return;
    const { index: e, state: t } = this.resumeTarget(), s = this.contentSources, { utterances: i, sources: a, blockStarts: r } = await yr(this.source, {
      format: this._settings.format,
      interruptions: this._settings.interruptions,
      skip: this._settings.skip,
      contextualize: this._settings.contextualize,
      contextualization: {
        contextualizations: this.contextualizationOverrides?.contextualizations,
        shapes: ga(this._settings.verbosity, this.contextualizationOverrides?.shapes),
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
    const o = t && e !== null ? this.resolveResumeIndex(s, e, a) : null;
    this.setContentQueue(i, o, t);
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
    const t = this._settings.segmentation, s = ma(e, t);
    if (!s.length) return;
    const i = t === "sentence" ? "sentence" : "structure";
    this.emitEvent({
      type: "boundary",
      detail: { name: i, charIndex: 0, charLength: (e.plain ?? "").length, locate: s }
    });
  }
  emitContentChangeEvent(e) {
    this.events.emit("contentchange", { type: "contentchange", detail: e });
  }
  // Preferences API (Configurable<SpeechSettings, SpeechPreferences>)
  // With the engine's voice, which content without its own is spoken with; utterances are stamped from the preference alone.
  get settings() {
    return new _e(this._preferences, this._defaults, this.engine.getCurrentVoice());
  }
  // Rebuilt, staged edits kept, once the engine's voice changes, e.g. when it picks its default after being read.
  get preferencesEditor() {
    const e = this.engine.getCurrentVoice(), t = e ? jn(e) : null;
    return (this._preferencesEditor === null || t !== this.preferencesEditorEngineVoice) && (this._preferencesEditor = new Xt(this._preferencesEditor?.preferences ?? this._preferences, this.settings), this.preferencesEditorEngineVoice = t), this._preferencesEditor;
  }
  async submitPreferences(e) {
    !this.source && this.contentQueue.length > 0 && Jt.some((t) => e[t] !== void 0) && console.warn(
      "submitPreferences(): extraction-affecting preferences (format, interruptions, verbosity, skip, contextualize, language, languageOverrides, segmentation) have no effect on content loaded via loadContent() — use loadGndContent() to re-extract on submission."
    ), this._preferences = this._preferences.merging(e), await this.applyPreferences();
  }
  async applyPreferences() {
    const e = this._settings;
    if (this._settings = new _e(this._preferences, this._defaults), this.applyEngineParameters(), this._preferencesEditor !== null && (this._preferencesEditor = new Xt(this._preferences, this.settings)), Jt.some((t) => !this.sameSettingValue(e[t], this._settings[t])))
      await this.reextract();
    else if (this.loadedQueue.length > 0 && !this.sameSettingValue(e.voice, this._settings.voice)) {
      const { index: t, state: s } = this.resumeTarget();
      this.setContentQueue(this.loadedQueue, t, s);
    }
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
    this.clearPendingAdvance(), this.events.clear(), await this.engine.destroy();
  }
}
export {
  Or as BooleanPreference,
  ae as EnumPreference,
  Pr as FallbackEngineProvider,
  sa as FallbackSpeechEngine,
  Br as Locator,
  Dr as LocatorLocations,
  jr as LocatorText,
  Z as Preference,
  ye as RangePreference,
  ra as ReadiumSpeechDecorationController,
  xr as ReadiumSpeechNavigator,
  Lr as ReadiumSpeechProviderRegistry,
  la as SpeechDefaults,
  de as SpeechPreferences,
  Xt as SpeechPreferencesEditor,
  Bn as SpeechServerAudioDecodeError,
  Yi as SpeechServerEngine,
  Ir as SpeechServerEngineProvider,
  ue as SpeechServerError,
  Dn as SpeechServerNetworkError,
  Mn as SpeechServerStallError,
  _e as SpeechSettings,
  Zt as StringArrayPreference,
  Wt as WebSpeechEngine,
  Rr as WebSpeechEngineProvider,
  P as WebSpeechVoiceManager,
  yt as autoPauseScopes,
  Na as blockLevelRoles,
  ce as chineseVariantMap,
  Bi as chunkPlainText,
  ji as chunkSsmlText,
  kn as compareAlphabetically,
  wn as compareByPreferredRegion,
  da as contextualizationShapesAtVerbosity,
  ha as contextualizedAtVerbosity,
  ee as createJsonOrderMap,
  aa as createLocator,
  Kn as defaultContextualizations,
  R as extractLangRegionFromBCP47,
  Ur as extractUtterances,
  vt as extractionFormats,
  Jt as extractionPreferenceKeys,
  ht as filterByBoundarySupport,
  Ks as filterByLanguages,
  Ft as filterOutNoveltyVoices,
  _t as filterOutVeryLowQualityVoices,
  We as getLanguageDisplayName,
  ke as getQualityValue,
  jn as getVoiceId,
  xe as groupVoicesByLanguage,
  Ma as interruptionRoles,
  Je as isNoveltyVoice,
  ea as isRecoverableFailure,
  Ze as isVeryLowQualityVoice,
  mt as languageModes,
  zn as mapServerVoice,
  _i as mimeTypeForFormat,
  Re as pauseDurationRangeConfig,
  En as pickBestVoiceByRegion,
  Pe as pitchRangeConfig,
  Ie as rateRangeConfig,
  pa as resolveBoundaryLocate,
  ma as resolveUtteranceLocate,
  St as segmentationModes,
  Wi as selectBitrate,
  Gi as selectFormat,
  Ar as setupDecorations,
  Vr as shapeableRoles,
  Tr as skippableRoles,
  ua as skippedAtVerbosity,
  Qe as sortAlphabetically,
  js as sortByPreferredRegion,
  Q as sortByQuality,
  Cn as sortVoicesByRegions,
  oe as toSpeechServerError,
  ut as valueForLanguage,
  pt as verbosityPresets,
  Ae as volumeRangeConfig
};
