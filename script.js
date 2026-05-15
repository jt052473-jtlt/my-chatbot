// ------------------------------
// GLOBAL STATE
// ------------------------------
let currentLanguage = "english";
let recognition = null;

// ------------------------------
// INITIALIZATION
// ------------------------------
window.addEventListener("DOMContentLoaded", () => {
    setupEventListeners();
    populateLanguageDropdown();
});

// ------------------------------
// POPULATE LANGUAGE DROPDOWN
// ------------------------------
function populateLanguageDropdown() {
    const select = document.getElementById("languageSelect");
    const introSelect = document.getElementById("introLanguageSelect");

    Object.keys(translations).forEach(lang => {
        const opt = document.createElement("option");
        opt.value = lang;
        opt.textContent = translations[lang].name;
        select.appendChild(opt);

        const opt2 = document.createElement("option");
        opt2.value = lang;
        opt2.textContent = translations[lang].name;
        introSelect.appendChild(opt2);
    });

    select.value = currentLanguage;
    introSelect.value = currentLanguage;
}

// ------------------------------
// SEARCH LANGUAGE FILTER
// ------------------------------
function filterLanguages() {
    const search = document.getElementById("languageSearch").value.toLowerCase();
    const select = document.getElementById("languageSelect");

    let matched = null;

    Array.from(select.options).forEach(opt => {
        const match = opt.textContent.toLowerCase().includes(search);
        opt.style.display = match ? "block" : "none";

        if (opt.textContent.toLowerCase() === search) {
            matched = opt.value;
        }
    });

    if (matched) {
        select.value = matched;
        currentLanguage = matched;
        updateUIForLanguage();
    }
}

// ------------------------------
// EVENT LISTENERS
// ------------------------------
function setupEventListeners() {
    document.getElementById("languageSearch").addEventListener("input", filterLanguages);

    document.getElementById("languageSelect").addEventListener("change", (e) => {
        currentLanguage = e.target.value;
        updateUIForLanguage();
    });

    // Voice Mode checkbox
    document.getElementById("voiceModeToggle").addEventListener("change", (e) => {
        const mic = document.getElementById("micBtn");

        if (e.target.checked) {
            mic.classList.add("active");
            startListening();
        } else {
            mic.classList.remove("active");
            stopListening();
        }
    });

    // Mic button toggle
    document.getElementById("micBtn").addEventListener("click", () => {
        const mic = document.getElementById("micBtn");
        const toggle = document.getElementById("voiceModeToggle");

        if (mic.classList.contains("active")) {
            mic.classList.remove("active");
            toggle.checked = false;
            stopListening();
        } else {
            mic.classList.add("active");
            toggle.checked = true;
            startListening();
        }
    });

    // Chat send button
    document.getElementById("sendBtn").addEventListener("click", sendUserMessage);

    // Enter key
    document.getElementById("userInput").addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendUserMessage();
    });
}

// ------------------------------
// UPDATE UI FOR LANGUAGE
// ------------------------------
function updateUIForLanguage() {
    // You can expand this if needed
}

// ------------------------------
// SEND USER MESSAGE
// ------------------------------
function sendUserMessage() {
    const input = document.getElementById("userInput");
    const text = input.value.trim();
    if (!text) return;

    addUserMessage(text);
    processUserResponse(text);
    input.value = "";
}

// ------------------------------
// CHAT WINDOW HELPERS
// ------------------------------
function addUserMessage(text) {
    const chat = document.getElementById("chatWindow");
    const div = document.createElement("div");
    div.className = "user-message";
    div.textContent = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

function addBotMessage(text) {
    const chat = document.getElementById("chatWindow");
    const div = document.createElement("div");
    div.className = "bot-message";
    div.textContent = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

// ------------------------------
// SPEECH RECOGNITION
// ------------------------------
function startListening() {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
        alert("Speech recognition not supported in this browser.");
        return;
    }

    if (!recognition) {
        recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = translations[currentLanguage].code || "en-US";
        recognition.continuous = false;
    }

    recognition.start();

    recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        addUserMessage(text);
        processUserResponse(text);
    };

    recognition.onerror = () => {
        stopListening();
    };
}

function stopListening() {
    if (recognition) recognition.stop();
}

// ------------------------------
// PROCESS USER RESPONSE
// ------------------------------
function processUserResponse(text) {
    // This connects to interviewFlow2.js
    handleUserInput(text);
}
