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

const PLAY_ICON = `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>`;
const PAUSE_ICON = `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>`;

// DOM Elements
const content = document.getElementById("content");
const voiceSelect = document.getElementById("voiceSelect");
const verbositySelect = document.getElementById("verbositySelect");
const utteranceStyleSelect = document.getElementById("utteranceStyleSelect");
const utteranceColorInput = document.getElementById("utteranceColorInput");
const wordStyleSelect = document.getElementById("wordStyleSelect");
const wordColorInput = document.getElementById("wordColorInput");
const playPauseBtn = document.getElementById("playPauseBtn");
const stopBtn = document.getElementById("stopBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const currentUtteranceSpan = document.getElementById("currentUtterance");
const totalUtterancesSpan = document.getElementById("totalUtterances");
const readAlongCheckbox = document.getElementById("readAlong");
const readAlongGroup = document.getElementById("readAlongGroup");
const readAlongUnavailable = document.getElementById("readAlongUnavailable");
const gndOutput = document.getElementById("gnd-output");
const utterancesOutput = document.getElementById("utterances-output");
const tabGnd = document.getElementById("tab-gnd");
const tabUtterances = document.getElementById("tab-utterances");
const panelGnd = document.getElementById("panel-gnd");
const panelUtterances = document.getElementById("panel-utterances");
const panelAside = document.querySelector("aside.panel");
const panelToggle = document.getElementById("panel-toggle");
const panelShow = document.getElementById("panel-show");
const controlsEl = document.getElementById("controls");
const controlsToggle = document.getElementById("controls-toggle");
const controlsShow = document.getElementById("controls-show");
const mtabGnd = document.getElementById("mtab-gnd");
const mtabUtterances = document.getElementById("mtab-utterances");
const mtabSettings = document.getElementById("mtab-settings");
const mtabClose = document.getElementById("mtab-close");
const mobileMediaQuery = window.matchMedia("(max-width: 900px)");

// State
let voiceManager;
let navigator;
let enVoices = [];
let currentVoice = null;
let isPlaying = false;
let utterances = [];
let readAlongEnabled = true;
let readAlongPreference = true; // user's last explicit choice — restored when a capable voice is selected again
let currentSentenceIndex = -1;
let utteranceStyle = DecorationStyleType.Highlight;
let utteranceTint = "#ffeb3b";
let wordStyle = DecorationStyleType.Underline;
let wordTint = "#e53935";
let lastWordHighlight = null; // { cssSelector, word, before, after } — reapplied when word style/color changes mid-utterance
let mobilePanel = null; // "gnd" | "utterances" | "settings" | null — which split is open in the mobile bottom bar

// Initialize voice manager and navigator
async function initialize() {
  try {
    voiceManager = await WebSpeechVoiceManager.initialize({ languages: ["en"] });
    enVoices = await voiceManager.getVoices({ removeDuplicates: true });

    navigator = new ReadiumSpeechNavigator(new WebSpeechEngine());
    navigator.setSpeakInContentLanguage(true);

    // Broadens the shared WebSpeechVoiceManager singleton so the engine's
    // own voice lookup (used for content-language switching) covers French
    // too, without adding French voices to the "Voice" dropdown above.
    void WebSpeechVoiceManager.initialize({ languages: ["en", "fr"] });

    setupEventListeners();
    updateUI();

    // On mobile there's no room for the panel + controls + article side by
    // side, so the article starts as the full-height default view instead
    // of the desktop default of the GND/Utterances panel being open.
    if (mobileMediaQuery.matches) setMobilePanel(null);

    // Resizing across the breakpoint (not just loading narrow) needs the
    // same reset — otherwise a panel left open from the desktop default
    // stays visually open on mobile while the bottom-bar tab state (which
    // only setMobilePanel updates) still thinks nothing is open.
    mobileMediaQuery.addEventListener("change", (e) => {
      if (e.matches) setMobilePanel(null);
    });

    await populateVoiceSelect();

    currentVoice = await voiceManager.getDefaultVoice("en", enVoices);
    if (currentVoice) {
      navigator.setVoice(currentVoice);
      const option = voiceSelect.querySelector(`option[data-voice-uri="${currentVoice.voiceURI}"]`);
      if (option) option.selected = true;
    }
    updateReadAlongAvailability();

    initializeContent();

    // "block-level" (the default) ignores inline lang spans — only "always"
    // splits an utterance on them, which the French <span lang="fr"> relies on.
    // Submitted after initializeContent() so the navigator already has a
    // source to re-extract from.
    const languageEditor = navigator.preferencesEditor;
    languageEditor.language.value = "always";
    navigator.submitPreferences(languageEditor.preferences);
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

  navigator.on("resume", () => {
    isPlaying = true;
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
    if (readAlongGroup) readAlongGroup.disabled = !readAlongEnabled;
    readAlongCheckbox.addEventListener("change", handleReadAlongChange);
  }

  if (voiceSelect) voiceSelect.addEventListener("change", handleVoiceChange);
  if (verbositySelect) verbositySelect.addEventListener("change", handleVerbosityChange);

  if (utteranceStyleSelect) utteranceStyleSelect.addEventListener("change", (e) => { utteranceStyle = e.target.value; applyUtteranceDecoration(); });
  if (utteranceColorInput) utteranceColorInput.addEventListener("input", (e) => { utteranceTint = e.target.value; applyUtteranceDecoration(); });
  if (wordStyleSelect) wordStyleSelect.addEventListener("change", (e) => { wordStyle = e.target.value; applyWordDecoration(); });
  if (wordColorInput) wordColorInput.addEventListener("input", (e) => { wordTint = e.target.value; applyWordDecoration(); });

  tabGnd.addEventListener("click", () => selectTab("gnd"));
  tabUtterances.addEventListener("click", () => selectTab("utterances"));
  tabGnd.addEventListener("keydown", handleTabKeydown);
  tabUtterances.addEventListener("keydown", handleTabKeydown);

  if (panelToggle) panelToggle.addEventListener("click", () => setPanelCollapsed(true));
  if (panelShow) panelShow.addEventListener("click", () => setPanelCollapsed(false));
  panelAside.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !panelAside.classList.contains("collapsed")) {
      setMobilePanel(null);
    }
  });

  if (mtabGnd) mtabGnd.addEventListener("click", () => handleMobileTabClick("gnd"));
  if (mtabUtterances) mtabUtterances.addEventListener("click", () => handleMobileTabClick("utterances"));
  if (mtabSettings) mtabSettings.addEventListener("click", () => handleMobileTabClick("settings"));
  if (mtabClose) mtabClose.addEventListener("click", () => setMobilePanel(null));

  if (controlsToggle) controlsToggle.addEventListener("click", () => setControlsCollapsed(true));
  if (controlsShow) controlsShow.addEventListener("click", () => setControlsCollapsed(false));
}

