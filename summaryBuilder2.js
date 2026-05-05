// ---------------------------------------------------------
// SUMMARY BUILDER — MULTILINGUAL VERSION
// ---------------------------------------------------------

function buildSummaryTranslated(responses, lang) {
  const L = lang.summaryLabels;

  return `
${L.header}:
-------------------------
${L.name}: ${responses[0] || "N/A"}
${L.dob}: ${responses[1] || "N/A"}
${L.complaint}: ${responses[2] || "N/A"}
${L.duration}: ${responses[3] || "N/A"}
${L.allergies}: ${responses[4] || "N/A"}
${L.medications}: ${responses[5] || "N/A"}
${L.chronic}: ${responses[6] || "N/A"}
${L.travel}: ${responses[7] || "N/A"}
${L.surgeries}: ${responses[8] || "N/A"}
${L.notes}: ${responses[9] || "N/A"}
  `;
}
