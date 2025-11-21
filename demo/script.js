import { WebSpeechVoiceManager, WebSpeechReadAloudNavigator } from "../build/index.js";

let samples = null;

const highlight = new Highlight();
CSS.highlights.set("readium-speech-highlight", highlight);
let currentWordHighlight = null;

// DOM Elements
const languageSelect = document.getElementById("language-select");
const genderSelect = document.getElementById("gender-select");
const offlineOnlyCheckbox = document.getElementById("offline-only");
const voiceSelect = document.getElementById("voice-select");
const testUtteranceInput = document.getElementById("test-utterance");
const playPauseBtn = document.getElementById("play-pause-btn");
const stopBtn = document.getElementById("stop-btn");
const testUtteranceBtn = document.getElementById("test-utterance-btn");
const prevUtteranceBtn = document.getElementById("prev-utterance-btn");
const nextUtteranceBtn = document.getElementById("next-utterance-btn");
const jumpToBtn = document.getElementById("jump-to-btn");
const utteranceIndexInput = document.getElementById("utterance-index");
const totalUtterancesSpan = document.getElementById("total-utterances");
const sampleTextDisplay = document.getElementById("sample-text");

// Track if user has manually changed the jump input
let jumpInputUserChanged = false;

// State
let voiceManager;
let allVoices = [];
let filteredVoices = [];
let languages = [];
let currentVoice = null;
let testUtterance = "";
let lastNavigatorPosition = 1;

const navigator = new WebSpeechReadAloudNavigator();

// Set up event listeners for the navigator
navigator.on("boundary", (event) => {
  if (event.detail && event.detail.name === "word") {
    highlightCurrentWord(event.detail.charIndex, event.detail.charLength);
  }
});

navigator.on("start", () => {
  clearWordHighlighting();
  updateUI();
});

navigator.on("pause", updateUI);
navigator.on("resume", updateUI);
navigator.on("stop", () => {
  clearWordHighlighting();
  updateUI();
});

navigator.on("end", updateUI);
navigator.on("error", (event) => {
  console.error("Navigator error:", event.detail);
  updateUI();
});

// Initialize the application
async function init() {
  try {    
    // Initialize the voice manager
    voiceManager = await WebSpeechVoiceManager.initialize();
    
    // Load all available voices
    allVoices = voiceManager.getVoices();
    
    // Get and sort languages
    languages = voiceManager.getLanguages()
      .sort((a, b) => a.label.localeCompare(b.label));
    
    // Populate language dropdown
    populateLanguageDropdown();
    
    // Set up event listeners
    setupEventListeners();
    
    // Update UI
    updateUI();
    
  } catch (error) {
    console.error("Error initializing application:", error);
    const errorDiv = document.createElement("div");
    errorDiv.style.color = "red";
    errorDiv.textContent = "Error loading voices. Please check console for details.";
    document.body.prepend(errorDiv);
  }
}

// Populate the language dropdown
function populateLanguageDropdown() {
  languageSelect.innerHTML = "<option value='' disabled selected>Select a language</option>";
  
  languages.forEach(lang => {
    const option = document.createElement("option");
    option.value = lang.code;
    option.textContent = `${lang.label} (${lang.count} ${lang.count === 1 ? "voice" : "voices"})`;
    languageSelect.appendChild(option);
  });
}

// Filter voices based on current filters
function filterVoices() {
  const language = languageSelect.value;
  const gender = genderSelect.value;
  const offlineOnly = offlineOnlyCheckbox.checked;

  const filterOptions = {};
  
  if (language) {
    filterOptions.language = language;
  }
  
  if (gender !== "all") {
    filterOptions.gender = gender;
  }
  
  if (offlineOnly) {
    filterOptions.offlineOnly = true;
  }
  
  // Apply filters
  filteredVoices = voiceManager.filterVoices(allVoices, filterOptions);
  
  // Sort voices by quality (highest first)
  filteredVoices = voiceManager.sortVoices(filteredVoices, {
    by: "quality",
    order: "desc"
  });
  populateVoiceDropdown(language);
  updateUI();
}

