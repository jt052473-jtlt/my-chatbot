// ------------------------------------------------------
// SUMMARY BUILDER
// Uses:
// - translations[currentLanguage].summaryLabels
// - translations[currentLanguage].questions
// - window.interviewAnswers (from interviewFlow2.js)
// ------------------------------------------------------

function buildSummary() {
    const chatWindow = document.getElementById("chatWindow");
    const questions = translations[currentLanguage].questions;
    const labels = translations[currentLanguage].summaryLabels;

    if (!window.interviewAnswers) {
        addBotMessage("No answers available to summarize.");
        return;
    }

    // Create summary container
    const summaryDiv = document.createElement("div");
    summaryDiv.className = "summary-container";

    const title = document.createElement("h3");
    title.textContent = labels.summaryTitle || "Summary";
    summaryDiv.appendChild(title);

    // Loop through questions and answers
    questions.forEach((q, index) => {
        const qId = q.id || index;
        const answer = window.interviewAnswers[qId];

        if (answer !== undefined) {
            const row = document.createElement("div");
            row.className = "summary-row";

            const label = document.createElement("div");
            label.className = "summary-label";
            label.textContent = q.text;

            const value = document.createElement("div");
            value.className = "summary-value";
            value.textContent = answer;

            row.appendChild(label);
            row.appendChild(value);
            summaryDiv.appendChild(row);
        }
    });

    // Append summary to chat window
    chatWindow.appendChild(summaryDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;

    // Optional: read aloud summary title
    handleReadAloud(title.textContent);
}
