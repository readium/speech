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
const optionVerbosityEl = document.getElementById("option-verbosity");
const customVerbosityGroupEl = document.getElementById("custom-verbosity-group");
const optionSkipEl = document.getElementById("option-skip");
const optionLanguageEl = document.getElementById("option-language");
const optionInterruptEl = document.getElementById("option-interrupt");
const optionContextualizeEl = document.getElementById("option-contextualize");
const optionPauseDurationEl = document.getElementById("option-pause-duration");
const optionPauseDurationValueEl = document.getElementById("option-pause-duration-value");
const optionPauseScopeEl = document.getElementById("option-pause-scope");
const optionRateEl = document.getElementById("option-rate");
const optionRateValueEl = document.getElementById("option-rate-value");
const optionPitchEl = document.getElementById("option-pitch");
const optionPitchValueEl = document.getElementById("option-pitch-value");
const optionVolumeEl = document.getElementById("option-volume");
const optionVolumeValueEl = document.getElementById("option-volume-value");
const formatGroupEl = document.getElementById("format-group");
const formatHintEl = document.getElementById("format-hint");
const languageHintEl = document.getElementById("language-hint");
const verbosityHintEl = document.getElementById("verbosity-hint");
const inlineContextualizationHintEl = document.getElementById("inline-contextualization-hint");
const pauseDurationHintEl = document.getElementById("pause-duration-hint");
const pauseScopeHintEl = document.getElementById("pause-scope-hint");
const rateHintEl = document.getElementById("rate-hint");
const pitchHintEl = document.getElementById("pitch-hint");
const volumeHintEl = document.getElementById("volume-hint");
const resetPreferencesEl = document.getElementById("reset-preferences");
let formatRadios = [];

// Every RangePreference-backed control, driven generically by key.
const rangeControls = [
  { key: "pauseDuration", inputEl: optionPauseDurationEl, valueEl: optionPauseDurationValueEl, hintEl: pauseDurationHintEl, unit: "ms" },
  { key: "rate", inputEl: optionRateEl, valueEl: optionRateValueEl, hintEl: rateHintEl, unit: "x" },
  { key: "pitch", inputEl: optionPitchEl, valueEl: optionPitchValueEl, hintEl: pitchHintEl, unit: "" },
  { key: "volume", inputEl: optionVolumeEl, valueEl: optionVolumeValueEl, hintEl: volumeHintEl, unit: "" },
];
const speechBadgeEl = document.getElementById("speech-badge");
const speechUtterancesEl = document.getElementById("speech-utterances");
const speechPlayEl = document.getElementById("speech-play");
const speechPauseEl = document.getElementById("speech-pause");
const speechResumeEl = document.getElementById("speech-resume");
const speechStopEl = document.getElementById("speech-stop");

