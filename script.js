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
    // 1. Populate the language selectors first
    populateLanguageSelectors();
    
    // 2. Setup all button listeners
    setupEventListeners();
    
    // 3. Initialize the UI text (translations)
    if (typeof updateUIForLanguage === "function") updateUIForLanguage();
});

/* ------------------------------------------------------ 
   POPULATE DROPDOWNS (Restores missing options)
------------------------------------------------------ */
function populateLanguageSelectors() {
    const introSelect = document.getElementById("introLanguageSelect");
    const mainSelect = document.getElementById("languageSelect");
    const languages = ["English", "Spanish", "Chinese", "Hindi", "Russian"];

    if (introSelect && mainSelect) {
        // Clear any existing (empty) options
        introSelect.innerHTML = "";
        mainSelect.innerHTML = "";

        languages.forEach(lang => {
            introSelect.add(new Option(lang, lang));
            mainSelect.add(new Option(lang, lang));
        });

        introSelect.value = currentLanguage;
        mainSelect.value = currentLanguage;
    }
}

/* ------------------------------------------------------ 
   EVENT LISTENERS 
------------------------------------------------------ */
function setupEventListeners() {
    // Start Demo
    document.getElementById("startDemoBtn").addEventListener("click", startDemo);

    // Chat Inputs
    document.getElementById("sendBtn").addEventListener("click", handleInput);
    document.getElementById("userInput").addEventListener("keypress", (e) => {
        if (e.key === "Enter") handleInput();
    });

    // Language Syncing
    document.getElementById("introLanguageSelect").addEventListener("change", (e) => {
        currentLanguage = e.target.value;
        document.getElementById("languageSelect").value = currentLanguage;
        if (typeof updateUIForLanguage === "function") updateUIForLanguage();
    });

    document.getElementById("languageSelect").addEventListener("change", (e) => {
        currentLanguage = e.target.value;
        if (typeof updateUIForLanguage === "function") updateUIForLanguage();
    });

    // FIXED: Guided Tour Exit Button
    const tourExit = document.getElementById("tourExitBtn");
    if (tourExit) {
        tourExit.addEventListener("click", (e) => {
            e.preventDefault();
            if (typeof endTour === "function") endTour();
        });
    }
}

/* ------------------------------------------------------ 
   START DEMO & INPUT LOGIC
------------------------------------------------------ */
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
