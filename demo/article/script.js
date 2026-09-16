import {
  WebSpeechVoiceManager,
  WebSpeechEngine,
  ReadiumSpeechNavigator,
  setupDecorations,
  DecorationStyleType,
  DecorationLayout,
  createLocator,
  parseMarkup,
  decodeTextref,
} from "../../build/index.js";

// Set up the Decorator for TTS word/sentence highlights — also watches
// .main (the flex item that resizes when the panel/controls columns
// collapse) since that reflow doesn't change <html>'s own size.
const decoCtrl = setupDecorations(window, { resizeWatchSelectors: [".main"] });

const PLAY_ICON = `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>`;
const PAUSE_ICON = `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>`;

// DOM Elements
const content = document.getElementById("content");
const voiceSelect = document.getElementById("voiceSelect");
const verbositySelect = document.getElementById("verbositySelect");
const speedInput = document.getElementById("speedInput");
const speedValue = document.getElementById("speedValue");
const utteranceStyleSelect = document.getElementById("utteranceStyleSelect");
const utteranceColorInput = document.getElementById("utteranceColorInput");
const wordStyleSelect = document.getElementById("wordStyleSelect");
const wordColorInput = document.getElementById("wordColorInput");
const playPauseBtn = document.getElementById("playPauseBtn");
const stopBtn = document.getElementById("stopBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const currentUtteranceInput = document.getElementById("currentUtteranceInput");
const totalUtterancesSpan = document.getElementById("totalUtterances");
const readAlongCheckbox = document.getElementById("readAlong");
const readAlongGroup = document.getElementById("readAlongOptions");
const autoScrollCheckbox = document.getElementById("autoScroll");
const decorateSyntheticCheckbox = document.getElementById("decorateSynthetic");
const syncPanelsCheckbox = document.getElementById("syncPanels");
const wordHighlightUnavailable = document.getElementById("wordHighlightUnavailable");
const gndOutput = document.getElementById("gnd-output");
const showTextrefsCheckbox = document.getElementById("showTextrefs");
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
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

// State
let voiceManager;
let navigator;
let enVoices = [];
let currentVoice = null;
let isPlaying = false;
let utterances = [];
let readAlongEnabled = true;
let autoScrollEnabled = true;
let decorateSyntheticEnabled = false;
let syncPanelsEnabled = false;
// Rebuilt on each renderGndOutput(); maps a GND node to its rendered span id.
let gndNodeIds = new WeakMap();
let gndNodeCounter = 0;
// Rebuilt alongside gndNodeIds: an O(1) index from decoded locator to node,
// so findGndNodeForLocate() avoids re-walking the whole tree every utterance.
let gndNodeByLocateKey = new Map();
let wordHighlightAvailable = true;
let currentSentenceIndex = -1;
let utteranceStyle = DecorationStyleType.Highlight;
let utteranceTint = "#ffeb3b";
let wordStyle = DecorationStyleType.Underline;
let wordTint = "#e53935";
let lastWordHighlight = null; // { cssSelector, word, before, after } — reapplied when word style/color changes mid-utterance
let mobilePanel = null; // "gnd" | "utterances" | "settings" | null — which split is open in the mobile bottom bar
let gnd = null;
let showTextrefs = false;

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

    // The GND/Utterances panel starts collapsed on both mobile and desktop;
    // the Settings panel is unaffected and stays open on desktop.
    if (mobileMediaQuery.matches) {
      setMobilePanel(null);
    } else {
      setPanelCollapsed(true, false);
    }

    // Reset needed in both directions when crossing the breakpoint.
    mobileMediaQuery.addEventListener("change", (e) => {
      if (e.matches) {
        setMobilePanel(null);
      } else {
        resetDesktopLayout();
      }
    });

    await populateVoiceSelect();

    currentVoice = await voiceManager.getDefaultVoice("en", enVoices);
    if (currentVoice) {
      navigator.setVoice(currentVoice);
      const option = voiceSelect.querySelector(`option[data-voice-uri="${currentVoice.voiceURI}"]`);
      if (option) option.selected = true;
    }
    updateWordHighlightAvailability();

    await initializeContent();

    // "block-level" (the default) ignores inline lang spans — only "always"
    // splits an utterance on them, which the French <span lang="fr"> relies on.
    // Submitted after initializeContent() so the navigator already has a
    // source to re-extract from.
    const languageEditor = navigator.preferencesEditor;
    languageEditor.language.value = "always";
    await navigator.submitPreferences(languageEditor.preferences);
  } catch (error) {
    console.error("Initialization error:", error);
  }
}

