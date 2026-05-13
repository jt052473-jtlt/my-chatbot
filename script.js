/* ------------------------------------------------------ 
   GLOBAL STATE 
------------------------------------------------------ */
let currentLanguage = "English";
let currentStep = 0;
let isPaused = false;

/* ------------------------------------------------------ 
   INITIALIZATION 
------------------------------------------------------ */
document.addEventListener("DOMContentLoaded", () => {
    populateLanguageSelectors();
    setupEventListeners();
    if (typeof updateUIForLanguage === "function") updateUIForLanguage();
});

function populateLanguageSelectors() {
    const langs = ["English", "Spanish", "Chinese", "Hindi", "Russian"];
    const introSelect = document.getElementById("introLanguageSelect");
    const mainSelect = document.getElementById("languageSelect");

    if (introSelect && mainSelect) {
        introSelect.innerHTML = "";
        mainSelect.innerHTML = "";
        langs.forEach(lang => {
            introSelect.add(new Option(lang, lang));
            mainSelect.add(new Option(lang, lang));
        });
        introSelect.value = currentLanguage;
        mainSelect.value = currentLanguage;
    }
}

function setupEventListeners() {
    // Start Demo
    document.getElementById("startDemoBtn").addEventListener("click", startDemo);

    // Chat Inputs
    document.getElementById("sendBtn").addEventListener("click", handleInput);
    document.getElementById("userInput").addEventListener("keypress", (e) => {
        if (e.key === "Enter") handleInput();
    });

    // Language Sync
    document.getElementById("introLanguageSelect").addEventListener("change", (e) => {
        currentLanguage = e.target.value;
        document.getElementById("languageSelect").value = currentLanguage;
        if (typeof updateUIForLanguage === "function") updateUIForLanguage();
    });

    document.getElementById("languageSelect").addEventListener("change", (e) => {
        currentLanguage = e.target.value;
        if (typeof updateUIForLanguage === "function") updateUIForLanguage();
    });

    // EXIT BUTTON FIX: Listen at the document level
    document.addEventListener("click", (e) => {
        if (e.target && (e.target.id === "tourExitBtn" || e.target.closest("#tourExitBtn"))) {
            e.preventDefault();
            if (typeof endTour === "function") endTour();
        }
    });
}

function startDemo() {
    const overlay = document.getElementById("demoOverlay");
    if (overlay) {
        overlay.style.display = "none";
    }
    if (typeof showQuestion === "function") showQuestion();
    if (typeof startTour === "function") startTour();
}

function handleInput() {
    const inputField = document.getElementById("userInput");
    const text = inputField.value.trim();
    if (text !== "") {
        if (typeof addUserMessage === "function") addUserMessage(text);
        inputField.value = "";
        if (typeof processUserResponse === "function") processUserResponse(text);
    }
}
