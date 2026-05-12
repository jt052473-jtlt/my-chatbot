// =====================================
// INTERVIEW FLOW ENGINE
// Handles question progression,
// form selection, and answer storage
// =====================================

let interviewAnswers = {};
let selectedForm = "admission";
let currentStep = 0;
let isPaused = false;

// ===============================
// FORM SELECTOR
// ===============================
const formSelectEl = document.getElementById("formSelect");

if (formSelectEl) {
    formSelectEl.addEventListener("change", () => {
        selectedForm = formSelectEl.value;
        resetInterview();
    });
}

// ===============================
// SHOW QUESTION
// ===============================
function showQuestion() {
    const formData = translations[currentLanguage].forms[selectedForm];
    const questions = formData.questions;

    // If finished → show summary
    if (currentStep >= questions.length) {
        updateProgressBar();
        addBotMessage(
            translations[currentLanguage].ui.finish +
            ` — ${selectedForm === "admission" ? "Admission Form" : "Sleep Form"}`
        );
        displaySummary();
        return;
    }

    if (isPaused) return;

    const questionText = questions[currentStep];
    addBotMessage(questionText);
    speakText(questionText);

    updateProgressBar();
}

// ===============================
// PROCESS USER RESPONSE
// ===============================
function processUserResponse(text) {
    const labels = translations[currentLanguage].forms[selectedForm].summaryLabels;

    // Map answers dynamically
    const keys = Object.keys(labels);
    const answerKey = keys[currentStep];

    if (answerKey) {
        interviewAnswers[answerKey] = text;
    }

    currentStep++;
    showQuestion();
}

// ===============================
// RESET INTERVIEW
// ===============================
function resetInterview() {
    interviewAnswers = {};
    currentStep = 0;
    isPaused = false;
    clearChat();
    updateProgressBar();
}

// ===============================
// GLOBAL EXPORTS
// ===============================
window.showQuestion = showQuestion;
window.processUserResponse = processUserResponse;
window.resetInterview = resetInterview;
