// -------------------------------
// START SCREEN → FADE OUT
// -------------------------------
document.getElementById("startDemoSession").addEventListener("click", () => {
    const screen = document.getElementById("startScreen");
    screen.style.animation = "fadeOut 0.8s ease-out forwards";

    setTimeout(() => {
        screen.style.display = "none";
        document.querySelector(".app-container").style.display = "flex";
        initializeChat();
    }, 800);
});

// -------------------------------
// INITIAL CHAT SETUP
// -------------------------------
function initializeChat() {
    addBotMessage("Click the button below to begin.");
    insertStartDemoButton();
}

function insertStartDemoButton() {
    const chat = document.getElementById("chatWindow");

    const btn = document.createElement("button");
    btn.textContent = "Start Demo";
    btn.style.padding = "10px 16px";
    btn.style.fontSize = "16px";
    btn.style.marginTop = "10px";
    btn.style.cursor = "pointer";
    btn.style.background = "#0057ff";
    btn.style.color = "white";
    btn.style.border = "none";
    btn.style.borderRadius = "6px";

    btn.onclick = () => {
        addBotMessage("Great. Let’s begin.");
        startIntake();
        btn.remove();
    };

    chat.appendChild(btn);
    chat.scrollTop = chat.scrollHeight;
}

// -------------------------------
// BASIC CHAT FUNCTIONS
// -------------------------------
function addBotMessage(text) {
    const chat = document.getElementById("chatWindow");
    const msg = document.createElement("div");
    msg.className = "message bot";
    msg.textContent = text;
    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;
}

function addUserMessage(text) {
    const chat = document.getElementById("chatWindow");
    const msg = document.createElement("div");
    msg.className = "message user";
    msg.textContent = text;
    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;
}

// -------------------------------
// INTAKE LOGIC (RESTORED ORIGINAL)
// -------------------------------
let currentQuestion = 0;

const questions = [
    "What brings you in today?",
    "How long have you been experiencing this?",
    "Does anything make it better or worse?",
    "Have you had this issue before?",
    "Are you currently taking any medications?"
];

function startIntake() {
    currentQuestion = 0;
    askNextQuestion();
}

function askNextQuestion() {
    if (currentQuestion < questions.length) {
        addBotMessage(questions[currentQuestion]);
    } else {
        addBotMessage("Thank you. Your intake is complete.");
    }
}

document.getElementById("btnStart").onclick = () => askNextQuestion();
document.getElementById("btnPause").onclick = () => addBotMessage("Paused.");
document.getElementById("btnFinish").onclick = () => addBotMessage("Session finished.");
document.getElementById("btnRepeat").onclick = () => addBotMessage(questions[currentQuestion]);
document.getElementById("btnSkip").onclick = () => { currentQuestion++; askNextQuestion(); };
document.getElementById("btnReset").onclick = () => {
    document.getElementById("chatWindow").innerHTML = "";
    initializeChat();
};

// -------------------------------
// READ‑ALOUD (RESTORED ORIGINAL)
// -------------------------------
document.getElementById("readAloudBtn").onclick = () => {
    const last = document.querySelector(".message.bot:last-child");
    if (!last) return;

    const utter = new SpeechSynthesisUtterance(last.textContent);
    speechSynthesis.speak(utter);
};

// -------------------------------
// VOICE MODE (RESTORED ORIGINAL)
// -------------------------------
let recognition;
let listening = false;

if ("webkitSpeechRecognition" in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        addUserMessage(text);
        currentQuestion++;
        askNextQuestion();
    };

    recognition.onend = () => {
        listening = false;
        document.getElementById("micButton").classList.remove("listening");
    };
}

document.getElementById("micButton").onclick = () => {
    if (!recognition) return;

    if (!listening) {
        listening = true;
        document.getElementById("micButton").classList.add("listening");
        recognition.start();
    } else {
        listening = false;
        document.getElementById("micButton").classList.remove("listening");
        recognition.stop();
    }
};

// -------------------------------
// GUIDED TOUR
// -------------------------------
const tourSteps = [
    { element: "#btnStart", text: "Begin the next question in the intake." },
    { element: "#btnPause", text: "Pause the intake at any time." },
    { element: "#btnFinish", text: "Finish the session immediately." },
    { element: "#btnRepeat", text: "Repeat the current question." },
    { element: "#btnSkip", text: "Skip to the next question." },
    { element: "#btnReset", text: "Reset the entire intake session." },
    { element: "#readAloudBtn", text: "Read aloud the last assistant message." },
    { element: "#voiceModeCheckbox", text: "Enable voice mode for hands‑free input." },
    { element: "#micButton", text: "Tap to speak your answer." }
];

let tourIndex = 0;

document.getElementById("btnTour").onclick = () => startTour();

function startTour() {
    tourIndex = 0;
    document.getElementById("tourOverlay").style.display = "block";
    document.getElementById("tourControls").style.display = "flex";
    showTourStep();
}

function showTourStep() {
    const step = tourSteps[tourIndex];
    const el = document.querySelector(step.element);
    const tooltip = document.getElementById("tourTooltip");
    const arrow = document.getElementById("tourArrow");

    const rect = el.getBoundingClientRect();

    tooltip.style.left = rect.left + "px";
    tooltip.style.top = rect.bottom + 10 + "px";
    tooltip.textContent = step.text;

    arrow.style.left = rect.left + 20 + "px";
    arrow.style.top = rect.bottom - 5 + "px";
}

document.getElementById("tourNext").onclick = () => {
    tourIndex++;
    if (tourIndex >= tourSteps.length) endTour();
    else showTourStep();
};

document.getElementById("tourSkip").onclick = () => endTour();

function endTour() {
    document.getElementById("tourOverlay").style.display = "none";
    document.getElementById("tourControls").style.display = "none";
}
