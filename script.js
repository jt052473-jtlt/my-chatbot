// ======================================================
// GLOBAL LANGUAGE STATE
// ======================================================
let currentLanguage = "en";

// ======================================================
// INITIALIZE ON PAGE LOAD
// ======================================================
document.addEventListener("DOMContentLoaded", () => {
    const langSelect = document.getElementById("languageSelect");

    // Set default language
    langSelect.value = "en";

    // Apply initial translations
    applyTranslations("en");

    // When user changes language
    langSelect.addEventListener("change", (e) => {
        currentLanguage = e.target.value;
        applyTranslations(currentLanguage);
    });

    // Start Demo button
    document.getElementById("startDemoBtn").addEventListener("click", () => {
        document.getElementById("startDemoOverlay").style.display = "none";
        startDemo();
    });

    // Guided Tour button
    document.getElementById("tourBtn").addEventListener("click", () => {
        startGuidedTour();
    });
});

// ======================================================
// APPLY TRANSLATIONS TO ALL UI ELEMENTS
// ======================================================
function applyTranslations(lang) {
    const t = translations[lang];

    if (!t) return;

    // RTL support
    document.body.dir = t.direction || "ltr";

    // Start Demo Overlay
    document.getElementById("demoTitle").textContent = t.demoTitle;
    document.getElementById("demoIntroText").textContent = t.demoIntroText;
    document.getElementById("startDemoBtn").textContent = t.startDemoBtn;
    document.getElementById("skipDemoBtn").textContent = t.skipDemoBtn;

    // App Header
    document.getElementById("appTitle").textContent = t.demoTitle;

    // Settings Row
    document.getElementById("tourBtn").textContent = t.tourBtn;
    document.getElementById("voiceBtn").textContent = t.voiceBtn;
    document.getElementById("readAloudBtn").textContent = t.readAloudBtn;

    // Input Area
    document.getElementById("sendBtn").textContent = t.sendBtn;
    document.getElementById("userInput").placeholder =
        lang === "ar" ? "اكتب رسالتك..." :
        lang === "zh-CN" ? "输入您的消息..." :
        lang === "zh-TW" ? "輸入您的訊息..." :
        "Type your message...";
}

// ======================================================
// START DEMO (FIRST BOT MESSAGE)
// ======================================================
function startDemo() {
    const t = translations[currentLanguage];

    addBotMessage(
        t.questions.reasonForVisit
    );
}

// ======================================================
// CHAT WINDOW HELPERS
// ======================================================
function addBotMessage(text) {
    const chat = document.getElementById("chatWindow");
    const msg = document.createElement("div");
    msg.className = "bot-message";
    msg.textContent = text;
    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;

    // Read Aloud automatically uses correct language
    speakText(text);
}

function addUserMessage(text) {
    const chat = document.getElementById("chatWindow");
    const msg = document.createElement("div");
    msg.className = "user-message";
    msg.textContent = text;
    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;
}

// ======================================================
// HANDLE USER INPUT
// ======================================================
document.getElementById("sendBtn").addEventListener("click", handleUserInput);
document.getElementById("userInput").addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleUserInput();
});

let questionIndex = 0;
const questionOrder = [
    "reasonForVisit",
    "symptoms",
    "duration",
    "medications",
    "allergies",
    "history"
];

function handleUserInput() {
    const input = document.getElementById("userInput");
    const text = input.value.trim();
    if (!text) return;

    addUserMessage(text);
    input.value = "";

    const t = translations[currentLanguage];

    // Move to next question
    questionIndex++;

    if (questionIndex < questionOrder.length) {
        const nextKey = questionOrder[questionIndex];
        addBotMessage(t.questions[nextKey]);
    } else {
        showSummary();
    }
}

// ======================================================
// SUMMARY
// ======================================================
function showSummary() {
    const t = translations[currentLanguage];

    addBotMessage(t.summaryTitle);
    addBotMessage(t.summaryComplete);
}

// ======================================================
// READ ALOUD (TEXT-TO-SPEECH)
// ======================================================
function speakText(text) {
    const utter = new SpeechSynthesisUtterance(text);

    // Match language voice
    utter.lang = getVoiceCode(currentLanguage);

    speechSynthesis.speak(utter);
}

function getVoiceCode(lang) {
    switch (lang) {
        case "es": return "es-ES";
        case "zh-CN": return "zh-CN";
        case "zh-TW": return "zh-TW";
        case "tl": return "tl-PH";
        case "vi": return "vi-VN";
        case "ar": return "ar-SA";
        case "fr": return "fr-FR";
        case "ko": return "ko-KR";
        case "ru": return "ru-RU";
        default: return "en-US";
    }
}

// ======================================================
// VOICE MODE (SPEECH RECOGNITION)
// ======================================================
document.getElementById("voiceBtn").addEventListener("click", () => {
    startVoiceRecognition();
});

function startVoiceRecognition() {
    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        alert("Speech recognition not supported.");
        return;
    }

    const recog = new SpeechRecognition();
    recog.lang = getVoiceCode(currentLanguage);
    recog.interimResults = false;

    recog.onresult = (event) => {
        const text = event.results[0][0].transcript;
        document.getElementById("userInput").value = text;
        handleUserInput();
    };

    recog.start();
}
