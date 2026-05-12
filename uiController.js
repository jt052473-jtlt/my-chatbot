/* ------------------------------------------------------
   UI CONTROLLER — Handles all language-based UI updates
------------------------------------------------------ */

function updateUIForLanguage() {
    const ui = translations[currentLanguage].ui;

    /* Header */
    document.querySelector(".app-header h2").textContent = ui.appTitle;

    /* Buttons */
    document.getElementById("startBtn").textContent = ui.start;
    document.getElementById("pauseBtn").textContent = ui.pause;
    document.getElementById("finishBtn").textContent = ui.finish;
    document.getElementById("repeatBtn").textContent = ui.repeat;
    document.getElementById("skipBtn").textContent = ui.skip;
    document.getElementById("resetBtn").textContent = ui.reset;
    document.getElementById("sendBtn").textContent = ui.send;

    /* Input placeholder */
    document.getElementById("userInput").placeholder = ui.typeHere;

    /* Toggles */
    document.querySelector("label[for='readAloudToggle'] span").textContent = ui.readAloud;
    document.querySelector("label[for='voiceModeToggle'] span").textContent = ui.voiceMode;

    /* Guided Tour Buttons (if present) */
    const nextBtn = document.getElementById("tourNextBtn");
    const exitBtn = document.getElementById("tourExitBtn");
    if (nextBtn) nextBtn.textContent = ui.next;
    if (exitBtn) exitBtn.textContent = ui.exit;
}

/* ------------------------------------------------------
   CHAT WINDOW HELPERS
------------------------------------------------------ */

function addBotMessage(text) {
    const chat = document.getElementById("chatWindow");

    const bubble = document.createElement("div");
    bubble.className = "bot-message";
    bubble.textContent = text;

    chat.appendChild(bubble);
    chat.scrollTop = chat.scrollHeight;
}

function addUserMessage(text) {
    const chat = document.getElementById("chatWindow");

    const bubble = document.createElement("div");
    bubble.className = "user-message";
    bubble.textContent = text;

    chat.appendChild(bubble);
    chat.scrollTop = chat.scrollHeight;
}

/* ------------------------------------------------------
   PROGRESS BAR
------------------------------------------------------ */

function updateProgressBar() {
    const total = translations[currentLanguage].questions.length;
    const percent = total === 0 ? 0 : (currentStep / total) * 100;

    document.getElementById("progressBar").style.width = percent + "%";
}

/* ------------------------------------------------------
   EXPORT FUNCTIONS
------------------------------------------------------ */
window.updateUIForLanguage = updateUIForLanguage;
window.addBotMessage = addBotMessage;
window.addUserMessage = addUserMessage;
window.updateProgressBar = updateProgressBar;
