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
    // 1. Populate the dropdowns so they aren't empty
    populateLanguageSelectors();
    
    // 2. Setup the "brains" for your buttons
    setupEventListeners();
    
    // 3. Initialize UI text
    if (typeof updateUIForLanguage === "function") updateUIForLanguage();
});

/* ------------------------------------------------------ 
   RESTORE LANGUAGE OPTIONS
------------------------------------------------------ */
function populateLanguageSelectors() {
    const introSelect = document.getElementById("introLanguageSelect");
    const mainSelect = document.getElementById("languageSelect");
    const languages = ["English", "Spanish", "Chinese", "Hindi", "Russian"];

    if (introSelect && mainSelect) {
        introSelect.innerHTML = ""; // Clear empty state
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
    // Start Demo Logic
    document.getElementById("startDemoBtn").addEventListener("click", startDemo);

    // Chat Inputs (Enter & Send)
    document.getElementById("sendBtn").addEventListener("click", handleInput);
    document.getElementById("userInput").addEventListener("keypress", (e) => {
        if (e.key === "Enter") handleInput();
    });

    // Language Selection Sync
    document.getElementById("introLanguageSelect").addEventListener("change", (e) => {
        currentLanguage = e.target.value;
        document.getElementById("languageSelect").value = currentLanguage;
        if (typeof updateUIForLanguage === "function") updateUIForLanguage();
    });

    document.getElementById("languageSelect").addEventListener("change", (e) => {
        currentLanguage = e.target.value;
        if (typeof updateUIForLanguage === "function") updateUIForLanguage();
    });

    // FIXED: Guided Tour Exit
    const tourExit = document.getElementById("tourExitBtn");
    if (tourExit) {
        tourExit.addEventListener("click", (e) => {
            e.preventDefault(); // Stop page from jumping
            if (typeof endTour === "function") endTour();
        });
    }
}

/* ------------------------------------------------------ 
   CORE ACTIONS
------------------------------------------------------ */
function startDemo() {
    const overlay = document.getElementById("demoOverlay");
    if (overlay) {
        overlay.style.display = "none";
    }

    // Trigger the first question and the tour
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
