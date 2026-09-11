const U = (t) => {
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
}, ne = {
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
}, sn = /* @__PURE__ */ new Map(), Ua = /* @__PURE__ */ Object.assign({ "../../json/ar.json": () => import("./ar-CJhBAgKq.js"), "../../json/bg.json": () => import("./bg-JvP4LoOT.js"), "../../json/bho.json": () => import("./bho-CpuLBMN3.js"), "../../json/bn.json": () => import("./bn-84u93pMd.js"), "../../json/ca.json": () => import("./ca-DdScTbex.js"), "../../json/cmn.json": () => import("./cmn-Dd1zrvTE.js"), "../../json/cs.json": () => import("./cs-CDMne0uc.js"), "../../json/da.json": () => import("./da-oFf4cHgj.js"), "../../json/de.json": () => import("./de-Bjgc3bVq.js"), "../../json/el.json": () => import("./el-FkKIcghI.js"), "../../json/en.json": () => import("./en-BELFJRDQ.js"), "../../json/es.json": () => import("./es-nAmbEkcR.js"), "../../json/eu.json": () => import("./eu-DxWirHU-.js"), "../../json/fa.json": () => import("./fa-CTVUniYi.js"), "../../json/fi.json": () => import("./fi-Do6QFzRv.js"), "../../json/fr.json": () => import("./fr-B5-P9o29.js"), "../../json/gl.json": () => import("./gl-DqSXeC_F.js"), "../../json/he.json": () => import("./he-CpyNwgaH.js"), "../../json/hi.json": () => import("./hi-CeOBacbl.js"), "../../json/hr.json": () => import("./hr-CSpU18l6.js"), "../../json/hu.json": () => import("./hu-oONHmpR6.js"), "../../json/id.json": () => import("./id-BpZuB5Iw.js"), "../../json/it.json": () => import("./it-CM4X84UA.js"), "../../json/ja.json": () => import("./ja-e-iw3c4_.js"), "../../json/kk.json": () => import("./kk-BdLCAb2s.js"), "../../json/kn.json": () => import("./kn-BYRvouO5.js"), "../../json/ko.json": () => import("./ko-EIouMDK1.js"), "../../json/mr.json": () => import("./mr-DN-hwEV1.js"), "../../json/ms.json": () => import("./ms-B5E3oaWE.js"), "../../json/nb.json": () => import("./nb-DOw05HBh.js"), "../../json/nl.json": () => import("./nl-CEydw4A9.js"), "../../json/pl.json": () => import("./pl-Ivj_eAP7.js"), "../../json/pt.json": () => import("./pt-BPEGqRmW.js"), "../../json/ro.json": () => import("./ro-BQ617SOx.js"), "../../json/ru.json": () => import("./ru-Dieeph4H.js"), "../../json/sk.json": () => import("./sk-pEiOt4GQ.js"), "../../json/sl.json": () => import("./sl-Z6jWAR8J.js"), "../../json/sv.json": () => import("./sv-BT09piiZ.js"), "../../json/ta.json": () => import("./ta-B0YMGW5q.js"), "../../json/te.json": () => import("./te-ax-HNsAY.js"), "../../json/th.json": () => import("./th-C7Dbxwoz.js"), "../../json/tr.json": () => import("./tr-mipEichO.js"), "../../json/uk.json": () => import("./uk-CHdx7DHz.js"), "../../json/vi.json": () => import("./vi-DrlcEwAD.js"), "../../json/wuu.json": () => import("./wuu-C6uQvT6g.js"), "../../json/yue.json": () => import("./yue-CFroa59o.js") });
async function qa(t) {
  try {
    const e = t.split("-")[0], n = Ua[`../../json/${e}.json`];
    if (!n)
      throw new Error(`No voice data found for language: ${t}`);
    const i = (await n()).default;
    return {
      ...i,
      voices: i.voices.map(Va)
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
function Er(t) {
  return sn.has(t) || sn.set(t, qa(t)), sn.get(t);
}
const za = ["veryLow", "low", "normal", "high", "veryHigh"], ja = ["android", "apple"], Va = (t) => ({
  ...t,
  quality: t.quality?.filter((e) => za.includes(e)),
  localizedName: t.localizedName && ja.includes(t.localizedName) ? t.localizedName : void 0
}), et = {
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
}, J = (t) => {
  if (!t) return "";
  let e = t.toLowerCase().replace(/_/g, "-");
  if (/\w{2,3}-\w{2,3}/.test(e)) {
    const [n, r] = e.split("-");
    e = `${n.toLowerCase()}-${r.toUpperCase()}`;
  }
  return et[e] || e;
}, On = async (t) => {
  if (!t) return [];
  try {
    const e = J(t);
    try {
      const r = await Er(e);
      if (r?.voices?.length)
        return r.voices;
    } catch (r) {
      console.warn(`Failed to load voices for ${e}:`, r);
    }
    const [n] = U(e);
    if (n !== e)
      try {
        const r = await Er(n);
        if (r?.voices?.length)
          return r.voices;
      } catch (r) {
        console.warn(`Failed to load voices for base language ${n}:`, r);
      }
    return [];
  } catch (e) {
    return console.error(`Error in getVoices for ${t}:`, e), [];
  }
}, An = (t, e) => {
  try {
    return new Intl.DisplayNames(
      e ? [e] : [],
      { type: "language", languageDisplay: "standard" }
    ).of(t) || t.toUpperCase();
  } catch {
    return t.toUpperCase();
  }
}, Cr = (t) => {
  if (!t) return "";
  try {
    const e = J(t), n = ne[e];
    if (n?.testUtterance)
      return n.testUtterance;
    if (e in et) {
      const i = et[e];
      if (i && ne[i]?.testUtterance)
        return ne[i].testUtterance;
    }
    const [r] = U(e);
    return r !== e && ne[r]?.testUtterance ? ne[r].testUtterance : "";
  } catch (e) {
    return console.error(`Error in getTestUtterance for ${t}:`, e), "";
  }
}, Ht = (t) => {
  if (!t) return "";
  try {
    const e = J(t), n = ne[e];
    if (n?.defaultRegion)
      return `${e}-${n.defaultRegion}`;
    if (e in et) {
      const i = et[e];
      if (i) {
        const s = ne[i];
        if (s?.defaultRegion)
          return `${i}-${s.defaultRegion}`;
      }
    }
    const [r] = U(e);
    if (r !== e) {
      const i = ne[r];
      if (i?.defaultRegion)
        return `${r}-${i.defaultRegion}`;
    }
    return "";
  } catch (e) {
    return console.error(`Failed to get default region for ${t}:`, e), "";
  }
}, Wt = (t) => {
  if (!t?.length) return [];
  const e = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  for (const [i, s] of t.entries()) {
    if (!s) continue;
    const o = J(s), [a, c] = U(o);
    c && (e.add(c), r.has(c) || r.set(c, i)), n.has(a) || n.set(a, /* @__PURE__ */ new Set()), c && n.get(a).add(c);
  }
  return Array.from(n.entries()).map(([i, s]) => {
    const o = new Set(
      ne[i]?.availableRegions || []
    ), a = Array.from(s), c = Array.from(e).filter(
      (u) => o.has(u) && !a.includes(u)
    ), l = Array.from(/* @__PURE__ */ new Set([...a, ...c])).sort((u, h) => {
      const d = r.get(u) ?? Number.MAX_SAFE_INTEGER, g = r.get(h) ?? Number.MAX_SAFE_INTEGER;
      return d - g;
    });
    if (l.length === 0) {
      const u = Ht(i), [, h] = U(u);
      h && l.push(h);
    }
    return {
      baseLang: i,
      regions: l
    };
  });
}, Fe = async (t) => {
  const e = /* @__PURE__ */ new Map();
  for (const r of t) {
    if (r.source !== "json") continue;
    const [i] = U(r.language);
    e.has(i) || e.set(i, []), e.get(i).push(r);
  }
  const n = /* @__PURE__ */ new Map();
  for (const [r, i] of e.entries()) {
    const s = /* @__PURE__ */ new Map(), o = await On(r), a = /* @__PURE__ */ new Map();
    o.forEach((c, l) => {
      a.set(c.name.toLowerCase(), l), c.altNames?.forEach((u) => {
        a.set(u.toLowerCase(), l);
      });
    });
    for (const c of i) {
      const l = c.name.toLowerCase(), u = a.get(l);
      u !== void 0 && s.set(c.name, u);
    }
    s.size > 0 && n.set(r, s);
  }
  return n;
}, Ma = {
  veryLow: 1,
  low: 2,
  normal: 3,
  high: 4,
  veryHigh: 5
}, Rt = (t) => t ? Ma[t] ?? 0 : 0, ge = (t, e, n, r) => {
  const i = Rt(t.quality), s = Rt(e.quality);
  if (n && r && t.source === "json" && e.source === "json") {
    const o = n.get(r);
    if (o) {
      const a = o.get(t.name), c = o.get(e.name);
      if (a !== void 0 && c !== void 0)
        return a - c;
    }
  }
  return s !== i ? s - i : t.name.localeCompare(e.name);
}, Gt = (t, e) => {
  const n = new Map(e.map((s) => [s.baseLang, s])), r = /* @__PURE__ */ new Map(), i = [];
  for (const s of t) {
    const [o] = U(s.language);
    n.get(o) ? (r.has(o) || r.set(o, []), r.get(o).push(s)) : i.push(s);
  }
  return { voicesByLang: r, otherLangVoices: i };
}, Xi = (t, e, n, r) => {
  const [, i] = U(t.language), [, s] = U(e.language), o = i && n.regions.includes(i), a = s && n.regions.includes(s);
  if (o && a) {
    const d = n.regions.indexOf(i), g = n.regions.indexOf(s);
    return d === g ? ge(t, e, r, n.baseLang) : d - g;
  }
  if (o) return -1;
  if (a) return 1;
  const c = Ht(n.baseLang), [, l] = U(c), u = !!l && i === l, h = !!l && s === l;
  if (u && !h) return -1;
  if (!u && h) return 1;
  if (i && s) {
    const d = i.localeCompare(s);
    return d !== 0 ? d : ge(t, e, r, n.baseLang);
  }
  return i ? -1 : s ? 1 : ge(t, e, r, n.baseLang);
}, Ha = async (t, e, n) => {
  const r = n ?? await Fe(t);
  t.sort((i, s) => Xi(i, s, e, r));
}, Yi = (t, e, n) => {
  const [r] = U(t.language), [i] = U(e.language), s = An(r).toLowerCase(), o = An(i).toLowerCase(), a = s.localeCompare(o);
  if (a !== 0)
    return a;
  if (r === i) {
    const c = Ht(r), [, l] = U(t.language), [, u] = U(e.language), h = c && l === c.split("-")[1], d = c && u === c.split("-")[1];
    if (h && !d) return -1;
    if (!h && d) return 1;
    if (l && u) {
      const g = l.localeCompare(u);
      if (g !== 0)
        return g;
    }
    return l && !u ? -1 : !l && u ? 1 : ge(t, e, n, r);
  }
  return ge(t, e, n, r);
}, Tn = async (t, e) => {
  const n = e ?? await Fe(t);
  t.sort((r, i) => Yi(r, i, n));
}, Wa = async (t, e) => {
  if (!e?.length) return [];
  const n = Wt(t || []), { voicesByLang: r, otherLangVoices: i } = Gt(e, n), s = await Fe(e), o = [];
  for (const a of n) {
    const c = r.get(a.baseLang);
    c && (await Ha(c, a, s), o.push(...c));
  }
  return await Tn(i, s), o.push(...i), o;
}, Ga = async (t, e) => {
  if (!e.length) return null;
  const [n] = Wt([t]), { voicesByLang: r, otherLangVoices: i } = Gt(e, [n]), s = r.get(n.baseLang), o = s?.length ? s : i, a = await Fe(e), c = s?.length ? (l, u) => Xi(l, u, n, a) : (l, u) => Yi(l, u, a);
  return o.reduce((l, u) => c(u, l) < 0 ? u : l);
}, Ka = [{ name: "Albert", nativeID: ["com.apple.speech.synthesis.voice.Albert"], note: "This novelty voice is part of a pack preloaded by Apple.", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Bad News", nativeID: ["com.apple.speech.synthesis.voice.BadNews"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Mauvaises nouvelles", "Malas noticias", "Brutte notizie"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Bahh", nativeID: ["com.apple.speech.synthesis.voice.Bahh"], note: "This novelty voice is part of a pack preloaded by Apple.", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Bells", nativeID: ["com.apple.speech.synthesis.voice.Bells"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Cloches", "Campanas", "Campane"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Boing", nativeID: ["com.apple.speech.synthesis.voice.Boing"], note: "This novelty voice is part of a pack preloaded by Apple.", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Bubbles", nativeID: ["com.apple.speech.synthesis.voice.Bubbles"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Bulles", "Burbujas", "Bollicine"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Cellos", nativeID: ["com.apple.speech.synthesis.voice.Cellos"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Violoncelles", "Violonchelos", "Violoncelli"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Good News", nativeID: ["com.apple.speech.synthesis.voice.GoodNews"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Bonnes nouvelles", "Buenas noticias", "Buone notizie"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Jester", nativeID: ["com.apple.speech.synthesis.voice.Hysterical"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Bouffon", "Bufón", "Giullare"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Organ", nativeID: ["com.apple.speech.synthesis.voice.Organ"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Orgue", "Órgano", "Organo"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Superstar", nativeID: ["com.apple.speech.synthesis.voice.Princess"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Superestrella"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Trinoids", nativeID: ["com.apple.speech.synthesis.voice.Trinoids"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Trinoïdes"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Whisper", nativeID: ["com.apple.speech.synthesis.voice.Whisper"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Murmure", "Susurro", "Sussurro"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Wobble", nativeID: ["com.apple.speech.synthesis.voice.Deranged"], note: "This novelty voice is part of a pack preloaded by Apple.", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Zarvox", nativeID: ["com.apple.speech.synthesis.voice.Zarvox"], note: "This novelty voice is part of a pack preloaded by Apple.", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }], Ja = {
  voices: Ka
}, Xa = [{ name: "Eddy", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Flo", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Grandma", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Grandpa", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Jacques", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Reed", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Rocko", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Sandy", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Shelley", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Fred", language: "en-US", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Junior", language: "en-US", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Kathy", language: "en-US", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Ralph", language: "en-US", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "eSpeak Arabic", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ar", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Bulgarian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "bg", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Bengali", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "bn", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Catalan", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ca", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Chinese (Mandarin, latin as English)", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "cmn", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Czech", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "cs", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Danish", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "da", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak German", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "de", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Greek", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "el", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Spanish (Spain)", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "es", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Estonian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "et", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Finnish", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "fi", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Gujarati", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "gu", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Croatian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "hr", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Hungarian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "hu", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Indonesian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "id", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Italian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "it", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Kannada", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "kn", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Korean", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ko", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Lithuanian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "lt", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Latvian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "lv", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Malayalm", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ml", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Marathi", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "mr", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Malay", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ms", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Norwegian Bokmål", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "nb", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Polish", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "pl", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Portuguese (Brazil)", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "pt-br", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Romanian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ro", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Russian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ru", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Slovak", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "sk", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Slovenian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "sl", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Serbian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "sv", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Swedish", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "sv", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Swahili", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "sw", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Tamil", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ta", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Telugu", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "te", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Turkish", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "tr", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Vietnamese (Northern)", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "vi", os: ["ChromeOS"], preloaded: !0 }], Ya = {
  voices: Xa
}, Qa = Ja, Za = Ya, Rn = (t, e) => Qa.voices.some(
  (n) => t.includes(n.name) || e && n.nativeID?.some((r) => e.includes(r)) || n.altNames?.some((r) => t.includes(r))
), Nn = (t, e) => Za.voices.some(
  (n) => t.includes(n.name)
) || e === "veryLow", kr = (t) => t?.length ? t.filter((e) => !(e.isNovelty || Rn(e.name, e.voiceURI))) : [], Or = (t) => t?.length ? t.filter((e) => !Nn(e.name, e.quality)) : [], eo = { ar: { normal: "محسن", high: "استثنائي" }, ca: { normal: "millorada", high: "prèmium" }, "cmn-CN": { normal: "优化音质", high: "高音质" }, "cmn-TW": { normal: "增強音質", high: "高音質" }, cs: { normal: "vylepšená verze", high: "prémiový" }, da: { normal: "forbedret", high: "høj kvalitet" }, de: { normal: "erweitert", high: "premium" }, el: { normal: "βελτιωμένη", high: "υψηλής ποιότητας" }, en: { normal: "Enhanced", high: "Premium" }, es: { normal: "mejorada", high: "premium" }, fi: { normal: "parannettu", high: "korkealaatuinen" }, fr: { normal: "premium", high: "de qualité" }, he: { normal: "משופר", high: "פרימיום" }, hi: { normal: "बेहतर", high: "प्रीमियम" }, hr: { normal: "poboljšani", high: "vrhunski" }, hu: { normal: "továbbfejlesztett", high: "prémium" }, id: { normal: "Ditingkatkan", high: "Premium" }, it: { normal: "ottimizzata", high: "premium" }, ja: { normal: "拡張", high: "プレミアム" }, ko: { normal: "고품질", high: "프리미엄" }, ms: { normal: "Dipertingkat", high: "Premium" }, nb: { normal: "forbedret", high: "premium" }, nl: { normal: "verbeterd", high: "premium" }, pl: { normal: "rozszerzony", high: "premium" }, pt: { normal: "melhorada", high: "premium" }, ro: { normal: "îmbunătățită", high: "premium" }, ru: { normal: "улучшенный", high: "высшее качество" }, sk: { normal: "vylepšený", high: "prémiový" }, sl: { normal: "izboljšano", high: "prvovrsten" }, sv: { normal: "förbättrad", high: "premium" }, th: { normal: "คุณภาพสูง", high: "คุณภาพสูง" }, tr: { normal: "Geliştirilmiş", high: "Yüksek Kaliteli" }, uk: { normal: "вдосконалений", high: "високої якості" }, vi: { normal: "Nâng cao", high: "Cao cấp" } }, to = {
  quality: eo
}, Dn = {
  apple: to.quality
  // android: androidQualities.quality
}, no = (t, e, n) => {
  if (!t) return;
  const r = Array.isArray(n) ? n : n ? [n] : [];
  for (const i of r)
    if (i && Dn[i]) {
      const s = Dn[i], o = U(e)[0], a = s[e] || s[o];
      if (a) {
        const c = t.toLowerCase(), { normal: l, high: u } = a;
        if (u && c.includes(u.toLowerCase()))
          return "high";
        if (l && c.includes(l.toLowerCase()))
          return "normal";
      }
    }
}, ro = (t, e) => {
  const n = Dn[e];
  if (n)
    for (const [r, { high: i, normal: s }] of Object.entries(n)) {
      const o = i && t.some((c) => c.includes(i)), a = s && t.some((c) => c.includes(s));
      if (o && a)
        return r;
    }
}, io = {
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
}, Ar = (t) => {
  if (!t) return;
  const n = t.toLowerCase().split(/[._-]/);
  for (const r of Object.values(io))
    if (r.values.some((i) => n.includes(i)))
      return r.quality;
};
function so(t, e) {
  if (t.name === t.originalName) return t;
  if (e.name === e.originalName) return e;
  const n = [t.originalName, ...t.altNames || []], r = [e.originalName, ...e.altNames || []], i = n.findIndex((o) => r.includes(o)), s = r.findIndex((o) => n.includes(o));
  return i === -1 && s === -1 || i !== -1 && (s === -1 || i <= s) ? t : e;
}
function ao(t, e) {
  if (!t.altNames && !e.altNames)
    return !1;
  const n = t.originalName, r = e.originalName, i = t.altNames || [], s = e.altNames || [];
  return s.includes(n) || i.includes(r) ? !0 : i.filter((a) => s.includes(a)).length > 0;
}
class L {
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
    if (L.instance?.isInitialized) {
      const n = L.instance;
      return e?.languages && e.languages.length > 0 && await n.broadenLanguages(e.languages), n;
    }
    return L.initializationPromise || (L.initializationPromise = (async () => {
      try {
        const n = new L();
        L.instance = n, n.browserVoices = await n.getBrowserVoices(e?.maxTimeout, e?.interval), n.updateSystemLocale(n.browserVoices);
        let r = n.browserVoices;
        return e?.languages && e.languages.length > 0 ? (r = n.filterBrowserVoicesByLanguages(n.browserVoices, e.languages), n.scopedLanguages = L.toBaseLangSet(e.languages)) : n.scopedLanguages = null, n.voices = await n.parseToReadiumSpeechVoices(r), n.isInitialized = !0, n;
      } catch (n) {
        throw L.initializationPromise = null, console.error("Failed to initialize WebSpeechVoiceManager:", n), n;
      }
    })()), L.initializationPromise;
  }
  /**
   * Filter browser voices based on preferred languages
   * @private
   */
  filterBrowserVoicesByLanguages(e, n) {
    if (!n?.length) return e;
    const r = L.toBaseLangSet(n);
    return e.filter((i) => {
      if (!i?.lang) return !1;
      const s = J(i.lang), [o] = L.extractLangRegionFromBCP47(s);
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
        const r = J(n), [i] = L.extractLangRegionFromBCP47(r);
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
    const r = [...L.toBaseLangSet(e)].filter((a) => !this.scopedLanguages.has(a));
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
    return U(e);
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
    const n = e.map((i) => i.name), r = ro(n, "apple");
    r && (this.systemLocale = r);
  }
  /**
   * Infer voice quality based on package, platform, JSON, or duplicate count
   * Returns null if quality cannot be determined
   * @private
   */
  inferVoiceQuality(e, n, r) {
    const i = e.voiceURI ? Ar(e.voiceURI) : void 0;
    if (i) return i;
    if (n?.nativeID && Array.isArray(n.nativeID))
      for (const s of n.nativeID) {
        const o = Ar(s);
        if (o) return o;
      }
    if (n?.localizedName && e.voiceURI && e.lang) {
      const s = no(
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
      else if (ao(r, s)) {
        const o = so(r, s);
        n.set(i, o);
      } else {
        const o = Rt(s.quality);
        Rt(r.quality) >= o && n.set(i, r);
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
    const n = Cr(e);
    if (n) return n;
    const [r] = L.extractLangRegionFromBCP47(e);
    if (r && r !== e) {
      const i = Cr(r);
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
      const u = J(c.language).split("-")[0];
      if (!a.has(u)) {
        const h = An(u, e), d = s.filter(
          (g) => J(g.language).split("-")[0] === u
        ).length;
        o.push({ code: u, label: h, count: d }), a.add(u);
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
      const [, u] = L.extractLangRegionFromBCP47(l.language);
      u && c.set(u, (c.get(u) || 0) + 1);
    }
    for (const l of s) {
      const [, u] = L.extractLangRegionFromBCP47(l.language);
      if (u && !a.has(u)) {
        let h = l.language;
        try {
          const d = e || navigator.language;
          h = new Intl.DisplayNames([d], { type: "region" }).of(u) || l.language;
        } catch (d) {
          console.warn(`Failed to get display name for region ${u}`, d);
        }
        o.push({
          code: u,
          label: h,
          count: c.get(u) || 0
        }), a.add(u);
      }
    }
    return r ? o : o.sort((l, u) => l.label.localeCompare(u.label));
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
        const u = () => {
          if (a < 1) return s([]);
          --a;
          const h = r();
          if (Array.isArray(h) && h.length) return s(h);
          setTimeout(u, n);
        };
        setTimeout(u, n);
      };
      window.speechSynthesis.onvoiceschanged !== void 0 ? window.speechSynthesis.onvoiceschanged = () => {
        const u = r();
        Array.isArray(u) && u.length ? s(u) : l();
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
        const s = J(i.lang), [o] = L.extractLangRegionFromBCP47(s), a = this.normalizeVoiceName(i.name), c = `${i.lang.toLowerCase()}_${a}`, l = n.get(c) || 1;
        let u = await On(s);
        (!u || u.length === 0) && (u = await On(o));
        const h = this.findMatchingJsonVoice(u, a), d = this.inferVoiceQuality(i, h, l);
        return h ? {
          ...h,
          label: h.label ?? this.cleanVoiceName(i.name),
          source: "json",
          originalName: i.name,
          language: h.language ?? s,
          voiceURI: i.voiceURI,
          quality: d,
          isDefault: i.default || !1,
          offlineAvailability: i.localService || !1,
          isNovelty: Rn(i.name, i.voiceURI),
          isLowQuality: Nn(i.name, d)
        } : {
          source: "browser",
          label: this.cleanVoiceName(i.name),
          name: i.name,
          originalName: i.name,
          language: s,
          voiceURI: i.voiceURI,
          quality: d,
          isDefault: i.default || !1,
          offlineAvailability: i.localService || !1,
          isNovelty: Rn(i.name, i.voiceURI),
          isLowQuality: Nn(i.name, d)
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
        const c = a.toLowerCase(), l = o.language?.toLowerCase(), u = o.altLanguage?.toLowerCase();
        if (l === c || u === c)
          return !0;
        const [h] = c.split("-");
        return l && l.startsWith(h) || u && u.startsWith(h);
      }));
    }
    if (i.source && (r = r.filter((s) => s.source === i.source)), i.gender && (r = r.filter((s) => s.gender === i.gender)), i.quality) {
      const s = Array.isArray(i.quality) ? i.quality : [i.quality];
      r = r.filter((o) => o.quality && s.includes(o.quality));
    }
    return i.offlineOnly && (r = r.filter((s) => s.offlineAvailability === !0)), i.provider && (r = r.filter(
      (s) => s.provider?.toLowerCase() === i.provider?.toLowerCase()
    )), i.excludeNovelty && (r = kr(r)), i.excludeVeryLowQuality && (r = Or(r)), i.removeDuplicates && (r = this.removeDuplicates(r)), r;
  }
  /**
   * Filter out novelty voices
   * @param voices Array of voices to filter
   * @returns Filtered array with novelty voices removed
   */
  filterOutNoveltyVoices(e) {
    const n = e ?? this.voices;
    return kr(n);
  }
  /**
   * Filter out very low quality voices
   * @param voices Array of voices to filter
   * @returns Filtered array with very low quality voices removed
   */
  filterOutVeryLowQualityVoices(e) {
    const n = e ?? this.voices;
    return Or(n);
  }
  /**
   * Sort voices by quality, respecting JSON name order, then alphabetically for undefined/null quality
   * @param voices Array of voices to sort
   * @returns Sorted array of voices
   */
  async sortVoicesByQuality(e) {
    const n = e || this.voices;
    if (!n?.length) return [];
    const r = await Fe(n);
    return [...n].sort((i, s) => ge(i, s, r));
  }
  /**
   * Sort regions by default then alphabetically, sort voices by quality
   */
  static async sortByDefaultRegion(e, n) {
    const r = await Fe(e), i = Ht(n);
    e.sort((s, o) => {
      const [, a] = L.extractLangRegionFromBCP47(s.language), [, c] = L.extractLangRegionFromBCP47(o.language), l = i && a === i.split("-")[1], u = i && c === i.split("-")[1];
      return l && !u ? -1 : !l && u ? 1 : ge(s, o, r, n);
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
      return await Tn(c), c;
    }
    const i = Wt(e), { voicesByLang: s, otherLangVoices: o } = Gt(r, i), a = [];
    for (const c of i) {
      const l = s.get(c.baseLang);
      l && (await L.sortByDefaultRegion(l, c.baseLang), a.push(...l));
    }
    return await Tn(o), a.push(...o), a;
  }
  /**
   * Sort voices by region preference, then alphabetically
   * @param voices Array of voices to sort
   * @param preferredLanguages Array of preferred language codes in order of preference
   * @returns Sorted array of voices
   */
  async sortVoicesByRegions(e, n) {
    return Wa(e, n || this.voices);
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
          o = L.extractLangRegionFromBCP47(s.language)[0];
          break;
        case "gender":
          o = s.gender || "unknown";
          break;
        case "quality":
          o = s.quality || "unknown";
          break;
        case "region":
          const [, a] = L.extractLangRegionFromBCP47(s.language);
          o = a || "unknown";
          break;
      }
      r[o] || (r[o] = []), r[o].push(s);
    }
    return r;
  }
}
const oo = ["webKit", "moz", "ms", "o"], lo = [
  "boundary",
  "end",
  "error",
  "mark",
  "pause",
  "resume",
  "start"
], co = (t) => `${t.charAt(0).toUpperCase()}${t.slice(1)}`, ze = (t = {}, e) => Object.hasOwnProperty.call(t, e) || e in t || !!t[e], uo = (t) => typeof window < "u" && t in window, ho = (t) => {
  const e = co(t), n = oo.map((i) => `${i}${e}`), r = [t, e].concat(n).find(uo);
  return r && typeof window < "u" ? window[r] : void 0;
}, fo = () => {
  const t = {};
  [
    "speechSynthesis",
    "speechSynthesisUtterance",
    "speechSynthesisVoice",
    "speechSynthesisEvent",
    "speechSynthesisErrorEvent"
  ].forEach((n) => {
    t[n] = ho(n);
  }), t.onvoiceschanged = ze(t.speechSynthesis, "onvoiceschanged"), t.speechSynthesisSpeaking = ze(t.speechSynthesis, "speaking"), t.speechSynthesisPaused = ze(t.speechSynthesis, "paused");
  const e = t.speechSynthesisUtterance ? ze(t.speechSynthesisUtterance, "prototype") : !1;
  return lo.forEach((n) => {
    const r = `on${n}`;
    t[r] = e && t.speechSynthesisUtterance ? ze(t.speechSynthesisUtterance.prototype, r) : !1;
  }), t;
}, go = () => {
  const e = typeof window < "u" && (window.navigator || {}).userAgent || "", n = () => /android/i.test(e), r = () => /kaios/i.test(e), i = () => typeof window.InstallTrigger < "u" ? !0 : /firefox/i.test(e), s = () => typeof window.GestureEvent < "u" || /safari/i.test(e);
  return {
    isAndroid: n(),
    isFirefox: i() || r(),
    isSafari: s(),
    isKaiOS: r()
  };
};
let Kt = class {
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
};
const Ct = (t, e) => Math.min(Math.max(t, 0), Math.max(e - 1, 0));
function pe(t, e, n, r) {
  return Number.isFinite(t) ? Math.max(e, Math.min(n, t)) : r;
}
function po(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var an, Tr;
function mo() {
  if (Tr) return an;
  Tr = 1, an = e;
  function t(r) {
    return r instanceof Buffer ? Buffer.from(r) : new r.constructor(r.buffer.slice(), r.byteOffset, r.length);
  }
  function e(r) {
    if (r = r || {}, r.circles) return n(r);
    const i = /* @__PURE__ */ new Map();
    if (i.set(Date, (l) => new Date(l)), i.set(Map, (l, u) => new Map(o(Array.from(l), u))), i.set(Set, (l, u) => new Set(o(Array.from(l), u))), r.constructorHandlers)
      for (const l of r.constructorHandlers)
        i.set(l[0], l[1]);
    let s = null;
    return r.proto ? c : a;
    function o(l, u) {
      const h = Object.keys(l), d = new Array(h.length);
      for (let g = 0; g < h.length; g++) {
        const p = h[g], m = l[p];
        typeof m != "object" || m === null ? d[p] = m : m.constructor !== Object && (s = i.get(m.constructor)) ? d[p] = s(m, u) : ArrayBuffer.isView(m) ? d[p] = t(m) : d[p] = u(m);
      }
      return d;
    }
    function a(l) {
      if (typeof l != "object" || l === null) return l;
      if (Array.isArray(l)) return o(l, a);
      if (l.constructor !== Object && (s = i.get(l.constructor)))
        return s(l, a);
      const u = {};
      for (const h in l) {
        if (Object.hasOwnProperty.call(l, h) === !1) continue;
        const d = l[h];
        typeof d != "object" || d === null ? u[h] = d : d.constructor !== Object && (s = i.get(d.constructor)) ? u[h] = s(d, a) : ArrayBuffer.isView(d) ? u[h] = t(d) : u[h] = a(d);
      }
      return u;
    }
    function c(l) {
      if (typeof l != "object" || l === null) return l;
      if (Array.isArray(l)) return o(l, c);
      if (l.constructor !== Object && (s = i.get(l.constructor)))
        return s(l, c);
      const u = {};
      for (const h in l) {
        const d = l[h];
        typeof d != "object" || d === null ? u[h] = d : d.constructor !== Object && (s = i.get(d.constructor)) ? u[h] = s(d, c) : ArrayBuffer.isView(d) ? u[h] = t(d) : u[h] = c(d);
      }
      return u;
    }
  }
  function n(r) {
    const i = [], s = [], o = /* @__PURE__ */ new Map();
    if (o.set(Date, (h) => new Date(h)), o.set(Map, (h, d) => new Map(c(Array.from(h), d))), o.set(Set, (h, d) => new Set(c(Array.from(h), d))), r.constructorHandlers)
      for (const h of r.constructorHandlers)
        o.set(h[0], h[1]);
    let a = null;
    return r.proto ? u : l;
    function c(h, d) {
      const g = Object.keys(h), p = new Array(g.length);
      for (let m = 0; m < g.length; m++) {
        const b = g[m], x = h[b];
        if (typeof x != "object" || x === null)
          p[b] = x;
        else if (x.constructor !== Object && (a = o.get(x.constructor)))
          p[b] = a(x, d);
        else if (ArrayBuffer.isView(x))
          p[b] = t(x);
        else {
          const A = i.indexOf(x);
          A !== -1 ? p[b] = s[A] : p[b] = d(x);
        }
      }
      return p;
    }
    function l(h) {
      if (typeof h != "object" || h === null) return h;
      if (Array.isArray(h)) return c(h, l);
      if (h.constructor !== Object && (a = o.get(h.constructor)))
        return a(h, l);
      const d = {};
      i.push(h), s.push(d);
      for (const g in h) {
        if (Object.hasOwnProperty.call(h, g) === !1) continue;
        const p = h[g];
        if (typeof p != "object" || p === null)
          d[g] = p;
        else if (p.constructor !== Object && (a = o.get(p.constructor)))
          d[g] = a(p, l);
        else if (ArrayBuffer.isView(p))
          d[g] = t(p);
        else {
          const m = i.indexOf(p);
          m !== -1 ? d[g] = s[m] : d[g] = l(p);
        }
      }
      return i.pop(), s.pop(), d;
    }
    function u(h) {
      if (typeof h != "object" || h === null) return h;
      if (Array.isArray(h)) return c(h, u);
      if (h.constructor !== Object && (a = o.get(h.constructor)))
        return a(h, u);
      const d = {};
      i.push(h), s.push(d);
      for (const g in h) {
        const p = h[g];
        if (typeof p != "object" || p === null)
          d[g] = p;
        else if (p.constructor !== Object && (a = o.get(p.constructor)))
          d[g] = a(p, u);
        else if (ArrayBuffer.isView(p))
          d[g] = t(p);
        else {
          const m = i.indexOf(p);
          m !== -1 ? d[g] = s[m] : d[g] = u(p);
        }
      }
      return i.pop(), s.pop(), d;
    }
  }
  return an;
}
var yo = mo();
const Qi = /* @__PURE__ */ po(yo);
Qi();
function In(t) {
  if (t == null || typeof t != "object") return !1;
  let e = Object.getPrototypeOf(t);
  return e !== null && e !== Object.prototype && Object.getPrototypeOf(e) !== null ? !1 : !(Symbol.iterator in t) && !(Symbol.toStringTag in t);
}
function ke(t) {
  return typeof t == "string";
}
function bo(t) {
  return Number.isFinite(t);
}
function we(t) {
  return Number.isSafeInteger(t) && t >= 0;
}
function se(t) {
  return t != null;
}
function So(t, e) {
  return In(t) && ke(e) && e in t;
}
var vo = typeof globalThis == "object" && globalThis && globalThis.Object === Object && globalThis, wo = typeof self == "object" && self && self.Object === Object && self, Zn = vo || wo || Function("return this")(), Le = Zn.Symbol, Zi = Object.prototype, xo = Zi.hasOwnProperty, Eo = Zi.toString, je = Le ? Le.toStringTag : void 0;
function Co(t) {
  var e = xo.call(t, je), n = t[je];
  try {
    t[je] = void 0;
    var r = !0;
  } catch {
  }
  var i = Eo.call(t);
  return r && (e ? t[je] = n : delete t[je]), i;
}
var ko = Object.prototype, Oo = ko.toString;
function Ao(t) {
  return Oo.call(t);
}
var To = "[object Null]", Ro = "[object Undefined]", Rr = Le ? Le.toStringTag : void 0;
function es(t) {
  return t == null ? t === void 0 ? Ro : To : Rr && Rr in Object(t) ? Co(t) : Ao(t);
}
function ts(t) {
  return t != null && typeof t == "object";
}
var No = "[object Symbol]";
function Do(t) {
  return typeof t == "symbol" || ts(t) && es(t) == No;
}
function Io(t, e) {
  for (var n = -1, r = t == null ? 0 : t.length, i = Array(r); ++n < r; )
    i[n] = e(t[n], n, t);
  return i;
}
var Fo = Array.isArray, Nr = Le ? Le.prototype : void 0, Dr = Nr ? Nr.toString : void 0;
function er(t) {
  if (typeof t == "string")
    return t;
  if (Fo(t))
    return Io(t, er) + "";
  if (Do(t))
    return Dr ? Dr.call(t) : "";
  var e = t + "";
  return e == "0" && 1 / t == -1 / 0 ? "-0" : e;
}
var Lo = /\s/;
function Po(t) {
  for (var e = t.length; e-- && Lo.test(t.charAt(e)); )
    ;
  return e;
}
var $o = /^\s+/;
function _o(t) {
  return t && t.slice(0, Po(t) + 1).replace($o, "");
}
function ns(t) {
  var e = typeof t;
  return t != null && (e == "object" || e == "function");
}
function rs(t) {
  return t;
}
var Bo = "[object AsyncFunction]", Uo = "[object Function]", qo = "[object GeneratorFunction]", zo = "[object Proxy]";
function is(t) {
  if (!ns(t))
    return !1;
  var e = es(t);
  return e == Uo || e == qo || e == Bo || e == zo;
}
var on = Zn["__core-js_shared__"], Ir = (function() {
  var t = /[^.]+$/.exec(on && on.keys && on.keys.IE_PROTO || "");
  return t ? "Symbol(src)_1." + t : "";
})();
function jo(t) {
  return !!Ir && Ir in t;
}
var Vo = Function.prototype, Mo = Vo.toString;
function Ho(t) {
  if (t != null) {
    try {
      return Mo.call(t);
    } catch {
    }
    try {
      return t + "";
    } catch {
    }
  }
  return "";
}
var Wo = /[\\^$.*+?()[\]{}|]/g, Go = /^\[object .+?Constructor\]$/, Ko = Function.prototype, Jo = Object.prototype, Xo = Ko.toString, Yo = Jo.hasOwnProperty, Qo = RegExp(
  "^" + Xo.call(Yo).replace(Wo, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Zo(t) {
  if (!ns(t) || jo(t))
    return !1;
  var e = is(t) ? Qo : Go;
  return e.test(Ho(t));
}
function el(t, e) {
  return t?.[e];
}
function tr(t, e) {
  var n = el(t, e);
  return Zo(n) ? n : void 0;
}
function tl(t, e, n) {
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
var nl = 800, rl = 16, il = Date.now;
function sl(t) {
  var e = 0, n = 0;
  return function() {
    var r = il(), i = rl - (r - n);
    if (n = r, i > 0) {
      if (++e >= nl)
        return arguments[0];
    } else
      e = 0;
    return t.apply(void 0, arguments);
  };
}
function al(t) {
  return function() {
    return t;
  };
}
var Fr = (function() {
  try {
    var t = tr(Object, "defineProperty");
    return t({}, "", {}), t;
  } catch {
  }
})(), ol = Fr ? function(t, e) {
  return Fr(t, "toString", {
    configurable: !0,
    enumerable: !1,
    value: al(e),
    writable: !0
  });
} : rs, ll = sl(ol);
function cl(t, e, n, r) {
  for (var i = t.length, s = n + -1; ++s < i; )
    if (e(t[s], s, t))
      return s;
  return -1;
}
function ul(t) {
  return t !== t;
}
function hl(t, e, n) {
  for (var r = n - 1, i = t.length; ++r < i; )
    if (t[r] === e)
      return r;
  return -1;
}
function nr(t, e, n) {
  return e === e ? hl(t, e, n) : cl(t, ul, n);
}
function dl(t, e) {
  var n = t == null ? 0 : t.length;
  return !!n && nr(t, e, 0) > -1;
}
function fl(t, e) {
  return t === e || t !== t && e !== e;
}
var Lr = Math.max;
function gl(t, e, n) {
  return e = Lr(e === void 0 ? t.length - 1 : e, 0), function() {
    for (var r = arguments, i = -1, s = Lr(r.length - e, 0), o = Array(s); ++i < s; )
      o[i] = r[e + i];
    i = -1;
    for (var a = Array(e + 1); ++i < e; )
      a[i] = r[i];
    return a[e] = n(o), tl(t, this, a);
  };
}
function pl(t, e) {
  return ll(gl(t, e, rs), t + "");
}
var ml = 9007199254740991;
function yl(t) {
  return typeof t == "number" && t > -1 && t % 1 == 0 && t <= ml;
}
function bl(t) {
  return t != null && yl(t.length) && !is(t);
}
var tt = tr(Object, "create");
function Sl() {
  this.__data__ = tt ? tt(null) : {}, this.size = 0;
}
function vl(t) {
  var e = this.has(t) && delete this.__data__[t];
  return this.size -= e ? 1 : 0, e;
}
var wl = "__lodash_hash_undefined__", xl = Object.prototype, El = xl.hasOwnProperty;
function Cl(t) {
  var e = this.__data__;
  if (tt) {
    var n = e[t];
    return n === wl ? void 0 : n;
  }
  return El.call(e, t) ? e[t] : void 0;
}
var kl = Object.prototype, Ol = kl.hasOwnProperty;
function Al(t) {
  var e = this.__data__;
  return tt ? e[t] !== void 0 : Ol.call(e, t);
}
var Tl = "__lodash_hash_undefined__";
function Rl(t, e) {
  var n = this.__data__;
  return this.size += this.has(t) ? 0 : 1, n[t] = tt && e === void 0 ? Tl : e, this;
}
function me(t) {
  var e = -1, n = t == null ? 0 : t.length;
  for (this.clear(); ++e < n; ) {
    var r = t[e];
    this.set(r[0], r[1]);
  }
}
me.prototype.clear = Sl;
me.prototype.delete = vl;
me.prototype.get = Cl;
me.prototype.has = Al;
me.prototype.set = Rl;
function Nl() {
  this.__data__ = [], this.size = 0;
}
function Jt(t, e) {
  for (var n = t.length; n--; )
    if (fl(t[n][0], e))
      return n;
  return -1;
}
var Dl = Array.prototype, Il = Dl.splice;
function Fl(t) {
  var e = this.__data__, n = Jt(e, t);
  if (n < 0)
    return !1;
  var r = e.length - 1;
  return n == r ? e.pop() : Il.call(e, n, 1), --this.size, !0;
}
function Ll(t) {
  var e = this.__data__, n = Jt(e, t);
  return n < 0 ? void 0 : e[n][1];
}
function Pl(t) {
  return Jt(this.__data__, t) > -1;
}
function $l(t, e) {
  var n = this.__data__, r = Jt(n, t);
  return r < 0 ? (++this.size, n.push([t, e])) : n[r][1] = e, this;
}
function Ue(t) {
  var e = -1, n = t == null ? 0 : t.length;
  for (this.clear(); ++e < n; ) {
    var r = t[e];
    this.set(r[0], r[1]);
  }
}
Ue.prototype.clear = Nl;
Ue.prototype.delete = Fl;
Ue.prototype.get = Ll;
Ue.prototype.has = Pl;
Ue.prototype.set = $l;
var _l = tr(Zn, "Map");
function Bl() {
  this.size = 0, this.__data__ = {
    hash: new me(),
    map: new (_l || Ue)(),
    string: new me()
  };
}
function Ul(t) {
  var e = typeof t;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? t !== "__proto__" : t === null;
}
function Xt(t, e) {
  var n = t.__data__;
  return Ul(e) ? n[typeof e == "string" ? "string" : "hash"] : n.map;
}
function ql(t) {
  var e = Xt(this, t).delete(t);
  return this.size -= e ? 1 : 0, e;
}
function zl(t) {
  return Xt(this, t).get(t);
}
function jl(t) {
  return Xt(this, t).has(t);
}
function Vl(t, e) {
  var n = Xt(this, t), r = n.size;
  return n.set(t, e), this.size += n.size == r ? 0 : 1, this;
}
function qe(t) {
  var e = -1, n = t == null ? 0 : t.length;
  for (this.clear(); ++e < n; ) {
    var r = t[e];
    this.set(r[0], r[1]);
  }
}
qe.prototype.clear = Bl;
qe.prototype.delete = ql;
qe.prototype.get = zl;
qe.prototype.has = jl;
qe.prototype.set = Vl;
function Ml(t) {
  return t == null ? "" : er(t);
}
function Hl(t, e, n) {
  var r = -1, i = t.length;
  e < 0 && (e = -e > i ? 0 : i + e), n = n > i ? i : n, n < 0 && (n += i), i = e > n ? 0 : n - e >>> 0, e >>>= 0;
  for (var s = Array(i); ++r < i; )
    s[r] = t[r + e];
  return s;
}
function Wl(t, e, n) {
  var r = t.length;
  return n = n === void 0 ? r : n, !e && n >= r ? t : Hl(t, e, n);
}
var Gl = "\\ud800-\\udfff", Kl = "\\u0300-\\u036f", Jl = "\\ufe20-\\ufe2f", Xl = "\\u20d0-\\u20ff", Yl = Kl + Jl + Xl, Ql = "\\ufe0e\\ufe0f", Zl = "\\u200d", ec = RegExp("[" + Zl + Gl + Yl + Ql + "]");
function tc(t) {
  return ec.test(t);
}
function nc(t) {
  return t.split("");
}
var ss = "\\ud800-\\udfff", rc = "\\u0300-\\u036f", ic = "\\ufe20-\\ufe2f", sc = "\\u20d0-\\u20ff", ac = rc + ic + sc, oc = "\\ufe0e\\ufe0f", lc = "[" + ss + "]", Fn = "[" + ac + "]", Ln = "\\ud83c[\\udffb-\\udfff]", cc = "(?:" + Fn + "|" + Ln + ")", as = "[^" + ss + "]", os = "(?:\\ud83c[\\udde6-\\uddff]){2}", ls = "[\\ud800-\\udbff][\\udc00-\\udfff]", uc = "\\u200d", cs = cc + "?", us = "[" + oc + "]?", hc = "(?:" + uc + "(?:" + [as, os, ls].join("|") + ")" + us + cs + ")*", dc = us + cs + hc, fc = "(?:" + [as + Fn + "?", Fn, os, ls, lc].join("|") + ")", gc = RegExp(Ln + "(?=" + Ln + ")|" + fc + dc, "g");
function pc(t) {
  return t.match(gc) || [];
}
function Pr(t) {
  return tc(t) ? pc(t) : nc(t);
}
var mc = "__lodash_hash_undefined__";
function yc(t) {
  return this.__data__.set(t, mc), this;
}
function bc(t) {
  return this.__data__.has(t);
}
function Nt(t) {
  var e = -1, n = t == null ? 0 : t.length;
  for (this.__data__ = new qe(); ++e < n; )
    this.add(t[e]);
}
Nt.prototype.add = Nt.prototype.push = yc;
Nt.prototype.has = bc;
function Sc(t, e) {
  return t.has(e);
}
function vc(t) {
  return ts(t) && bl(t);
}
var wc = 200;
function xc(t, e, n, r) {
  var i = -1, s = dl, o = !0, a = t.length, c = [], l = e.length;
  if (!a)
    return c;
  e.length >= wc && (s = Sc, o = !1, e = new Nt(e));
  e:
    for (; ++i < a; ) {
      var u = t[i], h = u;
      if (u = u !== 0 ? u : 0, o && h === h) {
        for (var d = l; d--; )
          if (e[d] === h)
            continue e;
        c.push(u);
      } else s(e, h, r) || c.push(u);
    }
  return c;
}
function Ec(t, e) {
  for (var n = t.length; n-- && nr(e, t[n], 0) > -1; )
    ;
  return n;
}
function Cc(t, e) {
  for (var n = -1, r = t.length; ++n < r && nr(e, t[n], 0) > -1; )
    ;
  return n;
}
function $r(t, e, n) {
  if (t = Ml(t), t && e === void 0)
    return _o(t);
  if (!t || !(e = er(e)))
    return t;
  var r = Pr(t), i = Pr(e), s = Cc(r, i), o = Ec(r, i) + 1;
  return Wl(r, s, o).join("");
}
var kc = pl(function(t, e) {
  return vc(t) ? xc(t, e) : [];
}), Ne = function() {
  return Ne = Object.assign || function(t) {
    for (var e, n = 1, r = arguments.length; n < r; n++) {
      e = arguments[n];
      for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    }
    return t;
  }, Ne.apply(this, arguments);
}, Oc = "~", Ac = "~~";
function rr(t, e) {
  for (var n = {}, r = {}, i = t.split(Ac), s = !1, o = 0; i.length > o; o++) {
    for (var a = i[o].split(Oc), c = 0; c < a.length; c += 2) {
      var l = a[c], u = a[c + 1], h = "&" + l + ";";
      n[h] = u, s && (n["&" + l] = u), r[u] = h;
    }
    s = !0;
  }
  return e ? { entities: Ne(Ne({}, n), e.entities), characters: Ne(Ne({}, r), e.characters) } : { entities: n, characters: r };
}
var ln = {
  xml: /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,
  html4: /&notin;|&(?:nbsp|iexcl|cent|pound|curren|yen|brvbar|sect|uml|copy|ordf|laquo|not|shy|reg|macr|deg|plusmn|sup2|sup3|acute|micro|para|middot|cedil|sup1|ordm|raquo|frac14|frac12|frac34|iquest|Agrave|Aacute|Acirc|Atilde|Auml|Aring|AElig|Ccedil|Egrave|Eacute|Ecirc|Euml|Igrave|Iacute|Icirc|Iuml|ETH|Ntilde|Ograve|Oacute|Ocirc|Otilde|Ouml|times|Oslash|Ugrave|Uacute|Ucirc|Uuml|Yacute|THORN|szlig|agrave|aacute|acirc|atilde|auml|aring|aelig|ccedil|egrave|eacute|ecirc|euml|igrave|iacute|icirc|iuml|eth|ntilde|ograve|oacute|ocirc|otilde|ouml|divide|oslash|ugrave|uacute|ucirc|uuml|yacute|thorn|yuml|quot|amp|lt|gt|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,
  html5: /&centerdot;|&copysr;|&divideontimes;|&gtcc;|&gtcir;|&gtdot;|&gtlPar;|&gtquest;|&gtrapprox;|&gtrarr;|&gtrdot;|&gtreqless;|&gtreqqless;|&gtrless;|&gtrsim;|&ltcc;|&ltcir;|&ltdot;|&lthree;|&ltimes;|&ltlarr;|&ltquest;|&ltrPar;|&ltri;|&ltrie;|&ltrif;|&notin;|&notinE;|&notindot;|&notinva;|&notinvb;|&notinvc;|&notni;|&notniva;|&notnivb;|&notnivc;|&parallel;|&timesb;|&timesbar;|&timesd;|&(?:AElig|AMP|Aacute|Acirc|Agrave|Aring|Atilde|Auml|COPY|Ccedil|ETH|Eacute|Ecirc|Egrave|Euml|GT|Iacute|Icirc|Igrave|Iuml|LT|Ntilde|Oacute|Ocirc|Ograve|Oslash|Otilde|Ouml|QUOT|REG|THORN|Uacute|Ucirc|Ugrave|Uuml|Yacute|aacute|acirc|acute|aelig|agrave|amp|aring|atilde|auml|brvbar|ccedil|cedil|cent|copy|curren|deg|divide|eacute|ecirc|egrave|eth|euml|frac12|frac14|frac34|gt|iacute|icirc|iexcl|igrave|iquest|iuml|laquo|lt|macr|micro|middot|nbsp|not|ntilde|oacute|ocirc|ograve|ordf|ordm|oslash|otilde|ouml|para|plusmn|pound|quot|raquo|reg|sect|shy|sup1|sup2|sup3|szlig|thorn|times|uacute|ucirc|ugrave|uml|uuml|yacute|yen|yuml|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g
}, Pe = {};
Pe.xml = rr(`lt~<~gt~>~quot~"~apos~'~amp~&`);
Pe.html4 = rr(`apos~'~OElig~Œ~oelig~œ~Scaron~Š~scaron~š~Yuml~Ÿ~circ~ˆ~tilde~˜~ensp~ ~emsp~ ~thinsp~ ~zwnj~‌~zwj~‍~lrm~‎~rlm~‏~ndash~–~mdash~—~lsquo~‘~rsquo~’~sbquo~‚~ldquo~“~rdquo~”~bdquo~„~dagger~†~Dagger~‡~permil~‰~lsaquo~‹~rsaquo~›~euro~€~fnof~ƒ~Alpha~Α~Beta~Β~Gamma~Γ~Delta~Δ~Epsilon~Ε~Zeta~Ζ~Eta~Η~Theta~Θ~Iota~Ι~Kappa~Κ~Lambda~Λ~Mu~Μ~Nu~Ν~Xi~Ξ~Omicron~Ο~Pi~Π~Rho~Ρ~Sigma~Σ~Tau~Τ~Upsilon~Υ~Phi~Φ~Chi~Χ~Psi~Ψ~Omega~Ω~alpha~α~beta~β~gamma~γ~delta~δ~epsilon~ε~zeta~ζ~eta~η~theta~θ~iota~ι~kappa~κ~lambda~λ~mu~μ~nu~ν~xi~ξ~omicron~ο~pi~π~rho~ρ~sigmaf~ς~sigma~σ~tau~τ~upsilon~υ~phi~φ~chi~χ~psi~ψ~omega~ω~thetasym~ϑ~upsih~ϒ~piv~ϖ~bull~•~hellip~…~prime~′~Prime~″~oline~‾~frasl~⁄~weierp~℘~image~ℑ~real~ℜ~trade~™~alefsym~ℵ~larr~←~uarr~↑~rarr~→~darr~↓~harr~↔~crarr~↵~lArr~⇐~uArr~⇑~rArr~⇒~dArr~⇓~hArr~⇔~forall~∀~part~∂~exist~∃~empty~∅~nabla~∇~isin~∈~notin~∉~ni~∋~prod~∏~sum~∑~minus~−~lowast~∗~radic~√~prop~∝~infin~∞~ang~∠~and~∧~or~∨~cap~∩~cup~∪~int~∫~there4~∴~sim~∼~cong~≅~asymp~≈~ne~≠~equiv~≡~le~≤~ge~≥~sub~⊂~sup~⊃~nsub~⊄~sube~⊆~supe~⊇~oplus~⊕~otimes~⊗~perp~⊥~sdot~⋅~lceil~⌈~rceil~⌉~lfloor~⌊~rfloor~⌋~lang~〈~rang~〉~loz~◊~spades~♠~clubs~♣~hearts~♥~diams~♦~~nbsp~ ~iexcl~¡~cent~¢~pound~£~curren~¤~yen~¥~brvbar~¦~sect~§~uml~¨~copy~©~ordf~ª~laquo~«~not~¬~shy~­~reg~®~macr~¯~deg~°~plusmn~±~sup2~²~sup3~³~acute~´~micro~µ~para~¶~middot~·~cedil~¸~sup1~¹~ordm~º~raquo~»~frac14~¼~frac12~½~frac34~¾~iquest~¿~Agrave~À~Aacute~Á~Acirc~Â~Atilde~Ã~Auml~Ä~Aring~Å~AElig~Æ~Ccedil~Ç~Egrave~È~Eacute~É~Ecirc~Ê~Euml~Ë~Igrave~Ì~Iacute~Í~Icirc~Î~Iuml~Ï~ETH~Ð~Ntilde~Ñ~Ograve~Ò~Oacute~Ó~Ocirc~Ô~Otilde~Õ~Ouml~Ö~times~×~Oslash~Ø~Ugrave~Ù~Uacute~Ú~Ucirc~Û~Uuml~Ü~Yacute~Ý~THORN~Þ~szlig~ß~agrave~à~aacute~á~acirc~â~atilde~ã~auml~ä~aring~å~aelig~æ~ccedil~ç~egrave~è~eacute~é~ecirc~ê~euml~ë~igrave~ì~iacute~í~icirc~î~iuml~ï~eth~ð~ntilde~ñ~ograve~ò~oacute~ó~ocirc~ô~otilde~õ~ouml~ö~divide~÷~oslash~ø~ugrave~ù~uacute~ú~ucirc~û~uuml~ü~yacute~ý~thorn~þ~yuml~ÿ~quot~"~amp~&~lt~<~gt~>`);
Pe.html5 = rr('Abreve~Ă~Acy~А~Afr~𝔄~Amacr~Ā~And~⩓~Aogon~Ą~Aopf~𝔸~ApplyFunction~⁡~Ascr~𝒜~Assign~≔~Backslash~∖~Barv~⫧~Barwed~⌆~Bcy~Б~Because~∵~Bernoullis~ℬ~Bfr~𝔅~Bopf~𝔹~Breve~˘~Bscr~ℬ~Bumpeq~≎~CHcy~Ч~Cacute~Ć~Cap~⋒~CapitalDifferentialD~ⅅ~Cayleys~ℭ~Ccaron~Č~Ccirc~Ĉ~Cconint~∰~Cdot~Ċ~Cedilla~¸~CenterDot~·~Cfr~ℭ~CircleDot~⊙~CircleMinus~⊖~CirclePlus~⊕~CircleTimes~⊗~ClockwiseContourIntegral~∲~CloseCurlyDoubleQuote~”~CloseCurlyQuote~’~Colon~∷~Colone~⩴~Congruent~≡~Conint~∯~ContourIntegral~∮~Copf~ℂ~Coproduct~∐~CounterClockwiseContourIntegral~∳~Cross~⨯~Cscr~𝒞~Cup~⋓~CupCap~≍~DD~ⅅ~DDotrahd~⤑~DJcy~Ђ~DScy~Ѕ~DZcy~Џ~Darr~↡~Dashv~⫤~Dcaron~Ď~Dcy~Д~Del~∇~Dfr~𝔇~DiacriticalAcute~´~DiacriticalDot~˙~DiacriticalDoubleAcute~˝~DiacriticalGrave~`~DiacriticalTilde~˜~Diamond~⋄~DifferentialD~ⅆ~Dopf~𝔻~Dot~¨~DotDot~⃜~DotEqual~≐~DoubleContourIntegral~∯~DoubleDot~¨~DoubleDownArrow~⇓~DoubleLeftArrow~⇐~DoubleLeftRightArrow~⇔~DoubleLeftTee~⫤~DoubleLongLeftArrow~⟸~DoubleLongLeftRightArrow~⟺~DoubleLongRightArrow~⟹~DoubleRightArrow~⇒~DoubleRightTee~⊨~DoubleUpArrow~⇑~DoubleUpDownArrow~⇕~DoubleVerticalBar~∥~DownArrow~↓~DownArrowBar~⤓~DownArrowUpArrow~⇵~DownBreve~̑~DownLeftRightVector~⥐~DownLeftTeeVector~⥞~DownLeftVector~↽~DownLeftVectorBar~⥖~DownRightTeeVector~⥟~DownRightVector~⇁~DownRightVectorBar~⥗~DownTee~⊤~DownTeeArrow~↧~Downarrow~⇓~Dscr~𝒟~Dstrok~Đ~ENG~Ŋ~Ecaron~Ě~Ecy~Э~Edot~Ė~Efr~𝔈~Element~∈~Emacr~Ē~EmptySmallSquare~◻~EmptyVerySmallSquare~▫~Eogon~Ę~Eopf~𝔼~Equal~⩵~EqualTilde~≂~Equilibrium~⇌~Escr~ℰ~Esim~⩳~Exists~∃~ExponentialE~ⅇ~Fcy~Ф~Ffr~𝔉~FilledSmallSquare~◼~FilledVerySmallSquare~▪~Fopf~𝔽~ForAll~∀~Fouriertrf~ℱ~Fscr~ℱ~GJcy~Ѓ~Gammad~Ϝ~Gbreve~Ğ~Gcedil~Ģ~Gcirc~Ĝ~Gcy~Г~Gdot~Ġ~Gfr~𝔊~Gg~⋙~Gopf~𝔾~GreaterEqual~≥~GreaterEqualLess~⋛~GreaterFullEqual~≧~GreaterGreater~⪢~GreaterLess~≷~GreaterSlantEqual~⩾~GreaterTilde~≳~Gscr~𝒢~Gt~≫~HARDcy~Ъ~Hacek~ˇ~Hat~^~Hcirc~Ĥ~Hfr~ℌ~HilbertSpace~ℋ~Hopf~ℍ~HorizontalLine~─~Hscr~ℋ~Hstrok~Ħ~HumpDownHump~≎~HumpEqual~≏~IEcy~Е~IJlig~Ĳ~IOcy~Ё~Icy~И~Idot~İ~Ifr~ℑ~Im~ℑ~Imacr~Ī~ImaginaryI~ⅈ~Implies~⇒~Int~∬~Integral~∫~Intersection~⋂~InvisibleComma~⁣~InvisibleTimes~⁢~Iogon~Į~Iopf~𝕀~Iscr~ℐ~Itilde~Ĩ~Iukcy~І~Jcirc~Ĵ~Jcy~Й~Jfr~𝔍~Jopf~𝕁~Jscr~𝒥~Jsercy~Ј~Jukcy~Є~KHcy~Х~KJcy~Ќ~Kcedil~Ķ~Kcy~К~Kfr~𝔎~Kopf~𝕂~Kscr~𝒦~LJcy~Љ~Lacute~Ĺ~Lang~⟪~Laplacetrf~ℒ~Larr~↞~Lcaron~Ľ~Lcedil~Ļ~Lcy~Л~LeftAngleBracket~⟨~LeftArrow~←~LeftArrowBar~⇤~LeftArrowRightArrow~⇆~LeftCeiling~⌈~LeftDoubleBracket~⟦~LeftDownTeeVector~⥡~LeftDownVector~⇃~LeftDownVectorBar~⥙~LeftFloor~⌊~LeftRightArrow~↔~LeftRightVector~⥎~LeftTee~⊣~LeftTeeArrow~↤~LeftTeeVector~⥚~LeftTriangle~⊲~LeftTriangleBar~⧏~LeftTriangleEqual~⊴~LeftUpDownVector~⥑~LeftUpTeeVector~⥠~LeftUpVector~↿~LeftUpVectorBar~⥘~LeftVector~↼~LeftVectorBar~⥒~Leftarrow~⇐~Leftrightarrow~⇔~LessEqualGreater~⋚~LessFullEqual~≦~LessGreater~≶~LessLess~⪡~LessSlantEqual~⩽~LessTilde~≲~Lfr~𝔏~Ll~⋘~Lleftarrow~⇚~Lmidot~Ŀ~LongLeftArrow~⟵~LongLeftRightArrow~⟷~LongRightArrow~⟶~Longleftarrow~⟸~Longleftrightarrow~⟺~Longrightarrow~⟹~Lopf~𝕃~LowerLeftArrow~↙~LowerRightArrow~↘~Lscr~ℒ~Lsh~↰~Lstrok~Ł~Lt~≪~Map~⤅~Mcy~М~MediumSpace~ ~Mellintrf~ℳ~Mfr~𝔐~MinusPlus~∓~Mopf~𝕄~Mscr~ℳ~NJcy~Њ~Nacute~Ń~Ncaron~Ň~Ncedil~Ņ~Ncy~Н~NegativeMediumSpace~​~NegativeThickSpace~​~NegativeThinSpace~​~NegativeVeryThinSpace~​~NestedGreaterGreater~≫~NestedLessLess~≪~NewLine~\n~Nfr~𝔑~NoBreak~⁠~NonBreakingSpace~ ~Nopf~ℕ~Not~⫬~NotCongruent~≢~NotCupCap~≭~NotDoubleVerticalBar~∦~NotElement~∉~NotEqual~≠~NotEqualTilde~≂̸~NotExists~∄~NotGreater~≯~NotGreaterEqual~≱~NotGreaterFullEqual~≧̸~NotGreaterGreater~≫̸~NotGreaterLess~≹~NotGreaterSlantEqual~⩾̸~NotGreaterTilde~≵~NotHumpDownHump~≎̸~NotHumpEqual~≏̸~NotLeftTriangle~⋪~NotLeftTriangleBar~⧏̸~NotLeftTriangleEqual~⋬~NotLess~≮~NotLessEqual~≰~NotLessGreater~≸~NotLessLess~≪̸~NotLessSlantEqual~⩽̸~NotLessTilde~≴~NotNestedGreaterGreater~⪢̸~NotNestedLessLess~⪡̸~NotPrecedes~⊀~NotPrecedesEqual~⪯̸~NotPrecedesSlantEqual~⋠~NotReverseElement~∌~NotRightTriangle~⋫~NotRightTriangleBar~⧐̸~NotRightTriangleEqual~⋭~NotSquareSubset~⊏̸~NotSquareSubsetEqual~⋢~NotSquareSuperset~⊐̸~NotSquareSupersetEqual~⋣~NotSubset~⊂⃒~NotSubsetEqual~⊈~NotSucceeds~⊁~NotSucceedsEqual~⪰̸~NotSucceedsSlantEqual~⋡~NotSucceedsTilde~≿̸~NotSuperset~⊃⃒~NotSupersetEqual~⊉~NotTilde~≁~NotTildeEqual~≄~NotTildeFullEqual~≇~NotTildeTilde~≉~NotVerticalBar~∤~Nscr~𝒩~Ocy~О~Odblac~Ő~Ofr~𝔒~Omacr~Ō~Oopf~𝕆~OpenCurlyDoubleQuote~“~OpenCurlyQuote~‘~Or~⩔~Oscr~𝒪~Otimes~⨷~OverBar~‾~OverBrace~⏞~OverBracket~⎴~OverParenthesis~⏜~PartialD~∂~Pcy~П~Pfr~𝔓~PlusMinus~±~Poincareplane~ℌ~Popf~ℙ~Pr~⪻~Precedes~≺~PrecedesEqual~⪯~PrecedesSlantEqual~≼~PrecedesTilde~≾~Product~∏~Proportion~∷~Proportional~∝~Pscr~𝒫~Qfr~𝔔~Qopf~ℚ~Qscr~𝒬~RBarr~⤐~Racute~Ŕ~Rang~⟫~Rarr~↠~Rarrtl~⤖~Rcaron~Ř~Rcedil~Ŗ~Rcy~Р~Re~ℜ~ReverseElement~∋~ReverseEquilibrium~⇋~ReverseUpEquilibrium~⥯~Rfr~ℜ~RightAngleBracket~⟩~RightArrow~→~RightArrowBar~⇥~RightArrowLeftArrow~⇄~RightCeiling~⌉~RightDoubleBracket~⟧~RightDownTeeVector~⥝~RightDownVector~⇂~RightDownVectorBar~⥕~RightFloor~⌋~RightTee~⊢~RightTeeArrow~↦~RightTeeVector~⥛~RightTriangle~⊳~RightTriangleBar~⧐~RightTriangleEqual~⊵~RightUpDownVector~⥏~RightUpTeeVector~⥜~RightUpVector~↾~RightUpVectorBar~⥔~RightVector~⇀~RightVectorBar~⥓~Rightarrow~⇒~Ropf~ℝ~RoundImplies~⥰~Rrightarrow~⇛~Rscr~ℛ~Rsh~↱~RuleDelayed~⧴~SHCHcy~Щ~SHcy~Ш~SOFTcy~Ь~Sacute~Ś~Sc~⪼~Scedil~Ş~Scirc~Ŝ~Scy~С~Sfr~𝔖~ShortDownArrow~↓~ShortLeftArrow~←~ShortRightArrow~→~ShortUpArrow~↑~SmallCircle~∘~Sopf~𝕊~Sqrt~√~Square~□~SquareIntersection~⊓~SquareSubset~⊏~SquareSubsetEqual~⊑~SquareSuperset~⊐~SquareSupersetEqual~⊒~SquareUnion~⊔~Sscr~𝒮~Star~⋆~Sub~⋐~Subset~⋐~SubsetEqual~⊆~Succeeds~≻~SucceedsEqual~⪰~SucceedsSlantEqual~≽~SucceedsTilde~≿~SuchThat~∋~Sum~∑~Sup~⋑~Superset~⊃~SupersetEqual~⊇~Supset~⋑~TRADE~™~TSHcy~Ћ~TScy~Ц~Tab~	~Tcaron~Ť~Tcedil~Ţ~Tcy~Т~Tfr~𝔗~Therefore~∴~ThickSpace~  ~ThinSpace~ ~Tilde~∼~TildeEqual~≃~TildeFullEqual~≅~TildeTilde~≈~Topf~𝕋~TripleDot~⃛~Tscr~𝒯~Tstrok~Ŧ~Uarr~↟~Uarrocir~⥉~Ubrcy~Ў~Ubreve~Ŭ~Ucy~У~Udblac~Ű~Ufr~𝔘~Umacr~Ū~UnderBar~_~UnderBrace~⏟~UnderBracket~⎵~UnderParenthesis~⏝~Union~⋃~UnionPlus~⊎~Uogon~Ų~Uopf~𝕌~UpArrow~↑~UpArrowBar~⤒~UpArrowDownArrow~⇅~UpDownArrow~↕~UpEquilibrium~⥮~UpTee~⊥~UpTeeArrow~↥~Uparrow~⇑~Updownarrow~⇕~UpperLeftArrow~↖~UpperRightArrow~↗~Upsi~ϒ~Uring~Ů~Uscr~𝒰~Utilde~Ũ~VDash~⊫~Vbar~⫫~Vcy~В~Vdash~⊩~Vdashl~⫦~Vee~⋁~Verbar~‖~Vert~‖~VerticalBar~∣~VerticalLine~|~VerticalSeparator~❘~VerticalTilde~≀~VeryThinSpace~ ~Vfr~𝔙~Vopf~𝕍~Vscr~𝒱~Vvdash~⊪~Wcirc~Ŵ~Wedge~⋀~Wfr~𝔚~Wopf~𝕎~Wscr~𝒲~Xfr~𝔛~Xopf~𝕏~Xscr~𝒳~YAcy~Я~YIcy~Ї~YUcy~Ю~Ycirc~Ŷ~Ycy~Ы~Yfr~𝔜~Yopf~𝕐~Yscr~𝒴~ZHcy~Ж~Zacute~Ź~Zcaron~Ž~Zcy~З~Zdot~Ż~ZeroWidthSpace~​~Zfr~ℨ~Zopf~ℤ~Zscr~𝒵~abreve~ă~ac~∾~acE~∾̳~acd~∿~acy~а~af~⁡~afr~𝔞~aleph~ℵ~amacr~ā~amalg~⨿~andand~⩕~andd~⩜~andslope~⩘~andv~⩚~ange~⦤~angle~∠~angmsd~∡~angmsdaa~⦨~angmsdab~⦩~angmsdac~⦪~angmsdad~⦫~angmsdae~⦬~angmsdaf~⦭~angmsdag~⦮~angmsdah~⦯~angrt~∟~angrtvb~⊾~angrtvbd~⦝~angsph~∢~angst~Å~angzarr~⍼~aogon~ą~aopf~𝕒~ap~≈~apE~⩰~apacir~⩯~ape~≊~apid~≋~approx~≈~approxeq~≊~ascr~𝒶~ast~*~asympeq~≍~awconint~∳~awint~⨑~bNot~⫭~backcong~≌~backepsilon~϶~backprime~‵~backsim~∽~backsimeq~⋍~barvee~⊽~barwed~⌅~barwedge~⌅~bbrk~⎵~bbrktbrk~⎶~bcong~≌~bcy~б~becaus~∵~because~∵~bemptyv~⦰~bepsi~϶~bernou~ℬ~beth~ℶ~between~≬~bfr~𝔟~bigcap~⋂~bigcirc~◯~bigcup~⋃~bigodot~⨀~bigoplus~⨁~bigotimes~⨂~bigsqcup~⨆~bigstar~★~bigtriangledown~▽~bigtriangleup~△~biguplus~⨄~bigvee~⋁~bigwedge~⋀~bkarow~⤍~blacklozenge~⧫~blacksquare~▪~blacktriangle~▴~blacktriangledown~▾~blacktriangleleft~◂~blacktriangleright~▸~blank~␣~blk12~▒~blk14~░~blk34~▓~block~█~bne~=⃥~bnequiv~≡⃥~bnot~⌐~bopf~𝕓~bot~⊥~bottom~⊥~bowtie~⋈~boxDL~╗~boxDR~╔~boxDl~╖~boxDr~╓~boxH~═~boxHD~╦~boxHU~╩~boxHd~╤~boxHu~╧~boxUL~╝~boxUR~╚~boxUl~╜~boxUr~╙~boxV~║~boxVH~╬~boxVL~╣~boxVR~╠~boxVh~╫~boxVl~╢~boxVr~╟~boxbox~⧉~boxdL~╕~boxdR~╒~boxdl~┐~boxdr~┌~boxh~─~boxhD~╥~boxhU~╨~boxhd~┬~boxhu~┴~boxminus~⊟~boxplus~⊞~boxtimes~⊠~boxuL~╛~boxuR~╘~boxul~┘~boxur~└~boxv~│~boxvH~╪~boxvL~╡~boxvR~╞~boxvh~┼~boxvl~┤~boxvr~├~bprime~‵~breve~˘~bscr~𝒷~bsemi~⁏~bsim~∽~bsime~⋍~bsol~\\~bsolb~⧅~bsolhsub~⟈~bullet~•~bump~≎~bumpE~⪮~bumpe~≏~bumpeq~≏~cacute~ć~capand~⩄~capbrcup~⩉~capcap~⩋~capcup~⩇~capdot~⩀~caps~∩︀~caret~⁁~caron~ˇ~ccaps~⩍~ccaron~č~ccirc~ĉ~ccups~⩌~ccupssm~⩐~cdot~ċ~cemptyv~⦲~centerdot~·~cfr~𝔠~chcy~ч~check~✓~checkmark~✓~cir~○~cirE~⧃~circeq~≗~circlearrowleft~↺~circlearrowright~↻~circledR~®~circledS~Ⓢ~circledast~⊛~circledcirc~⊚~circleddash~⊝~cire~≗~cirfnint~⨐~cirmid~⫯~cirscir~⧂~clubsuit~♣~colon~:~colone~≔~coloneq~≔~comma~,~commat~@~comp~∁~compfn~∘~complement~∁~complexes~ℂ~congdot~⩭~conint~∮~copf~𝕔~coprod~∐~copysr~℗~cross~✗~cscr~𝒸~csub~⫏~csube~⫑~csup~⫐~csupe~⫒~ctdot~⋯~cudarrl~⤸~cudarrr~⤵~cuepr~⋞~cuesc~⋟~cularr~↶~cularrp~⤽~cupbrcap~⩈~cupcap~⩆~cupcup~⩊~cupdot~⊍~cupor~⩅~cups~∪︀~curarr~↷~curarrm~⤼~curlyeqprec~⋞~curlyeqsucc~⋟~curlyvee~⋎~curlywedge~⋏~curvearrowleft~↶~curvearrowright~↷~cuvee~⋎~cuwed~⋏~cwconint~∲~cwint~∱~cylcty~⌭~dHar~⥥~daleth~ℸ~dash~‐~dashv~⊣~dbkarow~⤏~dblac~˝~dcaron~ď~dcy~д~dd~ⅆ~ddagger~‡~ddarr~⇊~ddotseq~⩷~demptyv~⦱~dfisht~⥿~dfr~𝔡~dharl~⇃~dharr~⇂~diam~⋄~diamond~⋄~diamondsuit~♦~die~¨~digamma~ϝ~disin~⋲~div~÷~divideontimes~⋇~divonx~⋇~djcy~ђ~dlcorn~⌞~dlcrop~⌍~dollar~$~dopf~𝕕~dot~˙~doteq~≐~doteqdot~≑~dotminus~∸~dotplus~∔~dotsquare~⊡~doublebarwedge~⌆~downarrow~↓~downdownarrows~⇊~downharpoonleft~⇃~downharpoonright~⇂~drbkarow~⤐~drcorn~⌟~drcrop~⌌~dscr~𝒹~dscy~ѕ~dsol~⧶~dstrok~đ~dtdot~⋱~dtri~▿~dtrif~▾~duarr~⇵~duhar~⥯~dwangle~⦦~dzcy~џ~dzigrarr~⟿~eDDot~⩷~eDot~≑~easter~⩮~ecaron~ě~ecir~≖~ecolon~≕~ecy~э~edot~ė~ee~ⅇ~efDot~≒~efr~𝔢~eg~⪚~egs~⪖~egsdot~⪘~el~⪙~elinters~⏧~ell~ℓ~els~⪕~elsdot~⪗~emacr~ē~emptyset~∅~emptyv~∅~emsp13~ ~emsp14~ ~eng~ŋ~eogon~ę~eopf~𝕖~epar~⋕~eparsl~⧣~eplus~⩱~epsi~ε~epsiv~ϵ~eqcirc~≖~eqcolon~≕~eqsim~≂~eqslantgtr~⪖~eqslantless~⪕~equals~=~equest~≟~equivDD~⩸~eqvparsl~⧥~erDot~≓~erarr~⥱~escr~ℯ~esdot~≐~esim~≂~excl~!~expectation~ℰ~exponentiale~ⅇ~fallingdotseq~≒~fcy~ф~female~♀~ffilig~ﬃ~fflig~ﬀ~ffllig~ﬄ~ffr~𝔣~filig~ﬁ~fjlig~fj~flat~♭~fllig~ﬂ~fltns~▱~fopf~𝕗~fork~⋔~forkv~⫙~fpartint~⨍~frac13~⅓~frac15~⅕~frac16~⅙~frac18~⅛~frac23~⅔~frac25~⅖~frac35~⅗~frac38~⅜~frac45~⅘~frac56~⅚~frac58~⅝~frac78~⅞~frown~⌢~fscr~𝒻~gE~≧~gEl~⪌~gacute~ǵ~gammad~ϝ~gap~⪆~gbreve~ğ~gcirc~ĝ~gcy~г~gdot~ġ~gel~⋛~geq~≥~geqq~≧~geqslant~⩾~ges~⩾~gescc~⪩~gesdot~⪀~gesdoto~⪂~gesdotol~⪄~gesl~⋛︀~gesles~⪔~gfr~𝔤~gg~≫~ggg~⋙~gimel~ℷ~gjcy~ѓ~gl~≷~glE~⪒~gla~⪥~glj~⪤~gnE~≩~gnap~⪊~gnapprox~⪊~gne~⪈~gneq~⪈~gneqq~≩~gnsim~⋧~gopf~𝕘~grave~`~gscr~ℊ~gsim~≳~gsime~⪎~gsiml~⪐~gtcc~⪧~gtcir~⩺~gtdot~⋗~gtlPar~⦕~gtquest~⩼~gtrapprox~⪆~gtrarr~⥸~gtrdot~⋗~gtreqless~⋛~gtreqqless~⪌~gtrless~≷~gtrsim~≳~gvertneqq~≩︀~gvnE~≩︀~hairsp~ ~half~½~hamilt~ℋ~hardcy~ъ~harrcir~⥈~harrw~↭~hbar~ℏ~hcirc~ĥ~heartsuit~♥~hercon~⊹~hfr~𝔥~hksearow~⤥~hkswarow~⤦~hoarr~⇿~homtht~∻~hookleftarrow~↩~hookrightarrow~↪~hopf~𝕙~horbar~―~hscr~𝒽~hslash~ℏ~hstrok~ħ~hybull~⁃~hyphen~‐~ic~⁣~icy~и~iecy~е~iff~⇔~ifr~𝔦~ii~ⅈ~iiiint~⨌~iiint~∭~iinfin~⧜~iiota~℩~ijlig~ĳ~imacr~ī~imagline~ℐ~imagpart~ℑ~imath~ı~imof~⊷~imped~Ƶ~in~∈~incare~℅~infintie~⧝~inodot~ı~intcal~⊺~integers~ℤ~intercal~⊺~intlarhk~⨗~intprod~⨼~iocy~ё~iogon~į~iopf~𝕚~iprod~⨼~iscr~𝒾~isinE~⋹~isindot~⋵~isins~⋴~isinsv~⋳~isinv~∈~it~⁢~itilde~ĩ~iukcy~і~jcirc~ĵ~jcy~й~jfr~𝔧~jmath~ȷ~jopf~𝕛~jscr~𝒿~jsercy~ј~jukcy~є~kappav~ϰ~kcedil~ķ~kcy~к~kfr~𝔨~kgreen~ĸ~khcy~х~kjcy~ќ~kopf~𝕜~kscr~𝓀~lAarr~⇚~lAtail~⤛~lBarr~⤎~lE~≦~lEg~⪋~lHar~⥢~lacute~ĺ~laemptyv~⦴~lagran~ℒ~langd~⦑~langle~⟨~lap~⪅~larrb~⇤~larrbfs~⤟~larrfs~⤝~larrhk~↩~larrlp~↫~larrpl~⤹~larrsim~⥳~larrtl~↢~lat~⪫~latail~⤙~late~⪭~lates~⪭︀~lbarr~⤌~lbbrk~❲~lbrace~{~lbrack~[~lbrke~⦋~lbrksld~⦏~lbrkslu~⦍~lcaron~ľ~lcedil~ļ~lcub~{~lcy~л~ldca~⤶~ldquor~„~ldrdhar~⥧~ldrushar~⥋~ldsh~↲~leftarrow~←~leftarrowtail~↢~leftharpoondown~↽~leftharpoonup~↼~leftleftarrows~⇇~leftrightarrow~↔~leftrightarrows~⇆~leftrightharpoons~⇋~leftrightsquigarrow~↭~leftthreetimes~⋋~leg~⋚~leq~≤~leqq~≦~leqslant~⩽~les~⩽~lescc~⪨~lesdot~⩿~lesdoto~⪁~lesdotor~⪃~lesg~⋚︀~lesges~⪓~lessapprox~⪅~lessdot~⋖~lesseqgtr~⋚~lesseqqgtr~⪋~lessgtr~≶~lesssim~≲~lfisht~⥼~lfr~𝔩~lg~≶~lgE~⪑~lhard~↽~lharu~↼~lharul~⥪~lhblk~▄~ljcy~љ~ll~≪~llarr~⇇~llcorner~⌞~llhard~⥫~lltri~◺~lmidot~ŀ~lmoust~⎰~lmoustache~⎰~lnE~≨~lnap~⪉~lnapprox~⪉~lne~⪇~lneq~⪇~lneqq~≨~lnsim~⋦~loang~⟬~loarr~⇽~lobrk~⟦~longleftarrow~⟵~longleftrightarrow~⟷~longmapsto~⟼~longrightarrow~⟶~looparrowleft~↫~looparrowright~↬~lopar~⦅~lopf~𝕝~loplus~⨭~lotimes~⨴~lowbar~_~lozenge~◊~lozf~⧫~lpar~(~lparlt~⦓~lrarr~⇆~lrcorner~⌟~lrhar~⇋~lrhard~⥭~lrtri~⊿~lscr~𝓁~lsh~↰~lsim~≲~lsime~⪍~lsimg~⪏~lsqb~[~lsquor~‚~lstrok~ł~ltcc~⪦~ltcir~⩹~ltdot~⋖~lthree~⋋~ltimes~⋉~ltlarr~⥶~ltquest~⩻~ltrPar~⦖~ltri~◃~ltrie~⊴~ltrif~◂~lurdshar~⥊~luruhar~⥦~lvertneqq~≨︀~lvnE~≨︀~mDDot~∺~male~♂~malt~✠~maltese~✠~map~↦~mapsto~↦~mapstodown~↧~mapstoleft~↤~mapstoup~↥~marker~▮~mcomma~⨩~mcy~м~measuredangle~∡~mfr~𝔪~mho~℧~mid~∣~midast~*~midcir~⫰~minusb~⊟~minusd~∸~minusdu~⨪~mlcp~⫛~mldr~…~mnplus~∓~models~⊧~mopf~𝕞~mp~∓~mscr~𝓂~mstpos~∾~multimap~⊸~mumap~⊸~nGg~⋙̸~nGt~≫⃒~nGtv~≫̸~nLeftarrow~⇍~nLeftrightarrow~⇎~nLl~⋘̸~nLt~≪⃒~nLtv~≪̸~nRightarrow~⇏~nVDash~⊯~nVdash~⊮~nacute~ń~nang~∠⃒~nap~≉~napE~⩰̸~napid~≋̸~napos~ŉ~napprox~≉~natur~♮~natural~♮~naturals~ℕ~nbump~≎̸~nbumpe~≏̸~ncap~⩃~ncaron~ň~ncedil~ņ~ncong~≇~ncongdot~⩭̸~ncup~⩂~ncy~н~neArr~⇗~nearhk~⤤~nearr~↗~nearrow~↗~nedot~≐̸~nequiv~≢~nesear~⤨~nesim~≂̸~nexist~∄~nexists~∄~nfr~𝔫~ngE~≧̸~nge~≱~ngeq~≱~ngeqq~≧̸~ngeqslant~⩾̸~nges~⩾̸~ngsim~≵~ngt~≯~ngtr~≯~nhArr~⇎~nharr~↮~nhpar~⫲~nis~⋼~nisd~⋺~niv~∋~njcy~њ~nlArr~⇍~nlE~≦̸~nlarr~↚~nldr~‥~nle~≰~nleftarrow~↚~nleftrightarrow~↮~nleq~≰~nleqq~≦̸~nleqslant~⩽̸~nles~⩽̸~nless~≮~nlsim~≴~nlt~≮~nltri~⋪~nltrie~⋬~nmid~∤~nopf~𝕟~notinE~⋹̸~notindot~⋵̸~notinva~∉~notinvb~⋷~notinvc~⋶~notni~∌~notniva~∌~notnivb~⋾~notnivc~⋽~npar~∦~nparallel~∦~nparsl~⫽⃥~npart~∂̸~npolint~⨔~npr~⊀~nprcue~⋠~npre~⪯̸~nprec~⊀~npreceq~⪯̸~nrArr~⇏~nrarr~↛~nrarrc~⤳̸~nrarrw~↝̸~nrightarrow~↛~nrtri~⋫~nrtrie~⋭~nsc~⊁~nsccue~⋡~nsce~⪰̸~nscr~𝓃~nshortmid~∤~nshortparallel~∦~nsim~≁~nsime~≄~nsimeq~≄~nsmid~∤~nspar~∦~nsqsube~⋢~nsqsupe~⋣~nsubE~⫅̸~nsube~⊈~nsubset~⊂⃒~nsubseteq~⊈~nsubseteqq~⫅̸~nsucc~⊁~nsucceq~⪰̸~nsup~⊅~nsupE~⫆̸~nsupe~⊉~nsupset~⊃⃒~nsupseteq~⊉~nsupseteqq~⫆̸~ntgl~≹~ntlg~≸~ntriangleleft~⋪~ntrianglelefteq~⋬~ntriangleright~⋫~ntrianglerighteq~⋭~num~#~numero~№~numsp~ ~nvDash~⊭~nvHarr~⤄~nvap~≍⃒~nvdash~⊬~nvge~≥⃒~nvgt~>⃒~nvinfin~⧞~nvlArr~⤂~nvle~≤⃒~nvlt~<⃒~nvltrie~⊴⃒~nvrArr~⤃~nvrtrie~⊵⃒~nvsim~∼⃒~nwArr~⇖~nwarhk~⤣~nwarr~↖~nwarrow~↖~nwnear~⤧~oS~Ⓢ~oast~⊛~ocir~⊚~ocy~о~odash~⊝~odblac~ő~odiv~⨸~odot~⊙~odsold~⦼~ofcir~⦿~ofr~𝔬~ogon~˛~ogt~⧁~ohbar~⦵~ohm~Ω~oint~∮~olarr~↺~olcir~⦾~olcross~⦻~olt~⧀~omacr~ō~omid~⦶~ominus~⊖~oopf~𝕠~opar~⦷~operp~⦹~orarr~↻~ord~⩝~order~ℴ~orderof~ℴ~origof~⊶~oror~⩖~orslope~⩗~orv~⩛~oscr~ℴ~osol~⊘~otimesas~⨶~ovbar~⌽~par~∥~parallel~∥~parsim~⫳~parsl~⫽~pcy~п~percnt~%~period~.~pertenk~‱~pfr~𝔭~phiv~ϕ~phmmat~ℳ~phone~☎~pitchfork~⋔~planck~ℏ~planckh~ℎ~plankv~ℏ~plus~+~plusacir~⨣~plusb~⊞~pluscir~⨢~plusdo~∔~plusdu~⨥~pluse~⩲~plussim~⨦~plustwo~⨧~pm~±~pointint~⨕~popf~𝕡~pr~≺~prE~⪳~prap~⪷~prcue~≼~pre~⪯~prec~≺~precapprox~⪷~preccurlyeq~≼~preceq~⪯~precnapprox~⪹~precneqq~⪵~precnsim~⋨~precsim~≾~primes~ℙ~prnE~⪵~prnap~⪹~prnsim~⋨~profalar~⌮~profline~⌒~profsurf~⌓~propto~∝~prsim~≾~prurel~⊰~pscr~𝓅~puncsp~ ~qfr~𝔮~qint~⨌~qopf~𝕢~qprime~⁗~qscr~𝓆~quaternions~ℍ~quatint~⨖~quest~?~questeq~≟~rAarr~⇛~rAtail~⤜~rBarr~⤏~rHar~⥤~race~∽̱~racute~ŕ~raemptyv~⦳~rangd~⦒~range~⦥~rangle~⟩~rarrap~⥵~rarrb~⇥~rarrbfs~⤠~rarrc~⤳~rarrfs~⤞~rarrhk~↪~rarrlp~↬~rarrpl~⥅~rarrsim~⥴~rarrtl~↣~rarrw~↝~ratail~⤚~ratio~∶~rationals~ℚ~rbarr~⤍~rbbrk~❳~rbrace~}~rbrack~]~rbrke~⦌~rbrksld~⦎~rbrkslu~⦐~rcaron~ř~rcedil~ŗ~rcub~}~rcy~р~rdca~⤷~rdldhar~⥩~rdquor~”~rdsh~↳~realine~ℛ~realpart~ℜ~reals~ℝ~rect~▭~rfisht~⥽~rfr~𝔯~rhard~⇁~rharu~⇀~rharul~⥬~rhov~ϱ~rightarrow~→~rightarrowtail~↣~rightharpoondown~⇁~rightharpoonup~⇀~rightleftarrows~⇄~rightleftharpoons~⇌~rightrightarrows~⇉~rightsquigarrow~↝~rightthreetimes~⋌~ring~˚~risingdotseq~≓~rlarr~⇄~rlhar~⇌~rmoust~⎱~rmoustache~⎱~rnmid~⫮~roang~⟭~roarr~⇾~robrk~⟧~ropar~⦆~ropf~𝕣~roplus~⨮~rotimes~⨵~rpar~)~rpargt~⦔~rppolint~⨒~rrarr~⇉~rscr~𝓇~rsh~↱~rsqb~]~rsquor~’~rthree~⋌~rtimes~⋊~rtri~▹~rtrie~⊵~rtrif~▸~rtriltri~⧎~ruluhar~⥨~rx~℞~sacute~ś~sc~≻~scE~⪴~scap~⪸~sccue~≽~sce~⪰~scedil~ş~scirc~ŝ~scnE~⪶~scnap~⪺~scnsim~⋩~scpolint~⨓~scsim~≿~scy~с~sdotb~⊡~sdote~⩦~seArr~⇘~searhk~⤥~searr~↘~searrow~↘~semi~;~seswar~⤩~setminus~∖~setmn~∖~sext~✶~sfr~𝔰~sfrown~⌢~sharp~♯~shchcy~щ~shcy~ш~shortmid~∣~shortparallel~∥~sigmav~ς~simdot~⩪~sime~≃~simeq~≃~simg~⪞~simgE~⪠~siml~⪝~simlE~⪟~simne~≆~simplus~⨤~simrarr~⥲~slarr~←~smallsetminus~∖~smashp~⨳~smeparsl~⧤~smid~∣~smile~⌣~smt~⪪~smte~⪬~smtes~⪬︀~softcy~ь~sol~/~solb~⧄~solbar~⌿~sopf~𝕤~spadesuit~♠~spar~∥~sqcap~⊓~sqcaps~⊓︀~sqcup~⊔~sqcups~⊔︀~sqsub~⊏~sqsube~⊑~sqsubset~⊏~sqsubseteq~⊑~sqsup~⊐~sqsupe~⊒~sqsupset~⊐~sqsupseteq~⊒~squ~□~square~□~squarf~▪~squf~▪~srarr~→~sscr~𝓈~ssetmn~∖~ssmile~⌣~sstarf~⋆~star~☆~starf~★~straightepsilon~ϵ~straightphi~ϕ~strns~¯~subE~⫅~subdot~⪽~subedot~⫃~submult~⫁~subnE~⫋~subne~⊊~subplus~⪿~subrarr~⥹~subset~⊂~subseteq~⊆~subseteqq~⫅~subsetneq~⊊~subsetneqq~⫋~subsim~⫇~subsub~⫕~subsup~⫓~succ~≻~succapprox~⪸~succcurlyeq~≽~succeq~⪰~succnapprox~⪺~succneqq~⪶~succnsim~⋩~succsim~≿~sung~♪~supE~⫆~supdot~⪾~supdsub~⫘~supedot~⫄~suphsol~⟉~suphsub~⫗~suplarr~⥻~supmult~⫂~supnE~⫌~supne~⊋~supplus~⫀~supset~⊃~supseteq~⊇~supseteqq~⫆~supsetneq~⊋~supsetneqq~⫌~supsim~⫈~supsub~⫔~supsup~⫖~swArr~⇙~swarhk~⤦~swarr~↙~swarrow~↙~swnwar~⤪~target~⌖~tbrk~⎴~tcaron~ť~tcedil~ţ~tcy~т~tdot~⃛~telrec~⌕~tfr~𝔱~therefore~∴~thetav~ϑ~thickapprox~≈~thicksim~∼~thkap~≈~thksim~∼~timesb~⊠~timesbar~⨱~timesd~⨰~tint~∭~toea~⤨~top~⊤~topbot~⌶~topcir~⫱~topf~𝕥~topfork~⫚~tosa~⤩~tprime~‴~triangle~▵~triangledown~▿~triangleleft~◃~trianglelefteq~⊴~triangleq~≜~triangleright~▹~trianglerighteq~⊵~tridot~◬~trie~≜~triminus~⨺~triplus~⨹~trisb~⧍~tritime~⨻~trpezium~⏢~tscr~𝓉~tscy~ц~tshcy~ћ~tstrok~ŧ~twixt~≬~twoheadleftarrow~↞~twoheadrightarrow~↠~uHar~⥣~ubrcy~ў~ubreve~ŭ~ucy~у~udarr~⇅~udblac~ű~udhar~⥮~ufisht~⥾~ufr~𝔲~uharl~↿~uharr~↾~uhblk~▀~ulcorn~⌜~ulcorner~⌜~ulcrop~⌏~ultri~◸~umacr~ū~uogon~ų~uopf~𝕦~uparrow~↑~updownarrow~↕~upharpoonleft~↿~upharpoonright~↾~uplus~⊎~upsi~υ~upuparrows~⇈~urcorn~⌝~urcorner~⌝~urcrop~⌎~uring~ů~urtri~◹~uscr~𝓊~utdot~⋰~utilde~ũ~utri~▵~utrif~▴~uuarr~⇈~uwangle~⦧~vArr~⇕~vBar~⫨~vBarv~⫩~vDash~⊨~vangrt~⦜~varepsilon~ϵ~varkappa~ϰ~varnothing~∅~varphi~ϕ~varpi~ϖ~varpropto~∝~varr~↕~varrho~ϱ~varsigma~ς~varsubsetneq~⊊︀~varsubsetneqq~⫋︀~varsupsetneq~⊋︀~varsupsetneqq~⫌︀~vartheta~ϑ~vartriangleleft~⊲~vartriangleright~⊳~vcy~в~vdash~⊢~vee~∨~veebar~⊻~veeeq~≚~vellip~⋮~verbar~|~vert~|~vfr~𝔳~vltri~⊲~vnsub~⊂⃒~vnsup~⊃⃒~vopf~𝕧~vprop~∝~vrtri~⊳~vscr~𝓋~vsubnE~⫋︀~vsubne~⊊︀~vsupnE~⫌︀~vsupne~⊋︀~vzigzag~⦚~wcirc~ŵ~wedbar~⩟~wedge~∧~wedgeq~≙~wfr~𝔴~wopf~𝕨~wp~℘~wr~≀~wreath~≀~wscr~𝓌~xcap~⋂~xcirc~◯~xcup~⋃~xdtri~▽~xfr~𝔵~xhArr~⟺~xharr~⟷~xlArr~⟸~xlarr~⟵~xmap~⟼~xnis~⋻~xodot~⨀~xopf~𝕩~xoplus~⨁~xotime~⨂~xrArr~⟹~xrarr~⟶~xscr~𝓍~xsqcup~⨆~xuplus~⨄~xutri~△~xvee~⋁~xwedge~⋀~yacy~я~ycirc~ŷ~ycy~ы~yfr~𝔶~yicy~ї~yopf~𝕪~yscr~𝓎~yucy~ю~zacute~ź~zcaron~ž~zcy~з~zdot~ż~zeetrf~ℨ~zfr~𝔷~zhcy~ж~zigrarr~⇝~zopf~𝕫~zscr~𝓏~~AMP~&~COPY~©~GT~>~LT~<~QUOT~"~REG~®', Pe.html4);
var Tc = {
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
}, Rc = String.fromCodePoint || function(t) {
  return String.fromCharCode(Math.floor((t - 65536) / 1024) + 55296, (t - 65536) % 1024 + 56320);
}, $e = function() {
  return $e = Object.assign || function(t) {
    for (var e, n = 1, r = arguments.length; n < r; n++) {
      e = arguments[n];
      for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    }
    return t;
  }, $e.apply(this, arguments);
}, Nc = $e($e({}, Pe), { all: Pe.html5 }), Dc = {
  scope: "body",
  level: "all"
}, cn = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);/g, un = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+)[;=]?/g, _r = {
  xml: {
    strict: cn,
    attribute: un,
    body: ln.xml
  },
  html4: {
    strict: cn,
    attribute: un,
    body: ln.html4
  },
  html5: {
    strict: cn,
    attribute: un,
    body: ln.html5
  }
}, Ic = $e($e({}, _r), { all: _r.html5 }), hs = String.fromCharCode, Fc = hs(65533);
function Lc(t, e, n, r) {
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
      i = c >= 1114111 ? Fc : c > 65535 ? Rc(c) : hs(Tc[c] || c);
    }
  }
  return i;
}
function Br(t, e) {
  var n = e === void 0 ? Dc : e, r = n.level, i = r === void 0 ? "all" : r, s = n.scope, o = s === void 0 ? i === "xml" ? "strict" : "body" : s;
  if (!t)
    return "";
  var a = Ic[i][o], c = Nc[i].entities, l = o === "attribute", u = o === "strict";
  return t.replace(a, function(h) {
    return Lc(h, c, l, u);
  });
}
var Pc = { strictlyTwoElementsInRangeArrays: !1, progressFn: null };
function Dt(t, e) {
  if (!Array.isArray(t) || !t.length) return t;
  let n = { ...Pc, ...e }, r, i;
  if (n.strictlyTwoElementsInRangeArrays && !t.every((a, c) => !Array.isArray(a) || a.length !== 2 ? (r = c, i = a.length, !1) : !0)) throw new TypeError(`ranges-sort: [THROW_ID_03] The first argument should be an array and must consist of arrays which are natural number indexes representing TWO string index ranges. However, ${r}th range (${JSON.stringify(t[r], null, 4)}) has not two but ${i} elements!`);
  if (!t.every((a, c) => !Array.isArray(a) || !Number.isInteger(a[0]) || a[0] < 0 || !Number.isInteger(a[1]) || a[1] < 0 ? (r = c, !1) : !0)) throw new TypeError(`ranges-sort: [THROW_ID_04] The first argument should be an array and must consist of arrays which are natural number indexes representing string index ranges. However, ${r}th range (${JSON.stringify(t[r], null, 4)}) does not consist of only natural numbers!`);
  let s = t.length ** 2, o = 0;
  return Array.from(t).sort((a, c) => (n.progressFn && (o += 1, n.progressFn(Math.floor(o * 100 / s))), a[0] === c[0] ? a[1] < c[1] ? -1 : a[1] > c[1] ? 1 : 0 : a[0] < c[0] ? -1 : 1));
}
var Ur = { mergeType: 1, progressFn: null, joinRangesThatTouchEdges: !0 };
function $c(t, e) {
  function n(l) {
    return !!l && typeof l == "object" && !Array.isArray(l);
  }
  if (!Array.isArray(t) || !t.length) return null;
  let r;
  if (e) if (n(e)) {
    if (r = { ...Ur, ...e }, r.progressFn && n(r.progressFn) && !Object.keys(r.progressFn).length) r.progressFn = null;
    else if (r.progressFn && typeof r.progressFn != "function") throw new Error(`ranges-merge: [THROW_ID_01] opts.progressFn must be a function! It was given of a type: "${typeof r.progressFn}", equal to ${JSON.stringify(r.progressFn, null, 4)}`);
    if (![1, 2, "1", "2"].includes(r.mergeType)) throw new Error(`ranges-merge: [THROW_ID_02] opts.mergeType was customised to a wrong thing! It was given of a type: "${typeof r.mergeType}", equal to ${JSON.stringify(r.mergeType, null, 4)}`);
    if (typeof r.joinRangesThatTouchEdges != "boolean") throw new Error(`ranges-merge: [THROW_ID_04] opts.joinRangesThatTouchEdges was customised to a wrong thing! It was given of a type: "${typeof r.joinRangesThatTouchEdges}", equal to ${JSON.stringify(r.joinRangesThatTouchEdges, null, 4)}`);
  } else throw new Error(`emlint: [THROW_ID_03] the second input argument must be a plain object. It was given as:
${JSON.stringify(e, null, 4)} (type ${typeof e})`);
  else r = { ...Ur };
  let i = t.filter((l) => Array.isArray(l)).map((l) => [...l]).filter((l) => l[2] !== void 0 || l[0] !== l[1]), s, o, a;
  r.progressFn ? s = Dt(i, { progressFn: (l) => {
    a = Math.floor(l / 5), a !== o && (o = a, r.progressFn(a));
  } }) : s = Dt(i);
  let c = s.length - 1;
  for (let l = c; l > 0; l--) r.progressFn && (a = Math.floor((1 - l / c) * 78) + 21, a !== o && a > o && (o = a, r.progressFn(a))), (s[l][0] <= s[l - 1][0] || !r.joinRangesThatTouchEdges && s[l][0] < s[l - 1][1] || r.joinRangesThatTouchEdges && s[l][0] <= s[l - 1][1]) && (s[l - 1][0] = Math.min(s[l][0], s[l - 1][0]), s[l - 1][1] = Math.max(s[l][1], s[l - 1][1]), s[l][2] !== void 0 && (s[l - 1][0] >= s[l][0] || s[l - 1][1] <= s[l][1]) && s[l - 1][2] !== null && (s[l][2] === null && s[l - 1][2] !== null ? s[l - 1][2] = null : s[l - 1][2] != null ? +r.mergeType == 2 && s[l - 1][0] === s[l][0] ? s[l - 1][2] = s[l][2] : s[l - 1][2] += s[l][2] : s[l - 1][2] = s[l][2]), s.splice(l, 1), l = s.length);
  return s.length ? s : null;
}
var _c = {}, Bc = _c.NODE_ENV === "production", qr = "Invariant failed";
function Uc(t, e) {
  if (!t) {
    if (Bc)
      throw new Error(qr);
    var n = qr;
    throw new Error(n);
  }
}
function qc(t, e, n) {
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
  let i = $c(r, { progressFn: (o) => {
  } });
  Uc(i);
  let s = i.length;
  if (s > 0) {
    let o = t.slice(i[s - 1][1]);
    t = i.reduce((a, c, l, u) => {
      let h = l === 0 ? 0 : u[l - 1][1], d = u[l][0];
      return `${a}${t.slice(h, d)}${u[l][2] || ""}`;
    }, ""), t += o;
  }
  return t;
}
function hn(t, e = 1) {
  let n = " ";
  function r(s) {
    return Array.from(s).reverse().join("");
  }
  function i(s, o, a) {
    let c = a ? `
` : "\r", l = a ? "\r" : `
`;
    if (!s) return s;
    let u = 0, h = "";
    for (let d = 0, g = s.length; d < g; d++) (s[d] === c || s[d] === l && s[d - 1] !== c) && u++, `\r
`.includes(s[d]) || s[d] === n ? s[d] === n ? h += s[d] : s[d] === c ? u <= o && (h += s[d], s[d + 1] === l && (h += s[d + 1], d++)) : s[d] === l && s?.[d - 1] !== c && u <= o && (h += s[d]) : !s[d + 1] && !u && (h += " ");
    return h;
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
var zr = { mergeType: 1, progressFn: null, joinRangesThatTouchEdges: !0 };
function zc(t, e) {
  function n(l) {
    return !!l && typeof l == "object" && !Array.isArray(l);
  }
  if (!Array.isArray(t) || !t.length) return null;
  let r;
  if (e) if (n(e)) {
    if (r = { ...zr, ...e }, r.progressFn && n(r.progressFn) && !Object.keys(r.progressFn).length) r.progressFn = null;
    else if (r.progressFn && typeof r.progressFn != "function") throw new Error(`ranges-merge: [THROW_ID_01] resolvedOpts.progressFn must be a function! It was given of a type: "${typeof r.progressFn}", equal to ${JSON.stringify(r.progressFn, null, 4)}`);
    if (![1, 2, "1", "2"].includes(r.mergeType)) throw new Error(`ranges-merge: [THROW_ID_02] resolvedOpts.mergeType was customised to a wrong thing! It was given of a type: "${typeof r.mergeType}", equal to ${JSON.stringify(r.mergeType, null, 4)}`);
    if (typeof r.joinRangesThatTouchEdges != "boolean") throw new Error(`ranges-merge: [THROW_ID_04] resolvedOpts.joinRangesThatTouchEdges was customised to a wrong thing! It was given of a type: "${typeof r.joinRangesThatTouchEdges}", equal to ${JSON.stringify(r.joinRangesThatTouchEdges, null, 4)}`);
  } else throw new Error(`ranges-merge: [THROW_ID_03] the second input argument must be a plain object. It was given as:
${JSON.stringify(e, null, 4)} (type ${typeof e})`);
  else r = { ...zr };
  let i = t.filter((l) => Array.isArray(l)).map((l) => [...l]).filter((l) => l[2] !== void 0 || l[0] !== l[1]), s, o, a;
  r.progressFn ? s = Dt(i, { progressFn: (l) => {
    a = Math.floor(l / 5), a !== o && (o = a, r.progressFn != null && r.progressFn(a));
  } }) : s = Dt(i);
  let c = s.length - 1;
  for (let l = c; l > 0; l--) r.progressFn && (a = Math.floor((1 - l / c) * 78) + 21, a !== o && a > o && (o = a, r.progressFn(a))), (s[l][0] <= s[l - 1][0] || !r.joinRangesThatTouchEdges && s[l][0] < s[l - 1][1] || r.joinRangesThatTouchEdges && s[l][0] <= s[l - 1][1]) && (s[l - 1][0] = Math.min(s[l][0], s[l - 1][0]), s[l - 1][1] = Math.max(s[l][1], s[l - 1][1]), s[l][2] !== void 0 && (s[l - 1][0] >= s[l][0] || s[l - 1][1] <= s[l][1]) && s[l - 1][2] !== null && (s[l][2] === null && s[l - 1][2] !== null ? s[l - 1][2] = null : s[l - 1][2] != null ? +(r || {})?.mergeType == 2 && s[l - 1][0] === s[l][0] ? s[l - 1][2] = s[l][2] : s[l - 1][2] += s[l][2] : s[l - 1][2] = s[l][2]), s.splice(l, 1), l = s.length);
  return s.length ? s : null;
}
var jc = { limitToBeAddedWhitespace: !1, limitLinebreaksCount: 1, mergeType: 1 }, Vc = class {
  constructor(e) {
    let n = { ...jc, ...e };
    if (n.mergeType && n.mergeType !== 1 && n.mergeType !== 2) if (ke(n.mergeType) && n.mergeType.trim() === "1") n.mergeType = 1;
    else if (ke(n.mergeType) && n.mergeType.trim() === "2") n.mergeType = 2;
    else throw new Error(`ranges-push: [THROW_ID_02] opts.mergeType was customised to a wrong thing! It was given of a type: "${typeof n.mergeType}", equal to ${JSON.stringify(n.mergeType, null, 4)}`);
    this.opts = n, this.ranges = [];
  }
  ranges;
  opts;
  add(e, n, r) {
    if (e == null && n == null) return;
    if (se(e) && !se(n)) {
      if (Array.isArray(e)) {
        if (e.length) {
          if (e.some((o) => Array.isArray(o))) {
            e.forEach((o) => {
              Array.isArray(o) && this.add(...o);
            });
            return;
          }
          e.length && we(+e[0]) && we(+e[1]) && this.add(...e);
        }
        return;
      }
      throw new TypeError(`ranges-push/Ranges/add(): [THROW_ID_12] the first input argument, "from" is set (${JSON.stringify(e, null, 0)}) but second-one, "to" is not (${JSON.stringify(n, null, 0)})`);
    } else if (!se(e) && se(n)) throw new TypeError(`ranges-push/Ranges/add(): [THROW_ID_13] the second input argument, "to" is set (${JSON.stringify(n, null, 0)}) but first-one, "from" is not (${JSON.stringify(e, null, 0)})`);
    let i = +e, s = +n;
    if (we(i) && we(s)) {
      if (se(r) && !ke(r) && !bo(r)) throw new TypeError(`ranges-push/Ranges/add(): [THROW_ID_08] The third argument, the value to add, was given not as string but ${typeof r}, equal to:
${JSON.stringify(r, null, 4)}`);
      if (se(this.ranges) && Array.isArray(this.last()) && i === this.last()[1]) {
        if (this.last()[1] = s, this.last()[2], this.last()[2] !== null && se(r)) {
          let o = this.last()[2] && this.last()[2].length && (!this.opts?.mergeType || this.opts.mergeType === 1) ? `${this.last()[2]}${r}` : r;
          this.opts.limitToBeAddedWhitespace && (o = hn(o, this.opts.limitLinebreaksCount)), ke(o) && !o.length || (this.last()[2] = o);
        }
      } else {
        this.ranges || (this.ranges = []);
        let o = r !== void 0 && !(ke(r) && !r.length) ? [i, s, r && this.opts.limitToBeAddedWhitespace ? hn(r, this.opts.limitLinebreaksCount) : r] : [i, s];
        this.ranges.push(o);
      }
    } else throw we(i) && i >= 0 ? new TypeError(`ranges-push/Ranges/add(): [THROW_ID_10] "to" value, the second input argument, must be a natural number or zero! Currently it's of a type "${typeof s}" equal to: ${JSON.stringify(s, null, 4)}`) : new TypeError(`ranges-push/Ranges/add(): [THROW_ID_09] "from" value, the first input argument, must be a natural number or zero! Currently it's of a type "${typeof i}" equal to: ${JSON.stringify(i, null, 4)}`);
  }
  push(e, n, r) {
    this.add(e, n, r);
  }
  current() {
    return Array.isArray(this.ranges) && this.ranges.length ? (this.ranges = zc(this.ranges, { mergeType: this.opts.mergeType }), this.ranges && this.opts.limitToBeAddedWhitespace ? this.ranges.map((e) => se(e[2]) ? [e[0], e[1], hn(e[2], this.opts.limitLinebreaksCount)] : e) : this.ranges) : null;
  }
  wipe() {
    this.ranges = [];
  }
  replace(e) {
    if (Array.isArray(e) && e.length) if (Array.isArray(e[0]) && we(e[0][0])) this.ranges = Array.from(e);
    else throw new Error(`ranges-push/Ranges/replace(): [THROW_ID_11] Single range was given but we expected array of arrays! The first element, ${JSON.stringify(e[0], null, 4)} should be an array and its first element should be an integer, a string index.`);
    else this.ranges = [];
  }
  last() {
    return Array.isArray(this.ranges) && this.ranges.length ? this.ranges[this.ranges.length - 1] : null;
  }
};
Qi();
var dn = " ";
function Mc({ str: t, idx: e = 0, stopAtNewlines: n = !1, stopAtRawNbsp: r = !1 }) {
  if (typeof t != "string" || !t.length || ((!e || typeof e != "number") && (e = 0), !t[e + 1])) return null;
  if (t[e + 1] && (t[e + 1].trim() || n && `
\r`.includes(t[e + 1]) || r && t[e + 1] === dn)) return e + 1;
  if (t[e + 2] && (t[e + 2].trim() || n && `
\r`.includes(t[e + 2]) || r && t[e + 2] === dn)) return e + 2;
  for (let i = e + 1, s = t.length; i < s; i++) if (t[i].trim() || n && `
\r`.includes(t[i]) || r && t[i] === dn) return i;
  return null;
}
function Y(t, e = 0) {
  return Mc({ str: t, idx: e, stopAtNewlines: !1, stopAtRawNbsp: !1 });
}
function Hc(t) {
  return /[-_A-Za-z0-9]/.test(t);
}
function jr(t, e) {
  if (!t) return [];
  if (Array.isArray(t)) return t.filter((n) => typeof n == "string" && n.trim());
  if (typeof t == "string") return t.trim() ? [t] : [];
  throw new TypeError(`string-strip-html/stripHtml(): [THROW_ID_05] ${e} must be array containing zero or more strings or something falsey. Currently it's equal to: ${t}, that a type of ${typeof t}.`);
}
function dt(t, e, n, r) {
  for (let i = e, s = t.length; i < s; i++) {
    if (t.startsWith(n, i)) return !0;
    if (t.startsWith(r, i)) return !1;
  }
  return !1;
}
function Vr(t, e, n) {
  return t?.quotes, t?.quotes?.value && dt(e, n + 1, t.quotes.value, ">"), t?.quotes?.next, dt(e, t?.quotes?.next - 1, t?.quotes?.value, ">"), !t?.quotes || !dt(e, n + 1, t.quotes.value, ">") && t?.quotes?.next !== -1 && dt(e, t?.quotes?.next - 1, t?.quotes?.value, ">");
}
function Wc(t, e) {
  return (e.match(new RegExp(t, "g")) || []).length;
}
var Ve = /* @__PURE__ */ new Set(["!doctype", "abbr", "address", "area", "article", "aside", "audio", "base", "bdi", "bdo", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "doctype", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "math", "menu", "menuitem", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "param", "picture", "pre", "progress", "rb", "rp", "rt", "rtc", "ruby", "samp", "script", "section", "select", "slot", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "svg", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "ul", "var", "video", "wbr", "xml"]), fn = /* @__PURE__ */ new Set(["a", "b", "i", "p", "q", "s", "u"]), gn = /* @__PURE__ */ new Set([".", ",", ";", "!", "?"]), Mr = /* @__PURE__ */ new Set([".", ",", "?", ";", ")", "…", '"', "»"]), Gc = /* @__PURE__ */ new Set(["a", "abbr", "acronym", "audio", "b", "bdi", "bdo", "big", "button", "canvas", "cite", "code", "data", "datalist", "del", "dfn", "em", "embed", "i", "iframe", "input", "ins", "kbd", "label", "map", "mark", "meter", "noscript", "object", "output", "picture", "progress", "q", "ruby", "s", "samp", "select", "slot", "small", "span", "strong", "sub", "sup", "svg", "template", "textarea", "time", "u", "tt", "var", "video", "wbr"]), Hr = { ignoreTags: [], ignoreTagsWithTheirContents: [], onlyStripTags: [], stripTogetherWithTheirContents: ["script", "style", "xml"], skipHtmlDecoding: !1, trimOnlySpaces: !1, stripRecognisedHTMLOnly: !1, dumpLinkHrefsNearby: { enabled: !1, putOnNewLine: !1, wrapHeads: "", wrapTails: "" }, ignoreIndentations: !1, cb: null, reportProgressFunc: null, reportProgressFuncFrom: 0, reportProgressFuncTo: 100 };
function ds(t, e) {
  let n = Date.now(), r = [], i = [], s = [], o = [], a = {};
  function c() {
    a = { attributes: [] };
  }
  c();
  let l = null, u = null, h = null, d = !1, g = {}, p = { tagName: "", hrefValue: "", openingTagEnds: void 0 }, m = "", b = !1, x = null, A = !0;
  function S(f, v, C) {
    if (Array.isArray(v.stripTogetherWithTheirContents) && (v.stripTogetherWithTheirContents.includes(a.name) || v.stripTogetherWithTheirContents.includes("*"))) if (a.slashPresent && Array.isArray(r) && r.some((E) => E.name === a.name)) {
      for (let E = r.length; E--; ) if (r[E].name === a.name) {
        o = o.filter(([N, B]) => (N < r[E].lastOpeningBracketAt || N >= f + 1) && (B <= r[E].lastOpeningBracketAt || B > f + 1));
        let F = f + 1;
        a.lastClosingBracketAt && (F = a.lastClosingBracketAt + 1), o.push([r[E].lastOpeningBracketAt, F]), Mr.has(t[f]) && v.cb ? v.cb({ tag: a, deleteFrom: r[E].lastOpeningBracketAt, deleteTo: f + 1, insert: null, rangesArr: C, proposedReturn: [r[E].lastOpeningBracketAt, f, null] }) : v.cb && v.cb({ tag: a, deleteFrom: r[E].lastOpeningBracketAt, deleteTo: f, insert: "", rangesArr: C, proposedReturn: [r[E].lastOpeningBracketAt, f, ""] }), r.splice(E, 1);
        break;
      }
    } else a.slashPresent || r.push(a);
    else Array.isArray(v.ignoreTagsWithTheirContents) && X(f, v, a) && (A = !1);
  }
  function w(f, v, C, E, F, N) {
    if (Array.isArray(k.current()) && typeof C == "number" && k.current()[0][0] === 0 && k.current()[0][1] >= C) return "";
    if (t.length === E && N && !y?.dumpLinkHrefsNearby?.enabled) return null;
    let B = "";
    if (Number.isInteger(C) && C < F && (B += f.slice(C, F)), Number.isInteger(E) && E > N + 1) {
      let Z = f.slice(N + 1, E);
      E && !Y(t, E - 1) && (Z = Z.trimEnd()), Z.includes(`
`) && I(E, f) ? B += " " : B += Z;
    }
    let ve = !Mr.has(f[v]), wr = f[E - 1] !== ">" || !f[C].trim(), xr = !['"', "("].includes(f[F - 1]), Ba = ![";", ".", ":", "!"].includes(f[v]);
    if ((ve || wr && xr && Ba) && (wr || xr) && f[v] !== "!" && (!Gc.has(a.name) || typeof C == "number" && C < F || typeof E == "number" && E > N + 1)) {
      let Z = B.match(/\n/g);
      return Array.isArray(Z) && Z.length ? Z.length === 1 ? `
` : Z.length === 2 ? `

` : `


` : " ";
    }
    return "";
  }
  function T(f, v) {
    if (f.dumpLinkHrefsNearby?.enabled && p.tagName && p.tagName === a.name && a.lastOpeningBracketAt && (p.openingTagEnds && a.lastOpeningBracketAt > p.openingTagEnds || !p.openingTagEnds) && (b = !0), b) {
      let C = f.dumpLinkHrefsNearby?.putOnNewLine ? `

` : "";
      m = `${C}${p.hrefValue}`, (typeof v != "number" || Y(t, v - 1)) && (m += C);
    }
  }
  function I(f, v) {
    return v ? v[f] === "<" && v[f + 1] !== "%" : t[f] === "<" && t[f + 1] !== "%";
  }
  function P(f) {
    return t[f] === ">" && t[f - 1] !== "%";
  }
  function X(f, v, C) {
    if (v.ignoreTagsWithTheirContents.includes("*")) return !0;
    let E = t.indexOf(`<${C.name}`, f), F = t.indexOf(`</${C.name}`, f);
    return !C.slashPresent && F === -1 || C.slashPresent && !i.some((N) => N.name === C.name) || F > -1 && E > -1 && E < F ? !1 : v.ignoreTagsWithTheirContents.includes(C.name);
  }
  if (typeof t != "string") throw new TypeError(`string-strip-html/stripHtml(): [THROW_ID_01] Input must be string! Currently it's: ${(typeof t).toLowerCase()}, equal to:
${JSON.stringify(t, null, 4)}`);
  if (e) if (In(e)) {
    if (e.reportProgressFunc && typeof e.reportProgressFunc != "function") throw new Error(`string-strip-html/stripHtml(): [THROW_ID_03] The Optional Options Object's key reportProgressFunc, callback function, should be a function but it was given as type ${typeof e.reportProgressFunc}, equal to ${JSON.stringify(e.reportProgressFunc, null, 4)}`);
    if (typeof e.dumpLinkHrefsNearby == "boolean" && e.dumpLinkHrefsNearby != null) throw new Error(`string-strip-html/stripHtml(): [THROW_ID_04] The Optional Options Object's key should be a plain object but it was given as type ${typeof e.dumpLinkHrefsNearby}, equal to ${JSON.stringify(e.dumpLinkHrefsNearby, null, 4)}`);
  } else throw new TypeError(`string-strip-html/stripHtml(): [THROW_ID_02] Optional Options Object must be a plain object! Currently it's: ${(typeof e).toLowerCase()}, equal to:
${JSON.stringify(e, null, 4)}`);
  function V() {
    b && (p = { tagName: "", hrefValue: "", openingTagEnds: void 0 }, b = !1);
  }
  let y = { ...Hr, ...e, dumpLinkHrefsNearby: Object.assign({}, Hr.dumpLinkHrefsNearby, e?.dumpLinkHrefsNearby) };
  if (So(y, "returnRangesOnly")) throw new TypeError("string-strip-html/stripHtml(): [THROW_ID_05] The Optional Options Object's key returnRangesOnly has been removed from the API since v.5 release.");
  if (y.reportProgressFunc) {
    if (typeof y.reportProgressFuncFrom != "number") throw new Error(`string-strip-html/stripHtml(): [THROW_ID_06] The Optional Options Object's key reportProgressFuncFrom, callback function's "from" range, should be a number but it was given as type ${typeof y.reportProgressFuncFrom}, equal to ${JSON.stringify(y.reportProgressFuncFrom, null, 4)}`);
    if (typeof y.reportProgressFuncTo != "number") throw new Error(`string-strip-html/stripHtml(): [THROW_ID_07] The Optional Options Object's key reportProgressFuncTo, callback function's "to" range, should be a number but it was given as type ${typeof y.reportProgressFuncTo}, equal to ${JSON.stringify(y.reportProgressFuncTo, null, 4)}`);
  }
  y.ignoreTags = jr(y.ignoreTags, "resolvedOpts.ignoreTags"), y.onlyStripTags = jr(y.onlyStripTags, "resolvedOpts.onlyStripTags");
  let ht = !!y.onlyStripTags.length;
  y.onlyStripTags.length && y.ignoreTags.length && (y.onlyStripTags = kc(y.onlyStripTags, ...y.ignoreTags)), y.stripTogetherWithTheirContents ? typeof y.stripTogetherWithTheirContents == "string" && y.stripTogetherWithTheirContents.length && (y.stripTogetherWithTheirContents = [y.stripTogetherWithTheirContents]) : y.stripTogetherWithTheirContents = [];
  let ce = {};
  if (y.stripTogetherWithTheirContents && Array.isArray(y.stripTogetherWithTheirContents) && y.stripTogetherWithTheirContents.length && !y.stripTogetherWithTheirContents.every((f, v) => typeof f != "string" ? (ce.el = f, ce.i = v, !1) : !0)) throw new TypeError(`string-strip-html/stripHtml(): [THROW_ID_08] Optional Options Object's key stripTogetherWithTheirContents was set to contain not just string elements! For example, element at index ${ce.i} has a value ${ce.el} which is not string but ${(typeof ce.el).toLowerCase()}.`);
  y.cb || (y.cb = ({ rangesArr: f, proposedReturn: v }) => {
    v && f.push(...v);
  });
  let k = new Vc({ limitToBeAddedWhitespace: !0, limitLinebreaksCount: 2 });
  if (!y.skipHtmlDecoding) for (; t !== Br(t, { scope: "strict" }); ) t = Br(t, { scope: "strict" });
  let _ = !1, G = !1, z = 0, H = 0, q = t.length, Se = Math.floor(q / 2);
  for (let f = 0; f < q; f++) {
    if (y.reportProgressFunc && (q > 1e3 && q < 2e3 ? f === Se && y.reportProgressFunc(Math.floor((y.reportProgressFuncTo - y.reportProgressFuncFrom) / 2)) : q >= 2e3 && (z = y.reportProgressFuncFrom + Math.floor(f / q * (y.reportProgressFuncTo - y.reportProgressFuncFrom)), z !== H && (H = z, y.reportProgressFunc(z)))), Object.keys(a).length > 1 && a.lastClosingBracketAt && a.lastClosingBracketAt < f && t[f] !== " " && x === null && (x = f), !_ && t[f] === "%" && t[f - 1] === "{" && t.includes("%}", f + 1)) {
      h = null;
      let v = t.indexOf("%}", f) - 1;
      if (v > f) {
        f = v;
        continue;
      }
    }
    if (!_ && P(f) && (!a || Object.keys(a).length < 2) && f > 1) {
      for (let v = f; v--; ) if (t[v - 1] === void 0 || P(v)) {
        let C = t[v - 1] === void 0 ? v : v + 1, E = t.slice(C, f + 1) || "";
        if ((E.includes("/>") || E.includes("/ >") || E.includes('="') || E.includes("='")) && t !== `<${$r(E.trim(), "/>")}>` && [...Ve].some((F) => $r(E.trim().split(/\s+/).filter((N) => N.trim()).filter((N, B) => B === 0), "/>").toLowerCase() === F) && ds(`<${E.trim()}>`, y).result === "") {
          (!s.length || s[s.length - 1][0] !== a.lastOpeningBracketAt) && s.push([C, f + 1]), (!o.length || o[o.length - 1][0] !== a.lastOpeningBracketAt) && o.push([C, f + 1]);
          let F = w(t, f, C, f + 1, C, f + 1), N = f + 1;
          if (t[N] && !t[N].trim()) {
            for (let B = N; B < q; B++) if (t[B].trim()) {
              N = B;
              break;
            }
          }
          y.cb({ tag: a, deleteFrom: C, deleteTo: N, insert: F, rangesArr: k, proposedReturn: [C, N, F] });
        }
        break;
      }
    }
    if (!G && t[f] === "/" && !a.quotes?.value && Number.isInteger(a.lastOpeningBracketAt) && !Number.isInteger(a.lastClosingBracketAt) && (a.slashPresent = f), t[f] === '"' || t[f] === "'") if (!G && a.nameStarts && a?.quotes?.value === t[f]) if (g.valueStarts === void 0) g = {}, delete a.quotes;
    else {
      g.valueEnds = f, g.value = t.slice(g.valueStarts, f), a.attributes.push(g), g = {}, delete a.quotes;
      let v;
      y.dumpLinkHrefsNearby?.enabled && !r.length && a.attributes.some((C) => {
        if (typeof C.name == "string" && C.name.toLowerCase() === "href") return v = `${y.dumpLinkHrefsNearby?.wrapHeads || ""}${C.value}${y.dumpLinkHrefsNearby?.wrapTails || ""}`, !0;
      }) && (p = { tagName: a.name, hrefValue: v, openingTagEnds: void 0 });
    }
    else !G && !a.quotes && a.nameStarts && (a.quotes = {}, a.quotes.value = t[f], a.quotes.start = f, a.quotes.next = t.indexOf(t[f], f + 1), g.nameStarts && g.nameEnds && g.nameEnds < f && g.nameStarts < f && !g.valueStarts && (g.name = t.slice(g.nameStarts, g.nameEnds)));
    if (a.nameStarts !== void 0 && a.nameEnds === void 0 && (!t[f].trim() || !Hc(t[f]))) {
      if (a.nameEnds = f, a.name = t.slice(a.nameStarts, a.nameEnds + (!P(f) && t[f] !== "/" && t[f + 1] === void 0 ? 1 : 0)), t[a.nameStarts - 1] !== "!" && !a.name.replace(/-/g, "").length || /^\d+$/.test(a.name[0])) {
        a = {};
        continue;
      }
      if (typeof a.name == "string" && a.name.toLowerCase() === "doctype" && (G = !0), I(f)) {
        T(y);
        let v = w(t, f, a.leftOuterWhitespace, f, a.lastOpeningBracketAt, f);
        (y.stripTogetherWithTheirContents.includes(a.name) || y.stripTogetherWithTheirContents.includes("*")) && (o = o.filter(([C, E]) => !(C === a.leftOuterWhitespace && E === f))), y.cb({ tag: a, deleteFrom: a.leftOuterWhitespace, deleteTo: f, insert: `${v}${m}${v}`, rangesArr: k, proposedReturn: [a.leftOuterWhitespace, f, `${v}${m}${v}`] }), V(), S(f, y, k);
      }
    }
    if (a.quotes?.start && a.quotes.start < f && !a.quotes.end && g.nameEnds && g.equalsAt && !g.valueStarts && (g.valueStarts = f), !a.quotes && g.nameEnds && t[f] === "=" && !g.valueStarts && !g.equalsAt && (g.equalsAt = f), !a.quotes && g.nameStarts && g.nameEnds && !g.valueStarts && t[f].trim() && t[f] !== "=" && (a.attributes.push(g), g = {}), !a.quotes && g.nameStarts && !g.nameEnds && (G && `'"`.includes(t[g.nameStarts]) ? g.nameStarts < f && t[f] === t[g.nameStarts] && (g.nameEnds = f + 1, g.name = t.slice(g.nameStarts, g.nameEnds)) : t[f].trim() ? t[f] === "=" ? g.equalsAt || (g.nameEnds = f, g.equalsAt = f, g.name = t.slice(g.nameStarts, g.nameEnds)) : t[f] === "/" || P(f) ? (g.nameEnds = f, g.name = t.slice(g.nameStarts, g.nameEnds), a.attributes.push(g), g = {}) : I(f) && (g.nameEnds = f, g.name = t.slice(g.nameStarts, g.nameEnds), a.attributes.push(g), g = {}) : (g.nameEnds = f, g.name = t.slice(g.nameStarts, g.nameEnds))), !a.quotes && a.nameEnds < f && !t[f - 1].trim() && t[f].trim() && !"<>/!".includes(t[f]) && !g.nameStarts && !a.lastClosingBracketAt && (g.nameStarts = f), a.lastOpeningBracketAt !== null && a.lastOpeningBracketAt < f && t[f] === "/" && a.onlyPlausible && (a.onlyPlausible = !1), a.lastOpeningBracketAt !== null && a.lastOpeningBracketAt < f && t[f] !== "/" && (a.onlyPlausible === void 0 && ((!t[f].trim() || I(f)) && !a.slashPresent ? a.onlyPlausible = !0 : a.onlyPlausible = !1), t[f].trim() && a.nameStarts === void 0 && !I(f) && t[f] !== "/" && !P(f) && t[f] !== "!" && (a.nameStarts = f, a.nameContainsLetters = !1)), a.nameStarts && !a.quotes && typeof t[f] == "string" && t[f].toLowerCase() !== t[f].toUpperCase() && (a.nameContainsLetters = !0), P(f) && (Vr(a, t, f) || a.quotes.value && typeof a.lastOpeningBracketAt == "number" && Wc(a.quotes.value, t.slice(a.lastOpeningBracketAt, f)) % 2 === 1 && !t.slice(a.lastOpeningBracketAt + 1, f).includes("<") && !t.slice(a.lastOpeningBracketAt + 1, f).includes(">")) && a.lastOpeningBracketAt !== void 0 && (a.lastClosingBracketAt = f, x = null, Object.keys(g).length && (a.attributes.push(g), g = {}), y.dumpLinkHrefsNearby?.enabled && p.tagName && !p.openingTagEnds && (p.openingTagEnds = f)), (!G || t[f] === ">") && a.lastOpeningBracketAt !== void 0) {
      if (a.lastClosingBracketAt === void 0) {
        if (a.lastOpeningBracketAt < f && !I(f) && (t[f + 1] === void 0 || I(f + 1) && !a?.quotes?.value) && a.nameContainsLetters && typeof a.nameStarts == "number") {
          if (a.name = t.slice(a.nameStarts, a.nameEnds || f + 1).toLowerCase(), (!s.length || s[s.length - 1][0] !== a.lastOpeningBracketAt) && s.push([a.lastOpeningBracketAt, f + 1]), y.ignoreTags.includes(a.name) || X(f, y, a) || !Ve.has(a.name) && (a.onlyPlausible || y.stripRecognisedHTMLOnly)) {
            a = {}, g = {};
            continue;
          }
          if ((Ve.has(a.name) || fn.has(a.name)) && (a.onlyPlausible === !1 || a.onlyPlausible === !0 && a.attributes.length) || t[f + 1] === void 0) {
            T(y);
            let v = w(t, f, a.leftOuterWhitespace, f + 1, a.lastOpeningBracketAt, a.lastClosingBracketAt);
            _ && a.name === "script" && a.slashPresent && (_ = !1);
            let C;
            v === null || m === null ? C = null : C = `${v}${m}${v}`, y.cb({ tag: a, deleteFrom: a.leftOuterWhitespace, deleteTo: f + 1, insert: C, rangesArr: k, proposedReturn: [a.leftOuterWhitespace, f + 1, C] }), V(), S(f, y, k);
          }
          if (!o.length || o[o.length - 1][0] !== a.lastOpeningBracketAt && o[o.length - 1][1] !== f + 1) if (y.stripTogetherWithTheirContents.includes(a.name) || y.stripTogetherWithTheirContents.includes("*")) {
            let v;
            for (let C = r.length; C--; ) r[C].name === a.name && (v = r[C]);
            v ? (o = o.filter(([C]) => C !== v.lastOpeningBracketAt), o.push([v.lastOpeningBracketAt, f + 1])) : o.push([a.lastOpeningBracketAt, f + 1]);
          } else o.push([a.lastOpeningBracketAt, f + 1]);
        }
      } else if (f > a.lastClosingBracketAt && t[f].trim() || t[f + 1] === void 0 || y.ignoreIndentations && `\r
`.includes(t[f])) {
        let v = a.lastClosingBracketAt === f ? f + 1 : f;
        y.trimOnlySpaces && v === q - 1 && x !== null && x < f && (v = x), (!s.length || s[s.length - 1][0] !== a.lastOpeningBracketAt) && s.push([a.lastOpeningBracketAt, a.lastClosingBracketAt + 1]);
        let C = y.ignoreTags.includes(a.name), E = X(f, y, a);
        if (!A || y.stripRecognisedHTMLOnly && typeof a.name == "string" && !Ve.has(a.name.toLowerCase()) && !fn.has(a.name.toLowerCase()) || !ht && (C || E) || ht && !y.onlyStripTags.includes(a.name) || y.ignoreTagsWithTheirContents.includes(a.name)) {
          if (E) if (a.slashPresent) {
            for (let F = i.length; F--; ) if (i[F].name === a.name) {
              i.splice(F, 1);
              break;
            }
            i.length || (A = !0);
          } else A && (A = !1), i.push(a);
          y.cb({ tag: a, deleteFrom: null, deleteTo: null, insert: null, rangesArr: k, proposedReturn: null }), a = {}, g = {};
        } else if (!a.onlyPlausible || a.attributes.length === 0 && a.name && (Ve.has(a.name.toLowerCase()) || fn.has(a.name.toLowerCase())) || a.attributes?.some((F) => F.equalsAt)) {
          (!o.length || o[o.length - 1][0] !== a.lastOpeningBracketAt) && o.push([a.lastOpeningBracketAt, a.lastClosingBracketAt + 1]);
          let F = w(t, f, a.leftOuterWhitespace, v, a.lastOpeningBracketAt, a.lastClosingBracketAt);
          m = "", b = !1, T(y, v);
          let N;
          typeof m == "string" && m.length ? (N = `${F}${m}${F === `

` ? `
` : F}`, v === a.lastClosingBracketAt + 1 && (!t[v] || !gn.has(t[v])) && (N += " "), a.leftOuterWhitespace === a.lastOpeningBracketAt && k.last() && k.last()[1] < a.lastOpeningBracketAt && (!y?.dumpLinkHrefsNearby?.putOnNewLine || !gn.has(t[v])) && (N = " " + N)) : N = F, N !== null && (a.leftOuterWhitespace === 0 || !Y(t, v - 1)) && (!y.dumpLinkHrefsNearby?.enabled || a.name !== "a") && (N = void 0);
          let B = 0;
          if (b && gn.has(t[v])) {
            y.dumpLinkHrefsNearby?.putOnNewLine && (N = `${t[v]}${N || ""}`);
            let ve = Y(t, v);
            ve && N?.endsWith(`
`) ? B += ve - f : (!ve || ve > f) && B++;
          }
          y.cb({ tag: a, deleteFrom: a.leftOuterWhitespace, deleteTo: v + B, insert: N, rangesArr: k, proposedReturn: [a.leftOuterWhitespace, v + B, N] }), V(), S(f, y, k);
        } else a = {};
        P(f) || (a = {});
      }
      G && (G = !1);
    }
    if ((!_ || t[f] === "<" && Y(t, Y(t, f)) && t[Y(t, f)] === "/" && t.startsWith("script", Y(t, Y(t, f)))) && I(f) && !I(f - 1) && !`'"`.includes(t[f + 1]) && (!`'"`.includes(t[f + 2]) || /\w/.test(t[f + 1])) && !(t[f + 1] === "c" && t[f + 2] === ":") && !(t[f + 1] === "f" && t[f + 2] === "m" && t[f + 3] === "t" && t[f + 4] === ":") && !(t[f + 1] === "s" && t[f + 2] === "q" && t[f + 3] === "l" && t[f + 4] === ":") && !(t[f + 1] === "x" && t[f + 2] === ":") && !(t[f + 1] === "f" && t[f + 2] === "n" && t[f + 3] === ":") && Vr(a, t, f)) {
      if (P(Y(t, f))) continue;
      if (a.nameEnds && a.nameEnds < f && !a.lastClosingBracketAt && (a.onlyPlausible === !0 && a.attributes?.length || a.onlyPlausible === !1)) {
        let v = w(t, f, a.leftOuterWhitespace, f, a.lastOpeningBracketAt, f);
        y.cb({ tag: a, deleteFrom: a.leftOuterWhitespace, deleteTo: f, insert: v, rangesArr: k, proposedReturn: [a.leftOuterWhitespace, f, v] }), S(f, y, k), a = {}, g = {};
      }
      if (a.lastOpeningBracketAt !== void 0 && a.onlyPlausible && a.name && !a.quotes && (a.lastOpeningBracketAt = void 0, a.name = void 0, a.onlyPlausible = !1), (a.lastOpeningBracketAt === void 0 || !a.onlyPlausible) && !a.quotes && (a.lastOpeningBracketAt = f, a.slashPresent = !1, a.attributes = [], l === null ? a.leftOuterWhitespace = f : y.trimOnlySpaces && l === 0 ? a.leftOuterWhitespace = u || f : a.leftOuterWhitespace = l, `${t[f + 1]}${t[f + 2]}${t[f + 3]}` == "!--" || `${t[f + 1]}${t[f + 2]}${t[f + 3]}${t[f + 4]}${t[f + 5]}${t[f + 6]}${t[f + 7]}${t[f + 8]}` == "![CDATA[")) {
        let v = !0;
        t[f + 2] === "-" && (v = !1);
        let C;
        for (let E = f; E < q; E++) if ((!C && v && `${t[E - 2]}${t[E - 1]}${t[E]}` == "]]>" || !v && `${t[E - 2]}${t[E - 1]}${t[E]}` == "-->") && (C = E), C && (C < E && t[E].trim() || t[E + 1] === void 0)) {
          let F = E;
          (t[E + 1] === void 0 && !t[E].trim() || t[E] === ">") && (F += 1), (!s.length || s[s.length - 1][0] !== a.lastOpeningBracketAt) && s.push([a.lastOpeningBracketAt, C + 1]), (!o.length || o[o.length - 1][0] !== a.lastOpeningBracketAt) && o.push([a.lastOpeningBracketAt, C + 1]);
          let N = w(t, E, a.leftOuterWhitespace, F, a.lastOpeningBracketAt, C);
          y.cb({ tag: a, deleteFrom: a.leftOuterWhitespace, deleteTo: F, insert: N, rangesArr: k, proposedReturn: [a.leftOuterWhitespace, F, N] }), f = E - 1, t[E] === ">" && (f = E), a = {}, g = {};
          break;
        }
      }
    }
    !t[f].trim() || t[f].charCodeAt(0) === 847 ? (l === null && (l = f, a.lastOpeningBracketAt !== void 0 && a.lastOpeningBracketAt < f && a.nameStarts && a.nameStarts < a.lastOpeningBracketAt && f === a.lastOpeningBracketAt + 1 && !r.some((v) => v.name === a.name) && (a.onlyPlausible = !0, a.name = void 0, a.nameStarts = void 0)), (t[f] === `
` || t[f] === "\r") && (h = f, d && (d = !1))) : (l !== null && (!a.quotes && g.equalsAt > l - 1 && g.nameEnds && g.equalsAt > g.nameEnds && t[f] !== '"' && t[f] !== "'" && (In(g) && a.attributes.push(g), g = {}, a.equalsSpottedAt = void 0), l = null), d || (d = !0, A && !_ && typeof h == "number" && f && h < f - 1 && (t.slice(h + 1, f).trim() ? h = null : y.ignoreIndentations || k.push([h + 1, f])))), t[f] === " " ? u === null && (u = f) : u !== null && (u = null), a.name === "script" && (_ = !a.slashPresent);
  }
  if (t && !y.ignoreIndentations && (y.trimOnlySpaces && t[0] === " " || !y.trimOnlySpaces && !t[0].trim())) for (let f = 0; f < q; f++) if (y.trimOnlySpaces && t[f] !== " " || !y.trimOnlySpaces && t[f].trim()) {
    k.push([0, f]);
    break;
  } else t[f + 1] || k.push([0, f + 1]);
  if (t && (y.trimOnlySpaces && t[~-t.length] === " " || !y.trimOnlySpaces && !t[~-t.length].trim())) {
    for (let f = t.length; f--; ) if (y.trimOnlySpaces && t[f] !== " " || !y.trimOnlySpaces && t[f].trim()) {
      k.push([f + 1, q]);
      break;
    }
  }
  let K = k.current();
  if (!e?.cb && K && (K[0] && !K[0][0] && (K[0][1], k.ranges[0] = [k.ranges[0][0], k.ranges[0][1]]), K[K.length - 1]?.[1] === t.length && (K[K.length - 1][0], k.ranges))) {
    let f = k.ranges[k.ranges.length - 1][0];
    t[f - 1] && (y.trimOnlySpaces && t[f - 1] === " " || !y.trimOnlySpaces && !t[f - 1].trim()) && (f -= 1);
    let v = k.ranges[k.ranges.length - 1][2];
    k.ranges[k.ranges.length - 1] = [f, k.ranges[k.ranges.length - 1][1]], v?.trim() && k.ranges[k.ranges.length - 1].push(v.trimEnd());
  }
  return { log: { timeTakenInMilliseconds: Date.now() - n }, result: qc(t, k.current()), ranges: k.current(), allTagLocations: s, filteredTagLocations: o };
}
class Wr {
  speechSynthesis;
  speechSynthesisUtterance;
  currentVoice = null;
  currentUtterances = [];
  currentUtteranceIndex = 0;
  playbackState = "idle";
  events = new Kt();
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
    if (this.features = fo(), this.patches = go(), !this.features.speechSynthesis || !this.features.speechSynthesisUtterance)
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
      this.voiceManager = await L.initialize({
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
    const [r, i] = U(n), [s, o] = U(e.language);
    return s === r && (!i || o === i);
  }
  // Returns `undefined` (not a fallback voice) when content.language hasn't
  // been warmed into languageVoiceCache yet — callers must await for it.
  voiceForUtteranceSync(e) {
    const n = this.getCurrentVoiceForUtterance(this.currentVoice);
    if (!this.speakInContentLanguage || !e.language)
      return n;
    const r = J(e.language);
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
      e.map((o) => o.language).filter((o) => !!o).map((o) => J(o)).filter((o) => !this.languageVoiceCache.has(o))
    ), r = [...n].filter((o) => this.warmingLanguages.has(o)), s = [...n].filter((o) => !this.warmingLanguages.has(o)).map((o) => {
      const a = (async () => {
        await L.initialize({ languages: [o] }), this.voices = this.voiceManager.getVoices();
        const c = this.voices.filter((h) => this.voiceMatchesLanguage(h, o)), u = (await this.voiceManager.sortVoicesByQuality(c))[0] ?? null;
        this.languageVoiceCache.set(o, u), u || this.emitEvent({ type: "languagefallback", detail: { language: o, reason: "no-matching-voice" } });
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
      plain: n.plain ?? (n.ssml ? ds(n.ssml).result : "")
    }));
  }
  // Queue Management
  loadUtterances(e, n) {
    this.currentUtterances = this.toPlainText(e), this.currentUtteranceIndex = Ct(n ?? 0, e.length), this.warmLanguageVoiceCache(this.currentUtterances), this.playbackState = "ready", this.emitEvent({ type: "ready" });
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
    if (this.restartPending = !1, this.currentUtterances.length === 0) {
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
    this.cancelCurrentSpeech(), this.speakGeneration++, this.currentUtteranceIndex = 0, this.patches.isAndroid && (this.isAndroidPaused = !1), this.setState("idle"), this.emitEvent({ type: "stop" });
  }
  // Playback Parameters
  setRate(e) {
    const n = pe(e, 0.1, 10, this.rate);
    n !== this.rate && (this.rate = n, this.scheduleRestartIfSpeaking());
  }
  getRate() {
    return this.rate;
  }
  setPitch(e) {
    const n = pe(e, 0, 2, this.pitch);
    n !== this.pitch && (this.pitch = n, this.scheduleRestartIfSpeaking());
  }
  getPitch() {
    return this.pitch;
  }
  setVolume(e) {
    const n = pe(e, 0, 1, this.volume);
    n !== this.volume && (this.volume = n, this.scheduleRestartIfSpeaking());
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
class Xg {
  id = "webspeech";
  name = "Web Speech API";
  voiceEngine = null;
  // No cache to bypass here — local API, no network cost to re-checking.
  async getVoices() {
    return this.voiceEngine || (this.voiceEngine = new Wr(), await this.voiceEngine.initialize()), this.voiceEngine.getAvailableVoices();
  }
  async createEngine(e) {
    const n = new Wr();
    return await n.initialize(), e && await n.setVoice(e), n;
  }
  async destroy() {
    this.voiceEngine && (await this.voiceEngine.destroy(), this.voiceEngine = null);
  }
}
const De = "\\p{Pe}\\p{Pf}.,;:!?，。、；：！？،؛؟", Pn = "\\p{Ps}\\p{Pi}¿¡", Kc = new RegExp(`^[${De}]`, "u"), Jc = new RegExp(`^[${Pn}]`, "u");
function Yt(t) {
  return Kc.test(t);
}
function Xc(t) {
  return Jc.test(t);
}
function fs(t, e) {
  const n = [];
  let r = -1, i = -1;
  const s = () => {
    r !== -1 && (n.push({ text: Yc(t, r, i), offset: t[r].offset }), r = -1, i = -1);
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
function Yc(t, e, n) {
  const r = t[e], i = t[n];
  return r === i ? r.text : t.slice(e, n + 1).map((s) => s.text).join("");
}
const gs = new RegExp(
  `[^${De}]*[${De}]+\\s*|[^${De}]+$`,
  "gu"
), Qc = /\S+\s*|\s+/g;
function ir(t, e, n) {
  const r = [];
  for (const i of t.matchAll(n))
    i[0].length !== 0 && r.push({ text: i[0], offset: e + i.index, atomic: !1 });
  return r;
}
function sr(t, e) {
  if (t.text.length <= e || t.atomic)
    return [t];
  const n = ir(t.text, t.offset, Qc);
  if (n.length > 1)
    return n.flatMap((o) => sr(o, e));
  const r = [];
  let i = t.offset, s = "";
  for (const o of t.text)
    s.length > 0 && s.length + o.length > e && (r.push({ text: s, offset: i, atomic: !1 }), i += s.length, s = ""), s += o;
  return s.length > 0 && r.push({ text: s, offset: i, atomic: !1 }), r;
}
function Zc(t, e) {
  if (t.length <= e)
    return [{ text: t, offset: 0 }];
  const r = ir(t, 0, gs).flatMap((i) => sr(i, e));
  return fs(r, e);
}
const eu = /<([a-zA-Z][\w-]*)\b[^>]*>[\s\S]*?<\/\1>|<[a-zA-Z][\w-]*\b[^>]*\/>|[^<]+/g;
function tu(t, e) {
  if (t.length <= e)
    return [{ text: t, offset: 0 }];
  const n = [];
  for (const i of t.matchAll(eu))
    i[0][0] === "<" ? n.push({ text: i[0], offset: i.index, atomic: !0 }) : n.push(...ir(i[0], i.index, gs));
  const r = n.flatMap((i) => sr(i, e));
  return fs(r, e);
}
const nu = {
  wav: "audio/wav",
  mp3: "audio/mpeg",
  opus: "audio/ogg",
  ogg: "audio/ogg",
  aac: "audio/aac",
  flac: "audio/flac",
  webm: "audio/webm",
  m4a: "audio/mp4"
};
function ru(t) {
  return nu[t] ?? `audio/${t}`;
}
const iu = ["flac", "wav", "opus", "aac", "ogg", "webm", "mp3"], su = ["opus", "aac", "webm", "ogg", "mp3", "wav", "flac"];
function au(t, e, n) {
  const r = (a) => n(ru(a)) !== "", i = t.formats.filter(r);
  if (e.preferredFormat && i.includes(e.preferredFormat))
    return e.preferredFormat;
  const s = e.strategy === "bandwidth" ? su : iu, o = [...s, ...i.filter((a) => !s.includes(a))];
  for (const a of o)
    if (i.includes(a))
      return a;
  return t.default;
}
const ou = /* @__PURE__ */ new Set(["wav", "flac"]), lu = {
  mp3: 48e3,
  opus: 24e3,
  aac: 48e3,
  ogg: 48e3,
  webm: 32e3
};
function cu(t, e, n) {
  return ou.has(t) || !e || !n ? void 0 : n.saveData === !0 || /2g/.test(n.effectiveType ?? "") ? lu[t] : void 0;
}
function ps(t, e) {
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
class nt extends Error {
  status;
  type;
  title;
  instance;
  constructor(e, n) {
    super(e), this.name = "SpeechServerError", this.status = n.status, this.type = n.type, this.title = n.title, this.instance = n.instance;
  }
}
class ms extends nt {
  constructor(e) {
    super(e, { status: 408, type: "https://readium.org/speech-server/error#stall", title: "Synthesis Stalled" }), this.name = "SpeechServerStallError";
  }
}
class ys extends Error {
  constructor(e) {
    super(e), this.name = "SpeechServerAudioDecodeError";
  }
}
class bs extends Error {
  constructor(e) {
    super(e), this.name = "SpeechServerNetworkError";
  }
}
async function Ye(t) {
  if ((t.headers.get("content-type") ?? "").includes("application/problem+json"))
    try {
      const n = await t.json();
      return new nt(n.detail || n.title || `Request failed with status ${t.status}`, {
        status: n.status ?? t.status,
        type: n.type,
        title: n.title,
        instance: n.instance
      });
    } catch {
    }
  return new nt(`Request failed with status ${t.status}`, { status: t.status });
}
const uu = 3, hu = 400;
function du(t) {
  const e = atob(t), n = new Uint8Array(e.length);
  for (let r = 0; r < e.length; r++)
    n[r] = e.charCodeAt(r);
  return n.buffer;
}
function fu(t) {
  return pe(t, 0.25, 4, 1);
}
function ft(t) {
  return t?.plain ?? t?.ssml ?? void 0;
}
function Gr(t) {
  return t instanceof ms ? { message: t.message, status: t.status, type: t.type, title: t.title, instance: t.instance, recoverable: !0 } : t instanceof nt ? { message: t.message, status: t.status, type: t.type, title: t.title, instance: t.instance, recoverable: !1 } : t instanceof ys ? { message: t.message, recoverable: !1 } : t instanceof bs ? { message: t.message, recoverable: !0 } : t instanceof Error ? { message: t.message, recoverable: !1 } : { message: String(t), recoverable: !1 };
}
class gu {
  endpoints;
  fetchImpl;
  currentVoice = null;
  voices = [];
  serviceInfo = null;
  serviceInfoPromise = null;
  currentUtterances = [];
  currentUtteranceIndex = 0;
  playbackState = "idle";
  events = new Kt();
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
    this.endpoints = e.endpoints, this.fetchImpl = e.fetch ?? fetch.bind(globalThis), this.prefetchWindow = e.prefetchWindow ?? uu, this.readyBufferChars = e.readyBufferChars ?? hu, this.overLengthText = e.overLengthText ?? "split", this.timeoutMs = e.timeoutMs, this.formatOptions = e.format ?? {}, this.canPlayType = typeof Audio < "u" ? (n) => new Audio().canPlayType(n) : () => "";
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
      throw r instanceof TypeError ? new bs(r.message) : r;
    }
  }
  loadUtterances(e, n) {
    this.abortLiveControllers(), this.clearPrefetchCache(), this.currentUtterances = e, this.currentUtteranceIndex = Ct(n ?? 0, e.length), this.setState("loading"), this.bufferUntilReady(++this.loadGeneration);
  }
  // Buffers enough utterances ahead of currentUtteranceIndex to cover readyBufferChars before
  // declaring "ready", so playback doesn't catch up to an empty prefetch cache right away —
  // starting from wherever playback will actually resume, not always utterance 0.
  async bufferUntilReady(e) {
    const n = Ct(this.currentUtteranceIndex, this.currentUtterances.length), r = Math.min(this.indexCoveringChars(this.readyBufferChars, n), n + this.prefetchWindow), i = [];
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
    const r = Ct(n, this.currentUtterances.length);
    let i = 0;
    for (let s = r; s < this.currentUtterances.length; s++)
      if (i += (ft(this.currentUtterances[s]) ?? "").length, i >= e)
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
    this.abortLiveControllers(), this.clearPrefetchCache();
  }
  getCurrentVoice() {
    return this.currentVoice;
  }
  async getAvailableVoices() {
    if (this.voices.length > 0)
      return this.voices;
    const [e, n] = await Promise.all([this.fetchNetwork(this.endpoints.voices), this.getServiceInfo()]);
    if (!e.ok)
      throw await Ye(e);
    const r = await e.json(), i = new Map(n.providers.map((s) => [s.id, s.controls]));
    return this.voices = r.map((s) => ps(s, i.get(s.provider))), this.voices;
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
      throw await Ye(e);
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
    const n = ++this.speakGeneration;
    this.isSpeakingInternal = !0, this.setState("loading"), this.synthesizeAndPlay(n);
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
      this.isSpeakingInternal = !1, this.setState("idle"), this.emitEvent({
        type: "error",
        detail: Gr(r)
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
        const r = await n;
        for (const { controller: i } of r)
          this.activeControllers.delete(i), this.liveControllers.add(i);
        return r;
      } catch {
      }
    }
    return this.synthesizeStream(e, !1);
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
    const n = this.prefetchChainTail.then(() => this.synthesizeStream(e, !0));
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
  abortLiveControllers() {
    this.liveControllers.forEach((e) => e.abort()), this.liveControllers.clear();
  }
  async synthesizeStream(e, n) {
    const r = this.currentUtterances[e], i = !r.plain && !!r.ssml, s = this.speakInContentLanguage ? r.language : void 0, o = ft(r) ?? "", a = ft(this.currentUtterances[e - 1]), c = ft(this.currentUtterances[e + 1]), l = await this.getServiceInfo(), u = au(l.output, this.formatOptions, this.canPlayType), h = navigator.connection, d = cu(u, this.formatOptions.adaptBitrateToNetwork ?? !1, h);
    if (o.length <= l.limits.maxTextLength) {
      const x = new AbortController();
      return (n ? this.activeControllers : this.liveControllers).add(x), [{ promise: this.synthesizeChunk(r, o, 0, i, s, a, c, u, d, x), controller: x }];
    }
    if (this.overLengthText === "error")
      throw new nt(
        `Text exceeds this server's maximum length of ${l.limits.maxTextLength} characters`,
        {
          status: 413,
          type: "https://readium.org/speech-server/error#payload_too_large",
          title: "Payload Too Large"
        }
      );
    const g = Math.min(l.limits.maxTextLength, this.readyBufferChars), p = i ? tu(o, g) : Zc(o, g), m = [];
    let b = Promise.resolve();
    for (let x = 0; x < p.length; x++) {
      const A = x === 0 ? a : p[x - 1].text, S = x === p.length - 1 ? c : p[x + 1].text, w = p[x], T = new AbortController();
      (n ? this.activeControllers : this.liveControllers).add(T);
      const I = b.then(
        () => this.synthesizeChunk(r, w.text, w.offset, i, s, A, S, u, d, T)
      );
      m.push({ promise: I, controller: T }), b = I;
    }
    return m;
  }
  async synthesizeChunk(e, n, r, i, s, o, a, c, l, u) {
    try {
      const h = await this.fetchNetwork(this.endpoints.synthesize, {
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
        signal: u.signal
      });
      if (!h.ok)
        throw await Ye(h);
      const d = await h.json(), g = du(d.audio);
      let p;
      try {
        p = await this.ensureAudioContext().decodeAudioData(g);
      } catch {
        throw new ys("Audio playback failed");
      }
      return { audioBuffer: p, format: d.format, boundaries: d.boundaries, textOffset: r };
    } finally {
      this.activeControllers.delete(u), this.liveControllers.delete(u);
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
        n.abort(), o(new ms(`No audio chunk arrived within ${i.toFixed(0)}ms of the playback buffer running dry`));
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
    const i = this.ensureAudioContext(), s = this.masterGain, a = this.currentVoice?.controls?.speed === !0 ? 1 : fu(this.rate);
    this.scheduledChunks = [], this.setState("playing"), this.emitEvent({ type: "start" });
    let c = i.currentTime, l = null;
    const u = (h) => {
      const d = i.createBufferSource();
      d.buffer = h.audioBuffer, d.playbackRate.value = a, d.connect(s), d.start(c), l && (l.onended = null), d.onended = () => this.handleUtteranceEnded(n), l = d, this.scheduledChunks.push({ chunk: h, startTime: c, node: d, nextBoundaryIndex: 0, rate: a }), c += h.audioBuffer.duration / a;
    };
    u(r), this.startBoundaryPolling(n);
    for (let h = 1; h < e.length; h++) {
      let d;
      try {
        const g = Math.max(0, (c - i.currentTime) * 1e3);
        d = await this.awaitWithStallDeadline(e[h].promise, e[h].controller, g);
      } catch (g) {
        n === this.speakGeneration && this.emitEvent({ type: "error", detail: Gr(g) });
        return;
      }
      if (n !== this.speakGeneration)
        return;
      u(d);
    }
  }
  handleUtteranceEnded(e) {
    e === this.speakGeneration && (this.checkBoundaries(), this.stopBoundaryPolling(), this.isSpeakingInternal = !1, this.currentUtteranceIndex >= this.currentUtterances.length - 1 && this.setState("idle"), this.emitEvent({ type: "end" }));
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
    const n = pe(e, 0.1, 10, this.rate);
    n !== this.rate && (this.rate = n, this.clearPrefetchCache(), this.scheduleRestartIfSpeaking());
  }
  getRate() {
    return this.rate;
  }
  setPitch(e) {
    const n = pe(e, 0, 2, this.pitch);
    n !== this.pitch && (this.pitch = n, this.clearPrefetchCache(), this.scheduleRestartIfSpeaking());
  }
  getPitch() {
    return this.pitch;
  }
  setVolume(e) {
    const n = pe(e, 0, 1, this.volume);
    n !== this.volume && (this.volume = n, this.masterGain && (this.masterGain.gain.value = this.volume));
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
class Yg {
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
      throw await Ye(n);
    if (!r.ok)
      throw await Ye(r);
    const i = await n.json(), s = await r.json(), o = new Map(s.providers.map((a) => [a.id, a.controls]));
    return this.voices = i.map((a) => ps(a, o.get(a.provider))), this.voices;
  }
  async createEngine(e) {
    const n = new gu(this.options);
    return this.voices.length > 0 && n.setAvailableVoices(this.voices), e && n.setVoice(e), n;
  }
  async destroy() {
    this.voices = [];
  }
}
function pu(t) {
  return t.detail?.recoverable === !0;
}
const mu = 3e4, yu = [
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
class bu {
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
  events = new Kt();
  unbindActiveEngine = null;
  constructor(e) {
    this.activeEngine = e.primaryEngine, this.primaryProvider = e.primaryProvider, this.fallbackProvider = e.fallbackProvider, this.onFailure = e.onFailure ?? "fallback", this.healthCheckIntervalMs = e.healthCheckIntervalMs ?? mu, this.lastVoiceRequest = e.primaryEngine.getCurrentVoice() ?? void 0, this.bindActiveEngine();
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
    const e = this.activeEngine, n = yu.map((r) => e.on(r, (i) => {
      this.emitEvent(i), this.maybeRecoverNow();
    }));
    n.push(e.on("error", (r) => this.handleError(r))), this.unbindActiveEngine = () => n.forEach((r) => r());
  }
  handleError(e) {
    if (this.hasFallenBack || this.swapInFlight || this.onFailure === "error" || !pu(e)) {
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
    const r = await this.fallbackProvider.getVoices(), s = typeof navigator < "u" && navigator.onLine === !0 ? r : r.filter((d) => d.offlineAvailability === !0);
    if (s.length === 0) return null;
    const [o] = Wt([e]), { voicesByLang: a } = Gt(s, [o]), c = a.get(o.baseLang) ?? [], l = c.length > 0 ? c : s, u = n ? l.filter((d) => d.gender === n) : [], h = u.length > 0 ? u : l;
    return Ga(e, h);
  }
  async destroy() {
    this.teardownEpoch++, this.healthCheckTimer !== null && (clearTimeout(this.healthCheckTimer), this.healthCheckTimer = null), this.unbindActiveEngine?.(), this.events.clear(), await this.activeEngine.destroy();
  }
}
class Qg {
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
    return new bu({
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
let Su = class {
};
function vu(t) {
  return (t.getComputedStyle(t.document.documentElement).writingMode || t.getComputedStyle(t.document.body).writingMode) === "vertical-lr";
}
function wu(t) {
  const e = t.getComputedStyle(t.document.documentElement).writingMode || t.getComputedStyle(t.document.body).writingMode;
  return e === "vertical-rl" || e === "vertical-lr";
}
function xe(t) {
  const e = wu(t), n = e && vu(t), r = t.innerWidth, i = t.innerHeight, s = t.document.scrollingElement, o = s.scrollLeft, a = s.scrollTop, c = parseInt(t.getComputedStyle(t.document.documentElement).getPropertyValue("column-count")), l = e && !n ? s.scrollWidth - r + o : o, u = a;
  return { isVertical: e, isVertLR: n, viewportInlineSize: e ? i : r, viewportBlockSize: e ? r : i, pageInlineSize: e ? i : r / (c || 1), xDocOffset: l, yDocOffset: u, inlineScrollOffset: e ? u : l, blockScrollOffset: e ? l : u, inlineStart: (h) => e ? h.top : h.left, blockStart: (h) => e ? h.left : h.top, inlineSize: (h) => e ? h.height : h.width, blockSize: (h) => e ? h.width : h.height, applyPosition(h, d, g, p, m, b) {
    h.style.position = "absolute", e ? (h.style.top = `${d * b}px`, h.style.left = `${g * b}px`, h.style.height = `${p * b}px`, h.style.width = `${m * b}px`) : (h.style.left = `${d * b}px`, h.style.top = `${g * b}px`, h.style.width = `${p * b}px`, h.style.height = `${m * b}px`);
  }, toRect(h, d, g, p) {
    return e ? new DOMRect(d, h, p, g) : new DOMRect(h, d, g, p);
  } };
}
function Kr(t, e) {
  return t.document.documentElement.style.getPropertyValue(e);
}
function xu(t) {
  return t && Array.isArray(t) ? t : void 0;
}
function Eu(t) {
  return t && typeof t == "string" ? [t] : xu(t);
}
function kt(t) {
  return isNaN(t) ? void 0 : t;
}
function pn(t) {
  return kt(t) !== void 0 && Math.sign(t) >= 0 ? t : void 0;
}
let It = class Ss {
  constructor(e) {
    this.cssSelector = e.cssSelector, this.textNodeIndex = e.textNodeIndex, this.charOffset = e.charOffset;
  }
  static deserialize(e) {
    if (!(e && e.cssSelector)) return;
    let n = pn(e.textNodeIndex);
    if (n === void 0) return;
    let r = pn(e.charOffset);
    return r === void 0 && (r = pn(e.offset)), new Ss({ cssSelector: e.cssSelector, textNodeIndex: n, charOffset: r });
  }
  serialize() {
    const e = { cssSelector: this.cssSelector, textNodeIndex: this.textNodeIndex };
    return this.charOffset !== void 0 && (e.charOffset = this.charOffset), e;
  }
}, vs = class ws {
  constructor(e) {
    this.start = e.start, this.end = e.end;
  }
  static deserialize(e) {
    if (!e) return;
    let n = It.deserialize(e.start);
    if (n) return new ws({ start: n, end: It.deserialize(e.end) });
  }
  serialize() {
    const e = { start: this.start.serialize() };
    return this.end && (e.end = this.end.serialize()), e;
  }
}, gt = null, mn = null, Me = 0;
const Oe = { r: 255, g: 255, b: 255, a: 1 }, Ee = /* @__PURE__ */ new Map(), Cu = () => {
  if (!gt) if (typeof OffscreenCanvas < "u") gt = new OffscreenCanvas(5, 5), mn = gt.getContext("2d", { willReadFrequently: !0, desynchronized: !0 });
  else {
    const t = document.createElement("canvas");
    t.width = 5, t.height = 5, gt = t, mn = t.getContext("2d", { willReadFrequently: !0, desynchronized: !0 });
  }
  return mn;
}, ku = (t) => {
  if (!t) return !0;
  const e = t.trim().toLowerCase();
  return e.startsWith("var(") || ["transparent", "currentcolor", "inherit", "initial", "revert", "unset", "revert-layer"].includes(e) ? !0 : ["linear-gradient", "radial-gradient", "conic-gradient", "repeating-linear-gradient", "repeating-radial-gradient", "repeating-conic-gradient"].some((n) => e.includes(n));
}, pt = (t, e) => {
  console.warn(`[Decorator] Could not parse color: "${t}". ${e} Falling back to ${JSON.stringify(Oe)} to compute contrast. Please use a CSS color value that can be computed to RGB(A).`);
}, ye = (t, e = null) => {
  const n = e ? `${t}|${e}` : t, r = Ee.get(n);
  if (r !== void 0) return r ?? Oe;
  if (ku(t)) return pt(t, "Unsupported color format or special value."), Ee.set(n, null), Oe;
  const i = Cu();
  if (!i) return pt(t, "Could not get canvas context."), Ee.set(n, null), Oe;
  try {
    Me === 0 && i.clearRect(0, 0, 5, 5);
    const s = Me % 5, o = Math.floor(Me / 5);
    i.clearRect(s, o, 1, 1), e && (i.fillStyle = e, i.fillRect(s, o, 1, 1)), i.fillStyle = t, i.fillRect(s, o, 1, 1);
    const a = i.getImageData(s, o, 1, 1);
    Me = (Me + 1) % 25;
    const [c, l, u, h] = a.data;
    if (h === 0) return pt(t, "Fully transparent color."), Ee.set(n, null), Oe;
    const d = { r: c, g: l, b: u, a: h / 255 };
    return Ee.set(n, d), d;
  } catch (s) {
    return pt(t, `Error: ${s instanceof Error ? s.message : String(s)}`), Ee.set(n, null), Oe;
  }
}, yn = (t) => {
  const e = t / 255;
  return e <= 0.03928 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4);
}, $n = (t) => {
  const e = yn(t.r), n = yn(t.g), r = yn(t.b);
  return 0.2126 * e + 0.7152 * n + 0.0722 * r;
}, Ft = (t, e) => {
  const n = typeof t == "string" ? ye(t) : t, r = typeof e == "string" ? ye(e) : e, i = $n(n), s = $n(r), o = Math.max(i, s), a = Math.min(i, s);
  return (o + 0.05) / (a + 0.05);
}, xs = (t, e = null) => {
  const n = ye(t, e), r = Ft(n, { r: 255, g: 255, b: 255, a: 1 }), i = Ft(n, { r: 0, g: 0, b: 0, a: 1 });
  return r > i;
}, Jr = (t, e = null) => xs(t, e) ? "white" : "black", Ou = (t) => {
  const e = t.a !== void 0 ? t.a : 1;
  return `rgba(${Math.round(t.r)}, ${Math.round(t.g)}, ${Math.round(t.b)}, ${e})`;
}, Au = (t, e) => ({ r: Math.min(255, t.r + (255 - t.r) * e), g: Math.min(255, t.g + (255 - t.g) * e), b: Math.min(255, t.b + (255 - t.b) * e), a: t.a ?? 1 }), Tu = (t, e) => ({ r: Math.max(0, t.r * (1 - e)), g: Math.max(0, t.g * (1 - e)), b: Math.max(0, t.b * (1 - e)), a: t.a ?? 1 }), Ce = (t, e = null, n = 3) => {
  const r = ye(t), i = e ? ye(e) : { r: 255, g: 255, b: 255, a: 1 };
  let s = Ft(r, i);
  if (s >= n) return t;
  const o = $n(i) < 0.5;
  let a = { ...r, a: r.a ?? 1 };
  const c = 20, l = 0.1;
  for (let u = 0; u < c && (o ? a = Au(a, l) : a = Tu(a, l), s = Ft(a, i), !(s >= n)); u++) ;
  return Ou(a);
}, Es = () => typeof navigator > "u" ? "" : navigator.userAgent || "", Cs = () => typeof navigator > "u" ? void 0 : navigator.userAgentData || void 0;
let ks = class {
  constructor() {
    const e = Cs(), n = Es(), r = (s) => (typeof s == "string" || typeof s == "number") && s ? String(s).replace(/_/g, ".").split(".").map((o) => parseInt(o) || 0) : [], i = (s = "") => {
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
}, Ru = class extends ks {
  get iOSRequest() {
    const e = Cs(), n = Es();
    if (this.OS.iOS && !this.OS.iPadOS) return "mobile";
    if (this.OS.iPadOS) return /\(iPad;/.test(n) || e && /^iPad(OS)?$/.test(e.platform) ? "mobile" : "desktop";
  }
};
const Nu = new ks();
new Ru();
const Xr = ":~:text=";
function Du(t) {
  if (!t) return;
  const e = t.indexOf(Xr);
  if (e === -1) return;
  const n = t.slice(e + Xr.length).split("&")[0];
  if (n) try {
    let r = n.split(",");
    const i = { textStart: "" };
    return r.length > 1 && r[0].endsWith("-") && (i.prefix = decodeURIComponent(r[0].slice(0, -1)), r = r.slice(1)), r.length > 1 && r[r.length - 1].startsWith("-") && (i.suffix = decodeURIComponent(r[r.length - 1].slice(1)), r = r.slice(0, -1)), r.length === 0 || r[0] === "" ? void 0 : (i.textStart = decodeURIComponent(r[0]), r.length > 1 && (i.textEnd = decodeURIComponent(r[1])), i);
  } catch {
    return;
  }
}
const Os = ["ADDRESS", "ARTICLE", "ASIDE", "BLOCKQUOTE", "BR", "DETAILS", "DIALOG", "DD", "DIV", "DL", "DT", "FIELDSET", "FIGCAPTION", "FIGURE", "FOOTER", "FORM", "H1", "H2", "H3", "H4", "H5", "H6", "HEADER", "HGROUP", "HR", "LI", "MAIN", "NAV", "OL", "P", "PRE", "SECTION", "TABLE", "UL", "TR", "TH", "TD", "COLGROUP", "COL", "CAPTION", "THEAD", "TBODY", "TFOOT"], Ke = /[\t-\r -#%-\*,-\/:;\?@\[-\]_\{\}\x85\xA0\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u1680\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2000-\u200A\u2010-\u2029\u202F-\u2043\u2045-\u2051\u2053-\u205F\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E44\u3000-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC9\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDF3C-\uDF3E]|\uD807[\uDC41-\uDC45\uDC70\uDC71]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/u, Iu = /[^\t-\r -#%-\*,-\/:;\?@\[-\]_\{\}\x85\xA0\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u1680\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2000-\u200A\u2010-\u2029\u202F-\u2043\u2045-\u2051\u2053-\u205F\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E44\u3000-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC9\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDF3C-\uDF3E]|\uD807[\uDC41-\uDC45\uDC70\uDC71]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/u, As = (t, e, n) => {
  const r = [], i = e.createRange();
  for (i.selectNodeContents(n ?? e); !i.collapsed && r.length < 2; ) {
    let s;
    if (t.prefix) {
      const o = Je(t.prefix, i);
      if (o == null) break;
      mt(i, o.startContainer, o.startOffset);
      const a = e.createRange();
      if (a.setStart(o.endContainer, o.endOffset), a.setEnd(i.endContainer, i.endOffset), Ts(a), a.collapsed || (s = Je(t.textStart, a), s == null)) break;
      if (s.compareBoundaryPoints(Range.START_TO_START, a) !== 0) continue;
    } else {
      if (s = Je(t.textStart, i), s == null) break;
      mt(i, s.startContainer, s.startOffset);
    }
    if (t.textEnd) {
      const o = e.createRange();
      o.setStart(s.endContainer, s.endOffset), o.setEnd(i.endContainer, i.endOffset);
      let a = !1;
      for (; !o.collapsed && r.length < 2; ) {
        const c = Je(t.textEnd, o);
        if (c == null) break;
        if (mt(o, c.startContainer, c.startOffset), s.setEnd(c.endContainer, c.endOffset), t.suffix) {
          const l = Yr(t.suffix, s, i, e);
          if (l === te.NO_SUFFIX_MATCH) break;
          if (l === te.SUFFIX_MATCH) {
            a = !0, r.push(s.cloneRange());
            continue;
          } else if (l === te.MISPLACED_SUFFIX) continue;
        } else a = !0, r.push(s.cloneRange());
      }
      if (!a) break;
    } else if (t.suffix) {
      const o = Yr(t.suffix, s, i, e);
      if (o === te.NO_SUFFIX_MATCH) break;
      if (o === te.SUFFIX_MATCH) {
        r.push(s.cloneRange()), mt(i, i.startContainer, i.startOffset);
        continue;
      } else if (o === te.MISPLACED_SUFFIX) continue;
    } else r.push(s.cloneRange());
  }
  return r;
}, te = { NO_SUFFIX_MATCH: 0, SUFFIX_MATCH: 1, MISPLACED_SUFFIX: 2 }, Yr = (t, e, n, r) => {
  const i = r.createRange();
  i.setStart(e.endContainer, e.endOffset), i.setEnd(n.endContainer, n.endOffset), Ts(i);
  const s = Je(t, i);
  return s == null ? te.NO_SUFFIX_MATCH : s.compareBoundaryPoints(Range.START_TO_START, i) !== 0 ? te.MISPLACED_SUFFIX : te.SUFFIX_MATCH;
}, mt = (t, e, n) => {
  try {
    t.setStart(e, n + 1);
  } catch {
    t.setStartAfter(e);
  }
}, Ts = (t) => {
  const e = Rs(t);
  let n = e.nextNode();
  for (; !t.collapsed && n != null; ) {
    if (n !== t.startContainer && t.setStart(n, 0), n.textContent.length > t.startOffset && !n.textContent[t.startOffset].match(/\s/)) return;
    try {
      t.setStart(n, t.startOffset + 1);
    } catch {
      n = e.nextNode(), n == null ? t.collapse() : t.setStart(n, 0);
    }
  }
}, Rs = (t) => (t.commonAncestorContainer.ownerDocument ?? t.commonAncestorContainer).createTreeWalker(t.commonAncestorContainer, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, { acceptNode: (e) => Lu(e, t) }), Fu = (t) => {
  if (t.hidden === "until-found") return !0;
  const e = t.attributes;
  return !!(e && e.hidden && e.hidden.value === "until-found");
}, ar = (t) => {
  let e = t;
  for (; e != null && !(e instanceof HTMLElement); ) e = e.parentNode;
  const n = e?.ownerDocument?.defaultView;
  if (e != null && n != null) {
    if (Fu(e)) return !0;
    const r = n.getComputedStyle(e);
    if (r.visibility === "hidden" || r.display === "none" || parseInt(r.height, 10) === 0 && r.overflowY != "visible" || parseInt(r.width, 10) === 0 && r.overflowX != "visible" || parseInt(r.opacity, 10) === 0) return !1;
  }
  return !0;
}, Ns = (t, e) => e != null && !e.intersectsNode(t) ? NodeFilter.FILTER_REJECT : ar(t) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT, Lu = (t, e) => e != null && !e.intersectsNode(t) || !ar(t) ? NodeFilter.FILTER_REJECT : t.nodeType === Node.TEXT_NODE ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP, Pu = (t, e) => {
  const n = [];
  let r = [];
  const i = Array.from(_u(t, (s) => Ns(s, e)));
  for (const s of i) s.nodeType === Node.TEXT_NODE ? r.push(s) : s instanceof HTMLElement && Os.includes(s.tagName.toUpperCase()) && r.length > 0 && (n.push(r), r = []);
  return r.length > 0 && n.push(r), n;
}, $u = (t, e, n) => {
  let r = "";
  return t.length === 1 ? r = t[0].textContent.substring(e, n) : r = t[0].textContent.substring(e) + t.slice(1, -1).reduce((i, s) => i + s.textContent, "") + t.slice(-1)[0].textContent.substring(0, n), r.replace(/[\t\n\r ]+/g, " ");
};
function* _u(t, e) {
  const n = (t.ownerDocument ?? t).createTreeWalker(t, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, { acceptNode: e }), r = /* @__PURE__ */ new Set();
  for (; Is(n, r) !== null; ) yield n.currentNode;
}
const Je = (t, e) => {
  const n = Pu(e.commonAncestorContainer, e), r = Ds(e.commonAncestorContainer.ownerDocument ?? void 0);
  for (const i of n) {
    const s = Bu(t, e, i, r);
    if (s !== void 0) return s;
  }
}, Bu = (t, e, n, r) => {
  if (!t || !e || !(n || []).length) return;
  const i = n[0] === e.startContainer ? e.startOffset : 0, s = ae($u(n, i, void 0)), o = ae(t);
  let a = 0, c, l;
  for (; a < s.length; ) {
    const u = s.indexOf(o, a);
    if (u === -1) return;
    if (Uu(s, u, o.length, r)) {
      const h = ae(n[0].data.slice(0, i)).length;
      c = Qr(h + u, n, !1), l = Qr(h + u + o.length, n, !0);
    }
    if (c != null && l != null) {
      const h = new Range();
      if (h.setStart(c.node, c.offset), h.setEnd(l.node, l.offset), e.compareBoundaryPoints(Range.START_TO_START, h) <= 0 && e.compareBoundaryPoints(Range.END_TO_END, h) >= 0) return h;
    }
    a = u + 1;
  }
}, Qr = (t, e, n) => {
  let r = 0, i;
  for (let s = 0; s < e.length; s++) {
    const o = e[s];
    i || (i = ae(o.data));
    let a = r + i.length;
    if (n && (a += 1), a > t) {
      const c = t - r;
      let l = Math.min(t - r, o.data.length);
      const u = n ? i.substring(0, c) : i.substring(c);
      let h = ae(n ? o.data.substring(0, l) : o.data.substring(l));
      const d = (n ? -1 : 1) * (u.length > h.length ? -1 : 1);
      for (; l >= 0 && l <= o.data.length; ) {
        if (h.length === u.length) return { node: o, offset: l };
        l += d, h = ae(n ? o.data.substring(0, l) : o.data.substring(l));
      }
    }
    if (r += i.length, s + 1 < e.length) {
      const c = ae(e[s + 1].data);
      i.slice(-1) === " " && c.slice(0, 1) === " " && (r -= 1), i = c;
    }
  }
}, Uu = (t, e, n, r) => {
  if (e < 0 || e >= t.length || n <= 0 || e + n > t.length) return !1;
  if (r) {
    const i = r.segment(t), s = i.containing(e);
    if (!s || s.isWordLike && s.index != e) return !1;
    const o = e + n, a = i.containing(o);
    if (a && a.isWordLike && a.index != o) return !1;
  } else if (t[e].match(Ke) && (++e, --n, !n) || t[e + n - 1].match(Ke) && (--n, !n) || e !== 0 && !t[e - 1].match(Ke) || e + n !== t.length && !t[e + n].match(Ke)) return !1;
  return !0;
}, ae = (t) => (t || "").normalize("NFKD").replace(/\s+/g, " ").replace(/[\u0300-\u036f]/g, "").toLowerCase(), Ds = (t) => {
  if (Intl.Segmenter) {
    const e = t?.documentElement?.lang || t?.defaultView?.navigator?.language || void 0;
    return new Intl.Segmenter(e, { granularity: "word" });
  }
}, Is = (t, e) => {
  if (!e.has(t.currentNode)) {
    const i = t.firstChild();
    if (i !== null) return i;
  }
  const n = t.nextSibling();
  if (n !== null) return n;
  const r = t.parentNode();
  return r !== null && e.add(r), r;
}, qu = (t, e) => {
  if (!e.has(t.currentNode)) {
    const i = t.lastChild();
    if (i !== null) return i;
  }
  const n = t.previousSibling();
  if (n !== null) return n;
  const r = t.parentNode();
  return r !== null && e.add(r), r;
}, D = { BLOCK_ELEMENTS: Os, BOUNDARY_CHARS: Ke, NON_BOUNDARY_CHARS: Iu, acceptNodeIfVisibleInRange: Ns, normalizeString: ae, makeNewSegmenter: Ds, forwardTraverse: Is, backwardTraverse: qu, makeTextNodeWalker: Rs, isNodeVisible: ar }, zu = 300, Fs = 20, ju = 1, Zr = 3, ei = 1;
let Vu = 500, Ls;
class Ps extends Error {
  constructor() {
    super(...arguments), this.isTimeout = !0;
  }
}
const he = { SUCCESS: 0, INVALID_SELECTION: 1, AMBIGUOUS: 2, TIMEOUT: 3, EXECUTION_FAILED: 4 }, Mu = (t, e = Date.now()) => {
  try {
    return Hu(t, e);
  } catch (n) {
    return n instanceof Ps ? { status: he.TIMEOUT } : { status: he.EXECUTION_FAILED };
  }
}, Hu = (t, e) => {
  Gu(e);
  const n = t.startContainer.ownerDocument, r = Wu(n);
  eh(t), rh(t);
  const i = t.cloneRange();
  if (th(t), t.collapsed) return { status: he.INVALID_SELECTION };
  let s;
  if (Ju(t)) {
    const h = D.normalizeString(t.toString()), d = { textStart: h };
    if (h.length >= Fs && _s(d, n, r)) return { status: he.SUCCESS, fragment: d };
    s = new bn(n, r).setExactTextMatch(h);
  } else {
    const h = ti(t), d = ni(t);
    h && d ? s = new bn(n, r).setStartAndEndSearchSpace(h, d) : s = new bn(n, r).setSharedSearchSpace(t.toString().trim());
  }
  const o = n.createRange();
  o.selectNodeContents(r);
  const a = o.cloneRange();
  o.setEnd(i.startContainer, i.startOffset), a.setStart(i.endContainer, i.endOffset);
  const c = ni(o), l = ti(a);
  (c || l) && s.setPrefixAndSuffixSearchSpace(c, l), s.useSegmenter(D.makeNewSegmenter(n));
  let u = !1;
  do {
    M(), u = s.embiggen();
    const h = s.tryToMakeUniqueFragment();
    if (h != null) return { status: he.SUCCESS, fragment: h };
  } while (u);
  return { status: he.AMBIGUOUS };
}, Wu = (t) => t.querySelector("body") ?? t.documentElement, M = () => {
  const t = Date.now() - Ls;
  if (t > Vu) throw new Ps(`Fragment generation timed out after ${t} ms.`);
}, Gu = (t) => {
  Ls = t;
}, ti = (t) => {
  let e = lt(t);
  const n = be(e, t.endContainer);
  if (!n) return;
  const r = /* @__PURE__ */ new Set();
  t.startContainer.nodeType === Node.ELEMENT_NODE && t.startOffset === t.startContainer.childNodes.length && r.add(t.startContainer);
  const i = e, s = new $s(t, !0), o = t.cloneRange();
  for (; !o.collapsed && e != null; ) {
    if (M(), e.contains?.(i) ? o.setStartAfter(e) : o.setStartBefore(e), s.appendNode(e), s.textInBlock !== null) return s.textInBlock;
    e = D.forwardTraverse(n, r);
  }
}, ni = (t) => {
  let e = Qt(t);
  const n = be(e, t.startContainer);
  if (!n) return;
  const r = /* @__PURE__ */ new Set();
  t.endContainer.nodeType === Node.ELEMENT_NODE && t.endOffset === 0 && r.add(t.endContainer);
  const i = e, s = new $s(t, !1), o = t.cloneRange();
  for (; !o.collapsed && e != null; ) {
    if (M(), e.contains?.(i) ? o.setEnd(e, 0) : o.setEndAfter(e), s.appendNode(e), s.textInBlock !== null) return s.textInBlock;
    e = D.backwardTraverse(n, r);
  }
}, Ku = { ALL_PARTS: 1, SHARED_START_AND_END: 2, CONTEXT_ONLY: 3 };
let bn = class {
  constructor(e, n) {
    this.Mode = Ku, this.startOffset = null, this.endOffset = null, this.prefixOffset = null, this.suffixOffset = null, this.prefixSearchSpace = "", this.backwardsPrefixSearchSpace = "", this.suffixSearchSpace = "", this.numIterations = 0, this.doc = e, this.root = n;
  }
  tryToMakeUniqueFragment() {
    let e;
    if (this.mode === this.Mode.CONTEXT_ONLY ? e = { textStart: this.exactTextMatch } : e = { textStart: this.getStartSearchSpace().substring(0, this.startOffset).trim(), textEnd: this.getEndSearchSpace().substring(this.endOffset).trim() }, this.prefixOffset != null) {
      const n = this.getPrefixSearchSpace().substring(this.prefixOffset).trim();
      n && (e.prefix = n);
    }
    if (this.suffixOffset != null) {
      const n = this.getSuffixSearchSpace().substring(0, this.suffixOffset).trim();
      n && (e.suffix = n);
    }
    return _s(e, this.doc, this.root) ? e : void 0;
  }
  embiggen() {
    let e = !0;
    if (this.mode === this.Mode.SHARED_START_AND_END ? this.startOffset >= this.endOffset && (e = !1) : this.mode === this.Mode.ALL_PARTS ? this.startOffset === this.getStartSearchSpace().length && this.backwardsEndOffset() === this.getEndSearchSpace().length && (e = !1) : this.mode === this.Mode.CONTEXT_ONLY && (e = !1), e) {
      const r = this.getNumberOfRangeWordsToAdd();
      if (this.startOffset < this.getStartSearchSpace().length) {
        let i = 0;
        if (this.getStartSegments() != null) for (; i < r && this.startOffset < this.getStartSearchSpace().length; ) this.startOffset = this.getNextOffsetForwards(this.getStartSegments(), this.startOffset, this.getStartSearchSpace()), i++;
        else {
          let s = this.startOffset;
          do {
            M();
            const o = this.getStartSearchSpace().substring(this.startOffset + 1).search(D.BOUNDARY_CHARS);
            o === -1 ? this.startOffset = this.getStartSearchSpace().length : this.startOffset = this.startOffset + 1 + o, this.getStartSearchSpace().substring(s, this.startOffset).search(D.NON_BOUNDARY_CHARS) !== -1 && (s = this.startOffset, i++);
          } while (this.startOffset < this.getStartSearchSpace().length && i < r);
        }
        this.mode === this.Mode.SHARED_START_AND_END && (this.startOffset = Math.min(this.startOffset, this.endOffset));
      }
      if (this.backwardsEndOffset() < this.getEndSearchSpace().length) {
        let i = 0;
        if (this.getEndSegments() != null) for (; i < r && this.endOffset > 0; ) this.endOffset = this.getNextOffsetBackwards(this.getEndSegments(), this.endOffset), i++;
        else {
          let s = this.backwardsEndOffset();
          do {
            M();
            const o = this.getBackwardsEndSearchSpace().substring(this.backwardsEndOffset() + 1).search(D.BOUNDARY_CHARS);
            o === -1 ? this.setBackwardsEndOffset(this.getEndSearchSpace().length) : this.setBackwardsEndOffset(this.backwardsEndOffset() + 1 + o), this.getBackwardsEndSearchSpace().substring(s, this.backwardsEndOffset()).search(D.NON_BOUNDARY_CHARS) !== -1 && (s = this.backwardsEndOffset(), i++);
          } while (this.backwardsEndOffset() < this.getEndSearchSpace().length && i < r);
        }
        this.mode === this.Mode.SHARED_START_AND_END && (this.endOffset = Math.max(this.startOffset, this.endOffset));
      }
    }
    let n = !1;
    if ((!e || this.startOffset + this.backwardsEndOffset() < Fs || this.numIterations >= ju) && (this.backwardsPrefixOffset() != null && this.backwardsPrefixOffset() !== this.getPrefixSearchSpace().length || this.suffixOffset != null && this.suffixOffset !== this.getSuffixSearchSpace().length) && (n = !0), n) {
      const r = this.getNumberOfContextWordsToAdd();
      if (this.backwardsPrefixOffset() < this.getPrefixSearchSpace().length) {
        let i = 0;
        if (this.getPrefixSegments() != null) for (; i < r && this.prefixOffset > 0; ) this.prefixOffset = this.getNextOffsetBackwards(this.getPrefixSegments(), this.prefixOffset), i++;
        else {
          let s = this.backwardsPrefixOffset();
          do {
            M();
            const o = this.getBackwardsPrefixSearchSpace().substring(this.backwardsPrefixOffset() + 1).search(D.BOUNDARY_CHARS);
            o === -1 ? this.setBackwardsPrefixOffset(this.getBackwardsPrefixSearchSpace().length) : this.setBackwardsPrefixOffset(this.backwardsPrefixOffset() + 1 + o), this.getBackwardsPrefixSearchSpace().substring(s, this.backwardsPrefixOffset()).search(D.NON_BOUNDARY_CHARS) !== -1 && (s = this.backwardsPrefixOffset(), i++);
          } while (this.backwardsPrefixOffset() < this.getPrefixSearchSpace().length && i < r);
        }
      }
      if (this.suffixOffset < this.getSuffixSearchSpace().length) {
        let i = 0;
        if (this.getSuffixSegments() != null) for (; i < r && this.suffixOffset < this.getSuffixSearchSpace().length; ) this.suffixOffset = this.getNextOffsetForwards(this.getSuffixSegments(), this.suffixOffset, this.getSuffixSearchSpace()), i++;
        else {
          let s = this.suffixOffset;
          do {
            M();
            const o = this.getSuffixSearchSpace().substring(this.suffixOffset + 1).search(D.BOUNDARY_CHARS);
            o === -1 ? this.suffixOffset = this.getSuffixSearchSpace().length : this.suffixOffset = this.suffixOffset + 1 + o, this.getSuffixSearchSpace().substring(s, this.suffixOffset).search(D.NON_BOUNDARY_CHARS) !== -1 && (s = this.suffixOffset, i++);
          } while (this.suffixOffset < this.getSuffixSearchSpace().length && i < r);
        }
      }
    }
    return this.numIterations++, e || n;
  }
  setStartAndEndSearchSpace(e, n) {
    return this.startSearchSpace = e, this.endSearchSpace = n, this.backwardsEndSearchSpace = Ot(n), this.startOffset = 0, this.endOffset = n.length, this.mode = this.Mode.ALL_PARTS, this;
  }
  setSharedSearchSpace(e) {
    return this.sharedSearchSpace = e, this.backwardsSharedSearchSpace = Ot(e), this.startOffset = 0, this.endOffset = e.length, this.mode = this.Mode.SHARED_START_AND_END, this;
  }
  setExactTextMatch(e) {
    return this.exactTextMatch = e, this.mode = this.Mode.CONTEXT_ONLY, this;
  }
  setPrefixAndSuffixSearchSpace(e, n) {
    return e && (this.prefixSearchSpace = e, this.backwardsPrefixSearchSpace = Ot(e), this.prefixOffset = e.length), n && (this.suffixSearchSpace = n, this.suffixOffset = 0), this;
  }
  useSegmenter(e) {
    return e == null ? this : (this.mode === this.Mode.ALL_PARTS ? (this.startSegments = e.segment(this.startSearchSpace), this.endSegments = e.segment(this.endSearchSpace)) : this.mode === this.Mode.SHARED_START_AND_END && (this.sharedSegments = e.segment(this.sharedSearchSpace)), this.prefixSearchSpace && (this.prefixSegments = e.segment(this.prefixSearchSpace)), this.suffixSearchSpace && (this.suffixSegments = e.segment(this.suffixSearchSpace)), this);
  }
  getNumberOfContextWordsToAdd() {
    return this.backwardsPrefixOffset() === 0 && this.suffixOffset === 0 ? Zr : ei;
  }
  getNumberOfRangeWordsToAdd() {
    return this.startOffset === 0 && this.backwardsEndOffset() === 0 ? Zr : ei;
  }
  getNextOffsetForwards(e, n, r) {
    let i = e.containing(n);
    for (; i != null; ) {
      M();
      const s = i.index + i.segment.length;
      if (i.isWordLike) return s;
      i = e.containing(s);
    }
    return r.length;
  }
  getNextOffsetBackwards(e, n) {
    let r = e.containing(n);
    for ((!r || n == r.index) && (r = e.containing(n - 1)); r != null; ) {
      if (M(), r.isWordLike) return r.index;
      r = e.containing(r.index - 1);
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
class $s {
  constructor(e, n) {
    this.textFound = !1, this.textNodes = [], this.textInBlock = null, this.searchRange = e, this.isForwardTraversal = n;
  }
  appendNode(e) {
    if (this.textInBlock !== null) return;
    if (le(e)) {
      this.textFound ? (this.isForwardTraversal || this.textNodes.reverse(), this.textInBlock = this.textNodes.map((r) => r.textContent).join("").trim()) : this.textNodes = [];
      return;
    }
    if (!or(e)) return;
    const n = this.getNodeIntersectionWithRange(e);
    this.textFound = this.textFound || (n.textContent ?? "").trim() !== "", this.textNodes.push(n);
  }
  getNodeIntersectionWithRange(e) {
    let n = null, r = null;
    const i = (e.textContent ?? "").length;
    return e === this.searchRange.startContainer && this.searchRange.startOffset !== 0 && (n = this.searchRange.startOffset), e === this.searchRange.endContainer && this.searchRange.endOffset !== i && (r = this.searchRange.endOffset), n !== null || r !== null ? { textContent: (e.textContent ?? "").substring(n ?? 0, r ?? i) } : e;
  }
}
const _s = (t, e, n) => As(t, e, n).length === 1, Ot = (t) => [...t || ""].reverse().join(""), Ju = (t) => t.toString().length > zu ? !1 : !Qu(t), lt = (t) => {
  let e = t.startContainer;
  return e.nodeType == Node.ELEMENT_NODE && t.startOffset < e.childNodes.length && (e = e.childNodes[t.startOffset]), e;
}, Qt = (t) => {
  let e = t.endContainer;
  return e.nodeType == Node.ELEMENT_NODE && t.endOffset > 0 && (e = e.childNodes[t.endOffset - 1]), e;
}, Xu = (t) => {
  const e = lt(t);
  if (or(e) && D.isNodeVisible(e)) return e;
  const n = D.makeTextNodeWalker(t);
  return n.currentNode = e, n.nextNode();
}, Yu = (t) => {
  const e = Qt(t);
  if (or(e) && D.isNodeVisible(e)) return e;
  const n = D.makeTextNodeWalker(t);
  return n.currentNode = e, D.backwardTraverse(n, /* @__PURE__ */ new Set());
}, Qu = (t) => {
  const e = t.cloneRange();
  let n = lt(e);
  const r = be(n);
  if (!r) return !1;
  const i = /* @__PURE__ */ new Set();
  for (; !e.collapsed && n != null; ) {
    if (le(n)) return !0;
    n != null && e.setStartAfter(n), n = D.forwardTraverse(r, i), M();
  }
  return !1;
}, ri = (t, e) => {
  if (t.nodeType !== Node.TEXT_NODE) return -1;
  const n = t, r = e ?? n.data.length;
  if (r < n.data.length && D.BOUNDARY_CHARS.test(n.data[r])) return r;
  const i = n.data.substring(0, r), s = Ot(i).search(D.BOUNDARY_CHARS);
  return s !== -1 ? r - s : -1;
}, Zu = (t, e) => {
  if (t.nodeType !== Node.TEXT_NODE) return -1;
  const n = t, r = e ?? 0;
  if (r < n.data.length && r > 0 && D.BOUNDARY_CHARS.test(n.data[r - 1])) return r;
  const i = n.data.substring(r).search(D.BOUNDARY_CHARS);
  return i !== -1 ? r + i : -1;
}, be = (t, e) => {
  if (!t) return;
  let n = t;
  const r = e ?? t;
  for (; !n.contains?.(r) || !le(n); ) n.parentNode && (n = n.parentNode);
  const i = (n.ownerDocument ?? n).createTreeWalker(n, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, { acceptNode: (s) => D.acceptNodeIfVisibleInRange(s) });
  return i.currentNode = t, i;
}, eh = (t) => {
  const e = D.makeNewSegmenter(t.startContainer.ownerDocument ?? void 0);
  if (e) {
    const n = lt(t);
    n !== t.startContainer && t.setStartBefore(n), Bs(e, !1, t);
  } else {
    const n = ri(t.startContainer, t.startOffset);
    if (n !== -1) {
      t.setStart(t.startContainer, n);
      return;
    }
    if (le(t.startContainer) && t.startOffset === 0) return;
    const r = be(t.startContainer);
    if (!r) return;
    const i = /* @__PURE__ */ new Set();
    let s = D.backwardTraverse(r, i);
    for (; s != null; ) {
      const o = ri(s);
      if (o !== -1) {
        t.setStart(s, o);
        return;
      }
      if (le(s)) {
        s.contains?.(t.startContainer) ? t.setStart(s, 0) : t.setStartAfter(s);
        return;
      }
      s = D.backwardTraverse(r, i), t.collapse();
    }
  }
}, th = (t) => {
  const e = Xu(t);
  if (e == null) {
    t.collapse();
    return;
  }
  lt(t) !== e && t.setStart(e, 0);
  const n = Qt(t), r = Yu(t);
  n !== r && t.setEnd(r, (r.textContent ?? "").length);
}, Bs = (t, e, n) => {
  const r = e ? { node: n.endContainer, offset: n.endOffset } : { node: n.startContainer, offset: n.startOffset }, i = nh(r.node);
  if (!i) return;
  const s = i.preNodes.reduce((p, m) => p.concat(m.textContent ?? ""), ""), o = i.innerNodes.reduce((p, m) => p.concat(m.textContent ?? ""), "");
  let a = s.length;
  r.node.nodeType === Node.TEXT_NODE ? a += r.offset : e && (a += o.length);
  const c = i.postNodes.reduce((p, m) => p.concat(m.textContent ?? ""), ""), l = [...i.preNodes, ...i.innerNodes, ...i.postNodes];
  if (l.length == 0) return;
  const u = s.concat(o, c), h = t.segment(u).containing(a);
  if (!h) {
    e ? n.setEndAfter(l[l.length - 1]) : n.setEndBefore(l[0]);
    return;
  }
  if (!h.isWordLike || a === h.index || a === h.index + h.segment.length) return;
  const d = e ? h.index + h.segment.length : h.index;
  let g = 0;
  for (const p of l) {
    const m = (p.textContent ?? "").length;
    if (g <= d && d < g + m) {
      const b = d - g;
      e ? b >= m ? n.setEndAfter(p) : n.setEnd(p, b) : b >= m ? n.setStartAfter(p) : n.setStart(p, b);
      return;
    }
    g += m;
  }
  e ? n.setEndAfter(l[l.length - 1]) : n.setStartBefore(l[0]);
}, nh = (t) => {
  const e = [], n = be(t);
  if (!n) return;
  const r = /* @__PURE__ */ new Set();
  let i = D.backwardTraverse(n, r);
  for (; i != null && !le(i); ) M(), i.nodeType === Node.TEXT_NODE && e.push(i), i = D.backwardTraverse(n, r);
  e.reverse();
  const s = [];
  if (t.nodeType === Node.TEXT_NODE) s.push(t);
  else {
    const u = (t.ownerDocument ?? t).createTreeWalker(t, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, { acceptNode: (d) => D.acceptNodeIfVisibleInRange(d) });
    u.currentNode = t;
    let h = u.nextNode();
    for (; h != null; ) M(), h.nodeType === Node.TEXT_NODE && s.push(h), h = u.nextNode();
  }
  const o = [], a = be(t);
  if (!a) return;
  const c = /* @__PURE__ */ new Set([t]);
  let l = D.forwardTraverse(a, c);
  for (; l != null && !le(l); ) M(), l.nodeType === Node.TEXT_NODE && o.push(l), l = D.forwardTraverse(a, c);
  return { preNodes: e, innerNodes: s, postNodes: o };
}, rh = (t) => {
  const e = D.makeNewSegmenter(t.endContainer.ownerDocument ?? void 0);
  if (e) {
    const n = Qt(t);
    n !== t.endContainer && t.setEndAfter(n), Bs(e, !0, t);
  } else {
    let n = t.endOffset, r = t.endContainer;
    r.nodeType === Node.ELEMENT_NODE && t.endOffset < r.childNodes.length && (r = r.childNodes[t.endOffset]);
    const i = be(r);
    if (!i) return;
    const s = /* @__PURE__ */ new Set([r]);
    for (; r != null; ) {
      M();
      const o = Zu(r, n);
      if (n = null, o !== -1) {
        t.setEnd(r, o);
        return;
      }
      if (le(r)) {
        r.contains?.(t.endContainer) ? t.setEnd(r, r.childNodes.length) : t.setEndBefore(r);
        return;
      }
      r = D.forwardTraverse(i, s);
    }
    t.collapse();
  }
}, le = (t) => t.nodeType === Node.ELEMENT_NODE && (D.BLOCK_ELEMENTS.includes(t.tagName.toUpperCase()) || t.tagName.toUpperCase() === "HTML" || t.tagName.toUpperCase() === "BODY"), or = (t) => t.nodeType === Node.TEXT_NODE;
function _n(t) {
  return t.otherLocations?.get("cssSelector");
}
function ih(t) {
  return vs.deserialize(t.otherLocations?.get("domRange"));
}
function sh(t) {
  for (const e of t.fragments) {
    const n = Du(e);
    if (n) return n;
  }
}
let Ae = class Us {
  constructor(e) {
    this.fragments = e.fragments ? e.fragments : new Array(), this.progression = e.progression, this.totalProgression = e.totalProgression, this.position = e.position, this.otherLocations = e.otherLocations;
  }
  static deserialize(e) {
    if (!e) return;
    const n = kt(e.progression), r = kt(e.totalProgression), i = kt(e.position), s = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Set(["fragment", "fragments", "progression", "totalProgression", "position", "otherLocations"]);
    return Object.entries(e).forEach(([a, c]) => {
      o.has(a) || s.set(a, c);
    }), e.otherLocations instanceof Map && e.otherLocations.forEach((a, c) => s.set(c, a)), new Us({ fragments: Eu(e.fragments || e.fragment), progression: n !== void 0 && n >= 0 && n <= 1 ? n : void 0, totalProgression: r !== void 0 && r >= 0 && r <= 1 ? r : void 0, position: i !== void 0 && i > 0 ? i : void 0, otherLocations: s.size === 0 ? void 0 : s });
  }
  serialize() {
    const e = {};
    return this.fragments && (e.fragments = this.fragments), this.progression !== void 0 && (e.progression = this.progression), this.totalProgression !== void 0 && (e.totalProgression = this.totalProgression), this.position !== void 0 && (e.position = this.position), this.otherLocations && this.otherLocations.forEach((n, r) => e[r] = n), e;
  }
}, qs = class zs {
  constructor(e) {
    this.after = e.after, this.before = e.before, this.highlight = e.highlight;
  }
  static deserialize(e) {
    if (e) return new zs({ after: e.after, before: e.before, highlight: e.highlight });
  }
  serialize() {
    const e = {};
    return this.after !== void 0 && (e.after = this.after), this.before !== void 0 && (e.before = this.before), this.highlight !== void 0 && (e.highlight = this.highlight), e;
  }
}, js = class Bn {
  constructor(e) {
    const n = e.href.indexOf("#"), r = n >= 0 ? e.href.slice(n + 1) : void 0;
    this.href = n >= 0 ? e.href.slice(0, n) : e.href, this.type = e.type, this.title = e.title;
    const i = e.locations?.fragments, s = r && (!i || i.length === 0);
    this.locations = e.locations ? s ? new Ae({ ...e.locations, fragments: [r] }) : e.locations : r ? new Ae({ fragments: [r] }) : new Ae({}), this.text = e.text;
  }
  static deserialize(e) {
    if (e && e.href && e.type) return new Bn({ href: e.href, type: e.type, title: e.title, locations: Ae.deserialize(e.locations), text: qs.deserialize(e.text) });
  }
  serialize() {
    const e = { href: this.href, type: this.type };
    return this.title !== void 0 && (e.title = this.title), this.locations && (e.locations = this.locations.serialize()), this.text && (e.text = this.text.serialize()), e;
  }
  copyWithLocations(e) {
    return new Bn({ href: this.href, type: this.type, title: this.title, text: this.text, locations: new Ae({ ...this.locations, ...e }) });
  }
};
function ii(t) {
  return t.split("").reverse().join("");
}
function ah(t, e, n) {
  const r = ii(e);
  return n.map((i) => {
    const s = Math.max(0, i.end - e.length - i.errors), o = ii(t.slice(s, i.end));
    return { start: Vs(o, r, i.errors).reduce((a, c) => i.end - c.end < a ? i.end - c.end : a, i.end), end: i.end, errors: i.errors };
  });
}
function Sn(t) {
  return (t | -t) >> 31 & 1;
}
function si(t, e, n, r) {
  let i = t.P[n], s = t.M[n];
  const o = r >>> 31, a = e[n] | o, c = a | s, l = (a & i) + i ^ i | a;
  let u = s | ~(l | i), h = i & l;
  const d = Sn(u & t.lastRowMask[n]) - Sn(h & t.lastRowMask[n]);
  return u <<= 1, h <<= 1, h |= o, u |= Sn(r) - o, i = h | ~(c | u), s = u & c, t.P[n] = i, t.M[n] = s, d;
}
function Vs(t, e, n) {
  if (e.length === 0) return [];
  n = Math.min(n, e.length);
  const r = [], i = 32, s = Math.ceil(e.length / i) - 1, o = { P: new Uint32Array(s + 1), M: new Uint32Array(s + 1), lastRowMask: new Uint32Array(s + 1) };
  o.lastRowMask.fill(1 << 31), o.lastRowMask[s] = 1 << (e.length - 1) % i;
  const a = new Uint32Array(s + 1), c = /* @__PURE__ */ new Map(), l = [];
  for (let d = 0; d < 256; d++) l.push(a);
  for (let d = 0; d < e.length; d += 1) {
    const g = e.charCodeAt(d);
    if (c.has(g)) continue;
    const p = new Uint32Array(s + 1);
    c.set(g, p), g < l.length && (l[g] = p);
    for (let m = 0; m <= s; m += 1) {
      p[m] = 0;
      for (let b = 0; b < i; b += 1) {
        const x = m * i + b;
        x >= e.length || e.charCodeAt(x) === g && (p[m] |= 1 << b);
      }
    }
  }
  let u = Math.max(0, Math.ceil(n / i) - 1);
  const h = new Uint32Array(s + 1);
  for (let d = 0; d <= u; d += 1) h[d] = (d + 1) * i;
  h[s] = e.length;
  for (let d = 0; d <= u; d += 1) o.P[d] = -1, o.M[d] = 0;
  for (let d = 0; d < t.length; d += 1) {
    const g = t.charCodeAt(d);
    let p;
    g < l.length ? p = l[g] : (p = c.get(g), typeof p > "u" && (p = a));
    let m = 0;
    for (let b = 0; b <= u; b += 1) m = si(o, p, b, m), h[b] += m;
    if (h[u] - m <= n && u < s && (p[u + 1] & 1 || m < 0)) {
      u += 1, o.P[u] = -1, o.M[u] = 0;
      let b;
      if (u === s) {
        const x = e.length % i;
        b = x === 0 ? i : x;
      } else b = i;
      h[u] = h[u - 1] + b - m + si(o, p, u, m);
    } else for (; u > 0 && h[u] >= n + i; ) u -= 1;
    u === s && h[u] <= n && (h[u] < n && r.splice(0, r.length), r.push({ start: -1, end: d + 1, errors: h[u] }), n = h[u]);
  }
  return r;
}
function oh(t, e, n) {
  const r = Vs(t, e, n);
  return ah(t, e, r);
}
function Ms(t, e, n) {
  let r = 0;
  const i = [];
  for (; r !== -1; ) r = t.indexOf(e, r), r !== -1 && (i.push({ start: r, end: r + e.length, errors: 0 }), r += 1);
  return i.length > 0 ? i : oh(t, e, n);
}
function ai(t, e) {
  return e.length === 0 || t.length === 0 ? 0 : 1 - Ms(t, e, e.length)[0].errors / e.length;
}
function lh(t, e, n = {}) {
  if (e.length === 0) return null;
  const r = Math.min(256, e.length / 2), i = Ms(t, e, r);
  if (i.length === 0) return null;
  const s = (a) => {
    const c = 1 - a.errors / e.length, l = n.prefix ? ai(t.slice(Math.max(0, a.start - n.prefix.length), a.start), n.prefix) : 1, u = n.suffix ? ai(t.slice(a.end, a.end + n.suffix.length), n.suffix) : 1;
    let h = 1;
    return typeof n.hint == "number" && (h = 1 - Math.abs(a.start - n.hint) / t.length), (50 * c + 20 * l + 20 * u + 2 * h) / 92;
  }, o = i.map((a) => ({ start: a.start, end: a.end, score: s(a) }));
  return o.sort((a, c) => c.score - a.score), o[0];
}
function Un(t, e, n) {
  const r = n === 1 ? e : e - 1;
  if (t.charAt(r).trim() !== "") return e;
  let i, s;
  if (n === 2 ? (i = t.substring(0, e), s = i.trimEnd()) : (i = t.substring(e), s = i.trimStart()), !s.length) return -1;
  const o = i.length - s.length;
  return n === 2 ? e - o : e + o;
}
function oi(t, e) {
  const n = t.commonAncestorContainer.ownerDocument.createNodeIterator(t.commonAncestorContainer, NodeFilter.SHOW_TEXT), r = e === 1 ? t.startContainer : t.endContainer, i = e === 1 ? t.endContainer : t.startContainer;
  let s = n.nextNode();
  for (; s && s !== r; ) s = n.nextNode();
  e === 2 && (s = n.previousNode());
  let o = -1;
  const a = () => {
    if (s = e === 1 ? n.nextNode() : n.previousNode(), s) {
      const c = s.textContent, l = e === 1 ? 0 : c.length;
      o = Un(c, l, e);
    }
  };
  for (; s && o === -1 && s !== i; ) a();
  if (s && o >= 0) return { node: s, offset: o };
  throw new RangeError("No text nodes with non-whitespace text found in range");
}
function ch(t) {
  if (!t.toString().trim().length) throw new RangeError("Range contains no non-whitespace text");
  if (t.startContainer.nodeType !== Node.TEXT_NODE) throw new RangeError("Range startContainer is not a text node");
  if (t.endContainer.nodeType !== Node.TEXT_NODE) throw new RangeError("Range endContainer is not a text node");
  const e = t.cloneRange();
  let n = !1, r = !1;
  const i = { start: Un(t.startContainer.textContent, t.startOffset, 1), end: Un(t.endContainer.textContent, t.endOffset, 2) };
  if (i.start >= 0 && (e.setStart(t.startContainer, i.start), n = !0), i.end > 0 && (e.setEnd(t.endContainer, i.end), r = !0), n && r) return e;
  if (!n) {
    const { node: s, offset: o } = oi(e, 1);
    s && o >= 0 && e.setStart(s, o);
  }
  if (!r) {
    const { node: s, offset: o } = oi(e, 2);
    s && o > 0 && e.setEnd(s, o);
  }
  return e;
}
function Hs(t) {
  switch (t.nodeType) {
    case Node.ELEMENT_NODE:
    case Node.TEXT_NODE:
      return t.textContent?.length ?? 0;
    default:
      return 0;
  }
}
function li(t) {
  let e = t.previousSibling, n = 0;
  for (; e; ) n += Hs(e), e = e.previousSibling;
  return n;
}
function Ws(t, ...e) {
  let n = e.shift();
  const r = t.ownerDocument.createNodeIterator(t, NodeFilter.SHOW_TEXT), i = [];
  let s = r.nextNode(), o, a = 0;
  for (; n !== void 0 && s; ) o = s, a + o.data.length > n ? (i.push({ node: o, offset: n - a }), n = e.shift()) : (s = r.nextNode(), a += o.data.length);
  for (; n !== void 0 && o && a === n; ) i.push({ node: o, offset: o.data.length }), n = e.shift();
  if (n !== void 0) throw new RangeError("Offset exceeds text length");
  return i;
}
let yt = class Te {
  constructor(e, n) {
    if (n < 0) throw new Error("Offset is invalid");
    this.element = e, this.offset = n;
  }
  relativeTo(e) {
    if (!e.contains(this.element)) throw new Error("Parent is not an ancestor of current element");
    let n = this.element, r = this.offset;
    for (; n !== e; ) r += li(n), n = n.parentElement;
    return new Te(n, r);
  }
  resolve(e = {}) {
    try {
      return Ws(this.element, this.offset)[0];
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
        return Te.fromPoint(e, n);
      case Node.ELEMENT_NODE:
        return new Te(e, n);
      default:
        throw new Error("Node is not an element or text node");
    }
  }
  static fromPoint(e, n) {
    switch (e.nodeType) {
      case Node.TEXT_NODE: {
        if (n < 0 || n > e.data.length) throw new Error("Text node offset is out of range");
        if (!e.parentElement) throw new Error("Text node has no parent");
        const r = li(e) + n;
        return new Te(e.parentElement, r);
      }
      case Node.ELEMENT_NODE: {
        if (n < 0 || n > e.childNodes.length) throw new Error("Child node offset is out of range");
        let r = 0;
        for (let i = 0; i < n; i++) r += Hs(e.childNodes[i]);
        return new Te(e, r);
      }
      default:
        throw new Error("Point is not in an element or text node");
    }
  }
}, qn = class Xe {
  constructor(e, n) {
    this.start = e, this.end = n;
  }
  relativeTo(e) {
    return new Xe(this.start.relativeTo(e), this.end.relativeTo(e));
  }
  toRange() {
    let e, n;
    this.start.element === this.end.element && this.start.offset <= this.end.offset ? [e, n] = Ws(this.start.element, this.start.offset, this.end.offset) : (e = this.start.resolve({ direction: 1 }), n = this.end.resolve({ direction: 2 }));
    const r = new Range();
    return r.setStart(e.node, e.offset), r.setEnd(n.node, n.offset), r;
  }
  static fromRange(e) {
    const n = yt.fromPoint(e.startContainer, e.startOffset), r = yt.fromPoint(e.endContainer, e.endOffset);
    return new Xe(n, r);
  }
  static fromOffsets(e, n, r) {
    return new Xe(new yt(e, n), new yt(e, r));
  }
  static trimmedRange(e) {
    return ch(Xe.fromRange(e).toRange());
  }
}, uh = class zn {
  constructor(e, n, r) {
    this.root = e, this.start = n, this.end = r;
  }
  static fromRange(e, n) {
    const r = qn.fromRange(n).relativeTo(e);
    return new zn(e, r.start.offset, r.end.offset);
  }
  static fromSelector(e, n) {
    return new zn(e, n.start, n.end);
  }
  toSelector() {
    return { type: "TextPositionSelector", start: this.start, end: this.end };
  }
  toRange() {
    return qn.fromOffsets(this.root, this.start, this.end).toRange();
  }
}, hh = class jn {
  constructor(e, n, r = {}) {
    this.root = e, this.exact = n, this.context = r;
  }
  static fromRange(e, n) {
    const r = e.textContent, i = qn.fromRange(n).relativeTo(e), s = i.start.offset, o = i.end.offset, a = 32;
    return new jn(e, r.slice(s, o), { prefix: r.slice(Math.max(0, s - a), s), suffix: r.slice(o, Math.min(r.length, o + a)) });
  }
  static fromSelector(e, n) {
    const { prefix: r, suffix: i } = n;
    return new jn(e, n.exact, { prefix: r, suffix: i });
  }
  toSelector() {
    return { type: "TextQuoteSelector", exact: this.exact, prefix: this.context.prefix, suffix: this.context.suffix };
  }
  toRange(e = {}) {
    return this.toPositionAnchor(e).toRange();
  }
  toPositionAnchor(e = {}) {
    const n = this.root.textContent, r = lh(n, this.exact, { ...this.context, hint: e.hint });
    if (!r) throw new Error("Quote not found");
    return new uh(this.root, r.start, r.end);
  }
};
function dh(t) {
  const e = t.tagName.toUpperCase();
  return e === "IMG" || e === "VIDEO" || e === "AUDIO" || e === "IFRAME" || e === "OBJECT" || e === "EMBED" || e === "CANVAS";
}
function ci(t, e) {
  const n = e && _n(e);
  let r = null;
  if (n) try {
    r = t.querySelector(n);
  } catch (i) {
    console.warn(`Invalid cssSelector: ${n}`, i);
  }
  return r ?? t.body ?? t.documentElement;
}
function ui(t, e) {
  let n;
  try {
    n = t.querySelector(e.cssSelector);
  } catch (i) {
    return console.error(`Invalid domRange cssSelector: ${e.cssSelector}`, i), null;
  }
  if (!n) return console.error(`Can't resolve domRange cssSelector: ${e.cssSelector}`), null;
  let r = 0;
  for (const i of n.childNodes) if (i.nodeType === Node.TEXT_NODE) {
    if (r === e.textNodeIndex) return { node: i, offset: e.charOffset };
    r++;
  }
  return console.error(`Can't resolve domRange textNodeIndex ${e.textNodeIndex} for selector: ${e.cssSelector}`), null;
}
function fh(t, e) {
  try {
    const n = e.locations, r = e.text;
    if (n) {
      const i = ih(n);
      if (i) {
        const s = ui(t, i.start), o = i.end ? ui(t, i.end) : s;
        if (s && o) try {
          const a = t.createRange();
          return s.offset !== void 0 ? a.setStart(s.node, s.offset) : a.setStartBefore(s.node), o.offset !== void 0 ? a.setEnd(o.node, o.offset) : a.setEndBefore(o.node), a;
        } catch (a) {
          console.warn("Invalid domRange, falling back:", a);
        }
      }
    }
    if (n) {
      const i = sh(n);
      if (i) {
        const s = ci(t, n), o = As(i, t, s);
        if (o.length > 0) return o[0];
      }
    }
    if (r && r.highlight) {
      const i = ci(t, n), s = new hh(i, r.highlight, { prefix: r.before, suffix: r.after });
      try {
        return s.toRange();
      } catch {
        return console.warn("Quote not found:", s), null;
      }
    }
    if (n) {
      let i = null;
      if (!i && _n(n) && (i = t.querySelector(_n(n))), !i && n.fragments) {
        for (const s of n.fragments) if (i = t.getElementById(s), i) break;
      }
      if (i) {
        const s = t.createRange();
        return i.childNodes.length === 0 || dh(i) ? (s.selectNode(i), s) : (s.setStartBefore(i), s.setEndAfter(i), s);
      }
    }
  } catch (n) {
    console.error(n);
  }
  return null;
}
function gh(t, e) {
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
        const u = t.cloneRange();
        u.selectNode(a), u.compareBoundaryPoints(Range.START_TO_START, t) < 0 && u.setStart(t.startContainer, t.startOffset), u.compareBoundaryPoints(Range.END_TO_END, t) > 0 && u.setEnd(t.endContainer, t.endOffset);
        for (const h of u.getClientRects()) r.push({ left: h.left, right: h.right, top: h.top, bottom: h.bottom, width: h.width, height: h.height });
      }
    }
    a = o.nextNode();
  }
  return r;
}
function He(t, e, n = !1, r = 0) {
  let i;
  if (Array.isArray(t)) i = t;
  else {
    let l = t.getClientRects();
    l.length || t.commonAncestorContainer.nodeType === Node.ELEMENT_NODE && (l = t.commonAncestorContainer.getClientRects()), i = [];
    for (const u of l) i.push({ bottom: u.bottom, height: u.height, left: u.left, right: u.right, top: u.top, width: u.width });
  }
  if (r) for (const l of i) l.left -= r, l.top -= r, l.right += r, l.bottom += r, l.width += r * 2, l.height += r * 2;
  const s = Gs(i, 1, e, n), o = mh(s, 1), a = Ks(o), c = 4;
  for (let l = a.length - 1; l >= 0; l--) {
    const u = a[l];
    if (!(u.width * u.height > c)) if (a.length > 1) a.splice(l, 1);
    else break;
  }
  return a;
}
function Gs(t, e, n, r = !1) {
  for (let i = 0; i < t.length; i++) for (let s = i + 1; s < t.length; s++) {
    const o = t[i], a = t[s];
    if (o === a) continue;
    const c = W(o.top, a.top, e) && W(o.bottom, a.bottom, e), l = W(o.left, a.left, e) && W(o.right, a.right, e);
    if ((l && !n && !r || c && !l) && Js(o, a, e)) {
      const u = t.filter((d) => d !== o && d !== a), h = ph(o, a);
      return u.push(h), Gs(u, e, n, r);
    }
  }
  return t;
}
function ph(t, e) {
  const n = Math.min(t.left, e.left), r = Math.max(t.right, e.right), i = Math.min(t.top, e.top), s = Math.max(t.bottom, e.bottom);
  return { bottom: s, height: s - i, left: n, right: r, top: i, width: r - n };
}
function mh(t, e) {
  const n = new Set(t);
  for (const r of t) {
    if (!(r.width > 1 && r.height > 1)) {
      n.delete(r);
      continue;
    }
    for (const i of t) if (r !== i && n.has(i) && yh(i, r, e)) {
      n.delete(r);
      break;
    }
  }
  return Array.from(n);
}
function yh(t, e, n) {
  return oe(t, e.left, e.top, n) && oe(t, e.right, e.top, n) && oe(t, e.left, e.bottom, n) && oe(t, e.right, e.bottom, n);
}
function oe(t, e, n, r) {
  return (t.left < e || W(t.left, e, r)) && (t.right > e || W(t.right, e, r)) && (t.top < n || W(t.top, n, r)) && (t.bottom > n || W(t.bottom, n, r));
}
function Ks(t) {
  for (let e = 0; e < t.length; e++) for (let n = e + 1; n < t.length; n++) {
    const r = t[e], i = t[n];
    if (r !== i && Js(r, i, -1)) {
      let s = [], o;
      const a = hi(r, i);
      if (a.length === 1) s = a, o = r;
      else {
        const l = hi(i, r);
        a.length < l.length ? (s = a, o = r) : (s = l, o = i);
      }
      const c = t.filter((l) => l !== o);
      return Array.prototype.push.apply(c, s), Ks(c);
    }
  }
  return t;
}
function hi(t, e) {
  const n = bh(e, t);
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
function bh(t, e) {
  const n = Math.max(t.left, e.left), r = Math.min(t.right, e.right), i = Math.max(t.top, e.top), s = Math.min(t.bottom, e.bottom);
  return { bottom: s, height: Math.max(0, s - i), left: n, right: r, top: i, width: Math.max(0, r - n) };
}
function Js(t, e, n) {
  return (t.left < e.right || n >= 0 && W(t.left, e.right, n)) && (e.left < t.right || n >= 0 && W(e.left, t.right, n)) && (t.top < e.bottom || n >= 0 && W(t.top, e.bottom, n)) && (e.top < t.bottom || n >= 0 && W(e.top, t.bottom, n));
}
function W(t, e, n) {
  return Math.abs(t - e) <= n;
}
const di = ["div", "span", "p", "br", "hr", "b", "i", "em", "strong", "s", "u", "mark", "small", "sub", "sup", "abbr", "cite", "code", "data", "dfn", "kbd", "q", "samp", "time", "var", "blockquote", "pre", "svg", "g", "path", "circle", "ellipse", "rect", "line", "polygon", "polyline", "text", "tspan", "defs", "use"], Sh = /^on/i, vh = /* @__PURE__ */ new Set(["href", "src", "action", "formaction", "xlink:href"]), wh = /^\s*(javascript|data):/i;
function xh(t, e) {
  const n = t.document.createElement("div");
  if ("Sanitizer" in t && typeof n.setHTML == "function") try {
    const i = new t.Sanitizer({ allowElements: di });
    return n.setHTML(e, { sanitizer: i }), n.firstElementChild;
  } catch {
  }
  const r = t.document.implementation.createHTMLDocument("");
  for (r.body.innerHTML = e, Eh(r.body, new Set(di)); r.body.firstChild; ) n.appendChild(t.document.adoptNode(r.body.firstChild));
  return n.firstElementChild;
}
function Eh(t, e) {
  const n = Array.from(t.querySelectorAll("*")).reverse();
  for (const r of n) {
    if (!e.has(r.localName)) {
      r.replaceWith(...Array.from(r.childNodes));
      continue;
    }
    for (const { name: i, value: s } of Array.from(r.attributes)) (Sh.test(i) || vh.has(i) && wh.test(s)) && r.removeAttribute(i);
  }
}
function vn(t) {
  switch (t) {
    case R.Mask:
      return "rgba(255, 255, 255, 0.5)";
    case R.Highlight:
    case R.HighlightUnderline:
      return "#FFFF00";
    default:
      return "#FF0000";
  }
}
const R = { Highlight: "highlight", HighlightUnderline: "highlightUnderline", Underline: "underline", Strikethrough: "strikethrough", Outline: "outline", TextColor: "textColor", Mask: "mask", Template: "template" };
var Ch = ((t) => (t.Wrap = "wrap", t.Viewport = "viewport", t.Bounds = "bounds", t.Page = "page", t))(Ch || {}), kh = ((t) => (t.Boxes = "boxes", t.Bounds = "bounds", t))(kh || {});
const Oh = () => "Highlight" in window, fi = ["IMG", "IMAGE", "AUDIO", "VIDEO", "SVG"];
class Ah {
  constructor(e, n, r, i) {
    this.wnd = e, this.comms = n, this.id = r, this.name = i, this.items = [], this.lastItemId = 0, this.container = void 0, this._activatable = !1, this._hoverable = !1, this.hoveredItem = void 0, this.experimentalHighlights = !1, this._tintSubKeys = /* @__PURE__ */ new Map(), this._subKeyCounter = 0, this.maskSvg = void 0, this.shadowHost = void 0, this.shadowRoot = void 0, this.currentRender = 0, Oh() && (this.experimentalHighlights = !0, this.notTextFlag = /* @__PURE__ */ new Map()), this.activationHandler = this.handleActivation.bind(this), this.wnd.document.addEventListener("pointerup", this.activationHandler), this.hoverHandler = this.handleHover.bind(this), this.wnd.document.addEventListener("pointermove", this.hoverHandler);
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
      const n = this.hoveredItem.range.getBoundingClientRect(), r = this.wnd.devicePixelRatio;
      this.comms.send("decoration_pointer_leave", { decorationId: this.hoveredItem.decoration.id, group: this.name, rect: { top: n.top * r, left: n.left * r, width: n.width * r, height: n.height * r } }), this.hoveredItem = void 0;
    }
  }
  add(e) {
    const n = `${this.id}-${this.lastItemId++}`, r = fh(this.wnd.document, e.locator);
    if (!r) {
      this.comms.log("Can't locate DOM range for decoration", e);
      return;
    }
    const i = r.commonAncestorContainer;
    if (i.nodeType !== Node.TEXT_NODE && this.experimentalHighlights && (fi.includes(i.nodeName.toUpperCase()) && this.notTextFlag?.set(n, !0), r.cloneContents().querySelector(fi.join(", ").toLowerCase()) && this.notTextFlag?.set(n, !0), (i.textContent?.trim() || "").length === 0 && this.notTextFlag?.set(n, !0)), this.experimentalHighlights && !this.notTextFlag?.has(n)) {
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
      o !== R.TextColor && (o === R.Outline || o === R.Template || o === R.Mask || a !== void 0 && a !== "boxes" || c !== void 0 && c !== "wrap" || l) && this.notTextFlag?.set(n, !0);
    }
    const s = { decoration: e, id: n, range: r, hitRects: [], clickableElements: void 0, container: void 0 };
    this.items.push(s), this.layout(s), s.hitRects = this.clientRectsToDocCoords(He(s.range, !1, !1, (s.decoration.style.expand ?? 0) + this.hitGap())), this.renderLayout([s]);
  }
  remove(e) {
    const n = this.items.findIndex((s) => s.decoration.id === e);
    if (n < 0) return;
    const r = this.items[n], i = r.decoration.style?.type === R.Mask;
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
  clientRectsToDocCoords(e, n = xe(this.wnd)) {
    const r = n.xDocOffset, i = n.yDocOffset;
    return r === 0 && i === 0 ? e : e.map((s) => ({ left: s.left + r, top: s.top + i, right: s.right + r, bottom: s.bottom + i, width: s.width, height: s.height }));
  }
  pointerToDocCoords(e) {
    const n = xe(this.wnd);
    return { docX: e.clientX + n.xDocOffset, docY: e.clientY + n.yDocOffset };
  }
  effectiveZoom() {
    if (!Nu.UA.Blink) return 1;
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
      if (s.decoration.style.type === R.Template) for (const a of s.clickableElements ?? []) {
        const c = a.getBoundingClientRect();
        if (oe(c, e.clientX, e.clientY, 0)) {
          o = c;
          break;
        }
      }
      else for (const a of s.hitRects) if (oe(a, n, r, 0)) {
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
      if (a.decoration.style.type === R.Template) for (const c of a.clickableElements ?? []) {
        const l = c.getBoundingClientRect();
        if (oe(l, e.clientX, e.clientY, 0)) {
          s = a, o = l;
          break;
        }
      }
      else for (const c of a.hitRects) if (oe(c, n, r, 0)) {
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
          this.layout(e), e.hitRects = this.clientRectsToDocCoords(He(e.range, !1, !1, (e.decoration.style.expand ?? 0) + this.hitGap()));
        }), this.renderLayout(this.items), this.updateSharedMask();
      });
    });
  }
  repositionOverlays() {
    let e = !1;
    const n = [], r = xe(this.wnd);
    this.items.forEach((i) => {
      if (!(this.experimentalHighlights && !this.notTextFlag?.has(i.id))) {
        if (i.decoration.style?.type === R.Mask) {
          e = !0;
          return;
        }
        this.repositionItem(i, r) || (i.container?.remove(), this.layout(i), n.push(i)), i.hitRects = this.clientRectsToDocCoords(He(i.range, !1, !1, (i.decoration.style.expand ?? 0) + this.hitGap()), r);
      }
    }), n.length && this.renderLayout(n), e && this.updateSharedMask();
  }
  experimentalLayout(e) {
    const n = this.requireContainer(!0), r = this.wnd.CSS.highlights, i = e.decoration.style, s = i.type ?? R.Highlight, o = i.tint ?? vn(s), a = i.width, c = i.layout, l = this._getSubKey(s, o);
    e.highlightSubKey && (r.get(e.highlightSubKey)?.delete(e.range), e.highlightSubKey !== l && !this.items.some((m) => m !== e && m.highlightSubKey === e.highlightSubKey) && r.delete(e.highlightSubKey)), e.highlightSubKey = l;
    let u;
    r.has(l) ? u = r.get(l) : (u = new this.wnd.Highlight(), r.set(l, u));
    const h = (m, b) => this.wnd.document.caretPositionFromPoint?.(m, b) ?? null;
    if (s === R.TextColor && (c === "bounds" || a === "bounds" || a === "page")) {
      const m = xe(this.wnd);
      if (m.isVertical) console.warn("Vertical writing detected: caretPositionFromPoint has known bugs, falling back to original range"), u.add(e.range);
      else {
        const b = e.range.getBoundingClientRect();
        let x, A;
        a === "page" ? (x = Math.floor(m.inlineStart(b) / m.pageInlineSize) * m.pageInlineSize, A = m.pageInlineSize) : (x = m.inlineStart(b), A = m.inlineSize(b));
        const S = h(x, m.blockStart(b) + 1), w = h(x + A, m.blockStart(b) + m.blockSize(b) - 1);
        if (S && w) {
          const T = this.wnd.document.createRange();
          T.setStart(S.offsetNode, S.offset), T.setEnd(w.offsetNode, w.offset), u.add(T), e.range = T;
        } else u.add(e.range);
      }
    } else u.add(e.range);
    const d = this.getBackgroundColor(), g = i.enforceContrast !== !1 ? Ce(o, d) : o;
    let p;
    switch (s) {
      case R.Underline:
        p = `::highlight(${l}) {
                    text-decoration: underline;
                    text-decoration-color: ${g};
                    text-decoration-thickness: 0.1em;
                }`;
        break;
      case R.Strikethrough:
        p = `::highlight(${l}) {
                    text-decoration: line-through;
                    text-decoration-color: ${g};
                    text-decoration-thickness: 0.1em;
                }`;
        break;
      case R.Outline:
        p = `::highlight(${l}) {
                    outline: 2px solid ${g};
                    outline-offset: 1px;
                }`;
        break;
      case R.TextColor:
        p = `::highlight(${l}) {
                    color: ${g};
                }`;
        break;
      case R.HighlightUnderline: {
        const { r: m, g: b, b: x } = ye(g), A = `rgba(${m}, ${b}, ${x}, 0.3)`;
        p = `::highlight(${l}) {
                    color: ${Jr(g, d)};
                    background-color: ${A};
                    text-decoration: underline;
                    text-decoration-color: ${g};
                    text-decoration-thickness: 0.1em;
                }`;
        break;
      }
      case R.Highlight:
      default:
        p = `::highlight(${l}) {
                    color: ${Jr(g, d)};
                    background-color: ${g};
                }`;
    }
    e.highlightCSS = p, this._rebuildHighlightStylesheet(n);
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
  positionElement(e, n, r, i, s, o, a = 0) {
    const c = e.decoration?.style?.width, l = s;
    switch (c) {
      case "viewport": {
        const u = Math.floor(n.inlineStart(l) / n.viewportInlineSize) * n.viewportInlineSize;
        n.applyPosition(i, u + n.inlineScrollOffset + a, n.blockStart(l) + n.blockScrollOffset, n.viewportInlineSize - 2 * a, n.blockSize(l), r);
        break;
      }
      case "page": {
        const u = Math.floor(n.inlineStart(l) / n.pageInlineSize) * n.pageInlineSize;
        n.applyPosition(i, u + n.inlineScrollOffset + a, n.blockStart(l) + n.blockScrollOffset, n.pageInlineSize - 2 * a, n.blockSize(l), r);
        break;
      }
      case "bounds": {
        n.applyPosition(i, n.inlineStart(o) + n.inlineScrollOffset, n.blockStart(l) + n.blockScrollOffset, n.inlineSize(o), n.blockSize(l), r);
        break;
      }
      default:
        n.applyPosition(i, n.inlineStart(l) + n.inlineScrollOffset, n.blockStart(l) + n.blockScrollOffset, n.inlineSize(l), n.blockSize(l), r);
    }
  }
  computeOverlayRects(e, n, r, i) {
    if (e.decoration?.style?.layout === "bounds") return [i ? { left: r.left - i, right: r.right + i, top: r.top - i, bottom: r.bottom + i, width: r.width + i * 2, height: r.height + i * 2 } : r];
    const s = e.decoration.style.type, o = s === R.Underline || s === R.Strikethrough, a = s === R.Strikethrough, c = o ? gh(e.range, ["rt", "rp"]) : e.range;
    let l = He(c, !0, n.isVertical, o ? 0 : i);
    return l = l.sort((u, h) => n.isVertical ? (n.isVertLR ? 1 : -1) * (u.left - h.left) : u.top - h.top), l.map((u) => {
      let h = u;
      if (a) {
        const d = n.blockSize(u) * 0.1, g = n.blockStart(u) + n.blockSize(u) / 2 - d / 2;
        h = n.isVertical ? { left: g, right: g + d, top: u.top, bottom: u.bottom, width: d, height: u.height } : { top: g, bottom: g + d, left: u.left, right: u.right, height: d, width: u.width };
      }
      return i && o && (h = n.isVertical ? { ...h, top: h.top - i, bottom: h.bottom + i, height: h.height + i * 2 } : { ...h, left: h.left - i, right: h.right + i, width: h.width + i * 2 }), h;
    });
  }
  repositionItem(e, n) {
    if (!e.container) return !0;
    const r = e.decoration.style;
    if (r.type !== R.Template) {
      const u = r.type ?? R.Highlight;
      if (u === R.TextColor || u === R.Mask) return !0;
    }
    const i = 1 / this.effectiveZoom(), s = r.expand ?? 0, o = e.range.getBoundingClientRect(), a = (() => {
      if (r.type !== R.Outline) return 0;
      const u = r.width;
      return u === "page" || u === "viewport" ? 3 : 0;
    })(), c = this.computeOverlayRects(e, n, o, s), l = Array.from(e.container.children);
    return l.length !== c.length ? !1 : (l.forEach((u, h) => this.positionElement(e, n, i, u, c[h], o, a)), !0);
  }
  layout(e) {
    if (this.experimentalHighlights && !this.notTextFlag?.has(e.id)) return this.experimentalLayout(e);
    const n = this.wnd.document.createElement("div");
    n.setAttribute("id", e.id), n.dataset.highlightId = e.decoration.id, n.style.setProperty("pointer-events", "none");
    const r = xe(this.wnd), i = 1 / this.effectiveZoom(), s = e.decoration.style.expand ?? 0, o = e.range.getBoundingClientRect(), a = e.decoration.style, c = (() => {
      if (a.type !== R.Outline) return 0;
      const h = a.width;
      return h === "page" || h === "viewport" ? 3 : 0;
    })();
    let l;
    if (a.type === R.Template) {
      a.stylesheet && this.injectCustomStylesheet(a.stylesheet);
      const h = xh(this.wnd, a.element);
      if (!h) {
        e.container = n, e.clickableElements = [];
        return;
      }
      h.style.setProperty("pointer-events", "none"), l = h;
    } else {
      const h = a, d = h.type ?? R.Highlight, g = h.tint ?? vn(d);
      if (d === R.TextColor) {
        e.container = n, e.clickableElements = [];
        return;
      }
      if (d === R.Mask) {
        e.container = n, e.clickableElements = [], this.updateSharedMask();
        return;
      }
      const p = this.getCurrentDarkMode(), m = this.getBackgroundColor(), b = h.enforceContrast !== !1, x = (() => {
        switch (d) {
          case R.Underline: {
            const S = b ? Ce(g, m) : g, w = h.layout === "bounds", [T, I] = r.isVertical ? ["border-right", "border-left"] : ["border-bottom", "border-top"];
            return [w ? `${I}: 0.1em solid ${S} !important` : null, `${T}: 0.1em solid ${S} !important`, "background-color: transparent !important", "box-sizing: border-box !important"].filter(Boolean).join("; ");
          }
          case R.Strikethrough: {
            const S = b ? Ce(g, m) : g;
            return h.layout === "bounds" ? [`background: repeating-linear-gradient(-45deg, transparent, transparent 19px, ${S} 19px, ${S} 20px) !important`, "background-color: transparent !important", "box-sizing: border-box !important"].join("; ") : [`background-color: ${S} !important`, "box-sizing: border-box !important"].join("; ");
          }
          case R.Outline:
            return [`outline: 2px solid ${b ? Ce(g, m) : g} !important`, "outline-offset: 1px !important", "background-color: transparent !important", "box-sizing: border-box !important"].join("; ");
          case R.HighlightUnderline: {
            const S = b ? Ce(g, m) : g, { r: w, g: T, b: I } = ye(S), P = `rgba(${w}, ${T}, ${I}, 0.3)`, X = h.layout === "bounds", [V, y] = r.isVertical ? ["border-right", "border-left"] : ["border-bottom", "border-top"];
            return [`background-color: ${P} !important`, X ? `${y}: 0.1em solid ${S} !important` : null, `${V}: 0.1em solid ${S} !important`, "box-sizing: border-box !important"].filter(Boolean).join("; ");
          }
          case R.Highlight:
          default:
            return [`background-color: ${b ? Ce(g, m) : g} !important`, `mix-blend-mode: ${p ? "exclusion" : "multiply"} !important`, "opacity: 1 !important", "box-sizing: border-box !important", "transform: translateZ(0) !important"].join("; ");
        }
      })(), A = this.wnd.document.createElement("template");
      A.innerHTML = `<div data-readium="true" class="readium-${d}" style="${x}"></div>`.trim(), l = A.content.firstElementChild;
    }
    const u = this.computeOverlayRects(e, r, o, s);
    for (const h of u) {
      const d = l.cloneNode(!0);
      d.style.setProperty("pointer-events", "none"), this.positionElement(e, r, i, d, h, o, c), n.append(d);
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
    return Kr(this.wnd, "--USER__appearance") === "readium-night-on" || xs(this.getBackgroundColor());
  }
  getBackgroundColor() {
    return Kr(this.wnd, "--USER__backgroundColor") || this.wnd.getComputedStyle(this.wnd.document.documentElement).getPropertyValue("background-color");
  }
  updateSharedMask() {
    const e = this.items.filter((d) => d.decoration.style?.type === R.Mask);
    if (e.length === 0) {
      this.maskSvg && (this.maskSvg.remove(), this.maskSvg = void 0), this.shadowHost && !this.container && (this.shadowHost.remove(), this.shadowRoot = void 0, this.shadowHost = void 0);
      return;
    }
    const n = xe(this.wnd), r = 1 / this.effectiveZoom(), i = this.wnd.document.documentElement, s = i.scrollWidth, o = i.scrollHeight, a = [];
    for (const d of e) {
      const g = d.decoration.style, p = g.layout ?? "boxes", m = g.width ?? "wrap", b = g.expand ?? 0, x = d.range.getBoundingClientRect(), A = p === "bounds" ? [b ? { left: x.left - b, top: x.top - b, right: x.right + b, bottom: x.bottom + b, width: x.width + b * 2, height: x.height + b * 2 } : x] : He(d.range, !1, !1, b);
      for (const S of A) {
        let w;
        switch (m) {
          case "viewport": {
            const T = Math.floor(n.inlineStart(S) / n.viewportInlineSize) * n.viewportInlineSize;
            w = n.toRect(T, n.blockStart(S), n.viewportInlineSize, n.blockSize(S));
            break;
          }
          case "page": {
            const T = Math.floor(n.inlineStart(S) / n.pageInlineSize) * n.pageInlineSize;
            w = n.toRect(T, n.blockStart(S), n.pageInlineSize, n.blockSize(S));
            break;
          }
          case "bounds": {
            w = n.toRect(n.inlineStart(x), n.blockStart(S), n.inlineSize(x), n.blockSize(S));
            break;
          }
          default:
            w = n.toRect(n.inlineStart(S), n.blockStart(S), n.inlineSize(S), n.blockSize(S));
        }
        a.push(w);
      }
    }
    const c = [`M0 0 H${s} V${o} H0 Z`, ...a.map((d) => {
      const g = (d.left + n.xDocOffset) * r, p = (d.top + n.yDocOffset) * r, m = (d.right + n.xDocOffset) * r, b = (d.bottom + n.yDocOffset) * r;
      return `M${g} ${p} H${m} V${b} H${g} Z`;
    })].join(" "), l = "http://www.w3.org/2000/svg";
    if (!this.maskSvg) {
      this.shadowRoot || (this.shadowHost = this.wnd.document.createElement("div"), this.shadowHost.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none", this.wnd.document.body.appendChild(this.shadowHost), this.shadowRoot = this.shadowHost.attachShadow({ mode: "open" })), this.maskSvg = this.wnd.document.createElementNS(l, "svg"), this.maskSvg.style.cssText = `position:absolute;top:0;left:0;width:${s}px;height:${o}px;pointer-events:none;z-index:9999`, this.maskSvg.dataset.readium = "true";
      const d = this.wnd.document.createElementNS(l, "defs"), g = this.wnd.document.createElementNS(l, "clipPath"), p = `${this.id}-mask-clip`;
      g.setAttribute("id", p), g.setAttribute("clipPathUnits", "userSpaceOnUse");
      const m = this.wnd.document.createElementNS(l, "path");
      m.setAttribute("clip-rule", "evenodd"), g.appendChild(m), d.appendChild(g), this.maskSvg.appendChild(d);
      const b = this.wnd.document.createElementNS(l, "rect");
      b.setAttribute("id", `${this.id}-mask-rect`), b.setAttribute("clip-path", `url(#${p})`), b.style.pointerEvents = "none", this.maskSvg.appendChild(b), this.shadowRoot.appendChild(this.maskSvg);
    }
    this.maskSvg.style.width = `${s}px`, this.maskSvg.style.height = `${o}px`;
    const u = this.maskSvg.querySelector("path");
    u && u.setAttribute("d", c);
    const h = this.maskSvg.querySelector("rect");
    if (h) {
      const d = e[0].decoration.style.tint, g = d ?? this.getBackgroundColor() ?? vn(R.Mask), p = d ? "1" : "0.5";
      h.setAttribute("x", "0"), h.setAttribute("y", "0"), h.setAttribute("width", String(s)), h.setAttribute("height", String(o)), h.setAttribute("fill", g), h.setAttribute("fill-opacity", p);
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
const Xs = class Re extends Su {
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
  mount(e, n) {
    return this.wnd = e, n.register("decorate", Re.moduleName, (r, i) => {
      const s = r;
      (s.action === "add" || s.action === "update") && s.decoration.locator && (s.decoration.locator = js.deserialize(s.decoration.locator)), this.groups.has(s.group) || this.groups.set(s.group, new Ah(e, n, `readium-decoration-${this.lastGroupId++}`, s.group));
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
    }), n.register("decoration_resize", Re.moduleName, (r, i) => {
      const s = r;
      s.action === "watch" ? this.addDecorationResizeTarget(s.selector) : this.removeDecorationResizeTarget(s.selector), i(!0);
    }), n.register("decoration_activatable", Re.moduleName, (r, i) => {
      const s = r, o = this.groups.get(s.group);
      o && (o.activatable = s.activatable), i(!0);
    }), n.register("decoration_hoverable", Re.moduleName, (r, i) => {
      const s = r, o = this.groups.get(s.group);
      o && (o.hoverable = s.hoverable), i(!0);
    }), this.resizeObserver = new ResizeObserver(() => e.requestAnimationFrame(() => this.handleResize())), this.resizeObserver.observe(e.document.documentElement), e.addEventListener("orientationchange", this.handleResizer), e.addEventListener("resize", this.handleResizer), e.addEventListener("scroll", this.handleScroller, { passive: !0, capture: !0 }), this.styleObserver = new MutationObserver((r) => {
      r.some((i) => i.type === "attributes" && i.attributeName === "style" && i.oldValue !== i.target.getAttribute("style")) && this.updateHighlightStyles();
    }), this.styleObserver.observe(e.document.documentElement, { attributes: !0, attributeFilter: ["style"], attributeOldValue: !0 }), n.log("Decorator Mounted"), !0;
  }
  unmount(e, n) {
    return e.removeEventListener("orientationchange", this.handleResizer), e.removeEventListener("resize", this.handleResizer), e.removeEventListener("scroll", this.handleScroller, { capture: !0 }), n.unregisterAll(Re.moduleName), this.resizeObserver.disconnect(), this.styleObserver.disconnect(), this.cleanup(), n.log("Decorator Unmounted"), !0;
  }
  addDecorationResizeTarget(e) {
    const n = this.observedResizeTargets.get(e);
    n && this.resizeObserver.unobserve(n);
    const r = this.wnd.document.querySelector(e);
    r ? (this.resizeObserver.observe(r), this.observedResizeTargets.set(e, r)) : this.observedResizeTargets.delete(e);
  }
  removeDecorationResizeTarget(e) {
    const n = this.observedResizeTargets.get(e);
    n && (this.resizeObserver.unobserve(n), this.observedResizeTargets.delete(e));
  }
};
Xs.moduleName = "decorator";
let Th = Xs;
const Rh = new Set(Object.values(R));
function Nh(t, e) {
  return t === R.TextColor ? typeof window < "u" && "Highlight" in window : Rh.has(t) ? !0 : !!e?.[t];
}
function gi(t, e) {
  const { style: n } = t;
  if (n.type === R.Template) {
    const r = n;
    return { ...t, style: { ...r, element: pi(r, t) } };
  }
  if (n.type && e?.[n.type]) {
    const r = e[n.type];
    return { ...t, style: { type: R.Template, layout: r.layout, width: r.width, stylesheet: r.stylesheet, element: pi(r, t) } };
  }
  return t;
}
function pi(t, e) {
  return typeof t.element == "function" ? t.element(e) : t.element;
}
function Dh(t, e) {
  if (t.type !== e.type) return !1;
  if (t.type === R.Template) {
    const i = t, s = e;
    return i.layout === s.layout && i.width === s.width && i.stylesheet === s.stylesheet;
  }
  const n = t, r = e;
  return n.tint === r.tint && n.layout === r.layout && n.width === r.width && (n.enforceContrast ?? !0) === (r.enforceContrast ?? !0) && (n.expand ?? 0) === (r.expand ?? 0);
}
function Ih(t, e) {
  return t.locator.href === e.locator.href && JSON.stringify(t.locator.locations?.serialize?.() ?? t.locator.locations) === JSON.stringify(e.locator.locations?.serialize?.() ?? e.locator.locations) && JSON.stringify(t.locator.text ?? null) === JSON.stringify(e.locator.text ?? null) && Dh(t.style, e.style) && JSON.stringify(t.extras ?? null) === JSON.stringify(e.extras ?? null);
}
class Ys {
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
}
class Fh {
  constructor() {
    this.frame = new Lh(this), this.host = new Ph(this);
  }
}
class Lh {
  constructor(e) {
    this.channel = e, this.registrar = /* @__PURE__ */ new Map(), this.outbox = new Ys(), this.ready = !0;
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
}
class Ph {
  constructor(e) {
    this.channel = e, this.listeners = /* @__PURE__ */ new Map(), this.outbox = new Ys(), this.ready = !0;
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
class $h {
  constructor(e, n = {}) {
    this.host = e, this._decorations = /* @__PURE__ */ new Map(), this._activationState = /* @__PURE__ */ new Map(), this._hoverState = /* @__PURE__ */ new Map(), this._observers = /* @__PURE__ */ new Map(), this._hoveredDecorations = /* @__PURE__ */ new Map(), this._config = n, n.resizeWatchSelectors?.forEach((r) => this.addDecorationResizeTarget(r)), e.on("decoration_activated", (r) => {
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
  addDecorationResizeTarget(e) {
    this.host.send("decoration_resize", { action: "watch", selector: e });
  }
  removeDecorationResizeTarget(e) {
    this.host.send("decoration_resize", { action: "unwatch", selector: e });
  }
  supportsDecorationStyle(e) {
    return Nh(e, this._config.decorationTemplates);
  }
  applyDecorations(e, n) {
    const r = this._decorations.get(n) ?? [], i = new Map(r.map((c) => [c.id, c])), s = new Map(e.map((c) => [c.id, c]));
    for (const [c, l] of i) {
      const u = s.get(c);
      u ? Ih(l, u) || this.host.send("decorate", { group: n, action: "update", decoration: gi(u, this._config.decorationTemplates) }) : this.host.send("decorate", { group: n, action: "remove", decoration: { id: c } });
    }
    for (const [c, l] of s) i.has(c) || this.host.send("decorate", { group: n, action: "add", decoration: gi(l, this._config.decorationTemplates) });
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
function _h(t) {
  return new vs({
    start: new It(t.start),
    end: t.end ? new It(t.end) : void 0
  });
}
function Bh(t, e = window) {
  const { text: n, cssSelector: r, domRange: i, fragment: s } = t, o = n ? new qs(n) : void 0, a = r || i ? /* @__PURE__ */ new Map() : void 0;
  a && (r && a.set("cssSelector", r), i && a.set("domRange", _h(i).serialize()));
  const l = a !== void 0 || s !== void 0 ? new Ae({
    fragments: s ? [s] : void 0,
    otherLocations: a
  }) : void 0;
  return new js({
    href: e.location.href,
    type: "text/html",
    text: o,
    locations: l
  });
}
class Uh extends $h {
  constructor(e, n, r, i = {}) {
    super(e.host, i), this.channel = e, this.wnd = n, this.decorator = r;
  }
  // Convenience wrapper: builds Locators from shorthand text/cssSelector options
  // and delegates to applyDecorations, which replaces the entire decoration
  // set for a group on every call — batch everything for a group into one
  // call rather than clobbering the previous one.
  decorate(e, n) {
    this.applyDecorations(
      e.map(({ id: r, style: i, ...s }) => ({
        id: r,
        style: i,
        locator: Bh(s, this.wnd)
      })),
      n
    );
  }
  destroy() {
    super.destroy(), this.decorator.unmount(this.wnd, this.channel.frame), this.channel.frame.destroy();
  }
}
function rp(t = window, e = {}) {
  const n = new Fh(), r = new Th();
  return r.mount(t, n.frame), new Uh(n, t, r, e);
}
class ip {
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
const Lt = { range: [0, 5e3], step: 100 }, Pt = { range: [0.1, 10], step: 0.1 }, $t = { range: [0, 2], step: 0.1 }, _t = { range: [0, 1], step: 0.05 }, lr = ["none", "few", "some", "most", "custom"], cr = ["none", "block-level", "always"], ur = ["plain", "ssml"], hr = ["none", "utterance", "block"], mi = [
  "format",
  "inlineContextualization",
  "verbosity",
  "skip",
  "contextualize",
  "language"
];
function dr(t) {
  return t == null || typeof t == "boolean" ? t : void 0;
}
function re(t, e) {
  return t == null || e.includes(t) ? t : void 0;
}
function ie(t, e) {
  if (t == null) return t;
  if (typeof t != "number" || Number.isNaN(t)) return;
  const n = Math.min(...e), r = Math.max(...e);
  return t >= n && t <= r ? t : void 0;
}
function rt(t) {
  return t == null || Array.isArray(t) && t.every((e) => typeof e == "string") ? t : void 0;
}
class qh {
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
    this.format = re(e.format, ur) ?? "plain", this.inlineContextualization = dr(e.inlineContextualization) ?? !1, this.verbosity = re(e.verbosity, lr) ?? "few", this.skip = rt(e.skip) ?? [], this.contextualize = rt(e.contextualize) ?? [], this.language = re(e.language, cr) ?? "block-level", this.pauseDuration = ie(e.pauseDuration, Lt.range) ?? 300, this.autoPause = re(e.autoPause, hr) ?? "none", this.rate = ie(e.rate, Pt.range) ?? 1, this.pitch = ie(e.pitch, $t.range) ?? 1, this.volume = ie(e.volume, _t.range) ?? 1;
  }
}
class it {
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
    this.format = re(e.format, ur), this.inlineContextualization = dr(e.inlineContextualization), this.verbosity = re(e.verbosity, lr), this.skip = rt(e.skip), this.contextualize = rt(e.contextualize), this.language = re(e.language, cr), this.pauseDuration = ie(e.pauseDuration, Lt.range), this.autoPause = re(e.autoPause, hr), this.rate = ie(e.rate, Pt.range), this.pitch = ie(e.pitch, $t.range), this.volume = ie(e.volume, _t.range);
  }
  merging(e) {
    const n = { ...this };
    for (const r of Object.keys(e))
      e[r] !== void 0 && (n[r] = e[r]);
    return new it(n);
  }
}
class Zt {
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
class bt extends Zt {
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
    if (e != null && re(e, this._supportedValues) === void 0)
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
class zh extends Zt {
  set value(e) {
    if (e != null && dr(e) === void 0)
      throw new Error(`Value '${String(e)}' is not a boolean.`);
    this._value = e, this._onChange(this._value);
  }
  get value() {
    return this._value;
  }
}
class yi extends Zt {
  set value(e) {
    if (e != null && rt(e) === void 0)
      throw new Error(`Value '${String(e)}' is not an array of strings.`);
    this._value = e, this._onChange(this._value);
  }
  get value() {
    return this._value;
  }
}
class St extends Zt {
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
    if (e != null && ie(e, this._supportedRange) === void 0)
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
class bi {
  preferences;
  settings;
  // Cloned rather than aliased: edits made through this editor's setters
  // are staged on this copy and only reach the navigator's own preferences
  // once explicitly passed to submitPreferences() — discarding the editor
  // without submitting must leave the navigator untouched.
  constructor(e, n) {
    this.preferences = new it({ ...e }), this.settings = n;
  }
  // Explicit `null`s, not `undefined` — merging() skips `undefined` fields,
  // so only `null` actually clears them once submitted.
  clear() {
    this.preferences = new it({
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
    return new bt({
      initialValue: this.preferences.format,
      effectiveValue: this.settings.format,
      isEffective: this.preferences.format != null,
      onChange: (e) => this.updatePreference("format", e ?? null),
      supportedValues: ur
    });
  }
  get inlineContextualization() {
    return new zh({
      initialValue: this.preferences.inlineContextualization,
      effectiveValue: this.settings.inlineContextualization,
      isEffective: this.preferences.inlineContextualization != null,
      onChange: (e) => this.updatePreference("inlineContextualization", e ?? null)
    });
  }
  get verbosity() {
    return new bt({
      initialValue: this.preferences.verbosity,
      effectiveValue: this.settings.verbosity,
      isEffective: this.preferences.verbosity != null,
      onChange: (e) => this.updatePreference("verbosity", e ?? null),
      supportedValues: lr
    });
  }
  get skip() {
    return new yi({
      initialValue: this.preferences.skip,
      effectiveValue: this.settings.skip,
      isEffective: this.preferences.skip != null,
      onChange: (e) => this.updatePreference("skip", e ?? null)
    });
  }
  get contextualize() {
    return new yi({
      initialValue: this.preferences.contextualize,
      effectiveValue: this.settings.contextualize,
      isEffective: this.preferences.contextualize != null,
      onChange: (e) => this.updatePreference("contextualize", e ?? null)
    });
  }
  get language() {
    return new bt({
      initialValue: this.preferences.language,
      effectiveValue: this.settings.language,
      isEffective: this.preferences.language != null,
      onChange: (e) => this.updatePreference("language", e ?? null),
      supportedValues: cr
    });
  }
  get pauseDuration() {
    return new St({
      initialValue: this.preferences.pauseDuration,
      effectiveValue: this.settings.pauseDuration,
      isEffective: this.preferences.pauseDuration != null,
      onChange: (e) => this.updatePreference("pauseDuration", e ?? null),
      supportedRange: Lt.range,
      step: Lt.step
    });
  }
  get autoPause() {
    return new bt({
      initialValue: this.preferences.autoPause,
      effectiveValue: this.settings.autoPause,
      isEffective: this.preferences.autoPause != null,
      onChange: (e) => this.updatePreference("autoPause", e ?? null),
      supportedValues: hr
    });
  }
  get rate() {
    return new St({
      initialValue: this.preferences.rate,
      effectiveValue: this.settings.rate,
      isEffective: this.preferences.rate != null,
      onChange: (e) => this.updatePreference("rate", e ?? null),
      supportedRange: Pt.range,
      step: Pt.step
    });
  }
  get pitch() {
    return new St({
      initialValue: this.preferences.pitch,
      effectiveValue: this.settings.pitch,
      isEffective: this.preferences.pitch != null,
      onChange: (e) => this.updatePreference("pitch", e ?? null),
      supportedRange: $t.range,
      step: $t.step
    });
  }
  get volume() {
    return new St({
      initialValue: this.preferences.volume,
      effectiveValue: this.settings.volume,
      isEffective: this.preferences.volume != null,
      onChange: (e) => this.updatePreference("volume", e ?? null),
      supportedRange: _t.range,
      step: _t.step
    });
  }
}
const Qs = ["audio", "figure", "image", "math", "table", "video"], Zs = [
  ...Qs,
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
], jh = [
  ...Zs,
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
], Vh = {
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
}, Mh = {
  none: /* @__PURE__ */ new Set(),
  few: new Set(Qs),
  some: new Set(Zs),
  most: new Set(jh)
}, Vn = {
  table: { few: "inline", some: "block", most: "block" }
};
function vt(t) {
  const e = {};
  for (const n of Object.keys(Vn))
    e[n] = Vn[n]?.[t] ?? "inline";
  return e;
}
const Hh = {
  none: vt("none"),
  few: vt("few"),
  some: vt("some"),
  most: vt("most")
}, sp = Object.keys(Vn);
function Wh(t, e) {
  const n = t === "custom" ? {} : Hh[t];
  if (!e) return n;
  const r = { ...n };
  for (const i of Object.keys(e)) {
    const s = e[i]?.[t];
    s && (r[i] = s);
  }
  return r;
}
class Si {
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
    this.format = e.format ?? n.format, this.inlineContextualization = e.inlineContextualization ?? n.inlineContextualization, this.verbosity = e.verbosity ?? n.verbosity, this.verbosity === "custom" ? (this.skip = e.skip ?? n.skip, this.contextualize = e.contextualize ?? n.contextualize) : (this.skip = [...Vh[this.verbosity]], this.contextualize = [...Mh[this.verbosity]]), this.language = e.language ?? n.language, this.pauseDuration = e.pauseDuration ?? n.pauseDuration, this.autoPause = e.autoPause ?? n.autoPause, this.rate = e.rate ?? n.rate, this.pitch = e.pitch ?? n.pitch, this.volume = e.volume ?? n.volume;
  }
}
const O = (t) => typeof t == "string", We = () => {
  let t, e;
  const n = new Promise((r, i) => {
    t = r, e = i;
  });
  return n.resolve = t, n.reject = e, n;
}, vi = (t) => t == null ? "" : String(t), Gh = (t, e, n) => {
  t.forEach((r) => {
    e[r] && (n[r] = e[r]);
  });
}, Kh = /###/g, wi = (t) => t && t.includes("###") ? t.replace(Kh, ".") : t, xi = (t) => !t || O(t), Qe = (t, e, n) => {
  const r = O(e) ? e.split(".") : e;
  let i = 0;
  for (; i < r.length - 1; ) {
    if (xi(t)) return {};
    const s = wi(r[i]);
    !t[s] && n && (t[s] = new n()), Object.prototype.hasOwnProperty.call(t, s) ? t = t[s] : t = {}, ++i;
  }
  return xi(t) ? {} : {
    obj: t,
    k: wi(r[i])
  };
}, Ei = (t, e, n) => {
  const {
    obj: r,
    k: i
  } = Qe(t, e, Object);
  if (r !== void 0 || e.length === 1) {
    r[i] = n;
    return;
  }
  let s = e[e.length - 1], o = e.slice(0, e.length - 1), a = Qe(t, o, Object);
  for (; a.obj === void 0 && o.length; )
    s = `${o[o.length - 1]}.${s}`, o = o.slice(0, o.length - 1), a = Qe(t, o, Object), a?.obj && typeof a.obj[`${a.k}.${s}`] < "u" && (a.obj = void 0);
  a.obj[`${a.k}.${s}`] = n;
}, Jh = (t, e, n, r) => {
  const {
    obj: i,
    k: s
  } = Qe(t, e, Object);
  i[s] = i[s] || [], i[s].push(n);
}, Bt = (t, e) => {
  const {
    obj: n,
    k: r
  } = Qe(t, e);
  if (n && Object.prototype.hasOwnProperty.call(n, r))
    return n[r];
}, Xh = (t, e, n) => {
  const r = Bt(t, n);
  return r !== void 0 ? r : Bt(e, n);
}, ea = (t, e, n) => {
  for (const r in e)
    r !== "__proto__" && r !== "constructor" && (Object.prototype.hasOwnProperty.call(t, r) ? O(t[r]) || t[r] instanceof String || O(e[r]) || e[r] instanceof String ? n && (t[r] = e[r]) : ea(t[r], e[r], n) : t[r] = e[r]);
  return t;
}, ee = (t) => t.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), Yh = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;"
}, Qh = (t) => O(t) ? t.replace(/[&<>"'\/]/g, (e) => Yh[e]) : t;
class Zh {
  constructor(e) {
    this.capacity = e, this.regExpMap = /* @__PURE__ */ new Map(), this.regExpQueue = [];
  }
  getRegExp(e) {
    const n = this.regExpMap.get(e);
    if (n !== void 0)
      return n;
    const r = new RegExp(e);
    return this.regExpQueue.length === this.capacity && this.regExpMap.delete(this.regExpQueue.shift()), this.regExpMap.set(e, r), this.regExpQueue.push(e), r;
  }
}
const ed = [" ", ",", "?", "!", ";"], td = new Zh(20), nd = (t, e, n) => {
  e = e || "", n = n || "";
  const r = ed.filter((o) => !e.includes(o) && !n.includes(o));
  if (r.length === 0) return !0;
  const i = td.getRegExp(`(${r.map((o) => o === "?" ? "\\?" : o).join("|")})`);
  let s = !i.test(t);
  if (!s) {
    const o = t.indexOf(n);
    o > 0 && !i.test(t.substring(0, o)) && (s = !0);
  }
  return s;
}, Mn = (t, e, n = ".") => {
  if (!t) return;
  if (t[e])
    return Object.prototype.hasOwnProperty.call(t, e) ? t[e] : void 0;
  const r = e.split(n);
  let i = t;
  for (let s = 0; s < r.length; ) {
    if (!i || typeof i != "object")
      return;
    let o, a = "";
    for (let c = s; c < r.length; ++c)
      if (c !== s && (a += n), a += r[c], o = i[a], o !== void 0) {
        if (["string", "number", "boolean"].includes(typeof o) && c < r.length - 1)
          continue;
        s += c - s + 1;
        break;
      }
    i = o;
  }
  return i;
}, st = (t) => t?.replace(/_/g, "-"), rd = {
  type: "logger",
  log(t) {
    this.output("log", t);
  },
  warn(t) {
    this.output("warn", t);
  },
  error(t) {
    this.output("error", t);
  },
  output(t, e) {
    console?.[t]?.apply?.(console, e);
  }
};
class Ut {
  constructor(e, n = {}) {
    this.init(e, n);
  }
  init(e, n = {}) {
    this.prefix = n.prefix || "i18next:", this.logger = e || rd, this.options = n, this.debug = n.debug;
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
  forward(e, n, r, i) {
    return i && !this.debug ? null : (e = e.map((s) => O(s) ? s.replace(/[\r\n\x00-\x1F\x7F]/g, " ") : s), O(e[0]) && (e[0] = `${r}${this.prefix} ${e[0]}`), this.logger[n](e));
  }
  create(e) {
    return new Ut(this.logger, {
      prefix: `${this.prefix}:${e}:`,
      ...this.options
    });
  }
  clone(e) {
    return e = e || this.options, e.prefix = e.prefix || this.prefix, new Ut(this.logger, e);
  }
}
var Q = new Ut();
class en {
  constructor() {
    this.observers = {};
  }
  on(e, n) {
    return e.split(" ").forEach((r) => {
      this.observers[r] || (this.observers[r] = /* @__PURE__ */ new Map());
      const i = this.observers[r].get(n) || 0;
      this.observers[r].set(n, i + 1);
    }), this;
  }
  off(e, n) {
    if (this.observers[e]) {
      if (!n) {
        delete this.observers[e];
        return;
      }
      this.observers[e].delete(n);
    }
  }
  once(e, n) {
    const r = (...i) => {
      n(...i), this.off(e, r);
    };
    return this.on(e, r), this;
  }
  emit(e, ...n) {
    this.observers[e] && Array.from(this.observers[e].entries()).forEach(([i, s]) => {
      for (let o = 0; o < s; o++)
        i(...n);
    }), this.observers["*"] && Array.from(this.observers["*"].entries()).forEach(([i, s]) => {
      for (let o = 0; o < s; o++)
        i(e, ...n);
    });
  }
}
class Ci extends en {
  constructor(e, n = {
    ns: ["translation"],
    defaultNS: "translation"
  }) {
    super(), this.data = e || {}, this.options = n, this.options.keySeparator === void 0 && (this.options.keySeparator = "."), this.options.ignoreJSONStructure === void 0 && (this.options.ignoreJSONStructure = !0);
  }
  addNamespaces(e) {
    this.options.ns.includes(e) || this.options.ns.push(e);
  }
  removeNamespaces(e) {
    const n = this.options.ns.indexOf(e);
    n > -1 && this.options.ns.splice(n, 1);
  }
  getResource(e, n, r, i = {}) {
    const s = i.keySeparator !== void 0 ? i.keySeparator : this.options.keySeparator, o = i.ignoreJSONStructure !== void 0 ? i.ignoreJSONStructure : this.options.ignoreJSONStructure;
    let a;
    e.includes(".") ? a = e.split(".") : (a = [e, n], r && (Array.isArray(r) ? a.push(...r) : O(r) && s ? a.push(...r.split(s)) : a.push(r)));
    const c = Bt(this.data, a);
    return !c && !n && !r && e.includes(".") && (e = a[0], n = a[1], r = a.slice(2).join(".")), c || !o || !O(r) ? c : Mn(this.data?.[e]?.[n], r, s);
  }
  addResource(e, n, r, i, s = {
    silent: !1
  }) {
    const o = s.keySeparator !== void 0 ? s.keySeparator : this.options.keySeparator;
    let a = [e, n];
    r && (a = a.concat(o ? r.split(o) : r)), e.includes(".") && (a = e.split("."), i = n, n = a[1]), this.addNamespaces(n), Ei(this.data, a, i), s.silent || this.emit("added", e, n, r, i);
  }
  addResources(e, n, r, i = {
    silent: !1
  }) {
    for (const s in r)
      (O(r[s]) || Array.isArray(r[s])) && this.addResource(e, n, s, r[s], {
        silent: !0
      });
    i.silent || this.emit("added", e, n, r);
  }
  addResourceBundle(e, n, r, i, s, o = {
    silent: !1,
    skipCopy: !1
  }) {
    let a = [e, n];
    e.includes(".") && (a = e.split("."), i = r, r = n, n = a[1]), this.addNamespaces(n);
    let c = Bt(this.data, a) || {};
    o.skipCopy || (r = JSON.parse(JSON.stringify(r))), i ? ea(c, r, s) : c = {
      ...c,
      ...r
    }, Ei(this.data, a, c), o.silent || this.emit("added", e, n, r);
  }
  removeResourceBundle(e, n) {
    this.hasResourceBundle(e, n) && delete this.data[e][n], this.removeNamespaces(n), this.emit("removed", e, n);
  }
  hasResourceBundle(e, n) {
    return this.getResource(e, n) !== void 0;
  }
  getResourceBundle(e, n) {
    return n || (n = this.options.defaultNS), this.getResource(e, n);
  }
  getDataByLanguage(e) {
    return this.data[e];
  }
  hasLanguageSomeTranslations(e) {
    const n = this.getDataByLanguage(e);
    return !!(n && Object.keys(n) || []).find((i) => n[i] && Object.keys(n[i]).length > 0);
  }
  toJSON() {
    return this.data;
  }
}
var ta = {
  processors: {},
  addPostProcessor(t) {
    this.processors[t.name] = t;
  },
  handle(t, e, n, r, i) {
    return t.forEach((s) => {
      e = this.processors[s]?.process(e, n, r, i) ?? e;
    }), e;
  }
};
const na = /* @__PURE__ */ Symbol("i18next/PATH_KEY");
function id() {
  const t = [], e = /* @__PURE__ */ Object.create(null);
  let n;
  return e.get = (r, i) => (n?.revoke?.(), i === na ? t : (t.push(i), n = Proxy.revocable(r, e), n.proxy)), Proxy.revocable(/* @__PURE__ */ Object.create(null), e).proxy;
}
function Ie(t, e) {
  const {
    [na]: n
  } = t(id()), r = e?.keySeparator ?? ".", i = e?.nsSeparator ?? ":", s = e?.enableSelector === "strict";
  if (n.length > 1 && i) {
    const o = e?.ns, a = s ? Array.isArray(o) ? o : o ? [o] : null : Array.isArray(o) ? o : null;
    if (a && (s ? a : a.length > 1 ? a.slice(1) : []).includes(n[0]))
      return `${n[0]}${i}${n.slice(1).join(r)}`;
  }
  return n.join(r);
}
const wn = (t) => !O(t) && typeof t != "boolean" && typeof t != "number";
class qt extends en {
  constructor(e, n = {}) {
    super(), Gh(["resourceStore", "languageUtils", "pluralResolver", "interpolator", "backendConnector", "i18nFormat", "utils"], e, this), this.options = n, this.options.keySeparator === void 0 && (this.options.keySeparator = "."), this.logger = Q.create("translator"), this.checkedLoadedFor = {};
  }
  changeLanguage(e) {
    e && (this.language = e);
  }
  exists(e, n = {
    interpolation: {}
  }) {
    const r = {
      ...n
    };
    if (e == null) return !1;
    const i = this.resolve(e, r);
    if (i?.res === void 0) return !1;
    const s = wn(i.res);
    return !(r.returnObjects === !1 && s);
  }
  extractFromKey(e, n) {
    let r = n.nsSeparator !== void 0 ? n.nsSeparator : this.options.nsSeparator;
    r === void 0 && (r = ":");
    const i = n.keySeparator !== void 0 ? n.keySeparator : this.options.keySeparator;
    let s = n.ns || this.options.defaultNS || [];
    const o = r && e.includes(r), a = !this.options.userDefinedKeySeparator && !n.keySeparator && !this.options.userDefinedNsSeparator && !n.nsSeparator && !nd(e, r, i);
    if (o && !a) {
      const c = e.match(this.interpolator.nestingRegexp);
      if (c && c.length > 0)
        return {
          key: e,
          namespaces: O(s) ? [s] : s
        };
      const l = e.split(r);
      (r !== i || r === i && this.options.ns.includes(l[0])) && (s = l.shift()), e = l.join(i);
    }
    return {
      key: e,
      namespaces: O(s) ? [s] : s
    };
  }
  translate(e, n, r) {
    let i = typeof n == "object" ? {
      ...n
    } : n;
    if (typeof i != "object" && this.options.overloadTranslationOptionHandler && (i = this.options.overloadTranslationOptionHandler(arguments)), typeof i == "object" && (i = {
      ...i
    }), i || (i = {}), e == null) return "";
    typeof e == "function" && (e = Ie(e, {
      ...this.options,
      ...i
    })), Array.isArray(e) || (e = [String(e)]), e = e.map((k) => typeof k == "function" ? Ie(k, {
      ...this.options,
      ...i
    }) : String(k));
    const s = i.returnDetails !== void 0 ? i.returnDetails : this.options.returnDetails, o = i.keySeparator !== void 0 ? i.keySeparator : this.options.keySeparator, {
      key: a,
      namespaces: c
    } = this.extractFromKey(e[e.length - 1], i), l = c[c.length - 1];
    let u = i.nsSeparator !== void 0 ? i.nsSeparator : this.options.nsSeparator;
    u === void 0 && (u = ":");
    const h = i.lng || this.language, d = i.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
    if (h?.toLowerCase() === "cimode")
      return d ? s ? {
        res: `${l}${u}${a}`,
        usedKey: a,
        exactUsedKey: a,
        usedLng: h,
        usedNS: l,
        usedParams: this.getUsedParamsDetails(i)
      } : `${l}${u}${a}` : s ? {
        res: a,
        usedKey: a,
        exactUsedKey: a,
        usedLng: h,
        usedNS: l,
        usedParams: this.getUsedParamsDetails(i)
      } : a;
    const g = this.resolve(e, i);
    let p = g?.res;
    const m = g?.usedKey || a, b = g?.exactUsedKey || a, x = ["[object Number]", "[object Function]", "[object RegExp]"], A = i.joinArrays !== void 0 ? i.joinArrays : this.options.joinArrays, S = !this.i18nFormat || this.i18nFormat.handleAsObject, w = i.count !== void 0 && !O(i.count), T = qt.hasDefaultValue(i), I = w ? this.pluralResolver.getSuffix(h, i.count, i) : "", P = i.ordinal && w ? this.pluralResolver.getSuffix(h, i.count, {
      ordinal: !1
    }) : "", X = w && !i.ordinal && i.count === 0, V = X && i[`defaultValue${this.options.pluralSeparator}zero`] || i[`defaultValue${I}`] || i[`defaultValue${P}`] || i.defaultValue;
    let y = p;
    S && !p && T && (y = V);
    const ht = wn(y), ce = Object.prototype.toString.apply(y);
    if (S && y && ht && !x.includes(ce) && !(O(A) && Array.isArray(y))) {
      if (!i.returnObjects && !this.options.returnObjects) {
        this.options.returnedObjectHandler || this.logger.warn("accessing an object - but returnObjects options is not enabled!");
        const k = this.options.returnedObjectHandler ? this.options.returnedObjectHandler(m, y, {
          ...i,
          ns: c
        }) : `key '${a} (${this.language})' returned an object instead of string.`;
        return s ? (g.res = k, g.usedParams = this.getUsedParamsDetails(i), g) : k;
      }
      if (o) {
        const k = Array.isArray(y), _ = k ? [] : {}, G = k ? b : m;
        for (const z in y)
          if (Object.prototype.hasOwnProperty.call(y, z)) {
            const H = `${G}${o}${z}`;
            T && !p ? _[z] = this.translate(H, {
              ...i,
              defaultValue: wn(V) ? V[z] : void 0,
              joinArrays: !1,
              ns: c
            }) : _[z] = this.translate(H, {
              ...i,
              joinArrays: !1,
              ns: c
            }), _[z] === H && (_[z] = y[z]);
          }
        p = _;
      }
    } else if (S && O(A) && Array.isArray(p))
      p = p.join(A), p && (p = this.extendTranslation(p, e, i, r));
    else {
      let k = !1, _ = !1;
      !this.isValidLookup(p) && T && (k = !0, p = V), this.isValidLookup(p) || (_ = !0, p = a);
      const z = (i.missingKeyNoValueFallbackToKey || this.options.missingKeyNoValueFallbackToKey) && _ ? void 0 : p, H = T && V !== p && this.options.updateMissing;
      if (_ || k || H) {
        if (this.logger.log(H ? "updateKey" : "missingKey", h, l, w && !H ? `${a}${this.pluralResolver.getSuffix(h, i.count, i)}` : a, H ? V : p), o) {
          const f = this.resolve(a, {
            ...i,
            keySeparator: !1
          });
          f && f.res && this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.");
        }
        let q = [];
        const Se = this.languageUtils.getFallbackCodes(this.options.fallbackLng, i.lng || this.language);
        if (this.options.saveMissingTo === "fallback" && Se && Se[0])
          for (let f = 0; f < Se.length; f++)
            q.push(Se[f]);
        else this.options.saveMissingTo === "all" ? q = this.languageUtils.toResolveHierarchy(i.lng || this.language) : q.push(i.lng || this.language);
        const K = (f, v, C) => {
          const E = T && C !== p ? C : z;
          this.options.missingKeyHandler ? this.options.missingKeyHandler(f, l, v, E, H, i) : this.backendConnector?.saveMissing && this.backendConnector.saveMissing(f, l, v, E, H, i), this.emit("missingKey", f, l, v, p);
        };
        this.options.saveMissing && (this.options.saveMissingPlurals && w ? q.forEach((f) => {
          const v = this.pluralResolver.getSuffixes(f, i);
          X && i[`defaultValue${this.options.pluralSeparator}zero`] && !v.includes(`${this.options.pluralSeparator}zero`) && v.push(`${this.options.pluralSeparator}zero`), v.forEach((C) => {
            K([f], a + C, i[`defaultValue${C}`] || V);
          });
        }) : K(q, a, V));
      }
      p = this.extendTranslation(p, e, i, g, r), _ && p === a && this.options.appendNamespaceToMissingKey && (p = `${l}${u}${a}`), (_ || k) && this.options.parseMissingKeyHandler && (p = this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey ? `${l}${u}${a}` : a, k ? p : void 0, i));
    }
    return s ? (g.res = p, g.usedParams = this.getUsedParamsDetails(i), g) : p;
  }
  extendTranslation(e, n, r, i, s) {
    if (this.i18nFormat?.parse)
      e = this.i18nFormat.parse(e, {
        ...this.options.interpolation.defaultVariables,
        ...r
      }, r.lng || this.language || i.usedLng, i.usedNS, i.usedKey, {
        resolved: i
      });
    else if (!r.skipInterpolation) {
      r.interpolation && this.interpolator.init({
        ...r,
        interpolation: {
          ...this.options.interpolation,
          ...r.interpolation
        }
      });
      const c = O(e) && (r?.interpolation?.skipOnVariables !== void 0 ? r.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables);
      let l;
      if (c) {
        const h = e.match(this.interpolator.nestingRegexp);
        l = h && h.length;
      }
      let u = r.replace && !O(r.replace) ? r.replace : r;
      if (this.options.interpolation.defaultVariables && (u = {
        ...this.options.interpolation.defaultVariables,
        ...u
      }), e = this.interpolator.interpolate(e, u, r.lng || this.language || i.usedLng, r), c) {
        const h = e.match(this.interpolator.nestingRegexp), d = h && h.length;
        l < d && (r.nest = !1);
      }
      !r.lng && i && i.res && (r.lng = this.language || i.usedLng), r.nest !== !1 && (e = this.interpolator.nest(e, (...h) => s?.[0] === h[0] && !r.context ? (this.logger.warn(`It seems you are nesting recursively key: ${h[0]} in key: ${n[0]}`), null) : this.translate(...h, n), r)), r.interpolation && this.interpolator.reset();
    }
    const o = r.postProcess || this.options.postProcess, a = O(o) ? [o] : o;
    return e != null && a?.length && r.applyPostProcessor !== !1 && (e = ta.handle(a, e, n, this.options && this.options.postProcessPassResolved ? {
      i18nResolved: {
        ...i,
        usedParams: this.getUsedParamsDetails(r)
      },
      ...r
    } : r, this)), e;
  }
  resolve(e, n = {}) {
    let r, i, s, o, a;
    return O(e) && (e = [e]), Array.isArray(e) && (e = e.map((c) => typeof c == "function" ? Ie(c, {
      ...this.options,
      ...n
    }) : c)), e.forEach((c) => {
      if (this.isValidLookup(r)) return;
      const l = this.extractFromKey(c, n), u = l.key;
      i = u;
      let h = l.namespaces;
      this.options.fallbackNS && (h = h.concat(this.options.fallbackNS));
      const d = n.count !== void 0 && !O(n.count), g = d && !n.ordinal && n.count === 0, p = n.context !== void 0 && (O(n.context) || typeof n.context == "number") && n.context !== "", m = n.lngs ? n.lngs : this.languageUtils.toResolveHierarchy(n.lng || this.language, n.fallbackLng);
      h.forEach((b) => {
        this.isValidLookup(r) || (a = b, !this.checkedLoadedFor[`${m[0]}-${b}`] && this.utils?.hasLoadedNamespace && !this.utils?.hasLoadedNamespace(a) && (this.checkedLoadedFor[`${m[0]}-${b}`] = !0, this.logger.warn(`key "${i}" for languages "${m.join(", ")}" won't get resolved as namespace "${a}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!")), m.forEach((x) => {
          if (this.isValidLookup(r)) return;
          o = x;
          const A = [u];
          if (this.i18nFormat?.addLookupKeys)
            this.i18nFormat.addLookupKeys(A, u, x, b, n);
          else {
            let w;
            d && (w = this.pluralResolver.getSuffix(x, n.count, n));
            const T = `${this.options.pluralSeparator}zero`, I = `${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;
            if (d && (n.ordinal && w.startsWith(I) && A.push(u + w.replace(I, this.options.pluralSeparator)), A.push(u + w), g && A.push(u + T)), p) {
              const P = `${u}${this.options.contextSeparator || "_"}${n.context}`;
              A.push(P), d && (n.ordinal && w.startsWith(I) && A.push(P + w.replace(I, this.options.pluralSeparator)), A.push(P + w), g && A.push(P + T));
            }
          }
          let S;
          for (; S = A.pop(); )
            this.isValidLookup(r) || (s = S, r = this.getResource(x, b, S, n));
        }));
      });
    }), {
      res: r,
      usedKey: i,
      exactUsedKey: s,
      usedLng: o,
      usedNS: a
    };
  }
  isValidLookup(e) {
    return e !== void 0 && !(!this.options.returnNull && e === null) && !(!this.options.returnEmptyString && e === "");
  }
  getResource(e, n, r, i = {}) {
    return this.i18nFormat?.getResource ? this.i18nFormat.getResource(e, n, r, i) : this.resourceStore.getResource(e, n, r, i);
  }
  getUsedParamsDetails(e = {}) {
    const n = ["defaultValue", "ordinal", "context", "replace", "lng", "lngs", "fallbackLng", "ns", "keySeparator", "nsSeparator", "returnObjects", "returnDetails", "joinArrays", "postProcess", "interpolation"], r = e.replace && !O(e.replace);
    let i = r ? e.replace : e;
    if (r && typeof e.count < "u" && (i = {
      ...i,
      count: e.count
    }), this.options.interpolation.defaultVariables && (i = {
      ...this.options.interpolation.defaultVariables,
      ...i
    }), !r) {
      i = {
        ...i
      };
      for (const s of n)
        delete i[s];
    }
    return i;
  }
  static hasDefaultValue(e) {
    const n = "defaultValue";
    for (const r in e)
      if (Object.prototype.hasOwnProperty.call(e, r) && r.startsWith(n) && e[r] !== void 0)
        return !0;
    return !1;
  }
}
class ki {
  constructor(e) {
    this.options = e, this.supportedLngs = this.options.supportedLngs || !1, this.logger = Q.create("languageUtils"), this.resolveHierarchyCache = {};
  }
  clearCache() {
    this.resolveHierarchyCache = {};
  }
  getScriptPartFromCode(e) {
    if (e = st(e), !e || !e.includes("-")) return null;
    const n = e.split("-");
    return n.length === 2 || (n.pop(), n[n.length - 1].toLowerCase() === "x") ? null : this.formatLanguageCode(n.join("-"));
  }
  getLanguagePartFromCode(e) {
    if (e = st(e), !e || !e.includes("-")) return e;
    const n = e.split("-");
    return this.formatLanguageCode(n[0]);
  }
  formatLanguageCode(e) {
    if (O(e) && e.includes("-")) {
      let n;
      try {
        n = Intl.getCanonicalLocales(e)[0];
      } catch {
      }
      return n && this.options.lowerCaseLng && (n = n.toLowerCase()), n || (this.options.lowerCaseLng ? e.toLowerCase() : e);
    }
    return this.options.cleanCode || this.options.lowerCaseLng ? e.toLowerCase() : e;
  }
  isSupportedCode(e) {
    return (this.options.load === "languageOnly" || this.options.nonExplicitSupportedLngs) && (e = this.getLanguagePartFromCode(e)), !this.supportedLngs || !this.supportedLngs.length || this.supportedLngs.includes(e);
  }
  getBestMatchFromCodes(e) {
    if (!e) return null;
    let n;
    return e.forEach((r) => {
      if (n) return;
      const i = this.formatLanguageCode(r);
      (!this.options.supportedLngs || this.isSupportedCode(i)) && (n = i);
    }), !n && this.options.supportedLngs && e.forEach((r) => {
      if (n) return;
      const i = this.getScriptPartFromCode(r);
      if (this.isSupportedCode(i)) return n = i;
      const s = this.getLanguagePartFromCode(r);
      if (this.isSupportedCode(s)) return n = s;
      n = this.options.supportedLngs.find((o) => o === s ? !0 : !o.includes("-") && !s.includes("-") ? !1 : !!(o.includes("-") && !s.includes("-") && o.slice(0, o.indexOf("-")) === s || o.startsWith(s) && s.length > 1));
    }), n || (n = this.getFallbackCodes(this.options.fallbackLng)[0]), n;
  }
  getFallbackCodes(e, n) {
    if (!e) return [];
    if (typeof e == "function" && (e = e(n)), O(e) && (e = [e]), Array.isArray(e)) return e;
    if (!n) return e.default || [];
    let r = e[n];
    return r || (r = e[this.getScriptPartFromCode(n)]), r || (r = e[this.formatLanguageCode(n)]), r || (r = e[this.getLanguagePartFromCode(n)]), r || (r = e.default), r || [];
  }
  toResolveHierarchy(e, n) {
    const r = this.options.fallbackLng, i = Array.isArray(r) ? r.join("|") : r;
    i !== this._cachedFallbackLng && (this.resolveHierarchyCache = {}, this._cachedFallbackLng = i);
    const s = n === void 0 || n === !1 || O(n), o = n === void 0 && typeof this.options.fallbackLng == "function", a = O(e) && s && !o;
    let c = null;
    if (a) {
      let d;
      n === void 0 ? d = "undefined" : n === !1 ? d = "boolean:false" : d = `string:${n}`, c = `${e.length}:${e}|${d}`;
    }
    if (c !== null) {
      const d = this.resolveHierarchyCache[c];
      if (d !== void 0) return d.slice();
    }
    const l = this.getFallbackCodes((n === !1 ? [] : n) || this.options.fallbackLng || [], e), u = [], h = (d) => {
      d && (this.isSupportedCode(d) ? u.push(d) : this.logger.warn(`rejecting language code not found in supportedLngs: ${d}`));
    };
    return O(e) && (e.includes("-") || e.includes("_")) ? (this.options.load !== "languageOnly" && h(this.formatLanguageCode(e)), this.options.load !== "languageOnly" && this.options.load !== "currentOnly" && h(this.getScriptPartFromCode(e)), this.options.load !== "currentOnly" && h(this.getLanguagePartFromCode(e))) : O(e) && h(this.formatLanguageCode(e)), l.forEach((d) => {
      u.includes(d) || h(this.formatLanguageCode(d));
    }), c !== null ? (this.resolveHierarchyCache[c] = u, u.slice()) : u;
  }
}
const Oi = {
  zero: 0,
  one: 1,
  two: 2,
  few: 3,
  many: 4,
  other: 5
}, Ai = {
  select: (t) => t === 1 ? "one" : "other",
  resolvedOptions: () => ({
    pluralCategories: ["one", "other"]
  })
};
class sd {
  constructor(e, n = {}) {
    this.languageUtils = e, this.options = n, this.logger = Q.create("pluralResolver"), this.pluralRulesCache = {};
  }
  clearCache() {
    this.pluralRulesCache = {};
  }
  getRule(e, n = {}) {
    const r = st(e === "dev" ? "en" : e), i = n.ordinal ? "ordinal" : "cardinal", s = JSON.stringify({
      cleanedCode: r,
      type: i
    });
    if (s in this.pluralRulesCache)
      return this.pluralRulesCache[s];
    let o;
    try {
      o = new Intl.PluralRules(r, {
        type: i
      });
    } catch {
      if (typeof Intl > "u")
        return this.logger.error("No Intl support, please use an Intl polyfill!"), Ai;
      if (!e.match(/-|_/)) return Ai;
      const c = this.languageUtils.getLanguagePartFromCode(e);
      o = this.getRule(c, n);
    }
    return this.pluralRulesCache[s] = o, o;
  }
  needsPlural(e, n = {}) {
    let r = this.getRule(e, n);
    return r || (r = this.getRule("dev", n)), r?.resolvedOptions().pluralCategories.length > 1;
  }
  getPluralFormsOfKey(e, n, r = {}) {
    return this.getSuffixes(e, r).map((i) => `${n}${i}`);
  }
  getSuffixes(e, n = {}) {
    let r = this.getRule(e, n);
    return r || (r = this.getRule("dev", n)), r ? r.resolvedOptions().pluralCategories.sort((i, s) => Oi[i] - Oi[s]).map((i) => `${this.options.prepend}${n.ordinal ? `ordinal${this.options.prepend}` : ""}${i}`) : [];
  }
  getSuffix(e, n, r = {}) {
    const i = this.getRule(e, r);
    return i ? `${this.options.prepend}${r.ordinal ? `ordinal${this.options.prepend}` : ""}${i.select(n)}` : (this.logger.warn(`no plural rule found for: ${e}`), this.getSuffix("dev", n, r));
  }
}
const Ti = (t, e, n, r = ".", i = !0) => {
  let s = Xh(t, e, n);
  return !s && i && O(n) && (s = Mn(t, n, r), s === void 0 && (s = Mn(e, n, r))), s;
}, ad = (t) => t.replace(/\$/g, "$$$$");
class Ri {
  constructor(e = {}) {
    this.logger = Q.create("interpolator"), this.options = e, this.format = e?.interpolation?.format || ((n) => n), this.init(e);
  }
  init(e = {}) {
    e.interpolation || (e.interpolation = {
      escapeValue: !0
    });
    const {
      escape: n,
      escapeValue: r,
      useRawValueToEscape: i,
      prefix: s,
      prefixEscaped: o,
      suffix: a,
      suffixEscaped: c,
      formatSeparator: l,
      unescapeSuffix: u,
      unescapePrefix: h,
      nestingPrefix: d,
      nestingPrefixEscaped: g,
      nestingSuffix: p,
      nestingSuffixEscaped: m,
      nestingOptionsSeparator: b,
      maxReplaces: x,
      alwaysFormat: A
    } = e.interpolation;
    this.escape = n !== void 0 ? n : Qh, this.escapeValue = r !== void 0 ? r : !0, this.useRawValueToEscape = i !== void 0 ? i : !1, this.prefix = s ? ee(s) : o || "{{", this.suffix = a ? ee(a) : c || "}}", this.formatSeparator = l || ",", this.unescapePrefix = u ? "" : h ? ee(h) : "-", this.unescapeSuffix = this.unescapePrefix ? "" : u ? ee(u) : "", this.nestingPrefix = d ? ee(d) : g || ee("$t("), this.nestingSuffix = p ? ee(p) : m || ee(")"), this.nestingOptionsSeparator = b || ",", this.maxReplaces = x || 1e3, this.alwaysFormat = A !== void 0 ? A : !1, this.resetRegExp();
  }
  reset() {
    this.options && this.init(this.options);
  }
  resetRegExp() {
    const e = (n, r) => n?.source === r ? (n.lastIndex = 0, n) : new RegExp(r, "g");
    this.regexp = e(this.regexp, `${this.prefix}(.+?)${this.suffix}`), this.regexpUnescape = e(this.regexpUnescape, `${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`), this.nestingRegexp = e(this.nestingRegexp, `${this.nestingPrefix}((?:[^()"']+|"[^"]*"|'[^']*'|\\((?:[^()]|"[^"]*"|'[^']*')*\\))*?)${this.nestingSuffix}`);
  }
  interpolate(e, n, r, i) {
    let s, o, a;
    const c = this.options && this.options.interpolation && this.options.interpolation.defaultVariables || {}, l = (g) => {
      if (!g.includes(this.formatSeparator)) {
        const x = Ti(n, c, g, this.options.keySeparator, this.options.ignoreJSONStructure);
        return this.alwaysFormat ? this.format(x, void 0, r, {
          ...i,
          ...n,
          interpolationkey: g
        }) : x;
      }
      const p = g.split(this.formatSeparator), m = p.shift().trim(), b = p.join(this.formatSeparator).trim();
      return this.format(Ti(n, c, m, this.options.keySeparator, this.options.ignoreJSONStructure), b, r, {
        ...i,
        ...n,
        interpolationkey: m
      });
    };
    this.resetRegExp(), !this.escapeValue && typeof e == "string" && /\$t\([^)]*\{[^}]*\{\{/.test(e) && this.logger.warn("nesting options string contains interpolated variables with escapeValue: false — if any of those values are attacker-controlled they can inject additional nesting options (e.g. redirect lng/ns). Sanitise untrusted input before passing it to t(), or keep escapeValue: true.");
    const u = i?.missingInterpolationHandler || this.options.missingInterpolationHandler, h = i?.interpolation?.skipOnVariables !== void 0 ? i.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables;
    return [{
      regex: this.regexpUnescape,
      safeValue: (g) => g
    }, {
      regex: this.regexp,
      safeValue: (g) => this.escapeValue ? this.escape(g) : g
    }].forEach((g) => {
      for (a = 0; s = g.regex.exec(e); ) {
        const p = s[1].trim();
        if (o = l(p), o === void 0)
          if (typeof u == "function") {
            const b = u(e, s, i);
            o = O(b) ? b : "";
          } else if (i && Object.prototype.hasOwnProperty.call(i, p))
            o = "";
          else if (h) {
            o = s[0];
            continue;
          } else
            this.logger.warn(`missed to pass in variable ${p} for interpolating ${e}`), o = "";
        else !O(o) && !this.useRawValueToEscape && (o = vi(o));
        const m = g.safeValue(o);
        if (e = e.replace(s[0], ad(m)), h ? (g.regex.lastIndex += m.length, g.regex.lastIndex -= s[0].length) : g.regex.lastIndex = 0, a++, a >= this.maxReplaces)
          break;
      }
    }), e;
  }
  nest(e, n, r = {}) {
    let i, s, o;
    const a = (c, l) => {
      const u = this.nestingOptionsSeparator;
      if (!c.includes(u)) return c;
      const h = c.split(new RegExp(`${ee(u)}[ ]*{`));
      let d = `{${h[1]}`;
      c = h[0], d = this.interpolate(d, o);
      const g = d.match(/'/g), p = d.match(/"/g);
      ((g?.length ?? 0) % 2 === 0 && !p || (p?.length ?? 0) % 2 !== 0) && (d = d.replace(/'/g, '"'));
      try {
        o = JSON.parse(d), l && (o = {
          ...l,
          ...o
        });
      } catch (m) {
        return this.logger.warn(`failed parsing options string in nesting for key ${c}`, m), `${c}${u}${d}`;
      }
      return o.defaultValue && o.defaultValue.includes(this.prefix) && delete o.defaultValue, c;
    };
    for (; i = this.nestingRegexp.exec(e); ) {
      let c = [];
      o = {
        ...r
      }, o = o.replace && !O(o.replace) ? o.replace : o, o.applyPostProcessor = !1, delete o.defaultValue;
      const l = /{.*}/s.test(i[1]) ? i[1].lastIndexOf("}") + 1 : i[1].indexOf(this.formatSeparator);
      if (l !== -1 && (c = i[1].slice(l).split(this.formatSeparator).map((u) => u.trim()).filter(Boolean), i[1] = i[1].slice(0, l)), s = n(a.call(this, i[1].trim(), o), o), s && i[0] === e && !O(s)) return s;
      O(s) || (s = vi(s)), s || (this.logger.warn(`missed to resolve ${i[1]} for nesting ${e}`), s = ""), c.length && (s = c.reduce((u, h) => this.format(u, h, r.lng, {
        ...r,
        interpolationkey: i[1].trim()
      }), s.trim())), e = e.replace(i[0], s), this.regexp.lastIndex = 0;
    }
    return e;
  }
}
const od = (t) => {
  let e = t.toLowerCase().trim();
  const n = {};
  if (t.includes("(")) {
    const r = t.split("(");
    e = r[0].toLowerCase().trim();
    const i = r[1].slice(0, -1);
    e === "currency" && !i.includes(":") ? n.currency || (n.currency = i.trim()) : e === "relativetime" && !i.includes(":") ? n.range || (n.range = i.trim()) : i.split(";").forEach((o) => {
      if (o) {
        const [a, ...c] = o.split(":"), l = c.join(":").trim().replace(/^'+|'+$/g, ""), u = a.trim();
        n[u] || (n[u] = l), l === "false" && (n[u] = !1), l === "true" && (n[u] = !0), isNaN(l) || (n[u] = parseInt(l, 10));
      }
    });
  }
  return {
    formatName: e,
    formatOptions: n
  };
}, Ni = (t) => {
  const e = {};
  return (n, r, i) => {
    let s = i;
    i && i.interpolationkey && i.formatParams && i.formatParams[i.interpolationkey] && i[i.interpolationkey] && (s = {
      ...s,
      [i.interpolationkey]: void 0
    });
    const o = r + JSON.stringify(s);
    let a = e[o];
    return a || (a = t(st(r), i), e[o] = a), a(n);
  };
}, ld = (t) => (e, n, r) => t(st(n), r)(e);
class cd {
  constructor(e = {}) {
    this.logger = Q.create("formatter"), this.options = e, this.init(e);
  }
  init(e, n = {
    interpolation: {}
  }) {
    this.formatSeparator = n.interpolation.formatSeparator || ",";
    const r = n.cacheInBuiltFormats ? Ni : ld;
    this.formats = {
      number: r((i, s) => {
        const o = new Intl.NumberFormat(i, {
          ...s
        });
        return (a) => o.format(a);
      }),
      currency: r((i, s) => {
        const o = new Intl.NumberFormat(i, {
          ...s,
          style: "currency"
        });
        return (a) => o.format(a);
      }),
      datetime: r((i, s) => {
        const o = new Intl.DateTimeFormat(i, {
          ...s
        });
        return (a) => o.format(a);
      }),
      relativetime: r((i, s) => {
        const o = new Intl.RelativeTimeFormat(i, {
          ...s
        });
        return (a) => o.format(a, s.range || "day");
      }),
      list: r((i, s) => {
        const o = new Intl.ListFormat(i, {
          ...s
        });
        return (a) => o.format(a);
      })
    };
  }
  add(e, n) {
    this.formats[e.toLowerCase().trim()] = n;
  }
  addCached(e, n) {
    this.formats[e.toLowerCase().trim()] = Ni(n);
  }
  format(e, n, r, i = {}) {
    if (!n || e == null) return e;
    const s = n.split(this.formatSeparator), o = [];
    for (let c = 0; c < s.length; c++) {
      let l = s[c];
      for (; l.indexOf("(") > -1 && !l.includes(")") && c + 1 < s.length; )
        l = `${l}${this.formatSeparator}${s[++c]}`;
      o.push(l);
    }
    return o.reduce((c, l) => {
      const {
        formatName: u,
        formatOptions: h
      } = od(l);
      if (this.formats[u]) {
        let d = c;
        try {
          const g = i?.formatParams?.[i.interpolationkey] || {}, p = g.locale || g.lng || i.locale || i.lng || r;
          d = this.formats[u](c, p, {
            ...h,
            ...i,
            ...g
          });
        } catch (g) {
          this.logger.warn(g);
        }
        return d;
      } else
        this.logger.warn(`there was no format function for ${u}`);
      return c;
    }, e);
  }
}
const ud = (t, e) => {
  t.pending[e] !== void 0 && (delete t.pending[e], t.pendingCount--);
};
class hd extends en {
  constructor(e, n, r, i = {}) {
    super(), this.backend = e, this.store = n, this.services = r, this.languageUtils = r.languageUtils, this.options = i, this.logger = Q.create("backendConnector"), this.waitingReads = [], this.maxParallelReads = i.maxParallelReads || 10, this.readingCalls = 0, this.maxRetries = i.maxRetries >= 0 ? i.maxRetries : 5, this.retryTimeout = i.retryTimeout >= 1 ? i.retryTimeout : 350, this.state = {}, this.queue = [], this.backend?.init?.(r, i.backend, i);
  }
  queueLoad(e, n, r, i) {
    const s = {}, o = {}, a = {}, c = {};
    return e.forEach((l) => {
      let u = !0;
      n.forEach((h) => {
        const d = `${l}|${h}`;
        !r.reload && this.store.hasResourceBundle(l, h) ? this.state[d] = 2 : this.state[d] < 0 || (this.state[d] === 1 ? o[d] === void 0 && (o[d] = !0) : (this.state[d] = 1, u = !1, o[d] === void 0 && (o[d] = !0), s[d] === void 0 && (s[d] = !0), c[h] === void 0 && (c[h] = !0)));
      }), u || (a[l] = !0);
    }), (Object.keys(s).length || Object.keys(o).length) && this.queue.push({
      pending: o,
      pendingCount: Object.keys(o).length,
      loaded: {},
      errors: [],
      callback: i
    }), {
      toLoad: Object.keys(s),
      pending: Object.keys(o),
      toLoadLanguages: Object.keys(a),
      toLoadNamespaces: Object.keys(c)
    };
  }
  loaded(e, n, r) {
    const i = e.split("|"), s = i[0], o = i[1];
    n && this.emit("failedLoading", s, o, n), !n && r && this.store.addResourceBundle(s, o, r, void 0, void 0, {
      skipCopy: !0
    }), this.state[e] = n ? -1 : 2, n && r && (this.state[e] = 0);
    const a = {};
    this.queue.forEach((c) => {
      Jh(c.loaded, [s], o), ud(c, e), n && c.errors.push(n), c.pendingCount === 0 && !c.done && (Object.keys(c.loaded).forEach((l) => {
        a[l] || (a[l] = {});
        const u = c.loaded[l];
        u.length && u.forEach((h) => {
          a[l][h] === void 0 && (a[l][h] = !0);
        });
      }), c.done = !0, c.errors.length ? c.callback(c.errors) : c.callback());
    }), this.emit("loaded", a), this.queue = this.queue.filter((c) => !c.done);
  }
  read(e, n, r, i = 0, s = this.retryTimeout, o) {
    if (!e.length) return o(null, {});
    if (this.readingCalls >= this.maxParallelReads) {
      this.waitingReads.push({
        lng: e,
        ns: n,
        fcName: r,
        tried: i,
        wait: s,
        callback: o
      });
      return;
    }
    this.readingCalls++;
    const a = (l, u) => {
      if (this.readingCalls--, this.waitingReads.length > 0) {
        const h = this.waitingReads.shift();
        this.read(h.lng, h.ns, h.fcName, h.tried, h.wait, h.callback);
      }
      if (l && u && i < this.maxRetries) {
        setTimeout(() => {
          this.read(e, n, r, i + 1, s * 2, o);
        }, s);
        return;
      }
      o(l, u);
    }, c = this.backend[r].bind(this.backend);
    if (c.length === 2) {
      try {
        const l = c(e, n);
        l && typeof l.then == "function" ? l.then((u) => a(null, u)).catch(a) : a(null, l);
      } catch (l) {
        a(l);
      }
      return;
    }
    return c(e, n, a);
  }
  prepareLoading(e, n, r = {}, i) {
    if (!this.backend)
      return this.logger.warn("No backend was added via i18next.use. Will not load resources."), i && i();
    O(e) && (e = this.languageUtils.toResolveHierarchy(e)), O(n) && (n = [n]);
    const s = this.queueLoad(e, n, r, i);
    if (!s.toLoad.length)
      return s.pending.length || i(), null;
    s.toLoad.forEach((o) => {
      this.loadOne(o);
    });
  }
  load(e, n, r) {
    this.prepareLoading(e, n, {}, r);
  }
  reload(e, n, r) {
    this.prepareLoading(e, n, {
      reload: !0
    }, r);
  }
  loadOne(e, n = "") {
    const r = e.split("|"), i = r[0], s = r[1];
    this.read(i, s, "read", void 0, void 0, (o, a) => {
      o && this.logger.warn(`${n}loading namespace ${s} for language ${i} failed`, o), !o && a && this.logger.log(`${n}loaded namespace ${s} for language ${i}`, a), this.loaded(e, o, a);
    });
  }
  saveMissing(e, n, r, i, s, o = {}, a = () => {
  }) {
    if (this.services?.utils?.hasLoadedNamespace && !this.services?.utils?.hasLoadedNamespace(n)) {
      this.logger.warn(`did not save key "${r}" as the namespace "${n}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");
      return;
    }
    if (!(r == null || r === "")) {
      if (this.backend?.create) {
        const c = {
          ...o,
          isUpdate: s
        }, l = this.backend.create.bind(this.backend);
        if (l.length < 6)
          try {
            let u;
            l.length === 5 ? u = l(e, n, r, i, c) : u = l(e, n, r, i), u && typeof u.then == "function" ? u.then((h) => a(null, h)).catch(a) : a(null, u);
          } catch (u) {
            a(u);
          }
        else
          l(e, n, r, i, a, c);
      }
      !e || !e[0] || this.store.addResource(e[0], n, r, i);
    }
  }
}
const xn = () => ({
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
  overloadTranslationOptionHandler: (t) => {
    let e = {};
    if (typeof t[1] == "object" && (e = t[1]), O(t[1]) && (e.defaultValue = t[1]), O(t[2]) && (e.tDescription = t[2]), typeof t[2] == "object" || typeof t[3] == "object") {
      const n = t[3] || t[2];
      Object.keys(n).forEach((r) => {
        e[r] = n[r];
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
}), Di = (t) => (O(t.ns) && (t.ns = [t.ns]), O(t.fallbackLng) && (t.fallbackLng = [t.fallbackLng]), O(t.fallbackNS) && (t.fallbackNS = [t.fallbackNS]), t.supportedLngs && !t.supportedLngs.includes("cimode") && (t.supportedLngs = t.supportedLngs.concat(["cimode"])), t), wt = () => {
}, dd = (t) => {
  Object.getOwnPropertyNames(Object.getPrototypeOf(t)).forEach((n) => {
    typeof t[n] == "function" && (t[n] = t[n].bind(t));
  });
};
class Ze extends en {
  constructor(e = {}, n) {
    if (super(), this.options = Di(e), this.services = {}, this.logger = Q, this.modules = {
      external: []
    }, dd(this), n && !this.isInitialized && !e.isClone) {
      if (!this.options.initAsync)
        return this.init(e, n), this;
      setTimeout(() => {
        this.init(e, n);
      }, 0);
    }
  }
  init(e = {}, n) {
    this.isInitializing = !0, typeof e == "function" && (n = e, e = {}), e.defaultNS == null && e.ns && (O(e.ns) ? e.defaultNS = e.ns : e.ns.includes("translation") || (e.defaultNS = e.ns[0]));
    const r = xn();
    this.options = {
      ...r,
      ...this.options,
      ...Di(e)
    }, this.options.interpolation = {
      ...r.interpolation,
      ...this.options.interpolation
    }, e.keySeparator !== void 0 && (this.options.userDefinedKeySeparator = e.keySeparator), e.nsSeparator !== void 0 && (this.options.userDefinedNsSeparator = e.nsSeparator), typeof this.options.overloadTranslationOptionHandler != "function" && (this.options.overloadTranslationOptionHandler = r.overloadTranslationOptionHandler);
    const i = (l) => l ? typeof l == "function" ? new l() : l : null;
    if (!this.options.isClone) {
      this.modules.logger ? Q.init(i(this.modules.logger), this.options) : Q.init(null, this.options);
      let l;
      this.modules.formatter ? l = this.modules.formatter : l = cd;
      const u = new ki(this.options);
      this.store = new Ci(this.options.resources, this.options);
      const h = this.services;
      h.logger = Q, h.resourceStore = this.store, h.languageUtils = u, h.pluralResolver = new sd(u, {
        prepend: this.options.pluralSeparator
      }), l && (h.formatter = i(l), h.formatter.init && h.formatter.init(h, this.options), this.options.interpolation.format = h.formatter.format.bind(h.formatter)), h.interpolator = new Ri(this.options), h.utils = {
        hasLoadedNamespace: this.hasLoadedNamespace.bind(this)
      }, h.backendConnector = new hd(i(this.modules.backend), h.resourceStore, h, this.options), h.backendConnector.on("*", (d, ...g) => {
        this.emit(d, ...g);
      }), this.modules.languageDetector && (h.languageDetector = i(this.modules.languageDetector), h.languageDetector.init && h.languageDetector.init(h, this.options.detection, this.options)), this.modules.i18nFormat && (h.i18nFormat = i(this.modules.i18nFormat), h.i18nFormat.init && h.i18nFormat.init(this)), this.translator = new qt(this.services, this.options), this.translator.on("*", (d, ...g) => {
        this.emit(d, ...g);
      }), this.modules.external.forEach((d) => {
        d.init && d.init(this);
      });
    }
    if (this.format = this.options.interpolation.format, n || (n = wt), this.options.fallbackLng && !this.services.languageDetector && !this.options.lng) {
      const l = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
      l.length > 0 && l[0] !== "dev" && (this.options.lng = l[0]);
    }
    !this.services.languageDetector && !this.options.lng && this.logger.warn("init: no languageDetector is used and no lng is defined"), ["getResource", "hasResourceBundle", "getResourceBundle", "getDataByLanguage"].forEach((l) => {
      this[l] = (...u) => this.store[l](...u);
    }), ["addResource", "addResources", "addResourceBundle", "removeResourceBundle"].forEach((l) => {
      this[l] = (...u) => (this.store[l](...u), this);
    });
    const a = We(), c = () => {
      const l = (u, h) => {
        this.isInitializing = !1, this.isInitialized && !this.initializedStoreOnce && this.logger.warn("init: i18next is already initialized. You should call init just once!"), this.isInitialized = !0, this.options.isClone || this.logger.log("initialized", this.options), this.emit("initialized", this.options), a.resolve(h), n(u, h);
      };
      if ((this.languages || this.isLanguageChangingTo) && !this.isInitialized) return l(null, this.t.bind(this));
      this.changeLanguage(this.options.lng, l);
    };
    return this.options.resources || !this.options.initAsync ? c() : setTimeout(c, 0), a;
  }
  loadResources(e, n = wt) {
    let r = n;
    const i = O(e) ? e : this.language;
    if (typeof e == "function" && (r = e), !this.options.resources || this.options.partialBundledLanguages) {
      if (i?.toLowerCase() === "cimode" && (!this.options.preload || this.options.preload.length === 0)) return r();
      const s = [], o = (a) => {
        if (!a || a === "cimode") return;
        this.services.languageUtils.toResolveHierarchy(a).forEach((l) => {
          l !== "cimode" && (s.includes(l) || s.push(l));
        });
      };
      i ? o(i) : this.services.languageUtils.getFallbackCodes(this.options.fallbackLng).forEach((c) => o(c)), this.options.preload?.forEach?.((a) => o(a)), this.services.backendConnector.load(s, this.options.ns, (a) => {
        !a && !this.resolvedLanguage && this.language && this.setResolvedLanguage(this.language), r(a);
      });
    } else
      r(null);
  }
  reloadResources(e, n, r) {
    const i = We();
    return typeof e == "function" && (r = e, e = void 0), typeof n == "function" && (r = n, n = void 0), e || (e = this.languages), n || (n = this.options.ns), r || (r = wt), this.services.backendConnector.reload(e, n, (s) => {
      i.resolve(), r(s);
    }), i;
  }
  use(e) {
    if (!e) throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");
    if (!e.type) throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");
    return e.type === "backend" && (this.modules.backend = e), (e.type === "logger" || e.log && e.warn && e.error) && (this.modules.logger = e), e.type === "languageDetector" && (this.modules.languageDetector = e), e.type === "i18nFormat" && (this.modules.i18nFormat = e), e.type === "postProcessor" && ta.addPostProcessor(e), e.type === "formatter" && (this.modules.formatter = e), e.type === "3rdParty" && this.modules.external.push(e), this;
  }
  setResolvedLanguage(e) {
    if (!(!e || !this.languages) && !["cimode", "dev"].includes(e)) {
      for (let n = 0; n < this.languages.length; n++) {
        const r = this.languages[n];
        if (!["cimode", "dev"].includes(r) && this.store.hasLanguageSomeTranslations(r)) {
          this.resolvedLanguage = r;
          break;
        }
      }
      !this.resolvedLanguage && !this.languages.includes(e) && this.store.hasLanguageSomeTranslations(e) && (this.resolvedLanguage = e, this.languages.unshift(e));
    }
  }
  changeLanguage(e, n) {
    this.isLanguageChangingTo = e;
    const r = We();
    this.emit("languageChanging", e);
    const i = (a) => {
      this.language = a, this.languages = this.services.languageUtils.toResolveHierarchy(a), this.resolvedLanguage = void 0, this.setResolvedLanguage(a);
    }, s = (a, c) => {
      c ? this.isLanguageChangingTo === e && (i(c), this.translator.changeLanguage(c), this.isLanguageChangingTo = void 0, this.emit("languageChanged", c), this.logger.log("languageChanged", c)) : this.isLanguageChangingTo = void 0, r.resolve((...l) => this.t(...l)), n && n(a, (...l) => this.t(...l));
    }, o = (a) => {
      !e && !a && this.services.languageDetector && (a = []);
      const c = O(a) ? a : a && a[0], l = this.store.hasLanguageSomeTranslations(c) ? c : this.services.languageUtils.getBestMatchFromCodes(O(a) ? [a] : a);
      l && (this.language || i(l), this.translator.language || this.translator.changeLanguage(l), this.services.languageDetector?.cacheUserLanguage?.(l)), this.loadResources(l, (u) => {
        s(u, l);
      });
    };
    return !e && this.services.languageDetector && !this.services.languageDetector.async ? o(this.services.languageDetector.detect()) : !e && this.services.languageDetector && this.services.languageDetector.async ? this.services.languageDetector.detect.length === 0 ? this.services.languageDetector.detect().then(o) : this.services.languageDetector.detect(o) : o(e), r;
  }
  getFixedT(e, n, r, i) {
    const s = i?.scopeNs, o = (a, c, ...l) => {
      let u;
      typeof c != "object" ? u = this.options.overloadTranslationOptionHandler([a, c].concat(l)) : u = {
        ...c
      }, u.lng = u.lng || o.lng, u.lngs = u.lngs || o.lngs;
      const h = u.ns !== void 0 && u.ns !== null;
      u.ns = u.ns || o.ns, u.keyPrefix !== "" && (u.keyPrefix = u.keyPrefix || r || o.keyPrefix);
      const d = {
        ...this.options,
        ...u
      };
      Array.isArray(s) && !h && (d.ns = s), typeof u.keyPrefix == "function" && (u.keyPrefix = Ie(u.keyPrefix, d));
      const g = this.options.keySeparator || ".";
      let p;
      return u.keyPrefix && Array.isArray(a) ? p = a.map((m) => (typeof m == "function" && (m = Ie(m, d)), `${u.keyPrefix}${g}${m}`)) : (typeof a == "function" && (a = Ie(a, d)), p = u.keyPrefix ? `${u.keyPrefix}${g}${a}` : a), this.t(p, u);
    };
    return O(e) ? o.lng = e : o.lngs = e, o.ns = n, o.keyPrefix = r, o;
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
  hasLoadedNamespace(e, n = {}) {
    if (!this.isInitialized)
      return this.logger.warn("hasLoadedNamespace: i18next was not initialized", this.languages), !1;
    if (!this.languages || !this.languages.length)
      return this.logger.warn("hasLoadedNamespace: i18n.languages were undefined or empty", this.languages), !1;
    const r = n.lng || this.resolvedLanguage || this.languages[0], i = this.options ? this.options.fallbackLng : !1, s = this.languages[this.languages.length - 1];
    if (r.toLowerCase() === "cimode") return !0;
    const o = (a, c) => {
      const l = this.services.backendConnector.state[`${a}|${c}`];
      return l === -1 || l === 0 || l === 2;
    };
    if (n.precheck) {
      const a = n.precheck(this, o);
      if (a !== void 0) return a;
    }
    return !!(this.hasResourceBundle(r, e) || !this.services.backendConnector.backend || this.options.resources && !this.options.partialBundledLanguages || o(r, e) && (!i || o(s, e)));
  }
  loadNamespaces(e, n) {
    const r = We();
    return this.options.ns ? (O(e) && (e = [e]), e.forEach((i) => {
      this.options.ns.includes(i) || this.options.ns.push(i);
    }), this.loadResources((i) => {
      r.resolve(), n && n(i);
    }), r) : (n && n(), Promise.resolve());
  }
  loadLanguages(e, n) {
    const r = We();
    O(e) && (e = [e]);
    const i = this.options.preload || [], s = e.filter((o) => !i.includes(o) && this.services.languageUtils.isSupportedCode(o));
    return s.length ? (this.options.preload = i.concat(s), this.loadResources((o) => {
      r.resolve(), n && n(o);
    }), r) : (n && n(), Promise.resolve());
  }
  dir(e) {
    if (e || (e = this.resolvedLanguage || (this.languages?.length > 0 ? this.languages[0] : this.language)), !e) return "rtl";
    try {
      const i = new Intl.Locale(e);
      if (i && i.getTextInfo) {
        const s = i.getTextInfo();
        if (s && s.direction) return s.direction;
      }
    } catch {
    }
    const n = ["ar", "shu", "sqr", "ssh", "xaa", "yhd", "yud", "aao", "abh", "abv", "acm", "acq", "acw", "acx", "acy", "adf", "ads", "aeb", "aec", "afb", "ajp", "apc", "apd", "arb", "arq", "ars", "ary", "arz", "auz", "avl", "ayh", "ayl", "ayn", "ayp", "bbz", "pga", "he", "iw", "ps", "pbt", "pbu", "pst", "prp", "prd", "ug", "ur", "ydd", "yds", "yih", "ji", "yi", "hbo", "men", "xmn", "fa", "jpr", "peo", "pes", "prs", "dv", "sam", "ckb"], r = this.services?.languageUtils || new ki(xn());
    return e.toLowerCase().indexOf("-latn") > 1 ? "ltr" : n.includes(r.getLanguagePartFromCode(e)) || e.toLowerCase().indexOf("-arab") > 1 ? "rtl" : "ltr";
  }
  static createInstance(e = {}, n) {
    const r = new Ze(e, n);
    return r.createInstance = Ze.createInstance, r;
  }
  cloneInstance(e = {}, n = wt) {
    const r = e.forkResourceStore;
    r && delete e.forkResourceStore;
    const i = {
      ...this.options,
      ...e,
      isClone: !0
    }, s = new Ze(i);
    if ((e.debug !== void 0 || e.prefix !== void 0) && (s.logger = s.logger.clone(e)), ["store", "services", "language"].forEach((a) => {
      s[a] = this[a];
    }), s.services = {
      ...this.services
    }, s.services.utils = {
      hasLoadedNamespace: s.hasLoadedNamespace.bind(s)
    }, r) {
      const a = Object.keys(this.store.data).reduce((c, l) => (c[l] = {
        ...this.store.data[l]
      }, c[l] = Object.keys(c[l]).reduce((u, h) => (u[h] = {
        ...c[l][h]
      }, u), c[l]), c), {});
      s.store = new Ci(a, i), s.services.resourceStore = s.store;
    }
    if (e.interpolation) {
      const c = {
        ...xn().interpolation,
        ...this.options.interpolation,
        ...e.interpolation
      }, l = {
        ...i,
        interpolation: c
      };
      s.services.interpolator = new Ri(l);
    }
    return s.translator = new qt(s.services, i), s.translator.on("*", (a, ...c) => {
      s.emit(a, ...c);
    }), s.init(i, n), s.translator.options = i, s.translator.backendConnector.services.utils = {
      hasLoadedNamespace: s.hasLoadedNamespace.bind(s)
    }, s;
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
const j = Ze.createInstance();
j.createInstance;
j.dir;
j.init;
j.loadResources;
j.reloadResources;
j.use;
j.changeLanguage;
j.getFixedT;
j.t;
j.exists;
j.setDefaultNamespace;
j.hasLoadedNamespace;
j.loadNamespaces;
j.loadLanguages;
function ct(t) {
  return t.plain === "" && t.ssml === "" && t.language === "";
}
function fd(t) {
  if (!t || ct(t)) return;
  if (t.ssml === "" && t.language === "") return t.plain;
  const e = { language: t.language };
  return t.plain !== "" && (e.plain = t.plain), t.ssml !== "" && (e.ssml = t.ssml), e;
}
function gd(t, e) {
  if (t.lang !== e.lang || t.tag !== e.tag) return !1;
  const n = Object.entries(t.attrs ?? {}), r = Object.entries(e.attrs ?? {});
  return n.length !== r.length ? !1 : n.every(([i, s]) => e.attrs?.[i] === s);
}
const zt = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), En = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"), pd = /[\u00A0\u2007\u202F]/;
function md(t) {
  return pd.test(t);
}
function _e(t, e) {
  let n = "", r = !1, i = !1;
  for (const s of t)
    if (md(s))
      n += s, r = !1, i = !0;
    else if (/\s/.test(s)) {
      if (e && !i || r) continue;
      n += " ", r = !0;
    } else s !== "​" && s !== "­" && (n += s, r = !1, i = !0);
  return n;
}
const Hn = "#css(", Wn = ")";
function yd(t) {
  return `${Hn}${encodeURIComponent(t)}${Wn}`;
}
function bd(t) {
  if (!(!t || !t.startsWith(Hn) || !t.endsWith(Wn)))
    return decodeURIComponent(t.slice(Hn.length, -Wn.length));
}
const Gn = "#domrange(", Kn = ")";
function Sd(t) {
  return `${Gn}${encodeURIComponent(JSON.stringify(t))}${Kn}`;
}
function vd(t) {
  if (!(!t || !t.startsWith(Gn) || !t.endsWith(Kn)))
    try {
      const e = JSON.parse(decodeURIComponent(t.slice(Gn.length, -Kn.length)));
      return !e?.start?.cssSelector || typeof e.start.textNodeIndex != "number" ? void 0 : e;
    } catch {
      return;
    }
}
const Jn = ":~:text=";
function xt(t) {
  return encodeURIComponent(t).replace(/-/g, "%2D");
}
function ra(t) {
  let e = "";
  return t.prefix && (e += `${xt(t.prefix)}-,`), e += xt(t.textStart), t.textEnd && (e += `,${xt(t.textEnd)}`), t.suffix && (e += `,-${xt(t.suffix)}`), `${Jn}${e}`;
}
function wd(t) {
  if (!t) return;
  const e = t.indexOf(Jn);
  if (e === -1) return;
  const n = t.slice(e + Jn.length).split("&")[0];
  if (n)
    try {
      let r = n.split(",");
      const i = { textStart: "" };
      return r[0].endsWith("-") && (i.prefix = decodeURIComponent(r[0].slice(0, -1)), r = r.slice(1)), r.length > 0 && r[r.length - 1].startsWith("-") && (i.suffix = decodeURIComponent(r[r.length - 1].slice(1)), r = r.slice(0, -1)), r.length === 0 || r[0] === "" ? void 0 : (i.textStart = decodeURIComponent(r[0]), r.length > 1 && (i.textEnd = decodeURIComponent(r[1])), i);
    } catch {
      return;
    }
}
function Ii(t) {
  const e = t?.textref;
  if (!e) return;
  const n = e.indexOf(":~:"), r = n === -1 ? e : e.slice(0, n);
  let i, s;
  const o = vd(r);
  if (o)
    s = o, i = o.start.cssSelector;
  else {
    const l = bd(r);
    l !== void 0 ? i = l : t?.id && r === `#${CSS.escape(t.id)}` && (i = r);
  }
  const a = wd(e);
  if (i === void 0 && s === void 0 && a === void 0)
    return;
  const c = {};
  return i !== void 0 && (c.cssSelector = i), s !== void 0 && (c.domRange = s), a?.textEnd !== void 0 ? c.fragment = ra(a) : a && (c.text = { highlight: a.textStart }, a.prefix !== void 0 && (c.text.before = a.prefix), a.suffix !== void 0 && (c.text.after = a.suffix)), c;
}
const xd = { contextualizations: { abstract: { block: { start: "Start of the abstract.", end: "End of the abstract." } }, acknowledgments: { block: { start: "Start of the acknowledgments.", end: "End of the acknowledgments." } }, afterword: { block: { start: "Start of the afterword.", end: "End of the afterword." } }, appendix: { block: { start: "Start of the appendix.", end: "End of the appendix." } }, aside: { block: { start: "Start of the aside.", end: "End of the aside." } }, audio: { inline: { labelled: "Audio with a label: {{ description }}", unlabelled: "Audio with no label." } }, bibliography: { block: { start: "Start of the bibliography.", end: "End of the bibliography." } }, blockquote: { inline: "Blockquote." }, cell: { inline: { withHeader: "{{ header }}: {{ value }}", withoutHeader: "{{ value }}" } }, chapter: { block: { start: "Start of the chapter.", end: "End of the chapter." } }, colophon: { inline: "Colophon." }, complementary: { block: { start: "Start of the complementary content.", end: "End of the complementary content." } }, conclusion: { block: { start: "Start of the conclusion.", end: "End of the conclusion." } }, cover: { inline: { labelled: "Cover with a label: {{ description }}", unlabelled: "Cover with no label." } }, credit: { inline: "Credit." }, credits: { block: { start: "Start of the credits.", end: "End of the credits." } }, dedication: { inline: "Dedication." }, definition: { inline: "Definition." }, details: { block: { start: "Start of the disclosure.", end: "End of the disclosure." } }, endnotes: { block: { start: "Start of the endnotes.", end: "End of the endnotes." } }, epigraph: { inline: "Epigraph." }, epilogue: { block: { start: "Start of the epilogue.", end: "End of the epilogue." } }, errata: { block: { start: "Start of the errata.", end: "End of the errata." } }, example: { block: { start: "Start of the example.", end: "End of the example." } }, figure: { inline: "Figure: {{ description }}" }, footnote: { block: { start: "Start of the footnote.", end: "End of the footnote." } }, foreword: { block: { start: "Start of the foreword.", end: "End of the foreword." } }, glossary: { block: { start: "Start of the glossary.", end: "End of the glossary." } }, heading1: { inline: "Heading level 1." }, heading2: { inline: "Heading level 2." }, heading3: { inline: "Heading level 3." }, heading4: { inline: "Heading level 4." }, heading5: { inline: "Heading level 5." }, heading6: { inline: "Heading level 6." }, image: { inline: { labelled: "Image with a label: {{ description }}", unlabelled: "Image with no label." } }, index: { block: { start: "Start of the index.", end: "End of the index." } }, introduction: { block: { start: "Start of the introduction.", end: "End of the introduction." } }, list: { block: { start: "Start of the list.", end: "End of the list." } }, listItem: { inline: "List item." }, math: { inline: { labelled: "{{ description }}", unlabelled: "Math formula with no label." } }, notice: { inline: "Notice." }, pagebreak: { inline: "Pagebreak." }, pagelist: { block: { start: "Start of the page list.", end: "End of the page list." } }, part: { inline: "Part." }, preface: { block: { start: "Start of the preface.", end: "End of the preface." } }, prologue: { block: { start: "Start of the prologue.", end: "End of the prologue." } }, pullquote: { inline: "Pullquote." }, qna: { block: { start: "Start of the questions and answers.", end: "End of the questions and answers." } }, row: { inline: "Row: {{ count }}" }, rowheader: { inline: { withHeader: "{{ header }}: {{ value }}", withoutHeader: "{{ value }}" } }, separator: { inline: "Separator." }, subtitle: { inline: "Subtitle." }, summary: { inline: "Summary." }, table: { block: { end: "End of the table.", start: { labelled: "Table: {{ description }}. {{ lines }}. {{ columns }}.", unlabelled: "Table. {{ lines }}. {{ columns }}." } }, inline: { labelled: "Table: {{ description }}. {{ lines }}. {{ columns }}.", unlabelled: "Table. {{ lines }}. {{ columns }}." }, parts: { columns_one: "1 column", columns_other: "{{ count }} columns", lines_one: "1 line", lines_other: "{{ count }} lines" } }, term: { inline: "Term." }, tip: { inline: "Tip." }, video: { inline: { labelled: "Video with a label: {{ description }}", unlabelled: "Video with no label." } } } }, Ed = {
  speech: xd
}, ia = Ed.speech.contextualizations, Fi = { en: ia }, Cd = {};
async function kd(t) {
  const e = Fi[t];
  if (e) return e;
  const n = Cd[t];
  if (!n) return ia;
  const r = (await n()).speech.contextualizations;
  return Fi[t] = r, r;
}
const Od = /<lang xml:lang="[^"]*">([\s\S]*?)<\/lang>/g;
function sa(t) {
  return t.replace(Od, "$1");
}
const Ad = /\s*<readium:[a-zA-Z][\w-]*\s+id="[^"]*"\s*\/>\s*/g;
function Td(t) {
  return t.replace(Ad, (n, r, i) => {
    const s = i.slice(r + n.length);
    return s.length === 0 || Yt(s) ? "" : " ";
  }).replace(/ {2,}/g, " ").trim();
}
function Rd(t) {
  return t.includes("<");
}
function fr(t) {
  if (t === void 0) return;
  if (typeof t == "string") return { plain: t };
  const e = { language: t.language };
  if (t.ssml) {
    const n = Td(t.ssml);
    Rd(n) && (e.ssml = n);
  }
  return t.plain && (e.plain = t.plain), e.plain || e.ssml ? e : void 0;
}
function tn(t) {
  return t.replace(/<[^>]+>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/ {2,}/g, " ").trim();
}
const aa = /<lang xml:lang="([^"]*)">([\s\S]*?)<\/lang>/g;
function oa(t) {
  return new RegExp(aa).test(t);
}
function Li(t) {
  return t.replace(/<[^>]+>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/ {2,}/g, " ");
}
const Nd = new RegExp(
  `\\s+|[${Pn}]+|[${De}]+|[^\\s${Pn}${De}]+`,
  "gu"
);
function Cn(t) {
  const e = [];
  for (const [n] of t.matchAll(Nd))
    /^\s/.test(n) ? e.push({ kind: "space" }) : Xc(n) ? e.push({ kind: "open", text: n }) : Yt(n) ? e.push({ kind: "close", text: n }) : e.push({ kind: "word", text: n });
  return e;
}
function Dd(t) {
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
function Id(t) {
  let e = t.length;
  for (; e > 0 && (t[e - 1].kind === "space" || t[e - 1].kind === "open"); ) e--;
  return t.slice(e).some((n) => n.kind === "open") ? t.splice(e) : [];
}
function Fd(t) {
  let e = 0;
  for (; e < t.length && (t[e].kind === "space" || t[e].kind === "close"); ) e++;
  return t.slice(0, e).some((n) => n.kind === "close") ? t.splice(0, e) : [];
}
function la(t, e) {
  const n = [];
  let r = 0;
  for (const s of t.matchAll(aa))
    n.push({
      tokens: Cn(Li(t.slice(r, s.index))),
      language: e,
      tagged: !1
    }), n.push({ tokens: Cn(tn(s[2])), language: s[1], tagged: !0 }), r = s.index + s[0].length;
  n.push({
    tokens: Cn(Li(t.slice(r))),
    language: e,
    tagged: !1
  });
  for (let s = 0; s < n.length - 1; s++)
    !n[s].tagged && n[s + 1].tagged ? n[s + 1].tokens.unshift(...Id(n[s].tokens)) : n[s].tagged && !n[s + 1].tagged && n[s].tokens.push(...Fd(n[s + 1].tokens));
  const i = [];
  for (const s of n) {
    const o = Dd(s.tokens);
    o && i.push({ plain: o, language: s.language });
  }
  return i;
}
const ca = /<readium:[a-zA-Z][\w-]*\s+id="([^"]*)"\s*\/>/g;
function Ld(t) {
  return new RegExp(ca).test(t);
}
function Pd(t) {
  const e = [];
  let n = 0;
  for (const i of t.matchAll(ca)) {
    const s = t.slice(n, i.index).trim();
    s && e.push({ ssml: s }), e.push({ placeholderId: i[1] }), n = i.index + i[0].length;
  }
  const r = t.slice(n).trim();
  return r && e.push({ ssml: r }), e;
}
const ap = [
  "aside",
  "audio",
  "bibliography",
  "cell",
  "columnheader",
  "details",
  "endnotes",
  "figure",
  "footnote",
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
], $d = [
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
], _d = {
  footnote: { drops: ["aside"], unconditional: !0 },
  cover: { drops: ["image"] },
  pullquote: { drops: ["blockquote", "aside"] },
  epigraph: { drops: ["blockquote"] }
}, Bd = ["noteref", "pagebreak"], Ud = ["audio", "video", "image", "figure", "math", "table", "cover"], qd = ["cell", "rowheader"], zd = ["separator"];
function ua(t) {
  const e = fr(t.text);
  return e ? e.plain ?? (e.ssml ? tn(e.ssml) : "") : "";
}
function jd(t) {
  const e = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
  let r = 0, i;
  return t.forEach((s, o) => {
    e.set(s, o + 1);
    const a = s.children ?? [];
    if (r = Math.max(r, a.length), a.some((c) => c.role?.includes("columnheader"))) {
      i = a.map(ua);
      return;
    }
    i && a.forEach((c, l) => {
      const u = c.role ?? [];
      if (!u.includes("cell") && !u.includes("rowheader")) return;
      const h = i[l];
      h && n.set(c, h);
    });
  }), { lines: t.length, columns: r, rowNumbers: e, cellHeaders: n };
}
const Vd = new Set($d), Md = new Set(Bd), Hd = new Set(Ud), gr = new Set(qd), Wd = new Set(zd);
function at(t, e, n, r) {
  const i = n ? `${e}.${n}` : void 0;
  if (i && t.i18n.exists(i)) return t.i18n.t(i, r);
  if (t.i18n.exists(e)) return t.i18n.t(e, r);
}
function de(t, e) {
  return e === "ssml" ? { ssml: zt(t), synthetic: !0 } : { plain: t, synthetic: !0 };
}
function fe(t, e, n, r) {
  t.push(...r);
  for (let i = 0; i < r.length; i++) e.push(n);
}
function ha(t, e, n, r, i, s, o) {
  o ? (i.some((a) => n.blockStarts.has(a)) && n.blockStarts.add(o), fe(t, e, s[0] ?? r, [o])) : (t.push(...i), e.push(...s));
}
function pr(t, e) {
  return gr.has(t) ? !0 : e.contextualize.has(t);
}
function Gd(t, e, n) {
  return e.some((r) => {
    const i = _d[r];
    return i?.drops.includes(t) ? i.unconditional || pr(r, n) : !1;
  });
}
function Pi(t, e, n, r, i, s, o, a) {
  if (!pr(i, r)) return;
  if ((r.i18n.exists(`${i}.block.start`) || r.i18n.exists(`${i}.block.end`)) && r.contextualizationShapes[i] !== "inline") {
    const l = s === "before" ? `${i}.block.start` : `${i}.block.end`, u = at(r, l, o, a);
    u && fe(t, e, n, [de(u, r.format)]);
    return;
  }
  if (s === "before") {
    const l = at(r, `${i}.inline`, o, a);
    if (l) {
      const u = de(l, r.format);
      if (gr.has(i) && (delete u.synthetic, r.language !== "none")) {
        const h = typeof n.text == "object" ? n.text.language : void 0;
        h && (u.language = h);
      }
      fe(t, e, n, [u]);
    }
  }
}
function $i(t, e) {
  return e.size > 0 && t.some((n) => e.has(n));
}
function mr(t, e) {
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
    a.length === 1 && s.endsWith(a) || (s && !Yt(a) && (s += " "), s += a);
  const o = e === "ssml" ? { ssml: s } : { plain: s };
  return n && (o.language = n), t.some((a) => a.synthetic) && (o.synthetic = !0), o;
}
function Kd(t, e) {
  const n = fr(t.text), r = n ? da(n, e.format, e.language) : [];
  if (!e.contextualize.has("pagebreak")) return r;
  const i = e.i18n.exists("pagebreak.block.start") ? "pagebreak.block.start" : "pagebreak.inline", s = at(e, i);
  if (s === void 0) return r;
  const o = de(s, e.format);
  if (r.length === 0) return [o];
  const a = mr([o, ...r], e.format);
  return a ? (a.plain !== void 0 && (a.plain += "."), a.ssml !== void 0 && (a.ssml += "."), [a]) : [o, ...r];
}
function da(t, e, n) {
  if (e === "plain" && n !== "block-level" && n !== "none" && t.ssml && oa(t.ssml))
    return la(t.ssml, t.language).map((i) => {
      const s = { plain: i.plain };
      return i.language && (s.language = i.language), s;
    });
  const r = {};
  return t.language && (r.language = t.language), e === "ssml" ? r.ssml = t.ssml ?? zt(t.plain ?? "") : r.plain = t.plain ?? tn(t.ssml ?? ""), (n === "block-level" || n === "none") && (r.ssml && (r.ssml = sa(r.ssml)), n === "none" && delete r.language), [r];
}
function Jd(t) {
  return (t.role ?? []).some((e) => Md.has(e));
}
function Xd(t, e, n, r, i, s) {
  const o = typeof t.text == "object" ? t.text.language : void 0, a = new Map((t.children ?? []).map((d) => [d.id, d])), c = [], l = [], u = [];
  for (const d of Pd(e)) {
    if (d.placeholderId !== void 0) {
      const p = a.get(d.placeholderId);
      if (!p) continue;
      i.inlineContextualization || !Jd(p) ? fa(p, c, l, i, s) : u.push(p);
      continue;
    }
    if (!d.ssml) continue;
    if (i.format === "plain" && i.language !== "block-level" && i.language !== "none" && oa(d.ssml)) {
      for (const p of la(d.ssml, o)) {
        const m = { plain: p.plain };
        p.language && (m.language = p.language), c.push(m), l.push(t);
      }
      continue;
    }
    const g = {};
    o && (g.language = o), i.format === "ssml" ? g.ssml = d.ssml : g.plain = tn(d.ssml), (i.language === "block-level" || i.language === "none") && (g.ssml && (g.ssml = sa(g.ssml)), i.language === "none" && delete g.language), c.push(g), l.push(t);
  }
  const h = c.length > 1 ? mr(c, i.format) : void 0;
  return ha(n, r, i, t, c, l, h), u;
}
function _i(t, e, n, r) {
  const i = `${e}.parts.${n}`;
  return t.i18n.exists(i, { count: r }) ? t.i18n.t(i, { count: r }) : String(r);
}
function Yd(t) {
  return t.description === void 0 ? { variantKey: "unlabelled" } : { variantKey: "labelled", params: { description: t.description } };
}
function Bi(t, e) {
  const n = e.tableCellHeaders.get(t);
  return {
    variantKey: n !== void 0 ? "withHeader" : "withoutHeader",
    params: { header: n ?? "", value: ua(t) }
  };
}
const Qd = {
  table: (t, e) => {
    const n = (t.children ?? []).filter((i) => i.role?.includes("row")), r = jd(n);
    for (const [i, s] of r.rowNumbers) e.tableRowNumbers.set(i, s);
    for (const [i, s] of r.cellHeaders) e.tableCellHeaders.set(i, s);
    return {
      params: {
        lines: _i(e, "table", "lines", r.lines),
        columns: _i(e, "table", "columns", r.columns)
      }
    };
  },
  row: (t, e) => ({ params: { count: String(e.tableRowNumbers.get(t) ?? "") } }),
  cell: Bi,
  rowheader: Bi
};
function Ui(t, e, n) {
  const r = Yd(e);
  let i = r.variantKey, s = r.params;
  const o = Qd[t]?.(e, n);
  o && (o.variantKey && (i = o.variantKey), s = { ...s, ...o.params });
  const a = n.contextualizationParams?.(t, e);
  return a && (s = { ...s, ...a }), { variantKey: i, params: s };
}
function fa(t, e, n, r, i) {
  const s = t.role ?? [];
  if ($i(s, r.skip)) return;
  const o = s.some((d) => Vd.has(d)), a = o && !i, c = e.length, l = s.filter(
    (d) => d !== "footnote" && d !== "pagebreak" && !Gd(d, s, r)
  ), u = s.some((d) => Hd.has(d) && r.contextualize.has(d)), h = s.includes("table") && t.description !== void 0 && !u;
  h && fe(e, n, t, [de(t.description, r.format)]);
  for (const d of l) {
    if (d === "figure" && t.description === void 0) continue;
    const { variantKey: g, params: p } = Ui(d, t, r);
    Pi(e, n, t, r, d, "before", g, p);
  }
  if (s.includes("noteref"))
    for (const d of t.children ?? []) {
      const g = d.role ?? [];
      if (!$i(g, r.skip))
        if (g.includes("footnote")) {
          const p = [], m = [];
          ue([d], p, m, r, i);
          const b = r.contextualize.has("footnote"), x = r.i18n.exists("footnote.block.start") || r.i18n.exists("footnote.block.end"), A = b ? at(r, x ? "footnote.block.start" : "footnote.inline") : void 0, S = b && (A !== void 0 || x), w = [], T = [];
          if (A !== void 0 && (w.push(de(A, r.format)), T.push(d)), w.push(...p), T.push(...m), S && x) {
            const P = at(r, "footnote.block.end");
            P !== void 0 && (w.push(de(P, r.format)), T.push(d));
          }
          const I = S && w.length > 1 ? mr(w, r.format) : void 0;
          ha(e, n, r, d, w, T, I);
        } else
          ue([d], e, n, r, i);
    }
  else if (!s.some((d) => Wd.has(d))) {
    const d = typeof t.text == "object" ? t.text.ssml : void 0;
    if (d && Ld(d)) {
      const g = Xd(t, d, e, n, r, i);
      if (g.length > 0) {
        const p = i || o && e.length > c;
        ue(g, e, n, r, p);
      }
    } else if (s.includes("pagebreak")) {
      if (fe(e, n, t, Kd(t, r)), t.children) {
        const g = i || o && e.length > c;
        ue(t.children, e, n, r, g);
      }
    } else {
      const p = s.some((m) => gr.has(m) && pr(m, r)) ? void 0 : fr(t.text);
      if (p && fe(e, n, t, da(p, r.format, r.language)), t.children) {
        const m = i || o && e.length > c;
        ue(t.children, e, n, r, m);
      }
    }
  }
  a && e.length > c && r.blockStarts.add(e[c]), t.description !== void 0 && !u && !h && fe(e, n, t, [de(t.description, r.format)]);
  for (const d of l) {
    if (d === "figure" && t.description === void 0) continue;
    const { variantKey: g, params: p } = Ui(d, t, r);
    Pi(e, n, t, r, d, "after", g, p);
  }
}
function ue(t, e, n, r, i) {
  t.forEach((s, o) => fa(s, e, n, r, o === 0 ? i : !1));
}
function Zd(t, e) {
  const n = j.createInstance();
  return n.init({
    lng: t,
    resources: { [t]: { translation: e } },
    interpolation: { escapeValue: !1 }
  }), n;
}
function ga(t, e) {
  if (typeof e == "string" || typeof t != "object") return e;
  const n = { ...t };
  for (const r of Object.keys(e))
    n[r] = ga(t[r], e[r]);
  return n;
}
function ef(t, e) {
  if (!e) return t;
  const n = { ...t };
  for (const r of Object.keys(e))
    n[r] = ga(t[r], e[r]);
  return n;
}
async function pa(t) {
  const e = t.contextualizationLocale ?? "en", n = ef(
    await kd(e),
    t.contextualization?.contextualizations
  );
  return {
    contextualizations: n,
    i18n: Zd(e, n),
    skip: new Set(t.skip ?? []),
    contextualize: new Set(t.contextualize ?? []),
    contextualizationShapes: t.contextualization?.shapes ?? {},
    contextualizationParams: t.contextualization?.params,
    format: t.format ?? "plain",
    inlineContextualization: t.inlineContextualization ?? !1,
    language: t.language ?? "block-level",
    blockStarts: /* @__PURE__ */ new Set(),
    tableRowNumbers: /* @__PURE__ */ new Map(),
    tableCellHeaders: /* @__PURE__ */ new Map()
  };
}
async function op(t, e) {
  const n = [], r = [];
  return ue(t, n, r, await pa(e), !1), ma(n, r, yr(t));
}
async function tf(t, e) {
  const n = [], r = [], i = await pa(e);
  ue(t, n, r, i, !1);
  const s = n.map((o) => i.blockStarts.has(o));
  return { utterances: ma(n, r, yr(t)), sources: r, blockStarts: s };
}
function yr(t, e = [], n = /* @__PURE__ */ new Map()) {
  for (const r of t)
    n.set(r, e), r.children && yr(r.children, [r, ...e], n);
  return n;
}
function ma(t, e, n) {
  return t.map((r, i) => {
    const s = e[i];
    let o = Ii(s);
    if (!o && s) {
      for (const a of n.get(s) ?? [])
        if (o = Ii(a), o) break;
    }
    return o ? { ...r, locate: o } : r;
  });
}
class lp {
  engine;
  contentQueue = [];
  events = new Kt();
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
    this.engine = e, this._defaults = new qh(n.defaults), this._preferences = new it(n.preferences), this._settings = new Si(this._preferences, this._defaults), this.contextualizationOverrides = n.contextualizationOverrides, this.setupEngineListeners(), this.applyEngineParameters(), this.initializeEngine();
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
  async loadGndContent(e) {
    this.source = e, await this.reextract();
  }
  setContentQueue(e, n = null, r = null) {
    this.clearPendingAdvance(), this.pendingAutoPauseIndex = null, (this.navigatorState === "playing" || this.navigatorState === "paused") && this.engine.stop();
    const i = Array.isArray(e) ? e : [e];
    this.contentQueue = [...i], this.pendingResumeIndex = n, this.pendingResumeState = r, this.setNavigatorState("loading"), this.emitEvent({ type: "loading" }), this.engine.loadUtterances(i, n ?? void 0), this.emitContentChangeEvent({ content: i });
  }
  // Re-runs extraction from `this.source`, resuming near the old position if playback was underway.
  async reextract() {
    if (!this.source) return;
    const e = this.navigatorState === "playing" || this.navigatorState === "paused" ? this.navigatorState : null, n = this.contentSources, r = this.getCurrentUtteranceIndex(), { utterances: i, sources: s, blockStarts: o } = await tf(this.source, {
      format: this._settings.format,
      inlineContextualization: this._settings.inlineContextualization,
      skip: this._settings.skip,
      contextualize: this._settings.contextualize,
      contextualization: {
        contextualizations: this.contextualizationOverrides?.contextualizations,
        shapes: Wh(this._settings.verbosity, this.contextualizationOverrides?.shapes),
        params: this.contextualizationOverrides?.params
      },
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
    return this._preferencesEditor === null && (this._preferencesEditor = new bi(this._preferences, this.settings)), this._preferencesEditor;
  }
  async submitPreferences(e) {
    !this.source && mi.some((n) => e[n] !== void 0) && console.warn(
      "submitPreferences(): extraction-affecting preferences (format, inlineContextualization, verbosity, skip, contextualize, language) have no effect on content loaded via loadContent() — use loadGndContent() to re-extract on submission."
    ), this._preferences = this._preferences.merging(e), await this.applyPreferences();
  }
  async applyPreferences() {
    const e = this._settings;
    this._settings = new Si(this._preferences, this._defaults), this.applyEngineParameters(), this._preferencesEditor !== null && (this._preferencesEditor = new bi(this._preferences, this._settings)), mi.some((n) => !this.sameSettingValue(e[n], this._settings[n])) && await this.reextract();
  }
  // Arrays (skip/contextualize) compare as sets, not by reference.
  sameSettingValue(e, n) {
    return Array.isArray(e) && Array.isArray(n) ? e.length === n.length && e.every((r) => n.includes(r)) : e === n;
  }
  async destroy() {
    this.clearPendingAdvance(), this.events.clear(), await this.engine.destroy();
  }
}
const nf = [
  "heading1",
  "heading2",
  "heading3",
  "heading4",
  "heading5",
  "heading6"
], qi = {
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
}, rf = {
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
}, sf = {
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
}, af = /* @__PURE__ */ new Set(["table", "tr", "td", "th"]), of = /* @__PURE__ */ new Set(["table", "row", "cell", "columnheader", "rowheader"]);
function lf(t) {
  const e = t.getAttribute("role");
  if (!e) return !1;
  const n = e.split(/\s+/).filter(Boolean);
  return n.includes("presentation") || n.includes("none");
}
function cf(t) {
  for (let e = t.parentElement; e; e = e.parentElement)
    if (lf(e)) return !0;
  return !1;
}
function uf(t, e, n) {
  return af.has(e) || n.some((r) => of.has(r));
}
function At(t, e) {
  const n = t.getAttribute("role");
  return n ? n.split(/\s+/).filter(Boolean).includes(e) : !1;
}
function hf(t) {
  return t.tagName.toLowerCase() === "table" || At(t, "table") || At(t, "grid") || At(t, "treegrid");
}
function df(t) {
  return t.tagName.toLowerCase() === "tr" || At(t, "row");
}
function ff(t) {
  let e = null;
  for (let r = t.parentElement; r; r = r.parentElement)
    if (hf(r)) {
      e = r;
      break;
    }
  return e ? e.ownerDocument.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (r) => df(r) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
  }).nextNode() === t : !1;
}
function ya(t) {
  const e = [];
  let n = !1;
  const r = t.getAttribute("role");
  if (r)
    for (const s of r.split(/\s+/).filter(Boolean))
      if ((s === "presentation" || s === "none") && (n = !0), s === "heading") {
        let o = 2;
        const a = parseInt(t.getAttribute("aria-level") ?? "", 10);
        Number.isFinite(a) && a >= 1 && (o = Math.min(a, 6)), e.push(nf[o - 1]);
      } else qi[s] && e.push(qi[s]);
  const i = t.getAttribute("epub:type");
  if (i)
    for (const s of i.split(/\s+/).filter(Boolean)) {
      const o = rf[s];
      o && e.push(o);
    }
  return { attrRoles: e, presentational: n };
}
function ba(t) {
  const { attrRoles: e, presentational: n } = ya(t);
  return e.length > 0 || n;
}
function Tt(t) {
  const e = [], n = (o) => {
    e.includes(o) || e.push(o);
  }, { attrRoles: r, presentational: i } = ya(t), s = t.tagName.toLowerCase();
  if (i)
    return ["presentation"];
  if (uf(t, s, r) && cf(t))
    return ["presentation"];
  if (s === "body")
    n("body");
  else if (s === "th")
    switch (t.getAttribute("scope")) {
      case "col":
        n("columnheader");
        break;
      case "row":
        n("rowheader");
        break;
      default: {
        const o = t.parentElement;
        o && ff(o) ? n("columnheader") : t.previousElementSibling === null ? n("rowheader") : n("cell");
      }
    }
  else {
    const o = sf[s];
    o && n(o);
  }
  for (const o of r) n(o);
  return e;
}
function zi(t) {
  return !!(t.getAttribute("aria-hidden") === "true" || t.hasAttribute("hidden"));
}
function gf(t) {
  let e = "";
  const n = (r) => {
    r.nodeType === 3 && (e += r.nodeValue ?? "");
    for (let i = r.firstChild; i; i = i.nextSibling) n(i);
  };
  return n(t), e;
}
function nn(t) {
  return _e(gf(t), !0).trim();
}
function Xn(t) {
  let e = "";
  const n = (r, i) => {
    if (r.nodeType === 3) {
      e += r.nodeValue ?? "";
      return;
    }
    if (!(r.nodeType === 1 && !i && ba(r)))
      for (let s = r.firstChild; s; s = s.nextSibling) n(s, !1);
  };
  return n(t, !0), e;
}
function ji(t) {
  return _e(Xn(t), !0).trim();
}
function pf(t) {
  if (zi(t))
    return [null, !1];
  const e = (t.getAttribute("aria-labelledby") ?? "").trim();
  if (e) {
    const s = [...new Set(e.split(/\s+/).filter(Boolean))], o = t.ownerDocument, a = s.map((c) => o.getElementById(c)).filter((c) => c !== null);
    if (a.length > 0) {
      let c = "";
      a.forEach((u, h) => {
        if (zi(u)) return;
        const d = u.getAttribute("aria-label");
        c += d || Xn(u), h < a.length - 1 && (c += " ");
      });
      const l = _e(c, !0).trim();
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
      const a = o.map((l) => Xn(l)).join(" "), c = _e(a, !0).trim();
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
      const o = nn(s);
      if (o) return [{ language: "", plain: o }, !0];
    }
  } else if (i === "math") {
    const s = (t.getAttribute("alttext") ?? "").trim();
    if (s) return [{ language: "", plain: s }, !0];
  }
  return [null, !0];
}
const mf = {
  em: ["emphasis"],
  b: ["emphasis"],
  i: ["emphasis", { level: "reduced" }],
  strong: ["emphasis", { level: "strong" }],
  br: ["break"]
};
function yf(t) {
  return mf[t] ?? ["", void 0];
}
const bf = /* @__PURE__ */ new Set([
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
]), Sf = ["math", "separator"];
function Yn(t) {
  return t.role?.some((e) => Sf.includes(e)) ? !1 : !t.audioref && !t.imgref && !t.textref && !t.videoref && (!t.text || ct(t.text)) && !(t.children && t.children.length > 0) && !t.description;
}
function vf(t) {
  return !t.audioref && !t.imgref && !t.textref && !t.videoref && (!t.text || ct(t.text)) && !!(t.children && t.children.length > 0) && !(t.role && t.role.length > 0) && !t.id;
}
function wf(t) {
  return !(t.role && t.role.length > 0) && !t.id && !t.textref && !t.imgref && !t.audioref && !t.videoref;
}
class Et {
  el;
  object = {};
  children = [];
  noText = !1;
  finalize() {
    const e = this.object, n = [];
    for (const r of this.children) {
      const i = r.finalize();
      if (!Yn(i)) {
        if (vf(i)) {
          n.push(...i.children ?? []);
          continue;
        }
        n.push(i);
      }
    }
    if (n.length > 0 && (e.children = n), e.role?.length && e.children?.length === 1 && !e.role.includes("presentation")) {
      const r = e.children[0];
      r.role?.length && e.role.every((i) => r.role.includes(i)) && delete e.role;
    }
    if ((!e.text || ct(e.text)) && e.children?.length === 1) {
      const r = e.children[0];
      wf(r) && (r.text && (e.text = r.text), e.children = r.children);
    }
    return e;
  }
}
function Qn(t) {
  const e = {};
  t.id && (e.id = t.id), t.textref && (e.textref = t.textref), t.imgref && (e.imgref = t.imgref), t.audioref && (e.audioref = t.audioref), t.videoref && (e.videoref = t.videoref);
  const n = fd(t.text);
  return n !== void 0 && (e.text = n), t.role && t.role.length > 0 && (e.role = t.role), t.children && t.children.length > 0 && (e.children = t.children.map(Qn)), t.description && (e.description = t.description), e;
}
function Sa(t) {
  const e = {};
  return t.id && (e.id = t.id), t.textref && (e.textref = t.textref), t.imgref && (e.imgref = t.imgref), t.audioref && (e.audioref = t.audioref), t.videoref && (e.videoref = t.videoref), t.role && (e.role = t.role), t.description && (e.description = t.description), typeof t.text == "string" ? e.text = { plain: t.text, ssml: "", language: "" } : t.text && (e.text = { plain: t.text.plain ?? "", ssml: t.text.ssml ?? "", language: t.text.language }), t.children && (e.children = t.children.map(Sa)), e;
}
const xf = 1;
function Vi(t) {
  for (let e = t; e; e = e.parentElement) {
    const n = e.getAttribute("xml:lang");
    if (n) return n;
    const r = e.getAttribute("lang");
    if (r) return r;
  }
  return "";
}
function Ef(t) {
  for (let e = t.firstChild; e; e = e.nextSibling)
    if (e.nodeType === xf) return !0;
  return !1;
}
function va(t, e) {
  for (let n = e; n; n = n.parentElement)
    if (n === t) return !0;
  return !1;
}
const Cf = /* @__PURE__ */ new Set([
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
function kf(t) {
  return Cf.has(t);
}
function Of(t) {
  const e = t.slice(0, 500);
  return /<\?xml\b/.test(e) || /xmlns:epub=/.test(e) || /DOCTYPE\s+html\s+PUBLIC\s+"-\/\/W3C\/\/DTD XHTML/i.test(e) ? "application/xhtml+xml" : "text/html";
}
function wa(t) {
  return typeof t == "object" && t !== null && t.nodeType === Node.ELEMENT_NODE;
}
const ot = {
  NONE: "",
  DESCENDANT: " ",
  CHILD: " > "
}, $ = {
  id: "id",
  class: "class",
  tag: "tag",
  attribute: "attribute",
  nthchild: "nthchild",
  nthoftype: "nthoftype"
};
function Af(t, e) {
  return Object.values(t).includes(e);
}
const Tf = "CssSelectorGenerator";
function jt(t = "unknown problem", ...e) {
  console.warn(`${Tf}: ${t}`, ...e);
}
const Rf = {
  selectors: [
    $.id,
    $.class,
    $.tag,
    $.attribute
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
function Ge(t) {
  return !!t;
}
function Nf(t) {
  return Array.isArray(t) ? t.filter((e) => Af($, e)) : [];
}
function xa(t) {
  return t instanceof RegExp;
}
function Df(t) {
  return ["string", "function"].includes(typeof t) || xa(t);
}
function Mi(t) {
  return Array.isArray(t) ? t.filter(Df) : [];
}
function If(t) {
  return t != null && typeof t == "object" && "nodeType" in t && typeof t.nodeType == "number";
}
function Hi(t) {
  const e = [
    Node.DOCUMENT_NODE,
    Node.DOCUMENT_FRAGMENT_NODE,
    // this includes Shadow DOM root
    Node.ELEMENT_NODE
  ];
  return If(t) && e.includes(t.nodeType);
}
function Ea(t, e) {
  if (Hi(t))
    return t.contains(e) || jt("element root mismatch", "Provided root does not contain the element. This will most likely result in producing a fallback selector using element's real root node. If you plan to use the selector using provided root (e.g. `root.querySelector`), it will not work as intended."), t;
  const n = e.getRootNode({ composed: !1 });
  return Hi(n) ? (n.nodeType !== Node.DOCUMENT_NODE && jt("shadow root inferred", "You did not provide a root and the element is a child of Shadow DOM. This will produce a selector using ShadowRoot as a root. If you plan to use the selector using document as a root (e.g. `document.querySelector`), it will not work as intended."), n) : Sr(e);
}
function kn(t) {
  return typeof t == "number" ? t : Number.POSITIVE_INFINITY;
}
function Ff(t, e = {}) {
  const n = Object.assign(Object.assign({}, Rf), e);
  return {
    selectors: Nf(n.selectors),
    whitelist: Mi(n.whitelist),
    blacklist: Mi(n.blacklist),
    root: Ea(n.root, t),
    combineWithinSelector: Ge(n.combineWithinSelector),
    combineBetweenSelectors: Ge(n.combineBetweenSelectors),
    includeTag: Ge(n.includeTag),
    maxCombinations: kn(n.maxCombinations),
    maxCandidates: kn(n.maxCandidates),
    useScope: Ge(n.useScope),
    maxResults: kn(n.maxResults),
    ignoreGeneratedClassNames: Ge(n.ignoreGeneratedClassNames)
  };
}
function ut(t = []) {
  const [e = [], ...n] = t;
  return n.length === 0 ? e : n.reduce((r, i) => {
    const s = new Set(i);
    return r.filter((o) => s.has(o));
  }, e);
}
function Lf(t) {
  return [].concat(...t);
}
function Pf(t) {
  return t.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replace(/\*/g, ".+");
}
function Vt(t) {
  const e = t.map((n) => {
    if (xa(n))
      return (r) => n.test(r);
    if (typeof n == "function")
      return (r) => {
        const i = n(r);
        return typeof i != "boolean" ? (jt("pattern matcher function invalid", "Provided pattern matching function does not return boolean. It's result will be ignored.", n), !1) : i;
      };
    if (typeof n == "string") {
      const r = new RegExp("^" + Pf(n) + "$");
      return (i) => r.test(i);
    }
    return jt("pattern matcher invalid", "Pattern matching only accepts strings, regular expressions and/or functions. This item is invalid and will be ignored.", n), () => !1;
  });
  return (n) => e.some((r) => r(n));
}
function br(t, e, n) {
  const r = Ea(n, t[0]).querySelectorAll(e);
  if (r.length !== t.length)
    return !1;
  const i = new Set(r);
  return t.every((s) => i.has(s));
}
function Ca(t, e) {
  e = e ?? Sr(t);
  const n = [];
  let r = t;
  for (; r && r !== e; )
    wa(r) && n.push(r), r = r.parentNode;
  return n;
}
function $f(t, e) {
  return ut(t.map((n) => Ca(n, e)));
}
function _f(t) {
  return typeof t == "object" && t !== null && "nodeType" in t && t.nodeType === Node.DOCUMENT_FRAGMENT_NODE && "host" in t;
}
function Sr(t) {
  return t.ownerDocument.querySelector(":root");
}
const ka = ", ", Bf = new RegExp([
  "^$",
  // empty or not set
  "\\s"
  // contains whitespace
].join("|")), Uf = new RegExp([
  "^$"
  // empty or not set
].join("|")), Oa = [
  $.nthoftype,
  $.tag,
  $.id,
  $.class,
  $.attribute,
  $.nthchild
], qf = Vt([
  "class",
  "id",
  // Angular attributes
  "ng-*"
]);
function zf({ name: t }) {
  return `[${t}]`;
}
function jf({ name: t, value: e }) {
  return `[${t}='${e}']`;
}
function Vf({ nodeName: t, nodeValue: e }, n) {
  const r = n.tagName.toLowerCase();
  return ["input", "option"].includes(r) && t === "value" || t === "src" && e?.startsWith("data:") ? !1 : !qf(t);
}
function Mf({ nodeName: t, nodeValue: e }) {
  return {
    name: Be(t),
    value: Be(e ?? void 0)
  };
}
function Aa(t, e) {
  const n = Array.from(t.attributes).filter((r) => Vf(r, t)).map(Mf);
  return [
    ...n.map(zf),
    ...n.map(jf)
  ];
}
function Hf(t, e) {
  const n = t.map((r) => Aa(r));
  return ut(n);
}
const Wf = /^[a-z_-]{3,}$/i, Gf = /[bcdfghjklmnpqrstvwxyz]{4,}/i;
function Kf(t) {
  if (!Wf.test(t) || t.includes("_") && !t.includes("__") || /^(css|sc|jsx|emotion|makeStyles|MuiButton|MuiBox)-/i.test(t))
    return !1;
  const e = t.split(new RegExp("--|__|[-]|(?<=[a-z])(?=[A-Z])")).filter((n) => n.length > 0);
  if (e.length === 0 || e.length === 1 && e[0].length < 4)
    return !1;
  for (const n of e)
    if (n.length <= 2 || Gf.test(n))
      return !1;
  return !0;
}
function Ta(t, e) {
  var n;
  const r = ((n = t.getAttribute("class")) !== null && n !== void 0 ? n : "").trim().split(/\s+/).filter((s) => !Uf.test(s));
  let i = r;
  if (e?.ignoreGeneratedClassNames) {
    const s = Vt(e.whitelist);
    i = r.filter((o) => {
      const a = `.${Be(o)}`;
      return s(a) ? !0 : Kf(o);
    });
  }
  return i.map((s) => `.${Be(s)}`);
}
function Jf(t, e) {
  const n = t.map((r) => Ta(r, e));
  return ut(n);
}
function Ra(t, e) {
  var n;
  const r = (n = t.getAttribute("id")) !== null && n !== void 0 ? n : "", i = `#${Be(r)}`, s = t.getRootNode({ composed: !1 });
  return !Bf.test(r) && br([t], i, s) ? [i] : [];
}
function Xf(t, e) {
  return t.length === 0 || t.length > 1 ? [] : Ra(t[0]);
}
function Na(t, e) {
  const n = t.parentNode, r = n && "children" in n ? n.children : null;
  if (r) {
    for (let i = 0; i < r.length; i++)
      if (r[i] === t)
        return [`:nth-child(${String(i + 1)})`];
  }
  return [];
}
function Yf(t, e) {
  return ut(t.map((n) => Na(n)));
}
function Da(t, e) {
  return [
    Be(t.tagName.toLowerCase())
  ];
}
function Ia(t, e) {
  const n = [
    ...new Set(Lf(t.map((r) => Da(r))))
  ];
  return n.length === 0 || n.length > 1 ? [] : [n[0]];
}
function Fa(t, e) {
  const n = Ia([t])[0], r = t.parentNode, i = r && "children" in r ? r : null;
  if (i) {
    const o = Array.from(i.children).filter((a) => a.tagName.toLowerCase() === n).indexOf(t);
    if (o > -1)
      return [
        `${n}:nth-of-type(${String(o + 1)})`
      ];
  }
  return [];
}
function Qf(t, e) {
  return ut(t.map((n) => Fa(n)));
}
function* La(t = [], { maxResults: e = Number.POSITIVE_INFINITY } = {}) {
  let n = 0, r = Pa(1);
  for (; r.length <= t.length && n < e; ) {
    n += 1;
    const i = new Array(r.length);
    for (let s = 0; s < r.length; s++)
      i[s] = t[r[s]];
    yield i, r = eg(r, t.length - 1);
  }
}
function Zf(t = [], { maxResults: e = Number.POSITIVE_INFINITY } = {}) {
  return Array.from(La(t, { maxResults: e }));
}
function eg(t = [], e = 0) {
  const n = t.length;
  if (n === 0)
    return t;
  let r = n - 1;
  for (; r >= 0 && t[r] === e - (n - 1 - r); )
    r -= 1;
  if (r < 0)
    return Pa(n + 1);
  t[r] += 1;
  for (let i = r + 1; i < n; i++)
    t[i] = t[i - 1] + 1;
  return t;
}
function Pa(t = 1) {
  const e = new Array(t);
  for (let n = 0; n < t; n++)
    e[n] = n;
  return e;
}
function* tg(t = {}) {
  const e = Object.entries(t);
  if (e.length === 0)
    return;
  const n = [
    { index: e.length - 1, partial: {} }
  ];
  for (; n.length > 0; ) {
    const r = n.pop();
    if (!r)
      break;
    const { index: i, partial: s } = r;
    if (i < 0) {
      yield s;
      continue;
    }
    const [o, a] = e[i];
    for (let c = a.length - 1; c >= 0; c--)
      n.push({
        index: i - 1,
        partial: Object.assign(Object.assign({}, s), { [o]: a[c] })
      });
  }
}
const ng = "3a".toUpperCase(), rg = /[ !"#$%&'()[\]{|}<>*+,./;=?@^`~\\]/;
function Be(t = "") {
  return CSS ? CSS.escape(t) : ig(t);
}
function ig(t = "") {
  return t.split("").map((e) => e === ":" ? `\\${ng} ` : rg.test(e) ? `\\${e}` : escape(e).replace(/%/g, "\\")).join("");
}
const sg = {
  tag: Ia,
  id: Xf,
  class: Jf,
  attribute: Hf,
  nthchild: Yf,
  nthoftype: Qf
}, ag = {
  tag: Da,
  id: Ra,
  class: Ta,
  attribute: Aa,
  nthchild: Na,
  nthoftype: Fa
};
function og(t, e, n) {
  return ag[e](t, n);
}
function lg(t, e, n) {
  const r = sg[e];
  return r(t, n);
}
function cg(t = [], e, n) {
  return t.filter((r) => n(r) || !e(r));
}
function ug(t = [], e) {
  return t.sort((n, r) => {
    const i = e(n), s = e(r);
    return i && !s ? -1 : !i && s ? 1 : 0;
  });
}
function rn() {
  const t = /* @__PURE__ */ new Map();
  let e;
  return (n, r) => {
    if (n.length !== 1)
      return e ?? (e = Wi(n, r));
    const [i] = n;
    let s = t.get(i);
    return s || (s = Wi(n, r), t.set(i, s)), s;
  };
}
function* hg(t, e, n = rn()) {
  const r = /* @__PURE__ */ new Set(), i = n(t, e);
  for (const s of pg(i, e))
    r.has(s) || (r.add(s), yield s);
}
function Wi(t, e) {
  const { blacklist: n, whitelist: r, combineWithinSelector: i, maxCombinations: s } = e, o = Vt(n), a = Vt(r), c = (l, u) => {
    const h = lg(t, u, e), d = cg(h, o, a), g = ug(d, a);
    return l[u] = i ? Array.from(La(g, { maxResults: s })) : g.map((p) => [p]), l;
  };
  return dg(e).reduce(c, {});
}
function dg(t) {
  const { selectors: e, includeTag: n } = t, r = [...e];
  return n && !r.includes("tag") && r.push("tag"), r;
}
function fg(t) {
  return t.includes($.tag) || t.includes($.nthoftype) ? [...t] : [...t, $.tag];
}
function gg(t) {
  const { selectors: e, combineBetweenSelectors: n, includeTag: r, maxCandidates: i } = t, s = n ? Zf(e, { maxResults: i }) : e.map((o) => [o]);
  return r ? s.map(fg) : s;
}
function* pg(t, e) {
  for (const n of gg(e))
    yield* mg(n, t);
}
function* mg(t, e) {
  const n = {};
  for (const r of t) {
    const i = e[r];
    i && i.length > 0 && (n[r] = i);
  }
  for (const r of tg(n))
    yield bg(r);
}
function yg(t, e) {
  return e[t] ? e[t].join("") : "";
}
function bg(t = {}) {
  const e = [...Oa];
  return t[$.tag] && t[$.nthoftype] && e.splice(e.indexOf($.tag), 1), e.map((n) => yg(n, t)).join("");
}
function Sg(t, e) {
  return [
    ...t.map((n) => e + ot.DESCENDANT + n),
    ...t.map((n) => e + ot.CHILD + n)
  ];
}
function* vg(t, e) {
  if (e === "")
    yield* t;
  else
    for (const n of t)
      yield* Sg([n], e);
}
function* wg(t, e, n = "", r, i = rn()) {
  const s = hg(t, r, i);
  for (const o of vg(s, n))
    br(t, o, e) && (yield o);
}
function* xg(t, e, n = "", r, i = rn()) {
  if (t.length === 0)
    return null;
  const s = [
    t.length > 1 ? t : [],
    ...$f(t, e).map((o) => [o])
  ];
  for (const o of s)
    for (const a of wg(o, e, n, r, i))
      yield {
        foundElements: o,
        selector: a
      };
}
function* Eg({ elements: t, root: e, rootSelector: n = "", options: r }) {
  let i = e, s = n, o = !0;
  const a = rn();
  for (; o; ) {
    let c = !1;
    for (const l of xg(t, i, s, r, a)) {
      const { foundElements: u, selector: h } = l;
      if (c = !0, br(t, h, e))
        yield h;
      else {
        i = u[0], s = h;
        break;
      }
    }
    c || (o = !1);
  }
}
function Cg(t) {
  (t instanceof NodeList || t instanceof HTMLCollection) && (t = Array.from(t));
  const e = (Array.isArray(t) ? t : [t]).filter(wa);
  return [...new Set(e)];
}
function kg(t) {
  return {
    value: t,
    include: !1
  };
}
function Og(t, e, n = ot.NONE) {
  const r = {};
  return e.forEach((i) => {
    Reflect.set(r, i, og(t, i).map(kg));
  }), {
    element: t,
    operator: n,
    selectors: r
  };
}
function Ag({ selectors: t, operator: e }) {
  let n = [...Oa];
  t[$.tag] && t[$.nthoftype] && (n = n.filter((i) => i !== $.tag));
  let r = "";
  return n.forEach((i) => {
    var s;
    ((s = t[i]) !== null && s !== void 0 ? s : []).forEach(({ value: a, include: c }) => {
      c && (r += a);
    });
  }), e + r;
}
function Tg(t, e) {
  const n = Ca(t, e).reverse(), r = _f(e), i = n.map((o, a) => {
    var c;
    const l = Og(
      o,
      [$.nthchild],
      // do not use child combinator for the first element in ShadowRoot
      r && a === 0 ? ot.NONE : ot.CHILD
    );
    return ((c = l.selectors.nthchild) !== null && c !== void 0 ? c : []).forEach((u) => {
      u.include = !0;
    }), l;
  });
  return [r ? "" : e ? ":scope" : ":root", ...i.map(Ag)].join("");
}
function Rg(t, e) {
  return t.map((n) => Tg(n, e)).join(ka);
}
var Ng = function(t, e) {
  var n = {};
  for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && e.indexOf(r) < 0 && (n[r] = t[r]);
  if (t != null && typeof Object.getOwnPropertySymbols == "function")
    for (var i = 0, r = Object.getOwnPropertySymbols(t); i < r.length; i++)
      e.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(t, r[i]) && (n[r[i]] = t[r[i]]);
  return n;
};
function $a(t, e = {}) {
  const n = Object.assign(Object.assign({}, e), { maxResults: 1 });
  return Dg(t, n).next().value;
}
function* Dg(t, e = {}) {
  var n;
  const r = Cg(t), i = Ff(r[0], e), s = (n = i.root) !== null && n !== void 0 ? n : Sr(r[0]);
  let o = 0;
  for (const c of Eg({
    elements: r,
    options: i,
    root: s,
    rootSelector: ""
  }))
    if (yield c, o++, o >= i.maxResults)
      return;
  if (r.length > 1) {
    const { maxResults: c } = e, l = Ng(e, ["maxResults"]);
    if (yield r.map((u) => $a(u, l)).join(ka), o++, o >= i.maxResults)
      return;
  }
  const a = e.root !== void 0;
  yield Rg(r, i.useScope || a ? s : void 0);
}
function vr(t, e) {
  const n = t.getAttribute("id");
  return n ? `#${CSS.escape(n)}` : $a(t, { root: e?.documentElement ?? void 0 }) ?? void 0;
}
function _a(t) {
  if (t)
    return t.startsWith("#") ? t : yd(t);
}
const Ig = 3;
function Fg(t, e) {
  let n = 0;
  for (const r of Array.from(t.childNodes)) {
    if (r === e) return n;
    r.nodeType === Ig && n++;
  }
  return n;
}
function Gi(t, e, n, r) {
  const i = t.parentElement;
  if (!i) return;
  const s = r && i === r.el ? r.selector : vr(i, n);
  if (s)
    return { cssSelector: s, textNodeIndex: Fg(i, t), charOffset: e };
}
function Lg(t, e, n) {
  const r = Gi(...t.first, e, n);
  if (!r) return;
  const i = Gi(...t.last, e, n);
  return i ? { start: r, end: i } : { start: r };
}
function Pg(t) {
  const e = Mu(t);
  return e.status === he.SUCCESS ? e.fragment : void 0;
}
function Ki(t) {
  if (t === !0) return (e) => e.length > 0;
  if (Array.isArray(t) && t.length > 0) {
    const e = new Set(t);
    return (n) => n.some((r) => e.has(r));
  }
  return null;
}
function $g(t) {
  return !!t && typeof t == "object" && !Array.isArray(t);
}
function _g(t) {
  return $g(t) ? { predicate: Ki(t.roles), domRange: !!t.domRange, textFragment: !!t.textFragment } : { predicate: Ki(t), domRange: !1, textFragment: !1 };
}
class Bg {
  claimed = /* @__PURE__ */ new Set();
  counters = /* @__PURE__ */ new Map();
  // `isTaken` additionally excludes ids already in use elsewhere (e.g. a
  // real author-written id in the document) that this allocator has no way
  // of knowing about on its own.
  allocate(e, n) {
    for (; ; ) {
      const r = (this.counters.get(e) ?? 0) + 1;
      this.counters.set(e, r);
      const i = `${e}${r}`;
      if (!(n(i) || this.claimed.has(i)))
        return this.claimed.add(i), i;
    }
  }
  claim(e) {
    return this.claimed.has(e) ? !1 : (this.claimed.add(e), !0);
  }
}
function Ug(t, e, n) {
  const r = [], i = (s, o) => {
    const a = s.getAttribute("id");
    if (a && !e.has(a) && e.set(a, s), o = o || s.getAttribute("aria-hidden") === "true" || s.hasAttribute("hidden"), !o && s.tagName.toLowerCase() === "a" && Tt(s).includes("noteref")) {
      const l = s.getAttribute("href") ?? "";
      l.startsWith("#") && r.push({ id: l.slice(1), ref: s });
    }
    for (let c = s.firstElementChild; c; c = c.nextElementSibling) i(c, o);
  };
  i(t, !1);
  for (const s of r) {
    const o = e.get(s.id);
    o && (va(o, s.ref) || n.add(o));
  }
}
function qg(t, e, n, r) {
  const i = { role: r }, s = (e.getAttribute("title") ?? "").trim();
  s ? i.text = { plain: s, ssml: "", language: "" } : n && (i.text = { plain: n.plain ?? "", ssml: n.ssml ?? "", language: n.language });
  const o = !!(i.text && !ct(i.text)), a = !t.xmlParsed && (Ef(e) || o && e.firstChild !== null);
  if (!o && !a) {
    const u = nn(e);
    u && (i.text = { plain: u, ssml: "", language: "" });
  }
  const c = vr(e, t.docRoot), l = _a(c);
  return l && (i.textref = l), t.placeholder(e, "pagebreak", i), a;
}
function zg(t, e, n) {
  const r = { role: n }, i = nn(e);
  i && (r.text = { plain: i, ssml: "", language: "" });
  const s = e.getAttribute("href") ?? "";
  let o = e.getAttribute("id") ?? "";
  if (!o && s.startsWith("#") && (o = s.slice(1)), s.startsWith("#")) {
    const a = s.slice(1), c = t.ids.get(a);
    if (c && !va(c, e) && t.noterefDepth < 3) {
      const l = t.spawnChild(c);
      l.convert(c);
      const u = l.result();
      u.length > 0 && (r.children = u.map((h) => {
        const d = Sa(h);
        return delete d.id, d;
      }));
    }
  }
  !r.children && s && (r.children = [{ textref: s }]), t.placeholder(e, "noteref", r, o || void 0);
}
function jg(t, e, n, r) {
  const i = {};
  if (n.length > 0 && (i.role = n), r)
    i.text = { plain: r.plain ?? "", ssml: r.ssml ?? "", language: r.language };
  else {
    const o = nn(e);
    o && (i.text = { plain: o, ssml: "", language: "" });
  }
  const s = e.getAttribute("href");
  s && (i.textref = s), t.placeholder(e, n[0] ?? "link", i);
}
const Vg = 3, Mg = 1, Hg = /* @__PURE__ */ new Set(["summary", "dfn", "span"]);
function Ji(t, e) {
  return Hg.has(t) && e.length > 0 ? !0 : !kf(t);
}
class Mt {
  xmlParsed;
  ids = /* @__PURE__ */ new Map();
  suppressed = /* @__PURE__ */ new Set();
  idAlloc = new Bg();
  noterefDepth = 0;
  allowNode = null;
  selectorPredicate = null;
  // Only meaningful (and safe) when converting a live, already-rendered
  // element — see TextrefOptions.domRange in options.ts.
  domRangeEnabled = !1;
  // Unlike domRangeEnabled, safe against a detached parsed document too —
  // see TextrefOptions.textFragment in options.ts.
  textFragmentEnabled = !1;
  docRoot = null;
  root = new Et();
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
  spawnChild(e, n = 1) {
    const r = new Mt(this.xmlParsed);
    return r.ids = this.ids, r.suppressed = this.suppressed, r.idAlloc = this.idAlloc, r.noterefDepth = this.noterefDepth + n, r.allowNode = e, r.docRoot = this.docRoot, r.selectorPredicate = this.selectorPredicate, r.domRangeEnabled = this.domRangeEnabled, r.textFragmentEnabled = this.textFragmentEnabled, r;
  }
  prescan(e) {
    Ug(e, this.ids, this.suppressed);
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
    return !e.children || e.children.length === 0 ? Yn(e) ? [] : [Qn(e)] : e.children.map(Qn);
  }
  // An explicit-role descendant is content in its own right and skips
  // inherited `noText` — except `caption`, always the already-folded source.
  descend(e, n) {
    const r = new Et();
    r.el = e, r.noText = this.foldedCaptions.has(e) || (!ba(e) || n.includes("caption")) && this.current.noText, this.current.children.push(r), this.current = r;
  }
  appendChild(e) {
    e.noText = this.current.noText, this.current.children.push(e);
  }
  walk(e) {
    if (e.nodeType === Vg) {
      this.text(e);
      return;
    }
    if (e.nodeType !== Mg) return;
    const n = e, r = this.current, i = this.head(n);
    if (!i)
      for (let s = n.firstChild; s; s = s.nextSibling) this.walk(s);
    this.tail(n, i, r);
  }
  // Returns true if children should not be traversed (already handled
  // wholesale, invisible, or explicitly skipped).
  head(e) {
    const n = e.tagName.toLowerCase();
    if (bf.has(n) || this.suppressed.has(e) && e !== this.allowNode) return !0;
    const [r, i] = pf(e);
    if (!i && e !== this.allowNode) return !0;
    const s = Tt(e);
    if ((n === "img" || n === "svg") && (s.includes("presentation") || r === null && e.hasAttribute("alt") && e.getAttribute("alt").trim() === ""))
      return !0;
    if (n === "br")
      return this.current.noText || (this.closeSegment(), this.segments.push({ kind: "break" }), this.flowEndsWithSpace = !0), !0;
    if (s.includes("pagebreak"))
      return !qg(this, e, r, s);
    if (n === "a" && s.includes("noteref") && e.getAttribute("href"))
      return zg(this, e, s), !0;
    if (n === "a" && e.getAttribute("href"))
      return jg(this, e, s, r), !0;
    if (n === "img") {
      const c = { role: s }, l = e.getAttribute("src");
      return l && (c.imgref = l), r && (c.description = r.plain), this.placeholder(e, "image", c), !0;
    }
    if (n === "audio" || n === "video") {
      const c = { role: s };
      let l = e.getAttribute("src");
      if (!l) {
        const u = e.querySelector(":scope > source[src]");
        u && (l = u.getAttribute("src"));
      }
      return n === "audio" ? l && (c.audioref = l) : l && (c.videoref = l), r && (c.description = r.plain), this.placeholder(e, n, c), !0;
    }
    if (s.includes("image") || s.includes("math")) {
      const c = { role: s };
      return r && (c.description = r.plain), this.placeholder(e, s.includes("math") ? "math" : "image", c), !0;
    }
    if (!Ji(n, s))
      return !1;
    this.flushText(), this.descend(e, s);
    const o = this.current.object;
    if (s.length > 0 && (o.role = s), r)
      o.description = r.plain, s.includes("figure") && (this.current.noText = !0);
    else if (s.includes("figure")) {
      const c = this.implicitCaptionOf(e);
      if (c) {
        const l = ji(c);
        l && (o.description = l, this.current.noText = !0);
      }
    } else if (s.includes("table")) {
      const c = this.implicitCaptionOf(e);
      if (c) {
        const l = ji(c);
        l && (o.description = l, this.foldedCaptions.add(c));
      }
    }
    const a = e.getAttribute("id");
    return a && (o.id = a), !1;
  }
  // HTML-AAM implicit name: a table/figure with no explicit ARIA name folds
  // its native/ARIA caption child's text in as its own description instead
  // of speaking that child separately.
  implicitCaptionOf(e) {
    for (let n = e.firstElementChild; n; n = n.nextElementSibling)
      if (Tt(n).includes("caption") && !n.getAttribute("aria-labelledby")) return n;
    return null;
  }
  tail(e, n, r) {
    if (n) return;
    const i = e.tagName.toLowerCase(), s = Tt(e);
    Ji(i, s) && (this.flushText(), this.selectorPredicate?.(s) && this.applyTextref(e), this.current = r);
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
    const n = this.current.object, r = vr(e, this.docRoot);
    if (n.textref = _a(r), this.domRangeEnabled && this.lastFlowRange) {
      const i = r ? { el: e, selector: r } : void 0, s = Lg(this.lastFlowRange, this.docRoot, i);
      s && (n.textref = Sd(s));
    }
    if (this.textFragmentEnabled && this.lastFlowRange && this.docRoot) {
      const i = this.docRoot.createRange();
      i.setStart(...this.lastFlowRange.first), i.setEnd(...this.lastFlowRange.last);
      const s = Pg(i);
      s && (n.textref = `${n.textref ?? "#"}${ra(s)}`);
    }
  }
  text(e) {
    if (this.current.noText) return;
    const n = e.nodeValue ?? "";
    if (/^\s*$/.test(n)) {
      (this.textAcc.length > 0 || this.segments.length > 0) && (this.textAcc += _e(n, this.flowEndsWithSpace), this.updateFlowSpace());
      return;
    }
    const r = this.textContext(e);
    if (gd(r, this.currentCtx) || (this.closeSegment(), this.currentCtx = r), this.textAcc += _e(n, this.flowEndsWithSpace), this.updateFlowSpace(), this.domRangeEnabled || this.textFragmentEnabled) {
      const i = e;
      this.flowFirstNode === null && (this.flowFirstNode = i, this.flowFirstOffset = n.search(/\S/)), this.flowLastNode = i, this.flowLastOffset = n.length - (n.match(/\s+$/)?.[0].length ?? 0);
    }
  }
  textContext(e) {
    const n = { lang: Vi(e.parentElement), tag: "" };
    for (let r = e.parentElement; r && r !== this.current.el; r = r.parentElement) {
      const [i, s] = yf(r.tagName.toLowerCase());
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
    this.segments = [], this.textAcc = "", this.currentCtx = { lang: "", tag: "" }, this.flowEndsWithSpace = !0, this.pendingChildren = [], this.flowFirstNode = null, this.flowFirstOffset = 0, this.flowLastNode = null, this.flowLastOffset = 0;
  }
  placeholder(e, n, r, i) {
    if (Yn(r)) return;
    const s = new Et();
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
  flushText() {
    this.closeSegment();
    let e = this.segments;
    const n = this.pendingChildren, r = this.flowFirstNode, i = this.flowFirstOffset, s = this.flowLastNode, o = this.flowLastOffset;
    if (this.resetFlow(), this.lastFlowRange = null, this.lastFlowText = null, e.length === 0) return;
    for (; e.length > 0; ) {
      const S = e[0];
      if (S.kind === "break") {
        e = e.slice(1);
        continue;
      }
      if (S.kind === "text") {
        const w = S.text.replace(/^\s+/, "");
        if (w === "") {
          e = e.slice(1);
          continue;
        }
        e = [{ ...S, text: w }, ...e.slice(1)];
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
        const w = S.text.replace(/\s+$/, "");
        if (w === "") {
          e = e.slice(0, -1);
          continue;
        }
        e = [...e.slice(0, -1), { ...S, text: w }];
      }
      break;
    }
    if (!e.some((S) => S.kind === "text" && S.text.trim() !== "")) {
      for (const S of n) this.appendChild(S);
      return;
    }
    const c = [];
    for (const S of e)
      if (S.kind === "text" && S.text.trim() !== "") {
        const w = S.ctx.lang;
        c.includes(w) || c.push(w);
      }
    let l = Vi(this.current.el ?? null);
    c.length === 1 && c[0] !== "" && (l = c[0]);
    let u = !1;
    for (const S of e)
      if (S.kind !== "text" || S.ctx.tag !== "" || S.ctx.lang !== l) {
        u = !0;
        break;
      }
    if (u && l === "" && (l = "en"), u)
      for (const S of e) {
        if (S.kind !== "placeholder") continue;
        let w = S.candidateID;
        (!w || !this.idAlloc.claim(w)) && (w = this.idAlloc.allocate(S.tag, (T) => this.ids.has(T))), S.child.object.id = w;
      }
    let h = "", d = !1, g = !1, p = !1, m = !1;
    for (const S of e)
      if (S.kind === "text") {
        const w = S.text.startsWith(" "), T = S.text.replace(/^ +| +$/g, "");
        if (T === "") {
          m = !0;
          continue;
        }
        let I = !1;
        if (h.length > 0) {
          const P = d || m || w;
          g ? I = !0 : p ? I = P && !Yt(T) : I = P;
        }
        I && (h += " "), h += T, d = S.text.endsWith(" "), g = !1, p = !1, m = !1;
      } else S.kind === "break" ? g = !0 : S.kind === "placeholder" && (p = !0);
    const b = e.some((S) => S.kind === "placeholder");
    this.lastFlowText = h.trim();
    const x = {
      plain: u && !b ? "" : h.trim(),
      ssml: "",
      language: l
    };
    if (u) {
      let S = "";
      for (const w of e)
        if (w.kind === "text") {
          let T = w.ctx.tag, I = w.ctx.attrs;
          if (w.ctx.lang !== l && w.ctx.lang !== "" && (T = "lang", I = void 0), T) {
            S += `<${T}`;
            for (const [P, X] of Object.entries(I ?? {}))
              S += ` ${P}="${En(X)}"`;
            w.ctx.lang !== l && w.ctx.lang !== "" && (S += ` xml:lang="${En(w.ctx.lang)}"`), S += `>${zt(w.text)}</${T}>`;
          } else
            S += zt(w.text);
        } else w.kind === "break" ? S += "<break/>" : w.kind === "placeholder" && (S += `<readium:${w.tag} id="${En(w.child.object.id)}" />`);
      x.ssml = S;
    }
    const A = new Et();
    A.object = { text: x };
    for (const S of n)
      A.children.push(S);
    this.appendChild(A), r && s && (this.lastFlowRange = { first: [r, i], last: [s, o] });
  }
}
const Wg = /<body[\s>]/i;
function Gg(t, e, n) {
  const { predicate: r, domRange: i, textFragment: s } = _g(n?.textrefs);
  if (typeof t != "string") {
    const u = e ?? (t.ownerDocument.contentType === "text/html" ? "text/html" : "application/xhtml+xml"), h = new Mt(u === "application/xhtml+xml");
    return h.selectorPredicate = r, h.domRangeEnabled = i, h.textFragmentEnabled = s, h.docRoot = t.ownerDocument, h.convert(t), h.result();
  }
  const o = e ?? Of(t), a = new DOMParser().parseFromString(t, o), c = new Mt(o === "application/xhtml+xml");
  c.selectorPredicate = r, c.textFragmentEnabled = s, c.docRoot = a;
  const l = a.querySelector("body");
  return l && !Wg.test(t) ? c.convertChildren(l) : c.convert(l ?? a.documentElement), c.result();
}
function cp(t, e, n) {
  return { guided: Gg(t, e, n) };
}
export {
  Rh as BUILTIN_DECORATION_TYPES,
  zh as BooleanPreference,
  $h as DecorationController,
  kh as DecorationLayout,
  R as DecorationStyleType,
  Ch as DecorationWidth,
  Th as Decorator,
  Fh as DirectCommsChannel,
  Lh as DirectCommsFrame,
  Ph as DirectCommsHost,
  bt as EnumPreference,
  Qg as FallbackEngineProvider,
  bu as FallbackSpeechEngine,
  js as Locator,
  Ae as LocatorLocations,
  qs as LocatorText,
  Zt as Preference,
  St as RangePreference,
  Uh as ReadiumSpeechDecorationController,
  lp as ReadiumSpeechNavigator,
  ip as ReadiumSpeechProviderRegistry,
  qh as SpeechDefaults,
  it as SpeechPreferences,
  bi as SpeechPreferencesEditor,
  ys as SpeechServerAudioDecodeError,
  gu as SpeechServerEngine,
  Yg as SpeechServerEngineProvider,
  nt as SpeechServerError,
  bs as SpeechServerNetworkError,
  ms as SpeechServerStallError,
  Si as SpeechSettings,
  yi as StringArrayPreference,
  Wr as WebSpeechEngine,
  Xg as WebSpeechEngineProvider,
  L as WebSpeechVoiceManager,
  $d as blockLevelRoles,
  et as chineseVariantMap,
  Zc as chunkPlainText,
  tu as chunkSsmlText,
  Hh as contextualizationShapesAtVerbosity,
  Mh as contextualizedAtVerbosity,
  Bh as createLocator,
  bd as decodeCssSelectorFragment,
  vd as decodeDomRangeFragment,
  Ii as decodeTextref,
  Ih as decorationsEqual,
  ia as defaultContextualizations,
  yd as encodeCssSelectorFragment,
  Sd as encodeDomRangeFragment,
  op as extractUtterances,
  pu as isRecoverableFailure,
  cp as makeGnd,
  ps as mapServerVoice,
  ru as mimeTypeForFormat,
  Gg as parseMarkup,
  gi as resolveDecorationForWire,
  cu as selectBitrate,
  au as selectFormat,
  rp as setupDecorations,
  sp as shapeableRoles,
  ap as skippableRoles,
  Vh as skippedAtVerbosity,
  Nh as supportsDecorationStyle,
  Ye as toSpeechServerError
};
