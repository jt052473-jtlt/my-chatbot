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
    
    // Initialize the UI logic without hiding the overlay yet
    if (typeof updateUIForLanguage === "function") updateUIForLanguage();
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
    // Start Demo Button
    const startBtn = document.getElementById("startDemoBtn");
    if (startBtn) startBtn.addEventListener("click", startDemo);

    // Exit Button on Overlay
    const exitBtn = document.getElementById("introExitBtn");
    if (exitBtn) {
        exitBtn.addEventListener("click", () => {
            document.getElementById("demoOverlay").style.display = "none";
        });
    }

    // Language Selection Sync
    document.getElementById("introLanguageSelect").addEventListener("change", (e) => {
        currentLanguage = e.target.value;
        document.getElementById("languageSelect").value = currentLanguage;
        if (typeof updateUIForLanguage === "function") updateUIForLanguage();
    });

    document.getElementById("languageSelect").addEventListener("change", (e) => {
        currentLanguage = e.target.value;
        if (typeof updateUIForLanguage === "function") updateUIForLanguage();
    });

    // Chat Controls
    document.getElementById("startBtn").addEventListener("click", () => {
        isPaused = false;
        if (typeof showQuestion === "function") showQuestion();
    });

    document.getElementById("resetBtn").addEventListener("click", () => {
        currentStep = 0;
        document.getElementById("chatWindow").innerHTML = "";
        if (typeof updateProgressBar === "function") updateProgressBar();
    });
}

/* ------------------------------------------------------ 
   THE FIX: START DEMO 
------------------------------------------------------ */
function startDemo() {
    // 1. Sync the language
    const introSelect = document.getElementById("introLanguageSelect");
    if (introSelect) {
        currentLanguage = introSelect.value;
        document.getElementById("languageSelect").value = currentLanguage;
    }

    // 2. Hide the overlay (Reveals your existing layout)
    const overlay = document.getElementById("demoOverlay");
    if (overlay) {
        overlay.style.display = "none";
        overlay.style.pointerEvents = "none";
        overlay.style.opacity = "0";
    }

    // 3. Update the UI text for the selected language
    if (typeof updateUIForLanguage === "function") updateUIForLanguage();

    // 4. CRITICAL FIX: Trigger the first question
    if (typeof showQuestion === "function") {
        showQuestion();
    }

    // 5. Start the tour if available
    if (typeof startTour === "function") startTour();
}