// Populate the voice dropdown with filtered voices
function populateVoiceDropdown(language = "") {
  voiceSelect.innerHTML = "<option value='' disabled selected>Select a voice</option>";
  
  try {
    if (!filteredVoices.length) {
      const option = document.createElement("option");
      option.disabled = true;
      option.textContent = "No voices match the current filters";
      voiceSelect.appendChild(option);
      return;
    }

    // Sort voices by language (with current language first) and then by name
    const sortedVoices = voiceManager.sortVoices([...filteredVoices], { 
      by: "language",
      order: "asc",
      preferredLanguage: language || undefined
    });

    // Group the sorted voices by region
    const voiceGroups = voiceManager.groupVoices(sortedVoices, "region");

    // Add optgroups for each region
    for (const [region, voices] of Object.entries(voiceGroups)) {
      if (!voices.length) continue;
      
      const countryCode = region.split("-").pop() || region;
      const optgroup = document.createElement("optgroup");
      optgroup.label = `${getCountryFlag(countryCode)} ${region}`;
      
      // Sort voices by name within each region
      const sortedVoicesInRegion = voiceManager.sortVoices(voices, { 
        by: "name",
        order: "asc"
      });
      
      for (const voice of sortedVoicesInRegion) {
        const option = document.createElement("option");
        option.value = voice.name;
        option.textContent = [
          voice.name,
          voice.gender ? `• ${voice.gender}` : "",
          voice.offlineAvailability ? "• offline" : "• online"
        ].filter(Boolean).join(" ");
        option.dataset.voiceUri = voice.voiceURI;
        optgroup.appendChild(option);
      }
      
      voiceSelect.appendChild(optgroup);
    }
    
    // If we have a current voice, try to select it
    if (currentVoice) {
      const option = voiceSelect.querySelector(`option[data-voice-uri="${currentVoice.voiceURI}"]`);
      if (option) {
        option.selected = true;
      }
    }
    
    // Only show error message if we don't have any valid voice options
    const hasValidOptions = Array.from(voiceSelect.options).some(opt => !opt.disabled);
    if (!hasValidOptions) {
      const option = document.createElement("option");
      option.disabled = true;
      option.textContent = "No voices available. Please check your browser settings and internet connection.";
      voiceSelect.appendChild(option);
    }
  } catch (error) {
    console.error("Error populating voice dropdown:", error);
    // Log the error but don't add any error message to the dropdown
  }
  
  // Helper function to get country flag emoji from country code
  function getCountryFlag(countryCode) {
    if (!countryCode) return "🌐";
    
    // Convert country code to flag emoji
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

// Load sample text for the selected language
async function loadSampleText(languageCode) {
  try {
    // Show loading state
    sampleTextDisplay.innerHTML = "<div class='loading'>Loading text...</div>";
    
    // Load sample texts if not already loaded
    if (!samples) {
      const response = await fetch("sampleText.json");
      if (!response.ok) {
        throw new Error("Failed to load sample texts");
      }
      samples = await response.json();
    }
    
    // Map Chinese variants to their sample text keys based on WebSpeechVoiceManager's mapping
    const chineseVariantMap = {
      "zh": "cmn",    // Default Chinese -> Mandarin
      "cmn": "cmn",   // Mandarin
      "wuu": "wuu",   // Wu Chinese
      "yue": "yue",   // Cantonese
      "zh-CN": "cmn", // Mainland China -> Mandarin
      "zh-TW": "cmn", // Taiwan -> Mandarin
      "zh-HK": "yue", // Hong Kong -> Cantonese (primary), then Mandarin
      "zh-SG": "cmn"  // Singapore -> Mandarin
    };
    
    // Try direct match first
    let sampleText = samples[languageCode]?.text;
    
    // Try with Chinese variant mapping if no direct match
    if (!sampleText && chineseVariantMap[languageCode]) {
      sampleText = samples[chineseVariantMap[languageCode]]?.text;
    }
    
    // If no direct match, try with base language
    if (!sampleText) {
      const [baseLang] = WebSpeechVoiceManager.extractLangRegionFromBCP47(languageCode);
      // If base language is a Chinese variant, try the mapping
      if (chineseVariantMap[baseLang]) {
        sampleText = samples[chineseVariantMap[baseLang]]?.text;
      } else {
        sampleText = samples[baseLang]?.text;
      }
    }
    
    // If no match found, return a message
    if (!sampleText) {
      return `No sample text available for language: ${languageCode}`;
    }
    
    // Create utterances from the sample text
    const utterances = createUtterancesFromText(sampleText);
    
    // Clear any existing content
    sampleTextDisplay.innerHTML = "";
    
    // Create a demo section container
    const demoSection = document.createElement("div");
    demoSection.className = "demo-section";
    
    // Add a heading
    const heading = document.createElement("h2");
    heading.textContent = "Content Preview";
    demoSection.appendChild(heading);
    
    // Create a container for the utterances list
    const utterancesList = document.createElement("div");
    utterancesList.className = "utterances-list";
    
    // Add each utterance with number indicator
    utterances.forEach((utterance, index) => {
      const utteranceElement = document.createElement("div");
      utteranceElement.className = `utterance ${index === 0 ? "current" : ""}`;
      utteranceElement.dataset.utteranceIndex = index;
      
      // Add utterance number
      const numberSpan = document.createElement("span");
      numberSpan.className = "utterance-number";
      numberSpan.textContent = `${index + 1}.`;
      
      // Add text content
      const textSpan = document.createElement("span");
      textSpan.className = "utterance-text";
      textSpan.dataset.utteranceId = utterance.id;
      textSpan.textContent = utterance.text;
      
      // Assemble the elements
      utteranceElement.appendChild(numberSpan);
      utteranceElement.appendChild(textSpan);
      
      utterancesList.appendChild(utteranceElement);
    });
    
    // Assemble the section
    demoSection.appendChild(utterancesList);
    sampleTextDisplay.appendChild(demoSection);
    
    // Load utterances into the navigator
    await navigator.loadContent(utterances);
    
    // Update total utterances display
    const totalUtterancesSpan = document.getElementById("total-utterances");
    if (totalUtterancesSpan) {
      totalUtterancesSpan.textContent = utterances.length;
    }
    
    // Update UI to enable playback controls
    updateUI();
    
    // Update utterance input
    if (utteranceIndexInput) {
      utteranceIndexInput.max = utterances.length;
      utteranceIndexInput.value = "1";
    }
  } catch (error) {
    console.error("Error loading sample text:", error);
    sampleTextDisplay.textContent = "Error loading sample text";
  }
}

// Update the test utterance based on the current voice and language
function updateTestUtterance(voice, languageCode) {
  if (!voice) {
    testUtterance = "";
    testUtteranceInput.value = "";
    testUtteranceBtn.disabled = true;
    return;
  }
  
  const [lang] = voice.lang ? WebSpeechVoiceManager.extractLangRegionFromBCP47(voice.lang) : 
    (languageCode ? WebSpeechVoiceManager.extractLangRegionFromBCP47(languageCode) : ["en"]);
  const baseUtterance = voiceManager.getTestUtterance(lang) || 
                      `This is a test of the {name} voice.`;
  testUtterance = baseUtterance.replace(/\{\s*name\s*\}/g, voice.name || "this voice");
  testUtteranceInput.value = testUtterance;
  testUtteranceBtn.disabled = false;
}

// Create utterances from text with better sentence splitting
function createUtterancesFromText(text) {
  // Use Intl.Segmenter for proper sentence segmentation
  const segmenter = new Intl.Segmenter(languageSelect.value || "en", { 
    granularity: "sentence" 
  });
  
  // Convert segments to array and extract text
  const sentences = Array.from(segmenter.segment(text), 
    ({ segment }) => segment.trim()
  ).filter(Boolean); // Remove any empty strings
  
  // Create utterances from sentences
  return sentences.map((sentence, index) => ({
    id: `utterance-${index}`,
    text: sentence,
    language: languageSelect.value || "en-US"
  }));
}

// Set up event listeners
function setupEventListeners() {
  // Language selection
  languageSelect.addEventListener("change", async () => {
    const languageCode = languageSelect.value;
    
    // Reset voice selection and clear test utterance
    voiceSelect.disabled = false;
    currentVoice = null;
    testUtterance = "";
    testUtteranceInput.value = "";
    testUtteranceBtn.disabled = true;
    
    // Filter voices for the selected language
    filterVoices();
    
    // Get the default voice for the selected language
    if (languageCode) {
      currentVoice = voiceManager.getDefaultVoice(languageCode);
      
      if (currentVoice) {
        try {
          // Set the voice for the navigator
          await navigator.setVoice(currentVoice);
          
          // Update the voice dropdown to reflect the selected voice
          const voiceOption = voiceSelect.querySelector(`option[value="${currentVoice.name}"]`);
          if (voiceOption) {
            voiceOption.selected = true;
          }
          
          // Update the test utterance with the new voice
          updateTestUtterance(currentVoice, languageCode);
          
        } catch (error) {
          console.error("Error setting default voice:", error);
        }
      }
    }
    
    // Load sample text for the selected language
    loadSampleText(languageCode);
    
    updateUI();
  });
  
  // Voice selection
  voiceSelect.addEventListener("change", async () => {
    const selectedVoiceName = voiceSelect.value;
    currentVoice = filteredVoices.find(v => v.name === selectedVoiceName) || null;
    
    if (currentVoice) {
      try {
        // Set the voice for the navigator
        await navigator.setVoice(currentVoice);
        
        // Reload the sample text with the new voice
        const languageCode = languageSelect.value;
        await loadSampleText(languageCode);
        
        // Update the test utterance with the new voice
        updateTestUtterance(currentVoice, languageCode);
      } catch (error) {
        console.error("Error setting voice:", error);
      }
    } else {
      if (testUtteranceBtn) {
        testUtteranceBtn.disabled = true;
      }
    }
    
    updateUI();
  });

  // Test utterance button
  testUtteranceBtn.addEventListener("click", playTestUtterance);

  // Play/Pause button (for sample text)
  playPauseBtn.addEventListener("click", togglePlayback);
  playPauseBtn.disabled = !currentVoice;

  // Stop button (for sample text)
  stopBtn.addEventListener("click", stopPlayback);
  stopBtn.disabled = !currentVoice;

  // Previous utterance button
  prevUtteranceBtn.addEventListener("click", previousUtterance);

  // Next utterance button
  nextUtteranceBtn.addEventListener("click", nextUtterance);

  // Jump to utterance button
  jumpToBtn.addEventListener("click", jumpToUtterance);
  
  // Handle Enter key in jump input
  utteranceIndexInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      jumpToUtterance();
    }
  });
  
  // Track manual changes to jump input
  utteranceIndexInput.addEventListener("input", () => {
    jumpInputUserChanged = true;
  });

  // Update voices when gender filter changes
  genderSelect.addEventListener("change", () => {
    filterVoices();
  });

  // Update voices when offline filter changes
  offlineOnlyCheckbox.addEventListener("change", () => {
    filterVoices();
  });

  // Update UI when voices change
  speechSynthesis.onvoiceschanged = () => {
    if (voiceManager) {
      allVoices = voiceManager.getVoices();
      filterVoices();
    }
  };

  // Update test utterance when language changes
  languageSelect.addEventListener("change", () => {
    if (languageSelect.value) {
      updateTestUtterance(currentVoice, languageSelect.value);
    }
  });
}

