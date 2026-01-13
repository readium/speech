import { WebSpeechVoiceManager, WebSpeechReadAloudNavigator, chineseVariantMap } from "../build/index.js";

let samples = null;

const highlight = new Highlight();
CSS.highlights.set("readium-speech-highlight", highlight);
let currentWordHighlight = null;

// DOM Elements
const languageSelect = document.getElementById("language-select");
const genderSelect = document.getElementById("gender-select");
const sourceSelect = document.getElementById("source-select");
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
const downloadVoicesBtn = document.getElementById("download-voices-btn");

// Track if user has manually changed the jump input
let jumpInputUserChanged = false;

// State
let voiceManager;
let allVoices = [];
let filteredVoices = [];
let languages = [];
let currentVoice = null;
let testUtterance = "";
let userCustomUtterance = "";
let lastNavigatorPosition = 1;

const speechNavigator = new WebSpeechReadAloudNavigator();

// Set up event listeners for the navigator
speechNavigator.on("boundary", (event) => {
  if (event.detail && event.detail.name === "word") {
    highlightCurrentWord(event.detail.charIndex, event.detail.charLength);
  }
});

speechNavigator.on("start", () => {
  clearWordHighlighting();
  updateUI();
});

speechNavigator.on("pause", updateUI);
speechNavigator.on("resume", updateUI);
speechNavigator.on("stop", () => {
  clearWordHighlighting();
  updateUI();
});

speechNavigator.on("end", updateUI);
speechNavigator.on("error", (event) => {
  console.error("Navigator error:", event.detail);
  updateUI();
});

// Initialize the application
async function init() {
  try {    
    // Initialize the voice manager
    voiceManager = await WebSpeechVoiceManager.initialize();

    const initOptions = {
      excludeNovelty: true,
      excludeVeryLowQuality: true
    };
    
    // Load all available voices
    allVoices = voiceManager.getVoices(initOptions);
    
    // Get languages, excluding novelty and very low quality voices
    const allLanguages = voiceManager.getLanguages(window.navigator.language, initOptions);
    
    // Sort languages with browser's preferred languages first
    languages = allLanguages
      .map(lang => ({
        ...lang,
        language: lang.code,
        name: lang.label
      }));
    
    // Sort using the manager's sortRegions method
    languages = voiceManager.sortVoicesByRegions(languages, window.navigator.languages)
      .map(voice => ({
        code: voice.language,
        label: voice.name,
        count: voice.count
      }));
    
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
    option.textContent = `${lang.label} (${lang.count})`;
    languageSelect.appendChild(option);
  });
}

// Update language counts based on filtered voices
function updateLanguageCounts(voices) {
  // Create a map to count voices per language from the provided voices
  const languageCounts = new Map();
  
  voices.forEach(voice => {
    const langCode = voice.language;
    const baseLang = langCode.split("-")[0];
    languageCounts.set(baseLang, (languageCounts.get(baseLang) || 0) + 1)
  });
  
  // Update the languages array with new counts
  languages = languages.map(lang => ({
    ...lang,
    count: languageCounts.get(lang.code) || 0
  }));
  
  // Update the dropdown text without losing selection
  const options = languageSelect.querySelectorAll("option");
  
  options.forEach(option => {
    if (option.value) {
      const lang = languages.find(l => l.code === option.value);
      if (lang) {
        option.textContent = `${lang.label} (${lang.count})`;
      }
    }
  });
}

/**
 * Format a value for display in the voice properties
 */
