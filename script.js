// -------------------------------
// GLOBAL STATE
// -------------------------------
let currentLanguage = "English";
let currentStep = 0;
let isPaused = false;
let isVoiceMode = false;

// -------------------------------
// INITIALIZATION
// -------------------------------
window.addEventListener("DOMContentLoaded", () => {
    populateIntroLanguageSelector();
    populateMainLanguageSelector();
    populateTourLanguageSelector();
    wireDemoButtons();
    wireChatbotButtons();
});

// -------------------------------
// INTRO SCREEN LANGUAGE SELECTOR
// -------------------------------
function populateIntroLanguageSelector() {
    const select = document.getElementById("introLanguageSelect");
    if (!select) return;

    select.innerHTML = "";

    Object.keys(translations).forEach(lang => {
        const option = document.createElement("option");
        option.value = lang;
        option.textContent = lang;
        select.appendChild(option);
    });

    select.value = currentLanguage;

    select.addEventListener("change", () => {
        currentLanguage = select.value;
    });
}

// -------------------------------
// MAIN LANGUAGE SELECTOR
// -------------------------------
function populateMainLanguageSelector() {
    const select = document.getElementById("languageSelect");
    if (!select) return;

    select.innerHTML = "";

    Object.keys(translations).forEach(lang => {
        const option = document.createElement("option");
        option.value = lang;
        option.textContent = lang;
        select.appendChild(option);
    });

    select.value = currentLanguage;

    select.addEventListener("change", () => {
        currentLanguage = select.value;
    });
}

// -------------------------------
// GUIDED TOUR LANGUAGE SELECTOR
// -------------------------------
function populateTourLanguageSelector() {
    const select = document.getElementById("tourLanguageSelect");
    if (!select) return;

    select.innerHTML = "";

    Object.keys(translations).forEach(lang => {
        const option = document.createElement("option");
        option.value = lang;
        option.textContent = lang;
        select.appendChild(option);
    });

    select.value = currentLanguage;

    select.addEventListener("change", () => {
        currentLanguage = select.value;
        updateTourText();
    });
}

// -------------------------------
// DEMO OVERLAY BUTTONS
// -------------------------------
function wireDemoButtons() {
    const startBtn = document.getElementById("startDemoBtn");
    const exitBtn = document.getElementById("exitDemoBtn");

    if (startBtn) {
        startBtn.addEventListener("click", () => {
            document.getElementById("demoOverlay").style.display = "none";
            startGuidedTour();
        });
    }

    if (exitBtn) {
        exitBtn.addEventListener("click", () => {
            document.getElementById("demoOverlay").style.display = "none";
        });
    }
}

// -------------------------------
// CHATBOT BUTTONS
// -------------------------------
function wireChatbotButtons() {
    document.getElementById("startBtn").addEventListener("click", startInterview);
    document.getElementById("pauseBtn").addEventListener("click", pauseInterview);
    document.getElementById("finishBtn").addEventListener("click", finishInterview);
    document.getElementById("repeatBtn").addEventListener("click", repeatQuestion);
    document.getElementById("skipBtn").addEventListener("click", skipQuestion);
    document.getElementById("resetBtn").addEventListener("click", resetInterview);
    document.getElementById("sendBtn").addEventListener("click", sendUserInput);
}

// -------------------------------
// GUIDED TOUR LOGIC
// -------------------------------
function startGuidedTour() {
    currentStep = 0;

    document.getElementById("tourOverlay").classList.remove("hidden");
    document.getElementById("tourTooltip").classList.remove("hidden");

    updateTourText();

    document.getElementById("tourNextBtn").onclick = () => {
        const steps = translations[currentLanguage].tour.steps;

        currentStep++;
        if (currentStep >= steps.length) {
            exitGuidedTour();
        } else {
            updateTourText();
        }
    };

    document.getElementById("tourExitBtn").onclick = exitGuidedTour;
}

function updateTourText() {
    const steps = translations[currentLanguage].tour.steps;
    document.getElementById("tourTitle").textContent = steps[currentStep].title;
    document.getElementById("tourText").textContent = steps[currentStep].text;
}

function exitGuidedTour() {
    document.getElementById("tourOverlay").classList.add("hidden");
    document.getElementById("tourTooltip").classList.add("hidden");
}

// -------------------------------
// CHATBOT LOGIC
// -------------------------------
function startInterview() {
    currentStep = 0;
    isPaused = false;
    showQuestion();
}

function pauseInterview() {
    isPaused = true;
}

function finishInterview() {
    buildSummary();
}

function repeatQuestion() {
    showQuestion();
}

function skipQuestion() {
    currentStep++;
    showQuestion();
}

function resetInterview() {
    currentStep = 0;
    document.getElementById("chatWindow").innerHTML = "";
}

function sendUserInput() {
    const input = document.getElementById("userInput").value.trim();
    if (!input) return;

    addUserMessage(input);
    document.getElementById("userInput").value = "";

    processUserResponse(input);
}