// Play test utterance - independent of the navigator
async function playTestUtterance() {
  if (!currentVoice) {
    console.error("No voice selected");
    return;
  }
  
  try {
    // Reset playback controls first
    if (navigator) {
      navigator.stop();
    }
    
    // Get test utterance for the selected language
    let testText = testUtteranceInput.value;
    if (!testText) {
      updateTestUtterance(currentVoice, languageSelect.value);
      testText = testUtteranceInput.value;
    }
    
    // Create a new SpeechSynthesisUtterance
    const utterance = new SpeechSynthesisUtterance(testText);
    
    // Convert the ReadiumSpeechVoice to a native SpeechSynthesisVoice
    const nativeVoice = voiceManager.convertToSpeechSynthesisVoice(currentVoice);
    if (nativeVoice) {
      utterance.voice = nativeVoice;
      utterance.lang = nativeVoice.lang;
    }
    
    // Update UI state
    testUtteranceBtn.disabled = true;
    testUtteranceBtn.textContent = "Playing...";
    
    // Handle when speech ends
    utterance.onend = () => {
      testUtteranceBtn.disabled = false;
      testUtteranceBtn.textContent = "Play Test Utterance";
    };
    
    // Handle errors
    utterance.onerror = (event) => {
      console.error("SpeechSynthesis error:", event);
      testUtteranceBtn.disabled = false;
      testUtteranceBtn.textContent = "Play Test Utterance";
    };
    
    // Speak the utterance directly
    speechSynthesis.speak(utterance);
    
  } catch (error) {
    console.error("Error playing test utterance:", error);
    testUtteranceBtn.textContent = "Play Test Utterance";
    testUtteranceBtn.disabled = false;
  }
}

