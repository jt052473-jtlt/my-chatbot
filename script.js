// Demo overlay fade-out
const demoOverlay = document.getElementById("demoOverlay");
const startDemoBtn = document.getElementById("startDemoBtn");
startDemoBtn.addEventListener("click", () => {
    demoOverlay.classList.add("hidden");
    setTimeout(() => (demoOverlay.style.display = "none"), 500);
});

// Elements
const chatWindow = document.getElementById("chatWindow");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const finishBtn = document.getElementById("finishBtn");
const repeatBtn = document.getElementById("repeatBtn");
const skipBtn = document.getElementById("skipBtn");
const resetBtn = document.getElementById("resetBtn");

const micBtn = document.getElementById("micBtn");
const readAloudToggle = document.getElementById("readAloudToggle");
const voiceModeToggle = document.getElementById("voiceModeToggle");
const languageSelect = document.getElementById("languageSelect");
const languageSearch = document.getElementById("languageSearch");

// State
let readAloudEnabled = false;
let voiceModeEnabled = false;
let isListening = false;
let currentQuestionIndex = 0;
let activeLanguage = "English";
let transcript = [];

// Top 10 languages
const topLanguages = [
    "English",
    "Spanish",
    "French",
    "Chinese",
    "Arabic",
    "Hindi",
    "Portuguese",
    "Bengali",
    "Russian",
    "German"
];

// Simple language -> locale map for TTS
const languageLocaleMap = {
    English: "en",
    Spanish: "es",
    French: "fr",
    Chinese: "zh",
    Arabic: "ar",
    Hindi: "hi",
    Portuguese: "pt",
    Bengali: "bn",
    Russian: "ru",
    German: "de"
};

// Populate dropdown
function loadLanguages(list) {
    languageSelect.innerHTML = "";
    list.forEach(lang => {
        const opt = document.createElement("option");
        opt.value = lang;
        opt.textContent = lang;
        languageSelect.appendChild(opt);
    });
}
loadLanguages(topLanguages);

// Language change
languageSelect.addEventListener("change", () => {
    activeLanguage = languageSelect.value;
    console.log("Language changed to:", activeLanguage);
});

// Language search
languageSearch.addEventListener("input", () => {
    const q = languageSearch.value.toLowerCase();
    const filtered = topLanguages.filter(l => l.toLowerCase().includes(q));

    languageSelect.innerHTML = "";
    filtered.forEach(lang => {
        const opt = document.createElement("option");
        opt.value = lang;
        opt.textContent = lang;
        languageSelect.appendChild(opt);
    });

    if (filtered.length > 0) {
        languageSelect.value = filtered[0];
        activeLanguage = filtered[0];
    }
});

// Mic + voice mode
micBtn.addEventListener("click", () => {
    isListening = !isListening;
    console.log("Mic listening:", isListening);
    // Keep visual state tied to Voice Mode; optional to also toggle here:
    micBtn.classList.toggle("active", voiceModeEnabled || isListening);
});

voiceModeToggle.addEventListener("change", () => {
    voiceModeEnabled = voiceModeToggle.checked;
    if (voiceModeEnabled) {
        micBtn.classList.add("active");
        isListening = true;
    } else {
        micBtn.classList.remove("active");
        isListening = false;
    }
    console.log("Voice mode:", voiceModeEnabled, "Listening:", isListening);
});

// Read aloud toggle
readAloudToggle.addEventListener("change", () => {
    readAloudEnabled = readAloudToggle.checked;
});

// Progress bar
function updateProgress() {
    const percent = (currentQuestionIndex / questions.length) * 100;
    document.getElementById("progressBar").style.width = percent + "%";
}

// Mock translation function
function translateText(text) {
    if (activeLanguage === "English") return text;
    return `[${activeLanguage}] ${text}`;
}

// TTS
function speakText(text) {
    if (!readAloudEnabled) return;
    if (!("speechSynthesis" in window)) return;

    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(text);

    const langCode = languageLocaleMap[activeLanguage] || "en";
    utter.lang = langCode;

    const voices = synth.getVoices();
    const match = voices.find(v => v.lang.toLowerCase().startsWith(langCode));
    if (match) utter.voice = match;

    synth.speak(utter);
}

