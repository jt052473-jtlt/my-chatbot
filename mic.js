let recognition = null;
let isListening = false;

function initMic() {
    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        console.warn("Speech Recognition not supported.");
        return;
    }

    recognition = new SpeechRecognition();
    recognition.interimResults = false;
    recognition.continuous = false;

    const langMap = {
        English: "en-US",
        Spanish: "es-ES",
        Chinese: "zh-CN",
        Hindi: "hi-IN",
        Russian: "ru-RU"
    };

    recognition.lang = langMap[currentLanguage] || "en-US";

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.trim();
        addUserMessage(transcript);
        processUserResponse(transcript);
    };

    recognition.onerror = () => {
        isListening = false;
        updateMicButton();
    };

    recognition.onend = () => {
        isListening = false;
        updateMicButton();
    };
}

function startListening() {
    if (!recognition) initMic();
    if (!recognition) return;

    isListening = true;
    updateMicButton();
    recognition.start();
}

function stopListening() {
    if (recognition && isListening) {
        recognition.stop();
    }
    isListening = false;
    updateMicButton();
}

function updateMicButton() {
    const btn = document.getElement
