import { WebSpeechReadAloudNavigator } from "../../build/index.js";

import * as lit from "../lit-html_3-2-0_esm.js"
const { html, render } = lit;

// Sample text from Moby Dick by Herman Melville
const sampleText = `
Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world. It is a way I have of driving off the spleen and regulating the circulation.

Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people's hats off—then, I account it high time to get to sea as soon as I can.

This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the ship. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the ocean with me.

There now is your insular city of the Manhattoes, belted round by wharves as Indian isles by coral reefs—commerce surrounds it with her surf. Right and left, the streets take you waterward. Its extreme downtown is the battery, where that noble mole is washed by waves, and cooled by breezes, which a few hours previous were out of sight of land. Look at the crowds of water-gazers there.`;

// Create navigator instance
const navigator = new WebSpeechReadAloudNavigator();

// Main render function
const viewRender = () => {
  const state = {
    isPlaying: navigator.getState() === "playing",
    currentUtteranceIndex: navigator.getCurrentUtteranceIndex() || 0,
    totalUtterances: navigator.getContentQueue().length,
    currentVoice: navigator.getCurrentVoice()
  };
  
  render(content(state), document.body);
};

// Split text into sentences for utterances
function createUtterancesFromText(text) {
  // Split by sentences (basic implementation)
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  return sentences.map((sentence, index) => ({
    id: `utterance-${index}`,
    text: sentence.trim() + (sentence.endsWith(".") || sentence.endsWith("!") || sentence.endsWith("?") ? "" : "."),
    language: "en-US"
  }));
}

const utterances = createUtterancesFromText(sampleText);
console.log(`Created ${utterances.length} utterances`);

let voices = [];
let currentVoice = null;
let currentWordHighlight = null; // Track current word being highlighted

// Initialize voices
async function initVoices() {
  try {
    // Get all voices
    voices = await navigator.getVoices();
    // Filter for English voices
    const englishVoices = voices.filter(v => v.language.startsWith("en"));
    // Set the first English voice as default, or fallback to first available
    currentVoice = englishVoices.length > 0 ? englishVoices[0] : voices[0];
    
    if (currentVoice) {
      await navigator.setVoice(currentVoice);
    }
    
    // Re-render to show the voice selector
    viewRender();
  } catch (error) {
    console.error("Error initializing voices:", error);
  }
}

// Handle voice selection
async function handleVoiceChange(event) {
  const voiceName = event.target.value;
  const selectedVoice = voices.find(v => v.name === voiceName);
  if (selectedVoice) {
    // Stop any ongoing speech before changing the voice
    await navigator.stop();
    currentVoice = selectedVoice;
    await navigator.setVoice(selectedVoice);
    // The view will be updated automatically through the state change events
  }
}

// Load utterances into navigator and initialize voices
navigator.loadContent(utterances);
initVoices();

// Event listeners for navigator
navigator.on("start", () => {
  console.log("Playback started");
  clearWordHighlighting(); // Clear any previous highlighting
  viewRender();
});

navigator.on("pause", () => {
  console.log("Playback paused");
  viewRender();
});

navigator.on("resume", () => {
  console.log("Playback resumed");
  viewRender();
});

navigator.on("stop", () => {
  console.log("Playback stopped");
  clearWordHighlighting();
  viewRender();
});

navigator.on("end", () => {
  console.log("Playback ended");
  viewRender();
});

navigator.on("error", (event) => {
  console.error("Navigator error:", event.detail);
  viewRender();
});

navigator.on("boundary", (event) => {
  console.log("Boundary event:", event.detail);
  // Handle word and sentence boundaries for highlighting
  if (event.detail.name === "word") {
    highlightCurrentWord(event.detail.charIndex, event.detail.charLength);
  }
  viewRender();
});

// Playback control functions
const playPause = async () => {
  const state = navigator.getState();
  if (state === "playing") {
    navigator.pause();
  } else {
    await navigator.play();
  }
};

const stop = () => {
  navigator.stop();
};

const next = async () => {
  clearWordHighlighting(); // Clear highlighting when moving to next utterance
  await navigator.next();
};

const previous = async () => {
  clearWordHighlighting(); // Clear highlighting when moving to previous utterance
  await navigator.previous();
};

const jumpToUtterance = () => {
  const input = document.getElementById("utterance-index");
  const index = parseInt(input.value) - 1; // Convert to 0-based index
  if (index >= 0 && index < navigator.getContentQueue().length) {
    clearWordHighlighting(); // Clear highlighting when jumping to new utterance
    navigator.jumpTo(index);
  } else {
    alert(`Please enter a number between 1 and ${navigator.getContentQueue().length}`);
    // Reset input to current position
    input.value = navigator.getCurrentUtteranceIndex() + 1;
  }
};

