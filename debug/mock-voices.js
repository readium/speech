// Mock window.speechSynthesis.getVoices() for ChromeOS debugging
// Load this script before the main speech library

(async function() {
  // Load the mock voices data
  const response = await fetch("../debug/speech-voices-2026-01-09.json");
  const mockData = await response.json();
  
  // Convert JSON voices to SpeechSynthesisVoice objects
  const mockVoices = mockData.voices.map(voice => ({
    voiceURI: voice.voiceURI,
    name: voice.name,
    lang: voice.lang,
    localService: voice.localService,
    default: voice.default
  }));
  
  // Mock SpeechSynthesisUtterance constructor
  class MockSpeechSynthesisUtterance {
    constructor(text) {
      this.text = text;
      this.voice = null;
      this.lang = null;
      this.pitch = 1;
      this.rate = 1;
      this.volume = 1;
      this.onstart = null;
      this.onend = null;
      this.onerror = null;
      this.onboundary = null;
      this.onmark = null;
      this.onpause = null;
      this.onresume = null;
    }
  }
  
  // Replace SpeechSynthesisUtterance constructor
  if (typeof window !== "undefined") {
    window.SpeechSynthesisUtterance = MockSpeechSynthesisUtterance;
  }
  
  // Create mock speechSynthesis object
  const mockSpeechSynthesis = {
    getVoices: () => mockVoices,
    speak: (utterance) => {
      console.log("Mock speak:", utterance.text);
      
      // Store current utterance for state tracking
      mockSpeechSynthesis.speaking = true;
      mockSpeechSynthesis.pending = false;
      
      // Trigger events after a short delay to simulate real speech
      setTimeout(() => {
        if (utterance.onstart) utterance.onstart();
        
        // Simulate word boundaries (optional, but helpful for testing)
        const words = utterance.text.split(" ");
        let charIndex = 0;
        words.forEach((word, i) => {
          setTimeout(() => {
            if (utterance.onboundary) {
              utterance.onboundary({
                name: "word",
                charIndex: charIndex,
                charLength: word.length
              });
            }
            charIndex += word.length + 1; // +1 for space
          }, i * 200); // 200ms per word
        });
        
        // End after total duration
        const totalDuration = words.length * 200 + 500; // 500ms buffer
        setTimeout(() => {
          mockSpeechSynthesis.speaking = false;
          if (utterance.onend) utterance.onend();
        }, totalDuration);
      }, 100);
    },
    cancel: () => {
      console.log("Mock cancel");
      mockSpeechSynthesis.speaking = false;
      mockSpeechSynthesis.pending = false;
    },
    pause: () => {
      console.log("Mock pause");
      mockSpeechSynthesis.paused = true;
    },
    resume: () => {
      console.log("Mock resume");
      mockSpeechSynthesis.paused = false;
    },
    speaking: false,
    paused: false,
    pending: false,
    onvoiceschanged: null
  };
  
  // Replace the real speechSynthesis with our mock
  Object.defineProperty(window, "speechSynthesis", {
    value: mockSpeechSynthesis,
    writable: true,
    configurable: true
  });
  
  // Trigger onvoiceschanged to simulate voice loading
  setTimeout(() => {
    if (mockSpeechSynthesis.onvoiceschanged) {
      mockSpeechSynthesis.onvoiceschanged();
    }
  }, 100);
  
  console.log(`Loaded ${mockVoices.length} mock voices for ChromeOS debugging`);
})();
