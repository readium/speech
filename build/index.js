const wa = ["Albert", "Bad News", "Bahh", "Bells", "Boing", "Bubbles", "Cellos", "Good News", "Jester", "Organ", "Superstar", "Trinoids", "Whisper", "Wobble", "Zarvox"], za = ["Eddy", "Flo", "Grandma", "Grandpa", "Jacques", "Reed", "Rocko", "Sandy", "Shelley", "Fred", "Junior", "Kathy", "Ralph", "eSpeak Arabic", "eSpeak Bulgarian", "eSpeak Bengali", "eSpeak Catalan", "eSpeak Chinese (Mandarin, latin as English)", "eSpeak Czech", "eSpeak Danish", "eSpeak German", "eSpeak Greek", "eSpeak Spanish (Spain)", "eSpeak Estonian", "eSpeak Finnish", "eSpeak Gujarati", "eSpeak Croatian", "eSpeak Hungarian", "eSpeak Indonesian", "eSpeak Italian", "eSpeak Kannada", "eSpeak Korean", "eSpeak Lithuanian", "eSpeak Latvian", "eSpeak Malayalm", "eSpeak Marathi", "eSpeak Malay", "eSpeak Norwegian Bokmål", "eSpeak Polish", "eSpeak Portuguese (Brazil)", "eSpeak Romanian", "eSpeak Russian", "eSpeak Slovak", "eSpeak Slovenian", "eSpeak Serbian", "eSpeak Swedish", "eSpeak Swahili", "eSpeak Tamil", "eSpeak Telugu", "eSpeak Turkish", "eSpeak Vietnamese (Northern)"], ka = [{ label: "Amina", name: "Microsoft Amina Online (Natural) - Arabic (Algeria)", language: "ar-DZ", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Ismael", name: "Microsoft Ismael Online (Natural) - Arabic (Algeria)", language: "ar-DZ", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Laila", name: "Microsoft Laila Online (Natural) - Arabic (Bahrain)", language: "ar-BH", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Ali", name: "Microsoft Ali Online (Natural) - Arabic (Bahrain)", language: "ar-BH", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Salma", name: "Microsoft Salma Online (Natural) - Arabic (Egypt)", language: "ar-EG", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Shakir", name: "Microsoft Shakir Online (Natural) - Arabic (Egypt)", language: "ar-EG", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Rana", name: "Microsoft Rana Online (Natural) - Arabic (Iraq)", language: "ar-IQ", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Bassel", name: "Microsoft Bassel Online (Natural) - Arabic (Iraq)", language: "ar-IQ", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Sana", name: "Microsoft Sana Online (Natural) - Arabic (Jordan)", language: "ar-JO", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Taim", name: "Microsoft Taim Online (Natural) - Arabic (Jordan)", language: "ar-JO", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Noura", name: "Microsoft Noura Online (Natural) - Arabic (Kuwait)", language: "ar-KW", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Fahed", name: "Microsoft Fahed Online (Natural) - Arabic (Kuwait)", language: "ar-KW", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Layla", name: "Microsoft Layla Online (Natural) - Arabic (Lebanon)", language: "ar-LB", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Rami", name: "Microsoft Rami Online (Natural) - Arabic (Lebanon)", language: "ar-LB", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Iman", name: "Microsoft Iman Online (Natural) - Arabic (Libya)", language: "ar-LY", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Omar", name: "Microsoft Omar Online (Natural) - Arabic (Libya)", language: "ar-LY", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Mouna", name: "Microsoft Mouna Online (Natural) - Arabic (Morocco)", language: "ar-MA", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Jamal", name: "Microsoft Jamal Online (Natural) - Arabic (Morocco)", language: "ar-MA", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Aysha", name: "Microsoft Aysha Online (Natural) - Arabic (Oman)", language: "ar-OM", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Abdullah", name: "Microsoft Abdullah Online (Natural) - Arabic (Oman)", language: "ar-OM", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Amal", name: "Microsoft Amal Online (Natural) - Arabic (Qatar)", language: "ar-QA", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Moaz", name: "Microsoft Moaz Online (Natural) - Arabic (Qatar)", language: "ar-QA", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Zariyah", name: "Microsoft Zariyah Online (Natural) - Arabic (Saudi Arabia)", language: "ar-SA", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Hamed", name: "Microsoft Hamed Online (Natural) - Arabic (Saudi Arabia)", language: "ar-SA", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Amany", name: "Microsoft Amany Online (Natural) - Arabic (Syria)", language: "ar-SY", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Laith", name: "Microsoft Laith Online (Natural) - Arabic (Syria)", language: "ar-SY", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Reem", name: "Microsoft Reem Online (Natural) - Arabic (Tunisia)", language: "ar-TN", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Hedi", name: "Microsoft Hedi Online (Natural) - Arabic (Tunisia)", language: "ar-TN", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Fatima", name: "Microsoft Fatima Online (Natural) - Arabic (United Arab Emirates)", language: "ar-AE", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Hamdan", name: "Microsoft Hamdan Online (Natural) - Arabic (United Arab Emirates)", language: "ar-AE", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Maryam", name: "Microsoft Maryam Online (Natural) - Arabic (Yemen)", language: "ar-YE", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Saleh", name: "Microsoft Saleh Online (Natural) - Arabic (Yemen)", language: "ar-YE", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Mariam", name: "Mariam", language: "ar-001", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Apple Laila", name: "Laila", language: "ar-001", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Tarik", name: "Tarik", language: "ar-001", gender: "male", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Majed", name: "Majed", language: "ar-001", gender: "male", quality: ["low", "normal", "high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Hoda", name: "Microsoft Hoda - Arabic (Arabic )", language: "ar-EG", gender: "female", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Naayf", name: "Microsoft Naayf - Arabic (Saudi Arabia)", language: "ar-AS", gender: "male", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "صوت انثوي 1", name: "Android Speech Recognition and Synthesis from Google ar-xa-x-arc-network", altNames: ["Android Speech Recognition and Synthesis from Google ar-xa-x-arc-local", "Android Speech Recognition and Synthesis from Google ar-language"], language: "ar", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "صوت انثوي 2", name: "Android Speech Recognition and Synthesis from Google ar-xa-x-arz-network", altNames: ["Android Speech Recognition and Synthesis from Google ar-xa-x-arz-local"], language: "ar", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "صوت ذكر 1", name: "Android Speech Recognition and Synthesis from Google ar-xa-x-ard-network", altNames: ["Android Speech Recognition and Synthesis from Google ar-xa-x-ard-local"], language: "ar", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "صوت ذكر 2", name: "Android Speech Recognition and Synthesis from Google ar-xa-x-are-network", altNames: ["Android Speech Recognition and Synthesis from Google ar-xa-x-are-local"], language: "ar", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Kalina", name: "Microsoft Kalina Online (Natural) - Bulgarian (Bulgaria)", language: "bg-BG", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Borislav", name: "Microsoft Borislav Online (Natural) - Bulgarian (Bulgaria)", language: "bg-BG", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Daria", name: "Daria", language: "bg-BG", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Ivan", name: "Microsoft Ivan - Bulgarian (Bulgaria)", language: "bg-BG", gender: "male", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Женски глас", name: "Android Speech Recognition and Synthesis from Google bg-bg-x-ifk-network", altNames: ["Android Speech Recognition and Synthesis from Google bg-bg-x-ifk-local", "Android Speech Recognition and Synthesis from Google bg-bg-language"], language: "bg-BG", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Jaya", name: "Jaya", language: "bho-IN", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Tanishaa", name: "Microsoft Tanishaa Online (Natural) - Bengali (India)", language: "bn-IN", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Bashkar", name: "Microsoft Bashkar Online (Natural) - Bangla (India)", language: "bn-IN", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Nabanita", name: "Microsoft Nabanita Online (Natural) - Bangla (Bangladesh)", language: "bn-BD", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Pradeep", name: "Microsoft Pradeep Online (Natural) - Bangla (Bangladesh)", language: "bn-BD", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Piya", name: "Piya", language: "bn-IN", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "মহিলা কণ্ঠস্বর 1", name: "Android Speech Recognition and Synthesis from Google bn-in-x-bnf-network", altNames: ["Android Speech Recognition and Synthesis from Google bn-in-x-bnf-local", "Android Speech Recognition and Synthesis from Google bn-IN-language"], language: "bn-IN", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "মহিলা কণ্ঠস্বর 2", name: "Android Speech Recognition and Synthesis from Google bn-in-x-bnx-network", altNames: ["Android Speech Recognition and Synthesis from Google bn-in-x-bnx-local"], language: "bn-IN", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "পুরুষ কন্ঠ 1", name: "Android Speech Recognition and Synthesis from Google bn-in-x-bin-network", altNames: ["Android Speech Recognition and Synthesis from Google bn-in-x-bin-local"], language: "bn-IN", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "পুরুষ কন্ঠ 2", name: "Android Speech Recognition and Synthesis from Google bn-in-x-bnm-network", altNames: ["Android Speech Recognition and Synthesis from Google bn-in-x-bnm-local"], language: "bn-IN", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "পুরুষ কন্ঠ", name: "Google বাংলা (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google bn-bd-x-ban-network", "Chrome OS বাংলা", "Android Speech Recognition and Synthesis from Google bn-bd-x-ban-local", "Android Speech Recognition and Synthesis from Google bn-BD-language"], language: "bn-BD", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Joana (Català)", name: "Microsoft Joana Online (Natural) - Catalan (Spain)", language: "ca-ES", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Enric (Català)", name: "Microsoft Enric Online (Natural) - Catalan (Spain)", language: "ca-ES", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Montse (Català)", name: "Montse", language: "ca-ES", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Pau (Valencià)", name: "Pau", language: "ca-ES-u-sd-esvc", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Jordi (Català)", name: "Jordi", language: "ca-ES", gender: "male", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Herena (Català)", name: "Microsoft Herena - Catalan (Spain)", language: "ca-ES", gender: "female", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Veu femenina catalana", name: "Android Speech Recognition and Synthesis from Google ca-es-x-caf-network", altNames: ["Android Speech Recognition and Synthesis from Google ca-es-x-caf-local", "Android Speech Recognition and Synthesis from Google ca-ES-language"], language: "ca-ES", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Xiaoxiao", name: "Microsoft Xiaoxiao Online (Natural) - Chinese (Mainland)", language: "cmn-CN", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Xiaoyi", name: "Microsoft Xiaoyi Online (Natural) - Chinese (Mainland)", language: "cmn-CN", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Yunxi", name: "Microsoft Yunxi Online (Natural) - Chinese (Mainland)", language: "cmn-CN", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Yunxia", name: "Microsoft Yunxia Online (Natural) - Chinese (Mainland)", language: "cmn-CN", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Xiaobei", name: "Microsoft Xiaobei Online (Natural) - Chinese (Northeastern Mandarin)", language: "cmn-CN-liaoning", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Xiaoni", name: "Microsoft Xiaoni Online (Natural) - Chinese (Zhongyuan Mandarin Shaanxi)", language: "cmn-CN-shaanxi", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Yunjian", name: "Microsoft Yunjian Online (Natural) - Chinese (Mainland)", language: "cmn-CN", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Yunyang", name: "Microsoft Yunyang Online (Natural) - Chinese (Mainland)", language: "cmn-CN", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "HsiaoChen", name: "Microsoft HsiaoChen Online (Natural) - Chinese (Taiwan)", language: "cmn-TW", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "HsiaoYu", name: "Microsoft HsiaoYu Online (Natural) - Chinese (Taiwanese Mandarin)", language: "cmn-TW", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "YunJhe", name: "Microsoft YunJhe Online (Natural) - Chinese (Taiwan)", language: "cmn-TW", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Lilian", name: "Lilian", language: "cmn-CN", gender: "female", quality: ["normal", "high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Tiantian", name: "Tiantian", language: "cmn-CN", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Shasha", name: "Shasha", language: "cmn-CN", gender: "female", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Lili", name: "Lili", language: "cmn-CN", gender: "female", quality: ["low", "normal", "high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Lisheng", name: "Lisheng", language: "cmn-CN", gender: "female", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Lanlan", name: "Lanlan", language: "cmn-CN", gender: "female", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Shanshan", name: "Shanshan", language: "cmn-CN", gender: "female", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Yue", name: "Yue", language: "cmn-CN", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Tingting", name: "Tingting", language: "cmn-CN", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Yu-shu", name: "Yu-shu", language: "cmn-CN", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Dongmei", name: "Dongmei", language: "cmn-CN-liaoning", gender: "female", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Panpan", name: "Panpan", language: "cmn-CN-sichuan", gender: "female", quality: ["low", "high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Meijia", name: "Meijia", language: "cmn-TW", gender: "female", quality: ["low", "high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Han", name: "Han", language: "cmn-CN", gender: "male", quality: ["low", "normal", "high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Bobo", name: "Bobo", language: "cmn-CN", gender: "male", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Taotao", name: "Taotao", language: "cmn-CN", gender: "male", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Binbin", name: "Binbin", language: "cmn-CN", gender: "male", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Li-Mu", name: "Li-Mu", language: "cmn-CN", gender: "male", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Haohao", name: "Haohao", language: "cmn-CN-shaanxi", gender: "male", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Google 女声", name: "Google 普通话（中国大陆）", language: "cmn-CN", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Google 女聲", name: "Google 國語（臺灣）", language: "cmn-TW", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Huihui", name: "Microsoft Huihui - Chinese (Simplified, PRC)", language: "cmn-CN", gender: "female", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Yaoyao", name: "Microsoft Yaoyao - Chinese (Simplified, PRC)", language: "cmn-CN", gender: "female", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Kangkang", name: "Microsoft Kangkang - Chinese (Simplified, PRC)", language: "cmn-CN", gender: "male", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Yating", name: "Microsoft Yating - Chinese (Traditional, Taiwan)", language: "cmn-TW", gender: "female", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Hanhan", name: "Microsoft Hanhan - Chinese (Traditional, Taiwan)", language: "cmn-TW", gender: "female", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Zhiwei", name: "Microsoft Zhiwei - Chinese (Traditional, Taiwan)", language: "cmn-TW", gender: "male", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "女声1", name: "Android Speech Recognition and Synthesis from Google cmn-CN-x-ccc-network", altNames: ["Android Speech Recognition and Synthesis from Google cmn-CN-x-ccc-local", "Android Speech Recognition and Synthesis from Google zh-CN-language"], language: "cmn-CN", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "女声2", name: "Android Speech Recognition and Synthesis from Google cmn-CN-x-ssa-network", altNames: ["Android Speech Recognition and Synthesis from Google cmn-CN-x-ssa-local"], language: "cmn-CN", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "男声1", name: "Android Speech Recognition and Synthesis from Google cmn-CN-x-ccd-network", altNames: ["Android Speech Recognition and Synthesis from Google cmn-CN-x-ccd-local"], language: "cmn-CN", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "男声2", name: "Android Speech Recognition and Synthesis from Google cmn-CN-x-cce-network", altNames: ["Android Speech Recognition and Synthesis from Google cmn-CN-x-cce-local"], language: "cmn-CN", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "女聲", name: "Android Speech Recognition and Synthesis from Google cmn-TW-x-ctc-network", altNames: ["Android Speech Recognition and Synthesis from Google cmn-TW-x-ctc-local", "Android Speech Recognition and Synthesis from Google zh-TW-language"], language: "cmn-TW", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "男聲1", name: "Android Speech Recognition and Synthesis from Google cmn-TW-x-ctd-network", altNames: ["Chrome OS 粵語 1", "Android Speech Recognition and Synthesis from Google cmn-TW-x-ctd-local"], language: "cmn-TW", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "男聲2", name: "Android Speech Recognition and Synthesis from Google cmn-TW-x-cte-network", altNames: ["Chrome OS 粵語 1", "Android Speech Recognition and Synthesis from Google cmn-TW-x-cte-local"], language: "cmn-CTW", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Vlasta", name: "Microsoft Vlasta Online (Natural) - Czech (Czech)", language: "cs-CZ", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Antonin", name: "Microsoft Antonin Online (Natural) - Czech (Czech)", language: "cs-CZ", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Zuzana", name: "Zuzana", language: "cs-CZ", gender: "female", quality: ["low", "normal", "high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Iveta", name: "Iveta", language: "cs-CZ", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Jakub", name: "Microsoft Jakub - Czech (Czech)", language: "cs-CZ", gender: "male", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Ženský hlas", name: "Google čeština (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google cs-cz-x-jfs-network", "Chrome OS čeština", "Android Speech Recognition and Synthesis from Google cs-cz-x-jfs-local", "Android Speech Recognition and Synthesis from Google cs-CZ-language"], language: "cs-CZ", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Christel", name: "Microsoft Christel Online (Natural) - Danish (Denmark)", language: "da-DK", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Jeppe", name: "Microsoft Jeppe Online (Natural) - Danish (Denmark)", language: "da-DK", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Sara", name: "Sara", language: "da-DK", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Magnus", name: "Magnus", language: "da-DK", gender: "male", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Helle", name: "Microsoft Helle - Danish (Denmark)", language: "da-DK", gender: "female", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Kvindestemme 1", name: "Google Dansk 1 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google da-dk-x-kfm-network", "Chrome OS Dansk 1", "Android Speech Recognition and Synthesis from Google da-dk-x-kfm-local", "Android Speech Recognition and Synthesis from Google da-DK-language"], language: "da-DK", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Kvindestemme 2", name: "Google Dansk 3 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google da-dk-x-sfp-network", "Chrome OS Dansk 3", "Android Speech Recognition and Synthesis from Google da-dk-x-sfp-local"], language: "da-DK", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Kvindestemme 3", name: "Google Dansk 4 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google da-dk-x-vfb-network", "Chrome OS Dansk 4", "Android Speech Recognition and Synthesis from Google da-dk-x-vfb-local"], language: "da-DK", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Mandsstemme", name: "Google Dansk 2 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google da-dk-x-nmm-network", "Chrome OS Dansk 2", "Android Speech Recognition and Synthesis from Google da-dk-x-nmm-local"], language: "da-DK", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Seraphina", name: "Microsoft SeraphinaMultilingual Online (Natural) - German (Germany)", language: "de-DE", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Amala", name: "Microsoft Amala Online (Natural) - German (Germany)", language: "de-DE", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Katja", name: "Microsoft Katja Online (Natural) - German (Germany)", language: "de-DE", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Florian", name: "Microsoft FlorianMultilingual Online (Natural) - German (Germany)", language: "de-DE", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Conrad", name: "Microsoft Conrad Online (Natural) - German (Germany)", language: "de-DE", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Killian", name: "Microsoft Killian Online (Natural) - German (Germany)", language: "de-DE", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Ingrid", name: "Microsoft Ingrid Online (Natural) - German (Austria)", language: "de-AT", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Jonas", name: "Microsoft Jonas Online (Natural) - German (Austria)", language: "de-AT", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Leni", name: "Microsoft Leni Online (Natural) - German (Switzerland)", language: "de-CH", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Jan", name: "Microsoft Jan Online (Natural) - German (Switzerland)", language: "de-CH", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Petra", name: "Petra", language: "de-DE", gender: "female", quality: ["low", "normal", "high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Anna", name: "Anna", language: "de-DE", gender: "female", quality: ["low", "normal", "high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Helena", name: "Helena", language: "de-DE", gender: "female", quality: ["low"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Markus", name: "Markus", language: "de-DE", gender: "male", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Viktor", name: "Viktor", language: "de-DE", gender: "male", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Yannick", name: "Yannick", language: "de-DE", gender: "male", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Martin", name: "Martin", language: "de-DE", gender: "male", quality: ["low"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Google Deutsch", name: "Weibliche Google-Stimme (Deutschland)", language: "de-DE", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Hedda", name: "Microsoft Hedda - German (Germany)", language: "de-DE", gender: "female", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Katja", name: "Microsoft Katja - German (Germany)", language: "de-DE", gender: "female", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Stefan", name: "Microsoft Stefan - German (Germany)", language: "de-DE", gender: "male", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Michael", name: "Microsoft Michael - German (Austria)", language: "de-AT", gender: "male", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Karsten", name: "Microsoft Karsten - German (Switzerland)", language: "de-CH", gender: "male", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Weibliche Stimme 1 (Deutschland)", name: "Google Deutsch 2 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google de-de-x-dea-network", "Chrome OS Deutsch 2", "Android Speech Recognition and Synthesis from Google de-de-x-dea-local", "Android Speech Recognition and Synthesis from Google de-DE-language"], language: "de-DE", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Weibliche Stimme 2 (Deutschland)", name: "Google Deutsch 1 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google de-de-x-nfh-network", "Chrome OS Deutsch 1", "Android Speech Recognition and Synthesis from Google de-de-x-nfh-local"], language: "de-DE", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Männliche Stimme 1 (Deutschland)", name: "Google Deutsch 3 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google de-de-x-deb-network", "Chrome OS Deutsch 3", "Android Speech Recognition and Synthesis from Google de-de-x-deb-local"], language: "de-DE", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Männliche Stimme 2 (Deutschland)", name: "Google Deutsch 4 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google de-de-x-deg-network", "Chrome OS Deutsch 4", "Android Speech Recognition and Synthesis from Google de-de-x-deg-local"], language: "de-DE", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Athina", name: "Microsoft Athina Online (Natural) - Greek (Greece)", language: "el-GR", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Nestoras", name: "Microsoft Nestoras Online (Natural) - Greek (Greece)", language: "el-GR", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Melina", name: "Melina", language: "el-GR", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Nikos", name: "Nikos", language: "el-GR", gender: "male", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Stefanos", name: "Microsoft Stefanos - Greek (Greece)", language: "el-GR", gender: "female", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Γυναικεία φωνή", name: "Google Ελληνικά (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google el-gr-x-vfz-network", "Chrome OS Ελληνικά", "Android Speech Recognition and Synthesis from Google el-gr-x-vfz-local", "Android Speech Recognition and Synthesis from Google el-GR-language"], language: "el-GR", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Emma", name: "Microsoft EmmaMultilingual Online (Natural) - English (United States)", altNames: ["Microsoft Emma Online (Natural) - English (United States)"], language: "en-US", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Microsoft Ava", name: "Microsoft AvaMultilingual Online (Natural) - English (United States)", altNames: ["Microsoft Ava Online (Natural) - English (United States)"], language: "en-US", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Jenny", name: "Microsoft Jenny Online (Natural) - English (United States)", language: "en-US", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Aria", name: "Microsoft Aria Online (Natural) - English (United States)", language: "en-US", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Michelle", name: "Microsoft Michelle Online (Natural) - English (United States)", language: "en-US", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Ana", name: "Microsoft Ana Online (Natural) - English (United States)", language: "en-US", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Andrew", name: "Microsoft AndrewMultilingual Online (Natural) - English (United States)", altNames: ["Microsoft Andrew Online (Natural) - English (United States)"], language: "en-US", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Brian", name: "Microsoft BrianMultilingual Online (Natural) - English (United States)", altNames: ["Microsoft Brian Online (Natural) - English (United States)"], language: "en-US", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Guy", name: "Microsoft Guy Online (Natural) - English (United States)", language: "en-US", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Eric", name: "Microsoft Eric Online (Natural) - English (United States)", language: "en-US", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Steffan", name: "Microsoft Steffan Online (Natural) - English (United States)", language: "en-US", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Christopher", name: "Microsoft Christopher Online (Natural) - English (United States)", language: "en-US", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Roger", name: "Microsoft Roger Online (Natural) - English (United States)", language: "en-US", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Sonia", name: "Microsoft Sonia Online (Natural) - English (United Kingdom)", language: "en-GB", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Libby", name: "Microsoft Libby Online (Natural) - English (United Kingdom)", language: "en-GB", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Maisie", name: "Microsoft Maisie Online (Natural) - English (United Kingdom)", language: "en-GB", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Ryan", name: "Microsoft Ryan Online (Natural) - English (United Kingdom)", language: "en-GB", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Thomas", name: "Microsoft Thomas Online (Natural) - English (United Kingdom)", language: "en-GB", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Natasha", name: "Microsoft Natasha Online (Natural) - English (Australia)", language: "en-AU", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Hayley", name: "Microsoft Hayley Online - English (Australia)", language: "en-AU", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "William", name: "Microsoft William Online (Natural) - English (Australia)", language: "en-AU", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Clara", name: "Microsoft Clara Online (Natural) - English (Canada)", language: "en-CA", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Heather", name: "Microsoft Heather Online - English (Canada)", language: "en-CA", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Liam", name: "Microsoft Liam Online (Natural) - English (Canada)", language: "en-CA", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Neerja", name: "Microsoft Neerja Online (Natural) - English (India)", altNames: ["Microsoft Neerja Online (Natural) - English (India) (Preview)"], language: "en-IN", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Prabhat", name: "Microsoft Prabhat Online (Natural) - English (India)", language: "en-IN", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Emily", name: "Microsoft Emily Online (Natural) - English (Ireland)", language: "en-IE", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Connor", name: "Microsoft Connor Online (Natural) - English (Ireland)", language: "en-IE", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Leah", name: "Microsoft Leah Online (Natural) - English (South Africa)", language: "en-ZA", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Luke", name: "Microsoft Luke Online (Natural) - English (South Africa)", language: "en-ZA", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Yan", name: "Microsoft Yan Online (Natural) - English (Hongkong)", language: "en-HK", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Sam", name: "Microsoft Sam Online (Natural) - English (Hongkong)", language: "en-HK", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Asilia", name: "Microsoft Asilia Online (Natural) - English (Kenya)", language: "en-KE", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Chilemba", name: "Microsoft Chilemba Online (Natural) - English (Kenya)", language: "en-KE", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Molly", name: "Microsoft Molly Online (Natural) - English (New Zealand)", language: "en-NZ", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Mitchell", name: "Microsoft Mitchell Online (Natural) - English (New Zealand)", language: "en-NZ", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Ezinne", name: "Microsoft Ezinne Online (Natural) - English (Nigeria)", language: "en-NG", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Abeo", name: "Microsoft Abeo Online (Natural) - English (Nigeria)", language: "en-NG", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Luna", name: "Microsoft Luna Online (Natural) - English (Singapore)", language: "en-SG", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Wayne", name: "Microsoft Wayne Online (Natural) - English (Singapore)", language: "en-SG", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Imani", name: "Microsoft Imani Online (Natural) - English (Tanzania)", language: "en-TZ", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Elimu", name: "Microsoft Elimu Online (Natural) - English (Tanzania)", language: "en-TZ", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Apple Ava", name: "Ava", language: "en-US", gender: "female", quality: ["low", "normal", "high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Zoe", name: "Zoe", language: "en-US", gender: "female", quality: ["low", "normal", "high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Allison", name: "Allison", language: "en-US", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Nicky", name: "Nicky", language: "en-US", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Samantha", name: "Samantha", language: "en-US", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Joelle", name: "Joelle", language: "en-US", gender: "female", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Evan", name: "Evan", language: "en-US", gender: "male", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Nathan", name: "Nathan", language: "en-US", gender: "male", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Tom", name: "Tom", language: "en-US", gender: "male", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Alex", name: "Alex", language: "en-US", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Aaron", name: "Aaron", language: "en-US", gender: "male", quality: ["low"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Kate", name: "Kate", language: "en-GB", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Stephanie", name: "Stephanie", language: "en-GB", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Serena", name: "Serena", language: "en-GB", gender: "female", quality: ["low", "normal", "high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Martha", name: "Martha", language: "en-GB", gender: "female", quality: ["low"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Jamie", name: "Jamie", language: "en-GB", gender: "male", quality: ["low", "normal", "high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Oliver", name: "Oliver", language: "en-GB", gender: "male", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Daniel", name: "Daniel", language: "en-GB", gender: "male", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Arthur", name: "Arthur", language: "en-GB", gender: "male", quality: ["low"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Matilda", name: "Matilda", language: "en-AU", gender: "female", quality: ["low", "normal", "high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Karen", name: "Karen", language: "en-AU", gender: "female", quality: ["low", "normal", "high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Catherine", name: "Catherine", language: "en-AU", gender: "female", quality: ["low"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Lee", name: "Lee", language: "en-AU", gender: "male", quality: ["low", "normal", "high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Gordon", name: "Gordon", language: "en-AU", gender: "male", quality: ["low"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Isha", name: "Isha", language: "en-IN", gender: "female", quality: ["low", "normal", "high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Sangeeta", name: "Sangeeta", language: "en-IN", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Rishi", name: "Rishi", language: "en-IN", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Moira", name: "Moira", language: "en-IE", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Tessa", name: "Tessa", language: "en-ZA", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Fiona", name: "Fiona", language: "en-GB-u-sd-gbsct", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Female Google voice (US)", name: "Google US English", language: "en-US", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Female Google voice (UK)", name: "Google UK English Female", language: "en-GB", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Male Google voice (UK)", name: "Google UK English Male", language: "en-GB", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Zira", name: "Microsoft Zira - English (United States)", language: "en-US", gender: "female", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "David", name: "Microsoft David - English (United States)", language: "en-US", gender: "male", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Mark", name: "Microsoft Mark - English (United States)", language: "en-US", gender: "male", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Hazel", name: "Microsoft Hazel - English (Great Britain)", language: "en-GB", gender: "female", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Susan", name: "Microsoft Susan - English (Great Britain)", language: "en-GB", gender: "female", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "George", name: "Microsoft George - English (Great Britain)", language: "en-GB", gender: "male", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Catherine", name: "Microsoft Catherine - English (Austalia)", language: "en-AU", gender: "female", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "James", name: "Microsoft Richard - English (Australia)", language: "en-AU", gender: "male", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Linda", name: "Microsoft Linda - English (Canada)", language: "en-CA", gender: "female", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Richard", name: "Microsoft Richard - English (Canada)", language: "en-CA", gender: "male", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Heera", name: "Microsoft Heera - English (India)", language: "en-IN", gender: "female", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Ravi", name: "Microsoft Ravi - English (India)", language: "en-IN", gender: "male", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Sean", name: "Microsoft Sean - English (Ireland)", language: "en-IE", gender: "male", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Female voice 1 (US)", name: "Google US English 5 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google en-us-x-tpc-network", "Chrome OS US English 5", "Android Speech Recognition and Synthesis from Google en-us-x-tpc-local", "Android Speech Recognition and Synthesis from Google en-US-language"], language: "en-US", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Female voice 2 (US)", name: "Google US English 1 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google en-us-x-iob-network", "Chrome OS US English 1", "Android Speech Recognition and Synthesis from Google en-us-x-iob-local"], language: "en-US", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Female voice 3 (US)", name: "Google US English 2 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google en-us-x-iog-network", "Chrome OS US English 2", "Android Speech Recognition and Synthesis from Google en-us-x-iog-local"], language: "en-US", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Female voice 4 (US)", name: "Google US English 7 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google en-us-x-tpf-network", "Chrome OS US English 7", "Android Speech Recognition and Synthesis from Google en-us-x-tpf-local"], language: "en-US", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Female voice 5 (US)", name: "Android Speech Recognition and Synthesis from Google en-us-x-sfg-network", altNames: ["Android Speech Recognition and Synthesis from Google en-us-x-sfg-local"], language: "en-US", gender: "female", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Female voice 6 (US)", name: "Chrome OS US English 8", language: "en-US", gender: "female", quality: ["low"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Male voice 1 (US)", name: "Google US English 4 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google en-us-x-iom-network", "Chrome OS US English 4", "Android Speech Recognition and Synthesis from Google en-us-x-iom-local"], language: "en-US", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Male voice 2 (US)", name: "Google US English 3 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google en-us-x-iol-network", "Chrome OS US English 3", "Android Speech Recognition and Synthesis from Google en-us-x-iol-local"], language: "en-US", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Male voice 3 (US)", name: "Google US English 6 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google en-us-x-tpd-network", "Chrome OS US English 6", "Android Speech Recognition and Synthesis from Google en-us-x-tpd-local"], language: "en-US", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Female voice 1 (UK)", name: "Google UK English 2 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google en-gb-x-gba-network", "Chrome OS UK English 2", "Android Speech Recognition and Synthesis from Google en-gb-x-gba-local", "Android Speech Recognition and Synthesis from Google en-GB-language"], language: "en-GB", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Female voice 2 (UK)", name: "Google UK English 4 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google en-gb-x-gbc-network", "Chrome OS UK English 4", "Android Speech Recognition and Synthesis from Google en-gb-x-gbc-local"], language: "en-GB", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Female voice 3 (UK)", name: "Google UK English 6 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google en-gb-x-gbg-network", "Chrome OS UK English 6", "Android Speech Recognition and Synthesis from Google en-gb-x-gbg-local"], language: "en-GB", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Female voice 4 (UK)", name: "Chrome OS UK English 7", language: "en-GB", gender: "female", quality: ["low"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Male voice 1 (UK)", name: "Google UK English 1 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google en-gb-x-rjs-network", "Chrome OS UK English 1", "Android Speech Recognition and Synthesis from Google en-gb-x-rjs-local"], language: "en-GB", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Male voice 2 (UK)", name: "Google UK English 3 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google en-gb-x-gbb-network", "Chrome OS UK English 3", "Android Speech Recognition and Synthesis from Google en-gb-x-gbb-local"], language: "en-GB", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Male voice 3 (UK)", name: "Google UK English 5 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google en-gb-x-gbd-network", "Chrome OS UK English 5", "Android Speech Recognition and Synthesis from Google en-gb-x-gbd-local"], language: "en-GB", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Female voice 1 (Australia)", name: "Google Australian English 1 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google en-au-x-aua-network", "Chrome OS Australian English 1", "Android Speech Recognition and Synthesis from Google en-au-x-aua-local", "Android Speech Recognition and Synthesis from Google en-AU-language"], language: "en-AU", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Female voice 2 (Australia)", name: "Google Australian English 3 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google en-au-x-auc-network", "Chrome OS Australian English 3", "Android Speech Recognition and Synthesis from Google en-au-x-auc-local"], language: "en-AU", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Male voice 1 (Australia)", name: "Google Australian English 2 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google en-au-x-aub-network", "Chrome OS Australian English 2", "Android Speech Recognition and Synthesis from Google en-au-x-aub-local"], language: "en-AU", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Male voice 2 (Australia)", name: "Google Australian English 4 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google en-au-x-aud-network", "Chrome OS Australian English 4", "Android Speech Recognition and Synthesis from Google en-au-x-aud-local"], language: "en-AU", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Male voice 3 (Australia)", name: "Chrome OS Australian English 5", language: "en-AU", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Female voice 1 (India)", name: "Android Speech Recognition and Synthesis from Google en-in-x-ena-network", altNames: ["Android Speech Recognition and Synthesis from Google en-in-x-ena-local", "Android Speech Recognition and Synthesis from Google en-IN-language"], language: "en-IN", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Female voice 2 (India)", name: "Android Speech Recognition and Synthesis from Google en-in-x-enc-network", altNames: ["Android Speech Recognition and Synthesis from Google en-in-x-enc-local"], language: "en-IN", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Male voice 1 (India)", name: "Android Speech Recognition and Synthesis from Google en-in-x-end-network", altNames: ["Android Speech Recognition and Synthesis from Google en-in-x-end-local"], language: "en-IN", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Male voice 2 (India)", name: "Android Speech Recognition and Synthesis from Google en-in-x-ene-network", altNames: ["Android Speech Recognition and Synthesis from Google en-in-x-ene-local"], language: "en-IN", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Elvira", name: "Microsoft Elvira Online (Natural) - Spanish (Spain)", language: "es-ES", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Alvaro", name: "Microsoft Alvaro Online (Natural) - Spanish (Spain)", language: "es-ES", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Dalia", name: "Microsoft Dalia Online (Natural) - Spanish (Mexico)", language: "es-MX", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Microsoft Jorge", name: "Microsoft Jorge Online (Natural) - Spanish (Mexico)", language: "es-MX", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Elena", name: "Microsoft Elena Online (Natural) - Spanish (Argentina)", language: "es-AR", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Tomas", name: "Microsoft Tomas Online (Natural) - Spanish (Argentina)", language: "es-AR", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Sofia", name: "Microsoft Sofia Online (Natural) - Spanish (Bolivia)", language: "es-BO", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Marcelo", name: "Microsoft Marcelo Online (Natural) - Spanish (Bolivia)", language: "es-BO", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Catalina", name: "Microsoft Catalina Online (Natural) - Spanish (Chile)", language: "es-CL", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Lorenzo", name: "Microsoft Lorenzo Online (Natural) - Spanish (Chile)", language: "es-CL", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Ximena", name: "Microsoft Ximena Online (Natural) - Spanish (Colombia)", language: "es-CO", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Salome", name: "Microsoft Salome Online (Natural) - Spanish (Colombia)", language: "es-CO", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Gonzalo", name: "Microsoft Gonzalo Online (Natural) - Spanish (Colombia)", language: "es-CO", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Maria", name: "Microsoft Maria Online (Natural) - Spanish (Costa Rica)", language: "es-CR", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Juan", name: "Microsoft Juan Online (Natural) - Spanish (Costa Rica)", language: "es-CR", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Belkys", name: "Microsoft Belkys Online (Natural) - Spanish (Cuba)", language: "es-CU", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Manuel", name: "Microsoft Manuel Online (Natural) - Spanish (Cuba)", language: "es-CU", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Andrea", name: "Microsoft Andrea Online (Natural) - Spanish (Ecuador)", language: "es-EC", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Luis", name: "Microsoft Luis Online (Natural) - Spanish (Ecuador)", language: "es-EC", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Lorena", name: "Microsoft Lorena Online (Natural) - Spanish (El Salvador)", language: "es-SV", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Rodrigo", name: "Microsoft Rodrigo Online (Natural) - Spanish (El Salvador)", language: "es-SV", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Paloma", name: "Microsoft Paloma Online (Natural) - Spanish (United States)", language: "es-US", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Alonso", name: "Microsoft Alonso Online (Natural) - Spanish (United States)", language: "es-US", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Marta", name: "Microsoft Marta Online (Natural) - Spanish (Guatemala)", language: "es-GT", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Andres", name: "Microsoft Andres Online (Natural) - Spanish (Guatemala)", language: "es-GT", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Teresa", name: "Microsoft Teresa Online (Natural) - Spanish (Equatorial Guinea)", language: "es-GQ", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Javier", name: "Microsoft Javier Online (Natural) - Spanish (Equatorial Guinea)", language: "es-GQ", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Karla", name: "Microsoft Karla Online (Natural) - Spanish (Honduras)", language: "es-HN", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Carlos", name: "Microsoft Carlos Online (Natural) - Spanish (Honduras)", language: "es-HN", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Yolanda", name: "Microsoft Yolanda Online (Natural) - Spanish (Nicaragua)", language: "es-NI", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Federico", name: "Microsoft Federico Online (Natural) - Spanish (Nicaragua)", language: "es-NI", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Margarita", name: "Microsoft Margarita Online (Natural) - Spanish (Panama)", language: "es-PA", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Roberto", name: "Microsoft Roberto Online (Natural) - Spanish (Panama)", language: "es-PA", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Tania", name: "Microsoft Tania Online (Natural) - Spanish (Paraguay)", language: "es-PY", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Mario", name: "Microsoft Mario Online (Natural) - Spanish (Paraguay)", language: "es-PY", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Camila", name: "Microsoft Camila Online (Natural) - Spanish (Peru)", language: "es-PE", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Alex", name: "Microsoft Alex Online (Natural) - Spanish (Peru)", language: "es-PE", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Karina", name: "Microsoft Karina Online (Natural) - Spanish (Puerto Rico)", language: "es-PR", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Victor", name: "Microsoft Victor Online (Natural) - Spanish (Puerto Rico)", language: "es-PR", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Ramona", name: "Microsoft Ramona Online (Natural) - Spanish (Dominican Republic)", language: "es-DO", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Emilio", name: "Microsoft Emilio Online (Natural) - Spanish (Dominican Republic)", language: "es-DO", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Valentina", name: "Microsoft Valentina Online (Natural) - Spanish (Uruguay)", language: "es-UY", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Mateo", name: "Microsoft Mateo Online (Natural) - Spanish (Uruguay)", language: "es-UY", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Paola", name: "Microsoft Paola Online (Natural) - Spanish (Venezuela)", language: "es-VE", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Sebastian", name: "Microsoft Sebastian Online (Natural) - Spanish (Venezuela)", language: "es-VE", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Marisol", name: "Marisol", language: "es-ES", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Mónica", name: "Mónica", language: "es-ES", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Apple Jorge", name: "Jorge", language: "es-ES", gender: "male", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Angelica", name: "Angelica", language: "es-MX", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Paulina", name: "Paulina", language: "es-MX", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Juan", name: "Juan", language: "es-MX", gender: "male", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Isabela", name: "Isabela", language: "es-AR", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Diego", name: "Diego", language: "es-AR", gender: "male", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Francisca", name: "Francisca", language: "es-CL", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Soledad", name: "Soledad", language: "es-CO", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Jimena", name: "Jimena", language: "es-CO", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Carlos", name: "Carlos", language: "es-CO", gender: "male", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Voz Google masculina (España)", name: "Google español", language: "es-ES", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Voz Google femenina (Estados Unidos)", name: "Google español de Estados Unidos", language: "es-US", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Helena", name: "Microsoft Helena - Spanish (Spain)", language: "es-ES", gender: "female", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Laura", name: "Microsoft Laura - Spanish (Spain)", language: "es-ES", gender: "female", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Pablo", name: "Microsoft Pablo - Spanish (Spain)", language: "es-ES", gender: "male", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Sabina", name: "Microsoft Sabina - Spanish (Mexico)", language: "es-MX", gender: "female", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Raul", name: "Microsoft Raul - Spanish (Mexico)", language: "es-MX", gender: "male", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Voz femenina 1 (España)", name: "Google español 4 (Natural)", altNames: ["Chrome OS español 4", "Android Speech Recognition and Synthesis from Google es-es-x-eee-local", "Android Speech Recognition and Synthesis from Google es-ES-language"], language: "es-ES", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Voz femenina 2 (España)", name: "Google español 1 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google es-es-x-eea-network", "Chrome OS español 1", "Android Speech Recognition and Synthesis from Google es-es-x-eea-local"], language: "es-ES", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Voz femenina 3 (España)", name: "Google español 2 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google es-es-x-eec-network", "Chrome OS español 2", "Android Speech Recognition and Synthesis from Google es-es-x-eec-local"], language: "es-ES", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Voz masculina 1 (España)", name: "Google español 3 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google es-es-x-eed-network", "Chrome OS español 3", "Android Speech Recognition and Synthesis from Google es-es-x-eed-local"], language: "es-ES", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Voz masculina 2 (España)", name: "Google español 5 (Natural)", altNames: ["Chrome OS español 5", "Android Speech Recognition and Synthesis from Google es-es-x-eef-local"], language: "es-ES", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Voz femenina 1 (Estados Unidos)", name: "Google español de Estados Unidos 1 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google es-us-x-esc-network", "Chrome OS español de Estados Unidos", "Android Speech Recognition and Synthesis from Google es-us-x-esc-local", "Android Speech Recognition and Synthesis from Google es-US-language"], language: "es-US", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Voz femenina 2 (Estados Unidos)", name: "Google español de Estados Unidos 2 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google es-us-x-sfb-network", "Android Speech Recognition and Synthesis from Google es-us-x-sfb-local"], language: "es-US", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Voz masculina 1 (Estados Unidos)", name: "Google español de Estados Unidos 3 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google es-us-x-esd-network", "Android Speech Recognition and Synthesis from Google es-us-x-esd-local"], language: "es-US", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Voz masculina 2 (Estados Unidos)", name: "Google español de Estados Unidos 4 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google es-us-x-esf-network", "Android Speech Recognition and Synthesis from Google es-us-x-esf-local"], language: "es-US", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Miren", name: "Miren", language: "eu-ES", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Dilara", name: "Microsoft Dilara Online (Natural) - Persian (Iran)", language: "fa-IR", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Farid", name: "Microsoft Farid Online (Natural) - Persian (Iran)", language: "fa-IR", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Dariush", name: "Dariush", language: "fa-IR", gender: "male", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Noora", name: "Microsoft Noora Online (Natural) - Finnish (Finland)", language: "fi-FI", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Harri", name: "Microsoft Harri Online (Natural) - Finnish (Finland)", language: "fi-FI", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Satu", name: "Satu", language: "fi-FI", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Onni", name: "Onni", language: "fi-FI", gender: "male", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Heidi", name: "Microsoft Heidi - Finnish (Finland)", language: "fi-FI", gender: "female", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Suomalainen naisääni", name: "Google Suomi (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google fi-fi-x-afi-network", "Chrome OS Suomi", "Android Speech Recognition and Synthesis from Google fi-fi-x-afi-local", "Android Speech Recognition and Synthesis from Google fi-FI-language"], language: "fi-FI", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Vivienne", name: "Microsoft VivienneMultilingual Online (Natural) - French (France)", language: "fr-FR", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Denise", name: "Microsoft Denise Online (Natural) - French (France)", language: "fr-FR", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Charline", name: "Microsoft Charline Online (Natural) - French (Belgium)", language: "fr-BE", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Ariane", name: "Microsoft Ariane Online (Natural) - French (Switzerland)", language: "fr-CH", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Eloise", name: "Microsoft Eloise Online (Natural) - French (France)", language: "fr-FR", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Remy", name: "Microsoft RemyMultilingual Online (Natural) - French (France)", language: "fr-FR", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Henri", name: "Microsoft Henri Online (Natural) - French (France)", language: "fr-FR", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Gerard", name: "Microsoft Gerard Online (Natural) - French (Belgium)", language: "fr-BE", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Fabrice", name: "Microsoft Fabrice Online (Natural) - French (Switzerland)", language: "fr-CH", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Sylvie", name: "Microsoft Sylvie Online (Natural) - French (Canada)", language: "fr-CA", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Antoine", name: "Microsoft Antoine Online (Natural) - French (Canada)", language: "fr-CA", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Jean", name: "Microsoft Jean Online (Natural) - French (Canada)", language: "fr-CA", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Thierry", name: "Microsoft Thierry Online (Natural) - French (Canada)", language: "fr-CA", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Audrey", name: "Audrey", language: "fr-FR", gender: "female", quality: ["low", "normal", "high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Aurélie", name: "Aurélie", language: "fr-FR", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 0.9, localizedName: "apple" }, { label: "Marie", name: "Marie", language: "fr-FR", gender: "female", quality: ["low"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Thomas", name: "Thomas", language: "fr-FR", gender: "male", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Aude", name: "Aude", language: "fr-BE", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Chantal", name: "Chantal", language: "fr-CA", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Amélie", name: "Amélie", language: "fr-CA", gender: "female", quality: ["low", "high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Nicolas", name: "Nicolas", language: "fr-CA", gender: "male", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Voix Google féminine (France)", name: "Google français", language: "fr-FR", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Julie", name: "Microsoft Julie - French (France)", language: "fr-FR", gender: "female", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Hortence", name: "Microsoft Hortence - French (France)", language: "fr-FR", gender: "female", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Paul", name: "Microsoft Paul - French (France)", language: "fr-FR", gender: "male", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Caroline", name: "Microsoft Caroline - French (Canada)", language: "fr-CA", gender: "female", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Claude", name: "Microsoft Claude - French (Canada)", language: "fr-CA", gender: "male", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Guillaume", name: "Microsoft Claude - French (Switzerland)", language: "fr-CH", gender: "male", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Voix féminine 1 (France)", name: "Google français 4 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google fr-fr-x-frc-network", "Chrome OS français 4", "Android Speech Recognition and Synthesis from Google fr-fr-x-frc-local", "Android Speech Recognition and Synthesis from Google fr-FR-language"], language: "fr-FR", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Voix féminine 2 (France)", name: "Google français 2 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google fr-fr-x-fra-network", "Chrome OS français 2", "Android Speech Recognition and Synthesis from Google fr-fr-x-fra-local"], language: "fr-FR", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Voix féminine 3 (France)", name: "Google français 1 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google fr-fr-x-vlf-network", "Chrome OS français 1", "Android Speech Recognition and Synthesis from Google fr-fr-x-vlf-local"], language: "fr-FR", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Voix masculine 1 (France)", name: "Google français 5 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google fr-fr-x-frd-network", "Chrome OS français 5", "Android Speech Recognition and Synthesis from Google fr-fr-x-frd-local"], language: "fr-FR", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Voix masculine 2 (France)", name: "Google français 3 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google fr-fr-x-frb-network", "Chrome OS français 3", "Android Speech Recognition and Synthesis from Google fr-fr-x-frb-local"], language: "fr-FR", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Voix féminine 1 (Canada)", name: "Android Speech Recognition and Synthesis from Google fr-ca-x-caa-network", altNames: ["Android Speech Recognition and Synthesis from Google fr-ca-x-caa-local", "Android Speech Recognition and Synthesis from Google fr-CA-language"], language: "fr-CA", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Voix féminine 2 (Canada)", name: "Android Speech Recognition and Synthesis from Google fr-ca-x-cac-network", altNames: ["Android Speech Recognition and Synthesis from Google fr-ca-x-cac-local"], language: "fr-CA", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Voix masculine 1 (Canada)", name: "Android Speech Recognition and Synthesis from Google fr-ca-x-cab-network", altNames: ["Android Speech Recognition and Synthesis from Google fr-ca-x-cab-local"], language: "fr-CA", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Voix masculine 2 (Canada)", name: "Android Speech Recognition and Synthesis from Google fr-ca-x-cad-network", altNames: ["Android Speech Recognition and Synthesis from Google fr-ca-x-cad-local"], language: "fr-CA", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Sabela", name: "Microsoft Sabela Online (Natural) - Galician (Spain)", language: "gl-ES", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Roi", name: "Microsoft Roi Online (Natural) - Galician (Spain)", language: "gl-ES", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Carmela", name: "Carmela", language: "gl-ES", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Hila", name: "Microsoft Hila Online (Natural) - Hebrew (Israel)", language: "he-IL", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Avri", name: "Microsoft Avri Online (Natural) - Hebrew (Israel)", language: "he-IL", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Carmit", name: "Carmit", language: "he-IL", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Asaf", name: "Microsoft Asaf - Hebrew (Israel)", language: "he-IL", gender: "male", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "קול גברי 1", name: "Android Speech Recognition and Synthesis from Google he-il-x-heb-network", altNames: ["Android Speech Recognition and Synthesis from Google he-il-x-heb-local", "Android Speech Recognition and Synthesis from Google he-IL-language"], language: "he-IL", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "קול גברי 2", name: "Android Speech Recognition and Synthesis from Google he-il-x-hec-network", altNames: ["Android Speech Recognition and Synthesis from Google he-il-x-hec-local"], language: "he-IL", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "קול נשי 1", name: "Android Speech Recognition and Synthesis from Google he-il-x-hed-network", altNames: ["Android Speech Recognition and Synthesis from Google he-il-x-hed-local"], language: "he-IL", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "קול נשי 2", name: "Android Speech Recognition and Synthesis from Google he-il-x-hee-network", altNames: ["Android Speech Recognition and Synthesis from Google he-il-x-hee-local"], language: "he-IL", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Swara", name: "Microsoft Swara Online (Natural) - Hindi (India)", language: "hi-IN", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Madhur", name: "Microsoft Madhur Online (Natural) - Hindi (India)", language: "hi-IN", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Kiyara", name: "Kiyara", language: "hi-IN", gender: "female", quality: ["low", "normal", "high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Lekha", name: "Lekha", language: "hi-IN", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Neel", name: "Neel", language: "hi-IN", gender: "male", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "महिला Google आवाज़", name: "Google हिन्दी", language: "hi-IN", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Kalpana", name: "Microsoft Kalpana - Hindi (India)", language: "hi-IN", gender: "female", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Hemant", name: "Microsoft Hemant - Hindi (India)", language: "hi-IN", gender: "male", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "महिला आवाज़ 1", name: "Google हिन्दी 1 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google hi-in-x-hia-network", "Chrome OS हिन्दी 2", "Android Speech Recognition and Synthesis from Google hi-in-x-hia-local", "Android Speech Recognition and Synthesis from Google hi-IN-language"], language: "hi-IN", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "महिला आवाज़ 2", name: "Google हिन्दी 2 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google hi-in-x-hic-network", "Chrome OS हिन्दी 3", "Android Speech Recognition and Synthesis from Google hi-in-x-hic-local"], language: "hi-IN", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "महिला आवाज़ 3", name: "Chrome OS हिन्दी 1", language: "hi-IN", gender: "female", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "पुरुष आवाज 1", name: "Google हिन्दी 3 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google hi-in-x-hid-network", "Chrome OS हिन्दी 4", "Android Speech Recognition and Synthesis from Google hi-in-x-hid-local"], language: "hi-IN", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "पुरुष आवाज 2", name: "Google हिन्दी 4 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google hi-in-x-hie-network", "Chrome OS हिन्दी 5", "Android Speech Recognition and Synthesis from Google hi-in-x-hie-local"], language: "hi-IN", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Gabrijela", name: "Microsoft Gabrijela Online (Natural) - Croatian (Croatia)", language: "hr-HR", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Srecko", name: "Microsoft Srecko Online (Natural) - Croatian (Croatia)", language: "hr-HR", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Lana", name: "Lana", altNames: ["Lana (poboljšani)", "Lana (hrvatski (Hrvatska))"], language: "hr-HR", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Matej", name: "Microsoft Matej - Croatian (Croatia)", language: "hr-HR", gender: "male", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Ženski glas", name: "Android Speech Recognition and Synthesis from Google hr-hr-x-hra-network", altNames: ["Android Speech Recognition and Synthesis from Google hr-hr-x-hra-local"], language: "hr-HR", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Muški glas", name: "Android Speech Recognition and Synthesis from Google hr-hr-x-hrb-network", altNames: ["Android Speech Recognition and Synthesis from Google hr-hr-x-hrb-local", "Android Speech Recognition and Synthesis from Google hr-HR-language"], language: "hr-HR", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Noemi", name: "Microsoft Noemi Online (Natural) - Hungarian (Hungary)", language: "hu-HU", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Tamas", name: "Microsoft Tamas Online (Natural) - Hungarian (Hungary)", language: "hu-HU", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Tünde", name: "Tünde", language: "hu-HU", gender: "female", quality: ["low", "normal", "high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Szabolcs", name: "Microsoft Szabolcs - Hungarian (Hungary)", language: "hu-HU", gender: "male", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Női hang", name: "Google Magyar (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google hu-hu-x-kfl-network", "Chrome OS Magyar", "Android Speech Recognition and Synthesis from Google hu-hu-x-kfl-local", "Android Speech Recognition and Synthesis from Google hu-HU-language"], language: "hu-HU", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Gadis", name: "Microsoft Gadis Online (Natural) - Indonesian (Indonesia)", language: "id-ID", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Ardi", name: "Microsoft Ardi Online (Natural) - Indonesian (Indonesia)", language: "id-ID", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Damayanti", name: "Damayanti", language: "id-ID", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Suara Google wanita", name: "Google Bahasa Indonesia", language: "id-ID", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Andika", name: "Microsoft Andika - Indonesian (Indonesia)", language: "id-ID", gender: "female", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Suara wanita 1", name: "Google Bahasa Indonesia 1 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google id-id-x-idc-network", "Chrome OS Bahasa Indonesia 1", "Android Speech Recognition and Synthesis from Google id-id-x-idc-local", "Android Speech Recognition and Synthesis from Google id-ID-language"], language: "id-ID", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Suara wanita 2", name: "Google Bahasa Indonesia 2 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google id-id-x-idd-network", "Chrome OS Bahasa Indonesia 2", "Android Speech Recognition and Synthesis from Google id-id-x-idd-local"], language: "id-ID", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Suara laki-laki 1", name: "Google Bahasa Indonesia 3 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google id-id-x-ide-network", "Chrome OS Bahasa Indonesia 3", "Android Speech Recognition and Synthesis from Google id-id-x-ide-local"], language: "id-ID", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Suara laki-laki 2", name: "Google Bahasa Indonesia 4 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google id-id-x-dfz-network", "Chrome OS Bahasa Indonesia 4", "Android Speech Recognition and Synthesis from Google id-id-x-dfz-local"], language: "id-ID", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Elsa (Alta qualita)", name: "Microsoft Elsa Online (Natural) - Italian (Italy)", language: "it-IT", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Isabella", name: "Microsoft Isabella Online (Natural) - Italian (Italy)", language: "it-IT", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Giuseppe", name: "Microsoft Giuseppe Online (Natural) - Italian (Italy)", language: "it-IT", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Diego", name: "Microsoft Diego Online (Natural) - Italian (Italy)", language: "it-IT", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Federica", name: "Federica", language: "it-IT", gender: "female", quality: ["low", "normal", "high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Emma", name: "Emma", language: "it-IT", gender: "female", quality: ["low", "normal", "high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Alice", name: "Alice", language: "it-IT", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Paola", name: "Paola", language: "it-IT", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Luca", name: "Luca", language: "it-IT", gender: "male", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Voce Google femminile", name: "Google italiano", language: "it-IT", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Elsa", name: "Microsoft Elsa - Italian (Italy)", language: "it-IT", gender: "female", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Cosimo", name: "Microsoft Cosimo - Italian (Italy)", language: "it-IT", gender: "male", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Voce femminile 1", name: "Google italiano 2 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google it-it-x-itb-network", "Chrome OS italiano 2", "Android Speech Recognition and Synthesis from Google it-it-x-itb-local", "Android Speech Recognition and Synthesis from Google it-IT-language"], language: "it-IT", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Voce femminile 2", name: "Google italiano 1 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google it-it-x-kda-network", "Chrome OS italiano 1", "Android Speech Recognition and Synthesis from Google it-it-x-kda-local"], language: "it-IT", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Voce maschile 1", name: "Google italiano 3 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google it-it-x-itc-network", "Chrome OS italiano 3", "Android Speech Recognition and Synthesis from Google it-it-x-itc-local"], language: "it-IT", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Voce maschile 2", name: "Google italiano 4 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google it-it-x-itd-network", "Chrome OS italiano 4", "Android Speech Recognition and Synthesis from Google it-it-x-itd-local"], language: "it-IT", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Nanami", name: "Microsoft Nanami Online (Natural) - Japanese (Japan)", language: "ja-JP", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Keita", name: "Microsoft Keita Online (Natural) - Japanese (Japan)", language: "ja-JP", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "O-Ren", name: "O-Ren", language: "ja-JP", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Kyoko", name: "Kyoko", language: "ja-JP", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Otoya", name: "Otoya", language: "ja-JP", gender: "male", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Hattori", name: "Hattori", language: "ja-JP", gender: "male", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Google の女性の声", name: "Google 日本語", language: "ja-JP", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Ayumi", name: "Microsoft Ayumi - Japanese (Japan)", language: "ja-JP", gender: "female", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Haruka", name: "Microsoft Haruka - Japanese (Japan)", language: "ja-JP", gender: "female", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Ichiro", name: "Microsoft Ichiro - Japanese (Japan)", language: "ja-JP", gender: "male", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "女性の声1", name: "Google 日本語 1 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google ja-jp-x-htm-network", "Chrome OS 日本語 1", "Android Speech Recognition and Synthesis from Google ja-jp-x-htm-local", "Android Speech Recognition and Synthesis from Google ja-JP-language"], language: "ja-JP", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "女性の声2", name: "Chrome OS 日本語 2", altNames: ["Android Speech Recognition and Synthesis from Google ja-jp-x-jab-network", "Android Speech Recognition and Synthesis from Google ja-jp-x-jab-local"], language: "ja-JP", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "男性の声1", name: "Google 日本語 2 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google ja-jp-x-jac-network", "Chrome OS 日本語 3", "Android Speech Recognition and Synthesis from Google ja-jp-x-jac-local"], language: "ja-JP", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "男性の声2", name: "Google 日本語 3 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google ja-jp-x-jad-network", "Chrome OS 日本語 4", "Android Speech Recognition and Synthesis from Google ja-jp-x-jad-local"], language: "ja-JP", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Sapna", name: "Microsoft Sapna Online (Natural) - Kannada (India)", language: "kn-IN", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Gagan", name: "Microsoft Gagan Online (Natural) - Kannada (India)", language: "kn-IN", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Soumya", name: "Soumya", language: "kn-IN", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "ಸ್ತ್ರೀ ಧ್ವನಿ", name: "Android Speech Recognition and Synthesis from Google kn-in-x-knf-network", altNames: ["Android Speech Recognition and Synthesis from Google kn-in-x-knf-local", "Android Speech Recognition and Synthesis from Google kn-IN-language"], language: "kn-IN", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "ಪುರುಷ ಧ್ವನಿ", name: "Android Speech Recognition and Synthesis from Google kn-in-x-knm-network", altNames: ["Android Speech Recognition and Synthesis from Google kn-in-x-knm-local"], language: "kn-IN", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "SunHi", name: "Microsoft SunHi Online (Natural) - Korean (Korea)", language: "ko-KR", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Hyunsu", name: "Microsoft Hyunsu Online (Natural) - Korean (Korea)", language: "ko-KR", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "InJoon", name: "Microsoft InJoon Online (Natural) - Korean (Korea)", language: "ko-KR", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Yuna", name: "Yuna", language: "ko-KR", gender: "female", quality: ["low", "normal", "high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Jian", name: "Jian", language: "ko-KR", gender: "female", quality: ["low", "normal", "high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Suhyun", name: "Suhyun", language: "ko-KR", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Sora", name: "Sora", language: "ko-KR", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Minsu", name: "Minsu", language: "ko-KR", gender: "male", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Google 여성 음성", name: "Google 한국의", language: "ko-KR", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Heami", name: "Microsoft Heami - Korean (Korea)", language: "ko-KR", gender: "female", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "여성 목소리 1", name: "Google 한국어 2 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google ko-kr-x-kob-network", "Chrome OS 한국어 2", "Android Speech Recognition and Synthesis from Google ko-kr-x-kob-local", "Android Speech Recognition and Synthesis from Google ko-KR-language"], language: "ko-KR", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "여성 목소리 2", name: "Google 한국어 1 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google ko-kr-x-ism-network", "Chrome OS 한국어 1", "Android Speech Recognition and Synthesis from Google ko-kr-x-ism-local"], language: "ko-KR", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "남성 1", name: "Google 한국어 3 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google ko-kr-x-koc-network", "Chrome OS 한국어 3", "Android Speech Recognition and Synthesis from Google ko-kr-x-koc-local"], language: "ko-KR", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "남성 2", name: "Google 한국어 4 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google ko-kr-x-kod-network", "Chrome OS 한국어 4", "Android Speech Recognition and Synthesis from Google ko-kr-x-kod-local"], language: "ko-KR", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Aarohi", name: "Microsoft Aarohi Online (Natural) - Marathi (India)", language: "mr-IN", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Manohar", name: "Microsoft Manohar Online (Natural) - Marathi (India)", language: "mr-IN", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Ananya", name: "Ananya", language: "mr-IN", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "स्त्री आवाज", name: "Android Speech Recognition and Synthesis from Google mr-in-x-mrf-network", altNames: ["Android Speech Recognition and Synthesis from Google mr-in-x-mrf-local", "Android Speech Recognition and Synthesis from Google mr-IN-language"], language: "mr-IN", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Yasmin", name: "Microsoft Yasmin Online (Natural) - Malay (Malaysia)", language: "ms-MY", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Osman", name: "Microsoft Osman Online (Natural) - Malay (Malaysia)", language: "ms-MY", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Amira", name: "Amira", language: "ms-MY", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Rizwan", name: "Microsoft Rizwan - Malay (Malaysia)", language: "ms-MY", gender: "male", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Suara perempuan 1", name: "Android Speech Recognition and Synthesis from Google ms-my-x-msc-network", altNames: ["Android Speech Recognition and Synthesis from Google ms-my-x-msc-local", "Android Speech Recognition and Synthesis from Google ms-MY-language"], language: "ms-MY", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Suara perempuan 2", name: "Android Speech Recognition and Synthesis from Google ms-my-x-mse-network", altNames: ["Android Speech Recognition and Synthesis from Google ms-my-x-mse-local"], language: "ms-MY", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Suara lelaki 1", name: "Android Speech Recognition and Synthesis from Google ms-my-x-msd-network", altNames: ["Android Speech Recognition and Synthesis from Google ms-my-x-msd-local"], language: "ms-MY", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Suara lelaki 2", name: "Android Speech Recognition and Synthesis from Google ms-my-x-msg-network", altNames: ["Android Speech Recognition and Synthesis from Google ms-my-x-msg-local"], language: "ms-MY", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Pernille", name: "Microsoft Pernille Online (Natural) - Norwegian (Bokmål, Norway)", language: "nb-NO", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Finn", name: "Microsoft Finn Online (Natural) - Norwegian (Bokmål Norway)", language: "nb-NO", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Nora", name: "Nora", language: "nb-NO", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Henrik", name: "Henrik", language: "nb-NO", gender: "male", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Jon", name: "Microsoft Jon - Norwegian (Bokmål Norway)", language: "nb-NO", gender: "male", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Kvinnestemme 1", name: "Google Norsk Bokmål 2 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google nb-no-x-cfl-network", "Chrome OS Norsk Bokmål 2", "Android Speech Recognition and Synthesis from Google nb-no-x-cfl-local", "Android Speech Recognition and Synthesis from Google nb-NO-language"], language: "nb-NO", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Kvinnestemme 2", name: "Google Norsk Bokmål 1 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google nb-no-x-rfj-network", "Chrome OS Norsk Bokmål 1", "Android Speech Recognition and Synthesis from Google nb-no-x-rfj-local"], language: "nb-NO", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Kvinnestemme 3", name: "Google Norsk Bokmål 4 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google nb-no-x-tfs-network", "Chrome OS Norsk Bokmål 4", "Android Speech Recognition and Synthesis from Google nb-no-x-tfs-local"], language: "nb-NO", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Mannsstemme 1", name: "Google Norsk Bokmål 3 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google nb-no-x-cmj-network", "Chrome OS Norsk Bokmål 3", "Android Speech Recognition and Synthesis from Google nb-no-x-cmj-local"], language: "nb-NO", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Mannsstemme 2", name: "Google Norsk Bokmål 5 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google nb-no-x-tmg-network", "Chrome OS Norsk Bokmål 5", "Android Speech Recognition and Synthesis from Google nb-no-x-tmg-local"], language: "nb-NO", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Colette", name: "Microsoft Colette Online (Natural) - Dutch (Netherlands)", language: "nl-NL", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Fenna", name: "Microsoft Fenna Online (Natural) - Dutch (Netherlands)", language: "nl-NL", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Hanna", name: "Microsoft Hanna Online - Dutch (Netherlands)", language: "nl-NL", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Maarten", name: "Microsoft Maarten Online (Natural) - Dutch (Netherlands)", language: "nl-NL", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Dena", name: "Microsoft Dena Online (Natural) - Dutch (Belgium)", language: "nl-BE", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Arnaud", name: "Microsoft Arnaud Online (Natural) - Dutch (Belgium)", language: "nl-BE", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Claire", name: "Claire", language: "nl-NL", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Xander", name: "Xander", language: "nl-NL", gender: "male", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Ellen", name: "Ellen", language: "nl-BE", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Google mannelijke stem", name: "Google Nederlands", language: "nl-NL", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Frank", name: "Microsoft Frank - Dutch (Netherlands)", language: "nl-NL", gender: "male", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Vrouwelijke stem 1 (Nederland)", name: "Google Nederlands 4 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google nl-nl-x-lfc-network", "Chrome OS Nederlands 4", "Android Speech Recognition and Synthesis from Google nl-nl-x-lfc-local", "Android Speech Recognition and Synthesis from Google nl-NL-language"], language: "nl-NL", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Vrouwelijke stem 2 (Nederland)", name: "Google Nederlands 1 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google nl-nl-x-tfb-network", "Chrome OS Nederlands 1", "Android Speech Recognition and Synthesis from Google nl-nl-x-tfb-local"], language: "nl-NL", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Vrouwelijke stem 3 (Nederland)", name: "Google Nederlands 5 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google nl-nl-x-yfr-network", "Chrome OS Nederlands 5", "Android Speech Recognition and Synthesis from Google nl-nl-x-yfr-local"], language: "nl-NL", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Mannelijke stem 1 (Nederland)", name: "Google Nederlands 2 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google nl-nl-x-bmh-network", "Chrome OS Nederlands 2", "Android Speech Recognition and Synthesis from Google nl-nl-x-bmh-local"], language: "nl-NL", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Mannelijke stem 2 (Nederland)", name: "Google Nederlands 3 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google nl-nl-x-dma-network", "Chrome OS Nederlands 3", "Android Speech Recognition and Synthesis from Google nl-nl-x-dma-local"], language: "nl-NL", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Vrouwelijke stem (België)", name: "Android Speech Recognition and Synthesis from Google nl-be-x-bec-network", altNames: ["Android Speech Recognition and Synthesis from Google nl-be-x-bec-local", "Android Speech Recognition and Synthesis from Google nl-BE-language"], language: "nl-BE", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Mannelijke stem (België)", name: "Android Speech Recognition and Synthesis from Google nl-be-x-bed-network", altNames: ["Android Speech Recognition and Synthesis from Google nl-be-x-bed-local"], language: "nl-BE", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Zofia", name: "Microsoft Zofia Online (Natural) - Polish (Poland)", language: "pl-PL", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Paulina", name: "Microsoft Paulina Online - Polish (Poland)", language: "pl-PL", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Marek", name: "Microsoft Marek Online (Natural) - Polish (Poland)", language: "pl-PL", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Ewa", name: "Ewa", language: "pl-PL", gender: "female", quality: ["low", "normal", "high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Zosia", name: "Zosia", language: "pl-PL", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Krzysztof", name: "Krzysztof", language: "pl-PL", gender: "male", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Żeński głos Google’a", name: "Google polski", language: "pl-PL", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Paulina", name: "Microsoft Paulina - Polish (Poland)", language: "pl-PL", gender: "female", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Adam", name: "Microsoft Adam - Polish (Poland)", language: "pl-PL", gender: "male", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Głos żeński 1", name: "Google Polski 2 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google pl-pl-x-afb-network", "Chrome OS Polski 2", "Android Speech Recognition and Synthesis from Google pl-pl-x-afb-local", "Android Speech Recognition and Synthesis from Google pl-PL-language"], language: "pl-PL", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Głos żeński 2", name: "Google Polski 1 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google pl-pl-x-oda-network", "Chrome OS Polski 1", "Android Speech Recognition and Synthesis from Google pl-pl-x-oda-local"], language: "pl-PL", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Głos żeński 3", name: "Google Polski 5 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google pl-pl-x-zfg-network", "Chrome OS Polski 5", "Android Speech Recognition and Synthesis from Google pl-pl-x-zfg-local"], language: "pl-PL", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Głos męski 1", name: "Google Polski 3 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google pl-pl-x-bmg-network", "Chrome OS Polski 3", "Android Speech Recognition and Synthesis from Google pl-pl-x-bmg-local"], language: "pl-PL", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Głos męski 2", name: "Google Polski 4 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google pl-pl-x-jmk-network", "Chrome OS Polski 4", "Android Speech Recognition and Synthesis from Google pl-pl-x-jmk-local"], language: "pl-PL", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Raquel", name: "Microsoft Raquel Online (Natural) - Portuguese (Portugal)", language: "pt-PT", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Duarte", name: "Microsoft Duarte Online (Natural) - Portuguese (Portugal)", language: "pt-PT", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Francisca", name: "Microsoft Francisca Online (Natural) - Portuguese (Brazil)", language: "pt-BR", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Thalita", name: "Microsoft Thalita Online (Natural) - Portuguese (Brazil)", language: "pt-BR", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Antonio", name: "Microsoft Antonio Online (Natural) - Portuguese (Brazil)", language: "pt-BR", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Catarina", name: "Catarina", language: "pt-PT", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Joana", name: "Joana", language: "pt-PT", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Joaquim", name: "Joaquim", language: "pt-PT", gender: "male", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Fernanda", name: "Fernanda", language: "pt-BR", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Luciana", name: "Luciana", language: "pt-BR", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Felipe", name: "Felipe", language: "pt-BR", gender: "male", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Voz feminina do Google", name: "Google português do Brasil", language: "pt-BR", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Helia", name: "Microsoft Helia - Portuguese (Portugal)", language: "pt-PT", gender: "female", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Maria", name: "Microsoft Maria - Portuguese (Brazil)", language: "pt-BR", gender: "female", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Daniel", name: "Microsoft Daniel - Portuguese (Brazil)", language: "pt-BR", gender: "male", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Voz feminina 1 (Portugal)", name: "Google português de Portugal 1 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google pt-pt-x-jfb-network", "Android Speech Recognition and Synthesis from Google pt-pt-x-jfb-local", "Android Speech Recognition and Synthesis from Google pt-PT-language"], language: "pt-PT", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Voz feminina 2 (Portugal)", name: "Google português de Portugal 4 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google pt-pt-x-sfs-network", "Chrome OS português de Portugal", "Android Speech Recognition and Synthesis from Google pt-pt-x-sfs-local"], language: "pt-PT", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Voz masculina 1 (Portugal)", name: "Google português de Portugal 2 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google pt-pt-x-jmn-network", "Android Speech Recognition and Synthesis from Google pt-pt-x-jmn-local"], language: "pt-PT", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Voz masculina 2 (Portugal)", name: "Google português de Portugal 3 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google pt-pt-x-pmj-network", "Android Speech Recognition and Synthesis from Google pt-pt-x-pmj-local"], language: "pt-PT", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Voz feminina 1 (Brasil)", name: "Google português do Brasil 1 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google pt-br-x-afs-network", "Chrome OS português do Brasil", "Android Speech Recognition and Synthesis from Google pt-br-x-afs-local", "Android Speech Recognition and Synthesis from Google pt-BR-language"], language: "pt-BR", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Voz feminina 2 (Brasil)", name: "Google português do Brasil 3 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google pt-br-x-pte-network", "Android Speech Recognition and Synthesis from Google pt-br-x-pte-local"], language: "pt-BR", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Voz masculina  (Brasil)", name: "Google português do Brasil 2 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google pt-br-x-ptd-network", "Android Speech Recognition and Synthesis from Google pt-br-x-ptd-local"], language: "pt-BR", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Alina", name: "Microsoft Alina Online (Natural) - Romanian (Romania)", language: "ro-RO", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Emil", name: "Microsoft Emil Online (Natural) - Romanian (Romania)", language: "ro-RO", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Ioana", name: "Ioana", language: "ro-RO", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Andrei", name: "Microsoft Andrei - Romanian (Romania)", language: "ro-RO", gender: "male", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Voce feminină", name: "Android Speech Recognition and Synthesis from Google ro-ro-x-vfv-network", altNames: ["Android Speech Recognition and Synthesis from Google ro-ro-x-vfv-local", "Android Speech Recognition and Synthesis from Google ro-RO-language"], language: "ro-RO", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Svetlana", name: "Microsoft Svetlana Online (Natural) - Russian (Russia)", language: "ru-RU", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Ekaterina", name: "Microsoft Ekaterina Online - Russian (Russia)", language: "ru-RU", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Dmitry", name: "Microsoft Dmitry Online (Natural) - Russian (Russia)", language: "ru-RU", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Katya", name: "Katya", language: "ru-RU", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Milena", name: "Milena", language: "ru-RU", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Yuri", name: "Yuri", language: "ru-RU", gender: "male", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Google женский голос", name: "Google русский", language: "ru-RU", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Irina", name: "Microsoft Irina - Russian (Russian)", language: "ru-RU", gender: "female", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Pavel", name: "Microsoft Pavel - Russian (Russian)", language: "ru-RU", gender: "male", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Женский голос 1", name: "Android Speech Recognition and Synthesis from Google ru-ru-x-dfc-network", altNames: ["Android Speech Recognition and Synthesis from Google ru-ru-x-dfc-local"], language: "ru-RU", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Женский голос 2", name: "Android Speech Recognition and Synthesis from Google ru-ru-x-ruc-network", altNames: ["Android Speech Recognition and Synthesis from Google ru-ru-x-ruc-local"], language: "ru-RU", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Женский голос 3", name: "Android Speech Recognition and Synthesis from Google ru-ru-x-rue-network", altNames: ["Android Speech Recognition and Synthesis from Google ru-ru-x-rue-local"], language: "ru-RU", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Мужской голос 1", name: "Android Speech Recognition and Synthesis from Google ru-ru-x-rud-network", altNames: ["Android Speech Recognition and Synthesis from Google ru-ru-x-rud-local"], language: "ru-RU", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Мужской голос 2", name: "Android Speech Recognition and Synthesis from Google ru-ru-x-ruf-network", altNames: ["Android Speech Recognition and Synthesis from Google ru-ru-x-ruf-local"], language: "ru-RU", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Viktoria", name: "Microsoft Viktoria Online (Natural) - Slovak (Slovakia)", language: "sk-SK", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Lukas", name: "Microsoft Lukas Online (Natural) - Slovak (Slovakia)", language: "sk-SK", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Laura", name: "Laura", language: "sk-SK", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Filip", name: "Microsoft Filip - Slovak (Slovakia)", language: "sk-SK", gender: "male", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Ženský hlas", name: "Google Slovenčina (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google sk-sk-x-sfk-network", "Android Speech Recognition and Synthesis from Google sk-sk-x-sfk-local", "Chrome OS Slovenčina", "Android Speech Recognition and Synthesis from Google sk-SK-language"], language: "sk-SK", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Petra", name: "Microsoft Petra Online (Natural) - Slovenian (Slovenia)", language: "sl-SI", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Rok", name: "Microsoft Rok Online (Natural) - Slovenian (Slovenia)", language: "sl-SI", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Tina", name: "Tina", language: "sl-SI", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Lado", name: "Microsoft Lado - Slovenian (Slovenia)", language: "sl-SI", gender: "male", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Ženski glas", name: "Android Speech Recognition and Synthesis from Google sl-si-x-frm-local", altNames: ["Android Speech Recognition and Synthesis from Google sl-SI-language"], language: "sl-SI", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Sofie", name: "Microsoft Sofie Online (Natural) - Swedish (Sweden)", language: "sv-SE", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Mattias", name: "Microsoft Mattias Online (Natural) - Swedish (Sweden)", language: "sv-SE", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Klara", name: "Klara", language: "sv-SE", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Alva", name: "Alva", language: "sv-SE", gender: "female", quality: ["low", "normal", "high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Oskar", name: "Oskar", language: "sv-SE", gender: "male", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Bengt", name: "Microsoft Bengt - Swedish (Sweden)", language: "sv-SE", gender: "female", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Kvinnlig röst 1", name: "Google Svenska 1 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google sv-se-x-lfs-network", "Chrome OS Svenska", "Android Speech Recognition and Synthesis from Google sv-se-x-lfs-local", "Android Speech Recognition and Synthesis from Google sv-SE-language"], language: "sv-SE", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Kvinnlig röst 2", name: "Google Svenska 2 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google sv-se-x-afp-network", "Android Speech Recognition and Synthesis from Google sv-se-x-afp-local"], language: "sv-SE", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Kvinnlig röst 3", name: "Google Svenska 3 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google sv-se-x-cfg-network", "Android Speech Recognition and Synthesis from Google sv-se-x-cfg-local"], language: "sv-SE", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Mansröst 1", name: "Google Svenska 4 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google sv-se-x-cmh-network", "Android Speech Recognition and Synthesis from Google sv-se-x-cmh-local"], language: "sv-SE", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Mansröst 2", name: "Google Svenska 5 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google sv-se-x-dmc-network", "Android Speech Recognition and Synthesis from Google sv-se-x-dmc-local"], language: "sv-SE", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Pallavi", name: "Microsoft Pallavi Online (Natural) - Tamil (India)", language: "ta-IN", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Valluvar", name: "Microsoft Valluvar Online (Natural) - Tamil (India)", language: "ta-IN", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Saranya", name: "Microsoft Saranya Online (Natural) - Tamil (Sri Lanka)", language: "ta-LK", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Kumar", name: "Microsoft Kumar Online (Natural) - Tamil (Sri Lanka)", language: "ta-LK", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Kani", name: "Microsoft Kani Online (Natural) - Tamil (Malaysia)", language: "ta-MY", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Surya", name: "Microsoft Surya Online (Natural) - Tamil (Malaysia)", language: "ta-MY", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Venba", name: "Microsoft Venba Online (Natural) - Tamil (Singapore)", language: "ta-SG", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Anbu", name: "Microsoft Anbu Online (Natural) - Tamil (Singapore)", language: "ta-SG", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Vani", name: "Vani", language: "ta-IN", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Valluvar", name: "Microsoft Valluvar - Tamil (India)", language: "ta-IN", gender: "male", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "பெண் குரல்", name: "Android Speech Recognition and Synthesis from Google ta-in-x-tac-network", altNames: ["Android Speech Recognition and Synthesis from Google ta-in-x-tac-local", "Android Speech Recognition and Synthesis from Google ta-IN-language"], language: "ta-IN", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "ஆண் குரல்", name: "Android Speech Recognition and Synthesis from Google ta-in-x-tad-network", altNames: ["Android Speech Recognition and Synthesis from Google ta-in-x-tad-local"], language: "ta-IN", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Shruti", name: "Microsoft Shruti Online (Natural) - Telugu (India)", language: "te-IN", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Mohan", name: "Microsoft Mohan Online (Natural) - Telugu (India)", language: "te-IN", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Geeta", name: "Geeta", language: "te-IN", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "స్త్రీ స్వరం", name: "Android Speech Recognition and Synthesis from Google te-in-x-tef-network", altNames: ["Android Speech Recognition and Synthesis from Google te-in-x-tef-local", "Android Speech Recognition and Synthesis from Google te-IN-language"], language: "te-IN", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "పురుష స్వరం", name: "Android Speech Recognition and Synthesis from Google te-in-x-tem-network", altNames: ["Android Speech Recognition and Synthesis from Google te-in-x-tem-local"], language: "te-IN", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Premwadee", name: "Microsoft Premwadee Online (Natural) - Thai (Thailand)", language: "th-TH", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Niwat", name: "Microsoft Niwat Online (Natural) - Thai (Thailand)", language: "th-TH", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Narisa", name: "Narisa", language: "th-TH", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Kanya", name: "Kanya", language: "th-TH", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Pattara", name: "Microsoft Pattara - Thai (Thailand)", language: "th-TH", gender: "male", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "เสียงผู้หญิง", name: "Google ไทย (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google th-th-x-mol-network", "Chrome OS ไทย", "Android Speech Recognition and Synthesis from Google th-th-x-mol-local", "Android Speech Recognition and Synthesis from Google th-TH-language"], language: "th-TH", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Emel", name: "Microsoft Emel Online (Natural) - Turkish (Turkey)", language: "tr-TR", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Ahmet", name: "Microsoft Ahmet Online (Natural) - Turkish (Turkey)", language: "tr-TR", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Yelda", name: "Yelda", altNames: ["Yelda (Geliştirilmiş)", "Yelda (Türkçe (Türkiye))"], language: "tr-TR", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Cem", name: "Cem", language: "tr-TR", gender: "male", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Tolga", name: "Microsoft Tolga - Turkish (Turkey)", language: "tr-TR", gender: "male", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Kadın sesi 1", name: "Google Türkçe 3 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google tr-tr-x-cfs-network", "Chrome OS Türkçe 3", "Android Speech Recognition and Synthesis from Google tr-tr-x-cfs-local", "Android Speech Recognition and Synthesis from Google tr-TR-language"], language: "tr-TR", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Kadın sesi 2", name: "Google Türkçe 4 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google tr-tr-x-efu-network", "Chrome OS Türkçe 4", "Android Speech Recognition and Synthesis from Google tr-tr-x-efu-local"], language: "tr-TR", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Kadın sesi 3", name: "Google Türkçe 1 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google tr-tr-x-mfm-network", "Chrome OS Türkçe 1", "Android Speech Recognition and Synthesis from Google tr-tr-x-mfm-local"], language: "tr-TR", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Erkek sesi 1", name: "Google Türkçe 2 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google tr-tr-x-ama-network", "Chrome OS Türkçe 2", "Android Speech Recognition and Synthesis from Google tr-tr-x-ama-local"], language: "tr-TR", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Erkek sesi 2", name: "Google Türkçe 5 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google tr-tr-x-tmc-network", "Chrome OS Türkçe 5", "Android Speech Recognition and Synthesis from Google tr-tr-x-tmc-local"], language: "tr-TR", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Polina", name: "Microsoft Polina Online (Natural) - Ukrainian (Ukraine)", language: "uk-UA", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "Ostap", name: "Microsoft Ostap Online (Natural) - Ukrainian (Ukraine)", language: "uk-UA", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Lesya", name: "Lesya", language: "uk-UA", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Жіночий голос", name: "Google українська (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google uk-ua-x-hfd-network", "Chrome OS українська", "Android Speech Recognition and Synthesis from Google uk-ua-x-hfd-local", "Android Speech Recognition and Synthesis from Google uk-UA-language"], language: "uk-UA", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "HoaiMy", name: "Microsoft HoaiMy Online (Natural) - Vietnamese (Vietnam)", language: "vi-VN", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "NamMinh", name: "Microsoft NamMinh Online (Natural) - Vietnamese (Vietnam)", language: "vi-VN", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Linh", name: "Linh", language: "vi-VN", gender: "female", quality: ["low", "normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "An", name: "Microsoft An - Vietnamese (Vietnam)", language: "vi-VN", gender: "male", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Giọng nữ 1", name: "Google Tiếng Việt 1 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google vi-vn-x-vic-network", "Chrome OS Tiếng Việt 1", "Android Speech Recognition and Synthesis from Google vi-vn-x-vic-local", "Android Speech Recognition and Synthesis from Google vi-VN-language"], language: "vi-VN", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Giọng nữ 2", name: "Google Tiếng Việt 2 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google vi-vn-x-vid-network", "Chrome OS Tiếng Việt 2", "Android Speech Recognition and Synthesis from Google vi-vn-x-vid-local"], language: "vi-VN", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Giọng nữ 3", name: "Google Tiếng Việt 4 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google vi-vn-x-vif-network", "Chrome OS Tiếng Việt 4", "Android Speech Recognition and Synthesis from Google vi-vn-x-vif-local"], language: "vi-VN", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Giọng nam 1", name: "Google Tiếng Việt 3 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google vi-vn-x-vie-network", "Chrome OS Tiếng Việt 3", "Android Speech Recognition and Synthesis from Google vi-vn-x-vie-local"], language: "vi-VN", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Giọng nam 2", name: "Google Tiếng Việt 5 (Natural)", altNames: ["Android Speech Recognition and Synthesis from Google vi-vn-x-gft-network", "Chrome OS Tiếng Việt 5", "Android Speech Recognition and Synthesis from Google vi-vn-x-gft-local"], language: "vi-VN", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Nannan", name: "Nannan", language: "wuu-CN", gender: "female", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "HiuGaai", name: "Microsoft HiuGaai Online (Natural) - Chinese (Cantonese Traditional)", language: "yue-HK", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "HiuMaan", name: "Microsoft HiuMaan Online (Natural) - Chinese (Hong Kong)", language: "yue-HK", gender: "female", quality: ["veryHigh"], localizedName: "" }, { label: "WanLung", name: "Microsoft WanLung Online (Natural) - Chinese (Hong Kong)", language: "yue-HK", gender: "male", quality: ["veryHigh"], localizedName: "" }, { label: "Sinji", name: "Sinji", language: "yue-HK", gender: "female", quality: ["low", "normal", "high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Aasing", name: "Aasing", language: "yue-HK", gender: "male", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "apple" }, { label: "Google 女聲", name: "Google 粤語（香港）", language: "yue-HK", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Tracy", name: "Microsoft Tracy - Chinese (Traditional, Hong Kong S.A.R.)", language: "cmn-HK", gender: "female", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "Danny", name: "Microsoft Danny - Chinese (Traditional, Hong Kong S.A.R.)", language: "cmn-HK", gender: "male", quality: ["normal"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "女聲1", name: "Android Speech Recognition and Synthesis from Google yue-hk-x-jar-network", altNames: ["Chrome OS 粵語 1", "Android Speech Recognition and Synthesis from Google yue-HK-x-jar-local", "Android Speech Recognition and Synthesis from Google yue-HK-language"], language: "yue-HK", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "女聲2", name: "Android Speech Recognition and Synthesis from Google yue-hk-x-yuc-network", altNames: ["Chrome OS 粵語 2", "Android Speech Recognition and Synthesis from Google yue-HK-x-yuc-local"], language: "yue-HK", gender: "female", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "男聲1", name: "Android Speech Recognition and Synthesis from Google yue-hk-x-yud-network", altNames: ["Chrome OS 粵語 3", "Android Speech Recognition and Synthesis from Google yue-HK-x-yud-local"], language: "yue-HK", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "男聲2", name: "Android Speech Recognition and Synthesis from Google yue-hk-x-yue-network", altNames: ["Chrome OS 粵語 5", "Android Speech Recognition and Synthesis from Google yue-HK-x-yue-local"], language: "yue-HK", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }, { label: "男聲3", name: "Android Speech Recognition and Synthesis from Google yue-hk-x-yuf-network", altNames: ["Chrome OS 粵語 5", "Android Speech Recognition and Synthesis from Google yue-HK-x-yuf-local"], language: "yue-HK", gender: "male", quality: ["high"], recommendedPitch: 1, recommendedRate: 1, localizedName: "" }], na = { ar: { normal: "محسن", high: "استثنائي" }, ca: { normal: "millorada", high: "prèmium" }, "cmn-CN": { normal: "优化音质", high: "高音质" }, "cmn-TW": { normal: "增強音質", high: "高音質" }, cs: { normal: "vylepšená verze", high: "prémiový" }, da: { normal: "forbedret", high: "høj kvalitet" }, de: { normal: "erweitert", high: "premium" }, el: { normal: "βελτιωμένη", high: "υψηλής ποιότητας" }, en: { normal: "Enhanced", high: "Premium" }, es: { normal: "mejorada", high: "premium" }, fi: { normal: "parannettu", high: "korkealaatuinen" }, fr: { normal: "premium", high: "de qualité" }, he: { normal: "משופר", high: "פרימיום" }, hi: { normal: "बेहतर", high: "प्रीमियम" }, hr: { normal: "poboljšani", high: "vrhunski" }, hu: { normal: "továbbfejlesztett", high: "prémium" }, id: { normal: "Ditingkatkan", high: "Premium" }, it: { normal: "ottimizzata", high: "premium" }, ja: { normal: "拡張", high: "プレミアム" }, ko: { normal: "고품질", high: "프리미엄" }, ms: { normal: "Dipertingkat", high: "Premium" }, nb: { normal: "forbedret", high: "premium" }, nl: { normal: "verbeterd", high: "premium" }, pl: { normal: "rozszerzony", high: "premium" }, pt: { normal: "melhorada", high: "premium" }, ro: { normal: "îmbunătățită", high: "premium" }, ru: { normal: "улучшенный", high: "высшее качество" }, sk: { normal: "vylepšený", high: "prémiový" }, sl: { normal: "izboljšano", high: "prvovrsten" }, sv: { normal: "förbättrad", high: "premium" }, th: { normal: "คุณภาพสูง", high: "คุณภาพสูง" }, tr: { normal: "Geliştirilmiş", high: "Yüksek Kaliteli" }, uk: { normal: "вдосконалений", high: "високої якості" }, vi: { normal: "Nâng cao", high: "Cao cấp" } }, Oa = { ar: "ar-SA", bg: "bg-BG", bho: "bho-IN", bn: "bn-IN", ca: "ca-ES", cmn: "cmn-CN", cs: "cs-CZ", da: "da-DK", de: "de-DE", el: "el-GR", en: "en-US", es: "es-ES", eu: "eu-ES", fa: "fa-IR", fi: "fi-FI", fr: "fr-FR", gl: "gl-ES", he: "he-IL", hi: "hi-IN", hr: "hr-HR", hu: "hu-HU", id: "id-ID", it: "it-IT", ja: "ja-JP", kn: "kn-IN", ko: "ko-KR", mr: "mr-IN", ms: "ms-MY", nb: "nb-NO", nl: "nl-NL", pl: "pl-PL", pt: "pt-BR", ro: "ro-RO", ru: "ru-RU", sk: "sk-SK", sl: "sl-SI", sv: "sv-SE", ta: "ta-IN", te: "te-IN", th: "th-TH", tr: "tr-TR", uk: "uk-UA", vi: "vi-VN", wuu: "wuu-CN", yue: "yue-HK" }, la = () => window?.navigator?.languages || [], T = () => (navigator?.language || "").split("-")[0].toLowerCase(), Pa = Object.values(na).map(({ normal: e }) => e), Ga = Object.values(na).map(({ high: e }) => e);
function xa(e, a) {
  const l = (r) => {
    switch (r) {
      case "veryLow":
        return 0;
      case "low":
        return 1;
      case "normal":
        return 2;
      case "high":
        return 3;
      case "veryHigh":
        return 4;
      default:
        return -1;
    }
  };
  return l(a || "low") - l(e || "low");
}
async function ra(e = 1e4, a = 10) {
  const l = () => speechSynthesis.getVoices(), r = l();
  return Array.isArray(r) && r.length ? r : new Promise((m, i) => {
    let s = Math.floor(e / a), n = !1;
    const c = () => {
      if (n) return;
      n = !0;
      const t = () => {
        if (s < 1) return m([]);
        --s;
        const p = l();
        if (Array.isArray(p) && p.length) return m(p);
        setTimeout(t, a);
      };
      setTimeout(t, a);
    };
    speechSynthesis.onvoiceschanged ? speechSynthesis.onvoiceschanged = () => {
      const t = l();
      Array.isArray(t) && t.length ? m(t) : c();
    } : c(), setTimeout(() => i(new Error("No voices available after timeout")), e);
  });
}
const ae = ({ voiceURI: e, name: a, language: l, offlineAvailability: r }) => `${e}_${a}_${l}_${r}`;
function Ae(e) {
  return [...new Set(e.map((r) => ae(r)))].map((r) => e.find((m) => ae(m) === r)).filter((r) => !!r);
}
function ia(e) {
  const a = (l) => {
    const r = l.replace("_", "-");
    return /\w{2,3}-\w{2,3}/.test(r) ? `${r.split("-")[0].toLowerCase()}-${r.split("-")[1].toUpperCase()}` : l;
  };
  return e.map((l) => ({
    label: l.name,
    voiceURI: l.voiceURI,
    name: l.name,
    __lang: l.lang,
    language: a(l.lang),
    gender: void 0,
    age: void 0,
    offlineAvailability: l.localService,
    quality: void 0,
    pitchControl: !0,
    recommendedPitch: void 0,
    recomendedRate: void 0
  }));
}
function Or(e) {
  return e.map((a) => ({
    default: !1,
    lang: a.__lang || a.language,
    localService: a.offlineAvailability,
    name: a.name,
    voiceURI: a.voiceURI
  }));
}
function Pr(e, a = !0) {
  return e.filter(({ offlineAvailability: l }) => l === a);
}
function Gr(e, a) {
  return e.filter(({ gender: l }) => l === a);
}
function Ea(e, a = T()) {
  return a = Array.isArray(a) ? a : [a], a = a.map((l) => z(l)[0]), e.filter(({ language: l }) => {
    const [r] = z(l);
    return a.includes(r);
  });
}
function xr(e, a) {
  return a = Array.isArray(a) ? a : [a], e.filter(({ quality: l }) => a.some((r) => r === l));
}
function qe(e) {
  return e.filter(({ name: a }) => !wa.includes(a));
}
function ve(e) {
  return e.filter(({ name: a }) => !za.find((l) => a.startsWith(l)));
}
function I(e, a) {
  return a.label = e.label, a.gender = e.gender, a.recommendedPitch = e.recommendedPitch, a.recommendedRate = e.recommendedRate, a;
}
function oa(e, a = ka) {
  const l = [], r = [];
  e:
    for (const m of a)
      if (Array.isArray(m.quality) && m.quality.length > 1) {
        const i = e.filter(({ name: s }) => s.startsWith(m.name));
        if (i.length) {
          for (const n of ["high", "normal"])
            for (let c = 0; c < i.length; c++) {
              const t = i[c], p = /^.*\((.*)\)$/;
              if (p.test(t.name)) {
                const h = p.exec(t.name), u = h && h[1] || "", d = n === "high" ? Ga : Pa;
                if (m.quality.includes(n) && d.includes(u)) {
                  t.quality = n, l.push(I(m, t)), i.splice(c, 1), r.push(...i.map((S) => (S.quality = "low", I(m, S))));
                  continue e;
                }
              }
            }
          const s = i[0];
          for (let n = 1; n < i.length; n++)
            r.push(i[n]);
          s.quality = i.length > 3 ? "veryHigh" : i.length > 2 ? "high" : "normal", l.push(I(m, s));
        }
      } else if (Array.isArray(m.altNames) && m.altNames.length) {
        const i = e.find(({ name: s }) => s === m.name);
        if (i) {
          const s = i;
          s.quality = Array.isArray(m.quality) ? m.quality[0] : void 0, l.push(I(m, s));
          const n = e.filter(({ name: c }) => m.altNames.includes(c));
          r.push(...n.map((c) => (c.quality = m.quality[0], I(m, c))));
        } else {
          const s = e.filter(({ name: n }) => m.altNames.includes(n));
          if (s.length) {
            const n = s.shift();
            n.quality = Array.isArray(m.quality) ? m.quality[0] : void 0, l.push(I(m, n)), r.push(...s.map((c) => (c.quality = m.quality[0], I(m, c))));
          }
        }
      } else {
        const i = e.find(({ name: s }) => s === m.name);
        if (i) {
          const s = i;
          s.quality = Array.isArray(m.quality) ? m.quality[0] : void 0, l.push(I(m, s));
        }
      }
  return [Ae(l), Ae(r)];
}
const z = (e) => [e.split("-")[0].toLowerCase(), e.split("-")[1]?.toUpperCase()];
function Ma(e) {
  return e.sort(({ quality: a }, { quality: l }) => xa(a, l));
}
function Er(e) {
  return e.sort(({ name: a }, { name: l }) => a.localeCompare(l));
}
function Mr(e, a) {
  return e.sort(({ gender: l }, { gender: r }) => l === r ? 0 : l === a || r === a ? -1 : 1);
}
function Ta(e) {
  return e = Array.isArray(e) ? e : e ? [e] : [], [.../* @__PURE__ */ new Set([...e, ...la()])];
}
function Ca(e) {
  e = Array.isArray(e) ? e : e ? [e] : [];
  const a = Object.values(Oa);
  return [.../* @__PURE__ */ new Set([...e, ...la(), ...a])];
}
const Ha = (e) => [...new Set(e.map((a) => z(a)[0]).filter((a) => !!a))], Ia = (e) => [...new Set(e.map((a) => (z(a)[1] || "").toUpperCase()).filter((a) => !!a))];
function ta(e, a = [], l = T()) {
  const r = Ha(Ta(a)), m = [];
  for (const n of r)
    m.push(...e.filter(({ language: c }) => n === z(c)[0]));
  let i;
  if (l)
    try {
      i = new Intl.DisplayNames([l], { type: "language" });
    } catch (n) {
      console.error("Intl.DisplayNames throw an exception with ", l, n);
    }
  const s = e.filter((n) => !m.includes(n));
  return s.sort(({ language: n }, { language: c }) => {
    let t = n, p = c;
    try {
      i && (t = i.of(z(n)[0]) || n, p = i.of(z(c)[0]) || c);
    } catch {
    }
    return t.localeCompare(p);
  }), [...m, ...s];
}
function Ua(e, a = [], l = T()) {
  const r = Ia(Ca(a)), m = [];
  for (const n of r)
    m.push(...e.filter(({ language: c }) => n === z(c)[1]));
  let i;
  if (l)
    try {
      i = new Intl.DisplayNames([l], { type: "region" });
    } catch (n) {
      console.error("Intl.DisplayNames throw an exception with ", l, n);
    }
  const s = e.filter((n) => !m.includes(n));
  return s.sort(({ language: n }, { language: c }) => {
    let t = n, p = c;
    try {
      i && (t = i.of(z(n)[1]) || n, p = i.of(z(c)[1]) || c);
    } catch {
    }
    return t.localeCompare(p);
  }), [...m, ...s];
}
function La(e, a = T()) {
  let l;
  if (a)
    try {
      l = new Intl.DisplayNames([a], { type: "language" });
    } catch (r) {
      console.error("Intl.DisplayNames throw an exception with ", a, r);
    }
  return e.reduce((r, m) => {
    const [i] = z(m.language);
    let s = i;
    try {
      l && (s = l.of(i) || i);
    } catch (c) {
      console.error("langueName.of throw an error with ", i, c);
    }
    const n = r.find(({ code: c }) => c === i);
    return n ? n.count++ : r.push({ code: i, count: 1, label: s }), r;
  }, []);
}
function Ba(e, a = T()) {
  let l;
  if (a)
    try {
      l = new Intl.DisplayNames([a], { type: "region" });
    } catch (r) {
      console.error("Intl.DisplayNames throw an exception with ", a, r);
    }
  return e.reduce((r, m) => {
    const [, i] = z(m.language);
    let s = i;
    try {
      l && (s = l.of(i) || i);
    } catch (c) {
      console.error("regionName.of throw an error with ", i, c);
    }
    const n = r.find(({ code: c }) => c === i);
    return n ? n.count++ : r.push({ code: i, count: 1, label: s }), r;
  }, []);
}
function Da(e, a = [], l = T()) {
  const r = ta(e, a, l), m = La(r, l), i = /* @__PURE__ */ new Map();
  for (const { code: s, label: n } of m)
    i.set(n, r.filter(({ language: c }) => {
      const [t] = z(c);
      return t === s;
    }));
  return i;
}
function Tr(e, a = [], l = T()) {
  const r = Ua(e, a, l), m = Ba(r, l), i = /* @__PURE__ */ new Map();
  for (const { code: s, label: n } of m)
    i.set(n, r.filter(({ language: c }) => {
      const [, t] = z(c);
      return t === s;
    }));
  return i;
}
function Cr(e) {
  const [a, l] = oa(e), r = e.filter((p) => !a.includes(p) && !l.includes(p)), m = qe(r), i = r.filter((p) => !m.includes(p)), s = ve(r), n = r.filter((p) => !s.includes(p)), c = qe(ve(r)), t = /* @__PURE__ */ new Map();
  return t.set("recommendedVoices", a), t.set("lowerQuality", l), t.set("novelty", i), t.set("veryLowQuality", n), t.set("remaining", c), t;
}
function Hr(e, a = [], l = T()) {
  const r = Da(e, a, l);
  return Array.from(r.entries()).map(([m, i]) => ({ label: m, count: i.length, code: z(i[0]?.language || "")[0] }));
}
async function Ir(e, a) {
  const l = await ra(), r = Ae(ia(l)), m = oa(r), [i, s] = m, n = m.flat(), c = r.map((u) => ae(u)).filter((u) => !n.find((d) => ae(d) === u)).map((u) => r.find((d) => ae(d) === u)).filter((u) => !!u), t = qe(ve(c)), p = [i, s, t].flat();
  return ta(Ma(p), e, a || T());
}
const Fa = ["webKit", "moz", "ms", "o"], Va = [
  "boundary",
  "end",
  "error",
  "mark",
  "pause",
  "resume",
  "start"
], ja = (e) => `${e.charAt(0).toUpperCase()}${e.slice(1)}`, Q = (e = {}, a) => Object.hasOwnProperty.call(e, a) || a in e || !!e[a], _a = (e) => typeof window < "u" && e in window, Ka = (e) => {
  const a = ja(e), l = Fa.map((m) => `${m}${a}`), r = [e, a].concat(l).find(_a);
  return r && typeof window < "u" ? window[r] : void 0;
}, $a = () => {
  const e = {};
  [
    "speechSynthesis",
    "speechSynthesisUtterance",
    "speechSynthesisVoice",
    "speechSynthesisEvent",
    "speechSynthesisErrorEvent"
  ].forEach((l) => {
    e[l] = Ka(l);
  }), e.onvoiceschanged = Q(e.speechSynthesis, "onvoiceschanged"), e.speechSynthesisSpeaking = Q(e.speechSynthesis, "speaking"), e.speechSynthesisPaused = Q(e.speechSynthesis, "paused");
  const a = e.speechSynthesisUtterance ? Q(e.speechSynthesisUtterance, "prototype") : !1;
  return Va.forEach((l) => {
    const r = `on${l}`;
    e[r] = a && e.speechSynthesisUtterance ? Q(e.speechSynthesisUtterance.prototype, r) : !1;
  }), e;
}, Wa = () => {
  const a = typeof window < "u" && (window.navigator || {}).userAgent || "", l = () => /android/i.test(a), r = () => /kaios/i.test(a), m = () => typeof window.InstallTrigger < "u" ? !0 : /firefox/i.test(a), i = () => typeof window.GestureEvent < "u" || /safari/i.test(a);
  return {
    isAndroid: l(),
    isFirefox: m() || r(),
    isSafari: i(),
    isKaiOS: r()
  };
};
function Ja(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var ue, Ue;
function Ya() {
  if (Ue) return ue;
  Ue = 1, ue = a;
  function e(r) {
    return r instanceof Buffer ? Buffer.from(r) : new r.constructor(r.buffer.slice(), r.byteOffset, r.length);
  }
  function a(r) {
    if (r = r || {}, r.circles) return l(r);
    const m = /* @__PURE__ */ new Map();
    if (m.set(Date, (t) => new Date(t)), m.set(Map, (t, p) => new Map(s(Array.from(t), p))), m.set(Set, (t, p) => new Set(s(Array.from(t), p))), r.constructorHandlers)
      for (const t of r.constructorHandlers)
        m.set(t[0], t[1]);
    let i = null;
    return r.proto ? c : n;
    function s(t, p) {
      const h = Object.keys(t), u = new Array(h.length);
      for (let d = 0; d < h.length; d++) {
        const S = h[d], q = t[S];
        typeof q != "object" || q === null ? u[S] = q : q.constructor !== Object && (i = m.get(q.constructor)) ? u[S] = i(q, p) : ArrayBuffer.isView(q) ? u[S] = e(q) : u[S] = p(q);
      }
      return u;
    }
    function n(t) {
      if (typeof t != "object" || t === null) return t;
      if (Array.isArray(t)) return s(t, n);
      if (t.constructor !== Object && (i = m.get(t.constructor)))
        return i(t, n);
      const p = {};
      for (const h in t) {
        if (Object.hasOwnProperty.call(t, h) === !1) continue;
        const u = t[h];
        typeof u != "object" || u === null ? p[h] = u : u.constructor !== Object && (i = m.get(u.constructor)) ? p[h] = i(u, n) : ArrayBuffer.isView(u) ? p[h] = e(u) : p[h] = n(u);
      }
      return p;
    }
    function c(t) {
      if (typeof t != "object" || t === null) return t;
      if (Array.isArray(t)) return s(t, c);
      if (t.constructor !== Object && (i = m.get(t.constructor)))
        return i(t, c);
      const p = {};
      for (const h in t) {
        const u = t[h];
        typeof u != "object" || u === null ? p[h] = u : u.constructor !== Object && (i = m.get(u.constructor)) ? p[h] = i(u, c) : ArrayBuffer.isView(u) ? p[h] = e(u) : p[h] = c(u);
      }
      return p;
    }
  }
  function l(r) {
    const m = [], i = [], s = /* @__PURE__ */ new Map();
    if (s.set(Date, (h) => new Date(h)), s.set(Map, (h, u) => new Map(c(Array.from(h), u))), s.set(Set, (h, u) => new Set(c(Array.from(h), u))), r.constructorHandlers)
      for (const h of r.constructorHandlers)
        s.set(h[0], h[1]);
    let n = null;
    return r.proto ? p : t;
    function c(h, u) {
      const d = Object.keys(h), S = new Array(d.length);
      for (let q = 0; q < d.length; q++) {
        const k = d[q], w = h[k];
        if (typeof w != "object" || w === null)
          S[k] = w;
        else if (w.constructor !== Object && (n = s.get(w.constructor)))
          S[k] = n(w, u);
        else if (ArrayBuffer.isView(w))
          S[k] = e(w);
        else {
          const x = m.indexOf(w);
          x !== -1 ? S[k] = i[x] : S[k] = u(w);
        }
      }
      return S;
    }
    function t(h) {
      if (typeof h != "object" || h === null) return h;
      if (Array.isArray(h)) return c(h, t);
      if (h.constructor !== Object && (n = s.get(h.constructor)))
        return n(h, t);
      const u = {};
      m.push(h), i.push(u);
      for (const d in h) {
        if (Object.hasOwnProperty.call(h, d) === !1) continue;
        const S = h[d];
        if (typeof S != "object" || S === null)
          u[d] = S;
        else if (S.constructor !== Object && (n = s.get(S.constructor)))
          u[d] = n(S, t);
        else if (ArrayBuffer.isView(S))
          u[d] = e(S);
        else {
          const q = m.indexOf(S);
          q !== -1 ? u[d] = i[q] : u[d] = t(S);
        }
      }
      return m.pop(), i.pop(), u;
    }
    function p(h) {
      if (typeof h != "object" || h === null) return h;
      if (Array.isArray(h)) return c(h, p);
      if (h.constructor !== Object && (n = s.get(h.constructor)))
        return n(h, p);
      const u = {};
      m.push(h), i.push(u);
      for (const d in h) {
        const S = h[d];
        if (typeof S != "object" || S === null)
          u[d] = S;
        else if (S.constructor !== Object && (n = s.get(S.constructor)))
          u[d] = n(S, p);
        else if (ArrayBuffer.isView(S))
          u[d] = e(S);
        else {
          const q = m.indexOf(S);
          q !== -1 ? u[d] = i[q] : u[d] = p(S);
        }
      }
      return m.pop(), i.pop(), u;
    }
  }
  return ue;
}
var Za = Ya();
const ma = /* @__PURE__ */ Ja(Za);
/**
 * @name codsen-utils
 * @fileoverview Various utility functions
 * @version 1.6.18
 * @author Roy Revelt, Codsen Ltd
 * @license MIT
 * {@link https://codsen.com/os/codsen-utils/}
 */
ma();
function we(e) {
  if (e == null || typeof e != "object") return !1;
  let a = Object.getPrototypeOf(e);
  return a !== null && a !== Object.prototype && Object.getPrototypeOf(a) !== null ? !1 : !(Symbol.iterator in e) && !(Symbol.toStringTag in e);
}
function j(e) {
  return typeof e == "string";
}
function U(e) {
  return Number.isSafeInteger(e) && e >= 0;
}
function L(e) {
  return e != null;
}
function Qa(e, a) {
  return we(e) && j(a) && a in e;
}
var Xa = typeof globalThis == "object" && globalThis && globalThis.Object === Object && globalThis, en = typeof self == "object" && self && self.Object === Object && self, Pe = Xa || en || Function("return this")(), K = Pe.Symbol, sa = Object.prototype, an = sa.hasOwnProperty, nn = sa.toString, X = K ? K.toStringTag : void 0;
function ln(e) {
  var a = an.call(e, X), l = e[X];
  try {
    e[X] = void 0;
    var r = !0;
  } catch {
  }
  var m = nn.call(e);
  return r && (a ? e[X] = l : delete e[X]), m;
}
var rn = Object.prototype, on = rn.toString;
function tn(e) {
  return on.call(e);
}
var mn = "[object Null]", sn = "[object Undefined]", Le = K ? K.toStringTag : void 0;
function da(e) {
  return e == null ? e === void 0 ? sn : mn : Le && Le in Object(e) ? ln(e) : tn(e);
}
function ca(e) {
  return e != null && typeof e == "object";
}
var dn = "[object Symbol]";
function cn(e) {
  return typeof e == "symbol" || ca(e) && da(e) == dn;
}
function gn(e, a) {
  for (var l = -1, r = e == null ? 0 : e.length, m = Array(r); ++l < r; )
    m[l] = a(e[l], l, e);
  return m;
}
var un = Array.isArray, Be = K ? K.prototype : void 0, De = Be ? Be.toString : void 0;
function Ge(e) {
  if (typeof e == "string")
    return e;
  if (un(e))
    return gn(e, Ge) + "";
  if (cn(e))
    return De ? De.call(e) : "";
  var a = e + "";
  return a == "0" && 1 / e == -1 / 0 ? "-0" : a;
}
var hn = /\s/;
function fn(e) {
  for (var a = e.length; a-- && hn.test(e.charAt(a)); )
    ;
  return a;
}
var pn = /^\s+/;
function yn(e) {
  return e && e.slice(0, fn(e) + 1).replace(pn, "");
}
function ga(e) {
  var a = typeof e;
  return e != null && (a == "object" || a == "function");
}
function ua(e) {
  return e;
}
var Nn = "[object AsyncFunction]", Sn = "[object Function]", bn = "[object GeneratorFunction]", Rn = "[object Proxy]";
function ha(e) {
  if (!ga(e))
    return !1;
  var a = da(e);
  return a == Sn || a == bn || a == Nn || a == Rn;
}
var he = Pe["__core-js_shared__"], Fe = (function() {
  var e = /[^.]+$/.exec(he && he.keys && he.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
})();
function An(e) {
  return !!Fe && Fe in e;
}
var qn = Function.prototype, vn = qn.toString;
function wn(e) {
  if (e != null) {
    try {
      return vn.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var zn = /[\\^$.*+?()[\]{}|]/g, kn = /^\[object .+?Constructor\]$/, On = Function.prototype, Pn = Object.prototype, Gn = On.toString, xn = Pn.hasOwnProperty, En = RegExp(
  "^" + Gn.call(xn).replace(zn, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Mn(e) {
  if (!ga(e) || An(e))
    return !1;
  var a = ha(e) ? En : kn;
  return a.test(wn(e));
}
function Tn(e, a) {
  return e?.[a];
}
function xe(e, a) {
  var l = Tn(e, a);
  return Mn(l) ? l : void 0;
}
function Cn(e, a, l) {
  switch (l.length) {
    case 0:
      return e.call(a);
    case 1:
      return e.call(a, l[0]);
    case 2:
      return e.call(a, l[0], l[1]);
    case 3:
      return e.call(a, l[0], l[1], l[2]);
  }
  return e.apply(a, l);
}
var Hn = 800, In = 16, Un = Date.now;
function Ln(e) {
  var a = 0, l = 0;
  return function() {
    var r = Un(), m = In - (r - l);
    if (l = r, m > 0) {
      if (++a >= Hn)
        return arguments[0];
    } else
      a = 0;
    return e.apply(void 0, arguments);
  };
}
function Bn(e) {
  return function() {
    return e;
  };
}
var Ve = (function() {
  try {
    var e = xe(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
})(), Dn = Ve ? function(e, a) {
  return Ve(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: Bn(a),
    writable: !0
  });
} : ua, Fn = Ln(Dn);
function Vn(e, a, l, r) {
  for (var m = e.length, i = l + -1; ++i < m; )
    if (a(e[i], i, e))
      return i;
  return -1;
}
function jn(e) {
  return e !== e;
}
function _n(e, a, l) {
  for (var r = l - 1, m = e.length; ++r < m; )
    if (e[r] === a)
      return r;
  return -1;
}
function Ee(e, a, l) {
  return a === a ? _n(e, a, l) : Vn(e, jn, l);
}
function Kn(e, a) {
  var l = e == null ? 0 : e.length;
  return !!l && Ee(e, a, 0) > -1;
}
function $n(e, a) {
  return e === a || e !== e && a !== a;
}
var je = Math.max;
function Wn(e, a, l) {
  return a = je(a === void 0 ? e.length - 1 : a, 0), function() {
    for (var r = arguments, m = -1, i = je(r.length - a, 0), s = Array(i); ++m < i; )
      s[m] = r[a + m];
    m = -1;
    for (var n = Array(a + 1); ++m < a; )
      n[m] = r[m];
    return n[a] = l(s), Cn(e, this, n);
  };
}
function Jn(e, a) {
  return Fn(Wn(e, a, ua), e + "");
}
var Yn = 9007199254740991;
function Zn(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Yn;
}
function Qn(e) {
  return e != null && Zn(e.length) && !ha(e);
}
var ne = xe(Object, "create");
function Xn() {
  this.__data__ = ne ? ne(null) : {}, this.size = 0;
}
function el(e) {
  var a = this.has(e) && delete this.__data__[e];
  return this.size -= a ? 1 : 0, a;
}
var al = "__lodash_hash_undefined__", nl = Object.prototype, ll = nl.hasOwnProperty;
function rl(e) {
  var a = this.__data__;
  if (ne) {
    var l = a[e];
    return l === al ? void 0 : l;
  }
  return ll.call(a, e) ? a[e] : void 0;
}
var il = Object.prototype, ol = il.hasOwnProperty;
function tl(e) {
  var a = this.__data__;
  return ne ? a[e] !== void 0 : ol.call(a, e);
}
var ml = "__lodash_hash_undefined__";
function sl(e, a) {
  var l = this.__data__;
  return this.size += this.has(e) ? 0 : 1, l[e] = ne && a === void 0 ? ml : a, this;
}
function D(e) {
  var a = -1, l = e == null ? 0 : e.length;
  for (this.clear(); ++a < l; ) {
    var r = e[a];
    this.set(r[0], r[1]);
  }
}
D.prototype.clear = Xn;
D.prototype.delete = el;
D.prototype.get = rl;
D.prototype.has = tl;
D.prototype.set = sl;
function dl() {
  this.__data__ = [], this.size = 0;
}
function me(e, a) {
  for (var l = e.length; l--; )
    if ($n(e[l][0], a))
      return l;
  return -1;
}
var cl = Array.prototype, gl = cl.splice;
function ul(e) {
  var a = this.__data__, l = me(a, e);
  if (l < 0)
    return !1;
  var r = a.length - 1;
  return l == r ? a.pop() : gl.call(a, l, 1), --this.size, !0;
}
function hl(e) {
  var a = this.__data__, l = me(a, e);
  return l < 0 ? void 0 : a[l][1];
}
function fl(e) {
  return me(this.__data__, e) > -1;
}
function pl(e, a) {
  var l = this.__data__, r = me(l, e);
  return r < 0 ? (++this.size, l.push([e, a])) : l[r][1] = a, this;
}
function J(e) {
  var a = -1, l = e == null ? 0 : e.length;
  for (this.clear(); ++a < l; ) {
    var r = e[a];
    this.set(r[0], r[1]);
  }
}
J.prototype.clear = dl;
J.prototype.delete = ul;
J.prototype.get = hl;
J.prototype.has = fl;
J.prototype.set = pl;
var yl = xe(Pe, "Map");
function Nl() {
  this.size = 0, this.__data__ = {
    hash: new D(),
    map: new (yl || J)(),
    string: new D()
  };
}
function Sl(e) {
  var a = typeof e;
  return a == "string" || a == "number" || a == "symbol" || a == "boolean" ? e !== "__proto__" : e === null;
}
function se(e, a) {
  var l = e.__data__;
  return Sl(a) ? l[typeof a == "string" ? "string" : "hash"] : l.map;
}
function bl(e) {
  var a = se(this, e).delete(e);
  return this.size -= a ? 1 : 0, a;
}
function Rl(e) {
  return se(this, e).get(e);
}
function Al(e) {
  return se(this, e).has(e);
}
function ql(e, a) {
  var l = se(this, e), r = l.size;
  return l.set(e, a), this.size += l.size == r ? 0 : 1, this;
}
function Y(e) {
  var a = -1, l = e == null ? 0 : e.length;
  for (this.clear(); ++a < l; ) {
    var r = e[a];
    this.set(r[0], r[1]);
  }
}
Y.prototype.clear = Nl;
Y.prototype.delete = bl;
Y.prototype.get = Rl;
Y.prototype.has = Al;
Y.prototype.set = ql;
function vl(e) {
  return e == null ? "" : Ge(e);
}
function wl(e, a, l) {
  var r = -1, m = e.length;
  a < 0 && (a = -a > m ? 0 : m + a), l = l > m ? m : l, l < 0 && (l += m), m = a > l ? 0 : l - a >>> 0, a >>>= 0;
  for (var i = Array(m); ++r < m; )
    i[r] = e[r + a];
  return i;
}
function zl(e, a, l) {
  var r = e.length;
  return l = l === void 0 ? r : l, !a && l >= r ? e : wl(e, a, l);
}
var kl = "\\ud800-\\udfff", Ol = "\\u0300-\\u036f", Pl = "\\ufe20-\\ufe2f", Gl = "\\u20d0-\\u20ff", xl = Ol + Pl + Gl, El = "\\ufe0e\\ufe0f", Ml = "\\u200d", Tl = RegExp("[" + Ml + kl + xl + El + "]");
function Cl(e) {
  return Tl.test(e);
}
function Hl(e) {
  return e.split("");
}
var fa = "\\ud800-\\udfff", Il = "\\u0300-\\u036f", Ul = "\\ufe20-\\ufe2f", Ll = "\\u20d0-\\u20ff", Bl = Il + Ul + Ll, Dl = "\\ufe0e\\ufe0f", Fl = "[" + fa + "]", ze = "[" + Bl + "]", ke = "\\ud83c[\\udffb-\\udfff]", Vl = "(?:" + ze + "|" + ke + ")", pa = "[^" + fa + "]", ya = "(?:\\ud83c[\\udde6-\\uddff]){2}", Na = "[\\ud800-\\udbff][\\udc00-\\udfff]", jl = "\\u200d", Sa = Vl + "?", ba = "[" + Dl + "]?", _l = "(?:" + jl + "(?:" + [pa, ya, Na].join("|") + ")" + ba + Sa + ")*", Kl = ba + Sa + _l, $l = "(?:" + [pa + ze + "?", ze, ya, Na, Fl].join("|") + ")", Wl = RegExp(ke + "(?=" + ke + ")|" + $l + Kl, "g");
function Jl(e) {
  return e.match(Wl) || [];
}
function _e(e) {
  return Cl(e) ? Jl(e) : Hl(e);
}
var Yl = "__lodash_hash_undefined__";
function Zl(e) {
  return this.__data__.set(e, Yl), this;
}
function Ql(e) {
  return this.__data__.has(e);
}
function oe(e) {
  var a = -1, l = e == null ? 0 : e.length;
  for (this.__data__ = new Y(); ++a < l; )
    this.add(e[a]);
}
oe.prototype.add = oe.prototype.push = Zl;
oe.prototype.has = Ql;
function Xl(e, a) {
  return e.has(a);
}
function er(e) {
  return ca(e) && Qn(e);
}
var ar = 200;
function nr(e, a, l, r) {
  var m = -1, i = Kn, s = !0, n = e.length, c = [], t = a.length;
  if (!n)
    return c;
  a.length >= ar && (i = Xl, s = !1, a = new oe(a));
  e:
    for (; ++m < n; ) {
      var p = e[m], h = p;
      if (p = p !== 0 ? p : 0, s && h === h) {
        for (var u = t; u--; )
          if (a[u] === h)
            continue e;
        c.push(p);
      } else i(a, h, r) || c.push(p);
    }
  return c;
}
function lr(e, a) {
  for (var l = e.length; l-- && Ee(a, e[l], 0) > -1; )
    ;
  return l;
}
function rr(e, a) {
  for (var l = -1, r = e.length; ++l < r && Ee(a, e[l], 0) > -1; )
    ;
  return l;
}
function Ke(e, a, l) {
  if (e = vl(e), e && a === void 0)
    return yn(e);
  if (!e || !(a = Ge(a)))
    return e;
  var r = _e(e), m = _e(a), i = rr(r, m), s = lr(r, m) + 1;
  return zl(r, i, s).join("");
}
var ir = Jn(function(e, a) {
  return er(e) ? nr(e, a) : [];
}), _ = function() {
  return _ = Object.assign || function(e) {
    for (var a, l = 1, r = arguments.length; l < r; l++) {
      a = arguments[l];
      for (var m in a) Object.prototype.hasOwnProperty.call(a, m) && (e[m] = a[m]);
    }
    return e;
  }, _.apply(this, arguments);
}, or = "~", tr = "~~";
function Me(e, a) {
  for (var l = {}, r = {}, m = e.split(tr), i = !1, s = 0; m.length > s; s++) {
    for (var n = m[s].split(or), c = 0; c < n.length; c += 2) {
      var t = n[c], p = n[c + 1], h = "&" + t + ";";
      l[h] = p, i && (l["&" + t] = p), r[p] = h;
    }
    i = !0;
  }
  return a ? { entities: _(_({}, l), a.entities), characters: _(_({}, r), a.characters) } : { entities: l, characters: r };
}
var fe = {
  xml: /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,
  html4: /&notin;|&(?:nbsp|iexcl|cent|pound|curren|yen|brvbar|sect|uml|copy|ordf|laquo|not|shy|reg|macr|deg|plusmn|sup2|sup3|acute|micro|para|middot|cedil|sup1|ordm|raquo|frac14|frac12|frac34|iquest|Agrave|Aacute|Acirc|Atilde|Auml|Aring|AElig|Ccedil|Egrave|Eacute|Ecirc|Euml|Igrave|Iacute|Icirc|Iuml|ETH|Ntilde|Ograve|Oacute|Ocirc|Otilde|Ouml|times|Oslash|Ugrave|Uacute|Ucirc|Uuml|Yacute|THORN|szlig|agrave|aacute|acirc|atilde|auml|aring|aelig|ccedil|egrave|eacute|ecirc|euml|igrave|iacute|icirc|iuml|eth|ntilde|ograve|oacute|ocirc|otilde|ouml|divide|oslash|ugrave|uacute|ucirc|uuml|yacute|thorn|yuml|quot|amp|lt|gt|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,
  html5: /&centerdot;|&copysr;|&divideontimes;|&gtcc;|&gtcir;|&gtdot;|&gtlPar;|&gtquest;|&gtrapprox;|&gtrarr;|&gtrdot;|&gtreqless;|&gtreqqless;|&gtrless;|&gtrsim;|&ltcc;|&ltcir;|&ltdot;|&lthree;|&ltimes;|&ltlarr;|&ltquest;|&ltrPar;|&ltri;|&ltrie;|&ltrif;|&notin;|&notinE;|&notindot;|&notinva;|&notinvb;|&notinvc;|&notni;|&notniva;|&notnivb;|&notnivc;|&parallel;|&timesb;|&timesbar;|&timesd;|&(?:AElig|AMP|Aacute|Acirc|Agrave|Aring|Atilde|Auml|COPY|Ccedil|ETH|Eacute|Ecirc|Egrave|Euml|GT|Iacute|Icirc|Igrave|Iuml|LT|Ntilde|Oacute|Ocirc|Ograve|Oslash|Otilde|Ouml|QUOT|REG|THORN|Uacute|Ucirc|Ugrave|Uuml|Yacute|aacute|acirc|acute|aelig|agrave|amp|aring|atilde|auml|brvbar|ccedil|cedil|cent|copy|curren|deg|divide|eacute|ecirc|egrave|eth|euml|frac12|frac14|frac34|gt|iacute|icirc|iexcl|igrave|iquest|iuml|laquo|lt|macr|micro|middot|nbsp|not|ntilde|oacute|ocirc|ograve|ordf|ordm|oslash|otilde|ouml|para|plusmn|pound|quot|raquo|reg|sect|shy|sup1|sup2|sup3|szlig|thorn|times|uacute|ucirc|ugrave|uml|uuml|yacute|yen|yuml|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g
}, $ = {};
$.xml = Me(`lt~<~gt~>~quot~"~apos~'~amp~&`);
$.html4 = Me(`apos~'~OElig~Œ~oelig~œ~Scaron~Š~scaron~š~Yuml~Ÿ~circ~ˆ~tilde~˜~ensp~ ~emsp~ ~thinsp~ ~zwnj~‌~zwj~‍~lrm~‎~rlm~‏~ndash~–~mdash~—~lsquo~‘~rsquo~’~sbquo~‚~ldquo~“~rdquo~”~bdquo~„~dagger~†~Dagger~‡~permil~‰~lsaquo~‹~rsaquo~›~euro~€~fnof~ƒ~Alpha~Α~Beta~Β~Gamma~Γ~Delta~Δ~Epsilon~Ε~Zeta~Ζ~Eta~Η~Theta~Θ~Iota~Ι~Kappa~Κ~Lambda~Λ~Mu~Μ~Nu~Ν~Xi~Ξ~Omicron~Ο~Pi~Π~Rho~Ρ~Sigma~Σ~Tau~Τ~Upsilon~Υ~Phi~Φ~Chi~Χ~Psi~Ψ~Omega~Ω~alpha~α~beta~β~gamma~γ~delta~δ~epsilon~ε~zeta~ζ~eta~η~theta~θ~iota~ι~kappa~κ~lambda~λ~mu~μ~nu~ν~xi~ξ~omicron~ο~pi~π~rho~ρ~sigmaf~ς~sigma~σ~tau~τ~upsilon~υ~phi~φ~chi~χ~psi~ψ~omega~ω~thetasym~ϑ~upsih~ϒ~piv~ϖ~bull~•~hellip~…~prime~′~Prime~″~oline~‾~frasl~⁄~weierp~℘~image~ℑ~real~ℜ~trade~™~alefsym~ℵ~larr~←~uarr~↑~rarr~→~darr~↓~harr~↔~crarr~↵~lArr~⇐~uArr~⇑~rArr~⇒~dArr~⇓~hArr~⇔~forall~∀~part~∂~exist~∃~empty~∅~nabla~∇~isin~∈~notin~∉~ni~∋~prod~∏~sum~∑~minus~−~lowast~∗~radic~√~prop~∝~infin~∞~ang~∠~and~∧~or~∨~cap~∩~cup~∪~int~∫~there4~∴~sim~∼~cong~≅~asymp~≈~ne~≠~equiv~≡~le~≤~ge~≥~sub~⊂~sup~⊃~nsub~⊄~sube~⊆~supe~⊇~oplus~⊕~otimes~⊗~perp~⊥~sdot~⋅~lceil~⌈~rceil~⌉~lfloor~⌊~rfloor~⌋~lang~〈~rang~〉~loz~◊~spades~♠~clubs~♣~hearts~♥~diams~♦~~nbsp~ ~iexcl~¡~cent~¢~pound~£~curren~¤~yen~¥~brvbar~¦~sect~§~uml~¨~copy~©~ordf~ª~laquo~«~not~¬~shy~­~reg~®~macr~¯~deg~°~plusmn~±~sup2~²~sup3~³~acute~´~micro~µ~para~¶~middot~·~cedil~¸~sup1~¹~ordm~º~raquo~»~frac14~¼~frac12~½~frac34~¾~iquest~¿~Agrave~À~Aacute~Á~Acirc~Â~Atilde~Ã~Auml~Ä~Aring~Å~AElig~Æ~Ccedil~Ç~Egrave~È~Eacute~É~Ecirc~Ê~Euml~Ë~Igrave~Ì~Iacute~Í~Icirc~Î~Iuml~Ï~ETH~Ð~Ntilde~Ñ~Ograve~Ò~Oacute~Ó~Ocirc~Ô~Otilde~Õ~Ouml~Ö~times~×~Oslash~Ø~Ugrave~Ù~Uacute~Ú~Ucirc~Û~Uuml~Ü~Yacute~Ý~THORN~Þ~szlig~ß~agrave~à~aacute~á~acirc~â~atilde~ã~auml~ä~aring~å~aelig~æ~ccedil~ç~egrave~è~eacute~é~ecirc~ê~euml~ë~igrave~ì~iacute~í~icirc~î~iuml~ï~eth~ð~ntilde~ñ~ograve~ò~oacute~ó~ocirc~ô~otilde~õ~ouml~ö~divide~÷~oslash~ø~ugrave~ù~uacute~ú~ucirc~û~uuml~ü~yacute~ý~thorn~þ~yuml~ÿ~quot~"~amp~&~lt~<~gt~>`);
$.html5 = Me('Abreve~Ă~Acy~А~Afr~𝔄~Amacr~Ā~And~⩓~Aogon~Ą~Aopf~𝔸~ApplyFunction~⁡~Ascr~𝒜~Assign~≔~Backslash~∖~Barv~⫧~Barwed~⌆~Bcy~Б~Because~∵~Bernoullis~ℬ~Bfr~𝔅~Bopf~𝔹~Breve~˘~Bscr~ℬ~Bumpeq~≎~CHcy~Ч~Cacute~Ć~Cap~⋒~CapitalDifferentialD~ⅅ~Cayleys~ℭ~Ccaron~Č~Ccirc~Ĉ~Cconint~∰~Cdot~Ċ~Cedilla~¸~CenterDot~·~Cfr~ℭ~CircleDot~⊙~CircleMinus~⊖~CirclePlus~⊕~CircleTimes~⊗~ClockwiseContourIntegral~∲~CloseCurlyDoubleQuote~”~CloseCurlyQuote~’~Colon~∷~Colone~⩴~Congruent~≡~Conint~∯~ContourIntegral~∮~Copf~ℂ~Coproduct~∐~CounterClockwiseContourIntegral~∳~Cross~⨯~Cscr~𝒞~Cup~⋓~CupCap~≍~DD~ⅅ~DDotrahd~⤑~DJcy~Ђ~DScy~Ѕ~DZcy~Џ~Darr~↡~Dashv~⫤~Dcaron~Ď~Dcy~Д~Del~∇~Dfr~𝔇~DiacriticalAcute~´~DiacriticalDot~˙~DiacriticalDoubleAcute~˝~DiacriticalGrave~`~DiacriticalTilde~˜~Diamond~⋄~DifferentialD~ⅆ~Dopf~𝔻~Dot~¨~DotDot~⃜~DotEqual~≐~DoubleContourIntegral~∯~DoubleDot~¨~DoubleDownArrow~⇓~DoubleLeftArrow~⇐~DoubleLeftRightArrow~⇔~DoubleLeftTee~⫤~DoubleLongLeftArrow~⟸~DoubleLongLeftRightArrow~⟺~DoubleLongRightArrow~⟹~DoubleRightArrow~⇒~DoubleRightTee~⊨~DoubleUpArrow~⇑~DoubleUpDownArrow~⇕~DoubleVerticalBar~∥~DownArrow~↓~DownArrowBar~⤓~DownArrowUpArrow~⇵~DownBreve~̑~DownLeftRightVector~⥐~DownLeftTeeVector~⥞~DownLeftVector~↽~DownLeftVectorBar~⥖~DownRightTeeVector~⥟~DownRightVector~⇁~DownRightVectorBar~⥗~DownTee~⊤~DownTeeArrow~↧~Downarrow~⇓~Dscr~𝒟~Dstrok~Đ~ENG~Ŋ~Ecaron~Ě~Ecy~Э~Edot~Ė~Efr~𝔈~Element~∈~Emacr~Ē~EmptySmallSquare~◻~EmptyVerySmallSquare~▫~Eogon~Ę~Eopf~𝔼~Equal~⩵~EqualTilde~≂~Equilibrium~⇌~Escr~ℰ~Esim~⩳~Exists~∃~ExponentialE~ⅇ~Fcy~Ф~Ffr~𝔉~FilledSmallSquare~◼~FilledVerySmallSquare~▪~Fopf~𝔽~ForAll~∀~Fouriertrf~ℱ~Fscr~ℱ~GJcy~Ѓ~Gammad~Ϝ~Gbreve~Ğ~Gcedil~Ģ~Gcirc~Ĝ~Gcy~Г~Gdot~Ġ~Gfr~𝔊~Gg~⋙~Gopf~𝔾~GreaterEqual~≥~GreaterEqualLess~⋛~GreaterFullEqual~≧~GreaterGreater~⪢~GreaterLess~≷~GreaterSlantEqual~⩾~GreaterTilde~≳~Gscr~𝒢~Gt~≫~HARDcy~Ъ~Hacek~ˇ~Hat~^~Hcirc~Ĥ~Hfr~ℌ~HilbertSpace~ℋ~Hopf~ℍ~HorizontalLine~─~Hscr~ℋ~Hstrok~Ħ~HumpDownHump~≎~HumpEqual~≏~IEcy~Е~IJlig~Ĳ~IOcy~Ё~Icy~И~Idot~İ~Ifr~ℑ~Im~ℑ~Imacr~Ī~ImaginaryI~ⅈ~Implies~⇒~Int~∬~Integral~∫~Intersection~⋂~InvisibleComma~⁣~InvisibleTimes~⁢~Iogon~Į~Iopf~𝕀~Iscr~ℐ~Itilde~Ĩ~Iukcy~І~Jcirc~Ĵ~Jcy~Й~Jfr~𝔍~Jopf~𝕁~Jscr~𝒥~Jsercy~Ј~Jukcy~Є~KHcy~Х~KJcy~Ќ~Kcedil~Ķ~Kcy~К~Kfr~𝔎~Kopf~𝕂~Kscr~𝒦~LJcy~Љ~Lacute~Ĺ~Lang~⟪~Laplacetrf~ℒ~Larr~↞~Lcaron~Ľ~Lcedil~Ļ~Lcy~Л~LeftAngleBracket~⟨~LeftArrow~←~LeftArrowBar~⇤~LeftArrowRightArrow~⇆~LeftCeiling~⌈~LeftDoubleBracket~⟦~LeftDownTeeVector~⥡~LeftDownVector~⇃~LeftDownVectorBar~⥙~LeftFloor~⌊~LeftRightArrow~↔~LeftRightVector~⥎~LeftTee~⊣~LeftTeeArrow~↤~LeftTeeVector~⥚~LeftTriangle~⊲~LeftTriangleBar~⧏~LeftTriangleEqual~⊴~LeftUpDownVector~⥑~LeftUpTeeVector~⥠~LeftUpVector~↿~LeftUpVectorBar~⥘~LeftVector~↼~LeftVectorBar~⥒~Leftarrow~⇐~Leftrightarrow~⇔~LessEqualGreater~⋚~LessFullEqual~≦~LessGreater~≶~LessLess~⪡~LessSlantEqual~⩽~LessTilde~≲~Lfr~𝔏~Ll~⋘~Lleftarrow~⇚~Lmidot~Ŀ~LongLeftArrow~⟵~LongLeftRightArrow~⟷~LongRightArrow~⟶~Longleftarrow~⟸~Longleftrightarrow~⟺~Longrightarrow~⟹~Lopf~𝕃~LowerLeftArrow~↙~LowerRightArrow~↘~Lscr~ℒ~Lsh~↰~Lstrok~Ł~Lt~≪~Map~⤅~Mcy~М~MediumSpace~ ~Mellintrf~ℳ~Mfr~𝔐~MinusPlus~∓~Mopf~𝕄~Mscr~ℳ~NJcy~Њ~Nacute~Ń~Ncaron~Ň~Ncedil~Ņ~Ncy~Н~NegativeMediumSpace~​~NegativeThickSpace~​~NegativeThinSpace~​~NegativeVeryThinSpace~​~NestedGreaterGreater~≫~NestedLessLess~≪~NewLine~\n~Nfr~𝔑~NoBreak~⁠~NonBreakingSpace~ ~Nopf~ℕ~Not~⫬~NotCongruent~≢~NotCupCap~≭~NotDoubleVerticalBar~∦~NotElement~∉~NotEqual~≠~NotEqualTilde~≂̸~NotExists~∄~NotGreater~≯~NotGreaterEqual~≱~NotGreaterFullEqual~≧̸~NotGreaterGreater~≫̸~NotGreaterLess~≹~NotGreaterSlantEqual~⩾̸~NotGreaterTilde~≵~NotHumpDownHump~≎̸~NotHumpEqual~≏̸~NotLeftTriangle~⋪~NotLeftTriangleBar~⧏̸~NotLeftTriangleEqual~⋬~NotLess~≮~NotLessEqual~≰~NotLessGreater~≸~NotLessLess~≪̸~NotLessSlantEqual~⩽̸~NotLessTilde~≴~NotNestedGreaterGreater~⪢̸~NotNestedLessLess~⪡̸~NotPrecedes~⊀~NotPrecedesEqual~⪯̸~NotPrecedesSlantEqual~⋠~NotReverseElement~∌~NotRightTriangle~⋫~NotRightTriangleBar~⧐̸~NotRightTriangleEqual~⋭~NotSquareSubset~⊏̸~NotSquareSubsetEqual~⋢~NotSquareSuperset~⊐̸~NotSquareSupersetEqual~⋣~NotSubset~⊂⃒~NotSubsetEqual~⊈~NotSucceeds~⊁~NotSucceedsEqual~⪰̸~NotSucceedsSlantEqual~⋡~NotSucceedsTilde~≿̸~NotSuperset~⊃⃒~NotSupersetEqual~⊉~NotTilde~≁~NotTildeEqual~≄~NotTildeFullEqual~≇~NotTildeTilde~≉~NotVerticalBar~∤~Nscr~𝒩~Ocy~О~Odblac~Ő~Ofr~𝔒~Omacr~Ō~Oopf~𝕆~OpenCurlyDoubleQuote~“~OpenCurlyQuote~‘~Or~⩔~Oscr~𝒪~Otimes~⨷~OverBar~‾~OverBrace~⏞~OverBracket~⎴~OverParenthesis~⏜~PartialD~∂~Pcy~П~Pfr~𝔓~PlusMinus~±~Poincareplane~ℌ~Popf~ℙ~Pr~⪻~Precedes~≺~PrecedesEqual~⪯~PrecedesSlantEqual~≼~PrecedesTilde~≾~Product~∏~Proportion~∷~Proportional~∝~Pscr~𝒫~Qfr~𝔔~Qopf~ℚ~Qscr~𝒬~RBarr~⤐~Racute~Ŕ~Rang~⟫~Rarr~↠~Rarrtl~⤖~Rcaron~Ř~Rcedil~Ŗ~Rcy~Р~Re~ℜ~ReverseElement~∋~ReverseEquilibrium~⇋~ReverseUpEquilibrium~⥯~Rfr~ℜ~RightAngleBracket~⟩~RightArrow~→~RightArrowBar~⇥~RightArrowLeftArrow~⇄~RightCeiling~⌉~RightDoubleBracket~⟧~RightDownTeeVector~⥝~RightDownVector~⇂~RightDownVectorBar~⥕~RightFloor~⌋~RightTee~⊢~RightTeeArrow~↦~RightTeeVector~⥛~RightTriangle~⊳~RightTriangleBar~⧐~RightTriangleEqual~⊵~RightUpDownVector~⥏~RightUpTeeVector~⥜~RightUpVector~↾~RightUpVectorBar~⥔~RightVector~⇀~RightVectorBar~⥓~Rightarrow~⇒~Ropf~ℝ~RoundImplies~⥰~Rrightarrow~⇛~Rscr~ℛ~Rsh~↱~RuleDelayed~⧴~SHCHcy~Щ~SHcy~Ш~SOFTcy~Ь~Sacute~Ś~Sc~⪼~Scedil~Ş~Scirc~Ŝ~Scy~С~Sfr~𝔖~ShortDownArrow~↓~ShortLeftArrow~←~ShortRightArrow~→~ShortUpArrow~↑~SmallCircle~∘~Sopf~𝕊~Sqrt~√~Square~□~SquareIntersection~⊓~SquareSubset~⊏~SquareSubsetEqual~⊑~SquareSuperset~⊐~SquareSupersetEqual~⊒~SquareUnion~⊔~Sscr~𝒮~Star~⋆~Sub~⋐~Subset~⋐~SubsetEqual~⊆~Succeeds~≻~SucceedsEqual~⪰~SucceedsSlantEqual~≽~SucceedsTilde~≿~SuchThat~∋~Sum~∑~Sup~⋑~Superset~⊃~SupersetEqual~⊇~Supset~⋑~TRADE~™~TSHcy~Ћ~TScy~Ц~Tab~	~Tcaron~Ť~Tcedil~Ţ~Tcy~Т~Tfr~𝔗~Therefore~∴~ThickSpace~  ~ThinSpace~ ~Tilde~∼~TildeEqual~≃~TildeFullEqual~≅~TildeTilde~≈~Topf~𝕋~TripleDot~⃛~Tscr~𝒯~Tstrok~Ŧ~Uarr~↟~Uarrocir~⥉~Ubrcy~Ў~Ubreve~Ŭ~Ucy~У~Udblac~Ű~Ufr~𝔘~Umacr~Ū~UnderBar~_~UnderBrace~⏟~UnderBracket~⎵~UnderParenthesis~⏝~Union~⋃~UnionPlus~⊎~Uogon~Ų~Uopf~𝕌~UpArrow~↑~UpArrowBar~⤒~UpArrowDownArrow~⇅~UpDownArrow~↕~UpEquilibrium~⥮~UpTee~⊥~UpTeeArrow~↥~Uparrow~⇑~Updownarrow~⇕~UpperLeftArrow~↖~UpperRightArrow~↗~Upsi~ϒ~Uring~Ů~Uscr~𝒰~Utilde~Ũ~VDash~⊫~Vbar~⫫~Vcy~В~Vdash~⊩~Vdashl~⫦~Vee~⋁~Verbar~‖~Vert~‖~VerticalBar~∣~VerticalLine~|~VerticalSeparator~❘~VerticalTilde~≀~VeryThinSpace~ ~Vfr~𝔙~Vopf~𝕍~Vscr~𝒱~Vvdash~⊪~Wcirc~Ŵ~Wedge~⋀~Wfr~𝔚~Wopf~𝕎~Wscr~𝒲~Xfr~𝔛~Xopf~𝕏~Xscr~𝒳~YAcy~Я~YIcy~Ї~YUcy~Ю~Ycirc~Ŷ~Ycy~Ы~Yfr~𝔜~Yopf~𝕐~Yscr~𝒴~ZHcy~Ж~Zacute~Ź~Zcaron~Ž~Zcy~З~Zdot~Ż~ZeroWidthSpace~​~Zfr~ℨ~Zopf~ℤ~Zscr~𝒵~abreve~ă~ac~∾~acE~∾̳~acd~∿~acy~а~af~⁡~afr~𝔞~aleph~ℵ~amacr~ā~amalg~⨿~andand~⩕~andd~⩜~andslope~⩘~andv~⩚~ange~⦤~angle~∠~angmsd~∡~angmsdaa~⦨~angmsdab~⦩~angmsdac~⦪~angmsdad~⦫~angmsdae~⦬~angmsdaf~⦭~angmsdag~⦮~angmsdah~⦯~angrt~∟~angrtvb~⊾~angrtvbd~⦝~angsph~∢~angst~Å~angzarr~⍼~aogon~ą~aopf~𝕒~ap~≈~apE~⩰~apacir~⩯~ape~≊~apid~≋~approx~≈~approxeq~≊~ascr~𝒶~ast~*~asympeq~≍~awconint~∳~awint~⨑~bNot~⫭~backcong~≌~backepsilon~϶~backprime~‵~backsim~∽~backsimeq~⋍~barvee~⊽~barwed~⌅~barwedge~⌅~bbrk~⎵~bbrktbrk~⎶~bcong~≌~bcy~б~becaus~∵~because~∵~bemptyv~⦰~bepsi~϶~bernou~ℬ~beth~ℶ~between~≬~bfr~𝔟~bigcap~⋂~bigcirc~◯~bigcup~⋃~bigodot~⨀~bigoplus~⨁~bigotimes~⨂~bigsqcup~⨆~bigstar~★~bigtriangledown~▽~bigtriangleup~△~biguplus~⨄~bigvee~⋁~bigwedge~⋀~bkarow~⤍~blacklozenge~⧫~blacksquare~▪~blacktriangle~▴~blacktriangledown~▾~blacktriangleleft~◂~blacktriangleright~▸~blank~␣~blk12~▒~blk14~░~blk34~▓~block~█~bne~=⃥~bnequiv~≡⃥~bnot~⌐~bopf~𝕓~bot~⊥~bottom~⊥~bowtie~⋈~boxDL~╗~boxDR~╔~boxDl~╖~boxDr~╓~boxH~═~boxHD~╦~boxHU~╩~boxHd~╤~boxHu~╧~boxUL~╝~boxUR~╚~boxUl~╜~boxUr~╙~boxV~║~boxVH~╬~boxVL~╣~boxVR~╠~boxVh~╫~boxVl~╢~boxVr~╟~boxbox~⧉~boxdL~╕~boxdR~╒~boxdl~┐~boxdr~┌~boxh~─~boxhD~╥~boxhU~╨~boxhd~┬~boxhu~┴~boxminus~⊟~boxplus~⊞~boxtimes~⊠~boxuL~╛~boxuR~╘~boxul~┘~boxur~└~boxv~│~boxvH~╪~boxvL~╡~boxvR~╞~boxvh~┼~boxvl~┤~boxvr~├~bprime~‵~breve~˘~bscr~𝒷~bsemi~⁏~bsim~∽~bsime~⋍~bsol~\\~bsolb~⧅~bsolhsub~⟈~bullet~•~bump~≎~bumpE~⪮~bumpe~≏~bumpeq~≏~cacute~ć~capand~⩄~capbrcup~⩉~capcap~⩋~capcup~⩇~capdot~⩀~caps~∩︀~caret~⁁~caron~ˇ~ccaps~⩍~ccaron~č~ccirc~ĉ~ccups~⩌~ccupssm~⩐~cdot~ċ~cemptyv~⦲~centerdot~·~cfr~𝔠~chcy~ч~check~✓~checkmark~✓~cir~○~cirE~⧃~circeq~≗~circlearrowleft~↺~circlearrowright~↻~circledR~®~circledS~Ⓢ~circledast~⊛~circledcirc~⊚~circleddash~⊝~cire~≗~cirfnint~⨐~cirmid~⫯~cirscir~⧂~clubsuit~♣~colon~:~colone~≔~coloneq~≔~comma~,~commat~@~comp~∁~compfn~∘~complement~∁~complexes~ℂ~congdot~⩭~conint~∮~copf~𝕔~coprod~∐~copysr~℗~cross~✗~cscr~𝒸~csub~⫏~csube~⫑~csup~⫐~csupe~⫒~ctdot~⋯~cudarrl~⤸~cudarrr~⤵~cuepr~⋞~cuesc~⋟~cularr~↶~cularrp~⤽~cupbrcap~⩈~cupcap~⩆~cupcup~⩊~cupdot~⊍~cupor~⩅~cups~∪︀~curarr~↷~curarrm~⤼~curlyeqprec~⋞~curlyeqsucc~⋟~curlyvee~⋎~curlywedge~⋏~curvearrowleft~↶~curvearrowright~↷~cuvee~⋎~cuwed~⋏~cwconint~∲~cwint~∱~cylcty~⌭~dHar~⥥~daleth~ℸ~dash~‐~dashv~⊣~dbkarow~⤏~dblac~˝~dcaron~ď~dcy~д~dd~ⅆ~ddagger~‡~ddarr~⇊~ddotseq~⩷~demptyv~⦱~dfisht~⥿~dfr~𝔡~dharl~⇃~dharr~⇂~diam~⋄~diamond~⋄~diamondsuit~♦~die~¨~digamma~ϝ~disin~⋲~div~÷~divideontimes~⋇~divonx~⋇~djcy~ђ~dlcorn~⌞~dlcrop~⌍~dollar~$~dopf~𝕕~dot~˙~doteq~≐~doteqdot~≑~dotminus~∸~dotplus~∔~dotsquare~⊡~doublebarwedge~⌆~downarrow~↓~downdownarrows~⇊~downharpoonleft~⇃~downharpoonright~⇂~drbkarow~⤐~drcorn~⌟~drcrop~⌌~dscr~𝒹~dscy~ѕ~dsol~⧶~dstrok~đ~dtdot~⋱~dtri~▿~dtrif~▾~duarr~⇵~duhar~⥯~dwangle~⦦~dzcy~џ~dzigrarr~⟿~eDDot~⩷~eDot~≑~easter~⩮~ecaron~ě~ecir~≖~ecolon~≕~ecy~э~edot~ė~ee~ⅇ~efDot~≒~efr~𝔢~eg~⪚~egs~⪖~egsdot~⪘~el~⪙~elinters~⏧~ell~ℓ~els~⪕~elsdot~⪗~emacr~ē~emptyset~∅~emptyv~∅~emsp13~ ~emsp14~ ~eng~ŋ~eogon~ę~eopf~𝕖~epar~⋕~eparsl~⧣~eplus~⩱~epsi~ε~epsiv~ϵ~eqcirc~≖~eqcolon~≕~eqsim~≂~eqslantgtr~⪖~eqslantless~⪕~equals~=~equest~≟~equivDD~⩸~eqvparsl~⧥~erDot~≓~erarr~⥱~escr~ℯ~esdot~≐~esim~≂~excl~!~expectation~ℰ~exponentiale~ⅇ~fallingdotseq~≒~fcy~ф~female~♀~ffilig~ﬃ~fflig~ﬀ~ffllig~ﬄ~ffr~𝔣~filig~ﬁ~fjlig~fj~flat~♭~fllig~ﬂ~fltns~▱~fopf~𝕗~fork~⋔~forkv~⫙~fpartint~⨍~frac13~⅓~frac15~⅕~frac16~⅙~frac18~⅛~frac23~⅔~frac25~⅖~frac35~⅗~frac38~⅜~frac45~⅘~frac56~⅚~frac58~⅝~frac78~⅞~frown~⌢~fscr~𝒻~gE~≧~gEl~⪌~gacute~ǵ~gammad~ϝ~gap~⪆~gbreve~ğ~gcirc~ĝ~gcy~г~gdot~ġ~gel~⋛~geq~≥~geqq~≧~geqslant~⩾~ges~⩾~gescc~⪩~gesdot~⪀~gesdoto~⪂~gesdotol~⪄~gesl~⋛︀~gesles~⪔~gfr~𝔤~gg~≫~ggg~⋙~gimel~ℷ~gjcy~ѓ~gl~≷~glE~⪒~gla~⪥~glj~⪤~gnE~≩~gnap~⪊~gnapprox~⪊~gne~⪈~gneq~⪈~gneqq~≩~gnsim~⋧~gopf~𝕘~grave~`~gscr~ℊ~gsim~≳~gsime~⪎~gsiml~⪐~gtcc~⪧~gtcir~⩺~gtdot~⋗~gtlPar~⦕~gtquest~⩼~gtrapprox~⪆~gtrarr~⥸~gtrdot~⋗~gtreqless~⋛~gtreqqless~⪌~gtrless~≷~gtrsim~≳~gvertneqq~≩︀~gvnE~≩︀~hairsp~ ~half~½~hamilt~ℋ~hardcy~ъ~harrcir~⥈~harrw~↭~hbar~ℏ~hcirc~ĥ~heartsuit~♥~hercon~⊹~hfr~𝔥~hksearow~⤥~hkswarow~⤦~hoarr~⇿~homtht~∻~hookleftarrow~↩~hookrightarrow~↪~hopf~𝕙~horbar~―~hscr~𝒽~hslash~ℏ~hstrok~ħ~hybull~⁃~hyphen~‐~ic~⁣~icy~и~iecy~е~iff~⇔~ifr~𝔦~ii~ⅈ~iiiint~⨌~iiint~∭~iinfin~⧜~iiota~℩~ijlig~ĳ~imacr~ī~imagline~ℐ~imagpart~ℑ~imath~ı~imof~⊷~imped~Ƶ~in~∈~incare~℅~infintie~⧝~inodot~ı~intcal~⊺~integers~ℤ~intercal~⊺~intlarhk~⨗~intprod~⨼~iocy~ё~iogon~į~iopf~𝕚~iprod~⨼~iscr~𝒾~isinE~⋹~isindot~⋵~isins~⋴~isinsv~⋳~isinv~∈~it~⁢~itilde~ĩ~iukcy~і~jcirc~ĵ~jcy~й~jfr~𝔧~jmath~ȷ~jopf~𝕛~jscr~𝒿~jsercy~ј~jukcy~є~kappav~ϰ~kcedil~ķ~kcy~к~kfr~𝔨~kgreen~ĸ~khcy~х~kjcy~ќ~kopf~𝕜~kscr~𝓀~lAarr~⇚~lAtail~⤛~lBarr~⤎~lE~≦~lEg~⪋~lHar~⥢~lacute~ĺ~laemptyv~⦴~lagran~ℒ~langd~⦑~langle~⟨~lap~⪅~larrb~⇤~larrbfs~⤟~larrfs~⤝~larrhk~↩~larrlp~↫~larrpl~⤹~larrsim~⥳~larrtl~↢~lat~⪫~latail~⤙~late~⪭~lates~⪭︀~lbarr~⤌~lbbrk~❲~lbrace~{~lbrack~[~lbrke~⦋~lbrksld~⦏~lbrkslu~⦍~lcaron~ľ~lcedil~ļ~lcub~{~lcy~л~ldca~⤶~ldquor~„~ldrdhar~⥧~ldrushar~⥋~ldsh~↲~leftarrow~←~leftarrowtail~↢~leftharpoondown~↽~leftharpoonup~↼~leftleftarrows~⇇~leftrightarrow~↔~leftrightarrows~⇆~leftrightharpoons~⇋~leftrightsquigarrow~↭~leftthreetimes~⋋~leg~⋚~leq~≤~leqq~≦~leqslant~⩽~les~⩽~lescc~⪨~lesdot~⩿~lesdoto~⪁~lesdotor~⪃~lesg~⋚︀~lesges~⪓~lessapprox~⪅~lessdot~⋖~lesseqgtr~⋚~lesseqqgtr~⪋~lessgtr~≶~lesssim~≲~lfisht~⥼~lfr~𝔩~lg~≶~lgE~⪑~lhard~↽~lharu~↼~lharul~⥪~lhblk~▄~ljcy~љ~ll~≪~llarr~⇇~llcorner~⌞~llhard~⥫~lltri~◺~lmidot~ŀ~lmoust~⎰~lmoustache~⎰~lnE~≨~lnap~⪉~lnapprox~⪉~lne~⪇~lneq~⪇~lneqq~≨~lnsim~⋦~loang~⟬~loarr~⇽~lobrk~⟦~longleftarrow~⟵~longleftrightarrow~⟷~longmapsto~⟼~longrightarrow~⟶~looparrowleft~↫~looparrowright~↬~lopar~⦅~lopf~𝕝~loplus~⨭~lotimes~⨴~lowbar~_~lozenge~◊~lozf~⧫~lpar~(~lparlt~⦓~lrarr~⇆~lrcorner~⌟~lrhar~⇋~lrhard~⥭~lrtri~⊿~lscr~𝓁~lsh~↰~lsim~≲~lsime~⪍~lsimg~⪏~lsqb~[~lsquor~‚~lstrok~ł~ltcc~⪦~ltcir~⩹~ltdot~⋖~lthree~⋋~ltimes~⋉~ltlarr~⥶~ltquest~⩻~ltrPar~⦖~ltri~◃~ltrie~⊴~ltrif~◂~lurdshar~⥊~luruhar~⥦~lvertneqq~≨︀~lvnE~≨︀~mDDot~∺~male~♂~malt~✠~maltese~✠~map~↦~mapsto~↦~mapstodown~↧~mapstoleft~↤~mapstoup~↥~marker~▮~mcomma~⨩~mcy~м~measuredangle~∡~mfr~𝔪~mho~℧~mid~∣~midast~*~midcir~⫰~minusb~⊟~minusd~∸~minusdu~⨪~mlcp~⫛~mldr~…~mnplus~∓~models~⊧~mopf~𝕞~mp~∓~mscr~𝓂~mstpos~∾~multimap~⊸~mumap~⊸~nGg~⋙̸~nGt~≫⃒~nGtv~≫̸~nLeftarrow~⇍~nLeftrightarrow~⇎~nLl~⋘̸~nLt~≪⃒~nLtv~≪̸~nRightarrow~⇏~nVDash~⊯~nVdash~⊮~nacute~ń~nang~∠⃒~nap~≉~napE~⩰̸~napid~≋̸~napos~ŉ~napprox~≉~natur~♮~natural~♮~naturals~ℕ~nbump~≎̸~nbumpe~≏̸~ncap~⩃~ncaron~ň~ncedil~ņ~ncong~≇~ncongdot~⩭̸~ncup~⩂~ncy~н~neArr~⇗~nearhk~⤤~nearr~↗~nearrow~↗~nedot~≐̸~nequiv~≢~nesear~⤨~nesim~≂̸~nexist~∄~nexists~∄~nfr~𝔫~ngE~≧̸~nge~≱~ngeq~≱~ngeqq~≧̸~ngeqslant~⩾̸~nges~⩾̸~ngsim~≵~ngt~≯~ngtr~≯~nhArr~⇎~nharr~↮~nhpar~⫲~nis~⋼~nisd~⋺~niv~∋~njcy~њ~nlArr~⇍~nlE~≦̸~nlarr~↚~nldr~‥~nle~≰~nleftarrow~↚~nleftrightarrow~↮~nleq~≰~nleqq~≦̸~nleqslant~⩽̸~nles~⩽̸~nless~≮~nlsim~≴~nlt~≮~nltri~⋪~nltrie~⋬~nmid~∤~nopf~𝕟~notinE~⋹̸~notindot~⋵̸~notinva~∉~notinvb~⋷~notinvc~⋶~notni~∌~notniva~∌~notnivb~⋾~notnivc~⋽~npar~∦~nparallel~∦~nparsl~⫽⃥~npart~∂̸~npolint~⨔~npr~⊀~nprcue~⋠~npre~⪯̸~nprec~⊀~npreceq~⪯̸~nrArr~⇏~nrarr~↛~nrarrc~⤳̸~nrarrw~↝̸~nrightarrow~↛~nrtri~⋫~nrtrie~⋭~nsc~⊁~nsccue~⋡~nsce~⪰̸~nscr~𝓃~nshortmid~∤~nshortparallel~∦~nsim~≁~nsime~≄~nsimeq~≄~nsmid~∤~nspar~∦~nsqsube~⋢~nsqsupe~⋣~nsubE~⫅̸~nsube~⊈~nsubset~⊂⃒~nsubseteq~⊈~nsubseteqq~⫅̸~nsucc~⊁~nsucceq~⪰̸~nsup~⊅~nsupE~⫆̸~nsupe~⊉~nsupset~⊃⃒~nsupseteq~⊉~nsupseteqq~⫆̸~ntgl~≹~ntlg~≸~ntriangleleft~⋪~ntrianglelefteq~⋬~ntriangleright~⋫~ntrianglerighteq~⋭~num~#~numero~№~numsp~ ~nvDash~⊭~nvHarr~⤄~nvap~≍⃒~nvdash~⊬~nvge~≥⃒~nvgt~>⃒~nvinfin~⧞~nvlArr~⤂~nvle~≤⃒~nvlt~<⃒~nvltrie~⊴⃒~nvrArr~⤃~nvrtrie~⊵⃒~nvsim~∼⃒~nwArr~⇖~nwarhk~⤣~nwarr~↖~nwarrow~↖~nwnear~⤧~oS~Ⓢ~oast~⊛~ocir~⊚~ocy~о~odash~⊝~odblac~ő~odiv~⨸~odot~⊙~odsold~⦼~ofcir~⦿~ofr~𝔬~ogon~˛~ogt~⧁~ohbar~⦵~ohm~Ω~oint~∮~olarr~↺~olcir~⦾~olcross~⦻~olt~⧀~omacr~ō~omid~⦶~ominus~⊖~oopf~𝕠~opar~⦷~operp~⦹~orarr~↻~ord~⩝~order~ℴ~orderof~ℴ~origof~⊶~oror~⩖~orslope~⩗~orv~⩛~oscr~ℴ~osol~⊘~otimesas~⨶~ovbar~⌽~par~∥~parallel~∥~parsim~⫳~parsl~⫽~pcy~п~percnt~%~period~.~pertenk~‱~pfr~𝔭~phiv~ϕ~phmmat~ℳ~phone~☎~pitchfork~⋔~planck~ℏ~planckh~ℎ~plankv~ℏ~plus~+~plusacir~⨣~plusb~⊞~pluscir~⨢~plusdo~∔~plusdu~⨥~pluse~⩲~plussim~⨦~plustwo~⨧~pm~±~pointint~⨕~popf~𝕡~pr~≺~prE~⪳~prap~⪷~prcue~≼~pre~⪯~prec~≺~precapprox~⪷~preccurlyeq~≼~preceq~⪯~precnapprox~⪹~precneqq~⪵~precnsim~⋨~precsim~≾~primes~ℙ~prnE~⪵~prnap~⪹~prnsim~⋨~profalar~⌮~profline~⌒~profsurf~⌓~propto~∝~prsim~≾~prurel~⊰~pscr~𝓅~puncsp~ ~qfr~𝔮~qint~⨌~qopf~𝕢~qprime~⁗~qscr~𝓆~quaternions~ℍ~quatint~⨖~quest~?~questeq~≟~rAarr~⇛~rAtail~⤜~rBarr~⤏~rHar~⥤~race~∽̱~racute~ŕ~raemptyv~⦳~rangd~⦒~range~⦥~rangle~⟩~rarrap~⥵~rarrb~⇥~rarrbfs~⤠~rarrc~⤳~rarrfs~⤞~rarrhk~↪~rarrlp~↬~rarrpl~⥅~rarrsim~⥴~rarrtl~↣~rarrw~↝~ratail~⤚~ratio~∶~rationals~ℚ~rbarr~⤍~rbbrk~❳~rbrace~}~rbrack~]~rbrke~⦌~rbrksld~⦎~rbrkslu~⦐~rcaron~ř~rcedil~ŗ~rcub~}~rcy~р~rdca~⤷~rdldhar~⥩~rdquor~”~rdsh~↳~realine~ℛ~realpart~ℜ~reals~ℝ~rect~▭~rfisht~⥽~rfr~𝔯~rhard~⇁~rharu~⇀~rharul~⥬~rhov~ϱ~rightarrow~→~rightarrowtail~↣~rightharpoondown~⇁~rightharpoonup~⇀~rightleftarrows~⇄~rightleftharpoons~⇌~rightrightarrows~⇉~rightsquigarrow~↝~rightthreetimes~⋌~ring~˚~risingdotseq~≓~rlarr~⇄~rlhar~⇌~rmoust~⎱~rmoustache~⎱~rnmid~⫮~roang~⟭~roarr~⇾~robrk~⟧~ropar~⦆~ropf~𝕣~roplus~⨮~rotimes~⨵~rpar~)~rpargt~⦔~rppolint~⨒~rrarr~⇉~rscr~𝓇~rsh~↱~rsqb~]~rsquor~’~rthree~⋌~rtimes~⋊~rtri~▹~rtrie~⊵~rtrif~▸~rtriltri~⧎~ruluhar~⥨~rx~℞~sacute~ś~sc~≻~scE~⪴~scap~⪸~sccue~≽~sce~⪰~scedil~ş~scirc~ŝ~scnE~⪶~scnap~⪺~scnsim~⋩~scpolint~⨓~scsim~≿~scy~с~sdotb~⊡~sdote~⩦~seArr~⇘~searhk~⤥~searr~↘~searrow~↘~semi~;~seswar~⤩~setminus~∖~setmn~∖~sext~✶~sfr~𝔰~sfrown~⌢~sharp~♯~shchcy~щ~shcy~ш~shortmid~∣~shortparallel~∥~sigmav~ς~simdot~⩪~sime~≃~simeq~≃~simg~⪞~simgE~⪠~siml~⪝~simlE~⪟~simne~≆~simplus~⨤~simrarr~⥲~slarr~←~smallsetminus~∖~smashp~⨳~smeparsl~⧤~smid~∣~smile~⌣~smt~⪪~smte~⪬~smtes~⪬︀~softcy~ь~sol~/~solb~⧄~solbar~⌿~sopf~𝕤~spadesuit~♠~spar~∥~sqcap~⊓~sqcaps~⊓︀~sqcup~⊔~sqcups~⊔︀~sqsub~⊏~sqsube~⊑~sqsubset~⊏~sqsubseteq~⊑~sqsup~⊐~sqsupe~⊒~sqsupset~⊐~sqsupseteq~⊒~squ~□~square~□~squarf~▪~squf~▪~srarr~→~sscr~𝓈~ssetmn~∖~ssmile~⌣~sstarf~⋆~star~☆~starf~★~straightepsilon~ϵ~straightphi~ϕ~strns~¯~subE~⫅~subdot~⪽~subedot~⫃~submult~⫁~subnE~⫋~subne~⊊~subplus~⪿~subrarr~⥹~subset~⊂~subseteq~⊆~subseteqq~⫅~subsetneq~⊊~subsetneqq~⫋~subsim~⫇~subsub~⫕~subsup~⫓~succ~≻~succapprox~⪸~succcurlyeq~≽~succeq~⪰~succnapprox~⪺~succneqq~⪶~succnsim~⋩~succsim~≿~sung~♪~supE~⫆~supdot~⪾~supdsub~⫘~supedot~⫄~suphsol~⟉~suphsub~⫗~suplarr~⥻~supmult~⫂~supnE~⫌~supne~⊋~supplus~⫀~supset~⊃~supseteq~⊇~supseteqq~⫆~supsetneq~⊋~supsetneqq~⫌~supsim~⫈~supsub~⫔~supsup~⫖~swArr~⇙~swarhk~⤦~swarr~↙~swarrow~↙~swnwar~⤪~target~⌖~tbrk~⎴~tcaron~ť~tcedil~ţ~tcy~т~tdot~⃛~telrec~⌕~tfr~𝔱~therefore~∴~thetav~ϑ~thickapprox~≈~thicksim~∼~thkap~≈~thksim~∼~timesb~⊠~timesbar~⨱~timesd~⨰~tint~∭~toea~⤨~top~⊤~topbot~⌶~topcir~⫱~topf~𝕥~topfork~⫚~tosa~⤩~tprime~‴~triangle~▵~triangledown~▿~triangleleft~◃~trianglelefteq~⊴~triangleq~≜~triangleright~▹~trianglerighteq~⊵~tridot~◬~trie~≜~triminus~⨺~triplus~⨹~trisb~⧍~tritime~⨻~trpezium~⏢~tscr~𝓉~tscy~ц~tshcy~ћ~tstrok~ŧ~twixt~≬~twoheadleftarrow~↞~twoheadrightarrow~↠~uHar~⥣~ubrcy~ў~ubreve~ŭ~ucy~у~udarr~⇅~udblac~ű~udhar~⥮~ufisht~⥾~ufr~𝔲~uharl~↿~uharr~↾~uhblk~▀~ulcorn~⌜~ulcorner~⌜~ulcrop~⌏~ultri~◸~umacr~ū~uogon~ų~uopf~𝕦~uparrow~↑~updownarrow~↕~upharpoonleft~↿~upharpoonright~↾~uplus~⊎~upsi~υ~upuparrows~⇈~urcorn~⌝~urcorner~⌝~urcrop~⌎~uring~ů~urtri~◹~uscr~𝓊~utdot~⋰~utilde~ũ~utri~▵~utrif~▴~uuarr~⇈~uwangle~⦧~vArr~⇕~vBar~⫨~vBarv~⫩~vDash~⊨~vangrt~⦜~varepsilon~ϵ~varkappa~ϰ~varnothing~∅~varphi~ϕ~varpi~ϖ~varpropto~∝~varr~↕~varrho~ϱ~varsigma~ς~varsubsetneq~⊊︀~varsubsetneqq~⫋︀~varsupsetneq~⊋︀~varsupsetneqq~⫌︀~vartheta~ϑ~vartriangleleft~⊲~vartriangleright~⊳~vcy~в~vdash~⊢~vee~∨~veebar~⊻~veeeq~≚~vellip~⋮~verbar~|~vert~|~vfr~𝔳~vltri~⊲~vnsub~⊂⃒~vnsup~⊃⃒~vopf~𝕧~vprop~∝~vrtri~⊳~vscr~𝓋~vsubnE~⫋︀~vsubne~⊊︀~vsupnE~⫌︀~vsupne~⊋︀~vzigzag~⦚~wcirc~ŵ~wedbar~⩟~wedge~∧~wedgeq~≙~wfr~𝔴~wopf~𝕨~wp~℘~wr~≀~wreath~≀~wscr~𝓌~xcap~⋂~xcirc~◯~xcup~⋃~xdtri~▽~xfr~𝔵~xhArr~⟺~xharr~⟷~xlArr~⟸~xlarr~⟵~xmap~⟼~xnis~⋻~xodot~⨀~xopf~𝕩~xoplus~⨁~xotime~⨂~xrArr~⟹~xrarr~⟶~xscr~𝓍~xsqcup~⨆~xuplus~⨄~xutri~△~xvee~⋁~xwedge~⋀~yacy~я~ycirc~ŷ~ycy~ы~yfr~𝔶~yicy~ї~yopf~𝕪~yscr~𝓎~yucy~ю~zacute~ź~zcaron~ž~zcy~з~zdot~ż~zeetrf~ℨ~zfr~𝔷~zhcy~ж~zigrarr~⇝~zopf~𝕫~zscr~𝓏~~AMP~&~COPY~©~GT~>~LT~<~QUOT~"~REG~®', $.html4);
var mr = {
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
}, sr = String.fromCodePoint || function(e) {
  return String.fromCharCode(Math.floor((e - 65536) / 1024) + 55296, (e - 65536) % 1024 + 56320);
}, W = function() {
  return W = Object.assign || function(e) {
    for (var a, l = 1, r = arguments.length; l < r; l++) {
      a = arguments[l];
      for (var m in a) Object.prototype.hasOwnProperty.call(a, m) && (e[m] = a[m]);
    }
    return e;
  }, W.apply(this, arguments);
}, dr = W(W({}, $), { all: $.html5 }), cr = {
  scope: "body",
  level: "all"
}, pe = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);/g, ye = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+)[;=]?/g, $e = {
  xml: {
    strict: pe,
    attribute: ye,
    body: fe.xml
  },
  html4: {
    strict: pe,
    attribute: ye,
    body: fe.html4
  },
  html5: {
    strict: pe,
    attribute: ye,
    body: fe.html5
  }
}, gr = W(W({}, $e), { all: $e.html5 }), Ra = String.fromCharCode, ur = Ra(65533);
function hr(e, a, l, r) {
  var m = e, i = e[e.length - 1];
  if (l && i === "=")
    m = e;
  else if (r && i !== ";")
    m = e;
  else {
    var s = a[e];
    if (s)
      m = s;
    else if (e[0] === "&" && e[1] === "#") {
      var n = e[2], c = n == "x" || n == "X" ? parseInt(e.substr(3), 16) : parseInt(e.substr(2));
      m = c >= 1114111 ? ur : c > 65535 ? sr(c) : Ra(mr[c] || c);
    }
  }
  return m;
}
function We(e, a) {
  var l = a === void 0 ? cr : a, r = l.level, m = r === void 0 ? "all" : r, i = l.scope, s = i === void 0 ? m === "xml" ? "strict" : "body" : i;
  if (!e)
    return "";
  var n = gr[m][s], c = dr[m].entities, t = s === "attribute", p = s === "strict";
  return e.replace(n, function(h) {
    return hr(h, c, t, p);
  });
}
/**
 * @name ranges-sort
 * @fileoverview Sort string index ranges
 * @version 6.0.24
 * @author Roy Revelt, Codsen Ltd
 * @license MIT
 * {@link https://codsen.com/os/ranges-sort/}
 */
var fr = { strictlyTwoElementsInRangeArrays: !1, progressFn: null };
function te(e, a) {
  if (!Array.isArray(e) || !e.length) return e;
  let l = { ...fr, ...a }, r, m;
  if (l.strictlyTwoElementsInRangeArrays && !e.every((n, c) => !Array.isArray(n) || n.length !== 2 ? (r = c, m = n.length, !1) : !0)) throw new TypeError(`ranges-sort: [THROW_ID_03] The first argument should be an array and must consist of arrays which are natural number indexes representing TWO string index ranges. However, ${r}th range (${JSON.stringify(e[r], null, 4)}) has not two but ${m} elements!`);
  if (!e.every((n, c) => !Array.isArray(n) || !Number.isInteger(n[0]) || n[0] < 0 || !Number.isInteger(n[1]) || n[1] < 0 ? (r = c, !1) : !0)) throw new TypeError(`ranges-sort: [THROW_ID_04] The first argument should be an array and must consist of arrays which are natural number indexes representing string index ranges. However, ${r}th range (${JSON.stringify(e[r], null, 4)}) does not consist of only natural numbers!`);
  let i = e.length ** 2, s = 0;
  return Array.from(e).sort((n, c) => (l.progressFn && (s += 1, l.progressFn(Math.floor(s * 100 / i))), n[0] === c[0] ? n[1] < c[1] ? -1 : n[1] > c[1] ? 1 : 0 : n[0] < c[0] ? -1 : 1));
}
/**
 * @name ranges-merge
 * @fileoverview Merge and sort string index ranges
 * @version 9.0.29
 * @author Roy Revelt, Codsen Ltd
 * @license MIT
 * {@link https://codsen.com/os/ranges-merge/}
 */
var Je = { mergeType: 1, progressFn: null, joinRangesThatTouchEdges: !0 };
function pr(e, a) {
  function l(t) {
    return !!t && typeof t == "object" && !Array.isArray(t);
  }
  if (!Array.isArray(e) || !e.length) return null;
  let r;
  if (a) if (l(a)) {
    if (r = { ...Je, ...a }, r.progressFn && l(r.progressFn) && !Object.keys(r.progressFn).length) r.progressFn = null;
    else if (r.progressFn && typeof r.progressFn != "function") throw new Error(`ranges-merge: [THROW_ID_01] opts.progressFn must be a function! It was given of a type: "${typeof r.progressFn}", equal to ${JSON.stringify(r.progressFn, null, 4)}`);
    if (![1, 2, "1", "2"].includes(r.mergeType)) throw new Error(`ranges-merge: [THROW_ID_02] opts.mergeType was customised to a wrong thing! It was given of a type: "${typeof r.mergeType}", equal to ${JSON.stringify(r.mergeType, null, 4)}`);
    if (typeof r.joinRangesThatTouchEdges != "boolean") throw new Error(`ranges-merge: [THROW_ID_04] opts.joinRangesThatTouchEdges was customised to a wrong thing! It was given of a type: "${typeof r.joinRangesThatTouchEdges}", equal to ${JSON.stringify(r.joinRangesThatTouchEdges, null, 4)}`);
  } else throw new Error(`emlint: [THROW_ID_03] the second input argument must be a plain object. It was given as:
${JSON.stringify(a, null, 4)} (type ${typeof a})`);
  else r = { ...Je };
  let m = e.filter((t) => Array.isArray(t)).map((t) => [...t]).filter((t) => t[2] !== void 0 || t[0] !== t[1]), i, s, n;
  r.progressFn ? i = te(m, { progressFn: (t) => {
    n = Math.floor(t / 5), n !== s && (s = n, r.progressFn(n));
  } }) : i = te(m);
  let c = i.length - 1;
  for (let t = c; t > 0; t--) r.progressFn && (n = Math.floor((1 - t / c) * 78) + 21, n !== s && n > s && (s = n, r.progressFn(n))), (i[t][0] <= i[t - 1][0] || !r.joinRangesThatTouchEdges && i[t][0] < i[t - 1][1] || r.joinRangesThatTouchEdges && i[t][0] <= i[t - 1][1]) && (i[t - 1][0] = Math.min(i[t][0], i[t - 1][0]), i[t - 1][1] = Math.max(i[t][1], i[t - 1][1]), i[t][2] !== void 0 && (i[t - 1][0] >= i[t][0] || i[t - 1][1] <= i[t][1]) && i[t - 1][2] !== null && (i[t][2] === null && i[t - 1][2] !== null ? i[t - 1][2] = null : i[t - 1][2] != null ? +r.mergeType == 2 && i[t - 1][0] === i[t][0] ? i[t - 1][2] = i[t][2] : i[t - 1][2] += i[t][2] : i[t - 1][2] = i[t][2]), i.splice(t, 1), t = i.length);
  return i.length ? i : null;
}
var yr = {}, Nr = yr.NODE_ENV === "production", Ye = "Invariant failed";
function Sr(e, a) {
  if (!e) {
    if (Nr)
      throw new Error(Ye);
    var l = Ye;
    throw new Error(l);
  }
}
/**
 * @name ranges-apply
 * @fileoverview Take an array of string index ranges, delete/replace the string according to them
 * @version 7.0.30
 * @author Roy Revelt, Codsen Ltd
 * @license MIT
 * {@link https://codsen.com/os/ranges-apply/}
 */
function br(e, a, l) {
  if (arguments.length === 0) throw new Error("ranges-apply: [THROW_ID_01] inputs missing!");
  if (typeof e != "string") throw new TypeError(`ranges-apply: [THROW_ID_02] first input argument must be a string! Currently it's: ${typeof e}, equal to: ${JSON.stringify(e, null, 4)}`);
  if (a && !Array.isArray(a)) throw new TypeError(`ranges-apply: [THROW_ID_03] second input argument must be an array (or null)! Currently it's: ${typeof a}, equal to: ${JSON.stringify(a, null, 4)}`);
  if (!a?.filter((s) => s).length) return e;
  let r;
  Array.isArray(a) && Number.isInteger(a[0]) && Number.isInteger(a[1]) ? r = [Array.from(a)] : r = Array.from(a), r.length, r.filter((s) => s).forEach((s, n) => {
    if (!Array.isArray(s)) throw new TypeError(`ranges-apply: [THROW_ID_05] ranges array, second input arg., has ${n}th element not an array: ${JSON.stringify(s, null, 4)}, which is ${typeof s}`);
    if (!Number.isInteger(s[0])) {
      if (!Number.isInteger(+s[0]) || +s[0] < 0) throw new TypeError(`ranges-apply: [THROW_ID_06] ranges array, second input arg. has ${n}th element, array ${JSON.stringify(s, null, 0)}. Its first element is not an integer, string index, but ${typeof s[0]}, equal to: ${JSON.stringify(s[0], null, 4)}.`);
      r[n][0] = +r[n][0];
    }
    if (!Number.isInteger(s[1])) {
      if (!Number.isInteger(+s[1]) || +s[1] < 0) throw new TypeError(`ranges-apply: [THROW_ID_07] ranges array, second input arg. has ${n}th element, array ${JSON.stringify(s, null, 0)}. Its second element is not an integer, string index, but ${typeof s[1]}, equal to: ${JSON.stringify(s[1], null, 4)}.`);
      r[n][1] = +r[n][1];
    }
  });
  let m = pr(r, { progressFn: (s) => {
  } });
  Sr(m);
  let i = m.length;
  if (i > 0) {
    let s = e.slice(m[i - 1][1]);
    e = m.reduce((n, c, t, p) => {
      let h = t === 0 ? 0 : p[t - 1][1], u = p[t][0];
      return `${n}${e.slice(h, u)}${p[t][2] || ""}`;
    }, ""), e += s;
  }
  return e;
}
/**
 * @name string-collapse-leading-whitespace
 * @fileoverview Collapse the leading and trailing whitespace of a string
 * @version 7.0.19
 * @author Roy Revelt, Codsen Ltd
 * @license MIT
 * {@link https://codsen.com/os/string-collapse-leading-whitespace/}
 */
function Ne(e, a = 1) {
  let l = " ";
  function r(i) {
    return Array.from(i).reverse().join("");
  }
  function m(i, s, n) {
    let c = n ? `
` : "\r", t = n ? "\r" : `
`;
    if (!i) return i;
    let p = 0, h = "";
    for (let u = 0, d = i.length; u < d; u++) (i[u] === c || i[u] === t && i[u - 1] !== c) && p++, `\r
`.includes(i[u]) || i[u] === l ? i[u] === l ? h += i[u] : i[u] === c ? p <= s && (h += i[u], i[u + 1] === t && (h += i[u + 1], u++)) : i[u] === t && i?.[u - 1] !== c && p <= s && (h += i[u]) : !i[u + 1] && !p && (h += " ");
    return h;
  }
  if (typeof e == "string" && e.length) {
    let i = 1;
    typeof +a == "number" && Number.isInteger(+a) && +a >= 0 && (i = +a);
    let s = "", n = "";
    if (!e.trim()) s = e;
    else if (!e[0].trim()) {
      for (let c = 0, t = e.length; c < t; c++) if (e[c].trim()) {
        s = e.slice(0, c);
        break;
      }
    }
    if (e.trim() && (e.slice(-1).trim() === "" || e.slice(-1) === l)) {
      for (let c = e.length; c--; ) if (e[c].trim()) {
        n = e.slice(c + 1);
        break;
      }
    }
    return `${m(s, i, !1)}${e.trim()}${r(m(r(n), i, !0))}`;
  }
  return e;
}
/**
 * @name ranges-push
 * @fileoverview Gather string index ranges
 * @version 7.0.29
 * @author Roy Revelt, Codsen Ltd
 * @license MIT
 * {@link https://codsen.com/os/ranges-push/}
 */
var Ze = { mergeType: 1, progressFn: null, joinRangesThatTouchEdges: !0 };
function Rr(e, a) {
  function l(t) {
    return !!t && typeof t == "object" && !Array.isArray(t);
  }
  if (!Array.isArray(e) || !e.length) return null;
  let r;
  if (a) if (l(a)) {
    if (r = { ...Ze, ...a }, r.progressFn && l(r.progressFn) && !Object.keys(r.progressFn).length) r.progressFn = null;
    else if (r.progressFn && typeof r.progressFn != "function") throw new Error(`ranges-merge: [THROW_ID_01] resolvedOpts.progressFn must be a function! It was given of a type: "${typeof r.progressFn}", equal to ${JSON.stringify(r.progressFn, null, 4)}`);
    if (![1, 2, "1", "2"].includes(r.mergeType)) throw new Error(`ranges-merge: [THROW_ID_02] resolvedOpts.mergeType was customised to a wrong thing! It was given of a type: "${typeof r.mergeType}", equal to ${JSON.stringify(r.mergeType, null, 4)}`);
    if (typeof r.joinRangesThatTouchEdges != "boolean") throw new Error(`ranges-merge: [THROW_ID_04] resolvedOpts.joinRangesThatTouchEdges was customised to a wrong thing! It was given of a type: "${typeof r.joinRangesThatTouchEdges}", equal to ${JSON.stringify(r.joinRangesThatTouchEdges, null, 4)}`);
  } else throw new Error(`ranges-merge: [THROW_ID_03] the second input argument must be a plain object. It was given as:
${JSON.stringify(a, null, 4)} (type ${typeof a})`);
  else r = { ...Ze };
  let m = e.filter((t) => Array.isArray(t)).map((t) => [...t]).filter((t) => t[2] !== void 0 || t[0] !== t[1]), i, s, n;
  r.progressFn ? i = te(m, { progressFn: (t) => {
    n = Math.floor(t / 5), n !== s && (s = n, r.progressFn != null && r.progressFn(n));
  } }) : i = te(m);
  let c = i.length - 1;
  for (let t = c; t > 0; t--) r.progressFn && (n = Math.floor((1 - t / c) * 78) + 21, n !== s && n > s && (s = n, r.progressFn(n))), (i[t][0] <= i[t - 1][0] || !r.joinRangesThatTouchEdges && i[t][0] < i[t - 1][1] || r.joinRangesThatTouchEdges && i[t][0] <= i[t - 1][1]) && (i[t - 1][0] = Math.min(i[t][0], i[t - 1][0]), i[t - 1][1] = Math.max(i[t][1], i[t - 1][1]), i[t][2] !== void 0 && (i[t - 1][0] >= i[t][0] || i[t - 1][1] <= i[t][1]) && i[t - 1][2] !== null && (i[t][2] === null && i[t - 1][2] !== null ? i[t - 1][2] = null : i[t - 1][2] != null ? +(r || {})?.mergeType == 2 && i[t - 1][0] === i[t][0] ? i[t - 1][2] = i[t][2] : i[t - 1][2] += i[t][2] : i[t - 1][2] = i[t][2]), i.splice(t, 1), t = i.length);
  return i.length ? i : null;
}
var Ar = { limitToBeAddedWhitespace: !1, limitLinebreaksCount: 1, mergeType: 1 }, qr = class {
  constructor(e) {
    let a = { ...Ar, ...e };
    if (a.mergeType && a.mergeType !== 1 && a.mergeType !== 2) if (j(a.mergeType) && a.mergeType.trim() === "1") a.mergeType = 1;
    else if (j(a.mergeType) && a.mergeType.trim() === "2") a.mergeType = 2;
    else throw new Error(`ranges-push: [THROW_ID_02] opts.mergeType was customised to a wrong thing! It was given of a type: "${typeof a.mergeType}", equal to ${JSON.stringify(a.mergeType, null, 4)}`);
    this.opts = a, this.ranges = [];
  }
  ranges;
  opts;
  add(e, a, l) {
    if (e == null && a == null) return;
    if (L(e) && !L(a)) {
      if (Array.isArray(e)) {
        if (e.length) {
          if (e.some((i) => Array.isArray(i))) {
            e.forEach((i) => {
              Array.isArray(i) && this.add(...i);
            });
            return;
          }
          e.length && U(+e[0]) && U(+e[1]) && this.add(...e);
        }
        return;
      }
      throw new TypeError(`ranges-push/Ranges/add(): [THROW_ID_12] the first input argument, "from" is set (${JSON.stringify(e, null, 0)}) but second-one, "to" is not (${JSON.stringify(a, null, 0)})`);
    } else if (!L(e) && L(a)) throw new TypeError(`ranges-push/Ranges/add(): [THROW_ID_13] the second input argument, "to" is set (${JSON.stringify(a, null, 0)}) but first-one, "from" is not (${JSON.stringify(e, null, 0)})`);
    let r = +e, m = +a;
    if (U(l) && (l = String(l)), U(r) && U(m)) {
      if (L(l) && !j(l) && !U(l)) throw new TypeError(`ranges-push/Ranges/add(): [THROW_ID_08] The third argument, the value to add, was given not as string but ${typeof l}, equal to:
${JSON.stringify(l, null, 4)}`);
      if (L(this.ranges) && Array.isArray(this.last()) && r === this.last()[1]) {
        if (this.last()[1] = m, this.last()[2], this.last()[2] !== null && L(l)) {
          let i = this.last()[2] && this.last()[2].length && (!this.opts?.mergeType || this.opts.mergeType === 1) ? `${this.last()[2]}${l}` : l;
          this.opts.limitToBeAddedWhitespace && (i = Ne(i, this.opts.limitLinebreaksCount)), j(i) && !i.length || (this.last()[2] = i);
        }
      } else {
        this.ranges || (this.ranges = []);
        let i = l !== void 0 && !(j(l) && !l.length) ? [r, m, l && this.opts.limitToBeAddedWhitespace ? Ne(l, this.opts.limitLinebreaksCount) : l] : [r, m];
        this.ranges.push(i);
      }
    } else throw U(r) && r >= 0 ? new TypeError(`ranges-push/Ranges/add(): [THROW_ID_10] "to" value, the second input argument, must be a natural number or zero! Currently it's of a type "${typeof m}" equal to: ${JSON.stringify(m, null, 4)}`) : new TypeError(`ranges-push/Ranges/add(): [THROW_ID_09] "from" value, the first input argument, must be a natural number or zero! Currently it's of a type "${typeof r}" equal to: ${JSON.stringify(r, null, 4)}`);
  }
  push(e, a, l) {
    this.add(e, a, l);
  }
  current() {
    return Array.isArray(this.ranges) && this.ranges.length ? (this.ranges = Rr(this.ranges, { mergeType: this.opts.mergeType }), this.ranges && this.opts.limitToBeAddedWhitespace ? this.ranges.map((e) => L(e[2]) ? [e[0], e[1], Ne(e[2], this.opts.limitLinebreaksCount)] : e) : this.ranges) : null;
  }
  wipe() {
    this.ranges = [];
  }
  replace(e) {
    if (Array.isArray(e) && e.length) if (Array.isArray(e[0]) && U(e[0][0])) this.ranges = Array.from(e);
    else throw new Error(`ranges-push/Ranges/replace(): [THROW_ID_11] Single range was given but we expected array of arrays! The first element, ${JSON.stringify(e[0], null, 4)} should be an array and its first element should be an integer, a string index.`);
    else this.ranges = [];
  }
  last() {
    return Array.isArray(this.ranges) && this.ranges.length ? this.ranges[this.ranges.length - 1] : null;
  }
};
/**
 * @name string-left-right
 * @fileoverview Looks up the first non-whitespace character to the left/right of a given index
 * @version 6.0.31
 * @author Roy Revelt, Codsen Ltd
 * @license MIT
 * {@link https://codsen.com/os/string-left-right/}
 */
ma();
var Se = " ";
function vr({ str: e, idx: a = 0, stopAtNewlines: l = !1, stopAtRawNbsp: r = !1 }) {
  if (typeof e != "string" || !e.length || ((!a || typeof a != "number") && (a = 0), !e[a + 1])) return null;
  if (e[a + 1] && (e[a + 1].trim() || l && `
\r`.includes(e[a + 1]) || r && e[a + 1] === Se)) return a + 1;
  if (e[a + 2] && (e[a + 2].trim() || l && `
\r`.includes(e[a + 2]) || r && e[a + 2] === Se)) return a + 2;
  for (let m = a + 1, i = e.length; m < i; m++) if (e[m].trim() || l && `
\r`.includes(e[m]) || r && e[m] === Se) return m;
  return null;
}
function G(e, a = 0) {
  return vr({ str: e, idx: a, stopAtNewlines: !1, stopAtRawNbsp: !1 });
}
/**
 * @name string-strip-html
 * @fileoverview Strip HTML tags from strings. No parser, accepts mixed sources.
 * @version 13.4.23
 * @author Roy Revelt, Codsen Ltd
 * @license MIT
 * {@link https://codsen.com/os/string-strip-html/}
 */
function wr(e) {
  return /[-_A-Za-z0-9]/.test(e);
}
function Qe(e, a) {
  if (!e) return [];
  if (Array.isArray(e)) return e.filter((l) => typeof l == "string" && l.trim());
  if (typeof e == "string") return e.trim() ? [e] : [];
  throw new TypeError(`string-strip-html/stripHtml(): [THROW_ID_05] ${a} must be array containing zero or more strings or something falsey. Currently it's equal to: ${e}, that a type of ${typeof e}.`);
}
function ie(e, a, l, r) {
  for (let m = a, i = e.length; m < i; m++) {
    if (e.startsWith(l, m)) return !0;
    if (e.startsWith(r, m)) return !1;
  }
  return !1;
}
function Xe(e, a, l) {
  return e?.quotes, e?.quotes?.value && ie(a, l + 1, e.quotes.value, ">"), e?.quotes?.next, ie(a, e?.quotes?.next - 1, e?.quotes?.value, ">"), !e?.quotes || !ie(a, l + 1, e.quotes.value, ">") && e?.quotes?.next !== -1 && ie(a, e?.quotes?.next - 1, e?.quotes?.value, ">");
}
function zr(e, a) {
  return (a.match(new RegExp(e, "g")) || []).length;
}
var ee = /* @__PURE__ */ new Set(["!doctype", "abbr", "address", "area", "article", "aside", "audio", "base", "bdi", "bdo", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "doctype", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "math", "menu", "menuitem", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "param", "picture", "pre", "progress", "rb", "rp", "rt", "rtc", "ruby", "samp", "script", "section", "select", "slot", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "svg", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "ul", "var", "video", "wbr", "xml"]), be = /* @__PURE__ */ new Set(["a", "b", "i", "p", "q", "s", "u"]), Re = /* @__PURE__ */ new Set([".", ",", ";", "!", "?"]), ea = /* @__PURE__ */ new Set([".", ",", "?", ";", ")", "…", '"', "»"]), kr = /* @__PURE__ */ new Set(["a", "abbr", "acronym", "audio", "b", "bdi", "bdo", "big", "button", "canvas", "cite", "code", "data", "datalist", "del", "dfn", "em", "embed", "i", "iframe", "input", "ins", "kbd", "label", "map", "mark", "meter", "noscript", "object", "output", "picture", "progress", "q", "ruby", "s", "samp", "select", "slot", "small", "span", "strong", "sub", "sup", "svg", "template", "textarea", "time", "u", "tt", "var", "video", "wbr"]), aa = { ignoreTags: [], ignoreTagsWithTheirContents: [], onlyStripTags: [], stripTogetherWithTheirContents: ["script", "style", "xml"], skipHtmlDecoding: !1, trimOnlySpaces: !1, stripRecognisedHTMLOnly: !1, dumpLinkHrefsNearby: { enabled: !1, putOnNewLine: !1, wrapHeads: "", wrapTails: "" }, ignoreIndentations: !1, cb: null, reportProgressFunc: null, reportProgressFuncFrom: 0, reportProgressFuncTo: 100 };
function Aa(e, a) {
  let l = Date.now(), r = [], m = [], i = [], s = [], n = {};
  function c() {
    n = { attributes: [] };
  }
  c();
  let t = null, p = null, h = null, u = !1, d = {}, S = { tagName: "", hrefValue: "", openingTagEnds: void 0 }, q = "", k = !1, w = null, x = !0;
  function le(o, f, N) {
    if (Array.isArray(f.stripTogetherWithTheirContents) && (f.stripTogetherWithTheirContents.includes(n.name) || f.stripTogetherWithTheirContents.includes("*"))) if (n.slashPresent && Array.isArray(r) && r.some((y) => y.name === n.name)) {
      for (let y = r.length; y--; ) if (r[y].name === n.name) {
        s = s.filter(([R, v]) => (R < r[y].lastOpeningBracketAt || R >= o + 1) && (v <= r[y].lastOpeningBracketAt || v > o + 1));
        let A = o + 1;
        n.lastClosingBracketAt && (A = n.lastClosingBracketAt + 1), s.push([r[y].lastOpeningBracketAt, A]), ea.has(e[o]) && f.cb ? f.cb({ tag: n, deleteFrom: r[y].lastOpeningBracketAt, deleteTo: o + 1, insert: null, rangesArr: N, proposedReturn: [r[y].lastOpeningBracketAt, o, null] }) : f.cb && f.cb({ tag: n, deleteFrom: r[y].lastOpeningBracketAt, deleteTo: o, insert: "", rangesArr: N, proposedReturn: [r[y].lastOpeningBracketAt, o, ""] }), r.splice(y, 1);
        break;
      }
    } else n.slashPresent || r.push(n);
    else Array.isArray(f.ignoreTagsWithTheirContents) && ce(o, f, n) && (x = !1);
  }
  function F(o, f, N, y, A, R) {
    if (Array.isArray(b.current()) && typeof N == "number" && b.current()[0][0] === 0 && b.current()[0][1] >= N) return "";
    if (e.length === y && R && !g?.dumpLinkHrefsNearby?.enabled) return null;
    let v = "";
    if (Number.isInteger(N) && N < A && (v += o.slice(N, A)), Number.isInteger(y) && y > R + 1) {
      let M = o.slice(R + 1, y);
      y && !G(e, y - 1) && (M = M.trimEnd()), M.includes(`
`) && E(y, o) ? v += " " : v += M;
    }
    let V = !ea.has(o[f]), He = o[y - 1] !== ">" || !o[N].trim(), Ie = !['"', "("].includes(o[A - 1]), va = ![";", ".", ":", "!"].includes(o[f]);
    if ((V || He && Ie && va) && (He || Ie) && o[f] !== "!" && (!kr.has(n.name) || typeof N == "number" && N < A || typeof y == "number" && y > R + 1)) {
      let M = v.match(/\n/g);
      return Array.isArray(M) && M.length ? M.length === 1 ? `
` : M.length === 2 ? `

` : `


` : " ";
    }
    return "";
  }
  function de(o, f) {
    if (o.dumpLinkHrefsNearby?.enabled && S.tagName && S.tagName === n.name && n.lastOpeningBracketAt && (S.openingTagEnds && n.lastOpeningBracketAt > S.openingTagEnds || !S.openingTagEnds) && (k = !0), k) {
      let N = o.dumpLinkHrefsNearby?.putOnNewLine ? `

` : "";
      q = `${N}${S.hrefValue}`, (typeof f != "number" || G(e, f - 1)) && (q += N);
    }
  }
  function E(o, f) {
    return f ? f[o] === "<" && f[o + 1] !== "%" : e[o] === "<" && e[o + 1] !== "%";
  }
  function C(o) {
    return e[o] === ">" && e[o - 1] !== "%";
  }
  function ce(o, f, N) {
    if (f.ignoreTagsWithTheirContents.includes("*")) return !0;
    let y = e.indexOf(`<${N.name}`, o), A = e.indexOf(`</${N.name}`, o);
    return !N.slashPresent && A === -1 || N.slashPresent && !m.some((R) => R.name === N.name) || A > -1 && y > -1 && y < A ? !1 : f.ignoreTagsWithTheirContents.includes(N.name);
  }
  if (typeof e != "string") throw new TypeError(`string-strip-html/stripHtml(): [THROW_ID_01] Input must be string! Currently it's: ${(typeof e).toLowerCase()}, equal to:
${JSON.stringify(e, null, 4)}`);
  if (a) if (we(a)) {
    if (a.reportProgressFunc && typeof a.reportProgressFunc != "function") throw new Error(`string-strip-html/stripHtml(): [THROW_ID_03] The Optional Options Object's key reportProgressFunc, callback function, should be a function but it was given as type ${typeof a.reportProgressFunc}, equal to ${JSON.stringify(a.reportProgressFunc, null, 4)}`);
    if (typeof a.dumpLinkHrefsNearby == "boolean" && a.dumpLinkHrefsNearby != null) throw new Error(`string-strip-html/stripHtml(): [THROW_ID_04] The Optional Options Object's key should be a plain object but it was given as type ${typeof a.dumpLinkHrefsNearby}, equal to ${JSON.stringify(a.dumpLinkHrefsNearby, null, 4)}`);
  } else throw new TypeError(`string-strip-html/stripHtml(): [THROW_ID_02] Optional Options Object must be a plain object! Currently it's: ${(typeof a).toLowerCase()}, equal to:
${JSON.stringify(a, null, 4)}`);
  function ge() {
    k && (S = { tagName: "", hrefValue: "", openingTagEnds: void 0 }, k = !1);
  }
  let g = { ...aa, ...a, dumpLinkHrefsNearby: Object.assign({}, aa.dumpLinkHrefsNearby, a?.dumpLinkHrefsNearby) };
  if (Qa(g, "returnRangesOnly")) throw new TypeError("string-strip-html/stripHtml(): [THROW_ID_05] The Optional Options Object's key returnRangesOnly has been removed from the API since v.5 release.");
  if (g.reportProgressFunc) {
    if (typeof g.reportProgressFuncFrom != "number") throw new Error(`string-strip-html/stripHtml(): [THROW_ID_06] The Optional Options Object's key reportProgressFuncFrom, callback function's "from" range, should be a number but it was given as type ${typeof g.reportProgressFuncFrom}, equal to ${JSON.stringify(g.reportProgressFuncFrom, null, 4)}`);
    if (typeof g.reportProgressFuncTo != "number") throw new Error(`string-strip-html/stripHtml(): [THROW_ID_07] The Optional Options Object's key reportProgressFuncTo, callback function's "to" range, should be a number but it was given as type ${typeof g.reportProgressFuncTo}, equal to ${JSON.stringify(g.reportProgressFuncTo, null, 4)}`);
  }
  g.ignoreTags = Qe(g.ignoreTags, "resolvedOpts.ignoreTags"), g.onlyStripTags = Qe(g.onlyStripTags, "resolvedOpts.onlyStripTags");
  let Te = !!g.onlyStripTags.length;
  g.onlyStripTags.length && g.ignoreTags.length && (g.onlyStripTags = ir(g.onlyStripTags, ...g.ignoreTags)), g.stripTogetherWithTheirContents ? typeof g.stripTogetherWithTheirContents == "string" && g.stripTogetherWithTheirContents.length && (g.stripTogetherWithTheirContents = [g.stripTogetherWithTheirContents]) : g.stripTogetherWithTheirContents = [];
  let Z = {};
  if (g.stripTogetherWithTheirContents && Array.isArray(g.stripTogetherWithTheirContents) && g.stripTogetherWithTheirContents.length && !g.stripTogetherWithTheirContents.every((o, f) => typeof o != "string" ? (Z.el = o, Z.i = f, !1) : !0)) throw new TypeError(`string-strip-html/stripHtml(): [THROW_ID_08] Optional Options Object's key stripTogetherWithTheirContents was set to contain not just string elements! For example, element at index ${Z.i} has a value ${Z.el} which is not string but ${(typeof Z.el).toLowerCase()}.`);
  g.cb || (g.cb = ({ rangesArr: o, proposedReturn: f }) => {
    f && o.push(...f);
  });
  let b = new qr({ limitToBeAddedWhitespace: !0, limitLinebreaksCount: 2 });
  if (!g.skipHtmlDecoding) for (; e !== We(e, { scope: "strict" }); ) e = We(e, { scope: "strict" });
  let B = !1, H = !1, re = 0, Ce = 0, O = e.length, qa = Math.floor(O / 2);
  for (let o = 0; o < O; o++) {
    if (g.reportProgressFunc && (O > 1e3 && O < 2e3 ? o === qa && g.reportProgressFunc(Math.floor((g.reportProgressFuncTo - g.reportProgressFuncFrom) / 2)) : O >= 2e3 && (re = g.reportProgressFuncFrom + Math.floor(o / O * (g.reportProgressFuncTo - g.reportProgressFuncFrom)), re !== Ce && (Ce = re, g.reportProgressFunc(re)))), Object.keys(n).length > 1 && n.lastClosingBracketAt && n.lastClosingBracketAt < o && e[o] !== " " && w === null && (w = o), !B && e[o] === "%" && e[o - 1] === "{" && e.includes("%}", o + 1)) {
      h = null;
      let f = e.indexOf("%}", o) - 1;
      if (f > o) {
        o = f;
        continue;
      }
    }
    if (!B && C(o) && (!n || Object.keys(n).length < 2) && o > 1) {
      for (let f = o; f--; ) if (e[f - 1] === void 0 || C(f)) {
        let N = e[f - 1] === void 0 ? f : f + 1, y = e.slice(N, o + 1) || "";
        if ((y.includes("/>") || y.includes("/ >") || y.includes('="') || y.includes("='")) && e !== `<${Ke(y.trim(), "/>")}>` && [...ee].some((A) => Ke(y.trim().split(/\s+/).filter((R) => R.trim()).filter((R, v) => v === 0), "/>").toLowerCase() === A) && Aa(`<${y.trim()}>`, g).result === "") {
          (!i.length || i[i.length - 1][0] !== n.lastOpeningBracketAt) && i.push([N, o + 1]), (!s.length || s[s.length - 1][0] !== n.lastOpeningBracketAt) && s.push([N, o + 1]);
          let A = F(e, o, N, o + 1, N, o + 1), R = o + 1;
          if (e[R] && !e[R].trim()) {
            for (let v = R; v < O; v++) if (e[v].trim()) {
              R = v;
              break;
            }
          }
          g.cb({ tag: n, deleteFrom: N, deleteTo: R, insert: A, rangesArr: b, proposedReturn: [N, R, A] });
        }
        break;
      }
    }
    if (!H && e[o] === "/" && !n.quotes?.value && Number.isInteger(n.lastOpeningBracketAt) && !Number.isInteger(n.lastClosingBracketAt) && (n.slashPresent = o), e[o] === '"' || e[o] === "'") if (!H && n.nameStarts && n?.quotes?.value === e[o]) if (d.valueStarts === void 0) d = {}, delete n.quotes;
    else {
      d.valueEnds = o, d.value = e.slice(d.valueStarts, o), n.attributes.push(d), d = {}, delete n.quotes;
      let f;
      g.dumpLinkHrefsNearby?.enabled && !r.length && n.attributes.some((N) => {
        if (typeof N.name == "string" && N.name.toLowerCase() === "href") return f = `${g.dumpLinkHrefsNearby?.wrapHeads || ""}${N.value}${g.dumpLinkHrefsNearby?.wrapTails || ""}`, !0;
      }) && (S = { tagName: n.name, hrefValue: f, openingTagEnds: void 0 });
    }
    else !H && !n.quotes && n.nameStarts && (n.quotes = {}, n.quotes.value = e[o], n.quotes.start = o, n.quotes.next = e.indexOf(e[o], o + 1), d.nameStarts && d.nameEnds && d.nameEnds < o && d.nameStarts < o && !d.valueStarts && (d.name = e.slice(d.nameStarts, d.nameEnds)));
    if (n.nameStarts !== void 0 && n.nameEnds === void 0 && (!e[o].trim() || !wr(e[o]))) {
      if (n.nameEnds = o, n.name = e.slice(n.nameStarts, n.nameEnds + (!C(o) && e[o] !== "/" && e[o + 1] === void 0 ? 1 : 0)), e[n.nameStarts - 1] !== "!" && !n.name.replace(/-/g, "").length || /^\d+$/.test(n.name[0])) {
        n = {};
        continue;
      }
      if (typeof n.name == "string" && n.name.toLowerCase() === "doctype" && (H = !0), E(o)) {
        de(g);
        let f = F(e, o, n.leftOuterWhitespace, o, n.lastOpeningBracketAt, o);
        (g.stripTogetherWithTheirContents.includes(n.name) || g.stripTogetherWithTheirContents.includes("*")) && (s = s.filter(([N, y]) => !(N === n.leftOuterWhitespace && y === o))), g.cb({ tag: n, deleteFrom: n.leftOuterWhitespace, deleteTo: o, insert: `${f}${q}${f}`, rangesArr: b, proposedReturn: [n.leftOuterWhitespace, o, `${f}${q}${f}`] }), ge(), le(o, g, b);
      }
    }
    if (n.quotes?.start && n.quotes.start < o && !n.quotes.end && d.nameEnds && d.equalsAt && !d.valueStarts && (d.valueStarts = o), !n.quotes && d.nameEnds && e[o] === "=" && !d.valueStarts && !d.equalsAt && (d.equalsAt = o), !n.quotes && d.nameStarts && d.nameEnds && !d.valueStarts && e[o].trim() && e[o] !== "=" && (n.attributes.push(d), d = {}), !n.quotes && d.nameStarts && !d.nameEnds && (H && `'"`.includes(e[d.nameStarts]) ? d.nameStarts < o && e[o] === e[d.nameStarts] && (d.nameEnds = o + 1, d.name = e.slice(d.nameStarts, d.nameEnds)) : e[o].trim() ? e[o] === "=" ? d.equalsAt || (d.nameEnds = o, d.equalsAt = o, d.name = e.slice(d.nameStarts, d.nameEnds)) : e[o] === "/" || C(o) ? (d.nameEnds = o, d.name = e.slice(d.nameStarts, d.nameEnds), n.attributes.push(d), d = {}) : E(o) && (d.nameEnds = o, d.name = e.slice(d.nameStarts, d.nameEnds), n.attributes.push(d), d = {}) : (d.nameEnds = o, d.name = e.slice(d.nameStarts, d.nameEnds))), !n.quotes && n.nameEnds < o && !e[o - 1].trim() && e[o].trim() && !"<>/!".includes(e[o]) && !d.nameStarts && !n.lastClosingBracketAt && (d.nameStarts = o), n.lastOpeningBracketAt !== null && n.lastOpeningBracketAt < o && e[o] === "/" && n.onlyPlausible && (n.onlyPlausible = !1), n.lastOpeningBracketAt !== null && n.lastOpeningBracketAt < o && e[o] !== "/" && (n.onlyPlausible === void 0 && ((!e[o].trim() || E(o)) && !n.slashPresent ? n.onlyPlausible = !0 : n.onlyPlausible = !1), e[o].trim() && n.nameStarts === void 0 && !E(o) && e[o] !== "/" && !C(o) && e[o] !== "!" && (n.nameStarts = o, n.nameContainsLetters = !1)), n.nameStarts && !n.quotes && typeof e[o] == "string" && e[o].toLowerCase() !== e[o].toUpperCase() && (n.nameContainsLetters = !0), C(o) && (Xe(n, e, o) || n.quotes.value && typeof n.lastOpeningBracketAt == "number" && zr(n.quotes.value, e.slice(n.lastOpeningBracketAt, o)) % 2 === 1 && !e.slice(n.lastOpeningBracketAt + 1, o).includes("<") && !e.slice(n.lastOpeningBracketAt + 1, o).includes(">")) && n.lastOpeningBracketAt !== void 0 && (n.lastClosingBracketAt = o, w = null, Object.keys(d).length && (n.attributes.push(d), d = {}), g.dumpLinkHrefsNearby?.enabled && S.tagName && !S.openingTagEnds && (S.openingTagEnds = o)), (!H || e[o] === ">") && n.lastOpeningBracketAt !== void 0) {
      if (n.lastClosingBracketAt === void 0) {
        if (n.lastOpeningBracketAt < o && !E(o) && (e[o + 1] === void 0 || E(o + 1) && !n?.quotes?.value) && n.nameContainsLetters && typeof n.nameStarts == "number") {
          if (n.name = e.slice(n.nameStarts, n.nameEnds || o + 1).toLowerCase(), (!i.length || i[i.length - 1][0] !== n.lastOpeningBracketAt) && i.push([n.lastOpeningBracketAt, o + 1]), g.ignoreTags.includes(n.name) || ce(o, g, n) || !ee.has(n.name) && (n.onlyPlausible || g.stripRecognisedHTMLOnly)) {
            n = {}, d = {};
            continue;
          }
          if ((ee.has(n.name) || be.has(n.name)) && (n.onlyPlausible === !1 || n.onlyPlausible === !0 && n.attributes.length) || e[o + 1] === void 0) {
            de(g);
            let f = F(e, o, n.leftOuterWhitespace, o + 1, n.lastOpeningBracketAt, n.lastClosingBracketAt);
            B && n.name === "script" && n.slashPresent && (B = !1);
            let N;
            f === null || q === null ? N = null : N = `${f}${q}${f}`, g.cb({ tag: n, deleteFrom: n.leftOuterWhitespace, deleteTo: o + 1, insert: N, rangesArr: b, proposedReturn: [n.leftOuterWhitespace, o + 1, N] }), ge(), le(o, g, b);
          }
          if (!s.length || s[s.length - 1][0] !== n.lastOpeningBracketAt && s[s.length - 1][1] !== o + 1) if (g.stripTogetherWithTheirContents.includes(n.name) || g.stripTogetherWithTheirContents.includes("*")) {
            let f;
            for (let N = r.length; N--; ) r[N].name === n.name && (f = r[N]);
            f ? (s = s.filter(([N]) => N !== f.lastOpeningBracketAt), s.push([f.lastOpeningBracketAt, o + 1])) : s.push([n.lastOpeningBracketAt, o + 1]);
          } else s.push([n.lastOpeningBracketAt, o + 1]);
        }
      } else if (o > n.lastClosingBracketAt && e[o].trim() || e[o + 1] === void 0 || g.ignoreIndentations && `\r
`.includes(e[o])) {
        let f = n.lastClosingBracketAt === o ? o + 1 : o;
        g.trimOnlySpaces && f === O - 1 && w !== null && w < o && (f = w), (!i.length || i[i.length - 1][0] !== n.lastOpeningBracketAt) && i.push([n.lastOpeningBracketAt, n.lastClosingBracketAt + 1]);
        let N = g.ignoreTags.includes(n.name), y = ce(o, g, n);
        if (!x || g.stripRecognisedHTMLOnly && typeof n.name == "string" && !ee.has(n.name.toLowerCase()) && !be.has(n.name.toLowerCase()) || !Te && (N || y) || Te && !g.onlyStripTags.includes(n.name) || g.ignoreTagsWithTheirContents.includes(n.name)) {
          if (y) if (n.slashPresent) {
            for (let A = m.length; A--; ) if (m[A].name === n.name) {
              m.splice(A, 1);
              break;
            }
            m.length || (x = !0);
          } else x && (x = !1), m.push(n);
          g.cb({ tag: n, deleteFrom: null, deleteTo: null, insert: null, rangesArr: b, proposedReturn: null }), n = {}, d = {};
        } else if (!n.onlyPlausible || n.attributes.length === 0 && n.name && (ee.has(n.name.toLowerCase()) || be.has(n.name.toLowerCase())) || n.attributes?.some((A) => A.equalsAt)) {
          (!s.length || s[s.length - 1][0] !== n.lastOpeningBracketAt) && s.push([n.lastOpeningBracketAt, n.lastClosingBracketAt + 1]);
          let A = F(e, o, n.leftOuterWhitespace, f, n.lastOpeningBracketAt, n.lastClosingBracketAt);
          q = "", k = !1, de(g, f);
          let R;
          typeof q == "string" && q.length ? (R = `${A}${q}${A === `

` ? `
` : A}`, f === n.lastClosingBracketAt + 1 && (!e[f] || !Re.has(e[f])) && (R += " "), n.leftOuterWhitespace === n.lastOpeningBracketAt && b.last() && b.last()[1] < n.lastOpeningBracketAt && (!g?.dumpLinkHrefsNearby?.putOnNewLine || !Re.has(e[f])) && (R = " " + R)) : R = A, R !== null && (n.leftOuterWhitespace === 0 || !G(e, f - 1)) && (!g.dumpLinkHrefsNearby?.enabled || n.name !== "a") && (R = void 0);
          let v = 0;
          if (k && Re.has(e[f])) {
            g.dumpLinkHrefsNearby?.putOnNewLine && (R = `${e[f]}${R || ""}`);
            let V = G(e, f);
            V && R?.endsWith(`
`) ? v += V - o : (!V || V > o) && v++;
          }
          g.cb({ tag: n, deleteFrom: n.leftOuterWhitespace, deleteTo: f + v, insert: R, rangesArr: b, proposedReturn: [n.leftOuterWhitespace, f + v, R] }), ge(), le(o, g, b);
        } else n = {};
        C(o) || (n = {});
      }
      H && (H = !1);
    }
    if ((!B || e[o] === "<" && G(e, G(e, o)) && e[G(e, o)] === "/" && e.startsWith("script", G(e, G(e, o)))) && E(o) && !E(o - 1) && !`'"`.includes(e[o + 1]) && (!`'"`.includes(e[o + 2]) || /\w/.test(e[o + 1])) && !(e[o + 1] === "c" && e[o + 2] === ":") && !(e[o + 1] === "f" && e[o + 2] === "m" && e[o + 3] === "t" && e[o + 4] === ":") && !(e[o + 1] === "s" && e[o + 2] === "q" && e[o + 3] === "l" && e[o + 4] === ":") && !(e[o + 1] === "x" && e[o + 2] === ":") && !(e[o + 1] === "f" && e[o + 2] === "n" && e[o + 3] === ":") && Xe(n, e, o)) {
      if (C(G(e, o))) continue;
      if (n.nameEnds && n.nameEnds < o && !n.lastClosingBracketAt && (n.onlyPlausible === !0 && n.attributes?.length || n.onlyPlausible === !1)) {
        let f = F(e, o, n.leftOuterWhitespace, o, n.lastOpeningBracketAt, o);
        g.cb({ tag: n, deleteFrom: n.leftOuterWhitespace, deleteTo: o, insert: f, rangesArr: b, proposedReturn: [n.leftOuterWhitespace, o, f] }), le(o, g, b), n = {}, d = {};
      }
      if (n.lastOpeningBracketAt !== void 0 && n.onlyPlausible && n.name && !n.quotes && (n.lastOpeningBracketAt = void 0, n.name = void 0, n.onlyPlausible = !1), (n.lastOpeningBracketAt === void 0 || !n.onlyPlausible) && !n.quotes && (n.lastOpeningBracketAt = o, n.slashPresent = !1, n.attributes = [], t === null ? n.leftOuterWhitespace = o : g.trimOnlySpaces && t === 0 ? n.leftOuterWhitespace = p || o : n.leftOuterWhitespace = t, `${e[o + 1]}${e[o + 2]}${e[o + 3]}` == "!--" || `${e[o + 1]}${e[o + 2]}${e[o + 3]}${e[o + 4]}${e[o + 5]}${e[o + 6]}${e[o + 7]}${e[o + 8]}` == "![CDATA[")) {
        let f = !0;
        e[o + 2] === "-" && (f = !1);
        let N;
        for (let y = o; y < O; y++) if ((!N && f && `${e[y - 2]}${e[y - 1]}${e[y]}` == "]]>" || !f && `${e[y - 2]}${e[y - 1]}${e[y]}` == "-->") && (N = y), N && (N < y && e[y].trim() || e[y + 1] === void 0)) {
          let A = y;
          (e[y + 1] === void 0 && !e[y].trim() || e[y] === ">") && (A += 1), (!i.length || i[i.length - 1][0] !== n.lastOpeningBracketAt) && i.push([n.lastOpeningBracketAt, N + 1]), (!s.length || s[s.length - 1][0] !== n.lastOpeningBracketAt) && s.push([n.lastOpeningBracketAt, N + 1]);
          let R = F(e, y, n.leftOuterWhitespace, A, n.lastOpeningBracketAt, N);
          g.cb({ tag: n, deleteFrom: n.leftOuterWhitespace, deleteTo: A, insert: R, rangesArr: b, proposedReturn: [n.leftOuterWhitespace, A, R] }), o = y - 1, e[y] === ">" && (o = y), n = {}, d = {};
          break;
        }
      }
    }
    !e[o].trim() || e[o].charCodeAt(0) === 847 ? (t === null && (t = o, n.lastOpeningBracketAt !== void 0 && n.lastOpeningBracketAt < o && n.nameStarts && n.nameStarts < n.lastOpeningBracketAt && o === n.lastOpeningBracketAt + 1 && !r.some((f) => f.name === n.name) && (n.onlyPlausible = !0, n.name = void 0, n.nameStarts = void 0)), (e[o] === `
` || e[o] === "\r") && (h = o, u && (u = !1))) : (t !== null && (!n.quotes && d.equalsAt > t - 1 && d.nameEnds && d.equalsAt > d.nameEnds && e[o] !== '"' && e[o] !== "'" && (we(d) && n.attributes.push(d), d = {}, n.equalsSpottedAt = void 0), t = null), u || (u = !0, x && !B && typeof h == "number" && o && h < o - 1 && (e.slice(h + 1, o).trim() ? h = null : g.ignoreIndentations || b.push([h + 1, o])))), e[o] === " " ? p === null && (p = o) : p !== null && (p = null), n.name === "script" && (B = !n.slashPresent);
  }
  if (e && !g.ignoreIndentations && (g.trimOnlySpaces && e[0] === " " || !g.trimOnlySpaces && !e[0].trim())) for (let o = 0; o < O; o++) if (g.trimOnlySpaces && e[o] !== " " || !g.trimOnlySpaces && e[o].trim()) {
    b.push([0, o]);
    break;
  } else e[o + 1] || b.push([0, o + 1]);
  if (e && (g.trimOnlySpaces && e[~-e.length] === " " || !g.trimOnlySpaces && !e[~-e.length].trim())) {
    for (let o = e.length; o--; ) if (g.trimOnlySpaces && e[o] !== " " || !g.trimOnlySpaces && e[o].trim()) {
      b.push([o + 1, O]);
      break;
    }
  }
  let P = b.current();
  if (!a?.cb && P && (P[0] && !P[0][0] && (P[0][1], b.ranges[0] = [b.ranges[0][0], b.ranges[0][1]]), P[P.length - 1] && P[P.length - 1][1] === e.length && (P[P.length - 1][0], b.ranges))) {
    let o = b.ranges[b.ranges.length - 1][0];
    e[o - 1] && (g.trimOnlySpaces && e[o - 1] === " " || !g.trimOnlySpaces && !e[o - 1].trim()) && (o -= 1);
    let f = b.ranges[b.ranges.length - 1][2];
    b.ranges[b.ranges.length - 1] = [o, b.ranges[b.ranges.length - 1][1]], f?.trim() && b.ranges[b.ranges.length - 1].push(f.trimEnd());
  }
  return { log: { timeTakenInMilliseconds: Date.now() - l }, result: br(e, b.current()), ranges: b.current(), allTagLocations: i, filteredTagLocations: s };
}
class Oe {
  speechSynthesis;
  speechSynthesisUtterance;
  currentVoice = null;
  currentUtterances = [];
  currentUtteranceIndex = 0;
  playbackState = "idle";
  eventListeners = /* @__PURE__ */ new Map();
  voices = [];
  browserVoices = [];
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
    if (this.features = $a(), this.patches = Wa(), !this.features.speechSynthesis || !this.features.speechSynthesisUtterance)
      throw new Error("Web Speech API is not available in this environment");
    this.speechSynthesis = this.features.speechSynthesis, this.speechSynthesisUtterance = this.features.speechSynthesisUtterance;
  }
  // From Easy Speech,
  // Check infinity pattern for long texts (except on problematic platforms)
  // Skip resume infinity for Microsoft Natural voices as they have different behavior 
  shouldUseResumeInfinity() {
    const a = this.currentVoice, l = !!(a?.name && typeof a.name == "string" && a.name.toLocaleLowerCase().includes("(natural)"));
    return this.patches.isAndroid !== !0 && !this.patches.isFirefox && !this.patches.isSafari && !l;
  }
  // Creates a new SpeechSynthesisUtterance using detected constructor
  createUtterance(a) {
    return new this.speechSynthesisUtterance(a);
  }
  async initialize(a = {}) {
    const { maxTimeout: l = 1e4, interval: r = 10, maxLengthExceeded: m = "warn" } = a;
    if (this.initialized)
      return !1;
    this.maxLengthExceeded = m;
    try {
      this.browserVoices = await ra(l, r), this.voices = ia(this.browserVoices);
      const i = Ea(this.voices);
      return this.defaultVoice = i.length > 0 ? i[0] : this.voices[0] || null, this.initialized = !0, !0;
    } catch (i) {
      return console.error("Failed to initialize WebSpeechEngine:", i), this.initialized = !1, !1;
    }
  }
  // Text length validation matching EasySpeech
  validateText(a) {
    if (new TextEncoder().encode(a).length > 4096) {
      const r = "Text exceeds max length of 4096 bytes, which may not work with some voices.";
      switch (this.maxLengthExceeded) {
        case "none":
          break;
        case "error":
          throw new Error(`WebSpeechEngine: ${r}`);
        case "warn":
        default:
          console.warn(`WebSpeechEngine: ${r}`);
      }
    }
  }
  getCurrentVoiceForUtterance(a) {
    return a && typeof a == "object" ? a : typeof a == "string" ? this.voices.find((l) => l.name === a || l.language === a) || null : this.currentVoice || this.defaultVoice;
  }
  getCurrentVoice() {
    return this.currentVoice;
  }
  // SSML Escaping
  escapeSSML(a) {
    return a.map((l) => ({
      ...l,
      text: l.ssml ? Aa(l.text).result : l.text
    }));
  }
  // Queue Management
  loadUtterances(a) {
    this.currentUtterances = this.escapeSSML(a), this.currentUtteranceIndex = 0, this.setState("ready"), this.emitEvent({ type: "ready" });
  }
  // Voice Configuration
  setVoice(a) {
    const l = this.currentVoice;
    typeof a == "string" ? this.getAvailableVoices().then((r) => {
      const m = r.find((i) => i.name === a || i.language === a);
      m ? (this.currentVoice = m, l && l.name !== m.name && (this.currentUtteranceIndex = 0)) : console.warn(`Voice "${a}" not found`);
    }) : (this.currentVoice = a, l && l.name !== a.name && (this.currentUtteranceIndex = 0));
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
    const a = this.currentUtterances[this.currentUtteranceIndex], l = (a.ssml, a.text);
    this.validateText(l);
    const r = this.createUtterance(l);
    a.language && (r.lang = a.language);
    const m = this.getCurrentVoiceForUtterance(this.currentVoice);
    if (m) {
      const i = this.browserVoices.find(
        (s) => s.name === m.name && s.lang === (m.__lang || m.language)
      );
      i && (r.voice = i);
    }
    r.rate = this.rate, r.pitch = this.pitch, r.volume = this.volume, r.onstart = () => {
      this.isSpeakingInternal = !0, this.isPausedInternal = !1, this.setState("playing"), this.emitEvent({ type: "start" }), this.patches.isAndroid && this.isAndroidPaused && (this.isAndroidPaused = !1), this.shouldUseResumeInfinity() && this.startResumeInfinity(r);
    }, r.onend = () => {
      if (this.utterancesBeingCancelled) {
        this.utterancesBeingCancelled = !1;
        return;
      }
      this.playbackState !== "idle" && (this.isSpeakingInternal = !1, this.isPausedInternal = !1, this.stopResumeInfinity(), this.currentUtteranceIndex >= this.currentUtterances.length - 1 && this.setState("idle"), this.emitEvent({ type: "end" }));
    }, r.onerror = (i) => {
      if (i.error === "interrupted" && this.patches.isAndroid && this.isAndroidPaused)
        return;
      this.isSpeakingInternal = !1, this.isPausedInternal = !1, this.stopResumeInfinity(), this.setState("idle"), ["synthesis-unavailable", "audio-hardware", "voice-unavailable"].includes(i.error) && (console.log("[ENGINE] fatal error detected, resetting index to 0"), this.currentUtteranceIndex = 0), i.error === "interrupted" || i.error === "canceled" ? this.emitEvent({ type: "stop" }) : this.emitEvent({
        type: "error",
        detail: {
          error: i.error,
          // Preserve original error type
          message: `Speech synthesis error: ${i.error}`
        }
      });
    }, r.onpause = () => {
      this.isPausedInternal = !0, this.isSpeakingInternal = !1, this.emitEvent({ type: "pause" });
    }, r.onresume = () => {
      this.isPausedInternal = !1, this.isSpeakingInternal = !0, this.emitEvent({ type: "resume" });
    }, r.onboundary = (i) => {
      this.emitEvent({
        type: "boundary",
        detail: {
          charIndex: i.charIndex,
          charLength: i.charLength,
          elapsedTime: i.elapsedTime,
          name: i.name
        }
      });
    }, r.onmark = (i) => {
      this.emitEvent({
        type: "mark",
        detail: {
          name: i.name
        }
      });
    }, this.speechSynthesis.speak(r);
  }
  startResumeInfinity(a) {
    this.shouldUseResumeInfinity() && (this.resumeInfinityTimer = window.setTimeout(() => {
      if (a) {
        const { paused: r, speaking: m } = this.speechSynthesis, i = m || this.isSpeakingInternal, s = r || this.isPausedInternal;
        i && !s && (this.speechSynthesis.pause(), this.speechSynthesis.resume());
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
  setCurrentUtteranceIndex(a, l) {
    if (a < 0 || a >= this.currentUtterances.length) {
      l?.(!1);
      return;
    }
    a !== this.currentUtteranceIndex && (!this.isPausedInternal && this.isSpeakingInternal && this.cancelCurrentSpeech(), this.currentUtteranceIndex = a, l?.(!0));
  }
  getUtteranceCount() {
    return this.currentUtterances.length;
  }
  // Events
  on(a, l) {
    return this.eventListeners.has(a) || this.eventListeners.set(a, []), this.eventListeners.get(a).push(l), () => {
      const r = this.eventListeners.get(a);
      if (r) {
        const m = r.indexOf(l);
        m > -1 && r.splice(m, 1);
      }
    };
  }
  emitEvent(a) {
    const l = this.eventListeners.get(a.type);
    l && l.forEach((r) => r(a));
  }
  setState(a) {
    const l = this.playbackState;
    if (this.playbackState = a, l !== a)
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
class Ur {
  id = "webspeech";
  name = "Web Speech API";
  engine = null;
  async getVoices() {
    if (!this.engine)
      throw new Error("No engine available. Create an engine first.");
    return this.engine.getAvailableVoices();
  }
  async createEngine(a) {
    const l = new Oe();
    return await l.initialize(), a && await l.setVoice(a), l;
  }
  async destroy() {
    this.engine && (await this.engine.destroy(), this.engine = null);
  }
}
class Lr {
  engine;
  contentQueue = [];
  eventListeners = /* @__PURE__ */ new Map();
  // Navigator owns the state, not the engine
  navigatorState = "idle";
  constructor(a) {
    this.engine = a || new Oe(), this.setupEngineListeners(), this.initializeEngine();
  }
  async initializeEngine() {
    if (this.engine instanceof Oe)
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
      const a = this.engine.getCurrentUtteranceIndex(), l = this.engine.getUtteranceCount();
      a < l - 1 ? this.engine.speak(a + 1) : this.setNavigatorState("idle"), this.emitEvent({ type: "end" });
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
  async setVoice(a) {
    this.engine.setVoice(a);
  }
  getCurrentVoice() {
    return this.engine.getCurrentVoice();
  }
  // Content Management
  loadContent(a) {
    const l = Array.isArray(a) ? a : [a];
    this.contentQueue = [...l], this.engine.loadUtterances(l), this.setNavigatorState("ready"), this.emitContentChangeEvent({ content: l });
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
  skipToPosition(a, l = !1) {
    const r = this.getCurrentUtteranceIndex();
    return a < 0 || a >= this.contentQueue.length ? !1 : (a === r || (this.navigatorState === "paused" && !l ? this.engine.setCurrentUtteranceIndex(a, (m) => {
      m && this.emitEvent({
        type: "skip",
        detail: { position: a }
      });
    }) : (this.setNavigatorState("playing"), this.engine.speak(a))), !0);
  }
  // Navigation - Navigator coordinates with proper state management
  next(a = !1) {
    const l = this.getCurrentUtteranceIndex();
    return this.skipToPosition(l + 1, a);
  }
  previous(a = !1) {
    const l = this.getCurrentUtteranceIndex();
    return this.skipToPosition(l - 1, a);
  }
  jumpTo(a, l = !1) {
    return this.skipToPosition(a, l);
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
  on(a, l) {
    return this.eventListeners.has(a) || this.eventListeners.set(a, []), this.eventListeners.get(a).push(l), () => {
      const r = this.eventListeners.get(a);
      if (r) {
        const m = r.indexOf(l);
        m > -1 && r.splice(m, 1);
      }
    };
  }
  emitEvent(a) {
    const l = this.eventListeners.get(a.type);
    l && l.forEach((r) => r(a));
  }
  emitContentChangeEvent(a) {
    const l = this.eventListeners.get("contentchange");
    l && l.forEach((r) => r({ type: "contentchange", detail: a }));
  }
  async destroy() {
    this.eventListeners.clear(), await this.engine.destroy();
  }
}
export {
  Oe as WebSpeechEngine,
  Ur as WebSpeechEngineProvider,
  Lr as WebSpeechReadAloudNavigator,
  Or as convertToSpeechSynthesisVoices,
  Gr as filterOnGender,
  Ea as filterOnLanguage,
  qe as filterOnNovelty,
  Pr as filterOnOfflineAvailability,
  xr as filterOnQuality,
  oa as filterOnRecommended,
  ve as filterOnVeryLowQuality,
  Hr as getLanguages,
  ra as getSpeechSynthesisVoices,
  Ir as getVoices,
  Cr as groupByKindOfVoices,
  Da as groupByLanguages,
  Tr as groupByRegions,
  La as listLanguages,
  Ba as listRegions,
  ia as parseSpeechSynthesisVoices,
  Mr as sortByGender,
  ta as sortByLanguage,
  Er as sortByName,
  Ma as sortByQuality,
  Ua as sortByRegion
};
