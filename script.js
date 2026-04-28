const questions = [
    "What brings you in for a sleep study today?",
    "How many hours of sleep do you typically get per night?",
    "Do you often feel tired during the day despite sleeping?",
    "Has anyone ever told you that you snore or stop breathing at night?",
    "Do you take any medications to help you fall asleep?"
];

let currentStep = 0;
const chatWindow = document.getElementById("chatWindow");
const userInput = document.getElementById("userInput");

function addMessage(text, sender = "bot") {
    const msg = document.createElement("div");
    msg.classList.add("message", sender);
    msg.textContent = text;
    chatWindow.appendChild(msg);
    chatWindow.scrollTo({ top: chatWindow.scrollHeight, behavior: 'smooth' });
}

function nextQuestion() {
    if (currentStep < questions.length) {
        setTimeout(() => {
            addMessage(questions[currentStep]);
            currentStep++;
        }, 700);
    } else {
        setTimeout(() => {
            addMessage("Intake complete. Your clinician will review your results. Thank you!");
        }, 700);
    }
}

// Logic for Send
function handleSend() {
    const text = userInput.value.trim();
    if (!text) return;
    addMessage(text, "user");
    userInput.value = "";
    nextQuestion();
}

// Button Listeners
document.getElementById("startBtn").addEventListener("click", () => {
    if (currentStep === 0) {
        addMessage("Welcome. Let's begin your clinical intake.");
        nextQuestion();
    }
});

document.getElementById("sendBtn").addEventListener("click", handleSend);
userInput.addEventListener("keypress", (e) => { if (e.key === "Enter") handleSend(); });

document.getElementById("resetBtn").addEventListener("click", () => {
    chatWindow.innerHTML = "";
    currentStep = 0;
    addMessage("Session reset. Click Start to begin.");
});

document.getElementById("skipBtn").addEventListener("click", () => {
    addMessage("Skipping question...", "bot");
    nextQuestion();
});

document.getElementById("repeatBtn").addEventListener("click", () => {
    if (currentStep > 0) {
        addMessage("Repeating: " + questions[currentStep - 1]);
    }
});

document.getElementById("pauseBtn").addEventListener("click", () => {
    addMessage("Session paused. Reply when you're ready to continue.");
});

// Demo Overlay
document.getElementById("startDemoBtn").addEventListener("click", () => {
    document.getElementById("demoOverlay").classList.add("fade-out");
});