function formatValue(value) {
  if (value === undefined || value === null) {
    return { display: "undefined", className: "undefined" };
  }
  
  if (typeof value === "boolean") {
    return { 
      display: value ? "true" : "false", 
      className: `boolean-${value}` 
    };
  }
  
  if (Array.isArray(value)) {
    return { 
      display: value.length > 0 ? value.join(", ") : "[]",
      className: ""
    };
  }
  
  if (typeof value === "object") {
    return { 
      display: JSON.stringify(value, null, 2).replace(/"/g, ""),
      className: "object-value"
    };
  }
  
  return { display: String(value), className: "" };
}

/**
 * Display voice properties in the UI
 */
function displayVoiceProperties(voice) {
  const propertiesContainer = document.getElementById("voice-properties");
  
  if (!voice) {
    propertiesContainer.innerHTML = "<p>No voice selected</p>";
    return;
  }
  
  // Sort properties alphabetically
  const sortedProps = Object.keys(voice).sort();
  
  // Create HTML for each property
  const propertiesHtml = sortedProps.map(prop => {
    // Skip internal/private properties that start with underscore
    if (prop.startsWith("_")) return "";
    
    const value = voice[prop];
    const { display, className } = formatValue(value);
    
    return `
      <div class="voice-property">
        <div class="voice-property-name">${prop}</div>
        <div class="voice-property-value ${className}">${display}</div>
      </div>
    `;
  }).join("");
  
  propertiesContainer.innerHTML = propertiesHtml || "<p>No properties available</p>";
}

// Replace current voice with a new default voice if it gets filtered out
function replaceCurrentVoiceIfFilteredOut(language) {
  const currentVoiceFilteredOut = currentVoice && !filteredVoices.some(voice => voice.voiceURI === currentVoice.voiceURI);
  const needNewVoice = !currentVoice && filteredVoices.length > 0;
  
  if (currentVoiceFilteredOut || needNewVoice) {
    // Current voice was filtered out or no voice selected, pick a new default voice based on language
    if (filteredVoices.length > 0) {
      currentVoice = voiceManager.getDefaultVoice(language, filteredVoices);
      
      if (currentVoice) {
        try {
          speechNavigator.setVoice(currentVoice);
          displayVoiceProperties(currentVoice);
          updateTestUtterance(currentVoice, language);
          
          // Update dropdown to select the new voice
          const voiceOption = voiceSelect.querySelector(`option[value="${currentVoice.name}"]`);
          if (voiceOption) {
            voiceOption.selected = true;
          }
        } catch (error) {
          console.error("Error setting new default voice:", error);
        }
      }
    } else {
      // No voices available after filtering
      currentVoice = null;
      displayVoiceProperties(null);
      updateTestUtterance(null, language);
    }
  }
}

// Filter voices based on current filters
function filterVoices() {
  const language = languageSelect.value;
  const gender = genderSelect.value;
  const source = sourceSelect.value;
  const offlineOnly = offlineOnlyCheckbox.checked;

  const filterOptions = {};
  
  if (gender !== "all") {
    filterOptions.gender = gender;
  }
  
  if (source !== "all") {
    filterOptions.source = source;
  }
  
  if (offlineOnly) {
    filterOptions.offlineOnly = true;
  }
  
  // Filter voices once with all filters except language
  let voicesFilteredExceptLanguage = voiceManager.filterVoices(allVoices, filterOptions);
  
  // Update language counts using the filtered voices
  updateLanguageCounts(voicesFilteredExceptLanguage);
  
  // Now apply language filter if needed
  if (language) {
    filterOptions.languages = language;
    filteredVoices = voiceManager.filterVoices(voicesFilteredExceptLanguage, { languages: language });
  } else {
    filteredVoices = voicesFilteredExceptLanguage;
  }
  
  populateVoiceDropdown(language);

  // Replace current voice if it was filtered out
  replaceCurrentVoiceIfFilteredOut(language);

  updateUI();
}

// Populate the voice dropdown with filtered voices
function populateVoiceDropdown() {
  voiceSelect.innerHTML = "<option value='' disabled selected>Select a voice</option>";
  
  try {
    if (!filteredVoices.length) {
      const option = document.createElement("option");
      option.disabled = true;
      option.textContent = "No voices match the current filters";
      voiceSelect.appendChild(option);
      return;
    }

    // Sort voices with browser's preferred languages first
    const sortedVoices = voiceManager.sortVoicesByRegions([...filteredVoices], window.navigator.languages);

    // Group the sorted voices by region
    const voiceGroups = voiceManager.groupVoices(sortedVoices, "region");

    // Add optgroups for each region
    for (const [region, voices] of Object.entries(voiceGroups)) {
      if (!voices.length) continue;
      
      const countryCode = region.split("-").pop() || region;
      const regionName = new Intl.DisplayNames(window.navigator.languages, { type: "region" }).of(countryCode) || region;
      const optgroup = document.createElement("optgroup");
      optgroup.label = `${getCountryFlag(countryCode)} ${regionName}`;
      
      for (const voice of voices) {
        const option = document.createElement("option");
        option.value = voice.name;
        option.textContent = [
          voice.label || voice.name,
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
    
    // Normalize the language code to lowercase for case-insensitive comparison
    const langLower = languageCode.toLowerCase();
    
    // Function to find a case-insensitive match in the samples
    const findCaseInsensitiveMatch = (lang) => {
      const normalizedLang = lang.toLowerCase();
      const matchingKey = Object.keys(samples).find(key => key.toLowerCase() === normalizedLang);
      return matchingKey ? samples[matchingKey]?.text : null;
    };
    
    // Try direct case-insensitive match first
    let sampleText = findCaseInsensitiveMatch(languageCode);
    
    // Try with Chinese variant mapping if no direct match
    if (!sampleText) {
      const mappedLang = chineseVariantMap[langLower];
      if (mappedLang) {
        sampleText = samples[mappedLang]?.text;
      }
    }
    
    // If still no match, try with base language
    if (!sampleText) {
      const [baseLang] = WebSpeechVoiceManager.extractLangRegionFromBCP47(languageCode);
      const baseLangLower = baseLang.toLowerCase();
      
      // Try case-insensitive match with base language
      sampleText = findCaseInsensitiveMatch(baseLang);
      
      // Try Chinese variant mapping for base language if still no match
      if (!sampleText && chineseVariantMap[baseLangLower]) {
        sampleText = samples[chineseVariantMap[baseLangLower]]?.text;
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
    speechNavigator.loadContent(utterances);
    
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

  // Only update if we don't have custom text
  if (!userCustomUtterance) {
    const language = voice.language || languageCode || "en";
    const baseUtterance = voiceManager.getTestUtterance(language) || 
                        `This is a test of the {name} voice.`;
    testUtterance = baseUtterance.replace(/\{\s*name\s*\}/g, voice.label || voice.name || "this voice");
    testUtteranceInput.value = testUtterance;
  } else {
    // Use the custom text
    testUtterance = userCustomUtterance;
  }
  
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
    language: languageSelect.value || "en"
  }));
}

// Set up event listeners
function setupEventListeners() {
  // Language selection
  languageSelect.addEventListener("change", async () => {
    const baseLanguage = languageSelect.value;
    
    // Reset voice selection
    voiceSelect.disabled = false;
    currentVoice = null;
    
    // Only reset test utterance if there's no custom text
    if (!userCustomUtterance) {
      testUtterance = "";
      testUtteranceInput.value = "";
      testUtteranceBtn.disabled = true;
    }
    
    // Clear voice properties
    displayVoiceProperties(null);
    
    // Filter voices for the selected language
    filterVoices();
    
    // Get the default voice for the selected language using pre-filtered voices
    if (baseLanguage) {
      // Use the full navigator.languages array for proper language preference handling
      const preferredLanguages = [...(window.navigator.languages || [window.navigator.language] || [baseLanguage])];
      
      currentVoice = voiceManager.getDefaultVoice(
        preferredLanguages, 
        filteredVoices.length ? filteredVoices : undefined
      );
      
      if (currentVoice) {
        try {
          // Set the voice for the navigator
          speechNavigator.setVoice(currentVoice);
          
          // Update the voice dropdown to reflect the selected voice
          const voiceOption = voiceSelect.querySelector(`option[value="${currentVoice.name}"]`);
          if (voiceOption) {
            voiceOption.selected = true;
          }
          
          // Display voice properties
          displayVoiceProperties(currentVoice);
          
          // Update the test utterance with the new voice
          updateTestUtterance(currentVoice, baseLanguage);
          
        } catch (error) {
          console.error("Error setting default voice:", error);
        }
      }
    }
    
    // Load sample text using the voice's language code if available, otherwise use the selector's value
    const languageToUse = currentVoice?.language || baseLanguage;
    loadSampleText(languageToUse);
    
    updateUI();
  });
  
  // Voice selection
  voiceSelect.addEventListener("change", async () => {
    const selectedVoiceName = voiceSelect.value;
    currentVoice = filteredVoices.find(v => v.name === selectedVoiceName) || null;
    
    if (currentVoice) {
      try {
        // Set the voice for the navigator
        speechNavigator.setVoice(currentVoice);
        
        // Display voice properties
        displayVoiceProperties(currentVoice);
        
        // Update the test utterance with the new voice
        updateTestUtterance(currentVoice, currentVoice.language || languageSelect.value);
        
        // Load sample text using the voice's language code (fire and forget)
        loadSampleText(currentVoice.language || languageSelect.value);
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

  // Update voices when source filter changes
  sourceSelect.addEventListener("change", () => {
    filterVoices();
  });

  // Update voices when offline filter changes
  offlineOnlyCheckbox.addEventListener("change", () => {
    filterVoices();
  });

  // Update test utterance when language changes
  languageSelect.addEventListener("change", () => {
    if (languageSelect.value) {
      updateTestUtterance(currentVoice, languageSelect.value);
    }
  });

  // Download voices button
  downloadVoicesBtn.addEventListener("click", downloadVoicesAsJson);
  
  // Update custom utterance when user types in the input
  testUtteranceInput.addEventListener("input", (e) => {
    userCustomUtterance = e.target.value.trim();
    testUtterance = userCustomUtterance;
    
    // If user clears the input and we have a current voice, update with default utterance
    if (!userCustomUtterance && currentVoice) {
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
    if (speechNavigator) {
      speechNavigator.stop();
    }
    
    // Get test utterance for the selected language
    let testText = testUtteranceInput.value;
    if (!testText) {
      // If input is empty, generate default and use it
      updateTestUtterance(currentVoice, languageSelect.value);
      testText = testUtteranceInput.value.trim();
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
function togglePlayback() {
  if (!currentVoice) {
    console.error("No voice selected");
    return;
  }

  try {
    const state = speechNavigator.getState();
    if (state === "playing") {
      speechNavigator.pause();
    } else if (state === "paused") {
      // Use play() to resume from paused state
      speechNavigator.play();
    } else {
      // Start from beginning if stopped or in an unknown state
      speechNavigator.jumpTo(0);
      speechNavigator.play();
    }
  } catch (error) {
    console.error("Error toggling playback:", error);
  }
  
  // Update the UI to reflect the new state
  updateUI();
}

// Stop sample playback
function stopPlayback() {
  try {
    speechNavigator.stop();
    clearWordHighlighting();
    playPauseBtn.textContent = "Play Sample";
    updateUI();
  } catch (error) {
    console.error("Error stopping playback:", error);
  }
}

// Go to previous utterance
function previousUtterance() {
  speechNavigator.previous();
  updateUI();
}

// Go to next utterance
function nextUtterance() {
  speechNavigator.next();
  updateUI();
}

// Jump to a specific utterance
function jumpToUtterance() {
  const totalUtterances = speechNavigator.getContentQueue()?.length || 0;
  
  // Ensure we have a valid input value
  const index = Math.max(0, Math.min(parseInt(utteranceIndexInput.value) - 1, totalUtterances - 1));
  
  if (!isNaN(index) && index >= 0 && index < totalUtterances) {
    clearWordHighlighting();
    speechNavigator.jumpTo(index);
    
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
    const currentPos = (speechNavigator.getCurrentUtteranceIndex() || 0) + 1;
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
  const currentIndex = speechNavigator.getCurrentUtteranceIndex();
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
    const state = speechNavigator.getState();
    const currentIndex = speechNavigator.getCurrentUtteranceIndex() || 0;
    const totalUtterances = speechNavigator.getContentQueue()?.length || 0;
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

// Simple function to get current date for filenames
function getCurrentDate() {
  return new Date().toISOString().split("T")[0];
}

// Function to download voices as JSON
function downloadVoicesAsJson() {
  try {
    const voices = window.speechSynthesis.getVoices();
    
    const metadata = {
      timestamp: new Date().toISOString(),
      voicesCount: voices.length
    };
    
    const voicesData = voices.map(voice => ({
      ...voice,
      // Known properties
      voiceURI: voice.voiceURI,
      name: voice.name,
      lang: voice.lang,
      localService: voice.localService,
      default: voice.default
    }));
    
    const exportData = {
      metadata,
      voices: voicesData
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `speech-voices-${getCurrentDate()}.json`.replace(/[^a-z0-9.-]+/gi, "-").toLowerCase();
    
    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  } catch (error) {
    console.error("Error downloading voices data:", error);
    alert("Error downloading voices data. Please check console for details.");
  }
}

// Initialize the application
init().then(() => {
  // If there's a default voice selected after initialization, display its properties
  if (currentVoice) {
    displayVoiceProperties(currentVoice);
  }
});