// Feature-detect the GND converter, the utterance extractor, and the
// read-aloud navigator, if/when @readium/speech exports them.
let converter = null;
let utteranceExtractor = null;
let NavigatorClass = null;
let EngineClass = null;
let VoiceManagerClass = null;
let setupDecorations = null;
let DecorationStyleType = null;
let SpeechPreferencesClass = null;
let SpeechDefaultsClass = null;
let SpeechSettingsClass = null;
let SpeechPreferencesEditorClass = null;
let skippableRolesList = null;
let announcementCatalog = null;
try {
  const mod = await import("../../build/index.js");
  if (typeof mod.parseMarkup === "function") {
    converter = mod;
  }
  if (typeof mod.extractUtterances === "function") {
    utteranceExtractor = mod;
  }
  if (typeof mod.ReadiumSpeechNavigator === "function") {
    NavigatorClass = mod.ReadiumSpeechNavigator;
  }
  if (typeof mod.WebSpeechEngine === "function") {
    EngineClass = mod.WebSpeechEngine;
  }
  if (typeof mod.WebSpeechVoiceManager === "function") {
    VoiceManagerClass = mod.WebSpeechVoiceManager;
  }
  if (typeof mod.setupDecorations === "function" && mod.DecorationStyleType) {
    setupDecorations = mod.setupDecorations;
    DecorationStyleType = mod.DecorationStyleType;
  }
  if (typeof mod.SpeechPreferences === "function") {
    SpeechPreferencesClass = mod.SpeechPreferences;
  }
  if (typeof mod.SpeechDefaults === "function") {
    SpeechDefaultsClass = mod.SpeechDefaults;
  }
  if (typeof mod.SpeechSettings === "function") {
    SpeechSettingsClass = mod.SpeechSettings;
  }
  if (typeof mod.SpeechPreferencesEditor === "function") {
    SpeechPreferencesEditorClass = mod.SpeechPreferencesEditor;
  }
  if (Array.isArray(mod.skippableRoles)) {
    skippableRolesList = mod.skippableRoles;
    for (const role of mod.skippableRoles) {
      const option = document.createElement("option");
      option.value = role;
      option.textContent = role;
      optionSkipEl.appendChild(option);
    }
  }
  // Contextualize can only ever say something for a role with a catalog
  // entry — deriving the option list from the catalog itself (rather than
  // e.g. reusing skippableRoles) keeps it exactly in sync with what
  // `contextualize` actually does anything for.
  if (mod.defaultAnnouncements && typeof mod.defaultAnnouncements === "object") {
    announcementCatalog = mod.defaultAnnouncements;
    for (const role of Object.keys(mod.defaultAnnouncements)) {
      const option = document.createElement("option");
      option.value = role;
      option.textContent = role;
      optionContextualizeEl.appendChild(option);
    }
  }
} catch (err) {
  // build/index.js may not exist yet (run `npm run build`) or may not
  // export these yet; logged rather than silently swallowed so a real
  // failure here doesn't just look like an empty options list.
  console.error("Failed to load @readium/speech build/index.js:", err);
}

// Fixed fallback values — unlike `Preference.effectiveValue`, which tracks
// whatever's currently submitted, this never changes.
const libraryDefaults = SpeechDefaultsClass ? new SpeechDefaultsClass() : null;

function currentFormat() {
  return formatRadios.find((r) => r.checked)?.value ?? "plain";
}

// Drives the toolbar — playbackNavigator itself, or (when unavailable) a
// standalone stand-in of the same Configurable shape.
let configurable = null;

// Same shape as ReadiumSpeechNavigator's own submitPreferences/settings/
// preferencesEditor (see speechNavigator.ts's applyPreferences()).
function makeStandaloneConfigurable() {
  let preferences = new SpeechPreferencesClass();
  const defaults = new SpeechDefaultsClass();
  let settings = new SpeechSettingsClass(preferences, defaults);
  return {
    get settings() {
      return settings;
    },
    get preferencesEditor() {
      return new SpeechPreferencesEditorClass(preferences, settings);
    },
    submitPreferences(next) {
      preferences = preferences.merging(next);
      settings = new SpeechSettingsClass(preferences, defaults);
    },
  };
}

// Populates each control's options/range from the editor's Preference
// objects instead of hardcoding them in the HTML. Called once at startup.
function renderToolbarOptions() {
  if (!configurable) return;
  const editor = configurable.preferencesEditor;

  for (const radio of formatGroupEl.querySelectorAll('input[name="format"]')) radio.parentElement.remove();
  for (const value of editor.format.supportedValues) {
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "format";
    input.value = value;
    label.append(input, ` ${value}`);
    formatGroupEl.insertBefore(label, formatHintEl);
  }
  formatRadios = [...formatGroupEl.querySelectorAll('input[name="format"]')];

  populateEnumSelect(optionLanguageEl, editor.language.supportedValues, { includeDefaultOption: true });
  populateEnumSelect(optionVerbosityEl, editor.verbosity.supportedValues);
  populateEnumSelect(optionPauseScopeEl, editor.pauseScope.supportedValues);

  for (const { key, inputEl } of rangeControls) {
    const [min, max] = editor[key].supportedRange;
    inputEl.min = String(min);
    inputEl.max = String(max);
    inputEl.step = String(editor[key].step);
  }
}

