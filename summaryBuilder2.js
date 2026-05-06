// summaryBuilder2.js
// Builds the final summary for the Clinical Intake Demo

import { getQuestion, getTotalQuestions } from "./interviewQuestions2.js";

function buildSummary(responses, lang) {
    const total = getTotalQuestions(lang);
    let html = "";

    for (let i = 0; i < total; i++) {
        const q = getQuestion(lang, i);
        const a = responses[i] || "";

        html += `
            <div class="summary-block">
                <h3>${q}</h3>
                <p>${a}</p>
            </div>
        `;
    }

    return html;
}

export { buildSummary };
