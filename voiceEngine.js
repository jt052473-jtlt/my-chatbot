// ===============================
// VOICE ENGINE
// Handles text‑to‑speech output
// ===============================

let speaking = false;

// Speak text using browser speech synthesis
function speakText(text) {
    if (!window.speechSynthesis) return;

    // Stop any current speech
    window.speechSynthesis.cancel();

    const utter = new SpeechSynthesisUtterance(text);

    // Match selected language
    switch (currentLanguage) {
        case "Spanish":
            utter.lang = "es-ES";
            break;
        case "Chinese":
            utter.lang = "zh-CN";
            break;
        case "Hindi":
            utter.lang = "hi-IN";
            break;
        case "Russian":
            utter.lang = "ru-RU";
            break;
        default:
            utter.lang = "en-US";
    }

    speaking = true;

    utter.onend = () => {
        speaking = false;
    };

    window.speechSynthesis.speak(utter);
}

// Stop speaking
function stopSpeaking() {
    if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
    }
    speaking = false;
}

// Toggle voice mode button
document.getElementById("toggleVoice").addEventListener("click", () => {
    const ui = translations[currentLanguage].ui;

    speaking = !speaking;

    if (!speaking) {
        stopSpeaking();
        document.getElementById("toggleVoice").textContent = ui.voiceMode;
    } else {
        document.getElementById("toggleVoice").textContent = ui.readAloud;
    }
});

// Expose globally
window.speakText = speakText;
window.stopSpeaking = stopSpeaking;
