let currentLanguage = "English";
let currentStep = 0;
let isPaused = false;
let isTourActive = false;

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
        introSelect.add(new Option(lang, lang));
        mainSelect.add(new Option(lang, lang));
    });

    introSelect.value = currentLanguage;
    mainSelect.value = currentLanguage;
}

function setupEventListeners() {

    document.getElementById("startDemoBtn").addEventListener("click", () => {
        currentLanguage = document.getElementById("introLanguageSelect").value;
        document.getElementById("languageSelect").value = currentLanguage;

        updateUIForLanguage();

        document.getElementById("demoOverlay").style.display = "none";

        startTour();
    });

    // ⭐ FIX: Exit intro → skip tour, go to intake
    document.getElementById("exitDemoBtn").addEventListener("click", () => {
        document.getElementById("demoOverlay").style.display = "none";
    });

    document.getElementById("languageSelect").addEventListener("change", () => {
        currentLanguage = document.getElementById("languageSelect").value;
        updateUIForLanguage();
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

    document.getElementById("repeatBtn").addEventListener("click", showQuestion);

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

function filterLanguages() {
    const search = document.getElementById("languageSearch").value.toLowerCase();
    const select = document.getElementById("languageSelect");

    Array.from(select.options).forEach(opt => {
        opt.style.display = opt.value.toLowerCase().includes(search) ? "block" : "none";
    });
}

function resetInterview() {
    currentStep = 0;
    interviewAnswers = {};
    document.getElementById("chatWindow").innerHTML = "";
    updateProgressBar();
}

function sendUserInput() {
    const input = document.getElementById("userInput").value.trim();
    if (!input) return;

    addUserMessage(input);
    document.getElementById("userInput").value = "";

    processUserResponse(input);
}

window.filterLanguages = filterLanguages;
window.resetInterview = resetInterview;
window.sendUserInput = sendUserInput;
