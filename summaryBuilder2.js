// ------------------------------------------------------
// SUMMARY BUILDER
// Creates the final summary after all questions are done
// ------------------------------------------------------

function buildSummary() {
    const container = document.createElement("div");
    container.className = "summary-container";

    const questions = translations[currentLanguage].questions;
    const labels = translations[currentLanguage].summaryLabels;

    // Title
    const title = document.createElement("h3");
    title.textContent = labels.summaryTitle || "Summary";
    container.appendChild(title);

    // Each answer row
    questions.forEach(q => {
        const row = document.createElement("div");
        row.className = "summary-row";

        const label = document.createElement("div");
        label.className = "summary-label";
        label.textContent = q.text;

        const value = document.createElement("div");
        value.className = "summary-value";
        value.textContent = interviewAnswers[q.id] || "—";

        row.appendChild(label);
        row.appendChild(value);
        container.appendChild(row);
    });

    // Add to chat window
    const chat = document.getElementById("chatWindow");
    chat.appendChild(container);
    chat.scrollTop = chat.scrollHeight;
}

// Expose globally
window.buildSummary = buildSummary;
