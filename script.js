/* -----------------------------
   DOM ELEMENTS
------------------------------*/

const micButton = document.getElementById("micButton");
const languageSelect = document.getElementById("languageSelect");
const readAloudToggle = document.getElementById("readAloudToggle");
const voiceModeToggle = document.getElementById("voiceModeToggle");
const chat = document.getElementById("chat");
const textInput = document.getElementById("textInput");
const progressBar = document.getElementById("progressBar");
const printBtn = document.getElementById("printBtn");

/* -----------------------------
   INTERVIEW QUESTIONS
------------------------------*/

const questions = [
    "What is your full name?",
    "What is your date of birth?",
    "What brings you in today?",
    "How long have you been experiencing these symptoms?",
    "Do you have any diagnosed sleep disorders?",
    "Do you snore or has anyone told you that you snore?",
    "Do you wake up feeling rested?",
    "Do you take naps during the day?",
    "Do you consume caffeine? If so, how much?",
    "Do you take any sleep medications?",
    "Do you have any other medical conditions?",
    "Is there anything else you would like to share?"
];

let currentIndex = 0;
let interviewActive = false;
let paused = false;
let lastQuestion = "";

/* -----------------------------
   PROGRESS BAR LOGIC
------------------------------*/

function updateProgressBar() {
    const total = questions.length;
    const answered = Math.min(currentIndex, total);
    const percent = (answered / total) * 100;
    progressBar.style.width = `${percent}%`;

    // White → Dark Blue
    const startColor = { r: 255, g: 255, b: 255 };   // white
    const endColor = { r: 0, g: 80, b: 200 };        // darker blue

    const t = answered / total;
    const r = Math.round(startColor.r + (endColor.r - startColor.r) * t);
    const g = Math.round(startColor.g + (endColor.g - startColor.g) * t);
    const b = Math.round(startColor.b + (endColor.b - startColor.b) * t);

    progressBar.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}

/* -----------------------------
   CHAT FUNCTIONS
------------------------------*/

function addMessage(text, sender) {
    const msg = document.createElement("div");
    msg.className = `message ${sender}`;
    msg.textContent = text;
    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;
}

function askQuestion() {
    if (currentIndex >= questions.length) {
        addMessage("Interview complete. Thank you.", "bot");
        interviewActive = false;
        updateProgressBar();
        showPrintButton();
        return;
    }
    lastQuestion = questions[currentIndex];
    addMessage(lastQuestion, "bot");
    speak(lastQuestion);
    updateProgressBar();
}

/* -----------------------------
   BUTTON LOGIC
------------------------------*/

document.getElementById("startBtn").onclick = () => {
    interviewActive = true;
    paused = false;
    currentIndex = 0;
    chat.innerHTML = "";
    hidePrintButton();
    addMessage("Interview started.", "bot");
    updateProgressBar();
    askQuestion();
};

document.getElementById("pauseBtn").onclick = () => {
    if (!interviewActive) return;
    paused = !paused;
    addMessage(paused ? "Interview paused." : "Interview resumed.", "bot");
};

/* -----------------------------
   FINISH BUTTON WITH CONFIRMATION
------------------------------*/

document.getElementById("finishBtn").onclick = () => {
    if (!interviewActive) return;

    const confirmFinish = confirm("Are you sure you want to finish the interview?");

    if (confirmFinish) {
        interviewActive = false;
        addMessage("Interview finished.", "bot");
        updateProgressBar();
        showPrintButton();
    } else {
        addMessage("Returning to the last question.", "bot");
        if (lastQuestion) {
            addMessage(lastQuestion, "bot");
            speak(lastQuestion);
        }
    }
};

document.getElementById("resetBtn").onclick = () => {
    interviewActive = false;
    paused = false;
    currentIndex = 0;
    chat.innerHTML = "";
    hidePrintButton();
    addMessage("Interview reset.", "bot");
    updateProgressBar();
};

document.getElementById("repeatBtn").onclick = () => {
    if (lastQuestion) {
        addMessage(lastQuestion, "bot");
        speak(lastQuestion);
    }
};

document.getElementById("skipBtn").onclick = () => {
    if (!interviewActive || paused) return;
    currentIndex++;
    askQuestion();
};

document.getElementById("sendBtn").onclick = sendText;
textInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendText();
});

function sendText() {
    const text = textInput.value.trim();
    if (!text) return;
    addMessage(text, "user");
    textInput.value = "";
    if (interviewActive && !paused) {
        currentIndex++;
        askQuestion();
    }
}

/* -----------------------------
   PRINT SUMMARY
------------------------------*/

function showPrintButton() {
    printBtn.style.display = "block";
}

function hidePrintButton() {
    printBtn.style.display = "none";
}

printBtn.onclick = () => {
    window.print();
};

/* -----------------------------
   VOICE SYSTEM
------------------------------*/

let recognition = null;
let voiceMode = false;
let silenceTimer = null;

function getSoftFemaleVoice(lang) {
    const voices = speechSynthesis.getVoices();
    return voices.find(v => v.lang === lang) || voices[0];
}

function speak(text) {
    if (!readAloudToggle.checked) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = languageSelect.value;
    utter.voice = getSoftFemaleVoice(languageSelect.value);
    utter.rate = 0.95;
    speechSynthesis.speak(utter);
}

function initRecognition() {
    if (!("webkitSpeechRecognition" in window)) {
        addMessage("Voice recognition not supported in this browser.", "bot");
        return;
    }

    recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = languageSelect.value;

    recognition.onstart = () => {
        micButton.classList.add("active");
    };

    recognition.onspeechend = () => {
        startSilenceCountdown();
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        addMessage(transcript, "user");
        if (interviewActive && !paused) {
            currentIndex++;
            askQuestion();
        }
    };

    recognition.onend = () => {
        if (voiceMode) {
            try { recognition.start(); } catch (e) {}
        } else {
            micButton.classList.remove("active");
        }
    };
}

function startSilenceCountdown() {
    clearTimeout(silenceTimer);
    silenceTimer = setTimeout(() => {
        voiceMode = false;
        voiceModeToggle.checked = false;
        if (recognition) recognition.stop();
        micButton.classList.remove("active");
        addMessage("Voice Mode turned off due to inactivity.", "bot");
    }, 20000);
}

/* -----------------------------
   MIC TOGGLE BEHAVIOR
------------------------------*/

micButton.onclick = () => {
    if (!voiceMode) {
        voiceMode = true;
        voiceModeToggle.checked = true;
        if (!recognition) initRecognition();
        try { recognition.start(); } catch (e) {}
        micButton.classList.add("active");
    } else {
        voiceMode = false;
        voiceModeToggle.checked = false;
        clearTimeout(silenceTimer);
        if (recognition) recognition.stop();
        micButton.classList.remove("active");
    }
};

languageSelect.onchange = () => {
    if (recognition) recognition.lang = languageSelect.value;
};

voiceModeToggle.onchange = () => {
    voiceMode = voiceModeToggle.checked;
    if (!voiceMode) {
        clearTimeout(silenceTimer);
        if (recognition) recognition.stop();
        micButton.classList.remove("active");
    } else {
        if (!recognition) initRecognition();
        try { recognition.start(); } catch (e) {}
        micButton.classList.add("active");
    }
};

/* -----------------------------
   INITIALIZE
------------------------------*/

updateProgressBar();
