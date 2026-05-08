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
});

// ------------------------------------------------------
// POPULATE LANGUAGE SELECTORS
// ------------------------------------------------------
function populateLanguageSelectors() {
    const introSelect = document.getElementById("introLanguageSelect");
    const mainSelect = document.getElementById("languageSelect");

    Object.keys(translations).forEach(lang => {
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

    // Language selection
    document.getElementById("introLanguageSelect").addEventListener("change", (e) => {
        currentLanguage = e.target.value;
        document.getElementById("languageSelect").value = currentLanguage;
    });

    document.getElementById("languageSelect").addEventListener("change", (e) => {
        currentLanguage = e.target.value;
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
// GUIDED TOUR
// ------------------------------------------------------
function startTour() {
    isTourActive = true;
    tourStep = 0;
    showTourStep();
}

function nextTourStep() {
    tourStep++;
    showTourStep();
}

function endTour() {
    isTourActive = false;
    document.getElementById("tourOverlay").classList.add("hidden");
    document.getElementById("tourTooltip").classList.add("hidden");
}

function showTourStep() {
    const steps = translations[currentLanguage].tour.steps;

    if (!steps || tourStep >= steps.length) {
        endTour();
        return;
    }

    const step = steps[tourStep];

    document.getElementById("tourTitle").textContent = step.title;
    document.getElementById("tourText").textContent = step.text;

    document.getElementById("tourOverlay").classList.remove("hidden");
    document.getElementById("tourTooltip").classList.remove("hidden");
}
