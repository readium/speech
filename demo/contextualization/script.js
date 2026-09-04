import {
  WebSpeechVoiceManager,
  WebSpeechEngine,
  ReadiumSpeechNavigator,
  setupDecorations,
  DecorationStyleType,
  createLocator,
  parseMarkup,
} from "../../build/index.js";

// Set up the Decorator for TTS word/sentence highlights
const decoCtrl = setupDecorations();

// DOM Elements
const content = document.getElementById("content");
const voiceSelect = document.getElementById("voiceSelect");
const verbositySelect = document.getElementById("verbositySelect");
const playPauseBtn = document.getElementById("playPauseBtn");
const stopBtn = document.getElementById("stopBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const currentUtteranceSpan = document.getElementById("currentUtterance");
const totalUtterancesSpan = document.getElementById("totalUtterances");
const readAlongCheckbox = document.getElementById("readAlong");
const gndOutput = document.getElementById("gnd-output");
const utterancesOutput = document.getElementById("utterances-output");
const tabGnd = document.getElementById("tab-gnd");
const tabUtterances = document.getElementById("tab-utterances");
const panelGnd = document.getElementById("panel-gnd");
const panelUtterances = document.getElementById("panel-utterances");

// State
let voiceManager;
let navigator;
let enVoices = [];
let currentVoice = null;
let isPlaying = false;
let utterances = [];
let readAlongEnabled = true;
let currentSentenceIndex = -1;

// Initialize voice manager and navigator
async function initialize() {
  try {
    voiceManager = await WebSpeechVoiceManager.initialize({ languages: ["en"] });
    enVoices = await voiceManager.getVoices({ removeDuplicates: true });

    navigator = new ReadiumSpeechNavigator(new WebSpeechEngine());

    setupEventListeners();
    updateUI();

    await populateVoiceSelect();

    currentVoice = await voiceManager.getDefaultVoice("en", enVoices);
    if (currentVoice) {
      navigator.setVoice(currentVoice);
      const option = voiceSelect.querySelector(`option[data-voice-uri="${currentVoice.voiceURI}"]`);
      if (option) option.selected = true;
    }

    initializeContent();
  } catch (error) {
    console.error("Initialization error:", error);
  }
}

function setupEventListeners() {
  navigator.on("start", () => {
    isPlaying = true;
    updateUI();
  });

  navigator.on("pause", () => {
    isPlaying = false;
    updateUI();
  });

  navigator.on("stop", () => {
    isPlaying = false;
    clearWordHighlighting();
    updateUI();
  });

  navigator.on("end", () => {
    isPlaying = false;
    clearWordHighlighting();
    updateUI();
  });

  navigator.on("error", (event) => {
    console.error("Navigator error:", event.detail);
    updateUI();
  });

  navigator.on("boundary", (event) => {
    if (event.detail && event.detail.name === "word") {
      highlightCurrentWord(event.detail.charIndex, event.detail.charLength);
    }
    updateUI();
  });

  // Kept in sync with whatever loadGndContent()/submitPreferences() produced,
  // so verbosity changes are reflected without re-deriving utterances by hand.
  navigator.on("contentchange", (event) => {
    utterances = event.detail.content;
    renderUtterancesPanel();
    updateUI();
  });

  if (playPauseBtn) playPauseBtn.addEventListener("click", togglePlayback);
  if (stopBtn) stopBtn.addEventListener("click", stopPlayback);
  if (prevBtn) prevBtn.addEventListener("click", previousUtterance);
  if (nextBtn) nextBtn.addEventListener("click", nextUtterance);

  if (readAlongCheckbox) {
    readAlongCheckbox.checked = readAlongEnabled;
    readAlongCheckbox.addEventListener("change", handleReadAlongChange);
  }

  if (voiceSelect) voiceSelect.addEventListener("change", handleVoiceChange);
  if (verbositySelect) verbositySelect.addEventListener("change", handleVerbosityChange);

  tabGnd.addEventListener("click", () => selectTab("gnd"));
  tabUtterances.addEventListener("click", () => selectTab("utterances"));
}

function selectTab(name) {
  const isGnd = name === "gnd";
  tabGnd.setAttribute("aria-selected", String(isGnd));
  tabUtterances.setAttribute("aria-selected", String(!isGnd));
  panelGnd.hidden = !isGnd;
  panelUtterances.hidden = isGnd;
}

function handleVerbosityChange(e) {
  if (!navigator) return;
  const editor = navigator.preferencesEditor;
  editor.verbosity.value = e.target.value;
  navigator.submitPreferences(editor.preferences);
}

function handleReadAlongChange(e) {
  readAlongEnabled = e.target.checked;
  if (!readAlongEnabled) {
    clearWordHighlighting();
  }
}

// Parses the live, rendered article DOM into a Guided Navigation document
// (with domRange textrefs — only possible against a rendered element, not a
// detached HTML string) and loads it into the navigator, which re-extracts
// utterances internally whenever verbosity/preferences change.
function initializeContent() {
  const gnd = parseMarkup(content, undefined, { textrefs: { roles: true, domRange: true } });
  gndOutput.textContent = JSON.stringify(gnd, null, 2);
  navigator.loadGndContent(gnd);
}

function renderUtterancesPanel() {
  // `locate` (cssSelector/domRange) is still used for highlighting — just
  // omitted here since it dwarfs the rest of the JSON.
  utterancesOutput.textContent = JSON.stringify(utterances, (key, value) => (key === "locate" ? undefined : value), 2);
}

// Populate voice select dropdown
async function populateVoiceSelect() {
  if (!voiceSelect) return;

  voiceSelect.innerHTML = "<option value=\"\" disabled selected>Loading voices...</option>";

  try {
    if (!enVoices || !enVoices.length) {
      enVoices = await voiceManager.getVoices({ languages: "en", removeDuplicates: true });
    }

    voiceSelect.innerHTML = "<option value=\"\" disabled selected>Select a voice</option>";

    if (!enVoices || !enVoices.length) {
      const option = document.createElement("option");
      option.disabled = true;
      option.textContent = "No voices available. Please check your browser settings and internet connection.";
      voiceSelect.appendChild(option);
      return;
    }

    try {
      const sortedVoices = await voiceManager.sortVoicesByRegions(["en"], enVoices);

      let currentRegion = null;
      let optgroup = null;

      for (const voice of sortedVoices) {
        const region = voice.language.split("-")[1] || "Other";

        if (region !== currentRegion) {
          currentRegion = region;
          optgroup = document.createElement("optgroup");
          const flag = getCountryFlag(region === "Other" ? null : region);
          const regionName = region === "Other" ? region :
            new Intl.DisplayNames(window.navigator.languages, { type: "region" }).of(region) || region;
          optgroup.label = `${flag} ${regionName}`;
          voiceSelect.appendChild(optgroup);
        }

        const option = document.createElement("option");
        option.value = voice.name;
        option.textContent = `${voice.label || voice.name}`;
        option.dataset.voiceUri = voice.voiceURI;

        if (currentVoice && voice.name === currentVoice.name) {
          option.selected = true;
        }

        optgroup?.appendChild(option);
      }

      if (currentVoice) {
        const option = voiceSelect.querySelector(`option[data-voice-uri="${currentVoice.voiceURI}"]`);
        if (option) option.selected = true;
      }

      updateUI();
    } catch (error) {
      console.error("Error populating voice select:", error);
      voiceSelect.innerHTML = "<option value=\"\" disabled selected>Error loading voices</option>";
    }
  } catch (error) {
    console.error("Error populating voice dropdown:", error);
    enVoices.forEach((voice) => {
      const option = document.createElement("option");
      option.value = voice.name;
      option.textContent = [
        voice.label || voice.name,
        voice.gender ? `• ${voice.gender}` : "",
        voice.offlineAvailability ? "• offline" : "• online",
      ].filter(Boolean).join(" ");
      option.dataset.voiceUri = voice.voiceURI;
      voiceSelect.appendChild(option);
    });
  }

  voiceSelect.addEventListener("change", handleVoiceChange);

  function getCountryFlag(countryCode) {
    if (!countryCode) return "🌐";
    try {
      const codePoints = countryCode
        .toUpperCase()
        .split("")
        .map((char) => 127397 + char.charCodeAt(0));
      return String.fromCodePoint(...codePoints);
    } catch (e) {
      console.warn("Could not generate flag for country code:", countryCode);
      return "🌐";
    }
  }
}

function togglePlayback() {
  if (!currentVoice) {
    console.error("No voice selected");
    return;
  }

  try {
    const state = navigator.getState();
    if (state === "playing") {
      navigator.pause();
    } else if (state === "paused") {
      navigator.play();
    } else {
      navigator.jumpTo(0);
      navigator.play();
    }
  } catch (error) {
    console.error("Error toggling playback:", error);
  }
}

function stopPlayback() {
  if (!navigator) return;
  navigator.stop();
  clearWordHighlighting();
  updateUI();
}

function previousUtterance() {
  if (!navigator) return;
  navigator.previous();
  updateUI();
}

function nextUtterance() {
  if (!navigator) return;
  navigator.next();
  updateUI();
}

async function handleVoiceChange(e) {
  const voiceName = e.target.value;
  if (!voiceName) return;

  currentVoice = enVoices.find((v) => v.name === voiceName);
  if (!currentVoice) {
    console.error("Voice not found:", voiceName);
    return;
  }

  if (navigator) {
    try {
      navigator.stop();
      navigator.setVoice(currentVoice);
      updateUI();
    } catch (error) {
      console.error("Error changing voice:", error);
    }
  }
}

function clearWordHighlighting() {
  decoCtrl.applyDecorations([], "tts-sentence");
  decoCtrl.applyDecorations([], "tts-word");
  currentSentenceIndex = -1;
}

// Highlights the word/sentence currently being spoken using each utterance's
// own locator (derived from the live DOM at parse time, see
// initializeContent) rather than searching article text for a match — the
// same word/phrase can legitimately appear more than once across the
// article, so anchoring by locator (scoped to the utterance's own DOM
// location) is what keeps the highlight on the right occurrence.
function highlightCurrentWord(charIndex, charLength) {
  if (!readAlongEnabled) return;

  const currentIndex = navigator.getCurrentUtteranceIndex();
  const currentUtterance = utterances[currentIndex];
  if (!currentUtterance || !currentUtterance.locate) return;

  const word = currentUtterance.plain?.substring(charIndex, charIndex + charLength);
  if (!word || !word.trim()) return;

  const before = currentUtterance.plain.substring(0, charIndex);
  const after = currentUtterance.plain.substring(charIndex + charLength);

  if (currentIndex !== currentSentenceIndex) {
    currentSentenceIndex = currentIndex;
    decoCtrl.applyDecorations([{
      id: "tts-sentence",
      locator: createLocator(currentUtterance.locate),
      style: { type: DecorationStyleType.Highlight, tint: "#ffeb3b", enforceContrast: false },
    }], "tts-sentence");

    const target = currentUtterance.locate.cssSelector
      ? document.querySelector(currentUtterance.locate.cssSelector)
      : null;
    if (target) {
      const rect = target.getBoundingClientRect();
      const inView = rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
      if (!inView) target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  decoCtrl.applyDecorations([{
    id: "tts-word",
    locator: createLocator({ cssSelector: currentUtterance.locate.cssSelector, text: { highlight: word, before, after } }),
    style: { type: DecorationStyleType.Underline, tint: "#e53935", enforceContrast: false },
  }], "tts-word");
}

function updateUI() {
  if (!navigator) return;

  const currentIndex = navigator.getCurrentUtteranceIndex();
  const total = utterances.length;
  const state = navigator.getState();
  const hasContent = total > 0;

  if (playPauseBtn) {
    playPauseBtn.disabled = !currentVoice || !hasContent;
    if (state === "playing") {
      playPauseBtn.innerHTML = `<span class="btn-icon">⏸️</span> <span class="btn-text">Pause</span>`;
      playPauseBtn.classList.remove("play-state");
      playPauseBtn.classList.add("pause-state");
    } else {
      playPauseBtn.innerHTML = `<span class="btn-icon">▶️</span> <span class="btn-text">Play</span>`;
      playPauseBtn.classList.remove("pause-state");
      playPauseBtn.classList.add("play-state");
    }
  }

  if (stopBtn) stopBtn.disabled = !currentVoice || !hasContent || (state !== "playing" && state !== "paused");
  if (prevBtn) prevBtn.disabled = !currentVoice || !hasContent || currentIndex <= 0;
  if (nextBtn) nextBtn.disabled = !currentVoice || !hasContent || currentIndex >= total - 1;

  if (currentUtteranceSpan) currentUtteranceSpan.textContent = currentIndex + 1;
  if (totalUtterancesSpan) totalUtterancesSpan.textContent = total;
}

initialize().catch(console.error);
