/* ------------------------------------------------------
   MIC ENGINE — Handles speech recognition for Voice Mode
------------------------------------------------------ */

let recognition = null;
let isListening = false;

/* ------------------------------------------------------
   INITIALIZE SPEECH RECOGNITION
------------------------------------------------------ */
function initMic() {
    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        console.warn("Speech Recognition not supported in this browser.");
        return;
    }

    recognition = new SpeechRecognition();
    recognition.interimResults = false;
    recognition.continuous = false;

    const langMap = {
        "English": "en-US",
        "Spanish": "es-ES",
        "Chinese": "zh-CN",
        "Hindi": "hi-IN",
        "Russian": "ru-RU"
    };

    recognition.lang = langMap[currentLanguage] || "en-US";

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

/* ------------------------------------------------------
   START LISTENING
------------------------------------------------------ */
function startListening() {
    if (!recognition) initMic();
    if (!recognition) return;

    isListening = true;
    updateMicButton();

    recognition.start();
}

/* ------------------------------------------------------
   STOP LISTENING
------------------------------------------------------ */
function stopListening() {
    if (recognition && isListening) {
        recognition.stop();
    }
    isListening = false;
    updateMicButton();
}

/* ------------------------------------------------------
   MIC BUTTON UI
------------------------------------------------------ */
function updateMicButton() {
    const btn = document.getElementById("micBtn");

    if (isListening) {
        btn.style.background = "#ffcccc";
        btn.textContent = "🎙️";
    } else {
        btn.style.background = "white";
        btn.textContent = "🎤";
    }
}

/* ------------------------------------------------------
   MIC BUTTON CLICK HANDLER
------------------------------------------------------ */
document.getElementById("micBtn").addEventListener("click", () => {
    if (isListening) {
        stopListening();
    } else {
        startListening();
    }
});

/* ------------------------------------------------------
   EXPORT
------------------------------------------------------ */
window.startListening = startListening;
window.stopListening = stopListening;
window.initMic = initMic;
