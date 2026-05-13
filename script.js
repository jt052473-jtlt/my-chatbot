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

/* ------------------------------------------------------ 
   RESTORE LANGUAGE OPTIONS
------------------------------------------------------ */
function populateLanguageSelectors() {
    const introSelect = document.getElementById("introLanguageSelect");
    const mainSelect = document.getElementById("languageSelect");
    const languages = ["English", "Spanish", "Chinese", "Hindi", "Russian"];

    if (introSelect && mainSelect) {
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

    // FIXED: Guided Tour Exit - We use a "delegated" listener 
    // to ensure it works even if the button is added later by tour.js
    document.addEventListener("click", (e) => {
        if (e.target && e.target.id === "tourExitBtn") {
            e.preventDefault();
            if (typeof endTour === "function") {
                endTour();
            } else {
                // Fallback: Manually hide the tour overlay if endTour is missing
                const tourOverlay = document.getElementById("tourOverlay");
                if (tourOverlay) tourOverlay.style.display = "none";
            }
        }
    });
}

/* ------------------------------------------------------ 
   START DEMO 
------------------------------------------------------ */
function startDemo() {
    const overlay = document.getElementById("demoOverlay");
    if (overlay) {
        overlay.style.display = "none";
        overlay.style.opacity = "0";
    }

    // 1. Show the first bot question
    if (typeof showQuestion === "function") showQuestion();
    
    // 2. Start the tour with a tiny delay to ensure layout is ready
    setTimeout(() => {
        if (typeof startTour === "function") {
            startTour();
        } else {
            console.error("startTour function not found in tour.js");
        }
    }, 300);
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
