// -----------------------------------------
// VOICE ENGINE — CLEAN, MODERN, FLUENT STYLE
// -----------------------------------------

let recognition = null;

// Map language keys to speech recognition codes
const speechLangMap = {
    english: "en-US",
    spanish: "es-ES",
    french: "fr-FR",
    german: "de-DE",
    italian: "it-IT",
    portuguese: "pt-PT",
    chinese: "zh-CN",
    japanese: "ja-JP",
    korean: "ko-KR"
};

// -----------------------------------------
// START LISTENING
// -----------------------------------------
function startListening() {
    const mic = document.getElementById("micBtn");

    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
        alert("Speech recognition is not supported in this browser.");
        mic.classList.remove("active");
        document.getElementById("voiceModeToggle").checked = false;
        return;
    }

    if (!recognition) {
        recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.continuous = false;
        recognition.interimResults = false;
    }

    // Set language based on selected UI language
    recognition.lang = speechLangMap[currentLanguage] || "en-US";

    recognition.start();

    recognition.onstart = () => {
        mic.classList.add("active");
    };

    recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        addUserMessage(text);
        processUserResponse(text);
    };

    recognition.onerror = () => {
        stopListening();
    };

    recognition.onend = () => {
        // If voice mode is still checked, restart listening
        if (document.getElementById("voiceModeToggle").checked) {
            recognition.start();
        }
    };
}

// -----------------------------------------
// STOP LISTENING
// -----------------------------------------
function stopListening() {
    const mic = document.getElementById("micBtn");

    if (recognition) {
        recognition.onend = null; // prevent auto-restart
        recognition.stop();
    }

    mic.classList.remove("active");
}
