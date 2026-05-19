/* ------------------------------------------------------
   MAIN SCRIPT — Language, Form, Chat, Tour Refresh
------------------------------------------------------ */

let currentLanguage = "English";
let currentForm = "admission";
let currentStep = 0;
let isPaused = false;   // ⭐ Pause/Resume state

/* ------------------------------------------------------
   INITIALIZE APP
------------------------------------------------------ */
window.onload = () => {
    populateLanguageSelect();
    populateFormSelect();
    updateUIText();
    updateIntroText();
    updateTourButtons();

    // ⭐ FIX: Attach Send + Enter AFTER page loads
    wireSendAndEnter();
};

/* ------------------------------------------------------
   FIXED SEND + ENTER HANDLER
------------------------------------------------------ */
function wireSendAndEnter() {
    const sendBtn = document.getElementById("sendBtn");
    const userInput = document.getElementById("userInput");

    if (!sendBtn || !userInput) return;

    // ⭐ Force override any other script
    sendBtn.onclick = () => {
        const text = userInput.value.trim();
        if (!text) return;

        addUserMessage(text);
        processUserResponse(text);

        userInput.value = "";
    };

    // ⭐ Enter triggers same handler
    userInput.onkeydown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            sendBtn.click();
        }
    };
}

/* ------------------------------------------------------
   POPULATE LANGUAGE DROPDOWNS
------------------------------------------------------ */
function populateLanguageSelect() {
    const langSelect = document.getElementById("languageSelect");
    const introLangSelect = document.getElementById("introLanguageSelect");

    Object.keys(translations).forEach(lang => {
        langSelect.add(new Option(lang, lang));
        introLangSelect.add(new Option(lang, lang));
    });

    langSelect.value = currentLanguage;
    introLangSelect.value = currentLanguage;
}

/* ------------------------------------------------------
   POPULATE FORM DROPDOWN
------------------------------------------------------ */
function populateFormSelect() {
    document.getElementById("formSelect").value = currentForm;
}

/* ------------------------------------------------------
   UPDATE INTRO OVERLAY TEXT
------------------------------------------------------ */
function updateIntroText() {
    const t = translations[currentLanguage];

    document.querySelector("#demoOverlay h2").textContent = t.introTitle;
    document.querySelector("#demoOverlay p").textContent = t.introDesc;
    document.querySelector("label[for='introLanguageSelect']").textContent = t.introLanguage;
    document.getElementById("startDemoBtn").textContent = t.introStart;
    document.getElementById("introExitBtn").textContent = t.introExit;
}

/* ------------------------------------------------------
   UPDATE TOUR BUTTONS
------------------------------------------------------ */
function updateTourButtons() {
    const t = translations[currentLanguage];
    document.getElementById("tourNextBtn").textContent = t.tourNext;
    document.getElementById("tourExitBtn").textContent = t.tourExit;
}

/* ------------------------------------------------------
   LANGUAGE CHANGE — INTRO SCREEN
------------------------------------------------------ */
document.getElementById("introLanguageSelect").addEventListener("change", (e) => {
    currentLanguage = e.target.value;

    document.getElementById("languageSelect").value = currentLanguage;

    updateUIText();
    updateIntroText();
    updateTourButtons();

    if (!document.getElementById("tourOverlay").classList.contains("hidden")) {
        loadTourStep();
    }
});

/* ------------------------------------------------------
   LANGUAGE CHANGE — MAIN SCREEN
------------------------------------------------------ */
document.getElementById("languageSelect").addEventListener("change", (e) => {
    currentLanguage = e.target.value;

    document.getElementById("introLanguageSelect").value = currentLanguage;

    updateUIText();
    updateIntroText();
    updateTourButtons();

    if (!document.getElementById("tourOverlay").classList.contains("hidden")) {
        loadTourStep();
    }
});

/* ------------------------------------------------------
   FORM CHANGE
------------------------------------------------------ */
document.getElementById("formSelect").addEventListener("change", (e) => {
    currentForm = e.target.value;
});

/* ------------------------------------------------------
   CHAT MESSAGE HELPERS
------------------------------------------------------ */
function addBotMessage(text) {
    const chat = document.getElementById("chatWindow");
    const div = document.createElement("div");
    div.className = "bot-message";
    div.textContent = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

function addUserMessage(text) {
    const chat = document.getElementById("chatWindow");
    const div = document.createElement("div");
    div.className = "user-message";
    div.textContent = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

/* ------------------------------------------------------
   ⭐ START BUTTON — START OR RESUME
------------------------------------------------------ */
document.getElementById("startBtn").addEventListener("click", () => {

    if (isPaused) {
        isPaused = false;

        if (document.getElementById("readAloudToggle")?.checked) {
            speakText(currentQuestionText);
        }

        if (document.getElementById("voiceModeToggle")?.checked) {
            if (typeof startListening === "function") startListening();
        }

        document.getElementById("pauseBtn").textContent = translations[currentLanguage].pause;
        document.getElementById("pauseBtn").style.backgroundColor = "";

        showQuestion();
        return;
    }

    currentStep = 0;
    interviewAnswers = {};
    isPaused = false;

    document.getElementById("pauseBtn").textContent = translations[currentLanguage].pause;
    document.getElementById("pauseBtn").style.backgroundColor = "";

    showQuestion();
});

/* ------------------------------------------------------
   ⭐ PAUSE BUTTON — PAUSE OR RESUME
------------------------------------------------------ */
document.getElementById("pauseBtn").addEventListener("click", () => {

    if (isPaused) {
        isPaused = false;

        if (document.getElementById("readAloudToggle")?.checked) {
            speakText(currentQuestionText);
        }

        if (document.getElementById("voiceModeToggle")?.checked) {
            if (typeof startListening === "function") startListening();
        }

        document.getElementById("pauseBtn").textContent = translations[currentLanguage].pause;
        document.getElementById("pauseBtn").style.backgroundColor = "";

        showQuestion();
        return;
    }

    isPaused = true;

    if (window.speechSynthesis) speechSynthesis.cancel();
    if (typeof stopListening === "function") stopListening();

    document.getElementById("pauseBtn").textContent = translations[currentLanguage].resume;
    document.getElementById("pauseBtn").style.backgroundColor = "orange";

    addBotMessage("⏸️ Interview paused.");
});

/* ------------------------------------------------------
   FINISH interview
------------------------------------------------------ */
document.getElementById("finishBtn").addEventListener("click", () => {
    showSummary();
});

/* ------------------------------------------------------
   REPEAT last question
------------------------------------------------------ */
document.getElementById("repeatBtn").addEventListener("click", () => {
    showQuestion();
});

/* ------------------------------------------------------
   SKIP question
------------------------------------------------------ */
document.getElementById("skipBtn").addEventListener("click", () => {
    processUserResponse("");
});

/* ------------------------------------------------------
   RESET interview
------------------------------------------------------ */
document.getElementById("resetBtn").addEventListener("click", () => {
    currentStep = 0;
    interviewAnswers = {};
    isPaused = false;

    document.getElementById("chatWindow").innerHTML = "";
    updateProgressBar();

    document.getElementById("pauseBtn").textContent = translations[currentLanguage].pause;
    document.getElementById("pauseBtn").style.backgroundColor = "";

    addBotMessage("🔄 Interview reset.");
});
