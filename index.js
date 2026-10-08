import { DecorationController as yn, DirectCommsChannel as Sn, Decorator as bn } from "@readium/decorator";
export * from "@readium/decorator";
import { LocatorText as wn, LocatorLocations as kn, Locator as Cn } from "@readium/shared";
import { Locator as ma, LocatorLocations as va, LocatorText as ya } from "@readium/shared";
import { startsWithBindingPunct as te, ssmlTextEscape as B, BINDING_PUNCT_CLASS as K } from "@readium/helpers";
import En from "i18next";
import { decodeTextref as et, combineDomRangeTextrefs as Rn, substitutedOwnSelector as In, isAriaSubstituted as ne } from "@readium/guided-navigation";
import { DomRange as Pn, DomRangePoint as tt } from "@readium/shared/html";
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
}, ve = (n, e) => {
  const t = e.toLowerCase().replace(/_/g, "-"), [s] = k(e);
  let i;
  for (const a of [s, t])
    for (const [r, o] of Object.entries(n))
      r.toLowerCase().replace(/_/g, "-") === a && (i ??= /* @__PURE__ */ new Set(), o.forEach((l) => i.add(l)));
  return i && [...i];
}, V = {
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
}, Re = /* @__PURE__ */ new Map(), An = /* @__PURE__ */ Object.assign({ "../../json/ar.json": () => import("./ar-BGKtJRyt.js"), "../../json/bg.json": () => import("./bg-D9Q1JriY.js"), "../../json/bho.json": () => import("./bho-CpuLBMN3.js"), "../../json/bn.json": () => import("./bn-Bpn_lzoe.js"), "../../json/ca.json": () => import("./ca-5hzouNcE.js"), "../../json/cmn.json": () => import("./cmn-DlnYMCd8.js"), "../../json/cs.json": () => import("./cs-CDpMkMNO.js"), "../../json/da.json": () => import("./da-XWCfWAwB.js"), "../../json/de.json": () => import("./de-DU0USiOh.js"), "../../json/el.json": () => import("./el-ClBwbIAW.js"), "../../json/en.json": () => import("./en-l3wcpTw3.js"), "../../json/es.json": () => import("./es-DwOFJY07.js"), "../../json/eu.json": () => import("./eu-DxWirHU-.js"), "../../json/fa.json": () => import("./fa-Ml9KtIw1.js"), "../../json/fi.json": () => import("./fi-Dk-5Fhhl.js"), "../../json/fr.json": () => import("./fr-MfhjukJ4.js"), "../../json/gl.json": () => import("./gl-DwtzWds9.js"), "../../json/he.json": () => import("./he-CfajFNE_.js"), "../../json/hi.json": () => import("./hi-pv2ttBoh.js"), "../../json/hr.json": () => import("./hr-MRApcEKR.js"), "../../json/hu.json": () => import("./hu-DGRDZdHH.js"), "../../json/id.json": () => import("./id-DZUuUiTG.js"), "../../json/it.json": () => import("./it-DJUYnjyj.js"), "../../json/ja.json": () => import("./ja-BpFcZRMu.js"), "../../json/kk.json": () => import("./kk-C480t1iH.js"), "../../json/kn.json": () => import("./kn-BVqs26qv.js"), "../../json/ko.json": () => import("./ko-TNoPZd6N.js"), "../../json/mr.json": () => import("./mr-DstAHTvT.js"), "../../json/ms.json": () => import("./ms-BceBSD-j.js"), "../../json/nb.json": () => import("./nb-CwPbwG-i.js"), "../../json/nl.json": () => import("./nl-BmW-Dmw5.js"), "../../json/pl.json": () => import("./pl-CH8qoDu8.js"), "../../json/pt.json": () => import("./pt-CjCENn24.js"), "../../json/ro.json": () => import("./ro-BlJN7qkA.js"), "../../json/ru.json": () => import("./ru-udzq1D5e.js"), "../../json/sk.json": () => import("./sk-VAEHsTWJ.js"), "../../json/sl.json": () => import("./sl-DaZQ1gp0.js"), "../../json/sv.json": () => import("./sv-CicHwXe4.js"), "../../json/ta.json": () => import("./ta-CvpRY89g.js"), "../../json/te.json": () => import("./te-D5TcdW9V.js"), "../../json/th.json": () => import("./th-CYakoFVa.js"), "../../json/tr.json": () => import("./tr-BfYrcAz7.js"), "../../json/uk.json": () => import("./uk-BVs6lQbX.js"), "../../json/vi.json": () => import("./vi-DP1xN9KL.js"), "../../json/wuu.json": () => import("./wuu-C6uQvT6g.js"), "../../json/yue.json": () => import("./yue-C8kEWdfv.js") });
async function xn(n) {
  try {
    const e = n.split("-")[0], t = An[`../../json/${e}.json`];
    if (!t)
      throw new Error(`No voice data found for language: ${n}`);
    const i = (await t()).default;
    return {
      ...i,
      voices: i.voices.map(Un)
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
function nt(n) {
  return Re.has(n) || Re.set(n, xn(n)), Re.get(n);
}
const Ln = ["veryLow", "low", "normal", "high", "veryHigh"], On = ["android", "apple"], Un = (n) => ({
  ...n,
  quality: n.quality?.filter((e) => Ln.includes(e)),
  localizedName: n.localizedName && On.includes(n.localizedName) ? n.localizedName : void 0
}), Q = {
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
}, L = (n) => {
  if (!n) return "";
  let e = n.toLowerCase().replace(/_/g, "-");
  if (/\w{2,3}-\w{2,3}/.test(e)) {
    const [t, s] = e.split("-");
    e = `${t.toLowerCase()}-${s.toUpperCase()}`;
  }
  return Q[e] || e;
}, Ae = async (n) => {
  if (!n) return [];
  try {
    const e = L(n);
    try {
      const s = await nt(e);
      if (s?.voices?.length)
        return s.voices;
    } catch (s) {
      console.warn(`Failed to load voices for ${e}:`, s);
    }
    const [t] = k(e);
    if (t !== e)
      try {
        const s = await nt(t);
        if (s?.voices?.length)
          return s.voices;
      } catch (s) {
        console.warn(`Failed to load voices for base language ${t}:`, s);
      }
    return [];
  } catch (e) {
    return console.error(`Error in getVoices for ${n}:`, e), [];
  }
}, xe = (n, e) => {
  try {
    return new Intl.DisplayNames(
      e ? [e] : [],
      { type: "language", languageDisplay: "standard" }
    ).of(n) || n.toUpperCase();
  } catch {
    return n.toUpperCase();
  }
}, st = (n) => {
  if (!n) return "";
  try {
    const e = L(n), t = V[e];
    if (t?.testUtterance)
      return t.testUtterance;
    if (e in Q) {
      const i = Q[e];
      if (i && V[i]?.testUtterance)
        return V[i].testUtterance;
    }
    const [s] = k(e);
    return s !== e && V[s]?.testUtterance ? V[s].testUtterance : "";
  } catch (e) {
    return console.error(`Error in getTestUtterance for ${n}:`, e), "";
  }
}, ye = (n) => {
  if (!n) return "";
  try {
    const e = L(n), t = V[e];
    if (t?.defaultRegion)
      return `${e}-${t.defaultRegion}`;
    if (e in Q) {
      const i = Q[e];
      if (i) {
        const a = V[i];
        if (a?.defaultRegion)
          return `${i}-${a.defaultRegion}`;
      }
    }
    const [s] = k(e);
    if (s !== e) {
      const i = V[s];
      if (i?.defaultRegion)
        return `${s}-${i.defaultRegion}`;
    }
    return "";
  } catch (e) {
    return console.error(`Failed to get default region for ${n}:`, e), "";
  }
}, Se = (n) => {
  if (!n?.length) return [];
  const e = /* @__PURE__ */ new Set(), t = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map();
  for (const [i, a] of n.entries()) {
    if (!a) continue;
    const r = L(a), [o, l] = k(r);
    l && (e.add(l), s.has(l) || s.set(l, i)), t.has(o) || t.set(o, /* @__PURE__ */ new Set()), l && t.get(o).add(l);
  }
  return Array.from(t.entries()).map(([i, a]) => {
    const r = new Set(
      V[i]?.availableRegions || []
    ), o = Array.from(a), l = Array.from(e).filter(
      (u) => r.has(u) && !o.includes(u)
    ), c = Array.from(/* @__PURE__ */ new Set([...o, ...l])).sort((u, g) => {
      const h = s.get(u) ?? Number.MAX_SAFE_INTEGER, d = s.get(g) ?? Number.MAX_SAFE_INTEGER;
      return h - d;
    });
    if (c.length === 0) {
      const u = ye(i), [, g] = k(u);
      g && c.push(g);
    }
    return {
      baseLang: i,
      regions: c
    };
  });
}, _ = async (n) => {
  const e = /* @__PURE__ */ new Map();
  for (const s of n) {
    if (s.source !== "json") continue;
    const [i] = k(s.language);
    e.has(i) || e.set(i, []), e.get(i).push(s);
  }
  const t = /* @__PURE__ */ new Map();
  for (const [s, i] of e.entries()) {
    const a = /* @__PURE__ */ new Map(), r = await Ae(s), o = /* @__PURE__ */ new Map();
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
}, Vn = {
  veryLow: 1,
  low: 2,
  normal: 3,
  high: 4,
  veryHigh: 5
}, ce = (n) => n ? Vn[n] ?? 0 : 0, j = (n, e, t, s) => {
  const i = ce(n.quality), a = ce(e.quality);
  if (t && s && n.source === "json" && e.source === "json") {
    const r = t.get(s);
    if (r) {
      const o = r.get(n.name), l = r.get(e.name);
      if (o !== void 0 && l !== void 0)
        return o - l;
    }
  }
  return a !== i ? a - i : n.name.localeCompare(e.name);
}, be = (n, e) => {
  const t = new Map(e.map((a) => [a.baseLang, a])), s = /* @__PURE__ */ new Map(), i = [];
  for (const a of n) {
    const [r] = k(a.language);
    t.get(r) ? (s.has(r) || s.set(r, []), s.get(r).push(a)) : i.push(a);
  }
  return { voicesByLang: s, otherLangVoices: i };
}, Nt = (n, e, t, s) => {
  const [, i] = k(n.language), [, a] = k(e.language), r = i && t.regions.includes(i), o = a && t.regions.includes(a);
  if (r && o) {
    const h = t.regions.indexOf(i), d = t.regions.indexOf(a);
    return h === d ? j(n, e, s, t.baseLang) : h - d;
  }
  if (r) return -1;
  if (o) return 1;
  const l = ye(t.baseLang), [, c] = k(l), u = !!c && i === c, g = !!c && a === c;
  if (u && !g) return -1;
  if (!u && g) return 1;
  if (i && a) {
    const h = i.localeCompare(a);
    return h !== 0 ? h : j(n, e, s, t.baseLang);
  }
  return i ? -1 : a ? 1 : j(n, e, s, t.baseLang);
}, Tn = async (n, e, t) => {
  const s = t ?? await _(n);
  n.sort((i, a) => Nt(i, a, e, s));
}, Bt = (n, e, t) => {
  const [s] = k(n.language), [i] = k(e.language), a = xe(s).toLowerCase(), r = xe(i).toLowerCase(), o = a.localeCompare(r);
  if (o !== 0)
    return o;
  if (s === i) {
    const l = ye(s), [, c] = k(n.language), [, u] = k(e.language), g = l && c === l.split("-")[1], h = l && u === l.split("-")[1];
    if (g && !h) return -1;
    if (!g && h) return 1;
    if (c && u) {
      const d = c.localeCompare(u);
      if (d !== 0)
        return d;
    }
    return c && !u ? -1 : !c && u ? 1 : j(n, e, t, s);
  }
  return j(n, e, t, s);
}, Le = async (n, e) => {
  const t = e ?? await _(n);
  n.sort((s, i) => Bt(s, i, t));
}, zn = async (n, e) => {
  if (!e?.length) return [];
  const t = Se(n || []), { voicesByLang: s, otherLangVoices: i } = be(e, t), a = await _(e), r = [];
  for (const o of t) {
    const l = s.get(o.baseLang);
    l && (await Tn(l, o, a), r.push(...l));
  }
  return await Le(i, a), r.push(...i), r;
}, Nn = async (n, e) => {
  if (!e.length) return null;
  const [t] = Se([n]), { voicesByLang: s, otherLangVoices: i } = be(e, [t]), a = s.get(t.baseLang), r = a?.length ? a : i, o = await _(e), l = a?.length ? (c, u) => Nt(c, u, t, o) : (c, u) => Bt(c, u, o);
  return r.reduce((c, u) => l(u, c) < 0 ? u : c);
}, Mt = (n, e) => {
  const t = n.filter((s) => s.controls?.boundary !== !1 === e);
  return t.length > 0 ? t : n;
}, Bn = [{ name: "Albert", nativeID: ["com.apple.speech.synthesis.voice.Albert"], note: "This novelty voice is part of a pack preloaded by Apple.", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Bad News", nativeID: ["com.apple.speech.synthesis.voice.BadNews"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Mauvaises nouvelles", "Malas noticias", "Brutte notizie"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Bahh", nativeID: ["com.apple.speech.synthesis.voice.Bahh"], note: "This novelty voice is part of a pack preloaded by Apple.", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Bells", nativeID: ["com.apple.speech.synthesis.voice.Bells"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Cloches", "Campanas", "Campane"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Boing", nativeID: ["com.apple.speech.synthesis.voice.Boing"], note: "This novelty voice is part of a pack preloaded by Apple.", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Bubbles", nativeID: ["com.apple.speech.synthesis.voice.Bubbles"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Bulles", "Burbujas", "Bollicine"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Cellos", nativeID: ["com.apple.speech.synthesis.voice.Cellos"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Violoncelles", "Violonchelos", "Violoncelli"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Good News", nativeID: ["com.apple.speech.synthesis.voice.GoodNews"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Bonnes nouvelles", "Buenas noticias", "Buone notizie"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Jester", nativeID: ["com.apple.speech.synthesis.voice.Hysterical"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Bouffon", "Bufón", "Giullare"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Organ", nativeID: ["com.apple.speech.synthesis.voice.Organ"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Orgue", "Órgano", "Organo"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Superstar", nativeID: ["com.apple.speech.synthesis.voice.Princess"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Superestrella"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Trinoids", nativeID: ["com.apple.speech.synthesis.voice.Trinoids"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Trinoïdes"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Whisper", nativeID: ["com.apple.speech.synthesis.voice.Whisper"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Murmure", "Susurro", "Sussurro"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Wobble", nativeID: ["com.apple.speech.synthesis.voice.Deranged"], note: "This novelty voice is part of a pack preloaded by Apple.", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Zarvox", nativeID: ["com.apple.speech.synthesis.voice.Zarvox"], note: "This novelty voice is part of a pack preloaded by Apple.", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }], Mn = {
  voices: Bn
}, Dn = [{ name: "Eddy", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Flo", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Grandma", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Grandpa", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Jacques", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Reed", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Rocko", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Sandy", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Shelley", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Fred", language: "en-US", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Junior", language: "en-US", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Kathy", language: "en-US", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Ralph", language: "en-US", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "eSpeak Arabic", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ar", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Bulgarian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "bg", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Bengali", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "bn", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Catalan", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ca", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Chinese (Mandarin, latin as English)", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "cmn", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Czech", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "cs", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Danish", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "da", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak German", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "de", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Greek", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "el", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Spanish (Spain)", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "es", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Estonian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "et", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Finnish", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "fi", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Gujarati", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "gu", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Croatian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "hr", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Hungarian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "hu", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Indonesian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "id", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Italian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "it", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Kannada", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "kn", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Korean", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ko", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Lithuanian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "lt", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Latvian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "lv", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Malayalm", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ml", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Marathi", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "mr", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Malay", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ms", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Norwegian Bokmål", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "nb", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Polish", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "pl", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Portuguese (Brazil)", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "pt-br", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Romanian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ro", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Russian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ru", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Slovak", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "sk", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Slovenian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "sl", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Serbian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "sv", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Swedish", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "sv", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Swahili", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "sw", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Tamil", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ta", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Telugu", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "te", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Turkish", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "tr", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Vietnamese (Northern)", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "vi", os: ["ChromeOS"], preloaded: !0 }], jn = {
  voices: Dn
}, Fn = Mn, _n = jn, Oe = (n, e) => Fn.voices.some(
  (t) => n.includes(t.name) || e && t.nativeID?.some((s) => e.includes(s)) || t.altNames?.some((s) => n.includes(s))
), Ue = (n, e) => _n.voices.some(
  (t) => n.includes(t.name)
) || e === "veryLow", it = (n) => n?.length ? n.filter((e) => !(e.isNovelty || Oe(e.name, e.voiceURI))) : [], at = (n) => n?.length ? n.filter((e) => !Ue(e.name, e.quality)) : [], Hn = (n, e) => {
  const t = Array.isArray(e) ? e : [e];
  return n.filter((s) => t.some((i) => {
    const a = i.toLowerCase(), r = s.language?.toLowerCase(), o = s.altLanguage?.toLowerCase();
    if (r === a || o === a)
      return !0;
    const [l] = a.split("-");
    return r && r.startsWith(l) || o && o.startsWith(l);
  }));
}, qn = { ar: { normal: "محسن", high: "استثنائي" }, ca: { normal: "millorada", high: "prèmium" }, "cmn-CN": { normal: "优化音质", high: "高音质" }, "cmn-TW": { normal: "增強音質", high: "高音質" }, cs: { normal: "vylepšená verze", high: "prémiový" }, da: { normal: "forbedret", high: "høj kvalitet" }, de: { normal: "erweitert", high: "premium" }, el: { normal: "βελτιωμένη", high: "υψηλής ποιότητας" }, en: { normal: "Enhanced", high: "Premium" }, es: { normal: "mejorada", high: "premium" }, fi: { normal: "parannettu", high: "korkealaatuinen" }, fr: { normal: "premium", high: "de qualité" }, he: { normal: "משופר", high: "פרימיום" }, hi: { normal: "बेहतर", high: "प्रीमियम" }, hr: { normal: "poboljšani", high: "vrhunski" }, hu: { normal: "továbbfejlesztett", high: "prémium" }, id: { normal: "Ditingkatkan", high: "Premium" }, it: { normal: "ottimizzata", high: "premium" }, ja: { normal: "拡張", high: "プレミアム" }, ko: { normal: "고품질", high: "프리미엄" }, ms: { normal: "Dipertingkat", high: "Premium" }, nb: { normal: "forbedret", high: "premium" }, nl: { normal: "verbeterd", high: "premium" }, pl: { normal: "rozszerzony", high: "premium" }, pt: { normal: "melhorada", high: "premium" }, ro: { normal: "îmbunătățită", high: "premium" }, ru: { normal: "улучшенный", high: "высшее качество" }, sk: { normal: "vylepšený", high: "prémiový" }, sl: { normal: "izboljšano", high: "prvovrsten" }, sv: { normal: "förbättrad", high: "premium" }, th: { normal: "คุณภาพสูง", high: "คุณภาพสูง" }, tr: { normal: "Geliştirilmiş", high: "Yüksek Kaliteli" }, uk: { normal: "вдосконалений", high: "високої якості" }, vi: { normal: "Nâng cao", high: "Cao cấp" } }, Gn = {
  quality: qn
}, Ve = {
  apple: Gn.quality
  // android: androidQualities.quality
}, $n = (n, e, t) => {
  if (!n) return;
  const s = Array.isArray(t) ? t : t ? [t] : [];
  for (const i of s)
    if (i && Ve[i]) {
      const a = Ve[i], r = k(e)[0], o = a[e] || a[r];
      if (o) {
        const l = n.toLowerCase(), { normal: c, high: u } = o;
        if (u && l.includes(u.toLowerCase()))
          return "high";
        if (c && l.includes(c.toLowerCase()))
          return "normal";
      }
    }
}, Kn = (n, e) => {
  const t = Ve[e];
  if (t)
    for (const [s, { high: i, normal: a }] of Object.entries(t)) {
      const r = i && n.some((l) => l.includes(i)), o = a && n.some((l) => l.includes(a));
      if (r && o)
        return s;
    }
}, Wn = {
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
}, rt = (n) => {
  if (!n) return;
  const t = n.toLowerCase().split(/[._-]/);
  for (const s of Object.values(Wn))
    if (s.values.some((i) => t.includes(i)))
      return s.quality;
};
function Qn(n, e) {
  if (n.name === n.originalName) return n;
  if (e.name === e.originalName) return e;
  const t = [n.originalName, ...n.altNames || []], s = [e.originalName, ...e.altNames || []], i = t.findIndex((r) => s.includes(r)), a = s.findIndex((r) => t.includes(r));
  return i === -1 && a === -1 || i !== -1 && (a === -1 || i <= a) ? n : e;
}
function Jn(n, e) {
  if (!n.altNames && !e.altNames)
    return !1;
  const t = n.originalName, s = e.originalName, i = n.altNames || [], a = e.altNames || [];
  return a.includes(t) || i.includes(s) ? !0 : i.filter((o) => a.includes(o)).length > 0;
}
class b {
  static instance;
  static initializationPromise = null;
  systemLocale;
  voices = [];
  browserVoices = [];
  isInitialized = !1;
  // Base language codes already parsed into `voices`; null means unscoped (everything loaded)
  scopedLanguages = null;
  broadenPromises = /* @__PURE__ */ new Map();
  constructor() {
    if (typeof window > "u" || !window.speechSynthesis)
      throw new Error("Web Speech API is not available in this environment");
    this.systemLocale = navigator.languages?.[0]?.split("-")[0] || "en";
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
    if (b.instance?.isInitialized) {
      const t = b.instance;
      return e?.languages && e.languages.length > 0 && await t.broadenLanguages(e.languages), t;
    }
    return b.initializationPromise || (b.initializationPromise = (async () => {
      try {
        const t = new b();
        b.instance = t, t.browserVoices = await t.getBrowserVoices(e?.maxTimeout, e?.interval), t.updateSystemLocale(t.browserVoices);
        let s = t.browserVoices;
        return e?.languages && e.languages.length > 0 ? (s = t.filterBrowserVoicesByLanguages(t.browserVoices, e.languages), t.scopedLanguages = b.toBaseLangSet(e.languages)) : t.scopedLanguages = null, t.voices = await t.parseToReadiumSpeechVoices(s), t.isInitialized = !0, t;
      } catch (t) {
        throw b.initializationPromise = null, console.error("Failed to initialize WebSpeechVoiceManager:", t), t;
      }
    })()), b.initializationPromise;
  }
  /**
   * Filter browser voices based on preferred languages
   * @private
   */
  filterBrowserVoicesByLanguages(e, t) {
    if (!t?.length) return e;
    const s = b.toBaseLangSet(t);
    return e.filter((i) => {
      if (!i?.lang) return !1;
      const a = L(i.lang), [r] = b.extractLangRegionFromBCP47(a);
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
        const s = L(t), [i] = b.extractLangRegionFromBCP47(s);
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
    const s = [...b.toBaseLangSet(e)].filter((o) => !this.scopedLanguages.has(o));
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
    const t = e.map((i) => i.name), s = Kn(t, "apple");
    s && (this.systemLocale = s);
  }
  /**
   * Infer voice quality based on package, platform, JSON, or duplicate count
   * Returns null if quality cannot be determined
   * @private
   */
  inferVoiceQuality(e, t, s) {
    const i = e.voiceURI ? rt(e.voiceURI) : void 0;
    if (i) return i;
    if (t?.nativeID && Array.isArray(t.nativeID))
      for (const a of t.nativeID) {
        const r = rt(a);
        if (r) return r;
      }
    if (t?.localizedName && e.voiceURI && e.lang) {
      const a = $n(
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
      else if (Jn(s, a)) {
        const r = Qn(s, a);
        t.set(i, r);
      } else {
        const r = ce(a.quality);
        ce(s.quality) >= r && t.set(i, s);
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
    const t = st(e);
    if (t) return t;
    const [s] = b.extractLangRegionFromBCP47(e);
    if (s && s !== e) {
      const i = st(s);
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
    const i = s ?? this.voices, a = t ? this.filterVoices(t, i) : i, r = [], o = /* @__PURE__ */ new Set();
    for (const l of a) {
      const u = L(l.language).split("-")[0];
      if (!o.has(u)) {
        const g = xe(u, e), h = a.filter(
          (d) => L(d.language).split("-")[0] === u
        ).length;
        r.push({ code: u, label: g, count: h }), o.add(u);
      }
    }
    return s ? r : r.sort((l, c) => l.label.localeCompare(c.label));
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
      const [, u] = b.extractLangRegionFromBCP47(c.language);
      u && l.set(u, (l.get(u) || 0) + 1);
    }
    for (const c of a) {
      const [, u] = b.extractLangRegionFromBCP47(c.language);
      if (u && !o.has(u)) {
        let g = c.language;
        try {
          const h = e || navigator.language;
          g = new Intl.DisplayNames([h], { type: "region" }).of(u) || c.language;
        } catch (h) {
          console.warn(`Failed to get display name for region ${u}`, h);
        }
        r.push({
          code: u,
          label: g,
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
          const g = s();
          if (Array.isArray(g) && g.length) return a(g);
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
        const a = L(i.lang), [r] = b.extractLangRegionFromBCP47(a), o = this.normalizeVoiceName(i.name), l = `${i.lang.toLowerCase()}_${o}`, c = t.get(l) || 1;
        let u = await Ae(a);
        (!u || u.length === 0) && (u = await Ae(r));
        const g = this.findMatchingJsonVoice(u, o), h = this.inferVoiceQuality(i, g, c);
        return g ? {
          ...g,
          label: g.label ?? this.cleanVoiceName(i.name),
          source: "json",
          originalName: i.name,
          language: g.language ?? a,
          voiceURI: i.voiceURI,
          quality: h,
          isDefault: i.default || !1,
          offlineAvailability: i.localService || !1,
          isNovelty: Oe(i.name, i.voiceURI),
          isLowQuality: Ue(i.name, h)
        } : {
          source: "browser",
          label: this.cleanVoiceName(i.name),
          name: i.name,
          originalName: i.name,
          language: a,
          voiceURI: i.voiceURI,
          quality: h,
          isDefault: i.default || !1,
          offlineAvailability: i.localService || !1,
          isNovelty: Oe(i.name, i.voiceURI),
          isLowQuality: Ue(i.name, h)
        };
      })
    );
  }
  /**
   * Convert an ReadiumSpeechVoice to a native SpeechSynthesisVoice
   */
  convertToSpeechSynthesisVoice(e) {
    if (e)
      return this.browserVoices.find(
        (t) => t.voiceURI === e.voiceURI || t.name === e.originalName || this.normalizeVoiceName(t.name) === this.normalizeVoiceName(e.name)
      );
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
    if (i.languages && (s = Hn(s, i.languages)), i.source && (s = s.filter((a) => a.source === i.source)), i.gender && (s = s.filter((a) => a.gender === i.gender)), i.quality) {
      const a = Array.isArray(i.quality) ? i.quality : [i.quality];
      s = s.filter((r) => r.quality && a.includes(r.quality));
    }
    return i.offlineOnly && (s = s.filter((a) => a.offlineAvailability === !0)), i.provider && (s = s.filter(
      (a) => a.provider?.toLowerCase() === i.provider?.toLowerCase()
    )), i.excludeNovelty && (s = it(s)), i.excludeVeryLowQuality && (s = at(s)), i.removeDuplicates && (s = this.removeDuplicates(s)), s;
  }
  /**
   * Filter out novelty voices
   * @param voices Array of voices to filter
   * @returns Filtered array with novelty voices removed
   */
  filterOutNoveltyVoices(e) {
    const t = e ?? this.voices;
    return it(t);
  }
  /**
   * Filter out very low quality voices
   * @param voices Array of voices to filter
   * @returns Filtered array with very low quality voices removed
   */
  filterOutVeryLowQualityVoices(e) {
    const t = e ?? this.voices;
    return at(t);
  }
  /**
   * Sort voices by quality, respecting JSON name order, then alphabetically for undefined/null quality
   * @param voices Array of voices to sort
   * @returns Sorted array of voices
   */
  async sortVoicesByQuality(e) {
    const t = e || this.voices;
    if (!t?.length) return [];
    const s = await _(t);
    return [...t].sort((i, a) => j(i, a, s));
  }
  /**
   * Sort regions by default then alphabetically, sort voices by quality
   */
  static async sortByDefaultRegion(e, t) {
    const s = await _(e), i = ye(t);
    e.sort((a, r) => {
      const [, o] = b.extractLangRegionFromBCP47(a.language), [, l] = b.extractLangRegionFromBCP47(r.language), c = i && o === i.split("-")[1], u = i && l === i.split("-")[1];
      return c && !u ? -1 : !c && u ? 1 : j(a, r, s, t);
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
      return await Le(l), l;
    }
    const i = Se(e), { voicesByLang: a, otherLangVoices: r } = be(s, i), o = [];
    for (const l of i) {
      const c = a.get(l.baseLang);
      c && (await b.sortByDefaultRegion(c, l.baseLang), o.push(...c));
    }
    return await Le(r), o.push(...r), o;
  }
  /**
   * Sort voices by region preference, then alphabetically
   * @param voices Array of voices to sort
   * @param preferredLanguages Array of preferred language codes in order of preference
   * @returns Sorted array of voices
   */
  async sortVoicesByRegions(e, t) {
    return zn(e, t || this.voices);
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
          r = b.extractLangRegionFromBCP47(a.language)[0];
          break;
        case "gender":
          r = a.gender || "unknown";
          break;
        case "quality":
          r = a.quality || "unknown";
          break;
        case "region":
          const [, o] = b.extractLangRegionFromBCP47(a.language);
          r = o || "unknown";
          break;
      }
      s[r] || (s[r] = []), s[r].push(a);
    }
    return s;
  }
}
const Zn = ["webKit", "moz", "ms", "o"], Yn = [
  "boundary",
  "end",
  "error",
  "mark",
  "pause",
  "resume",
  "start"
], Xn = (n) => `${n.charAt(0).toUpperCase()}${n.slice(1)}`, G = (n = {}, e) => Object.hasOwnProperty.call(n, e) || e in n || !!n[e], es = (n) => typeof window < "u" && n in window, ts = (n) => {
  const e = Xn(n), t = Zn.map((i) => `${i}${e}`), s = [n, e].concat(t).find(es);
  return s && typeof window < "u" ? window[s] : void 0;
}, ns = () => {
  const n = {};
  [
    "speechSynthesis",
    "speechSynthesisUtterance",
    "speechSynthesisVoice",
    "speechSynthesisEvent",
    "speechSynthesisErrorEvent"
  ].forEach((t) => {
    n[t] = ts(t);
  }), n.onvoiceschanged = G(n.speechSynthesis, "onvoiceschanged"), n.speechSynthesisSpeaking = G(n.speechSynthesis, "speaking"), n.speechSynthesisPaused = G(n.speechSynthesis, "paused");
  const e = n.speechSynthesisUtterance ? G(n.speechSynthesisUtterance, "prototype") : !1;
  return Yn.forEach((t) => {
    const s = `on${t}`;
    n[s] = e && n.speechSynthesisUtterance ? G(n.speechSynthesisUtterance.prototype, s) : !1;
  }), n;
}, ss = () => {
  const e = typeof window < "u" && (window.navigator || {}).userAgent || "", t = () => /android/i.test(e), s = () => /kaios/i.test(e), i = () => typeof window.InstallTrigger < "u" ? !0 : /firefox/i.test(e), a = () => typeof window.GestureEvent < "u" || /safari/i.test(e);
  return {
    isAndroid: t(),
    isFirefox: i() || s(),
    isSafari: a(),
    isKaiOS: s()
  };
};
class we {
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
const le = (n, e) => Math.min(Math.max(n, 0), Math.max(e - 1, 0));
function F(n, e, t, s) {
  return Number.isFinite(n) ? Math.max(e, Math.min(t, n)) : s;
}
const Te = "\\p{Ps}\\p{Pi}¿¡", is = new RegExp(`^[${Te}]`, "u"), as = new RegExp("^\\p{P}$", "u");
function rs(n) {
  return is.test(n);
}
function os(n) {
  return as.test(n);
}
function Dt(n) {
  return n.replace(/[<>]/g, "​");
}
function ls(n) {
  return n.replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&nbsp;/g, " ").replace(/&#(\d+);/g, (e, t) => String.fromCodePoint(Number(t))).replace(/&#x([0-9a-fA-F]+);/g, (e, t) => String.fromCodePoint(parseInt(t, 16)));
}
const cs = /\s*<readium:[a-zA-Z][\w-]*\s+id="[^"]*"\s*\/>\s*/g;
function us(n) {
  return n.replace(cs, (t, s, i) => {
    const a = i.slice(s + t.length);
    return a.length === 0 || te(a) ? "" : " ";
  }).replace(/ {2,}/g, " ").trim();
}
function hs(n) {
  return n.includes("<");
}
function Be(n) {
  if (n === void 0) return;
  const e = {};
  if (n.language !== void 0 && (e.language = n.language), n.ssml) {
    const t = us(n.ssml);
    hs(t) && (e.ssml = t);
  }
  return n.plain && (e.plain = n.plain), e.plain || e.ssml ? e : void 0;
}
function z(n) {
  return jt(n).plain;
}
function jt(n) {
  let e = "";
  const t = [];
  let s = !1, i = 0;
  for (; i < n.length; ) {
    const o = n[i];
    if (o === "<") {
      const c = n.indexOf(">", i), u = c === -1 ? "" : n.slice(c + 1);
      i = c === -1 ? n.length : c + 1, !s && e.length > 0 && u.length > 0 && !te(u) && (e += " ", t.push(i), s = !0);
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
function ot(n, e) {
  let t = 0, s = n.length;
  for (; t < s; ) {
    const i = t + s >> 1;
    n[i] < e ? t = i + 1 : s = i;
  }
  return t;
}
const lt = /* @__PURE__ */ new WeakMap();
function ds(n) {
  return n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function gs(n) {
  const e = ds(n), t = /\w/.test(n[0]) ? "(?<!\\w)" : "", s = /\w/.test(n[n.length - 1]) ? "(?!\\w)" : "";
  return `${t}${e}${s}`;
}
function fs(n, e) {
  if (typeof e == "string")
    return { regex: new RegExp(gs(n), "g"), replace: e };
  const t = e.pattern.flags.includes("g") ? e.pattern.flags : `${e.pattern.flags}g`;
  return { regex: new RegExp(e.pattern.source, t), replace: e.replace };
}
function ps(n) {
  let e = lt.get(n);
  return e || (e = Object.entries(n).map(([t, s]) => fs(t, s)), lt.set(n, e)), e;
}
function Ft(n, e) {
  const t = [];
  for (const a of ps(e))
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
function ms(n, e) {
  let t = "";
  const s = [];
  let i = 0;
  for (const a of Ft(n, e)) {
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
function ct(n, e) {
  return n.length ? e <= 0 ? n[0] : e >= n.length ? n[n.length - 1] + 1 : n[e] : e;
}
const vs = /<([a-zA-Z][\w-]*)([^>]*)>([\s\S]*?)<\/\1>|<[a-zA-Z][\w-]*\b[^>]*\/>|[^<]+/g;
function ut(n) {
  return n.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
}
function _t(n) {
  const e = [];
  for (const t of n.matchAll(vs))
    t[1] !== void 0 ? e.push({ kind: "paired", raw: t[0], tag: t[1], attrs: t[2], innerText: ut(t[3]) }) : t[0][0] === "<" ? e.push({ kind: "selfClosing", raw: t[0] }) : e.push({ kind: "text", raw: t[0], text: ut(t[0]) });
  return e;
}
function ys(n, e) {
  const t = _t(n);
  let s = "", i = !1;
  const a = [], r = t.map(() => []);
  t.forEach((y, C) => {
    if (y.kind === "selfClosing") return;
    const R = y.kind === "paired" ? y.innerText : y.text;
    if (!i && s.length > 0 && R.length > 0 && !te(R) && !/^\s/.test(R)) {
      const E = s.length;
      s += " ", r[C].push(a.length), a.push({ start: E, end: E + 1, atomIndex: -1 }), i = !0;
    }
    const w = s.length;
    s += R, r[C].push(a.length), a.push({ start: w, end: s.length, atomIndex: C }), R.length > 0 && (i = /\s$/.test(R));
  });
  const o = Ft(s, e);
  let l = "", c = "";
  const u = [];
  let g = -2, h = "", d = 0;
  const f = () => {
    if (g >= 0) {
      const y = t[g];
      l += y.kind === "paired" ? `<${y.tag}${y.attrs}>${h}</${y.tag}>` : h;
    }
    h = "", g = -2;
  };
  for (let y = 0; y < t.length; y++) {
    const C = t[y];
    if (C.kind === "selfClosing") {
      f(), l += C.raw;
      continue;
    }
    for (const R of r[y]) {
      const w = a[R];
      let E = w.start;
      for (; E < w.end; ) {
        const A = d < o.length ? o[d] : void 0;
        if (A && A.start <= E && A.end > E) {
          const q = A.start === E, vn = A.end > w.end;
          if (q) {
            c += A.replacement;
            for (let Xe = 0; Xe < A.replacement.length; Xe++) u.push(A.start);
            w.atomIndex === -1 || vn ? (f(), l += B(A.replacement)) : (g !== w.atomIndex && (f(), g = w.atomIndex), h += B(A.replacement));
          }
          E = Math.min(A.end, w.end), A.end <= w.end && d++;
          continue;
        }
        const Ye = A ? Math.min(A.start, w.end) : w.end, ie = s.slice(E, Ye);
        c += ie;
        for (let q = 0; q < ie.length; q++) u.push(E + q);
        w.atomIndex === -1 ? (f(), l += B(ie)) : (g !== w.atomIndex && (f(), g = w.atomIndex), h += B(ie)), E = Ye;
      }
    }
  }
  f();
  let p = 0;
  for (; p < s.length && /\s/.test(s[p]); ) p++;
  let m = s.length;
  for (; m > p && /\s/.test(s[m - 1]); ) m--;
  let S = 0;
  for (; S < c.length && /\s/.test(c[S]); ) S++;
  let v = c.length;
  for (; v > S && /\s/.test(c[v - 1]); ) v--;
  const I = s.slice(p, m), P = u.slice(S, v).map((y) => Math.min(Math.max(y - p, 0), Math.max(I.length - 1, 0)));
  return { ssml: l, plain: I, map: P };
}
const Ht = /<lang xml:lang="([^"]*)">([\s\S]*?)<\/lang>/g;
function qt(n) {
  return new RegExp(Ht).test(n);
}
function ht(n) {
  return n.replace(/<[^>]+>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/ {2,}/g, " ");
}
const Ss = new RegExp(
  `\\s+|[${Te}]+|[${K}]+|[^\\s${Te}${K}]+`,
  "gu"
);
function Ie(n) {
  const e = [];
  for (const [t] of n.matchAll(Ss))
    /^\s/.test(t) ? e.push({ kind: "space" }) : rs(t) ? e.push({ kind: "open", text: t }) : te(t) ? e.push({ kind: "close", text: t }) : e.push({ kind: "word", text: t });
  return e;
}
function bs(n) {
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
function ws(n) {
  let e = n.length;
  for (; e > 0 && (n[e - 1].kind === "space" || n[e - 1].kind === "open"); ) e--;
  return n.slice(e).some((t) => t.kind === "open") ? n.splice(e) : [];
}
function ks(n) {
  let e = 0;
  for (; e < n.length && (n[e].kind === "space" || n[e].kind === "close"); ) e++;
  return n.slice(0, e).some((t) => t.kind === "close") ? n.splice(0, e) : [];
}
function Gt(n, e) {
  const t = [];
  let s = 0;
  for (const r of n.matchAll(Ht))
    t.push({
      tokens: Ie(ht(n.slice(s, r.index))),
      language: e,
      tagged: !1
    }), t.push({ tokens: Ie(z(r[2])), language: r[1], tagged: !0 }), s = r.index + r[0].length;
  t.push({
    tokens: Ie(ht(n.slice(s))),
    language: e,
    tagged: !1
  });
  for (let r = 0; r < t.length - 1; r++)
    !t[r].tagged && t[r + 1].tagged ? t[r + 1].tokens.unshift(...ws(t[r].tokens)) : t[r].tagged && !t[r + 1].tagged && t[r].tokens.push(...ks(t[r + 1].tokens));
  const i = [];
  let a = 0;
  for (const r of t) {
    const o = bs(r.tokens);
    o && (i.push({ plain: o, language: r.language, start: a, end: a + o.length }), a += o.length);
  }
  return i;
}
const $t = /<readium:[a-zA-Z][\w-]*\s+id="([^"]*)"\s*\/>/g;
function Cs(n) {
  return new RegExp($t).test(n);
}
function Es(n) {
  const e = [];
  let t = 0;
  for (const i of n.matchAll($t)) {
    const a = n.slice(t, i.index).trim();
    a && e.push({ ssml: a }), e.push({ placeholderId: i[1] }), t = i.index + i[0].length;
  }
  const s = n.slice(t).trim();
  return s && e.push({ ssml: s }), e;
}
class dt {
  speechSynthesis;
  speechSynthesisUtterance;
  currentVoice = null;
  currentUtterances = [];
  currentUtteranceIndex = 0;
  playbackState = "idle";
  events = new we();
  voiceManager = null;
  voices = [];
  defaultVoice = null;
  speakInContentLanguage = !1;
  // Keyed by `${language}:${needsBoundary}` — the boundary requirement rides in the key
  // so a voice switch that flips it warms/reads a distinct slot instead of a stale one.
  languageVoiceCache = /* @__PURE__ */ new Map();
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
  lacksNativePauseEvents = !1;
  // Google online voices in desktop Chrome never fire onpause/onresume
  // Playback parameters
  rate = 1;
  pitch = 1;
  volume = 1;
  features;
  patches;
  constructor() {
    if (this.features = ns(), this.patches = ss(), !this.features.speechSynthesis || !this.features.speechSynthesisUtterance)
      throw new Error("Web Speech API is not available in this environment");
    this.speechSynthesis = this.features.speechSynthesis, this.speechSynthesisUtterance = this.features.speechSynthesisUtterance;
  }
  // From Easy Speech,
  // Check infinity pattern for long texts (except on problematic platforms)
  // Skip resume infinity for Microsoft Natural voices as they have different behavior 
  shouldUseResumeInfinity() {
    const e = this.currentVoice, t = !!(e?.name && typeof e.name == "string" && e.name.toLocaleLowerCase().includes("(natural)"));
    return this.patches.isAndroid !== !0 && !this.patches.isFirefox && !this.patches.isSafari && !t;
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
      this.voiceManager = await b.initialize({
        languages: t,
        maxTimeout: s,
        interval: i
      }), this.voices = this.voiceManager.getVoices();
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
  // No cross-region fallback: fr-FR content must not match an fr-CA voice.
  voiceMatchesLanguage(e, t) {
    const [s, i] = k(t), [a, r] = k(e.language);
    return a === s && (!i || r === i);
  }
  languageCacheKey(e, t) {
    return `${e}:${t}`;
  }
  // Returns `undefined` (not a fallback voice) when content.language hasn't
  // been warmed into languageVoiceCache yet — callers must await for it.
  voiceForUtteranceSync(e) {
    const t = this.getCurrentVoiceForUtterance(this.currentVoice);
    if (!this.speakInContentLanguage || !e.language)
      return t;
    const s = L(e.language);
    if (t && this.voiceMatchesLanguage(t, s))
      return t;
    const i = t?.controls?.boundary !== !1, a = this.languageCacheKey(s, i);
    if (this.languageVoiceCache.has(a))
      return this.languageVoiceCache.get(a) ?? t;
  }
  // Awaits warming for a not-yet-seen content language rather than falling back
  // to the wrong-language voice.
  async voiceForUtterance(e) {
    const t = this.voiceForUtteranceSync(e);
    return t !== void 0 ? t : (await this.warmLanguageVoiceCache([e]), this.voiceForUtteranceSync(e) ?? this.getCurrentVoiceForUtterance(this.currentVoice));
  }
  // Dedupes in-flight warms per (language, boundary requirement) so an awaited call and a
  // fire-and-forget one for the same slot don't redo the work.
  async warmLanguageVoiceCache(e) {
    if (!this.speakInContentLanguage || !this.voiceManager)
      return;
    const t = this.getCurrentVoiceForUtterance(this.currentVoice)?.controls?.boundary !== !1, s = new Set(
      e.map((o) => o.language).filter((o) => !!o).map((o) => L(o)).filter((o) => !this.languageVoiceCache.has(this.languageCacheKey(o, t)))
    ), i = [...s].filter((o) => this.warmingLanguages.has(this.languageCacheKey(o, t))), r = [...s].filter((o) => !this.warmingLanguages.has(this.languageCacheKey(o, t))).map((o) => {
      const l = this.languageCacheKey(o, t), c = (async () => {
        await b.initialize({ languages: [o] }), this.voices = this.voiceManager.getVoices();
        const u = this.voices.filter((f) => this.voiceMatchesLanguage(f, o)), g = Mt(u, t), d = (await this.voiceManager.sortVoicesByQuality(g))[0] ?? null;
        this.languageVoiceCache.set(l, d), d || this.emitEvent({ type: "languagefallback", detail: { language: o, reason: "no-matching-voice" } });
      })();
      return this.warmingLanguages.set(l, c.finally(() => this.warmingLanguages.delete(l))), this.warmingLanguages.get(l);
    });
    await Promise.all([
      ...r,
      ...i.map((o) => this.warmingLanguages.get(this.languageCacheKey(o, t)))
    ]);
  }
  getCurrentVoice() {
    return this.currentVoice;
  }
  setSpeakInContentLanguage(e) {
    e !== this.speakInContentLanguage && (this.speakInContentLanguage = e, e && this.warmLanguageVoiceCache(this.currentUtterances), this.scheduleRestartIfSpeaking());
  }
  getSpeakInContentLanguage() {
    return this.speakInContentLanguage;
  }
  // Web Speech API has no SSML support: use the authored plain text, falling
  // back to a tag-stripped rendering of the SSML only when no plain
  // alternative was provided by the source.
  toPlainText(e) {
    return e.map((t) => ({
      ...t,
      plain: t.plain ?? (t.ssml ? z(ls(t.ssml)) : "")
    }));
  }
  // Queue Management
  loadUtterances(e, t) {
    this.currentUtterances = this.toPlainText(e), this.currentUtteranceIndex = le(t ?? 0, e.length), this.warmLanguageVoiceCache(this.currentUtterances), this.playbackState = "ready", this.emitEvent({ type: "ready" });
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
  async getAvailableVoices() {
    if (this.voices.length > 0)
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
    this.cancelCurrentSpeech();
    const t = ++this.speakGeneration;
    this.isSpeakingInternal = !0, this.isPausedInternal = !1, this.setState("playing"), this.stopResumeInfinity(), this.currentUtteranceIndex >= this.currentUtterances.length && (this.currentUtteranceIndex = 0), this.speakCurrentUtterance(t);
  }
  cancelCurrentSpeech() {
    this.patches.isFirefox && this.speechSynthesis.speaking && (this.utterancesBeingCancelled = !0, setTimeout(() => {
      this.utterancesBeingCancelled = !1;
    }, 100)), this.speechSynthesis.cancel();
  }
  async speakCurrentUtterance(e) {
    if (this.currentUtteranceIndex >= this.currentUtterances.length) {
      this.setState("idle"), this.emitEvent({ type: "end" });
      return;
    }
    const t = this.currentUtterances[this.currentUtteranceIndex], s = t.plain ?? "";
    this.validateText(s);
    const i = this.createUtterance(Dt(s)), a = await this.voiceForUtterance(t);
    if (e === this.speakGeneration) {
      if (this.lacksNativePauseEvents = !1, a && this.voiceManager) {
        const r = this.voiceManager.convertToSpeechSynthesisVoice(a);
        r && (i.voice = r, i.lang = r.lang, this.lacksNativePauseEvents = !r.localService && r.name.startsWith("Google"));
      }
      t.language && (i.lang = t.language), i.rate = this.rate, i.pitch = this.pitch, i.volume = this.volume, i.onstart = () => {
        if (e !== this.speakGeneration) return;
        this.isSpeakingInternal = !0, this.isPausedInternal = !1, this.setState("playing"), this.emitEvent({ type: "start" }), this.patches.isAndroid && this.isAndroidPaused && (this.isAndroidPaused = !1), this.shouldUseResumeInfinity() && this.startResumeInfinity(i);
      }, i.onend = () => {
        if (this.utterancesBeingCancelled) {
          this.utterancesBeingCancelled = !1;
          return;
        }
        e === this.speakGeneration && this.playbackState !== "idle" && (this.isSpeakingInternal = !1, this.isPausedInternal = !1, this.stopResumeInfinity(), this.currentUtteranceIndex >= this.currentUtterances.length - 1 && this.setState("idle"), this.emitEvent({ type: "end" }));
      }, i.onerror = (r) => {
        if (e !== this.speakGeneration || r.error === "interrupted" && this.patches.isAndroid && this.isAndroidPaused)
          return;
        this.isSpeakingInternal = !1, this.isPausedInternal = !1, this.stopResumeInfinity(), this.setState("idle"), ["synthesis-unavailable", "audio-hardware", "voice-unavailable"].includes(r.error) && (console.log("[ENGINE] fatal error detected, resetting index to 0"), this.currentUtteranceIndex = 0), r.error === "interrupted" || r.error === "canceled" ? this.emitEvent({ type: "stop" }) : this.emitEvent({
          type: "error",
          detail: {
            error: r.error,
            // Preserve original error type
            message: `Speech synthesis error: ${r.error}`
          }
        });
      }, i.onpause = () => {
        e === this.speakGeneration && (this.isPausedInternal = !0, this.isSpeakingInternal = !1, this.emitEvent({ type: "pause" }));
      }, i.onresume = () => {
        e === this.speakGeneration && (this.isPausedInternal = !1, this.isSpeakingInternal = !0, this.emitEvent({ type: "resume" }));
      }, i.onboundary = (r) => {
        e === this.speakGeneration && this.emitEvent({
          type: "boundary",
          detail: {
            charIndex: r.charIndex,
            charLength: r.charLength,
            elapsedTime: r.elapsedTime,
            name: r.name
          }
        });
      }, i.onmark = (r) => {
        e === this.speakGeneration && this.emitEvent({
          type: "mark",
          detail: {
            name: r.name
          }
        });
      }, this.speechSynthesis.speak(i);
    }
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
    const t = F(e, 0.1, 10, this.rate);
    t !== this.rate && (this.rate = t, this.scheduleRestartIfSpeaking());
  }
  getRate() {
    return this.rate;
  }
  setPitch(e) {
    const t = F(e, 0, 2, this.pitch);
    t !== this.pitch && (this.pitch = t, this.scheduleRestartIfSpeaking());
  }
  getPitch() {
    return this.pitch;
  }
  setVolume(e) {
    const t = F(e, 0, 1, this.volume);
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
    this.stop(), this.stopResumeInfinity(), this.events.clear(), this.currentUtterances = [], this.currentVoice = null, this.voices = [], this.defaultVoice = null, this.languageVoiceCache.clear(), this.warmingLanguages.clear(), this.initialized = !1;
  }
}
class ia {
  id = "webspeech";
  name = "Web Speech API";
  voiceEngine = null;
  // No cache to bypass here — local API, no network cost to re-checking.
  async getVoices() {
    return this.voiceEngine || (this.voiceEngine = new dt(), await this.voiceEngine.initialize()), this.voiceEngine.getAvailableVoices();
  }
  async createEngine(e) {
    const t = new dt();
    return await t.initialize(), e && await t.setVoice(e), t;
  }
  async destroy() {
    this.voiceEngine && (await this.voiceEngine.destroy(), this.voiceEngine = null);
  }
}
function Kt(n, e) {
  const t = [];
  let s = -1, i = -1;
  const a = () => {
    s !== -1 && (t.push({ text: Rs(n, s, i), offset: n[s].offset }), s = -1, i = -1);
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
function Rs(n, e, t) {
  const s = n[e], i = n[t];
  return s === i ? s.text : n.slice(e, t + 1).map((a) => a.text).join("");
}
const Wt = new RegExp(
  `[^${K}]*[${K}]+\\s*|[^${K}]+$`,
  "gu"
), Is = /\S+\s*|\s+/g;
function Me(n, e, t) {
  const s = [];
  for (const i of n.matchAll(t))
    i[0].length !== 0 && s.push({ text: i[0], offset: e + i.index, atomic: !1 });
  return s;
}
function De(n, e) {
  if (n.text.length <= e || n.atomic)
    return [n];
  const t = Me(n.text, n.offset, Is);
  if (t.length > 1)
    return t.flatMap((r) => De(r, e));
  const s = [];
  let i = n.offset, a = "";
  for (const r of n.text)
    a.length > 0 && a.length + r.length > e && (s.push({ text: a, offset: i, atomic: !1 }), i += a.length, a = ""), a += r;
  return a.length > 0 && s.push({ text: a, offset: i, atomic: !1 }), s;
}
function Ps(n, e) {
  if (n.length <= e)
    return [{ text: n, offset: 0 }];
  const s = Me(n, 0, Wt).flatMap((i) => De(i, e));
  return Kt(s, e);
}
const As = /<([a-zA-Z][\w-]*)\b[^>]*>[\s\S]*?<\/\1>|<[a-zA-Z][\w-]*\b[^>]*\/>|[^<]+/g;
function xs(n, e) {
  if (n.length <= e)
    return [{ text: n, offset: 0 }];
  const t = [];
  for (const i of n.matchAll(As))
    i[0][0] === "<" ? t.push({ text: i[0], offset: i.index, atomic: !0 }) : t.push(...Me(i[0], i.index, Wt));
  const s = t.flatMap((i) => De(i, e));
  return Kt(s, e);
}
const Ls = {
  wav: "audio/wav",
  mp3: "audio/mpeg",
  opus: "audio/ogg",
  ogg: "audio/ogg",
  aac: "audio/aac",
  flac: "audio/flac",
  webm: "audio/webm",
  m4a: "audio/mp4"
};
function Os(n) {
  return Ls[n] ?? `audio/${n}`;
}
const Us = ["flac", "wav", "opus", "aac", "ogg", "webm", "mp3"], Vs = ["opus", "aac", "webm", "ogg", "mp3", "wav", "flac"];
function Ts(n, e, t) {
  const s = (o) => t(Os(o)) !== "", i = n.formats.filter(s);
  if (e.preferredFormat && i.includes(e.preferredFormat))
    return e.preferredFormat;
  const a = e.strategy === "bandwidth" ? Vs : Us, r = [...a, ...i.filter((o) => !a.includes(o))];
  for (const o of r)
    if (i.includes(o))
      return o;
  return n.default;
}
const zs = /* @__PURE__ */ new Set(["wav", "flac"]), Ns = {
  mp3: 48e3,
  opus: 24e3,
  aac: 48e3,
  ogg: 48e3,
  webm: 32e3
};
function Bs(n, e, t) {
  return zs.has(n) || !e || !t ? void 0 : t.saveData === !0 || /2g/.test(t.effectiveType ?? "") ? Ns[n] : void 0;
}
function Qt(n, e) {
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
class J extends Error {
  status;
  type;
  title;
  instance;
  constructor(e, t) {
    super(e), this.name = "SpeechServerError", this.status = t.status, this.type = t.type, this.title = t.title, this.instance = t.instance;
  }
}
class Jt extends J {
  constructor(e) {
    super(e, { status: 408, type: "https://readium.org/speech-server/error#stall", title: "Synthesis Stalled" }), this.name = "SpeechServerStallError";
  }
}
class Zt extends Error {
  constructor(e) {
    super(e), this.name = "SpeechServerAudioDecodeError";
  }
}
class Yt extends Error {
  constructor(e) {
    super(e), this.name = "SpeechServerNetworkError";
  }
}
async function W(n) {
  if ((n.headers.get("content-type") ?? "").includes("application/problem+json"))
    try {
      const t = await n.json();
      return new J(t.detail || t.title || `Request failed with status ${n.status}`, {
        status: t.status ?? n.status,
        type: t.type,
        title: t.title,
        instance: t.instance
      });
    } catch {
    }
  return new J(`Request failed with status ${n.status}`, { status: n.status });
}
const Ms = 3, Ds = 400;
function js(n) {
  const e = atob(n), t = new Uint8Array(e.length);
  for (let s = 0; s < e.length; s++)
    t[s] = e.charCodeAt(s);
  return t.buffer;
}
function Fs(n) {
  return F(n, 0.25, 4, 1);
}
function ae(n) {
  return n?.plain ?? n?.ssml ?? void 0;
}
function gt(n) {
  return n instanceof Jt ? { message: n.message, status: n.status, type: n.type, title: n.title, instance: n.instance, recoverable: !0 } : n instanceof J ? { message: n.message, status: n.status, type: n.type, title: n.title, instance: n.instance, recoverable: !1 } : n instanceof Zt ? { message: n.message, recoverable: !1 } : n instanceof Yt ? { message: n.message, recoverable: !0 } : n instanceof Error ? { message: n.message, recoverable: !1 } : { message: String(n), recoverable: !1 };
}
class _s {
  endpoints;
  fetchImpl;
  currentVoice = null;
  voices = [];
  serviceInfo = null;
  serviceInfoPromise = null;
  currentUtterances = [];
  currentUtteranceIndex = 0;
  playbackState = "idle";
  events = new we();
  speakInContentLanguage = !1;
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
    this.endpoints = e.endpoints, this.fetchImpl = e.fetch ?? fetch.bind(globalThis), this.prefetchWindow = e.prefetchWindow ?? Ms, this.readyBufferChars = e.readyBufferChars ?? Ds, this.overLengthText = e.overLengthText ?? "split", this.timeoutMs = e.timeoutMs, this.formatOptions = e.format ?? {}, this.canPlayType = typeof Audio < "u" ? (t) => new Audio().canPlayType(t) : () => "";
  }
  // Lets a provider that already fetched /voices seed this engine without a second request.
  setAvailableVoices(e) {
    this.voices = e;
  }
  // Tags a fetch() TypeError (request never reached the network) as SpeechServerNetworkError,
  // so it can't be confused with a TypeError thrown later while reading the response.
  async fetchNetwork(e, t) {
    try {
      return await this.fetchImpl(e, t);
    } catch (s) {
      throw s instanceof TypeError ? new Yt(s.message) : s;
    }
  }
  loadUtterances(e, t) {
    this.abortLiveControllers(), this.clearPrefetchCache(), this.currentUtterances = e, this.currentUtteranceIndex = le(t ?? 0, e.length), this.setState("loading"), this.bufferUntilReady(++this.loadGeneration);
  }
  // Buffers enough utterances ahead of currentUtteranceIndex to cover readyBufferChars before
  // declaring "ready", so playback doesn't catch up to an empty prefetch cache right away —
  // starting from wherever playback will actually resume, not always utterance 0.
  async bufferUntilReady(e) {
    const t = le(this.currentUtteranceIndex, this.currentUtterances.length), s = Math.min(this.indexCoveringChars(this.readyBufferChars, t), t + this.prefetchWindow), i = [];
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
    const s = le(t, this.currentUtterances.length);
    let i = 0;
    for (let a = s; a < this.currentUtterances.length; a++)
      if (i += (ae(this.currentUtterances[a]) ?? "").length, i >= e)
        return a;
    return this.currentUtterances.length - 1;
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
  getCurrentVoice() {
    return this.currentVoice;
  }
  async getAvailableVoices() {
    if (this.voices.length > 0)
      return this.voices;
    const [e, t] = await Promise.all([this.fetchNetwork(this.endpoints.voices), this.getServiceInfo()]);
    if (!e.ok)
      throw await W(e);
    const s = await e.json(), i = new Map(t.providers.map((a) => [a.id, a.controls]));
    return this.voices = s.map((a) => Qt(a, i.get(a.provider))), this.voices;
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
      throw await W(e);
    return e.json();
  }
  setSpeakInContentLanguage(e) {
    e !== this.speakInContentLanguage && (this.speakInContentLanguage = e, this.clearPrefetchCache(), this.scheduleRestartIfSpeaking());
  }
  getSpeakInContentLanguage() {
    return this.speakInContentLanguage;
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
      await this.scheduleChunksStreaming(s, e), this.fillPrefetchWindow(t);
    } catch (s) {
      if (e !== this.speakGeneration)
        return;
      this.isSpeakingInternal = !1, this.setState("idle"), this.emitEvent({
        type: "error",
        detail: gt(s)
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
    const s = this.currentUtterances[e], i = !s.plain && !!s.ssml, a = this.speakInContentLanguage ? s.language : void 0, r = ae(s) ?? "", o = i ? jt(r).map : void 0, l = ae(this.currentUtterances[e - 1]), c = ae(this.currentUtterances[e + 1]), u = await this.getServiceInfo(), g = Ts(u.output, this.formatOptions, this.canPlayType), h = navigator.connection, d = Bs(g, this.formatOptions.adaptBitrateToNetwork ?? !1, h);
    if (r.length <= u.limits.maxTextLength) {
      const v = new AbortController();
      return (t ? this.activeControllers : this.liveControllers).add(v), [{
        promise: this.synthesizeChunk({ content: s, text: r, textOffset: 0, useSSML: i, ssmlMap: o, language: a, prevText: l, nextText: c, format: g, bitrate: d, controller: v }),
        controller: v
      }];
    }
    if (this.overLengthText === "error")
      throw new J(
        `Text exceeds this server's maximum length of ${u.limits.maxTextLength} characters`,
        {
          status: 413,
          type: "https://readium.org/speech-server/error#payload_too_large",
          title: "Payload Too Large"
        }
      );
    const f = Math.min(u.limits.maxTextLength, this.readyBufferChars), p = i ? xs(r, f) : Ps(r, f), m = [];
    let S = Promise.resolve();
    for (let v = 0; v < p.length; v++) {
      const I = v === 0 ? l : p[v - 1].text, P = v === p.length - 1 ? c : p[v + 1].text, y = p[v], C = new AbortController();
      (t ? this.activeControllers : this.liveControllers).add(C);
      const R = S.then(
        () => this.synthesizeChunk({ content: s, text: y.text, textOffset: y.offset, useSSML: i, ssmlMap: o, language: a, prevText: I, nextText: P, format: g, bitrate: d, controller: C })
      );
      m.push({ promise: R, controller: C }), S = R;
    }
    return m;
  }
  async synthesizeChunk(e) {
    const { content: t, text: s, textOffset: i, useSSML: a, ssmlMap: r, language: o, prevText: l, nextText: c, format: u, bitrate: g, controller: h } = e;
    try {
      const d = await this.fetchNetwork(this.endpoints.synthesize, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: t.id,
          text: a ? s : Dt(s),
          ssml: a,
          language: o,
          voice: this.currentVoice?.identifier ?? this.currentVoice?.name,
          prev_utterance: l,
          next_utterance: c,
          boundary: !0,
          output: { format: u, bitrate: g, speed: this.rate, pitch: this.pitch }
        }),
        signal: h.signal
      });
      if (!d.ok)
        throw await W(d);
      const f = await d.json(), p = js(f.audio);
      let m;
      try {
        m = await this.ensureAudioContext().decodeAudioData(p);
      } catch {
        throw new Zt("Audio playback failed");
      }
      return { audioBuffer: m, format: f.format, boundaries: f.boundaries, textOffset: i, ssmlMap: r };
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
        t.abort(), r(new Jt(`No audio chunk arrived within ${i.toFixed(0)}ms of the playback buffer running dry`));
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
  async scheduleChunksStreaming(e, t) {
    const s = await this.awaitWithStallDeadline(e[0].promise, e[0].controller, 0);
    if (t !== this.speakGeneration)
      return;
    const i = this.ensureAudioContext(), a = this.masterGain, o = this.currentVoice?.controls?.speed === !0 ? 1 : Fs(this.rate);
    this.scheduledChunks = [], this.setState("playing"), this.emitEvent({ type: "start" });
    let l = i.currentTime, c = null;
    const u = (g) => {
      const h = i.createBufferSource();
      h.buffer = g.audioBuffer, h.playbackRate.value = o, h.connect(a), h.start(l), c && (c.onended = null), h.onended = () => this.handleUtteranceEnded(t), c = h, this.scheduledChunks.push({ chunk: g, startTime: l, node: h, nextBoundaryIndex: 0, rate: o }), l += g.audioBuffer.duration / o;
    };
    u(s), this.startBoundaryPolling(t);
    for (let g = 1; g < e.length; g++) {
      let h;
      try {
        const d = Math.max(0, (l - i.currentTime) * 1e3);
        h = await this.awaitWithStallDeadline(e[g].promise, e[g].controller, d);
      } catch (d) {
        t === this.speakGeneration && this.emitEvent({ type: "error", detail: gt(d) });
        return;
      }
      if (t !== this.speakGeneration)
        return;
      u(h);
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
          r = ot(l, a), o = Math.max(0, ot(l, a + i.charLength) - r);
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
    const t = F(e, 0.1, 10, this.rate);
    t !== this.rate && (this.rate = t, this.clearPrefetchCache(), this.scheduleRestartIfSpeaking());
  }
  getRate() {
    return this.rate;
  }
  setPitch(e) {
    const t = F(e, 0, 2, this.pitch);
    t !== this.pitch && (this.pitch = t, this.clearPrefetchCache(), this.scheduleRestartIfSpeaking());
  }
  getPitch() {
    return this.pitch;
  }
  setVolume(e) {
    const t = F(e, 0, 1, this.volume);
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
    this.stop(), await this.audioContext?.close(), this.audioContext = null, this.masterGain = null, this.events.clear(), this.currentUtterances = [], this.currentVoice = null, this.voices = [];
  }
}
class aa {
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
      throw await W(t);
    if (!s.ok)
      throw await W(s);
    const i = await t.json(), a = await s.json(), r = new Map(a.providers.map((o) => [o.id, o.controls]));
    return this.voices = i.map((o) => Qt(o, r.get(o.provider))), this.voices;
  }
  async createEngine(e) {
    const t = new _s(this.options);
    return this.voices.length > 0 && t.setAvailableVoices(this.voices), e && t.setVoice(e), t;
  }
  async destroy() {
    this.voices = [];
  }
}
function Hs(n) {
  return n.detail?.recoverable === !0;
}
const qs = 3e4, Gs = [
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
class $s {
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
  events = new we();
  unbindActiveEngine = null;
  constructor(e) {
    this.activeEngine = e.primaryEngine, this.primaryProvider = e.primaryProvider, this.fallbackProvider = e.fallbackProvider, this.onFailure = e.onFailure ?? "fallback", this.healthCheckIntervalMs = e.healthCheckIntervalMs ?? qs, this.lastVoiceRequest = e.primaryEngine.getCurrentVoice() ?? void 0, this.bindActiveEngine();
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
  setSpeakInContentLanguage(e) {
    this.activeEngine.setSpeakInContentLanguage(e);
  }
  getSpeakInContentLanguage() {
    return this.activeEngine.getSpeakInContentLanguage();
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
    const e = this.activeEngine, t = Gs.map((s) => e.on(s, (i) => {
      this.emitEvent(i), this.maybeRecoverNow();
    }));
    t.push(e.on("error", (s) => this.handleError(s))), this.unbindActiveEngine = () => t.forEach((s) => s());
  }
  handleError(e) {
    if (this.hasFallenBack || this.swapInFlight || this.onFailure === "error" || !Hs(e)) {
      this.emitEvent(e);
      return;
    }
    this.swapToFallback(e);
  }
  // Copies playback parameters onto a freshly created engine — shared by both swap directions so
  // this can't drift between them the way two separately maintained copies did.
  copyPlaybackParameters(e, t) {
    t.setRate(e.getRate()), t.setPitch(e.getPitch()), t.setVolume(e.getVolume()), t.setSpeakInContentLanguage(e.getSpeakInContentLanguage());
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
    const i = await this.fallbackProvider.getVoices(), r = typeof navigator < "u" && navigator.onLine === !0 ? i : i.filter((f) => f.offlineAvailability === !0);
    if (r.length === 0) return null;
    const [o] = Se([e]), { voicesByLang: l } = be(r, [o]), c = l.get(o.baseLang) ?? [], u = c.length > 0 ? c : r, g = t ? u.filter((f) => f.gender === t) : [], h = g.length > 0 ? g : u, d = Mt(h, s);
    return Nn(e, d);
  }
  async destroy() {
    this.teardownEpoch++, this.healthCheckTimer !== null && (clearTimeout(this.healthCheckTimer), this.healthCheckTimer = null), this.unbindActiveEngine?.(), this.events.clear(), await this.activeEngine.destroy();
  }
}
class ra {
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
    return new $s({
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
function Ks(n) {
  return new Pn({
    start: new tt(n.start),
    end: n.end ? new tt(n.end) : void 0
  });
}
function Ws(n, e = window) {
  const { href: t, text: s, cssSelector: i, domRange: a, fragment: r } = n, o = s ? new wn(s) : void 0, l = i || a ? /* @__PURE__ */ new Map() : void 0;
  l && (i && l.set("cssSelector", i), a && l.set("domRange", Ks(a).serialize()));
  const u = l !== void 0 || r !== void 0 ? new kn({
    fragments: r ? [r] : void 0,
    otherLocations: l
  }) : void 0;
  return new Cn({
    href: t ?? e.location.href,
    type: "text/html",
    text: o,
    locations: u
  });
}
class Qs extends yn {
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
        locator: Ws(a, this.wnd)
      })),
      t
    );
  }
  destroy() {
    super.destroy(), this.decorator.unmount(this.wnd, this.channel.frame), this.channel.frame.destroy();
  }
}
function oa(n = window, e = {}) {
  const t = new Sn(), s = new bn();
  return s.mount(n, t.frame), new Qs(t, n, s, e);
}
class la {
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
const ke = (n, e, t) => Object.freeze({ range: Object.freeze([n, e]), step: t }), ue = ke(0, 5e3, 100), he = ke(0.1, 10, 0.1), de = ke(0, 2, 0.1), ge = ke(0, 1, 0.05), je = Object.freeze(["none", "few", "some", "most", "custom"]), Fe = Object.freeze(["none", "block-level", "always"]), _e = Object.freeze(["plain", "ssml"]), He = Object.freeze(["none", "utterance", "block"]), qe = Object.freeze(["structure", "sentence"]), ft = Object.freeze([
  "format",
  "inlineContextualization",
  "verbosity",
  "skip",
  "contextualize",
  "language",
  "segmentation"
]);
function Ge(n) {
  return n == null || typeof n == "boolean" ? n : void 0;
}
function O(n, e) {
  return n == null || e.includes(n) ? n : void 0;
}
function T(n, e) {
  if (n == null) return n;
  if (typeof n != "number" || Number.isNaN(n)) return;
  const t = Math.min(...e), s = Math.max(...e);
  return n >= t && n <= s ? n : void 0;
}
function Z(n) {
  return n == null || Array.isArray(n) && n.every((e) => typeof e == "string") ? n : void 0;
}
class Js {
  format;
  inlineContextualization;
  verbosity;
  skip;
  contextualize;
  language;
  segmentation;
  pauseDuration;
  autoPause;
  rate;
  pitch;
  volume;
  constructor(e = {}) {
    this.format = O(e.format, _e) ?? "plain", this.inlineContextualization = Ge(e.inlineContextualization) ?? !1, this.verbosity = O(e.verbosity, je) ?? "few", this.skip = Z(e.skip) ?? [], this.contextualize = Z(e.contextualize) ?? [], this.language = O(e.language, Fe) ?? "block-level", this.segmentation = O(e.segmentation, qe) ?? "structure", this.pauseDuration = T(e.pauseDuration, ue.range) ?? 300, this.autoPause = O(e.autoPause, He) ?? "none", this.rate = T(e.rate, he.range) ?? 1, this.pitch = T(e.pitch, de.range) ?? 1, this.volume = T(e.volume, ge.range) ?? 1;
  }
}
class Y {
  format;
  inlineContextualization;
  verbosity;
  skip;
  contextualize;
  language;
  segmentation;
  pauseDuration;
  autoPause;
  rate;
  pitch;
  volume;
  constructor(e = {}) {
    this.format = O(e.format, _e), this.inlineContextualization = Ge(e.inlineContextualization), this.verbosity = O(e.verbosity, je), this.skip = Z(e.skip), this.contextualize = Z(e.contextualize), this.language = O(e.language, Fe), this.segmentation = O(e.segmentation, qe), this.pauseDuration = T(e.pauseDuration, ue.range), this.autoPause = O(e.autoPause, He), this.rate = T(e.rate, he.range), this.pitch = T(e.pitch, de.range), this.volume = T(e.volume, ge.range);
  }
  merging(e) {
    const t = { ...this };
    for (const s of Object.keys(e))
      e[s] !== void 0 && (t[s] = e[s]);
    return new Y(t);
  }
}
class Ce {
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
class $ extends Ce {
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
class Zs extends Ce {
  set value(e) {
    if (e != null && Ge(e) === void 0)
      throw new Error(`Value '${String(e)}' is not a boolean.`);
    this._value = e, this._onChange(this._value);
  }
  get value() {
    return this._value;
  }
}
class pt extends Ce {
  set value(e) {
    if (e != null && Z(e) === void 0)
      throw new Error(`Value '${String(e)}' is not an array of strings.`);
    this._value = e, this._onChange(this._value);
  }
  get value() {
    return this._value;
  }
}
class re extends Ce {
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
    if (e != null && T(e, this._supportedRange) === void 0)
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
class mt {
  preferences;
  settings;
  // Cloned rather than aliased: edits made through this editor's setters
  // are staged on this copy and only reach the navigator's own preferences
  // once explicitly passed to submitPreferences() — discarding the editor
  // without submitting must leave the navigator untouched.
  constructor(e, t) {
    this.preferences = new Y({ ...e }), this.settings = t;
  }
  // Explicit `null`s, not `undefined` — merging() skips `undefined` fields,
  // so only `null` actually clears them once submitted.
  clear() {
    this.preferences = new Y({
      format: null,
      inlineContextualization: null,
      verbosity: null,
      skip: null,
      contextualize: null,
      language: null,
      segmentation: null,
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
    return new $({
      initialValue: this.preferences.format,
      effectiveValue: this.settings.format,
      isEffective: this.preferences.format != null,
      onChange: (e) => this.updatePreference("format", e ?? null),
      supportedValues: _e
    });
  }
  get inlineContextualization() {
    return new Zs({
      initialValue: this.preferences.inlineContextualization,
      effectiveValue: this.settings.inlineContextualization,
      isEffective: this.preferences.inlineContextualization != null,
      onChange: (e) => this.updatePreference("inlineContextualization", e ?? null)
    });
  }
  get verbosity() {
    return new $({
      initialValue: this.preferences.verbosity,
      effectiveValue: this.settings.verbosity,
      isEffective: this.preferences.verbosity != null,
      onChange: (e) => this.updatePreference("verbosity", e ?? null),
      supportedValues: je
    });
  }
  get skip() {
    return new pt({
      initialValue: this.preferences.skip,
      effectiveValue: this.settings.skip,
      isEffective: this.preferences.skip != null,
      onChange: (e) => this.updatePreference("skip", e ?? null)
    });
  }
  get contextualize() {
    return new pt({
      initialValue: this.preferences.contextualize,
      effectiveValue: this.settings.contextualize,
      isEffective: this.preferences.contextualize != null,
      onChange: (e) => this.updatePreference("contextualize", e ?? null)
    });
  }
  get language() {
    return new $({
      initialValue: this.preferences.language,
      effectiveValue: this.settings.language,
      isEffective: this.preferences.language != null,
      onChange: (e) => this.updatePreference("language", e ?? null),
      supportedValues: Fe
    });
  }
  get segmentation() {
    return new $({
      initialValue: this.preferences.segmentation,
      effectiveValue: this.settings.segmentation,
      isEffective: this.preferences.segmentation != null,
      onChange: (e) => this.updatePreference("segmentation", e ?? null),
      supportedValues: qe
    });
  }
  get pauseDuration() {
    return new re({
      initialValue: this.preferences.pauseDuration,
      effectiveValue: this.settings.pauseDuration,
      isEffective: this.preferences.pauseDuration != null,
      onChange: (e) => this.updatePreference("pauseDuration", e ?? null),
      supportedRange: ue.range,
      step: ue.step
    });
  }
  get autoPause() {
    return new $({
      initialValue: this.preferences.autoPause,
      effectiveValue: this.settings.autoPause,
      isEffective: this.preferences.autoPause != null,
      onChange: (e) => this.updatePreference("autoPause", e ?? null),
      supportedValues: He
    });
  }
  get rate() {
    return new re({
      initialValue: this.preferences.rate,
      effectiveValue: this.settings.rate,
      isEffective: this.preferences.rate != null,
      onChange: (e) => this.updatePreference("rate", e ?? null),
      supportedRange: he.range,
      step: he.step
    });
  }
  get pitch() {
    return new re({
      initialValue: this.preferences.pitch,
      effectiveValue: this.settings.pitch,
      isEffective: this.preferences.pitch != null,
      onChange: (e) => this.updatePreference("pitch", e ?? null),
      supportedRange: de.range,
      step: de.step
    });
  }
  get volume() {
    return new re({
      initialValue: this.preferences.volume,
      effectiveValue: this.settings.volume,
      isEffective: this.preferences.volume != null,
      onChange: (e) => this.updatePreference("volume", e ?? null),
      supportedRange: ge.range,
      step: ge.step
    });
  }
}
const Xt = ["audio", "figure", "image", "math", "table", "video"], en = [
  ...Xt,
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
], Ys = [
  ...en,
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
], Xs = {
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
}, ei = {
  none: /* @__PURE__ */ new Set(),
  few: new Set(Xt),
  some: new Set(en),
  most: new Set(Ys)
}, ze = {
  table: { few: "inline", some: "block", most: "block" }
};
function oe(n) {
  const e = {};
  for (const t of Object.keys(ze))
    e[t] = ze[t]?.[n] ?? "inline";
  return e;
}
const ti = {
  none: oe("none"),
  few: oe("few"),
  some: oe("some"),
  most: oe("most")
}, ca = Object.keys(ze);
function ni(n, e) {
  const t = n === "custom" ? {} : ti[n];
  if (!e) return t;
  const s = { ...t };
  for (const i of Object.keys(e)) {
    const a = e[i]?.[n];
    a && (s[i] = a);
  }
  return s;
}
class vt {
  format;
  inlineContextualization;
  verbosity;
  skip;
  contextualize;
  language;
  segmentation;
  pauseDuration;
  autoPause;
  rate;
  pitch;
  volume;
  constructor(e, t) {
    this.format = e.format ?? t.format, this.inlineContextualization = e.inlineContextualization ?? t.inlineContextualization, this.verbosity = e.verbosity ?? t.verbosity, this.verbosity === "custom" ? (this.skip = e.skip ?? t.skip, this.contextualize = e.contextualize ?? t.contextualize) : (this.skip = [...Xs[this.verbosity]], this.contextualize = [...ei[this.verbosity]]), this.language = e.language ?? t.language, this.segmentation = e.segmentation ?? t.segmentation, this.pauseDuration = e.pauseDuration ?? t.pauseDuration, this.autoPause = e.autoPause ?? t.autoPause, this.rate = e.rate ?? t.rate, this.pitch = e.pitch ?? t.pitch, this.volume = e.volume ?? t.volume;
  }
}
const yt = /* @__PURE__ */ new WeakMap(), tn = /* @__PURE__ */ new WeakMap();
function St(n, e) {
  tn.set(n, e);
}
const nn = /* @__PURE__ */ new WeakSet();
function bt(n) {
  return nn.add(n), n;
}
function si(n, e, t) {
  const s = tn.get(n);
  if (s) {
    const u = ct(s.map, e), g = ct(s.map, e + t);
    e = u, t = Math.max(0, g - u);
  }
  const i = n.offsets, a = !n.plain && !!n.ssml, r = s?.plain ?? n.plain ?? (n.ssml ? z(n.ssml) : "");
  if (!i?.length || !r) return;
  const o = yt.get(n), l = o !== void 0 && e >= o.cursor;
  let c = l ? o.cursor : 0;
  for (let u = l ? o.pieceIndex : 0; u < i.length; u++) {
    const g = i[u], h = g.locate.text?.highlight, d = h ? a ? z(h) : h : r.slice(c);
    if (!d) continue;
    const f = r.indexOf(d, c);
    if (f === -1) continue;
    const p = f + d.length;
    if (e >= f && e < p) {
      if (nn.has(g.locate)) return;
      yt.set(n, { pieceIndex: u, cursor: c });
      const m = e - f, S = d.substring(m, Math.min(m + t, d.length));
      return { locate: {
        ...g.locate,
        domRange: void 0,
        text: {
          highlight: S,
          before: d.substring(0, m),
          after: d.substring(m + S.length)
        }
      }, word: S };
    }
    c = p;
  }
}
function ii(n, e) {
  return e === "sentence" && n.offsets?.length ? n.offsets.map((t) => t.locate) : n.locate ? [n.locate] : [];
}
function U(n) {
  return { pattern: new RegExp(`(\\d+)\\s?u${n}\\b`, "g"), replace: (e, t) => `${t}µ${n}` };
}
const ai = {
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
}, ri = {
  ...ai,
  // Rejects "(c)" directly preceded by "(a)"/"(b)" (a lettered list, not a copyright notice).
  "(c)": { pattern: new RegExp("(?<!\\([ab]\\)\\s{0,3})\\(c\\)", "g"), replace: "©" },
  "(C)": { pattern: new RegExp("(?<!\\([AB]\\)\\s{0,3})\\(C\\)", "g"), replace: "©" },
  "(r)": "®",
  "(R)": "®",
  "(tm)": "™",
  "(TM)": "™",
  deg: { pattern: /(\d+)\s?deg\b/g, replace: (n, e) => `${e}°` },
  x: { pattern: /(\d+)\s?[xX]\s?(?=\d)/g, replace: (n, e) => `${e}×` },
  ug: U("g"),
  um: U("m"),
  us: U("s"),
  uL: U("L"),
  uF: U("F"),
  uA: U("A"),
  uV: U("V"),
  uW: U("W"),
  uN: U("N"),
  umol: U("mol"),
  "->": "→",
  "<-": "←",
  // Reversed from every other entry: engines pattern-match the ASCII foot/inch
  // convention for pronunciation, but drop the real prime marks silently.
  "′": "'",
  "″": '"'
}, oi = { contextualizations: { abstract: { block: { start: "Start of the abstract.", end: "End of the abstract." } }, acknowledgments: { block: { start: "Start of the acknowledgments.", end: "End of the acknowledgments." } }, afterword: { block: { start: "Start of the afterword.", end: "End of the afterword." } }, appendix: { block: { start: "Start of the appendix.", end: "End of the appendix." } }, aside: { block: { start: "Start of the aside.", end: "End of the aside." } }, audio: { inline: { labelled: "Audio with a label: {{ description }}", unlabelled: "Audio with no label." } }, bibliography: { block: { start: "Start of the bibliography.", end: "End of the bibliography." } }, blockquote: { inline: "Blockquote." }, cell: { inline: { withHeader: "{{ header }}: {{ value }}", withoutHeader: "{{ value }}" } }, chapter: { block: { start: "Start of the chapter.", end: "End of the chapter." } }, colophon: { inline: "Colophon." }, complementary: { block: { start: "Start of the complementary content.", end: "End of the complementary content." } }, conclusion: { block: { start: "Start of the conclusion.", end: "End of the conclusion." } }, cover: { inline: { labelled: "Cover with a label: {{ description }}", unlabelled: "Cover with no label." } }, credit: { inline: "Credit." }, credits: { block: { start: "Start of the credits.", end: "End of the credits." } }, dedication: { inline: "Dedication." }, definition: { inline: "Definition." }, details: { block: { start: "Start of the disclosure.", end: "End of the disclosure." } }, endnotes: { block: { start: "Start of the endnotes.", end: "End of the endnotes." } }, epigraph: { inline: "Epigraph." }, epilogue: { block: { start: "Start of the epilogue.", end: "End of the epilogue." } }, errata: { block: { start: "Start of the errata.", end: "End of the errata." } }, example: { block: { start: "Start of the example.", end: "End of the example." } }, figure: { inline: "Figure: {{ description }}" }, footnote: { block: { start: "Start of the footnote.", end: "End of the footnote." } }, foreword: { block: { start: "Start of the foreword.", end: "End of the foreword." } }, glossary: { block: { start: "Start of the glossary.", end: "End of the glossary." } }, heading1: { inline: "Heading level 1." }, heading2: { inline: "Heading level 2." }, heading3: { inline: "Heading level 3." }, heading4: { inline: "Heading level 4." }, heading5: { inline: "Heading level 5." }, heading6: { inline: "Heading level 6." }, image: { inline: { labelled: "Image with a label: {{ description }}", unlabelled: "Image with no label." } }, index: { block: { start: "Start of the index.", end: "End of the index." } }, introduction: { block: { start: "Start of the introduction.", end: "End of the introduction." } }, list: { block: { start: "Start of the list.", end: "End of the list." } }, listItem: { inline: "List item." }, math: { inline: { labelled: "{{ description }}", unlabelled: "Math formula with no label." } }, notice: { inline: "Notice." }, pagebreak: { inline: "Pagebreak." }, pagelist: { block: { start: "Start of the page list.", end: "End of the page list." } }, part: { inline: "Part." }, preface: { block: { start: "Start of the preface.", end: "End of the preface." } }, prologue: { block: { start: "Start of the prologue.", end: "End of the prologue." } }, pullquote: { inline: "Pullquote." }, qna: { block: { start: "Start of the questions and answers.", end: "End of the questions and answers." } }, row: { inline: "Row: {{ count }}" }, rowheader: { inline: { withHeader: "{{ header }}: {{ value }}", withoutHeader: "{{ value }}" } }, separator: { inline: "Separator." }, subtitle: { inline: "Subtitle." }, summary: { inline: "Summary." }, table: { block: { end: "End of the table.", start: { labelled: "Table: {{ description }}. {{ lines }}. {{ columns }}.", unlabelled: "Table. {{ lines }}. {{ columns }}." } }, inline: { labelled: "Table: {{ description }}. {{ lines }}. {{ columns }}.", unlabelled: "Table. {{ lines }}. {{ columns }}." }, parts: { columns_one: "1 column", columns_other: "{{ count }} columns", lines_one: "1 line", lines_other: "{{ count }} lines" } }, term: { inline: "Term." }, tip: { inline: "Tip." }, video: { inline: { labelled: "Video with a label: {{ description }}", unlabelled: "Video with no label." } } } }, li = {
  speech: oi
}, sn = li.speech.contextualizations, wt = { en: sn }, ci = {};
async function ui(n) {
  const e = wt[n];
  if (e) return e;
  const t = ci[n];
  if (!t) return sn;
  const s = (await t()).speech.contextualizations;
  return wt[n] = s, s;
}
const hi = {
  de: ["A.", "A.M.", "Abs.", "Abt.", "Abw.", "Adj.", "Adr.", "Akt.", "Allg.", "Alt.", "App.", "Apr.", "Art.", "Aug.", "Ausg.", "Ausschl.", "B.", "Bed.", "Ben.", "Ber.", "Best.", "Bibl.", "C.", "Ca.", "Chin.", "Chr.", "Co.", "D.", "D. h.", "Dat.", "Dez.", "Di.", "Dim.", "Dipl.-Ing.", "Dipl.-Kfm.", "Dir.", "Do.", "Dr.", "Dtzd.", "Einh.", "Erf.", "Evtl.", "F.", "F.f.", "Fa.", "Fam.", "Feb.", "Fn.", "Folg.", "Forts. f.", "Fr.", "Frl.", "G.", "Gebr.", "Gem.", "Geograph.", "Ges.", "Gesch.", "Ggf.", "Hbf.", "Hptst.", "Hr.", "Hrn.", "Hrsg.", "I.", "Inc.", "Ing.", "Inh.", "Int.", "J.", "J.D.", "Jahrh.", "Jan.", "Jr.", "Kap.", "Kfm.", "Kl.", "Konv.", "Kop.", "L.", "Ltd.", "M.", "Max.", "Mi.", "Min.", "Mind.", "Mio.", "Mo.", "Mod.", "Mrd.", "Msp.", "N.", "Nov.", "Nr.", "O.", "Obj.", "Okt.", "Op.", "P.", "P.M.", "PIN.", "Pfd.", "Phys.", "Port.", "Prot.", "Proz.", "Qu.", "R.", "Rd.", "Reg.", "Reg.-Bez.", "Rel.", "Rep.", "S.A.", "Sa.", "Schr.", "Sek.", "Sep.", "Sept.", "So.", "Spezif.", "St.", "StR.", "Std.", "Str.", "T.", "Tel.", "Temp.", "Test.", "Trans.", "Tägl.", "U.", "U. U.", "U.S.", "U.S.A.", "U.U.", "Urspr.", "Ursprüngl.", "Verf.", "Vgl.", "W.", "Wg.", "Y.", "Z.", "Z. B.", "Z. Zt.", "Ztr.", "a.D.", "a.M.", "a.Rh.", "a.a.O.", "a.a.S.", "am.", "amtl.", "b.", "beil.", "d.J.", "d.Ä.", "e.V.", "e.Wz.", "e.h.", "ehem.", "eigtl.", "einschl.", "entspr.", "erw.", "ev.", "evtl.", "exkl.", "frz.", "geb.", "gedr.", "gek.", "gesch.", "gest.", "ggf.", "ggfs.", "hpts.", "i.A.", "i.B.", "i.H.", "i.J.", "i.R.", "i.V.", "inkl.", "jew.", "jhrl.", "k. u. k.", "k.u.k.", "kath.", "kfm.", "kgl.", "led.", "m.E.", "m.W.", "mtl.", "möbl.", "n. Chr.", "n.u.Z.", "näml.", "o.A.", "o.B.", "o.g.", "od.", "p.Adr.", "r.", "röm.", "röm.-kath.", "s.", "s.a.", "schles.", "schweiz.", "schwäb.", "sog.", "südd.", "tägl.", "u.", "u. Z.", "u.A.w.g.", "u.U.", "u.a.", "u.v.a.", "u.Ä.", "u.ä.", "v. Chr.", "v. H.", "v. u. Z.", "v.Chr.", "v.H.", "v.R.w.", "v.T.", "v.u.Z.", "verh.", "verw.", "vgl.", "z.", "z.B.", "z.Hd.", "z.Z.", "zzgl.", "österr."],
  en: ["A.D.", "A.I.", "A.M.", "A.S.", "AA.", "AB.", "Abs.", "Adj.", "Adv.", "Alt.", "Approx.", "Aug.", "B.V.", "C.F.", "C.O.D.", "Capt.", "Col.", "Comm.", "Conn.", "Cont.", "D.A.", "D.C.", "DC.", "DR.", "Dec.", "Def.", "Dept.", "Diff.", "Dr.", "E.G.", "E.g.", "Ed.", "Est.", "Etc.", "Ex.", "Exec.", "Feb.", "Fn.", "Fri.", "Hon.B.A.", "I.", "I.D.", "I.T.", "I.e.", "J.B.", "J.D.", "J.K.", "Jan.", "Jun.", "K.R.", "L.A.", "L.P.", "Lev.", "Lib.", "Lt.", "Lt.Cdr.", "M.", "M.I.T.", "M.R.", "M.T.", "MR.", "Maj.", "Mar.", "Mart.", "Mb.", "Md.", "Mgr.", "Min.", "Misc.", "Mr.", "Mrs.", "Ms.", "Mt.", "N.V.", "N.Y.", "Nov.", "Nr.", "Num.", "Op.", "Org.", "P.M.", "P.O.", "P.V.", "PP.", "Ph.D.", "Phys.", "Prof.", "Pvt.", "R.L.", "R.T.", "Rep.", "Rev.", "S.A.", "S.A.R.", "S.E.", "S.p.A.", "Sep.", "Sept.", "Sgt.", "Sq.", "St.", "U.S.", "U.S.A.", "U.S.C.", "VS.", "Yr.", "a.m.", "d.", "dr.", "exec.", "pp.", "vs."],
  es: ["A.C.", "AA.", "All.", "Ant.", "Av.", "Avda.", "Bien.", "C.", "C.P.", "C.S.", "C.V.", "CA.", "Col.", "Comm.", "Corp.", "Cía.", "D.", "DC.", "Da.", "Desc.", "Desv.", "Dr.", "Dra.", "Drs.", "Dto.", "Dª.", "Dña.", "Em.", "Emm.", "Exc.", "Excma.", "Excmas.", "Excmo.", "Excmos.", "Exma.", "Exmas.", "Exmo.", "Exmos.", "FF.CC.", "Fabric.", "Fr.", "H.P.", "Id.", "Ilma.", "Ilmas.", "Ilmo.", "Ilmos.", "Inc.", "JJ.OO.", "K.", "Kit.", "Korn.", "L.", "Lcda.", "Lcdo.", "Lda.", "Ldo.", "Lic.", "Ltd.", "Ltda.", "Ltdo.", "M.", "MM.", "Mons.", "Mr.", "Mrs.", "O.M.", "PP.", "R.D.", "R.U.", "RAM.", "RR.HH.", "Rdo.", "Rdos.", "Reg.", "Rev.", "Rol.", "Rvdmo.", "Rvdmos.", "Rvdo.", "Rvdos.", "SA.", "SS.AA.", "SS.MM.", "Sdad.", "Seg.", "Sol.", "Sr.", "Sra.", "Sras.", "Sres.", "Srta.", "Srtas.", "Sta.", "Sto.", "Trab.", "U.S.", "U.S.A.", "Var.", "Vda.", "a. C.", "a. e. c.", "abr.", "afma.", "afmas.", "afmo.", "afmos.", "ago.", "bco.", "bol.", "c/c.", "cap.", "cf.", "cfr.", "col.", "d. C.", "depto.", "deptos.", "dic.", "doc.", "dom.", "dpto.", "dptos.", "dtor.", "e. c.", "e.g.", "ed.", "ej.", "ene.", "feb.", "fig.", "figs.", "fund.", "hnos.", "jue.", "jul.", "jun.", "licda.", "licdo.", "lun.", "mar.", "may.", "mié.", "ms.", "mss.", "mtro.", "nov.", "ntra.", "ntro.", "oct.", "p.ej.", "prof.", "prov.", "sept.", "sras.", "sres.", "srs.", "ss.", "sáb.", "trad.", "v.gr.", "vid.", "vie.", "vs."],
  fr: ["All.", "C.", "Comm.", "D.", "DC.", "Desc.", "Inc.", "Jr.", "L.", "M.", "MM.", "Mart.", "Op.", "P.", "P.-D. G.", "P.O.", "Prof.", "S.A.", "S.M.A.R.T.", "U.", "U.S.", "U.S.A.", "Var.", "W.", "acoust.", "adr.", "anc.", "ann.", "anon.", "ap. J.-C.", "append.", "aux.", "av. J.-C.", "avr.", "broch.", "bull.", "cam.", "categ.", "coll.", "collab.", "config.", "dest.", "dict.", "dim.", "dir.", "doc.", "déc.", "encycl.", "exempl.", "fig.", "févr.", "gouv.", "graph.", "hôp.", "ill.", "illustr.", "imm.", "imprim.", "indus.", "janv.", "jeu.", "juil.", "lun.", "mar.", "mer.", "niv.", "nov.", "oct.", "quart.", "réf.", "sam.", "sept.", "symb.", "synth.", "syst.", "trav. publ.", "ven.", "voit.", "éd.", "édit.", "équiv.", "éval."],
  it: ["C.P.", "Cfr.", "D.", "DC.", "Geom.", "Ing.", "L.", "Liv.", "Ltd.", "Mod.", "N.B.", "N.d.A.", "N.d.E.", "N.d.T.", "O.d.G.", "S.A.R.", "S.M.A.R.T.", "S.p.A.", "Sig.", "U.S.", "U.S.A.", "a.C.", "ag.", "all.", "arch.", "avv.", "c.c.p.", "d.C.", "d.p.R.", "div.", "dott.", "dr.", "fig.", "int.", "mitt.", "on.", "p.", "p.i.", "pag.", "rag.", "sez.", "tab.", "tav.", "ver.", "vol."],
  pt: ["A.C.", "Alm.", "Av.", "Dir.", "Dr.", "Dra.", "Dras.", "Drs.", "E.", "Est.", "Exma.", "Exmo.", "Fr.", "Ilma.", "Ilmo.", "Jr.", "Ltd.", "Ltda.", "Mar.", "N.Sra.", "N.T.", "P.M.", "Pe.", "Ph.D.", "R.", "S.", "S.A.", "Sta.", "Sto.", "V.T.", "W.C.", "a.C.", "a.m.", "abr.", "abrev.", "adm.", "aer.", "ago.", "agric.", "anat.", "ap.", "apart.", "apt.", "arit.", "arqueol.", "arquit.", "astron.", "autom.", "aux.", "biogr.", "bras.", "cap.", "caps.", "cat.", "cel.", "cf.", "col.", "com.", "comp.", "compl.", "cont.", "contab.", "créd.", "cx.", "círc.", "cód.", "d.C.", "des.", "desc.", "dez.", "dipl.", "dir.", "div.", "doc.", "déb.", "ed.", "educ.", "elem.", "eletr.", "eletrôn.", "end.", "eng.", "esp.", "ex.", "f.", "fac.", "fasc.", "fem.", "fev.", "ff.", "fig.", "fil.", "filos.", "fisiol.", "fl.", "fot.", "fr.", "fís.", "geom.", "gram.", "gên.", "hist.", "ind.", "ingl.", "jan.", "jul.", "jun.", "jur.", "l.", "lat.", "lin.", "lit.", "liter.", "long.", "mai.", "mar.", "mat.", "matem.", "mov.", "máq.", "méd.", "mús.", "neol.", "nov.", "náut.", "obs.", "odont.", "odontol.", "org.", "organiz.", "out.", "p.", "p. ex.", "p.m.", "pal.", "pol.", "port.", "pp.", "pq.", "prod.", "prof.", "profa.", "pron.", "próx.", "psicol.", "pág.", "quím.", "r.s.v.p.", "ref.", "rel.", "relat.", "rep.", "res.", "rod.", "set.", "sociol.", "sup.", "séc.", "símb.", "tec.", "tecnol.", "tel.", "trad.", "transp.", "univ.", "vol.", "vs.", "álg.", "índ."],
  ru: ["авг.", "апр.", "дек.", "до н. э.", "кв.", "н. э.", "н.э.", "нояб.", "окт.", "отд.", "проф.", "руб.", "сент.", "тел.", "тыс.", "ул.", "февр.", "янв."],
  th: ["ค.ศ."]
};
function Pe(n, e, t) {
  let s = t;
  for (; s > e && /\s/.test(n[s - 1]); ) s--;
  return s;
}
const di = /[\s([{"'“‘]/;
function gi(n, e) {
  for (const t of e) {
    if (n.length < t.length || !n.endsWith(t)) continue;
    const s = n.length - t.length - 1;
    if (s < 0 || di.test(n[s])) return !0;
  }
  return !1;
}
function fi(n) {
  let e = 0;
  for (const t of n)
    if (new RegExp("\\p{L}", "u").test(t) && e++, e >= 2) return !0;
  return !1;
}
function pi(n) {
  return /\.{3,}$/.test(n);
}
function mi(n, e, t, s) {
  if (s === "“") return !0;
  if (s !== '"') return !1;
  let i = 0;
  for (let a = e; a < t; a++) n[a] === '"' && i++;
  return i % 2 === 1;
}
const vi = new RegExp(`[.!?][”"'’)\\]]*\\s+—\\s+(?=\\p{Lu})`, "gu");
function yi(n, e) {
  const t = [...n.matchAll(vi)].map((i) => i.index + i[0].length);
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
function Si(n, e, t) {
  const s = yi(n, e).map((a) => ({ ...a }));
  for (let a = 0; a < s.length - 1; a++) {
    const r = Pe(n, s[a].start, s[a].end);
    if (r !== s[a].end || r <= s[a].start) continue;
    const o = n[r - 1];
    mi(n, s[a].start, r, o) && (s[a].end -= 1, s[a + 1].start -= 1);
  }
  const i = [];
  for (const a of s) {
    let r = a;
    for (; i.length > 0; ) {
      const o = i[i.length - 1], l = Pe(n, o.start, o.end), c = n.slice(o.start, l);
      if (!gi(c, t) && fi(c) && !pi(c)) break;
      i.pop(), r = { start: o.start, end: r.end };
    }
    i.push(r);
  }
  return i.map((a) => {
    const r = Pe(n, a.start, a.end);
    return { text: n.slice(a.start, r), start: a.start, end: a.end, contentEnd: r };
  });
}
const kt = /* @__PURE__ */ new Map();
function bi(n) {
  let e = kt.get(n);
  return e || (e = new Intl.Segmenter(n, { granularity: "sentence" }), kt.set(n, e)), e;
}
async function wi(n, e, t) {
  if (e === "") return [];
  const i = [...bi(n).segment(e)].map((o) => ({ start: o.index, end: o.index + o.segment.length })), a = ve(hi, n) ?? [], r = t ? [...a, ...t] : a;
  return Si(e, i, r);
}
const ua = [
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
], ki = [
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
], Ci = {
  footnote: { drops: ["aside"], unconditional: !0 },
  cover: { drops: ["image"] },
  pullquote: { drops: ["blockquote", "aside"] },
  epigraph: { drops: ["blockquote"] }
}, Ei = ["noteref", "pagebreak"], Ri = ["audio", "video", "image", "figure", "math", "table", "cover"], Ii = ["cell", "rowheader"], Pi = ["separator"], Ct = new Set(ki), Ai = new Set(Ei), xi = new Set(Ri), an = new Set(Ii), Li = new Set(Pi);
function Oi(n, e) {
  const t = En.createInstance();
  return t.init({
    lng: n,
    resources: { [n]: { translation: e } },
    interpolation: { escapeValue: !1 }
  }), t;
}
function Ui(n, e, t) {
  if (!e) return n;
  const s = { ...n };
  for (const i of Object.keys(e))
    s[i] = t(n[i], e[i]);
  return s;
}
function rn(n, e) {
  if (typeof e == "string" || typeof n != "object") return e;
  const t = { ...n };
  for (const s of Object.keys(e))
    t[s] = rn(n[s], e[s]);
  return t;
}
function Vi(n, e) {
  return Ui(n, e, rn);
}
function on(n, e = [], t = /* @__PURE__ */ new Map()) {
  for (const s of n)
    t.set(s, e), s.children && on(s.children, [s, ...e], t);
  return t;
}
async function ln(n, e) {
  const t = e.contextualizationLocale ?? "en", s = Vi(
    await ui(t),
    e.contextualization?.contextualizations
  );
  return {
    i18n: Oi(t, s),
    skip: new Set(e.skip ?? []),
    contextualize: new Set(e.contextualize ?? []),
    contextualizationShapes: e.contextualization?.shapes ?? {},
    contextualizationParams: e.contextualization?.params,
    format: e.format ?? "plain",
    inlineContextualization: e.inlineContextualization ?? !1,
    language: e.language ?? "block-level",
    segmentation: e.segmentation?.mode ?? "structure",
    // segmentSentences() already applies builtInSuppressions internally
    // (Intl.Segmenter has no built-in equivalent of its own) — this is only
    // the caller's own additive extras, per `SegmentationOptions.suppressions`.
    segmentationSuppressions: e.segmentation?.suppressions ?? {},
    segmenter: e.segmentation?.segmenter ?? wi,
    // Per-key override, not an additive union — each key holds one whole rule.
    substitutions: { ...ri, ...e.substitutions },
    blockStarts: /* @__PURE__ */ new Set(),
    tableRowNumbers: /* @__PURE__ */ new Map(),
    tableCellHeaders: /* @__PURE__ */ new Map(),
    synthetic: /* @__PURE__ */ new Set(),
    ancestorChains: on(n),
    pendingRange: /* @__PURE__ */ new Map(),
    edgeSubstitutedLocate: /* @__PURE__ */ new WeakMap()
  };
}
const Ti = /<lang xml:lang="[^"]*">([\s\S]*?)<\/lang>/g;
function cn(n) {
  return n.replace(Ti, "$1");
}
function X(n) {
  return n.role ? [...n.role] : [];
}
function Ne(n) {
  return n.role?.has("math") ? void 0 : n.text;
}
function $e(n) {
  const e = n.description?.text;
  if (e)
    return e.plain ?? (e.ssml !== void 0 ? z(e.ssml) : void 0);
}
function H(n, e) {
  const t = n.cssSelector ?? n.domRange?.start.cssSelector;
  if (!t) return { ...n, text: { highlight: e } };
  const s = { cssSelector: t, text: { highlight: e } };
  return n.href !== void 0 && (s.href = n.href), s;
}
function x(n, e) {
  const t = et(n);
  if (t) return { own: !0, ref: t };
  for (const s of e.get(n) ?? []) {
    const i = et(s);
    if (i) return { own: !1, ref: i };
  }
}
function Ke(n, e) {
  if (n)
    return n.own ? n.ref : H(n.ref, e);
}
function We(n, e, t) {
  return (n && e ? Rn(n.ref, e.ref) : void 0) ?? t;
}
function un(n, e, t) {
  const { ancestorChains: s } = t, i = /* @__PURE__ */ new Map();
  for (const a of e)
    a && !Array.isArray(a) && i.set(a, (i.get(a) ?? 0) + 1);
  return n.map((a, r) => {
    if (a.offsets) return a;
    const o = e[r], l = a.plain ?? a.ssml ?? "";
    if (Array.isArray(o)) {
      const [h, d] = o, f = x(h, s), p = x(d, s), m = We(f, p, Ke(f, l));
      return m ? { ...a, locate: m } : a;
    }
    const c = o, u = c ? x(c, s) : void 0;
    if (!u) return a;
    const g = { ...a, locate: u.ref };
    if (!t.synthetic.has(a)) {
      const h = t.pendingRange.get(a), d = h !== void 0 || c && (i.get(c) ?? 0) > 1;
      g.locate = u.own && !d ? u.ref : H(u.ref, l), g.offsets = [{ start: h?.start ?? 0, end: h?.end ?? l.length, locate: g.locate }];
    }
    return g;
  });
}
function Qe(n) {
  const e = Be(Ne(n));
  return e ? e.plain ?? (e.ssml ? z(e.ssml) : "") : "";
}
function zi(n) {
  const e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map();
  let s = 0, i;
  return n.forEach((a, r) => {
    e.set(a, r + 1);
    const o = a.children ?? [];
    if (s = Math.max(s, o.length), o.some((l) => l.role?.has("columnheader"))) {
      i = o.map(Qe);
      return;
    }
    i && o.forEach((l, c) => {
      if (!l.role?.has("cell") && !l.role?.has("rowheader")) return;
      const u = i[c];
      u && t.set(l, u);
    });
  }), { lines: n.length, columns: s, rowNumbers: e, cellHeaders: t };
}
function M(n, e) {
  const t = e.format === "ssml" ? { ssml: B(n) } : { plain: n };
  return e.synthetic.add(t), t;
}
function D(n, e, t, s) {
  n.push(...s);
  for (let i = 0; i < s.length; i++) e.push(t);
}
function hn(n, e, t, s, i, a, r) {
  r ? (i.some((o) => t.blockStarts.has(o)) && t.blockStarts.add(r), D(n, e, a[0] ?? s, [r])) : (n.push(...i), e.push(...a));
}
function ee(n, e, t, s) {
  const i = t ? `${e}.${t}` : void 0;
  if (i && n.i18n.exists(i)) return n.i18n.t(i, s);
  if (n.i18n.exists(e)) return n.i18n.t(e, s);
}
function Je(n, e) {
  return an.has(n) ? !0 : e.contextualize.has(n);
}
function Ni(n, e, t) {
  return e.some((s) => {
    const i = Ci[s];
    return i?.drops.includes(n) ? i.unconditional || Je(s, t) : !1;
  });
}
function fe(n, e, t, s, i) {
  const a = e.lastIndexOf(t);
  if (a === -1) return;
  const r = x(s, i.ancestorChains);
  if (!r) return;
  const o = H(r.ref, t);
  n.offsets = [{ start: a, end: a + t.length, locate: o }], n.locate = r.own ? r.ref : o;
}
function Et(n, e, t, s, i, a) {
  const r = a?.value;
  if (r !== void 0 && r === Qe(t)) {
    if (s.language !== "none") {
      const l = t.text?.language;
      l && (n.language = l);
    }
    s.synthetic.delete(n), fe(n, e, r, t, s);
    return;
  }
  const o = a?.description;
  o !== void 0 && o === $e(t) && (i === "figure" || i === "table") && fe(n, e, o, t, s);
}
function Rt(n, e, t, s, i, a, r, o) {
  if (!Je(i, s)) return;
  if ((s.i18n.exists(`${i}.block.start`) || s.i18n.exists(`${i}.block.end`)) && s.contextualizationShapes[i] !== "inline") {
    const c = a === "before" ? `${i}.block.start` : `${i}.block.end`, u = ee(s, c, r, o);
    if (u) {
      const g = M(u, s);
      Et(g, u, t, s, i, o), D(n, e, t, [g]);
    }
    return;
  }
  if (a === "before") {
    const c = ee(s, `${i}.inline`, r, o);
    if (c) {
      const u = M(c, s);
      Et(u, c, t, s, i, o), D(n, e, t, [u]);
    }
  }
}
function It(n, e, t, s) {
  const i = `${e}.parts.${t}`;
  return n.i18n.exists(i, { count: s }) ? n.i18n.t(i, { count: s }) : String(s);
}
function Bi(n) {
  const e = $e(n);
  return e === void 0 ? { variantKey: "unlabelled" } : { variantKey: "labelled", params: { description: e } };
}
function Pt(n, e) {
  const t = e.tableCellHeaders.get(n);
  return {
    variantKey: t !== void 0 ? "withHeader" : "withoutHeader",
    params: { header: t ?? "", value: Qe(n) }
  };
}
const Mi = {
  table: (n, e) => {
    const t = (n.children ?? []).filter((i) => i.role?.has("row")), s = zi(t);
    for (const [i, a] of s.rowNumbers) e.tableRowNumbers.set(i, a);
    for (const [i, a] of s.cellHeaders) e.tableCellHeaders.set(i, a);
    return {
      params: {
        lines: It(e, "table", "lines", s.lines),
        columns: It(e, "table", "columns", s.columns)
      }
    };
  },
  row: (n, e) => ({ params: { count: String(e.tableRowNumbers.get(n) ?? "") } }),
  cell: Pt,
  rowheader: Pt
};
function At(n, e, t) {
  const s = Bi(e);
  let i = s.variantKey, a = s.params;
  const r = Mi[n]?.(e, t);
  r && (r.variantKey && (i = r.variantKey), a = { ...a, ...r.params });
  const o = t.contextualizationParams?.(n, e);
  return o && (a = { ...a, ...o }), { variantKey: i, params: a };
}
function pe(n) {
  let e = "";
  const t = [];
  for (const s of n) {
    if (s.length === 1 && os(s) && e.endsWith(s)) {
      t.push({ start: e.length, end: e.length });
      continue;
    }
    e && !te(s) && !/\s$/.test(e) && !/^\s/.test(s) && (e += " ");
    const i = e.length;
    e += s, t.push({ start: i, end: e.length });
  }
  return { joined: e, ranges: t };
}
function Ee(n, e) {
  const t = In(n), s = x(n, e.ancestorChains)?.ref;
  if (t) {
    const i = { cssSelector: t };
    return s?.href !== void 0 && (i.href = s.href), bt(i);
  }
  return s && bt(s);
}
function Di(n, e, t) {
  const s = [];
  return n.forEach((i, a) => {
    if (i.offsets) {
      s.push(...i.offsets);
      return;
    }
    if (t.synthetic.has(i)) return;
    const r = e[a];
    if (!r || Array.isArray(r)) return;
    const o = x(r, t.ancestorChains);
    if (!o) return;
    const l = t.format === "ssml" ? i.ssml : i.plain;
    if (!l) return;
    const c = t.pendingRange.get(i), u = ne(r) ? Ee(r, t) ?? o.ref : H(o.ref, l);
    s.push({ start: c?.start ?? 0, end: c?.end ?? l.length, locate: u });
  }), s;
}
function xt(n, e, t, s) {
  const i = s.edgeSubstitutedLocate.get(n);
  if (i) return i[t];
  if (!(!e || Array.isArray(e) || !ne(e)))
    return Ee(e, s);
}
function ji(n, e, t) {
  const s = n.map((l, c) => {
    if (l.locate) return l.locate;
    if (t.synthetic.has(l)) return;
    const u = e[c];
    if (!u || Array.isArray(u)) return;
    const g = t.format === "ssml" ? l.ssml : l.plain;
    if (g)
      return ne(u) ? x(u, t.ancestorChains) && Ee(u, t) : Ke(x(u, t.ancestorChains), g);
  }), i = s.findIndex((l) => l !== void 0);
  if (i === -1) return;
  let a = s.length - 1;
  for (; s[a] === void 0; ) a--;
  if (i === a) return s[i];
  const r = e[i], o = e[a];
  if (r && o && !Array.isArray(r) && !Array.isArray(o)) {
    const l = x(r, t.ancestorChains), c = x(o, t.ancestorChains);
    return We(l, c, s[i]);
  }
  return s[i];
}
function Ze(n, e, t) {
  let s, i = !1;
  const a = [], r = [], o = [];
  for (let f = 0; f < n.length; f++) {
    const p = n[f], m = t.format === "ssml" ? p.ssml : p.plain;
    if (m && (a.push(m), r.push(p), o.push(e[f]), p.language !== void 0)) {
      if (i && p.language !== s) return;
      s = p.language, i = !0;
    }
  }
  if (a.length === 0) return;
  const { joined: l } = pe(a), c = t.format === "ssml" ? { ssml: l } : { plain: l };
  s && (c.language = s), n.some((f) => t.synthetic.has(f)) && t.synthetic.add(c);
  const u = Di(r, o, t);
  u.length > 0 && (c.offsets = u);
  const g = ji(r, o, t);
  g && (c.locate = g);
  const h = xt(r[0], o[0], "leading", t), d = xt(r[r.length - 1], o[r.length - 1], "trailing", t);
  return (h || d) && t.edgeSubstitutedLocate.set(c, { leading: h, trailing: d }), c;
}
function dn(n, e, t, s) {
  if (e === "plain" && t !== "block-level" && t !== "none" && n.ssml && qt(n.ssml))
    return Gt(n.ssml, n.language).map((a) => {
      const r = { plain: a.plain };
      return a.language && (r.language = a.language), s.pendingRange.set(r, { start: a.start, end: a.end }), r;
    });
  const i = {};
  return n.language && (i.language = n.language), e === "ssml" ? i.ssml = n.ssml ?? B(n.plain ?? "") : i.plain = n.plain ?? z(n.ssml ?? ""), (t === "block-level" || t === "none") && (i.ssml && (i.ssml = cn(i.ssml)), t === "none" && delete i.language), [i];
}
function se(n, e) {
  return e !== "ssml" ? n : n.replace(/<[^>]+>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
}
function Lt(n, e) {
  return e.size > 0 && n.some((t) => e.has(t));
}
function Fi(n, e) {
  const t = Be(n.text), s = t ? dn(t, e.format, e.language, e) : [];
  if (!e.contextualize.has("pagebreak")) return s;
  const i = e.i18n.exists("pagebreak.block.start") ? "pagebreak.block.start" : "pagebreak.inline", a = ee(e, i);
  if (a === void 0) return s;
  const r = M(a, e);
  if (s.length === 0) return [r];
  const o = Ze([r, ...s], [void 0, ...s.map(() => n)], e);
  return o ? (o.plain !== void 0 && (o.plain += "."), o.ssml !== void 0 && (o.ssml += "."), [o]) : [r, ...s];
}
function _i(n) {
  return X(n).some((e) => Ai.has(e));
}
function Hi(n, e, t, s, i, a) {
  const r = n.text?.language, o = new Map((n.children ?? []).map((h) => [h.id, h])), l = [], c = [], u = [];
  for (const h of Es(e)) {
    if (h.placeholderId !== void 0) {
      const f = o.get(h.placeholderId);
      if (!f) continue;
      i.inlineContextualization || !_i(f) ? gn(f, l, c, i, a) : u.push(f);
      continue;
    }
    if (!h.ssml) continue;
    if (i.format === "plain" && i.language !== "block-level" && i.language !== "none" && qt(h.ssml)) {
      for (const f of Gt(h.ssml, r)) {
        const p = { plain: f.plain };
        f.language && (p.language = f.language), l.push(p), c.push(n);
      }
      continue;
    }
    const d = {};
    r && (d.language = r), i.format === "ssml" ? d.ssml = h.ssml : d.plain = z(h.ssml), (i.language === "block-level" || i.language === "none") && (d.ssml && (d.ssml = cn(d.ssml)), i.language === "none" && delete d.language), l.push(d), c.push(n);
  }
  const g = l.length > 1 ? Ze(l, c, i) : void 0;
  return hn(t, s, i, n, l, c, g), u;
}
function gn(n, e, t, s, i) {
  const a = X(n), r = $e(n);
  if (Lt(a, s.skip)) return;
  const o = a.some((d) => Ct.has(d)), l = o && !i, c = e.length, u = a.filter(
    (d) => d !== "footnote" && d !== "pagebreak" && !Ni(d, a, s)
  ), g = a.some((d) => xi.has(d) && s.contextualize.has(d)), h = a.includes("table") && r !== void 0 && !g;
  if (h) {
    const d = M(r, s);
    fe(d, r, r, n, s), D(e, t, n, [d]);
  }
  for (const d of u) {
    if (d === "figure" && r === void 0) continue;
    const { variantKey: f, params: p } = At(d, n, s);
    Rt(e, t, n, s, d, "before", f, p);
  }
  if (a.includes("noteref"))
    for (const d of n.children ?? []) {
      const f = X(d);
      if (!Lt(f, s.skip))
        if (f.includes("footnote")) {
          const p = s.contextualize.has("footnote"), m = s.i18n.exists("footnote.block.start") || s.i18n.exists("footnote.block.end"), S = f.some((E) => Ct.has(E)) && !i && !s.inlineContextualization, v = p ? ee(s, m ? "footnote.block.start" : "footnote.inline") : void 0, I = p && (v !== void 0 || m), P = [], y = [];
          v !== void 0 && (P.push(M(v, s)), y.push(d));
          const C = [], R = [];
          if (N([d], C, R, s, i || S), S && C.length > 0 && s.blockStarts.add(C[0]), P.push(...C), y.push(...R), I && m) {
            const E = ee(s, "footnote.block.end");
            E !== void 0 && (P.push(M(E, s)), y.push(d));
          }
          const w = I && P.length > 1 ? Ze(P, y, s) : void 0;
          hn(e, t, s, d, P, y, w);
        } else
          N([d], e, t, s, i);
    }
  else if (!a.some((d) => Li.has(d))) {
    const d = Ne(n)?.ssml;
    if (d && Cs(d)) {
      const f = Hi(n, d, e, t, s, i);
      if (f.length > 0) {
        const p = i || o && e.length > c;
        N(f, e, t, s, p);
      }
    } else if (a.includes("pagebreak")) {
      if (D(e, t, n, Fi(n, s)), n.children) {
        const f = i || o && e.length > c;
        N(n.children, e, t, s, f);
      }
    } else {
      const p = a.some((m) => an.has(m) && Je(m, s)) ? void 0 : Be(Ne(n));
      if (p && D(e, t, n, dn(p, s.format, s.language, s)), n.children) {
        const m = i || o && e.length > c;
        N(n.children, e, t, s, m);
      }
    }
  }
  if (l && e.length > c && s.blockStarts.add(e[c]), r !== void 0 && !g && !h) {
    const d = M(r, s);
    a.includes("figure") && fe(d, r, r, n, s), D(e, t, n, [d]);
  }
  for (const d of u) {
    if (d === "figure" && r === void 0) continue;
    const { variantKey: f, params: p } = At(d, n, s);
    Rt(e, t, n, s, d, "after", f, p);
  }
}
function N(n, e, t, s, i) {
  n.forEach((a, r) => gn(a, e, t, s, r === 0 ? i : !1));
}
const qi = _t;
async function fn(n, e, t, s) {
  const i = qi(n);
  let a = "";
  const r = [];
  for (const h of i)
    r.push(a.length), h.kind === "text" ? a += h.text : h.kind === "paired" && (a += h.innerText);
  if (!a) return;
  const o = await t(e, a, s);
  if (o.length <= 1) return;
  const l = [];
  let c = "", u = 0;
  function g(h, d, f) {
    let p = d;
    const m = d + h.length;
    for (; p < m; ) {
      const S = o[u], v = Math.min(m, S.end), I = v >= S.end && u < o.length - 1;
      let P = h.slice(p - d, v - d);
      I && (P = P.replace(/[ \t\r\n]+$/, ""));
      const y = B(P);
      c += f ? f(y) : y, p = v, I && (l.push(c), c = "", u++);
    }
  }
  return i.forEach((h, d) => {
    if (h.kind === "selfClosing")
      c += h.raw;
    else if (h.kind === "text")
      g(h.text, r[d]);
    else {
      const f = `<${h.tag}${h.attrs}>`, p = `</${h.tag}>`;
      h.innerText ? g(h.innerText, r[d], (m) => `${f}${m}${p}`) : c += f + p;
    }
  }), c && l.push(c.replace(/[ \t\r\n]+$/, "")), l;
}
async function Gi(n, e) {
  const t = n.language ?? "en", s = ve(e.segmentationSuppressions, t), i = e.format === "ssml" ? n.ssml : n.plain;
  if (!i) return;
  const a = await e.segmenter(t, se(i, e.format), s);
  if (a.length <= 1) return;
  if (e.format !== "ssml") return a.map((o) => ({ text: o.text, start: o.start, end: o.contentEnd }));
  const r = await fn(i, t, e.segmenter, s);
  if (r)
    return a.map((o, l) => ({ text: r[l], start: o.start, end: o.contentEnd }));
}
const Ot = /* @__PURE__ */ new Set([
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
function Ut(n) {
  return n ? X(Array.isArray(n) ? n[1] : n) : [];
}
function Vt(n, e, t) {
  const s = Array.isArray(n) ? n[e === "leading" ? 0 : 1] : n;
  return (t.ancestorChains.get(s) ?? []).filter((i) => X(i).some((a) => a !== "presentation"));
}
function $i(n, e) {
  return n.length === e.length && n.every((t, s) => t === e[s]);
}
function Tt(n, e, t, s) {
  return s.edgeSubstitutedLocate.get(e)?.[t] ? !0 : !!n && !Array.isArray(n) && ne(n);
}
function Ki(n, e, t, s, i) {
  if (i.synthetic.has(n) || i.synthetic.has(t) || !e || !s) return !1;
  const a = i.format === "ssml" ? n.ssml : n.plain, r = i.format === "ssml" ? t.ssml : t.plain;
  return !(!a || !r || (n.language ?? "en") !== (t.language ?? "en") || Ut(e).some((o) => Ot.has(o)) || Ut(s).some((o) => Ot.has(o)) || !$i(Vt(e, "trailing", i), Vt(s, "leading", i)) || Tt(e, n, "trailing", i) || Tt(s, t, "leading", i));
}
async function zt(n, e, t, s, i) {
  const a = t.synthetic.has(n) ? void 0 : await Gi(n, t);
  if (!a) {
    s.push(n), i.push(e);
    return;
  }
  const r = t.blockStarts.has(n);
  r && t.blockStarts.delete(n);
  const o = Array.isArray(e) ? void 0 : e, l = o ? x(o, t.ancestorChains) : void 0, c = o && ne(o) ? Ee(o, t) : void 0, u = t.edgeSubstitutedLocate.get(n);
  a.forEach(({ text: g, start: h, end: d }, f) => {
    const p = { ...n, [t.format]: g }, m = (f === 0 ? u?.leading : void 0) ?? (f === a.length - 1 ? u?.trailing : void 0) ?? c;
    if (m && l)
      p.locate = m, p.offsets = [{ start: h, end: d, locate: m }];
    else if (l) {
      const S = t.format === "ssml" ? se(g, t.format) : g, v = H(l.ref, S);
      p.locate = v, p.offsets = [{ start: h, end: d, locate: v }];
    }
    r && f === 0 && t.blockStarts.add(p), s.push(p), i.push(e);
  });
}
function me(n, e) {
  let t = 0;
  for (; t < n.length - 1 && n[t + 1].start <= e; ) t++;
  return t;
}
async function Wi(n, e, t, s) {
  const i = n.map((c) => se(e.format === "ssml" ? c.ssml : c.plain, e.format)), { joined: a, ranges: r } = pe(i), o = await e.segmenter(t, a, s), l = new Array(n.length - 1).fill(!1);
  for (const c of o) {
    const u = me(r, c.start), g = c.end > c.start ? me(r, c.end - 1) : u;
    for (let h = u; h < g; h++) l[h] = !0;
  }
  return l;
}
function Qi(n, e, t, s, i, a, r) {
  const o = [];
  for (let l = i; l <= a; l++) {
    const c = x(e[l], r.ancestorChains);
    if (!c) continue;
    const u = t[l], g = Math.max(u.start, s.start), h = Math.min(u.end, l === a ? s.contentEnd : s.end);
    if (h <= g) continue;
    const d = g - u.start, f = h - u.start, p = se(r.format === "ssml" ? n[l].ssml : n[l].plain, r.format), m = H(c.ref, p.slice(d, f));
    o.push({ start: d, end: f, locate: m });
  }
  return o;
}
async function Ji(n, e, t, s, i) {
  const a = n[0].language ?? "en", r = ve(t.segmentationSuppressions, a), o = n.map((f) => se(t.format === "ssml" ? f.ssml : f.plain, t.format)), { joined: l, ranges: c } = pe(o), u = await t.segmenter(a, l, r);
  let g, h;
  t.format === "ssml" && (h = pe(n.map((f) => f.ssml)).joined, g = u.length > 1 ? await fn(h, a, t.segmenter, r) : void 0), (u.length > 0 ? u : [{ text: l, start: 0, end: l.length, contentEnd: l.length }]).forEach((f, p) => {
    const m = me(c, f.start), S = f.end > f.start ? me(c, f.end - 1) : m, v = t.format === "ssml" ? g ? g[p] : h : f.text, I = { [t.format]: v };
    a && (I.language = a), n.slice(m, S + 1).some((E) => t.blockStarts.has(E)) && t.blockStarts.add(I);
    const y = Qi(n, e, c, f, m, S, t);
    y.length > 0 && (I.offsets = y);
    const C = x(e[m], t.ancestorChains), R = Ke(C, v), w = m !== S ? We(C, x(e[S], t.ancestorChains), R) : R;
    w && (I.locate = w), s.push(I), i.push(m === S ? e[m] : [e[m], e[S]]);
  });
}
async function pn(n, e, t) {
  if (t.segmentation !== "sentence") return { out: n, sources: e };
  const s = [], i = [];
  let a = 0;
  for (; a < n.length; ) {
    let r = a;
    for (; r + 1 < n.length && Ki(n[r], e[r], n[r + 1], e[r + 1], t); ) r++;
    if (r === a) {
      await zt(n[a], e[a], t, s, i), a = r + 1;
      continue;
    }
    const o = n.slice(a, r + 1), l = e.slice(a, r + 1), c = o[0].language ?? "en", u = await Wi(o, t, c, ve(t.segmentationSuppressions, c));
    let g = 0;
    for (let h = 0; h < o.length; h++)
      h < o.length - 1 && u[h] || (g === h ? await zt(o[g], l[g], t, s, i) : await Ji(o.slice(g, h + 1), l.slice(g, h + 1), t, s, i), g = h + 1);
    a = r + 1;
  }
  return { out: s, sources: i };
}
function mn(n, e) {
  return Object.keys(e.substitutions).length === 0 ? n : n.map((t) => {
    if (t.ssml) {
      const { ssml: o, plain: l, map: c } = ys(t.ssml, e.substitutions);
      if (o === t.ssml) return t;
      const u = { ...t, ssml: o };
      return St(u, { plain: l, map: c }), u;
    }
    const s = t.plain;
    if (!s) return t;
    const { text: i, map: a } = ms(s, e.substitutions);
    if (i === s) return t;
    const r = { ...t, plain: i };
    return St(r, { plain: s, map: a }), r;
  });
}
async function ha(n, e = {}) {
  const t = [], s = [], i = await ln(n, e);
  N(n, t, s, i, !1);
  const a = await pn(t, s, i);
  return mn(un(a.out, a.sources, i), i);
}
async function Zi(n, e = {}) {
  const t = [], s = [], i = await ln(n, e);
  N(n, t, s, i, !1);
  const a = await pn(t, s, i), r = a.out.map((l) => i.blockStarts.has(l)), o = un(a.out, a.sources, i);
  return { utterances: mn(o, i), sources: a.sources, blockStarts: r };
}
class da {
  engine;
  contentQueue = [];
  events = new we();
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
  contextualizationOverrides;
  segmentationOverrides;
  // The raw GND source, retained only when content was loaded via
  // `loadGndContent()`. Its absence is what makes submitPreferences()'s
  // extraction-affecting fields (format, verbosity, skip, contextualize,
  // language, segmentation) a no-op on content loaded via loadContent() — prosody
  // fields (rate/pitch/volume/pauseDuration/autoPause) still apply.
  source;
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
    this.engine = e, this._defaults = new Js(t.defaults), this._preferences = new Y(t.preferences), this._settings = new vt(this._preferences, this._defaults), this.contextualizationOverrides = t.contextualizationOverrides, this.segmentationOverrides = t.segmentationOverrides, this.setupEngineListeners(), this.applyEngineParameters(), this.initializeEngine();
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
    this.engine.on("start", () => {
      this.setNavigatorState("playing");
      const e = this.getCurrentContent();
      e && this.emitUtteranceBoundary(e), this.emitEvent({ type: "start" });
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
      const { charIndex: t, charLength: s } = e.detail ?? {}, i = this.getCurrentContent(), a = i && typeof t == "number" && typeof s == "number" ? si(i, t, s) : void 0;
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
  setVoice(e) {
    this.engine.setVoice(e);
  }
  getCurrentVoice() {
    return this.engine.getCurrentVoice();
  }
  setSpeakInContentLanguage(e) {
    this.engine.setSpeakInContentLanguage(e);
  }
  getSpeakInContentLanguage() {
    return this.engine.getSpeakInContentLanguage();
  }
  // Content Management
  loadContent(e) {
    if (this.source)
      throw new Error("loadContent() cannot be used after loadGndContent() — the two are exclusive. Create a new navigator instance to switch content sources.");
    this.setContentQueue(e);
  }
  async loadGndContent(e) {
    this.source = e, await this.reextract();
  }
  setContentQueue(e, t = null, s = null) {
    this.clearPendingAdvance(), this.pendingAutoPauseIndex = null, (this.navigatorState === "playing" || this.navigatorState === "paused") && this.engine.stop();
    const i = Array.isArray(e) ? e : [e];
    this.contentQueue = [...i], this.pendingResumeIndex = t, this.pendingResumeState = s, this.setNavigatorState("loading"), this.emitEvent({ type: "loading" }), this.engine.loadUtterances(i, t ?? void 0), this.emitContentChangeEvent({ content: i });
  }
  // Re-runs extraction from `this.source`, resuming near the old position if playback was underway.
  async reextract() {
    if (!this.source) return;
    const e = this.navigatorState === "playing" || this.navigatorState === "paused" ? this.navigatorState : null, t = this.contentSources, s = this.getCurrentUtteranceIndex(), { utterances: i, sources: a, blockStarts: r } = await Zi(this.source, {
      format: this._settings.format,
      inlineContextualization: this._settings.inlineContextualization,
      skip: this._settings.skip,
      contextualize: this._settings.contextualize,
      contextualization: {
        contextualizations: this.contextualizationOverrides?.contextualizations,
        shapes: ni(this._settings.verbosity, this.contextualizationOverrides?.shapes),
        params: this.contextualizationOverrides?.params
      },
      language: this._settings.language,
      segmentation: {
        mode: this._settings.segmentation,
        suppressions: this.segmentationOverrides?.suppressions,
        segmenter: this.segmentationOverrides?.segmenter
      }
    });
    this.contentSources = a, this.contentBlockStarts = r;
    const o = e ? this.resolveResumeIndex(t, s, a) : null;
    this.setContentQueue(i, o, e);
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
    const t = this._settings.segmentation, s = ii(e, t);
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
  get settings() {
    return this._settings;
  }
  get preferencesEditor() {
    return this._preferencesEditor === null && (this._preferencesEditor = new mt(this._preferences, this.settings)), this._preferencesEditor;
  }
  async submitPreferences(e) {
    !this.source && this.contentQueue.length > 0 && ft.some((t) => e[t] !== void 0) && console.warn(
      "submitPreferences(): extraction-affecting preferences (format, inlineContextualization, verbosity, skip, contextualize, language, segmentation) have no effect on content loaded via loadContent() — use loadGndContent() to re-extract on submission."
    ), this._preferences = this._preferences.merging(e), await this.applyPreferences();
  }
  async applyPreferences() {
    const e = this._settings;
    this._settings = new vt(this._preferences, this._defaults), this.applyEngineParameters(), this._preferencesEditor !== null && (this._preferencesEditor = new mt(this._preferences, this._settings)), ft.some((t) => !this.sameSettingValue(e[t], this._settings[t])) && await this.reextract();
  }
  // Arrays (skip/contextualize) compare as sets, not by reference.
  sameSettingValue(e, t) {
    return Array.isArray(e) && Array.isArray(t) ? e.length === t.length && e.every((s) => t.includes(s)) : e === t;
  }
  async destroy() {
    this.clearPendingAdvance(), this.events.clear(), await this.engine.destroy();
  }
}
export {
  Zs as BooleanPreference,
  $ as EnumPreference,
  ra as FallbackEngineProvider,
  $s as FallbackSpeechEngine,
  ma as Locator,
  va as LocatorLocations,
  ya as LocatorText,
  Ce as Preference,
  re as RangePreference,
  Qs as ReadiumSpeechDecorationController,
  da as ReadiumSpeechNavigator,
  la as ReadiumSpeechProviderRegistry,
  Js as SpeechDefaults,
  Y as SpeechPreferences,
  mt as SpeechPreferencesEditor,
  Zt as SpeechServerAudioDecodeError,
  _s as SpeechServerEngine,
  aa as SpeechServerEngineProvider,
  J as SpeechServerError,
  Yt as SpeechServerNetworkError,
  Jt as SpeechServerStallError,
  vt as SpeechSettings,
  pt as StringArrayPreference,
  dt as WebSpeechEngine,
  ia as WebSpeechEngineProvider,
  b as WebSpeechVoiceManager,
  He as autoPauseScopes,
  ki as blockLevelRoles,
  Q as chineseVariantMap,
  Ps as chunkPlainText,
  xs as chunkSsmlText,
  Bt as compareAlphabetically,
  Nt as compareByPreferredRegion,
  ti as contextualizationShapesAtVerbosity,
  ei as contextualizedAtVerbosity,
  _ as createJsonOrderMap,
  Ws as createLocator,
  sn as defaultContextualizations,
  ha as extractUtterances,
  _e as extractionFormats,
  ft as extractionPreferenceKeys,
  Mt as filterByBoundarySupport,
  Hn as filterByLanguages,
  it as filterOutNoveltyVoices,
  at as filterOutVeryLowQualityVoices,
  ce as getQualityValue,
  be as groupVoicesByLanguage,
  Oe as isNoveltyVoice,
  Hs as isRecoverableFailure,
  Ue as isVeryLowQualityVoice,
  Fe as languageModes,
  Qt as mapServerVoice,
  Os as mimeTypeForFormat,
  ue as pauseDurationRangeConfig,
  Nn as pickBestVoiceByRegion,
  de as pitchRangeConfig,
  he as rateRangeConfig,
  si as resolveBoundaryLocate,
  ii as resolveUtteranceLocate,
  qe as segmentationModes,
  Bs as selectBitrate,
  Ts as selectFormat,
  oa as setupDecorations,
  ca as shapeableRoles,
  ua as skippableRoles,
  Xs as skippedAtVerbosity,
  Le as sortAlphabetically,
  Tn as sortByPreferredRegion,
  j as sortByQuality,
  zn as sortVoicesByRegions,
  W as toSpeechServerError,
  je as verbosityPresets,
  ge as volumeRangeConfig
};