function setReadAlongDependentsDisabled(disabled) {
  if (readAlongGroup) readAlongGroup.disabled = disabled;
  if (autoScrollCheckbox) autoScrollCheckbox.disabled = disabled;
  if (decorateSyntheticCheckbox) decorateSyntheticCheckbox.disabled = disabled;
  if (syncPanelsCheckbox) syncPanelsCheckbox.disabled = disabled;
}

function setupEventListeners() {
  navigator.on("start", () => {
    isPlaying = true;
    if (readAlongEnabled) enterUtterance(navigator.getCurrentUtteranceIndex());
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
    // navigator.getState() can still read "loading" here for engines that buffer
    // asynchronously, so whether a highlight was active is judged from the
    // pre-reextract index rather than the (possibly stale) state.
    const hadActiveHighlight = readAlongEnabled && currentSentenceIndex !== -1;
    currentSentenceIndex = -1;
    if (hadActiveHighlight) {
      enterUtterance(navigator.getCurrentUtteranceIndex());
    }
    updateUI();
  });

  if (playPauseBtn) playPauseBtn.addEventListener("click", togglePlayback);
  if (stopBtn) stopBtn.addEventListener("click", stopPlayback);
  if (prevBtn) prevBtn.addEventListener("click", previousUtterance);
  if (nextBtn) nextBtn.addEventListener("click", nextUtterance);
  if (currentUtteranceInput) {
    currentUtteranceInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") handleUtteranceIndexChange(e);
    });
  }

  if (readAlongCheckbox) {
    readAlongCheckbox.checked = readAlongEnabled;
    setReadAlongDependentsDisabled(!readAlongEnabled);
    readAlongCheckbox.addEventListener("change", handleReadAlongChange);
  }

  if (autoScrollCheckbox) {
    autoScrollCheckbox.checked = autoScrollEnabled;
    autoScrollCheckbox.addEventListener("change", (e) => { autoScrollEnabled = e.target.checked; });
  }

  if (decorateSyntheticCheckbox) {
    decorateSyntheticCheckbox.checked = decorateSyntheticEnabled;
    decorateSyntheticCheckbox.addEventListener("change", (e) => {
      decorateSyntheticEnabled = e.target.checked;
      applyUtteranceDecoration();
    });
  }

  if (syncPanelsCheckbox) {
    syncPanelsCheckbox.checked = syncPanelsEnabled;
    updateSyncPanelsClass();
    syncPanelsCheckbox.addEventListener("change", (e) => {
      syncPanelsEnabled = e.target.checked;
      updateSyncPanelsClass();
      if (syncPanelsEnabled && currentSentenceIndex !== -1) syncPanelsToCurrentUtterance(currentSentenceIndex, "auto");
    });
  }

  if (voiceSelect) voiceSelect.addEventListener("change", handleVoiceChange);
  if (verbositySelect) verbositySelect.addEventListener("change", handleVerbosityChange);
  if (speedInput) speedInput.addEventListener("input", handleSpeedChange);
  if (showTextrefsCheckbox) showTextrefsCheckbox.addEventListener("change", handleShowTextrefsChange);

  if (utteranceStyleSelect) utteranceStyleSelect.addEventListener("change", (e) => { utteranceStyle = e.target.value; applyUtteranceDecoration(); });
  if (utteranceColorInput) utteranceColorInput.addEventListener("input", (e) => { utteranceTint = e.target.value; applyUtteranceDecoration(); });
  if (wordStyleSelect) wordStyleSelect.addEventListener("change", (e) => { wordStyle = e.target.value; applyWordDecoration(); });
  if (wordColorInput) wordColorInput.addEventListener("input", (e) => { wordTint = e.target.value; applyWordDecoration(); });

  tabGnd.addEventListener("click", () => selectTab("gnd"));
  tabUtterances.addEventListener("click", () => selectTab("utterances"));
  tabGnd.addEventListener("keydown", handleTabKeydown);
  tabUtterances.addEventListener("keydown", handleTabKeydown);

  if (panelToggle) panelToggle.addEventListener("click", () => setPanelCollapsed(true));
  if (panelShow) panelShow.addEventListener("click", (e) => setPanelCollapsed(false, isKeyboardActivation(e)));
  panelAside.addEventListener("keydown", (e) => {
    if (e.key !== "Escape" || panelAside.classList.contains("collapsed")) return;
    // setMobilePanel also marks .controls inert — only reversible via its own mobile tab.
    if (mobileMediaQuery.matches) {
      setMobilePanel(null);
    } else {
      setPanelCollapsed(true);
    }
  });

  if (mtabGnd) mtabGnd.addEventListener("click", (e) => handleMobileTabClick("gnd", isKeyboardActivation(e)));
  if (mtabUtterances) mtabUtterances.addEventListener("click", (e) => handleMobileTabClick("utterances", isKeyboardActivation(e)));
  if (mtabSettings) mtabSettings.addEventListener("click", (e) => handleMobileTabClick("settings", isKeyboardActivation(e)));
  if (mtabClose) mtabClose.addEventListener("click", () => setMobilePanel(null));

  if (controlsToggle) controlsToggle.addEventListener("click", () => setControlsCollapsed(true));
  if (controlsShow) controlsShow.addEventListener("click", (e) => setControlsCollapsed(false, isKeyboardActivation(e)));
  controlsEl.addEventListener("keydown", (e) => {
    if (e.key !== "Escape" || controlsEl.classList.contains("collapsed")) return;
    if (mobileMediaQuery.matches) {
      setMobilePanel(null);
    } else {
      setControlsCollapsed(true);
    }
  });
}

