function updateUIForLanguage() {
    const ui = translations[currentLanguage].ui;

    document.querySelector(".app-header h2").textContent = ui.appTitle;

    document.getElementById("startBtn").textContent = ui.start;
    document.getElementById("pauseBtn").textContent = ui.pause;
    document.getElementById("finishBtn").textContent = ui.finish;
    document.getElementById("repeatBtn").textContent = ui.repeat;
    document.getElementById("skipBtn").textContent = ui.skip;
    document.getElementById("resetBtn").textContent = ui.reset;
    document.getElementById("sendBtn").textContent = ui.send;

    document.getElementById("userInput").placeholder = ui.typeHere;

    document.querySelector("label[for='readAloudToggle'] span").textContent = ui.readAloud;
    document.querySelector("label[for='voiceModeToggle'] span").textContent = ui.voiceMode;

    const nextBtn = document.getElementById("tourNextBtn");
    const exitBtn = document.getElementById("tourExitBtn");
    if (nextBtn) nextBtn.textContent = ui.next;
    if (exitBtn) exitBtn.textContent = ui.exit;
}

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

function updateProgressBar() {
    const total = translations[currentLanguage].questions.length;
    const percent = total === 0 ? 0 : (currentStep / total) * 100;
    document.getElementById("progressBar").style.width = percent + "%";
}

window.updateUIForLanguage = updateUIForLanguage;
window.addBotMessage = addBotMessage;
window.addUserMessage = addUserMessage;
window.updateProgressBar = updateProgressBar;