function populateEnumSelect(selectEl, values, { includeDefaultOption = false } = {}) {
  selectEl.innerHTML = "";
  if (includeDefaultOption) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "(default)";
    selectEl.appendChild(option);
  }
  for (const value of values) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    selectEl.appendChild(option);
  }
}

// Syncs each control's displayed value and "(default: ...)" label.
function renderToolbarState() {
  if (!configurable) return;
  const editor = configurable.preferencesEditor;

  setDefaultLabel(formatHintEl, libraryDefaults?.format);
  const format = editor.format.value ?? editor.format.effectiveValue;
  for (const radio of formatRadios) radio.checked = radio.value === format;

  setDefaultLabel(languageHintEl, libraryDefaults?.language);
  optionLanguageEl.value = editor.language.value ?? "";

  setDefaultLabel(verbosityHintEl, libraryDefaults?.verbosity);
  optionVerbosityEl.value = editor.verbosity.value ?? editor.verbosity.effectiveValue;
  if (customVerbosityGroupEl) customVerbosityGroupEl.hidden = optionVerbosityEl.value !== "custom";

  setDefaultLabel(inlineContextualizationHintEl, libraryDefaults?.inlineContextualization);
  optionInterruptEl.checked = editor.inlineContextualization.value ?? editor.inlineContextualization.effectiveValue;

  for (const { key, inputEl, valueEl, hintEl, unit } of rangeControls) {
    setDefaultLabel(hintEl, libraryDefaults?.[key]);
    inputEl.value = String(editor[key].value ?? editor[key].effectiveValue);
    valueEl.textContent = `${inputEl.value}${unit}`;
  }

  setDefaultLabel(pauseScopeHintEl, libraryDefaults?.pauseScope);
  optionPauseScopeEl.value = editor.pauseScope.value ?? editor.pauseScope.effectiveValue;
}

function setDefaultLabel(hintEl, defaultValue) {
  hintEl.textContent = defaultValue !== undefined ? `(default: ${defaultValue})` : "";
}

// `skip`/`contextualize` are only meaningful under "custom" — every other
// preset ignores them in favor of its own fixed table (see SpeechSettings).
function applyPreferencesFromToolbar() {
  if (!configurable) return;
  playbackNavigator?.stop();
  const editor = configurable.preferencesEditor;
  editor.format.value = currentFormat();
  editor.inlineContextualization.value = optionInterruptEl?.checked ?? false;
  editor.verbosity.value = optionVerbosityEl?.value || "few";
  editor.language.value = optionLanguageEl?.value || null;
  editor.pauseScope.value = optionPauseScopeEl?.value || "utterance";
  for (const { key, inputEl } of rangeControls) {
    editor[key].value = Number(inputEl.value);
  }
  if (editor.verbosity.value === "custom") {
    editor.skip.value = optionSkipEl ? [...optionSkipEl.selectedOptions].map((o) => o.value) : [];
    editor.contextualize.value = optionContextualizeEl ? [...optionContextualizeEl.selectedOptions].map((o) => o.value) : [];
  }
  configurable.submitPreferences(editor.preferences);
  renderToolbarState();
  renderUtterancesPanel();
}

function resetPreferences() {
  if (!configurable) return;
  playbackNavigator?.stop();
  const editor = configurable.preferencesEditor;
  editor.clear();
  configurable.submitPreferences(editor.preferences);
  renderToolbarState();
  renderUtterancesPanel();
}

// Reuses SpeechSettings' own verbosity resolution instead of reimplementing it.
function currentExtractionOptions() {
  if (!configurable) return { format: currentFormat(), skip: [], contextualize: [] };
  const settings = configurable.settings;
  const options = { format: settings.format, skip: settings.skip, contextualize: settings.contextualize };
  if (settings.inlineContextualization) options.inlineContextualization = true;
  if (settings.language) options.language = settings.language;
  return options;
}

// Same tree walk as scripts/generate-utterances.js's collectRoles(), so the
// bridge below can reconstruct exactly the role set each fixture's cases
// were generated against.
function collectRoles(nodes, acc = new Set()) {
  for (const node of nodes) {
    for (const role of node.role ?? []) acc.add(role);
    if (node.children) collectRoles(node.children, acc);
  }
  return acc;
}

