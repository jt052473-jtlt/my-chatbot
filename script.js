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
    populateMainLanguageSelector();
    populateTourLanguageSelector();
    wireDemoButtons();
    wireChatbotButtons();
});

// -------------------------------
// POPULATE MAIN LANGUAGE SELECTOR
// -------------------------------
function populateMainLanguageSelector() {
    const select = document.getElementById("languageSelect");
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
        console.log("Language switched to:", currentLanguage);
    });
}

// -------------------------------
// POPULATE GUIDED TOUR LANGUAGE SELECTOR
// -------------------------------
function populateTourLanguageSelector() {
    const select = document.getElementById("tourLanguageSelect");
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
    document.getElementById("startDemoBtn").addEventListener("click", () => {
        document.getElementById("demoOverlay").style.display = "none";
        startGuidedTour();
    });

    document.getElementById("exitDemoBtn").addEventListener("click", () => {
        document.getElementById("demoOverlay").style.display = "none";
    });
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
        currentStep++;
        if (currentStep >= translations[currentLanguage].tour.length) {
            exitGuidedTour();
        } else {
            updateTourText();
        }
    };

    document.getElementById("tourExitBtn").onclick = exitGuidedTour;
}

function updateTourText() {
    const tour = translations[currentLanguage].tour;
    document.getElementById("tourTitle").textContent = tour[currentStep].title;
    document.getElementById("tourText").textContent = tour[currentStep].text;
}

function exitGuidedTour() {
    document.getElementById("tourOverlay").classList.add("hidden");
    document.getElementById("tourTooltip").classList.add("hidden");
}

// -------------------------------
// CHATBOT LOGIC (CALLS OTHER FILES)
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
