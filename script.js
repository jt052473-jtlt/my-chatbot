/* ------------------------------------------------------ 
   GLOBAL STATE 
------------------------------------------------------ */
let currentLanguage = "English";
let currentStep = 0;
let isPaused = false;
let isTourActive = false;
let tourStep = 0;

/* ------------------------------------------------------ 
   INITIALIZATION 
------------------------------------------------------ */
document.addEventListener("DOMContentLoaded", () => {
    populateLanguageSelectors();
    setupEventListeners();
    // Initialize the UI but keep the overlay visible
    if (typeof updateUIForLanguage === "function") updateUIForLanguage();
});

/* ------------------------------------------------------ 
   POPULATE LANGUAGE DROPDOWNS 
------------------------------------------------------ */
function populateLanguageSelectors() {
    const introSelect = document.getElementById("introLanguageSelect");
    const mainSelect = document.getElementById("languageSelect");
    const langs = ["English", "Spanish", "Chinese", "Hindi", "Russian"];

    langs.forEach(lang => {
        const o1 = document.createElement("option");
        o1.value = lang;
        o1.textContent = lang;
        introSelect.appendChild(o1);

        const o2 = document.createElement("option");
        o2.value = lang;
        o2.textContent = lang;
        mainSelect.appendChild(o2);
    });

    introSelect.value = currentLanguage;
    mainSelect.value = currentLanguage;
}

/* ------------------------------------------------------ 
   EVENT LISTENERS 
------------------------------------------------------ */
function setupEventListeners() {
    /* Start Demo */
    document.getElementById("startDemoBtn").addEventListener("click", startDemo);

    /* Exit Demo */
    document.getElementById("introExitBtn").addEventListener("click", () => {
        const overlay = document.getElementById("demoOverlay");
        overlay.style.display = "none";
        overlay.style.pointerEvents = "none";
        overlay.style.opacity = "0";
    });

    /* Guided Tour Buttons */
    document.getElementById("tourNextBtn").addEventListener("click", nextTourStep);
    document.getElementById("tourExitBtn").addEventListener("click", (e) => {
        e.stopPropagation();
        endTour();
    });

    /* Language Selectors */
    document.getElementById("introLanguageSelect").addEventListener("change", (e) => {
        currentLanguage = e.target.value;
        document.getElementById("languageSelect").value = currentLanguage;
        if (typeof updateUIForLanguage === "function") updateUIForLanguage();
        if (typeof updateTourButtons === "function") updateTourButtons();
    });

    document.getElementById("languageSelect").addEventListener("change", () => {
        currentLanguage = document.getElementById("languageSelect").value;
        if (typeof updateUIForLanguage === "function") updateUIForLanguage();
        if (typeof updateTourButtons === "function") updateTourButtons();
        if (isTourActive) {
            tourStep = 0;
            showTourStep();
        }
    });

    /* Language Search */
    document.getElementById("languageSearch").addEventListener("input", filterLanguages);

    /* Chat Controls */
    document.getElementById("startBtn").addEventListener("click", () => {
        isPaused = false;
        if (typeof showQuestion === "function") showQuestion();
    });

    document.getElementById("pauseBtn").addEventListener("click", () => {
        isPaused = true;
    });

    document.getElementById("finishBtn").addEventListener("click", () => {
        if (typeof translations !== 'undefined') {
            currentStep = translations[currentLanguage].questions.length;
            if (typeof showQuestion === "function") showQuestion();
        }
    });

    document.getElementById("repeatBtn").addEventListener("click", () => {
        if (typeof showQuestion === "function") showQuestion();
    });

    document.getElementById("skipBtn").addEventListener("click", () => {
        currentStep++;
        if (typeof showQuestion === "function") showQuestion();
    });

    document.getElementById("resetBtn").addEventListener("click", resetInterview);

    /* User Input */
    document.getElementById("sendBtn").addEventListener("click", sendUserInput);
    document.getElementById("userInput").addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendUserInput();
    });
}

/* ------------------------------------------------------ 
   THE FIX: START DEMO 
------------------------------------------------------ */
function startDemo() {
    // 1. Sync the language from the intro overlay
    currentLanguage = document.getElementById("introLanguageSelect").value;
    document.getElementById("languageSelect").value = currentLanguage;

    // 2. Run UI updates if the functions exist
    if (typeof updateUIForLanguage === "function") updateUIForLanguage();
    if (typeof updateTourButtons === "function") updateTourButtons();

    // 3. Hide the overlay (This reveals your layout)
    const overlay = document.getElementById("demoOverlay");
    overlay.style.display = "none";
    overlay.style.pointerEvents = "none";
    overlay.style.opacity = "0";

    // 4. CRITICAL FIX: Trigger the first question from interviewFlow2.js
    if (typeof showQuestion === "function") {
        showQuestion();
    }

    // 5. Start the tour
    if (typeof startTour === "function") startTour();
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
   CHAT + INTERVIEW LOGIC 
------------------------------------------------------ */
function resetInterview() {
    currentStep = 0;
    // Ensure interviewAnswers is defined globally or in its respective file
    if (typeof interviewAnswers !== 'undefined') interviewAnswers = {};
    
    document.getElementById("chatWindow").innerHTML = "";
    if (typeof updateProgressBar === "function") updateProgressBar();
}

function sendUserInput() {
    const input = document.getElementById("userInput").value.trim();
    if (input === "") return;
    
    if (typeof addUserMessage === "function") addUserMessage(input);
    document.getElementById("userInput").value = "";
    
    if (typeof processUserResponse === "function") processUserResponse(input);
}

/* ------------------------------------------------------ 
   TOUR BUTTON TRANSLATION 
------------------------------------------------------ */
function updateTourButtons() {
    if (typeof translations !== 'undefined' && translations[currentLanguage]) {
        const ui = translations[currentLanguage].ui;
        document.getElementById("tourNextBtn").textContent = ui.next;
        document.getElementById("tourExitBtn").textContent = ui.exit;
    }
}
