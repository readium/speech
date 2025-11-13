// Auto-generated file - DO NOT EDIT
// Last updated: 2025-11-19T09:33:56.339Z

/**
 * Test utterances for different languages
 * Used for voice preview and testing
 */
export const testUtterances: { [lang: string]: string } = {
  "ar": "مرحبًا، اسمي {name} وأنا صوت عربي.",
  "bg": "Здравейте, казвам се {name} и съм български глас.",
  "bho": "नमस्कार, हमार नाम {name} ह आ हम भोजपुरी आवाज हईं",
  "bn": "হ্যালো, আমার নাম {name} এবং আমি একজন বাংলা ভয়েস।",
  "ca": "Hola, em dic {name} i sóc una veu catalana",
  "cmn": "你好，我的名字是 {name}，我是普通话配音。",
  "cs": "Dobrý den, jmenuji se {name} a jsem český hlas.",
  "da": "Hej, mit navn er {name} og jeg er en dansk stemme.",
  "de": "Hallo, mein Name ist {name} und ich bin eine deutsche Stimme.",
  "el": "Γεια σας, με λένε {name} και είμαι ελληνική φωνή.",
  "en": "Hello, my name is {name} and I am an English voice.",
  "es": "Hola, mi nombre es {name} y soy una voz española.",
  "eu": "Kaixo, nire izena {name} da eta euskal ahotsa naiz.",
  "fa": "سلام اسم من {name} و صدای فارسی هستم",
  "fi": "Hei, nimeni on {name} ja olen suomalainen ääni.",
  "fr": "Bonjour, mon nom est {name} et je suis une voix française.",
  "gl": "Ola, chámome {name} e son unha voz galega.",
  "he": "שלום, שמי {name} ואני קול עברי.",
  "hi": "नमस्कार, मेरा नाम {name} है और मैं एक हिंदी आवाज़ हूँ।",
  "hr": "Pozdrav, ja sam {name} i hrvatski sam glas.",
  "hu": "Helló, a nevem {name} és magyar hangú vagyok.",
  "id": "Halo, nama saya {name} dan saya suara Indonesia.",
  "it": "Ciao, mi chiamo {name} e sono una voce italiana.",
  "ja": "こんにちは。私の名前は{name}で、日本語の声を担当しています。",
  "kn": "ಹಲೋ, ನನ್ನ ಹೆಸರು {name} ಮತ್ತು ನಾನು ಕನ್ನಡ ಧ್ವನಿ.",
  "ko": "안녕하세요, 저는 {name}이고 한국어 음성입니다.",
  "mr": "नमस्कार, माझे नाव {name} आहे आणि मी एक मराठी आवाज आहे.",
  "ms": "Hello, nama saya {name} dan saya suara Melayu.",
  "nb": "Hei, jeg heter {name} og er en norsk stemme.",
  "nl": "Hallo, mijn naam is {name} en ik ben een Nederlandse stem.",
  "pl": "Cześć, nazywam się {name} i mam polski głos.",
  "pt": "Olá, o meu nome é {name} e sou uma voz portuguesa.",
  "ro": "Buna ziua, ma numesc {name} si sunt o voce romaneasca.",
  "ru": "Здравствуйте, меня зовут {name} и я русский голос.",
  "sk": "Dobrý deň, volám sa {name} a som slovenský hlas.",
  "sl": "Pozdravljeni, moje ime je {name} in sem slovenski glas.",
  "sv": "Hej, jag heter {name} och jag är en svensk röst.",
  "ta": "வணக்கம், என் பெயர் {name} மற்றும் நான் ஒரு தமிழ் குரல்",
  "te": "హలో, నా పేరు {name} మరియు నేను తెలుగు వాణిని.",
  "th": "สวัสดีค่ะ ฉันชื่อ {name} และฉันเป็นคนมีเสียงภาษาไทย",
  "tr": "Merhaba, adım {name} ve Türk sesiyim.",
  "uk": "Здравствуйте, меня зовут {name} и я украинский голос.",
  "vi": "Xin chào, tôi tên là {name} và tôi là giọng nói tiếng Việt.",
  "wuu": "你好，我的名字是 {name}，我是吴语配音。",
  "yue": "你好，我叫 {name}，係越中文聲。"
};

/**
 * Get test utterance for a specific language
 * @param lang - Language code (e.g., "en", "fr", "es")
 * @returns Test utterance string or empty string if not found
 */
export function getTestUtterance(lang: string): string {
  // First try exact match
  if (testUtterances[lang]) {
    return testUtterances[lang];
  }
  
  // If not found, try the base language (e.g., "en-US" -> "en")
  const baseLang = lang.split('-')[0];
  return testUtterances[baseLang] || "";
}

/**
 * Get all available language codes that have test utterances
 * @returns Array of language codes
 */
export function getTestUtteranceLanguages(): string[] {
  return Object.keys(testUtterances);
}

export default testUtterances;