const I = (n) => {
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
}, G = {
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
}, Vt = /* @__PURE__ */ new Map(), co = /* @__PURE__ */ Object.assign({ "../../json/ar.json": () => import("./ar-BGKtJRyt.js"), "../../json/bg.json": () => import("./bg-D9Q1JriY.js"), "../../json/bho.json": () => import("./bho-CpuLBMN3.js"), "../../json/bn.json": () => import("./bn-Bpn_lzoe.js"), "../../json/ca.json": () => import("./ca-5hzouNcE.js"), "../../json/cmn.json": () => import("./cmn-DlnYMCd8.js"), "../../json/cs.json": () => import("./cs-CDpMkMNO.js"), "../../json/da.json": () => import("./da-XWCfWAwB.js"), "../../json/de.json": () => import("./de-DU0USiOh.js"), "../../json/el.json": () => import("./el-ClBwbIAW.js"), "../../json/en.json": () => import("./en-l3wcpTw3.js"), "../../json/es.json": () => import("./es-DwOFJY07.js"), "../../json/eu.json": () => import("./eu-DxWirHU-.js"), "../../json/fa.json": () => import("./fa-Ml9KtIw1.js"), "../../json/fi.json": () => import("./fi-Dk-5Fhhl.js"), "../../json/fr.json": () => import("./fr-MfhjukJ4.js"), "../../json/gl.json": () => import("./gl-DwtzWds9.js"), "../../json/he.json": () => import("./he-CfajFNE_.js"), "../../json/hi.json": () => import("./hi-pv2ttBoh.js"), "../../json/hr.json": () => import("./hr-MRApcEKR.js"), "../../json/hu.json": () => import("./hu-DGRDZdHH.js"), "../../json/id.json": () => import("./id-DZUuUiTG.js"), "../../json/it.json": () => import("./it-DJUYnjyj.js"), "../../json/ja.json": () => import("./ja-BpFcZRMu.js"), "../../json/kk.json": () => import("./kk-C480t1iH.js"), "../../json/kn.json": () => import("./kn-BVqs26qv.js"), "../../json/ko.json": () => import("./ko-TNoPZd6N.js"), "../../json/mr.json": () => import("./mr-DstAHTvT.js"), "../../json/ms.json": () => import("./ms-BceBSD-j.js"), "../../json/nb.json": () => import("./nb-CwPbwG-i.js"), "../../json/nl.json": () => import("./nl-BmW-Dmw5.js"), "../../json/pl.json": () => import("./pl-CH8qoDu8.js"), "../../json/pt.json": () => import("./pt-CjCENn24.js"), "../../json/ro.json": () => import("./ro-BlJN7qkA.js"), "../../json/ru.json": () => import("./ru-udzq1D5e.js"), "../../json/sk.json": () => import("./sk-VAEHsTWJ.js"), "../../json/sl.json": () => import("./sl-DaZQ1gp0.js"), "../../json/sv.json": () => import("./sv-CicHwXe4.js"), "../../json/ta.json": () => import("./ta-CvpRY89g.js"), "../../json/te.json": () => import("./te-D5TcdW9V.js"), "../../json/th.json": () => import("./th-CYakoFVa.js"), "../../json/tr.json": () => import("./tr-BfYrcAz7.js"), "../../json/uk.json": () => import("./uk-BVs6lQbX.js"), "../../json/vi.json": () => import("./vi-DP1xN9KL.js"), "../../json/wuu.json": () => import("./wuu-C6uQvT6g.js"), "../../json/yue.json": () => import("./yue-C8kEWdfv.js") });
async function uo(n) {
  try {
    const e = n.split("-")[0], t = co[`../../json/${e}.json`];
    if (!t)
      throw new Error(`No voice data found for language: ${n}`);
    const s = (await t()).default;
    return {
      ...s,
      voices: s.voices.map(go)
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
function Gn(n) {
  return Vt.has(n) || Vt.set(n, uo(n)), Vt.get(n);
}
const ho = ["veryLow", "low", "normal", "high", "veryHigh"], fo = ["android", "apple"], go = (n) => ({
  ...n,
  quality: n.quality?.filter((e) => ho.includes(e)),
  localizedName: n.localizedName && fo.includes(n.localizedName) ? n.localizedName : void 0
}), Ve = {
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
}, U = (n) => {
  if (!n) return "";
  let e = n.toLowerCase().replace(/_/g, "-");
  if (/\w{2,3}-\w{2,3}/.test(e)) {
    const [t, i] = e.split("-");
    e = `${t.toLowerCase()}-${i.toUpperCase()}`;
  }
  return Ve[e] || e;
}, tn = async (n) => {
  if (!n) return [];
  try {
    const e = U(n);
    try {
      const i = await Gn(e);
      if (i?.voices?.length)
        return i.voices;
    } catch (i) {
      console.warn(`Failed to load voices for ${e}:`, i);
    }
    const [t] = I(e);
    if (t !== e)
      try {
        const i = await Gn(t);
        if (i?.voices?.length)
          return i.voices;
      } catch (i) {
        console.warn(`Failed to load voices for base language ${t}:`, i);
      }
    return [];
  } catch (e) {
    return console.error(`Error in getVoices for ${n}:`, e), [];
  }
}, nn = (n, e) => {
  try {
    return new Intl.DisplayNames(
      e ? [e] : [],
      { type: "language", languageDisplay: "standard" }
    ).of(n) || n.toUpperCase();
  } catch {
    return n.toUpperCase();
  }
}, Xn = (n) => {
  if (!n) return "";
  try {
    const e = U(n), t = G[e];
    if (t?.testUtterance)
      return t.testUtterance;
    if (e in Ve) {
      const s = Ve[e];
      if (s && G[s]?.testUtterance)
        return G[s].testUtterance;
    }
    const [i] = I(e);
    return i !== e && G[i]?.testUtterance ? G[i].testUtterance : "";
  } catch (e) {
    return console.error(`Error in getTestUtterance for ${n}:`, e), "";
  }
}, Dt = (n) => {
  if (!n) return "";
  try {
    const e = U(n), t = G[e];
    if (t?.defaultRegion)
      return `${e}-${t.defaultRegion}`;
    if (e in Ve) {
      const s = Ve[e];
      if (s) {
        const r = G[s];
        if (r?.defaultRegion)
          return `${s}-${r.defaultRegion}`;
      }
    }
    const [i] = I(e);
    if (i !== e) {
      const s = G[i];
      if (s?.defaultRegion)
        return `${i}-${s.defaultRegion}`;
    }
    return "";
  } catch (e) {
    return console.error(`Failed to get default region for ${n}:`, e), "";
  }
}, Ft = (n) => {
  if (!n?.length) return [];
  const e = /* @__PURE__ */ new Set(), t = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  for (const [s, r] of n.entries()) {
    if (!r) continue;
    const o = U(r), [a, l] = I(o);
    l && (e.add(l), i.has(l) || i.set(l, s)), t.has(a) || t.set(a, /* @__PURE__ */ new Set()), l && t.get(a).add(l);
  }
  return Array.from(t.entries()).map(([s, r]) => {
    const o = new Set(
      G[s]?.availableRegions || []
    ), a = Array.from(r), l = Array.from(e).filter(
      (u) => o.has(u) && !a.includes(u)
    ), c = Array.from(/* @__PURE__ */ new Set([...a, ...l])).sort((u, h) => {
      const d = i.get(u) ?? Number.MAX_SAFE_INTEGER, f = i.get(h) ?? Number.MAX_SAFE_INTEGER;
      return d - f;
    });
    if (c.length === 0) {
      const u = Dt(s), [, h] = I(u);
      h && c.push(h);
    }
    return {
      baseLang: s,
      regions: c
    };
  });
}, ve = async (n) => {
  const e = /* @__PURE__ */ new Map();
  for (const i of n) {
    if (i.source !== "json") continue;
    const [s] = I(i.language);
    e.has(s) || e.set(s, []), e.get(s).push(i);
  }
  const t = /* @__PURE__ */ new Map();
  for (const [i, s] of e.entries()) {
    const r = /* @__PURE__ */ new Map(), o = await tn(i), a = /* @__PURE__ */ new Map();
    o.forEach((l, c) => {
      a.set(l.name.toLowerCase(), c), l.altNames?.forEach((u) => {
        a.set(u.toLowerCase(), c);
      });
    });
    for (const l of s) {
      const c = l.name.toLowerCase(), u = a.get(c);
      u !== void 0 && r.set(l.name, u);
    }
    r.size > 0 && t.set(i, r);
  }
  return t;
}, po = {
  veryLow: 1,
  low: 2,
  normal: 3,
  high: 4,
  veryHigh: 5
}, pt = (n) => n ? po[n] ?? 0 : 0, re = (n, e, t, i) => {
  const s = pt(n.quality), r = pt(e.quality);
  if (t && i && n.source === "json" && e.source === "json") {
    const o = t.get(i);
    if (o) {
      const a = o.get(n.name), l = o.get(e.name);
      if (a !== void 0 && l !== void 0)
        return a - l;
    }
  }
  return r !== s ? r - s : n.name.localeCompare(e.name);
}, It = (n, e) => {
  const t = new Map(e.map((r) => [r.baseLang, r])), i = /* @__PURE__ */ new Map(), s = [];
  for (const r of n) {
    const [o] = I(r.language);
    t.get(o) ? (i.has(o) || i.set(o, []), i.get(o).push(r)) : s.push(r);
  }
  return { voicesByLang: i, otherLangVoices: s };
}, ws = (n, e, t, i) => {
  const [, s] = I(n.language), [, r] = I(e.language), o = s && t.regions.includes(s), a = r && t.regions.includes(r);
  if (o && a) {
    const d = t.regions.indexOf(s), f = t.regions.indexOf(r);
    return d === f ? re(n, e, i, t.baseLang) : d - f;
  }
  if (o) return -1;
  if (a) return 1;
  const l = Dt(t.baseLang), [, c] = I(l), u = !!c && s === c, h = !!c && r === c;
  if (u && !h) return -1;
  if (!u && h) return 1;
  if (s && r) {
    const d = s.localeCompare(r);
    return d !== 0 ? d : re(n, e, i, t.baseLang);
  }
  return s ? -1 : r ? 1 : re(n, e, i, t.baseLang);
}, mo = async (n, e, t) => {
  const i = t ?? await ve(n);
  n.sort((s, r) => ws(s, r, e, i));
}, xs = (n, e, t) => {
  const [i] = I(n.language), [s] = I(e.language), r = nn(i).toLowerCase(), o = nn(s).toLowerCase(), a = r.localeCompare(o);
  if (a !== 0)
    return a;
  if (i === s) {
    const l = Dt(i), [, c] = I(n.language), [, u] = I(e.language), h = l && c === l.split("-")[1], d = l && u === l.split("-")[1];
    if (h && !d) return -1;
    if (!h && d) return 1;
    if (c && u) {
      const f = c.localeCompare(u);
      if (f !== 0)
        return f;
    }
    return c && !u ? -1 : !c && u ? 1 : re(n, e, t, i);
  }
  return re(n, e, t, i);
}, sn = async (n, e) => {
  const t = e ?? await ve(n);
  n.sort((i, s) => xs(i, s, t));
}, So = async (n, e) => {
  if (!e?.length) return [];
  const t = Ft(n || []), { voicesByLang: i, otherLangVoices: s } = It(e, t), r = await ve(e), o = [];
  for (const a of t) {
    const l = i.get(a.baseLang);
    l && (await mo(l, a, r), o.push(...l));
  }
  return await sn(s, r), o.push(...s), o;
}, yo = async (n, e) => {
  if (!e.length) return null;
  const [t] = Ft([n]), { voicesByLang: i, otherLangVoices: s } = It(e, [t]), r = i.get(t.baseLang), o = r?.length ? r : s, a = await ve(e), l = r?.length ? (c, u) => ws(c, u, t, a) : (c, u) => xs(c, u, a);
  return o.reduce((c, u) => l(u, c) < 0 ? u : c);
}, Es = (n, e) => {
  const t = n.filter((i) => i.controls?.boundary !== !1 === e);
  return t.length > 0 ? t : n;
}, bo = [{ name: "Albert", nativeID: ["com.apple.speech.synthesis.voice.Albert"], note: "This novelty voice is part of a pack preloaded by Apple.", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Bad News", nativeID: ["com.apple.speech.synthesis.voice.BadNews"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Mauvaises nouvelles", "Malas noticias", "Brutte notizie"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Bahh", nativeID: ["com.apple.speech.synthesis.voice.Bahh"], note: "This novelty voice is part of a pack preloaded by Apple.", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Bells", nativeID: ["com.apple.speech.synthesis.voice.Bells"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Cloches", "Campanas", "Campane"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Boing", nativeID: ["com.apple.speech.synthesis.voice.Boing"], note: "This novelty voice is part of a pack preloaded by Apple.", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Bubbles", nativeID: ["com.apple.speech.synthesis.voice.Bubbles"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Bulles", "Burbujas", "Bollicine"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Cellos", nativeID: ["com.apple.speech.synthesis.voice.Cellos"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Violoncelles", "Violonchelos", "Violoncelli"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Good News", nativeID: ["com.apple.speech.synthesis.voice.GoodNews"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Bonnes nouvelles", "Buenas noticias", "Buone notizie"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Jester", nativeID: ["com.apple.speech.synthesis.voice.Hysterical"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Bouffon", "Bufón", "Giullare"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Organ", nativeID: ["com.apple.speech.synthesis.voice.Organ"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Orgue", "Órgano", "Organo"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Superstar", nativeID: ["com.apple.speech.synthesis.voice.Princess"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Superestrella"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Trinoids", nativeID: ["com.apple.speech.synthesis.voice.Trinoids"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Trinoïdes"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Whisper", nativeID: ["com.apple.speech.synthesis.voice.Whisper"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Murmure", "Susurro", "Sussurro"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Wobble", nativeID: ["com.apple.speech.synthesis.voice.Deranged"], note: "This novelty voice is part of a pack preloaded by Apple.", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Zarvox", nativeID: ["com.apple.speech.synthesis.voice.Zarvox"], note: "This novelty voice is part of a pack preloaded by Apple.", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }], vo = {
  voices: bo
}, wo = [{ name: "Eddy", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Flo", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Grandma", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Grandpa", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Jacques", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Reed", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Rocko", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Sandy", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Shelley", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Fred", language: "en-US", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Junior", language: "en-US", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Kathy", language: "en-US", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Ralph", language: "en-US", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "eSpeak Arabic", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ar", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Bulgarian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "bg", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Bengali", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "bn", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Catalan", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ca", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Chinese (Mandarin, latin as English)", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "cmn", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Czech", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "cs", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Danish", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "da", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak German", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "de", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Greek", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "el", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Spanish (Spain)", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "es", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Estonian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "et", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Finnish", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "fi", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Gujarati", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "gu", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Croatian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "hr", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Hungarian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "hu", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Indonesian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "id", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Italian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "it", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Kannada", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "kn", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Korean", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ko", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Lithuanian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "lt", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Latvian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "lv", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Malayalm", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ml", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Marathi", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "mr", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Malay", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ms", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Norwegian Bokmål", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "nb", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Polish", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "pl", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Portuguese (Brazil)", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "pt-br", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Romanian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ro", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Russian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ru", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Slovak", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "sk", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Slovenian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "sl", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Serbian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "sv", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Swedish", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "sv", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Swahili", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "sw", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Tamil", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ta", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Telugu", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "te", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Turkish", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "tr", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Vietnamese (Northern)", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "vi", os: ["ChromeOS"], preloaded: !0 }], xo = {
  voices: wo
}, Eo = vo, Co = xo, rn = (n, e) => Eo.voices.some(
  (t) => n.includes(t.name) || e && t.nativeID?.some((i) => e.includes(i)) || t.altNames?.some((i) => n.includes(i))
), on = (n, e) => Co.voices.some(
  (t) => n.includes(t.name)
) || e === "veryLow", Jn = (n) => n?.length ? n.filter((e) => !(e.isNovelty || rn(e.name, e.voiceURI))) : [], Yn = (n) => n?.length ? n.filter((e) => !on(e.name, e.quality)) : [], ko = { ar: { normal: "محسن", high: "استثنائي" }, ca: { normal: "millorada", high: "prèmium" }, "cmn-CN": { normal: "优化音质", high: "高音质" }, "cmn-TW": { normal: "增強音質", high: "高音質" }, cs: { normal: "vylepšená verze", high: "prémiový" }, da: { normal: "forbedret", high: "høj kvalitet" }, de: { normal: "erweitert", high: "premium" }, el: { normal: "βελτιωμένη", high: "υψηλής ποιότητας" }, en: { normal: "Enhanced", high: "Premium" }, es: { normal: "mejorada", high: "premium" }, fi: { normal: "parannettu", high: "korkealaatuinen" }, fr: { normal: "premium", high: "de qualité" }, he: { normal: "משופר", high: "פרימיום" }, hi: { normal: "बेहतर", high: "प्रीमियम" }, hr: { normal: "poboljšani", high: "vrhunski" }, hu: { normal: "továbbfejlesztett", high: "prémium" }, id: { normal: "Ditingkatkan", high: "Premium" }, it: { normal: "ottimizzata", high: "premium" }, ja: { normal: "拡張", high: "プレミアム" }, ko: { normal: "고품질", high: "프리미엄" }, ms: { normal: "Dipertingkat", high: "Premium" }, nb: { normal: "forbedret", high: "premium" }, nl: { normal: "verbeterd", high: "premium" }, pl: { normal: "rozszerzony", high: "premium" }, pt: { normal: "melhorada", high: "premium" }, ro: { normal: "îmbunătățită", high: "premium" }, ru: { normal: "улучшенный", high: "высшее качество" }, sk: { normal: "vylepšený", high: "prémiový" }, sl: { normal: "izboljšano", high: "prvovrsten" }, sv: { normal: "förbättrad", high: "premium" }, th: { normal: "คุณภาพสูง", high: "คุณภาพสูง" }, tr: { normal: "Geliştirilmiş", high: "Yüksek Kaliteli" }, uk: { normal: "вдосконалений", high: "високої якості" }, vi: { normal: "Nâng cao", high: "Cao cấp" } }, Ro = {
  quality: ko
}, an = {
  apple: Ro.quality
  // android: androidQualities.quality
}, Ao = (n, e, t) => {
  if (!n) return;
  const i = Array.isArray(t) ? t : t ? [t] : [];
  for (const s of i)
    if (s && an[s]) {
      const r = an[s], o = I(e)[0], a = r[e] || r[o];
      if (a) {
        const l = n.toLowerCase(), { normal: c, high: u } = a;
        if (u && l.includes(u.toLowerCase()))
          return "high";
        if (c && l.includes(c.toLowerCase()))
          return "normal";
      }
    }
}, Oo = (n, e) => {
  const t = an[e];
  if (t)
    for (const [i, { high: s, normal: r }] of Object.entries(t)) {
      const o = s && n.some((l) => l.includes(s)), a = r && n.some((l) => l.includes(r));
      if (o && a)
        return i;
    }
}, No = {
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
}, Qn = (n) => {
  if (!n) return;
  const t = n.toLowerCase().split(/[._-]/);
  for (const i of Object.values(No))
    if (i.values.some((s) => t.includes(s)))
      return i.quality;
};
function To(n, e) {
  if (n.name === n.originalName) return n;
  if (e.name === e.originalName) return e;
  const t = [n.originalName, ...n.altNames || []], i = [e.originalName, ...e.altNames || []], s = t.findIndex((o) => i.includes(o)), r = i.findIndex((o) => t.includes(o));
  return s === -1 && r === -1 || s !== -1 && (r === -1 || s <= r) ? n : e;
}
function Do(n, e) {
  if (!n.altNames && !e.altNames)
    return !1;
  const t = n.originalName, i = e.originalName, s = n.altNames || [], r = e.altNames || [];
  return r.includes(t) || s.includes(i) ? !0 : s.filter((a) => r.includes(a)).length > 0;
}
class N {
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
    if (N.instance?.isInitialized) {
      const t = N.instance;
      return e?.languages && e.languages.length > 0 && await t.broadenLanguages(e.languages), t;
    }
    return N.initializationPromise || (N.initializationPromise = (async () => {
      try {
        const t = new N();
        N.instance = t, t.browserVoices = await t.getBrowserVoices(e?.maxTimeout, e?.interval), t.updateSystemLocale(t.browserVoices);
        let i = t.browserVoices;
        return e?.languages && e.languages.length > 0 ? (i = t.filterBrowserVoicesByLanguages(t.browserVoices, e.languages), t.scopedLanguages = N.toBaseLangSet(e.languages)) : t.scopedLanguages = null, t.voices = await t.parseToReadiumSpeechVoices(i), t.isInitialized = !0, t;
      } catch (t) {
        throw N.initializationPromise = null, console.error("Failed to initialize WebSpeechVoiceManager:", t), t;
      }
    })()), N.initializationPromise;
  }
  /**
   * Filter browser voices based on preferred languages
   * @private
   */
  filterBrowserVoicesByLanguages(e, t) {
    if (!t?.length) return e;
    const i = N.toBaseLangSet(t);
    return e.filter((s) => {
      if (!s?.lang) return !1;
      const r = U(s.lang), [o] = N.extractLangRegionFromBCP47(r);
      return i.has(o);
    });
  }
  /**
   * Extract base language codes (e.g. "en", "fr") from a list of BCP47 tags
   * @private
   */
  static toBaseLangSet(e) {
    return new Set(
      e.map((t) => {
        const i = U(t), [s] = N.extractLangRegionFromBCP47(i);
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
    const i = [...N.toBaseLangSet(e)].filter((a) => !this.scopedLanguages.has(a));
    if (i.length === 0) return;
    const s = i.filter((a) => this.broadenPromises.has(a)), r = i.filter((a) => !this.broadenPromises.has(a));
    let o;
    r.length > 0 && (o = (async () => {
      const a = this.filterBrowserVoicesByLanguages(this.browserVoices, r), l = await this.parseToReadiumSpeechVoices(a);
      this.voices = [...this.voices, ...l], r.forEach((c) => this.scopedLanguages.add(c)), r.forEach((c) => this.broadenPromises.delete(c));
    })(), r.forEach((a) => this.broadenPromises.set(a, o))), await Promise.all([
      ...o ? [o] : [],
      ...s.map((a) => this.broadenPromises.get(a))
    ]);
  }
  /**
   * Extract language and region from BCP47 language tag
   * @param lang - The BCP47 language tag (e.g., "en-US", "zh-CN")
   * @returns A tuple of [language, region] where language is lowercase and region is UPPERCASE
   */
  static extractLangRegionFromBCP47(e) {
    return I(e);
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
    const t = e.map((s) => s.name), i = Oo(t, "apple");
    i && (this.systemLocale = i);
  }
  /**
   * Infer voice quality based on package, platform, JSON, or duplicate count
   * Returns null if quality cannot be determined
   * @private
   */
  inferVoiceQuality(e, t, i) {
    const s = e.voiceURI ? Qn(e.voiceURI) : void 0;
    if (s) return s;
    if (t?.nativeID && Array.isArray(t.nativeID))
      for (const r of t.nativeID) {
        const o = Qn(r);
        if (o) return o;
      }
    if (t?.localizedName && e.voiceURI && e.lang) {
      const r = Ao(
        e.voiceURI,
        this.systemLocale,
        t.localizedName
      );
      if (r) return r;
    }
    if (t?.quality && t.quality.length > 0) {
      const r = Math.min(i - 1, t.quality.length - 1), o = t.quality[r];
      if (o)
        return o;
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
      const s = `${i.language.toLowerCase()}_${this.normalizeVoiceName(i.name)}`, r = t.get(s);
      if (!r)
        t.set(s, i);
      else if (Do(i, r)) {
        const o = To(i, r);
        t.set(s, o);
      } else {
        const o = pt(r.quality);
        pt(i.quality) >= o && t.set(s, i);
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
    const t = Xn(e);
    if (t) return t;
    const [i] = N.extractLangRegionFromBCP47(e);
    if (i && i !== e) {
      const s = Xn(i);
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
    const s = i ?? this.voices, r = t ? this.filterVoices(t, s) : s, o = [], a = /* @__PURE__ */ new Set();
    for (const l of r) {
      const u = U(l.language).split("-")[0];
      if (!a.has(u)) {
        const h = nn(u, e), d = r.filter(
          (f) => U(f.language).split("-")[0] === u
        ).length;
        o.push({ code: u, label: h, count: d }), a.add(u);
      }
    }
    return i ? o : o.sort((l, c) => l.label.localeCompare(c.label));
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
    const s = i ?? this.voices, r = t ? this.filterVoices(t, s) : s, o = [], a = /* @__PURE__ */ new Set(), l = /* @__PURE__ */ new Map();
    for (const c of r) {
      const [, u] = N.extractLangRegionFromBCP47(c.language);
      u && l.set(u, (l.get(u) || 0) + 1);
    }
    for (const c of r) {
      const [, u] = N.extractLangRegionFromBCP47(c.language);
      if (u && !a.has(u)) {
        let h = c.language;
        try {
          const d = e || navigator.language;
          h = new Intl.DisplayNames([d], { type: "region" }).of(u) || c.language;
        } catch (d) {
          console.warn(`Failed to get display name for region ${u}`, d);
        }
        o.push({
          code: u,
          label: h,
          count: l.get(u) || 0
        }), a.add(u);
      }
    }
    return i ? o : o.sort((c, u) => c.label.localeCompare(u.label));
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
    return Array.isArray(s) && s.length ? Promise.resolve(s) : new Promise((r, o) => {
      let a = Math.floor(e / t), l = !1;
      const c = () => {
        if (l) return;
        l = !0;
        const u = () => {
          if (a < 1) return r([]);
          --a;
          const h = i();
          if (Array.isArray(h) && h.length) return r(h);
          setTimeout(u, t);
        };
        setTimeout(u, t);
      };
      window.speechSynthesis.onvoiceschanged !== void 0 ? window.speechSynthesis.onvoiceschanged = () => {
        const u = i();
        Array.isArray(u) && u.length ? r(u) : c();
      } : c(), setTimeout(() => r([]), e);
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
        const r = U(s.lang), [o] = N.extractLangRegionFromBCP47(r), a = this.normalizeVoiceName(s.name), l = `${s.lang.toLowerCase()}_${a}`, c = t.get(l) || 1;
        let u = await tn(r);
        (!u || u.length === 0) && (u = await tn(o));
        const h = this.findMatchingJsonVoice(u, a), d = this.inferVoiceQuality(s, h, c);
        return h ? {
          ...h,
          label: h.label ?? this.cleanVoiceName(s.name),
          source: "json",
          originalName: s.name,
          language: h.language ?? r,
          voiceURI: s.voiceURI,
          quality: d,
          isDefault: s.default || !1,
          offlineAvailability: s.localService || !1,
          isNovelty: rn(s.name, s.voiceURI),
          isLowQuality: on(s.name, d)
        } : {
          source: "browser",
          label: this.cleanVoiceName(s.name),
          name: s.name,
          originalName: s.name,
          language: r,
          voiceURI: s.voiceURI,
          quality: d,
          isDefault: s.default || !1,
          offlineAvailability: s.localService || !1,
          isNovelty: rn(s.name, s.voiceURI),
          isLowQuality: on(s.name, d)
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
    if (s.languages) {
      const r = Array.isArray(s.languages) ? s.languages : [s.languages];
      i = i.filter((o) => r.some((a) => {
        const l = a.toLowerCase(), c = o.language?.toLowerCase(), u = o.altLanguage?.toLowerCase();
        if (c === l || u === l)
          return !0;
        const [h] = l.split("-");
        return c && c.startsWith(h) || u && u.startsWith(h);
      }));
    }
    if (s.source && (i = i.filter((r) => r.source === s.source)), s.gender && (i = i.filter((r) => r.gender === s.gender)), s.quality) {
      const r = Array.isArray(s.quality) ? s.quality : [s.quality];
      i = i.filter((o) => o.quality && r.includes(o.quality));
    }
    return s.offlineOnly && (i = i.filter((r) => r.offlineAvailability === !0)), s.provider && (i = i.filter(
      (r) => r.provider?.toLowerCase() === s.provider?.toLowerCase()
    )), s.excludeNovelty && (i = Jn(i)), s.excludeVeryLowQuality && (i = Yn(i)), s.removeDuplicates && (i = this.removeDuplicates(i)), i;
  }
  /**
   * Filter out novelty voices
   * @param voices Array of voices to filter
   * @returns Filtered array with novelty voices removed
   */
  filterOutNoveltyVoices(e) {
    const t = e ?? this.voices;
    return Jn(t);
  }
  /**
   * Filter out very low quality voices
   * @param voices Array of voices to filter
   * @returns Filtered array with very low quality voices removed
   */
  filterOutVeryLowQualityVoices(e) {
    const t = e ?? this.voices;
    return Yn(t);
  }
  /**
   * Sort voices by quality, respecting JSON name order, then alphabetically for undefined/null quality
   * @param voices Array of voices to sort
   * @returns Sorted array of voices
   */
  async sortVoicesByQuality(e) {
    const t = e || this.voices;
    if (!t?.length) return [];
    const i = await ve(t);
    return [...t].sort((s, r) => re(s, r, i));
  }
  /**
   * Sort regions by default then alphabetically, sort voices by quality
   */
  static async sortByDefaultRegion(e, t) {
    const i = await ve(e), s = Dt(t);
    e.sort((r, o) => {
      const [, a] = N.extractLangRegionFromBCP47(r.language), [, l] = N.extractLangRegionFromBCP47(o.language), c = s && a === s.split("-")[1], u = s && l === s.split("-")[1];
      return c && !u ? -1 : !c && u ? 1 : re(r, o, i, t);
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
      return await sn(l), l;
    }
    const s = Ft(e), { voicesByLang: r, otherLangVoices: o } = It(i, s), a = [];
    for (const l of s) {
      const c = r.get(l.baseLang);
      c && (await N.sortByDefaultRegion(c, l.baseLang), a.push(...c));
    }
    return await sn(o), a.push(...o), a;
  }
  /**
   * Sort voices by region preference, then alphabetically
   * @param voices Array of voices to sort
   * @param preferredLanguages Array of preferred language codes in order of preference
   * @returns Sorted array of voices
   */
  async sortVoicesByRegions(e, t) {
    return So(e, t || this.voices);
  }
  /**
   * Group voices by the specified criteria
   * @param voices Array of voices to group
   * @param options Grouping options
   * @returns Object with voice groups keyed by the grouping criteria
   */
  groupVoices(e, t) {
    const i = {}, s = t || this.voices;
    for (const r of s) {
      let o = "Unknown";
      switch (e) {
        case "languages":
          o = N.extractLangRegionFromBCP47(r.language)[0];
          break;
        case "gender":
          o = r.gender || "unknown";
          break;
        case "quality":
          o = r.quality || "unknown";
          break;
        case "region":
          const [, a] = N.extractLangRegionFromBCP47(r.language);
          o = a || "unknown";
          break;
      }
      i[o] || (i[o] = []), i[o].push(r);
    }
    return i;
  }
}
const Fo = ["webKit", "moz", "ms", "o"], Io = [
  "boundary",
  "end",
  "error",
  "mark",
  "pause",
  "resume",
  "start"
], Po = (n) => `${n.charAt(0).toUpperCase()}${n.slice(1)}`, Ne = (n = {}, e) => Object.hasOwnProperty.call(n, e) || e in n || !!n[e], Lo = (n) => typeof window < "u" && n in window, $o = (n) => {
  const e = Po(n), t = Fo.map((s) => `${s}${e}`), i = [n, e].concat(t).find(Lo);
  return i && typeof window < "u" ? window[i] : void 0;
}, Mo = () => {
  const n = {};
  [
    "speechSynthesis",
    "speechSynthesisUtterance",
    "speechSynthesisVoice",
    "speechSynthesisEvent",
    "speechSynthesisErrorEvent"
  ].forEach((t) => {
    n[t] = $o(t);
  }), n.onvoiceschanged = Ne(n.speechSynthesis, "onvoiceschanged"), n.speechSynthesisSpeaking = Ne(n.speechSynthesis, "speaking"), n.speechSynthesisPaused = Ne(n.speechSynthesis, "paused");
  const e = n.speechSynthesisUtterance ? Ne(n.speechSynthesisUtterance, "prototype") : !1;
  return Io.forEach((t) => {
    const i = `on${t}`;
    n[i] = e && n.speechSynthesisUtterance ? Ne(n.speechSynthesisUtterance.prototype, i) : !1;
  }), n;
}, _o = () => {
  const e = typeof window < "u" && (window.navigator || {}).userAgent || "", t = () => /android/i.test(e), i = () => /kaios/i.test(e), s = () => typeof window.InstallTrigger < "u" ? !0 : /firefox/i.test(e), r = () => typeof window.GestureEvent < "u" || /safari/i.test(e);
  return {
    isAndroid: t(),
    isFirefox: s() || i(),
    isSafari: r(),
    isKaiOS: i()
  };
};
let Pt = class {
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
      } catch (r) {
        console.error(`Error in "${String(e)}" listener:`, r);
      }
    });
  }
  clear() {
    this.listeners.clear();
  }
};
const ht = (n, e) => Math.min(Math.max(n, 0), Math.max(e - 1, 0));
function oe(n, e, t, i) {
  return Number.isFinite(n) ? Math.max(e, Math.min(t, n)) : i;
}
const ye = "\\p{Pe}\\p{Pf}.,;:!?，。、；：！？،؛؟", ln = "\\p{Ps}\\p{Pi}¿¡", Bo = new RegExp(`^[${ye}]`, "u"), Uo = new RegExp(`^[${ln}]`, "u"), zo = new RegExp("^\\p{P}$", "u");
function Ee(n) {
  return Bo.test(n);
}
function Vo(n) {
  return Uo.test(n);
}
function jo(n) {
  return zo.test(n);
}
function Cs(n) {
  return n.replace(/[<>]/g, "​");
}
function Ho(n) {
  return n.replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&nbsp;/g, " ").replace(/&#(\d+);/g, (e, t) => String.fromCodePoint(Number(t))).replace(/&#x([0-9a-fA-F]+);/g, (e, t) => String.fromCodePoint(parseInt(t, 16)));
}
function Xe(n) {
  return n.plain === "" && n.ssml === "" && n.language === "";
}
function Wo(n) {
  if (!n || Xe(n)) return;
  if (n.ssml === "" && n.language === "") return n.plain;
  const e = { language: n.language };
  return n.plain !== "" && (e.plain = n.plain), n.ssml !== "" && (e.ssml = n.ssml), e;
}
function Ko(n, e) {
  if (n.lang !== e.lang || n.tag !== e.tag) return !1;
  const t = Object.entries(n.attrs ?? {}), i = Object.entries(e.attrs ?? {});
  return t.length !== i.length ? !1 : t.every(([s, r]) => e.attrs?.[s] === r);
}
const X = (n) => n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), jt = (n) => n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"), qo = /[\u00A0\u2007\u202F]/;
function Go(n) {
  return qo.test(n);
}
function we(n, e) {
  let t = "", i = !1, s = !1;
  for (const r of n)
    if (Go(r))
      t += r, i = !1, s = !0;
    else if (/\s/.test(r)) {
      if (e && !s || i) continue;
      t += " ", i = !0;
    } else r !== "​" && r !== "­" && (t += r, i = !1, s = !0);
  return t;
}
const Xo = /\s*<readium:[a-zA-Z][\w-]*\s+id="[^"]*"\s*\/>\s*/g;
function Jo(n) {
  return n.replace(Xo, (t, i, s) => {
    const r = s.slice(i + t.length);
    return r.length === 0 || Ee(r) ? "" : " ";
  }).replace(/ {2,}/g, " ").trim();
}
function Yo(n) {
  return n.includes("<");
}
function Rn(n) {
  if (n === void 0) return;
  if (typeof n == "string") return { plain: n };
  const e = { language: n.language };
  if (n.ssml) {
    const t = Jo(n.ssml);
    Yo(t) && (e.ssml = t);
  }
  return n.plain && (e.plain = n.plain), e.plain || e.ssml ? e : void 0;
}
function ae(n) {
  return ks(n).plain;
}
function ks(n) {
  let e = "";
  const t = [];
  let i = !1, s = 0;
  for (; s < n.length; ) {
    const a = n[s];
    if (a === "<") {
      const c = n.indexOf(">", s), u = c === -1 ? "" : n.slice(c + 1);
      s = c === -1 ? n.length : c + 1, !i && e.length > 0 && u.length > 0 && !Ee(u) && (e += " ", t.push(s), i = !0);
      continue;
    }
    const l = n.startsWith("&lt;", s) ? "<" : n.startsWith("&gt;", s) ? ">" : n.startsWith("&amp;", s) ? "&" : void 0;
    if (l) {
      e += l, t.push(s), s += l === "&" ? 5 : 4, i = !1;
      continue;
    }
    if (a === " ") {
      i || (e += a, t.push(s), i = !0), s++;
      continue;
    }
    e += a, t.push(s), i = !1, s++;
  }
  let r = 0;
  for (; r < e.length && /\s/.test(e[r]); ) r++;
  let o = e.length;
  for (; o > r && /\s/.test(e[o - 1]); ) o--;
  return { plain: e.slice(r, o), map: t.slice(r, o) };
}
function Zn(n, e) {
  let t = 0, i = n.length;
  for (; t < i; ) {
    const s = t + i >> 1;
    n[s] < e ? t = s + 1 : i = s;
  }
  return t;
}
const ei = /* @__PURE__ */ new WeakMap();
function Qo(n) {
  return n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function Zo(n) {
  const e = Qo(n), t = /\w/.test(n[0]) ? "(?<!\\w)" : "", i = /\w/.test(n[n.length - 1]) ? "(?!\\w)" : "";
  return `${t}${e}${i}`;
}
function ea(n, e) {
  if (typeof e == "string")
    return { regex: new RegExp(Zo(n), "g"), replace: e };
  const t = e.pattern.flags.includes("g") ? e.pattern.flags : `${e.pattern.flags}g`;
  return { regex: new RegExp(e.pattern.source, t), replace: e.replace };
}
function ta(n) {
  let e = ei.get(n);
  return e || (e = Object.entries(n).map(([t, i]) => ea(t, i)), ei.set(n, e)), e;
}
function Rs(n, e) {
  const t = [];
  for (const r of ta(e))
    for (const o of n.matchAll(r.regex)) {
      const a = o.index, l = typeof r.replace == "string" ? r.replace : r.replace(...o);
      t.push({ start: a, end: a + o[0].length, replacement: l });
    }
  t.sort((r, o) => r.start - o.start);
  const i = [];
  let s = 0;
  for (const r of t)
    r.start < s || (i.push(r), s = r.end);
  return i;
}
function na(n, e) {
  let t = "";
  const i = [];
  let s = 0;
  for (const r of Rs(n, e)) {
    for (; s < r.start; )
      t += n[s], i.push(s), s++;
    for (let o = 0; o < r.replacement.length; o++)
      t += r.replacement[o], i.push(r.start);
    s = r.end;
  }
  for (; s < n.length; )
    t += n[s], i.push(s), s++;
  return { text: t, map: i };
}
function ti(n, e) {
  return n.length ? e <= 0 ? n[0] : e >= n.length ? n[n.length - 1] + 1 : n[e] : e;
}
const ia = /<([a-zA-Z][\w-]*)([^>]*)>([\s\S]*?)<\/\1>|<[a-zA-Z][\w-]*\b[^>]*\/>|[^<]+/g;
function ni(n) {
  return n.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
}
function As(n) {
  const e = [];
  for (const t of n.matchAll(ia))
    t[1] !== void 0 ? e.push({ kind: "paired", raw: t[0], tag: t[1], attrs: t[2], innerText: ni(t[3]) }) : t[0][0] === "<" ? e.push({ kind: "selfClosing", raw: t[0] }) : e.push({ kind: "text", raw: t[0], text: ni(t[0]) });
  return e;
}
function sa(n, e) {
  const t = As(n);
  let i = "", s = !1;
  const r = [], o = t.map(() => []);
  t.forEach((v, C) => {
    if (v.kind === "selfClosing") return;
    const R = v.kind === "paired" ? v.innerText : v.text;
    if (!s && i.length > 0 && R.length > 0 && !Ee(R) && !/^\s/.test(R)) {
      const T = i.length;
      i += " ", o[C].push(r.length), r.push({ start: T, end: T + 1, atomIndex: -1 }), s = !0;
    }
    const A = i.length;
    i += R, o[C].push(r.length), r.push({ start: A, end: i.length, atomIndex: C }), R.length > 0 && (s = /\s$/.test(R));
  });
  const a = Rs(i, e);
  let l = "", c = "";
  const u = [];
  let h = -2, d = "", f = 0;
  const g = () => {
    if (h >= 0) {
      const v = t[h];
      l += v.kind === "paired" ? `<${v.tag}${v.attrs}>${d}</${v.tag}>` : d;
    }
    d = "", h = -2;
  };
  for (let v = 0; v < t.length; v++) {
    const C = t[v];
    if (C.kind === "selfClosing") {
      g(), l += C.raw;
      continue;
    }
    for (const R of o[v]) {
      const A = r[R];
      let T = A.start;
      for (; T < A.end; ) {
        const O = f < a.length ? a[f] : void 0;
        if (O && O.start <= T && O.end > T) {
          const F = O.start === T, $ = O.end > A.end;
          if (F) {
            c += O.replacement;
            for (let Re = 0; Re < O.replacement.length; Re++) u.push(O.start);
            A.atomIndex === -1 || $ ? (g(), l += X(O.replacement)) : (h !== A.atomIndex && (g(), h = A.atomIndex), d += X(O.replacement));
          }
          T = Math.min(O.end, A.end), O.end <= A.end && f++;
          continue;
        }
        const Ze = O ? Math.min(O.start, A.end) : A.end, ue = i.slice(T, Ze);
        c += ue;
        for (let F = 0; F < ue.length; F++) u.push(T + F);
        A.atomIndex === -1 ? (g(), l += X(ue)) : (h !== A.atomIndex && (g(), h = A.atomIndex), d += X(ue)), T = Ze;
      }
    }
  }
  g();
  let p = 0;
  for (; p < i.length && /\s/.test(i[p]); ) p++;
  let m = i.length;
  for (; m > p && /\s/.test(i[m - 1]); ) m--;
  let b = 0;
  for (; b < c.length && /\s/.test(c[b]); ) b++;
  let w = c.length;
  for (; w > b && /\s/.test(c[w - 1]); ) w--;
  const S = i.slice(p, m), y = u.slice(b, w).map((v) => Math.min(Math.max(v - p, 0), Math.max(S.length - 1, 0)));
  return { ssml: l, plain: S, map: y };
}
const Os = /<lang xml:lang="([^"]*)">([\s\S]*?)<\/lang>/g;
function Ns(n) {
  return new RegExp(Os).test(n);
}
function ii(n) {
  return n.replace(/<[^>]+>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/ {2,}/g, " ");
}
const ra = new RegExp(
  `\\s+|[${ln}]+|[${ye}]+|[^\\s${ln}${ye}]+`,
  "gu"
);
function Ht(n) {
  const e = [];
  for (const [t] of n.matchAll(ra))
    /^\s/.test(t) ? e.push({ kind: "space" }) : Vo(t) ? e.push({ kind: "open", text: t }) : Ee(t) ? e.push({ kind: "close", text: t }) : e.push({ kind: "word", text: t });
  return e;
}
function oa(n) {
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
function aa(n) {
  let e = n.length;
  for (; e > 0 && (n[e - 1].kind === "space" || n[e - 1].kind === "open"); ) e--;
  return n.slice(e).some((t) => t.kind === "open") ? n.splice(e) : [];
}
function la(n) {
  let e = 0;
  for (; e < n.length && (n[e].kind === "space" || n[e].kind === "close"); ) e++;
  return n.slice(0, e).some((t) => t.kind === "close") ? n.splice(0, e) : [];
}
function Ts(n, e) {
  const t = [];
  let i = 0;
  for (const o of n.matchAll(Os))
    t.push({
      tokens: Ht(ii(n.slice(i, o.index))),
      language: e,
      tagged: !1
    }), t.push({ tokens: Ht(ae(o[2])), language: o[1], tagged: !0 }), i = o.index + o[0].length;
  t.push({
    tokens: Ht(ii(n.slice(i))),
    language: e,
    tagged: !1
  });
  for (let o = 0; o < t.length - 1; o++)
    !t[o].tagged && t[o + 1].tagged ? t[o + 1].tokens.unshift(...aa(t[o].tokens)) : t[o].tagged && !t[o + 1].tagged && t[o].tokens.push(...la(t[o + 1].tokens));
  const s = [];
  let r = 0;
  for (const o of t) {
    const a = oa(o.tokens);
    a && (s.push({ plain: a, language: o.language, start: r, end: r + a.length }), r += a.length);
  }
  return s;
}
const Ds = /<readium:[a-zA-Z][\w-]*\s+id="([^"]*)"\s*\/>/g;
function ca(n) {
  return new RegExp(Ds).test(n);
}
function ua(n) {
  const e = [];
  let t = 0;
  for (const s of n.matchAll(Ds)) {
    const r = n.slice(t, s.index).trim();
    r && e.push({ ssml: r }), e.push({ placeholderId: s[1] }), t = s.index + s[0].length;
  }
  const i = n.slice(t).trim();
  return i && e.push({ ssml: i }), e;
}
class si {
  speechSynthesis;
  speechSynthesisUtterance;
  currentVoice = null;
  currentUtterances = [];
  currentUtteranceIndex = 0;
  playbackState = "idle";
  events = new Pt();
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
  // Playback parameters
  rate = 1;
  pitch = 1;
  volume = 1;
  features;
  patches;
  constructor() {
    if (this.features = Mo(), this.patches = _o(), !this.features.speechSynthesis || !this.features.speechSynthesisUtterance)
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
    const { languages: t, maxTimeout: i, interval: s, maxLengthExceeded: r = "warn" } = e;
    if (this.initialized)
      return !1;
    this.maxLengthExceeded = r;
    try {
      this.voiceManager = await N.initialize({
        languages: t,
        maxTimeout: i,
        interval: s
      }), this.voices = this.voiceManager.getVoices();
      const o = t || [...navigator.languages || ["en"]];
      return this.defaultVoice = await this.voiceManager.getDefaultVoice(o, this.voices), this.initialized = !0, !0;
    } catch (o) {
      return console.error("Failed to initialize WebSpeechEngine:", o), this.initialized = !1, !1;
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
  // No cross-region fallback: fr-FR content must not match an fr-CA voice.
  voiceMatchesLanguage(e, t) {
    const [i, s] = I(t), [r, o] = I(e.language);
    return r === i && (!s || o === s);
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
    const i = U(e.language);
    if (t && this.voiceMatchesLanguage(t, i))
      return t;
    const s = t?.controls?.boundary !== !1, r = this.languageCacheKey(i, s);
    if (this.languageVoiceCache.has(r))
      return this.languageVoiceCache.get(r) ?? t;
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
    const t = this.getCurrentVoiceForUtterance(this.currentVoice)?.controls?.boundary !== !1, i = new Set(
      e.map((a) => a.language).filter((a) => !!a).map((a) => U(a)).filter((a) => !this.languageVoiceCache.has(this.languageCacheKey(a, t)))
    ), s = [...i].filter((a) => this.warmingLanguages.has(this.languageCacheKey(a, t))), o = [...i].filter((a) => !this.warmingLanguages.has(this.languageCacheKey(a, t))).map((a) => {
      const l = this.languageCacheKey(a, t), c = (async () => {
        await N.initialize({ languages: [a] }), this.voices = this.voiceManager.getVoices();
        const u = this.voices.filter((g) => this.voiceMatchesLanguage(g, a)), h = Es(u, t), f = (await this.voiceManager.sortVoicesByQuality(h))[0] ?? null;
        this.languageVoiceCache.set(l, f), f || this.emitEvent({ type: "languagefallback", detail: { language: a, reason: "no-matching-voice" } });
      })();
      return this.warmingLanguages.set(l, c.finally(() => this.warmingLanguages.delete(l))), this.warmingLanguages.get(l);
    });
    await Promise.all([
      ...o,
      ...s.map((a) => this.warmingLanguages.get(this.languageCacheKey(a, t)))
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
    return e.map((t) => ({
      ...t,
      plain: t.plain ?? (t.ssml ? ae(Ho(t.ssml)) : "")
    }));
  }
  // Queue Management
  loadUtterances(e, t) {
    this.currentUtterances = this.toPlainText(e), this.currentUtteranceIndex = ht(t ?? 0, e.length), this.warmLanguageVoiceCache(this.currentUtterances), this.playbackState = "ready", this.emitEvent({ type: "ready" });
  }
  // Voice Configuration
  async setVoice(e) {
    const t = this.currentVoice;
    if (typeof e == "string") {
      const i = this.voices.find((s) => s.name === e || s.language === e);
      i ? (this.currentVoice = i, t && t.name !== i.name && (this.currentUtteranceIndex = 0)) : console.warn(`Voice "${e}" not found`);
    } else
      this.currentVoice = e, t && t.name !== e.name && (this.currentUtteranceIndex = 0);
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
    const t = this.currentUtterances[this.currentUtteranceIndex], i = t.plain ?? "";
    this.validateText(i);
    const s = this.createUtterance(Cs(i)), r = await this.voiceForUtterance(t);
    if (e === this.speakGeneration) {
      if (r && this.voiceManager) {
        const o = this.voiceManager.convertToSpeechSynthesisVoice(r);
        o && (s.voice = o, s.lang = o.lang);
      }
      t.language && (s.lang = t.language), s.rate = this.rate, s.pitch = this.pitch, s.volume = this.volume, s.onstart = () => {
        this.isSpeakingInternal = !0, this.isPausedInternal = !1, this.setState("playing"), this.emitEvent({ type: "start" }), this.patches.isAndroid && this.isAndroidPaused && (this.isAndroidPaused = !1), this.shouldUseResumeInfinity() && this.startResumeInfinity(s);
      }, s.onend = () => {
        if (this.utterancesBeingCancelled) {
          this.utterancesBeingCancelled = !1;
          return;
        }
        this.playbackState !== "idle" && (this.isSpeakingInternal = !1, this.isPausedInternal = !1, this.stopResumeInfinity(), this.currentUtteranceIndex >= this.currentUtterances.length - 1 && this.setState("idle"), this.emitEvent({ type: "end" }));
      }, s.onerror = (o) => {
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
      }, s.onpause = () => {
        this.isPausedInternal = !0, this.isSpeakingInternal = !1, this.emitEvent({ type: "pause" });
      }, s.onresume = () => {
        this.isPausedInternal = !1, this.isSpeakingInternal = !0, this.emitEvent({ type: "resume" });
      }, s.onboundary = (o) => {
        e === this.speakGeneration && this.emitEvent({
          type: "boundary",
          detail: {
            charIndex: o.charIndex,
            charLength: o.charLength,
            elapsedTime: o.elapsedTime,
            name: o.name
          }
        });
      }, s.onmark = (o) => {
        this.emitEvent({
          type: "mark",
          detail: {
            name: o.name
          }
        });
      }, this.speechSynthesis.speak(s);
    }
  }
  startResumeInfinity(e) {
    this.shouldUseResumeInfinity() && (this.resumeInfinityTimer = window.setTimeout(() => {
      if (e) {
        const { paused: i, speaking: s } = this.speechSynthesis, r = s || this.isSpeakingInternal, o = i || this.isPausedInternal;
        r && !o && (this.speechSynthesis.pause(), this.speechSynthesis.resume());
      }
      this.startResumeInfinity(e);
    }, 5e3));
  }
  stopResumeInfinity() {
    this.resumeInfinityTimer && (clearTimeout(this.resumeInfinityTimer), this.resumeInfinityTimer = void 0);
  }
  pause() {
    this.playbackState === "playing" && (this.pausedAtUtteranceIndex = this.currentUtteranceIndex, this.isPausedInternal = !0, this.isSpeakingInternal = !1, this.setState("paused"), this.patches.isAndroid ? (this.isAndroidPaused = !0, this.speechSynthesis.cancel(), this.emitEvent({ type: "pause" })) : this.speechSynthesis.pause());
  }
  resume() {
    this.playbackState === "paused" && this.currentUtteranceIndex < this.currentUtterances.length && (this.isPausedInternal = !1, this.isSpeakingInternal = !0, this.setState("playing"), this.patches.isAndroid || this.pausedAtUtteranceIndex !== this.currentUtteranceIndex ? (this.emitEvent({ type: "resume" }), this.speak(this.currentUtteranceIndex)) : this.speechSynthesis.resume(), this.pausedAtUtteranceIndex = null);
  }
  stop() {
    this.cancelCurrentSpeech(), this.speakGeneration++, this.currentUtteranceIndex = 0, this.patches.isAndroid && (this.isAndroidPaused = !1), this.setState("idle"), this.emitEvent({ type: "stop" });
  }
  // Playback Parameters
  setRate(e) {
    const t = oe(e, 0.1, 10, this.rate);
    t !== this.rate && (this.rate = t, this.scheduleRestartIfSpeaking());
  }
  getRate() {
    return this.rate;
  }
  setPitch(e) {
    const t = oe(e, 0, 2, this.pitch);
    t !== this.pitch && (this.pitch = t, this.scheduleRestartIfSpeaking());
  }
  getPitch() {
    return this.pitch;
  }
  setVolume(e) {
    const t = oe(e, 0, 1, this.volume);
    t !== this.volume && (this.volume = t, this.scheduleRestartIfSpeaking());
  }
  getVolume() {
    return this.volume;
  }
  // rate/pitch/volume are baked into the SpeechSynthesisUtterance object once, at speak()-time —
  // restart the in-flight one so a change applies now instead of waiting for the next utterance.
  // Coalesces multiple same-tick changes (e.g. rate+pitch together) into a single restart.
  scheduleRestartIfSpeaking() {
    !this.isSpeakingInternal || this.restartPending || (this.restartPending = !0, queueMicrotask(() => {
      this.restartPending && (this.restartPending = !1, this.isSpeakingInternal && this.speak(this.currentUtteranceIndex));
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
    e !== this.currentUtteranceIndex && (!this.isPausedInternal && this.isSpeakingInternal && this.cancelCurrentSpeech(), this.currentUtteranceIndex = e, t?.(!0));
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
class wd {
  id = "webspeech";
  name = "Web Speech API";
  voiceEngine = null;
  // No cache to bypass here — local API, no network cost to re-checking.
  async getVoices() {
    return this.voiceEngine || (this.voiceEngine = new si(), await this.voiceEngine.initialize()), this.voiceEngine.getAvailableVoices();
  }
  async createEngine(e) {
    const t = new si();
    return await t.initialize(), e && await t.setVoice(e), t;
  }
  async destroy() {
    this.voiceEngine && (await this.voiceEngine.destroy(), this.voiceEngine = null);
  }
}
function Fs(n, e) {
  const t = [];
  let i = -1, s = -1;
  const r = () => {
    i !== -1 && (t.push({ text: ha(n, i, s), offset: n[i].offset }), i = -1, s = -1);
  };
  for (let o = 0; o < n.length; o++) {
    const a = n[o];
    if (a.text.length > e) {
      r(), t.push({ text: a.text, offset: a.offset });
      continue;
    }
    const l = a.offset + a.text.length, c = i === -1 ? a.text.length : l - n[i].offset;
    i !== -1 && c > e && r(), i === -1 && (i = o), s = o;
  }
  return r(), t;
}
function ha(n, e, t) {
  const i = n[e], s = n[t];
  return i === s ? i.text : n.slice(e, t + 1).map((r) => r.text).join("");
}
const Is = new RegExp(
  `[^${ye}]*[${ye}]+\\s*|[^${ye}]+$`,
  "gu"
), da = /\S+\s*|\s+/g;
function An(n, e, t) {
  const i = [];
  for (const s of n.matchAll(t))
    s[0].length !== 0 && i.push({ text: s[0], offset: e + s.index, atomic: !1 });
  return i;
}
function On(n, e) {
  if (n.text.length <= e || n.atomic)
    return [n];
  const t = An(n.text, n.offset, da);
  if (t.length > 1)
    return t.flatMap((o) => On(o, e));
  const i = [];
  let s = n.offset, r = "";
  for (const o of n.text)
    r.length > 0 && r.length + o.length > e && (i.push({ text: r, offset: s, atomic: !1 }), s += r.length, r = ""), r += o;
  return r.length > 0 && i.push({ text: r, offset: s, atomic: !1 }), i;
}
function fa(n, e) {
  if (n.length <= e)
    return [{ text: n, offset: 0 }];
  const i = An(n, 0, Is).flatMap((s) => On(s, e));
  return Fs(i, e);
}
const ga = /<([a-zA-Z][\w-]*)\b[^>]*>[\s\S]*?<\/\1>|<[a-zA-Z][\w-]*\b[^>]*\/>|[^<]+/g;
function pa(n, e) {
  if (n.length <= e)
    return [{ text: n, offset: 0 }];
  const t = [];
  for (const s of n.matchAll(ga))
    s[0][0] === "<" ? t.push({ text: s[0], offset: s.index, atomic: !0 }) : t.push(...An(s[0], s.index, Is));
  const i = t.flatMap((s) => On(s, e));
  return Fs(i, e);
}
const ma = {
  wav: "audio/wav",
  mp3: "audio/mpeg",
  opus: "audio/ogg",
  ogg: "audio/ogg",
  aac: "audio/aac",
  flac: "audio/flac",
  webm: "audio/webm",
  m4a: "audio/mp4"
};
function Sa(n) {
  return ma[n] ?? `audio/${n}`;
}
const ya = ["flac", "wav", "opus", "aac", "ogg", "webm", "mp3"], ba = ["opus", "aac", "webm", "ogg", "mp3", "wav", "flac"];
function va(n, e, t) {
  const i = (a) => t(Sa(a)) !== "", s = n.formats.filter(i);
  if (e.preferredFormat && s.includes(e.preferredFormat))
    return e.preferredFormat;
  const r = e.strategy === "bandwidth" ? ba : ya, o = [...r, ...s.filter((a) => !r.includes(a))];
  for (const a of o)
    if (s.includes(a))
      return a;
  return n.default;
}
const wa = /* @__PURE__ */ new Set(["wav", "flac"]), xa = {
  mp3: 48e3,
  opus: 24e3,
  aac: 48e3,
  ogg: 48e3,
  webm: 32e3
};
function Ea(n, e, t) {
  return wa.has(n) || !e || !t ? void 0 : t.saveData === !0 || /2g/.test(t.effectiveType ?? "") ? xa[n] : void 0;
}
function Ps(n, e) {
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
class je extends Error {
  status;
  type;
  title;
  instance;
  constructor(e, t) {
    super(e), this.name = "SpeechServerError", this.status = t.status, this.type = t.type, this.title = t.title, this.instance = t.instance;
  }
}
class Ls extends je {
  constructor(e) {
    super(e, { status: 408, type: "https://readium.org/speech-server/error#stall", title: "Synthesis Stalled" }), this.name = "SpeechServerStallError";
  }
}
class $s extends Error {
  constructor(e) {
    super(e), this.name = "SpeechServerAudioDecodeError";
  }
}
class Ms extends Error {
  constructor(e) {
    super(e), this.name = "SpeechServerNetworkError";
  }
}
async function _e(n) {
  if ((n.headers.get("content-type") ?? "").includes("application/problem+json"))
    try {
      const t = await n.json();
      return new je(t.detail || t.title || `Request failed with status ${n.status}`, {
        status: t.status ?? n.status,
        type: t.type,
        title: t.title,
        instance: t.instance
      });
    } catch {
    }
  return new je(`Request failed with status ${n.status}`, { status: n.status });
}
const Ca = 3, ka = 400;
function Ra(n) {
  const e = atob(n), t = new Uint8Array(e.length);
  for (let i = 0; i < e.length; i++)
    t[i] = e.charCodeAt(i);
  return t.buffer;
}
function Aa(n) {
  return oe(n, 0.25, 4, 1);
}
function tt(n) {
  return n?.plain ?? n?.ssml ?? void 0;
}
function ri(n) {
  return n instanceof Ls ? { message: n.message, status: n.status, type: n.type, title: n.title, instance: n.instance, recoverable: !0 } : n instanceof je ? { message: n.message, status: n.status, type: n.type, title: n.title, instance: n.instance, recoverable: !1 } : n instanceof $s ? { message: n.message, recoverable: !1 } : n instanceof Ms ? { message: n.message, recoverable: !0 } : n instanceof Error ? { message: n.message, recoverable: !1 } : { message: String(n), recoverable: !1 };
}
class Oa {
  endpoints;
  fetchImpl;
  currentVoice = null;
  voices = [];
  serviceInfo = null;
  serviceInfoPromise = null;
  currentUtterances = [];
  currentUtteranceIndex = 0;
  playbackState = "idle";
  events = new Pt();
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
  audioContext = null;
  masterGain = null;
  scheduledChunks = [];
  boundaryRafHandle = null;
  rate = 1;
  pitch = 1;
  volume = 1;
  constructor(e) {
    this.endpoints = e.endpoints, this.fetchImpl = e.fetch ?? fetch.bind(globalThis), this.prefetchWindow = e.prefetchWindow ?? Ca, this.readyBufferChars = e.readyBufferChars ?? ka, this.overLengthText = e.overLengthText ?? "split", this.timeoutMs = e.timeoutMs, this.formatOptions = e.format ?? {}, this.canPlayType = typeof Audio < "u" ? (t) => new Audio().canPlayType(t) : () => "";
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
    } catch (i) {
      throw i instanceof TypeError ? new Ms(i.message) : i;
    }
  }
  loadUtterances(e, t) {
    this.abortLiveControllers(), this.clearPrefetchCache(), this.currentUtterances = e, this.currentUtteranceIndex = ht(t ?? 0, e.length), this.setState("loading"), this.bufferUntilReady(++this.loadGeneration);
  }
  // Buffers enough utterances ahead of currentUtteranceIndex to cover readyBufferChars before
  // declaring "ready", so playback doesn't catch up to an empty prefetch cache right away —
  // starting from wherever playback will actually resume, not always utterance 0.
  async bufferUntilReady(e) {
    const t = ht(this.currentUtteranceIndex, this.currentUtterances.length), i = Math.min(this.indexCoveringChars(this.readyBufferChars, t), t + this.prefetchWindow), s = [];
    for (let r = t; r <= i; r++) {
      this.queuePrefetch(r);
      const o = this.prefetchCache.get(r);
      o && s.push(o.then((a) => a[0].promise));
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
    const i = ht(t, this.currentUtterances.length);
    let s = 0;
    for (let r = i; r < this.currentUtterances.length; r++)
      if (s += (tt(this.currentUtterances[r]) ?? "").length, s >= e)
        return r;
    return this.currentUtterances.length - 1;
  }
  setVoice(e) {
    if (typeof e == "string") {
      const t = this.voices.find((i) => i.identifier === e || i.name === e);
      t ? this.currentVoice = t : (this.currentVoice = {
        source: "server",
        label: e,
        name: e,
        originalName: e,
        language: "",
        identifier: e
      }, this.getAvailableVoices().then((i) => {
        if (this.currentVoice?.identifier !== e)
          return;
        const s = i.find((r) => r.identifier === e || r.name === e);
        s && (this.currentVoice = s);
      }).catch(() => {
      }));
    } else
      this.currentVoice = e;
    this.abortLiveControllers(), this.clearPrefetchCache();
  }
  getCurrentVoice() {
    return this.currentVoice;
  }
  async getAvailableVoices() {
    if (this.voices.length > 0)
      return this.voices;
    const [e, t] = await Promise.all([this.fetchNetwork(this.endpoints.voices), this.getServiceInfo()]);
    if (!e.ok)
      throw await _e(e);
    const i = await e.json(), s = new Map(t.providers.map((r) => [r.id, r.controls]));
    return this.voices = i.map((r) => Ps(r, s.get(r.provider))), this.voices;
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
      throw await _e(e);
    return e.json();
  }
  setSpeakInContentLanguage(e) {
    this.speakInContentLanguage = e, this.abortLiveControllers(), this.clearPrefetchCache();
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
    if (this.restartPending = !1, this.currentUtterances.length === 0) {
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
      await this.scheduleChunksStreaming(i, e), this.fillPrefetchWindow(t);
    } catch (i) {
      if (e !== this.speakGeneration)
        return;
      this.isSpeakingInternal = !1, this.setState("idle"), this.emitEvent({
        type: "error",
        detail: ri(i)
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
    const i = this.currentUtterances[e], s = !i.plain && !!i.ssml, r = this.speakInContentLanguage ? i.language : void 0, o = tt(i) ?? "", a = s ? ks(o).map : void 0, l = tt(this.currentUtterances[e - 1]), c = tt(this.currentUtterances[e + 1]), u = await this.getServiceInfo(), h = va(u.output, this.formatOptions, this.canPlayType), d = navigator.connection, f = Ea(h, this.formatOptions.adaptBitrateToNetwork ?? !1, d);
    if (o.length <= u.limits.maxTextLength) {
      const w = new AbortController();
      return (t ? this.activeControllers : this.liveControllers).add(w), [{
        promise: this.synthesizeChunk({ content: i, text: o, textOffset: 0, useSSML: s, ssmlMap: a, language: r, prevText: l, nextText: c, format: h, bitrate: f, controller: w }),
        controller: w
      }];
    }
    if (this.overLengthText === "error")
      throw new je(
        `Text exceeds this server's maximum length of ${u.limits.maxTextLength} characters`,
        {
          status: 413,
          type: "https://readium.org/speech-server/error#payload_too_large",
          title: "Payload Too Large"
        }
      );
    const g = Math.min(u.limits.maxTextLength, this.readyBufferChars), p = s ? pa(o, g) : fa(o, g), m = [];
    let b = Promise.resolve();
    for (let w = 0; w < p.length; w++) {
      const S = w === 0 ? l : p[w - 1].text, y = w === p.length - 1 ? c : p[w + 1].text, v = p[w], C = new AbortController();
      (t ? this.activeControllers : this.liveControllers).add(C);
      const R = b.then(
        () => this.synthesizeChunk({ content: i, text: v.text, textOffset: v.offset, useSSML: s, ssmlMap: a, language: r, prevText: S, nextText: y, format: h, bitrate: f, controller: C })
      );
      m.push({ promise: R, controller: C }), b = R;
    }
    return m;
  }
  async synthesizeChunk(e) {
    const { content: t, text: i, textOffset: s, useSSML: r, ssmlMap: o, language: a, prevText: l, nextText: c, format: u, bitrate: h, controller: d } = e;
    try {
      const f = await this.fetchNetwork(this.endpoints.synthesize, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: t.id,
          text: r ? i : Cs(i),
          ssml: r,
          language: a,
          voice: this.currentVoice?.identifier ?? this.currentVoice?.name,
          prev_utterance: l,
          next_utterance: c,
          boundary: !0,
          output: { format: u, bitrate: h, speed: this.rate, pitch: this.pitch }
        }),
        signal: d.signal
      });
      if (!f.ok)
        throw await _e(f);
      const g = await f.json(), p = Ra(g.audio);
      let m;
      try {
        m = await this.ensureAudioContext().decodeAudioData(p);
      } catch {
        throw new $s("Audio playback failed");
      }
      return { audioBuffer: m, format: g.format, boundaries: g.boundaries, textOffset: s, ssmlMap: o };
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
    return new Promise((r, o) => {
      const a = setTimeout(() => {
        t.abort(), o(new Ls(`No audio chunk arrived within ${s.toFixed(0)}ms of the playback buffer running dry`));
      }, s);
      e.then(
        (l) => {
          clearTimeout(a), r(l);
        },
        (l) => {
          clearTimeout(a), o(l);
        }
      );
    });
  }
  // Schedules chunks onto one continuous AudioContext timeline as they resolve.
  async scheduleChunksStreaming(e, t) {
    const i = await this.awaitWithStallDeadline(e[0].promise, e[0].controller, 0);
    if (t !== this.speakGeneration)
      return;
    const s = this.ensureAudioContext(), r = this.masterGain, a = this.currentVoice?.controls?.speed === !0 ? 1 : Aa(this.rate);
    this.scheduledChunks = [], this.setState("playing"), this.emitEvent({ type: "start" });
    let l = s.currentTime, c = null;
    const u = (h) => {
      const d = s.createBufferSource();
      d.buffer = h.audioBuffer, d.playbackRate.value = a, d.connect(r), d.start(l), c && (c.onended = null), d.onended = () => this.handleUtteranceEnded(t), c = d, this.scheduledChunks.push({ chunk: h, startTime: l, node: d, nextBoundaryIndex: 0, rate: a }), l += h.audioBuffer.duration / a;
    };
    u(i), this.startBoundaryPolling(t);
    for (let h = 1; h < e.length; h++) {
      let d;
      try {
        const f = Math.max(0, (l - s.currentTime) * 1e3);
        d = await this.awaitWithStallDeadline(e[h].promise, e[h].controller, f);
      } catch (f) {
        t === this.speakGeneration && this.emitEvent({ type: "error", detail: ri(f) });
        return;
      }
      if (t !== this.speakGeneration)
        return;
      u(d);
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
        const s = i[t.nextBoundaryIndex], r = s.charIndex + t.chunk.textOffset;
        let o = r, a = s.charLength;
        if (t.chunk.ssmlMap) {
          const l = t.chunk.ssmlMap;
          o = Zn(l, r), a = Math.max(0, Zn(l, r + s.charLength) - o);
        }
        this.emitEvent({
          type: "boundary",
          detail: {
            name: s.name,
            charIndex: o,
            charLength: a,
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
    this.playbackState === "paused" && this.audioContext && (this.audioContext.resume().catch(() => {
    }), this.startBoundaryPolling(this.speakGeneration), this.isSpeakingInternal = !0, this.setState("playing"), this.emitEvent({ type: "resume" }));
  }
  stop() {
    this.speakGeneration++, this.loadGeneration++, this.stopAudio(), this.abortLiveControllers(), this.clearPrefetchCache(), this.isSpeakingInternal = !1, this.currentUtteranceIndex = 0, this.setState("idle"), this.emitEvent({ type: "stop" });
  }
  setRate(e) {
    const t = oe(e, 0.1, 10, this.rate);
    t !== this.rate && (this.rate = t, this.clearPrefetchCache(), this.scheduleRestartIfSpeaking());
  }
  getRate() {
    return this.rate;
  }
  setPitch(e) {
    const t = oe(e, 0, 2, this.pitch);
    t !== this.pitch && (this.pitch = t, this.clearPrefetchCache(), this.scheduleRestartIfSpeaking());
  }
  getPitch() {
    return this.pitch;
  }
  setVolume(e) {
    const t = oe(e, 0, 1, this.volume);
    t !== this.volume && (this.volume = t, this.masterGain && (this.masterGain.gain.value = this.volume));
  }
  getVolume() {
    return this.volume;
  }
  // rate/pitch are baked into each chunk's synthesis request at fetch-time — restart the
  // in-flight utterance so a change applies now. Coalesces same-tick changes into one restart.
  scheduleRestartIfSpeaking() {
    !this.isSpeakingInternal || this.restartPending || (this.restartPending = !0, queueMicrotask(() => {
      this.restartPending && (this.restartPending = !1, this.isSpeakingInternal && this.speak(this.currentUtteranceIndex));
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
class xd {
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
      throw await _e(t);
    if (!i.ok)
      throw await _e(i);
    const s = await t.json(), r = await i.json(), o = new Map(r.providers.map((a) => [a.id, a.controls]));
    return this.voices = s.map((a) => Ps(a, o.get(a.provider))), this.voices;
  }
  async createEngine(e) {
    const t = new Oa(this.options);
    return this.voices.length > 0 && t.setAvailableVoices(this.voices), e && t.setVoice(e), t;
  }
  async destroy() {
    this.voices = [];
  }
}
function Na(n) {
  return n.detail?.recoverable === !0;
}
const Ta = 3e4, Da = [
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
class Fa {
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
  events = new Pt();
  unbindActiveEngine = null;
  constructor(e) {
    this.activeEngine = e.primaryEngine, this.primaryProvider = e.primaryProvider, this.fallbackProvider = e.fallbackProvider, this.onFailure = e.onFailure ?? "fallback", this.healthCheckIntervalMs = e.healthCheckIntervalMs ?? Ta, this.lastVoiceRequest = e.primaryEngine.getCurrentVoice() ?? void 0, this.bindActiveEngine();
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
    const e = this.activeEngine, t = Da.map((i) => e.on(i, (s) => {
      this.emitEvent(s), this.maybeRecoverNow();
    }));
    t.push(e.on("error", (i) => this.handleError(i))), this.unbindActiveEngine = () => t.forEach((i) => i());
  }
  handleError(e) {
    if (this.hasFallenBack || this.swapInFlight || this.onFailure === "error" || !Na(e)) {
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
        const s = this.activeEngine.getCurrentVoice() ?? (typeof this.lastVoiceRequest == "object" ? this.lastVoiceRequest : null), r = s?.language || this.currentUtterances[this.desiredIndex]?.language || (typeof navigator < "u" ? navigator.language : "en");
        if (t = await this.pickBestFallbackVoice(r, s?.gender, s?.controls?.boundary !== !1), !t) throw new Error("no offline-available fallback voice found");
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
    const s = this.teardownEpoch, r = this.activeEngine;
    let o;
    try {
      o = await e();
    } catch {
      this.swapInFlight = !1, i();
      return;
    }
    if (s !== this.teardownEpoch) {
      this.swapInFlight = !1, await o.destroy();
      return;
    }
    this.copyPlaybackParameters(r, o), this.unbindActiveEngine?.(), this.activeEngine = o, this.engineStarted = !1, this.swapInFlight = !1, this.bindActiveEngine(), this.emitEvent(t(o)), this.startEngineWhenReady(o), o.loadUtterances(this.currentUtterances, this.desiredIndex), await r.destroy();
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
    const s = await this.fallbackProvider.getVoices(), o = typeof navigator < "u" && navigator.onLine === !0 ? s : s.filter((g) => g.offlineAvailability === !0);
    if (o.length === 0) return null;
    const [a] = Ft([e]), { voicesByLang: l } = It(o, [a]), c = l.get(a.baseLang) ?? [], u = c.length > 0 ? c : o, h = t ? u.filter((g) => g.gender === t) : [], d = h.length > 0 ? h : u, f = Es(d, i);
    return yo(e, f);
  }
  async destroy() {
    this.teardownEpoch++, this.healthCheckTimer !== null && (clearTimeout(this.healthCheckTimer), this.healthCheckTimer = null), this.unbindActiveEngine?.(), this.events.clear(), await this.activeEngine.destroy();
  }
}
class Ed {
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
    return new Fa({
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
let Ia = class {
};
function Pa(n) {
  return (n.getComputedStyle(n.document.documentElement).writingMode || n.getComputedStyle(n.document.body).writingMode) === "vertical-lr";
}
function La(n) {
  const e = n.getComputedStyle(n.document.documentElement).writingMode || n.getComputedStyle(n.document.body).writingMode;
  return e === "vertical-rl" || e === "vertical-lr";
}
function he(n) {
  const e = La(n), t = e && Pa(n), i = n.innerWidth, s = n.innerHeight, r = n.document.scrollingElement, o = r.scrollLeft, a = r.scrollTop, l = parseInt(n.getComputedStyle(n.document.documentElement).getPropertyValue("column-count")), c = e && !t ? r.scrollWidth - i + o : o, u = a;
  return { isVertical: e, isVertLR: t, viewportInlineSize: e ? s : i, viewportBlockSize: e ? i : s, pageInlineSize: e ? s : i / (l || 1), xDocOffset: c, yDocOffset: u, inlineScrollOffset: e ? u : c, blockScrollOffset: e ? c : u, inlineStart: (h) => e ? h.top : h.left, blockStart: (h) => e ? h.left : h.top, inlineSize: (h) => e ? h.height : h.width, blockSize: (h) => e ? h.width : h.height, applyPosition(h, d, f, g, p, m) {
    h.style.position = "absolute", h.style.zIndex = "2147483646", e ? (h.style.top = `${d * m}px`, h.style.left = `${f * m}px`, h.style.height = `${g * m}px`, h.style.width = `${p * m}px`) : (h.style.left = `${d * m}px`, h.style.top = `${f * m}px`, h.style.width = `${g * m}px`, h.style.height = `${p * m}px`);
  }, toRect(h, d, f, g) {
    return e ? new DOMRect(d, h, g, f) : new DOMRect(h, d, f, g);
  } };
}
function oi(n, e) {
  return n.document.documentElement.style.getPropertyValue(e);
}
function $a(n) {
  return n && Array.isArray(n) ? n : void 0;
}
function Ma(n) {
  return n && typeof n == "string" ? [n] : $a(n);
}
function dt(n) {
  return isNaN(n) ? void 0 : n;
}
function Wt(n) {
  return dt(n) !== void 0 && Math.sign(n) >= 0 ? n : void 0;
}
let mt = class _s {
  constructor(e) {
    this.cssSelector = e.cssSelector, this.textNodeIndex = e.textNodeIndex, this.charOffset = e.charOffset;
  }
  static deserialize(e) {
    if (!(e && e.cssSelector)) return;
    let t = Wt(e.textNodeIndex);
    if (t === void 0) return;
    let i = Wt(e.charOffset);
    return i === void 0 && (i = Wt(e.offset)), new _s({ cssSelector: e.cssSelector, textNodeIndex: t, charOffset: i });
  }
  serialize() {
    const e = { cssSelector: this.cssSelector, textNodeIndex: this.textNodeIndex };
    return this.charOffset !== void 0 && (e.charOffset = this.charOffset), e;
  }
}, Bs = class Us {
  constructor(e) {
    this.start = e.start, this.end = e.end;
  }
  static deserialize(e) {
    if (!e) return;
    let t = mt.deserialize(e.start);
    if (t) return new Us({ start: t, end: mt.deserialize(e.end) });
  }
  serialize() {
    const e = { start: this.start.serialize() };
    return this.end && (e.end = this.end.serialize()), e;
  }
}, nt = null, Kt = null, Te = 0;
const ge = { r: 255, g: 255, b: 255, a: 1 }, de = /* @__PURE__ */ new Map(), _a = () => {
  if (!nt) if (typeof OffscreenCanvas < "u") nt = new OffscreenCanvas(5, 5), Kt = nt.getContext("2d", { willReadFrequently: !0, desynchronized: !0 });
  else {
    const n = document.createElement("canvas");
    n.width = 5, n.height = 5, nt = n, Kt = n.getContext("2d", { willReadFrequently: !0, desynchronized: !0 });
  }
  return Kt;
}, Ba = (n) => {
  if (!n) return !0;
  const e = n.trim().toLowerCase();
  return e.startsWith("var(") || ["transparent", "currentcolor", "inherit", "initial", "revert", "unset", "revert-layer"].includes(e) ? !0 : ["linear-gradient", "radial-gradient", "conic-gradient", "repeating-linear-gradient", "repeating-radial-gradient", "repeating-conic-gradient"].some((t) => e.includes(t));
}, it = (n, e) => {
  console.warn(`[Decorator] Could not parse color: "${n}". ${e} Falling back to ${JSON.stringify(ge)} to compute contrast. Please use a CSS color value that can be computed to RGB(A).`);
}, le = (n, e = null) => {
  const t = e ? `${n}|${e}` : n, i = de.get(t);
  if (i !== void 0) return i ?? ge;
  if (Ba(n)) return it(n, "Unsupported color format or special value."), de.set(t, null), ge;
  const s = _a();
  if (!s) return it(n, "Could not get canvas context."), de.set(t, null), ge;
  try {
    Te === 0 && s.clearRect(0, 0, 5, 5);
    const r = Te % 5, o = Math.floor(Te / 5);
    s.clearRect(r, o, 1, 1), e && (s.fillStyle = e, s.fillRect(r, o, 1, 1)), s.fillStyle = n, s.fillRect(r, o, 1, 1);
    const a = s.getImageData(r, o, 1, 1);
    Te = (Te + 1) % 25;
    const [l, c, u, h] = a.data;
    if (h === 0) return it(n, "Fully transparent color."), de.set(t, null), ge;
    const d = { r: l, g: c, b: u, a: h / 255 };
    return de.set(t, d), d;
  } catch (r) {
    return it(n, `Error: ${r instanceof Error ? r.message : String(r)}`), de.set(t, null), ge;
  }
}, qt = (n) => {
  const e = n / 255;
  return e <= 0.03928 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4);
}, cn = (n) => {
  const e = qt(n.r), t = qt(n.g), i = qt(n.b);
  return 0.2126 * e + 0.7152 * t + 0.0722 * i;
}, St = (n, e) => {
  const t = typeof n == "string" ? le(n) : n, i = typeof e == "string" ? le(e) : e, s = cn(t), r = cn(i), o = Math.max(s, r), a = Math.min(s, r);
  return (o + 0.05) / (a + 0.05);
}, zs = (n, e = null) => {
  const t = le(n, e), i = St(t, { r: 255, g: 255, b: 255, a: 1 }), s = St(t, { r: 0, g: 0, b: 0, a: 1 });
  return i > s;
}, ai = (n, e = null) => zs(n, e) ? "white" : "black", Ua = (n) => {
  const e = n.a !== void 0 ? n.a : 1;
  return `rgba(${Math.round(n.r)}, ${Math.round(n.g)}, ${Math.round(n.b)}, ${e})`;
}, za = (n, e) => ({ r: Math.min(255, n.r + (255 - n.r) * e), g: Math.min(255, n.g + (255 - n.g) * e), b: Math.min(255, n.b + (255 - n.b) * e), a: n.a ?? 1 }), Va = (n, e) => ({ r: Math.max(0, n.r * (1 - e)), g: Math.max(0, n.g * (1 - e)), b: Math.max(0, n.b * (1 - e)), a: n.a ?? 1 }), fe = (n, e = null, t = 3) => {
  const i = le(n), s = e ? le(e) : { r: 255, g: 255, b: 255, a: 1 };
  let r = St(i, s);
  if (r >= t) return n;
  const o = cn(s) < 0.5;
  let a = { ...i, a: i.a ?? 1 };
  const l = 20, c = 0.1;
  for (let u = 0; u < l && (o ? a = za(a, c) : a = Va(a, c), r = St(a, s), !(r >= t)); u++) ;
  return Ua(a);
}, Vs = () => typeof navigator > "u" ? "" : navigator.userAgent || "", js = () => typeof navigator > "u" ? void 0 : navigator.userAgentData || void 0;
let Hs = class {
  constructor() {
    const e = js(), t = Vs(), i = (r) => (typeof r == "string" || typeof r == "number") && r ? String(r).replace(/_/g, ".").split(".").map((o) => parseInt(o) || 0) : [], s = (r = "") => {
      if (!r) return [];
      const o = new RegExp("^.*" + r + "[ :\\/]?(\\d+([\\._]\\d+)*).*$");
      return o.test(t) ? i(t.replace(o, "$1")) : [];
    };
    this.OS = ((r) => (/(macOS|Mac OS X)/.test(t) ? (/\(iP(hone|od touch);/.test(t) && (r.iOS = s("CPU (?:iPhone )?OS ")), /\(iPad;/.test(t) ? r.iOS = r.iPadOS = s("CPU (?:iPhone )?OS ") : /(macOS|Mac OS X) \d/.test(t) && (document.ontouchend !== void 0 ? r.iOS = r.iPadOS = s() : r.macOS = s("(?:macOS|Mac OS X) "))) : /Windows( NT)? \d/.test(t) ? r.Windows = ((o) => o[0] !== 6 || !o[1] ? o : o[1] === 1 ? [7] : o[1] === 2 ? [8] : [8, 1])(s("Windows(?: NT)?")) : /Android \d/.test(t) ? r.Android = s("Android") : /CrOS/.test(t) ? r.ChromeOS = s() : /X11;/.test(t) && (r.Linux = s()), r))({}), e && e.getHighEntropyValues(["architecture", "model", "platform", "platformVersion", "uaFullVersion"]).then((r) => ((o) => {
      const a = r.platform, l = r.platformVersion;
      if (!(!a || !l)) {
        if (/^i(OS|P(hone|od touch))$/.test(a)) o.iOS = i(l);
        else if (/^iPad(OS)?$/.test(a)) o.iOS = o.iPadOS = i(l);
        else if (/^(macOS|(Mac )?OS X|Mac(Intel)?)$/.test(a)) document.ontouchend !== void 0 ? o.iOS = o.iPadOS = i() : o.macOS = i(l);
        else if (/^(Microsoft )?Windows$/.test(a)) o.Windows = i(l);
        else if (/^(Google )?Android$/.test(a)) o.Android = i(l);
        else if (/^((Google )?Chrome OS|CrOS)$/.test(a)) o.ChromeOS = i(l);
        else if (/^(Linux|Ubuntu|X11)$/.test(a)) o.Linux = i(l);
        else return;
        Object.keys(this.OS).forEach((c) => delete this.OS[c]), Object.assign(this.OS, o);
      }
    })({})), this.UA = ((r) => {
      let o = !1;
      if (e && Array.isArray(e.brands)) {
        const a = e.brands.reduce((l, c) => (l[c.brand] = [c.version * 1], l), {});
        a["Google Chrome"] ? (o = !0, r.Blink = r.Chromium = a.Chromium || [], r.Chrome = a["Google Chrome"]) : a["Microsoft Edge"] ? (o = !0, r.Blink = r.Chromium = a.Chromium || [], r.Edge = a["Microsoft Edge"]) : a.Opera && (o = !0, r.Blink = r.Chromium = a.Chromium || [], r.Opera = a.Opera);
      }
      return o || (/ Gecko\/\d/.test(t) ? (r.Gecko = s("rv"), / Waterfox\/\d/.test(t) ? r.Waterfox = s("Waterfox") : / Firefox\/\d/.test(t) && (r.Firefox = s("Firefox"))) : / Edge\/\d/.test(t) ? (r.EdgeHTML = s("Edge"), r.Edge = r.EdgeHTML) : / Chrom(ium|e)\/\d/.test(t) ? (r.Blink = r.Chromium = ((a) => a[0] ? a : s("Chrome"))(s("Chromium")), / EdgA?\/\d/.test(t) ? r.Edge = ((a) => a[0] ? a : s("Edg"))(s("EdgA")) : / OPR\/\d/.test(t) ? r.Opera = s("OPR") : / Vivaldi\/\d/.test(t) ? r.Vivaldi = s("Vivaldi") : / Silk\/\d/.test(t) ? r.Silk = s("Silk") : / UCBrowser\/\d/.test(t) ? r.UCBrowser = s("UCBrowser") : / Phoebe\/\d/.test(t) ? r.Phoebe = s("Phoebe") : r.Chrome = ((a) => a[0] ? a : r.Chromium)(s("Chrome"))) : / AppleWebKit\/\d/.test(t) ? (r.WebKit = s("AppleWebKit"), / CriOS \d/.test(t) ? r.Chrome = s("CriOS") : / FxiOS \d/.test(t) ? r.Firefox = s("FxiOS") : / EdgiOS\/\d/.test(t) ? r.Edge = s("EdgiOS") : / Version\/\d/.test(t) && (r.Safari = s("Version"))) : / Trident\/\d/.test(t) && (r.Trident = s("Trident"), r.InternetExplorer = ((a) => a[0] ? a : s("MSIE"))(s("rv")))), /[\[; ]FB(AN|_IAB)\//.test(t) && (r.Facebook = s("FBAV")), / Line\/\d/.test(t) && (r.LINE = s("Line")), r;
    })({}), this.Env = { get: () => [this.OS, this.UA].reduce((r, o) => {
      for (const a in o) o[a] && r.push(a);
      return r;
    }, []) };
  }
}, ja = class extends Hs {
  get iOSRequest() {
    const e = js(), t = Vs();
    if (this.OS.iOS && !this.OS.iPadOS) return "mobile";
    if (this.OS.iPadOS) return /\(iPad;/.test(t) || e && /^iPad(OS)?$/.test(e.platform) ? "mobile" : "desktop";
  }
};
const li = new Hs();
new ja();
const ci = ":~:text=";
function Ha(n) {
  if (!n) return;
  const e = n.indexOf(ci);
  if (e === -1) return;
  const t = n.slice(e + ci.length).split("&")[0];
  if (t) try {
    let i = t.split(",");
    const s = { textStart: "" };
    return i.length > 1 && i[0].endsWith("-") && (s.prefix = decodeURIComponent(i[0].slice(0, -1)), i = i.slice(1)), i.length > 1 && i[i.length - 1].startsWith("-") && (s.suffix = decodeURIComponent(i[i.length - 1].slice(1)), i = i.slice(0, -1)), i.length === 0 || i[0] === "" ? void 0 : (s.textStart = decodeURIComponent(i[0]), i.length > 1 && (s.textEnd = decodeURIComponent(i[1])), s);
  } catch {
    return;
  }
}
const Ws = ["ADDRESS", "ARTICLE", "ASIDE", "BLOCKQUOTE", "BR", "DETAILS", "DIALOG", "DD", "DIV", "DL", "DT", "FIELDSET", "FIGCAPTION", "FIGURE", "FOOTER", "FORM", "H1", "H2", "H3", "H4", "H5", "H6", "HEADER", "HGROUP", "HR", "LI", "MAIN", "NAV", "OL", "P", "PRE", "SECTION", "TABLE", "UL", "TR", "TH", "TD", "COLGROUP", "COL", "CAPTION", "THEAD", "TBODY", "TFOOT"], Le = /[\t-\r -#%-\*,-\/:;\?@\[-\]_\{\}\x85\xA0\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u1680\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2000-\u200A\u2010-\u2029\u202F-\u2043\u2045-\u2051\u2053-\u205F\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E44\u3000-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC9\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDF3C-\uDF3E]|\uD807[\uDC41-\uDC45\uDC70\uDC71]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/u, Wa = /[^\t-\r -#%-\*,-\/:;\?@\[-\]_\{\}\x85\xA0\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u1680\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2000-\u200A\u2010-\u2029\u202F-\u2043\u2045-\u2051\u2053-\u205F\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E44\u3000-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC9\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDF3C-\uDF3E]|\uD807[\uDC41-\uDC45\uDC70\uDC71]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/u, Ks = (n, e, t) => {
  const i = [], s = e.createRange();
  for (s.selectNodeContents(t ?? e); !s.collapsed && i.length < 2; ) {
    let r;
    if (n.prefix) {
      const o = $e(n.prefix, s);
      if (o == null) break;
      st(s, o.startContainer, o.startOffset);
      const a = e.createRange();
      if (a.setStart(o.endContainer, o.endOffset), a.setEnd(s.endContainer, s.endOffset), qs(a), a.collapsed || (r = $e(n.textStart, a), r == null)) break;
      if (r.compareBoundaryPoints(Range.START_TO_START, a) !== 0) continue;
    } else {
      if (r = $e(n.textStart, s), r == null) break;
      st(s, r.startContainer, r.startOffset);
    }
    if (n.textEnd) {
      const o = e.createRange();
      o.setStart(r.endContainer, r.endOffset), o.setEnd(s.endContainer, s.endOffset);
      let a = !1;
      for (; !o.collapsed && i.length < 2; ) {
        const l = $e(n.textEnd, o);
        if (l == null) break;
        if (st(o, l.startContainer, l.startOffset), r.setEnd(l.endContainer, l.endOffset), n.suffix) {
          const c = ui(n.suffix, r, s, e);
          if (c === q.NO_SUFFIX_MATCH) break;
          if (c === q.SUFFIX_MATCH) {
            a = !0, i.push(r.cloneRange());
            continue;
          } else if (c === q.MISPLACED_SUFFIX) continue;
        } else a = !0, i.push(r.cloneRange());
      }
      if (!a) break;
    } else if (n.suffix) {
      const o = ui(n.suffix, r, s, e);
      if (o === q.NO_SUFFIX_MATCH) break;
      if (o === q.SUFFIX_MATCH) {
        i.push(r.cloneRange()), st(s, s.startContainer, s.startOffset);
        continue;
      } else if (o === q.MISPLACED_SUFFIX) continue;
    } else i.push(r.cloneRange());
  }
  return i;
}, q = { NO_SUFFIX_MATCH: 0, SUFFIX_MATCH: 1, MISPLACED_SUFFIX: 2 }, ui = (n, e, t, i) => {
  const s = i.createRange();
  s.setStart(e.endContainer, e.endOffset), s.setEnd(t.endContainer, t.endOffset), qs(s);
  const r = $e(n, s);
  return r == null ? q.NO_SUFFIX_MATCH : r.compareBoundaryPoints(Range.START_TO_START, s) !== 0 ? q.MISPLACED_SUFFIX : q.SUFFIX_MATCH;
}, st = (n, e, t) => {
  try {
    n.setStart(e, t + 1);
  } catch {
    n.setStartAfter(e);
  }
}, qs = (n) => {
  const e = Gs(n);
  let t = e.nextNode();
  for (; !n.collapsed && t != null; ) {
    if (t !== n.startContainer && n.setStart(t, 0), t.textContent.length > n.startOffset && !t.textContent[n.startOffset].match(/\s/)) return;
    try {
      n.setStart(t, n.startOffset + 1);
    } catch {
      t = e.nextNode(), t == null ? n.collapse() : n.setStart(t, 0);
    }
  }
}, Gs = (n) => (n.commonAncestorContainer.ownerDocument ?? n.commonAncestorContainer).createTreeWalker(n.commonAncestorContainer, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, { acceptNode: (e) => qa(e, n) }), Ka = (n) => {
  if (n.hidden === "until-found") return !0;
  const e = n.attributes;
  return !!(e && e.hidden && e.hidden.value === "until-found");
}, Nn = (n) => {
  let e = n;
  for (; e != null && !(e instanceof HTMLElement); ) e = e.parentNode;
  const t = e?.ownerDocument?.defaultView;
  if (e != null && t != null) {
    if (Ka(e)) return !0;
    const i = t.getComputedStyle(e);
    if (i.visibility === "hidden" || i.display === "none" || parseInt(i.height, 10) === 0 && i.overflowY != "visible" || parseInt(i.width, 10) === 0 && i.overflowX != "visible" || parseInt(i.opacity, 10) === 0) return !1;
  }
  return !0;
}, Xs = (n, e) => e != null && !e.intersectsNode(n) ? NodeFilter.FILTER_REJECT : Nn(n) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT, qa = (n, e) => e != null && !e.intersectsNode(n) || !Nn(n) ? NodeFilter.FILTER_REJECT : n.nodeType === Node.TEXT_NODE ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP, Ga = (n, e) => {
  const t = [];
  let i = [];
  const s = Array.from(Ja(n, (r) => Xs(r, e)));
  for (const r of s) r.nodeType === Node.TEXT_NODE ? i.push(r) : r instanceof HTMLElement && Ws.includes(r.tagName.toUpperCase()) && i.length > 0 && (t.push(i), i = []);
  return i.length > 0 && t.push(i), t;
}, Xa = (n, e, t) => {
  let i = "";
  return n.length === 1 ? i = n[0].textContent.substring(e, t) : i = n[0].textContent.substring(e) + n.slice(1, -1).reduce((s, r) => s + r.textContent, "") + n.slice(-1)[0].textContent.substring(0, t), i.replace(/[\t\n\r ]+/g, " ");
};
function* Ja(n, e) {
  const t = (n.ownerDocument ?? n).createTreeWalker(n, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, { acceptNode: e }), i = /* @__PURE__ */ new Set();
  for (; Ys(t, i) !== null; ) yield t.currentNode;
}
const $e = (n, e) => {
  const t = Ga(e.commonAncestorContainer, e), i = Js(e.commonAncestorContainer.ownerDocument ?? void 0);
  for (const s of t) {
    const r = Ya(n, e, s, i);
    if (r !== void 0) return r;
  }
}, Ya = (n, e, t, i) => {
  if (!n || !e || !(t || []).length) return;
  const s = t[0] === e.startContainer ? e.startOffset : 0, r = Y(Xa(t, s, void 0)), o = Y(n);
  let a = 0, l, c;
  for (; a < r.length; ) {
    const u = r.indexOf(o, a);
    if (u === -1) return;
    if (Qa(r, u, o.length, i)) {
      const h = Y(t[0].data.slice(0, s)).length;
      l = hi(h + u, t, !1), c = hi(h + u + o.length, t, !0);
    }
    if (l != null && c != null) {
      const h = new Range();
      if (h.setStart(l.node, l.offset), h.setEnd(c.node, c.offset), e.compareBoundaryPoints(Range.START_TO_START, h) <= 0 && e.compareBoundaryPoints(Range.END_TO_END, h) >= 0) return h;
    }
    a = u + 1;
  }
}, hi = (n, e, t) => {
  let i = 0, s;
  for (let r = 0; r < e.length; r++) {
    const o = e[r];
    s || (s = Y(o.data));
    let a = i + s.length;
    if (t && (a += 1), a > n) {
      const l = n - i;
      let c = Math.min(n - i, o.data.length);
      const u = t ? s.substring(0, l) : s.substring(l);
      let h = Y(t ? o.data.substring(0, c) : o.data.substring(c));
      const d = (t ? -1 : 1) * (u.length > h.length ? -1 : 1);
      for (; c >= 0 && c <= o.data.length; ) {
        if (h.length === u.length) return { node: o, offset: c };
        c += d, h = Y(t ? o.data.substring(0, c) : o.data.substring(c));
      }
    }
    if (i += s.length, r + 1 < e.length) {
      const l = Y(e[r + 1].data);
      s.slice(-1) === " " && l.slice(0, 1) === " " && (i -= 1), s = l;
    }
  }
}, Qa = (n, e, t, i) => {
  if (e < 0 || e >= n.length || t <= 0 || e + t > n.length) return !1;
  if (i) {
    const s = i.segment(n), r = s.containing(e);
    if (!r || r.isWordLike && r.index != e) return !1;
    const o = e + t, a = s.containing(o);
    if (a && a.isWordLike && a.index != o) return !1;
  } else if (n[e].match(Le) && (++e, --t, !t) || n[e + t - 1].match(Le) && (--t, !t) || e !== 0 && !n[e - 1].match(Le) || e + t !== n.length && !n[e + t].match(Le)) return !1;
  return !0;
}, Y = (n) => (n || "").normalize("NFKD").replace(/\s+/g, " ").replace(/[\u0300-\u036f]/g, "").toLowerCase(), Js = (n) => {
  if (Intl.Segmenter) {
    const e = n?.documentElement?.lang || n?.defaultView?.navigator?.language || void 0;
    return new Intl.Segmenter(e, { granularity: "word" });
  }
}, Ys = (n, e) => {
  if (!e.has(n.currentNode)) {
    const s = n.firstChild();
    if (s !== null) return s;
  }
  const t = n.nextSibling();
  if (t !== null) return t;
  const i = n.parentNode();
  return i !== null && e.add(i), i;
}, Za = (n, e) => {
  if (!e.has(n.currentNode)) {
    const s = n.lastChild();
    if (s !== null) return s;
  }
  const t = n.previousSibling();
  if (t !== null) return t;
  const i = n.parentNode();
  return i !== null && e.add(i), i;
}, k = { BLOCK_ELEMENTS: Ws, BOUNDARY_CHARS: Le, NON_BOUNDARY_CHARS: Wa, acceptNodeIfVisibleInRange: Xs, normalizeString: Y, makeNewSegmenter: Js, forwardTraverse: Ys, backwardTraverse: Za, makeTextNodeWalker: Gs, isNodeVisible: Nn }, el = 300, Qs = 20, tl = 1, di = 3, fi = 1;
let nl = 500, Zs;
class er extends Error {
  constructor() {
    super(...arguments), this.isTimeout = !0;
  }
}
const ne = { SUCCESS: 0, INVALID_SELECTION: 1, AMBIGUOUS: 2, TIMEOUT: 3, EXECUTION_FAILED: 4 }, il = (n, e = Date.now()) => {
  try {
    return sl(n, e);
  } catch (t) {
    return t instanceof er ? { status: ne.TIMEOUT } : { status: ne.EXECUTION_FAILED };
  }
}, sl = (n, e) => {
  ol(e);
  const t = n.startContainer.ownerDocument, i = rl(t);
  fl(n), ml(n);
  const s = n.cloneRange();
  if (gl(n), n.collapsed) return { status: ne.INVALID_SELECTION };
  let r;
  if (ll(n)) {
    const h = k.normalizeString(n.toString()), d = { textStart: h };
    if (h.length >= Qs && nr(d, t, i)) return { status: ne.SUCCESS, fragment: d };
    r = new Gt(t, i).setExactTextMatch(h);
  } else {
    const h = gi(n), d = pi(n);
    h && d ? r = new Gt(t, i).setStartAndEndSearchSpace(h, d) : r = new Gt(t, i).setSharedSearchSpace(n.toString().trim());
  }
  const o = t.createRange();
  o.selectNodeContents(i);
  const a = o.cloneRange();
  o.setEnd(s.startContainer, s.startOffset), a.setStart(s.endContainer, s.endOffset);
  const l = pi(o), c = gi(a);
  (l || c) && r.setPrefixAndSuffixSearchSpace(l, c), r.useSegmenter(k.makeNewSegmenter(t));
  let u = !1;
  do {
    L(), u = r.embiggen();
    const h = r.tryToMakeUniqueFragment();
    if (h != null) return { status: ne.SUCCESS, fragment: h };
  } while (u);
  return { status: ne.AMBIGUOUS };
}, rl = (n) => n.querySelector("body") ?? n.documentElement, L = () => {
  const n = Date.now() - Zs;
  if (n > nl) throw new er(`Fragment generation timed out after ${n} ms.`);
}, ol = (n) => {
  Zs = n;
}, gi = (n) => {
  let e = Je(n);
  const t = ce(e, n.endContainer);
  if (!t) return;
  const i = /* @__PURE__ */ new Set();
  n.startContainer.nodeType === Node.ELEMENT_NODE && n.startOffset === n.startContainer.childNodes.length && i.add(n.startContainer);
  const s = e, r = new tr(n, !0), o = n.cloneRange();
  for (; !o.collapsed && e != null; ) {
    if (L(), e.contains?.(s) ? o.setStartAfter(e) : o.setStartBefore(e), r.appendNode(e), r.textInBlock !== null) return r.textInBlock;
    e = k.forwardTraverse(t, i);
  }
}, pi = (n) => {
  let e = Lt(n);
  const t = ce(e, n.startContainer);
  if (!t) return;
  const i = /* @__PURE__ */ new Set();
  n.endContainer.nodeType === Node.ELEMENT_NODE && n.endOffset === 0 && i.add(n.endContainer);
  const s = e, r = new tr(n, !1), o = n.cloneRange();
  for (; !o.collapsed && e != null; ) {
    if (L(), e.contains?.(s) ? o.setEnd(e, 0) : o.setEndAfter(e), r.appendNode(e), r.textInBlock !== null) return r.textInBlock;
    e = k.backwardTraverse(t, i);
  }
}, al = { ALL_PARTS: 1, SHARED_START_AND_END: 2, CONTEXT_ONLY: 3 };
let Gt = class {
  constructor(e, t) {
    this.Mode = al, this.startOffset = null, this.endOffset = null, this.prefixOffset = null, this.suffixOffset = null, this.prefixSearchSpace = "", this.backwardsPrefixSearchSpace = "", this.suffixSearchSpace = "", this.numIterations = 0, this.doc = e, this.root = t;
  }
  tryToMakeUniqueFragment() {
    let e;
    if (this.mode === this.Mode.CONTEXT_ONLY ? e = { textStart: this.exactTextMatch } : e = { textStart: this.getStartSearchSpace().substring(0, this.startOffset).trim(), textEnd: this.getEndSearchSpace().substring(this.endOffset).trim() }, this.prefixOffset != null) {
      const t = this.getPrefixSearchSpace().substring(this.prefixOffset).trim();
      t && (e.prefix = t);
    }
    if (this.suffixOffset != null) {
      const t = this.getSuffixSearchSpace().substring(0, this.suffixOffset).trim();
      t && (e.suffix = t);
    }
    return nr(e, this.doc, this.root) ? e : void 0;
  }
  embiggen() {
    let e = !0;
    if (this.mode === this.Mode.SHARED_START_AND_END ? this.startOffset >= this.endOffset && (e = !1) : this.mode === this.Mode.ALL_PARTS ? this.startOffset === this.getStartSearchSpace().length && this.backwardsEndOffset() === this.getEndSearchSpace().length && (e = !1) : this.mode === this.Mode.CONTEXT_ONLY && (e = !1), e) {
      const i = this.getNumberOfRangeWordsToAdd();
      if (this.startOffset < this.getStartSearchSpace().length) {
        let s = 0;
        if (this.getStartSegments() != null) for (; s < i && this.startOffset < this.getStartSearchSpace().length; ) this.startOffset = this.getNextOffsetForwards(this.getStartSegments(), this.startOffset, this.getStartSearchSpace()), s++;
        else {
          let r = this.startOffset;
          do {
            L();
            const o = this.getStartSearchSpace().substring(this.startOffset + 1).search(k.BOUNDARY_CHARS);
            o === -1 ? this.startOffset = this.getStartSearchSpace().length : this.startOffset = this.startOffset + 1 + o, this.getStartSearchSpace().substring(r, this.startOffset).search(k.NON_BOUNDARY_CHARS) !== -1 && (r = this.startOffset, s++);
          } while (this.startOffset < this.getStartSearchSpace().length && s < i);
        }
        this.mode === this.Mode.SHARED_START_AND_END && (this.startOffset = Math.min(this.startOffset, this.endOffset));
      }
      if (this.backwardsEndOffset() < this.getEndSearchSpace().length) {
        let s = 0;
        if (this.getEndSegments() != null) for (; s < i && this.endOffset > 0; ) this.endOffset = this.getNextOffsetBackwards(this.getEndSegments(), this.endOffset), s++;
        else {
          let r = this.backwardsEndOffset();
          do {
            L();
            const o = this.getBackwardsEndSearchSpace().substring(this.backwardsEndOffset() + 1).search(k.BOUNDARY_CHARS);
            o === -1 ? this.setBackwardsEndOffset(this.getEndSearchSpace().length) : this.setBackwardsEndOffset(this.backwardsEndOffset() + 1 + o), this.getBackwardsEndSearchSpace().substring(r, this.backwardsEndOffset()).search(k.NON_BOUNDARY_CHARS) !== -1 && (r = this.backwardsEndOffset(), s++);
          } while (this.backwardsEndOffset() < this.getEndSearchSpace().length && s < i);
        }
        this.mode === this.Mode.SHARED_START_AND_END && (this.endOffset = Math.max(this.startOffset, this.endOffset));
      }
    }
    let t = !1;
    if ((!e || this.startOffset + this.backwardsEndOffset() < Qs || this.numIterations >= tl) && (this.backwardsPrefixOffset() != null && this.backwardsPrefixOffset() !== this.getPrefixSearchSpace().length || this.suffixOffset != null && this.suffixOffset !== this.getSuffixSearchSpace().length) && (t = !0), t) {
      const i = this.getNumberOfContextWordsToAdd();
      if (this.backwardsPrefixOffset() < this.getPrefixSearchSpace().length) {
        let s = 0;
        if (this.getPrefixSegments() != null) for (; s < i && this.prefixOffset > 0; ) this.prefixOffset = this.getNextOffsetBackwards(this.getPrefixSegments(), this.prefixOffset), s++;
        else {
          let r = this.backwardsPrefixOffset();
          do {
            L();
            const o = this.getBackwardsPrefixSearchSpace().substring(this.backwardsPrefixOffset() + 1).search(k.BOUNDARY_CHARS);
            o === -1 ? this.setBackwardsPrefixOffset(this.getBackwardsPrefixSearchSpace().length) : this.setBackwardsPrefixOffset(this.backwardsPrefixOffset() + 1 + o), this.getBackwardsPrefixSearchSpace().substring(r, this.backwardsPrefixOffset()).search(k.NON_BOUNDARY_CHARS) !== -1 && (r = this.backwardsPrefixOffset(), s++);
          } while (this.backwardsPrefixOffset() < this.getPrefixSearchSpace().length && s < i);
        }
      }
      if (this.suffixOffset < this.getSuffixSearchSpace().length) {
        let s = 0;
        if (this.getSuffixSegments() != null) for (; s < i && this.suffixOffset < this.getSuffixSearchSpace().length; ) this.suffixOffset = this.getNextOffsetForwards(this.getSuffixSegments(), this.suffixOffset, this.getSuffixSearchSpace()), s++;
        else {
          let r = this.suffixOffset;
          do {
            L();
            const o = this.getSuffixSearchSpace().substring(this.suffixOffset + 1).search(k.BOUNDARY_CHARS);
            o === -1 ? this.suffixOffset = this.getSuffixSearchSpace().length : this.suffixOffset = this.suffixOffset + 1 + o, this.getSuffixSearchSpace().substring(r, this.suffixOffset).search(k.NON_BOUNDARY_CHARS) !== -1 && (r = this.suffixOffset, s++);
          } while (this.suffixOffset < this.getSuffixSearchSpace().length && s < i);
        }
      }
    }
    return this.numIterations++, e || t;
  }
  setStartAndEndSearchSpace(e, t) {
    return this.startSearchSpace = e, this.endSearchSpace = t, this.backwardsEndSearchSpace = ft(t), this.startOffset = 0, this.endOffset = t.length, this.mode = this.Mode.ALL_PARTS, this;
  }
  setSharedSearchSpace(e) {
    return this.sharedSearchSpace = e, this.backwardsSharedSearchSpace = ft(e), this.startOffset = 0, this.endOffset = e.length, this.mode = this.Mode.SHARED_START_AND_END, this;
  }
  setExactTextMatch(e) {
    return this.exactTextMatch = e, this.mode = this.Mode.CONTEXT_ONLY, this;
  }
  setPrefixAndSuffixSearchSpace(e, t) {
    return e && (this.prefixSearchSpace = e, this.backwardsPrefixSearchSpace = ft(e), this.prefixOffset = e.length), t && (this.suffixSearchSpace = t, this.suffixOffset = 0), this;
  }
  useSegmenter(e) {
    return e == null ? this : (this.mode === this.Mode.ALL_PARTS ? (this.startSegments = e.segment(this.startSearchSpace), this.endSegments = e.segment(this.endSearchSpace)) : this.mode === this.Mode.SHARED_START_AND_END && (this.sharedSegments = e.segment(this.sharedSearchSpace)), this.prefixSearchSpace && (this.prefixSegments = e.segment(this.prefixSearchSpace)), this.suffixSearchSpace && (this.suffixSegments = e.segment(this.suffixSearchSpace)), this);
  }
  getNumberOfContextWordsToAdd() {
    return this.backwardsPrefixOffset() === 0 && this.suffixOffset === 0 ? di : fi;
  }
  getNumberOfRangeWordsToAdd() {
    return this.startOffset === 0 && this.backwardsEndOffset() === 0 ? di : fi;
  }
  getNextOffsetForwards(e, t, i) {
    let s = e.containing(t);
    for (; s != null; ) {
      L();
      const r = s.index + s.segment.length;
      if (s.isWordLike) return r;
      s = e.containing(r);
    }
    return i.length;
  }
  getNextOffsetBackwards(e, t) {
    let i = e.containing(t);
    for ((!i || t == i.index) && (i = e.containing(t - 1)); i != null; ) {
      if (L(), i.isWordLike) return i.index;
      i = e.containing(i.index - 1);
    }
    return 0;
  }
  getStartSearchSpace() {
    return this.mode === this.Mode.SHARED_START_AND_END ? this.sharedSearchSpace : this.startSearchSpace;
  }
  getStartSegments() {
    return this.mode === this.Mode.SHARED_START_AND_END ? this.sharedSegments : this.startSegments;
  }
  getEndSearchSpace() {
    return this.mode === this.Mode.SHARED_START_AND_END ? this.sharedSearchSpace : this.endSearchSpace;
  }
  getEndSegments() {
    return this.mode === this.Mode.SHARED_START_AND_END ? this.sharedSegments : this.endSegments;
  }
  getBackwardsEndSearchSpace() {
    return this.mode === this.Mode.SHARED_START_AND_END ? this.backwardsSharedSearchSpace : this.backwardsEndSearchSpace;
  }
  getPrefixSearchSpace() {
    return this.prefixSearchSpace;
  }
  getPrefixSegments() {
    return this.prefixSegments;
  }
  getBackwardsPrefixSearchSpace() {
    return this.backwardsPrefixSearchSpace;
  }
  getSuffixSearchSpace() {
    return this.suffixSearchSpace;
  }
  getSuffixSegments() {
    return this.suffixSegments;
  }
  backwardsEndOffset() {
    return this.getEndSearchSpace().length - this.endOffset;
  }
  setBackwardsEndOffset(e) {
    this.endOffset = this.getEndSearchSpace().length - e;
  }
  backwardsPrefixOffset() {
    return this.prefixOffset == null ? null : this.getPrefixSearchSpace().length - this.prefixOffset;
  }
  setBackwardsPrefixOffset(e) {
    this.prefixOffset != null && (this.prefixOffset = this.getPrefixSearchSpace().length - e);
  }
};
class tr {
  constructor(e, t) {
    this.textFound = !1, this.textNodes = [], this.textInBlock = null, this.searchRange = e, this.isForwardTraversal = t;
  }
  appendNode(e) {
    if (this.textInBlock !== null) return;
    if (Z(e)) {
      this.textFound ? (this.isForwardTraversal || this.textNodes.reverse(), this.textInBlock = this.textNodes.map((i) => i.textContent).join("").trim()) : this.textNodes = [];
      return;
    }
    if (!Tn(e)) return;
    const t = this.getNodeIntersectionWithRange(e);
    this.textFound = this.textFound || (t.textContent ?? "").trim() !== "", this.textNodes.push(t);
  }
  getNodeIntersectionWithRange(e) {
    let t = null, i = null;
    const s = (e.textContent ?? "").length;
    return e === this.searchRange.startContainer && this.searchRange.startOffset !== 0 && (t = this.searchRange.startOffset), e === this.searchRange.endContainer && this.searchRange.endOffset !== s && (i = this.searchRange.endOffset), t !== null || i !== null ? { textContent: (e.textContent ?? "").substring(t ?? 0, i ?? s) } : e;
  }
}
const nr = (n, e, t) => Ks(n, e, t).length === 1, ft = (n) => [...n || ""].reverse().join(""), ll = (n) => n.toString().length > el ? !1 : !hl(n), Je = (n) => {
  let e = n.startContainer;
  return e.nodeType == Node.ELEMENT_NODE && n.startOffset < e.childNodes.length && (e = e.childNodes[n.startOffset]), e;
}, Lt = (n) => {
  let e = n.endContainer;
  return e.nodeType == Node.ELEMENT_NODE && n.endOffset > 0 && (e = e.childNodes[n.endOffset - 1]), e;
}, cl = (n) => {
  const e = Je(n);
  if (Tn(e) && k.isNodeVisible(e)) return e;
  const t = k.makeTextNodeWalker(n);
  return t.currentNode = e, t.nextNode();
}, ul = (n) => {
  const e = Lt(n);
  if (Tn(e) && k.isNodeVisible(e)) return e;
  const t = k.makeTextNodeWalker(n);
  return t.currentNode = e, k.backwardTraverse(t, /* @__PURE__ */ new Set());
}, hl = (n) => {
  const e = n.cloneRange();
  let t = Je(e);
  const i = ce(t);
  if (!i) return !1;
  const s = /* @__PURE__ */ new Set();
  for (; !e.collapsed && t != null; ) {
    if (Z(t)) return !0;
    t != null && e.setStartAfter(t), t = k.forwardTraverse(i, s), L();
  }
  return !1;
}, mi = (n, e) => {
  if (n.nodeType !== Node.TEXT_NODE) return -1;
  const t = n, i = e ?? t.data.length;
  if (i < t.data.length && k.BOUNDARY_CHARS.test(t.data[i])) return i;
  const s = t.data.substring(0, i), r = ft(s).search(k.BOUNDARY_CHARS);
  return r !== -1 ? i - r : -1;
}, dl = (n, e) => {
  if (n.nodeType !== Node.TEXT_NODE) return -1;
  const t = n, i = e ?? 0;
  if (i < t.data.length && i > 0 && k.BOUNDARY_CHARS.test(t.data[i - 1])) return i;
  const s = t.data.substring(i).search(k.BOUNDARY_CHARS);
  return s !== -1 ? i + s : -1;
}, ce = (n, e) => {
  if (!n) return;
  let t = n;
  const i = e ?? n;
  for (; !t.contains?.(i) || !Z(t); ) t.parentNode && (t = t.parentNode);
  const s = (t.ownerDocument ?? t).createTreeWalker(t, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, { acceptNode: (r) => k.acceptNodeIfVisibleInRange(r) });
  return s.currentNode = n, s;
}, fl = (n) => {
  const e = k.makeNewSegmenter(n.startContainer.ownerDocument ?? void 0);
  if (e) {
    const t = Je(n);
    t !== n.startContainer && n.setStartBefore(t), ir(e, !1, n);
  } else {
    const t = mi(n.startContainer, n.startOffset);
    if (t !== -1) {
      n.setStart(n.startContainer, t);
      return;
    }
    if (Z(n.startContainer) && n.startOffset === 0) return;
    const i = ce(n.startContainer);
    if (!i) return;
    const s = /* @__PURE__ */ new Set();
    let r = k.backwardTraverse(i, s);
    for (; r != null; ) {
      const o = mi(r);
      if (o !== -1) {
        n.setStart(r, o);
        return;
      }
      if (Z(r)) {
        r.contains?.(n.startContainer) ? n.setStart(r, 0) : n.setStartAfter(r);
        return;
      }
      r = k.backwardTraverse(i, s), n.collapse();
    }
  }
}, gl = (n) => {
  const e = cl(n);
  if (e == null) {
    n.collapse();
    return;
  }
  Je(n) !== e && n.setStart(e, 0);
  const t = Lt(n), i = ul(n);
  t !== i && n.setEnd(i, (i.textContent ?? "").length);
}, ir = (n, e, t) => {
  const i = e ? { node: t.endContainer, offset: t.endOffset } : { node: t.startContainer, offset: t.startOffset }, s = pl(i.node);
  if (!s) return;
  const r = s.preNodes.reduce((g, p) => g.concat(p.textContent ?? ""), ""), o = s.innerNodes.reduce((g, p) => g.concat(p.textContent ?? ""), "");
  let a = r.length;
  i.node.nodeType === Node.TEXT_NODE ? a += i.offset : e && (a += o.length);
  const l = s.postNodes.reduce((g, p) => g.concat(p.textContent ?? ""), ""), c = [...s.preNodes, ...s.innerNodes, ...s.postNodes];
  if (c.length == 0) return;
  const u = r.concat(o, l), h = n.segment(u).containing(a);
  if (!h) {
    e ? t.setEndAfter(c[c.length - 1]) : t.setEndBefore(c[0]);
    return;
  }
  if (!h.isWordLike || a === h.index || a === h.index + h.segment.length) return;
  const d = e ? h.index + h.segment.length : h.index;
  let f = 0;
  for (const g of c) {
    const p = (g.textContent ?? "").length;
    if (f <= d && d < f + p) {
      const m = d - f;
      e ? m >= p ? t.setEndAfter(g) : t.setEnd(g, m) : m >= p ? t.setStartAfter(g) : t.setStart(g, m);
      return;
    }
    f += p;
  }
  e ? t.setEndAfter(c[c.length - 1]) : t.setStartBefore(c[0]);
}, pl = (n) => {
  const e = [], t = ce(n);
  if (!t) return;
  const i = /* @__PURE__ */ new Set();
  let s = k.backwardTraverse(t, i);
  for (; s != null && !Z(s); ) L(), s.nodeType === Node.TEXT_NODE && e.push(s), s = k.backwardTraverse(t, i);
  e.reverse();
  const r = [];
  if (n.nodeType === Node.TEXT_NODE) r.push(n);
  else {
    const u = (n.ownerDocument ?? n).createTreeWalker(n, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, { acceptNode: (d) => k.acceptNodeIfVisibleInRange(d) });
    u.currentNode = n;
    let h = u.nextNode();
    for (; h != null; ) L(), h.nodeType === Node.TEXT_NODE && r.push(h), h = u.nextNode();
  }
  const o = [], a = ce(n);
  if (!a) return;
  const l = /* @__PURE__ */ new Set([n]);
  let c = k.forwardTraverse(a, l);
  for (; c != null && !Z(c); ) L(), c.nodeType === Node.TEXT_NODE && o.push(c), c = k.forwardTraverse(a, l);
  return { preNodes: e, innerNodes: r, postNodes: o };
}, ml = (n) => {
  const e = k.makeNewSegmenter(n.endContainer.ownerDocument ?? void 0);
  if (e) {
    const t = Lt(n);
    t !== n.endContainer && n.setEndAfter(t), ir(e, !0, n);
  } else {
    let t = n.endOffset, i = n.endContainer;
    i.nodeType === Node.ELEMENT_NODE && n.endOffset < i.childNodes.length && (i = i.childNodes[n.endOffset]);
    const s = ce(i);
    if (!s) return;
    const r = /* @__PURE__ */ new Set([i]);
    for (; i != null; ) {
      L();
      const o = dl(i, t);
      if (t = null, o !== -1) {
        n.setEnd(i, o);
        return;
      }
      if (Z(i)) {
        i.contains?.(n.endContainer) ? n.setEnd(i, i.childNodes.length) : n.setEndBefore(i);
        return;
      }
      i = k.forwardTraverse(s, r);
    }
    n.collapse();
  }
}, Z = (n) => n.nodeType === Node.ELEMENT_NODE && (k.BLOCK_ELEMENTS.includes(n.tagName.toUpperCase()) || n.tagName.toUpperCase() === "HTML" || n.tagName.toUpperCase() === "BODY"), Tn = (n) => n.nodeType === Node.TEXT_NODE;
function un(n) {
  return n.otherLocations?.get("cssSelector");
}
function Sl(n) {
  return Bs.deserialize(n.otherLocations?.get("domRange"));
}
function yl(n) {
  for (const e of n.fragments) {
    const t = Ha(e);
    if (t) return t;
  }
}
let pe = class sr {
  constructor(e) {
    this.fragments = e.fragments ? e.fragments : new Array(), this.progression = e.progression, this.totalProgression = e.totalProgression, this.position = e.position, this.otherLocations = e.otherLocations;
  }
  static deserialize(e) {
    if (!e) return;
    const t = dt(e.progression), i = dt(e.totalProgression), s = dt(e.position), r = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Set(["fragment", "fragments", "progression", "totalProgression", "position", "otherLocations"]);
    return Object.entries(e).forEach(([a, l]) => {
      o.has(a) || r.set(a, l);
    }), e.otherLocations instanceof Map && e.otherLocations.forEach((a, l) => r.set(l, a)), new sr({ fragments: Ma(e.fragments || e.fragment), progression: t !== void 0 && t >= 0 && t <= 1 ? t : void 0, totalProgression: i !== void 0 && i >= 0 && i <= 1 ? i : void 0, position: s !== void 0 && s > 0 ? s : void 0, otherLocations: r.size === 0 ? void 0 : r });
  }
  serialize() {
    const e = {};
    return this.fragments && (e.fragments = this.fragments), this.progression !== void 0 && (e.progression = this.progression), this.totalProgression !== void 0 && (e.totalProgression = this.totalProgression), this.position !== void 0 && (e.position = this.position), this.otherLocations && this.otherLocations.forEach((t, i) => e[i] = t), e;
  }
}, rr = class or {
  constructor(e) {
    this.after = e.after, this.before = e.before, this.highlight = e.highlight;
  }
  static deserialize(e) {
    if (e) return new or({ after: e.after, before: e.before, highlight: e.highlight });
  }
  serialize() {
    const e = {};
    return this.after !== void 0 && (e.after = this.after), this.before !== void 0 && (e.before = this.before), this.highlight !== void 0 && (e.highlight = this.highlight), e;
  }
}, ar = class hn {
  constructor(e) {
    const t = e.href.indexOf("#"), i = t >= 0 ? e.href.slice(t + 1) : void 0;
    this.href = t >= 0 ? e.href.slice(0, t) : e.href, this.type = e.type, this.title = e.title;
    const s = e.locations?.fragments, r = i && (!s || s.length === 0);
    this.locations = e.locations ? r ? new pe({ ...e.locations, fragments: [i] }) : e.locations : i ? new pe({ fragments: [i] }) : new pe({}), this.text = e.text;
  }
  static deserialize(e) {
    if (e && e.href && e.type) return new hn({ href: e.href, type: e.type, title: e.title, locations: pe.deserialize(e.locations), text: rr.deserialize(e.text) });
  }
  serialize() {
    const e = { href: this.href, type: this.type };
    return this.title !== void 0 && (e.title = this.title), this.locations && (e.locations = this.locations.serialize()), this.text && (e.text = this.text.serialize()), e;
  }
  copyWithLocations(e) {
    return new hn({ href: this.href, type: this.type, title: this.title, text: this.text, locations: new pe({ ...this.locations, ...e }) });
  }
};
function Si(n) {
  return n.split("").reverse().join("");
}
function bl(n, e, t) {
  const i = Si(e);
  return t.map((s) => {
    const r = Math.max(0, s.end - e.length - s.errors), o = Si(n.slice(r, s.end));
    return { start: lr(o, i, s.errors).reduce((a, l) => s.end - l.end < a ? s.end - l.end : a, s.end), end: s.end, errors: s.errors };
  });
}
function Xt(n) {
  return (n | -n) >> 31 & 1;
}
function yi(n, e, t, i) {
  let s = n.P[t], r = n.M[t];
  const o = i >>> 31, a = e[t] | o, l = a | r, c = (a & s) + s ^ s | a;
  let u = r | ~(c | s), h = s & c;
  const d = Xt(u & n.lastRowMask[t]) - Xt(h & n.lastRowMask[t]);
  return u <<= 1, h <<= 1, h |= o, u |= Xt(i) - o, s = h | ~(l | u), r = u & l, n.P[t] = s, n.M[t] = r, d;
}
function lr(n, e, t) {
  if (e.length === 0) return [];
  t = Math.min(t, e.length);
  const i = [], s = 32, r = Math.ceil(e.length / s) - 1, o = { P: new Uint32Array(r + 1), M: new Uint32Array(r + 1), lastRowMask: new Uint32Array(r + 1) };
  o.lastRowMask.fill(1 << 31), o.lastRowMask[r] = 1 << (e.length - 1) % s;
  const a = new Uint32Array(r + 1), l = /* @__PURE__ */ new Map(), c = [];
  for (let d = 0; d < 256; d++) c.push(a);
  for (let d = 0; d < e.length; d += 1) {
    const f = e.charCodeAt(d);
    if (l.has(f)) continue;
    const g = new Uint32Array(r + 1);
    l.set(f, g), f < c.length && (c[f] = g);
    for (let p = 0; p <= r; p += 1) {
      g[p] = 0;
      for (let m = 0; m < s; m += 1) {
        const b = p * s + m;
        b >= e.length || e.charCodeAt(b) === f && (g[p] |= 1 << m);
      }
    }
  }
  let u = Math.max(0, Math.ceil(t / s) - 1);
  const h = new Uint32Array(r + 1);
  for (let d = 0; d <= u; d += 1) h[d] = (d + 1) * s;
  h[r] = e.length;
  for (let d = 0; d <= u; d += 1) o.P[d] = -1, o.M[d] = 0;
  for (let d = 0; d < n.length; d += 1) {
    const f = n.charCodeAt(d);
    let g;
    f < c.length ? g = c[f] : (g = l.get(f), typeof g > "u" && (g = a));
    let p = 0;
    for (let m = 0; m <= u; m += 1) p = yi(o, g, m, p), h[m] += p;
    if (h[u] - p <= t && u < r && (g[u + 1] & 1 || p < 0)) {
      u += 1, o.P[u] = -1, o.M[u] = 0;
      let m;
      if (u === r) {
        const b = e.length % s;
        m = b === 0 ? s : b;
      } else m = s;
      h[u] = h[u - 1] + m - p + yi(o, g, u, p);
    } else for (; u > 0 && h[u] >= t + s; ) u -= 1;
    u === r && h[u] <= t && (h[u] < t && i.splice(0, i.length), i.push({ start: -1, end: d + 1, errors: h[u] }), t = h[u]);
  }
  return i;
}
function vl(n, e, t) {
  const i = lr(n, e, t);
  return bl(n, e, i);
}
function cr(n, e, t) {
  let i = 0;
  const s = [];
  for (; i !== -1; ) i = n.indexOf(e, i), i !== -1 && (s.push({ start: i, end: i + e.length, errors: 0 }), i += 1);
  return s.length > 0 ? s : vl(n, e, t);
}
function bi(n, e) {
  return e.length === 0 || n.length === 0 ? 0 : 1 - cr(n, e, e.length)[0].errors / e.length;
}
function wl(n, e, t = {}) {
  if (e.length === 0) return null;
  const i = Math.min(256, e.length / 2), s = cr(n, e, i);
  if (s.length === 0) return null;
  const r = (a) => {
    const l = 1 - a.errors / e.length, c = t.prefix ? bi(n.slice(Math.max(0, a.start - t.prefix.length), a.start), t.prefix) : 1, u = t.suffix ? bi(n.slice(a.end, a.end + t.suffix.length), t.suffix) : 1;
    let h = 1;
    return typeof t.hint == "number" && (h = 1 - Math.abs(a.start - t.hint) / n.length), (50 * l + 20 * c + 20 * u + 2 * h) / 92;
  }, o = s.map((a) => ({ start: a.start, end: a.end, score: r(a) }));
  return o.sort((a, l) => l.score - a.score), o[0];
}
function dn(n, e, t) {
  const i = t === 1 ? e : e - 1;
  if (n.charAt(i).trim() !== "") return e;
  let s, r;
  if (t === 2 ? (s = n.substring(0, e), r = s.trimEnd()) : (s = n.substring(e), r = s.trimStart()), !r.length) return -1;
  const o = s.length - r.length;
  return t === 2 ? e - o : e + o;
}
function vi(n, e) {
  const t = n.commonAncestorContainer.ownerDocument.createNodeIterator(n.commonAncestorContainer, NodeFilter.SHOW_TEXT), i = e === 1 ? n.startContainer : n.endContainer, s = e === 1 ? n.endContainer : n.startContainer;
  let r = t.nextNode();
  for (; r && r !== i; ) r = t.nextNode();
  e === 2 && (r = t.previousNode());
  let o = -1;
  const a = () => {
    if (r = e === 1 ? t.nextNode() : t.previousNode(), r) {
      const l = r.textContent, c = e === 1 ? 0 : l.length;
      o = dn(l, c, e);
    }
  };
  for (; r && o === -1 && r !== s; ) a();
  if (r && o >= 0) return { node: r, offset: o };
  throw new RangeError("No text nodes with non-whitespace text found in range");
}
function xl(n) {
  if (!n.toString().trim().length) throw new RangeError("Range contains no non-whitespace text");
  if (n.startContainer.nodeType !== Node.TEXT_NODE) throw new RangeError("Range startContainer is not a text node");
  if (n.endContainer.nodeType !== Node.TEXT_NODE) throw new RangeError("Range endContainer is not a text node");
  const e = n.cloneRange();
  let t = !1, i = !1;
  const s = { start: dn(n.startContainer.textContent, n.startOffset, 1), end: dn(n.endContainer.textContent, n.endOffset, 2) };
  if (s.start >= 0 && (e.setStart(n.startContainer, s.start), t = !0), s.end > 0 && (e.setEnd(n.endContainer, s.end), i = !0), t && i) return e;
  if (!t) {
    const { node: r, offset: o } = vi(e, 1);
    r && o >= 0 && e.setStart(r, o);
  }
  if (!i) {
    const { node: r, offset: o } = vi(e, 2);
    r && o > 0 && e.setEnd(r, o);
  }
  return e;
}
function ur(n) {
  switch (n.nodeType) {
    case Node.ELEMENT_NODE:
    case Node.TEXT_NODE:
      return n.textContent?.length ?? 0;
    default:
      return 0;
  }
}
function wi(n) {
  let e = n.previousSibling, t = 0;
  for (; e; ) t += ur(e), e = e.previousSibling;
  return t;
}
function hr(n, ...e) {
  let t = e.shift();
  const i = n.ownerDocument.createNodeIterator(n, NodeFilter.SHOW_TEXT), s = [];
  let r = i.nextNode(), o, a = 0;
  for (; t !== void 0 && r; ) o = r, a + o.data.length > t ? (s.push({ node: o, offset: t - a }), t = e.shift()) : (r = i.nextNode(), a += o.data.length);
  for (; t !== void 0 && o && a === t; ) s.push({ node: o, offset: o.data.length }), t = e.shift();
  if (t !== void 0) throw new RangeError("Offset exceeds text length");
  return s;
}
let rt = class me {
  constructor(e, t) {
    if (t < 0) throw new Error("Offset is invalid");
    this.element = e, this.offset = t;
  }
  relativeTo(e) {
    if (!e.contains(this.element)) throw new Error("Parent is not an ancestor of current element");
    let t = this.element, i = this.offset;
    for (; t !== e; ) i += wi(t), t = t.parentElement;
    return new me(t, i);
  }
  resolve(e = {}) {
    try {
      return hr(this.element, this.offset)[0];
    } catch (t) {
      if (this.offset === 0 && e.direction !== void 0) {
        const i = document.createTreeWalker(this.element.getRootNode(), NodeFilter.SHOW_TEXT);
        i.currentNode = this.element;
        const s = e.direction === 1, r = s ? i.nextNode() : i.previousNode();
        if (!r) throw t;
        return { node: r, offset: s ? 0 : r.data.length };
      } else throw t;
    }
  }
  static fromCharOffset(e, t) {
    switch (e.nodeType) {
      case Node.TEXT_NODE:
        return me.fromPoint(e, t);
      case Node.ELEMENT_NODE:
        return new me(e, t);
      default:
        throw new Error("Node is not an element or text node");
    }
  }
  static fromPoint(e, t) {
    switch (e.nodeType) {
      case Node.TEXT_NODE: {
        if (t < 0 || t > e.data.length) throw new Error("Text node offset is out of range");
        if (!e.parentElement) throw new Error("Text node has no parent");
        const i = wi(e) + t;
        return new me(e.parentElement, i);
      }
      case Node.ELEMENT_NODE: {
        if (t < 0 || t > e.childNodes.length) throw new Error("Child node offset is out of range");
        let i = 0;
        for (let s = 0; s < t; s++) i += ur(e.childNodes[s]);
        return new me(e, i);
      }
      default:
        throw new Error("Point is not in an element or text node");
    }
  }
}, fn = class Me {
  constructor(e, t) {
    this.start = e, this.end = t;
  }
  relativeTo(e) {
    return new Me(this.start.relativeTo(e), this.end.relativeTo(e));
  }
  toRange() {
    let e, t;
    this.start.element === this.end.element && this.start.offset <= this.end.offset ? [e, t] = hr(this.start.element, this.start.offset, this.end.offset) : (e = this.start.resolve({ direction: 1 }), t = this.end.resolve({ direction: 2 }));
    const i = new Range();
    return i.setStart(e.node, e.offset), i.setEnd(t.node, t.offset), i;
  }
  static fromRange(e) {
    const t = rt.fromPoint(e.startContainer, e.startOffset), i = rt.fromPoint(e.endContainer, e.endOffset);
    return new Me(t, i);
  }
  static fromOffsets(e, t, i) {
    return new Me(new rt(e, t), new rt(e, i));
  }
  static trimmedRange(e) {
    return xl(Me.fromRange(e).toRange());
  }
}, El = class gn {
  constructor(e, t, i) {
    this.root = e, this.start = t, this.end = i;
  }
  static fromRange(e, t) {
    const i = fn.fromRange(t).relativeTo(e);
    return new gn(e, i.start.offset, i.end.offset);
  }
  static fromSelector(e, t) {
    return new gn(e, t.start, t.end);
  }
  toSelector() {
    return { type: "TextPositionSelector", start: this.start, end: this.end };
  }
  toRange() {
    return fn.fromOffsets(this.root, this.start, this.end).toRange();
  }
}, Cl = class pn {
  constructor(e, t, i = {}) {
    this.root = e, this.exact = t, this.context = i;
  }
  static fromRange(e, t) {
    const i = e.textContent, s = fn.fromRange(t).relativeTo(e), r = s.start.offset, o = s.end.offset, a = 32;
    return new pn(e, i.slice(r, o), { prefix: i.slice(Math.max(0, r - a), r), suffix: i.slice(o, Math.min(i.length, o + a)) });
  }
  static fromSelector(e, t) {
    const { prefix: i, suffix: s } = t;
    return new pn(e, t.exact, { prefix: i, suffix: s });
  }
  toSelector() {
    return { type: "TextQuoteSelector", exact: this.exact, prefix: this.context.prefix, suffix: this.context.suffix };
  }
  toRange(e = {}) {
    return this.toPositionAnchor(e).toRange();
  }
  toPositionAnchor(e = {}) {
    const t = this.root.textContent, i = wl(t, this.exact, { ...this.context, hint: e.hint });
    if (!i) throw new Error("Quote not found");
    return new El(this.root, i.start, i.end);
  }
};
function kl(n) {
  const e = n.tagName.toUpperCase();
  return e === "IMG" || e === "VIDEO" || e === "AUDIO" || e === "IFRAME" || e === "OBJECT" || e === "EMBED" || e === "CANVAS";
}
function xi(n, e) {
  const t = e && un(e);
  let i = null;
  if (t) try {
    i = n.querySelector(t);
  } catch (s) {
    console.warn(`Invalid cssSelector: ${t}`, s);
  }
  return i ?? n.body ?? n.documentElement;
}
function Ei(n, e) {
  let t;
  try {
    t = n.querySelector(e.cssSelector);
  } catch (s) {
    return console.error(`Invalid domRange cssSelector: ${e.cssSelector}`, s), null;
  }
  if (!t) return console.error(`Can't resolve domRange cssSelector: ${e.cssSelector}`), null;
  let i = 0;
  for (const s of t.childNodes) if (s.nodeType === Node.TEXT_NODE) {
    if (i === e.textNodeIndex) return { node: s, offset: e.charOffset };
    i++;
  }
  return console.error(`Can't resolve domRange textNodeIndex ${e.textNodeIndex} for selector: ${e.cssSelector}`), null;
}
function Rl(n, e) {
  try {
    const t = e.locations, i = e.text;
    if (t) {
      const s = Sl(t);
      if (s) {
        const r = Ei(n, s.start), o = s.end ? Ei(n, s.end) : r;
        if (r && o) try {
          const a = n.createRange();
          return r.offset !== void 0 ? a.setStart(r.node, r.offset) : a.setStartBefore(r.node), o.offset !== void 0 ? a.setEnd(o.node, o.offset) : a.setEndBefore(o.node), a;
        } catch (a) {
          console.warn("Invalid domRange, falling back:", a);
        }
      }
    }
    if (t) {
      const s = yl(t);
      if (s) {
        const r = xi(n, t), o = Ks(s, n, r);
        if (o.length > 0) return o[0];
      }
    }
    if (i && i.highlight) {
      const s = xi(n, t), r = new Cl(s, i.highlight, { prefix: i.before, suffix: i.after });
      try {
        return r.toRange();
      } catch {
        return console.warn("Quote not found:", r), null;
      }
    }
    if (t) {
      let s = null;
      if (!s && un(t) && (s = n.querySelector(un(t))), !s && t.fragments) {
        for (const r of t.fragments) if (s = n.getElementById(r), s) break;
      }
      if (s) {
        const r = n.createRange();
        return s.childNodes.length === 0 || kl(s) ? (r.selectNode(s), r) : (r.setStartBefore(s), r.setEndAfter(s), r);
      }
    }
  } catch (t) {
    console.error(t);
  }
  return null;
}
function Al(n, e) {
  const t = e.map((l) => l.toUpperCase()), i = [], s = n.commonAncestorContainer, r = s.nodeType === Node.TEXT_NODE ? s.parentNode : s, o = n.startContainer.ownerDocument.createTreeWalker(r, NodeFilter.SHOW_TEXT);
  let a = o.nextNode();
  for (; a; ) {
    if (n.intersectsNode(a)) {
      let l = a.parentNode, c = !1;
      for (; l; ) {
        if (l.nodeType === Node.ELEMENT_NODE && t.includes(l.tagName.toUpperCase())) {
          c = !0;
          break;
        }
        l = l.parentNode;
      }
      if (!c) {
        const u = n.cloneRange();
        u.selectNode(a), u.compareBoundaryPoints(Range.START_TO_START, n) < 0 && u.setStart(n.startContainer, n.startOffset), u.compareBoundaryPoints(Range.END_TO_END, n) > 0 && u.setEnd(n.endContainer, n.endOffset);
        for (const h of u.getClientRects()) i.push({ left: h.left, right: h.right, top: h.top, bottom: h.bottom, width: h.width, height: h.height });
      }
    }
    a = o.nextNode();
  }
  return i;
}
function De(n, e, t = !1, i = 0) {
  let s;
  if (Array.isArray(n)) s = n;
  else {
    let c = n.getClientRects();
    c.length || n.commonAncestorContainer.nodeType === Node.ELEMENT_NODE && (c = n.commonAncestorContainer.getClientRects()), s = [];
    for (const u of c) s.push({ bottom: u.bottom, height: u.height, left: u.left, right: u.right, top: u.top, width: u.width });
  }
  if (i) for (const c of s) c.left -= i, c.top -= i, c.right += i, c.bottom += i, c.width += i * 2, c.height += i * 2;
  const r = dr(s, 1, e, t), o = Nl(r, 1), a = fr(o), l = 4;
  for (let c = a.length - 1; c >= 0; c--) {
    const u = a[c];
    if (!(u.width * u.height > l)) if (a.length > 1) a.splice(c, 1);
    else break;
  }
  return a;
}
function dr(n, e, t, i = !1) {
  for (let s = 0; s < n.length; s++) for (let r = s + 1; r < n.length; r++) {
    const o = n[s], a = n[r];
    if (o === a) continue;
    const l = B(o.top, a.top, e) && B(o.bottom, a.bottom, e), c = B(o.left, a.left, e) && B(o.right, a.right, e);
    if ((c && !t && !i || l && !c) && gr(o, a, e)) {
      const u = n.filter((d) => d !== o && d !== a), h = Ol(o, a);
      return u.push(h), dr(u, e, t, i);
    }
  }
  return n;
}
function Ol(n, e) {
  const t = Math.min(n.left, e.left), i = Math.max(n.right, e.right), s = Math.min(n.top, e.top), r = Math.max(n.bottom, e.bottom);
  return { bottom: r, height: r - s, left: t, right: i, top: s, width: i - t };
}
function Nl(n, e) {
  const t = new Set(n);
  for (const i of n) {
    if (!(i.width > 1 && i.height > 1)) {
      t.delete(i);
      continue;
    }
    for (const s of n) if (i !== s && t.has(s) && Tl(s, i, e)) {
      t.delete(i);
      break;
    }
  }
  return Array.from(t);
}
function Tl(n, e, t) {
  return Q(n, e.left, e.top, t) && Q(n, e.right, e.top, t) && Q(n, e.left, e.bottom, t) && Q(n, e.right, e.bottom, t);
}
function Q(n, e, t, i) {
  return (n.left < e || B(n.left, e, i)) && (n.right > e || B(n.right, e, i)) && (n.top < t || B(n.top, t, i)) && (n.bottom > t || B(n.bottom, t, i));
}
function fr(n) {
  for (let e = 0; e < n.length; e++) for (let t = e + 1; t < n.length; t++) {
    const i = n[e], s = n[t];
    if (i !== s && gr(i, s, -1)) {
      let r = [], o;
      const a = Ci(i, s);
      if (a.length === 1) r = a, o = i;
      else {
        const c = Ci(s, i);
        a.length < c.length ? (r = a, o = i) : (r = c, o = s);
      }
      const l = n.filter((c) => c !== o);
      return Array.prototype.push.apply(l, r), fr(l);
    }
  }
  return n;
}
function Ci(n, e) {
  const t = Dl(e, n);
  if (t.height === 0 || t.width === 0) return [n];
  const i = [];
  {
    const s = { bottom: n.bottom, height: 0, left: n.left, right: t.left, top: n.top, width: 0 };
    s.width = s.right - s.left, s.height = s.bottom - s.top, s.height !== 0 && s.width !== 0 && i.push(s);
  }
  {
    const s = { bottom: t.top, height: 0, left: t.left, right: t.right, top: n.top, width: 0 };
    s.width = s.right - s.left, s.height = s.bottom - s.top, s.height !== 0 && s.width !== 0 && i.push(s);
  }
  {
    const s = { bottom: n.bottom, height: 0, left: t.left, right: t.right, top: t.bottom, width: 0 };
    s.width = s.right - s.left, s.height = s.bottom - s.top, s.height !== 0 && s.width !== 0 && i.push(s);
  }
  {
    const s = { bottom: n.bottom, height: 0, left: t.right, right: n.right, top: n.top, width: 0 };
    s.width = s.right - s.left, s.height = s.bottom - s.top, s.height !== 0 && s.width !== 0 && i.push(s);
  }
  return i;
}
function Dl(n, e) {
  const t = Math.max(n.left, e.left), i = Math.min(n.right, e.right), s = Math.max(n.top, e.top), r = Math.min(n.bottom, e.bottom);
  return { bottom: r, height: Math.max(0, r - s), left: t, right: i, top: s, width: Math.max(0, i - t) };
}
function gr(n, e, t) {
  return (n.left < e.right || t >= 0 && B(n.left, e.right, t)) && (e.left < n.right || t >= 0 && B(e.left, n.right, t)) && (n.top < e.bottom || t >= 0 && B(n.top, e.bottom, t)) && (e.top < n.bottom || t >= 0 && B(e.top, n.bottom, t));
}
function B(n, e, t) {
  return Math.abs(n - e) <= t;
}
const ki = ["div", "span", "p", "br", "hr", "b", "i", "em", "strong", "s", "u", "mark", "small", "sub", "sup", "abbr", "cite", "code", "data", "dfn", "kbd", "q", "samp", "time", "var", "blockquote", "pre", "svg", "g", "path", "circle", "ellipse", "rect", "line", "polygon", "polyline", "text", "tspan", "defs", "use"], Fl = /^on/i, Il = /* @__PURE__ */ new Set(["href", "src", "action", "formaction", "xlink:href"]), Pl = /^\s*(javascript|data):/i;
function Ll(n, e) {
  const t = n.document.createElement("div");
  if ("Sanitizer" in n && typeof t.setHTML == "function") try {
    const s = new n.Sanitizer({ allowElements: ki });
    return t.setHTML(e, { sanitizer: s }), t.firstElementChild;
  } catch {
  }
  const i = n.document.implementation.createHTMLDocument("");
  for (i.body.innerHTML = e, $l(i.body, new Set(ki)); i.body.firstChild; ) t.appendChild(n.document.adoptNode(i.body.firstChild));
  return t.firstElementChild;
}
function $l(n, e) {
  const t = Array.from(n.querySelectorAll("*")).reverse();
  for (const i of t) {
    if (!e.has(i.localName)) {
      i.replaceWith(...Array.from(i.childNodes));
      continue;
    }
    for (const { name: s, value: r } of Array.from(i.attributes)) (Fl.test(s) || Il.has(s) && Pl.test(r)) && i.removeAttribute(s);
  }
}
function Jt(n) {
  switch (n) {
    case E.Mask:
      return "rgba(255, 255, 255, 0.5)";
    case E.Highlight:
    case E.HighlightUnderline:
      return "#FFFF00";
    default:
      return "#FF0000";
  }
}
const E = { Highlight: "highlight", HighlightUnderline: "highlightUnderline", Underline: "underline", Strikethrough: "strikethrough", Outline: "outline", TextColor: "textColor", Mask: "mask", Template: "template" };
var Ml = ((n) => (n.Wrap = "wrap", n.Viewport = "viewport", n.Bounds = "bounds", n.Page = "page", n))(Ml || {}), _l = ((n) => (n.Boxes = "boxes", n.Bounds = "bounds", n))(_l || {});
const Bl = () => "Highlight" in window, Ri = ["IMG", "IMAGE", "AUDIO", "VIDEO", "SVG"], Ul = /* @__PURE__ */ new Set(["SUP", "SUB", "SMALL", "CODE"]);
class zl {
  constructor(e, t, i, s) {
    this.wnd = e, this.comms = t, this.id = i, this.name = s, this.items = [], this.lastItemId = 0, this.container = void 0, this._activatable = !1, this._hoverable = !1, this.hoveredItem = void 0, this.experimentalHighlights = !1, this._tintSubKeys = /* @__PURE__ */ new Map(), this._subKeyCounter = 0, this.pendingWebkitReflow = null, this.maskSvg = void 0, this.shadowHost = void 0, this.shadowRoot = void 0, this.currentRender = 0, Bl() && (this.experimentalHighlights = !0, this.notTextFlag = /* @__PURE__ */ new Map()), this.activationHandler = this.handleActivation.bind(this), this.wnd.document.addEventListener("pointerup", this.activationHandler), this.hoverHandler = this.handleHover.bind(this), this.wnd.document.addEventListener("pointermove", this.hoverHandler);
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
  get hasOverlayItems() {
    return !this.experimentalHighlights || (this.notTextFlag?.size ?? 0) > 0;
  }
  set hoverable(e) {
    if (this._hoverable = e, !e && this.hoveredItem) {
      const t = this.hoveredItem.range.getBoundingClientRect(), i = this.wnd.devicePixelRatio;
      this.comms.send("decoration_pointer_leave", { decorationId: this.hoveredItem.decoration.id, group: this.name, rect: { top: t.top * i, left: t.left * i, width: t.width * i, height: t.height * i } }), this.hoveredItem = void 0;
    }
  }
  add(e) {
    const t = `${this.id}-${this.lastItemId++}`, i = Rl(this.wnd.document, e.locator);
    if (!i) {
      this.comms.log("Can't locate DOM range for decoration", e);
      return;
    }
    const s = i.commonAncestorContainer;
    if (s.nodeType !== Node.TEXT_NODE && this.experimentalHighlights && (Ri.includes(s.nodeName.toUpperCase()) && this.notTextFlag?.set(t, !0), i.cloneContents().querySelector(Ri.join(", ").toLowerCase()) && this.notTextFlag?.set(t, !0), (s.textContent?.trim() || "").length === 0 && this.notTextFlag?.set(t, !0)), this.experimentalHighlights && !this.notTextFlag?.has(t)) {
      const o = (a) => {
        for (; a && a.nodeType === Node.ELEMENT_NODE; ) {
          if (a.namespaceURI?.includes("svg")) return !0;
          a = a.parentNode;
        }
        return !1;
      };
      (o(i.startContainer) || o(i.endContainer)) && this.notTextFlag?.set(t, !0);
    }
    if (this.experimentalHighlights) {
      const { type: o } = e.style, { layout: a, width: l, expand: c } = e.style;
      o !== E.TextColor && (o === E.Outline || o === E.Template || o === E.Mask || a !== void 0 && a !== "boxes" || l !== void 0 && l !== "wrap" || c) && this.notTextFlag?.set(t, !0);
    }
    const r = { decoration: e, id: t, range: i, hitRects: [], clickableElements: void 0, container: void 0 };
    this.items.push(r), this.layout(r), r.hitRects = this.clientRectsToDocCoords(De(r.range, !1, !1, (r.decoration.style.expand ?? 0) + this.hitGap())), this.renderLayout([r]);
  }
  remove(e) {
    const t = this.items.findIndex((r) => r.decoration.id === e);
    if (t < 0) return;
    const i = this.items[t], s = i.decoration.style?.type === E.Mask;
    if (this.items.splice(t, 1), i.clickableElements = void 0, i.container && (i.container.remove(), i.container = void 0), this.experimentalHighlights && !this.notTextFlag?.has(i.id) && i.highlightSubKey) {
      const r = this.wnd.CSS.highlights;
      r.get(i.highlightSubKey)?.delete(i.range), this.items.some((a) => a.highlightSubKey === i.highlightSubKey) || r.delete(i.highlightSubKey);
      const o = this.wnd.document.getElementById(`${this.id}-style`);
      o && this._rebuildHighlightStylesheet(o), this.scheduleWebkitRepaintFix([i]);
    }
    this.notTextFlag?.delete(i.id), this.hoveredItem === i && (this.hoveredItem = void 0), s && this.updateSharedMask();
  }
  update(e) {
    this.remove(e.id), this.add(e);
  }
  clear() {
    this.experimentalHighlights && this.scheduleWebkitRepaintFix(this.items), this.clearContainer(), this.items.length = 0, this.notTextFlag?.clear(), this.hoveredItem = void 0, this.maskSvg && (this.maskSvg.remove(), this.maskSvg = void 0), this.shadowHost && (this.shadowHost.remove(), this.shadowHost = void 0, this.shadowRoot = void 0);
  }
  destroy() {
    this.clear(), this.wnd.document.removeEventListener("pointerup", this.activationHandler), this.wnd.document.removeEventListener("pointermove", this.hoverHandler);
  }
  isWebkitRepaintProne(e) {
    const t = this.wnd.getComputedStyle(e);
    if (Ul.has(e.tagName.toUpperCase()) || t.display === "inline-block" || t.verticalAlign !== "baseline") return !0;
    const i = e.parentElement ? this.wnd.getComputedStyle(e.parentElement) : null;
    return !!i && parseFloat(t.fontSize) !== parseFloat(i.fontSize);
  }
  findWebkitRepaintProneElement(e) {
    let t = e.startContainer.nodeType === Node.ELEMENT_NODE ? e.startContainer : e.startContainer.parentElement;
    for (; t; ) {
      if (this.isWebkitRepaintProne(t)) return t;
      if (this.wnd.getComputedStyle(t).display !== "inline") break;
      t = t.parentElement;
    }
    const i = e.commonAncestorContainer, s = i.nodeType === Node.ELEMENT_NODE ? i : i.parentElement;
    if (!s) return null;
    const r = this.wnd.document.createTreeWalker(s, NodeFilter.SHOW_ELEMENT, (o) => e.intersectsNode(o) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT);
    for (let o = r.nextNode(); o; o = r.nextNode()) if (this.isWebkitRepaintProne(o)) return o;
    return null;
  }
  forceWebkitBlockReflow(e) {
    let t = e;
    for (; t; ) {
      const o = this.wnd.getComputedStyle(t).display;
      if (o !== "inline" && o !== "inline-block") break;
      t = t.parentElement;
    }
    if (!t || !t.isConnected) return;
    const i = t, s = i.style.getPropertyValue("transform"), r = i.style.getPropertyPriority("transform");
    i.style.setProperty("transform", "translateZ(0.001px)", "important"), i.offsetHeight, i.style.setProperty("transform", "translateZ(0px)", "important"), i.offsetHeight, s ? i.style.setProperty("transform", s, r) : i.style.removeProperty("transform");
  }
  scheduleWebkitRepaintFix(e) {
    if (li.UA.WebKit) for (const t of e) {
      if (this.notTextFlag?.has(t.id) || !t.highlightSubKey) continue;
      const i = this.findWebkitRepaintProneElement(t.range);
      i && this.queueWebkitReflow(i);
    }
  }
  queueWebkitReflow(e) {
    this.pendingWebkitReflow || (this.pendingWebkitReflow = /* @__PURE__ */ new Set(), this.wnd.requestAnimationFrame(() => {
      const t = this.pendingWebkitReflow;
      this.pendingWebkitReflow = null, t?.forEach((i) => this.forceWebkitBlockReflow(i));
    })), this.pendingWebkitReflow.add(e);
  }
  clientRectsToDocCoords(e, t = he(this.wnd)) {
    const i = t.xDocOffset, s = t.yDocOffset;
    return i === 0 && s === 0 ? e : e.map((r) => ({ left: r.left + i, top: r.top + s, right: r.right + i, bottom: r.bottom + s, width: r.width, height: r.height }));
  }
  pointerToDocCoords(e) {
    const t = he(this.wnd);
    return { docX: e.clientX + t.xDocOffset, docY: e.clientY + t.yDocOffset };
  }
  effectiveZoom() {
    if (!li.UA.Blink) return 1;
    const e = parseFloat(this.wnd.getComputedStyle(this.wnd.document.documentElement).zoom), t = parseFloat(this.wnd.getComputedStyle(this.wnd.document.body).zoom);
    return (e || 1) * (t || 1);
  }
  hitGap() {
    return 2 * this.effectiveZoom();
  }
  handleActivation(e) {
    if (!this._activatable) return;
    const { docX: t, docY: i } = this.pointerToDocCoords(e), s = this.wnd.devicePixelRatio;
    for (const r of this.items) {
      let o;
      if (r.decoration.style.type === E.Template) for (const a of r.clickableElements ?? []) {
        const l = a.getBoundingClientRect();
        if (Q(l, e.clientX, e.clientY, 0)) {
          o = l;
          break;
        }
      }
      else for (const a of r.hitRects) if (Q(a, t, i, 0)) {
        o = r.range.getBoundingClientRect();
        break;
      }
      if (o) {
        this.comms.send("decoration_activated", { decorationId: r.decoration.id, group: this.name, rect: { top: o.top * s, left: o.left * s, width: o.width * s, height: o.height * s }, point: { x: e.clientX * s, y: e.clientY * s } });
        return;
      }
    }
  }
  handleHover(e) {
    if (!this._hoverable) return;
    const { docX: t, docY: i } = this.pointerToDocCoords(e), s = this.wnd.devicePixelRatio;
    let r, o;
    for (const a of this.items) {
      if (a.decoration.style.type === E.Template) for (const l of a.clickableElements ?? []) {
        const c = l.getBoundingClientRect();
        if (Q(c, e.clientX, e.clientY, 0)) {
          r = a, o = c;
          break;
        }
      }
      else for (const l of a.hitRects) if (Q(l, t, i, 0)) {
        r = a, o = a.range.getBoundingClientRect();
        break;
      }
      if (r) break;
    }
    if (r !== this.hoveredItem) {
      if (this.hoveredItem) {
        const a = this.hoveredItem.range.commonAncestorContainer.isConnected ? this.hoveredItem.range.getBoundingClientRect() : null;
        this.comms.send("decoration_pointer_leave", { decorationId: this.hoveredItem.decoration.id, group: this.name, rect: a ? { top: a.top * s, left: a.left * s, width: a.width * s, height: a.height * s } : void 0, point: { x: e.clientX * s, y: e.clientY * s } });
      }
      this.hoveredItem = r, r && o && this.comms.send("decoration_pointer_enter", { decorationId: r.decoration.id, group: this.name, rect: { top: o.top * s, left: o.left * s, width: o.width * s, height: o.height * s }, point: { x: e.clientX * s, y: e.clientY * s } });
    }
  }
  requestLayout() {
    this.wnd.cancelAnimationFrame(this.currentRender), this.clearContainer(), this.wnd.document.fonts.ready.then(() => {
      this.currentRender = this.wnd.requestAnimationFrame(() => {
        this.items.forEach((e) => {
          this.layout(e), e.hitRects = this.clientRectsToDocCoords(De(e.range, !1, !1, (e.decoration.style.expand ?? 0) + this.hitGap()));
        }), this.renderLayout(this.items), this.updateSharedMask();
      });
    });
  }
  repositionOverlays() {
    let e = !1;
    const t = [], i = he(this.wnd);
    this.items.forEach((s) => {
      if (!(this.experimentalHighlights && !this.notTextFlag?.has(s.id))) {
        if (s.decoration.style?.type === E.Mask) {
          e = !0;
          return;
        }
        this.repositionItem(s, i) || (s.container?.remove(), this.layout(s), t.push(s)), s.hitRects = this.clientRectsToDocCoords(De(s.range, !1, !1, (s.decoration.style.expand ?? 0) + this.hitGap()), i);
      }
    }), t.length && this.renderLayout(t), e && this.updateSharedMask();
  }
  experimentalLayout(e) {
    const t = this.requireContainer(!0), i = this.wnd.CSS.highlights, s = e.decoration.style, r = s.type ?? E.Highlight, o = s.tint ?? Jt(r), a = s.width, l = s.layout, c = this._getSubKey(r, o);
    e.highlightSubKey && (i.get(e.highlightSubKey)?.delete(e.range), e.highlightSubKey !== c && !this.items.some((p) => p !== e && p.highlightSubKey === e.highlightSubKey) && i.delete(e.highlightSubKey)), e.highlightSubKey = c;
    let u;
    i.has(c) ? u = i.get(c) : (u = new this.wnd.Highlight(), i.set(c, u));
    const h = (p, m) => this.wnd.document.caretPositionFromPoint?.(p, m) ?? null;
    if (r === E.TextColor && (l === "bounds" || a === "bounds" || a === "page")) {
      const p = he(this.wnd);
      if (p.isVertical) console.warn("Vertical writing detected: caretPositionFromPoint has known bugs, falling back to original range"), u.add(e.range);
      else {
        const m = e.range.getBoundingClientRect();
        let b, w;
        a === "page" ? (b = Math.floor(p.inlineStart(m) / p.pageInlineSize) * p.pageInlineSize, w = p.pageInlineSize) : (b = p.inlineStart(m), w = p.inlineSize(m));
        const S = h(b, p.blockStart(m) + 1), y = h(b + w, p.blockStart(m) + p.blockSize(m) - 1);
        if (S && y) {
          const v = this.wnd.document.createRange();
          v.setStart(S.offsetNode, S.offset), v.setEnd(y.offsetNode, y.offset), u.add(v), e.range = v;
        } else u.add(e.range);
      }
    } else u.add(e.range);
    const d = this.getBackgroundColor(), f = s.enforceContrast !== !1 ? fe(o, d) : o;
    let g;
    switch (r) {
      case E.Underline:
        g = `::highlight(${c}) {
                    text-decoration: underline;
                    text-decoration-color: ${f};
                    text-decoration-thickness: 0.1em;
                }`;
        break;
      case E.Strikethrough:
        g = `::highlight(${c}) {
                    text-decoration: line-through;
                    text-decoration-color: ${f};
                    text-decoration-thickness: 0.1em;
                }`;
        break;
      case E.Outline:
        g = `::highlight(${c}) {
                    outline: 2px solid ${f};
                    outline-offset: 1px;
                }`;
        break;
      case E.TextColor:
        g = `::highlight(${c}) {
                    color: ${f};
                }`;
        break;
      case E.HighlightUnderline: {
        const { r: p, g: m, b } = le(f), w = `rgba(${p}, ${m}, ${b}, 0.3)`;
        g = `::highlight(${c}) {
                    color: ${ai(f, d)};
                    background-color: ${w};
                    text-decoration: underline;
                    text-decoration-color: ${f};
                    text-decoration-thickness: 0.1em;
                }`;
        break;
      }
      case E.Highlight:
      default:
        g = `::highlight(${c}) {
                    color: ${ai(f, d)};
                    background-color: ${f};
                }`;
    }
    e.highlightCSS = g, this._rebuildHighlightStylesheet(t);
  }
  _getSubKey(e, t) {
    const i = `${e}::${t}`;
    let s = this._tintSubKeys.get(i);
    return s || (s = `${this.id}--${this._subKeyCounter++}`, this._tintSubKeys.set(i, s)), s;
  }
  _rebuildHighlightStylesheet(e) {
    const t = /* @__PURE__ */ new Set(), i = [];
    for (const s of this.items) s.highlightSubKey && s.highlightCSS && !t.has(s.highlightSubKey) && (t.add(s.highlightSubKey), i.push(s.highlightCSS));
    e.innerHTML = i.join(`
`);
  }
  positionElement(e, t, i, s, r, o, a = 0) {
    const l = e.decoration?.style?.width, c = r;
    switch (l) {
      case "viewport": {
        const u = Math.floor(t.inlineStart(c) / t.viewportInlineSize) * t.viewportInlineSize;
        t.applyPosition(s, u + t.inlineScrollOffset + a, t.blockStart(c) + t.blockScrollOffset, t.viewportInlineSize - 2 * a, t.blockSize(c), i);
        break;
      }
      case "page": {
        const u = Math.floor(t.inlineStart(c) / t.pageInlineSize) * t.pageInlineSize;
        t.applyPosition(s, u + t.inlineScrollOffset + a, t.blockStart(c) + t.blockScrollOffset, t.pageInlineSize - 2 * a, t.blockSize(c), i);
        break;
      }
      case "bounds": {
        t.applyPosition(s, t.inlineStart(o) + t.inlineScrollOffset, t.blockStart(c) + t.blockScrollOffset, t.inlineSize(o), t.blockSize(c), i);
        break;
      }
      default:
        t.applyPosition(s, t.inlineStart(c) + t.inlineScrollOffset, t.blockStart(c) + t.blockScrollOffset, t.inlineSize(c), t.blockSize(c), i);
    }
  }
  computeOverlayRects(e, t, i, s) {
    if (e.decoration?.style?.layout === "bounds") return [s ? { left: i.left - s, right: i.right + s, top: i.top - s, bottom: i.bottom + s, width: i.width + s * 2, height: i.height + s * 2 } : i];
    const r = e.decoration.style.type, o = r === E.Underline || r === E.Strikethrough, a = r === E.Strikethrough, l = o ? Al(e.range, ["rt", "rp"]) : e.range;
    let c = De(l, !0, t.isVertical, o ? 0 : s);
    return c = c.sort((u, h) => t.isVertical ? (t.isVertLR ? 1 : -1) * (u.left - h.left) : u.top - h.top), c.map((u) => {
      let h = u;
      if (a) {
        const d = t.blockSize(u) * 0.1, f = t.blockStart(u) + t.blockSize(u) / 2 - d / 2;
        h = t.isVertical ? { left: f, right: f + d, top: u.top, bottom: u.bottom, width: d, height: u.height } : { top: f, bottom: f + d, left: u.left, right: u.right, height: d, width: u.width };
      }
      return s && o && (h = t.isVertical ? { ...h, top: h.top - s, bottom: h.bottom + s, height: h.height + s * 2 } : { ...h, left: h.left - s, right: h.right + s, width: h.width + s * 2 }), h;
    });
  }
  repositionItem(e, t) {
    if (!e.container) return !0;
    const i = e.decoration.style;
    if (i.type !== E.Template) {
      const u = i.type ?? E.Highlight;
      if (u === E.TextColor || u === E.Mask) return !0;
    }
    const s = 1 / this.effectiveZoom(), r = i.expand ?? 0, o = e.range.getBoundingClientRect(), a = (() => {
      if (i.type !== E.Outline) return 0;
      const u = i.width;
      return u === "page" || u === "viewport" ? 3 : 0;
    })(), l = this.computeOverlayRects(e, t, o, r), c = Array.from(e.container.children);
    return c.length !== l.length ? !1 : (c.forEach((u, h) => this.positionElement(e, t, s, u, l[h], o, a)), !0);
  }
  layout(e) {
    if (this.experimentalHighlights && !this.notTextFlag?.has(e.id)) return this.experimentalLayout(e);
    const t = this.wnd.document.createElement("div");
    t.setAttribute("id", e.id), t.dataset.highlightId = e.decoration.id, t.style.setProperty("pointer-events", "none");
    const i = he(this.wnd), s = 1 / this.effectiveZoom(), r = e.decoration.style.expand ?? 0, o = e.range.getBoundingClientRect(), a = e.decoration.style, l = (() => {
      if (a.type !== E.Outline) return 0;
      const h = a.width;
      return h === "page" || h === "viewport" ? 3 : 0;
    })();
    let c;
    if (a.type === E.Template) {
      a.stylesheet && this.injectCustomStylesheet(a.stylesheet);
      const h = Ll(this.wnd, a.element);
      if (!h) {
        e.container = t, e.clickableElements = [];
        return;
      }
      h.style.setProperty("pointer-events", "none"), c = h;
    } else {
      const h = a, d = h.type ?? E.Highlight, f = h.tint ?? Jt(d);
      if (d === E.TextColor) {
        e.container = t, e.clickableElements = [];
        return;
      }
      if (d === E.Mask) {
        e.container = t, e.clickableElements = [], this.updateSharedMask();
        return;
      }
      const g = this.getCurrentDarkMode(), p = this.getBackgroundColor(), m = h.enforceContrast !== !1, b = (() => {
        switch (d) {
          case E.Underline: {
            const S = m ? fe(f, p) : f, y = h.layout === "bounds", [v, C] = i.isVertical ? ["border-right", "border-left"] : ["border-bottom", "border-top"];
            return [y ? `${C}: 0.1em solid ${S} !important` : null, `${v}: 0.1em solid ${S} !important`, "background-color: transparent !important", "box-sizing: border-box !important"].filter(Boolean).join("; ");
          }
          case E.Strikethrough: {
            const S = m ? fe(f, p) : f;
            return h.layout === "bounds" ? [`background: repeating-linear-gradient(-45deg, transparent, transparent 19px, ${S} 19px, ${S} 20px) !important`, "background-color: transparent !important", "box-sizing: border-box !important"].join("; ") : [`background-color: ${S} !important`, "box-sizing: border-box !important"].join("; ");
          }
          case E.Outline:
            return [`outline: 2px solid ${m ? fe(f, p) : f} !important`, "outline-offset: 1px !important", "background-color: transparent !important", "box-sizing: border-box !important"].join("; ");
          case E.HighlightUnderline: {
            const S = m ? fe(f, p) : f, { r: y, g: v, b: C } = le(S), R = `rgba(${y}, ${v}, ${C}, 0.3)`, A = h.layout === "bounds", [T, O] = i.isVertical ? ["border-right", "border-left"] : ["border-bottom", "border-top"];
            return [`background-color: ${R} !important`, A ? `${O}: 0.1em solid ${S} !important` : null, `${T}: 0.1em solid ${S} !important`, "box-sizing: border-box !important"].filter(Boolean).join("; ");
          }
          case E.Highlight:
          default:
            return [`background-color: ${m ? fe(f, p) : f} !important`, `mix-blend-mode: ${g ? "exclusion" : "multiply"} !important`, "opacity: 1 !important", "box-sizing: border-box !important", "transform: translateZ(0) !important"].join("; ");
        }
      })(), w = this.wnd.document.createElement("template");
      w.innerHTML = `<div data-readium="true" class="readium-${d}" style="${b}"></div>`.trim(), c = w.content.firstElementChild;
    }
    const u = this.computeOverlayRects(e, i, o, r);
    for (const h of u) {
      const d = c.cloneNode(!0);
      d.style.setProperty("pointer-events", "none"), this.positionElement(e, i, s, d, h, o, l), t.append(d);
    }
    e.container = t, e.clickableElements = Array.from(t.querySelectorAll("[data-activable='1']")), e.clickableElements.length || (e.clickableElements = Array.from(t.children));
  }
  renderLayout(e) {
    this.wnd.cancelAnimationFrame(this.currentRender), this.currentRender = this.wnd.requestAnimationFrame(() => {
      e = e.filter((t) => !this.experimentalHighlights || !!this.notTextFlag?.has(t.id)), !(!e || e.length === 0) && this.requireContainer().append(...e.map((t) => t.container).filter((t) => !!t));
    });
  }
  requireContainer(e = !1) {
    if (e) {
      let t;
      return this.wnd.document.getElementById(`${this.id}-style`) ? t = this.wnd.document.getElementById(`${this.id}-style`) : (t = this.wnd.document.createElement("style"), t.dataset.readium = "true", t.id = `${this.id}-style`, this.wnd.document.head.appendChild(t)), t;
    }
    return this.container || (this.shadowRoot || (this.shadowHost = this.wnd.document.createElement("div"), this.shadowHost.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none", this.wnd.document.body.appendChild(this.shadowHost), this.shadowRoot = this.shadowHost.attachShadow({ mode: "open" })), this.container = this.wnd.document.createElement("div"), this.container.setAttribute("id", this.id), this.container.dataset.group = this.name, this.container.dataset.readium = "true", this.container.style.setProperty("pointer-events", "none"), this.container.style.display = "contents", this.shadowRoot.appendChild(this.container)), this.container;
  }
  getCurrentDarkMode() {
    return oi(this.wnd, "--USER__appearance") === "readium-night-on" || zs(this.getBackgroundColor());
  }
  getBackgroundColor() {
    return oi(this.wnd, "--USER__backgroundColor") || this.wnd.getComputedStyle(this.wnd.document.documentElement).getPropertyValue("background-color");
  }
  updateSharedMask() {
    const e = this.items.filter((d) => d.decoration.style?.type === E.Mask);
    if (e.length === 0) {
      this.maskSvg && (this.maskSvg.remove(), this.maskSvg = void 0), this.shadowHost && !this.container && (this.shadowHost.remove(), this.shadowRoot = void 0, this.shadowHost = void 0);
      return;
    }
    const t = he(this.wnd), i = 1 / this.effectiveZoom(), s = this.wnd.document.documentElement, r = s.scrollWidth, o = s.scrollHeight, a = [];
    for (const d of e) {
      const f = d.decoration.style, g = f.layout ?? "boxes", p = f.width ?? "wrap", m = f.expand ?? 0, b = d.range.getBoundingClientRect(), w = g === "bounds" ? [m ? { left: b.left - m, top: b.top - m, right: b.right + m, bottom: b.bottom + m, width: b.width + m * 2, height: b.height + m * 2 } : b] : De(d.range, !1, !1, m);
      for (const S of w) {
        let y;
        switch (p) {
          case "viewport": {
            const v = Math.floor(t.inlineStart(S) / t.viewportInlineSize) * t.viewportInlineSize;
            y = t.toRect(v, t.blockStart(S), t.viewportInlineSize, t.blockSize(S));
            break;
          }
          case "page": {
            const v = Math.floor(t.inlineStart(S) / t.pageInlineSize) * t.pageInlineSize;
            y = t.toRect(v, t.blockStart(S), t.pageInlineSize, t.blockSize(S));
            break;
          }
          case "bounds": {
            y = t.toRect(t.inlineStart(b), t.blockStart(S), t.inlineSize(b), t.blockSize(S));
            break;
          }
          default:
            y = t.toRect(t.inlineStart(S), t.blockStart(S), t.inlineSize(S), t.blockSize(S));
        }
        a.push(y);
      }
    }
    const l = [`M0 0 H${r} V${o} H0 Z`, ...a.map((d) => {
      const f = (d.left + t.xDocOffset) * i, g = (d.top + t.yDocOffset) * i, p = (d.right + t.xDocOffset) * i, m = (d.bottom + t.yDocOffset) * i;
      return `M${f} ${g} H${p} V${m} H${f} Z`;
    })].join(" "), c = "http://www.w3.org/2000/svg";
    if (!this.maskSvg) {
      this.shadowRoot || (this.shadowHost = this.wnd.document.createElement("div"), this.shadowHost.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none", this.wnd.document.body.appendChild(this.shadowHost), this.shadowRoot = this.shadowHost.attachShadow({ mode: "open" })), this.maskSvg = this.wnd.document.createElementNS(c, "svg"), this.maskSvg.style.cssText = `position:absolute;top:0;left:0;width:${r}px;height:${o}px;pointer-events:none;z-index:2147483647`, this.maskSvg.dataset.readium = "true";
      const d = this.wnd.document.createElementNS(c, "defs"), f = this.wnd.document.createElementNS(c, "clipPath"), g = `${this.id}-mask-clip`;
      f.setAttribute("id", g), f.setAttribute("clipPathUnits", "userSpaceOnUse");
      const p = this.wnd.document.createElementNS(c, "path");
      p.setAttribute("clip-rule", "evenodd"), f.appendChild(p), d.appendChild(f), this.maskSvg.appendChild(d);
      const m = this.wnd.document.createElementNS(c, "rect");
      m.setAttribute("id", `${this.id}-mask-rect`), m.setAttribute("clip-path", `url(#${g})`), m.style.pointerEvents = "none", this.maskSvg.appendChild(m), this.shadowRoot.appendChild(this.maskSvg);
    }
    this.maskSvg.style.width = `${r}px`, this.maskSvg.style.height = `${o}px`;
    const u = this.maskSvg.querySelector("path");
    u && u.setAttribute("d", l);
    const h = this.maskSvg.querySelector("rect");
    if (h) {
      const d = e[0].decoration.style.tint, f = d ?? this.getBackgroundColor() ?? Jt(E.Mask), g = d ? "1" : "0.5";
      h.setAttribute("x", "0"), h.setAttribute("y", "0"), h.setAttribute("width", String(r)), h.setAttribute("height", String(o)), h.setAttribute("fill", f), h.setAttribute("fill-opacity", g);
    }
  }
  injectCustomStylesheet(e) {
    const t = `${this.id}-custom-style`;
    let i = this.wnd.document.getElementById(t);
    i || (i = this.wnd.document.createElement("style"), i.id = t, i.dataset.readium = "true", this.wnd.document.head.appendChild(i)), i.innerHTML = e;
  }
  clearContainer() {
    if (this.experimentalHighlights) {
      const e = this.wnd.CSS.highlights;
      for (const t of this._tintSubKeys.values()) e.delete(t);
      this._tintSubKeys.clear(), this._subKeyCounter = 0;
    }
    this.wnd.document.getElementById(`${this.id}-custom-style`)?.remove(), this.container && (this.container.remove(), this.container = void 0);
  }
}
const pr = class Se extends Ia {
  constructor() {
    super(...arguments), this.observedResizeTargets = /* @__PURE__ */ new Map(), this.resizeFrame = 0, this.lastGroupId = 0, this.groups = /* @__PURE__ */ new Map(), this.handleResizer = this.handleResize.bind(this), this.scrollScheduled = !1, this.handleScroller = this.handleScroll.bind(this);
  }
  cleanup() {
    this.groups.forEach((e) => e.destroy()), this.groups.clear(), this.observedResizeTargets.clear();
  }
  updateHighlightStyles() {
    this.groups.forEach((e) => {
      e.requestLayout();
    });
  }
  handleResize() {
    this.wnd.clearTimeout(this.resizeFrame), this.resizeFrame = this.wnd.setTimeout(() => {
      this.groups.forEach((e) => e.requestLayout());
    }, 50);
  }
  handleScroll() {
    this.scrollScheduled || (this.scrollScheduled = !0, this.wnd.requestAnimationFrame(() => {
      this.scrollScheduled = !1, this.groups.forEach((e) => {
        e.hasOverlayItems && e.repositionOverlays();
      });
    }));
  }
  mount(e, t) {
    return this.wnd = e, t.register("decorate", Se.moduleName, (i, s) => {
      const r = i;
      (r.action === "add" || r.action === "update") && r.decoration.locator && (r.decoration.locator = ar.deserialize(r.decoration.locator)), this.groups.has(r.group) || this.groups.set(r.group, new zl(e, t, `readium-decoration-${this.lastGroupId++}`, r.group));
      const o = this.groups.get(r.group);
      switch (r.action) {
        case "add":
          o?.add(r.decoration);
          break;
        case "remove":
          o?.remove(r.decoration.id);
          break;
        case "clear":
          o?.clear();
          break;
        case "update":
          o?.update(r.decoration);
          break;
      }
      s(!0);
    }), t.register("decoration_resize", Se.moduleName, (i, s) => {
      const r = i;
      r.action === "watch" ? this.addDecorationResizeTarget(r.selector) : this.removeDecorationResizeTarget(r.selector), s(!0);
    }), t.register("decoration_activatable", Se.moduleName, (i, s) => {
      const r = i, o = this.groups.get(r.group);
      o && (o.activatable = r.activatable), s(!0);
    }), t.register("decoration_hoverable", Se.moduleName, (i, s) => {
      const r = i, o = this.groups.get(r.group);
      o && (o.hoverable = r.hoverable), s(!0);
    }), this.resizeObserver = new ResizeObserver(() => e.requestAnimationFrame(() => this.handleResize())), this.resizeObserver.observe(e.document.documentElement), e.addEventListener("orientationchange", this.handleResizer), e.addEventListener("resize", this.handleResizer), e.addEventListener("scroll", this.handleScroller, { passive: !0, capture: !0 }), this.styleObserver = new MutationObserver((i) => {
      i.some((s) => s.type === "attributes" && s.attributeName === "style" && s.oldValue !== s.target.getAttribute("style")) && this.updateHighlightStyles();
    }), this.styleObserver.observe(e.document.documentElement, { attributes: !0, attributeFilter: ["style"], attributeOldValue: !0 }), t.log("Decorator Mounted"), !0;
  }
  unmount(e, t) {
    return e.removeEventListener("orientationchange", this.handleResizer), e.removeEventListener("resize", this.handleResizer), e.removeEventListener("scroll", this.handleScroller, { capture: !0 }), t.unregisterAll(Se.moduleName), this.resizeObserver.disconnect(), this.styleObserver.disconnect(), this.cleanup(), t.log("Decorator Unmounted"), !0;
  }
  addDecorationResizeTarget(e) {
    const t = this.observedResizeTargets.get(e);
    t && this.resizeObserver.unobserve(t);
    const i = this.wnd.document.querySelector(e);
    i ? (this.resizeObserver.observe(i), this.observedResizeTargets.set(e, i)) : this.observedResizeTargets.delete(e);
  }
  removeDecorationResizeTarget(e) {
    const t = this.observedResizeTargets.get(e);
    t && (this.resizeObserver.unobserve(t), this.observedResizeTargets.delete(e));
  }
};
pr.moduleName = "decorator";
let Vl = pr;
const jl = new Set(Object.values(E));
function Hl(n, e) {
  return n === E.TextColor ? typeof window < "u" && "Highlight" in window : jl.has(n) ? !0 : !!e?.[n];
}
function Ai(n, e) {
  const { style: t } = n;
  if (t.type === E.Template) {
    const i = t;
    return { ...n, style: { ...i, element: Oi(i, n) } };
  }
  if (t.type && e?.[t.type]) {
    const i = e[t.type];
    return { ...n, style: { type: E.Template, layout: i.layout, width: i.width, stylesheet: i.stylesheet, element: Oi(i, n) } };
  }
  return n;
}
function Oi(n, e) {
  return typeof n.element == "function" ? n.element(e) : n.element;
}
function Wl(n, e) {
  if (n.type !== e.type) return !1;
  if (n.type === E.Template) {
    const s = n, r = e;
    return s.layout === r.layout && s.width === r.width && s.stylesheet === r.stylesheet;
  }
  const t = n, i = e;
  return t.tint === i.tint && t.layout === i.layout && t.width === i.width && (t.enforceContrast ?? !0) === (i.enforceContrast ?? !0) && (t.expand ?? 0) === (i.expand ?? 0);
}
function Kl(n, e) {
  return n.locator.href === e.locator.href && JSON.stringify(n.locator.locations?.serialize?.() ?? n.locator.locations) === JSON.stringify(e.locator.locations?.serialize?.() ?? e.locator.locations) && JSON.stringify(n.locator.text ?? null) === JSON.stringify(e.locator.text ?? null) && Wl(n.style, e.style) && JSON.stringify(n.extras ?? null) === JSON.stringify(e.extras ?? null);
}
class mr {
  constructor() {
    this.queue = [], this.channel = typeof MessageChannel < "u" ? new MessageChannel() : void 0, this.channel && (this.channel.port1.onmessage = () => this.flush());
  }
  push(e) {
    const t = this.queue.length === 0;
    this.queue.push(e), t && (this.channel ? this.channel.port2.postMessage(null) : setTimeout(() => this.flush(), 0));
  }
  flush() {
    const e = this.queue;
    this.queue = [], e.forEach((t) => t());
  }
  clear() {
    this.queue = [];
  }
}
class ql {
  constructor() {
    this.frame = new Gl(this), this.host = new Xl(this);
  }
}
class Gl {
  constructor(e) {
    this.channel = e, this.registrar = /* @__PURE__ */ new Map(), this.outbox = new mr(), this.ready = !0;
  }
  register(e, t, i) {
    (Array.isArray(e) ? e : [e]).forEach((s) => {
      const r = this.registrar.get(s) ?? [];
      if (r.find((o) => o.module === t)) throw new Error(`Duplicate callback for "${s}" in module "${t}"`);
      r.push({ module: t, cb: i }), this.registrar.set(s, r);
    });
  }
  unregister(e, t) {
    (Array.isArray(e) ? e : [e]).forEach((i) => {
      const s = this.registrar.get(i);
      s && this.registrar.set(i, s.filter((r) => r.module !== t));
    });
  }
  unregisterAll(e) {
    this.registrar.forEach((t, i) => {
      this.registrar.set(i, t.filter((s) => s.module !== e));
    });
  }
  _dispatch(e, t, i) {
    const s = this.registrar.get(e);
    if (!s?.length) {
      i(!1);
      return;
    }
    s.forEach((r) => r.cb(t, i));
  }
  send(e, t) {
    this.outbox.push(() => this.channel.host._receive(e, t));
  }
  log(...e) {
    this.outbox.push(() => this.channel.host._receive("log", e));
  }
  destroy() {
    this.registrar.clear(), this.outbox.clear();
  }
}
class Xl {
  constructor(e) {
    this.channel = e, this.listeners = /* @__PURE__ */ new Map(), this.outbox = new mr(), this.ready = !0;
  }
  send(e, t, i) {
    this.outbox.push(() => this.channel.frame._dispatch(e, t, i ?? (() => {
    })));
  }
  on(e, t) {
    const i = this.listeners.get(e) ?? [];
    i.push(t), this.listeners.set(e, i);
  }
  off(e, t) {
    const i = this.listeners.get(e);
    i && this.listeners.set(e, i.filter((s) => s !== t));
  }
  _receive(e, t) {
    this.listeners.get(e)?.forEach((i) => i(t));
  }
}
class Jl {
  constructor(e, t = {}) {
    this.host = e, this._decorations = /* @__PURE__ */ new Map(), this._activationState = /* @__PURE__ */ new Map(), this._hoverState = /* @__PURE__ */ new Map(), this._observers = /* @__PURE__ */ new Map(), this._hoveredDecorations = /* @__PURE__ */ new Map(), this._config = t, t.resizeWatchSelectors?.forEach((i) => this.addDecorationResizeTarget(i)), e.on("decoration_activated", (i) => {
      const s = i, r = this._decorations.get(s.group)?.find((o) => o.id === s.decorationId);
      r && this._observers.get(s.group)?.forEach((o) => o.onDecorationActivated?.({ group: s.group, decoration: r, rect: s.rect, point: s.point }));
    }), e.on("decoration_pointer_enter", (i) => {
      const s = i, r = this._decorations.get(s.group)?.find((o) => o.id === s.decorationId);
      r && (this._hoveredDecorations.set(s.group, r), this._observers.get(s.group)?.forEach((o) => o.onDecorationPointerEnter?.({ group: s.group, decoration: r, rect: s.rect, point: s.point })));
    }), e.on("decoration_pointer_leave", (i) => {
      const s = i, r = this._decorations.get(s.group)?.find((o) => o.id === s.decorationId) ?? this._hoveredDecorations.get(s.group);
      this._hoveredDecorations.delete(s.group), r && this._observers.get(s.group)?.forEach((o) => o.onDecorationPointerLeave?.({ group: s.group, decoration: r, rect: s.rect, point: s.point }));
    });
  }
  addDecorationResizeTarget(e) {
    this.host.send("decoration_resize", { action: "watch", selector: e });
  }
  removeDecorationResizeTarget(e) {
    this.host.send("decoration_resize", { action: "unwatch", selector: e });
  }
  supportsDecorationStyle(e) {
    return Hl(e, this._config.decorationTemplates);
  }
  applyDecorations(e, t) {
    const i = this._decorations.get(t) ?? [], s = new Map(i.map((l) => [l.id, l])), r = new Map(e.map((l) => [l.id, l]));
    for (const [l, c] of s) {
      const u = r.get(l);
      u ? Kl(c, u) || this.host.send("decorate", { group: t, action: "update", decoration: Ai(u, this._config.decorationTemplates) }) : this.host.send("decorate", { group: t, action: "remove", decoration: { id: l } });
    }
    for (const [l, c] of r) s.has(l) || this.host.send("decorate", { group: t, action: "add", decoration: Ai(c, this._config.decorationTemplates) });
    this._decorations.set(t, e);
    const o = this._activationState.get(t);
    o !== void 0 && this.host.send("decoration_activatable", { group: t, activatable: o });
    const a = this._hoverState.get(t);
    a !== void 0 && this.host.send("decoration_hoverable", { group: t, hoverable: a });
  }
  registerDecorationObserver(e, t) {
    this._observers.has(e) || this._observers.set(e, /* @__PURE__ */ new Set()), this._observers.get(e).add(t), t.onDecorationActivated && (this._activationState.set(e, !0), this.host.send("decoration_activatable", { group: e, activatable: !0 })), (t.onDecorationPointerEnter || t.onDecorationPointerLeave) && (this._hoverState.set(e, !0), this.host.send("decoration_hoverable", { group: e, hoverable: !0 }));
  }
  unregisterDecorationObserver(e) {
    this._observers.forEach((t, i) => {
      if (!t.has(e)) return;
      t.delete(e);
      const s = [...t].some((o) => o.onDecorationActivated);
      this._activationState.has(i) && !s && (this._activationState.delete(i), this.host.send("decoration_activatable", { group: i, activatable: !1 }));
      const r = [...t].some((o) => o.onDecorationPointerEnter || o.onDecorationPointerLeave);
      this._hoverState.has(i) && !r && (this._hoverState.delete(i), this.host.send("decoration_hoverable", { group: i, hoverable: !1 }));
    });
  }
  destroy() {
    this._decorations.clear(), this._activationState.clear(), this._hoverState.clear(), this._observers.clear(), this._hoveredDecorations.clear();
  }
}
function Yl(n) {
  return new Bs({
    start: new mt(n.start),
    end: n.end ? new mt(n.end) : void 0
  });
}
function Ql(n, e = window) {
  const { text: t, cssSelector: i, domRange: s, fragment: r } = n, o = t ? new rr(t) : void 0, a = i || s ? /* @__PURE__ */ new Map() : void 0;
  a && (i && a.set("cssSelector", i), s && a.set("domRange", Yl(s).serialize()));
  const c = a !== void 0 || r !== void 0 ? new pe({
    fragments: r ? [r] : void 0,
    otherLocations: a
  }) : void 0;
  return new ar({
    href: e.location.href,
    type: "text/html",
    text: o,
    locations: c
  });
}
class Zl extends Jl {
  constructor(e, t, i, s = {}) {
    super(e.host, s), this.channel = e, this.wnd = t, this.decorator = i;
  }
  // Convenience wrapper: builds Locators from shorthand text/cssSelector options
  // and delegates to applyDecorations, which replaces the entire decoration
  // set for a group on every call — batch everything for a group into one
  // call rather than clobbering the previous one.
  decorate(e, t) {
    this.applyDecorations(
      e.map(({ id: i, style: s, ...r }) => ({
        id: i,
        style: s,
        locator: Ql(r, this.wnd)
      })),
      t
    );
  }
  destroy() {
    super.destroy(), this.decorator.unmount(this.wnd, this.channel.frame), this.channel.frame.destroy();
  }
}
function Od(n = window, e = {}) {
  const t = new ql(), i = new Vl();
  return i.mount(n, t.frame), new Zl(t, n, i, e);
}
class Nd {
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
const yt = { range: [0, 5e3], step: 100 }, bt = { range: [0.1, 10], step: 0.1 }, vt = { range: [0, 2], step: 0.1 }, wt = { range: [0, 1], step: 0.05 }, Dn = ["none", "few", "some", "most", "custom"], Fn = ["none", "block-level", "always"], In = ["plain", "ssml"], Pn = ["none", "utterance", "block"], Ln = ["structure", "sentence"], Ni = [
  "format",
  "inlineContextualization",
  "verbosity",
  "skip",
  "contextualize",
  "language",
  "segmentation"
];
function $n(n) {
  return n == null || typeof n == "boolean" ? n : void 0;
}
function z(n, e) {
  return n == null || e.includes(n) ? n : void 0;
}
function J(n, e) {
  if (n == null) return n;
  if (typeof n != "number" || Number.isNaN(n)) return;
  const t = Math.min(...e), i = Math.max(...e);
  return n >= t && n <= i ? n : void 0;
}
function He(n) {
  return n == null || Array.isArray(n) && n.every((e) => typeof e == "string") ? n : void 0;
}
class ec {
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
    this.format = z(e.format, In) ?? "plain", this.inlineContextualization = $n(e.inlineContextualization) ?? !1, this.verbosity = z(e.verbosity, Dn) ?? "few", this.skip = He(e.skip) ?? [], this.contextualize = He(e.contextualize) ?? [], this.language = z(e.language, Fn) ?? "block-level", this.segmentation = z(e.segmentation, Ln) ?? "structure", this.pauseDuration = J(e.pauseDuration, yt.range) ?? 300, this.autoPause = z(e.autoPause, Pn) ?? "none", this.rate = J(e.rate, bt.range) ?? 1, this.pitch = J(e.pitch, vt.range) ?? 1, this.volume = J(e.volume, wt.range) ?? 1;
  }
}
class We {
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
    this.format = z(e.format, In), this.inlineContextualization = $n(e.inlineContextualization), this.verbosity = z(e.verbosity, Dn), this.skip = He(e.skip), this.contextualize = He(e.contextualize), this.language = z(e.language, Fn), this.segmentation = z(e.segmentation, Ln), this.pauseDuration = J(e.pauseDuration, yt.range), this.autoPause = z(e.autoPause, Pn), this.rate = J(e.rate, bt.range), this.pitch = J(e.pitch, vt.range), this.volume = J(e.volume, wt.range);
  }
  merging(e) {
    const t = { ...this };
    for (const i of Object.keys(e))
      e[i] !== void 0 && (t[i] = e[i]);
    return new We(t);
  }
}
class $t {
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
class Fe extends $t {
  _supportedValues;
  constructor({
    initialValue: e = null,
    effectiveValue: t,
    isEffective: i,
    onChange: s,
    supportedValues: r
  }) {
    super({ initialValue: e, effectiveValue: t, isEffective: i, onChange: s }), this._supportedValues = r;
  }
  set value(e) {
    if (e != null && z(e, this._supportedValues) === void 0)
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
class tc extends $t {
  set value(e) {
    if (e != null && $n(e) === void 0)
      throw new Error(`Value '${String(e)}' is not a boolean.`);
    this._value = e, this._onChange(this._value);
  }
  get value() {
    return this._value;
  }
}
class Ti extends $t {
  set value(e) {
    if (e != null && He(e) === void 0)
      throw new Error(`Value '${String(e)}' is not an array of strings.`);
    this._value = e, this._onChange(this._value);
  }
  get value() {
    return this._value;
  }
}
class ot extends $t {
  _supportedRange;
  _step;
  _decimals;
  constructor({
    initialValue: e = null,
    effectiveValue: t,
    isEffective: i,
    onChange: s,
    supportedRange: r,
    step: o
  }) {
    super({ initialValue: e, effectiveValue: t, isEffective: i, onChange: s }), this._supportedRange = r, this._step = o, this._decimals = this._step.toString().includes(".") ? this._step.toString().split(".")[1].length : 0;
  }
  set value(e) {
    if (e != null && J(e, this._supportedRange) === void 0)
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
class Di {
  preferences;
  settings;
  // Cloned rather than aliased: edits made through this editor's setters
  // are staged on this copy and only reach the navigator's own preferences
  // once explicitly passed to submitPreferences() — discarding the editor
  // without submitting must leave the navigator untouched.
  constructor(e, t) {
    this.preferences = new We({ ...e }), this.settings = t;
  }
  // Explicit `null`s, not `undefined` — merging() skips `undefined` fields,
  // so only `null` actually clears them once submitted.
  clear() {
    this.preferences = new We({
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
    return new Fe({
      initialValue: this.preferences.format,
      effectiveValue: this.settings.format,
      isEffective: this.preferences.format != null,
      onChange: (e) => this.updatePreference("format", e ?? null),
      supportedValues: In
    });
  }
  get inlineContextualization() {
    return new tc({
      initialValue: this.preferences.inlineContextualization,
      effectiveValue: this.settings.inlineContextualization,
      isEffective: this.preferences.inlineContextualization != null,
      onChange: (e) => this.updatePreference("inlineContextualization", e ?? null)
    });
  }
  get verbosity() {
    return new Fe({
      initialValue: this.preferences.verbosity,
      effectiveValue: this.settings.verbosity,
      isEffective: this.preferences.verbosity != null,
      onChange: (e) => this.updatePreference("verbosity", e ?? null),
      supportedValues: Dn
    });
  }
  get skip() {
    return new Ti({
      initialValue: this.preferences.skip,
      effectiveValue: this.settings.skip,
      isEffective: this.preferences.skip != null,
      onChange: (e) => this.updatePreference("skip", e ?? null)
    });
  }
  get contextualize() {
    return new Ti({
      initialValue: this.preferences.contextualize,
      effectiveValue: this.settings.contextualize,
      isEffective: this.preferences.contextualize != null,
      onChange: (e) => this.updatePreference("contextualize", e ?? null)
    });
  }
  get language() {
    return new Fe({
      initialValue: this.preferences.language,
      effectiveValue: this.settings.language,
      isEffective: this.preferences.language != null,
      onChange: (e) => this.updatePreference("language", e ?? null),
      supportedValues: Fn
    });
  }
  get segmentation() {
    return new Fe({
      initialValue: this.preferences.segmentation,
      effectiveValue: this.settings.segmentation,
      isEffective: this.preferences.segmentation != null,
      onChange: (e) => this.updatePreference("segmentation", e ?? null),
      supportedValues: Ln
    });
  }
  get pauseDuration() {
    return new ot({
      initialValue: this.preferences.pauseDuration,
      effectiveValue: this.settings.pauseDuration,
      isEffective: this.preferences.pauseDuration != null,
      onChange: (e) => this.updatePreference("pauseDuration", e ?? null),
      supportedRange: yt.range,
      step: yt.step
    });
  }
  get autoPause() {
    return new Fe({
      initialValue: this.preferences.autoPause,
      effectiveValue: this.settings.autoPause,
      isEffective: this.preferences.autoPause != null,
      onChange: (e) => this.updatePreference("autoPause", e ?? null),
      supportedValues: Pn
    });
  }
  get rate() {
    return new ot({
      initialValue: this.preferences.rate,
      effectiveValue: this.settings.rate,
      isEffective: this.preferences.rate != null,
      onChange: (e) => this.updatePreference("rate", e ?? null),
      supportedRange: bt.range,
      step: bt.step
    });
  }
  get pitch() {
    return new ot({
      initialValue: this.preferences.pitch,
      effectiveValue: this.settings.pitch,
      isEffective: this.preferences.pitch != null,
      onChange: (e) => this.updatePreference("pitch", e ?? null),
      supportedRange: vt.range,
      step: vt.step
    });
  }
  get volume() {
    return new ot({
      initialValue: this.preferences.volume,
      effectiveValue: this.settings.volume,
      isEffective: this.preferences.volume != null,
      onChange: (e) => this.updatePreference("volume", e ?? null),
      supportedRange: wt.range,
      step: wt.step
    });
  }
}
const Sr = ["audio", "figure", "image", "math", "table", "video"], yr = [
  ...Sr,
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
], nc = [
  ...yr,
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
], ic = {
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
}, sc = {
  none: /* @__PURE__ */ new Set(),
  few: new Set(Sr),
  some: new Set(yr),
  most: new Set(nc)
}, mn = {
  table: { few: "inline", some: "block", most: "block" }
};
function at(n) {
  const e = {};
  for (const t of Object.keys(mn))
    e[t] = mn[t]?.[n] ?? "inline";
  return e;
}
const rc = {
  none: at("none"),
  few: at("few"),
  some: at("some"),
  most: at("most")
}, Td = Object.keys(mn);
function oc(n, e) {
  const t = n === "custom" ? {} : rc[n];
  if (!e) return t;
  const i = { ...t };
  for (const s of Object.keys(e)) {
    const r = e[s]?.[n];
    r && (i[s] = r);
  }
  return i;
}
class Fi {
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
    this.format = e.format ?? t.format, this.inlineContextualization = e.inlineContextualization ?? t.inlineContextualization, this.verbosity = e.verbosity ?? t.verbosity, this.verbosity === "custom" ? (this.skip = e.skip ?? t.skip, this.contextualize = e.contextualize ?? t.contextualize) : (this.skip = [...ic[this.verbosity]], this.contextualize = [...sc[this.verbosity]]), this.language = e.language ?? t.language, this.segmentation = e.segmentation ?? t.segmentation, this.pauseDuration = e.pauseDuration ?? t.pauseDuration, this.autoPause = e.autoPause ?? t.autoPause, this.rate = e.rate ?? t.rate, this.pitch = e.pitch ?? t.pitch, this.volume = e.volume ?? t.volume;
  }
}
const Ii = /* @__PURE__ */ new WeakMap(), br = /* @__PURE__ */ new WeakMap();
function Pi(n, e) {
  br.set(n, e);
}
const vr = /* @__PURE__ */ new WeakSet();
function Li(n) {
  return vr.add(n), n;
}
function ac(n, e, t) {
  const i = br.get(n);
  if (i) {
    const u = ti(i.map, e), h = ti(i.map, e + t);
    e = u, t = Math.max(0, h - u);
  }
  const s = n.offsets, r = !n.plain && !!n.ssml, o = i?.plain ?? n.plain ?? (n.ssml ? ae(n.ssml) : "");
  if (!s?.length || !o) return;
  const a = Ii.get(n), l = a !== void 0 && e >= a.cursor;
  let c = l ? a.cursor : 0;
  for (let u = l ? a.pieceIndex : 0; u < s.length; u++) {
    const h = s[u], d = h.locate.text?.highlight, f = d ? r ? ae(d) : d : o.slice(c);
    if (!f) continue;
    const g = o.indexOf(f, c);
    if (g === -1) continue;
    const p = g + f.length;
    if (e >= g && e < p) {
      if (vr.has(h.locate)) return;
      Ii.set(n, { pieceIndex: u, cursor: c });
      const m = e - g, b = f.substring(m, Math.min(m + t, f.length));
      return { locate: {
        ...h.locate,
        domRange: void 0,
        text: {
          highlight: b,
          before: f.substring(0, m),
          after: f.substring(m + b.length)
        }
      }, word: b };
    }
    c = p;
  }
}
function lc(n, e) {
  return e === "sentence" && n.offsets?.length ? n.offsets.map((t) => t.locate) : n.locate ? [n.locate] : [];
}
const x = (n) => typeof n == "string", Ie = () => {
  let n, e;
  const t = new Promise((i, s) => {
    n = i, e = s;
  });
  return t.resolve = n, t.reject = e, t;
}, $i = (n) => n == null ? "" : String(n), cc = (n, e, t) => {
  n.forEach((i) => {
    e[i] && (t[i] = e[i]);
  });
}, uc = /###/g, Mi = (n) => n && n.includes("###") ? n.replace(uc, ".") : n, _i = (n) => !n || x(n), Be = (n, e, t) => {
  const i = x(e) ? e.split(".") : e;
  let s = 0;
  for (; s < i.length - 1; ) {
    if (_i(n)) return {};
    const r = Mi(i[s]);
    !n[r] && t && (n[r] = new t()), Object.prototype.hasOwnProperty.call(n, r) ? n = n[r] : n = {}, ++s;
  }
  return _i(n) ? {} : {
    obj: n,
    k: Mi(i[s])
  };
}, Bi = (n, e, t) => {
  const {
    obj: i,
    k: s
  } = Be(n, e, Object);
  if (i !== void 0 || e.length === 1) {
    i[s] = t;
    return;
  }
  let r = e[e.length - 1], o = e.slice(0, e.length - 1), a = Be(n, o, Object);
  for (; a.obj === void 0 && o.length; )
    r = `${o[o.length - 1]}.${r}`, o = o.slice(0, o.length - 1), a = Be(n, o, Object), a?.obj && typeof a.obj[`${a.k}.${r}`] < "u" && (a.obj = void 0);
  a.obj[`${a.k}.${r}`] = t;
}, hc = (n, e, t, i) => {
  const {
    obj: s,
    k: r
  } = Be(n, e, Object);
  s[r] = s[r] || [], s[r].push(t);
}, xt = (n, e) => {
  const {
    obj: t,
    k: i
  } = Be(n, e);
  if (t && Object.prototype.hasOwnProperty.call(t, i))
    return t[i];
}, dc = (n, e, t) => {
  const i = xt(n, t);
  return i !== void 0 ? i : xt(e, t);
}, wr = (n, e, t) => {
  for (const i in e)
    i !== "__proto__" && i !== "constructor" && (Object.prototype.hasOwnProperty.call(n, i) ? x(n[i]) || n[i] instanceof String || x(e[i]) || e[i] instanceof String ? t && (n[i] = e[i]) : wr(n[i], e[i], t) : n[i] = e[i]);
  return n;
}, K = (n) => n.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), fc = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;"
}, gc = (n) => x(n) ? n.replace(/[&<>"'\/]/g, (e) => fc[e]) : n;
class pc {
  constructor(e) {
    this.capacity = e, this.regExpMap = /* @__PURE__ */ new Map(), this.regExpQueue = [];
  }
  getRegExp(e) {
    const t = this.regExpMap.get(e);
    if (t !== void 0)
      return t;
    const i = new RegExp(e);
    return this.regExpQueue.length === this.capacity && this.regExpMap.delete(this.regExpQueue.shift()), this.regExpMap.set(e, i), this.regExpQueue.push(e), i;
  }
}
const mc = [" ", ",", "?", "!", ";"], Sc = new pc(20), yc = (n, e, t) => {
  e = e || "", t = t || "";
  const i = mc.filter((o) => !e.includes(o) && !t.includes(o));
  if (i.length === 0) return !0;
  const s = Sc.getRegExp(`(${i.map((o) => o === "?" ? "\\?" : o).join("|")})`);
  let r = !s.test(n);
  if (!r) {
    const o = n.indexOf(t);
    o > 0 && !s.test(n.substring(0, o)) && (r = !0);
  }
  return r;
}, Sn = (n, e, t = ".") => {
  if (!n) return;
  if (n[e])
    return Object.prototype.hasOwnProperty.call(n, e) ? n[e] : void 0;
  const i = e.split(t);
  let s = n;
  for (let r = 0; r < i.length; ) {
    if (!s || typeof s != "object")
      return;
    let o, a = "";
    for (let l = r; l < i.length; ++l)
      if (l !== r && (a += t), a += i[l], o = s[a], o !== void 0) {
        if (["string", "number", "boolean"].includes(typeof o) && l < i.length - 1)
          continue;
        r += l - r + 1;
        break;
      }
    s = o;
  }
  return s;
}, Ke = (n) => n?.replace(/_/g, "-"), bc = {
  type: "logger",
  log(n) {
    this.output("log", n);
  },
  warn(n) {
    this.output("warn", n);
  },
  error(n) {
    this.output("error", n);
  },
  output(n, e) {
    console?.[n]?.apply?.(console, e);
  }
};
class Et {
  constructor(e, t = {}) {
    this.init(e, t);
  }
  init(e, t = {}) {
    this.prefix = t.prefix || "i18next:", this.logger = e || bc, this.options = t, this.debug = t.debug;
  }
  log(...e) {
    return this.forward(e, "log", "", !0);
  }
  warn(...e) {
    return this.forward(e, "warn", "", !0);
  }
  error(...e) {
    return this.forward(e, "error", "");
  }
  deprecate(...e) {
    return this.forward(e, "warn", "WARNING DEPRECATED: ", !0);
  }
  forward(e, t, i, s) {
    return s && !this.debug ? null : (e = e.map((r) => x(r) ? r.replace(/[\r\n\x00-\x1F\x7F]/g, " ") : r), x(e[0]) && (e[0] = `${i}${this.prefix} ${e[0]}`), this.logger[t](e));
  }
  create(e) {
    return new Et(this.logger, {
      prefix: `${this.prefix}:${e}:`,
      ...this.options
    });
  }
  clone(e) {
    return e = e || this.options, e.prefix = e.prefix || this.prefix, new Et(this.logger, e);
  }
}
var W = new Et();
class Mt {
  constructor() {
    this.observers = {};
  }
  on(e, t) {
    return e.split(" ").forEach((i) => {
      this.observers[i] || (this.observers[i] = /* @__PURE__ */ new Map());
      const s = this.observers[i].get(t) || 0;
      this.observers[i].set(t, s + 1);
    }), this;
  }
  off(e, t) {
    if (this.observers[e]) {
      if (!t) {
        delete this.observers[e];
        return;
      }
      this.observers[e].delete(t);
    }
  }
  once(e, t) {
    const i = (...s) => {
      t(...s), this.off(e, i);
    };
    return this.on(e, i), this;
  }
  emit(e, ...t) {
    this.observers[e] && Array.from(this.observers[e].entries()).forEach(([s, r]) => {
      for (let o = 0; o < r; o++)
        s(...t);
    }), this.observers["*"] && Array.from(this.observers["*"].entries()).forEach(([s, r]) => {
      for (let o = 0; o < r; o++)
        s(e, ...t);
    });
  }
}
class Ui extends Mt {
  constructor(e, t = {
    ns: ["translation"],
    defaultNS: "translation"
  }) {
    super(), this.data = e || {}, this.options = t, this.options.keySeparator === void 0 && (this.options.keySeparator = "."), this.options.ignoreJSONStructure === void 0 && (this.options.ignoreJSONStructure = !0);
  }
  addNamespaces(e) {
    this.options.ns.includes(e) || this.options.ns.push(e);
  }
  removeNamespaces(e) {
    const t = this.options.ns.indexOf(e);
    t > -1 && this.options.ns.splice(t, 1);
  }
  getResource(e, t, i, s = {}) {
    const r = s.keySeparator !== void 0 ? s.keySeparator : this.options.keySeparator, o = s.ignoreJSONStructure !== void 0 ? s.ignoreJSONStructure : this.options.ignoreJSONStructure;
    let a;
    e.includes(".") ? a = e.split(".") : (a = [e, t], i && (Array.isArray(i) ? a.push(...i) : x(i) && r ? a.push(...i.split(r)) : a.push(i)));
    const l = xt(this.data, a);
    return !l && !t && !i && e.includes(".") && (e = a[0], t = a[1], i = a.slice(2).join(".")), l || !o || !x(i) ? l : Sn(this.data?.[e]?.[t], i, r);
  }
  addResource(e, t, i, s, r = {
    silent: !1
  }) {
    const o = r.keySeparator !== void 0 ? r.keySeparator : this.options.keySeparator;
    let a = [e, t];
    i && (a = a.concat(o ? i.split(o) : i)), e.includes(".") && (a = e.split("."), s = t, t = a[1]), this.addNamespaces(t), Bi(this.data, a, s), r.silent || this.emit("added", e, t, i, s);
  }
  addResources(e, t, i, s = {
    silent: !1
  }) {
    for (const r in i)
      (x(i[r]) || Array.isArray(i[r])) && this.addResource(e, t, r, i[r], {
        silent: !0
      });
    s.silent || this.emit("added", e, t, i);
  }
  addResourceBundle(e, t, i, s, r, o = {
    silent: !1,
    skipCopy: !1
  }) {
    let a = [e, t];
    e.includes(".") && (a = e.split("."), s = i, i = t, t = a[1]), this.addNamespaces(t);
    let l = xt(this.data, a) || {};
    o.skipCopy || (i = JSON.parse(JSON.stringify(i))), s ? wr(l, i, r) : l = {
      ...l,
      ...i
    }, Bi(this.data, a, l), o.silent || this.emit("added", e, t, i);
  }
  removeResourceBundle(e, t) {
    this.hasResourceBundle(e, t) && delete this.data[e][t], this.removeNamespaces(t), this.emit("removed", e, t);
  }
  hasResourceBundle(e, t) {
    return this.getResource(e, t) !== void 0;
  }
  getResourceBundle(e, t) {
    return t || (t = this.options.defaultNS), this.getResource(e, t);
  }
  getDataByLanguage(e) {
    return this.data[e];
  }
  hasLanguageSomeTranslations(e) {
    const t = this.getDataByLanguage(e);
    return !!(t && Object.keys(t) || []).find((s) => t[s] && Object.keys(t[s]).length > 0);
  }
  toJSON() {
    return this.data;
  }
}
var xr = {
  processors: {},
  addPostProcessor(n) {
    this.processors[n.name] = n;
  },
  handle(n, e, t, i, s) {
    return n.forEach((r) => {
      e = this.processors[r]?.process(e, t, i, s) ?? e;
    }), e;
  }
};
const Er = /* @__PURE__ */ Symbol("i18next/PATH_KEY");
function vc() {
  const n = [], e = /* @__PURE__ */ Object.create(null);
  let t;
  return e.get = (i, s) => (t?.revoke?.(), s === Er ? n : (n.push(s), t = Proxy.revocable(i, e), t.proxy)), Proxy.revocable(/* @__PURE__ */ Object.create(null), e).proxy;
}
function be(n, e) {
  const {
    [Er]: t
  } = n(vc()), i = e?.keySeparator ?? ".", s = e?.nsSeparator ?? ":", r = e?.enableSelector === "strict";
  if (t.length > 1 && s) {
    const o = e?.ns, a = r ? Array.isArray(o) ? o : o ? [o] : null : Array.isArray(o) ? o : null;
    if (a && (r ? a : a.length > 1 ? a.slice(1) : []).includes(t[0]))
      return `${t[0]}${s}${t.slice(1).join(i)}`;
  }
  return t.join(i);
}
const Yt = (n) => !x(n) && typeof n != "boolean" && typeof n != "number";
class Ct extends Mt {
  constructor(e, t = {}) {
    super(), cc(["resourceStore", "languageUtils", "pluralResolver", "interpolator", "backendConnector", "i18nFormat", "utils"], e, this), this.options = t, this.options.keySeparator === void 0 && (this.options.keySeparator = "."), this.logger = W.create("translator"), this.checkedLoadedFor = {};
  }
  changeLanguage(e) {
    e && (this.language = e);
  }
  exists(e, t = {
    interpolation: {}
  }) {
    const i = {
      ...t
    };
    if (e == null) return !1;
    const s = this.resolve(e, i);
    if (s?.res === void 0) return !1;
    const r = Yt(s.res);
    return !(i.returnObjects === !1 && r);
  }
  extractFromKey(e, t) {
    let i = t.nsSeparator !== void 0 ? t.nsSeparator : this.options.nsSeparator;
    i === void 0 && (i = ":");
    const s = t.keySeparator !== void 0 ? t.keySeparator : this.options.keySeparator;
    let r = t.ns || this.options.defaultNS || [];
    const o = i && e.includes(i), a = !this.options.userDefinedKeySeparator && !t.keySeparator && !this.options.userDefinedNsSeparator && !t.nsSeparator && !yc(e, i, s);
    if (o && !a) {
      const l = e.match(this.interpolator.nestingRegexp);
      if (l && l.length > 0)
        return {
          key: e,
          namespaces: x(r) ? [r] : r
        };
      const c = e.split(i);
      (i !== s || i === s && this.options.ns.includes(c[0])) && (r = c.shift()), e = c.join(s);
    }
    return {
      key: e,
      namespaces: x(r) ? [r] : r
    };
  }
  translate(e, t, i) {
    let s = typeof t == "object" ? {
      ...t
    } : t;
    if (typeof s != "object" && this.options.overloadTranslationOptionHandler && (s = this.options.overloadTranslationOptionHandler(arguments)), typeof s == "object" && (s = {
      ...s
    }), s || (s = {}), e == null) return "";
    typeof e == "function" && (e = be(e, {
      ...this.options,
      ...s
    })), Array.isArray(e) || (e = [String(e)]), e = e.map((F) => typeof F == "function" ? be(F, {
      ...this.options,
      ...s
    }) : String(F));
    const r = s.returnDetails !== void 0 ? s.returnDetails : this.options.returnDetails, o = s.keySeparator !== void 0 ? s.keySeparator : this.options.keySeparator, {
      key: a,
      namespaces: l
    } = this.extractFromKey(e[e.length - 1], s), c = l[l.length - 1];
    let u = s.nsSeparator !== void 0 ? s.nsSeparator : this.options.nsSeparator;
    u === void 0 && (u = ":");
    const h = s.lng || this.language, d = s.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
    if (h?.toLowerCase() === "cimode")
      return d ? r ? {
        res: `${c}${u}${a}`,
        usedKey: a,
        exactUsedKey: a,
        usedLng: h,
        usedNS: c,
        usedParams: this.getUsedParamsDetails(s)
      } : `${c}${u}${a}` : r ? {
        res: a,
        usedKey: a,
        exactUsedKey: a,
        usedLng: h,
        usedNS: c,
        usedParams: this.getUsedParamsDetails(s)
      } : a;
    const f = this.resolve(e, s);
    let g = f?.res;
    const p = f?.usedKey || a, m = f?.exactUsedKey || a, b = ["[object Number]", "[object Function]", "[object RegExp]"], w = s.joinArrays !== void 0 ? s.joinArrays : this.options.joinArrays, S = !this.i18nFormat || this.i18nFormat.handleAsObject, y = s.count !== void 0 && !x(s.count), v = Ct.hasDefaultValue(s), C = y ? this.pluralResolver.getSuffix(h, s.count, s) : "", R = s.ordinal && y ? this.pluralResolver.getSuffix(h, s.count, {
      ordinal: !1
    }) : "", A = y && !s.ordinal && s.count === 0, T = A && s[`defaultValue${this.options.pluralSeparator}zero`] || s[`defaultValue${C}`] || s[`defaultValue${R}`] || s.defaultValue;
    let O = g;
    S && !g && v && (O = T);
    const Ze = Yt(O), ue = Object.prototype.toString.apply(O);
    if (S && O && Ze && !b.includes(ue) && !(x(w) && Array.isArray(O))) {
      if (!s.returnObjects && !this.options.returnObjects) {
        this.options.returnedObjectHandler || this.logger.warn("accessing an object - but returnObjects options is not enabled!");
        const F = this.options.returnedObjectHandler ? this.options.returnedObjectHandler(p, O, {
          ...s,
          ns: l
        }) : `key '${a} (${this.language})' returned an object instead of string.`;
        return r ? (f.res = F, f.usedParams = this.getUsedParamsDetails(s), f) : F;
      }
      if (o) {
        const F = Array.isArray(O), $ = F ? [] : {}, Re = F ? m : p;
        for (const V in O)
          if (Object.prototype.hasOwnProperty.call(O, V)) {
            const j = `${Re}${o}${V}`;
            v && !g ? $[V] = this.translate(j, {
              ...s,
              defaultValue: Yt(T) ? T[V] : void 0,
              joinArrays: !1,
              ns: l
            }) : $[V] = this.translate(j, {
              ...s,
              joinArrays: !1,
              ns: l
            }), $[V] === j && ($[V] = O[V]);
          }
        g = $;
      }
    } else if (S && x(w) && Array.isArray(g))
      g = g.join(w), g && (g = this.extendTranslation(g, e, s, i));
    else {
      let F = !1, $ = !1;
      !this.isValidLookup(g) && v && (F = !0, g = T), this.isValidLookup(g) || ($ = !0, g = a);
      const V = (s.missingKeyNoValueFallbackToKey || this.options.missingKeyNoValueFallbackToKey) && $ ? void 0 : g, j = v && T !== g && this.options.updateMissing;
      if ($ || F || j) {
        if (this.logger.log(j ? "updateKey" : "missingKey", h, c, y && !j ? `${a}${this.pluralResolver.getSuffix(h, s.count, s)}` : a, j ? T : g), o) {
          const M = this.resolve(a, {
            ...s,
            keySeparator: !1
          });
          M && M.res && this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.");
        }
        let Ae = [];
        const et = this.languageUtils.getFallbackCodes(this.options.fallbackLng, s.lng || this.language);
        if (this.options.saveMissingTo === "fallback" && et && et[0])
          for (let M = 0; M < et.length; M++)
            Ae.push(et[M]);
        else this.options.saveMissingTo === "all" ? Ae = this.languageUtils.toResolveHierarchy(s.lng || this.language) : Ae.push(s.lng || this.language);
        const Kn = (M, ee, Oe) => {
          const qn = v && Oe !== g ? Oe : V;
          this.options.missingKeyHandler ? this.options.missingKeyHandler(M, c, ee, qn, j, s) : this.backendConnector?.saveMissing && this.backendConnector.saveMissing(M, c, ee, qn, j, s), this.emit("missingKey", M, c, ee, g);
        };
        this.options.saveMissing && (this.options.saveMissingPlurals && y ? Ae.forEach((M) => {
          const ee = this.pluralResolver.getSuffixes(M, s);
          A && s[`defaultValue${this.options.pluralSeparator}zero`] && !ee.includes(`${this.options.pluralSeparator}zero`) && ee.push(`${this.options.pluralSeparator}zero`), ee.forEach((Oe) => {
            Kn([M], a + Oe, s[`defaultValue${Oe}`] || T);
          });
        }) : Kn(Ae, a, T));
      }
      g = this.extendTranslation(g, e, s, f, i), $ && g === a && this.options.appendNamespaceToMissingKey && (g = `${c}${u}${a}`), ($ || F) && this.options.parseMissingKeyHandler && (g = this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey ? `${c}${u}${a}` : a, F ? g : void 0, s));
    }
    return r ? (f.res = g, f.usedParams = this.getUsedParamsDetails(s), f) : g;
  }
  extendTranslation(e, t, i, s, r) {
    if (this.i18nFormat?.parse)
      e = this.i18nFormat.parse(e, {
        ...this.options.interpolation.defaultVariables,
        ...i
      }, i.lng || this.language || s.usedLng, s.usedNS, s.usedKey, {
        resolved: s
      });
    else if (!i.skipInterpolation) {
      i.interpolation && this.interpolator.init({
        ...i,
        interpolation: {
          ...this.options.interpolation,
          ...i.interpolation
        }
      });
      const l = x(e) && (i?.interpolation?.skipOnVariables !== void 0 ? i.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables);
      let c;
      if (l) {
        const h = e.match(this.interpolator.nestingRegexp);
        c = h && h.length;
      }
      let u = i.replace && !x(i.replace) ? i.replace : i;
      if (this.options.interpolation.defaultVariables && (u = {
        ...this.options.interpolation.defaultVariables,
        ...u
      }), e = this.interpolator.interpolate(e, u, i.lng || this.language || s.usedLng, i), l) {
        const h = e.match(this.interpolator.nestingRegexp), d = h && h.length;
        c < d && (i.nest = !1);
      }
      !i.lng && s && s.res && (i.lng = this.language || s.usedLng), i.nest !== !1 && (e = this.interpolator.nest(e, (...h) => r?.[0] === h[0] && !i.context ? (this.logger.warn(`It seems you are nesting recursively key: ${h[0]} in key: ${t[0]}`), null) : this.translate(...h, t), i)), i.interpolation && this.interpolator.reset();
    }
    const o = i.postProcess || this.options.postProcess, a = x(o) ? [o] : o;
    return e != null && a?.length && i.applyPostProcessor !== !1 && (e = xr.handle(a, e, t, this.options && this.options.postProcessPassResolved ? {
      i18nResolved: {
        ...s,
        usedParams: this.getUsedParamsDetails(i)
      },
      ...i
    } : i, this)), e;
  }
  resolve(e, t = {}) {
    let i, s, r, o, a;
    return x(e) && (e = [e]), Array.isArray(e) && (e = e.map((l) => typeof l == "function" ? be(l, {
      ...this.options,
      ...t
    }) : l)), e.forEach((l) => {
      if (this.isValidLookup(i)) return;
      const c = this.extractFromKey(l, t), u = c.key;
      s = u;
      let h = c.namespaces;
      this.options.fallbackNS && (h = h.concat(this.options.fallbackNS));
      const d = t.count !== void 0 && !x(t.count), f = d && !t.ordinal && t.count === 0, g = t.context !== void 0 && (x(t.context) || typeof t.context == "number") && t.context !== "", p = t.lngs ? t.lngs : this.languageUtils.toResolveHierarchy(t.lng || this.language, t.fallbackLng);
      h.forEach((m) => {
        this.isValidLookup(i) || (a = m, !this.checkedLoadedFor[`${p[0]}-${m}`] && this.utils?.hasLoadedNamespace && !this.utils?.hasLoadedNamespace(a) && (this.checkedLoadedFor[`${p[0]}-${m}`] = !0, this.logger.warn(`key "${s}" for languages "${p.join(", ")}" won't get resolved as namespace "${a}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!")), p.forEach((b) => {
          if (this.isValidLookup(i)) return;
          o = b;
          const w = [u];
          if (this.i18nFormat?.addLookupKeys)
            this.i18nFormat.addLookupKeys(w, u, b, m, t);
          else {
            let y;
            d && (y = this.pluralResolver.getSuffix(b, t.count, t));
            const v = `${this.options.pluralSeparator}zero`, C = `${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;
            if (d && (t.ordinal && y.startsWith(C) && w.push(u + y.replace(C, this.options.pluralSeparator)), w.push(u + y), f && w.push(u + v)), g) {
              const R = `${u}${this.options.contextSeparator || "_"}${t.context}`;
              w.push(R), d && (t.ordinal && y.startsWith(C) && w.push(R + y.replace(C, this.options.pluralSeparator)), w.push(R + y), f && w.push(R + v));
            }
          }
          let S;
          for (; S = w.pop(); )
            this.isValidLookup(i) || (r = S, i = this.getResource(b, m, S, t));
        }));
      });
    }), {
      res: i,
      usedKey: s,
      exactUsedKey: r,
      usedLng: o,
      usedNS: a
    };
  }
  isValidLookup(e) {
    return e !== void 0 && !(!this.options.returnNull && e === null) && !(!this.options.returnEmptyString && e === "");
  }
  getResource(e, t, i, s = {}) {
    return this.i18nFormat?.getResource ? this.i18nFormat.getResource(e, t, i, s) : this.resourceStore.getResource(e, t, i, s);
  }
  getUsedParamsDetails(e = {}) {
    const t = ["defaultValue", "ordinal", "context", "replace", "lng", "lngs", "fallbackLng", "ns", "keySeparator", "nsSeparator", "returnObjects", "returnDetails", "joinArrays", "postProcess", "interpolation"], i = e.replace && !x(e.replace);
    let s = i ? e.replace : e;
    if (i && typeof e.count < "u" && (s = {
      ...s,
      count: e.count
    }), this.options.interpolation.defaultVariables && (s = {
      ...this.options.interpolation.defaultVariables,
      ...s
    }), !i) {
      s = {
        ...s
      };
      for (const r of t)
        delete s[r];
    }
    return s;
  }
  static hasDefaultValue(e) {
    const t = "defaultValue";
    for (const i in e)
      if (Object.prototype.hasOwnProperty.call(e, i) && i.startsWith(t) && e[i] !== void 0)
        return !0;
    return !1;
  }
}
class zi {
  constructor(e) {
    this.options = e, this.supportedLngs = this.options.supportedLngs || !1, this.logger = W.create("languageUtils"), this.resolveHierarchyCache = {};
  }
  clearCache() {
    this.resolveHierarchyCache = {};
  }
  getScriptPartFromCode(e) {
    if (e = Ke(e), !e || !e.includes("-")) return null;
    const t = e.split("-");
    return t.length === 2 || (t.pop(), t[t.length - 1].toLowerCase() === "x") ? null : this.formatLanguageCode(t.join("-"));
  }
  getLanguagePartFromCode(e) {
    if (e = Ke(e), !e || !e.includes("-")) return e;
    const t = e.split("-");
    return this.formatLanguageCode(t[0]);
  }
  formatLanguageCode(e) {
    if (x(e) && e.includes("-")) {
      let t;
      try {
        t = Intl.getCanonicalLocales(e)[0];
      } catch {
      }
      return t && this.options.lowerCaseLng && (t = t.toLowerCase()), t || (this.options.lowerCaseLng ? e.toLowerCase() : e);
    }
    return this.options.cleanCode || this.options.lowerCaseLng ? e.toLowerCase() : e;
  }
  isSupportedCode(e) {
    return (this.options.load === "languageOnly" || this.options.nonExplicitSupportedLngs) && (e = this.getLanguagePartFromCode(e)), !this.supportedLngs || !this.supportedLngs.length || this.supportedLngs.includes(e);
  }
  getBestMatchFromCodes(e) {
    if (!e) return null;
    let t;
    return e.forEach((i) => {
      if (t) return;
      const s = this.formatLanguageCode(i);
      (!this.options.supportedLngs || this.isSupportedCode(s)) && (t = s);
    }), !t && this.options.supportedLngs && e.forEach((i) => {
      if (t) return;
      const s = this.getScriptPartFromCode(i);
      if (this.isSupportedCode(s)) return t = s;
      const r = this.getLanguagePartFromCode(i);
      if (this.isSupportedCode(r)) return t = r;
      t = this.options.supportedLngs.find((o) => o === r ? !0 : !o.includes("-") && !r.includes("-") ? !1 : !!(o.includes("-") && !r.includes("-") && o.slice(0, o.indexOf("-")) === r || o.startsWith(r) && r.length > 1));
    }), t || (t = this.getFallbackCodes(this.options.fallbackLng)[0]), t;
  }
  getFallbackCodes(e, t) {
    if (!e) return [];
    if (typeof e == "function" && (e = e(t)), x(e) && (e = [e]), Array.isArray(e)) return e;
    if (!t) return e.default || [];
    let i = e[t];
    return i || (i = e[this.getScriptPartFromCode(t)]), i || (i = e[this.formatLanguageCode(t)]), i || (i = e[this.getLanguagePartFromCode(t)]), i || (i = e.default), i || [];
  }
  toResolveHierarchy(e, t) {
    const i = this.options.fallbackLng, s = Array.isArray(i) ? i.join("|") : i;
    s !== this._cachedFallbackLng && (this.resolveHierarchyCache = {}, this._cachedFallbackLng = s);
    const r = t === void 0 || t === !1 || x(t), o = t === void 0 && typeof this.options.fallbackLng == "function", a = x(e) && r && !o;
    let l = null;
    if (a) {
      let d;
      t === void 0 ? d = "undefined" : t === !1 ? d = "boolean:false" : d = `string:${t}`, l = `${e.length}:${e}|${d}`;
    }
    if (l !== null) {
      const d = this.resolveHierarchyCache[l];
      if (d !== void 0) return d.slice();
    }
    const c = this.getFallbackCodes((t === !1 ? [] : t) || this.options.fallbackLng || [], e), u = [], h = (d) => {
      d && (this.isSupportedCode(d) ? u.push(d) : this.logger.warn(`rejecting language code not found in supportedLngs: ${d}`));
    };
    return x(e) && (e.includes("-") || e.includes("_")) ? (this.options.load !== "languageOnly" && h(this.formatLanguageCode(e)), this.options.load !== "languageOnly" && this.options.load !== "currentOnly" && h(this.getScriptPartFromCode(e)), this.options.load !== "currentOnly" && h(this.getLanguagePartFromCode(e))) : x(e) && h(this.formatLanguageCode(e)), c.forEach((d) => {
      u.includes(d) || h(this.formatLanguageCode(d));
    }), l !== null ? (this.resolveHierarchyCache[l] = u, u.slice()) : u;
  }
}
const Vi = {
  zero: 0,
  one: 1,
  two: 2,
  few: 3,
  many: 4,
  other: 5
}, ji = {
  select: (n) => n === 1 ? "one" : "other",
  resolvedOptions: () => ({
    pluralCategories: ["one", "other"]
  })
};
class wc {
  constructor(e, t = {}) {
    this.languageUtils = e, this.options = t, this.logger = W.create("pluralResolver"), this.pluralRulesCache = {};
  }
  clearCache() {
    this.pluralRulesCache = {};
  }
  getRule(e, t = {}) {
    const i = Ke(e === "dev" ? "en" : e), s = t.ordinal ? "ordinal" : "cardinal", r = JSON.stringify({
      cleanedCode: i,
      type: s
    });
    if (r in this.pluralRulesCache)
      return this.pluralRulesCache[r];
    let o;
    try {
      o = new Intl.PluralRules(i, {
        type: s
      });
    } catch {
      if (typeof Intl > "u")
        return this.logger.error("No Intl support, please use an Intl polyfill!"), ji;
      if (!e.match(/-|_/)) return ji;
      const l = this.languageUtils.getLanguagePartFromCode(e);
      o = this.getRule(l, t);
    }
    return this.pluralRulesCache[r] = o, o;
  }
  needsPlural(e, t = {}) {
    let i = this.getRule(e, t);
    return i || (i = this.getRule("dev", t)), i?.resolvedOptions().pluralCategories.length > 1;
  }
  getPluralFormsOfKey(e, t, i = {}) {
    return this.getSuffixes(e, i).map((s) => `${t}${s}`);
  }
  getSuffixes(e, t = {}) {
    let i = this.getRule(e, t);
    return i || (i = this.getRule("dev", t)), i ? i.resolvedOptions().pluralCategories.sort((s, r) => Vi[s] - Vi[r]).map((s) => `${this.options.prepend}${t.ordinal ? `ordinal${this.options.prepend}` : ""}${s}`) : [];
  }
  getSuffix(e, t, i = {}) {
    const s = this.getRule(e, i);
    return s ? `${this.options.prepend}${i.ordinal ? `ordinal${this.options.prepend}` : ""}${s.select(t)}` : (this.logger.warn(`no plural rule found for: ${e}`), this.getSuffix("dev", t, i));
  }
}
const Hi = (n, e, t, i = ".", s = !0) => {
  let r = dc(n, e, t);
  return !r && s && x(t) && (r = Sn(n, t, i), r === void 0 && (r = Sn(e, t, i))), r;
}, xc = (n) => n.replace(/\$/g, "$$$$");
class Wi {
  constructor(e = {}) {
    this.logger = W.create("interpolator"), this.options = e, this.format = e?.interpolation?.format || ((t) => t), this.init(e);
  }
  init(e = {}) {
    e.interpolation || (e.interpolation = {
      escapeValue: !0
    });
    const {
      escape: t,
      escapeValue: i,
      useRawValueToEscape: s,
      prefix: r,
      prefixEscaped: o,
      suffix: a,
      suffixEscaped: l,
      formatSeparator: c,
      unescapeSuffix: u,
      unescapePrefix: h,
      nestingPrefix: d,
      nestingPrefixEscaped: f,
      nestingSuffix: g,
      nestingSuffixEscaped: p,
      nestingOptionsSeparator: m,
      maxReplaces: b,
      alwaysFormat: w
    } = e.interpolation;
    this.escape = t !== void 0 ? t : gc, this.escapeValue = i !== void 0 ? i : !0, this.useRawValueToEscape = s !== void 0 ? s : !1, this.prefix = r ? K(r) : o || "{{", this.suffix = a ? K(a) : l || "}}", this.formatSeparator = c || ",", this.unescapePrefix = u ? "" : h ? K(h) : "-", this.unescapeSuffix = this.unescapePrefix ? "" : u ? K(u) : "", this.nestingPrefix = d ? K(d) : f || K("$t("), this.nestingSuffix = g ? K(g) : p || K(")"), this.nestingOptionsSeparator = m || ",", this.maxReplaces = b || 1e3, this.alwaysFormat = w !== void 0 ? w : !1, this.resetRegExp();
  }
  reset() {
    this.options && this.init(this.options);
  }
  resetRegExp() {
    const e = (t, i) => t?.source === i ? (t.lastIndex = 0, t) : new RegExp(i, "g");
    this.regexp = e(this.regexp, `${this.prefix}(.+?)${this.suffix}`), this.regexpUnescape = e(this.regexpUnescape, `${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`), this.nestingRegexp = e(this.nestingRegexp, `${this.nestingPrefix}((?:[^()"']+|"[^"]*"|'[^']*'|\\((?:[^()]|"[^"]*"|'[^']*')*\\))*?)${this.nestingSuffix}`);
  }
  interpolate(e, t, i, s) {
    let r, o, a;
    const l = this.options && this.options.interpolation && this.options.interpolation.defaultVariables || {}, c = (f) => {
      if (!f.includes(this.formatSeparator)) {
        const b = Hi(t, l, f, this.options.keySeparator, this.options.ignoreJSONStructure);
        return this.alwaysFormat ? this.format(b, void 0, i, {
          ...s,
          ...t,
          interpolationkey: f
        }) : b;
      }
      const g = f.split(this.formatSeparator), p = g.shift().trim(), m = g.join(this.formatSeparator).trim();
      return this.format(Hi(t, l, p, this.options.keySeparator, this.options.ignoreJSONStructure), m, i, {
        ...s,
        ...t,
        interpolationkey: p
      });
    };
    this.resetRegExp(), !this.escapeValue && typeof e == "string" && /\$t\([^)]*\{[^}]*\{\{/.test(e) && this.logger.warn("nesting options string contains interpolated variables with escapeValue: false — if any of those values are attacker-controlled they can inject additional nesting options (e.g. redirect lng/ns). Sanitise untrusted input before passing it to t(), or keep escapeValue: true.");
    const u = s?.missingInterpolationHandler || this.options.missingInterpolationHandler, h = s?.interpolation?.skipOnVariables !== void 0 ? s.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables;
    return [{
      regex: this.regexpUnescape,
      safeValue: (f) => f
    }, {
      regex: this.regexp,
      safeValue: (f) => this.escapeValue ? this.escape(f) : f
    }].forEach((f) => {
      for (a = 0; r = f.regex.exec(e); ) {
        const g = r[1].trim();
        if (o = c(g), o === void 0)
          if (typeof u == "function") {
            const m = u(e, r, s);
            o = x(m) ? m : "";
          } else if (s && Object.prototype.hasOwnProperty.call(s, g))
            o = "";
          else if (h) {
            o = r[0];
            continue;
          } else
            this.logger.warn(`missed to pass in variable ${g} for interpolating ${e}`), o = "";
        else !x(o) && !this.useRawValueToEscape && (o = $i(o));
        const p = f.safeValue(o);
        if (e = e.replace(r[0], xc(p)), h ? (f.regex.lastIndex += p.length, f.regex.lastIndex -= r[0].length) : f.regex.lastIndex = 0, a++, a >= this.maxReplaces)
          break;
      }
    }), e;
  }
  nest(e, t, i = {}) {
    let s, r, o;
    const a = (l, c) => {
      const u = this.nestingOptionsSeparator;
      if (!l.includes(u)) return l;
      const h = l.split(new RegExp(`${K(u)}[ ]*{`));
      let d = `{${h[1]}`;
      l = h[0], d = this.interpolate(d, o);
      const f = d.match(/'/g), g = d.match(/"/g);
      ((f?.length ?? 0) % 2 === 0 && !g || (g?.length ?? 0) % 2 !== 0) && (d = d.replace(/'/g, '"'));
      try {
        o = JSON.parse(d), c && (o = {
          ...c,
          ...o
        });
      } catch (p) {
        return this.logger.warn(`failed parsing options string in nesting for key ${l}`, p), `${l}${u}${d}`;
      }
      return o.defaultValue && o.defaultValue.includes(this.prefix) && delete o.defaultValue, l;
    };
    for (; s = this.nestingRegexp.exec(e); ) {
      let l = [];
      o = {
        ...i
      }, o = o.replace && !x(o.replace) ? o.replace : o, o.applyPostProcessor = !1, delete o.defaultValue;
      const c = /{.*}/s.test(s[1]) ? s[1].lastIndexOf("}") + 1 : s[1].indexOf(this.formatSeparator);
      if (c !== -1 && (l = s[1].slice(c).split(this.formatSeparator).map((u) => u.trim()).filter(Boolean), s[1] = s[1].slice(0, c)), r = t(a.call(this, s[1].trim(), o), o), r && s[0] === e && !x(r)) return r;
      x(r) || (r = $i(r)), r || (this.logger.warn(`missed to resolve ${s[1]} for nesting ${e}`), r = ""), l.length && (r = l.reduce((u, h) => this.format(u, h, i.lng, {
        ...i,
        interpolationkey: s[1].trim()
      }), r.trim())), e = e.replace(s[0], r), this.regexp.lastIndex = 0;
    }
    return e;
  }
}
const Ec = (n) => {
  let e = n.toLowerCase().trim();
  const t = {};
  if (n.includes("(")) {
    const i = n.split("(");
    e = i[0].toLowerCase().trim();
    const s = i[1].slice(0, -1);
    e === "currency" && !s.includes(":") ? t.currency || (t.currency = s.trim()) : e === "relativetime" && !s.includes(":") ? t.range || (t.range = s.trim()) : s.split(";").forEach((o) => {
      if (o) {
        const [a, ...l] = o.split(":"), c = l.join(":").trim().replace(/^'+|'+$/g, ""), u = a.trim();
        t[u] || (t[u] = c), c === "false" && (t[u] = !1), c === "true" && (t[u] = !0), isNaN(c) || (t[u] = parseInt(c, 10));
      }
    });
  }
  return {
    formatName: e,
    formatOptions: t
  };
}, Ki = (n) => {
  const e = {};
  return (t, i, s) => {
    let r = s;
    s && s.interpolationkey && s.formatParams && s.formatParams[s.interpolationkey] && s[s.interpolationkey] && (r = {
      ...r,
      [s.interpolationkey]: void 0
    });
    const o = i + JSON.stringify(r);
    let a = e[o];
    return a || (a = n(Ke(i), s), e[o] = a), a(t);
  };
}, Cc = (n) => (e, t, i) => n(Ke(t), i)(e);
class kc {
  constructor(e = {}) {
    this.logger = W.create("formatter"), this.options = e, this.init(e);
  }
  init(e, t = {
    interpolation: {}
  }) {
    this.formatSeparator = t.interpolation.formatSeparator || ",";
    const i = t.cacheInBuiltFormats ? Ki : Cc;
    this.formats = {
      number: i((s, r) => {
        const o = new Intl.NumberFormat(s, {
          ...r
        });
        return (a) => o.format(a);
      }),
      currency: i((s, r) => {
        const o = new Intl.NumberFormat(s, {
          ...r,
          style: "currency"
        });
        return (a) => o.format(a);
      }),
      datetime: i((s, r) => {
        const o = new Intl.DateTimeFormat(s, {
          ...r
        });
        return (a) => o.format(a);
      }),
      relativetime: i((s, r) => {
        const o = new Intl.RelativeTimeFormat(s, {
          ...r
        });
        return (a) => o.format(a, r.range || "day");
      }),
      list: i((s, r) => {
        const o = new Intl.ListFormat(s, {
          ...r
        });
        return (a) => o.format(a);
      })
    };
  }
  add(e, t) {
    this.formats[e.toLowerCase().trim()] = t;
  }
  addCached(e, t) {
    this.formats[e.toLowerCase().trim()] = Ki(t);
  }
  format(e, t, i, s = {}) {
    if (!t || e == null) return e;
    const r = t.split(this.formatSeparator), o = [];
    for (let l = 0; l < r.length; l++) {
      let c = r[l];
      for (; c.indexOf("(") > -1 && !c.includes(")") && l + 1 < r.length; )
        c = `${c}${this.formatSeparator}${r[++l]}`;
      o.push(c);
    }
    return o.reduce((l, c) => {
      const {
        formatName: u,
        formatOptions: h
      } = Ec(c);
      if (this.formats[u]) {
        let d = l;
        try {
          const f = s?.formatParams?.[s.interpolationkey] || {}, g = f.locale || f.lng || s.locale || s.lng || i;
          d = this.formats[u](l, g, {
            ...h,
            ...s,
            ...f
          });
        } catch (f) {
          this.logger.warn(f);
        }
        return d;
      } else
        this.logger.warn(`there was no format function for ${u}`);
      return l;
    }, e);
  }
}
const Rc = (n, e) => {
  n.pending[e] !== void 0 && (delete n.pending[e], n.pendingCount--);
};
class Ac extends Mt {
  constructor(e, t, i, s = {}) {
    super(), this.backend = e, this.store = t, this.services = i, this.languageUtils = i.languageUtils, this.options = s, this.logger = W.create("backendConnector"), this.waitingReads = [], this.maxParallelReads = s.maxParallelReads || 10, this.readingCalls = 0, this.maxRetries = s.maxRetries >= 0 ? s.maxRetries : 5, this.retryTimeout = s.retryTimeout >= 1 ? s.retryTimeout : 350, this.state = {}, this.queue = [], this.backend?.init?.(i, s.backend, s);
  }
  queueLoad(e, t, i, s) {
    const r = {}, o = {}, a = {}, l = {};
    return e.forEach((c) => {
      let u = !0;
      t.forEach((h) => {
        const d = `${c}|${h}`;
        !i.reload && this.store.hasResourceBundle(c, h) ? this.state[d] = 2 : this.state[d] < 0 || (this.state[d] === 1 ? o[d] === void 0 && (o[d] = !0) : (this.state[d] = 1, u = !1, o[d] === void 0 && (o[d] = !0), r[d] === void 0 && (r[d] = !0), l[h] === void 0 && (l[h] = !0)));
      }), u || (a[c] = !0);
    }), (Object.keys(r).length || Object.keys(o).length) && this.queue.push({
      pending: o,
      pendingCount: Object.keys(o).length,
      loaded: {},
      errors: [],
      callback: s
    }), {
      toLoad: Object.keys(r),
      pending: Object.keys(o),
      toLoadLanguages: Object.keys(a),
      toLoadNamespaces: Object.keys(l)
    };
  }
  loaded(e, t, i) {
    const s = e.split("|"), r = s[0], o = s[1];
    t && this.emit("failedLoading", r, o, t), !t && i && this.store.addResourceBundle(r, o, i, void 0, void 0, {
      skipCopy: !0
    }), this.state[e] = t ? -1 : 2, t && i && (this.state[e] = 0);
    const a = {};
    this.queue.forEach((l) => {
      hc(l.loaded, [r], o), Rc(l, e), t && l.errors.push(t), l.pendingCount === 0 && !l.done && (Object.keys(l.loaded).forEach((c) => {
        a[c] || (a[c] = {});
        const u = l.loaded[c];
        u.length && u.forEach((h) => {
          a[c][h] === void 0 && (a[c][h] = !0);
        });
      }), l.done = !0, l.errors.length ? l.callback(l.errors) : l.callback());
    }), this.emit("loaded", a), this.queue = this.queue.filter((l) => !l.done);
  }
  read(e, t, i, s = 0, r = this.retryTimeout, o) {
    if (!e.length) return o(null, {});
    if (this.readingCalls >= this.maxParallelReads) {
      this.waitingReads.push({
        lng: e,
        ns: t,
        fcName: i,
        tried: s,
        wait: r,
        callback: o
      });
      return;
    }
    this.readingCalls++;
    const a = (c, u) => {
      if (this.readingCalls--, this.waitingReads.length > 0) {
        const h = this.waitingReads.shift();
        this.read(h.lng, h.ns, h.fcName, h.tried, h.wait, h.callback);
      }
      if (c && u && s < this.maxRetries) {
        setTimeout(() => {
          this.read(e, t, i, s + 1, r * 2, o);
        }, r);
        return;
      }
      o(c, u);
    }, l = this.backend[i].bind(this.backend);
    if (l.length === 2) {
      try {
        const c = l(e, t);
        c && typeof c.then == "function" ? c.then((u) => a(null, u)).catch(a) : a(null, c);
      } catch (c) {
        a(c);
      }
      return;
    }
    return l(e, t, a);
  }
  prepareLoading(e, t, i = {}, s) {
    if (!this.backend)
      return this.logger.warn("No backend was added via i18next.use. Will not load resources."), s && s();
    x(e) && (e = this.languageUtils.toResolveHierarchy(e)), x(t) && (t = [t]);
    const r = this.queueLoad(e, t, i, s);
    if (!r.toLoad.length)
      return r.pending.length || s(), null;
    r.toLoad.forEach((o) => {
      this.loadOne(o);
    });
  }
  load(e, t, i) {
    this.prepareLoading(e, t, {}, i);
  }
  reload(e, t, i) {
    this.prepareLoading(e, t, {
      reload: !0
    }, i);
  }
  loadOne(e, t = "") {
    const i = e.split("|"), s = i[0], r = i[1];
    this.read(s, r, "read", void 0, void 0, (o, a) => {
      o && this.logger.warn(`${t}loading namespace ${r} for language ${s} failed`, o), !o && a && this.logger.log(`${t}loaded namespace ${r} for language ${s}`, a), this.loaded(e, o, a);
    });
  }
  saveMissing(e, t, i, s, r, o = {}, a = () => {
  }) {
    if (this.services?.utils?.hasLoadedNamespace && !this.services?.utils?.hasLoadedNamespace(t)) {
      this.logger.warn(`did not save key "${i}" as the namespace "${t}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");
      return;
    }
    if (!(i == null || i === "")) {
      if (this.backend?.create) {
        const l = {
          ...o,
          isUpdate: r
        }, c = this.backend.create.bind(this.backend);
        if (c.length < 6)
          try {
            let u;
            c.length === 5 ? u = c(e, t, i, s, l) : u = c(e, t, i, s), u && typeof u.then == "function" ? u.then((h) => a(null, h)).catch(a) : a(null, u);
          } catch (u) {
            a(u);
          }
        else
          c(e, t, i, s, a, l);
      }
      !e || !e[0] || this.store.addResource(e[0], t, i, s);
    }
  }
}
const Qt = () => ({
  debug: !1,
  initAsync: !0,
  ns: ["translation"],
  defaultNS: ["translation"],
  fallbackLng: ["dev"],
  fallbackNS: !1,
  supportedLngs: !1,
  nonExplicitSupportedLngs: !1,
  load: "all",
  preload: !1,
  keySeparator: ".",
  nsSeparator: ":",
  pluralSeparator: "_",
  contextSeparator: "_",
  enableSelector: !1,
  partialBundledLanguages: !1,
  saveMissing: !1,
  updateMissing: !1,
  saveMissingTo: "fallback",
  saveMissingPlurals: !0,
  missingKeyHandler: !1,
  missingInterpolationHandler: !1,
  postProcess: !1,
  postProcessPassResolved: !1,
  returnNull: !1,
  returnEmptyString: !0,
  returnObjects: !1,
  joinArrays: !1,
  returnedObjectHandler: !1,
  parseMissingKeyHandler: !1,
  appendNamespaceToMissingKey: !1,
  appendNamespaceToCIMode: !1,
  overloadTranslationOptionHandler: (n) => {
    let e = {};
    if (typeof n[1] == "object" && (e = n[1]), x(n[1]) && (e.defaultValue = n[1]), x(n[2]) && (e.tDescription = n[2]), typeof n[2] == "object" || typeof n[3] == "object") {
      const t = n[3] || n[2];
      Object.keys(t).forEach((i) => {
        e[i] = t[i];
      });
    }
    return e;
  },
  interpolation: {
    escapeValue: !0,
    prefix: "{{",
    suffix: "}}",
    formatSeparator: ",",
    unescapePrefix: "-",
    nestingPrefix: "$t(",
    nestingSuffix: ")",
    nestingOptionsSeparator: ",",
    maxReplaces: 1e3,
    skipOnVariables: !0
  },
  cacheInBuiltFormats: !0
}), qi = (n) => (x(n.ns) && (n.ns = [n.ns]), x(n.fallbackLng) && (n.fallbackLng = [n.fallbackLng]), x(n.fallbackNS) && (n.fallbackNS = [n.fallbackNS]), n.supportedLngs && !n.supportedLngs.includes("cimode") && (n.supportedLngs = n.supportedLngs.concat(["cimode"])), n), lt = () => {
}, Oc = (n) => {
  Object.getOwnPropertyNames(Object.getPrototypeOf(n)).forEach((t) => {
    typeof n[t] == "function" && (n[t] = n[t].bind(n));
  });
};
class Ue extends Mt {
  constructor(e = {}, t) {
    if (super(), this.options = qi(e), this.services = {}, this.logger = W, this.modules = {
      external: []
    }, Oc(this), t && !this.isInitialized && !e.isClone) {
      if (!this.options.initAsync)
        return this.init(e, t), this;
      setTimeout(() => {
        this.init(e, t);
      }, 0);
    }
  }
  init(e = {}, t) {
    this.isInitializing = !0, typeof e == "function" && (t = e, e = {}), e.defaultNS == null && e.ns && (x(e.ns) ? e.defaultNS = e.ns : e.ns.includes("translation") || (e.defaultNS = e.ns[0]));
    const i = Qt();
    this.options = {
      ...i,
      ...this.options,
      ...qi(e)
    }, this.options.interpolation = {
      ...i.interpolation,
      ...this.options.interpolation
    }, e.keySeparator !== void 0 && (this.options.userDefinedKeySeparator = e.keySeparator), e.nsSeparator !== void 0 && (this.options.userDefinedNsSeparator = e.nsSeparator), typeof this.options.overloadTranslationOptionHandler != "function" && (this.options.overloadTranslationOptionHandler = i.overloadTranslationOptionHandler);
    const s = (c) => c ? typeof c == "function" ? new c() : c : null;
    if (!this.options.isClone) {
      this.modules.logger ? W.init(s(this.modules.logger), this.options) : W.init(null, this.options);
      let c;
      this.modules.formatter ? c = this.modules.formatter : c = kc;
      const u = new zi(this.options);
      this.store = new Ui(this.options.resources, this.options);
      const h = this.services;
      h.logger = W, h.resourceStore = this.store, h.languageUtils = u, h.pluralResolver = new wc(u, {
        prepend: this.options.pluralSeparator
      }), c && (h.formatter = s(c), h.formatter.init && h.formatter.init(h, this.options), this.options.interpolation.format = h.formatter.format.bind(h.formatter)), h.interpolator = new Wi(this.options), h.utils = {
        hasLoadedNamespace: this.hasLoadedNamespace.bind(this)
      }, h.backendConnector = new Ac(s(this.modules.backend), h.resourceStore, h, this.options), h.backendConnector.on("*", (d, ...f) => {
        this.emit(d, ...f);
      }), this.modules.languageDetector && (h.languageDetector = s(this.modules.languageDetector), h.languageDetector.init && h.languageDetector.init(h, this.options.detection, this.options)), this.modules.i18nFormat && (h.i18nFormat = s(this.modules.i18nFormat), h.i18nFormat.init && h.i18nFormat.init(this)), this.translator = new Ct(this.services, this.options), this.translator.on("*", (d, ...f) => {
        this.emit(d, ...f);
      }), this.modules.external.forEach((d) => {
        d.init && d.init(this);
      });
    }
    if (this.format = this.options.interpolation.format, t || (t = lt), this.options.fallbackLng && !this.services.languageDetector && !this.options.lng) {
      const c = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
      c.length > 0 && c[0] !== "dev" && (this.options.lng = c[0]);
    }
    !this.services.languageDetector && !this.options.lng && this.logger.warn("init: no languageDetector is used and no lng is defined"), ["getResource", "hasResourceBundle", "getResourceBundle", "getDataByLanguage"].forEach((c) => {
      this[c] = (...u) => this.store[c](...u);
    }), ["addResource", "addResources", "addResourceBundle", "removeResourceBundle"].forEach((c) => {
      this[c] = (...u) => (this.store[c](...u), this);
    });
    const a = Ie(), l = () => {
      const c = (u, h) => {
        this.isInitializing = !1, this.isInitialized && !this.initializedStoreOnce && this.logger.warn("init: i18next is already initialized. You should call init just once!"), this.isInitialized = !0, this.options.isClone || this.logger.log("initialized", this.options), this.emit("initialized", this.options), a.resolve(h), t(u, h);
      };
      if ((this.languages || this.isLanguageChangingTo) && !this.isInitialized) return c(null, this.t.bind(this));
      this.changeLanguage(this.options.lng, c);
    };
    return this.options.resources || !this.options.initAsync ? l() : setTimeout(l, 0), a;
  }
  loadResources(e, t = lt) {
    let i = t;
    const s = x(e) ? e : this.language;
    if (typeof e == "function" && (i = e), !this.options.resources || this.options.partialBundledLanguages) {
      if (s?.toLowerCase() === "cimode" && (!this.options.preload || this.options.preload.length === 0)) return i();
      const r = [], o = (a) => {
        if (!a || a === "cimode") return;
        this.services.languageUtils.toResolveHierarchy(a).forEach((c) => {
          c !== "cimode" && (r.includes(c) || r.push(c));
        });
      };
      s ? o(s) : this.services.languageUtils.getFallbackCodes(this.options.fallbackLng).forEach((l) => o(l)), this.options.preload?.forEach?.((a) => o(a)), this.services.backendConnector.load(r, this.options.ns, (a) => {
        !a && !this.resolvedLanguage && this.language && this.setResolvedLanguage(this.language), i(a);
      });
    } else
      i(null);
  }
  reloadResources(e, t, i) {
    const s = Ie();
    return typeof e == "function" && (i = e, e = void 0), typeof t == "function" && (i = t, t = void 0), e || (e = this.languages), t || (t = this.options.ns), i || (i = lt), this.services.backendConnector.reload(e, t, (r) => {
      s.resolve(), i(r);
    }), s;
  }
  use(e) {
    if (!e) throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");
    if (!e.type) throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");
    return e.type === "backend" && (this.modules.backend = e), (e.type === "logger" || e.log && e.warn && e.error) && (this.modules.logger = e), e.type === "languageDetector" && (this.modules.languageDetector = e), e.type === "i18nFormat" && (this.modules.i18nFormat = e), e.type === "postProcessor" && xr.addPostProcessor(e), e.type === "formatter" && (this.modules.formatter = e), e.type === "3rdParty" && this.modules.external.push(e), this;
  }
  setResolvedLanguage(e) {
    if (!(!e || !this.languages) && !["cimode", "dev"].includes(e)) {
      for (let t = 0; t < this.languages.length; t++) {
        const i = this.languages[t];
        if (!["cimode", "dev"].includes(i) && this.store.hasLanguageSomeTranslations(i)) {
          this.resolvedLanguage = i;
          break;
        }
      }
      !this.resolvedLanguage && !this.languages.includes(e) && this.store.hasLanguageSomeTranslations(e) && (this.resolvedLanguage = e, this.languages.unshift(e));
    }
  }
  changeLanguage(e, t) {
    this.isLanguageChangingTo = e;
    const i = Ie();
    this.emit("languageChanging", e);
    const s = (a) => {
      this.language = a, this.languages = this.services.languageUtils.toResolveHierarchy(a), this.resolvedLanguage = void 0, this.setResolvedLanguage(a);
    }, r = (a, l) => {
      l ? this.isLanguageChangingTo === e && (s(l), this.translator.changeLanguage(l), this.isLanguageChangingTo = void 0, this.emit("languageChanged", l), this.logger.log("languageChanged", l)) : this.isLanguageChangingTo = void 0, i.resolve((...c) => this.t(...c)), t && t(a, (...c) => this.t(...c));
    }, o = (a) => {
      !e && !a && this.services.languageDetector && (a = []);
      const l = x(a) ? a : a && a[0], c = this.store.hasLanguageSomeTranslations(l) ? l : this.services.languageUtils.getBestMatchFromCodes(x(a) ? [a] : a);
      c && (this.language || s(c), this.translator.language || this.translator.changeLanguage(c), this.services.languageDetector?.cacheUserLanguage?.(c)), this.loadResources(c, (u) => {
        r(u, c);
      });
    };
    return !e && this.services.languageDetector && !this.services.languageDetector.async ? o(this.services.languageDetector.detect()) : !e && this.services.languageDetector && this.services.languageDetector.async ? this.services.languageDetector.detect.length === 0 ? this.services.languageDetector.detect().then(o) : this.services.languageDetector.detect(o) : o(e), i;
  }
  getFixedT(e, t, i, s) {
    const r = s?.scopeNs, o = (a, l, ...c) => {
      let u;
      typeof l != "object" ? u = this.options.overloadTranslationOptionHandler([a, l].concat(c)) : u = {
        ...l
      }, u.lng = u.lng || o.lng, u.lngs = u.lngs || o.lngs;
      const h = u.ns !== void 0 && u.ns !== null;
      u.ns = u.ns || o.ns, u.keyPrefix !== "" && (u.keyPrefix = u.keyPrefix || i || o.keyPrefix);
      const d = {
        ...this.options,
        ...u
      };
      Array.isArray(r) && !h && (d.ns = r), typeof u.keyPrefix == "function" && (u.keyPrefix = be(u.keyPrefix, d));
      const f = this.options.keySeparator || ".";
      let g;
      return u.keyPrefix && Array.isArray(a) ? g = a.map((p) => (typeof p == "function" && (p = be(p, d)), `${u.keyPrefix}${f}${p}`)) : (typeof a == "function" && (a = be(a, d)), g = u.keyPrefix ? `${u.keyPrefix}${f}${a}` : a), this.t(g, u);
    };
    return x(e) ? o.lng = e : o.lngs = e, o.ns = t, o.keyPrefix = i, o;
  }
  t(...e) {
    return this.translator?.translate(...e);
  }
  exists(...e) {
    return this.translator?.exists(...e);
  }
  setDefaultNamespace(e) {
    this.options.defaultNS = e;
  }
  hasLoadedNamespace(e, t = {}) {
    if (!this.isInitialized)
      return this.logger.warn("hasLoadedNamespace: i18next was not initialized", this.languages), !1;
    if (!this.languages || !this.languages.length)
      return this.logger.warn("hasLoadedNamespace: i18n.languages were undefined or empty", this.languages), !1;
    const i = t.lng || this.resolvedLanguage || this.languages[0], s = this.options ? this.options.fallbackLng : !1, r = this.languages[this.languages.length - 1];
    if (i.toLowerCase() === "cimode") return !0;
    const o = (a, l) => {
      const c = this.services.backendConnector.state[`${a}|${l}`];
      return c === -1 || c === 0 || c === 2;
    };
    if (t.precheck) {
      const a = t.precheck(this, o);
      if (a !== void 0) return a;
    }
    return !!(this.hasResourceBundle(i, e) || !this.services.backendConnector.backend || this.options.resources && !this.options.partialBundledLanguages || o(i, e) && (!s || o(r, e)));
  }
  loadNamespaces(e, t) {
    const i = Ie();
    return this.options.ns ? (x(e) && (e = [e]), e.forEach((s) => {
      this.options.ns.includes(s) || this.options.ns.push(s);
    }), this.loadResources((s) => {
      i.resolve(), t && t(s);
    }), i) : (t && t(), Promise.resolve());
  }
  loadLanguages(e, t) {
    const i = Ie();
    x(e) && (e = [e]);
    const s = this.options.preload || [], r = e.filter((o) => !s.includes(o) && this.services.languageUtils.isSupportedCode(o));
    return r.length ? (this.options.preload = s.concat(r), this.loadResources((o) => {
      i.resolve(), t && t(o);
    }), i) : (t && t(), Promise.resolve());
  }
  dir(e) {
    if (e || (e = this.resolvedLanguage || (this.languages?.length > 0 ? this.languages[0] : this.language)), !e) return "rtl";
    try {
      const s = new Intl.Locale(e);
      if (s && s.getTextInfo) {
        const r = s.getTextInfo();
        if (r && r.direction) return r.direction;
      }
    } catch {
    }
    const t = ["ar", "shu", "sqr", "ssh", "xaa", "yhd", "yud", "aao", "abh", "abv", "acm", "acq", "acw", "acx", "acy", "adf", "ads", "aeb", "aec", "afb", "ajp", "apc", "apd", "arb", "arq", "ars", "ary", "arz", "auz", "avl", "ayh", "ayl", "ayn", "ayp", "bbz", "pga", "he", "iw", "ps", "pbt", "pbu", "pst", "prp", "prd", "ug", "ur", "ydd", "yds", "yih", "ji", "yi", "hbo", "men", "xmn", "fa", "jpr", "peo", "pes", "prs", "dv", "sam", "ckb"], i = this.services?.languageUtils || new zi(Qt());
    return e.toLowerCase().indexOf("-latn") > 1 ? "ltr" : t.includes(i.getLanguagePartFromCode(e)) || e.toLowerCase().indexOf("-arab") > 1 ? "rtl" : "ltr";
  }
  static createInstance(e = {}, t) {
    const i = new Ue(e, t);
    return i.createInstance = Ue.createInstance, i;
  }
  cloneInstance(e = {}, t = lt) {
    const i = e.forkResourceStore;
    i && delete e.forkResourceStore;
    const s = {
      ...this.options,
      ...e,
      isClone: !0
    }, r = new Ue(s);
    if ((e.debug !== void 0 || e.prefix !== void 0) && (r.logger = r.logger.clone(e)), ["store", "services", "language"].forEach((a) => {
      r[a] = this[a];
    }), r.services = {
      ...this.services
    }, r.services.utils = {
      hasLoadedNamespace: r.hasLoadedNamespace.bind(r)
    }, i) {
      const a = Object.keys(this.store.data).reduce((l, c) => (l[c] = {
        ...this.store.data[c]
      }, l[c] = Object.keys(l[c]).reduce((u, h) => (u[h] = {
        ...l[c][h]
      }, u), l[c]), l), {});
      r.store = new Ui(a, s), r.services.resourceStore = r.store;
    }
    if (e.interpolation) {
      const l = {
        ...Qt().interpolation,
        ...this.options.interpolation,
        ...e.interpolation
      }, c = {
        ...s,
        interpolation: l
      };
      r.services.interpolator = new Wi(c);
    }
    return r.translator = new Ct(r.services, s), r.translator.on("*", (a, ...l) => {
      r.emit(a, ...l);
    }), r.init(s, t), r.translator.options = s, r.translator.backendConnector.services.utils = {
      hasLoadedNamespace: r.hasLoadedNamespace.bind(r)
    }, r;
  }
  toJSON() {
    return {
      options: this.options,
      store: this.store,
      language: this.language,
      languages: this.languages,
      resolvedLanguage: this.resolvedLanguage
    };
  }
}
const P = Ue.createInstance();
P.createInstance;
P.dir;
P.init;
P.loadResources;
P.reloadResources;
P.use;
P.changeLanguage;
P.getFixedT;
P.t;
P.exists;
P.setDefaultNamespace;
P.hasLoadedNamespace;
P.loadNamespaces;
P.loadLanguages;
function H(n) {
  return { pattern: new RegExp(`(\\d+)\\s?u${n}\\b`, "g"), replace: (e, t) => `${t}µ${n}` };
}
const Nc = {
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
}, Tc = {
  ...Nc,
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
}, Dc = { contextualizations: { abstract: { block: { start: "Start of the abstract.", end: "End of the abstract." } }, acknowledgments: { block: { start: "Start of the acknowledgments.", end: "End of the acknowledgments." } }, afterword: { block: { start: "Start of the afterword.", end: "End of the afterword." } }, appendix: { block: { start: "Start of the appendix.", end: "End of the appendix." } }, aside: { block: { start: "Start of the aside.", end: "End of the aside." } }, audio: { inline: { labelled: "Audio with a label: {{ description }}", unlabelled: "Audio with no label." } }, bibliography: { block: { start: "Start of the bibliography.", end: "End of the bibliography." } }, blockquote: { inline: "Blockquote." }, cell: { inline: { withHeader: "{{ header }}: {{ value }}", withoutHeader: "{{ value }}" } }, chapter: { block: { start: "Start of the chapter.", end: "End of the chapter." } }, colophon: { inline: "Colophon." }, complementary: { block: { start: "Start of the complementary content.", end: "End of the complementary content." } }, conclusion: { block: { start: "Start of the conclusion.", end: "End of the conclusion." } }, cover: { inline: { labelled: "Cover with a label: {{ description }}", unlabelled: "Cover with no label." } }, credit: { inline: "Credit." }, credits: { block: { start: "Start of the credits.", end: "End of the credits." } }, dedication: { inline: "Dedication." }, definition: { inline: "Definition." }, details: { block: { start: "Start of the disclosure.", end: "End of the disclosure." } }, endnotes: { block: { start: "Start of the endnotes.", end: "End of the endnotes." } }, epigraph: { inline: "Epigraph." }, epilogue: { block: { start: "Start of the epilogue.", end: "End of the epilogue." } }, errata: { block: { start: "Start of the errata.", end: "End of the errata." } }, example: { block: { start: "Start of the example.", end: "End of the example." } }, figure: { inline: "Figure: {{ description }}" }, footnote: { block: { start: "Start of the footnote.", end: "End of the footnote." } }, foreword: { block: { start: "Start of the foreword.", end: "End of the foreword." } }, glossary: { block: { start: "Start of the glossary.", end: "End of the glossary." } }, heading1: { inline: "Heading level 1." }, heading2: { inline: "Heading level 2." }, heading3: { inline: "Heading level 3." }, heading4: { inline: "Heading level 4." }, heading5: { inline: "Heading level 5." }, heading6: { inline: "Heading level 6." }, image: { inline: { labelled: "Image with a label: {{ description }}", unlabelled: "Image with no label." } }, index: { block: { start: "Start of the index.", end: "End of the index." } }, introduction: { block: { start: "Start of the introduction.", end: "End of the introduction." } }, list: { block: { start: "Start of the list.", end: "End of the list." } }, listItem: { inline: "List item." }, math: { inline: { labelled: "{{ description }}", unlabelled: "Math formula with no label." } }, notice: { inline: "Notice." }, pagebreak: { inline: "Pagebreak." }, pagelist: { block: { start: "Start of the page list.", end: "End of the page list." } }, part: { inline: "Part." }, preface: { block: { start: "Start of the preface.", end: "End of the preface." } }, prologue: { block: { start: "Start of the prologue.", end: "End of the prologue." } }, pullquote: { inline: "Pullquote." }, qna: { block: { start: "Start of the questions and answers.", end: "End of the questions and answers." } }, row: { inline: "Row: {{ count }}" }, rowheader: { inline: { withHeader: "{{ header }}: {{ value }}", withoutHeader: "{{ value }}" } }, separator: { inline: "Separator." }, subtitle: { inline: "Subtitle." }, summary: { inline: "Summary." }, table: { block: { end: "End of the table.", start: { labelled: "Table: {{ description }}. {{ lines }}. {{ columns }}.", unlabelled: "Table. {{ lines }}. {{ columns }}." } }, inline: { labelled: "Table: {{ description }}. {{ lines }}. {{ columns }}.", unlabelled: "Table. {{ lines }}. {{ columns }}." }, parts: { columns_one: "1 column", columns_other: "{{ count }} columns", lines_one: "1 line", lines_other: "{{ count }} lines" } }, term: { inline: "Term." }, tip: { inline: "Tip." }, video: { inline: { labelled: "Video with a label: {{ description }}", unlabelled: "Video with no label." } } } }, Fc = {
  speech: Dc
}, Cr = Fc.speech.contextualizations, Gi = { en: Cr }, Ic = {};
async function Pc(n) {
  const e = Gi[n];
  if (e) return e;
  const t = Ic[n];
  if (!t) return Cr;
  const i = (await t()).speech.contextualizations;
  return Gi[n] = i, i;
}
const Xi = {
  de: ["A.", "A.M.", "Abs.", "Abt.", "Abw.", "Adj.", "Adr.", "Akt.", "Allg.", "Alt.", "App.", "Apr.", "Art.", "Aug.", "Ausg.", "Ausschl.", "B.", "Bed.", "Ben.", "Ber.", "Best.", "Bibl.", "C.", "Ca.", "Chin.", "Chr.", "Co.", "D.", "D. h.", "Dat.", "Dez.", "Di.", "Dim.", "Dipl.-Ing.", "Dipl.-Kfm.", "Dir.", "Do.", "Dr.", "Dtzd.", "Einh.", "Erf.", "Evtl.", "F.", "F.f.", "Fa.", "Fam.", "Feb.", "Fn.", "Folg.", "Forts. f.", "Fr.", "Frl.", "G.", "Gebr.", "Gem.", "Geograph.", "Ges.", "Gesch.", "Ggf.", "Hbf.", "Hptst.", "Hr.", "Hrn.", "Hrsg.", "I.", "Inc.", "Ing.", "Inh.", "Int.", "J.", "J.D.", "Jahrh.", "Jan.", "Jr.", "Kap.", "Kfm.", "Kl.", "Konv.", "Kop.", "L.", "Ltd.", "M.", "Max.", "Mi.", "Min.", "Mind.", "Mio.", "Mo.", "Mod.", "Mrd.", "Msp.", "N.", "Nov.", "Nr.", "O.", "Obj.", "Okt.", "Op.", "P.", "P.M.", "PIN.", "Pfd.", "Phys.", "Port.", "Prot.", "Proz.", "Qu.", "R.", "Rd.", "Reg.", "Reg.-Bez.", "Rel.", "Rep.", "S.A.", "Sa.", "Schr.", "Sek.", "Sep.", "Sept.", "So.", "Spezif.", "St.", "StR.", "Std.", "Str.", "T.", "Tel.", "Temp.", "Test.", "Trans.", "Tägl.", "U.", "U. U.", "U.S.", "U.S.A.", "U.U.", "Urspr.", "Ursprüngl.", "Verf.", "Vgl.", "W.", "Wg.", "Y.", "Z.", "Z. B.", "Z. Zt.", "Ztr.", "a.D.", "a.M.", "a.Rh.", "a.a.O.", "a.a.S.", "am.", "amtl.", "b.", "beil.", "d.J.", "d.Ä.", "e.V.", "e.Wz.", "e.h.", "ehem.", "eigtl.", "einschl.", "entspr.", "erw.", "ev.", "evtl.", "exkl.", "frz.", "geb.", "gedr.", "gek.", "gesch.", "gest.", "ggf.", "ggfs.", "hpts.", "i.A.", "i.B.", "i.H.", "i.J.", "i.R.", "i.V.", "inkl.", "jew.", "jhrl.", "k. u. k.", "k.u.k.", "kath.", "kfm.", "kgl.", "led.", "m.E.", "m.W.", "mtl.", "möbl.", "n. Chr.", "n.u.Z.", "näml.", "o.A.", "o.B.", "o.g.", "od.", "p.Adr.", "r.", "röm.", "röm.-kath.", "s.", "s.a.", "schles.", "schweiz.", "schwäb.", "sog.", "südd.", "tägl.", "u.", "u. Z.", "u.A.w.g.", "u.U.", "u.a.", "u.v.a.", "u.Ä.", "u.ä.", "v. Chr.", "v. H.", "v. u. Z.", "v.Chr.", "v.H.", "v.R.w.", "v.T.", "v.u.Z.", "verh.", "verw.", "vgl.", "z.", "z.B.", "z.Hd.", "z.Z.", "zzgl.", "österr."],
  en: ["A.D.", "A.I.", "A.M.", "A.S.", "AA.", "AB.", "Abs.", "Adj.", "Adv.", "Alt.", "Approx.", "Aug.", "B.V.", "C.F.", "C.O.D.", "Capt.", "Col.", "Comm.", "Conn.", "Cont.", "D.A.", "D.C.", "DC.", "DR.", "Dec.", "Def.", "Dept.", "Diff.", "Dr.", "E.G.", "E.g.", "Ed.", "Est.", "Etc.", "Ex.", "Exec.", "Feb.", "Fn.", "Fri.", "Hon.B.A.", "I.", "I.D.", "I.T.", "I.e.", "J.B.", "J.D.", "J.K.", "Jan.", "Jun.", "K.R.", "L.A.", "L.P.", "Lev.", "Lib.", "Lt.", "Lt.Cdr.", "M.", "M.I.T.", "M.R.", "M.T.", "MR.", "Maj.", "Mar.", "Mart.", "Mb.", "Md.", "Mgr.", "Min.", "Misc.", "Mr.", "Mrs.", "Ms.", "Mt.", "N.V.", "N.Y.", "Nov.", "Nr.", "Num.", "Op.", "Org.", "P.M.", "P.O.", "P.V.", "PP.", "Ph.D.", "Phys.", "Prof.", "Pvt.", "R.L.", "R.T.", "Rep.", "Rev.", "S.A.", "S.A.R.", "S.E.", "S.p.A.", "Sep.", "Sept.", "Sgt.", "Sq.", "St.", "U.S.", "U.S.A.", "U.S.C.", "VS.", "Yr.", "a.m.", "d.", "dr.", "exec.", "pp.", "vs."],
  es: ["A.C.", "AA.", "All.", "Ant.", "Av.", "Avda.", "Bien.", "C.", "C.P.", "C.S.", "C.V.", "CA.", "Col.", "Comm.", "Corp.", "Cía.", "D.", "DC.", "Da.", "Desc.", "Desv.", "Dr.", "Dra.", "Drs.", "Dto.", "Dª.", "Dña.", "Em.", "Emm.", "Exc.", "Excma.", "Excmas.", "Excmo.", "Excmos.", "Exma.", "Exmas.", "Exmo.", "Exmos.", "FF.CC.", "Fabric.", "Fr.", "H.P.", "Id.", "Ilma.", "Ilmas.", "Ilmo.", "Ilmos.", "Inc.", "JJ.OO.", "K.", "Kit.", "Korn.", "L.", "Lcda.", "Lcdo.", "Lda.", "Ldo.", "Lic.", "Ltd.", "Ltda.", "Ltdo.", "M.", "MM.", "Mons.", "Mr.", "Mrs.", "O.M.", "PP.", "R.D.", "R.U.", "RAM.", "RR.HH.", "Rdo.", "Rdos.", "Reg.", "Rev.", "Rol.", "Rvdmo.", "Rvdmos.", "Rvdo.", "Rvdos.", "SA.", "SS.AA.", "SS.MM.", "Sdad.", "Seg.", "Sol.", "Sr.", "Sra.", "Sras.", "Sres.", "Srta.", "Srtas.", "Sta.", "Sto.", "Trab.", "U.S.", "U.S.A.", "Var.", "Vda.", "a. C.", "a. e. c.", "abr.", "afma.", "afmas.", "afmo.", "afmos.", "ago.", "bco.", "bol.", "c/c.", "cap.", "cf.", "cfr.", "col.", "d. C.", "depto.", "deptos.", "dic.", "doc.", "dom.", "dpto.", "dptos.", "dtor.", "e. c.", "e.g.", "ed.", "ej.", "ene.", "feb.", "fig.", "figs.", "fund.", "hnos.", "jue.", "jul.", "jun.", "licda.", "licdo.", "lun.", "mar.", "may.", "mié.", "ms.", "mss.", "mtro.", "nov.", "ntra.", "ntro.", "oct.", "p.ej.", "prof.", "prov.", "sept.", "sras.", "sres.", "srs.", "ss.", "sáb.", "trad.", "v.gr.", "vid.", "vie.", "vs."],
  fr: ["All.", "C.", "Comm.", "D.", "DC.", "Desc.", "Inc.", "Jr.", "L.", "M.", "MM.", "Mart.", "Op.", "P.", "P.-D. G.", "P.O.", "Prof.", "S.A.", "S.M.A.R.T.", "U.", "U.S.", "U.S.A.", "Var.", "W.", "acoust.", "adr.", "anc.", "ann.", "anon.", "ap. J.-C.", "append.", "aux.", "av. J.-C.", "avr.", "broch.", "bull.", "cam.", "categ.", "coll.", "collab.", "config.", "dest.", "dict.", "dim.", "dir.", "doc.", "déc.", "encycl.", "exempl.", "fig.", "févr.", "gouv.", "graph.", "hôp.", "ill.", "illustr.", "imm.", "imprim.", "indus.", "janv.", "jeu.", "juil.", "lun.", "mar.", "mer.", "niv.", "nov.", "oct.", "quart.", "réf.", "sam.", "sept.", "symb.", "synth.", "syst.", "trav. publ.", "ven.", "voit.", "éd.", "édit.", "équiv.", "éval."],
  it: ["C.P.", "Cfr.", "D.", "DC.", "Geom.", "Ing.", "L.", "Liv.", "Ltd.", "Mod.", "N.B.", "N.d.A.", "N.d.E.", "N.d.T.", "O.d.G.", "S.A.R.", "S.M.A.R.T.", "S.p.A.", "Sig.", "U.S.", "U.S.A.", "a.C.", "ag.", "all.", "arch.", "avv.", "c.c.p.", "d.C.", "d.p.R.", "div.", "dott.", "dr.", "fig.", "int.", "mitt.", "on.", "p.", "p.i.", "pag.", "rag.", "sez.", "tab.", "tav.", "ver.", "vol."],
  pt: ["A.C.", "Alm.", "Av.", "Dir.", "Dr.", "Dra.", "Dras.", "Drs.", "E.", "Est.", "Exma.", "Exmo.", "Fr.", "Ilma.", "Ilmo.", "Jr.", "Ltd.", "Ltda.", "Mar.", "N.Sra.", "N.T.", "P.M.", "Pe.", "Ph.D.", "R.", "S.", "S.A.", "Sta.", "Sto.", "V.T.", "W.C.", "a.C.", "a.m.", "abr.", "abrev.", "adm.", "aer.", "ago.", "agric.", "anat.", "ap.", "apart.", "apt.", "arit.", "arqueol.", "arquit.", "astron.", "autom.", "aux.", "biogr.", "bras.", "cap.", "caps.", "cat.", "cel.", "cf.", "col.", "com.", "comp.", "compl.", "cont.", "contab.", "créd.", "cx.", "círc.", "cód.", "d.C.", "des.", "desc.", "dez.", "dipl.", "dir.", "div.", "doc.", "déb.", "ed.", "educ.", "elem.", "eletr.", "eletrôn.", "end.", "eng.", "esp.", "ex.", "f.", "fac.", "fasc.", "fem.", "fev.", "ff.", "fig.", "fil.", "filos.", "fisiol.", "fl.", "fot.", "fr.", "fís.", "geom.", "gram.", "gên.", "hist.", "ind.", "ingl.", "jan.", "jul.", "jun.", "jur.", "l.", "lat.", "lin.", "lit.", "liter.", "long.", "mai.", "mar.", "mat.", "matem.", "mov.", "máq.", "méd.", "mús.", "neol.", "nov.", "náut.", "obs.", "odont.", "odontol.", "org.", "organiz.", "out.", "p.", "p. ex.", "p.m.", "pal.", "pol.", "port.", "pp.", "pq.", "prod.", "prof.", "profa.", "pron.", "próx.", "psicol.", "pág.", "quím.", "r.s.v.p.", "ref.", "rel.", "relat.", "rep.", "res.", "rod.", "set.", "sociol.", "sup.", "séc.", "símb.", "tec.", "tecnol.", "tel.", "trad.", "transp.", "univ.", "vol.", "vs.", "álg.", "índ."],
  ru: ["авг.", "апр.", "дек.", "до н. э.", "кв.", "н. э.", "н.э.", "нояб.", "окт.", "отд.", "проф.", "руб.", "сент.", "тел.", "тыс.", "ул.", "февр.", "янв."],
  th: ["ค.ศ."]
};
function Zt(n, e, t) {
  let i = t;
  for (; i > e && /\s/.test(n[i - 1]); ) i--;
  return i;
}
const Lc = /[\s([{"'“‘]/;
function $c(n, e) {
  for (const t of e) {
    if (n.length < t.length || !n.endsWith(t)) continue;
    const i = n.length - t.length - 1;
    if (i < 0 || Lc.test(n[i])) return !0;
  }
  return !1;
}
function Mc(n) {
  let e = 0;
  for (const t of n)
    if (new RegExp("\\p{L}", "u").test(t) && e++, e >= 2) return !0;
  return !1;
}
function _c(n) {
  return /\.{3,}$/.test(n);
}
function Bc(n, e, t, i) {
  if (i === "“") return !0;
  if (i !== '"') return !1;
  let s = 0;
  for (let r = e; r < t; r++) n[r] === '"' && s++;
  return s % 2 === 1;
}
const Uc = new RegExp(`[.!?][”"'’)\\]]*\\s+—\\s+(?=\\p{Lu})`, "gu");
function zc(n, e) {
  const t = [...n.matchAll(Uc)].map((s) => s.index + s[0].length);
  if (t.length === 0) return e;
  const i = [];
  for (const s of e) {
    let r = s.start;
    for (const o of t)
      o > r && o < s.end && (i.push({ start: r, end: o }), r = o);
    i.push({ start: r, end: s.end });
  }
  return i;
}
function Vc(n, e, t) {
  const i = zc(n, e).map((r) => ({ ...r }));
  for (let r = 0; r < i.length - 1; r++) {
    const o = Zt(n, i[r].start, i[r].end);
    if (o !== i[r].end || o <= i[r].start) continue;
    const a = n[o - 1];
    Bc(n, i[r].start, o, a) && (i[r].end -= 1, i[r + 1].start -= 1);
  }
  const s = [];
  for (const r of i) {
    let o = r;
    for (; s.length > 0; ) {
      const a = s[s.length - 1], l = Zt(n, a.start, a.end), c = n.slice(a.start, l);
      if (!$c(c, t) && Mc(c) && !_c(c)) break;
      s.pop(), o = { start: a.start, end: o.end };
    }
    s.push(o);
  }
  return s.map((r) => {
    const o = Zt(n, r.start, r.end);
    return { text: n.slice(r.start, o), start: r.start, end: r.end, contentEnd: o };
  });
}
const Ji = /* @__PURE__ */ new Map();
function jc(n) {
  let e = Ji.get(n);
  return e || (e = new Intl.Segmenter(n, { granularity: "sentence" }), Ji.set(n, e)), e;
}
async function Hc(n, e, t) {
  if (e === "") return [];
  const s = [...jc(n).segment(e)].map((o) => ({ start: o.index, end: o.index + o.segment.length })), r = t ? [...Xi[n] ?? [], ...t] : Xi[n] ?? [];
  return Vc(e, s, r);
}
const Dd = [
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
], Wc = [
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
], Kc = {
  footnote: { drops: ["aside"], unconditional: !0 },
  cover: { drops: ["image"] },
  pullquote: { drops: ["blockquote", "aside"] },
  epigraph: { drops: ["blockquote"] }
}, qc = ["noteref", "pagebreak"], Gc = ["audio", "video", "image", "figure", "math", "table", "cover"], Xc = ["cell", "rowheader"], Jc = ["separator"], Yi = new Set(Wc), Yc = new Set(qc), Qc = new Set(Gc), kr = new Set(Xc), Zc = new Set(Jc);
function eu(n, e) {
  const t = P.createInstance();
  return t.init({
    lng: n,
    resources: { [n]: { translation: e } },
    interpolation: { escapeValue: !1 }
  }), t;
}
function tu(n, e, t) {
  if (!e) return n;
  const i = { ...n };
  for (const s of Object.keys(e))
    i[s] = t(n[s], e[s]);
  return i;
}
function Rr(n, e) {
  if (typeof e == "string" || typeof n != "object") return e;
  const t = { ...n };
  for (const i of Object.keys(e))
    t[i] = Rr(n[i], e[i]);
  return t;
}
function nu(n, e) {
  return tu(n, e, Rr);
}
function Ar(n, e = [], t = /* @__PURE__ */ new Map()) {
  for (const i of n)
    t.set(i, e), i.children && Ar(i.children, [i, ...e], t);
  return t;
}
async function Or(n, e) {
  const t = e.contextualizationLocale ?? "en", i = nu(
    await Pc(t),
    e.contextualization?.contextualizations
  );
  return {
    i18n: eu(t, i),
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
    segmenter: e.segmentation?.segmenter ?? Hc,
    // Per-key override, not an additive union — each key holds one whole rule.
    substitutions: { ...Tc, ...e.substitutions },
    blockStarts: /* @__PURE__ */ new Set(),
    tableRowNumbers: /* @__PURE__ */ new Map(),
    tableCellHeaders: /* @__PURE__ */ new Map(),
    synthetic: /* @__PURE__ */ new Set(),
    ancestorChains: Ar(n),
    pendingRange: /* @__PURE__ */ new Map(),
    edgeSubstitutedLocate: /* @__PURE__ */ new WeakMap()
  };
}
const iu = /<lang xml:lang="[^"]*">([\s\S]*?)<\/lang>/g;
function Nr(n) {
  return n.replace(iu, "$1");
}
const yn = "#css(", bn = ")";
function su(n) {
  return `${yn}${encodeURIComponent(n)}${bn}`;
}
function ru(n) {
  if (!(!n || !n.startsWith(yn) || !n.endsWith(bn)))
    return decodeURIComponent(n.slice(yn.length, -bn.length));
}
const vn = "#domrange(", wn = ")";
function ou(n) {
  return `${vn}${encodeURIComponent(JSON.stringify(n))}${wn}`;
}
function au(n) {
  if (!(!n || !n.startsWith(vn) || !n.endsWith(wn)))
    try {
      const e = JSON.parse(decodeURIComponent(n.slice(vn.length, -wn.length)));
      return !e?.start?.cssSelector || typeof e.start.textNodeIndex != "number" ? void 0 : e;
    } catch {
      return;
    }
}
const xn = ":~:text=";
function ct(n) {
  return encodeURIComponent(n).replace(/-/g, "%2D");
}
function Tr(n) {
  let e = "";
  return n.prefix && (e += `${ct(n.prefix)}-,`), e += ct(n.textStart), n.textEnd && (e += `,${ct(n.textEnd)}`), n.suffix && (e += `,-${ct(n.suffix)}`), `${xn}${e}`;
}
function lu(n) {
  if (!n) return;
  const e = n.indexOf(xn);
  if (e === -1) return;
  const t = n.slice(e + xn.length).split("&")[0];
  if (t)
    try {
      let i = t.split(",");
      const s = { textStart: "" };
      return i[0].endsWith("-") && (s.prefix = decodeURIComponent(i[0].slice(0, -1)), i = i.slice(1)), i.length > 0 && i[i.length - 1].startsWith("-") && (s.suffix = decodeURIComponent(i[i.length - 1].slice(1)), i = i.slice(0, -1)), i.length === 0 || i[0] === "" ? void 0 : (s.textStart = decodeURIComponent(i[0]), i.length > 1 && (s.textEnd = decodeURIComponent(i[1])), s);
    } catch {
      return;
    }
}
function cu(n, e) {
  if (!n.domRange || !e.domRange) return;
  const t = { start: n.domRange.start, end: e.domRange.end ?? e.domRange.start };
  return n.domRange.container !== void 0 && (t.container = n.domRange.container), { domRange: t, cssSelector: t.container ?? t.start.cssSelector };
}
function Qi(n) {
  const e = n?.textref;
  if (!e) return;
  const t = e.indexOf(":~:"), i = t === -1 ? e : e.slice(0, t);
  let s, r;
  const o = au(i);
  if (o)
    r = o, s = o.container ?? o.start.cssSelector;
  else {
    const c = ru(i);
    c !== void 0 ? s = c : n?.id && i === `#${CSS.escape(n.id)}` && (s = i);
  }
  const a = lu(e);
  if (s === void 0 && r === void 0 && a === void 0)
    return;
  const l = {};
  return s !== void 0 && (l.cssSelector = s), r !== void 0 && (l.domRange = r), a?.textEnd !== void 0 ? l.fragment = Tr(a) : a && (l.text = { highlight: a.textStart }, a.prefix !== void 0 && (l.text.before = a.prefix), a.suffix !== void 0 && (l.text.after = a.suffix)), l;
}
function Ce(n, e) {
  const t = n.cssSelector ?? n.domRange?.start.cssSelector;
  return t ? { cssSelector: t, text: { highlight: e } } : { ...n, text: { highlight: e } };
}
function _(n, e) {
  const t = Qi(n);
  if (t) return { own: !0, ref: t };
  for (const i of e.get(n) ?? []) {
    const s = Qi(i);
    if (s) return { own: !1, ref: s };
  }
}
function Mn(n, e) {
  if (n)
    return n.own ? n.ref : Ce(n.ref, e);
}
function _n(n, e, t) {
  return (n && e ? cu(n.ref, e.ref) : void 0) ?? t;
}
function Dr(n, e, t) {
  const { ancestorChains: i } = t, s = /* @__PURE__ */ new Map();
  for (const r of e)
    r && !Array.isArray(r) && s.set(r, (s.get(r) ?? 0) + 1);
  return n.map((r, o) => {
    if (r.offsets) return r;
    const a = e[o], l = r.plain ?? r.ssml ?? "";
    if (Array.isArray(a)) {
      const [d, f] = a, g = _(d, i), p = _(f, i), m = _n(g, p, Mn(g, l));
      return m ? { ...r, locate: m } : r;
    }
    const c = a, u = c ? _(c, i) : void 0;
    if (!u) return r;
    const h = { ...r, locate: u.ref };
    if (!t.synthetic.has(r)) {
      const d = t.pendingRange.get(r), f = d !== void 0 || c && (s.get(c) ?? 0) > 1;
      h.locate = u.own && !f ? u.ref : Ce(u.ref, l), h.offsets = [{ start: d?.start ?? 0, end: d?.end ?? l.length, locate: h.locate }];
    }
    return h;
  });
}
function Bn(n) {
  const e = Rn(n.text);
  return e ? e.plain ?? (e.ssml ? ae(e.ssml) : "") : "";
}
function uu(n) {
  const e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map();
  let i = 0, s;
  return n.forEach((r, o) => {
    e.set(r, o + 1);
    const a = r.children ?? [];
    if (i = Math.max(i, a.length), a.some((l) => l.role?.includes("columnheader"))) {
      s = a.map(Bn);
      return;
    }
    s && a.forEach((l, c) => {
      const u = l.role ?? [];
      if (!u.includes("cell") && !u.includes("rowheader")) return;
      const h = s[c];
      h && t.set(l, h);
    });
  }), { lines: n.length, columns: i, rowNumbers: e, cellHeaders: t };
}
function ie(n, e) {
  const t = e.format === "ssml" ? { ssml: X(n) } : { plain: n };
  return e.synthetic.add(t), t;
}
function se(n, e, t, i) {
  n.push(...i);
  for (let s = 0; s < i.length; s++) e.push(t);
}
function Fr(n, e, t, i, s, r, o) {
  o ? (s.some((a) => t.blockStarts.has(a)) && t.blockStarts.add(o), se(n, e, r[0] ?? i, [o])) : (n.push(...s), e.push(...r));
}
function qe(n, e, t, i) {
  const s = t ? `${e}.${t}` : void 0;
  if (s && n.i18n.exists(s)) return n.i18n.t(s, i);
  if (n.i18n.exists(e)) return n.i18n.t(e, i);
}
function Un(n, e) {
  return kr.has(n) ? !0 : e.contextualize.has(n);
}
function hu(n, e, t) {
  return e.some((i) => {
    const s = Kc[i];
    return s?.drops.includes(n) ? s.unconditional || Un(i, t) : !1;
  });
}
function kt(n, e, t, i, s) {
  const r = e.lastIndexOf(t);
  if (r === -1) return;
  const o = _(i, s.ancestorChains);
  if (!o) return;
  const a = Ce(o.ref, t);
  n.offsets = [{ start: r, end: r + t.length, locate: a }], n.locate = o.own ? o.ref : a;
}
function Zi(n, e, t, i, s, r) {
  const o = r?.value;
  if (o !== void 0 && o === Bn(t)) {
    if (i.language !== "none") {
      const l = typeof t.text == "object" ? t.text.language : void 0;
      l && (n.language = l);
    }
    i.synthetic.delete(n), kt(n, e, o, t, i);
    return;
  }
  const a = r?.description;
  a !== void 0 && a === t.description && (s === "figure" || s === "table") && kt(n, e, a, t, i);
}
function es(n, e, t, i, s, r, o, a) {
  if (!Un(s, i)) return;
  if ((i.i18n.exists(`${s}.block.start`) || i.i18n.exists(`${s}.block.end`)) && i.contextualizationShapes[s] !== "inline") {
    const c = r === "before" ? `${s}.block.start` : `${s}.block.end`, u = qe(i, c, o, a);
    if (u) {
      const h = ie(u, i);
      Zi(h, u, t, i, s, a), se(n, e, t, [h]);
    }
    return;
  }
  if (r === "before") {
    const c = qe(i, `${s}.inline`, o, a);
    if (c) {
      const u = ie(c, i);
      Zi(u, c, t, i, s, a), se(n, e, t, [u]);
    }
  }
}
function ts(n, e, t, i) {
  const s = `${e}.parts.${t}`;
  return n.i18n.exists(s, { count: i }) ? n.i18n.t(s, { count: i }) : String(i);
}
function du(n) {
  return n.description === void 0 ? { variantKey: "unlabelled" } : { variantKey: "labelled", params: { description: n.description } };
}
function ns(n, e) {
  const t = e.tableCellHeaders.get(n);
  return {
    variantKey: t !== void 0 ? "withHeader" : "withoutHeader",
    params: { header: t ?? "", value: Bn(n) }
  };
}
const fu = {
  table: (n, e) => {
    const t = (n.children ?? []).filter((s) => s.role?.includes("row")), i = uu(t);
    for (const [s, r] of i.rowNumbers) e.tableRowNumbers.set(s, r);
    for (const [s, r] of i.cellHeaders) e.tableCellHeaders.set(s, r);
    return {
      params: {
        lines: ts(e, "table", "lines", i.lines),
        columns: ts(e, "table", "columns", i.columns)
      }
    };
  },
  row: (n, e) => ({ params: { count: String(e.tableRowNumbers.get(n) ?? "") } }),
  cell: ns,
  rowheader: ns
};
function is(n, e, t) {
  const i = du(e);
  let s = i.variantKey, r = i.params;
  const o = fu[n]?.(e, t);
  o && (o.variantKey && (s = o.variantKey), r = { ...r, ...o.params });
  const a = t.contextualizationParams?.(n, e);
  return a && (r = { ...r, ...a }), { variantKey: s, params: r };
}
const gu = ["math", "separator"], zn = /* @__PURE__ */ new WeakSet(), ke = /* @__PURE__ */ new WeakSet(), Ir = /* @__PURE__ */ new WeakMap(), Pr = /* @__PURE__ */ new WeakMap();
function En(n) {
  return n.role?.some((e) => gu.includes(e)) ? !1 : !n.audioref && !n.imgref && !n.textref && !n.videoref && (!n.text || Xe(n.text)) && !(n.children && n.children.length > 0) && !n.description;
}
function pu(n) {
  return !n.audioref && !n.imgref && !n.textref && !n.videoref && (!n.text || Xe(n.text)) && !!(n.children && n.children.length > 0) && !(n.role && n.role.length > 0) && !n.id;
}
function mu(n) {
  return !(n.role && n.role.length > 0) && !n.id && !n.textref && !n.imgref && !n.audioref && !n.videoref;
}
class ut {
  el;
  object = {};
  children = [];
  noText = !1;
  finalize() {
    const e = this.object, t = [];
    for (const i of this.children) {
      const s = i.finalize();
      if (!En(s)) {
        if (pu(s)) {
          t.push(...s.children ?? []);
          continue;
        }
        t.push(s);
      }
    }
    if (t.length > 0 && (e.children = t), e.role?.length && e.children?.length === 1 && !e.role.includes("presentation")) {
      const i = e.children[0];
      i.role?.length && e.role.every((s) => i.role.includes(s)) && delete e.role;
    }
    if ((!e.text || Xe(e.text)) && e.children?.length === 1) {
      const i = e.children[0];
      mu(i) && (i.text && (e.text = i.text), e.children = i.children);
    }
    return e;
  }
}
function Cn(n) {
  const e = {};
  n.id && (e.id = n.id), n.textref && (e.textref = n.textref), n.imgref && (e.imgref = n.imgref), n.audioref && (e.audioref = n.audioref), n.videoref && (e.videoref = n.videoref);
  const t = Wo(n.text);
  t !== void 0 && (e.text = t), n.role && n.role.length > 0 && (e.role = n.role), n.children && n.children.length > 0 && (e.children = n.children.map(Cn)), n.description && (e.description = n.description), zn.has(n) && ke.add(e);
  const i = Ir.get(n);
  return i && Pr.set(e, i), e;
}
function Lr(n) {
  const e = {};
  return n.id && (e.id = n.id), n.textref && (e.textref = n.textref), n.imgref && (e.imgref = n.imgref), n.audioref && (e.audioref = n.audioref), n.videoref && (e.videoref = n.videoref), n.role && (e.role = n.role), n.description && (e.description = n.description), typeof n.text == "string" ? e.text = { plain: n.text, ssml: "", language: "" } : n.text && (e.text = { plain: n.text.plain ?? "", ssml: n.text.ssml ?? "", language: n.text.language }), n.children && (e.children = n.children.map(Lr)), e;
}
function Rt(n) {
  let e = "";
  const t = [];
  for (const i of n) {
    if (i.length === 1 && jo(i) && e.endsWith(i)) {
      t.push({ start: e.length, end: e.length });
      continue;
    }
    e && !Ee(i) && !/\s$/.test(e) && !/^\s/.test(i) && (e += " ");
    const s = e.length;
    e += i, t.push({ start: s, end: e.length });
  }
  return { joined: e, ranges: t };
}
function _t(n, e) {
  const t = Pr.get(n);
  if (t) return Li({ cssSelector: t });
  const i = _(n, e.ancestorChains)?.ref;
  return i && Li(i);
}
function Su(n, e, t) {
  const i = [];
  return n.forEach((s, r) => {
    if (s.offsets) {
      i.push(...s.offsets);
      return;
    }
    if (t.synthetic.has(s)) return;
    const o = e[r];
    if (!o || Array.isArray(o)) return;
    const a = _(o, t.ancestorChains);
    if (!a) return;
    const l = t.format === "ssml" ? s.ssml : s.plain;
    if (!l) return;
    const c = t.pendingRange.get(s), u = ke.has(o) ? _t(o, t) ?? a.ref : Ce(a.ref, l);
    i.push({ start: c?.start ?? 0, end: c?.end ?? l.length, locate: u });
  }), i;
}
function ss(n, e, t, i) {
  const s = i.edgeSubstitutedLocate.get(n);
  if (s) return s[t];
  if (!(!e || Array.isArray(e) || !ke.has(e)))
    return _t(e, i);
}
function yu(n, e, t) {
  const i = n.map((l, c) => {
    if (l.locate) return l.locate;
    if (t.synthetic.has(l)) return;
    const u = e[c];
    if (!u || Array.isArray(u)) return;
    const h = t.format === "ssml" ? l.ssml : l.plain;
    if (h)
      return ke.has(u) ? _t(u, t) : Mn(_(u, t.ancestorChains), h);
  }), s = i.findIndex((l) => l !== void 0);
  if (s === -1) return;
  let r = i.length - 1;
  for (; i[r] === void 0; ) r--;
  if (s === r) return i[s];
  const o = e[s], a = e[r];
  if (o && a && !Array.isArray(o) && !Array.isArray(a)) {
    const l = _(o, t.ancestorChains), c = _(a, t.ancestorChains);
    return _n(l, c, i[s]);
  }
  return i[s];
}
function Vn(n, e, t) {
  let i, s = !1;
  const r = [], o = [], a = [];
  for (let g = 0; g < n.length; g++) {
    const p = n[g], m = t.format === "ssml" ? p.ssml : p.plain;
    if (m && (r.push(m), o.push(p), a.push(e[g]), p.language !== void 0)) {
      if (s && p.language !== i) return;
      i = p.language, s = !0;
    }
  }
  if (r.length === 0) return;
  const { joined: l } = Rt(r), c = t.format === "ssml" ? { ssml: l } : { plain: l };
  i && (c.language = i), n.some((g) => t.synthetic.has(g)) && t.synthetic.add(c);
  const u = Su(o, a, t);
  u.length > 0 && (c.offsets = u);
  const h = yu(o, a, t);
  h && (c.locate = h);
  const d = ss(o[0], a[0], "leading", t), f = ss(o[o.length - 1], a[o.length - 1], "trailing", t);
  return (d || f) && t.edgeSubstitutedLocate.set(c, { leading: d, trailing: f }), c;
}
function $r(n, e, t, i) {
  if (e === "plain" && t !== "block-level" && t !== "none" && n.ssml && Ns(n.ssml))
    return Ts(n.ssml, n.language).map((r) => {
      const o = { plain: r.plain };
      return r.language && (o.language = r.language), i.pendingRange.set(o, { start: r.start, end: r.end }), o;
    });
  const s = {};
  return n.language && (s.language = n.language), e === "ssml" ? s.ssml = n.ssml ?? X(n.plain ?? "") : s.plain = n.plain ?? ae(n.ssml ?? ""), (t === "block-level" || t === "none") && (s.ssml && (s.ssml = Nr(s.ssml)), t === "none" && delete s.language), [s];
}
function Ye(n, e) {
  return e !== "ssml" ? n : n.replace(/<[^>]+>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
}
function rs(n, e) {
  return e.size > 0 && n.some((t) => e.has(t));
}
function bu(n, e) {
  const t = Rn(n.text), i = t ? $r(t, e.format, e.language, e) : [];
  if (!e.contextualize.has("pagebreak")) return i;
  const s = e.i18n.exists("pagebreak.block.start") ? "pagebreak.block.start" : "pagebreak.inline", r = qe(e, s);
  if (r === void 0) return i;
  const o = ie(r, e);
  if (i.length === 0) return [o];
  const a = Vn([o, ...i], [void 0, ...i.map(() => n)], e);
  return a ? (a.plain !== void 0 && (a.plain += "."), a.ssml !== void 0 && (a.ssml += "."), [a]) : [o, ...i];
}
function vu(n) {
  return (n.role ?? []).some((e) => Yc.has(e));
}
function wu(n, e, t, i, s, r) {
  const o = typeof n.text == "object" ? n.text.language : void 0, a = new Map((n.children ?? []).map((d) => [d.id, d])), l = [], c = [], u = [];
  for (const d of ua(e)) {
    if (d.placeholderId !== void 0) {
      const g = a.get(d.placeholderId);
      if (!g) continue;
      s.inlineContextualization || !vu(g) ? Mr(g, l, c, s, r) : u.push(g);
      continue;
    }
    if (!d.ssml) continue;
    if (s.format === "plain" && s.language !== "block-level" && s.language !== "none" && Ns(d.ssml)) {
      for (const g of Ts(d.ssml, o)) {
        const p = { plain: g.plain };
        g.language && (p.language = g.language), l.push(p), c.push(n);
      }
      continue;
    }
    const f = {};
    o && (f.language = o), s.format === "ssml" ? f.ssml = d.ssml : f.plain = ae(d.ssml), (s.language === "block-level" || s.language === "none") && (f.ssml && (f.ssml = Nr(f.ssml)), s.language === "none" && delete f.language), l.push(f), c.push(n);
  }
  const h = l.length > 1 ? Vn(l, c, s) : void 0;
  return Fr(t, i, s, n, l, c, h), u;
}
function Mr(n, e, t, i, s) {
  const r = n.role ?? [];
  if (rs(r, i.skip)) return;
  const o = r.some((d) => Yi.has(d)), a = o && !s, l = e.length, c = r.filter(
    (d) => d !== "footnote" && d !== "pagebreak" && !hu(d, r, i)
  ), u = r.some((d) => Qc.has(d) && i.contextualize.has(d)), h = r.includes("table") && n.description !== void 0 && !u;
  if (h) {
    const d = ie(n.description, i);
    kt(d, n.description, n.description, n, i), se(e, t, n, [d]);
  }
  for (const d of c) {
    if (d === "figure" && n.description === void 0) continue;
    const { variantKey: f, params: g } = is(d, n, i);
    es(e, t, n, i, d, "before", f, g);
  }
  if (r.includes("noteref"))
    for (const d of n.children ?? []) {
      const f = d.role ?? [];
      if (!rs(f, i.skip))
        if (f.includes("footnote")) {
          const g = i.contextualize.has("footnote"), p = i.i18n.exists("footnote.block.start") || i.i18n.exists("footnote.block.end"), m = f.some((A) => Yi.has(A)) && !s && !i.inlineContextualization, b = g ? qe(i, p ? "footnote.block.start" : "footnote.inline") : void 0, w = g && (b !== void 0 || p), S = [], y = [];
          b !== void 0 && (S.push(ie(b, i)), y.push(d));
          const v = [], C = [];
          if (te([d], v, C, i, s || m), m && v.length > 0 && i.blockStarts.add(v[0]), S.push(...v), y.push(...C), w && p) {
            const A = qe(i, "footnote.block.end");
            A !== void 0 && (S.push(ie(A, i)), y.push(d));
          }
          const R = w && S.length > 1 ? Vn(S, y, i) : void 0;
          Fr(e, t, i, d, S, y, R);
        } else
          te([d], e, t, i, s);
    }
  else if (!r.some((d) => Zc.has(d))) {
    const d = typeof n.text == "object" ? n.text.ssml : void 0;
    if (d && ca(d)) {
      const f = wu(n, d, e, t, i, s);
      if (f.length > 0) {
        const g = s || o && e.length > l;
        te(f, e, t, i, g);
      }
    } else if (r.includes("pagebreak")) {
      if (se(e, t, n, bu(n, i)), n.children) {
        const f = s || o && e.length > l;
        te(n.children, e, t, i, f);
      }
    } else {
      const g = r.some((p) => kr.has(p) && Un(p, i)) ? void 0 : Rn(n.text);
      if (g && se(e, t, n, $r(g, i.format, i.language, i)), n.children) {
        const p = s || o && e.length > l;
        te(n.children, e, t, i, p);
      }
    }
  }
  if (a && e.length > l && i.blockStarts.add(e[l]), n.description !== void 0 && !u && !h) {
    const d = ie(n.description, i);
    r.includes("figure") && kt(d, n.description, n.description, n, i), se(e, t, n, [d]);
  }
  for (const d of c) {
    if (d === "figure" && n.description === void 0) continue;
    const { variantKey: f, params: g } = is(d, n, i);
    es(e, t, n, i, d, "after", f, g);
  }
}
function te(n, e, t, i, s) {
  n.forEach((r, o) => Mr(r, e, t, i, o === 0 ? s : !1));
}
const xu = As;
async function _r(n, e, t, i) {
  const s = xu(n);
  let r = "";
  const o = [];
  for (const d of s)
    o.push(r.length), d.kind === "text" ? r += d.text : d.kind === "paired" && (r += d.innerText);
  if (!r) return;
  const a = await t(e, r, i);
  if (a.length <= 1) return;
  const l = [];
  let c = "", u = 0;
  function h(d, f, g) {
    let p = f;
    const m = f + d.length;
    for (; p < m; ) {
      const b = a[u], w = Math.min(m, b.end), S = w >= b.end && u < a.length - 1;
      let y = d.slice(p - f, w - f);
      S && (y = y.replace(/[ \t\r\n]+$/, ""));
      const v = X(y);
      c += g ? g(v) : v, p = w, S && (l.push(c), c = "", u++);
    }
  }
  return s.forEach((d, f) => {
    if (d.kind === "selfClosing")
      c += d.raw;
    else if (d.kind === "text")
      h(d.text, o[f]);
    else {
      const g = `<${d.tag}${d.attrs}>`, p = `</${d.tag}>`;
      d.innerText ? h(d.innerText, o[f], (m) => `${g}${m}${p}`) : c += g + p;
    }
  }), c && l.push(c.replace(/[ \t\r\n]+$/, "")), l;
}
async function Eu(n, e) {
  const t = n.language ?? "en", i = e.segmentationSuppressions[t], s = e.format === "ssml" ? n.ssml : n.plain;
  if (!s) return;
  const r = await e.segmenter(t, Ye(s, e.format), i);
  if (r.length <= 1) return;
  if (e.format !== "ssml") return r.map((a) => ({ text: a.text, start: a.start, end: a.contentEnd }));
  const o = await _r(s, t, e.segmenter, i);
  if (o)
    return r.map((a, l) => ({ text: o[l], start: a.start, end: a.contentEnd }));
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
function as(n) {
  return n ? (Array.isArray(n) ? n[1] : n).role ?? [] : [];
}
function ls(n, e, t, i) {
  return i.edgeSubstitutedLocate.get(e)?.[t] ? !0 : !!n && !Array.isArray(n) && ke.has(n);
}
function Cu(n, e, t, i, s) {
  if (s.synthetic.has(n) || s.synthetic.has(t) || !e || !i) return !1;
  const r = s.format === "ssml" ? n.ssml : n.plain, o = s.format === "ssml" ? t.ssml : t.plain;
  return !(!r || !o || (n.language ?? "en") !== (t.language ?? "en") || as(e).some((a) => os.has(a)) || as(i).some((a) => os.has(a)) || ls(e, n, "trailing", s) || ls(i, t, "leading", s));
}
async function cs(n, e, t, i, s) {
  const r = t.synthetic.has(n) ? void 0 : await Eu(n, t);
  if (!r) {
    i.push(n), s.push(e);
    return;
  }
  const o = t.blockStarts.has(n);
  o && t.blockStarts.delete(n);
  const a = Array.isArray(e) ? void 0 : e, l = a ? _(a, t.ancestorChains) : void 0, c = a && ke.has(a) ? _t(a, t) : void 0, u = t.edgeSubstitutedLocate.get(n);
  r.forEach(({ text: h, start: d, end: f }, g) => {
    const p = { ...n, [t.format]: h }, m = (g === 0 ? u?.leading : void 0) ?? (g === r.length - 1 ? u?.trailing : void 0) ?? c;
    if (m)
      p.locate = m, p.offsets = [{ start: d, end: f, locate: m }];
    else if (l) {
      const b = t.format === "ssml" ? Ye(h, t.format) : h, w = Ce(l.ref, b);
      p.locate = w, p.offsets = [{ start: d, end: f, locate: w }];
    }
    o && g === 0 && t.blockStarts.add(p), i.push(p), s.push(e);
  });
}
function At(n, e) {
  let t = 0;
  for (; t < n.length - 1 && n[t + 1].start <= e; ) t++;
  return t;
}
async function ku(n, e, t, i) {
  const s = n.map((c) => Ye(e.format === "ssml" ? c.ssml : c.plain, e.format)), { joined: r, ranges: o } = Rt(s), a = await e.segmenter(t, r, i), l = new Array(n.length - 1).fill(!1);
  for (const c of a) {
    const u = At(o, c.start), h = c.end > c.start ? At(o, c.end - 1) : u;
    for (let d = u; d < h; d++) l[d] = !0;
  }
  return l;
}
function Ru(n, e, t, i, s, r, o) {
  const a = [];
  for (let l = s; l <= r; l++) {
    const c = _(e[l], o.ancestorChains);
    if (!c) continue;
    const u = t[l], h = Math.max(u.start, i.start), d = Math.min(u.end, l === r ? i.contentEnd : i.end);
    if (d <= h) continue;
    const f = h - u.start, g = d - u.start, p = Ye(o.format === "ssml" ? n[l].ssml : n[l].plain, o.format), m = Ce(c.ref, p.slice(f, g));
    a.push({ start: f, end: g, locate: m });
  }
  return a;
}
async function Au(n, e, t, i, s) {
  const r = n[0].language ?? "en", o = t.segmentationSuppressions[r], a = n.map((g) => Ye(t.format === "ssml" ? g.ssml : g.plain, t.format)), { joined: l, ranges: c } = Rt(a), u = await t.segmenter(r, l, o);
  let h, d;
  t.format === "ssml" && (d = Rt(n.map((g) => g.ssml)).joined, h = u.length > 1 ? await _r(d, r, t.segmenter, o) : void 0), (u.length > 0 ? u : [{ text: l, start: 0, end: l.length, contentEnd: l.length }]).forEach((g, p) => {
    const m = At(c, g.start), b = g.end > g.start ? At(c, g.end - 1) : m, w = t.format === "ssml" ? h ? h[p] : d : g.text, S = { [t.format]: w };
    r && (S.language = r), n.slice(m, b + 1).some((T) => t.blockStarts.has(T)) && t.blockStarts.add(S);
    const v = Ru(n, e, c, g, m, b, t);
    v.length > 0 && (S.offsets = v);
    const C = _(e[m], t.ancestorChains), R = Mn(C, w), A = m !== b ? _n(C, _(e[b], t.ancestorChains), R) : R;
    A && (S.locate = A), i.push(S), s.push(m === b ? e[m] : [e[m], e[b]]);
  });
}
async function Br(n, e, t) {
  if (t.segmentation !== "sentence") return { out: n, sources: e };
  const i = [], s = [];
  let r = 0;
  for (; r < n.length; ) {
    let o = r;
    for (; o + 1 < n.length && Cu(n[o], e[o], n[o + 1], e[o + 1], t); ) o++;
    if (o === r) {
      await cs(n[r], e[r], t, i, s), r = o + 1;
      continue;
    }
    const a = n.slice(r, o + 1), l = e.slice(r, o + 1), c = a[0].language ?? "en", u = await ku(a, t, c, t.segmentationSuppressions[c]);
    let h = 0;
    for (let d = 0; d < a.length; d++)
      d < a.length - 1 && u[d] || (h === d ? await cs(a[h], l[h], t, i, s) : await Au(a.slice(h, d + 1), l.slice(h, d + 1), t, i, s), h = d + 1);
    r = o + 1;
  }
  return { out: i, sources: s };
}
function Ur(n, e) {
  return Object.keys(e.substitutions).length === 0 ? n : n.map((t) => {
    if (t.ssml) {
      const { ssml: a, plain: l, map: c } = sa(t.ssml, e.substitutions);
      if (a === t.ssml) return t;
      const u = { ...t, ssml: a };
      return Pi(u, { plain: l, map: c }), u;
    }
    const i = t.plain;
    if (!i) return t;
    const { text: s, map: r } = na(i, e.substitutions);
    if (s === i) return t;
    const o = { ...t, plain: s };
    return Pi(o, { plain: i, map: r }), o;
  });
}
async function Fd(n, e) {
  const t = [], i = [], s = await Or(n, e);
  te(n, t, i, s, !1);
  const r = await Br(t, i, s);
  return Ur(Dr(r.out, r.sources, s), s);
}
async function Ou(n, e) {
  const t = [], i = [], s = await Or(n, e);
  te(n, t, i, s, !1);
  const r = await Br(t, i, s), o = r.out.map((l) => s.blockStarts.has(l)), a = Dr(r.out, r.sources, s);
  return { utterances: Ur(a, s), sources: r.sources, blockStarts: o };
}
class Id {
  engine;
  contentQueue = [];
  events = new Pt();
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
    this.engine = e, this._defaults = new ec(t.defaults), this._preferences = new We(t.preferences), this._settings = new Fi(this._preferences, this._defaults), this.contextualizationOverrides = t.contextualizationOverrides, this.segmentationOverrides = t.segmentationOverrides, this.setupEngineListeners(), this.applyEngineParameters(), this.initializeEngine();
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
          i > 0 ? this.engine.setCurrentUtteranceIndex(i, () => this.setNavigatorState("paused")) : this.setNavigatorState("paused");
          return;
        }
        this.setNavigatorState("ready"), this.emitEvent({ type: "ready" });
      }
    }), this.engine.on("boundary", (e) => {
      const { charIndex: t, charLength: i } = e.detail ?? {}, s = this.getCurrentContent(), r = s && typeof t == "number" && typeof i == "number" ? ac(s, t, i) : void 0;
      this.emitEvent(r ? { ...e, detail: { ...e.detail, ...r } } : e);
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
  setContentQueue(e, t = null, i = null) {
    this.clearPendingAdvance(), this.pendingAutoPauseIndex = null, (this.navigatorState === "playing" || this.navigatorState === "paused") && this.engine.stop();
    const s = Array.isArray(e) ? e : [e];
    this.contentQueue = [...s], this.pendingResumeIndex = t, this.pendingResumeState = i, this.setNavigatorState("loading"), this.emitEvent({ type: "loading" }), this.engine.loadUtterances(s, t ?? void 0), this.emitContentChangeEvent({ content: s });
  }
  // Re-runs extraction from `this.source`, resuming near the old position if playback was underway.
  async reextract() {
    if (!this.source) return;
    const e = this.navigatorState === "playing" || this.navigatorState === "paused" ? this.navigatorState : null, t = this.contentSources, i = this.getCurrentUtteranceIndex(), { utterances: s, sources: r, blockStarts: o } = await Ou(this.source, {
      format: this._settings.format,
      inlineContextualization: this._settings.inlineContextualization,
      skip: this._settings.skip,
      contextualize: this._settings.contextualize,
      contextualization: {
        contextualizations: this.contextualizationOverrides?.contextualizations,
        shapes: oc(this._settings.verbosity, this.contextualizationOverrides?.shapes),
        params: this.contextualizationOverrides?.params
      },
      language: this._settings.language,
      segmentation: {
        mode: this._settings.segmentation,
        suppressions: this.segmentationOverrides?.suppressions,
        segmenter: this.segmentationOverrides?.segmenter
      }
    });
    this.contentSources = r, this.contentBlockStarts = o;
    const a = e ? this.resolveResumeIndex(t, i, r) : null;
    this.setContentQueue(s, a, e);
  }
  // Nearest node at or before oldIndex that's still present in newSources.
  // A reconstructed-sentence span (a `[first, last]` tuple) is a fresh array
  // each extraction, so it never matches by identity — skipped in favor of
  // the next plain single-node entry further back.
  resolveResumeIndex(e, t, i) {
    for (let s = Math.min(t, e.length - 1); s >= 0; s--) {
      const r = e[s];
      if (r === void 0 || Array.isArray(r)) continue;
      const o = i.indexOf(r);
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
  skipToPosition(e, t = !1) {
    const i = this.getCurrentUtteranceIndex();
    return e < 0 || e >= this.contentQueue.length ? !1 : (e === i || (this.clearPendingAdvance(), this.navigatorState === "paused" && !t ? (this.pendingAutoPauseIndex !== null && (this.pendingAutoPauseIndex = e), this.engine.setCurrentUtteranceIndex(e, (s) => {
      if (s) {
        const r = this.getCurrentContent();
        r && this.emitUtteranceBoundary(r), this.emitEvent({
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
    const t = this._settings.segmentation, i = lc(e, t);
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
    return this._settings;
  }
  get preferencesEditor() {
    return this._preferencesEditor === null && (this._preferencesEditor = new Di(this._preferences, this.settings)), this._preferencesEditor;
  }
  async submitPreferences(e) {
    !this.source && Ni.some((t) => e[t] !== void 0) && console.warn(
      "submitPreferences(): extraction-affecting preferences (format, inlineContextualization, verbosity, skip, contextualize, language, segmentation) have no effect on content loaded via loadContent() — use loadGndContent() to re-extract on submission."
    ), this._preferences = this._preferences.merging(e), await this.applyPreferences();
  }
  async applyPreferences() {
    const e = this._settings;
    this._settings = new Fi(this._preferences, this._defaults), this.applyEngineParameters(), this._preferencesEditor !== null && (this._preferencesEditor = new Di(this._preferences, this._settings)), Ni.some((t) => !this.sameSettingValue(e[t], this._settings[t])) && await this.reextract();
  }
  // Arrays (skip/contextualize) compare as sets, not by reference.
  sameSettingValue(e, t) {
    return Array.isArray(e) && Array.isArray(t) ? e.length === t.length && e.every((i) => t.includes(i)) : e === t;
  }
  async destroy() {
    this.clearPendingAdvance(), this.events.clear(), await this.engine.destroy();
  }
}
const Nu = [
  "heading1",
  "heading2",
  "heading3",
  "heading4",
  "heading5",
  "heading6"
], us = {
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
  grid: "table",
  gridcell: "cell",
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
}, Tu = {
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
}, Du = {
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
}, Fu = /* @__PURE__ */ new Set(["table", "tr", "td", "th"]), Iu = /* @__PURE__ */ new Set(["table", "row", "cell", "columnheader", "rowheader"]);
function Pu(n) {
  const e = n.getAttribute("role");
  if (!e) return !1;
  const t = e.split(/\s+/).filter(Boolean);
  return t.includes("presentation") || t.includes("none");
}
function Lu(n) {
  for (let e = n.parentElement; e; e = e.parentElement)
    if (Pu(e)) return !0;
  return !1;
}
function $u(n, e, t) {
  return Fu.has(e) || t.some((i) => Iu.has(i));
}
function gt(n, e) {
  const t = n.getAttribute("role");
  return t ? t.split(/\s+/).filter(Boolean).includes(e) : !1;
}
function Mu(n) {
  return n.tagName.toLowerCase() === "table" || gt(n, "table") || gt(n, "grid") || gt(n, "treegrid");
}
function _u(n) {
  return n.tagName.toLowerCase() === "tr" || gt(n, "row");
}
function Bu(n) {
  let e = null;
  for (let i = n.parentElement; i; i = i.parentElement)
    if (Mu(i)) {
      e = i;
      break;
    }
  return e ? e.ownerDocument.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (i) => _u(i) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
  }).nextNode() === n : !1;
}
function zr(n) {
  const e = [];
  let t = !1;
  const i = n.getAttribute("role");
  if (i)
    for (const r of i.split(/\s+/).filter(Boolean))
      if ((r === "presentation" || r === "none") && (t = !0), r === "heading") {
        let o = 2;
        const a = parseInt(n.getAttribute("aria-level") ?? "", 10);
        Number.isFinite(a) && a >= 1 && (o = Math.min(a, 6)), e.push(Nu[o - 1]);
      } else us[r] && e.push(us[r]);
  const s = n.getAttribute("epub:type");
  if (s)
    for (const r of s.split(/\s+/).filter(Boolean)) {
      const o = Tu[r];
      o && e.push(o);
    }
  return { attrRoles: e, presentational: t };
}
function Vr(n) {
  const { attrRoles: e, presentational: t } = zr(n);
  return e.length > 0 || t;
}
function ze(n) {
  const e = [], t = (o) => {
    e.includes(o) || e.push(o);
  }, { attrRoles: i, presentational: s } = zr(n), r = n.tagName.toLowerCase();
  if (s)
    return ["presentation"];
  if ($u(n, r, i) && Lu(n))
    return ["presentation"];
  if (r === "body")
    t("body");
  else if (r === "th")
    switch (n.getAttribute("scope")) {
      case "col":
        t("columnheader");
        break;
      case "row":
        t("rowheader");
        break;
      default: {
        const o = n.parentElement;
        o && Bu(o) ? t("columnheader") : n.previousElementSibling === null ? t("rowheader") : t("cell");
      }
    }
  else {
    const o = Du[r];
    o && t(o);
  }
  for (const o of i) t(o);
  return e;
}
function hs(n) {
  return !!(n.getAttribute("aria-hidden") === "true" || n.hasAttribute("hidden"));
}
function Uu(n) {
  let e = "";
  const t = (i) => {
    i.nodeType === 3 && (e += i.nodeValue ?? "");
    for (let s = i.firstChild; s; s = s.nextSibling) t(s);
  };
  return t(n), e;
}
function Bt(n) {
  return we(Uu(n), !0).trim();
}
function kn(n) {
  let e = "";
  const t = (i, s) => {
    if (i.nodeType === 3) {
      e += i.nodeValue ?? "";
      return;
    }
    if (!(i.nodeType === 1 && !s && Vr(i)))
      for (let r = i.firstChild; r; r = r.nextSibling) t(r, !1);
  };
  return t(n, !0), e;
}
function ds(n) {
  return we(kn(n), !0).trim();
}
function zu(n) {
  if (hs(n))
    return [null, !1];
  const e = (n.getAttribute("aria-labelledby") ?? "").trim();
  if (e) {
    const r = [...new Set(e.split(/\s+/).filter(Boolean))], o = n.ownerDocument, a = r.map((l) => o.getElementById(l)).filter((l) => l !== null);
    if (a.length > 0) {
      let l = "";
      a.forEach((u, h) => {
        if (hs(u)) return;
        const d = u.getAttribute("aria-label");
        l += d || kn(u), h < a.length - 1 && (l += " ");
      });
      const c = we(l, !0).trim();
      if (c !== "")
        return [{ language: "", plain: c }, !0];
    }
  }
  const t = (n.getAttribute("aria-label") ?? "").trim();
  if (t)
    return [{ language: "", plain: t }, !0];
  const i = (n.getAttribute("aria-describedby") ?? "").trim();
  if (i) {
    const o = [...new Set(i.split(/\s+/).filter(Boolean))].map((a) => n.ownerDocument.getElementById(a)).filter((a) => a !== null);
    if (o.length > 0) {
      const a = o.map((c) => kn(c)).join(" "), l = we(a, !0).trim();
      if (l !== "")
        return [{ language: "", plain: l }, !0];
    }
  }
  const s = n.tagName.toLowerCase();
  if (s === "img") {
    const r = (n.getAttribute("alt") ?? "").trim();
    if (r) return [{ language: "", plain: r }, !0];
    const o = (n.getAttribute("title") ?? "").trim();
    if (o) return [{ language: "", plain: o }, !0];
  } else if (s === "svg") {
    const r = n.querySelector(":scope > title");
    if (r) {
      const o = Bt(r);
      if (o) return [{ language: "", plain: o }, !0];
    }
  } else if (s === "math") {
    const r = (n.getAttribute("alttext") ?? "").trim();
    if (r) return [{ language: "", plain: r }, !0];
  }
  return [null, !0];
}
const Vu = {
  em: ["emphasis"],
  b: ["emphasis"],
  i: ["emphasis", { level: "reduced" }],
  strong: ["emphasis", { level: "strong" }],
  br: ["break"]
};
function ju(n) {
  return Vu[n] ?? ["", void 0];
}
const Hu = /* @__PURE__ */ new Set([
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
]), Wu = 1;
function fs(n) {
  for (let e = n; e; e = e.parentElement) {
    const t = e.getAttribute("xml:lang");
    if (t) return t;
    const i = e.getAttribute("lang");
    if (i) return i;
  }
  return "";
}
function Ku(n) {
  for (let e = n.firstChild; e; e = e.nextSibling)
    if (e.nodeType === Wu) return !0;
  return !1;
}
function jr(n, e) {
  for (let t = e; t; t = t.parentElement)
    if (t === n) return !0;
  return !1;
}
const qu = /* @__PURE__ */ new Set([
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
]);
function Gu(n) {
  return qu.has(n);
}
function Xu(n) {
  const e = n.slice(0, 500);
  return /<\?xml\b/.test(e) || /xmlns:epub=/.test(e) || /DOCTYPE\s+html\s+PUBLIC\s+"-\/\/W3C\/\/DTD XHTML/i.test(e) ? "application/xhtml+xml" : "text/html";
}
function Hr(n) {
  return typeof n == "object" && n !== null && n.nodeType === Node.ELEMENT_NODE;
}
const Ge = {
  NONE: "",
  DESCENDANT: " ",
  CHILD: " > "
}, D = {
  id: "id",
  class: "class",
  tag: "tag",
  attribute: "attribute",
  nthchild: "nthchild",
  nthoftype: "nthoftype"
};
function Ju(n, e) {
  return Object.values(n).includes(e);
}
const Yu = "CssSelectorGenerator";
function Ot(n = "unknown problem", ...e) {
  console.warn(`${Yu}: ${n}`, ...e);
}
const Qu = {
  selectors: [
    D.id,
    D.class,
    D.tag,
    D.attribute
  ],
  // if set to true, always include tag name
  includeTag: !1,
  whitelist: [],
  blacklist: [],
  combineWithinSelector: !0,
  combineBetweenSelectors: !0,
  root: null,
  maxCombinations: Number.POSITIVE_INFINITY,
  maxCandidates: Number.POSITIVE_INFINITY,
  useScope: !1,
  ignoreGeneratedClassNames: !1
};
function Pe(n) {
  return !!n;
}
function Zu(n) {
  return Array.isArray(n) ? n.filter((e) => Ju(D, e)) : [];
}
function Wr(n) {
  return n instanceof RegExp;
}
function eh(n) {
  return ["string", "function"].includes(typeof n) || Wr(n);
}
function gs(n) {
  return Array.isArray(n) ? n.filter(eh) : [];
}
function th(n) {
  return n != null && typeof n == "object" && "nodeType" in n && typeof n.nodeType == "number";
}
function ps(n) {
  const e = [
    Node.DOCUMENT_NODE,
    Node.DOCUMENT_FRAGMENT_NODE,
    // this includes Shadow DOM root
    Node.ELEMENT_NODE
  ];
  return th(n) && e.includes(n.nodeType);
}
function Kr(n, e) {
  if (ps(n))
    return n.contains(e) || Ot("element root mismatch", "Provided root does not contain the element. This will most likely result in producing a fallback selector using element's real root node. If you plan to use the selector using provided root (e.g. `root.querySelector`), it will not work as intended."), n;
  const t = e.getRootNode({ composed: !1 });
  return ps(t) ? (t.nodeType !== Node.DOCUMENT_NODE && Ot("shadow root inferred", "You did not provide a root and the element is a child of Shadow DOM. This will produce a selector using ShadowRoot as a root. If you plan to use the selector using document as a root (e.g. `document.querySelector`), it will not work as intended."), t) : Hn(e);
}
function en(n) {
  return typeof n == "number" ? n : Number.POSITIVE_INFINITY;
}
function nh(n, e = {}) {
  const t = Object.assign(Object.assign({}, Qu), e);
  return {
    selectors: Zu(t.selectors),
    whitelist: gs(t.whitelist),
    blacklist: gs(t.blacklist),
    root: Kr(t.root, n),
    combineWithinSelector: Pe(t.combineWithinSelector),
    combineBetweenSelectors: Pe(t.combineBetweenSelectors),
    includeTag: Pe(t.includeTag),
    maxCombinations: en(t.maxCombinations),
    maxCandidates: en(t.maxCandidates),
    useScope: Pe(t.useScope),
    maxResults: en(t.maxResults),
    ignoreGeneratedClassNames: Pe(t.ignoreGeneratedClassNames)
  };
}
function Qe(n = []) {
  const [e = [], ...t] = n;
  return t.length === 0 ? e : t.reduce((i, s) => {
    const r = new Set(s);
    return i.filter((o) => r.has(o));
  }, e);
}
function ih(n) {
  return [].concat(...n);
}
function sh(n) {
  return n.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replace(/\*/g, ".+");
}
function Nt(n) {
  const e = n.map((t) => {
    if (Wr(t))
      return (i) => t.test(i);
    if (typeof t == "function")
      return (i) => {
        const s = t(i);
        return typeof s != "boolean" ? (Ot("pattern matcher function invalid", "Provided pattern matching function does not return boolean. It's result will be ignored.", t), !1) : s;
      };
    if (typeof t == "string") {
      const i = new RegExp("^" + sh(t) + "$");
      return (s) => i.test(s);
    }
    return Ot("pattern matcher invalid", "Pattern matching only accepts strings, regular expressions and/or functions. This item is invalid and will be ignored.", t), () => !1;
  });
  return (t) => e.some((i) => i(t));
}
function jn(n, e, t) {
  const i = Kr(t, n[0]).querySelectorAll(e);
  if (i.length !== n.length)
    return !1;
  const s = new Set(i);
  return n.every((r) => s.has(r));
}
function qr(n, e) {
  e = e ?? Hn(n);
  const t = [];
  let i = n;
  for (; i && i !== e; )
    Hr(i) && t.push(i), i = i.parentNode;
  return t;
}
function rh(n, e) {
  return Qe(n.map((t) => qr(t, e)));
}
function oh(n) {
  return typeof n == "object" && n !== null && "nodeType" in n && n.nodeType === Node.DOCUMENT_FRAGMENT_NODE && "host" in n;
}
function Hn(n) {
  return n.ownerDocument.querySelector(":root");
}
const Gr = ", ", ah = new RegExp([
  "^$",
  // empty or not set
  "\\s"
  // contains whitespace
].join("|")), lh = new RegExp([
  "^$"
  // empty or not set
].join("|")), Xr = [
  D.nthoftype,
  D.tag,
  D.id,
  D.class,
  D.attribute,
  D.nthchild
], ch = Nt([
  "class",
  "id",
  // Angular attributes
  "ng-*"
]);
function uh({ name: n }) {
  return `[${n}]`;
}
function hh({ name: n, value: e }) {
  return `[${n}='${e}']`;
}
function dh({ nodeName: n, nodeValue: e }, t) {
  const i = t.tagName.toLowerCase();
  return ["input", "option"].includes(i) && n === "value" || n === "src" && e?.startsWith("data:") ? !1 : !ch(n);
}
function fh({ nodeName: n, nodeValue: e }) {
  return {
    name: xe(n),
    value: xe(e ?? void 0)
  };
}
function Jr(n, e) {
  const t = Array.from(n.attributes).filter((i) => dh(i, n)).map(fh);
  return [
    ...t.map(uh),
    ...t.map(hh)
  ];
}
function gh(n, e) {
  const t = n.map((i) => Jr(i));
  return Qe(t);
}
const ph = /^[a-z_-]{3,}$/i, mh = /[bcdfghjklmnpqrstvwxyz]{4,}/i;
function Sh(n) {
  if (!ph.test(n) || n.includes("_") && !n.includes("__") || /^(css|sc|jsx|emotion|makeStyles|MuiButton|MuiBox)-/i.test(n))
    return !1;
  const e = n.split(new RegExp("--|__|[-]|(?<=[a-z])(?=[A-Z])")).filter((t) => t.length > 0);
  if (e.length === 0 || e.length === 1 && e[0].length < 4)
    return !1;
  for (const t of e)
    if (t.length <= 2 || mh.test(t))
      return !1;
  return !0;
}
function Yr(n, e) {
  var t;
  const i = ((t = n.getAttribute("class")) !== null && t !== void 0 ? t : "").trim().split(/\s+/).filter((r) => !lh.test(r));
  let s = i;
  if (e?.ignoreGeneratedClassNames) {
    const r = Nt(e.whitelist);
    s = i.filter((o) => {
      const a = `.${xe(o)}`;
      return r(a) ? !0 : Sh(o);
    });
  }
  return s.map((r) => `.${xe(r)}`);
}
function yh(n, e) {
  const t = n.map((i) => Yr(i, e));
  return Qe(t);
}
function Qr(n, e) {
  var t;
  const i = (t = n.getAttribute("id")) !== null && t !== void 0 ? t : "", s = `#${xe(i)}`, r = n.getRootNode({ composed: !1 });
  return !ah.test(i) && jn([n], s, r) ? [s] : [];
}
function bh(n, e) {
  return n.length === 0 || n.length > 1 ? [] : Qr(n[0]);
}
function Zr(n, e) {
  const t = n.parentNode, i = t && "children" in t ? t.children : null;
  if (i) {
    for (let s = 0; s < i.length; s++)
      if (i[s] === n)
        return [`:nth-child(${String(s + 1)})`];
  }
  return [];
}
function vh(n, e) {
  return Qe(n.map((t) => Zr(t)));
}
function eo(n, e) {
  return [
    xe(n.tagName.toLowerCase())
  ];
}
function to(n, e) {
  const t = [
    ...new Set(ih(n.map((i) => eo(i))))
  ];
  return t.length === 0 || t.length > 1 ? [] : [t[0]];
}
function no(n, e) {
  const t = to([n])[0], i = n.parentNode, s = i && "children" in i ? i : null;
  if (s) {
    const o = Array.from(s.children).filter((a) => a.tagName.toLowerCase() === t).indexOf(n);
    if (o > -1)
      return [
        `${t}:nth-of-type(${String(o + 1)})`
      ];
  }
  return [];
}
function wh(n, e) {
  return Qe(n.map((t) => no(t)));
}
function* io(n = [], { maxResults: e = Number.POSITIVE_INFINITY } = {}) {
  let t = 0, i = so(1);
  for (; i.length <= n.length && t < e; ) {
    t += 1;
    const s = new Array(i.length);
    for (let r = 0; r < i.length; r++)
      s[r] = n[i[r]];
    yield s, i = Eh(i, n.length - 1);
  }
}
function xh(n = [], { maxResults: e = Number.POSITIVE_INFINITY } = {}) {
  return Array.from(io(n, { maxResults: e }));
}
function Eh(n = [], e = 0) {
  const t = n.length;
  if (t === 0)
    return n;
  let i = t - 1;
  for (; i >= 0 && n[i] === e - (t - 1 - i); )
    i -= 1;
  if (i < 0)
    return so(t + 1);
  n[i] += 1;
  for (let s = i + 1; s < t; s++)
    n[s] = n[s - 1] + 1;
  return n;
}
function so(n = 1) {
  const e = new Array(n);
  for (let t = 0; t < n; t++)
    e[t] = t;
  return e;
}
function* Ch(n = {}) {
  const e = Object.entries(n);
  if (e.length === 0)
    return;
  const t = [
    { index: e.length - 1, partial: {} }
  ];
  for (; t.length > 0; ) {
    const i = t.pop();
    if (!i)
      break;
    const { index: s, partial: r } = i;
    if (s < 0) {
      yield r;
      continue;
    }
    const [o, a] = e[s];
    for (let l = a.length - 1; l >= 0; l--)
      t.push({
        index: s - 1,
        partial: Object.assign(Object.assign({}, r), { [o]: a[l] })
      });
  }
}
const kh = "3a".toUpperCase(), Rh = /[ !"#$%&'()[\]{|}<>*+,./;=?@^`~\\]/;
function xe(n = "") {
  return CSS ? CSS.escape(n) : Ah(n);
}
function Ah(n = "") {
  return n.split("").map((e) => e === ":" ? `\\${kh} ` : Rh.test(e) ? `\\${e}` : escape(e).replace(/%/g, "\\")).join("");
}
const Oh = {
  tag: to,
  id: bh,
  class: yh,
  attribute: gh,
  nthchild: vh,
  nthoftype: wh
}, Nh = {
  tag: eo,
  id: Qr,
  class: Yr,
  attribute: Jr,
  nthchild: Zr,
  nthoftype: no
};
function Th(n, e, t) {
  return Nh[e](n, t);
}
function Dh(n, e, t) {
  const i = Oh[e];
  return i(n, t);
}
function Fh(n = [], e, t) {
  return n.filter((i) => t(i) || !e(i));
}
function Ih(n = [], e) {
  return n.sort((t, i) => {
    const s = e(t), r = e(i);
    return s && !r ? -1 : !s && r ? 1 : 0;
  });
}
function Ut() {
  const n = /* @__PURE__ */ new Map();
  let e;
  return (t, i) => {
    if (t.length !== 1)
      return e ?? (e = ms(t, i));
    const [s] = t;
    let r = n.get(s);
    return r || (r = ms(t, i), n.set(s, r)), r;
  };
}
function* Ph(n, e, t = Ut()) {
  const i = /* @__PURE__ */ new Set(), s = t(n, e);
  for (const r of _h(s, e))
    i.has(r) || (i.add(r), yield r);
}
function ms(n, e) {
  const { blacklist: t, whitelist: i, combineWithinSelector: s, maxCombinations: r } = e, o = Nt(t), a = Nt(i), l = (c, u) => {
    const h = Dh(n, u, e), d = Fh(h, o, a), f = Ih(d, a);
    return c[u] = s ? Array.from(io(f, { maxResults: r })) : f.map((g) => [g]), c;
  };
  return Lh(e).reduce(l, {});
}
function Lh(n) {
  const { selectors: e, includeTag: t } = n, i = [...e];
  return t && !i.includes("tag") && i.push("tag"), i;
}
function $h(n) {
  return n.includes(D.tag) || n.includes(D.nthoftype) ? [...n] : [...n, D.tag];
}
function Mh(n) {
  const { selectors: e, combineBetweenSelectors: t, includeTag: i, maxCandidates: s } = n, r = t ? xh(e, { maxResults: s }) : e.map((o) => [o]);
  return i ? r.map($h) : r;
}
function* _h(n, e) {
  for (const t of Mh(e))
    yield* Bh(t, n);
}
function* Bh(n, e) {
  const t = {};
  for (const i of n) {
    const s = e[i];
    s && s.length > 0 && (t[i] = s);
  }
  for (const i of Ch(t))
    yield zh(i);
}
function Uh(n, e) {
  return e[n] ? e[n].join("") : "";
}
function zh(n = {}) {
  const e = [...Xr];
  return n[D.tag] && n[D.nthoftype] && e.splice(e.indexOf(D.tag), 1), e.map((t) => Uh(t, n)).join("");
}
function Vh(n, e) {
  return [
    ...n.map((t) => e + Ge.DESCENDANT + t),
    ...n.map((t) => e + Ge.CHILD + t)
  ];
}
function* jh(n, e) {
  if (e === "")
    yield* n;
  else
    for (const t of n)
      yield* Vh([t], e);
}
function* Hh(n, e, t = "", i, s = Ut()) {
  const r = Ph(n, i, s);
  for (const o of jh(r, t))
    jn(n, o, e) && (yield o);
}
function* Wh(n, e, t = "", i, s = Ut()) {
  if (n.length === 0)
    return null;
  const r = [
    n.length > 1 ? n : [],
    ...rh(n, e).map((o) => [o])
  ];
  for (const o of r)
    for (const a of Hh(o, e, t, i, s))
      yield {
        foundElements: o,
        selector: a
      };
}
function* Kh({ elements: n, root: e, rootSelector: t = "", options: i }) {
  let s = e, r = t, o = !0;
  const a = Ut();
  for (; o; ) {
    let l = !1;
    for (const c of Wh(n, s, r, i, a)) {
      const { foundElements: u, selector: h } = c;
      if (l = !0, jn(n, h, e))
        yield h;
      else {
        s = u[0], r = h;
        break;
      }
    }
    l || (o = !1);
  }
}
function qh(n) {
  (n instanceof NodeList || n instanceof HTMLCollection) && (n = Array.from(n));
  const e = (Array.isArray(n) ? n : [n]).filter(Hr);
  return [...new Set(e)];
}
function Gh(n) {
  return {
    value: n,
    include: !1
  };
}
function Xh(n, e, t = Ge.NONE) {
  const i = {};
  return e.forEach((s) => {
    Reflect.set(i, s, Th(n, s).map(Gh));
  }), {
    element: n,
    operator: t,
    selectors: i
  };
}
function Jh({ selectors: n, operator: e }) {
  let t = [...Xr];
  n[D.tag] && n[D.nthoftype] && (t = t.filter((s) => s !== D.tag));
  let i = "";
  return t.forEach((s) => {
    var r;
    ((r = n[s]) !== null && r !== void 0 ? r : []).forEach(({ value: a, include: l }) => {
      l && (i += a);
    });
  }), e + i;
}
function Yh(n, e) {
  const t = qr(n, e).reverse(), i = oh(e), s = t.map((o, a) => {
    var l;
    const c = Xh(
      o,
      [D.nthchild],
      // do not use child combinator for the first element in ShadowRoot
      i && a === 0 ? Ge.NONE : Ge.CHILD
    );
    return ((l = c.selectors.nthchild) !== null && l !== void 0 ? l : []).forEach((u) => {
      u.include = !0;
    }), c;
  });
  return [i ? "" : e ? ":scope" : ":root", ...s.map(Jh)].join("");
}
function Qh(n, e) {
  return n.map((t) => Yh(t, e)).join(Gr);
}
var Zh = function(n, e) {
  var t = {};
  for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && e.indexOf(i) < 0 && (t[i] = n[i]);
  if (n != null && typeof Object.getOwnPropertySymbols == "function")
    for (var s = 0, i = Object.getOwnPropertySymbols(n); s < i.length; s++)
      e.indexOf(i[s]) < 0 && Object.prototype.propertyIsEnumerable.call(n, i[s]) && (t[i[s]] = n[i[s]]);
  return t;
};
function ro(n, e = {}) {
  const t = Object.assign(Object.assign({}, e), { maxResults: 1 });
  return ed(n, t).next().value;
}
function* ed(n, e = {}) {
  var t;
  const i = qh(n), s = nh(i[0], e), r = (t = s.root) !== null && t !== void 0 ? t : Hn(i[0]);
  let o = 0;
  for (const l of Kh({
    elements: i,
    options: s,
    root: r,
    rootSelector: ""
  }))
    if (yield l, o++, o >= s.maxResults)
      return;
  if (i.length > 1) {
    const { maxResults: l } = e, c = Zh(e, ["maxResults"]);
    if (yield i.map((u) => ro(u, c)).join(Gr), o++, o >= s.maxResults)
      return;
  }
  const a = e.root !== void 0;
  yield Qh(i, s.useScope || a ? r : void 0);
}
function Wn(n, e) {
  return n.querySelectorAll(`#${CSS.escape(e)}`).length === 1;
}
function td(n) {
  const e = n.getAttribute("id");
  if (e && Wn(n.ownerDocument, e)) return `#${CSS.escape(e)}`;
  const t = n.parentElement, i = n.tagName.toLowerCase();
  if (!t) return i;
  const s = Array.from(t.children);
  for (const r of n.classList) {
    const o = `.${CSS.escape(r)}`;
    if (s.filter((a) => a.matches(o)).length === 1) return o;
  }
  return s.filter((r) => r.tagName === n.tagName).length === 1 ? i : `${i}:nth-child(${s.indexOf(n) + 1})`;
}
function oo(n, e) {
  const t = [];
  let i = n;
  for (; i && i !== e; ) {
    const s = td(i);
    if (t.unshift(s), s.startsWith("#")) return t;
    i = i.parentElement;
  }
  return i === e ? t : void 0;
}
function nd(n) {
  if (!n) return null;
  const e = n.getAttribute("id");
  if (e && Wn(n.ownerDocument, e)) return `#${CSS.escape(e)}`;
  const t = n.ownerDocument.documentElement, i = oo(n, t) ?? [];
  return i.length > 0 && i[0].startsWith("#") ? i.join(" > ") : [t.tagName.toLowerCase(), ...i].join(" > ");
}
function zt(n, e, t) {
  const i = n.getAttribute("id");
  if (i && (!e || Wn(n.ownerDocument, i))) return `#${CSS.escape(i)}`;
  if (!e)
    return ro(n, { selectors: ["id", "class", "tag", "nthchild"] }) ?? void 0;
  if (n === e) return t ?? void 0;
  const s = oo(n, e);
  if (!(!s || s.length === 0))
    return s[0].startsWith("#") ? s.join(" > ") : t ? `${t} > ${s.join(" > ")}` : s.join(" > ");
}
function ao(n, e) {
  if (!n) return;
  const t = e.getAttribute("id");
  return !!t && n === `#${CSS.escape(t)}` ? n : su(n);
}
const id = 3;
function sd(n, e) {
  let t = 0;
  for (const i of Array.from(n.childNodes)) {
    if (i === e) return t;
    i.nodeType === id && t++;
  }
  return t;
}
function Ss(n, e, t, i, s) {
  const r = n.parentElement;
  if (!r) return;
  const o = s && r === s.el ? s.selector : zt(r, t, i);
  if (o)
    return { cssSelector: o, textNodeIndex: sd(r, n), charOffset: e };
}
function rd(n, e, t, i) {
  const s = Ss(...n.first, e, t, i);
  if (!s) return;
  const r = Ss(...n.last, e, t, i);
  return r ? { start: s, end: r } : { start: s };
}
function od(n) {
  const e = il(n);
  return e.status === ne.SUCCESS ? e.fragment : void 0;
}
const lo = "leaf-text";
function ys(n) {
  if (n === !0) return (e) => e.length > 0;
  if (Array.isArray(n) && n.length > 0) {
    const e = new Set(n.filter((t) => t !== lo));
    return (t) => t.some((i) => e.has(i));
  }
  return null;
}
function bs(n) {
  return n === !0 || Array.isArray(n) && n.includes(lo);
}
function ad(n) {
  return !!n && typeof n == "object" && !Array.isArray(n);
}
function ld(n) {
  return ad(n) ? {
    predicate: ys(n.roles),
    leafText: bs(n.roles),
    domRange: !!n.domRange,
    textFragment: !!n.textFragment
  } : { predicate: ys(n), leafText: bs(n), domRange: !1, textFragment: !1 };
}
class cd {
  claimed = /* @__PURE__ */ new Set();
  counters = /* @__PURE__ */ new Map();
  // `isTaken` additionally excludes ids already in use elsewhere (e.g. a
  // real author-written id in the document) that this allocator has no way
  // of knowing about on its own.
  allocate(e, t) {
    for (; ; ) {
      const i = (this.counters.get(e) ?? 0) + 1;
      this.counters.set(e, i);
      const s = `${e}${i}`;
      if (!(t(s) || this.claimed.has(s)))
        return this.claimed.add(s), s;
    }
  }
  claim(e) {
    return this.claimed.has(e) ? !1 : (this.claimed.add(e), !0);
  }
}
function ud(n) {
  for (let e = n.parentElement; e; e = e.parentElement)
    if (ze(e).includes("endnotes")) return !0;
  return !1;
}
function hd(n, e, t) {
  const i = [], s = (r, o) => {
    const a = r.getAttribute("id");
    if (a && !e.has(a) && e.set(a, r), o = o || r.getAttribute("aria-hidden") === "true" || r.hasAttribute("hidden"), !o && r.tagName.toLowerCase() === "a" && ze(r).includes("noteref")) {
      const c = r.getAttribute("href") ?? "";
      c.startsWith("#") && i.push({ id: c.slice(1), ref: r });
    }
    for (let l = r.firstElementChild; l; l = l.nextElementSibling) s(l, o);
  };
  s(n, !1);
  for (const r of i) {
    const o = e.get(r.id);
    o && (jr(o, r.ref) || ud(o) || t.add(o));
  }
}
function dd(n, e, t, i) {
  const s = { role: i }, r = (e.getAttribute("title") ?? "").trim();
  r ? s.text = { plain: r, ssml: "", language: "" } : t && (s.text = { plain: t.plain ?? "", ssml: t.ssml ?? "", language: t.language }, zn.add(s));
  const o = !!(s.text && !Xe(s.text)), a = !n.xmlParsed && (Ku(e) || o && e.firstChild !== null);
  if (!o && !a) {
    const u = Bt(e);
    u && (s.text = { plain: u, ssml: "", language: "" });
  }
  const l = zt(e, n.selectorRoot, n.selectorRootAnchor), c = ao(l, e);
  return c && (s.textref = c), n.placeholder(e, "pagebreak", s), a;
}
function fd(n, e, t) {
  const i = { role: t }, s = Bt(e);
  s && (i.text = { plain: s, ssml: "", language: "" });
  const r = e.getAttribute("href") ?? "";
  let o = e.getAttribute("id") ?? "";
  if (!o && r.startsWith("#") && (o = r.slice(1)), r.startsWith("#")) {
    const a = r.slice(1), l = n.ids.get(a);
    if (l && !jr(l, e) && n.noterefDepth < 3) {
      const c = n.spawnChild(l);
      c.convert(l);
      const u = c.result();
      u.length > 0 && (i.children = u.map((h) => {
        const d = Lr(h);
        return delete d.id, d;
      }));
    }
  }
  !i.children && r && (i.children = [{ textref: r }]), n.placeholder(e, "noteref", i, o || void 0);
}
function gd(n, e, t, i) {
  const s = {};
  if (t.length > 0 && (s.role = t), i) {
    s.text = { plain: i.plain ?? "", ssml: i.ssml ?? "", language: i.language }, zn.add(s);
    const o = zt(e, n.selectorRoot, n.selectorRootAnchor);
    o && Ir.set(s, o);
  } else {
    const o = Bt(e);
    o && (s.text = { plain: o, ssml: "", language: "" });
  }
  const r = e.getAttribute("href");
  r && (s.textref = r), n.placeholder(e, t[0] ?? "link", s);
}
const pd = 3, md = 1, Sd = /* @__PURE__ */ new Set(["summary", "dfn", "span"]);
function vs(n, e) {
  return Sd.has(n) && e.length > 0 ? !0 : !Gu(n);
}
class Tt {
  xmlParsed;
  ids = /* @__PURE__ */ new Map();
  suppressed = /* @__PURE__ */ new Set();
  idAlloc = new cd();
  noterefDepth = 0;
  allowNode = null;
  selectorPredicate = null;
  // Only meaningful (and safe) when converting a live, already-rendered
  // element — see TextrefOptions.domRange in options.ts.
  domRangeEnabled = !1;
  // Unlike domRangeEnabled, safe against a detached parsed document too —
  // see TextrefOptions.textFragment in options.ts.
  textFragmentEnabled = !1;
  // See TextrefOptions.roles' leafTextRoleKeyword in options.ts.
  leafTextEnabled = !1;
  docRoot = null;
  // The live element selectors are climbed relative to — see
  // selectorGenerator.ts's selectorForElement(). Only set when converting a
  // live, already-rendered element (same caveat as domRangeEnabled).
  selectorRoot = null;
  // Prefixed onto every generated selector — see selectorGenerator.ts's rootAnchorSelector().
  selectorRootAnchor = null;
  root = new ut();
  current = this.root;
  // Captions whose text was already folded into a table's `description` —
  // only these specific elements go silent, not the whole table (rows/cells
  // still need their own text).
  foldedCaptions = /* @__PURE__ */ new Set();
  segments = [];
  textAcc = "";
  currentCtx = { lang: "", tag: "" };
  flowEndsWithSpace = !0;
  pendingChildren = [];
  // Boundary text nodes of the flow currently being accumulated, for
  // domRange generation — see text()/resetFlow()/flushText().
  flowFirstNode = null;
  flowFirstOffset = 0;
  flowLastNode = null;
  flowLastOffset = 0;
  // The boundary nodes of the flow flushText() just flushed, read by tail()
  // right after calling it to build a domRange for the block it closes.
  lastFlowRange = null;
  // The plain-text string of the flow flushText() just flushed, read by
  // tail() right after calling it as the text-fragment candidate text.
  lastFlowText = null;
  constructor(e) {
    this.xmlParsed = e;
  }
  // A sub-conversion sharing this converter's document-wide state (ids,
  // suppressed, idAlloc) — for content reached from within the same
  // document, e.g. a noteref's footnote target. New fields shared this way
  // belong here, not re-copied at each call site.
  spawnChild(e, t = 1) {
    const i = new Tt(this.xmlParsed);
    return i.ids = this.ids, i.suppressed = this.suppressed, i.idAlloc = this.idAlloc, i.noterefDepth = this.noterefDepth + t, i.allowNode = e, i.docRoot = this.docRoot, i.selectorRoot = this.selectorRoot, i.selectorRootAnchor = this.selectorRootAnchor, i.selectorPredicate = this.selectorPredicate, i.domRangeEnabled = this.domRangeEnabled, i.textFragmentEnabled = this.textFragmentEnabled, i.leafTextEnabled = this.leafTextEnabled, i;
  }
  prescan(e) {
    hd(e, this.ids, this.suppressed);
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
    for (let t = e.firstChild; t; t = t.nextSibling) this.walk(t);
    this.flushText();
  }
  result() {
    const e = this.root.finalize();
    return !e.children || e.children.length === 0 ? En(e) ? [] : [Cn(e)] : e.children.map(Cn);
  }
  // An explicit-role descendant is content in its own right and skips
  // inherited `noText` — except `caption`, always the already-folded source.
  descend(e, t) {
    const i = new ut();
    i.el = e, i.noText = this.foldedCaptions.has(e) || (!Vr(e) || t.includes("caption")) && this.current.noText, this.current.children.push(i), this.current = i;
  }
  appendChild(e) {
    e.noText = this.current.noText, this.current.children.push(e);
  }
  walk(e) {
    if (e.nodeType === pd) {
      this.text(e);
      return;
    }
    if (e.nodeType !== md) return;
    const t = e, i = this.current, s = this.head(t);
    if (!s)
      for (let r = t.firstChild; r; r = r.nextSibling) this.walk(r);
    this.tail(t, s, i);
  }
  // Returns true if children should not be traversed (already handled
  // wholesale, invisible, or explicitly skipped).
  head(e) {
    const t = e.tagName.toLowerCase();
    if (Hu.has(t) || this.suppressed.has(e) && e !== this.allowNode) return !0;
    const [i, s] = zu(e);
    if (!s && e !== this.allowNode) return !0;
    const r = ze(e);
    if ((t === "img" || t === "svg") && (r.includes("presentation") || i === null && e.hasAttribute("alt") && e.getAttribute("alt").trim() === ""))
      return !0;
    if (t === "br")
      return this.current.noText || (this.closeSegment(), this.segments.push({ kind: "break" }), this.flowEndsWithSpace = !0), !0;
    if (r.includes("pagebreak"))
      return !dd(this, e, i, r);
    if (t === "a" && r.includes("noteref") && e.getAttribute("href"))
      return fd(this, e, r), !0;
    if (t === "a" && e.getAttribute("href"))
      return gd(this, e, r, i), !0;
    if (t === "img") {
      const l = { role: r }, c = e.getAttribute("src");
      return c && (l.imgref = c), i && (l.description = i.plain), this.placeholder(e, "image", l), !0;
    }
    if (t === "audio" || t === "video") {
      const l = { role: r };
      let c = e.getAttribute("src");
      if (!c) {
        const u = e.querySelector(":scope > source[src]");
        u && (c = u.getAttribute("src"));
      }
      return t === "audio" ? c && (l.audioref = c) : c && (l.videoref = c), i && (l.description = i.plain), this.placeholder(e, t, l), !0;
    }
    if (r.includes("image") || r.includes("math")) {
      const l = { role: r };
      return i && (l.description = i.plain), this.placeholder(e, r.includes("math") ? "math" : "image", l), !0;
    }
    if (!vs(t, r))
      return !1;
    this.flushText(), this.descend(e, r);
    const o = this.current.object;
    if (r.length > 0 && (o.role = r), i)
      o.description = i.plain, r.includes("figure") && (this.current.noText = !0);
    else if (r.includes("figure")) {
      const l = this.implicitCaptionOf(e);
      if (l) {
        const c = ds(l);
        c && (o.description = c, this.current.noText = !0);
      }
    } else if (r.includes("table")) {
      const l = this.implicitCaptionOf(e);
      if (l) {
        const c = ds(l);
        c && (o.description = c, this.foldedCaptions.add(l));
      }
    }
    const a = e.getAttribute("id");
    return a && (o.id = a), !1;
  }
  // HTML-AAM implicit name: a table/figure with no explicit ARIA name folds
  // its native/ARIA caption child's text in as its own description instead
  // of speaking that child separately.
  implicitCaptionOf(e) {
    for (let t = e.firstElementChild; t; t = t.nextElementSibling)
      if (ze(t).includes("caption") && !t.getAttribute("aria-labelledby")) return t;
    return null;
  }
  tail(e, t, i) {
    if (t) return;
    const s = e.tagName.toLowerCase(), r = ze(e);
    if (vs(s, r)) {
      this.flushText();
      const o = this.leafTextEnabled && r.length === 0 && !!this.lastFlowText;
      (this.selectorPredicate?.(r) || o) && this.applyTextref(e), this.current = i;
    }
  }
  // Sets cur.textref to a reference for el: the base id-or-selector
  // reference (selectorGenerator.ts), upgraded to a domRange
  // (domRangeGenerator.ts) when domRangeEnabled and el's own flow just
  // flushed some text, with a text-fragment directive
  // (textFragmentGenerator.ts) appended on top when textFragmentEnabled and
  // el's own flow flushed text with real source-node boundaries (a flow with
  // no such boundary — e.g. purely synthesized text — has no Range to
  // generate a fragment from) — each an independent option, applied in this
  // fixed order regardless of which others are also enabled.
  applyTextref(e) {
    const t = this.current.object, i = zt(e, this.selectorRoot, this.selectorRootAnchor);
    if (t.textref = ao(i, e), this.domRangeEnabled && this.lastFlowRange) {
      const s = i ? { el: e, selector: i } : void 0, r = rd(this.lastFlowRange, this.selectorRoot, this.selectorRootAnchor, s);
      r && (t.textref = ou({ ...r, container: i }));
    }
    if (this.textFragmentEnabled && this.lastFlowRange && this.docRoot) {
      const s = this.docRoot.createRange();
      s.setStart(...this.lastFlowRange.first), s.setEnd(...this.lastFlowRange.last);
      const r = od(s);
      r && (t.textref = `${t.textref ?? "#"}${Tr(r)}`);
    }
  }
  text(e) {
    if (this.current.noText) return;
    const t = e.nodeValue ?? "";
    if (/^\s*$/.test(t)) {
      (this.textAcc.length > 0 || this.segments.length > 0) && (this.textAcc += we(t, this.flowEndsWithSpace), this.updateFlowSpace());
      return;
    }
    const i = this.textContext(e);
    if (Ko(i, this.currentCtx) || (this.closeSegment(), this.currentCtx = i), this.textAcc += we(t, this.flowEndsWithSpace), this.updateFlowSpace(), this.domRangeEnabled || this.textFragmentEnabled) {
      const s = e;
      this.flowFirstNode === null && (this.flowFirstNode = s, this.flowFirstOffset = t.search(/\S/)), this.flowLastNode = s, this.flowLastOffset = t.length - (t.match(/\s+$/)?.[0].length ?? 0);
    }
  }
  textContext(e) {
    const t = { lang: fs(e.parentElement), tag: "" };
    for (let i = e.parentElement; i && i !== this.current.el; i = i.parentElement) {
      const [s, r] = ju(i.tagName.toLowerCase());
      if (s && s !== "break") {
        t.tag = s, t.attrs = r;
        break;
      }
    }
    return t;
  }
  updateFlowSpace() {
    this.textAcc.length > 0 && (this.flowEndsWithSpace = this.textAcc.endsWith(" "));
  }
  closeSegment() {
    this.textAcc.length !== 0 && (this.segments.push({ kind: "text", text: this.textAcc, ctx: this.currentCtx }), this.textAcc = "");
  }
  resetFlow() {
    this.segments = [], this.textAcc = "", this.currentCtx = { lang: "", tag: "" }, this.flowEndsWithSpace = !0, this.pendingChildren = [], this.flowFirstNode = null, this.flowFirstOffset = 0, this.flowLastNode = null, this.flowLastOffset = 0;
  }
  placeholder(e, t, i, s) {
    if (En(i)) return;
    const r = new ut();
    if (r.el = e, r.object = i, this.current.noText) {
      this.appendChild(r);
      return;
    }
    this.closeSegment(), this.pendingChildren.push(r), this.segments.push({
      kind: "placeholder",
      tag: t,
      child: r,
      candidateID: s ?? e.getAttribute("id") ?? void 0
    }), this.flowEndsWithSpace = !1;
  }
  flushText() {
    this.closeSegment();
    let e = this.segments;
    const t = this.pendingChildren, i = this.flowFirstNode, s = this.flowFirstOffset, r = this.flowLastNode, o = this.flowLastOffset;
    if (this.resetFlow(), this.lastFlowRange = null, this.lastFlowText = null, e.length === 0) return;
    for (; e.length > 0; ) {
      const S = e[0];
      if (S.kind === "break") {
        e = e.slice(1);
        continue;
      }
      if (S.kind === "text") {
        const y = S.text.replace(/^\s+/, "");
        if (y === "") {
          e = e.slice(1);
          continue;
        }
        e = [{ ...S, text: y }, ...e.slice(1)];
      }
      break;
    }
    for (; e.length > 0; ) {
      const S = e[e.length - 1];
      if (S.kind === "break") {
        e = e.slice(0, -1);
        continue;
      }
      if (S.kind === "text") {
        const y = S.text.replace(/\s+$/, "");
        if (y === "") {
          e = e.slice(0, -1);
          continue;
        }
        e = [...e.slice(0, -1), { ...S, text: y }];
      }
      break;
    }
    if (!e.some((S) => S.kind === "text" && S.text.trim() !== "")) {
      for (const S of t) this.appendChild(S);
      return;
    }
    const l = [];
    for (const S of e)
      if (S.kind === "text" && S.text.trim() !== "") {
        const y = S.ctx.lang;
        l.includes(y) || l.push(y);
      }
    let c = fs(this.current.el ?? null);
    l.length === 1 && l[0] !== "" && (c = l[0]);
    let u = !1;
    for (const S of e)
      if (S.kind !== "text" || S.ctx.tag !== "" || S.ctx.lang !== c) {
        u = !0;
        break;
      }
    if (u && c === "" && (c = "en"), u)
      for (const S of e) {
        if (S.kind !== "placeholder") continue;
        let y = S.candidateID;
        (!y || !this.idAlloc.claim(y)) && (y = this.idAlloc.allocate(S.tag, (v) => this.ids.has(v))), S.child.object.id = y;
      }
    let h = "", d = !1, f = !1, g = !1, p = !1;
    for (const S of e)
      if (S.kind === "text") {
        const y = S.text.startsWith(" "), v = S.text.replace(/^ +| +$/g, "");
        if (v === "") {
          p = !0;
          continue;
        }
        let C = !1;
        if (h.length > 0) {
          const R = d || p || y;
          f ? C = !0 : g ? C = R && !Ee(v) : C = R;
        }
        C && (h += " "), h += v, d = S.text.endsWith(" "), f = !1, g = !1, p = !1;
      } else S.kind === "break" ? f = !0 : S.kind === "placeholder" && (g = !0);
    const m = e.some((S) => S.kind === "placeholder");
    this.lastFlowText = h.trim();
    const b = {
      plain: u && !m ? "" : h.trim(),
      ssml: "",
      language: c
    };
    if (u) {
      let S = "";
      for (const y of e)
        if (y.kind === "text") {
          let v = y.ctx.tag, C = y.ctx.attrs;
          if (y.ctx.lang !== c && y.ctx.lang !== "" && (v = "lang", C = void 0), v) {
            S += `<${v}`;
            for (const [R, A] of Object.entries(C ?? {}))
              S += ` ${R}="${jt(A)}"`;
            y.ctx.lang !== c && y.ctx.lang !== "" && (S += ` xml:lang="${jt(y.ctx.lang)}"`), S += `>${X(y.text)}</${v}>`;
          } else
            S += X(y.text);
        } else y.kind === "break" ? S += "<break/>" : y.kind === "placeholder" && (S += `<readium:${y.tag} id="${jt(y.child.object.id)}" />`);
      b.ssml = S;
    }
    const w = new ut();
    w.object = { text: b };
    for (const S of t)
      w.children.push(S);
    this.appendChild(w), i && r && (this.lastFlowRange = { first: [i, s], last: [r, o] });
  }
}
const yd = /<body[\s>]/i;
function bd(n, e, t) {
  const { predicate: i, leafText: s, domRange: r, textFragment: o } = ld(t?.textrefs);
  if (typeof n != "string") {
    const h = e ?? (n.ownerDocument.contentType === "text/html" ? "text/html" : "application/xhtml+xml"), d = new Tt(h === "application/xhtml+xml");
    return d.selectorPredicate = i, d.leafTextEnabled = s, d.domRangeEnabled = r, d.textFragmentEnabled = o, d.docRoot = n.ownerDocument, d.selectorRoot = n, d.selectorRootAnchor = nd(n), d.convert(n), d.result();
  }
  const a = e ?? Xu(n), l = new DOMParser().parseFromString(n, a), c = new Tt(a === "application/xhtml+xml");
  c.selectorPredicate = i, c.leafTextEnabled = s, c.textFragmentEnabled = o, c.docRoot = l;
  const u = l.querySelector("body");
  return u && !yd.test(n) ? c.convertChildren(u) : c.convert(u ?? l.documentElement), c.result();
}
function Pd(n, e, t) {
  return { guided: bd(n, e, t) };
}
export {
  jl as BUILTIN_DECORATION_TYPES,
  tc as BooleanPreference,
  Jl as DecorationController,
  _l as DecorationLayout,
  E as DecorationStyleType,
  Ml as DecorationWidth,
  Vl as Decorator,
  ql as DirectCommsChannel,
  Gl as DirectCommsFrame,
  Xl as DirectCommsHost,
  Fe as EnumPreference,
  Ed as FallbackEngineProvider,
  Fa as FallbackSpeechEngine,
  ar as Locator,
  pe as LocatorLocations,
  rr as LocatorText,
  $t as Preference,
  ot as RangePreference,
  Zl as ReadiumSpeechDecorationController,
  Id as ReadiumSpeechNavigator,
  Nd as ReadiumSpeechProviderRegistry,
  ec as SpeechDefaults,
  We as SpeechPreferences,
  Di as SpeechPreferencesEditor,
  $s as SpeechServerAudioDecodeError,
  Oa as SpeechServerEngine,
  xd as SpeechServerEngineProvider,
  je as SpeechServerError,
  Ms as SpeechServerNetworkError,
  Ls as SpeechServerStallError,
  Fi as SpeechSettings,
  Ti as StringArrayPreference,
  si as WebSpeechEngine,
  wd as WebSpeechEngineProvider,
  N as WebSpeechVoiceManager,
  Wc as blockLevelRoles,
  Ve as chineseVariantMap,
  fa as chunkPlainText,
  pa as chunkSsmlText,
  rc as contextualizationShapesAtVerbosity,
  sc as contextualizedAtVerbosity,
  Ql as createLocator,
  ru as decodeCssSelectorFragment,
  au as decodeDomRangeFragment,
  Qi as decodeTextref,
  Kl as decorationsEqual,
  Cr as defaultContextualizations,
  su as encodeCssSelectorFragment,
  ou as encodeDomRangeFragment,
  Fd as extractUtterances,
  Na as isRecoverableFailure,
  Pd as makeGnd,
  Ps as mapServerVoice,
  Sa as mimeTypeForFormat,
  bd as parseMarkup,
  ac as resolveBoundaryLocate,
  Ai as resolveDecorationForWire,
  lc as resolveUtteranceLocate,
  Ea as selectBitrate,
  va as selectFormat,
  Od as setupDecorations,
  Td as shapeableRoles,
  Dd as skippableRoles,
  ic as skippedAtVerbosity,
  Hl as supportsDecorationStyle,
  _e as toSpeechServerError
};
