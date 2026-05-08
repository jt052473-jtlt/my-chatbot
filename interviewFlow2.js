// ------------------------------------------------------
// INTERVIEW FLOW CONTROLLER
// Handles:
// - Showing questions
// - Saving answers
// - Advancing steps
// - Triggering summary
// - Updating progress bar
// ------------------------------------------------------

window.interviewAnswers = {};

function showQuestion() {
    const questions = translations[currentLanguage].questions;

    if (!questions || questions.length === 0) {
        addBotMessage("No questions available for this language.");
        return;
    }

    // End of interview → show summary
    if (currentStep >= questions.length) {
        addBotMessage(translations[currentLanguage].summaryLabels.summaryTitle);
        buildSummary();
        return;
    }

    const question = questions[currentStep];
    addBotMessage(question.text);

    updateProgressBar();
}

function processUserResponse(response) {
    const questions = translations[currentLanguage].questions;

    if (!questions || questions.length === 0) return;

    const question = questions[currentStep];
    if (!question) return;

    // Save answer
    interviewAnswers[question.id] = response;

    // Move to next question
    currentStep++;

    // Show next question
    showQuestion();
}

function updateProgressBar() {
    const questions = translations[currentLanguage].questions;
    if (!questions || questions.length === 0) return;

    const percent = Math.min(
        (currentStep / questions.length) * 100,
        100
    );

    document.getElementById("progressBar").style.width = percent + "%";
}

// ------------------------------------------------------
// MESSAGE HELPERS
// ------------------------------------------------------

function addUserMessage(text) {
    const chat = document.getElementById("chatWindow");
    const div = document.createElement("div");
    div.className = "chat-message user-message";
    div.textContent = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

function addBotMessage(text) {
    const chat = document.getElementById("chatWindow");
    const div = document.createElement("div");
    div.className = "chat-message bot-message";
    div.textContent = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;

    handleReadAloud(text);
}

// ------------------------------------------------------
// READ ALOUD SUPPORT
// ------------------------------------------------------

function handleReadAloud(text) {
    const toggle = document.getElementById("readAloudToggle");
    if (!toggle || !toggle.checked) return;

    const langConfig = translations[currentLanguage];
    const voiceCode = langConfig.voiceCode || "en-US";

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = voiceCode;

    window.speechSynthesis.speak(utter);
}

// Expose globally
window.showQuestion = showQuestion;
window.processUserResponse = processUserResponse;
window.updateProgressBar = updateProgressBar;
window.addBotMessage = addBotMessage;
window.addUserMessage = addUserMessage;