// The bridge between the Preferences API (high-level: verbosity resolves to
// a role *set*, spanning roles a given fixture may not even contain) and
// fixtures/*/utterances.json (low-level: generated with exactly one
// skip role at a time, or one combined "every announcable role in this
// tree" contextualize case — see scripts/generate-utterances.js — never
// several skip roles together, never skip+contextualize combined).
//
// Reducing the resolved skip/contextualize sets down to only the roles this
// fixture's tree actually contains (and, for skip, that are in the curated
// skippableRoles list; for contextualize, that have a catalog entry) turns
// a verbosity-resolved combination into the same shape the generator
// produced — so it can still be matched against a real case whenever it
// reduces to one of those two axes. When it doesn't (e.g. the tree contains
// two skippable roles at once, both resolved on), there genuinely is no
// hand-authored case for that combination — "none" is the honest answer,
// not a bug — this bridge only recovers the cases fixtures actually cover.
function bridgeToFixtureOptions(resolvedOptions, rolesInTree) {
  const skippable = new Set(skippableRolesList ?? []);
  const effectiveSkip = (resolvedOptions.skip ?? []).filter((role) => rolesInTree.has(role) && skippable.has(role));
  const effectiveContextualize = (resolvedOptions.contextualize ?? []).filter(
    (role) => rolesInTree.has(role) && announcementCatalog?.[role] !== undefined,
  );

  const bridged = { ...resolvedOptions };
  delete bridged.skip;
  delete bridged.contextualize;
  if (effectiveSkip.length > 0) bridged.skip = effectiveSkip;
  if (effectiveContextualize.length > 0) bridged.contextualize = effectiveContextualize;
  return bridged;
}

// Finds the fixture's expected output for the exact combination of
// (bridged) options currently in effect: the `cases` entry whose `options`
// deep-equals the selection. Returns `undefined` when this fixture doesn't
// illustrate that combination.
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

// Cached across options-toolbar changes and fixture switches, so the
// fallback extraction path (see renderUtterancesPanel) doesn't need to
// refetch the fixture's files.
let currentFixture = null;

// ReadiumSpeechNavigator wraps the playback engine and handles advancing
// through the queued utterances on its own — created eagerly (see
// initPlaybackNavigator below), not lazily on first Play, so
// loadGndContent()/submitPreferences() can drive the "Utterances actual"
// panel on every fixture/option change.
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
  const utterance = playbackNavigator.getContentQueue()[index];
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
// speaking — set once, alongside the navigator, in initPlaybackNavigator.
let voiceReadyPromise = null;

// Fixture content is only ever en/es/fr — scope the singleton to just those
// languages before the navigator's own unscoped engine.initialize() call can
// win the race and load JSON for every language the browser has voices for.
const PLAYGROUND_LANGUAGES = ["en", "es", "fr"];

