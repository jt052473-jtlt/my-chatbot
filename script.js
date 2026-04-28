// Demo overlay fade-out
const demoOverlay = document.getElementById("demoOverlay");
document.getElementById("startDemoBtn").addEventListener("click", () => {
    demoOverlay.classList.add("hidden");
    setTimeout(() => demoOverlay.style.display = "none", 500);
});

// Elements
const chatWindow = document.getElementById("chatWindow");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const finishBtn = document.getElementById("finishBtn");
const repeatBtn = document.getElementById("repeatBtn");
const skipBtn = document.getElementById("skipBtn");
const resetBtn = document.getElementById("resetBtn");

const micBtn = document.getElementById("micBtn");
const readAloudToggle = document.getElementById("readAloudToggle");
const voiceModeToggle = document.getElementById("voiceModeToggle");
const languageSelect = document.getElementById("languageSelect");
const languageSearch = document.getElementById("languageSearch");

// State
let readAloudEnabled = false;
let voiceModeEnabled = false;
let currentQuestionIndex = 0;

// Top 10 languages
const topLanguages = [
    "English", "Spanish", "French", "Chinese", "Arabic",
    "Hindi", "Portuguese", "Bengali", "Russian", "German"
];

// Populate dropdown
function loadLanguages(list) {
    languageSelect.innerHTML = "";
    list.forEach(lang => {
        const opt = document.createElement("option");
        opt.value = lang;
        opt.textContent = lang;
        languageSelect.appendChild(opt);
    });
}
loadLanguages(topLanguages);

// Search filter
languageSearch.addEventListener("input", () => {
    const q = languageSearch.value.toLowerCase();
    const filtered = topLanguages.filter(l => l.toLowerCase().includes(q));
    loadLanguages(filtered);
});

// Mic toggle
micBtn.addEventListener("click", () => {
    micBtn.classList.toggle("active");
});

// Toggles
readAloudToggle.addEventListener("change", () => {
    readAloudEnabled = readAloudToggle.checked;
});

voiceModeToggle.addEventListener("change", () => {
    voiceModeEnabled = voiceModeToggle.checked;
});

// Progress bar
function updateProgress() {
    const percent = (currentQuestionIndex / questions.length) * 100;
    document.getElementById("progressBar").style.width = percent + "%";
}

// Chat helpers
function addMessage(text, sender = "bot") {
    const msg = document.createElement("div");
    msg.classList.add("message", sender);
    msg.textContent = text;
    chatWindow.appendChild(msg);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Questions
const questions = [
    "Welcome to the Sleep Intake Assistant. What is your full name?",
    "What is your date of birth?",
    "What time do you usually go to bed?",
    "How long does it take you to fall asleep?",
    "How many times do you wake up during the night?",
    "What time do you usually wake up?",
    "Do you snore loudly?",
    "Has anyone observed you stop breathing during sleep?",
    "Do you feel rested when you wake up?",
    "Anything else you’d like to share about your sleep?"
];

// Ask question
function askQuestion() {
    if (currentQuestionIndex < questions.length) {
        addMessage(questions[currentQuestionIndex], "bot");
        updateProgress();
    } else {
        addMessage("Thank you. Intake complete.", "bot");
        updateProgress();
    }
}

// Start
startBtn.addEventListener("click", () => {
    if (currentQuestionIndex === 0 && chatWindow.children.length === 0) {
        askQuestion();
    }
});

// Send
sendBtn.addEventListener("click", () => {
    const text = userInput.value.trim();
    if (!text) return;

    addMessage(text, "user");
    userInput.value = "";

    currentQuestionIndex++;
    askQuestion();
});

// Enter key
userInput.addEventListener("keydown", e => {
    if (e.key === "Enter") sendBtn.click();
});

// Controls
pauseBtn.addEventListener("click", () => addMessage("Intake paused.", "bot"));
finishBtn.addEventListener("click", () => {
    currentQuestionIndex = questions.length;
    askQuestion();
});
repeatBtn.addEventListener("click", () => {
    if (currentQuestionIndex > 0) currentQuestionIndex--;
    askQuestion();
});
skipBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    askQuestion();
});
resetBtn.addEventListener("click", () => {
    chatWindow.innerHTML = "";
    currentQuestionIndex = 0;
    updateProgress();
    addMessage("Intake reset.", "bot");
});
