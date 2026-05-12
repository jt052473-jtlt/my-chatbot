let interviewAnswers = {};

function showQuestion() {
    const questions = translations[currentLanguage].questions;

    // If finished, show summary
    if (currentStep >= questions.length) {
        updateProgressBar(); // ⭐ Ensure progress bar hits 100%
        addBotMessage("Thank you. Here is a summary:");
        displaySummary();
        return;
    }

    if (isPaused) return;

    const question = questions[currentStep];
    addBotMessage(question);
    speakText(question);

    updateProgressBar();
}

function processUserResponse(text) {
    switch (currentStep) {
        case 0: interviewAnswers.name = text; break;
        case 1: interviewAnswers.dob = text; break;
        case 2: interviewAnswers.reason = text; break;
        case 3: interviewAnswers.duration = text; break;
        case 4: interviewAnswers.allergies = text; break;
    }

    currentStep++;
    showQuestion();
}

window.showQuestion = showQuestion;
window.processUserResponse = processUserResponse;
