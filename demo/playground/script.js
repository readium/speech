const filterInput = document.getElementById("filter-input");
const fixtureListEl = document.getElementById("fixture-list");
const fixtureMetaEl = document.getElementById("fixture-meta");
const inputHtmlEl = document.getElementById("input-html");
const gndExpectedEl = document.getElementById("gnd-expected");
const gndActualEl = document.getElementById("gnd-actual");
const gndBadgeEl = document.getElementById("gnd-badge");
const utterancesExpectedEl = document.getElementById("utterances-expected");
const utterancesActualEl = document.getElementById("utterances-actual");
const utterancesBadgeEl = document.getElementById("utterances-badge");
const optionSkipEl = document.getElementById("option-skip");
const optionLanguageEl = document.getElementById("option-language");
const optionInterruptEl = document.getElementById("option-interrupt");
const optionContextualizeEl = document.getElementById("option-contextualize");
const formatRadios = [...document.querySelectorAll('input[name="format"]')];
const speechBadgeEl = document.getElementById("speech-badge");
const speechUtterancesEl = document.getElementById("speech-utterances");
const speechPlayEl = document.getElementById("speech-play");
const speechPauseEl = document.getElementById("speech-pause");
const speechResumeEl = document.getElementById("speech-resume");
const speechStopEl = document.getElementById("speech-stop");

// Feature-detect the GND converter, the utterance extractor, and the
// WebSpeech read-aloud navigator, if/when @readium/speech exports them.
let converter = null;
let utteranceExtractor = null;
let NavigatorClass = null;
let VoiceManagerClass = null;
let setupDecorations = null;
let DecorationStyleType = null;
try {
  const mod = await import("../../build/index.js");
  if (typeof mod.parseMarkup === "function") {
    converter = mod;
  }
  if (typeof mod.extractUtterances === "function") {
    utteranceExtractor = mod;
  }
  if (typeof mod.WebSpeechReadAloudNavigator === "function") {
    NavigatorClass = mod.WebSpeechReadAloudNavigator;
  }
  if (typeof mod.WebSpeechVoiceManager === "function") {
    VoiceManagerClass = mod.WebSpeechVoiceManager;
  }
  if (typeof mod.setupDecorations === "function" && mod.DecorationStyleType) {
    setupDecorations = mod.setupDecorations;
    DecorationStyleType = mod.DecorationStyleType;
  }
  if (Array.isArray(mod.skippableRoles)) {
    for (const role of mod.skippableRoles) {
      const option = document.createElement("option");
      option.value = role;
      option.textContent = role;
      optionSkipEl.appendChild(option);
    }
    optionSkipEl.addEventListener("change", () => renderUtterances());
  }
} catch (err) {
  // build/index.js may not exist yet (run `npm run build`) or may not
  // export these yet; logged rather than silently swallowed so a real
  // failure here doesn't just look like an empty options list.
  console.error("Failed to load @readium/speech build/index.js:", err);
}

// The full extraction options currently selected in the toolbar, `format`
// included alongside the rest — mirrors exactly how fixtures/*/
// utterances.json's `cases[].options` are shaped, so it can be compared
// against them directly (see `matchingExpected`).
function currentOptions() {
  const options = { format: currentFormat() };
  const skip = optionSkipEl
    ? [...optionSkipEl.selectedOptions].map((option) => option.value)
    : [];
  if (skip.length > 0) options.skip = skip;
  if (optionLanguageEl?.value) options.language = optionLanguageEl.value;
  if (optionInterruptEl?.checked) options.interruptSentence = true;
  if (optionContextualizeEl && !optionContextualizeEl.checked) options.contextualize = false;
  return options;
}

function currentFormat() {
  return formatRadios.find((r) => r.checked)?.value ?? "plain";
}

// Finds the fixture's expected output for the exact combination of options
// currently selected: the `cases` entry whose `options` deep-equals the
// selection. Returns `undefined` when this fixture doesn't illustrate that
// combination.
function matchingExpected(utterances, options) {
  const kase = (utterances.cases ?? []).find((c) => deepEqual(c.options, options));
  return kase?.utterances;
}

const manifest = await fetch("../../fixtures/manifest.json").then((r) => r.json());
manifest.sort((a, b) => a.role.localeCompare(b.role) || a.description.localeCompare(b.description));

let selectedId = null;

// Matches against what's actually shown to the user (role, description) —
// not the roles.md-internal "tier"/"pathway" bookkeeping, which isn't (and
// shouldn't be) displayed as a navigable concept anywhere in this UI.
function matchesFilter(fixture, filter) {
  return [fixture.role, fixture.description].join(" ").toLowerCase().includes(filter);
}