function setPanelCollapsed(collapsed) {
  panelAside.classList.toggle("collapsed", collapsed);
  panelToggle.setAttribute("aria-expanded", String(!collapsed));
  panelShow.setAttribute("aria-expanded", String(!collapsed));
  panelShow.hidden = !collapsed;
  if (collapsed) panelShow.focus();
}

// Desktop-only collapse for the Settings column — mirrors setPanelCollapsed,
// giving the article back the width Settings was using. On mobile this is
// superseded by the bottom-bar Settings tab (see setMobilePanel).
function setControlsCollapsed(collapsed) {
  controlsEl.classList.toggle("collapsed", collapsed);
  controlsToggle.setAttribute("aria-expanded", String(!collapsed));
  controlsShow.setAttribute("aria-expanded", String(!collapsed));
  controlsShow.hidden = !collapsed;
  if (collapsed) controlsShow.focus();
}

// Drives the mobile bottom bar's GND/Utterances/Settings tabs. Only one
// split is ever open: opening GND/Utterances expands .panel (and picks the
// right internal tab) while closing .controls' split, and vice versa for
// Settings — the article (.reader) always keeps the rest of the screen,
// it's never fully replaced.
function handleMobileTabClick(panel) {
  setMobilePanel(mobilePanel === panel ? null : panel);
}

function setMobilePanel(panel) {
  mobilePanel = panel;

  const showGndPanel = panel === "gnd" || panel === "utterances";
  setPanelCollapsed(!showGndPanel);
  if (showGndPanel) selectTab(panel);

  if (controlsEl) {
    controlsEl.classList.toggle("mobile-open", panel === "settings");
    controlsEl.classList.remove("collapsed");
  }

  updateMobileTabsUI();
}

function updateMobileTabsUI() {
  [[mtabGnd, "gnd"], [mtabUtterances, "utterances"], [mtabSettings, "settings"]].forEach(([btn, name]) => {
    if (!btn) return;
    const active = mobilePanel === name;
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-pressed", String(active));
  });
  if (mtabClose) mtabClose.hidden = mobilePanel === null;
}

function selectTab(name) {
  const isGnd = name === "gnd";
  tabGnd.setAttribute("aria-selected", String(isGnd));
  tabUtterances.setAttribute("aria-selected", String(!isGnd));
  tabGnd.tabIndex = isGnd ? 0 : -1;
  tabUtterances.tabIndex = isGnd ? -1 : 0;
  panelGnd.hidden = !isGnd;
  panelUtterances.hidden = isGnd;
}

