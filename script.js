/* -----------------------------
   DOM ELEMENTS
------------------------------*/

const micButton = document.getElementById("micButton");
const languageSelect = document.getElementById("languageSelect");
const readAloudToggle = document.getElementById("readAloudToggle");
const voiceModeToggle = document.getElementById("voiceModeToggle");
const chat = document.getElementById("chat");
const textInput = document.getElementById("textInput");

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
        return;
    }
    lastQuestion = questions[currentIndex];
    addMessage(lastQuestion, "bot");
    speak(lastQuestion);
}

/* -----------------------------
   BUTTON LOGIC
------------------------------*/

document.getElementById("startBtn").onclick = () => {
    interviewActive = true;
    paused = false;
    currentIndex = 0;
    chat.innerHTML = "";
    askQuestion();
};

document.getElementById("pauseBtn").onclick = () => {
    paused = !paused;
    addMessage(paused ? "Interview paused." : "Interview resumed.", "bot");
};

document.getElementById("finishBtn").onclick = () => {
    interviewActive = false;
    addMessage("Interview finished.", "bot");
};

document.getElementById("resetBtn").onclick = () => {
    interviewActive = false;
    paused = false;
    currentIndex = 0;
    chat.innerHTML = "";
    addMessage("Interview reset.", "bot");
};

document.getElementById("repeatBtn").onclick = () => {
    if (lastQuestion) addMessage(lastQuestion, "bot");
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
   VOICE SYSTEM
------------------------------*/

let recognition;
let voiceMode = false;
let silenceTimer = null;
let silenceCountdown = 20;

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
        addMessage("Voice recognition not supported.", "bot");
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
        if (voiceMode) recognition.start();
        else micButton.classList.remove("active");
    };
}

function startSilenceCountdown() {
    clearTimeout(silenceTimer);
    silenceTimer = setTimeout(() => {
        voiceMode = false;
        micButton.classList.remove("active");
        recognition.stop();
        addMessage("Voice Mode turned off due to inactivity.", "bot");
    }, 20000);
}

micButton.onclick = () => {
    if (!voiceMode) {
        voiceMode = true;
        initRecognition();
        recognition.start();
    }
};

languageSelect.onchange = () => {
    if (recognition) recognition.lang = languageSelect.value;
};

voiceModeToggle.onchange = () => {
    voiceMode = voiceModeToggle.checked;
    if (!voiceMode && recognition) recognition.stop();
};
