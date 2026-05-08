// ------------------------------------------------------
// MICROPHONE + VOICE MODE CONTROLLER
// ------------------------------------------------------

let recognition = null;
let isListening = false;

// Initialize speech recognition
function initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        console.warn("Speech recognition not supported in this browser.");
        return;
    }

    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    // Set language based on current selection
    const langConfig = translations[currentLanguage];
    if (langConfig && langConfig.voiceCode) {
        recognition.lang = langConfig.voiceCode;
    }

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.trim();
        addUserMessage(transcript);
        processUserResponse(transcript);
    };

    recognition.onerror = (event) => {
        console.warn("Speech recognition error:", event.error);
        isListening = false;
        updateMicButton();
    };

    recognition.onend = () => {
        isListening = false;
        updateMicButton();
    };
}

// Toggle mic
function toggleMic() {
    if (!recognition) {
        initSpeechRecognition();
    }

    if (!recognition) {
        alert("Your browser does not support voice input.");
        return;
    }

    if (isListening) {
        recognition.stop();
        isListening = false;
    } else {
        recognition.start();
        isListening = true;
    }

    updateMicButton();
}

// Update mic button UI
function updateMicButton() {
    const micBtn = document.getElementById("micBtn");
    if (!micBtn) return;

    micBtn.style.background = isListening ? "#ffcccc" : "white";
}

// Attach mic button listener
document.addEventListener("DOMContentLoaded", () => {
    const micBtn = document.getElementById("micBtn");
    if (micBtn) {
        micBtn.addEventListener("click", toggleMic);
    }
});
