/* ------------------------------------------------------
   SUMMARY BUILDER — Formats final summary output
   (Aligned, cleaned, same logic, same names)
------------------------------------------------------ */

function buildSummary(formName, answers, labels) {
    let summary = `${formName} Summary\n\n`;

    Object.keys(labels).forEach(key => {
        const label = labels[key];
        const value = answers[key] || "";
        summary += `${label}: ${value}\n`;
    });

    return summary.trim();
}

/* ------------------------------------------------------
   EXPORT
------------------------------------------------------ */
window.buildSummary = buildSummary;
