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

// Feature-detect the GND converter and the utterance extractor, if/when
// @readium/speech exports them.
let converter = null;
let utteranceExtractor = null;
try {
  const mod = await import("../../build/index.js");
  if (typeof mod.convert === "function") {
    converter = mod;
  }
  if (typeof mod.extractUtterances === "function") {
    utteranceExtractor = mod;
  }
} catch {
  // build/index.js may not export these yet; that's expected pre-implementation.
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
    empty.textContent = "No fixtures match.";
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
// several siblings — while `convert()` always returns an array. This maps
// the stored file format onto that array shape for comparison.
function expectedTopLevel(gnd) {
  if (gnd && typeof gnd === "object" && !Array.isArray(gnd)) {
    const keys = Object.keys(gnd);
    if (keys.length === 1 && keys[0] === "children") return gnd.children;
  }
  return [gnd];
}

// Inverse of expectedTopLevel: reshapes convert()'s array output into the
// same bare-object/`{children}` convention gnd.json is stored in, so the
// "actual" pane displays in the fixture's own reference shape.
function toStoredShape(items) {
  return items.length === 1 ? items[0] : { children: items };
}

function setBadge(el, state) {
  el.textContent = state === "pass" ? "pass" : state === "fail" ? "fail" : "not implemented yet";
  el.className = `badge ${state}`;
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
  utterancesExpectedEl.textContent = JSON.stringify(utterances, null, 2);

  if (!converter) {
    gndActualEl.textContent = "";
    setBadge(gndBadgeEl, "pending");
    utterancesActualEl.textContent = "";
    setBadge(utterancesBadgeEl, "pending");
    return;
  }

  let actual;
  try {
    actual = converter.convert(inputHtml);
    gndActualEl.textContent = JSON.stringify(withSchemaKeyOrder(toStoredShape(actual)), null, 2);
    setBadge(gndBadgeEl, deepEqual(actual, expectedTopLevel(gnd)) ? "pass" : "fail");
  } catch (err) {
    gndActualEl.textContent = String(err);
    setBadge(gndBadgeEl, "fail");
  }

  if (!utteranceExtractor || actual === undefined) {
    utterancesActualEl.textContent = "";
    setBadge(utterancesBadgeEl, "pending");
    return;
  }

  try {
    const actualUtterances = utteranceExtractor.extractUtterances(actual);
    utterancesActualEl.textContent = JSON.stringify(actualUtterances, null, 2);
    setBadge(utterancesBadgeEl, deepEqual(actualUtterances, utterances) ? "pass" : "fail");
  } catch (err) {
    utterancesActualEl.textContent = String(err);
    setBadge(utterancesBadgeEl, "fail");
  }
}

filterInput.addEventListener("input", renderList);

renderList();
