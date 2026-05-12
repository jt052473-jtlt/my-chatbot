/* ------------------------------------------------------
   SUMMARY BUILDER — Creates final summary text
------------------------------------------------------ */

function buildSummary(answers) {
    const labels = translations[currentLanguage].summaryLabels;

    return `
${labels.name}: ${answers.name || ""}
${labels.dob}: ${answers.dob || ""}
${labels.reason}: ${answers.reason || ""}
${labels.duration}: ${answers.duration || ""}
${labels.allergies}: ${answers.allergies || ""}
    `.trim();
}

/* ------------------------------------------------------
   SHOW SUMMARY IN CHAT
------------------------------------------------------ */
function displaySummary() {
    const summary = buildSummary(interviewAnswers);

    addBotMessage(summary);
    speakText(summary);
}

/* ------------------------------------------------------
   EXPORT FUNCTIONS
------------------------------------------------------ */
window.buildSummary = buildSummary;
window.displaySummary = displaySummary;