// Chat helpers
function addMessage(role, text) {
    const originalText = text;
    const translatedText = translateText(text);

    const msg = document.createElement("div");
    msg.classList.add("message", role);
    msg.textContent = translatedText;
    chatWindow.appendChild(msg);
    chatWindow.scrollTop = chatWindow.scrollHeight;

    transcript.push({
        role,
        originalText,
        translatedText,
        timestamp: new Date().toISOString()
    });

    if (role === "bot" || role === "system") {
        speakText(translatedText);
    }
}

// Questions
const questions = [
    "Welcome to the Sleep Intake Assistant. What is your full name?",
    "What is your date of birth?",
    "What time do you usually go to bed?",
    "How long does it take you to fall asleep?",
    "How many times do you wake up during the night?",
    "What time do you usually wake up?",
    "Do you snore loudly?",
    "Has anyone observed you stop breathing during sleep?",
    "Do you feel rested when you wake up?",
    "Anything else you’d like to share about your sleep?"
];

// Ask question
function askQuestion() {
    if (currentQuestionIndex < questions.length) {
        addMessage("bot", questions[currentQuestionIndex]);
        updateProgress();
    } else {
        addMessage("bot", "Thank you. Intake complete.");
        updateProgress();
    }
}

// Start
startBtn.addEventListener("click", () => {
    if (currentQuestionIndex === 0 && chatWindow.children.length === 0) {
        askQuestion();
    }
});

// Send
sendBtn.addEventListener("click", () => {
    const text = userInput.value.trim();
    if (!text) return;

    addMessage("user", text);
    userInput.value = "";

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        askQuestion();
    } else {
        addMessage("bot", "Thank you. Intake complete.");
        updateProgress();
    }
});

// Enter key
userInput.addEventListener("keydown", e => {
    if (e.key === "Enter") sendBtn.click();
});

// Controls
pauseBtn.addEventListener("click", () => {
    addMessage("system", "Intake paused.");
});

finishBtn.addEventListener("click", () => {
    addMessage("system", "Intake finished early.");
    currentQuestionIndex = questions.length;
    updateProgress();
    generatePdfFlow();
});

repeatBtn.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        addMessage("system", "Repeating previous question.");
        askQuestion();
    }
});

skipBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    addMessage("system", "Question skipped.");
    if (currentQuestionIndex < questions.length) {
        askQuestion();
    } else {
        addMessage("bot", "Thank you. Intake complete.");
        updateProgress();
    }
});

resetBtn.addEventListener("click", () => {
    chatWindow.innerHTML = "";
    currentQuestionIndex = 0;
    transcript = [];
    updateProgress();
    addMessage("system", "Intake reset.");
});

// PDF export flow
function generatePdfFlow() {
    if (!window.jspdf || !window.jspdf.jsPDF) {
        console.error("jsPDF not available");
        return;
    }

    const useTranslated = window.confirm(
        "Generate PDF in selected language?\nOK = Translated, Cancel = English"
    );

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let y = 10;

    doc.setFontSize(16);
    doc.text("Sleep Intake Transcript", 10, y);
    y += 8;

    doc.setFontSize(10);
    doc.text(`Language: ${activeLanguage}`, 10, y);
    y += 6;

    const now = new Date();
    doc.text(`Exported: ${now.toLocaleString()}`, 10, y);
    y += 8;

    doc.setFontSize(11);

    transcript.forEach(entry => {
        const roleLabel =
            entry.role === "bot"
                ? "Bot"
                : entry.role === "user"
                ? "User"
                : "System";

        const text = useTranslated ? entry.translatedText : entry.originalText;
        const line = `${roleLabel}: ${text}`;

        const split = doc.splitTextToSize(line, 180);

        if (y + split.length * 6 > 280) {
            doc.addPage();
            y = 10;
        }

        doc.text(split, 10, y);
        y += split.length * 6;
    });

    doc.save("sleep-intake-transcript.pdf");
}
