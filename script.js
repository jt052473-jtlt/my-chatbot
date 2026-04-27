/* ---------------------------------------------------
   DOM ELEMENTS
--------------------------------------------------- */
const micButton = document.getElementById("micButton");
const languageSelect = document.getElementById("languageSelect");
const languageSearch = document.getElementById("languageSearch");
const readAloudToggle = document.getElementById("readAloudToggle");
const voiceModeToggle = document.getElementById("voiceModeToggle");
const chat = document.getElementById("chat");
const textInput = document.getElementById("textInput");
const progressBar = document.getElementById("progressBar");
const printBtn = document.getElementById("printBtn");

/* ---------------------------------------------------
   GEORGIA LANGUAGE LIST (ALL 20)
--------------------------------------------------- */
const georgiaLanguages = [
    { code: "en-US", name: "English" },
    { code: "es-US", name: "Spanish" },
    { code: "ko-KR", name: "Korean" },
    { code: "vi-VN", name: "Vietnamese" },
    { code: "zh-CN", name: "Chinese (Mandarin)" },
    { code: "hi-IN", name: "Hindi" },
    { code: "gu-IN", name: "Gujarati" },
    { code: "ar-SA", name: "Arabic" },
    { code: "fr-FR", name: "French" },
    { code: "pt-BR", name: "Portuguese" },
    { code: "ru-RU", name: "Russian" },
    { code: "tl-PH", name: "Tagalog (Filipino)" },
    { code: "am-ET", name: "Amharic" },
    { code: "yo-NG", name: "Yoruba" },
    { code: "de-DE", name: "German" },
    { code: "sw-KE", name: "Swahili" },
    { code: "ja-JP", name: "Japanese" },
    { code: "fa-IR", name: "Persian (Farsi)" },
    { code: "tr-TR", name: "Turkish" },
    { code: "th-TH", name: "Thai" }
];

/* ---------------------------------------------------
   POPULATE DROPDOWN
--------------------------------------------------- */
function populateLanguageDropdown(list) {
    languageSelect.innerHTML = "";
    list.forEach(lang => {
        const option = document.createElement("option");
        option.value = lang.code;
        option.textContent = lang.name;
        languageSelect.appendChild(option);
    });
}
populateLanguageDropdown(georgiaLanguages);

/* ---------------------------------------------------
   SEARCH FILTER
--------------------------------------------------- */
languageSearch.addEventListener("input", () => {
    const query = languageSearch.value.toLowerCase();
    const filtered = georgiaLanguages.filter(lang =>
        lang.name.toLowerCase().includes(query)
    );
    populateLanguageDropdown(filtered);
});

/* ---------------------------------------------------
   INTERVIEW QUESTIONS
--------------------------------------------------- */
const questions = [
    "What is your full name?",
    "What is your date of birth?",
    "What brings you in today?",
    "How long have you been experiencing these symptoms?",
    "Do you have any diagnosed sleep disorders?",
    "Do you snore or has anyone told you that you snore?",
    "Do you wake up feeling rested?",
    "Do you take naps during the day?",
    "Do you consume caffeine? If so, how much?",
    "Do you take any sleep medications?",
    "Do you have any other medical conditions?",
    "Is there anything else you would like to share?"
];

let currentIndex = 0;
let interviewActive = false;
let paused = false;
let lastQuestion = "";

let originalResponses = [];
let translatedResponses = [];

