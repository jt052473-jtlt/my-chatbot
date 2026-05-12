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

function displaySummary() {
    const summary = buildSummary(interviewAnswers);
    addBotMessage(summary);
}

window.buildSummary = buildSummary;
window.displaySummary = displaySummary;
