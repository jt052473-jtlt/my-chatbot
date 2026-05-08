// ------------------------------------------------------
// VOICE ENGINE (TEXT‑TO‑SPEECH)
// Handles:
// - Read Aloud toggle
// - Language‑specific voices
// - Smooth cancellation
// ------------------------------------------------------

let currentUtterance = null;

// Speak text using the correct language voice
function speakText(text) {
    const toggle = document.getElementById("readAloudToggle");
    if (!toggle || !toggle.checked) return;

    const langConfig = translations[currentLanguage];
    const voiceCode = langConfig.voiceCode || "en-US";

    // Stop any previous speech
    window.speechSynthesis.cancel();

    currentUtterance = new SpeechSynthesisUtterance(text);
    currentUtterance.lang = voiceCode;

    // Try to match a voice
    const voices = window.speechSynthesis.getVoices();
    const match = voices.find(v => v.lang === voiceCode);
    if (match) currentUtterance.voice = match;

    window.speechSynthesis.speak(currentUtterance);
}

// Stop speaking immediately
function stopSpeaking() {
    window.speechSynthesis.cancel();
}

// Re‑speak last bot message (for Repeat button)
function repeatLastBotMessage() {
    const chat = document.getElementById("chatWindow");
    const messages = chat.querySelectorAll(".bot-message");
    if (messages.length === 0) return;

    const last = messages[messages.length - 1].textContent;
    speakText(last);
}

// Auto‑speak bot messages
function handleReadAloud(text) {
    speakText(text);
}

// Expose globally
window.speakText = speakText;
window.stopSpeaking = stopSpeaking;
window.repeatLastBotMessage = repeatLastBotMessage;
window.handleReadAloud = handleReadAloud;

// Load voices (Chrome requires async load)
window.speechSynthesis.onvoiceschanged = () => {};
