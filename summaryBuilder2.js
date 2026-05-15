// -----------------------------------------
// SUMMARY BUILDER — CLEAN + FLUENT STYLE
// -----------------------------------------

// Store answers here
let answerStore = {};

// Save answer from interviewFlow2.js
function saveAnswer(index, text) {
    answerStore[index] = text;
}

// Build summary based on form type
function buildSummary(formType) {
    let summary = "Here is your summary:\n\n";

    if (formType === "admission") {
        summary += buildAdmissionSummary();
    } else if (formType === "sleep") {
        summary += buildSleepSummary();
    }

    return summary;
}

// -----------------------------------------
// ADMISSION FORM SUMMARY
// -----------------------------------------
function buildAdmissionSummary() {
    return `
Reason for Visit: ${answerStore[0] || "Not provided"}
Duration of Symptoms: ${answerStore[1] || "Not provided"}
Current Medications: ${answerStore[2] || "Not provided"}
Allergies: ${answerStore[3] || "Not provided"}
Previous Occurrences: ${answerStore[4] || "Not provided"}
    `.trim();
}

// -----------------------------------------
// SLEEP FORM SUMMARY
// -----------------------------------------
function buildSleepSummary() {
    return `
Hours of Sleep: ${answerStore[0] || "Not provided"}
Wake Rested: ${answerStore[1] || "Not provided"}
Snoring / Breathing Issues: ${answerStore[2] || "Not provided"}
Daytime Naps: ${answerStore[3] || "Not provided"}
Screen Use Before Bed: ${answerStore[4] || "Not provided"}
    `.trim();
}
