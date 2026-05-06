// voiceEngine.js
// Handles voice input and optional voice output for the Clinical Intake Demo

let recognition = null;
let synth = window.speechSynthesis;

// Initialize speech recognition
function initVoice() {
    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        console.warn("Speech recognition not supported in this browser.");
        return;
    }

    recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.addEventListener("result", (event) => {
        const transcript = event.results[0][0].transcript;
        document.getElementById("responseInput").value = transcript;
    });

    recognition.addEventListener("end", () => {
        console.log("Voice input ended.");
    });
}

// Start listening
function startListening() {
    if (recognition) {
        recognition.start();
    }
}

// Optional: speak text aloud
function speak(text, lang = "en-US") {
    if (!synth) return;

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = lang;
    synth.speak(utter);
}

export { initVoice, startListening, speak };
