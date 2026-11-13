import { DecorationController as ci, DirectCommsChannel as ui, Decorator as hi } from "@readium/decorator";
export * from "@readium/decorator";
import { LocatorText as di, LocatorLocations as gi, Locator as fi } from "@readium/shared";
import { Locator as Mo, LocatorLocations as Bo, LocatorText as jo } from "@readium/shared";
import { startsWithBindingPunct as Ze, ssmlTextEscape as G, BINDING_PUNCT_CLASS as Re, ssmlAttrEscape as $n } from "@readium/helpers";
import { DROPPED as xt, removeDropped as Gn, substitutedOwnSelector as pi, isAriaSubstituted as re, decodeTextref as on, combineDomRangeTextrefs as mi } from "@readium/guided-navigation";
import vi from "i18next";
import { DomRange as yi, DomRangePoint as ln } from "@readium/shared/html";
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
}, Si = (n, e) => {
  const t = e.toLowerCase().replace(/_/g, "-"), [s] = O(e), i = Object.entries(n);
  for (const a of [t, s]) {
    const r = i.find(([o]) => o.toLowerCase().replace(/_/g, "-") === a);
    if (r) return r[1];
  }
}, Hn = (n, e) => {
  const t = e.toLowerCase().replace(/_/g, "-"), [s] = O(e);
  let i;
  for (const a of [s, t])
    for (const [r, o] of Object.entries(n))
      r.toLowerCase().replace(/_/g, "-") === a && (i ??= /* @__PURE__ */ new Set(), o.forEach((l) => i.add(l)));
  return i && [...i];
}, ve = {
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
}, z = (n) => {
  if (!n) return "";
  const e = (a) => {
    if (!/\w{2,3}-\w{2,3}/.test(a)) return a;
    const [r, o] = a.split("-");
    return `${r}-${o.toUpperCase()}`;
  }, t = n.toLowerCase().replace(/_/g, "-"), s = e(t), i = e(t.split("-").filter((a, r) => r === 0 || !/^[a-z]{4}$/.test(a)).join("-"));
  return ve[s] || ve[i] || s;
}, Z = {
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
}, rt = /* @__PURE__ */ new Map(), bi = /* @__PURE__ */ Object.assign({ "../../json/ar.json": () => import("./ar-BGKtJRyt.js"), "../../json/bg.json": () => import("./bg-D9Q1JriY.js"), "../../json/bho.json": () => import("./bho-CpuLBMN3.js"), "../../json/bn.json": () => import("./bn-Bpn_lzoe.js"), "../../json/ca.json": () => import("./ca-5hzouNcE.js"), "../../json/cmn.json": () => import("./cmn-DlnYMCd8.js"), "../../json/cs.json": () => import("./cs-CDpMkMNO.js"), "../../json/da.json": () => import("./da-XWCfWAwB.js"), "../../json/de.json": () => import("./de-DU0USiOh.js"), "../../json/el.json": () => import("./el-ClBwbIAW.js"), "../../json/en.json": () => import("./en-l3wcpTw3.js"), "../../json/es.json": () => import("./es-DwOFJY07.js"), "../../json/eu.json": () => import("./eu-DxWirHU-.js"), "../../json/fa.json": () => import("./fa-Ml9KtIw1.js"), "../../json/fi.json": () => import("./fi-Dk-5Fhhl.js"), "../../json/fr.json": () => import("./fr-MfhjukJ4.js"), "../../json/gl.json": () => import("./gl-DwtzWds9.js"), "../../json/he.json": () => import("./he-CfajFNE_.js"), "../../json/hi.json": () => import("./hi-pv2ttBoh.js"), "../../json/hr.json": () => import("./hr-MRApcEKR.js"), "../../json/hu.json": () => import("./hu-DGRDZdHH.js"), "../../json/id.json": () => import("./id-DZUuUiTG.js"), "../../json/it.json": () => import("./it-DJUYnjyj.js"), "../../json/ja.json": () => import("./ja-BpFcZRMu.js"), "../../json/kk.json": () => import("./kk-C480t1iH.js"), "../../json/kn.json": () => import("./kn-BVqs26qv.js"), "../../json/ko.json": () => import("./ko-TNoPZd6N.js"), "../../json/mr.json": () => import("./mr-DstAHTvT.js"), "../../json/ms.json": () => import("./ms-BceBSD-j.js"), "../../json/nb.json": () => import("./nb-CwPbwG-i.js"), "../../json/nl.json": () => import("./nl-BmW-Dmw5.js"), "../../json/pl.json": () => import("./pl-CH8qoDu8.js"), "../../json/pt.json": () => import("./pt-CjCENn24.js"), "../../json/ro.json": () => import("./ro-BlJN7qkA.js"), "../../json/ru.json": () => import("./ru-udzq1D5e.js"), "../../json/sk.json": () => import("./sk-VAEHsTWJ.js"), "../../json/sl.json": () => import("./sl-DaZQ1gp0.js"), "../../json/sv.json": () => import("./sv-CicHwXe4.js"), "../../json/ta.json": () => import("./ta-CvpRY89g.js"), "../../json/te.json": () => import("./te-D5TcdW9V.js"), "../../json/th.json": () => import("./th-CYakoFVa.js"), "../../json/tr.json": () => import("./tr-BfYrcAz7.js"), "../../json/uk.json": () => import("./uk-BVs6lQbX.js"), "../../json/vi.json": () => import("./vi-DP1xN9KL.js"), "../../json/wuu.json": () => import("./wuu-C6uQvT6g.js"), "../../json/yue.json": () => import("./yue-C8kEWdfv.js") });
async function wi(n) {
  try {
    const e = n.split("-")[0], t = bi[`../../json/${e}.json`];
    if (!t)
      throw new Error(`No voice data found for language: ${n}`);
    const i = (await t()).default;
    return {
      ...i,
      voices: i.voices.map(Ci)
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
function cn(n) {
  return rt.has(n) || rt.set(n, wi(n)), rt.get(n);
}
const ki = ["veryLow", "low", "normal", "high", "veryHigh"], Ei = ["android", "apple"], Ci = (n) => ({
  ...n,
  quality: n.quality?.filter((e) => ki.includes(e)),
  localizedName: n.localizedName && Ei.includes(n.localizedName) ? n.localizedName : void 0
}), ft = async (n) => {
  if (!n) return [];
  try {
    const e = z(n);
    try {
      const s = await cn(e);
      if (s?.voices?.length)
        return s.voices;
    } catch (s) {
      console.warn(`Failed to load voices for ${e}:`, s);
    }
    const [t] = O(e);
    if (t !== e)
      try {
        const s = await cn(t);
        if (s?.voices?.length)
          return s.voices;
      } catch (s) {
        console.warn(`Failed to load voices for base language ${t}:`, s);
      }
    return [];
  } catch (e) {
    return console.error(`Error in getVoices for ${n}:`, e), [];
  }
}, pt = (n, e) => {
  try {
    return new Intl.DisplayNames(
      e ? [e] : [],
      { type: "language", languageDisplay: "standard" }
    ).of(n) || n.toUpperCase();
  } catch {
    return n.toUpperCase();
  }
}, un = (n) => {
  if (!n) return "";
  try {
    const e = z(n), t = Z[e];
    if (t?.testUtterance)
      return t.testUtterance;
    if (e in ve) {
      const i = ve[e];
      if (i && Z[i]?.testUtterance)
        return Z[i].testUtterance;
    }
    const [s] = O(e);
    return s !== e && Z[s]?.testUtterance ? Z[s].testUtterance : "";
  } catch (e) {
    return console.error(`Error in getTestUtterance for ${n}:`, e), "";
  }
}, Xe = (n) => {
  if (!n) return "";
  try {
    const e = z(n), t = Z[e];
    if (t?.defaultRegion)
      return `${e}-${t.defaultRegion}`;
    if (e in ve) {
      const i = ve[e];
      if (i) {
        const a = Z[i];
        if (a?.defaultRegion)
          return `${i}-${a.defaultRegion}`;
      }
    }
    const [s] = O(e);
    if (s !== e) {
      const i = Z[s];
      if (i?.defaultRegion)
        return `${s}-${i.defaultRegion}`;
    }
    return "";
  } catch (e) {
    return console.error(`Failed to get default region for ${n}:`, e), "";
  }
}, Ye = (n) => {
  if (!n?.length) return [];
  const e = /* @__PURE__ */ new Set(), t = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map();
  for (const [i, a] of n.entries()) {
    if (!a) continue;
    const r = z(a), [o, l] = O(r);
    l && (e.add(l), s.has(l) || s.set(l, i)), t.has(o) || t.set(o, /* @__PURE__ */ new Set()), l && t.get(o).add(l);
  }
  return Array.from(t.entries()).map(([i, a]) => {
    const r = new Set(
      Z[i]?.availableRegions || []
    ), o = Array.from(a), l = Array.from(e).filter(
      (u) => r.has(u) && !o.includes(u)
    ), c = Array.from(/* @__PURE__ */ new Set([...o, ...l])).sort((u, h) => {
      const d = s.get(u) ?? Number.MAX_SAFE_INTEGER, f = s.get(h) ?? Number.MAX_SAFE_INTEGER;
      return d - f;
    });
    if (c.length === 0) {
      const u = Xe(i), [, h] = O(u);
      h && c.push(h);
    }
    return {
      baseLang: i,
      regions: c
    };
  });
}, ye = async (n) => {
  const e = /* @__PURE__ */ new Map();
  for (const s of n) {
    if (s.source !== "json") continue;
    const [i] = O(s.language);
    e.has(i) || e.set(i, []), e.get(i).push(s);
  }
  const t = /* @__PURE__ */ new Map();
  for (const [s, i] of e.entries()) {
    const a = /* @__PURE__ */ new Map(), r = await ft(s), o = /* @__PURE__ */ new Map();
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
}, Ri = {
  veryLow: 1,
  low: 2,
  normal: 3,
  high: 4,
  veryHigh: 5
}, _e = (n) => n ? Ri[n] ?? 0 : 0, ue = (n, e, t, s) => {
  const i = _e(n.quality), a = _e(e.quality);
  if (t && s && n.source === "json" && e.source === "json") {
    const r = t.get(s);
    if (r) {
      const o = r.get(n.name), l = r.get(e.name);
      if (o !== void 0 && l !== void 0)
        return o - l;
    }
  }
  return a !== i ? a - i : n.name.localeCompare(e.name);
}, et = (n, e) => {
  const t = new Map(e.map((a) => [a.baseLang, a])), s = /* @__PURE__ */ new Map(), i = [];
  for (const a of n) {
    const [r] = O(a.language);
    t.get(r) ? (s.has(r) || s.set(r, []), s.get(r).push(a)) : i.push(a);
  }
  return { voicesByLang: s, otherLangVoices: i };
}, qn = (n, e, t, s) => {
  const [, i] = O(n.language), [, a] = O(e.language), r = i && t.regions.includes(i), o = a && t.regions.includes(a);
  if (r && o) {
    const d = t.regions.indexOf(i), f = t.regions.indexOf(a);
    return d === f ? ue(n, e, s, t.baseLang) : d - f;
  }
  if (r) return -1;
  if (o) return 1;
  const l = Xe(t.baseLang), [, c] = O(l), u = !!c && i === c, h = !!c && a === c;
  if (u && !h) return -1;
  if (!u && h) return 1;
  if (i && a) {
    const d = i.localeCompare(a);
    return d !== 0 ? d : ue(n, e, s, t.baseLang);
  }
  return i ? -1 : a ? 1 : ue(n, e, s, t.baseLang);
}, Ii = async (n, e, t) => {
  const s = t ?? await ye(n);
  n.sort((i, a) => qn(i, a, e, s));
}, Kn = (n, e, t) => {
  const [s] = O(n.language), [i] = O(e.language), a = pt(s).toLowerCase(), r = pt(i).toLowerCase(), o = a.localeCompare(r);
  if (o !== 0)
    return o;
  if (s === i) {
    const l = Xe(s), [, c] = O(n.language), [, u] = O(e.language), h = l && c === l.split("-")[1], d = l && u === l.split("-")[1];
    if (h && !d) return -1;
    if (!h && d) return 1;
    if (c && u) {
      const f = c.localeCompare(u);
      if (f !== 0)
        return f;
    }
    return c && !u ? -1 : !c && u ? 1 : ue(n, e, t, s);
  }
  return ue(n, e, t, s);
}, mt = async (n, e) => {
  const t = e ?? await ye(n);
  n.sort((s, i) => Kn(s, i, t));
}, Wn = async (n, e) => {
  if (!e?.length) return [];
  const t = Ye(n || []), { voicesByLang: s, otherLangVoices: i } = et(e, t), a = await ye(e), r = [];
  for (const o of t) {
    const l = s.get(o.baseLang);
    l && (await Ii(l, o, a), r.push(...l));
  }
  return await mt(i, a), r.push(...i), r;
}, Qn = async (n, e) => {
  if (!e.length) return null;
  const [t] = Ye([n]), { voicesByLang: s, otherLangVoices: i } = et(e, [t]), a = s.get(t.baseLang), r = a?.length ? a : i, o = await ye(e), l = a?.length ? (c, u) => qn(c, u, t, o) : (c, u) => Kn(c, u, o);
  return r.reduce((c, u) => l(u, c) < 0 ? u : c);
}, Jn = (n, e) => {
  const t = n.filter((s) => s.controls?.boundary !== !1 === e);
  return t.length > 0 ? t : n;
}, Pe = (n) => z(n).split("-")[0], Pi = (n, e) => {
  const t = Object.entries(n).map(([s, i]) => [z(s), i]);
  for (const s of [z(e), Pe(e)]) {
    const i = t.find(([a]) => a === s);
    if (i) return i[1];
  }
}, Ai = [{ name: "Albert", nativeID: ["com.apple.speech.synthesis.voice.Albert"], note: "This novelty voice is part of a pack preloaded by Apple.", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Bad News", nativeID: ["com.apple.speech.synthesis.voice.BadNews"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Mauvaises nouvelles", "Malas noticias", "Brutte notizie"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Bahh", nativeID: ["com.apple.speech.synthesis.voice.Bahh"], note: "This novelty voice is part of a pack preloaded by Apple.", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Bells", nativeID: ["com.apple.speech.synthesis.voice.Bells"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Cloches", "Campanas", "Campane"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Boing", nativeID: ["com.apple.speech.synthesis.voice.Boing"], note: "This novelty voice is part of a pack preloaded by Apple.", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Bubbles", nativeID: ["com.apple.speech.synthesis.voice.Bubbles"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Bulles", "Burbujas", "Bollicine"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Cellos", nativeID: ["com.apple.speech.synthesis.voice.Cellos"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Violoncelles", "Violonchelos", "Violoncelli"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Good News", nativeID: ["com.apple.speech.synthesis.voice.GoodNews"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Bonnes nouvelles", "Buenas noticias", "Buone notizie"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Jester", nativeID: ["com.apple.speech.synthesis.voice.Hysterical"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Bouffon", "Bufón", "Giullare"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Organ", nativeID: ["com.apple.speech.synthesis.voice.Organ"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Orgue", "Órgano", "Organo"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Superstar", nativeID: ["com.apple.speech.synthesis.voice.Princess"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Superestrella"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Trinoids", nativeID: ["com.apple.speech.synthesis.voice.Trinoids"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Trinoïdes"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Whisper", nativeID: ["com.apple.speech.synthesis.voice.Whisper"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Murmure", "Susurro", "Sussurro"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Wobble", nativeID: ["com.apple.speech.synthesis.voice.Deranged"], note: "This novelty voice is part of a pack preloaded by Apple.", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Zarvox", nativeID: ["com.apple.speech.synthesis.voice.Zarvox"], note: "This novelty voice is part of a pack preloaded by Apple.", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }], Li = {
  voices: Ai
}, Vi = [{ name: "Eddy", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Flo", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Grandma", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Grandpa", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Jacques", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Reed", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Rocko", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Sandy", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Shelley", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Fred", language: "en-US", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Junior", language: "en-US", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Kathy", language: "en-US", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Ralph", language: "en-US", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "eSpeak Arabic", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ar", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Bulgarian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "bg", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Bengali", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "bn", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Catalan", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ca", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Chinese (Mandarin, latin as English)", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "cmn", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Czech", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "cs", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Danish", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "da", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak German", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "de", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Greek", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "el", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Spanish (Spain)", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "es", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Estonian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "et", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Finnish", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "fi", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Gujarati", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "gu", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Croatian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "hr", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Hungarian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "hu", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Indonesian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "id", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Italian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "it", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Kannada", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "kn", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Korean", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ko", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Lithuanian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "lt", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Latvian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "lv", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Malayalm", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ml", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Marathi", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "mr", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Malay", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ms", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Norwegian Bokmål", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "nb", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Polish", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "pl", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Portuguese (Brazil)", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "pt-br", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Romanian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ro", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Russian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ru", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Slovak", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "sk", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Slovenian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "sl", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Serbian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "sv", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Swedish", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "sv", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Swahili", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "sw", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Tamil", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ta", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Telugu", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "te", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Turkish", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "tr", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Vietnamese (Northern)", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "vi", os: ["ChromeOS"], preloaded: !0 }], Oi = {
  voices: Vi
}, Ti = Li, Ui = Oi, vt = (n, e) => Ti.voices.some(
  (t) => n.includes(t.name) || e && t.nativeID?.some((s) => e.includes(s)) || t.altNames?.some((s) => n.includes(s))
), yt = (n, e) => Ui.voices.some(
  (t) => n.includes(t.name)
) || e === "veryLow", St = (n) => n?.length ? n.filter((e) => !(e.isNovelty || vt(e.name, e.voiceURI))) : [], bt = (n) => n?.length ? n.filter((e) => !yt(e.name, e.quality)) : [], xi = (n, e) => {
  const t = (Array.isArray(e) ? e : [e]).map(Pe);
  return n.filter((s) => [s.language, s.altLanguage].some((i) => !!i && t.includes(Pe(i))));
}, Ni = { ar: { normal: "محسن", high: "استثنائي" }, ca: { normal: "millorada", high: "prèmium" }, "cmn-CN": { normal: "优化音质", high: "高音质" }, "cmn-TW": { normal: "增強音質", high: "高音質" }, cs: { normal: "vylepšená verze", high: "prémiový" }, da: { normal: "forbedret", high: "høj kvalitet" }, de: { normal: "erweitert", high: "premium" }, el: { normal: "βελτιωμένη", high: "υψηλής ποιότητας" }, en: { normal: "Enhanced", high: "Premium" }, es: { normal: "mejorada", high: "premium" }, fi: { normal: "parannettu", high: "korkealaatuinen" }, fr: { normal: "premium", high: "de qualité" }, he: { normal: "משופר", high: "פרימיום" }, hi: { normal: "बेहतर", high: "प्रीमियम" }, hr: { normal: "poboljšani", high: "vrhunski" }, hu: { normal: "továbbfejlesztett", high: "prémium" }, id: { normal: "Ditingkatkan", high: "Premium" }, it: { normal: "ottimizzata", high: "premium" }, ja: { normal: "拡張", high: "プレミアム" }, ko: { normal: "고품질", high: "프리미엄" }, ms: { normal: "Dipertingkat", high: "Premium" }, nb: { normal: "forbedret", high: "premium" }, nl: { normal: "verbeterd", high: "premium" }, pl: { normal: "rozszerzony", high: "premium" }, pt: { normal: "melhorada", high: "premium" }, ro: { normal: "îmbunătățită", high: "premium" }, ru: { normal: "улучшенный", high: "высшее качество" }, sk: { normal: "vylepšený", high: "prémiový" }, sl: { normal: "izboljšano", high: "prvovrsten" }, sv: { normal: "förbättrad", high: "premium" }, th: { normal: "คุณภาพสูง", high: "คุณภาพสูง" }, tr: { normal: "Geliştirilmiş", high: "Yüksek Kaliteli" }, uk: { normal: "вдосконалений", high: "високої якості" }, vi: { normal: "Nâng cao", high: "Cao cấp" } }, zi = {
  quality: Ni
}, wt = {
  apple: zi.quality
  // android: androidQualities.quality
}, Mi = (n, e, t) => {
  if (!n) return;
  const s = Array.isArray(t) ? t : t ? [t] : [];
  for (const i of s)
    if (i && wt[i]) {
      const a = wt[i], r = O(e)[0], o = a[e] || a[r];
      if (o) {
        const l = n.toLowerCase(), { normal: c, high: u } = o;
        if (u && l.includes(u.toLowerCase()))
          return "high";
        if (c && l.includes(c.toLowerCase()))
          return "normal";
      }
    }
}, Bi = (n, e) => {
  const t = wt[e];
  if (t)
    for (const [s, { high: i, normal: a }] of Object.entries(t)) {
      const r = i && n.some((l) => l.includes(i)), o = a && n.some((l) => l.includes(a));
      if (r && o)
        return s;
    }
}, ji = {
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
}, hn = (n) => {
  if (!n) return;
  const t = n.toLowerCase().split(/[._-]/);
  for (const s of Object.values(ji))
    if (s.values.some((i) => t.includes(i)))
      return s.quality;
};
function Di(n, e) {
  if (n.name === n.originalName) return n;
  if (e.name === e.originalName) return e;
  const t = [n.originalName, ...n.altNames || []], s = [e.originalName, ...e.altNames || []], i = t.findIndex((r) => s.includes(r)), a = s.findIndex((r) => t.includes(r));
  return i === -1 && a === -1 || i !== -1 && (a === -1 || i <= a) ? n : e;
}
function Fi(n, e) {
  if (!n.altNames && !e.altNames)
    return !1;
  const t = n.originalName, s = e.originalName, i = n.altNames || [], a = e.altNames || [];
  return a.includes(t) || i.includes(s) ? !0 : i.filter((o) => a.includes(o)).length > 0;
}
const Zn = () => {
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
    this.systemLocale = navigator.languages?.[0]?.split("-")[0] || "en", this.isAndroid = Zn().isAndroid;
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
      const a = z(i.lang), [r] = A.extractLangRegionFromBCP47(a);
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
        const s = z(t), [i] = A.extractLangRegionFromBCP47(s);
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
    const t = e.map((i) => i.name), s = Bi(t, "apple");
    s && (this.systemLocale = s);
  }
  /**
   * Infer voice quality based on package, platform, JSON, or duplicate count
   * Returns null if quality cannot be determined
   * @private
   */
  inferVoiceQuality(e, t, s) {
    const i = e.voiceURI ? hn(e.voiceURI) : void 0;
    if (i) return i;
    if (t?.nativeID && Array.isArray(t.nativeID))
      for (const a of t.nativeID) {
        const r = hn(a);
        if (r) return r;
      }
    if (t?.localizedName && e.voiceURI && e.lang) {
      const a = Mi(
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
        const r = _e(a.quality), o = _e(s.quality);
        if (o === r && Fi(s, a)) {
          const l = Di(s, a);
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
    const t = un(e);
    if (t) return t;
    const [s] = A.extractLangRegionFromBCP47(e);
    if (s && s !== e) {
      const i = un(s);
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
      const a = z(i).split("-")[0];
      s.set(a, (s.get(a) ?? 0) + 1);
    }
    return [...s].map(([i, a]) => ({ code: i, label: pt(i, t), count: a }));
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
        const a = z(i.lang), [r] = A.extractLangRegionFromBCP47(a), o = this.normalizeVoiceName(i.name), l = `${i.lang.toLowerCase()}_${o}`, c = t.get(l) || 1;
        let u = await ft(a);
        (!u || u.length === 0) && (u = await ft(r));
        const h = this.findMatchingJsonVoice(u, o), d = this.inferVoiceQuality(i, h, c), f = this.isAndroid || !h ? { ...h?.controls, boundary: !1 } : h?.controls;
        return h ? {
          ...h,
          label: h.label ?? this.cleanVoiceName(i.name),
          source: "json",
          originalName: i.name,
          ...f && { controls: f },
          language: h.language ?? a,
          voiceURI: i.voiceURI,
          quality: d,
          isDefault: i.default || !1,
          offlineAvailability: i.localService || !1,
          isNovelty: vt(i.name, i.voiceURI),
          isLowQuality: yt(i.name, d)
        } : {
          source: "browser",
          label: this.cleanVoiceName(i.name),
          name: i.name,
          originalName: i.name,
          ...f && { controls: f },
          language: a,
          voiceURI: i.voiceURI,
          quality: d,
          isDefault: i.default || !1,
          offlineAvailability: i.localService || !1,
          isNovelty: vt(i.name, i.voiceURI),
          isLowQuality: yt(i.name, d)
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
    if (i.languages && (s = xi(s, i.languages)), i.source && (s = s.filter((a) => a.source === i.source)), i.gender && (s = s.filter((a) => a.gender === i.gender)), i.quality) {
      const a = Array.isArray(i.quality) ? i.quality : [i.quality];
      s = s.filter((r) => r.quality && a.includes(r.quality));
    }
    return i.offlineOnly && (s = s.filter((a) => a.offlineAvailability === !0)), i.provider && (s = s.filter(
      (a) => a.provider?.toLowerCase() === i.provider?.toLowerCase()
    )), i.excludeNovelty && (s = St(s)), i.excludeVeryLowQuality && (s = bt(s)), i.removeDuplicates && (s = this.removeDuplicates(s)), s;
  }
  /**
   * Filter out novelty voices
   * @param voices Array of voices to filter
   * @returns Filtered array with novelty voices removed
   */
  filterOutNoveltyVoices(e) {
    const t = e ?? this.voices;
    return St(t);
  }
  /**
   * Filter out very low quality voices
   * @param voices Array of voices to filter
   * @returns Filtered array with very low quality voices removed
   */
  filterOutVeryLowQualityVoices(e) {
    const t = e ?? this.voices;
    return bt(t);
  }
  /**
   * Sort voices by quality, respecting JSON name order, then alphabetically for undefined/null quality
   * @param voices Array of voices to sort
   * @returns Sorted array of voices
   */
  async sortVoicesByQuality(e) {
    const t = e || this.voices;
    if (!t?.length) return [];
    const s = await ye(t);
    return [...t].sort((i, a) => ue(i, a, s));
  }
  /**
   * Sort regions by default then alphabetically, sort voices by quality
   */
  static async sortByDefaultRegion(e, t) {
    const s = await ye(e), i = Xe(t);
    e.sort((a, r) => {
      const [, o] = A.extractLangRegionFromBCP47(a.language), [, l] = A.extractLangRegionFromBCP47(r.language), c = i && o === i.split("-")[1], u = i && l === i.split("-")[1];
      return c && !u ? -1 : !c && u ? 1 : ue(a, r, s, t);
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
      return await mt(l), l;
    }
    const i = Ye(e), { voicesByLang: a, otherLangVoices: r } = et(s, i), o = [];
    for (const l of i) {
      const c = a.get(l.baseLang);
      c && (await A.sortByDefaultRegion(c, l.baseLang), o.push(...c));
    }
    return await mt(r), o.push(...r), o;
  }
  /**
   * Sort voices by region preference, then alphabetically
   * @param voices Array of voices to sort
   * @param preferredLanguages Array of preferred language codes in order of preference
   * @returns Sorted array of voices
   */
  async sortVoicesByRegions(e, t) {
    return Wn(e, t || this.voices);
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
const Xn = async (n, e, t = !0) => {
  const s = (r) => O(z(r))[0], i = s(n), a = bt(St(e)).filter((r) => s(r.language) === i);
  return a.length === 0 ? null : Qn(n, Jn(a, t));
}, Yn = async (n, e) => {
  n?.length || (n = typeof navigator < "u" && navigator.languages?.length ? [...navigator.languages] : ["en"]);
  for (const t of n) {
    const s = await Xn(t, e);
    if (s) return s;
  }
  return (await Wn(n, e))[0] ?? null;
}, q = (n) => n.voiceURI ?? n.identifier ?? n.name, _i = ["webKit", "moz", "ms", "o"], $i = [
  "boundary",
  "end",
  "error",
  "mark",
  "pause",
  "resume",
  "start"
], Gi = (n) => `${n.charAt(0).toUpperCase()}${n.slice(1)}`, Ee = (n = {}, e) => Object.hasOwnProperty.call(n, e) || e in n || !!n[e], Hi = (n) => typeof window < "u" && n in window, qi = (n) => {
  const e = Gi(n), t = _i.map((i) => `${i}${e}`), s = [n, e].concat(t).find(Hi);
  return s && typeof window < "u" ? window[s] : void 0;
}, Ki = () => {
  const n = {};
  [
    "speechSynthesis",
    "speechSynthesisUtterance",
    "speechSynthesisVoice",
    "speechSynthesisEvent",
    "speechSynthesisErrorEvent"
  ].forEach((t) => {
    n[t] = qi(t);
  }), n.onvoiceschanged = Ee(n.speechSynthesis, "onvoiceschanged"), n.speechSynthesisSpeaking = Ee(n.speechSynthesis, "speaking"), n.speechSynthesisPaused = Ee(n.speechSynthesis, "paused");
  const e = n.speechSynthesisUtterance ? Ee(n.speechSynthesisUtterance, "prototype") : !1;
  return $i.forEach((t) => {
    const s = `on${t}`;
    n[s] = e && n.speechSynthesisUtterance ? Ee(n.speechSynthesisUtterance.prototype, s) : !1;
  }), n;
};
class tt {
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
const je = (n, e) => Math.min(Math.max(n, 0), Math.max(e - 1, 0));
function he(n, e, t, s) {
  return Number.isFinite(n) ? Math.max(e, Math.min(t, n)) : s;
}
const $e = "\\p{Ps}\\p{Pi}¿¡", Wi = new RegExp(`^[${$e}]`, "u"), Qi = new RegExp(`[${$e}]$`, "u"), Ji = new RegExp("^\\p{P}$", "u");
function Zi(n) {
  return Wi.test(n);
}
function Xi(n) {
  return Qi.test(n);
}
const es = "\\p{scx=Han}\\p{scx=Hiragana}\\p{scx=Katakana}\\p{scx=Thai}\\p{scx=Lao}\\p{scx=Khmer}\\p{scx=Myanmar}\\u3000-\\u303F\\uFF00-\\uFFEF", ts = new RegExp(`[${es}]$`, "u"), ns = new RegExp(`^[${es}]`, "u");
function ss(n, e) {
  return ts.test(n) && ns.test(e);
}
function is(n, e) {
  return ts.test(n) || ns.test(e);
}
function Yi(n) {
  return Ji.test(n);
}
function as(n) {
  return n.replace(/[<>]/g, "​");
}
function ea(n) {
  return n.replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&nbsp;/g, " ").replace(/&#(\d+);/g, (e, t) => String.fromCodePoint(Number(t))).replace(/&#x([0-9a-fA-F]+);/g, (e, t) => String.fromCodePoint(parseInt(t, 16)));
}
const ta = /\s*<readium:[a-zA-Z][\w-]*\s+id="[^"]*"\s*\/>\s*/g;
function na(n) {
  return n.replace(ta, (t, s, i) => {
    const a = i.slice(s + t.length);
    return a.length === 0 || Ze(a) ? "" : " ";
  }).replace(/ {2,}/g, " ").trim();
}
function sa(n) {
  return n.includes("<");
}
function xe(n) {
  if (n === void 0) return;
  const e = {};
  n.language !== void 0 && (e.language = n.language);
  const t = n.ssml ? na(fs(n.ssml, () => !0, n.language).ssml) : "";
  return sa(t) && (e.ssml = t), n.plain ? e.plain = n.plain : t && !e.ssml && (e.plain = _(t)), e.plain || e.ssml ? e : void 0;
}
function _(n) {
  return ls(n).plain;
}
function Ae(n, e) {
  return n.length > 0 && e.length > 0 && !/\s$/.test(n) && !/^\s/.test(e) && !Ze(e) && !ss(n, e);
}
const ia = /* @__PURE__ */ new Set(["speak", "p", "s", "voice", "audio", "desc", "token", "w"]);
function nt(n) {
  return /^<[^>]*\/>/.test(n) || ia.has(/^<\/?([^\s/>]+)/.exec(n)?.[1] ?? "");
}
const dn = /(?:<[^>]*>)*([^<]*)/y;
function rs(n, e) {
  return dn.lastIndex = e, ie(dn.exec(n)[1]);
}
function os(n) {
  let e = "", t = 0;
  for (const s of n.matchAll(/<[^>]+>/g))
    e += ie(n.slice(t, s.index)), t = s.index + s[0].length, nt(s[0]) && Ae(e, rs(n, t)) && (e += " ");
  return e + ie(n.slice(t));
}
function ls(n) {
  let e = "";
  const t = [];
  let s = !1, i = 0;
  for (; i < n.length; ) {
    const o = n[i];
    if (o === "<") {
      const c = n.indexOf(">", i), u = n.slice(i, c + 1);
      i = c === -1 ? n.length : c + 1, c !== -1 && nt(u) && !s && Ae(e, rs(n, i)) && (e += " ", t.push(i), s = !0);
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
function gn(n, e) {
  let t = 0, s = n.length;
  for (; t < s; ) {
    const i = t + s >> 1;
    n[i] < e ? t = i + 1 : s = i;
  }
  return t;
}
const fn = /* @__PURE__ */ new WeakMap();
function aa(n) {
  return n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function ra(n) {
  const e = aa(n), t = /\w/.test(n[0]) ? "(?<!\\w)" : "", s = /\w/.test(n[n.length - 1]) ? "(?!\\w)" : "";
  return `${t}${e}${s}`;
}
function oa(n, e) {
  if (typeof e == "string")
    return { regex: new RegExp(ra(n), "g"), replace: e };
  const t = e.pattern.flags.includes("g") ? e.pattern.flags : `${e.pattern.flags}g`;
  return { regex: new RegExp(e.pattern.source, t), replace: e.replace };
}
function la(n) {
  let e = fn.get(n);
  return e || (e = Object.entries(n).map(([t, s]) => oa(t, s)), fn.set(n, e)), e;
}
function cs(n, e) {
  const t = [];
  for (const a of la(e))
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
function ca(n, e) {
  let t = "";
  const s = [];
  let i = 0;
  for (const a of cs(n, e)) {
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
function pn(n, e) {
  return n.length ? e <= 0 ? n[0] : e >= n.length ? n[n.length - 1] + 1 : n[e] : e;
}
const ua = /<([a-zA-Z][\w-]*)([^>]*)>([\s\S]*?)<\/\1>|<[a-zA-Z][\w-]*\b[^>]*\/>|[^<]+/g;
function ie(n) {
  return n.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
}
function us(n) {
  const e = [];
  for (const t of n.matchAll(ua))
    t[1] !== void 0 ? e.push({ kind: "paired", raw: t[0], tag: t[1], attrs: t[2], innerText: ie(t[3]) }) : t[0][0] === "<" ? e.push({ kind: "selfClosing", raw: t[0] }) : e.push({ kind: "text", raw: t[0], text: ie(t[0]) });
  return e;
}
function ha(n, e) {
  const t = us(n);
  let s = "", i = !1, a = !1;
  const r = [], o = t.map(() => []);
  t.forEach((S, R) => {
    if (S.kind === "selfClosing") {
      a = !0;
      return;
    }
    const L = S.kind === "paired" ? S.innerText : S.text, I = S.kind === "paired" && nt(S.raw), T = a || I;
    if (L.length > 0 && (a = !1), I && (a = !0), T && !i && Ae(s, L)) {
      const M = s.length;
      s += " ", o[R].push(r.length), r.push({ start: M, end: M + 1, atomIndex: -1 }), i = !0;
    }
    const V = s.length;
    s += L, o[R].push(r.length), r.push({ start: V, end: s.length, atomIndex: R }), L.length > 0 && (i = /\s$/.test(L));
  });
  const l = cs(s, e);
  let c = "", u = "";
  const h = [];
  let d = -2, f = "", g = 0;
  const p = () => {
    if (d >= 0) {
      const S = t[d];
      c += S.kind === "paired" ? `<${S.tag}${S.attrs}>${f}</${S.tag}>` : f;
    }
    f = "", d = -2;
  };
  for (let S = 0; S < t.length; S++) {
    const R = t[S];
    if (R.kind === "selfClosing") {
      p(), c += R.raw;
      continue;
    }
    for (const L of o[S]) {
      const I = r[L];
      let T = I.start;
      for (; T < I.end; ) {
        const V = g < l.length ? l[g] : void 0;
        if (V && V.start <= T && V.end > T) {
          const W = V.start === T, oe = V.end > I.end;
          if (W) {
            u += V.replacement;
            for (let te = 0; te < V.replacement.length; te++) h.push(V.start);
            I.atomIndex === -1 || oe ? (p(), c += G(V.replacement)) : (d !== I.atomIndex && (p(), d = I.atomIndex), f += G(V.replacement));
          }
          T = Math.min(V.end, I.end), V.end <= I.end && g++;
          continue;
        }
        const M = V ? Math.min(V.start, I.end) : I.end, N = s.slice(T, M);
        u += N;
        for (let W = 0; W < N.length; W++) h.push(T + W);
        I.atomIndex === -1 ? (p(), c += G(N)) : (d !== I.atomIndex && (p(), d = I.atomIndex), f += G(N)), T = M;
      }
    }
  }
  p();
  let v = 0;
  for (; v < s.length && /\s/.test(s[v]); ) v++;
  let m = s.length;
  for (; m > v && /\s/.test(s[m - 1]); ) m--;
  let y = 0;
  for (; y < u.length && /\s/.test(u[y]); ) y++;
  let k = u.length;
  for (; k > y && /\s/.test(u[k - 1]); ) k--;
  const w = s.slice(v, m), E = h.slice(y, k).map((S) => Math.min(Math.max(S - v, 0), Math.max(w.length - 1, 0)));
  return { ssml: c, plain: w, map: E };
}
const hs = /<lang xml:lang="([^"]*)">([\s\S]*?)<\/lang>/g;
function ds(n) {
  return new RegExp(hs).test(n);
}
function mn(n) {
  return os(n).replace(/ {2,}/g, " ");
}
const da = new RegExp(
  `\\s+|[${$e}]+|[${Re}]+|[^\\s${$e}${Re}]+`,
  "gu"
);
function ot(n) {
  const e = [];
  for (const [t] of n.matchAll(da))
    /^\s/.test(t) ? e.push({ kind: "space" }) : Zi(t) ? e.push({ kind: "open", text: t }) : Ze(t) ? e.push({ kind: "close", text: t }) : e.push({ kind: "word", text: t });
  return e;
}
function ga(n) {
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
function fa(n) {
  let e = n.length;
  for (; e > 0 && (n[e - 1].kind === "space" || n[e - 1].kind === "open"); ) e--;
  return n.slice(e).some((t) => t.kind === "open") ? n.splice(e) : [];
}
function pa(n) {
  let e = 0;
  for (; e < n.length && (n[e].kind === "space" || n[e].kind === "close"); ) e++;
  return n.slice(0, e).some((t) => t.kind === "close") ? n.splice(0, e) : [];
}
function Nt(n, e) {
  const t = [];
  let s = 0;
  for (const a of n.matchAll(hs))
    t.push({
      tokens: ot(mn(n.slice(s, a.index))),
      language: e,
      tagged: !1
    }), t.push({ tokens: ot(_(a[2])), language: a[1], tagged: !0 }), s = a.index + a[0].length;
  t.push({
    tokens: ot(mn(n.slice(s))),
    language: e,
    tagged: !1
  });
  for (let a = 0; a < t.length - 1; a++)
    !t[a].tagged && t[a + 1].tagged ? t[a + 1].tokens.unshift(...fa(t[a].tokens)) : t[a].tagged && !t[a + 1].tagged && t[a].tokens.push(...pa(t[a + 1].tokens));
  const i = [];
  for (const a of t) {
    const r = ga(a.tokens);
    r && i.push({ plain: r, language: a.language });
  }
  return i;
}
const ma = /<readium:[a-zA-Z][\w-]*\s+id="([^"]*)"\s*\/>/g, va = /(<lang\b[^>]*>)<sub\s+alias="([^"]*)"\s*>([\s\S]*?)<\/sub><\/lang>|<sub\s+alias="([^"]*)"\s*>([\s\S]*?)<\/sub>/, zt = new RegExp(`${ma.source}|${va.source}`, "g"), ya = /[\p{L}\p{M}\p{N}\p{Pd}]+$/u, Sa = /^[\p{L}\p{M}\p{N}\p{Pd}]+/u;
let ba;
const gs = (n) => (ba ??= new Intl.Segmenter("und", { granularity: "word" })).segment(n);
function wa(n, e) {
  if (!n || !e || new RegExp("^\\p{Pd}", "u").test(e)) return e;
  if (is(n, e)) return "";
  if (typeof Intl.Segmenter != "function") return e;
  const { index: t, segment: s } = gs(n + e).containing(n.length - 1);
  return e.slice(0, Math.max(0, t + s.length - n.length));
}
function ka(n, e) {
  if (!e || !n || new RegExp("\\p{Pd}$", "u").test(n)) return n;
  if (is(n, e)) return "";
  if (typeof Intl.Segmenter != "function") return n;
  const { index: t } = gs(n + e).containing(n.length);
  return n.slice(Math.min(n.length, t));
}
function Ea(n) {
  return ie(n.replace(/&quot;/g, '"').replace(/&apos;/g, "'"));
}
function vn(n) {
  return new RegExp(zt).test(n);
}
function fs(n, e, t) {
  const { chars: s, removed: i } = ps(n, e, t), a = /* @__PURE__ */ new Set();
  s.forEach(({ char: o, id: l }, c) => {
    if (o === xt)
      for (const u of [-1, 1])
        for (let h = c + u; s[h] && (i[h] || /\s/.test(s[h].char)); h += u)
          i[h] || a.add(l);
  });
  const r = new Set(s.filter(({ char: o, at: l }, c) => i[c] && l >= 0 && !/\s/.test(o)).map(({ at: o }) => o));
  return r.size === 0 ? { ssml: n, spaced: a } : { ssml: n.split("").filter((o, l) => !r.has(l)).join("").replace(/<([\w:-]+)\b[^>]*><\/\1>/g, ""), spaced: a };
}
function Ca(n, e) {
  const { chars: t, removed: s } = ps(n, () => !0, e), i = (r, o) => {
    for (let l = r + o; l >= 0 && l < t.length; l += o) if (t[l].id === void 0 && !/\s/.test(t[l].char)) return l;
    return -1;
  }, a = /* @__PURE__ */ new Set();
  return t.forEach(({ id: r }, o) => {
    const [l, c] = [i(o, -1), i(o, 1)];
    r !== void 0 && l !== -1 && c !== -1 && s[l] && s[c] && a.add(r);
  }), a;
}
function ps(n, e, t) {
  const s = [], i = (c, u) => {
    for (let h = c; h < u; h++)
      if (n[h] !== "<") s.push({ char: n[h], at: h });
      else if ((h = n.indexOf(">", h)) === -1) break;
  };
  let a = 0;
  for (const c of n.matchAll(zt))
    i(a, c.index), s.push({ char: c[1] !== void 0 && e(c[1]) ? xt : "￼", at: -1, id: c[1] }), a = c.index + c[0].length;
  i(a, n.length);
  const r = Gn(s.map(({ char: c }) => c).join(""), t);
  let o = 0;
  const l = s.map(({ char: c }) => o < r.length && c === r[o] ? (o++, !1) : !0);
  return { chars: s, removed: l };
}
function Ra(n, e) {
  return Gn(`x ${xt}${n}`, e).startsWith("x ");
}
const yn = (n) => n.replace(/<[^>]*>/g, "");
function kt(n) {
  const e = [];
  let t = 0, s = !1;
  const i = (r) => {
    const o = r.trim();
    o && e.push(s && !/^\s/.test(r) ? { ssml: o, touchesPrevious: !0 } : { ssml: o });
  }, a = [...n.matchAll(zt)];
  return a.forEach((r, o) => {
    const l = r[1] === void 0, c = r.index + r[0].length, u = n.slice(c, a[o + 1]?.index ?? n.length), h = l ? ie(_(r[4] ?? r[6])) : "", d = l ? ka(n.slice(t, r.index).match(ya)?.[0] ?? "", h) : "", f = l ? wa(h, u.match(Sa)?.[0] ?? "") : "", g = n.slice(t, r.index - d.length);
    if (i(g), !l)
      e.push({ placeholderId: r[1], textBefore: yn(n.slice(t, r.index)), textAfter: yn(u) }), s = !1;
    else {
      const p = g.trim() !== "" && !/\s$/.test(g), v = r[2], m = r[3] ?? r[5], y = r[4] ?? r[6], k = (S) => v ? `${v}${S}</lang>` : S, w = (S) => k(`${d}${S}${f}`);
      e.push({ ssml: w(y), abbreviation: "text", ...p && { touchesPrevious: p } });
      const E = G(Ea(m));
      e.push({
        ssml: w(E),
        abbreviation: "alias",
        abbreviationText: w(y),
        parenthesizedSsml: k(`(${E})`),
        ...p && { touchesPrevious: p }
      }), s = !0;
    }
    t = c + f.length;
  }), i(n.slice(t)), e;
}
const Ia = 250;
class Sn {
  speechSynthesis;
  speechSynthesisUtterance;
  currentVoice = null;
  // The voice of the utterance being spoken, reported in its "start" event.
  speakingVoice = null;
  currentUtterances = [];
  currentUtteranceIndex = 0;
  playbackState = "idle";
  events = new tt();
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
    if (this.features = Ki(), this.patches = Zn(), this.lacksNativePause = this.patches.isAndroid || this.patches.isFirefox && this.patches.isLinux, !this.features.speechSynthesis || !this.features.speechSynthesisUtterance)
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
      }), this.defaultVoice = await Yn(t, this.voices), this.initialized = !0, !0;
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
      plain: t.plain ?? (t.ssml ? _(ea(t.ssml)) : "")
    }));
  }
  // Queue Management
  loadUtterances(e, t) {
    this.currentUtterances = this.toPlainText(e), this.currentUtteranceIndex = je(t ?? 0, e.length), this.playbackState = "ready", this.emitEvent({ type: "ready" });
  }
  // Voice Configuration
  async setVoice(e) {
    const t = this.currentVoice;
    if (typeof e == "string") {
      const s = this.findVoice(e);
      s ? this.currentVoice = s : console.warn(`Voice "${e}" not found`);
    } else
      this.currentVoice = e;
    (this.currentVoice && q(this.currentVoice)) !== (t && q(t)) && this.scheduleRestartIfSpeaking();
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
    const s = this.lastCancelAt + Ia - Date.now();
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
    const a = this.createUtterance(as(i)), r = await this.voiceForUtterance(s);
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
    const t = he(e, 0.1, 10, this.rate);
    t !== this.rate && (this.rate = t, this.scheduleRestartIfSpeaking());
  }
  getRate() {
    return this.rate;
  }
  setPitch(e) {
    const t = he(e, 0, 2, this.pitch);
    t !== this.pitch && (this.pitch = t, this.scheduleRestartIfSpeaking());
  }
  getPitch() {
    return this.pitch;
  }
  setVolume(e) {
    const t = he(e, 0, 1, this.volume);
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
function Et(n) {
  return n.offlineAvailability === !0 || typeof navigator < "u" && navigator.onLine === !0;
}
class Ro {
  id = "webspeech";
  name = "Web Speech API";
  voiceEngine = null;
  // No cache to bypass here — local API, no network cost to re-checking.
  async getVoices() {
    return this.voiceEngine || (this.voiceEngine = new Sn(), await this.voiceEngine.initialize()), this.voiceEngine.getAvailableVoices();
  }
  // Offline voices keep it available without a connection.
  async isAvailable() {
    return (await this.getVoices()).some(Et);
  }
  async createEngine(e) {
    const t = new Sn();
    return await t.initialize(), e && await t.setVoice(e), t;
  }
  async destroy() {
    this.voiceEngine && (await this.voiceEngine.destroy(), this.voiceEngine = null);
  }
}
function ms(n, e) {
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
class vs extends Le {
  constructor(e) {
    super(e, { status: 408, type: "https://readium.org/speech-server/error#stall", title: "Synthesis Stalled" }), this.name = "SpeechServerStallError";
  }
}
class ys extends Error {
  constructor(e) {
    super(e), this.name = "SpeechServerAudioDecodeError";
  }
}
class Ss extends Error {
  constructor(e) {
    super(e), this.name = "SpeechServerNetworkError";
  }
}
async function Ie(n) {
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
function bs(n, e) {
  const t = [];
  let s = -1, i = -1;
  const a = () => {
    s !== -1 && (t.push({ text: Pa(n, s, i), offset: n[s].offset }), s = -1, i = -1);
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
function Pa(n, e, t) {
  const s = n[e], i = n[t];
  return s === i ? s.text : n.slice(e, t + 1).map((a) => a.text).join("");
}
const ws = new RegExp(
  `[^${Re}]*[${Re}]+\\s*|[^${Re}]+$`,
  "gu"
), Aa = /\S+\s*|\s+/g;
function Mt(n, e, t) {
  const s = [];
  for (const i of n.matchAll(t))
    i[0].length !== 0 && s.push({ text: i[0], offset: e + i.index, atomic: !1 });
  return s;
}
function Bt(n, e) {
  if (n.text.length <= e || n.atomic)
    return [n];
  const t = Mt(n.text, n.offset, Aa);
  if (t.length > 1)
    return t.flatMap((r) => Bt(r, e));
  const s = [];
  let i = n.offset, a = "";
  for (const r of n.text)
    a.length > 0 && a.length + r.length > e && (s.push({ text: a, offset: i, atomic: !1 }), i += a.length, a = ""), a += r;
  return a.length > 0 && s.push({ text: a, offset: i, atomic: !1 }), s;
}
function La(n, e) {
  if (n.length <= e)
    return [{ text: n, offset: 0 }];
  const s = Mt(n, 0, ws).flatMap((i) => Bt(i, e));
  return bs(s, e);
}
const Va = /<([a-zA-Z][\w-]*)\b[^>]*>[\s\S]*?<\/\1>|<[a-zA-Z][\w-]*\b[^>]*\/>|[^<]+/g;
function Oa(n, e) {
  if (n.length <= e)
    return [{ text: n, offset: 0 }];
  const t = [];
  for (const i of n.matchAll(Va))
    i[0][0] === "<" ? t.push({ text: i[0], offset: i.index, atomic: !0 }) : t.push(...Mt(i[0], i.index, ws));
  const s = t.flatMap((i) => Bt(i, e));
  return bs(s, e);
}
const Ta = {
  wav: "audio/wav",
  mp3: "audio/mpeg",
  opus: "audio/ogg",
  ogg: "audio/ogg",
  aac: "audio/aac",
  flac: "audio/flac",
  webm: "audio/webm",
  m4a: "audio/mp4"
};
function Ua(n) {
  return Ta[n] ?? `audio/${n}`;
}
const xa = ["flac", "wav", "opus", "aac", "ogg", "webm", "mp3"], Na = ["opus", "aac", "webm", "ogg", "mp3", "wav", "flac"];
function za(n, e, t) {
  const s = (o) => t(Ua(o)) !== "", i = n.formats.filter(s);
  if (e.preferredFormat && i.includes(e.preferredFormat))
    return e.preferredFormat;
  const a = e.strategy === "bandwidth" ? Na : xa, r = [...a, ...i.filter((o) => !a.includes(o))];
  for (const o of r)
    if (i.includes(o))
      return o;
  return n.default;
}
const Ma = /* @__PURE__ */ new Set(["wav", "flac"]), Ba = {
  mp3: 48e3,
  opus: 24e3,
  aac: 48e3,
  ogg: 48e3,
  webm: 32e3
};
function ja(n, e, t) {
  return Ma.has(n) || !e || !t ? void 0 : t.saveData === !0 || /2g/.test(t.effectiveType ?? "") ? Ba[n] : void 0;
}
const Da = 3, Fa = 400;
function _a(n) {
  const e = atob(n), t = new Uint8Array(e.length);
  for (let s = 0; s < e.length; s++)
    t[s] = e.charCodeAt(s);
  return t.buffer;
}
function $a(n) {
  return he(n, 0.25, 4, 1);
}
function Ne(n) {
  return n?.plain ?? n?.ssml ?? void 0;
}
function bn(n) {
  return n instanceof vs ? { message: n.message, status: n.status, type: n.type, title: n.title, instance: n.instance, recoverable: !0 } : n instanceof Le ? { message: n.message, status: n.status, type: n.type, title: n.title, instance: n.instance, recoverable: !1 } : n instanceof ys ? { message: n.message, recoverable: !1 } : n instanceof Ss ? { message: n.message, recoverable: !0 } : n instanceof Error ? { message: n.message, recoverable: !1 } : { message: String(n), recoverable: !1 };
}
class Ga {
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
  events = new tt();
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
    this.endpoints = e.endpoints, this.fetchImpl = e.fetch ?? fetch.bind(globalThis), this.prefetchWindow = e.prefetchWindow ?? Da, this.readyBufferChars = e.readyBufferChars ?? Fa, this.overLengthText = e.overLengthText ?? "split", this.timeoutMs = e.timeoutMs, this.formatOptions = e.format ?? {}, this.canPlayType = typeof Audio < "u" ? (t) => new Audio().canPlayType(t) : () => "";
  }
  // Lets a provider that already fetched /voices seed this engine without a second request.
  setAvailableVoices(e) {
    this.voices = e, this.voicesRequest = null;
  }
  // Fetches the voices, and picks the default one by navigator.languages, as WebSpeechEngine does without languages
  async initialize() {
    this.initializing = (async () => {
      const e = await this.getAvailableVoices();
      return this.defaultVoice = await Yn(void 0, e), !0;
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
      throw s instanceof TypeError ? new Ss(s.message) : s;
    }
  }
  loadUtterances(e, t) {
    this.abortLiveControllers(), this.clearPrefetchCache(), this.currentUtterances = e, this.currentUtteranceIndex = je(t ?? 0, e.length), this.setState("loading"), this.bufferUntilReady(++this.loadGeneration);
  }
  // Buffers enough utterances ahead of currentUtteranceIndex to cover readyBufferChars before
  // declaring "ready", so playback doesn't catch up to an empty prefetch cache right away —
  // starting from wherever playback will actually resume, not always utterance 0.
  async bufferUntilReady(e) {
    const t = je(this.currentUtteranceIndex, this.currentUtterances.length), s = Math.min(this.indexCoveringChars(this.readyBufferChars, t), t + this.prefetchWindow), i = [];
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
    const s = je(t, this.currentUtterances.length);
    let i = 0;
    for (let a = s; a < this.currentUtterances.length; a++)
      if (i += (Ne(this.currentUtterances[a]) ?? "").length, i >= e)
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
      throw await Ie(e);
    const s = await e.json(), i = new Map(t.providers.map((a) => [a.id, a.controls]));
    return this.voices = s.map((a) => ms(a, i.get(a.provider))), this.voices;
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
      throw await Ie(e);
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
        detail: bn(s)
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
    const s = this.currentUtterances[e], i = !s.plain && !!s.ssml, a = s.language, r = Ne(s) ?? "", o = i ? ls(r).map : void 0, l = Ne(this.currentUtterances[e - 1]), c = Ne(this.currentUtterances[e + 1]), u = await this.getServiceInfo(), h = za(u.output, this.formatOptions, this.canPlayType), d = navigator.connection, f = ja(h, this.formatOptions.adaptBitrateToNetwork ?? !1, d);
    if (r.length <= u.limits.maxTextLength) {
      const y = new AbortController();
      return (t ? this.activeControllers : this.liveControllers).add(y), [{
        promise: this.synthesizeChunk({ content: s, text: r, textOffset: 0, useSSML: i, ssmlMap: o, language: a, prevText: l, nextText: c, format: h, bitrate: f, controller: y }),
        controller: y
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
    const g = Math.min(u.limits.maxTextLength, this.readyBufferChars), p = i ? Oa(r, g) : La(r, g), v = [];
    let m = Promise.resolve();
    for (let y = 0; y < p.length; y++) {
      const k = y === 0 ? l : p[y - 1].text, w = y === p.length - 1 ? c : p[y + 1].text, E = p[y], S = new AbortController();
      (t ? this.activeControllers : this.liveControllers).add(S);
      const R = m.then(
        () => this.synthesizeChunk({ content: s, text: E.text, textOffset: E.offset, useSSML: i, ssmlMap: o, language: a, prevText: k, nextText: w, format: h, bitrate: f, controller: S })
      );
      v.push({ promise: R, controller: S }), m = R;
    }
    return v;
  }
  async synthesizeChunk(e) {
    const { content: t, text: s, textOffset: i, useSSML: a, ssmlMap: r, language: o, prevText: l, nextText: c, format: u, bitrate: h, controller: d } = e;
    try {
      const f = await this.voiceFor(t), g = await this.fetchNetwork(this.endpoints.synthesize, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: t.id,
          text: a ? s : as(s),
          ssml: a,
          language: o,
          voice: f?.identifier ?? f?.name,
          prev_utterance: l,
          next_utterance: c,
          boundary: !0,
          output: { format: u, bitrate: h, speed: this.rate, pitch: this.pitch }
        }),
        signal: d.signal
      });
      if (!g.ok)
        throw await Ie(g);
      const p = await g.json(), v = _a(p.audio);
      let m;
      try {
        m = await this.ensureAudioContext().decodeAudioData(v);
      } catch {
        throw new ys("Audio playback failed");
      }
      return { audioBuffer: m, format: p.format, boundaries: p.boundaries, textOffset: i, ssmlMap: r };
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
        t.abort(), r(new vs(`No audio chunk arrived within ${i.toFixed(0)}ms of the playback buffer running dry`));
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
    const a = this.ensureAudioContext(), r = this.masterGain, l = s?.controls?.speed === !0 ? 1 : $a(this.rate);
    this.scheduledChunks = [], this.setState("playing"), this.emitEvent({ type: "start", detail: { voice: s } });
    let c = a.currentTime, u = null;
    const h = (d) => {
      const f = a.createBufferSource();
      f.buffer = d.audioBuffer, f.playbackRate.value = l, f.connect(r), f.start(c), u && (u.onended = null), f.onended = () => this.handleUtteranceEnded(t), u = f, this.scheduledChunks.push({ chunk: d, startTime: c, node: f, nextBoundaryIndex: 0, rate: l }), c += d.audioBuffer.duration / l;
    };
    h(i), this.startBoundaryPolling(t);
    for (let d = 1; d < e.length; d++) {
      let f;
      try {
        const g = Math.max(0, (c - a.currentTime) * 1e3);
        f = await this.awaitWithStallDeadline(e[d].promise, e[d].controller, g);
      } catch (g) {
        t === this.speakGeneration && this.emitEvent({ type: "error", detail: bn(g) });
        return;
      }
      if (t !== this.speakGeneration)
        return;
      h(f);
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
          r = gn(l, a), o = Math.max(0, gn(l, a + i.charLength) - r);
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
    const t = he(e, 0.1, 10, this.rate);
    t !== this.rate && (this.rate = t, this.clearPrefetchCache(), this.scheduleRestartIfSpeaking());
  }
  getRate() {
    return this.rate;
  }
  setPitch(e) {
    const t = he(e, 0, 2, this.pitch);
    t !== this.pitch && (this.pitch = t, this.clearPrefetchCache(), this.scheduleRestartIfSpeaking());
  }
  getPitch() {
    return this.pitch;
  }
  setVolume(e) {
    const t = he(e, 0, 1, this.volume);
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
class Io {
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
      throw await Ie(t);
    if (!s.ok)
      throw await Ie(s);
    const i = await t.json(), a = await s.json(), r = new Map(a.providers.map((o) => [o.id, o.controls]));
    return this.voices = i.map((o) => ms(o, r.get(o.provider))), this.voices;
  }
  async isAvailable() {
    try {
      return await this.getVoices(!0), !0;
    } catch {
      return !1;
    }
  }
  async createEngine(e) {
    const t = new Ga(this.options);
    return this.voices.length > 0 && t.setAvailableVoices(this.voices), e && t.setVoice(e), t;
  }
  async destroy() {
    this.voices = [];
  }
}
function Ha(n) {
  return n.detail?.recoverable === !0;
}
const qa = 3e4, Ka = [
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
class Wa {
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
  events = new tt();
  unbindActiveEngine = null;
  constructor(e) {
    this.activeEngine = e.primaryEngine, this.primaryProvider = e.primaryProvider, this.fallbackProvider = e.fallbackProvider, this.onFailure = e.onFailure ?? "fallback", this.healthCheckIntervalMs = e.healthCheckIntervalMs ?? qa, this.lastVoiceRequest = e.primaryEngine.getCurrentVoice() ?? void 0, this.bindActiveEngine();
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
    const e = this.activeEngine, t = Ka.map((s) => e.on(s, (i) => {
      this.emitEvent(i), this.maybeRecoverNow();
    }));
    t.push(e.on("error", (s) => this.handleError(s))), this.unbindActiveEngine = () => t.forEach((s) => s());
  }
  handleError(e) {
    if (this.hasFallenBack || this.swapInFlight || this.onFailure === "error" || !Ha(e)) {
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
    return e.filter(Et);
  }
  recordListedVoices(e, t) {
    const s = this.listedVoices.get(e) ?? /* @__PURE__ */ new Map();
    t.forEach((i) => s.set(q(i), i)), this.listedVoices.set(e, s);
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
      if (!i || Et(i)) return s;
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
    const [a] = Ye([e]), { voicesByLang: r } = et(i, [a]), o = r.get(a.baseLang) ?? [], l = o.length > 0 ? o : i, c = t ? l.filter((d) => d.gender === t) : [], u = c.length > 0 ? c : l, h = Jn(u, s);
    return Qn(e, h);
  }
  async destroy() {
    this.teardownEpoch++, this.healthCheckTimer !== null && (clearTimeout(this.healthCheckTimer), this.healthCheckTimer = null), this.unbindActiveEngine?.(), this.events.clear(), await this.activeEngine.destroy();
  }
}
class Po {
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
    return new Wa({
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
function Qa(n) {
  return new yi({
    start: new ln(n.start),
    end: n.end ? new ln(n.end) : void 0
  });
}
function Ja(n, e = window) {
  const { href: t, text: s, cssSelector: i, domRange: a, fragment: r } = n, o = s ? new di(s) : void 0, l = i || a ? /* @__PURE__ */ new Map() : void 0;
  l && (i && l.set("cssSelector", i), a && l.set("domRange", Qa(a).serialize()));
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
class Za extends ci {
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
        locator: Ja(a, this.wnd)
      })),
      t
    );
  }
  destroy() {
    super.destroy(), this.decorator.unmount(this.wnd, this.channel.frame), this.channel.frame.destroy();
  }
}
function Ao(n = window, e = {}) {
  const t = new ui(), s = new hi();
  return s.mount(n, t.frame), new Za(t, n, s, e);
}
class Lo {
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
const st = (n, e, t) => Object.freeze({ range: Object.freeze([n, e]), step: t }), Ge = st(0, 5e3, 100), He = st(0.1, 10, 0.1), qe = st(0, 2, 0.1), Ke = st(0, 1, 0.05), jt = Object.freeze(["none", "few", "some", "most", "custom"]), Dt = Object.freeze(["none", "block-level", "always"]), Ft = Object.freeze(["plain", "ssml"]), _t = Object.freeze(["none", "utterance", "block"]), $t = Object.freeze(["structure", "sentence"]), ks = Object.freeze(["never", "inline", "after"]), wn = Object.freeze([
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
function Gt(n) {
  return n == null || typeof n == "boolean" ? n : void 0;
}
function $(n, e) {
  return n == null || e.includes(n) ? n : void 0;
}
function X(n, e) {
  if (n == null) return n;
  if (typeof n != "number" || Number.isNaN(n)) return;
  const t = Math.min(...e), s = Math.max(...e);
  return n >= t && n <= s ? n : void 0;
}
function Ht(n) {
  if (n == null) return n;
  if (!(typeof n != "object" || Array.isArray(n)))
    return Object.values(n).every((e) => typeof e == "string") ? { ...n } : void 0;
}
function Es(n, e) {
  if (n == null) return n;
  if (!(typeof n != "object" || Array.isArray(n)))
    return Object.values(n).every((t) => t !== void 0 && e.includes(t)) ? { ...n } : void 0;
}
function Cs(n) {
  return typeof n == "string" ? n : Ht(n);
}
function Ve(n) {
  return n == null ? n : Array.isArray(n) && n.every((e) => typeof e == "string") ? [...n] : void 0;
}
class kn {
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
    this.format = $(e.format, Ft) ?? "plain", this.interruptions = Es(e.interruptions, ks) ?? {}, this.verbosity = $(e.verbosity, jt) ?? "few", this.skip = Ve(e.skip) ?? [], this.contextualize = Ve(e.contextualize) ?? [], this.language = $(e.language, Dt) ?? "block-level", this.languageOverrides = Ht(e.languageOverrides) ?? {}, this.segmentation = $(e.segmentation, $t) ?? "structure", this.reconstruct = Gt(e.reconstruct) ?? !1, this.voice = Cs(e.voice) ?? null, this.pauseDuration = X(e.pauseDuration, Ge.range) ?? 300, this.autoPause = $(e.autoPause, _t) ?? "none", this.rate = X(e.rate, He.range) ?? 1, this.pitch = X(e.pitch, qe.range) ?? 1, this.volume = X(e.volume, Ke.range) ?? 1;
  }
}
class Se {
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
    this.format = $(e.format, Ft), this.interruptions = Es(e.interruptions, ks), this.verbosity = $(e.verbosity, jt), this.skip = Ve(e.skip), this.contextualize = Ve(e.contextualize), this.language = $(e.language, Dt), this.languageOverrides = Ht(e.languageOverrides), this.segmentation = $(e.segmentation, $t), this.reconstruct = Gt(e.reconstruct), this.voice = Cs(e.voice), this.pauseDuration = X(e.pauseDuration, Ge.range), this.autoPause = $(e.autoPause, _t), this.rate = X(e.rate, He.range), this.pitch = X(e.pitch, qe.range), this.volume = X(e.volume, Ke.range);
  }
  merging(e) {
    const t = { ...this };
    for (const s of Object.keys(e))
      e[s] !== void 0 && (t[s] = e[s]);
    return new Se(t);
  }
}
class de {
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
class Ce extends de {
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
    if (e != null && $(e, this._supportedValues) === void 0)
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
class Xa extends de {
  set value(e) {
    if (e != null && Gt(e) === void 0)
      throw new Error(`Value '${String(e)}' is not a boolean.`);
    this._value = e, this._onChange(this._value);
  }
  get value() {
    return this._value;
  }
}
class En extends de {
  set value(e) {
    if (e != null && Ve(e) === void 0)
      throw new Error(`Value '${String(e)}' is not an array of strings.`);
    this._value = e, this._onChange(this._value);
  }
  get value() {
    return this._value;
  }
}
class ze extends de {
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
    if (e != null && X(e, this._supportedRange) === void 0)
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
class Cn {
  preferences;
  settings;
  // Cloned rather than aliased: edits made through this editor's setters
  // are staged on this copy and only reach the navigator's own preferences
  // once explicitly passed to submitPreferences() — discarding the editor
  // without submitting must leave the navigator untouched.
  constructor(e, t) {
    this.preferences = new Se({ ...e }), this.settings = t;
  }
  // Explicit `null`s, not `undefined` — merging() skips `undefined` fields,
  // so only `null` actually clears them once submitted.
  clear() {
    this.preferences = new Se({
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
    return new Ce({
      initialValue: this.preferences.format,
      effectiveValue: this.settings.format,
      isEffective: this.preferences.format != null,
      onChange: (e) => this.updatePreference("format", e ?? null),
      supportedValues: Ft
    });
  }
  get interruptions() {
    return new de({
      initialValue: this.preferences.interruptions,
      effectiveValue: this.settings.interruptions,
      isEffective: this.preferences.interruptions != null,
      onChange: (e) => this.updatePreference("interruptions", e ?? null)
    });
  }
  get verbosity() {
    return new Ce({
      initialValue: this.preferences.verbosity,
      effectiveValue: this.settings.verbosity,
      isEffective: this.preferences.verbosity != null,
      onChange: (e) => this.updatePreference("verbosity", e ?? null),
      supportedValues: jt
    });
  }
  get skip() {
    return new En({
      initialValue: this.preferences.skip,
      effectiveValue: this.settings.skip,
      isEffective: this.settings.verbosity === "custom" && this.preferences.skip != null,
      onChange: (e) => this.updatePreference("skip", e ?? null)
    });
  }
  get contextualize() {
    return new En({
      initialValue: this.preferences.contextualize,
      effectiveValue: this.settings.contextualize,
      isEffective: this.settings.verbosity === "custom" && this.preferences.contextualize != null,
      onChange: (e) => this.updatePreference("contextualize", e ?? null)
    });
  }
  get language() {
    return new Ce({
      initialValue: this.preferences.language,
      effectiveValue: this.settings.language,
      isEffective: this.preferences.language != null,
      onChange: (e) => this.updatePreference("language", e ?? null),
      supportedValues: Dt
    });
  }
  get languageOverrides() {
    return new de({
      initialValue: this.preferences.languageOverrides,
      effectiveValue: this.settings.languageOverrides,
      isEffective: this.preferences.languageOverrides != null,
      onChange: (e) => this.updatePreference("languageOverrides", e ?? null)
    });
  }
  get segmentation() {
    return new Ce({
      initialValue: this.preferences.segmentation,
      effectiveValue: this.settings.segmentation,
      isEffective: this.preferences.segmentation != null,
      onChange: (e) => this.updatePreference("segmentation", e ?? null),
      supportedValues: $t
    });
  }
  get reconstruct() {
    return new Xa({
      initialValue: this.preferences.reconstruct,
      effectiveValue: this.settings.reconstruct,
      isEffective: this.settings.segmentation === "sentence" && this.preferences.reconstruct != null,
      onChange: (e) => this.updatePreference("reconstruct", e ?? null)
    });
  }
  get voice() {
    return new de({
      initialValue: this.preferences.voice,
      effectiveValue: this.settings.voice,
      isEffective: this.preferences.voice != null,
      onChange: (e) => this.updatePreference("voice", e ?? null)
    });
  }
  get pauseDuration() {
    return new ze({
      initialValue: this.preferences.pauseDuration,
      effectiveValue: this.settings.pauseDuration,
      isEffective: this.preferences.pauseDuration != null,
      onChange: (e) => this.updatePreference("pauseDuration", e ?? null),
      supportedRange: Ge.range,
      step: Ge.step
    });
  }
  get autoPause() {
    return new Ce({
      initialValue: this.preferences.autoPause,
      effectiveValue: this.settings.autoPause,
      isEffective: this.preferences.autoPause != null,
      onChange: (e) => this.updatePreference("autoPause", e ?? null),
      supportedValues: _t
    });
  }
  get rate() {
    return new ze({
      initialValue: this.preferences.rate,
      effectiveValue: this.settings.rate,
      isEffective: this.preferences.rate != null,
      onChange: (e) => this.updatePreference("rate", e ?? null),
      supportedRange: He.range,
      step: He.step
    });
  }
  get pitch() {
    return new ze({
      initialValue: this.preferences.pitch,
      effectiveValue: this.settings.pitch,
      isEffective: this.preferences.pitch != null,
      onChange: (e) => this.updatePreference("pitch", e ?? null),
      supportedRange: qe.range,
      step: qe.step
    });
  }
  get volume() {
    return new ze({
      initialValue: this.preferences.volume,
      effectiveValue: this.settings.volume,
      isEffective: this.preferences.volume != null,
      onChange: (e) => this.updatePreference("volume", e ?? null),
      supportedRange: Ke.range,
      step: Ke.step
    });
  }
}
const Rs = ["audio", "figure", "image", "math", "table", "video"], Is = [
  ...Rs,
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
], Ya = [
  ...Is,
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
], er = {
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
}, tr = {
  none: /* @__PURE__ */ new Set(),
  few: new Set(Rs),
  some: new Set(Is),
  most: new Set(Ya)
}, Ct = {
  table: { few: "inline", some: "block", most: "block" }
};
function Me(n) {
  const e = {};
  for (const t of Object.keys(Ct))
    e[t] = Ct[t]?.[n] ?? "inline";
  return e;
}
const nr = {
  none: Me("none"),
  few: Me("few"),
  some: Me("some"),
  most: Me("most")
}, Vo = Object.keys(Ct);
function sr(n, e) {
  const t = n === "custom" ? {} : nr[n];
  if (!e) return t;
  const s = { ...t };
  for (const i of Object.keys(e)) {
    const a = e[i]?.[n];
    a && (s[i] = a);
  }
  return s;
}
const ir = (n, e) => {
  if (!n || typeof n == "object" && Object.keys(n).length === 0) return e;
  if (typeof n == "string" || !e || typeof e == "string") return n;
  const t = new Set(Object.keys(n).map(z)), s = { ...n };
  for (const [i, a] of Object.entries(e))
    t.has(z(i)) || (s[i] = a);
  return s;
};
class lt {
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
    this.format = e.format ?? t.format, this.interruptions = e.interruptions ?? t.interruptions, this.verbosity = e.verbosity ?? t.verbosity, this.verbosity === "custom" ? (this.skip = e.skip ?? t.skip, this.contextualize = e.contextualize ?? t.contextualize) : (this.skip = [...er[this.verbosity]], this.contextualize = [...tr[this.verbosity]]), this.language = e.language ?? t.language, this.languageOverrides = e.languageOverrides ?? t.languageOverrides, this.segmentation = e.segmentation ?? t.segmentation, this.reconstruct = e.reconstruct ?? t.reconstruct, this.voice = ir(e.voice, t.voice), this.pauseDuration = e.pauseDuration ?? t.pauseDuration, this.autoPause = e.autoPause ?? t.autoPause, this.rate = e.rate ?? t.rate, this.pitch = e.pitch ?? t.pitch, this.volume = e.volume ?? t.volume;
  }
}
const ct = /* @__PURE__ */ new WeakMap(), Ps = /* @__PURE__ */ new WeakMap();
function Rn(n, e) {
  Ps.set(n, e);
}
const De = /* @__PURE__ */ new WeakSet();
function Rt(n) {
  return De.add(n), n;
}
const qt = /* @__PURE__ */ new WeakMap();
function As(n, e) {
  qt.set(n, e);
}
function ar(n) {
  return qt.get(n);
}
function rr(n, e, t) {
  const s = Ps.get(n);
  if (s) {
    const h = pn(s.map, e), d = pn(s.map, e + t);
    e = h, t = Math.max(0, d - h);
  }
  const i = n.offsets, a = !n.plain && !!n.ssml, r = s?.plain ?? n.plain ?? (n.ssml ? _(n.ssml) : "");
  if (!i?.length || !r) return;
  const o = ct.get(n), l = o !== void 0 && e >= o.cursor;
  let c = l ? o.cursor : 0;
  const u = (h) => {
    const d = h.locate.text?.highlight;
    return d && (a ? _(d) : d);
  };
  for (let h = l ? o.pieceIndex : 0; h < i.length; h++) {
    const d = i[h];
    if (De.has(d.locate)) {
      const v = qt.get(d), m = i.slice(h + 1).find((L) => !De.has(L.locate) && u(L)), y = m && u(m), k = y ? r.indexOf(y, c + (v ?? d.end - d.start)) : -1, w = y && k === -1 ? r.indexOf(y, c) : k, E = i[h + 1], S = c + /^\s*/.exec(r.slice(c))[0].length, R = v !== void 0 && E && De.has(E.locate) ? S + v : w === -1 ? r.length : w;
      if (e >= c && e < R)
        return v === void 0 ? void 0 : (ct.set(n, { pieceIndex: h, cursor: c }), { locate: d.locate, word: r.substring(e, Math.min(e + t, R)) });
      c = R;
      continue;
    }
    const f = u(d) ?? r.slice(c);
    if (!f) continue;
    const g = r.indexOf(f, c);
    if (g === -1) continue;
    const p = g + f.length;
    if (e >= g && e < p) {
      ct.set(n, { pieceIndex: h, cursor: c });
      const v = e - g, m = f.substring(v, Math.min(v + t, f.length));
      return { locate: {
        ...d.locate,
        domRange: void 0,
        text: {
          highlight: m,
          before: f.substring(0, v),
          after: f.substring(v + m.length)
        }
      }, word: m };
    }
    c = p;
  }
}
function or(n, e) {
  return e === "sentence" && n.offsets?.length ? n.offsets.map((t) => t.locate) : n.locate ? [n.locate] : [];
}
function H(n) {
  return { pattern: new RegExp(`(\\d+)\\s?u${n}\\b`, "g"), replace: (e, t) => `${t}µ${n}` };
}
const lr = {
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
}, cr = {
  ...lr,
  // Rejects "(c)" directly preceded by "(a)"/"(b)" (a lettered list, not a copyright notice).
  "(c)": { pattern: new RegExp("(?<!\\([ab]\\)\\s{0,3})\\(c\\)", "g"), replace: "©" },
  "(C)": { pattern: new RegExp("(?<!\\([AB]\\)\\s{0,3})\\(C\\)", "g"), replace: "©" },
  "(r)": "®",
  "(R)": "®",
  "(tm)": "™",
  "(TM)": "™",
  deg: { pattern: /(\d+)\s?deg\b/g, replace: (n, e) => `${e}°` },
  x: { pattern: /(\d+)\s?[xX]\s?(?=\d)/g, replace: (n, e) => `${e}×` },
  ug: H("g"),
  um: H("m"),
  us: H("s"),
  uL: H("L"),
  uF: H("F"),
  uA: H("A"),
  uV: H("V"),
  uW: H("W"),
  uN: H("N"),
  umol: H("mol"),
  "->": "→",
  "<-": "←",
  // Reversed from every other entry: engines pattern-match the ASCII foot/inch
  // convention for pronunciation, but drop the real prime marks silently.
  "′": "'",
  "″": '"'
};
function j(n) {
  return n.role ? [...n.role] : [];
}
function Oe(n) {
  return n.role?.has("math") ? void 0 : n.text;
}
function it(n) {
  const e = n.description?.text;
  if (e)
    return e.plain ?? (e.ssml !== void 0 ? _(e.ssml) : void 0);
}
function Ls(n) {
  return n.description?.text?.language;
}
const ur = { contextualizations: { abstract: { block: { start: "Start of the abstract.", end: "End of the abstract." } }, acknowledgments: { block: { start: "Start of the acknowledgments.", end: "End of the acknowledgments." } }, afterword: { block: { start: "Start of the afterword.", end: "End of the afterword." } }, appendix: { block: { start: "Start of the appendix.", end: "End of the appendix." } }, aside: { block: { start: "Start of the aside.", end: "End of the aside." } }, audio: { inline: { labelled: "Audio with a label: {{ description }}", unlabelled: "Audio with no label." } }, bibliography: { block: { start: "Start of the bibliography.", end: "End of the bibliography." } }, biblioref: { inline: "Bibliographic reference." }, blockquote: { inline: "Blockquote." }, cell: { inline: { withHeader: "{{ header }}: {{ value }}", withoutHeader: "{{ value }}" } }, chapter: { block: { start: "Start of the chapter.", end: "End of the chapter." } }, colophon: { inline: "Colophon." }, complementary: { block: { start: "Start of the complementary content.", end: "End of the complementary content." } }, conclusion: { block: { start: "Start of the conclusion.", end: "End of the conclusion." } }, cover: { inline: { labelled: "Cover with a label: {{ description }}", unlabelled: "Cover with no label." } }, credit: { inline: "Credit." }, credits: { block: { start: "Start of the credits.", end: "End of the credits." } }, dedication: { inline: "Dedication." }, definition: { inline: "Definition." }, details: { block: { start: "Start of the disclosure.", end: "End of the disclosure." } }, endnotes: { block: { start: "Start of the endnotes.", end: "End of the endnotes." } }, epigraph: { inline: "Epigraph." }, epilogue: { block: { start: "Start of the epilogue.", end: "End of the epilogue." } }, errata: { block: { start: "Start of the errata.", end: "End of the errata." } }, example: { block: { start: "Start of the example.", end: "End of the example." } }, figure: { inline: "Figure: {{ description }}" }, footnote: { block: { start: "Start of the footnote.", end: "End of the footnote." } }, foreword: { block: { start: "Start of the foreword.", end: "End of the foreword." } }, glossary: { block: { start: "Start of the glossary.", end: "End of the glossary." } }, glossref: { inline: "Glossary definition.", term: "{{ term }}: {{ value }}" }, heading1: { inline: "Heading level 1." }, heading2: { inline: "Heading level 2." }, heading3: { inline: "Heading level 3." }, heading4: { inline: "Heading level 4." }, heading5: { inline: "Heading level 5." }, heading6: { inline: "Heading level 6." }, image: { inline: { labelled: "Image with a label: {{ description }}", unlabelled: "Image with no label." } }, index: { block: { start: "Start of the index.", end: "End of the index." } }, introduction: { block: { start: "Start of the introduction.", end: "End of the introduction." } }, list: { block: { start: "Start of the list.", end: "End of the list." } }, listItem: { inline: "List item." }, math: { inline: { labelled: "{{ description }}", unlabelled: "Math formula with no label." } }, notice: { inline: "Notice." }, pagebreak: { inline: "Pagebreak.", number: "Page {{ number }}" }, pagelist: { block: { start: "Start of the page list.", end: "End of the page list." } }, part: { inline: "Part." }, preface: { block: { start: "Start of the preface.", end: "End of the preface." } }, prologue: { block: { start: "Start of the prologue.", end: "End of the prologue." } }, pullquote: { inline: "Pullquote." }, qna: { block: { start: "Start of the questions and answers.", end: "End of the questions and answers." } }, row: { inline: "Row: {{ count }}" }, rowheader: { inline: { withHeader: "{{ header }}: {{ value }}", withoutHeader: "{{ value }}" } }, separator: { inline: "Separator." }, subtitle: { inline: "Subtitle." }, summary: { inline: "Summary." }, table: { block: { end: "End of the table.", start: { labelled: "Table: {{ description }}. {{ lines }}. {{ columns }}.", unlabelled: "Table. {{ lines }}. {{ columns }}." } }, inline: { labelled: "Table: {{ description }}. {{ lines }}. {{ columns }}.", unlabelled: "Table. {{ lines }}. {{ columns }}." }, parts: { columns_one: "1 column", columns_other: "{{ count }} columns", lines_one: "1 line", lines_other: "{{ count }} lines" } }, term: { inline: "Term." }, tip: { inline: "Tip." }, video: { inline: { labelled: "Video with a label: {{ description }}", unlabelled: "Video with no label." } } } }, hr = {
  speech: ur
}, Vs = hr.speech.contextualizations, It = { en: Vs }, Os = {};
function dr(n) {
  return It[n] || Os[n] ? n : "en";
}
async function gr(n) {
  const e = It[n];
  if (e) return e;
  const t = Os[n];
  if (!t) return Vs;
  const s = (await t()).speech.contextualizations;
  return It[n] = s, s;
}
const fr = {
  de: ["A.", "A.M.", "Abs.", "Abt.", "Abw.", "Adj.", "Adr.", "Akt.", "Allg.", "Alt.", "App.", "Apr.", "Art.", "Aug.", "Ausg.", "Ausschl.", "B.", "Bed.", "Ben.", "Ber.", "Best.", "Bibl.", "C.", "Ca.", "Chin.", "Chr.", "Co.", "D.", "D. h.", "Dat.", "Dez.", "Di.", "Dim.", "Dipl.-Ing.", "Dipl.-Kfm.", "Dir.", "Do.", "Dr.", "Dtzd.", "Einh.", "Erf.", "Evtl.", "F.", "F.f.", "Fa.", "Fam.", "Feb.", "Fn.", "Folg.", "Forts. f.", "Fr.", "Frl.", "G.", "Gebr.", "Gem.", "Geograph.", "Ges.", "Gesch.", "Ggf.", "Hbf.", "Hptst.", "Hr.", "Hrn.", "Hrsg.", "I.", "Inc.", "Ing.", "Inh.", "Int.", "J.", "J.D.", "Jahrh.", "Jan.", "Jr.", "Kap.", "Kfm.", "Kl.", "Konv.", "Kop.", "L.", "Ltd.", "M.", "Max.", "Mi.", "Min.", "Mind.", "Mio.", "Mo.", "Mod.", "Mrd.", "Msp.", "N.", "Nov.", "Nr.", "O.", "Obj.", "Okt.", "Op.", "P.", "P.M.", "PIN.", "Pfd.", "Phys.", "Port.", "Prot.", "Proz.", "Qu.", "R.", "Rd.", "Reg.", "Reg.-Bez.", "Rel.", "Rep.", "S.A.", "Sa.", "Schr.", "Sek.", "Sep.", "Sept.", "So.", "Spezif.", "St.", "StR.", "Std.", "Str.", "T.", "Tel.", "Temp.", "Test.", "Trans.", "Tägl.", "U.", "U. U.", "U.S.", "U.S.A.", "U.U.", "Urspr.", "Ursprüngl.", "Verf.", "Vgl.", "W.", "Wg.", "Y.", "Z.", "Z. B.", "Z. Zt.", "Ztr.", "a.D.", "a.M.", "a.Rh.", "a.a.O.", "a.a.S.", "am.", "amtl.", "b.", "beil.", "d.J.", "d.Ä.", "e.V.", "e.Wz.", "e.h.", "ehem.", "eigtl.", "einschl.", "entspr.", "erw.", "ev.", "evtl.", "exkl.", "frz.", "geb.", "gedr.", "gek.", "gesch.", "gest.", "ggf.", "ggfs.", "hpts.", "i.A.", "i.B.", "i.H.", "i.J.", "i.R.", "i.V.", "inkl.", "jew.", "jhrl.", "k. u. k.", "k.u.k.", "kath.", "kfm.", "kgl.", "led.", "m.E.", "m.W.", "mtl.", "möbl.", "n. Chr.", "n.u.Z.", "näml.", "o.A.", "o.B.", "o.g.", "od.", "p.Adr.", "r.", "röm.", "röm.-kath.", "s.", "s.a.", "schles.", "schweiz.", "schwäb.", "sog.", "südd.", "tägl.", "u.", "u. Z.", "u.A.w.g.", "u.U.", "u.a.", "u.v.a.", "u.Ä.", "u.ä.", "v. Chr.", "v. H.", "v. u. Z.", "v.Chr.", "v.H.", "v.R.w.", "v.T.", "v.u.Z.", "verh.", "verw.", "vgl.", "z.", "z.B.", "z.Hd.", "z.Z.", "zzgl.", "österr."],
  en: ["A.D.", "A.I.", "A.M.", "A.S.", "AA.", "AB.", "Abs.", "Adj.", "Adv.", "Alt.", "Approx.", "Aug.", "B.V.", "C.F.", "C.O.D.", "Capt.", "Col.", "Comm.", "Conn.", "Cont.", "D.A.", "D.C.", "DC.", "DR.", "Dec.", "Def.", "Dept.", "Diff.", "Dr.", "E.G.", "E.g.", "Ed.", "Est.", "Etc.", "Ex.", "Exec.", "Feb.", "Fn.", "Fri.", "Hon.B.A.", "I.", "I.D.", "I.T.", "I.e.", "J.B.", "J.D.", "J.K.", "Jan.", "Jun.", "K.R.", "L.A.", "L.P.", "Lev.", "Lib.", "Lt.", "Lt.Cdr.", "M.", "M.I.T.", "M.R.", "M.T.", "MR.", "Maj.", "Mar.", "Mart.", "Mb.", "Md.", "Mgr.", "Min.", "Misc.", "Mr.", "Mrs.", "Ms.", "Mt.", "N.V.", "N.Y.", "Nov.", "Nr.", "Num.", "Op.", "Org.", "P.M.", "P.O.", "P.V.", "PP.", "Ph.D.", "Phys.", "Prof.", "Pvt.", "R.L.", "R.T.", "Rep.", "Rev.", "S.A.", "S.A.R.", "S.E.", "S.p.A.", "Sep.", "Sept.", "Sgt.", "Sq.", "St.", "U.S.", "U.S.A.", "U.S.C.", "VS.", "Yr.", "a.m.", "d.", "dr.", "exec.", "pp.", "vs."],
  es: ["A.C.", "AA.", "All.", "Ant.", "Av.", "Avda.", "Bien.", "C.", "C.P.", "C.S.", "C.V.", "CA.", "Col.", "Comm.", "Corp.", "Cía.", "D.", "DC.", "Da.", "Desc.", "Desv.", "Dr.", "Dra.", "Drs.", "Dto.", "Dª.", "Dña.", "Em.", "Emm.", "Exc.", "Excma.", "Excmas.", "Excmo.", "Excmos.", "Exma.", "Exmas.", "Exmo.", "Exmos.", "FF.CC.", "Fabric.", "Fr.", "H.P.", "Id.", "Ilma.", "Ilmas.", "Ilmo.", "Ilmos.", "Inc.", "JJ.OO.", "K.", "Kit.", "Korn.", "L.", "Lcda.", "Lcdo.", "Lda.", "Ldo.", "Lic.", "Ltd.", "Ltda.", "Ltdo.", "M.", "MM.", "Mons.", "Mr.", "Mrs.", "O.M.", "PP.", "R.D.", "R.U.", "RAM.", "RR.HH.", "Rdo.", "Rdos.", "Reg.", "Rev.", "Rol.", "Rvdmo.", "Rvdmos.", "Rvdo.", "Rvdos.", "SA.", "SS.AA.", "SS.MM.", "Sdad.", "Seg.", "Sol.", "Sr.", "Sra.", "Sras.", "Sres.", "Srta.", "Srtas.", "Sta.", "Sto.", "Trab.", "U.S.", "U.S.A.", "Var.", "Vda.", "a. C.", "a. e. c.", "abr.", "afma.", "afmas.", "afmo.", "afmos.", "ago.", "bco.", "bol.", "c/c.", "cap.", "cf.", "cfr.", "col.", "d. C.", "depto.", "deptos.", "dic.", "doc.", "dom.", "dpto.", "dptos.", "dtor.", "e. c.", "e.g.", "ed.", "ej.", "ene.", "feb.", "fig.", "figs.", "fund.", "hnos.", "jue.", "jul.", "jun.", "licda.", "licdo.", "lun.", "mar.", "may.", "mié.", "ms.", "mss.", "mtro.", "nov.", "ntra.", "ntro.", "oct.", "p.ej.", "prof.", "prov.", "sept.", "sras.", "sres.", "srs.", "ss.", "sáb.", "trad.", "v.gr.", "vid.", "vie.", "vs."],
  fr: ["All.", "C.", "Comm.", "D.", "DC.", "Desc.", "Inc.", "Jr.", "L.", "M.", "MM.", "Mart.", "Op.", "P.", "P.-D. G.", "P.O.", "Prof.", "S.A.", "S.M.A.R.T.", "U.", "U.S.", "U.S.A.", "Var.", "W.", "acoust.", "adr.", "anc.", "ann.", "anon.", "ap. J.-C.", "append.", "aux.", "av. J.-C.", "avr.", "broch.", "bull.", "cam.", "categ.", "coll.", "collab.", "config.", "dest.", "dict.", "dim.", "dir.", "doc.", "déc.", "encycl.", "exempl.", "fig.", "févr.", "gouv.", "graph.", "hôp.", "ill.", "illustr.", "imm.", "imprim.", "indus.", "janv.", "jeu.", "juil.", "lun.", "mar.", "mer.", "niv.", "nov.", "oct.", "quart.", "réf.", "sam.", "sept.", "symb.", "synth.", "syst.", "trav. publ.", "ven.", "voit.", "éd.", "édit.", "équiv.", "éval."],
  it: ["C.P.", "Cfr.", "D.", "DC.", "Geom.", "Ing.", "L.", "Liv.", "Ltd.", "Mod.", "N.B.", "N.d.A.", "N.d.E.", "N.d.T.", "O.d.G.", "S.A.R.", "S.M.A.R.T.", "S.p.A.", "Sig.", "U.S.", "U.S.A.", "a.C.", "ag.", "all.", "arch.", "avv.", "c.c.p.", "d.C.", "d.p.R.", "div.", "dott.", "dr.", "fig.", "int.", "mitt.", "on.", "p.", "p.i.", "pag.", "rag.", "sez.", "tab.", "tav.", "ver.", "vol."],
  pt: ["A.C.", "Alm.", "Av.", "Dir.", "Dr.", "Dra.", "Dras.", "Drs.", "E.", "Est.", "Exma.", "Exmo.", "Fr.", "Ilma.", "Ilmo.", "Jr.", "Ltd.", "Ltda.", "Mar.", "N.Sra.", "N.T.", "P.M.", "Pe.", "Ph.D.", "R.", "S.", "S.A.", "Sta.", "Sto.", "V.T.", "W.C.", "a.C.", "a.m.", "abr.", "abrev.", "adm.", "aer.", "ago.", "agric.", "anat.", "ap.", "apart.", "apt.", "arit.", "arqueol.", "arquit.", "astron.", "autom.", "aux.", "biogr.", "bras.", "cap.", "caps.", "cat.", "cel.", "cf.", "col.", "com.", "comp.", "compl.", "cont.", "contab.", "créd.", "cx.", "círc.", "cód.", "d.C.", "des.", "desc.", "dez.", "dipl.", "dir.", "div.", "doc.", "déb.", "ed.", "educ.", "elem.", "eletr.", "eletrôn.", "end.", "eng.", "esp.", "ex.", "f.", "fac.", "fasc.", "fem.", "fev.", "ff.", "fig.", "fil.", "filos.", "fisiol.", "fl.", "fot.", "fr.", "fís.", "geom.", "gram.", "gên.", "hist.", "ind.", "ingl.", "jan.", "jul.", "jun.", "jur.", "l.", "lat.", "lin.", "lit.", "liter.", "long.", "mai.", "mar.", "mat.", "matem.", "mov.", "máq.", "méd.", "mús.", "neol.", "nov.", "náut.", "obs.", "odont.", "odontol.", "org.", "organiz.", "out.", "p.", "p. ex.", "p.m.", "pal.", "pol.", "port.", "pp.", "pq.", "prod.", "prof.", "profa.", "pron.", "próx.", "psicol.", "pág.", "quím.", "r.s.v.p.", "ref.", "rel.", "relat.", "rep.", "res.", "rod.", "set.", "sociol.", "sup.", "séc.", "símb.", "tec.", "tecnol.", "tel.", "trad.", "transp.", "univ.", "vol.", "vs.", "álg.", "índ."],
  ru: ["авг.", "апр.", "дек.", "до н. э.", "кв.", "н. э.", "н.э.", "нояб.", "окт.", "отд.", "проф.", "руб.", "сент.", "тел.", "тыс.", "ул.", "февр.", "янв."],
  th: ["ค.ศ."]
};
function ut(n, e, t) {
  let s = t;
  for (; s > e && /\s/.test(n[s - 1]); ) s--;
  return s;
}
const pr = /[\s([{"'“‘]/;
function mr(n, e) {
  for (const t of e) {
    if (n.length < t.length || !n.endsWith(t)) continue;
    const s = n.length - t.length - 1;
    if (s < 0 || pr.test(n[s])) return !0;
  }
  return !1;
}
function vr(n) {
  let e = 0;
  for (const t of n)
    if (new RegExp("\\p{L}", "u").test(t) && e++, e >= 2) return !0;
  return !1;
}
function yr(n) {
  return /\.{3,}$/.test(n);
}
function Sr(n, e, t, s) {
  if (s === "“") return !0;
  if (s !== '"') return !1;
  let i = 0;
  for (let a = e; a < t; a++) n[a] === '"' && i++;
  return i % 2 === 1;
}
const br = new RegExp(`[.!?][”"'’)\\]]*\\s+—\\s+(?=\\p{Lu})`, "gu");
function wr(n, e) {
  const t = [...n.matchAll(br)].map((i) => i.index + i[0].length);
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
const kr = { "»": "«", "«": "»", "›": "‹", "‹": "›" };
function Er(n, e) {
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
      const u = kr[n[c]];
      if (u === void 0 || a(l.end, u) <= a(l.end, n[c])) break;
      for (c++; c < o.end && /\s/.test(n[c]); ) c++;
      l.end = o.start = c;
    }
    o.start < o.end ? t.push(o) : l && (l.end = o.end);
  }
  return t;
}
function Cr(n, e, t) {
  const s = Er(n, wr(n, e));
  for (let a = 0; a < s.length - 1; a++) {
    const r = ut(n, s[a].start, s[a].end);
    if (r !== s[a].end || r <= s[a].start) continue;
    const o = n[r - 1];
    Sr(n, s[a].start, r, o) && (s[a].end -= 1, s[a + 1].start -= 1);
  }
  const i = [];
  for (const a of s) {
    let r = a;
    for (; i.length > 0; ) {
      const o = i[i.length - 1], l = ut(n, o.start, o.end), c = n.slice(o.start, l);
      if (!mr(c, t) && vr(c) && !yr(c)) break;
      i.pop(), r = { start: o.start, end: r.end };
    }
    i.push(r);
  }
  return i.map((a) => {
    const r = ut(n, a.start, a.end);
    return { text: n.slice(a.start, r), start: a.start, end: a.end, contentEnd: r };
  });
}
const In = /* @__PURE__ */ new Map();
function Ts(n) {
  let e = In.get(n);
  if (!e) {
    try {
      const [t, s] = O(n), i = s ? `${t}-${s}` : t;
      e = { segmenter: new Intl.Segmenter(i, { granularity: "sentence" }), language: n };
    } catch {
      e = { segmenter: new Intl.Segmenter("en", { granularity: "sentence" }), language: "en" };
    }
    In.set(n, e);
  }
  return e;
}
function Rr(n) {
  return Ts(n).language;
}
function at(n, e) {
  const t = e.segmenter === Us ? Rr(n) : n;
  return Hn(e.segmentationSuppressions, t);
}
async function Us(n, e, t) {
  if (e === "") return [];
  const { segmenter: s, language: i } = Ts(n), r = [...s.segment(e)].map((c) => ({ start: c.index, end: c.index + c.segment.length })), o = Hn(fr, i) ?? [], l = t ? [...o, ...t] : o;
  return Cr(e, r, l);
}
const Oo = [
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
], Ir = [
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
], Pr = {
  footnote: { drops: ["aside"], unconditional: !0 },
  cover: { drops: ["image"] },
  pullquote: { drops: ["blockquote", "aside"] },
  epigraph: { drops: ["blockquote"] }
}, Ar = ["abbreviation", "biblioref", "glossref", "noteref", "pagebreak"], Lr = ["biblioref", "glossref"], Vr = ["audio", "video", "image", "figure", "math", "table", "cover"], Or = ["cell", "rowheader"], Tr = ["separator"], We = new Set(Ar), Ur = new Set(Vr), xs = new Set(Or), xr = new Set(Tr), le = new Set(Lr);
function Nr(n, e) {
  const t = vi.createInstance();
  return t.init({
    lng: n,
    resources: { [n]: { translation: e } },
    interpolation: { escapeValue: !1 }
  }), t;
}
function zr(n, e, t) {
  if (!e) return n;
  const s = { ...n };
  for (const i of Object.keys(e))
    s[i] = t(n[i], e[i]);
  return s;
}
function Ns(n, e) {
  if (typeof e == "string" || typeof n != "object") return e;
  const t = { ...n };
  for (const s of Object.keys(e))
    t[s] = Ns(n[s], e[s]);
  return t;
}
function Mr(n, e) {
  return zr(n, e, Ns);
}
function zs(n, e = [], t = /* @__PURE__ */ new Map()) {
  for (const s of n)
    t.set(s, e), s.children && zs(s.children, [s, ...e], t);
  return t;
}
function Ms(n, e = /* @__PURE__ */ new WeakSet()) {
  let t;
  for (let s = n.length - 1; s >= 0; s--) {
    const i = n[s];
    j(i).includes("term") ? t && j(t).includes("definition") && e.add(i) : t = i, i.children && Ms(i.children, e);
  }
  return e;
}
async function Br(n, e) {
  const t = e.contextualizationLocale ?? "en", s = Mr(
    await gr(t),
    e.contextualization?.contextualizations
  );
  return {
    i18n: Nr(t, s),
    contextualizationLanguage: dr(t),
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
    segmenter: e.segmentation?.segmenter ?? Us,
    // Per-key override, not an additive union — each key holds one whole rule.
    substitutions: { ...cr, ...e.substitutions },
    blockStarts: /* @__PURE__ */ new Set(),
    tableRowNumbers: /* @__PURE__ */ new Map(),
    tableCellHeaders: /* @__PURE__ */ new Map(),
    synthetic: /* @__PURE__ */ new Set(),
    ancestorChains: zs(n),
    pendingRange: /* @__PURE__ */ new Map(),
    edgeSubstitutedLocate: /* @__PURE__ */ new WeakMap(),
    aliasLocates: /* @__PURE__ */ new WeakSet(),
    placeholderPieces: /* @__PURE__ */ new Map(),
    touchingPieces: /* @__PURE__ */ new WeakSet(),
    spacedPieces: /* @__PURE__ */ new WeakSet(),
    blockTerms: Ms(n)
  };
}
const jr = /<lang xml:lang="[^"]*">([\s\S]*?)<\/lang>/g;
function Bs(n) {
  return n.replace(jr, "$1");
}
function Kt(n, e) {
  return n === void 0 ? void 0 : Si(e, n) ?? n;
}
function Y(n, e) {
  return Kt(e.language === "none" ? e.contentLanguage : n ?? e.contentLanguage, e.languageOverrides);
}
function Wt(n, e) {
  return n === e || n !== void 0 && e !== void 0 && n.toLowerCase() === e.toLowerCase();
}
function Pt(n, e) {
  return O(n)[0] === O(e)[0];
}
function At(n, e, t, s) {
  const { language: i } = e;
  return i === void 0 ? !0 : Fs(e, t) ? _s(e) ? (n.wordless = i, !0) : !s && n.content !== void 0 && !Pt(n.content, i) ? !1 : (n.entry = i, !0) : n.content !== void 0 && !Wt(n.content, i) || !s && n.entry !== void 0 && !Pt(i, n.entry) ? !1 : (n.content = i, !0);
}
function js(n, e, t) {
  const s = {};
  for (const i of n)
    if (!At(s, i, e, t)) return null;
  return s.content ?? s.entry ?? s.wordless;
}
function Ds(n, e) {
  return js(n, e, !1);
}
function Fs(n, e) {
  return e.synthetic.has(n) && Wt(n.language, e.contextualizationLanguage);
}
function _s(n) {
  return !/[\p{L}\p{N}]/u.test(n.plain ?? ie(n.ssml ?? ""));
}
function $s(n, e) {
  return js(n, e, e.format === "ssml");
}
function Gs(n, e, t) {
  const s = n.ssml ?? "";
  return !e || !n.language || !Fs(n, t) || _s(n) || Pt(n.language, e) ? s : `<lang xml:lang="${$n(n.language)}">${s}</lang>`;
}
function Hs(n, e) {
  const t = e.format === "ssml", s = [];
  let i = 0, a = {};
  return n.forEach((r, o) => {
    At(a, r, e, t) || (s.push([i, o]), i = o, a = {}, At(a, r, e, t));
  }), n.length > 0 && s.push([i, n.length]), s;
}
function qs(n, e) {
  return n.replace(/<lang xml:lang="([^"]*)">/g, (t, s) => {
    const i = Kt(s, e);
    return i === s ? t : `<lang xml:lang="${i}">`;
  });
}
function be(n, e = n, t = []) {
  let s = "", i = "";
  const a = [];
  return n.forEach((r, o) => {
    const l = e[o];
    if (l.length === 1 && Yi(l) && i.endsWith(l)) {
      a.push({ start: s.length, end: s.length });
      return;
    }
    const c = t[o] === "spaced" || t[o] === void 0 && !Ze(l) && !Xi(i) && !ss(i.replace(/(?:<[^>]*>)+$/, ""), l.replace(/^(?:<[^>]*>)+/, ""));
    i && c && !/\s$/.test(i) && !/^\s/.test(l) && (s += " ", i += " ");
    const u = s.length;
    s += r, i += l, a.push({ start: u, end: s.length });
  }), { joined: s, ranges: a };
}
function we(n, e) {
  return n.map((t) => e.touchingPieces.has(t) ? "touching" : e.spacedPieces.has(t) ? "spaced" : void 0);
}
function ge(n, e) {
  let t = 0;
  for (; t < n.length - 1 && n[t + 1].start <= e; ) t++;
  return t;
}
function fe(n, e) {
  const t = pi(n), s = D(n, e.ancestorChains)?.ref;
  if (t) {
    const i = { cssSelector: t };
    return s?.href !== void 0 && (i.href = s.href), Rt(i);
  }
  return s && Rt(s);
}
function Ks(n, e, t) {
  const s = [];
  return n.forEach((i, a) => {
    if (i.offsets) {
      s.push(...i.offsets);
      return;
    }
    if (t.synthetic.has(i)) return;
    const r = e[a];
    if (!r || Array.isArray(r)) return;
    const o = D(r, t.ancestorChains);
    if (!o) return;
    const l = F((t.format === "ssml" ? i.ssml : i.plain) ?? "", t.format);
    if (!l) return;
    const c = t.pendingRange.get(i), u = re(r) ? fe(r, t) ?? o.ref : pe(o.ref, l);
    s.push({ start: c?.start ?? 0, end: c?.end ?? l.length, locate: u });
  }), s;
}
function Pn(n, e, t, s) {
  const i = s.edgeSubstitutedLocate.get(n);
  if (i) return i[t];
  if (!(!e || Array.isArray(e) || !re(e)))
    return fe(e, s);
}
function Dr(n, e, t) {
  const s = n.map((l, c) => {
    if (l.locate) return l.locate;
    if (t.synthetic.has(l)) return;
    const u = e[c];
    if (!u || Array.isArray(u)) return;
    const h = F((t.format === "ssml" ? l.ssml : l.plain) ?? "", t.format);
    if (h)
      return re(u) ? D(u, t.ancestorChains) && fe(u, t) : Zt(D(u, t.ancestorChains), h);
  }), i = s.findIndex((l) => l !== void 0);
  if (i === -1) return;
  let a = s.length - 1;
  for (; s[a] === void 0; ) a--;
  if (i === a) return s[i];
  const r = e[i], o = e[a];
  if (r && o && !Array.isArray(r) && !Array.isArray(o)) {
    const l = D(r, t.ancestorChains), c = D(o, t.ancestorChains);
    return Xt(l, c, s[i]);
  }
  return s[i];
}
function Qt(n, e, t) {
  const s = [], i = [], a = [];
  for (let g = 0; g < n.length; g++) {
    const p = n[g], v = t.format === "ssml" ? p.ssml : p.plain;
    v && (s.push(v), i.push(p), a.push(e[g]));
  }
  if (s.length === 0) return;
  const r = $s(i, t);
  if (r === null) return;
  const o = t.format === "ssml" ? i.map((g) => Gs(g, r, t)) : s, { joined: l } = be(o, o, we(i, t)), c = t.format === "ssml" ? { ssml: l } : { plain: l };
  r && (c.language = r), n.some((g) => t.synthetic.has(g)) && t.synthetic.add(c);
  const u = Ks(i, a, t);
  u.length > 0 && (c.offsets = u);
  const h = Dr(i, a, t);
  h && (c.locate = h);
  const d = Pn(i[0], a[0], "leading", t), f = Pn(i[i.length - 1], a[i.length - 1], "trailing", t);
  return (d || f) && t.edgeSubstitutedLocate.set(c, { leading: d, trailing: f }), c;
}
function Ws(n, e) {
  return e === "ssml" && n?.ssml ? F(n.ssml, "ssml") : n?.plain ?? _(n?.ssml ?? "");
}
function Jt(n, e, t, s) {
  if (e === "plain" && t !== "block-level" && t !== "none" && n.ssml && ds(n.ssml)) {
    const r = Ws(n, e);
    let o = 0;
    return Nt(n.ssml, n.language).map((l) => {
      const c = { plain: l.plain }, u = Y(l.language, s);
      u && (c.language = u);
      const h = r.indexOf(l.plain, o);
      return h !== -1 && (o = h + l.plain.length, s.pendingRange.set(c, { start: h, end: o })), c;
    });
  }
  const i = {}, a = Y(n.language, s);
  return a && (i.language = a), e === "ssml" ? i.ssml = n.ssml ? qs(n.ssml, s.languageOverrides) : G(n.plain ?? "") : i.plain = n.plain ?? _(n.ssml ?? ""), (t === "block-level" || t === "none") && i.ssml && (i.ssml = Bs(i.ssml)), [i];
}
function F(n, e) {
  return e === "ssml" ? os(n) : n;
}
function pe(n, e) {
  const t = n.cssSelector ?? n.domRange?.start.cssSelector;
  if (!t) return { ...n, text: { highlight: e } };
  const s = { cssSelector: t, text: { highlight: e } };
  return n.href !== void 0 && (s.href = n.href), s;
}
function D(n, e) {
  const t = on(n);
  if (t) return { own: !0, ref: t };
  for (const s of e.get(n) ?? []) {
    const i = on(s);
    if (i) return { own: !1, ref: i };
  }
}
function Zt(n, e) {
  if (n)
    return n.own ? n.ref : pe(n.ref, e);
}
function Xt(n, e, t) {
  return (n && e ? mi(n.ref, e.ref) : void 0) ?? t;
}
function Fr(n, e, t) {
  const { ancestorChains: s } = t, i = /* @__PURE__ */ new Map();
  for (const a of e)
    a && !Array.isArray(a) && i.set(a, (i.get(a) ?? 0) + 1);
  return n.map((a, r) => {
    if (a.offsets) return a;
    const o = e[r], l = a.plain ?? F(a.ssml ?? "", "ssml");
    if (Array.isArray(o)) {
      const [d, f] = o, g = D(d, s), p = D(f, s), v = Xt(g, p, Zt(g, l));
      return v ? { ...a, locate: v } : a;
    }
    const c = o, u = c ? D(c, s) : void 0;
    if (!u) return a;
    const h = { ...a, locate: u.ref };
    if (!t.synthetic.has(a)) {
      const d = t.pendingRange.get(a), f = d !== void 0 || c && (i.get(c) ?? 0) > 1, g = c && re(c) ? fe(c, t) : void 0;
      h.locate = g ?? (u.own && !f ? u.ref : pe(u.ref, l)), h.offsets = [{ start: d?.start ?? 0, end: d?.end ?? l.length, locate: h.locate }];
    }
    return h;
  });
}
function Yt(n) {
  const e = xe(Oe(n));
  return e ? e.plain ?? (e.ssml ? _(e.ssml) : "") : "";
}
function _r(n) {
  const e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map();
  let s = 0, i;
  return n.forEach((a, r) => {
    e.set(a, r + 1);
    const o = a.children ?? [];
    if (s = Math.max(s, o.length), o.some((l) => l.role?.has("columnheader"))) {
      i = o.map(Yt);
      return;
    }
    i && o.forEach((l, c) => {
      if (!l.role?.has("cell") && !l.role?.has("rowheader")) return;
      const u = i[c];
      u && t.set(l, u);
    });
  }), { lines: n.length, columns: s, rowNumbers: e, cellHeaders: t };
}
function Qs(n, e) {
  const t = e.format === "ssml" ? { ssml: G(n) } : { plain: n };
  return e.synthetic.add(t), t;
}
function K(n, e) {
  const t = Qs(n, e), s = e.language === "none" ? Y(void 0, e) : e.contextualizationLanguage;
  return s && (t.language = s), t;
}
function Lt(n, e, t) {
  const s = Qs(n, t), i = Y(Ls(e), t);
  return i && (s.language = i), s;
}
function ce(n, e, t, s) {
  n.push(...s);
  for (let i = 0; i < s.length; i++) e.push(t);
}
function en(n, e, t, s, i, a, r) {
  r ? (i.some((o) => t.blockStarts.has(o)) && t.blockStarts.add(r), ce(n, e, a[0] ?? s, [r])) : (n.push(...i), e.push(...a));
}
function tn(n, e, t, s, i, a) {
  for (const [r, o] of Hs(i, t)) {
    const l = i.slice(r, o), c = a.slice(r, o), u = l.length > 1 ? Qt(l, c, t) : void 0;
    en(n, e, t, s, l, c, u);
  }
}
function ae(n, e, t, s) {
  const i = t ? `${e}.${t}` : void 0;
  if (i && n.i18n.exists(i)) return n.i18n.t(i, s);
  if (n.i18n.exists(e)) return n.i18n.t(e, s);
}
function nn(n, e) {
  return xs.has(n) ? !0 : e.contextualize.has(n);
}
function Js(n, e, t) {
  return e.some((s) => {
    const i = Pr[s];
    return i?.drops.includes(n) ? i.unconditional || nn(s, t) : !1;
  });
}
function Te(n, e, t, s, i) {
  if (!e.includes(t)) return;
  const a = D(s, i.ancestorChains);
  if (!a) return;
  const r = pe(a.ref, t);
  n.offsets = [{ start: 0, end: t.length, locate: r }], n.locate = a.own ? a.ref : r;
}
function ht(n, e, t, s, i, a) {
  const r = a?.value;
  if (r !== void 0 && r === Yt(t)) {
    const l = Y(t.text?.language, s);
    l && (n.language = l), s.synthetic.delete(n), Te(n, e, r, t, s);
    return;
  }
  const o = a?.description;
  o !== void 0 && o === it(t) && (i === "figure" || i === "table") && Te(n, e, o, t, s);
}
function An(n, e, t, s, i, a, r, o) {
  if (!nn(i, s)) return;
  if ((s.i18n.exists(`${i}.block.start`) || s.i18n.exists(`${i}.block.end`)) && s.contextualizationShapes[i] !== "inline") {
    const c = a === "before" ? `${i}.block.start` : `${i}.block.end`;
    ce(n, e, t, Vn(c, r, o, t, i, s));
    return;
  }
  a === "before" && ce(n, e, t, Vn(`${i}.inline`, r, o, t, i, s));
}
const Ln = "\0";
function Vn(n, e, t, s, i, a) {
  const r = ae(a, n, e, t);
  if (!r) return [];
  const o = t?.description, l = a.language !== "none" && o !== void 0 && o === it(s) ? Y(Ls(s), a) : void 0, c = l ? ae(a, n, e, { ...t, description: Ln })?.split(Ln) : void 0;
  if (!l || !c || c.length < 2) {
    const d = K(r, a);
    return ht(d, r, s, a, i, t), [d];
  }
  if (O(l)[0] === O(a.contextualizationLanguage)[0]) {
    const d = K(r, a);
    return d.language = l, ht(d, r, s, a, i, t), [d];
  }
  const u = `<lang xml:lang="${$n(l)}">${G(o)}</lang>`, h = c.map((d) => G(d)).join(u);
  if (a.format === "ssml") {
    const d = K(r, a);
    return d.ssml = h, ht(d, r, s, a, i, t), [d];
  }
  return Nt(h, a.contextualizationLanguage).map((d) => {
    if (d.language !== l) return K(d.plain, a);
    const f = Lt(d.plain, s, a);
    return (i === "figure" || i === "table") && Te(f, d.plain, o, s, a), f;
  });
}
function On(n, e, t, s) {
  const i = `${e}.parts.${t}`;
  return n.i18n.exists(i, { count: s }) ? n.i18n.t(i, { count: s }) : String(s);
}
function $r(n) {
  const e = it(n);
  return e === void 0 ? { variantKey: "unlabelled" } : { variantKey: "labelled", params: { description: e } };
}
function Tn(n, e) {
  const t = e.tableCellHeaders.get(n);
  return {
    variantKey: t !== void 0 ? "withHeader" : "withoutHeader",
    params: { header: t ?? "", value: Yt(n) }
  };
}
const Gr = {
  table: (n, e) => {
    const t = (n.children ?? []).filter((i) => i.role?.has("row")), s = _r(t);
    for (const [i, a] of s.rowNumbers) e.tableRowNumbers.set(i, a);
    for (const [i, a] of s.cellHeaders) e.tableCellHeaders.set(i, a);
    return {
      params: {
        lines: On(e, "table", "lines", s.lines),
        columns: On(e, "table", "columns", s.columns)
      }
    };
  },
  row: (n, e) => ({ params: { count: String(e.tableRowNumbers.get(n) ?? "") } }),
  cell: Tn,
  rowheader: Tn
};
function Un(n, e, t) {
  const s = $r(e);
  let i = s.variantKey, a = s.params;
  const r = Gr[n]?.(e, t);
  r && (r.variantKey && (i = r.variantKey), a = { ...a, ...r.params });
  const o = t.contextualizationParams?.(n, e);
  return o && (a = { ...a, ...o }), { variantKey: i, params: a };
}
const xn = "[\\u0391-\\u03A9\\u03B1-\\u03C9\\u03D8-\\u03E1]", Hr = "[\\u0374\\u02B9\\u0384']", dt = "[\\u05D0-\\u05EA]", Nn = "[\\u0400-\\u0481\\u048A-\\u04FF]", qr = [
  new RegExp("^\\p{Nd}+$", "u"),
  new RegExp("^\\p{Nl}+$", "u"),
  /^(?=[MDCLXVI])M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i,
  /^[〇零一二三四五六七八九十百千万]+$/u,
  /^[፩-፼]+$/u,
  new RegExp(`^${dt}[\\u05F3']$`, "u"),
  new RegExp(`^${dt}+[\\u05F4"]${dt}$`, "u"),
  new RegExp(`^(?:\\u0375${xn})*${xn}+${Hr}$`, "u"),
  /^(?:[Ա-Ֆա-և]̅)+$/u,
  new RegExp(`^\\u0482?${Nn}+\\u0483${Nn}*$`, "u")
];
function Kr(n) {
  const e = n.trim();
  return e.length > 0 && qr.some((t) => t.test(e));
}
const Wr = new Set(Ir);
function Qe(n, e) {
  return e.blockTerms.has(n) || j(n).some((t) => Wr.has(t));
}
function Zs(n, e) {
  return Array.isArray(n) ? n[e === "leading" ? 0 : 1] : n;
}
function Je(n, e, t) {
  if (!n) return;
  const s = Zs(n, e);
  return [s, ...t.ancestorChains.get(s) ?? []].find((i) => Qe(i, t));
}
function ee(n, e) {
  return e.placeholderPieces.get(n)?.placement === "alias";
}
async function Xs(n, e, t, s, i, a, r) {
  return Vt(await Ys(n, e, i, a, r), n, t, s, r);
}
async function Ys(n, e, t, s, i) {
  const a = [], r = [];
  e.forEach((c, u) => {
    const h = ee(n[u], i) ? i.placeholderPieces.get(n[u]).abbreviation : c;
    h && (a.push(u), r.push(h));
  });
  const { joined: o, ranges: l } = be(r, r, we(a.map((c) => n[c]), i));
  return { boundaries: await i.segmenter(t, o, s), textRanges: l, included: a };
}
function Vt({ boundaries: n, textRanges: e, included: t }, s, i, a, r) {
  const o = (u, h) => {
    let d = ge(e, u);
    h && d > 0 && u === e[d].start && d--;
    const f = t[d], g = u - e[d].start, p = e[d].end - e[d].start;
    if (g === 0 || g < p && !ee(s[f], r)) return a[f].start + g;
    if (g > p && !h) return d + 1 < t.length ? a[t[d + 1]].start : i.length;
    let v = f;
    for (; v + 1 < s.length && !t.includes(v + 1); ) v++;
    return a[v].end;
  }, l = (u) => {
    const h = ge(e, u), d = u - e[h].start;
    return ee(s[t[h]], r) && d > 0 && d < e[h].end - e[h].start;
  }, c = [];
  for (const u of n) {
    const h = o(u.start, !1), d = Math.max(h, o(u.contentEnd, !0)), f = Math.max(d, o(u.end, !1)), g = c[c.length - 1];
    g && l(u.start) ? (g.contentEnd = Math.max(g.contentEnd, d), g.end = Math.max(g.end, f), g.text = i.slice(g.start, g.contentEnd)) : c.push({ text: i.slice(h, d), start: h, end: f, contentEnd: d });
  }
  return c;
}
const Ot = new RegExp("\\p{Sentence_Terminal}$", "u"), Qr = /^[\s\p{Pe}\p{Pf}\p{Pi}"']*$/u;
function Jr(n) {
  return Ot.test(n);
}
function sn(n, e, t, s, i) {
  let a = !1;
  return n.forEach((r, o) => {
    if (!ee(r, i)) return;
    const l = i.placeholderPieces.get(r).abbreviation?.match(Ot)?.[0];
    if (!l) return;
    const { start: c, end: u } = t[o];
    if (s.some((h) => h.start < u && h.contentEnd >= u && Qr.test(e.slice(u, h.contentEnd))) && !Ot.test(e.slice(c, u))) {
      r.plain !== void 0 && (r.plain += l), r.ssml !== void 0 && (r.ssml += l);
      for (const h of r.offsets ?? []) {
        const d = ar(h);
        d !== void 0 && As(h, d + l.length);
      }
      a = !0;
    }
  }), a;
}
function Zr(n, e) {
  const t = F((e.format === "ssml" ? n.ssml : n.plain) ?? "", e.format), s = { start: 0, end: t.length };
  sn([n], t, [s], [{ text: t, ...s, contentEnd: t.length }], e);
}
async function Xr(n, e, t) {
  const s = [], i = [];
  let a = 0;
  for (; a < n.length; ) {
    const r = t.placeholderPieces.get(n[a])?.node;
    if (!r) {
      s.push(n[a]), i.push(e[a]), a++;
      continue;
    }
    let o = a;
    for (; o + 1 < n.length && t.placeholderPieces.get(n[o + 1])?.node === r; ) o++;
    const l = n.slice(a, o + 1), c = e.slice(a, o + 1), u = Ds(l, t), h = (u === null ? l[0].language : u) ?? "en", d = Je(r, "trailing", t), f = o + 1 < n.length && d && Je(e[o + 1], "leading", t) === d ? [...l, n[o + 1]] : l, g = f.map((y) => F((t.format === "ssml" ? y.ssml : y.plain) ?? "", t.format)), { joined: p, ranges: v } = be(g, g, we(f, t)), m = await Xs(f, g, p, v, h, at(h, t), t);
    sn(l, p, v, m, t), tn(s, i, t, r, l, c), a = o + 1;
  }
  return { out: s, sources: i };
}
function zn(n, e) {
  return e.skip.size > 0 && n.some((t) => e.skip.has(t) && !We.has(t) && !Js(t, n, e));
}
function an(n, e) {
  const t = n.find((s) => We.has(s));
  return t === void 0 ? void 0 : e.interruptions[t] ?? "after";
}
function Yr(n, e) {
  const t = xe(n.text);
  if (!t) return [];
  const s = t.plain ?? _(t.ssml ?? "");
  if (Kr(s)) {
    const i = ae(e, "pagebreak.number", void 0, { number: s.trim() });
    if (i !== void 0) return [K(i, e)];
  }
  return Jt(t, e.format, e.language, e);
}
function Mn(n) {
  n.plain !== void 0 && (n.plain += "."), n.ssml !== void 0 && (n.ssml += ".");
}
function eo(n, e) {
  const t = Yr(n, e);
  if (!e.contextualize.has("pagebreak")) return t;
  const s = e.i18n.exists("pagebreak.block.start") ? "pagebreak.block.start" : "pagebreak.inline", i = ae(e, s);
  if (i === void 0) return t;
  const a = K(i, e);
  if (t.length === 0) return [a];
  const r = Qt([a, ...t], [void 0, ...t.map(() => n)], e);
  return r ? (Mn(r), [r]) : (Mn(t[t.length - 1]), [a, ...t]);
}
function to(n, e) {
  const t = xe(Oe(n));
  return t ? Jt(t, e.format, e.language, e) : [];
}
const gt = "", Be = "";
function rn(n) {
  return j(n).includes("term") || (n.children ?? []).some(rn);
}
const Tt = /* @__PURE__ */ new Set();
function ei(n) {
  return rn(n) ? [n, ...(n.children ?? []).flatMap(ei)] : [];
}
function ti(n, e, t, s, i, a, r) {
  if (e.length === 0) return;
  const o = j(n).find((y) => le.has(y)), l = e.length > 1 ? e.find(rn) : void 0, c = e.filter((y) => y !== l), u = o && i.contextualize.has(o) ? ae(i, `${o}.inline`) : void 0, h = o && r && l ? ae(i, `${o}.term`, void 0, { term: gt, value: Be }) : void 0, d = r ? e : c;
  if (u === void 0 && !h) {
    se(d, t, s, i, a);
    return;
  }
  const f = Qe(d[0], i) && !a, g = [], p = [];
  u !== void 0 && (g.push(K(u, i)), p.push(n));
  const v = a || f, m = [...d, ...l ? ei(l) : []];
  m.forEach((y) => Tt.add(y));
  for (const y of (h ?? Be).split(new RegExp(`(${gt}|${Be})`)))
    y === gt ? se([l], g, p, i, v) : y === Be ? se(c, g, p, i, v) : y && (g.push(K(y, i)), p.push(n));
  m.forEach((y) => Tt.delete(y)), f && g.length > 0 && i.blockStarts.add(g[0]), tn(t, s, i, n, g, p);
}
function ni(n, e, t, s, i) {
  n.forEach((a, r) => {
    const o = r === 0 ? i : !1;
    "ref" in a ? ti(a.ref, a.targets, e, t, s, o, !0) : Ue(a.node, e, t, s, o);
  });
}
function Fe(n, e) {
  const t = an(j(n), e);
  return t !== void 0 && t !== "inline";
}
function no(n, e, t, s, i) {
  const a = D(s, i.ancestorChains);
  if (!a) return;
  const r = Rt(pe(a.ref, e));
  i.aliasLocates.add(r);
  for (const o of n) {
    const l = { ...t, locate: r };
    o.locate = r, o.offsets = [l], As(l, F((i.format === "ssml" ? o.ssml : o.plain) ?? "", i.format).length), i.edgeSubstitutedLocate.set(o, { leading: r, trailing: r });
  }
}
function so(n, e, t, s, i, a, r) {
  const o = n.text?.language, l = Y(o, i), c = new Map((n.children ?? []).map((b) => [b.id, b])), u = [], h = [], d = [], f = /* @__PURE__ */ new Set(), g = /* @__PURE__ */ new Set(), p = /* @__PURE__ */ new Map(), v = /* @__PURE__ */ new Set(), m = i.segmentation === "sentence", y = i.interruptions.abbreviation === "never", k = i.interruptions.abbreviation === "inline", w = Ws(xe(Oe(n)), i.format);
  let E = 0, S = 0;
  const R = (b, C) => {
    const P = b ? w.indexOf(b, C) : -1;
    if (P !== -1)
      return E = Math.max(E, P + b.length), { start: P, end: P + b.length };
  }, L = (b) => {
    for (const C of u.slice(b)) {
      const P = R(F((i.format === "ssml" ? C.ssml : C.plain) ?? "", i.format), E);
      P && i.pendingRange.set(C, P);
    }
  }, I = (b, C) => {
    if (b.abbreviation !== "alias") return;
    const P = u.slice(C), U = _(b.abbreviationText), x = R(U, S) ?? { start: 0, end: U.length };
    no(P, U, x, n, i);
    const B = k ? U : void 0;
    P.forEach((Q, J) => p.set(Q, J === 0 ? B : void 0));
  }, T = (b, C) => {
    const P = !k && p.has(u[C - 1]);
    b.touchesPrevious && C > 0 && u.length > C && !P && i.touchingPieces.add(u[C]);
  }, V = /* @__PURE__ */ new Map();
  for (const { placeholderId: b } of kt(e)) {
    const C = b === void 0 ? void 0 : c.get(b);
    if (!C || Fe(C, i) || !j(C).some((U) => We.has(U))) continue;
    const P = { pieces: [], sources: [] };
    Ue(C, P.pieces, P.sources, i, a), V.set(b, P);
  }
  const M = (b) => {
    const C = c.get(b);
    return V.get(b)?.pieces.length === 0 ? !0 : C !== void 0 && Fe(C, i) && !j(C).some((P) => le.has(P));
  };
  let N;
  const W = (b) => {
    const C = u[b];
    !N || !C || (N.spaceAcross ? i.spacedPieces.add(C) : N.touching && i.touchingPieces.add(C), N = void 0);
  }, { ssml: oe, spaced: te } = fs(e, M, o), ne = Ca(oe, o);
  for (let b of kt(oe)) {
    if (b.abbreviation === "text" && (S = E), b.abbreviation && (b.abbreviation === "text" ? k : y)) continue;
    if (b.abbreviation === "alias" && !k && (b = { ...b, ssml: b.parenthesizedSsml, touchesPrevious: !1 }), b.placeholderId !== void 0) {
      const U = c.get(b.placeholderId);
      if (!U) continue;
      if (M(b.placeholderId) ? N = { spaceAcross: te.has(b.placeholderId) } : N = void 0, Fe(U, i)) {
        const x = j(U), B = x.some((J) => le.has(J));
        if (B)
          for (const J of to(U, i))
            u.push(J), h.push(U);
        const Q = B ? an(x, i) === "never" || !U.children?.length ? [] : [{ ref: U, targets: U.children }] : [{ node: U }];
        for (const J of Q)
          if (d.push(J), m) {
            const oi = u.length;
            ni([J], u, h, i, d.length === 1 && (a || r)), u.slice(oi).forEach((li) => g.add(li));
          }
      } else {
        const x = u.length;
        if (j(U).some((B) => We.has(B))) {
          const B = V.get(b.placeholderId);
          if (u.push(...B.pieces), h.push(...B.sources), u.slice(x).forEach((Q) => f.add(Q)), u.length > x) {
            const Q = ne.has(b.placeholderId);
            /\s$/.test(b.textBefore) || !Q && new RegExp("\\S\\p{Pi}$", "u").test(b.textBefore) ? i.spacedPieces.add(u[x]) : Q && i.touchingPieces.add(u[x]), N = { spaceAcross: /^\s/.test(b.textAfter) && Ra(b.textAfter.trimStart(), o), touching: Q };
          }
        } else
          Ue(U, u, h, i, a, d), u.slice(x).forEach((B) => i.placeholderPieces.has(B) && v.add(B)), u.length > x && (/\s$/.test(b.textBefore) && i.spacedPieces.add(u[x]), N = { spaceAcross: /^\s/.test(b.textAfter) });
      }
      continue;
    }
    if (!b.ssml) continue;
    const C = u.length;
    if (i.format === "plain" && i.language !== "block-level" && i.language !== "none" && ds(b.ssml)) {
      for (const U of Nt(b.ssml, o)) {
        const x = { plain: U.plain }, B = Y(U.language, i);
        B && (x.language = B), u.push(x), h.push(n);
      }
      b.abbreviation !== "alias" && L(C), W(C), I(b, C), T(b, C);
      continue;
    }
    const P = {};
    l && (P.language = l), i.format === "ssml" ? P.ssml = qs(b.ssml, i.languageOverrides) : P.plain = _(b.ssml), (i.language === "block-level" || i.language === "none") && P.ssml && (P.ssml = Bs(P.ssml)), u.push(P), h.push(n), b.abbreviation !== "alias" && L(C), W(C), I(b, C), T(b, C);
  }
  const me = !m && (v.size > 0 || u.some((b) => Jr(p.get(b) ?? "")));
  return m && d.length + f.size + p.size + v.size > 0 || me ? (u.forEach((b) => {
    const C = f.has(b) ? { placement: "inline" } : g.has(b) ? { placement: "after" } : p.has(b) ? { placement: "alias", abbreviation: p.get(b) } : v.has(b) ? i.placeholderPieces.get(b) : void 0;
    i.placeholderPieces.set(b, { ...C, node: n });
  }), en(t, s, i, n, u, h, void 0), m ? [] : d) : (tn(t, s, i, n, u, h), d);
}
function Ue(n, e, t, s, i, a, r = !1) {
  const o = j(n), l = it(n), c = an(o, s) === "never", u = c && o.some((m) => le.has(m));
  if (zn(o, s) || c && !u) return;
  const h = Qe(n, s), d = h && !i, f = e.length, g = Tt.has(n) ? [] : o.filter(
    (m) => m !== "footnote" && m !== "pagebreak" && !le.has(m) && !Js(m, o, s)
  ), p = o.some((m) => Ur.has(m) && s.contextualize.has(m)), v = o.includes("table") && l !== void 0 && !p;
  if (v) {
    const m = Lt(l, n, s);
    Te(m, l, l, n, s), ce(e, t, n, [m]);
  }
  for (const m of g) {
    if (m === "figure" && l === void 0) continue;
    const { variantKey: y, params: k } = Un(m, n, s);
    An(e, t, n, s, m, "before", y, k);
  }
  if (o.includes("noteref"))
    for (const m of n.children ?? []) {
      const y = j(m);
      if (!zn(y, s))
        if (y.includes("footnote")) {
          const k = s.contextualize.has("footnote"), w = s.i18n.exists("footnote.block.start") || s.i18n.exists("footnote.block.end"), E = Qe(m, s) && !i && s.interruptions.noteref !== "inline", S = k ? ae(s, w ? "footnote.block.start" : "footnote.inline") : void 0, R = k && (S !== void 0 || w), L = [], I = [];
          S !== void 0 && (L.push(K(S, s)), I.push(m));
          const T = [], V = [];
          if (se([m], T, V, s, i || E), E && T.length > 0 && s.blockStarts.add(T[0]), L.push(...T), I.push(...V), R && w) {
            const N = ae(s, "footnote.block.end");
            N !== void 0 && (L.push(K(N, s)), I.push(m));
          }
          const M = R && L.length > 1 ? Qt(L, I, s) : void 0;
          en(e, t, s, m, L, I, M);
        } else
          se([m], e, t, s, i);
    }
  else if (!o.some((m) => xr.has(m))) {
    const m = Oe(n)?.ssml, y = r || o.some((k) => xs.has(k) && nn(k, s));
    if (m && vn(m) && !y) {
      const k = so(n, m, e, t, s, i, h);
      if (a)
        a.push(...k);
      else if (k.length > 0) {
        const w = i || h && e.length > f;
        ni(k, e, t, s, w);
      }
    } else if (o.includes("pagebreak")) {
      if (ce(e, t, n, eo(n, s)), n.children) {
        const k = i || h && e.length > f;
        se(n.children, e, t, s, k);
      }
    } else {
      const k = y ? void 0 : xe(Oe(n));
      if (k && ce(e, t, n, Jt(k, s.format, s.language, s)), n.children && !u) {
        const w = i || h && e.length > f;
        if (o.some((E) => le.has(E)))
          ti(n, n.children, e, t, s, w, Fe(n, s));
        else if (y && m && vn(m)) {
          const E = new Set(kt(m).flatMap((S) => S.placeholderId ?? []));
          n.children.forEach((S, R) => {
            const L = j(S), I = S.id !== void 0 && E.has(S.id) && (L.length === 0 || L.some((T) => le.has(T)));
            Ue(S, e, t, s, R === 0 ? w : !1, void 0, I);
          });
        } else
          se(n.children, e, t, s, w);
      }
    }
  }
  if (d && e.length > f && s.blockStarts.add(e[f]), l !== void 0 && !p && !v) {
    const m = Lt(l, n, s);
    o.includes("figure") && Te(m, l, l, n, s), ce(e, t, n, [m]);
  }
  for (const m of g) {
    if (m === "figure" && l === void 0) continue;
    const { variantKey: y, params: k } = Un(m, n, s);
    An(e, t, n, s, m, "after", y, k);
  }
}
function se(n, e, t, s, i) {
  n.forEach((a, r) => Ue(a, e, t, s, r === 0 ? i : !1));
}
const io = us;
async function si(n, e, t, s) {
  const i = io(n);
  let a = "";
  const r = [], o = (g) => g.kind === "text" ? g.text : g.kind === "paired" ? g.innerText : "", l = (g) => {
    let p = g + 1;
    for (; p < i.length && !o(i[p]); ) p++;
    return p < i.length ? o(i[p]) : "";
  };
  if (i.forEach((g, p) => {
    const v = g.kind !== "text" && nt(g.raw);
    g.kind === "paired" && v && Ae(a, o(g)) && (a += " "), r.push(a.length), g.kind !== "selfClosing" && (a += o(g)), v && Ae(a, l(p)) && (a += " ");
  }), !a) return;
  const c = await t(e, a, s);
  if (c.length <= 1) return;
  const u = [];
  let h = "", d = 0;
  function f(g, p, v) {
    let m = p;
    const y = p + g.length;
    for (; m < y; ) {
      const k = c[d], w = Math.min(y, k.end), E = w >= k.end && d < c.length - 1;
      let S = g.slice(m - p, w - p);
      E && (S = S.replace(/[ \t\r\n]+$/, "")), S && (h += v ? v(G(S)) : G(S)), m = w, E && (u.push(h), h = "", d++);
    }
  }
  return i.forEach((g, p) => {
    if (g.kind === "selfClosing")
      h += g.raw;
    else if (g.kind === "text")
      f(g.text, r[p]);
    else {
      const v = `<${g.tag}${g.attrs}>`, m = `</${g.tag}>`;
      g.innerText ? f(g.innerText, r[p], (y) => `${v}${y}${m}`) : h += v + m;
    }
  }), h && u.push(h.replace(/[ \t\r\n]+$/, "")), u;
}
async function ao(n, e) {
  const t = n.language ?? "en", s = at(t, e), i = e.format === "ssml" ? n.ssml : n.plain;
  if (!i) return;
  const a = await e.segmenter(t, F(i, e.format), s);
  if (a.length <= 1) return;
  if (e.format !== "ssml") return a.map((o) => ({ text: o.text, start: o.start, end: o.contentEnd }));
  const r = await si(i, t, e.segmenter, s);
  if (r)
    return a.map((o, l) => ({ text: r[l], start: o.start, end: o.contentEnd }));
}
const Bn = /* @__PURE__ */ new Set([
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
function jn(n) {
  return n ? j(Array.isArray(n) ? n[1] : n) : [];
}
function Dn(n, e, t) {
  const s = Zs(n, e);
  return (t.ancestorChains.get(s) ?? []).filter((i) => j(i).some((a) => a !== "presentation"));
}
function ro(n, e) {
  return n.length === e.length && n.every((t, s) => t === e[s]);
}
function Fn(n, e, t, s) {
  const i = s.edgeSubstitutedLocate.get(e)?.[t];
  return i && !s.aliasLocates.has(i) ? !0 : !!n && !Array.isArray(n) && re(n);
}
function ke(n, e) {
  return e.placeholderPieces.get(n)?.placement === "inline";
}
function oo(n, e) {
  return e.placeholderPieces.get(n)?.placement === "after";
}
function ii(n, e, t, s) {
  for (const { piece: i, source: a } of n.get(e) ?? [])
    t.push(i), s.push(a);
  n.delete(e);
}
function Ut(n, e, t) {
  const s = t.placeholderPieces.get(n)?.node;
  return s !== void 0 && s === t.placeholderPieces.get(e)?.node;
}
function lo(n, e, t, s, i) {
  const a = i.format === "ssml" ? n.ssml : n.plain, r = i.format === "ssml" ? t.ssml : t.plain;
  return !a || !r ? !1 : Ut(n, t, i) ? !0 : !(!Wt(n.language ?? "en", t.language ?? "en") || i.synthetic.has(n) || i.synthetic.has(t) || !e || !s || !i.segmentationReconstruct && Je(e, "trailing", i) !== Je(s, "leading", i) || jn(e).some((o) => Bn.has(o)) || jn(s).some((o) => Bn.has(o)) || !ro(Dn(e, "trailing", i), Dn(s, "leading", i)) || Fn(e, n, "trailing", i) || Fn(s, t, "leading", i));
}
async function _n(n, e, t, s, i) {
  const a = t.synthetic.has(n) || ee(n, t) ? void 0 : await ao(n, t);
  if (!a) {
    ee(n, t) && Zr(n, t), s.push(n), i.push(e);
    return;
  }
  const r = t.blockStarts.has(n);
  r && t.blockStarts.delete(n);
  const o = Array.isArray(e) ? void 0 : e, l = o ? D(o, t.ancestorChains) : void 0, c = o && re(o) ? fe(o, t) : void 0, u = t.edgeSubstitutedLocate.get(n), h = t.pendingRange.get(n)?.start ?? 0;
  a.forEach(({ text: d, start: f, end: g }, p) => {
    const [v, m] = [h + f, h + g], y = { ...n, [t.format]: d }, k = (p === 0 ? u?.leading : void 0) ?? (p === a.length - 1 ? u?.trailing : void 0) ?? c;
    if (k && l)
      y.locate = k, y.offsets = [{ start: v, end: m, locate: k }];
    else if (l) {
      const w = t.format === "ssml" ? F(d, t.format) : d, E = pe(l.ref, w);
      y.locate = E, y.offsets = [{ start: v, end: m, locate: E }];
    }
    r && p === 0 && t.blockStarts.add(y), s.push(y), i.push(e);
  });
}
async function co(n, e, t, s, i, a, r) {
  return n.some((o) => ee(o, r)) ? Xs(n, e, t, s, i, a, r) : r.segmenter(i, t, a);
}
async function uo(n, e, t, s) {
  const i = n.map((c) => F(e.format === "ssml" ? c.ssml : c.plain, e.format)), { joined: a, ranges: r } = be(i, i, we(n, e)), o = await co(n, i, a, r, t, s, e), l = new Array(n.length - 1).fill(!1);
  for (const c of o) {
    const u = ge(r, c.start), h = c.end > c.start ? ge(r, c.end - 1) : u;
    for (let d = u; d < h; d++) l[d] = !0;
  }
  return l;
}
function ho(n, e, t) {
  const s = [...e];
  return n.forEach((i, a) => {
    if (!ke(i, t)) return;
    const r = a > 0 && Ut(n[a - 1], i, t), o = a < n.length - 1 && Ut(i, n[a + 1], t);
    r && !s[a - 1] ? s[a - 1] = !0 : o && (s[a] = !0);
  }), s;
}
function go(n, e, t, s, i) {
  const a = (l) => ke(t[ge(s, l)], i), r = [];
  let o;
  return e.forEach((l, c) => {
    o ??= l;
    const u = e[c + 1];
    u && (a(l.contentEnd - 1) || a(u.start)) || (r.push({ text: n.slice(o.start, l.contentEnd), start: o.start, end: l.end, contentEnd: l.contentEnd }), o = void 0);
  }), r;
}
function fo(n, e, t, s, i, a, r) {
  const o = [];
  for (let l = i; l <= a; l++) {
    if (ke(n[l], r) || ee(n[l], r)) {
      o.push(...Ks([n[l]], [e[l]], r));
      continue;
    }
    const c = D(e[l], r.ancestorChains);
    if (!c) continue;
    const u = t[l], h = re(e[l]) ? fe(e[l], r) : void 0, d = Math.max(u.start, s.start), f = Math.min(u.end, l === a ? s.contentEnd : s.end);
    if (f <= d) continue;
    const g = d - u.start, p = f - u.start, v = F(r.format === "ssml" ? n[l].ssml : n[l].plain, r.format), m = h ?? pe(c.ref, v.slice(g, p));
    !h && g > 0 && (m.text = { ...m.text, before: v.slice(0, g) }), !h && p < v.length && (m.text = { ...m.text, after: v.slice(p) });
    const y = r.pendingRange.get(n[l])?.start ?? 0;
    o.push({ start: y + g, end: y + p, locate: m });
  }
  return o;
}
function ai(n, e) {
  const t = Ds(n, e);
  return t !== null ? t ?? "en" : n.find((s) => !ke(s, e))?.language ?? n[0].language ?? "en";
}
function po(n, e, t, s, i) {
  const a = ge(t, n.start), r = n.end > n.start ? ge(t, n.end - 1) : a, o = Hs(e.slice(a, r + 1), i);
  return o.map(([l, c], u) => {
    const h = a + l, d = a + c - 1, f = u === o.length - 1, g = u === 0 ? n.start : t[h].start, p = f ? n.contentEnd : t[d].end, v = f ? n.end : t[d + 1].start, m = $s(e.slice(h, d + 1), i) ?? void 0, y = { text: s.slice(g, p), start: g, end: v, contentEnd: p }, k = o.length > 1 && h === d && ke(e[h], i);
    return { boundary: y, startIdx: h, endIdx: d, language: m, sentenceEnd: f ? n.end : void 0, isolated: k };
  });
}
async function mo(n, e, t, s, i, a) {
  const r = ai(n, t), o = at(r, t), l = () => {
    const w = n.map((E) => F(t.format === "ssml" ? E.ssml : E.plain, t.format));
    return { plainParts: w, ...be(w, w, we(n, t)) };
  };
  let { plainParts: c, joined: u, ranges: h } = l(), d;
  if (!n.some((w) => ee(w, t))) d = await t.segmenter(r, u, o);
  else {
    const w = await Ys(n, c, r, o, t);
    d = Vt(w, n, u, h, t), sn(n, u, h, d, t) && ({ plainParts: c, joined: u, ranges: h } = l(), d = Vt(w, n, u, h, t));
  }
  const f = go(u, d, n, h, t), p = (f.length > 0 ? f : [{ text: u, start: 0, end: u.length, contentEnd: u.length }]).flatMap((w) => po(w, n, h, u, t));
  let v, m;
  if (t.format === "ssml") {
    const w = /* @__PURE__ */ new Map();
    for (const S of p) for (let R = S.startIdx; R <= S.endIdx; R++) w.set(R, S.language);
    m = be(
      n.map((S, R) => Gs(S, w.get(R), t)),
      c,
      we(n, t)
    ).joined;
    const E = p.map((S) => S.boundary);
    v = p.length > 1 ? await si(m, r, async () => E, o) : void 0;
  }
  const y = new Set(n.filter((w) => t.blockStarts.has(w))), k = (w, E) => {
    if (w !== void 0)
      for (let S = 0; S < n.length; S++)
        (h[S].end <= w || E === p.length - 1) && ii(a, S, s, i);
  };
  p.forEach(({ boundary: w, startIdx: E, endIdx: S, language: R, sentenceEnd: L, isolated: I }, T) => {
    if (I) {
      s.push(n[E]), i.push(e[E]), k(L, T);
      return;
    }
    const V = t.format === "ssml" ? v ? v[T] : m : w.text, M = { [t.format]: V }, N = t.language === "none" ? Y(void 0, t) : R ?? "en";
    N && (M.language = N), n.slice(E, S + 1).filter((x) => y.delete(x)).length > 0 && t.blockStarts.add(M);
    const oe = fo(n, e, h, w, E, S, t);
    oe.length > 0 && (M.offsets = oe);
    const te = [...Array(S - E + 1).keys()].map((x) => E + x).filter((x) => !ke(n[x], t)), ne = te[0] ?? E, me = te[te.length - 1] ?? S, b = D(e[ne], t.ancestorChains), C = e[ne], P = (re(C) ? fe(C, t) : void 0) ?? Zt(b, F(V, t.format)), U = ne !== me ? Xt(b, D(e[me], t.ancestorChains), P) : P;
    U && (M.locate = U), s.push(M), i.push(ne === me ? e[ne] : [e[ne], e[me]]), k(L, T);
  });
}
async function vo(n, e, t) {
  if (t.segmentation !== "sentence") return { out: n, sources: e };
  const s = [], i = [];
  let a = 0;
  for (; a < n.length; ) {
    let r = a;
    for (; r + 1 < n.length && lo(n[r], e[r], n[r + 1], e[r + 1], t); ) r++;
    if (r === a) {
      await _n(n[a], e[a], t, s, i), a = r + 1;
      continue;
    }
    const o = [], l = [], c = /* @__PURE__ */ new Map();
    for (let g = a; g <= r; g++)
      if (!oo(n[g], t))
        o.push(n[g]), l.push(e[g]);
      else if (o.length === 0)
        s.push(n[g]), i.push(e[g]);
      else {
        const p = o.length - 1;
        c.set(p, [...c.get(p) ?? [], { piece: n[g], source: e[g] }]);
      }
    if (o.length === 0) {
      a = r + 1;
      continue;
    }
    const u = ai(o, t), h = await uo(o, t, u, at(u, t)), d = ho(o, h, t);
    let f = 0;
    for (let g = 0; g < o.length; g++)
      if (!(g < o.length - 1 && d[g])) {
        if (f === g)
          await _n(o[f], l[f], t, s, i), ii(c, f, s, i);
        else {
          const p = /* @__PURE__ */ new Map();
          for (let v = f; v <= g; v++) c.has(v) && p.set(v - f, c.get(v));
          await mo(o.slice(f, g + 1), l.slice(f, g + 1), t, s, i, p);
        }
        f = g + 1;
      }
    a = r + 1;
  }
  return { out: s, sources: i };
}
function yo(n, e) {
  return Object.keys(e.substitutions).length === 0 ? n : n.map((t) => {
    if (t.ssml) {
      const { ssml: o, plain: l, map: c } = ha(t.ssml, e.substitutions);
      if (o === t.ssml) return t;
      const u = { ...t, ssml: o };
      return Rn(u, { plain: l, map: c }), u;
    }
    const s = t.plain;
    if (!s) return t;
    const { text: i, map: a } = ca(s, e.substitutions);
    if (i === s) return t;
    const r = { ...t, plain: i };
    return Rn(r, { plain: s, map: a }), r;
  });
}
async function To(n, e = {}) {
  return (await ri(n, e)).utterances;
}
async function ri(n, e = {}) {
  const t = [], s = [], i = await Br(n, e);
  se(n, t, s, i, !1);
  const a = i.segmentation === "sentence" ? { out: t, sources: s } : await Xr(t, s, i), r = await vo(a.out, a.sources, i), o = r.out.map((c) => i.blockStarts.has(c)), l = Fr(r.out, r.sources, i);
  return { utterances: yo(l, i), sources: r.sources, blockStarts: o };
}
class Uo {
  engine;
  languages;
  contentQueue = [];
  // `contentQueue` as loaded, before `voice` stamped it — re-stamped when that changes.
  loadedQueue = [];
  loadedLanguages = [];
  events = new tt();
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
    this.engine = e, this._defaults = new kn(t.defaults), this._preferences = new Se(t.preferences), this._settings = new lt(this._preferences, this._defaults), this.contextualizationOverrides = t.contextualizationOverrides, this.segmentationOverrides = t.segmentationOverrides, this.languages = t.languages ?? [], this.setupEngineListeners(), this.applyEngineParameters(), this.notifiedVoice = this.spokenVoice(), this.initializeEngine();
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
    return (this.languages.length > 0 ? this.languages : this.contentLanguage ? [this.contentLanguage] : []).map((t) => Kt(t, this._settings.languageOverrides) ?? t);
  }
  // The voice for content in `language`: a single voice for all, else the record's exact tag, then its base language.
  voiceIdFor(e, t) {
    return typeof e == "string" ? e : e && t ? Pi(e, t) : void 0;
  }
  // The main language's voice prefers boundary events; the others match its boundary support.
  needsBoundary(e) {
    const [t] = this.spokenLanguages();
    if (!t || z(e) === z(t)) return !0;
    const s = this.pickedVoices.get(this.pickKey(t, !0)), i = this.voiceIdFor(this.settingsWith(s ? { [this.pickedVoiceKey(t, s)]: q(s) } : null).voice, t);
    return this.voices.find((r) => q(r) === i)?.controls?.boundary !== !1;
  }
  pickKey(e, t) {
    return `${z(e)}:${t}`;
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
      i = Xn(e, a, t).then((r) => {
        this.voices === a && this.pickedVoices.set(s, r);
      }).finally(() => this.pickingVoices.delete(s)), this.pickingVoices.set(s, i);
    }
    await i;
  }
  // Lists the engine's voices for the spoken languages and `languages`, and picks one for each, the main language first.
  async pickVoices(e = []) {
    const t = this.spokenLanguages(), s = [...new Set([...t, ...e].map((r) => z(r)).filter(Boolean))];
    let i = this.engine.getAvailableVoices(s, this.preferredVoiceIds());
    this.voiceListing = i;
    let a = await i;
    for (; i !== this.voiceListing; )
      i = this.voiceListing, a = await i;
    (a.length !== this.voices.length || a.some((r) => !this.voiceIds.has(q(r)))) && (this.voices = a, this.voiceIds = new Set(a.map((r) => q(r))), this.pickedVoices.clear(), this.pickingVoices.clear()), t[0] && await this.pickVoice(t[0]), await Promise.all(s.map((r) => this.pickVoice(r)));
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
    const t = this.voices.find((s) => q(s) === e) ?? this.voices.find((s) => s.name === e);
    return t && q(t);
  }
  // The voice picked for each spoken and loaded language.
  pickedVoiceRecord() {
    const e = {};
    for (const t of /* @__PURE__ */ new Set([...this.spokenLanguages(), ...this.loadedLanguages])) {
      const s = this.pickedVoice(t);
      s && (e[this.pickedVoiceKey(t, s)] ??= q(s));
    }
    return Object.keys(e).length > 0 ? e : null;
  }
  // A pick is for the language's region only when the voice is of it, else for its base language.
  pickedVoiceKey(e, t) {
    const [s, i] = O(e);
    return i && O(t.language)[1] === i ? e : Pe(s) === Pe(e) ? s : e;
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
      const { charIndex: t, charLength: s } = e.detail ?? {}, i = this.loadedQueue[this.getCurrentUtteranceIndex()], a = i && typeof t == "number" && typeof s == "number" ? rr(i, t, s) : void 0;
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
        const s = z(t.language);
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
    const { index: e, state: t } = this.resumeTarget(), s = this.contentSources, { utterances: i, sources: a, blockStarts: r } = await ri(this.source, {
      format: this._settings.format,
      interruptions: this._settings.interruptions,
      skip: this._settings.skip,
      contextualize: this._settings.contextualize,
      contextualization: {
        contextualizations: this.contextualizationOverrides?.contextualizations,
        shapes: sr(this._settings.verbosity, this.contextualizationOverrides?.shapes),
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
    const t = this._settings.segmentation, s = or(e, t);
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
    return new lt(
      this._preferences.merging(new Se({ voice: this.availableVoice(this._settings.voice) })),
      new kn({ ...this._defaults, voice: e })
    );
  }
  // Rebuilt, staged edits kept, once the spoken voices change, e.g. when they're picked after being read.
  get preferencesEditor() {
    const e = this.spokenVoice();
    return (this._preferencesEditor === null || !this.sameSettingValue(e, this.preferencesEditorVoice)) && (this._preferencesEditor = new Cn(this._preferencesEditor?.preferences ?? this._preferences, this.settings), this.preferencesEditorVoice = e), this._preferencesEditor;
  }
  async submitPreferences(e) {
    !this.source && this.contentQueue.length > 0 && wn.some((t) => e[t] !== void 0) && console.warn(
      "submitPreferences(): extraction-affecting preferences (format, interruptions, verbosity, skip, contextualize, language, languageOverrides, segmentation, reconstruct) have no effect on content loaded via loadContent() — use loadGndContent() to re-extract on submission."
    ), this._preferences = this._preferences.merging(e), await this.applyPreferences();
  }
  async applyPreferences() {
    const e = this._settings;
    if (this._settings = new lt(this._preferences, this._defaults), this.applyEngineParameters(), (!this.sameSettingValue(e.voice, this._settings.voice) || !this.sameSettingValue(e.languageOverrides, this._settings.languageOverrides)) && await this.pickVoices().catch(() => {
    }), this._preferencesEditor !== null && (this._preferencesEditor = new Cn(this._preferences, this.settings)), wn.some((t) => !this.sameSettingValue(this.extractionValue(e, t), this.extractionValue(this._settings, t))))
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
  Xa as BooleanPreference,
  Ce as EnumPreference,
  Po as FallbackEngineProvider,
  Wa as FallbackSpeechEngine,
  Mo as Locator,
  Bo as LocatorLocations,
  jo as LocatorText,
  de as Preference,
  ze as RangePreference,
  Za as ReadiumSpeechDecorationController,
  Uo as ReadiumSpeechNavigator,
  Lo as ReadiumSpeechProviderRegistry,
  kn as SpeechDefaults,
  Se as SpeechPreferences,
  Cn as SpeechPreferencesEditor,
  ys as SpeechServerAudioDecodeError,
  Ga as SpeechServerEngine,
  Io as SpeechServerEngineProvider,
  Le as SpeechServerError,
  Ss as SpeechServerNetworkError,
  vs as SpeechServerStallError,
  lt as SpeechSettings,
  En as StringArrayPreference,
  Sn as WebSpeechEngine,
  Ro as WebSpeechEngineProvider,
  A as WebSpeechVoiceManager,
  _t as autoPauseScopes,
  Ir as blockLevelRoles,
  cr as builtInSubstitutions,
  fr as builtInSuppressions,
  ve as chineseVariantMap,
  Kn as compareAlphabetically,
  qn as compareByPreferredRegion,
  nr as contextualizationShapesAtVerbosity,
  tr as contextualizedAtVerbosity,
  ye as createJsonOrderMap,
  Ja as createLocator,
  Vs as defaultContextualizations,
  O as extractLangRegionFromBCP47,
  To as extractUtterances,
  Ft as extractionFormats,
  wn as extractionPreferenceKeys,
  Jn as filterByBoundarySupport,
  xi as filterByLanguages,
  St as filterOutNoveltyVoices,
  bt as filterOutVeryLowQualityVoices,
  pt as getLanguageDisplayName,
  _e as getQualityValue,
  q as getVoiceId,
  et as groupVoicesByLanguage,
  Ar as interruptionRoles,
  ks as interruptionValues,
  vt as isNoveltyVoice,
  Ha as isRecoverableFailure,
  yt as isVeryLowQualityVoice,
  Dt as languageModes,
  Ge as pauseDurationRangeConfig,
  Qn as pickBestVoiceByRegion,
  Yn as pickDefaultVoice,
  Xn as pickLanguageVoice,
  qe as pitchRangeConfig,
  He as rateRangeConfig,
  rr as resolveBoundaryLocate,
  or as resolveUtteranceLocate,
  $t as segmentationModes,
  Ao as setupDecorations,
  Vo as shapeableRoles,
  Oo as skippableRoles,
  er as skippedAtVerbosity,
  mt as sortAlphabetically,
  Ii as sortByPreferredRegion,
  ue as sortByQuality,
  Wn as sortVoicesByRegions,
  Si as valueForLanguage,
  jt as verbosityPresets,
  Ke as volumeRangeConfig
};
