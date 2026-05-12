/* ------------------------------------------------------
   INTERVIEW FLOW — Controls question progression
------------------------------------------------------ */

let interviewAnswers = {};

/* ------------------------------------------------------
   SHOW NEXT QUESTION
------------------------------------------------------ */
function showQuestion() {
    const questions = translations[currentLanguage].questions;

    // End of interview → show summary
    if (currentStep >= questions.length) {
        showSummary();
        return;
    }

    const question = questions[currentStep];

    addBotMessage(question);
    speakText(question);

    updateProgressBar();
}

/* ------------------------------------------------------
   PROCESS USER RESPONSE
------------------------------------------------------ */
function processUserResponse(response) {
    const labels = translations[currentLanguage].summaryLabels;

    switch (currentStep) {
        case 0:
            interviewAnswers.name = response;
            break;
        case 1:
            interviewAnswers.dob = response;
            break;
        case 2:
            interviewAnswers.reason = response;
            break;
        case 3:
            interviewAnswers.duration = response;
            break;
        case 4:
            interviewAnswers.allergies = response;
            break;
    }

    currentStep++;
    showQuestion();
}

/* ------------------------------------------------------
   SHOW SUMMARY
------------------------------------------------------ */
function showSummary() {
    const labels = translations[currentLanguage].summaryLabels;

    let summaryText = `
${labels.name}: ${interviewAnswers.name || ""}
${labels.dob}: ${interviewAnswers.dob || ""}
${labels.reason}: ${interviewAnswers.reason || ""}
${labels.duration}: ${interviewAnswers.duration || ""}
${labels.allergies}: ${interviewAnswers.allergies || ""}
    `.trim();

    addBotMessage(summaryText);
    speakText(summaryText);

    updateProgressBar();
}

/* ------------------------------------------------------
   EXPORT FUNCTIONS
------------------------------------------------------ */
window.showQuestion = showQuestion;
window.processUserResponse = processUserResponse;
window.showSummary = showSummary;