// Toggle sample text playback
async function togglePlayback() {
  if (!currentVoice) {
    console.error("No voice selected");
    return;
  }

  try {
    const state = navigator.getState();
    if (state === "playing") {
      await navigator.pause();
    } else if (state === "paused") {
      // Use play() to resume from paused state
      await navigator.play();
    } else {
      // Start from beginning if stopped or in an unknown state
      await navigator.jumpTo(0);
      await navigator.play();
    }
  } catch (error) {
    console.error("Error toggling playback:", error);
  }
  
  // Update the UI to reflect the new state
  updateUI();
}

// Stop sample playback
async function stopPlayback() {
  try {
    await navigator.stop();
    clearWordHighlighting();
    playPauseBtn.textContent = "Play Sample";
    updateUI();
  } catch (error) {
    console.error("Error stopping playback:", error);
  }
}

// Go to previous utterance
async function previousUtterance() {
  await navigator.previous();
  updateUI();
}

// Go to next utterance
async function nextUtterance() {
  await navigator.next();
  updateUI();
}

// Jump to a specific utterance
function jumpToUtterance() {
  const totalUtterances = navigator.getContentQueue()?.length || 0;
  
  // Ensure we have a valid input value
  const index = Math.max(0, Math.min(parseInt(utteranceIndexInput.value) - 1, totalUtterances - 1));
  
  if (!isNaN(index) && index >= 0 && index < totalUtterances) {
    clearWordHighlighting();
    navigator.jumpTo(index);
    
    // Update UI to reflect the new position
    if (utteranceIndexInput) {
      utteranceIndexInput.value = index + 1;
    }
    
    // Update total utterances display if needed
    if (totalUtterancesSpan) {
      totalUtterancesSpan.textContent = totalUtterances;
    }
    
    // Clear user changed flag and update position tracking
    jumpInputUserChanged = false;
    lastNavigatorPosition = index + 1;
    
    // Update input to reflect the new position
    utteranceIndexInput.value = lastNavigatorPosition;
  } else {
    // Invalid input, reset to current position
    const currentPos = (navigator.getCurrentUtteranceIndex() || 0) + 1;
    utteranceIndexInput.value = currentPos;
    jumpInputUserChanged = false;
    lastNavigatorPosition = currentPos;
    
    // Ensure total is displayed
    if (totalUtterancesSpan && totalUtterances > 0) {
      totalUtterancesSpan.textContent = totalUtterances;
    }
  }
}

