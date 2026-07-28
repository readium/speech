const U = (t) => {
  if (!t) return ["", void 0];
  const e = t.replace(/_/g, "-");
  try {
    const r = new Intl.Locale(e);
    return [
      r.language.toLowerCase(),
      r.region?.toUpperCase()
    ];
  } catch {
    const r = e.split("-");
    return [
      r[0].toLowerCase(),
      r[1]?.toUpperCase()
    ];
  }
}, H = {
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
}, Ke = /* @__PURE__ */ new Map(), kn = /* @__PURE__ */ Object.assign({ "../../json/ar.json": () => import("./ar-CJhBAgKq.js"), "../../json/bg.json": () => import("./bg-JvP4LoOT.js"), "../../json/bho.json": () => import("./bho-CpuLBMN3.js"), "../../json/bn.json": () => import("./bn-84u93pMd.js"), "../../json/ca.json": () => import("./ca-DdScTbex.js"), "../../json/cmn.json": () => import("./cmn-Dd1zrvTE.js"), "../../json/cs.json": () => import("./cs-CDMne0uc.js"), "../../json/da.json": () => import("./da-oFf4cHgj.js"), "../../json/de.json": () => import("./de-Bjgc3bVq.js"), "../../json/el.json": () => import("./el-FkKIcghI.js"), "../../json/en.json": () => import("./en-BELFJRDQ.js"), "../../json/es.json": () => import("./es-nAmbEkcR.js"), "../../json/eu.json": () => import("./eu-DxWirHU-.js"), "../../json/fa.json": () => import("./fa-CTVUniYi.js"), "../../json/fi.json": () => import("./fi-Do6QFzRv.js"), "../../json/fr.json": () => import("./fr-B5-P9o29.js"), "../../json/gl.json": () => import("./gl-DqSXeC_F.js"), "../../json/he.json": () => import("./he-CpyNwgaH.js"), "../../json/hi.json": () => import("./hi-CeOBacbl.js"), "../../json/hr.json": () => import("./hr-CSpU18l6.js"), "../../json/hu.json": () => import("./hu-oONHmpR6.js"), "../../json/id.json": () => import("./id-BpZuB5Iw.js"), "../../json/it.json": () => import("./it-CM4X84UA.js"), "../../json/ja.json": () => import("./ja-e-iw3c4_.js"), "../../json/kk.json": () => import("./kk-BdLCAb2s.js"), "../../json/kn.json": () => import("./kn-BYRvouO5.js"), "../../json/ko.json": () => import("./ko-EIouMDK1.js"), "../../json/mr.json": () => import("./mr-DN-hwEV1.js"), "../../json/ms.json": () => import("./ms-B5E3oaWE.js"), "../../json/nb.json": () => import("./nb-DOw05HBh.js"), "../../json/nl.json": () => import("./nl-CEydw4A9.js"), "../../json/pl.json": () => import("./pl-Ivj_eAP7.js"), "../../json/pt.json": () => import("./pt-BPEGqRmW.js"), "../../json/ro.json": () => import("./ro-BQ617SOx.js"), "../../json/ru.json": () => import("./ru-Dieeph4H.js"), "../../json/sk.json": () => import("./sk-pEiOt4GQ.js"), "../../json/sl.json": () => import("./sl-Z6jWAR8J.js"), "../../json/sv.json": () => import("./sv-BT09piiZ.js"), "../../json/ta.json": () => import("./ta-B0YMGW5q.js"), "../../json/te.json": () => import("./te-ax-HNsAY.js"), "../../json/th.json": () => import("./th-C7Dbxwoz.js"), "../../json/tr.json": () => import("./tr-mipEichO.js"), "../../json/uk.json": () => import("./uk-CHdx7DHz.js"), "../../json/vi.json": () => import("./vi-DrlcEwAD.js"), "../../json/wuu.json": () => import("./wuu-C6uQvT6g.js"), "../../json/yue.json": () => import("./yue-CFroa59o.js") });
async function On(t) {
  try {
    const e = t.split("-")[0], r = kn[`../../json/${e}.json`];
    if (!r)
      throw new Error(`No voice data found for language: ${t}`);
    const i = (await r()).default;
    return {
      ...i,
      voices: i.voices.map(Cn)
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
function Mt(t) {
  return Ke.has(t) || Ke.set(t, On(t)), Ke.get(t);
}
const xn = ["veryLow", "low", "normal", "high", "veryHigh"], En = ["android", "apple"], Cn = (t) => ({
  ...t,
  quality: t.quality?.filter((e) => xn.includes(e)),
  localizedName: t.localizedName && En.includes(t.localizedName) ? t.localizedName : void 0
}), ke = {
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
}, D = (t) => {
  if (!t) return "";
  let e = t.toLowerCase().replace(/_/g, "-");
  if (/\w{2,3}-\w{2,3}/.test(e)) {
    const [r, n] = e.split("-");
    e = `${r.toLowerCase()}-${n.toUpperCase()}`;
  }
  return ke[e] || e;
}, gt = async (t) => {
  if (!t) return [];
  try {
    const e = D(t);
    try {
      const n = await Mt(e);
      if (n?.voices?.length)
        return n.voices;
    } catch (n) {
      console.warn(`Failed to load voices for ${e}:`, n);
    }
    const [r] = U(e);
    if (r !== e)
      try {
        const n = await Mt(r);
        if (n?.voices?.length)
          return n.voices;
      } catch (n) {
        console.warn(`Failed to load voices for base language ${r}:`, n);
      }
    return [];
  } catch (e) {
    return console.error(`Error in getVoices for ${t}:`, e), [];
  }
}, Vt = (t) => {
  if (!t) return "";
  try {
    const e = D(t), r = H[e];
    if (r?.testUtterance)
      return r.testUtterance;
    if (e in ke) {
      const i = ke[e];
      if (i && H[i]?.testUtterance)
        return H[i].testUtterance;
    }
    const [n] = U(e);
    return n !== e && H[n]?.testUtterance ? H[n].testUtterance : "";
  } catch (e) {
    return console.error(`Error in getTestUtterance for ${t}:`, e), "";
  }
}, De = (t) => {
  if (!t) return "";
  try {
    const e = D(t), r = H[e];
    if (r?.defaultRegion)
      return `${e}-${r.defaultRegion}`;
    if (e in ke) {
      const i = ke[e];
      if (i) {
        const s = H[i];
        if (s?.defaultRegion)
          return `${i}-${s.defaultRegion}`;
      }
    }
    const [n] = U(e);
    if (n !== e) {
      const i = H[n];
      if (i?.defaultRegion)
        return `${n}-${i.defaultRegion}`;
    }
    return "";
  } catch (e) {
    return console.error(`Failed to get default region for ${t}:`, e), "";
  }
}, Wt = (t) => {
  if (!t?.length) return [];
  const e = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
  for (const [i, s] of t.entries()) {
    if (!s) continue;
    const o = D(s), [a, c] = U(o);
    c && (e.add(c), n.has(c) || n.set(c, i)), r.has(a) || r.set(a, /* @__PURE__ */ new Set()), c && r.get(a).add(c);
  }
  return Array.from(r.entries()).map(([i, s]) => {
    const o = new Set(
      H[i]?.availableRegions || []
    ), a = Array.from(s), c = Array.from(e).filter(
      (h) => o.has(h) && !a.includes(h)
    ), l = Array.from(/* @__PURE__ */ new Set([...a, ...c])).sort((h, d) => {
      const g = n.get(h) ?? Number.MAX_SAFE_INTEGER, f = n.get(d) ?? Number.MAX_SAFE_INTEGER;
      return g - f;
    });
    if (l.length === 0) {
      const h = De(i), [, d] = U(h);
      d && l.push(d);
    }
    return {
      baseLang: i,
      regions: l
    };
  });
};
async function Te(t) {
  const e = /* @__PURE__ */ new Map();
  for (const n of t) {
    if (n.source !== "json") continue;
    const [i] = U(n.language);
    e.has(i) || e.set(i, []), e.get(i).push(n);
  }
  const r = /* @__PURE__ */ new Map();
  for (const [n, i] of e.entries()) {
    const s = /* @__PURE__ */ new Map(), o = await gt(n), a = /* @__PURE__ */ new Map();
    o.forEach((c, l) => {
      a.set(c.name.toLowerCase(), l), c.altNames?.forEach((h) => {
        a.set(h.toLowerCase(), l);
      });
    });
    for (const c of i) {
      const l = c.name.toLowerCase(), h = a.get(l);
      h !== void 0 && s.set(c.name, h);
    }
    s.size > 0 && r.set(n, s);
  }
  return r;
}
const An = [{ name: "Albert", nativeID: ["com.apple.speech.synthesis.voice.Albert"], note: "This novelty voice is part of a pack preloaded by Apple.", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Bad News", nativeID: ["com.apple.speech.synthesis.voice.BadNews"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Mauvaises nouvelles", "Malas noticias", "Brutte notizie"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Bahh", nativeID: ["com.apple.speech.synthesis.voice.Bahh"], note: "This novelty voice is part of a pack preloaded by Apple.", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Bells", nativeID: ["com.apple.speech.synthesis.voice.Bells"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Cloches", "Campanas", "Campane"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Boing", nativeID: ["com.apple.speech.synthesis.voice.Boing"], note: "This novelty voice is part of a pack preloaded by Apple.", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Bubbles", nativeID: ["com.apple.speech.synthesis.voice.Bubbles"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Bulles", "Burbujas", "Bollicine"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Cellos", nativeID: ["com.apple.speech.synthesis.voice.Cellos"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Violoncelles", "Violonchelos", "Violoncelli"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Good News", nativeID: ["com.apple.speech.synthesis.voice.GoodNews"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Bonnes nouvelles", "Buenas noticias", "Buone notizie"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Jester", nativeID: ["com.apple.speech.synthesis.voice.Hysterical"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Bouffon", "Bufón", "Giullare"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Organ", nativeID: ["com.apple.speech.synthesis.voice.Organ"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Orgue", "Órgano", "Organo"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Superstar", nativeID: ["com.apple.speech.synthesis.voice.Princess"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Superestrella"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Trinoids", nativeID: ["com.apple.speech.synthesis.voice.Trinoids"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Trinoïdes"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Whisper", nativeID: ["com.apple.speech.synthesis.voice.Whisper"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Murmure", "Susurro", "Sussurro"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Wobble", nativeID: ["com.apple.speech.synthesis.voice.Deranged"], note: "This novelty voice is part of a pack preloaded by Apple.", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Zarvox", nativeID: ["com.apple.speech.synthesis.voice.Zarvox"], note: "This novelty voice is part of a pack preloaded by Apple.", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }], Tn = {
  voices: An
}, Rn = [{ name: "Eddy", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Flo", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Grandma", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Grandpa", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Jacques", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Reed", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Rocko", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Sandy", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Shelley", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Fred", language: "en-US", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Junior", language: "en-US", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Kathy", language: "en-US", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Ralph", language: "en-US", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "eSpeak Arabic", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ar", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Bulgarian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "bg", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Bengali", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "bn", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Catalan", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ca", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Chinese (Mandarin, latin as English)", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "cmn", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Czech", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "cs", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Danish", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "da", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak German", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "de", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Greek", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "el", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Spanish (Spain)", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "es", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Estonian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "et", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Finnish", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "fi", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Gujarati", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "gu", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Croatian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "hr", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Hungarian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "hu", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Indonesian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "id", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Italian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "it", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Kannada", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "kn", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Korean", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ko", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Lithuanian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "lt", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Latvian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "lv", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Malayalm", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ml", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Marathi", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "mr", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Malay", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ms", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Norwegian Bokmål", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "nb", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Polish", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "pl", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Portuguese (Brazil)", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "pt-br", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Romanian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ro", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Russian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ru", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Slovak", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "sk", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Slovenian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "sl", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Serbian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "sv", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Swedish", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "sv", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Swahili", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "sw", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Tamil", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ta", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Telugu", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "te", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Turkish", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "tr", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Vietnamese (Northern)", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "vi", os: ["ChromeOS"], preloaded: !0 }], Nn = {
  voices: Rn
}, Ln = Tn, In = Nn, ft = (t, e) => Ln.voices.some(
  (r) => t.includes(r.name) || e && r.nativeID?.some((n) => e.includes(n)) || r.altNames?.some((n) => t.includes(n))
), pt = (t, e) => In.voices.some(
  (r) => t.includes(r.name)
) || e === "veryLow", Gt = (t) => t?.length ? t.filter((e) => !(e.isNovelty || ft(e.name, e.voiceURI))) : [], Kt = (t) => t?.length ? t.filter((e) => !pt(e.name, e.quality)) : [], qn = { ar: { normal: "محسن", high: "استثنائي" }, ca: { normal: "millorada", high: "prèmium" }, "cmn-CN": { normal: "优化音质", high: "高音质" }, "cmn-TW": { normal: "增強音質", high: "高音質" }, cs: { normal: "vylepšená verze", high: "prémiový" }, da: { normal: "forbedret", high: "høj kvalitet" }, de: { normal: "erweitert", high: "premium" }, el: { normal: "βελτιωμένη", high: "υψηλής ποιότητας" }, en: { normal: "Enhanced", high: "Premium" }, es: { normal: "mejorada", high: "premium" }, fi: { normal: "parannettu", high: "korkealaatuinen" }, fr: { normal: "premium", high: "de qualité" }, he: { normal: "משופר", high: "פרימיום" }, hi: { normal: "बेहतर", high: "प्रीमियम" }, hr: { normal: "poboljšani", high: "vrhunski" }, hu: { normal: "továbbfejlesztett", high: "prémium" }, id: { normal: "Ditingkatkan", high: "Premium" }, it: { normal: "ottimizzata", high: "premium" }, ja: { normal: "拡張", high: "プレミアム" }, ko: { normal: "고품질", high: "프리미엄" }, ms: { normal: "Dipertingkat", high: "Premium" }, nb: { normal: "forbedret", high: "premium" }, nl: { normal: "verbeterd", high: "premium" }, pl: { normal: "rozszerzony", high: "premium" }, pt: { normal: "melhorada", high: "premium" }, ro: { normal: "îmbunătățită", high: "premium" }, ru: { normal: "улучшенный", high: "высшее качество" }, sk: { normal: "vylepšený", high: "prémiový" }, sl: { normal: "izboljšano", high: "prvovrsten" }, sv: { normal: "förbättrad", high: "premium" }, th: { normal: "คุณภาพสูง", high: "คุณภาพสูง" }, tr: { normal: "Geliştirilmiş", high: "Yüksek Kaliteli" }, uk: { normal: "вдосконалений", high: "високої якості" }, vi: { normal: "Nâng cao", high: "Cao cấp" } }, Pn = {
  quality: qn
}, mt = {
  apple: Pn.quality
  // android: androidQualities.quality
}, $n = (t, e, r) => {
  if (!t) return;
  const n = Array.isArray(r) ? r : r ? [r] : [];
  for (const i of n)
    if (i && mt[i]) {
      const s = mt[i], o = U(e)[0], a = s[e] || s[o];
      if (a) {
        const c = t.toLowerCase(), { normal: l, high: h } = a;
        if (h && c.includes(h.toLowerCase()))
          return "high";
        if (l && c.includes(l.toLowerCase()))
          return "normal";
      }
    }
}, Dn = (t, e) => {
  const r = mt[e];
  if (r)
    for (const [n, { high: i, normal: s }] of Object.entries(r)) {
      const o = i && t.some((c) => c.includes(i)), a = s && t.some((c) => c.includes(s));
      if (o && a)
        return n;
    }
}, Bn = {
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
}, Jt = (t) => {
  if (!t) return;
  const r = t.toLowerCase().split(/[._-]/);
  for (const n of Object.values(Bn))
    if (n.values.some((i) => r.includes(i)))
      return n.quality;
};
function jn(t, e) {
  if (t.name === t.originalName) return t;
  if (e.name === e.originalName) return e;
  const r = [t.originalName, ...t.altNames || []], n = [e.originalName, ...e.altNames || []], i = r.findIndex((o) => n.includes(o)), s = n.findIndex((o) => r.includes(o));
  return i === -1 && s === -1 || i !== -1 && (s === -1 || i <= s) ? t : e;
}
function Un(t, e) {
  if (!t.altNames && !e.altNames)
    return !1;
  const r = t.originalName, n = e.originalName, i = t.altNames || [], s = e.altNames || [];
  return s.includes(r) || i.includes(n) ? !0 : i.filter((a) => s.includes(a)).length > 0;
}
class O {
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
    if (O.instance?.isInitialized) {
      const r = O.instance;
      return e?.languages && e.languages.length > 0 && await r.broadenLanguages(e.languages), r;
    }
    return O.initializationPromise || (O.initializationPromise = (async () => {
      try {
        const r = new O();
        O.instance = r, r.browserVoices = await r.getBrowserVoices(e?.maxTimeout, e?.interval), r.updateSystemLocale(r.browserVoices);
        let n = r.browserVoices;
        return e?.languages && e.languages.length > 0 ? (n = r.filterBrowserVoicesByLanguages(r.browserVoices, e.languages), r.scopedLanguages = O.toBaseLangSet(e.languages)) : r.scopedLanguages = null, r.voices = await r.parseToReadiumSpeechVoices(n), r.isInitialized = !0, r;
      } catch (r) {
        throw O.initializationPromise = null, console.error("Failed to initialize WebSpeechVoiceManager:", r), r;
      }
    })()), O.initializationPromise;
  }
  /**
   * Filter browser voices based on preferred languages
   * @private
   */
  filterBrowserVoicesByLanguages(e, r) {
    if (!r?.length) return e;
    const n = O.toBaseLangSet(r);
    return e.filter((i) => {
      if (!i?.lang) return !1;
      const s = D(i.lang), [o] = O.extractLangRegionFromBCP47(s);
      return n.has(o);
    });
  }
  /**
   * Extract base language codes (e.g. "en", "fr") from a list of BCP47 tags
   * @private
   */
  static toBaseLangSet(e) {
    return new Set(
      e.map((r) => {
        const n = D(r), [i] = O.extractLangRegionFromBCP47(n);
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
    const n = [...O.toBaseLangSet(e)].filter((a) => !this.scopedLanguages.has(a));
    if (n.length === 0) return;
    const i = n.filter((a) => this.broadenPromises.has(a)), s = n.filter((a) => !this.broadenPromises.has(a));
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
   * Get display name for a language code
   * @private
   */
  static getLanguageDisplayName(e, r) {
    try {
      return new Intl.DisplayNames(
        r ? [r] : [],
        { type: "language", languageDisplay: "standard" }
      ).of(e) || e.toUpperCase();
    } catch {
      return e.toUpperCase();
    }
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
    const r = /* @__PURE__ */ new Map();
    for (const n of e) {
      if (!n?.name || !n?.lang) continue;
      const i = `${n.lang.toLowerCase()}_${this.normalizeVoiceName(n.name)}`;
      r.set(i, (r.get(i) || 0) + 1);
    }
    return r;
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
    const r = e.map((i) => i.name), n = Dn(r, "apple");
    n && (this.systemLocale = n);
  }
  /**
   * Infer voice quality based on package, platform, JSON, or duplicate count
   * Returns null if quality cannot be determined
   * @private
   */
  inferVoiceQuality(e, r, n) {
    const i = e.voiceURI ? Jt(e.voiceURI) : void 0;
    if (i) return i;
    if (r?.nativeID && Array.isArray(r.nativeID))
      for (const s of r.nativeID) {
        const o = Jt(s);
        if (o) return o;
      }
    if (r?.localizedName && e.voiceURI && e.lang) {
      const s = $n(
        e.voiceURI,
        this.systemLocale,
        r.localizedName
      );
      if (s) return s;
    }
    if (r?.quality && r.quality.length > 0) {
      const s = Math.min(n - 1, r.quality.length - 1), o = r.quality[s];
      if (o)
        return o;
    }
    return null;
  }
  /**
   * Find matching JSON voice by name or alternative names
   * @private
   */
  findMatchingJsonVoice(e, r) {
    return e.find(
      (n) => this.normalizeVoiceName(n.name) === r || n.altNames?.some((i) => this.normalizeVoiceName(i) === r)
    );
  }
  /**
   * Remove duplicate voices, keeping the highest quality version of each voice
   * @param voices Array of voices to remove duplicates from
   * @returns Filtered array with duplicates removed, keeping only the highest quality versions
   */
  removeDuplicates(e) {
    const r = /* @__PURE__ */ new Map();
    for (const n of e) {
      const i = `${n.language.toLowerCase()}_${this.normalizeVoiceName(n.name)}`, s = r.get(i);
      if (!s)
        r.set(i, n);
      else if (Un(n, s)) {
        const o = jn(n, s);
        r.set(i, o);
      } else {
        const o = O.getQualityValue(s.quality);
        O.getQualityValue(n.quality) >= o && r.set(i, n);
      }
    }
    return Array.from(r.values());
  }
  /**
   * Get test utterance for a given language
   * @param language - Language code (e.g., "en", "fr", "es")
   * @returns Promise that resolves to the test utterance text
   */
  getTestUtterance(e) {
    if (!e) return "";
    const r = Vt(e);
    if (r) return r;
    const [n] = O.extractLangRegionFromBCP47(e);
    if (n && n !== e) {
      const i = Vt(n);
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
  getLanguages(e, r, n) {
    if (!n && !this.isInitialized)
      throw new Error("WebSpeechVoiceManager not initialized. Call initialize() first.");
    const i = n ?? this.voices, s = r ? this.filterVoices(r, i) : i, o = [], a = /* @__PURE__ */ new Set();
    for (const c of s) {
      const h = D(c.language).split("-")[0];
      if (!a.has(h)) {
        const d = O.getLanguageDisplayName(h, e), g = s.filter(
          (f) => D(f.language).split("-")[0] === h
        ).length;
        o.push({ code: h, label: d, count: g }), a.add(h);
      }
    }
    return n ? o : o.sort((c, l) => c.label.localeCompare(l.label));
  }
  /**
   * Get available regions with voice counts
   * @param localization Optional BCP 47 language tag to use for region names
   * @param filterOptions Optional filters to apply to voices before counting regions
   * @param voices Optional array of voices to count (defaults to this.voices)
   */
  getRegions(e, r, n) {
    if (!n && !this.isInitialized)
      throw new Error("WebSpeechVoiceManager not initialized. Call initialize() first.");
    const i = n ?? this.voices, s = r ? this.filterVoices(r, i) : i, o = [], a = /* @__PURE__ */ new Set(), c = /* @__PURE__ */ new Map();
    for (const l of s) {
      const [, h] = O.extractLangRegionFromBCP47(l.language);
      h && c.set(h, (c.get(h) || 0) + 1);
    }
    for (const l of s) {
      const [, h] = O.extractLangRegionFromBCP47(l.language);
      if (h && !a.has(h)) {
        let d = l.language;
        try {
          const g = e || navigator.language;
          d = new Intl.DisplayNames([g], { type: "region" }).of(h) || l.language;
        } catch (g) {
          console.warn(`Failed to get display name for region ${h}`, g);
        }
        o.push({
          code: h,
          label: d,
          count: c.get(h) || 0
        }), a.add(h);
      }
    }
    return n ? o : o.sort((l, h) => l.label.localeCompare(h.label));
  }
  /**
   * Get the default voice for language preferences
   * @param languages Array of preferred languages in order of preference, or a single language string
   * @param voices Optional pre-filtered voices array to use instead of fetching voices
   * @returns The default voice for the language, or null if no voices are available
   */
  async getDefaultVoice(e, r) {
    if (!e) return null;
    const n = Array.isArray(e) ? e : [e];
    let i = r || this.getVoices({ languages: n });
    return i.length ? (i = await this.sortVoicesByRegions(n, i), i[0]) : null;
  }
  getBrowserVoices(e = 1e4, r = 10) {
    const n = () => window.speechSynthesis?.getVoices() || [];
    if (!window.speechSynthesis)
      return Promise.resolve([]);
    const i = n();
    return Array.isArray(i) && i.length ? Promise.resolve(i) : new Promise((s, o) => {
      let a = Math.floor(e / r), c = !1;
      const l = () => {
        if (c) return;
        c = !0;
        const h = () => {
          if (a < 1) return s([]);
          --a;
          const d = n();
          if (Array.isArray(d) && d.length) return s(d);
          setTimeout(h, r);
        };
        setTimeout(h, r);
      };
      window.speechSynthesis.onvoiceschanged !== void 0 ? window.speechSynthesis.onvoiceschanged = () => {
        const h = n();
        Array.isArray(h) && h.length ? s(h) : l();
      } : l(), setTimeout(() => s([]), e);
    });
  }
  /**
   * Convert SpeechSynthesisVoice array to ReadiumSpeechVoice array
   * @private
   */
  async parseToReadiumSpeechVoices(e) {
    const r = this.countVoiceDuplicates(e);
    return await Promise.all(
      e.filter((i) => i?.name && i?.lang).map(async (i) => {
        const s = D(i.lang), [o] = O.extractLangRegionFromBCP47(s), a = this.normalizeVoiceName(i.name), c = `${i.lang.toLowerCase()}_${a}`, l = r.get(c) || 1;
        let h = await gt(s);
        (!h || h.length === 0) && (h = await gt(o));
        const d = this.findMatchingJsonVoice(h, a), g = this.inferVoiceQuality(i, d, l);
        return d ? {
          ...d,
          label: d.label ?? this.cleanVoiceName(i.name),
          source: "json",
          originalName: i.name,
          language: d.language ?? s,
          voiceURI: i.voiceURI,
          quality: g,
          isDefault: i.default || !1,
          offlineAvailability: i.localService || !1,
          isNovelty: ft(i.name, i.voiceURI),
          isLowQuality: pt(i.name, g)
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
          isNovelty: ft(i.name, i.voiceURI),
          isLowQuality: pt(i.name, g)
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
        (r) => r.voiceURI === e.voiceURI || r.name === e.originalName || this.normalizeVoiceName(r.name) === this.normalizeVoiceName(e.name)
      );
  }
  /**
   * Filter voices based on the provided options
   */
  filterVoices(e, r) {
    let n = r ? [...r] : [...this.voices];
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
      n = n.filter((o) => s.some((a) => {
        const c = a.toLowerCase(), l = o.language?.toLowerCase(), h = o.altLanguage?.toLowerCase();
        if (l === c || h === c)
          return !0;
        const [d] = c.split("-");
        return l && l.startsWith(d) || h && h.startsWith(d);
      }));
    }
    if (i.source && (n = n.filter((s) => s.source === i.source)), i.gender && (n = n.filter((s) => s.gender === i.gender)), i.quality) {
      const s = Array.isArray(i.quality) ? i.quality : [i.quality];
      n = n.filter((o) => o.quality && s.includes(o.quality));
    }
    return i.offlineOnly && (n = n.filter((s) => s.offlineAvailability === !0)), i.provider && (n = n.filter(
      (s) => s.provider?.toLowerCase() === i.provider?.toLowerCase()
    )), i.excludeNovelty && (n = Gt(n)), i.excludeVeryLowQuality && (n = Kt(n)), i.removeDuplicates && (n = this.removeDuplicates(n)), n;
  }
  /**
   * Filter out novelty voices
   * @param voices Array of voices to filter
   * @returns Filtered array with novelty voices removed
   */
  filterOutNoveltyVoices(e) {
    const r = e ?? this.voices;
    return Gt(r);
  }
  /**
   * Filter out very low quality voices
   * @param voices Array of voices to filter
   * @returns Filtered array with very low quality voices removed
   */
  filterOutVeryLowQualityVoices(e) {
    const r = e ?? this.voices;
    return Kt(r);
  }
  /**
  * Get the numeric value for a quality level
  * @param quality Quality level
  * @returns Numeric value (higher = better quality, 0 for undefined/null)
  */
  static getQualityValue(e) {
    return e ? {
      veryLow: 1,
      low: 2,
      normal: 3,
      high: 4,
      veryHigh: 5
    }[e] ?? 0 : 0;
  }
  /**
   * Sort two voices by quality, using JSON order as fallback for undefined/null quality
   * @param a First voice
   * @param b Second voice
   * @param jsonOrderMaps Optional map of language codes to voice order maps
   * @param baseLang Base language code to use for looking up the order map
   * @returns Comparison result (-1, 0, or 1)
   */
  static sortByQuality(e, r, n, i) {
    const s = O.getQualityValue(e.quality), o = O.getQualityValue(r.quality);
    if (n && i && e.source === "json" && r.source === "json") {
      const a = n.get(i);
      if (a) {
        const c = a.get(e.name), l = a.get(r.name);
        if (c !== void 0 && l !== void 0)
          return c - l;
      }
    }
    return o !== s ? o - s : e.name.localeCompare(r.name);
  }
  /**
   * Sort voices by quality, respecting JSON name order, then alphabetically for undefined/null quality
   * @param voices Array of voices to sort
   * @returns Sorted array of voices
   */
  async sortVoicesByQuality(e) {
    const r = e || this.voices;
    if (!r?.length) return [];
    const n = await Te(r);
    return [...r].sort((i, s) => O.sortByQuality(i, s, n));
  }
  /**
  * Group voices by language based on processed preferred languages
  */
  static groupVoicesByLanguage(e, r) {
    const n = new Map(r.map((o) => [o.baseLang, o])), i = /* @__PURE__ */ new Map(), s = [];
    for (const o of e) {
      const [a] = O.extractLangRegionFromBCP47(o.language);
      n.get(a) ? (i.has(a) || i.set(a, []), i.get(a).push(o)) : s.push(o);
    }
    return { voicesByLang: i, otherLangVoices: s };
  }
  /**
   * Sort regions by default then alphabetically, sort voices by quality
   */
  static async sortByDefaultRegion(e, r) {
    const n = await Te(e), i = De(r);
    e.sort((s, o) => {
      const [, a] = O.extractLangRegionFromBCP47(s.language), [, c] = O.extractLangRegionFromBCP47(o.language), l = i && a === i.split("-")[1], h = i && c === i.split("-")[1];
      return l && !h ? -1 : !l && h ? 1 : O.sortByQuality(s, o, n, r);
    });
  }
  /**
   * Sort voices alphabetically by language, then region, then quality
   */
  static async sortAlphabetically(e) {
    const r = await Te(e);
    e.sort((n, i) => {
      const [s] = O.extractLangRegionFromBCP47(n.language), [o] = O.extractLangRegionFromBCP47(i.language), a = O.getLanguageDisplayName(s).toLowerCase(), c = O.getLanguageDisplayName(o).toLowerCase(), l = a.localeCompare(c);
      if (l !== 0)
        return l;
      if (s === o) {
        const h = De(s), [, d] = O.extractLangRegionFromBCP47(n.language), [, g] = O.extractLangRegionFromBCP47(i.language), f = h && d === h.split("-")[1], y = h && g === h.split("-")[1];
        if (f && !y) return -1;
        if (!f && y) return 1;
        if (d && g) {
          const p = d.localeCompare(g);
          if (p !== 0)
            return p;
        }
        return d && !g ? -1 : !d && g ? 1 : O.sortByQuality(n, i, r, s);
      }
      return O.sortByQuality(n, i, r, s);
    });
  }
  /**
   * Sort voices by language preference, then alphabetically
   * @param voices Array of voices to sort
   * @param preferredLanguages Array of preferred language codes in order of preference
   * @returns Sorted array of voices
   */
  async sortVoicesByLanguages(e, r) {
    const n = r || this.voices;
    if (!n?.length) return [];
    if (!e?.length) {
      const c = [...n];
      return await O.sortAlphabetically(c), c;
    }
    const i = Wt(e), { voicesByLang: s, otherLangVoices: o } = O.groupVoicesByLanguage(n, i), a = [];
    for (const c of i) {
      const l = s.get(c.baseLang);
      l && (await O.sortByDefaultRegion(l, c.baseLang), a.push(...l));
    }
    return await O.sortAlphabetically(o), a.push(...o), a;
  }
  /**
   * Sort languages by region preference, then voices by quality
   */
  static async sortByPreferredRegion(e, r) {
    const n = await Te(e);
    e.sort((i, s) => {
      const [, o] = O.extractLangRegionFromBCP47(i.language), [, a] = O.extractLangRegionFromBCP47(s.language), c = o && r.regions.includes(o), l = a && r.regions.includes(a);
      if (c && l) {
        const y = r.regions.indexOf(o), p = r.regions.indexOf(a);
        return y === p ? O.sortByQuality(i, s, n, r.baseLang) : y - p;
      }
      if (c) return -1;
      if (l) return 1;
      const h = De(r.baseLang), [, d] = O.extractLangRegionFromBCP47(h), g = o === d, f = a === d;
      if (g && !f) return -1;
      if (!g && f) return 1;
      if (o && a) {
        const y = o.localeCompare(a);
        return y !== 0 ? y : O.sortByQuality(i, s, n, r.baseLang);
      }
      return o ? -1 : a ? 1 : O.sortByQuality(i, s, n, r.baseLang);
    });
  }
  /**
   * Sort voices by region preference, then alphabetically
   * @param voices Array of voices to sort
   * @param preferredLanguages Array of preferred language codes in order of preference
   * @returns Sorted array of voices
   */
  async sortVoicesByRegions(e, r) {
    const n = r || this.voices;
    if (!n?.length) return [];
    const i = Wt(e || []), { voicesByLang: s, otherLangVoices: o } = O.groupVoicesByLanguage(n, i), a = [];
    for (const c of i) {
      const l = s.get(c.baseLang);
      l && (await O.sortByPreferredRegion(l, c), a.push(...l));
    }
    return await O.sortAlphabetically(o), a.push(...o), a;
  }
  /**
   * Group voices by the specified criteria
   * @param voices Array of voices to group
   * @param options Grouping options
   * @returns Object with voice groups keyed by the grouping criteria
   */
  groupVoices(e, r) {
    const n = {}, i = r || this.voices;
    for (const s of i) {
      let o = "Unknown";
      switch (e) {
        case "languages":
          o = O.extractLangRegionFromBCP47(s.language)[0];
          break;
        case "gender":
          o = s.gender || "unknown";
          break;
        case "quality":
          o = s.quality || "unknown";
          break;
        case "region":
          const [, a] = O.extractLangRegionFromBCP47(s.language);
          o = a || "unknown";
          break;
      }
      n[o] || (n[o] = []), n[o].push(s);
    }
    return n;
  }
}
const zn = ["webKit", "moz", "ms", "o"], Hn = [
  "boundary",
  "end",
  "error",
  "mark",
  "pause",
  "resume",
  "start"
], _n = (t) => `${t.charAt(0).toUpperCase()}${t.slice(1)}`, ge = (t = {}, e) => Object.hasOwnProperty.call(t, e) || e in t || !!t[e], Fn = (t) => typeof window < "u" && t in window, Mn = (t) => {
  const e = _n(t), r = zn.map((i) => `${i}${e}`), n = [t, e].concat(r).find(Fn);
  return n && typeof window < "u" ? window[n] : void 0;
}, Vn = () => {
  const t = {};
  [
    "speechSynthesis",
    "speechSynthesisUtterance",
    "speechSynthesisVoice",
    "speechSynthesisEvent",
    "speechSynthesisErrorEvent"
  ].forEach((r) => {
    t[r] = Mn(r);
  }), t.onvoiceschanged = ge(t.speechSynthesis, "onvoiceschanged"), t.speechSynthesisSpeaking = ge(t.speechSynthesis, "speaking"), t.speechSynthesisPaused = ge(t.speechSynthesis, "paused");
  const e = t.speechSynthesisUtterance ? ge(t.speechSynthesisUtterance, "prototype") : !1;
  return Hn.forEach((r) => {
    const n = `on${r}`;
    t[n] = e && t.speechSynthesisUtterance ? ge(t.speechSynthesisUtterance.prototype, n) : !1;
  }), t;
}, Wn = () => {
  const e = typeof window < "u" && (window.navigator || {}).userAgent || "", r = () => /android/i.test(e), n = () => /kaios/i.test(e), i = () => typeof window.InstallTrigger < "u" ? !0 : /firefox/i.test(e), s = () => typeof window.GestureEvent < "u" || /safari/i.test(e);
  return {
    isAndroid: r(),
    isFirefox: i() || n(),
    isSafari: s(),
    isKaiOS: n()
  };
};
function Gn(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Je, Qt;
function Kn() {
  if (Qt) return Je;
  Qt = 1, Je = e;
  function t(n) {
    return n instanceof Buffer ? Buffer.from(n) : new n.constructor(n.buffer.slice(), n.byteOffset, n.length);
  }
  function e(n) {
    if (n = n || {}, n.circles) return r(n);
    const i = /* @__PURE__ */ new Map();
    if (i.set(Date, (l) => new Date(l)), i.set(Map, (l, h) => new Map(o(Array.from(l), h))), i.set(Set, (l, h) => new Set(o(Array.from(l), h))), n.constructorHandlers)
      for (const l of n.constructorHandlers)
        i.set(l[0], l[1]);
    let s = null;
    return n.proto ? c : a;
    function o(l, h) {
      const d = Object.keys(l), g = new Array(d.length);
      for (let f = 0; f < d.length; f++) {
        const y = d[f], p = l[y];
        typeof p != "object" || p === null ? g[y] = p : p.constructor !== Object && (s = i.get(p.constructor)) ? g[y] = s(p, h) : ArrayBuffer.isView(p) ? g[y] = t(p) : g[y] = h(p);
      }
      return g;
    }
    function a(l) {
      if (typeof l != "object" || l === null) return l;
      if (Array.isArray(l)) return o(l, a);
      if (l.constructor !== Object && (s = i.get(l.constructor)))
        return s(l, a);
      const h = {};
      for (const d in l) {
        if (Object.hasOwnProperty.call(l, d) === !1) continue;
        const g = l[d];
        typeof g != "object" || g === null ? h[d] = g : g.constructor !== Object && (s = i.get(g.constructor)) ? h[d] = s(g, a) : ArrayBuffer.isView(g) ? h[d] = t(g) : h[d] = a(g);
      }
      return h;
    }
    function c(l) {
      if (typeof l != "object" || l === null) return l;
      if (Array.isArray(l)) return o(l, c);
      if (l.constructor !== Object && (s = i.get(l.constructor)))
        return s(l, c);
      const h = {};
      for (const d in l) {
        const g = l[d];
        typeof g != "object" || g === null ? h[d] = g : g.constructor !== Object && (s = i.get(g.constructor)) ? h[d] = s(g, c) : ArrayBuffer.isView(g) ? h[d] = t(g) : h[d] = c(g);
      }
      return h;
    }
  }
  function r(n) {
    const i = [], s = [], o = /* @__PURE__ */ new Map();
    if (o.set(Date, (d) => new Date(d)), o.set(Map, (d, g) => new Map(c(Array.from(d), g))), o.set(Set, (d, g) => new Set(c(Array.from(d), g))), n.constructorHandlers)
      for (const d of n.constructorHandlers)
        o.set(d[0], d[1]);
    let a = null;
    return n.proto ? h : l;
    function c(d, g) {
      const f = Object.keys(d), y = new Array(f.length);
      for (let p = 0; p < f.length; p++) {
        const m = f[p], w = d[m];
        if (typeof w != "object" || w === null)
          y[m] = w;
        else if (w.constructor !== Object && (a = o.get(w.constructor)))
          y[m] = a(w, g);
        else if (ArrayBuffer.isView(w))
          y[m] = t(w);
        else {
          const E = i.indexOf(w);
          E !== -1 ? y[m] = s[E] : y[m] = g(w);
        }
      }
      return y;
    }
    function l(d) {
      if (typeof d != "object" || d === null) return d;
      if (Array.isArray(d)) return c(d, l);
      if (d.constructor !== Object && (a = o.get(d.constructor)))
        return a(d, l);
      const g = {};
      i.push(d), s.push(g);
      for (const f in d) {
        if (Object.hasOwnProperty.call(d, f) === !1) continue;
        const y = d[f];
        if (typeof y != "object" || y === null)
          g[f] = y;
        else if (y.constructor !== Object && (a = o.get(y.constructor)))
          g[f] = a(y, l);
        else if (ArrayBuffer.isView(y))
          g[f] = t(y);
        else {
          const p = i.indexOf(y);
          p !== -1 ? g[f] = s[p] : g[f] = l(y);
        }
      }
      return i.pop(), s.pop(), g;
    }
    function h(d) {
      if (typeof d != "object" || d === null) return d;
      if (Array.isArray(d)) return c(d, h);
      if (d.constructor !== Object && (a = o.get(d.constructor)))
        return a(d, h);
      const g = {};
      i.push(d), s.push(g);
      for (const f in d) {
        const y = d[f];
        if (typeof y != "object" || y === null)
          g[f] = y;
        else if (y.constructor !== Object && (a = o.get(y.constructor)))
          g[f] = a(y, h);
        else if (ArrayBuffer.isView(y))
          g[f] = t(y);
        else {
          const p = i.indexOf(y);
          p !== -1 ? g[f] = s[p] : g[f] = h(y);
        }
      }
      return i.pop(), s.pop(), g;
    }
  }
  return Je;
}
var Jn = Kn();
const Pr = /* @__PURE__ */ Gn(Jn);
Pr();
function yt(t) {
  if (t == null || typeof t != "object") return !1;
  let e = Object.getPrototypeOf(t);
  return e !== null && e !== Object.prototype && Object.getPrototypeOf(e) !== null ? !1 : !(Symbol.iterator in t) && !(Symbol.toStringTag in t);
}
function ee(t) {
  return typeof t == "string";
}
function Qn(t) {
  return Number.isFinite(t);
}
function X(t) {
  return Number.isSafeInteger(t) && t >= 0;
}
function M(t) {
  return t != null;
}
function Xn(t, e) {
  return yt(t) && ee(e) && e in t;
}
var Zn = typeof globalThis == "object" && globalThis && globalThis.Object === Object && globalThis, Yn = typeof self == "object" && self && self.Object === Object && self, It = Zn || Yn || Function("return this")(), se = It.Symbol, $r = Object.prototype, ei = $r.hasOwnProperty, ti = $r.toString, fe = se ? se.toStringTag : void 0;
function ri(t) {
  var e = ei.call(t, fe), r = t[fe];
  try {
    t[fe] = void 0;
    var n = !0;
  } catch {
  }
  var i = ti.call(t);
  return n && (e ? t[fe] = r : delete t[fe]), i;
}
var ni = Object.prototype, ii = ni.toString;
function si(t) {
  return ii.call(t);
}
var ai = "[object Null]", oi = "[object Undefined]", Xt = se ? se.toStringTag : void 0;
function Dr(t) {
  return t == null ? t === void 0 ? oi : ai : Xt && Xt in Object(t) ? ri(t) : si(t);
}
function Br(t) {
  return t != null && typeof t == "object";
}
var li = "[object Symbol]";
function ci(t) {
  return typeof t == "symbol" || Br(t) && Dr(t) == li;
}
function ui(t, e) {
  for (var r = -1, n = t == null ? 0 : t.length, i = Array(n); ++r < n; )
    i[r] = e(t[r], r, t);
  return i;
}
var hi = Array.isArray, Zt = se ? se.prototype : void 0, Yt = Zt ? Zt.toString : void 0;
function qt(t) {
  if (typeof t == "string")
    return t;
  if (hi(t))
    return ui(t, qt) + "";
  if (ci(t))
    return Yt ? Yt.call(t) : "";
  var e = t + "";
  return e == "0" && 1 / t == -1 / 0 ? "-0" : e;
}
var di = /\s/;
function gi(t) {
  for (var e = t.length; e-- && di.test(t.charAt(e)); )
    ;
  return e;
}
var fi = /^\s+/;
function pi(t) {
  return t && t.slice(0, gi(t) + 1).replace(fi, "");
}
function jr(t) {
  var e = typeof t;
  return t != null && (e == "object" || e == "function");
}
function Ur(t) {
  return t;
}
var mi = "[object AsyncFunction]", yi = "[object Function]", bi = "[object GeneratorFunction]", vi = "[object Proxy]";
function zr(t) {
  if (!jr(t))
    return !1;
  var e = Dr(t);
  return e == yi || e == bi || e == mi || e == vi;
}
var Qe = It["__core-js_shared__"], er = (function() {
  var t = /[^.]+$/.exec(Qe && Qe.keys && Qe.keys.IE_PROTO || "");
  return t ? "Symbol(src)_1." + t : "";
})();
function wi(t) {
  return !!er && er in t;
}
var Si = Function.prototype, ki = Si.toString;
function Oi(t) {
  if (t != null) {
    try {
      return ki.call(t);
    } catch {
    }
    try {
      return t + "";
    } catch {
    }
  }
  return "";
}
var xi = /[\\^$.*+?()[\]{}|]/g, Ei = /^\[object .+?Constructor\]$/, Ci = Function.prototype, Ai = Object.prototype, Ti = Ci.toString, Ri = Ai.hasOwnProperty, Ni = RegExp(
  "^" + Ti.call(Ri).replace(xi, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Li(t) {
  if (!jr(t) || wi(t))
    return !1;
  var e = zr(t) ? Ni : Ei;
  return e.test(Oi(t));
}
function Ii(t, e) {
  return t?.[e];
}
function Pt(t, e) {
  var r = Ii(t, e);
  return Li(r) ? r : void 0;
}
function qi(t, e, r) {
  switch (r.length) {
    case 0:
      return t.call(e);
    case 1:
      return t.call(e, r[0]);
    case 2:
      return t.call(e, r[0], r[1]);
    case 3:
      return t.call(e, r[0], r[1], r[2]);
  }
  return t.apply(e, r);
}
var Pi = 800, $i = 16, Di = Date.now;
function Bi(t) {
  var e = 0, r = 0;
  return function() {
    var n = Di(), i = $i - (n - r);
    if (r = n, i > 0) {
      if (++e >= Pi)
        return arguments[0];
    } else
      e = 0;
    return t.apply(void 0, arguments);
  };
}
function ji(t) {
  return function() {
    return t;
  };
}
var tr = (function() {
  try {
    var t = Pt(Object, "defineProperty");
    return t({}, "", {}), t;
  } catch {
  }
})(), Ui = tr ? function(t, e) {
  return tr(t, "toString", {
    configurable: !0,
    enumerable: !1,
    value: ji(e),
    writable: !0
  });
} : Ur, zi = Bi(Ui);
function Hi(t, e, r, n) {
  for (var i = t.length, s = r + -1; ++s < i; )
    if (e(t[s], s, t))
      return s;
  return -1;
}
function _i(t) {
  return t !== t;
}
function Fi(t, e, r) {
  for (var n = r - 1, i = t.length; ++n < i; )
    if (t[n] === e)
      return n;
  return -1;
}
function $t(t, e, r) {
  return e === e ? Fi(t, e, r) : Hi(t, _i, r);
}
function Mi(t, e) {
  var r = t == null ? 0 : t.length;
  return !!r && $t(t, e, 0) > -1;
}
function Vi(t, e) {
  return t === e || t !== t && e !== e;
}
var rr = Math.max;
function Wi(t, e, r) {
  return e = rr(e === void 0 ? t.length - 1 : e, 0), function() {
    for (var n = arguments, i = -1, s = rr(n.length - e, 0), o = Array(s); ++i < s; )
      o[i] = n[e + i];
    i = -1;
    for (var a = Array(e + 1); ++i < e; )
      a[i] = n[i];
    return a[e] = r(o), qi(t, this, a);
  };
}
function Gi(t, e) {
  return zi(Wi(t, e, Ur), t + "");
}
var Ki = 9007199254740991;
function Ji(t) {
  return typeof t == "number" && t > -1 && t % 1 == 0 && t <= Ki;
}
function Qi(t) {
  return t != null && Ji(t.length) && !zr(t);
}
var Oe = Pt(Object, "create");
function Xi() {
  this.__data__ = Oe ? Oe(null) : {}, this.size = 0;
}
function Zi(t) {
  var e = this.has(t) && delete this.__data__[t];
  return this.size -= e ? 1 : 0, e;
}
var Yi = "__lodash_hash_undefined__", es = Object.prototype, ts = es.hasOwnProperty;
function rs(t) {
  var e = this.__data__;
  if (Oe) {
    var r = e[t];
    return r === Yi ? void 0 : r;
  }
  return ts.call(e, t) ? e[t] : void 0;
}
var ns = Object.prototype, is = ns.hasOwnProperty;
function ss(t) {
  var e = this.__data__;
  return Oe ? e[t] !== void 0 : is.call(e, t);
}
var as = "__lodash_hash_undefined__";
function os(t, e) {
  var r = this.__data__;
  return this.size += this.has(t) ? 0 : 1, r[t] = Oe && e === void 0 ? as : e, this;
}
function K(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}
K.prototype.clear = Xi;
K.prototype.delete = Zi;
K.prototype.get = rs;
K.prototype.has = ss;
K.prototype.set = os;
function ls() {
  this.__data__ = [], this.size = 0;
}
function Me(t, e) {
  for (var r = t.length; r--; )
    if (Vi(t[r][0], e))
      return r;
  return -1;
}
var cs = Array.prototype, us = cs.splice;
function hs(t) {
  var e = this.__data__, r = Me(e, t);
  if (r < 0)
    return !1;
  var n = e.length - 1;
  return r == n ? e.pop() : us.call(e, r, 1), --this.size, !0;
}
function ds(t) {
  var e = this.__data__, r = Me(e, t);
  return r < 0 ? void 0 : e[r][1];
}
function gs(t) {
  return Me(this.__data__, t) > -1;
}
function fs(t, e) {
  var r = this.__data__, n = Me(r, t);
  return n < 0 ? (++this.size, r.push([t, e])) : r[n][1] = e, this;
}
function le(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}
le.prototype.clear = ls;
le.prototype.delete = hs;
le.prototype.get = ds;
le.prototype.has = gs;
le.prototype.set = fs;
var ps = Pt(It, "Map");
function ms() {
  this.size = 0, this.__data__ = {
    hash: new K(),
    map: new (ps || le)(),
    string: new K()
  };
}
function ys(t) {
  var e = typeof t;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? t !== "__proto__" : t === null;
}
function Ve(t, e) {
  var r = t.__data__;
  return ys(e) ? r[typeof e == "string" ? "string" : "hash"] : r.map;
}
function bs(t) {
  var e = Ve(this, t).delete(t);
  return this.size -= e ? 1 : 0, e;
}
function vs(t) {
  return Ve(this, t).get(t);
}
function ws(t) {
  return Ve(this, t).has(t);
}
function Ss(t, e) {
  var r = Ve(this, t), n = r.size;
  return r.set(t, e), this.size += r.size == n ? 0 : 1, this;
}
function ce(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}
ce.prototype.clear = ms;
ce.prototype.delete = bs;
ce.prototype.get = vs;
ce.prototype.has = ws;
ce.prototype.set = Ss;
function ks(t) {
  return t == null ? "" : qt(t);
}
function Os(t, e, r) {
  var n = -1, i = t.length;
  e < 0 && (e = -e > i ? 0 : i + e), r = r > i ? i : r, r < 0 && (r += i), i = e > r ? 0 : r - e >>> 0, e >>>= 0;
  for (var s = Array(i); ++n < i; )
    s[n] = t[n + e];
  return s;
}
function xs(t, e, r) {
  var n = t.length;
  return r = r === void 0 ? n : r, !e && r >= n ? t : Os(t, e, r);
}
var Es = "\\ud800-\\udfff", Cs = "\\u0300-\\u036f", As = "\\ufe20-\\ufe2f", Ts = "\\u20d0-\\u20ff", Rs = Cs + As + Ts, Ns = "\\ufe0e\\ufe0f", Ls = "\\u200d", Is = RegExp("[" + Ls + Es + Rs + Ns + "]");
function qs(t) {
  return Is.test(t);
}
function Ps(t) {
  return t.split("");
}
var Hr = "\\ud800-\\udfff", $s = "\\u0300-\\u036f", Ds = "\\ufe20-\\ufe2f", Bs = "\\u20d0-\\u20ff", js = $s + Ds + Bs, Us = "\\ufe0e\\ufe0f", zs = "[" + Hr + "]", bt = "[" + js + "]", vt = "\\ud83c[\\udffb-\\udfff]", Hs = "(?:" + bt + "|" + vt + ")", _r = "[^" + Hr + "]", Fr = "(?:\\ud83c[\\udde6-\\uddff]){2}", Mr = "[\\ud800-\\udbff][\\udc00-\\udfff]", _s = "\\u200d", Vr = Hs + "?", Wr = "[" + Us + "]?", Fs = "(?:" + _s + "(?:" + [_r, Fr, Mr].join("|") + ")" + Wr + Vr + ")*", Ms = Wr + Vr + Fs, Vs = "(?:" + [_r + bt + "?", bt, Fr, Mr, zs].join("|") + ")", Ws = RegExp(vt + "(?=" + vt + ")|" + Vs + Ms, "g");
function Gs(t) {
  return t.match(Ws) || [];
}
function nr(t) {
  return qs(t) ? Gs(t) : Ps(t);
}
var Ks = "__lodash_hash_undefined__";
function Js(t) {
  return this.__data__.set(t, Ks), this;
}
function Qs(t) {
  return this.__data__.has(t);
}
function je(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.__data__ = new ce(); ++e < r; )
    this.add(t[e]);
}
je.prototype.add = je.prototype.push = Js;
je.prototype.has = Qs;
function Xs(t, e) {
  return t.has(e);
}
function Zs(t) {
  return Br(t) && Qi(t);
}
var Ys = 200;
function ea(t, e, r, n) {
  var i = -1, s = Mi, o = !0, a = t.length, c = [], l = e.length;
  if (!a)
    return c;
  e.length >= Ys && (s = Xs, o = !1, e = new je(e));
  e:
    for (; ++i < a; ) {
      var h = t[i], d = h;
      if (h = h !== 0 ? h : 0, o && d === d) {
        for (var g = l; g--; )
          if (e[g] === d)
            continue e;
        c.push(h);
      } else s(e, d, n) || c.push(h);
    }
  return c;
}
function ta(t, e) {
  for (var r = t.length; r-- && $t(e, t[r], 0) > -1; )
    ;
  return r;
}
function ra(t, e) {
  for (var r = -1, n = t.length; ++r < n && $t(e, t[r], 0) > -1; )
    ;
  return r;
}
function ir(t, e, r) {
  if (t = ks(t), t && e === void 0)
    return pi(t);
  if (!t || !(e = qt(e)))
    return t;
  var n = nr(t), i = nr(e), s = ra(n, i), o = ta(n, i) + 1;
  return xs(n, s, o).join("");
}
var na = Gi(function(t, e) {
  return Zs(t) ? ea(t, e) : [];
}), ne = function() {
  return ne = Object.assign || function(t) {
    for (var e, r = 1, n = arguments.length; r < n; r++) {
      e = arguments[r];
      for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    }
    return t;
  }, ne.apply(this, arguments);
}, ia = "~", sa = "~~";
function Dt(t, e) {
  for (var r = {}, n = {}, i = t.split(sa), s = !1, o = 0; i.length > o; o++) {
    for (var a = i[o].split(ia), c = 0; c < a.length; c += 2) {
      var l = a[c], h = a[c + 1], d = "&" + l + ";";
      r[d] = h, s && (r["&" + l] = h), n[h] = d;
    }
    s = !0;
  }
  return e ? { entities: ne(ne({}, r), e.entities), characters: ne(ne({}, n), e.characters) } : { entities: r, characters: n };
}
var Xe = {
  xml: /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,
  html4: /&notin;|&(?:nbsp|iexcl|cent|pound|curren|yen|brvbar|sect|uml|copy|ordf|laquo|not|shy|reg|macr|deg|plusmn|sup2|sup3|acute|micro|para|middot|cedil|sup1|ordm|raquo|frac14|frac12|frac34|iquest|Agrave|Aacute|Acirc|Atilde|Auml|Aring|AElig|Ccedil|Egrave|Eacute|Ecirc|Euml|Igrave|Iacute|Icirc|Iuml|ETH|Ntilde|Ograve|Oacute|Ocirc|Otilde|Ouml|times|Oslash|Ugrave|Uacute|Ucirc|Uuml|Yacute|THORN|szlig|agrave|aacute|acirc|atilde|auml|aring|aelig|ccedil|egrave|eacute|ecirc|euml|igrave|iacute|icirc|iuml|eth|ntilde|ograve|oacute|ocirc|otilde|ouml|divide|oslash|ugrave|uacute|ucirc|uuml|yacute|thorn|yuml|quot|amp|lt|gt|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,
  html5: /&centerdot;|&copysr;|&divideontimes;|&gtcc;|&gtcir;|&gtdot;|&gtlPar;|&gtquest;|&gtrapprox;|&gtrarr;|&gtrdot;|&gtreqless;|&gtreqqless;|&gtrless;|&gtrsim;|&ltcc;|&ltcir;|&ltdot;|&lthree;|&ltimes;|&ltlarr;|&ltquest;|&ltrPar;|&ltri;|&ltrie;|&ltrif;|&notin;|&notinE;|&notindot;|&notinva;|&notinvb;|&notinvc;|&notni;|&notniva;|&notnivb;|&notnivc;|&parallel;|&timesb;|&timesbar;|&timesd;|&(?:AElig|AMP|Aacute|Acirc|Agrave|Aring|Atilde|Auml|COPY|Ccedil|ETH|Eacute|Ecirc|Egrave|Euml|GT|Iacute|Icirc|Igrave|Iuml|LT|Ntilde|Oacute|Ocirc|Ograve|Oslash|Otilde|Ouml|QUOT|REG|THORN|Uacute|Ucirc|Ugrave|Uuml|Yacute|aacute|acirc|acute|aelig|agrave|amp|aring|atilde|auml|brvbar|ccedil|cedil|cent|copy|curren|deg|divide|eacute|ecirc|egrave|eth|euml|frac12|frac14|frac34|gt|iacute|icirc|iexcl|igrave|iquest|iuml|laquo|lt|macr|micro|middot|nbsp|not|ntilde|oacute|ocirc|ograve|ordf|ordm|oslash|otilde|ouml|para|plusmn|pound|quot|raquo|reg|sect|shy|sup1|sup2|sup3|szlig|thorn|times|uacute|ucirc|ugrave|uml|uuml|yacute|yen|yuml|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g
}, ae = {};
ae.xml = Dt(`lt~<~gt~>~quot~"~apos~'~amp~&`);
ae.html4 = Dt(`apos~'~OElig~Œ~oelig~œ~Scaron~Š~scaron~š~Yuml~Ÿ~circ~ˆ~tilde~˜~ensp~ ~emsp~ ~thinsp~ ~zwnj~‌~zwj~‍~lrm~‎~rlm~‏~ndash~–~mdash~—~lsquo~‘~rsquo~’~sbquo~‚~ldquo~“~rdquo~”~bdquo~„~dagger~†~Dagger~‡~permil~‰~lsaquo~‹~rsaquo~›~euro~€~fnof~ƒ~Alpha~Α~Beta~Β~Gamma~Γ~Delta~Δ~Epsilon~Ε~Zeta~Ζ~Eta~Η~Theta~Θ~Iota~Ι~Kappa~Κ~Lambda~Λ~Mu~Μ~Nu~Ν~Xi~Ξ~Omicron~Ο~Pi~Π~Rho~Ρ~Sigma~Σ~Tau~Τ~Upsilon~Υ~Phi~Φ~Chi~Χ~Psi~Ψ~Omega~Ω~alpha~α~beta~β~gamma~γ~delta~δ~epsilon~ε~zeta~ζ~eta~η~theta~θ~iota~ι~kappa~κ~lambda~λ~mu~μ~nu~ν~xi~ξ~omicron~ο~pi~π~rho~ρ~sigmaf~ς~sigma~σ~tau~τ~upsilon~υ~phi~φ~chi~χ~psi~ψ~omega~ω~thetasym~ϑ~upsih~ϒ~piv~ϖ~bull~•~hellip~…~prime~′~Prime~″~oline~‾~frasl~⁄~weierp~℘~image~ℑ~real~ℜ~trade~™~alefsym~ℵ~larr~←~uarr~↑~rarr~→~darr~↓~harr~↔~crarr~↵~lArr~⇐~uArr~⇑~rArr~⇒~dArr~⇓~hArr~⇔~forall~∀~part~∂~exist~∃~empty~∅~nabla~∇~isin~∈~notin~∉~ni~∋~prod~∏~sum~∑~minus~−~lowast~∗~radic~√~prop~∝~infin~∞~ang~∠~and~∧~or~∨~cap~∩~cup~∪~int~∫~there4~∴~sim~∼~cong~≅~asymp~≈~ne~≠~equiv~≡~le~≤~ge~≥~sub~⊂~sup~⊃~nsub~⊄~sube~⊆~supe~⊇~oplus~⊕~otimes~⊗~perp~⊥~sdot~⋅~lceil~⌈~rceil~⌉~lfloor~⌊~rfloor~⌋~lang~〈~rang~〉~loz~◊~spades~♠~clubs~♣~hearts~♥~diams~♦~~nbsp~ ~iexcl~¡~cent~¢~pound~£~curren~¤~yen~¥~brvbar~¦~sect~§~uml~¨~copy~©~ordf~ª~laquo~«~not~¬~shy~­~reg~®~macr~¯~deg~°~plusmn~±~sup2~²~sup3~³~acute~´~micro~µ~para~¶~middot~·~cedil~¸~sup1~¹~ordm~º~raquo~»~frac14~¼~frac12~½~frac34~¾~iquest~¿~Agrave~À~Aacute~Á~Acirc~Â~Atilde~Ã~Auml~Ä~Aring~Å~AElig~Æ~Ccedil~Ç~Egrave~È~Eacute~É~Ecirc~Ê~Euml~Ë~Igrave~Ì~Iacute~Í~Icirc~Î~Iuml~Ï~ETH~Ð~Ntilde~Ñ~Ograve~Ò~Oacute~Ó~Ocirc~Ô~Otilde~Õ~Ouml~Ö~times~×~Oslash~Ø~Ugrave~Ù~Uacute~Ú~Ucirc~Û~Uuml~Ü~Yacute~Ý~THORN~Þ~szlig~ß~agrave~à~aacute~á~acirc~â~atilde~ã~auml~ä~aring~å~aelig~æ~ccedil~ç~egrave~è~eacute~é~ecirc~ê~euml~ë~igrave~ì~iacute~í~icirc~î~iuml~ï~eth~ð~ntilde~ñ~ograve~ò~oacute~ó~ocirc~ô~otilde~õ~ouml~ö~divide~÷~oslash~ø~ugrave~ù~uacute~ú~ucirc~û~uuml~ü~yacute~ý~thorn~þ~yuml~ÿ~quot~"~amp~&~lt~<~gt~>`);
ae.html5 = Dt('Abreve~Ă~Acy~А~Afr~𝔄~Amacr~Ā~And~⩓~Aogon~Ą~Aopf~𝔸~ApplyFunction~⁡~Ascr~𝒜~Assign~≔~Backslash~∖~Barv~⫧~Barwed~⌆~Bcy~Б~Because~∵~Bernoullis~ℬ~Bfr~𝔅~Bopf~𝔹~Breve~˘~Bscr~ℬ~Bumpeq~≎~CHcy~Ч~Cacute~Ć~Cap~⋒~CapitalDifferentialD~ⅅ~Cayleys~ℭ~Ccaron~Č~Ccirc~Ĉ~Cconint~∰~Cdot~Ċ~Cedilla~¸~CenterDot~·~Cfr~ℭ~CircleDot~⊙~CircleMinus~⊖~CirclePlus~⊕~CircleTimes~⊗~ClockwiseContourIntegral~∲~CloseCurlyDoubleQuote~”~CloseCurlyQuote~’~Colon~∷~Colone~⩴~Congruent~≡~Conint~∯~ContourIntegral~∮~Copf~ℂ~Coproduct~∐~CounterClockwiseContourIntegral~∳~Cross~⨯~Cscr~𝒞~Cup~⋓~CupCap~≍~DD~ⅅ~DDotrahd~⤑~DJcy~Ђ~DScy~Ѕ~DZcy~Џ~Darr~↡~Dashv~⫤~Dcaron~Ď~Dcy~Д~Del~∇~Dfr~𝔇~DiacriticalAcute~´~DiacriticalDot~˙~DiacriticalDoubleAcute~˝~DiacriticalGrave~`~DiacriticalTilde~˜~Diamond~⋄~DifferentialD~ⅆ~Dopf~𝔻~Dot~¨~DotDot~⃜~DotEqual~≐~DoubleContourIntegral~∯~DoubleDot~¨~DoubleDownArrow~⇓~DoubleLeftArrow~⇐~DoubleLeftRightArrow~⇔~DoubleLeftTee~⫤~DoubleLongLeftArrow~⟸~DoubleLongLeftRightArrow~⟺~DoubleLongRightArrow~⟹~DoubleRightArrow~⇒~DoubleRightTee~⊨~DoubleUpArrow~⇑~DoubleUpDownArrow~⇕~DoubleVerticalBar~∥~DownArrow~↓~DownArrowBar~⤓~DownArrowUpArrow~⇵~DownBreve~̑~DownLeftRightVector~⥐~DownLeftTeeVector~⥞~DownLeftVector~↽~DownLeftVectorBar~⥖~DownRightTeeVector~⥟~DownRightVector~⇁~DownRightVectorBar~⥗~DownTee~⊤~DownTeeArrow~↧~Downarrow~⇓~Dscr~𝒟~Dstrok~Đ~ENG~Ŋ~Ecaron~Ě~Ecy~Э~Edot~Ė~Efr~𝔈~Element~∈~Emacr~Ē~EmptySmallSquare~◻~EmptyVerySmallSquare~▫~Eogon~Ę~Eopf~𝔼~Equal~⩵~EqualTilde~≂~Equilibrium~⇌~Escr~ℰ~Esim~⩳~Exists~∃~ExponentialE~ⅇ~Fcy~Ф~Ffr~𝔉~FilledSmallSquare~◼~FilledVerySmallSquare~▪~Fopf~𝔽~ForAll~∀~Fouriertrf~ℱ~Fscr~ℱ~GJcy~Ѓ~Gammad~Ϝ~Gbreve~Ğ~Gcedil~Ģ~Gcirc~Ĝ~Gcy~Г~Gdot~Ġ~Gfr~𝔊~Gg~⋙~Gopf~𝔾~GreaterEqual~≥~GreaterEqualLess~⋛~GreaterFullEqual~≧~GreaterGreater~⪢~GreaterLess~≷~GreaterSlantEqual~⩾~GreaterTilde~≳~Gscr~𝒢~Gt~≫~HARDcy~Ъ~Hacek~ˇ~Hat~^~Hcirc~Ĥ~Hfr~ℌ~HilbertSpace~ℋ~Hopf~ℍ~HorizontalLine~─~Hscr~ℋ~Hstrok~Ħ~HumpDownHump~≎~HumpEqual~≏~IEcy~Е~IJlig~Ĳ~IOcy~Ё~Icy~И~Idot~İ~Ifr~ℑ~Im~ℑ~Imacr~Ī~ImaginaryI~ⅈ~Implies~⇒~Int~∬~Integral~∫~Intersection~⋂~InvisibleComma~⁣~InvisibleTimes~⁢~Iogon~Į~Iopf~𝕀~Iscr~ℐ~Itilde~Ĩ~Iukcy~І~Jcirc~Ĵ~Jcy~Й~Jfr~𝔍~Jopf~𝕁~Jscr~𝒥~Jsercy~Ј~Jukcy~Є~KHcy~Х~KJcy~Ќ~Kcedil~Ķ~Kcy~К~Kfr~𝔎~Kopf~𝕂~Kscr~𝒦~LJcy~Љ~Lacute~Ĺ~Lang~⟪~Laplacetrf~ℒ~Larr~↞~Lcaron~Ľ~Lcedil~Ļ~Lcy~Л~LeftAngleBracket~⟨~LeftArrow~←~LeftArrowBar~⇤~LeftArrowRightArrow~⇆~LeftCeiling~⌈~LeftDoubleBracket~⟦~LeftDownTeeVector~⥡~LeftDownVector~⇃~LeftDownVectorBar~⥙~LeftFloor~⌊~LeftRightArrow~↔~LeftRightVector~⥎~LeftTee~⊣~LeftTeeArrow~↤~LeftTeeVector~⥚~LeftTriangle~⊲~LeftTriangleBar~⧏~LeftTriangleEqual~⊴~LeftUpDownVector~⥑~LeftUpTeeVector~⥠~LeftUpVector~↿~LeftUpVectorBar~⥘~LeftVector~↼~LeftVectorBar~⥒~Leftarrow~⇐~Leftrightarrow~⇔~LessEqualGreater~⋚~LessFullEqual~≦~LessGreater~≶~LessLess~⪡~LessSlantEqual~⩽~LessTilde~≲~Lfr~𝔏~Ll~⋘~Lleftarrow~⇚~Lmidot~Ŀ~LongLeftArrow~⟵~LongLeftRightArrow~⟷~LongRightArrow~⟶~Longleftarrow~⟸~Longleftrightarrow~⟺~Longrightarrow~⟹~Lopf~𝕃~LowerLeftArrow~↙~LowerRightArrow~↘~Lscr~ℒ~Lsh~↰~Lstrok~Ł~Lt~≪~Map~⤅~Mcy~М~MediumSpace~ ~Mellintrf~ℳ~Mfr~𝔐~MinusPlus~∓~Mopf~𝕄~Mscr~ℳ~NJcy~Њ~Nacute~Ń~Ncaron~Ň~Ncedil~Ņ~Ncy~Н~NegativeMediumSpace~​~NegativeThickSpace~​~NegativeThinSpace~​~NegativeVeryThinSpace~​~NestedGreaterGreater~≫~NestedLessLess~≪~NewLine~\n~Nfr~𝔑~NoBreak~⁠~NonBreakingSpace~ ~Nopf~ℕ~Not~⫬~NotCongruent~≢~NotCupCap~≭~NotDoubleVerticalBar~∦~NotElement~∉~NotEqual~≠~NotEqualTilde~≂̸~NotExists~∄~NotGreater~≯~NotGreaterEqual~≱~NotGreaterFullEqual~≧̸~NotGreaterGreater~≫̸~NotGreaterLess~≹~NotGreaterSlantEqual~⩾̸~NotGreaterTilde~≵~NotHumpDownHump~≎̸~NotHumpEqual~≏̸~NotLeftTriangle~⋪~NotLeftTriangleBar~⧏̸~NotLeftTriangleEqual~⋬~NotLess~≮~NotLessEqual~≰~NotLessGreater~≸~NotLessLess~≪̸~NotLessSlantEqual~⩽̸~NotLessTilde~≴~NotNestedGreaterGreater~⪢̸~NotNestedLessLess~⪡̸~NotPrecedes~⊀~NotPrecedesEqual~⪯̸~NotPrecedesSlantEqual~⋠~NotReverseElement~∌~NotRightTriangle~⋫~NotRightTriangleBar~⧐̸~NotRightTriangleEqual~⋭~NotSquareSubset~⊏̸~NotSquareSubsetEqual~⋢~NotSquareSuperset~⊐̸~NotSquareSupersetEqual~⋣~NotSubset~⊂⃒~NotSubsetEqual~⊈~NotSucceeds~⊁~NotSucceedsEqual~⪰̸~NotSucceedsSlantEqual~⋡~NotSucceedsTilde~≿̸~NotSuperset~⊃⃒~NotSupersetEqual~⊉~NotTilde~≁~NotTildeEqual~≄~NotTildeFullEqual~≇~NotTildeTilde~≉~NotVerticalBar~∤~Nscr~𝒩~Ocy~О~Odblac~Ő~Ofr~𝔒~Omacr~Ō~Oopf~𝕆~OpenCurlyDoubleQuote~“~OpenCurlyQuote~‘~Or~⩔~Oscr~𝒪~Otimes~⨷~OverBar~‾~OverBrace~⏞~OverBracket~⎴~OverParenthesis~⏜~PartialD~∂~Pcy~П~Pfr~𝔓~PlusMinus~±~Poincareplane~ℌ~Popf~ℙ~Pr~⪻~Precedes~≺~PrecedesEqual~⪯~PrecedesSlantEqual~≼~PrecedesTilde~≾~Product~∏~Proportion~∷~Proportional~∝~Pscr~𝒫~Qfr~𝔔~Qopf~ℚ~Qscr~𝒬~RBarr~⤐~Racute~Ŕ~Rang~⟫~Rarr~↠~Rarrtl~⤖~Rcaron~Ř~Rcedil~Ŗ~Rcy~Р~Re~ℜ~ReverseElement~∋~ReverseEquilibrium~⇋~ReverseUpEquilibrium~⥯~Rfr~ℜ~RightAngleBracket~⟩~RightArrow~→~RightArrowBar~⇥~RightArrowLeftArrow~⇄~RightCeiling~⌉~RightDoubleBracket~⟧~RightDownTeeVector~⥝~RightDownVector~⇂~RightDownVectorBar~⥕~RightFloor~⌋~RightTee~⊢~RightTeeArrow~↦~RightTeeVector~⥛~RightTriangle~⊳~RightTriangleBar~⧐~RightTriangleEqual~⊵~RightUpDownVector~⥏~RightUpTeeVector~⥜~RightUpVector~↾~RightUpVectorBar~⥔~RightVector~⇀~RightVectorBar~⥓~Rightarrow~⇒~Ropf~ℝ~RoundImplies~⥰~Rrightarrow~⇛~Rscr~ℛ~Rsh~↱~RuleDelayed~⧴~SHCHcy~Щ~SHcy~Ш~SOFTcy~Ь~Sacute~Ś~Sc~⪼~Scedil~Ş~Scirc~Ŝ~Scy~С~Sfr~𝔖~ShortDownArrow~↓~ShortLeftArrow~←~ShortRightArrow~→~ShortUpArrow~↑~SmallCircle~∘~Sopf~𝕊~Sqrt~√~Square~□~SquareIntersection~⊓~SquareSubset~⊏~SquareSubsetEqual~⊑~SquareSuperset~⊐~SquareSupersetEqual~⊒~SquareUnion~⊔~Sscr~𝒮~Star~⋆~Sub~⋐~Subset~⋐~SubsetEqual~⊆~Succeeds~≻~SucceedsEqual~⪰~SucceedsSlantEqual~≽~SucceedsTilde~≿~SuchThat~∋~Sum~∑~Sup~⋑~Superset~⊃~SupersetEqual~⊇~Supset~⋑~TRADE~™~TSHcy~Ћ~TScy~Ц~Tab~	~Tcaron~Ť~Tcedil~Ţ~Tcy~Т~Tfr~𝔗~Therefore~∴~ThickSpace~  ~ThinSpace~ ~Tilde~∼~TildeEqual~≃~TildeFullEqual~≅~TildeTilde~≈~Topf~𝕋~TripleDot~⃛~Tscr~𝒯~Tstrok~Ŧ~Uarr~↟~Uarrocir~⥉~Ubrcy~Ў~Ubreve~Ŭ~Ucy~У~Udblac~Ű~Ufr~𝔘~Umacr~Ū~UnderBar~_~UnderBrace~⏟~UnderBracket~⎵~UnderParenthesis~⏝~Union~⋃~UnionPlus~⊎~Uogon~Ų~Uopf~𝕌~UpArrow~↑~UpArrowBar~⤒~UpArrowDownArrow~⇅~UpDownArrow~↕~UpEquilibrium~⥮~UpTee~⊥~UpTeeArrow~↥~Uparrow~⇑~Updownarrow~⇕~UpperLeftArrow~↖~UpperRightArrow~↗~Upsi~ϒ~Uring~Ů~Uscr~𝒰~Utilde~Ũ~VDash~⊫~Vbar~⫫~Vcy~В~Vdash~⊩~Vdashl~⫦~Vee~⋁~Verbar~‖~Vert~‖~VerticalBar~∣~VerticalLine~|~VerticalSeparator~❘~VerticalTilde~≀~VeryThinSpace~ ~Vfr~𝔙~Vopf~𝕍~Vscr~𝒱~Vvdash~⊪~Wcirc~Ŵ~Wedge~⋀~Wfr~𝔚~Wopf~𝕎~Wscr~𝒲~Xfr~𝔛~Xopf~𝕏~Xscr~𝒳~YAcy~Я~YIcy~Ї~YUcy~Ю~Ycirc~Ŷ~Ycy~Ы~Yfr~𝔜~Yopf~𝕐~Yscr~𝒴~ZHcy~Ж~Zacute~Ź~Zcaron~Ž~Zcy~З~Zdot~Ż~ZeroWidthSpace~​~Zfr~ℨ~Zopf~ℤ~Zscr~𝒵~abreve~ă~ac~∾~acE~∾̳~acd~∿~acy~а~af~⁡~afr~𝔞~aleph~ℵ~amacr~ā~amalg~⨿~andand~⩕~andd~⩜~andslope~⩘~andv~⩚~ange~⦤~angle~∠~angmsd~∡~angmsdaa~⦨~angmsdab~⦩~angmsdac~⦪~angmsdad~⦫~angmsdae~⦬~angmsdaf~⦭~angmsdag~⦮~angmsdah~⦯~angrt~∟~angrtvb~⊾~angrtvbd~⦝~angsph~∢~angst~Å~angzarr~⍼~aogon~ą~aopf~𝕒~ap~≈~apE~⩰~apacir~⩯~ape~≊~apid~≋~approx~≈~approxeq~≊~ascr~𝒶~ast~*~asympeq~≍~awconint~∳~awint~⨑~bNot~⫭~backcong~≌~backepsilon~϶~backprime~‵~backsim~∽~backsimeq~⋍~barvee~⊽~barwed~⌅~barwedge~⌅~bbrk~⎵~bbrktbrk~⎶~bcong~≌~bcy~б~becaus~∵~because~∵~bemptyv~⦰~bepsi~϶~bernou~ℬ~beth~ℶ~between~≬~bfr~𝔟~bigcap~⋂~bigcirc~◯~bigcup~⋃~bigodot~⨀~bigoplus~⨁~bigotimes~⨂~bigsqcup~⨆~bigstar~★~bigtriangledown~▽~bigtriangleup~△~biguplus~⨄~bigvee~⋁~bigwedge~⋀~bkarow~⤍~blacklozenge~⧫~blacksquare~▪~blacktriangle~▴~blacktriangledown~▾~blacktriangleleft~◂~blacktriangleright~▸~blank~␣~blk12~▒~blk14~░~blk34~▓~block~█~bne~=⃥~bnequiv~≡⃥~bnot~⌐~bopf~𝕓~bot~⊥~bottom~⊥~bowtie~⋈~boxDL~╗~boxDR~╔~boxDl~╖~boxDr~╓~boxH~═~boxHD~╦~boxHU~╩~boxHd~╤~boxHu~╧~boxUL~╝~boxUR~╚~boxUl~╜~boxUr~╙~boxV~║~boxVH~╬~boxVL~╣~boxVR~╠~boxVh~╫~boxVl~╢~boxVr~╟~boxbox~⧉~boxdL~╕~boxdR~╒~boxdl~┐~boxdr~┌~boxh~─~boxhD~╥~boxhU~╨~boxhd~┬~boxhu~┴~boxminus~⊟~boxplus~⊞~boxtimes~⊠~boxuL~╛~boxuR~╘~boxul~┘~boxur~└~boxv~│~boxvH~╪~boxvL~╡~boxvR~╞~boxvh~┼~boxvl~┤~boxvr~├~bprime~‵~breve~˘~bscr~𝒷~bsemi~⁏~bsim~∽~bsime~⋍~bsol~\\~bsolb~⧅~bsolhsub~⟈~bullet~•~bump~≎~bumpE~⪮~bumpe~≏~bumpeq~≏~cacute~ć~capand~⩄~capbrcup~⩉~capcap~⩋~capcup~⩇~capdot~⩀~caps~∩︀~caret~⁁~caron~ˇ~ccaps~⩍~ccaron~č~ccirc~ĉ~ccups~⩌~ccupssm~⩐~cdot~ċ~cemptyv~⦲~centerdot~·~cfr~𝔠~chcy~ч~check~✓~checkmark~✓~cir~○~cirE~⧃~circeq~≗~circlearrowleft~↺~circlearrowright~↻~circledR~®~circledS~Ⓢ~circledast~⊛~circledcirc~⊚~circleddash~⊝~cire~≗~cirfnint~⨐~cirmid~⫯~cirscir~⧂~clubsuit~♣~colon~:~colone~≔~coloneq~≔~comma~,~commat~@~comp~∁~compfn~∘~complement~∁~complexes~ℂ~congdot~⩭~conint~∮~copf~𝕔~coprod~∐~copysr~℗~cross~✗~cscr~𝒸~csub~⫏~csube~⫑~csup~⫐~csupe~⫒~ctdot~⋯~cudarrl~⤸~cudarrr~⤵~cuepr~⋞~cuesc~⋟~cularr~↶~cularrp~⤽~cupbrcap~⩈~cupcap~⩆~cupcup~⩊~cupdot~⊍~cupor~⩅~cups~∪︀~curarr~↷~curarrm~⤼~curlyeqprec~⋞~curlyeqsucc~⋟~curlyvee~⋎~curlywedge~⋏~curvearrowleft~↶~curvearrowright~↷~cuvee~⋎~cuwed~⋏~cwconint~∲~cwint~∱~cylcty~⌭~dHar~⥥~daleth~ℸ~dash~‐~dashv~⊣~dbkarow~⤏~dblac~˝~dcaron~ď~dcy~д~dd~ⅆ~ddagger~‡~ddarr~⇊~ddotseq~⩷~demptyv~⦱~dfisht~⥿~dfr~𝔡~dharl~⇃~dharr~⇂~diam~⋄~diamond~⋄~diamondsuit~♦~die~¨~digamma~ϝ~disin~⋲~div~÷~divideontimes~⋇~divonx~⋇~djcy~ђ~dlcorn~⌞~dlcrop~⌍~dollar~$~dopf~𝕕~dot~˙~doteq~≐~doteqdot~≑~dotminus~∸~dotplus~∔~dotsquare~⊡~doublebarwedge~⌆~downarrow~↓~downdownarrows~⇊~downharpoonleft~⇃~downharpoonright~⇂~drbkarow~⤐~drcorn~⌟~drcrop~⌌~dscr~𝒹~dscy~ѕ~dsol~⧶~dstrok~đ~dtdot~⋱~dtri~▿~dtrif~▾~duarr~⇵~duhar~⥯~dwangle~⦦~dzcy~џ~dzigrarr~⟿~eDDot~⩷~eDot~≑~easter~⩮~ecaron~ě~ecir~≖~ecolon~≕~ecy~э~edot~ė~ee~ⅇ~efDot~≒~efr~𝔢~eg~⪚~egs~⪖~egsdot~⪘~el~⪙~elinters~⏧~ell~ℓ~els~⪕~elsdot~⪗~emacr~ē~emptyset~∅~emptyv~∅~emsp13~ ~emsp14~ ~eng~ŋ~eogon~ę~eopf~𝕖~epar~⋕~eparsl~⧣~eplus~⩱~epsi~ε~epsiv~ϵ~eqcirc~≖~eqcolon~≕~eqsim~≂~eqslantgtr~⪖~eqslantless~⪕~equals~=~equest~≟~equivDD~⩸~eqvparsl~⧥~erDot~≓~erarr~⥱~escr~ℯ~esdot~≐~esim~≂~excl~!~expectation~ℰ~exponentiale~ⅇ~fallingdotseq~≒~fcy~ф~female~♀~ffilig~ﬃ~fflig~ﬀ~ffllig~ﬄ~ffr~𝔣~filig~ﬁ~fjlig~fj~flat~♭~fllig~ﬂ~fltns~▱~fopf~𝕗~fork~⋔~forkv~⫙~fpartint~⨍~frac13~⅓~frac15~⅕~frac16~⅙~frac18~⅛~frac23~⅔~frac25~⅖~frac35~⅗~frac38~⅜~frac45~⅘~frac56~⅚~frac58~⅝~frac78~⅞~frown~⌢~fscr~𝒻~gE~≧~gEl~⪌~gacute~ǵ~gammad~ϝ~gap~⪆~gbreve~ğ~gcirc~ĝ~gcy~г~gdot~ġ~gel~⋛~geq~≥~geqq~≧~geqslant~⩾~ges~⩾~gescc~⪩~gesdot~⪀~gesdoto~⪂~gesdotol~⪄~gesl~⋛︀~gesles~⪔~gfr~𝔤~gg~≫~ggg~⋙~gimel~ℷ~gjcy~ѓ~gl~≷~glE~⪒~gla~⪥~glj~⪤~gnE~≩~gnap~⪊~gnapprox~⪊~gne~⪈~gneq~⪈~gneqq~≩~gnsim~⋧~gopf~𝕘~grave~`~gscr~ℊ~gsim~≳~gsime~⪎~gsiml~⪐~gtcc~⪧~gtcir~⩺~gtdot~⋗~gtlPar~⦕~gtquest~⩼~gtrapprox~⪆~gtrarr~⥸~gtrdot~⋗~gtreqless~⋛~gtreqqless~⪌~gtrless~≷~gtrsim~≳~gvertneqq~≩︀~gvnE~≩︀~hairsp~ ~half~½~hamilt~ℋ~hardcy~ъ~harrcir~⥈~harrw~↭~hbar~ℏ~hcirc~ĥ~heartsuit~♥~hercon~⊹~hfr~𝔥~hksearow~⤥~hkswarow~⤦~hoarr~⇿~homtht~∻~hookleftarrow~↩~hookrightarrow~↪~hopf~𝕙~horbar~―~hscr~𝒽~hslash~ℏ~hstrok~ħ~hybull~⁃~hyphen~‐~ic~⁣~icy~и~iecy~е~iff~⇔~ifr~𝔦~ii~ⅈ~iiiint~⨌~iiint~∭~iinfin~⧜~iiota~℩~ijlig~ĳ~imacr~ī~imagline~ℐ~imagpart~ℑ~imath~ı~imof~⊷~imped~Ƶ~in~∈~incare~℅~infintie~⧝~inodot~ı~intcal~⊺~integers~ℤ~intercal~⊺~intlarhk~⨗~intprod~⨼~iocy~ё~iogon~į~iopf~𝕚~iprod~⨼~iscr~𝒾~isinE~⋹~isindot~⋵~isins~⋴~isinsv~⋳~isinv~∈~it~⁢~itilde~ĩ~iukcy~і~jcirc~ĵ~jcy~й~jfr~𝔧~jmath~ȷ~jopf~𝕛~jscr~𝒿~jsercy~ј~jukcy~є~kappav~ϰ~kcedil~ķ~kcy~к~kfr~𝔨~kgreen~ĸ~khcy~х~kjcy~ќ~kopf~𝕜~kscr~𝓀~lAarr~⇚~lAtail~⤛~lBarr~⤎~lE~≦~lEg~⪋~lHar~⥢~lacute~ĺ~laemptyv~⦴~lagran~ℒ~langd~⦑~langle~⟨~lap~⪅~larrb~⇤~larrbfs~⤟~larrfs~⤝~larrhk~↩~larrlp~↫~larrpl~⤹~larrsim~⥳~larrtl~↢~lat~⪫~latail~⤙~late~⪭~lates~⪭︀~lbarr~⤌~lbbrk~❲~lbrace~{~lbrack~[~lbrke~⦋~lbrksld~⦏~lbrkslu~⦍~lcaron~ľ~lcedil~ļ~lcub~{~lcy~л~ldca~⤶~ldquor~„~ldrdhar~⥧~ldrushar~⥋~ldsh~↲~leftarrow~←~leftarrowtail~↢~leftharpoondown~↽~leftharpoonup~↼~leftleftarrows~⇇~leftrightarrow~↔~leftrightarrows~⇆~leftrightharpoons~⇋~leftrightsquigarrow~↭~leftthreetimes~⋋~leg~⋚~leq~≤~leqq~≦~leqslant~⩽~les~⩽~lescc~⪨~lesdot~⩿~lesdoto~⪁~lesdotor~⪃~lesg~⋚︀~lesges~⪓~lessapprox~⪅~lessdot~⋖~lesseqgtr~⋚~lesseqqgtr~⪋~lessgtr~≶~lesssim~≲~lfisht~⥼~lfr~𝔩~lg~≶~lgE~⪑~lhard~↽~lharu~↼~lharul~⥪~lhblk~▄~ljcy~љ~ll~≪~llarr~⇇~llcorner~⌞~llhard~⥫~lltri~◺~lmidot~ŀ~lmoust~⎰~lmoustache~⎰~lnE~≨~lnap~⪉~lnapprox~⪉~lne~⪇~lneq~⪇~lneqq~≨~lnsim~⋦~loang~⟬~loarr~⇽~lobrk~⟦~longleftarrow~⟵~longleftrightarrow~⟷~longmapsto~⟼~longrightarrow~⟶~looparrowleft~↫~looparrowright~↬~lopar~⦅~lopf~𝕝~loplus~⨭~lotimes~⨴~lowbar~_~lozenge~◊~lozf~⧫~lpar~(~lparlt~⦓~lrarr~⇆~lrcorner~⌟~lrhar~⇋~lrhard~⥭~lrtri~⊿~lscr~𝓁~lsh~↰~lsim~≲~lsime~⪍~lsimg~⪏~lsqb~[~lsquor~‚~lstrok~ł~ltcc~⪦~ltcir~⩹~ltdot~⋖~lthree~⋋~ltimes~⋉~ltlarr~⥶~ltquest~⩻~ltrPar~⦖~ltri~◃~ltrie~⊴~ltrif~◂~lurdshar~⥊~luruhar~⥦~lvertneqq~≨︀~lvnE~≨︀~mDDot~∺~male~♂~malt~✠~maltese~✠~map~↦~mapsto~↦~mapstodown~↧~mapstoleft~↤~mapstoup~↥~marker~▮~mcomma~⨩~mcy~м~measuredangle~∡~mfr~𝔪~mho~℧~mid~∣~midast~*~midcir~⫰~minusb~⊟~minusd~∸~minusdu~⨪~mlcp~⫛~mldr~…~mnplus~∓~models~⊧~mopf~𝕞~mp~∓~mscr~𝓂~mstpos~∾~multimap~⊸~mumap~⊸~nGg~⋙̸~nGt~≫⃒~nGtv~≫̸~nLeftarrow~⇍~nLeftrightarrow~⇎~nLl~⋘̸~nLt~≪⃒~nLtv~≪̸~nRightarrow~⇏~nVDash~⊯~nVdash~⊮~nacute~ń~nang~∠⃒~nap~≉~napE~⩰̸~napid~≋̸~napos~ŉ~napprox~≉~natur~♮~natural~♮~naturals~ℕ~nbump~≎̸~nbumpe~≏̸~ncap~⩃~ncaron~ň~ncedil~ņ~ncong~≇~ncongdot~⩭̸~ncup~⩂~ncy~н~neArr~⇗~nearhk~⤤~nearr~↗~nearrow~↗~nedot~≐̸~nequiv~≢~nesear~⤨~nesim~≂̸~nexist~∄~nexists~∄~nfr~𝔫~ngE~≧̸~nge~≱~ngeq~≱~ngeqq~≧̸~ngeqslant~⩾̸~nges~⩾̸~ngsim~≵~ngt~≯~ngtr~≯~nhArr~⇎~nharr~↮~nhpar~⫲~nis~⋼~nisd~⋺~niv~∋~njcy~њ~nlArr~⇍~nlE~≦̸~nlarr~↚~nldr~‥~nle~≰~nleftarrow~↚~nleftrightarrow~↮~nleq~≰~nleqq~≦̸~nleqslant~⩽̸~nles~⩽̸~nless~≮~nlsim~≴~nlt~≮~nltri~⋪~nltrie~⋬~nmid~∤~nopf~𝕟~notinE~⋹̸~notindot~⋵̸~notinva~∉~notinvb~⋷~notinvc~⋶~notni~∌~notniva~∌~notnivb~⋾~notnivc~⋽~npar~∦~nparallel~∦~nparsl~⫽⃥~npart~∂̸~npolint~⨔~npr~⊀~nprcue~⋠~npre~⪯̸~nprec~⊀~npreceq~⪯̸~nrArr~⇏~nrarr~↛~nrarrc~⤳̸~nrarrw~↝̸~nrightarrow~↛~nrtri~⋫~nrtrie~⋭~nsc~⊁~nsccue~⋡~nsce~⪰̸~nscr~𝓃~nshortmid~∤~nshortparallel~∦~nsim~≁~nsime~≄~nsimeq~≄~nsmid~∤~nspar~∦~nsqsube~⋢~nsqsupe~⋣~nsubE~⫅̸~nsube~⊈~nsubset~⊂⃒~nsubseteq~⊈~nsubseteqq~⫅̸~nsucc~⊁~nsucceq~⪰̸~nsup~⊅~nsupE~⫆̸~nsupe~⊉~nsupset~⊃⃒~nsupseteq~⊉~nsupseteqq~⫆̸~ntgl~≹~ntlg~≸~ntriangleleft~⋪~ntrianglelefteq~⋬~ntriangleright~⋫~ntrianglerighteq~⋭~num~#~numero~№~numsp~ ~nvDash~⊭~nvHarr~⤄~nvap~≍⃒~nvdash~⊬~nvge~≥⃒~nvgt~>⃒~nvinfin~⧞~nvlArr~⤂~nvle~≤⃒~nvlt~<⃒~nvltrie~⊴⃒~nvrArr~⤃~nvrtrie~⊵⃒~nvsim~∼⃒~nwArr~⇖~nwarhk~⤣~nwarr~↖~nwarrow~↖~nwnear~⤧~oS~Ⓢ~oast~⊛~ocir~⊚~ocy~о~odash~⊝~odblac~ő~odiv~⨸~odot~⊙~odsold~⦼~ofcir~⦿~ofr~𝔬~ogon~˛~ogt~⧁~ohbar~⦵~ohm~Ω~oint~∮~olarr~↺~olcir~⦾~olcross~⦻~olt~⧀~omacr~ō~omid~⦶~ominus~⊖~oopf~𝕠~opar~⦷~operp~⦹~orarr~↻~ord~⩝~order~ℴ~orderof~ℴ~origof~⊶~oror~⩖~orslope~⩗~orv~⩛~oscr~ℴ~osol~⊘~otimesas~⨶~ovbar~⌽~par~∥~parallel~∥~parsim~⫳~parsl~⫽~pcy~п~percnt~%~period~.~pertenk~‱~pfr~𝔭~phiv~ϕ~phmmat~ℳ~phone~☎~pitchfork~⋔~planck~ℏ~planckh~ℎ~plankv~ℏ~plus~+~plusacir~⨣~plusb~⊞~pluscir~⨢~plusdo~∔~plusdu~⨥~pluse~⩲~plussim~⨦~plustwo~⨧~pm~±~pointint~⨕~popf~𝕡~pr~≺~prE~⪳~prap~⪷~prcue~≼~pre~⪯~prec~≺~precapprox~⪷~preccurlyeq~≼~preceq~⪯~precnapprox~⪹~precneqq~⪵~precnsim~⋨~precsim~≾~primes~ℙ~prnE~⪵~prnap~⪹~prnsim~⋨~profalar~⌮~profline~⌒~profsurf~⌓~propto~∝~prsim~≾~prurel~⊰~pscr~𝓅~puncsp~ ~qfr~𝔮~qint~⨌~qopf~𝕢~qprime~⁗~qscr~𝓆~quaternions~ℍ~quatint~⨖~quest~?~questeq~≟~rAarr~⇛~rAtail~⤜~rBarr~⤏~rHar~⥤~race~∽̱~racute~ŕ~raemptyv~⦳~rangd~⦒~range~⦥~rangle~⟩~rarrap~⥵~rarrb~⇥~rarrbfs~⤠~rarrc~⤳~rarrfs~⤞~rarrhk~↪~rarrlp~↬~rarrpl~⥅~rarrsim~⥴~rarrtl~↣~rarrw~↝~ratail~⤚~ratio~∶~rationals~ℚ~rbarr~⤍~rbbrk~❳~rbrace~}~rbrack~]~rbrke~⦌~rbrksld~⦎~rbrkslu~⦐~rcaron~ř~rcedil~ŗ~rcub~}~rcy~р~rdca~⤷~rdldhar~⥩~rdquor~”~rdsh~↳~realine~ℛ~realpart~ℜ~reals~ℝ~rect~▭~rfisht~⥽~rfr~𝔯~rhard~⇁~rharu~⇀~rharul~⥬~rhov~ϱ~rightarrow~→~rightarrowtail~↣~rightharpoondown~⇁~rightharpoonup~⇀~rightleftarrows~⇄~rightleftharpoons~⇌~rightrightarrows~⇉~rightsquigarrow~↝~rightthreetimes~⋌~ring~˚~risingdotseq~≓~rlarr~⇄~rlhar~⇌~rmoust~⎱~rmoustache~⎱~rnmid~⫮~roang~⟭~roarr~⇾~robrk~⟧~ropar~⦆~ropf~𝕣~roplus~⨮~rotimes~⨵~rpar~)~rpargt~⦔~rppolint~⨒~rrarr~⇉~rscr~𝓇~rsh~↱~rsqb~]~rsquor~’~rthree~⋌~rtimes~⋊~rtri~▹~rtrie~⊵~rtrif~▸~rtriltri~⧎~ruluhar~⥨~rx~℞~sacute~ś~sc~≻~scE~⪴~scap~⪸~sccue~≽~sce~⪰~scedil~ş~scirc~ŝ~scnE~⪶~scnap~⪺~scnsim~⋩~scpolint~⨓~scsim~≿~scy~с~sdotb~⊡~sdote~⩦~seArr~⇘~searhk~⤥~searr~↘~searrow~↘~semi~;~seswar~⤩~setminus~∖~setmn~∖~sext~✶~sfr~𝔰~sfrown~⌢~sharp~♯~shchcy~щ~shcy~ш~shortmid~∣~shortparallel~∥~sigmav~ς~simdot~⩪~sime~≃~simeq~≃~simg~⪞~simgE~⪠~siml~⪝~simlE~⪟~simne~≆~simplus~⨤~simrarr~⥲~slarr~←~smallsetminus~∖~smashp~⨳~smeparsl~⧤~smid~∣~smile~⌣~smt~⪪~smte~⪬~smtes~⪬︀~softcy~ь~sol~/~solb~⧄~solbar~⌿~sopf~𝕤~spadesuit~♠~spar~∥~sqcap~⊓~sqcaps~⊓︀~sqcup~⊔~sqcups~⊔︀~sqsub~⊏~sqsube~⊑~sqsubset~⊏~sqsubseteq~⊑~sqsup~⊐~sqsupe~⊒~sqsupset~⊐~sqsupseteq~⊒~squ~□~square~□~squarf~▪~squf~▪~srarr~→~sscr~𝓈~ssetmn~∖~ssmile~⌣~sstarf~⋆~star~☆~starf~★~straightepsilon~ϵ~straightphi~ϕ~strns~¯~subE~⫅~subdot~⪽~subedot~⫃~submult~⫁~subnE~⫋~subne~⊊~subplus~⪿~subrarr~⥹~subset~⊂~subseteq~⊆~subseteqq~⫅~subsetneq~⊊~subsetneqq~⫋~subsim~⫇~subsub~⫕~subsup~⫓~succ~≻~succapprox~⪸~succcurlyeq~≽~succeq~⪰~succnapprox~⪺~succneqq~⪶~succnsim~⋩~succsim~≿~sung~♪~supE~⫆~supdot~⪾~supdsub~⫘~supedot~⫄~suphsol~⟉~suphsub~⫗~suplarr~⥻~supmult~⫂~supnE~⫌~supne~⊋~supplus~⫀~supset~⊃~supseteq~⊇~supseteqq~⫆~supsetneq~⊋~supsetneqq~⫌~supsim~⫈~supsub~⫔~supsup~⫖~swArr~⇙~swarhk~⤦~swarr~↙~swarrow~↙~swnwar~⤪~target~⌖~tbrk~⎴~tcaron~ť~tcedil~ţ~tcy~т~tdot~⃛~telrec~⌕~tfr~𝔱~therefore~∴~thetav~ϑ~thickapprox~≈~thicksim~∼~thkap~≈~thksim~∼~timesb~⊠~timesbar~⨱~timesd~⨰~tint~∭~toea~⤨~top~⊤~topbot~⌶~topcir~⫱~topf~𝕥~topfork~⫚~tosa~⤩~tprime~‴~triangle~▵~triangledown~▿~triangleleft~◃~trianglelefteq~⊴~triangleq~≜~triangleright~▹~trianglerighteq~⊵~tridot~◬~trie~≜~triminus~⨺~triplus~⨹~trisb~⧍~tritime~⨻~trpezium~⏢~tscr~𝓉~tscy~ц~tshcy~ћ~tstrok~ŧ~twixt~≬~twoheadleftarrow~↞~twoheadrightarrow~↠~uHar~⥣~ubrcy~ў~ubreve~ŭ~ucy~у~udarr~⇅~udblac~ű~udhar~⥮~ufisht~⥾~ufr~𝔲~uharl~↿~uharr~↾~uhblk~▀~ulcorn~⌜~ulcorner~⌜~ulcrop~⌏~ultri~◸~umacr~ū~uogon~ų~uopf~𝕦~uparrow~↑~updownarrow~↕~upharpoonleft~↿~upharpoonright~↾~uplus~⊎~upsi~υ~upuparrows~⇈~urcorn~⌝~urcorner~⌝~urcrop~⌎~uring~ů~urtri~◹~uscr~𝓊~utdot~⋰~utilde~ũ~utri~▵~utrif~▴~uuarr~⇈~uwangle~⦧~vArr~⇕~vBar~⫨~vBarv~⫩~vDash~⊨~vangrt~⦜~varepsilon~ϵ~varkappa~ϰ~varnothing~∅~varphi~ϕ~varpi~ϖ~varpropto~∝~varr~↕~varrho~ϱ~varsigma~ς~varsubsetneq~⊊︀~varsubsetneqq~⫋︀~varsupsetneq~⊋︀~varsupsetneqq~⫌︀~vartheta~ϑ~vartriangleleft~⊲~vartriangleright~⊳~vcy~в~vdash~⊢~vee~∨~veebar~⊻~veeeq~≚~vellip~⋮~verbar~|~vert~|~vfr~𝔳~vltri~⊲~vnsub~⊂⃒~vnsup~⊃⃒~vopf~𝕧~vprop~∝~vrtri~⊳~vscr~𝓋~vsubnE~⫋︀~vsubne~⊊︀~vsupnE~⫌︀~vsupne~⊋︀~vzigzag~⦚~wcirc~ŵ~wedbar~⩟~wedge~∧~wedgeq~≙~wfr~𝔴~wopf~𝕨~wp~℘~wr~≀~wreath~≀~wscr~𝓌~xcap~⋂~xcirc~◯~xcup~⋃~xdtri~▽~xfr~𝔵~xhArr~⟺~xharr~⟷~xlArr~⟸~xlarr~⟵~xmap~⟼~xnis~⋻~xodot~⨀~xopf~𝕩~xoplus~⨁~xotime~⨂~xrArr~⟹~xrarr~⟶~xscr~𝓍~xsqcup~⨆~xuplus~⨄~xutri~△~xvee~⋁~xwedge~⋀~yacy~я~ycirc~ŷ~ycy~ы~yfr~𝔶~yicy~ї~yopf~𝕪~yscr~𝓎~yucy~ю~zacute~ź~zcaron~ž~zcy~з~zdot~ż~zeetrf~ℨ~zfr~𝔷~zhcy~ж~zigrarr~⇝~zopf~𝕫~zscr~𝓏~~AMP~&~COPY~©~GT~>~LT~<~QUOT~"~REG~®', ae.html4);
var aa = {
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
}, oa = String.fromCodePoint || function(t) {
  return String.fromCharCode(Math.floor((t - 65536) / 1024) + 55296, (t - 65536) % 1024 + 56320);
}, oe = function() {
  return oe = Object.assign || function(t) {
    for (var e, r = 1, n = arguments.length; r < n; r++) {
      e = arguments[r];
      for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    }
    return t;
  }, oe.apply(this, arguments);
}, la = oe(oe({}, ae), { all: ae.html5 }), ca = {
  scope: "body",
  level: "all"
}, Ze = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);/g, Ye = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+)[;=]?/g, sr = {
  xml: {
    strict: Ze,
    attribute: Ye,
    body: Xe.xml
  },
  html4: {
    strict: Ze,
    attribute: Ye,
    body: Xe.html4
  },
  html5: {
    strict: Ze,
    attribute: Ye,
    body: Xe.html5
  }
}, ua = oe(oe({}, sr), { all: sr.html5 }), Gr = String.fromCharCode, ha = Gr(65533);
function da(t, e, r, n) {
  var i = t, s = t[t.length - 1];
  if (r && s === "=")
    i = t;
  else if (n && s !== ";")
    i = t;
  else {
    var o = e[t];
    if (o)
      i = o;
    else if (t[0] === "&" && t[1] === "#") {
      var a = t[2], c = a == "x" || a == "X" ? parseInt(t.substr(3), 16) : parseInt(t.substr(2));
      i = c >= 1114111 ? ha : c > 65535 ? oa(c) : Gr(aa[c] || c);
    }
  }
  return i;
}
function ar(t, e) {
  var r = e === void 0 ? ca : e, n = r.level, i = n === void 0 ? "all" : n, s = r.scope, o = s === void 0 ? i === "xml" ? "strict" : "body" : s;
  if (!t)
    return "";
  var a = ua[i][o], c = la[i].entities, l = o === "attribute", h = o === "strict";
  return t.replace(a, function(d) {
    return da(d, c, l, h);
  });
}
var ga = { strictlyTwoElementsInRangeArrays: !1, progressFn: null };
function Ue(t, e) {
  if (!Array.isArray(t) || !t.length) return t;
  let r = { ...ga, ...e }, n, i;
  if (r.strictlyTwoElementsInRangeArrays && !t.every((a, c) => !Array.isArray(a) || a.length !== 2 ? (n = c, i = a.length, !1) : !0)) throw new TypeError(`ranges-sort: [THROW_ID_03] The first argument should be an array and must consist of arrays which are natural number indexes representing TWO string index ranges. However, ${n}th range (${JSON.stringify(t[n], null, 4)}) has not two but ${i} elements!`);
  if (!t.every((a, c) => !Array.isArray(a) || !Number.isInteger(a[0]) || a[0] < 0 || !Number.isInteger(a[1]) || a[1] < 0 ? (n = c, !1) : !0)) throw new TypeError(`ranges-sort: [THROW_ID_04] The first argument should be an array and must consist of arrays which are natural number indexes representing string index ranges. However, ${n}th range (${JSON.stringify(t[n], null, 4)}) does not consist of only natural numbers!`);
  let s = t.length ** 2, o = 0;
  return Array.from(t).sort((a, c) => (r.progressFn && (o += 1, r.progressFn(Math.floor(o * 100 / s))), a[0] === c[0] ? a[1] < c[1] ? -1 : a[1] > c[1] ? 1 : 0 : a[0] < c[0] ? -1 : 1));
}
var or = { mergeType: 1, progressFn: null, joinRangesThatTouchEdges: !0 };
function fa(t, e) {
  function r(l) {
    return !!l && typeof l == "object" && !Array.isArray(l);
  }
  if (!Array.isArray(t) || !t.length) return null;
  let n;
  if (e) if (r(e)) {
    if (n = { ...or, ...e }, n.progressFn && r(n.progressFn) && !Object.keys(n.progressFn).length) n.progressFn = null;
    else if (n.progressFn && typeof n.progressFn != "function") throw new Error(`ranges-merge: [THROW_ID_01] opts.progressFn must be a function! It was given of a type: "${typeof n.progressFn}", equal to ${JSON.stringify(n.progressFn, null, 4)}`);
    if (![1, 2, "1", "2"].includes(n.mergeType)) throw new Error(`ranges-merge: [THROW_ID_02] opts.mergeType was customised to a wrong thing! It was given of a type: "${typeof n.mergeType}", equal to ${JSON.stringify(n.mergeType, null, 4)}`);
    if (typeof n.joinRangesThatTouchEdges != "boolean") throw new Error(`ranges-merge: [THROW_ID_04] opts.joinRangesThatTouchEdges was customised to a wrong thing! It was given of a type: "${typeof n.joinRangesThatTouchEdges}", equal to ${JSON.stringify(n.joinRangesThatTouchEdges, null, 4)}`);
  } else throw new Error(`emlint: [THROW_ID_03] the second input argument must be a plain object. It was given as:
${JSON.stringify(e, null, 4)} (type ${typeof e})`);
  else n = { ...or };
  let i = t.filter((l) => Array.isArray(l)).map((l) => [...l]).filter((l) => l[2] !== void 0 || l[0] !== l[1]), s, o, a;
  n.progressFn ? s = Ue(i, { progressFn: (l) => {
    a = Math.floor(l / 5), a !== o && (o = a, n.progressFn(a));
  } }) : s = Ue(i);
  let c = s.length - 1;
  for (let l = c; l > 0; l--) n.progressFn && (a = Math.floor((1 - l / c) * 78) + 21, a !== o && a > o && (o = a, n.progressFn(a))), (s[l][0] <= s[l - 1][0] || !n.joinRangesThatTouchEdges && s[l][0] < s[l - 1][1] || n.joinRangesThatTouchEdges && s[l][0] <= s[l - 1][1]) && (s[l - 1][0] = Math.min(s[l][0], s[l - 1][0]), s[l - 1][1] = Math.max(s[l][1], s[l - 1][1]), s[l][2] !== void 0 && (s[l - 1][0] >= s[l][0] || s[l - 1][1] <= s[l][1]) && s[l - 1][2] !== null && (s[l][2] === null && s[l - 1][2] !== null ? s[l - 1][2] = null : s[l - 1][2] != null ? +n.mergeType == 2 && s[l - 1][0] === s[l][0] ? s[l - 1][2] = s[l][2] : s[l - 1][2] += s[l][2] : s[l - 1][2] = s[l][2]), s.splice(l, 1), l = s.length);
  return s.length ? s : null;
}
var pa = {}, ma = pa.NODE_ENV === "production", lr = "Invariant failed";
function ya(t, e) {
  if (!t) {
    if (ma)
      throw new Error(lr);
    var r = lr;
    throw new Error(r);
  }
}
function ba(t, e, r) {
  if (arguments.length === 0) throw new Error("ranges-apply: [THROW_ID_01] inputs missing!");
  if (typeof t != "string") throw new TypeError(`ranges-apply: [THROW_ID_02] first input argument must be a string! Currently it's: ${typeof t}, equal to: ${JSON.stringify(t, null, 4)}`);
  if (e && !Array.isArray(e)) throw new TypeError(`ranges-apply: [THROW_ID_03] second input argument must be an array (or null)! Currently it's: ${typeof e}, equal to: ${JSON.stringify(e, null, 4)}`);
  if (!e?.filter((o) => o).length) return t;
  let n;
  Array.isArray(e) && Number.isInteger(e[0]) && Number.isInteger(e[1]) ? n = [Array.from(e)] : n = Array.from(e), n.length, n.filter((o) => o).forEach((o, a) => {
    if (!Array.isArray(o)) throw new TypeError(`ranges-apply: [THROW_ID_05] ranges array, second input arg., has ${a}th element not an array: ${JSON.stringify(o, null, 4)}, which is ${typeof o}`);
    if (!Number.isInteger(o[0])) {
      if (!Number.isInteger(+o[0]) || +o[0] < 0) throw new TypeError(`ranges-apply: [THROW_ID_06] ranges array, second input arg. has ${a}th element, array ${JSON.stringify(o, null, 0)}. Its first element is not an integer, string index, but ${typeof o[0]}, equal to: ${JSON.stringify(o[0], null, 4)}.`);
      n[a][0] = +n[a][0];
    }
    if (!Number.isInteger(o[1])) {
      if (!Number.isInteger(+o[1]) || +o[1] < 0) throw new TypeError(`ranges-apply: [THROW_ID_07] ranges array, second input arg. has ${a}th element, array ${JSON.stringify(o, null, 0)}. Its second element is not an integer, string index, but ${typeof o[1]}, equal to: ${JSON.stringify(o[1], null, 4)}.`);
      n[a][1] = +n[a][1];
    }
  });
  let i = fa(n, { progressFn: (o) => {
  } });
  ya(i);
  let s = i.length;
  if (s > 0) {
    let o = t.slice(i[s - 1][1]);
    t = i.reduce((a, c, l, h) => {
      let d = l === 0 ? 0 : h[l - 1][1], g = h[l][0];
      return `${a}${t.slice(d, g)}${h[l][2] || ""}`;
    }, ""), t += o;
  }
  return t;
}
function et(t, e = 1) {
  let r = " ";
  function n(s) {
    return Array.from(s).reverse().join("");
  }
  function i(s, o, a) {
    let c = a ? `
` : "\r", l = a ? "\r" : `
`;
    if (!s) return s;
    let h = 0, d = "";
    for (let g = 0, f = s.length; g < f; g++) (s[g] === c || s[g] === l && s[g - 1] !== c) && h++, `\r
`.includes(s[g]) || s[g] === r ? s[g] === r ? d += s[g] : s[g] === c ? h <= o && (d += s[g], s[g + 1] === l && (d += s[g + 1], g++)) : s[g] === l && s?.[g - 1] !== c && h <= o && (d += s[g]) : !s[g + 1] && !h && (d += " ");
    return d;
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
    if (t.trim() && (t.slice(-1).trim() === "" || t.slice(-1) === r)) {
      for (let c = t.length; c--; ) if (t[c].trim()) {
        a = t.slice(c + 1);
        break;
      }
    }
    return `${i(o, s, !1)}${t.trim()}${n(i(n(a), s, !0))}`;
  }
  return t;
}
var cr = { mergeType: 1, progressFn: null, joinRangesThatTouchEdges: !0 };
function va(t, e) {
  function r(l) {
    return !!l && typeof l == "object" && !Array.isArray(l);
  }
  if (!Array.isArray(t) || !t.length) return null;
  let n;
  if (e) if (r(e)) {
    if (n = { ...cr, ...e }, n.progressFn && r(n.progressFn) && !Object.keys(n.progressFn).length) n.progressFn = null;
    else if (n.progressFn && typeof n.progressFn != "function") throw new Error(`ranges-merge: [THROW_ID_01] resolvedOpts.progressFn must be a function! It was given of a type: "${typeof n.progressFn}", equal to ${JSON.stringify(n.progressFn, null, 4)}`);
    if (![1, 2, "1", "2"].includes(n.mergeType)) throw new Error(`ranges-merge: [THROW_ID_02] resolvedOpts.mergeType was customised to a wrong thing! It was given of a type: "${typeof n.mergeType}", equal to ${JSON.stringify(n.mergeType, null, 4)}`);
    if (typeof n.joinRangesThatTouchEdges != "boolean") throw new Error(`ranges-merge: [THROW_ID_04] resolvedOpts.joinRangesThatTouchEdges was customised to a wrong thing! It was given of a type: "${typeof n.joinRangesThatTouchEdges}", equal to ${JSON.stringify(n.joinRangesThatTouchEdges, null, 4)}`);
  } else throw new Error(`ranges-merge: [THROW_ID_03] the second input argument must be a plain object. It was given as:
${JSON.stringify(e, null, 4)} (type ${typeof e})`);
  else n = { ...cr };
  let i = t.filter((l) => Array.isArray(l)).map((l) => [...l]).filter((l) => l[2] !== void 0 || l[0] !== l[1]), s, o, a;
  n.progressFn ? s = Ue(i, { progressFn: (l) => {
    a = Math.floor(l / 5), a !== o && (o = a, n.progressFn != null && n.progressFn(a));
  } }) : s = Ue(i);
  let c = s.length - 1;
  for (let l = c; l > 0; l--) n.progressFn && (a = Math.floor((1 - l / c) * 78) + 21, a !== o && a > o && (o = a, n.progressFn(a))), (s[l][0] <= s[l - 1][0] || !n.joinRangesThatTouchEdges && s[l][0] < s[l - 1][1] || n.joinRangesThatTouchEdges && s[l][0] <= s[l - 1][1]) && (s[l - 1][0] = Math.min(s[l][0], s[l - 1][0]), s[l - 1][1] = Math.max(s[l][1], s[l - 1][1]), s[l][2] !== void 0 && (s[l - 1][0] >= s[l][0] || s[l - 1][1] <= s[l][1]) && s[l - 1][2] !== null && (s[l][2] === null && s[l - 1][2] !== null ? s[l - 1][2] = null : s[l - 1][2] != null ? +(n || {})?.mergeType == 2 && s[l - 1][0] === s[l][0] ? s[l - 1][2] = s[l][2] : s[l - 1][2] += s[l][2] : s[l - 1][2] = s[l][2]), s.splice(l, 1), l = s.length);
  return s.length ? s : null;
}
var wa = { limitToBeAddedWhitespace: !1, limitLinebreaksCount: 1, mergeType: 1 }, Sa = class {
  constructor(e) {
    let r = { ...wa, ...e };
    if (r.mergeType && r.mergeType !== 1 && r.mergeType !== 2) if (ee(r.mergeType) && r.mergeType.trim() === "1") r.mergeType = 1;
    else if (ee(r.mergeType) && r.mergeType.trim() === "2") r.mergeType = 2;
    else throw new Error(`ranges-push: [THROW_ID_02] opts.mergeType was customised to a wrong thing! It was given of a type: "${typeof r.mergeType}", equal to ${JSON.stringify(r.mergeType, null, 4)}`);
    this.opts = r, this.ranges = [];
  }
  ranges;
  opts;
  add(e, r, n) {
    if (e == null && r == null) return;
    if (M(e) && !M(r)) {
      if (Array.isArray(e)) {
        if (e.length) {
          if (e.some((o) => Array.isArray(o))) {
            e.forEach((o) => {
              Array.isArray(o) && this.add(...o);
            });
            return;
          }
          e.length && X(+e[0]) && X(+e[1]) && this.add(...e);
        }
        return;
      }
      throw new TypeError(`ranges-push/Ranges/add(): [THROW_ID_12] the first input argument, "from" is set (${JSON.stringify(e, null, 0)}) but second-one, "to" is not (${JSON.stringify(r, null, 0)})`);
    } else if (!M(e) && M(r)) throw new TypeError(`ranges-push/Ranges/add(): [THROW_ID_13] the second input argument, "to" is set (${JSON.stringify(r, null, 0)}) but first-one, "from" is not (${JSON.stringify(e, null, 0)})`);
    let i = +e, s = +r;
    if (X(i) && X(s)) {
      if (M(n) && !ee(n) && !Qn(n)) throw new TypeError(`ranges-push/Ranges/add(): [THROW_ID_08] The third argument, the value to add, was given not as string but ${typeof n}, equal to:
${JSON.stringify(n, null, 4)}`);
      if (M(this.ranges) && Array.isArray(this.last()) && i === this.last()[1]) {
        if (this.last()[1] = s, this.last()[2], this.last()[2] !== null && M(n)) {
          let o = this.last()[2] && this.last()[2].length && (!this.opts?.mergeType || this.opts.mergeType === 1) ? `${this.last()[2]}${n}` : n;
          this.opts.limitToBeAddedWhitespace && (o = et(o, this.opts.limitLinebreaksCount)), ee(o) && !o.length || (this.last()[2] = o);
        }
      } else {
        this.ranges || (this.ranges = []);
        let o = n !== void 0 && !(ee(n) && !n.length) ? [i, s, n && this.opts.limitToBeAddedWhitespace ? et(n, this.opts.limitLinebreaksCount) : n] : [i, s];
        this.ranges.push(o);
      }
    } else throw X(i) && i >= 0 ? new TypeError(`ranges-push/Ranges/add(): [THROW_ID_10] "to" value, the second input argument, must be a natural number or zero! Currently it's of a type "${typeof s}" equal to: ${JSON.stringify(s, null, 4)}`) : new TypeError(`ranges-push/Ranges/add(): [THROW_ID_09] "from" value, the first input argument, must be a natural number or zero! Currently it's of a type "${typeof i}" equal to: ${JSON.stringify(i, null, 4)}`);
  }
  push(e, r, n) {
    this.add(e, r, n);
  }
  current() {
    return Array.isArray(this.ranges) && this.ranges.length ? (this.ranges = va(this.ranges, { mergeType: this.opts.mergeType }), this.ranges && this.opts.limitToBeAddedWhitespace ? this.ranges.map((e) => M(e[2]) ? [e[0], e[1], et(e[2], this.opts.limitLinebreaksCount)] : e) : this.ranges) : null;
  }
  wipe() {
    this.ranges = [];
  }
  replace(e) {
    if (Array.isArray(e) && e.length) if (Array.isArray(e[0]) && X(e[0][0])) this.ranges = Array.from(e);
    else throw new Error(`ranges-push/Ranges/replace(): [THROW_ID_11] Single range was given but we expected array of arrays! The first element, ${JSON.stringify(e[0], null, 4)} should be an array and its first element should be an integer, a string index.`);
    else this.ranges = [];
  }
  last() {
    return Array.isArray(this.ranges) && this.ranges.length ? this.ranges[this.ranges.length - 1] : null;
  }
};
Pr();
var tt = " ";
function ka({ str: t, idx: e = 0, stopAtNewlines: r = !1, stopAtRawNbsp: n = !1 }) {
  if (typeof t != "string" || !t.length || ((!e || typeof e != "number") && (e = 0), !t[e + 1])) return null;
  if (t[e + 1] && (t[e + 1].trim() || r && `
\r`.includes(t[e + 1]) || n && t[e + 1] === tt)) return e + 1;
  if (t[e + 2] && (t[e + 2].trim() || r && `
\r`.includes(t[e + 2]) || n && t[e + 2] === tt)) return e + 2;
  for (let i = e + 1, s = t.length; i < s; i++) if (t[i].trim() || r && `
\r`.includes(t[i]) || n && t[i] === tt) return i;
  return null;
}
function j(t, e = 0) {
  return ka({ str: t, idx: e, stopAtNewlines: !1, stopAtRawNbsp: !1 });
}
function Oa(t) {
  return /[-_A-Za-z0-9]/.test(t);
}
function ur(t, e) {
  if (!t) return [];
  if (Array.isArray(t)) return t.filter((r) => typeof r == "string" && r.trim());
  if (typeof t == "string") return t.trim() ? [t] : [];
  throw new TypeError(`string-strip-html/stripHtml(): [THROW_ID_05] ${e} must be array containing zero or more strings or something falsey. Currently it's equal to: ${t}, that a type of ${typeof t}.`);
}
function Re(t, e, r, n) {
  for (let i = e, s = t.length; i < s; i++) {
    if (t.startsWith(r, i)) return !0;
    if (t.startsWith(n, i)) return !1;
  }
  return !1;
}
function hr(t, e, r) {
  return t?.quotes, t?.quotes?.value && Re(e, r + 1, t.quotes.value, ">"), t?.quotes?.next, Re(e, t?.quotes?.next - 1, t?.quotes?.value, ">"), !t?.quotes || !Re(e, r + 1, t.quotes.value, ">") && t?.quotes?.next !== -1 && Re(e, t?.quotes?.next - 1, t?.quotes?.value, ">");
}
function xa(t, e) {
  return (e.match(new RegExp(t, "g")) || []).length;
}
var pe = /* @__PURE__ */ new Set(["!doctype", "abbr", "address", "area", "article", "aside", "audio", "base", "bdi", "bdo", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "doctype", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "math", "menu", "menuitem", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "param", "picture", "pre", "progress", "rb", "rp", "rt", "rtc", "ruby", "samp", "script", "section", "select", "slot", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "svg", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "ul", "var", "video", "wbr", "xml"]), rt = /* @__PURE__ */ new Set(["a", "b", "i", "p", "q", "s", "u"]), nt = /* @__PURE__ */ new Set([".", ",", ";", "!", "?"]), dr = /* @__PURE__ */ new Set([".", ",", "?", ";", ")", "…", '"', "»"]), Ea = /* @__PURE__ */ new Set(["a", "abbr", "acronym", "audio", "b", "bdi", "bdo", "big", "button", "canvas", "cite", "code", "data", "datalist", "del", "dfn", "em", "embed", "i", "iframe", "input", "ins", "kbd", "label", "map", "mark", "meter", "noscript", "object", "output", "picture", "progress", "q", "ruby", "s", "samp", "select", "slot", "small", "span", "strong", "sub", "sup", "svg", "template", "textarea", "time", "u", "tt", "var", "video", "wbr"]), gr = { ignoreTags: [], ignoreTagsWithTheirContents: [], onlyStripTags: [], stripTogetherWithTheirContents: ["script", "style", "xml"], skipHtmlDecoding: !1, trimOnlySpaces: !1, stripRecognisedHTMLOnly: !1, dumpLinkHrefsNearby: { enabled: !1, putOnNewLine: !1, wrapHeads: "", wrapTails: "" }, ignoreIndentations: !1, cb: null, reportProgressFunc: null, reportProgressFuncFrom: 0, reportProgressFuncTo: 100 };
function Kr(t, e) {
  let r = Date.now(), n = [], i = [], s = [], o = [], a = {};
  function c() {
    a = { attributes: [] };
  }
  c();
  let l = null, h = null, d = null, g = !1, f = {}, y = { tagName: "", hrefValue: "", openingTagEnds: void 0 }, p = "", m = !1, w = null, E = !0;
  function x(u, v, k) {
    if (Array.isArray(v.stripTogetherWithTheirContents) && (v.stripTogetherWithTheirContents.includes(a.name) || v.stripTogetherWithTheirContents.includes("*"))) if (a.slashPresent && Array.isArray(n) && n.some((S) => S.name === a.name)) {
      for (let S = n.length; S--; ) if (n[S].name === a.name) {
        o = o.filter(([T, L]) => (T < n[S].lastOpeningBracketAt || T >= u + 1) && (L <= n[S].lastOpeningBracketAt || L > u + 1));
        let R = u + 1;
        a.lastClosingBracketAt && (R = a.lastClosingBracketAt + 1), o.push([n[S].lastOpeningBracketAt, R]), dr.has(t[u]) && v.cb ? v.cb({ tag: a, deleteFrom: n[S].lastOpeningBracketAt, deleteTo: u + 1, insert: null, rangesArr: k, proposedReturn: [n[S].lastOpeningBracketAt, u, null] }) : v.cb && v.cb({ tag: a, deleteFrom: n[S].lastOpeningBracketAt, deleteTo: u, insert: "", rangesArr: k, proposedReturn: [n[S].lastOpeningBracketAt, u, ""] }), n.splice(S, 1);
        break;
      }
    } else a.slashPresent || n.push(a);
    else Array.isArray(v.ignoreTagsWithTheirContents) && ue(u, v, a) && (E = !1);
  }
  function N(u, v, k, S, R, T) {
    if (Array.isArray(A.current()) && typeof k == "number" && A.current()[0][0] === 0 && A.current()[0][1] >= k) return "";
    if (t.length === S && T && !b?.dumpLinkHrefsNearby?.enabled) return null;
    let L = "";
    if (Number.isInteger(k) && k < R && (L += u.slice(k, R)), Number.isInteger(S) && S > T + 1) {
      let z = u.slice(T + 1, S);
      S && !j(t, S - 1) && (z = z.trimEnd()), z.includes(`
`) && q(S, u) ? L += " " : L += z;
    }
    let Q = !dr.has(u[v]), _t = u[S - 1] !== ">" || !u[k].trim(), Ft = !['"', "("].includes(u[R - 1]), Sn = ![";", ".", ":", "!"].includes(u[v]);
    if ((Q || _t && Ft && Sn) && (_t || Ft) && u[v] !== "!" && (!Ea.has(a.name) || typeof k == "number" && k < R || typeof S == "number" && S > T + 1)) {
      let z = L.match(/\n/g);
      return Array.isArray(z) && z.length ? z.length === 1 ? `
` : z.length === 2 ? `

` : `


` : " ";
    }
    return "";
  }
  function I(u, v) {
    if (u.dumpLinkHrefsNearby?.enabled && y.tagName && y.tagName === a.name && a.lastOpeningBracketAt && (y.openingTagEnds && a.lastOpeningBracketAt > y.openingTagEnds || !y.openingTagEnds) && (m = !0), m) {
      let k = u.dumpLinkHrefsNearby?.putOnNewLine ? `

` : "";
      p = `${k}${y.hrefValue}`, (typeof v != "number" || j(t, v - 1)) && (p += k);
    }
  }
  function q(u, v) {
    return v ? v[u] === "<" && v[u + 1] !== "%" : t[u] === "<" && t[u + 1] !== "%";
  }
  function B(u) {
    return t[u] === ">" && t[u - 1] !== "%";
  }
  function ue(u, v, k) {
    if (v.ignoreTagsWithTheirContents.includes("*")) return !0;
    let S = t.indexOf(`<${k.name}`, u), R = t.indexOf(`</${k.name}`, u);
    return !k.slashPresent && R === -1 || k.slashPresent && !i.some((T) => T.name === k.name) || R > -1 && S > -1 && S < R ? !1 : v.ignoreTagsWithTheirContents.includes(k.name);
  }
  if (typeof t != "string") throw new TypeError(`string-strip-html/stripHtml(): [THROW_ID_01] Input must be string! Currently it's: ${(typeof t).toLowerCase()}, equal to:
${JSON.stringify(t, null, 4)}`);
  if (e) if (yt(e)) {
    if (e.reportProgressFunc && typeof e.reportProgressFunc != "function") throw new Error(`string-strip-html/stripHtml(): [THROW_ID_03] The Optional Options Object's key reportProgressFunc, callback function, should be a function but it was given as type ${typeof e.reportProgressFunc}, equal to ${JSON.stringify(e.reportProgressFunc, null, 4)}`);
    if (typeof e.dumpLinkHrefsNearby == "boolean" && e.dumpLinkHrefsNearby != null) throw new Error(`string-strip-html/stripHtml(): [THROW_ID_04] The Optional Options Object's key should be a plain object but it was given as type ${typeof e.dumpLinkHrefsNearby}, equal to ${JSON.stringify(e.dumpLinkHrefsNearby, null, 4)}`);
  } else throw new TypeError(`string-strip-html/stripHtml(): [THROW_ID_02] Optional Options Object must be a plain object! Currently it's: ${(typeof e).toLowerCase()}, equal to:
${JSON.stringify(e, null, 4)}`);
  function he() {
    m && (y = { tagName: "", hrefValue: "", openingTagEnds: void 0 }, m = !1);
  }
  let b = { ...gr, ...e, dumpLinkHrefsNearby: Object.assign({}, gr.dumpLinkHrefsNearby, e?.dumpLinkHrefsNearby) };
  if (Xn(b, "returnRangesOnly")) throw new TypeError("string-strip-html/stripHtml(): [THROW_ID_05] The Optional Options Object's key returnRangesOnly has been removed from the API since v.5 release.");
  if (b.reportProgressFunc) {
    if (typeof b.reportProgressFuncFrom != "number") throw new Error(`string-strip-html/stripHtml(): [THROW_ID_06] The Optional Options Object's key reportProgressFuncFrom, callback function's "from" range, should be a number but it was given as type ${typeof b.reportProgressFuncFrom}, equal to ${JSON.stringify(b.reportProgressFuncFrom, null, 4)}`);
    if (typeof b.reportProgressFuncTo != "number") throw new Error(`string-strip-html/stripHtml(): [THROW_ID_07] The Optional Options Object's key reportProgressFuncTo, callback function's "to" range, should be a number but it was given as type ${typeof b.reportProgressFuncTo}, equal to ${JSON.stringify(b.reportProgressFuncTo, null, 4)}`);
  }
  b.ignoreTags = ur(b.ignoreTags, "resolvedOpts.ignoreTags"), b.onlyStripTags = ur(b.onlyStripTags, "resolvedOpts.onlyStripTags");
  let zt = !!b.onlyStripTags.length;
  b.onlyStripTags.length && b.ignoreTags.length && (b.onlyStripTags = na(b.onlyStripTags, ...b.ignoreTags)), b.stripTogetherWithTheirContents ? typeof b.stripTogetherWithTheirContents == "string" && b.stripTogetherWithTheirContents.length && (b.stripTogetherWithTheirContents = [b.stripTogetherWithTheirContents]) : b.stripTogetherWithTheirContents = [];
  let de = {};
  if (b.stripTogetherWithTheirContents && Array.isArray(b.stripTogetherWithTheirContents) && b.stripTogetherWithTheirContents.length && !b.stripTogetherWithTheirContents.every((u, v) => typeof u != "string" ? (de.el = u, de.i = v, !1) : !0)) throw new TypeError(`string-strip-html/stripHtml(): [THROW_ID_08] Optional Options Object's key stripTogetherWithTheirContents was set to contain not just string elements! For example, element at index ${de.i} has a value ${de.el} which is not string but ${(typeof de.el).toLowerCase()}.`);
  b.cb || (b.cb = ({ rangesArr: u, proposedReturn: v }) => {
    v && u.push(...v);
  });
  let A = new Sa({ limitToBeAddedWhitespace: !0, limitLinebreaksCount: 2 });
  if (!b.skipHtmlDecoding) for (; t !== ar(t, { scope: "strict" }); ) t = ar(t, { scope: "strict" });
  let G = !1, _ = !1, Ae = 0, Ht = 0, $ = t.length, wn = Math.floor($ / 2);
  for (let u = 0; u < $; u++) {
    if (b.reportProgressFunc && ($ > 1e3 && $ < 2e3 ? u === wn && b.reportProgressFunc(Math.floor((b.reportProgressFuncTo - b.reportProgressFuncFrom) / 2)) : $ >= 2e3 && (Ae = b.reportProgressFuncFrom + Math.floor(u / $ * (b.reportProgressFuncTo - b.reportProgressFuncFrom)), Ae !== Ht && (Ht = Ae, b.reportProgressFunc(Ae)))), Object.keys(a).length > 1 && a.lastClosingBracketAt && a.lastClosingBracketAt < u && t[u] !== " " && w === null && (w = u), !G && t[u] === "%" && t[u - 1] === "{" && t.includes("%}", u + 1)) {
      d = null;
      let v = t.indexOf("%}", u) - 1;
      if (v > u) {
        u = v;
        continue;
      }
    }
    if (!G && B(u) && (!a || Object.keys(a).length < 2) && u > 1) {
      for (let v = u; v--; ) if (t[v - 1] === void 0 || B(v)) {
        let k = t[v - 1] === void 0 ? v : v + 1, S = t.slice(k, u + 1) || "";
        if ((S.includes("/>") || S.includes("/ >") || S.includes('="') || S.includes("='")) && t !== `<${ir(S.trim(), "/>")}>` && [...pe].some((R) => ir(S.trim().split(/\s+/).filter((T) => T.trim()).filter((T, L) => L === 0), "/>").toLowerCase() === R) && Kr(`<${S.trim()}>`, b).result === "") {
          (!s.length || s[s.length - 1][0] !== a.lastOpeningBracketAt) && s.push([k, u + 1]), (!o.length || o[o.length - 1][0] !== a.lastOpeningBracketAt) && o.push([k, u + 1]);
          let R = N(t, u, k, u + 1, k, u + 1), T = u + 1;
          if (t[T] && !t[T].trim()) {
            for (let L = T; L < $; L++) if (t[L].trim()) {
              T = L;
              break;
            }
          }
          b.cb({ tag: a, deleteFrom: k, deleteTo: T, insert: R, rangesArr: A, proposedReturn: [k, T, R] });
        }
        break;
      }
    }
    if (!_ && t[u] === "/" && !a.quotes?.value && Number.isInteger(a.lastOpeningBracketAt) && !Number.isInteger(a.lastClosingBracketAt) && (a.slashPresent = u), t[u] === '"' || t[u] === "'") if (!_ && a.nameStarts && a?.quotes?.value === t[u]) if (f.valueStarts === void 0) f = {}, delete a.quotes;
    else {
      f.valueEnds = u, f.value = t.slice(f.valueStarts, u), a.attributes.push(f), f = {}, delete a.quotes;
      let v;
      b.dumpLinkHrefsNearby?.enabled && !n.length && a.attributes.some((k) => {
        if (typeof k.name == "string" && k.name.toLowerCase() === "href") return v = `${b.dumpLinkHrefsNearby?.wrapHeads || ""}${k.value}${b.dumpLinkHrefsNearby?.wrapTails || ""}`, !0;
      }) && (y = { tagName: a.name, hrefValue: v, openingTagEnds: void 0 });
    }
    else !_ && !a.quotes && a.nameStarts && (a.quotes = {}, a.quotes.value = t[u], a.quotes.start = u, a.quotes.next = t.indexOf(t[u], u + 1), f.nameStarts && f.nameEnds && f.nameEnds < u && f.nameStarts < u && !f.valueStarts && (f.name = t.slice(f.nameStarts, f.nameEnds)));
    if (a.nameStarts !== void 0 && a.nameEnds === void 0 && (!t[u].trim() || !Oa(t[u]))) {
      if (a.nameEnds = u, a.name = t.slice(a.nameStarts, a.nameEnds + (!B(u) && t[u] !== "/" && t[u + 1] === void 0 ? 1 : 0)), t[a.nameStarts - 1] !== "!" && !a.name.replace(/-/g, "").length || /^\d+$/.test(a.name[0])) {
        a = {};
        continue;
      }
      if (typeof a.name == "string" && a.name.toLowerCase() === "doctype" && (_ = !0), q(u)) {
        I(b);
        let v = N(t, u, a.leftOuterWhitespace, u, a.lastOpeningBracketAt, u);
        (b.stripTogetherWithTheirContents.includes(a.name) || b.stripTogetherWithTheirContents.includes("*")) && (o = o.filter(([k, S]) => !(k === a.leftOuterWhitespace && S === u))), b.cb({ tag: a, deleteFrom: a.leftOuterWhitespace, deleteTo: u, insert: `${v}${p}${v}`, rangesArr: A, proposedReturn: [a.leftOuterWhitespace, u, `${v}${p}${v}`] }), he(), x(u, b, A);
      }
    }
    if (a.quotes?.start && a.quotes.start < u && !a.quotes.end && f.nameEnds && f.equalsAt && !f.valueStarts && (f.valueStarts = u), !a.quotes && f.nameEnds && t[u] === "=" && !f.valueStarts && !f.equalsAt && (f.equalsAt = u), !a.quotes && f.nameStarts && f.nameEnds && !f.valueStarts && t[u].trim() && t[u] !== "=" && (a.attributes.push(f), f = {}), !a.quotes && f.nameStarts && !f.nameEnds && (_ && `'"`.includes(t[f.nameStarts]) ? f.nameStarts < u && t[u] === t[f.nameStarts] && (f.nameEnds = u + 1, f.name = t.slice(f.nameStarts, f.nameEnds)) : t[u].trim() ? t[u] === "=" ? f.equalsAt || (f.nameEnds = u, f.equalsAt = u, f.name = t.slice(f.nameStarts, f.nameEnds)) : t[u] === "/" || B(u) ? (f.nameEnds = u, f.name = t.slice(f.nameStarts, f.nameEnds), a.attributes.push(f), f = {}) : q(u) && (f.nameEnds = u, f.name = t.slice(f.nameStarts, f.nameEnds), a.attributes.push(f), f = {}) : (f.nameEnds = u, f.name = t.slice(f.nameStarts, f.nameEnds))), !a.quotes && a.nameEnds < u && !t[u - 1].trim() && t[u].trim() && !"<>/!".includes(t[u]) && !f.nameStarts && !a.lastClosingBracketAt && (f.nameStarts = u), a.lastOpeningBracketAt !== null && a.lastOpeningBracketAt < u && t[u] === "/" && a.onlyPlausible && (a.onlyPlausible = !1), a.lastOpeningBracketAt !== null && a.lastOpeningBracketAt < u && t[u] !== "/" && (a.onlyPlausible === void 0 && ((!t[u].trim() || q(u)) && !a.slashPresent ? a.onlyPlausible = !0 : a.onlyPlausible = !1), t[u].trim() && a.nameStarts === void 0 && !q(u) && t[u] !== "/" && !B(u) && t[u] !== "!" && (a.nameStarts = u, a.nameContainsLetters = !1)), a.nameStarts && !a.quotes && typeof t[u] == "string" && t[u].toLowerCase() !== t[u].toUpperCase() && (a.nameContainsLetters = !0), B(u) && (hr(a, t, u) || a.quotes.value && typeof a.lastOpeningBracketAt == "number" && xa(a.quotes.value, t.slice(a.lastOpeningBracketAt, u)) % 2 === 1 && !t.slice(a.lastOpeningBracketAt + 1, u).includes("<") && !t.slice(a.lastOpeningBracketAt + 1, u).includes(">")) && a.lastOpeningBracketAt !== void 0 && (a.lastClosingBracketAt = u, w = null, Object.keys(f).length && (a.attributes.push(f), f = {}), b.dumpLinkHrefsNearby?.enabled && y.tagName && !y.openingTagEnds && (y.openingTagEnds = u)), (!_ || t[u] === ">") && a.lastOpeningBracketAt !== void 0) {
      if (a.lastClosingBracketAt === void 0) {
        if (a.lastOpeningBracketAt < u && !q(u) && (t[u + 1] === void 0 || q(u + 1) && !a?.quotes?.value) && a.nameContainsLetters && typeof a.nameStarts == "number") {
          if (a.name = t.slice(a.nameStarts, a.nameEnds || u + 1).toLowerCase(), (!s.length || s[s.length - 1][0] !== a.lastOpeningBracketAt) && s.push([a.lastOpeningBracketAt, u + 1]), b.ignoreTags.includes(a.name) || ue(u, b, a) || !pe.has(a.name) && (a.onlyPlausible || b.stripRecognisedHTMLOnly)) {
            a = {}, f = {};
            continue;
          }
          if ((pe.has(a.name) || rt.has(a.name)) && (a.onlyPlausible === !1 || a.onlyPlausible === !0 && a.attributes.length) || t[u + 1] === void 0) {
            I(b);
            let v = N(t, u, a.leftOuterWhitespace, u + 1, a.lastOpeningBracketAt, a.lastClosingBracketAt);
            G && a.name === "script" && a.slashPresent && (G = !1);
            let k;
            v === null || p === null ? k = null : k = `${v}${p}${v}`, b.cb({ tag: a, deleteFrom: a.leftOuterWhitespace, deleteTo: u + 1, insert: k, rangesArr: A, proposedReturn: [a.leftOuterWhitespace, u + 1, k] }), he(), x(u, b, A);
          }
          if (!o.length || o[o.length - 1][0] !== a.lastOpeningBracketAt && o[o.length - 1][1] !== u + 1) if (b.stripTogetherWithTheirContents.includes(a.name) || b.stripTogetherWithTheirContents.includes("*")) {
            let v;
            for (let k = n.length; k--; ) n[k].name === a.name && (v = n[k]);
            v ? (o = o.filter(([k]) => k !== v.lastOpeningBracketAt), o.push([v.lastOpeningBracketAt, u + 1])) : o.push([a.lastOpeningBracketAt, u + 1]);
          } else o.push([a.lastOpeningBracketAt, u + 1]);
        }
      } else if (u > a.lastClosingBracketAt && t[u].trim() || t[u + 1] === void 0 || b.ignoreIndentations && `\r
`.includes(t[u])) {
        let v = a.lastClosingBracketAt === u ? u + 1 : u;
        b.trimOnlySpaces && v === $ - 1 && w !== null && w < u && (v = w), (!s.length || s[s.length - 1][0] !== a.lastOpeningBracketAt) && s.push([a.lastOpeningBracketAt, a.lastClosingBracketAt + 1]);
        let k = b.ignoreTags.includes(a.name), S = ue(u, b, a);
        if (!E || b.stripRecognisedHTMLOnly && typeof a.name == "string" && !pe.has(a.name.toLowerCase()) && !rt.has(a.name.toLowerCase()) || !zt && (k || S) || zt && !b.onlyStripTags.includes(a.name) || b.ignoreTagsWithTheirContents.includes(a.name)) {
          if (S) if (a.slashPresent) {
            for (let R = i.length; R--; ) if (i[R].name === a.name) {
              i.splice(R, 1);
              break;
            }
            i.length || (E = !0);
          } else E && (E = !1), i.push(a);
          b.cb({ tag: a, deleteFrom: null, deleteTo: null, insert: null, rangesArr: A, proposedReturn: null }), a = {}, f = {};
        } else if (!a.onlyPlausible || a.attributes.length === 0 && a.name && (pe.has(a.name.toLowerCase()) || rt.has(a.name.toLowerCase())) || a.attributes?.some((R) => R.equalsAt)) {
          (!o.length || o[o.length - 1][0] !== a.lastOpeningBracketAt) && o.push([a.lastOpeningBracketAt, a.lastClosingBracketAt + 1]);
          let R = N(t, u, a.leftOuterWhitespace, v, a.lastOpeningBracketAt, a.lastClosingBracketAt);
          p = "", m = !1, I(b, v);
          let T;
          typeof p == "string" && p.length ? (T = `${R}${p}${R === `

` ? `
` : R}`, v === a.lastClosingBracketAt + 1 && (!t[v] || !nt.has(t[v])) && (T += " "), a.leftOuterWhitespace === a.lastOpeningBracketAt && A.last() && A.last()[1] < a.lastOpeningBracketAt && (!b?.dumpLinkHrefsNearby?.putOnNewLine || !nt.has(t[v])) && (T = " " + T)) : T = R, T !== null && (a.leftOuterWhitespace === 0 || !j(t, v - 1)) && (!b.dumpLinkHrefsNearby?.enabled || a.name !== "a") && (T = void 0);
          let L = 0;
          if (m && nt.has(t[v])) {
            b.dumpLinkHrefsNearby?.putOnNewLine && (T = `${t[v]}${T || ""}`);
            let Q = j(t, v);
            Q && T?.endsWith(`
`) ? L += Q - u : (!Q || Q > u) && L++;
          }
          b.cb({ tag: a, deleteFrom: a.leftOuterWhitespace, deleteTo: v + L, insert: T, rangesArr: A, proposedReturn: [a.leftOuterWhitespace, v + L, T] }), he(), x(u, b, A);
        } else a = {};
        B(u) || (a = {});
      }
      _ && (_ = !1);
    }
    if ((!G || t[u] === "<" && j(t, j(t, u)) && t[j(t, u)] === "/" && t.startsWith("script", j(t, j(t, u)))) && q(u) && !q(u - 1) && !`'"`.includes(t[u + 1]) && (!`'"`.includes(t[u + 2]) || /\w/.test(t[u + 1])) && !(t[u + 1] === "c" && t[u + 2] === ":") && !(t[u + 1] === "f" && t[u + 2] === "m" && t[u + 3] === "t" && t[u + 4] === ":") && !(t[u + 1] === "s" && t[u + 2] === "q" && t[u + 3] === "l" && t[u + 4] === ":") && !(t[u + 1] === "x" && t[u + 2] === ":") && !(t[u + 1] === "f" && t[u + 2] === "n" && t[u + 3] === ":") && hr(a, t, u)) {
      if (B(j(t, u))) continue;
      if (a.nameEnds && a.nameEnds < u && !a.lastClosingBracketAt && (a.onlyPlausible === !0 && a.attributes?.length || a.onlyPlausible === !1)) {
        let v = N(t, u, a.leftOuterWhitespace, u, a.lastOpeningBracketAt, u);
        b.cb({ tag: a, deleteFrom: a.leftOuterWhitespace, deleteTo: u, insert: v, rangesArr: A, proposedReturn: [a.leftOuterWhitespace, u, v] }), x(u, b, A), a = {}, f = {};
      }
      if (a.lastOpeningBracketAt !== void 0 && a.onlyPlausible && a.name && !a.quotes && (a.lastOpeningBracketAt = void 0, a.name = void 0, a.onlyPlausible = !1), (a.lastOpeningBracketAt === void 0 || !a.onlyPlausible) && !a.quotes && (a.lastOpeningBracketAt = u, a.slashPresent = !1, a.attributes = [], l === null ? a.leftOuterWhitespace = u : b.trimOnlySpaces && l === 0 ? a.leftOuterWhitespace = h || u : a.leftOuterWhitespace = l, `${t[u + 1]}${t[u + 2]}${t[u + 3]}` == "!--" || `${t[u + 1]}${t[u + 2]}${t[u + 3]}${t[u + 4]}${t[u + 5]}${t[u + 6]}${t[u + 7]}${t[u + 8]}` == "![CDATA[")) {
        let v = !0;
        t[u + 2] === "-" && (v = !1);
        let k;
        for (let S = u; S < $; S++) if ((!k && v && `${t[S - 2]}${t[S - 1]}${t[S]}` == "]]>" || !v && `${t[S - 2]}${t[S - 1]}${t[S]}` == "-->") && (k = S), k && (k < S && t[S].trim() || t[S + 1] === void 0)) {
          let R = S;
          (t[S + 1] === void 0 && !t[S].trim() || t[S] === ">") && (R += 1), (!s.length || s[s.length - 1][0] !== a.lastOpeningBracketAt) && s.push([a.lastOpeningBracketAt, k + 1]), (!o.length || o[o.length - 1][0] !== a.lastOpeningBracketAt) && o.push([a.lastOpeningBracketAt, k + 1]);
          let T = N(t, S, a.leftOuterWhitespace, R, a.lastOpeningBracketAt, k);
          b.cb({ tag: a, deleteFrom: a.leftOuterWhitespace, deleteTo: R, insert: T, rangesArr: A, proposedReturn: [a.leftOuterWhitespace, R, T] }), u = S - 1, t[S] === ">" && (u = S), a = {}, f = {};
          break;
        }
      }
    }
    !t[u].trim() || t[u].charCodeAt(0) === 847 ? (l === null && (l = u, a.lastOpeningBracketAt !== void 0 && a.lastOpeningBracketAt < u && a.nameStarts && a.nameStarts < a.lastOpeningBracketAt && u === a.lastOpeningBracketAt + 1 && !n.some((v) => v.name === a.name) && (a.onlyPlausible = !0, a.name = void 0, a.nameStarts = void 0)), (t[u] === `
` || t[u] === "\r") && (d = u, g && (g = !1))) : (l !== null && (!a.quotes && f.equalsAt > l - 1 && f.nameEnds && f.equalsAt > f.nameEnds && t[u] !== '"' && t[u] !== "'" && (yt(f) && a.attributes.push(f), f = {}, a.equalsSpottedAt = void 0), l = null), g || (g = !0, E && !G && typeof d == "number" && u && d < u - 1 && (t.slice(d + 1, u).trim() ? d = null : b.ignoreIndentations || A.push([d + 1, u])))), t[u] === " " ? h === null && (h = u) : h !== null && (h = null), a.name === "script" && (G = !a.slashPresent);
  }
  if (t && !b.ignoreIndentations && (b.trimOnlySpaces && t[0] === " " || !b.trimOnlySpaces && !t[0].trim())) for (let u = 0; u < $; u++) if (b.trimOnlySpaces && t[u] !== " " || !b.trimOnlySpaces && t[u].trim()) {
    A.push([0, u]);
    break;
  } else t[u + 1] || A.push([0, u + 1]);
  if (t && (b.trimOnlySpaces && t[~-t.length] === " " || !b.trimOnlySpaces && !t[~-t.length].trim())) {
    for (let u = t.length; u--; ) if (b.trimOnlySpaces && t[u] !== " " || !b.trimOnlySpaces && t[u].trim()) {
      A.push([u + 1, $]);
      break;
    }
  }
  let F = A.current();
  if (!e?.cb && F && (F[0] && !F[0][0] && (F[0][1], A.ranges[0] = [A.ranges[0][0], A.ranges[0][1]]), F[F.length - 1]?.[1] === t.length && (F[F.length - 1][0], A.ranges))) {
    let u = A.ranges[A.ranges.length - 1][0];
    t[u - 1] && (b.trimOnlySpaces && t[u - 1] === " " || !b.trimOnlySpaces && !t[u - 1].trim()) && (u -= 1);
    let v = A.ranges[A.ranges.length - 1][2];
    A.ranges[A.ranges.length - 1] = [u, A.ranges[A.ranges.length - 1][1]], v?.trim() && A.ranges[A.ranges.length - 1].push(v.trimEnd());
  }
  return { log: { timeTakenInMilliseconds: Date.now() - r }, result: ba(t, A.current()), ranges: A.current(), allTagLocations: s, filteredTagLocations: o };
}
class wt {
  speechSynthesis;
  speechSynthesisUtterance;
  currentVoice = null;
  currentUtterances = [];
  currentUtteranceIndex = 0;
  playbackState = "idle";
  eventListeners = /* @__PURE__ */ new Map();
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
    if (this.features = Vn(), this.patches = Wn(), !this.features.speechSynthesis || !this.features.speechSynthesisUtterance)
      throw new Error("Web Speech API is not available in this environment");
    this.speechSynthesis = this.features.speechSynthesis, this.speechSynthesisUtterance = this.features.speechSynthesisUtterance;
  }
  // From Easy Speech,
  // Check infinity pattern for long texts (except on problematic platforms)
  // Skip resume infinity for Microsoft Natural voices as they have different behavior 
  shouldUseResumeInfinity() {
    const e = this.currentVoice, r = !!(e?.name && typeof e.name == "string" && e.name.toLocaleLowerCase().includes("(natural)"));
    return this.patches.isAndroid !== !0 && !this.patches.isFirefox && !this.patches.isSafari && !r;
  }
  // Creates a new SpeechSynthesisUtterance using detected constructor
  createUtterance(e) {
    return new this.speechSynthesisUtterance(e);
  }
  async initialize(e = {}) {
    const { languages: r, maxTimeout: n, interval: i, maxLengthExceeded: s = "warn" } = e;
    if (this.initialized)
      return !1;
    this.maxLengthExceeded = s;
    try {
      this.voiceManager = await O.initialize({
        languages: r,
        maxTimeout: n,
        interval: i
      }), this.voices = this.voiceManager.getVoices();
      const o = r || [...navigator.languages || ["en"]];
      return this.defaultVoice = await this.voiceManager.getDefaultVoice(o, this.voices), this.initialized = !0, !0;
    } catch (o) {
      return console.error("Failed to initialize WebSpeechEngine:", o), this.initialized = !1, !1;
    }
  }
  // Text length validation matching EasySpeech
  validateText(e) {
    if (new TextEncoder().encode(e).length > 4096) {
      const n = "Text exceeds max length of 4096 bytes, which may not work with some voices.";
      switch (this.maxLengthExceeded) {
        case "none":
          break;
        case "error":
          throw new Error(`WebSpeechEngine: ${n}`);
        default:
          console.warn(`WebSpeechEngine: ${n}`);
      }
    }
  }
  getCurrentVoiceForUtterance(e) {
    return e && typeof e == "object" ? e : typeof e == "string" ? this.voices.find((r) => r.name === e || r.language === e) || null : this.currentVoice || this.defaultVoice;
  }
  // No cross-region fallback: fr-FR content must not match an fr-CA voice.
  voiceMatchesLanguage(e, r) {
    const [n, i] = U(r), [s, o] = U(e.language);
    return s === n && (!i || o === i);
  }
  // Returns `undefined` (not a fallback voice) when content.language hasn't
  // been warmed into languageVoiceCache yet — callers must await for it.
  voiceForUtteranceSync(e) {
    const r = this.getCurrentVoiceForUtterance(this.currentVoice);
    if (!this.speakInContentLanguage || !e.language)
      return r;
    const n = D(e.language);
    if (r && this.voiceMatchesLanguage(r, n))
      return r;
    if (this.languageVoiceCache.has(n))
      return this.languageVoiceCache.get(n) ?? r;
  }
  // Awaits warming for a not-yet-seen content language rather than falling back
  // to the wrong-language voice.
  async voiceForUtterance(e) {
    const r = this.voiceForUtteranceSync(e);
    return r !== void 0 ? r : (await this.warmLanguageVoiceCache([e]), this.voiceForUtteranceSync(e) ?? this.getCurrentVoiceForUtterance(this.currentVoice));
  }
  // Dedupes in-flight warms per language so an awaited call and a
  // fire-and-forget one for the same language don't redo the work.
  async warmLanguageVoiceCache(e) {
    if (!this.speakInContentLanguage || !this.voiceManager)
      return;
    const r = new Set(
      e.map((o) => o.language).filter((o) => !!o).map((o) => D(o)).filter((o) => !this.languageVoiceCache.has(o))
    ), n = [...r].filter((o) => this.warmingLanguages.has(o)), s = [...r].filter((o) => !this.warmingLanguages.has(o)).map((o) => {
      const a = (async () => {
        await O.initialize({ languages: [o] }), this.voices = this.voiceManager.getVoices();
        const c = this.voices.filter((d) => this.voiceMatchesLanguage(d, o)), h = (await this.voiceManager.sortVoicesByQuality(c))[0] ?? null;
        this.languageVoiceCache.set(o, h), h || this.emitEvent({ type: "languagefallback", detail: { language: o, reason: "no-matching-voice" } });
      })();
      return this.warmingLanguages.set(o, a.finally(() => this.warmingLanguages.delete(o))), this.warmingLanguages.get(o);
    });
    await Promise.all([
      ...s,
      ...n.map((o) => this.warmingLanguages.get(o))
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
    return e.map((r) => ({
      ...r,
      plain: r.plain ?? (r.ssml ? Kr(r.ssml).result : "")
    }));
  }
  // Queue Management
  loadUtterances(e) {
    this.currentUtterances = this.toPlainText(e), this.currentUtteranceIndex = 0, this.warmLanguageVoiceCache(this.currentUtterances), this.setState("ready"), this.emitEvent({ type: "ready" });
  }
  // Voice Configuration
  async setVoice(e) {
    const r = this.currentVoice;
    if (typeof e == "string") {
      const n = this.voices.find((i) => i.name === e || i.language === e);
      n ? (this.currentVoice = n, r && r.name !== n.name && (this.currentUtteranceIndex = 0)) : console.warn(`Voice "${e}" not found`);
    } else
      this.currentVoice = e, r && r.name !== e.name && (this.currentUtteranceIndex = 0);
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
    const r = ++this.speakGeneration;
    this.isSpeakingInternal = !0, this.isPausedInternal = !1, this.setState("playing"), this.emitEvent({ type: "start" }), this.stopResumeInfinity(), this.currentUtteranceIndex = e ?? 0, this.currentUtteranceIndex >= this.currentUtterances.length && (this.currentUtteranceIndex = 0), this.speakCurrentUtterance(r);
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
    const r = this.currentUtterances[this.currentUtteranceIndex], n = r.plain ?? "";
    this.validateText(n);
    const i = this.createUtterance(n), s = await this.voiceForUtterance(r);
    if (e === this.speakGeneration) {
      if (s && this.voiceManager) {
        const o = this.voiceManager.convertToSpeechSynthesisVoice(s);
        o && (i.voice = o, i.lang = o.lang);
      }
      r.language && (i.lang = r.language), i.rate = this.rate, i.pitch = this.pitch, i.volume = this.volume, i.onstart = () => {
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
        const { paused: n, speaking: i } = this.speechSynthesis, s = i || this.isSpeakingInternal, o = n || this.isPausedInternal;
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
  setCurrentUtteranceIndex(e, r) {
    if (e < 0 || e >= this.currentUtterances.length) {
      r?.(!1);
      return;
    }
    e !== this.currentUtteranceIndex && (!this.isPausedInternal && this.isSpeakingInternal && this.cancelCurrentSpeech(), this.currentUtteranceIndex = e, r?.(!0));
  }
  getUtteranceCount() {
    return this.currentUtterances.length;
  }
  // Events
  on(e, r) {
    return this.eventListeners.has(e) || this.eventListeners.set(e, []), this.eventListeners.get(e).push(r), () => {
      const n = this.eventListeners.get(e);
      if (n) {
        const i = n.indexOf(r);
        i > -1 && n.splice(i, 1);
      }
    };
  }
  emitEvent(e) {
    const r = this.eventListeners.get(e.type);
    r && r.forEach((n) => n(e));
  }
  setState(e) {
    const r = this.playbackState;
    if (this.playbackState = e, r !== e)
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
    this.stop(), this.stopResumeInfinity(), this.eventListeners.clear(), this.currentUtterances = [], this.currentVoice = null, this.voices = [], this.defaultVoice = null, this.languageVoiceCache.clear(), this.warmingLanguages.clear(), this.initialized = !1;
  }
}
class ol {
  id = "webspeech";
  name = "Web Speech API";
  engine = null;
  async getVoices() {
    if (!this.engine)
      throw new Error("No engine available. Create an engine first.");
    return this.engine.getAvailableVoices();
  }
  async createEngine(e) {
    const r = new wt();
    return await r.initialize(), e && await r.setVoice(e), r;
  }
  async destroy() {
    this.engine && (await this.engine.destroy(), this.engine = null);
  }
}
class ll {
  engine;
  contentQueue = [];
  eventListeners = /* @__PURE__ */ new Map();
  // Navigator owns the state, not the engine
  navigatorState = "idle";
  constructor(e) {
    this.engine = e || new wt(), this.setupEngineListeners(), this.initializeEngine();
  }
  async initializeEngine() {
    if (this.engine instanceof wt)
      try {
        await this.engine.initialize();
      } catch (e) {
        console.warn("Failed to initialize WebSpeechEngine:", e);
      }
  }
  setupEngineListeners() {
    this.engine.on("start", () => {
      this.setNavigatorState("playing"), this.emitEvent({ type: "start" });
    }), this.engine.on("end", () => {
      const e = this.engine.getCurrentUtteranceIndex(), r = this.engine.getUtteranceCount();
      e < r - 1 ? this.engine.speak(e + 1) : this.setNavigatorState("idle"), this.emitEvent({ type: "end" });
    }), this.engine.on("pause", () => {
      this.setNavigatorState("paused"), this.emitEvent({ type: "pause" });
    }), this.engine.on("resume", () => {
      this.setNavigatorState("playing"), this.emitEvent({ type: "resume" });
    }), this.engine.on("stop", () => {
      this.setNavigatorState("idle"), this.emitEvent({ type: "stop" });
    }), this.engine.on("error", (e) => {
      this.setNavigatorState("idle"), this.emitEvent(e);
    }), this.engine.on("ready", () => {
      this.contentQueue.length > 0 && (this.setNavigatorState("ready"), this.emitEvent({ type: "ready" }));
    }), this.engine.on("boundary", (e) => {
      this.emitEvent(e);
    }), this.engine.on("mark", (e) => {
      this.emitEvent(e);
    }), this.engine.on("voiceschanged", () => {
      this.emitEvent({ type: "voiceschanged" });
    }), this.engine.on("languagefallback", (e) => {
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
    const r = Array.isArray(e) ? e : [e];
    this.contentQueue = [...r], this.engine.loadUtterances(r), this.setNavigatorState("ready"), this.emitContentChangeEvent({ content: r });
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
      this.setNavigatorState("playing"), this.engine.resume();
    else if (this.navigatorState === "ready" || this.navigatorState === "idle")
      this.setNavigatorState("playing"), this.engine.speak();
    else if (this.navigatorState === "playing")
      return;
  }
  pause() {
    this.navigatorState === "playing" && (this.setNavigatorState("paused"), this.engine.pause());
  }
  stop() {
    this.setNavigatorState("idle"), this.engine.stop(), this.emitEvent({ type: "stop" });
  }
  skipToPosition(e, r = !1) {
    const n = this.getCurrentUtteranceIndex();
    return e < 0 || e >= this.contentQueue.length ? !1 : (e === n || (this.navigatorState === "paused" && !r ? this.engine.setCurrentUtteranceIndex(e, (i) => {
      i && this.emitEvent({
        type: "skip",
        detail: { position: e }
      });
    }) : (this.setNavigatorState("playing"), this.engine.speak(e))), !0);
  }
  // Navigation - Navigator coordinates with proper state management
  next(e = !1) {
    const r = this.getCurrentUtteranceIndex();
    return this.skipToPosition(r + 1, e);
  }
  previous(e = !1) {
    const r = this.getCurrentUtteranceIndex();
    return this.skipToPosition(r - 1, e);
  }
  jumpTo(e, r = !1) {
    return this.skipToPosition(e, r);
  }
  // Playback Parameters
  setRate(e) {
    this.engine.setRate(e);
  }
  getRate() {
    return this.engine.getRate();
  }
  setPitch(e) {
    this.engine.setPitch(e);
  }
  getPitch() {
    return this.engine.getPitch();
  }
  setVolume(e) {
    this.engine.setVolume(e);
  }
  getVolume() {
    return this.engine.getVolume();
  }
  // State - Navigator is the single source of truth
  getState() {
    return this.navigatorState;
  }
  // Events
  on(e, r) {
    return this.eventListeners.has(e) || this.eventListeners.set(e, []), this.eventListeners.get(e).push(r), () => {
      const n = this.eventListeners.get(e);
      if (n) {
        const i = n.indexOf(r);
        i > -1 && n.splice(i, 1);
      }
    };
  }
  emitEvent(e) {
    const r = this.eventListeners.get(e.type);
    r && r.forEach((n) => n(e));
  }
  emitContentChangeEvent(e) {
    const r = this.eventListeners.get("contentchange");
    r && r.forEach((n) => n({ type: "contentchange", detail: e }));
  }
  async destroy() {
    this.eventListeners.clear(), await this.engine.destroy();
  }
}
let Ca = class {
};
function Aa(t) {
  return (t.getComputedStyle(t.document.documentElement).writingMode || t.getComputedStyle(t.document.body).writingMode) === "vertical-lr";
}
function Ta(t) {
  const e = t.getComputedStyle(t.document.documentElement).writingMode || t.getComputedStyle(t.document.body).writingMode;
  return e === "vertical-rl" || e === "vertical-lr";
}
function me(t) {
  const e = Ta(t), r = e && Aa(t), n = t.innerWidth, i = t.innerHeight, s = t.document.scrollingElement, o = s.scrollLeft, a = s.scrollTop, c = parseInt(t.getComputedStyle(t.document.documentElement).getPropertyValue("column-count")), l = e && !r ? s.scrollWidth - n + o : o, h = a;
  return { isVertical: e, isVertLR: r, viewportInlineSize: e ? i : n, viewportBlockSize: e ? n : i, pageInlineSize: e ? i : n / (c || 1), xDocOffset: l, yDocOffset: h, inlineScrollOffset: e ? h : l, blockScrollOffset: e ? l : h, inlineStart: (d) => e ? d.top : d.left, blockStart: (d) => e ? d.left : d.top, inlineSize: (d) => e ? d.height : d.width, blockSize: (d) => e ? d.width : d.height, applyPosition(d, g, f, y, p, m) {
    d.style.position = "absolute", e ? (d.style.top = `${g * m}px`, d.style.left = `${f * m}px`, d.style.height = `${y * m}px`, d.style.width = `${p * m}px`) : (d.style.left = `${g * m}px`, d.style.top = `${f * m}px`, d.style.width = `${y * m}px`, d.style.height = `${p * m}px`);
  }, toRect(d, g, f, y) {
    return e ? new DOMRect(g, d, y, f) : new DOMRect(d, g, f, y);
  } };
}
function fr(t, e) {
  return t.document.documentElement.style.getPropertyValue(e);
}
function Ra(t) {
  return t && Array.isArray(t) ? t : void 0;
}
function Na(t) {
  return t && typeof t == "string" ? [t] : Ra(t);
}
function it(t) {
  return isNaN(t) ? void 0 : t;
}
function Ne(t) {
  return t.otherLocations?.get("cssSelector");
}
let ye = class Jr {
  constructor(e) {
    this.fragments = e.fragments ? e.fragments : new Array(), this.progression = e.progression, this.totalProgression = e.totalProgression, this.position = e.position, this.otherLocations = e.otherLocations;
  }
  static deserialize(e) {
    if (!e) return;
    const r = it(e.progression), n = it(e.totalProgression), i = it(e.position), s = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Set(["fragment", "fragments", "progression", "totalProgression", "position", "otherLocations"]);
    return Object.entries(e).forEach(([a, c]) => {
      o.has(a) || s.set(a, c);
    }), e.otherLocations instanceof Map && e.otherLocations.forEach((a, c) => s.set(c, a)), new Jr({ fragments: Na(e.fragments || e.fragment), progression: r !== void 0 && r >= 0 && r <= 1 ? r : void 0, totalProgression: n !== void 0 && n >= 0 && n <= 1 ? n : void 0, position: i !== void 0 && i > 0 ? i : void 0, otherLocations: s.size === 0 ? void 0 : s });
  }
  serialize() {
    const e = {};
    return this.fragments && (e.fragments = this.fragments), this.progression !== void 0 && (e.progression = this.progression), this.totalProgression !== void 0 && (e.totalProgression = this.totalProgression), this.position !== void 0 && (e.position = this.position), this.otherLocations && this.otherLocations.forEach((r, n) => e[n] = r), e;
  }
}, La = class Qr {
  constructor(e) {
    this.after = e.after, this.before = e.before, this.highlight = e.highlight;
  }
  static deserialize(e) {
    if (e) return new Qr({ after: e.after, before: e.before, highlight: e.highlight });
  }
  serialize() {
    const e = {};
    return this.after !== void 0 && (e.after = this.after), this.before !== void 0 && (e.before = this.before), this.highlight !== void 0 && (e.highlight = this.highlight), e;
  }
}, Ia = class St {
  constructor(e) {
    const r = e.href.indexOf("#"), n = r >= 0 ? e.href.slice(r + 1) : void 0;
    this.href = r >= 0 ? e.href.slice(0, r) : e.href, this.type = e.type, this.title = e.title;
    const i = e.locations?.fragments, s = n && (!i || i.length === 0);
    this.locations = e.locations ? s ? new ye({ ...e.locations, fragments: [n] }) : e.locations : n ? new ye({ fragments: [n] }) : new ye({}), this.text = e.text;
  }
  static deserialize(e) {
    if (e && e.href && e.type) return new St({ href: e.href, type: e.type, title: e.title, locations: ye.deserialize(e.locations), text: La.deserialize(e.text) });
  }
  serialize() {
    const e = { href: this.href, type: this.type };
    return this.title !== void 0 && (e.title = this.title), this.locations && (e.locations = this.locations.serialize()), this.text && (e.text = this.text.serialize()), e;
  }
  copyWithLocations(e) {
    return new St({ href: this.href, type: this.type, title: this.title, text: this.text, locations: new ye({ ...this.locations, ...e }) });
  }
};
function pr(t) {
  return t.split("").reverse().join("");
}
function qa(t, e, r) {
  const n = pr(e);
  return r.map((i) => {
    const s = Math.max(0, i.end - e.length - i.errors), o = pr(t.slice(s, i.end));
    return { start: Xr(o, n, i.errors).reduce((a, c) => i.end - c.end < a ? i.end - c.end : a, i.end), end: i.end, errors: i.errors };
  });
}
function st(t) {
  return (t | -t) >> 31 & 1;
}
function mr(t, e, r, n) {
  let i = t.P[r], s = t.M[r];
  const o = n >>> 31, a = e[r] | o, c = a | s, l = (a & i) + i ^ i | a;
  let h = s | ~(l | i), d = i & l;
  const g = st(h & t.lastRowMask[r]) - st(d & t.lastRowMask[r]);
  return h <<= 1, d <<= 1, d |= o, h |= st(n) - o, i = d | ~(c | h), s = h & c, t.P[r] = i, t.M[r] = s, g;
}
function Xr(t, e, r) {
  if (e.length === 0) return [];
  r = Math.min(r, e.length);
  const n = [], i = 32, s = Math.ceil(e.length / i) - 1, o = { P: new Uint32Array(s + 1), M: new Uint32Array(s + 1), lastRowMask: new Uint32Array(s + 1) };
  o.lastRowMask.fill(1 << 31), o.lastRowMask[s] = 1 << (e.length - 1) % i;
  const a = new Uint32Array(s + 1), c = /* @__PURE__ */ new Map(), l = [];
  for (let g = 0; g < 256; g++) l.push(a);
  for (let g = 0; g < e.length; g += 1) {
    const f = e.charCodeAt(g);
    if (c.has(f)) continue;
    const y = new Uint32Array(s + 1);
    c.set(f, y), f < l.length && (l[f] = y);
    for (let p = 0; p <= s; p += 1) {
      y[p] = 0;
      for (let m = 0; m < i; m += 1) {
        const w = p * i + m;
        w >= e.length || e.charCodeAt(w) === f && (y[p] |= 1 << m);
      }
    }
  }
  let h = Math.max(0, Math.ceil(r / i) - 1);
  const d = new Uint32Array(s + 1);
  for (let g = 0; g <= h; g += 1) d[g] = (g + 1) * i;
  d[s] = e.length;
  for (let g = 0; g <= h; g += 1) o.P[g] = -1, o.M[g] = 0;
  for (let g = 0; g < t.length; g += 1) {
    const f = t.charCodeAt(g);
    let y;
    f < l.length ? y = l[f] : (y = c.get(f), typeof y > "u" && (y = a));
    let p = 0;
    for (let m = 0; m <= h; m += 1) p = mr(o, y, m, p), d[m] += p;
    if (d[h] - p <= r && h < s && (y[h + 1] & 1 || p < 0)) {
      h += 1, o.P[h] = -1, o.M[h] = 0;
      let m;
      if (h === s) {
        const w = e.length % i;
        m = w === 0 ? i : w;
      } else m = i;
      d[h] = d[h - 1] + m - p + mr(o, y, h, p);
    } else for (; h > 0 && d[h] >= r + i; ) h -= 1;
    h === s && d[h] <= r && (d[h] < r && n.splice(0, n.length), n.push({ start: -1, end: g + 1, errors: d[h] }), r = d[h]);
  }
  return n;
}
function Pa(t, e, r) {
  const n = Xr(t, e, r);
  return qa(t, e, n);
}
function Zr(t, e, r) {
  let n = 0;
  const i = [];
  for (; n !== -1; ) n = t.indexOf(e, n), n !== -1 && (i.push({ start: n, end: n + e.length, errors: 0 }), n += 1);
  return i.length > 0 ? i : Pa(t, e, r);
}
function yr(t, e) {
  return e.length === 0 || t.length === 0 ? 0 : 1 - Zr(t, e, e.length)[0].errors / e.length;
}
function $a(t, e, r = {}) {
  if (e.length === 0) return null;
  const n = Math.min(256, e.length / 2), i = Zr(t, e, n);
  if (i.length === 0) return null;
  const s = (a) => {
    const c = 1 - a.errors / e.length, l = r.prefix ? yr(t.slice(Math.max(0, a.start - r.prefix.length), a.start), r.prefix) : 1, h = r.suffix ? yr(t.slice(a.end, a.end + r.suffix.length), r.suffix) : 1;
    let d = 1;
    return typeof r.hint == "number" && (d = 1 - Math.abs(a.start - r.hint) / t.length), (50 * c + 20 * l + 20 * h + 2 * d) / 92;
  }, o = i.map((a) => ({ start: a.start, end: a.end, score: s(a) }));
  return o.sort((a, c) => c.score - a.score), o[0];
}
function kt(t, e, r) {
  const n = r === 1 ? e : e - 1;
  if (t.charAt(n).trim() !== "") return e;
  let i, s;
  if (r === 2 ? (i = t.substring(0, e), s = i.trimEnd()) : (i = t.substring(e), s = i.trimStart()), !s.length) return -1;
  const o = i.length - s.length;
  return r === 2 ? e - o : e + o;
}
function br(t, e) {
  const r = t.commonAncestorContainer.ownerDocument.createNodeIterator(t.commonAncestorContainer, NodeFilter.SHOW_TEXT), n = e === 1 ? t.startContainer : t.endContainer, i = e === 1 ? t.endContainer : t.startContainer;
  let s = r.nextNode();
  for (; s && s !== n; ) s = r.nextNode();
  e === 2 && (s = r.previousNode());
  let o = -1;
  const a = () => {
    if (s = e === 1 ? r.nextNode() : r.previousNode(), s) {
      const c = s.textContent, l = e === 1 ? 0 : c.length;
      o = kt(c, l, e);
    }
  };
  for (; s && o === -1 && s !== i; ) a();
  if (s && o >= 0) return { node: s, offset: o };
  throw new RangeError("No text nodes with non-whitespace text found in range");
}
function Da(t) {
  if (!t.toString().trim().length) throw new RangeError("Range contains no non-whitespace text");
  if (t.startContainer.nodeType !== Node.TEXT_NODE) throw new RangeError("Range startContainer is not a text node");
  if (t.endContainer.nodeType !== Node.TEXT_NODE) throw new RangeError("Range endContainer is not a text node");
  const e = t.cloneRange();
  let r = !1, n = !1;
  const i = { start: kt(t.startContainer.textContent, t.startOffset, 1), end: kt(t.endContainer.textContent, t.endOffset, 2) };
  if (i.start >= 0 && (e.setStart(t.startContainer, i.start), r = !0), i.end > 0 && (e.setEnd(t.endContainer, i.end), n = !0), r && n) return e;
  if (!r) {
    const { node: s, offset: o } = br(e, 1);
    s && o >= 0 && e.setStart(s, o);
  }
  if (!n) {
    const { node: s, offset: o } = br(e, 2);
    s && o > 0 && e.setEnd(s, o);
  }
  return e;
}
function Yr(t) {
  switch (t.nodeType) {
    case Node.ELEMENT_NODE:
    case Node.TEXT_NODE:
      return t.textContent?.length ?? 0;
    default:
      return 0;
  }
}
function vr(t) {
  let e = t.previousSibling, r = 0;
  for (; e; ) r += Yr(e), e = e.previousSibling;
  return r;
}
function en(t, ...e) {
  let r = e.shift();
  const n = t.ownerDocument.createNodeIterator(t, NodeFilter.SHOW_TEXT), i = [];
  let s = n.nextNode(), o, a = 0;
  for (; r !== void 0 && s; ) o = s, a + o.data.length > r ? (i.push({ node: o, offset: r - a }), r = e.shift()) : (s = n.nextNode(), a += o.data.length);
  for (; r !== void 0 && o && a === r; ) i.push({ node: o, offset: o.data.length }), r = e.shift();
  if (r !== void 0) throw new RangeError("Offset exceeds text length");
  return i;
}
let Le = class te {
  constructor(e, r) {
    if (r < 0) throw new Error("Offset is invalid");
    this.element = e, this.offset = r;
  }
  relativeTo(e) {
    if (!e.contains(this.element)) throw new Error("Parent is not an ancestor of current element");
    let r = this.element, n = this.offset;
    for (; r !== e; ) n += vr(r), r = r.parentElement;
    return new te(r, n);
  }
  resolve(e = {}) {
    try {
      return en(this.element, this.offset)[0];
    } catch (r) {
      if (this.offset === 0 && e.direction !== void 0) {
        const n = document.createTreeWalker(this.element.getRootNode(), NodeFilter.SHOW_TEXT);
        n.currentNode = this.element;
        const i = e.direction === 1, s = i ? n.nextNode() : n.previousNode();
        if (!s) throw r;
        return { node: s, offset: i ? 0 : s.data.length };
      } else throw r;
    }
  }
  static fromCharOffset(e, r) {
    switch (e.nodeType) {
      case Node.TEXT_NODE:
        return te.fromPoint(e, r);
      case Node.ELEMENT_NODE:
        return new te(e, r);
      default:
        throw new Error("Node is not an element or text node");
    }
  }
  static fromPoint(e, r) {
    switch (e.nodeType) {
      case Node.TEXT_NODE: {
        if (r < 0 || r > e.data.length) throw new Error("Text node offset is out of range");
        if (!e.parentElement) throw new Error("Text node has no parent");
        const n = vr(e) + r;
        return new te(e.parentElement, n);
      }
      case Node.ELEMENT_NODE: {
        if (r < 0 || r > e.childNodes.length) throw new Error("Child node offset is out of range");
        let n = 0;
        for (let i = 0; i < r; i++) n += Yr(e.childNodes[i]);
        return new te(e, n);
      }
      default:
        throw new Error("Point is not in an element or text node");
    }
  }
}, Ot = class ve {
  constructor(e, r) {
    this.start = e, this.end = r;
  }
  relativeTo(e) {
    return new ve(this.start.relativeTo(e), this.end.relativeTo(e));
  }
  toRange() {
    let e, r;
    this.start.element === this.end.element && this.start.offset <= this.end.offset ? [e, r] = en(this.start.element, this.start.offset, this.end.offset) : (e = this.start.resolve({ direction: 1 }), r = this.end.resolve({ direction: 2 }));
    const n = new Range();
    return n.setStart(e.node, e.offset), n.setEnd(r.node, r.offset), n;
  }
  static fromRange(e) {
    const r = Le.fromPoint(e.startContainer, e.startOffset), n = Le.fromPoint(e.endContainer, e.endOffset);
    return new ve(r, n);
  }
  static fromOffsets(e, r, n) {
    return new ve(new Le(e, r), new Le(e, n));
  }
  static trimmedRange(e) {
    return Da(ve.fromRange(e).toRange());
  }
}, Ba = class xt {
  constructor(e, r, n) {
    this.root = e, this.start = r, this.end = n;
  }
  static fromRange(e, r) {
    const n = Ot.fromRange(r).relativeTo(e);
    return new xt(e, n.start.offset, n.end.offset);
  }
  static fromSelector(e, r) {
    return new xt(e, r.start, r.end);
  }
  toSelector() {
    return { type: "TextPositionSelector", start: this.start, end: this.end };
  }
  toRange() {
    return Ot.fromOffsets(this.root, this.start, this.end).toRange();
  }
}, ja = class Et {
  constructor(e, r, n = {}) {
    this.root = e, this.exact = r, this.context = n;
  }
  static fromRange(e, r) {
    const n = e.textContent, i = Ot.fromRange(r).relativeTo(e), s = i.start.offset, o = i.end.offset, a = 32;
    return new Et(e, n.slice(s, o), { prefix: n.slice(Math.max(0, s - a), s), suffix: n.slice(o, Math.min(n.length, o + a)) });
  }
  static fromSelector(e, r) {
    const { prefix: n, suffix: i } = r;
    return new Et(e, r.exact, { prefix: n, suffix: i });
  }
  toSelector() {
    return { type: "TextQuoteSelector", exact: this.exact, prefix: this.context.prefix, suffix: this.context.suffix };
  }
  toRange(e = {}) {
    return this.toPositionAnchor(e).toRange();
  }
  toPositionAnchor(e = {}) {
    const r = this.root.textContent, n = $a(r, this.exact, { ...this.context, hint: e.hint });
    if (!n) throw new Error("Quote not found");
    return new Ba(this.root, n.start, n.end);
  }
};
function Ua(t) {
  const e = t.tagName.toUpperCase();
  return e === "IMG" || e === "VIDEO" || e === "AUDIO" || e === "IFRAME" || e === "OBJECT" || e === "EMBED" || e === "CANVAS";
}
function za(t, e) {
  try {
    const r = e.locations, n = e.text;
    if (n && n.highlight) {
      let i;
      r && Ne(r) && (i = t.querySelector(Ne(r))), i || (i = t.body);
      const s = new ja(i, n.highlight, { prefix: n.before, suffix: n.after });
      try {
        return s.toRange();
      } catch {
        return console.warn("Quote not found:", s), null;
      }
    }
    if (r) {
      let i = null;
      if (!i && Ne(r) && (i = t.querySelector(Ne(r))), !i && r.fragments) {
        for (const s of r.fragments) if (i = t.getElementById(s), i) break;
      }
      if (i) {
        const s = t.createRange();
        return i.childNodes.length === 0 || Ua(i) ? (s.selectNode(i), s) : (s.setStartBefore(i), s.setEndAfter(i), s);
      }
    }
  } catch (r) {
    console.error(r);
  }
  return null;
}
function Ha(t, e) {
  const r = e.map((c) => c.toUpperCase()), n = [], i = t.commonAncestorContainer, s = i.nodeType === Node.TEXT_NODE ? i.parentNode : i, o = t.startContainer.ownerDocument.createTreeWalker(s, NodeFilter.SHOW_TEXT);
  let a = o.nextNode();
  for (; a; ) {
    if (t.intersectsNode(a)) {
      let c = a.parentNode, l = !1;
      for (; c; ) {
        if (c.nodeType === Node.ELEMENT_NODE && r.includes(c.tagName.toUpperCase())) {
          l = !0;
          break;
        }
        c = c.parentNode;
      }
      if (!l) {
        const h = t.cloneRange();
        h.selectNode(a), h.compareBoundaryPoints(Range.START_TO_START, t) < 0 && h.setStart(t.startContainer, t.startOffset), h.compareBoundaryPoints(Range.END_TO_END, t) > 0 && h.setEnd(t.endContainer, t.endOffset);
        for (const d of h.getClientRects()) n.push({ left: d.left, right: d.right, top: d.top, bottom: d.bottom, width: d.width, height: d.height });
      }
    }
    a = o.nextNode();
  }
  return n;
}
function Ie(t, e, r = !1, n = 0) {
  let i;
  if (Array.isArray(t)) i = t;
  else {
    let l = t.getClientRects();
    l.length || t.commonAncestorContainer.nodeType === Node.ELEMENT_NODE && (l = t.commonAncestorContainer.getClientRects()), i = [];
    for (const h of l) i.push({ bottom: h.bottom, height: h.height, left: h.left, right: h.right, top: h.top, width: h.width });
  }
  if (n) for (const l of i) l.left -= n, l.top -= n, l.right += n, l.bottom += n, l.width += n * 2, l.height += n * 2;
  const s = tn(i, 1, e, r), o = Fa(s, 1), a = rn(o), c = 4;
  for (let l = a.length - 1; l >= 0; l--) {
    const h = a[l];
    if (!(h.width * h.height > c)) if (a.length > 1) a.splice(l, 1);
    else break;
  }
  return a;
}
function tn(t, e, r, n = !1) {
  for (let i = 0; i < t.length; i++) for (let s = i + 1; s < t.length; s++) {
    const o = t[i], a = t[s];
    if (o === a) continue;
    const c = P(o.top, a.top, e) && P(o.bottom, a.bottom, e), l = P(o.left, a.left, e) && P(o.right, a.right, e);
    if ((l && !r && !n || c && !l) && nn(o, a, e)) {
      const h = t.filter((g) => g !== o && g !== a), d = _a(o, a);
      return h.push(d), tn(h, e, r, n);
    }
  }
  return t;
}
function _a(t, e) {
  const r = Math.min(t.left, e.left), n = Math.max(t.right, e.right), i = Math.min(t.top, e.top), s = Math.max(t.bottom, e.bottom);
  return { bottom: s, height: s - i, left: r, right: n, top: i, width: n - r };
}
function Fa(t, e) {
  const r = new Set(t);
  for (const n of t) {
    if (!(n.width > 1 && n.height > 1)) {
      r.delete(n);
      continue;
    }
    for (const i of t) if (n !== i && r.has(i) && Ma(i, n, e)) {
      r.delete(n);
      break;
    }
  }
  return Array.from(r);
}
function Ma(t, e, r) {
  return W(t, e.left, e.top, r) && W(t, e.right, e.top, r) && W(t, e.left, e.bottom, r) && W(t, e.right, e.bottom, r);
}
function W(t, e, r, n) {
  return (t.left < e || P(t.left, e, n)) && (t.right > e || P(t.right, e, n)) && (t.top < r || P(t.top, r, n)) && (t.bottom > r || P(t.bottom, r, n));
}
function rn(t) {
  for (let e = 0; e < t.length; e++) for (let r = e + 1; r < t.length; r++) {
    const n = t[e], i = t[r];
    if (n !== i && nn(n, i, -1)) {
      let s = [], o;
      const a = wr(n, i);
      if (a.length === 1) s = a, o = n;
      else {
        const l = wr(i, n);
        a.length < l.length ? (s = a, o = n) : (s = l, o = i);
      }
      const c = t.filter((l) => l !== o);
      return Array.prototype.push.apply(c, s), rn(c);
    }
  }
  return t;
}
function wr(t, e) {
  const r = Va(e, t);
  if (r.height === 0 || r.width === 0) return [t];
  const n = [];
  {
    const i = { bottom: t.bottom, height: 0, left: t.left, right: r.left, top: t.top, width: 0 };
    i.width = i.right - i.left, i.height = i.bottom - i.top, i.height !== 0 && i.width !== 0 && n.push(i);
  }
  {
    const i = { bottom: r.top, height: 0, left: r.left, right: r.right, top: t.top, width: 0 };
    i.width = i.right - i.left, i.height = i.bottom - i.top, i.height !== 0 && i.width !== 0 && n.push(i);
  }
  {
    const i = { bottom: t.bottom, height: 0, left: r.left, right: r.right, top: r.bottom, width: 0 };
    i.width = i.right - i.left, i.height = i.bottom - i.top, i.height !== 0 && i.width !== 0 && n.push(i);
  }
  {
    const i = { bottom: t.bottom, height: 0, left: r.right, right: t.right, top: t.top, width: 0 };
    i.width = i.right - i.left, i.height = i.bottom - i.top, i.height !== 0 && i.width !== 0 && n.push(i);
  }
  return n;
}
function Va(t, e) {
  const r = Math.max(t.left, e.left), n = Math.min(t.right, e.right), i = Math.max(t.top, e.top), s = Math.min(t.bottom, e.bottom);
  return { bottom: s, height: Math.max(0, s - i), left: r, right: n, top: i, width: Math.max(0, n - r) };
}
function nn(t, e, r) {
  return (t.left < e.right || r >= 0 && P(t.left, e.right, r)) && (e.left < t.right || r >= 0 && P(e.left, t.right, r)) && (t.top < e.bottom || r >= 0 && P(t.top, e.bottom, r)) && (e.top < t.bottom || r >= 0 && P(e.top, t.bottom, r));
}
function P(t, e, r) {
  return Math.abs(t - e) <= r;
}
let qe = null, at = null, be = 0;
const re = { r: 255, g: 255, b: 255, a: 1 }, Z = /* @__PURE__ */ new Map(), Wa = () => {
  if (!qe) if (typeof OffscreenCanvas < "u") qe = new OffscreenCanvas(5, 5), at = qe.getContext("2d", { willReadFrequently: !0, desynchronized: !0 });
  else {
    const t = document.createElement("canvas");
    t.width = 5, t.height = 5, qe = t, at = t.getContext("2d", { willReadFrequently: !0, desynchronized: !0 });
  }
  return at;
}, Ga = (t) => {
  if (!t) return !0;
  const e = t.trim().toLowerCase();
  return e.startsWith("var(") || ["transparent", "currentcolor", "inherit", "initial", "revert", "unset", "revert-layer"].includes(e) ? !0 : ["linear-gradient", "radial-gradient", "conic-gradient", "repeating-linear-gradient", "repeating-radial-gradient", "repeating-conic-gradient"].some((r) => e.includes(r));
}, Pe = (t, e) => {
  console.warn(`[Decorator] Could not parse color: "${t}". ${e} Falling back to ${JSON.stringify(re)} to compute contrast. Please use a CSS color value that can be computed to RGB(A).`);
}, J = (t, e = null) => {
  const r = e ? `${t}|${e}` : t, n = Z.get(r);
  if (n !== void 0) return n ?? re;
  if (Ga(t)) return Pe(t, "Unsupported color format or special value."), Z.set(r, null), re;
  const i = Wa();
  if (!i) return Pe(t, "Could not get canvas context."), Z.set(r, null), re;
  try {
    be === 0 && i.clearRect(0, 0, 5, 5);
    const s = be % 5, o = Math.floor(be / 5);
    i.clearRect(s, o, 1, 1), e && (i.fillStyle = e, i.fillRect(s, o, 1, 1)), i.fillStyle = t, i.fillRect(s, o, 1, 1);
    const a = i.getImageData(s, o, 1, 1);
    be = (be + 1) % 25;
    const [c, l, h, d] = a.data;
    if (d === 0) return Pe(t, "Fully transparent color."), Z.set(r, null), re;
    const g = { r: c, g: l, b: h, a: d / 255 };
    return Z.set(r, g), g;
  } catch (s) {
    return Pe(t, `Error: ${s instanceof Error ? s.message : String(s)}`), Z.set(r, null), re;
  }
}, ot = (t) => {
  const e = t / 255;
  return e <= 0.03928 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4);
}, Ct = (t) => {
  const e = ot(t.r), r = ot(t.g), n = ot(t.b);
  return 0.2126 * e + 0.7152 * r + 0.0722 * n;
}, ze = (t, e) => {
  const r = typeof t == "string" ? J(t) : t, n = typeof e == "string" ? J(e) : e, i = Ct(r), s = Ct(n), o = Math.max(i, s), a = Math.min(i, s);
  return (o + 0.05) / (a + 0.05);
}, sn = (t, e = null) => {
  const r = J(t, e), n = ze(r, { r: 255, g: 255, b: 255, a: 1 }), i = ze(r, { r: 0, g: 0, b: 0, a: 1 });
  return n > i;
}, Sr = (t, e = null) => sn(t, e) ? "white" : "black", Ka = (t) => {
  const e = t.a !== void 0 ? t.a : 1;
  return `rgba(${Math.round(t.r)}, ${Math.round(t.g)}, ${Math.round(t.b)}, ${e})`;
}, Ja = (t, e) => ({ r: Math.min(255, t.r + (255 - t.r) * e), g: Math.min(255, t.g + (255 - t.g) * e), b: Math.min(255, t.b + (255 - t.b) * e), a: t.a ?? 1 }), Qa = (t, e) => ({ r: Math.max(0, t.r * (1 - e)), g: Math.max(0, t.g * (1 - e)), b: Math.max(0, t.b * (1 - e)), a: t.a ?? 1 }), Y = (t, e = null, r = 3) => {
  const n = J(t), i = e ? J(e) : { r: 255, g: 255, b: 255, a: 1 };
  let s = ze(n, i);
  if (s >= r) return t;
  const o = Ct(i) < 0.5;
  let a = { ...n, a: n.a ?? 1 };
  const c = 20, l = 0.1;
  for (let h = 0; h < c && (o ? a = Ja(a, l) : a = Qa(a, l), s = ze(a, i), !(s >= r)); h++) ;
  return Ka(a);
}, an = () => typeof navigator > "u" ? "" : navigator.userAgent || "", on = () => typeof navigator > "u" ? void 0 : navigator.userAgentData || void 0;
let ln = class {
  constructor() {
    const e = on(), r = an(), n = (s) => (typeof s == "string" || typeof s == "number") && s ? String(s).replace(/_/g, ".").split(".").map((o) => parseInt(o) || 0) : [], i = (s = "") => {
      if (!s) return [];
      const o = new RegExp("^.*" + s + "[ :\\/]?(\\d+([\\._]\\d+)*).*$");
      return o.test(r) ? n(r.replace(o, "$1")) : [];
    };
    this.OS = ((s) => (/(macOS|Mac OS X)/.test(r) ? (/\(iP(hone|od touch);/.test(r) && (s.iOS = i("CPU (?:iPhone )?OS ")), /\(iPad;/.test(r) ? s.iOS = s.iPadOS = i("CPU (?:iPhone )?OS ") : /(macOS|Mac OS X) \d/.test(r) && (document.ontouchend !== void 0 ? s.iOS = s.iPadOS = i() : s.macOS = i("(?:macOS|Mac OS X) "))) : /Windows( NT)? \d/.test(r) ? s.Windows = ((o) => o[0] !== 6 || !o[1] ? o : o[1] === 1 ? [7] : o[1] === 2 ? [8] : [8, 1])(i("Windows(?: NT)?")) : /Android \d/.test(r) ? s.Android = i("Android") : /CrOS/.test(r) ? s.ChromeOS = i() : /X11;/.test(r) && (s.Linux = i()), s))({}), e && e.getHighEntropyValues(["architecture", "model", "platform", "platformVersion", "uaFullVersion"]).then((s) => ((o) => {
      const a = s.platform, c = s.platformVersion;
      if (!(!a || !c)) {
        if (/^i(OS|P(hone|od touch))$/.test(a)) o.iOS = n(c);
        else if (/^iPad(OS)?$/.test(a)) o.iOS = o.iPadOS = n(c);
        else if (/^(macOS|(Mac )?OS X|Mac(Intel)?)$/.test(a)) document.ontouchend !== void 0 ? o.iOS = o.iPadOS = n() : o.macOS = n(c);
        else if (/^(Microsoft )?Windows$/.test(a)) o.Windows = n(c);
        else if (/^(Google )?Android$/.test(a)) o.Android = n(c);
        else if (/^((Google )?Chrome OS|CrOS)$/.test(a)) o.ChromeOS = n(c);
        else if (/^(Linux|Ubuntu|X11)$/.test(a)) o.Linux = n(c);
        else return;
        Object.keys(this.OS).forEach((l) => delete this.OS[l]), Object.assign(this.OS, o);
      }
    })({})), this.UA = ((s) => {
      let o = !1;
      if (e && Array.isArray(e.brands)) {
        const a = e.brands.reduce((c, l) => (c[l.brand] = [l.version * 1], c), {});
        a["Google Chrome"] ? (o = !0, s.Blink = s.Chromium = a.Chromium || [], s.Chrome = a["Google Chrome"]) : a["Microsoft Edge"] ? (o = !0, s.Blink = s.Chromium = a.Chromium || [], s.Edge = a["Microsoft Edge"]) : a.Opera && (o = !0, s.Blink = s.Chromium = a.Chromium || [], s.Opera = a.Opera);
      }
      return o || (/ Gecko\/\d/.test(r) ? (s.Gecko = i("rv"), / Waterfox\/\d/.test(r) ? s.Waterfox = i("Waterfox") : / Firefox\/\d/.test(r) && (s.Firefox = i("Firefox"))) : / Edge\/\d/.test(r) ? (s.EdgeHTML = i("Edge"), s.Edge = s.EdgeHTML) : / Chrom(ium|e)\/\d/.test(r) ? (s.Blink = s.Chromium = ((a) => a[0] ? a : i("Chrome"))(i("Chromium")), / EdgA?\/\d/.test(r) ? s.Edge = ((a) => a[0] ? a : i("Edg"))(i("EdgA")) : / OPR\/\d/.test(r) ? s.Opera = i("OPR") : / Vivaldi\/\d/.test(r) ? s.Vivaldi = i("Vivaldi") : / Silk\/\d/.test(r) ? s.Silk = i("Silk") : / UCBrowser\/\d/.test(r) ? s.UCBrowser = i("UCBrowser") : / Phoebe\/\d/.test(r) ? s.Phoebe = i("Phoebe") : s.Chrome = ((a) => a[0] ? a : s.Chromium)(i("Chrome"))) : / AppleWebKit\/\d/.test(r) ? (s.WebKit = i("AppleWebKit"), / CriOS \d/.test(r) ? s.Chrome = i("CriOS") : / FxiOS \d/.test(r) ? s.Firefox = i("FxiOS") : / EdgiOS\/\d/.test(r) ? s.Edge = i("EdgiOS") : / Version\/\d/.test(r) && (s.Safari = i("Version"))) : / Trident\/\d/.test(r) && (s.Trident = i("Trident"), s.InternetExplorer = ((a) => a[0] ? a : i("MSIE"))(i("rv")))), /[\[; ]FB(AN|_IAB)\//.test(r) && (s.Facebook = i("FBAV")), / Line\/\d/.test(r) && (s.LINE = i("Line")), s;
    })({}), this.Env = { get: () => [this.OS, this.UA].reduce((s, o) => {
      for (const a in o) o[a] && s.push(a);
      return s;
    }, []) };
  }
};
class Xa extends ln {
  get iOSRequest() {
    const e = on(), r = an();
    if (this.OS.iOS && !this.OS.iPadOS) return "mobile";
    if (this.OS.iPadOS) return /\(iPad;/.test(r) || e && /^iPad(OS)?$/.test(e.platform) ? "mobile" : "desktop";
  }
}
const Za = new ln();
new Xa();
const kr = ["div", "span", "p", "br", "hr", "b", "i", "em", "strong", "s", "u", "mark", "small", "sub", "sup", "abbr", "cite", "code", "data", "dfn", "kbd", "q", "samp", "time", "var", "blockquote", "pre", "svg", "g", "path", "circle", "ellipse", "rect", "line", "polygon", "polyline", "text", "tspan", "defs", "use"], Ya = /^on/i, eo = /* @__PURE__ */ new Set(["href", "src", "action", "formaction", "xlink:href"]), to = /^\s*(javascript|data):/i;
function ro(t, e) {
  const r = t.document.createElement("div");
  if ("Sanitizer" in t && typeof r.setHTML == "function") try {
    const i = new t.Sanitizer({ allowElements: kr });
    return r.setHTML(e, { sanitizer: i }), r.firstElementChild;
  } catch {
  }
  const n = t.document.implementation.createHTMLDocument("");
  for (n.body.innerHTML = e, no(n.body, new Set(kr)); n.body.firstChild; ) r.appendChild(t.document.adoptNode(n.body.firstChild));
  return r.firstElementChild;
}
function no(t, e) {
  const r = Array.from(t.querySelectorAll("*")).reverse();
  for (const n of r) {
    if (!e.has(n.localName)) {
      n.replaceWith(...Array.from(n.childNodes));
      continue;
    }
    for (const { name: i, value: s } of Array.from(n.attributes)) (Ya.test(i) || eo.has(i) && to.test(s)) && n.removeAttribute(i);
  }
}
function lt(t) {
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
var io = ((t) => (t.Wrap = "wrap", t.Viewport = "viewport", t.Bounds = "bounds", t.Page = "page", t))(io || {}), so = ((t) => (t.Boxes = "boxes", t.Bounds = "bounds", t))(so || {});
const ao = () => "Highlight" in window, Or = ["IMG", "IMAGE", "AUDIO", "VIDEO", "SVG"];
class oo {
  constructor(e, r, n, i) {
    this.wnd = e, this.comms = r, this.id = n, this.name = i, this.items = [], this.lastItemId = 0, this.container = void 0, this._activatable = !1, this._hoverable = !1, this.hoveredItem = void 0, this.experimentalHighlights = !1, this._tintSubKeys = /* @__PURE__ */ new Map(), this._subKeyCounter = 0, this.maskSvg = void 0, this.shadowHost = void 0, this.shadowRoot = void 0, this.currentRender = 0, ao() && (this.experimentalHighlights = !0, this.notTextFlag = /* @__PURE__ */ new Map()), this.activationHandler = this.handleActivation.bind(this), this.wnd.document.addEventListener("pointerup", this.activationHandler), this.hoverHandler = this.handleHover.bind(this), this.wnd.document.addEventListener("pointermove", this.hoverHandler);
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
      const r = this.hoveredItem.range.getBoundingClientRect(), n = this.wnd.devicePixelRatio;
      this.comms.send("decoration_pointer_leave", { decorationId: this.hoveredItem.decoration.id, group: this.name, rect: { top: r.top * n, left: r.left * n, width: r.width * n, height: r.height * n } }), this.hoveredItem = void 0;
    }
  }
  add(e) {
    const r = `${this.id}-${this.lastItemId++}`, n = za(this.wnd.document, e.locator);
    if (!n) {
      this.comms.log("Can't locate DOM range for decoration", e);
      return;
    }
    const i = n.commonAncestorContainer;
    if (i.nodeType !== Node.TEXT_NODE && this.experimentalHighlights && (Or.includes(i.nodeName.toUpperCase()) && this.notTextFlag?.set(r, !0), n.cloneContents().querySelector(Or.join(", ").toLowerCase()) && this.notTextFlag?.set(r, !0), (i.textContent?.trim() || "").length === 0 && this.notTextFlag?.set(r, !0)), this.experimentalHighlights && !this.notTextFlag?.has(r)) {
      const o = (a) => {
        for (; a && a.nodeType === Node.ELEMENT_NODE; ) {
          if (a.namespaceURI?.includes("svg")) return !0;
          a = a.parentNode;
        }
        return !1;
      };
      (o(n.startContainer) || o(n.endContainer)) && this.notTextFlag?.set(r, !0);
    }
    if (this.experimentalHighlights) {
      const { type: o } = e.style, { layout: a, width: c, expand: l } = e.style;
      o !== C.TextColor && (o === C.Outline || o === C.Template || o === C.Mask || a !== void 0 && a !== "boxes" || c !== void 0 && c !== "wrap" || l) && this.notTextFlag?.set(r, !0);
    }
    const s = { decoration: e, id: r, range: n, hitRects: [], clickableElements: void 0, container: void 0 };
    this.items.push(s), this.layout(s), s.hitRects = this.clientRectsToDocCoords(Ie(s.range, !1, !1, (s.decoration.style.expand ?? 0) + this.hitGap())), this.renderLayout([s]);
  }
  remove(e) {
    const r = this.items.findIndex((s) => s.decoration.id === e);
    if (r < 0) return;
    const n = this.items[r], i = n.decoration.style?.type === C.Mask;
    if (this.items.splice(r, 1), n.clickableElements = void 0, n.container && (n.container.remove(), n.container = void 0), this.experimentalHighlights && !this.notTextFlag?.has(n.id) && n.highlightSubKey) {
      const s = this.wnd.CSS.highlights;
      s.get(n.highlightSubKey)?.delete(n.range), this.items.some((a) => a.highlightSubKey === n.highlightSubKey) || s.delete(n.highlightSubKey);
      const o = this.wnd.document.getElementById(`${this.id}-style`);
      o && this._rebuildHighlightStylesheet(o);
    }
    this.notTextFlag?.delete(n.id), this.hoveredItem === n && (this.hoveredItem = void 0), i && this.updateSharedMask();
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
    const r = me(this.wnd), n = r.xDocOffset, i = r.yDocOffset;
    return n === 0 && i === 0 ? e : e.map((s) => ({ left: s.left + n, top: s.top + i, right: s.right + n, bottom: s.bottom + i, width: s.width, height: s.height }));
  }
  pointerToDocCoords(e) {
    const r = me(this.wnd);
    return { docX: e.clientX + r.xDocOffset, docY: e.clientY + r.yDocOffset };
  }
  effectiveZoom() {
    if (!Za.UA.Blink) return 1;
    const e = parseFloat(this.wnd.getComputedStyle(this.wnd.document.documentElement).zoom), r = parseFloat(this.wnd.getComputedStyle(this.wnd.document.body).zoom);
    return (e || 1) * (r || 1);
  }
  hitGap() {
    return 2 * this.effectiveZoom();
  }
  handleActivation(e) {
    if (!this._activatable) return;
    const { docX: r, docY: n } = this.pointerToDocCoords(e), i = this.wnd.devicePixelRatio;
    for (const s of this.items) {
      let o;
      if (s.decoration.style.type === C.Template) for (const a of s.clickableElements ?? []) {
        const c = a.getBoundingClientRect();
        if (W(c, e.clientX, e.clientY, 0)) {
          o = c;
          break;
        }
      }
      else for (const a of s.hitRects) if (W(a, r, n, 0)) {
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
    const { docX: r, docY: n } = this.pointerToDocCoords(e), i = this.wnd.devicePixelRatio;
    let s, o;
    for (const a of this.items) {
      if (a.decoration.style.type === C.Template) for (const c of a.clickableElements ?? []) {
        const l = c.getBoundingClientRect();
        if (W(l, e.clientX, e.clientY, 0)) {
          s = a, o = l;
          break;
        }
      }
      else for (const c of a.hitRects) if (W(c, r, n, 0)) {
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
          this.layout(e), e.hitRects = this.clientRectsToDocCoords(Ie(e.range, !1, !1, (e.decoration.style.expand ?? 0) + this.hitGap()));
        }), this.renderLayout(this.items), this.updateSharedMask();
      });
    });
  }
  experimentalLayout(e) {
    const r = this.requireContainer(!0), n = this.wnd.CSS.highlights, i = e.decoration.style, s = i.type ?? C.Highlight, o = i.tint ?? lt(s), a = i.width, c = i.layout, l = this._getSubKey(s, o);
    e.highlightSubKey && (n.get(e.highlightSubKey)?.delete(e.range), e.highlightSubKey !== l && !this.items.some((p) => p !== e && p.highlightSubKey === e.highlightSubKey) && n.delete(e.highlightSubKey)), e.highlightSubKey = l;
    let h;
    n.has(l) ? h = n.get(l) : (h = new this.wnd.Highlight(), n.set(l, h));
    const d = (p, m) => this.wnd.document.caretPositionFromPoint?.(p, m) ?? null;
    if (s === C.TextColor && (c === "bounds" || a === "bounds" || a === "page")) {
      const p = me(this.wnd);
      if (p.isVertical) console.warn("Vertical writing detected: caretPositionFromPoint has known bugs, falling back to original range"), h.add(e.range);
      else {
        const m = e.range.getBoundingClientRect();
        let w, E;
        a === "page" ? (w = Math.floor(p.inlineStart(m) / p.pageInlineSize) * p.pageInlineSize, E = p.pageInlineSize) : (w = p.inlineStart(m), E = p.inlineSize(m));
        const x = d(w, p.blockStart(m) + 1), N = d(w + E, p.blockStart(m) + p.blockSize(m) - 1);
        if (x && N) {
          const I = this.wnd.document.createRange();
          I.setStart(x.offsetNode, x.offset), I.setEnd(N.offsetNode, N.offset), h.add(I), e.range = I;
        } else h.add(e.range);
      }
    } else h.add(e.range);
    const g = this.getBackgroundColor(), f = i.enforceContrast !== !1 ? Y(o, g) : o;
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
        const { r: p, g: m, b: w } = J(f), E = `rgba(${p}, ${m}, ${w}, 0.3)`;
        y = `::highlight(${l}) {
                    color: ${Sr(f, g)};
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
                    color: ${Sr(f, g)};
                    background-color: ${f};
                }`;
    }
    e.highlightCSS = y, this._rebuildHighlightStylesheet(r);
  }
  _getSubKey(e, r) {
    const n = `${e}::${r}`;
    let i = this._tintSubKeys.get(n);
    return i || (i = `${this.id}--${this._subKeyCounter++}`, this._tintSubKeys.set(n, i)), i;
  }
  _rebuildHighlightStylesheet(e) {
    const r = /* @__PURE__ */ new Set(), n = [];
    for (const i of this.items) i.highlightSubKey && i.highlightCSS && !r.has(i.highlightSubKey) && (r.add(i.highlightSubKey), n.push(i.highlightCSS));
    e.innerHTML = n.join(`
`);
  }
  layout(e) {
    if (this.experimentalHighlights && !this.notTextFlag?.has(e.id)) return this.experimentalLayout(e);
    const r = this.wnd.document.createElement("div");
    r.setAttribute("id", e.id), r.dataset.highlightId = e.decoration.id, r.style.setProperty("pointer-events", "none");
    const n = me(this.wnd), i = 1 / this.effectiveZoom(), s = e.decoration.style.expand ?? 0, o = (d, g, f, y = 0) => {
      const p = e.decoration?.style?.width, m = g;
      switch (p) {
        case "viewport": {
          const w = Math.floor(n.inlineStart(m) / n.viewportInlineSize) * n.viewportInlineSize;
          n.applyPosition(d, w + n.inlineScrollOffset + y, n.blockStart(m) + n.blockScrollOffset, n.viewportInlineSize - 2 * y, n.blockSize(m), i);
          break;
        }
        case "page": {
          const w = Math.floor(n.inlineStart(m) / n.pageInlineSize) * n.pageInlineSize;
          n.applyPosition(d, w + n.inlineScrollOffset + y, n.blockStart(m) + n.blockScrollOffset, n.pageInlineSize - 2 * y, n.blockSize(m), i);
          break;
        }
        case "bounds": {
          n.applyPosition(d, n.inlineStart(f) + n.inlineScrollOffset, n.blockStart(m) + n.blockScrollOffset, n.inlineSize(f), n.blockSize(m), i);
          break;
        }
        default:
          n.applyPosition(d, n.inlineStart(m) + n.inlineScrollOffset, n.blockStart(m) + n.blockScrollOffset, n.inlineSize(m), n.blockSize(m), i);
      }
    }, a = e.range.getBoundingClientRect(), c = e.decoration.style, l = (() => {
      if (c.type !== C.Outline) return 0;
      const d = c.width;
      return d === "page" || d === "viewport" ? 3 : 0;
    })();
    let h;
    if (c.type === C.Template) {
      c.stylesheet && this.injectCustomStylesheet(c.stylesheet);
      const d = ro(this.wnd, c.element);
      if (!d) {
        e.container = r, e.clickableElements = [];
        return;
      }
      d.style.setProperty("pointer-events", "none"), h = d;
    } else {
      const d = c, g = d.type ?? C.Highlight, f = d.tint ?? lt(g);
      if (g === C.TextColor) {
        e.container = r, e.clickableElements = [];
        return;
      }
      if (g === C.Mask) {
        e.container = r, e.clickableElements = [], this.updateSharedMask();
        return;
      }
      const y = this.getCurrentDarkMode(), p = this.getBackgroundColor(), m = d.enforceContrast !== !1, w = (() => {
        switch (g) {
          case C.Underline: {
            const x = m ? Y(f, p) : f, N = d.layout === "bounds", [I, q] = n.isVertical ? ["border-right", "border-left"] : ["border-bottom", "border-top"];
            return [N ? `${q}: 0.1em solid ${x} !important` : null, `${I}: 0.1em solid ${x} !important`, "background-color: transparent !important", "box-sizing: border-box !important"].filter(Boolean).join("; ");
          }
          case C.Strikethrough: {
            const x = m ? Y(f, p) : f;
            return d.layout === "bounds" ? [`background: repeating-linear-gradient(-45deg, transparent, transparent 19px, ${x} 19px, ${x} 20px) !important`, "background-color: transparent !important", "box-sizing: border-box !important"].join("; ") : [`background-color: ${x} !important`, "box-sizing: border-box !important"].join("; ");
          }
          case C.Outline:
            return [`outline: 2px solid ${m ? Y(f, p) : f} !important`, "outline-offset: 1px !important", "background-color: transparent !important", "box-sizing: border-box !important"].join("; ");
          case C.HighlightUnderline: {
            const x = m ? Y(f, p) : f, { r: N, g: I, b: q } = J(x), B = `rgba(${N}, ${I}, ${q}, 0.3)`, ue = d.layout === "bounds", [he, b] = n.isVertical ? ["border-right", "border-left"] : ["border-bottom", "border-top"];
            return [`background-color: ${B} !important`, ue ? `${b}: 0.1em solid ${x} !important` : null, `${he}: 0.1em solid ${x} !important`, "box-sizing: border-box !important"].filter(Boolean).join("; ");
          }
          case C.Highlight:
          default:
            return [`background-color: ${m ? Y(f, p) : f} !important`, `mix-blend-mode: ${y ? "exclusion" : "multiply"} !important`, "opacity: 1 !important", "box-sizing: border-box !important"].join("; ");
        }
      })(), E = this.wnd.document.createElement("template");
      E.innerHTML = `<div data-readium="true" class="readium-${g}" style="${w}"></div>`.trim(), h = E.content.firstElementChild;
    }
    if (e.decoration?.style?.layout === "bounds") {
      const d = h.cloneNode(!0);
      d.style.setProperty("pointer-events", "none");
      const g = s ? { left: a.left - s, right: a.right + s, top: a.top - s, bottom: a.bottom + s, width: a.width + s * 2, height: a.height + s * 2 } : a;
      o(d, g, a, l), r.append(d);
    } else {
      const d = c.type, g = d === C.Underline || d === C.Strikethrough, f = d === C.Strikethrough, y = g ? Ha(e.range, ["rt", "rp"]) : e.range;
      let p = Ie(y, !0, n.isVertical, g ? 0 : s);
      p = p.sort((m, w) => n.isVertical ? (n.isVertLR ? 1 : -1) * (m.left - w.left) : m.top - w.top);
      for (let m of p) {
        const w = h.cloneNode(!0);
        w.style.setProperty("pointer-events", "none");
        let E = m;
        if (f) {
          const x = n.blockSize(m) * 0.1, N = n.blockStart(m) + n.blockSize(m) / 2 - x / 2;
          E = n.isVertical ? { left: N, right: N + x, top: m.top, bottom: m.bottom, width: x, height: m.height } : { top: N, bottom: N + x, left: m.left, right: m.right, height: x, width: m.width };
        }
        s && g && (E = n.isVertical ? { ...E, top: E.top - s, bottom: E.bottom + s, height: E.height + s * 2 } : { ...E, left: E.left - s, right: E.right + s, width: E.width + s * 2 }), o(w, E, a, l), r.append(w);
      }
    }
    e.container = r, e.clickableElements = Array.from(r.querySelectorAll("[data-activable='1']")), e.clickableElements.length || (e.clickableElements = Array.from(r.children));
  }
  renderLayout(e) {
    this.wnd.cancelAnimationFrame(this.currentRender), this.currentRender = this.wnd.requestAnimationFrame(() => {
      e = e.filter((r) => !this.experimentalHighlights || !!this.notTextFlag?.has(r.id)), !(!e || e.length === 0) && this.requireContainer().append(...e.map((r) => r.container).filter((r) => !!r));
    });
  }
  requireContainer(e = !1) {
    if (e) {
      let r;
      return this.wnd.document.getElementById(`${this.id}-style`) ? r = this.wnd.document.getElementById(`${this.id}-style`) : (r = this.wnd.document.createElement("style"), r.dataset.readium = "true", r.id = `${this.id}-style`, this.wnd.document.head.appendChild(r)), r;
    }
    return this.container || (this.shadowRoot || (this.shadowHost = this.wnd.document.createElement("div"), this.shadowHost.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none", this.wnd.document.body.appendChild(this.shadowHost), this.shadowRoot = this.shadowHost.attachShadow({ mode: "open" })), this.container = this.wnd.document.createElement("div"), this.container.setAttribute("id", this.id), this.container.dataset.group = this.name, this.container.dataset.readium = "true", this.container.style.setProperty("pointer-events", "none"), this.container.style.display = "contents", this.shadowRoot.appendChild(this.container)), this.container;
  }
  getCurrentDarkMode() {
    return fr(this.wnd, "--USER__appearance") === "readium-night-on" || sn(this.getBackgroundColor());
  }
  getBackgroundColor() {
    return fr(this.wnd, "--USER__backgroundColor") || this.wnd.getComputedStyle(this.wnd.document.documentElement).getPropertyValue("background-color");
  }
  updateSharedMask() {
    const e = this.items.filter((g) => g.decoration.style?.type === C.Mask);
    if (e.length === 0) {
      this.maskSvg && (this.maskSvg.remove(), this.maskSvg = void 0), this.shadowRoot && (this.shadowRoot.innerHTML = "");
      return;
    }
    const r = me(this.wnd), n = 1 / this.effectiveZoom(), i = this.wnd.document.documentElement, s = i.scrollWidth, o = i.scrollHeight, a = [];
    for (const g of e) {
      const f = g.decoration.style, y = f.layout ?? "boxes", p = f.width ?? "wrap", m = f.expand ?? 0, w = g.range.getBoundingClientRect(), E = y === "bounds" ? [m ? { left: w.left - m, top: w.top - m, right: w.right + m, bottom: w.bottom + m, width: w.width + m * 2, height: w.height + m * 2 } : w] : Ie(g.range, !1, !1, m);
      for (const x of E) {
        let N;
        switch (p) {
          case "viewport": {
            const I = Math.floor(r.inlineStart(x) / r.viewportInlineSize) * r.viewportInlineSize;
            N = r.toRect(I, r.blockStart(x), r.viewportInlineSize, r.blockSize(x));
            break;
          }
          case "page": {
            const I = Math.floor(r.inlineStart(x) / r.pageInlineSize) * r.pageInlineSize;
            N = r.toRect(I, r.blockStart(x), r.pageInlineSize, r.blockSize(x));
            break;
          }
          case "bounds": {
            N = r.toRect(r.inlineStart(w), r.blockStart(x), r.inlineSize(w), r.blockSize(x));
            break;
          }
          default:
            N = r.toRect(r.inlineStart(x), r.blockStart(x), r.inlineSize(x), r.blockSize(x));
        }
        a.push(N);
      }
    }
    const c = [`M0 0 H${s} V${o} H0 Z`, ...a.map((g) => {
      const f = (g.left + r.xDocOffset) * n, y = (g.top + r.yDocOffset) * n, p = (g.right + r.xDocOffset) * n, m = (g.bottom + r.yDocOffset) * n;
      return `M${f} ${y} H${p} V${m} H${f} Z`;
    })].join(" "), l = "http://www.w3.org/2000/svg";
    if (!this.maskSvg) {
      this.shadowRoot || (this.shadowHost = this.wnd.document.createElement("div"), this.shadowHost.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none", this.wnd.document.body.appendChild(this.shadowHost), this.shadowRoot = this.shadowHost.attachShadow({ mode: "open" })), this.maskSvg = this.wnd.document.createElementNS(l, "svg"), this.maskSvg.style.cssText = `position:absolute;top:0;left:0;width:${s}px;height:${o}px;pointer-events:none;z-index:9999`, this.maskSvg.dataset.readium = "true";
      const g = this.wnd.document.createElementNS(l, "defs"), f = this.wnd.document.createElementNS(l, "clipPath"), y = `${this.id}-mask-clip`;
      f.setAttribute("id", y), f.setAttribute("clipPathUnits", "userSpaceOnUse");
      const p = this.wnd.document.createElementNS(l, "path");
      p.setAttribute("clip-rule", "evenodd"), f.appendChild(p), g.appendChild(f), this.maskSvg.appendChild(g);
      const m = this.wnd.document.createElementNS(l, "rect");
      m.setAttribute("id", `${this.id}-mask-rect`), m.setAttribute("clip-path", `url(#${y})`), m.style.pointerEvents = "none", this.maskSvg.appendChild(m), this.shadowRoot.appendChild(this.maskSvg);
    }
    this.maskSvg.style.width = `${s}px`, this.maskSvg.style.height = `${o}px`;
    const h = this.maskSvg.querySelector("path");
    h && h.setAttribute("d", c);
    const d = this.maskSvg.querySelector("rect");
    if (d) {
      const g = e[0].decoration.style.tint, f = g ?? this.getBackgroundColor() ?? lt(C.Mask), y = g ? "1" : "0.5";
      d.setAttribute("x", "0"), d.setAttribute("y", "0"), d.setAttribute("width", String(s)), d.setAttribute("height", String(o)), d.setAttribute("fill", f), d.setAttribute("fill-opacity", y);
    }
  }
  injectCustomStylesheet(e) {
    const r = `${this.id}-custom-style`;
    let n = this.wnd.document.getElementById(r);
    n || (n = this.wnd.document.createElement("style"), n.id = r, n.dataset.readium = "true", this.wnd.document.head.appendChild(n)), n.innerHTML = e;
  }
  clearContainer() {
    if (this.experimentalHighlights) {
      const e = this.wnd.CSS.highlights;
      for (const r of this._tintSubKeys.values()) e.delete(r);
      this._tintSubKeys.clear(), this._subKeyCounter = 0;
    }
    this.wnd.document.getElementById(`${this.id}-custom-style`)?.remove(), this.container && (this.container.remove(), this.container = void 0);
  }
}
const cn = class we extends Ca {
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
  mount(e, r) {
    return this.wnd = e, r.register("decorate", we.moduleName, (n, i) => {
      const s = n;
      (s.action === "add" || s.action === "update") && s.decoration.locator && (s.decoration.locator = Ia.deserialize(s.decoration.locator)), this.groups.has(s.group) || this.groups.set(s.group, new oo(e, r, `readium-decoration-${this.lastGroupId++}`, s.group));
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
    }), r.register("decoration_activatable", we.moduleName, (n, i) => {
      const s = n, o = this.groups.get(s.group);
      o && (o.activatable = s.activatable), i(!0);
    }), r.register("decoration_hoverable", we.moduleName, (n, i) => {
      const s = n, o = this.groups.get(s.group);
      o && (o.hoverable = s.hoverable), i(!0);
    }), this.resizeObserver = new ResizeObserver(() => e.requestAnimationFrame(() => this.handleResize())), this.resizeObserver.observe(e.document.documentElement), e.addEventListener("orientationchange", this.handleResizer), e.addEventListener("resize", this.handleResizer), this.styleObserver = new MutationObserver((n) => {
      n.some((i) => i.type === "attributes" && i.attributeName === "style" && i.oldValue !== i.target.getAttribute("style")) && this.updateHighlightStyles();
    }), this.styleObserver.observe(e.document.documentElement, { attributes: !0, attributeFilter: ["style"], attributeOldValue: !0 }), r.log("Decorator Mounted"), !0;
  }
  unmount(e, r) {
    return e.removeEventListener("orientationchange", this.handleResizer), e.removeEventListener("resize", this.handleResizer), r.unregisterAll(we.moduleName), this.resizeObserver.disconnect(), this.styleObserver.disconnect(), this.cleanup(), r.log("Decorator Unmounted"), !0;
  }
};
cn.moduleName = "decorator";
let lo = cn;
const co = new Set(Object.values(C));
function uo(t, e) {
  return t === C.TextColor ? typeof window < "u" && "Highlight" in window : co.has(t) ? !0 : !!e?.[t];
}
function xr(t, e) {
  const { style: r } = t;
  if (r.type === C.Template) {
    const n = r;
    return { ...t, style: { ...n, element: Er(n, t) } };
  }
  if (r.type && e?.[r.type]) {
    const n = e[r.type];
    return { ...t, style: { type: C.Template, layout: n.layout, width: n.width, stylesheet: n.stylesheet, element: Er(n, t) } };
  }
  return t;
}
function Er(t, e) {
  return typeof t.element == "function" ? t.element(e) : t.element;
}
function ho(t, e) {
  if (t.type !== e.type) return !1;
  if (t.type === C.Template) {
    const i = t, s = e;
    return i.layout === s.layout && i.width === s.width && i.stylesheet === s.stylesheet;
  }
  const r = t, n = e;
  return r.tint === n.tint && r.layout === n.layout && r.width === n.width && (r.enforceContrast ?? !0) === (n.enforceContrast ?? !0) && (r.expand ?? 0) === (n.expand ?? 0);
}
function go(t, e) {
  return t.locator.href === e.locator.href && JSON.stringify(t.locator.locations?.serialize?.() ?? t.locator.locations) === JSON.stringify(e.locator.locations?.serialize?.() ?? e.locator.locations) && JSON.stringify(t.locator.text ?? null) === JSON.stringify(e.locator.text ?? null) && ho(t.style, e.style) && JSON.stringify(t.extras ?? null) === JSON.stringify(e.extras ?? null);
}
let un = class {
  constructor() {
    this.queue = [], this.channel = typeof MessageChannel < "u" ? new MessageChannel() : void 0, this.channel && (this.channel.port1.onmessage = () => this.flush());
  }
  push(e) {
    const r = this.queue.length === 0;
    this.queue.push(e), r && (this.channel ? this.channel.port2.postMessage(null) : setTimeout(() => this.flush(), 0));
  }
  flush() {
    const e = this.queue;
    this.queue = [], e.forEach((r) => r());
  }
  clear() {
    this.queue = [];
  }
};
class fo {
  constructor() {
    this.frame = new po(this), this.host = new mo(this);
  }
}
let po = class {
  constructor(e) {
    this.channel = e, this.registrar = /* @__PURE__ */ new Map(), this.outbox = new un(), this.ready = !0;
  }
  register(e, r, n) {
    (Array.isArray(e) ? e : [e]).forEach((i) => {
      const s = this.registrar.get(i) ?? [];
      if (s.find((o) => o.module === r)) throw new Error(`Duplicate callback for "${i}" in module "${r}"`);
      s.push({ module: r, cb: n }), this.registrar.set(i, s);
    });
  }
  unregister(e, r) {
    (Array.isArray(e) ? e : [e]).forEach((n) => {
      const i = this.registrar.get(n);
      i && this.registrar.set(n, i.filter((s) => s.module !== r));
    });
  }
  unregisterAll(e) {
    this.registrar.forEach((r, n) => {
      this.registrar.set(n, r.filter((i) => i.module !== e));
    });
  }
  _dispatch(e, r, n) {
    const i = this.registrar.get(e);
    if (!i?.length) {
      n(!1);
      return;
    }
    i.forEach((s) => s.cb(r, n));
  }
  send(e, r) {
    this.outbox.push(() => this.channel.host._receive(e, r));
  }
  log(...e) {
    this.outbox.push(() => this.channel.host._receive("log", e));
  }
  destroy() {
    this.registrar.clear(), this.outbox.clear();
  }
};
class mo {
  constructor(e) {
    this.channel = e, this.listeners = /* @__PURE__ */ new Map(), this.outbox = new un(), this.ready = !0;
  }
  send(e, r, n) {
    this.outbox.push(() => this.channel.frame._dispatch(e, r, n ?? (() => {
    })));
  }
  on(e, r) {
    const n = this.listeners.get(e) ?? [];
    n.push(r), this.listeners.set(e, n);
  }
  off(e, r) {
    const n = this.listeners.get(e);
    n && this.listeners.set(e, n.filter((i) => i !== r));
  }
  _receive(e, r) {
    this.listeners.get(e)?.forEach((n) => n(r));
  }
}
class yo {
  constructor(e, r = {}) {
    this.host = e, this._decorations = /* @__PURE__ */ new Map(), this._activationState = /* @__PURE__ */ new Map(), this._hoverState = /* @__PURE__ */ new Map(), this._observers = /* @__PURE__ */ new Map(), this._hoveredDecorations = /* @__PURE__ */ new Map(), this._config = r, e.on("decoration_activated", (n) => {
      const i = n, s = this._decorations.get(i.group)?.find((o) => o.id === i.decorationId);
      s && this._observers.get(i.group)?.forEach((o) => o.onDecorationActivated?.({ group: i.group, decoration: s, rect: i.rect, point: i.point }));
    }), e.on("decoration_pointer_enter", (n) => {
      const i = n, s = this._decorations.get(i.group)?.find((o) => o.id === i.decorationId);
      s && (this._hoveredDecorations.set(i.group, s), this._observers.get(i.group)?.forEach((o) => o.onDecorationPointerEnter?.({ group: i.group, decoration: s, rect: i.rect, point: i.point })));
    }), e.on("decoration_pointer_leave", (n) => {
      const i = n, s = this._decorations.get(i.group)?.find((o) => o.id === i.decorationId) ?? this._hoveredDecorations.get(i.group);
      this._hoveredDecorations.delete(i.group), s && this._observers.get(i.group)?.forEach((o) => o.onDecorationPointerLeave?.({ group: i.group, decoration: s, rect: i.rect, point: i.point }));
    });
  }
  supportsDecorationStyle(e) {
    return uo(e, this._config.decorationTemplates);
  }
  applyDecorations(e, r) {
    const n = this._decorations.get(r) ?? [], i = new Map(n.map((c) => [c.id, c])), s = new Map(e.map((c) => [c.id, c]));
    for (const [c, l] of i) {
      const h = s.get(c);
      h ? go(l, h) || this.host.send("decorate", { group: r, action: "update", decoration: xr(h, this._config.decorationTemplates) }) : this.host.send("decorate", { group: r, action: "remove", decoration: { id: c } });
    }
    for (const [c, l] of s) i.has(c) || this.host.send("decorate", { group: r, action: "add", decoration: xr(l, this._config.decorationTemplates) });
    this._decorations.set(r, e);
    const o = this._activationState.get(r);
    o !== void 0 && this.host.send("decoration_activatable", { group: r, activatable: o });
    const a = this._hoverState.get(r);
    a !== void 0 && this.host.send("decoration_hoverable", { group: r, hoverable: a });
  }
  registerDecorationObserver(e, r) {
    this._observers.has(e) || this._observers.set(e, /* @__PURE__ */ new Set()), this._observers.get(e).add(r), r.onDecorationActivated && (this._activationState.set(e, !0), this.host.send("decoration_activatable", { group: e, activatable: !0 })), (r.onDecorationPointerEnter || r.onDecorationPointerLeave) && (this._hoverState.set(e, !0), this.host.send("decoration_hoverable", { group: e, hoverable: !0 }));
  }
  unregisterDecorationObserver(e) {
    this._observers.forEach((r, n) => {
      if (!r.has(e)) return;
      r.delete(e);
      const i = [...r].some((o) => o.onDecorationActivated);
      this._activationState.has(n) && !i && (this._activationState.delete(n), this.host.send("decoration_activatable", { group: n, activatable: !1 }));
      const s = [...r].some((o) => o.onDecorationPointerEnter || o.onDecorationPointerLeave);
      this._hoverState.has(n) && !s && (this._hoverState.delete(n), this.host.send("decoration_hoverable", { group: n, hoverable: !1 }));
    });
  }
  destroy() {
    this._decorations.clear(), this._activationState.clear(), this._hoverState.clear(), this._observers.clear(), this._hoveredDecorations.clear();
  }
}
function bo(t) {
  return t && Array.isArray(t) ? t : void 0;
}
function vo(t) {
  return t && typeof t == "string" ? [t] : bo(t);
}
function ct(t) {
  return isNaN(t) ? void 0 : t;
}
class V {
  constructor(e) {
    this.fragments = e.fragments ? e.fragments : new Array(), this.progression = e.progression, this.totalProgression = e.totalProgression, this.position = e.position, this.otherLocations = e.otherLocations;
  }
  static deserialize(e) {
    if (!e) return;
    const r = ct(e.progression), n = ct(e.totalProgression), i = ct(e.position), s = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Set(["fragment", "fragments", "progression", "totalProgression", "position", "otherLocations"]);
    return Object.entries(e).forEach(([a, c]) => {
      o.has(a) || s.set(a, c);
    }), e.otherLocations instanceof Map && e.otherLocations.forEach((a, c) => s.set(c, a)), new V({ fragments: vo(e.fragments || e.fragment), progression: r !== void 0 && r >= 0 && r <= 1 ? r : void 0, totalProgression: n !== void 0 && n >= 0 && n <= 1 ? n : void 0, position: i !== void 0 && i > 0 ? i : void 0, otherLocations: s.size === 0 ? void 0 : s });
  }
  serialize() {
    const e = {};
    return this.fragments && (e.fragments = this.fragments), this.progression !== void 0 && (e.progression = this.progression), this.totalProgression !== void 0 && (e.totalProgression = this.totalProgression), this.position !== void 0 && (e.position = this.position), this.otherLocations && this.otherLocations.forEach((r, n) => e[n] = r), e;
  }
}
class We {
  constructor(e) {
    this.after = e.after, this.before = e.before, this.highlight = e.highlight;
  }
  static deserialize(e) {
    if (e) return new We({ after: e.after, before: e.before, highlight: e.highlight });
  }
  serialize() {
    const e = {};
    return this.after !== void 0 && (e.after = this.after), this.before !== void 0 && (e.before = this.before), this.highlight !== void 0 && (e.highlight = this.highlight), e;
  }
}
class He {
  constructor(e) {
    const r = e.href.indexOf("#"), n = r >= 0 ? e.href.slice(r + 1) : void 0;
    this.href = r >= 0 ? e.href.slice(0, r) : e.href, this.type = e.type, this.title = e.title;
    const i = e.locations?.fragments, s = n && (!i || i.length === 0);
    this.locations = e.locations ? s ? new V({ ...e.locations, fragments: [n] }) : e.locations : n ? new V({ fragments: [n] }) : new V({}), this.text = e.text;
  }
  static deserialize(e) {
    if (e && e.href && e.type) return new He({ href: e.href, type: e.type, title: e.title, locations: V.deserialize(e.locations), text: We.deserialize(e.text) });
  }
  serialize() {
    const e = { href: this.href, type: this.type };
    return this.title !== void 0 && (e.title = this.title), this.locations && (e.locations = this.locations.serialize()), this.text && (e.text = this.text.serialize()), e;
  }
  copyWithLocations(e) {
    return new He({ href: this.href, type: this.type, title: this.title, text: this.text, locations: new V({ ...this.locations, ...e }) });
  }
}
function wo(t, e = window) {
  const { highlight: r, before: n, after: i, selector: s, fragment: o } = t, c = r !== void 0 || n !== void 0 || i !== void 0 ? new We({ highlight: r, before: n, after: i }) : void 0, l = s ? /* @__PURE__ */ new Map([["cssSelector", s]]) : void 0, d = l !== void 0 || o !== void 0 ? new V({
    fragments: o ? [o] : void 0,
    otherLocations: l
  }) : void 0;
  return new He({
    href: e.location.href,
    type: "text/html",
    text: c,
    locations: d
  });
}
class So extends yo {
  constructor(e, r, n, i = {}) {
    super(e.host, i), this.channel = e, this.wnd = r, this.decorator = n;
  }
  // Convenience wrapper: builds Locators from shorthand text/selector options
  // and delegates to applyDecorations, which replaces the entire decoration
  // set for a group on every call — batch everything for a group into one
  // call rather than clobbering the previous one.
  decorate(e, r) {
    this.applyDecorations(
      e.map(({ id: n, style: i, ...s }) => ({
        id: n,
        style: i,
        locator: wo(s, this.wnd)
      })),
      r
    );
  }
  destroy() {
    super.destroy(), this.decorator.unmount(this.wnd, this.channel.frame), this.channel.frame.destroy();
  }
}
function gl(t = window, e = {}) {
  const r = new fo(), n = new lo();
  return n.mount(t, r.frame), new So(r, t, n, e);
}
const ko = [
  "heading1",
  "heading2",
  "heading3",
  "heading4",
  "heading5",
  "heading6"
], Cr = {
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
}, Oo = {
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
}, xo = {
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
function ut(t) {
  const e = [], r = (c) => {
    e.includes(c) || e.push(c);
  }, n = [];
  let i = !1;
  const s = t.getAttribute("role");
  if (s)
    for (const c of s.split(/\s+/).filter(Boolean))
      if ((c === "presentation" || c === "none") && (i = !0), c === "heading") {
        let l = 2;
        const h = parseInt(t.getAttribute("aria-level") ?? "", 10);
        Number.isFinite(h) && h >= 1 && (l = Math.min(h, 6)), n.push(ko[l - 1]);
      } else Cr[c] && n.push(Cr[c]);
  const o = t.getAttribute("epub:type");
  if (o)
    for (const c of o.split(/\s+/).filter(Boolean)) {
      const l = Oo[c];
      l && n.push(l);
    }
  if (i)
    return ["presentation"];
  const a = t.tagName.toLowerCase();
  if (a === "body")
    r("body");
  else if (a === "th")
    switch (t.getAttribute("scope")) {
      case "col":
        r("columnheader");
        break;
      case "row":
        r("rowheader");
        break;
      default:
        r("cell");
    }
  else {
    const c = xo[a];
    c && r(c);
  }
  for (const c of n) r(c);
  return e;
}
function Ce(t) {
  return t.plain === "" && t.ssml === "" && t.language === "";
}
function Eo(t) {
  if (!t || Ce(t)) return;
  if (t.ssml === "" && t.language === "") return t.plain;
  const e = { language: t.language };
  return t.plain !== "" && (e.plain = t.plain), t.ssml !== "" && (e.ssml = t.ssml), e;
}
function Co(t, e) {
  if (t.lang !== e.lang || t.tag !== e.tag) return !1;
  const r = Object.entries(t.attrs ?? {}), n = Object.entries(e.attrs ?? {});
  return r.length !== n.length ? !1 : r.every(([i, s]) => e.attrs?.[i] === s);
}
const _e = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), ht = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"), Ao = /[\u00A0\u2007\u202F]/;
function To(t) {
  return Ao.test(t);
}
function xe(t, e) {
  let r = "", n = !1, i = !1;
  for (const s of t)
    if (To(s))
      r += s, n = !1, i = !0;
    else if (/\s/.test(s)) {
      if (e && !i || n) continue;
      r += " ", n = !0;
    } else s !== "​" && s !== "­" && (r += s, n = !1, i = !0);
  return r;
}
function Ar(t) {
  return !!(t.getAttribute("aria-hidden") === "true" || t.hasAttribute("hidden"));
}
function At(t) {
  let e = "";
  const r = (n) => {
    n.nodeType === 3 && (e += n.nodeValue ?? "");
    for (let i = n.firstChild; i; i = i.nextSibling) r(i);
  };
  return r(t), e;
}
function Be(t) {
  return xe(At(t), !0).trim();
}
function Ro(t) {
  if (Ar(t))
    return [null, !1];
  const e = (t.getAttribute("aria-labelledby") ?? "").trim();
  if (e) {
    const s = [...new Set(e.split(/\s+/).filter(Boolean))], o = t.ownerDocument, a = s.map((c) => o.getElementById(c)).filter((c) => c !== null);
    if (a.length > 0) {
      let c = "";
      a.forEach((h, d) => {
        if (Ar(h)) return;
        const g = h.getAttribute("aria-label");
        c += g || At(h), d < a.length - 1 && (c += " ");
      });
      const l = xe(c, !0).trim();
      if (l !== "")
        return [{ language: "", plain: l }, !0];
    }
  }
  const r = (t.getAttribute("aria-label") ?? "").trim();
  if (r)
    return [{ language: "", plain: r }, !0];
  const n = (t.getAttribute("aria-describedby") ?? "").trim();
  if (n) {
    const o = [...new Set(n.split(/\s+/).filter(Boolean))].map((a) => t.ownerDocument.getElementById(a)).filter((a) => a !== null);
    if (o.length > 0) {
      const a = o.map((l) => At(l)).join(" "), c = xe(a, !0).trim();
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
      const o = Be(s);
      if (o) return [{ language: "", plain: o }, !0];
    }
  } else if (i === "math") {
    const s = (t.getAttribute("alttext") ?? "").trim();
    if (s) return [{ language: "", plain: s }, !0];
  }
  return [null, !0];
}
const No = {
  em: ["emphasis"],
  b: ["emphasis"],
  i: ["emphasis", { level: "reduced" }],
  strong: ["emphasis", { level: "strong" }],
  br: ["break"]
};
function Lo(t) {
  return No[t] ?? ["", void 0];
}
const Io = /* @__PURE__ */ new Set([
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
]), Tt = "\\p{Pe}\\p{Pf}.,;:!?，。、；：！？،؛؟", Rt = "\\p{Ps}\\p{Pi}¿¡", qo = new RegExp(`^[${Tt}]`, "u"), Po = new RegExp(`^[${Rt}]`, "u");
function Ge(t) {
  return qo.test(t);
}
function $o(t) {
  return Po.test(t);
}
function Nt(t) {
  return !t.audioref && !t.imgref && !t.textref && !t.videoref && (!t.text || Ce(t.text)) && !(t.children && t.children.length > 0) && !t.description;
}
function Do(t) {
  return !t.audioref && !t.imgref && !t.textref && !t.videoref && (!t.text || Ce(t.text)) && !!(t.children && t.children.length > 0) && !(t.role && t.role.length > 0) && !t.id;
}
function Bo(t) {
  return !(t.role && t.role.length > 0) && !t.id;
}
class $e {
  el;
  object = {};
  children = [];
  noText = !1;
  finalize() {
    const e = this.object, r = [];
    for (const n of this.children) {
      const i = n.finalize();
      if (!Nt(i)) {
        if (Do(i)) {
          r.push(...i.children ?? []);
          continue;
        }
        r.push(i);
      }
    }
    if (r.length > 0 && (e.children = r), (!e.text || Ce(e.text)) && e.children?.length === 1) {
      const n = e.children[0];
      Bo(n) && (n.text && (e.text = n.text), n.textref && (e.textref = n.textref), n.imgref && (e.imgref = n.imgref), n.audioref && (e.audioref = n.audioref), n.videoref && (e.videoref = n.videoref), e.children = n.children);
    }
    return e;
  }
}
function Lt(t) {
  const e = {};
  t.id && (e.id = t.id), t.textref && (e.textref = t.textref), t.imgref && (e.imgref = t.imgref), t.audioref && (e.audioref = t.audioref), t.videoref && (e.videoref = t.videoref);
  const r = Eo(t.text);
  return r !== void 0 && (e.text = r), t.role && t.role.length > 0 && (e.role = t.role), t.children && t.children.length > 0 && (e.children = t.children.map(Lt)), t.description && (e.description = t.description), e;
}
function hn(t) {
  const e = {};
  return t.id && (e.id = t.id), t.textref && (e.textref = t.textref), t.imgref && (e.imgref = t.imgref), t.audioref && (e.audioref = t.audioref), t.videoref && (e.videoref = t.videoref), t.role && (e.role = t.role), t.description && (e.description = t.description), typeof t.text == "string" ? e.text = { plain: t.text, ssml: "", language: "" } : t.text && (e.text = { plain: t.text.plain ?? "", ssml: t.text.ssml ?? "", language: t.text.language }), t.children && (e.children = t.children.map(hn)), e;
}
const jo = 1;
function Tr(t) {
  for (let e = t; e; e = e.parentElement) {
    const r = e.getAttribute("xml:lang");
    if (r) return r;
    const n = e.getAttribute("lang");
    if (n) return n;
  }
  return "";
}
function Uo(t) {
  for (let e = t.firstChild; e; e = e.nextSibling)
    if (e.nodeType === jo) return !0;
  return !1;
}
function Rr(t, e) {
  for (let r = e; r; r = r.parentElement)
    if (r === t) return !0;
  return !1;
}
function zo(t) {
  const e = t.slice(0, 500);
  return /<\?xml\b/.test(e) || /xmlns:epub=/.test(e) || /DOCTYPE\s+html\s+PUBLIC\s+"-\/\/W3C\/\/DTD XHTML/i.test(e) ? "application/xhtml+xml" : "text/html";
}
const Ho = 3, _o = 1, Fo = /* @__PURE__ */ new Set([
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
]), Mo = /* @__PURE__ */ new Set(["summary", "dfn", "span"]);
function Nr(t, e) {
  return Mo.has(t) && e.length > 0 ? !0 : !Fo.has(t);
}
class Bt {
  xmlParsed;
  ids = /* @__PURE__ */ new Map();
  suppressed = /* @__PURE__ */ new Set();
  idAlloc = { claimed: /* @__PURE__ */ new Set(), counters: /* @__PURE__ */ new Map() };
  noterefDepth = 0;
  allowNode = null;
  root = new $e();
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
      const r = (this.idAlloc.counters.get(e) ?? 0) + 1;
      this.idAlloc.counters.set(e, r);
      const n = `${e}${r}`;
      if (!(this.ids.has(n) || this.idAlloc.claimed.has(n)))
        return this.idAlloc.claimed.add(n), n;
    }
  }
  claimId(e) {
    return this.idAlloc.claimed.has(e) ? !1 : (this.idAlloc.claimed.add(e), !0);
  }
  prescan(e) {
    const r = [], n = (i, s) => {
      const o = i.getAttribute("id");
      if (o && !this.ids.has(o) && this.ids.set(o, i), s = s || i.getAttribute("aria-hidden") === "true" || i.hasAttribute("hidden"), !s && i.tagName.toLowerCase() === "a" && ut(i).includes("noteref")) {
        const c = i.getAttribute("href") ?? "";
        c.startsWith("#") && r.push({ id: c.slice(1), ref: i });
      }
      for (let a = i.firstElementChild; a; a = a.nextElementSibling) n(a, s);
    };
    n(e, !1);
    for (const i of r) {
      const s = this.ids.get(i.id);
      s && (Rr(s, i.ref) || this.suppressed.add(s));
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
    for (let r = e.firstChild; r; r = r.nextSibling) this.walk(r);
    this.flushText();
  }
  result() {
    const e = this.root.finalize();
    return !e.children || e.children.length === 0 ? Nt(e) ? [] : [Lt(e)] : e.children.map(Lt);
  }
  descend(e) {
    const r = new $e();
    r.el = e, r.noText = this.current.noText, this.current.children.push(r), this.current = r;
  }
  appendChild(e) {
    e.noText = this.current.noText, this.current.children.push(e);
  }
  walk(e) {
    if (e.nodeType === Ho) {
      this.text(e);
      return;
    }
    if (e.nodeType !== _o) return;
    const r = e, n = this.current, i = this.head(r);
    if (!i)
      for (let s = r.firstChild; s; s = s.nextSibling) this.walk(s);
    this.tail(r, i, n);
  }
  // Returns true if children should not be traversed (already handled
  // wholesale, invisible, or explicitly skipped).
  head(e) {
    const r = e.tagName.toLowerCase();
    if (Io.has(r) || this.suppressed.has(e) && e !== this.allowNode) return !0;
    const [n, i] = Ro(e);
    if (!i && e !== this.allowNode) return !0;
    const s = ut(e);
    if ((r === "img" || r === "svg") && (s.includes("presentation") || n === null && e.hasAttribute("alt") && e.getAttribute("alt").trim() === ""))
      return !0;
    if (r === "br")
      return this.current.noText || (this.closeSegment(), this.segments.push({ kind: "break" }), this.flowEndsWithSpace = !0), !0;
    if (s.includes("pagebreak"))
      return !this.pagebreak(e, n, s);
    if (r === "a" && s.includes("noteref") && e.getAttribute("href"))
      return this.noteref(e, s), !0;
    if (r === "a" && e.getAttribute("href"))
      return this.link(e, s), !0;
    if (r === "img") {
      const c = { role: s }, l = e.getAttribute("src");
      return l && (c.imgref = l), n && (c.description = n.plain), this.placeholder(e, "image", c), !0;
    }
    if (r === "audio" || r === "video") {
      const c = { role: s };
      let l = e.getAttribute("src");
      if (!l) {
        const h = e.querySelector(":scope > source[src]");
        h && (l = h.getAttribute("src"));
      }
      return r === "audio" ? l && (c.audioref = l) : l && (c.videoref = l), n && (c.description = n.plain), this.placeholder(e, r, c), !0;
    }
    if (s.includes("image") || s.includes("math")) {
      const c = { role: s };
      return n && (c.description = n.plain), this.placeholder(e, s.includes("math") ? "math" : "image", c), !0;
    }
    if (!Nr(r, s))
      return !1;
    this.flushText(), this.descend(e);
    const o = this.current.object;
    s.length > 0 && (o.role = s), n && (o.description = n.plain, s.includes("figure") && (this.current.noText = !0));
    const a = e.getAttribute("id");
    return a && (o.id = a), !1;
  }
  tail(e, r, n) {
    if (r) return;
    const i = e.tagName.toLowerCase(), s = ut(e);
    Nr(i, s) && (this.flushText(), this.current = n);
  }
  text(e) {
    if (this.current.noText) return;
    const r = e.nodeValue ?? "";
    if (/^\s*$/.test(r)) {
      (this.textAcc.length > 0 || this.segments.length > 0) && (this.textAcc += xe(r, this.flowEndsWithSpace), this.updateFlowSpace());
      return;
    }
    const n = this.textContext(e);
    Co(n, this.currentCtx) || (this.closeSegment(), this.currentCtx = n), this.textAcc += xe(r, this.flowEndsWithSpace), this.updateFlowSpace();
  }
  textContext(e) {
    const r = { lang: Tr(e.parentElement), tag: "" };
    for (let n = e.parentElement; n && n !== this.current.el; n = n.parentElement) {
      const [i, s] = Lo(n.tagName.toLowerCase());
      if (i && i !== "break") {
        r.tag = i, r.attrs = s;
        break;
      }
    }
    return r;
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
  placeholder(e, r, n, i) {
    if (Nt(n)) return;
    const s = new $e();
    if (s.el = e, s.object = n, this.current.noText) {
      this.appendChild(s);
      return;
    }
    this.closeSegment(), this.pendingChildren.push(s), this.segments.push({
      kind: "placeholder",
      tag: r,
      child: s,
      candidateID: i ?? e.getAttribute("id") ?? void 0
    }), this.flowEndsWithSpace = !1;
  }
  pagebreak(e, r, n) {
    const i = { role: n }, s = (e.getAttribute("title") ?? "").trim();
    s ? i.text = { plain: s, ssml: "", language: "" } : r && (i.text = { plain: r.plain ?? "", ssml: r.ssml ?? "", language: r.language });
    const o = !!(i.text && !Ce(i.text)), a = !this.xmlParsed && (Uo(e) || o && e.firstChild !== null);
    if (!o && !a) {
      const l = Be(e);
      l && (i.text = { plain: l, ssml: "", language: "" });
    }
    const c = e.getAttribute("id");
    return c && (i.textref = `#${c}`), this.placeholder(e, "pagebreak", i), a;
  }
  noteref(e, r) {
    const n = { role: r }, i = Be(e);
    i && (n.text = { plain: i, ssml: "", language: "" });
    const s = e.getAttribute("href") ?? "";
    let o = e.getAttribute("id") ?? "";
    if (!o && s.startsWith("#") && (o = s.slice(1)), s.startsWith("#")) {
      const a = s.slice(1), c = this.ids.get(a);
      if (c && !Rr(c, e) && this.noterefDepth < 3) {
        const l = new Bt(this.xmlParsed);
        l.ids = this.ids, l.suppressed = this.suppressed, l.idAlloc = this.idAlloc, l.noterefDepth = this.noterefDepth + 1, l.allowNode = c, l.convert(c);
        const h = l.result();
        h.length > 0 && (n.children = h.map((d) => {
          const g = hn(d);
          return delete g.id, g;
        }));
      }
    }
    !n.children && s && (n.children = [{ textref: s }]), this.placeholder(e, "noteref", n, o || void 0);
  }
  link(e, r) {
    const n = {};
    r.length > 0 && (n.role = r);
    const i = Be(e);
    i && (n.text = { plain: i, ssml: "", language: "" });
    const s = e.getAttribute("href");
    s && (n.textref = s), this.placeholder(e, r[0] ?? "link", n);
  }
  flushText() {
    this.closeSegment();
    let e = this.segments;
    const r = this.pendingChildren;
    if (this.resetFlow(), e.length === 0) return;
    for (; e.length > 0; ) {
      const p = e[0];
      if (p.kind === "break") {
        e = e.slice(1);
        continue;
      }
      if (p.kind === "text") {
        const m = p.text.replace(/^\s+/, "");
        if (m === "") {
          e = e.slice(1);
          continue;
        }
        e = [{ ...p, text: m }, ...e.slice(1)];
      }
      break;
    }
    for (; e.length > 0; ) {
      const p = e[e.length - 1];
      if (p.kind === "break") {
        e = e.slice(0, -1);
        continue;
      }
      if (p.kind === "text") {
        const m = p.text.replace(/\s+$/, "");
        if (m === "") {
          e = e.slice(0, -1);
          continue;
        }
        e = [...e.slice(0, -1), { ...p, text: m }];
      }
      break;
    }
    if (!e.some((p) => p.kind === "text" && p.text.trim() !== "")) {
      for (const p of r) this.appendChild(p);
      return;
    }
    const i = [];
    for (const p of e)
      if (p.kind === "text" && p.text.trim() !== "") {
        const m = p.ctx.lang;
        i.includes(m) || i.push(m);
      }
    let s = Tr(this.current.el ?? null);
    i.length === 1 && i[0] !== "" && (s = i[0]);
    let o = !1;
    for (const p of e)
      if (p.kind !== "text" || p.ctx.tag !== "" || p.ctx.lang !== s) {
        o = !0;
        break;
      }
    if (o && s === "" && (s = "en"), o)
      for (const p of e) {
        if (p.kind !== "placeholder") continue;
        let m = p.candidateID;
        (!m || !this.claimId(m)) && (m = this.allocateId(p.tag)), p.child.object.id = m;
      }
    let a = "", c = !1, l = !1, h = !1, d = !1;
    for (const p of e)
      if (p.kind === "text") {
        const m = p.text.startsWith(" "), w = p.text.replace(/^ +| +$/g, "");
        if (w === "") {
          d = !0;
          continue;
        }
        let E = !1;
        if (a.length > 0) {
          const x = c || d || m;
          l ? E = !0 : h ? E = x && !Ge(w) : E = x;
        }
        E && (a += " "), a += w, c = p.text.endsWith(" "), l = !1, h = !1, d = !1;
      } else p.kind === "break" ? l = !0 : p.kind === "placeholder" && (h = !0);
    const g = e.some((p) => p.kind === "placeholder"), f = {
      plain: o && !g ? "" : a.trim(),
      ssml: "",
      language: s
    };
    if (o) {
      let p = "";
      for (const m of e)
        if (m.kind === "text") {
          let w = m.ctx.tag, E = m.ctx.attrs;
          if (m.ctx.lang !== s && m.ctx.lang !== "" && (w = "lang", E = void 0), w) {
            p += `<${w}`;
            for (const [x, N] of Object.entries(E ?? {}))
              p += ` ${x}="${ht(N)}"`;
            m.ctx.lang !== s && m.ctx.lang !== "" && (p += ` xml:lang="${ht(m.ctx.lang)}"`), p += `>${_e(m.text)}</${w}>`;
          } else
            p += _e(m.text);
        } else m.kind === "break" ? p += "<break/>" : m.kind === "placeholder" && (p += `<readium:${m.tag} id="${ht(m.child.object.id)}" />`);
      f.ssml = p;
    }
    const y = new $e();
    y.object = { text: f };
    for (const p of r)
      y.children.push(p);
    this.appendChild(y);
  }
}
const Vo = /<body[\s>]/i;
function Wo(t, e) {
  const r = e ?? zo(t), n = new DOMParser().parseFromString(t, r), i = new Bt(r === "application/xhtml+xml"), s = n.querySelector("body");
  return s && !Vo.test(t) ? i.convertChildren(s) : i.convert(s ?? n.documentElement), i.result();
}
function fl(t, e) {
  return { guided: Wo(t, e) };
}
const Go = {
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
  video: "Video."
}, Ko = /<lang xml:lang="[^"]*">([\s\S]*?)<\/lang>/g;
function dn(t) {
  return t.replace(Ko, "$1");
}
const Jo = /\s*<readium:[a-zA-Z][\w-]*\s+id="[^"]*"\s*\/>\s*/g;
function Qo(t) {
  return t.replace(Jo, (r, n, i) => {
    const s = i.slice(n + r.length);
    return s.length === 0 || Ge(s) ? "" : " ";
  }).replace(/ {2,}/g, " ").trim();
}
function Xo(t) {
  return t.includes("<");
}
function gn(t) {
  if (t === void 0) return;
  if (typeof t == "string") return { plain: t };
  const e = { language: t.language };
  if (t.ssml) {
    const r = Qo(t.ssml);
    Xo(r) && (e.ssml = r);
  }
  return t.plain && (e.plain = t.plain), e.plain || e.ssml ? e : void 0;
}
function jt(t) {
  return t.replace(/<[^>]+>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/ {2,}/g, " ").trim();
}
const fn = /<lang xml:lang="([^"]*)">([\s\S]*?)<\/lang>/g;
function pn(t) {
  return new RegExp(fn).test(t);
}
function Lr(t) {
  return t.replace(/<[^>]+>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/ {2,}/g, " ");
}
const Zo = new RegExp(
  `\\s+|[${Rt}]+|[${Tt}]+|[^\\s${Rt}${Tt}]+`,
  "gu"
);
function dt(t) {
  const e = [];
  for (const [r] of t.matchAll(Zo))
    /^\s/.test(r) ? e.push({ kind: "space" }) : $o(r) ? e.push({ kind: "open", text: r }) : Ge(r) ? e.push({ kind: "close", text: r }) : e.push({ kind: "word", text: r });
  return e;
}
function Yo(t) {
  let e = "", r = !1;
  for (const n of t) {
    if (n.kind === "space") {
      e && (r = !0);
      continue;
    }
    r && (e += " "), e += n.text, r = !1;
  }
  return e;
}
function el(t) {
  let e = t.length;
  for (; e > 0 && (t[e - 1].kind === "space" || t[e - 1].kind === "open"); ) e--;
  return t.slice(e).some((r) => r.kind === "open") ? t.splice(e) : [];
}
function tl(t) {
  let e = 0;
  for (; e < t.length && (t[e].kind === "space" || t[e].kind === "close"); ) e++;
  return t.slice(0, e).some((r) => r.kind === "close") ? t.splice(0, e) : [];
}
function mn(t, e) {
  const r = [];
  let n = 0;
  for (const s of t.matchAll(fn))
    r.push({
      tokens: dt(Lr(t.slice(n, s.index))),
      language: e,
      tagged: !1
    }), r.push({ tokens: dt(jt(s[2])), language: s[1], tagged: !0 }), n = s.index + s[0].length;
  r.push({
    tokens: dt(Lr(t.slice(n))),
    language: e,
    tagged: !1
  });
  for (let s = 0; s < r.length - 1; s++)
    !r[s].tagged && r[s + 1].tagged ? r[s + 1].tokens.unshift(...el(r[s].tokens)) : r[s].tagged && !r[s + 1].tagged && r[s].tokens.push(...tl(r[s + 1].tokens));
  const i = [];
  for (const s of r) {
    const o = Yo(s.tokens);
    o && i.push({ plain: o, language: s.language });
  }
  return i;
}
const yn = /<readium:[a-zA-Z][\w-]*\s+id="([^"]*)"\s*\/>/g;
function rl(t) {
  return new RegExp(yn).test(t);
}
function nl(t) {
  const e = [];
  let r = 0;
  for (const i of t.matchAll(yn)) {
    const s = t.slice(r, i.index).trim();
    s && e.push({ ssml: s }), e.push({ placeholderId: i[1] }), r = i.index + i[0].length;
  }
  const n = t.slice(r).trim();
  return n && e.push({ ssml: n }), e;
}
function Fe(t) {
  return typeof t == "object";
}
function Ee(t, e) {
  return typeof t == "function" ? t(e) : t;
}
function ie(t, e) {
  return e === "ssml" ? { ssml: _e(t) } : { plain: t };
}
function Ir(t, e, r, n, i) {
  if (!e.contextualize) return;
  const s = e.announcements[r];
  if (s !== void 0) {
    if (Fe(s)) {
      const o = n === "before" ? s.start : s.end;
      t.push(ie(Ee(o, i), e.format));
      return;
    }
    n === "before" && t.push(ie(Ee(s, i), e.format));
  }
}
function qr(t, e) {
  return e.size > 0 && t.some((r) => e.has(r));
}
function Ut(t, e) {
  let r, n = !1;
  const i = [];
  for (const a of t) {
    const c = e === "ssml" ? a.ssml : a.plain;
    if (c && (i.push(c), a.language !== void 0)) {
      if (n && a.language !== r) return;
      r = a.language, n = !0;
    }
  }
  if (i.length === 0) return;
  let s = "";
  for (const a of i)
    a.length === 1 && s.endsWith(a) || (s && !Ge(a) && (s += " "), s += a);
  const o = e === "ssml" ? { ssml: s } : { plain: s };
  return r && (o.language = r), o;
}
function il(t, e) {
  const r = gn(t.text), n = r ? bn(r, e.format, e.language) : [];
  if (!e.contextualize) return n;
  const i = e.announcements.pagebreak;
  if (i === void 0) return n;
  const s = ie(Ee(Fe(i) ? i.start : i), e.format);
  if (n.length === 0) return [s];
  const o = Ut([s, ...n], e.format);
  return o ? (o.plain !== void 0 && (o.plain += "."), o.ssml !== void 0 && (o.ssml += "."), [o]) : [s, ...n];
}
function bn(t, e, r) {
  if (e === "plain" && r !== "block-level" && r !== "none" && t.ssml && pn(t.ssml))
    return mn(t.ssml, t.language).map((i) => {
      const s = { plain: i.plain };
      return i.language && (s.language = i.language), s;
    });
  const n = {};
  return t.language && (n.language = t.language), e === "ssml" ? n.ssml = t.ssml ?? _e(t.plain ?? "") : n.plain = t.plain ?? jt(t.ssml ?? ""), (r === "block-level" || r === "none") && (n.ssml && (n.ssml = dn(n.ssml)), r === "none" && delete n.language), [n];
}
function sl(t, e, r, n) {
  const i = typeof t.text == "object" ? t.text.language : void 0, s = new Map((t.children ?? []).map((c) => [c.id, c])), o = [];
  for (const c of nl(e)) {
    if (c.placeholderId !== void 0) {
      const h = s.get(c.placeholderId);
      h && vn(h, o, n);
      continue;
    }
    if (!c.ssml) continue;
    if (n.format === "plain" && n.language !== "block-level" && n.language !== "none" && pn(c.ssml)) {
      for (const h of mn(c.ssml, i)) {
        const d = { plain: h.plain };
        h.language && (d.language = h.language), o.push(d);
      }
      continue;
    }
    const l = {};
    i && (l.language = i), n.format === "ssml" ? l.ssml = c.ssml : l.plain = jt(c.ssml), (n.language === "block-level" || n.language === "none") && (l.ssml && (l.ssml = dn(l.ssml)), n.language === "none" && delete l.language), o.push(l);
  }
  const a = o.length > 1 ? Ut(o, n.format) : void 0;
  r.push(...a ? [a] : o);
}
function vn(t, e, r) {
  const n = t.role ?? [];
  if (qr(n, r.skip)) return;
  const i = n.includes("footnote"), s = n.filter(
    (o) => !(i && (o === "footnote" || o === "aside")) && o !== "pagebreak"
  );
  for (const o of s)
    Ir(e, r, o, "before");
  if (n.includes("noteref"))
    for (const o of t.children ?? []) {
      const a = o.role ?? [];
      if (!qr(a, r.skip))
        if (a.includes("footnote")) {
          const c = [];
          Se([o], c, r);
          const l = r.contextualize ? r.announcements.footnote : void 0, h = [];
          if (l !== void 0) {
            const g = Fe(l) ? l.start : l;
            h.push(ie(Ee(g), r.format));
          }
          h.push(...c), l !== void 0 && Fe(l) && h.push(ie(Ee(l.end), r.format));
          const d = l !== void 0 && h.length > 1 ? Ut(h, r.format) : void 0;
          e.push(...d ? [d] : h);
        } else
          Se([o], e, r);
    }
  else {
    const o = typeof t.text == "object" ? t.text.ssml : void 0;
    if (r.interruptSentence && o && rl(o))
      sl(t, o, e, r);
    else if (n.includes("pagebreak"))
      e.push(...il(t, r)), t.children && Se(t.children, e, r);
    else {
      const a = gn(t.text);
      a && e.push(...bn(a, r.format, r.language)), t.children && Se(t.children, e, r);
    }
  }
  t.description !== void 0 && e.push(ie(t.description, r.format));
  for (const o of s)
    Ir(e, r, o, "after");
}
function Se(t, e, r) {
  for (const n of t) vn(n, e, r);
}
function pl(t, e) {
  const r = {
    announcements: { ...Go, ...e.announcements },
    skip: new Set(e.skip ?? []),
    format: e.format ?? "plain",
    contextualize: e.contextualize ?? !0,
    interruptSentence: e.interruptSentence ?? !1,
    language: e.language
  }, n = [];
  return Se(t, n, r), n;
}
const ml = [
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
];
export {
  co as BUILTIN_DECORATION_TYPES,
  yo as DecorationController,
  so as DecorationLayout,
  C as DecorationStyleType,
  io as DecorationWidth,
  lo as Decorator,
  fo as DirectCommsChannel,
  po as DirectCommsFrame,
  mo as DirectCommsHost,
  He as Locator,
  V as LocatorLocations,
  We as LocatorText,
  So as ReadiumSpeechDecorationController,
  wt as WebSpeechEngine,
  ol as WebSpeechEngineProvider,
  ll as WebSpeechReadAloudNavigator,
  O as WebSpeechVoiceManager,
  ke as chineseVariantMap,
  wo as createLocator,
  go as decorationsEqual,
  Go as defaultAnnouncements,
  pl as extractUtterances,
  fl as makeGnd,
  Wo as parseMarkup,
  xr as resolveDecorationForWire,
  gl as setupDecorations,
  ml as skippableRoles,
  uo as supportsDecorationStyle
};