/* ---------------------------------------------------
   SMART B3 TRANSLATION
   Detect → English → Selected Language
--------------------------------------------------- */
async function translateSmart(text, targetLang) {
    // Detect language
    const detectURL = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${encodeURIComponent(text)}`;
    const detectRes = await fetch(detectURL);
    const detectData = await detectRes.json();
    const detectedLang = detectData[2];

    // Translate to English
    const englishURL = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${detectedLang}&tl=en&dt=t&q=${encodeURIComponent(text)}`;
    const englishRes = await fetch(englishURL);
    const englishData = await englishRes.json();
    const english = englishData[0][0][0];

    // Translate to selected language
    const selectedURL = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${detectedLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    const selectedRes = await fetch(selectedURL);
    const selectedData = await selectedRes.json();
    const selected = selectedData[0][0][0];

    return { detectedLang, english, selected };
}

/* ---------------------------------------------------
   PROGRESS BAR
--------------------------------------------------- */
function updateProgressBar() {
    const total = questions.length;
    const answered = Math.min(currentIndex, total);
    const percent = (answered / total) * 100;
    progressBar.style.width = `${percent}%`;

    const startColor = { r: 255, g: 255, b: 255 };
    const endColor = { r: 0, g: 80, b: 200 };

    const t = answered / total;
    const r = Math.round(startColor.r + (endColor.r - startColor.r) * t);
    const g = Math.round(startColor.g + (endColor.g - startColor.g) * t);
    const b = Math.round(startColor.b + (endColor.b - startColor.b) * t);

    progressBar.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}

/* ---------------------------------------------------
   CHAT FUNCTIONS
--------------------------------------------------- */
function addMessage(text, sender) {
    const msg = document.createElement("div");
    msg.className = `message ${sender}`;
    msg.textContent = text;
    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;
}

async function askQuestion() {
    if (currentIndex >= questions.length) {
        addMessage("Interview complete. Thank you.", "bot");
        interviewActive = false;
        updateProgressBar();
        showPrintButton();
        return;
    }

    lastQuestion = questions[currentIndex];

    const translated = await translateSmart(lastQuestion, languageSelect.value);
    addMessage(translated.selected, "bot");
    speak(translated.selected);

    updateProgressBar();
}

/* ---------------------------------------------------
   BUTTON LOGIC
--------------------------------------------------- */
document.getElementById("startBtn").onclick = () => {
    interviewActive = true;
    paused = false;
    currentIndex = 0;
    chat.innerHTML = "";
    originalResponses = [];
    translatedResponses = [];
    hidePrintButton();
    addMessage("Interview started.", "bot");
    updateProgressBar();
    askQuestion();
};

document.getElementById("pauseBtn").onclick = () => {
    if (!interviewActive) return;
    paused = !paused;
    addMessage(paused ? "Interview paused." : "Interview resumed.", "bot");
};

document.getElementById("finishBtn").onclick = () => {
    if (!interviewActive) return;

    const confirmFinish = confirm("Are you sure you want to finish the interview?");

    if (confirmFinish) {
        interviewActive = false;
        addMessage("Interview finished.", "bot");
        updateProgressBar();
        showPrintButton();
    } else {
        addMessage("Returning to the last question.", "bot");
        addMessage(lastQuestion, "bot");
        speak(lastQuestion);
    }
};

document.getElementById("resetBtn").onclick = () => {
    interviewActive = false;
    paused = false;
    currentIndex = 0;
    chat.innerHTML = "";
    originalResponses = [];
    translatedResponses = [];
    hidePrintButton();
    addMessage("Interview reset.", "bot");
    updateProgressBar();
};

document.getElementById("repeatBtn").onclick = () => {
    if (lastQuestion) {
        addMessage(lastQuestion, "bot");
        speak(lastQuestion);
    }
};

document.getElementById("skipBtn").onclick = () => {
    if (!interviewActive || paused) return;
    currentIndex++;
    askQuestion();
};

document.getElementById("sendBtn").onclick = sendText;
textInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendText();
});

/* ---------------------------------------------------
   SEND TEXT (SMART B3 TRANSLATION)
--------------------------------------------------- */
async function sendText() {
    const text = textInput.value.trim();
    if (!text) return;

    addMessage(text, "user");
    textInput.value = "";

    const result = await translateSmart(text, languageSelect.value);

    originalResponses.push(text);
    translatedResponses.push({
        english: result.english,
        selected: result.selected
    });

    if (interviewActive && !paused) {
        currentIndex++;
        askQuestion();
    }
}

