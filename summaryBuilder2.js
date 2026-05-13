/* ------------------------------------------------------
   SUMMARY BUILDER — Creates final summary text
------------------------------------------------------ */

function buildSummary(answers) {
    const labels = forms[currentForm].summaryLabels;

    let summary = `${forms[currentForm].name} Summary\n\n`;

    Object.keys(labels).forEach(key => {
        summary += `${labels[key]}: ${answers[key] || ""}\n`;
    });

    return summary.trim();
}

/* ------------------------------------------------------
   SHOW SUMMARY IN CHAT
------------------------------------------------------ */
function displaySummary() {
    const summary = buildSummary(interviewAnswers);

    addBotMessage(summary);
    speakText(summary, currentLanguage);
}

/* ------------------------------------------------------
   EXPORT FUNCTIONS
------------------------------------------------------ */
window.buildSummary = buildSummary;
window.displaySummary = displaySummary;
