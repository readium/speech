import { DecorationController as Ai, DirectCommsChannel as Li, Decorator as Vi } from "@readium/decorator";
export * from "@readium/decorator";
import { LocatorText as Oi, LocatorLocations as Ti, Locator as xi } from "@readium/shared";
import { Locator as _r, LocatorLocations as $r, LocatorText as Gr } from "@readium/shared";
import { startsWithBindingPunct as me, ssmlTextEscape as B, BINDING_PUNCT_CLASS as ce, ssmlAttrEscape as kn } from "@readium/helpers";
import Ui from "i18next";
import { substitutedOwnSelector as Ni, isAriaSubstituted as K, decodeTextref as Dt, combineDomRangeTextrefs as zi } from "@readium/guided-navigation";
import { DomRange as Bi, DomRangePoint as Ft } from "@readium/shared/html";
const P = (n) => {
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
}, ji = (n, e) => {
  const t = e.toLowerCase().replace(/_/g, "-"), [i] = P(e), s = Object.entries(n);
  for (const a of [t, i]) {
    const r = s.find(([o]) => o.toLowerCase().replace(/_/g, "-") === a);
    if (r) return r[1];
  }
}, Cn = (n, e) => {
  const t = e.toLowerCase().replace(/_/g, "-"), [i] = P(e);
  let s;
  for (const a of [i, t])
    for (const [r, o] of Object.entries(n))
      r.toLowerCase().replace(/_/g, "-") === a && (s ??= /* @__PURE__ */ new Set(), o.forEach((l) => s.add(l)));
  return s && [...s];
}, te = {
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
  const e = (a) => {
    if (!/\w{2,3}-\w{2,3}/.test(a)) return a;
    const [r, o] = a.split("-");
    return `${r}-${o.toUpperCase()}`;
  }, t = n.toLowerCase().replace(/_/g, "-"), i = e(t), s = e(t.split("-").filter((a, r) => r === 0 || !/^[a-z]{4}$/.test(a)).join("-"));
  return te[i] || te[s] || i;
}, F = {
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
}, $e = /* @__PURE__ */ new Map(), Mi = /* @__PURE__ */ Object.assign({ "../../json/ar.json": () => import("./ar-BGKtJRyt.js"), "../../json/bg.json": () => import("./bg-D9Q1JriY.js"), "../../json/bho.json": () => import("./bho-CpuLBMN3.js"), "../../json/bn.json": () => import("./bn-Bpn_lzoe.js"), "../../json/ca.json": () => import("./ca-5hzouNcE.js"), "../../json/cmn.json": () => import("./cmn-DlnYMCd8.js"), "../../json/cs.json": () => import("./cs-CDpMkMNO.js"), "../../json/da.json": () => import("./da-XWCfWAwB.js"), "../../json/de.json": () => import("./de-DU0USiOh.js"), "../../json/el.json": () => import("./el-ClBwbIAW.js"), "../../json/en.json": () => import("./en-l3wcpTw3.js"), "../../json/es.json": () => import("./es-DwOFJY07.js"), "../../json/eu.json": () => import("./eu-DxWirHU-.js"), "../../json/fa.json": () => import("./fa-Ml9KtIw1.js"), "../../json/fi.json": () => import("./fi-Dk-5Fhhl.js"), "../../json/fr.json": () => import("./fr-MfhjukJ4.js"), "../../json/gl.json": () => import("./gl-DwtzWds9.js"), "../../json/he.json": () => import("./he-CfajFNE_.js"), "../../json/hi.json": () => import("./hi-pv2ttBoh.js"), "../../json/hr.json": () => import("./hr-MRApcEKR.js"), "../../json/hu.json": () => import("./hu-DGRDZdHH.js"), "../../json/id.json": () => import("./id-DZUuUiTG.js"), "../../json/it.json": () => import("./it-DJUYnjyj.js"), "../../json/ja.json": () => import("./ja-BpFcZRMu.js"), "../../json/kk.json": () => import("./kk-C480t1iH.js"), "../../json/kn.json": () => import("./kn-BVqs26qv.js"), "../../json/ko.json": () => import("./ko-TNoPZd6N.js"), "../../json/mr.json": () => import("./mr-DstAHTvT.js"), "../../json/ms.json": () => import("./ms-BceBSD-j.js"), "../../json/nb.json": () => import("./nb-CwPbwG-i.js"), "../../json/nl.json": () => import("./nl-BmW-Dmw5.js"), "../../json/pl.json": () => import("./pl-CH8qoDu8.js"), "../../json/pt.json": () => import("./pt-CjCENn24.js"), "../../json/ro.json": () => import("./ro-BlJN7qkA.js"), "../../json/ru.json": () => import("./ru-udzq1D5e.js"), "../../json/sk.json": () => import("./sk-VAEHsTWJ.js"), "../../json/sl.json": () => import("./sl-DaZQ1gp0.js"), "../../json/sv.json": () => import("./sv-CicHwXe4.js"), "../../json/ta.json": () => import("./ta-CvpRY89g.js"), "../../json/te.json": () => import("./te-D5TcdW9V.js"), "../../json/th.json": () => import("./th-CYakoFVa.js"), "../../json/tr.json": () => import("./tr-BfYrcAz7.js"), "../../json/uk.json": () => import("./uk-BVs6lQbX.js"), "../../json/vi.json": () => import("./vi-DP1xN9KL.js"), "../../json/wuu.json": () => import("./wuu-C6uQvT6g.js"), "../../json/yue.json": () => import("./yue-C8kEWdfv.js") });
async function Di(n) {
  try {
    const e = n.split("-")[0], t = Mi[`../../json/${e}.json`];
    if (!t)
      throw new Error(`No voice data found for language: ${n}`);
    const s = (await t()).default;
    return {
      ...s,
      voices: s.voices.map($i)
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
function _t(n) {
  return $e.has(n) || $e.set(n, Di(n)), $e.get(n);
}
const Fi = ["veryLow", "low", "normal", "high", "veryHigh"], _i = ["android", "apple"], $i = (n) => ({
  ...n,
  quality: n.quality?.filter((e) => Fi.includes(e)),
  localizedName: n.localizedName && _i.includes(n.localizedName) ? n.localizedName : void 0
}), Je = async (n) => {
  if (!n) return [];
  try {
    const e = L(n);
    try {
      const i = await _t(e);
      if (i?.voices?.length)
        return i.voices;
    } catch (i) {
      console.warn(`Failed to load voices for ${e}:`, i);
    }
    const [t] = P(e);
    if (t !== e)
      try {
        const i = await _t(t);
        if (i?.voices?.length)
          return i.voices;
      } catch (i) {
        console.warn(`Failed to load voices for base language ${t}:`, i);
      }
    return [];
  } catch (e) {
    return console.error(`Error in getVoices for ${n}:`, e), [];
  }
}, Ze = (n, e) => {
  try {
    return new Intl.DisplayNames(
      e ? [e] : [],
      { type: "language", languageDisplay: "standard" }
    ).of(n) || n.toUpperCase();
  } catch {
    return n.toUpperCase();
  }
}, $t = (n) => {
  if (!n) return "";
  try {
    const e = L(n), t = F[e];
    if (t?.testUtterance)
      return t.testUtterance;
    if (e in te) {
      const s = te[e];
      if (s && F[s]?.testUtterance)
        return F[s].testUtterance;
    }
    const [i] = P(e);
    return i !== e && F[i]?.testUtterance ? F[i].testUtterance : "";
  } catch (e) {
    return console.error(`Error in getTestUtterance for ${n}:`, e), "";
  }
}, Ne = (n) => {
  if (!n) return "";
  try {
    const e = L(n), t = F[e];
    if (t?.defaultRegion)
      return `${e}-${t.defaultRegion}`;
    if (e in te) {
      const s = te[e];
      if (s) {
        const a = F[s];
        if (a?.defaultRegion)
          return `${s}-${a.defaultRegion}`;
      }
    }
    const [i] = P(e);
    if (i !== e) {
      const s = F[i];
      if (s?.defaultRegion)
        return `${i}-${s.defaultRegion}`;
    }
    return "";
  } catch (e) {
    return console.error(`Failed to get default region for ${n}:`, e), "";
  }
}, ze = (n) => {
  if (!n?.length) return [];
  const e = /* @__PURE__ */ new Set(), t = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  for (const [s, a] of n.entries()) {
    if (!a) continue;
    const r = L(a), [o, l] = P(r);
    l && (e.add(l), i.has(l) || i.set(l, s)), t.has(o) || t.set(o, /* @__PURE__ */ new Set()), l && t.get(o).add(l);
  }
  return Array.from(t.entries()).map(([s, a]) => {
    const r = new Set(
      F[s]?.availableRegions || []
    ), o = Array.from(a), l = Array.from(e).filter(
      (u) => r.has(u) && !o.includes(u)
    ), c = Array.from(/* @__PURE__ */ new Set([...o, ...l])).sort((u, d) => {
      const h = i.get(u) ?? Number.MAX_SAFE_INTEGER, f = i.get(d) ?? Number.MAX_SAFE_INTEGER;
      return h - f;
    });
    if (c.length === 0) {
      const u = Ne(s), [, d] = P(u);
      d && c.push(d);
    }
    return {
      baseLang: s,
      regions: c
    };
  });
}, ne = async (n) => {
  const e = /* @__PURE__ */ new Map();
  for (const i of n) {
    if (i.source !== "json") continue;
    const [s] = P(i.language);
    e.has(s) || e.set(s, []), e.get(s).push(i);
  }
  const t = /* @__PURE__ */ new Map();
  for (const [i, s] of e.entries()) {
    const a = /* @__PURE__ */ new Map(), r = await Je(i), o = /* @__PURE__ */ new Map();
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
}, Gi = {
  veryLow: 1,
  low: 2,
  normal: 3,
  high: 4,
  veryHigh: 5
}, Ee = (n) => n ? Gi[n] ?? 0 : 0, J = (n, e, t, i) => {
  const s = Ee(n.quality), a = Ee(e.quality);
  if (t && i && n.source === "json" && e.source === "json") {
    const r = t.get(i);
    if (r) {
      const o = r.get(n.name), l = r.get(e.name);
      if (o !== void 0 && l !== void 0)
        return o - l;
    }
  }
  return a !== s ? a - s : n.name.localeCompare(e.name);
}, Be = (n, e) => {
  const t = new Map(e.map((a) => [a.baseLang, a])), i = /* @__PURE__ */ new Map(), s = [];
  for (const a of n) {
    const [r] = P(a.language);
    t.get(r) ? (i.has(r) || i.set(r, []), i.get(r).push(a)) : s.push(a);
  }
  return { voicesByLang: i, otherLangVoices: s };
}, En = (n, e, t, i) => {
  const [, s] = P(n.language), [, a] = P(e.language), r = s && t.regions.includes(s), o = a && t.regions.includes(a);
  if (r && o) {
    const h = t.regions.indexOf(s), f = t.regions.indexOf(a);
    return h === f ? J(n, e, i, t.baseLang) : h - f;
  }
  if (r) return -1;
  if (o) return 1;
  const l = Ne(t.baseLang), [, c] = P(l), u = !!c && s === c, d = !!c && a === c;
  if (u && !d) return -1;
  if (!u && d) return 1;
  if (s && a) {
    const h = s.localeCompare(a);
    return h !== 0 ? h : J(n, e, i, t.baseLang);
  }
  return s ? -1 : a ? 1 : J(n, e, i, t.baseLang);
}, qi = async (n, e, t) => {
  const i = t ?? await ne(n);
  n.sort((s, a) => En(s, a, e, i));
}, Rn = (n, e, t) => {
  const [i] = P(n.language), [s] = P(e.language), a = Ze(i).toLowerCase(), r = Ze(s).toLowerCase(), o = a.localeCompare(r);
  if (o !== 0)
    return o;
  if (i === s) {
    const l = Ne(i), [, c] = P(n.language), [, u] = P(e.language), d = l && c === l.split("-")[1], h = l && u === l.split("-")[1];
    if (d && !h) return -1;
    if (!d && h) return 1;
    if (c && u) {
      const f = c.localeCompare(u);
      if (f !== 0)
        return f;
    }
    return c && !u ? -1 : !c && u ? 1 : J(n, e, t, i);
  }
  return J(n, e, t, i);
}, Xe = async (n, e) => {
  const t = e ?? await ne(n);
  n.sort((i, s) => Rn(i, s, t));
}, In = async (n, e) => {
  if (!e?.length) return [];
  const t = ze(n || []), { voicesByLang: i, otherLangVoices: s } = Be(e, t), a = await ne(e), r = [];
  for (const o of t) {
    const l = i.get(o.baseLang);
    l && (await qi(l, o, a), r.push(...l));
  }
  return await Xe(s, a), r.push(...s), r;
}, Pn = async (n, e) => {
  if (!e.length) return null;
  const [t] = ze([n]), { voicesByLang: i, otherLangVoices: s } = Be(e, [t]), a = i.get(t.baseLang), r = a?.length ? a : s, o = await ne(e), l = a?.length ? (c, u) => En(c, u, t, o) : (c, u) => Rn(c, u, o);
  return r.reduce((c, u) => l(u, c) < 0 ? u : c);
}, An = (n, e) => {
  const t = n.filter((i) => i.controls?.boundary !== !1 === e);
  return t.length > 0 ? t : n;
}, de = (n) => L(n).split("-")[0], Hi = (n, e) => {
  const t = Object.entries(n).map(([i, s]) => [L(i), s]);
  for (const i of [L(e), de(e)]) {
    const s = t.find(([a]) => a === i);
    if (s) return s[1];
  }
}, Ki = [{ name: "Albert", nativeID: ["com.apple.speech.synthesis.voice.Albert"], note: "This novelty voice is part of a pack preloaded by Apple.", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Bad News", nativeID: ["com.apple.speech.synthesis.voice.BadNews"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Mauvaises nouvelles", "Malas noticias", "Brutte notizie"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Bahh", nativeID: ["com.apple.speech.synthesis.voice.Bahh"], note: "This novelty voice is part of a pack preloaded by Apple.", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Bells", nativeID: ["com.apple.speech.synthesis.voice.Bells"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Cloches", "Campanas", "Campane"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Boing", nativeID: ["com.apple.speech.synthesis.voice.Boing"], note: "This novelty voice is part of a pack preloaded by Apple.", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Bubbles", nativeID: ["com.apple.speech.synthesis.voice.Bubbles"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Bulles", "Burbujas", "Bollicine"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Cellos", nativeID: ["com.apple.speech.synthesis.voice.Cellos"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Violoncelles", "Violonchelos", "Violoncelli"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Good News", nativeID: ["com.apple.speech.synthesis.voice.GoodNews"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Bonnes nouvelles", "Buenas noticias", "Buone notizie"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Jester", nativeID: ["com.apple.speech.synthesis.voice.Hysterical"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Bouffon", "Bufón", "Giullare"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Organ", nativeID: ["com.apple.speech.synthesis.voice.Organ"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Orgue", "Órgano", "Organo"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Superstar", nativeID: ["com.apple.speech.synthesis.voice.Princess"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Superestrella"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Trinoids", nativeID: ["com.apple.speech.synthesis.voice.Trinoids"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Trinoïdes"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Whisper", nativeID: ["com.apple.speech.synthesis.voice.Whisper"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Murmure", "Susurro", "Sussurro"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Wobble", nativeID: ["com.apple.speech.synthesis.voice.Deranged"], note: "This novelty voice is part of a pack preloaded by Apple.", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Zarvox", nativeID: ["com.apple.speech.synthesis.voice.Zarvox"], note: "This novelty voice is part of a pack preloaded by Apple.", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }], Qi = {
  voices: Ki
}, Wi = [{ name: "Eddy", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Flo", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Grandma", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Grandpa", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Jacques", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Reed", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Rocko", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Sandy", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Shelley", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Fred", language: "en-US", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Junior", language: "en-US", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Kathy", language: "en-US", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Ralph", language: "en-US", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "eSpeak Arabic", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ar", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Bulgarian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "bg", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Bengali", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "bn", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Catalan", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ca", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Chinese (Mandarin, latin as English)", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "cmn", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Czech", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "cs", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Danish", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "da", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak German", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "de", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Greek", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "el", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Spanish (Spain)", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "es", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Estonian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "et", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Finnish", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "fi", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Gujarati", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "gu", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Croatian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "hr", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Hungarian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "hu", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Indonesian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "id", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Italian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "it", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Kannada", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "kn", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Korean", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ko", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Lithuanian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "lt", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Latvian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "lv", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Malayalm", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ml", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Marathi", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "mr", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Malay", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ms", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Norwegian Bokmål", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "nb", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Polish", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "pl", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Portuguese (Brazil)", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "pt-br", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Romanian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ro", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Russian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ru", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Slovak", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "sk", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Slovenian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "sl", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Serbian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "sv", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Swedish", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "sv", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Swahili", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "sw", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Tamil", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ta", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Telugu", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "te", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Turkish", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "tr", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Vietnamese (Northern)", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "vi", os: ["ChromeOS"], preloaded: !0 }], Ji = {
  voices: Wi
}, Zi = Qi, Xi = Ji, Ye = (n, e) => Zi.voices.some(
  (t) => n.includes(t.name) || e && t.nativeID?.some((i) => e.includes(i)) || t.altNames?.some((i) => n.includes(i))
), et = (n, e) => Xi.voices.some(
  (t) => n.includes(t.name)
) || e === "veryLow", tt = (n) => n?.length ? n.filter((e) => !(e.isNovelty || Ye(e.name, e.voiceURI))) : [], nt = (n) => n?.length ? n.filter((e) => !et(e.name, e.quality)) : [], Yi = (n, e) => {
  const t = (Array.isArray(e) ? e : [e]).map(de);
  return n.filter((i) => [i.language, i.altLanguage].some((s) => !!s && t.includes(de(s))));
}, es = { ar: { normal: "محسن", high: "استثنائي" }, ca: { normal: "millorada", high: "prèmium" }, "cmn-CN": { normal: "优化音质", high: "高音质" }, "cmn-TW": { normal: "增強音質", high: "高音質" }, cs: { normal: "vylepšená verze", high: "prémiový" }, da: { normal: "forbedret", high: "høj kvalitet" }, de: { normal: "erweitert", high: "premium" }, el: { normal: "βελτιωμένη", high: "υψηλής ποιότητας" }, en: { normal: "Enhanced", high: "Premium" }, es: { normal: "mejorada", high: "premium" }, fi: { normal: "parannettu", high: "korkealaatuinen" }, fr: { normal: "premium", high: "de qualité" }, he: { normal: "משופר", high: "פרימיום" }, hi: { normal: "बेहतर", high: "प्रीमियम" }, hr: { normal: "poboljšani", high: "vrhunski" }, hu: { normal: "továbbfejlesztett", high: "prémium" }, id: { normal: "Ditingkatkan", high: "Premium" }, it: { normal: "ottimizzata", high: "premium" }, ja: { normal: "拡張", high: "プレミアム" }, ko: { normal: "고품질", high: "프리미엄" }, ms: { normal: "Dipertingkat", high: "Premium" }, nb: { normal: "forbedret", high: "premium" }, nl: { normal: "verbeterd", high: "premium" }, pl: { normal: "rozszerzony", high: "premium" }, pt: { normal: "melhorada", high: "premium" }, ro: { normal: "îmbunătățită", high: "premium" }, ru: { normal: "улучшенный", high: "высшее качество" }, sk: { normal: "vylepšený", high: "prémiový" }, sl: { normal: "izboljšano", high: "prvovrsten" }, sv: { normal: "förbättrad", high: "premium" }, th: { normal: "คุณภาพสูง", high: "คุณภาพสูง" }, tr: { normal: "Geliştirilmiş", high: "Yüksek Kaliteli" }, uk: { normal: "вдосконалений", high: "високої якості" }, vi: { normal: "Nâng cao", high: "Cao cấp" } }, ts = {
  quality: es
}, it = {
  apple: ts.quality
  // android: androidQualities.quality
}, ns = (n, e, t) => {
  if (!n) return;
  const i = Array.isArray(t) ? t : t ? [t] : [];
  for (const s of i)
    if (s && it[s]) {
      const a = it[s], r = P(e)[0], o = a[e] || a[r];
      if (o) {
        const l = n.toLowerCase(), { normal: c, high: u } = o;
        if (u && l.includes(u.toLowerCase()))
          return "high";
        if (c && l.includes(c.toLowerCase()))
          return "normal";
      }
    }
}, is = (n, e) => {
  const t = it[e];
  if (t)
    for (const [i, { high: s, normal: a }] of Object.entries(t)) {
      const r = s && n.some((l) => l.includes(s)), o = a && n.some((l) => l.includes(a));
      if (r && o)
        return i;
    }
}, ss = {
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
}, Gt = (n) => {
  if (!n) return;
  const t = n.toLowerCase().split(/[._-]/);
  for (const i of Object.values(ss))
    if (i.values.some((s) => t.includes(s)))
      return i.quality;
};
function as(n, e) {
  if (n.name === n.originalName) return n;
  if (e.name === e.originalName) return e;
  const t = [n.originalName, ...n.altNames || []], i = [e.originalName, ...e.altNames || []], s = t.findIndex((r) => i.includes(r)), a = i.findIndex((r) => t.includes(r));
  return s === -1 && a === -1 || s !== -1 && (a === -1 || s <= a) ? n : e;
}
function rs(n, e) {
  if (!n.altNames && !e.altNames)
    return !1;
  const t = n.originalName, i = e.originalName, s = n.altNames || [], a = e.altNames || [];
  return a.includes(t) || s.includes(i) ? !0 : s.filter((o) => a.includes(o)).length > 0;
}
const Ln = () => {
  const e = typeof window < "u" && (window.navigator || {}).userAgent || "", t = () => /android/i.test(e), i = () => /kaios/i.test(e), s = () => typeof window.InstallTrigger < "u" ? !0 : /firefox/i.test(e), a = () => /AppleWebKit/i.test(e) && !/Chrome|Chromium|Edg\/|OPR|Android/i.test(e);
  return {
    isAndroid: t(),
    isFirefox: s() || i(),
    isSafari: a(),
    isKaiOS: i()
  };
};
class I {
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
    this.systemLocale = navigator.languages?.[0]?.split("-")[0] || "en", this.isAndroid = Ln().isAndroid;
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
    if (I.instance?.isInitialized) {
      const t = I.instance;
      return e?.languages && e.languages.length > 0 && await t.broadenLanguages(e.languages), t;
    }
    return I.initializationPromise || (I.initializationPromise = (async () => {
      try {
        const t = new I();
        I.instance = t, t.browserVoices = await t.getBrowserVoices(e?.maxTimeout, e?.interval), t.updateSystemLocale(t.browserVoices);
        let i = t.browserVoices;
        return e?.languages && e.languages.length > 0 ? (i = t.filterBrowserVoicesByLanguages(t.browserVoices, e.languages), t.scopedLanguages = I.toBaseLangSet(e.languages)) : t.scopedLanguages = null, t.voices = await t.parseToReadiumSpeechVoices(i), t.isInitialized = !0, t;
      } catch (t) {
        throw I.initializationPromise = null, console.error("Failed to initialize WebSpeechVoiceManager:", t), t;
      }
    })()), I.initializationPromise;
  }
  /**
   * Filter browser voices based on preferred languages
   * @private
   */
  filterBrowserVoicesByLanguages(e, t) {
    if (!t?.length) return e;
    const i = I.toBaseLangSet(t);
    return e.filter((s) => {
      if (!s?.lang) return !1;
      const a = L(s.lang), [r] = I.extractLangRegionFromBCP47(a);
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
        const i = L(t), [s] = I.extractLangRegionFromBCP47(i);
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
    const i = [...I.toBaseLangSet(e)].filter((o) => !this.scopedLanguages.has(o));
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
    return P(e);
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
    const t = e.map((s) => s.name), i = is(t, "apple");
    i && (this.systemLocale = i);
  }
  /**
   * Infer voice quality based on package, platform, JSON, or duplicate count
   * Returns null if quality cannot be determined
   * @private
   */
  inferVoiceQuality(e, t, i) {
    const s = e.voiceURI ? Gt(e.voiceURI) : void 0;
    if (s) return s;
    if (t?.nativeID && Array.isArray(t.nativeID))
      for (const a of t.nativeID) {
        const r = Gt(a);
        if (r) return r;
      }
    if (t?.localizedName && e.voiceURI && e.lang) {
      const a = ns(
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
      else if (rs(i, a)) {
        const r = as(i, a);
        t.set(s, r);
      } else {
        const r = Ee(a.quality);
        Ee(i.quality) >= r && t.set(s, i);
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
    const t = $t(e);
    if (t) return t;
    const [i] = I.extractLangRegionFromBCP47(e);
    if (i && i !== e) {
      const s = $t(i);
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
      const a = L(s).split("-")[0];
      i.set(a, (i.get(a) ?? 0) + 1);
    }
    return [...i].map(([s, a]) => ({ code: s, label: Ze(s, t), count: a }));
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
      const [, u] = I.extractLangRegionFromBCP47(c.language);
      u && l.set(u, (l.get(u) || 0) + 1);
    }
    for (const c of a) {
      const [, u] = I.extractLangRegionFromBCP47(c.language);
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
          const d = i();
          if (Array.isArray(d) && d.length) return a(d);
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
        const a = L(s.lang), [r] = I.extractLangRegionFromBCP47(a), o = this.normalizeVoiceName(s.name), l = `${s.lang.toLowerCase()}_${o}`, c = t.get(l) || 1;
        let u = await Je(a);
        (!u || u.length === 0) && (u = await Je(r));
        const d = this.findMatchingJsonVoice(u, o), h = this.inferVoiceQuality(s, d, c), f = this.isAndroid || !d ? { ...d?.controls, boundary: !1 } : d?.controls;
        return d ? {
          ...d,
          label: d.label ?? this.cleanVoiceName(s.name),
          source: "json",
          originalName: s.name,
          ...f && { controls: f },
          language: d.language ?? a,
          voiceURI: s.voiceURI,
          quality: h,
          isDefault: s.default || !1,
          offlineAvailability: s.localService || !1,
          isNovelty: Ye(s.name, s.voiceURI),
          isLowQuality: et(s.name, h)
        } : {
          source: "browser",
          label: this.cleanVoiceName(s.name),
          name: s.name,
          originalName: s.name,
          ...f && { controls: f },
          language: a,
          voiceURI: s.voiceURI,
          quality: h,
          isDefault: s.default || !1,
          offlineAvailability: s.localService || !1,
          isNovelty: Ye(s.name, s.voiceURI),
          isLowQuality: et(s.name, h)
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
    if (s.languages && (i = Yi(i, s.languages)), s.source && (i = i.filter((a) => a.source === s.source)), s.gender && (i = i.filter((a) => a.gender === s.gender)), s.quality) {
      const a = Array.isArray(s.quality) ? s.quality : [s.quality];
      i = i.filter((r) => r.quality && a.includes(r.quality));
    }
    return s.offlineOnly && (i = i.filter((a) => a.offlineAvailability === !0)), s.provider && (i = i.filter(
      (a) => a.provider?.toLowerCase() === s.provider?.toLowerCase()
    )), s.excludeNovelty && (i = tt(i)), s.excludeVeryLowQuality && (i = nt(i)), s.removeDuplicates && (i = this.removeDuplicates(i)), i;
  }
  /**
   * Filter out novelty voices
   * @param voices Array of voices to filter
   * @returns Filtered array with novelty voices removed
   */
  filterOutNoveltyVoices(e) {
    const t = e ?? this.voices;
    return tt(t);
  }
  /**
   * Filter out very low quality voices
   * @param voices Array of voices to filter
   * @returns Filtered array with very low quality voices removed
   */
  filterOutVeryLowQualityVoices(e) {
    const t = e ?? this.voices;
    return nt(t);
  }
  /**
   * Sort voices by quality, respecting JSON name order, then alphabetically for undefined/null quality
   * @param voices Array of voices to sort
   * @returns Sorted array of voices
   */
  async sortVoicesByQuality(e) {
    const t = e || this.voices;
    if (!t?.length) return [];
    const i = await ne(t);
    return [...t].sort((s, a) => J(s, a, i));
  }
  /**
   * Sort regions by default then alphabetically, sort voices by quality
   */
  static async sortByDefaultRegion(e, t) {
    const i = await ne(e), s = Ne(t);
    e.sort((a, r) => {
      const [, o] = I.extractLangRegionFromBCP47(a.language), [, l] = I.extractLangRegionFromBCP47(r.language), c = s && o === s.split("-")[1], u = s && l === s.split("-")[1];
      return c && !u ? -1 : !c && u ? 1 : J(a, r, i, t);
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
      return await Xe(l), l;
    }
    const s = ze(e), { voicesByLang: a, otherLangVoices: r } = Be(i, s), o = [];
    for (const l of s) {
      const c = a.get(l.baseLang);
      c && (await I.sortByDefaultRegion(c, l.baseLang), o.push(...c));
    }
    return await Xe(r), o.push(...r), o;
  }
  /**
   * Sort voices by region preference, then alphabetically
   * @param voices Array of voices to sort
   * @param preferredLanguages Array of preferred language codes in order of preference
   * @returns Sorted array of voices
   */
  async sortVoicesByRegions(e, t) {
    return In(e, t || this.voices);
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
          r = I.extractLangRegionFromBCP47(a.language)[0];
          break;
        case "gender":
          r = a.gender || "unknown";
          break;
        case "quality":
          r = a.quality || "unknown";
          break;
        case "region":
          const [, o] = I.extractLangRegionFromBCP47(a.language);
          r = o || "unknown";
          break;
      }
      i[r] || (i[r] = []), i[r].push(a);
    }
    return i;
  }
}
const Vn = async (n, e, t = !0) => {
  const i = (r) => P(L(r))[0], s = i(n), a = nt(tt(e)).filter((r) => i(r.language) === s);
  return a.length === 0 ? null : Pn(n, An(a, t));
}, On = async (n, e) => {
  n?.length || (n = typeof navigator < "u" && navigator.languages?.length ? [...navigator.languages] : ["en"]);
  for (const t of n) {
    const i = await Vn(t, e);
    if (i) return i;
  }
  return (await In(n, e))[0] ?? null;
}, D = (n) => n.voiceURI ?? n.identifier ?? n.name, os = ["webKit", "moz", "ms", "o"], ls = [
  "boundary",
  "end",
  "error",
  "mark",
  "pause",
  "resume",
  "start"
], cs = (n) => `${n.charAt(0).toUpperCase()}${n.slice(1)}`, oe = (n = {}, e) => Object.hasOwnProperty.call(n, e) || e in n || !!n[e], us = (n) => typeof window < "u" && n in window, hs = (n) => {
  const e = cs(n), t = os.map((s) => `${s}${e}`), i = [n, e].concat(t).find(us);
  return i && typeof window < "u" ? window[i] : void 0;
}, ds = () => {
  const n = {};
  [
    "speechSynthesis",
    "speechSynthesisUtterance",
    "speechSynthesisVoice",
    "speechSynthesisEvent",
    "speechSynthesisErrorEvent"
  ].forEach((t) => {
    n[t] = hs(t);
  }), n.onvoiceschanged = oe(n.speechSynthesis, "onvoiceschanged"), n.speechSynthesisSpeaking = oe(n.speechSynthesis, "speaking"), n.speechSynthesisPaused = oe(n.speechSynthesis, "paused");
  const e = n.speechSynthesisUtterance ? oe(n.speechSynthesisUtterance, "prototype") : !1;
  return ls.forEach((t) => {
    const i = `on${t}`;
    n[i] = e && n.speechSynthesisUtterance ? oe(n.speechSynthesisUtterance.prototype, i) : !1;
  }), n;
};
class je {
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
const Ce = (n, e) => Math.min(Math.max(n, 0), Math.max(e - 1, 0));
function Z(n, e, t, i) {
  return Number.isFinite(n) ? Math.max(e, Math.min(t, n)) : i;
}
const Re = "\\p{Ps}\\p{Pi}¿¡", gs = new RegExp(`^[${Re}]`, "u"), fs = new RegExp(`[${Re}]$`, "u"), ps = new RegExp("^\\p{P}$", "u");
function ms(n) {
  return gs.test(n);
}
function vs(n) {
  return fs.test(n);
}
function ys(n) {
  return ps.test(n);
}
function Tn(n) {
  return n.replace(/[<>]/g, "​");
}
function Ss(n) {
  return n.replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&nbsp;/g, " ").replace(/&#(\d+);/g, (e, t) => String.fromCodePoint(Number(t))).replace(/&#x([0-9a-fA-F]+);/g, (e, t) => String.fromCodePoint(parseInt(t, 16)));
}
const bs = /\s*<readium:[a-zA-Z][\w-]*\s+id="[^"]*"\s*\/>\s*/g;
function ws(n) {
  return n.replace(bs, (t, i, s) => {
    const a = s.slice(i + t.length);
    return a.length === 0 || me(a) ? "" : " ";
  }).replace(/ {2,}/g, " ").trim();
}
function ks(n) {
  return n.includes("<");
}
function Me(n) {
  if (n === void 0) return;
  const e = {};
  if (n.language !== void 0 && (e.language = n.language), n.ssml) {
    const t = ws(n.ssml);
    ks(t) && (e.ssml = t);
  }
  return n.plain && (e.plain = n.plain), e.plain || e.ssml ? e : void 0;
}
function x(n) {
  return xn(n).plain;
}
function xn(n) {
  let e = "";
  const t = [];
  let i = !1, s = 0;
  for (; s < n.length; ) {
    const o = n[s];
    if (o === "<") {
      const c = n.indexOf(">", s), u = c === -1 ? "" : n.slice(c + 1);
      s = c === -1 ? n.length : c + 1, !i && e.length > 0 && u.length > 0 && !me(u) && (e += " ", t.push(s), i = !0);
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
function qt(n, e) {
  let t = 0, i = n.length;
  for (; t < i; ) {
    const s = t + i >> 1;
    n[s] < e ? t = s + 1 : i = s;
  }
  return t;
}
const Ht = /* @__PURE__ */ new WeakMap();
function Cs(n) {
  return n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function Es(n) {
  const e = Cs(n), t = /\w/.test(n[0]) ? "(?<!\\w)" : "", i = /\w/.test(n[n.length - 1]) ? "(?!\\w)" : "";
  return `${t}${e}${i}`;
}
function Rs(n, e) {
  if (typeof e == "string")
    return { regex: new RegExp(Es(n), "g"), replace: e };
  const t = e.pattern.flags.includes("g") ? e.pattern.flags : `${e.pattern.flags}g`;
  return { regex: new RegExp(e.pattern.source, t), replace: e.replace };
}
function Is(n) {
  let e = Ht.get(n);
  return e || (e = Object.entries(n).map(([t, i]) => Rs(t, i)), Ht.set(n, e)), e;
}
function Un(n, e) {
  const t = [];
  for (const a of Is(e))
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
function Ps(n, e) {
  let t = "";
  const i = [];
  let s = 0;
  for (const a of Un(n, e)) {
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
function Kt(n, e) {
  return n.length ? e <= 0 ? n[0] : e >= n.length ? n[n.length - 1] + 1 : n[e] : e;
}
const As = /<([a-zA-Z][\w-]*)([^>]*)>([\s\S]*?)<\/\1>|<[a-zA-Z][\w-]*\b[^>]*\/>|[^<]+/g;
function Ie(n) {
  return n.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
}
function Nn(n) {
  const e = [];
  for (const t of n.matchAll(As))
    t[1] !== void 0 ? e.push({ kind: "paired", raw: t[0], tag: t[1], attrs: t[2], innerText: Ie(t[3]) }) : t[0][0] === "<" ? e.push({ kind: "selfClosing", raw: t[0] }) : e.push({ kind: "text", raw: t[0], text: Ie(t[0]) });
  return e;
}
function Ls(n, e) {
  const t = Nn(n);
  let i = "", s = !1;
  const a = [], r = t.map(() => []);
  t.forEach((b, k) => {
    if (b.kind === "selfClosing") return;
    const w = b.kind === "paired" ? b.innerText : b.text;
    if (!s && i.length > 0 && w.length > 0 && !me(w) && !/^\s/.test(w)) {
      const R = i.length;
      i += " ", r[k].push(a.length), a.push({ start: R, end: R + 1, atomIndex: -1 }), s = !0;
    }
    const E = i.length;
    i += w, r[k].push(a.length), a.push({ start: E, end: i.length, atomIndex: k }), w.length > 0 && (s = /\s$/.test(w));
  });
  const o = Un(i, e);
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
      let R = E.start;
      for (; R < E.end; ) {
        const A = f < o.length ? o[f] : void 0;
        if (A && A.start <= R && A.end > R) {
          const N = A.start === R, ae = A.end > E.end;
          if (N) {
            c += A.replacement;
            for (let M = 0; M < A.replacement.length; M++) u.push(A.start);
            E.atomIndex === -1 || ae ? (p(), l += B(A.replacement)) : (d !== E.atomIndex && (p(), d = E.atomIndex), h += B(A.replacement));
          }
          R = Math.min(A.end, E.end), A.end <= E.end && f++;
          continue;
        }
        const V = A ? Math.min(A.start, E.end) : E.end, Q = i.slice(R, V);
        c += Q;
        for (let N = 0; N < Q.length; N++) u.push(R + N);
        E.atomIndex === -1 ? (p(), l += B(Q)) : (d !== E.atomIndex && (p(), d = E.atomIndex), h += B(Q)), R = V;
      }
    }
  }
  p();
  let g = 0;
  for (; g < i.length && /\s/.test(i[g]); ) g++;
  let v = i.length;
  for (; v > g && /\s/.test(i[v - 1]); ) v--;
  let S = 0;
  for (; S < c.length && /\s/.test(c[S]); ) S++;
  let m = c.length;
  for (; m > S && /\s/.test(c[m - 1]); ) m--;
  const C = i.slice(g, v), y = u.slice(S, m).map((b) => Math.min(Math.max(b - g, 0), Math.max(C.length - 1, 0)));
  return { ssml: l, plain: C, map: y };
}
const zn = /<lang xml:lang="([^"]*)">([\s\S]*?)<\/lang>/g;
function Bn(n) {
  return new RegExp(zn).test(n);
}
function Qt(n) {
  return n.replace(/<[^>]+>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/ {2,}/g, " ");
}
const Vs = new RegExp(
  `\\s+|[${Re}]+|[${ce}]+|[^\\s${Re}${ce}]+`,
  "gu"
);
function Ge(n) {
  const e = [];
  for (const [t] of n.matchAll(Vs))
    /^\s/.test(t) ? e.push({ kind: "space" }) : ms(t) ? e.push({ kind: "open", text: t }) : me(t) ? e.push({ kind: "close", text: t }) : e.push({ kind: "word", text: t });
  return e;
}
function Os(n) {
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
function Ts(n) {
  let e = n.length;
  for (; e > 0 && (n[e - 1].kind === "space" || n[e - 1].kind === "open"); ) e--;
  return n.slice(e).some((t) => t.kind === "open") ? n.splice(e) : [];
}
function xs(n) {
  let e = 0;
  for (; e < n.length && (n[e].kind === "space" || n[e].kind === "close"); ) e++;
  return n.slice(0, e).some((t) => t.kind === "close") ? n.splice(0, e) : [];
}
function gt(n, e) {
  const t = [];
  let i = 0;
  for (const r of n.matchAll(zn))
    t.push({
      tokens: Ge(Qt(n.slice(i, r.index))),
      language: e,
      tagged: !1
    }), t.push({ tokens: Ge(x(r[2])), language: r[1], tagged: !0 }), i = r.index + r[0].length;
  t.push({
    tokens: Ge(Qt(n.slice(i))),
    language: e,
    tagged: !1
  });
  for (let r = 0; r < t.length - 1; r++)
    !t[r].tagged && t[r + 1].tagged ? t[r + 1].tokens.unshift(...Ts(t[r].tokens)) : t[r].tagged && !t[r + 1].tagged && t[r].tokens.push(...xs(t[r + 1].tokens));
  const s = [];
  let a = 0;
  for (const r of t) {
    const o = Os(r.tokens);
    o && (s.push({ plain: o, language: r.language, start: a, end: a + o.length }), a += o.length);
  }
  return s;
}
const Us = /<readium:[a-zA-Z][\w-]*\s+id="([^"]*)"\s*\/>/g, Ns = /(<lang\b[^>]*>)<sub\s+alias="([^"]*)"\s*>([\s\S]*?)<\/sub><\/lang>|<sub\s+alias="([^"]*)"\s*>([\s\S]*?)<\/sub>/, jn = new RegExp(`${Us.source}|${Ns.source}`, "g"), zs = /[\p{L}\p{N}\p{Pd}]+$/u, Bs = /^[\p{L}\p{N}\p{Pd}]+/u;
function js(n) {
  return Ie(n.replace(/&quot;/g, '"').replace(/&apos;/g, "'"));
}
function Ms(n) {
  return new RegExp(jn).test(n);
}
function Ds(n) {
  const e = [];
  let t = 0;
  for (const s of n.matchAll(jn)) {
    const a = s[1] === void 0, r = s.index + s[0].length, o = a ? n.slice(t, s.index).match(zs)?.[0] ?? "" : "", l = a ? n.slice(r).match(Bs)?.[0] ?? "" : "", c = n.slice(t, s.index - o.length).trim();
    if (c && e.push({ ssml: c }), !a)
      e.push({ placeholderId: s[1] });
    else {
      const u = s[2], d = s[3] ?? s[5], h = s[4] ?? s[6], f = (v) => u ? `${u}${v}</lang>` : v, p = (v) => f(`${o}${v}${l}`);
      e.push({ ssml: p(h), abbreviation: "text" });
      const g = B(js(d));
      e.push({
        ssml: p(g),
        abbreviation: "alias",
        abbreviationText: p(h),
        parenthesizedSsml: f(`(${g})`)
      });
    }
    t = r + l.length;
  }
  const i = n.slice(t).trim();
  return i && e.push({ ssml: i }), e;
}
const Fs = 250;
class Wt {
  speechSynthesis;
  speechSynthesisUtterance;
  currentVoice = null;
  // The voice of the utterance being spoken, reported in its "start" event.
  speakingVoice = null;
  currentUtterances = [];
  currentUtteranceIndex = 0;
  playbackState = "idle";
  events = new je();
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
    if (this.features = ds(), this.patches = Ln(), !this.features.speechSynthesis || !this.features.speechSynthesisUtterance)
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
    const { languages: t, maxTimeout: i, interval: s, maxLengthExceeded: a = "warn" } = e;
    this.maxLengthExceeded = a;
    try {
      return this.voiceManager = await I.initialize({
        languages: t,
        maxTimeout: i,
        interval: s
      }), this.defaultVoice = await On(t, this.voices), this.initialized = !0, !0;
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
  // By `voiceURI`, as voices of one `name` can differ in quality or language.
  findVoice(e) {
    const t = this.voices;
    return t.find((i) => i.voiceURI === e) ?? t.find((i) => i.name === e);
  }
  ownVoice(e) {
    return e.voice ? this.findVoice(e.voice) : void 0;
  }
  // The language of a voice the browser has, whether or not the manager has loaded it.
  browserVoiceLanguage(e) {
    const t = this.speechSynthesis.getVoices();
    return (t.find((i) => i.voiceURI === e) ?? t.find((i) => i.name === e))?.lang;
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
    return t && (await I.initialize({ languages: [t] }), this.loadedOwnVoiceLanguages.add(t)), this.ownVoice(e) ?? this.getCurrentVoice();
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
      plain: t.plain ?? (t.ssml ? x(Ss(t.ssml)) : "")
    }));
  }
  // Queue Management
  loadUtterances(e, t) {
    this.currentUtterances = this.toPlainText(e), this.currentUtteranceIndex = Ce(t ?? 0, e.length), this.playbackState = "ready", this.emitEvent({ type: "ready" });
  }
  // Voice Configuration
  async setVoice(e) {
    const t = this.currentVoice;
    if (typeof e == "string") {
      const i = this.findVoice(e);
      i ? this.currentVoice = i : console.warn(`Voice "${e}" not found`);
    } else
      this.currentVoice = e;
    (this.currentVoice && D(this.currentVoice)) !== (t && D(t)) && this.scheduleRestartIfSpeaking();
  }
  // Read from the manager each time, as initializing it with other languages adds theirs
  get voices() {
    return this.voiceManager?.getVoices() ?? [];
  }
  async getAvailableVoices(e, t) {
    try {
      this.voiceManager || await this.initialize();
      const i = [...e ?? [], ...(t ?? []).flatMap((s) => this.browserVoiceLanguage(s) ?? [])];
      return i.length && await I.initialize({ languages: i }), this.voices;
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
    const i = this.lastCancelAt + Fs - Date.now();
    if (this.patches.isSafari && i > 0) {
      this.speakNextTask(t, 1, i);
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
  speakNextTask(e, t, i = 0) {
    setTimeout(() => {
      if (e === this.speakGeneration) {
        if (this.playbackState === "paused") {
          this.pausedAtUtteranceIndex = null;
          return;
        }
        this.playbackState === "playing" && this.speakCurrentUtterance(e, t);
      }
    }, i);
  }
  async speakCurrentUtterance(e, t) {
    if (this.currentUtteranceIndex >= this.currentUtterances.length) {
      this.setState("idle"), this.emitEvent({ type: "end" });
      return;
    }
    const i = this.currentUtterances[this.currentUtteranceIndex], s = i.plain ?? "";
    this.validateText(s);
    const a = this.createUtterance(Tn(s)), r = await this.voiceForUtterance(i);
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
    const t = Z(e, 0.1, 10, this.rate);
    t !== this.rate && (this.rate = t, this.scheduleRestartIfSpeaking());
  }
  getRate() {
    return this.rate;
  }
  setPitch(e) {
    const t = Z(e, 0, 2, this.pitch);
    t !== this.pitch && (this.pitch = t, this.scheduleRestartIfSpeaking());
  }
  getPitch() {
    return this.pitch;
  }
  setVolume(e) {
    const t = Z(e, 0, 1, this.volume);
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
class Vr {
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
function Mn(n, e) {
  const t = [];
  let i = -1, s = -1;
  const a = () => {
    i !== -1 && (t.push({ text: _s(n, i, s), offset: n[i].offset }), i = -1, s = -1);
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
function _s(n, e, t) {
  const i = n[e], s = n[t];
  return i === s ? i.text : n.slice(e, t + 1).map((a) => a.text).join("");
}
const Dn = new RegExp(
  `[^${ce}]*[${ce}]+\\s*|[^${ce}]+$`,
  "gu"
), $s = /\S+\s*|\s+/g;
function ft(n, e, t) {
  const i = [];
  for (const s of n.matchAll(t))
    s[0].length !== 0 && i.push({ text: s[0], offset: e + s.index, atomic: !1 });
  return i;
}
function pt(n, e) {
  if (n.text.length <= e || n.atomic)
    return [n];
  const t = ft(n.text, n.offset, $s);
  if (t.length > 1)
    return t.flatMap((r) => pt(r, e));
  const i = [];
  let s = n.offset, a = "";
  for (const r of n.text)
    a.length > 0 && a.length + r.length > e && (i.push({ text: a, offset: s, atomic: !1 }), s += a.length, a = ""), a += r;
  return a.length > 0 && i.push({ text: a, offset: s, atomic: !1 }), i;
}
function Gs(n, e) {
  if (n.length <= e)
    return [{ text: n, offset: 0 }];
  const i = ft(n, 0, Dn).flatMap((s) => pt(s, e));
  return Mn(i, e);
}
const qs = /<([a-zA-Z][\w-]*)\b[^>]*>[\s\S]*?<\/\1>|<[a-zA-Z][\w-]*\b[^>]*\/>|[^<]+/g;
function Hs(n, e) {
  if (n.length <= e)
    return [{ text: n, offset: 0 }];
  const t = [];
  for (const s of n.matchAll(qs))
    s[0][0] === "<" ? t.push({ text: s[0], offset: s.index, atomic: !0 }) : t.push(...ft(s[0], s.index, Dn));
  const i = t.flatMap((s) => pt(s, e));
  return Mn(i, e);
}
const Ks = {
  wav: "audio/wav",
  mp3: "audio/mpeg",
  opus: "audio/ogg",
  ogg: "audio/ogg",
  aac: "audio/aac",
  flac: "audio/flac",
  webm: "audio/webm",
  m4a: "audio/mp4"
};
function Qs(n) {
  return Ks[n] ?? `audio/${n}`;
}
const Ws = ["flac", "wav", "opus", "aac", "ogg", "webm", "mp3"], Js = ["opus", "aac", "webm", "ogg", "mp3", "wav", "flac"];
function Zs(n, e, t) {
  const i = (o) => t(Qs(o)) !== "", s = n.formats.filter(i);
  if (e.preferredFormat && s.includes(e.preferredFormat))
    return e.preferredFormat;
  const a = e.strategy === "bandwidth" ? Js : Ws, r = [...a, ...s.filter((o) => !a.includes(o))];
  for (const o of r)
    if (s.includes(o))
      return o;
  return n.default;
}
const Xs = /* @__PURE__ */ new Set(["wav", "flac"]), Ys = {
  mp3: 48e3,
  opus: 24e3,
  aac: 48e3,
  ogg: 48e3,
  webm: 32e3
};
function ea(n, e, t) {
  return Xs.has(n) || !e || !t ? void 0 : t.saveData === !0 || /2g/.test(t.effectiveType ?? "") ? Ys[n] : void 0;
}
function Fn(n, e) {
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
class ge extends Error {
  status;
  type;
  title;
  instance;
  constructor(e, t) {
    super(e), this.name = "SpeechServerError", this.status = t.status, this.type = t.type, this.title = t.title, this.instance = t.instance;
  }
}
class _n extends ge {
  constructor(e) {
    super(e, { status: 408, type: "https://readium.org/speech-server/error#stall", title: "Synthesis Stalled" }), this.name = "SpeechServerStallError";
  }
}
class $n extends Error {
  constructor(e) {
    super(e), this.name = "SpeechServerAudioDecodeError";
  }
}
class Gn extends Error {
  constructor(e) {
    super(e), this.name = "SpeechServerNetworkError";
  }
}
async function ue(n) {
  if ((n.headers.get("content-type") ?? "").includes("application/problem+json"))
    try {
      const t = await n.json();
      return new ge(t.detail || t.title || `Request failed with status ${n.status}`, {
        status: t.status ?? n.status,
        type: t.type,
        title: t.title,
        instance: t.instance
      });
    } catch {
    }
  return new ge(`Request failed with status ${n.status}`, { status: n.status });
}
const ta = 3, na = 400;
function ia(n) {
  const e = atob(n), t = new Uint8Array(e.length);
  for (let i = 0; i < e.length; i++)
    t[i] = e.charCodeAt(i);
  return t.buffer;
}
function sa(n) {
  return Z(n, 0.25, 4, 1);
}
function Se(n) {
  return n?.plain ?? n?.ssml ?? void 0;
}
function Jt(n) {
  return n instanceof _n ? { message: n.message, status: n.status, type: n.type, title: n.title, instance: n.instance, recoverable: !0 } : n instanceof ge ? { message: n.message, status: n.status, type: n.type, title: n.title, instance: n.instance, recoverable: !1 } : n instanceof $n ? { message: n.message, recoverable: !1 } : n instanceof Gn ? { message: n.message, recoverable: !0 } : n instanceof Error ? { message: n.message, recoverable: !1 } : { message: String(n), recoverable: !1 };
}
class aa {
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
  events = new je();
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
    this.endpoints = e.endpoints, this.fetchImpl = e.fetch ?? fetch.bind(globalThis), this.prefetchWindow = e.prefetchWindow ?? ta, this.readyBufferChars = e.readyBufferChars ?? na, this.overLengthText = e.overLengthText ?? "split", this.timeoutMs = e.timeoutMs, this.formatOptions = e.format ?? {}, this.canPlayType = typeof Audio < "u" ? (t) => new Audio().canPlayType(t) : () => "";
  }
  // Lets a provider that already fetched /voices seed this engine without a second request.
  setAvailableVoices(e) {
    this.voices = e, this.voicesRequest = null;
  }
  // Fetches the voices, and picks the default one by navigator.languages, as WebSpeechEngine does without languages
  async initialize() {
    this.initializing = (async () => {
      const e = await this.getAvailableVoices();
      return this.defaultVoice = await On(void 0, e), !0;
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
      throw i instanceof TypeError ? new Gn(i.message) : i;
    }
  }
  loadUtterances(e, t) {
    this.abortLiveControllers(), this.clearPrefetchCache(), this.currentUtterances = e, this.currentUtteranceIndex = Ce(t ?? 0, e.length), this.setState("loading"), this.bufferUntilReady(++this.loadGeneration);
  }
  // Buffers enough utterances ahead of currentUtteranceIndex to cover readyBufferChars before
  // declaring "ready", so playback doesn't catch up to an empty prefetch cache right away —
  // starting from wherever playback will actually resume, not always utterance 0.
  async bufferUntilReady(e) {
    const t = Ce(this.currentUtteranceIndex, this.currentUtterances.length), i = Math.min(this.indexCoveringChars(this.readyBufferChars, t), t + this.prefetchWindow), s = [];
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
    const i = Ce(t, this.currentUtterances.length);
    let s = 0;
    for (let a = i; a < this.currentUtterances.length; a++)
      if (s += (Se(this.currentUtterances[a]) ?? "").length, s >= e)
        return a;
    return this.currentUtterances.length - 1;
  }
  // The utterance's own voice when this server has it, else the current voice.
  async voiceFor(e) {
    return this.voices.length === 0 && await (this.initializing ?? this.getAvailableVoices()).catch(() => {
    }), (e?.voice ? this.voices.find((i) => i.identifier === e.voice || i.name === e.voice) : void 0) ?? this.currentVoice ?? this.defaultVoice;
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
      throw await ue(e);
    const i = await e.json(), s = new Map(t.providers.map((a) => [a.id, a.controls]));
    return this.voices = i.map((a) => Fn(a, s.get(a.provider))), this.voices;
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
      throw await ue(e);
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
        detail: Jt(i)
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
    const i = this.currentUtterances[e], s = !i.plain && !!i.ssml, a = i.language, r = Se(i) ?? "", o = s ? xn(r).map : void 0, l = Se(this.currentUtterances[e - 1]), c = Se(this.currentUtterances[e + 1]), u = await this.getServiceInfo(), d = Zs(u.output, this.formatOptions, this.canPlayType), h = navigator.connection, f = ea(d, this.formatOptions.adaptBitrateToNetwork ?? !1, h);
    if (r.length <= u.limits.maxTextLength) {
      const m = new AbortController();
      return (t ? this.activeControllers : this.liveControllers).add(m), [{
        promise: this.synthesizeChunk({ content: i, text: r, textOffset: 0, useSSML: s, ssmlMap: o, language: a, prevText: l, nextText: c, format: d, bitrate: f, controller: m }),
        controller: m
      }];
    }
    if (this.overLengthText === "error")
      throw new ge(
        `Text exceeds this server's maximum length of ${u.limits.maxTextLength} characters`,
        {
          status: 413,
          type: "https://readium.org/speech-server/error#payload_too_large",
          title: "Payload Too Large"
        }
      );
    const p = Math.min(u.limits.maxTextLength, this.readyBufferChars), g = s ? Hs(r, p) : Gs(r, p), v = [];
    let S = Promise.resolve();
    for (let m = 0; m < g.length; m++) {
      const C = m === 0 ? l : g[m - 1].text, y = m === g.length - 1 ? c : g[m + 1].text, b = g[m], k = new AbortController();
      (t ? this.activeControllers : this.liveControllers).add(k);
      const w = S.then(
        () => this.synthesizeChunk({ content: i, text: b.text, textOffset: b.offset, useSSML: s, ssmlMap: o, language: a, prevText: C, nextText: y, format: d, bitrate: f, controller: k })
      );
      v.push({ promise: w, controller: k }), S = w;
    }
    return v;
  }
  async synthesizeChunk(e) {
    const { content: t, text: i, textOffset: s, useSSML: a, ssmlMap: r, language: o, prevText: l, nextText: c, format: u, bitrate: d, controller: h } = e;
    try {
      const f = await this.voiceFor(t), p = await this.fetchNetwork(this.endpoints.synthesize, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: t.id,
          text: a ? i : Tn(i),
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
        throw await ue(p);
      const g = await p.json(), v = ia(g.audio);
      let S;
      try {
        S = await this.ensureAudioContext().decodeAudioData(v);
      } catch {
        throw new $n("Audio playback failed");
      }
      return { audioBuffer: S, format: g.format, boundaries: g.boundaries, textOffset: s, ssmlMap: r };
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
  awaitWithStallDeadline(e, t, i) {
    if (this.timeoutMs === void 0)
      return e;
    const s = i + this.timeoutMs;
    return new Promise((a, r) => {
      const o = setTimeout(() => {
        t.abort(), r(new _n(`No audio chunk arrived within ${s.toFixed(0)}ms of the playback buffer running dry`));
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
    const a = this.ensureAudioContext(), r = this.masterGain, l = i?.controls?.speed === !0 ? 1 : sa(this.rate);
    this.scheduledChunks = [], this.setState("playing"), this.emitEvent({ type: "start", detail: { voice: i } });
    let c = a.currentTime, u = null;
    const d = (h) => {
      const f = a.createBufferSource();
      f.buffer = h.audioBuffer, f.playbackRate.value = l, f.connect(r), f.start(c), u && (u.onended = null), f.onended = () => this.handleUtteranceEnded(t), u = f, this.scheduledChunks.push({ chunk: h, startTime: c, node: f, nextBoundaryIndex: 0, rate: l }), c += h.audioBuffer.duration / l;
    };
    d(s), this.startBoundaryPolling(t);
    for (let h = 1; h < e.length; h++) {
      let f;
      try {
        const p = Math.max(0, (c - a.currentTime) * 1e3);
        f = await this.awaitWithStallDeadline(e[h].promise, e[h].controller, p);
      } catch (p) {
        t === this.speakGeneration && this.emitEvent({ type: "error", detail: Jt(p) });
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
      const i = t.chunk.boundaries ?? [];
      for (; t.nextBoundaryIndex < i.length && e >= t.startTime + i[t.nextBoundaryIndex].elapsedTime / t.rate; ) {
        const s = i[t.nextBoundaryIndex], a = s.charIndex + t.chunk.textOffset;
        let r = a, o = s.charLength;
        if (t.chunk.ssmlMap) {
          const l = t.chunk.ssmlMap;
          r = qt(l, a), o = Math.max(0, qt(l, a + s.charLength) - r);
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
    const t = Z(e, 0.1, 10, this.rate);
    t !== this.rate && (this.rate = t, this.clearPrefetchCache(), this.scheduleRestartIfSpeaking());
  }
  getRate() {
    return this.rate;
  }
  setPitch(e) {
    const t = Z(e, 0, 2, this.pitch);
    t !== this.pitch && (this.pitch = t, this.clearPrefetchCache(), this.scheduleRestartIfSpeaking());
  }
  getPitch() {
    return this.pitch;
  }
  setVolume(e) {
    const t = Z(e, 0, 1, this.volume);
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
class Or {
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
      throw await ue(t);
    if (!i.ok)
      throw await ue(i);
    const s = await t.json(), a = await i.json(), r = new Map(a.providers.map((o) => [o.id, o.controls]));
    return this.voices = s.map((o) => Fn(o, r.get(o.provider))), this.voices;
  }
  async createEngine(e) {
    const t = new aa(this.options);
    return this.voices.length > 0 && t.setAvailableVoices(this.voices), e && t.setVoice(e), t;
  }
  async destroy() {
    this.voices = [];
  }
}
function ra(n) {
  return n.detail?.recoverable === !0;
}
const oa = 3e4, la = [
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
class ca {
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
  events = new je();
  unbindActiveEngine = null;
  constructor(e) {
    this.activeEngine = e.primaryEngine, this.primaryProvider = e.primaryProvider, this.fallbackProvider = e.fallbackProvider, this.onFailure = e.onFailure ?? "fallback", this.healthCheckIntervalMs = e.healthCheckIntervalMs ?? oa, this.lastVoiceRequest = e.primaryEngine.getCurrentVoice() ?? void 0, this.bindActiveEngine();
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
  // Once fallen back, the same offline restriction as the fallback voice, so content isn't given a network one.
  async getAvailableVoices(e, t) {
    const i = await this.activeEngine.getAvailableVoices(e, t);
    return this.hasFallenBack ? this.reachableVoices(i) : i;
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
    const e = this.activeEngine, t = la.map((i) => e.on(i, (s) => {
      this.emitEvent(s), this.maybeRecoverNow();
    }));
    t.push(e.on("error", (i) => this.handleError(i))), this.unbindActiveEngine = () => t.forEach((i) => i());
  }
  handleError(e) {
    if (this.hasFallenBack || this.swapInFlight || this.onFailure === "error" || !ra(e)) {
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
  reachableVoices(e) {
    return typeof navigator < "u" && navigator.onLine === !0 ? e : e.filter((i) => i.offlineAvailability === !0);
  }
  // Language narrows first, gender second, boundary-support third: a same-language wrong-gender
  // voice beats a different-language right-gender one, and a same-gender voice that drops
  // boundary events beats one that also mismatches on boundary support. Falls back to any
  // language if none matches, then to any gender within that if none matches, then to any
  // boundary support within that if none matches. Region/quality ranking within the final
  // candidate set is delegated to pickBestVoiceByRegion, the same ranking logic
  // sortVoicesByRegions uses.
  async pickBestFallbackVoice(e, t, i) {
    const s = this.reachableVoices(await this.fallbackProvider.getVoices());
    if (s.length === 0) return null;
    const [a] = ze([e]), { voicesByLang: r } = Be(s, [a]), o = r.get(a.baseLang) ?? [], l = o.length > 0 ? o : s, c = t ? l.filter((h) => h.gender === t) : [], u = c.length > 0 ? c : l, d = An(u, i);
    return Pn(e, d);
  }
  async destroy() {
    this.teardownEpoch++, this.healthCheckTimer !== null && (clearTimeout(this.healthCheckTimer), this.healthCheckTimer = null), this.unbindActiveEngine?.(), this.events.clear(), await this.activeEngine.destroy();
  }
}
class Tr {
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
    return new ca({
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
function ua(n) {
  return new Bi({
    start: new Ft(n.start),
    end: n.end ? new Ft(n.end) : void 0
  });
}
function ha(n, e = window) {
  const { href: t, text: i, cssSelector: s, domRange: a, fragment: r } = n, o = i ? new Oi(i) : void 0, l = s || a ? /* @__PURE__ */ new Map() : void 0;
  l && (s && l.set("cssSelector", s), a && l.set("domRange", ua(a).serialize()));
  const u = l !== void 0 || r !== void 0 ? new Ti({
    fragments: r ? [r] : void 0,
    otherLocations: l
  }) : void 0;
  return new xi({
    href: t ?? e.location.href,
    type: "text/html",
    text: o,
    locations: u
  });
}
class da extends Ai {
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
        locator: ha(a, this.wnd)
      })),
      t
    );
  }
  destroy() {
    super.destroy(), this.decorator.unmount(this.wnd, this.channel.frame), this.channel.frame.destroy();
  }
}
function xr(n = window, e = {}) {
  const t = new Li(), i = new Vi();
  return i.mount(n, t.frame), new da(t, n, i, e);
}
class Ur {
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
const De = (n, e, t) => Object.freeze({ range: Object.freeze([n, e]), step: t }), Pe = De(0, 5e3, 100), Ae = De(0.1, 10, 0.1), Le = De(0, 2, 0.1), Ve = De(0, 1, 0.05), mt = Object.freeze(["none", "few", "some", "most", "custom"]), vt = Object.freeze(["none", "block-level", "always"]), yt = Object.freeze(["plain", "ssml"]), St = Object.freeze(["none", "utterance", "block"]), bt = Object.freeze(["structure", "sentence"]), qn = Object.freeze(["never", "inline", "after"]), Zt = Object.freeze([
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
function wt(n) {
  return n == null || typeof n == "boolean" ? n : void 0;
}
function T(n, e) {
  return n == null || e.includes(n) ? n : void 0;
}
function _(n, e) {
  if (n == null) return n;
  if (typeof n != "number" || Number.isNaN(n)) return;
  const t = Math.min(...e), i = Math.max(...e);
  return n >= t && n <= i ? n : void 0;
}
function kt(n) {
  if (n == null) return n;
  if (!(typeof n != "object" || Array.isArray(n)))
    return Object.values(n).every((e) => typeof e == "string") ? { ...n } : void 0;
}
function Hn(n, e) {
  if (n == null) return n;
  if (!(typeof n != "object" || Array.isArray(n)))
    return Object.values(n).every((t) => t !== void 0 && e.includes(t)) ? { ...n } : void 0;
}
function Kn(n) {
  return typeof n == "string" ? n : kt(n);
}
function fe(n) {
  return n == null ? n : Array.isArray(n) && n.every((e) => typeof e == "string") ? [...n] : void 0;
}
class Xt {
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
    this.format = T(e.format, yt) ?? "plain", this.interruptions = Hn(e.interruptions, qn) ?? {}, this.verbosity = T(e.verbosity, mt) ?? "few", this.skip = fe(e.skip) ?? [], this.contextualize = fe(e.contextualize) ?? [], this.language = T(e.language, vt) ?? "block-level", this.languageOverrides = kt(e.languageOverrides) ?? {}, this.segmentation = T(e.segmentation, bt) ?? "structure", this.reconstruct = wt(e.reconstruct) ?? !1, this.voice = Kn(e.voice) ?? null, this.pauseDuration = _(e.pauseDuration, Pe.range) ?? 300, this.autoPause = T(e.autoPause, St) ?? "none", this.rate = _(e.rate, Ae.range) ?? 1, this.pitch = _(e.pitch, Le.range) ?? 1, this.volume = _(e.volume, Ve.range) ?? 1;
  }
}
class ie {
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
    this.format = T(e.format, yt), this.interruptions = Hn(e.interruptions, qn), this.verbosity = T(e.verbosity, mt), this.skip = fe(e.skip), this.contextualize = fe(e.contextualize), this.language = T(e.language, vt), this.languageOverrides = kt(e.languageOverrides), this.segmentation = T(e.segmentation, bt), this.reconstruct = wt(e.reconstruct), this.voice = Kn(e.voice), this.pauseDuration = _(e.pauseDuration, Pe.range), this.autoPause = T(e.autoPause, St), this.rate = _(e.rate, Ae.range), this.pitch = _(e.pitch, Le.range), this.volume = _(e.volume, Ve.range);
  }
  merging(e) {
    const t = { ...this };
    for (const i of Object.keys(e))
      e[i] !== void 0 && (t[i] = e[i]);
    return new ie(t);
  }
}
class X {
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
class le extends X {
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
    if (e != null && T(e, this._supportedValues) === void 0)
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
class ga extends X {
  set value(e) {
    if (e != null && wt(e) === void 0)
      throw new Error(`Value '${String(e)}' is not a boolean.`);
    this._value = e, this._onChange(this._value);
  }
  get value() {
    return this._value;
  }
}
class Yt extends X {
  set value(e) {
    if (e != null && fe(e) === void 0)
      throw new Error(`Value '${String(e)}' is not an array of strings.`);
    this._value = e, this._onChange(this._value);
  }
  get value() {
    return this._value;
  }
}
class be extends X {
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
    if (e != null && _(e, this._supportedRange) === void 0)
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
class en {
  preferences;
  settings;
  // Cloned rather than aliased: edits made through this editor's setters
  // are staged on this copy and only reach the navigator's own preferences
  // once explicitly passed to submitPreferences() — discarding the editor
  // without submitting must leave the navigator untouched.
  constructor(e, t) {
    this.preferences = new ie({ ...e }), this.settings = t;
  }
  // Explicit `null`s, not `undefined` — merging() skips `undefined` fields,
  // so only `null` actually clears them once submitted.
  clear() {
    this.preferences = new ie({
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
    return new le({
      initialValue: this.preferences.format,
      effectiveValue: this.settings.format,
      isEffective: this.preferences.format != null,
      onChange: (e) => this.updatePreference("format", e ?? null),
      supportedValues: yt
    });
  }
  get interruptions() {
    return new X({
      initialValue: this.preferences.interruptions,
      effectiveValue: this.settings.interruptions,
      isEffective: this.preferences.interruptions != null,
      onChange: (e) => this.updatePreference("interruptions", e ?? null)
    });
  }
  get verbosity() {
    return new le({
      initialValue: this.preferences.verbosity,
      effectiveValue: this.settings.verbosity,
      isEffective: this.preferences.verbosity != null,
      onChange: (e) => this.updatePreference("verbosity", e ?? null),
      supportedValues: mt
    });
  }
  get skip() {
    return new Yt({
      initialValue: this.preferences.skip,
      effectiveValue: this.settings.skip,
      isEffective: this.preferences.skip != null,
      onChange: (e) => this.updatePreference("skip", e ?? null)
    });
  }
  get contextualize() {
    return new Yt({
      initialValue: this.preferences.contextualize,
      effectiveValue: this.settings.contextualize,
      isEffective: this.preferences.contextualize != null,
      onChange: (e) => this.updatePreference("contextualize", e ?? null)
    });
  }
  get language() {
    return new le({
      initialValue: this.preferences.language,
      effectiveValue: this.settings.language,
      isEffective: this.preferences.language != null,
      onChange: (e) => this.updatePreference("language", e ?? null),
      supportedValues: vt
    });
  }
  get languageOverrides() {
    return new X({
      initialValue: this.preferences.languageOverrides,
      effectiveValue: this.settings.languageOverrides,
      isEffective: this.preferences.languageOverrides != null,
      onChange: (e) => this.updatePreference("languageOverrides", e ?? null)
    });
  }
  get segmentation() {
    return new le({
      initialValue: this.preferences.segmentation,
      effectiveValue: this.settings.segmentation,
      isEffective: this.preferences.segmentation != null,
      onChange: (e) => this.updatePreference("segmentation", e ?? null),
      supportedValues: bt
    });
  }
  get reconstruct() {
    return new ga({
      initialValue: this.preferences.reconstruct,
      effectiveValue: this.settings.reconstruct,
      isEffective: this.settings.segmentation === "sentence" && this.preferences.reconstruct != null,
      onChange: (e) => this.updatePreference("reconstruct", e ?? null)
    });
  }
  get voice() {
    return new X({
      initialValue: this.preferences.voice,
      effectiveValue: this.settings.voice,
      isEffective: this.preferences.voice != null,
      onChange: (e) => this.updatePreference("voice", e ?? null)
    });
  }
  get pauseDuration() {
    return new be({
      initialValue: this.preferences.pauseDuration,
      effectiveValue: this.settings.pauseDuration,
      isEffective: this.preferences.pauseDuration != null,
      onChange: (e) => this.updatePreference("pauseDuration", e ?? null),
      supportedRange: Pe.range,
      step: Pe.step
    });
  }
  get autoPause() {
    return new le({
      initialValue: this.preferences.autoPause,
      effectiveValue: this.settings.autoPause,
      isEffective: this.preferences.autoPause != null,
      onChange: (e) => this.updatePreference("autoPause", e ?? null),
      supportedValues: St
    });
  }
  get rate() {
    return new be({
      initialValue: this.preferences.rate,
      effectiveValue: this.settings.rate,
      isEffective: this.preferences.rate != null,
      onChange: (e) => this.updatePreference("rate", e ?? null),
      supportedRange: Ae.range,
      step: Ae.step
    });
  }
  get pitch() {
    return new be({
      initialValue: this.preferences.pitch,
      effectiveValue: this.settings.pitch,
      isEffective: this.preferences.pitch != null,
      onChange: (e) => this.updatePreference("pitch", e ?? null),
      supportedRange: Le.range,
      step: Le.step
    });
  }
  get volume() {
    return new be({
      initialValue: this.preferences.volume,
      effectiveValue: this.settings.volume,
      isEffective: this.preferences.volume != null,
      onChange: (e) => this.updatePreference("volume", e ?? null),
      supportedRange: Ve.range,
      step: Ve.step
    });
  }
}
const Qn = ["audio", "figure", "image", "math", "table", "video"], Wn = [
  ...Qn,
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
], fa = [
  ...Wn,
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
], pa = {
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
}, ma = {
  none: /* @__PURE__ */ new Set(),
  few: new Set(Qn),
  some: new Set(Wn),
  most: new Set(fa)
}, st = {
  table: { few: "inline", some: "block", most: "block" }
};
function we(n) {
  const e = {};
  for (const t of Object.keys(st))
    e[t] = st[t]?.[n] ?? "inline";
  return e;
}
const va = {
  none: we("none"),
  few: we("few"),
  some: we("some"),
  most: we("most")
}, Nr = Object.keys(st);
function ya(n, e) {
  const t = n === "custom" ? {} : va[n];
  if (!e) return t;
  const i = { ...t };
  for (const s of Object.keys(e)) {
    const a = e[s]?.[n];
    a && (i[s] = a);
  }
  return i;
}
const Sa = (n, e) => {
  if (!n || typeof n == "object" && Object.keys(n).length === 0) return e;
  if (typeof n == "string" || !e || typeof e == "string") return n;
  const t = new Set(Object.keys(n).map(L)), i = { ...n };
  for (const [s, a] of Object.entries(e))
    t.has(L(s)) || (i[s] = a);
  return i;
};
class qe {
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
    this.format = e.format ?? t.format, this.interruptions = e.interruptions ?? t.interruptions, this.verbosity = e.verbosity ?? t.verbosity, this.verbosity === "custom" ? (this.skip = e.skip ?? t.skip, this.contextualize = e.contextualize ?? t.contextualize) : (this.skip = [...pa[this.verbosity]], this.contextualize = [...ma[this.verbosity]]), this.language = e.language ?? t.language, this.languageOverrides = e.languageOverrides ?? t.languageOverrides, this.segmentation = e.segmentation ?? t.segmentation, this.reconstruct = e.reconstruct ?? t.reconstruct, this.voice = Sa(e.voice, t.voice), this.pauseDuration = e.pauseDuration ?? t.pauseDuration, this.autoPause = e.autoPause ?? t.autoPause, this.rate = e.rate ?? t.rate, this.pitch = e.pitch ?? t.pitch, this.volume = e.volume ?? t.volume;
  }
}
const tn = /* @__PURE__ */ new WeakMap(), Jn = /* @__PURE__ */ new WeakMap();
function nn(n, e) {
  Jn.set(n, e);
}
const at = /* @__PURE__ */ new WeakSet();
function rt(n) {
  return at.add(n), n;
}
function ba(n, e, t) {
  const i = Jn.get(n);
  if (i) {
    const d = Kt(i.map, e), h = Kt(i.map, e + t);
    e = d, t = Math.max(0, h - d);
  }
  const s = n.offsets, a = !n.plain && !!n.ssml, r = i?.plain ?? n.plain ?? (n.ssml ? x(n.ssml) : "");
  if (!s?.length || !r) return;
  const o = tn.get(n), l = o !== void 0 && e >= o.cursor;
  let c = l ? o.cursor : 0;
  const u = (d) => {
    const h = d.locate.text?.highlight;
    return h && (a ? x(h) : h);
  };
  for (let d = l ? o.pieceIndex : 0; d < s.length; d++) {
    const h = s[d];
    if (at.has(h.locate)) {
      const v = s.slice(d + 1).find((b) => !at.has(b.locate) && u(b)), S = v && u(v), m = S ? r.indexOf(S, c + h.end - h.start) : -1, C = S && m === -1 ? r.indexOf(S, c) : m, y = C === -1 ? r.length : C;
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
      tn.set(n, { pieceIndex: d, cursor: c });
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
function wa(n, e) {
  return e === "sentence" && n.offsets?.length ? n.offsets.map((t) => t.locate) : n.locate ? [n.locate] : [];
}
function z(n) {
  return { pattern: new RegExp(`(\\d+)\\s?u${n}\\b`, "g"), replace: (e, t) => `${t}µ${n}` };
}
const ka = {
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
}, Ca = {
  ...ka,
  // Rejects "(c)" directly preceded by "(a)"/"(b)" (a lettered list, not a copyright notice).
  "(c)": { pattern: new RegExp("(?<!\\([ab]\\)\\s{0,3})\\(c\\)", "g"), replace: "©" },
  "(C)": { pattern: new RegExp("(?<!\\([AB]\\)\\s{0,3})\\(C\\)", "g"), replace: "©" },
  "(r)": "®",
  "(R)": "®",
  "(tm)": "™",
  "(TM)": "™",
  deg: { pattern: /(\d+)\s?deg\b/g, replace: (n, e) => `${e}°` },
  x: { pattern: /(\d+)\s?[xX]\s?(?=\d)/g, replace: (n, e) => `${e}×` },
  ug: z("g"),
  um: z("m"),
  us: z("s"),
  uL: z("L"),
  uF: z("F"),
  uA: z("A"),
  uV: z("V"),
  uW: z("W"),
  uN: z("N"),
  umol: z("mol"),
  "->": "→",
  "<-": "←",
  // Reversed from every other entry: engines pattern-match the ASCII foot/inch
  // convention for pronunciation, but drop the real prime marks silently.
  "′": "'",
  "″": '"'
}, Ea = { contextualizations: { abstract: { block: { start: "Start of the abstract.", end: "End of the abstract." } }, acknowledgments: { block: { start: "Start of the acknowledgments.", end: "End of the acknowledgments." } }, afterword: { block: { start: "Start of the afterword.", end: "End of the afterword." } }, appendix: { block: { start: "Start of the appendix.", end: "End of the appendix." } }, aside: { block: { start: "Start of the aside.", end: "End of the aside." } }, audio: { inline: { labelled: "Audio with a label: {{ description }}", unlabelled: "Audio with no label." } }, bibliography: { block: { start: "Start of the bibliography.", end: "End of the bibliography." } }, biblioref: { inline: "Bibliographic reference." }, blockquote: { inline: "Blockquote." }, cell: { inline: { withHeader: "{{ header }}: {{ value }}", withoutHeader: "{{ value }}" } }, chapter: { block: { start: "Start of the chapter.", end: "End of the chapter." } }, colophon: { inline: "Colophon." }, complementary: { block: { start: "Start of the complementary content.", end: "End of the complementary content." } }, conclusion: { block: { start: "Start of the conclusion.", end: "End of the conclusion." } }, cover: { inline: { labelled: "Cover with a label: {{ description }}", unlabelled: "Cover with no label." } }, credit: { inline: "Credit." }, credits: { block: { start: "Start of the credits.", end: "End of the credits." } }, dedication: { inline: "Dedication." }, definition: { inline: "Definition." }, details: { block: { start: "Start of the disclosure.", end: "End of the disclosure." } }, endnotes: { block: { start: "Start of the endnotes.", end: "End of the endnotes." } }, epigraph: { inline: "Epigraph." }, epilogue: { block: { start: "Start of the epilogue.", end: "End of the epilogue." } }, errata: { block: { start: "Start of the errata.", end: "End of the errata." } }, example: { block: { start: "Start of the example.", end: "End of the example." } }, figure: { inline: "Figure: {{ description }}" }, footnote: { block: { start: "Start of the footnote.", end: "End of the footnote." } }, foreword: { block: { start: "Start of the foreword.", end: "End of the foreword." } }, glossary: { block: { start: "Start of the glossary.", end: "End of the glossary." } }, glossref: { inline: "Glossary definition.", term: "{{ term }}: {{ value }}" }, heading1: { inline: "Heading level 1." }, heading2: { inline: "Heading level 2." }, heading3: { inline: "Heading level 3." }, heading4: { inline: "Heading level 4." }, heading5: { inline: "Heading level 5." }, heading6: { inline: "Heading level 6." }, image: { inline: { labelled: "Image with a label: {{ description }}", unlabelled: "Image with no label." } }, index: { block: { start: "Start of the index.", end: "End of the index." } }, introduction: { block: { start: "Start of the introduction.", end: "End of the introduction." } }, list: { block: { start: "Start of the list.", end: "End of the list." } }, listItem: { inline: "List item." }, math: { inline: { labelled: "{{ description }}", unlabelled: "Math formula with no label." } }, notice: { inline: "Notice." }, pagebreak: { inline: "Pagebreak.", number: "Page {{ number }}" }, pagelist: { block: { start: "Start of the page list.", end: "End of the page list." } }, part: { inline: "Part." }, preface: { block: { start: "Start of the preface.", end: "End of the preface." } }, prologue: { block: { start: "Start of the prologue.", end: "End of the prologue." } }, pullquote: { inline: "Pullquote." }, qna: { block: { start: "Start of the questions and answers.", end: "End of the questions and answers." } }, row: { inline: "Row: {{ count }}" }, rowheader: { inline: { withHeader: "{{ header }}: {{ value }}", withoutHeader: "{{ value }}" } }, separator: { inline: "Separator." }, subtitle: { inline: "Subtitle." }, summary: { inline: "Summary." }, table: { block: { end: "End of the table.", start: { labelled: "Table: {{ description }}. {{ lines }}. {{ columns }}.", unlabelled: "Table. {{ lines }}. {{ columns }}." } }, inline: { labelled: "Table: {{ description }}. {{ lines }}. {{ columns }}.", unlabelled: "Table. {{ lines }}. {{ columns }}." }, parts: { columns_one: "1 column", columns_other: "{{ count }} columns", lines_one: "1 line", lines_other: "{{ count }} lines" } }, term: { inline: "Term." }, tip: { inline: "Tip." }, video: { inline: { labelled: "Video with a label: {{ description }}", unlabelled: "Video with no label." } } } }, Ra = {
  speech: Ea
}, Zn = Ra.speech.contextualizations, ot = { en: Zn }, Xn = {};
function Ia(n) {
  return ot[n] || Xn[n] ? n : "en";
}
async function Pa(n) {
  const e = ot[n];
  if (e) return e;
  const t = Xn[n];
  if (!t) return Zn;
  const i = (await t()).speech.contextualizations;
  return ot[n] = i, i;
}
const Aa = {
  de: ["A.", "A.M.", "Abs.", "Abt.", "Abw.", "Adj.", "Adr.", "Akt.", "Allg.", "Alt.", "App.", "Apr.", "Art.", "Aug.", "Ausg.", "Ausschl.", "B.", "Bed.", "Ben.", "Ber.", "Best.", "Bibl.", "C.", "Ca.", "Chin.", "Chr.", "Co.", "D.", "D. h.", "Dat.", "Dez.", "Di.", "Dim.", "Dipl.-Ing.", "Dipl.-Kfm.", "Dir.", "Do.", "Dr.", "Dtzd.", "Einh.", "Erf.", "Evtl.", "F.", "F.f.", "Fa.", "Fam.", "Feb.", "Fn.", "Folg.", "Forts. f.", "Fr.", "Frl.", "G.", "Gebr.", "Gem.", "Geograph.", "Ges.", "Gesch.", "Ggf.", "Hbf.", "Hptst.", "Hr.", "Hrn.", "Hrsg.", "I.", "Inc.", "Ing.", "Inh.", "Int.", "J.", "J.D.", "Jahrh.", "Jan.", "Jr.", "Kap.", "Kfm.", "Kl.", "Konv.", "Kop.", "L.", "Ltd.", "M.", "Max.", "Mi.", "Min.", "Mind.", "Mio.", "Mo.", "Mod.", "Mrd.", "Msp.", "N.", "Nov.", "Nr.", "O.", "Obj.", "Okt.", "Op.", "P.", "P.M.", "PIN.", "Pfd.", "Phys.", "Port.", "Prot.", "Proz.", "Qu.", "R.", "Rd.", "Reg.", "Reg.-Bez.", "Rel.", "Rep.", "S.A.", "Sa.", "Schr.", "Sek.", "Sep.", "Sept.", "So.", "Spezif.", "St.", "StR.", "Std.", "Str.", "T.", "Tel.", "Temp.", "Test.", "Trans.", "Tägl.", "U.", "U. U.", "U.S.", "U.S.A.", "U.U.", "Urspr.", "Ursprüngl.", "Verf.", "Vgl.", "W.", "Wg.", "Y.", "Z.", "Z. B.", "Z. Zt.", "Ztr.", "a.D.", "a.M.", "a.Rh.", "a.a.O.", "a.a.S.", "am.", "amtl.", "b.", "beil.", "d.J.", "d.Ä.", "e.V.", "e.Wz.", "e.h.", "ehem.", "eigtl.", "einschl.", "entspr.", "erw.", "ev.", "evtl.", "exkl.", "frz.", "geb.", "gedr.", "gek.", "gesch.", "gest.", "ggf.", "ggfs.", "hpts.", "i.A.", "i.B.", "i.H.", "i.J.", "i.R.", "i.V.", "inkl.", "jew.", "jhrl.", "k. u. k.", "k.u.k.", "kath.", "kfm.", "kgl.", "led.", "m.E.", "m.W.", "mtl.", "möbl.", "n. Chr.", "n.u.Z.", "näml.", "o.A.", "o.B.", "o.g.", "od.", "p.Adr.", "r.", "röm.", "röm.-kath.", "s.", "s.a.", "schles.", "schweiz.", "schwäb.", "sog.", "südd.", "tägl.", "u.", "u. Z.", "u.A.w.g.", "u.U.", "u.a.", "u.v.a.", "u.Ä.", "u.ä.", "v. Chr.", "v. H.", "v. u. Z.", "v.Chr.", "v.H.", "v.R.w.", "v.T.", "v.u.Z.", "verh.", "verw.", "vgl.", "z.", "z.B.", "z.Hd.", "z.Z.", "zzgl.", "österr."],
  en: ["A.D.", "A.I.", "A.M.", "A.S.", "AA.", "AB.", "Abs.", "Adj.", "Adv.", "Alt.", "Approx.", "Aug.", "B.V.", "C.F.", "C.O.D.", "Capt.", "Col.", "Comm.", "Conn.", "Cont.", "D.A.", "D.C.", "DC.", "DR.", "Dec.", "Def.", "Dept.", "Diff.", "Dr.", "E.G.", "E.g.", "Ed.", "Est.", "Etc.", "Ex.", "Exec.", "Feb.", "Fn.", "Fri.", "Hon.B.A.", "I.", "I.D.", "I.T.", "I.e.", "J.B.", "J.D.", "J.K.", "Jan.", "Jun.", "K.R.", "L.A.", "L.P.", "Lev.", "Lib.", "Lt.", "Lt.Cdr.", "M.", "M.I.T.", "M.R.", "M.T.", "MR.", "Maj.", "Mar.", "Mart.", "Mb.", "Md.", "Mgr.", "Min.", "Misc.", "Mr.", "Mrs.", "Ms.", "Mt.", "N.V.", "N.Y.", "Nov.", "Nr.", "Num.", "Op.", "Org.", "P.M.", "P.O.", "P.V.", "PP.", "Ph.D.", "Phys.", "Prof.", "Pvt.", "R.L.", "R.T.", "Rep.", "Rev.", "S.A.", "S.A.R.", "S.E.", "S.p.A.", "Sep.", "Sept.", "Sgt.", "Sq.", "St.", "U.S.", "U.S.A.", "U.S.C.", "VS.", "Yr.", "a.m.", "d.", "dr.", "exec.", "pp.", "vs."],
  es: ["A.C.", "AA.", "All.", "Ant.", "Av.", "Avda.", "Bien.", "C.", "C.P.", "C.S.", "C.V.", "CA.", "Col.", "Comm.", "Corp.", "Cía.", "D.", "DC.", "Da.", "Desc.", "Desv.", "Dr.", "Dra.", "Drs.", "Dto.", "Dª.", "Dña.", "Em.", "Emm.", "Exc.", "Excma.", "Excmas.", "Excmo.", "Excmos.", "Exma.", "Exmas.", "Exmo.", "Exmos.", "FF.CC.", "Fabric.", "Fr.", "H.P.", "Id.", "Ilma.", "Ilmas.", "Ilmo.", "Ilmos.", "Inc.", "JJ.OO.", "K.", "Kit.", "Korn.", "L.", "Lcda.", "Lcdo.", "Lda.", "Ldo.", "Lic.", "Ltd.", "Ltda.", "Ltdo.", "M.", "MM.", "Mons.", "Mr.", "Mrs.", "O.M.", "PP.", "R.D.", "R.U.", "RAM.", "RR.HH.", "Rdo.", "Rdos.", "Reg.", "Rev.", "Rol.", "Rvdmo.", "Rvdmos.", "Rvdo.", "Rvdos.", "SA.", "SS.AA.", "SS.MM.", "Sdad.", "Seg.", "Sol.", "Sr.", "Sra.", "Sras.", "Sres.", "Srta.", "Srtas.", "Sta.", "Sto.", "Trab.", "U.S.", "U.S.A.", "Var.", "Vda.", "a. C.", "a. e. c.", "abr.", "afma.", "afmas.", "afmo.", "afmos.", "ago.", "bco.", "bol.", "c/c.", "cap.", "cf.", "cfr.", "col.", "d. C.", "depto.", "deptos.", "dic.", "doc.", "dom.", "dpto.", "dptos.", "dtor.", "e. c.", "e.g.", "ed.", "ej.", "ene.", "feb.", "fig.", "figs.", "fund.", "hnos.", "jue.", "jul.", "jun.", "licda.", "licdo.", "lun.", "mar.", "may.", "mié.", "ms.", "mss.", "mtro.", "nov.", "ntra.", "ntro.", "oct.", "p.ej.", "prof.", "prov.", "sept.", "sras.", "sres.", "srs.", "ss.", "sáb.", "trad.", "v.gr.", "vid.", "vie.", "vs."],
  fr: ["All.", "C.", "Comm.", "D.", "DC.", "Desc.", "Inc.", "Jr.", "L.", "M.", "MM.", "Mart.", "Op.", "P.", "P.-D. G.", "P.O.", "Prof.", "S.A.", "S.M.A.R.T.", "U.", "U.S.", "U.S.A.", "Var.", "W.", "acoust.", "adr.", "anc.", "ann.", "anon.", "ap. J.-C.", "append.", "aux.", "av. J.-C.", "avr.", "broch.", "bull.", "cam.", "categ.", "coll.", "collab.", "config.", "dest.", "dict.", "dim.", "dir.", "doc.", "déc.", "encycl.", "exempl.", "fig.", "févr.", "gouv.", "graph.", "hôp.", "ill.", "illustr.", "imm.", "imprim.", "indus.", "janv.", "jeu.", "juil.", "lun.", "mar.", "mer.", "niv.", "nov.", "oct.", "quart.", "réf.", "sam.", "sept.", "symb.", "synth.", "syst.", "trav. publ.", "ven.", "voit.", "éd.", "édit.", "équiv.", "éval."],
  it: ["C.P.", "Cfr.", "D.", "DC.", "Geom.", "Ing.", "L.", "Liv.", "Ltd.", "Mod.", "N.B.", "N.d.A.", "N.d.E.", "N.d.T.", "O.d.G.", "S.A.R.", "S.M.A.R.T.", "S.p.A.", "Sig.", "U.S.", "U.S.A.", "a.C.", "ag.", "all.", "arch.", "avv.", "c.c.p.", "d.C.", "d.p.R.", "div.", "dott.", "dr.", "fig.", "int.", "mitt.", "on.", "p.", "p.i.", "pag.", "rag.", "sez.", "tab.", "tav.", "ver.", "vol."],
  pt: ["A.C.", "Alm.", "Av.", "Dir.", "Dr.", "Dra.", "Dras.", "Drs.", "E.", "Est.", "Exma.", "Exmo.", "Fr.", "Ilma.", "Ilmo.", "Jr.", "Ltd.", "Ltda.", "Mar.", "N.Sra.", "N.T.", "P.M.", "Pe.", "Ph.D.", "R.", "S.", "S.A.", "Sta.", "Sto.", "V.T.", "W.C.", "a.C.", "a.m.", "abr.", "abrev.", "adm.", "aer.", "ago.", "agric.", "anat.", "ap.", "apart.", "apt.", "arit.", "arqueol.", "arquit.", "astron.", "autom.", "aux.", "biogr.", "bras.", "cap.", "caps.", "cat.", "cel.", "cf.", "col.", "com.", "comp.", "compl.", "cont.", "contab.", "créd.", "cx.", "círc.", "cód.", "d.C.", "des.", "desc.", "dez.", "dipl.", "dir.", "div.", "doc.", "déb.", "ed.", "educ.", "elem.", "eletr.", "eletrôn.", "end.", "eng.", "esp.", "ex.", "f.", "fac.", "fasc.", "fem.", "fev.", "ff.", "fig.", "fil.", "filos.", "fisiol.", "fl.", "fot.", "fr.", "fís.", "geom.", "gram.", "gên.", "hist.", "ind.", "ingl.", "jan.", "jul.", "jun.", "jur.", "l.", "lat.", "lin.", "lit.", "liter.", "long.", "mai.", "mar.", "mat.", "matem.", "mov.", "máq.", "méd.", "mús.", "neol.", "nov.", "náut.", "obs.", "odont.", "odontol.", "org.", "organiz.", "out.", "p.", "p. ex.", "p.m.", "pal.", "pol.", "port.", "pp.", "pq.", "prod.", "prof.", "profa.", "pron.", "próx.", "psicol.", "pág.", "quím.", "r.s.v.p.", "ref.", "rel.", "relat.", "rep.", "res.", "rod.", "set.", "sociol.", "sup.", "séc.", "símb.", "tec.", "tecnol.", "tel.", "trad.", "transp.", "univ.", "vol.", "vs.", "álg.", "índ."],
  ru: ["авг.", "апр.", "дек.", "до н. э.", "кв.", "н. э.", "н.э.", "нояб.", "окт.", "отд.", "проф.", "руб.", "сент.", "тел.", "тыс.", "ул.", "февр.", "янв."],
  th: ["ค.ศ."]
};
function He(n, e, t) {
  let i = t;
  for (; i > e && /\s/.test(n[i - 1]); ) i--;
  return i;
}
const La = /[\s([{"'“‘]/;
function Va(n, e) {
  for (const t of e) {
    if (n.length < t.length || !n.endsWith(t)) continue;
    const i = n.length - t.length - 1;
    if (i < 0 || La.test(n[i])) return !0;
  }
  return !1;
}
function Oa(n) {
  let e = 0;
  for (const t of n)
    if (new RegExp("\\p{L}", "u").test(t) && e++, e >= 2) return !0;
  return !1;
}
function Ta(n) {
  return /\.{3,}$/.test(n);
}
function xa(n, e, t, i) {
  if (i === "“") return !0;
  if (i !== '"') return !1;
  let s = 0;
  for (let a = e; a < t; a++) n[a] === '"' && s++;
  return s % 2 === 1;
}
const Ua = new RegExp(`[.!?][”"'’)\\]]*\\s+—\\s+(?=\\p{Lu})`, "gu");
function Na(n, e) {
  const t = [...n.matchAll(Ua)].map((s) => s.index + s[0].length);
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
const za = { "»": "«", "«": "»", "›": "‹", "‹": "›" };
function Ba(n, e) {
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
      const u = za[n[c]];
      if (u === void 0 || a(l.end, u) <= a(l.end, n[c])) break;
      for (c++; c < o.end && /\s/.test(n[c]); ) c++;
      l.end = o.start = c;
    }
    o.start < o.end ? t.push(o) : l && (l.end = o.end);
  }
  return t;
}
function ja(n, e, t) {
  const i = Ba(n, Na(n, e));
  for (let a = 0; a < i.length - 1; a++) {
    const r = He(n, i[a].start, i[a].end);
    if (r !== i[a].end || r <= i[a].start) continue;
    const o = n[r - 1];
    xa(n, i[a].start, r, o) && (i[a].end -= 1, i[a + 1].start -= 1);
  }
  const s = [];
  for (const a of i) {
    let r = a;
    for (; s.length > 0; ) {
      const o = s[s.length - 1], l = He(n, o.start, o.end), c = n.slice(o.start, l);
      if (!Va(c, t) && Oa(c) && !Ta(c)) break;
      s.pop(), r = { start: o.start, end: r.end };
    }
    s.push(r);
  }
  return s.map((a) => {
    const r = He(n, a.start, a.end);
    return { text: n.slice(a.start, r), start: a.start, end: a.end, contentEnd: r };
  });
}
const sn = /* @__PURE__ */ new Map();
function Yn(n) {
  let e = sn.get(n);
  if (!e) {
    try {
      const [t, i] = P(n), s = i ? `${t}-${i}` : t;
      e = { segmenter: new Intl.Segmenter(s, { granularity: "sentence" }), language: n };
    } catch {
      e = { segmenter: new Intl.Segmenter("en", { granularity: "sentence" }), language: "en" };
    }
    sn.set(n, e);
  }
  return e;
}
function Ma(n) {
  return Yn(n).language;
}
async function ei(n, e, t) {
  if (e === "") return [];
  const { segmenter: i, language: s } = Yn(n), r = [...i.segment(e)].map((c) => ({ start: c.index, end: c.index + c.segment.length })), o = Cn(Aa, s) ?? [], l = t ? [...o, ...t] : o;
  return ja(e, r, l);
}
const zr = [
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
], Da = [
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
], Fa = {
  footnote: { drops: ["aside"], unconditional: !0 },
  cover: { drops: ["image"] },
  pullquote: { drops: ["blockquote", "aside"] },
  epigraph: { drops: ["blockquote"] }
}, _a = ["abbreviation", "biblioref", "glossref", "noteref", "pagebreak"], $a = ["biblioref", "glossref"], Ga = ["audio", "video", "image", "figure", "math", "table", "cover"], qa = ["cell", "rowheader"], Ha = ["separator"], Oe = new Set(Da), Ct = new Set(_a), Ka = new Set(Ga), ti = new Set(qa), Qa = new Set(Ha), he = new Set($a);
function Wa(n, e) {
  const t = Ui.createInstance();
  return t.init({
    lng: n,
    resources: { [n]: { translation: e } },
    interpolation: { escapeValue: !1 }
  }), t;
}
function Ja(n, e, t) {
  if (!e) return n;
  const i = { ...n };
  for (const s of Object.keys(e))
    i[s] = t(n[s], e[s]);
  return i;
}
function ni(n, e) {
  if (typeof e == "string" || typeof n != "object") return e;
  const t = { ...n };
  for (const i of Object.keys(e))
    t[i] = ni(n[i], e[i]);
  return t;
}
function Za(n, e) {
  return Ja(n, e, ni);
}
function ii(n, e = [], t = /* @__PURE__ */ new Map()) {
  for (const i of n)
    t.set(i, e), i.children && ii(i.children, [i, ...e], t);
  return t;
}
async function si(n, e) {
  const t = e.contextualizationLocale ?? "en", i = Za(
    await Pa(t),
    e.contextualization?.contextualizations
  );
  return {
    i18n: Wa(t, i),
    contextualizationLanguage: Ia(t),
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
    segmenter: e.segmentation?.segmenter ?? ei,
    // Per-key override, not an additive union — each key holds one whole rule.
    substitutions: { ...Ca, ...e.substitutions },
    blockStarts: /* @__PURE__ */ new Set(),
    tableRowNumbers: /* @__PURE__ */ new Map(),
    tableCellHeaders: /* @__PURE__ */ new Map(),
    synthetic: /* @__PURE__ */ new Set(),
    ancestorChains: ii(n),
    pendingRange: /* @__PURE__ */ new Map(),
    edgeSubstitutedLocate: /* @__PURE__ */ new WeakMap(),
    aliasLocates: /* @__PURE__ */ new WeakSet(),
    placeholderPieces: /* @__PURE__ */ new Map()
  };
}
const Xa = /<lang xml:lang="[^"]*">([\s\S]*?)<\/lang>/g;
function ai(n) {
  return n.replace(Xa, "$1");
}
function Et(n, e) {
  return n === void 0 ? void 0 : ji(e, n) ?? n;
}
function G(n, e) {
  return Et(e.language === "none" ? e.contentLanguage : n ?? e.contentLanguage, e.languageOverrides);
}
function Rt(n, e) {
  return n === e || n !== void 0 && e !== void 0 && n.toLowerCase() === e.toLowerCase();
}
function lt(n, e) {
  return P(n)[0] === P(e)[0];
}
function ct(n, e, t, i) {
  const { language: s } = e;
  return s === void 0 ? !0 : oi(e, t) ? li(e) ? (n.wordless = s, !0) : !i && n.content !== void 0 && !lt(n.content, s) ? !1 : (n.entry = s, !0) : n.content !== void 0 && !Rt(n.content, s) || !i && n.entry !== void 0 && !lt(s, n.entry) ? !1 : (n.content = s, !0);
}
function ri(n, e, t) {
  const i = {};
  for (const s of n)
    if (!ct(i, s, e, t)) return null;
  return i.content ?? i.entry ?? i.wordless;
}
function Ya(n, e) {
  return ri(n, e, !1);
}
function oi(n, e) {
  return e.synthetic.has(n) && Rt(n.language, e.contextualizationLanguage);
}
function li(n) {
  return !/[\p{L}\p{N}]/u.test(n.plain ?? Ie(n.ssml ?? ""));
}
function ci(n, e) {
  return ri(n, e, e.format === "ssml");
}
function ui(n, e, t) {
  const i = n.ssml ?? "";
  return !e || !n.language || !oi(n, t) || li(n) || lt(n.language, e) ? i : `<lang xml:lang="${kn(n.language)}">${i}</lang>`;
}
function It(n, e) {
  const t = e.format === "ssml", i = [];
  let s = 0, a = {};
  return n.forEach((r, o) => {
    ct(a, r, e, t) || (i.push([s, o]), s = o, a = {}, ct(a, r, e, t));
  }), n.length > 0 && i.push([s, n.length]), i;
}
function hi(n, e) {
  return n.replace(/<lang xml:lang="([^"]*)">/g, (t, i) => {
    const s = Et(i, e);
    return s === i ? t : `<lang xml:lang="${s}">`;
  });
}
function U(n) {
  return n.role ? [...n.role] : [];
}
function Te(n) {
  return n.role?.has("math") ? void 0 : n.text;
}
function Fe(n) {
  const e = n.description?.text;
  if (e)
    return e.plain ?? (e.ssml !== void 0 ? x(e.ssml) : void 0);
}
function di(n) {
  return n.description?.text?.language;
}
function xe(n, e = n) {
  let t = "", i = "";
  const s = [];
  return n.forEach((a, r) => {
    const o = e[r];
    if (o.length === 1 && ys(o) && i.endsWith(o)) {
      s.push({ start: t.length, end: t.length });
      return;
    }
    i && !me(o) && !vs(i) && !/\s$/.test(i) && !/^\s/.test(o) && (t += " ", i += " ");
    const l = t.length;
    t += a, i += o, s.push({ start: l, end: t.length });
  }), { joined: t, ranges: s };
}
function Y(n, e) {
  const t = Ni(n), i = O(n, e.ancestorChains)?.ref;
  if (t) {
    const s = { cssSelector: t };
    return i?.href !== void 0 && (s.href = i.href), rt(s);
  }
  return i && rt(i);
}
function gi(n, e, t) {
  const i = [];
  return n.forEach((s, a) => {
    if (s.offsets) {
      i.push(...s.offsets);
      return;
    }
    if (t.synthetic.has(s)) return;
    const r = e[a];
    if (!r || Array.isArray(r)) return;
    const o = O(r, t.ancestorChains);
    if (!o) return;
    const l = t.format === "ssml" ? s.ssml : s.plain;
    if (!l) return;
    const c = t.pendingRange.get(s), u = K(r) ? Y(r, t) ?? o.ref : ee(o.ref, l);
    i.push({ start: c?.start ?? 0, end: c?.end ?? l.length, locate: u });
  }), i;
}
function an(n, e, t, i) {
  const s = i.edgeSubstitutedLocate.get(n);
  if (s) return s[t];
  if (!(!e || Array.isArray(e) || !K(e)))
    return Y(e, i);
}
function er(n, e, t) {
  const i = n.map((l, c) => {
    if (l.locate) return l.locate;
    if (t.synthetic.has(l)) return;
    const u = e[c];
    if (!u || Array.isArray(u)) return;
    const d = t.format === "ssml" ? l.ssml : l.plain;
    if (d)
      return K(u) ? O(u, t.ancestorChains) && Y(u, t) : At(O(u, t.ancestorChains), d);
  }), s = i.findIndex((l) => l !== void 0);
  if (s === -1) return;
  let a = i.length - 1;
  for (; i[a] === void 0; ) a--;
  if (s === a) return i[s];
  const r = e[s], o = e[a];
  if (r && o && !Array.isArray(r) && !Array.isArray(o)) {
    const l = O(r, t.ancestorChains), c = O(o, t.ancestorChains);
    return Lt(l, c, i[s]);
  }
  return i[s];
}
function _e(n, e, t) {
  const i = [], s = [], a = [];
  for (let f = 0; f < n.length; f++) {
    const p = n[f], g = t.format === "ssml" ? p.ssml : p.plain;
    g && (i.push(g), s.push(p), a.push(e[f]));
  }
  if (i.length === 0) return;
  const r = ci(s, t);
  if (r === null) return;
  const { joined: o } = xe(t.format === "ssml" ? s.map((f) => ui(f, r, t)) : i), l = t.format === "ssml" ? { ssml: o } : { plain: o };
  r && (l.language = r), n.some((f) => t.synthetic.has(f)) && t.synthetic.add(l);
  const c = gi(s, a, t);
  c.length > 0 && (l.offsets = c);
  const u = er(s, a, t);
  u && (l.locate = u);
  const d = an(s[0], a[0], "leading", t), h = an(s[s.length - 1], a[s.length - 1], "trailing", t);
  return (d || h) && t.edgeSubstitutedLocate.set(l, { leading: d, trailing: h }), l;
}
function Pt(n, e, t, i) {
  if (e === "plain" && t !== "block-level" && t !== "none" && n.ssml && Bn(n.ssml))
    return gt(n.ssml, n.language).map((r) => {
      const o = { plain: r.plain }, l = G(r.language, i);
      return l && (o.language = l), i.pendingRange.set(o, { start: r.start, end: r.end }), o;
    });
  const s = {}, a = G(n.language, i);
  return a && (s.language = a), e === "ssml" ? s.ssml = n.ssml ? hi(n.ssml, i.languageOverrides) : B(n.plain ?? "") : s.plain = n.plain ?? x(n.ssml ?? ""), (t === "block-level" || t === "none") && s.ssml && (s.ssml = ai(s.ssml)), [s];
}
function ve(n, e) {
  return e !== "ssml" ? n : n.replace(/<[^>]+>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
}
function ee(n, e) {
  const t = n.cssSelector ?? n.domRange?.start.cssSelector;
  if (!t) return { ...n, text: { highlight: e } };
  const i = { cssSelector: t, text: { highlight: e } };
  return n.href !== void 0 && (i.href = n.href), i;
}
function O(n, e) {
  const t = Dt(n);
  if (t) return { own: !0, ref: t };
  for (const i of e.get(n) ?? []) {
    const s = Dt(i);
    if (s) return { own: !1, ref: s };
  }
}
function At(n, e) {
  if (n)
    return n.own ? n.ref : ee(n.ref, e);
}
function Lt(n, e, t) {
  return (n && e ? zi(n.ref, e.ref) : void 0) ?? t;
}
function fi(n, e, t) {
  const { ancestorChains: i } = t, s = /* @__PURE__ */ new Map();
  for (const a of e)
    a && !Array.isArray(a) && s.set(a, (s.get(a) ?? 0) + 1);
  return n.map((a, r) => {
    if (a.offsets) return a;
    const o = e[r], l = a.plain ?? a.ssml ?? "";
    if (Array.isArray(o)) {
      const [h, f] = o, p = O(h, i), g = O(f, i), v = Lt(p, g, At(p, l));
      return v ? { ...a, locate: v } : a;
    }
    const c = o, u = c ? O(c, i) : void 0;
    if (!u) return a;
    const d = { ...a, locate: u.ref };
    if (!t.synthetic.has(a)) {
      const h = t.pendingRange.get(a), f = h !== void 0 || c && (s.get(c) ?? 0) > 1, p = c && K(c) ? Y(c, t) : void 0;
      d.locate = p ?? (u.own && !f ? u.ref : ee(u.ref, l)), d.offsets = [{ start: h?.start ?? 0, end: h?.end ?? l.length, locate: d.locate }];
    }
    return d;
  });
}
function Vt(n) {
  const e = Me(Te(n));
  return e ? e.plain ?? (e.ssml ? x(e.ssml) : "") : "";
}
function tr(n) {
  const e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map();
  let i = 0, s;
  return n.forEach((a, r) => {
    e.set(a, r + 1);
    const o = a.children ?? [];
    if (i = Math.max(i, o.length), o.some((l) => l.role?.has("columnheader"))) {
      s = o.map(Vt);
      return;
    }
    s && o.forEach((l, c) => {
      if (!l.role?.has("cell") && !l.role?.has("rowheader")) return;
      const u = s[c];
      u && t.set(l, u);
    });
  }), { lines: n.length, columns: i, rowNumbers: e, cellHeaders: t };
}
function pi(n, e) {
  const t = e.format === "ssml" ? { ssml: B(n) } : { plain: n };
  return e.synthetic.add(t), t;
}
function j(n, e) {
  const t = pi(n, e), i = e.language === "none" ? G(void 0, e) : e.contextualizationLanguage;
  return i && (t.language = i), t;
}
function ut(n, e, t) {
  const i = pi(n, t), s = G(di(e), t);
  return s && (i.language = s), i;
}
function W(n, e, t, i) {
  n.push(...i);
  for (let s = 0; s < i.length; s++) e.push(t);
}
function Ue(n, e, t, i, s, a, r) {
  r ? (s.some((o) => t.blockStarts.has(o)) && t.blockStarts.add(r), W(n, e, a[0] ?? i, [r])) : (n.push(...s), e.push(...a));
}
function H(n, e, t, i) {
  const s = t ? `${e}.${t}` : void 0;
  if (s && n.i18n.exists(s)) return n.i18n.t(s, i);
  if (n.i18n.exists(e)) return n.i18n.t(e, i);
}
function Ot(n, e) {
  return ti.has(n) ? !0 : e.contextualize.has(n);
}
function mi(n, e, t) {
  return e.some((i) => {
    const s = Fa[i];
    return s?.drops.includes(n) ? s.unconditional || Ot(i, t) : !1;
  });
}
function pe(n, e, t, i, s) {
  const a = e.lastIndexOf(t);
  if (a === -1) return;
  const r = O(i, s.ancestorChains);
  if (!r) return;
  const o = ee(r.ref, t);
  n.offsets = [{ start: a, end: a + t.length, locate: o }], n.locate = r.own ? r.ref : o;
}
function Ke(n, e, t, i, s, a) {
  const r = a?.value;
  if (r !== void 0 && r === Vt(t)) {
    const l = G(t.text?.language, i);
    l && (n.language = l), i.synthetic.delete(n), pe(n, e, r, t, i);
    return;
  }
  const o = a?.description;
  o !== void 0 && o === Fe(t) && (s === "figure" || s === "table") && pe(n, e, o, t, i);
}
function rn(n, e, t, i, s, a, r, o) {
  if (!Ot(s, i)) return;
  if ((i.i18n.exists(`${s}.block.start`) || i.i18n.exists(`${s}.block.end`)) && i.contextualizationShapes[s] !== "inline") {
    const c = a === "before" ? `${s}.block.start` : `${s}.block.end`;
    W(n, e, t, ln(c, r, o, t, s, i));
    return;
  }
  a === "before" && W(n, e, t, ln(`${s}.inline`, r, o, t, s, i));
}
const on = "\0";
function ln(n, e, t, i, s, a) {
  const r = H(a, n, e, t);
  if (!r) return [];
  const o = t?.description, l = a.language !== "none" && o !== void 0 && o === Fe(i) ? G(di(i), a) : void 0, c = l ? H(a, n, e, { ...t, description: on })?.split(on) : void 0;
  if (!l || !c || c.length < 2) {
    const h = j(r, a);
    return Ke(h, r, i, a, s, t), [h];
  }
  if (P(l)[0] === P(a.contextualizationLanguage)[0]) {
    const h = j(r, a);
    return h.language = l, Ke(h, r, i, a, s, t), [h];
  }
  const u = `<lang xml:lang="${kn(l)}">${B(o)}</lang>`, d = c.map((h) => B(h)).join(u);
  if (a.format === "ssml") {
    const h = j(r, a);
    return h.ssml = d, Ke(h, r, i, a, s, t), [h];
  }
  return gt(d, a.contextualizationLanguage).map((h) => {
    if (h.language !== l) return j(h.plain, a);
    const f = ut(h.plain, i, a);
    return (s === "figure" || s === "table") && pe(f, h.plain, o, i, a), f;
  });
}
function cn(n, e, t, i) {
  const s = `${e}.parts.${t}`;
  return n.i18n.exists(s, { count: i }) ? n.i18n.t(s, { count: i }) : String(i);
}
function nr(n) {
  const e = Fe(n);
  return e === void 0 ? { variantKey: "unlabelled" } : { variantKey: "labelled", params: { description: e } };
}
function un(n, e) {
  const t = e.tableCellHeaders.get(n);
  return {
    variantKey: t !== void 0 ? "withHeader" : "withoutHeader",
    params: { header: t ?? "", value: Vt(n) }
  };
}
const ir = {
  table: (n, e) => {
    const t = (n.children ?? []).filter((s) => s.role?.has("row")), i = tr(t);
    for (const [s, a] of i.rowNumbers) e.tableRowNumbers.set(s, a);
    for (const [s, a] of i.cellHeaders) e.tableCellHeaders.set(s, a);
    return {
      params: {
        lines: cn(e, "table", "lines", i.lines),
        columns: cn(e, "table", "columns", i.columns)
      }
    };
  },
  row: (n, e) => ({ params: { count: String(e.tableRowNumbers.get(n) ?? "") } }),
  cell: un,
  rowheader: un
};
function hn(n, e, t) {
  const i = nr(e);
  let s = i.variantKey, a = i.params;
  const r = ir[n]?.(e, t);
  r && (r.variantKey && (s = r.variantKey), a = { ...a, ...r.params });
  const o = t.contextualizationParams?.(n, e);
  return o && (a = { ...a, ...o }), { variantKey: s, params: a };
}
const dn = "[\\u0391-\\u03A9\\u03B1-\\u03C9\\u03D8-\\u03E1]", sr = "[\\u0374\\u02B9\\u0384']", Qe = "[\\u05D0-\\u05EA]", gn = "[\\u0400-\\u0481\\u048A-\\u04FF]", ar = [
  new RegExp("^\\p{Nd}+$", "u"),
  new RegExp("^\\p{Nl}+$", "u"),
  /^(?=[MDCLXVI])M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i,
  /^[〇零一二三四五六七八九十百千万]+$/u,
  /^[፩-፼]+$/u,
  new RegExp(`^${Qe}[\\u05F3']$`, "u"),
  new RegExp(`^${Qe}+[\\u05F4"]${Qe}$`, "u"),
  new RegExp(`^(?:\\u0375${dn})*${dn}+${sr}$`, "u"),
  /^(?:[Ա-Ֆա-և]̅)+$/u,
  new RegExp(`^\\u0482?${gn}+\\u0483${gn}*$`, "u")
];
function rr(n) {
  const e = n.trim();
  return e.length > 0 && ar.some((t) => t.test(e));
}
function fn(n, e) {
  return e.skip.size > 0 && n.some((t) => e.skip.has(t) && !Ct.has(t) && !mi(t, n, e));
}
function Tt(n, e) {
  const t = n.find((i) => Ct.has(i));
  return t === void 0 ? void 0 : e.interruptions[t] ?? "after";
}
function or(n, e) {
  const t = Me(n.text);
  if (!t) return [];
  const i = t.plain ?? x(t.ssml ?? "");
  if (rr(i)) {
    const s = H(e, "pagebreak.number", void 0, { number: i.trim() });
    if (s !== void 0) return [j(s, e)];
  }
  return Pt(t, e.format, e.language, e);
}
function pn(n) {
  n.plain !== void 0 && (n.plain += "."), n.ssml !== void 0 && (n.ssml += ".");
}
function lr(n, e) {
  const t = or(n, e);
  if (!e.contextualize.has("pagebreak")) return t;
  const i = e.i18n.exists("pagebreak.block.start") ? "pagebreak.block.start" : "pagebreak.inline", s = H(e, i);
  if (s === void 0) return t;
  const a = j(s, e);
  if (t.length === 0) return [a];
  const r = _e([a, ...t], [void 0, ...t.map(() => n)], e);
  return r ? (pn(r), [r]) : (pn(t[t.length - 1]), [a, ...t]);
}
function cr(n, e) {
  const t = Me(Te(n));
  return t ? Pt(t, e.format, e.language, e) : [];
}
const We = "", ke = "";
function xt(n) {
  return U(n).includes("term") || (n.children ?? []).some(xt);
}
const ht = /* @__PURE__ */ new Set();
function vi(n) {
  return xt(n) ? [n, ...(n.children ?? []).flatMap(vi)] : [];
}
function yi(n, e, t, i, s, a, r) {
  if (e.length === 0) return;
  const o = U(n).find((m) => he.has(m)), l = e.length > 1 ? e.find(xt) : void 0, c = e.filter((m) => m !== l), u = o && s.contextualize.has(o) ? H(s, `${o}.inline`) : void 0, d = o && r && l ? H(s, `${o}.term`, void 0, { term: We, value: ke }) : void 0, h = r ? e : c;
  if (u === void 0 && !d) {
    $(h, t, i, s, a);
    return;
  }
  const f = U(h[0]).some((m) => Oe.has(m)) && !a, p = [], g = [];
  u !== void 0 && (p.push(j(u, s)), g.push(n));
  const v = a || f, S = [...h, ...l ? vi(l) : []];
  S.forEach((m) => ht.add(m));
  for (const m of (d ?? ke).split(new RegExp(`(${We}|${ke})`)))
    m === We ? $([l], p, g, s, v) : m === ke ? $(c, p, g, s, v) : m && (p.push(j(m, s)), g.push(n));
  S.forEach((m) => ht.delete(m)), f && p.length > 0 && s.blockStarts.add(p[0]);
  for (const [m, C] of It(p, s)) {
    const y = p.slice(m, C), b = g.slice(m, C), k = y.length > 1 ? _e(y, b, s) : void 0;
    Ue(t, i, s, n, y, b, k);
  }
}
function Si(n, e, t, i, s) {
  n.forEach((a, r) => {
    const o = r === 0 ? s : !1;
    "ref" in a ? yi(a.ref, a.targets, e, t, i, o, !0) : Ut(a.node, e, t, i, o);
  });
}
function bi(n, e) {
  const t = Tt(U(n), e);
  return t !== void 0 && t !== "inline";
}
function ur(n, e, t, i) {
  const s = O(t, i.ancestorChains);
  if (!s) return;
  const a = rt(ee(s.ref, x(e)));
  i.aliasLocates.add(a);
  for (const r of n) {
    const o = i.format === "ssml" ? x(r.ssml ?? "") : r.plain;
    r.locate = a, r.offsets = [{ start: 0, end: o?.length ?? 0, locate: a }], i.edgeSubstitutedLocate.set(r, { leading: a, trailing: a });
  }
}
function hr(n, e, t, i, s, a, r) {
  const o = n.text?.language, l = G(o, s), c = new Map((n.children ?? []).map((y) => [y.id, y])), u = [], d = [], h = [], f = /* @__PURE__ */ new Set(), p = /* @__PURE__ */ new Set(), g = /* @__PURE__ */ new Set(), v = s.segmentation === "sentence", S = s.interruptions.abbreviation === "never", m = s.interruptions.abbreviation === "inline", C = (y, b) => {
    if (y.abbreviation !== "alias") return;
    const k = u.slice(b);
    ur(k, y.abbreviationText, n, s), k.forEach((w) => g.add(w));
  };
  for (let y of Ds(e)) {
    if (y.abbreviation && (y.abbreviation === "text" ? m : S)) continue;
    if (y.abbreviation === "alias" && !m && (y = { ...y, ssml: y.parenthesizedSsml }), y.placeholderId !== void 0) {
      const w = c.get(y.placeholderId);
      if (!w) continue;
      if (bi(w, s)) {
        const E = U(w), R = E.some((V) => he.has(V));
        if (R)
          for (const V of cr(w, s))
            u.push(V), d.push(w);
        const A = R ? Tt(E, s) === "never" || !w.children?.length ? [] : [{ ref: w, targets: w.children }] : [{ node: w }];
        for (const V of A)
          if (h.push(V), v) {
            const Q = u.length;
            Si([V], u, d, s, h.length === 1 && (a || r)), u.slice(Q).forEach((N) => p.add(N));
          }
      } else {
        const E = u.length;
        Ut(w, u, d, s, a), U(w).some((R) => Ct.has(R)) && u.slice(E).forEach((R) => f.add(R));
      }
      continue;
    }
    if (!y.ssml) continue;
    const b = u.length;
    if (s.format === "plain" && s.language !== "block-level" && s.language !== "none" && Bn(y.ssml)) {
      for (const w of gt(y.ssml, o)) {
        const E = { plain: w.plain }, R = G(w.language, s);
        R && (E.language = R), u.push(E), d.push(n);
      }
      C(y, b);
      continue;
    }
    const k = {};
    l && (k.language = l), s.format === "ssml" ? k.ssml = hi(y.ssml, s.languageOverrides) : k.plain = x(y.ssml), (s.language === "block-level" || s.language === "none") && k.ssml && (k.ssml = ai(k.ssml)), u.push(k), d.push(n), C(y, b);
  }
  if (v && h.length + f.size + g.size > 0)
    return u.forEach((y) => {
      const b = f.has(y) ? "inline" : p.has(y) ? "after" : g.has(y) ? "alias" : void 0;
      s.placeholderPieces.set(y, { node: n, placement: b });
    }), Ue(t, i, s, n, u, d, void 0), [];
  for (const [y, b] of It(u, s)) {
    const k = u.slice(y, b), w = d.slice(y, b), E = k.length > 1 ? _e(k, w, s) : void 0;
    Ue(t, i, s, n, k, w, E);
  }
  return h;
}
function Ut(n, e, t, i, s) {
  const a = U(n), r = Fe(n), o = Tt(a, i) === "never", l = o && a.some((g) => he.has(g));
  if (fn(a, i) || o && !l) return;
  const c = a.some((g) => Oe.has(g)), u = c && !s, d = e.length, h = ht.has(n) ? [] : a.filter(
    (g) => g !== "footnote" && g !== "pagebreak" && !he.has(g) && !mi(g, a, i)
  ), f = a.some((g) => Ka.has(g) && i.contextualize.has(g)), p = a.includes("table") && r !== void 0 && !f;
  if (p) {
    const g = ut(r, n, i);
    pe(g, r, r, n, i), W(e, t, n, [g]);
  }
  for (const g of h) {
    if (g === "figure" && r === void 0) continue;
    const { variantKey: v, params: S } = hn(g, n, i);
    rn(e, t, n, i, g, "before", v, S);
  }
  if (a.includes("noteref"))
    for (const g of n.children ?? []) {
      const v = U(g);
      if (!fn(v, i))
        if (v.includes("footnote")) {
          const S = i.contextualize.has("footnote"), m = i.i18n.exists("footnote.block.start") || i.i18n.exists("footnote.block.end"), C = v.some((V) => Oe.has(V)) && !s && i.interruptions.noteref !== "inline", y = S ? H(i, m ? "footnote.block.start" : "footnote.inline") : void 0, b = S && (y !== void 0 || m), k = [], w = [];
          y !== void 0 && (k.push(j(y, i)), w.push(g));
          const E = [], R = [];
          if ($([g], E, R, i, s || C), C && E.length > 0 && i.blockStarts.add(E[0]), k.push(...E), w.push(...R), b && m) {
            const V = H(i, "footnote.block.end");
            V !== void 0 && (k.push(j(V, i)), w.push(g));
          }
          const A = b && k.length > 1 ? _e(k, w, i) : void 0;
          Ue(e, t, i, g, k, w, A);
        } else
          $([g], e, t, i, s);
    }
  else if (!a.some((g) => Qa.has(g))) {
    const g = Te(n)?.ssml, v = a.some((S) => ti.has(S) && Ot(S, i));
    if (g && Ms(g) && !v) {
      const S = hr(n, g, e, t, i, s, c);
      if (S.length > 0) {
        const m = s || c && e.length > d;
        Si(S, e, t, i, m);
      }
    } else if (a.includes("pagebreak")) {
      if (W(e, t, n, lr(n, i)), n.children) {
        const S = s || c && e.length > d;
        $(n.children, e, t, i, S);
      }
    } else {
      const S = v ? void 0 : Me(Te(n));
      if (S && W(e, t, n, Pt(S, i.format, i.language, i)), n.children && !l) {
        const m = s || c && e.length > d;
        a.some((C) => he.has(C)) ? yi(n, n.children, e, t, i, m, bi(n, i)) : $(n.children, e, t, i, m);
      }
    }
  }
  if (u && e.length > d && i.blockStarts.add(e[d]), r !== void 0 && !f && !p) {
    const g = ut(r, n, i);
    a.includes("figure") && pe(g, r, r, n, i), W(e, t, n, [g]);
  }
  for (const g of h) {
    if (g === "figure" && r === void 0) continue;
    const { variantKey: v, params: S } = hn(g, n, i);
    rn(e, t, n, i, g, "after", v, S);
  }
}
function $(n, e, t, i, s) {
  n.forEach((a, r) => Ut(a, e, t, i, r === 0 ? s : !1));
}
const dr = Nn;
async function wi(n, e, t, i) {
  const s = dr(n);
  let a = "";
  const r = [];
  for (const h of s)
    r.push(a.length), h.kind === "text" ? a += h.text : h.kind === "paired" && (a += h.innerText);
  if (!a) return;
  const o = await t(e, a, i);
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
      const b = B(y);
      c += p ? p(b) : b, g = m, C && (l.push(c), c = "", u++);
    }
  }
  return s.forEach((h, f) => {
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
function Nt(n, e) {
  const t = e.segmenter === ei ? Ma(n) : n;
  return Cn(e.segmentationSuppressions, t);
}
async function gr(n, e) {
  const t = n.language ?? "en", i = Nt(t, e), s = e.format === "ssml" ? n.ssml : n.plain;
  if (!s) return;
  const a = await e.segmenter(t, ve(s, e.format), i);
  if (a.length <= 1) return;
  if (e.format !== "ssml") return a.map((o) => ({ text: o.text, start: o.start, end: o.contentEnd }));
  const r = await wi(s, t, e.segmenter, i);
  if (r)
    return a.map((o, l) => ({ text: r[l], start: o.start, end: o.contentEnd }));
}
const mn = /* @__PURE__ */ new Set([
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
function vn(n) {
  return n ? U(Array.isArray(n) ? n[1] : n) : [];
}
function ki(n, e) {
  return Array.isArray(n) ? n[e === "leading" ? 0 : 1] : n;
}
function yn(n, e, t) {
  const i = ki(n, e);
  return (t.ancestorChains.get(i) ?? []).filter((s) => U(s).some((a) => a !== "presentation"));
}
function Sn(n, e, t) {
  const i = ki(n, e);
  return [i, ...t.ancestorChains.get(i) ?? []].find((s) => U(s).some((a) => Oe.has(a)));
}
function fr(n, e) {
  return n.length === e.length && n.every((t, i) => t === e[i]);
}
function bn(n, e, t, i) {
  const s = i.edgeSubstitutedLocate.get(e)?.[t];
  return s && !i.aliasLocates.has(s) ? !0 : !!n && !Array.isArray(n) && K(n);
}
function se(n, e) {
  return e.placeholderPieces.get(n)?.placement === "inline";
}
function Ci(n, e) {
  return e.placeholderPieces.get(n)?.placement === "alias";
}
function pr(n, e) {
  return e.placeholderPieces.get(n)?.placement === "after";
}
function Ei(n, e, t, i) {
  for (const { piece: s, source: a } of n.get(e) ?? [])
    t.push(s), i.push(a);
  n.delete(e);
}
function dt(n, e, t) {
  const i = t.placeholderPieces.get(n)?.node;
  return i !== void 0 && i === t.placeholderPieces.get(e)?.node;
}
function mr(n, e, t, i, s) {
  const a = s.format === "ssml" ? n.ssml : n.plain, r = s.format === "ssml" ? t.ssml : t.plain;
  return !a || !r ? !1 : dt(n, t, s) ? !0 : !(!Rt(n.language ?? "en", t.language ?? "en") || s.synthetic.has(n) || s.synthetic.has(t) || !e || !i || !s.segmentationReconstruct && Sn(e, "trailing", s) !== Sn(i, "leading", s) || vn(e).some((o) => mn.has(o)) || vn(i).some((o) => mn.has(o)) || !fr(yn(e, "trailing", s), yn(i, "leading", s)) || bn(e, n, "trailing", s) || bn(i, t, "leading", s));
}
async function wn(n, e, t, i, s) {
  const a = t.synthetic.has(n) ? void 0 : await gr(n, t);
  if (!a) {
    i.push(n), s.push(e);
    return;
  }
  const r = t.blockStarts.has(n);
  r && t.blockStarts.delete(n);
  const o = Array.isArray(e) ? void 0 : e, l = o ? O(o, t.ancestorChains) : void 0, c = o && K(o) ? Y(o, t) : void 0, u = t.edgeSubstitutedLocate.get(n);
  a.forEach(({ text: d, start: h, end: f }, p) => {
    const g = { ...n, [t.format]: d }, v = (p === 0 ? u?.leading : void 0) ?? (p === a.length - 1 ? u?.trailing : void 0) ?? c;
    if (v && l)
      g.locate = v, g.offsets = [{ start: h, end: f, locate: v }];
    else if (l) {
      const S = t.format === "ssml" ? ve(d, t.format) : d, m = ee(l.ref, S);
      g.locate = m, g.offsets = [{ start: h, end: f, locate: m }];
    }
    r && p === 0 && t.blockStarts.add(g), i.push(g), s.push(e);
  });
}
function q(n, e) {
  let t = 0;
  for (; t < n.length - 1 && n[t + 1].start <= e; ) t++;
  return t;
}
async function vr(n, e, t, i) {
  const s = n.map((c) => ve(e.format === "ssml" ? c.ssml : c.plain, e.format)), { joined: a, ranges: r } = xe(s), o = await e.segmenter(t, a, i), l = new Array(n.length - 1).fill(!1);
  for (const c of o) {
    const u = q(r, c.start), d = c.end > c.start ? q(r, c.end - 1) : u;
    for (let h = u; h < d; h++) l[h] = !0;
  }
  return l;
}
function yr(n, e, t) {
  const i = [...e];
  return n.forEach((s, a) => {
    if (!se(s, t)) return;
    const r = a > 0 && dt(n[a - 1], s, t), o = a < n.length - 1 && dt(s, n[a + 1], t);
    r && !i[a - 1] ? i[a - 1] = !0 : o && (i[a] = !0);
  }), i;
}
function Sr(n, e, t, i, s) {
  const a = (c) => se(t[q(i, c)], s), r = (c, u) => q(i, c) === q(i, u) && Ci(t[q(i, c)], s), o = [];
  let l;
  return e.forEach((c, u) => {
    l ??= c;
    const d = e[u + 1];
    d && (a(c.contentEnd - 1) || a(d.start) || r(c.contentEnd - 1, d.start)) || (o.push({ text: n.slice(l.start, c.contentEnd), start: l.start, end: c.end, contentEnd: c.contentEnd }), l = void 0);
  }), o;
}
function br(n, e, t, i, s, a, r) {
  const o = [];
  for (let l = s; l <= a; l++) {
    if (se(n[l], r) || Ci(n[l], r)) {
      o.push(...gi([n[l]], [e[l]], r));
      continue;
    }
    const c = O(e[l], r.ancestorChains);
    if (!c) continue;
    const u = t[l], d = K(e[l]) ? Y(e[l], r) : void 0, h = Math.max(u.start, i.start), f = Math.min(u.end, l === a ? i.contentEnd : i.end);
    if (f <= h) continue;
    const p = h - u.start, g = f - u.start, v = ve(r.format === "ssml" ? n[l].ssml : n[l].plain, r.format), S = d ?? ee(c.ref, v.slice(p, g));
    !d && p > 0 && (S.text = { ...S.text, before: v.slice(0, p) }), !d && g < v.length && (S.text = { ...S.text, after: v.slice(g) }), o.push({ start: p, end: g, locate: S });
  }
  return o;
}
function Ri(n, e) {
  const t = Ya(n, e);
  return t !== null ? t ?? "en" : n.find((i) => !se(i, e))?.language ?? n[0].language ?? "en";
}
function wr(n, e, t, i, s) {
  const a = q(t, n.start), r = n.end > n.start ? q(t, n.end - 1) : a, o = It(e.slice(a, r + 1), s);
  return o.map(([l, c], u) => {
    const d = a + l, h = a + c - 1, f = u === o.length - 1, p = u === 0 ? n.start : t[d].start, g = f ? n.contentEnd : t[h].end, v = f ? n.end : t[h + 1].start, S = ci(e.slice(d, h + 1), s) ?? void 0, m = { text: i.slice(p, g), start: p, end: v, contentEnd: g }, C = o.length > 1 && d === h && se(e[d], s);
    return { boundary: m, startIdx: d, endIdx: h, language: S, sentenceEnd: f ? n.end : void 0, isolated: C };
  });
}
async function kr(n, e, t, i, s, a) {
  const r = Ri(n, t), o = Nt(r, t), l = n.map((m) => ve(t.format === "ssml" ? m.ssml : m.plain, t.format)), { joined: c, ranges: u } = xe(l), d = Sr(c, await t.segmenter(r, c, o), n, u, t), f = (d.length > 0 ? d : [{ text: c, start: 0, end: c.length, contentEnd: c.length }]).flatMap((m) => wr(m, n, u, c, t));
  let p, g;
  if (t.format === "ssml") {
    const m = /* @__PURE__ */ new Map();
    for (const y of f) for (let b = y.startIdx; b <= y.endIdx; b++) m.set(b, y.language);
    g = xe(n.map((y, b) => ui(y, m.get(b), t)), l).joined;
    const C = f.map((y) => y.boundary);
    p = f.length > 1 ? await wi(g, r, async () => C, o) : void 0;
  }
  const v = new Set(n.filter((m) => t.blockStarts.has(m))), S = (m, C) => {
    if (m !== void 0)
      for (let y = 0; y < n.length; y++)
        (u[y].end <= m || C === f.length - 1) && Ei(a, y, i, s);
  };
  f.forEach(({ boundary: m, startIdx: C, endIdx: y, language: b, sentenceEnd: k, isolated: w }, E) => {
    if (w) {
      i.push(n[C]), s.push(e[C]), S(k, E);
      return;
    }
    const R = t.format === "ssml" ? p ? p[E] : g : m.text, A = { [t.format]: R }, V = t.language === "none" ? G(void 0, t) : b ?? "en";
    V && (A.language = V), n.slice(C, y + 1).filter((re) => v.delete(re)).length > 0 && t.blockStarts.add(A);
    const N = br(n, e, u, m, C, y, t);
    N.length > 0 && (A.offsets = N);
    const ae = [...Array(y - C + 1).keys()].map((re) => C + re).filter((re) => !se(n[re], t)), M = ae[0] ?? C, ye = ae[ae.length - 1] ?? y, zt = O(e[M], t.ancestorChains), Bt = e[M], jt = (K(Bt) ? Y(Bt, t) : void 0) ?? At(zt, R), Mt = M !== ye ? Lt(zt, O(e[ye], t.ancestorChains), jt) : jt;
    Mt && (A.locate = Mt), i.push(A), s.push(M === ye ? e[M] : [e[M], e[ye]]), S(k, E);
  });
}
async function Ii(n, e, t) {
  if (t.segmentation !== "sentence") return { out: n, sources: e };
  const i = [], s = [];
  let a = 0;
  for (; a < n.length; ) {
    let r = a;
    for (; r + 1 < n.length && mr(n[r], e[r], n[r + 1], e[r + 1], t); ) r++;
    if (r === a) {
      await wn(n[a], e[a], t, i, s), a = r + 1;
      continue;
    }
    const o = [], l = [], c = /* @__PURE__ */ new Map();
    for (let p = a; p <= r; p++)
      if (!pr(n[p], t))
        o.push(n[p]), l.push(e[p]);
      else if (o.length === 0)
        i.push(n[p]), s.push(e[p]);
      else {
        const g = o.length - 1;
        c.set(g, [...c.get(g) ?? [], { piece: n[p], source: e[p] }]);
      }
    if (o.length === 0) {
      a = r + 1;
      continue;
    }
    const u = Ri(o, t), d = await vr(o, t, u, Nt(u, t)), h = yr(o, d, t);
    let f = 0;
    for (let p = 0; p < o.length; p++)
      if (!(p < o.length - 1 && h[p])) {
        if (f === p)
          await wn(o[f], l[f], t, i, s), Ei(c, f, i, s);
        else {
          const g = /* @__PURE__ */ new Map();
          for (let v = f; v <= p; v++) c.has(v) && g.set(v - f, c.get(v));
          await kr(o.slice(f, p + 1), l.slice(f, p + 1), t, i, s, g);
        }
        f = p + 1;
      }
    a = r + 1;
  }
  return { out: i, sources: s };
}
function Pi(n, e) {
  return Object.keys(e.substitutions).length === 0 ? n : n.map((t) => {
    if (t.ssml) {
      const { ssml: o, plain: l, map: c } = Ls(t.ssml, e.substitutions);
      if (o === t.ssml) return t;
      const u = { ...t, ssml: o };
      return nn(u, { plain: l, map: c }), u;
    }
    const i = t.plain;
    if (!i) return t;
    const { text: s, map: a } = Ps(i, e.substitutions);
    if (s === i) return t;
    const r = { ...t, plain: s };
    return nn(r, { plain: i, map: a }), r;
  });
}
async function Br(n, e = {}) {
  const t = [], i = [], s = await si(n, e);
  $(n, t, i, s, !1);
  const a = await Ii(t, i, s);
  return Pi(fi(a.out, a.sources, s), s);
}
async function Cr(n, e = {}) {
  const t = [], i = [], s = await si(n, e);
  $(n, t, i, s, !1);
  const a = await Ii(t, i, s), r = a.out.map((l) => s.blockStarts.has(l)), o = fi(a.out, a.sources, s);
  return { utterances: Pi(o, s), sources: a.sources, blockStarts: r };
}
class jr {
  engine;
  languages;
  contentQueue = [];
  // `contentQueue` as loaded, before `voice` stamped it — re-stamped when that changes.
  loadedQueue = [];
  loadedLanguages = [];
  events = new je();
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
    this.engine = e, this._defaults = new Xt(t.defaults), this._preferences = new ie(t.preferences), this._settings = new qe(this._preferences, this._defaults), this.contextualizationOverrides = t.contextualizationOverrides, this.segmentationOverrides = t.segmentationOverrides, this.languages = t.languages ?? [], this.setupEngineListeners(), this.applyEngineParameters(), this.notifiedVoice = this.spokenVoice(), this.initializeEngine();
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
    return (this.languages.length > 0 ? this.languages : this.contentLanguage ? [this.contentLanguage] : []).map((t) => Et(t, this._settings.languageOverrides) ?? t);
  }
  // The voice for content in `language`: a single voice for all, else the record's exact tag, then its base language.
  voiceIdFor(e, t) {
    return typeof e == "string" ? e : e && t ? Hi(e, t) : void 0;
  }
  // The main language's voice prefers boundary events; the others match its boundary support.
  needsBoundary(e) {
    const [t] = this.spokenLanguages();
    if (!t || L(e) === L(t)) return !0;
    const i = this.pickedVoices.get(this.pickKey(t, !0)), s = this.voiceIdFor(this.settingsWith(i ? { [this.pickedVoiceKey(t, i)]: D(i) } : null).voice, t);
    return this.voices.find((r) => D(r) === s)?.controls?.boundary !== !1;
  }
  pickKey(e, t) {
    return `${L(e)}:${t}`;
  }
  // `undefined` until picked
  pickedVoice(e) {
    return this.pickedVoices.get(this.pickKey(e, this.needsBoundary(e)));
  }
  async pickVoice(e) {
    const t = this.needsBoundary(e), i = this.pickKey(e, t);
    if (this.pickedVoices.has(i)) return;
    let s = this.pickingVoices.get(i);
    if (!s) {
      const a = this.voices;
      s = Vn(e, a, t).then((r) => {
        this.voices === a && this.pickedVoices.set(i, r);
      }).finally(() => this.pickingVoices.delete(i)), this.pickingVoices.set(i, s);
    }
    await s;
  }
  // Lists the engine's voices for the spoken languages and `languages`, and picks one for each, the main language first.
  async pickVoices(e = []) {
    const t = this.spokenLanguages(), i = [...new Set([...t, ...e].map((r) => L(r)).filter(Boolean))];
    let s = this.engine.getAvailableVoices(i, this.preferredVoiceIds());
    this.voiceListing = s;
    let a = await s;
    for (; s !== this.voiceListing; )
      s = this.voiceListing, a = await s;
    (a.length !== this.voices.length || a.some((r) => !this.voiceIds.has(D(r)))) && (this.voices = a, this.voiceIds = new Set(a.map((r) => D(r))), this.pickedVoices.clear(), this.pickingVoices.clear()), t[0] && await this.pickVoice(t[0]), await Promise.all(i.map((r) => this.pickVoice(r)));
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
      const { index: t, state: i } = this.resumeTarget(), s = i && e !== null && this.getCurrentUtteranceIndex() === e - 1 ? e : t;
      await this.setContentQueue(this.loadedQueue, s, i);
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
    const t = Object.fromEntries(Object.entries(e).flatMap(([i, s]) => {
      const a = this.listedVoiceId(s);
      return a ? [[i, a]] : [];
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
    const t = this.voices.find((i) => D(i) === e) ?? this.voices.find((i) => i.name === e);
    return t && D(t);
  }
  // The voice picked for each spoken and loaded language.
  pickedVoiceRecord() {
    const e = {};
    for (const t of /* @__PURE__ */ new Set([...this.spokenLanguages(), ...this.loadedLanguages])) {
      const i = this.pickedVoice(t);
      i && (e[this.pickedVoiceKey(t, i)] ??= D(i));
    }
    return Object.keys(e).length > 0 ? e : null;
  }
  // A pick is for the language's region only when the voice is of it, else for its base language.
  pickedVoiceKey(e, t) {
    const [i, s] = P(e);
    return s && P(t.language)[1] === s ? e : de(i) === de(e) ? i : e;
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
      const { charIndex: t, charLength: i } = e.detail ?? {}, s = this.loadedQueue[this.getCurrentUtteranceIndex()], a = s && typeof t == "number" && typeof i == "number" ? ba(s, t, i) : void 0;
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
  async setContentQueue(e, t = null, i = null) {
    this.clearPendingAdvance(), this.pendingAutoPauseIndex = null, (this.navigatorState === "playing" || this.navigatorState === "paused") && this.engine.stop(), this.loadedQueue = Array.isArray(e) ? [...e] : [e], this.contentQueue = [], this.pendingResumeIndex = t, this.pendingResumeState = i, this.setNavigatorState("loading"), this.emitEvent({ type: "loading" });
    const s = ++this.loadGeneration, a = this.loadedQueue.map((l) => this.withLanguage(l)).filter((l) => !l.voice && l.language);
    this.loadedLanguages = [...new Set(a.map((l) => l.language))];
    const r = this.loadedLanguages.filter((l) => this.pickedVoice(l) === void 0);
    if (r.length > 0 && (await this.pickVoices(r).catch(() => {
    }), s !== this.loadGeneration))
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
        const i = L(t.language);
        this.reportedLanguageFallbacks.has(i) || (this.reportedLanguageFallbacks.add(i), this.emitEvent({ type: "languagefallback", detail: { language: t.language, reason: "no-matching-voice" } }));
      }
  }
  // The content's language when a loadContent() utterance has none; extraction applies it to loadGndContent()'s.
  withLanguage(e) {
    return this.source !== void 0 || this.contentLanguage === void 0 || e.language ? e : { ...e, language: this.contentLanguage };
  }
  // The utterance's own voice, else the spoken voice for its language.
  withVoice(e, t) {
    if (e.voice) return e;
    const i = this.voiceIdFor(t, e.language);
    return i ? { ...e, voice: i } : e;
  }
  // Re-runs extraction from `this.source`, resuming near the old position if playback was underway.
  async reextract() {
    if (!this.source) return;
    const { index: e, state: t } = this.resumeTarget(), i = this.contentSources, { utterances: s, sources: a, blockStarts: r } = await Cr(this.source, {
      format: this._settings.format,
      interruptions: this._settings.interruptions,
      skip: this._settings.skip,
      contextualize: this._settings.contextualize,
      contextualization: {
        contextualizations: this.contextualizationOverrides?.contextualizations,
        shapes: ya(this._settings.verbosity, this.contextualizationOverrides?.shapes),
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
    const o = t && e !== null ? this.resolveResumeIndex(i, e, a) : null;
    await this.setContentQueue(s, o, t);
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
    const t = this._settings.segmentation, i = wa(e, t);
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
  get settings() {
    return this.settingsWith(this.pickedVoiceRecord());
  }
  // `picks` are the voice defaults; the preference's voices the engine doesn't have give way to them.
  settingsWith(e) {
    return new qe(
      this._preferences.merging(new ie({ voice: this.availableVoice(this._settings.voice) })),
      new Xt({ ...this._defaults, voice: e })
    );
  }
  // Rebuilt, staged edits kept, once the spoken voices change, e.g. when they're picked after being read.
  get preferencesEditor() {
    const e = this.spokenVoice();
    return (this._preferencesEditor === null || !this.sameSettingValue(e, this.preferencesEditorVoice)) && (this._preferencesEditor = new en(this._preferencesEditor?.preferences ?? this._preferences, this.settings), this.preferencesEditorVoice = e), this._preferencesEditor;
  }
  async submitPreferences(e) {
    !this.source && this.contentQueue.length > 0 && Zt.some((t) => e[t] !== void 0) && console.warn(
      "submitPreferences(): extraction-affecting preferences (format, interruptions, verbosity, skip, contextualize, language, languageOverrides, segmentation, reconstruct) have no effect on content loaded via loadContent() — use loadGndContent() to re-extract on submission."
    ), this._preferences = this._preferences.merging(e), await this.applyPreferences();
  }
  async applyPreferences() {
    const e = this._settings;
    if (this._settings = new qe(this._preferences, this._defaults), this.applyEngineParameters(), (!this.sameSettingValue(e.voice, this._settings.voice) || !this.sameSettingValue(e.languageOverrides, this._settings.languageOverrides)) && await this.pickVoices().catch(() => {
    }), this._preferencesEditor !== null && (this._preferencesEditor = new en(this._preferences, this.settings)), Zt.some((t) => !this.sameSettingValue(this.extractionValue(e, t), this.extractionValue(this._settings, t))))
      await this.reextract();
    else if (this.loadedQueue.length > 0 && !this.sameSettingValue(e.voice, this._settings.voice)) {
      const { index: t, state: i } = this.resumeTarget();
      await this.setContentQueue(this.loadedQueue, t, i);
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
      return e.length === t.length && e.every((i) => t.includes(i));
    if (e && t && typeof e == "object" && typeof t == "object") {
      const i = Object.entries(e);
      return i.length === Object.keys(t).length && i.every(([s, a]) => t[s] === a);
    }
    return e === t;
  }
  async destroy() {
    this.loadGeneration++, this.loadedQueue = [], this.clearPendingAdvance(), this.events.clear(), await this.engine.destroy();
  }
}
export {
  ga as BooleanPreference,
  le as EnumPreference,
  Tr as FallbackEngineProvider,
  ca as FallbackSpeechEngine,
  _r as Locator,
  $r as LocatorLocations,
  Gr as LocatorText,
  X as Preference,
  be as RangePreference,
  da as ReadiumSpeechDecorationController,
  jr as ReadiumSpeechNavigator,
  Ur as ReadiumSpeechProviderRegistry,
  Xt as SpeechDefaults,
  ie as SpeechPreferences,
  en as SpeechPreferencesEditor,
  $n as SpeechServerAudioDecodeError,
  aa as SpeechServerEngine,
  Or as SpeechServerEngineProvider,
  ge as SpeechServerError,
  Gn as SpeechServerNetworkError,
  _n as SpeechServerStallError,
  qe as SpeechSettings,
  Yt as StringArrayPreference,
  Wt as WebSpeechEngine,
  Vr as WebSpeechEngineProvider,
  I as WebSpeechVoiceManager,
  St as autoPauseScopes,
  Da as blockLevelRoles,
  te as chineseVariantMap,
  Gs as chunkPlainText,
  Hs as chunkSsmlText,
  Rn as compareAlphabetically,
  En as compareByPreferredRegion,
  va as contextualizationShapesAtVerbosity,
  ma as contextualizedAtVerbosity,
  ne as createJsonOrderMap,
  ha as createLocator,
  Zn as defaultContextualizations,
  P as extractLangRegionFromBCP47,
  Br as extractUtterances,
  yt as extractionFormats,
  Zt as extractionPreferenceKeys,
  An as filterByBoundarySupport,
  Yi as filterByLanguages,
  tt as filterOutNoveltyVoices,
  nt as filterOutVeryLowQualityVoices,
  Ze as getLanguageDisplayName,
  Ee as getQualityValue,
  D as getVoiceId,
  Be as groupVoicesByLanguage,
  _a as interruptionRoles,
  Ye as isNoveltyVoice,
  ra as isRecoverableFailure,
  et as isVeryLowQualityVoice,
  vt as languageModes,
  Fn as mapServerVoice,
  Qs as mimeTypeForFormat,
  Pe as pauseDurationRangeConfig,
  Pn as pickBestVoiceByRegion,
  On as pickDefaultVoice,
  Vn as pickLanguageVoice,
  Le as pitchRangeConfig,
  Ae as rateRangeConfig,
  ba as resolveBoundaryLocate,
  wa as resolveUtteranceLocate,
  bt as segmentationModes,
  ea as selectBitrate,
  Zs as selectFormat,
  xr as setupDecorations,
  Nr as shapeableRoles,
  zr as skippableRoles,
  pa as skippedAtVerbosity,
  Xe as sortAlphabetically,
  qi as sortByPreferredRegion,
  J as sortByQuality,
  In as sortVoicesByRegions,
  ue as toSpeechServerError,
  ji as valueForLanguage,
  mt as verbosityPresets,
  Ve as volumeRangeConfig
};