function highlightCurrentWord(charIndex, charLength) {
  // Clear previous highlighting
  clearWordHighlighting();
  
  // Find the current utterance being spoken
  const currentUtterance = navigator.getCurrentContent();
  if (!currentUtterance) return;
  
  // Extract the word based on character index and length
  const text = currentUtterance.text;
  if (charIndex >= 0 && charIndex < text.length) {
    const wordEnd = Math.min(charIndex + charLength, text.length);
    const word = text.substring(charIndex, wordEnd);
    
    // Find the specific occurrence of this word at this position
    highlightSpecificWord(text, word, charIndex);
    
    currentWordHighlight = {
      utteranceIndex: navigator.getCurrentUtteranceIndex(),
      charIndex: charIndex,
      charLength: charLength,
      word: word
    };
  }
}

function highlightSpecificWord(fullText, targetWord, startIndex) {
  const utteranceElements = document.querySelectorAll('.utterance-text');
  const currentUtteranceIndex = navigator.getCurrentUtteranceIndex();
  
  if (utteranceElements.length > currentUtteranceIndex) {
    const currentElement = utteranceElements[currentUtteranceIndex];
    if (currentElement) {
      // Find the specific occurrence of the word at the given character position
      const beforeText = fullText.substring(0, startIndex);
      const afterText = fullText.substring(startIndex + targetWord.length);
      
      // Reconstruct the HTML with only the specific word highlighted
      currentElement.innerHTML = 
        beforeText + 
        '<span class="highlighted-word">' + targetWord + '</span>' + 
        afterText;
    }
  }
}

function clearWordHighlighting() {
  // Remove all word highlighting
  const highlightedWords = document.querySelectorAll('.highlighted-word');
  highlightedWords.forEach(el => {
    el.outerHTML = el.textContent;
  });
  
  currentWordHighlight = null;
}

