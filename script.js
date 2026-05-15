/* ------------------------------------------------------
   MAIN APP CONTROLLER
   (Aligned, cleaned, same logic, same names)
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
};

/* ------------------------------------------------------
   POPULATE LANGUAGE DROPDOWN
------------------------------------------------------ */
function populateLanguageDropdown() {
    const langSelect = document.getElementById("languageSelect");
    const introLangSelect = document.getElementById("introLanguageSelect");

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

    langSelect.value = currentLanguage;
    introLangSelect.value = currentLanguage;
}

/* ------------------------------------------------------
   POPULATE FORM DROPDOWN
------------------------------------------------------ */
function populateFormDropdown() {
    const formSelect = document.getElementById("formSelect");
    formSelect.value = currentForm;
}

/* ------------------------------------------------------
   EVENT LISTENERS
------------------------------------------------------ */
function attachEventListeners() {
    document.getElementById("startBtn").onclick = startInterview;
    document.getElementById("sendBtn").onclick = sendUserInput;
    document.getElementById("resetBtn").onclick = resetInterview;
    document.getElementById("skipBtn").onclick = skipQuestion;
    document.getElementById("repeatBtn").onclick = repeatQuestion;
    document.getElementById("finishBtn").onclick = showSummary;
    document.getElementById("pauseBtn").onclick = () => addBotMessage("Paused.");

    document.getElementById("micBtn").onclick = toggleMic;

    document.getElementById("languageSelect").onchange = (e) => {
        currentLanguage = e.target.value;
    };

    document.getElementById("formSelect").onchange = (e) => {
        currentForm = e.target.value;
        resetInterview();
    };

    document.getElementById("startDemoBtn").onclick = () => {
        document.getElementById("demoOverlay").style.display = "none";
        startInterview();
    };

    document.getElementById("introExitBtn").onclick = () => {
        document.getElementById("demoOverlay").style.display = "none";
    };
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

function clearChat() {
    document.getElementById("chatWindow").innerHTML = "";
}

/* ------------------------------------------------------
   PROGRESS BAR
------------------------------------------------------ */
function updateProgressBar() {
    const total = forms[currentForm].questions.length;
    const percent = Math.min((currentStep / total) * 100, 100);
    document.getElementById("progressBar").style.width = percent + "%";
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
