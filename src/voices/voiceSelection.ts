import type { ReadiumSpeechPlaybackEngine } from "../engine.js";
import type { VoicePreference } from "../preferences/SpeechPreferences.js";
import { extractLangRegionFromBCP47 } from "../utils/language.js";
import { pickLanguageVoice } from "./defaultVoice.js";
import { normalizeLanguageCode, voiceBaseLanguage } from "./languageCode.js";
import type { ReadiumSpeechVoice } from "./types.js";
import { getVoiceId } from "./voiceId.js";

// Keys are matched as voice languages are, e.g. a `zh-HK` key for `yue-HK` content.
const voiceUnder = (voices: Record<string, string>, tag: string): string | undefined =>
  Object.entries(voices).find(([key]) => normalizeLanguageCode(key) === tag)?.[1];

// The engine's voices, the one picked for each language, and which voice reads content in a language.
export class VoiceSelection {
  // The engine's voices, as last listed.
  voices: ReadiumSpeechVoice[] = [];
  // The loaded content's languages, in reading order.
  private contentLanguages: string[] = [];

  private voiceIds: Set<string> = new Set();
  // Keyed by `${language}:${needsBoundary}`: the voice picked for content in a language, null when it has none.
  private picked: Map<string, ReadiumSpeechVoice | null> = new Map();
  private picking: Map<string, Promise<void>> = new Map();
  // The engine's latest voice listing: one resolving after a newer one started gives way to it.
  private listing: Promise<ReadiumSpeechVoice[]> | null = null;

  constructor(
    private engine: ReadiumSpeechPlaybackEngine,
    private preference: () => VoicePreference | null,
    private mainLanguages: () => string[],
  ) {}

  /**
   * The voice content in `language` is read with: the preferred one for its tag; for `en-US`, the one preferred for
   * `en` if it's an `en-US` voice; for `en` that isn't a main language, that of the content's first `en-*`;
   * else the picked one for its tag, then the preferred and picked ones for its base language.
   */
  voiceFor(language: string | undefined, picked: Record<string, string> = this.picks()): string | undefined {
    const preference = this.availablePreference();
    if (typeof preference === "string") return preference;
    if (!language) return undefined;
    const preferred = preference ?? {};
    const tag = normalizeLanguageCode(language);
    const base = voiceBaseLanguage(language);
    const own = voiceUnder(preferred, tag);
    if (own) return own;
    const regional = this.regionalOf(language);
    if (regional) return this.voiceFor(regional, picked);
    if (tag !== base) {
      const forBase = voiceUnder(preferred, base);
      const voice = forBase && this.voices.find((voice) => getVoiceId(voice) === forBase);
      if (voice && normalizeLanguageCode(voice.language) === tag) return forBase;
    }
    return voiceUnder(picked, tag) ?? voiceUnder(preferred, base) ?? voiceUnder(picked, base);
  }

  // The picks content in their tag is read with, e.g. not an en-US pick when an en-US voice is preferred for en.
  pickedRecord(): Record<string, string> | null {
    const picks = this.picks();
    const voices = Object.fromEntries(Object.entries(picks).filter(([tag, id]) => this.voiceFor(tag, picks) === id));
    return Object.keys(voices).length > 0 ? voices : null;
  }

  // The voice picked for each main and content language.
  private picks(): Record<string, string> {
    const voices: Record<string, string> = {};
    for (const language of new Set([...this.mainLanguages(), ...this.contentLanguages])) {
      const picked = this.pickedVoice(language);
      if (picked) voices[this.pickedVoiceKey(language, picked)] ??= getVoiceId(picked);
    }
    return voices;
  }

  // The preference's voices the engine has, by their ids; an engine listing no voice can't tell, so it's trusted with them.
  availablePreference(): VoicePreference | null {
    const voice = this.preference();
    if (typeof voice === "string") return this.listedVoiceId(voice) ?? null;
    if (!voice) return null;
    const voices = Object.fromEntries(Object.entries(voice).flatMap(([language, id]) => {
      const listed = this.listedVoiceId(id);
      return listed ? [[language, listed]] : [];
    }));
    return Object.keys(voices).length > 0 ? voices : null;
  }

  setContentLanguages(languages: string[]): void {
    this.contentLanguages = languages;
  }

