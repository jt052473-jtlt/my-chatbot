// Simple demo conversation flow (placeholder)
const chatWindow = document.getElementById("chatWindow");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

function addMessage(text, sender = "bot") {
    const msg = document.createElement("div");
    msg.classList.add("message", sender);
    msg.textContent = text;
    chatWindow.appendChild(msg);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Initial bot message when Start is clicked
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const finishBtn = document.getElementById("finishBtn");
const repeatBtn = document.getElementById("repeatBtn");
const skipBtn = document.getElementById("skipBtn");
const resetBtn = document.getElementById("resetBtn");

startBtn.addEventListener("click", () => {
    addMessage("Welcome. Let’s begin your sleep intake. What brings you in today?");
});

pauseBtn.addEventListener("click", () => {
    addMessage("Okay, pausing for a moment. Let me know when you’re ready to continue.");
});

finishBtn.addEventListener("click", () => {
    addMessage("Thank you. Your intake is complete. The summary will be available to your clinician.");
});

repeatBtn.addEventListener("click", () => {
    addMessage("I’ll repeat the last question for you.");
});

skipBtn.addEventListener("click", () => {
    addMessage("No problem, we’ll skip that question and move on.");
});

resetBtn.addEventListener("click", () => {
    chatWindow.innerHTML = "";
    addMessage("Session reset. Click Start when you’re ready to begin again.");
});

// Send button / Enter key
sendBtn.addEventListener("click", handleUserSend);
userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        handleUserSend();
    }
});

function handleUserSend() {
    const text = userInput.value.trim();
    if (!text) return;
    addMessage(text, "user");
    userInput.value = "";

    // Simple echo-style bot response placeholder
    setTimeout(() => {
        addMessage("Thanks for sharing. (Demo response)");
    }, 600);
}

// Accessibility buttons (placeholder behavior)
const readAloudBtn = document.getElementById("readAloudBtn");
const voiceModeBtn = document.getElementById("voiceModeBtn");
const micBtn = document.getElementById("micBtn");

readAloudBtn.addEventListener("click", () => {
    addMessage("Read Aloud is not fully implemented in this demo, but would speak questions and responses.", "bot");
});

voiceModeBtn.addEventListener("click", () => {
    addMessage("Voice Mode would allow you to answer using your voice instead of typing.", "bot");
});

micBtn.addEventListener("click", () => {
    addMessage("🎤 Voice capture is not active in this demo build.", "bot");
});

// Apple-style Start Demo fade-out
document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("startDemoBtn");
    if (!btn) return;

    btn.addEventListener("click", () => {
        const overlay = document.getElementById("demoOverlay");
        overlay.classList.add("fade-out");

        // Remove overlay from DOM after fade
        setTimeout(() => {
            overlay.style.display = "none";
        }, 1000);
    });
});