function handleTabKeydown(e) {
  const tabs = [tabGnd, tabUtterances];
  const currentIndex = tabs.indexOf(e.currentTarget);
  let nextIndex = null;

  if (e.key === "ArrowRight" || e.key === "ArrowDown") {
    nextIndex = (currentIndex + 1) % tabs.length;
  } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
    nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
  } else if (e.key === "Home") {
    nextIndex = 0;
  } else if (e.key === "End") {
    nextIndex = tabs.length - 1;
  } else {
    return;
  }

  e.preventDefault();
  const nextTab = tabs[nextIndex];
  selectTab(nextTab === tabGnd ? "gnd" : "utterances");
  nextTab.focus();
}

function handleVerbosityChange(e) {
  if (!navigator) return;
  const editor = navigator.preferencesEditor;
  editor.verbosity.value = e.target.value;
  navigator.submitPreferences(editor.preferences);
}

function handleReadAlongChange(e) {
  readAlongPreference = e.target.checked;
  readAlongEnabled = e.target.checked;
  if (readAlongGroup) readAlongGroup.disabled = !readAlongEnabled;
  if (!readAlongEnabled) {
    clearWordHighlighting();
  }
}

// Read along forces the checkbox off and disabled when the selected voice
// has offlineAvailability === false — readAlongPreference remembers the
// user's own choice (session-scoped, in memory) so it's restored as-is
// once a capable voice is selected again, rather than resetting to on.
function updateReadAlongAvailability() {
  if (!readAlongCheckbox) return;

  const unavailable = !!currentVoice && currentVoice.offlineAvailability === false;
  readAlongCheckbox.disabled = unavailable;
  if (readAlongUnavailable) readAlongUnavailable.hidden = !unavailable;

  readAlongEnabled = unavailable ? false : readAlongPreference;
  readAlongCheckbox.checked = readAlongEnabled;
  if (readAlongGroup) readAlongGroup.disabled = !readAlongEnabled;
  if (!readAlongEnabled) clearWordHighlighting();
}

// Parses the live, rendered article DOM into a Guided Navigation document
// (with domRange textrefs — only possible against a rendered element, not a
// detached HTML string) and loads it into the navigator, which re-extracts
// utterances internally whenever verbosity/preferences change.
function initializeContent() {
  const gnd = parseMarkup(content, undefined, { textrefs: { roles: true, domRange: true } });
  gndOutput.textContent = JSON.stringify(gnd, (key, value) => (key === "textref" ? undefined : value), 2);
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
  updateReadAlongAvailability();

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
  lastWordHighlight = null;
}

// Reapplies the current utterance/word decorations using the live
// utteranceStyle/utteranceTint (resp. wordStyle/wordTint), so a style/color
// change is reflected immediately instead of waiting for the next boundary.
function applyUtteranceDecoration() {
  if (currentSentenceIndex === -1) return;
  const currentUtterance = utterances[currentSentenceIndex];
  if (!currentUtterance || !currentUtterance.locate) return;

  decoCtrl.applyDecorations([{
    id: "tts-sentence",
    locator: createLocator(currentUtterance.locate),
    style: { type: utteranceStyle, tint: utteranceTint, enforceContrast: false },
  }], "tts-sentence");
}

function applyWordDecoration() {
  if (!lastWordHighlight) return;

  decoCtrl.applyDecorations([{
    id: "tts-word",
    locator: createLocator({
      cssSelector: lastWordHighlight.cssSelector,
      text: { highlight: lastWordHighlight.word, before: lastWordHighlight.before, after: lastWordHighlight.after },
    }),
    style: { type: wordStyle, tint: wordTint, enforceContrast: false },
  }], "tts-word");
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
    applyUtteranceDecoration();

    const target = currentUtterance.locate.cssSelector
      ? document.querySelector(currentUtterance.locate.cssSelector)
      : null;
    if (target) {
      const rect = target.getBoundingClientRect();
      const inView = rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
      if (!inView) target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  lastWordHighlight = { cssSelector: currentUtterance.locate.cssSelector, word, before, after };
  applyWordDecoration();
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
      playPauseBtn.innerHTML = PAUSE_ICON;
      playPauseBtn.setAttribute("aria-label", "Pause");
      playPauseBtn.classList.remove("paused");
    } else {
      playPauseBtn.innerHTML = PLAY_ICON;
      playPauseBtn.setAttribute("aria-label", "Play");
      playPauseBtn.classList.add("paused");
    }
  }

  if (stopBtn) stopBtn.disabled = !currentVoice || !hasContent || (state !== "playing" && state !== "paused");
  if (prevBtn) prevBtn.disabled = !currentVoice || !hasContent || currentIndex <= 0;
  if (nextBtn) nextBtn.disabled = !currentVoice || !hasContent || currentIndex >= total - 1;

  if (currentUtteranceSpan) currentUtteranceSpan.textContent = currentIndex + 1;
  if (totalUtterancesSpan) totalUtterancesSpan.textContent = total;
}

initialize().catch(console.error);
