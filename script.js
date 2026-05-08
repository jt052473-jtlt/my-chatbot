let currentLanguage = "English";
let currentStep = 0;
let isPaused = false;
let isTourActive = false;
let tourStep = 0;

document.addEventListener("DOMContentLoaded", () => {
    populateLanguageSelectors();
    setupEventListeners();
    updateUIForLanguage();
});

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

function setupEventListeners() {

    document.getElementById("startDemoBtn").addEventListener("click", startDemo);

    document.getElementById("introExitBtn").addEventListener("click", () => {
        window.location.href = "https://www.google.com";
    });

    document.getElementById("tourNextBtn").addEventListener("click", nextTourStep);
    document.getElementById("tourExitBtn").addEventListener("click", endTour);

    document.getElementById("introLanguageSelect").addEventListener("change", (e) => {
        currentLanguage = e.target.value;
        document.getElementById("languageSelect").value = currentLanguage;
        updateUIForLanguage();
        updateTourButtons();
    });

    document.getElementById("languageSelect").addEventListener("change", () => {
        currentLanguage = document.getElementById("languageSelect").value;
        updateUIForLanguage();
        updateTourButtons();

        if (isTourActive) {
            tourStep = 0;
            showTourStep();
        }
    });

    document.getElementById("languageSearch").addEventListener("input", filterLanguages);

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

    document.getElementById("sendBtn").addEventListener("click", sendUserInput);
    document.getElementById("userInput").addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendUserInput();
    });
}

function startDemo() {
    currentLanguage = document.getElementById("introLanguageSelect").value;
    document.getElementById("languageSelect").value = currentLanguage;

    updateUIForLanguage();
    updateTourButtons();

    document.getElementById("demoOverlay").style.display = "none";
    startTour();
}

function resetInterview() {
    currentStep = 0;
    interviewAnswers = {};
    document.getElementById("chatWindow").innerHTML = "";
    updateProgressBar();
}

function sendUserInput() {
    const input = document.getElementById("userInput").value.trim();
    if (input === "") return;

    addUserMessage(input);
    document.getElementById("userInput").value = "";

    processUserResponse(input);
}

function filterLanguages() {
    const search = document.getElementById("languageSearch").value.toLowerCase();
    const select = document.getElementById("languageSelect");

    Array.from(select.options).forEach(opt => {
        opt.style.display = opt.value.toLowerCase().includes(search) ? "block" : "none";
    });
}

function updateTourButtons() {
    const ui = translations[currentLanguage].ui;
    document.getElementById("tourNextBtn").textContent = ui.next;
    document.getElementById("tourExitBtn").textContent = ui.exit;
}
