// Clinical Questions Queue
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

// Utility to add messages to UI
function addMessage(text, sender = "bot") {
    const msg = document.createElement("div");
    msg.classList.add("message", sender);
    msg.textContent = text;
    chatWindow.appendChild(msg);
    chatWindow.scrollTo({ top: chatWindow.scrollHeight, behavior: 'smooth' });
}

// Logic to trigger the next clinical question
function nextQuestion() {
    if (currentStep < questions.length) {
        setTimeout(() => {
            addMessage(questions[currentStep]);
            currentStep++;
        }, 800); // Slight delay for natural feel
    } else {
        setTimeout(() => {
            addMessage("Intake complete. Your clinician will review these details shortly. Thank you!");
        }, 800);
    }
}

// Button Event Listeners
document.getElementById("startBtn").addEventListener("click", () => {
    if (currentStep === 0) {
        addMessage("Welcome to your Clinical Intake Assistant. Let's begin.");
        nextQuestion();
    }
});

document.getElementById("resetBtn").addEventListener("click", () => {
    chatWindow.innerHTML = "";
    currentStep = 0;
    addMessage("Session reset. Click Start to begin again.");
});

// Handle Sending Messages
function handleSend() {
    const text = userInput.value.trim();
    if (!text) return;

    addMessage(text, "user");
    userInput.value = "";
    
    // Trigger next bot question after user answers
    nextQuestion();
}

document.getElementById("sendBtn").addEventListener("click", handleSend);
userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleSend();
});

// Demo Overlay Dismissal
document.getElementById("startDemoBtn").addEventListener("click", () => {
    document.getElementById("demoOverlay").classList.add("fade-out");
});
