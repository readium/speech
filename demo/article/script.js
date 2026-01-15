import { WebSpeechVoiceManager, WebSpeechReadAloudNavigator } from "../../build/index.js";

// DOM Elements
const content = document.getElementById("content");
const voiceSelect = document.getElementById("voiceSelect");
const playPauseBtn = document.getElementById("playPauseBtn");
const stopBtn = document.getElementById("stopBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const currentUtteranceSpan = document.getElementById("currentUtterance");
const totalUtterancesSpan = document.getElementById("totalUtterances");
const readAlongCheckbox = document.getElementById("readAlong");

// State
let voiceManager;
let navigator;
let enVoices = [];
let currentVoice = null;
let isPlaying = false;
let utterances = [];
let currentWordHighlight = null;
let readAlongEnabled = true; // Default to true to match default checkbox state

// Initialize voice manager and navigator
async function initialize() {
  try {
    // Initialize the voice manager
    voiceManager = await WebSpeechVoiceManager.initialize({languages: ["en"]});
    
    // Get English voices asynchronously
    enVoices = await voiceManager.getVoices({removeDuplicates: true});
    
    // Initialize the navigator
    navigator = new WebSpeechReadAloudNavigator();
    
    // Set up event listeners
    setupEventListeners();
    
    // Initialize the UI
    updateUI();
    
    // Populate voice select asynchronously
    await populateVoiceSelect();
    
    // Get the default voice for English asynchronously
    currentVoice = await voiceManager.getDefaultVoice("en", enVoices);

    if (currentVoice && navigator) {
      navigator.setVoice(currentVoice);
      // Update the select element to reflect the selected voice
      if (voiceSelect) {
        const option = voiceSelect.querySelector(`option[data-voice-uri="${currentVoice.voiceURI}"]`);
        if (option) {
          option.selected = true;
        }
      }
    }
    
    // Initialize content
    initializeContent();
    
  } catch (error) {
    console.error("Initialization error:", error);
  }
}

// Set up event listeners
function setupEventListeners() {
  
  // Navigator events
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
  
  // Button events
  if (playPauseBtn) playPauseBtn.addEventListener("click", togglePlayback);
  if (stopBtn) stopBtn.addEventListener("click", stopPlayback);
  if (prevBtn) prevBtn.addEventListener("click", previousUtterance);
  if (nextBtn) nextBtn.addEventListener("click", nextUtterance);
  
  // Checkbox events
  if (readAlongCheckbox) {
    readAlongCheckbox.checked = readAlongEnabled;
    readAlongCheckbox.addEventListener("change", handleReadAlongChange);
  }
  
  // Voice selection
  if (voiceSelect) voiceSelect.addEventListener("change", handleVoiceChange);
}

// Handle read along checkbox change
function handleReadAlongChange(e) {
  readAlongEnabled = e.target.checked;
  if (!readAlongEnabled) {
    clearWordHighlighting();
  } else if (isPlaying) {
    const currentIndex = navigator?.getCurrentUtteranceIndex();
    if (currentIndex !== undefined) {
      const utterance = utterances[currentIndex];
      if (utterance) {
        const charIndex = utterance.text.indexOf(utterance.word);
        if (charIndex !== -1) {
          highlightCurrentWord(charIndex, utterance.word?.length || 0);
        }
      }
    }
  }
}

// Initialize content with proper segmentation
async function initializeContent() {
  const paragraphs = Array.from(content.querySelectorAll("p, h1, h2, h3, h4, h5, h6"));
  utterances = [];
  
  // Process each paragraph/heading
  paragraphs.forEach((p) => {
    const text = p.textContent;
    if (!text.trim()) return;
    
    // Use Intl.Segmenter for sentence segmentation
    const segmenter = new Intl.Segmenter("en", { granularity: "sentence" });
    const segments = Array.from(segmenter.segment(text));
    
    // Process each sentence
    segments.forEach(({ segment }) => {
      const sentence = segment.trim();
      if (!sentence) return;
      
      // Add to utterances
      utterances.push({
        id: `utterance-${utterances.length}`,
        text: sentence,
        language: "en"
      });
    });
  });
  
  // Load utterances into the navigator
  navigator.loadContent(utterances);
  
  // Update UI
  updateUI();
}

// Populate voice select dropdown
async function populateVoiceSelect() {
  if (!voiceSelect) return;
  
  voiceSelect.innerHTML = "<option value=\"\" disabled selected>Loading voices...</option>";
  
  try {
    if (!enVoices || !enVoices.length) {
      enVoices = await voiceManager.getVoices({languages: "en", removeDuplicates: true});
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
    // Sort by region while preserving quality order within each region
    const sortedVoices = await voiceManager.sortVoicesByRegions(["en"], enVoices);

    let currentRegion = null;
    let optgroup = null;
    
    for (const voice of sortedVoices) {
      // Extract region from language code (e.g., "US" from "en-US")
      const region = voice.language.split("-")[1] || "Other";
      
      // Create new optgroup when region changes
      if (region !== currentRegion) {
        currentRegion = region;
        optgroup = document.createElement("optgroup");
        // Add emoji flag before the region name using Intl.DisplayNames
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
    
    // If we have a current voice, select it
    if (currentVoice) {
      const option = voiceSelect.querySelector(`option[data-voice-uri="${currentVoice.voiceURI}"]`);
      if (option) {
        option.selected = true;
      }
    }
    
    // Update the UI to reflect the current state
    updateUI();
    
  } catch (error) {
    console.error("Error populating voice select:", error);
    voiceSelect.innerHTML = "<option value=\"\" disabled selected>Error loading voices</option>";
  }
  
  } catch (error) {
    console.error("Error populating voice dropdown:", error);
    // Fallback to simple list if there's an error
    enVoices.forEach(voice => {
      const option = document.createElement("option");
      option.value = voice.name;
      option.textContent = [
        voice.label || voice.name,
        voice.gender ? `• ${voice.gender}` : "",
        voice.offlineAvailability ? "• offline" : "• online"
      ].filter(Boolean).join(" ");
      option.dataset.voiceUri = voice.voiceURI;
      voiceSelect.appendChild(option);
    });
  }
  
  // Set up voice change event listener
  voiceSelect.addEventListener("change", handleVoiceChange);
  
  // Helper function to get country flag emoji from country code
  function getCountryFlag(countryCode) {
    if (!countryCode) return "🌐";
    
    try {
      const codePoints = countryCode
        .toUpperCase()
        .split("")
        .map(char => 127397 + char.charCodeAt(0));
      
      return String.fromCodePoint(...codePoints);
    } catch (e) {
      console.warn("Could not generate flag for country code:", countryCode);
      return "🌐";
    }
  }
}

// Toggle sample text playback
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
      // Use play() to resume from paused state
      navigator.play();
    } else {
      // Start from beginning if stopped or in an unknown state
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

// Handle voice change
async function handleVoiceChange(e) {
  const voiceName = e.target.value;
  if (!voiceName) return;
  
  // Find the selected voice by name
  currentVoice = enVoices.find(v => v.name === voiceName);
  
  if (!currentVoice) {
    console.error("Voice not found:", voiceName);
    return;
  }
  
  // Stop any current playback
  if (navigator) {
    try {
      // Stop the current speech
      navigator.stop();
      
      // Set the new voice
      navigator.setVoice(currentVoice);
      
      // Update UI to reflect the change
      updateUI();
      
    } catch (error) {
      console.error("Error changing voice:", error);
    }
  }
}

// Clear any previous highlighting
function clearWordHighlighting() {
  if (window.CSS?.highlights) {
    CSS.highlights.clear();
  }
}

// Highlight current word in the content
function highlightCurrentWord(charIndex, charLength) {
  // Check if read-along is enabled
  if (!readAlongEnabled) return;
  
  // Clear previous highlighting
  clearWordHighlighting();

  // Get the current utterance
  const currentIndex = navigator.getCurrentUtteranceIndex();
  const currentUtterance = utterances[currentIndex];
  if (!currentUtterance) return;

  // Get the content element
  const contentElement = document.getElementById("content");
  if (!contentElement) return;

  // Create a range for the current word
  const range = document.createRange();
  const walker = document.createTreeWalker(
    contentElement,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );

  let node;
  let found = false;

  while ((node = walker.nextNode())) {
    const nodeText = node.nodeValue;
    const nodeLength = nodeText.length;

    // Check if this node contains the current utterance
    const utteranceText = currentUtterance.text;
    const nodeStart = nodeText.indexOf(utteranceText);
    
    if (nodeStart !== -1) {
      // Calculate the position within this node
      const startPos = nodeStart + charIndex;
      const endPos = Math.min(startPos + charLength, nodeLength);
      
      // Ensure the range is valid
      if (startPos >= 0 && endPos <= nodeLength) {
        try {
          range.setStart(node, startPos);
          range.setEnd(node, endPos);
          
          // Use CSS Highlight API
          const highlight = new Highlight(range);
          if (window.CSS?.highlights) {
            CSS.highlights.set("current-word", highlight);
          }
          
          // Store current highlight info
          currentWordHighlight = {
            utteranceIndex: currentIndex,
            charIndex: charIndex,
            charLength: charLength,
            range: range
          };
          
          // Scroll the highlighted word into view with smooth behavior
          const rect = range.getBoundingClientRect();
          const isVisible = (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
          );
          
          if (!isVisible) {
            range.startContainer.parentElement.scrollIntoView({
              behavior: "smooth",
              block: "center",
              inline: "nearest"
            });
          }
          
          found = true;
        } catch (e) {
          console.error("Error setting highlight range:", e);
        }
      }
      break;
    }
  }

  if (!found) {
    console.warn("Could not find position for highlight");
  }
}

// Update UI
function updateUI() {
  if (!navigator) return;
  
  const currentIndex = navigator.getCurrentUtteranceIndex();
  const total = utterances.length;
  const state = navigator.getState();
  const hasContent = total > 0;
  
  // Update play/pause button
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
  
  // Update other buttons
  if (stopBtn) {
    stopBtn.disabled = !currentVoice || !hasContent || (state !== "playing" && state !== "paused");
  }
  
  if (prevBtn) {
    prevBtn.disabled = !currentVoice || !hasContent || currentIndex <= 0;
  }
  
  if (nextBtn) {
    nextBtn.disabled = !currentVoice || !hasContent || currentIndex >= total - 1;
  }
  
  // Update utterance counter
  if (currentUtteranceSpan) {
    currentUtteranceSpan.textContent = currentIndex + 1;
  }
  
  if (totalUtterancesSpan) {
    totalUtterancesSpan.textContent = total;
  }
}

// Initialize the application
initialize().catch(console.error);