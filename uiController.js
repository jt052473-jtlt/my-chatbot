// ===============================
// UI CONTROLLER
// Handles UI updates, button states, and chat rendering
// ===============================

// Enable or disable all control buttons
function setControlsEnabled(enabled) {
    document.getElementById("startBtn").disabled = !enabled;
    document.getElementById("pauseBtn").disabled = !enabled;
    document.getElementById("repeatBtn").disabled = !enabled;
    document.getElementById("skipBtn").disabled = !enabled;
    document.getElementById("resetBtn").disabled = !enabled;
    document.getElementById("finishBtn").disabled = !enabled;
}

// Add a bot message to the chat window
function addBotMessage(text) {
    const chat = document.getElementById("chatWindow");
    const msg = document.createElement("div");
    msg.className = "bot-message";
    msg.textContent = text;
    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;
}

// Add a user message to the chat window
function addUserMessage(text) {
    const chat = document.getElementById("chatWindow");
    const msg = document.createElement("div");
    msg.className = "user-message";
    msg.textContent = text;
    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;
}

// Clear the chat window
function clearChat() {
    document.getElementById("chatWindow").innerHTML = "";
}

// Update the progress bar
function updateProgressBar() {
    const formData = translations[currentLanguage].forms[selectedForm];
    const total = formData.questions.length;
    const percent = Math.min((currentStep / total) * 100, 100);
    document.getElementById("progressBar").style.width = percent + "%";
}

// Apply UI language changes
function applyLanguage() {
    const ui = translations[currentLanguage].ui;

    document.getElementById("appTitle").textContent = ui.appTitle;
    document.getElementById("startBtn").textContent = ui.start;
    document.getElementById("pauseBtn").textContent = ui.pause;
    document.getElementById("finishBtn").textContent = ui.finish;
    document.getElementById("repeatBtn").textContent = ui.repeat;
    document.getElementById("skipBtn").textContent = ui.skip;
    document.getElementById("resetBtn").textContent = ui.reset;
    document.getElementById("sendBtn").textContent = ui.send;
    document.getElementById("userInput").placeholder = ui.typeHere;
    document.getElementById("toggleVoice").textContent = ui.voiceMode;

    resetInterview();
}

// Initialize UI on load
applyLanguage();

// Expose functions globally
window.applyLanguage = applyLanguage;
window.addBotMessage = addBotMessage;
window.addUserMessage = addUserMessage;
window.clearChat = clearChat;
window.updateProgressBar = updateProgressBar;
window.setControlsEnabled = setControlsEnabled;
