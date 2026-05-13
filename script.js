/* ------------------------------------------------------
   GLOBAL STATE
------------------------------------------------------ */
let currentLanguage = "English";
let currentForm = "admission";   // NEW — multi‑form support
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

    if (typeof updateUIForLanguage === "function") {
        updateUIForLanguage();
    }
});

/* ------------------------------------------------------
   POPULATE LANGUAGE DROPDOWNS
------------------------------------------------------ */
function populateLanguageSelectors() {
    const introSelect = document.getElementById("introLanguageSelect");
    const mainSelect = document.getElementById("languageSelect");
    const langs = ["English", "Spanish", "Chinese", "Hindi", "Russian"];

    if (introSelect && mainSelect) {
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
}

/* ------------------------------------------------------
   EVENT LISTENERS
------------------------------------------------------ */
function setupEventListeners() {

    /* Start Demo */
    const startBtn = document.getElementById("startDemoBtn");
    if (startBtn) startBtn.addEventListener("click", startDemo);

    /* Exit Demo Overlay */
    const exitBtn = document.getElementById("introExitBtn");
    if (exitBtn) {
        exitBtn.addEventListener("click", () => {
            document.getElementById("demoOverlay").style.display = "none";
        });
    }

    /* Language Selectors */
    document.getElementById("introLanguageSelect").addEventListener("change", (e) => {
        currentLanguage = e.target.value;
        document.getElementById("languageSelect").value = currentLanguage;
        updateUIForLanguage();
    });

    document.getElementById("languageSelect").addEventListener("change", (e) => {
        currentLanguage = e.target.value;
        updateUIForLanguage();
    });

    /* NEW — FORM SELECTOR */
    document.getElementById("formSelect").addEventListener("change", (e) => {
        currentForm = e.target.value;
        resetInterview();
    });

    /* Language Search */
    document.getElementById("languageSearch").addEventListener("input", filterLanguages);

    /* Chat Controls */
    document.getElementById("startBtn").addEventListener("click", () => {
        isPaused = false;
        showQuestion();
    });

    document.getElementById("pauseBtn").addEventListener("click", () => {
        isPaused = true;
    });

    document.getElementById("finishBtn").addEventListener("click", () => {
        currentStep = forms[currentForm].questions.length;
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

    /* User Input */
    document.getElementById("sendBtn").addEventListener("click", sendUserInput);

    document.getElementById("userInput").addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendUserInput();
    });
}

/* ------------------------------------------------------
   START DEMO
------------------------------------------------------ */
function startDemo() {
    const introSelect = document.getElementById("introLanguageSelect");
    if (introSelect) {
        currentLanguage = introSelect.value;
        document.getElementById("languageSelect").value = currentLanguage;
    }

    const overlay = document.getElementById("demoOverlay");
    if (overlay) {
        overlay.style.display = "none";
        overlay.style.pointerEvents = "none";
        overlay.style.opacity = "0";
    }

    updateUIForLanguage();

    showQuestion();

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
