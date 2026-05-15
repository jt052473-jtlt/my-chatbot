/* ------------------------------------------------------
   MAIN APP CONTROLLER
   (Fixed: demo buttons, language switching, UI text)
------------------------------------------------------ */

let currentLanguage = "English";
let currentForm = "admission";
let currentStep = 0;

/* ------------------------------------------------------
   INITIALIZATION
------------------------------------------------------ */
window.onload = () => {
    populateLanguageDropdown();
    populateFormDropdown();
    initMic();
    attachEventListeners();
    updateUIText(); // make sure UI matches currentLanguage
};

/* ------------------------------------------------------
   POPULATE LANGUAGE DROPDOWN
------------------------------------------------------ */
function populateLanguageDropdown() {
    const langSelect = document.getElementById("languageSelect");
    const introLangSelect = document.getElementById("introLanguageSelect");

    if (!langSelect || !introLangSelect) return;

    langSelect.innerHTML = "";
    introLangSelect.innerHTML = "";

    Object.keys(translations).forEach(lang => {
        const opt1 = document.createElement("option");
        opt1.value = lang;
        opt1.textContent = lang;

        const opt2 = opt1.cloneNode(true);

        langSelect.appendChild(opt1);
        introLangSelect.appendChild(opt2);
    });

    // Keep everything in sync with currentLanguage
    langSelect.value = currentLanguage;
    introLangSelect.value = currentLanguage;
}

/* ------------------------------------------------------
   POPULATE FORM DROPDOWN
------------------------------------------------------ */
function populateFormDropdown() {
    const formSelect = document.getElementById("formSelect");
    if (!formSelect) return;
    formSelect.value = currentForm;
}

/* ------------------------------------------------------
   EVENT LISTENERS
------------------------------------------------------ */
function attachEventListeners() {
    const startBtn = document.getElementById("startBtn");
    const sendBtn = document.getElementById("sendBtn");
    const resetBtn = document.getElementById("resetBtn");
    const skipBtn = document.getElementById("skipBtn");
    const repeatBtn = document.getElementById("repeatBtn");
    const finishBtn = document.getElementById("finishBtn");
    const pauseBtn = document.getElementById("pauseBtn");
    const micBtn = document.getElementById("micBtn");
    const langSelect = document.getElementById("languageSelect");
    const formSelect = document.getElementById("formSelect");
    const startDemoBtn = document.getElementById("startDemoBtn");
    const introExitBtn = document.getElementById("introExitBtn");
    const introLangSelect = document.getElementById("introLanguageSelect");

    if (startBtn) startBtn.onclick = startInterview;
    if (sendBtn) sendBtn.onclick = sendUserInput;
    if (resetBtn) resetBtn.onclick = resetInterview;
    if (skipBtn) skipBtn.onclick = skipQuestion;
    if (repeatBtn) repeatBtn.onclick = repeatQuestion;
    if (finishBtn) finishBtn.onclick = showSummary;
    if (pauseBtn) pauseBtn.onclick = () => addBotMessage("Paused.");

    if (micBtn) micBtn.onclick = toggleMic;

    if (langSelect) {
        langSelect.onchange = (e) => {
            currentLanguage = e.target.value;
            // keep intro selector in sync
            if (introLangSelect) introLangSelect.value = currentLanguage;
            updateUIText();
            setRecognitionLanguage(currentLanguage);
        };
    }

    if (formSelect) {
        formSelect.onchange = (e) => {
            currentForm = e.target.value;
            resetInterview();
        };
    }

    if (introLangSelect) {
        introLangSelect.onchange = (e) => {
            currentLanguage = e.target.value;
            if (langSelect) langSelect.value = currentLanguage;
            updateUIText();
            setRecognitionLanguage(currentLanguage);
        };
    }

    if (startDemoBtn) {
        startDemoBtn.onclick = () => {
            const overlay = document.getElementById("demoOverlay");
            if (overlay) overlay.style.display = "none";

            // ensure language from intro is applied
            if (introLangSelect) {
                currentLanguage = introLangSelect.value;
                if (langSelect) langSelect.value = currentLanguage;
                updateUIText();
                setRecognitionLanguage(currentLanguage);
            }

            startInterview();
        };
    }

    if (introExitBtn) {
        introExitBtn.onclick = () => {
            const overlay = document.getElementById("demoOverlay");
            if (overlay) overlay.style.display = "none";
        };
    }
}

/* ------------------------------------------------------
   START INTERVIEW
------------------------------------------------------ */
function startInterview() {
    currentStep = 0;
    interviewAnswers = {};
    clearChat();
    showQuestion();
}

/* ------------------------------------------------------
   SEND USER INPUT
------------------------------------------------------ */
function sendUserInput() {
    const input = document.getElementById("userInput");
    if (!input) return;

    const text = input.value.trim();
    if (!text) return;

    addUserMessage(text);
    processUserResponse(text);

    input.value = "";
}

/* ------------------------------------------------------
   SKIP QUESTION
------------------------------------------------------ */
function skipQuestion() {
    addBotMessage("Skipping...");
    currentStep++;
    showQuestion();
}

/* ------------------------------------------------------
   REPEAT QUESTION
------------------------------------------------------ */
function repeatQuestion() {
    const questions = forms[currentForm].questions;

    if (currentStep < questions.length) {
        const q = questions[currentStep];
        addBotMessage(q);
        speakText(q, currentLanguage);
    }
}

/* ------------------------------------------------------
   RESET INTERVIEW
------------------------------------------------------ */
function resetInterview() {
    currentStep = 0;
    interviewAnswers = {};
    clearChat();
    updateProgressBar();
}

/* ------------------------------------------------------
   CHAT HELPERS
------------------------------------------------------ */
function addBotMessage(text) {
    const chat = document.getElementById("chatWindow");
    if (!chat) return;

    const div = document.createElement("div");
    div.className = "bot-message";
    div.textContent = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

function addUserMessage(text) {
    const chat = document.getElementById("chatWindow");
    if (!chat) return;

    const div = document.createElement("div");
    div.className = "user-message";
    div.textContent = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

function clearChat() {
    const chat = document.getElementById("chatWindow");
    if (!chat) return;
    chat.innerHTML = "";
}

/* ------------------------------------------------------
   PROGRESS BAR
------------------------------------------------------ */
function updateProgressBar() {
    const bar = document.getElementById("progressBar");
    if (!bar) return;

    const total = forms[currentForm].questions.length;
    const percent = Math.min((currentStep / total) * 100, 100);
    bar.style.width = percent + "%";
}

/* ------------------------------------------------------
   EXPORT
------------------------------------------------------ */
window.startInterview = startInterview;
window.sendUserInput = sendUserInput;
window.resetInterview = resetInterview;
window.skipQuestion = skipQuestion;
window.repeatQuestion = repeatQuestion;
window.updateProgressBar = updateProgressBar;
window.addBotMessage = addBotMessage;
window.addUserMessage = addUserMessage;
