/* ------------------------------------------------------
   INTERVIEW FLOW — Controls question progression
------------------------------------------------------ */

let interviewAnswers = {};

/* ------------------------------------------------------
   SHOW CURRENT QUESTION
------------------------------------------------------ */
function showQuestion() {
    const questions = translations[currentLanguage].questions;

    if (currentStep >= questions.length) {
        addBotMessage("Thank you. Here is a summary of your responses:");
        displaySummary();
        return;
    }

    if (isPaused) return;

    const question = questions[currentStep];
    addBotMessage(question);
    speakText(question);

    updateProgressBar();
}

/* ------------------------------------------------------
   PROCESS USER RESPONSE
------------------------------------------------------ */
function processUserResponse(text) {
    const stepIndex = currentStep;

    switch (stepIndex) {
        case 0:
            interviewAnswers.name = text;
            break;
        case 1:
            interviewAnswers.dob = text;
            break;
        case 2:
            interviewAnswers.reason = text;
            break;
        case 3:
            interviewAnswers.duration = text;
            break;
        case 4:
            interviewAnswers.allergies = text;
            break;
        default:
            break;
    }

    currentStep++;
    showQuestion();
}

/* ------------------------------------------------------
   EXPORT
------------------------------------------------------ */
window.showQuestion = showQuestion;
window.processUserResponse = processUserResponse;
