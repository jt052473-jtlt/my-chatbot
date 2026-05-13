/* ------------------------------------------------------
   INTERVIEW FLOW — Controls question progression
------------------------------------------------------ */

let interviewAnswers = {};

/* ------------------------------------------------------
   SHOW NEXT QUESTION
------------------------------------------------------ */
function showQuestion() {
    const questions = forms[currentForm].questions;

    // End of interview → show summary
    if (currentStep >= questions.length) {
        showSummary();
        return;
    }

    const question = questions[currentStep];

    addBotMessage(question);
    speakText(question, currentLanguage);

    updateProgressBar();
}

/* ------------------------------------------------------
   PROCESS USER RESPONSE
------------------------------------------------------ */
function processUserResponse(response) {
    const labels = forms[currentForm].summaryLabels;

    // Map answers dynamically based on form structure
    const keys = Object.keys(labels);

    if (currentStep < keys.length) {
        const key = keys[currentStep];
        interviewAnswers[key] = response;
    }

    currentStep++;
    showQuestion();
}

/* ------------------------------------------------------
   SHOW SUMMARY
------------------------------------------------------ */
function showSummary() {
    const labels = forms[currentForm].summaryLabels;

    let summaryText = `${forms[currentForm].name} Summary\n\n`;

    Object.keys(labels).forEach(key => {
        summaryText += `${labels[key]}: ${interviewAnswers[key] || ""}\n`;
    });

    summaryText = summaryText.trim();

    addBotMessage(summaryText);
    speakText(summaryText, currentLanguage);

    updateProgressBar();
}

/* ------------------------------------------------------
   EXPORT FUNCTIONS
------------------------------------------------------ */
window.showQuestion = showQuestion;
window.processUserResponse = processUserResponse;
window.showSummary = showSummary;
