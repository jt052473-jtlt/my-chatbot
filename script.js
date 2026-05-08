// ------------------------------------------------------
// GLOBAL STATE
// ------------------------------------------------------
let currentLanguage = "English";
let currentStep = 0;
let isPaused = false;
let isTourActive = false;
let tourStep = 0;

// ------------------------------------------------------
// INITIALIZATION
// ------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    populateLanguageSelectors();
    setupEventListeners();
    updateUIForLanguage();
});

// ------------------------------------------------------
// POPULATE LANGUAGE SELECTORS (TOP 5 ONLY)
// ------------------------------------------------------
function populateLanguageSelectors() {
    const introSelect = document.getElementById("introLanguageSelect");
    const mainSelect = document.getElementById("languageSelect");

    const topFive = ["English", "Spanish", "Chinese", "Hindi", "Russian"];

    topFive.forEach(lang => {
        const opt1 = document.createElement("option");
        opt1.value = lang;
        opt1.textContent = lang;
        introSelect.appendChild(opt1);

        const opt2 = document.createElement("option");
        opt2.value = lang;
        opt2.textContent = lang;
        mainSelect.appendChild(opt2);
    });

    introSelect.value = currentLanguage;
    mainSelect.value = currentLanguage;
}

// ------------------------------------------------------
// EVENT LISTENERS
// ------------------------------------------------------
function setupEventListeners() {

    // Intro screen
    document.getElementById("startDemoBtn").addEventListener("click", startDemo);
    document.getElementById("exitDemoBtn").addEventListener("click", () => {
        window.location.href = "https://www.google.com";
    });

    // Guided tour
    document.getElementById("tourNextBtn").addEventListener("click", nextTourStep);
    document.getElementById("tourExitBtn").addEventListener("click", endTour);

    // Language selection (INTRO)
    document.getElementById("introLanguageSelect").addEventListener("change", (e) => {
        currentLanguage = e.target.value;
        document.getElementById("languageSelect").value = currentLanguage;
        updateUIForLanguage();
        updateTourButtons();
    });

    // Language selection (MAIN)
    document.getElementById("languageSelect").addEventListener("change", () => {
        currentLanguage = document.getElementById("languageSelect").value;
        updateUIForLanguage();
        updateTourButtons();

        if (isTourActive) {
            tourStep = 0;
            showTourStep();
        }
    });

    // Search filter
    document.getElementById("languageSearch").addEventListener("input", filterLanguages);

    // Chat controls
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

    document.getElementById("repeatBtn").addEventListener("click", () => {
        showQuestion();
    });

    document.getElementById("skipBtn").addEventListener("click", () => {
        currentStep++;
        showQuestion();
    });

    document.getElementById("resetBtn").addEventListener("click", resetInterview);

    // Send input
    document.getElementById("sendBtn").addEventListener("click", sendUserInput);
    document.getElementById("userInput").addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendUserInput();
    });
}

// ------------------------------------------------------
// START DEMO
// ------------------------------------------------------
function startDemo() {
    currentLanguage = document.getElementById("introLanguageSelect").value;
    document.getElementById("languageSelect").value = currentLanguage;

    updateUIForLanguage();
    updateTourButtons();

    document.getElementById("demoOverlay").style.display = "none";
    startTour();
}

// ------------------------------------------------------
// RESET INTERVIEW
// ------------------------------------------------------
function resetInterview() {
    currentStep = 0;
    interviewAnswers = {};
    document.getElementById("chatWindow").innerHTML = "";
    updateProgressBar();
}

// ------------------------------------------------------
// SEND USER INPUT
// ------------------------------------------------------
function sendUserInput() {
    const input = document.getElementById("userInput").value.trim();
    if (input === "") return;

    addUserMessage(input);
    document.getElementById("userInput").value = "";

    processUserResponse(input);
}

// ------------------------------------------------------
// LANGUAGE SEARCH FILTER
// ------------------------------------------------------
function filterLanguages() {
    const search = document.getElementById("languageSearch").value.toLowerCase();
    const select = document.getElementById("languageSelect");

    Array.from(select.options).forEach(opt => {
        opt.style.display = opt.value.toLowerCase().includes(search) ? "block" : "none";
    });
}

// ------------------------------------------------------
// UPDATE TOUR BUTTONS (NEW)
// ------------------------------------------------------
function updateTourButtons() {
    const ui = translations[currentLanguage].ui;
    document.getElementById("tourNextBtn").textContent = ui.next;
    document.getElementById("tourExitBtn").textContent = ui.exit;
}