// UI Components
const content = (state) => {
  // Show loading state if navigator isn't ready
  if (navigator.getState() === "loading" || !state) {
    return html`
      <div class="container">
        <h1>Readium Speech Navigator Demo</h1>
        <div class="loading">
          <p>Loading speech engine...</p>
        </div>
      </div>`;
  }

  return html`
  <div class="container">
    <h1>Readium Speech Navigator Demo</h1>
    
    <div class="voice-section">
      <div class="voice-info">
        <h3>Voice Settings</h3>
        ${voices.length > 0 ? html`
          <div class="voice-selector">
            <label for="voice-select">Select Voice:</label>
            <select id="voice-select" @change=${handleVoiceChange}>
              ${voices
                .filter(v => v.language.startsWith("en"))
                .map(voice => html`
                  <option 
                    value="${voice.name}" 
                    ?selected=${currentVoice && currentVoice.name === voice.name}
                  >
                    ${voice.name} (${voice.language})${voice.default ? " [Default]" : ""}
                  </option>
                `)
              }
            </select>
          </div>
          <div class="current-voice">
            <details>
              <summary>Voice Details</summary>
              <div class="voice-details">
                ${(() => {
                  const voice = navigator.getCurrentVoice();
                  if (!voice) return html`<p>No voice selected</p>`;
                  
                  // Get all properties from the voice object
                  const voiceProps = [];
                  
                  // Add all properties from the voice object
                  for (const [key, value] of Object.entries(voice)) {
                    if (key.startsWith("_")) continue;
                    
                    let displayValue = value;
                    if (value === undefined) displayValue = "undefined";
                    else if (value === null) displayValue = "null";
                    else if (typeof value === "boolean") displayValue = value ? "Yes" : "No";
                    else if (typeof value === "object") displayValue = JSON.stringify(value);
                    
                    voiceProps.push({ key, value: displayValue });
                  }
                  
                  return html`
                    <dl class="voice-properties">
                      ${voiceProps.map(({key, value}) => html`
                        <div class="property">
                          <dt>${key}:</dt>
                          <dd>${value}</dd>
                        </div>
                      `)}
                    </dl>
                  `;
                })()}
              </div>
            </details>
            
            <style>
              .voice-properties {
                margin-top: 10px;
              }
              .property {
                display: flex;
                margin-bottom: 5px;
              }
              .property dt {
                font-weight: 600;
                min-width: 150px;
                color: #555;
              }
              .property dd {
                margin: 0;
                flex: 1;
              }
            </style>
          </div>
        ` : html`<div>Loading voices...</div>`}
      </div>
    </div>

    <div class="playback-controls">
      <button @click=${playPause} class="play-pause ${state.isPlaying ? "pause-state" : "play-state"}">
        ${state.isPlaying ? "⏸️ Pause" : "▶️ Play"}
      </button>
      <button @click=${stop} class="stop">⏹️ Stop</button>
      <button @click=${previous} class="nav">⏮️ Previous</button>
      <button @click=${next} class="nav">⏭️ Next</button>
    </div>

    <div class="jump-controls">
      <input
        type="number"
        id="utterance-index"
        min="1"
        max="${state.totalUtterances}"
        value="${state.currentUtteranceIndex + 1}"
        placeholder="Utterance #"
        class="jump-input"
      />
      <span>of ${state.totalUtterances}</span>
      <button @click=${jumpToUtterance} class="jump-btn">Jump To</button>
    </div>

    <div class="progress-info">
      <p>State: ${navigator.getState()}</p>
    </div>

  <div class="demo-section">
    <h2>Content Preview</h2>
    <div class="utterances-list">
      ${navigator.getContentQueue().map((utterance, index) => html`
        <div class="utterance ${index === state.currentUtteranceIndex ? "current" : ""} ${index < state.currentUtteranceIndex ? "played" : ""}">
          <span class="utterance-number">${index + 1}.</span>
          <span class="utterance-text">${utterance.text}</span>
        </div>
      `)}
    </div>
  </div>

<style>
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    line-height: 1.6;
  }

  .demo-section {
    margin: 30px 0;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: #f9f9f9;
  }

  .voice-section {
    background: #f5f5f5;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 20px;
  }

  .voice-info {
    margin-bottom: 15px;
    padding: 15px;
    background: #f8f9fa;
    border-radius: 5px;
  }

  .voice-selector {
    margin: 10px 0;
  }

  .voice-selector select {
    margin-left: 10px;
    padding: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }

  .current-voice {
    margin-top: 15px;
  }

  .current-voice details {
    background: white;
    border-radius: 6px;
    border: 1px solid #e0e0e0;
    padding: 10px 15px;
  }

  .current-voice summary {
    font-weight: 600;
    cursor: pointer;
    outline: none;
    padding: 5px 0;
  }

  .playback-controls {
    display: flex;
    gap: 10px;
    margin: 20px 0;
    justify-content: center;
  }
  
  .playback-controls button {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    transition: opacity 0.2s;
  }
  
  .playback-controls button:hover {
    opacity: 0.9;
  }
  
  .play-state {
    background-color: #4CAF50; /* Green for play */
  }

  .play-state:hover {
    background-color: #45a049; /* Darker green on hover */
  }

  .pause-state {
    background-color: #ff9800; /* Orange for pause */
  }

  .pause-state:hover {
    background-color: #e68900; /* Darker orange on hover */
  }

  .stop {
    background-color: #f44336; /* Red for stop */
  }

  .stop:hover {
    background-color: #d32f2f; /* Darker red on hover */
  }

  .nav {
    background-color: #2196F3; /* Blue for navigation */
  }

  .nav:hover {
    background-color: #1976D2; /* Darker blue on hover */
  }

  .jump-controls {
    display: flex;
    gap: 10px;
    margin: 20px 0;
    justify-content: center;
    align-items: center;
  }
  
  .jump-input {
    padding: 8px; 
    border: 1px solid #ccc; 
    border-radius: 4px; 
    width: 120px;
  }

  .jump-btn {
    padding: 8px 16px;
    background-color: #9c27b0; /* Purple for jump */
    color: white;
    border: none;
    border-radius: 4px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .jump-btn:hover {
    background-color: #7b1fa2; /* Darker purple on hover */
  }

  .current-voice summary:hover {
    color: #007bff;
  }

  .current-voice .voice-details {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid #eee;
  }

  .voice-properties {
    display: grid;
    grid-template-columns: max-content 1fr;
    gap: 8px 15px;
    margin: 0;
    padding: 0;
  }

  .property {
    display: contents;
  }

  .property dt {
    font-weight: 600;
    color: #555;
  }

  .property dd {
    margin: 0;
    word-break: break-word;
  }

  .playback-controls {
    display: flex;
    gap: 10px;
    margin: 20px 0;
    align-items: center;
    flex-wrap: wrap;
  }

  .voice-selector {
    margin-left: 20px;
  }

  button {
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    background: #007bff;
    color: white;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  button:hover {
    background: #0056b3;
  }
    font-size: 14px;
  }

  button:hover:not(:disabled) {
    background: #0056b3;
  }

  button:disabled {
    background: #ccc;
    cursor: not-allowed;
  }

  .progress-info {
    margin: 15px 0;
    padding: 10px;
    background: #e7f3ff;
    border-radius: 5px;
  }

  .utterances-list {
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 5px;
  }

  .utterance {
    padding: 2px 5px;
    margin: 1px 0;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: flex-start;
    gap: 5px;
  }

  .utterance.current {
    border-left: 4px solid #ffc107;
  }

  .highlighted-word {
    background-color: #ffff99;
    padding: 2px 4px;
    border-radius: 3px;
    border-bottom: 2px solid #ffcc00;
    font-weight: bold;
  }

  .utterance.played {
    background: #d4edda;
  }

  .utterance-number {
    font-weight: bold;
    color: #666;
    min-width: 30px;
  }

  .utterance-text {
    flex: 1;
  }
</style>
`;
};

// Initial render with loading state
viewRender();

// Re-render once voices are loaded
initVoices().then(() => viewRender());
