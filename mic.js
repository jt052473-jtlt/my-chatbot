// ===============================
// MICROPHONE SPEECH‑TO‑TEXT ENGINE
// ===============================

let recognition;
let micActive = false;

// Check browser support
if ("webkitSpeechRecognition" in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    // Match selected language
    function updateMicLanguage() {
        switch (currentLanguage) {
            case "Spanish":
                recognition.lang = "es-ES";
                break;
            case "Chinese":
                recognition.lang = "zh-CN";
                break;
            case "Hindi":
                recognition.lang = "hi-IN";
                break;
            case "Russian":
                recognition.lang = "ru-RU";
                break;
            default:
                recognition.lang = "en-US";
        }
    }

    updateMicLanguage();

    // When speech is recognized
    recognition.onresult = function (event) {
        const text = event.results[0][0].transcript;
        addUserMessage(text);
        processUserResponse(text);
    };

    recognition.onerror = function () {
        micActive = false;
    };

} else {
    console.warn("Speech recognition not supported in this browser.");
}

// ===============================
// MIC BUTTON HANDLER
// ===============================
document.getElementById("toggleVoice").addEventListener("dblclick", () => {
    // Double‑click toggles microphone mode
    micActive = !micActive;

    if (micActive) {
        updateMicLanguage();
        recognition.start();
    } else {
        recognition.stop();
    }
});

// Expose globally
window.updateMicLanguage = updateMicLanguage;
