// -----------------------------------------
// INTERVIEW FLOW ENGINE (5‑Question Demo)
// -----------------------------------------

let currentQuestionIndex = 0;
let currentForm = "admission";

// Define your forms and questions
const forms = {
    admission: [
        "What brings you in today?",
        "How long have you had these symptoms?",
        "Are you currently taking any medications?",
        "Do you have any allergies?",
        "Have you experienced this issue before?"
    ],
    sleep: [
        "How many hours do you sleep per night?",
        "Do you wake up feeling rested?",
        "Do you snore or have breathing issues at night?",
        "Do you take naps during the day?",
        "Do you use screens before bed?"
    ]
};

// -----------------------------------------
// START INTERVIEW
// -----------------------------------------
function startInterview() {
    currentForm = document.getElementById("formSelect").value;
    currentQuestionIndex = 0;

    clearChat();
    updateProgressBar(0);

    askNextQuestion();
}

// -----------------------------------------
// ASK NEXT QUESTION
// -----------------------------------------
function askNextQuestion() {
    const questions = forms[currentForm];

    if (currentQuestionIndex >= questions.length) {
        finishInterview();
        return;
    }

    const question = questions[currentQuestionIndex];
    addBotMessage(question);

    const progress = ((currentQuestionIndex) / questions.length) * 100;
    updateProgressBar(progress);
}

// -----------------------------------------
// HANDLE USER INPUT
// -----------------------------------------
function handleUserInput(text) {
    const questions = forms[currentForm];

    // Save answer (optional: store in summary builder)
    if (typeof saveAnswer === "function") {
        saveAnswer(currentQuestionIndex, text);
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        askNextQuestion();
    } else {
        finishInterview();
    }
}

// -----------------------------------------
// FINISH INTERVIEW
// -----------------------------------------
function finishInterview() {
    updateProgressBar(100);

    addBotMessage("Thank you. Your responses have been recorded.");

    if (typeof buildSummary === "function") {
        const summary = buildSummary(currentForm);
        addBotMessage(summary);
    }
}

// -----------------------------------------
// BUTTON ACTIONS
// -----------------------------------------
document.getElementById("startBtn").addEventListener("click", startInterview);

document.getElementById("pauseBtn").addEventListener("click", () => {
    addBotMessage("Interview paused.");
});

document.getElementById("repeatBtn").addEventListener("click", () => {
    const questions = forms[currentForm];
    const question = questions[currentQuestionIndex];
    addBotMessage(question);
});

document.getElementById("skipBtn").addEventListener("click", () => {
    currentQuestionIndex++;
    askNextQuestion();
});

document.getElementById("finishBtn").addEventListener("click", finishInterview);

document.getElementById("resetBtn").addEventListener("click", () => {
    resetUI();
});
