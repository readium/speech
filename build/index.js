const L = (t) => {
  if (!t) return ["", void 0];
  const e = t.replace(/_/g, "-");
  try {
    const n = new Intl.Locale(e);
    return [
      n.language.toLowerCase(),
      n.region?.toUpperCase()
    ];
  } catch {
    const n = e.split("-");
    return [
      n[0].toLowerCase(),
      n[1]?.toUpperCase()
    ];
  }
}, z = {
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
}, mt = /* @__PURE__ */ new Map(), fi = /* @__PURE__ */ Object.assign({ "../../json/ar.json": () => import("./ar-CJhBAgKq.js"), "../../json/bg.json": () => import("./bg-JvP4LoOT.js"), "../../json/bho.json": () => import("./bho-CpuLBMN3.js"), "../../json/bn.json": () => import("./bn-84u93pMd.js"), "../../json/ca.json": () => import("./ca-DdScTbex.js"), "../../json/cmn.json": () => import("./cmn-Dd1zrvTE.js"), "../../json/cs.json": () => import("./cs-CDMne0uc.js"), "../../json/da.json": () => import("./da-oFf4cHgj.js"), "../../json/de.json": () => import("./de-Bjgc3bVq.js"), "../../json/el.json": () => import("./el-FkKIcghI.js"), "../../json/en.json": () => import("./en-BELFJRDQ.js"), "../../json/es.json": () => import("./es-nAmbEkcR.js"), "../../json/eu.json": () => import("./eu-DxWirHU-.js"), "../../json/fa.json": () => import("./fa-CTVUniYi.js"), "../../json/fi.json": () => import("./fi-Do6QFzRv.js"), "../../json/fr.json": () => import("./fr-B5-P9o29.js"), "../../json/gl.json": () => import("./gl-DqSXeC_F.js"), "../../json/he.json": () => import("./he-CpyNwgaH.js"), "../../json/hi.json": () => import("./hi-CeOBacbl.js"), "../../json/hr.json": () => import("./hr-CSpU18l6.js"), "../../json/hu.json": () => import("./hu-oONHmpR6.js"), "../../json/id.json": () => import("./id-BpZuB5Iw.js"), "../../json/it.json": () => import("./it-CM4X84UA.js"), "../../json/ja.json": () => import("./ja-e-iw3c4_.js"), "../../json/kk.json": () => import("./kk-BdLCAb2s.js"), "../../json/kn.json": () => import("./kn-BYRvouO5.js"), "../../json/ko.json": () => import("./ko-EIouMDK1.js"), "../../json/mr.json": () => import("./mr-DN-hwEV1.js"), "../../json/ms.json": () => import("./ms-B5E3oaWE.js"), "../../json/nb.json": () => import("./nb-DOw05HBh.js"), "../../json/nl.json": () => import("./nl-CEydw4A9.js"), "../../json/pl.json": () => import("./pl-Ivj_eAP7.js"), "../../json/pt.json": () => import("./pt-BPEGqRmW.js"), "../../json/ro.json": () => import("./ro-BQ617SOx.js"), "../../json/ru.json": () => import("./ru-Dieeph4H.js"), "../../json/sk.json": () => import("./sk-pEiOt4GQ.js"), "../../json/sl.json": () => import("./sl-Z6jWAR8J.js"), "../../json/sv.json": () => import("./sv-BT09piiZ.js"), "../../json/ta.json": () => import("./ta-B0YMGW5q.js"), "../../json/te.json": () => import("./te-ax-HNsAY.js"), "../../json/th.json": () => import("./th-C7Dbxwoz.js"), "../../json/tr.json": () => import("./tr-mipEichO.js"), "../../json/uk.json": () => import("./uk-CHdx7DHz.js"), "../../json/vi.json": () => import("./vi-DrlcEwAD.js"), "../../json/wuu.json": () => import("./wuu-C6uQvT6g.js"), "../../json/yue.json": () => import("./yue-CFroa59o.js") });
async function pi(t) {
  try {
    const e = t.split("-")[0], n = fi[`../../json/${e}.json`];
    if (!n)
      throw new Error(`No voice data found for language: ${t}`);
    const i = (await n()).default;
    return {
      ...i,
      voices: i.voices.map(bi)
    };
  } catch (e) {
    return console.warn(`Failed to load voice data for ${t}:`, e), {
      language: t,
      defaultRegion: "",
      testUtterance: "",
      voices: []
    };
  }
}
function wn(t) {
  return mt.has(t) || mt.set(t, pi(t)), mt.get(t);
}
const mi = ["veryLow", "low", "normal", "high", "veryHigh"], yi = ["android", "apple"], bi = (t) => ({
  ...t,
  quality: t.quality?.filter((e) => mi.includes(e)),
  localizedName: t.localizedName && yi.includes(t.localizedName) ? t.localizedName : void 0
}), Re = {
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
}, $ = (t) => {
  if (!t) return "";
  let e = t.toLowerCase().replace(/_/g, "-");
  if (/\w{2,3}-\w{2,3}/.test(e)) {
    const [n, r] = e.split("-");
    e = `${n.toLowerCase()}-${r.toUpperCase()}`;
  }
  return Re[e] || e;
}, _t = async (t) => {
  if (!t) return [];
  try {
    const e = $(t);
    try {
      const r = await wn(e);
      if (r?.voices?.length)
        return r.voices;
    } catch (r) {
      console.warn(`Failed to load voices for ${e}:`, r);
    }
    const [n] = L(e);
    if (n !== e)
      try {
        const r = await wn(n);
        if (r?.voices?.length)
          return r.voices;
      } catch (r) {
        console.warn(`Failed to load voices for base language ${n}:`, r);
      }
    return [];
  } catch (e) {
    return console.error(`Error in getVoices for ${t}:`, e), [];
  }
}, Dt = (t, e) => {
  try {
    return new Intl.DisplayNames(
      e ? [e] : [],
      { type: "language", languageDisplay: "standard" }
    ).of(t) || t.toUpperCase();
  } catch {
    return t.toUpperCase();
  }
}, Sn = (t) => {
  if (!t) return "";
  try {
    const e = $(t), n = z[e];
    if (n?.testUtterance)
      return n.testUtterance;
    if (e in Re) {
      const i = Re[e];
      if (i && z[i]?.testUtterance)
        return z[i].testUtterance;
    }
    const [r] = L(e);
    return r !== e && z[r]?.testUtterance ? z[r].testUtterance : "";
  } catch (e) {
    return console.error(`Error in getTestUtterance for ${t}:`, e), "";
  }
}, ot = (t) => {
  if (!t) return "";
  try {
    const e = $(t), n = z[e];
    if (n?.defaultRegion)
      return `${e}-${n.defaultRegion}`;
    if (e in Re) {
      const i = Re[e];
      if (i) {
        const s = z[i];
        if (s?.defaultRegion)
          return `${i}-${s.defaultRegion}`;
      }
    }
    const [r] = L(e);
    if (r !== e) {
      const i = z[r];
      if (i?.defaultRegion)
        return `${r}-${i.defaultRegion}`;
    }
    return "";
  } catch (e) {
    return console.error(`Failed to get default region for ${t}:`, e), "";
  }
}, lt = (t) => {
  if (!t?.length) return [];
  const e = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  for (const [i, s] of t.entries()) {
    if (!s) continue;
    const o = $(s), [a, c] = L(o);
    c && (e.add(c), r.has(c) || r.set(c, i)), n.has(a) || n.set(a, /* @__PURE__ */ new Set()), c && n.get(a).add(c);
  }
  return Array.from(n.entries()).map(([i, s]) => {
    const o = new Set(
      z[i]?.availableRegions || []
    ), a = Array.from(s), c = Array.from(e).filter(
      (d) => o.has(d) && !a.includes(d)
    ), l = Array.from(/* @__PURE__ */ new Set([...a, ...c])).sort((d, u) => {
      const g = r.get(d) ?? Number.MAX_SAFE_INTEGER, f = r.get(u) ?? Number.MAX_SAFE_INTEGER;
      return g - f;
    });
    if (l.length === 0) {
      const d = ot(i), [, u] = L(d);
      u && l.push(u);
    }
    return {
      baseLang: i,
      regions: l
    };
  });
}, he = async (t) => {
  const e = /* @__PURE__ */ new Map();
  for (const r of t) {
    if (r.source !== "json") continue;
    const [i] = L(r.language);
    e.has(i) || e.set(i, []), e.get(i).push(r);
  }
  const n = /* @__PURE__ */ new Map();
  for (const [r, i] of e.entries()) {
    const s = /* @__PURE__ */ new Map(), o = await _t(r), a = /* @__PURE__ */ new Map();
    o.forEach((c, l) => {
      a.set(c.name.toLowerCase(), l), c.altNames?.forEach((d) => {
        a.set(d.toLowerCase(), l);
      });
    });
    for (const c of i) {
      const l = c.name.toLowerCase(), d = a.get(l);
      d !== void 0 && s.set(c.name, d);
    }
    s.size > 0 && n.set(r, s);
  }
  return n;
}, vi = {
  veryLow: 1,
  low: 2,
  normal: 3,
  high: 4,
  veryHigh: 5
}, Qe = (t) => t ? vi[t] ?? 0 : 0, Q = (t, e, n, r) => {
  const i = Qe(t.quality), s = Qe(e.quality);
  if (n && r && t.source === "json" && e.source === "json") {
    const o = n.get(r);
    if (o) {
      const a = o.get(t.name), c = o.get(e.name);
      if (a !== void 0 && c !== void 0)
        return a - c;
    }
  }
  return s !== i ? s - i : t.name.localeCompare(e.name);
}, ct = (t, e) => {
  const n = new Map(e.map((s) => [s.baseLang, s])), r = /* @__PURE__ */ new Map(), i = [];
  for (const s of t) {
    const [o] = L(s.language);
    n.get(o) ? (r.has(o) || r.set(o, []), r.get(o).push(s)) : i.push(s);
  }
  return { voicesByLang: r, otherLangVoices: i };
}, pr = (t, e, n, r) => {
  const [, i] = L(t.language), [, s] = L(e.language), o = i && n.regions.includes(i), a = s && n.regions.includes(s);
  if (o && a) {
    const g = n.regions.indexOf(i), f = n.regions.indexOf(s);
    return g === f ? Q(t, e, r, n.baseLang) : g - f;
  }
  if (o) return -1;
  if (a) return 1;
  const c = ot(n.baseLang), [, l] = L(c), d = !!l && i === l, u = !!l && s === l;
  if (d && !u) return -1;
  if (!d && u) return 1;
  if (i && s) {
    const g = i.localeCompare(s);
    return g !== 0 ? g : Q(t, e, r, n.baseLang);
  }
  return i ? -1 : s ? 1 : Q(t, e, r, n.baseLang);
}, wi = async (t, e, n) => {
  const r = n ?? await he(t);
  t.sort((i, s) => pr(i, s, e, r));
}, mr = (t, e, n) => {
  const [r] = L(t.language), [i] = L(e.language), s = Dt(r).toLowerCase(), o = Dt(i).toLowerCase(), a = s.localeCompare(o);
  if (a !== 0)
    return a;
  if (r === i) {
    const c = ot(r), [, l] = L(t.language), [, d] = L(e.language), u = c && l === c.split("-")[1], g = c && d === c.split("-")[1];
    if (u && !g) return -1;
    if (!u && g) return 1;
    if (l && d) {
      const f = l.localeCompare(d);
      if (f !== 0)
        return f;
    }
    return l && !d ? -1 : !l && d ? 1 : Q(t, e, n, r);
  }
  return Q(t, e, n, r);
}, $t = async (t, e) => {
  const n = e ?? await he(t);
  t.sort((r, i) => mr(r, i, n));
}, Si = async (t, e) => {
  if (!e?.length) return [];
  const n = lt(t || []), { voicesByLang: r, otherLangVoices: i } = ct(e, n), s = await he(e), o = [];
  for (const a of n) {
    const c = r.get(a.baseLang);
    c && (await wi(c, a, s), o.push(...c));
  }
  return await $t(i, s), o.push(...i), o;
}, ki = async (t, e) => {
  if (!e.length) return null;
  const [n] = lt([t]), { voicesByLang: r, otherLangVoices: i } = ct(e, [n]), s = r.get(n.baseLang), o = s?.length ? s : i, a = await he(e), c = s?.length ? (l, d) => pr(l, d, n, a) : (l, d) => mr(l, d, a);
  return o.reduce((l, d) => c(d, l) < 0 ? d : l);
}, xi = [{ name: "Albert", nativeID: ["com.apple.speech.synthesis.voice.Albert"], note: "This novelty voice is part of a pack preloaded by Apple.", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Bad News", nativeID: ["com.apple.speech.synthesis.voice.BadNews"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Mauvaises nouvelles", "Malas noticias", "Brutte notizie"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Bahh", nativeID: ["com.apple.speech.synthesis.voice.Bahh"], note: "This novelty voice is part of a pack preloaded by Apple.", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Bells", nativeID: ["com.apple.speech.synthesis.voice.Bells"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Cloches", "Campanas", "Campane"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Boing", nativeID: ["com.apple.speech.synthesis.voice.Boing"], note: "This novelty voice is part of a pack preloaded by Apple.", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Bubbles", nativeID: ["com.apple.speech.synthesis.voice.Bubbles"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Bulles", "Burbujas", "Bollicine"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Cellos", nativeID: ["com.apple.speech.synthesis.voice.Cellos"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Violoncelles", "Violonchelos", "Violoncelli"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Good News", nativeID: ["com.apple.speech.synthesis.voice.GoodNews"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Bonnes nouvelles", "Buenas noticias", "Buone notizie"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Jester", nativeID: ["com.apple.speech.synthesis.voice.Hysterical"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Bouffon", "Bufón", "Giullare"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Organ", nativeID: ["com.apple.speech.synthesis.voice.Organ"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Orgue", "Órgano", "Organo"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Superstar", nativeID: ["com.apple.speech.synthesis.voice.Princess"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Superestrella"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Trinoids", nativeID: ["com.apple.speech.synthesis.voice.Trinoids"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Trinoïdes"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Whisper", nativeID: ["com.apple.speech.synthesis.voice.Whisper"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Murmure", "Susurro", "Sussurro"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Wobble", nativeID: ["com.apple.speech.synthesis.voice.Deranged"], note: "This novelty voice is part of a pack preloaded by Apple.", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Zarvox", nativeID: ["com.apple.speech.synthesis.voice.Zarvox"], note: "This novelty voice is part of a pack preloaded by Apple.", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }], Ei = {
  voices: xi
}, Ci = [{ name: "Eddy", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Flo", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Grandma", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Grandpa", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Jacques", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Reed", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Rocko", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Sandy", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Shelley", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Fred", language: "en-US", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Junior", language: "en-US", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Kathy", language: "en-US", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Ralph", language: "en-US", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "eSpeak Arabic", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ar", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Bulgarian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "bg", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Bengali", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "bn", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Catalan", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ca", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Chinese (Mandarin, latin as English)", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "cmn", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Czech", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "cs", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Danish", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "da", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak German", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "de", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Greek", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "el", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Spanish (Spain)", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "es", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Estonian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "et", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Finnish", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "fi", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Gujarati", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "gu", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Croatian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "hr", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Hungarian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "hu", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Indonesian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "id", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Italian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "it", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Kannada", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "kn", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Korean", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ko", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Lithuanian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "lt", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Latvian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "lv", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Malayalm", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ml", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Marathi", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "mr", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Malay", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ms", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Norwegian Bokmål", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "nb", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Polish", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "pl", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Portuguese (Brazil)", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "pt-br", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Romanian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ro", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Russian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ru", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Slovak", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "sk", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Slovenian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "sl", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Serbian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "sv", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Swedish", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "sv", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Swahili", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "sw", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Tamil", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ta", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Telugu", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "te", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Turkish", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "tr", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Vietnamese (Northern)", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "vi", os: ["ChromeOS"], preloaded: !0 }], Ai = {
  voices: Ci
}, Ti = Ei, Oi = Ai, Ut = (t, e) => Ti.voices.some(
  (n) => t.includes(n.name) || e && n.nativeID?.some((r) => e.includes(r)) || n.altNames?.some((r) => t.includes(r))
), Bt = (t, e) => Oi.voices.some(
  (n) => t.includes(n.name)
) || e === "veryLow", kn = (t) => t?.length ? t.filter((e) => !(e.isNovelty || Ut(e.name, e.voiceURI))) : [], xn = (t) => t?.length ? t.filter((e) => !Bt(e.name, e.quality)) : [], Ri = { ar: { normal: "محسن", high: "استثنائي" }, ca: { normal: "millorada", high: "prèmium" }, "cmn-CN": { normal: "优化音质", high: "高音质" }, "cmn-TW": { normal: "增強音質", high: "高音質" }, cs: { normal: "vylepšená verze", high: "prémiový" }, da: { normal: "forbedret", high: "høj kvalitet" }, de: { normal: "erweitert", high: "premium" }, el: { normal: "βελτιωμένη", high: "υψηλής ποιότητας" }, en: { normal: "Enhanced", high: "Premium" }, es: { normal: "mejorada", high: "premium" }, fi: { normal: "parannettu", high: "korkealaatuinen" }, fr: { normal: "premium", high: "de qualité" }, he: { normal: "משופר", high: "פרימיום" }, hi: { normal: "बेहतर", high: "प्रीमियम" }, hr: { normal: "poboljšani", high: "vrhunski" }, hu: { normal: "továbbfejlesztett", high: "prémium" }, id: { normal: "Ditingkatkan", high: "Premium" }, it: { normal: "ottimizzata", high: "premium" }, ja: { normal: "拡張", high: "プレミアム" }, ko: { normal: "고품질", high: "프리미엄" }, ms: { normal: "Dipertingkat", high: "Premium" }, nb: { normal: "forbedret", high: "premium" }, nl: { normal: "verbeterd", high: "premium" }, pl: { normal: "rozszerzony", high: "premium" }, pt: { normal: "melhorada", high: "premium" }, ro: { normal: "îmbunătățită", high: "premium" }, ru: { normal: "улучшенный", high: "высшее качество" }, sk: { normal: "vylepšený", high: "prémiový" }, sl: { normal: "izboljšano", high: "prvovrsten" }, sv: { normal: "förbättrad", high: "premium" }, th: { normal: "คุณภาพสูง", high: "คุณภาพสูง" }, tr: { normal: "Geliştirilmiş", high: "Yüksek Kaliteli" }, uk: { normal: "вдосконалений", high: "високої якості" }, vi: { normal: "Nâng cao", high: "Cao cấp" } }, Ii = {
  quality: Ri
}, Vt = {
  apple: Ii.quality
  // android: androidQualities.quality
}, Ni = (t, e, n) => {
  if (!t) return;
  const r = Array.isArray(n) ? n : n ? [n] : [];
  for (const i of r)
    if (i && Vt[i]) {
      const s = Vt[i], o = L(e)[0], a = s[e] || s[o];
      if (a) {
        const c = t.toLowerCase(), { normal: l, high: d } = a;
        if (d && c.includes(d.toLowerCase()))
          return "high";
        if (l && c.includes(l.toLowerCase()))
          return "normal";
      }
    }
}, Pi = (t, e) => {
  const n = Vt[e];
  if (n)
    for (const [r, { high: i, normal: s }] of Object.entries(n)) {
      const o = i && t.some((c) => c.includes(i)), a = s && t.some((c) => c.includes(s));
      if (o && a)
        return r;
    }
}, Li = {
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
}, En = (t) => {
  if (!t) return;
  const n = t.toLowerCase().split(/[._-]/);
  for (const r of Object.values(Li))
    if (r.values.some((i) => n.includes(i)))
      return r.quality;
};
function qi(t, e) {
  if (t.name === t.originalName) return t;
  if (e.name === e.originalName) return e;
  const n = [t.originalName, ...t.altNames || []], r = [e.originalName, ...e.altNames || []], i = n.findIndex((o) => r.includes(o)), s = r.findIndex((o) => n.includes(o));
  return i === -1 && s === -1 || i !== -1 && (s === -1 || i <= s) ? t : e;
}
function _i(t, e) {
  if (!t.altNames && !e.altNames)
    return !1;
  const n = t.originalName, r = e.originalName, i = t.altNames || [], s = e.altNames || [];
  return s.includes(n) || i.includes(r) ? !0 : i.filter((a) => s.includes(a)).length > 0;
}
class I {
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
    if (I.instance?.isInitialized) {
      const n = I.instance;
      return e?.languages && e.languages.length > 0 && await n.broadenLanguages(e.languages), n;
    }
    return I.initializationPromise || (I.initializationPromise = (async () => {
      try {
        const n = new I();
        I.instance = n, n.browserVoices = await n.getBrowserVoices(e?.maxTimeout, e?.interval), n.updateSystemLocale(n.browserVoices);
        let r = n.browserVoices;
        return e?.languages && e.languages.length > 0 ? (r = n.filterBrowserVoicesByLanguages(n.browserVoices, e.languages), n.scopedLanguages = I.toBaseLangSet(e.languages)) : n.scopedLanguages = null, n.voices = await n.parseToReadiumSpeechVoices(r), n.isInitialized = !0, n;
      } catch (n) {
        throw I.initializationPromise = null, console.error("Failed to initialize WebSpeechVoiceManager:", n), n;
      }
    })()), I.initializationPromise;
  }
  /**
   * Filter browser voices based on preferred languages
   * @private
   */
  filterBrowserVoicesByLanguages(e, n) {
    if (!n?.length) return e;
    const r = I.toBaseLangSet(n);
    return e.filter((i) => {
      if (!i?.lang) return !1;
      const s = $(i.lang), [o] = I.extractLangRegionFromBCP47(s);
      return r.has(o);
    });
  }
  /**
   * Extract base language codes (e.g. "en", "fr") from a list of BCP47 tags
   * @private
   */
  static toBaseLangSet(e) {
    return new Set(
      e.map((n) => {
        const r = $(n), [i] = I.extractLangRegionFromBCP47(r);
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
    const r = [...I.toBaseLangSet(e)].filter((a) => !this.scopedLanguages.has(a));
    if (r.length === 0) return;
    const i = r.filter((a) => this.broadenPromises.has(a)), s = r.filter((a) => !this.broadenPromises.has(a));
    let o;
    s.length > 0 && (o = (async () => {
      const a = this.filterBrowserVoicesByLanguages(this.browserVoices, s), c = await this.parseToReadiumSpeechVoices(a);
      this.voices = [...this.voices, ...c], s.forEach((l) => this.scopedLanguages.add(l)), s.forEach((l) => this.broadenPromises.delete(l));
    })(), s.forEach((a) => this.broadenPromises.set(a, o))), await Promise.all([
      ...o ? [o] : [],
      ...i.map((a) => this.broadenPromises.get(a))
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
    const n = /* @__PURE__ */ new Map();
    for (const r of e) {
      if (!r?.name || !r?.lang) continue;
      const i = `${r.lang.toLowerCase()}_${this.normalizeVoiceName(r.name)}`;
      n.set(i, (n.get(i) || 0) + 1);
    }
    return n;
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
    const n = e.map((i) => i.name), r = Pi(n, "apple");
    r && (this.systemLocale = r);
  }
  /**
   * Infer voice quality based on package, platform, JSON, or duplicate count
   * Returns null if quality cannot be determined
   * @private
   */
  inferVoiceQuality(e, n, r) {
    const i = e.voiceURI ? En(e.voiceURI) : void 0;
    if (i) return i;
    if (n?.nativeID && Array.isArray(n.nativeID))
      for (const s of n.nativeID) {
        const o = En(s);
        if (o) return o;
      }
    if (n?.localizedName && e.voiceURI && e.lang) {
      const s = Ni(
        e.voiceURI,
        this.systemLocale,
        n.localizedName
      );
      if (s) return s;
    }
    if (n?.quality && n.quality.length > 0) {
      const s = Math.min(r - 1, n.quality.length - 1), o = n.quality[s];
      if (o)
        return o;
    }
    return null;
  }
  /**
   * Find matching JSON voice by name or alternative names
   * @private
   */
  findMatchingJsonVoice(e, n) {
    return e.find(
      (r) => this.normalizeVoiceName(r.name) === n || r.altNames?.some((i) => this.normalizeVoiceName(i) === n)
    );
  }
  /**
   * Remove duplicate voices, keeping the highest quality version of each voice
   * @param voices Array of voices to remove duplicates from
   * @returns Filtered array with duplicates removed, keeping only the highest quality versions
   */
  removeDuplicates(e) {
    const n = /* @__PURE__ */ new Map();
    for (const r of e) {
      const i = `${r.language.toLowerCase()}_${this.normalizeVoiceName(r.name)}`, s = n.get(i);
      if (!s)
        n.set(i, r);
      else if (_i(r, s)) {
        const o = qi(r, s);
        n.set(i, o);
      } else {
        const o = Qe(s.quality);
        Qe(r.quality) >= o && n.set(i, r);
      }
    }
    return Array.from(n.values());
  }
  /**
   * Get test utterance for a given language
   * @param language - Language code (e.g., "en", "fr", "es")
   * @returns Promise that resolves to the test utterance text
   */
  getTestUtterance(e) {
    if (!e) return "";
    const n = Sn(e);
    if (n) return n;
    const [r] = I.extractLangRegionFromBCP47(e);
    if (r && r !== e) {
      const i = Sn(r);
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
  getLanguages(e, n, r) {
    if (!r && !this.isInitialized)
      throw new Error("WebSpeechVoiceManager not initialized. Call initialize() first.");
    const i = r ?? this.voices, s = n ? this.filterVoices(n, i) : i, o = [], a = /* @__PURE__ */ new Set();
    for (const c of s) {
      const d = $(c.language).split("-")[0];
      if (!a.has(d)) {
        const u = Dt(d, e), g = s.filter(
          (f) => $(f.language).split("-")[0] === d
        ).length;
        o.push({ code: d, label: u, count: g }), a.add(d);
      }
    }
    return r ? o : o.sort((c, l) => c.label.localeCompare(l.label));
  }
  /**
   * Get available regions with voice counts
   * @param localization Optional BCP 47 language tag to use for region names
   * @param filterOptions Optional filters to apply to voices before counting regions
   * @param voices Optional array of voices to count (defaults to this.voices)
   */
  getRegions(e, n, r) {
    if (!r && !this.isInitialized)
      throw new Error("WebSpeechVoiceManager not initialized. Call initialize() first.");
    const i = r ?? this.voices, s = n ? this.filterVoices(n, i) : i, o = [], a = /* @__PURE__ */ new Set(), c = /* @__PURE__ */ new Map();
    for (const l of s) {
      const [, d] = I.extractLangRegionFromBCP47(l.language);
      d && c.set(d, (c.get(d) || 0) + 1);
    }
    for (const l of s) {
      const [, d] = I.extractLangRegionFromBCP47(l.language);
      if (d && !a.has(d)) {
        let u = l.language;
        try {
          const g = e || navigator.language;
          u = new Intl.DisplayNames([g], { type: "region" }).of(d) || l.language;
        } catch (g) {
          console.warn(`Failed to get display name for region ${d}`, g);
        }
        o.push({
          code: d,
          label: u,
          count: c.get(d) || 0
        }), a.add(d);
      }
    }
    return r ? o : o.sort((l, d) => l.label.localeCompare(d.label));
  }
  /**
   * Get the default voice for language preferences
   * @param languages Array of preferred languages in order of preference, or a single language string
   * @param voices Optional pre-filtered voices array to use instead of fetching voices
   * @returns The default voice for the language, or null if no voices are available
   */
  async getDefaultVoice(e, n) {
    if (!e) return null;
    const r = Array.isArray(e) ? e : [e];
    let i = n || this.getVoices({ languages: r });
    return i.length ? (i = await this.sortVoicesByRegions(r, i), i[0]) : null;
  }
  getBrowserVoices(e = 1e4, n = 10) {
    const r = () => window.speechSynthesis?.getVoices() || [];
    if (!window.speechSynthesis)
      return Promise.resolve([]);
    const i = r();
    return Array.isArray(i) && i.length ? Promise.resolve(i) : new Promise((s, o) => {
      let a = Math.floor(e / n), c = !1;
      const l = () => {
        if (c) return;
        c = !0;
        const d = () => {
          if (a < 1) return s([]);
          --a;
          const u = r();
          if (Array.isArray(u) && u.length) return s(u);
          setTimeout(d, n);
        };
        setTimeout(d, n);
      };
      window.speechSynthesis.onvoiceschanged !== void 0 ? window.speechSynthesis.onvoiceschanged = () => {
        const d = r();
        Array.isArray(d) && d.length ? s(d) : l();
      } : l(), setTimeout(() => s([]), e);
    });
  }
  /**
   * Convert SpeechSynthesisVoice array to ReadiumSpeechVoice array
   * @private
   */
  async parseToReadiumSpeechVoices(e) {
    const n = this.countVoiceDuplicates(e);
    return await Promise.all(
      e.filter((i) => i?.name && i?.lang).map(async (i) => {
        const s = $(i.lang), [o] = I.extractLangRegionFromBCP47(s), a = this.normalizeVoiceName(i.name), c = `${i.lang.toLowerCase()}_${a}`, l = n.get(c) || 1;
        let d = await _t(s);
        (!d || d.length === 0) && (d = await _t(o));
        const u = this.findMatchingJsonVoice(d, a), g = this.inferVoiceQuality(i, u, l);
        return u ? {
          ...u,
          label: u.label ?? this.cleanVoiceName(i.name),
          source: "json",
          originalName: i.name,
          language: u.language ?? s,
          voiceURI: i.voiceURI,
          quality: g,
          isDefault: i.default || !1,
          offlineAvailability: i.localService || !1,
          isNovelty: Ut(i.name, i.voiceURI),
          isLowQuality: Bt(i.name, g)
        } : {
          source: "browser",
          label: this.cleanVoiceName(i.name),
          name: i.name,
          originalName: i.name,
          language: s,
          voiceURI: i.voiceURI,
          quality: g,
          isDefault: i.default || !1,
          offlineAvailability: i.localService || !1,
          isNovelty: Ut(i.name, i.voiceURI),
          isLowQuality: Bt(i.name, g)
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
        (n) => n.voiceURI === e.voiceURI || n.name === e.originalName || this.normalizeVoiceName(n.name) === this.normalizeVoiceName(e.name)
      );
  }
  /**
   * Filter voices based on the provided options
   */
  filterVoices(e, n) {
    let r = n ? [...n] : [...this.voices];
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
    if (i.languages) {
      const s = Array.isArray(i.languages) ? i.languages : [i.languages];
      r = r.filter((o) => s.some((a) => {
        const c = a.toLowerCase(), l = o.language?.toLowerCase(), d = o.altLanguage?.toLowerCase();
        if (l === c || d === c)
          return !0;
        const [u] = c.split("-");
        return l && l.startsWith(u) || d && d.startsWith(u);
      }));
    }
    if (i.source && (r = r.filter((s) => s.source === i.source)), i.gender && (r = r.filter((s) => s.gender === i.gender)), i.quality) {
      const s = Array.isArray(i.quality) ? i.quality : [i.quality];
      r = r.filter((o) => o.quality && s.includes(o.quality));
    }
    return i.offlineOnly && (r = r.filter((s) => s.offlineAvailability === !0)), i.provider && (r = r.filter(
      (s) => s.provider?.toLowerCase() === i.provider?.toLowerCase()
    )), i.excludeNovelty && (r = kn(r)), i.excludeVeryLowQuality && (r = xn(r)), i.removeDuplicates && (r = this.removeDuplicates(r)), r;
  }
  /**
   * Filter out novelty voices
   * @param voices Array of voices to filter
   * @returns Filtered array with novelty voices removed
   */
  filterOutNoveltyVoices(e) {
    const n = e ?? this.voices;
    return kn(n);
  }
  /**
   * Filter out very low quality voices
   * @param voices Array of voices to filter
   * @returns Filtered array with very low quality voices removed
   */
  filterOutVeryLowQualityVoices(e) {
    const n = e ?? this.voices;
    return xn(n);
  }
  /**
   * Sort voices by quality, respecting JSON name order, then alphabetically for undefined/null quality
   * @param voices Array of voices to sort
   * @returns Sorted array of voices
   */
  async sortVoicesByQuality(e) {
    const n = e || this.voices;
    if (!n?.length) return [];
    const r = await he(n);
    return [...n].sort((i, s) => Q(i, s, r));
  }
  /**
   * Sort regions by default then alphabetically, sort voices by quality
   */
  static async sortByDefaultRegion(e, n) {
    const r = await he(e), i = ot(n);
    e.sort((s, o) => {
      const [, a] = I.extractLangRegionFromBCP47(s.language), [, c] = I.extractLangRegionFromBCP47(o.language), l = i && a === i.split("-")[1], d = i && c === i.split("-")[1];
      return l && !d ? -1 : !l && d ? 1 : Q(s, o, r, n);
    });
  }
  /**
   * Sort voices by language preference, then alphabetically
   * @param voices Array of voices to sort
   * @param preferredLanguages Array of preferred language codes in order of preference
   * @returns Sorted array of voices
   */
  async sortVoicesByLanguages(e, n) {
    const r = n || this.voices;
    if (!r?.length) return [];
    if (!e?.length) {
      const c = [...r];
      return await $t(c), c;
    }
    const i = lt(e), { voicesByLang: s, otherLangVoices: o } = ct(r, i), a = [];
    for (const c of i) {
      const l = s.get(c.baseLang);
      l && (await I.sortByDefaultRegion(l, c.baseLang), a.push(...l));
    }
    return await $t(o), a.push(...o), a;
  }
  /**
   * Sort voices by region preference, then alphabetically
   * @param voices Array of voices to sort
   * @param preferredLanguages Array of preferred language codes in order of preference
   * @returns Sorted array of voices
   */
  async sortVoicesByRegions(e, n) {
    return Si(e, n || this.voices);
  }
  /**
   * Group voices by the specified criteria
   * @param voices Array of voices to group
   * @param options Grouping options
   * @returns Object with voice groups keyed by the grouping criteria
   */
  groupVoices(e, n) {
    const r = {}, i = n || this.voices;
    for (const s of i) {
      let o = "Unknown";
      switch (e) {
        case "languages":
          o = I.extractLangRegionFromBCP47(s.language)[0];
          break;
        case "gender":
          o = s.gender || "unknown";
          break;
        case "quality":
          o = s.quality || "unknown";
          break;
        case "region":
          const [, a] = I.extractLangRegionFromBCP47(s.language);
          o = a || "unknown";
          break;
      }
      r[o] || (r[o] = []), r[o].push(s);
    }
    return r;
  }
}
const Di = ["webKit", "moz", "ms", "o"], $i = [
  "boundary",
  "end",
  "error",
  "mark",
  "pause",
  "resume",
  "start"
], Ui = (t) => `${t.charAt(0).toUpperCase()}${t.slice(1)}`, we = (t = {}, e) => Object.hasOwnProperty.call(t, e) || e in t || !!t[e], Bi = (t) => typeof window < "u" && t in window, Vi = (t) => {
  const e = Ui(t), n = Di.map((i) => `${i}${e}`), r = [t, e].concat(n).find(Bi);
  return r && typeof window < "u" ? window[r] : void 0;
}, zi = () => {
  const t = {};
  [
    "speechSynthesis",
    "speechSynthesisUtterance",
    "speechSynthesisVoice",
    "speechSynthesisEvent",
    "speechSynthesisErrorEvent"
  ].forEach((n) => {
    t[n] = Vi(n);
  }), t.onvoiceschanged = we(t.speechSynthesis, "onvoiceschanged"), t.speechSynthesisSpeaking = we(t.speechSynthesis, "speaking"), t.speechSynthesisPaused = we(t.speechSynthesis, "paused");
  const e = t.speechSynthesisUtterance ? we(t.speechSynthesisUtterance, "prototype") : !1;
  return $i.forEach((n) => {
    const r = `on${n}`;
    t[r] = e && t.speechSynthesisUtterance ? we(t.speechSynthesisUtterance.prototype, r) : !1;
  }), t;
}, ji = () => {
  const e = typeof window < "u" && (window.navigator || {}).userAgent || "", n = () => /android/i.test(e), r = () => /kaios/i.test(e), i = () => typeof window.InstallTrigger < "u" ? !0 : /firefox/i.test(e), s = () => typeof window.GestureEvent < "u" || /safari/i.test(e);
  return {
    isAndroid: n(),
    isFirefox: i() || r(),
    isSafari: s(),
    isKaiOS: r()
  };
};
class ut {
  listeners = /* @__PURE__ */ new Map();
  on(e, n) {
    return this.listeners.has(e) || this.listeners.set(e, []), this.listeners.get(e).push(n), () => {
      const r = this.listeners.get(e);
      if (r) {
        const i = r.indexOf(n);
        i > -1 && r.splice(i, 1);
      }
    };
  }
  emit(e, n) {
    const r = this.listeners.get(e);
    r && [...r].forEach((i) => {
      try {
        i(n);
      } catch (s) {
        console.error(`Error in "${String(e)}" listener:`, s);
      }
    });
  }
  clear() {
    this.listeners.clear();
  }
}
const Ke = (t, e) => Math.min(Math.max(t, 0), Math.max(e - 1, 0));
function Mi(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var yt, Cn;
function Fi() {
  if (Cn) return yt;
  Cn = 1, yt = e;
  function t(r) {
    return r instanceof Buffer ? Buffer.from(r) : new r.constructor(r.buffer.slice(), r.byteOffset, r.length);
  }
  function e(r) {
    if (r = r || {}, r.circles) return n(r);
    const i = /* @__PURE__ */ new Map();
    if (i.set(Date, (l) => new Date(l)), i.set(Map, (l, d) => new Map(o(Array.from(l), d))), i.set(Set, (l, d) => new Set(o(Array.from(l), d))), r.constructorHandlers)
      for (const l of r.constructorHandlers)
        i.set(l[0], l[1]);
    let s = null;
    return r.proto ? c : a;
    function o(l, d) {
      const u = Object.keys(l), g = new Array(u.length);
      for (let f = 0; f < u.length; f++) {
        const y = u[f], m = l[y];
        typeof m != "object" || m === null ? g[y] = m : m.constructor !== Object && (s = i.get(m.constructor)) ? g[y] = s(m, d) : ArrayBuffer.isView(m) ? g[y] = t(m) : g[y] = d(m);
      }
      return g;
    }
    function a(l) {
      if (typeof l != "object" || l === null) return l;
      if (Array.isArray(l)) return o(l, a);
      if (l.constructor !== Object && (s = i.get(l.constructor)))
        return s(l, a);
      const d = {};
      for (const u in l) {
        if (Object.hasOwnProperty.call(l, u) === !1) continue;
        const g = l[u];
        typeof g != "object" || g === null ? d[u] = g : g.constructor !== Object && (s = i.get(g.constructor)) ? d[u] = s(g, a) : ArrayBuffer.isView(g) ? d[u] = t(g) : d[u] = a(g);
      }
      return d;
    }
    function c(l) {
      if (typeof l != "object" || l === null) return l;
      if (Array.isArray(l)) return o(l, c);
      if (l.constructor !== Object && (s = i.get(l.constructor)))
        return s(l, c);
      const d = {};
      for (const u in l) {
        const g = l[u];
        typeof g != "object" || g === null ? d[u] = g : g.constructor !== Object && (s = i.get(g.constructor)) ? d[u] = s(g, c) : ArrayBuffer.isView(g) ? d[u] = t(g) : d[u] = c(g);
      }
      return d;
    }
  }
  function n(r) {
    const i = [], s = [], o = /* @__PURE__ */ new Map();
    if (o.set(Date, (u) => new Date(u)), o.set(Map, (u, g) => new Map(c(Array.from(u), g))), o.set(Set, (u, g) => new Set(c(Array.from(u), g))), r.constructorHandlers)
      for (const u of r.constructorHandlers)
        o.set(u[0], u[1]);
    let a = null;
    return r.proto ? d : l;
    function c(u, g) {
      const f = Object.keys(u), y = new Array(f.length);
      for (let m = 0; m < f.length; m++) {
        const p = f[m], w = u[p];
        if (typeof w != "object" || w === null)
          y[p] = w;
        else if (w.constructor !== Object && (a = o.get(w.constructor)))
          y[p] = a(w, g);
        else if (ArrayBuffer.isView(w))
          y[p] = t(w);
        else {
          const E = i.indexOf(w);
          E !== -1 ? y[p] = s[E] : y[p] = g(w);
        }
      }
      return y;
    }
    function l(u) {
      if (typeof u != "object" || u === null) return u;
      if (Array.isArray(u)) return c(u, l);
      if (u.constructor !== Object && (a = o.get(u.constructor)))
        return a(u, l);
      const g = {};
      i.push(u), s.push(g);
      for (const f in u) {
        if (Object.hasOwnProperty.call(u, f) === !1) continue;
        const y = u[f];
        if (typeof y != "object" || y === null)
          g[f] = y;
        else if (y.constructor !== Object && (a = o.get(y.constructor)))
          g[f] = a(y, l);
        else if (ArrayBuffer.isView(y))
          g[f] = t(y);
        else {
          const m = i.indexOf(y);
          m !== -1 ? g[f] = s[m] : g[f] = l(y);
        }
      }
      return i.pop(), s.pop(), g;
    }
    function d(u) {
      if (typeof u != "object" || u === null) return u;
      if (Array.isArray(u)) return c(u, d);
      if (u.constructor !== Object && (a = o.get(u.constructor)))
        return a(u, d);
      const g = {};
      i.push(u), s.push(g);
      for (const f in u) {
        const y = u[f];
        if (typeof y != "object" || y === null)
          g[f] = y;
        else if (y.constructor !== Object && (a = o.get(y.constructor)))
          g[f] = a(y, d);
        else if (ArrayBuffer.isView(y))
          g[f] = t(y);
        else {
          const m = i.indexOf(y);
          m !== -1 ? g[f] = s[m] : g[f] = d(y);
        }
      }
      return i.pop(), s.pop(), g;
    }
  }
  return yt;
}
var Hi = Fi();
const yr = /* @__PURE__ */ Mi(Hi);
yr();
function zt(t) {
  if (t == null || typeof t != "object") return !1;
  let e = Object.getPrototypeOf(t);
  return e !== null && e !== Object.prototype && Object.getPrototypeOf(e) !== null ? !1 : !(Symbol.iterator in t) && !(Symbol.toStringTag in t);
}
function re(t) {
  return typeof t == "string";
}
function Wi(t) {
  return Number.isFinite(t);
}
function ee(t) {
  return Number.isSafeInteger(t) && t >= 0;
}
function W(t) {
  return t != null;
}
function Gi(t, e) {
  return zt(t) && re(e) && e in t;
}
var Ki = typeof globalThis == "object" && globalThis && globalThis.Object === Object && globalThis, Ji = typeof self == "object" && self && self.Object === Object && self, en = Ki || Ji || Function("return this")(), de = en.Symbol, br = Object.prototype, Qi = br.hasOwnProperty, Xi = br.toString, Se = de ? de.toStringTag : void 0;
function Zi(t) {
  var e = Qi.call(t, Se), n = t[Se];
  try {
    t[Se] = void 0;
    var r = !0;
  } catch {
  }
  var i = Xi.call(t);
  return r && (e ? t[Se] = n : delete t[Se]), i;
}
var Yi = Object.prototype, es = Yi.toString;
function ts(t) {
  return es.call(t);
}
var ns = "[object Null]", rs = "[object Undefined]", An = de ? de.toStringTag : void 0;
function vr(t) {
  return t == null ? t === void 0 ? rs : ns : An && An in Object(t) ? Zi(t) : ts(t);
}
function wr(t) {
  return t != null && typeof t == "object";
}
var is = "[object Symbol]";
function ss(t) {
  return typeof t == "symbol" || wr(t) && vr(t) == is;
}
function as(t, e) {
  for (var n = -1, r = t == null ? 0 : t.length, i = Array(r); ++n < r; )
    i[n] = e(t[n], n, t);
  return i;
}
var os = Array.isArray, Tn = de ? de.prototype : void 0, On = Tn ? Tn.toString : void 0;
function tn(t) {
  if (typeof t == "string")
    return t;
  if (os(t))
    return as(t, tn) + "";
  if (ss(t))
    return On ? On.call(t) : "";
  var e = t + "";
  return e == "0" && 1 / t == -1 / 0 ? "-0" : e;
}
var ls = /\s/;
function cs(t) {
  for (var e = t.length; e-- && ls.test(t.charAt(e)); )
    ;
  return e;
}
var us = /^\s+/;
function hs(t) {
  return t && t.slice(0, cs(t) + 1).replace(us, "");
}
function Sr(t) {
  var e = typeof t;
  return t != null && (e == "object" || e == "function");
}
function kr(t) {
  return t;
}
var ds = "[object AsyncFunction]", gs = "[object Function]", fs = "[object GeneratorFunction]", ps = "[object Proxy]";
function xr(t) {
  if (!Sr(t))
    return !1;
  var e = vr(t);
  return e == gs || e == fs || e == ds || e == ps;
}
var bt = en["__core-js_shared__"], Rn = (function() {
  var t = /[^.]+$/.exec(bt && bt.keys && bt.keys.IE_PROTO || "");
  return t ? "Symbol(src)_1." + t : "";
})();
function ms(t) {
  return !!Rn && Rn in t;
}
var ys = Function.prototype, bs = ys.toString;
function vs(t) {
  if (t != null) {
    try {
      return bs.call(t);
    } catch {
    }
    try {
      return t + "";
    } catch {
    }
  }
  return "";
}
var ws = /[\\^$.*+?()[\]{}|]/g, Ss = /^\[object .+?Constructor\]$/, ks = Function.prototype, xs = Object.prototype, Es = ks.toString, Cs = xs.hasOwnProperty, As = RegExp(
  "^" + Es.call(Cs).replace(ws, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Ts(t) {
  if (!Sr(t) || ms(t))
    return !1;
  var e = xr(t) ? As : Ss;
  return e.test(vs(t));
}
function Os(t, e) {
  return t?.[e];
}
function nn(t, e) {
  var n = Os(t, e);
  return Ts(n) ? n : void 0;
}
function Rs(t, e, n) {
  switch (n.length) {
    case 0:
      return t.call(e);
    case 1:
      return t.call(e, n[0]);
    case 2:
      return t.call(e, n[0], n[1]);
    case 3:
      return t.call(e, n[0], n[1], n[2]);
  }
  return t.apply(e, n);
}
var Is = 800, Ns = 16, Ps = Date.now;
function Ls(t) {
  var e = 0, n = 0;
  return function() {
    var r = Ps(), i = Ns - (r - n);
    if (n = r, i > 0) {
      if (++e >= Is)
        return arguments[0];
    } else
      e = 0;
    return t.apply(void 0, arguments);
  };
}
function qs(t) {
  return function() {
    return t;
  };
}
var In = (function() {
  try {
    var t = nn(Object, "defineProperty");
    return t({}, "", {}), t;
  } catch {
  }
})(), _s = In ? function(t, e) {
  return In(t, "toString", {
    configurable: !0,
    enumerable: !1,
    value: qs(e),
    writable: !0
  });
} : kr, Ds = Ls(_s);
function $s(t, e, n, r) {
  for (var i = t.length, s = n + -1; ++s < i; )
    if (e(t[s], s, t))
      return s;
  return -1;
}
function Us(t) {
  return t !== t;
}
function Bs(t, e, n) {
  for (var r = n - 1, i = t.length; ++r < i; )
    if (t[r] === e)
      return r;
  return -1;
}
function rn(t, e, n) {
  return e === e ? Bs(t, e, n) : $s(t, Us, n);
}
function Vs(t, e) {
  var n = t == null ? 0 : t.length;
  return !!n && rn(t, e, 0) > -1;
}
function zs(t, e) {
  return t === e || t !== t && e !== e;
}
var Nn = Math.max;
function js(t, e, n) {
  return e = Nn(e === void 0 ? t.length - 1 : e, 0), function() {
    for (var r = arguments, i = -1, s = Nn(r.length - e, 0), o = Array(s); ++i < s; )
      o[i] = r[e + i];
    i = -1;
    for (var a = Array(e + 1); ++i < e; )
      a[i] = r[i];
    return a[e] = n(o), Rs(t, this, a);
  };
}
function Ms(t, e) {
  return Ds(js(t, e, kr), t + "");
}
var Fs = 9007199254740991;
function Hs(t) {
  return typeof t == "number" && t > -1 && t % 1 == 0 && t <= Fs;
}
function Ws(t) {
  return t != null && Hs(t.length) && !xr(t);
}
var Ie = nn(Object, "create");
function Gs() {
  this.__data__ = Ie ? Ie(null) : {}, this.size = 0;
}
function Ks(t) {
  var e = this.has(t) && delete this.__data__[t];
  return this.size -= e ? 1 : 0, e;
}
var Js = "__lodash_hash_undefined__", Qs = Object.prototype, Xs = Qs.hasOwnProperty;
function Zs(t) {
  var e = this.__data__;
  if (Ie) {
    var n = e[t];
    return n === Js ? void 0 : n;
  }
  return Xs.call(e, t) ? e[t] : void 0;
}
var Ys = Object.prototype, ea = Ys.hasOwnProperty;
function ta(t) {
  var e = this.__data__;
  return Ie ? e[t] !== void 0 : ea.call(e, t);
}
var na = "__lodash_hash_undefined__";
function ra(t, e) {
  var n = this.__data__;
  return this.size += this.has(t) ? 0 : 1, n[t] = Ie && e === void 0 ? na : e, this;
}
function X(t) {
  var e = -1, n = t == null ? 0 : t.length;
  for (this.clear(); ++e < n; ) {
    var r = t[e];
    this.set(r[0], r[1]);
  }
}
X.prototype.clear = Gs;
X.prototype.delete = Ks;
X.prototype.get = Zs;
X.prototype.has = ta;
X.prototype.set = ra;
function ia() {
  this.__data__ = [], this.size = 0;
}
function ht(t, e) {
  for (var n = t.length; n--; )
    if (zs(t[n][0], e))
      return n;
  return -1;
}
var sa = Array.prototype, aa = sa.splice;
function oa(t) {
  var e = this.__data__, n = ht(e, t);
  if (n < 0)
    return !1;
  var r = e.length - 1;
  return n == r ? e.pop() : aa.call(e, n, 1), --this.size, !0;
}
function la(t) {
  var e = this.__data__, n = ht(e, t);
  return n < 0 ? void 0 : e[n][1];
}
function ca(t) {
  return ht(this.__data__, t) > -1;
}
function ua(t, e) {
  var n = this.__data__, r = ht(n, t);
  return r < 0 ? (++this.size, n.push([t, e])) : n[r][1] = e, this;
}
function pe(t) {
  var e = -1, n = t == null ? 0 : t.length;
  for (this.clear(); ++e < n; ) {
    var r = t[e];
    this.set(r[0], r[1]);
  }
}
pe.prototype.clear = ia;
pe.prototype.delete = oa;
pe.prototype.get = la;
pe.prototype.has = ca;
pe.prototype.set = ua;
var ha = nn(en, "Map");
function da() {
  this.size = 0, this.__data__ = {
    hash: new X(),
    map: new (ha || pe)(),
    string: new X()
  };
}
function ga(t) {
  var e = typeof t;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? t !== "__proto__" : t === null;
}
function dt(t, e) {
  var n = t.__data__;
  return ga(e) ? n[typeof e == "string" ? "string" : "hash"] : n.map;
}
function fa(t) {
  var e = dt(this, t).delete(t);
  return this.size -= e ? 1 : 0, e;
}
function pa(t) {
  return dt(this, t).get(t);
}
function ma(t) {
  return dt(this, t).has(t);
}
function ya(t, e) {
  var n = dt(this, t), r = n.size;
  return n.set(t, e), this.size += n.size == r ? 0 : 1, this;
}
function me(t) {
  var e = -1, n = t == null ? 0 : t.length;
  for (this.clear(); ++e < n; ) {
    var r = t[e];
    this.set(r[0], r[1]);
  }
}
me.prototype.clear = da;
me.prototype.delete = fa;
me.prototype.get = pa;
me.prototype.has = ma;
me.prototype.set = ya;
function ba(t) {
  return t == null ? "" : tn(t);
}
function va(t, e, n) {
  var r = -1, i = t.length;
  e < 0 && (e = -e > i ? 0 : i + e), n = n > i ? i : n, n < 0 && (n += i), i = e > n ? 0 : n - e >>> 0, e >>>= 0;
  for (var s = Array(i); ++r < i; )
    s[r] = t[r + e];
  return s;
}
function wa(t, e, n) {
  var r = t.length;
  return n = n === void 0 ? r : n, !e && n >= r ? t : va(t, e, n);
}
var Sa = "\\ud800-\\udfff", ka = "\\u0300-\\u036f", xa = "\\ufe20-\\ufe2f", Ea = "\\u20d0-\\u20ff", Ca = ka + xa + Ea, Aa = "\\ufe0e\\ufe0f", Ta = "\\u200d", Oa = RegExp("[" + Ta + Sa + Ca + Aa + "]");
function Ra(t) {
  return Oa.test(t);
}
function Ia(t) {
  return t.split("");
}
var Er = "\\ud800-\\udfff", Na = "\\u0300-\\u036f", Pa = "\\ufe20-\\ufe2f", La = "\\u20d0-\\u20ff", qa = Na + Pa + La, _a = "\\ufe0e\\ufe0f", Da = "[" + Er + "]", jt = "[" + qa + "]", Mt = "\\ud83c[\\udffb-\\udfff]", $a = "(?:" + jt + "|" + Mt + ")", Cr = "[^" + Er + "]", Ar = "(?:\\ud83c[\\udde6-\\uddff]){2}", Tr = "[\\ud800-\\udbff][\\udc00-\\udfff]", Ua = "\\u200d", Or = $a + "?", Rr = "[" + _a + "]?", Ba = "(?:" + Ua + "(?:" + [Cr, Ar, Tr].join("|") + ")" + Rr + Or + ")*", Va = Rr + Or + Ba, za = "(?:" + [Cr + jt + "?", jt, Ar, Tr, Da].join("|") + ")", ja = RegExp(Mt + "(?=" + Mt + ")|" + za + Va, "g");
function Ma(t) {
  return t.match(ja) || [];
}
function Pn(t) {
  return Ra(t) ? Ma(t) : Ia(t);
}
var Fa = "__lodash_hash_undefined__";
function Ha(t) {
  return this.__data__.set(t, Fa), this;
}
function Wa(t) {
  return this.__data__.has(t);
}
function Xe(t) {
  var e = -1, n = t == null ? 0 : t.length;
  for (this.__data__ = new me(); ++e < n; )
    this.add(t[e]);
}
Xe.prototype.add = Xe.prototype.push = Ha;
Xe.prototype.has = Wa;
function Ga(t, e) {
  return t.has(e);
}
function Ka(t) {
  return wr(t) && Ws(t);
}
var Ja = 200;
function Qa(t, e, n, r) {
  var i = -1, s = Vs, o = !0, a = t.length, c = [], l = e.length;
  if (!a)
    return c;
  e.length >= Ja && (s = Ga, o = !1, e = new Xe(e));
  e:
    for (; ++i < a; ) {
      var d = t[i], u = d;
      if (d = d !== 0 ? d : 0, o && u === u) {
        for (var g = l; g--; )
          if (e[g] === u)
            continue e;
        c.push(d);
      } else s(e, u, r) || c.push(d);
    }
  return c;
}
function Xa(t, e) {
  for (var n = t.length; n-- && rn(e, t[n], 0) > -1; )
    ;
  return n;
}
function Za(t, e) {
  for (var n = -1, r = t.length; ++n < r && rn(e, t[n], 0) > -1; )
    ;
  return n;
}
function Ln(t, e, n) {
  if (t = ba(t), t && e === void 0)
    return hs(t);
  if (!t || !(e = tn(e)))
    return t;
  var r = Pn(t), i = Pn(e), s = Za(r, i), o = Xa(r, i) + 1;
  return wa(r, s, o).join("");
}
var Ya = Ms(function(t, e) {
  return Ka(t) ? Qa(t, e) : [];
}), ae = function() {
  return ae = Object.assign || function(t) {
    for (var e, n = 1, r = arguments.length; n < r; n++) {
      e = arguments[n];
      for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    }
    return t;
  }, ae.apply(this, arguments);
}, eo = "~", to = "~~";
function sn(t, e) {
  for (var n = {}, r = {}, i = t.split(to), s = !1, o = 0; i.length > o; o++) {
    for (var a = i[o].split(eo), c = 0; c < a.length; c += 2) {
      var l = a[c], d = a[c + 1], u = "&" + l + ";";
      n[u] = d, s && (n["&" + l] = d), r[d] = u;
    }
    s = !0;
  }
  return e ? { entities: ae(ae({}, n), e.entities), characters: ae(ae({}, r), e.characters) } : { entities: n, characters: r };
}
var vt = {
  xml: /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,
  html4: /&notin;|&(?:nbsp|iexcl|cent|pound|curren|yen|brvbar|sect|uml|copy|ordf|laquo|not|shy|reg|macr|deg|plusmn|sup2|sup3|acute|micro|para|middot|cedil|sup1|ordm|raquo|frac14|frac12|frac34|iquest|Agrave|Aacute|Acirc|Atilde|Auml|Aring|AElig|Ccedil|Egrave|Eacute|Ecirc|Euml|Igrave|Iacute|Icirc|Iuml|ETH|Ntilde|Ograve|Oacute|Ocirc|Otilde|Ouml|times|Oslash|Ugrave|Uacute|Ucirc|Uuml|Yacute|THORN|szlig|agrave|aacute|acirc|atilde|auml|aring|aelig|ccedil|egrave|eacute|ecirc|euml|igrave|iacute|icirc|iuml|eth|ntilde|ograve|oacute|ocirc|otilde|ouml|divide|oslash|ugrave|uacute|ucirc|uuml|yacute|thorn|yuml|quot|amp|lt|gt|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,
  html5: /&centerdot;|&copysr;|&divideontimes;|&gtcc;|&gtcir;|&gtdot;|&gtlPar;|&gtquest;|&gtrapprox;|&gtrarr;|&gtrdot;|&gtreqless;|&gtreqqless;|&gtrless;|&gtrsim;|&ltcc;|&ltcir;|&ltdot;|&lthree;|&ltimes;|&ltlarr;|&ltquest;|&ltrPar;|&ltri;|&ltrie;|&ltrif;|&notin;|&notinE;|&notindot;|&notinva;|&notinvb;|&notinvc;|&notni;|&notniva;|&notnivb;|&notnivc;|&parallel;|&timesb;|&timesbar;|&timesd;|&(?:AElig|AMP|Aacute|Acirc|Agrave|Aring|Atilde|Auml|COPY|Ccedil|ETH|Eacute|Ecirc|Egrave|Euml|GT|Iacute|Icirc|Igrave|Iuml|LT|Ntilde|Oacute|Ocirc|Ograve|Oslash|Otilde|Ouml|QUOT|REG|THORN|Uacute|Ucirc|Ugrave|Uuml|Yacute|aacute|acirc|acute|aelig|agrave|amp|aring|atilde|auml|brvbar|ccedil|cedil|cent|copy|curren|deg|divide|eacute|ecirc|egrave|eth|euml|frac12|frac14|frac34|gt|iacute|icirc|iexcl|igrave|iquest|iuml|laquo|lt|macr|micro|middot|nbsp|not|ntilde|oacute|ocirc|ograve|ordf|ordm|oslash|otilde|ouml|para|plusmn|pound|quot|raquo|reg|sect|shy|sup1|sup2|sup3|szlig|thorn|times|uacute|ucirc|ugrave|uml|uuml|yacute|yen|yuml|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g
}, ge = {};
ge.xml = sn(`lt~<~gt~>~quot~"~apos~'~amp~&`);
ge.html4 = sn(`apos~'~OElig~Œ~oelig~œ~Scaron~Š~scaron~š~Yuml~Ÿ~circ~ˆ~tilde~˜~ensp~ ~emsp~ ~thinsp~ ~zwnj~‌~zwj~‍~lrm~‎~rlm~‏~ndash~–~mdash~—~lsquo~‘~rsquo~’~sbquo~‚~ldquo~“~rdquo~”~bdquo~„~dagger~†~Dagger~‡~permil~‰~lsaquo~‹~rsaquo~›~euro~€~fnof~ƒ~Alpha~Α~Beta~Β~Gamma~Γ~Delta~Δ~Epsilon~Ε~Zeta~Ζ~Eta~Η~Theta~Θ~Iota~Ι~Kappa~Κ~Lambda~Λ~Mu~Μ~Nu~Ν~Xi~Ξ~Omicron~Ο~Pi~Π~Rho~Ρ~Sigma~Σ~Tau~Τ~Upsilon~Υ~Phi~Φ~Chi~Χ~Psi~Ψ~Omega~Ω~alpha~α~beta~β~gamma~γ~delta~δ~epsilon~ε~zeta~ζ~eta~η~theta~θ~iota~ι~kappa~κ~lambda~λ~mu~μ~nu~ν~xi~ξ~omicron~ο~pi~π~rho~ρ~sigmaf~ς~sigma~σ~tau~τ~upsilon~υ~phi~φ~chi~χ~psi~ψ~omega~ω~thetasym~ϑ~upsih~ϒ~piv~ϖ~bull~•~hellip~…~prime~′~Prime~″~oline~‾~frasl~⁄~weierp~℘~image~ℑ~real~ℜ~trade~™~alefsym~ℵ~larr~←~uarr~↑~rarr~→~darr~↓~harr~↔~crarr~↵~lArr~⇐~uArr~⇑~rArr~⇒~dArr~⇓~hArr~⇔~forall~∀~part~∂~exist~∃~empty~∅~nabla~∇~isin~∈~notin~∉~ni~∋~prod~∏~sum~∑~minus~−~lowast~∗~radic~√~prop~∝~infin~∞~ang~∠~and~∧~or~∨~cap~∩~cup~∪~int~∫~there4~∴~sim~∼~cong~≅~asymp~≈~ne~≠~equiv~≡~le~≤~ge~≥~sub~⊂~sup~⊃~nsub~⊄~sube~⊆~supe~⊇~oplus~⊕~otimes~⊗~perp~⊥~sdot~⋅~lceil~⌈~rceil~⌉~lfloor~⌊~rfloor~⌋~lang~〈~rang~〉~loz~◊~spades~♠~clubs~♣~hearts~♥~diams~♦~~nbsp~ ~iexcl~¡~cent~¢~pound~£~curren~¤~yen~¥~brvbar~¦~sect~§~uml~¨~copy~©~ordf~ª~laquo~«~not~¬~shy~­~reg~®~macr~¯~deg~°~plusmn~±~sup2~²~sup3~³~acute~´~micro~µ~para~¶~middot~·~cedil~¸~sup1~¹~ordm~º~raquo~»~frac14~¼~frac12~½~frac34~¾~iquest~¿~Agrave~À~Aacute~Á~Acirc~Â~Atilde~Ã~Auml~Ä~Aring~Å~AElig~Æ~Ccedil~Ç~Egrave~È~Eacute~É~Ecirc~Ê~Euml~Ë~Igrave~Ì~Iacute~Í~Icirc~Î~Iuml~Ï~ETH~Ð~Ntilde~Ñ~Ograve~Ò~Oacute~Ó~Ocirc~Ô~Otilde~Õ~Ouml~Ö~times~×~Oslash~Ø~Ugrave~Ù~Uacute~Ú~Ucirc~Û~Uuml~Ü~Yacute~Ý~THORN~Þ~szlig~ß~agrave~à~aacute~á~acirc~â~atilde~ã~auml~ä~aring~å~aelig~æ~ccedil~ç~egrave~è~eacute~é~ecirc~ê~euml~ë~igrave~ì~iacute~í~icirc~î~iuml~ï~eth~ð~ntilde~ñ~ograve~ò~oacute~ó~ocirc~ô~otilde~õ~ouml~ö~divide~÷~oslash~ø~ugrave~ù~uacute~ú~ucirc~û~uuml~ü~yacute~ý~thorn~þ~yuml~ÿ~quot~"~amp~&~lt~<~gt~>`);
ge.html5 = sn('Abreve~Ă~Acy~А~Afr~𝔄~Amacr~Ā~And~⩓~Aogon~Ą~Aopf~𝔸~ApplyFunction~⁡~Ascr~𝒜~Assign~≔~Backslash~∖~Barv~⫧~Barwed~⌆~Bcy~Б~Because~∵~Bernoullis~ℬ~Bfr~𝔅~Bopf~𝔹~Breve~˘~Bscr~ℬ~Bumpeq~≎~CHcy~Ч~Cacute~Ć~Cap~⋒~CapitalDifferentialD~ⅅ~Cayleys~ℭ~Ccaron~Č~Ccirc~Ĉ~Cconint~∰~Cdot~Ċ~Cedilla~¸~CenterDot~·~Cfr~ℭ~CircleDot~⊙~CircleMinus~⊖~CirclePlus~⊕~CircleTimes~⊗~ClockwiseContourIntegral~∲~CloseCurlyDoubleQuote~”~CloseCurlyQuote~’~Colon~∷~Colone~⩴~Congruent~≡~Conint~∯~ContourIntegral~∮~Copf~ℂ~Coproduct~∐~CounterClockwiseContourIntegral~∳~Cross~⨯~Cscr~𝒞~Cup~⋓~CupCap~≍~DD~ⅅ~DDotrahd~⤑~DJcy~Ђ~DScy~Ѕ~DZcy~Џ~Darr~↡~Dashv~⫤~Dcaron~Ď~Dcy~Д~Del~∇~Dfr~𝔇~DiacriticalAcute~´~DiacriticalDot~˙~DiacriticalDoubleAcute~˝~DiacriticalGrave~`~DiacriticalTilde~˜~Diamond~⋄~DifferentialD~ⅆ~Dopf~𝔻~Dot~¨~DotDot~⃜~DotEqual~≐~DoubleContourIntegral~∯~DoubleDot~¨~DoubleDownArrow~⇓~DoubleLeftArrow~⇐~DoubleLeftRightArrow~⇔~DoubleLeftTee~⫤~DoubleLongLeftArrow~⟸~DoubleLongLeftRightArrow~⟺~DoubleLongRightArrow~⟹~DoubleRightArrow~⇒~DoubleRightTee~⊨~DoubleUpArrow~⇑~DoubleUpDownArrow~⇕~DoubleVerticalBar~∥~DownArrow~↓~DownArrowBar~⤓~DownArrowUpArrow~⇵~DownBreve~̑~DownLeftRightVector~⥐~DownLeftTeeVector~⥞~DownLeftVector~↽~DownLeftVectorBar~⥖~DownRightTeeVector~⥟~DownRightVector~⇁~DownRightVectorBar~⥗~DownTee~⊤~DownTeeArrow~↧~Downarrow~⇓~Dscr~𝒟~Dstrok~Đ~ENG~Ŋ~Ecaron~Ě~Ecy~Э~Edot~Ė~Efr~𝔈~Element~∈~Emacr~Ē~EmptySmallSquare~◻~EmptyVerySmallSquare~▫~Eogon~Ę~Eopf~𝔼~Equal~⩵~EqualTilde~≂~Equilibrium~⇌~Escr~ℰ~Esim~⩳~Exists~∃~ExponentialE~ⅇ~Fcy~Ф~Ffr~𝔉~FilledSmallSquare~◼~FilledVerySmallSquare~▪~Fopf~𝔽~ForAll~∀~Fouriertrf~ℱ~Fscr~ℱ~GJcy~Ѓ~Gammad~Ϝ~Gbreve~Ğ~Gcedil~Ģ~Gcirc~Ĝ~Gcy~Г~Gdot~Ġ~Gfr~𝔊~Gg~⋙~Gopf~𝔾~GreaterEqual~≥~GreaterEqualLess~⋛~GreaterFullEqual~≧~GreaterGreater~⪢~GreaterLess~≷~GreaterSlantEqual~⩾~GreaterTilde~≳~Gscr~𝒢~Gt~≫~HARDcy~Ъ~Hacek~ˇ~Hat~^~Hcirc~Ĥ~Hfr~ℌ~HilbertSpace~ℋ~Hopf~ℍ~HorizontalLine~─~Hscr~ℋ~Hstrok~Ħ~HumpDownHump~≎~HumpEqual~≏~IEcy~Е~IJlig~Ĳ~IOcy~Ё~Icy~И~Idot~İ~Ifr~ℑ~Im~ℑ~Imacr~Ī~ImaginaryI~ⅈ~Implies~⇒~Int~∬~Integral~∫~Intersection~⋂~InvisibleComma~⁣~InvisibleTimes~⁢~Iogon~Į~Iopf~𝕀~Iscr~ℐ~Itilde~Ĩ~Iukcy~І~Jcirc~Ĵ~Jcy~Й~Jfr~𝔍~Jopf~𝕁~Jscr~𝒥~Jsercy~Ј~Jukcy~Є~KHcy~Х~KJcy~Ќ~Kcedil~Ķ~Kcy~К~Kfr~𝔎~Kopf~𝕂~Kscr~𝒦~LJcy~Љ~Lacute~Ĺ~Lang~⟪~Laplacetrf~ℒ~Larr~↞~Lcaron~Ľ~Lcedil~Ļ~Lcy~Л~LeftAngleBracket~⟨~LeftArrow~←~LeftArrowBar~⇤~LeftArrowRightArrow~⇆~LeftCeiling~⌈~LeftDoubleBracket~⟦~LeftDownTeeVector~⥡~LeftDownVector~⇃~LeftDownVectorBar~⥙~LeftFloor~⌊~LeftRightArrow~↔~LeftRightVector~⥎~LeftTee~⊣~LeftTeeArrow~↤~LeftTeeVector~⥚~LeftTriangle~⊲~LeftTriangleBar~⧏~LeftTriangleEqual~⊴~LeftUpDownVector~⥑~LeftUpTeeVector~⥠~LeftUpVector~↿~LeftUpVectorBar~⥘~LeftVector~↼~LeftVectorBar~⥒~Leftarrow~⇐~Leftrightarrow~⇔~LessEqualGreater~⋚~LessFullEqual~≦~LessGreater~≶~LessLess~⪡~LessSlantEqual~⩽~LessTilde~≲~Lfr~𝔏~Ll~⋘~Lleftarrow~⇚~Lmidot~Ŀ~LongLeftArrow~⟵~LongLeftRightArrow~⟷~LongRightArrow~⟶~Longleftarrow~⟸~Longleftrightarrow~⟺~Longrightarrow~⟹~Lopf~𝕃~LowerLeftArrow~↙~LowerRightArrow~↘~Lscr~ℒ~Lsh~↰~Lstrok~Ł~Lt~≪~Map~⤅~Mcy~М~MediumSpace~ ~Mellintrf~ℳ~Mfr~𝔐~MinusPlus~∓~Mopf~𝕄~Mscr~ℳ~NJcy~Њ~Nacute~Ń~Ncaron~Ň~Ncedil~Ņ~Ncy~Н~NegativeMediumSpace~​~NegativeThickSpace~​~NegativeThinSpace~​~NegativeVeryThinSpace~​~NestedGreaterGreater~≫~NestedLessLess~≪~NewLine~\n~Nfr~𝔑~NoBreak~⁠~NonBreakingSpace~ ~Nopf~ℕ~Not~⫬~NotCongruent~≢~NotCupCap~≭~NotDoubleVerticalBar~∦~NotElement~∉~NotEqual~≠~NotEqualTilde~≂̸~NotExists~∄~NotGreater~≯~NotGreaterEqual~≱~NotGreaterFullEqual~≧̸~NotGreaterGreater~≫̸~NotGreaterLess~≹~NotGreaterSlantEqual~⩾̸~NotGreaterTilde~≵~NotHumpDownHump~≎̸~NotHumpEqual~≏̸~NotLeftTriangle~⋪~NotLeftTriangleBar~⧏̸~NotLeftTriangleEqual~⋬~NotLess~≮~NotLessEqual~≰~NotLessGreater~≸~NotLessLess~≪̸~NotLessSlantEqual~⩽̸~NotLessTilde~≴~NotNestedGreaterGreater~⪢̸~NotNestedLessLess~⪡̸~NotPrecedes~⊀~NotPrecedesEqual~⪯̸~NotPrecedesSlantEqual~⋠~NotReverseElement~∌~NotRightTriangle~⋫~NotRightTriangleBar~⧐̸~NotRightTriangleEqual~⋭~NotSquareSubset~⊏̸~NotSquareSubsetEqual~⋢~NotSquareSuperset~⊐̸~NotSquareSupersetEqual~⋣~NotSubset~⊂⃒~NotSubsetEqual~⊈~NotSucceeds~⊁~NotSucceedsEqual~⪰̸~NotSucceedsSlantEqual~⋡~NotSucceedsTilde~≿̸~NotSuperset~⊃⃒~NotSupersetEqual~⊉~NotTilde~≁~NotTildeEqual~≄~NotTildeFullEqual~≇~NotTildeTilde~≉~NotVerticalBar~∤~Nscr~𝒩~Ocy~О~Odblac~Ő~Ofr~𝔒~Omacr~Ō~Oopf~𝕆~OpenCurlyDoubleQuote~“~OpenCurlyQuote~‘~Or~⩔~Oscr~𝒪~Otimes~⨷~OverBar~‾~OverBrace~⏞~OverBracket~⎴~OverParenthesis~⏜~PartialD~∂~Pcy~П~Pfr~𝔓~PlusMinus~±~Poincareplane~ℌ~Popf~ℙ~Pr~⪻~Precedes~≺~PrecedesEqual~⪯~PrecedesSlantEqual~≼~PrecedesTilde~≾~Product~∏~Proportion~∷~Proportional~∝~Pscr~𝒫~Qfr~𝔔~Qopf~ℚ~Qscr~𝒬~RBarr~⤐~Racute~Ŕ~Rang~⟫~Rarr~↠~Rarrtl~⤖~Rcaron~Ř~Rcedil~Ŗ~Rcy~Р~Re~ℜ~ReverseElement~∋~ReverseEquilibrium~⇋~ReverseUpEquilibrium~⥯~Rfr~ℜ~RightAngleBracket~⟩~RightArrow~→~RightArrowBar~⇥~RightArrowLeftArrow~⇄~RightCeiling~⌉~RightDoubleBracket~⟧~RightDownTeeVector~⥝~RightDownVector~⇂~RightDownVectorBar~⥕~RightFloor~⌋~RightTee~⊢~RightTeeArrow~↦~RightTeeVector~⥛~RightTriangle~⊳~RightTriangleBar~⧐~RightTriangleEqual~⊵~RightUpDownVector~⥏~RightUpTeeVector~⥜~RightUpVector~↾~RightUpVectorBar~⥔~RightVector~⇀~RightVectorBar~⥓~Rightarrow~⇒~Ropf~ℝ~RoundImplies~⥰~Rrightarrow~⇛~Rscr~ℛ~Rsh~↱~RuleDelayed~⧴~SHCHcy~Щ~SHcy~Ш~SOFTcy~Ь~Sacute~Ś~Sc~⪼~Scedil~Ş~Scirc~Ŝ~Scy~С~Sfr~𝔖~ShortDownArrow~↓~ShortLeftArrow~←~ShortRightArrow~→~ShortUpArrow~↑~SmallCircle~∘~Sopf~𝕊~Sqrt~√~Square~□~SquareIntersection~⊓~SquareSubset~⊏~SquareSubsetEqual~⊑~SquareSuperset~⊐~SquareSupersetEqual~⊒~SquareUnion~⊔~Sscr~𝒮~Star~⋆~Sub~⋐~Subset~⋐~SubsetEqual~⊆~Succeeds~≻~SucceedsEqual~⪰~SucceedsSlantEqual~≽~SucceedsTilde~≿~SuchThat~∋~Sum~∑~Sup~⋑~Superset~⊃~SupersetEqual~⊇~Supset~⋑~TRADE~™~TSHcy~Ћ~TScy~Ц~Tab~	~Tcaron~Ť~Tcedil~Ţ~Tcy~Т~Tfr~𝔗~Therefore~∴~ThickSpace~  ~ThinSpace~ ~Tilde~∼~TildeEqual~≃~TildeFullEqual~≅~TildeTilde~≈~Topf~𝕋~TripleDot~⃛~Tscr~𝒯~Tstrok~Ŧ~Uarr~↟~Uarrocir~⥉~Ubrcy~Ў~Ubreve~Ŭ~Ucy~У~Udblac~Ű~Ufr~𝔘~Umacr~Ū~UnderBar~_~UnderBrace~⏟~UnderBracket~⎵~UnderParenthesis~⏝~Union~⋃~UnionPlus~⊎~Uogon~Ų~Uopf~𝕌~UpArrow~↑~UpArrowBar~⤒~UpArrowDownArrow~⇅~UpDownArrow~↕~UpEquilibrium~⥮~UpTee~⊥~UpTeeArrow~↥~Uparrow~⇑~Updownarrow~⇕~UpperLeftArrow~↖~UpperRightArrow~↗~Upsi~ϒ~Uring~Ů~Uscr~𝒰~Utilde~Ũ~VDash~⊫~Vbar~⫫~Vcy~В~Vdash~⊩~Vdashl~⫦~Vee~⋁~Verbar~‖~Vert~‖~VerticalBar~∣~VerticalLine~|~VerticalSeparator~❘~VerticalTilde~≀~VeryThinSpace~ ~Vfr~𝔙~Vopf~𝕍~Vscr~𝒱~Vvdash~⊪~Wcirc~Ŵ~Wedge~⋀~Wfr~𝔚~Wopf~𝕎~Wscr~𝒲~Xfr~𝔛~Xopf~𝕏~Xscr~𝒳~YAcy~Я~YIcy~Ї~YUcy~Ю~Ycirc~Ŷ~Ycy~Ы~Yfr~𝔜~Yopf~𝕐~Yscr~𝒴~ZHcy~Ж~Zacute~Ź~Zcaron~Ž~Zcy~З~Zdot~Ż~ZeroWidthSpace~​~Zfr~ℨ~Zopf~ℤ~Zscr~𝒵~abreve~ă~ac~∾~acE~∾̳~acd~∿~acy~а~af~⁡~afr~𝔞~aleph~ℵ~amacr~ā~amalg~⨿~andand~⩕~andd~⩜~andslope~⩘~andv~⩚~ange~⦤~angle~∠~angmsd~∡~angmsdaa~⦨~angmsdab~⦩~angmsdac~⦪~angmsdad~⦫~angmsdae~⦬~angmsdaf~⦭~angmsdag~⦮~angmsdah~⦯~angrt~∟~angrtvb~⊾~angrtvbd~⦝~angsph~∢~angst~Å~angzarr~⍼~aogon~ą~aopf~𝕒~ap~≈~apE~⩰~apacir~⩯~ape~≊~apid~≋~approx~≈~approxeq~≊~ascr~𝒶~ast~*~asympeq~≍~awconint~∳~awint~⨑~bNot~⫭~backcong~≌~backepsilon~϶~backprime~‵~backsim~∽~backsimeq~⋍~barvee~⊽~barwed~⌅~barwedge~⌅~bbrk~⎵~bbrktbrk~⎶~bcong~≌~bcy~б~becaus~∵~because~∵~bemptyv~⦰~bepsi~϶~bernou~ℬ~beth~ℶ~between~≬~bfr~𝔟~bigcap~⋂~bigcirc~◯~bigcup~⋃~bigodot~⨀~bigoplus~⨁~bigotimes~⨂~bigsqcup~⨆~bigstar~★~bigtriangledown~▽~bigtriangleup~△~biguplus~⨄~bigvee~⋁~bigwedge~⋀~bkarow~⤍~blacklozenge~⧫~blacksquare~▪~blacktriangle~▴~blacktriangledown~▾~blacktriangleleft~◂~blacktriangleright~▸~blank~␣~blk12~▒~blk14~░~blk34~▓~block~█~bne~=⃥~bnequiv~≡⃥~bnot~⌐~bopf~𝕓~bot~⊥~bottom~⊥~bowtie~⋈~boxDL~╗~boxDR~╔~boxDl~╖~boxDr~╓~boxH~═~boxHD~╦~boxHU~╩~boxHd~╤~boxHu~╧~boxUL~╝~boxUR~╚~boxUl~╜~boxUr~╙~boxV~║~boxVH~╬~boxVL~╣~boxVR~╠~boxVh~╫~boxVl~╢~boxVr~╟~boxbox~⧉~boxdL~╕~boxdR~╒~boxdl~┐~boxdr~┌~boxh~─~boxhD~╥~boxhU~╨~boxhd~┬~boxhu~┴~boxminus~⊟~boxplus~⊞~boxtimes~⊠~boxuL~╛~boxuR~╘~boxul~┘~boxur~└~boxv~│~boxvH~╪~boxvL~╡~boxvR~╞~boxvh~┼~boxvl~┤~boxvr~├~bprime~‵~breve~˘~bscr~𝒷~bsemi~⁏~bsim~∽~bsime~⋍~bsol~\\~bsolb~⧅~bsolhsub~⟈~bullet~•~bump~≎~bumpE~⪮~bumpe~≏~bumpeq~≏~cacute~ć~capand~⩄~capbrcup~⩉~capcap~⩋~capcup~⩇~capdot~⩀~caps~∩︀~caret~⁁~caron~ˇ~ccaps~⩍~ccaron~č~ccirc~ĉ~ccups~⩌~ccupssm~⩐~cdot~ċ~cemptyv~⦲~centerdot~·~cfr~𝔠~chcy~ч~check~✓~checkmark~✓~cir~○~cirE~⧃~circeq~≗~circlearrowleft~↺~circlearrowright~↻~circledR~®~circledS~Ⓢ~circledast~⊛~circledcirc~⊚~circleddash~⊝~cire~≗~cirfnint~⨐~cirmid~⫯~cirscir~⧂~clubsuit~♣~colon~:~colone~≔~coloneq~≔~comma~,~commat~@~comp~∁~compfn~∘~complement~∁~complexes~ℂ~congdot~⩭~conint~∮~copf~𝕔~coprod~∐~copysr~℗~cross~✗~cscr~𝒸~csub~⫏~csube~⫑~csup~⫐~csupe~⫒~ctdot~⋯~cudarrl~⤸~cudarrr~⤵~cuepr~⋞~cuesc~⋟~cularr~↶~cularrp~⤽~cupbrcap~⩈~cupcap~⩆~cupcup~⩊~cupdot~⊍~cupor~⩅~cups~∪︀~curarr~↷~curarrm~⤼~curlyeqprec~⋞~curlyeqsucc~⋟~curlyvee~⋎~curlywedge~⋏~curvearrowleft~↶~curvearrowright~↷~cuvee~⋎~cuwed~⋏~cwconint~∲~cwint~∱~cylcty~⌭~dHar~⥥~daleth~ℸ~dash~‐~dashv~⊣~dbkarow~⤏~dblac~˝~dcaron~ď~dcy~д~dd~ⅆ~ddagger~‡~ddarr~⇊~ddotseq~⩷~demptyv~⦱~dfisht~⥿~dfr~𝔡~dharl~⇃~dharr~⇂~diam~⋄~diamond~⋄~diamondsuit~♦~die~¨~digamma~ϝ~disin~⋲~div~÷~divideontimes~⋇~divonx~⋇~djcy~ђ~dlcorn~⌞~dlcrop~⌍~dollar~$~dopf~𝕕~dot~˙~doteq~≐~doteqdot~≑~dotminus~∸~dotplus~∔~dotsquare~⊡~doublebarwedge~⌆~downarrow~↓~downdownarrows~⇊~downharpoonleft~⇃~downharpoonright~⇂~drbkarow~⤐~drcorn~⌟~drcrop~⌌~dscr~𝒹~dscy~ѕ~dsol~⧶~dstrok~đ~dtdot~⋱~dtri~▿~dtrif~▾~duarr~⇵~duhar~⥯~dwangle~⦦~dzcy~џ~dzigrarr~⟿~eDDot~⩷~eDot~≑~easter~⩮~ecaron~ě~ecir~≖~ecolon~≕~ecy~э~edot~ė~ee~ⅇ~efDot~≒~efr~𝔢~eg~⪚~egs~⪖~egsdot~⪘~el~⪙~elinters~⏧~ell~ℓ~els~⪕~elsdot~⪗~emacr~ē~emptyset~∅~emptyv~∅~emsp13~ ~emsp14~ ~eng~ŋ~eogon~ę~eopf~𝕖~epar~⋕~eparsl~⧣~eplus~⩱~epsi~ε~epsiv~ϵ~eqcirc~≖~eqcolon~≕~eqsim~≂~eqslantgtr~⪖~eqslantless~⪕~equals~=~equest~≟~equivDD~⩸~eqvparsl~⧥~erDot~≓~erarr~⥱~escr~ℯ~esdot~≐~esim~≂~excl~!~expectation~ℰ~exponentiale~ⅇ~fallingdotseq~≒~fcy~ф~female~♀~ffilig~ﬃ~fflig~ﬀ~ffllig~ﬄ~ffr~𝔣~filig~ﬁ~fjlig~fj~flat~♭~fllig~ﬂ~fltns~▱~fopf~𝕗~fork~⋔~forkv~⫙~fpartint~⨍~frac13~⅓~frac15~⅕~frac16~⅙~frac18~⅛~frac23~⅔~frac25~⅖~frac35~⅗~frac38~⅜~frac45~⅘~frac56~⅚~frac58~⅝~frac78~⅞~frown~⌢~fscr~𝒻~gE~≧~gEl~⪌~gacute~ǵ~gammad~ϝ~gap~⪆~gbreve~ğ~gcirc~ĝ~gcy~г~gdot~ġ~gel~⋛~geq~≥~geqq~≧~geqslant~⩾~ges~⩾~gescc~⪩~gesdot~⪀~gesdoto~⪂~gesdotol~⪄~gesl~⋛︀~gesles~⪔~gfr~𝔤~gg~≫~ggg~⋙~gimel~ℷ~gjcy~ѓ~gl~≷~glE~⪒~gla~⪥~glj~⪤~gnE~≩~gnap~⪊~gnapprox~⪊~gne~⪈~gneq~⪈~gneqq~≩~gnsim~⋧~gopf~𝕘~grave~`~gscr~ℊ~gsim~≳~gsime~⪎~gsiml~⪐~gtcc~⪧~gtcir~⩺~gtdot~⋗~gtlPar~⦕~gtquest~⩼~gtrapprox~⪆~gtrarr~⥸~gtrdot~⋗~gtreqless~⋛~gtreqqless~⪌~gtrless~≷~gtrsim~≳~gvertneqq~≩︀~gvnE~≩︀~hairsp~ ~half~½~hamilt~ℋ~hardcy~ъ~harrcir~⥈~harrw~↭~hbar~ℏ~hcirc~ĥ~heartsuit~♥~hercon~⊹~hfr~𝔥~hksearow~⤥~hkswarow~⤦~hoarr~⇿~homtht~∻~hookleftarrow~↩~hookrightarrow~↪~hopf~𝕙~horbar~―~hscr~𝒽~hslash~ℏ~hstrok~ħ~hybull~⁃~hyphen~‐~ic~⁣~icy~и~iecy~е~iff~⇔~ifr~𝔦~ii~ⅈ~iiiint~⨌~iiint~∭~iinfin~⧜~iiota~℩~ijlig~ĳ~imacr~ī~imagline~ℐ~imagpart~ℑ~imath~ı~imof~⊷~imped~Ƶ~in~∈~incare~℅~infintie~⧝~inodot~ı~intcal~⊺~integers~ℤ~intercal~⊺~intlarhk~⨗~intprod~⨼~iocy~ё~iogon~į~iopf~𝕚~iprod~⨼~iscr~𝒾~isinE~⋹~isindot~⋵~isins~⋴~isinsv~⋳~isinv~∈~it~⁢~itilde~ĩ~iukcy~і~jcirc~ĵ~jcy~й~jfr~𝔧~jmath~ȷ~jopf~𝕛~jscr~𝒿~jsercy~ј~jukcy~є~kappav~ϰ~kcedil~ķ~kcy~к~kfr~𝔨~kgreen~ĸ~khcy~х~kjcy~ќ~kopf~𝕜~kscr~𝓀~lAarr~⇚~lAtail~⤛~lBarr~⤎~lE~≦~lEg~⪋~lHar~⥢~lacute~ĺ~laemptyv~⦴~lagran~ℒ~langd~⦑~langle~⟨~lap~⪅~larrb~⇤~larrbfs~⤟~larrfs~⤝~larrhk~↩~larrlp~↫~larrpl~⤹~larrsim~⥳~larrtl~↢~lat~⪫~latail~⤙~late~⪭~lates~⪭︀~lbarr~⤌~lbbrk~❲~lbrace~{~lbrack~[~lbrke~⦋~lbrksld~⦏~lbrkslu~⦍~lcaron~ľ~lcedil~ļ~lcub~{~lcy~л~ldca~⤶~ldquor~„~ldrdhar~⥧~ldrushar~⥋~ldsh~↲~leftarrow~←~leftarrowtail~↢~leftharpoondown~↽~leftharpoonup~↼~leftleftarrows~⇇~leftrightarrow~↔~leftrightarrows~⇆~leftrightharpoons~⇋~leftrightsquigarrow~↭~leftthreetimes~⋋~leg~⋚~leq~≤~leqq~≦~leqslant~⩽~les~⩽~lescc~⪨~lesdot~⩿~lesdoto~⪁~lesdotor~⪃~lesg~⋚︀~lesges~⪓~lessapprox~⪅~lessdot~⋖~lesseqgtr~⋚~lesseqqgtr~⪋~lessgtr~≶~lesssim~≲~lfisht~⥼~lfr~𝔩~lg~≶~lgE~⪑~lhard~↽~lharu~↼~lharul~⥪~lhblk~▄~ljcy~љ~ll~≪~llarr~⇇~llcorner~⌞~llhard~⥫~lltri~◺~lmidot~ŀ~lmoust~⎰~lmoustache~⎰~lnE~≨~lnap~⪉~lnapprox~⪉~lne~⪇~lneq~⪇~lneqq~≨~lnsim~⋦~loang~⟬~loarr~⇽~lobrk~⟦~longleftarrow~⟵~longleftrightarrow~⟷~longmapsto~⟼~longrightarrow~⟶~looparrowleft~↫~looparrowright~↬~lopar~⦅~lopf~𝕝~loplus~⨭~lotimes~⨴~lowbar~_~lozenge~◊~lozf~⧫~lpar~(~lparlt~⦓~lrarr~⇆~lrcorner~⌟~lrhar~⇋~lrhard~⥭~lrtri~⊿~lscr~𝓁~lsh~↰~lsim~≲~lsime~⪍~lsimg~⪏~lsqb~[~lsquor~‚~lstrok~ł~ltcc~⪦~ltcir~⩹~ltdot~⋖~lthree~⋋~ltimes~⋉~ltlarr~⥶~ltquest~⩻~ltrPar~⦖~ltri~◃~ltrie~⊴~ltrif~◂~lurdshar~⥊~luruhar~⥦~lvertneqq~≨︀~lvnE~≨︀~mDDot~∺~male~♂~malt~✠~maltese~✠~map~↦~mapsto~↦~mapstodown~↧~mapstoleft~↤~mapstoup~↥~marker~▮~mcomma~⨩~mcy~м~measuredangle~∡~mfr~𝔪~mho~℧~mid~∣~midast~*~midcir~⫰~minusb~⊟~minusd~∸~minusdu~⨪~mlcp~⫛~mldr~…~mnplus~∓~models~⊧~mopf~𝕞~mp~∓~mscr~𝓂~mstpos~∾~multimap~⊸~mumap~⊸~nGg~⋙̸~nGt~≫⃒~nGtv~≫̸~nLeftarrow~⇍~nLeftrightarrow~⇎~nLl~⋘̸~nLt~≪⃒~nLtv~≪̸~nRightarrow~⇏~nVDash~⊯~nVdash~⊮~nacute~ń~nang~∠⃒~nap~≉~napE~⩰̸~napid~≋̸~napos~ŉ~napprox~≉~natur~♮~natural~♮~naturals~ℕ~nbump~≎̸~nbumpe~≏̸~ncap~⩃~ncaron~ň~ncedil~ņ~ncong~≇~ncongdot~⩭̸~ncup~⩂~ncy~н~neArr~⇗~nearhk~⤤~nearr~↗~nearrow~↗~nedot~≐̸~nequiv~≢~nesear~⤨~nesim~≂̸~nexist~∄~nexists~∄~nfr~𝔫~ngE~≧̸~nge~≱~ngeq~≱~ngeqq~≧̸~ngeqslant~⩾̸~nges~⩾̸~ngsim~≵~ngt~≯~ngtr~≯~nhArr~⇎~nharr~↮~nhpar~⫲~nis~⋼~nisd~⋺~niv~∋~njcy~њ~nlArr~⇍~nlE~≦̸~nlarr~↚~nldr~‥~nle~≰~nleftarrow~↚~nleftrightarrow~↮~nleq~≰~nleqq~≦̸~nleqslant~⩽̸~nles~⩽̸~nless~≮~nlsim~≴~nlt~≮~nltri~⋪~nltrie~⋬~nmid~∤~nopf~𝕟~notinE~⋹̸~notindot~⋵̸~notinva~∉~notinvb~⋷~notinvc~⋶~notni~∌~notniva~∌~notnivb~⋾~notnivc~⋽~npar~∦~nparallel~∦~nparsl~⫽⃥~npart~∂̸~npolint~⨔~npr~⊀~nprcue~⋠~npre~⪯̸~nprec~⊀~npreceq~⪯̸~nrArr~⇏~nrarr~↛~nrarrc~⤳̸~nrarrw~↝̸~nrightarrow~↛~nrtri~⋫~nrtrie~⋭~nsc~⊁~nsccue~⋡~nsce~⪰̸~nscr~𝓃~nshortmid~∤~nshortparallel~∦~nsim~≁~nsime~≄~nsimeq~≄~nsmid~∤~nspar~∦~nsqsube~⋢~nsqsupe~⋣~nsubE~⫅̸~nsube~⊈~nsubset~⊂⃒~nsubseteq~⊈~nsubseteqq~⫅̸~nsucc~⊁~nsucceq~⪰̸~nsup~⊅~nsupE~⫆̸~nsupe~⊉~nsupset~⊃⃒~nsupseteq~⊉~nsupseteqq~⫆̸~ntgl~≹~ntlg~≸~ntriangleleft~⋪~ntrianglelefteq~⋬~ntriangleright~⋫~ntrianglerighteq~⋭~num~#~numero~№~numsp~ ~nvDash~⊭~nvHarr~⤄~nvap~≍⃒~nvdash~⊬~nvge~≥⃒~nvgt~>⃒~nvinfin~⧞~nvlArr~⤂~nvle~≤⃒~nvlt~<⃒~nvltrie~⊴⃒~nvrArr~⤃~nvrtrie~⊵⃒~nvsim~∼⃒~nwArr~⇖~nwarhk~⤣~nwarr~↖~nwarrow~↖~nwnear~⤧~oS~Ⓢ~oast~⊛~ocir~⊚~ocy~о~odash~⊝~odblac~ő~odiv~⨸~odot~⊙~odsold~⦼~ofcir~⦿~ofr~𝔬~ogon~˛~ogt~⧁~ohbar~⦵~ohm~Ω~oint~∮~olarr~↺~olcir~⦾~olcross~⦻~olt~⧀~omacr~ō~omid~⦶~ominus~⊖~oopf~𝕠~opar~⦷~operp~⦹~orarr~↻~ord~⩝~order~ℴ~orderof~ℴ~origof~⊶~oror~⩖~orslope~⩗~orv~⩛~oscr~ℴ~osol~⊘~otimesas~⨶~ovbar~⌽~par~∥~parallel~∥~parsim~⫳~parsl~⫽~pcy~п~percnt~%~period~.~pertenk~‱~pfr~𝔭~phiv~ϕ~phmmat~ℳ~phone~☎~pitchfork~⋔~planck~ℏ~planckh~ℎ~plankv~ℏ~plus~+~plusacir~⨣~plusb~⊞~pluscir~⨢~plusdo~∔~plusdu~⨥~pluse~⩲~plussim~⨦~plustwo~⨧~pm~±~pointint~⨕~popf~𝕡~pr~≺~prE~⪳~prap~⪷~prcue~≼~pre~⪯~prec~≺~precapprox~⪷~preccurlyeq~≼~preceq~⪯~precnapprox~⪹~precneqq~⪵~precnsim~⋨~precsim~≾~primes~ℙ~prnE~⪵~prnap~⪹~prnsim~⋨~profalar~⌮~profline~⌒~profsurf~⌓~propto~∝~prsim~≾~prurel~⊰~pscr~𝓅~puncsp~ ~qfr~𝔮~qint~⨌~qopf~𝕢~qprime~⁗~qscr~𝓆~quaternions~ℍ~quatint~⨖~quest~?~questeq~≟~rAarr~⇛~rAtail~⤜~rBarr~⤏~rHar~⥤~race~∽̱~racute~ŕ~raemptyv~⦳~rangd~⦒~range~⦥~rangle~⟩~rarrap~⥵~rarrb~⇥~rarrbfs~⤠~rarrc~⤳~rarrfs~⤞~rarrhk~↪~rarrlp~↬~rarrpl~⥅~rarrsim~⥴~rarrtl~↣~rarrw~↝~ratail~⤚~ratio~∶~rationals~ℚ~rbarr~⤍~rbbrk~❳~rbrace~}~rbrack~]~rbrke~⦌~rbrksld~⦎~rbrkslu~⦐~rcaron~ř~rcedil~ŗ~rcub~}~rcy~р~rdca~⤷~rdldhar~⥩~rdquor~”~rdsh~↳~realine~ℛ~realpart~ℜ~reals~ℝ~rect~▭~rfisht~⥽~rfr~𝔯~rhard~⇁~rharu~⇀~rharul~⥬~rhov~ϱ~rightarrow~→~rightarrowtail~↣~rightharpoondown~⇁~rightharpoonup~⇀~rightleftarrows~⇄~rightleftharpoons~⇌~rightrightarrows~⇉~rightsquigarrow~↝~rightthreetimes~⋌~ring~˚~risingdotseq~≓~rlarr~⇄~rlhar~⇌~rmoust~⎱~rmoustache~⎱~rnmid~⫮~roang~⟭~roarr~⇾~robrk~⟧~ropar~⦆~ropf~𝕣~roplus~⨮~rotimes~⨵~rpar~)~rpargt~⦔~rppolint~⨒~rrarr~⇉~rscr~𝓇~rsh~↱~rsqb~]~rsquor~’~rthree~⋌~rtimes~⋊~rtri~▹~rtrie~⊵~rtrif~▸~rtriltri~⧎~ruluhar~⥨~rx~℞~sacute~ś~sc~≻~scE~⪴~scap~⪸~sccue~≽~sce~⪰~scedil~ş~scirc~ŝ~scnE~⪶~scnap~⪺~scnsim~⋩~scpolint~⨓~scsim~≿~scy~с~sdotb~⊡~sdote~⩦~seArr~⇘~searhk~⤥~searr~↘~searrow~↘~semi~;~seswar~⤩~setminus~∖~setmn~∖~sext~✶~sfr~𝔰~sfrown~⌢~sharp~♯~shchcy~щ~shcy~ш~shortmid~∣~shortparallel~∥~sigmav~ς~simdot~⩪~sime~≃~simeq~≃~simg~⪞~simgE~⪠~siml~⪝~simlE~⪟~simne~≆~simplus~⨤~simrarr~⥲~slarr~←~smallsetminus~∖~smashp~⨳~smeparsl~⧤~smid~∣~smile~⌣~smt~⪪~smte~⪬~smtes~⪬︀~softcy~ь~sol~/~solb~⧄~solbar~⌿~sopf~𝕤~spadesuit~♠~spar~∥~sqcap~⊓~sqcaps~⊓︀~sqcup~⊔~sqcups~⊔︀~sqsub~⊏~sqsube~⊑~sqsubset~⊏~sqsubseteq~⊑~sqsup~⊐~sqsupe~⊒~sqsupset~⊐~sqsupseteq~⊒~squ~□~square~□~squarf~▪~squf~▪~srarr~→~sscr~𝓈~ssetmn~∖~ssmile~⌣~sstarf~⋆~star~☆~starf~★~straightepsilon~ϵ~straightphi~ϕ~strns~¯~subE~⫅~subdot~⪽~subedot~⫃~submult~⫁~subnE~⫋~subne~⊊~subplus~⪿~subrarr~⥹~subset~⊂~subseteq~⊆~subseteqq~⫅~subsetneq~⊊~subsetneqq~⫋~subsim~⫇~subsub~⫕~subsup~⫓~succ~≻~succapprox~⪸~succcurlyeq~≽~succeq~⪰~succnapprox~⪺~succneqq~⪶~succnsim~⋩~succsim~≿~sung~♪~supE~⫆~supdot~⪾~supdsub~⫘~supedot~⫄~suphsol~⟉~suphsub~⫗~suplarr~⥻~supmult~⫂~supnE~⫌~supne~⊋~supplus~⫀~supset~⊃~supseteq~⊇~supseteqq~⫆~supsetneq~⊋~supsetneqq~⫌~supsim~⫈~supsub~⫔~supsup~⫖~swArr~⇙~swarhk~⤦~swarr~↙~swarrow~↙~swnwar~⤪~target~⌖~tbrk~⎴~tcaron~ť~tcedil~ţ~tcy~т~tdot~⃛~telrec~⌕~tfr~𝔱~therefore~∴~thetav~ϑ~thickapprox~≈~thicksim~∼~thkap~≈~thksim~∼~timesb~⊠~timesbar~⨱~timesd~⨰~tint~∭~toea~⤨~top~⊤~topbot~⌶~topcir~⫱~topf~𝕥~topfork~⫚~tosa~⤩~tprime~‴~triangle~▵~triangledown~▿~triangleleft~◃~trianglelefteq~⊴~triangleq~≜~triangleright~▹~trianglerighteq~⊵~tridot~◬~trie~≜~triminus~⨺~triplus~⨹~trisb~⧍~tritime~⨻~trpezium~⏢~tscr~𝓉~tscy~ц~tshcy~ћ~tstrok~ŧ~twixt~≬~twoheadleftarrow~↞~twoheadrightarrow~↠~uHar~⥣~ubrcy~ў~ubreve~ŭ~ucy~у~udarr~⇅~udblac~ű~udhar~⥮~ufisht~⥾~ufr~𝔲~uharl~↿~uharr~↾~uhblk~▀~ulcorn~⌜~ulcorner~⌜~ulcrop~⌏~ultri~◸~umacr~ū~uogon~ų~uopf~𝕦~uparrow~↑~updownarrow~↕~upharpoonleft~↿~upharpoonright~↾~uplus~⊎~upsi~υ~upuparrows~⇈~urcorn~⌝~urcorner~⌝~urcrop~⌎~uring~ů~urtri~◹~uscr~𝓊~utdot~⋰~utilde~ũ~utri~▵~utrif~▴~uuarr~⇈~uwangle~⦧~vArr~⇕~vBar~⫨~vBarv~⫩~vDash~⊨~vangrt~⦜~varepsilon~ϵ~varkappa~ϰ~varnothing~∅~varphi~ϕ~varpi~ϖ~varpropto~∝~varr~↕~varrho~ϱ~varsigma~ς~varsubsetneq~⊊︀~varsubsetneqq~⫋︀~varsupsetneq~⊋︀~varsupsetneqq~⫌︀~vartheta~ϑ~vartriangleleft~⊲~vartriangleright~⊳~vcy~в~vdash~⊢~vee~∨~veebar~⊻~veeeq~≚~vellip~⋮~verbar~|~vert~|~vfr~𝔳~vltri~⊲~vnsub~⊂⃒~vnsup~⊃⃒~vopf~𝕧~vprop~∝~vrtri~⊳~vscr~𝓋~vsubnE~⫋︀~vsubne~⊊︀~vsupnE~⫌︀~vsupne~⊋︀~vzigzag~⦚~wcirc~ŵ~wedbar~⩟~wedge~∧~wedgeq~≙~wfr~𝔴~wopf~𝕨~wp~℘~wr~≀~wreath~≀~wscr~𝓌~xcap~⋂~xcirc~◯~xcup~⋃~xdtri~▽~xfr~𝔵~xhArr~⟺~xharr~⟷~xlArr~⟸~xlarr~⟵~xmap~⟼~xnis~⋻~xodot~⨀~xopf~𝕩~xoplus~⨁~xotime~⨂~xrArr~⟹~xrarr~⟶~xscr~𝓍~xsqcup~⨆~xuplus~⨄~xutri~△~xvee~⋁~xwedge~⋀~yacy~я~ycirc~ŷ~ycy~ы~yfr~𝔶~yicy~ї~yopf~𝕪~yscr~𝓎~yucy~ю~zacute~ź~zcaron~ž~zcy~з~zdot~ż~zeetrf~ℨ~zfr~𝔷~zhcy~ж~zigrarr~⇝~zopf~𝕫~zscr~𝓏~~AMP~&~COPY~©~GT~>~LT~<~QUOT~"~REG~®', ge.html4);
var no = {
  0: 65533,
  128: 8364,
  130: 8218,
  131: 402,
  132: 8222,
  133: 8230,
  134: 8224,
  135: 8225,
  136: 710,
  137: 8240,
  138: 352,
  139: 8249,
  140: 338,
  142: 381,
  145: 8216,
  146: 8217,
  147: 8220,
  148: 8221,
  149: 8226,
  150: 8211,
  151: 8212,
  152: 732,
  153: 8482,
  154: 353,
  155: 8250,
  156: 339,
  158: 382,
  159: 376
}, ro = String.fromCodePoint || function(t) {
  return String.fromCharCode(Math.floor((t - 65536) / 1024) + 55296, (t - 65536) % 1024 + 56320);
}, fe = function() {
  return fe = Object.assign || function(t) {
    for (var e, n = 1, r = arguments.length; n < r; n++) {
      e = arguments[n];
      for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    }
    return t;
  }, fe.apply(this, arguments);
}, io = fe(fe({}, ge), { all: ge.html5 }), so = {
  scope: "body",
  level: "all"
}, wt = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);/g, St = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+)[;=]?/g, qn = {
  xml: {
    strict: wt,
    attribute: St,
    body: vt.xml
  },
  html4: {
    strict: wt,
    attribute: St,
    body: vt.html4
  },
  html5: {
    strict: wt,
    attribute: St,
    body: vt.html5
  }
}, ao = fe(fe({}, qn), { all: qn.html5 }), Ir = String.fromCharCode, oo = Ir(65533);
function lo(t, e, n, r) {
  var i = t, s = t[t.length - 1];
  if (n && s === "=")
    i = t;
  else if (r && s !== ";")
    i = t;
  else {
    var o = e[t];
    if (o)
      i = o;
    else if (t[0] === "&" && t[1] === "#") {
      var a = t[2], c = a == "x" || a == "X" ? parseInt(t.substr(3), 16) : parseInt(t.substr(2));
      i = c >= 1114111 ? oo : c > 65535 ? ro(c) : Ir(no[c] || c);
    }
  }
  return i;
}
function _n(t, e) {
  var n = e === void 0 ? so : e, r = n.level, i = r === void 0 ? "all" : r, s = n.scope, o = s === void 0 ? i === "xml" ? "strict" : "body" : s;
  if (!t)
    return "";
  var a = ao[i][o], c = io[i].entities, l = o === "attribute", d = o === "strict";
  return t.replace(a, function(u) {
    return lo(u, c, l, d);
  });
}
var co = { strictlyTwoElementsInRangeArrays: !1, progressFn: null };
function Ze(t, e) {
  if (!Array.isArray(t) || !t.length) return t;
  let n = { ...co, ...e }, r, i;
  if (n.strictlyTwoElementsInRangeArrays && !t.every((a, c) => !Array.isArray(a) || a.length !== 2 ? (r = c, i = a.length, !1) : !0)) throw new TypeError(`ranges-sort: [THROW_ID_03] The first argument should be an array and must consist of arrays which are natural number indexes representing TWO string index ranges. However, ${r}th range (${JSON.stringify(t[r], null, 4)}) has not two but ${i} elements!`);
  if (!t.every((a, c) => !Array.isArray(a) || !Number.isInteger(a[0]) || a[0] < 0 || !Number.isInteger(a[1]) || a[1] < 0 ? (r = c, !1) : !0)) throw new TypeError(`ranges-sort: [THROW_ID_04] The first argument should be an array and must consist of arrays which are natural number indexes representing string index ranges. However, ${r}th range (${JSON.stringify(t[r], null, 4)}) does not consist of only natural numbers!`);
  let s = t.length ** 2, o = 0;
  return Array.from(t).sort((a, c) => (n.progressFn && (o += 1, n.progressFn(Math.floor(o * 100 / s))), a[0] === c[0] ? a[1] < c[1] ? -1 : a[1] > c[1] ? 1 : 0 : a[0] < c[0] ? -1 : 1));
}
var Dn = { mergeType: 1, progressFn: null, joinRangesThatTouchEdges: !0 };
function uo(t, e) {
  function n(l) {
    return !!l && typeof l == "object" && !Array.isArray(l);
  }
  if (!Array.isArray(t) || !t.length) return null;
  let r;
  if (e) if (n(e)) {
    if (r = { ...Dn, ...e }, r.progressFn && n(r.progressFn) && !Object.keys(r.progressFn).length) r.progressFn = null;
    else if (r.progressFn && typeof r.progressFn != "function") throw new Error(`ranges-merge: [THROW_ID_01] opts.progressFn must be a function! It was given of a type: "${typeof r.progressFn}", equal to ${JSON.stringify(r.progressFn, null, 4)}`);
    if (![1, 2, "1", "2"].includes(r.mergeType)) throw new Error(`ranges-merge: [THROW_ID_02] opts.mergeType was customised to a wrong thing! It was given of a type: "${typeof r.mergeType}", equal to ${JSON.stringify(r.mergeType, null, 4)}`);
    if (typeof r.joinRangesThatTouchEdges != "boolean") throw new Error(`ranges-merge: [THROW_ID_04] opts.joinRangesThatTouchEdges was customised to a wrong thing! It was given of a type: "${typeof r.joinRangesThatTouchEdges}", equal to ${JSON.stringify(r.joinRangesThatTouchEdges, null, 4)}`);
  } else throw new Error(`emlint: [THROW_ID_03] the second input argument must be a plain object. It was given as:
${JSON.stringify(e, null, 4)} (type ${typeof e})`);
  else r = { ...Dn };
  let i = t.filter((l) => Array.isArray(l)).map((l) => [...l]).filter((l) => l[2] !== void 0 || l[0] !== l[1]), s, o, a;
  r.progressFn ? s = Ze(i, { progressFn: (l) => {
    a = Math.floor(l / 5), a !== o && (o = a, r.progressFn(a));
  } }) : s = Ze(i);
  let c = s.length - 1;
  for (let l = c; l > 0; l--) r.progressFn && (a = Math.floor((1 - l / c) * 78) + 21, a !== o && a > o && (o = a, r.progressFn(a))), (s[l][0] <= s[l - 1][0] || !r.joinRangesThatTouchEdges && s[l][0] < s[l - 1][1] || r.joinRangesThatTouchEdges && s[l][0] <= s[l - 1][1]) && (s[l - 1][0] = Math.min(s[l][0], s[l - 1][0]), s[l - 1][1] = Math.max(s[l][1], s[l - 1][1]), s[l][2] !== void 0 && (s[l - 1][0] >= s[l][0] || s[l - 1][1] <= s[l][1]) && s[l - 1][2] !== null && (s[l][2] === null && s[l - 1][2] !== null ? s[l - 1][2] = null : s[l - 1][2] != null ? +r.mergeType == 2 && s[l - 1][0] === s[l][0] ? s[l - 1][2] = s[l][2] : s[l - 1][2] += s[l][2] : s[l - 1][2] = s[l][2]), s.splice(l, 1), l = s.length);
  return s.length ? s : null;
}
var ho = {}, go = ho.NODE_ENV === "production", $n = "Invariant failed";
function fo(t, e) {
  if (!t) {
    if (go)
      throw new Error($n);
    var n = $n;
    throw new Error(n);
  }
}
function po(t, e, n) {
  if (arguments.length === 0) throw new Error("ranges-apply: [THROW_ID_01] inputs missing!");
  if (typeof t != "string") throw new TypeError(`ranges-apply: [THROW_ID_02] first input argument must be a string! Currently it's: ${typeof t}, equal to: ${JSON.stringify(t, null, 4)}`);
  if (e && !Array.isArray(e)) throw new TypeError(`ranges-apply: [THROW_ID_03] second input argument must be an array (or null)! Currently it's: ${typeof e}, equal to: ${JSON.stringify(e, null, 4)}`);
  if (!e?.filter((o) => o).length) return t;
  let r;
  Array.isArray(e) && Number.isInteger(e[0]) && Number.isInteger(e[1]) ? r = [Array.from(e)] : r = Array.from(e), r.length, r.filter((o) => o).forEach((o, a) => {
    if (!Array.isArray(o)) throw new TypeError(`ranges-apply: [THROW_ID_05] ranges array, second input arg., has ${a}th element not an array: ${JSON.stringify(o, null, 4)}, which is ${typeof o}`);
    if (!Number.isInteger(o[0])) {
      if (!Number.isInteger(+o[0]) || +o[0] < 0) throw new TypeError(`ranges-apply: [THROW_ID_06] ranges array, second input arg. has ${a}th element, array ${JSON.stringify(o, null, 0)}. Its first element is not an integer, string index, but ${typeof o[0]}, equal to: ${JSON.stringify(o[0], null, 4)}.`);
      r[a][0] = +r[a][0];
    }
    if (!Number.isInteger(o[1])) {
      if (!Number.isInteger(+o[1]) || +o[1] < 0) throw new TypeError(`ranges-apply: [THROW_ID_07] ranges array, second input arg. has ${a}th element, array ${JSON.stringify(o, null, 0)}. Its second element is not an integer, string index, but ${typeof o[1]}, equal to: ${JSON.stringify(o[1], null, 4)}.`);
      r[a][1] = +r[a][1];
    }
  });
  let i = uo(r, { progressFn: (o) => {
  } });
  fo(i);
  let s = i.length;
  if (s > 0) {
    let o = t.slice(i[s - 1][1]);
    t = i.reduce((a, c, l, d) => {
      let u = l === 0 ? 0 : d[l - 1][1], g = d[l][0];
      return `${a}${t.slice(u, g)}${d[l][2] || ""}`;
    }, ""), t += o;
  }
  return t;
}
function kt(t, e = 1) {
  let n = " ";
  function r(s) {
    return Array.from(s).reverse().join("");
  }
  function i(s, o, a) {
    let c = a ? `
` : "\r", l = a ? "\r" : `
`;
    if (!s) return s;
    let d = 0, u = "";
    for (let g = 0, f = s.length; g < f; g++) (s[g] === c || s[g] === l && s[g - 1] !== c) && d++, `\r
`.includes(s[g]) || s[g] === n ? s[g] === n ? u += s[g] : s[g] === c ? d <= o && (u += s[g], s[g + 1] === l && (u += s[g + 1], g++)) : s[g] === l && s?.[g - 1] !== c && d <= o && (u += s[g]) : !s[g + 1] && !d && (u += " ");
    return u;
  }
  if (typeof t == "string" && t.length) {
    let s = 1;
    typeof +e == "number" && Number.isInteger(+e) && +e >= 0 && (s = +e);
    let o = "", a = "";
    if (!t.trim()) o = t;
    else if (!t[0].trim()) {
      for (let c = 0, l = t.length; c < l; c++) if (t[c].trim()) {
        o = t.slice(0, c);
        break;
      }
    }
    if (t.trim() && (t.slice(-1).trim() === "" || t.slice(-1) === n)) {
      for (let c = t.length; c--; ) if (t[c].trim()) {
        a = t.slice(c + 1);
        break;
      }
    }
    return `${i(o, s, !1)}${t.trim()}${r(i(r(a), s, !0))}`;
  }
  return t;
}
var Un = { mergeType: 1, progressFn: null, joinRangesThatTouchEdges: !0 };
function mo(t, e) {
  function n(l) {
    return !!l && typeof l == "object" && !Array.isArray(l);
  }
  if (!Array.isArray(t) || !t.length) return null;
  let r;
  if (e) if (n(e)) {
    if (r = { ...Un, ...e }, r.progressFn && n(r.progressFn) && !Object.keys(r.progressFn).length) r.progressFn = null;
    else if (r.progressFn && typeof r.progressFn != "function") throw new Error(`ranges-merge: [THROW_ID_01] resolvedOpts.progressFn must be a function! It was given of a type: "${typeof r.progressFn}", equal to ${JSON.stringify(r.progressFn, null, 4)}`);
    if (![1, 2, "1", "2"].includes(r.mergeType)) throw new Error(`ranges-merge: [THROW_ID_02] resolvedOpts.mergeType was customised to a wrong thing! It was given of a type: "${typeof r.mergeType}", equal to ${JSON.stringify(r.mergeType, null, 4)}`);
    if (typeof r.joinRangesThatTouchEdges != "boolean") throw new Error(`ranges-merge: [THROW_ID_04] resolvedOpts.joinRangesThatTouchEdges was customised to a wrong thing! It was given of a type: "${typeof r.joinRangesThatTouchEdges}", equal to ${JSON.stringify(r.joinRangesThatTouchEdges, null, 4)}`);
  } else throw new Error(`ranges-merge: [THROW_ID_03] the second input argument must be a plain object. It was given as:
${JSON.stringify(e, null, 4)} (type ${typeof e})`);
  else r = { ...Un };
  let i = t.filter((l) => Array.isArray(l)).map((l) => [...l]).filter((l) => l[2] !== void 0 || l[0] !== l[1]), s, o, a;
  r.progressFn ? s = Ze(i, { progressFn: (l) => {
    a = Math.floor(l / 5), a !== o && (o = a, r.progressFn != null && r.progressFn(a));
  } }) : s = Ze(i);
  let c = s.length - 1;
  for (let l = c; l > 0; l--) r.progressFn && (a = Math.floor((1 - l / c) * 78) + 21, a !== o && a > o && (o = a, r.progressFn(a))), (s[l][0] <= s[l - 1][0] || !r.joinRangesThatTouchEdges && s[l][0] < s[l - 1][1] || r.joinRangesThatTouchEdges && s[l][0] <= s[l - 1][1]) && (s[l - 1][0] = Math.min(s[l][0], s[l - 1][0]), s[l - 1][1] = Math.max(s[l][1], s[l - 1][1]), s[l][2] !== void 0 && (s[l - 1][0] >= s[l][0] || s[l - 1][1] <= s[l][1]) && s[l - 1][2] !== null && (s[l][2] === null && s[l - 1][2] !== null ? s[l - 1][2] = null : s[l - 1][2] != null ? +(r || {})?.mergeType == 2 && s[l - 1][0] === s[l][0] ? s[l - 1][2] = s[l][2] : s[l - 1][2] += s[l][2] : s[l - 1][2] = s[l][2]), s.splice(l, 1), l = s.length);
  return s.length ? s : null;
}
var yo = { limitToBeAddedWhitespace: !1, limitLinebreaksCount: 1, mergeType: 1 }, bo = class {
  constructor(e) {
    let n = { ...yo, ...e };
    if (n.mergeType && n.mergeType !== 1 && n.mergeType !== 2) if (re(n.mergeType) && n.mergeType.trim() === "1") n.mergeType = 1;
    else if (re(n.mergeType) && n.mergeType.trim() === "2") n.mergeType = 2;
    else throw new Error(`ranges-push: [THROW_ID_02] opts.mergeType was customised to a wrong thing! It was given of a type: "${typeof n.mergeType}", equal to ${JSON.stringify(n.mergeType, null, 4)}`);
    this.opts = n, this.ranges = [];
  }
  ranges;
  opts;
  add(e, n, r) {
    if (e == null && n == null) return;
    if (W(e) && !W(n)) {
      if (Array.isArray(e)) {
        if (e.length) {
          if (e.some((o) => Array.isArray(o))) {
            e.forEach((o) => {
              Array.isArray(o) && this.add(...o);
            });
            return;
          }
          e.length && ee(+e[0]) && ee(+e[1]) && this.add(...e);
        }
        return;
      }
      throw new TypeError(`ranges-push/Ranges/add(): [THROW_ID_12] the first input argument, "from" is set (${JSON.stringify(e, null, 0)}) but second-one, "to" is not (${JSON.stringify(n, null, 0)})`);
    } else if (!W(e) && W(n)) throw new TypeError(`ranges-push/Ranges/add(): [THROW_ID_13] the second input argument, "to" is set (${JSON.stringify(n, null, 0)}) but first-one, "from" is not (${JSON.stringify(e, null, 0)})`);
    let i = +e, s = +n;
    if (ee(i) && ee(s)) {
      if (W(r) && !re(r) && !Wi(r)) throw new TypeError(`ranges-push/Ranges/add(): [THROW_ID_08] The third argument, the value to add, was given not as string but ${typeof r}, equal to:
${JSON.stringify(r, null, 4)}`);
      if (W(this.ranges) && Array.isArray(this.last()) && i === this.last()[1]) {
        if (this.last()[1] = s, this.last()[2], this.last()[2] !== null && W(r)) {
          let o = this.last()[2] && this.last()[2].length && (!this.opts?.mergeType || this.opts.mergeType === 1) ? `${this.last()[2]}${r}` : r;
          this.opts.limitToBeAddedWhitespace && (o = kt(o, this.opts.limitLinebreaksCount)), re(o) && !o.length || (this.last()[2] = o);
        }
      } else {
        this.ranges || (this.ranges = []);
        let o = r !== void 0 && !(re(r) && !r.length) ? [i, s, r && this.opts.limitToBeAddedWhitespace ? kt(r, this.opts.limitLinebreaksCount) : r] : [i, s];
        this.ranges.push(o);
      }
    } else throw ee(i) && i >= 0 ? new TypeError(`ranges-push/Ranges/add(): [THROW_ID_10] "to" value, the second input argument, must be a natural number or zero! Currently it's of a type "${typeof s}" equal to: ${JSON.stringify(s, null, 4)}`) : new TypeError(`ranges-push/Ranges/add(): [THROW_ID_09] "from" value, the first input argument, must be a natural number or zero! Currently it's of a type "${typeof i}" equal to: ${JSON.stringify(i, null, 4)}`);
  }
  push(e, n, r) {
    this.add(e, n, r);
  }
  current() {
    return Array.isArray(this.ranges) && this.ranges.length ? (this.ranges = mo(this.ranges, { mergeType: this.opts.mergeType }), this.ranges && this.opts.limitToBeAddedWhitespace ? this.ranges.map((e) => W(e[2]) ? [e[0], e[1], kt(e[2], this.opts.limitLinebreaksCount)] : e) : this.ranges) : null;
  }
  wipe() {
    this.ranges = [];
  }
  replace(e) {
    if (Array.isArray(e) && e.length) if (Array.isArray(e[0]) && ee(e[0][0])) this.ranges = Array.from(e);
    else throw new Error(`ranges-push/Ranges/replace(): [THROW_ID_11] Single range was given but we expected array of arrays! The first element, ${JSON.stringify(e[0], null, 4)} should be an array and its first element should be an integer, a string index.`);
    else this.ranges = [];
  }
  last() {
    return Array.isArray(this.ranges) && this.ranges.length ? this.ranges[this.ranges.length - 1] : null;
  }
};
yr();
var xt = " ";
function vo({ str: t, idx: e = 0, stopAtNewlines: n = !1, stopAtRawNbsp: r = !1 }) {
  if (typeof t != "string" || !t.length || ((!e || typeof e != "number") && (e = 0), !t[e + 1])) return null;
  if (t[e + 1] && (t[e + 1].trim() || n && `
\r`.includes(t[e + 1]) || r && t[e + 1] === xt)) return e + 1;
  if (t[e + 2] && (t[e + 2].trim() || n && `
\r`.includes(t[e + 2]) || r && t[e + 2] === xt)) return e + 2;
  for (let i = e + 1, s = t.length; i < s; i++) if (t[i].trim() || n && `
\r`.includes(t[i]) || r && t[i] === xt) return i;
  return null;
}
function B(t, e = 0) {
  return vo({ str: t, idx: e, stopAtNewlines: !1, stopAtRawNbsp: !1 });
}
function wo(t) {
  return /[-_A-Za-z0-9]/.test(t);
}
function Bn(t, e) {
  if (!t) return [];
  if (Array.isArray(t)) return t.filter((n) => typeof n == "string" && n.trim());
  if (typeof t == "string") return t.trim() ? [t] : [];
  throw new TypeError(`string-strip-html/stripHtml(): [THROW_ID_05] ${e} must be array containing zero or more strings or something falsey. Currently it's equal to: ${t}, that a type of ${typeof t}.`);
}
function Ue(t, e, n, r) {
  for (let i = e, s = t.length; i < s; i++) {
    if (t.startsWith(n, i)) return !0;
    if (t.startsWith(r, i)) return !1;
  }
  return !1;
}
function Vn(t, e, n) {
  return t?.quotes, t?.quotes?.value && Ue(e, n + 1, t.quotes.value, ">"), t?.quotes?.next, Ue(e, t?.quotes?.next - 1, t?.quotes?.value, ">"), !t?.quotes || !Ue(e, n + 1, t.quotes.value, ">") && t?.quotes?.next !== -1 && Ue(e, t?.quotes?.next - 1, t?.quotes?.value, ">");
}
function So(t, e) {
  return (e.match(new RegExp(t, "g")) || []).length;
}
var ke = /* @__PURE__ */ new Set(["!doctype", "abbr", "address", "area", "article", "aside", "audio", "base", "bdi", "bdo", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "doctype", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "math", "menu", "menuitem", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "param", "picture", "pre", "progress", "rb", "rp", "rt", "rtc", "ruby", "samp", "script", "section", "select", "slot", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "svg", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "ul", "var", "video", "wbr", "xml"]), Et = /* @__PURE__ */ new Set(["a", "b", "i", "p", "q", "s", "u"]), Ct = /* @__PURE__ */ new Set([".", ",", ";", "!", "?"]), zn = /* @__PURE__ */ new Set([".", ",", "?", ";", ")", "…", '"', "»"]), ko = /* @__PURE__ */ new Set(["a", "abbr", "acronym", "audio", "b", "bdi", "bdo", "big", "button", "canvas", "cite", "code", "data", "datalist", "del", "dfn", "em", "embed", "i", "iframe", "input", "ins", "kbd", "label", "map", "mark", "meter", "noscript", "object", "output", "picture", "progress", "q", "ruby", "s", "samp", "select", "slot", "small", "span", "strong", "sub", "sup", "svg", "template", "textarea", "time", "u", "tt", "var", "video", "wbr"]), jn = { ignoreTags: [], ignoreTagsWithTheirContents: [], onlyStripTags: [], stripTogetherWithTheirContents: ["script", "style", "xml"], skipHtmlDecoding: !1, trimOnlySpaces: !1, stripRecognisedHTMLOnly: !1, dumpLinkHrefsNearby: { enabled: !1, putOnNewLine: !1, wrapHeads: "", wrapTails: "" }, ignoreIndentations: !1, cb: null, reportProgressFunc: null, reportProgressFuncFrom: 0, reportProgressFuncTo: 100 };
function Nr(t, e) {
  let n = Date.now(), r = [], i = [], s = [], o = [], a = {};
  function c() {
    a = { attributes: [] };
  }
  c();
  let l = null, d = null, u = null, g = !1, f = {}, y = { tagName: "", hrefValue: "", openingTagEnds: void 0 }, m = "", p = !1, w = null, E = !0;
  function x(h, v, k) {
    if (Array.isArray(v.stripTogetherWithTheirContents) && (v.stripTogetherWithTheirContents.includes(a.name) || v.stripTogetherWithTheirContents.includes("*"))) if (a.slashPresent && Array.isArray(r) && r.some((S) => S.name === a.name)) {
      for (let S = r.length; S--; ) if (r[S].name === a.name) {
        o = o.filter(([T, P]) => (T < r[S].lastOpeningBracketAt || T >= h + 1) && (P <= r[S].lastOpeningBracketAt || P > h + 1));
        let O = h + 1;
        a.lastClosingBracketAt && (O = a.lastClosingBracketAt + 1), o.push([r[S].lastOpeningBracketAt, O]), zn.has(t[h]) && v.cb ? v.cb({ tag: a, deleteFrom: r[S].lastOpeningBracketAt, deleteTo: h + 1, insert: null, rangesArr: k, proposedReturn: [r[S].lastOpeningBracketAt, h, null] }) : v.cb && v.cb({ tag: a, deleteFrom: r[S].lastOpeningBracketAt, deleteTo: h, insert: "", rangesArr: k, proposedReturn: [r[S].lastOpeningBracketAt, h, ""] }), r.splice(S, 1);
        break;
      }
    } else a.slashPresent || r.push(a);
    else Array.isArray(v.ignoreTagsWithTheirContents) && ye(h, v, a) && (E = !1);
  }
  function R(h, v, k, S, O, T) {
    if (Array.isArray(A.current()) && typeof k == "number" && A.current()[0][0] === 0 && A.current()[0][1] >= k) return "";
    if (t.length === S && T && !b?.dumpLinkHrefsNearby?.enabled) return null;
    let P = "";
    if (Number.isInteger(k) && k < O && (P += h.slice(k, O)), Number.isInteger(S) && S > T + 1) {
      let V = h.slice(T + 1, S);
      S && !B(t, S - 1) && (V = V.trimEnd()), V.includes(`
`) && q(S, h) ? P += " " : P += V;
    }
    let Y = !zn.has(h[v]), bn = h[S - 1] !== ">" || !h[k].trim(), vn = !['"', "("].includes(h[O - 1]), gi = ![";", ".", ":", "!"].includes(h[v]);
    if ((Y || bn && vn && gi) && (bn || vn) && h[v] !== "!" && (!ko.has(a.name) || typeof k == "number" && k < O || typeof S == "number" && S > T + 1)) {
      let V = P.match(/\n/g);
      return Array.isArray(V) && V.length ? V.length === 1 ? `
` : V.length === 2 ? `

` : `


` : " ";
    }
    return "";
  }
  function N(h, v) {
    if (h.dumpLinkHrefsNearby?.enabled && y.tagName && y.tagName === a.name && a.lastOpeningBracketAt && (y.openingTagEnds && a.lastOpeningBracketAt > y.openingTagEnds || !y.openingTagEnds) && (p = !0), p) {
      let k = h.dumpLinkHrefsNearby?.putOnNewLine ? `

` : "";
      m = `${k}${y.hrefValue}`, (typeof v != "number" || B(t, v - 1)) && (m += k);
    }
  }
  function q(h, v) {
    return v ? v[h] === "<" && v[h + 1] !== "%" : t[h] === "<" && t[h + 1] !== "%";
  }
  function U(h) {
    return t[h] === ">" && t[h - 1] !== "%";
  }
  function ye(h, v, k) {
    if (v.ignoreTagsWithTheirContents.includes("*")) return !0;
    let S = t.indexOf(`<${k.name}`, h), O = t.indexOf(`</${k.name}`, h);
    return !k.slashPresent && O === -1 || k.slashPresent && !i.some((T) => T.name === k.name) || O > -1 && S > -1 && S < O ? !1 : v.ignoreTagsWithTheirContents.includes(k.name);
  }
  if (typeof t != "string") throw new TypeError(`string-strip-html/stripHtml(): [THROW_ID_01] Input must be string! Currently it's: ${(typeof t).toLowerCase()}, equal to:
${JSON.stringify(t, null, 4)}`);
  if (e) if (zt(e)) {
    if (e.reportProgressFunc && typeof e.reportProgressFunc != "function") throw new Error(`string-strip-html/stripHtml(): [THROW_ID_03] The Optional Options Object's key reportProgressFunc, callback function, should be a function but it was given as type ${typeof e.reportProgressFunc}, equal to ${JSON.stringify(e.reportProgressFunc, null, 4)}`);
    if (typeof e.dumpLinkHrefsNearby == "boolean" && e.dumpLinkHrefsNearby != null) throw new Error(`string-strip-html/stripHtml(): [THROW_ID_04] The Optional Options Object's key should be a plain object but it was given as type ${typeof e.dumpLinkHrefsNearby}, equal to ${JSON.stringify(e.dumpLinkHrefsNearby, null, 4)}`);
  } else throw new TypeError(`string-strip-html/stripHtml(): [THROW_ID_02] Optional Options Object must be a plain object! Currently it's: ${(typeof e).toLowerCase()}, equal to:
${JSON.stringify(e, null, 4)}`);
  function be() {
    p && (y = { tagName: "", hrefValue: "", openingTagEnds: void 0 }, p = !1);
  }
  let b = { ...jn, ...e, dumpLinkHrefsNearby: Object.assign({}, jn.dumpLinkHrefsNearby, e?.dumpLinkHrefsNearby) };
  if (Gi(b, "returnRangesOnly")) throw new TypeError("string-strip-html/stripHtml(): [THROW_ID_05] The Optional Options Object's key returnRangesOnly has been removed from the API since v.5 release.");
  if (b.reportProgressFunc) {
    if (typeof b.reportProgressFuncFrom != "number") throw new Error(`string-strip-html/stripHtml(): [THROW_ID_06] The Optional Options Object's key reportProgressFuncFrom, callback function's "from" range, should be a number but it was given as type ${typeof b.reportProgressFuncFrom}, equal to ${JSON.stringify(b.reportProgressFuncFrom, null, 4)}`);
    if (typeof b.reportProgressFuncTo != "number") throw new Error(`string-strip-html/stripHtml(): [THROW_ID_07] The Optional Options Object's key reportProgressFuncTo, callback function's "to" range, should be a number but it was given as type ${typeof b.reportProgressFuncTo}, equal to ${JSON.stringify(b.reportProgressFuncTo, null, 4)}`);
  }
  b.ignoreTags = Bn(b.ignoreTags, "resolvedOpts.ignoreTags"), b.onlyStripTags = Bn(b.onlyStripTags, "resolvedOpts.onlyStripTags");
  let mn = !!b.onlyStripTags.length;
  b.onlyStripTags.length && b.ignoreTags.length && (b.onlyStripTags = Ya(b.onlyStripTags, ...b.ignoreTags)), b.stripTogetherWithTheirContents ? typeof b.stripTogetherWithTheirContents == "string" && b.stripTogetherWithTheirContents.length && (b.stripTogetherWithTheirContents = [b.stripTogetherWithTheirContents]) : b.stripTogetherWithTheirContents = [];
  let ve = {};
  if (b.stripTogetherWithTheirContents && Array.isArray(b.stripTogetherWithTheirContents) && b.stripTogetherWithTheirContents.length && !b.stripTogetherWithTheirContents.every((h, v) => typeof h != "string" ? (ve.el = h, ve.i = v, !1) : !0)) throw new TypeError(`string-strip-html/stripHtml(): [THROW_ID_08] Optional Options Object's key stripTogetherWithTheirContents was set to contain not just string elements! For example, element at index ${ve.i} has a value ${ve.el} which is not string but ${(typeof ve.el).toLowerCase()}.`);
  b.cb || (b.cb = ({ rangesArr: h, proposedReturn: v }) => {
    v && h.push(...v);
  });
  let A = new bo({ limitToBeAddedWhitespace: !0, limitLinebreaksCount: 2 });
  if (!b.skipHtmlDecoding) for (; t !== _n(t, { scope: "strict" }); ) t = _n(t, { scope: "strict" });
  let J = !1, F = !1, $e = 0, yn = 0, D = t.length, di = Math.floor(D / 2);
  for (let h = 0; h < D; h++) {
    if (b.reportProgressFunc && (D > 1e3 && D < 2e3 ? h === di && b.reportProgressFunc(Math.floor((b.reportProgressFuncTo - b.reportProgressFuncFrom) / 2)) : D >= 2e3 && ($e = b.reportProgressFuncFrom + Math.floor(h / D * (b.reportProgressFuncTo - b.reportProgressFuncFrom)), $e !== yn && (yn = $e, b.reportProgressFunc($e)))), Object.keys(a).length > 1 && a.lastClosingBracketAt && a.lastClosingBracketAt < h && t[h] !== " " && w === null && (w = h), !J && t[h] === "%" && t[h - 1] === "{" && t.includes("%}", h + 1)) {
      u = null;
      let v = t.indexOf("%}", h) - 1;
      if (v > h) {
        h = v;
        continue;
      }
    }
    if (!J && U(h) && (!a || Object.keys(a).length < 2) && h > 1) {
      for (let v = h; v--; ) if (t[v - 1] === void 0 || U(v)) {
        let k = t[v - 1] === void 0 ? v : v + 1, S = t.slice(k, h + 1) || "";
        if ((S.includes("/>") || S.includes("/ >") || S.includes('="') || S.includes("='")) && t !== `<${Ln(S.trim(), "/>")}>` && [...ke].some((O) => Ln(S.trim().split(/\s+/).filter((T) => T.trim()).filter((T, P) => P === 0), "/>").toLowerCase() === O) && Nr(`<${S.trim()}>`, b).result === "") {
          (!s.length || s[s.length - 1][0] !== a.lastOpeningBracketAt) && s.push([k, h + 1]), (!o.length || o[o.length - 1][0] !== a.lastOpeningBracketAt) && o.push([k, h + 1]);
          let O = R(t, h, k, h + 1, k, h + 1), T = h + 1;
          if (t[T] && !t[T].trim()) {
            for (let P = T; P < D; P++) if (t[P].trim()) {
              T = P;
              break;
            }
          }
          b.cb({ tag: a, deleteFrom: k, deleteTo: T, insert: O, rangesArr: A, proposedReturn: [k, T, O] });
        }
        break;
      }
    }
    if (!F && t[h] === "/" && !a.quotes?.value && Number.isInteger(a.lastOpeningBracketAt) && !Number.isInteger(a.lastClosingBracketAt) && (a.slashPresent = h), t[h] === '"' || t[h] === "'") if (!F && a.nameStarts && a?.quotes?.value === t[h]) if (f.valueStarts === void 0) f = {}, delete a.quotes;
    else {
      f.valueEnds = h, f.value = t.slice(f.valueStarts, h), a.attributes.push(f), f = {}, delete a.quotes;
      let v;
      b.dumpLinkHrefsNearby?.enabled && !r.length && a.attributes.some((k) => {
        if (typeof k.name == "string" && k.name.toLowerCase() === "href") return v = `${b.dumpLinkHrefsNearby?.wrapHeads || ""}${k.value}${b.dumpLinkHrefsNearby?.wrapTails || ""}`, !0;
      }) && (y = { tagName: a.name, hrefValue: v, openingTagEnds: void 0 });
    }
    else !F && !a.quotes && a.nameStarts && (a.quotes = {}, a.quotes.value = t[h], a.quotes.start = h, a.quotes.next = t.indexOf(t[h], h + 1), f.nameStarts && f.nameEnds && f.nameEnds < h && f.nameStarts < h && !f.valueStarts && (f.name = t.slice(f.nameStarts, f.nameEnds)));
    if (a.nameStarts !== void 0 && a.nameEnds === void 0 && (!t[h].trim() || !wo(t[h]))) {
      if (a.nameEnds = h, a.name = t.slice(a.nameStarts, a.nameEnds + (!U(h) && t[h] !== "/" && t[h + 1] === void 0 ? 1 : 0)), t[a.nameStarts - 1] !== "!" && !a.name.replace(/-/g, "").length || /^\d+$/.test(a.name[0])) {
        a = {};
        continue;
      }
      if (typeof a.name == "string" && a.name.toLowerCase() === "doctype" && (F = !0), q(h)) {
        N(b);
        let v = R(t, h, a.leftOuterWhitespace, h, a.lastOpeningBracketAt, h);
        (b.stripTogetherWithTheirContents.includes(a.name) || b.stripTogetherWithTheirContents.includes("*")) && (o = o.filter(([k, S]) => !(k === a.leftOuterWhitespace && S === h))), b.cb({ tag: a, deleteFrom: a.leftOuterWhitespace, deleteTo: h, insert: `${v}${m}${v}`, rangesArr: A, proposedReturn: [a.leftOuterWhitespace, h, `${v}${m}${v}`] }), be(), x(h, b, A);
      }
    }
    if (a.quotes?.start && a.quotes.start < h && !a.quotes.end && f.nameEnds && f.equalsAt && !f.valueStarts && (f.valueStarts = h), !a.quotes && f.nameEnds && t[h] === "=" && !f.valueStarts && !f.equalsAt && (f.equalsAt = h), !a.quotes && f.nameStarts && f.nameEnds && !f.valueStarts && t[h].trim() && t[h] !== "=" && (a.attributes.push(f), f = {}), !a.quotes && f.nameStarts && !f.nameEnds && (F && `'"`.includes(t[f.nameStarts]) ? f.nameStarts < h && t[h] === t[f.nameStarts] && (f.nameEnds = h + 1, f.name = t.slice(f.nameStarts, f.nameEnds)) : t[h].trim() ? t[h] === "=" ? f.equalsAt || (f.nameEnds = h, f.equalsAt = h, f.name = t.slice(f.nameStarts, f.nameEnds)) : t[h] === "/" || U(h) ? (f.nameEnds = h, f.name = t.slice(f.nameStarts, f.nameEnds), a.attributes.push(f), f = {}) : q(h) && (f.nameEnds = h, f.name = t.slice(f.nameStarts, f.nameEnds), a.attributes.push(f), f = {}) : (f.nameEnds = h, f.name = t.slice(f.nameStarts, f.nameEnds))), !a.quotes && a.nameEnds < h && !t[h - 1].trim() && t[h].trim() && !"<>/!".includes(t[h]) && !f.nameStarts && !a.lastClosingBracketAt && (f.nameStarts = h), a.lastOpeningBracketAt !== null && a.lastOpeningBracketAt < h && t[h] === "/" && a.onlyPlausible && (a.onlyPlausible = !1), a.lastOpeningBracketAt !== null && a.lastOpeningBracketAt < h && t[h] !== "/" && (a.onlyPlausible === void 0 && ((!t[h].trim() || q(h)) && !a.slashPresent ? a.onlyPlausible = !0 : a.onlyPlausible = !1), t[h].trim() && a.nameStarts === void 0 && !q(h) && t[h] !== "/" && !U(h) && t[h] !== "!" && (a.nameStarts = h, a.nameContainsLetters = !1)), a.nameStarts && !a.quotes && typeof t[h] == "string" && t[h].toLowerCase() !== t[h].toUpperCase() && (a.nameContainsLetters = !0), U(h) && (Vn(a, t, h) || a.quotes.value && typeof a.lastOpeningBracketAt == "number" && So(a.quotes.value, t.slice(a.lastOpeningBracketAt, h)) % 2 === 1 && !t.slice(a.lastOpeningBracketAt + 1, h).includes("<") && !t.slice(a.lastOpeningBracketAt + 1, h).includes(">")) && a.lastOpeningBracketAt !== void 0 && (a.lastClosingBracketAt = h, w = null, Object.keys(f).length && (a.attributes.push(f), f = {}), b.dumpLinkHrefsNearby?.enabled && y.tagName && !y.openingTagEnds && (y.openingTagEnds = h)), (!F || t[h] === ">") && a.lastOpeningBracketAt !== void 0) {
      if (a.lastClosingBracketAt === void 0) {
        if (a.lastOpeningBracketAt < h && !q(h) && (t[h + 1] === void 0 || q(h + 1) && !a?.quotes?.value) && a.nameContainsLetters && typeof a.nameStarts == "number") {
          if (a.name = t.slice(a.nameStarts, a.nameEnds || h + 1).toLowerCase(), (!s.length || s[s.length - 1][0] !== a.lastOpeningBracketAt) && s.push([a.lastOpeningBracketAt, h + 1]), b.ignoreTags.includes(a.name) || ye(h, b, a) || !ke.has(a.name) && (a.onlyPlausible || b.stripRecognisedHTMLOnly)) {
            a = {}, f = {};
            continue;
          }
          if ((ke.has(a.name) || Et.has(a.name)) && (a.onlyPlausible === !1 || a.onlyPlausible === !0 && a.attributes.length) || t[h + 1] === void 0) {
            N(b);
            let v = R(t, h, a.leftOuterWhitespace, h + 1, a.lastOpeningBracketAt, a.lastClosingBracketAt);
            J && a.name === "script" && a.slashPresent && (J = !1);
            let k;
            v === null || m === null ? k = null : k = `${v}${m}${v}`, b.cb({ tag: a, deleteFrom: a.leftOuterWhitespace, deleteTo: h + 1, insert: k, rangesArr: A, proposedReturn: [a.leftOuterWhitespace, h + 1, k] }), be(), x(h, b, A);
          }
          if (!o.length || o[o.length - 1][0] !== a.lastOpeningBracketAt && o[o.length - 1][1] !== h + 1) if (b.stripTogetherWithTheirContents.includes(a.name) || b.stripTogetherWithTheirContents.includes("*")) {
            let v;
            for (let k = r.length; k--; ) r[k].name === a.name && (v = r[k]);
            v ? (o = o.filter(([k]) => k !== v.lastOpeningBracketAt), o.push([v.lastOpeningBracketAt, h + 1])) : o.push([a.lastOpeningBracketAt, h + 1]);
          } else o.push([a.lastOpeningBracketAt, h + 1]);
        }
      } else if (h > a.lastClosingBracketAt && t[h].trim() || t[h + 1] === void 0 || b.ignoreIndentations && `\r
`.includes(t[h])) {
        let v = a.lastClosingBracketAt === h ? h + 1 : h;
        b.trimOnlySpaces && v === D - 1 && w !== null && w < h && (v = w), (!s.length || s[s.length - 1][0] !== a.lastOpeningBracketAt) && s.push([a.lastOpeningBracketAt, a.lastClosingBracketAt + 1]);
        let k = b.ignoreTags.includes(a.name), S = ye(h, b, a);
        if (!E || b.stripRecognisedHTMLOnly && typeof a.name == "string" && !ke.has(a.name.toLowerCase()) && !Et.has(a.name.toLowerCase()) || !mn && (k || S) || mn && !b.onlyStripTags.includes(a.name) || b.ignoreTagsWithTheirContents.includes(a.name)) {
          if (S) if (a.slashPresent) {
            for (let O = i.length; O--; ) if (i[O].name === a.name) {
              i.splice(O, 1);
              break;
            }
            i.length || (E = !0);
          } else E && (E = !1), i.push(a);
          b.cb({ tag: a, deleteFrom: null, deleteTo: null, insert: null, rangesArr: A, proposedReturn: null }), a = {}, f = {};
        } else if (!a.onlyPlausible || a.attributes.length === 0 && a.name && (ke.has(a.name.toLowerCase()) || Et.has(a.name.toLowerCase())) || a.attributes?.some((O) => O.equalsAt)) {
          (!o.length || o[o.length - 1][0] !== a.lastOpeningBracketAt) && o.push([a.lastOpeningBracketAt, a.lastClosingBracketAt + 1]);
          let O = R(t, h, a.leftOuterWhitespace, v, a.lastOpeningBracketAt, a.lastClosingBracketAt);
          m = "", p = !1, N(b, v);
          let T;
          typeof m == "string" && m.length ? (T = `${O}${m}${O === `

` ? `
` : O}`, v === a.lastClosingBracketAt + 1 && (!t[v] || !Ct.has(t[v])) && (T += " "), a.leftOuterWhitespace === a.lastOpeningBracketAt && A.last() && A.last()[1] < a.lastOpeningBracketAt && (!b?.dumpLinkHrefsNearby?.putOnNewLine || !Ct.has(t[v])) && (T = " " + T)) : T = O, T !== null && (a.leftOuterWhitespace === 0 || !B(t, v - 1)) && (!b.dumpLinkHrefsNearby?.enabled || a.name !== "a") && (T = void 0);
          let P = 0;
          if (p && Ct.has(t[v])) {
            b.dumpLinkHrefsNearby?.putOnNewLine && (T = `${t[v]}${T || ""}`);
            let Y = B(t, v);
            Y && T?.endsWith(`
`) ? P += Y - h : (!Y || Y > h) && P++;
          }
          b.cb({ tag: a, deleteFrom: a.leftOuterWhitespace, deleteTo: v + P, insert: T, rangesArr: A, proposedReturn: [a.leftOuterWhitespace, v + P, T] }), be(), x(h, b, A);
        } else a = {};
        U(h) || (a = {});
      }
      F && (F = !1);
    }
    if ((!J || t[h] === "<" && B(t, B(t, h)) && t[B(t, h)] === "/" && t.startsWith("script", B(t, B(t, h)))) && q(h) && !q(h - 1) && !`'"`.includes(t[h + 1]) && (!`'"`.includes(t[h + 2]) || /\w/.test(t[h + 1])) && !(t[h + 1] === "c" && t[h + 2] === ":") && !(t[h + 1] === "f" && t[h + 2] === "m" && t[h + 3] === "t" && t[h + 4] === ":") && !(t[h + 1] === "s" && t[h + 2] === "q" && t[h + 3] === "l" && t[h + 4] === ":") && !(t[h + 1] === "x" && t[h + 2] === ":") && !(t[h + 1] === "f" && t[h + 2] === "n" && t[h + 3] === ":") && Vn(a, t, h)) {
      if (U(B(t, h))) continue;
      if (a.nameEnds && a.nameEnds < h && !a.lastClosingBracketAt && (a.onlyPlausible === !0 && a.attributes?.length || a.onlyPlausible === !1)) {
        let v = R(t, h, a.leftOuterWhitespace, h, a.lastOpeningBracketAt, h);
        b.cb({ tag: a, deleteFrom: a.leftOuterWhitespace, deleteTo: h, insert: v, rangesArr: A, proposedReturn: [a.leftOuterWhitespace, h, v] }), x(h, b, A), a = {}, f = {};
      }
      if (a.lastOpeningBracketAt !== void 0 && a.onlyPlausible && a.name && !a.quotes && (a.lastOpeningBracketAt = void 0, a.name = void 0, a.onlyPlausible = !1), (a.lastOpeningBracketAt === void 0 || !a.onlyPlausible) && !a.quotes && (a.lastOpeningBracketAt = h, a.slashPresent = !1, a.attributes = [], l === null ? a.leftOuterWhitespace = h : b.trimOnlySpaces && l === 0 ? a.leftOuterWhitespace = d || h : a.leftOuterWhitespace = l, `${t[h + 1]}${t[h + 2]}${t[h + 3]}` == "!--" || `${t[h + 1]}${t[h + 2]}${t[h + 3]}${t[h + 4]}${t[h + 5]}${t[h + 6]}${t[h + 7]}${t[h + 8]}` == "![CDATA[")) {
        let v = !0;
        t[h + 2] === "-" && (v = !1);
        let k;
        for (let S = h; S < D; S++) if ((!k && v && `${t[S - 2]}${t[S - 1]}${t[S]}` == "]]>" || !v && `${t[S - 2]}${t[S - 1]}${t[S]}` == "-->") && (k = S), k && (k < S && t[S].trim() || t[S + 1] === void 0)) {
          let O = S;
          (t[S + 1] === void 0 && !t[S].trim() || t[S] === ">") && (O += 1), (!s.length || s[s.length - 1][0] !== a.lastOpeningBracketAt) && s.push([a.lastOpeningBracketAt, k + 1]), (!o.length || o[o.length - 1][0] !== a.lastOpeningBracketAt) && o.push([a.lastOpeningBracketAt, k + 1]);
          let T = R(t, S, a.leftOuterWhitespace, O, a.lastOpeningBracketAt, k);
          b.cb({ tag: a, deleteFrom: a.leftOuterWhitespace, deleteTo: O, insert: T, rangesArr: A, proposedReturn: [a.leftOuterWhitespace, O, T] }), h = S - 1, t[S] === ">" && (h = S), a = {}, f = {};
          break;
        }
      }
    }
    !t[h].trim() || t[h].charCodeAt(0) === 847 ? (l === null && (l = h, a.lastOpeningBracketAt !== void 0 && a.lastOpeningBracketAt < h && a.nameStarts && a.nameStarts < a.lastOpeningBracketAt && h === a.lastOpeningBracketAt + 1 && !r.some((v) => v.name === a.name) && (a.onlyPlausible = !0, a.name = void 0, a.nameStarts = void 0)), (t[h] === `
` || t[h] === "\r") && (u = h, g && (g = !1))) : (l !== null && (!a.quotes && f.equalsAt > l - 1 && f.nameEnds && f.equalsAt > f.nameEnds && t[h] !== '"' && t[h] !== "'" && (zt(f) && a.attributes.push(f), f = {}, a.equalsSpottedAt = void 0), l = null), g || (g = !0, E && !J && typeof u == "number" && h && u < h - 1 && (t.slice(u + 1, h).trim() ? u = null : b.ignoreIndentations || A.push([u + 1, h])))), t[h] === " " ? d === null && (d = h) : d !== null && (d = null), a.name === "script" && (J = !a.slashPresent);
  }
  if (t && !b.ignoreIndentations && (b.trimOnlySpaces && t[0] === " " || !b.trimOnlySpaces && !t[0].trim())) for (let h = 0; h < D; h++) if (b.trimOnlySpaces && t[h] !== " " || !b.trimOnlySpaces && t[h].trim()) {
    A.push([0, h]);
    break;
  } else t[h + 1] || A.push([0, h + 1]);
  if (t && (b.trimOnlySpaces && t[~-t.length] === " " || !b.trimOnlySpaces && !t[~-t.length].trim())) {
    for (let h = t.length; h--; ) if (b.trimOnlySpaces && t[h] !== " " || !b.trimOnlySpaces && t[h].trim()) {
      A.push([h + 1, D]);
      break;
    }
  }
  let H = A.current();
  if (!e?.cb && H && (H[0] && !H[0][0] && (H[0][1], A.ranges[0] = [A.ranges[0][0], A.ranges[0][1]]), H[H.length - 1]?.[1] === t.length && (H[H.length - 1][0], A.ranges))) {
    let h = A.ranges[A.ranges.length - 1][0];
    t[h - 1] && (b.trimOnlySpaces && t[h - 1] === " " || !b.trimOnlySpaces && !t[h - 1].trim()) && (h -= 1);
    let v = A.ranges[A.ranges.length - 1][2];
    A.ranges[A.ranges.length - 1] = [h, A.ranges[A.ranges.length - 1][1]], v?.trim() && A.ranges[A.ranges.length - 1].push(v.trimEnd());
  }
  return { log: { timeTakenInMilliseconds: Date.now() - n }, result: po(t, A.current()), ranges: A.current(), allTagLocations: s, filteredTagLocations: o };
}
class Mn {
  speechSynthesis;
  speechSynthesisUtterance;
  currentVoice = null;
  currentUtterances = [];
  currentUtteranceIndex = 0;
  playbackState = "idle";
  events = new ut();
  voiceManager = null;
  voices = [];
  defaultVoice = null;
  speakInContentLanguage = !1;
  languageVoiceCache = /* @__PURE__ */ new Map();
  warmingLanguages = /* @__PURE__ */ new Map();
  speakGeneration = 0;
  // Enhanced properties for cross-browser compatibility
  resumeInfinityTimer;
  isSpeakingInternal = !1;
  isPausedInternal = !1;
  isAndroidPaused = !1;
  // Explicitly tracks Android's paused state
  pausedAtUtteranceIndex = null;
  // Tracks which utterance was playing when paused
  initialized = !1;
  maxLengthExceeded = "warn";
  utterancesBeingCancelled = !1;
  // Flag to track if utterances are being cancelled
  // Playback parameters
  rate = 1;
  pitch = 1;
  volume = 1;
  features;
  patches;
  constructor() {
    if (this.features = zi(), this.patches = ji(), !this.features.speechSynthesis || !this.features.speechSynthesisUtterance)
      throw new Error("Web Speech API is not available in this environment");
    this.speechSynthesis = this.features.speechSynthesis, this.speechSynthesisUtterance = this.features.speechSynthesisUtterance;
  }
  // From Easy Speech,
  // Check infinity pattern for long texts (except on problematic platforms)
  // Skip resume infinity for Microsoft Natural voices as they have different behavior 
  shouldUseResumeInfinity() {
    const e = this.currentVoice, n = !!(e?.name && typeof e.name == "string" && e.name.toLocaleLowerCase().includes("(natural)"));
    return this.patches.isAndroid !== !0 && !this.patches.isFirefox && !this.patches.isSafari && !n;
  }
  // Creates a new SpeechSynthesisUtterance using detected constructor
  createUtterance(e) {
    return new this.speechSynthesisUtterance(e);
  }
  async initialize(e = {}) {
    const { languages: n, maxTimeout: r, interval: i, maxLengthExceeded: s = "warn" } = e;
    if (this.initialized)
      return !1;
    this.maxLengthExceeded = s;
    try {
      this.voiceManager = await I.initialize({
        languages: n,
        maxTimeout: r,
        interval: i
      }), this.voices = this.voiceManager.getVoices();
      const o = n || [...navigator.languages || ["en"]];
      return this.defaultVoice = await this.voiceManager.getDefaultVoice(o, this.voices), this.initialized = !0, !0;
    } catch (o) {
      return console.error("Failed to initialize WebSpeechEngine:", o), this.initialized = !1, !1;
    }
  }
  // Text length validation matching EasySpeech
  validateText(e) {
    if (new TextEncoder().encode(e).length > 4096) {
      const r = "Text exceeds max length of 4096 bytes, which may not work with some voices.";
      switch (this.maxLengthExceeded) {
        case "none":
          break;
        case "error":
          throw new Error(`WebSpeechEngine: ${r}`);
        default:
          console.warn(`WebSpeechEngine: ${r}`);
      }
    }
  }
  getCurrentVoiceForUtterance(e) {
    return e && typeof e == "object" ? e : typeof e == "string" ? this.voices.find((n) => n.name === e || n.language === e) || null : this.currentVoice || this.defaultVoice;
  }
  // No cross-region fallback: fr-FR content must not match an fr-CA voice.
  voiceMatchesLanguage(e, n) {
    const [r, i] = L(n), [s, o] = L(e.language);
    return s === r && (!i || o === i);
  }
  // Returns `undefined` (not a fallback voice) when content.language hasn't
  // been warmed into languageVoiceCache yet — callers must await for it.
  voiceForUtteranceSync(e) {
    const n = this.getCurrentVoiceForUtterance(this.currentVoice);
    if (!this.speakInContentLanguage || !e.language)
      return n;
    const r = $(e.language);
    if (n && this.voiceMatchesLanguage(n, r))
      return n;
    if (this.languageVoiceCache.has(r))
      return this.languageVoiceCache.get(r) ?? n;
  }
  // Awaits warming for a not-yet-seen content language rather than falling back
  // to the wrong-language voice.
  async voiceForUtterance(e) {
    const n = this.voiceForUtteranceSync(e);
    return n !== void 0 ? n : (await this.warmLanguageVoiceCache([e]), this.voiceForUtteranceSync(e) ?? this.getCurrentVoiceForUtterance(this.currentVoice));
  }
  // Dedupes in-flight warms per language so an awaited call and a
  // fire-and-forget one for the same language don't redo the work.
  async warmLanguageVoiceCache(e) {
    if (!this.speakInContentLanguage || !this.voiceManager)
      return;
    const n = new Set(
      e.map((o) => o.language).filter((o) => !!o).map((o) => $(o)).filter((o) => !this.languageVoiceCache.has(o))
    ), r = [...n].filter((o) => this.warmingLanguages.has(o)), s = [...n].filter((o) => !this.warmingLanguages.has(o)).map((o) => {
      const a = (async () => {
        await I.initialize({ languages: [o] }), this.voices = this.voiceManager.getVoices();
        const c = this.voices.filter((u) => this.voiceMatchesLanguage(u, o)), d = (await this.voiceManager.sortVoicesByQuality(c))[0] ?? null;
        this.languageVoiceCache.set(o, d), d || this.emitEvent({ type: "languagefallback", detail: { language: o, reason: "no-matching-voice" } });
      })();
      return this.warmingLanguages.set(o, a.finally(() => this.warmingLanguages.delete(o))), this.warmingLanguages.get(o);
    });
    await Promise.all([
      ...s,
      ...r.map((o) => this.warmingLanguages.get(o))
    ]);
  }
  getCurrentVoice() {
    return this.currentVoice;
  }
  setSpeakInContentLanguage(e) {
    this.speakInContentLanguage = e, e && this.warmLanguageVoiceCache(this.currentUtterances);
  }
  getSpeakInContentLanguage() {
    return this.speakInContentLanguage;
  }
  // Web Speech API has no SSML support: use the authored plain text, falling
  // back to a tag-stripped rendering of the SSML only when no plain
  // alternative was provided by the source.
  toPlainText(e) {
    return e.map((n) => ({
      ...n,
      plain: n.plain ?? (n.ssml ? Nr(n.ssml).result : "")
    }));
  }
  // Queue Management
  loadUtterances(e, n) {
    this.currentUtterances = this.toPlainText(e), this.currentUtteranceIndex = Ke(n ?? 0, e.length), this.warmLanguageVoiceCache(this.currentUtterances), this.playbackState = "ready", this.emitEvent({ type: "ready" });
  }
  // Voice Configuration
  async setVoice(e) {
    const n = this.currentVoice;
    if (typeof e == "string") {
      const r = this.voices.find((i) => i.name === e || i.language === e);
      r ? (this.currentVoice = r, n && n.name !== r.name && (this.currentUtteranceIndex = 0)) : console.warn(`Voice "${e}" not found`);
    } else
      this.currentVoice = e, n && n.name !== e.name && (this.currentUtteranceIndex = 0);
    this.voiceManager && this.defaultVoice && this.currentVoice && this.currentVoice.language !== this.defaultVoice.language && (this.defaultVoice = await this.voiceManager.getDefaultVoice([this.currentVoice.language], this.voices));
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
    if (this.currentUtterances.length === 0) {
      console.warn("No utterances loaded");
      return;
    }
    this.cancelCurrentSpeech();
    const n = ++this.speakGeneration;
    this.isSpeakingInternal = !0, this.isPausedInternal = !1, this.setState("playing"), this.emitEvent({ type: "start" }), this.stopResumeInfinity(), this.currentUtteranceIndex >= this.currentUtterances.length && (this.currentUtteranceIndex = 0), this.speakCurrentUtterance(n);
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
    const n = this.currentUtterances[this.currentUtteranceIndex], r = n.plain ?? "";
    this.validateText(r);
    const i = this.createUtterance(r), s = await this.voiceForUtterance(n);
    if (e === this.speakGeneration) {
      if (s && this.voiceManager) {
        const o = this.voiceManager.convertToSpeechSynthesisVoice(s);
        o && (i.voice = o, i.lang = o.lang);
      }
      n.language && (i.lang = n.language), i.rate = this.rate, i.pitch = this.pitch, i.volume = this.volume, i.onstart = () => {
        this.isSpeakingInternal = !0, this.isPausedInternal = !1, this.setState("playing"), this.emitEvent({ type: "start" }), this.patches.isAndroid && this.isAndroidPaused && (this.isAndroidPaused = !1), this.shouldUseResumeInfinity() && this.startResumeInfinity(i);
      }, i.onend = () => {
        if (this.utterancesBeingCancelled) {
          this.utterancesBeingCancelled = !1;
          return;
        }
        this.playbackState !== "idle" && (this.isSpeakingInternal = !1, this.isPausedInternal = !1, this.stopResumeInfinity(), this.currentUtteranceIndex >= this.currentUtterances.length - 1 && this.setState("idle"), this.emitEvent({ type: "end" }));
      }, i.onerror = (o) => {
        if (o.error === "interrupted" && this.patches.isAndroid && this.isAndroidPaused)
          return;
        this.isSpeakingInternal = !1, this.isPausedInternal = !1, this.stopResumeInfinity(), this.setState("idle"), ["synthesis-unavailable", "audio-hardware", "voice-unavailable"].includes(o.error) && (console.log("[ENGINE] fatal error detected, resetting index to 0"), this.currentUtteranceIndex = 0), o.error === "interrupted" || o.error === "canceled" ? this.emitEvent({ type: "stop" }) : this.emitEvent({
          type: "error",
          detail: {
            error: o.error,
            // Preserve original error type
            message: `Speech synthesis error: ${o.error}`
          }
        });
      }, i.onpause = () => {
        this.isPausedInternal = !0, this.isSpeakingInternal = !1, this.emitEvent({ type: "pause" });
      }, i.onresume = () => {
        this.isPausedInternal = !1, this.isSpeakingInternal = !0, this.emitEvent({ type: "resume" });
      }, i.onboundary = (o) => {
        this.emitEvent({
          type: "boundary",
          detail: {
            charIndex: o.charIndex,
            charLength: o.charLength,
            elapsedTime: o.elapsedTime,
            name: o.name
          }
        });
      }, i.onmark = (o) => {
        this.emitEvent({
          type: "mark",
          detail: {
            name: o.name
          }
        });
      }, this.speechSynthesis.speak(i);
    }
  }
  startResumeInfinity(e) {
    this.shouldUseResumeInfinity() && (this.resumeInfinityTimer = window.setTimeout(() => {
      if (e) {
        const { paused: r, speaking: i } = this.speechSynthesis, s = i || this.isSpeakingInternal, o = r || this.isPausedInternal;
        s && !o && (this.speechSynthesis.pause(), this.speechSynthesis.resume());
      }
      this.startResumeInfinity(e);
    }, 5e3));
  }
  stopResumeInfinity() {
    this.resumeInfinityTimer && (clearTimeout(this.resumeInfinityTimer), this.resumeInfinityTimer = void 0);
  }
  pause() {
    this.playbackState === "playing" && (this.pausedAtUtteranceIndex = this.currentUtteranceIndex, this.patches.isAndroid ? (this.isAndroidPaused = !0, this.speechSynthesis.cancel()) : this.speechSynthesis.pause(), this.isPausedInternal = !0, this.isSpeakingInternal = !1, this.setState("paused"), this.emitEvent({ type: "pause" }));
  }
  resume() {
    this.playbackState === "paused" && this.currentUtteranceIndex < this.currentUtterances.length && (this.isPausedInternal = !1, this.isSpeakingInternal = !0, this.setState("playing"), this.emitEvent({ type: "resume" }), this.patches.isAndroid || this.pausedAtUtteranceIndex !== this.currentUtteranceIndex ? this.speak(this.currentUtteranceIndex) : this.speechSynthesis.resume(), this.pausedAtUtteranceIndex = null);
  }
  stop() {
    this.speechSynthesis.cancel(), this.speakGeneration++, this.currentUtteranceIndex = 0, this.patches.isAndroid && (this.isAndroidPaused = !1), this.setState("idle"), this.emitEvent({ type: "stop" });
  }
  // Playback Parameters
  setRate(e) {
    this.rate = Math.max(0.1, Math.min(10, e));
  }
  getRate() {
    return this.rate;
  }
  setPitch(e) {
    this.pitch = Math.max(0, Math.min(2, e));
  }
  getPitch() {
    return this.pitch;
  }
  setVolume(e) {
    this.volume = Math.max(0, Math.min(1, e));
  }
  getVolume() {
    return this.volume;
  }
  // State
  getState() {
    return this.playbackState;
  }
  getCurrentUtteranceIndex() {
    return this.currentUtteranceIndex;
  }
  setCurrentUtteranceIndex(e, n) {
    if (e < 0 || e >= this.currentUtterances.length) {
      n?.(!1);
      return;
    }
    e !== this.currentUtteranceIndex && (!this.isPausedInternal && this.isSpeakingInternal && this.cancelCurrentSpeech(), this.currentUtteranceIndex = e, n?.(!0));
  }
  getUtteranceCount() {
    return this.currentUtterances.length;
  }
  // Events
  on(e, n) {
    return this.events.on(e, n);
  }
  emitEvent(e) {
    this.events.emit(e.type, e);
  }
  setState(e) {
    const n = this.playbackState;
    if (this.playbackState = e, n !== e)
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
class Lc {
  id = "webspeech";
  name = "Web Speech API";
  voiceEngine = null;
  // No cache to bypass here — local API, no network cost to re-checking.
  async getVoices() {
    return this.voiceEngine || (this.voiceEngine = new Mn(), await this.voiceEngine.initialize()), this.voiceEngine.getAvailableVoices();
  }
  async createEngine(e) {
    const n = new Mn();
    return await n.initialize(), e && await n.setVoice(e), n;
  }
  async destroy() {
    this.voiceEngine && (await this.voiceEngine.destroy(), this.voiceEngine = null);
  }
}
const le = "\\p{Pe}\\p{Pf}.,;:!?，。、；：！？،؛؟", Ft = "\\p{Ps}\\p{Pi}¿¡", xo = new RegExp(`^[${le}]`, "u"), Eo = new RegExp(`^[${Ft}]`, "u");
function gt(t) {
  return xo.test(t);
}
function Co(t) {
  return Eo.test(t);
}
function Pr(t, e) {
  const n = [];
  let r = -1, i = -1;
  const s = () => {
    r !== -1 && (n.push({ text: Ao(t, r, i), offset: t[r].offset }), r = -1, i = -1);
  };
  for (let o = 0; o < t.length; o++) {
    const a = t[o];
    if (a.text.length > e) {
      s(), n.push({ text: a.text, offset: a.offset });
      continue;
    }
    const c = a.offset + a.text.length, l = r === -1 ? a.text.length : c - t[r].offset;
    r !== -1 && l > e && s(), r === -1 && (r = o), i = o;
  }
  return s(), n;
}
function Ao(t, e, n) {
  const r = t[e], i = t[n];
  return r === i ? r.text : t.slice(e, n + 1).map((s) => s.text).join("");
}
const Lr = new RegExp(
  `[^${le}]*[${le}]+\\s*|[^${le}]+$`,
  "gu"
), To = /\S+\s*|\s+/g;
function an(t, e, n) {
  const r = [];
  for (const i of t.matchAll(n))
    i[0].length !== 0 && r.push({ text: i[0], offset: e + i.index, atomic: !1 });
  return r;
}
function on(t, e) {
  if (t.text.length <= e || t.atomic)
    return [t];
  const n = an(t.text, t.offset, To);
  if (n.length > 1)
    return n.flatMap((o) => on(o, e));
  const r = [];
  let i = t.offset, s = "";
  for (const o of t.text)
    s.length > 0 && s.length + o.length > e && (r.push({ text: s, offset: i, atomic: !1 }), i += s.length, s = ""), s += o;
  return s.length > 0 && r.push({ text: s, offset: i, atomic: !1 }), r;
}
function Oo(t, e) {
  if (t.length <= e)
    return [{ text: t, offset: 0 }];
  const r = an(t, 0, Lr).flatMap((i) => on(i, e));
  return Pr(r, e);
}
const Ro = /<([a-zA-Z][\w-]*)\b[^>]*>[\s\S]*?<\/\1>|<[a-zA-Z][\w-]*\b[^>]*\/>|[^<]+/g;
function Io(t, e) {
  if (t.length <= e)
    return [{ text: t, offset: 0 }];
  const n = [];
  for (const i of t.matchAll(Ro))
    i[0][0] === "<" ? n.push({ text: i[0], offset: i.index, atomic: !0 }) : n.push(...an(i[0], i.index, Lr));
  const r = n.flatMap((i) => on(i, e));
  return Pr(r, e);
}
const No = {
  wav: "audio/wav",
  mp3: "audio/mpeg",
  opus: "audio/ogg",
  ogg: "audio/ogg",
  aac: "audio/aac",
  flac: "audio/flac",
  webm: "audio/webm",
  m4a: "audio/mp4"
};
function Po(t) {
  return No[t] ?? `audio/${t}`;
}
const Lo = ["flac", "wav", "opus", "aac", "ogg", "webm", "mp3"], qo = ["opus", "aac", "webm", "ogg", "mp3", "wav", "flac"];
function _o(t, e, n) {
  const r = (a) => n(Po(a)) !== "", i = t.formats.filter(r);
  if (e.preferredFormat && i.includes(e.preferredFormat))
    return e.preferredFormat;
  const s = e.strategy === "bandwidth" ? qo : Lo, o = [...s, ...i.filter((a) => !s.includes(a))];
  for (const a of o)
    if (i.includes(a))
      return a;
  return t.default;
}
const Do = /* @__PURE__ */ new Set(["wav", "flac"]), $o = {
  mp3: 48e3,
  opus: 24e3,
  aac: 48e3,
  ogg: 48e3,
  webm: 32e3
};
function Uo(t, e, n) {
  return Do.has(t) || !e || !n ? void 0 : n.saveData === !0 || /2g/.test(n.effectiveType ?? "") ? $o[t] : void 0;
}
function qr(t, e) {
  return {
    source: "server",
    label: t.name,
    name: t.name,
    originalName: t.originalName,
    language: t.language,
    otherLanguages: t.otherLanguages,
    gender: t.gender ?? void 0,
    quality: t.quality,
    provider: t.provider,
    identifier: t.identifier,
    controls: e
  };
}
class Ne extends Error {
  status;
  type;
  title;
  instance;
  constructor(e, n) {
    super(e), this.name = "SpeechServerError", this.status = n.status, this.type = n.type, this.title = n.title, this.instance = n.instance;
  }
}
class _r extends Ne {
  constructor(e) {
    super(e, { status: 408, type: "https://readium.org/speech-server/error#stall", title: "Synthesis Stalled" }), this.name = "SpeechServerStallError";
  }
}
class Dr extends Error {
  constructor(e) {
    super(e), this.name = "SpeechServerAudioDecodeError";
  }
}
class $r extends Error {
  constructor(e) {
    super(e), this.name = "SpeechServerNetworkError";
  }
}
async function Oe(t) {
  if ((t.headers.get("content-type") ?? "").includes("application/problem+json"))
    try {
      const n = await t.json();
      return new Ne(n.detail || n.title || `Request failed with status ${t.status}`, {
        status: n.status ?? t.status,
        type: n.type,
        title: n.title,
        instance: n.instance
      });
    } catch {
    }
  return new Ne(`Request failed with status ${t.status}`, { status: t.status });
}
const Bo = 3, Vo = 400;
function zo(t) {
  const e = atob(t), n = new Uint8Array(e.length);
  for (let r = 0; r < e.length; r++)
    n[r] = e.charCodeAt(r);
  return n.buffer;
}
function jo(t) {
  return Math.max(0.25, Math.min(4, t));
}
function Be(t) {
  return t?.plain ?? t?.ssml ?? void 0;
}
function Fn(t) {
  return t instanceof _r ? { message: t.message, status: t.status, type: t.type, title: t.title, instance: t.instance, recoverable: !0 } : t instanceof Ne ? { message: t.message, status: t.status, type: t.type, title: t.title, instance: t.instance, recoverable: !1 } : t instanceof Dr ? { message: t.message, recoverable: !1 } : t instanceof $r ? { message: t.message, recoverable: !0 } : t instanceof Error ? { message: t.message, recoverable: !1 } : { message: String(t), recoverable: !1 };
}
class Mo {
  endpoints;
  fetchImpl;
  currentVoice = null;
  voices = [];
  serviceInfo = null;
  serviceInfoPromise = null;
  currentUtterances = [];
  currentUtteranceIndex = 0;
  playbackState = "idle";
  events = new ut();
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
  // Every AbortController for a chunk request still in flight, so clearPrefetchCache can abort
  // them immediately instead of waiting on their wrapping promises to settle first.
  activeControllers = /* @__PURE__ */ new Set();
  audioContext = null;
  masterGain = null;
  scheduledChunks = [];
  boundaryRafHandle = null;
  rate = 1;
  pitch = 1;
  volume = 1;
  constructor(e) {
    this.endpoints = e.endpoints, this.fetchImpl = e.fetch ?? fetch.bind(globalThis), this.prefetchWindow = e.prefetchWindow ?? Bo, this.readyBufferChars = e.readyBufferChars ?? Vo, this.overLengthText = e.overLengthText ?? "split", this.timeoutMs = e.timeoutMs, this.formatOptions = e.format ?? {}, this.canPlayType = typeof Audio < "u" ? (n) => new Audio().canPlayType(n) : () => "";
  }
  // Lets a provider that already fetched /voices seed this engine without a second request.
  setAvailableVoices(e) {
    this.voices = e;
  }
  // Tags a fetch() TypeError (request never reached the network) as SpeechServerNetworkError,
  // so it can't be confused with a TypeError thrown later while reading the response.
  async fetchNetwork(e, n) {
    try {
      return await this.fetchImpl(e, n);
    } catch (r) {
      throw r instanceof TypeError ? new $r(r.message) : r;
    }
  }
  loadUtterances(e, n) {
    this.clearPrefetchCache(), this.currentUtterances = e, this.currentUtteranceIndex = Ke(n ?? 0, e.length), this.setState("loading"), this.bufferUntilReady(++this.loadGeneration);
  }
  // Buffers enough utterances ahead of currentUtteranceIndex to cover readyBufferChars before
  // declaring "ready", so playback doesn't catch up to an empty prefetch cache right away —
  // starting from wherever playback will actually resume, not always utterance 0.
  async bufferUntilReady(e) {
    const n = Ke(this.currentUtteranceIndex, this.currentUtterances.length), r = Math.min(this.indexCoveringChars(this.readyBufferChars, n), n + this.prefetchWindow), i = [];
    for (let s = n; s <= r; s++) {
      this.queuePrefetch(s);
      const o = this.prefetchCache.get(s);
      o && i.push(o.then((a) => a[0].promise));
    }
    try {
      await Promise.all(i);
    } catch {
    }
    e !== this.loadGeneration || this.playbackState !== "loading" || this.setState("ready");
  }
  indexCoveringChars(e, n) {
    if (this.currentUtterances.length === 0)
      return -1;
    const r = Ke(n, this.currentUtterances.length);
    let i = 0;
    for (let s = r; s < this.currentUtterances.length; s++)
      if (i += (Be(this.currentUtterances[s]) ?? "").length, i >= e)
        return s;
    return this.currentUtterances.length - 1;
  }
  setVoice(e) {
    if (typeof e == "string") {
      const n = this.voices.find((r) => r.identifier === e || r.name === e);
      n ? this.currentVoice = n : (this.currentVoice = {
        source: "server",
        label: e,
        name: e,
        originalName: e,
        language: "",
        identifier: e
      }, this.getAvailableVoices().then((r) => {
        if (this.currentVoice?.identifier !== e)
          return;
        const i = r.find((s) => s.identifier === e || s.name === e);
        i && (this.currentVoice = i);
      }).catch(() => {
      }));
    } else
      this.currentVoice = e;
    this.clearPrefetchCache();
  }
  getCurrentVoice() {
    return this.currentVoice;
  }
  async getAvailableVoices() {
    if (this.voices.length > 0)
      return this.voices;
    const [e, n] = await Promise.all([this.fetchNetwork(this.endpoints.voices), this.getServiceInfo()]);
    if (!e.ok)
      throw await Oe(e);
    const r = await e.json(), i = new Map(n.providers.map((s) => [s.id, s.controls]));
    return this.voices = r.map((s) => qr(s, i.get(s.provider))), this.voices;
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
      throw await Oe(e);
    return e.json();
  }
  setSpeakInContentLanguage(e) {
    this.speakInContentLanguage = e, this.clearPrefetchCache();
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
    if (this.currentUtterances.length === 0) {
      console.warn("No utterances loaded");
      return;
    }
    this.stopAudio();
    const n = ++this.speakGeneration;
    this.setState("loading"), this.synthesizeAndPlay(n);
  }
  async synthesizeAndPlay(e) {
    const n = this.currentUtteranceIndex;
    try {
      const r = await this.resolveSynthesisStream(n);
      if (e !== this.speakGeneration)
        return;
      await this.scheduleChunksStreaming(r, e), this.fillPrefetchWindow(n);
    } catch (r) {
      if (e !== this.speakGeneration)
        return;
      this.setState("idle"), this.emitEvent({
        type: "error",
        detail: Fn(r)
      });
    }
  }
  // Reuses a cached prefetch if one exists; a fresh fetch bypasses the prefetch chain
  // (shouldn't wait behind buffered-ahead requests), and a failed prefetch retries fresh.
  async resolveSynthesisStream(e) {
    const n = this.prefetchCache.get(e);
    if (n) {
      this.prefetchCache.delete(e);
      try {
        return await n;
      } catch {
      }
    }
    return this.synthesizeStream(e);
  }
  // Chains up to `prefetchWindow` upcoming indices onto prefetchChainTail, one at a time.
  fillPrefetchWindow(e) {
    const n = Math.min(e + this.prefetchWindow, this.currentUtterances.length - 1);
    for (let r = e + 1; r <= n; r++)
      this.queuePrefetch(r);
  }
  queuePrefetch(e) {
    if (this.prefetchCache.has(e))
      return;
    const n = this.prefetchChainTail.then(() => this.synthesizeStream(e));
    this.prefetchCache.set(e, n), this.prefetchChainTail = n.then((r) => Promise.all(r.map((i) => i.promise))).then(
      () => {
      },
      () => {
      }
    ), n.catch(() => {
    }), n.then((r) => r.forEach((i) => i.promise.catch(() => {
    }))).catch(() => {
    });
  }
  clearPrefetchCache() {
    this.prefetchCache.clear(), this.activeControllers.forEach((e) => e.abort()), this.activeControllers.clear();
  }
  async synthesizeStream(e) {
    const n = this.currentUtterances[e], r = !n.plain && !!n.ssml, i = this.speakInContentLanguage ? n.language : void 0, s = Be(n) ?? "", o = Be(this.currentUtterances[e - 1]), a = Be(this.currentUtterances[e + 1]), c = await this.getServiceInfo(), l = _o(c.output, this.formatOptions, this.canPlayType), d = navigator.connection, u = Uo(l, this.formatOptions.adaptBitrateToNetwork ?? !1, d);
    if (s.length <= c.limits.maxTextLength) {
      const p = new AbortController();
      return this.activeControllers.add(p), [{ promise: this.synthesizeChunk(n, s, 0, r, i, o, a, l, u, p), controller: p }];
    }
    if (this.overLengthText === "error")
      throw new Ne(
        `Text exceeds this server's maximum length of ${c.limits.maxTextLength} characters`,
        {
          status: 413,
          type: "https://readium.org/speech-server/error#payload_too_large",
          title: "Payload Too Large"
        }
      );
    const g = Math.min(c.limits.maxTextLength, this.readyBufferChars), f = r ? Io(s, g) : Oo(s, g), y = [];
    let m = Promise.resolve();
    for (let p = 0; p < f.length; p++) {
      const w = p === 0 ? o : f[p - 1].text, E = p === f.length - 1 ? a : f[p + 1].text, x = f[p], R = new AbortController();
      this.activeControllers.add(R);
      const N = m.then(
        () => this.synthesizeChunk(n, x.text, x.offset, r, i, w, E, l, u, R)
      );
      y.push({ promise: N, controller: R }), m = N;
    }
    return y;
  }
  async synthesizeChunk(e, n, r, i, s, o, a, c, l, d) {
    try {
      const u = await this.fetchNetwork(this.endpoints.synthesize, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: e.id,
          text: n,
          ssml: i,
          language: s,
          voice: this.currentVoice?.identifier ?? this.currentVoice?.name,
          prev_utterance: o,
          next_utterance: a,
          boundary: !0,
          output: { format: c, bitrate: l, speed: this.rate, pitch: this.pitch }
        }),
        signal: d.signal
      });
      if (!u.ok)
        throw await Oe(u);
      const g = await u.json(), f = zo(g.audio);
      let y;
      try {
        y = await this.ensureAudioContext().decodeAudioData(f);
      } catch {
        throw new Dr("Audio playback failed");
      }
      return { audioBuffer: y, format: g.format, boundaries: g.boundaries, textOffset: r };
    } finally {
      this.activeControllers.delete(d);
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
  awaitWithStallDeadline(e, n, r) {
    if (this.timeoutMs === void 0)
      return e;
    const i = r + this.timeoutMs;
    return new Promise((s, o) => {
      const a = setTimeout(() => {
        n.abort(), o(new _r(`No audio chunk arrived within ${i.toFixed(0)}ms of the playback buffer running dry`));
      }, i);
      e.then(
        (c) => {
          clearTimeout(a), s(c);
        },
        (c) => {
          clearTimeout(a), o(c);
        }
      );
    });
  }
  // Schedules chunks onto one continuous AudioContext timeline as they resolve.
  async scheduleChunksStreaming(e, n) {
    const r = await this.awaitWithStallDeadline(e[0].promise, e[0].controller, 0);
    if (n !== this.speakGeneration)
      return;
    const i = this.ensureAudioContext(), s = this.masterGain, a = this.currentVoice?.controls?.speed === !0 ? 1 : jo(this.rate);
    this.scheduledChunks = [], this.setState("playing"), this.emitEvent({ type: "start" });
    let c = i.currentTime, l = null;
    const d = (u) => {
      const g = i.createBufferSource();
      g.buffer = u.audioBuffer, g.playbackRate.value = a, g.connect(s), g.start(c), l && (l.onended = null), g.onended = () => this.handleUtteranceEnded(n), l = g, this.scheduledChunks.push({ chunk: u, startTime: c, node: g, nextBoundaryIndex: 0, rate: a }), c += u.audioBuffer.duration / a;
    };
    d(r), this.startBoundaryPolling(n);
    for (let u = 1; u < e.length; u++) {
      let g;
      try {
        const f = Math.max(0, (c - i.currentTime) * 1e3);
        g = await this.awaitWithStallDeadline(e[u].promise, e[u].controller, f);
      } catch (f) {
        n === this.speakGeneration && this.emitEvent({ type: "error", detail: Fn(f) });
        return;
      }
      if (n !== this.speakGeneration)
        return;
      d(g);
    }
  }
  handleUtteranceEnded(e) {
    e === this.speakGeneration && (this.checkBoundaries(), this.stopBoundaryPolling(), this.currentUtteranceIndex >= this.currentUtterances.length - 1 && this.setState("idle"), this.emitEvent({ type: "end" }));
  }
  startBoundaryPolling(e) {
    const n = () => {
      e === this.speakGeneration && (this.checkBoundaries(), this.boundaryRafHandle = requestAnimationFrame(n));
    };
    this.boundaryRafHandle = requestAnimationFrame(n);
  }
  stopBoundaryPolling() {
    this.boundaryRafHandle !== null && (cancelAnimationFrame(this.boundaryRafHandle), this.boundaryRafHandle = null);
  }
  checkBoundaries() {
    if (!this.audioContext)
      return;
    const e = this.audioContext.currentTime;
    for (const n of this.scheduledChunks) {
      const r = n.chunk.boundaries ?? [];
      for (; n.nextBoundaryIndex < r.length && e >= n.startTime + r[n.nextBoundaryIndex].elapsedTime / n.rate; ) {
        const i = r[n.nextBoundaryIndex];
        this.emitEvent({
          type: "boundary",
          detail: {
            name: i.name,
            charIndex: i.charIndex + n.chunk.textOffset,
            charLength: i.charLength,
            elapsedTime: i.elapsedTime
          }
        }), n.nextBoundaryIndex++;
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
    }), this.stopBoundaryPolling(), this.setState("paused"), this.emitEvent({ type: "pause" }));
  }
  resume() {
    this.playbackState === "paused" && this.audioContext && (this.audioContext.resume().catch(() => {
    }), this.startBoundaryPolling(this.speakGeneration), this.setState("playing"), this.emitEvent({ type: "resume" }));
  }
  stop() {
    this.speakGeneration++, this.loadGeneration++, this.stopAudio(), this.clearPrefetchCache(), this.currentUtteranceIndex = 0, this.setState("idle"), this.emitEvent({ type: "stop" });
  }
  setRate(e) {
    this.rate = Math.max(0.1, Math.min(10, e)), this.clearPrefetchCache();
  }
  getRate() {
    return this.rate;
  }
  setPitch(e) {
    this.pitch = Math.max(0, Math.min(2, e)), this.clearPrefetchCache();
  }
  getPitch() {
    return this.pitch;
  }
  setVolume(e) {
    this.volume = Math.max(0, Math.min(1, e)), this.masterGain && (this.masterGain.gain.value = this.volume);
  }
  getVolume() {
    return this.volume;
  }
  getState() {
    return this.playbackState;
  }
  getCurrentUtteranceIndex() {
    return this.currentUtteranceIndex;
  }
  setCurrentUtteranceIndex(e, n) {
    if (e < 0 || e >= this.currentUtterances.length) {
      n?.(!1);
      return;
    }
    if (e === this.currentUtteranceIndex) {
      n?.(!0);
      return;
    }
    this.stopAudio(), this.currentUtteranceIndex = e, n?.(!0);
  }
  getUtteranceCount() {
    return this.currentUtterances.length;
  }
  on(e, n) {
    return this.events.on(e, n);
  }
  emitEvent(e) {
    this.events.emit(e.type, e);
  }
  setState(e) {
    const n = this.playbackState;
    if (this.playbackState = e, n !== e)
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
class qc {
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
    const [n, r] = await Promise.all([
      this.fetchImpl(this.options.endpoints.voices),
      this.fetchImpl(this.options.endpoints.service)
    ]);
    if (!n.ok)
      throw await Oe(n);
    if (!r.ok)
      throw await Oe(r);
    const i = await n.json(), s = await r.json(), o = new Map(s.providers.map((a) => [a.id, a.controls]));
    return this.voices = i.map((a) => qr(a, o.get(a.provider))), this.voices;
  }
  async createEngine(e) {
    const n = new Mo(this.options);
    return this.voices.length > 0 && n.setAvailableVoices(this.voices), e && n.setVoice(e), n;
  }
  async destroy() {
    this.voices = [];
  }
}
function Fo(t) {
  return t.detail?.recoverable === !0;
}
const Ho = 3e4, Wo = [
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
class Go {
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
  events = new ut();
  unbindActiveEngine = null;
  constructor(e) {
    this.activeEngine = e.primaryEngine, this.primaryProvider = e.primaryProvider, this.fallbackProvider = e.fallbackProvider, this.onFailure = e.onFailure ?? "fallback", this.healthCheckIntervalMs = e.healthCheckIntervalMs ?? Ho, this.lastVoiceRequest = e.primaryEngine.getCurrentVoice() ?? void 0, this.bindActiveEngine();
  }
  async initialize() {
    return this.activeEngine.initialize?.();
  }
  // Mid-swap, only records the new queue live — activeEngine is dying/about to be replaced.
  loadUtterances(e, n) {
    this.loadToken++, this.currentUtterances = e, this.desiredIndex = n ?? 0, this.desiredPlaying = !1, !this.swapInFlight && (this.engineStarted = !0, this.activeEngine.loadUtterances(e, n));
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
  setCurrentUtteranceIndex(e, n) {
    if (this.desiredIndex = e, !this.isEngineTrusted()) {
      n?.(!0);
      return;
    }
    this.activeEngine.setCurrentUtteranceIndex(e, n);
  }
  getUtteranceCount() {
    return this.activeEngine.getUtteranceCount();
  }
  on(e, n) {
    return this.events.on(e, n);
  }
  emitEvent(e) {
    this.events.emit(e.type, e);
  }
  bindActiveEngine() {
    const e = this.activeEngine, n = Wo.map((r) => e.on(r, (i) => {
      this.emitEvent(i), this.maybeRecoverNow();
    }));
    n.push(e.on("error", (r) => this.handleError(r))), this.unbindActiveEngine = () => n.forEach((r) => r());
  }
  handleError(e) {
    if (this.hasFallenBack || this.swapInFlight || this.onFailure === "error" || !Fo(e)) {
      this.emitEvent(e);
      return;
    }
    this.swapToFallback(e);
  }
  // Copies playback parameters onto a freshly created engine — shared by both swap directions so
  // this can't drift between them the way two separately maintained copies did.
  copyPlaybackParameters(e, n) {
    n.setRate(e.getRate()), n.setPitch(e.getPitch()), n.setVolume(e.getVolume()), n.setSpeakInContentLanguage(e.getSpeakInContentLanguage());
  }
  // Starts or defers a freshly loaded engine based on live intent, not a snapshot from before the
  // swap — shared by both swap directions so a racing pause()/speak() is respected either way.
  startEngineWhenReady(e) {
    const n = this.loadToken, r = e.on("ready", () => {
      r(), n === this.loadToken && (this.desiredPlaying ? (this.engineStarted = !0, e.speak(this.desiredIndex)) : this.engineStarted = !1);
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
    let n = null;
    await this.performSwap(
      async () => {
        const i = this.activeEngine.getCurrentVoice() ?? (typeof this.lastVoiceRequest == "object" ? this.lastVoiceRequest : null), s = i?.language || this.currentUtterances[this.desiredIndex]?.language || (typeof navigator < "u" ? navigator.language : "en");
        if (n = await this.pickBestFallbackVoice(s, i?.gender), !n) throw new Error("no offline-available fallback voice found");
        return this.fallbackProvider.createEngine(n);
      },
      () => (this.hasFallenBack = !0, this.onFailure === "fallbackAndRecover" && this.startHealthCheck(), { type: "enginefallback", detail: { reason: e.detail, voice: n } }),
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
  async performSwap(e, n, r) {
    this.swapInFlight = !0;
    const i = this.teardownEpoch, s = this.activeEngine;
    let o;
    try {
      o = await e();
    } catch {
      this.swapInFlight = !1, r();
      return;
    }
    if (i !== this.teardownEpoch) {
      this.swapInFlight = !1, await o.destroy();
      return;
    }
    this.copyPlaybackParameters(s, o), this.unbindActiveEngine?.(), this.activeEngine = o, this.engineStarted = !1, this.swapInFlight = !1, this.bindActiveEngine(), this.emitEvent(n(o)), this.startEngineWhenReady(o), o.loadUtterances(this.currentUtterances, this.desiredIndex), await s.destroy();
  }
  // Only skip the offlineAvailability filter when navigator.onLine is confirmed true — unknown
  // (unimplemented navigator.onLine) defaults to restricting, not to allowing online voices.
  //
  // Language narrows first, gender second: a same-language wrong-gender voice beats a
  // different-language right-gender one. Falls back to any language if none matches, then to
  // any gender within that if none matches. Region/quality ranking within the final candidate
  // set is delegated to pickBestVoiceByRegion, the same ranking logic sortVoicesByRegions uses.
  async pickBestFallbackVoice(e, n) {
    const r = await this.fallbackProvider.getVoices(), s = typeof navigator < "u" && navigator.onLine === !0 ? r : r.filter((g) => g.offlineAvailability === !0);
    if (s.length === 0) return null;
    const [o] = lt([e]), { voicesByLang: a } = ct(s, [o]), c = a.get(o.baseLang) ?? [], l = c.length > 0 ? c : s, d = n ? l.filter((g) => g.gender === n) : [], u = d.length > 0 ? d : l;
    return ki(e, u);
  }
  async destroy() {
    this.teardownEpoch++, this.healthCheckTimer !== null && (clearTimeout(this.healthCheckTimer), this.healthCheckTimer = null), this.unbindActiveEngine?.(), this.events.clear(), await this.activeEngine.destroy();
  }
}
class _c {
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
    } catch (n) {
      if (this.onFailure === "error")
        throw n;
      return this.fallback.getVoices(e);
    }
  }
  async createEngine(e) {
    let n;
    try {
      n = await this.primary.createEngine(e);
    } catch (r) {
      if (this.onFailure === "error")
        throw r;
      return this.fallback.createEngine(e);
    }
    return new Go({
      primaryEngine: n,
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
let Ko = class {
};
function Jo(t) {
  return (t.getComputedStyle(t.document.documentElement).writingMode || t.getComputedStyle(t.document.body).writingMode) === "vertical-lr";
}
function Qo(t) {
  const e = t.getComputedStyle(t.document.documentElement).writingMode || t.getComputedStyle(t.document.body).writingMode;
  return e === "vertical-rl" || e === "vertical-lr";
}
function xe(t) {
  const e = Qo(t), n = e && Jo(t), r = t.innerWidth, i = t.innerHeight, s = t.document.scrollingElement, o = s.scrollLeft, a = s.scrollTop, c = parseInt(t.getComputedStyle(t.document.documentElement).getPropertyValue("column-count")), l = e && !n ? s.scrollWidth - r + o : o, d = a;
  return { isVertical: e, isVertLR: n, viewportInlineSize: e ? i : r, viewportBlockSize: e ? r : i, pageInlineSize: e ? i : r / (c || 1), xDocOffset: l, yDocOffset: d, inlineScrollOffset: e ? d : l, blockScrollOffset: e ? l : d, inlineStart: (u) => e ? u.top : u.left, blockStart: (u) => e ? u.left : u.top, inlineSize: (u) => e ? u.height : u.width, blockSize: (u) => e ? u.width : u.height, applyPosition(u, g, f, y, m, p) {
    u.style.position = "absolute", e ? (u.style.top = `${g * p}px`, u.style.left = `${f * p}px`, u.style.height = `${y * p}px`, u.style.width = `${m * p}px`) : (u.style.left = `${g * p}px`, u.style.top = `${f * p}px`, u.style.width = `${y * p}px`, u.style.height = `${m * p}px`);
  }, toRect(u, g, f, y) {
    return e ? new DOMRect(g, u, y, f) : new DOMRect(u, g, f, y);
  } };
}
function Hn(t, e) {
  return t.document.documentElement.style.getPropertyValue(e);
}
function Xo(t) {
  return t && Array.isArray(t) ? t : void 0;
}
function Zo(t) {
  return t && typeof t == "string" ? [t] : Xo(t);
}
function At(t) {
  return isNaN(t) ? void 0 : t;
}
function Ve(t) {
  return t.otherLocations?.get("cssSelector");
}
let Ee = class Ur {
  constructor(e) {
    this.fragments = e.fragments ? e.fragments : new Array(), this.progression = e.progression, this.totalProgression = e.totalProgression, this.position = e.position, this.otherLocations = e.otherLocations;
  }
  static deserialize(e) {
    if (!e) return;
    const n = At(e.progression), r = At(e.totalProgression), i = At(e.position), s = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Set(["fragment", "fragments", "progression", "totalProgression", "position", "otherLocations"]);
    return Object.entries(e).forEach(([a, c]) => {
      o.has(a) || s.set(a, c);
    }), e.otherLocations instanceof Map && e.otherLocations.forEach((a, c) => s.set(c, a)), new Ur({ fragments: Zo(e.fragments || e.fragment), progression: n !== void 0 && n >= 0 && n <= 1 ? n : void 0, totalProgression: r !== void 0 && r >= 0 && r <= 1 ? r : void 0, position: i !== void 0 && i > 0 ? i : void 0, otherLocations: s.size === 0 ? void 0 : s });
  }
  serialize() {
    const e = {};
    return this.fragments && (e.fragments = this.fragments), this.progression !== void 0 && (e.progression = this.progression), this.totalProgression !== void 0 && (e.totalProgression = this.totalProgression), this.position !== void 0 && (e.position = this.position), this.otherLocations && this.otherLocations.forEach((n, r) => e[r] = n), e;
  }
}, Yo = class Br {
  constructor(e) {
    this.after = e.after, this.before = e.before, this.highlight = e.highlight;
  }
  static deserialize(e) {
    if (e) return new Br({ after: e.after, before: e.before, highlight: e.highlight });
  }
  serialize() {
    const e = {};
    return this.after !== void 0 && (e.after = this.after), this.before !== void 0 && (e.before = this.before), this.highlight !== void 0 && (e.highlight = this.highlight), e;
  }
}, el = class Ht {
  constructor(e) {
    const n = e.href.indexOf("#"), r = n >= 0 ? e.href.slice(n + 1) : void 0;
    this.href = n >= 0 ? e.href.slice(0, n) : e.href, this.type = e.type, this.title = e.title;
    const i = e.locations?.fragments, s = r && (!i || i.length === 0);
    this.locations = e.locations ? s ? new Ee({ ...e.locations, fragments: [r] }) : e.locations : r ? new Ee({ fragments: [r] }) : new Ee({}), this.text = e.text;
  }
  static deserialize(e) {
    if (e && e.href && e.type) return new Ht({ href: e.href, type: e.type, title: e.title, locations: Ee.deserialize(e.locations), text: Yo.deserialize(e.text) });
  }
  serialize() {
    const e = { href: this.href, type: this.type };
    return this.title !== void 0 && (e.title = this.title), this.locations && (e.locations = this.locations.serialize()), this.text && (e.text = this.text.serialize()), e;
  }
  copyWithLocations(e) {
    return new Ht({ href: this.href, type: this.type, title: this.title, text: this.text, locations: new Ee({ ...this.locations, ...e }) });
  }
};
function Wn(t) {
  return t.split("").reverse().join("");
}
function tl(t, e, n) {
  const r = Wn(e);
  return n.map((i) => {
    const s = Math.max(0, i.end - e.length - i.errors), o = Wn(t.slice(s, i.end));
    return { start: Vr(o, r, i.errors).reduce((a, c) => i.end - c.end < a ? i.end - c.end : a, i.end), end: i.end, errors: i.errors };
  });
}
function Tt(t) {
  return (t | -t) >> 31 & 1;
}
function Gn(t, e, n, r) {
  let i = t.P[n], s = t.M[n];
  const o = r >>> 31, a = e[n] | o, c = a | s, l = (a & i) + i ^ i | a;
  let d = s | ~(l | i), u = i & l;
  const g = Tt(d & t.lastRowMask[n]) - Tt(u & t.lastRowMask[n]);
  return d <<= 1, u <<= 1, u |= o, d |= Tt(r) - o, i = u | ~(c | d), s = d & c, t.P[n] = i, t.M[n] = s, g;
}
function Vr(t, e, n) {
  if (e.length === 0) return [];
  n = Math.min(n, e.length);
  const r = [], i = 32, s = Math.ceil(e.length / i) - 1, o = { P: new Uint32Array(s + 1), M: new Uint32Array(s + 1), lastRowMask: new Uint32Array(s + 1) };
  o.lastRowMask.fill(1 << 31), o.lastRowMask[s] = 1 << (e.length - 1) % i;
  const a = new Uint32Array(s + 1), c = /* @__PURE__ */ new Map(), l = [];
  for (let g = 0; g < 256; g++) l.push(a);
  for (let g = 0; g < e.length; g += 1) {
    const f = e.charCodeAt(g);
    if (c.has(f)) continue;
    const y = new Uint32Array(s + 1);
    c.set(f, y), f < l.length && (l[f] = y);
    for (let m = 0; m <= s; m += 1) {
      y[m] = 0;
      for (let p = 0; p < i; p += 1) {
        const w = m * i + p;
        w >= e.length || e.charCodeAt(w) === f && (y[m] |= 1 << p);
      }
    }
  }
  let d = Math.max(0, Math.ceil(n / i) - 1);
  const u = new Uint32Array(s + 1);
  for (let g = 0; g <= d; g += 1) u[g] = (g + 1) * i;
  u[s] = e.length;
  for (let g = 0; g <= d; g += 1) o.P[g] = -1, o.M[g] = 0;
  for (let g = 0; g < t.length; g += 1) {
    const f = t.charCodeAt(g);
    let y;
    f < l.length ? y = l[f] : (y = c.get(f), typeof y > "u" && (y = a));
    let m = 0;
    for (let p = 0; p <= d; p += 1) m = Gn(o, y, p, m), u[p] += m;
    if (u[d] - m <= n && d < s && (y[d + 1] & 1 || m < 0)) {
      d += 1, o.P[d] = -1, o.M[d] = 0;
      let p;
      if (d === s) {
        const w = e.length % i;
        p = w === 0 ? i : w;
      } else p = i;
      u[d] = u[d - 1] + p - m + Gn(o, y, d, m);
    } else for (; d > 0 && u[d] >= n + i; ) d -= 1;
    d === s && u[d] <= n && (u[d] < n && r.splice(0, r.length), r.push({ start: -1, end: g + 1, errors: u[d] }), n = u[d]);
  }
  return r;
}
function nl(t, e, n) {
  const r = Vr(t, e, n);
  return tl(t, e, r);
}
function zr(t, e, n) {
  let r = 0;
  const i = [];
  for (; r !== -1; ) r = t.indexOf(e, r), r !== -1 && (i.push({ start: r, end: r + e.length, errors: 0 }), r += 1);
  return i.length > 0 ? i : nl(t, e, n);
}
function Kn(t, e) {
  return e.length === 0 || t.length === 0 ? 0 : 1 - zr(t, e, e.length)[0].errors / e.length;
}
function rl(t, e, n = {}) {
  if (e.length === 0) return null;
  const r = Math.min(256, e.length / 2), i = zr(t, e, r);
  if (i.length === 0) return null;
  const s = (a) => {
    const c = 1 - a.errors / e.length, l = n.prefix ? Kn(t.slice(Math.max(0, a.start - n.prefix.length), a.start), n.prefix) : 1, d = n.suffix ? Kn(t.slice(a.end, a.end + n.suffix.length), n.suffix) : 1;
    let u = 1;
    return typeof n.hint == "number" && (u = 1 - Math.abs(a.start - n.hint) / t.length), (50 * c + 20 * l + 20 * d + 2 * u) / 92;
  }, o = i.map((a) => ({ start: a.start, end: a.end, score: s(a) }));
  return o.sort((a, c) => c.score - a.score), o[0];
}
function Wt(t, e, n) {
  const r = n === 1 ? e : e - 1;
  if (t.charAt(r).trim() !== "") return e;
  let i, s;
  if (n === 2 ? (i = t.substring(0, e), s = i.trimEnd()) : (i = t.substring(e), s = i.trimStart()), !s.length) return -1;
  const o = i.length - s.length;
  return n === 2 ? e - o : e + o;
}
function Jn(t, e) {
  const n = t.commonAncestorContainer.ownerDocument.createNodeIterator(t.commonAncestorContainer, NodeFilter.SHOW_TEXT), r = e === 1 ? t.startContainer : t.endContainer, i = e === 1 ? t.endContainer : t.startContainer;
  let s = n.nextNode();
  for (; s && s !== r; ) s = n.nextNode();
  e === 2 && (s = n.previousNode());
  let o = -1;
  const a = () => {
    if (s = e === 1 ? n.nextNode() : n.previousNode(), s) {
      const c = s.textContent, l = e === 1 ? 0 : c.length;
      o = Wt(c, l, e);
    }
  };
  for (; s && o === -1 && s !== i; ) a();
  if (s && o >= 0) return { node: s, offset: o };
  throw new RangeError("No text nodes with non-whitespace text found in range");
}
function il(t) {
  if (!t.toString().trim().length) throw new RangeError("Range contains no non-whitespace text");
  if (t.startContainer.nodeType !== Node.TEXT_NODE) throw new RangeError("Range startContainer is not a text node");
  if (t.endContainer.nodeType !== Node.TEXT_NODE) throw new RangeError("Range endContainer is not a text node");
  const e = t.cloneRange();
  let n = !1, r = !1;
  const i = { start: Wt(t.startContainer.textContent, t.startOffset, 1), end: Wt(t.endContainer.textContent, t.endOffset, 2) };
  if (i.start >= 0 && (e.setStart(t.startContainer, i.start), n = !0), i.end > 0 && (e.setEnd(t.endContainer, i.end), r = !0), n && r) return e;
  if (!n) {
    const { node: s, offset: o } = Jn(e, 1);
    s && o >= 0 && e.setStart(s, o);
  }
  if (!r) {
    const { node: s, offset: o } = Jn(e, 2);
    s && o > 0 && e.setEnd(s, o);
  }
  return e;
}
function jr(t) {
  switch (t.nodeType) {
    case Node.ELEMENT_NODE:
    case Node.TEXT_NODE:
      return t.textContent?.length ?? 0;
    default:
      return 0;
  }
}
function Qn(t) {
  let e = t.previousSibling, n = 0;
  for (; e; ) n += jr(e), e = e.previousSibling;
  return n;
}
function Mr(t, ...e) {
  let n = e.shift();
  const r = t.ownerDocument.createNodeIterator(t, NodeFilter.SHOW_TEXT), i = [];
  let s = r.nextNode(), o, a = 0;
  for (; n !== void 0 && s; ) o = s, a + o.data.length > n ? (i.push({ node: o, offset: n - a }), n = e.shift()) : (s = r.nextNode(), a += o.data.length);
  for (; n !== void 0 && o && a === n; ) i.push({ node: o, offset: o.data.length }), n = e.shift();
  if (n !== void 0) throw new RangeError("Offset exceeds text length");
  return i;
}
let ze = class ie {
  constructor(e, n) {
    if (n < 0) throw new Error("Offset is invalid");
    this.element = e, this.offset = n;
  }
  relativeTo(e) {
    if (!e.contains(this.element)) throw new Error("Parent is not an ancestor of current element");
    let n = this.element, r = this.offset;
    for (; n !== e; ) r += Qn(n), n = n.parentElement;
    return new ie(n, r);
  }
  resolve(e = {}) {
    try {
      return Mr(this.element, this.offset)[0];
    } catch (n) {
      if (this.offset === 0 && e.direction !== void 0) {
        const r = document.createTreeWalker(this.element.getRootNode(), NodeFilter.SHOW_TEXT);
        r.currentNode = this.element;
        const i = e.direction === 1, s = i ? r.nextNode() : r.previousNode();
        if (!s) throw n;
        return { node: s, offset: i ? 0 : s.data.length };
      } else throw n;
    }
  }
  static fromCharOffset(e, n) {
    switch (e.nodeType) {
      case Node.TEXT_NODE:
        return ie.fromPoint(e, n);
      case Node.ELEMENT_NODE:
        return new ie(e, n);
      default:
        throw new Error("Node is not an element or text node");
    }
  }
  static fromPoint(e, n) {
    switch (e.nodeType) {
      case Node.TEXT_NODE: {
        if (n < 0 || n > e.data.length) throw new Error("Text node offset is out of range");
        if (!e.parentElement) throw new Error("Text node has no parent");
        const r = Qn(e) + n;
        return new ie(e.parentElement, r);
      }
      case Node.ELEMENT_NODE: {
        if (n < 0 || n > e.childNodes.length) throw new Error("Child node offset is out of range");
        let r = 0;
        for (let i = 0; i < n; i++) r += jr(e.childNodes[i]);
        return new ie(e, r);
      }
      default:
        throw new Error("Point is not in an element or text node");
    }
  }
}, Gt = class Ae {
  constructor(e, n) {
    this.start = e, this.end = n;
  }
  relativeTo(e) {
    return new Ae(this.start.relativeTo(e), this.end.relativeTo(e));
  }
  toRange() {
    let e, n;
    this.start.element === this.end.element && this.start.offset <= this.end.offset ? [e, n] = Mr(this.start.element, this.start.offset, this.end.offset) : (e = this.start.resolve({ direction: 1 }), n = this.end.resolve({ direction: 2 }));
    const r = new Range();
    return r.setStart(e.node, e.offset), r.setEnd(n.node, n.offset), r;
  }
  static fromRange(e) {
    const n = ze.fromPoint(e.startContainer, e.startOffset), r = ze.fromPoint(e.endContainer, e.endOffset);
    return new Ae(n, r);
  }
  static fromOffsets(e, n, r) {
    return new Ae(new ze(e, n), new ze(e, r));
  }
  static trimmedRange(e) {
    return il(Ae.fromRange(e).toRange());
  }
}, sl = class Kt {
  constructor(e, n, r) {
    this.root = e, this.start = n, this.end = r;
  }
  static fromRange(e, n) {
    const r = Gt.fromRange(n).relativeTo(e);
    return new Kt(e, r.start.offset, r.end.offset);
  }
  static fromSelector(e, n) {
    return new Kt(e, n.start, n.end);
  }
  toSelector() {
    return { type: "TextPositionSelector", start: this.start, end: this.end };
  }
  toRange() {
    return Gt.fromOffsets(this.root, this.start, this.end).toRange();
  }
}, al = class Jt {
  constructor(e, n, r = {}) {
    this.root = e, this.exact = n, this.context = r;
  }
  static fromRange(e, n) {
    const r = e.textContent, i = Gt.fromRange(n).relativeTo(e), s = i.start.offset, o = i.end.offset, a = 32;
    return new Jt(e, r.slice(s, o), { prefix: r.slice(Math.max(0, s - a), s), suffix: r.slice(o, Math.min(r.length, o + a)) });
  }
  static fromSelector(e, n) {
    const { prefix: r, suffix: i } = n;
    return new Jt(e, n.exact, { prefix: r, suffix: i });
  }
  toSelector() {
    return { type: "TextQuoteSelector", exact: this.exact, prefix: this.context.prefix, suffix: this.context.suffix };
  }
  toRange(e = {}) {
    return this.toPositionAnchor(e).toRange();
  }
  toPositionAnchor(e = {}) {
    const n = this.root.textContent, r = rl(n, this.exact, { ...this.context, hint: e.hint });
    if (!r) throw new Error("Quote not found");
    return new sl(this.root, r.start, r.end);
  }
};
function ol(t) {
  const e = t.tagName.toUpperCase();
  return e === "IMG" || e === "VIDEO" || e === "AUDIO" || e === "IFRAME" || e === "OBJECT" || e === "EMBED" || e === "CANVAS";
}
function ll(t, e) {
  try {
    const n = e.locations, r = e.text;
    if (r && r.highlight) {
      let i;
      n && Ve(n) && (i = t.querySelector(Ve(n))), i || (i = t.body);
      const s = new al(i, r.highlight, { prefix: r.before, suffix: r.after });
      try {
        return s.toRange();
      } catch {
        return console.warn("Quote not found:", s), null;
      }
    }
    if (n) {
      let i = null;
      if (!i && Ve(n) && (i = t.querySelector(Ve(n))), !i && n.fragments) {
        for (const s of n.fragments) if (i = t.getElementById(s), i) break;
      }
      if (i) {
        const s = t.createRange();
        return i.childNodes.length === 0 || ol(i) ? (s.selectNode(i), s) : (s.setStartBefore(i), s.setEndAfter(i), s);
      }
    }
  } catch (n) {
    console.error(n);
  }
  return null;
}
function cl(t, e) {
  const n = e.map((c) => c.toUpperCase()), r = [], i = t.commonAncestorContainer, s = i.nodeType === Node.TEXT_NODE ? i.parentNode : i, o = t.startContainer.ownerDocument.createTreeWalker(s, NodeFilter.SHOW_TEXT);
  let a = o.nextNode();
  for (; a; ) {
    if (t.intersectsNode(a)) {
      let c = a.parentNode, l = !1;
      for (; c; ) {
        if (c.nodeType === Node.ELEMENT_NODE && n.includes(c.tagName.toUpperCase())) {
          l = !0;
          break;
        }
        c = c.parentNode;
      }
      if (!l) {
        const d = t.cloneRange();
        d.selectNode(a), d.compareBoundaryPoints(Range.START_TO_START, t) < 0 && d.setStart(t.startContainer, t.startOffset), d.compareBoundaryPoints(Range.END_TO_END, t) > 0 && d.setEnd(t.endContainer, t.endOffset);
        for (const u of d.getClientRects()) r.push({ left: u.left, right: u.right, top: u.top, bottom: u.bottom, width: u.width, height: u.height });
      }
    }
    a = o.nextNode();
  }
  return r;
}
function je(t, e, n = !1, r = 0) {
  let i;
  if (Array.isArray(t)) i = t;
  else {
    let l = t.getClientRects();
    l.length || t.commonAncestorContainer.nodeType === Node.ELEMENT_NODE && (l = t.commonAncestorContainer.getClientRects()), i = [];
    for (const d of l) i.push({ bottom: d.bottom, height: d.height, left: d.left, right: d.right, top: d.top, width: d.width });
  }
  if (r) for (const l of i) l.left -= r, l.top -= r, l.right += r, l.bottom += r, l.width += r * 2, l.height += r * 2;
  const s = Fr(i, 1, e, n), o = hl(s, 1), a = Hr(o), c = 4;
  for (let l = a.length - 1; l >= 0; l--) {
    const d = a[l];
    if (!(d.width * d.height > c)) if (a.length > 1) a.splice(l, 1);
    else break;
  }
  return a;
}
function Fr(t, e, n, r = !1) {
  for (let i = 0; i < t.length; i++) for (let s = i + 1; s < t.length; s++) {
    const o = t[i], a = t[s];
    if (o === a) continue;
    const c = _(o.top, a.top, e) && _(o.bottom, a.bottom, e), l = _(o.left, a.left, e) && _(o.right, a.right, e);
    if ((l && !n && !r || c && !l) && Wr(o, a, e)) {
      const d = t.filter((g) => g !== o && g !== a), u = ul(o, a);
      return d.push(u), Fr(d, e, n, r);
    }
  }
  return t;
}
function ul(t, e) {
  const n = Math.min(t.left, e.left), r = Math.max(t.right, e.right), i = Math.min(t.top, e.top), s = Math.max(t.bottom, e.bottom);
  return { bottom: s, height: s - i, left: n, right: r, top: i, width: r - n };
}
function hl(t, e) {
  const n = new Set(t);
  for (const r of t) {
    if (!(r.width > 1 && r.height > 1)) {
      n.delete(r);
      continue;
    }
    for (const i of t) if (r !== i && n.has(i) && dl(i, r, e)) {
      n.delete(r);
      break;
    }
  }
  return Array.from(n);
}
function dl(t, e, n) {
  return K(t, e.left, e.top, n) && K(t, e.right, e.top, n) && K(t, e.left, e.bottom, n) && K(t, e.right, e.bottom, n);
}
function K(t, e, n, r) {
  return (t.left < e || _(t.left, e, r)) && (t.right > e || _(t.right, e, r)) && (t.top < n || _(t.top, n, r)) && (t.bottom > n || _(t.bottom, n, r));
}
function Hr(t) {
  for (let e = 0; e < t.length; e++) for (let n = e + 1; n < t.length; n++) {
    const r = t[e], i = t[n];
    if (r !== i && Wr(r, i, -1)) {
      let s = [], o;
      const a = Xn(r, i);
      if (a.length === 1) s = a, o = r;
      else {
        const l = Xn(i, r);
        a.length < l.length ? (s = a, o = r) : (s = l, o = i);
      }
      const c = t.filter((l) => l !== o);
      return Array.prototype.push.apply(c, s), Hr(c);
    }
  }
  return t;
}
function Xn(t, e) {
  const n = gl(e, t);
  if (n.height === 0 || n.width === 0) return [t];
  const r = [];
  {
    const i = { bottom: t.bottom, height: 0, left: t.left, right: n.left, top: t.top, width: 0 };
    i.width = i.right - i.left, i.height = i.bottom - i.top, i.height !== 0 && i.width !== 0 && r.push(i);
  }
  {
    const i = { bottom: n.top, height: 0, left: n.left, right: n.right, top: t.top, width: 0 };
    i.width = i.right - i.left, i.height = i.bottom - i.top, i.height !== 0 && i.width !== 0 && r.push(i);
  }
  {
    const i = { bottom: t.bottom, height: 0, left: n.left, right: n.right, top: n.bottom, width: 0 };
    i.width = i.right - i.left, i.height = i.bottom - i.top, i.height !== 0 && i.width !== 0 && r.push(i);
  }
  {
    const i = { bottom: t.bottom, height: 0, left: n.right, right: t.right, top: t.top, width: 0 };
    i.width = i.right - i.left, i.height = i.bottom - i.top, i.height !== 0 && i.width !== 0 && r.push(i);
  }
  return r;
}
function gl(t, e) {
  const n = Math.max(t.left, e.left), r = Math.min(t.right, e.right), i = Math.max(t.top, e.top), s = Math.min(t.bottom, e.bottom);
  return { bottom: s, height: Math.max(0, s - i), left: n, right: r, top: i, width: Math.max(0, r - n) };
}
function Wr(t, e, n) {
  return (t.left < e.right || n >= 0 && _(t.left, e.right, n)) && (e.left < t.right || n >= 0 && _(e.left, t.right, n)) && (t.top < e.bottom || n >= 0 && _(t.top, e.bottom, n)) && (e.top < t.bottom || n >= 0 && _(e.top, t.bottom, n));
}
function _(t, e, n) {
  return Math.abs(t - e) <= n;
}
let Me = null, Ot = null, Ce = 0;
const se = { r: 255, g: 255, b: 255, a: 1 }, te = /* @__PURE__ */ new Map(), fl = () => {
  if (!Me) if (typeof OffscreenCanvas < "u") Me = new OffscreenCanvas(5, 5), Ot = Me.getContext("2d", { willReadFrequently: !0, desynchronized: !0 });
  else {
    const t = document.createElement("canvas");
    t.width = 5, t.height = 5, Me = t, Ot = t.getContext("2d", { willReadFrequently: !0, desynchronized: !0 });
  }
  return Ot;
}, pl = (t) => {
  if (!t) return !0;
  const e = t.trim().toLowerCase();
  return e.startsWith("var(") || ["transparent", "currentcolor", "inherit", "initial", "revert", "unset", "revert-layer"].includes(e) ? !0 : ["linear-gradient", "radial-gradient", "conic-gradient", "repeating-linear-gradient", "repeating-radial-gradient", "repeating-conic-gradient"].some((n) => e.includes(n));
}, Fe = (t, e) => {
  console.warn(`[Decorator] Could not parse color: "${t}". ${e} Falling back to ${JSON.stringify(se)} to compute contrast. Please use a CSS color value that can be computed to RGB(A).`);
}, Z = (t, e = null) => {
  const n = e ? `${t}|${e}` : t, r = te.get(n);
  if (r !== void 0) return r ?? se;
  if (pl(t)) return Fe(t, "Unsupported color format or special value."), te.set(n, null), se;
  const i = fl();
  if (!i) return Fe(t, "Could not get canvas context."), te.set(n, null), se;
  try {
    Ce === 0 && i.clearRect(0, 0, 5, 5);
    const s = Ce % 5, o = Math.floor(Ce / 5);
    i.clearRect(s, o, 1, 1), e && (i.fillStyle = e, i.fillRect(s, o, 1, 1)), i.fillStyle = t, i.fillRect(s, o, 1, 1);
    const a = i.getImageData(s, o, 1, 1);
    Ce = (Ce + 1) % 25;
    const [c, l, d, u] = a.data;
    if (u === 0) return Fe(t, "Fully transparent color."), te.set(n, null), se;
    const g = { r: c, g: l, b: d, a: u / 255 };
    return te.set(n, g), g;
  } catch (s) {
    return Fe(t, `Error: ${s instanceof Error ? s.message : String(s)}`), te.set(n, null), se;
  }
}, Rt = (t) => {
  const e = t / 255;
  return e <= 0.03928 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4);
}, Qt = (t) => {
  const e = Rt(t.r), n = Rt(t.g), r = Rt(t.b);
  return 0.2126 * e + 0.7152 * n + 0.0722 * r;
}, Ye = (t, e) => {
  const n = typeof t == "string" ? Z(t) : t, r = typeof e == "string" ? Z(e) : e, i = Qt(n), s = Qt(r), o = Math.max(i, s), a = Math.min(i, s);
  return (o + 0.05) / (a + 0.05);
}, Gr = (t, e = null) => {
  const n = Z(t, e), r = Ye(n, { r: 255, g: 255, b: 255, a: 1 }), i = Ye(n, { r: 0, g: 0, b: 0, a: 1 });
  return r > i;
}, Zn = (t, e = null) => Gr(t, e) ? "white" : "black", ml = (t) => {
  const e = t.a !== void 0 ? t.a : 1;
  return `rgba(${Math.round(t.r)}, ${Math.round(t.g)}, ${Math.round(t.b)}, ${e})`;
}, yl = (t, e) => ({ r: Math.min(255, t.r + (255 - t.r) * e), g: Math.min(255, t.g + (255 - t.g) * e), b: Math.min(255, t.b + (255 - t.b) * e), a: t.a ?? 1 }), bl = (t, e) => ({ r: Math.max(0, t.r * (1 - e)), g: Math.max(0, t.g * (1 - e)), b: Math.max(0, t.b * (1 - e)), a: t.a ?? 1 }), ne = (t, e = null, n = 3) => {
  const r = Z(t), i = e ? Z(e) : { r: 255, g: 255, b: 255, a: 1 };
  let s = Ye(r, i);
  if (s >= n) return t;
  const o = Qt(i) < 0.5;
  let a = { ...r, a: r.a ?? 1 };
  const c = 20, l = 0.1;
  for (let d = 0; d < c && (o ? a = yl(a, l) : a = bl(a, l), s = Ye(a, i), !(s >= n)); d++) ;
  return ml(a);
}, Kr = () => typeof navigator > "u" ? "" : navigator.userAgent || "", Jr = () => typeof navigator > "u" ? void 0 : navigator.userAgentData || void 0;
let Qr = class {
  constructor() {
    const e = Jr(), n = Kr(), r = (s) => (typeof s == "string" || typeof s == "number") && s ? String(s).replace(/_/g, ".").split(".").map((o) => parseInt(o) || 0) : [], i = (s = "") => {
      if (!s) return [];
      const o = new RegExp("^.*" + s + "[ :\\/]?(\\d+([\\._]\\d+)*).*$");
      return o.test(n) ? r(n.replace(o, "$1")) : [];
    };
    this.OS = ((s) => (/(macOS|Mac OS X)/.test(n) ? (/\(iP(hone|od touch);/.test(n) && (s.iOS = i("CPU (?:iPhone )?OS ")), /\(iPad;/.test(n) ? s.iOS = s.iPadOS = i("CPU (?:iPhone )?OS ") : /(macOS|Mac OS X) \d/.test(n) && (document.ontouchend !== void 0 ? s.iOS = s.iPadOS = i() : s.macOS = i("(?:macOS|Mac OS X) "))) : /Windows( NT)? \d/.test(n) ? s.Windows = ((o) => o[0] !== 6 || !o[1] ? o : o[1] === 1 ? [7] : o[1] === 2 ? [8] : [8, 1])(i("Windows(?: NT)?")) : /Android \d/.test(n) ? s.Android = i("Android") : /CrOS/.test(n) ? s.ChromeOS = i() : /X11;/.test(n) && (s.Linux = i()), s))({}), e && e.getHighEntropyValues(["architecture", "model", "platform", "platformVersion", "uaFullVersion"]).then((s) => ((o) => {
      const a = s.platform, c = s.platformVersion;
      if (!(!a || !c)) {
        if (/^i(OS|P(hone|od touch))$/.test(a)) o.iOS = r(c);
        else if (/^iPad(OS)?$/.test(a)) o.iOS = o.iPadOS = r(c);
        else if (/^(macOS|(Mac )?OS X|Mac(Intel)?)$/.test(a)) document.ontouchend !== void 0 ? o.iOS = o.iPadOS = r() : o.macOS = r(c);
        else if (/^(Microsoft )?Windows$/.test(a)) o.Windows = r(c);
        else if (/^(Google )?Android$/.test(a)) o.Android = r(c);
        else if (/^((Google )?Chrome OS|CrOS)$/.test(a)) o.ChromeOS = r(c);
        else if (/^(Linux|Ubuntu|X11)$/.test(a)) o.Linux = r(c);
        else return;
        Object.keys(this.OS).forEach((l) => delete this.OS[l]), Object.assign(this.OS, o);
      }
    })({})), this.UA = ((s) => {
      let o = !1;
      if (e && Array.isArray(e.brands)) {
        const a = e.brands.reduce((c, l) => (c[l.brand] = [l.version * 1], c), {});
        a["Google Chrome"] ? (o = !0, s.Blink = s.Chromium = a.Chromium || [], s.Chrome = a["Google Chrome"]) : a["Microsoft Edge"] ? (o = !0, s.Blink = s.Chromium = a.Chromium || [], s.Edge = a["Microsoft Edge"]) : a.Opera && (o = !0, s.Blink = s.Chromium = a.Chromium || [], s.Opera = a.Opera);
      }
      return o || (/ Gecko\/\d/.test(n) ? (s.Gecko = i("rv"), / Waterfox\/\d/.test(n) ? s.Waterfox = i("Waterfox") : / Firefox\/\d/.test(n) && (s.Firefox = i("Firefox"))) : / Edge\/\d/.test(n) ? (s.EdgeHTML = i("Edge"), s.Edge = s.EdgeHTML) : / Chrom(ium|e)\/\d/.test(n) ? (s.Blink = s.Chromium = ((a) => a[0] ? a : i("Chrome"))(i("Chromium")), / EdgA?\/\d/.test(n) ? s.Edge = ((a) => a[0] ? a : i("Edg"))(i("EdgA")) : / OPR\/\d/.test(n) ? s.Opera = i("OPR") : / Vivaldi\/\d/.test(n) ? s.Vivaldi = i("Vivaldi") : / Silk\/\d/.test(n) ? s.Silk = i("Silk") : / UCBrowser\/\d/.test(n) ? s.UCBrowser = i("UCBrowser") : / Phoebe\/\d/.test(n) ? s.Phoebe = i("Phoebe") : s.Chrome = ((a) => a[0] ? a : s.Chromium)(i("Chrome"))) : / AppleWebKit\/\d/.test(n) ? (s.WebKit = i("AppleWebKit"), / CriOS \d/.test(n) ? s.Chrome = i("CriOS") : / FxiOS \d/.test(n) ? s.Firefox = i("FxiOS") : / EdgiOS\/\d/.test(n) ? s.Edge = i("EdgiOS") : / Version\/\d/.test(n) && (s.Safari = i("Version"))) : / Trident\/\d/.test(n) && (s.Trident = i("Trident"), s.InternetExplorer = ((a) => a[0] ? a : i("MSIE"))(i("rv")))), /[\[; ]FB(AN|_IAB)\//.test(n) && (s.Facebook = i("FBAV")), / Line\/\d/.test(n) && (s.LINE = i("Line")), s;
    })({}), this.Env = { get: () => [this.OS, this.UA].reduce((s, o) => {
      for (const a in o) o[a] && s.push(a);
      return s;
    }, []) };
  }
};
class vl extends Qr {
  get iOSRequest() {
    const e = Jr(), n = Kr();
    if (this.OS.iOS && !this.OS.iPadOS) return "mobile";
    if (this.OS.iPadOS) return /\(iPad;/.test(n) || e && /^iPad(OS)?$/.test(e.platform) ? "mobile" : "desktop";
  }
}
const wl = new Qr();
new vl();
const Yn = ["div", "span", "p", "br", "hr", "b", "i", "em", "strong", "s", "u", "mark", "small", "sub", "sup", "abbr", "cite", "code", "data", "dfn", "kbd", "q", "samp", "time", "var", "blockquote", "pre", "svg", "g", "path", "circle", "ellipse", "rect", "line", "polygon", "polyline", "text", "tspan", "defs", "use"], Sl = /^on/i, kl = /* @__PURE__ */ new Set(["href", "src", "action", "formaction", "xlink:href"]), xl = /^\s*(javascript|data):/i;
function El(t, e) {
  const n = t.document.createElement("div");
  if ("Sanitizer" in t && typeof n.setHTML == "function") try {
    const i = new t.Sanitizer({ allowElements: Yn });
    return n.setHTML(e, { sanitizer: i }), n.firstElementChild;
  } catch {
  }
  const r = t.document.implementation.createHTMLDocument("");
  for (r.body.innerHTML = e, Cl(r.body, new Set(Yn)); r.body.firstChild; ) n.appendChild(t.document.adoptNode(r.body.firstChild));
  return n.firstElementChild;
}
function Cl(t, e) {
  const n = Array.from(t.querySelectorAll("*")).reverse();
  for (const r of n) {
    if (!e.has(r.localName)) {
      r.replaceWith(...Array.from(r.childNodes));
      continue;
    }
    for (const { name: i, value: s } of Array.from(r.attributes)) (Sl.test(i) || kl.has(i) && xl.test(s)) && r.removeAttribute(i);
  }
}
function It(t) {
  switch (t) {
    case C.Mask:
      return "rgba(255, 255, 255, 0.5)";
    case C.Highlight:
    case C.HighlightUnderline:
      return "#FFFF00";
    default:
      return "#FF0000";
  }
}
const C = { Highlight: "highlight", HighlightUnderline: "highlightUnderline", Underline: "underline", Strikethrough: "strikethrough", Outline: "outline", TextColor: "textColor", Mask: "mask", Template: "template" };
var Al = ((t) => (t.Wrap = "wrap", t.Viewport = "viewport", t.Bounds = "bounds", t.Page = "page", t))(Al || {}), Tl = ((t) => (t.Boxes = "boxes", t.Bounds = "bounds", t))(Tl || {});
const Ol = () => "Highlight" in window, er = ["IMG", "IMAGE", "AUDIO", "VIDEO", "SVG"];
class Rl {
  constructor(e, n, r, i) {
    this.wnd = e, this.comms = n, this.id = r, this.name = i, this.items = [], this.lastItemId = 0, this.container = void 0, this._activatable = !1, this._hoverable = !1, this.hoveredItem = void 0, this.experimentalHighlights = !1, this._tintSubKeys = /* @__PURE__ */ new Map(), this._subKeyCounter = 0, this.maskSvg = void 0, this.shadowHost = void 0, this.shadowRoot = void 0, this.currentRender = 0, Ol() && (this.experimentalHighlights = !0, this.notTextFlag = /* @__PURE__ */ new Map()), this.activationHandler = this.handleActivation.bind(this), this.wnd.document.addEventListener("pointerup", this.activationHandler), this.hoverHandler = this.handleHover.bind(this), this.wnd.document.addEventListener("pointermove", this.hoverHandler);
  }
  get activatable() {
    return this._activatable;
  }
  set activatable(e) {
    this._activatable = e;
  }
  get hoverable() {
    return this._hoverable;
  }
  set hoverable(e) {
    if (this._hoverable = e, !e && this.hoveredItem) {
      const n = this.hoveredItem.range.getBoundingClientRect(), r = this.wnd.devicePixelRatio;
      this.comms.send("decoration_pointer_leave", { decorationId: this.hoveredItem.decoration.id, group: this.name, rect: { top: n.top * r, left: n.left * r, width: n.width * r, height: n.height * r } }), this.hoveredItem = void 0;
    }
  }
  add(e) {
    const n = `${this.id}-${this.lastItemId++}`, r = ll(this.wnd.document, e.locator);
    if (!r) {
      this.comms.log("Can't locate DOM range for decoration", e);
      return;
    }
    const i = r.commonAncestorContainer;
    if (i.nodeType !== Node.TEXT_NODE && this.experimentalHighlights && (er.includes(i.nodeName.toUpperCase()) && this.notTextFlag?.set(n, !0), r.cloneContents().querySelector(er.join(", ").toLowerCase()) && this.notTextFlag?.set(n, !0), (i.textContent?.trim() || "").length === 0 && this.notTextFlag?.set(n, !0)), this.experimentalHighlights && !this.notTextFlag?.has(n)) {
      const o = (a) => {
        for (; a && a.nodeType === Node.ELEMENT_NODE; ) {
          if (a.namespaceURI?.includes("svg")) return !0;
          a = a.parentNode;
        }
        return !1;
      };
      (o(r.startContainer) || o(r.endContainer)) && this.notTextFlag?.set(n, !0);
    }
    if (this.experimentalHighlights) {
      const { type: o } = e.style, { layout: a, width: c, expand: l } = e.style;
      o !== C.TextColor && (o === C.Outline || o === C.Template || o === C.Mask || a !== void 0 && a !== "boxes" || c !== void 0 && c !== "wrap" || l) && this.notTextFlag?.set(n, !0);
    }
    const s = { decoration: e, id: n, range: r, hitRects: [], clickableElements: void 0, container: void 0 };
    this.items.push(s), this.layout(s), s.hitRects = this.clientRectsToDocCoords(je(s.range, !1, !1, (s.decoration.style.expand ?? 0) + this.hitGap())), this.renderLayout([s]);
  }
  remove(e) {
    const n = this.items.findIndex((s) => s.decoration.id === e);
    if (n < 0) return;
    const r = this.items[n], i = r.decoration.style?.type === C.Mask;
    if (this.items.splice(n, 1), r.clickableElements = void 0, r.container && (r.container.remove(), r.container = void 0), this.experimentalHighlights && !this.notTextFlag?.has(r.id) && r.highlightSubKey) {
      const s = this.wnd.CSS.highlights;
      s.get(r.highlightSubKey)?.delete(r.range), this.items.some((a) => a.highlightSubKey === r.highlightSubKey) || s.delete(r.highlightSubKey);
      const o = this.wnd.document.getElementById(`${this.id}-style`);
      o && this._rebuildHighlightStylesheet(o);
    }
    this.notTextFlag?.delete(r.id), this.hoveredItem === r && (this.hoveredItem = void 0), i && this.updateSharedMask();
  }
  update(e) {
    this.remove(e.id), this.add(e);
  }
  clear() {
    this.clearContainer(), this.items.length = 0, this.notTextFlag?.clear(), this.hoveredItem = void 0, this.maskSvg && (this.maskSvg.remove(), this.maskSvg = void 0), this.shadowHost && (this.shadowHost.remove(), this.shadowHost = void 0, this.shadowRoot = void 0);
  }
  destroy() {
    this.clear(), this.wnd.document.removeEventListener("pointerup", this.activationHandler), this.wnd.document.removeEventListener("pointermove", this.hoverHandler);
  }
  clientRectsToDocCoords(e) {
    const n = xe(this.wnd), r = n.xDocOffset, i = n.yDocOffset;
    return r === 0 && i === 0 ? e : e.map((s) => ({ left: s.left + r, top: s.top + i, right: s.right + r, bottom: s.bottom + i, width: s.width, height: s.height }));
  }
  pointerToDocCoords(e) {
    const n = xe(this.wnd);
    return { docX: e.clientX + n.xDocOffset, docY: e.clientY + n.yDocOffset };
  }
  effectiveZoom() {
    if (!wl.UA.Blink) return 1;
    const e = parseFloat(this.wnd.getComputedStyle(this.wnd.document.documentElement).zoom), n = parseFloat(this.wnd.getComputedStyle(this.wnd.document.body).zoom);
    return (e || 1) * (n || 1);
  }
  hitGap() {
    return 2 * this.effectiveZoom();
  }
  handleActivation(e) {
    if (!this._activatable) return;
    const { docX: n, docY: r } = this.pointerToDocCoords(e), i = this.wnd.devicePixelRatio;
    for (const s of this.items) {
      let o;
      if (s.decoration.style.type === C.Template) for (const a of s.clickableElements ?? []) {
        const c = a.getBoundingClientRect();
        if (K(c, e.clientX, e.clientY, 0)) {
          o = c;
          break;
        }
      }
      else for (const a of s.hitRects) if (K(a, n, r, 0)) {
        o = s.range.getBoundingClientRect();
        break;
      }
      if (o) {
        this.comms.send("decoration_activated", { decorationId: s.decoration.id, group: this.name, rect: { top: o.top * i, left: o.left * i, width: o.width * i, height: o.height * i }, point: { x: e.clientX * i, y: e.clientY * i } });
        return;
      }
    }
  }
  handleHover(e) {
    if (!this._hoverable) return;
    const { docX: n, docY: r } = this.pointerToDocCoords(e), i = this.wnd.devicePixelRatio;
    let s, o;
    for (const a of this.items) {
      if (a.decoration.style.type === C.Template) for (const c of a.clickableElements ?? []) {
        const l = c.getBoundingClientRect();
        if (K(l, e.clientX, e.clientY, 0)) {
          s = a, o = l;
          break;
        }
      }
      else for (const c of a.hitRects) if (K(c, n, r, 0)) {
        s = a, o = a.range.getBoundingClientRect();
        break;
      }
      if (s) break;
    }
    if (s !== this.hoveredItem) {
      if (this.hoveredItem) {
        const a = this.hoveredItem.range.commonAncestorContainer.isConnected ? this.hoveredItem.range.getBoundingClientRect() : null;
        this.comms.send("decoration_pointer_leave", { decorationId: this.hoveredItem.decoration.id, group: this.name, rect: a ? { top: a.top * i, left: a.left * i, width: a.width * i, height: a.height * i } : void 0, point: { x: e.clientX * i, y: e.clientY * i } });
      }
      this.hoveredItem = s, s && o && this.comms.send("decoration_pointer_enter", { decorationId: s.decoration.id, group: this.name, rect: { top: o.top * i, left: o.left * i, width: o.width * i, height: o.height * i }, point: { x: e.clientX * i, y: e.clientY * i } });
    }
  }
  requestLayout() {
    this.wnd.cancelAnimationFrame(this.currentRender), this.clearContainer(), this.wnd.document.fonts.ready.then(() => {
      this.currentRender = this.wnd.requestAnimationFrame(() => {
        this.items.forEach((e) => {
          this.layout(e), e.hitRects = this.clientRectsToDocCoords(je(e.range, !1, !1, (e.decoration.style.expand ?? 0) + this.hitGap()));
        }), this.renderLayout(this.items), this.updateSharedMask();
      });
    });
  }
  experimentalLayout(e) {
    const n = this.requireContainer(!0), r = this.wnd.CSS.highlights, i = e.decoration.style, s = i.type ?? C.Highlight, o = i.tint ?? It(s), a = i.width, c = i.layout, l = this._getSubKey(s, o);
    e.highlightSubKey && (r.get(e.highlightSubKey)?.delete(e.range), e.highlightSubKey !== l && !this.items.some((m) => m !== e && m.highlightSubKey === e.highlightSubKey) && r.delete(e.highlightSubKey)), e.highlightSubKey = l;
    let d;
    r.has(l) ? d = r.get(l) : (d = new this.wnd.Highlight(), r.set(l, d));
    const u = (m, p) => this.wnd.document.caretPositionFromPoint?.(m, p) ?? null;
    if (s === C.TextColor && (c === "bounds" || a === "bounds" || a === "page")) {
      const m = xe(this.wnd);
      if (m.isVertical) console.warn("Vertical writing detected: caretPositionFromPoint has known bugs, falling back to original range"), d.add(e.range);
      else {
        const p = e.range.getBoundingClientRect();
        let w, E;
        a === "page" ? (w = Math.floor(m.inlineStart(p) / m.pageInlineSize) * m.pageInlineSize, E = m.pageInlineSize) : (w = m.inlineStart(p), E = m.inlineSize(p));
        const x = u(w, m.blockStart(p) + 1), R = u(w + E, m.blockStart(p) + m.blockSize(p) - 1);
        if (x && R) {
          const N = this.wnd.document.createRange();
          N.setStart(x.offsetNode, x.offset), N.setEnd(R.offsetNode, R.offset), d.add(N), e.range = N;
        } else d.add(e.range);
      }
    } else d.add(e.range);
    const g = this.getBackgroundColor(), f = i.enforceContrast !== !1 ? ne(o, g) : o;
    let y;
    switch (s) {
      case C.Underline:
        y = `::highlight(${l}) {
                    text-decoration: underline;
                    text-decoration-color: ${f};
                    text-decoration-thickness: 0.1em;
                }`;
        break;
      case C.Strikethrough:
        y = `::highlight(${l}) {
                    text-decoration: line-through;
                    text-decoration-color: ${f};
                    text-decoration-thickness: 0.1em;
                }`;
        break;
      case C.Outline:
        y = `::highlight(${l}) {
                    outline: 2px solid ${f};
                    outline-offset: 1px;
                }`;
        break;
      case C.TextColor:
        y = `::highlight(${l}) {
                    color: ${f};
                }`;
        break;
      case C.HighlightUnderline: {
        const { r: m, g: p, b: w } = Z(f), E = `rgba(${m}, ${p}, ${w}, 0.3)`;
        y = `::highlight(${l}) {
                    color: ${Zn(f, g)};
                    background-color: ${E};
                    text-decoration: underline;
                    text-decoration-color: ${f};
                    text-decoration-thickness: 0.1em;
                }`;
        break;
      }
      case C.Highlight:
      default:
        y = `::highlight(${l}) {
                    color: ${Zn(f, g)};
                    background-color: ${f};
                }`;
    }
    e.highlightCSS = y, this._rebuildHighlightStylesheet(n);
  }
  _getSubKey(e, n) {
    const r = `${e}::${n}`;
    let i = this._tintSubKeys.get(r);
    return i || (i = `${this.id}--${this._subKeyCounter++}`, this._tintSubKeys.set(r, i)), i;
  }
  _rebuildHighlightStylesheet(e) {
    const n = /* @__PURE__ */ new Set(), r = [];
    for (const i of this.items) i.highlightSubKey && i.highlightCSS && !n.has(i.highlightSubKey) && (n.add(i.highlightSubKey), r.push(i.highlightCSS));
    e.innerHTML = r.join(`
`);
  }
  layout(e) {
    if (this.experimentalHighlights && !this.notTextFlag?.has(e.id)) return this.experimentalLayout(e);
    const n = this.wnd.document.createElement("div");
    n.setAttribute("id", e.id), n.dataset.highlightId = e.decoration.id, n.style.setProperty("pointer-events", "none");
    const r = xe(this.wnd), i = 1 / this.effectiveZoom(), s = e.decoration.style.expand ?? 0, o = (u, g, f, y = 0) => {
      const m = e.decoration?.style?.width, p = g;
      switch (m) {
        case "viewport": {
          const w = Math.floor(r.inlineStart(p) / r.viewportInlineSize) * r.viewportInlineSize;
          r.applyPosition(u, w + r.inlineScrollOffset + y, r.blockStart(p) + r.blockScrollOffset, r.viewportInlineSize - 2 * y, r.blockSize(p), i);
          break;
        }
        case "page": {
          const w = Math.floor(r.inlineStart(p) / r.pageInlineSize) * r.pageInlineSize;
          r.applyPosition(u, w + r.inlineScrollOffset + y, r.blockStart(p) + r.blockScrollOffset, r.pageInlineSize - 2 * y, r.blockSize(p), i);
          break;
        }
        case "bounds": {
          r.applyPosition(u, r.inlineStart(f) + r.inlineScrollOffset, r.blockStart(p) + r.blockScrollOffset, r.inlineSize(f), r.blockSize(p), i);
          break;
        }
        default:
          r.applyPosition(u, r.inlineStart(p) + r.inlineScrollOffset, r.blockStart(p) + r.blockScrollOffset, r.inlineSize(p), r.blockSize(p), i);
      }
    }, a = e.range.getBoundingClientRect(), c = e.decoration.style, l = (() => {
      if (c.type !== C.Outline) return 0;
      const u = c.width;
      return u === "page" || u === "viewport" ? 3 : 0;
    })();
    let d;
    if (c.type === C.Template) {
      c.stylesheet && this.injectCustomStylesheet(c.stylesheet);
      const u = El(this.wnd, c.element);
      if (!u) {
        e.container = n, e.clickableElements = [];
        return;
      }
      u.style.setProperty("pointer-events", "none"), d = u;
    } else {
      const u = c, g = u.type ?? C.Highlight, f = u.tint ?? It(g);
      if (g === C.TextColor) {
        e.container = n, e.clickableElements = [];
        return;
      }
      if (g === C.Mask) {
        e.container = n, e.clickableElements = [], this.updateSharedMask();
        return;
      }
      const y = this.getCurrentDarkMode(), m = this.getBackgroundColor(), p = u.enforceContrast !== !1, w = (() => {
        switch (g) {
          case C.Underline: {
            const x = p ? ne(f, m) : f, R = u.layout === "bounds", [N, q] = r.isVertical ? ["border-right", "border-left"] : ["border-bottom", "border-top"];
            return [R ? `${q}: 0.1em solid ${x} !important` : null, `${N}: 0.1em solid ${x} !important`, "background-color: transparent !important", "box-sizing: border-box !important"].filter(Boolean).join("; ");
          }
          case C.Strikethrough: {
            const x = p ? ne(f, m) : f;
            return u.layout === "bounds" ? [`background: repeating-linear-gradient(-45deg, transparent, transparent 19px, ${x} 19px, ${x} 20px) !important`, "background-color: transparent !important", "box-sizing: border-box !important"].join("; ") : [`background-color: ${x} !important`, "box-sizing: border-box !important"].join("; ");
          }
          case C.Outline:
            return [`outline: 2px solid ${p ? ne(f, m) : f} !important`, "outline-offset: 1px !important", "background-color: transparent !important", "box-sizing: border-box !important"].join("; ");
          case C.HighlightUnderline: {
            const x = p ? ne(f, m) : f, { r: R, g: N, b: q } = Z(x), U = `rgba(${R}, ${N}, ${q}, 0.3)`, ye = u.layout === "bounds", [be, b] = r.isVertical ? ["border-right", "border-left"] : ["border-bottom", "border-top"];
            return [`background-color: ${U} !important`, ye ? `${b}: 0.1em solid ${x} !important` : null, `${be}: 0.1em solid ${x} !important`, "box-sizing: border-box !important"].filter(Boolean).join("; ");
          }
          case C.Highlight:
          default:
            return [`background-color: ${p ? ne(f, m) : f} !important`, `mix-blend-mode: ${y ? "exclusion" : "multiply"} !important`, "opacity: 1 !important", "box-sizing: border-box !important"].join("; ");
        }
      })(), E = this.wnd.document.createElement("template");
      E.innerHTML = `<div data-readium="true" class="readium-${g}" style="${w}"></div>`.trim(), d = E.content.firstElementChild;
    }
    if (e.decoration?.style?.layout === "bounds") {
      const u = d.cloneNode(!0);
      u.style.setProperty("pointer-events", "none");
      const g = s ? { left: a.left - s, right: a.right + s, top: a.top - s, bottom: a.bottom + s, width: a.width + s * 2, height: a.height + s * 2 } : a;
      o(u, g, a, l), n.append(u);
    } else {
      const u = c.type, g = u === C.Underline || u === C.Strikethrough, f = u === C.Strikethrough, y = g ? cl(e.range, ["rt", "rp"]) : e.range;
      let m = je(y, !0, r.isVertical, g ? 0 : s);
      m = m.sort((p, w) => r.isVertical ? (r.isVertLR ? 1 : -1) * (p.left - w.left) : p.top - w.top);
      for (let p of m) {
        const w = d.cloneNode(!0);
        w.style.setProperty("pointer-events", "none");
        let E = p;
        if (f) {
          const x = r.blockSize(p) * 0.1, R = r.blockStart(p) + r.blockSize(p) / 2 - x / 2;
          E = r.isVertical ? { left: R, right: R + x, top: p.top, bottom: p.bottom, width: x, height: p.height } : { top: R, bottom: R + x, left: p.left, right: p.right, height: x, width: p.width };
        }
        s && g && (E = r.isVertical ? { ...E, top: E.top - s, bottom: E.bottom + s, height: E.height + s * 2 } : { ...E, left: E.left - s, right: E.right + s, width: E.width + s * 2 }), o(w, E, a, l), n.append(w);
      }
    }
    e.container = n, e.clickableElements = Array.from(n.querySelectorAll("[data-activable='1']")), e.clickableElements.length || (e.clickableElements = Array.from(n.children));
  }
  renderLayout(e) {
    this.wnd.cancelAnimationFrame(this.currentRender), this.currentRender = this.wnd.requestAnimationFrame(() => {
      e = e.filter((n) => !this.experimentalHighlights || !!this.notTextFlag?.has(n.id)), !(!e || e.length === 0) && this.requireContainer().append(...e.map((n) => n.container).filter((n) => !!n));
    });
  }
  requireContainer(e = !1) {
    if (e) {
      let n;
      return this.wnd.document.getElementById(`${this.id}-style`) ? n = this.wnd.document.getElementById(`${this.id}-style`) : (n = this.wnd.document.createElement("style"), n.dataset.readium = "true", n.id = `${this.id}-style`, this.wnd.document.head.appendChild(n)), n;
    }
    return this.container || (this.shadowRoot || (this.shadowHost = this.wnd.document.createElement("div"), this.shadowHost.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none", this.wnd.document.body.appendChild(this.shadowHost), this.shadowRoot = this.shadowHost.attachShadow({ mode: "open" })), this.container = this.wnd.document.createElement("div"), this.container.setAttribute("id", this.id), this.container.dataset.group = this.name, this.container.dataset.readium = "true", this.container.style.setProperty("pointer-events", "none"), this.container.style.display = "contents", this.shadowRoot.appendChild(this.container)), this.container;
  }
  getCurrentDarkMode() {
    return Hn(this.wnd, "--USER__appearance") === "readium-night-on" || Gr(this.getBackgroundColor());
  }
  getBackgroundColor() {
    return Hn(this.wnd, "--USER__backgroundColor") || this.wnd.getComputedStyle(this.wnd.document.documentElement).getPropertyValue("background-color");
  }
  updateSharedMask() {
    const e = this.items.filter((g) => g.decoration.style?.type === C.Mask);
    if (e.length === 0) {
      this.maskSvg && (this.maskSvg.remove(), this.maskSvg = void 0), this.shadowRoot && (this.shadowRoot.innerHTML = "");
      return;
    }
    const n = xe(this.wnd), r = 1 / this.effectiveZoom(), i = this.wnd.document.documentElement, s = i.scrollWidth, o = i.scrollHeight, a = [];
    for (const g of e) {
      const f = g.decoration.style, y = f.layout ?? "boxes", m = f.width ?? "wrap", p = f.expand ?? 0, w = g.range.getBoundingClientRect(), E = y === "bounds" ? [p ? { left: w.left - p, top: w.top - p, right: w.right + p, bottom: w.bottom + p, width: w.width + p * 2, height: w.height + p * 2 } : w] : je(g.range, !1, !1, p);
      for (const x of E) {
        let R;
        switch (m) {
          case "viewport": {
            const N = Math.floor(n.inlineStart(x) / n.viewportInlineSize) * n.viewportInlineSize;
            R = n.toRect(N, n.blockStart(x), n.viewportInlineSize, n.blockSize(x));
            break;
          }
          case "page": {
            const N = Math.floor(n.inlineStart(x) / n.pageInlineSize) * n.pageInlineSize;
            R = n.toRect(N, n.blockStart(x), n.pageInlineSize, n.blockSize(x));
            break;
          }
          case "bounds": {
            R = n.toRect(n.inlineStart(w), n.blockStart(x), n.inlineSize(w), n.blockSize(x));
            break;
          }
          default:
            R = n.toRect(n.inlineStart(x), n.blockStart(x), n.inlineSize(x), n.blockSize(x));
        }
        a.push(R);
      }
    }
    const c = [`M0 0 H${s} V${o} H0 Z`, ...a.map((g) => {
      const f = (g.left + n.xDocOffset) * r, y = (g.top + n.yDocOffset) * r, m = (g.right + n.xDocOffset) * r, p = (g.bottom + n.yDocOffset) * r;
      return `M${f} ${y} H${m} V${p} H${f} Z`;
    })].join(" "), l = "http://www.w3.org/2000/svg";
    if (!this.maskSvg) {
      this.shadowRoot || (this.shadowHost = this.wnd.document.createElement("div"), this.shadowHost.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none", this.wnd.document.body.appendChild(this.shadowHost), this.shadowRoot = this.shadowHost.attachShadow({ mode: "open" })), this.maskSvg = this.wnd.document.createElementNS(l, "svg"), this.maskSvg.style.cssText = `position:absolute;top:0;left:0;width:${s}px;height:${o}px;pointer-events:none;z-index:9999`, this.maskSvg.dataset.readium = "true";
      const g = this.wnd.document.createElementNS(l, "defs"), f = this.wnd.document.createElementNS(l, "clipPath"), y = `${this.id}-mask-clip`;
      f.setAttribute("id", y), f.setAttribute("clipPathUnits", "userSpaceOnUse");
      const m = this.wnd.document.createElementNS(l, "path");
      m.setAttribute("clip-rule", "evenodd"), f.appendChild(m), g.appendChild(f), this.maskSvg.appendChild(g);
      const p = this.wnd.document.createElementNS(l, "rect");
      p.setAttribute("id", `${this.id}-mask-rect`), p.setAttribute("clip-path", `url(#${y})`), p.style.pointerEvents = "none", this.maskSvg.appendChild(p), this.shadowRoot.appendChild(this.maskSvg);
    }
    this.maskSvg.style.width = `${s}px`, this.maskSvg.style.height = `${o}px`;
    const d = this.maskSvg.querySelector("path");
    d && d.setAttribute("d", c);
    const u = this.maskSvg.querySelector("rect");
    if (u) {
      const g = e[0].decoration.style.tint, f = g ?? this.getBackgroundColor() ?? It(C.Mask), y = g ? "1" : "0.5";
      u.setAttribute("x", "0"), u.setAttribute("y", "0"), u.setAttribute("width", String(s)), u.setAttribute("height", String(o)), u.setAttribute("fill", f), u.setAttribute("fill-opacity", y);
    }
  }
  injectCustomStylesheet(e) {
    const n = `${this.id}-custom-style`;
    let r = this.wnd.document.getElementById(n);
    r || (r = this.wnd.document.createElement("style"), r.id = n, r.dataset.readium = "true", this.wnd.document.head.appendChild(r)), r.innerHTML = e;
  }
  clearContainer() {
    if (this.experimentalHighlights) {
      const e = this.wnd.CSS.highlights;
      for (const n of this._tintSubKeys.values()) e.delete(n);
      this._tintSubKeys.clear(), this._subKeyCounter = 0;
    }
    this.wnd.document.getElementById(`${this.id}-custom-style`)?.remove(), this.container && (this.container.remove(), this.container = void 0);
  }
}
const Xr = class Te extends Ko {
  constructor() {
    super(...arguments), this.resizeFrame = 0, this.lastGroupId = 0, this.groups = /* @__PURE__ */ new Map(), this.handleResizer = this.handleResize.bind(this);
  }
  cleanup() {
    this.groups.forEach((e) => e.destroy()), this.groups.clear();
  }
  updateHighlightStyles() {
    this.groups.forEach((e) => {
      e.requestLayout();
    });
  }
  handleResize() {
    this.wnd.clearTimeout(this.resizeFrame), this.resizeFrame = this.wnd.setTimeout(() => {
      this.groups.forEach((e) => {
        e.experimentalHighlights || e.requestLayout();
      });
    }, 50);
  }
  mount(e, n) {
    return this.wnd = e, n.register("decorate", Te.moduleName, (r, i) => {
      const s = r;
      (s.action === "add" || s.action === "update") && s.decoration.locator && (s.decoration.locator = el.deserialize(s.decoration.locator)), this.groups.has(s.group) || this.groups.set(s.group, new Rl(e, n, `readium-decoration-${this.lastGroupId++}`, s.group));
      const o = this.groups.get(s.group);
      switch (s.action) {
        case "add":
          o?.add(s.decoration);
          break;
        case "remove":
          o?.remove(s.decoration.id);
          break;
        case "clear":
          o?.clear();
          break;
        case "update":
          o?.update(s.decoration);
          break;
      }
      i(!0);
    }), n.register("decoration_activatable", Te.moduleName, (r, i) => {
      const s = r, o = this.groups.get(s.group);
      o && (o.activatable = s.activatable), i(!0);
    }), n.register("decoration_hoverable", Te.moduleName, (r, i) => {
      const s = r, o = this.groups.get(s.group);
      o && (o.hoverable = s.hoverable), i(!0);
    }), this.resizeObserver = new ResizeObserver(() => e.requestAnimationFrame(() => this.handleResize())), this.resizeObserver.observe(e.document.documentElement), e.addEventListener("orientationchange", this.handleResizer), e.addEventListener("resize", this.handleResizer), this.styleObserver = new MutationObserver((r) => {
      r.some((i) => i.type === "attributes" && i.attributeName === "style" && i.oldValue !== i.target.getAttribute("style")) && this.updateHighlightStyles();
    }), this.styleObserver.observe(e.document.documentElement, { attributes: !0, attributeFilter: ["style"], attributeOldValue: !0 }), n.log("Decorator Mounted"), !0;
  }
  unmount(e, n) {
    return e.removeEventListener("orientationchange", this.handleResizer), e.removeEventListener("resize", this.handleResizer), n.unregisterAll(Te.moduleName), this.resizeObserver.disconnect(), this.styleObserver.disconnect(), this.cleanup(), n.log("Decorator Unmounted"), !0;
  }
};
Xr.moduleName = "decorator";
let Il = Xr;
const Nl = new Set(Object.values(C));
function Pl(t, e) {
  return t === C.TextColor ? typeof window < "u" && "Highlight" in window : Nl.has(t) ? !0 : !!e?.[t];
}
function tr(t, e) {
  const { style: n } = t;
  if (n.type === C.Template) {
    const r = n;
    return { ...t, style: { ...r, element: nr(r, t) } };
  }
  if (n.type && e?.[n.type]) {
    const r = e[n.type];
    return { ...t, style: { type: C.Template, layout: r.layout, width: r.width, stylesheet: r.stylesheet, element: nr(r, t) } };
  }
  return t;
}
function nr(t, e) {
  return typeof t.element == "function" ? t.element(e) : t.element;
}
function Ll(t, e) {
  if (t.type !== e.type) return !1;
  if (t.type === C.Template) {
    const i = t, s = e;
    return i.layout === s.layout && i.width === s.width && i.stylesheet === s.stylesheet;
  }
  const n = t, r = e;
  return n.tint === r.tint && n.layout === r.layout && n.width === r.width && (n.enforceContrast ?? !0) === (r.enforceContrast ?? !0) && (n.expand ?? 0) === (r.expand ?? 0);
}
function ql(t, e) {
  return t.locator.href === e.locator.href && JSON.stringify(t.locator.locations?.serialize?.() ?? t.locator.locations) === JSON.stringify(e.locator.locations?.serialize?.() ?? e.locator.locations) && JSON.stringify(t.locator.text ?? null) === JSON.stringify(e.locator.text ?? null) && Ll(t.style, e.style) && JSON.stringify(t.extras ?? null) === JSON.stringify(e.extras ?? null);
}
let Zr = class {
  constructor() {
    this.queue = [], this.channel = typeof MessageChannel < "u" ? new MessageChannel() : void 0, this.channel && (this.channel.port1.onmessage = () => this.flush());
  }
  push(e) {
    const n = this.queue.length === 0;
    this.queue.push(e), n && (this.channel ? this.channel.port2.postMessage(null) : setTimeout(() => this.flush(), 0));
  }
  flush() {
    const e = this.queue;
    this.queue = [], e.forEach((n) => n());
  }
  clear() {
    this.queue = [];
  }
};
class _l {
  constructor() {
    this.frame = new Dl(this), this.host = new $l(this);
  }
}
let Dl = class {
  constructor(e) {
    this.channel = e, this.registrar = /* @__PURE__ */ new Map(), this.outbox = new Zr(), this.ready = !0;
  }
  register(e, n, r) {
    (Array.isArray(e) ? e : [e]).forEach((i) => {
      const s = this.registrar.get(i) ?? [];
      if (s.find((o) => o.module === n)) throw new Error(`Duplicate callback for "${i}" in module "${n}"`);
      s.push({ module: n, cb: r }), this.registrar.set(i, s);
    });
  }
  unregister(e, n) {
    (Array.isArray(e) ? e : [e]).forEach((r) => {
      const i = this.registrar.get(r);
      i && this.registrar.set(r, i.filter((s) => s.module !== n));
    });
  }
  unregisterAll(e) {
    this.registrar.forEach((n, r) => {
      this.registrar.set(r, n.filter((i) => i.module !== e));
    });
  }
  _dispatch(e, n, r) {
    const i = this.registrar.get(e);
    if (!i?.length) {
      r(!1);
      return;
    }
    i.forEach((s) => s.cb(n, r));
  }
  send(e, n) {
    this.outbox.push(() => this.channel.host._receive(e, n));
  }
  log(...e) {
    this.outbox.push(() => this.channel.host._receive("log", e));
  }
  destroy() {
    this.registrar.clear(), this.outbox.clear();
  }
};
class $l {
  constructor(e) {
    this.channel = e, this.listeners = /* @__PURE__ */ new Map(), this.outbox = new Zr(), this.ready = !0;
  }
  send(e, n, r) {
    this.outbox.push(() => this.channel.frame._dispatch(e, n, r ?? (() => {
    })));
  }
  on(e, n) {
    const r = this.listeners.get(e) ?? [];
    r.push(n), this.listeners.set(e, r);
  }
  off(e, n) {
    const r = this.listeners.get(e);
    r && this.listeners.set(e, r.filter((i) => i !== n));
  }
  _receive(e, n) {
    this.listeners.get(e)?.forEach((r) => r(n));
  }
}
class Ul {
  constructor(e, n = {}) {
    this.host = e, this._decorations = /* @__PURE__ */ new Map(), this._activationState = /* @__PURE__ */ new Map(), this._hoverState = /* @__PURE__ */ new Map(), this._observers = /* @__PURE__ */ new Map(), this._hoveredDecorations = /* @__PURE__ */ new Map(), this._config = n, e.on("decoration_activated", (r) => {
      const i = r, s = this._decorations.get(i.group)?.find((o) => o.id === i.decorationId);
      s && this._observers.get(i.group)?.forEach((o) => o.onDecorationActivated?.({ group: i.group, decoration: s, rect: i.rect, point: i.point }));
    }), e.on("decoration_pointer_enter", (r) => {
      const i = r, s = this._decorations.get(i.group)?.find((o) => o.id === i.decorationId);
      s && (this._hoveredDecorations.set(i.group, s), this._observers.get(i.group)?.forEach((o) => o.onDecorationPointerEnter?.({ group: i.group, decoration: s, rect: i.rect, point: i.point })));
    }), e.on("decoration_pointer_leave", (r) => {
      const i = r, s = this._decorations.get(i.group)?.find((o) => o.id === i.decorationId) ?? this._hoveredDecorations.get(i.group);
      this._hoveredDecorations.delete(i.group), s && this._observers.get(i.group)?.forEach((o) => o.onDecorationPointerLeave?.({ group: i.group, decoration: s, rect: i.rect, point: i.point }));
    });
  }
  supportsDecorationStyle(e) {
    return Pl(e, this._config.decorationTemplates);
  }
  applyDecorations(e, n) {
    const r = this._decorations.get(n) ?? [], i = new Map(r.map((c) => [c.id, c])), s = new Map(e.map((c) => [c.id, c]));
    for (const [c, l] of i) {
      const d = s.get(c);
      d ? ql(l, d) || this.host.send("decorate", { group: n, action: "update", decoration: tr(d, this._config.decorationTemplates) }) : this.host.send("decorate", { group: n, action: "remove", decoration: { id: c } });
    }
    for (const [c, l] of s) i.has(c) || this.host.send("decorate", { group: n, action: "add", decoration: tr(l, this._config.decorationTemplates) });
    this._decorations.set(n, e);
    const o = this._activationState.get(n);
    o !== void 0 && this.host.send("decoration_activatable", { group: n, activatable: o });
    const a = this._hoverState.get(n);
    a !== void 0 && this.host.send("decoration_hoverable", { group: n, hoverable: a });
  }
  registerDecorationObserver(e, n) {
    this._observers.has(e) || this._observers.set(e, /* @__PURE__ */ new Set()), this._observers.get(e).add(n), n.onDecorationActivated && (this._activationState.set(e, !0), this.host.send("decoration_activatable", { group: e, activatable: !0 })), (n.onDecorationPointerEnter || n.onDecorationPointerLeave) && (this._hoverState.set(e, !0), this.host.send("decoration_hoverable", { group: e, hoverable: !0 }));
  }
  unregisterDecorationObserver(e) {
    this._observers.forEach((n, r) => {
      if (!n.has(e)) return;
      n.delete(e);
      const i = [...n].some((o) => o.onDecorationActivated);
      this._activationState.has(r) && !i && (this._activationState.delete(r), this.host.send("decoration_activatable", { group: r, activatable: !1 }));
      const s = [...n].some((o) => o.onDecorationPointerEnter || o.onDecorationPointerLeave);
      this._hoverState.has(r) && !s && (this._hoverState.delete(r), this.host.send("decoration_hoverable", { group: r, hoverable: !1 }));
    });
  }
  destroy() {
    this._decorations.clear(), this._activationState.clear(), this._hoverState.clear(), this._observers.clear(), this._hoveredDecorations.clear();
  }
}
function Bl(t) {
  return t && Array.isArray(t) ? t : void 0;
}
function Vl(t) {
  return t && typeof t == "string" ? [t] : Bl(t);
}
function Nt(t) {
  return isNaN(t) ? void 0 : t;
}
class G {
  constructor(e) {
    this.fragments = e.fragments ? e.fragments : new Array(), this.progression = e.progression, this.totalProgression = e.totalProgression, this.position = e.position, this.otherLocations = e.otherLocations;
  }
  static deserialize(e) {
    if (!e) return;
    const n = Nt(e.progression), r = Nt(e.totalProgression), i = Nt(e.position), s = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Set(["fragment", "fragments", "progression", "totalProgression", "position", "otherLocations"]);
    return Object.entries(e).forEach(([a, c]) => {
      o.has(a) || s.set(a, c);
    }), e.otherLocations instanceof Map && e.otherLocations.forEach((a, c) => s.set(c, a)), new G({ fragments: Vl(e.fragments || e.fragment), progression: n !== void 0 && n >= 0 && n <= 1 ? n : void 0, totalProgression: r !== void 0 && r >= 0 && r <= 1 ? r : void 0, position: i !== void 0 && i > 0 ? i : void 0, otherLocations: s.size === 0 ? void 0 : s });
  }
  serialize() {
    const e = {};
    return this.fragments && (e.fragments = this.fragments), this.progression !== void 0 && (e.progression = this.progression), this.totalProgression !== void 0 && (e.totalProgression = this.totalProgression), this.position !== void 0 && (e.position = this.position), this.otherLocations && this.otherLocations.forEach((n, r) => e[r] = n), e;
  }
}
class ft {
  constructor(e) {
    this.after = e.after, this.before = e.before, this.highlight = e.highlight;
  }
  static deserialize(e) {
    if (e) return new ft({ after: e.after, before: e.before, highlight: e.highlight });
  }
  serialize() {
    const e = {};
    return this.after !== void 0 && (e.after = this.after), this.before !== void 0 && (e.before = this.before), this.highlight !== void 0 && (e.highlight = this.highlight), e;
  }
}
class et {
  constructor(e) {
    const n = e.href.indexOf("#"), r = n >= 0 ? e.href.slice(n + 1) : void 0;
    this.href = n >= 0 ? e.href.slice(0, n) : e.href, this.type = e.type, this.title = e.title;
    const i = e.locations?.fragments, s = r && (!i || i.length === 0);
    this.locations = e.locations ? s ? new G({ ...e.locations, fragments: [r] }) : e.locations : r ? new G({ fragments: [r] }) : new G({}), this.text = e.text;
  }
  static deserialize(e) {
    if (e && e.href && e.type) return new et({ href: e.href, type: e.type, title: e.title, locations: G.deserialize(e.locations), text: ft.deserialize(e.text) });
  }
  serialize() {
    const e = { href: this.href, type: this.type };
    return this.title !== void 0 && (e.title = this.title), this.locations && (e.locations = this.locations.serialize()), this.text && (e.text = this.text.serialize()), e;
  }
  copyWithLocations(e) {
    return new et({ href: this.href, type: this.type, title: this.title, text: this.text, locations: new G({ ...this.locations, ...e }) });
  }
}
function zl(t, e = window) {
  const { highlight: n, before: r, after: i, selector: s, fragment: o } = t, c = n !== void 0 || r !== void 0 || i !== void 0 ? new ft({ highlight: n, before: r, after: i }) : void 0, l = s ? /* @__PURE__ */ new Map([["cssSelector", s]]) : void 0, u = l !== void 0 || o !== void 0 ? new G({
    fragments: o ? [o] : void 0,
    otherLocations: l
  }) : void 0;
  return new et({
    href: e.location.href,
    type: "text/html",
    text: c,
    locations: u
  });
}
class jl extends Ul {
  constructor(e, n, r, i = {}) {
    super(e.host, i), this.channel = e, this.wnd = n, this.decorator = r;
  }
  // Convenience wrapper: builds Locators from shorthand text/selector options
  // and delegates to applyDecorations, which replaces the entire decoration
  // set for a group on every call — batch everything for a group into one
  // call rather than clobbering the previous one.
  decorate(e, n) {
    this.applyDecorations(
      e.map(({ id: r, style: i, ...s }) => ({
        id: r,
        style: i,
        locator: zl(s, this.wnd)
      })),
      n
    );
  }
  destroy() {
    super.destroy(), this.decorator.unmount(this.wnd, this.channel.frame), this.channel.frame.destroy();
  }
}
function Vc(t = window, e = {}) {
  const n = new _l(), r = new Il();
  return r.mount(t, n.frame), new jl(n, t, r, e);
}
class zc {
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
  async createEngine(e, n) {
    return this.require(e).createEngine(n);
  }
  async destroy() {
    await Promise.all(this.list().map((e) => e.destroy())), this.providers.clear();
  }
  require(e) {
    const n = this.providers.get(e);
    if (!n)
      throw new Error(`No provider registered under id "${e}"`);
    return n;
  }
}
const tt = { range: [0, 5e3], step: 100 }, nt = { range: [0.1, 10], step: 0.1 }, rt = { range: [0, 2], step: 0.1 }, it = { range: [0, 1], step: 0.05 }, ln = ["none", "few", "some", "most", "custom"], cn = ["none", "block-level", "always"], un = ["plain", "ssml"], hn = ["none", "utterance", "block"], rr = [
  "format",
  "inlineContextualization",
  "verbosity",
  "skip",
  "contextualize",
  "language"
];
function dn(t) {
  return t == null || typeof t == "boolean" ? t : void 0;
}
function j(t, e) {
  return t == null || e.includes(t) ? t : void 0;
}
function M(t, e) {
  if (t == null) return t;
  if (typeof t != "number" || Number.isNaN(t)) return;
  const n = Math.min(...e), r = Math.max(...e);
  return t >= n && t <= r ? t : void 0;
}
function Pe(t) {
  return t == null || Array.isArray(t) && t.every((e) => typeof e == "string") ? t : void 0;
}
class Ml {
  format;
  inlineContextualization;
  verbosity;
  skip;
  contextualize;
  language;
  pauseDuration;
  autoPause;
  rate;
  pitch;
  volume;
  constructor(e = {}) {
    this.format = j(e.format, un) ?? "plain", this.inlineContextualization = dn(e.inlineContextualization) ?? !1, this.verbosity = j(e.verbosity, ln) ?? "few", this.skip = Pe(e.skip) ?? [], this.contextualize = Pe(e.contextualize) ?? [], this.language = j(e.language, cn) ?? "block-level", this.pauseDuration = M(e.pauseDuration, tt.range) ?? 300, this.autoPause = j(e.autoPause, hn) ?? "none", this.rate = M(e.rate, nt.range) ?? 1, this.pitch = M(e.pitch, rt.range) ?? 1, this.volume = M(e.volume, it.range) ?? 1;
  }
}
class Le {
  format;
  inlineContextualization;
  verbosity;
  skip;
  contextualize;
  language;
  pauseDuration;
  autoPause;
  rate;
  pitch;
  volume;
  constructor(e = {}) {
    this.format = j(e.format, un), this.inlineContextualization = dn(e.inlineContextualization), this.verbosity = j(e.verbosity, ln), this.skip = Pe(e.skip), this.contextualize = Pe(e.contextualize), this.language = j(e.language, cn), this.pauseDuration = M(e.pauseDuration, tt.range), this.autoPause = j(e.autoPause, hn), this.rate = M(e.rate, nt.range), this.pitch = M(e.pitch, rt.range), this.volume = M(e.volume, it.range);
  }
  merging(e) {
    const n = { ...this };
    for (const r of Object.keys(e))
      e[r] !== void 0 && (n[r] = e[r]);
    return new Le(n);
  }
}
class pt {
  _value;
  _effectiveValue;
  _isEffective;
  _onChange;
  constructor({
    initialValue: e = null,
    effectiveValue: n,
    isEffective: r,
    onChange: i
  }) {
    this._value = e, this._effectiveValue = n, this._isEffective = r, this._onChange = i;
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
class He extends pt {
  _supportedValues;
  constructor({
    initialValue: e = null,
    effectiveValue: n,
    isEffective: r,
    onChange: i,
    supportedValues: s
  }) {
    super({ initialValue: e, effectiveValue: n, isEffective: r, onChange: i }), this._supportedValues = s;
  }
  set value(e) {
    if (e != null && j(e, this._supportedValues) === void 0)
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
class Fl extends pt {
  set value(e) {
    if (e != null && dn(e) === void 0)
      throw new Error(`Value '${String(e)}' is not a boolean.`);
    this._value = e, this._onChange(this._value);
  }
  get value() {
    return this._value;
  }
}
class ir extends pt {
  set value(e) {
    if (e != null && Pe(e) === void 0)
      throw new Error(`Value '${String(e)}' is not an array of strings.`);
    this._value = e, this._onChange(this._value);
  }
  get value() {
    return this._value;
  }
}
class We extends pt {
  _supportedRange;
  _step;
  _decimals;
  constructor({
    initialValue: e = null,
    effectiveValue: n,
    isEffective: r,
    onChange: i,
    supportedRange: s,
    step: o
  }) {
    super({ initialValue: e, effectiveValue: n, isEffective: r, onChange: i }), this._supportedRange = s, this._step = o, this._decimals = this._step.toString().includes(".") ? this._step.toString().split(".")[1].length : 0;
  }
  set value(e) {
    if (e != null && M(e, this._supportedRange) === void 0)
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
class sr {
  preferences;
  settings;
  // Cloned rather than aliased: edits made through this editor's setters
  // are staged on this copy and only reach the navigator's own preferences
  // once explicitly passed to submitPreferences() — discarding the editor
  // without submitting must leave the navigator untouched.
  constructor(e, n) {
    this.preferences = new Le({ ...e }), this.settings = n;
  }
  // Explicit `null`s, not `undefined` — merging() skips `undefined` fields,
  // so only `null` actually clears them once submitted.
  clear() {
    this.preferences = new Le({
      format: null,
      inlineContextualization: null,
      verbosity: null,
      skip: null,
      contextualize: null,
      language: null,
      pauseDuration: null,
      autoPause: null,
      rate: null,
      pitch: null,
      volume: null
    });
  }
  updatePreference(e, n) {
    this.preferences[e] = n;
  }
  get format() {
    return new He({
      initialValue: this.preferences.format,
      effectiveValue: this.settings.format,
      isEffective: this.preferences.format != null,
      onChange: (e) => this.updatePreference("format", e ?? null),
      supportedValues: un
    });
  }
  get inlineContextualization() {
    return new Fl({
      initialValue: this.preferences.inlineContextualization,
      effectiveValue: this.settings.inlineContextualization,
      isEffective: this.preferences.inlineContextualization != null,
      onChange: (e) => this.updatePreference("inlineContextualization", e ?? null)
    });
  }
  get verbosity() {
    return new He({
      initialValue: this.preferences.verbosity,
      effectiveValue: this.settings.verbosity,
      isEffective: this.preferences.verbosity != null,
      onChange: (e) => this.updatePreference("verbosity", e ?? null),
      supportedValues: ln
    });
  }
  get skip() {
    return new ir({
      initialValue: this.preferences.skip,
      effectiveValue: this.settings.skip,
      isEffective: this.preferences.skip != null,
      onChange: (e) => this.updatePreference("skip", e ?? null)
    });
  }
  get contextualize() {
    return new ir({
      initialValue: this.preferences.contextualize,
      effectiveValue: this.settings.contextualize,
      isEffective: this.preferences.contextualize != null,
      onChange: (e) => this.updatePreference("contextualize", e ?? null)
    });
  }
  get language() {
    return new He({
      initialValue: this.preferences.language,
      effectiveValue: this.settings.language,
      isEffective: this.preferences.language != null,
      onChange: (e) => this.updatePreference("language", e ?? null),
      supportedValues: cn
    });
  }
  get pauseDuration() {
    return new We({
      initialValue: this.preferences.pauseDuration,
      effectiveValue: this.settings.pauseDuration,
      isEffective: this.preferences.pauseDuration != null,
      onChange: (e) => this.updatePreference("pauseDuration", e ?? null),
      supportedRange: tt.range,
      step: tt.step
    });
  }
  get autoPause() {
    return new He({
      initialValue: this.preferences.autoPause,
      effectiveValue: this.settings.autoPause,
      isEffective: this.preferences.autoPause != null,
      onChange: (e) => this.updatePreference("autoPause", e ?? null),
      supportedValues: hn
    });
  }
  get rate() {
    return new We({
      initialValue: this.preferences.rate,
      effectiveValue: this.settings.rate,
      isEffective: this.preferences.rate != null,
      onChange: (e) => this.updatePreference("rate", e ?? null),
      supportedRange: nt.range,
      step: nt.step
    });
  }
  get pitch() {
    return new We({
      initialValue: this.preferences.pitch,
      effectiveValue: this.settings.pitch,
      isEffective: this.preferences.pitch != null,
      onChange: (e) => this.updatePreference("pitch", e ?? null),
      supportedRange: rt.range,
      step: rt.step
    });
  }
  get volume() {
    return new We({
      initialValue: this.preferences.volume,
      effectiveValue: this.settings.volume,
      isEffective: this.preferences.volume != null,
      onChange: (e) => this.updatePreference("volume", e ?? null),
      supportedRange: it.range,
      step: it.step
    });
  }
}
const Yr = ["audio", "figure", "image", "math", "table", "video"], ei = [
  ...Yr,
  "blockquote",
  "cell",
  "chapter",
  "columnheader",
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
], Hl = [
  ...ei,
  "abstract",
  "acknowledgments",
  "afterword",
  "appendix",
  "aside",
  "bibliography",
  "caption",
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
  "pagebreak",
  "pagelist",
  "preface",
  "prologue",
  "pullquote",
  "separator",
  "summary",
  "term"
], Wl = {
  none: /* @__PURE__ */ new Set([
    "aside",
    "bibliography",
    "endnotes",
    "footnote",
    "noteref",
    "pullquote",
    "pagebreak",
    "details",
    "columnheader",
    "rowheader",
    "row",
    "cell",
    "audio",
    "image",
    "figure",
    "video",
    "table",
    "landmarks",
    "loa",
    "loi",
    "lot",
    "lov",
    "toc"
  ]),
  few: /* @__PURE__ */ new Set([
    "aside",
    "bibliography",
    "endnotes",
    "footnote",
    "noteref",
    "pullquote",
    "pagebreak",
    "details",
    "columnheader",
    "rowheader",
    "row",
    "cell",
    "landmarks",
    "loa",
    "loi",
    "lot",
    "lov",
    "toc"
  ]),
  some: /* @__PURE__ */ new Set([
    "aside",
    "bibliography",
    "endnotes",
    "footnote",
    "noteref",
    "pullquote",
    "pagebreak",
    "landmarks",
    "loa",
    "loi",
    "lot",
    "lov",
    "toc"
  ]),
  most: /* @__PURE__ */ new Set(["landmarks", "loa", "loi", "lot", "lov", "toc"])
}, Gl = {
  none: /* @__PURE__ */ new Set(),
  few: new Set(Yr),
  some: new Set(ei),
  most: new Set(Hl)
};
class ar {
  format;
  inlineContextualization;
  verbosity;
  skip;
  contextualize;
  language;
  pauseDuration;
  autoPause;
  rate;
  pitch;
  volume;
  constructor(e, n) {
    this.format = e.format ?? n.format, this.inlineContextualization = e.inlineContextualization ?? n.inlineContextualization, this.verbosity = e.verbosity ?? n.verbosity, this.verbosity === "custom" ? (this.skip = e.skip ?? n.skip, this.contextualize = e.contextualize ?? n.contextualize) : (this.skip = [...Wl[this.verbosity]], this.contextualize = [...Gl[this.verbosity]]), this.language = e.language ?? n.language, this.pauseDuration = e.pauseDuration ?? n.pauseDuration, this.autoPause = e.autoPause ?? n.autoPause, this.rate = e.rate ?? n.rate, this.pitch = e.pitch ?? n.pitch, this.volume = e.volume ?? n.volume;
  }
}
function De(t) {
  return t.plain === "" && t.ssml === "" && t.language === "";
}
function Kl(t) {
  if (!t || De(t)) return;
  if (t.ssml === "" && t.language === "") return t.plain;
  const e = { language: t.language };
  return t.plain !== "" && (e.plain = t.plain), t.ssml !== "" && (e.ssml = t.ssml), e;
}
function Jl(t, e) {
  if (t.lang !== e.lang || t.tag !== e.tag) return !1;
  const n = Object.entries(t.attrs ?? {}), r = Object.entries(e.attrs ?? {});
  return n.length !== r.length ? !1 : n.every(([i, s]) => e.attrs?.[i] === s);
}
const st = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), Pt = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"), Ql = /[\u00A0\u2007\u202F]/;
function Xl(t) {
  return Ql.test(t);
}
function qe(t, e) {
  let n = "", r = !1, i = !1;
  for (const s of t)
    if (Xl(s))
      n += s, r = !1, i = !0;
    else if (/\s/.test(s)) {
      if (e && !i || r) continue;
      n += " ", r = !0;
    } else s !== "​" && s !== "­" && (n += s, r = !1, i = !0);
  return n;
}
const Zl = {
  // Collections / sections with their own substructure — start/end pairs.
  footnote: { start: "Start of the footnote.", end: "End of the footnote." },
  part: { start: "Start of the part.", end: "End of the part." },
  chapter: { start: "Start of the chapter.", end: "End of the chapter." },
  prologue: { start: "Start of the prologue.", end: "End of the prologue." },
  preface: { start: "Start of the preface.", end: "End of the preface." },
  introduction: { start: "Start of the introduction.", end: "End of the introduction." },
  conclusion: { start: "Start of the conclusion.", end: "End of the conclusion." },
  epilogue: { start: "Start of the epilogue.", end: "End of the epilogue." },
  afterword: { start: "Start of the afterword.", end: "End of the afterword." },
  appendix: { start: "Start of the appendix.", end: "End of the appendix." },
  acknowledgments: { start: "Start of the acknowledgments.", end: "End of the acknowledgments." },
  endnotes: { start: "Start of the endnotes.", end: "End of the endnotes." },
  glossary: { start: "Start of the glossary.", end: "End of the glossary." },
  bibliography: { start: "Start of the bibliography.", end: "End of the bibliography." },
  index: { start: "Start of the index.", end: "End of the index." },
  toc: { start: "Start of the table of contents.", end: "End of the table of contents." },
  pagelist: { start: "Start of the page list.", end: "End of the page list." },
  landmarks: { start: "Start of the landmarks.", end: "End of the landmarks." },
  loa: { start: "Start of the list of audio clips.", end: "End of the list of audio clips." },
  loi: { start: "Start of the list of illustrations.", end: "End of the list of illustrations." },
  lot: { start: "Start of the list of tables.", end: "End of the list of tables." },
  lov: { start: "Start of the list of video clips.", end: "End of the list of video clips." },
  qna: { start: "Start of the questions and answers.", end: "End of the questions and answers." },
  table: { start: "Start of the table.", end: "End of the table." },
  figure: { start: "Start of the figure.", end: "End of the figure." },
  aside: { start: "Start of the aside.", end: "End of the aside." },
  details: { start: "Start of the details.", end: "End of the details." },
  credits: { start: "Start of the credits.", end: "End of the credits." },
  blockquote: { start: "Start of the quote.", end: "End of the quote." },
  list: { start: "Start of the list.", end: "End of the list." },
  preformatted: { start: "Start of the preformatted text.", end: "End of the preformatted text." },
  row: { start: "Start of the row.", end: "End of the row." },
  complementary: { start: "Start of the complementary content.", end: "End of the complementary content." },
  // Single, self-contained pieces of content — one announcement each.
  pagebreak: "Pagebreak.",
  heading1: "Heading level 1.",
  heading2: "Heading level 2.",
  heading3: "Heading level 3.",
  heading4: "Heading level 4.",
  heading5: "Heading level 5.",
  heading6: "Heading level 6.",
  subtitle: "Subtitle.",
  epigraph: "Epigraph.",
  abstract: "Abstract.",
  colophon: "Colophon.",
  dedication: "Dedication.",
  cover: "Cover.",
  errata: "Errata.",
  notice: "Notice.",
  example: "Example.",
  tip: "Tip.",
  pullquote: "Pull quote.",
  credit: "Credit.",
  image: "Image.",
  audio: "Audio.",
  video: "Video.",
  caption: "Caption.",
  listItem: "List item.",
  cell: "Cell.",
  columnheader: "Column header.",
  rowheader: "Row header.",
  term: "Term.",
  summary: "Summary.",
  separator: "Separator."
}, Yl = /<lang xml:lang="[^"]*">([\s\S]*?)<\/lang>/g;
function ti(t) {
  return t.replace(Yl, "$1");
}
const ec = /\s*<readium:[a-zA-Z][\w-]*\s+id="[^"]*"\s*\/>\s*/g;
function tc(t) {
  return t.replace(ec, (n, r, i) => {
    const s = i.slice(r + n.length);
    return s.length === 0 || gt(s) ? "" : " ";
  }).replace(/ {2,}/g, " ").trim();
}
function nc(t) {
  return t.includes("<");
}
function ni(t) {
  if (t === void 0) return;
  if (typeof t == "string") return { plain: t };
  const e = { language: t.language };
  if (t.ssml) {
    const n = tc(t.ssml);
    nc(n) && (e.ssml = n);
  }
  return t.plain && (e.plain = t.plain), e.plain || e.ssml ? e : void 0;
}
function gn(t) {
  return t.replace(/<[^>]+>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/ {2,}/g, " ").trim();
}
const ri = /<lang xml:lang="([^"]*)">([\s\S]*?)<\/lang>/g;
function ii(t) {
  return new RegExp(ri).test(t);
}
function or(t) {
  return t.replace(/<[^>]+>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/ {2,}/g, " ");
}
const rc = new RegExp(
  `\\s+|[${Ft}]+|[${le}]+|[^\\s${Ft}${le}]+`,
  "gu"
);
function Lt(t) {
  const e = [];
  for (const [n] of t.matchAll(rc))
    /^\s/.test(n) ? e.push({ kind: "space" }) : Co(n) ? e.push({ kind: "open", text: n }) : gt(n) ? e.push({ kind: "close", text: n }) : e.push({ kind: "word", text: n });
  return e;
}
function ic(t) {
  let e = "", n = !1;
  for (const r of t) {
    if (r.kind === "space") {
      e && (n = !0);
      continue;
    }
    n && (e += " "), e += r.text, n = !1;
  }
  return e;
}
function sc(t) {
  let e = t.length;
  for (; e > 0 && (t[e - 1].kind === "space" || t[e - 1].kind === "open"); ) e--;
  return t.slice(e).some((n) => n.kind === "open") ? t.splice(e) : [];
}
function ac(t) {
  let e = 0;
  for (; e < t.length && (t[e].kind === "space" || t[e].kind === "close"); ) e++;
  return t.slice(0, e).some((n) => n.kind === "close") ? t.splice(0, e) : [];
}
function si(t, e) {
  const n = [];
  let r = 0;
  for (const s of t.matchAll(ri))
    n.push({
      tokens: Lt(or(t.slice(r, s.index))),
      language: e,
      tagged: !1
    }), n.push({ tokens: Lt(gn(s[2])), language: s[1], tagged: !0 }), r = s.index + s[0].length;
  n.push({
    tokens: Lt(or(t.slice(r))),
    language: e,
    tagged: !1
  });
  for (let s = 0; s < n.length - 1; s++)
    !n[s].tagged && n[s + 1].tagged ? n[s + 1].tokens.unshift(...sc(n[s].tokens)) : n[s].tagged && !n[s + 1].tagged && n[s].tokens.push(...ac(n[s + 1].tokens));
  const i = [];
  for (const s of n) {
    const o = ic(s.tokens);
    o && i.push({ plain: o, language: s.language });
  }
  return i;
}
const ai = /<readium:[a-zA-Z][\w-]*\s+id="([^"]*)"\s*\/>/g;
function oc(t) {
  return new RegExp(ai).test(t);
}
function lc(t) {
  const e = [];
  let n = 0;
  for (const i of t.matchAll(ai)) {
    const s = t.slice(n, i.index).trim();
    s && e.push({ ssml: s }), e.push({ placeholderId: i[1] }), n = i.index + i[0].length;
  }
  const r = t.slice(n).trim();
  return r && e.push({ ssml: r }), e;
}
function at(t) {
  return typeof t == "object";
}
const jc = [
  // Ancillary content
  "aside",
  "bibliography",
  "details",
  "endnotes",
  "footnote",
  "noteref",
  "pullquote",
  // Navigation
  "landmarks",
  "loa",
  "loi",
  "lot",
  "lov",
  "pagebreak",
  "toc"
], cc = [
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
], uc = new Set(cc);
function _e(t, e) {
  return typeof t == "function" ? t(e) : t;
}
function ce(t, e) {
  return e === "ssml" ? { ssml: st(t) } : { plain: t };
}
function ue(t, e, n, r) {
  t.push(...r);
  for (let i = 0; i < r.length; i++) e.push(n);
}
function oi(t, e, n, r, i, s, o) {
  o ? (i.some((a) => n.blockStarts.has(a)) && n.blockStarts.add(o), ue(t, e, s[0] ?? r, [o])) : (t.push(...i), e.push(...s));
}
function lr(t, e, n, r, i, s, o) {
  if (!r.contextualize.has(i)) return;
  const a = r.announcements[i];
  if (a !== void 0) {
    if (at(a)) {
      const c = s === "before" ? a.start : a.end;
      ue(t, e, n, [ce(_e(c, o), r.format)]);
      return;
    }
    s === "before" && ue(t, e, n, [ce(_e(a, o), r.format)]);
  }
}
function cr(t, e) {
  return e.size > 0 && t.some((n) => e.has(n));
}
function fn(t, e) {
  let n, r = !1;
  const i = [];
  for (const a of t) {
    const c = e === "ssml" ? a.ssml : a.plain;
    if (c && (i.push(c), a.language !== void 0)) {
      if (r && a.language !== n) return;
      n = a.language, r = !0;
    }
  }
  if (i.length === 0) return;
  let s = "";
  for (const a of i)
    a.length === 1 && s.endsWith(a) || (s && !gt(a) && (s += " "), s += a);
  const o = e === "ssml" ? { ssml: s } : { plain: s };
  return n && (o.language = n), o;
}
function hc(t, e) {
  const n = ni(t.text), r = n ? li(n, e.format, e.language) : [];
  if (!e.contextualize.has("pagebreak")) return r;
  const i = e.announcements.pagebreak;
  if (i === void 0) return r;
  const s = ce(_e(at(i) ? i.start : i), e.format);
  if (r.length === 0) return [s];
  const o = fn([s, ...r], e.format);
  return o ? (o.plain !== void 0 && (o.plain += "."), o.ssml !== void 0 && (o.ssml += "."), [o]) : [s, ...r];
}
function li(t, e, n) {
  if (e === "plain" && n !== "block-level" && n !== "none" && t.ssml && ii(t.ssml))
    return si(t.ssml, t.language).map((i) => {
      const s = { plain: i.plain };
      return i.language && (s.language = i.language), s;
    });
  const r = {};
  return t.language && (r.language = t.language), e === "ssml" ? r.ssml = t.ssml ?? st(t.plain ?? "") : r.plain = t.plain ?? gn(t.ssml ?? ""), (n === "block-level" || n === "none") && (r.ssml && (r.ssml = ti(r.ssml)), n === "none" && delete r.language), [r];
}
function dc(t, e, n, r, i, s) {
  const o = typeof t.text == "object" ? t.text.language : void 0, a = new Map((t.children ?? []).map((u) => [u.id, u])), c = [], l = [];
  for (const u of lc(e)) {
    if (u.placeholderId !== void 0) {
      const f = a.get(u.placeholderId);
      f && ci(f, c, l, i, s);
      continue;
    }
    if (!u.ssml) continue;
    if (i.format === "plain" && i.language !== "block-level" && i.language !== "none" && ii(u.ssml)) {
      for (const f of si(u.ssml, o)) {
        const y = { plain: f.plain };
        f.language && (y.language = f.language), c.push(y), l.push(t);
      }
      continue;
    }
    const g = {};
    o && (g.language = o), i.format === "ssml" ? g.ssml = u.ssml : g.plain = gn(u.ssml), (i.language === "block-level" || i.language === "none") && (g.ssml && (g.ssml = ti(g.ssml)), i.language === "none" && delete g.language), c.push(g), l.push(t);
  }
  const d = c.length > 1 ? fn(c, i.format) : void 0;
  oi(n, r, i, t, c, l, d);
}
function ci(t, e, n, r, i) {
  const s = t.role ?? [];
  if (cr(s, r.skip)) return;
  const o = s.some((u) => uc.has(u)), a = o && !i, c = e.length, l = s.includes("footnote"), d = s.filter(
    (u) => !(l && (u === "footnote" || u === "aside")) && u !== "pagebreak"
  );
  for (const u of d)
    lr(e, n, t, r, u, "before");
  if (s.includes("noteref"))
    for (const u of t.children ?? []) {
      const g = u.role ?? [];
      if (!cr(g, r.skip))
        if (g.includes("footnote")) {
          const f = [], y = [];
          oe([u], f, y, r, i);
          const m = r.contextualize.has("footnote") ? r.announcements.footnote : void 0, p = [], w = [];
          if (m !== void 0) {
            const x = at(m) ? m.start : m;
            p.push(ce(_e(x), r.format)), w.push(u);
          }
          p.push(...f), w.push(...y), m !== void 0 && at(m) && (p.push(ce(_e(m.end), r.format)), w.push(u));
          const E = m !== void 0 && p.length > 1 ? fn(p, r.format) : void 0;
          oi(e, n, r, u, p, w, E);
        } else
          oe([u], e, n, r, i);
    }
  else {
    const u = typeof t.text == "object" ? t.text.ssml : void 0;
    if (r.inlineContextualization && u && oc(u))
      dc(t, u, e, n, r, i);
    else if (s.includes("pagebreak")) {
      if (ue(e, n, t, hc(t, r)), t.children) {
        const g = i || o && e.length > c;
        oe(t.children, e, n, r, g);
      }
    } else {
      const g = ni(t.text);
      if (g && ue(e, n, t, li(g, r.format, r.language)), t.children) {
        const f = i || o && e.length > c;
        oe(t.children, e, n, r, f);
      }
    }
  }
  a && e.length > c && r.blockStarts.add(e[c]), t.description !== void 0 && ue(e, n, t, [ce(t.description, r.format)]);
  for (const u of d)
    lr(e, n, t, r, u, "after");
}
function oe(t, e, n, r, i) {
  t.forEach((s, o) => ci(s, e, n, r, o === 0 ? i : !1));
}
function ui(t) {
  return {
    announcements: { ...Zl, ...t.announcements },
    skip: new Set(t.skip ?? []),
    contextualize: new Set(t.contextualize ?? []),
    format: t.format ?? "plain",
    inlineContextualization: t.inlineContextualization ?? !1,
    language: t.language,
    blockStarts: /* @__PURE__ */ new Set()
  };
}
function Mc(t, e) {
  const n = [];
  return oe(t, n, [], ui(e), !1), n;
}
function gc(t, e) {
  const n = [], r = [], i = ui(e);
  oe(t, n, r, i, !1);
  const s = n.map((o) => i.blockStarts.has(o));
  return { utterances: n, sources: r, blockStarts: s };
}
class Fc {
  engine;
  contentQueue = [];
  events = new ut();
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
  // The raw GND source, retained only when content was loaded via
  // `loadGndContent()`. Its absence is what makes submitPreferences()'s
  // extraction-affecting fields (format, verbosity, skip, contextualize,
  // language) a no-op on content loaded via loadContent() — prosody
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
  constructor(e, n = {}) {
    this.engine = e, this._defaults = new Ml(n.defaults), this._preferences = new Le(n.preferences), this._settings = new ar(this._preferences, this._defaults), this.setupEngineListeners(), this.applyEngineParameters(), this.initializeEngine();
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
      this.setNavigatorState("playing"), this.emitEvent({ type: "start" });
    }), this.engine.on("end", () => {
      const e = this.engine.getCurrentUtteranceIndex(), n = this.engine.getUtteranceCount();
      if (e < n - 1) {
        const r = this._settings.autoPause === "utterance" || this.contentBlockStarts[e + 1] === !0;
        this._settings.autoPause !== "none" && r ? (this.pendingAutoPauseIndex = e + 1, this.setNavigatorState("paused"), this.emitEvent({ type: "pause" })) : this.pendingAdvanceTimeout = setTimeout(() => {
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
      const e = this.pendingResumeIndex, n = this.pendingResumeState;
      if (this.pendingResumeIndex = null, this.pendingResumeState = null, this.navigatorState === "loading") {
        if (n === "playing") {
          this.setNavigatorState("playing"), this.engine.speak(e ?? 0);
          return;
        }
        if (n === "paused") {
          const r = e ?? 0;
          r > 0 ? this.engine.setCurrentUtteranceIndex(r, () => this.setNavigatorState("paused")) : this.setNavigatorState("paused");
          return;
        }
        this.setNavigatorState("ready"), this.emitEvent({ type: "ready" });
      }
    }), this.engine.on("boundary", (e) => {
      this.emitEvent(e);
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
  loadGndContent(e) {
    this.source = e, this.reextract();
  }
  setContentQueue(e, n = null, r = null) {
    this.clearPendingAdvance(), this.pendingAutoPauseIndex = null, (this.navigatorState === "playing" || this.navigatorState === "paused") && this.engine.stop();
    const i = Array.isArray(e) ? e : [e];
    this.contentQueue = [...i], this.pendingResumeIndex = n, this.pendingResumeState = r, this.setNavigatorState("loading"), this.emitEvent({ type: "loading" }), this.engine.loadUtterances(i, n ?? void 0), this.emitContentChangeEvent({ content: i });
  }
  // Re-runs extraction from `this.source`, resuming near the old position if playback was underway.
  reextract() {
    if (!this.source) return;
    const e = this.navigatorState === "playing" || this.navigatorState === "paused" ? this.navigatorState : null, n = this.contentSources, r = this.getCurrentUtteranceIndex(), { utterances: i, sources: s, blockStarts: o } = gc(this.source, {
      format: this._settings.format,
      inlineContextualization: this._settings.inlineContextualization,
      skip: this._settings.skip,
      contextualize: this._settings.contextualize,
      language: this._settings.language
    });
    this.contentSources = s, this.contentBlockStarts = o;
    const a = e ? this.resolveResumeIndex(n, r, s) : null;
    this.setContentQueue(i, a, e);
  }
  // Nearest node at or before oldIndex that's still present in newSources.
  resolveResumeIndex(e, n, r) {
    for (let i = Math.min(n, e.length - 1); i >= 0; i--) {
      const s = e[i];
      if (s === void 0) continue;
      const o = r.indexOf(s);
      if (o !== -1) return o;
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
    this.navigatorState === "playing" && (this.clearPendingAdvance(), this.pendingAutoPauseIndex = null, this.setNavigatorState("paused"), this.engine.pause());
  }
  stop() {
    this.clearPendingAdvance(), this.pendingAutoPauseIndex = null, this.setNavigatorState("idle"), this.engine.stop(), this.emitEvent({ type: "stop" });
  }
  clearPendingAdvance() {
    this.pendingAdvanceTimeout !== null && (clearTimeout(this.pendingAdvanceTimeout), this.pendingAdvanceTimeout = null);
  }
  skipToPosition(e, n = !1) {
    const r = this.getCurrentUtteranceIndex();
    return e < 0 || e >= this.contentQueue.length ? !1 : (e === r || (this.clearPendingAdvance(), this.navigatorState === "paused" && !n ? (this.pendingAutoPauseIndex !== null && (this.pendingAutoPauseIndex = e), this.engine.setCurrentUtteranceIndex(e, (i) => {
      i && this.emitEvent({
        type: "skip",
        detail: { position: e }
      });
    })) : (this.pendingAutoPauseIndex = null, this.setNavigatorState("playing"), this.engine.speak(e))), !0);
  }
  // Navigation - Navigator coordinates with proper state management
  next(e = !1) {
    const n = this.getCurrentUtteranceIndex();
    return this.skipToPosition(n + 1, e);
  }
  previous(e = !1) {
    const n = this.getCurrentUtteranceIndex();
    return this.skipToPosition(n - 1, e);
  }
  jumpTo(e, n = !1) {
    return this.skipToPosition(e, n);
  }
  // State - Navigator is the single source of truth
  getState() {
    return this.navigatorState;
  }
  // Events
  on(e, n) {
    return this.events.on(e, n);
  }
  emitEvent(e) {
    this.events.emit(e.type, e);
  }
  emitContentChangeEvent(e) {
    this.events.emit("contentchange", { type: "contentchange", detail: e });
  }
  // Preferences API (Configurable<SpeechSettings, SpeechPreferences>)
  get settings() {
    return this._settings;
  }
  get preferencesEditor() {
    return this._preferencesEditor === null && (this._preferencesEditor = new sr(this._preferences, this.settings)), this._preferencesEditor;
  }
  submitPreferences(e) {
    !this.source && rr.some((n) => e[n] !== void 0) && console.warn(
      "submitPreferences(): extraction-affecting preferences (format, inlineContextualization, verbosity, skip, contextualize, language) have no effect on content loaded via loadContent() — use loadGndContent() to re-extract on submission."
    ), this._preferences = this._preferences.merging(e), this.applyPreferences();
  }
  applyPreferences() {
    const e = this._settings;
    this._settings = new ar(this._preferences, this._defaults), this.applyEngineParameters(), this._preferencesEditor !== null && (this._preferencesEditor = new sr(this._preferences, this._settings)), rr.some((n) => !this.sameSettingValue(e[n], this._settings[n])) && this.reextract();
  }
  // Arrays (skip/contextualize) compare as sets, not by reference.
  sameSettingValue(e, n) {
    return Array.isArray(e) && Array.isArray(n) ? e.length === n.length && e.every((r) => n.includes(r)) : e === n;
  }
  async destroy() {
    this.clearPendingAdvance(), this.events.clear(), await this.engine.destroy();
  }
}
const fc = [
  "heading1",
  "heading2",
  "heading3",
  "heading4",
  "heading5",
  "heading6"
], ur = {
  "doc-abstract": "abstract",
  "doc-acknowledgments": "acknowledgments",
  "doc-afterword": "afterword",
  "doc-appendix": "appendix",
  article: "article",
  "doc-backlink": "backlink",
  "doc-biblioentry": "listItem",
  // Deprecated in DPUB-ARIA 1.1
  "doc-bibliography": "bibliography",
  "doc-biblioref": "biblioref",
  blockquote: "blockquote",
  caption: "caption",
  cell: "cell",
  "doc-chapter": "chapter",
  "doc-colophon": "colophon",
  columnheader: "columnheader",
  complementary: "complementary",
  "doc-conclusion": "conclusion",
  "doc-cover": "cover",
  "doc-credit": "credit",
  "doc-credits": "credits",
  "doc-dedication": "dedication",
  definition: "definition",
  "doc-endnote": "footnote",
  // Deprecated in DPUB-ARIA 1.1
  "doc-endnotes": "endnotes",
  "doc-epigraph": "epigraph",
  "doc-epilogue": "epilogue",
  "doc-errata": "errata",
  "doc-example": "example",
  figure: "figure",
  "doc-footnote": "footnote",
  "doc-foreword": "foreword",
  "doc-glossary": "glossary",
  "doc-glossref": "glossref",
  img: "image",
  image: "image",
  // ARIA 1.3 synonym of img
  "doc-index": "index",
  "doc-introduction": "introduction",
  list: "list",
  listitem: "listItem",
  main: "main",
  math: "math",
  navigation: "navigation",
  "doc-noteref": "noteref",
  "doc-notice": "notice",
  "doc-pagebreak": "pagebreak",
  "doc-pagelist": "pagelist",
  paragraph: "paragraph",
  "doc-part": "part",
  "doc-preface": "preface",
  "doc-prologue": "prologue",
  "doc-pullquote": "pullquote",
  presentation: "presentation",
  none: "presentation",
  "doc-qna": "qna",
  qna: "qna",
  region: "region",
  row: "row",
  rowheader: "rowheader",
  separator: "separator",
  "doc-subtitle": "subtitle",
  table: "table",
  term: "term",
  "doc-tip": "tip",
  "doc-toc": "toc"
}, pc = {
  abstract: "abstract",
  acknowledgments: "acknowledgments",
  afterword: "afterword",
  appendix: "appendix",
  aside: "aside",
  backlink: "backlink",
  biblioentry: "listItem",
  // Deprecated in DPUB-ARIA 1.1
  bibliography: "bibliography",
  biblioref: "biblioref",
  "table-cell": "cell",
  chapter: "chapter",
  colophon: "colophon",
  conclusion: "conclusion",
  cover: "cover",
  credit: "credit",
  credits: "credits",
  dedication: "dedication",
  glossdef: "definition",
  endnote: "footnote",
  endnotes: "endnotes",
  rearnote: "footnote",
  // Deprecated alias of endnote
  rearnotes: "endnotes",
  // Deprecated alias of endnotes
  epigraph: "epigraph",
  epilogue: "epilogue",
  errata: "errata",
  example: "example",
  figure: "figure",
  footnote: "footnote",
  foreword: "foreword",
  glossary: "glossary",
  glossref: "glossref",
  index: "index",
  introduction: "introduction",
  landmarks: "landmarks",
  list: "list",
  "list-item": "listItem",
  loa: "loa",
  loi: "loi",
  lot: "lot",
  lov: "lov",
  noteref: "noteref",
  notice: "notice",
  pagebreak: "pagebreak",
  "page-list": "pagelist",
  pagelist: "pagelist",
  part: "part",
  preface: "preface",
  prologue: "prologue",
  pullquote: "pullquote",
  qna: "qna",
  "table-row": "row",
  subtitle: "subtitle",
  table: "table",
  glossterm: "term",
  tip: "tip",
  toc: "toc"
}, mc = {
  article: "article",
  aside: "aside",
  audio: "audio",
  blockquote: "blockquote",
  caption: "caption",
  figcaption: "caption",
  td: "cell",
  dd: "definition",
  details: "details",
  figure: "figure",
  header: "header",
  h1: "heading1",
  h2: "heading2",
  h3: "heading3",
  h4: "heading4",
  h5: "heading5",
  h6: "heading6",
  img: "image",
  ul: "list",
  ol: "list",
  li: "listItem",
  main: "main",
  math: "math",
  nav: "navigation",
  p: "paragraph",
  pre: "preformatted",
  tr: "row",
  section: "section",
  hr: "separator",
  summary: "summary",
  table: "table",
  dfn: "term",
  dt: "term",
  video: "video",
  svg: "image"
};
function qt(t) {
  const e = [], n = (c) => {
    e.includes(c) || e.push(c);
  }, r = [];
  let i = !1;
  const s = t.getAttribute("role");
  if (s)
    for (const c of s.split(/\s+/).filter(Boolean))
      if ((c === "presentation" || c === "none") && (i = !0), c === "heading") {
        let l = 2;
        const d = parseInt(t.getAttribute("aria-level") ?? "", 10);
        Number.isFinite(d) && d >= 1 && (l = Math.min(d, 6)), r.push(fc[l - 1]);
      } else ur[c] && r.push(ur[c]);
  const o = t.getAttribute("epub:type");
  if (o)
    for (const c of o.split(/\s+/).filter(Boolean)) {
      const l = pc[c];
      l && r.push(l);
    }
  if (i)
    return ["presentation"];
  const a = t.tagName.toLowerCase();
  if (a === "body")
    n("body");
  else if (a === "th")
    switch (t.getAttribute("scope")) {
      case "col":
        n("columnheader");
        break;
      case "row":
        n("rowheader");
        break;
      default:
        n("cell");
    }
  else {
    const c = mc[a];
    c && n(c);
  }
  for (const c of r) n(c);
  return e;
}
function hr(t) {
  return !!(t.getAttribute("aria-hidden") === "true" || t.hasAttribute("hidden"));
}
function Xt(t) {
  let e = "";
  const n = (r) => {
    r.nodeType === 3 && (e += r.nodeValue ?? "");
    for (let i = r.firstChild; i; i = i.nextSibling) n(i);
  };
  return n(t), e;
}
function Je(t) {
  return qe(Xt(t), !0).trim();
}
function yc(t) {
  if (hr(t))
    return [null, !1];
  const e = (t.getAttribute("aria-labelledby") ?? "").trim();
  if (e) {
    const s = [...new Set(e.split(/\s+/).filter(Boolean))], o = t.ownerDocument, a = s.map((c) => o.getElementById(c)).filter((c) => c !== null);
    if (a.length > 0) {
      let c = "";
      a.forEach((d, u) => {
        if (hr(d)) return;
        const g = d.getAttribute("aria-label");
        c += g || Xt(d), u < a.length - 1 && (c += " ");
      });
      const l = qe(c, !0).trim();
      if (l !== "")
        return [{ language: "", plain: l }, !0];
    }
  }
  const n = (t.getAttribute("aria-label") ?? "").trim();
  if (n)
    return [{ language: "", plain: n }, !0];
  const r = (t.getAttribute("aria-describedby") ?? "").trim();
  if (r) {
    const o = [...new Set(r.split(/\s+/).filter(Boolean))].map((a) => t.ownerDocument.getElementById(a)).filter((a) => a !== null);
    if (o.length > 0) {
      const a = o.map((l) => Xt(l)).join(" "), c = qe(a, !0).trim();
      if (c !== "")
        return [{ language: "", plain: c }, !0];
    }
  }
  const i = t.tagName.toLowerCase();
  if (i === "img") {
    const s = (t.getAttribute("alt") ?? "").trim();
    if (s) return [{ language: "", plain: s }, !0];
    const o = (t.getAttribute("title") ?? "").trim();
    if (o) return [{ language: "", plain: o }, !0];
  } else if (i === "svg") {
    const s = t.querySelector(":scope > title");
    if (s) {
      const o = Je(s);
      if (o) return [{ language: "", plain: o }, !0];
    }
  } else if (i === "math") {
    const s = (t.getAttribute("alttext") ?? "").trim();
    if (s) return [{ language: "", plain: s }, !0];
  }
  return [null, !0];
}
const bc = {
  em: ["emphasis"],
  b: ["emphasis"],
  i: ["emphasis", { level: "reduced" }],
  strong: ["emphasis", { level: "strong" }],
  br: ["break"]
};
function vc(t) {
  return bc[t] ?? ["", void 0];
}
const wc = /* @__PURE__ */ new Set([
  "script",
  "style",
  "template",
  "noscript",
  "textarea",
  "select",
  "datalist",
  "iframe",
  // Ruby annotations would duplicate the base text when read aloud
  "rt",
  "rp",
  "rtc"
]);
function Zt(t) {
  return !t.audioref && !t.imgref && !t.textref && !t.videoref && (!t.text || De(t.text)) && !(t.children && t.children.length > 0) && !t.description;
}
function Sc(t) {
  return !t.audioref && !t.imgref && !t.textref && !t.videoref && (!t.text || De(t.text)) && !!(t.children && t.children.length > 0) && !(t.role && t.role.length > 0) && !t.id;
}
function kc(t) {
  return !(t.role && t.role.length > 0) && !t.id;
}
class Ge {
  el;
  object = {};
  children = [];
  noText = !1;
  finalize() {
    const e = this.object, n = [];
    for (const r of this.children) {
      const i = r.finalize();
      if (!Zt(i)) {
        if (Sc(i)) {
          n.push(...i.children ?? []);
          continue;
        }
        n.push(i);
      }
    }
    if (n.length > 0 && (e.children = n), (!e.text || De(e.text)) && e.children?.length === 1) {
      const r = e.children[0];
      kc(r) && (r.text && (e.text = r.text), r.textref && (e.textref = r.textref), r.imgref && (e.imgref = r.imgref), r.audioref && (e.audioref = r.audioref), r.videoref && (e.videoref = r.videoref), e.children = r.children);
    }
    return e;
  }
}
function Yt(t) {
  const e = {};
  t.id && (e.id = t.id), t.textref && (e.textref = t.textref), t.imgref && (e.imgref = t.imgref), t.audioref && (e.audioref = t.audioref), t.videoref && (e.videoref = t.videoref);
  const n = Kl(t.text);
  return n !== void 0 && (e.text = n), t.role && t.role.length > 0 && (e.role = t.role), t.children && t.children.length > 0 && (e.children = t.children.map(Yt)), t.description && (e.description = t.description), e;
}
function hi(t) {
  const e = {};
  return t.id && (e.id = t.id), t.textref && (e.textref = t.textref), t.imgref && (e.imgref = t.imgref), t.audioref && (e.audioref = t.audioref), t.videoref && (e.videoref = t.videoref), t.role && (e.role = t.role), t.description && (e.description = t.description), typeof t.text == "string" ? e.text = { plain: t.text, ssml: "", language: "" } : t.text && (e.text = { plain: t.text.plain ?? "", ssml: t.text.ssml ?? "", language: t.text.language }), t.children && (e.children = t.children.map(hi)), e;
}
const xc = 1;
function dr(t) {
  for (let e = t; e; e = e.parentElement) {
    const n = e.getAttribute("xml:lang");
    if (n) return n;
    const r = e.getAttribute("lang");
    if (r) return r;
  }
  return "";
}
function Ec(t) {
  for (let e = t.firstChild; e; e = e.nextSibling)
    if (e.nodeType === xc) return !0;
  return !1;
}
function gr(t, e) {
  for (let n = e; n; n = n.parentElement)
    if (n === t) return !0;
  return !1;
}
function Cc(t) {
  const e = t.slice(0, 500);
  return /<\?xml\b/.test(e) || /xmlns:epub=/.test(e) || /DOCTYPE\s+html\s+PUBLIC\s+"-\/\/W3C\/\/DTD XHTML/i.test(e) ? "application/xhtml+xml" : "text/html";
}
const Ac = 3, Tc = 1, Oc = /* @__PURE__ */ new Set([
  "object",
  "base",
  "font",
  "tt",
  "i",
  "b",
  "u",
  "big",
  "small",
  "em",
  "strong",
  "dfn",
  "code",
  "samp",
  "kbd",
  "var",
  "cite",
  "abbr",
  "time",
  "acronym",
  "mark",
  "ruby",
  "rt",
  "rp",
  "rtc",
  "a",
  "img",
  "br",
  "wbr",
  "map",
  "q",
  "sub",
  "sup",
  "bdo",
  "iframe",
  "embed",
  "span",
  "input",
  "select",
  "textarea",
  "label",
  "button",
  "optgroup",
  "option",
  "legend",
  "datalist",
  "keygen",
  "output",
  "progress",
  "meter",
  "area",
  "param",
  "source",
  "track",
  "summary",
  "command",
  "basefont",
  "bgsound",
  "menuitem",
  "data",
  "bdi",
  "s",
  "strike",
  "nobr",
  "rb"
]), Rc = /* @__PURE__ */ new Set(["summary", "dfn", "span"]);
function fr(t, e) {
  return Rc.has(t) && e.length > 0 ? !0 : !Oc.has(t);
}
class pn {
  xmlParsed;
  ids = /* @__PURE__ */ new Map();
  suppressed = /* @__PURE__ */ new Set();
  idAlloc = { claimed: /* @__PURE__ */ new Set(), counters: /* @__PURE__ */ new Map() };
  noterefDepth = 0;
  allowNode = null;
  root = new Ge();
  current = this.root;
  segments = [];
  textAcc = "";
  currentCtx = { lang: "", tag: "" };
  flowEndsWithSpace = !0;
  pendingChildren = [];
  constructor(e) {
    this.xmlParsed = e;
  }
  allocateId(e) {
    for (; ; ) {
      const n = (this.idAlloc.counters.get(e) ?? 0) + 1;
      this.idAlloc.counters.set(e, n);
      const r = `${e}${n}`;
      if (!(this.ids.has(r) || this.idAlloc.claimed.has(r)))
        return this.idAlloc.claimed.add(r), r;
    }
  }
  claimId(e) {
    return this.idAlloc.claimed.has(e) ? !1 : (this.idAlloc.claimed.add(e), !0);
  }
  prescan(e) {
    const n = [], r = (i, s) => {
      const o = i.getAttribute("id");
      if (o && !this.ids.has(o) && this.ids.set(o, i), s = s || i.getAttribute("aria-hidden") === "true" || i.hasAttribute("hidden"), !s && i.tagName.toLowerCase() === "a" && qt(i).includes("noteref")) {
        const c = i.getAttribute("href") ?? "";
        c.startsWith("#") && n.push({ id: c.slice(1), ref: i });
      }
      for (let a = i.firstElementChild; a; a = a.nextElementSibling) r(a, s);
    };
    r(e, !1);
    for (const i of n) {
      const s = this.ids.get(i.id);
      s && (gr(s, i.ref) || this.suppressed.add(s));
    }
  }
  // Converts root itself — used when root is meaningful content in its own
  // right (e.g. a footnote element referenced by a noteref), not just a
  // structural container.
  convert(e) {
    this.prescan(e), this.walk(e);
  }
  // Converts root's children — used at the top level, where root is always
  // just the document's <body> (or a fragment's implicit wrapper), never
  // content of its own.
  convertChildren(e) {
    this.prescan(e);
    for (let n = e.firstChild; n; n = n.nextSibling) this.walk(n);
    this.flushText();
  }
  result() {
    const e = this.root.finalize();
    return !e.children || e.children.length === 0 ? Zt(e) ? [] : [Yt(e)] : e.children.map(Yt);
  }
  descend(e) {
    const n = new Ge();
    n.el = e, n.noText = this.current.noText, this.current.children.push(n), this.current = n;
  }
  appendChild(e) {
    e.noText = this.current.noText, this.current.children.push(e);
  }
  walk(e) {
    if (e.nodeType === Ac) {
      this.text(e);
      return;
    }
    if (e.nodeType !== Tc) return;
    const n = e, r = this.current, i = this.head(n);
    if (!i)
      for (let s = n.firstChild; s; s = s.nextSibling) this.walk(s);
    this.tail(n, i, r);
  }
  // Returns true if children should not be traversed (already handled
  // wholesale, invisible, or explicitly skipped).
  head(e) {
    const n = e.tagName.toLowerCase();
    if (wc.has(n) || this.suppressed.has(e) && e !== this.allowNode) return !0;
    const [r, i] = yc(e);
    if (!i && e !== this.allowNode) return !0;
    const s = qt(e);
    if ((n === "img" || n === "svg") && (s.includes("presentation") || r === null && e.hasAttribute("alt") && e.getAttribute("alt").trim() === ""))
      return !0;
    if (n === "br")
      return this.current.noText || (this.closeSegment(), this.segments.push({ kind: "break" }), this.flowEndsWithSpace = !0), !0;
    if (s.includes("pagebreak"))
      return !this.pagebreak(e, r, s);
    if (n === "a" && s.includes("noteref") && e.getAttribute("href"))
      return this.noteref(e, s), !0;
    if (n === "a" && e.getAttribute("href"))
      return this.link(e, s), !0;
    if (n === "img") {
      const c = { role: s }, l = e.getAttribute("src");
      return l && (c.imgref = l), r && (c.description = r.plain), this.placeholder(e, "image", c), !0;
    }
    if (n === "audio" || n === "video") {
      const c = { role: s };
      let l = e.getAttribute("src");
      if (!l) {
        const d = e.querySelector(":scope > source[src]");
        d && (l = d.getAttribute("src"));
      }
      return n === "audio" ? l && (c.audioref = l) : l && (c.videoref = l), r && (c.description = r.plain), this.placeholder(e, n, c), !0;
    }
    if (s.includes("image") || s.includes("math")) {
      const c = { role: s };
      return r && (c.description = r.plain), this.placeholder(e, s.includes("math") ? "math" : "image", c), !0;
    }
    if (!fr(n, s))
      return !1;
    this.flushText(), this.descend(e);
    const o = this.current.object;
    s.length > 0 && (o.role = s), r && (o.description = r.plain, s.includes("figure") && (this.current.noText = !0));
    const a = e.getAttribute("id");
    return a && (o.id = a), !1;
  }
  tail(e, n, r) {
    if (n) return;
    const i = e.tagName.toLowerCase(), s = qt(e);
    fr(i, s) && (this.flushText(), this.current = r);
  }
  text(e) {
    if (this.current.noText) return;
    const n = e.nodeValue ?? "";
    if (/^\s*$/.test(n)) {
      (this.textAcc.length > 0 || this.segments.length > 0) && (this.textAcc += qe(n, this.flowEndsWithSpace), this.updateFlowSpace());
      return;
    }
    const r = this.textContext(e);
    Jl(r, this.currentCtx) || (this.closeSegment(), this.currentCtx = r), this.textAcc += qe(n, this.flowEndsWithSpace), this.updateFlowSpace();
  }
  textContext(e) {
    const n = { lang: dr(e.parentElement), tag: "" };
    for (let r = e.parentElement; r && r !== this.current.el; r = r.parentElement) {
      const [i, s] = vc(r.tagName.toLowerCase());
      if (i && i !== "break") {
        n.tag = i, n.attrs = s;
        break;
      }
    }
    return n;
  }
  updateFlowSpace() {
    this.textAcc.length > 0 && (this.flowEndsWithSpace = this.textAcc.endsWith(" "));
  }
  closeSegment() {
    this.textAcc.length !== 0 && (this.segments.push({ kind: "text", text: this.textAcc, ctx: this.currentCtx }), this.textAcc = "");
  }
  resetFlow() {
    this.segments = [], this.textAcc = "", this.currentCtx = { lang: "", tag: "" }, this.flowEndsWithSpace = !0, this.pendingChildren = [];
  }
  placeholder(e, n, r, i) {
    if (Zt(r)) return;
    const s = new Ge();
    if (s.el = e, s.object = r, this.current.noText) {
      this.appendChild(s);
      return;
    }
    this.closeSegment(), this.pendingChildren.push(s), this.segments.push({
      kind: "placeholder",
      tag: n,
      child: s,
      candidateID: i ?? e.getAttribute("id") ?? void 0
    }), this.flowEndsWithSpace = !1;
  }
  pagebreak(e, n, r) {
    const i = { role: r }, s = (e.getAttribute("title") ?? "").trim();
    s ? i.text = { plain: s, ssml: "", language: "" } : n && (i.text = { plain: n.plain ?? "", ssml: n.ssml ?? "", language: n.language });
    const o = !!(i.text && !De(i.text)), a = !this.xmlParsed && (Ec(e) || o && e.firstChild !== null);
    if (!o && !a) {
      const l = Je(e);
      l && (i.text = { plain: l, ssml: "", language: "" });
    }
    const c = e.getAttribute("id");
    return c && (i.textref = `#${c}`), this.placeholder(e, "pagebreak", i), a;
  }
  noteref(e, n) {
    const r = { role: n }, i = Je(e);
    i && (r.text = { plain: i, ssml: "", language: "" });
    const s = e.getAttribute("href") ?? "";
    let o = e.getAttribute("id") ?? "";
    if (!o && s.startsWith("#") && (o = s.slice(1)), s.startsWith("#")) {
      const a = s.slice(1), c = this.ids.get(a);
      if (c && !gr(c, e) && this.noterefDepth < 3) {
        const l = new pn(this.xmlParsed);
        l.ids = this.ids, l.suppressed = this.suppressed, l.idAlloc = this.idAlloc, l.noterefDepth = this.noterefDepth + 1, l.allowNode = c, l.convert(c);
        const d = l.result();
        d.length > 0 && (r.children = d.map((u) => {
          const g = hi(u);
          return delete g.id, g;
        }));
      }
    }
    !r.children && s && (r.children = [{ textref: s }]), this.placeholder(e, "noteref", r, o || void 0);
  }
  link(e, n) {
    const r = {};
    n.length > 0 && (r.role = n);
    const i = Je(e);
    i && (r.text = { plain: i, ssml: "", language: "" });
    const s = e.getAttribute("href");
    s && (r.textref = s), this.placeholder(e, n[0] ?? "link", r);
  }
  flushText() {
    this.closeSegment();
    let e = this.segments;
    const n = this.pendingChildren;
    if (this.resetFlow(), e.length === 0) return;
    for (; e.length > 0; ) {
      const m = e[0];
      if (m.kind === "break") {
        e = e.slice(1);
        continue;
      }
      if (m.kind === "text") {
        const p = m.text.replace(/^\s+/, "");
        if (p === "") {
          e = e.slice(1);
          continue;
        }
        e = [{ ...m, text: p }, ...e.slice(1)];
      }
      break;
    }
    for (; e.length > 0; ) {
      const m = e[e.length - 1];
      if (m.kind === "break") {
        e = e.slice(0, -1);
        continue;
      }
      if (m.kind === "text") {
        const p = m.text.replace(/\s+$/, "");
        if (p === "") {
          e = e.slice(0, -1);
          continue;
        }
        e = [...e.slice(0, -1), { ...m, text: p }];
      }
      break;
    }
    if (!e.some((m) => m.kind === "text" && m.text.trim() !== "")) {
      for (const m of n) this.appendChild(m);
      return;
    }
    const i = [];
    for (const m of e)
      if (m.kind === "text" && m.text.trim() !== "") {
        const p = m.ctx.lang;
        i.includes(p) || i.push(p);
      }
    let s = dr(this.current.el ?? null);
    i.length === 1 && i[0] !== "" && (s = i[0]);
    let o = !1;
    for (const m of e)
      if (m.kind !== "text" || m.ctx.tag !== "" || m.ctx.lang !== s) {
        o = !0;
        break;
      }
    if (o && s === "" && (s = "en"), o)
      for (const m of e) {
        if (m.kind !== "placeholder") continue;
        let p = m.candidateID;
        (!p || !this.claimId(p)) && (p = this.allocateId(m.tag)), m.child.object.id = p;
      }
    let a = "", c = !1, l = !1, d = !1, u = !1;
    for (const m of e)
      if (m.kind === "text") {
        const p = m.text.startsWith(" "), w = m.text.replace(/^ +| +$/g, "");
        if (w === "") {
          u = !0;
          continue;
        }
        let E = !1;
        if (a.length > 0) {
          const x = c || u || p;
          l ? E = !0 : d ? E = x && !gt(w) : E = x;
        }
        E && (a += " "), a += w, c = m.text.endsWith(" "), l = !1, d = !1, u = !1;
      } else m.kind === "break" ? l = !0 : m.kind === "placeholder" && (d = !0);
    const g = e.some((m) => m.kind === "placeholder"), f = {
      plain: o && !g ? "" : a.trim(),
      ssml: "",
      language: s
    };
    if (o) {
      let m = "";
      for (const p of e)
        if (p.kind === "text") {
          let w = p.ctx.tag, E = p.ctx.attrs;
          if (p.ctx.lang !== s && p.ctx.lang !== "" && (w = "lang", E = void 0), w) {
            m += `<${w}`;
            for (const [x, R] of Object.entries(E ?? {}))
              m += ` ${x}="${Pt(R)}"`;
            p.ctx.lang !== s && p.ctx.lang !== "" && (m += ` xml:lang="${Pt(p.ctx.lang)}"`), m += `>${st(p.text)}</${w}>`;
          } else
            m += st(p.text);
        } else p.kind === "break" ? m += "<break/>" : p.kind === "placeholder" && (m += `<readium:${p.tag} id="${Pt(p.child.object.id)}" />`);
      f.ssml = m;
    }
    const y = new Ge();
    y.object = { text: f };
    for (const m of n)
      y.children.push(m);
    this.appendChild(y);
  }
}
const Ic = /<body[\s>]/i;
function Nc(t, e) {
  const n = e ?? Cc(t), r = new DOMParser().parseFromString(t, n), i = new pn(n === "application/xhtml+xml"), s = r.querySelector("body");
  return s && !Ic.test(t) ? i.convertChildren(s) : i.convert(s ?? r.documentElement), i.result();
}
function Hc(t, e) {
  return { guided: Nc(t, e) };
}
export {
  Nl as BUILTIN_DECORATION_TYPES,
  Fl as BooleanPreference,
  Ul as DecorationController,
  Tl as DecorationLayout,
  C as DecorationStyleType,
  Al as DecorationWidth,
  Il as Decorator,
  _l as DirectCommsChannel,
  Dl as DirectCommsFrame,
  $l as DirectCommsHost,
  He as EnumPreference,
  _c as FallbackEngineProvider,
  Go as FallbackSpeechEngine,
  et as Locator,
  G as LocatorLocations,
  ft as LocatorText,
  pt as Preference,
  We as RangePreference,
  jl as ReadiumSpeechDecorationController,
  Fc as ReadiumSpeechNavigator,
  zc as ReadiumSpeechProviderRegistry,
  Ml as SpeechDefaults,
  Le as SpeechPreferences,
  sr as SpeechPreferencesEditor,
  Dr as SpeechServerAudioDecodeError,
  Mo as SpeechServerEngine,
  qc as SpeechServerEngineProvider,
  Ne as SpeechServerError,
  $r as SpeechServerNetworkError,
  _r as SpeechServerStallError,
  ar as SpeechSettings,
  ir as StringArrayPreference,
  Mn as WebSpeechEngine,
  Lc as WebSpeechEngineProvider,
  I as WebSpeechVoiceManager,
  cc as blockLevelRoles,
  Re as chineseVariantMap,
  Oo as chunkPlainText,
  Io as chunkSsmlText,
  Gl as contextualizedAtVerbosity,
  zl as createLocator,
  ql as decorationsEqual,
  Zl as defaultAnnouncements,
  Mc as extractUtterances,
  Fo as isRecoverableFailure,
  Hc as makeGnd,
  qr as mapServerVoice,
  Po as mimeTypeForFormat,
  Nc as parseMarkup,
  tr as resolveDecorationForWire,
  Uo as selectBitrate,
  _o as selectFormat,
  Vc as setupDecorations,
  Wl as skippableAtVerbosity,
  jc as skippableRoles,
  Pl as supportsDecorationStyle,
  Oe as toSpeechServerError
};