// Clear any previous highlighting
function clearWordHighlighting() {
  if (window.CSS?.highlights) {
    CSS.highlights.clear();
  }
}

// Highlight current word in the sample text
function highlightCurrentWord(charIndex, charLength) {
  // Clear previous highlighting
  clearWordHighlighting();
  
  // Get the current utterance element
  const currentIndex = navigator.getCurrentUtteranceIndex();
  const utteranceElement = document.querySelector(`.utterance[data-utterance-index="${currentIndex}"] .utterance-text`);
  if (!utteranceElement) return;
  
  const text = utteranceElement.textContent;
  if (charIndex < 0 || charIndex >= text.length) return;
  
  // Create a range for the current word
  const range = document.createRange();
  const textNode = utteranceElement.firstChild || utteranceElement;
  
  try {
    range.setStart(textNode, charIndex);
    range.setEnd(textNode, charIndex + charLength);
    
    // Use CSS Highlight API
    const highlight = new Highlight(range);
    CSS.highlights.set("current-word", highlight);
    
    // Update current word highlight
    currentWordHighlight = {
      utteranceIndex: currentIndex,
      charIndex: charIndex,
      charLength: charLength,
      range: range
    };
  } catch (e) {
    console.error("Error highlighting word:", e);
  }
}

// Update UI based on current state
function updateUI() {
  try {
    const state = navigator.getState();
    const currentIndex = navigator.getCurrentUtteranceIndex() || 0;
    const totalUtterances = navigator.getContentQueue()?.length || 0;
    const hasContent = totalUtterances > 0;
    
    // Update playback controls
    if (playPauseBtn) {
      playPauseBtn.disabled = !currentVoice || !hasContent;
      if (state === "playing") {
        playPauseBtn.innerHTML = "⏸️ Pause";
        playPauseBtn.classList.remove("play-state");
        playPauseBtn.classList.add("pause-state");
      } else {
        playPauseBtn.innerHTML = "▶️ Play";
        playPauseBtn.classList.remove("pause-state");
        playPauseBtn.classList.add("play-state");
      }
    }
    
    // Update stop button
    if (stopBtn) {
      stopBtn.disabled = !currentVoice || !hasContent || (state !== "playing" && state !== "paused");
    }
    
    // Update navigation controls
    if (prevUtteranceBtn) {
      prevUtteranceBtn.disabled = !currentVoice || !hasContent || currentIndex <= 0;
    }
    
    if (nextUtteranceBtn) {
      nextUtteranceBtn.disabled = !currentVoice || !hasContent || currentIndex >= totalUtterances - 1;
    }
    
    // Update jump controls
    if (utteranceIndexInput) {
      utteranceIndexInput.disabled = !currentVoice || !hasContent;
      if (!jumpInputUserChanged && hasContent) {
        utteranceIndexInput.value = currentIndex + 1;
      }
    }
    
    if (jumpToBtn) {
      jumpToBtn.disabled = !currentVoice || !hasContent;
    }
    
    // Update test utterance button
    if (testUtteranceBtn) {
      testUtteranceBtn.disabled = !currentVoice;
    }
    
    // Update utterance highlighting and scroll to current position
    if (hasContent) {
      const utteranceElements = document.querySelectorAll(".utterance");
      utteranceElements.forEach((el, i) => {
        if (i === currentIndex) {
          el.classList.add("current");
          el.classList.remove("played");
        } else if (i < currentIndex) {
          el.classList.add("played");
          el.classList.remove("current");
        } else {
          el.classList.remove("current", "played");
        }
      });
    }
  } catch (error) {
    console.error("Error updating UI:", error);
  }
}

// Initialize the application
init();