// Constructs the Navigator eagerly (unlike the old lazy-on-first-Play
// pattern), guarded: `new WebSpeechEngine()` throws synchronously when the
// Web Speech API isn't available, so a failure here degrades to the same
// "not implemented yet" state the rest of the UI already falls back to when
// a library export is missing, rather than crashing the page at load time.
function initPlaybackNavigator() {
  if (!NavigatorClass || !EngineClass) return null;
  try {
    void VoiceManagerClass?.initialize({ languages: PLAYGROUND_LANGUAGES });
    const nav = new NavigatorClass(new EngineClass());
    nav.setSpeakInContentLanguage(true);
    for (const type of ["start", "pause", "resume", "end", "stop", "ready", "error"]) {
      nav.on(type, syncSpeechUi);
    }
    nav.on("boundary", highlightWordBoundary);
    nav.on("end", clearWordHighlight);
    nav.on("stop", clearWordHighlight);
    voiceReadyPromise = setupDefaultVoice(nav);
    return nav;
  } catch (err) {
    console.error("Failed to construct playback engine (Web Speech API unavailable?):", err);
    return null;
  }
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
    li.classList.toggle("starts-new-block", utterance?.startsNewBlock === true);
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

// Re-renders the "Expected"/"Actual" utterances compare panel and the
// speech-preview list for `currentFixture`, from whatever's currently
// loaded into `playbackNavigator` — kept current by loadGndContent()/
// submitPreferences() (see selectFixture/applyPreferencesFromToolbar below)
// — or, when no Navigator is available (e.g. the Web Speech API isn't
// supported), a standalone extractUtterances() call using the same
// settings-resolution rules, so the compare panel still works degraded.
function renderUtterancesPanel() {
  if (!currentFixture) return;
  const { gndActual, utterances, rolesInTree } = currentFixture;
  const resolvedOptions = currentExtractionOptions();
  const expected = matchingExpected(utterances, bridgeToFixtureOptions(resolvedOptions, rolesInTree));

  utterancesExpectedEl.textContent =
    expected !== undefined ? JSON.stringify(expected, null, 2) : "(none — this sample doesn't illustrate this combination of options)";

  if (gndActual === undefined || (!playbackNavigator && !utteranceExtractor)) {
    utterancesActualEl.textContent = "";
    setBadge(utterancesBadgeEl, "pending");
    renderSpeechList([]);
    return;
  }

  try {
    const actualUtterances = playbackNavigator
      ? playbackNavigator.getContentQueue()
      : utteranceExtractor.extractUtterances(gndActual, resolvedOptions);
    utterancesActualEl.textContent = JSON.stringify(actualUtterances, null, 2);
    setBadge(
      utterancesBadgeEl,
      expected === undefined ? "none" : deepEqual(actualUtterances, expected) ? "pass" : "fail",
    );
    renderSpeechList(actualUtterances);
  } catch (err) {
    utterancesActualEl.textContent = String(err);
    setBadge(utterancesBadgeEl, "fail");
    renderSpeechList([]);
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

  currentFixture = { gndActual, utterances, rolesInTree: collectRoles(expectedTopLevel(gnd)) };
  playbackNavigator?.stop();
  if (playbackNavigator && gndActual !== undefined) {
    playbackNavigator.loadGndContent(gndActual); // re-extracts internally, using current settings
  }
  renderUtterancesPanel();
}

playbackNavigator = initPlaybackNavigator();
configurable =
  playbackNavigator ??
  (SpeechPreferencesClass && SpeechDefaultsClass && SpeechSettingsClass && SpeechPreferencesEditorClass
    ? makeStandaloneConfigurable()
    : null);
renderToolbarOptions();
renderToolbarState();

filterInput.addEventListener("input", renderList);
for (const radio of formatRadios) radio.addEventListener("change", applyPreferencesFromToolbar);
optionVerbosityEl?.addEventListener("change", applyPreferencesFromToolbar);
optionLanguageEl?.addEventListener("change", applyPreferencesFromToolbar);
optionInterruptEl?.addEventListener("change", applyPreferencesFromToolbar);
optionSkipEl?.addEventListener("change", applyPreferencesFromToolbar);
optionContextualizeEl?.addEventListener("change", applyPreferencesFromToolbar);
for (const { inputEl, valueEl, unit } of rangeControls) {
  inputEl.addEventListener("input", () => {
    valueEl.textContent = `${inputEl.value}${unit}`;
  });
  inputEl.addEventListener("change", applyPreferencesFromToolbar);
}
optionPauseScopeEl?.addEventListener("change", applyPreferencesFromToolbar);
resetPreferencesEl?.addEventListener("click", resetPreferences);

if (!playbackNavigator) {
  speechBadgeEl.textContent = "not implemented yet";
  speechBadgeEl.className = "badge pending";
} else {
  setSpeechBadge("idle");
}

speechPlayEl.addEventListener("click", async () => {
  if (!playbackNavigator || playbackNavigator.getContentQueue().length === 0) return;
  await voiceReadyPromise;
  playbackNavigator.play();
});
speechPauseEl.addEventListener("click", () => playbackNavigator?.pause());
speechResumeEl.addEventListener("click", () => playbackNavigator?.play());
speechStopEl.addEventListener("click", () => playbackNavigator?.stop());

renderList();