/* ---------------------------------------------------
   PRINT SUMMARY
--------------------------------------------------- */
function showPrintButton() {
    printBtn.style.display = "block";
}

function hidePrintButton() {
    printBtn.style.display = "none";
}

printBtn.onclick = () => {
    let summary = "=== Sleep Intake Summary ===\n\n";

    translatedResponses.forEach((resp, i) => {
        summary += `Q${i + 1}: ${questions[i]}\n`;
        summary += `Answer (English): ${resp.english}\n`;
        summary += `Answer (${languageSelect.options[languageSelect.selectedIndex].text}): ${resp.selected}\n`;
        summary += `Original: ${originalResponses[i]}\n\n`;
    });

    alert(summary);
};

/* ---------------------------------------------------
   VOICE SYSTEM
--------------------------------------------------- */
let recognition = null;
let voiceMode = false;
let silenceTimer = null;

function getSoftFemaleVoice(lang) {
    const voices = speechSynthesis.getVoices();
    return voices.find(v => v.lang === lang) || voices[0];
}

function speak(text) {
    if (!readAloudToggle.checked) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = languageSelect.value;
    utter.voice = getSoftFemaleVoice(languageSelect.value);
    utter.rate = 0.95;
    speechSynthesis.speak(utter);
}

function initRecognition() {
    if (!("webkitSpeechRecognition" in window)) {
        addMessage("Voice recognition not supported in this browser.", "bot");
        return;
    }

    recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = languageSelect.value;

    recognition.onstart = () => micButton.classList.add("active");
    recognition.onspeechend = () => startSilenceCountdown();

    recognition.onresult = async (event) => {
        const transcript = event.results[0][0].transcript;
        addMessage(transcript, "user");

        const result = await translateSmart(transcript, languageSelect.value);

        originalResponses.push(transcript);
        translatedResponses.push({
            english: result.english,
            selected: result.selected
        });

        if (interviewActive && !paused) {
            currentIndex++;
            askQuestion();
        }
    };

    recognition.onend = () => {
        if (voiceMode) {
            try { recognition.start(); } catch (e) {}
        } else {
            micButton.classList.remove("active");
        }
    };
}

function startSilenceCountdown() {
    clearTimeout(silenceTimer);
    silenceTimer = setTimeout(() => {
        voiceMode = false;
        voiceModeToggle.checked = false;
        if (recognition) recognition.stop();
        micButton.classList.remove("active");
        addMessage("Voice Mode turned off due to inactivity.", "bot");
    }, 20000);
}

/* ---------------------------------------------------
   MIC TOGGLE
--------------------------------------------------- */
micButton.onclick = () => {
    if (!voiceMode) {
        voiceMode = true;
        voiceModeToggle.checked = true;
        if (!recognition) initRecognition();
        try { recognition.start(); } catch (e) {}
        micButton.classList.add("active");
    } else {
        voiceMode = false;
        voiceModeToggle.checked = false;
        clearTimeout(silenceTimer);
        if (recognition) recognition.stop();
        micButton.classList.remove("active");
    }
};

languageSelect.onchange = () => {
    if (recognition) recognition.lang = languageSelect.value;

    speechSynthesis.cancel();
    setTimeout(() => {
        const testVoice = getSoftFemaleVoice(languageSelect.value);
        const utter = new SpeechSynthesisUtterance("Language updated.");
        utter.lang = languageSelect.value;
        utter.voice = testVoice;
        utter.rate = 0.95;
        if (readAloudToggle.checked) speechSynthesis.speak(utter);
    }, 200);
};

voiceModeToggle.onchange = () => {
    voiceMode = voiceModeToggle.checked;
    if (!voiceMode) {
        clearTimeout(silenceTimer);
        if (recognition) recognition.stop();
        micButton.classList.remove("active");
    } else {
        if (!recognition) initRecognition();
        try { recognition.start(); } catch (e) {}
        micButton.classList.add("active");
    }
};

/* ---------------------------------------------------
   INIT
--------------------------------------------------- */
updateProgressBar();
