// ---------------------------------------------------------
// VOICE ENGINE — Supports all 5 languages
// ---------------------------------------------------------

// Map UI language → SpeechSynthesis voice code
const langMap = {
    "English": "en-US",
    "Spanish": "es-ES",
    "Chinese": "zh-CN",
    "Hindi": "hi-IN",
    "Russian": "ru-RU"
};

// Speak text in the selected language
function speakText(text, language) {
    const utterance = new SpeechSynthesisUtterance(text);

    // Pick correct voice code
    const voiceCode = langMap[language] || "en-US";
    utterance.lang = voiceCode;

    // Try to match an actual voice
    const voices = window.speechSynthesis.getVoices();
    const matchedVoice = voices.find(v => v.lang === voiceCode);

    if (matchedVoice) {
        utterance.voice = matchedVoice;
    }

    window.speechSynthesis.speak(utterance);
}

window.speakText = speakText;