// A click fired by Enter/Space on a button has detail === 0; a mouse click doesn't.
function isKeyboardActivation(e) {
  return e.detail === 0;
}

// inert keeps a visually collapsed panel out of the tab order/AT tree.
function setPanelCollapsed(collapsed, moveFocus = true) {
  panelAside.classList.toggle("collapsed", collapsed);
  panelAside.inert = collapsed;
  panelToggle.setAttribute("aria-expanded", String(!collapsed));
  panelShow.setAttribute("aria-expanded", String(!collapsed));
  panelShow.hidden = !collapsed;
  if (collapsed) {
    if (moveFocus) panelShow.focus();
  } else if (moveFocus) {
    (tabGnd.getAttribute("aria-selected") === "true" ? tabGnd : tabUtterances).focus();
  }

  // .panel's width is still mid-transition here — scrolling now would use
  // its near-zero in-progress geometry, so wait for the reveal to finish.
  if (!collapsed) resyncPanelsAfterReveal();
}

function resyncPanelsAfterReveal() {
  if (!syncPanelsEnabled || currentSentenceIndex === -1) return;
  const run = () => syncPanelsToCurrentUtterance(currentSentenceIndex, "auto");

  // Mobile resizes .panel via flex-basis, not the width it declares a
  // transition for, so no transitionend would ever fire there.
  if (mobileMediaQuery.matches) {
    requestAnimationFrame(run);
    return;
  }

  panelAside.addEventListener("transitionend", function onEnd(e) {
    if (e.target !== panelAside) return;
    panelAside.removeEventListener("transitionend", onEnd);
    run();
  });
}

