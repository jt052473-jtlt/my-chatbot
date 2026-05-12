// ===============================
// GLOBAL STATE
// ===============================
let currentLanguage = "English";

// ===============================
// CHAT WINDOW HELPERS
// ===============================
function addBotMessage(text) {
    const chat = document.getElementById("chatWindow");
    const msg = document.createElement("div");
    msg.className = "bot-message";
    msg.textContent = text;
    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;
}

function addUserMessage(text) {
    const chat = document.getElementById("chatWindow");
    const msg = document.createElement("div");
    msg.className = "user-message";
    msg.textContent = text;
    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;
}

function clearChat() {
    document.getElementById("chatWindow").innerHTML = "";
}

// ===============================
// PROGRESS BAR
// ===============================
function updateProgressBar() {
    const formData = translations[currentLanguage].forms[selectedForm];
    const total = formData.questions.length;
    const percent = Math.min((currentStep / total) * 100, 100);
    document.getElementById("progressBar").style.width = percent + "%";
}

// ===============================
// LANGUAGE SWITCHING
// ===============================
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

    // Reset chat + restart form when language changes
    resetInterview();
}

// ===============================
// SEND BUTTON HANDLER
// ===============================
document.getElementById("sendBtn").addEventListener("click", () => {
    const input = document.getElementById("userInput");
    const text = input.value.trim();
    if (text === "") return;

    addUserMessage(text);
    input.value = "";

    processUserResponse(text);
});

// ENTER KEY HANDLER
document.getElementById("userInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        document.getElementById("sendBtn").click();
    }
});

// ===============================
// LANGUAGE SELECTOR
// ===============================
document.getElementById("languageSelect").addEventListener("change", (e) => {
    currentLanguage = e.target.value;
    applyLanguage();
});

// ===============================
// CONTROL BUTTONS
// ===============================
document.getElementById("startBtn").addEventListener("click", () => {
    resetInterview();
    showQuestion();
});

document.getElementById("pauseBtn").addEventListener("click", () => {
    isPaused = !isPaused;
    const ui = translations[currentLanguage].ui;
    document.getElementById("pauseBtn").textContent = isPaused ? ui.start : ui.pause;
});

document.getElementById("repeatBtn").addEventListener("click", () => {
    const formData = translations[currentLanguage].forms[selectedForm];
    const question = formData.questions[currentStep] || "";
    addBotMessage(question);
    speakText(question);
});

document.getElementById("skipBtn").addEventListener("click", () => {
    currentStep++;
    showQuestion();
});

document.getElementById("resetBtn").addEventListener("click", () => {
    resetInterview();
});

document.getElementById("finishBtn").addEventListener("click", () => {
    displaySummary();
});

// ===============================
// INITIAL LOAD
// ===============================
applyLanguage();
