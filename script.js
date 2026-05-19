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
};

/* ------------------------------------------------------
   POPULATE LANGUAGE DROPDOWN
------------------------------------------------------ */
function populateLanguageSelect() {
    const langSelect = document.getElementById("languageSelect");
    const introLangSelect = document.getElementById("introLanguageSelect");

    Object.keys(translations).forEach(lang => {
        const opt1 = new Option(lang, lang);
        const opt2 = new Option(lang, lang);
        langSelect.add(opt1);
        introLangSelect.add(opt2);
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
   LANGUAGE CHANGE HANDLER
------------------------------------------------------ */
document.getElementById("languageSelect").addEventListener("change", (e) => {
    currentLanguage = e.target.value;
    updateUIText();

    // If tour is active, refresh the current step text
    if (!document.getElementById("tourOverlay").classList.contains("hidden")) {
        loadTourStep();
    }
});

/* ------------------------------------------------------
   FORM CHANGE HANDLER
------------------------------------------------------ */
document.getElementById("formSelect").addEventListener("change", (e) => {
    currentForm = e.target.value;
});

/* ------------------------------------------------------
   SEND BUTTON HANDLER
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
   ADD CHAT MESSAGES
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