// Desktop-only collapse for the Settings column — mirrors setPanelCollapsed,
// giving the article back the width Settings was using. On mobile this is
// superseded by the bottom-bar Settings tab (see setMobilePanel).
function setControlsCollapsed(collapsed, moveFocus = true) {
  controlsEl.classList.toggle("collapsed", collapsed);
  controlsEl.inert = collapsed;
  controlsToggle.setAttribute("aria-expanded", String(!collapsed));
  controlsShow.setAttribute("aria-expanded", String(!collapsed));
  controlsShow.hidden = !collapsed;
  if (collapsed) {
    controlsShow.focus();
  } else if (moveFocus && voiceSelect) {
    voiceSelect.focus();
  }
}

// Drives the mobile bottom bar's GND/Utterances/Settings tabs. Only one
// split is ever open: opening GND/Utterances expands .panel (and picks the
// right internal tab) while closing .controls' split, and vice versa for
// Settings — the article (.reader) always keeps the rest of the screen,
// it's never fully replaced.
function handleMobileTabClick(panel, moveFocus = true) {
  setMobilePanel(mobilePanel === panel ? null : panel, moveFocus);
}

function setMobilePanel(panel, moveFocus = true) {
  mobilePanel = panel;

  // selectTab runs first so setPanelCollapsed(false) below focuses the
  // tab the user actually asked for, not whichever was selected before.
  const showGndPanel = panel === "gnd" || panel === "utterances";
  if (showGndPanel) selectTab(panel);
  setPanelCollapsed(!showGndPanel, moveFocus);

  if (controlsEl) {
    const showSettings = panel === "settings";
    controlsEl.classList.toggle("mobile-open", showSettings);
    controlsEl.classList.remove("collapsed");
    controlsEl.inert = !showSettings;
    if (showSettings && moveFocus && voiceSelect) voiceSelect.focus();
  }

  updateMobileTabsUI();
}

