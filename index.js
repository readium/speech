const ie = (e) => {
  if (!e) return ["", void 0];
  const a = e.replace(/_/g, "-");
  try {
    const n = new Intl.Locale(a);
    return [
      n.language.toLowerCase(),
      n.region?.toUpperCase()
    ];
  } catch {
    const n = a.split("-");
    return [
      n[0].toLowerCase(),
      n[1]?.toUpperCase()
    ];
  }
};
const ka = "ar-SA", qa = "مرحبًا، اسمي {name} وأنا صوت عربي.", xa = [{ label: "Amina", name: "Microsoft Amina Online (Natural) - Arabic (Algeria)", language: "ar-DZ", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Ismael", name: "Microsoft Ismael Online (Natural) - Arabic (Algeria)", language: "ar-DZ", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Laila", name: "Microsoft Laila Online (Natural) - Arabic (Bahrain)", language: "ar-BH", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Ali", name: "Microsoft Ali Online (Natural) - Arabic (Bahrain)", language: "ar-BH", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Salma", name: "Microsoft Salma Online (Natural) - Arabic (Egypt)", language: "ar-EG", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Shakir", name: "Microsoft Shakir Online (Natural) - Arabic (Egypt)", language: "ar-EG", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Rana", name: "Microsoft Rana Online (Natural) - Arabic (Iraq)", language: "ar-IQ", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Bassel", name: "Microsoft Bassel Online (Natural) - Arabic (Iraq)", language: "ar-IQ", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Sana", name: "Microsoft Sana Online (Natural) - Arabic (Jordan)", language: "ar-JO", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Taim", name: "Microsoft Taim Online (Natural) - Arabic (Jordan)", language: "ar-JO", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Noura", name: "Microsoft Noura Online (Natural) - Arabic (Kuwait)", language: "ar-KW", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Fahed", name: "Microsoft Fahed Online (Natural) - Arabic (Kuwait)", language: "ar-KW", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Layla", name: "Microsoft Layla Online (Natural) - Arabic (Lebanon)", language: "ar-LB", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Rami", name: "Microsoft Rami Online (Natural) - Arabic (Lebanon)", language: "ar-LB", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Iman", name: "Microsoft Iman Online (Natural) - Arabic (Libya)", language: "ar-LY", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Omar", name: "Microsoft Omar Online (Natural) - Arabic (Libya)", language: "ar-LY", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Mouna", name: "Microsoft Mouna Online (Natural) - Arabic (Morocco)", language: "ar-MA", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Jamal", name: "Microsoft Jamal Online (Natural) - Arabic (Morocco)", language: "ar-MA", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Aysha", name: "Microsoft Aysha Online (Natural) - Arabic (Oman)", language: "ar-OM", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Abdullah", name: "Microsoft Abdullah Online (Natural) - Arabic (Oman)", language: "ar-OM", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Amal", name: "Microsoft Amal Online (Natural) - Arabic (Qatar)", language: "ar-QA", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Moaz", name: "Microsoft Moaz Online (Natural) - Arabic (Qatar)", language: "ar-QA", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Zariyah", name: "Microsoft Zariyah Online (Natural) - Arabic (Saudi Arabia)", language: "ar-SA", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Hamed", name: "Microsoft Hamed Online (Natural) - Arabic (Saudi Arabia)", language: "ar-SA", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Amany", name: "Microsoft Amany Online (Natural) - Arabic (Syria)", language: "ar-SY", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Laith", name: "Microsoft Laith Online (Natural) - Arabic (Syria)", language: "ar-SY", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Reem", name: "Microsoft Reem Online (Natural) - Arabic (Tunisia)", language: "ar-TN", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Hedi", name: "Microsoft Hedi Online (Natural) - Arabic (Tunisia)", language: "ar-TN", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Fatima", name: "Microsoft Fatima Online (Natural) - Arabic (United Arab Emirates)", language: "ar-AE", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Hamdan", name: "Microsoft Hamdan Online (Natural) - Arabic (United Arab Emirates)", language: "ar-AE", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Maryam", name: "Microsoft Maryam Online (Natural) - Arabic (Yemen)", language: "ar-YE", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Saleh", name: "Microsoft Saleh Online (Natural) - Arabic (Yemen)", language: "ar-YE", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Mariam", name: "Mariam", localizedName: "apple", language: "ar-001", gender: "female", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"] }, { label: "Apple Laila", name: "Laila", localizedName: "apple", language: "ar-001", gender: "female", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"] }, { label: "Tarik", name: "Tarik", localizedName: "apple", language: "ar-001", gender: "male", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"] }, { label: "Majed", name: "Majed", localizedName: "apple", language: "ar-001", gender: "male", quality: ["low", "normal", "high"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { label: "Hoda", name: "Microsoft Hoda - Arabic (Arabic )", language: "ar-EG", gender: "female", quality: ["normal"], rate: 1, pitch: 1, os: ["Windows"], preloaded: !0 }, { label: "Naayf", name: "Microsoft Naayf - Arabic (Saudi Arabia)", language: "ar-AS", gender: "male", quality: ["normal"], rate: 1, pitch: 1, os: ["Windows"], preloaded: !0 }, { label: "صوت انثوي 1", name: "Android Speech Recognition and Synthesis from Google ar-xa-x-arc-network", altNames: ["Android Speech Recognition and Synthesis from Google ar-xa-x-arc-local", "Android Speech Recognition and Synthesis from Google ar-language"], nativeID: ["ar-xa-x-arc-network", "ar-xa-x-arc-local"], language: "ar", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "صوت انثوي 2", name: "Android Speech Recognition and Synthesis from Google ar-xa-x-arz-network", altNames: ["Android Speech Recognition and Synthesis from Google ar-xa-x-arz-local"], nativeID: ["ar-xa-x-arz-network", "ar-xa-x-arz-local"], language: "ar", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "صوت ذكر 1", name: "Android Speech Recognition and Synthesis from Google ar-xa-x-ard-network", altNames: ["Android Speech Recognition and Synthesis from Google ar-xa-x-ard-local"], nativeID: ["ar-xa-x-ard-network", "ar-xa-x-ard-local"], language: "ar", gender: "male", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "صوت ذكر 2", name: "Android Speech Recognition and Synthesis from Google ar-xa-x-are-network", altNames: ["Android Speech Recognition and Synthesis from Google ar-xa-x-are-local"], nativeID: ["ar-xa-x-are-network", "ar-xa-x-are-local"], language: "ar", gender: "male", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }], Ra = {
  language: "ar",
  defaultRegion: ka,
  testUtterance: qa,
  voices: xa
}, Ea = "bg", Ga = "bg-BG", Ia = "Здравейте, казвам се {name} и съм български глас.", Ta = [{ label: "Kalina", name: "Microsoft Kalina Online (Natural) - Bulgarian (Bulgaria)", language: "bg-BG", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Borislav", name: "Microsoft Borislav Online (Natural) - Bulgarian (Bulgaria)", language: "bg-BG", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Daria", name: "Daria", localizedName: "apple", language: "bg-BG", gender: "female", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { label: "Ivan", name: "Microsoft Ivan - Bulgarian (Bulgaria)", language: "bg-BG", gender: "male", quality: ["normal"], rate: 1, pitch: 1, os: ["Windows"], preloaded: !0 }, { label: "Женски глас", name: "Android Speech Recognition and Synthesis from Google bg-bg-x-ifk-network", altNames: ["Android Speech Recognition and Synthesis from Google bg-bg-x-ifk-local", "Android Speech Recognition and Synthesis from Google bg-bg-language"], nativeID: ["bg-bg-x-ifk-network", "bg-bg-x-ifk-local"], language: "bg-BG", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }], Ma = {
  language: Ea,
  defaultRegion: Ga,
  testUtterance: Ia,
  voices: Ta
}, Ha = "bho", Da = "bho-IN", Pa = "नमस्कार, हमार नाम {name} ह आ हम भोजपुरी आवाज हईं", La = [{ label: "Jaya", name: "Jaya", localizedName: "apple", language: "bho-IN", gender: "female", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }], Ua = {
  language: Ha,
  defaultRegion: Da,
  testUtterance: Pa,
  voices: La
}, za = "bn", Ba = "bn-IN", $a = "হ্যালো, আমার নাম {name} এবং আমি একজন বাংলা ভয়েস।", ja = [{ label: "Tanishaa", name: "Microsoft Tanishaa Online (Natural) - Bengali (India)", language: "bn-IN", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Bashkar", name: "Microsoft Bashkar Online (Natural) - Bangla (India)", language: "bn-IN", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Nabanita", name: "Microsoft Nabanita Online (Natural) - Bangla (Bangladesh)", language: "bn-BD", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Pradeep", name: "Microsoft Pradeep Online (Natural) - Bangla (Bangladesh)", language: "bn-BD", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Piya", name: "Piya", localizedName: "apple", language: "bn-IN", gender: "female", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { label: "মহিলা কণ্ঠস্বর 1", name: "Android Speech Recognition and Synthesis from Google bn-in-x-bnf-network", altNames: ["Android Speech Recognition and Synthesis from Google bn-in-x-bnf-local", "Android Speech Recognition and Synthesis from Google bn-IN-language"], nativeID: ["bn-in-x-bnf-network", "bn-in-x-bnf-local"], language: "bn-IN", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "মহিলা কণ্ঠস্বর 2", name: "Android Speech Recognition and Synthesis from Google bn-in-x-bnx-network", altNames: ["Android Speech Recognition and Synthesis from Google bn-in-x-bnx-local"], nativeID: ["bn-in-x-bnx-network", "bn-in-x-bnx-local"], language: "bn-IN", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "পুরুষ কন্ঠ 1", name: "Android Speech Recognition and Synthesis from Google bn-in-x-bin-network", altNames: ["Android Speech Recognition and Synthesis from Google bn-in-x-bin-local"], nativeID: ["bn-in-x-bin-network", "bn-in-x-bin-local"], language: "bn-IN", gender: "male", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "পুরুষ কন্ঠ 2", name: "Android Speech Recognition and Synthesis from Google bn-in-x-bnm-network", altNames: ["Android Speech Recognition and Synthesis from Google bn-in-x-bnm-local"], nativeID: ["bn-in-x-bnm-network", "bn-in-x-bnm-local"], language: "bn-IN", gender: "male", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "পুরুষ কন্ঠ", name: "Google বাংলা (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google bn-bd-x-ban-network", "Chrome OS বাংলা", "Android Speech Recognition and Synthesis from Google bn-bd-x-ban-local", "Android Speech Recognition and Synthesis from Google bn-BD-language"], nativeID: ["bn-bd-x-ban-network", "bn-bd-x-ban-local"], language: "bn-BD", gender: "male", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }], Fa = {
  language: za,
  defaultRegion: Ba,
  testUtterance: $a,
  voices: ja
}, Va = "ca", Ka = "ca-ES", Wa = "Hola, em dic {name} i sóc una veu catalana", _a = [{ label: "Joana (Català)", name: "Microsoft Joana Online (Natural) - Catalan", language: "ca-ES", otherLanguages: ["es"], gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Enric (Català)", name: "Microsoft Enric Online (Natural) - Catalan", language: "ca-ES", otherLanguages: ["es"], gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Montse (Català)", name: "Montse", localizedName: "apple", language: "ca-ES", gender: "female", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { label: "Pau (Valencià)", name: "Pau", localizedName: "apple", language: "ca-ES-u-sd-esvc", gender: "female", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"] }, { label: "Jordi (Català)", name: "Jordi", localizedName: "apple", language: "ca-ES", gender: "male", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"] }, { label: "Herena (Català)", name: "Microsoft Herena - Catalan (Spain)", language: "ca-ES", gender: "female", quality: ["normal"], rate: 1, pitch: 1, os: ["Windows"], preloaded: !0 }, { label: "Veu femenina catalana", name: "Android Speech Recognition and Synthesis from Google ca-es-x-caf-network", altNames: ["Android Speech Recognition and Synthesis from Google ca-es-x-caf-local", "Android Speech Recognition and Synthesis from Google ca-ES-language"], nativeID: ["ca-es-x-caf-network", "ca-es-x-caf-local"], language: "ca-ES", otherLanguages: ["es"], gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }], Ja = {
  language: Va,
  defaultRegion: Ka,
  testUtterance: Wa,
  voices: _a
}, Ya = "cmn", Za = "cmn-CN", Qa = "你好，我的名字是 {name}，我是普通话配音。", Xa = /* @__PURE__ */ JSON.parse(`[{"label":"Xiaoxiao","name":"Microsoft Xiaoxiao Online (Natural) - Chinese (Mainland)","language":"cmn-CN","altLanguage":"zh-CN","gender":"female","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Xiaoyi","name":"Microsoft Xiaoyi Online (Natural) - Chinese (Mainland)","language":"cmn-CN","altLanguage":"zh-CN","gender":"female","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Yunxi","name":"Microsoft Yunxi Online (Natural) - Chinese (Mainland)","language":"cmn-CN","altLanguage":"zh-CN","gender":"female","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Yunxia","name":"Microsoft Yunxia Online (Natural) - Chinese (Mainland)","language":"cmn-CN","altLanguage":"zh-CN","gender":"female","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Xiaobei","name":"Microsoft Xiaobei Online (Natural) - Chinese (Northeastern Mandarin)","language":"cmn-CN-liaoning","altLanguage":"zh-CN-liaoning","gender":"female","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Xiaoni","name":"Microsoft Xiaoni Online (Natural) - Chinese (Zhongyuan Mandarin Shaanxi)","language":"cmn-CN-shaanxi","altLanguage":"zh-CN-shaanxi","gender":"female","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Yunjian","name":"Microsoft Yunjian Online (Natural) - Chinese (Mainland)","language":"cmn-CN","altLanguage":"zh-CN","gender":"male","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Yunyang","name":"Microsoft Yunyang Online (Natural) - Chinese (Mainland)","language":"cmn-CN","altLanguage":"zh-CN","gender":"male","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"HsiaoChen","name":"Microsoft HsiaoChen Online (Natural) - Chinese (Taiwan)","language":"cmn-TW","altLanguage":"zh-TW","gender":"female","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"HsiaoYu","name":"Microsoft HsiaoYu Online (Natural) - Chinese (Taiwanese Mandarin)","language":"cmn-TW","altLanguage":"zh-TW","gender":"female","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"YunJhe","name":"Microsoft YunJhe Online (Natural) - Chinese (Taiwan)","language":"cmn-TW","altLanguage":"zh-TW","gender":"male","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Google 女声","name":"Google 普通话（中国大陆）","note":"This voice is pre-loaded in Chrome on desktop. Utterances that are longer than 14 seconds long can trigger a bug with this voice, check the notes in the project's README for more information.","language":"cmn-CN","altLanguage":"zh-CN","gender":"female","quality":["high"],"rate":1,"pitch":1,"browser":["ChromeDesktop"],"preloaded":true},{"label":"Google 女聲","name":"Google 國語（臺灣）","note":"This voice is pre-loaded in Chrome on desktop. Utterances that are longer than 14 seconds long can trigger a bug with this voice, check the notes in the project's README for more information.","language":"cmn-TW","altLanguage":"zh-TW","gender":"female","quality":["high"],"rate":1,"pitch":1,"browser":["ChromeDesktop"],"preloaded":true},{"label":"Lilian","name":"Lilian","localizedName":"apple","language":"cmn-CN","altLanguage":"zh-CN","gender":"female","quality":["normal","high"],"rate":1,"pitch":1,"os":["macOS","iOS","iPadOS"]},{"label":"Tiantian","name":"Tiantian","localizedName":"apple","language":"cmn-CN","altLanguage":"zh-CN","gender":"female","quality":["low","normal"],"rate":1,"pitch":1,"os":["macOS","iOS","iPadOS"]},{"label":"Shasha","name":"Shasha","localizedName":"apple","language":"cmn-CN","altLanguage":"zh-CN","gender":"female","quality":["normal"],"rate":1,"pitch":1,"os":["macOS","iOS","iPadOS"]},{"label":"Lili","name":"Lili","localizedName":"apple","language":"cmn-CN","altLanguage":"zh-CN","gender":"female","quality":["low","normal","high"],"rate":1,"pitch":1,"os":["macOS","iOS","iPadOS"]},{"label":"Lisheng","name":"Lisheng","localizedName":"apple","language":"cmn-CN","altLanguage":"zh-CN","gender":"female","quality":["normal"],"rate":1,"pitch":1,"os":["macOS","iOS","iPadOS"]},{"label":"Lanlan","name":"Lanlan","localizedName":"apple","language":"cmn-CN","altLanguage":"zh-CN","gender":"female","quality":["normal"],"rate":1,"pitch":1,"os":["macOS","iOS","iPadOS"]},{"label":"Shanshan","name":"Shanshan","localizedName":"apple","language":"cmn-CN","altLanguage":"zh-CN","gender":"female","quality":["normal"],"rate":1,"pitch":1,"os":["macOS","iOS","iPadOS"]},{"label":"Yue","name":"Yue","localizedName":"apple","language":"cmn-CN","altLanguage":"zh-CN","gender":"female","quality":["high"],"rate":1,"pitch":1,"os":["macOS","iOS","iPadOS"]},{"label":"Tingting","name":"Tingting","localizedName":"apple","language":"cmn-CN","altLanguage":"zh-CN","gender":"female","quality":["low","normal"],"rate":1,"pitch":1,"os":["macOS","iOS","iPadOS"],"preloaded":true},{"label":"Yu-shu","name":"Yu-shu","localizedName":"apple","language":"cmn-CN","altLanguage":"zh-CN","gender":"female","quality":["low","normal"],"rate":1,"pitch":1,"os":["macOS","iOS","iPadOS"],"preloaded":true},{"label":"Dongmei","name":"Dongmei","localizedName":"apple","language":"cmn-CN-liaoning","altLanguage":"zh-CN-liaoning","gender":"female","quality":["normal"],"rate":1,"pitch":1,"os":["macOS","iOS","iPadOS"]},{"label":"Panpan","name":"Panpan","localizedName":"apple","language":"cmn-CN-sichuan","altLanguage":"zh-CN-sichuan","gender":"female","quality":["low","high"],"rate":1,"pitch":1,"os":["macOS","iOS","iPadOS"]},{"label":"Meijia","name":"Meijia","localizedName":"apple","language":"cmn-TW","altLanguage":"zh-TW","gender":"female","quality":["low","high"],"rate":1,"pitch":1,"os":["macOS","iOS","iPadOS"]},{"label":"Han","name":"Han","localizedName":"apple","language":"cmn-CN","altLanguage":"zh-CN","gender":"male","quality":["low","normal","high"],"rate":1,"pitch":1,"os":["macOS","iOS","iPadOS"]},{"label":"Bobo","name":"Bobo","localizedName":"apple","language":"cmn-CN","altLanguage":"zh-CN","gender":"male","quality":["normal"],"rate":1,"pitch":1,"os":["macOS","iOS","iPadOS"]},{"label":"Taotao","name":"Taotao","localizedName":"apple","language":"cmn-CN","altLanguage":"zh-CN","gender":"male","quality":["normal"],"rate":1,"pitch":1,"os":["macOS","iOS","iPadOS"]},{"label":"Binbin","name":"Binbin","localizedName":"apple","language":"cmn-CN","altLanguage":"zh-CN","gender":"male","quality":["low","normal"],"rate":1,"pitch":1,"os":["macOS","iOS","iPadOS"]},{"label":"Li-Mu","name":"Li-Mu","localizedName":"apple","language":"cmn-CN","altLanguage":"zh-CN","gender":"male","quality":["low","normal"],"rate":1,"pitch":1,"os":["macOS","iOS","iPadOS"],"preloaded":true},{"label":"Haohao","name":"Haohao","localizedName":"apple","language":"cmn-CN-shaanxi","altLanguage":"zh-CN-shaanxi","gender":"male","quality":["low","normal"],"rate":1,"pitch":1,"os":["macOS","iOS","iPadOS"],"preloaded":true},{"label":"Huihui","name":"Microsoft Huihui - Chinese (Simplified, PRC)","language":"cmn-CN","altLanguage":"zh-CN","gender":"female","quality":["normal"],"rate":1,"pitch":1,"os":["Windows"],"preloaded":true},{"label":"Yaoyao","name":"Microsoft Yaoyao - Chinese (Simplified, PRC)","language":"cmn-CN","altLanguage":"zh-CN","gender":"female","quality":["normal"],"rate":1,"pitch":1,"os":["Windows"],"preloaded":true},{"label":"Kangkang","name":"Microsoft Kangkang - Chinese (Simplified, PRC)","language":"cmn-CN","altLanguage":"zh-CN","gender":"male","quality":["normal"],"rate":1,"pitch":1,"os":["Windows"],"preloaded":true},{"label":"Yating","name":"Microsoft Yating - Chinese (Traditional, Taiwan)","language":"cmn-TW","altLanguage":"zh-TW","gender":"female","quality":["normal"],"rate":1,"pitch":1,"os":["Windows"],"preloaded":true},{"label":"Hanhan","name":"Microsoft Hanhan - Chinese (Traditional, Taiwan)","language":"cmn-TW","altLanguage":"zh-TW","gender":"female","quality":["normal"],"rate":1,"pitch":1,"os":["Windows"],"preloaded":true},{"label":"Zhiwei","name":"Microsoft Zhiwei - Chinese (Traditional, Taiwan)","language":"cmn-TW","altLanguage":"zh-TW","gender":"male","quality":["normal"],"rate":1,"pitch":1,"os":["Windows"],"preloaded":true},{"label":"女声1","name":"Android Speech Recognition and Synthesis from Google cmn-CN-x-ccc-network","altNames":["Android Speech Recognition and Synthesis from Google cmn-CN-x-ccc-local","Android Speech Recognition and Synthesis from Google zh-CN-language"],"nativeID":["cmn-CN-x-ccc-network","cmn-CN-x-ccc-local"],"language":"cmn-CN","altLanguage":"zh-CN","gender":"female","quality":["high"],"rate":1,"pitch":1,"os":["Android","ChromeOS"],"preloaded":true},{"label":"女声2","name":"Android Speech Recognition and Synthesis from Google cmn-CN-x-ssa-network","altNames":["Android Speech Recognition and Synthesis from Google cmn-CN-x-ssa-local"],"nativeID":["cmn-CN-x-ssa-network","cmn-CN-x-ssa-local"],"language":"cmn-CN","altLanguage":"zh-CN","gender":"female","quality":["high"],"rate":1,"pitch":1,"os":["Android","ChromeOS"],"preloaded":true},{"label":"男声1","name":"Android Speech Recognition and Synthesis from Google cmn-CN-x-ccd-network","altNames":["Android Speech Recognition and Synthesis from Google cmn-CN-x-ccd-local"],"nativeID":["cmn-CN-x-ccd-network","cmn-CN-x-ccd-local"],"language":"cmn-CN","altLanguage":"zh-CN","gender":"male","quality":["high"],"rate":1,"pitch":1,"os":["Android","ChromeOS"],"preloaded":true},{"label":"男声2","name":"Android Speech Recognition and Synthesis from Google cmn-CN-x-cce-network","altNames":["Android Speech Recognition and Synthesis from Google cmn-CN-x-cce-local"],"nativeID":["cmn-CN-x-cce-network","cmn-CN-x-cce-local"],"language":"cmn-CN","altLanguage":"zh-CN","gender":"male","quality":["high"],"rate":1,"pitch":1,"os":["Android","ChromeOS"],"preloaded":true},{"label":"女聲","name":"Android Speech Recognition and Synthesis from Google cmn-TW-x-ctc-network","altNames":["Android Speech Recognition and Synthesis from Google cmn-TW-x-ctc-local","Android Speech Recognition and Synthesis from Google zh-TW-language"],"nativeID":["cmn-TW-x-ctc-network","cmn-TW-x-ctc-local"],"language":"cmn-TW","altLanguage":"zh-TW","gender":"female","quality":["high"],"rate":1,"pitch":1,"os":["Android","ChromeOS"],"preloaded":true},{"label":"男聲1","name":"Android Speech Recognition and Synthesis from Google cmn-TW-x-ctd-network","altNames":["Chrome OS 粵語 1","Android Speech Recognition and Synthesis from Google cmn-TW-x-ctd-local"],"nativeID":["cmn-TW-x-ctd-network","cmn-TW-x-ctd-local"],"language":"cmn-TW","altLanguage":"zh-TW","gender":"male","quality":["high"],"rate":1,"pitch":1,"os":["Android","ChromeOS"],"preloaded":true},{"label":"男聲2","name":"Android Speech Recognition and Synthesis from Google cmn-TW-x-cte-network","altNames":["Chrome OS 粵語 1","Android Speech Recognition and Synthesis from Google cmn-TW-x-cte-local"],"nativeID":["cmn-TW-x-cte-network","cmn-TW-x-cte-local"],"language":"cmn-CTW","altLanguage":"zh-TW","gender":"male","quality":["high"],"rate":1,"pitch":1,"os":["Android","ChromeOS"],"preloaded":true}]`), en = {
  language: Ya,
  defaultRegion: Za,
  testUtterance: Qa,
  voices: Xa
}, an = "cs", nn = "cs-CZ", rn = "Dobrý den, jmenuji se {name} a jsem český hlas.", tn = [{ label: "Vlasta", name: "Microsoft Vlasta Online (Natural) - Czech (Czech)", language: "cs-CZ", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Antonin", name: "Microsoft Antonin Online (Natural) - Czech (Czech)", language: "cs-CZ", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Zuzana", name: "Zuzana", localizedName: "apple", language: "cs-CZ", gender: "female", quality: ["low", "normal", "high"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { label: "Iveta", name: "Iveta", localizedName: "apple", language: "cs-CZ", gender: "female", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"] }, { label: "Jakub", name: "Microsoft Jakub - Czech (Czech)", language: "cs-CZ", gender: "male", quality: ["normal"], rate: 1, pitch: 1, os: ["Windows"], preloaded: !0 }, { label: "Ženský hlas", name: "Google čeština (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google cs-cz-x-jfs-network", "Chrome OS čeština", "Android Speech Recognition and Synthesis from Google cs-cz-x-jfs-local", "Android Speech Recognition and Synthesis from Google cs-CZ-language"], nativeID: ["cs-cz-x-jfs-network", "cs-cz-x-jfs-local"], language: "cs-CZ", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }], on = {
  language: an,
  defaultRegion: nn,
  testUtterance: rn,
  voices: tn
}, ln = "da", sn = "da-DK", gn = "Hej, mit navn er {name} og jeg er en dansk stemme.", dn = [{ label: "Christel", name: "Microsoft Christel Online (Natural) - Danish (Denmark)", language: "da-DK", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Jeppe", name: "Microsoft Jeppe Online (Natural) - Danish (Denmark)", language: "da-DK", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Sara", name: "Sara", localizedName: "apple", language: "da-DK", gender: "female", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { label: "Magnus", name: "Magnus", localizedName: "apple", language: "da-DK", gender: "male", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"] }, { label: "Helle", name: "Microsoft Helle - Danish (Denmark)", language: "da-DK", gender: "female", quality: ["normal"], rate: 1, pitch: 1, os: ["Windows"], preloaded: !0 }, { label: "Kvindestemme 1", name: "Google Dansk 1 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google da-dk-x-kfm-network", "Chrome OS Dansk 1", "Android Speech Recognition and Synthesis from Google da-dk-x-kfm-local", "Android Speech Recognition and Synthesis from Google da-DK-language"], nativeID: ["da-dk-x-kfm-network", "da-dk-x-kfm-local"], language: "da-DK", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "Kvindestemme 2", name: "Google Dansk 3 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google da-dk-x-sfp-network", "Chrome OS Dansk 3", "Android Speech Recognition and Synthesis from Google da-dk-x-sfp-local"], nativeID: ["da-dk-x-sfp-network", "da-dk-x-sfp-local"], language: "da-DK", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "Kvindestemme 3", name: "Google Dansk 4 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google da-dk-x-vfb-network", "Chrome OS Dansk 4", "Android Speech Recognition and Synthesis from Google da-dk-x-vfb-local"], nativeID: ["da-dk-x-vfb-network", "da-dk-x-vfb-local"], language: "da-DK", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "Mandsstemme", name: "Google Dansk 2 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google da-dk-x-nmm-network", "Chrome OS Dansk 2", "Android Speech Recognition and Synthesis from Google da-dk-x-nmm-local"], nativeID: ["da-dk-x-nmm-network", "da-dk-x-nmm-local"], language: "da-DK", gender: "male", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }], cn = {
  language: ln,
  defaultRegion: sn,
  testUtterance: gn,
  voices: dn
}, un = "de", hn = "de-DE", mn = "Hallo, mein Name ist {name} und ich bin eine deutsche Stimme.", pn = [{ label: "Seraphina", name: "Microsoft SeraphinaMultilingual Online (Natural) - German (Germany)", language: "de-DE", multiLingual: !0, gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Amala", name: "Microsoft Amala Online (Natural) - German (Germany)", language: "de-DE", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Katja", name: "Microsoft Katja Online (Natural) - German (Germany)", language: "de-DE", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Florian", name: "Microsoft FlorianMultilingual Online (Natural) - German (Germany)", language: "de-DE", multiLingual: !0, gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Conrad", name: "Microsoft Conrad Online (Natural) - German (Germany)", language: "de-DE", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Killian", name: "Microsoft Killian Online (Natural) - German (Germany)", language: "de-DE", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Ingrid", name: "Microsoft Ingrid Online (Natural) - German (Austria)", language: "de-AT", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Jonas", name: "Microsoft Jonas Online (Natural) - German (Austria)", language: "de-AT", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Leni", name: "Microsoft Leni Online (Natural) - German (Switzerland)", language: "de-CH", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Jan", name: "Microsoft Jan Online (Natural) - German (Switzerland)", language: "de-CH", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Weibliche Google-Stimme", name: "Google Deutsch", language: "de-DE", gender: "female", quality: ["high"], rate: 1, pitch: 1, browser: ["ChromeDesktop"], preloaded: !0 }, { label: "Petra", name: "Petra", localizedName: "apple", language: "de-DE", gender: "female", quality: ["low", "normal", "high"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"] }, { label: "Anna", name: "Anna", localizedName: "apple", language: "de-DE", gender: "female", quality: ["low", "normal", "high"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { label: "Helena", name: "Helena", localizedName: "apple", note: "This is a compact version of a preloaded Siri voice on macOS.", language: "de-DE", gender: "female", quality: ["low"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { label: "Markus", name: "Markus", localizedName: "apple", language: "de-DE", gender: "male", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"] }, { label: "Viktor", name: "Viktor", localizedName: "apple", language: "de-DE", gender: "male", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"] }, { label: "Yannick", name: "Yannick", localizedName: "apple", language: "de-DE", gender: "male", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"] }, { label: "Martin", name: "Martin", localizedName: "apple", note: "This is a compact version of a preloaded Siri voice on macOS.", language: "de-DE", gender: "male", quality: ["low"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { label: "Hedda", name: "Microsoft Hedda - German (Germany)", language: "de-DE", gender: "female", quality: ["normal"], rate: 1, pitch: 1, os: ["Windows"], preloaded: !0 }, { label: "Katja", name: "Microsoft Katja - German (Germany)", language: "de-DE", gender: "female", quality: ["normal"], rate: 1, pitch: 1, os: ["Windows"], preloaded: !0 }, { label: "Stefan", name: "Microsoft Stefan - German (Germany)", language: "de-DE", gender: "male", quality: ["normal"], rate: 1, pitch: 1, os: ["Windows"], preloaded: !0 }, { label: "Michael", name: "Microsoft Michael - German (Austria)", language: "de-AT", gender: "male", quality: ["normal"], rate: 1, pitch: 1, os: ["Windows"], preloaded: !0 }, { label: "Karsten", name: "Microsoft Karsten - German (Switzerland)", language: "de-CH", gender: "male", quality: ["normal"], rate: 1, pitch: 1, os: ["Windows"], preloaded: !0 }, { label: "Weibliche Stimme 1 (Deutschland)", name: "Google Deutsch 2 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google de-de-x-dea-network", "Chrome OS Deutsch 2", "Android Speech Recognition and Synthesis from Google de-de-x-dea-local", "Android Speech Recognition and Synthesis from Google de-DE-language"], nativeID: ["de-de-x-dea-network", "de-de-x-dea-local"], language: "de-DE", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "Weibliche Stimme 2 (Deutschland)", name: "Google Deutsch 1 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google de-de-x-nfh-network", "Chrome OS Deutsch 1", "Android Speech Recognition and Synthesis from Google de-de-x-nfh-local"], nativeID: ["de-de-x-nfh-network", "de-de-x-nfh-local"], language: "de-DE", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "Männliche Stimme 1 (Deutschland)", name: "Google Deutsch 3 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google de-de-x-deb-network", "Chrome OS Deutsch 3", "Android Speech Recognition and Synthesis from Google de-de-x-deb-local"], nativeID: ["de-de-x-deb-network", "de-de-x-deb-local"], language: "de-DE", gender: "male", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "Männliche Stimme 2 (Deutschland)", name: "Google Deutsch 4 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google de-de-x-deg-network", "Chrome OS Deutsch 4", "Android Speech Recognition and Synthesis from Google de-de-x-deg-local"], nativeID: ["de-de-x-deg-network", "de-de-x-deg-local"], language: "de-DE", gender: "male", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }], fn = {
  language: un,
  defaultRegion: hn,
  testUtterance: mn,
  voices: pn
}, yn = "el", Sn = "el-GR", bn = "Γεια σας, με λένε {name} και είμαι ελληνική φωνή.", On = [{ label: "Athina", name: "Microsoft Athina Online (Natural) - Greek (Greece)", language: "el-GR", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Nestoras", name: "Microsoft Nestoras Online (Natural) - Greek (Greece)", language: "el-GR", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Melina", name: "Melina", localizedName: "apple", language: "el-GR", gender: "female", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { label: "Nikos", name: "Nikos", localizedName: "apple", language: "el-GR", gender: "male", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"] }, { label: "Stefanos", name: "Microsoft Stefanos - Greek (Greece)", language: "el-GR", gender: "female", quality: ["normal"], rate: 1, pitch: 1, os: ["Windows"], preloaded: !0 }, { label: "Γυναικεία φωνή", name: "Google Ελληνικά (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google el-gr-x-vfz-network", "Chrome OS Ελληνικά", "Android Speech Recognition and Synthesis from Google el-gr-x-vfz-local", "Android Speech Recognition and Synthesis from Google el-GR-language"], nativeID: ["el-gr-x-vfz-network", "el-gr-x-vfz-local"], language: "el-GR", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }], vn = {
  language: yn,
  defaultRegion: Sn,
  testUtterance: bn,
  voices: On
}, wn = "en", Nn = "en-US", An = "Hello, my name is {name} and I am an English voice.", Cn = /* @__PURE__ */ JSON.parse(`[{"label":"Emma","name":"Microsoft EmmaMultilingual Online (Natural) - English (United States)","altNames":["Microsoft Emma Online (Natural) - English (United States)"],"language":"en-US","multiLingual":true,"gender":"female","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Microsoft Ava","name":"Microsoft AvaMultilingual Online (Natural) - English (United States)","altNames":["Microsoft Ava Online (Natural) - English (United States)"],"language":"en-US","multiLingual":true,"gender":"female","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Jenny","name":"Microsoft Jenny Online (Natural) - English (United States)","language":"en-US","gender":"female","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Aria","name":"Microsoft Aria Online (Natural) - English (United States)","language":"en-US","gender":"female","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Michelle","name":"Microsoft Michelle Online (Natural) - English (United States)","language":"en-US","gender":"female","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Ana","name":"Microsoft Ana Online (Natural) - English (United States)","language":"en-US","gender":"female","children":true,"quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Andrew","name":"Microsoft AndrewMultilingual Online (Natural) - English (United States)","altNames":["Microsoft Andrew Online (Natural) - English (United States)"],"language":"en-US","multiLingual":true,"gender":"male","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Brian","name":"Microsoft BrianMultilingual Online (Natural) - English (United States)","altNames":["Microsoft Brian Online (Natural) - English (United States)"],"language":"en-US","multiLingual":true,"gender":"male","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Guy","name":"Microsoft Guy Online (Natural) - English (United States)","language":"en-US","gender":"male","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Eric","name":"Microsoft Eric Online (Natural) - English (United States)","language":"en-US","gender":"male","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Steffan","name":"Microsoft Steffan Online (Natural) - English (United States)","language":"en-US","gender":"male","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Christopher","name":"Microsoft Christopher Online (Natural) - English (United States)","language":"en-US","gender":"male","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Roger","name":"Microsoft Roger Online (Natural) - English (United States)","language":"en-US","gender":"male","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Sonia","name":"Microsoft Sonia Online (Natural) - English (United Kingdom)","language":"en-GB","gender":"female","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Libby","name":"Microsoft Libby Online (Natural) - English (United Kingdom)","language":"en-GB","gender":"female","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Maisie","name":"Microsoft Maisie Online (Natural) - English (United Kingdom)","language":"en-GB","gender":"female","children":true,"quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Ryan","name":"Microsoft Ryan Online (Natural) - English (United Kingdom)","language":"en-GB","gender":"male","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Thomas","name":"Microsoft Thomas Online (Natural) - English (United Kingdom)","language":"en-GB","gender":"male","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Natasha","name":"Microsoft Natasha Online (Natural) - English (Australia)","language":"en-AU","gender":"female","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Hayley","name":"Microsoft Hayley Online - English (Australia)","language":"en-AU","gender":"female","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"William","name":"Microsoft William Online (Natural) - English (Australia)","altNames":["Microsoft WilliamMultilingual Online (Natural) - English (Australia)"],"language":"en-AU","multiLingual":true,"gender":"male","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Clara","name":"Microsoft Clara Online (Natural) - English (Canada)","language":"en-CA","gender":"female","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Heather","name":"Microsoft Heather Online - English (Canada)","language":"en-CA","gender":"female","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Liam","name":"Microsoft Liam Online (Natural) - English (Canada)","language":"en-CA","gender":"male","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Neerja","name":"Microsoft Neerja Online (Natural) - English (India)","altNames":["Microsoft Neerja Online (Natural) - English (India) (Preview)"],"language":"en-IN","gender":"female","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Prabhat","name":"Microsoft Prabhat Online (Natural) - English (India)","language":"en-IN","gender":"male","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Emily","name":"Microsoft Emily Online (Natural) - English (Ireland)","language":"en-IE","gender":"female","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Connor","name":"Microsoft Connor Online (Natural) - English (Ireland)","language":"en-IE","gender":"male","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Leah","name":"Microsoft Leah Online (Natural) - English (South Africa)","language":"en-ZA","gender":"female","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Luke","name":"Microsoft Luke Online (Natural) - English (South Africa)","language":"en-ZA","gender":"male","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Yan","name":"Microsoft Yan Online (Natural) - English (Hong Kong SAR)","language":"en-HK","gender":"female","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Sam","name":"Microsoft Sam Online (Natural) - English (Hongkong)","language":"en-HK","gender":"male","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Asilia","name":"Microsoft Asilia Online (Natural) - English (Kenya)","language":"en-KE","gender":"female","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Chilemba","name":"Microsoft Chilemba Online (Natural) - English (Kenya)","language":"en-KE","gender":"male","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Molly","name":"Microsoft Molly Online (Natural) - English (New Zealand)","language":"en-NZ","gender":"female","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Mitchell","name":"Microsoft Mitchell Online (Natural) - English (New Zealand)","language":"en-NZ","gender":"male","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Ezinne","name":"Microsoft Ezinne Online (Natural) - English (Nigeria)","language":"en-NG","gender":"female","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Abeo","name":"Microsoft Abeo Online (Natural) - English (Nigeria)","language":"en-NG","gender":"male","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Rosa","name":"Microsoft Rosa Online (Natural) - English (Philippines)","language":"en-PH","gender":"female","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"James","name":"Microsoft James Online (Natural) - English (Philippines)","language":"en-PH","gender":"male","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Luna","name":"Microsoft Luna Online (Natural) - English (Singapore)","language":"en-SG","gender":"female","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Wayne","name":"Microsoft Wayne Online (Natural) - English (Singapore)","language":"en-SG","gender":"male","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Imani","name":"Microsoft Imani Online (Natural) - English (Tanzania)","language":"en-TZ","gender":"female","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Elimu","name":"Microsoft Elimu Online (Natural) - English (Tanzania)","language":"en-TZ","gender":"male","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Female Google voice (US)","name":"Google US English","note":"This voice is pre-loaded in Chrome on desktop. Utterances that are longer than 14 seconds long can trigger a bug with this voice, check the notes in the project's README for more information.","language":"en-US","gender":"female","quality":["high"],"rate":1,"pitch":1,"browser":["ChromeDesktop"],"preloaded":true},{"label":"Female Google voice (UK)","name":"Google UK English Female","note":"This voice is pre-loaded in Chrome on desktop. Utterances that are longer than 14 seconds long can trigger a bug with this voice, check the notes in the project's README for more information.","language":"en-GB","gender":"female","quality":["high"],"rate":1,"pitch":1,"browser":["ChromeDesktop"],"preloaded":true},{"label":"Male Google voice (UK)","name":"Google UK English Male","note":"This voice is pre-loaded in Chrome on desktop. Utterances that are longer than 14 seconds long can trigger a bug with this voice, check the notes in the project's README for more information.","language":"en-GB","gender":"male","quality":["high"],"rate":1,"pitch":1,"browser":["ChromeDesktop"],"preloaded":true},{"label":"Apple Ava","name":"Ava","localizedName":"apple","language":"en-US","gender":"female","quality":["low","normal","high"],"rate":1,"pitch":1,"os":["macOS","iOS","iPadOS"]},{"label":"Zoe","name":"Zoe","localizedName":"apple","language":"en-US","gender":"female","quality":["low","normal","high"],"rate":1,"pitch":1,"os":["macOS","iOS","iPadOS"]},{"label":"Allison","name":"Allison","localizedName":"apple","language":"en-US","gender":"female","quality":["low","normal"],"rate":1,"pitch":1,"os":["macOS","iOS","iPadOS"]},{"label":"Nicky","name":"Nicky","localizedName":"apple","note":"This is a compact version of a preloaded Siri voice on macOS. Unlike other Siri voices, a higher quality version can be installed and used.","language":"en-US","gender":"female","quality":["low","normal"],"rate":1,"pitch":1,"os":["macOS","iOS","iPadOS"],"preloaded":true},{"label":"Samantha","name":"Samantha","localizedName":"apple","language":"en-US","gender":"female","quality":["low","normal"],"rate":1,"pitch":1,"os":["macOS","iOS","iPadOS"],"preloaded":true},{"label":"Joelle","name":"Joelle","localizedName":"apple","language":"en-US","gender":"female","children":true,"quality":["normal"],"rate":1,"pitch":1,"os":["macOS","iOS","iPadOS"]},{"label":"Evan","name":"Evan","localizedName":"apple","language":"en-US","gender":"male","quality":["low","normal"],"rate":1,"pitch":1,"os":["macOS","iOS","iPadOS"]},{"label":"Nathan","name":"Nathan","localizedName":"apple","language":"en-US","gender":"male","quality":["low","normal"],"rate":1,"pitch":1,"os":["macOS","iOS","iPadOS"]},{"label":"Tom","name":"Tom","localizedName":"apple","language":"en-US","gender":"male","quality":["low","normal"],"rate":1,"pitch":1,"os":["macOS","iOS","iPadOS"]},{"label":"Alex","name":"Alex","localizedName":"apple","language":"en-US","gender":"male","quality":["high"],"rate":1,"pitch":1,"os":["macOS","iOS","iPadOS"]},{"label":"Aaron","name":"Aaron","localizedName":"apple","note":"This is a compact version of a preloaded Siri voice on macOS.","language":"en-US","gender":"male","quality":["low"],"rate":1,"pitch":1,"os":["macOS","iOS","iPadOS"],"preloaded":true},{"label":"Kate","name":"Kate","localizedName":"apple","language":"en-GB","gender":"female","quality":["low","normal"],"rate":1,"pitch":1,"os":["macOS","iOS","iPadOS"]},{"label":"Stephanie","name":"Stephanie","localizedName":"apple","language":"en-GB","gender":"female","quality":["low","normal"],"rate":1,"pitch":1,"os":["macOS","iOS","iPadOS"]},{"label":"Serena","name":"Serena","localizedName":"apple","language":"en-GB","gender":"female","quality":["low","normal","high"],"rate":1,"pitch":1,"os":["macOS","iOS","iPadOS"]},{"label":"Martha","name":"Martha","localizedName":"apple","note":"This is a compact version of a preloaded Siri voice on macOS.","language":"en-GB","gender":"female","quality":["low"],"rate":1,"pitch":1,"os":["macOS","iOS","iPadOS"],"preloaded":true},{"label":"Jamie","name":"Jamie","localizedName":"apple","language":"en-GB","gender":"male","quality":["low","normal","high"],"rate":1,"pitch":1,"os":["macOS","iOS","iPadOS"]},{"label":"Oliver","name":"Oliver","localizedName":"apple","language":"en-GB","gender":"male","quality":["low","normal"],"rate":1,"pitch":1,"os":["macOS","iOS","iPadOS"]},{"label":"Daniel","name":"Daniel","localizedName":"apple","language":"en-GB","gender":"male","quality":["low","normal"],"rate":1,"pitch":1,"os":["macOS","iOS","iPadOS"],"preloaded":true},{"label":"Arthur","name":"Arthur","localizedName":"apple","note":"This is a compact version of a preloaded Siri voice on macOS.","language":"en-GB","gender":"male","quality":["low"],"rate":1,"pitch":1,"os":["macOS","iOS","iPadOS"],"preloaded":true},{"label":"Matilda","name":"Matilda","localizedName":"apple","language":"en-AU","gender":"female","quality":["low","normal","high"],"rate":1,"pitch":1,"os":["macOS","iOS","iPadOS"]},{"label":"Karen","name":"Karen","localizedName":"apple","language":"en-AU","gender":"female","quality":["low","normal","high"],"rate":1,"pitch":1,"os":["macOS","iOS","iPadOS"],"preloaded":true},{"label":"Catherine","name":"Catherine","localizedName":"apple","note":"This is a compact version of a preloaded Siri voice on macOS.","language":"en-AU","gender":"female","quality":["low"],"rate":1,"pitch":1,"os":["macOS","iOS","iPadOS"],"preloaded":true},{"label":"Lee","name":"Lee","localizedName":"apple","language":"en-AU","gender":"male","quality":["low","normal","high"],"rate":1,"pitch":1,"os":["macOS","iOS","iPadOS"]},{"label":"Gordon","name":"Gordon","localizedName":"apple","note":"This is a compact version of a preloaded Siri voice on macOS.","language":"en-AU","gender":"male","quality":["low"],"rate":1,"pitch":1,"os":["macOS","iOS","iPadOS"],"preloaded":true},{"label":"Aman","name":"Aman","nativeID":["com.apple.voice.Aman"],"localizedName":"apple","language":"en-IN","gender":"male","quality":["high"],"rate":1,"pitch":1,"os":["macOS","iOS","iPadOS"]},{"label":"Tara","name":"Tara","nativeID":["com.apple.voice.Tara"],"localizedName":"apple","language":"en-IN","gender":"female","quality":["high"],"rate":1,"pitch":1,"os":["macOS","iOS","iPadOS"]},{"label":"Isha","name":"Isha","localizedName":"apple","language":"en-IN","gender":"female","quality":["low","normal","high"],"rate":1,"pitch":1,"os":["macOS","iOS","iPadOS"]},{"label":"Sangeeta","name":"Sangeeta","localizedName":"apple","language":"en-IN","gender":"female","quality":["low","normal"],"rate":1,"pitch":1,"os":["macOS","iOS","iPadOS"]},{"label":"Rishi","name":"Rishi","localizedName":"apple","language":"en-IN","gender":"male","quality":["low","normal"],"rate":1,"pitch":1,"os":["macOS","iOS","iPadOS"],"preloaded":true},{"label":"Moira","name":"Moira","localizedName":"apple","language":"en-IE","gender":"female","quality":["low","normal"],"rate":1,"pitch":1,"os":["macOS","iOS","iPadOS"]},{"label":"Tessa","name":"Tessa","localizedName":"apple","language":"en-ZA","gender":"female","quality":["low","normal"],"rate":1,"pitch":1,"os":["macOS","iOS","iPadOS"]},{"label":"Fiona","name":"Fiona","localizedName":"apple","language":"en-GB-u-sd-gbsct","gender":"female","quality":["low","normal"],"rate":1,"pitch":1,"os":["macOS","iOS","iPadOS"]},{"label":"Zira","name":"Microsoft Zira - English (United States)","language":"en-US","gender":"female","quality":["normal"],"rate":1,"pitch":1,"os":["Windows"],"preloaded":true},{"label":"David","name":"Microsoft David - English (United States)","language":"en-US","gender":"male","quality":["normal"],"rate":1,"pitch":1,"os":["Windows"],"preloaded":true},{"label":"Mark","name":"Microsoft Mark - English (United States)","language":"en-US","gender":"male","quality":["normal"],"rate":1,"pitch":1,"os":["Windows"],"preloaded":true},{"label":"Hazel","name":"Microsoft Hazel - English (Great Britain)","language":"en-GB","gender":"female","quality":["normal"],"rate":1,"pitch":1,"os":["Windows"],"preloaded":true},{"label":"Susan","name":"Microsoft Susan - English (Great Britain)","language":"en-GB","gender":"female","quality":["normal"],"rate":1,"pitch":1,"os":["Windows"],"preloaded":true},{"label":"George","name":"Microsoft George - English (Great Britain)","language":"en-GB","gender":"male","quality":["normal"],"rate":1,"pitch":1,"os":["Windows"],"preloaded":true},{"label":"Catherine","name":"Microsoft Catherine - English (Austalia)","language":"en-AU","gender":"female","quality":["normal"],"rate":1,"pitch":1,"os":["Windows"],"preloaded":true},{"label":"James","name":"Microsoft Richard - English (Australia)","language":"en-AU","gender":"male","quality":["normal"],"rate":1,"pitch":1,"os":["Windows"],"preloaded":true},{"label":"Linda","name":"Microsoft Linda - English (Canada)","language":"en-CA","gender":"female","quality":["normal"],"rate":1,"pitch":1,"os":["Windows"],"preloaded":true},{"label":"Richard","name":"Microsoft Richard - English (Canada)","language":"en-CA","gender":"male","quality":["normal"],"rate":1,"pitch":1,"os":["Windows"],"preloaded":true},{"label":"Heera","name":"Microsoft Heera - English (India)","language":"en-IN","gender":"female","quality":["normal"],"rate":1,"pitch":1,"os":["Windows"],"preloaded":true},{"label":"Ravi","name":"Microsoft Ravi - English (India)","language":"en-IN","gender":"male","quality":["normal"],"rate":1,"pitch":1,"os":["Windows"],"preloaded":true},{"label":"Sean","name":"Microsoft Sean - English (Ireland)","language":"en-IE","gender":"male","quality":["normal"],"rate":1,"pitch":1,"os":["Windows"],"preloaded":true},{"label":"Female voice 1 (US)","name":"Google US English 5 (Natural)","altNames":["Android Speech Recognition and Synthesis from Google en-us-x-tpc-network","Chrome OS US English 5","Android Speech Recognition and Synthesis from Google en-us-x-tpc-local","Android Speech Recognition and Synthesis from Google en-US-language"],"nativeID":["en-us-x-tpc-network","en-us-x-tpc-local"],"language":"en-US","gender":"female","quality":["high"],"rate":1,"pitch":1,"os":["Android","ChromeOS"],"preloaded":true},{"label":"Female voice 2 (US)","name":"Google US English 1 (Natural)","altNames":["Android Speech Recognition and Synthesis from Google en-us-x-iob-network","Chrome OS US English 1","Android Speech Recognition and Synthesis from Google en-us-x-iob-local"],"nativeID":["en-us-x-iob-network","en-us-x-iob-local"],"language":"en-US","gender":"female","quality":["high"],"rate":1,"pitch":1,"os":["Android","ChromeOS"],"preloaded":true},{"label":"Female voice 3 (US)","name":"Google US English 2 (Natural)","altNames":["Android Speech Recognition and Synthesis from Google en-us-x-iog-network","Chrome OS US English 2","Android Speech Recognition and Synthesis from Google en-us-x-iog-local"],"nativeID":["en-us-x-iog-network","en-us-x-iog-local"],"language":"en-US","gender":"female","quality":["high"],"rate":1,"pitch":1,"os":["Android","ChromeOS"],"preloaded":true},{"label":"Female voice 4 (US)","name":"Google US English 7 (Natural)","altNames":["Android Speech Recognition and Synthesis from Google en-us-x-tpf-network","Chrome OS US English 7","Android Speech Recognition and Synthesis from Google en-us-x-tpf-local"],"nativeID":["en-us-x-tpf-network","en-us-x-tpf-local"],"language":"en-US","gender":"female","quality":["high"],"rate":1,"pitch":1,"os":["Android","ChromeOS"],"preloaded":true},{"label":"Female voice 5 (US)","name":"Android Speech Recognition and Synthesis from Google en-us-x-sfg-network","altNames":["Android Speech Recognition and Synthesis from Google en-us-x-sfg-local"],"nativeID":["en-us-x-sfg-network","en-us-x-sfg-local"],"language":"en-US","gender":"female","quality":["normal"],"rate":1,"pitch":1,"os":["Android","ChromeOS"],"preloaded":true},{"label":"Female voice 6 (US)","name":"Chrome OS US English 8","language":"en-US","gender":"female","quality":["low"],"rate":1,"pitch":1,"os":["ChromeOS"],"preloaded":true},{"label":"Male voice 1 (US)","name":"Google US English 4 (Natural)","altNames":["Android Speech Recognition and Synthesis from Google en-us-x-iom-network","Chrome OS US English 4","Android Speech Recognition and Synthesis from Google en-us-x-iom-local"],"nativeID":["en-us-x-iom-network","en-us-x-iom-local"],"language":"en-US","gender":"male","quality":["high"],"rate":1,"pitch":1,"os":["Android","ChromeOS"],"preloaded":true},{"label":"Male voice 2 (US)","name":"Google US English 3 (Natural)","altNames":["Android Speech Recognition and Synthesis from Google en-us-x-iol-network","Chrome OS US English 3","Android Speech Recognition and Synthesis from Google en-us-x-iol-local"],"nativeID":["en-us-x-iol-network","en-us-x-iol-local"],"language":"en-US","gender":"male","quality":["high"],"rate":1,"pitch":1,"os":["Android","ChromeOS"],"preloaded":true},{"label":"Male voice 3 (US)","name":"Google US English 6 (Natural)","altNames":["Android Speech Recognition and Synthesis from Google en-us-x-tpd-network","Chrome OS US English 6","Android Speech Recognition and Synthesis from Google en-us-x-tpd-local"],"nativeID":["en-us-x-tpd-network","en-us-x-tpd-local"],"language":"en-US","gender":"male","quality":["high"],"rate":1,"pitch":1,"os":["Android","ChromeOS"],"preloaded":true},{"label":"Female voice 1 (UK)","name":"Google UK English 2 (Natural)","altNames":["Android Speech Recognition and Synthesis from Google en-gb-x-gba-network","Chrome OS UK English 2","Android Speech Recognition and Synthesis from Google en-gb-x-gba-local","Android Speech Recognition and Synthesis from Google en-GB-language"],"nativeID":["en-gb-x-gba-network","en-gb-x-gba-local"],"language":"en-GB","gender":"female","quality":["high"],"rate":1,"pitch":1,"os":["Android","ChromeOS"],"preloaded":true},{"label":"Female voice 2 (UK)","name":"Google UK English 4 (Natural)","altNames":["Android Speech Recognition and Synthesis from Google en-gb-x-gbc-network","Chrome OS UK English 4","Android Speech Recognition and Synthesis from Google en-gb-x-gbc-local"],"nativeID":["en-gb-x-gbc-network","en-gb-x-gbc-local"],"language":"en-GB","gender":"female","quality":["high"],"rate":1,"pitch":1,"os":["Android","ChromeOS"],"preloaded":true},{"label":"Female voice 3 (UK)","name":"Google UK English 6 (Natural)","altNames":["Android Speech Recognition and Synthesis from Google en-gb-x-gbg-network","Chrome OS UK English 6","Android Speech Recognition and Synthesis from Google en-gb-x-gbg-local"],"nativeID":["en-gb-x-gbg-network","en-gb-x-gbg-local"],"language":"en-GB","gender":"female","quality":["high"],"rate":1,"pitch":1,"os":["Android","ChromeOS"],"preloaded":true},{"label":"Female voice 4 (UK)","name":"Chrome OS UK English 7","language":"en-GB","gender":"female","quality":["low"],"rate":1,"pitch":1,"os":["ChromeOS"],"preloaded":true},{"label":"Male voice 1 (UK)","name":"Google UK English 1 (Natural)","altNames":["Android Speech Recognition and Synthesis from Google en-gb-x-rjs-network","Chrome OS UK English 1","Android Speech Recognition and Synthesis from Google en-gb-x-rjs-local"],"nativeID":["en-gb-x-rjs-network","en-gb-x-rjs-local"],"language":"en-GB","gender":"male","quality":["high"],"rate":1,"pitch":1,"os":["Android","ChromeOS"],"preloaded":true},{"label":"Male voice 2 (UK)","name":"Google UK English 3 (Natural)","altNames":["Android Speech Recognition and Synthesis from Google en-gb-x-gbb-network","Chrome OS UK English 3","Android Speech Recognition and Synthesis from Google en-gb-x-gbb-local"],"nativeID":["en-gb-x-gbb-network","en-gb-x-gbb-local"],"language":"en-GB","gender":"male","quality":["high"],"rate":1,"pitch":1,"os":["Android","ChromeOS"],"preloaded":true},{"label":"Male voice 3 (UK)","name":"Google UK English 5 (Natural)","altNames":["Android Speech Recognition and Synthesis from Google en-gb-x-gbd-network","Chrome OS UK English 5","Android Speech Recognition and Synthesis from Google en-gb-x-gbd-local"],"nativeID":["en-gb-x-gbd-network","en-gb-x-gbd-local"],"language":"en-GB","gender":"male","quality":["high"],"rate":1,"pitch":1,"os":["Android","ChromeOS"],"preloaded":true},{"label":"Female voice 1 (Australia)","name":"Google Australian English 1 (Natural)","altNames":["Android Speech Recognition and Synthesis from Google en-au-x-aua-network","Chrome OS Australian English 1","Android Speech Recognition and Synthesis from Google en-au-x-aua-local","Android Speech Recognition and Synthesis from Google en-AU-language"],"nativeID":["en-au-x-aua-network","en-au-x-aua-local"],"language":"en-AU","gender":"female","quality":["high"],"rate":1,"pitch":1,"os":["Android","ChromeOS"],"preloaded":true},{"label":"Female voice 2 (Australia)","name":"Google Australian English 3 (Natural)","altNames":["Android Speech Recognition and Synthesis from Google en-au-x-auc-network","Chrome OS Australian English 3","Android Speech Recognition and Synthesis from Google en-au-x-auc-local"],"nativeID":["en-au-x-auc-network","en-au-x-auc-local"],"language":"en-AU","gender":"female","quality":["high"],"rate":1,"pitch":1,"os":["Android","ChromeOS"],"preloaded":true},{"label":"Male voice 1 (Australia)","name":"Google Australian English 2 (Natural)","altNames":["Android Speech Recognition and Synthesis from Google en-au-x-aub-network","Chrome OS Australian English 2","Android Speech Recognition and Synthesis from Google en-au-x-aub-local"],"nativeID":["en-au-x-aub-network","en-au-x-aub-local"],"language":"en-AU","gender":"female","quality":["high"],"rate":1,"pitch":1,"os":["Android","ChromeOS"],"preloaded":true},{"label":"Male voice 2 (Australia)","name":"Google Australian English 4 (Natural)","altNames":["Android Speech Recognition and Synthesis from Google en-au-x-aud-network","Chrome OS Australian English 4","Android Speech Recognition and Synthesis from Google en-au-x-aud-local"],"nativeID":["en-au-x-aud-network","en-au-x-aud-local"],"language":"en-AU","gender":"female","quality":["high"],"rate":1,"pitch":1,"os":["Android","ChromeOS"],"preloaded":true},{"label":"Male voice 3 (Australia)","name":"Chrome OS Australian English 5","language":"en-AU","gender":"male","quality":["high"],"rate":1,"pitch":1,"os":["ChromeOS"],"preloaded":true},{"label":"Female voice 1 (India)","name":"Android Speech Recognition and Synthesis from Google en-in-x-ena-network","altNames":["Android Speech Recognition and Synthesis from Google en-in-x-ena-local","Android Speech Recognition and Synthesis from Google en-IN-language"],"nativeID":["en-in-x-ena-network","en-in-x-ena-local"],"language":"en-IN","gender":"female","quality":["high"],"rate":1,"pitch":1,"os":["Android","ChromeOS"],"preloaded":true},{"label":"Female voice 2 (India)","name":"Android Speech Recognition and Synthesis from Google en-in-x-enc-network","altNames":["Android Speech Recognition and Synthesis from Google en-in-x-enc-local"],"nativeID":["en-in-x-enc-network","en-in-x-enc-local"],"language":"en-IN","gender":"female","quality":["high"],"rate":1,"pitch":1,"os":["Android","ChromeOS"],"preloaded":true},{"label":"Male voice 1 (India)","name":"Android Speech Recognition and Synthesis from Google en-in-x-end-network","altNames":["Android Speech Recognition and Synthesis from Google en-in-x-end-local"],"nativeID":["en-in-x-end-network","en-in-x-end-local"],"language":"en-IN","gender":"male","quality":["high"],"rate":1,"pitch":1,"os":["Android","ChromeOS"],"preloaded":true},{"label":"Male voice 2 (India)","name":"Android Speech Recognition and Synthesis from Google en-in-x-ene-network","altNames":["Android Speech Recognition and Synthesis from Google en-in-x-ene-local"],"nativeID":["en-in-x-ene-network","en-in-x-ene-local"],"language":"en-IN","gender":"male","quality":["high"],"rate":1,"pitch":1,"os":["Android","ChromeOS"],"preloaded":true}]`), kn = {
  language: wn,
  defaultRegion: Nn,
  testUtterance: An,
  voices: Cn
}, qn = "es", xn = "es-ES", Rn = "Hola, mi nombre es {name} y soy una voz española.", En = /* @__PURE__ */ JSON.parse(`[{"label":"Elvira","name":"Microsoft Elvira Online (Natural) - Spanish (Spain)","language":"es-ES","gender":"female","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Alvaro","name":"Microsoft Alvaro Online (Natural) - Spanish (Spain)","language":"es-ES","gender":"male","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Dalia","name":"Microsoft Dalia Online (Natural) - Spanish (Mexico)","language":"es-MX","gender":"female","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Microsoft Jorge","name":"Microsoft Jorge Online (Natural) - Spanish (Mexico)","language":"es-MX","gender":"male","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Elena","name":"Microsoft Elena Online (Natural) - Spanish (Argentina)","language":"es-AR","gender":"female","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Tomas","name":"Microsoft Tomas Online (Natural) - Spanish (Argentina)","language":"es-AR","gender":"male","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Sofia","name":"Microsoft Sofia Online (Natural) - Spanish (Bolivia)","language":"es-BO","gender":"female","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Marcelo","name":"Microsoft Marcelo Online (Natural) - Spanish (Bolivia)","language":"es-BO","gender":"male","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Catalina","name":"Microsoft Catalina Online (Natural) - Spanish (Chile)","language":"es-CL","gender":"female","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Lorenzo","name":"Microsoft Lorenzo Online (Natural) - Spanish (Chile)","language":"es-CL","gender":"male","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Ximena","name":"Microsoft Ximena Online (Natural) - Spanish (Colombia)","language":"es-CO","gender":"female","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Salome","name":"Microsoft Salome Online (Natural) - Spanish (Colombia)","language":"es-CO","gender":"female","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Gonzalo","name":"Microsoft Gonzalo Online (Natural) - Spanish (Colombia)","language":"es-CO","gender":"male","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Maria","name":"Microsoft Maria Online (Natural) - Spanish (Costa Rica)","language":"es-CR","gender":"female","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Juan","name":"Microsoft Juan Online (Natural) - Spanish (Costa Rica)","language":"es-CR","gender":"male","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Belkys","name":"Microsoft Belkys Online (Natural) - Spanish (Cuba)","language":"es-CU","gender":"female","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Manuel","name":"Microsoft Manuel Online (Natural) - Spanish (Cuba)","language":"es-CU","gender":"male","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Andrea","name":"Microsoft Andrea Online (Natural) - Spanish (Ecuador)","language":"es-EC","gender":"female","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Luis","name":"Microsoft Luis Online (Natural) - Spanish (Ecuador)","language":"es-EC","gender":"male","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Lorena","name":"Microsoft Lorena Online (Natural) - Spanish (El Salvador)","language":"es-SV","gender":"female","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Rodrigo","name":"Microsoft Rodrigo Online (Natural) - Spanish (El Salvador)","language":"es-SV","gender":"male","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Paloma","name":"Microsoft Paloma Online (Natural) - Spanish (United States)","language":"es-US","otherLanguages":["en"],"gender":"female","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Alonso","name":"Microsoft Alonso Online (Natural) - Spanish (United States)","language":"es-US","otherLanguages":["en"],"gender":"male","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Marta","name":"Microsoft Marta Online (Natural) - Spanish (Guatemala)","language":"es-GT","gender":"female","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Andres","name":"Microsoft Andres Online (Natural) - Spanish (Guatemala)","language":"es-GT","gender":"male","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Teresa","name":"Microsoft Teresa Online (Natural) - Spanish (Equatorial Guinea)","language":"es-GQ","gender":"female","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Javier","name":"Microsoft Javier Online (Natural) - Spanish (Equatorial Guinea)","language":"es-GQ","gender":"male","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Karla","name":"Microsoft Karla Online (Natural) - Spanish (Honduras)","language":"es-HN","gender":"female","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Carlos","name":"Microsoft Carlos Online (Natural) - Spanish (Honduras)","language":"es-HN","gender":"male","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Yolanda","name":"Microsoft Yolanda Online (Natural) - Spanish (Nicaragua)","language":"es-NI","gender":"female","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Federico","name":"Microsoft Federico Online (Natural) - Spanish (Nicaragua)","language":"es-NI","gender":"male","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Margarita","name":"Microsoft Margarita Online (Natural) - Spanish (Panama)","language":"es-PA","gender":"female","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Roberto","name":"Microsoft Roberto Online (Natural) - Spanish (Panama)","language":"es-PA","gender":"male","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Tania","name":"Microsoft Tania Online (Natural) - Spanish (Paraguay)","language":"es-PY","gender":"female","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Mario","name":"Microsoft Mario Online (Natural) - Spanish (Paraguay)","language":"es-PY","gender":"male","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Camila","name":"Microsoft Camila Online (Natural) - Spanish (Peru)","language":"es-PE","gender":"female","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Alex","name":"Microsoft Alex Online (Natural) - Spanish (Peru)","language":"es-PE","gender":"male","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Karina","name":"Microsoft Karina Online (Natural) - Spanish (Puerto Rico)","language":"es-PR","gender":"female","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Victor","name":"Microsoft Victor Online (Natural) - Spanish (Puerto Rico)","language":"es-PR","gender":"male","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Ramona","name":"Microsoft Ramona Online (Natural) - Spanish (Dominican Republic)","language":"es-DO","gender":"female","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Emilio","name":"Microsoft Emilio Online (Natural) - Spanish (Dominican Republic)","language":"es-DO","gender":"male","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Valentina","name":"Microsoft Valentina Online (Natural) - Spanish (Uruguay)","language":"es-UY","gender":"female","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Mateo","name":"Microsoft Mateo Online (Natural) - Spanish (Uruguay)","language":"es-UY","gender":"male","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Paola","name":"Microsoft Paola Online (Natural) - Spanish (Venezuela)","language":"es-VE","gender":"female","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Sebastian","name":"Microsoft Sebastian Online (Natural) - Spanish (Venezuela)","language":"es-VE","gender":"male","quality":["veryHigh"],"rate":1,"pitchControl":false,"browser":["Edge"],"preloaded":true},{"label":"Voz Google masculina (España)","name":"Google español","note":"This voice is pre-loaded in Chrome on desktop. Utterances that are longer than 14 seconds long can trigger a bug with this voice, check the notes in the project's README for more information.","language":"es-ES","gender":"male","quality":["high"],"rate":1,"pitch":1,"browser":["ChromeDesktop"],"preloaded":true},{"label":"Voz Google femenina (Estados Unidos)","name":"Google español de Estados Unidos","note":"This voice is pre-loaded in Chrome on desktop. Utterances that are longer than 14 seconds long can trigger a bug with this voice, check the notes in the project's README for more information.","language":"es-US","gender":"female","quality":["high"],"rate":1,"pitch":1,"browser":["ChromeDesktop"],"preloaded":true},{"label":"Marisol","name":"Marisol","localizedName":"apple","language":"es-ES","gender":"female","quality":["low","normal"],"rate":1,"pitch":1,"os":["macOS","iOS","iPadOS"]},{"label":"Mónica","name":"Mónica","localizedName":"apple","language":"es-ES","gender":"female","quality":["low","normal"],"rate":1,"pitch":1,"os":["macOS","iOS","iPadOS"],"preloaded":true},{"label":"Apple Jorge","name":"Jorge","localizedName":"apple","language":"es-ES","gender":"male","quality":["low","normal"],"rate":1,"pitch":1,"os":["macOS","iOS","iPadOS"]},{"label":"Angelica","name":"Angelica","localizedName":"apple","language":"es-MX","gender":"female","quality":["low","normal"],"rate":1,"pitch":1,"os":["macOS","iOS","iPadOS"]},{"label":"Paulina","name":"Paulina","localizedName":"apple","language":"es-MX","gender":"female","quality":["low","normal"],"rate":1,"pitch":1,"os":["macOS","iOS","iPadOS"],"preloaded":true},{"label":"Juan","name":"Juan","localizedName":"apple","language":"es-MX","gender":"male","quality":["low","normal"],"rate":1,"pitch":1,"os":["macOS","iOS","iPadOS"]},{"label":"Isabela","name":"Isabela","localizedName":"apple","language":"es-AR","gender":"female","quality":["low","normal"],"rate":1,"pitch":1,"os":["macOS","iOS","iPadOS"]},{"label":"Diego","name":"Diego","localizedName":"apple","language":"es-AR","gender":"male","quality":["low","normal"],"rate":1,"pitch":1,"os":["macOS","iOS","iPadOS"]},{"label":"Francesca","name":"Francesca","nativeID":["com.apple.voice.enhanced.es-CL.Francisca"],"localizedName":"apple","language":"es-CL","gender":"female","quality":["low","normal"],"rate":1,"pitch":1,"os":["macOS","iOS","iPadOS"]},{"label":"Soledad","name":"Soledad","localizedName":"apple","language":"es-CO","gender":"female","quality":["low","normal"],"rate":1,"pitch":1,"os":["macOS","iOS","iPadOS"]},{"label":"Jimena","name":"Jimena","localizedName":"apple","language":"es-CO","gender":"female","quality":["low","normal"],"rate":1,"pitch":1,"os":["macOS","iOS","iPadOS"]},{"label":"Carlos","name":"Carlos","localizedName":"apple","language":"es-CO","gender":"male","quality":["low","normal"],"rate":1,"pitch":1,"os":["macOS","iOS","iPadOS"]},{"label":"Helena","name":"Microsoft Helena - Spanish (Spain)","language":"es-ES","gender":"female","quality":["normal"],"rate":1,"pitch":1,"os":["Windows"],"preloaded":true},{"label":"Laura","name":"Microsoft Laura - Spanish (Spain)","language":"es-ES","gender":"female","quality":["normal"],"rate":1,"pitch":1,"os":["Windows"],"preloaded":true},{"label":"Pablo","name":"Microsoft Pablo - Spanish (Spain)","language":"es-ES","gender":"male","quality":["normal"],"rate":1,"pitch":1,"os":["Windows"],"preloaded":true},{"label":"Sabina","name":"Microsoft Sabina - Spanish (Mexico)","language":"es-MX","gender":"female","quality":["normal"],"rate":1,"pitch":1,"os":["Windows"],"preloaded":true},{"label":"Raul","name":"Microsoft Raul - Spanish (Mexico)","language":"es-MX","gender":"male","quality":["normal"],"rate":1,"pitch":1,"os":["Windows"],"preloaded":true},{"label":"Voz femenina 1 (España)","name":"Google español 4 (Natural)","altNames":["Chrome OS español 4","Android Speech Recognition and Synthesis from Google es-es-x-eee-local","Android Speech Recognition and Synthesis from Google es-ES-language"],"nativeID":["es-es-x-eee-local"],"language":"es-ES","gender":"female","quality":["high"],"rate":1,"pitch":1,"os":["Android","ChromeOS"],"preloaded":true},{"label":"Voz femenina 2 (España)","name":"Google español 1 (Natural)","altNames":["Android Speech Recognition and Synthesis from Google es-es-x-eea-network","Chrome OS español 1","Android Speech Recognition and Synthesis from Google es-es-x-eea-local"],"nativeID":["es-es-x-eea-network","es-es-x-eea-local"],"language":"es-ES","gender":"female","quality":["high"],"rate":1,"pitch":1,"os":["Android","ChromeOS"],"preloaded":true},{"label":"Voz femenina 3 (España)","name":"Google español 2 (Natural)","altNames":["Android Speech Recognition and Synthesis from Google es-es-x-eec-network","Chrome OS español 2","Android Speech Recognition and Synthesis from Google es-es-x-eec-local"],"nativeID":["es-es-x-eec-network","es-es-x-eec-local"],"language":"es-ES","gender":"female","quality":["high"],"rate":1,"pitch":1,"os":["Android","ChromeOS"],"preloaded":true},{"label":"Voz masculina 1 (España)","name":"Google español 3 (Natural)","altNames":["Android Speech Recognition and Synthesis from Google es-es-x-eed-network","Chrome OS español 3","Android Speech Recognition and Synthesis from Google es-es-x-eed-local"],"nativeID":["es-es-x-eed-network","es-es-x-eed-local"],"language":"es-ES","gender":"male","quality":["high"],"rate":1,"pitch":1,"os":["Android","ChromeOS"],"preloaded":true},{"label":"Voz masculina 2 (España)","name":"Google español 5 (Natural)","altNames":["Chrome OS español 5","Android Speech Recognition and Synthesis from Google es-es-x-eef-local"],"nativeID":["es-es-x-eef-local"],"language":"es-ES","gender":"male","quality":["high"],"rate":1,"pitch":1,"os":["Android","ChromeOS"],"preloaded":true},{"label":"Voz femenina 1 (Estados Unidos)","name":"Google español de Estados Unidos 1 (Natural)","altNames":["Android Speech Recognition and Synthesis from Google es-us-x-esc-network","Chrome OS español de Estados Unidos","Android Speech Recognition and Synthesis from Google es-us-x-esc-local","Android Speech Recognition and Synthesis from Google es-US-language"],"nativeID":["es-us-x-esc-network","es-us-x-esc-local"],"language":"es-US","gender":"female","quality":["high"],"rate":1,"pitch":1,"os":["Android","ChromeOS"],"preloaded":true},{"label":"Voz femenina 2 (Estados Unidos)","name":"Google español de Estados Unidos 2 (Natural)","altNames":["Android Speech Recognition and Synthesis from Google es-us-x-sfb-network","Android Speech Recognition and Synthesis from Google es-us-x-sfb-local"],"nativeID":["es-us-x-sfb-network","es-us-x-sfb-local"],"language":"es-US","gender":"female","quality":["high"],"rate":1,"pitch":1,"os":["Android","ChromeOS"],"preloaded":true},{"label":"Voz masculina 1 (Estados Unidos)","name":"Google español de Estados Unidos 3 (Natural)","altNames":["Android Speech Recognition and Synthesis from Google es-us-x-esd-network","Android Speech Recognition and Synthesis from Google es-us-x-esd-local"],"nativeID":["es-us-x-esd-network","es-us-x-esd-local"],"language":"es-US","gender":"male","quality":["high"],"rate":1,"pitch":1,"os":["Android","ChromeOS"],"preloaded":true},{"label":"Voz masculina 2 (Estados Unidos)","name":"Google español de Estados Unidos 4 (Natural)","altNames":["Android Speech Recognition and Synthesis from Google es-us-x-esf-network","Android Speech Recognition and Synthesis from Google es-us-x-esf-local"],"nativeID":["es-us-x-esf-network","es-us-x-esf-local"],"language":"es-US","gender":"male","quality":["high"],"rate":1,"pitch":1,"os":["Android","ChromeOS"],"preloaded":true}]`), Gn = {
  language: qn,
  defaultRegion: xn,
  testUtterance: Rn,
  voices: En
}, In = "eu", Tn = "eu-ES", Mn = "Kaixo, nire izena {name} da eta euskal ahotsa naiz.", Hn = [{ label: "Miren", name: "Miren", localizedName: "apple", language: "eu-ES", gender: "female", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"] }], Dn = {
  language: In,
  defaultRegion: Tn,
  testUtterance: Mn,
  voices: Hn
}, Pn = "fa", Ln = "fa-IR", Un = "سلام اسم من {name} و صدای فارسی هستم", zn = [{ label: "Dilara", name: "Microsoft Dilara Online (Natural) - Persian (Iran)", language: "fa-IR", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Farid", name: "Microsoft Farid Online (Natural) - Persian (Iran)", language: "fa-IR", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Dariush", name: "Dariush", localizedName: "apple", language: "fa-IR", gender: "male", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }], Bn = {
  language: Pn,
  defaultRegion: Ln,
  testUtterance: Un,
  voices: zn
}, $n = "fi", jn = "fi-FI", Fn = "Hei, nimeni on {name} ja olen suomalainen ääni.", Vn = [{ label: "Noora", name: "Microsoft Noora Online (Natural) - Finnish (Finland)", language: "fi-FI", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Harri", name: "Microsoft Harri Online (Natural) - Finnish (Finland)", language: "fi-FI", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Satu", name: "Satu", localizedName: "apple", language: "fi-FI", gender: "female", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { label: "Onni", name: "Onni", localizedName: "apple", language: "fi-FI", gender: "male", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"] }, { label: "Heidi", name: "Microsoft Heidi - Finnish (Finland)", language: "fi-FI", gender: "female", quality: ["normal"], rate: 1, pitch: 1, os: ["Windows"], preloaded: !0 }, { label: "Suomalainen naisääni", name: "Google Suomi (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google fi-fi-x-afi-network", "Chrome OS Suomi", "Android Speech Recognition and Synthesis from Google fi-fi-x-afi-local", "Android Speech Recognition and Synthesis from Google fi-FI-language"], nativeID: ["fi-fi-x-afi-network", "fi-fi-x-afi-local"], language: "fi-FI", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }], Kn = {
  language: $n,
  defaultRegion: jn,
  testUtterance: Fn,
  voices: Vn
}, Wn = "fr", _n = "fr-FR", Jn = "Bonjour, mon nom est {name} et je suis une voix française.", Yn = [{ label: "Vivienne", name: "Microsoft VivienneMultilingual Online (Natural) - French (France)", language: "fr-FR", multiLingual: !0, gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Denise", name: "Microsoft Denise Online (Natural) - French (France)", language: "fr-FR", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Charline", name: "Microsoft Charline Online (Natural) - French (Belgium)", language: "fr-BE", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Ariane", name: "Microsoft Ariane Online (Natural) - French (Switzerland)", language: "fr-CH", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Eloise", name: "Microsoft Eloise Online (Natural) - French (France)", language: "fr-FR", gender: "female", children: !0, quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Remy", name: "Microsoft RemyMultilingual Online (Natural) - French (France)", language: "fr-FR", multiLingual: !0, gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Henri", name: "Microsoft Henri Online (Natural) - French (France)", language: "fr-FR", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Gerard", name: "Microsoft Gerard Online (Natural) - French (Belgium)", language: "fr-BE", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Fabrice", name: "Microsoft Fabrice Online (Natural) - French (Switzerland)", language: "fr-CH", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Sylvie", name: "Microsoft Sylvie Online (Natural) - French (Canada)", language: "fr-CA", otherLanguages: ["en"], gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Antoine", name: "Microsoft Antoine Online (Natural) - French (Canada)", language: "fr-CA", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Jean", name: "Microsoft Jean Online (Natural) - French (Canada)", language: "fr-CA", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Thierry", name: "Microsoft Thierry Online (Natural) - French (Canada)", language: "fr-CA", otherLanguages: ["en"], gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Voix Google féminine (France)", name: "Google français", note: "This voice is pre-loaded in Chrome on desktop. Utterances that are longer than 14 seconds long can trigger a bug with this voice, check the notes in the project's README for more information.", language: "fr-FR", gender: "female", quality: ["high"], rate: 1, pitch: 1, browser: ["ChromeDesktop"], preloaded: !0 }, { label: "Audrey", name: "Audrey", localizedName: "apple", language: "fr-FR", gender: "female", quality: ["low", "normal", "high"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"] }, { label: "Aurélie", name: "Aurélie", localizedName: "apple", language: "fr-FR", gender: "female", quality: ["low", "normal"], rate: 0.9, pitch: 1, os: ["macOS", "iOS", "iPadOS"] }, { label: "Marie", name: "Marie", localizedName: "apple", note: "This is a compact version of a preloaded Siri voice on macOS.", language: "fr-FR", gender: "female", quality: ["low"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { label: "Thomas", name: "Thomas", localizedName: "apple", language: "fr-FR", gender: "male", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { label: "Aude", name: "Aude", localizedName: "apple", language: "fr-BE", gender: "female", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"] }, { label: "Chantal", name: "Chantal", localizedName: "apple", language: "fr-CA", gender: "female", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"] }, { label: "Amélie", name: "Amélie", localizedName: "apple", language: "fr-CA", gender: "female", quality: ["low", "high"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { label: "Nicolas", name: "Nicolas", localizedName: "apple", language: "fr-CA", gender: "male", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"] }, { label: "Julie", name: "Microsoft Julie - French (France)", language: "fr-FR", gender: "female", quality: ["normal"], rate: 1, pitch: 1, os: ["Windows"], preloaded: !0 }, { label: "Hortence", name: "Microsoft Hortence - French (France)", language: "fr-FR", gender: "female", quality: ["normal"], rate: 1, pitch: 1, os: ["Windows"], preloaded: !0 }, { label: "Paul", name: "Microsoft Paul - French (France)", language: "fr-FR", gender: "male", quality: ["normal"], rate: 1, pitch: 1, os: ["Windows"], preloaded: !0 }, { label: "Caroline", name: "Microsoft Caroline - French (Canada)", language: "fr-CA", gender: "female", quality: ["normal"], rate: 1, pitch: 1, os: ["Windows"], preloaded: !0 }, { label: "Claude", name: "Microsoft Claude - French (Canada)", language: "fr-CA", gender: "male", quality: ["normal"], rate: 1, pitch: 1, os: ["Windows"], preloaded: !0 }, { label: "Guillaume", name: "Microsoft Claude - French (Switzerland)", language: "fr-CH", gender: "male", quality: ["normal"], rate: 1, pitch: 1, os: ["Windows"], preloaded: !0 }, { label: "Voix féminine 1 (France)", name: "Google français 4 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google fr-fr-x-frc-network", "Chrome OS français 4", "Android Speech Recognition and Synthesis from Google fr-fr-x-frc-local", "Android Speech Recognition and Synthesis from Google fr-FR-language"], nativeID: ["fr-fr-x-frc-network", "fr-fr-x-frc-local"], language: "fr-FR", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "Voix féminine 2 (France)", name: "Google français 2 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google fr-fr-x-fra-network", "Chrome OS français 2", "Android Speech Recognition and Synthesis from Google fr-fr-x-fra-local"], nativeID: ["fr-fr-x-fra-network", "fr-fr-x-fra-local"], language: "fr-FR", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "Voix féminine 3 (France)", name: "Google français 1 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google fr-fr-x-vlf-network", "Chrome OS français 1", "Android Speech Recognition and Synthesis from Google fr-fr-x-vlf-local"], nativeID: ["fr-fr-x-vlf-network", "fr-fr-x-vlf-local"], language: "fr-FR", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "Voix masculine 1 (France)", name: "Google français 5 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google fr-fr-x-frd-network", "Chrome OS français 5", "Android Speech Recognition and Synthesis from Google fr-fr-x-frd-local"], nativeID: ["fr-fr-x-frd-network", "fr-fr-x-frd-local"], language: "fr-FR", gender: "male", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "Voix masculine 2 (France)", name: "Google français 3 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google fr-fr-x-frb-network", "Chrome OS français 3", "Android Speech Recognition and Synthesis from Google fr-fr-x-frb-local"], nativeID: ["fr-fr-x-frb-network", "fr-fr-x-frb-local"], language: "fr-FR", gender: "male", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "Voix féminine 1 (Canada)", name: "Android Speech Recognition and Synthesis from Google fr-ca-x-caa-network", altNames: ["Android Speech Recognition and Synthesis from Google fr-ca-x-caa-local", "Android Speech Recognition and Synthesis from Google fr-CA-language"], nativeID: ["fr-ca-x-caa-network", "fr-ca-x-caa-local"], language: "fr-CA", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "Voix féminine 2 (Canada)", name: "Android Speech Recognition and Synthesis from Google fr-ca-x-cac-network", altNames: ["Android Speech Recognition and Synthesis from Google fr-ca-x-cac-local"], nativeID: ["fr-ca-x-cac-network", "fr-ca-x-cac-local"], language: "fr-CA", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "Voix masculine 1 (Canada)", name: "Android Speech Recognition and Synthesis from Google fr-ca-x-cab-network", altNames: ["Android Speech Recognition and Synthesis from Google fr-ca-x-cab-local"], nativeID: ["fr-ca-x-cab-network", "fr-ca-x-cab-local"], language: "fr-CA", gender: "male", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "Voix masculine 2 (Canada)", name: "Android Speech Recognition and Synthesis from Google fr-ca-x-cad-network", altNames: ["Android Speech Recognition and Synthesis from Google fr-ca-x-cad-local"], nativeID: ["fr-ca-x-cad-network", "fr-ca-x-cad-local"], language: "fr-CA", gender: "male", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }], Zn = {
  language: Wn,
  defaultRegion: _n,
  testUtterance: Jn,
  voices: Yn
}, Qn = "gl", Xn = "gl-ES", er = "Ola, chámome {name} e son unha voz galega.", ar = [{ label: "Sabela", name: "Microsoft Sabela Online (Natural) - Galician", language: "gl-ES", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Roi", name: "Microsoft Roi Online (Natural) - Galician", language: "gl-ES", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Carmela", name: "Carmela", localizedName: "apple", language: "gl-ES", gender: "female", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"] }], nr = {
  language: Qn,
  defaultRegion: Xn,
  testUtterance: er,
  voices: ar
}, rr = "he", tr = "he-IL", or = "שלום, שמי {name} ואני קול עברי.", lr = [{ label: "Hila", name: "Microsoft Hila Online (Natural) - Hebrew (Israel)", language: "he-IL", altLanguage: "iw-IL", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Avri", name: "Microsoft Avri Online (Natural) - Hebrew (Israel)", language: "he-IL", altLanguage: "iw-IL", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Carmit", name: "Carmit", localizedName: "apple", language: "he-IL", altLanguage: "iw-IL", gender: "female", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { label: "Asaf", name: "Microsoft Asaf - Hebrew (Israel)", language: "he-IL", altLanguage: "iw-IL", gender: "male", quality: ["normal"], rate: 1, pitch: 1, os: ["Windows"], preloaded: !0 }, { label: "קול גברי 1", name: "Android Speech Recognition and Synthesis from Google he-il-x-heb-network", altNames: ["Android Speech Recognition and Synthesis from Google he-il-x-heb-local", "Android Speech Recognition and Synthesis from Google he-IL-language"], nativeID: ["he-il-x-heb-network", "he-il-x-heb-local"], language: "he-IL", altLanguage: "iw-IL", gender: "male", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "קול נשי 1", name: "Android Speech Recognition and Synthesis from Google he-il-x-hec-network", altNames: ["Android Speech Recognition and Synthesis from Google he-il-x-hec-local"], nativeID: ["he-il-x-hec-network", "he-il-x-hec-local"], language: "he-IL", altLanguage: "iw-IL", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "קול גברי 2", name: "Android Speech Recognition and Synthesis from Google he-il-x-hed-network", altNames: ["Android Speech Recognition and Synthesis from Google he-il-x-hed-local"], nativeID: ["he-il-x-hed-network", "he-il-x-hed-local"], language: "he-IL", altLanguage: "iw-IL", gender: "male", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "קול נשי 2", name: "Android Speech Recognition and Synthesis from Google he-il-x-hee-network", altNames: ["Android Speech Recognition and Synthesis from Google he-il-x-hee-local"], nativeID: ["he-il-x-hee-network", "he-il-x-hee-local"], language: "he-IL", altLanguage: "iw-IL", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }], ir = {
  language: rr,
  defaultRegion: tr,
  testUtterance: or,
  voices: lr
}, sr = "hi", gr = "hi-IN", dr = "नमस्कार, मेरा नाम {name} है और मैं एक हिंदी आवाज़ हूँ।", cr = [{ label: "Swara", name: "Microsoft Swara Online (Natural) - Hindi (India)", language: "hi-IN", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Madhur", name: "Microsoft Madhur Online (Natural) - Hindi (India)", language: "hi-IN", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "महिला Google आवाज़", name: "Google हिन्दी", note: "This voice is pre-loaded in Chrome on desktop. Utterances that are longer than 14 seconds long can trigger a bug with this voice, check the notes in the project's README for more information.", language: "hi-IN", gender: "female", quality: ["high"], rate: 1, pitch: 1, browser: ["ChromeDesktop"], preloaded: !0 }, { label: "Kiyara", name: "Kiyara", localizedName: "apple", language: "hi-IN", gender: "female", quality: ["low", "normal", "high"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"] }, { label: "Lekha", name: "Lekha", localizedName: "apple", language: "hi-IN", gender: "female", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { label: "Neel", name: "Neel", localizedName: "apple", language: "hi-IN", gender: "male", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"] }, { label: "Kalpana", name: "Microsoft Kalpana - Hindi (India)", language: "hi-IN", gender: "female", quality: ["normal"], rate: 1, pitch: 1, os: ["Windows"], preloaded: !0 }, { label: "Hemant", name: "Microsoft Hemant - Hindi (India)", language: "hi-IN", gender: "male", quality: ["normal"], rate: 1, pitch: 1, os: ["Windows"], preloaded: !0 }, { label: "महिला आवाज़ 1", name: "Google हिन्दी 1 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google hi-in-x-hia-network", "Chrome OS हिन्दी 2", "Android Speech Recognition and Synthesis from Google hi-in-x-hia-local", "Android Speech Recognition and Synthesis from Google hi-IN-language"], nativeID: ["hi-in-x-hia-network", "hi-in-x-hia-local"], language: "hi-IN", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "महिला आवाज़ 2", name: "Google हिन्दी 2 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google hi-in-x-hic-network", "Chrome OS हिन्दी 3", "Android Speech Recognition and Synthesis from Google hi-in-x-hic-local"], nativeID: ["hi-in-x-hic-network", "hi-in-x-hic-local"], language: "hi-IN", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "महिला आवाज़ 3", name: "Chrome OS हिन्दी 1", language: "hi-IN", gender: "female", quality: ["normal"], rate: 1, pitch: 1, os: ["ChromeOS"], preloaded: !0 }, { label: "पुरुष आवाज 1", name: "Google हिन्दी 3 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google hi-in-x-hid-network", "Chrome OS हिन्दी 4", "Android Speech Recognition and Synthesis from Google hi-in-x-hid-local"], nativeID: ["hi-in-x-hid-network", "hi-in-x-hid-local"], language: "hi-IN", gender: "male", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "पुरुष आवाज 2", name: "Google हिन्दी 4 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google hi-in-x-hie-network", "Chrome OS हिन्दी 5", "Android Speech Recognition and Synthesis from Google hi-in-x-hie-local"], nativeID: ["hi-in-x-hie-network", "hi-in-x-hie-local"], language: "hi-IN", gender: "male", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }], ur = {
  language: sr,
  defaultRegion: gr,
  testUtterance: dr,
  voices: cr
}, hr = "hr", mr = "hr-HR", pr = "Pozdrav, ja sam {name} i hrvatski sam glas.", fr = [{ label: "Gabrijela", name: "Microsoft Gabrijela Online (Natural) - Croatian (Croatia)", language: "hr-HR", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Srecko", name: "Microsoft Srecko Online (Natural) - Croatian (Croatia)", language: "hr-HR", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Lana", name: "Lana", localizedName: "apple", altNames: ["Lana (poboljšani)", "Lana (hrvatski (Hrvatska))"], language: "hr-HR", gender: "female", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { label: "Matej", name: "Microsoft Matej - Croatian (Croatia)", language: "hr-HR", gender: "male", quality: ["normal"], rate: 1, pitch: 1, os: ["Windows"], preloaded: !0 }, { label: "Ženski glas", name: "Android Speech Recognition and Synthesis from Google hr-hr-x-hra-network", altNames: ["Android Speech Recognition and Synthesis from Google hr-hr-x-hra-local"], nativeID: ["hr-hr-x-hra-network", "hr-hr-x-hra-local"], language: "hr-HR", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "Muški glas", name: "Android Speech Recognition and Synthesis from Google hr-hr-x-hrb-network", altNames: ["Android Speech Recognition and Synthesis from Google hr-hr-x-hrb-local", "Android Speech Recognition and Synthesis from Google hr-HR-language"], nativeID: ["hr-hr-x-hrb-network", "hr-hr-x-hrb-local"], language: "hr-HR", gender: "male", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }], yr = {
  language: hr,
  defaultRegion: mr,
  testUtterance: pr,
  voices: fr
}, Sr = "hu", br = "hu-HU", Or = "Helló, a nevem {name} és magyar hangú vagyok.", vr = [{ label: "Noemi", name: "Microsoft Noemi Online (Natural) - Hungarian (Hungary)", language: "hu-HU", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Tamas", name: "Microsoft Tamas Online (Natural) - Hungarian (Hungary)", language: "hu-HU", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Tünde", name: "Tünde", localizedName: "apple", language: "hu-HU", gender: "female", quality: ["low", "normal", "high"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { label: "Szabolcs", name: "Microsoft Szabolcs - Hungarian (Hungary)", language: "hu-HU", gender: "male", quality: ["normal"], rate: 1, pitch: 1, os: ["Windows"], preloaded: !0 }, { label: "Női hang", name: "Google Magyar (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google hu-hu-x-kfl-network", "Chrome OS Magyar", "Android Speech Recognition and Synthesis from Google hu-hu-x-kfl-local", "Android Speech Recognition and Synthesis from Google hu-HU-language"], nativeID: ["hu-hu-x-kfl-network", "hu-hu-x-kfl-local"], language: "hu-HU", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }], wr = {
  language: Sr,
  defaultRegion: br,
  testUtterance: Or,
  voices: vr
}, Nr = "id", Ar = "id-ID", Cr = "Halo, nama saya {name} dan saya suara Indonesia.", kr = [{ label: "Gadis", name: "Microsoft Gadis Online (Natural) - Indonesian (Indonesia)", language: "id-ID", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Ardi", name: "Microsoft Ardi Online (Natural) - Indonesian (Indonesia)", language: "id-ID", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Suara Google wanita", name: "Google Bahasa Indonesia", note: "This voice is pre-loaded in Chrome on desktop. Utterances that are longer than 14 seconds long can trigger a bug with this voice, check the notes in the project's README for more information.", language: "id-ID", gender: "female", quality: ["high"], rate: 1, pitch: 1, browser: ["ChromeDesktop"], preloaded: !0 }, { label: "Damayanti", name: "Damayanti", localizedName: "apple", language: "id-ID", gender: "female", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { label: "Andika", name: "Microsoft Andika - Indonesian (Indonesia)", language: "id-ID", gender: "female", quality: ["normal"], rate: 1, pitch: 1, os: ["Windows"], preloaded: !0 }, { label: "Suara wanita 1", name: "Google Bahasa Indonesia 1 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google id-id-x-idc-network", "Chrome OS Bahasa Indonesia 1", "Android Speech Recognition and Synthesis from Google id-id-x-idc-local", "Android Speech Recognition and Synthesis from Google id-ID-language"], nativeID: ["id-id-x-idc-network", "id-id-x-idc-local"], language: "id-ID", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "Suara wanita 2", name: "Google Bahasa Indonesia 2 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google id-id-x-idd-network", "Chrome OS Bahasa Indonesia 2", "Android Speech Recognition and Synthesis from Google id-id-x-idd-local"], nativeID: ["id-id-x-idd-network", "id-id-x-idd-local"], language: "id-ID", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "Suara laki-laki 1", name: "Google Bahasa Indonesia 3 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google id-id-x-ide-network", "Chrome OS Bahasa Indonesia 3", "Android Speech Recognition and Synthesis from Google id-id-x-ide-local"], nativeID: ["id-id-x-ide-network", "id-id-x-ide-local"], language: "id-ID", gender: "male", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "Suara laki-laki 2", name: "Google Bahasa Indonesia 4 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google id-id-x-dfz-network", "Chrome OS Bahasa Indonesia 4", "Android Speech Recognition and Synthesis from Google id-id-x-dfz-local"], nativeID: ["id-id-x-dfz-network", "id-id-x-dfz-local"], language: "id-ID", gender: "male", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }], qr = {
  language: Nr,
  defaultRegion: Ar,
  testUtterance: Cr,
  voices: kr
}, xr = "it", Rr = "it-IT", Er = "Ciao, mi chiamo {name} e sono una voce italiana.", Gr = [{ label: "Elsa (Alta qualita)", name: "Microsoft Elsa Online (Natural) - Italian (Italy)", language: "it-IT", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Isabella", name: "Microsoft Isabella Online (Natural) - Italian (Italy)", language: "it-IT", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Giuseppe", name: "Microsoft GiuseppeMultilingual Online (Natural) - Italian (Italy)", language: "it-IT", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Diego", name: "Microsoft Diego Online (Natural) - Italian (Italy)", language: "it-IT", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Voce Google femminile", name: "Google italiano", note: "This voice is pre-loaded in Chrome on desktop. Utterances that are longer than 14 seconds long can trigger a bug with this voice, check the notes in the project's README for more information.", language: "it-IT", gender: "female", quality: ["high"], rate: 1, pitch: 1, browser: ["ChromeDesktop"], preloaded: !0 }, { label: "Federica", name: "Federica", localizedName: "apple", language: "it-IT", gender: "female", quality: ["low", "normal", "high"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"] }, { label: "Emma", name: "Emma", localizedName: "apple", language: "it-IT", gender: "female", quality: ["low", "normal", "high"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"] }, { label: "Alice", name: "Alice", localizedName: "apple", language: "it-IT", gender: "female", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { label: "Paola", name: "Paola", localizedName: "apple", language: "it-IT", gender: "female", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"] }, { label: "Luca", name: "Luca", localizedName: "apple", language: "it-IT", gender: "male", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"] }, { label: "Elsa", name: "Microsoft Elsa - Italian (Italy)", language: "it-IT", gender: "female", quality: ["normal"], rate: 1, pitch: 1, os: ["Windows"], preloaded: !0 }, { label: "Cosimo", name: "Microsoft Cosimo - Italian (Italy)", language: "it-IT", gender: "male", quality: ["normal"], rate: 1, pitch: 1, os: ["Windows"], preloaded: !0 }, { label: "Voce femminile 1", name: "Google italiano 2 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google it-it-x-itb-network", "Chrome OS italiano 2", "Android Speech Recognition and Synthesis from Google it-it-x-itb-local", "Android Speech Recognition and Synthesis from Google it-IT-language"], nativeID: ["it-it-x-itb-network", "it-it-x-itb-local"], language: "it-IT", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "Voce femminile 2", name: "Google italiano 1 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google it-it-x-kda-network", "Chrome OS italiano 1", "Android Speech Recognition and Synthesis from Google it-it-x-kda-local"], nativeID: ["it-it-x-kda-network", "it-it-x-kda-local"], language: "it-IT", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "Voce maschile 1", name: "Google italiano 3 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google it-it-x-itc-network", "Chrome OS italiano 3", "Android Speech Recognition and Synthesis from Google it-it-x-itc-local"], nativeID: ["it-it-x-itc-network", "it-it-x-itc-local"], language: "it-IT", gender: "male", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "Voce maschile 2", name: "Google italiano 4 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google it-it-x-itd-network", "Chrome OS italiano 4", "Android Speech Recognition and Synthesis from Google it-it-x-itd-local"], nativeID: ["it-it-x-itd-network", "it-it-x-itd-local"], language: "it-IT", gender: "male", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }], Ir = {
  language: xr,
  defaultRegion: Rr,
  testUtterance: Er,
  voices: Gr
}, Tr = "ja", Mr = "ja-JP", Hr = "こんにちは。私の名前は{name}で、日本語の声を担当しています。", Dr = [{ label: "Nanami", name: "Microsoft Nanami Online (Natural) - Japanese (Japan)", language: "ja-JP", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Keita", name: "Microsoft Keita Online (Natural) - Japanese (Japan)", language: "ja-JP", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Hattori", name: "Hattori", nativeID: ["com.apple.ttsbundle.siri_Hattori_ja-JP_premium"], localizedName: "apple", language: "ja-JP", gender: "male", quality: ["high"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"] }, { label: "Google の女性の声", name: "Google 日本語", note: "This voice is pre-loaded in Chrome on desktop. Utterances that are longer than 14 seconds long can trigger a bug with this voice, check the notes in the project's README for more information.", language: "ja-JP", gender: "female", quality: ["high"], rate: 1, pitch: 1, browser: ["ChromeDesktop"], preloaded: !0 }, { label: "O-Ren", name: "O-Ren", localizedName: "apple", language: "ja-JP", gender: "female", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { label: "Kyoko", name: "Kyoko", localizedName: "apple", language: "ja-JP", gender: "female", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { label: "Otoya", name: "Otoya", localizedName: "apple", language: "ja-JP", gender: "male", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"] }, { label: "Ayumi", name: "Microsoft Ayumi - Japanese (Japan)", language: "ja-JP", gender: "female", quality: ["normal"], rate: 1, pitch: 1, os: ["Windows"], preloaded: !0 }, { label: "Haruka", name: "Microsoft Haruka - Japanese (Japan)", language: "ja-JP", gender: "female", quality: ["normal"], rate: 1, pitch: 1, os: ["Windows"], preloaded: !0 }, { label: "Ichiro", name: "Microsoft Ichiro - Japanese (Japan)", language: "ja-JP", gender: "male", quality: ["normal"], rate: 1, pitch: 1, os: ["Windows"], preloaded: !0 }, { label: "女性の声1", name: "Google 日本語 1 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google ja-jp-x-htm-network", "Chrome OS 日本語 1", "Android Speech Recognition and Synthesis from Google ja-jp-x-htm-local", "Android Speech Recognition and Synthesis from Google ja-JP-language"], nativeID: ["ja-jp-x-htm-network", "ja-jp-x-htm-local"], language: "ja-JP", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["ChromeOS"], preloaded: !0 }, { label: "女性の声2", name: "Chrome OS 日本語 2", altNames: ["Android Speech Recognition and Synthesis from Google ja-jp-x-jab-network", "Android Speech Recognition and Synthesis from Google ja-jp-x-jab-local"], nativeID: ["ja-jp-x-jab-network", "ja-jp-x-jab-local"], language: "ja-JP", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "男性の声1", name: "Google 日本語 2 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google ja-jp-x-jac-network", "Chrome OS 日本語 3", "Android Speech Recognition and Synthesis from Google ja-jp-x-jac-local"], nativeID: ["ja-jp-x-jac-network", "ja-jp-x-jac-local"], language: "ja-JP", gender: "male", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "男性の声2", name: "Google 日本語 3 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google ja-jp-x-jad-network", "Chrome OS 日本語 4", "Android Speech Recognition and Synthesis from Google ja-jp-x-jad-local"], nativeID: ["ja-jp-x-jad-network", "ja-jp-x-jad-local"], language: "ja-JP", gender: "male", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }], Pr = {
  language: Tr,
  defaultRegion: Mr,
  testUtterance: Hr,
  voices: Dr
}, Lr = "kk", Ur = "kk-KZ", zr = "Sälemetsiz be, meniñ atım {name} jäne men qazaq dawısımın.", Br = [{ label: "Aigul", name: "Microsoft Aigul Online (Natural) - Kazakh (Kazakhstan)", language: "kk-KZ", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Daulet", name: "Microsoft Daulet Online (Natural) - Kazakh (Kazakhstan)", language: "kk-KZ", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Aru", name: "Aru", nativeID: ["com.apple.voice.Aru"], localizedName: "apple", language: "kk-KZ", gender: "female", quality: ["normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"] }], $r = {
  language: Lr,
  defaultRegion: Ur,
  testUtterance: zr,
  voices: Br
}, jr = "kn", Fr = "kn-IN", Vr = "ಹಲೋ, ನನ್ನ ಹೆಸರು {name} ಮತ್ತು ನಾನು ಕನ್ನಡ ಧ್ವನಿ.", Kr = [{ label: "Sapna", name: "Microsoft Sapna Online (Natural) - Kannada (India)", language: "kn-IN", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Gagan", name: "Microsoft Gagan Online (Natural) - Kannada (India)", language: "kn-IN", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Soumya", name: "Soumya", localizedName: "apple", language: "kn-IN", gender: "female", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { label: "ಸ್ತ್ರೀ ಧ್ವನಿ", name: "Android Speech Recognition and Synthesis from Google kn-in-x-knf-network", altNames: ["Android Speech Recognition and Synthesis from Google kn-in-x-knf-local", "Android Speech Recognition and Synthesis from Google kn-IN-language"], nativeID: ["kn-in-x-knf-network", "kn-in-x-knf-local"], language: "kn-IN", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "ಪುರುಷ ಧ್ವನಿ", name: "Android Speech Recognition and Synthesis from Google kn-in-x-knm-network", altNames: ["Android Speech Recognition and Synthesis from Google kn-in-x-knm-local"], nativeID: ["kn-in-x-knm-network", "kn-in-x-knm-local"], language: "kn-IN", gender: "male", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }], Wr = {
  language: jr,
  defaultRegion: Fr,
  testUtterance: Vr,
  voices: Kr
}, _r = "ko", Jr = "ko-KR", Yr = "안녕하세요, 저는 {name}이고 한국어 음성입니다.", Zr = [{ label: "SunHi", name: "Microsoft SunHi Online (Natural) - Korean (Korea)", language: "ko-KR", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Hyunsu", name: "Microsoft HyunsuMultilingual Online (Natural) - Korean (Korea)", altNames: ["Microsoft Hyunsu Online (Natural) - Korean (Korea)"], language: "ko-KR", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "InJoon", name: "Microsoft InJoon Online (Natural) - Korean (Korea)", language: "ko-KR", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Google 여성 음성", name: "Google 한국의", note: "This voice is pre-loaded in Chrome on desktop. Utterances that are longer than 14 seconds long can trigger a bug with this voice, check the notes in the project's README for more information.", language: "ko-KR", gender: "female", quality: ["high"], rate: 1, pitch: 1, browser: ["ChromeDesktop"], preloaded: !0 }, { label: "Yuna", name: "Yuna", localizedName: "apple", language: "ko-KR", gender: "female", quality: ["low", "normal", "high"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { label: "Jian", name: "Jian", localizedName: "apple", language: "ko-KR", gender: "female", quality: ["low", "normal", "high"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"] }, { label: "Suhyun", name: "Suhyun", localizedName: "apple", language: "ko-KR", gender: "female", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"] }, { label: "Sora", name: "Sora", localizedName: "apple", language: "ko-KR", gender: "female", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"] }, { label: "Minsu", name: "Minsu", localizedName: "apple", language: "ko-KR", gender: "male", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"] }, { label: "Heami", name: "Microsoft Heami - Korean (Korea)", language: "ko-KR", gender: "female", quality: ["normal"], rate: 1, pitch: 1, os: ["Windows"], preloaded: !0 }, { label: "여성 목소리 1", name: "Google 한국어 2 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google ko-kr-x-kob-network", "Chrome OS 한국어 2", "Android Speech Recognition and Synthesis from Google ko-kr-x-kob-local", "Android Speech Recognition and Synthesis from Google ko-KR-language"], nativeID: ["ko-kr-x-kob-network", "ko-kr-x-kob-local"], language: "ko-KR", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "여성 목소리 2", name: "Google 한국어 1 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google ko-kr-x-ism-network", "Chrome OS 한국어 1", "Android Speech Recognition and Synthesis from Google ko-kr-x-ism-local"], nativeID: ["ko-kr-x-ism-network", "ko-kr-x-ism-local"], language: "ko-KR", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "남성 1", name: "Google 한국어 3 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google ko-kr-x-koc-network", "Chrome OS 한국어 3", "Android Speech Recognition and Synthesis from Google ko-kr-x-koc-local"], nativeID: ["ko-kr-x-koc-network", "ko-kr-x-koc-local"], language: "ko-KR", gender: "male", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "남성 2", name: "Google 한국어 4 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google ko-kr-x-kod-network", "Chrome OS 한국어 4", "Android Speech Recognition and Synthesis from Google ko-kr-x-kod-local"], nativeID: ["ko-kr-x-kod-network", "ko-kr-x-kod-local"], language: "ko-KR", gender: "male", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }], Qr = {
  language: _r,
  defaultRegion: Jr,
  testUtterance: Yr,
  voices: Zr
}, Xr = "mr", et = "mr-IN", at = "नमस्कार, माझे नाव {name} आहे आणि मी एक मराठी आवाज आहे.", nt = [{ label: "Aarohi", name: "Microsoft Aarohi Online (Natural) - Marathi (India)", language: "mr-IN", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Manohar", name: "Microsoft Manohar Online (Natural) - Marathi (India)", language: "mr-IN", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Ananya", name: "Ananya", localizedName: "apple", language: "mr-IN", gender: "female", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { label: "स्त्री आवाज", name: "Android Speech Recognition and Synthesis from Google mr-in-x-mrf-network", altNames: ["Android Speech Recognition and Synthesis from Google mr-in-x-mrf-local", "Android Speech Recognition and Synthesis from Google mr-IN-language"], nativeID: ["mr-in-x-mrf-network", "mr-in-x-mrf-local"], language: "mr-IN", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["ChromeOS"], preloaded: !0 }], rt = {
  language: Xr,
  defaultRegion: et,
  testUtterance: at,
  voices: nt
}, tt = "ms", ot = "ms-MY", lt = "Hello, nama saya {name} dan saya suara Melayu.", it = [{ label: "Yasmin", name: "Microsoft Yasmin Online (Natural) - Malay (Malaysia)", language: "ms-MY", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Osman", name: "Microsoft Osman Online (Natural) - Malay (Malaysia)", language: "ms-MY", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Amira", name: "Amira", localizedName: "apple", language: "ms-MY", gender: "female", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { label: "Rizwan", name: "Microsoft Rizwan - Malay (Malaysia)", language: "ms-MY", gender: "male", quality: ["normal"], rate: 1, pitch: 1, os: ["Windows"], preloaded: !0 }, { label: "Suara perempuan 1", name: "Android Speech Recognition and Synthesis from Google ms-my-x-msc-network", altNames: ["Android Speech Recognition and Synthesis from Google ms-my-x-msc-local", "Android Speech Recognition and Synthesis from Google ms-MY-language"], nativeID: ["ms-my-x-msc-network", "ms-my-x-msc-local"], language: "ms-MY", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "Suara perempuan 2", name: "Android Speech Recognition and Synthesis from Google ms-my-x-mse-network", altNames: ["Android Speech Recognition and Synthesis from Google ms-my-x-mse-local"], nativeID: ["ms-my-x-mse-network", "ms-my-x-mse-local"], language: "ms-MY", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "Suara lelaki 1", name: "Android Speech Recognition and Synthesis from Google ms-my-x-msd-network", altNames: ["Android Speech Recognition and Synthesis from Google ms-my-x-msd-local"], nativeID: ["ms-my-x-msd-network", "ms-my-x-msd-local"], language: "ms-MY", gender: "male", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "Suara lelaki 2", name: "Android Speech Recognition and Synthesis from Google ms-my-x-msg-network", altNames: ["Android Speech Recognition and Synthesis from Google ms-my-x-msg-local"], nativeID: ["ms-my-x-msg-network", "ms-my-x-msg-local"], language: "ms-MY", gender: "male", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }], st = {
  language: tt,
  defaultRegion: ot,
  testUtterance: lt,
  voices: it
}, gt = "nb", dt = "nb-NO", ct = "Hei, jeg heter {name} og er en norsk stemme.", ut = [{ label: "Pernille", name: "Microsoft Pernille Online (Natural) - Norwegian (Bokmål, Norway)", language: "nb-NO", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Finn", name: "Microsoft Finn Online (Natural) - Norwegian (Bokmål Norway)", language: "nb-NO", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Nora", name: "Nora", localizedName: "apple", language: "nb-NO", gender: "female", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { label: "Henrik", name: "Henrik", localizedName: "apple", language: "nb-NO", gender: "male", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"] }, { label: "Jon", name: "Microsoft Jon - Norwegian (Bokmål Norway)", language: "nb-NO", gender: "male", quality: ["normal"], rate: 1, pitch: 1, os: ["Windows"], preloaded: !0 }, { label: "Kvinnestemme 1", name: "Google Norsk Bokmål 2 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google nb-no-x-cfl-network", "Chrome OS Norsk Bokmål 2", "Android Speech Recognition and Synthesis from Google nb-no-x-cfl-local", "Android Speech Recognition and Synthesis from Google nb-NO-language"], nativeID: ["nb-no-x-cfl-network", "nb-no-x-cfl-local"], language: "nb-NO", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "Kvinnestemme 2", name: "Google Norsk Bokmål 1 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google nb-no-x-rfj-network", "Chrome OS Norsk Bokmål 1", "Android Speech Recognition and Synthesis from Google nb-no-x-rfj-local"], nativeID: ["nb-no-x-rfj-network", "nb-no-x-rfj-local"], language: "nb-NO", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "Kvinnestemme 3", name: "Google Norsk Bokmål 4 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google nb-no-x-tfs-network", "Chrome OS Norsk Bokmål 4", "Android Speech Recognition and Synthesis from Google nb-no-x-tfs-local"], nativeID: ["nb-no-x-tfs-network", "nb-no-x-tfs-local"], language: "nb-NO", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "Mannsstemme 1", name: "Google Norsk Bokmål 3 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google nb-no-x-cmj-network", "Chrome OS Norsk Bokmål 3", "Android Speech Recognition and Synthesis from Google nb-no-x-cmj-local"], nativeID: ["nb-no-x-cmj-network", "nb-no-x-cmj-local"], language: "nb-NO", gender: "male", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "Mannsstemme 2", name: "Google Norsk Bokmål 5 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google nb-no-x-tmg-network", "Chrome OS Norsk Bokmål 5", "Android Speech Recognition and Synthesis from Google nb-no-x-tmg-local"], nativeID: ["nb-no-x-tmg-network", "nb-no-x-tmg-local"], language: "nb-NO", gender: "male", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }], ht = {
  language: gt,
  defaultRegion: dt,
  testUtterance: ct,
  voices: ut
}, mt = "nl", pt = "nl-NL", ft = "Hallo, mijn naam is {name} en ik ben een Nederlandse stem.", yt = [{ label: "Colette", name: "Microsoft Colette Online (Natural) - Dutch (Netherlands)", language: "nl-NL", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Fenna", name: "Microsoft Fenna Online (Natural) - Dutch (Netherlands)", language: "nl-NL", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Hanna", name: "Microsoft Hanna Online - Dutch (Netherlands)", language: "nl-NL", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Maarten", name: "Microsoft Maarten Online (Natural) - Dutch (Netherlands)", language: "nl-NL", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Dena", name: "Microsoft Dena Online (Natural) - Dutch (Belgium)", language: "nl-BE", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Arnaud", name: "Microsoft Arnaud Online (Natural) - Dutch (Belgium)", language: "nl-BE", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Google mannelijke stem", name: "Google Nederlands", note: "This voice is pre-loaded in Chrome on desktop. Utterances that are longer than 14 seconds long can trigger a bug with this voice, check the notes in the project's README for more information.", language: "nl-NL", gender: "male", quality: ["high"], rate: 1, pitch: 1, browser: ["ChromeDesktop"], preloaded: !0 }, { label: "Claire", name: "Claire", localizedName: "apple", language: "nl-NL", gender: "female", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"] }, { label: "Xander", name: "Xander", localizedName: "apple", language: "nl-NL", gender: "male", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { label: "Ellen", name: "Ellen", localizedName: "apple", language: "nl-BE", gender: "female", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { label: "Frank", name: "Microsoft Frank - Dutch (Netherlands)", language: "nl-NL", gender: "male", quality: ["normal"], rate: 1, pitch: 1, os: ["Windows"], preloaded: !0 }, { label: "Vrouwelijke stem 1 (Nederland)", name: "Google Nederlands 4 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google nl-nl-x-lfc-network", "Chrome OS Nederlands 4", "Android Speech Recognition and Synthesis from Google nl-nl-x-lfc-local", "Android Speech Recognition and Synthesis from Google nl-NL-language"], nativeID: ["nl-nl-x-lfc-network", "nl-nl-x-lfc-local"], language: "nl-NL", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "Vrouwelijke stem 2 (Nederland)", name: "Google Nederlands 1 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google nl-nl-x-tfb-network", "Chrome OS Nederlands 1", "Android Speech Recognition and Synthesis from Google nl-nl-x-tfb-local"], nativeID: ["nl-nl-x-tfb-network", "nl-nl-x-tfb-local"], language: "nl-NL", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "Vrouwelijke stem 3 (Nederland)", name: "Google Nederlands 5 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google nl-nl-x-yfr-network", "Chrome OS Nederlands 5", "Android Speech Recognition and Synthesis from Google nl-nl-x-yfr-local"], nativeID: ["nl-nl-x-yfr-network", "nl-nl-x-yfr-local"], language: "nl-NL", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "Mannelijke stem 1 (Nederland)", name: "Google Nederlands 2 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google nl-nl-x-bmh-network", "Chrome OS Nederlands 2", "Android Speech Recognition and Synthesis from Google nl-nl-x-bmh-local"], nativeID: ["nl-nl-x-bmh-network", "nl-nl-x-bmh-local"], language: "nl-NL", gender: "male", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "Mannelijke stem 2 (Nederland)", name: "Google Nederlands 3 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google nl-nl-x-dma-network", "Chrome OS Nederlands 3", "Android Speech Recognition and Synthesis from Google nl-nl-x-dma-local"], nativeID: ["nl-nl-x-dma-network", "nl-nl-x-dma-local"], language: "nl-NL", gender: "male", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "Vrouwelijke stem (België)", name: "Android Speech Recognition and Synthesis from Google nl-be-x-bec-network", altNames: ["Android Speech Recognition and Synthesis from Google nl-be-x-bec-local", "Android Speech Recognition and Synthesis from Google nl-BE-language"], nativeID: ["nl-be-x-bec-network", "nl-be-x-bec-local"], language: "nl-BE", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "Mannelijke stem (België)", name: "Android Speech Recognition and Synthesis from Google nl-be-x-bed-network", altNames: ["Android Speech Recognition and Synthesis from Google nl-be-x-bed-local"], nativeID: ["nl-be-x-bed-network", "nl-be-x-bed-local"], language: "nl-BE", gender: "male", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }], St = {
  language: mt,
  defaultRegion: pt,
  testUtterance: ft,
  voices: yt
}, bt = "pl", Ot = "pl-PL", vt = "Cześć, nazywam się {name} i mam polski głos.", wt = [{ label: "Zofia", name: "Microsoft Zofia Online (Natural) - Polish (Poland)", language: "pl-PL", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Paulina", name: "Microsoft Paulina Online - Polish (Poland)", language: "pl-PL", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Marek", name: "Microsoft Marek Online (Natural) - Polish (Poland)", language: "pl-PL", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Żeński głos Google’a", name: "Google polski", note: "This voice is pre-loaded in Chrome on desktop. Utterances that are longer than 14 seconds long can trigger a bug with this voice, check the notes in the project's README for more information.", language: "pl-PL", gender: "female", quality: ["high"], rate: 1, pitch: 1, browser: ["ChromeDesktop"], preloaded: !0 }, { label: "Ewa", name: "Ewa", localizedName: "apple", language: "pl-PL", gender: "female", quality: ["low", "normal", "high"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"] }, { label: "Zosia", name: "Zosia", localizedName: "apple", language: "pl-PL", gender: "female", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { label: "Krzysztof", name: "Krzysztof", localizedName: "apple", language: "pl-PL", gender: "male", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"] }, { label: "Paulina", name: "Microsoft Paulina - Polish (Poland)", language: "pl-PL", gender: "female", quality: ["normal"], rate: 1, pitch: 1, os: ["Windows"], preloaded: !0 }, { label: "Adam", name: "Microsoft Adam - Polish (Poland)", language: "pl-PL", gender: "male", quality: ["normal"], rate: 1, pitch: 1, os: ["Windows"], preloaded: !0 }, { label: "Głos żeński 1", name: "Google Polski 2 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google pl-pl-x-afb-network", "Chrome OS Polski 2", "Android Speech Recognition and Synthesis from Google pl-pl-x-afb-local", "Android Speech Recognition and Synthesis from Google pl-PL-language"], nativeID: ["pl-pl-x-afb-network", "pl-pl-x-afb-local"], language: "pl-PL", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "Głos żeński 2", name: "Google Polski 1 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google pl-pl-x-oda-network", "Chrome OS Polski 1", "Android Speech Recognition and Synthesis from Google pl-pl-x-oda-local"], nativeID: ["pl-pl-x-oda-network", "pl-pl-x-oda-local"], language: "pl-PL", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "Głos żeński 3", name: "Google Polski 5 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google pl-pl-x-zfg-network", "Chrome OS Polski 5", "Android Speech Recognition and Synthesis from Google pl-pl-x-zfg-local"], nativeID: ["pl-pl-x-zfg-network", "pl-pl-x-zfg-local"], language: "pl-PL", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "Głos męski 1", name: "Google Polski 3 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google pl-pl-x-bmg-network", "Chrome OS Polski 3", "Android Speech Recognition and Synthesis from Google pl-pl-x-bmg-local"], nativeID: ["pl-pl-x-bmg-network", "pl-pl-x-bmg-local"], language: "pl-PL", gender: "male", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "Głos męski 2", name: "Google Polski 4 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google pl-pl-x-jmk-network", "Chrome OS Polski 4", "Android Speech Recognition and Synthesis from Google pl-pl-x-jmk-local"], nativeID: ["pl-pl-x-jmk-network", "pl-pl-x-jmk-local"], language: "pl-PL", gender: "male", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }], Nt = {
  language: bt,
  defaultRegion: Ot,
  testUtterance: vt,
  voices: wt
}, At = "pt", Ct = "pt-BR", kt = "Olá, o meu nome é {name} e sou uma voz portuguesa.", qt = [{ label: "Raquel", name: "Microsoft Raquel Online (Natural) - Portuguese (Portugal)", language: "pt-PT", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Duarte", name: "Microsoft Duarte Online (Natural) - Portuguese (Portugal)", language: "pt-PT", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Francisca", name: "Microsoft Francisca Online (Natural) - Portuguese (Brazil)", language: "pt-BR", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Thalita", name: "Microsoft ThalitaMultilingual Online (Natural) - Portuguese (Brazil)", language: "pt-BR", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Antonio", name: "Microsoft Antonio Online (Natural) - Portuguese (Brazil)", language: "pt-BR", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Voz feminina do Google", name: "Google português do Brasil", note: "This voice is pre-loaded in Chrome on desktop. Utterances that are longer than 14 seconds long can trigger a bug with this voice, check the notes in the project's README for more information.", language: "pt-BR", gender: "female", quality: ["high"], rate: 1, pitch: 1, browser: ["ChromeDesktop"], preloaded: !0 }, { label: "Catarina", name: "Catarina", localizedName: "apple", language: "pt-PT", gender: "female", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"] }, { label: "Joana", name: "Joana", localizedName: "apple", language: "pt-PT", gender: "female", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { label: "Joaquim", name: "Joaquim", localizedName: "apple", language: "pt-PT", gender: "male", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"] }, { label: "Fernanda", name: "Fernanda", localizedName: "apple", language: "pt-BR", gender: "female", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"] }, { label: "Luciana", name: "Luciana", localizedName: "apple", language: "pt-BR", gender: "female", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { label: "Felipe", name: "Felipe", localizedName: "apple", language: "pt-BR", gender: "male", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"] }, { label: "Helia", name: "Microsoft Helia - Portuguese (Portugal)", language: "pt-PT", gender: "female", quality: ["normal"], rate: 1, pitch: 1, os: ["Windows"], preloaded: !0 }, { label: "Maria", name: "Microsoft Maria - Portuguese (Brazil)", language: "pt-BR", gender: "female", quality: ["normal"], rate: 1, pitch: 1, os: ["Windows"], preloaded: !0 }, { label: "Daniel", name: "Microsoft Daniel - Portuguese (Brazil)", language: "pt-BR", gender: "male", quality: ["normal"], rate: 1, pitch: 1, os: ["Windows"], preloaded: !0 }, { label: "Voz feminina 1 (Portugal)", name: "Google português de Portugal 1 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google pt-pt-x-jfb-network", "Android Speech Recognition and Synthesis from Google pt-pt-x-jfb-local", "Android Speech Recognition and Synthesis from Google pt-PT-language"], nativeID: ["pt-pt-x-jfb-network", "pt-pt-x-jfb-local"], language: "pt-PT", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "Voz feminina 2 (Portugal)", name: "Google português de Portugal 4 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google pt-pt-x-sfs-network", "Chrome OS português de Portugal", "Android Speech Recognition and Synthesis from Google pt-pt-x-sfs-local"], nativeID: ["pt-pt-x-sfs-network", "pt-pt-x-sfs-local"], language: "pt-PT", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "Voz masculina 1 (Portugal)", name: "Google português de Portugal 2 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google pt-pt-x-jmn-network", "Android Speech Recognition and Synthesis from Google pt-pt-x-jmn-local"], nativeID: ["pt-pt-x-jmn-network", "pt-pt-x-jmn-local"], language: "pt-PT", gender: "male", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "Voz masculina 2 (Portugal)", name: "Google português de Portugal 3 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google pt-pt-x-pmj-network", "Android Speech Recognition and Synthesis from Google pt-pt-x-pmj-local"], nativeID: ["pt-pt-x-pmj-network", "pt-pt-x-pmj-local"], language: "pt-PT", gender: "male", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "Voz feminina 1 (Brasil)", name: "Google português do Brasil 1 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google pt-br-x-afs-network", "Chrome OS português do Brasil", "Android Speech Recognition and Synthesis from Google pt-br-x-afs-local", "Android Speech Recognition and Synthesis from Google pt-BR-language"], nativeID: ["pt-br-x-afs-network", "pt-br-x-afs-local"], language: "pt-BR", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "Voz feminina 2 (Brasil)", name: "Google português do Brasil 3 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google pt-br-x-pte-network", "Android Speech Recognition and Synthesis from Google pt-br-x-pte-local"], nativeID: ["pt-br-x-pte-network", "pt-br-x-pte-local"], language: "pt-BR", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "Voz masculina  (Brasil)", name: "Google português do Brasil 2 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google pt-br-x-ptd-network", "Android Speech Recognition and Synthesis from Google pt-br-x-ptd-local"], nativeID: ["pt-br-x-ptd-network", "pt-br-x-ptd-local"], language: "pt-BR", gender: "male", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }], xt = {
  language: At,
  defaultRegion: Ct,
  testUtterance: kt,
  voices: qt
}, Rt = "ro", Et = "ro-RO", Gt = "Buna ziua, ma numesc {name} si sunt o voce romaneasca.", It = [{ label: "Alina", name: "Microsoft Alina Online (Natural) - Romanian (Romania)", language: "ro-RO", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Emil", name: "Microsoft Emil Online (Natural) - Romanian (Romania)", language: "ro-RO", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Ioana", name: "Ioana", localizedName: "apple", language: "ro-RO", gender: "female", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { label: "Andrei", name: "Microsoft Andrei - Romanian (Romania)", language: "ro-RO", gender: "male", quality: ["normal"], rate: 1, pitch: 1, os: ["Windows"], preloaded: !0 }, { label: "Voce feminină", name: "Android Speech Recognition and Synthesis from Google ro-ro-x-vfv-network", altNames: ["Android Speech Recognition and Synthesis from Google ro-ro-x-vfv-local", "Android Speech Recognition and Synthesis from Google ro-RO-language"], nativeID: ["ro-ro-x-vfv-network", "ro-ro-x-vfv-local"], language: "ro-RO", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }], Tt = {
  language: Rt,
  defaultRegion: Et,
  testUtterance: Gt,
  voices: It
}, Mt = "ru", Ht = "ru-RU", Dt = "Здравствуйте, меня зовут {name} и я русский голос.", Pt = [{ label: "Svetlana", name: "Microsoft Svetlana Online (Natural) - Russian (Russia)", language: "ru-RU", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Ekaterina", name: "Microsoft Ekaterina Online - Russian (Russia)", language: "ru-RU", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Dmitry", name: "Microsoft Dmitry Online (Natural) - Russian (Russia)", language: "ru-RU", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Google женский голос", name: "Google русский", note: "This voice is pre-loaded in Chrome on desktop. Utterances that are longer than 14 seconds long can trigger a bug with this voice, check the notes in the project's README for more information.", language: "ru-RU", gender: "female", quality: ["high"], rate: 1, pitch: 1, browser: ["ChromeDesktop"], preloaded: !0 }, { label: "Katya", name: "Katya", localizedName: "apple", language: "ru-RU", gender: "female", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"] }, { label: "Milena", name: "Milena", localizedName: "apple", language: "ru-RU", gender: "female", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { label: "Yuri", name: "Yuri", localizedName: "apple", language: "ru-RU", gender: "male", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"] }, { label: "Irina", name: "Microsoft Irina - Russian (Russian)", language: "ru-RU", gender: "female", quality: ["normal"], rate: 1, pitch: 1, os: ["Windows"], preloaded: !0 }, { label: "Pavel", name: "Microsoft Pavel - Russian (Russian)", language: "ru-RU", gender: "male", quality: ["normal"], rate: 1, pitch: 1, os: ["Windows"], preloaded: !0 }, { label: "Женский голос 1", name: "Android Speech Recognition and Synthesis from Google ru-ru-x-dfc-network", altNames: ["Android Speech Recognition and Synthesis from Google ru-ru-x-dfc-local"], nativeID: ["ru-ru-x-dfc-network", "ru-ru-x-dfc-local"], language: "ru-RU", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "Женский голос 2", name: "Android Speech Recognition and Synthesis from Google ru-ru-x-ruc-network", altNames: ["Android Speech Recognition and Synthesis from Google ru-ru-x-ruc-local"], nativeID: ["ru-ru-x-ruc-network", "ru-ru-x-ruc-local"], language: "ru-RU", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "Женский голос 3", name: "Android Speech Recognition and Synthesis from Google ru-ru-x-rue-network", altNames: ["Android Speech Recognition and Synthesis from Google ru-ru-x-rue-local"], nativeID: ["ru-ru-x-rue-network", "ru-ru-x-rue-local"], language: "ru-RU", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "Мужской голос 1", name: "Android Speech Recognition and Synthesis from Google ru-ru-x-rud-network", altNames: ["Android Speech Recognition and Synthesis from Google ru-ru-x-rud-local"], nativeID: ["ru-ru-x-rud-network", "ru-ru-x-rud-local"], language: "ru-RU", gender: "male", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "Мужской голос 2", name: "Android Speech Recognition and Synthesis from Google ru-ru-x-ruf-network", altNames: ["Android Speech Recognition and Synthesis from Google ru-ru-x-ruf-local"], nativeID: ["ru-ru-x-ruf-network", "ru-ru-x-ruf-local"], language: "ru-RU", gender: "male", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }], Lt = {
  language: Mt,
  defaultRegion: Ht,
  testUtterance: Dt,
  voices: Pt
}, Ut = "sk", zt = "sk-SK", Bt = "Dobrý deň, volám sa {name} a som slovenský hlas.", $t = [{ label: "Viktoria", name: "Microsoft Viktoria Online (Natural) - Slovak (Slovakia)", language: "sk-SK", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Lukas", name: "Microsoft Lukas Online (Natural) - Slovak (Slovakia)", language: "sk-SK", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Laura", name: "Laura", localizedName: "apple", language: "sk-SK", gender: "female", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { label: "Filip", name: "Microsoft Filip - Slovak (Slovakia)", language: "sk-SK", gender: "male", quality: ["normal"], rate: 1, pitch: 1, os: ["Windows"], preloaded: !0 }, { label: "Ženský hlas", name: "Google Slovenčina (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google sk-sk-x-sfk-network", "Android Speech Recognition and Synthesis from Google sk-sk-x-sfk-local", "Chrome OS Slovenčina", "Android Speech Recognition and Synthesis from Google sk-SK-language"], nativeID: ["sk-sk-x-sfk-network", "sk-sk-x-sfk-local"], language: "sk-SK", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }], jt = {
  language: Ut,
  defaultRegion: zt,
  testUtterance: Bt,
  voices: $t
}, Ft = "sl", Vt = "sl-SI", Kt = "Pozdravljeni, moje ime je {name} in sem slovenski glas.", Wt = [{ label: "Petra", name: "Microsoft Petra Online (Natural) - Slovenian (Slovenia)", language: "sl-SI", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Rok", name: "Microsoft Rok Online (Natural) - Slovenian (Slovenia)", language: "sl-SI", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Tina", name: "Tina", localizedName: "apple", language: "sl-SI", gender: "female", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { label: "Lado", name: "Microsoft Lado - Slovenian (Slovenia)", language: "sl-SI", gender: "male", quality: ["normal"], rate: 1, pitch: 1, os: ["Windows"], preloaded: !0 }, { label: "Ženski glas", name: "Android Speech Recognition and Synthesis from Google sl-si-x-frm-local", altNames: ["Android Speech Recognition and Synthesis from Google sl-SI-language"], nativeID: ["sl-si-x-frm-local"], language: "sl-SI", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }], _t = {
  language: Ft,
  defaultRegion: Vt,
  testUtterance: Kt,
  voices: Wt
}, Jt = "sv", Yt = "sv-SE", Zt = "Hej, jag heter {name} och jag är en svensk röst.", Qt = [{ label: "Sofie", name: "Microsoft Sofie Online (Natural) - Swedish (Sweden)", language: "sv-SE", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Mattias", name: "Microsoft Mattias Online (Natural) - Swedish (Sweden)", language: "sv-SE", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Klara", name: "Klara", localizedName: "apple", language: "sv-SE", gender: "female", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { label: "Alva", name: "Alva", localizedName: "apple", language: "sv-SE", gender: "female", quality: ["low", "normal", "high"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { label: "Oskar", name: "Oskar", note: "This voice can be installed on all Apple devices and offers two variants. Like all voices that can be installed on Apple devices, it suffers from inconsistent naming due to localization.", language: "sv-SE", gender: "male", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"] }, { label: "Bengt", name: "Microsoft Bengt - Swedish (Sweden)", language: "sv-SE", gender: "female", quality: ["normal"], rate: 1, pitch: 1, os: ["Windows"], preloaded: !0 }, { label: "Kvinnlig röst 1", name: "Google Svenska 1 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google sv-se-x-lfs-network", "Chrome OS Svenska", "Android Speech Recognition and Synthesis from Google sv-se-x-lfs-local", "Android Speech Recognition and Synthesis from Google sv-SE-language"], nativeID: ["sv-se-x-lfs-network", "sv-se-x-lfs-local"], language: "sv-SE", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "Kvinnlig röst 2", name: "Google Svenska 2 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google sv-se-x-afp-network", "Android Speech Recognition and Synthesis from Google sv-se-x-afp-local"], nativeID: ["sv-se-x-afp-network", "sv-se-x-afp-local"], language: "sv-SE", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "Kvinnlig röst 3", name: "Google Svenska 3 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google sv-se-x-cfg-network", "Android Speech Recognition and Synthesis from Google sv-se-x-cfg-local"], nativeID: ["sv-se-x-cfg-network", "sv-se-x-cfg-local"], language: "sv-SE", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "Mansröst 1", name: "Google Svenska 4 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google sv-se-x-cmh-network", "Android Speech Recognition and Synthesis from Google sv-se-x-cmh-local"], nativeID: ["sv-se-x-cmh-network", "sv-se-x-cmh-local"], language: "sv-SE", gender: "male", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "Mansröst 2", name: "Google Svenska 5 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google sv-se-x-dmc-network", "Android Speech Recognition and Synthesis from Google sv-se-x-dmc-local"], nativeID: ["sv-se-x-dmc-network", "sv-se-x-dmc-local"], language: "sv-SE", gender: "male", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }], Xt = {
  language: Jt,
  defaultRegion: Yt,
  testUtterance: Zt,
  voices: Qt
}, eo = "ta", ao = "ta-IN", no = "வணக்கம், என் பெயர் {name} மற்றும் நான் ஒரு தமிழ் குரல்", ro = [{ label: "Pallavi", name: "Microsoft Pallavi Online (Natural) - Tamil (India)", language: "ta-IN", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Valluvar", name: "Microsoft Valluvar Online (Natural) - Tamil (India)", language: "ta-IN", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Saranya", name: "Microsoft Saranya Online (Natural) - Tamil (Sri Lanka)", language: "ta-LK", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Kumar", name: "Microsoft Kumar Online (Natural) - Tamil (Sri Lanka)", language: "ta-LK", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Kani", name: "Microsoft Kani Online (Natural) - Tamil (Malaysia)", language: "ta-MY", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Surya", name: "Microsoft Surya Online (Natural) - Tamil (Malaysia)", language: "ta-MY", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Venba", name: "Microsoft Venba Online (Natural) - Tamil (Singapore)", language: "ta-SG", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Anbu", name: "Microsoft Anbu Online (Natural) - Tamil (Singapore)", language: "ta-SG", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Vani", name: "Vani", localizedName: "apple", language: "ta-IN", gender: "female", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { label: "Valluvar", name: "Microsoft Valluvar - Tamil (India)", language: "ta-IN", gender: "male", quality: ["normal"], rate: 1, pitch: 1, os: ["Windows"], preloaded: !0 }, { label: "பெண் குரல்", name: "Android Speech Recognition and Synthesis from Google ta-in-x-tac-network", altNames: ["Android Speech Recognition and Synthesis from Google ta-in-x-tac-local", "Android Speech Recognition and Synthesis from Google ta-IN-language"], nativeID: ["ta-in-x-tac-network", "ta-in-x-tac-local"], language: "ta-IN", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "ஆண் குரல்", name: "Android Speech Recognition and Synthesis from Google ta-in-x-tad-network", altNames: ["Android Speech Recognition and Synthesis from Google ta-in-x-tad-local"], nativeID: ["ta-in-x-tad-network", "ta-in-x-tad-local"], language: "ta-IN", gender: "male", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }], to = {
  language: eo,
  defaultRegion: ao,
  testUtterance: no,
  voices: ro
}, oo = "te", lo = "te-IN", io = "హలో, నా పేరు {name} మరియు నేను తెలుగు వాణిని.", so = [{ label: "Shruti", name: "Microsoft Shruti Online (Natural) - Telugu (India)", language: "te-IN", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Mohan", name: "Microsoft Mohan Online (Natural) - Telugu (India)", language: "te-IN", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Geeta", name: "Geeta", localizedName: "apple", language: "te-IN", gender: "female", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { label: "స్త్రీ స్వరం", name: "Android Speech Recognition and Synthesis from Google te-in-x-tef-network", altNames: ["Android Speech Recognition and Synthesis from Google te-in-x-tef-local", "Android Speech Recognition and Synthesis from Google te-IN-language"], nativeID: ["te-in-x-tef-network", "te-in-x-tef-local"], language: "te-IN", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "పురుష స్వరం", name: "Android Speech Recognition and Synthesis from Google te-in-x-tem-network", altNames: ["Android Speech Recognition and Synthesis from Google te-in-x-tem-local"], nativeID: ["te-in-x-tem-network", "te-in-x-tem-local"], language: "te-IN", gender: "male", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }], go = {
  language: oo,
  defaultRegion: lo,
  testUtterance: io,
  voices: so
}, co = "th", uo = "th-TH", ho = "สวัสดีค่ะ ฉันชื่อ {name} และฉันเป็นคนมีเสียงภาษาไทย", mo = [{ label: "Premwadee", name: "Microsoft Premwadee Online (Natural) - Thai (Thailand)", language: "th-TH", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Niwat", name: "Microsoft Niwat Online (Natural) - Thai (Thailand)", language: "th-TH", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Narisa", name: "Narisa", localizedName: "apple", language: "th-TH", gender: "female", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"] }, { label: "Kanya", name: "Kanya", localizedName: "apple", language: "th-TH", gender: "female", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { label: "Pattara", name: "Microsoft Pattara - Thai (Thailand)", language: "th-TH", gender: "male", quality: ["normal"], rate: 1, pitch: 1, os: ["Windows"], preloaded: !0 }, { label: "เสียงผู้หญิง", name: "Google ไทย (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google th-th-x-mol-network", "Chrome OS ไทย", "Android Speech Recognition and Synthesis from Google th-th-x-mol-local", "Android Speech Recognition and Synthesis from Google th-TH-language"], nativeID: ["th-th-x-mol-network", "th-th-x-mol-local"], language: "th-TH", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }], po = {
  language: co,
  defaultRegion: uo,
  testUtterance: ho,
  voices: mo
}, fo = "tr", yo = "tr-TR", So = "Merhaba, adım {name} ve Türk sesiyim.", bo = [{ label: "Emel", name: "Microsoft Emel Online (Natural) - Turkish (Turkey)", language: "tr-TR", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Ahmet", name: "Microsoft Ahmet Online (Natural) - Turkish (Türkiye)", language: "tr-TR", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Yelda", name: "Yelda", localizedName: "apple", altNames: ["Yelda (Geliştirilmiş)", "Yelda (Türkçe (Türkiye))"], language: "tr-TR", gender: "female", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { label: "Cem", name: "Cem", localizedName: "apple", language: "tr-TR", gender: "male", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"] }, { label: "Tolga", name: "Microsoft Tolga - Turkish (Turkey)", language: "tr-TR", gender: "male", quality: ["normal"], rate: 1, pitch: 1, os: ["Windows"], preloaded: !0 }, { label: "Kadın sesi 1", name: "Google Türkçe 3 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google tr-tr-x-cfs-network", "Chrome OS Türkçe 3", "Android Speech Recognition and Synthesis from Google tr-tr-x-cfs-local", "Android Speech Recognition and Synthesis from Google tr-TR-language"], nativeID: ["tr-tr-x-cfs-network", "tr-tr-x-cfs-local"], language: "tr-TR", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "Kadın sesi 2", name: "Google Türkçe 4 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google tr-tr-x-efu-network", "Chrome OS Türkçe 4", "Android Speech Recognition and Synthesis from Google tr-tr-x-efu-local"], nativeID: ["tr-tr-x-efu-network", "tr-tr-x-efu-local"], language: "tr-TR", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "Kadın sesi 3", name: "Google Türkçe 1 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google tr-tr-x-mfm-network", "Chrome OS Türkçe 1", "Android Speech Recognition and Synthesis from Google tr-tr-x-mfm-local"], nativeID: ["tr-tr-x-mfm-network", "tr-tr-x-mfm-local"], language: "tr-TR", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "Erkek sesi 1", name: "Google Türkçe 2 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google tr-tr-x-ama-network", "Chrome OS Türkçe 2", "Android Speech Recognition and Synthesis from Google tr-tr-x-ama-local"], nativeID: ["tr-tr-x-ama-network", "tr-tr-x-ama-local"], language: "tr-TR", gender: "male", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "Erkek sesi 2", name: "Google Türkçe 5 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google tr-tr-x-tmc-network", "Chrome OS Türkçe 5", "Android Speech Recognition and Synthesis from Google tr-tr-x-tmc-local"], nativeID: ["tr-tr-x-tmc-network", "tr-tr-x-tmc-local"], language: "tr-TR", gender: "male", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }], Oo = {
  language: fo,
  defaultRegion: yo,
  testUtterance: So,
  voices: bo
}, vo = "uk", wo = "uk-UA", No = "Здравствуйте, меня зовут {name} и я украинский голос.", Ao = [{ label: "Polina", name: "Microsoft Polina Online (Natural) - Ukrainian (Ukraine)", language: "uk-UA", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Ostap", name: "Microsoft Ostap Online (Natural) - Ukrainian (Ukraine)", language: "uk-UA", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Lesya", name: "Lesya", localizedName: "apple", language: "uk-UA", gender: "female", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { label: "Жіночий голос", name: "Google українська (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google uk-ua-x-hfd-network", "Chrome OS українська", "Android Speech Recognition and Synthesis from Google uk-ua-x-hfd-local", "Android Speech Recognition and Synthesis from Google uk-UA-language"], nativeID: ["uk-ua-x-hfd-network", "uk-ua-x-hfd-local"], language: "uk-UA", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }], Co = {
  language: vo,
  defaultRegion: wo,
  testUtterance: No,
  voices: Ao
}, ko = "vi", qo = "vi-VN", xo = "Xin chào, tôi tên là {name} và tôi là giọng nói tiếng Việt.", Ro = [{ label: "HoaiMy", name: "Microsoft HoaiMy Online (Natural) - Vietnamese (Vietnam)", language: "vi-VN", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "NamMinh", name: "Microsoft NamMinh Online (Natural) - Vietnamese (Vietnam)", language: "vi-VN", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Linh", name: "Linh", localizedName: "apple", language: "vi-VN", gender: "female", quality: ["low", "normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { label: "An", name: "Microsoft An - Vietnamese (Vietnam)", language: "vi-VN", gender: "male", quality: ["normal"], rate: 1, pitch: 1, os: ["Windows"], preloaded: !0 }, { label: "Giọng nữ 1", name: "Google Tiếng Việt 1 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google vi-vn-x-vic-network", "Chrome OS Tiếng Việt 1", "Android Speech Recognition and Synthesis from Google vi-vn-x-vic-local", "Android Speech Recognition and Synthesis from Google vi-VN-language"], nativeID: ["vi-vn-x-vic-network", "vi-vn-x-vic-local"], language: "vi-VN", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "Giọng nữ 2", name: "Google Tiếng Việt 2 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google vi-vn-x-vid-network", "Chrome OS Tiếng Việt 2", "Android Speech Recognition and Synthesis from Google vi-vn-x-vid-local"], nativeID: ["vi-vn-x-vid-network", "vi-vn-x-vid-local"], language: "vi-VN", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "Giọng nữ 3", name: "Google Tiếng Việt 4 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google vi-vn-x-vif-network", "Chrome OS Tiếng Việt 4", "Android Speech Recognition and Synthesis from Google vi-vn-x-vif-local"], nativeID: ["vi-vn-x-vif-network", "vi-vn-x-vif-local"], language: "vi-VN", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "Giọng nam 1", name: "Google Tiếng Việt 3 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google vi-vn-x-vie-network", "Chrome OS Tiếng Việt 3", "Android Speech Recognition and Synthesis from Google vi-vn-x-vie-local"], nativeID: ["vi-vn-x-vie-network", "vi-vn-x-vie-local"], language: "vi-VN", gender: "male", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "Giọng nam 2", name: "Google Tiếng Việt 5 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google vi-vn-x-gft-network", "Chrome OS Tiếng Việt 5", "Android Speech Recognition and Synthesis from Google vi-vn-x-gft-local"], nativeID: ["vi-vn-x-gft-network", "vi-vn-x-gft-local"], language: "vi-VN", gender: "male", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }], Eo = {
  language: ko,
  defaultRegion: qo,
  testUtterance: xo,
  voices: Ro
}, Go = "wuu", Io = "wuu-CN", To = "你好，我的名字是 {name}，我是吴语配音。", Mo = [{ label: "Nannan", name: "Nannan", localizedName: "apple", language: "wuu-CN", gender: "female", quality: ["normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }], Ho = {
  language: Go,
  defaultRegion: Io,
  testUtterance: To,
  voices: Mo
}, Do = "yue", Po = "yue-HK", Lo = "你好，我叫 {name}，係越中文聲。", Uo = [{ label: "HiuGaai", name: "Microsoft HiuGaai Online (Natural) - Chinese (Cantonese Traditional)", language: "yue-HK", altLanguage: "zh-HK", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "HiuMaan", name: "Microsoft HiuMaan Online (Natural) - Chinese (Hong Kong SAR)", language: "yue-HK", altLanguage: "zh-HK", gender: "female", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "WanLung", name: "Microsoft WanLung Online (Natural) - Chinese (Hong Kong SAR)", language: "yue-HK", altLanguage: "zh-HK", gender: "male", quality: ["veryHigh"], rate: 1, pitchControl: !1, browser: ["Edge"], preloaded: !0 }, { label: "Google 女聲", name: "Google 粤語（香港）", note: "This voice is pre-loaded in Chrome on desktop. Utterances that are longer than 14 seconds long can trigger a bug with this voice, check the notes in the project's README for more information.", language: "yue-HK", altLanguage: "zh-HK", gender: "female", quality: ["high"], rate: 1, pitch: 1, browser: ["ChromeDesktop"], preloaded: !0 }, { label: "Sinji", name: "Sinji", localizedName: "apple", language: "yue-HK", altLanguage: "zh-HK", gender: "female", quality: ["low", "normal", "high"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { label: "Aasing", name: "Aasing", localizedName: "apple", language: "yue-HK", altLanguage: "zh-HK", gender: "male", quality: ["normal"], rate: 1, pitch: 1, os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { label: "Tracy", name: "Microsoft Tracy - Chinese (Traditional, Hong Kong S.A.R.)", language: "cmn-HK", altLanguage: "zh-HK", gender: "female", quality: ["normal"], rate: 1, pitch: 1, os: ["Windows"], preloaded: !0 }, { label: "Danny", name: "Microsoft Danny - Chinese (Traditional, Hong Kong S.A.R.)", language: "cmn-HK", altLanguage: "zh-HK", gender: "male", quality: ["normal"], rate: 1, pitch: 1, os: ["Windows"], preloaded: !0 }, { label: "女聲1", name: "Android Speech Recognition and Synthesis from Google yue-hk-x-jar-network", altNames: ["Chrome OS 粵語 1", "Android Speech Recognition and Synthesis from Google yue-HK-x-jar-local", "Android Speech Recognition and Synthesis from Google yue-HK-language"], nativeID: ["yue-hk-x-jar-network", "yue-hk-x-jar-local"], language: "yue-HK", altLanguage: "zh-HK", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "女聲2", name: "Android Speech Recognition and Synthesis from Google yue-hk-x-yuc-network", altNames: ["Chrome OS 粵語 2", "Android Speech Recognition and Synthesis from Google yue-HK-x-yuc-local"], nativeID: ["yue-hk-x-yuc-network", "yue-hk-x-yuc-local"], language: "yue-HK", altLanguage: "zh-HK", gender: "female", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "男聲1", name: "Android Speech Recognition and Synthesis from Google yue-hk-x-yud-network", altNames: ["Chrome OS 粵語 3", "Android Speech Recognition and Synthesis from Google yue-HK-x-yud-local"], nativeID: ["yue-hk-x-yud-network", "yue-hk-x-yud-local"], language: "yue-HK", altLanguage: "zh-HK", gender: "male", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "男聲2", name: "Android Speech Recognition and Synthesis from Google yue-hk-x-yue-network", altNames: ["Chrome OS 粵語 5", "Android Speech Recognition and Synthesis from Google yue-HK-x-yue-local"], nativeID: ["yue-hk-x-yue-network", "yue-hk-x-yue-local"], language: "yue-HK", altLanguage: "zh-HK", gender: "male", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }, { label: "男聲3", name: "Android Speech Recognition and Synthesis from Google yue-hk-x-yuf-network", altNames: ["Chrome OS 粵語 5", "Android Speech Recognition and Synthesis from Google yue-HK-x-yuf-local"], nativeID: ["yue-hk-x-yuf-network", "yue-hk-x-yuf-local"], language: "yue-HK", altLanguage: "zh-HK", gender: "male", quality: ["high"], rate: 1, pitch: 1, os: ["Android", "ChromeOS"], preloaded: !0 }], zo = {
  language: Do,
  defaultRegion: Po,
  testUtterance: Lo,
  voices: Uo
}, Bo = (e) => ({
  ...e,
  gender: e.gender,
  quality: e.quality ? Array.isArray(e.quality) ? e.quality.filter(
    (a) => ["veryLow", "low", "normal", "high", "veryHigh"].includes(a)
  ) : [e.quality].filter(
    (a) => ["veryLow", "low", "normal", "high", "veryHigh"].includes(a)
  ) : void 0,
  localizedName: e.localizedName && ["android", "apple"].includes(e.localizedName) ? e.localizedName : void 0
}), ia = Object.fromEntries(
  Object.entries({
    ar: Ra,
    bg: Ma,
    bho: Ua,
    bn: Fa,
    ca: Ja,
    cmn: en,
    cs: on,
    da: cn,
    de: fn,
    el: vn,
    en: kn,
    es: Gn,
    eu: Dn,
    fa: Bn,
    fi: Kn,
    fr: Zn,
    gl: nr,
    he: ir,
    hi: ur,
    hr: yr,
    hu: wr,
    id: qr,
    it: Ir,
    ja: Pr,
    kk: $r,
    kn: Wr,
    ko: Qr,
    mr: rt,
    ms: st,
    nb: ht,
    nl: St,
    pl: Nt,
    pt: xt,
    ro: Tt,
    ru: Lt,
    sk: jt,
    sl: _t,
    sv: Xt,
    ta: to,
    te: go,
    th: po,
    tr: Oo,
    uk: Co,
    vi: Eo,
    wuu: Ho,
    yue: zo
  }).map(([e, a]) => [
    e,
    {
      ...a,
      voices: a.voices.map(Bo)
    }
  ])
), F = (e) => ia[e], te = {
  cmn: "cmn",
  "cmn-cn": "cmn",
  "cmn-tw": "cmn",
  zh: "cmn",
  "zh-cn": "cmn",
  "zh-tw": "cmn",
  yue: "yue",
  "yue-hk": "yue",
  "zh-hk": "yue",
  wuu: "wuu",
  "wuu-cn": "wuu"
}, sa = (e) => {
  if (!e) return "";
  const a = e.toLowerCase().replace(/_/g, "-");
  return te[a] || a;
}, Le = (e) => {
  if (!e) return [];
  try {
    const a = sa(e);
    let n = F(a);
    if ((!n || !n.voices?.length) && a in te && (n = F("zh")), !n || !n.voices?.length) {
      const [t] = ie(a);
      t !== a && (n = F(t));
    }
    return n?.voices || [];
  } catch (a) {
    return console.error(`Failed to load voices for ${e}:`, a), [];
  }
}, Us = () => Object.keys(ia), Ue = (e) => {
  if (!e) return "";
  try {
    const a = sa(e);
    let n = F(a);
    if (!n?.testUtterance && a in te) {
      const t = te[a];
      if (t) {
        const i = F(t);
        if (i?.testUtterance)
          return i.testUtterance;
      }
    }
    if (!n?.testUtterance) {
      const [t] = ie(a);
      if (t !== a) {
        const i = F(t);
        if (i?.testUtterance)
          return i.testUtterance;
      }
    }
    return n?.testUtterance ?? "";
  } catch (a) {
    return console.error(`Failed to get test utterance for ${e}:`, a), "";
  }
}, $o = [{ name: "Albert", nativeID: ["com.apple.speech.synthesis.voice.Albert"], note: "This novelty voice is part of a pack preloaded by Apple.", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Bad News", nativeID: ["com.apple.speech.synthesis.voice.BadNews"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Mauvaises nouvelles", "Malas noticias", "Brutte notizie"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Bahh", nativeID: ["com.apple.speech.synthesis.voice.Bahh"], note: "This novelty voice is part of a pack preloaded by Apple.", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Bells", nativeID: ["com.apple.speech.synthesis.voice.Bells"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Cloches", "Campanas", "Campane"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Boing", nativeID: ["com.apple.speech.synthesis.voice.Boing"], note: "This novelty voice is part of a pack preloaded by Apple.", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Bubbles", nativeID: ["com.apple.speech.synthesis.voice.Bubbles"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Bulles", "Burbujas", "Bollicine"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Cellos", nativeID: ["com.apple.speech.synthesis.voice.Cellos"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Violoncelles", "Violonchelos", "Violoncelli"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Good News", nativeID: ["com.apple.speech.synthesis.voice.GoodNews"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Bonnes nouvelles", "Buenas noticias", "Buone notizie"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Jester", nativeID: ["com.apple.speech.synthesis.voice.Hysterical"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Bouffon", "Bufón", "Giullare"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Organ", nativeID: ["com.apple.speech.synthesis.voice.Organ"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Orgue", "Órgano", "Organo"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Superstar", nativeID: ["com.apple.speech.synthesis.voice.Princess"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Superestrella"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Trinoids", nativeID: ["com.apple.speech.synthesis.voice.Trinoids"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Trinoïdes"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Whisper", nativeID: ["com.apple.speech.synthesis.voice.Whisper"], note: "This novelty voice is part of a pack preloaded by Apple.", altNames: ["Murmure", "Susurro", "Sussurro"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Wobble", nativeID: ["com.apple.speech.synthesis.voice.Deranged"], note: "This novelty voice is part of a pack preloaded by Apple.", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Zarvox", nativeID: ["com.apple.speech.synthesis.voice.Zarvox"], note: "This novelty voice is part of a pack preloaded by Apple.", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }], jo = {
  voices: $o
}, Fo = [{ name: "Eddy", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Flo", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Grandma", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Grandpa", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Jacques", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Reed", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Rocko", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Sandy", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Shelley", localizedName: "apple", note: "Eloquence voices are preloaded by default on Apple devices.", language: "en-US", otherLanguages: ["en-GB", "de-DE", "fr-FR", "fr-CA", "es-ES", "es-MX", "fi-FI", "it-IT", "ja-JP", "ko-KR", "pt-BR", "zh-CN", "zh-HK"], os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Fred", language: "en-US", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Junior", language: "en-US", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Kathy", language: "en-US", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "Ralph", language: "en-US", os: ["macOS", "iOS", "iPadOS"], preloaded: !0 }, { name: "eSpeak Arabic", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ar", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Bulgarian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "bg", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Bengali", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "bn", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Catalan", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ca", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Chinese (Mandarin, latin as English)", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "cmn", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Czech", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "cs", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Danish", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "da", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak German", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "de", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Greek", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "el", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Spanish (Spain)", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "es", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Estonian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "et", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Finnish", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "fi", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Gujarati", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "gu", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Croatian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "hr", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Hungarian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "hu", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Indonesian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "id", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Italian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "it", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Kannada", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "kn", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Korean", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ko", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Lithuanian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "lt", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Latvian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "lv", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Malayalm", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ml", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Marathi", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "mr", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Malay", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ms", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Norwegian Bokmål", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "nb", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Polish", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "pl", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Portuguese (Brazil)", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "pt-br", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Romanian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ro", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Russian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ru", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Slovak", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "sk", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Slovenian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "sl", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Serbian", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "sv", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Swedish", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "sv", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Swahili", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "sw", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Tamil", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "ta", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Telugu", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "te", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Turkish", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "tr", os: ["ChromeOS"], preloaded: !0 }, { name: "eSpeak Vietnamese (Northern)", note: "eSpeak voices are preloaded by default on Chrome OS.", language: "vi", os: ["ChromeOS"], preloaded: !0 }], Vo = {
  voices: Fo
}, Ko = jo, Wo = Vo, we = (e, a) => Ko.voices.some(
  (n) => e.includes(n.name) || a && n.nativeID?.some((t) => a.includes(t)) || n.altNames?.some((t) => e.includes(t))
), Ne = (e, a) => Wo.voices.some(
  (n) => e.includes(n.name)
) || a === "veryLow", ze = (e) => e?.length ? e.filter((a) => !(a.isNovelty || we(a.name, a.voiceURI))) : [], Be = (e) => e?.length ? e.filter((a) => !Ne(a.name, a.quality)) : [], _o = { ar: { normal: "محسن", high: "استثنائي" }, ca: { normal: "millorada", high: "prèmium" }, "cmn-CN": { normal: "优化音质", high: "高音质" }, "cmn-TW": { normal: "增強音質", high: "高音質" }, cs: { normal: "vylepšená verze", high: "prémiový" }, da: { normal: "forbedret", high: "høj kvalitet" }, de: { normal: "erweitert", high: "premium" }, el: { normal: "βελτιωμένη", high: "υψηλής ποιότητας" }, en: { normal: "Enhanced", high: "Premium" }, es: { normal: "mejorada", high: "premium" }, fi: { normal: "parannettu", high: "korkealaatuinen" }, fr: { normal: "premium", high: "de qualité" }, he: { normal: "משופר", high: "פרימיום" }, hi: { normal: "बेहतर", high: "प्रीमियम" }, hr: { normal: "poboljšani", high: "vrhunski" }, hu: { normal: "továbbfejlesztett", high: "prémium" }, id: { normal: "Ditingkatkan", high: "Premium" }, it: { normal: "ottimizzata", high: "premium" }, ja: { normal: "拡張", high: "プレミアム" }, ko: { normal: "고품질", high: "프리미엄" }, ms: { normal: "Dipertingkat", high: "Premium" }, nb: { normal: "forbedret", high: "premium" }, nl: { normal: "verbeterd", high: "premium" }, pl: { normal: "rozszerzony", high: "premium" }, pt: { normal: "melhorada", high: "premium" }, ro: { normal: "îmbunătățită", high: "premium" }, ru: { normal: "улучшенный", high: "высшее качество" }, sk: { normal: "vylepšený", high: "prémiový" }, sl: { normal: "izboljšano", high: "prvovrsten" }, sv: { normal: "förbättrad", high: "premium" }, th: { normal: "คุณภาพสูง", high: "คุณภาพสูง" }, tr: { normal: "Geliştirilmiş", high: "Yüksek Kaliteli" }, uk: { normal: "вдосконалений", high: "високої якості" }, vi: { normal: "Nâng cao", high: "Cao cấp" } }, Jo = {
  quality: _o
}, Ae = {
  apple: Jo.quality
  // android: androidQualities.quality
}, Yo = (e, a, n) => {
  if (!e) return;
  const t = Array.isArray(n) ? n : n ? [n] : [];
  for (const i of t)
    if (i && Ae[i]) {
      const o = Ae[i], g = ie(a)[0], r = o[a] || o[g];
      if (r) {
        const h = e.toLowerCase(), { normal: s, high: f } = r;
        if (f && h.includes(f.toLowerCase()))
          return "high";
        if (s && h.includes(s.toLowerCase()))
          return "normal";
      }
    }
}, Zo = (e, a) => {
  const n = Ae[a];
  if (n)
    for (const [t, { high: i, normal: o }] of Object.entries(n)) {
      const g = i && e.some((h) => h.includes(i)), r = o && e.some((h) => h.includes(o));
      if (g && r)
        return t;
    }
}, Qo = {
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
}, $e = (e) => {
  if (!e) return;
  const a = e.toLowerCase();
  for (const n of Object.values(Qo))
    if (n.values.some((t) => a.includes(`.${t}.`)))
      return n.quality;
};
class A {
  static instance;
  static initializationPromise = null;
  systemLocale;
  voices = [];
  browserVoices = [];
  isInitialized = !1;
  constructor() {
    if (typeof window > "u" || !window.speechSynthesis)
      throw new Error("Web Speech API is not available in this environment");
    this.systemLocale = navigator.languages?.[0]?.split("-")[0] || "en";
  }
  /**
   * Initialize the voice manager
   * @param options Configuration options for voice loading
   * @param options.maxTime Maximum time in milliseconds to wait for voices to load (passed to getBrowserVoices)
   * @param options.interval Interval in milliseconds between voice loading checks (passed to getBrowserVoices)
   * @returns Promise that resolves with the WebSpeechVoiceManager instance
   */
  static async initialize(a, n) {
    return A.instance?.isInitialized ? A.instance : (A.initializationPromise || (A.initializationPromise = (async () => {
      try {
        const t = new A();
        return A.instance = t, t.browserVoices = await t.getBrowserVoices(a, n), t.updateSystemLocale(t.browserVoices), t.voices = await t.parseToReadiumSpeechVoices(t.browserVoices), t.isInitialized = !0, t;
      } catch (t) {
        throw A.initializationPromise = null, console.error("Failed to initialize WebSpeechVoiceManager:", t), t;
      }
    })()), A.initializationPromise);
  }
  /**
   * Extract language and region from BCP47 language tag
   * @param lang - The BCP47 language tag (e.g., "en-US", "zh-CN")
   * @returns A tuple of [language, region] where language is lowercase and region is UPPERCASE
   */
  static extractLangRegionFromBCP47(a) {
    return ie(a);
  }
  /**
   * Get display name for a language code
   * @private
   */
  static getLanguageDisplayName(a, n) {
    try {
      return new Intl.DisplayNames(
        n ? [n] : [],
        { type: "language", languageDisplay: "standard" }
      ).of(a) || a.toUpperCase();
    } catch {
      return a.toUpperCase();
    }
  }
  /**
   * Normalize voice name for comparison by removing common variations
   * @private
   */
  normalizeVoiceName(a) {
    return a ? a.toLowerCase().replace(/\s*\([^)]*\)/g, "").replace(/[^\p{L}\p{N}\s-]/gu, "").replace(/\s+/g, " ").trim() : "";
  }
  /**
   * Count occurrences of each voice based on language and normalized name
   * @private
   */
  countVoiceDuplicates(a) {
    const n = /* @__PURE__ */ new Map();
    for (const t of a) {
      if (!t?.name || !t?.lang) continue;
      const i = `${t.lang.toLowerCase()}_${this.normalizeVoiceName(t.name)}`;
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
  updateSystemLocale(a) {
    if (!a?.length) return;
    const n = a.map((i) => i.name), t = Zo(n, "apple");
    t && (this.systemLocale = t);
  }
  /**
   * Infer voice quality based on package, platform, JSON, or duplicate count
   * Returns null if quality cannot be determined
   * @private
   */
  inferVoiceQuality(a, n, t) {
    const i = a.voiceURI ? $e(a.voiceURI) : void 0;
    if (i) return i;
    if (n?.nativeID && Array.isArray(n.nativeID))
      for (const o of n.nativeID) {
        const g = $e(o);
        if (g) return g;
      }
    if (n?.localizedName && a.voiceURI && a.lang) {
      const o = Yo(
        a.voiceURI,
        this.systemLocale,
        n.localizedName
      );
      if (o) return o;
    }
    if (n?.quality && n.quality.length > 0) {
      const o = Math.min(t - 1, n.quality.length - 1), g = n.quality[o];
      if (g)
        return g;
    }
    return null;
  }
  /**
   * Find matching JSON voice by name or alternative names
   * @private
   */
  findMatchingJsonVoice(a, n) {
    return a.find(
      (t) => this.normalizeVoiceName(t.name) === n || t.altNames?.some((i) => this.normalizeVoiceName(i) === n)
    );
  }
  /**
   * Remove duplicate voices, keeping the highest quality version of each voice
   * @param voices Array of voices to remove duplicates from
   * @returns Filtered array with duplicates removed, keeping only the highest quality versions
   */
  removeDuplicate(a) {
    const n = /* @__PURE__ */ new Map();
    for (const t of a) {
      const i = `${t.language.toLowerCase()}_${this.normalizeVoiceName(t.name)}`, o = n.get(i);
      if (!o)
        n.set(i, t);
      else {
        const g = this.getQualityValue(o.quality);
        this.getQualityValue(t.quality) >= g && n.set(i, t);
      }
    }
    return Array.from(n.values());
  }
  /**
   * Get test utterance for a given language
   * @param language - Language code (e.g., "en", "fr", "es")
   * @returns Promise that resolves to the test utterance text
   */
  getTestUtterance(a) {
    if (!a) return "";
    const n = Ue(a);
    if (n) return n;
    const [t] = A.extractLangRegionFromBCP47(a);
    if (t && t !== a) {
      const i = Ue(t);
      if (i) return i;
    }
    return "";
  }
  /**
   * Get all voices matching the filter criteria
   * @returns Promise that resolves to an array of filtered voices
   */
  getVoices(a = {}) {
    if (!this.isInitialized)
      throw new Error("WebSpeechVoiceManager not initialized. Call initialize() first.");
    const n = {
      excludeNovelty: !0,
      // Default to true to filter out novelty voices
      excludeVeryLowQuality: !0,
      // Default to true to filter out very low quality voices
      ...a
      // Let explicit options override the defaults
    };
    return this.filterVoices([...this.voices], n);
  }
  /**
   * Get available languages with voice counts
   * @param localization Optional BCP 47 language tag to use for language names
   * @param filterOptions Optional filters to apply to voices before counting languages
   */
  getLanguages(a, n) {
    if (!this.isInitialized)
      throw new Error("WebSpeechVoiceManager not initialized. Call initialize() first.");
    const t = /* @__PURE__ */ new Map();
    return (n ? this.filterVoices([...this.voices], n) : this.voices).forEach((o) => {
      const g = o.language, [r] = A.extractLangRegionFromBCP47(g), h = r, s = A.getLanguageDisplayName(r, a), f = t.get(h) || { count: 0, label: s, code: r };
      t.set(h, { ...f, count: f.count + 1 });
    }), Array.from(t.entries()).map(([o, { code: g, label: r, count: h }]) => ({
      code: g,
      label: r,
      count: h
    })).sort((o, g) => o.label.localeCompare(g.label));
  }
  /**
   * Get available regions with voice counts
   */
  getRegions(a) {
    if (!this.isInitialized)
      throw new Error("WebSpeechVoiceManager not initialized. Call initialize() first.");
    const n = /* @__PURE__ */ new Map();
    return this.voices.forEach((t) => {
      const [, i] = A.extractLangRegionFromBCP47(t.language);
      if (i) {
        const o = n.get(i) || { count: 0, label: t.language };
        n.set(i, { ...o, count: o.count + 1 });
      }
    }), Array.from(n.entries()).map(([t, { count: i, label: o }]) => {
      let g = o;
      try {
        const r = a || navigator.language;
        g = new Intl.DisplayNames([r], { type: "region" }).of(t) || o;
      } catch (r) {
        console.warn(`Failed to get display name for region ${t}`, r);
      }
      return {
        code: t,
        label: g,
        count: i
      };
    });
  }
  /**
   * Get the default voice for a language
   * @param language The language code to get the default voice for (e.g., "en-US")
   * @param voices Optional pre-filtered voices array to use instead of fetching voices
   * @returns The default voice for the language, or null if no voices are available
   */
  getDefaultVoice(a, n) {
    if (!a) return null;
    let t = n || this.getVoices({ language: a });
    return t.length ? (t = this.sortVoices(t, {
      by: "quality",
      order: "desc"
    }), t = this.sortVoices(t, {
      by: "language",
      order: "asc",
      preferredLanguages: [a]
    }), t[0]) : null;
  }
  getBrowserVoices(a = 1e4, n = 10) {
    const t = () => window.speechSynthesis?.getVoices() || [];
    if (!window.speechSynthesis)
      return Promise.resolve([]);
    const i = t();
    return Array.isArray(i) && i.length ? Promise.resolve(i) : new Promise((o, g) => {
      let r = Math.floor(a / n), h = !1;
      const s = () => {
        if (h) return;
        h = !0;
        const f = () => {
          if (r < 1) return o([]);
          --r;
          const c = t();
          if (Array.isArray(c) && c.length) return o(c);
          setTimeout(f, n);
        };
        setTimeout(f, n);
      };
      window.speechSynthesis.onvoiceschanged !== void 0 ? window.speechSynthesis.onvoiceschanged = () => {
        const f = t();
        Array.isArray(f) && f.length ? o(f) : s();
      } : s(), setTimeout(() => o([]), a);
    });
  }
  /**
   * Convert SpeechSynthesisVoice array to ReadiumSpeechVoice array
   * @private
   */
  parseToReadiumSpeechVoices(a) {
    const n = (o) => {
      const g = o.replace(/_/g, "-");
      return /\w{2,3}-\w{2,3}/.test(g) ? `${g.split("-")[0].toLowerCase()}-${g.split("-")[1].toUpperCase()}` : o;
    }, t = this.countVoiceDuplicates(a), i = a.filter((o) => o?.name && o?.lang).map((o) => {
      const g = n(o.lang), [r] = A.extractLangRegionFromBCP47(g), h = this.normalizeVoiceName(o.name), s = `${o.lang.toLowerCase()}_${h}`, f = t.get(s) || 1;
      let c = Le(g);
      (!c || c.length === 0) && (c = Le(r));
      const u = this.findMatchingJsonVoice(c, h), d = this.inferVoiceQuality(o, u, f);
      return u ? {
        ...u,
        source: "json",
        originalName: o.name,
        language: o.lang,
        voiceURI: o.voiceURI,
        quality: d,
        isDefault: o.default || !1,
        offlineAvailability: o.localService || !1,
        isNovelty: we(o.name, o.voiceURI),
        isLowQuality: Ne(o.name, d)
      } : {
        source: "browser",
        label: this.normalizeVoiceName(o.name),
        name: o.name,
        originalName: o.name,
        language: g,
        voiceURI: o.voiceURI,
        quality: d,
        isDefault: o.default || !1,
        offlineAvailability: o.localService || !1,
        isNovelty: we(o.name, o.voiceURI),
        isLowQuality: Ne(o.name, d)
      };
    });
    return this.removeDuplicate(i);
  }
  /**
   * Convert an ReadiumSpeechVoice to a native SpeechSynthesisVoice
   */
  convertToSpeechSynthesisVoice(a) {
    if (a)
      return this.browserVoices.find(
        (n) => n.voiceURI === a.voiceURI || n.name === a.originalName || this.normalizeVoiceName(n.name) === this.normalizeVoiceName(a.name)
      );
  }
  /**
   * Filter voices based on the provided options
   */
  filterVoices(a, n) {
    let t = [...a];
    if (n.language) {
      const i = Array.isArray(n.language) ? n.language : [n.language];
      t = t.filter((o) => i.some((g) => {
        const r = g.toLowerCase(), h = o.language?.toLowerCase(), s = o.altLanguage?.toLowerCase();
        if (h === r || s === r)
          return !0;
        const [f] = r.split("-");
        return h && h.startsWith(f) || s && s.startsWith(f);
      }));
    }
    if (n.source && (t = t.filter((i) => i.source === n.source)), n.gender && (t = t.filter((i) => i.gender === n.gender)), n.quality) {
      const i = Array.isArray(n.quality) ? n.quality : [n.quality];
      t = t.filter((o) => o.quality && i.includes(o.quality));
    }
    return n.offlineOnly && (t = t.filter((i) => i.offlineAvailability === !0)), n.provider && (t = t.filter(
      (i) => i.provider?.toLowerCase() === n.provider?.toLowerCase()
    )), n.excludeNovelty && (t = ze(t)), n.excludeVeryLowQuality && (t = Be(t)), t;
  }
  /**
   * Filter out novelty voices
   * @param voices Array of voices to filter
   * @returns Filtered array with novelty voices removed
   */
  filterOutNoveltyVoices(a) {
    return ze(a);
  }
  /**
   * Filter out very low quality voices
   * @param voices Array of voices to filter
   * @returns Filtered array with very low quality voices removed
   */
  filterOutVeryLowQualityVoices(a) {
    return Be(a);
  }
  /**
   * Get the numeric value for a quality level
   * @private
   */
  getQualityValue(a) {
    return a ? {
      veryLow: 1,
      low: 2,
      normal: 3,
      high: 4,
      veryHigh: 5
    }[a] ?? 0 : 0;
  }
  /**
   * Sort voices by the specified criteria
   */
  sortVoices(a, n) {
    if (!a?.length) return [];
    const t = [...a];
    switch (n.by) {
      case "name":
        t.sort(
          (i, o) => n.order === "desc" ? o.name.localeCompare(i.name) : i.name.localeCompare(o.name)
        );
        break;
      case "language":
        t.sort((i, o) => {
          const [g, r] = A.extractLangRegionFromBCP47(i.language), [h, s] = A.extractLangRegionFromBCP47(o.language), f = A.getLanguageDisplayName(g).toLowerCase(), c = A.getLanguageDisplayName(h).toLowerCase();
          if (n.preferredLanguages?.length) {
            const d = n.preferredLanguages.findIndex((O) => {
              const [k, C] = A.extractLangRegionFromBCP47(O);
              return g === k.toLowerCase() && (!C || !r || C === r);
            }), S = n.preferredLanguages.findIndex((O) => {
              const [k, C] = A.extractLangRegionFromBCP47(O);
              return h === k.toLowerCase() && (!C || !s || C === s);
            });
            if (d !== -1 && S !== -1)
              return d === S && r && s ? n.order === "desc" ? s.localeCompare(r) : r.localeCompare(s) : n.order === "desc" ? S - d : d - S;
            if (d !== -1) return -1;
            if (S !== -1) return 1;
          }
          const u = f.localeCompare(c);
          return u === 0 && r && s ? n.order === "desc" ? s.localeCompare(r) : r.localeCompare(s) : n.order === "desc" ? -u : u;
        });
        break;
      case "gender":
        t.sort((i, o) => {
          const g = i.gender || "", r = o.gender || "";
          return n.order === "desc" ? r.localeCompare(g) : g.localeCompare(r);
        });
        break;
      case "quality":
        t.sort((i, o) => {
          const g = this.getQualityValue(i.quality), r = this.getQualityValue(o.quality);
          return n.order === "desc" ? r - g : g - r;
        });
        break;
      case "region":
        t.sort((i, o) => {
          const [g, r = ""] = A.extractLangRegionFromBCP47(i.language), [h, s = ""] = A.extractLangRegionFromBCP47(o.language);
          if (n.preferredLanguages?.length) {
            const c = n.preferredLanguages.findIndex((O) => {
              const [k, C] = A.extractLangRegionFromBCP47(O);
              return g === k.toLowerCase() && r === C?.toUpperCase();
            }), u = n.preferredLanguages.findIndex((O) => {
              const [k, C] = A.extractLangRegionFromBCP47(O);
              return h === k.toLowerCase() && s === C?.toUpperCase();
            });
            if (c !== -1 && u === -1) return -1;
            if (c === -1 && u !== -1) return 1;
            if (c !== -1 && u !== -1 && c !== u)
              return c - u;
            const d = n.preferredLanguages.findIndex((O) => {
              const [k] = A.extractLangRegionFromBCP47(O);
              return g === k.toLowerCase();
            }), S = n.preferredLanguages.findIndex((O) => {
              const [k] = A.extractLangRegionFromBCP47(O);
              return h === k.toLowerCase();
            });
            if (d !== -1 && S === -1) return -1;
            if (d === -1 && S !== -1) return 1;
            if (d !== -1 && S !== -1 && d !== S)
              return d - S;
          }
          const f = n.order === "desc" ? s.localeCompare(r) : r.localeCompare(s);
          return f === 0 ? g.localeCompare(h) : f;
        });
        break;
    }
    return t;
  }
  /**
   * Group voices by the specified criteria
   * @param voices Array of voices to group
   * @param options Grouping options
   * @returns Object with voice groups keyed by the grouping criteria
   */
  groupVoices(a, n) {
    const t = {};
    for (const i of a) {
      let o = "Unknown";
      switch (n) {
        case "language":
          o = A.extractLangRegionFromBCP47(i.language)[0];
          break;
        case "gender":
          o = i.gender || "unknown";
          break;
        case "quality":
          o = i.quality || "unknown";
          break;
        case "region":
          const [, g] = A.extractLangRegionFromBCP47(i.language);
          o = g || "unknown";
          break;
      }
      t[o] || (t[o] = []), t[o].push(i);
    }
    return t;
  }
}
const Xo = ["webKit", "moz", "ms", "o"], el = [
  "boundary",
  "end",
  "error",
  "mark",
  "pause",
  "resume",
  "start"
], al = (e) => `${e.charAt(0).toUpperCase()}${e.slice(1)}`, Z = (e = {}, a) => Object.hasOwnProperty.call(e, a) || a in e || !!e[a], nl = (e) => typeof window < "u" && e in window, rl = (e) => {
  const a = al(e), n = Xo.map((i) => `${i}${a}`), t = [e, a].concat(n).find(nl);
  return t && typeof window < "u" ? window[t] : void 0;
}, tl = () => {
  const e = {};
  [
    "speechSynthesis",
    "speechSynthesisUtterance",
    "speechSynthesisVoice",
    "speechSynthesisEvent",
    "speechSynthesisErrorEvent"
  ].forEach((n) => {
    e[n] = rl(n);
  }), e.onvoiceschanged = Z(e.speechSynthesis, "onvoiceschanged"), e.speechSynthesisSpeaking = Z(e.speechSynthesis, "speaking"), e.speechSynthesisPaused = Z(e.speechSynthesis, "paused");
  const a = e.speechSynthesisUtterance ? Z(e.speechSynthesisUtterance, "prototype") : !1;
  return el.forEach((n) => {
    const t = `on${n}`;
    e[t] = a && e.speechSynthesisUtterance ? Z(e.speechSynthesisUtterance.prototype, t) : !1;
  }), e;
}, ol = () => {
  const a = typeof window < "u" && (window.navigator || {}).userAgent || "", n = () => /android/i.test(a), t = () => /kaios/i.test(a), i = () => typeof window.InstallTrigger < "u" ? !0 : /firefox/i.test(a), o = () => typeof window.GestureEvent < "u" || /safari/i.test(a);
  return {
    isAndroid: n(),
    isFirefox: i() || t(),
    isSafari: o(),
    isKaiOS: t()
  };
};
function ll(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var he, je;
function il() {
  if (je) return he;
  je = 1, he = a;
  function e(t) {
    return t instanceof Buffer ? Buffer.from(t) : new t.constructor(t.buffer.slice(), t.byteOffset, t.length);
  }
  function a(t) {
    if (t = t || {}, t.circles) return n(t);
    const i = /* @__PURE__ */ new Map();
    if (i.set(Date, (s) => new Date(s)), i.set(Map, (s, f) => new Map(g(Array.from(s), f))), i.set(Set, (s, f) => new Set(g(Array.from(s), f))), t.constructorHandlers)
      for (const s of t.constructorHandlers)
        i.set(s[0], s[1]);
    let o = null;
    return t.proto ? h : r;
    function g(s, f) {
      const c = Object.keys(s), u = new Array(c.length);
      for (let d = 0; d < c.length; d++) {
        const S = c[d], O = s[S];
        typeof O != "object" || O === null ? u[S] = O : O.constructor !== Object && (o = i.get(O.constructor)) ? u[S] = o(O, f) : ArrayBuffer.isView(O) ? u[S] = e(O) : u[S] = f(O);
      }
      return u;
    }
    function r(s) {
      if (typeof s != "object" || s === null) return s;
      if (Array.isArray(s)) return g(s, r);
      if (s.constructor !== Object && (o = i.get(s.constructor)))
        return o(s, r);
      const f = {};
      for (const c in s) {
        if (Object.hasOwnProperty.call(s, c) === !1) continue;
        const u = s[c];
        typeof u != "object" || u === null ? f[c] = u : u.constructor !== Object && (o = i.get(u.constructor)) ? f[c] = o(u, r) : ArrayBuffer.isView(u) ? f[c] = e(u) : f[c] = r(u);
      }
      return f;
    }
    function h(s) {
      if (typeof s != "object" || s === null) return s;
      if (Array.isArray(s)) return g(s, h);
      if (s.constructor !== Object && (o = i.get(s.constructor)))
        return o(s, h);
      const f = {};
      for (const c in s) {
        const u = s[c];
        typeof u != "object" || u === null ? f[c] = u : u.constructor !== Object && (o = i.get(u.constructor)) ? f[c] = o(u, h) : ArrayBuffer.isView(u) ? f[c] = e(u) : f[c] = h(u);
      }
      return f;
    }
  }
  function n(t) {
    const i = [], o = [], g = /* @__PURE__ */ new Map();
    if (g.set(Date, (c) => new Date(c)), g.set(Map, (c, u) => new Map(h(Array.from(c), u))), g.set(Set, (c, u) => new Set(h(Array.from(c), u))), t.constructorHandlers)
      for (const c of t.constructorHandlers)
        g.set(c[0], c[1]);
    let r = null;
    return t.proto ? f : s;
    function h(c, u) {
      const d = Object.keys(c), S = new Array(d.length);
      for (let O = 0; O < d.length; O++) {
        const k = d[O], C = c[k];
        if (typeof C != "object" || C === null)
          S[k] = C;
        else if (C.constructor !== Object && (r = g.get(C.constructor)))
          S[k] = r(C, u);
        else if (ArrayBuffer.isView(C))
          S[k] = e(C);
        else {
          const G = i.indexOf(C);
          G !== -1 ? S[k] = o[G] : S[k] = u(C);
        }
      }
      return S;
    }
    function s(c) {
      if (typeof c != "object" || c === null) return c;
      if (Array.isArray(c)) return h(c, s);
      if (c.constructor !== Object && (r = g.get(c.constructor)))
        return r(c, s);
      const u = {};
      i.push(c), o.push(u);
      for (const d in c) {
        if (Object.hasOwnProperty.call(c, d) === !1) continue;
        const S = c[d];
        if (typeof S != "object" || S === null)
          u[d] = S;
        else if (S.constructor !== Object && (r = g.get(S.constructor)))
          u[d] = r(S, s);
        else if (ArrayBuffer.isView(S))
          u[d] = e(S);
        else {
          const O = i.indexOf(S);
          O !== -1 ? u[d] = o[O] : u[d] = s(S);
        }
      }
      return i.pop(), o.pop(), u;
    }
    function f(c) {
      if (typeof c != "object" || c === null) return c;
      if (Array.isArray(c)) return h(c, f);
      if (c.constructor !== Object && (r = g.get(c.constructor)))
        return r(c, f);
      const u = {};
      i.push(c), o.push(u);
      for (const d in c) {
        const S = c[d];
        if (typeof S != "object" || S === null)
          u[d] = S;
        else if (S.constructor !== Object && (r = g.get(S.constructor)))
          u[d] = r(S, f);
        else if (ArrayBuffer.isView(S))
          u[d] = e(S);
        else {
          const O = i.indexOf(S);
          O !== -1 ? u[d] = o[O] : u[d] = f(S);
        }
      }
      return i.pop(), o.pop(), u;
    }
  }
  return he;
}
var sl = il();
const ga = /* @__PURE__ */ ll(sl);
ga();
function Ce(e) {
  if (e == null || typeof e != "object") return !1;
  let a = Object.getPrototypeOf(e);
  return a !== null && a !== Object.prototype && Object.getPrototypeOf(a) !== null ? !1 : !(Symbol.iterator in e) && !(Symbol.toStringTag in e);
}
function $(e) {
  return typeof e == "string";
}
function gl(e) {
  return Number.isFinite(e);
}
function B(e) {
  return Number.isSafeInteger(e) && e >= 0;
}
function D(e) {
  return e != null;
}
function dl(e, a) {
  return Ce(e) && $(a) && a in e;
}
var cl = typeof globalThis == "object" && globalThis && globalThis.Object === Object && globalThis, ul = typeof self == "object" && self && self.Object === Object && self, Re = cl || ul || Function("return this")(), V = Re.Symbol, da = Object.prototype, hl = da.hasOwnProperty, ml = da.toString, Q = V ? V.toStringTag : void 0;
function pl(e) {
  var a = hl.call(e, Q), n = e[Q];
  try {
    e[Q] = void 0;
    var t = !0;
  } catch {
  }
  var i = ml.call(e);
  return t && (a ? e[Q] = n : delete e[Q]), i;
}
var fl = Object.prototype, yl = fl.toString;
function Sl(e) {
  return yl.call(e);
}
var bl = "[object Null]", Ol = "[object Undefined]", Fe = V ? V.toStringTag : void 0;
function ca(e) {
  return e == null ? e === void 0 ? Ol : bl : Fe && Fe in Object(e) ? pl(e) : Sl(e);
}
function ua(e) {
  return e != null && typeof e == "object";
}
var vl = "[object Symbol]";
function wl(e) {
  return typeof e == "symbol" || ua(e) && ca(e) == vl;
}
function Nl(e, a) {
  for (var n = -1, t = e == null ? 0 : e.length, i = Array(t); ++n < t; )
    i[n] = a(e[n], n, e);
  return i;
}
var Al = Array.isArray, Ve = V ? V.prototype : void 0, Ke = Ve ? Ve.toString : void 0;
function Ee(e) {
  if (typeof e == "string")
    return e;
  if (Al(e))
    return Nl(e, Ee) + "";
  if (wl(e))
    return Ke ? Ke.call(e) : "";
  var a = e + "";
  return a == "0" && 1 / e == -1 / 0 ? "-0" : a;
}
var Cl = /\s/;
function kl(e) {
  for (var a = e.length; a-- && Cl.test(e.charAt(a)); )
    ;
  return a;
}
var ql = /^\s+/;
function xl(e) {
  return e && e.slice(0, kl(e) + 1).replace(ql, "");
}
function ha(e) {
  var a = typeof e;
  return e != null && (a == "object" || a == "function");
}
function ma(e) {
  return e;
}
var Rl = "[object AsyncFunction]", El = "[object Function]", Gl = "[object GeneratorFunction]", Il = "[object Proxy]";
function pa(e) {
  if (!ha(e))
    return !1;
  var a = ca(e);
  return a == El || a == Gl || a == Rl || a == Il;
}
var me = Re["__core-js_shared__"], We = (function() {
  var e = /[^.]+$/.exec(me && me.keys && me.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
})();
function Tl(e) {
  return !!We && We in e;
}
var Ml = Function.prototype, Hl = Ml.toString;
function Dl(e) {
  if (e != null) {
    try {
      return Hl.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var Pl = /[\\^$.*+?()[\]{}|]/g, Ll = /^\[object .+?Constructor\]$/, Ul = Function.prototype, zl = Object.prototype, Bl = Ul.toString, $l = zl.hasOwnProperty, jl = RegExp(
  "^" + Bl.call($l).replace(Pl, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Fl(e) {
  if (!ha(e) || Tl(e))
    return !1;
  var a = pa(e) ? jl : Ll;
  return a.test(Dl(e));
}
function Vl(e, a) {
  return e?.[a];
}
function Ge(e, a) {
  var n = Vl(e, a);
  return Fl(n) ? n : void 0;
}
function Kl(e, a, n) {
  switch (n.length) {
    case 0:
      return e.call(a);
    case 1:
      return e.call(a, n[0]);
    case 2:
      return e.call(a, n[0], n[1]);
    case 3:
      return e.call(a, n[0], n[1], n[2]);
  }
  return e.apply(a, n);
}
var Wl = 800, _l = 16, Jl = Date.now;
function Yl(e) {
  var a = 0, n = 0;
  return function() {
    var t = Jl(), i = _l - (t - n);
    if (n = t, i > 0) {
      if (++a >= Wl)
        return arguments[0];
    } else
      a = 0;
    return e.apply(void 0, arguments);
  };
}
function Zl(e) {
  return function() {
    return e;
  };
}
var _e = (function() {
  try {
    var e = Ge(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
})(), Ql = _e ? function(e, a) {
  return _e(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: Zl(a),
    writable: !0
  });
} : ma, Xl = Yl(Ql);
function ei(e, a, n, t) {
  for (var i = e.length, o = n + -1; ++o < i; )
    if (a(e[o], o, e))
      return o;
  return -1;
}
function ai(e) {
  return e !== e;
}
function ni(e, a, n) {
  for (var t = n - 1, i = e.length; ++t < i; )
    if (e[t] === a)
      return t;
  return -1;
}
function Ie(e, a, n) {
  return a === a ? ni(e, a, n) : ei(e, ai, n);
}
function ri(e, a) {
  var n = e == null ? 0 : e.length;
  return !!n && Ie(e, a, 0) > -1;
}
function ti(e, a) {
  return e === a || e !== e && a !== a;
}
var Je = Math.max;
function oi(e, a, n) {
  return a = Je(a === void 0 ? e.length - 1 : a, 0), function() {
    for (var t = arguments, i = -1, o = Je(t.length - a, 0), g = Array(o); ++i < o; )
      g[i] = t[a + i];
    i = -1;
    for (var r = Array(a + 1); ++i < a; )
      r[i] = t[i];
    return r[a] = n(g), Kl(e, this, r);
  };
}
function li(e, a) {
  return Xl(oi(e, a, ma), e + "");
}
var ii = 9007199254740991;
function si(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= ii;
}
function gi(e) {
  return e != null && si(e.length) && !pa(e);
}
var ee = Ge(Object, "create");
function di() {
  this.__data__ = ee ? ee(null) : {}, this.size = 0;
}
function ci(e) {
  var a = this.has(e) && delete this.__data__[e];
  return this.size -= a ? 1 : 0, a;
}
var ui = "__lodash_hash_undefined__", hi = Object.prototype, mi = hi.hasOwnProperty;
function pi(e) {
  var a = this.__data__;
  if (ee) {
    var n = a[e];
    return n === ui ? void 0 : n;
  }
  return mi.call(a, e) ? a[e] : void 0;
}
var fi = Object.prototype, yi = fi.hasOwnProperty;
function Si(e) {
  var a = this.__data__;
  return ee ? a[e] !== void 0 : yi.call(a, e);
}
var bi = "__lodash_hash_undefined__";
function Oi(e, a) {
  var n = this.__data__;
  return this.size += this.has(e) ? 0 : 1, n[e] = ee && a === void 0 ? bi : a, this;
}
function L(e) {
  var a = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++a < n; ) {
    var t = e[a];
    this.set(t[0], t[1]);
  }
}
L.prototype.clear = di;
L.prototype.delete = ci;
L.prototype.get = pi;
L.prototype.has = Si;
L.prototype.set = Oi;
function vi() {
  this.__data__ = [], this.size = 0;
}
function se(e, a) {
  for (var n = e.length; n--; )
    if (ti(e[n][0], a))
      return n;
  return -1;
}
var wi = Array.prototype, Ni = wi.splice;
function Ai(e) {
  var a = this.__data__, n = se(a, e);
  if (n < 0)
    return !1;
  var t = a.length - 1;
  return n == t ? a.pop() : Ni.call(a, n, 1), --this.size, !0;
}
function Ci(e) {
  var a = this.__data__, n = se(a, e);
  return n < 0 ? void 0 : a[n][1];
}
function ki(e) {
  return se(this.__data__, e) > -1;
}
function qi(e, a) {
  var n = this.__data__, t = se(n, e);
  return t < 0 ? (++this.size, n.push([e, a])) : n[t][1] = a, this;
}
function _(e) {
  var a = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++a < n; ) {
    var t = e[a];
    this.set(t[0], t[1]);
  }
}
_.prototype.clear = vi;
_.prototype.delete = Ai;
_.prototype.get = Ci;
_.prototype.has = ki;
_.prototype.set = qi;
var xi = Ge(Re, "Map");
function Ri() {
  this.size = 0, this.__data__ = {
    hash: new L(),
    map: new (xi || _)(),
    string: new L()
  };
}
function Ei(e) {
  var a = typeof e;
  return a == "string" || a == "number" || a == "symbol" || a == "boolean" ? e !== "__proto__" : e === null;
}
function ge(e, a) {
  var n = e.__data__;
  return Ei(a) ? n[typeof a == "string" ? "string" : "hash"] : n.map;
}
function Gi(e) {
  var a = ge(this, e).delete(e);
  return this.size -= a ? 1 : 0, a;
}
function Ii(e) {
  return ge(this, e).get(e);
}
function Ti(e) {
  return ge(this, e).has(e);
}
function Mi(e, a) {
  var n = ge(this, e), t = n.size;
  return n.set(e, a), this.size += n.size == t ? 0 : 1, this;
}
function J(e) {
  var a = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++a < n; ) {
    var t = e[a];
    this.set(t[0], t[1]);
  }
}
J.prototype.clear = Ri;
J.prototype.delete = Gi;
J.prototype.get = Ii;
J.prototype.has = Ti;
J.prototype.set = Mi;
function Hi(e) {
  return e == null ? "" : Ee(e);
}
function Di(e, a, n) {
  var t = -1, i = e.length;
  a < 0 && (a = -a > i ? 0 : i + a), n = n > i ? i : n, n < 0 && (n += i), i = a > n ? 0 : n - a >>> 0, a >>>= 0;
  for (var o = Array(i); ++t < i; )
    o[t] = e[t + a];
  return o;
}
function Pi(e, a, n) {
  var t = e.length;
  return n = n === void 0 ? t : n, !a && n >= t ? e : Di(e, a, n);
}
var Li = "\\ud800-\\udfff", Ui = "\\u0300-\\u036f", zi = "\\ufe20-\\ufe2f", Bi = "\\u20d0-\\u20ff", $i = Ui + zi + Bi, ji = "\\ufe0e\\ufe0f", Fi = "\\u200d", Vi = RegExp("[" + Fi + Li + $i + ji + "]");
function Ki(e) {
  return Vi.test(e);
}
function Wi(e) {
  return e.split("");
}
var fa = "\\ud800-\\udfff", _i = "\\u0300-\\u036f", Ji = "\\ufe20-\\ufe2f", Yi = "\\u20d0-\\u20ff", Zi = _i + Ji + Yi, Qi = "\\ufe0e\\ufe0f", Xi = "[" + fa + "]", ke = "[" + Zi + "]", qe = "\\ud83c[\\udffb-\\udfff]", es = "(?:" + ke + "|" + qe + ")", ya = "[^" + fa + "]", Sa = "(?:\\ud83c[\\udde6-\\uddff]){2}", ba = "[\\ud800-\\udbff][\\udc00-\\udfff]", as = "\\u200d", Oa = es + "?", va = "[" + Qi + "]?", ns = "(?:" + as + "(?:" + [ya, Sa, ba].join("|") + ")" + va + Oa + ")*", rs = va + Oa + ns, ts = "(?:" + [ya + ke + "?", ke, Sa, ba, Xi].join("|") + ")", os = RegExp(qe + "(?=" + qe + ")|" + ts + rs, "g");
function ls(e) {
  return e.match(os) || [];
}
function Ye(e) {
  return Ki(e) ? ls(e) : Wi(e);
}
var is = "__lodash_hash_undefined__";
function ss(e) {
  return this.__data__.set(e, is), this;
}
function gs(e) {
  return this.__data__.has(e);
}
function oe(e) {
  var a = -1, n = e == null ? 0 : e.length;
  for (this.__data__ = new J(); ++a < n; )
    this.add(e[a]);
}
oe.prototype.add = oe.prototype.push = ss;
oe.prototype.has = gs;
function ds(e, a) {
  return e.has(a);
}
function cs(e) {
  return ua(e) && gi(e);
}
var us = 200;
function hs(e, a, n, t) {
  var i = -1, o = ri, g = !0, r = e.length, h = [], s = a.length;
  if (!r)
    return h;
  a.length >= us && (o = ds, g = !1, a = new oe(a));
  e:
    for (; ++i < r; ) {
      var f = e[i], c = f;
      if (f = f !== 0 ? f : 0, g && c === c) {
        for (var u = s; u--; )
          if (a[u] === c)
            continue e;
        h.push(f);
      } else o(a, c, t) || h.push(f);
    }
  return h;
}
function ms(e, a) {
  for (var n = e.length; n-- && Ie(a, e[n], 0) > -1; )
    ;
  return n;
}
function ps(e, a) {
  for (var n = -1, t = e.length; ++n < t && Ie(a, e[n], 0) > -1; )
    ;
  return n;
}
function Ze(e, a, n) {
  if (e = Hi(e), e && a === void 0)
    return xl(e);
  if (!e || !(a = Ee(a)))
    return e;
  var t = Ye(e), i = Ye(a), o = ps(t, i), g = ms(t, i) + 1;
  return Pi(t, o, g).join("");
}
var fs = li(function(e, a) {
  return cs(e) ? hs(e, a) : [];
}), j = function() {
  return j = Object.assign || function(e) {
    for (var a, n = 1, t = arguments.length; n < t; n++) {
      a = arguments[n];
      for (var i in a) Object.prototype.hasOwnProperty.call(a, i) && (e[i] = a[i]);
    }
    return e;
  }, j.apply(this, arguments);
}, ys = "~", Ss = "~~";
function Te(e, a) {
  for (var n = {}, t = {}, i = e.split(Ss), o = !1, g = 0; i.length > g; g++) {
    for (var r = i[g].split(ys), h = 0; h < r.length; h += 2) {
      var s = r[h], f = r[h + 1], c = "&" + s + ";";
      n[c] = f, o && (n["&" + s] = f), t[f] = c;
    }
    o = !0;
  }
  return a ? { entities: j(j({}, n), a.entities), characters: j(j({}, t), a.characters) } : { entities: n, characters: t };
}
var pe = {
  xml: /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,
  html4: /&notin;|&(?:nbsp|iexcl|cent|pound|curren|yen|brvbar|sect|uml|copy|ordf|laquo|not|shy|reg|macr|deg|plusmn|sup2|sup3|acute|micro|para|middot|cedil|sup1|ordm|raquo|frac14|frac12|frac34|iquest|Agrave|Aacute|Acirc|Atilde|Auml|Aring|AElig|Ccedil|Egrave|Eacute|Ecirc|Euml|Igrave|Iacute|Icirc|Iuml|ETH|Ntilde|Ograve|Oacute|Ocirc|Otilde|Ouml|times|Oslash|Ugrave|Uacute|Ucirc|Uuml|Yacute|THORN|szlig|agrave|aacute|acirc|atilde|auml|aring|aelig|ccedil|egrave|eacute|ecirc|euml|igrave|iacute|icirc|iuml|eth|ntilde|ograve|oacute|ocirc|otilde|ouml|divide|oslash|ugrave|uacute|ucirc|uuml|yacute|thorn|yuml|quot|amp|lt|gt|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,
  html5: /&centerdot;|&copysr;|&divideontimes;|&gtcc;|&gtcir;|&gtdot;|&gtlPar;|&gtquest;|&gtrapprox;|&gtrarr;|&gtrdot;|&gtreqless;|&gtreqqless;|&gtrless;|&gtrsim;|&ltcc;|&ltcir;|&ltdot;|&lthree;|&ltimes;|&ltlarr;|&ltquest;|&ltrPar;|&ltri;|&ltrie;|&ltrif;|&notin;|&notinE;|&notindot;|&notinva;|&notinvb;|&notinvc;|&notni;|&notniva;|&notnivb;|&notnivc;|&parallel;|&timesb;|&timesbar;|&timesd;|&(?:AElig|AMP|Aacute|Acirc|Agrave|Aring|Atilde|Auml|COPY|Ccedil|ETH|Eacute|Ecirc|Egrave|Euml|GT|Iacute|Icirc|Igrave|Iuml|LT|Ntilde|Oacute|Ocirc|Ograve|Oslash|Otilde|Ouml|QUOT|REG|THORN|Uacute|Ucirc|Ugrave|Uuml|Yacute|aacute|acirc|acute|aelig|agrave|amp|aring|atilde|auml|brvbar|ccedil|cedil|cent|copy|curren|deg|divide|eacute|ecirc|egrave|eth|euml|frac12|frac14|frac34|gt|iacute|icirc|iexcl|igrave|iquest|iuml|laquo|lt|macr|micro|middot|nbsp|not|ntilde|oacute|ocirc|ograve|ordf|ordm|oslash|otilde|ouml|para|plusmn|pound|quot|raquo|reg|sect|shy|sup1|sup2|sup3|szlig|thorn|times|uacute|ucirc|ugrave|uml|uuml|yacute|yen|yuml|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g
}, K = {};
K.xml = Te(`lt~<~gt~>~quot~"~apos~'~amp~&`);
K.html4 = Te(`apos~'~OElig~Œ~oelig~œ~Scaron~Š~scaron~š~Yuml~Ÿ~circ~ˆ~tilde~˜~ensp~ ~emsp~ ~thinsp~ ~zwnj~‌~zwj~‍~lrm~‎~rlm~‏~ndash~–~mdash~—~lsquo~‘~rsquo~’~sbquo~‚~ldquo~“~rdquo~”~bdquo~„~dagger~†~Dagger~‡~permil~‰~lsaquo~‹~rsaquo~›~euro~€~fnof~ƒ~Alpha~Α~Beta~Β~Gamma~Γ~Delta~Δ~Epsilon~Ε~Zeta~Ζ~Eta~Η~Theta~Θ~Iota~Ι~Kappa~Κ~Lambda~Λ~Mu~Μ~Nu~Ν~Xi~Ξ~Omicron~Ο~Pi~Π~Rho~Ρ~Sigma~Σ~Tau~Τ~Upsilon~Υ~Phi~Φ~Chi~Χ~Psi~Ψ~Omega~Ω~alpha~α~beta~β~gamma~γ~delta~δ~epsilon~ε~zeta~ζ~eta~η~theta~θ~iota~ι~kappa~κ~lambda~λ~mu~μ~nu~ν~xi~ξ~omicron~ο~pi~π~rho~ρ~sigmaf~ς~sigma~σ~tau~τ~upsilon~υ~phi~φ~chi~χ~psi~ψ~omega~ω~thetasym~ϑ~upsih~ϒ~piv~ϖ~bull~•~hellip~…~prime~′~Prime~″~oline~‾~frasl~⁄~weierp~℘~image~ℑ~real~ℜ~trade~™~alefsym~ℵ~larr~←~uarr~↑~rarr~→~darr~↓~harr~↔~crarr~↵~lArr~⇐~uArr~⇑~rArr~⇒~dArr~⇓~hArr~⇔~forall~∀~part~∂~exist~∃~empty~∅~nabla~∇~isin~∈~notin~∉~ni~∋~prod~∏~sum~∑~minus~−~lowast~∗~radic~√~prop~∝~infin~∞~ang~∠~and~∧~or~∨~cap~∩~cup~∪~int~∫~there4~∴~sim~∼~cong~≅~asymp~≈~ne~≠~equiv~≡~le~≤~ge~≥~sub~⊂~sup~⊃~nsub~⊄~sube~⊆~supe~⊇~oplus~⊕~otimes~⊗~perp~⊥~sdot~⋅~lceil~⌈~rceil~⌉~lfloor~⌊~rfloor~⌋~lang~〈~rang~〉~loz~◊~spades~♠~clubs~♣~hearts~♥~diams~♦~~nbsp~ ~iexcl~¡~cent~¢~pound~£~curren~¤~yen~¥~brvbar~¦~sect~§~uml~¨~copy~©~ordf~ª~laquo~«~not~¬~shy~­~reg~®~macr~¯~deg~°~plusmn~±~sup2~²~sup3~³~acute~´~micro~µ~para~¶~middot~·~cedil~¸~sup1~¹~ordm~º~raquo~»~frac14~¼~frac12~½~frac34~¾~iquest~¿~Agrave~À~Aacute~Á~Acirc~Â~Atilde~Ã~Auml~Ä~Aring~Å~AElig~Æ~Ccedil~Ç~Egrave~È~Eacute~É~Ecirc~Ê~Euml~Ë~Igrave~Ì~Iacute~Í~Icirc~Î~Iuml~Ï~ETH~Ð~Ntilde~Ñ~Ograve~Ò~Oacute~Ó~Ocirc~Ô~Otilde~Õ~Ouml~Ö~times~×~Oslash~Ø~Ugrave~Ù~Uacute~Ú~Ucirc~Û~Uuml~Ü~Yacute~Ý~THORN~Þ~szlig~ß~agrave~à~aacute~á~acirc~â~atilde~ã~auml~ä~aring~å~aelig~æ~ccedil~ç~egrave~è~eacute~é~ecirc~ê~euml~ë~igrave~ì~iacute~í~icirc~î~iuml~ï~eth~ð~ntilde~ñ~ograve~ò~oacute~ó~ocirc~ô~otilde~õ~ouml~ö~divide~÷~oslash~ø~ugrave~ù~uacute~ú~ucirc~û~uuml~ü~yacute~ý~thorn~þ~yuml~ÿ~quot~"~amp~&~lt~<~gt~>`);
K.html5 = Te('Abreve~Ă~Acy~А~Afr~𝔄~Amacr~Ā~And~⩓~Aogon~Ą~Aopf~𝔸~ApplyFunction~⁡~Ascr~𝒜~Assign~≔~Backslash~∖~Barv~⫧~Barwed~⌆~Bcy~Б~Because~∵~Bernoullis~ℬ~Bfr~𝔅~Bopf~𝔹~Breve~˘~Bscr~ℬ~Bumpeq~≎~CHcy~Ч~Cacute~Ć~Cap~⋒~CapitalDifferentialD~ⅅ~Cayleys~ℭ~Ccaron~Č~Ccirc~Ĉ~Cconint~∰~Cdot~Ċ~Cedilla~¸~CenterDot~·~Cfr~ℭ~CircleDot~⊙~CircleMinus~⊖~CirclePlus~⊕~CircleTimes~⊗~ClockwiseContourIntegral~∲~CloseCurlyDoubleQuote~”~CloseCurlyQuote~’~Colon~∷~Colone~⩴~Congruent~≡~Conint~∯~ContourIntegral~∮~Copf~ℂ~Coproduct~∐~CounterClockwiseContourIntegral~∳~Cross~⨯~Cscr~𝒞~Cup~⋓~CupCap~≍~DD~ⅅ~DDotrahd~⤑~DJcy~Ђ~DScy~Ѕ~DZcy~Џ~Darr~↡~Dashv~⫤~Dcaron~Ď~Dcy~Д~Del~∇~Dfr~𝔇~DiacriticalAcute~´~DiacriticalDot~˙~DiacriticalDoubleAcute~˝~DiacriticalGrave~`~DiacriticalTilde~˜~Diamond~⋄~DifferentialD~ⅆ~Dopf~𝔻~Dot~¨~DotDot~⃜~DotEqual~≐~DoubleContourIntegral~∯~DoubleDot~¨~DoubleDownArrow~⇓~DoubleLeftArrow~⇐~DoubleLeftRightArrow~⇔~DoubleLeftTee~⫤~DoubleLongLeftArrow~⟸~DoubleLongLeftRightArrow~⟺~DoubleLongRightArrow~⟹~DoubleRightArrow~⇒~DoubleRightTee~⊨~DoubleUpArrow~⇑~DoubleUpDownArrow~⇕~DoubleVerticalBar~∥~DownArrow~↓~DownArrowBar~⤓~DownArrowUpArrow~⇵~DownBreve~̑~DownLeftRightVector~⥐~DownLeftTeeVector~⥞~DownLeftVector~↽~DownLeftVectorBar~⥖~DownRightTeeVector~⥟~DownRightVector~⇁~DownRightVectorBar~⥗~DownTee~⊤~DownTeeArrow~↧~Downarrow~⇓~Dscr~𝒟~Dstrok~Đ~ENG~Ŋ~Ecaron~Ě~Ecy~Э~Edot~Ė~Efr~𝔈~Element~∈~Emacr~Ē~EmptySmallSquare~◻~EmptyVerySmallSquare~▫~Eogon~Ę~Eopf~𝔼~Equal~⩵~EqualTilde~≂~Equilibrium~⇌~Escr~ℰ~Esim~⩳~Exists~∃~ExponentialE~ⅇ~Fcy~Ф~Ffr~𝔉~FilledSmallSquare~◼~FilledVerySmallSquare~▪~Fopf~𝔽~ForAll~∀~Fouriertrf~ℱ~Fscr~ℱ~GJcy~Ѓ~Gammad~Ϝ~Gbreve~Ğ~Gcedil~Ģ~Gcirc~Ĝ~Gcy~Г~Gdot~Ġ~Gfr~𝔊~Gg~⋙~Gopf~𝔾~GreaterEqual~≥~GreaterEqualLess~⋛~GreaterFullEqual~≧~GreaterGreater~⪢~GreaterLess~≷~GreaterSlantEqual~⩾~GreaterTilde~≳~Gscr~𝒢~Gt~≫~HARDcy~Ъ~Hacek~ˇ~Hat~^~Hcirc~Ĥ~Hfr~ℌ~HilbertSpace~ℋ~Hopf~ℍ~HorizontalLine~─~Hscr~ℋ~Hstrok~Ħ~HumpDownHump~≎~HumpEqual~≏~IEcy~Е~IJlig~Ĳ~IOcy~Ё~Icy~И~Idot~İ~Ifr~ℑ~Im~ℑ~Imacr~Ī~ImaginaryI~ⅈ~Implies~⇒~Int~∬~Integral~∫~Intersection~⋂~InvisibleComma~⁣~InvisibleTimes~⁢~Iogon~Į~Iopf~𝕀~Iscr~ℐ~Itilde~Ĩ~Iukcy~І~Jcirc~Ĵ~Jcy~Й~Jfr~𝔍~Jopf~𝕁~Jscr~𝒥~Jsercy~Ј~Jukcy~Є~KHcy~Х~KJcy~Ќ~Kcedil~Ķ~Kcy~К~Kfr~𝔎~Kopf~𝕂~Kscr~𝒦~LJcy~Љ~Lacute~Ĺ~Lang~⟪~Laplacetrf~ℒ~Larr~↞~Lcaron~Ľ~Lcedil~Ļ~Lcy~Л~LeftAngleBracket~⟨~LeftArrow~←~LeftArrowBar~⇤~LeftArrowRightArrow~⇆~LeftCeiling~⌈~LeftDoubleBracket~⟦~LeftDownTeeVector~⥡~LeftDownVector~⇃~LeftDownVectorBar~⥙~LeftFloor~⌊~LeftRightArrow~↔~LeftRightVector~⥎~LeftTee~⊣~LeftTeeArrow~↤~LeftTeeVector~⥚~LeftTriangle~⊲~LeftTriangleBar~⧏~LeftTriangleEqual~⊴~LeftUpDownVector~⥑~LeftUpTeeVector~⥠~LeftUpVector~↿~LeftUpVectorBar~⥘~LeftVector~↼~LeftVectorBar~⥒~Leftarrow~⇐~Leftrightarrow~⇔~LessEqualGreater~⋚~LessFullEqual~≦~LessGreater~≶~LessLess~⪡~LessSlantEqual~⩽~LessTilde~≲~Lfr~𝔏~Ll~⋘~Lleftarrow~⇚~Lmidot~Ŀ~LongLeftArrow~⟵~LongLeftRightArrow~⟷~LongRightArrow~⟶~Longleftarrow~⟸~Longleftrightarrow~⟺~Longrightarrow~⟹~Lopf~𝕃~LowerLeftArrow~↙~LowerRightArrow~↘~Lscr~ℒ~Lsh~↰~Lstrok~Ł~Lt~≪~Map~⤅~Mcy~М~MediumSpace~ ~Mellintrf~ℳ~Mfr~𝔐~MinusPlus~∓~Mopf~𝕄~Mscr~ℳ~NJcy~Њ~Nacute~Ń~Ncaron~Ň~Ncedil~Ņ~Ncy~Н~NegativeMediumSpace~​~NegativeThickSpace~​~NegativeThinSpace~​~NegativeVeryThinSpace~​~NestedGreaterGreater~≫~NestedLessLess~≪~NewLine~\n~Nfr~𝔑~NoBreak~⁠~NonBreakingSpace~ ~Nopf~ℕ~Not~⫬~NotCongruent~≢~NotCupCap~≭~NotDoubleVerticalBar~∦~NotElement~∉~NotEqual~≠~NotEqualTilde~≂̸~NotExists~∄~NotGreater~≯~NotGreaterEqual~≱~NotGreaterFullEqual~≧̸~NotGreaterGreater~≫̸~NotGreaterLess~≹~NotGreaterSlantEqual~⩾̸~NotGreaterTilde~≵~NotHumpDownHump~≎̸~NotHumpEqual~≏̸~NotLeftTriangle~⋪~NotLeftTriangleBar~⧏̸~NotLeftTriangleEqual~⋬~NotLess~≮~NotLessEqual~≰~NotLessGreater~≸~NotLessLess~≪̸~NotLessSlantEqual~⩽̸~NotLessTilde~≴~NotNestedGreaterGreater~⪢̸~NotNestedLessLess~⪡̸~NotPrecedes~⊀~NotPrecedesEqual~⪯̸~NotPrecedesSlantEqual~⋠~NotReverseElement~∌~NotRightTriangle~⋫~NotRightTriangleBar~⧐̸~NotRightTriangleEqual~⋭~NotSquareSubset~⊏̸~NotSquareSubsetEqual~⋢~NotSquareSuperset~⊐̸~NotSquareSupersetEqual~⋣~NotSubset~⊂⃒~NotSubsetEqual~⊈~NotSucceeds~⊁~NotSucceedsEqual~⪰̸~NotSucceedsSlantEqual~⋡~NotSucceedsTilde~≿̸~NotSuperset~⊃⃒~NotSupersetEqual~⊉~NotTilde~≁~NotTildeEqual~≄~NotTildeFullEqual~≇~NotTildeTilde~≉~NotVerticalBar~∤~Nscr~𝒩~Ocy~О~Odblac~Ő~Ofr~𝔒~Omacr~Ō~Oopf~𝕆~OpenCurlyDoubleQuote~“~OpenCurlyQuote~‘~Or~⩔~Oscr~𝒪~Otimes~⨷~OverBar~‾~OverBrace~⏞~OverBracket~⎴~OverParenthesis~⏜~PartialD~∂~Pcy~П~Pfr~𝔓~PlusMinus~±~Poincareplane~ℌ~Popf~ℙ~Pr~⪻~Precedes~≺~PrecedesEqual~⪯~PrecedesSlantEqual~≼~PrecedesTilde~≾~Product~∏~Proportion~∷~Proportional~∝~Pscr~𝒫~Qfr~𝔔~Qopf~ℚ~Qscr~𝒬~RBarr~⤐~Racute~Ŕ~Rang~⟫~Rarr~↠~Rarrtl~⤖~Rcaron~Ř~Rcedil~Ŗ~Rcy~Р~Re~ℜ~ReverseElement~∋~ReverseEquilibrium~⇋~ReverseUpEquilibrium~⥯~Rfr~ℜ~RightAngleBracket~⟩~RightArrow~→~RightArrowBar~⇥~RightArrowLeftArrow~⇄~RightCeiling~⌉~RightDoubleBracket~⟧~RightDownTeeVector~⥝~RightDownVector~⇂~RightDownVectorBar~⥕~RightFloor~⌋~RightTee~⊢~RightTeeArrow~↦~RightTeeVector~⥛~RightTriangle~⊳~RightTriangleBar~⧐~RightTriangleEqual~⊵~RightUpDownVector~⥏~RightUpTeeVector~⥜~RightUpVector~↾~RightUpVectorBar~⥔~RightVector~⇀~RightVectorBar~⥓~Rightarrow~⇒~Ropf~ℝ~RoundImplies~⥰~Rrightarrow~⇛~Rscr~ℛ~Rsh~↱~RuleDelayed~⧴~SHCHcy~Щ~SHcy~Ш~SOFTcy~Ь~Sacute~Ś~Sc~⪼~Scedil~Ş~Scirc~Ŝ~Scy~С~Sfr~𝔖~ShortDownArrow~↓~ShortLeftArrow~←~ShortRightArrow~→~ShortUpArrow~↑~SmallCircle~∘~Sopf~𝕊~Sqrt~√~Square~□~SquareIntersection~⊓~SquareSubset~⊏~SquareSubsetEqual~⊑~SquareSuperset~⊐~SquareSupersetEqual~⊒~SquareUnion~⊔~Sscr~𝒮~Star~⋆~Sub~⋐~Subset~⋐~SubsetEqual~⊆~Succeeds~≻~SucceedsEqual~⪰~SucceedsSlantEqual~≽~SucceedsTilde~≿~SuchThat~∋~Sum~∑~Sup~⋑~Superset~⊃~SupersetEqual~⊇~Supset~⋑~TRADE~™~TSHcy~Ћ~TScy~Ц~Tab~	~Tcaron~Ť~Tcedil~Ţ~Tcy~Т~Tfr~𝔗~Therefore~∴~ThickSpace~  ~ThinSpace~ ~Tilde~∼~TildeEqual~≃~TildeFullEqual~≅~TildeTilde~≈~Topf~𝕋~TripleDot~⃛~Tscr~𝒯~Tstrok~Ŧ~Uarr~↟~Uarrocir~⥉~Ubrcy~Ў~Ubreve~Ŭ~Ucy~У~Udblac~Ű~Ufr~𝔘~Umacr~Ū~UnderBar~_~UnderBrace~⏟~UnderBracket~⎵~UnderParenthesis~⏝~Union~⋃~UnionPlus~⊎~Uogon~Ų~Uopf~𝕌~UpArrow~↑~UpArrowBar~⤒~UpArrowDownArrow~⇅~UpDownArrow~↕~UpEquilibrium~⥮~UpTee~⊥~UpTeeArrow~↥~Uparrow~⇑~Updownarrow~⇕~UpperLeftArrow~↖~UpperRightArrow~↗~Upsi~ϒ~Uring~Ů~Uscr~𝒰~Utilde~Ũ~VDash~⊫~Vbar~⫫~Vcy~В~Vdash~⊩~Vdashl~⫦~Vee~⋁~Verbar~‖~Vert~‖~VerticalBar~∣~VerticalLine~|~VerticalSeparator~❘~VerticalTilde~≀~VeryThinSpace~ ~Vfr~𝔙~Vopf~𝕍~Vscr~𝒱~Vvdash~⊪~Wcirc~Ŵ~Wedge~⋀~Wfr~𝔚~Wopf~𝕎~Wscr~𝒲~Xfr~𝔛~Xopf~𝕏~Xscr~𝒳~YAcy~Я~YIcy~Ї~YUcy~Ю~Ycirc~Ŷ~Ycy~Ы~Yfr~𝔜~Yopf~𝕐~Yscr~𝒴~ZHcy~Ж~Zacute~Ź~Zcaron~Ž~Zcy~З~Zdot~Ż~ZeroWidthSpace~​~Zfr~ℨ~Zopf~ℤ~Zscr~𝒵~abreve~ă~ac~∾~acE~∾̳~acd~∿~acy~а~af~⁡~afr~𝔞~aleph~ℵ~amacr~ā~amalg~⨿~andand~⩕~andd~⩜~andslope~⩘~andv~⩚~ange~⦤~angle~∠~angmsd~∡~angmsdaa~⦨~angmsdab~⦩~angmsdac~⦪~angmsdad~⦫~angmsdae~⦬~angmsdaf~⦭~angmsdag~⦮~angmsdah~⦯~angrt~∟~angrtvb~⊾~angrtvbd~⦝~angsph~∢~angst~Å~angzarr~⍼~aogon~ą~aopf~𝕒~ap~≈~apE~⩰~apacir~⩯~ape~≊~apid~≋~approx~≈~approxeq~≊~ascr~𝒶~ast~*~asympeq~≍~awconint~∳~awint~⨑~bNot~⫭~backcong~≌~backepsilon~϶~backprime~‵~backsim~∽~backsimeq~⋍~barvee~⊽~barwed~⌅~barwedge~⌅~bbrk~⎵~bbrktbrk~⎶~bcong~≌~bcy~б~becaus~∵~because~∵~bemptyv~⦰~bepsi~϶~bernou~ℬ~beth~ℶ~between~≬~bfr~𝔟~bigcap~⋂~bigcirc~◯~bigcup~⋃~bigodot~⨀~bigoplus~⨁~bigotimes~⨂~bigsqcup~⨆~bigstar~★~bigtriangledown~▽~bigtriangleup~△~biguplus~⨄~bigvee~⋁~bigwedge~⋀~bkarow~⤍~blacklozenge~⧫~blacksquare~▪~blacktriangle~▴~blacktriangledown~▾~blacktriangleleft~◂~blacktriangleright~▸~blank~␣~blk12~▒~blk14~░~blk34~▓~block~█~bne~=⃥~bnequiv~≡⃥~bnot~⌐~bopf~𝕓~bot~⊥~bottom~⊥~bowtie~⋈~boxDL~╗~boxDR~╔~boxDl~╖~boxDr~╓~boxH~═~boxHD~╦~boxHU~╩~boxHd~╤~boxHu~╧~boxUL~╝~boxUR~╚~boxUl~╜~boxUr~╙~boxV~║~boxVH~╬~boxVL~╣~boxVR~╠~boxVh~╫~boxVl~╢~boxVr~╟~boxbox~⧉~boxdL~╕~boxdR~╒~boxdl~┐~boxdr~┌~boxh~─~boxhD~╥~boxhU~╨~boxhd~┬~boxhu~┴~boxminus~⊟~boxplus~⊞~boxtimes~⊠~boxuL~╛~boxuR~╘~boxul~┘~boxur~└~boxv~│~boxvH~╪~boxvL~╡~boxvR~╞~boxvh~┼~boxvl~┤~boxvr~├~bprime~‵~breve~˘~bscr~𝒷~bsemi~⁏~bsim~∽~bsime~⋍~bsol~\\~bsolb~⧅~bsolhsub~⟈~bullet~•~bump~≎~bumpE~⪮~bumpe~≏~bumpeq~≏~cacute~ć~capand~⩄~capbrcup~⩉~capcap~⩋~capcup~⩇~capdot~⩀~caps~∩︀~caret~⁁~caron~ˇ~ccaps~⩍~ccaron~č~ccirc~ĉ~ccups~⩌~ccupssm~⩐~cdot~ċ~cemptyv~⦲~centerdot~·~cfr~𝔠~chcy~ч~check~✓~checkmark~✓~cir~○~cirE~⧃~circeq~≗~circlearrowleft~↺~circlearrowright~↻~circledR~®~circledS~Ⓢ~circledast~⊛~circledcirc~⊚~circleddash~⊝~cire~≗~cirfnint~⨐~cirmid~⫯~cirscir~⧂~clubsuit~♣~colon~:~colone~≔~coloneq~≔~comma~,~commat~@~comp~∁~compfn~∘~complement~∁~complexes~ℂ~congdot~⩭~conint~∮~copf~𝕔~coprod~∐~copysr~℗~cross~✗~cscr~𝒸~csub~⫏~csube~⫑~csup~⫐~csupe~⫒~ctdot~⋯~cudarrl~⤸~cudarrr~⤵~cuepr~⋞~cuesc~⋟~cularr~↶~cularrp~⤽~cupbrcap~⩈~cupcap~⩆~cupcup~⩊~cupdot~⊍~cupor~⩅~cups~∪︀~curarr~↷~curarrm~⤼~curlyeqprec~⋞~curlyeqsucc~⋟~curlyvee~⋎~curlywedge~⋏~curvearrowleft~↶~curvearrowright~↷~cuvee~⋎~cuwed~⋏~cwconint~∲~cwint~∱~cylcty~⌭~dHar~⥥~daleth~ℸ~dash~‐~dashv~⊣~dbkarow~⤏~dblac~˝~dcaron~ď~dcy~д~dd~ⅆ~ddagger~‡~ddarr~⇊~ddotseq~⩷~demptyv~⦱~dfisht~⥿~dfr~𝔡~dharl~⇃~dharr~⇂~diam~⋄~diamond~⋄~diamondsuit~♦~die~¨~digamma~ϝ~disin~⋲~div~÷~divideontimes~⋇~divonx~⋇~djcy~ђ~dlcorn~⌞~dlcrop~⌍~dollar~$~dopf~𝕕~dot~˙~doteq~≐~doteqdot~≑~dotminus~∸~dotplus~∔~dotsquare~⊡~doublebarwedge~⌆~downarrow~↓~downdownarrows~⇊~downharpoonleft~⇃~downharpoonright~⇂~drbkarow~⤐~drcorn~⌟~drcrop~⌌~dscr~𝒹~dscy~ѕ~dsol~⧶~dstrok~đ~dtdot~⋱~dtri~▿~dtrif~▾~duarr~⇵~duhar~⥯~dwangle~⦦~dzcy~џ~dzigrarr~⟿~eDDot~⩷~eDot~≑~easter~⩮~ecaron~ě~ecir~≖~ecolon~≕~ecy~э~edot~ė~ee~ⅇ~efDot~≒~efr~𝔢~eg~⪚~egs~⪖~egsdot~⪘~el~⪙~elinters~⏧~ell~ℓ~els~⪕~elsdot~⪗~emacr~ē~emptyset~∅~emptyv~∅~emsp13~ ~emsp14~ ~eng~ŋ~eogon~ę~eopf~𝕖~epar~⋕~eparsl~⧣~eplus~⩱~epsi~ε~epsiv~ϵ~eqcirc~≖~eqcolon~≕~eqsim~≂~eqslantgtr~⪖~eqslantless~⪕~equals~=~equest~≟~equivDD~⩸~eqvparsl~⧥~erDot~≓~erarr~⥱~escr~ℯ~esdot~≐~esim~≂~excl~!~expectation~ℰ~exponentiale~ⅇ~fallingdotseq~≒~fcy~ф~female~♀~ffilig~ﬃ~fflig~ﬀ~ffllig~ﬄ~ffr~𝔣~filig~ﬁ~fjlig~fj~flat~♭~fllig~ﬂ~fltns~▱~fopf~𝕗~fork~⋔~forkv~⫙~fpartint~⨍~frac13~⅓~frac15~⅕~frac16~⅙~frac18~⅛~frac23~⅔~frac25~⅖~frac35~⅗~frac38~⅜~frac45~⅘~frac56~⅚~frac58~⅝~frac78~⅞~frown~⌢~fscr~𝒻~gE~≧~gEl~⪌~gacute~ǵ~gammad~ϝ~gap~⪆~gbreve~ğ~gcirc~ĝ~gcy~г~gdot~ġ~gel~⋛~geq~≥~geqq~≧~geqslant~⩾~ges~⩾~gescc~⪩~gesdot~⪀~gesdoto~⪂~gesdotol~⪄~gesl~⋛︀~gesles~⪔~gfr~𝔤~gg~≫~ggg~⋙~gimel~ℷ~gjcy~ѓ~gl~≷~glE~⪒~gla~⪥~glj~⪤~gnE~≩~gnap~⪊~gnapprox~⪊~gne~⪈~gneq~⪈~gneqq~≩~gnsim~⋧~gopf~𝕘~grave~`~gscr~ℊ~gsim~≳~gsime~⪎~gsiml~⪐~gtcc~⪧~gtcir~⩺~gtdot~⋗~gtlPar~⦕~gtquest~⩼~gtrapprox~⪆~gtrarr~⥸~gtrdot~⋗~gtreqless~⋛~gtreqqless~⪌~gtrless~≷~gtrsim~≳~gvertneqq~≩︀~gvnE~≩︀~hairsp~ ~half~½~hamilt~ℋ~hardcy~ъ~harrcir~⥈~harrw~↭~hbar~ℏ~hcirc~ĥ~heartsuit~♥~hercon~⊹~hfr~𝔥~hksearow~⤥~hkswarow~⤦~hoarr~⇿~homtht~∻~hookleftarrow~↩~hookrightarrow~↪~hopf~𝕙~horbar~―~hscr~𝒽~hslash~ℏ~hstrok~ħ~hybull~⁃~hyphen~‐~ic~⁣~icy~и~iecy~е~iff~⇔~ifr~𝔦~ii~ⅈ~iiiint~⨌~iiint~∭~iinfin~⧜~iiota~℩~ijlig~ĳ~imacr~ī~imagline~ℐ~imagpart~ℑ~imath~ı~imof~⊷~imped~Ƶ~in~∈~incare~℅~infintie~⧝~inodot~ı~intcal~⊺~integers~ℤ~intercal~⊺~intlarhk~⨗~intprod~⨼~iocy~ё~iogon~į~iopf~𝕚~iprod~⨼~iscr~𝒾~isinE~⋹~isindot~⋵~isins~⋴~isinsv~⋳~isinv~∈~it~⁢~itilde~ĩ~iukcy~і~jcirc~ĵ~jcy~й~jfr~𝔧~jmath~ȷ~jopf~𝕛~jscr~𝒿~jsercy~ј~jukcy~є~kappav~ϰ~kcedil~ķ~kcy~к~kfr~𝔨~kgreen~ĸ~khcy~х~kjcy~ќ~kopf~𝕜~kscr~𝓀~lAarr~⇚~lAtail~⤛~lBarr~⤎~lE~≦~lEg~⪋~lHar~⥢~lacute~ĺ~laemptyv~⦴~lagran~ℒ~langd~⦑~langle~⟨~lap~⪅~larrb~⇤~larrbfs~⤟~larrfs~⤝~larrhk~↩~larrlp~↫~larrpl~⤹~larrsim~⥳~larrtl~↢~lat~⪫~latail~⤙~late~⪭~lates~⪭︀~lbarr~⤌~lbbrk~❲~lbrace~{~lbrack~[~lbrke~⦋~lbrksld~⦏~lbrkslu~⦍~lcaron~ľ~lcedil~ļ~lcub~{~lcy~л~ldca~⤶~ldquor~„~ldrdhar~⥧~ldrushar~⥋~ldsh~↲~leftarrow~←~leftarrowtail~↢~leftharpoondown~↽~leftharpoonup~↼~leftleftarrows~⇇~leftrightarrow~↔~leftrightarrows~⇆~leftrightharpoons~⇋~leftrightsquigarrow~↭~leftthreetimes~⋋~leg~⋚~leq~≤~leqq~≦~leqslant~⩽~les~⩽~lescc~⪨~lesdot~⩿~lesdoto~⪁~lesdotor~⪃~lesg~⋚︀~lesges~⪓~lessapprox~⪅~lessdot~⋖~lesseqgtr~⋚~lesseqqgtr~⪋~lessgtr~≶~lesssim~≲~lfisht~⥼~lfr~𝔩~lg~≶~lgE~⪑~lhard~↽~lharu~↼~lharul~⥪~lhblk~▄~ljcy~љ~ll~≪~llarr~⇇~llcorner~⌞~llhard~⥫~lltri~◺~lmidot~ŀ~lmoust~⎰~lmoustache~⎰~lnE~≨~lnap~⪉~lnapprox~⪉~lne~⪇~lneq~⪇~lneqq~≨~lnsim~⋦~loang~⟬~loarr~⇽~lobrk~⟦~longleftarrow~⟵~longleftrightarrow~⟷~longmapsto~⟼~longrightarrow~⟶~looparrowleft~↫~looparrowright~↬~lopar~⦅~lopf~𝕝~loplus~⨭~lotimes~⨴~lowbar~_~lozenge~◊~lozf~⧫~lpar~(~lparlt~⦓~lrarr~⇆~lrcorner~⌟~lrhar~⇋~lrhard~⥭~lrtri~⊿~lscr~𝓁~lsh~↰~lsim~≲~lsime~⪍~lsimg~⪏~lsqb~[~lsquor~‚~lstrok~ł~ltcc~⪦~ltcir~⩹~ltdot~⋖~lthree~⋋~ltimes~⋉~ltlarr~⥶~ltquest~⩻~ltrPar~⦖~ltri~◃~ltrie~⊴~ltrif~◂~lurdshar~⥊~luruhar~⥦~lvertneqq~≨︀~lvnE~≨︀~mDDot~∺~male~♂~malt~✠~maltese~✠~map~↦~mapsto~↦~mapstodown~↧~mapstoleft~↤~mapstoup~↥~marker~▮~mcomma~⨩~mcy~м~measuredangle~∡~mfr~𝔪~mho~℧~mid~∣~midast~*~midcir~⫰~minusb~⊟~minusd~∸~minusdu~⨪~mlcp~⫛~mldr~…~mnplus~∓~models~⊧~mopf~𝕞~mp~∓~mscr~𝓂~mstpos~∾~multimap~⊸~mumap~⊸~nGg~⋙̸~nGt~≫⃒~nGtv~≫̸~nLeftarrow~⇍~nLeftrightarrow~⇎~nLl~⋘̸~nLt~≪⃒~nLtv~≪̸~nRightarrow~⇏~nVDash~⊯~nVdash~⊮~nacute~ń~nang~∠⃒~nap~≉~napE~⩰̸~napid~≋̸~napos~ŉ~napprox~≉~natur~♮~natural~♮~naturals~ℕ~nbump~≎̸~nbumpe~≏̸~ncap~⩃~ncaron~ň~ncedil~ņ~ncong~≇~ncongdot~⩭̸~ncup~⩂~ncy~н~neArr~⇗~nearhk~⤤~nearr~↗~nearrow~↗~nedot~≐̸~nequiv~≢~nesear~⤨~nesim~≂̸~nexist~∄~nexists~∄~nfr~𝔫~ngE~≧̸~nge~≱~ngeq~≱~ngeqq~≧̸~ngeqslant~⩾̸~nges~⩾̸~ngsim~≵~ngt~≯~ngtr~≯~nhArr~⇎~nharr~↮~nhpar~⫲~nis~⋼~nisd~⋺~niv~∋~njcy~њ~nlArr~⇍~nlE~≦̸~nlarr~↚~nldr~‥~nle~≰~nleftarrow~↚~nleftrightarrow~↮~nleq~≰~nleqq~≦̸~nleqslant~⩽̸~nles~⩽̸~nless~≮~nlsim~≴~nlt~≮~nltri~⋪~nltrie~⋬~nmid~∤~nopf~𝕟~notinE~⋹̸~notindot~⋵̸~notinva~∉~notinvb~⋷~notinvc~⋶~notni~∌~notniva~∌~notnivb~⋾~notnivc~⋽~npar~∦~nparallel~∦~nparsl~⫽⃥~npart~∂̸~npolint~⨔~npr~⊀~nprcue~⋠~npre~⪯̸~nprec~⊀~npreceq~⪯̸~nrArr~⇏~nrarr~↛~nrarrc~⤳̸~nrarrw~↝̸~nrightarrow~↛~nrtri~⋫~nrtrie~⋭~nsc~⊁~nsccue~⋡~nsce~⪰̸~nscr~𝓃~nshortmid~∤~nshortparallel~∦~nsim~≁~nsime~≄~nsimeq~≄~nsmid~∤~nspar~∦~nsqsube~⋢~nsqsupe~⋣~nsubE~⫅̸~nsube~⊈~nsubset~⊂⃒~nsubseteq~⊈~nsubseteqq~⫅̸~nsucc~⊁~nsucceq~⪰̸~nsup~⊅~nsupE~⫆̸~nsupe~⊉~nsupset~⊃⃒~nsupseteq~⊉~nsupseteqq~⫆̸~ntgl~≹~ntlg~≸~ntriangleleft~⋪~ntrianglelefteq~⋬~ntriangleright~⋫~ntrianglerighteq~⋭~num~#~numero~№~numsp~ ~nvDash~⊭~nvHarr~⤄~nvap~≍⃒~nvdash~⊬~nvge~≥⃒~nvgt~>⃒~nvinfin~⧞~nvlArr~⤂~nvle~≤⃒~nvlt~<⃒~nvltrie~⊴⃒~nvrArr~⤃~nvrtrie~⊵⃒~nvsim~∼⃒~nwArr~⇖~nwarhk~⤣~nwarr~↖~nwarrow~↖~nwnear~⤧~oS~Ⓢ~oast~⊛~ocir~⊚~ocy~о~odash~⊝~odblac~ő~odiv~⨸~odot~⊙~odsold~⦼~ofcir~⦿~ofr~𝔬~ogon~˛~ogt~⧁~ohbar~⦵~ohm~Ω~oint~∮~olarr~↺~olcir~⦾~olcross~⦻~olt~⧀~omacr~ō~omid~⦶~ominus~⊖~oopf~𝕠~opar~⦷~operp~⦹~orarr~↻~ord~⩝~order~ℴ~orderof~ℴ~origof~⊶~oror~⩖~orslope~⩗~orv~⩛~oscr~ℴ~osol~⊘~otimesas~⨶~ovbar~⌽~par~∥~parallel~∥~parsim~⫳~parsl~⫽~pcy~п~percnt~%~period~.~pertenk~‱~pfr~𝔭~phiv~ϕ~phmmat~ℳ~phone~☎~pitchfork~⋔~planck~ℏ~planckh~ℎ~plankv~ℏ~plus~+~plusacir~⨣~plusb~⊞~pluscir~⨢~plusdo~∔~plusdu~⨥~pluse~⩲~plussim~⨦~plustwo~⨧~pm~±~pointint~⨕~popf~𝕡~pr~≺~prE~⪳~prap~⪷~prcue~≼~pre~⪯~prec~≺~precapprox~⪷~preccurlyeq~≼~preceq~⪯~precnapprox~⪹~precneqq~⪵~precnsim~⋨~precsim~≾~primes~ℙ~prnE~⪵~prnap~⪹~prnsim~⋨~profalar~⌮~profline~⌒~profsurf~⌓~propto~∝~prsim~≾~prurel~⊰~pscr~𝓅~puncsp~ ~qfr~𝔮~qint~⨌~qopf~𝕢~qprime~⁗~qscr~𝓆~quaternions~ℍ~quatint~⨖~quest~?~questeq~≟~rAarr~⇛~rAtail~⤜~rBarr~⤏~rHar~⥤~race~∽̱~racute~ŕ~raemptyv~⦳~rangd~⦒~range~⦥~rangle~⟩~rarrap~⥵~rarrb~⇥~rarrbfs~⤠~rarrc~⤳~rarrfs~⤞~rarrhk~↪~rarrlp~↬~rarrpl~⥅~rarrsim~⥴~rarrtl~↣~rarrw~↝~ratail~⤚~ratio~∶~rationals~ℚ~rbarr~⤍~rbbrk~❳~rbrace~}~rbrack~]~rbrke~⦌~rbrksld~⦎~rbrkslu~⦐~rcaron~ř~rcedil~ŗ~rcub~}~rcy~р~rdca~⤷~rdldhar~⥩~rdquor~”~rdsh~↳~realine~ℛ~realpart~ℜ~reals~ℝ~rect~▭~rfisht~⥽~rfr~𝔯~rhard~⇁~rharu~⇀~rharul~⥬~rhov~ϱ~rightarrow~→~rightarrowtail~↣~rightharpoondown~⇁~rightharpoonup~⇀~rightleftarrows~⇄~rightleftharpoons~⇌~rightrightarrows~⇉~rightsquigarrow~↝~rightthreetimes~⋌~ring~˚~risingdotseq~≓~rlarr~⇄~rlhar~⇌~rmoust~⎱~rmoustache~⎱~rnmid~⫮~roang~⟭~roarr~⇾~robrk~⟧~ropar~⦆~ropf~𝕣~roplus~⨮~rotimes~⨵~rpar~)~rpargt~⦔~rppolint~⨒~rrarr~⇉~rscr~𝓇~rsh~↱~rsqb~]~rsquor~’~rthree~⋌~rtimes~⋊~rtri~▹~rtrie~⊵~rtrif~▸~rtriltri~⧎~ruluhar~⥨~rx~℞~sacute~ś~sc~≻~scE~⪴~scap~⪸~sccue~≽~sce~⪰~scedil~ş~scirc~ŝ~scnE~⪶~scnap~⪺~scnsim~⋩~scpolint~⨓~scsim~≿~scy~с~sdotb~⊡~sdote~⩦~seArr~⇘~searhk~⤥~searr~↘~searrow~↘~semi~;~seswar~⤩~setminus~∖~setmn~∖~sext~✶~sfr~𝔰~sfrown~⌢~sharp~♯~shchcy~щ~shcy~ш~shortmid~∣~shortparallel~∥~sigmav~ς~simdot~⩪~sime~≃~simeq~≃~simg~⪞~simgE~⪠~siml~⪝~simlE~⪟~simne~≆~simplus~⨤~simrarr~⥲~slarr~←~smallsetminus~∖~smashp~⨳~smeparsl~⧤~smid~∣~smile~⌣~smt~⪪~smte~⪬~smtes~⪬︀~softcy~ь~sol~/~solb~⧄~solbar~⌿~sopf~𝕤~spadesuit~♠~spar~∥~sqcap~⊓~sqcaps~⊓︀~sqcup~⊔~sqcups~⊔︀~sqsub~⊏~sqsube~⊑~sqsubset~⊏~sqsubseteq~⊑~sqsup~⊐~sqsupe~⊒~sqsupset~⊐~sqsupseteq~⊒~squ~□~square~□~squarf~▪~squf~▪~srarr~→~sscr~𝓈~ssetmn~∖~ssmile~⌣~sstarf~⋆~star~☆~starf~★~straightepsilon~ϵ~straightphi~ϕ~strns~¯~subE~⫅~subdot~⪽~subedot~⫃~submult~⫁~subnE~⫋~subne~⊊~subplus~⪿~subrarr~⥹~subset~⊂~subseteq~⊆~subseteqq~⫅~subsetneq~⊊~subsetneqq~⫋~subsim~⫇~subsub~⫕~subsup~⫓~succ~≻~succapprox~⪸~succcurlyeq~≽~succeq~⪰~succnapprox~⪺~succneqq~⪶~succnsim~⋩~succsim~≿~sung~♪~supE~⫆~supdot~⪾~supdsub~⫘~supedot~⫄~suphsol~⟉~suphsub~⫗~suplarr~⥻~supmult~⫂~supnE~⫌~supne~⊋~supplus~⫀~supset~⊃~supseteq~⊇~supseteqq~⫆~supsetneq~⊋~supsetneqq~⫌~supsim~⫈~supsub~⫔~supsup~⫖~swArr~⇙~swarhk~⤦~swarr~↙~swarrow~↙~swnwar~⤪~target~⌖~tbrk~⎴~tcaron~ť~tcedil~ţ~tcy~т~tdot~⃛~telrec~⌕~tfr~𝔱~therefore~∴~thetav~ϑ~thickapprox~≈~thicksim~∼~thkap~≈~thksim~∼~timesb~⊠~timesbar~⨱~timesd~⨰~tint~∭~toea~⤨~top~⊤~topbot~⌶~topcir~⫱~topf~𝕥~topfork~⫚~tosa~⤩~tprime~‴~triangle~▵~triangledown~▿~triangleleft~◃~trianglelefteq~⊴~triangleq~≜~triangleright~▹~trianglerighteq~⊵~tridot~◬~trie~≜~triminus~⨺~triplus~⨹~trisb~⧍~tritime~⨻~trpezium~⏢~tscr~𝓉~tscy~ц~tshcy~ћ~tstrok~ŧ~twixt~≬~twoheadleftarrow~↞~twoheadrightarrow~↠~uHar~⥣~ubrcy~ў~ubreve~ŭ~ucy~у~udarr~⇅~udblac~ű~udhar~⥮~ufisht~⥾~ufr~𝔲~uharl~↿~uharr~↾~uhblk~▀~ulcorn~⌜~ulcorner~⌜~ulcrop~⌏~ultri~◸~umacr~ū~uogon~ų~uopf~𝕦~uparrow~↑~updownarrow~↕~upharpoonleft~↿~upharpoonright~↾~uplus~⊎~upsi~υ~upuparrows~⇈~urcorn~⌝~urcorner~⌝~urcrop~⌎~uring~ů~urtri~◹~uscr~𝓊~utdot~⋰~utilde~ũ~utri~▵~utrif~▴~uuarr~⇈~uwangle~⦧~vArr~⇕~vBar~⫨~vBarv~⫩~vDash~⊨~vangrt~⦜~varepsilon~ϵ~varkappa~ϰ~varnothing~∅~varphi~ϕ~varpi~ϖ~varpropto~∝~varr~↕~varrho~ϱ~varsigma~ς~varsubsetneq~⊊︀~varsubsetneqq~⫋︀~varsupsetneq~⊋︀~varsupsetneqq~⫌︀~vartheta~ϑ~vartriangleleft~⊲~vartriangleright~⊳~vcy~в~vdash~⊢~vee~∨~veebar~⊻~veeeq~≚~vellip~⋮~verbar~|~vert~|~vfr~𝔳~vltri~⊲~vnsub~⊂⃒~vnsup~⊃⃒~vopf~𝕧~vprop~∝~vrtri~⊳~vscr~𝓋~vsubnE~⫋︀~vsubne~⊊︀~vsupnE~⫌︀~vsupne~⊋︀~vzigzag~⦚~wcirc~ŵ~wedbar~⩟~wedge~∧~wedgeq~≙~wfr~𝔴~wopf~𝕨~wp~℘~wr~≀~wreath~≀~wscr~𝓌~xcap~⋂~xcirc~◯~xcup~⋃~xdtri~▽~xfr~𝔵~xhArr~⟺~xharr~⟷~xlArr~⟸~xlarr~⟵~xmap~⟼~xnis~⋻~xodot~⨀~xopf~𝕩~xoplus~⨁~xotime~⨂~xrArr~⟹~xrarr~⟶~xscr~𝓍~xsqcup~⨆~xuplus~⨄~xutri~△~xvee~⋁~xwedge~⋀~yacy~я~ycirc~ŷ~ycy~ы~yfr~𝔶~yicy~ї~yopf~𝕪~yscr~𝓎~yucy~ю~zacute~ź~zcaron~ž~zcy~з~zdot~ż~zeetrf~ℨ~zfr~𝔷~zhcy~ж~zigrarr~⇝~zopf~𝕫~zscr~𝓏~~AMP~&~COPY~©~GT~>~LT~<~QUOT~"~REG~®', K.html4);
var bs = {
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
}, Os = String.fromCodePoint || function(e) {
  return String.fromCharCode(Math.floor((e - 65536) / 1024) + 55296, (e - 65536) % 1024 + 56320);
}, W = function() {
  return W = Object.assign || function(e) {
    for (var a, n = 1, t = arguments.length; n < t; n++) {
      a = arguments[n];
      for (var i in a) Object.prototype.hasOwnProperty.call(a, i) && (e[i] = a[i]);
    }
    return e;
  }, W.apply(this, arguments);
}, vs = W(W({}, K), { all: K.html5 }), ws = {
  scope: "body",
  level: "all"
}, fe = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);/g, ye = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+)[;=]?/g, Qe = {
  xml: {
    strict: fe,
    attribute: ye,
    body: pe.xml
  },
  html4: {
    strict: fe,
    attribute: ye,
    body: pe.html4
  },
  html5: {
    strict: fe,
    attribute: ye,
    body: pe.html5
  }
}, Ns = W(W({}, Qe), { all: Qe.html5 }), wa = String.fromCharCode, As = wa(65533);
function Cs(e, a, n, t) {
  var i = e, o = e[e.length - 1];
  if (n && o === "=")
    i = e;
  else if (t && o !== ";")
    i = e;
  else {
    var g = a[e];
    if (g)
      i = g;
    else if (e[0] === "&" && e[1] === "#") {
      var r = e[2], h = r == "x" || r == "X" ? parseInt(e.substr(3), 16) : parseInt(e.substr(2));
      i = h >= 1114111 ? As : h > 65535 ? Os(h) : wa(bs[h] || h);
    }
  }
  return i;
}
function Xe(e, a) {
  var n = a === void 0 ? ws : a, t = n.level, i = t === void 0 ? "all" : t, o = n.scope, g = o === void 0 ? i === "xml" ? "strict" : "body" : o;
  if (!e)
    return "";
  var r = Ns[i][g], h = vs[i].entities, s = g === "attribute", f = g === "strict";
  return e.replace(r, function(c) {
    return Cs(c, h, s, f);
  });
}
var ks = { strictlyTwoElementsInRangeArrays: !1, progressFn: null };
function le(e, a) {
  if (!Array.isArray(e) || !e.length) return e;
  let n = { ...ks, ...a }, t, i;
  if (n.strictlyTwoElementsInRangeArrays && !e.every((r, h) => !Array.isArray(r) || r.length !== 2 ? (t = h, i = r.length, !1) : !0)) throw new TypeError(`ranges-sort: [THROW_ID_03] The first argument should be an array and must consist of arrays which are natural number indexes representing TWO string index ranges. However, ${t}th range (${JSON.stringify(e[t], null, 4)}) has not two but ${i} elements!`);
  if (!e.every((r, h) => !Array.isArray(r) || !Number.isInteger(r[0]) || r[0] < 0 || !Number.isInteger(r[1]) || r[1] < 0 ? (t = h, !1) : !0)) throw new TypeError(`ranges-sort: [THROW_ID_04] The first argument should be an array and must consist of arrays which are natural number indexes representing string index ranges. However, ${t}th range (${JSON.stringify(e[t], null, 4)}) does not consist of only natural numbers!`);
  let o = e.length ** 2, g = 0;
  return Array.from(e).sort((r, h) => (n.progressFn && (g += 1, n.progressFn(Math.floor(g * 100 / o))), r[0] === h[0] ? r[1] < h[1] ? -1 : r[1] > h[1] ? 1 : 0 : r[0] < h[0] ? -1 : 1));
}
var ea = { mergeType: 1, progressFn: null, joinRangesThatTouchEdges: !0 };
function qs(e, a) {
  function n(s) {
    return !!s && typeof s == "object" && !Array.isArray(s);
  }
  if (!Array.isArray(e) || !e.length) return null;
  let t;
  if (a) if (n(a)) {
    if (t = { ...ea, ...a }, t.progressFn && n(t.progressFn) && !Object.keys(t.progressFn).length) t.progressFn = null;
    else if (t.progressFn && typeof t.progressFn != "function") throw new Error(`ranges-merge: [THROW_ID_01] opts.progressFn must be a function! It was given of a type: "${typeof t.progressFn}", equal to ${JSON.stringify(t.progressFn, null, 4)}`);
    if (![1, 2, "1", "2"].includes(t.mergeType)) throw new Error(`ranges-merge: [THROW_ID_02] opts.mergeType was customised to a wrong thing! It was given of a type: "${typeof t.mergeType}", equal to ${JSON.stringify(t.mergeType, null, 4)}`);
    if (typeof t.joinRangesThatTouchEdges != "boolean") throw new Error(`ranges-merge: [THROW_ID_04] opts.joinRangesThatTouchEdges was customised to a wrong thing! It was given of a type: "${typeof t.joinRangesThatTouchEdges}", equal to ${JSON.stringify(t.joinRangesThatTouchEdges, null, 4)}`);
  } else throw new Error(`emlint: [THROW_ID_03] the second input argument must be a plain object. It was given as:
${JSON.stringify(a, null, 4)} (type ${typeof a})`);
  else t = { ...ea };
  let i = e.filter((s) => Array.isArray(s)).map((s) => [...s]).filter((s) => s[2] !== void 0 || s[0] !== s[1]), o, g, r;
  t.progressFn ? o = le(i, { progressFn: (s) => {
    r = Math.floor(s / 5), r !== g && (g = r, t.progressFn(r));
  } }) : o = le(i);
  let h = o.length - 1;
  for (let s = h; s > 0; s--) t.progressFn && (r = Math.floor((1 - s / h) * 78) + 21, r !== g && r > g && (g = r, t.progressFn(r))), (o[s][0] <= o[s - 1][0] || !t.joinRangesThatTouchEdges && o[s][0] < o[s - 1][1] || t.joinRangesThatTouchEdges && o[s][0] <= o[s - 1][1]) && (o[s - 1][0] = Math.min(o[s][0], o[s - 1][0]), o[s - 1][1] = Math.max(o[s][1], o[s - 1][1]), o[s][2] !== void 0 && (o[s - 1][0] >= o[s][0] || o[s - 1][1] <= o[s][1]) && o[s - 1][2] !== null && (o[s][2] === null && o[s - 1][2] !== null ? o[s - 1][2] = null : o[s - 1][2] != null ? +t.mergeType == 2 && o[s - 1][0] === o[s][0] ? o[s - 1][2] = o[s][2] : o[s - 1][2] += o[s][2] : o[s - 1][2] = o[s][2]), o.splice(s, 1), s = o.length);
  return o.length ? o : null;
}
var xs = {}, Rs = xs.NODE_ENV === "production", aa = "Invariant failed";
function Es(e, a) {
  if (!e) {
    if (Rs)
      throw new Error(aa);
    var n = aa;
    throw new Error(n);
  }
}
function Gs(e, a, n) {
  if (arguments.length === 0) throw new Error("ranges-apply: [THROW_ID_01] inputs missing!");
  if (typeof e != "string") throw new TypeError(`ranges-apply: [THROW_ID_02] first input argument must be a string! Currently it's: ${typeof e}, equal to: ${JSON.stringify(e, null, 4)}`);
  if (a && !Array.isArray(a)) throw new TypeError(`ranges-apply: [THROW_ID_03] second input argument must be an array (or null)! Currently it's: ${typeof a}, equal to: ${JSON.stringify(a, null, 4)}`);
  if (!a?.filter((g) => g).length) return e;
  let t;
  Array.isArray(a) && Number.isInteger(a[0]) && Number.isInteger(a[1]) ? t = [Array.from(a)] : t = Array.from(a), t.length, t.filter((g) => g).forEach((g, r) => {
    if (!Array.isArray(g)) throw new TypeError(`ranges-apply: [THROW_ID_05] ranges array, second input arg., has ${r}th element not an array: ${JSON.stringify(g, null, 4)}, which is ${typeof g}`);
    if (!Number.isInteger(g[0])) {
      if (!Number.isInteger(+g[0]) || +g[0] < 0) throw new TypeError(`ranges-apply: [THROW_ID_06] ranges array, second input arg. has ${r}th element, array ${JSON.stringify(g, null, 0)}. Its first element is not an integer, string index, but ${typeof g[0]}, equal to: ${JSON.stringify(g[0], null, 4)}.`);
      t[r][0] = +t[r][0];
    }
    if (!Number.isInteger(g[1])) {
      if (!Number.isInteger(+g[1]) || +g[1] < 0) throw new TypeError(`ranges-apply: [THROW_ID_07] ranges array, second input arg. has ${r}th element, array ${JSON.stringify(g, null, 0)}. Its second element is not an integer, string index, but ${typeof g[1]}, equal to: ${JSON.stringify(g[1], null, 4)}.`);
      t[r][1] = +t[r][1];
    }
  });
  let i = qs(t, { progressFn: (g) => {
  } });
  Es(i);
  let o = i.length;
  if (o > 0) {
    let g = e.slice(i[o - 1][1]);
    e = i.reduce((r, h, s, f) => {
      let c = s === 0 ? 0 : f[s - 1][1], u = f[s][0];
      return `${r}${e.slice(c, u)}${f[s][2] || ""}`;
    }, ""), e += g;
  }
  return e;
}
function Se(e, a = 1) {
  let n = " ";
  function t(o) {
    return Array.from(o).reverse().join("");
  }
  function i(o, g, r) {
    let h = r ? `
` : "\r", s = r ? "\r" : `
`;
    if (!o) return o;
    let f = 0, c = "";
    for (let u = 0, d = o.length; u < d; u++) (o[u] === h || o[u] === s && o[u - 1] !== h) && f++, `\r
`.includes(o[u]) || o[u] === n ? o[u] === n ? c += o[u] : o[u] === h ? f <= g && (c += o[u], o[u + 1] === s && (c += o[u + 1], u++)) : o[u] === s && o?.[u - 1] !== h && f <= g && (c += o[u]) : !o[u + 1] && !f && (c += " ");
    return c;
  }
  if (typeof e == "string" && e.length) {
    let o = 1;
    typeof +a == "number" && Number.isInteger(+a) && +a >= 0 && (o = +a);
    let g = "", r = "";
    if (!e.trim()) g = e;
    else if (!e[0].trim()) {
      for (let h = 0, s = e.length; h < s; h++) if (e[h].trim()) {
        g = e.slice(0, h);
        break;
      }
    }
    if (e.trim() && (e.slice(-1).trim() === "" || e.slice(-1) === n)) {
      for (let h = e.length; h--; ) if (e[h].trim()) {
        r = e.slice(h + 1);
        break;
      }
    }
    return `${i(g, o, !1)}${e.trim()}${t(i(t(r), o, !0))}`;
  }
  return e;
}
var na = { mergeType: 1, progressFn: null, joinRangesThatTouchEdges: !0 };
function Is(e, a) {
  function n(s) {
    return !!s && typeof s == "object" && !Array.isArray(s);
  }
  if (!Array.isArray(e) || !e.length) return null;
  let t;
  if (a) if (n(a)) {
    if (t = { ...na, ...a }, t.progressFn && n(t.progressFn) && !Object.keys(t.progressFn).length) t.progressFn = null;
    else if (t.progressFn && typeof t.progressFn != "function") throw new Error(`ranges-merge: [THROW_ID_01] resolvedOpts.progressFn must be a function! It was given of a type: "${typeof t.progressFn}", equal to ${JSON.stringify(t.progressFn, null, 4)}`);
    if (![1, 2, "1", "2"].includes(t.mergeType)) throw new Error(`ranges-merge: [THROW_ID_02] resolvedOpts.mergeType was customised to a wrong thing! It was given of a type: "${typeof t.mergeType}", equal to ${JSON.stringify(t.mergeType, null, 4)}`);
    if (typeof t.joinRangesThatTouchEdges != "boolean") throw new Error(`ranges-merge: [THROW_ID_04] resolvedOpts.joinRangesThatTouchEdges was customised to a wrong thing! It was given of a type: "${typeof t.joinRangesThatTouchEdges}", equal to ${JSON.stringify(t.joinRangesThatTouchEdges, null, 4)}`);
  } else throw new Error(`ranges-merge: [THROW_ID_03] the second input argument must be a plain object. It was given as:
${JSON.stringify(a, null, 4)} (type ${typeof a})`);
  else t = { ...na };
  let i = e.filter((s) => Array.isArray(s)).map((s) => [...s]).filter((s) => s[2] !== void 0 || s[0] !== s[1]), o, g, r;
  t.progressFn ? o = le(i, { progressFn: (s) => {
    r = Math.floor(s / 5), r !== g && (g = r, t.progressFn != null && t.progressFn(r));
  } }) : o = le(i);
  let h = o.length - 1;
  for (let s = h; s > 0; s--) t.progressFn && (r = Math.floor((1 - s / h) * 78) + 21, r !== g && r > g && (g = r, t.progressFn(r))), (o[s][0] <= o[s - 1][0] || !t.joinRangesThatTouchEdges && o[s][0] < o[s - 1][1] || t.joinRangesThatTouchEdges && o[s][0] <= o[s - 1][1]) && (o[s - 1][0] = Math.min(o[s][0], o[s - 1][0]), o[s - 1][1] = Math.max(o[s][1], o[s - 1][1]), o[s][2] !== void 0 && (o[s - 1][0] >= o[s][0] || o[s - 1][1] <= o[s][1]) && o[s - 1][2] !== null && (o[s][2] === null && o[s - 1][2] !== null ? o[s - 1][2] = null : o[s - 1][2] != null ? +(t || {})?.mergeType == 2 && o[s - 1][0] === o[s][0] ? o[s - 1][2] = o[s][2] : o[s - 1][2] += o[s][2] : o[s - 1][2] = o[s][2]), o.splice(s, 1), s = o.length);
  return o.length ? o : null;
}
var Ts = { limitToBeAddedWhitespace: !1, limitLinebreaksCount: 1, mergeType: 1 }, Ms = class {
  constructor(e) {
    let a = { ...Ts, ...e };
    if (a.mergeType && a.mergeType !== 1 && a.mergeType !== 2) if ($(a.mergeType) && a.mergeType.trim() === "1") a.mergeType = 1;
    else if ($(a.mergeType) && a.mergeType.trim() === "2") a.mergeType = 2;
    else throw new Error(`ranges-push: [THROW_ID_02] opts.mergeType was customised to a wrong thing! It was given of a type: "${typeof a.mergeType}", equal to ${JSON.stringify(a.mergeType, null, 4)}`);
    this.opts = a, this.ranges = [];
  }
  ranges;
  opts;
  add(e, a, n) {
    if (e == null && a == null) return;
    if (D(e) && !D(a)) {
      if (Array.isArray(e)) {
        if (e.length) {
          if (e.some((o) => Array.isArray(o))) {
            e.forEach((o) => {
              Array.isArray(o) && this.add(...o);
            });
            return;
          }
          e.length && B(+e[0]) && B(+e[1]) && this.add(...e);
        }
        return;
      }
      throw new TypeError(`ranges-push/Ranges/add(): [THROW_ID_12] the first input argument, "from" is set (${JSON.stringify(e, null, 0)}) but second-one, "to" is not (${JSON.stringify(a, null, 0)})`);
    } else if (!D(e) && D(a)) throw new TypeError(`ranges-push/Ranges/add(): [THROW_ID_13] the second input argument, "to" is set (${JSON.stringify(a, null, 0)}) but first-one, "from" is not (${JSON.stringify(e, null, 0)})`);
    let t = +e, i = +a;
    if (B(t) && B(i)) {
      if (D(n) && !$(n) && !gl(n)) throw new TypeError(`ranges-push/Ranges/add(): [THROW_ID_08] The third argument, the value to add, was given not as string but ${typeof n}, equal to:
${JSON.stringify(n, null, 4)}`);
      if (D(this.ranges) && Array.isArray(this.last()) && t === this.last()[1]) {
        if (this.last()[1] = i, this.last()[2], this.last()[2] !== null && D(n)) {
          let o = this.last()[2] && this.last()[2].length && (!this.opts?.mergeType || this.opts.mergeType === 1) ? `${this.last()[2]}${n}` : n;
          this.opts.limitToBeAddedWhitespace && (o = Se(o, this.opts.limitLinebreaksCount)), $(o) && !o.length || (this.last()[2] = o);
        }
      } else {
        this.ranges || (this.ranges = []);
        let o = n !== void 0 && !($(n) && !n.length) ? [t, i, n && this.opts.limitToBeAddedWhitespace ? Se(n, this.opts.limitLinebreaksCount) : n] : [t, i];
        this.ranges.push(o);
      }
    } else throw B(t) && t >= 0 ? new TypeError(`ranges-push/Ranges/add(): [THROW_ID_10] "to" value, the second input argument, must be a natural number or zero! Currently it's of a type "${typeof i}" equal to: ${JSON.stringify(i, null, 4)}`) : new TypeError(`ranges-push/Ranges/add(): [THROW_ID_09] "from" value, the first input argument, must be a natural number or zero! Currently it's of a type "${typeof t}" equal to: ${JSON.stringify(t, null, 4)}`);
  }
  push(e, a, n) {
    this.add(e, a, n);
  }
  current() {
    return Array.isArray(this.ranges) && this.ranges.length ? (this.ranges = Is(this.ranges, { mergeType: this.opts.mergeType }), this.ranges && this.opts.limitToBeAddedWhitespace ? this.ranges.map((e) => D(e[2]) ? [e[0], e[1], Se(e[2], this.opts.limitLinebreaksCount)] : e) : this.ranges) : null;
  }
  wipe() {
    this.ranges = [];
  }
  replace(e) {
    if (Array.isArray(e) && e.length) if (Array.isArray(e[0]) && B(e[0][0])) this.ranges = Array.from(e);
    else throw new Error(`ranges-push/Ranges/replace(): [THROW_ID_11] Single range was given but we expected array of arrays! The first element, ${JSON.stringify(e[0], null, 4)} should be an array and its first element should be an integer, a string index.`);
    else this.ranges = [];
  }
  last() {
    return Array.isArray(this.ranges) && this.ranges.length ? this.ranges[this.ranges.length - 1] : null;
  }
};
ga();
var be = " ";
function Hs({ str: e, idx: a = 0, stopAtNewlines: n = !1, stopAtRawNbsp: t = !1 }) {
  if (typeof e != "string" || !e.length || ((!a || typeof a != "number") && (a = 0), !e[a + 1])) return null;
  if (e[a + 1] && (e[a + 1].trim() || n && `
\r`.includes(e[a + 1]) || t && e[a + 1] === be)) return a + 1;
  if (e[a + 2] && (e[a + 2].trim() || n && `
\r`.includes(e[a + 2]) || t && e[a + 2] === be)) return a + 2;
  for (let i = a + 1, o = e.length; i < o; i++) if (e[i].trim() || n && `
\r`.includes(e[i]) || t && e[i] === be) return i;
  return null;
}
function E(e, a = 0) {
  return Hs({ str: e, idx: a, stopAtNewlines: !1, stopAtRawNbsp: !1 });
}
function Ds(e) {
  return /[-_A-Za-z0-9]/.test(e);
}
function ra(e, a) {
  if (!e) return [];
  if (Array.isArray(e)) return e.filter((n) => typeof n == "string" && n.trim());
  if (typeof e == "string") return e.trim() ? [e] : [];
  throw new TypeError(`string-strip-html/stripHtml(): [THROW_ID_05] ${a} must be array containing zero or more strings or something falsey. Currently it's equal to: ${e}, that a type of ${typeof e}.`);
}
function re(e, a, n, t) {
  for (let i = a, o = e.length; i < o; i++) {
    if (e.startsWith(n, i)) return !0;
    if (e.startsWith(t, i)) return !1;
  }
  return !1;
}
function ta(e, a, n) {
  return e?.quotes, e?.quotes?.value && re(a, n + 1, e.quotes.value, ">"), e?.quotes?.next, re(a, e?.quotes?.next - 1, e?.quotes?.value, ">"), !e?.quotes || !re(a, n + 1, e.quotes.value, ">") && e?.quotes?.next !== -1 && re(a, e?.quotes?.next - 1, e?.quotes?.value, ">");
}
function Ps(e, a) {
  return (a.match(new RegExp(e, "g")) || []).length;
}
var X = /* @__PURE__ */ new Set(["!doctype", "abbr", "address", "area", "article", "aside", "audio", "base", "bdi", "bdo", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "doctype", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "math", "menu", "menuitem", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "param", "picture", "pre", "progress", "rb", "rp", "rt", "rtc", "ruby", "samp", "script", "section", "select", "slot", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "svg", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "ul", "var", "video", "wbr", "xml"]), Oe = /* @__PURE__ */ new Set(["a", "b", "i", "p", "q", "s", "u"]), ve = /* @__PURE__ */ new Set([".", ",", ";", "!", "?"]), oa = /* @__PURE__ */ new Set([".", ",", "?", ";", ")", "…", '"', "»"]), Ls = /* @__PURE__ */ new Set(["a", "abbr", "acronym", "audio", "b", "bdi", "bdo", "big", "button", "canvas", "cite", "code", "data", "datalist", "del", "dfn", "em", "embed", "i", "iframe", "input", "ins", "kbd", "label", "map", "mark", "meter", "noscript", "object", "output", "picture", "progress", "q", "ruby", "s", "samp", "select", "slot", "small", "span", "strong", "sub", "sup", "svg", "template", "textarea", "time", "u", "tt", "var", "video", "wbr"]), la = { ignoreTags: [], ignoreTagsWithTheirContents: [], onlyStripTags: [], stripTogetherWithTheirContents: ["script", "style", "xml"], skipHtmlDecoding: !1, trimOnlySpaces: !1, stripRecognisedHTMLOnly: !1, dumpLinkHrefsNearby: { enabled: !1, putOnNewLine: !1, wrapHeads: "", wrapTails: "" }, ignoreIndentations: !1, cb: null, reportProgressFunc: null, reportProgressFuncFrom: 0, reportProgressFuncTo: 100 };
function Na(e, a) {
  let n = Date.now(), t = [], i = [], o = [], g = [], r = {};
  function h() {
    r = { attributes: [] };
  }
  h();
  let s = null, f = null, c = null, u = !1, d = {}, S = { tagName: "", hrefValue: "", openingTagEnds: void 0 }, O = "", k = !1, C = null, G = !0;
  function ae(l, p, b) {
    if (Array.isArray(p.stripTogetherWithTheirContents) && (p.stripTogetherWithTheirContents.includes(r.name) || p.stripTogetherWithTheirContents.includes("*"))) if (r.slashPresent && Array.isArray(t) && t.some((y) => y.name === r.name)) {
      for (let y = t.length; y--; ) if (t[y].name === r.name) {
        g = g.filter(([w, q]) => (w < t[y].lastOpeningBracketAt || w >= l + 1) && (q <= t[y].lastOpeningBracketAt || q > l + 1));
        let N = l + 1;
        r.lastClosingBracketAt && (N = r.lastClosingBracketAt + 1), g.push([t[y].lastOpeningBracketAt, N]), oa.has(e[l]) && p.cb ? p.cb({ tag: r, deleteFrom: t[y].lastOpeningBracketAt, deleteTo: l + 1, insert: null, rangesArr: b, proposedReturn: [t[y].lastOpeningBracketAt, l, null] }) : p.cb && p.cb({ tag: r, deleteFrom: t[y].lastOpeningBracketAt, deleteTo: l, insert: "", rangesArr: b, proposedReturn: [t[y].lastOpeningBracketAt, l, ""] }), t.splice(y, 1);
        break;
      }
    } else r.slashPresent || t.push(r);
    else Array.isArray(p.ignoreTagsWithTheirContents) && ce(l, p, r) && (G = !1);
  }
  function U(l, p, b, y, N, w) {
    if (Array.isArray(v.current()) && typeof b == "number" && v.current()[0][0] === 0 && v.current()[0][1] >= b) return "";
    if (e.length === y && w && !m?.dumpLinkHrefsNearby?.enabled) return null;
    let q = "";
    if (Number.isInteger(b) && b < N && (q += l.slice(b, N)), Number.isInteger(y) && y > w + 1) {
      let T = l.slice(w + 1, y);
      y && !E(e, y - 1) && (T = T.trimEnd()), T.includes(`
`) && I(y, l) ? q += " " : q += T;
    }
    let z = !oa.has(l[p]), De = l[y - 1] !== ">" || !l[b].trim(), Pe = !['"', "("].includes(l[N - 1]), Ca = ![";", ".", ":", "!"].includes(l[p]);
    if ((z || De && Pe && Ca) && (De || Pe) && l[p] !== "!" && (!Ls.has(r.name) || typeof b == "number" && b < N || typeof y == "number" && y > w + 1)) {
      let T = q.match(/\n/g);
      return Array.isArray(T) && T.length ? T.length === 1 ? `
` : T.length === 2 ? `

` : `


` : " ";
    }
    return "";
  }
  function de(l, p) {
    if (l.dumpLinkHrefsNearby?.enabled && S.tagName && S.tagName === r.name && r.lastOpeningBracketAt && (S.openingTagEnds && r.lastOpeningBracketAt > S.openingTagEnds || !S.openingTagEnds) && (k = !0), k) {
      let b = l.dumpLinkHrefsNearby?.putOnNewLine ? `

` : "";
      O = `${b}${S.hrefValue}`, (typeof p != "number" || E(e, p - 1)) && (O += b);
    }
  }
  function I(l, p) {
    return p ? p[l] === "<" && p[l + 1] !== "%" : e[l] === "<" && e[l + 1] !== "%";
  }
  function M(l) {
    return e[l] === ">" && e[l - 1] !== "%";
  }
  function ce(l, p, b) {
    if (p.ignoreTagsWithTheirContents.includes("*")) return !0;
    let y = e.indexOf(`<${b.name}`, l), N = e.indexOf(`</${b.name}`, l);
    return !b.slashPresent && N === -1 || b.slashPresent && !i.some((w) => w.name === b.name) || N > -1 && y > -1 && y < N ? !1 : p.ignoreTagsWithTheirContents.includes(b.name);
  }
  if (typeof e != "string") throw new TypeError(`string-strip-html/stripHtml(): [THROW_ID_01] Input must be string! Currently it's: ${(typeof e).toLowerCase()}, equal to:
${JSON.stringify(e, null, 4)}`);
  if (a) if (Ce(a)) {
    if (a.reportProgressFunc && typeof a.reportProgressFunc != "function") throw new Error(`string-strip-html/stripHtml(): [THROW_ID_03] The Optional Options Object's key reportProgressFunc, callback function, should be a function but it was given as type ${typeof a.reportProgressFunc}, equal to ${JSON.stringify(a.reportProgressFunc, null, 4)}`);
    if (typeof a.dumpLinkHrefsNearby == "boolean" && a.dumpLinkHrefsNearby != null) throw new Error(`string-strip-html/stripHtml(): [THROW_ID_04] The Optional Options Object's key should be a plain object but it was given as type ${typeof a.dumpLinkHrefsNearby}, equal to ${JSON.stringify(a.dumpLinkHrefsNearby, null, 4)}`);
  } else throw new TypeError(`string-strip-html/stripHtml(): [THROW_ID_02] Optional Options Object must be a plain object! Currently it's: ${(typeof a).toLowerCase()}, equal to:
${JSON.stringify(a, null, 4)}`);
  function ue() {
    k && (S = { tagName: "", hrefValue: "", openingTagEnds: void 0 }, k = !1);
  }
  let m = { ...la, ...a, dumpLinkHrefsNearby: Object.assign({}, la.dumpLinkHrefsNearby, a?.dumpLinkHrefsNearby) };
  if (dl(m, "returnRangesOnly")) throw new TypeError("string-strip-html/stripHtml(): [THROW_ID_05] The Optional Options Object's key returnRangesOnly has been removed from the API since v.5 release.");
  if (m.reportProgressFunc) {
    if (typeof m.reportProgressFuncFrom != "number") throw new Error(`string-strip-html/stripHtml(): [THROW_ID_06] The Optional Options Object's key reportProgressFuncFrom, callback function's "from" range, should be a number but it was given as type ${typeof m.reportProgressFuncFrom}, equal to ${JSON.stringify(m.reportProgressFuncFrom, null, 4)}`);
    if (typeof m.reportProgressFuncTo != "number") throw new Error(`string-strip-html/stripHtml(): [THROW_ID_07] The Optional Options Object's key reportProgressFuncTo, callback function's "to" range, should be a number but it was given as type ${typeof m.reportProgressFuncTo}, equal to ${JSON.stringify(m.reportProgressFuncTo, null, 4)}`);
  }
  m.ignoreTags = ra(m.ignoreTags, "resolvedOpts.ignoreTags"), m.onlyStripTags = ra(m.onlyStripTags, "resolvedOpts.onlyStripTags");
  let Me = !!m.onlyStripTags.length;
  m.onlyStripTags.length && m.ignoreTags.length && (m.onlyStripTags = fs(m.onlyStripTags, ...m.ignoreTags)), m.stripTogetherWithTheirContents ? typeof m.stripTogetherWithTheirContents == "string" && m.stripTogetherWithTheirContents.length && (m.stripTogetherWithTheirContents = [m.stripTogetherWithTheirContents]) : m.stripTogetherWithTheirContents = [];
  let Y = {};
  if (m.stripTogetherWithTheirContents && Array.isArray(m.stripTogetherWithTheirContents) && m.stripTogetherWithTheirContents.length && !m.stripTogetherWithTheirContents.every((l, p) => typeof l != "string" ? (Y.el = l, Y.i = p, !1) : !0)) throw new TypeError(`string-strip-html/stripHtml(): [THROW_ID_08] Optional Options Object's key stripTogetherWithTheirContents was set to contain not just string elements! For example, element at index ${Y.i} has a value ${Y.el} which is not string but ${(typeof Y.el).toLowerCase()}.`);
  m.cb || (m.cb = ({ rangesArr: l, proposedReturn: p }) => {
    p && l.push(...p);
  });
  let v = new Ms({ limitToBeAddedWhitespace: !0, limitLinebreaksCount: 2 });
  if (!m.skipHtmlDecoding) for (; e !== Xe(e, { scope: "strict" }); ) e = Xe(e, { scope: "strict" });
  let P = !1, H = !1, ne = 0, He = 0, x = e.length, Aa = Math.floor(x / 2);
  for (let l = 0; l < x; l++) {
    if (m.reportProgressFunc && (x > 1e3 && x < 2e3 ? l === Aa && m.reportProgressFunc(Math.floor((m.reportProgressFuncTo - m.reportProgressFuncFrom) / 2)) : x >= 2e3 && (ne = m.reportProgressFuncFrom + Math.floor(l / x * (m.reportProgressFuncTo - m.reportProgressFuncFrom)), ne !== He && (He = ne, m.reportProgressFunc(ne)))), Object.keys(r).length > 1 && r.lastClosingBracketAt && r.lastClosingBracketAt < l && e[l] !== " " && C === null && (C = l), !P && e[l] === "%" && e[l - 1] === "{" && e.includes("%}", l + 1)) {
      c = null;
      let p = e.indexOf("%}", l) - 1;
      if (p > l) {
        l = p;
        continue;
      }
    }
    if (!P && M(l) && (!r || Object.keys(r).length < 2) && l > 1) {
      for (let p = l; p--; ) if (e[p - 1] === void 0 || M(p)) {
        let b = e[p - 1] === void 0 ? p : p + 1, y = e.slice(b, l + 1) || "";
        if ((y.includes("/>") || y.includes("/ >") || y.includes('="') || y.includes("='")) && e !== `<${Ze(y.trim(), "/>")}>` && [...X].some((N) => Ze(y.trim().split(/\s+/).filter((w) => w.trim()).filter((w, q) => q === 0), "/>").toLowerCase() === N) && Na(`<${y.trim()}>`, m).result === "") {
          (!o.length || o[o.length - 1][0] !== r.lastOpeningBracketAt) && o.push([b, l + 1]), (!g.length || g[g.length - 1][0] !== r.lastOpeningBracketAt) && g.push([b, l + 1]);
          let N = U(e, l, b, l + 1, b, l + 1), w = l + 1;
          if (e[w] && !e[w].trim()) {
            for (let q = w; q < x; q++) if (e[q].trim()) {
              w = q;
              break;
            }
          }
          m.cb({ tag: r, deleteFrom: b, deleteTo: w, insert: N, rangesArr: v, proposedReturn: [b, w, N] });
        }
        break;
      }
    }
    if (!H && e[l] === "/" && !r.quotes?.value && Number.isInteger(r.lastOpeningBracketAt) && !Number.isInteger(r.lastClosingBracketAt) && (r.slashPresent = l), e[l] === '"' || e[l] === "'") if (!H && r.nameStarts && r?.quotes?.value === e[l]) if (d.valueStarts === void 0) d = {}, delete r.quotes;
    else {
      d.valueEnds = l, d.value = e.slice(d.valueStarts, l), r.attributes.push(d), d = {}, delete r.quotes;
      let p;
      m.dumpLinkHrefsNearby?.enabled && !t.length && r.attributes.some((b) => {
        if (typeof b.name == "string" && b.name.toLowerCase() === "href") return p = `${m.dumpLinkHrefsNearby?.wrapHeads || ""}${b.value}${m.dumpLinkHrefsNearby?.wrapTails || ""}`, !0;
      }) && (S = { tagName: r.name, hrefValue: p, openingTagEnds: void 0 });
    }
    else !H && !r.quotes && r.nameStarts && (r.quotes = {}, r.quotes.value = e[l], r.quotes.start = l, r.quotes.next = e.indexOf(e[l], l + 1), d.nameStarts && d.nameEnds && d.nameEnds < l && d.nameStarts < l && !d.valueStarts && (d.name = e.slice(d.nameStarts, d.nameEnds)));
    if (r.nameStarts !== void 0 && r.nameEnds === void 0 && (!e[l].trim() || !Ds(e[l]))) {
      if (r.nameEnds = l, r.name = e.slice(r.nameStarts, r.nameEnds + (!M(l) && e[l] !== "/" && e[l + 1] === void 0 ? 1 : 0)), e[r.nameStarts - 1] !== "!" && !r.name.replace(/-/g, "").length || /^\d+$/.test(r.name[0])) {
        r = {};
        continue;
      }
      if (typeof r.name == "string" && r.name.toLowerCase() === "doctype" && (H = !0), I(l)) {
        de(m);
        let p = U(e, l, r.leftOuterWhitespace, l, r.lastOpeningBracketAt, l);
        (m.stripTogetherWithTheirContents.includes(r.name) || m.stripTogetherWithTheirContents.includes("*")) && (g = g.filter(([b, y]) => !(b === r.leftOuterWhitespace && y === l))), m.cb({ tag: r, deleteFrom: r.leftOuterWhitespace, deleteTo: l, insert: `${p}${O}${p}`, rangesArr: v, proposedReturn: [r.leftOuterWhitespace, l, `${p}${O}${p}`] }), ue(), ae(l, m, v);
      }
    }
    if (r.quotes?.start && r.quotes.start < l && !r.quotes.end && d.nameEnds && d.equalsAt && !d.valueStarts && (d.valueStarts = l), !r.quotes && d.nameEnds && e[l] === "=" && !d.valueStarts && !d.equalsAt && (d.equalsAt = l), !r.quotes && d.nameStarts && d.nameEnds && !d.valueStarts && e[l].trim() && e[l] !== "=" && (r.attributes.push(d), d = {}), !r.quotes && d.nameStarts && !d.nameEnds && (H && `'"`.includes(e[d.nameStarts]) ? d.nameStarts < l && e[l] === e[d.nameStarts] && (d.nameEnds = l + 1, d.name = e.slice(d.nameStarts, d.nameEnds)) : e[l].trim() ? e[l] === "=" ? d.equalsAt || (d.nameEnds = l, d.equalsAt = l, d.name = e.slice(d.nameStarts, d.nameEnds)) : e[l] === "/" || M(l) ? (d.nameEnds = l, d.name = e.slice(d.nameStarts, d.nameEnds), r.attributes.push(d), d = {}) : I(l) && (d.nameEnds = l, d.name = e.slice(d.nameStarts, d.nameEnds), r.attributes.push(d), d = {}) : (d.nameEnds = l, d.name = e.slice(d.nameStarts, d.nameEnds))), !r.quotes && r.nameEnds < l && !e[l - 1].trim() && e[l].trim() && !"<>/!".includes(e[l]) && !d.nameStarts && !r.lastClosingBracketAt && (d.nameStarts = l), r.lastOpeningBracketAt !== null && r.lastOpeningBracketAt < l && e[l] === "/" && r.onlyPlausible && (r.onlyPlausible = !1), r.lastOpeningBracketAt !== null && r.lastOpeningBracketAt < l && e[l] !== "/" && (r.onlyPlausible === void 0 && ((!e[l].trim() || I(l)) && !r.slashPresent ? r.onlyPlausible = !0 : r.onlyPlausible = !1), e[l].trim() && r.nameStarts === void 0 && !I(l) && e[l] !== "/" && !M(l) && e[l] !== "!" && (r.nameStarts = l, r.nameContainsLetters = !1)), r.nameStarts && !r.quotes && typeof e[l] == "string" && e[l].toLowerCase() !== e[l].toUpperCase() && (r.nameContainsLetters = !0), M(l) && (ta(r, e, l) || r.quotes.value && typeof r.lastOpeningBracketAt == "number" && Ps(r.quotes.value, e.slice(r.lastOpeningBracketAt, l)) % 2 === 1 && !e.slice(r.lastOpeningBracketAt + 1, l).includes("<") && !e.slice(r.lastOpeningBracketAt + 1, l).includes(">")) && r.lastOpeningBracketAt !== void 0 && (r.lastClosingBracketAt = l, C = null, Object.keys(d).length && (r.attributes.push(d), d = {}), m.dumpLinkHrefsNearby?.enabled && S.tagName && !S.openingTagEnds && (S.openingTagEnds = l)), (!H || e[l] === ">") && r.lastOpeningBracketAt !== void 0) {
      if (r.lastClosingBracketAt === void 0) {
        if (r.lastOpeningBracketAt < l && !I(l) && (e[l + 1] === void 0 || I(l + 1) && !r?.quotes?.value) && r.nameContainsLetters && typeof r.nameStarts == "number") {
          if (r.name = e.slice(r.nameStarts, r.nameEnds || l + 1).toLowerCase(), (!o.length || o[o.length - 1][0] !== r.lastOpeningBracketAt) && o.push([r.lastOpeningBracketAt, l + 1]), m.ignoreTags.includes(r.name) || ce(l, m, r) || !X.has(r.name) && (r.onlyPlausible || m.stripRecognisedHTMLOnly)) {
            r = {}, d = {};
            continue;
          }
          if ((X.has(r.name) || Oe.has(r.name)) && (r.onlyPlausible === !1 || r.onlyPlausible === !0 && r.attributes.length) || e[l + 1] === void 0) {
            de(m);
            let p = U(e, l, r.leftOuterWhitespace, l + 1, r.lastOpeningBracketAt, r.lastClosingBracketAt);
            P && r.name === "script" && r.slashPresent && (P = !1);
            let b;
            p === null || O === null ? b = null : b = `${p}${O}${p}`, m.cb({ tag: r, deleteFrom: r.leftOuterWhitespace, deleteTo: l + 1, insert: b, rangesArr: v, proposedReturn: [r.leftOuterWhitespace, l + 1, b] }), ue(), ae(l, m, v);
          }
          if (!g.length || g[g.length - 1][0] !== r.lastOpeningBracketAt && g[g.length - 1][1] !== l + 1) if (m.stripTogetherWithTheirContents.includes(r.name) || m.stripTogetherWithTheirContents.includes("*")) {
            let p;
            for (let b = t.length; b--; ) t[b].name === r.name && (p = t[b]);
            p ? (g = g.filter(([b]) => b !== p.lastOpeningBracketAt), g.push([p.lastOpeningBracketAt, l + 1])) : g.push([r.lastOpeningBracketAt, l + 1]);
          } else g.push([r.lastOpeningBracketAt, l + 1]);
        }
      } else if (l > r.lastClosingBracketAt && e[l].trim() || e[l + 1] === void 0 || m.ignoreIndentations && `\r
`.includes(e[l])) {
        let p = r.lastClosingBracketAt === l ? l + 1 : l;
        m.trimOnlySpaces && p === x - 1 && C !== null && C < l && (p = C), (!o.length || o[o.length - 1][0] !== r.lastOpeningBracketAt) && o.push([r.lastOpeningBracketAt, r.lastClosingBracketAt + 1]);
        let b = m.ignoreTags.includes(r.name), y = ce(l, m, r);
        if (!G || m.stripRecognisedHTMLOnly && typeof r.name == "string" && !X.has(r.name.toLowerCase()) && !Oe.has(r.name.toLowerCase()) || !Me && (b || y) || Me && !m.onlyStripTags.includes(r.name) || m.ignoreTagsWithTheirContents.includes(r.name)) {
          if (y) if (r.slashPresent) {
            for (let N = i.length; N--; ) if (i[N].name === r.name) {
              i.splice(N, 1);
              break;
            }
            i.length || (G = !0);
          } else G && (G = !1), i.push(r);
          m.cb({ tag: r, deleteFrom: null, deleteTo: null, insert: null, rangesArr: v, proposedReturn: null }), r = {}, d = {};
        } else if (!r.onlyPlausible || r.attributes.length === 0 && r.name && (X.has(r.name.toLowerCase()) || Oe.has(r.name.toLowerCase())) || r.attributes?.some((N) => N.equalsAt)) {
          (!g.length || g[g.length - 1][0] !== r.lastOpeningBracketAt) && g.push([r.lastOpeningBracketAt, r.lastClosingBracketAt + 1]);
          let N = U(e, l, r.leftOuterWhitespace, p, r.lastOpeningBracketAt, r.lastClosingBracketAt);
          O = "", k = !1, de(m, p);
          let w;
          typeof O == "string" && O.length ? (w = `${N}${O}${N === `

` ? `
` : N}`, p === r.lastClosingBracketAt + 1 && (!e[p] || !ve.has(e[p])) && (w += " "), r.leftOuterWhitespace === r.lastOpeningBracketAt && v.last() && v.last()[1] < r.lastOpeningBracketAt && (!m?.dumpLinkHrefsNearby?.putOnNewLine || !ve.has(e[p])) && (w = " " + w)) : w = N, w !== null && (r.leftOuterWhitespace === 0 || !E(e, p - 1)) && (!m.dumpLinkHrefsNearby?.enabled || r.name !== "a") && (w = void 0);
          let q = 0;
          if (k && ve.has(e[p])) {
            m.dumpLinkHrefsNearby?.putOnNewLine && (w = `${e[p]}${w || ""}`);
            let z = E(e, p);
            z && w?.endsWith(`
`) ? q += z - l : (!z || z > l) && q++;
          }
          m.cb({ tag: r, deleteFrom: r.leftOuterWhitespace, deleteTo: p + q, insert: w, rangesArr: v, proposedReturn: [r.leftOuterWhitespace, p + q, w] }), ue(), ae(l, m, v);
        } else r = {};
        M(l) || (r = {});
      }
      H && (H = !1);
    }
    if ((!P || e[l] === "<" && E(e, E(e, l)) && e[E(e, l)] === "/" && e.startsWith("script", E(e, E(e, l)))) && I(l) && !I(l - 1) && !`'"`.includes(e[l + 1]) && (!`'"`.includes(e[l + 2]) || /\w/.test(e[l + 1])) && !(e[l + 1] === "c" && e[l + 2] === ":") && !(e[l + 1] === "f" && e[l + 2] === "m" && e[l + 3] === "t" && e[l + 4] === ":") && !(e[l + 1] === "s" && e[l + 2] === "q" && e[l + 3] === "l" && e[l + 4] === ":") && !(e[l + 1] === "x" && e[l + 2] === ":") && !(e[l + 1] === "f" && e[l + 2] === "n" && e[l + 3] === ":") && ta(r, e, l)) {
      if (M(E(e, l))) continue;
      if (r.nameEnds && r.nameEnds < l && !r.lastClosingBracketAt && (r.onlyPlausible === !0 && r.attributes?.length || r.onlyPlausible === !1)) {
        let p = U(e, l, r.leftOuterWhitespace, l, r.lastOpeningBracketAt, l);
        m.cb({ tag: r, deleteFrom: r.leftOuterWhitespace, deleteTo: l, insert: p, rangesArr: v, proposedReturn: [r.leftOuterWhitespace, l, p] }), ae(l, m, v), r = {}, d = {};
      }
      if (r.lastOpeningBracketAt !== void 0 && r.onlyPlausible && r.name && !r.quotes && (r.lastOpeningBracketAt = void 0, r.name = void 0, r.onlyPlausible = !1), (r.lastOpeningBracketAt === void 0 || !r.onlyPlausible) && !r.quotes && (r.lastOpeningBracketAt = l, r.slashPresent = !1, r.attributes = [], s === null ? r.leftOuterWhitespace = l : m.trimOnlySpaces && s === 0 ? r.leftOuterWhitespace = f || l : r.leftOuterWhitespace = s, `${e[l + 1]}${e[l + 2]}${e[l + 3]}` == "!--" || `${e[l + 1]}${e[l + 2]}${e[l + 3]}${e[l + 4]}${e[l + 5]}${e[l + 6]}${e[l + 7]}${e[l + 8]}` == "![CDATA[")) {
        let p = !0;
        e[l + 2] === "-" && (p = !1);
        let b;
        for (let y = l; y < x; y++) if ((!b && p && `${e[y - 2]}${e[y - 1]}${e[y]}` == "]]>" || !p && `${e[y - 2]}${e[y - 1]}${e[y]}` == "-->") && (b = y), b && (b < y && e[y].trim() || e[y + 1] === void 0)) {
          let N = y;
          (e[y + 1] === void 0 && !e[y].trim() || e[y] === ">") && (N += 1), (!o.length || o[o.length - 1][0] !== r.lastOpeningBracketAt) && o.push([r.lastOpeningBracketAt, b + 1]), (!g.length || g[g.length - 1][0] !== r.lastOpeningBracketAt) && g.push([r.lastOpeningBracketAt, b + 1]);
          let w = U(e, y, r.leftOuterWhitespace, N, r.lastOpeningBracketAt, b);
          m.cb({ tag: r, deleteFrom: r.leftOuterWhitespace, deleteTo: N, insert: w, rangesArr: v, proposedReturn: [r.leftOuterWhitespace, N, w] }), l = y - 1, e[y] === ">" && (l = y), r = {}, d = {};
          break;
        }
      }
    }
    !e[l].trim() || e[l].charCodeAt(0) === 847 ? (s === null && (s = l, r.lastOpeningBracketAt !== void 0 && r.lastOpeningBracketAt < l && r.nameStarts && r.nameStarts < r.lastOpeningBracketAt && l === r.lastOpeningBracketAt + 1 && !t.some((p) => p.name === r.name) && (r.onlyPlausible = !0, r.name = void 0, r.nameStarts = void 0)), (e[l] === `
` || e[l] === "\r") && (c = l, u && (u = !1))) : (s !== null && (!r.quotes && d.equalsAt > s - 1 && d.nameEnds && d.equalsAt > d.nameEnds && e[l] !== '"' && e[l] !== "'" && (Ce(d) && r.attributes.push(d), d = {}, r.equalsSpottedAt = void 0), s = null), u || (u = !0, G && !P && typeof c == "number" && l && c < l - 1 && (e.slice(c + 1, l).trim() ? c = null : m.ignoreIndentations || v.push([c + 1, l])))), e[l] === " " ? f === null && (f = l) : f !== null && (f = null), r.name === "script" && (P = !r.slashPresent);
  }
  if (e && !m.ignoreIndentations && (m.trimOnlySpaces && e[0] === " " || !m.trimOnlySpaces && !e[0].trim())) for (let l = 0; l < x; l++) if (m.trimOnlySpaces && e[l] !== " " || !m.trimOnlySpaces && e[l].trim()) {
    v.push([0, l]);
    break;
  } else e[l + 1] || v.push([0, l + 1]);
  if (e && (m.trimOnlySpaces && e[~-e.length] === " " || !m.trimOnlySpaces && !e[~-e.length].trim())) {
    for (let l = e.length; l--; ) if (m.trimOnlySpaces && e[l] !== " " || !m.trimOnlySpaces && e[l].trim()) {
      v.push([l + 1, x]);
      break;
    }
  }
  let R = v.current();
  if (!a?.cb && R && (R[0] && !R[0][0] && (R[0][1], v.ranges[0] = [v.ranges[0][0], v.ranges[0][1]]), R[R.length - 1] && R[R.length - 1][1] === e.length && (R[R.length - 1][0], v.ranges))) {
    let l = v.ranges[v.ranges.length - 1][0];
    e[l - 1] && (m.trimOnlySpaces && e[l - 1] === " " || !m.trimOnlySpaces && !e[l - 1].trim()) && (l -= 1);
    let p = v.ranges[v.ranges.length - 1][2];
    v.ranges[v.ranges.length - 1] = [l, v.ranges[v.ranges.length - 1][1]], p?.trim() && v.ranges[v.ranges.length - 1].push(p.trimEnd());
  }
  return { log: { timeTakenInMilliseconds: Date.now() - n }, result: Gs(e, v.current()), ranges: v.current(), allTagLocations: o, filteredTagLocations: g };
}
class xe {
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
    if (this.features = tl(), this.patches = ol(), !this.features.speechSynthesis || !this.features.speechSynthesisUtterance)
      throw new Error("Web Speech API is not available in this environment");
    this.speechSynthesis = this.features.speechSynthesis, this.speechSynthesisUtterance = this.features.speechSynthesisUtterance;
  }
  // From Easy Speech,
  // Check infinity pattern for long texts (except on problematic platforms)
  // Skip resume infinity for Microsoft Natural voices as they have different behavior 
  shouldUseResumeInfinity() {
    const a = this.currentVoice, n = !!(a?.name && typeof a.name == "string" && a.name.toLocaleLowerCase().includes("(natural)"));
    return this.patches.isAndroid !== !0 && !this.patches.isFirefox && !this.patches.isSafari && !n;
  }
  // Creates a new SpeechSynthesisUtterance using detected constructor
  createUtterance(a) {
    return new this.speechSynthesisUtterance(a);
  }
  async initialize(a = {}) {
    const { maxTimeout: n, interval: t, maxLengthExceeded: i = "warn" } = a;
    if (this.initialized)
      return !1;
    this.maxLengthExceeded = i;
    try {
      return this.voiceManager = await A.initialize(n, t), this.voices = this.voiceManager.getVoices(), this.defaultVoice = this.voiceManager.getDefaultVoice(navigator.languages[0] || "en", this.voices), this.initialized = !0, !0;
    } catch (o) {
      return console.error("Failed to initialize WebSpeechEngine:", o), this.initialized = !1, !1;
    }
  }
  // Text length validation matching EasySpeech
  validateText(a) {
    if (new TextEncoder().encode(a).length > 4096) {
      const t = "Text exceeds max length of 4096 bytes, which may not work with some voices.";
      switch (this.maxLengthExceeded) {
        case "none":
          break;
        case "error":
          throw new Error(`WebSpeechEngine: ${t}`);
        case "warn":
        default:
          console.warn(`WebSpeechEngine: ${t}`);
      }
    }
  }
  getCurrentVoiceForUtterance(a) {
    return a && typeof a == "object" ? a : typeof a == "string" ? this.voices.find((n) => n.name === a || n.language === a) || null : this.currentVoice || this.defaultVoice;
  }
  getCurrentVoice() {
    return this.currentVoice;
  }
  // SSML Escaping
  escapeSSML(a) {
    return a.map((n) => ({
      ...n,
      text: n.ssml ? Na(n.text).result : n.text
    }));
  }
  // Queue Management
  loadUtterances(a) {
    this.currentUtterances = this.escapeSSML(a), this.currentUtteranceIndex = 0, this.setState("ready"), this.emitEvent({ type: "ready" });
  }
  // Voice Configuration
  setVoice(a) {
    const n = this.currentVoice;
    if (typeof a == "string") {
      const t = this.voices.find((i) => i.name === a || i.language === a);
      t ? (this.currentVoice = t, n && n.name !== t.name && (this.currentUtteranceIndex = 0)) : console.warn(`Voice "${a}" not found`);
    } else
      this.currentVoice = a, n && n.name !== a.name && (this.currentUtteranceIndex = 0);
    this.voiceManager && this.defaultVoice && this.currentVoice && this.currentVoice.language !== this.defaultVoice.language && (this.defaultVoice = this.voiceManager.getDefaultVoice(this.currentVoice.language, this.voices));
  }
  getAvailableVoices() {
    return new Promise((a) => {
      this.voices.length > 0 ? a(this.voices) : this.initialize().then(() => {
        a(this.voices);
      }).catch(() => {
        a([]);
      });
    });
  }
  // Playback Control
  speak(a) {
    if (a !== void 0) {
      if (a < 0 || a >= this.currentUtterances.length)
        throw new Error("Invalid utterance index");
      this.currentUtteranceIndex = a;
    }
    if (this.currentUtterances.length === 0) {
      console.warn("No utterances loaded");
      return;
    }
    this.cancelCurrentSpeech(), this.isSpeakingInternal = !0, this.isPausedInternal = !1, this.setState("playing"), this.emitEvent({ type: "start" }), this.stopResumeInfinity(), this.currentUtteranceIndex = a ?? 0, this.currentUtteranceIndex >= this.currentUtterances.length && (this.currentUtteranceIndex = 0), this.speakCurrentUtterance();
  }
  cancelCurrentSpeech() {
    this.patches.isFirefox && this.speechSynthesis.speaking && (this.utterancesBeingCancelled = !0, setTimeout(() => {
      this.utterancesBeingCancelled = !1;
    }, 100)), this.speechSynthesis.cancel();
  }
  speakCurrentUtterance() {
    if (this.currentUtteranceIndex >= this.currentUtterances.length) {
      this.setState("idle"), this.emitEvent({ type: "end" });
      return;
    }
    const a = this.currentUtterances[this.currentUtteranceIndex], n = (a.ssml, a.text);
    this.validateText(n);
    const t = this.createUtterance(n), i = this.getCurrentVoiceForUtterance(this.currentVoice);
    if (i && this.voiceManager) {
      const o = this.voiceManager.convertToSpeechSynthesisVoice(i);
      o && (t.voice = o, t.lang = o.lang);
    }
    a.language && (t.lang = a.language), t.rate = this.rate, t.pitch = this.pitch, t.volume = this.volume, t.onstart = () => {
      this.isSpeakingInternal = !0, this.isPausedInternal = !1, this.setState("playing"), this.emitEvent({ type: "start" }), this.patches.isAndroid && this.isAndroidPaused && (this.isAndroidPaused = !1), this.shouldUseResumeInfinity() && this.startResumeInfinity(t);
    }, t.onend = () => {
      if (this.utterancesBeingCancelled) {
        this.utterancesBeingCancelled = !1;
        return;
      }
      this.playbackState !== "idle" && (this.isSpeakingInternal = !1, this.isPausedInternal = !1, this.stopResumeInfinity(), this.currentUtteranceIndex >= this.currentUtterances.length - 1 && this.setState("idle"), this.emitEvent({ type: "end" }));
    }, t.onerror = (o) => {
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
    }, t.onpause = () => {
      this.isPausedInternal = !0, this.isSpeakingInternal = !1, this.emitEvent({ type: "pause" });
    }, t.onresume = () => {
      this.isPausedInternal = !1, this.isSpeakingInternal = !0, this.emitEvent({ type: "resume" });
    }, t.onboundary = (o) => {
      this.emitEvent({
        type: "boundary",
        detail: {
          charIndex: o.charIndex,
          charLength: o.charLength,
          elapsedTime: o.elapsedTime,
          name: o.name
        }
      });
    }, t.onmark = (o) => {
      this.emitEvent({
        type: "mark",
        detail: {
          name: o.name
        }
      });
    }, this.speechSynthesis.speak(t);
  }
  startResumeInfinity(a) {
    this.shouldUseResumeInfinity() && (this.resumeInfinityTimer = window.setTimeout(() => {
      if (a) {
        const { paused: t, speaking: i } = this.speechSynthesis, o = i || this.isSpeakingInternal, g = t || this.isPausedInternal;
        o && !g && (this.speechSynthesis.pause(), this.speechSynthesis.resume());
      }
      this.startResumeInfinity(a);
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
    this.speechSynthesis.cancel(), this.currentUtteranceIndex = 0, this.patches.isAndroid && (this.isAndroidPaused = !1), this.setState("idle"), this.emitEvent({ type: "stop" });
  }
  // Playback Parameters
  setRate(a) {
    this.rate = Math.max(0.1, Math.min(10, a));
  }
  getRate() {
    return this.rate;
  }
  setPitch(a) {
    this.pitch = Math.max(0, Math.min(2, a));
  }
  getPitch() {
    return this.pitch;
  }
  setVolume(a) {
    this.volume = Math.max(0, Math.min(1, a));
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
  setCurrentUtteranceIndex(a, n) {
    if (a < 0 || a >= this.currentUtterances.length) {
      n?.(!1);
      return;
    }
    a !== this.currentUtteranceIndex && (!this.isPausedInternal && this.isSpeakingInternal && this.cancelCurrentSpeech(), this.currentUtteranceIndex = a, n?.(!0));
  }
  getUtteranceCount() {
    return this.currentUtterances.length;
  }
  // Events
  on(a, n) {
    return this.eventListeners.has(a) || this.eventListeners.set(a, []), this.eventListeners.get(a).push(n), () => {
      const t = this.eventListeners.get(a);
      if (t) {
        const i = t.indexOf(n);
        i > -1 && t.splice(i, 1);
      }
    };
  }
  emitEvent(a) {
    const n = this.eventListeners.get(a.type);
    n && n.forEach((t) => t(a));
  }
  setState(a) {
    const n = this.playbackState;
    if (this.playbackState = a, n !== a)
      switch (a) {
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
    this.stop(), this.stopResumeInfinity(), this.eventListeners.clear(), this.currentUtterances = [], this.currentVoice = null, this.voices = [], this.defaultVoice = null, this.initialized = !1;
  }
}
class zs {
  id = "webspeech";
  name = "Web Speech API";
  engine = null;
  async getVoices() {
    if (!this.engine)
      throw new Error("No engine available. Create an engine first.");
    return this.engine.getAvailableVoices();
  }
  async createEngine(a) {
    const n = new xe();
    return await n.initialize(), a && await n.setVoice(a), n;
  }
  async destroy() {
    this.engine && (await this.engine.destroy(), this.engine = null);
  }
}
class Bs {
  engine;
  contentQueue = [];
  eventListeners = /* @__PURE__ */ new Map();
  // Navigator owns the state, not the engine
  navigatorState = "idle";
  constructor(a) {
    this.engine = a || new xe(), this.setupEngineListeners(), this.initializeEngine();
  }
  async initializeEngine() {
    if (this.engine instanceof xe)
      try {
        await this.engine.initialize();
      } catch (a) {
        console.warn("Failed to initialize WebSpeechEngine:", a);
      }
  }
  setupEngineListeners() {
    this.engine.on("start", () => {
      this.setNavigatorState("playing"), this.emitEvent({ type: "start" });
    }), this.engine.on("end", () => {
      const a = this.engine.getCurrentUtteranceIndex(), n = this.engine.getUtteranceCount();
      a < n - 1 ? this.engine.speak(a + 1) : this.setNavigatorState("idle"), this.emitEvent({ type: "end" });
    }), this.engine.on("pause", () => {
      this.setNavigatorState("paused"), this.emitEvent({ type: "pause" });
    }), this.engine.on("resume", () => {
      this.setNavigatorState("playing"), this.emitEvent({ type: "resume" });
    }), this.engine.on("stop", () => {
      this.setNavigatorState("idle"), this.emitEvent({ type: "stop" });
    }), this.engine.on("error", (a) => {
      this.setNavigatorState("idle"), this.emitEvent(a);
    }), this.engine.on("ready", () => {
      this.contentQueue.length > 0 && (this.setNavigatorState("ready"), this.emitEvent({ type: "ready" }));
    }), this.engine.on("boundary", (a) => {
      this.emitEvent(a);
    }), this.engine.on("mark", (a) => {
      this.emitEvent(a);
    }), this.engine.on("voiceschanged", () => {
      this.emitEvent({ type: "voiceschanged" });
    });
  }
  setNavigatorState(a) {
    this.navigatorState = a;
  }
  // Voice Management
  async getVoices() {
    return this.engine.getAvailableVoices();
  }
  setVoice(a) {
    this.engine.setVoice(a);
  }
  getCurrentVoice() {
    return this.engine.getCurrentVoice();
  }
  // Content Management
  loadContent(a) {
    const n = Array.isArray(a) ? a : [a];
    this.contentQueue = [...n], this.engine.loadUtterances(n), this.setNavigatorState("ready"), this.emitContentChangeEvent({ content: n });
  }
  getCurrentContent() {
    const a = this.getCurrentUtteranceIndex();
    return a < this.contentQueue.length ? this.contentQueue[a] : null;
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
  skipToPosition(a, n = !1) {
    const t = this.getCurrentUtteranceIndex();
    return a < 0 || a >= this.contentQueue.length ? !1 : (a === t || (this.navigatorState === "paused" && !n ? this.engine.setCurrentUtteranceIndex(a, (i) => {
      i && this.emitEvent({
        type: "skip",
        detail: { position: a }
      });
    }) : (this.setNavigatorState("playing"), this.engine.speak(a))), !0);
  }
  // Navigation - Navigator coordinates with proper state management
  next(a = !1) {
    const n = this.getCurrentUtteranceIndex();
    return this.skipToPosition(n + 1, a);
  }
  previous(a = !1) {
    const n = this.getCurrentUtteranceIndex();
    return this.skipToPosition(n - 1, a);
  }
  jumpTo(a, n = !1) {
    return this.skipToPosition(a, n);
  }
  // Playback Parameters
  setRate(a) {
    this.engine.setRate(a);
  }
  getRate() {
    return this.engine.getRate();
  }
  setPitch(a) {
    this.engine.setPitch(a);
  }
  getPitch() {
    return this.engine.getPitch();
  }
  setVolume(a) {
    this.engine.setVolume(a);
  }
  getVolume() {
    return this.engine.getVolume();
  }
  // State - Navigator is the single source of truth
  getState() {
    return this.navigatorState;
  }
  // Events
  on(a, n) {
    return this.eventListeners.has(a) || this.eventListeners.set(a, []), this.eventListeners.get(a).push(n), () => {
      const t = this.eventListeners.get(a);
      if (t) {
        const i = t.indexOf(n);
        i > -1 && t.splice(i, 1);
      }
    };
  }
  emitEvent(a) {
    const n = this.eventListeners.get(a.type);
    n && n.forEach((t) => t(a));
  }
  emitContentChangeEvent(a) {
    const n = this.eventListeners.get("contentchange");
    n && n.forEach((t) => t({ type: "contentchange", detail: a }));
  }
  async destroy() {
    this.eventListeners.clear(), await this.engine.destroy();
  }
}
export {
  xe as WebSpeechEngine,
  zs as WebSpeechEngineProvider,
  Bs as WebSpeechReadAloudNavigator,
  A as WebSpeechVoiceManager,
  te as chineseVariantMap,
  Us as getAvailableLanguages,
  Ue as getTestUtterance,
  Le as getVoices
};
