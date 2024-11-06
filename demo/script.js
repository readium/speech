
import { voicesSelection } from "../build/mjs/src/index.js";
const { getSpeechSynthesisVoices, parseSpeechSynthesisVoices, filterOnNovelty, filterOnVeryLowQuality,
  filterOnRecommended, sortByLanguage, sortByQuality, getVoices, groupByKindOfVoices, groupByRegions,
  getLanguages, filterOnOfflineAvailability, listLanguages, filterOnGender, filterOnLanguage } = voicesSelection;

import * as lit from './lit-html_3-2-0_esm.js'
const { html, render } = lit;

async function loadJSONData(url) {
    try {
        const response = await fetch(url);
        const jsonData = JSON.parse(await response.text());
        return jsonData;
    } catch (error) {
        console.error('Error loading JSON data:', error);
        return null;
    }
}

function downloadJSON(obj, filename) {
    // Convert the JSON object to a string
    const data = JSON.stringify(obj, null, 2);

    // Create a blob from the string
    const blob = new Blob([data], { type: "application/json" });

    // Generate an object URL
    const jsonObjectUrl = URL.createObjectURL(blob);

    // Create an anchor element
    const anchorEl = document.createElement("a");
    anchorEl.href = jsonObjectUrl;
    anchorEl.download = `${filename}.json`;

    // Simulate a click on the anchor element
    anchorEl.click();

    // Revoke the object URL
    URL.revokeObjectURL(jsonObjectUrl);
}

const viewRender = () => render(content(), document.body);

const voices = await getVoices();
console.log(voices);

const languages = getLanguages(voices);

let voicesFiltered = voices;
let languagesFiltered = languages;

let textToRead = "";
let textToReadFormated = "";

let selectedLanguage = undefined;

let voicesSelectElem = [];

let selectedVoice = "";

let selectedGender = "all";

let checkboxOfflineChecked = false;

const readTextWithSelectedVoice = () => {
    const voices = window.speechSynthesis.getVoices();

    const utterance = new SpeechSynthesisUtterance();
    utterance.text = textToReadFormated;

    for (const voice of voices) {
        if (voice.name === selectedVoice) {
            utterance.voice = voice;
            utterance.lang = voice.lang;
            break;
        }
    }

    if (!utterance.voice) {
        console.error("Speech : Voice NOT FOUND");
        alert("voice not found");
    } 

    console.log("Speech", utterance);
    

    speechSynthesis.speak(utterance);
}

const filterVoices = () => {

    voicesFiltered = voices;
    
    if (selectedGender !== "all") {
        voicesFiltered = filterOnGender(voicesFiltered, selectedGender);
    }

    if (checkboxOfflineChecked) {
        voicesFiltered = filterOnOfflineAvailability(voicesFiltered, true);
    }

    languagesFiltered = getLanguages(voicesFiltered);

    const voicesFilteredOnLanguage = filterOnLanguage(voicesFiltered, selectedLanguage);
    const voicesGroupedByRegions = groupByRegions(voicesFilteredOnLanguage);
    
    voicesSelectElem = listVoicesWithLanguageSelected(voicesGroupedByRegions);

    viewRender();
} 

const setSelectVoice = (name) => {

    selectedVoice = name;
    textToReadFormated = textToRead.replace("{name}", selectedVoice);
}

const languageSelectOnChange = async (ev) => {

    selectedLanguage = ev.target.value;

    const jsonData = await loadJSONData("https://raw.githubusercontent.com/HadrienGardeur/web-speech-recommended-voices/main/json/" + selectedLanguage + ".json");

    textToRead = jsonData?.testUtterance || "";

    filterVoices();
}

const listVoicesWithLanguageSelected = (voiceMap) => {

    const elem = [];
    selectedVoice = "";

    for (const [region, voice] of voiceMap) {
        const option = [];

        for (const {name, label} of voice) {
            option.push(html`<option value=${name} ?default=${!selectedVoice}>${label}</option>`);
            if (!selectedVoice) setSelectVoice(name);
        }
        elem.push(html`
        <optgroup label=${region}>
            ${option}
        </optgroup>
        `)
      }

    return elem;
}

const aboutVoice = () => {
    return html`
        <fieldset>
            <p>${JSON.stringify(voicesFiltered.filter(({name}) => name === selectedVoice, null, 4))}</p>
        </fieldset>
    `;
}

const getVoicesInputForDebug = () => {
    const a = window.speechSynthesis.getVoices() || [];
    return a.map(({ default: def, lang, localService, name, voiceURI}) => ({default: def, lang, localService, name, voiceURI}));
}

const content = () => html`
<h1>ReadiumSpeech</h1>

<p>Language :</p>
<select id="language-select" @change=${languageSelectOnChange}>
    ${!selectedLanguage ? html`<option id="default-language-select" default>Select a language</option>` : null}
    ${languagesFiltered.map(({code, label, count}) => html`<option value=${code}>${`${label} (${count})`}</option>`)}
</select>

<p>Voices :</p>
<select id="voice-select" @change=${(e) => {
    setSelectVoice(e.target.value || "");
    viewRender();
}}>
    ${voicesSelectElem}
</select>

<p>Gender : </p>
<select id="gender-select" @change=${(e) => {
    selectedGender = e.target.value;
    filterVoices();
}}>
    ${["all", "male", "female", "neutral"].map((v, i) => html`<option ?default=${i === 0} value=${v}>${v}</option>`)}
</select>

<p>Filter : </p>
<div class="checkbox">
    <input id="offline-checkbox" type="checkbox" @change=${(e) => {
        checkboxOfflineChecked = e.target.checked;
        filterVoices();
    }}></input>
    <label for="offline-checkbox">Filter on voice available offline</label>
</div>
  
<p>Text :</p>
<input type="text" id="text-to-read" class="txt" .value=${textToReadFormated} @input=${(e) => textToReadFormated = e.target.value ? e.target.value : textToReadFormated}></input>

<div class="controls">
    <button id="read-button" @click=${selectedVoice ? readTextWithSelectedVoice : undefined}>Read aloud</button>
</div>

<div class="aboutVoice">
    ${selectedVoice ? aboutVoice() : undefined}
</div>

<div class="debug">
    <button @click=${() => downloadJSON({ input: getVoicesInputForDebug(), output: voices })}>Download Voices for DEBUG Only</button>
</div>

`;
viewRender();