// Counterpart to setMobilePanel(null) for resizing back past the breakpoint.
function resetDesktopLayout() {
  mobilePanel = null;
  setPanelCollapsed(true, false);
  if (controlsEl) {
    controlsEl.classList.remove("mobile-open");
    setControlsCollapsed(false, false);
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

  // Skip while collapsed — the reveal in setPanelCollapsed() resyncs once dimensions are real.
  if (syncPanelsEnabled && currentSentenceIndex !== -1 && !panelAside.classList.contains("collapsed")) {
    syncPanelsToCurrentUtterance(currentSentenceIndex, "auto");
  }
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

async function handleVerbosityChange(e) {
  if (!navigator) return;
  const editor = navigator.preferencesEditor;
  editor.verbosity.value = e.target.value;
  await navigator.submitPreferences(editor.preferences);
}

async function handleSpeedChange(e) {
  if (!navigator) return;
  const rate = parseFloat(e.target.value);
  const editor = navigator.preferencesEditor;
  editor.rate.value = rate;
  await navigator.submitPreferences(editor.preferences);
  if (speedValue) speedValue.textContent = `${rate.toFixed(1)}x`;
}

function handleShowTextrefsChange(e) {
  showTextrefs = e.target.checked;
  renderGndOutput();
  // renderGndOutput() just rebuilt every .gnd-node span, losing the
  // .current marker set by an earlier syncPanelsToCurrentUtterance() call.
  if (syncPanelsEnabled && currentSentenceIndex !== -1) syncPanelsToCurrentUtterance(currentSentenceIndex, "auto");
}

function handleReadAlongChange(e) {
  readAlongEnabled = e.target.checked;
  setReadAlongDependentsDisabled(!readAlongEnabled);
  if (!readAlongEnabled) {
    clearWordHighlighting();
    // clearWordHighlighting() resets currentSentenceIndex but leaves the
    // panels' .current marker and dimming in place, showing a stale item.
    setCurrentPanelItem(gndOutput, null);
    setCurrentPanelItem(utterancesOutput, null);
  } else if (navigator && navigator.getState() !== "idle") {
    // Re-entering here (rather than waiting for the next "start"/"resume")
    // covers voices without boundary events, where nothing else would
    // re-trigger the highlight before the next utterance.
    enterUtterance(navigator.getCurrentUtteranceIndex());
  }
  updateSyncPanelsClass();
}

// Word-level boundary events aren't reliable for voices with
// offlineAvailability === false, so only word highlighting (not read along
// as a whole, i.e. sentence highlighting keeps working) is disabled for them.
function updateWordHighlightAvailability() {
  const unavailable = !!currentVoice && currentVoice.offlineAvailability === false;
  wordHighlightAvailable = !unavailable;

  if (wordStyleSelect) wordStyleSelect.disabled = unavailable;
  if (wordColorInput) wordColorInput.disabled = unavailable;
  if (wordHighlightUnavailable) wordHighlightUnavailable.hidden = !unavailable;

  if (!wordHighlightAvailable) clearWordDecoration();
}

// Parses the live, rendered article DOM into a Guided Navigation document
// (with domRange textrefs — only possible against a rendered element, not a
// detached HTML string) and loads it into the navigator, which re-extracts
// utterances internally whenever verbosity/preferences change.
async function initializeContent() {
  gnd = parseMarkup(content, undefined, { textrefs: { roles: true, domRange: true } });
  renderGndOutput();
  await navigator.loadGndContent(gnd);
}

function escapeHtml(s) {
  return s.replace(/[&<>]/g, (c) => (c === "&" ? "&amp;" : c === "<" ? "&lt;" : "&gt;"));
}

function jsonPrimitive(value) {
  return escapeHtml(JSON.stringify(value));
}

// Hand-written JSON.stringify(value, undefined, 2) equivalent, so values can
// be wrapped in scroll-anchor spans as they render — see renderGndNode().
function renderJsonValue(value, depth, keyFilter) {
  if (value === null || typeof value !== "object") return jsonPrimitive(value);
  const pad = "  ".repeat(depth);
  const padIn = "  ".repeat(depth + 1);
  if (Array.isArray(value)) {
    if (!value.length) return "[]";
    const items = value.map((item) => padIn + renderJsonValue(item, depth + 1, keyFilter));
    return "[\n" + items.join(",\n") + "\n" + pad + "]";
  }
  const keys = Object.keys(value).filter(keyFilter);
  if (!keys.length) return "{}";
  const lines = keys.map((k) => padIn + jsonPrimitive(k) + ": " + renderJsonValue(value[k], depth + 1, keyFilter));
  return "{\n" + lines.join(",\n") + "\n" + pad + "}";
}

// Wraps every GND node (root entries and each `children` entry) in a span
// with a stable id in gndNodeIds, so playback can later scroll to it.
function renderGndNode(node, depth, keyFilter) {
  const pad = "  ".repeat(depth);
  const padIn = "  ".repeat(depth + 1);
  const keys = Object.keys(node).filter(keyFilter);
  const body = !keys.length
    ? "{}"
    : "{\n" +
      keys
        .map((k) => {
          const value = node[k];
          const rendered =
            k === "children" && Array.isArray(value)
              ? renderGndNodeArray(value, depth + 1, keyFilter)
              : renderJsonValue(value, depth + 1, keyFilter);
          return padIn + jsonPrimitive(k) + ": " + rendered;
        })
        .join(",\n") +
      "\n" +
      pad +
      "}";
  const id = gndNodeCounter++;
  gndNodeIds.set(node, id);
  const ref = decodeTextref(node);
  if (ref) gndNodeByLocateKey.set(JSON.stringify(ref), node);
  return `<span class="gnd-node" data-gnd-node="${id}">${body}</span>`;
}

function renderGndNodeArray(nodes, depth, keyFilter) {
  if (!nodes.length) return "[]";
  const pad = "  ".repeat(depth);
  const padIn = "  ".repeat(depth + 1);
  const items = nodes.map((n) => padIn + renderGndNode(n, depth + 1, keyFilter));
  return "[\n" + items.join(",\n") + "\n" + pad + "]";
}

function renderGndOutput() {
  if (!gnd) {
    gndOutput.textContent = "null";
    return;
  }
  gndNodeIds = new WeakMap();
  gndNodeCounter = 0;
  gndNodeByLocateKey = new Map();
  const keyFilter = (k) => showTextrefs || k !== "textref";
  gndOutput.innerHTML = renderGndNodeArray(gnd, 0, keyFilter);
}

function renderUtterancesPanel() {
  if (!utterances.length) {
    utterancesOutput.textContent = "[]";
    return;
  }
  // `locate` (cssSelector/domRange) is still used for highlighting — just
  // omitted here since it dwarfs the rest of the JSON.
  const keyFilter = (k) => k !== "locate";
  const items = utterances.map(
    (u, i) => `  <span class="utterance-item" data-utterance-index="${i}">${renderJsonValue(u, 1, keyFilter)}</span>`,
  );
  utterancesOutput.innerHTML = "[\n" + items.join(",\n") + "\n]";
}

// O(1) lookup into the index renderGndNode() built — same resolution
// attachLocate() uses internally (own textref, else nearest ancestor's).
function findGndNodeForLocate(locate) {
  return locate ? gndNodeByLocateKey.get(JSON.stringify(locate)) : undefined;
}

// Downgrades to an instant jump when the user has asked for reduced motion.
function resolveScrollBehavior(behavior) {
  return prefersReducedMotion.matches ? "auto" : behavior;
}

function scrollWithinContainerIfNeeded(el, container, behavior = "smooth") {
  if (!el || !container) return;

  // Read the sticky .panel-option's actual height rather than assuming one.
  const stickyOption = container.querySelector(".panel-option");
  const stickyHeight = stickyOption ? stickyOption.getBoundingClientRect().height : 0;
  container.style.scrollPaddingTop = `${stickyHeight}px`;

  const elRect = el.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  const inView = elRect.top >= containerRect.top + stickyHeight && elRect.bottom <= containerRect.bottom;
  if (!inView) el.scrollIntoView({ behavior: resolveScrollBehavior(behavior), block: "start" });
}

// Moves the "current" marker (read by the sync-dim CSS) regardless of panel
// visibility, so a hidden panel is already correct once the user switches to it.
function setCurrentPanelItem(container, selector) {
  const previous = container.querySelector(".current");
  if (previous) previous.classList.remove("current");
  const el = selector ? container.querySelector(selector) : null;
  if (el) el.classList.add("current");
  return el;
}

function updateSyncPanelsClass() {
  const active = syncPanelsEnabled && readAlongEnabled;
  panelGnd.classList.toggle("sync-dim", active);
  panelUtterances.classList.toggle("sync-dim", active);
}

function syncPanelsToCurrentUtterance(index, behavior = "smooth") {
  const utterance = utterances[index];
  if (!utterance) return;

  const utteranceItem = setCurrentPanelItem(utterancesOutput, `[data-utterance-index="${index}"]`);
  if (!panelUtterances.hidden) scrollWithinContainerIfNeeded(utteranceItem, panelUtterances, behavior);

  const node = findGndNodeForLocate(utterance.locate);
  const id = node ? gndNodeIds.get(node) : undefined;
  const gndNodeItem = setCurrentPanelItem(gndOutput, id !== undefined ? `[data-gnd-node="${id}"]` : null);
  if (!panelGnd.hidden) scrollWithinContainerIfNeeded(gndNodeItem, panelGnd, behavior);
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

function handleUtteranceIndexChange(e) {
  if (!navigator) return;
  const total = utterances.length;
  const requested = parseInt(e.target.value, 10);
  const clamped = Math.min(Math.max(Number.isNaN(requested) ? 1 : requested, 1), Math.max(total, 1));
  navigator.jumpTo(clamped - 1);
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
  updateWordHighlightAvailability();

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
  clearWordDecoration();
  currentSentenceIndex = -1;
}

function clearWordDecoration() {
  decoCtrl.applyDecorations([], "tts-word");
  lastWordHighlight = null;
}

// Reapplies the current utterance/word decorations using the live
// utteranceStyle/utteranceTint (resp. wordStyle/wordTint), so a style/color
// change is reflected immediately instead of waiting for the next boundary.
function applyUtteranceDecoration() {
  if (currentSentenceIndex === -1) return;
  const currentUtterance = utterances[currentSentenceIndex];
  if (!currentUtterance || !currentUtterance.locate) return;

  if (currentUtterance.synthetic && !decorateSyntheticEnabled) {
    decoCtrl.applyDecorations([], "tts-sentence");
    return;
  }

  decoCtrl.applyDecorations([{
    id: "tts-sentence",
    locator: createLocator(currentUtterance.locate),
    style: { type: utteranceStyle, tint: utteranceTint, enforceContrast: false, layout: DecorationLayout.Bounds },
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

// Moves the sentence-level highlight (and viewport scroll) onto `index`'s
// utterance, if it isn't already there — called both from "start" (so the
// highlight tracks playback even when a voice never fires word "boundary"
// events, e.g. across a language switch) and from highlightCurrentWord().
function enterUtterance(index) {
  if (index === currentSentenceIndex) return;
  const currentUtterance = utterances[index];
  if (!currentUtterance || !currentUtterance.locate) return;

  currentSentenceIndex = index;
  applyUtteranceDecoration();

  if (currentUtterance.synthetic) {
    // A synthesized label/announcement (contextualization text, alt/caption
    // description...): no word-boundary search should run against it, and
    // no earlier word highlight is going to be refined further.
    lastWordHighlight = null;
    decoCtrl.applyDecorations([], "tts-word");
  }

  const target = currentUtterance.locate.cssSelector
    ? document.querySelector(currentUtterance.locate.cssSelector)
    : null;
  if (target && autoScrollEnabled) {
    const rect = target.getBoundingClientRect();
    const inView = rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
    if (!inView) target.scrollIntoView({ behavior: resolveScrollBehavior("smooth"), block: "center" });
  }

  if (syncPanelsEnabled) syncPanelsToCurrentUtterance(index);
}

// Highlights the word currently being spoken using each utterance's own
// locator (derived from the live DOM at parse time, see initializeContent)
// rather than searching article text for a match — the same word/phrase can
// legitimately appear more than once across the article, so anchoring by
// locator (scoped to the utterance's own DOM location) is what keeps the
// highlight on the right occurrence.
function highlightCurrentWord(charIndex, charLength) {
  if (!readAlongEnabled) return;

  const currentIndex = navigator.getCurrentUtteranceIndex();
  const currentUtterance = utterances[currentIndex];
  if (!currentUtterance || !currentUtterance.locate) return;

  enterUtterance(currentIndex);
  if (currentUtterance.synthetic || !wordHighlightAvailable) return;

  const word = currentUtterance.plain?.substring(charIndex, charIndex + charLength);
  if (!word || !word.trim()) return;

  const before = currentUtterance.plain.substring(0, charIndex);
  const after = currentUtterance.plain.substring(charIndex + charLength);

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

  // Write only on change, and never while the user is mid-edit — .player-status
  // is a live region, don't re-announce every word or fight the user's typing.
  if (currentUtteranceInput) {
    currentUtteranceInput.disabled = !currentVoice || !hasContent;
    currentUtteranceInput.max = String(Math.max(total, 1));
    const label = String(currentIndex + 1);
    if (document.activeElement !== currentUtteranceInput && currentUtteranceInput.value !== label) {
      currentUtteranceInput.value = label;
    }
  }
  if (totalUtterancesSpan) totalUtterancesSpan.textContent = total;
}

initialize().catch(console.error);
