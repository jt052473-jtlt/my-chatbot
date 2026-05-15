/* ------------------------------------------------------
   MIC HANDLING — Speech Recognition Controller
   (Aligned, cleaned, same logic, same names)
------------------------------------------------------ */

let recognition;
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
    recognition.lang = currentLanguage || "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.trim();
        addUserMessage(transcript);
        processUserResponse(transcript);
    };

    recognition.onerror = () => {
        isListening = false;
        updateMicButton(false);
    };

    recognition.onend = () => {
        isListening = false;
        updateMicButton(false);
    };
}

/* ------------------------------------------------------
   START / STOP LISTENING
------------------------------------------------------ */
function toggleMic() {
    if (!recognition) return;

    if (!isListening) {
        isListening = true;
        updateMicButton(true);
        recognition.start();
    } else {
        isListening = false;
        updateMicButton(false);
        recognition.stop();
    }
}

/* ------------------------------------------------------
   UPDATE MIC BUTTON UI
------------------------------------------------------ */
function updateMicButton(active) {
    const micBtn = document.getElementById("micBtn");

    if (!micBtn) return;

    if (active) {
        micBtn.style.background = "#dbeafe";
        micBtn.style.borderColor = "#60a5fa";
    } else {
        micBtn.style.background = "#ffffff";
        micBtn.style.borderColor = "#d1d5db";
    }
}

/* ------------------------------------------------------
   EXPORT
------------------------------------------------------ */
window.initMic = initMic;
window.toggleMic = toggleMic;
window.updateMicButton = updateMicButton;
