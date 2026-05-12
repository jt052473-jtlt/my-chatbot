// =====================================
// SUMMARY BUILDER
// Builds the final summary for the
// selected form in the selected language
// =====================================

function buildSummary(answers) {
    const formData = translations[currentLanguage].forms[selectedForm];
    const labels = formData.summaryLabels;

    let output = "";

    for (const key in labels) {
        output += `${labels[key]}:\n${answers[key] || ""}\n\n`;
    }

    return output.trim();
}

function displaySummary() {
    const summary = buildSummary(interviewAnswers);
    addBotMessage(summary);
}

// Expose globally
window.buildSummary = buildSummary;
window.displaySummary = displaySummary;
