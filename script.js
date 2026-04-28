// Demo overlay fade-out
const demoOverlay = document.getElementById("demoOverlay");
const startDemoBtn = document.getElementById("startDemoBtn");

if (startDemoBtn) {
    startDemoBtn.addEventListener("click", () => {
        demoOverlay.classList.add("hidden");
        setTimeout(() => {
            demoOverlay.style.display = "none";
        }, 500);
    });
}

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
const totalQuestions = 10; // adjust to your real count

// Top 10 languages (greatest to least)
const topLanguages = [
    "English",
    "Spanish",
    "French",
    "Chinese",
    "Arabic",
    "Hindi",
    "Portuguese",
    "Bengali",
    "Russian",
    "German"
];

// Populate language dropdown
topLanguages.forEach(lang => {
    const option = document.createElement("option");
    option.value = lang;
    option.textContent = lang;
    languageSelect.appendChild(option);
});

// Simple language search filter
languageSearch.addEventListener("input", () => {
    const query = languageSearch.value.toLowerCase();
    languageSelect.innerHTML = "";
    topLanguages
        .filter(lang => lang.toLowerCase().includes(query))
        .forEach(lang => {
            const option = document.createElement("option");
            option.value = lang;
            option.textContent = lang;
            languageSelect.appendChild(option);
        });
});

// Mic toggle
micBtn.addEventListener("click", () => {
    micBtn.classList.toggle("active");
});

// Read Aloud + Voice Mode toggles
readAloudToggle.addEventListener("change", () => {
    readAloudEnabled = readAloudToggle.checked;
});

voiceModeToggle.addEventListener("change", () => {
    voiceModeEnabled = voiceModeToggle.checked;
});

// Progress bar update
function updateProgress(current, total) {
    const percent = Math.min(100, (current / total) * 100);
    document.getElementById("progressBar").style.width = percent + "%";
}

// Basic chat helpers
function addMessage(text, sender = "bot") {
    const msg = document.createElement("div");
    msg.classList.add("message", sender);
    msg.textContent = text;
    chatWindow.appendChild(msg);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Example question flow
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

function askCurrentQuestion() {
    if (currentQuestionIndex < questions.length) {
        addMessage(questions[currentQuestionIndex], "bot");
        updateProgress(currentQuestionIndex, questions.length);
    } else {
        addMessage("Thank you. The intake is complete.", "bot");
        updateProgress(questions.length, questions.length);
    }
}

// Start button
startBtn.addEventListener("click", () => {
    if (currentQuestionIndex === 0 && chatWindow.children.length === 0) {
        askCurrentQuestion();
    }
});

// Send button
sendBtn.addEventListener("click", () => {
    const text = userInput.value.trim();
    if (!text) return;
    addMessage(text, "user");
    userInput.value = "";

    // Move to next question
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        askCurrentQuestion();
    } else {
        addMessage("Thank you. The intake is complete.", "bot");
        updateProgress(questions.length, questions.length);
    }
});

// Enter key
userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        sendBtn.click();
    }
});

// Other controls (stubs you can expand)
pauseBtn.addEventListener("click", () => {
    addMessage("Intake paused.", "bot");
});

finishBtn.addEventListener("click", () => {
    currentQuestionIndex = questions.length;
    updateProgress(questions.length, questions.length);
    addMessage("Intake finished early.", "bot");
});

repeatBtn.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        addMessage("Repeating previous question.", "bot");
        askCurrentQuestion();
    }
});

skipBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    addMessage("Question skipped.", "bot");
    askCurrentQuestion();
});

resetBtn.addEventListener("click", () => {
    chatWindow.innerHTML = "";
    currentQuestionIndex = 0;
    updateProgress(0, questions.length);
    addMessage("Intake reset.", "bot");
});