function renderList() {
  const filter = filterInput.value.trim().toLowerCase();
  const filtering = filter.length > 0;
  const filtered = filtering ? manifest.filter((f) => matchesFilter(f, filter)) : manifest;

  fixtureListEl.innerHTML = "";

  if (filtered.length === 0) {
    const empty = document.createElement("div");
    empty.className = "no-results";
    empty.textContent = "No samples match.";
    fixtureListEl.appendChild(empty);
    return;
  }

  const byRole = new Map();
  for (const fixture of filtered) {
    if (!byRole.has(fixture.role)) byRole.set(fixture.role, []);
    byRole.get(fixture.role).push(fixture);
  }

  let firstGroup = true;
  for (const [role, fixtures] of byRole) {
    const details = document.createElement("details");
    details.className = "role-group";
    // While filtering, force every matching group open so results are never
    // hidden inside a collapsed section. Otherwise, only the first group
    // (or the one containing the currently selected fixture) starts open.
    details.open = filtering || firstGroup || fixtures.some((f) => f.id === selectedId);
    firstGroup = false;

    const summary = document.createElement("summary");
    summary.textContent = role;
    details.appendChild(summary);

    const ul = document.createElement("ul");
    for (const fixture of fixtures) {
      const li = document.createElement("li");
      li.dataset.id = fixture.id;
      li.className = fixture.id === selectedId ? "active" : "";
      li.textContent = fixture.description;
      li.addEventListener("click", () => selectFixture(fixture.id));
      ul.appendChild(li);
    }
    details.appendChild(ul);
    fixtureListEl.appendChild(details);
  }

  if (!selectedId && filtered.length > 0) selectFixture(filtered[0].id);
}

function deepEqual(a, b) {
  return JSON.stringify(sortKeysDeep(a)) === JSON.stringify(sortKeysDeep(b));
}

function sortKeysDeep(value) {
  if (Array.isArray(value)) return value.map(sortKeysDeep);
  if (value && typeof value === "object") {
    return Object.keys(value)
      .sort()
      .reduce((acc, key) => {
        acc[key] = sortKeysDeep(value[key]);
        return acc;
      }, {});
  }
  return value;
}

// Property order per object.schema.json, for display only — fixtures are
// hand-authored and don't consistently follow it, and JSON key order carries
// no semantic meaning, but showing both panes in the schema's own order keeps
// the visual diff free of that noise.
const SCHEMA_KEY_ORDER = [
  "id",
  "audioref",
  "imgref",
  "textref",
  "videoref",
  "text",
  "role",
  "children",
  "description",
];

function withSchemaKeyOrder(value) {
  if (Array.isArray(value)) return value.map(withSchemaKeyOrder);
  if (value && typeof value === "object") {
    const ordered = {};
    for (const key of SCHEMA_KEY_ORDER) {
      if (key in value) ordered[key] = withSchemaKeyOrder(value[key]);
    }
    for (const key of Object.keys(value)) {
      if (!(key in ordered)) ordered[key] = withSchemaKeyOrder(value[key]);
    }
    return ordered;
  }
  return value;
}

// gnd.json stores a single fixture's expected top-level item(s) directly —
// a bare object for one item, or a role-less/id-less `{children: [...]}` for
// several siblings — while `parseMarkup()` always returns an array. This maps
// the stored file format onto that array shape for comparison.
function expectedTopLevel(gnd) {
  if (gnd && typeof gnd === "object" && !Array.isArray(gnd)) {
    const keys = Object.keys(gnd);
    if (keys.length === 1 && keys[0] === "children") return gnd.children;
  }
  return [gnd];
}

// Inverse of expectedTopLevel: reshapes parseMarkup()'s array output into
// the same bare-object/`{children}` convention gnd.json is stored in, so
// the "actual" pane displays in the fixture's own reference shape.
function toStoredShape(items) {
  return items.length === 1 ? items[0] : { children: items };
}

