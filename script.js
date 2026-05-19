/* ------------------------------------------------------
   MAIN SCRIPT — Language, Form, Chat, Tour Refresh
------------------------------------------------------ */

let currentLanguage = "English";
let currentForm = "admission";
let currentStep = 0;

/* ------------------------------------------------------
   INITIALIZE APP
------------------------------------------------------ */
window.onload = () => {
    populateLanguageSelect();
    populateFormSelect();
    updateUIText();
    updateIntroText();   // ⭐ REQUIRED for Start Demo overlay
};

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
   ⭐ UPDATE INTRO OVERLAY TEXT
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
   LANGUAGE CHANGE — INTRO SCREEN
------------------------------------------------------ */
document.getElementById("introLanguageSelect").addEventListener("change", (e) => {
    currentLanguage = e.target.value;

    // Sync main dropdown
    document.getElementById("languageSelect").value = currentLanguage;

    updateUIText();
    updateIntroText();

    // If tour is active, refresh it
    if (!document.getElementById("tourOverlay").classList.contains("hidden")) {
        loadTourStep();
    }
});

/* ------------------------------------------------------
   LANGUAGE CHANGE — MAIN SCREEN
------------------------------------------------------ */
document.getElementById("languageSelect").addEventListener("change", (e) => {
    currentLanguage = e.target.value;

    // Sync intro dropdown
    document.getElementById("introLanguageSelect").value = currentLanguage;

    updateUIText();
    updateIntroText();

    // If tour is active, refresh it
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
   SEND BUTTON
------------------------------------------------------ */
document.getElementById("sendBtn").addEventListener("click", () => {
    const input = document.getElementById("userInput");
    const text = input.value.trim();
    if (!text) return;

    addUserMessage(text);
    processUserResponse(text);

    input.value = "";
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
