/* ------------------------------------------------------
   SUMMARY BUILDER — Clean Vertical Summary
   One Bot Bubble, Uses summaryLabels
------------------------------------------------------ */

const SummaryBuilder = (() => {

    function buildSummary(formName, answers) {
        const form = forms[formName];
        const labels = form.summaryLabels;

        let summary = `${form.name} Summary\n\n`;

        Object.keys(labels).forEach(key => {
            const label = labels[key];
            const value = answers[key] || "";
            summary += `${label}: ${value}\n`;
        });

        return summary.trim();
    }

    return {
        buildSummary
    };

})();

window.SummaryBuilder = SummaryBuilder;