// Utterances without a `plain` variant only carry `ssml` (e.g. an inline
// `<lang xml:lang="...">` shift) — strip its tags for display/highlighting
// purposes so the preview shows spoken text, not raw markup.
function utteranceDisplayText(utterance) {
  if (utterance?.plain) return utterance.plain;
  if (!utterance?.ssml) return undefined;
  return utterance.ssml
    .replace(/<[^>]+>/g, "")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function setBadge(el, state) {
  el.textContent =
    state === "pass" ? "pass" : state === "fail" ? "fail" : state === "none" ? "no expected data for this combination" : "not implemented yet";
  el.className = `badge ${state}`;
}

// Cached across options-toolbar changes, so toggling an option re-runs
// extraction without refetching the fixture's files.
let currentFixture = null;

// WebSpeechReadAloudNavigator wraps the playback engine and handles
// advancing through the queued utterances on its own — created once, lazily
// (its constructor kicks off async engine/voice initialization), not per
// fixture/option change.
let playbackNavigator = null;

// Lazily created, same rationale as playbackNavigator: mounting the Decorator
// kicks off its own setup, so it's only done once actual playback happens.
let decorationController = null;

function ensureDecorationController() {
  if (!setupDecorations) return null;
  if (!decorationController) decorationController = setupDecorations();
  return decorationController;
}

function clearWordHighlight() {
  decorationController?.applyDecorations([], "playground-word");
}

// Highlights the word currently being spoken by searching for it (with
// surrounding context) in the utterance text — the same text rendered into
// the <li> in #speech-utterances, so the Decorator finds it there.
function highlightWordBoundary(event) {
  if (event.detail?.name !== "word") return;
  const ctrl = ensureDecorationController();
  if (!ctrl) return;

  const index = playbackNavigator.getCurrentUtteranceIndex();
  const utterance = currentSpeechUtterances[index];
  const text = utteranceDisplayText(utterance);
  if (!text) return;

  const { charIndex, charLength } = event.detail;
  const word = text.substring(charIndex, charIndex + charLength);
  if (!word.trim()) return;

  ctrl.decorate([{
    id: "playground-word",
    style: { type: DecorationStyleType.Highlight, tint: "#ffeb3b", enforceContrast: false },
    selector: "#speech-utterances",
    highlight: word,
    before: text.substring(0, charIndex),
    after: text.substring(charIndex + charLength),
  }], "playground-word");
}

// Fixtures are all English text, so playback defaults to an English voice —
// otherwise the engine falls back to the browser's own language preference,
// which may pick a non-English voice/lang that mispronounces the fixture and
// can fail to fire "word" boundary events at all. Chrome additionally only
// fires "word" boundary events for offline (local) voices — its network
// voices silently drop them — so on Chrome only, an offline voice is
// preferred, falling back to any English voice if none is installed. Other
// browsers (e.g. Edge) keep their best voices network-only, so restricting to
// offline there would throw away the highest-quality ones for no benefit.
async function setupDefaultVoice(navigator) {
  if (!VoiceManagerClass) return;
  try {
    const voiceManager = await VoiceManagerClass.initialize({ languages: ["en-US"] });
    const ua = window.navigator.userAgent;
    const isChrome = /Chrome/.test(ua) && !/Edg|OPR|Brave/.test(ua);
    const offlineVoices = isChrome
      ? await voiceManager.getVoices({ languages: "en-US", offlineOnly: true, removeDuplicates: true })
      : [];
    const voices = offlineVoices.length > 0
      ? offlineVoices
      : await voiceManager.getVoices({ languages: "en-US", removeDuplicates: true });
    const voice = await voiceManager.getDefaultVoice("en-US", voices);
    if (voice) navigator.setVoice(voice);
  } catch (err) {
    console.error("Failed to set up an English voice for playback:", err);
  }
}

// Resolves once the default voice has been set, so Play can await it before
// speaking — set once, alongside the navigator, in ensurePlaybackNavigator.
let voiceReadyPromise = null;

function ensurePlaybackNavigator() {
  if (!NavigatorClass) return null;
  if (!playbackNavigator) {
    playbackNavigator = new NavigatorClass();
    playbackNavigator.setSpeakInContentLanguage(true);
    for (const type of ["start", "pause", "resume", "end", "stop", "ready", "error"]) {
      playbackNavigator.on(type, syncSpeechUi);
    }
    playbackNavigator.on("boundary", highlightWordBoundary);
    playbackNavigator.on("end", clearWordHighlight);
    playbackNavigator.on("stop", clearWordHighlight);
    voiceReadyPromise = setupDefaultVoice(playbackNavigator);
  }
  return playbackNavigator;
}

function setSpeechBadge(state) {
  speechBadgeEl.textContent = state;
  speechBadgeEl.className = `badge ${state}`;
}

let speechListItems = [];

function renderSpeechList(utterances) {
  speechUtterancesEl.innerHTML = "";
  speechListItems = utterances.map((utterance) => {
    const li = document.createElement("li");
    li.textContent = utteranceDisplayText(utterance) ?? "(empty)";
    speechUtterancesEl.appendChild(li);
    return li;
  });
}

function syncSpeechUi() {
  const state = playbackNavigator.getState();
  setSpeechBadge(state);
  const speaking = state === "playing" || state === "paused" ? playbackNavigator.getCurrentUtteranceIndex() : -1;
  speechListItems.forEach((li, index) => li.classList.toggle("speaking", index === speaking));
}

// The utterances currently loaded into the speech list, kept in sync with
// the "Actual" pane above so Play always speaks what's on screen.
let currentSpeechUtterances = [];

function renderUtterances() {
  playbackNavigator?.stop();

  if (!currentFixture) return;
  const { gndActual, utterances } = currentFixture;
  const options = currentOptions();
  const expected = matchingExpected(utterances, options);

  utterancesExpectedEl.textContent =
    expected !== undefined ? JSON.stringify(expected, null, 2) : "(none — this sample doesn't illustrate this combination of options)";

  if (!utteranceExtractor || gndActual === undefined) {
    utterancesActualEl.textContent = "";
    setBadge(utterancesBadgeEl, "pending");
    currentSpeechUtterances = [];
    renderSpeechList(currentSpeechUtterances);
    return;
  }

  try {
    const actualUtterances = utteranceExtractor.extractUtterances(gndActual, options);
    utterancesActualEl.textContent = JSON.stringify(actualUtterances, null, 2);
    setBadge(
      utterancesBadgeEl,
      expected === undefined ? "none" : deepEqual(actualUtterances, expected) ? "pass" : "fail",
    );
    currentSpeechUtterances = actualUtterances;
    renderSpeechList(currentSpeechUtterances);
  } catch (err) {
    utterancesActualEl.textContent = String(err);
    setBadge(utterancesBadgeEl, "fail");
    currentSpeechUtterances = [];
    renderSpeechList(currentSpeechUtterances);
  }
}

async function selectFixture(id) {
  selectedId = id;
  for (const li of fixtureListEl.querySelectorAll("li[data-id]")) {
    li.classList.toggle("active", li.dataset.id === id);
  }

  const entry = manifest.find((f) => f.id === id);
  const base = `../../fixtures/${entry.dir}/`;

  const [meta, inputHtml, gnd, utterances] = await Promise.all([
    fetch(base + "meta.json").then((r) => r.json()),
    fetch(base + entry.files.input).then((r) => r.text()),
    fetch(base + entry.files.gnd).then((r) => r.json()),
    fetch(base + entry.files.utterances).then((r) => r.json()),
  ]);

  fixtureMetaEl.replaceChildren();

  const heading = document.createElement("h2");
  heading.textContent = meta.description;
  fixtureMetaEl.appendChild(heading);

  const idLine = document.createElement("p");
  idLine.className = "fixture-id";
  idLine.textContent = meta.id;
  fixtureMetaEl.appendChild(idLine);

  inputHtmlEl.textContent = inputHtml;
  gndExpectedEl.textContent = JSON.stringify(withSchemaKeyOrder(gnd), null, 2);

  let gndActual;
  if (!converter) {
    gndActualEl.textContent = "";
    setBadge(gndBadgeEl, "pending");
  } else {
    try {
      gndActual = converter.parseMarkup(inputHtml);
      gndActualEl.textContent = JSON.stringify(withSchemaKeyOrder(toStoredShape(gndActual)), null, 2);
      setBadge(gndBadgeEl, deepEqual(gndActual, expectedTopLevel(gnd)) ? "pass" : "fail");
    } catch (err) {
      gndActualEl.textContent = String(err);
      setBadge(gndBadgeEl, "fail");
    }
  }

  currentFixture = { gndActual, utterances };
  renderUtterances();
}

filterInput.addEventListener("input", renderList);
for (const radio of formatRadios) radio.addEventListener("change", renderUtterances);
optionLanguageEl?.addEventListener("change", renderUtterances);
optionInterruptEl?.addEventListener("change", renderUtterances);
optionContextualizeEl?.addEventListener("change", renderUtterances);

if (!NavigatorClass) {
  speechBadgeEl.textContent = "not implemented yet";
  speechBadgeEl.className = "badge pending";
} else {
  setSpeechBadge("idle");
}

speechPlayEl.addEventListener("click", async () => {
  if (currentSpeechUtterances.length === 0) return;
  const navigator = ensurePlaybackNavigator();
  if (!navigator) return;
  await voiceReadyPromise;
  navigator.loadContent(currentSpeechUtterances);
  navigator.play();
});
speechPauseEl.addEventListener("click", () => playbackNavigator?.pause());
speechResumeEl.addEventListener("click", () => playbackNavigator?.play());
speechStopEl.addEventListener("click", () => playbackNavigator?.stop());

renderList();