  // The content's languages whose voice is still waiting to be picked.
  unpicked(): string[] {
    return this.contentLanguages.filter((language) => this.pickedVoice(this.regionalOf(language) ?? language) === undefined);
  }

  // Lists the engine's voices for the main and content languages, and picks one for each, the main language first.
  async pick(): Promise<void> {
    const main = this.mainLanguages();
    const all = [...new Set([...main, ...this.contentLanguages].map(language => normalizeLanguageCode(language)).filter(Boolean))];
    let listing = this.engine.getAvailableVoices(all, this.preferredVoiceIds());
    this.listing = listing;
    let voices = await listing;
    while (listing !== this.listing) {
      listing = this.listing!;
      voices = await listing;
    }
    if (voices.length !== this.voices.length || voices.some(voice => !this.voiceIds.has(getVoiceId(voice)))) {
      this.voices = voices;
      this.voiceIds = new Set(voices.map(voice => getVoiceId(voice)));
      this.picked.clear();
      this.picking.clear();
    }
    if (main[0]) await this.pickVoice(main[0]);
    await Promise.all(all.filter(language => !this.regionalOf(language)).map(language => this.pickVoice(language)));
  }

  // The content's region a bare language that isn't a main one is read as, e.g. `en-GB` for `en`; it gets no pick of its own.
  private regionalOf(language: string): string | undefined {
    const tag = normalizeLanguageCode(language);
    const base = voiceBaseLanguage(language);
    const mainLanguages = this.mainLanguages();
    if (tag !== base || mainLanguages.some((main) => normalizeLanguageCode(main) === tag)) return undefined;
    return [...mainLanguages, ...this.contentLanguages].find((other) => voiceBaseLanguage(other) === base && normalizeLanguageCode(other) !== base);
  }

  // The main language's voice prefers boundary events; the others match its boundary support.
  private needsBoundary(language: string): boolean {
    const [main] = this.mainLanguages();
    if (!main || normalizeLanguageCode(language) === normalizeLanguageCode(main)) return true;
    const picked = this.picked.get(this.pickKey(main, true));
    const id = this.voiceFor(main, picked ? { [this.pickedVoiceKey(main, picked)]: getVoiceId(picked) } : {});
    const mainVoice = this.voices.find(voice => getVoiceId(voice) === id);
    return mainVoice?.controls?.boundary !== false;
  }

  private pickKey(language: string, needsBoundary: boolean): string {
    return `${normalizeLanguageCode(language)}:${needsBoundary}`;
  }

  // `undefined` until picked
  private pickedVoice(language: string): ReadiumSpeechVoice | null | undefined {
    return this.picked.get(this.pickKey(language, this.needsBoundary(language)));
  }

  private async pickVoice(language: string): Promise<void> {
    const needsBoundary = this.needsBoundary(language);
    const key = this.pickKey(language, needsBoundary);
    if (this.picked.has(key)) return;
    let picking = this.picking.get(key);
    if (!picking) {
      const voices = this.voices;
      picking = pickLanguageVoice(language, voices, needsBoundary)
        .then((voice) => {
          // Unless the engine's voices changed meanwhile
          if (this.voices === voices) this.picked.set(key, voice);
        })
        .finally(() => this.picking.delete(key));
      this.picking.set(key, picking);
    }
    await picking;
  }

  // Listed whatever their language, so they're kept rather than taken for another browser's.
  private preferredVoiceIds(): string[] {
    const voice = this.preference();
    return typeof voice === "string" ? [voice] : voice ? Object.values(voice) : [];
  }

  // Matched by id, else by name, as engines match a voice.
  private listedVoiceId(id: string): string | undefined {
    if (this.voices.length === 0) return id;
    const voice = this.voices.find(voice => getVoiceId(voice) === id) ?? this.voices.find(voice => voice.name === id);
    return voice && getVoiceId(voice);
  }

  // A pick is for the language's region only when the voice is of it, else for its base language.
  private pickedVoiceKey(language: string, picked: ReadiumSpeechVoice): string {
    const [base, region] = extractLangRegionFromBCP47(language);
    if (region && extractLangRegionFromBCP47(picked.language)[1] === region) return language;
    // Unless the base is another voice language's too, e.g. zh, Mandarin's, for zh-HK's Cantonese
    return voiceBaseLanguage(base) === voiceBaseLanguage(language) ? base : language;
  }
}
