/* ------------------------------------------------------
   GLOBAL STATE
------------------------------------------------------ */
let currentLanguage = "English";
let currentStep = 0;
let isPaused = false;
let isTourActive = false;

/* ------------------------------------------------------
   INITIALIZATION
------------------------------------------------------ */
document.addEventListener("DOMContentLoaded", () => {
    populateLanguageSelectors();
    setupEventListeners();
    updateUIForLanguage();
});

/* ------------------------------------------------------
   POPULATE LANGUAGE SELECTORS
------------------------------------------------------ */
function populateLanguageSelectors() {
    const introSelect = document.getElementById("introLanguageSelect");
    const mainSelect = document.getElementById("languageSelect");

    const langs = ["English", "Spanish", "Chinese", "Hindi", "Russian"];

    langs.forEach(lang => {
        introSelect.add(new Option(lang, lang));
        mainSelect.add(new Option(lang, lang));
    });

    introSelect.value = currentLanguage;
    mainSelect.value = currentLanguage;
}

/* ------------------------------------------------------
   EVENT LISTENERS
------------------------------------------------------ */
function setupEventListeners() {

    /* ⭐ START DEMO — FIXED */
    document.getElementById("startDemoBtn").addEventListener("click", () => {
        currentLanguage = document.getElementById("introLanguageSelect").value;
        document.getElementById("languageSelect").value = currentLanguage;

        updateUIForLanguage();

        // ⭐ Reset states so the guided tour can start properly
        isPaused = false;
        isTourActive = false;
        currentStep = 0;

        // Hide intro overlay
        document.getElementById("demoOverlay").style.display = "none";

        // Start guided tour
        startTour();
    });

    /* ⭐ EXIT INTRO — DOES NOT START INTAKE */
    document.getElementById("exitDemoBtn").addEventListener("click", () => {
        document.getElementById("demoOverlay").style.display = "none";
    });

    /* Language Select */
    document.getElementById("languageSelect").addEventListener("change", () => {
        currentLanguage = document.getElementById("languageSelect").value;
        updateUIForLanguage();
    });

    /* Language Search */
    document.getElementById("languageSearch").addEventListener("input", filterLanguages);

    /* Intake Controls */
    document.getElementById("startBtn").addEventListener("click", () => {
        isPaused = false;
        showQuestion();
    });

    document.getElementById("pauseBtn").addEventListener("click", () => {
        isPaused = true;
    });

    document.getElementById("finishBtn").addEventListener("click", () => {
        currentStep = translations[currentLanguage].questions.length;
        showQuestion();
    });

    document.getElementById("repeatBtn").addEventListener("click", showQuestion);

    document.getElementById("skipBtn").addEventListener("click", () => {
        currentStep++;
        showQuestion();
    });

    document.getElementById("resetBtn").addEventListener("click", resetInterview);

    /* User Input */
    document.getElementById("sendBtn").addEventListener("click", sendUserInput);

    document.getElementById("userInput").addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendUserInput();
    });
}

/* ------------------------------------------------------
   LANGUAGE SEARCH
------------------------------------------------------ */
function filterLanguages() {
    const search = document.getElementById("languageSearch").value.toLowerCase();
    const select = document.getElementById("languageSelect");

    Array.from(select.options).forEach(opt => {
        opt.style.display = opt.value.toLowerCase().includes(search) ? "block" : "none";
    });
}

/* ------------------------------------------------------
   RESET INTERVIEW
------------------------------------------------------ */
function resetInterview() {
    currentStep = 0;
    interviewAnswers = {};
    document.getElementById("chatWindow").innerHTML = "";
    updateProgressBar();
}

/* ------------------------------------------------------
   SEND USER INPUT
------------------------------------------------------ */
function sendUserInput() {
    const input = document.getElementById("userInput").value.trim();
    if (!input) return;

    addUserMessage(input);
    document.getElementById("userInput").value = "";

    processUserResponse(input);
}

/* ------------------------------------------------------
   EXPORT GLOBALS
------------------------------------------------------ */
window.filterLanguages = filterLanguages;
window.resetInterview = resetInterview;
window.sendUserInput = sendUserInput;
